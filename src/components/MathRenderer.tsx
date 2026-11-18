import React, { useMemo } from 'react';
import katex from 'katex';
import { TikzFigure } from './TikzFigure';

interface MathRendererProps {
  content: string;
  className?: string;
  inline?: boolean;
}

interface MathPart {
  type: 'text' | 'inline-math' | 'block-math' | 'tikz' | 'image';
  value: string;
}

const KATEX_MACROS: Record<string, string> = {
  '\\R': '\\mathbb{R}',
  '\\N': '\\mathbb{N}',
  '\\Z': '\\mathbb{Z}',
  '\\Q': '\\mathbb{Q}',
  '\\C': '\\mathbb{C}',
  '\\vec': '\\overrightarrow{#1}',
  '\\wideparen': '\\widehat{#1}',
  '\\tg': '\\tan',
  '\\cotg': '\\cot',
};

/**
 * Chuẩn hóa chuỗi công thức bên trong $...$ để mọi ký hiệu Unicode đều được KaTeX hiển thị đúng chuẩn LaTeX
 */
function sanitizeLatexFormula(rawFormula: string): string {
  const cleaned = rawFormula
    .replace(/∀/g, '\\forall ')
    .replace(/∃/g, '\\exists ')
    .replace(/∉/g, '\\notin ')
    .replace(/∈/g, '\\in ')
    .replace(/⊆/g, '\\subseteq ')
    .replace(/⊇/g, '\\supseteq ')
    .replace(/⊂/g, '\\subset ')
    .replace(/⊃/g, '\\supset ')
    .replace(/∪/g, '\\cup ')
    .replace(/∩/g, '\\cap ')
    .replace(/∅/g, '\\emptyset ')
    .replace(/∖/g, '\\setminus ')
    .replace(/≤|⩽/g, '\\le ')
    .replace(/≥|⩾/g, '\\ge ')
    .replace(/≠/g, '\\neq ')
    .replace(/≈/g, '\\approx ')
    .replace(/±/g, '\\pm ')
    .replace(/∓/g, '\\mp ')
    .replace(/×/g, '\\times ')
    .replace(/÷/g, '\\div ')
    .replace(/⋅|∙/g, '\\cdot ')
    .replace(/∞/g, '\\infty ')
    .replace(/⇔|⟺/g, '\\Leftrightarrow ')
    .replace(/⇒|⟹/g, '\\Rightarrow ')
    .replace(/→|⟶/g, '\\to ')
    .replace(/ℝ/g, '\\mathbb{R}')
    .replace(/ℤ/g, '\\mathbb{Z}')
    .replace(/ℕ/g, '\\mathbb{N}')
    .replace(/ℚ/g, '\\mathbb{Q}')
    .replace(/ℂ/g, '\\mathbb{C}')
    .replace(/α/g, '\\alpha ')
    .replace(/β/g, '\\beta ')
    .replace(/γ/g, '\\gamma ')
    .replace(/δ/g, '\\delta ')
    .replace(/ε/g, '\\varepsilon ')
    .replace(/φ/g, '\\varphi ')
    .replace(/π/g, '\\pi ')
    .replace(/Δ/g, '\\Delta ')
    .replace(/Ω/g, '\\Omega ')
    .replace(/⊥/g, '\\perp ')
    .replace(/∥/g, '\\parallel ')
    .replace(/°/g, '^\\circ ')
    .replace(/²/g, '^{2}')
    .replace(/³/g, '^{3}')
    .replace(/⁴/g, '^{4}')
    .replace(/−/g, '-')
    .replace(/(\d),(\d)/g, '$1{,}$2')
    .trim();

  // Tự động cân bằng dấu ngoặc nhọn { } không có \ phía trước để tránh lỗi KaTeX render màu đỏ
  let balanced = '';
  let depth = 0;
  for (let i = 0; i < cleaned.length; i++) {
    const ch = cleaned[i];
    const prev = i > 0 ? cleaned[i - 1] : '';
    if (ch === '{' && prev !== '\\') {
      depth++;
      balanced += ch;
    } else if (ch === '}' && prev !== '\\') {
      if (depth > 0) {
        depth--;
        balanced += ch;
      }
    } else {
      balanced += ch;
    }
  }
  if (depth > 0) {
    balanced += '}'.repeat(depth);
  }
  return balanced;
}

