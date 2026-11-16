import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PDF_SYSTEM_INSTRUCTION = `Bạn là chuyên gia số hóa đề thi Toán THPT Việt Nam.
Nhiệm vụ của bạn là đọc toàn bộ nội dung đề thi Toán được cung cấp và chuyển đổi chính xác 100% sang định dạng văn bản chuẩn dưới đây để hệ thống tạo đề tương tác:

QUY TẮC ĐỊNH DẠNG BẮT BUỘC:
1. Tất cả công thức Toán học, ký hiệu toán học, biến số, phương trình, hệ phương trình, giới hạn, tập hợp phải được viết dưới dạng mã LaTeX chuẩn và kẹp giữa cặp dấu $...$ (ví dụ: $\\forall x \\in \\mathbb{R}$, $\\lim_{x \\to 2} \\frac{x^2 - 4}{x - 2} = 4$, $S.ABCD$).
2. Nếu câu hỏi có HÌNH VẼ (hình học không gian như hình chóp $S.ABCD$, $S.ABC$, tứ diện $ABCD$, lăng trụ $ABC.A'B'C'$, hình hộp $ABCD.A'B'C'D'$, tam giác, đường tròn lượng giác, đồ thị hàm số, trục số) hoặc bài toán hình học cần hình minh họa, hãy dựng ngay khối mã TikZ chuẩn đặt ngay cuối đề bài của câu đó:
\\begin{tikzpicture}[scale=1.0]
  \\coordinate (A) at (0,0);
  ...
  \\draw[dashed] ...;
  \\draw[thick] ...;
\\end{tikzpicture}
(Chỉ dùng các lệnh \\coordinate, \\draw, \\fill, \\filldraw, \\node để hiển thị sắc nét).
3. Chia đề thi thành các phần theo đúng cấu trúc:
   - Phần I. ( gạch chân đáp án đúng )
     Dành cho câu hỏi trắc nghiệm 4 lựa chọn A, B, C, D.
     Mỗi câu bắt đầu bằng "Câu 1.", "Câu 2.", ...
     Các phương án bắt đầu bằng "A.", "B.", "C.", "D." (mỗi phương án 1 dòng).
     Phương án ĐÚNG phải được bọc trong thẻ <u>...</u> (ví dụ: <u>A. $x = 1$</u>). Nếu trong tài liệu đáp án đúng được gạch chân, tô đậm, tô màu đỏ, tô sáng, có bảng đáp án ở cuối đề, hoặc nếu chưa có dấu hiệu thì bạn BẮT BUỘC giải toán chính xác để bọc thẻ <u>...</u> vào đúng phương án đúng!
   - Phần II. ( gạch chân đáp án đúng )
     Dành cho câu hỏi trắc nghiệm Đúng / Sai gồm 4 mệnh đề a), b), c), d).
     Mỗi câu bắt đầu bằng "Câu 1.", "Câu 2.", ...
     4 mệnh đề viết trên 4 dòng bắt đầu bằng "a)", "b)", "c)", "d)".
     Mệnh đề nào ĐÚNG về mặt toán học thì bọc toàn bộ dòng mệnh đề đó trong thẻ <u>...</u> (ví dụ: <u>a) Số hạng thứ hai là $u_2 = 6$.</u>). Mệnh đề SAI thì giữ nguyên không bọc thẻ <u>.
   - Phần III.
     Dành cho câu hỏi Trả lời ngắn.
     Mỗi câu bắt đầu bằng "Câu 1.", "Câu 2.", ...
     Ngay dòng dưới đề bài ghi "Đáp số: [giá trị số]" (tự giải chính xác nếu đề chưa ghi sẵn đáp số, làm tròn đúng yêu cầu đề bài).
   - Phần IV.
     Dành cho câu hỏi Tự luận.
     Mỗi câu bắt đầu bằng "Câu 1.", "Câu 2.", ...
     Dòng đầu là đề bài, các dòng tiếp theo là 3 đến 4 bước biến đổi lời giải logic, đúng toán học.
4. Nếu câu hỏi có "Lời giải:" hoặc cần giải thích ngắn gọn, ghi ở dòng cuối của câu đó dưới dạng "Lời giải: ...".
5. Chỉ xuất ra nội dung đề thi theo đúng định dạng trên, KHÔNG thêm lời bình luận hay markdown code fence (\`\`\`).`;

