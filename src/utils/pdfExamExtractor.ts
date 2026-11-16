import * as pdfjsLib from 'pdfjs-dist';
import {
  normalizeMathExpressionsToLatex,
  replacePuaSymbols,
} from './docxMathExtractor';

// Cấu hình worker cho pdfjs-dist trong Vite
try {
  pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url
  ).toString();
} catch {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;
}

/**
 * Chuyển ArrayBuffer sang chuỗi Base64
 */
function arrayBufferToBase64(buffer: ArrayBuffer): string {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    const chunk = bytes.subarray(i, i + chunkSize);
    binary += String.fromCharCode.apply(null, Array.from(chunk));
  }
  return btoa(binary);
}

/**
 * Trích xuất văn bản & tái tạo công thức Toán học (số mũ, chỉ số dưới, ký hiệu Symbol) trực tiếp từ file PDF trên trình duyệt (< 0.25s)
 */
export async function extractTextFromPdfLocal(arrayBuffer: ArrayBuffer): Promise<string> {
  const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
  const pdf = await loadingTask.promise;
  const pageTexts: string[] = [];

  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const textContent = await page.getTextContent();

    interface PositionedItem {
      str: string;
      x: number;
      y: number;
      w: number;
      fontSize: number;
    }

    const items: PositionedItem[] = [];
    for (const item of textContent.items as any[]) {
      if (typeof item.str === 'string' && item.str.trim().length > 0 && Array.isArray(item.transform)) {
        const cleanedStr = replacePuaSymbols(item.str);
        if (!cleanedStr.trim()) continue;
        const fontSize = Math.abs(item.transform[3] || item.transform[0] || 11);
        items.push({
          str: cleanedStr,
          x: item.transform[4] || 0,
          y: item.transform[5] || 0,
          w: item.width || cleanedStr.length * (fontSize * 0.5),
          fontSize,
        });
      }
    }

    // Gom các phần tử theo dòng cơ sở (cho phép chênh lệch Y tối đa 4.5pt để bắt được số mũ / chỉ số dưới)
    const lines: { baseY: number; baseFontSize: number; items: PositionedItem[] }[] = [];
    for (const it of items) {
      const existingLine = lines.find((l) => Math.abs(l.baseY - it.y) <= 4.5);
      if (existingLine) {
        existingLine.items.push(it);
        if (it.fontSize > existingLine.baseFontSize) {
          existingLine.baseFontSize = it.fontSize;
          existingLine.baseY = it.y;
        }
      } else {
        lines.push({ baseY: it.y, baseFontSize: it.fontSize, items: [it] });
      }
    }

    // Sắp xếp các dòng từ trên xuống dưới
    lines.sort((a, b) => b.baseY - a.baseY);

    const renderedLines = lines.map((line) => {
      line.items.sort((a, b) => a.x - b.x);
      let lineStr = '';
      for (let i = 0; i < line.items.length; i++) {
        const curr = line.items[i];
        const prev = i > 0 ? line.items[i - 1] : null;
        const dy = curr.y - line.baseY;
        const isSmaller = curr.fontSize < line.baseFontSize * 0.88;
        const token = curr.str.trim();

        // Nhận diện số mũ (Superscript) hoặc ký hiệu độ
        if ((dy > 1.8 || (dy > 1.0 && isSmaller)) && prev && token.length <= 6) {
          if (token === 'o' || token === '0' || token === '°') {
            lineStr += '$^\\circ$';
          } else {
            lineStr += `$^{${token}}$`;
          }
          continue;
        }

        // Nhận diện chỉ số dưới (Subscript)
        if ((dy < -1.8 || (dy < -1.0 && isSmaller)) && prev && token.length <= 6) {
          lineStr += `$_{${token}}$`;
          continue;
        }

        if (prev) {
          const gap = curr.x - (prev.x + prev.w);
          if (gap > 12) {
            lineStr += '    ' + curr.str;
          } else if (gap > 1.5) {
            lineStr += ' ' + curr.str;
          } else {
            lineStr += curr.str;
          }
        } else {
          lineStr += curr.str;
        }
      }

      return lineStr
        .replace(/([a-zA-Z0-9\)\}])\$\^\{([^}]+)\}\$/g, '$$$1^{$2}$$')
        .replace(/([a-zA-Z0-9\)\}])\$_\{([^}]+)\}\$/g, '$$$1_{$2}$$')
        .replace(/(\d+)\$\^\\circ\$/g, '$$$1^\\circ$$');
    });

    pageTexts.push(renderedLines.join('\n'));
  }

  const rawJoined = pageTexts.join('\n\n').trim();
  return normalizeMathExpressionsToLatex(rawJoined);
}

/**
 * Nhận diện đề Toán từ file PDF:
 * - Bước 1: Trích xuất tức thì (< 0.25s) bằng bộ đọc PDF cục bộ để hiển thị ngay lập tức qua onQuickPreview.
 * - Bước 2: Nếu ở chế độ 'smart', gọi API nhận diện thông minh (/api/parse-pdf với ThinkingLevel.LOW siêu tốc) để chuẩn hóa 100% công thức phân số/căn thức LaTeX, tạo hình vẽ TikZ và xác nhận đáp án đúng <u>...</u>.
 */
export async function extractMathExamFromPdf(
  file: File,
  mode: 'smart' | 'fast' = 'smart',
  onQuickPreview?: (quickText: string) => void
): Promise<{ text: string; usedSmartMode: boolean }> {
  const arrayBuffer = await file.arrayBuffer();

  // Luôn trích xuất nhanh cục bộ trước để người dùng thấy kết quả ngay lập tức
  let localText = '';
  try {
    localText = await extractTextFromPdfLocal(arrayBuffer.slice(0));
    if (localText && onQuickPreview) {
      onQuickPreview(localText);
    }
  } catch {
    localText = '';
  }

  if (mode === 'fast') {
    return { text: localText, usedSmartMode: false };
  }

  try {
    const base64Pdf = arrayBufferToBase64(arrayBuffer.slice(0));
    const response = await fetch('/api/parse-pdf', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        base64Pdf,
        localExtractedHint: localText,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      if (data && typeof data.text === 'string' && data.text.trim().length > 0) {
        return { text: data.text.trim(), usedSmartMode: true };
      }
    }
  } catch (err) {
    console.warn('Chuyển sang kết quả trích xuất PDF cục bộ do lỗi kết nối API:', err);
  }

  return { text: localText, usedSmartMode: false };
}

/**
 * Chuẩn hóa công thức LaTeX, kiểm tra logic toán học của đáp án và tự động dựng hình vẽ TikZ bằng AI
 */
export async function verifyAndEnhanceExamWithAI(rawText: string): Promise<string> {
  const response = await fetch('/api/verify-exam', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ rawText }),
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData?.error || 'Không thể kết nối máy chủ chuẩn hóa đề thi.');
  }

  const data = await response.json();
  if (!data || typeof data.text !== 'string' || !data.text.trim()) {
    throw new Error('Không nhận được kết quả chuẩn hóa hợp lệ.');
  }
  return data.text.trim();
}