/**
 * Tự động bọc $...$ cho các biểu thức LaTeX hoặc ký hiệu toán học bị thiếu cặp dấu $...$ trong văn bản
 */
function preprocessRawMathContent(input: string): string {
  if (!input) return '';

  // Chuẩn hóa thẻ <img src="..."> sang [IMG:...]
  let s = input
    .replace(/<img\b[^>]*src=["']([^"']+)["'][^>]*>/gi, '[IMG:$1]')
    .replace(/\\\[([\s\S]*?)\\\]/g, '$$$$$1$$$$')
    .replace(/\\\(([\s\S]*?)\\\)/g, '$$$1$$');

  // Bảo vệ các khối \begin{tikzpicture}...\end{tikzpicture}, [IMG:...], $$...$$ và $...$ đã có sẵn
  const saved: string[] = [];
  s = s.replace(
    /\\begin\{tikzpicture\}[\s\S]*?\\end\{tikzpicture\}|\[IMG:[^\]]+\]|\$\$[\s\S]*?\$\$|\$[\s\S]+?\$/g,
    (m) => {
      const idx = saved.length;
      saved.push(m);
      return `__SAVED_MATH_${idx}__`;
    }
  );

  // Tự động bọc $...$ cho các lệnh LaTeX bị viết trần ngoài dấu $
  s = s
    .replace(
      /(\\begin\{(?:cases|aligned|matrix|pmatrix|bmatrix|vmatrix)\}[\s\S]*?\\end\{(?:cases|aligned|matrix|pmatrix|bmatrix|vmatrix)\})/g,
      '$$$1$$'
    )
    .replace(/(\\frac\{[^{}]+\}\{[^{}]+\})/g, '$$$1$$')
    .replace(/(\\sqrt(?:\[[^\]]+\])?\{[^{}]+\})/g, '$$$1$$')
    .replace(/(\\(?:widehat|overrightarrow|overline|underline)\{[^{}]+\})/g, '$$$1$$')
    .replace(/(\\mathbb\{[RZNQC]\})/g, '$$$1$$')
    .replace(/(\d+)\s*°/g, '$$$1^\\circ$$')
    .replace(/([a-zA-Z0-9\)\}])\s*²/g, '$$$1^2$$')
    .replace(/([a-zA-Z0-9\)\}])\s*³/g, '$$$1^3$$')
    .replace(/∀/g, '$$\\forall$$')
    .replace(/∃/g, '$$\\exists$$')
    .replace(/∉/g, '$$\\notin$$')
    .replace(/∈/g, '$$\\in$$')
    .replace(/⊆/g, '$$\\subseteq$$')
    .replace(/⊂/g, '$$\\subset$$')
    .replace(/∪/g, '$$\\cup$$')
    .replace(/∩/g, '$$\\cap$$')
    .replace(/∅/g, '$$\\emptyset$$')
    .replace(/≤|⩽/g, '$$\\le$$')
    .replace(/≥|⩾/g, '$$\\ge$$')
    .replace(/≠/g, '$$\\neq$$')
    .replace(/≈/g, '$$\\approx$$')
    .replace(/±/g, '$$\\pm$$')
    .replace(/∞/g, '$$\\infty$$')
    .replace(/⇔|⟺/g, '$$\\Leftrightarrow$$')
    .replace(/⇒|⟹/g, '$$\\Rightarrow$$')
    .replace(/⊥/g, '$$\\perp$$')
    .replace(/∥/g, '$$\\parallel$$')
    .replace(/ℝ/g, '$$\\mathbb{R}$$')
    .replace(/ℤ/g, '$$\\mathbb{Z}$$')
    .replace(/ℕ/g, '$$\\mathbb{N}$$')
    .replace(/ℚ/g, '$$\\mathbb{Q}$$');

  // Khôi phục các khối đã bảo vệ
  s = s.replace(/__SAVED_MATH_(\d+)__/g, (_, idxStr) => {
    return saved[parseInt(idxStr, 10)] || '';
  });

  return s;
}

const katexHtmlCache = new Map<string, string>();

function renderCachedKatex(cleanMath: string, isDisplay: boolean): string {
  const cacheKey = `${isDisplay ? 'D:' : 'I:'}${cleanMath}`;
  const cached = katexHtmlCache.get(cacheKey);
  if (cached !== undefined) return cached;

  const html = katex.renderToString(cleanMath, {
    displayMode: isDisplay,
    throwOnError: false,
    errorColor: 'currentColor',
    strict: false,
    trust: true,
    macros: KATEX_MACROS,
    output: 'htmlAndMathml',
  });

  if (katexHtmlCache.size > 4000) {
    katexHtmlCache.clear();
  }
  katexHtmlCache.set(cacheKey, html);
  return html;
}