const VERIFY_EXAM_SYSTEM_INSTRUCTION = `Bạn là chuyên gia thẩm định logic Toán học và chuẩn hóa đề thi THPT Việt Nam.
Nhiệm vụ của bạn là kiểm tra văn bản đề thi Toán thô (từ Word hoặc PDF), sửa toàn bộ lỗi công thức sang LaTeX chuẩn $...$, kiểm tra tính đúng đắn toán học của từng câu hỏi và đáp án, bổ sung hình vẽ TikZ cho các câu hình học/đồ thị, và xuất ra văn bản đề chuẩn.

QUY TẮC BẮT BUỘC:
1. Chuẩn hóa 100% công thức toán học sang LaTeX kẹp trong $...$.
2. Kiểm tra và giải lại từng câu để đảm bảo ĐÁP ÁN ĐÚNG LOGIC TOÁN HỌC:
   - Phần I: Bọc phương án đúng trong <u>...</u> (ví dụ: <u>B. $19$</u>). Đảm bảo mỗi câu có đủ 4 phương án A., B., C., D. trên 4 dòng riêng biệt và đúng 1 phương án được bọc <u>...</u>.
   - Phần II: Bọc các mệnh đề ĐÚNG trong <u>...</u>, giữ nguyên mệnh đề SAI không có <u>.
   - Phần III: Đảm bảo có dòng "Đáp số: [số]" chính xác với bài toán.
   - Phần IV: Đảm bảo có 3-4 dòng bước giải sắp xếp theo đúng trình tự suy luận toán học.
3. Với các câu hỏi Hình học không gian (hình chóp, tứ diện, lăng trụ, hình hộp), Hình học phẳng, Lượng giác hoặc Đồ thị chưa có khối \\begin{tikzpicture}...\\end{tikzpicture}, hãy tạo thêm khối \\begin{tikzpicture}...\\end{tikzpicture} dùng \\coordinate, \\draw, \\draw[dashed], \\node khớp chính xác tên các điểm trong đề bài.
4. Giữ nguyên nội dung câu hỏi của người dùng, chỉ sửa lỗi ký hiệu công thức, chuẩn hóa đáp án đúng và bổ sung hình vẽ/lời giải ngắn gọn. Không bọc kết quả trong markdown code fence (\`\`\`).`;

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '35mb' }));

  app.post('/api/parse-pdf', async (req, res) => {
    try {
      const { base64Pdf, localExtractedHint } = req.body;
      if (!base64Pdf || typeof base64Pdf !== 'string') {
        res.status(400).json({ error: 'Thiếu dữ liệu file PDF.' });
        return;
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        res.status(500).json({ error: 'GEMINI_API_KEY_MISSING' });
        return;
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      const promptText = localExtractedHint
        ? `Hãy đọc toàn bộ đề thi Toán trong file PDF đính kèm (kết hợp tham khảo văn bản thô trích xuất nhanh dưới đây để không bỏ sót câu nào) và chuyển sang đúng định dạng chuẩn (Phần I, Phần II, Phần III, Phần IV, công thức LaTeX $...$, bọc <u>...</u> cho đáp án đúng, kèm mã \\begin{tikzpicture}...\\end{tikzpicture} cho câu có hình vẽ).\n\nVăn bản thô tham khảo:\n${String(localExtractedHint).slice(0, 18000)}`
        : 'Hãy đọc toàn bộ đề thi Toán trong file PDF này và chuyển sang đúng định dạng văn bản chuẩn (Phần I, Phần II, Phần III, Phần IV, công thức LaTeX $...$, bọc <u>...</u> cho đáp án đúng, kèm mã \\begin{tikzpicture}...\\end{tikzpicture} cho câu có hình vẽ).';

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: {
          parts: [
            {
              inlineData: {
                mimeType: 'application/pdf',
                data: base64Pdf,
              },
            },
            {
              text: promptText,
            },
          ],
        },
        config: {
          systemInstruction: PDF_SYSTEM_INSTRUCTION,
          thinkingConfig: {
            thinkingLevel: ThinkingLevel.LOW,
          },
        },
      });

      const extractedText = (response.text ?? '')
        .replace(/^```[a-zA-Z]*\n?/gm, '')
        .replace(/```$/gm, '')
        .trim();

      if (!extractedText) {
        res.status(500).json({ error: 'Không trích xuất được nội dung từ PDF.' });
        return;
      }

      res.json({ text: extractedText });
    } catch (error: any) {
      console.error('Error in /api/parse-pdf:', error);
      res.status(500).json({
        error: error?.message || 'Lỗi khi phân tích file PDF.',
      });
    }
  });

  app.post('/api/verify-exam', async (req, res) => {
    try {
      const { rawText } = req.body;
      if (!rawText || typeof rawText !== 'string' || !rawText.trim()) {
        res.status(400).json({ error: 'Thiếu nội dung đề thi cần chuẩn hóa.' });
        return;
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        res.status(500).json({ error: 'GEMINI_API_KEY_MISSING' });
        return;
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: `Hãy kiểm tra logic toán học, chuẩn hóa toàn bộ công thức sang LaTeX $...$, đánh dấu <u>...</u> vào đúng đáp án đúng và tạo hình vẽ TikZ cho các câu hình học trong đề thi sau:\n\n${rawText.slice(0, 28000)}`,
        config: {
          systemInstruction: VERIFY_EXAM_SYSTEM_INSTRUCTION,
          thinkingConfig: {
            thinkingLevel: ThinkingLevel.LOW,
          },
        },
      });

      const verifiedText = (response.text ?? '')
        .replace(/^```[a-zA-Z]*\n?/gm, '')
        .replace(/```$/gm, '')
        .trim();

      if (!verifiedText) {
        res.status(500).json({ error: 'Không thể chuẩn hóa nội dung đề thi.' });
        return;
      }

      res.json({ text: verifiedText });
    } catch (error: any) {
      console.error('Error in /api/verify-exam:', error);
      res.status(500).json({
        error: error?.message || 'Lỗi khi chuẩn hóa đề thi bằng AI.',
      });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*all', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