export const MathRenderer: React.FC<MathRendererProps> = React.memo(({
  content,
  className = '',
}) => {
  const renderedContent = useMemo<MathPart[]>(() => {
    if (!content) return [];

    const normalized = preprocessRawMathContent(content);
    const parts: MathPart[] = [];

    // Phân tách theo \begin{tikzpicture}...\end{tikzpicture}, [IMG:...], $$...$$ hoặc $...$
    const regex =
      /(\\begin\{tikzpicture\}[\s\S]*?\\end\{tikzpicture\})|\[IMG:([^\]]+)\]|\$\$([\s\S]*?)\$\$|\$([\s\S]+?)\$/g;
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(normalized)) !== null) {
      if (match.index > lastIndex) {
        parts.push({
          type: 'text',
          value: normalized.substring(lastIndex, match.index),
        });
      }

      if (match[1] !== undefined) {
        parts.push({
          type: 'tikz',
          value: match[1],
        });
      } else if (match[2] !== undefined) {
        parts.push({
          type: 'image',
          value: match[2].trim(),
        });
      } else if (match[3] !== undefined) {
        parts.push({
          type: 'block-math',
          value: match[3],
        });
      } else if (match[4] !== undefined) {
        parts.push({
          type: 'inline-math',
          value: match[4],
        });
      }

      lastIndex = regex.lastIndex;
    }

    if (lastIndex < normalized.length) {
      parts.push({
        type: 'text',
        value: normalized.substring(lastIndex),
      });
    }

    return parts;
  }, [content]);

  let isBoldActive = false;

  return (
    <span
      className={`leading-relaxed font-times break-words max-w-full ${className}`}
      style={{ fontFamily: "'Times New Roman', Times, Georgia, serif" }}
    >
      {renderedContent.map((part, index) => {
        if (part.type === 'tikz') {
          return (
            <span key={index} className="block my-2 max-w-full overflow-x-auto">
              <TikzFigure type="custom" tikzCode={part.value} />
            </span>
          );
        }

        if (part.type === 'image') {
          return (
            <span key={index} className="block my-2.5 text-center">
              <img
                src={part.value}
                alt="Hình vẽ minh họa đề toán"
                className="max-h-64 max-w-full mx-auto rounded-lg border border-slate-300 bg-white p-2 shadow-xs object-contain"
              />
            </span>
          );
        }

        if (part.type === 'text') {
          const lines = part.value.split('\n');
          return (
            <React.Fragment key={index}>
              {lines.map((line, lineIdx) => {
                const tokens = line.split('**');
                return (
                  <React.Fragment key={lineIdx}>
                    {tokens.map((token, tokIdx) => {
                      if (tokIdx > 0) {
                        isBoldActive = !isBoldActive;
                      }
                      if (!token) return null;
                      return isBoldActive ? (
                        <strong key={tokIdx} className="font-bold text-amber-200/95">
                          {token}
                        </strong>
                      ) : (
                        <React.Fragment key={tokIdx}>{token}</React.Fragment>
                      );
                    })}
                    {lineIdx < lines.length - 1 && <br />}
                  </React.Fragment>
                );
              })}
            </React.Fragment>
          );
        }

        const isDisplay = part.type === 'block-math';
        const cleanMath = sanitizeLatexFormula(part.value);
        const boldClass = isBoldActive ? 'font-bold text-amber-200/95' : '';

        try {
          const html = renderCachedKatex(cleanMath, isDisplay);

          return isDisplay ? (
            <span
              key={index}
              className="block my-2 text-center overflow-x-auto overflow-y-hidden no-scrollbar max-w-full py-1 font-math"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          ) : (
            <span
              key={index}
              className={`inline-math mx-0.5 align-baseline ${boldClass}`}
              dangerouslySetInnerHTML={{ __html: html }}
            />
          );
        } catch {
          return (
            <code
              key={index}
              className="text-amber-300 bg-amber-950/50 px-1 py-0.5 rounded text-sm font-mono break-all"
            >
              ${cleanMath}$
            </code>
          );
        }
      })}
    </span>
  );
});

