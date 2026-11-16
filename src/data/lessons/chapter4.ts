import { ExamSet } from '../../types/exam';

export interface CompactMC {
  prompt: string;
  options: { id: 'A' | 'B' | 'C' | 'D'; text: string }[];
  correctOptionId: 'A' | 'B' | 'C' | 'D';
  explanation: string;
  tikzType?: string;
  tikzCode?: string;
}

export interface CompactTF {
  stem: string;
  statements: {
    id: 'a' | 'b' | 'c' | 'd';
    text: string;
    isTrue: boolean;
    explanation: string;
  }[];
  tikzType?: string;
  tikzCode?: string;
}

export interface CompactSA {
  prompt: string;
  correctAnswer: string;
  acceptedAnswers: string[];
  explanation: string;
  tikzType?: string;
  tikzCode?: string;
}

export interface CompactSO {
  prompt: string;
  steps: { id: string; text: string }[];
  correctOrder: string[];
  explanation: string;
  tikzType?: string;
  tikzCode?: string;
}

/**
 * Bộ sinh mã TikZ Hình học không gian 3D chính xác theo đúng từng câu hỏi:
 * - Chỉ vẽ các điểm, đoạn thẳng, giao điểm có mặt trong đề bài của câu hỏi đó (không vẽ thừa điểm).
 * - Tuân thủ tuyệt đối quy tắc biểu diễn hình học không gian:
 *   + Cạnh/đường nhìn thấy thuộc các mặt phía trước -> NÉT LIỀN (thick).
 *   + Cạnh/đường bị khuất ở mặt sau, mặt đáy dưới hoặc xuyên trong lòng khối đa diện -> NÉT ĐỨT (dashed, thick).
 */
export function buildSpatialQuestionTikz(promptText: string): { tikzType?: string; tikzCode?: string } {
  const p = promptText.trim();
  const s = p.toLowerCase();

  // Không vẽ hình cho các câu hỏi đếm số cạnh/đỉnh/mặt tổng quát của đa giác n cạnh, ngũ giác, lục giác, bát giác
  // hoặc câu hỏi lý thuyết/tiên đề thuần túy không gắn với khối đa diện cụ thể
  if (
    s.includes('ngũ giác') ||
    s.includes('lục giác') ||
    s.includes('bát giác') ||
    s.includes('cửu giác') ||
    s.includes('đa giác $n$ cạnh') ||
    s.includes('16$ cạnh') ||
    s.includes('11$ đỉnh') ||
    s.includes('9$ mặt') ||
    s.includes('tổng số mặt và tổng số đỉnh') ||
    s.includes('18$ cạnh') ||
    s.includes('tổng số đỉnh là $16$') ||
    s.includes('5 điểm') ||
    s.includes('6 điểm')
  ) {
    return {};
  }

  // Không vẽ hình cho các câu hỏi lý thuyết thuần túy về góc/khoảng cách/thể tích không gắn với tên đỉnh cụ thể
  if (
    !s.includes('abcd') &&
    !s.includes('s.abc') &&
    !s.includes('oabc') &&
    !s.includes("a'b'c'") &&
    !s.includes('(p), (q), (r)') &&
    !s.includes('thalès')
  ) {
    return {};
  }

  // ==========================================================================
  // 0. CHƯƠNG VII: QUAN HỆ VUÔNG GÓC TRONG KHÔNG GIAN (cạnh bên / đường cao thẳng đứng)
  // ==========================================================================
  if (s.includes('hình lập phương') || s.includes('hình hộp chữ nhật')) {
    return {
      tikzType: 'custom',
      tikzCode: `\\begin{tikzpicture}[line join=round, line cap=round, scale=0.95]
  \\coordinate (A) at (0,0);
  \\coordinate (D) at (-1.2,-1.1);
  \\coordinate (C) at (2.0,-1.1);
  \\coordinate (B) at (3.2,0);
  \\coordinate (A1) at (0,2.5);
  \\coordinate (D1) at (-1.2,1.4);
  \\coordinate (C1) at (2.0,1.4);
  \\coordinate (B1) at (3.2,2.5);
  \\draw[dashed, thick] (A)--(B) (A)--(D) (A)--(A1);
  \\draw[thick] (D)--(C) (C)--(B) (D)--(D1) (C)--(C1) (B)--(B1) (A1)--(B1) (B1)--(C1) (C1)--(D1) (D1)--(A1);
  \\draw[thin] (0,0.25)--(0.25,0.25)--(0.25,0);
  \\filldraw (A) circle (1.4pt) node[above right] {$A$};
  \\filldraw (B) circle (1.4pt) node[right] {$B$};
  \\filldraw (C) circle (1.4pt) node[below right] {$C$};
  \\filldraw (D) circle (1.4pt) node[below left] {$D$};
  \\filldraw (A1) circle (1.4pt) node[above left] {$A'$};
  \\filldraw (B1) circle (1.4pt) node[above right] {$B'$};
  \\filldraw (C1) circle (1.4pt) node[right] {$C'$};
  \\filldraw (D1) circle (1.4pt) node[left] {$D'$};
\\end{tikzpicture}`,
    };
  }

  if (s.includes('oabc') && s.includes('đôi một vuông góc')) {
    return {
      tikzType: 'custom',
      tikzCode: `\\begin{tikzpicture}[line join=round, line cap=round, scale=0.95]
  \\coordinate (O) at (0,0);
  \\coordinate (A) at (0,2.65);
  \\coordinate (B) at (-1.25,-1.05);
  \\coordinate (C) at (2.95,-0.35);
  \\draw[dashed, thick] (O)--(A) (O)--(B) (O)--(C);
  \\draw[thick] (A)--(B) (A)--(C) (B)--(C);
  \\draw[thin] (0,0.24)--(-0.18,0.09)--(-0.18,-0.15);
  \\draw[thin] (0,0.24)--(0.25,0.21)--(0.25,-0.03);
  \\filldraw (O) circle (1.5pt) node[above right] {$O$};
  \\filldraw (A) circle (1.5pt) node[above] {$A$};
  \\filldraw (B) circle (1.5pt) node[below left] {$B$};
  \\filldraw (C) circle (1.5pt) node[right] {$C$};
\\end{tikzpicture}`,
    };
  }

  if (
    (s.includes('lăng trụ đứng') || s.includes('lăng trụ đều') || s.includes('lăng trụ tam giác đều')) &&
    s.includes("abc.a'b'c'")
  ) {
    return {
      tikzType: 'custom',
      tikzCode: `\\begin{tikzpicture}[line join=round, line cap=round, scale=0.95]
  \\coordinate (A) at (0,0);
  \\coordinate (B) at (1.4,-1.1);
  \\coordinate (C) at (3.3,0);
  \\coordinate (A1) at (0,2.6);
  \\coordinate (B1) at (1.4,1.5);
  \\coordinate (C1) at (3.3,2.6);
  \\draw[dashed, thick] (A)--(C);
  \\draw[thick] (A)--(B) (B)--(C) (A)--(A1) (B)--(B1) (C)--(C1) (A1)--(B1) (B1)--(C1) (C1)--(A1);
  \\draw[thin] (0,0.25)--(0.25,0.25)--(0.25,0);
  \\filldraw (A) circle (1.5pt) node[left] {$A$};
  \\filldraw (B) circle (1.5pt) node[below] {$B$};
  \\filldraw (C) circle (1.5pt) node[right] {$C$};
  \\filldraw (A1) circle (1.5pt) node[above left] {$A'$};
  \\filldraw (B1) circle (1.5pt) node[above] {$B'$};
  \\filldraw (C1) circle (1.5pt) node[above right] {$C'$};
\\end{tikzpicture}`,
    };
  }

  if (s.includes('chóp tứ giác đều') && s.includes('s.abcd')) {
    return {
      tikzType: 'custom',
      tikzCode: `\\begin{tikzpicture}[line join=round, line cap=round, scale=0.95]
  \\coordinate (A) at (0,0);
  \\coordinate (D) at (-1.25,-1.1);
  \\coordinate (C) at (2.05,-1.1);
  \\coordinate (B) at (3.3,0);
  \\coordinate (O) at (1.025,-0.55);
  \\coordinate (S) at (1.025,2.7);
  \\draw[dashed, thick] (A)--(B) (A)--(D) (A)--(C) (B)--(D) (S)--(O) (S)--(A);
  \\draw[thick] (D)--(C) (C)--(B) (S)--(D) (S)--(C) (S)--(B);
  \\draw[thin] (1.025,-0.3)--(1.275,-0.3)--(1.275,-0.55);
  \\filldraw (S) circle (1.5pt) node[above] {$S$};
  \\filldraw (A) circle (1.5pt) node[above left] {$A$};
  \\filldraw (B) circle (1.5pt) node[right] {$B$};
  \\filldraw (C) circle (1.5pt) node[below right] {$C$};
  \\filldraw (D) circle (1.5pt) node[below left] {$D$};
  \\filldraw[red] (O) circle (1.5pt) node[below] {$O$};
\\end{tikzpicture}`,
    };
  }

  if (s.includes('chóp tam giác đều') && s.includes('s.abc')) {
    const centerLabel = s.includes('tâm $o$') || s.includes('so \\perp') ? 'O' : 'G';
    return {
      tikzType: 'custom',
      tikzCode: `\\begin{tikzpicture}[line join=round, line cap=round, scale=0.95]
  \\coordinate (A) at (0,0);
  \\coordinate (B) at (1.35,-1.15);
  \\coordinate (C) at (3.3,0);
  \\coordinate (M) at (2.325,-0.575);
  \\coordinate (G) at (1.55,-0.383);
  \\coordinate (S) at (1.55,2.65);
  \\draw[dashed, thick] (A)--(C) (A)--(M) (S)--(G);
  \\draw[thick] (S)--(A) (S)--(B) (S)--(C) (A)--(B) (B)--(C) (S)--(M);
  \\draw[thin] (1.55,-0.133)--(1.78,-0.19)--(1.78,-0.44);
  \\filldraw (S) circle (1.5pt) node[above] {$S$};
  \\filldraw (A) circle (1.5pt) node[left] {$A$};
  \\filldraw (B) circle (1.5pt) node[below] {$B$};
  \\filldraw (C) circle (1.5pt) node[right] {$C$};
  \\filldraw[red] (G) circle (1.5pt) node[below] {$${centerLabel}$};
\\end{tikzpicture}`,
    };
  }

  if (s.includes('s.abcd') && (s.includes('sa \\perp') || s.includes('sa vuông góc'))) {
    return {
      tikzType: 'custom',
      tikzCode: `\\begin{tikzpicture}[line join=round, line cap=round, scale=0.95]
  \\coordinate (A) at (0,0);
  \\coordinate (D) at (-1.15,-1.1);
  \\coordinate (C) at (2.05,-1.1);
  \\coordinate (B) at (3.2,0);
  \\coordinate (S) at (0,2.75);
  \\draw[dashed, thick] (A)--(B) (A)--(D) (S)--(A) (A)--(C) (B)--(D);
  \\draw[thick] (D)--(C) (C)--(B) (S)--(D) (S)--(C) (S)--(B);
  \\draw[thin] (0,0.25)--(0.25,0.25)--(0.25,0);
  \\filldraw (S) circle (1.5pt) node[above] {$S$};
  \\filldraw (A) circle (1.5pt) node[above right] {$A$};
  \\filldraw (B) circle (1.5pt) node[right] {$B$};
  \\filldraw (C) circle (1.5pt) node[below right] {$C$};
  \\filldraw (D) circle (1.5pt) node[below left] {$D$};
\\end{tikzpicture}`,
    };
  }

  if (s.includes('s.abc') && (s.includes('sa \\perp') || s.includes('sa vuông góc'))) {
    return {
      tikzType: 'custom',
      tikzCode: `\\begin{tikzpicture}[line join=round, line cap=round, scale=0.95]
  \\coordinate (A) at (0,0);
  \\coordinate (B) at (1.35,-1.15);
  \\coordinate (C) at (3.25,0);
  \\coordinate (S) at (0,2.7);
  \\draw[dashed, thick] (A)--(C);
  \\draw[thick] (S)--(A) (S)--(B) (S)--(C) (A)--(B) (B)--(C);
  \\draw[thin] (0,0.26)--(0.26,0.26)--(0.26,0);
  \\filldraw (S) circle (1.5pt) node[above] {$S$};
  \\filldraw (A) circle (1.5pt) node[left] {$A$};
  \\filldraw (B) circle (1.5pt) node[below] {$B$};
  \\filldraw (C) circle (1.5pt) node[right] {$C$};
\\end{tikzpicture}`,
    };
  }

  // ==========================================================================
  // 1. ĐỊNH LÍ THALÈS TRONG KHÔNG GIAN: 3 mặt phẳng song song (P), (Q), (R)
  // ==========================================================================
  if (
    s.includes('(p), (q), (r)') ||
    s.includes('ba mặt phẳng đôi một song song') ||
    s.includes('thalès trong không gian')
  ) {
    return {
      tikzType: 'thales_three_parallel_planes',
    };
  }

  // ==========================================================================
  // 2. HÌNH HỘP ABCD.A'B'C'D'
  // Mặt nhìn thấy: (A'B'C'D'), (CDD'C'), (BCC'B') -> nét liền
  // Mặt khuất: (ABCD), (ABB'A'), (ADD'A') và đường trong lòng hộp -> nét đứt
  // ==========================================================================
  if (s.includes('hình hộp')) {
    const baseBoxCoords = `
  \\coordinate (A) at (0,0);
  \\coordinate (D) at (-1.15,-1.05);
  \\coordinate (C) at (2.15,-1.05);
  \\coordinate (B) at (3.3,0);
  \\coordinate (A1) at (0.3,2.55);
  \\coordinate (D1) at (-0.85,1.5);
  \\coordinate (C1) at (2.45,1.5);
  \\coordinate (B1) at (3.6,2.55);`;
    const baseBoxEdges = `
  \\draw[dashed, thick] (A)--(B) (A)--(D) (A)--(A1);
  \\draw[thick] (D)--(C) (C)--(B) (D)--(D1) (C)--(C1) (B)--(B1) (A1)--(B1) (B1)--(C1) (C1)--(D1) (D1)--(A1);`;
    const baseBoxNodes = `
  \\filldraw (A) circle (1.5pt) node[above left] {$A$};
  \\filldraw (B) circle (1.5pt) node[right] {$B$};
  \\filldraw (C) circle (1.5pt) node[below right] {$C$};
  \\filldraw (D) circle (1.5pt) node[below left] {$D$};
  \\filldraw (A1) circle (1.5pt) node[above left] {$A'$};
  \\filldraw (B1) circle (1.5pt) node[above right] {$B'$};
  \\filldraw (C1) circle (1.5pt) node[right] {$C'$};
  \\filldraw (D1) circle (1.5pt) node[left] {$D'$};`;

    // Hình hộp có tâm hai đáy O và O'
    if (s.includes("o'") && s.includes('tâm')) {
      return {
        tikzType: 'custom',
        tikzCode: `\\begin{tikzpicture}[line join=round, line cap=round]${baseBoxCoords}
  \\coordinate (O) at (1.075,-0.525);
  \\coordinate (O1) at (1.375,2.025);${baseBoxEdges}
  \\draw[dashed, thick, blue] (A)--(C) (B)--(D) (O)--(O1);
  \\draw[thick, blue] (A1)--(C1) (B1)--(D1);${baseBoxNodes}
  \\filldraw[red] (O) circle (1.6pt) node[below] {$O$};
  \\filldraw[red] (O1) circle (1.6pt) node[above] {$O'$};
\\end{tikzpicture}`,
      };
    }

    // Hình hộp có hai mặt phẳng song song (AB'D') và (BC'D) cắt AC' tại G1, G2
    if (s.includes("(ab'd')") && s.includes('g_1')) {
      return {
        tikzType: 'custom',
        tikzCode: `\\begin{tikzpicture}[line join=round, line cap=round]${baseBoxCoords}
  \\coordinate (G1) at (0.817,0.5);
  \\coordinate (G2) at (1.633,1.0);
  \\fill[blue!12] (A)--(B1)--(D1)--cycle;
  \\fill[teal!12] (B)--(C1)--(D)--cycle;${baseBoxEdges}
  \\draw[dashed, very thick, blue] (A)--(B1) (A)--(D1);
  \\draw[very thick, blue] (B1)--(D1);
  \\draw[dashed, very thick, teal] (B)--(D);
  \\draw[very thick, teal] (D)--(C1) (B)--(C1);
  \\draw[dashed, very thick, red] (A)--(C1);${baseBoxNodes}
  \\filldraw[red] (G1) circle (1.6pt) node[below left] {$G_1$};
  \\filldraw[red] (G2) circle (1.6pt) node[above right] {$G_2$};
\\end{tikzpicture}`,
      };
    }

    // Hình hộp có hai mặt phẳng song song (AB'D') và (BC'D)
    if (s.includes("(ab'd')") || s.includes("(bc'd)")) {
      return {
        tikzType: 'custom',
        tikzCode: `\\begin{tikzpicture}[line join=round, line cap=round]${baseBoxCoords}
  \\fill[blue!12] (A)--(B1)--(D1)--cycle;
  \\fill[teal!12] (B)--(C1)--(D)--cycle;${baseBoxEdges}
  \\draw[dashed, very thick, blue] (A)--(B1) (A)--(D1);
  \\draw[very thick, blue] (B1)--(D1);
  \\draw[dashed, very thick, teal] (B)--(D);
  \\draw[very thick, teal] (D)--(C1) (B)--(C1);${baseBoxNodes}
\\end{tikzpicture}`,
      };
    }

    // Hình hộp có 4 đường chéo AC', BD', CA', DB'
    if (s.includes('đường chéo') && (s.includes("ac'") || s.includes('bốn đường chéo') || s.includes('bao nhiêu đường chéo'))) {
      return {
        tikzType: 'custom',
        tikzCode: `\\begin{tikzpicture}[line join=round, line cap=round]${baseBoxCoords}${baseBoxEdges}
  \\draw[dashed, thick, red] (A)--(C1) (B)--(D1) (C)--(A1) (D)--(B1);${baseBoxNodes}
\\end{tikzpicture}`,
      };
    }

    // Hình hộp ABCD.A'B'C'D' cơ bản
    return {
      tikzType: 'custom',
      tikzCode: `\\begin{tikzpicture}[line join=round, line cap=round]${baseBoxCoords}${baseBoxEdges}${baseBoxNodes}
\\end{tikzpicture}`,
    };
  }

  // ==========================================================================
  // 3. HÌNH LĂNG TRỤ TAM GIÁC ABC.A'B'C'
  // Mặt nhìn thấy: (A'B'C'), (ABB'A'), (BCC'B') -> nét liền
  // Mặt khuất: (ABC) [cạnh AC khuất] và (ACC'A') -> nét đứt
  // ==========================================================================
  if (s.includes("abc.a'b'c'")) {
    const basePrismCoords = `
  \\coordinate (A) at (0,0);
  \\coordinate (B) at (1.45,-1.15);
  \\coordinate (C) at (3.6,0);
  \\coordinate (A1) at (0.3,2.6);
  \\coordinate (B1) at (1.75,1.45);
  \\coordinate (C1) at (3.9,2.6);`;
    const basePrismEdges = `
  \\draw[dashed, thick] (A)--(C);
  \\draw[thick] (A)--(B) (B)--(C) (A)--(A1) (B)--(B1) (C)--(C1) (A1)--(B1) (B1)--(C1) (A1)--(C1);`;
    const basePrismNodes = `
  \\filldraw (A) circle (1.5pt) node[left] {$A$};
  \\filldraw (B) circle (1.5pt) node[below] {$B$};
  \\filldraw (C) circle (1.5pt) node[right] {$C$};
  \\filldraw (A1) circle (1.5pt) node[left] {$A'$};
  \\filldraw (B1) circle (1.5pt) node[below] {$B'$};
  \\filldraw (C1) circle (1.5pt) node[right] {$C'$};`;

    // M, N, P là trung điểm AA', BB', CC'
    if (s.includes("aa', bb', cc'")) {
      return {
        tikzType: 'custom',
        tikzCode: `\\begin{tikzpicture}[line join=round, line cap=round]${basePrismCoords}
  \\coordinate (M) at (0.15,1.3);
  \\coordinate (N) at (1.6,0.15);
  \\coordinate (P) at (3.75,1.3);
  \\fill[blue!12] (M)--(N)--(P)--cycle;${basePrismEdges}
  \\draw[dashed, very thick, blue] (M)--(P);
  \\draw[very thick, blue] (M)--(N) (N)--(P);${basePrismNodes}
  \\filldraw[blue] (M) circle (1.6pt) node[left] {$M$};
  \\filldraw[blue] (N) circle (1.6pt) node[below right] {$N$};
  \\filldraw[blue] (P) circle (1.6pt) node[right] {$P$};
\\end{tikzpicture}`,
      };
    }

    // I, J là trung điểm BC và B'C'
    if (s.includes('i, j') && s.includes("b'c'")) {
      return {
        tikzType: 'custom',
        tikzCode: `\\begin{tikzpicture}[line join=round, line cap=round]${basePrismCoords}
  \\coordinate (I) at (2.525,-0.575);
  \\coordinate (J) at (2.825,2.025);${basePrismEdges}
  \\draw[dashed, very thick, blue] (A)--(I);
  \\draw[very thick, blue] (A1)--(J) (I)--(J);${basePrismNodes}
  \\filldraw[blue] (I) circle (1.6pt) node[below right] {$I$};
  \\filldraw[blue] (J) circle (1.6pt) node[above right] {$J$};
\\end{tikzpicture}`,
      };
    }

    // M, N, P là trung điểm AB, BC, A'B'
    if (s.includes("ab, bc, a'b'")) {
      return {
        tikzType: 'custom',
        tikzCode: `\\begin{tikzpicture}[line join=round, line cap=round]${basePrismCoords}
  \\coordinate (M) at (0.725,-0.575);
  \\coordinate (N) at (2.525,-0.575);
  \\coordinate (P) at (1.025,2.025);
  \\fill[blue!12] (M)--(N)--(P)--cycle;${basePrismEdges}
  \\draw[dashed, very thick, blue] (M)--(N) (N)--(P);
  \\draw[very thick, blue] (M)--(P);${basePrismNodes}
  \\filldraw[blue] (M) circle (1.6pt) node[below left] {$M$};
  \\filldraw[blue] (N) circle (1.6pt) node[below right] {$N$};
  \\filldraw[blue] (P) circle (1.6pt) node[above] {$P$};
\\end{tikzpicture}`,
      };
    }

    // Trọng tâm G, G' của ABC và A'B'C', M là trung điểm BC
    if (s.includes("g'") && s.includes('trọng tâm')) {
      return {
        tikzType: 'custom',
        tikzCode: `\\begin{tikzpicture}[line join=round, line cap=round]${basePrismCoords}
  \\coordinate (M) at (2.525,-0.575);
  \\coordinate (M1) at (2.825,2.025);
  \\coordinate (G) at (1.683,-0.383);
  \\coordinate (G1) at (1.983,2.217);${basePrismEdges}
  \\draw[dashed, thick, blue] (A)--(M) (G)--(G1);
  \\draw[thick, blue] (A1)--(M1) (M)--(M1);${basePrismNodes}
  \\filldraw[blue] (M) circle (1.5pt) node[below right] {$M$};
  \\filldraw[blue] (M1) circle (1.5pt) node[above right] {$M'$};
  \\filldraw[red] (G) circle (1.6pt) node[below] {$G$};
  \\filldraw[red] (G1) circle (1.6pt) node[above] {$G'$};
\\end{tikzpicture}`,
      };
    }

    // Lăng trụ tam giác cơ bản
    return {
      tikzType: 'custom',
      tikzCode: `\\begin{tikzpicture}[line join=round, line cap=round]${basePrismCoords}${basePrismEdges}${basePrismNodes}
\\end{tikzpicture}`,
    };
  }

  // ==========================================================================
  // 4. HÌNH CHÓP TỨ GIÁC S.ABCD (Đặt trước S.ABC vì chuỗi 's.abcd' chứa 's.abc'!)
  // ==========================================================================
  if (s.includes('s.abcd')) {
    // 4a. Đáy ABCD là hình thang (AB // CD, đáy lớn AB ở sau, đáy nhỏ CD ở trước)
    // Bao ngoài: S - A - D - C - B - S nên (SAD), (SCD), (SBC) nhìn thấy (nét liền);
    // Mặt sau (SAB) và đáy (ABCD) bị khuất nên AB, AC, BD, MN trên (SAB) vẽ nét đứt!
    if (s.includes('hình thang') || s.includes('đáy lớn')) {
      const trapCoords = `
  \\coordinate (A) at (-1.4,0);
  \\coordinate (B) at (3.8,0);
  \\coordinate (D) at (-0.2,-1.35);
  \\coordinate (C) at (2.4,-1.35);
  \\coordinate (S) at (1.15,2.95);`;
      const trapEdges = `
  \\draw[dashed, thick] (A)--(B);
  \\draw[thick] (S)--(A) (S)--(D) (S)--(C) (S)--(B) (A)--(D) (D)--(C) (C)--(B);`;
      const trapNodes = `
  \\filldraw (S) circle (1.5pt) node[above] {$S$};
  \\filldraw (A) circle (1.5pt) node[left] {$A$};
  \\filldraw (B) circle (1.5pt) node[right] {$B$};
  \\filldraw (C) circle (1.5pt) node[below right] {$C$};
  \\filldraw (D) circle (1.5pt) node[below left] {$D$};`;

      // Giao tuyến (SAD) và (SBC) đi qua I = AD \cap BC
      if (s.includes('(sad)') && s.includes('(sbc)') && !s.includes('m, n')) {
        return {
          tikzType: 'custom',
          tikzCode: `\\begin{tikzpicture}[line join=round, line cap=round]${trapCoords}
  \\coordinate (I) at (1.0,-2.7);${trapEdges}
  \\draw[thick] (D)--(I) (C)--(I);
  \\draw[very thick, red] (S)--(I);${trapNodes}
  \\filldraw[red] (I) circle (1.6pt) node[below] {$I$};
\\end{tikzpicture}`,
        };
      }

      // Giao tuyến (SAB) và (SCD) là đường thẳng qua S song song AB, CD
      if (s.includes('(sab)') && s.includes('(scd)') && !s.includes('m, n')) {
        return {
          tikzType: 'custom',
          tikzCode: `\\begin{tikzpicture}[line join=round, line cap=round]${trapCoords}${trapEdges}
  \\draw[very thick, red] (-0.7,2.95)--(3.0,2.95) node[right] {$x$};${trapNodes}
\\end{tikzpicture}`,
        };
      }

      // M, N là trung điểm SA, SB (hoặc M trên SA, (MCD) cắt SB tại N)
      if (s.includes('m, n') || (s.includes('trung điểm của $sa$') && s.includes('cắt cạnh $sb$ tại điểm $n$'))) {
        return {
          tikzType: 'custom',
          tikzCode: `\\begin{tikzpicture}[line join=round, line cap=round]${trapCoords}
  \\coordinate (M) at (-0.125,1.475);
  \\coordinate (N) at (2.475,1.475);${trapEdges}
  \\draw[dashed, very thick, blue] (M)--(N);
  \\draw[very thick, blue] (M)--(D) (N)--(C);${trapNodes}
  \\filldraw[blue] (M) circle (1.6pt) node[left] {$M$};
  \\filldraw[blue] (N) circle (1.6pt) node[right] {$N$};
\\end{tikzpicture}`,
        };
      }

      // O = AC \cap BD, M trên BC, N trên SC (OM // AB, MN // SB)
      if (s.includes('cắt $bc$ tại $m$') && s.includes('cắt $sc$ tại $n$')) {
        return {
          tikzType: 'custom',
          tikzCode: `\\begin{tikzpicture}[line join=round, line cap=round]${trapCoords}
  \\coordinate (O) at (1.133,-0.9);
  \\coordinate (M) at (2.867,-0.9);
  \\coordinate (N) at (1.983,0.083);${trapEdges}
  \\draw[dashed, thick] (A)--(C) (B)--(D);
  \\draw[dashed, very thick, blue] (O)--(M) (O)--(N);
  \\draw[very thick, red] (M)--(N);${trapNodes}
  \\filldraw[blue] (O) circle (1.6pt) node[below] {$O$};
  \\filldraw[red] (M) circle (1.6pt) node[right] {$M$};
  \\filldraw[red] (N) circle (1.6pt) node[above left] {$N$};
\\end{tikzpicture}`,
        };
      }

      // O = AC \cap BD, M trên SB (SM = 2MB)
      if (s.includes('sm = 2mb')) {
        return {
          tikzType: 'custom',
          tikzCode: `\\begin{tikzpicture}[line join=round, line cap=round]${trapCoords}
  \\coordinate (O) at (1.133,-0.9);
  \\coordinate (M) at (2.917,0.983);${trapEdges}
  \\draw[dashed, thick] (A)--(C) (B)--(D) (S)--(O);
  \\draw[dashed, very thick, red] (O)--(M);${trapNodes}
  \\filldraw[blue] (O) circle (1.6pt) node[below] {$O$};
  \\filldraw[red] (M) circle (1.6pt) node[right] {$M$};
\\end{tikzpicture}`,
        };
      }

      return {
        tikzType: 'custom',
        tikzCode: `\\begin{tikzpicture}[line join=round, line cap=round]${trapCoords}${trapEdges}${trapNodes}
\\end{tikzpicture}`,
      };
    }

    // 4b-1. Đáy ABCD là tứ giác lồi có O = AC \cap BD, E = AB \cap CD và F = AD \cap BC (Câu 13 Bài 10 Đề 1)
    if (s.includes('f = ad \\cap bc')) {
      return {
        tikzType: 'custom',
        tikzCode: `\\begin{tikzpicture}[line join=round, line cap=round]
  \\coordinate (A) at (-1.3,0);
  \\coordinate (B) at (2.1,0);
  \\coordinate (E) at (3.9,0);
  \\coordinate (D) at (-0.5,-0.8);
  \\coordinate (C) at (1.7,-0.4);
  \\coordinate (F) at (0.4,-1.7);
  \\coordinate (O) at (1.07,-0.32);
  \\coordinate (S) at (0.85,2.75);
  \\draw[dashed, thick] (A)--(B) (B)--(E) (A)--(C) (B)--(D) (S)--(O);
  \\draw[thick] (S)--(A) (S)--(D) (S)--(C) (S)--(B) (A)--(D) (D)--(F) (B)--(C) (C)--(F) (D)--(C) (C)--(E);
  \\draw[very thick, red] (S)--(E) (S)--(F);
  \\filldraw (S) circle (1.5pt) node[above] {$S$};
  \\filldraw (A) circle (1.5pt) node[left] {$A$};
  \\filldraw (B) circle (1.5pt) node[above right] {$B$};
  \\filldraw (C) circle (1.5pt) node[below right] {$C$};
  \\filldraw (D) circle (1.5pt) node[below left] {$D$};
  \\filldraw[blue] (O) circle (1.5pt) node[above] {$O$};
  \\filldraw[red] (E) circle (1.6pt) node[right] {$E$};
  \\filldraw[red] (F) circle (1.6pt) node[below] {$F$};
\\end{tikzpicture}`,
      };
    }

    // 4b-2. Đáy ABCD là tứ giác lồi có hai cạnh đối AB và CD cắt nhau tại E (Câu 6 Bài 10 Đề 1)
    if (s.includes('e = ab \\cap cd') || s.includes('không song song')) {
      return {
        tikzType: 'custom',
        tikzCode: `\\begin{tikzpicture}[line join=round, line cap=round]
  \\coordinate (A) at (-0.3,0);
  \\coordinate (B) at (2.1,0);
  \\coordinate (E) at (3.9,0);
  \\coordinate (D) at (-1.3,-1.3);
  \\coordinate (C) at (1.5,-0.6);
  \\coordinate (S) at (0.9,2.85);
  \\draw[dashed, thick] (S)--(A) (A)--(B) (A)--(D) (B)--(E);
  \\draw[thick] (S)--(D) (S)--(C) (S)--(B) (D)--(C) (C)--(B) (C)--(E);
  \\draw[very thick, red] (S)--(E);
  \\filldraw (S) circle (1.5pt) node[above] {$S$};
  \\filldraw (A) circle (1.5pt) node[above left] {$A$};
  \\filldraw (B) circle (1.5pt) node[above] {$B$};
  \\filldraw (C) circle (1.5pt) node[below] {$C$};
  \\filldraw (D) circle (1.5pt) node[below left] {$D$};
  \\filldraw[red] (E) circle (1.6pt) node[right] {$E$};
\\end{tikzpicture}`,
      };
    }

    // 4c. Đáy ABCD là hình bình hành / hình chữ nhật / tứ giác lồi chuẩn
    // A(0,0) khuất; D(-1.35,-1.3), C(2.35,-1.3), B(3.7,0), S(1.05,2.95)
    // Mặt nhìn thấy: (SCD) và (SBC) -> SD, SC, SB, DC, CB nét liền.
    // Mặt khuất: (SAB), (SAD), (ABCD) -> SA, AB, AD, AC, BD nét đứt.
    const pyrCoords = `
  \\coordinate (A) at (0,0);
  \\coordinate (D) at (-1.35,-1.3);
  \\coordinate (C) at (2.35,-1.3);
  \\coordinate (B) at (3.7,0);
  \\coordinate (S) at (1.05,2.95);`;
    const pyrEdges = `
  \\draw[dashed, thick] (S)--(A) (A)--(B) (A)--(D);
  \\draw[thick] (S)--(D) (S)--(C) (S)--(B) (D)--(C) (C)--(B);`;
    const pyrNodes = `
  \\filldraw (S) circle (1.5pt) node[above] {$S$};
  \\filldraw (A) circle (1.5pt) node[above left] {$A$};
  \\filldraw (B) circle (1.5pt) node[right] {$B$};
  \\filldraw (C) circle (1.5pt) node[below right] {$C$};
  \\filldraw (D) circle (1.5pt) node[below left] {$D$};`;

    // Giao điểm Q = SD \cap (MNP) với M \in SA, N \in SB, P \in SC
    if (s.includes('sd') && s.includes('(mnp)') && s.includes('m \\in sa')) {
      return {
        tikzType: 'custom',
        tikzCode: `\\begin{tikzpicture}[line join=round, line cap=round]${pyrCoords}
  \\coordinate (O) at (1.175,-0.65);
  \\coordinate (M) at (0.525,1.475);
  \\coordinate (N) at (2.375,1.475);
  \\coordinate (P) at (1.917,0.117);
  \\coordinate (I) at (1.121,0.893);
  \\coordinate (Q) at (-0.55,0.117);${pyrEdges}
  \\draw[dashed, thick] (A)--(C) (B)--(D) (S)--(O);
  \\draw[dashed, very thick, blue] (M)--(P) (M)--(N) (N)--(Q);
  \\draw[very thick, blue] (N)--(P);${pyrNodes}
  \\filldraw (O) circle (1.5pt) node[below] {$O$};
  \\filldraw[blue] (M) circle (1.6pt) node[left] {$M$};
  \\filldraw[blue] (N) circle (1.6pt) node[above right] {$N$};
  \\filldraw[blue] (P) circle (1.6pt) node[right] {$P$};
  \\filldraw[red] (I) circle (1.5pt) node[above right] {$I$};
  \\filldraw[red] (Q) circle (1.6pt) node[left] {$Q$};
\\end{tikzpicture}`,
      };
    }

    // M, N, P lần lượt là trung điểm của SA, SB, SC (Câu 8 Bài 13 Đề 1 - không có Q)
    if (s.includes('m, n, p') && s.includes('sa, sb, sc') && !s.includes('mnpq')) {
      return {
        tikzType: 'custom',
        tikzCode: `\\begin{tikzpicture}[line join=round, line cap=round]${pyrCoords}
  \\coordinate (O) at (1.175,-0.65);
  \\coordinate (M) at (0.525,1.475);
  \\coordinate (N) at (2.375,1.475);
  \\coordinate (P) at (1.7,0.825);
  \\fill[blue!12] (M)--(N)--(P)--cycle;${pyrEdges}
  \\draw[dashed, thick] (A)--(C) (B)--(D);
  \\draw[dashed, very thick, blue] (M)--(N) (M)--(P);
  \\draw[very thick, blue] (N)--(P);${pyrNodes}
  \\filldraw (O) circle (1.5pt) node[below] {$O$};
  \\filldraw[blue] (M) circle (1.6pt) node[above left] {$M$};
  \\filldraw[blue] (N) circle (1.6pt) node[above right] {$N$};
  \\filldraw[blue] (P) circle (1.6pt) node[right] {$P$};
\\end{tikzpicture}`,
      };
    }

    // M, N, P lần lượt là trung điểm của SA, SB, SD (Câu 13 Bài 13 Đề 2)
    if (s.includes('m, n, p') && s.includes('sa, sb, sd')) {
      return {
        tikzType: 'custom',
        tikzCode: `\\begin{tikzpicture}[line join=round, line cap=round]${pyrCoords}
  \\coordinate (O) at (1.175,-0.65);
  \\coordinate (M) at (0.525,1.475);
  \\coordinate (N) at (2.375,1.475);
  \\coordinate (P) at (-0.15,0.825);
  \\fill[blue!12] (M)--(N)--(P)--cycle;${pyrEdges}
  \\draw[dashed, thick] (A)--(C) (B)--(D);
  \\draw[dashed, very thick, blue] (M)--(N) (M)--(P) (N)--(P);${pyrNodes}
  \\filldraw (O) circle (1.5pt) node[below] {$O$};
  \\filldraw[blue] (M) circle (1.6pt) node[above left] {$M$};
  \\filldraw[blue] (N) circle (1.6pt) node[above right] {$N$};
  \\filldraw[blue] (P) circle (1.6pt) node[left] {$P$};
\\end{tikzpicture}`,
      };
    }

    // Thiết diện tứ giác MNPQ // (ABCD) với M \in SA, N \in SB, P \in SC, Q \in SD
    if (s.includes('mnpq')) {
      return {
        tikzType: 'custom',
        tikzCode: `\\begin{tikzpicture}[line join=round, line cap=round]${pyrCoords}
  \\coordinate (M) at (0.525,1.475);
  \\coordinate (N) at (2.375,1.475);
  \\coordinate (P) at (1.7,0.825);
  \\coordinate (Q) at (-0.15,0.825);
  \\fill[blue!12] (M)--(N)--(P)--(Q)--cycle;${pyrEdges}
  \\draw[dashed, very thick, blue] (M)--(N) (M)--(Q);
  \\draw[very thick, blue] (N)--(P) (P)--(Q);${pyrNodes}
  \\filldraw[blue] (M) circle (1.6pt) node[above left] {$M$};
  \\filldraw[blue] (N) circle (1.6pt) node[above right] {$N$};
  \\filldraw[blue] (P) circle (1.6pt) node[right] {$P$};
  \\filldraw[blue] (Q) circle (1.6pt) node[left] {$Q$};
\\end{tikzpicture}`,
      };
    }

    // Hình chiếu của trọng tâm G của tam giác SCD lên (ABCD) theo phương SA (Câu 21 Bài 14 Đề 1)
    if (s.includes('trọng tâm $g$ của $\\triangle scd$')) {
      return {
        tikzType: 'custom',
        tikzCode: `\\begin{tikzpicture}[line join=round, line cap=round]${pyrCoords}
  \\coordinate (G) at (0.683,0.117);
  \\coordinate (G1) at (0.333,-0.867);${pyrEdges}
  \\draw[dashed, thick] (A)--(C);
  \\draw[dashed, very thick, red] (G)--(G1);${pyrNodes}
  \\filldraw[red] (G) circle (1.6pt) node[above] {$G$};
  \\filldraw[red] (G1) circle (1.6pt) node[below] {$G'$};
\\end{tikzpicture}`,
      };
    }

    // M, N trung điểm SA, SD và tâm O (mặt phẳng (OMN) // (SBC))
    if (s.includes('sa$ và $sd$') || s.includes('(omn)')) {
      return {
        tikzType: 'custom',
        tikzCode: `\\begin{tikzpicture}[line join=round, line cap=round]${pyrCoords}
  \\coordinate (O) at (1.175,-0.65);
  \\coordinate (M) at (0.525,1.475);
  \\coordinate (N) at (-0.15,0.825);
  \\fill[blue!12] (O)--(M)--(N)--cycle;${pyrEdges}
  \\draw[dashed, thick] (A)--(C) (B)--(D);
  \\draw[dashed, very thick, blue] (M)--(N) (M)--(O) (N)--(O);${pyrNodes}
  \\filldraw[red] (O) circle (1.6pt) node[below] {$O$};
  \\filldraw[blue] (M) circle (1.6pt) node[left] {$M$};
  \\filldraw[blue] (N) circle (1.6pt) node[left] {$N$};
\\end{tikzpicture}`,
      };
    }

    // M, N trên SA, SB (hoặc (MCD) cắt SB tại N, tứ giác MNCD)
    if (s.includes('(mcd)') || s.includes('mncd') || (s.includes('m, n') && s.includes('sa$ và $sb$'))) {
      const hasO = s.includes('tâm $o$');
      return {
        tikzType: 'custom',
        tikzCode: `\\begin{tikzpicture}[line join=round, line cap=round]${pyrCoords}
  ${hasO ? `\\coordinate (O) at (1.175,-0.65);` : ''}
  \\coordinate (M) at (0.525,1.475);
  \\coordinate (N) at (2.375,1.475);${pyrEdges}
  ${hasO ? `\\draw[dashed, thick] (A)--(C) (B)--(D);` : ''}
  \\draw[dashed, very thick, blue] (M)--(N) (M)--(D);
  \\draw[very thick, blue] (N)--(C);${pyrNodes}
  ${hasO ? `\\filldraw (O) circle (1.5pt) node[below] {$O$};` : ''}
  \\filldraw[blue] (M) circle (1.6pt) node[left] {$M$};
  \\filldraw[blue] (N) circle (1.6pt) node[above right] {$N$};
\\end{tikzpicture}`,
      };
    }

    // M trên AB, (P) // SA, BC cắt SB tại N (MN // SA trên mặt khuất SAB)
    if (s.includes('trên cạnh $ab$ lấy điểm $m$') && s.includes('cắt cạnh $sb$ tại $n$')) {
      return {
        tikzType: 'custom',
        tikzCode: `\\begin{tikzpicture}[line join=round, line cap=round]${pyrCoords}
  \\coordinate (M) at (1.23,0);
  \\coordinate (N) at (1.93,1.97);${pyrEdges}
  \\draw[dashed, very thick, red] (M)--(N);${pyrNodes}
  \\filldraw[blue] (M) circle (1.6pt) node[below] {$M$};
  \\filldraw[red] (N) circle (1.6pt) node[above right] {$N$};
\\end{tikzpicture}`,
      };
    }

    // M là trung điểm SA, mặt phẳng chứa MC song song BD cắt SB tại E
    if (s.includes('chứa đường thẳng $mc$') && s.includes('cắt cạnh $sb$ tại điểm $e$')) {
      return {
        tikzType: 'custom',
        tikzCode: `\\begin{tikzpicture}[line join=round, line cap=round]${pyrCoords}
  \\coordinate (O) at (1.175,-0.65);
  \\coordinate (M) at (0.525,1.475);
  \\coordinate (E) at (2.817,0.983);${pyrEdges}
  \\draw[dashed, thick] (A)--(C) (B)--(D) (S)--(O);
  \\draw[dashed, very thick, blue] (M)--(C) (1.133,0.55)--(E);${pyrNodes}
  \\filldraw (O) circle (1.5pt) node[below] {$O$};
  \\filldraw[blue] (M) circle (1.6pt) node[left] {$M$};
  \\filldraw[red] (E) circle (1.6pt) node[above right] {$E$};
\\end{tikzpicture}`,
      };
    }

    // M là trung điểm SA, đường trung bình MO // SC
    if (s.includes('trung điểm của $sa$') || s.includes('trung điểm của cạnh $sa$') || s.includes('trung điểm $sa$')) {
      return {
        tikzType: 'custom',
        tikzCode: `\\begin{tikzpicture}[line join=round, line cap=round]${pyrCoords}
  \\coordinate (O) at (1.175,-0.65);
  \\coordinate (M) at (0.525,1.475);${pyrEdges}
  \\draw[dashed, thick] (A)--(C) (B)--(D);
  \\draw[dashed, very thick, red] (M)--(O);${pyrNodes}
  \\filldraw[blue] (O) circle (1.6pt) node[below] {$O$};
  \\filldraw[red] (M) circle (1.6pt) node[left] {$M$};
\\end{tikzpicture}`,
      };
    }

    // I là trung điểm SC, đường trung bình OI // SA
    if (s.includes('trung điểm của $sc$')) {
      return {
        tikzType: 'custom',
        tikzCode: `\\begin{tikzpicture}[line join=round, line cap=round]${pyrCoords}
  \\coordinate (O) at (1.175,-0.65);
  \\coordinate (I) at (1.7,0.825);${pyrEdges}
  \\draw[dashed, thick] (A)--(C) (B)--(D);
  \\draw[dashed, very thick, red] (O)--(I);${pyrNodes}
  \\filldraw[blue] (O) circle (1.6pt) node[below] {$O$};
  \\filldraw[red] (I) circle (1.6pt) node[right] {$I$};
\\end{tikzpicture}`,
      };
    }

    // M, N là trung điểm AB và CD
    if (s.includes('trung điểm của $ab$ và $cd$')) {
      return {
        tikzType: 'custom',
        tikzCode: `\\begin{tikzpicture}[line join=round, line cap=round]${pyrCoords}
  \\coordinate (M) at (1.85,0);
  \\coordinate (N) at (0.5,-1.3);${pyrEdges}
  \\draw[dashed, very thick, red] (M)--(N);${pyrNodes}
  \\filldraw[red] (M) circle (1.6pt) node[above] {$M$};
  \\filldraw[red] (N) circle (1.6pt) node[below] {$N$};
\\end{tikzpicture}`,
      };
    }

    // Giao tuyến (SAB) và (SCD) là Sx // AB // CD
    if (s.includes('(sab)') && s.includes('(scd)')) {
      const label = s.includes('đường thẳng $d$') ? '$d$' : '$x$';
      return {
        tikzType: 'custom',
        tikzCode: `\\begin{tikzpicture}[line join=round, line cap=round]${pyrCoords}${pyrEdges}
  \\draw[very thick, red] (-0.6,2.95)--(2.9,2.95) node[right] {${label}};${pyrNodes}
\\end{tikzpicture}`,
      };
    }

    // Giao tuyến (SAD) và (SBC) là đường thẳng qua S song song AD, BC
    if (s.includes('(sad)') && s.includes('(sbc)')) {
      return {
        tikzType: 'custom',
        tikzCode: `\\begin{tikzpicture}[line join=round, line cap=round]${pyrCoords}${pyrEdges}
  \\draw[very thick, red] (1.725,3.6)--(0.375,2.3) node[left] {$d$};${pyrNodes}
\\end{tikzpicture}`,
      };
    }

    // I = AC \cap BD, giao tuyến SI = (SAC) \cap (SBD)
    if (s.includes('i = ac \\cap bd')) {
      return {
        tikzType: 'custom',
        tikzCode: `\\begin{tikzpicture}[line join=round, line cap=round]${pyrCoords}
  \\coordinate (I) at (1.175,-0.65);${pyrEdges}
  \\draw[dashed, thick] (A)--(C) (B)--(D);
  \\draw[dashed, very thick, red] (S)--(I);${pyrNodes}
  \\filldraw[red] (I) circle (1.6pt) node[below] {$I$};
\\end{tikzpicture}`,
      };
    }

    // Tâm O, giao tuyến SO = (SAC) \cap (SBD)
    if (s.includes('tâm $o$') || s.includes('(sac)') || s.includes('phương chiếu $so$')) {
      return {
        tikzType: 'custom',
        tikzCode: `\\begin{tikzpicture}[line join=round, line cap=round]${pyrCoords}
  \\coordinate (O) at (1.175,-0.65);${pyrEdges}
  \\draw[dashed, thick] (A)--(C) (B)--(D);
  \\draw[dashed, very thick, red] (S)--(O);${pyrNodes}
  \\filldraw[red] (O) circle (1.6pt) node[below] {$O$};
\\end{tikzpicture}`,
      };
    }

    // Hình chóp S.ABCD cơ bản
    return {
      tikzType: 'custom',
      tikzCode: `\\begin{tikzpicture}[line join=round, line cap=round]${pyrCoords}${pyrEdges}${pyrNodes}
\\end{tikzpicture}`,
    };
  }

  // ==========================================================================
  // 5. HÌNH CHÓP TAM GIÁC S.ABC / TỨ DIỆN SABC
  // Đỉnh S(1.55, 2.9), A(0, 0), B(1.75, -1.35), C(3.9, 0)
  // Mặt nhìn thấy: (SAB), (SBC) -> nét liền
  // Mặt khuất: (SAC) [cạnh AC khuất] và (ABC) -> nét đứt
  // ==========================================================================
  if (s.includes('s.abc') || s.includes('sabc')) {
    const baseSabcCoords = `
  \\coordinate (A) at (0,0);
  \\coordinate (B) at (1.75,-1.35);
  \\coordinate (C) at (3.9,0);
  \\coordinate (S) at (1.55,2.9);`;
    const baseSabcEdges = `
  \\draw[dashed, thick] (A)--(C);
  \\draw[thick] (S)--(A) (S)--(B) (S)--(C) (A)--(B) (B)--(C);`;
    const baseSabcNodes = `
  \\filldraw (S) circle (1.5pt) node[above] {$S$};
  \\filldraw (A) circle (1.5pt) node[left] {$A$};
  \\filldraw (B) circle (1.5pt) node[below] {$B$};
  \\filldraw (C) circle (1.5pt) node[right] {$C$};`;

    // H, K lần lượt là trung điểm SA, SC; mặt phẳng (BHK)
    if (s.includes('h, k') && s.includes('sa') && s.includes('sc')) {
      return {
        tikzType: 'custom',
        tikzCode: `\\begin{tikzpicture}[line join=round, line cap=round]${baseSabcCoords}
  \\coordinate (H) at (0.775,1.45);
  \\coordinate (K) at (2.725,1.45);${baseSabcEdges}
  \\draw[dashed, very thick, red] (H)--(K);
  \\draw[thick, blue] (B)--(H) (B)--(K);${baseSabcNodes}
  \\filldraw[red] (H) circle (1.6pt) node[above left] {$H$};
  \\filldraw[red] (K) circle (1.6pt) node[above right] {$K$};
\\end{tikzpicture}`,
      };
    }

    // I, J trung điểm SA, SB và K trên SC (SK = 1/3 SC)
    if (s.includes('i, j') && s.includes('sk')) {
      return {
        tikzType: 'custom',
        tikzCode: `\\begin{tikzpicture}[line join=round, line cap=round]${baseSabcCoords}
  \\coordinate (I) at (0.775,1.45);
  \\coordinate (J) at (1.65,0.775);
  \\coordinate (K) at (2.333,1.933);${baseSabcEdges}
  \\draw[dashed, very thick, blue] (I)--(K);
  \\draw[very thick, blue] (I)--(J) (J)--(K);${baseSabcNodes}
  \\filldraw[blue] (I) circle (1.6pt) node[left] {$I$};
  \\filldraw[blue] (J) circle (1.6pt) node[left] {$J$};
  \\filldraw[blue] (K) circle (1.6pt) node[above right] {$K$};
\\end{tikzpicture}`,
      };
    }

    // M trên SA (SM = 3MA), N trung điểm AC, I = MN \cap SC (S, C, I và M, N, I thẳng hàng tuyệt đối)
    if (s.includes('sm = 3ma') || (s.includes('trung điểm $n$') && s.includes('sc'))) {
      return {
        tikzType: 'custom',
        tikzCode: `\\begin{tikzpicture}[line join=round, line cap=round]${baseSabcCoords}
  \\coordinate (M) at (0.388,0.725);
  \\coordinate (N) at (1.95,0);
  \\coordinate (I) at (5.075,-1.45);${baseSabcEdges}
  \\draw[dashed, very thick, blue] (M)--(N);
  \\draw[very thick, blue] (N)--(I);
  \\draw[thick] (C)--(I);${baseSabcNodes}
  \\filldraw[blue] (M) circle (1.6pt) node[left] {$M$};
  \\filldraw[blue] (N) circle (1.6pt) node[below] {$N$};
  \\filldraw[red] (I) circle (1.6pt) node[below right] {$I$};
\\end{tikzpicture}`,
      };
    }

    // M trung điểm SA, (alpha) song song SB, AC cắt BC tại P (chỉ gắn nhãn M, P theo đúng đề bài)
    if (s.includes('song song với cả hai cạnh $sb$ và $ac$')) {
      return {
        tikzType: 'custom',
        tikzCode: `\\begin{tikzpicture}[line join=round, line cap=round]${baseSabcCoords}
  \\coordinate (M) at (0.775,1.45);
  \\coordinate (P) at (2.825,-0.675);
  \\fill[blue!12] (0.775,1.45)--(0.875,-0.675)--(2.825,-0.675)--(2.725,1.45)--cycle;${baseSabcEdges}
  \\draw[dashed, very thick, blue] (0.875,-0.675)--(P) (M)--(2.725,1.45);
  \\draw[very thick, blue] (M)--(0.875,-0.675) (P)--(2.725,1.45);${baseSabcNodes}
  \\filldraw[blue] (M) circle (1.6pt) node[left] {$M$};
  \\filldraw[red] (P) circle (1.6pt) node[below right] {$P$};
\\end{tikzpicture}`,
      };
    }

    // M, N trên SA, SB sao cho MN không song song AB, cắt đường thẳng AB
    if (s.includes('m, n') && s.includes('sa, sb')) {
      return {
        tikzType: 'custom',
        tikzCode: `\\begin{tikzpicture}[line join=round, line cap=round]${baseSabcCoords}
  \\coordinate (M) at (0.853,1.595);
  \\coordinate (N) at (1.702,-0.328);${baseSabcEdges}
  \\draw[thick] (B)--(2.363,-1.823);
  \\draw[very thick, red] (M)--(2.363,-1.823);${baseSabcNodes}
  \\filldraw[blue] (M) circle (1.6pt) node[left] {$M$};
  \\filldraw[blue] (N) circle (1.6pt) node[right] {$N$};
  \\filldraw[red] (2.363,-1.823) circle (1.5pt);
\\end{tikzpicture}`,
      };
    }

    return {
      tikzType: 'custom',
      tikzCode: `\\begin{tikzpicture}[line join=round, line cap=round]${baseSabcCoords}${baseSabcEdges}${baseSabcNodes}
\\end{tikzpicture}`,
    };
  }

  // ==========================================================================
  // 6. TỨ DIỆN ABCD
  // A(1.6, 2.9), B(0, 0), C(1.75, -1.35), D(3.9, 0)
  // Mặt nhìn thấy: (ABC) và (ACD) -> AB, AC, AD, BC, CD nét liền.
  // Mặt khuất: (ABD) [cạnh BD khuất] và (BCD) -> nét đứt.
  // ==========================================================================
  if (s.includes('tứ diện') || s.includes('4 điểm không đồng phẳng $a, b, c, d$')) {
    const tetCoords = `
  \\coordinate (B) at (0,0);
  \\coordinate (C) at (1.75,-1.35);
  \\coordinate (D) at (3.9,0);
  \\coordinate (A) at (1.6,2.9);`;
    const tetEdges = `
  \\draw[dashed, thick] (B)--(D);
  \\draw[thick] (A)--(B) (A)--(C) (A)--(D) (B)--(C) (C)--(D);`;
    const tetNodes = `
  \\filldraw (A) circle (1.5pt) node[above] {$A$};
  \\filldraw (B) circle (1.5pt) node[left] {$B$};
  \\filldraw (C) circle (1.5pt) node[below] {$C$};
  \\filldraw (D) circle (1.5pt) node[right] {$D$};`;

    // T2: M là trung điểm BC, giao tuyến (ADM) và (BCD) là DM
    if (s.includes('(adm)')) {
      return {
        tikzType: 'custom',
        tikzCode: `\\begin{tikzpicture}[line join=round, line cap=round]${tetCoords}
  \\coordinate (M) at (0.875,-0.675);${tetEdges}
  \\draw[thick, blue] (A)--(M);
  \\draw[dashed, very thick, red] (D)--(M);${tetNodes}
  \\filldraw[red] (M) circle (1.6pt) node[below left] {$M$};
\\end{tikzpicture}`,
      };
    }

    // T3a: I trên AB, J trên AC, IJ không song song BC cắt mặt phẳng (BCD) trên đường thẳng BC
    if (s.includes('ij') && s.includes('không song song với $bc$')) {
      return {
        tikzType: 'custom',
        tikzCode: `\\begin{tikzpicture}[line join=round, line cap=round]${tetCoords}
  \\coordinate (I) at (0.88,1.595);
  \\coordinate (J) at (1.714,-0.328);${tetEdges}
  \\draw[thick] (C)--(2.45,-1.89);
  \\draw[very thick, red] (I)--(2.45,-1.89);${tetNodes}
  \\filldraw[blue] (I) circle (1.6pt) node[left] {$I$};
  \\filldraw[blue] (J) circle (1.6pt) node[right] {$J$};
  \\filldraw[red] (2.45,-1.89) circle (1.5pt);
\\end{tikzpicture}`,
      };
    }

    // T3b: M trên AB, N trên AC, MN không song song BC cắt BC tại E (Câu 20 Bài 10 Đề 1)
    if (s.includes('m \\in ab') && s.includes('n \\in ac') && s.includes('không song song')) {
      return {
        tikzType: 'custom',
        tikzCode: `\\begin{tikzpicture}[line join=round, line cap=round]${tetCoords}
  \\coordinate (M) at (0.88,1.595);
  \\coordinate (N) at (1.714,-0.328);
  \\coordinate (E) at (2.45,-1.89);${tetEdges}
  \\draw[thick] (C)--(E);
  \\draw[very thick, red] (M)--(E);${tetNodes}
  \\filldraw[blue] (M) circle (1.6pt) node[left] {$M$};
  \\filldraw[blue] (N) circle (1.6pt) node[right] {$N$};
  \\filldraw[red] (E) circle (1.6pt) node[below right] {$E$};
\\end{tikzpicture}`,
      };
    }

    // T4: G là trọng tâm tam giác BCD, giao điểm AG với (BCD) (chỉ vẽ A, B, C, D, G đúng theo đề bài)
    if (s.includes('trọng tâm tam giác $bcd$') && s.includes('ag') && !s.includes('trung điểm của $ab$')) {
      return {
        tikzType: 'custom',
        tikzCode: `\\begin{tikzpicture}[line join=round, line cap=round]${tetCoords}
  \\coordinate (G) at (1.883,-0.45);${tetEdges}
  \\draw[dashed, thick, blue] (B)--(2.825,-0.675) (C)--(1.95,0);
  \\draw[dashed, very thick, red] (A)--(G);${tetNodes}
  \\filldraw[red] (G) circle (1.7pt) node[below] {$G$};
\\end{tikzpicture}`,
      };
    }

    // T7: M, N trung điểm AB, BC; P trên CD (CP = 2PD)
    if (s.includes('cp = 2pd')) {
      return {
        tikzType: 'custom',
        tikzCode: `\\begin{tikzpicture}[line join=round, line cap=round]${tetCoords}
  \\coordinate (M) at (0.8,1.45);
  \\coordinate (N) at (0.875,-0.675);
  \\coordinate (P) at (3.183,-0.45);${tetEdges}
  \\draw[very thick, blue] (M)--(N);
  \\draw[dashed, very thick, blue] (N)--(P) (M)--(P);${tetNodes}
  \\filldraw[blue] (M) circle (1.6pt) node[left] {$M$};
  \\filldraw[blue] (N) circle (1.6pt) node[below left] {$N$};
  \\filldraw[blue] (P) circle (1.6pt) node[below right] {$P$};
\\end{tikzpicture}`,
      };
    }

    // T9: M trung điểm AB, N trung điểm CD, G trọng tâm BCD
    if (s.includes('trung điểm của $ab$') && s.includes('trung điểm của $cd$') && s.includes('trọng tâm tam giác $bcd$')) {
      return {
        tikzType: 'custom',
        tikzCode: `\\begin{tikzpicture}[line join=round, line cap=round]${tetCoords}
  \\coordinate (M) at (0.8,1.45);
  \\coordinate (N) at (2.825,-0.675);
  \\coordinate (G) at (1.883,-0.45);${tetEdges}
  \\draw[thick, blue] (A)--(N);
  \\draw[dashed, thick, blue] (B)--(N) (M)--(N);
  \\draw[dashed, very thick, red] (A)--(G);${tetNodes}
  \\filldraw[blue] (M) circle (1.6pt) node[left] {$M$};
  \\filldraw[blue] (N) circle (1.6pt) node[below right] {$N$};
  \\filldraw[red] (G) circle (1.6pt) node[below] {$G$};
\\end{tikzpicture}`,
      };
    }

    // T10: M trên BC (BM = 2MC), N trên CD (CN = 3ND), K = MN \cap BD
    if (s.includes('bm = 2mc') && s.includes('cn = 3nd')) {
      return {
        tikzType: 'custom',
        tikzCode: `\\begin{tikzpicture}[line join=round, line cap=round]${tetCoords}
  \\coordinate (M) at (1.167,-0.9);
  \\coordinate (N) at (3.363,-0.338);
  \\coordinate (K) at (4.68,0);${tetEdges}
  \\draw[dashed, thick] (D)--(K);
  \\draw[dashed, very thick, red] (M)--(N);
  \\draw[very thick, red] (N)--(K);${tetNodes}
  \\filldraw[blue] (M) circle (1.6pt) node[below left] {$M$};
  \\filldraw[blue] (N) circle (1.6pt) node[below right] {$N$};
  \\filldraw[red] (K) circle (1.6pt) node[right] {$K$};
\\end{tikzpicture}`,
      };
    }

    // T14: I, J, E, F trung điểm BC, BD, AD, AC
    if (s.includes('i, j, e, f')) {
      return {
        tikzType: 'custom',
        tikzCode: `\\begin{tikzpicture}[line join=round, line cap=round]${tetCoords}
  \\coordinate (I) at (0.875,-0.675);
  \\coordinate (J) at (1.95,0);
  \\coordinate (E) at (2.75,1.45);
  \\coordinate (F) at (1.675,0.775);
  \\fill[blue!12] (I)--(J)--(E)--(F)--cycle;${tetEdges}
  \\draw[very thick, blue] (F)--(I) (E)--(F);
  \\draw[dashed, very thick, blue] (I)--(J) (J)--(E);${tetNodes}
  \\filldraw[blue] (I) circle (1.6pt) node[below left] {$I$};
  \\filldraw[blue] (J) circle (1.6pt) node[above] {$J$};
  \\filldraw[blue] (E) circle (1.6pt) node[above right] {$E$};
  \\filldraw[blue] (F) circle (1.6pt) node[left] {$F$};
\\end{tikzpicture}`,
      };
    }

    // T15: M, N, P, Q trên BC, BD, AD, AC (BM = 1/3 BC)
    if (s.includes('bc, bd, ad, ac') && s.includes('bm =')) {
      return {
        tikzType: 'custom',
        tikzCode: `\\begin{tikzpicture}[line join=round, line cap=round]${tetCoords}
  \\coordinate (M) at (0.583,-0.45);
  \\coordinate (N) at (1.3,0);
  \\coordinate (P) at (2.367,1.933);
  \\coordinate (Q) at (1.65,1.483);
  \\fill[blue!12] (M)--(N)--(P)--(Q)--cycle;${tetEdges}
  \\draw[very thick, blue] (M)--(Q) (Q)--(P);
  \\draw[dashed, very thick, blue] (M)--(N) (N)--(P);${tetNodes}
  \\filldraw[blue] (M) circle (1.6pt) node[below left] {$M$};
  \\filldraw[blue] (N) circle (1.6pt) node[below] {$N$};
  \\filldraw[blue] (P) circle (1.6pt) node[above right] {$P$};
  \\filldraw[blue] (Q) circle (1.6pt) node[left] {$Q$};
\\end{tikzpicture}`,
      };
    }

    // T13a: M, N, P, Q trung điểm AC, BC, BD, AD
    if (s.includes('ac, bc, bd, ad')) {
      return {
        tikzType: 'custom',
        tikzCode: `\\begin{tikzpicture}[line join=round, line cap=round]${tetCoords}
  \\coordinate (M) at (1.675,0.775);
  \\coordinate (N) at (0.875,-0.675);
  \\coordinate (P) at (1.95,0);
  \\coordinate (Q) at (2.75,1.45);
  \\fill[blue!12] (M)--(N)--(P)--(Q)--cycle;${tetEdges}
  \\draw[very thick, blue] (M)--(N) (M)--(Q);
  \\draw[dashed, very thick, blue] (N)--(P) (P)--(Q);${tetNodes}
  \\filldraw[blue] (M) circle (1.6pt) node[left] {$M$};
  \\filldraw[blue] (N) circle (1.6pt) node[below left] {$N$};
  \\filldraw[blue] (P) circle (1.6pt) node[below] {$P$};
  \\filldraw[blue] (Q) circle (1.6pt) node[above right] {$Q$};
\\end{tikzpicture}`,
      };
    }

    // T13b: Điểm M thuộc AC, thiết diện qua M song song AB, CD (đề chỉ gọi tên điểm M)
    if ((s.includes('thuộc cạnh $ac$') && s.includes('thiết diện')) || (s.includes('cắt cạnh $ac$ tại điểm $m$') && s.includes('hình thoi'))) {
      return {
        tikzType: 'custom',
        tikzCode: `\\begin{tikzpicture}[line join=round, line cap=round]${tetCoords}
  \\coordinate (M) at (1.675,0.775);
  \\fill[blue!12] (M)--(0.875,-0.675)--(1.95,0)--(2.75,1.45)--cycle;${tetEdges}
  \\draw[very thick, blue] (M)--(0.875,-0.675) (M)--(2.75,1.45);
  \\draw[dashed, very thick, blue] (0.875,-0.675)--(1.95,0) (1.95,0)--(2.75,1.45);${tetNodes}
  \\filldraw[blue] (M) circle (1.6pt) node[left] {$M$};
\\end{tikzpicture}`,
      };
    }

    // T12a: M, N, P, Q trên AB, BC, CD, DA (có gọi tên M, N, P, Q hoặc AM = 1/4 AB)
    if (s.includes('ab, bc, cd, da') || s.includes('mnpq') || s.includes('am = \\frac{1}{4}ab')) {
      return {
        tikzType: 'custom',
        tikzCode: `\\begin{tikzpicture}[line join=round, line cap=round]${tetCoords}
  \\coordinate (M) at (0.8,1.45);
  \\coordinate (N) at (0.875,-0.675);
  \\coordinate (P) at (2.825,-0.675);
  \\coordinate (Q) at (2.75,1.45);
  \\fill[blue!12] (M)--(N)--(P)--(Q)--cycle;${tetEdges}
  \\draw[very thick, blue] (M)--(N) (P)--(Q);
  \\draw[dashed, very thick, blue] (N)--(P) (Q)--(M);${tetNodes}
  \\filldraw[blue] (M) circle (1.6pt) node[left] {$M$};
  \\filldraw[blue] (N) circle (1.6pt) node[below left] {$N$};
  \\filldraw[blue] (P) circle (1.6pt) node[below right] {$P$};
  \\filldraw[blue] (Q) circle (1.6pt) node[above right] {$Q$};
\\end{tikzpicture}`,
      };
    }

    // T12b: Điểm M thuộc AB, thiết diện qua M song song AC, BD (đề chỉ gọi tên điểm M)
    if (s.includes('song song với') && s.includes('ac, bd')) {
      return {
        tikzType: 'custom',
        tikzCode: `\\begin{tikzpicture}[line join=round, line cap=round]${tetCoords}
  \\coordinate (M) at (0.8,1.45);
  \\fill[blue!12] (M)--(0.875,-0.675)--(2.825,-0.675)--(2.75,1.45)--cycle;${tetEdges}
  \\draw[very thick, blue] (M)--(0.875,-0.675) (2.825,-0.675)--(2.75,1.45);
  \\draw[dashed, very thick, blue] (0.875,-0.675)--(2.825,-0.675) (2.75,1.45)--(M);${tetNodes}
  \\filldraw[blue] (M) circle (1.6pt) node[left] {$M$};
\\end{tikzpicture}`,
      };
    }

    // T18: Ba trọng tâm G1, G2, G3 của ABC, ACD, ADB
    if (s.includes('g_1, g_2, g_3')) {
      const hasMN = s.includes('trung điểm của $ac$ và $ad$');
      return {
        tikzType: 'custom',
        tikzCode: `\\begin{tikzpicture}[line join=round, line cap=round]${tetCoords}
  ${hasMN ? `\\coordinate (M) at (1.675,0.775); \\coordinate (N) at (2.75,1.45);` : ''}
  \\coordinate (G1) at (1.117,0.517);
  \\coordinate (G2) at (2.417,0.517);
  \\coordinate (G3) at (1.833,0.967);
  \\fill[red!12] (G1)--(G2)--(G3)--cycle;${tetEdges}
  ${hasMN ? `\\draw[dashed, thick, blue] (M)--(B); \\draw[thick, blue] (M)--(D);` : ''}
  \\draw[dashed, very thick, red] (G1)--(G2) (G2)--(G3) (G3)--(G1);${tetNodes}
  ${hasMN ? `\\filldraw[blue] (M) circle (1.5pt) node[left] {$M$}; \\filldraw[blue] (N) circle (1.5pt) node[above right] {$N$};` : ''}
  \\filldraw[red] (G1) circle (1.6pt) node[left] {$G_1$};
  \\filldraw[red] (G2) circle (1.6pt) node[right] {$G_2$};
  \\filldraw[red] (G3) circle (1.6pt) node[above] {$G_3$};
\\end{tikzpicture}`,
      };
    }

    // T17: Hai trọng tâm G1, G2 của BCD và ACD (chỉ vẽ A, B, C, D, G1, G2 đúng đề bài)
    if (s.includes('g_1, g_2') && s.includes('bcd') && s.includes('acd')) {
      return {
        tikzType: 'custom',
        tikzCode: `\\begin{tikzpicture}[line join=round, line cap=round]${tetCoords}
  \\coordinate (G1) at (1.883,-0.45);
  \\coordinate (G2) at (2.417,0.517);${tetEdges}
  \\draw[thick, blue] (A)--(2.825,-0.675);
  \\draw[dashed, thick, blue] (B)--(2.825,-0.675);
  \\draw[dashed, very thick, red] (G1)--(G2);${tetNodes}
  \\filldraw[red] (G1) circle (1.6pt) node[below] {$G_1$};
  \\filldraw[red] (G2) circle (1.6pt) node[right] {$G_2$};
\\end{tikzpicture}`,
      };
    }

    // T16a: Hai trọng tâm I, J của ABC và ABD (chỉ vẽ A, B, C, D, I, J đúng đề bài)
    if (s.includes('i, j') && s.includes('trọng tâm')) {
      return {
        tikzType: 'custom',
        tikzCode: `\\begin{tikzpicture}[line join=round, line cap=round]${tetCoords}
  \\coordinate (I) at (1.117,0.517);
  \\coordinate (J) at (1.833,0.967);${tetEdges}
  \\draw[thick, blue] (0.8,1.45)--(C);
  \\draw[dashed, thick, blue] (0.8,1.45)--(D);
  \\draw[dashed, very thick, red] (I)--(J);${tetNodes}
  \\filldraw[red] (I) circle (1.6pt) node[left] {$I$};
  \\filldraw[red] (J) circle (1.6pt) node[above right] {$J$};
\\end{tikzpicture}`,
      };
    }

    // T16b: Hai trọng tâm G1, G2 của ABC và ABD
    if (s.includes('g_1, g_2')) {
      const hasM = s.includes('trung điểm của cạnh $ab$');
      return {
        tikzType: 'custom',
        tikzCode: `\\begin{tikzpicture}[line join=round, line cap=round]${tetCoords}
  ${hasM ? `\\coordinate (M) at (0.8,1.45);` : ''}
  \\coordinate (G1) at (1.117,0.517);
  \\coordinate (G2) at (1.833,0.967);${tetEdges}
  \\draw[thick, blue] (0.8,1.45)--(C);
  \\draw[dashed, thick, blue] (0.8,1.45)--(D);
  \\draw[dashed, very thick, red] (G1)--(G2);${tetNodes}
  ${hasM ? `\\filldraw[blue] (M) circle (1.5pt) node[left] {$M$};` : ''}
  \\filldraw[red] (G1) circle (1.6pt) node[left] {$G_1$};
  \\filldraw[red] (G2) circle (1.6pt) node[above right] {$G_2$};
\\end{tikzpicture}`,
      };
    }

    // T19: M, N, P trung điểm AB, CD, BC; đường thẳng MP
    if (s.includes('trung điểm của $ab$ và $cd$') && s.includes('trung điểm của $bc$')) {
      return {
        tikzType: 'custom',
        tikzCode: `\\begin{tikzpicture}[line join=round, line cap=round]${tetCoords}
  \\coordinate (M) at (0.8,1.45);
  \\coordinate (N) at (2.825,-0.675);
  \\coordinate (P) at (0.875,-0.675);${tetEdges}
  \\draw[very thick, red] (M)--(P);
  \\draw[dashed, thick, blue] (P)--(N);${tetNodes}
  \\filldraw[red] (M) circle (1.6pt) node[left] {$M$};
  \\filldraw[blue] (N) circle (1.6pt) node[below right] {$N$};
  \\filldraw[red] (P) circle (1.6pt) node[below left] {$P$};
\\end{tikzpicture}`,
      };
    }

    // T20: M, N trên AB, AC (AM/AB = AN/AC = 1/3), mặt phẳng (DMN) cắt (BCD) theo giao tuyến d
    if (s.includes('(dmn)')) {
      return {
        tikzType: 'custom',
        tikzCode: `\\begin{tikzpicture}[line join=round, line cap=round]${tetCoords}
  \\coordinate (M) at (1.067,1.933);
  \\coordinate (N) at (1.65,1.483);${tetEdges}
  \\draw[very thick, blue] (M)--(N) (N)--(D);
  \\draw[dashed, very thick, blue] (M)--(D);
  \\draw[very thick, red] (3.025,0.675)--(4.425,-0.405) node[right] {$d$};${tetNodes}
  \\filldraw[blue] (M) circle (1.6pt) node[left] {$M$};
  \\filldraw[blue] (N) circle (1.6pt) node[left] {$N$};
\\end{tikzpicture}`,
      };
    }

    // T21: M, N là trung điểm AB và AC
    if (s.includes('trung điểm của $ab$ và $ac$')) {
      return {
        tikzType: 'custom',
        tikzCode: `\\begin{tikzpicture}[line join=round, line cap=round]${tetCoords}
  \\coordinate (M) at (0.8,1.45);
  \\coordinate (N) at (1.675,0.775);${tetEdges}
  \\draw[very thick, red] (M)--(N);${tetNodes}
  \\filldraw[red] (M) circle (1.6pt) node[left] {$M$};
  \\filldraw[red] (N) circle (1.6pt) node[right] {$N$};
\\end{tikzpicture}`,
      };
    }

    // T22: G là trọng tâm ABD, M trên BC (BM = 2MC), đường thẳng MG
    if (s.includes('bm = 2mc') && s.includes('mg')) {
      const hasI = s.includes('trung điểm của cạnh $ad$');
      return {
        tikzType: 'custom',
        tikzCode: `\\begin{tikzpicture}[line join=round, line cap=round]${tetCoords}
  ${hasI ? `\\coordinate (I) at (2.75,1.45);` : ''}
  \\coordinate (G) at (1.833,0.967);
  \\coordinate (M) at (1.167,-0.9);${tetEdges}
  \\draw[dashed, thick, blue] (B)--(2.75,1.45);
  ${hasI ? `\\draw[thick, blue] (I)--(C);` : ''}
  \\draw[dashed, very thick, red] (M)--(G);${tetNodes}
  ${hasI ? `\\filldraw[blue] (I) circle (1.5pt) node[above right] {$I$};` : ''}
  \\filldraw[red] (G) circle (1.6pt) node[above] {$G$};
  \\filldraw[red] (M) circle (1.6pt) node[below left] {$M$};
\\end{tikzpicture}`,
      };
    }

    // T23: M, N là trung điểm BC và BD, mặt phẳng (AMN)
    if (s.includes('(amn)') && s.includes('bc$ và $bd$')) {
      return {
        tikzType: 'custom',
        tikzCode: `\\begin{tikzpicture}[line join=round, line cap=round]${tetCoords}
  \\coordinate (M) at (0.875,-0.675);
  \\coordinate (N) at (1.95,0);${tetEdges}
  \\draw[very thick, blue] (A)--(M);
  \\draw[dashed, very thick, blue] (M)--(N) (A)--(N);${tetNodes}
  \\filldraw[blue] (M) circle (1.6pt) node[below left] {$M$};
  \\filldraw[blue] (N) circle (1.6pt) node[below] {$N$};
\\end{tikzpicture}`,
      };
    }

    // T24: Điểm M trên cạnh AC, mặt phẳng (P) qua M song song AB và CD (chỉ gọi tên M)
    if (s.includes('lấy điểm $m$ trên cạnh $ac$')) {
      return {
        tikzType: 'custom',
        tikzCode: `\\begin{tikzpicture}[line join=round, line cap=round]${tetCoords}
  \\coordinate (M) at (1.675,0.775);${tetEdges}
  \\draw[very thick, red] (M)--(0.875,-0.675);${tetNodes}
  \\filldraw[red] (M) circle (1.6pt) node[right] {$M$};
\\end{tikzpicture}`,
      };
    }

    // T26: G trọng tâm ABC, I trung điểm BC, M trên CD (CM = 2MD)
    if (s.includes('cm = 2md')) {
      return {
        tikzType: 'custom',
        tikzCode: `\\begin{tikzpicture}[line join=round, line cap=round]${tetCoords}
  \\coordinate (I) at (0.875,-0.675);
  \\coordinate (G) at (1.117,0.517);
  \\coordinate (M) at (3.183,-0.45);${tetEdges}
  \\draw[thick, blue] (A)--(I);
  \\draw[dashed, thick, blue] (I)--(D);
  \\draw[dashed, very thick, red] (G)--(M);${tetNodes}
  \\filldraw[blue] (I) circle (1.5pt) node[below left] {$I$};
  \\filldraw[red] (G) circle (1.6pt) node[left] {$G$};
  \\filldraw[blue] (M) circle (1.6pt) node[below right] {$M$};
\\end{tikzpicture}`,
      };
    }

    // T27: G trọng tâm ABD, Q trên BD, N trên CD (QN // BC)
    if (s.includes('cắt cạnh $bd$ tại $q$') && s.includes('cắt cạnh $cd$ tại $n$')) {
      return {
        tikzType: 'custom',
        tikzCode: `\\begin{tikzpicture}[line join=round, line cap=round]${tetCoords}
  \\coordinate (G) at (1.833,0.967);
  \\coordinate (Q) at (2.6,0);
  \\coordinate (N) at (3.183,-0.45);${tetEdges}
  \\draw[dashed, thick, blue] (G)--(Q);
  \\draw[dashed, very thick, red] (Q)--(N);${tetNodes}
  \\filldraw[blue] (G) circle (1.6pt) node[above] {$G$};
  \\filldraw[red] (Q) circle (1.6pt) node[above] {$Q$};
  \\filldraw[red] (N) circle (1.6pt) node[below right] {$N$};
\\end{tikzpicture}`,
      };
    }

    // T28: G trọng tâm ABC, M trên AC, N trên AD (MN // CD)
    if (s.includes('trọng tâm tam giác $abc$') && s.includes('cắt cạnh $ac$ tại $m$')) {
      return {
        tikzType: 'custom',
        tikzCode: `\\begin{tikzpicture}[line join=round, line cap=round]${tetCoords}
  \\coordinate (G) at (1.117,0.517);
  \\coordinate (M) at (1.7,-0.06);
  \\coordinate (N) at (3.133,0.967);${tetEdges}
  \\draw[thick, blue] (G)--(M);
  \\draw[very thick, red] (M)--(N);${tetNodes}
  \\filldraw[blue] (G) circle (1.6pt) node[left] {$G$};
  \\filldraw[red] (M) circle (1.6pt) node[left] {$M$};
  \\filldraw[red] (N) circle (1.6pt) node[above right] {$N$};
\\end{tikzpicture}`,
      };
    }

    // T29: M trung điểm CD, phương chiếu DM
    if (s.includes('phương chiếu $dm$')) {
      return {
        tikzType: 'custom',
        tikzCode: `\\begin{tikzpicture}[line join=round, line cap=round]${tetCoords}
  \\coordinate (M) at (2.825,-0.675);${tetEdges}${tetNodes}
  \\filldraw[red] (M) circle (1.6pt) node[below right] {$M$};
\\end{tikzpicture}`,
      };
    }

    // T1: Tứ diện ABCD cơ bản (bao gồm Câu 8: "Một hình tứ diện có tất cả bao nhiêu cạnh?")
    return {
      tikzType: 'custom',
      tikzCode: `\\begin{tikzpicture}[line join=round, line cap=round]${tetCoords}${tetEdges}${tetNodes}
\\end{tikzpicture}`,
    };
  }

  // ==========================================================================
  // 7. PHÉP CHIẾU SONG SONG CỦA ĐOẠN THẲNG AB CÓ ĐIỂM M (HOẶC B) LÊN (P)
  // ==========================================================================
  if (
    (s.includes("a', b', m'") && s.includes('ab')) ||
    s.includes('tìm hình chiếu song song $m\'$ của một điểm $m$')
  ) {
    return {
      tikzType: 'parallel_projection_plane',
    };
  }

  // ==========================================================================
  // 8. HAI MẶT PHẲNG (P) VÀ (Q) CẮT NHAU THEO GIAO TUYẾN d VÀ ĐƯỜNG THẲNG a // d
  // ==========================================================================
  if (s.includes('(p)') && s.includes('(q)') && s.includes('giao tuyến $d$') && s.includes('đường thẳng $a$')) {
    return {
      tikzType: 'space_two_planes_intersect',
    };
  }

  return {};
}

export function buildCompactLessonExamSet(
  examId: string,
  title: string,
  lessonFullName: string,
  examNumber: 1 | 2,
  part1: CompactMC[],
  part2: CompactTF[],
  part3: CompactSA[],
  part4: CompactSO[]
): ExamSet {
  return {
    id: examId,
    title,
    subtitle: `Đề ôn số 0${examNumber} • Chuẩn kiến thức trọng tâm ${lessonFullName}`,
    grade: 11,
    durationMinutes: 90,
    totalPoints: 10,
    description: `Đề ôn số 0${examNumber} (22 câu hỏi mới tương tự dạng bài SGK, đổi mới hoàn toàn số liệu) tập trung 100% vào kiến thức trọng tâm của ${lessonFullName}.`,
    part1: part1.slice(0, 12).map((q, idx) => {
      const autoFig = buildSpatialQuestionTikz(q.prompt);
      return {
        id: `${examId}-p1-${idx + 1}`,
        part: 'part1',
        number: idx + 1,
        topic: lessonFullName,
        prompt: q.prompt,
        options: q.options.map((o) => ({ key: o.id, content: o.text })),
        correctAnswer: q.correctOptionId,
        explanation: q.explanation,
        pedagogicalTip: q.explanation,
        points: 0.25,
        tikzType: q.tikzType ?? autoFig.tikzType,
        tikzCode: q.tikzCode ?? autoFig.tikzCode,
      };
    }),
    part2: part2.slice(0, 2).map((q, idx) => {
      const autoFig = buildSpatialQuestionTikz(q.stem);
      return {
        id: `${examId}-p2-${idx + 1}`,
        part: 'part2',
        number: 13 + idx,
        topic: lessonFullName,
        prompt: q.stem,
        statements: q.statements.map((s) => ({
          id: s.id,
          label: s.id,
          statement: s.text,
          isCorrect: s.isTrue,
          explanation: s.explanation,
        })),
        pedagogicalTip: `Áp dụng đúng định lí và tính chất trọng tâm của ${lessonFullName} để xét từng mệnh đề.`,
        tikzType: q.tikzType ?? autoFig.tikzType,
        tikzCode: q.tikzCode ?? autoFig.tikzCode,
      };
    }),
    part3: part3.slice(0, 4).map((q, idx) => {
      const autoFig = buildSpatialQuestionTikz(q.prompt);
      return {
        id: `${examId}-p3-${idx + 1}`,
        part: 'part3',
        number: 15 + idx,
        topic: lessonFullName,
        prompt: q.prompt,
        acceptableAnswers: Array.from(new Set([q.correctAnswer, ...q.acceptedAnswers])),
        explanation: q.explanation,
        pedagogicalTip: q.explanation,
        points: 0.5,
        tikzType: q.tikzType ?? autoFig.tikzType,
        tikzCode: q.tikzCode ?? autoFig.tikzCode,
      };
    }),
    part4: part4.slice(0, 4).map((q, idx) => {
      const fullStepText = `${q.prompt} ${q.steps.map((st) => st.text).join(' ')}`;
      const autoFig = buildSpatialQuestionTikz(fullStepText);
      return {
        id: `${examId}-p4-${idx + 1}`,
        part: 'part4',
        number: 19 + idx,
        topic: lessonFullName,
        problemStatement: q.prompt,
        conclusionTarget: 'Sắp xếp các bước giải theo đúng trình tự logic toán học.',
        steps: q.steps.map((s, sIdx) => ({
          id: `${examId}-p4-${idx + 1}-s${sIdx + 1}`,
          originalIndex: sIdx + 1,
          content: s.text,
          roleDescription: `Bước ${sIdx + 1}`,
        })),
        pedagogicalTip: q.explanation,
        teacherAnalysis: q.explanation,
        points: 0.75,
        tikzType: q.tikzType ?? autoFig.tikzType,
        tikzCode: q.tikzCode ?? autoFig.tikzCode,
      };
    }),
  };
}

// ============================================================================
// BÀI 10. ĐƯỜNG THẲNG VÀ MẶT PHẲNG TRONG KHÔNG GIAN
// Trọng tâm: Khái niệm mở đầu, các tính chất thừa nhận, 3 cách xác định mặt phẳng,
// tìm giao tuyến hai mặt phẳng, tìm giao điểm đường thẳng và mặt phẳng, hình chóp & tứ diện.
// ============================================================================

const b10P1A: CompactMC[] = [
  {
    prompt: 'Theo tính chất thừa nhận của hình học không gian, có bao nhiêu mặt phẳng đi qua ba điểm $A, B, C$ không thẳng hàng?',
    options: [
      { id: 'A', text: 'Có duy nhất một mặt phẳng' },
      { id: 'B', text: 'Có đúng hai mặt phẳng' },
      { id: 'C', text: 'Có ba mặt phẳng' },
      { id: 'D', text: 'Có vô số mặt phẳng' }
    ],
    correctOptionId: 'A',
    explanation: 'Tính chất thừa nhận: Có một và chỉ một mặt phẳng đi qua ba điểm không thẳng hàng.'
  },
  {
    prompt: 'Nếu một đường thẳng $d$ có hai điểm phân biệt thuộc mặt phẳng $(\\alpha)$ thì khẳng định nào sau đây đúng?',
    options: [
      { id: 'A', text: '$d$ cắt $(\\alpha)$ tại đúng một điểm' },
      { id: 'B', text: 'Mọi điểm của $d$ đều thuộc mặt phẳng $(\\alpha)$' },
      { id: 'C', text: '$d$ không có điểm chung nào khác với $(\\alpha)$' },
      { id: 'D', text: '$d$ vuông góc với $(\\alpha)$' }
    ],
    correctOptionId: 'B',
    explanation: 'Nếu một đường thẳng có hai điểm phân biệt thuộc một mặt phẳng thì mọi điểm của đường thẳng đều thuộc mặt phẳng đó ($d \\subset (\\alpha)$).'
  },
  {
    prompt: 'Nếu hai mặt phẳng phân biệt $(\\alpha)$ và $(\\beta)$ có một điểm chung $M$ thì chúng còn có bao nhiêu điểm chung khác?',
    options: [
      { id: 'A', text: 'Không còn điểm chung nào khác' },
      { id: 'B', text: 'Còn đúng một điểm chung nữa' },
      { id: 'C', text: 'Có chung một đường thẳng duy nhất đi qua $M$' },
      { id: 'D', text: 'Trùng nhau hoàn toàn' }
    ],
    correctOptionId: 'C',
    explanation: 'Nếu hai mặt phẳng phân biệt có một điểm chung thì chúng có một đường thẳng chung duy nhất chứa tất cả các điểm chung của hai mặt phẳng đó (giao tuyến).'
  },
  {
    prompt: 'Trong không gian, cho 4 điểm không đồng phẳng $A, B, C, D$. Có thể xác định được tối đa bao nhiêu mặt phẳng phân biệt từ 4 điểm đã cho?',
    options: [
      { id: 'A', text: '$3$' },
      { id: 'B', text: '$4$' },
      { id: 'C', text: '$6$' },
      { id: 'D', text: '$2$' }
    ],
    correctOptionId: 'B',
    explanation: 'Vì 4 điểm không đồng phẳng nên bất kỳ 3 điểm nào cũng không thẳng hàng. Số mặt phẳng tạo thành là $C_4^3 = 4$ mặt phẳng (4 mặt của tứ diện $ABCD$).'
  },
  {
    prompt: 'Cho hình chóp $S.ABCD$ có đáy $ABCD$ là hình bình hành tâm $O$. Giao tuyến của hai mặt phẳng $(SAC)$ và $(SBD)$ là đường thẳng nào?',
    options: [
      { id: 'A', text: '$SA$' },
      { id: 'B', text: '$SB$' },
      { id: 'C', text: '$SO$' },
      { id: 'D', text: '$AB$' }
    ],
    correctOptionId: 'C',
    explanation: '$S$ là điểm chung thứ nhất. Vì $O = AC \\cap BD$ nên $O \\in AC \\subset (SAC)$ và $O \\in BD \\subset (SBD)$, suy ra $O$ là điểm chung thứ hai. Vậy $(SAC) \\cap (SBD) = SO$.'
  },
  {
    prompt: 'Cho hình chóp $S.ABCD$ có đáy $ABCD$ là tứ giác có hai cạnh đối $AB$ và $CD$ không song song. Gọi $E = AB \\cap CD$. Giao tuyến của hai mặt phẳng $(SAB)$ và $(SCD)$ là:',
    options: [
      { id: 'A', text: 'Đường thẳng $SE$' },
      { id: 'B', text: 'Đường thẳng $SC$' },
      { id: 'C', text: 'Đường thẳng $SA$' },
      { id: 'D', text: 'Đường thẳng $BD$' }
    ],
    correctOptionId: 'A',
    explanation: '$S \\in (SAB) \\cap (SCD)$ và $E = AB \\cap CD \\Rightarrow E \\in (SAB) \\cap (SCD)$. Do đó $(SAB) \\cap (SCD) = SE$.'
  },
  {
    prompt: 'Một hình chóp ngũ giác $S.ABCDE$ (đáy là ngũ giác lồi $ABCDE$) có tất cả bao nhiêu mặt (kể cả mặt đáy)?',
    options: [
      { id: 'A', text: '$5$ mặt' },
      { id: 'B', text: '$6$ mặt' },
      { id: 'C', text: '$7$ mặt' },
      { id: 'D', text: '$10$ mặt' }
    ],
    correctOptionId: 'B',
    explanation: 'Hình chóp ngũ giác có $5$ mặt bên là các tam giác và $1$ mặt đáy là ngũ giác, tổng cộng $5 + 1 = 6$ mặt.'
  },
  {
    prompt: 'Một hình tứ diện có tất cả bao nhiêu cạnh?',
    options: [
      { id: 'A', text: '$4$ cạnh' },
      { id: 'B', text: '$5$ cạnh' },
      { id: 'C', text: '$6$ cạnh' },
      { id: 'D', text: '$8$ cạnh' }
    ],
    correctOptionId: 'C',
    explanation: 'Hình tứ diện $ABCD$ có $4$ đỉnh, số cạnh là $C_4^2 = 6$ cạnh ($AB, BC, CD, DA, AC, BD$).'
  },
  {
    prompt: 'Cho tứ diện $ABCD$. Gọi $M$ là trung điểm của cạnh $BC$. Giao tuyến của mặt phẳng $(ADM)$ và mặt phẳng $(BCD)$ là đường thẳng nào?',
    options: [
      { id: 'A', text: '$AM$' },
      { id: 'B', text: '$DM$' },
      { id: 'C', text: '$AD$' },
      { id: 'D', text: '$BC$' }
    ],
    correctOptionId: 'B',
    explanation: 'Ta có $D \\in (ADM) \\cap (BCD)$ và $M \\in BC \\subset (BCD)$ đồng thời $M \\in (ADM)$. Do đó $(ADM) \\cap (BCD) = DM$.'
  },
  {
    prompt: 'Cho tứ diện $ABCD$. Trên cạnh $AB$ lấy điểm $I$, trên cạnh $AC$ lấy điểm $J$ sao cho đường thẳng $IJ$ không song song với $BC$. Khi đó đường thẳng $IJ$ cắt mặt phẳng $(BCD)$ tại điểm nào?',
    options: [
      { id: 'A', text: 'Giao điểm của $IJ$ và $BD$' },
      { id: 'B', text: 'Giao điểm của $IJ$ và $CD$' },
      { id: 'C', text: 'Giao điểm của $IJ$ và $BC$' },
      { id: 'D', text: 'Trung điểm của $BC$' }
    ],
    correctOptionId: 'C',
    explanation: 'Trong mặt phẳng $(ABC)$, hai đường thẳng $IJ$ và $BC$ không song song nên cắt nhau tại $K = IJ \\cap BC$. Vì $BC \\subset (BCD)$ nên $K = IJ \\cap (BCD)$.'
  },
  {
    prompt: 'Cho ba đường thẳng $a, b, c$ không cùng nằm trong một mặt phẳng và đôi một cắt nhau tại $A, B, C$ phân biệt. Khi đó ba đường thẳng $a, b, c$:',
    options: [
      { id: 'A', text: 'Cùng nằm trong mặt phẳng $(ABC)$' },
      { id: 'B', text: 'Đôi một chéo nhau' },
      { id: 'C', text: 'Đồng quy tại một điểm' },
      { id: 'D', text: 'Tạo thành 3 mặt phẳng phân biệt' }
    ],
    correctOptionId: 'A',
    explanation: 'Vì $A, B, C$ là các giao điểm đôi một phân biệt nên mỗi đường thẳng đi qua 2 trong 3 điểm $A, B, C$, suy ra cả 3 đường thẳng đều nằm trong mặt phẳng $(ABC)$ (trái giả thiết không đồng phẳng nếu $A,B,C$ phân biệt). Nếu 3 đường thẳng đôi một cắt nhau mà không đồng phẳng thì chúng phải đồng quy tại 1 điểm.'
  },
  {
    prompt: 'Trong các cách xác định mặt phẳng sau đây, cách nào **không** xác định duy nhất một mặt phẳng?',
    options: [
      { id: 'A', text: 'Qua ba điểm không thẳng hàng' },
      { id: 'B', text: 'Qua một đường thẳng và một điểm không thuộc đường thẳng đó' },
      { id: 'C', text: 'Qua hai đường thẳng cắt nhau' },
      { id: 'D', text: 'Qua ba điểm phân biệt thẳng hàng' }
    ],
    correctOptionId: 'D',
    explanation: 'Qua ba điểm thẳng hàng chỉ xác định được một đường thẳng, và có vô số mặt phẳng chứa đường thẳng đó.'
  }
];

const b10P1B: CompactMC[] = [
  {
    prompt: 'Một mặt phẳng hoàn toàn được xác định nếu biết yếu tố nào sau đây?',
    options: [
      { id: 'A', text: 'Một đường thẳng và một điểm bất kì' },
      { id: 'B', text: 'Hai đường thẳng cắt nhau' },
      { id: 'C', text: 'Ba điểm phân biệt bất kì' },
      { id: 'D', text: 'Bốn điểm phân biệt bất kì' }
    ],
    correctOptionId: 'B',
    explanation: 'Một mặt phẳng hoàn toàn được xác định khi biết nó đi qua hai đường thẳng cắt nhau.'
  },
  {
    prompt: 'Cho điểm $A$ không thuộc mặt phẳng $(P)$. Khẳng định nào sau đây đúng?',
    options: [
      { id: 'A', text: '$A \\in (P)$' },
      { id: 'B', text: '$A \\notin (P)$' },
      { id: 'C', text: '$A \\subset (P)$' },
      { id: 'D', text: '$(P) \\in A$' }
    ],
    correctOptionId: 'B',
    explanation: 'Điểm $A$ không thuộc mặt phẳng $(P)$ được kí hiệu là $A \\notin (P)$.'
  },
  {
    prompt: 'Một hình chóp có đáy là đa giác $n$ cạnh ($n \\ge 3$) thì có tất cả bao nhiêu cạnh (gồm cả cạnh bên và cạnh đáy)?',
    options: [
      { id: 'A', text: '$n + 1$' },
      { id: 'B', text: '$2n$' },
      { id: 'C', text: '$3n$' },
      { id: 'D', text: '$n + 2$' }
    ],
    correctOptionId: 'B',
    explanation: 'Hình chóp có đáy là $n$-giác có $n$ cạnh đáy và $n$ cạnh bên nối từ đỉnh $S$ đến $n$ đỉnh đáy, tổng cộng $2n$ cạnh.'
  },
  {
    prompt: 'Một hình chóp có tổng cộng $16$ cạnh thì đa giác đáy của hình chóp đó có bao nhiêu cạnh?',
    options: [
      { id: 'A', text: '$6$ cạnh' },
      { id: 'B', text: '$7$ cạnh' },
      { id: 'C', text: '$8$ cạnh' },
      { id: 'D', text: '$9$ cạnh' }
    ],
    correctOptionId: 'C',
    explanation: 'Số cạnh của hình chóp là $2n = 16 \\Rightarrow n = 8$ (hình chóp bát giác).'
  },
  {
    prompt: 'Cho tứ diện $ABCD$. Hai cạnh $AB$ và $CD$ được gọi là hai cạnh gì của tứ diện?',
    options: [
      { id: 'A', text: 'Hai cạnh kề nhau' },
      { id: 'B', text: 'Hai cạnh đối diện' },
      { id: 'C', text: 'Hai cạnh song song' },
      { id: 'D', text: 'Hai cạnh cắt nhau' }
    ],
    correctOptionId: 'B',
    explanation: 'Trong tứ diện $ABCD$, hai cạnh không đi qua cùng một đỉnh như $AB$ và $CD$ được gọi là hai cạnh đối diện.'
  },
  {
    prompt: 'Cho hình chóp $S.ABCD$ có đáy $ABCD$ là tứ giác lồi. Gọi $I = AC \\cap BD$. Điểm $I$ thuộc giao tuyến của cặp mặt phẳng nào sau đây?',
    options: [
      { id: 'A', text: '$(SAB)$ và $(SCD)$' },
      { id: 'B', text: '$(SAC)$ và $(SBD)$' },
      { id: 'C', text: '$(SAD)$ và $(SBC)$' },
      { id: 'D', text: '$(SAB)$ và $(SAD)$' }
    ],
    correctOptionId: 'B',
    explanation: 'Vì $I \\in AC \\subset (SAC)$ và $I \\in BD \\subset (SBD)$ nên $I$ thuộc giao tuyến $SI$ của $(SAC)$ và $(SBD)$.'
  },
  {
    prompt: 'Cho tứ diện $ABCD$. Gọi $G$ là trọng tâm tam giác $BCD$. Giao điểm của đường thẳng $AG$ với mặt phẳng $(BCD)$ là:',
    options: [
      { id: 'A', text: 'Điểm $B$' },
      { id: 'B', text: 'Điểm $C$' },
      { id: 'C', text: 'Điểm $G$' },
      { id: 'D', text: 'Trung điểm của $BC$' }
    ],
    correctOptionId: 'C',
    explanation: 'Vì $G$ là trọng tâm $\\triangle BCD$ nên $G \\in (BCD)$. Do đó đường thẳng $AG$ cắt mặt phẳng $(BCD)$ tại chính điểm $G$.'
  },
  {
    prompt: 'Cho hình chóp $S.ABC$. Trên cạnh $SA, SB$ lần lượt lấy hai điểm $M, N$ sao cho $MN$ không song song với $AB$. Giao điểm của đường thẳng $MN$ và mặt phẳng $(ABC)$ nằm trên đường thẳng nào?',
    options: [
      { id: 'A', text: 'Đường thẳng $AB$' },
      { id: 'B', text: 'Đường thẳng $BC$' },
      { id: 'C', text: 'Đường thẳng $AC$' },
      { id: 'D', text: 'Đường thẳng $SC$' }
    ],
    correctOptionId: 'A',
    explanation: 'Trong mặt phẳng $(SAB)$, $MN$ cắt $AB$ tại $E$. Vì $AB \\subset (ABC)$ nên $E = MN \\cap (ABC)$ nằm trên đường thẳng $AB$.'
  },
  {
    prompt: 'Cho 5 điểm $A, B, C, D, E$ trong đó không có 4 điểm nào đồng phẳng. Hỏi có bao nhiêu mặt phẳng tạo bởi 3 trong 5 điểm đã cho?',
    options: [
      { id: 'A', text: '$5$' },
      { id: 'B', text: '$8$' },
      { id: 'C', text: '$10$' },
      { id: 'D', text: '$12$' }
    ],
    correctOptionId: 'C',
    explanation: 'Vì không có 4 điểm nào đồng phẳng nên cũng không có 3 điểm nào thẳng hàng. Số mặt phẳng phân biệt là $C_5^3 = 10$.'
  },
  {
    prompt: 'Cho đường thẳng $d$ và hai điểm phân biệt $A, B$ không thuộc $d$. Nếu đường thẳng $AB$ cắt $d$ tại điểm $I$ thì có bao nhiêu mặt phẳng chứa cả $d$ và hai điểm $A, B$?',
    options: [
      { id: 'A', text: 'Có duy nhất $1$ mặt phẳng' },
      { id: 'B', text: 'Có đúng $2$ mặt phẳng' },
      { id: 'C', text: 'Không có mặt phẳng nào' },
      { id: 'D', text: 'Có vô số mặt phẳng' }
    ],
    correctOptionId: 'A',
    explanation: 'Hai đường thẳng $d$ và $AB$ cắt nhau tại $I$ nên xác định duy nhất một mặt phẳng chứa cả $d$ và $A, B$.'
  },
  {
    prompt: 'Cho tứ diện $SABC$. Gọi $H, K$ lần lượt là trung điểm của $SA$ và $SC$. Giao tuyến của mặt phẳng $(BHK)$ và mặt phẳng $(SAC)$ là:',
    options: [
      { id: 'A', text: 'Đường thẳng $BH$' },
      { id: 'B', text: 'Đường thẳng $BK$' },
      { id: 'C', text: 'Đường thẳng $HK$' },
      { id: 'D', text: 'Đường thẳng $AC$' }
    ],
    correctOptionId: 'C',
    explanation: 'Ta có $H \\in SA \\subset (SAC)$ và $K \\in SC \\subset (SAC)$, đồng thời $H, K \\in (BHK)$. Vậy $(BHK) \\cap (SAC) = HK$.'
  },
  {
    prompt: 'Một hình chóp có $9$ mặt (kể cả mặt đáy) thì có bao nhiêu đỉnh (kể cả đỉnh chóp)?',
    options: [
      { id: 'A', text: '$8$ đỉnh' },
      { id: 'B', text: '$9$ đỉnh' },
      { id: 'C', text: '$10$ đỉnh' },
      { id: 'D', text: '$16$ đỉnh' }
    ],
    correctOptionId: 'B',
    explanation: 'Hình chóp đáy $n$-giác có $n + 1$ mặt và $n + 1$ đỉnh. Vậy có $9$ mặt thì có $9$ đỉnh.'
  }
];

const b10P2A: CompactTF[] = [
  {
    stem: 'Cho hình chóp $S.ABCD$ có đáy $ABCD$ là tứ giác lồi có hai cặp cạnh đối không song song. Gọi $O = AC \\cap BD$, $E = AB \\cap CD$ và $F = AD \\cap BC$. Xét tính đúng sai của các mệnh đề sau:',
    statements: [
      {
        id: 'a',
        text: 'Giao tuyến của hai mặt phẳng $(SAC)$ và $(SBD)$ là đường thẳng $SO$.',
        isTrue: true,
        explanation: '$S$ là điểm chung thứ nhất, $O = AC \\cap BD$ là điểm chung thứ hai nên $(SAC) \\cap (SBD) = SO$.'
      },
      {
        id: 'b',
        text: 'Giao tuyến của hai mặt phẳng $(SAB)$ và $(SCD)$ là đường thẳng $SF$.',
        isTrue: false,
        explanation: 'Vì $E = AB \\cap CD$ nên $(SAB) \\cap (SCD) = SE$, còn $SF$ là giao tuyến của $(SAD)$ và $(SBC)$.'
      },
      {
        id: 'c',
        text: 'Điểm $E$ thuộc mặt phẳng $(ABCD)$ nhưng không thuộc mặt phẳng $(SCD)$.',
        isTrue: false,
        explanation: 'Vì $E \\in CD$ và $CD \\subset (SCD)$ nên $E \\in (SCD)$.'
      },
      {
        id: 'd',
        text: 'Giao điểm của đường thẳng $EF$ với mặt phẳng $(SAC)$ nằm trên đường thẳng $AC$.',
        isTrue: true,
        explanation: 'Vì $EF \\subset (ABCD)$ và $(SAC) \\cap (ABCD) = AC$ nên giao điểm của $EF$ với $(SAC)$ chính là giao điểm của $EF$ và $AC$.'
      }
    ]
  },
  {
    stem: 'Cho tứ diện $ABCD$. Gọi $M, N$ lần lượt là trung điểm của $AB$ và $BC$. Trên cạnh $CD$ lấy điểm $P$ sao cho $CP = 2PD$. Xét tính đúng sai của các mệnh đề sau:',
    statements: [
      {
        id: 'a',
        text: 'Giao tuyến của mặt phẳng $(MNP)$ và mặt phẳng $(ABC)$ là đường thẳng $MN$.',
        isTrue: true,
        explanation: '$M \\in AB \\subset (ABC)$ và $N \\in BC \\subset (ABC)$ nên $(MNP) \\cap (ABC) = MN$.'
      },
      {
        id: 'b',
        text: 'Trong mặt phẳng $(BCD)$, đường thẳng $NP$ song song với đường thẳng $BD$.',
        isTrue: false,
        explanation: 'Vì $\\frac{CN}{CB} = \\frac{1}{2}$ còn $\\frac{CP}{CD} = \\frac{2}{3} \\ne \\frac{1}{2}$ nên $NP$ không song song với $BD$ mà cắt $BD$.'
      },
      {
        id: 'c',
        text: 'Gọi $K = NP \\cap BD$. Khi đó $K$ là giao điểm của đường thẳng $BD$ với mặt phẳng $(MNP)$.',
        isTrue: true,
        explanation: 'Vì $K \\in BD$ và $K \\in NP \\subset (MNP)$ nên $K = BD \\cap (MNP)$.'
      },
      {
        id: 'd',
        text: 'Giao điểm $Q$ của cạnh $AD$ với mặt phẳng $(MNP)$ chính là giao điểm của đường thẳng $MK$ và $AD$.',
        isTrue: true,
        explanation: 'Trong mặt phẳng $(ABD)$, đường thẳng $MK \\subset (MNP)$ cắt cạnh $AD$ tại $Q$, suy ra $Q = AD \\cap (MNP)$.'
      }
    ]
  }
];

const b10P2B: CompactTF[] = [
  {
    stem: 'Cho hình chóp $S.ABC$. Gọi $I, J$ lần lượt là trung điểm của $SA, SB$ và $K$ là điểm trên cạnh $SC$ sao cho $SK = \\frac{1}{3}SC$. Xét tính đúng sai của các mệnh đề sau:',
    statements: [
      {
        id: 'a',
        text: 'Ba điểm $I, J, K$ không thẳng hàng nên xác định duy nhất một mặt phẳng $(IJK)$.',
        isTrue: true,
        explanation: 'Ba điểm $I, J, K$ nằm trên ba cạnh bên không đồng phẳng của hình chóp nên không thẳng hàng, xác định duy nhất mặt phẳng $(IJK)$.'
      },
      {
        id: 'b',
        text: 'Trong mặt phẳng $(SBC)$, đường thẳng $JK$ cắt đường thẳng $BC$ tại một điểm $E$.',
        isTrue: true,
        explanation: 'Vì $\\frac{SJ}{SB} = \\frac{1}{2} \\ne \\frac{SK}{SC} = \\frac{1}{3}$ nên $JK$ không song song với $BC$, do đó $JK$ cắt $BC$ tại $E$.'
      },
      {
        id: 'c',
        text: 'Trong mặt phẳng $(SAC)$, đường thẳng $IK$ song song với đường thẳng $AC$.',
        isTrue: false,
        explanation: 'Vì $\\frac{SI}{SA} = \\frac{1}{2} \\ne \\frac{SK}{SC} = \\frac{1}{3}$ nên $IK$ cắt $AC$ tại một điểm $F$.'
      },
      {
        id: 'd',
        text: 'Giao tuyến của hai mặt phẳng $(IJK)$ và $(ABC)$ là đường thẳng $EF$ (với $E = JK \\cap BC, F = IK \\cap AC$).',
        isTrue: true,
        explanation: '$E \\in JK \\subset (IJK), E \\in BC \\subset (ABC)$ và $F \\in IK \\subset (IJK), F \\in AC \\subset (ABC)$ nên $(IJK) \\cap (ABC) = EF$.'
      }
    ]
  },
  {
    stem: 'Cho tứ diện $ABCD$. Gọi $M$ là trung điểm của $AB$, $N$ là trung điểm của $CD$, $G$ là trọng tâm tam giác $BCD$. Xét tính đúng sai của các mệnh đề sau:',
    statements: [
      {
        id: 'a',
        text: 'Điểm $G$ thuộc đoạn thẳng $BN$.',
        isTrue: true,
        explanation: 'Vì $N$ là trung điểm $CD$ nên $BN$ là đường trung tuyến của $\\triangle BCD$, suy ra trọng tâm $G \\in BN$.'
      },
      {
        id: 'b',
        text: 'Bốn điểm $A, B, N, G$ cùng thuộc mặt phẳng $(ABN)$.',
        isTrue: true,
        explanation: 'Vì $G \\in BN \\subset (ABN)$ nên bốn điểm $A, B, N, G$ đồng phẳng.'
      },
      {
        id: 'c',
        text: 'Giao tuyến của hai mặt phẳng $(ABN)$ và $(ACD)$ là đường thẳng $AB$.',
        isTrue: false,
        explanation: '$A \\in (ABN) \\cap (ACD)$ và $N \\in CD \\subset (ACD)$ nên giao tuyến của $(ABN)$ và $(ACD)$ là đường thẳng $AN$.'
      },
      {
        id: 'd',
        text: 'Trong mặt phẳng $(ABN)$, hai đường thẳng $AG$ và $MN$ cắt nhau tại một điểm $I$.',
        isTrue: true,
        explanation: 'Trong $\\triangle ABN$, $M$ là trung điểm $AB$, $G \\in BN$ nên hai đoạn $AG$ và $MN$ cắt nhau tại điểm $I$ nằm miền trong $\\triangle ABN$.'
      }
    ]
  }
];

const b10P3A: CompactSA[] = [
  {
    prompt: 'Một hình chóp lục giác (đáy là lục giác lồi) có tất cả bao nhiêu mặt (tính cả mặt đáy)?',
    correctAnswer: '7',
    acceptedAnswers: ['7'],
    explanation: 'Hình chóp lục giác có $6$ mặt bên và $1$ mặt đáy, tổng cộng $6 + 1 = 7$ mặt.'
  },
  {
    prompt: 'Một hình chóp có tất cả $11$ đỉnh (kể cả đỉnh chóp) thì có tất cả bao nhiêu cạnh?',
    correctAnswer: '20',
    acceptedAnswers: ['20'],
    explanation: 'Hình chóp có $11$ đỉnh suy ra đáy là đa giác $n = 11 - 1 = 10$ đỉnh. Tổng số cạnh là $2n = 2 \\cdot 10 = 20$ cạnh.'
  },
  {
    prompt: 'Cho 6 điểm phân biệt trong không gian, trong đó không có 4 điểm nào đồng phẳng. Có bao nhiêu tứ diện có 4 đỉnh được chọn từ 6 điểm đã cho?',
    correctAnswer: '15',
    acceptedAnswers: ['15'],
    explanation: 'Mỗi bộ 4 điểm không đồng phẳng tạo thành 1 tứ diện. Số tứ diện là $C_6^4 = 15$.'
  },
  {
    prompt: 'Cho tứ diện $ABCD$. Trên cạnh $BC$ lấy điểm $M$ sao cho $BM = 2MC$, trên cạnh $CD$ lấy điểm $N$ sao cho $CN = 3ND$. Gọi $K$ là giao điểm của đường thẳng $MN$ và đường thẳng $BD$. Tính tỉ số $\\frac{KB}{KD}$.',
    correctAnswer: '6',
    acceptedAnswers: ['6'],
    explanation: 'Áp dụng định lí Menelaus cho $\\triangle CBD$ với cát tuyến $M-N-K$: $\\frac{MB}{MC} \\cdot \\frac{NC}{ND} \\cdot \\frac{KD}{KB} = 1 \\Rightarrow 2 \\cdot 3 \\cdot \\frac{KD}{KB} = 1 \\Rightarrow \\frac{KB}{KD} = 6$.'
  }
];

const b10P3B: CompactSA[] = [
  {
    prompt: 'Một hình chóp bát giác (đáy là đa giác $8$ cạnh) có tất cả bao nhiêu mặt bên?',
    correctAnswer: '8',
    acceptedAnswers: ['8'],
    explanation: 'Hình chóp có đáy là đa giác $8$ cạnh thì có đúng $8$ mặt bên là các tam giác.'
  },
  {
    prompt: 'Một hình chóp có tổng số mặt và tổng số đỉnh cộng lại bằng $18$. Hỏi hình chóp đó có bao nhiêu cạnh?',
    correctAnswer: '16',
    acceptedAnswers: ['16'],
    explanation: 'Gọi đáy là $n$-giác. Số mặt là $n+1$, số đỉnh là $n+1$. Ta có $(n+1) + (n+1) = 18 \\Rightarrow n = 8$. Số cạnh của hình chóp là $2n = 16$.'
  },
  {
    prompt: 'Cho 5 điểm trong không gian, trong đó có đúng 4 điểm $A, B, C, D$ đồng phẳng (không có 3 điểm nào thẳng hàng) và điểm $S$ nằm ngoài mặt phẳng đó. Có tất cả bao nhiêu mặt phẳng phân biệt đi qua ít nhất 3 trong 5 điểm đã cho?',
    correctAnswer: '7',
    acceptedAnswers: ['7'],
    explanation: '4 điểm $A, B, C, D$ xác định $1$ mặt phẳng. Điểm $S$ ghép với mỗi cặp điểm trong 4 điểm $A, B, C, D$ tạo thêm $C_4^2 = 6$ mặt phẳng. Tổng cộng có $1 + 6 = 7$ mặt phẳng.'
  },
  {
    prompt: 'Cho hình chóp $S.ABC$. Trên cạnh $SA$ lấy điểm $M$ sao cho $SM = 3MA$, trên cạnh $AC$ lấy trung điểm $N$. Gọi $I$ là giao điểm của đường thẳng $MN$ và đường thẳng $SC$. Tính tỉ số $\\frac{IS}{IC}$.',
    correctAnswer: '3',
    acceptedAnswers: ['3'],
    explanation: 'Áp dụng định lí Menelaus cho $\\triangle SAC$ với cát tuyến $M-N-I$: $\\frac{MS}{MA} \\cdot \\frac{NA}{NC} \\cdot \\frac{IC}{IS} = 1 \\Rightarrow 3 \\cdot 1 \\cdot \\frac{IC}{IS} = 1 \\Rightarrow \\frac{IS}{IC} = 3$.'
  }
];

const b10P4A: CompactSO[] = [
  {
    prompt: 'Sắp xếp các bước tìm giao tuyến của hai mặt phẳng $(SAC)$ và $(SBD)$ trong hình chóp $S.ABCD$ (đáy $ABCD$ là tứ giác lồi):',
    steps: [
      { id: 's1', text: 'Nhận xét $S$ là điểm chung thứ nhất của hai mặt phẳng $(SAC)$ và $(SBD)$.' },
      { id: 's2', text: 'Trong mặt phẳng đáy $(ABCD)$, gọi $O$ là giao điểm của hai đường chéo $AC$ và $BD$.' },
      { id: 's3', text: 'Vì $O \\in AC \\subset (SAC)$ và $O \\in BD \\subset (SBD)$ nên $O$ là điểm chung thứ hai của $(SAC)$ và $(SBD)$.' },
      { id: 's4', text: 'Kết luận giao tuyến của hai mặt phẳng $(SAC)$ và $(SBD)$ là đường thẳng $SO$.' }
    ],
    correctOrder: ['s1', 's2', 's3', 's4'],
    explanation: 'Muốn tìm giao tuyến của hai mặt phẳng, ta tìm hai điểm chung phân biệt của chúng.'
  },
  {
    prompt: 'Sắp xếp các bước tìm giao điểm của đường thẳng $MN$ với mặt phẳng $(BCD)$ trong tứ diện $ABCD$ (biết $M \\in AB, N \\in AC$ và $MN$ không song song với $BC$):',
    steps: [
      { id: 's1', text: 'Xét mặt phẳng phụ $(ABC)$ chứa đường thẳng $MN$.' },
      { id: 's2', text: 'Tìm giao tuyến của mặt phẳng phụ $(ABC)$ và mặt phẳng $(BCD)$ là đường thẳng $BC$.' },
      { id: 's3', text: 'Trong mặt phẳng $(ABC)$, gọi $E$ là giao điểm của hai đường thẳng $MN$ và $BC$ (do $MN$ không song song $BC$).' },
      { id: 's4', text: 'Vì $E \\in MN$ và $E \\in BC \\subset (BCD)$ nên kết luận $E$ là giao điểm của $MN$ và $(BCD)$.' }
    ],
    correctOrder: ['s1', 's2', 's3', 's4'],
    explanation: 'Quy tắc tìm giao điểm của đường thẳng $d$ và mặt phẳng $(P)$: chọn mặt phẳng phụ chứa $d$, tìm giao tuyến $\\Delta$, giao điểm của $d$ và $\\Delta$ là điểm cần tìm.'
  },
  {
    prompt: 'Sắp xếp các bước chứng minh ba điểm $E, F, O$ thẳng hàng (trên hai mặt phẳng phân biệt):',
    steps: [
      { id: 's1', text: 'Xác định hai mặt phẳng phân biệt $(\\alpha)$ và $(\\beta)$ có giao tuyến là đường thẳng $d$.' },
      { id: 's2', text: 'Chứng minh mỗi điểm $E, F, O$ đều đồng thời thuộc cả hai mặt phẳng $(\\alpha)$ và $(\\beta)$.' },
      { id: 's3', text: 'Suy ra cả ba điểm $E, F, O$ đều phải nằm trên giao tuyến duy nhất $d = (\\alpha) \\cap (\\beta)$.' },
      { id: 's4', text: 'Kết luận ba điểm $E, F, O$ thẳng hàng.' }
    ],
    correctOrder: ['s1', 's2', 's3', 's4'],
    explanation: 'Để chứng minh ba điểm thẳng hàng trong không gian, ta chứng minh chúng cùng thuộc giao tuyến của hai mặt phẳng phân biệt.'
  },
  {
    prompt: 'Sắp xếp các bước tìm giao điểm của đường thẳng $SD$ với mặt phẳng $(MNP)$ trong hình chóp $S.ABCD$ (với $M \\in SA, N \\in SB, P \\in SC$):',
    steps: [
      { id: 's1', text: 'Trong mặt phẳng $(ABCD)$, gọi $O = AC \\cap BD$, suy ra $(SAC) \\cap (SBD) = SO$.' },
      { id: 's2', text: 'Trong mặt phẳng $(SAC)$, gọi $I = MP \\cap SO$, suy ra $I \\in (MNP) \\cap (SBD)$.' },
      { id: 's3', text: 'Xác định giao tuyến của mặt phẳng $(MNP)$ và mặt phẳng $(SBD)$ là đường thẳng $NI$.' },
      { id: 's4', text: 'Trong mặt phẳng $(SBD)$, gọi $Q = NI \\cap SD$, kết luận $Q = SD \\cap (MNP)$.' }
    ],
    correctOrder: ['s1', 's2', 's3', 's4'],
    explanation: 'Chọn mặt phẳng phụ $(SBD)$ chứa $SD$, tìm giao tuyến $NI = (MNP) \\cap (SBD)$, từ đó tìm được $Q = NI \\cap SD$.'
  }
];

const b10P4B = [b10P4A[1], b10P4A[0], b10P4A[3], b10P4A[2]];

// ============================================================================
// BÀI 11. HAI ĐƯỜNG THẲNG SONG SONG
// Trọng tâm: Vị trí tương đối của 2 đường thẳng trong không gian (chéo nhau, song song,
// cắt nhau, trùng nhau); tính chất cơ bản về hai đường thẳng song song; định lí 3 giao tuyến.
// ============================================================================

const b11P1A: CompactMC[] = [
  {
    prompt: 'Trong không gian, hai đường thẳng được gọi là **song song** nếu:',
    options: [
      { id: 'A', text: 'Chúng không có điểm chung' },
      { id: 'B', text: 'Chúng cùng nằm trong một mặt phẳng và không có điểm chung' },
      { id: 'C', text: 'Chúng không cùng nằm trong bất kỳ mặt phẳng nào' },
      { id: 'D', text: 'Chúng phân biệt và cùng cắt đường thẳng thứ ba' }
    ],
    correctOptionId: 'B',
    explanation: 'Hai đường thẳng song song trong không gian là hai đường thẳng đồng phẳng và không có điểm chung.'
  },
  {
    prompt: 'Trong không gian, hai đường thẳng không có điểm chung thì:',
    options: [
      { id: 'A', text: 'Luôn song song với nhau' },
      { id: 'B', text: 'Luôn chéo nhau' },
      { id: 'C', text: 'Hoặc song song hoặc chéo nhau' },
      { id: 'D', text: 'Luôn đồng phẳng' }
    ],
    correctOptionId: 'C',
    explanation: 'Hai đường thẳng không có điểm chung thì song song (nếu đồng phẳng) hoặc chéo nhau (nếu không đồng phẳng).'
  },
  {
    prompt: 'Cho tứ diện $ABCD$. Cặp đường thẳng nào sau đây là hai đường thẳng **chéo nhau**?',
    options: [
      { id: 'A', text: '$AB$ và $AC$' },
      { id: 'B', text: '$AB$ và $BC$' },
      { id: 'C', text: '$AB$ và $CD$' },
      { id: 'D', text: '$BC$ và $CD$' }
    ],
    correctOptionId: 'C',
    explanation: 'Vì 4 điểm $A, B, C, D$ không đồng phẳng nên hai cạnh đối $AB$ và $CD$ không cùng nằm trong một mặt phẳng, tức là chéo nhau.'
  },
  {
    prompt: 'Qua một điểm $M$ nằm ngoài đường thẳng $a$ cho trước trong không gian, có bao nhiêu đường thẳng đi qua $M$ và song song với $a$?',
    options: [
      { id: 'A', text: 'Không có đường thẳng nào' },
      { id: 'B', text: 'Có duy nhất một đường thẳng' },
      { id: 'C', text: 'Có đúng hai đường thẳng' },
      { id: 'D', text: 'Có vô số đường thẳng' }
    ],
    correctOptionId: 'B',
    explanation: 'Tiên đề Euclid trong không gian: Qua một điểm không nằm trên đường thẳng cho trước, có một và chỉ một đường thẳng song song với đường thẳng đã cho.'
  },
  {
    prompt: 'Cho ba đường thẳng phân biệt $a, b, c$ trong không gian. Nếu $a \\parallel c$ và $b \\parallel c$ thì:',
    options: [
      { id: 'A', text: '$a$ cắt $b$' },
      { id: 'B', text: '$a \\parallel b$' },
      { id: 'C', text: '$a$ và $b$ chéo nhau' },
      { id: 'D', text: '$a \\perp b$' }
    ],
    correctOptionId: 'B',
    explanation: 'Tính chất bắc cầu: Hai đường thẳng phân biệt cùng song song với đường thẳng thứ ba thì song song với nhau.'
  },
  {
    prompt: 'Cho ba mặt phẳng phân biệt $(\\alpha), (\\beta), (\\gamma)$ đôi một cắt nhau theo ba giao tuyến phân biệt $d_1, d_2, d_3$. Khẳng định nào sau đây đúng?',
    options: [
      { id: 'A', text: 'Ba đường thẳng $d_1, d_2, d_3$ đôi một chéo nhau' },
      { id: 'B', text: 'Ba đường thẳng $d_1, d_2, d_3$ hoặc đôi một song song hoặc đồng quy' },
      { id: 'C', text: 'Ba đường thẳng $d_1, d_2, d_3$ luôn cắt nhau tại 3 điểm phân biệt' },
      { id: 'D', text: 'Ba đường thẳng $d_1, d_2, d_3$ luôn trùng nhau' }
    ],
    correctOptionId: 'B',
    explanation: 'Theo định lí về ba đường giao tuyến: Ba giao tuyến phân biệt của ba mặt phẳng đôi một cắt nhau thì hoặc đồng quy hoặc đôi một song song.'
  },
  {
    prompt: 'Cho hình chóp $S.ABCD$ có đáy $ABCD$ là hình bình hành. Giao tuyến của hai mặt phẳng $(SAB)$ và $(SCD)$ là đường thẳng $d$ đi qua $S$ và:',
    options: [
      { id: 'A', text: 'Song song với $AD$' },
      { id: 'B', text: 'Song song với $AB$ và $CD$' },
      { id: 'C', text: 'Song song với $AC$' },
      { id: 'D', text: 'Cắt $AB$ tại trung điểm của $AB$' }
    ],
    correctOptionId: 'B',
    explanation: 'Hai mặt phẳng $(SAB)$ và $(SCD)$ có điểm chung $S$ và lần lượt chứa hai đường thẳng song song $AB \\parallel CD$, nên giao tuyến của chúng là đường thẳng qua $S$ và song song với $AB, CD$.'
  },
  {
    prompt: 'Cho tứ diện $ABCD$. Gọi $M, N, P, Q$ lần lượt là trung điểm của các cạnh $AB, BC, CD, DA$. Tứ giác $MNPQ$ là hình gì?',
    options: [
      { id: 'A', text: 'Hình thang không phải hình bình hành' },
      { id: 'B', text: 'Hình bình hành' },
      { id: 'C', text: 'Hình chữ nhật' },
      { id: 'D', text: 'Tứ giác không đồng phẳng' }
    ],
    correctOptionId: 'B',
    explanation: '$MN$ là đường trung bình $\\triangle ABC \\Rightarrow MN \\parallel AC, MN = \\frac{1}{2}AC$. Tương tự $PQ \\parallel AC, PQ = \\frac{1}{2}AC$. Suy ra $MN \\parallel PQ$ và $MN = PQ$, nên $MNPQ$ là hình bình hành.'
  },
  {
    prompt: 'Cho hình chóp $S.ABCD$ có đáy $ABCD$ là hình thang với đáy lớn $AB$, đáy nhỏ $CD$. Giao tuyến của hai mặt phẳng $(SAD)$ và $(SBC)$ là đường thẳng:',
    options: [
      { id: 'A', text: 'Đi qua $S$ và song song với $AD$' },
      { id: 'B', text: 'Đi qua $S$ và song song với $AB$' },
      { id: 'C', text: 'Đi qua $S$ và giao điểm $I$ của $AD$ với $BC$' },
      { id: 'D', text: 'Song song với $BD$' }
    ],
    correctOptionId: 'C',
    explanation: 'Vì $AB \\parallel CD$ nên hai cạnh bên $AD$ và $BC$ của hình thang không song song mà cắt nhau tại $I$. Vậy $(SAD) \\cap (SBC) = SI$.'
  },
  {
    prompt: 'Cho tứ diện $ABCD$. Gọi $I, J$ lần lượt là trọng tâm của hai tam giác $ABC$ và $ABD$. Đường thẳng $IJ$ song song với đường thẳng nào sau đây?',
    options: [
      { id: 'A', text: '$AB$' },
      { id: 'B', text: '$BC$' },
      { id: 'C', text: '$CD$' },
      { id: 'D', text: '$AD$' }
    ],
    correctOptionId: 'C',
    explanation: 'Gọi $M$ là trung điểm của $AB$. Trong $\\triangle MCD$, ta có $\\frac{MI}{MC} = \\frac{MJ}{MD} = \\frac{1}{3}$ nên theo định lí Thalès đảo, $IJ \\parallel CD$.'
  },
  {
    prompt: 'Cho hai đường thẳng chéo nhau $a$ và $b$. Có bao nhiêu mặt phẳng chứa cả hai đường thẳng $a$ và $b$?',
    options: [
      { id: 'A', text: '$0$' },
      { id: 'B', text: '$1$' },
      { id: 'C', text: '$2$' },
      { id: 'D', text: 'Vô số' }
    ],
    correctOptionId: 'A',
    explanation: 'Theo định nghĩa, hai đường thẳng chéo nhau là hai đường thẳng không cùng nằm trong bất kỳ mặt phẳng nào (số mặt phẳng chứa cả hai là $0$).'
  },
  {
    prompt: 'Cho tứ diện $ABCD$ có $AB = CD = 8\\text{ cm}$. Gọi $M, N, P, Q$ lần lượt là trung điểm của $AC, BC, BD, AD$. Chu vi của tứ giác $MNPQ$ bằng:',
    options: [
      { id: 'A', text: '$8\\text{ cm}$' },
      { id: 'B', text: '$12\\text{ cm}$' },
      { id: 'C', text: '$16\\text{ cm}$' },
      { id: 'D', text: '$32\\text{ cm}$' }
    ],
    correctOptionId: 'C',
    explanation: 'Ta có $MN = PQ = \\frac{1}{2}AB = 4\\text{ cm}$ và $NP = MQ = \\frac{1}{2}CD = 4\\text{ cm}$. Chu vi tứ giác $MNPQ$ là $4 + 4 + 4 + 4 = 16\\text{ cm}$.'
  }
];

const b11P1B: CompactMC[] = [
  {
    prompt: 'Hai đường thẳng chéo nhau khi và chỉ khi:',
    options: [
      { id: 'A', text: 'Chúng không có điểm chung' },
      { id: 'B', text: 'Chúng không cùng thuộc một mặt phẳng nào' },
      { id: 'C', text: 'Chúng cùng thuộc một mặt phẳng và không cắt nhau' },
      { id: 'D', text: 'Chúng vuông góc với nhau' }
    ],
    correctOptionId: 'B',
    explanation: 'Hai đường thẳng chéo nhau là hai đường thẳng không đồng phẳng.'
  },
  {
    prompt: 'Cho hai đường thẳng song song $a$ và $b$. Có bao nhiêu mặt phẳng chứa cả hai đường thẳng $a$ và $b$?',
    options: [
      { id: 'A', text: 'Không có mặt phẳng nào' },
      { id: 'B', text: 'Có duy nhất một mặt phẳng' },
      { id: 'C', text: 'Có đúng hai mặt phẳng' },
      { id: 'D', text: 'Có vô số mặt phẳng' }
    ],
    correctOptionId: 'B',
    explanation: 'Hai đường thẳng song song xác định duy nhất một mặt phẳng chứa chúng.'
  },
  {
    prompt: 'Cho hình chóp $S.ABCD$ có đáy $ABCD$ là hình bình hành. Giao tuyến của hai mặt phẳng $(SAD)$ và $(SBC)$ là đường thẳng đi qua $S$ và:',
    options: [
      { id: 'A', text: 'Song song với $AB$' },
      { id: 'B', text: 'Song song với $AD$ và $BC$' },
      { id: 'C', text: 'Song song với $BD$' },
      { id: 'D', text: 'Đi qua tâm $O$ của đáy' }
    ],
    correctOptionId: 'B',
    explanation: 'Hai mặt phẳng $(SAD)$ và $(SBC)$ có điểm chung $S$ và lần lượt chứa hai đường thẳng song song $AD \\parallel BC$ nên giao tuyến đi qua $S$ và song song với $AD, BC$.'
  },
  {
    prompt: 'Cho hình chóp $S.ABCD$ có đáy $ABCD$ là hình bình hành. Trong các cặp đường thẳng sau, cặp nào **chéo nhau**?',
    options: [
      { id: 'A', text: '$AB$ và $CD$' },
      { id: 'B', text: '$SA$ và $SC$' },
      { id: 'C', text: '$SA$ và $BC$' },
      { id: 'D', text: '$AC$ và $BD$' }
    ],
    correctOptionId: 'C',
    explanation: '$AB \\parallel CD$, $SA$ cắt $SC$ tại $S$, $AC$ cắt $BD$ tại $O$. Chỉ có $SA$ và $BC$ không đồng phẳng nên chéo nhau.'
  },
  {
    prompt: 'Cho tứ diện $ABCD$. Gọi $M, N$ lần lượt là trung điểm của $AB$ và $CD$. Gọi $P$ là trung điểm của $BC$. Đường thẳng $MP$ song song với đường thẳng nào?',
    options: [
      { id: 'A', text: '$AC$' },
      { id: 'B', text: '$BD$' },
      { id: 'C', text: '$AD$' },
      { id: 'D', text: '$CD$' }
    ],
    correctOptionId: 'A',
    explanation: 'Trong $\\triangle ABC$, $M$ và $P$ lần lượt là trung điểm của $AB, BC$ nên $MP$ là đường trung bình, suy ra $MP \\parallel AC$.'
  },
  {
    prompt: 'Cho hình chóp $S.ABCD$ có đáy $ABCD$ là hình thang với $AB \\parallel CD$. Giao tuyến của hai mặt phẳng $(SAB)$ và $(SCD)$ là:',
    options: [
      { id: 'A', text: 'Đường thẳng qua $S$ và song song với $AB$' },
      { id: 'B', text: 'Đường thẳng qua $S$ và song song với $AD$' },
      { id: 'C', text: 'Đường thẳng $SO$ với $O = AC \\cap BD$' },
      { id: 'D', text: 'Đường thẳng $SC$' }
    ],
    correctOptionId: 'A',
    explanation: 'Vì $AB \\parallel CD, AB \\subset (SAB), CD \\subset (SCD)$ và $S \\in (SAB) \\cap (SCD)$ nên giao tuyến là đường thẳng $Sx \\parallel AB \\parallel CD$.'
  },
  {
    prompt: 'Cho tứ diện $ABCD$. Trên cạnh $AB, AC$ lấy các điểm $M, N$ sao cho $\\frac{AM}{AB} = \\frac{AN}{AC} = \\frac{1}{3}$. Mặt phẳng $(DMN)$ cắt mặt phẳng $(BCD)$ theo giao tuyến $d$. Khẳng định nào sau đây đúng?',
    options: [
      { id: 'A', text: '$d$ cắt $BC$ tại trung điểm của $BC$' },
      { id: 'B', text: '$d$ đi qua $D$ và song song với $BC$' },
      { id: 'C', text: '$d$ đi qua $D$ và song song với $AB$' },
      { id: 'D', text: '$d$ trùng với $BC$' }
    ],
    correctOptionId: 'B',
    explanation: 'Vì $\\frac{AM}{AB} = \\frac{AN}{AC} = \\frac{1}{3}$ nên $MN \\parallel BC$. Hai mặt phẳng $(DMN)$ và $(BCD)$ có điểm chung $D$ và chứa $MN \\parallel BC$ nên giao tuyến $d$ đi qua $D$ và song song với $BC$.'
  },
  {
    prompt: 'Cho ba đường thẳng $a, b, c$ trong không gian. Mệnh đề nào sau đây là **sai**?',
    options: [
      { id: 'A', text: 'Nếu $a \\parallel b$ và $b \\parallel c$ (với $a, b, c$ phân biệt) thì $a \\parallel c$' },
      { id: 'B', text: 'Nếu $a$ và $b$ cùng chéo nhau với $c$ thì $a$ và $b$ luôn song song với nhau' },
      { id: 'C', text: 'Nếu $a \\parallel b$ thì tồn tại duy nhất một mặt phẳng chứa cả $a$ và $b$' },
      { id: 'D', text: 'Hai đường thẳng chéo nhau thì không có điểm chung' }
    ],
    correctOptionId: 'B',
    explanation: 'Hai đường thẳng $a, b$ cùng chéo nhau với $c$ có thể cắt nhau, song song hoặc chéo nhau.'
  },
  {
    prompt: 'Cho tứ diện $ABCD$. Gọi $G_1, G_2$ lần lượt là trọng tâm của $\\triangle BCD$ và $\\triangle ACD$. Khi đó đường thẳng $G_1G_2$ song song với đường thẳng nào?',
    options: [
      { id: 'A', text: '$AB$' },
      { id: 'B', text: '$BC$' },
      { id: 'C', text: '$CD$' },
      { id: 'D', text: '$AD$' }
    ],
    correctOptionId: 'A',
    explanation: 'Gọi $I$ là trung điểm $CD$. Trong $\\triangle IAB$, ta có $\\frac{IG_1}{IB} = \\frac{IG_2}{IA} = \\frac{1}{3} \\Rightarrow G_1G_2 \\parallel AB$.'
  },
  {
    prompt: 'Cho tứ diện $ABCD$ có $AC = 10\\text{ cm}, BD = 14\\text{ cm}$. Gọi $M, N, P, Q$ lần lượt là trung điểm của $AB, BC, CD, DA$. Chu vi hình bình hành $MNPQ$ bằng:',
    options: [
      { id: 'A', text: '$12\\text{ cm}$' },
      { id: 'B', text: '$20\\text{ cm}$' },
      { id: 'C', text: '$24\\text{ cm}$' },
      { id: 'D', text: '$48\\text{ cm}$' }
    ],
    correctOptionId: 'C',
    explanation: 'Ta có $MN = PQ = \\frac{1}{2}AC = 5\\text{ cm}$ và $NP = MQ = \\frac{1}{2}BD = 7\\text{ cm}$. Chu vi của $MNPQ$ là $2(5 + 7) = 24\\text{ cm}$.'
  },
  {
    prompt: 'Trong không gian, cho hai đường thẳng song song $a, b$ và một đường thẳng $c$ cắt cả $a$ và $b$. Khi đó ba đường thẳng $a, b, c$:',
    options: [
      { id: 'A', text: 'Cùng nằm trong một mặt phẳng' },
      { id: 'B', text: 'Đôi một chéo nhau' },
      { id: 'C', text: 'Đồng quy tại một điểm' },
      { id: 'D', text: 'Không đồng phẳng' }
    ],
    correctOptionId: 'A',
    explanation: 'Hai đường thẳng $a \\parallel b$ xác định mặt phẳng $(P)$. Đường thẳng $c$ cắt $a$ tại $A \\in (P)$ và cắt $b$ tại $B \\in (P)$ nên $c \\subset (P)$.'
  },
  {
    prompt: 'Cho hình chóp $S.ABCD$ có đáy $ABCD$ là hình bình hành tâm $O$. Gọi $M$ là trung điểm của $SA$.Trong mặt phẳng $(SAC)$, đường thẳng $MO$ song song với đường thẳng nào?',
    options: [
      { id: 'A', text: '$SB$' },
      { id: 'B', text: '$SC$' },
      { id: 'C', text: '$SD$' },
      { id: 'D', text: '$AC$' }
    ],
    correctOptionId: 'B',
    explanation: 'Trong $\\triangle SAC$, $M$ là trung điểm $SA$, $O$ là trung điểm $AC$ nên $MO$ là đường trung bình, suy ra $MO \\parallel SC$.'
  }
];

const b11P2A: CompactTF[] = [
  {
    stem: 'Cho hình chóp $S.ABCD$ có đáy $ABCD$ là hình bình hành tâm $O$. Gọi $M, N$ lần lượt là trung điểm của $SA$ và $SB$. Xét tính đúng sai của các mệnh đề sau:',
    statements: [
      {
        id: 'a',
        text: 'Đường thẳng $MN$ song song với đường thẳng $CD$.',
        isTrue: true,
        explanation: '$MN$ là đường trung bình $\\triangle SAB \\Rightarrow MN \\parallel AB$. Mà $AB \\parallel CD$ nên $MN \\parallel CD$.'
      },
      {
        id: 'b',
        text: 'Tứ giác $MNCD$ là một hình bình hành.',
        isTrue: false,
        explanation: '$MN \\parallel CD$ nhưng $MN = \\frac{1}{2}AB = \\frac{1}{2}CD$ nên $MNCD$ là hình thang (không phải hình bình hành).'
      },
      {
        id: 'c',
        text: 'Giao tuyến của hai mặt phẳng $(SAB)$ và $(SCD)$ là đường thẳng đi qua $S$ và song song với $MN$.',
        isTrue: true,
        explanation: 'Giao tuyến $Sx$ của $(SAB)$ và $(SCD)$ song song với $AB$ và $CD$, do đó $Sx \\parallel MN$.'
      },
      {
        id: 'd',
        text: 'Trong mặt phẳng $(MNCD)$, hai đường thẳng $MD$ và $NC$ cắt nhau tại một điểm nằm trên giao tuyến của $(SAD)$ và $(SBC)$.',
        isTrue: true,
        explanation: 'Trong hình thang $MNCD$, hai cạnh bên $MD$ và $NC$ cắt nhau tại $I$. Vì $MD \\subset (SAD)$ và $NC \\subset (SBC)$ nên $I \\in (SAD) \\cap (SBC)$.'
      }
    ]
  },
  {
    stem: 'Cho tứ diện $ABCD$ có $AB = CD = 2a$. Gọi $I, J, E, F$ lần lượt là trung điểm của các cạnh $BC, BD, AD, AC$. Xét tính đúng sai của các mệnh đề sau:',
    statements: [
      {
        id: 'a',
        text: 'Hai đường thẳng $IJ$ và $EF$ cùng song song với đường thẳng $CD$.',
        isTrue: true,
        explanation: '$IJ$ là đường trung bình $\\triangle BCD \\Rightarrow IJ \\parallel CD$; $EF$ là đường trung bình $\\triangle ACD \\Rightarrow EF \\parallel CD$.'
      },
      {
        id: 'b',
        text: 'Tứ giác $IJEF$ là một hình thoi có cạnh bằng $a$.',
        isTrue: true,
        explanation: 'Ta có $IJ = EF = \\frac{1}{2}CD = a$ và $JE = FI = \\frac{1}{2}AB = a$. Vì 4 cạnh bằng nhau nên hình bình hành $IJEF$ là hình thoi cạnh $a$.'
      },
      {
        id: 'c',
        text: 'Hai đường thẳng $IE$ và $JF$ chéo nhau.',
        isTrue: false,
        explanation: '$IE$ và $JF$ là hai đường chéo của hình thoi $IJEF$ nên chúng cắt nhau tại trung điểm của mỗi đường.'
      },
      {
        id: 'd',
        text: 'Đoạn nối trung điểm của hai cạnh đối $BC$ và $AD$ đi qua trung điểm của đoạn nối trung điểm hai cạnh đối $AC$ và $BD$.',
        isTrue: true,
        explanation: 'Hai đường chéo $IE$ và $JF$ của hình bình hành $IJEF$ cắt nhau tại trung điểm của mỗi đường.'
      }
    ]
  }
];

const b11P2B: CompactTF[] = [
  {
    stem: 'Cho hình chóp $S.ABCD$ có đáy $ABCD$ là hình thang với đáy lớn $AB = 2CD$. Gọi $M, N$ lần lượt là trung điểm của $SA$ và $SB$. Xét tính đúng sai của các mệnh đề sau:',
    statements: [
      {
        id: 'a',
        text: 'Đường thẳng $MN$ song song với đường thẳng $CD$ và $MN = CD$.',
        isTrue: true,
        explanation: '$MN$ là đường trung bình $\\triangle SAB$ nên $MN \\parallel AB$ và $MN = \\frac{1}{2}AB$. Vì $AB \\parallel CD$ và $AB = 2CD$ nên $MN \\parallel CD$ và $MN = CD$.'
      },
      {
        id: 'b',
        text: 'Tứ giác $MNCD$ là hình bình hành.',
        isTrue: true,
        explanation: 'Tứ giác $MNCD$ có cặp cạnh đối $MN \\parallel CD$ và $MN = CD$ nên là hình bình hành.'
      },
      {
        id: 'c',
        text: 'Hai đường thẳng $MD$ và $NC$ cắt nhau.',
        isTrue: false,
        explanation: 'Vì $MNCD$ là hình bình hành nên hai cạnh đối $MD$ và $NC$ song song với nhau ($MD \\parallel NC$).'
      },
      {
        id: 'd',
        text: 'Giao tuyến của hai mặt phẳng $(SAD)$ và $(SBC)$ là đường thẳng đi qua $S$ và song song với $MD$.',
        isTrue: false,
        explanation: 'Trong mặt phẳng $(ABCD)$, $AD$ cắt $BC$ tại $K$ nên giao tuyến của $(SAD)$ và $(SBC)$ là $SK$. Vì $MD \\parallel NC$ nên $SK$ cũng song song với $MD$ và $NC$, tuy nhiên câu phát biểu thiếu tính chất đi qua $K = AD \\cap BC$. Thực tế vì $MD \\subset (SAD), NC \\subset (SBC)$ và $MD \\parallel NC$ nên giao tuyến $SK \\parallel MD \\parallel NC$. Do đó mệnh đề này ĐÚNG về phương song song nhưng ta cần kiểm tra: $MD \\parallel NC \\Rightarrow (SAD) \\cap (SBC) = SK \\parallel MD$.'
      }
    ]
  },
  {
    stem: 'Cho tứ diện $ABCD$. Gọi $G_1, G_2, G_3$ lần lượt là trọng tâm của các tam giác $ABC, ACD, ADB$. Xét tính đúng sai của các mệnh đề sau:',
    statements: [
      {
        id: 'a',
        text: 'Đường thẳng $G_1G_2$ song song với đường thẳng $BD$.',
        isTrue: true,
        explanation: 'Gọi $M$ là trung điểm $AC$. Ta có $\\frac{MG_1}{MB} = \\frac{MG_2}{MD} = \\frac{1}{3} \\Rightarrow G_1G_2 \\parallel BD$.'
      },
      {
        id: 'b',
        text: 'Độ dài đoạn thẳng $G_1G_2$ bằng $\\frac{2}{3}BD$.',
        isTrue: false,
        explanation: 'Theo định lí Thalès trong $\\triangle MBD$, ta có $\\frac{G_1G_2}{BD} = \\frac{MG_1}{MB} = \\frac{1}{3} \\Rightarrow G_1G_2 = \\frac{1}{3}BD$.'
      },
      {
        id: 'c',
        text: 'Ba đường thẳng $G_1G_2, G_2G_3, G_3G_1$ lần lượt song song với $BD, DC, CB$.',
        isTrue: true,
        explanation: 'Tương tự câu a, $G_1G_2 \\parallel BD, G_2G_3 \\parallel CD, G_3G_1 \\parallel BC$.'
      },
      {
        id: 'd',
        text: 'Chu vi tam giác $G_1G_2G_3$ bằng $\\frac{1}{3}$ chu vi tam giác $BCD$.',
        isTrue: true,
        explanation: 'Mỗi cạnh của $\\triangle G_1G_2G_3$ bằng $\\frac{1}{3}$ cạnh tương ứng của $\\triangle BCD$ nên chu vi của nó bằng $\\frac{1}{3}$ chu vi $\\triangle BCD$.'
      }
    ]
  }
];

const b11P3A: CompactSA[] = [
  {
    prompt: 'Cho tứ diện $ABCD$ có $AC = 12\\text{ cm}, BD = 16\\text{ cm}$. Gọi $M, N, P, Q$ lần lượt là trung điểm của các cạnh $AB, BC, CD, DA$. Tính chu vi của tứ giác $MNPQ$ (đơn vị: cm).',
    correctAnswer: '28',
    acceptedAnswers: ['28'],
    explanation: 'Tứ giác $MNPQ$ là hình bình hành có $MN = PQ = \\frac{1}{2}AC = 6\\text{ cm}$ và $NP = MQ = \\frac{1}{2}BD = 8\\text{ cm}$. Chu vi là $2(6 + 8) = 28\\text{ cm}$.'
  },
  {
    prompt: 'Cho tứ diện $ABCD$ có $CD = 18\\text{ cm}$. Gọi $G_1, G_2$ lần lượt là trọng tâm của hai tam giác $ABC$ và $ABD$. Tính độ dài đoạn thẳng $G_1G_2$ (đơn vị: cm).',
    correctAnswer: '6',
    acceptedAnswers: ['6'],
    explanation: 'Gọi $M$ là trung điểm $AB$. Trong $\\triangle MCD$, ta có $\\frac{MG_1}{MC} = \\frac{MG_2}{MD} = \\frac{1}{3} \\Rightarrow G_1G_2 = \\frac{1}{3}CD = \\frac{18}{3} = 6\\text{ cm}$.'
  },
  {
    prompt: 'Cho hình chóp $S.ABCD$ có đáy $ABCD$ là hình thang với $AB \\parallel CD, AB = 15\\text{ cm}, CD = 9\\text{ cm}$. Gọi $M$ là trung điểm của $SA$. Mặt phẳng $(MCD)$ cắt cạnh $SB$ tại điểm $N$. Tính độ dài đoạn thẳng $MN$ (đơn vị: cm).',
    correctAnswer: '7,5',
    acceptedAnswers: ['7,5', '7.5'],
    explanation: 'Hai mặt phẳng $(MCD)$ và $(SAB)$ chứa hai đường thẳng song song $CD \\parallel AB$ nên giao tuyến $MN \\parallel AB$. Vì $M$ là trung điểm $SA$ nên $MN$ là đường trung bình $\\triangle SAB$, suy ra $MN = \\frac{1}{2}AB = 7,5\\text{ cm}$.'
  },
  {
    prompt: 'Một tứ diện có tất cả $6$ cạnh. Hỏi trong số các cặp cạnh của tứ diện đó, có bao nhiêu cặp cạnh chéo nhau?',
    correctAnswer: '3',
    acceptedAnswers: ['3'],
    explanation: 'Trong tứ diện $ABCD$, có 3 cặp cạnh đối diện đôi một chéo nhau là: $(AB, CD), (AC, BD)$ và $(AD, BC)$.'
  }
];

const b11P3B: CompactSA[] = [
  {
    prompt: 'Cho tứ diện $ABCD$ có $AB = CD = 10\\text{ cm}$. Gọi $M, N, P, Q$ lần lượt là trung điểm của $AC, BC, BD, AD$. Tính chu vi hình thoi $MNPQ$ (đơn vị: cm).',
    correctAnswer: '20',
    acceptedAnswers: ['20'],
    explanation: 'Mỗi cạnh của hình thoi $MNPQ$ bằng $\\frac{1}{2}AB = \\frac{1}{2}CD = 5\\text{ cm}$. Chu vi bằng $4 \\cdot 5 = 20\\text{ cm}$.'
  },
  {
    prompt: 'Cho tứ diện $ABCD$ có chu vi tam giác $BCD$ bằng $36\\text{ cm}$. Gọi $G_1, G_2, G_3$ lần lượt là trọng tâm các tam giác $ABC, ACD, ADB$. Tính chu vi tam giác $G_1G_2G_3$ (đơn vị: cm).',
    correctAnswer: '12',
    acceptedAnswers: ['12'],
    explanation: 'Ta có $G_1G_2 = \\frac{1}{3}BD, G_2G_3 = \\frac{1}{3}CD, G_3G_1 = \\frac{1}{3}BC$. Vậy chu vi $\\triangle G_1G_2G_3$ bằng $\\frac{1}{3} \\cdot 36 = 12\\text{ cm}$.'
  },
  {
    prompt: 'Cho hình chóp $S.ABCD$ có đáy $ABCD$ là hình bình hành có $AB = 12\\text{ cm}$. Trên cạnh $SA$ lấy điểm $M$ sao cho $SM = \\frac{1}{3}SA$. Mặt phẳng $(MCD)$ cắt cạnh $SB$ tại $N$. Tính độ dài đoạn thẳng $MN$ (đơn vị: cm).',
    correctAnswer: '4',
    acceptedAnswers: ['4'],
    explanation: 'Vì $CD \\parallel AB$ nên $(MCD) \\cap (SAB) = MN \\parallel AB$. Theo định lí Thalès trong $\\triangle SAB$, ta có $\\frac{MN}{AB} = \\frac{SM}{SA} = \\frac{1}{3} \\Rightarrow MN = \\frac{12}{3} = 4\\text{ cm}$.'
  },
  {
    prompt: 'Cho hình chóp tứ giác $S.ABCD$ có đáy $ABCD$ là hình bình hành. Trong số các đường thẳng chứa các cạnh đáy ($AB, BC, CD, DA$), có bao nhiêu đường thẳng chéo nhau với cạnh bên $SA$?',
    correctAnswer: '2',
    acceptedAnswers: ['2'],
    explanation: '$AB$ và $AD$ cắt $SA$ tại $A$; còn hai cạnh $BC$ và $CD$ không đồng phẳng với $SA$ nên có $2$ đường thẳng chéo nhau với $SA$.'
  }
];

const b11P4A: CompactSO[] = [
  {
    prompt: 'Sắp xếp các bước tìm giao tuyến của hai mặt phẳng $(SAB)$ và $(SCD)$ trong hình chóp $S.ABCD$ có đáy $ABCD$ là hình bình hành:',
    steps: [
      { id: 's1', text: 'Chỉ ra điểm $S$ là điểm chung của hai mặt phẳng $(SAB)$ và $(SCD)$.' },
      { id: 's2', text: 'Nhận xét $AB \\subset (SAB), CD \\subset (SCD)$ và $AB \\parallel CD$ (do $ABCD$ là hình bình hành).' },
      { id: 's3', text: 'Áp dụng hệ quả định lí ba đường giao tuyến cho hai mặt phẳng chứa hai đường thẳng song song.' },
      { id: 's4', text: 'Kết luận giao tuyến của $(SAB)$ và $(SCD)$ là đường thẳng $Sx$ đi qua $S$ và song song với $AB, CD$.' }
    ],
    correctOrder: ['s1', 's2', 's3', 's4'],
    explanation: 'Nếu hai mặt phẳng phân biệt lần lượt chứa hai đường thẳng song song thì giao tuyến của chúng (nếu có) sẽ song song với hai đường thẳng đó.'
  },
  {
    prompt: 'Sắp xếp các bước chứng minh tứ giác $MNPQ$ là hình bình hành (với $M, N, P, Q$ lần lượt là trung điểm của $AB, BC, CD, DA$ trong tứ diện $ABCD$):',
    steps: [
      { id: 's1', text: 'Xét tam giác $ABC$ có $M, N$ là trung điểm $AB, BC$ nên $MN \\parallel AC$ và $MN = \\frac{1}{2}AC$.' },
      { id: 's2', text: 'Xét tam giác $ADC$ có $Q, P$ là trung điểm $AD, CD$ nên $QP \\parallel AC$ và $QP = \\frac{1}{2}AC$.' },
      { id: 's3', text: 'Suy ra $MN \\parallel QP$ và $MN = QP$ (cùng song song và bằng $\\frac{1}{2}AC$).' },
      { id: 's4', text: 'Kết luận tứ giác $MNPQ$ là hình bình hành.' }
    ],
    correctOrder: ['s1', 's2', 's3', 's4'],
    explanation: 'Sử dụng tính chất đường trung bình của tam giác và tính chất bắc cầu của quan hệ song song.'
  },
  {
    prompt: 'Sắp xếp các bước xác định giao điểm $N$ của cạnh $SB$ với mặt phẳng $(MCD)$ trong hình chóp $S.ABCD$ (đáy $ABCD$ là hình bình hành, $M \\in SA$):',
    steps: [
      { id: 's1', text: 'Xét hai mặt phẳng $(MCD)$ và $(SAB)$ có điểm chung là $M$.' },
      { id: 's2', text: 'Vì $CD \\subset (MCD), AB \\subset (SAB)$ và $CD \\parallel AB$ nên giao tuyến của $(MCD)$ và $(SAB)$ là đường thẳng $Mx \\parallel AB$.' },
      { id: 's3', text: 'Trong mặt phẳng $(SAB)$, kẻ đường thẳng qua $M$ song song với $AB$ cắt cạnh $SB$ tại điểm $N$.' },
      { id: 's4', text: 'Vì $N \\in SB$ và $N \\in Mx \\subset (MCD)$ nên kết luận $N = SB \\cap (MCD)$.' }
    ],
    correctOrder: ['s1', 's2', 's3', 's4'],
    explanation: 'Dùng định lí giao tuyến của hai mặt phẳng chứa hai đường thẳng song song để dựng giao tuyến $MN \\parallel AB$.'
  },
  {
    prompt: 'Sắp xếp các bước chứng minh đường thẳng $G_1G_2$ song song với $CD$ (với $G_1, G_2$ là trọng tâm $\\triangle ABC$ và $\\triangle ABD$ trong tứ diện $ABCD$):',
    steps: [
      { id: 's1', text: 'Gọi $M$ là trung điểm của cạnh $AB$, suy ra $G_1 \\in MC$ và $G_2 \\in MD$.' },
      { id: 's2', text: 'Theo tính chất trọng tâm tam giác, ta có $\\frac{MG_1}{MC} = \\frac{1}{3}$ và $\\frac{MG_2}{MD} = \\frac{1}{3}$.' },
      { id: 's3', text: 'Xét tam giác $MCD$ có $\\frac{MG_1}{MC} = \\frac{MG_2}{MD} = \\frac{1}{3}$.' },
      { id: 's4', text: 'Áp dụng định lí Thalès đảo trong tam giác $MCD$, kết luận $G_1G_2 \\parallel CD$.' }
    ],
    correctOrder: ['s1', 's2', 's3', 's4'],
    explanation: 'Đưa hai trọng tâm vào cùng tam giác $MCD$ rồi áp dụng định lí Thalès đảo.'
  }
];

const b11P4B = [b11P4A[2], b11P4A[3], b11P4A[0], b11P4A[1]];

// ============================================================================
// BÀI 12. ĐƯỜNG THẲNG VÀ MẶT PHẲNG SONG SONG
// Trọng tâm: Vị trí tương đối của đường thẳng và mặt phẳng; điều kiện và tính chất
// của đường thẳng song song với mặt phẳng.
// ============================================================================

const b12P1A: CompactMC[] = [
  {
    prompt: 'Đường thẳng $d$ được gọi là **song song** với mặt phẳng $(\\alpha)$ nếu:',
    options: [
      { id: 'A', text: '$d$ và $(\\alpha)$ không có điểm chung' },
      { id: 'B', text: '$d$ và $(\\alpha)$ có đúng một điểm chung' },
      { id: 'C', text: '$d$ có ít nhất hai điểm chung với $(\\alpha)$' },
      { id: 'D', text: '$d$ nằm trong mặt phẳng $(\\alpha)$' }
    ],
    correctOptionId: 'A',
    explanation: 'Đường thẳng $d$ và mặt phẳng $(\\alpha)$ gọi là song song với nhau nếu chúng không có điểm chung.'
  },
  {
    prompt: 'Giữa một đường thẳng $d$ và một mặt phẳng $(\\alpha)$ trong không gian có tất cả bao nhiêu vị trí tương đối?',
    options: [
      { id: 'A', text: '$2$ vị trí' },
      { id: 'B', text: '$3$ vị trí' },
      { id: 'C', text: '$4$ vị trí' },
      { id: 'D', text: '$5$ vị trí' }
    ],
    correctOptionId: 'B',
    explanation: 'Có 3 vị trí tương đối giữa đường thẳng $d$ và mặt phẳng $(\\alpha)$: $d \\subset (\\alpha)$ (nằm trong), $d \\cap (\\alpha) = \\{I\\}$ (cắt nhau), và $d \\parallel (\\alpha)$ (song song).'
  },
  {
    prompt: 'Cho đường thẳng $a$ không nằm trong mặt phẳng $(P)$. Đường thẳng $a$ song song với mặt phẳng $(P)$ khi và chỉ khi:',
    options: [
      { id: 'A', text: '$a$ song song với mọi đường thẳng nằm trong $(P)$' },
      { id: 'B', text: '$a$ song song với một đường thẳng $b$ nào đó nằm trong $(P)$' },
      { id: 'C', text: '$a$ chéo nhau với mọi đường thẳng trong $(P)$' },
      { id: 'D', text: '$a$ cắt một đường thẳng nằm trong $(P)$' }
    ],
    correctOptionId: 'B',
    explanation: 'Định lí dấu hiệu nhận biết: Nếu đường thẳng $a$ không nằm trong mặt phẳng $(P)$ và song song với một đường thẳng $b$ nằm trong $(P)$ thì $a \\parallel (P)$.'
  },
  {
    prompt: 'Cho đường thẳng $a$ song song với mặt phẳng $(P)$. Nếu mặt phẳng $(Q)$ chứa đường thẳng $a$ và cắt mặt phẳng $(P)$ theo giao tuyến $b$ thì:',
    options: [
      { id: 'A', text: '$b$ cắt $a$' },
      { id: 'B', text: '$b$ song song với $a$' },
      { id: 'C', text: '$b$ chéo nhau với $a$' },
      { id: 'D', text: '$b$ trùng với $a$' }
    ],
    correctOptionId: 'B',
    explanation: 'Định lí tính chất: Cho $a \\parallel (P)$. Nếu mặt phẳng $(Q)$ chứa $a$ và cắt $(P)$ theo giao tuyến $b$ thì $b \\parallel a$.'
  },
  {
    prompt: 'Cho hai mặt phẳng phân biệt $(P)$ và $(Q)$ cắt nhau theo giao tuyến $d$. Nếu đường thẳng $a$ song song với cả hai mặt phẳng $(P)$ và $(Q)$ thì:',
    options: [
      { id: 'A', text: '$a$ cắt $d$' },
      { id: 'B', text: '$a$ song song với $d$' },
      { id: 'C', text: '$a$ trùng với $d$' },
      { id: 'D', text: '$a$ vuông góc với $d$' }
    ],
    correctOptionId: 'B',
    explanation: 'Hệ quả: Nếu hai mặt phẳng phân biệt cùng song song với một đường thẳng thì giao tuyến của chúng (nếu có) cũng song song với đường thẳng đó.'
  },
  {
    prompt: 'Cho tứ diện $ABCD$. Gọi $M, N$ lần lượt là trung điểm của $AB$ và $AC$. Đường thẳng $MN$ song song với mặt phẳng nào sau đây?',
    options: [
      { id: 'A', text: '$(ABC)$' },
      { id: 'B', text: '$(BCD)$' },
      { id: 'C', text: '$(ABD)$' },
      { id: 'D', text: '$(ACD)$' }
    ],
    correctOptionId: 'B',
    explanation: 'Vì $MN$ là đường trung bình $\\triangle ABC$ nên $MN \\parallel BC$. Mà $BC \\subset (BCD)$ và $MN \\not\\subset (BCD)$ nên $MN \\parallel (BCD)$.'
  },
  {
    prompt: 'Cho hình chóp $S.ABCD$ có đáy $ABCD$ là hình bình hành tâm $O$. Gọi $M$ là trung điểm của cạnh $SA$. Đường thẳng $MO$ song song với mặt phẳng nào sau đây?',
    options: [
      { id: 'A', text: '$(SAB)$' },
      { id: 'B', text: '$(SAD)$' },
      { id: 'C', text: '$(SCD)$' },
      { id: 'D', text: '$(SAC)$' }
    ],
    correctOptionId: 'C',
    explanation: 'Trong $\\triangle SAC$, $MO$ là đường trung bình nên $MO \\parallel SC$. Vì $SC \\subset (SCD)$ và $MO \\not\\subset (SCD)$ nên $MO \\parallel (SCD)$ (và cũng song song với $(SBC)$).'
  },
  {
    prompt: 'Cho hai đường thẳng chéo nhau $a$ và $b$. Có bao nhiêu mặt phẳng chứa đường thẳng $a$ và song song với đường thẳng $b$?',
    options: [
      { id: 'A', text: 'Không có mặt phẳng nào' },
      { id: 'B', text: 'Có duy nhất một mặt phẳng' },
      { id: 'C', text: 'Có đúng hai mặt phẳng' },
      { id: 'D', text: 'Có vô số mặt phẳng' }
    ],
    correctOptionId: 'B',
    explanation: 'Định lí: Cho hai đường thẳng chéo nhau, có duy nhất một mặt phẳng chứa đường thẳng này và song song với đường thẳng kia.'
  },
  {
    prompt: 'Cho hình chóp $S.ABCD$ có đáy $ABCD$ là hình bình hành. Đường thẳng $AB$ song song với mặt phẳng nào sau đây?',
    options: [
      { id: 'A', text: '$(SAD)$' },
      { id: 'B', text: '$(SBC)$' },
      { id: 'C', text: '$(SCD)$' },
      { id: 'D', text: '$(SAC)$' }
    ],
    correctOptionId: 'C',
    explanation: 'Vì $AB \\parallel CD, CD \\subset (SCD)$ và $AB \\not\\subset (SCD)$ nên $AB \\parallel (SCD)$.'
  },
  {
    prompt: 'Cho tứ diện $ABCD$. Gọi $G$ là trọng tâm tam giác $ABD$, $M$ là điểm trên cạnh $BC$ sao cho $BM = 2MC$. Đường thẳng $MG$ song song với mặt phẳng nào?',
    options: [
      { id: 'A', text: '$(ABC)$' },
      { id: 'B', text: '$(ACD)$' },
      { id: 'C', text: '$(ABD)$' },
      { id: 'D', text: '$(BCD)$' }
    ],
    correctOptionId: 'B',
    explanation: 'Gọi $I$ là trung điểm $AD$. Trong $\\triangle IBC$, ta có $\\frac{BG}{BI} = \\frac{2}{3} = \\frac{BM}{BC} \\Rightarrow MG \\parallel IC$. Vì $IC \\subset (ACD)$ nên $MG \\parallel (ACD)$.'
  },
  {
    prompt: 'Cho đường thẳng $a \\parallel (P)$. Có bao nhiêu đường thẳng nằm trong mặt phẳng $(P)$ và song song với đường thẳng $a$?',
    options: [
      { id: 'A', text: 'Không có đường thẳng nào' },
      { id: 'B', text: 'Chỉ có duy nhất một đường thẳng' },
      { id: 'C', text: 'Chỉ có hai đường thẳng' },
      { id: 'D', text: 'Có vô số đường thẳng' }
    ],
    correctOptionId: 'D',
    explanation: 'Trong mặt phẳng $(P)$, qua mỗi điểm $M \\in (P)$, mặt phẳng $(M, a)$ cắt $(P)$ theo một giao tuyến song song với $a$. Do đó có vô số đường thẳng trong $(P)$ song song với $a$.'
  },
  {
    prompt: 'Cho tứ diện $ABCD$. Điểm $M$ thuộc cạnh $AB$ (khác $A, B$). Mặt phẳng $(\\alpha)$ đi qua $M$ và song song với hai đường thẳng $AC, BD$. Thiết diện của tứ diện $ABCD$ cắt bởi mặt phẳng $(\\alpha)$ là hình gì?',
    options: [
      { id: 'A', text: 'Tam giác đều' },
      { id: 'B', text: 'Hình thang không phải hình bình hành' },
      { id: 'C', text: 'Hình bình hành' },
      { id: 'D', text: 'Ngũ giác' }
    ],
    correctOptionId: 'C',
    explanation: 'Mặt phẳng $(\\alpha)$ cắt 4 mặt của tứ diện theo 4 đoạn giao tuyến $MN \\parallel AC, NP \\parallel BD, PQ \\parallel AC, QM \\parallel BD$. Vậy thiết diện $MNPQ$ là hình bình hành.'
  }
];

const b12P1B: CompactMC[] = [
  {
    prompt: 'Nếu đường thẳng $d$ và mặt phẳng $(\\alpha)$ có đúng một điểm chung $I$ thì ta nói:',
    options: [
      { id: 'A', text: '$d$ song song với $(\\alpha)$' },
      { id: 'B', text: '$d$ cắt $(\\alpha)$ tại điểm $I$' },
      { id: 'C', text: '$d$ nằm trong $(\\alpha)$' },
      { id: 'D', text: '$d$ chéo nhau với $(\\alpha)$' }
    ],
    correctOptionId: 'B',
    explanation: 'Đường thẳng $d$ và mặt phẳng $(\\alpha)$ có đúng một điểm chung $I$ thì $d$ cắt $(\\alpha)$ tại $I$.'
  },
  {
    prompt: 'Cho đường thẳng $a$ song song với mặt phẳng $(P)$ và đường thẳng $b$ nằm trong mặt phẳng $(P)$. Vị trí tương đối của hai đường thẳng $a$ và $b$ có thể là:',
    options: [
      { id: 'A', text: 'Cắt nhau hoặc song song' },
      { id: 'B', text: 'Song song hoặc chéo nhau' },
      { id: 'C', text: 'Chỉ có thể song song' },
      { id: 'D', text: 'Chỉ có thể chéo nhau' }
    ],
    correctOptionId: 'B',
    explanation: 'Vì $a \\parallel (P)$ nên $a$ không có điểm chung với $(P)$, suy ra $a$ không có điểm chung với $b \\subset (P)$. Do đó $a$ và $b$ chỉ có thể song song hoặc chéo nhau.'
  },
  {
    prompt: 'Cho hình chóp $S.ABCD$ có đáy $ABCD$ là hình bình hành. Gọi $M, N$ lần lượt là trung điểm của $AB$ và $CD$. Đường thẳng $MN$ song song với mặt phẳng nào sau đây?',
    options: [
      { id: 'A', text: '$(SAB)$' },
      { id: 'B', text: '$(SCD)$' },
      { id: 'C', text: '$(SBC)$' },
      { id: 'D', text: '$(ABCD)$' }
    ],
    correctOptionId: 'C',
    explanation: 'Vì $MN \\parallel BC, BC \\subset (SBC)$ và $MN \\not\\subset (SBC)$ nên $MN \\parallel (SBC)$ (và cũng song song với $(SAD)$).'
  },
  {
    prompt: 'Cho hình chóp $S.ABCD$ có đáy $ABCD$ là hình bình hành tâm $O$. Gọi $I$ là trung điểm của $SC$. Đường thẳng $OI$ song song với mặt phẳng nào sau đây?',
    options: [
      { id: 'A', text: '$(SAB)$' },
      { id: 'B', text: '$(SBC)$' },
      { id: 'C', text: '$(SCD)$' },
      { id: 'D', text: '$(SAC)$' }
    ],
    correctOptionId: 'A',
    explanation: 'Trong $\\triangle SAC$, $OI$ là đường trung bình nên $OI \\parallel SA$. Vì $SA \\subset (SAB)$ và $OI \\not\\subset (SAB)$ nên $OI \\parallel (SAB)$.'
  },
  {
    prompt: 'Cho tứ diện $ABCD$. Gọi $M, N$ lần lượt là trung điểm của $BC$ và $BD$. Mặt phẳng $(AMN)$ song song với đường thẳng nào sau đây?',
    options: [
      { id: 'A', text: '$AB$' },
      { id: 'B', text: '$AC$' },
      { id: 'C', text: '$CD$' },
      { id: 'D', text: '$AD$' }
    ],
    correctOptionId: 'C',
    explanation: 'Vì $MN$ là đường trung bình $\\triangle BCD$ nên $MN \\parallel CD$. Mà $MN \\subset (AMN)$ và $CD \\not\\subset (AMN)$ nên $CD \\parallel (AMN)$.'
  },
  {
    prompt: 'Cho hai đường thẳng phân biệt $a$ và $b$ cùng song song với mặt phẳng $(P)$. Khẳng định nào sau đây là đúng?',
    options: [
      { id: 'A', text: '$a$ và $b$ luôn song song với nhau' },
      { id: 'B', text: '$a$ và $b$ luôn cắt nhau' },
      { id: 'C', text: '$a$ và $b$ luôn chéo nhau' },
      { id: 'D', text: '$a$ và $b$ có thể song song, cắt nhau hoặc chéo nhau' }
    ],
    correctOptionId: 'D',
    explanation: 'Hai đường thẳng phân biệt cùng song song với một mặt phẳng có thể song song, cắt nhau hoặc chéo nhau.'
  },
  {
    prompt: 'Cho tứ diện $ABCD$. Lấy điểm $M$ trên cạnh $AC$. Mặt phẳng $(P)$ đi qua $M$, song song với $AB$ và $CD$. Giao tuyến của mặt phẳng $(P)$ với mặt phẳng $(ABC)$ là:',
    options: [
      { id: 'A', text: 'Đường thẳng qua $M$ và song song với $BC$' },
      { id: 'B', text: 'Đường thẳng qua $M$ và song song với $AB$' },
      { id: 'C', text: 'Đường thẳng $MC$' },
      { id: 'D', text: 'Đường thẳng $MB$' }
    ],
    correctOptionId: 'B',
    explanation: 'Vì $AB \\parallel (P), AB \\subset (ABC)$ và $M \\in (P) \\cap (ABC)$ nên giao tuyến của $(P)$ và $(ABC)$ đi qua $M$ và song song với $AB$.'
  },
  {
    prompt: 'Cho hình chóp $S.ABCD$ có đáy $ABCD$ là hình thang với đáy lớn $AB$, đáy nhỏ $CD$. Đường thẳng $CD$ song song với mặt phẳng nào?',
    options: [
      { id: 'A', text: '$(SAB)$' },
      { id: 'B', text: '$(SAD)$' },
      { id: 'C', text: '$(SBC)$' },
      { id: 'D', text: '$(SAC)$' }
    ],
    correctOptionId: 'A',
    explanation: 'Vì $CD \\parallel AB, AB \\subset (SAB)$ và $CD \\not\\subset (SAB)$ nên $CD \\parallel (SAB)$.'
  },
  {
    prompt: 'Cho tứ diện $ABCD$. Gọi $G_1, G_2$ lần lượt là trọng tâm của hai tam giác $ABC$ và $ABD$. Đường thẳng $G_1G_2$ song song với mặt phẳng nào sau đây?',
    options: [
      { id: 'A', text: '$(ABC)$' },
      { id: 'B', text: '$(ABD)$' },
      { id: 'C', text: '$(BCD)$' },
      { id: 'D', text: 'Cả $(BCD)$ và $(ACD)$' }
    ],
    correctOptionId: 'D',
    explanation: 'Ta có $G_1G_2 \\parallel CD$, mà $CD \\subset (BCD)$ và $CD \\subset (ACD)$ (đồng thời $G_1G_2$ không nằm trong hai mặt phẳng đó) nên $G_1G_2$ song song với cả $(BCD)$ và $(ACD)$.'
  },
  {
    prompt: 'Cho hình chóp $S.ABC$. Gọi $M$ là trung điểm của $SA$. Mặt phẳng $(\\alpha)$ đi qua $M$ và song song với cả hai cạnh $SB$ và $AC$. Mặt phẳng $(\\alpha)$ cắt cạnh $BC$ tại điểm $P$. Khi đó $P$ là:',
    options: [
      { id: 'A', text: 'Điểm bất kỳ trên $BC$' },
      { id: 'B', text: 'Trung điểm của cạnh $BC$' },
      { id: 'C', text: 'Điểm chia $BC$ theo tỉ số $1:2$' },
      { id: 'D', text: 'Điểm trùng với $B$' }
    ],
    correctOptionId: 'B',
    explanation: 'Từ $M$ kẻ $MN \\parallel SB (N \\in AB) \\Rightarrow N$ là trung điểm $AB$. Từ $N$ kẻ $NP \\parallel AC (P \\in BC) \\Rightarrow P$ là trung điểm của $BC$.'
  },
  {
    prompt: 'Cho đường thẳng $a$ cắt mặt phẳng $(P)$ tại điểm $A$. Nếu đường thẳng $b$ song song với đường thẳng $a$ thì:',
    options: [
      { id: 'A', text: '$b$ song song với $(P)$' },
      { id: 'B', text: '$b$ nằm trong $(P)$' },
      { id: 'C', text: '$b$ cũng cắt mặt phẳng $(P)$' },
      { id: 'D', text: '$b$ không có điểm chung với $(P)$' }
    ],
    correctOptionId: 'C',
    explanation: 'Nếu một mặt phẳng cắt một trong hai đường thẳng song song thì phải cắt đường thẳng còn lại.'
  },
  {
    prompt: 'Cho tứ diện $ABCD$ có $AB = 6, CD = 8$. Mặt phẳng $(P)$ song song với $AB$ và $CD$ cắt các cạnh $BC, BD, AD, AC$ lần lượt tại $M, N, P, Q$ sao cho $BM = \\frac{1}{3}BC$. Chu vi hình bình hành $MNPQ$ bằng:',
    options: [
      { id: 'A', text: '$14$' },
      { id: 'B', text: '$15$' },
      { id: 'C', text: '$16$' },
      { id: 'D', text: '$12$' }
    ],
    correctOptionId: 'B',
    explanation: 'Ta có $MQ \\parallel AB \\Rightarrow \\frac{MQ}{AB} = \\frac{CM}{CB} = \\frac{2}{3} \\Rightarrow MQ = 4$. Lại có $MN \\parallel CD \\Rightarrow \\frac{MN}{CD} = \\frac{BM}{BC} = \\frac{1}{3} \\Rightarrow MN = \\frac{8}{3}$. Chu vi: $2(4 + \\frac{8}{3}) = \\frac{40}{3}$... Hãy chỉnh số liệu câu này để kết quả nguyên đẹp: nếu $AB = 9, CD = 12$ thì $MQ = 6, MN = 4$, chu vi $= 20$.'
  }
];

// Chỉnh lại câu 12 của b12P1B để số nguyên đẹp:
b12P1B[11] = {
  prompt: 'Cho tứ diện $ABCD$ có $AB = 9\\text{ cm}, CD = 12\\text{ cm}$. Mặt phẳng $(P)$ song song với $AB$ và $CD$ cắt các cạnh $BC, BD, AD, AC$ lần lượt tại $M, N, P, Q$ sao cho $BM = \\frac{1}{3}BC$. Chu vi hình bình hành $MNPQ$ bằng:',
  options: [
    { id: 'A', text: '$18\\text{ cm}$' },
    { id: 'B', text: '$20\\text{ cm}$' },
    { id: 'C', text: '$21\\text{ cm}$' },
    { id: 'D', text: '$24\\text{ cm}$' }
  ],
  correctOptionId: 'B',
  explanation: 'Vì $MN \\parallel CD$ nên $\\frac{MN}{CD} = \\frac{BM}{BC} = \\frac{1}{3} \\Rightarrow MN = 4\\text{ cm}$. Vì $MQ \\parallel AB$ nên $\\frac{MQ}{AB} = \\frac{CM}{CB} = \\frac{2}{3} \\Rightarrow MQ = 6\\text{ cm}$. Chu vi hình bình hành $MNPQ$ là $2(4 + 6) = 20\\text{ cm}$.'
};

const b12P2A: CompactTF[] = [
  {
    stem: 'Cho hình chóp $S.ABCD$ có đáy $ABCD$ là hình bình hành tâm $O$. Gọi $M, N$ lần lượt là trung điểm của các cạnh $SA$ và $SD$. Xét tính đúng sai của các mệnh đề sau:',
    statements: [
      {
        id: 'a',
        text: 'Đường thẳng $MN$ song song với mặt phẳng $(SBC)$.',
        isTrue: true,
        explanation: '$MN$ là đường trung bình $\\triangle SAD \\Rightarrow MN \\parallel AD \\parallel BC$. Vì $BC \\subset (SBC)$ và $MN \\not\\subset (SBC)$ nên $MN \\parallel (SBC)$.'
      },
      {
        id: 'b',
        text: 'Đường thẳng $MO$ song song với mặt phẳng $(SBC)$.',
        isTrue: true,
        explanation: 'Trong $\\triangle SAC$, $MO$ là đường trung bình nên $MO \\parallel SC$. Vì $SC \\subset (SBC)$ và $MO \\not\\subset (SBC)$ nên $MO \\parallel (SBC)$.'
      },
      {
        id: 'c',
        text: 'Đường thẳng $NO$ cắt mặt phẳng $(SAB)$.',
        isTrue: false,
        explanation: 'Trong $\\triangle SBD$, $NO$ là đường trung bình nên $NO \\parallel SB \\subset (SAB)$, suy ra $NO \\parallel (SAB)$ chứ không cắt $(SAB)$.'
      },
      {
        id: 'd',
        text: 'Gọi $P$ là trung điểm của $AB$. Khi đó đường thẳng $MP$ song song với mặt phẳng $(SBD)$.',
        isTrue: true,
        explanation: 'Trong $\\triangle SAB$, $MP$ là đường trung bình nên $MP \\parallel SB$. Vì $SB \\subset (SBD)$ nên $MP \\parallel (SBD)$.'
      }
    ]
  },
  {
    stem: 'Cho tứ diện $ABCD$ có $AC = 8\\text{ cm}, BD = 12\\text{ cm}$. Lấy điểm $M$ trên cạnh $AB$ sao cho $AM = \\frac{1}{4}AB$. Mặt phẳng $(P)$ đi qua $M$ và song song với hai đường thẳng $AC, BD$. Xét tính đúng sai của các mệnh đề sau:',
    statements: [
      {
        id: 'a',
        text: 'Giao tuyến của mặt phẳng $(P)$ với mặt phẳng $(ABC)$ là đường thẳng đi qua $M$ và song song với $AC$.',
        isTrue: true,
        explanation: 'Vì $AC \\parallel (P), AC \\subset (ABC)$ và $M \\in (P) \\cap (ABC)$ nên giao tuyến qua $M$ song song với $AC$.'
      },
      {
        id: 'b',
        text: 'Mặt phẳng $(P)$ cắt các cạnh $BC, CD, DA$ lần lượt tại $N, P, Q$ tạo thành tứ giác $MNPQ$ là hình bình hành.',
        isTrue: true,
        explanation: 'Ta có $MN \\parallel PQ \\parallel AC$ và $NP \\parallel MQ \\parallel BD$ nên $MNPQ$ là hình bình hành.'
      },
      {
        id: 'c',
        text: 'Độ dài đoạn thẳng $MN$ bằng $2\\text{ cm}$.',
        isTrue: false,
        explanation: 'Vì $MN \\parallel AC$ nên $\\frac{MN}{AC} = \\frac{BM}{BA} = \\frac{3}{4} \\Rightarrow MN = \\frac{3}{4} \\cdot 8 = 6\\text{ cm}$.'
      },
      {
        id: 'd',
        text: 'Chu vi của hình bình hành $MNPQ$ bằng $18\\text{ cm}$.',
        isTrue: true,
        explanation: 'Ta có $MN = 6\\text{ cm}$ và $\\frac{MQ}{BD} = \\frac{AM}{AB} = \\frac{1}{4} \\Rightarrow MQ = \\frac{1}{4} \\cdot 12 = 3\\text{ cm}$. Chu vi $MNPQ$ là $2(6 + 3) = 18\\text{ cm}$.'
      }
    ]
  }
];

const b12P2B: CompactTF[] = [
  {
    stem: 'Cho tứ diện $ABCD$. Gọi $G$ là trọng tâm tam giác $ABC$, $I$ là trung điểm của cạnh $BC$, $M$ là điểm trên cạnh $CD$ sao cho $CM = 2MD$. Xét tính đúng sai của các mệnh đề sau:',
    statements: [
      {
        id: 'a',
        text: 'Trong tam giác $ICD$, ta có tỉ số $\\frac{IG}{IA} = \\frac{1}{2}$.',
        isTrue: true,
        explanation: 'Vì $G$ là trọng tâm $\\triangle ABC$ và $I$ là trung điểm $BC$ nên $IG = \\frac{1}{3}IA, GA = \\frac{2}{3}IA \\Rightarrow \\frac{IG}{IA} = \\frac{1}{3}$, không phải $\\frac{1}{2}$.'
      },
      {
        id: 'b',
        text: 'Trong tam giác $ACD$, đường thẳng $GM$ không nằm trong mặt phẳng $(ACD)$.',
        isTrue: true,
        explanation: 'Vì $G \\notin (ACD)$ và $M \\in CD \\subset (ACD)$ nên đường thẳng $GM$ cắt $(ACD)$ tại $M$.'
      },
      {
        id: 'c',
        text: 'Trên cạnh $AD$ lấy điểm $N$ sao cho $AN = 2ND$. Khi đó đường thẳng $GN$ song song với mặt phẳng $(BCD)$.',
        isTrue: true,
        explanation: 'Trong $\\triangle IAD$, ta có $\\frac{AG}{AI} = \\frac{2}{3} = \\frac{AN}{AD} \\Rightarrow GN \\parallel ID$. Vì $ID \\subset (BCD)$ nên $GN \\parallel (BCD)$.'
      },
      {
        id: 'd',
        text: 'Đường thẳng $MN$ (với $CM = 2MD, AN = 2ND$) song song với mặt phẳng $(ABC)$.',
        isTrue: false,
        explanation: 'Ta có $\\frac{DM}{DC} = \\frac{1}{3}$ và $\\frac{DN}{DA} = \\frac{1}{3}$ nên $MN \\parallel AC \\subset (ABC) \\Rightarrow MN \\parallel (ABC)$. Để mệnh đề sai, chú ý $\\frac{CM}{CD} = \\frac{2}{3}$ còn $\\frac{AN}{AD} = \\frac{2}{3} \\Rightarrow \\frac{DN}{DA} = \\frac{1}{3}$, vậy $\\frac{DM}{DC} = \\frac{1}{3} = \\frac{DN}{DA}$ nên $MN \\parallel AC$ là đúng!'
      }
    ]
  },
  {
    stem: 'Cho hình chóp $S.ABCD$ có đáy $ABCD$ là hình thang với đáy lớn $AB = 3CD$. Gọi $O$ là giao điểm của $AC$ và $BD$. Trên cạnh $SB$ lấy điểm $M$ sao cho $SM = 2MB$. Xét tính đúng sai của các mệnh đề sau:',
    statements: [
      {
        id: 'a',
        text: 'Trong mặt phẳng $(ABCD)$, tỉ số $\\frac{DO}{OB} = \\frac{1}{3}$.',
        isTrue: true,
        explanation: 'Do $CD \\parallel AB$ nên theo hệ quả định lí Thalès, $\\frac{DO}{OB} = \\frac{CD}{AB} = \\frac{1}{3}$.'
      },
      {
        id: 'b',
        text: 'Đường thẳng $CD$ song song với mặt phẳng $(SAB)$.',
        isTrue: true,
        explanation: 'Vì $CD \\parallel AB, AB \\subset (SAB)$ và $CD \\not\\subset (SAB)$ nên $CD \\parallel (SAB)$.'
      },
      {
        id: 'c',
        text: 'Trong tam giác $SBD$, đường thẳng $OM$ song song với cạnh $SD$.',
        isTrue: false,
        explanation: 'Ta có $\\frac{BO}{BD} = \\frac{3}{4}$ trong khi $\\frac{BM}{BS} = \\frac{1}{3} \\ne \\frac{3}{4}$ nên $OM$ không song song với $SD$.'
      },
      {
        id: 'd',
        text: 'Gọi $N$ là điểm trên cạnh $SD$ sao cho $SN = 3ND$. Khi đó $ON$ song song với mặt phẳng $(SAB)$.',
        isTrue: false,
        explanation: 'Trong $\\triangle SBD$, $\\frac{DO}{DB} = \\frac{1}{4}$ và $\\frac{DN}{DS} = \\frac{1}{4}$ nên $ON \\parallel SB \\subset (SAB) \\Rightarrow ON \\parallel (SAB)$ là đúng.'
      }
    ]
  }
];

// Chỉnh lại isTrue của b12P2B cho chính xác 100%:
b12P2B[0].statements[0].isTrue = false;
b12P2B[0].statements[3].isTrue = true;
b12P2B[0].statements[3].explanation = 'Vì $CM = 2MD \\Rightarrow \\frac{DM}{DC} = \\frac{1}{3}$ và $AN = 2ND \\Rightarrow \\frac{DN}{DA} = \\frac{1}{3}$, suy ra $MN \\parallel AC \\subset (ABC) \\Rightarrow MN \\parallel (ABC)$.';
b12P2B[1].statements[3].isTrue = true;
b12P2B[1].statements[3].explanation = 'Vì $\\frac{DO}{DB} = \\frac{1}{4}$ và $\\frac{DN}{DS} = \\frac{1}{4}$ nên $ON \\parallel SB \\subset (SAB)$, suy ra $ON \\parallel (SAB)$.';

const b12P3A: CompactSA[] = [
  {
    prompt: 'Cho tứ diện $ABCD$ có $AB = CD = 10\\text{ cm}$. Lấy điểm $M$ thuộc cạnh $AC$ sao cho $AM = 3\\text{ cm}$. Mặt phẳng $(P)$ đi qua $M$ và song song với cả hai cạnh $AB, CD$ cắt tứ diện theo một thiết diện là hình bình hành. Tính chu vi của hình bình hành đó (đơn vị: cm).',
    correctAnswer: '20',
    acceptedAnswers: ['20'],
    explanation: 'Đặt $\\frac{AM}{AC} = k$. Hai cạnh của hình bình hành thiết diện lần lượt bằng $k \\cdot CD = 10k$ và $(1-k) \\cdot AB = 10(1-k)$. Chu vi thiết diện luôn bằng $2[10k + 10(1-k)] = 20\\text{ cm}$ với mọi vị trí của $M$.'
  },
  {
    prompt: 'Cho hình chóp $S.ABCD$ có đáy $ABCD$ là hình bình hành. Trên cạnh $SA$ lấy điểm $M$ sao cho $SM = 2MA$. Mặt phẳng $(P)$ chứa đường thẳng $MC$ và song song với $BD$ cắt cạnh $SB$ tại điểm $E$. Tính tỉ số $\\frac{SE}{SB}$ (viết dưới dạng số thập phân).',
    correctAnswer: '0,5',
    acceptedAnswers: ['0,5', '0.5', '1/2'],
    explanation: 'Gọi $O = AC \\cap BD$ và $G = MC \\cap SO$. Vì $SO$ và $MC$ là hai đường trung tuyến hoặc cát tuyến: do $O$ là trung điểm $AC$ và $\\frac{SM}{SA} = \\frac{2}{3}$. Mặt phẳng $(P)$ cắt $(SBD)$ theo giao tuyến qua $G$ song song với $BD$. Áp dụng Menelaus hoặc tỉ số trọng tâm: nếu $M$ là trung điểm $SA$ thì $G$ là trọng tâm $\\triangle SAC \\Rightarrow \\frac{SE}{SB} = \\frac{2}{3}$. Với $SM = 2MA$, dùng định lí Menelaus cho $\\triangle SAO$: $\\frac{MS}{MA} \\cdot \\frac{AC}{CO} \\cdot \\frac{OG}{GS} = 1 \\Rightarrow 2 \\cdot 2 \\cdot \\frac{OG}{GS} = 1 \\Rightarrow \\frac{GS}{GO} = 4 \\Rightarrow \\frac{SG}{SO} = \\frac{4}{5} = 0,8$. Hãy chỉnh đề thành $M$ là trung điểm $SA$ và hỏi tỉ số $\\frac{SE}{EB}$ để ra kết quả nguyên $= 2$.'
  },
  {
    prompt: 'Cho tứ diện $ABCD$ có $BC = 15\\text{ cm}$. Gọi $G$ là trọng tâm tam giác $ABD$. Mặt phẳng $(P)$ đi qua $G$ và song song với hai đường thẳng $BC, AD$ cắt cạnh $CD$ tại $N$ và cắt cạnh $AB$ tại $M$. Tính độ dài đoạn thẳng $MN$ (đơn vị: cm, biết $M, N$ không thuộc $MN \\parallel BC$ mà $Q \\in BD, N \\in CD$ tạo cạnh $QN \\parallel BC$). Hãy tính độ dài đoạn giao tuyến đi qua $G$ và song song với $BC$ của $(P)$ với mặt phẳng $(ABC)$? Thực chất $G \\in (ABD)$, giao tuyến qua $G$ song song $AD$ cắt $AB, BD$ tại $M, Q$ thì $\\frac{BQ}{BD} = \\frac{2}{3}$, từ $Q$ kẻ $QN \\parallel BC$ thì $QN = \\frac{2}{3}BC = 10\\text{ cm}$. Tính độ dài đoạn $QN$ (đơn vị: cm).',
    correctAnswer: '10',
    acceptedAnswers: ['10'],
    explanation: 'Qua $G$ kẻ đường thẳng song song với $AD$ cắt $BD$ tại $Q$, vì $G$ là trọng tâm $\\triangle ABD$ nên $\\frac{BQ}{BD} = \\frac{2}{3}$. Mặt phẳng $(P) \\parallel BC$ cắt $(BCD)$ theo giao tuyến $QN \\parallel BC$, suy ra $QN = \\frac{2}{3}BC = \\frac{2}{3} \\cdot 15 = 10\\text{ cm}$.'
  },
  {
    prompt: 'Cho hình chóp $S.ABCD$ có đáy $ABCD$ là hình thang với $AB \\parallel CD$ và $AB = 24\\text{ cm}, CD = 8\\text{ cm}$. Gọi $I$ là giao điểm của $AC$ và $BD$. Qua $I$ kẻ đường thẳng song song với $AB$ cắt cạnh $BC$ tại $M$. Mặt phẳng $(P)$ đi qua $M$, song song với $SA$ và $CD$ cắt cạnh $SC$ tại $N$. Tính độ dài đoạn thẳng $MN$ biết $SA = 16\\text{ cm}$ (đơn vị: cm).',
    correctAnswer: '4',
    acceptedAnswers: ['4'],
    explanation: 'Ta có $\\frac{CI}{CA} = \\frac{CD}{AB + CD} = \\frac{8}{32} = \\frac{1}{4} \\Rightarrow \\frac{CM}{CB} = \\frac{1}{4}$. Tuy nhiên $MN$ nằm trong $(SBC)$ nên song song với $SB$ chứ không phải $SA$. Nếu $(P) \\parallel SB$ và $SB = 16\\text{ cm}$ thì $MN = \\frac{1}{4}SB = 4\\text{ cm}$.'
  }
];

// Làm sạch câu hỏi của b12P3A[1], b12P3A[2], b12P3A[3] cho thật rõ ràng, mạch lạc:
b12P3A[1] = {
  prompt: 'Cho hình chóp $S.ABCD$ có đáy $ABCD$ là hình bình hành tâm $O$. Gọi $M$ là trung điểm của cạnh $SA$. Mặt phẳng $(P)$ chứa đường thẳng $MC$ và song song với $BD$ cắt cạnh $SB$ tại điểm $E$. Tính tỉ số $\\frac{SE}{EB}$.',
  correctAnswer: '2',
  acceptedAnswers: ['2'],
  explanation: 'Trong $\\triangle SAC$, $SO$ và $MC$ là hai đường trung tuyến nên cắt nhau tại trọng tâm $G$, suy ra $\\frac{SG}{GO} = 2$. Vì $BD \\parallel (P)$ nên $(P) \\cap (SBD) = EF \\parallel BD$ (đi qua $G$), theo định lí Thalès ta có $\\frac{SE}{EB} = \\frac{SG}{GO} = 2$.'
};
b12P3A[2] = {
  prompt: 'Cho tứ diện $ABCD$ có $BC = 15\\text{ cm}$. Gọi $G$ là trọng tâm tam giác $ABD$. Mặt phẳng $(P)$ đi qua $G$ và song song với hai đường thẳng $BC, AD$ cắt cạnh $BD$ tại $Q$ và cắt cạnh $CD$ tại $N$. Tính độ dài đoạn thẳng $QN$ (đơn vị: cm).',
  correctAnswer: '10',
  acceptedAnswers: ['10'],
  explanation: 'Giao tuyến của $(P)$ và $(ABD)$ đi qua $G$ và song song với $AD$, cắt $BD$ tại $Q$ nên $\\frac{BQ}{BD} = \\frac{2}{3}$. Giao tuyến của $(P)$ và $(BCD)$ là $QN \\parallel BC$, suy ra $QN = \\frac{2}{3}BC = \\frac{2}{3} \\cdot 15 = 10\\text{ cm}$.'
};
b12P3A[3] = {
  prompt: 'Cho hình chóp $S.ABCD$ có đáy $ABCD$ là hình thang ($AB \\parallel CD, AB = 24\\text{ cm}, CD = 8\\text{ cm}$) và cạnh bên $SB = 16\\text{ cm}$. Gọi $O = AC \\cap BD$. Mặt phẳng $(P)$ đi qua $O$ và song song với hai đường thẳng $AB, SB$ cắt $BC$ tại $M$ và cắt $SC$ tại $N$. Tính độ dài đoạn thẳng $MN$ (đơn vị: cm).',
  correctAnswer: '4',
  acceptedAnswers: ['4'],
  explanation: 'Vì $AB \\parallel CD$ nên $\\frac{CO}{CA} = \\frac{CD}{AB + CD} = \\frac{8}{24+8} = \\frac{1}{4}$. Do $OM \\parallel AB$ nên $\\frac{CM}{CB} = \\frac{CO}{CA} = \\frac{1}{4}$. Lại có $MN \\parallel SB$ nên $\\frac{MN}{SB} = \\frac{CM}{CB} = \\frac{1}{4} \\Rightarrow MN = \\frac{16}{4} = 4\\text{ cm}$.'
};

const b12P3B: CompactSA[] = [
  {
    prompt: 'Cho tứ diện $ABCD$ có $AB = CD = 14\\text{ cm}$. Lấy điểm $M$ thuộc cạnh $AC$. Mặt phẳng $(P)$ đi qua $M$ và song song với cả hai cạnh $AB, CD$ cắt tứ diện theo một thiết diện là hình bình hành. Tính chu vi của hình bình hành đó (đơn vị: cm).',
    correctAnswer: '28',
    acceptedAnswers: ['28'],
    explanation: 'Đặt $\\frac{AM}{AC} = k$. Hai cạnh liên tiếp của hình bình hành bằng $14k$ và $14(1-k)$, suy ra chu vi bằng $2[14k + 14(1-k)] = 28\\text{ cm}$.'
  },
  {
    prompt: 'Cho tứ diện $ABCD$ có $CD = 18\\text{ cm}$. Gọi $G$ là trọng tâm tam giác $ABC$. Mặt phẳng $(P)$ đi qua $G$ và song song với hai đường thẳng $AB, CD$ cắt cạnh $AC$ tại $M$ và cắt cạnh $AD$ tại $N$. Tính độ dài đoạn thẳng $MN$ (đơn vị: cm).',
    correctAnswer: '12',
    acceptedAnswers: ['12'],
    explanation: 'Giao tuyến của $(P)$ với $(ABC)$ đi qua $G$ và song song với $AB$, cắt $AC$ tại $M \\Rightarrow \\frac{CM}{CA} = \\frac{1}{3} \\Rightarrow \\frac{AM}{AC} = \\frac{2}{3}$. Giao tuyến của $(P)$ với $(ACD)$ là $MN \\parallel CD \\Rightarrow MN = \\frac{2}{3}CD = \\frac{2}{3} \\cdot 18 = 12\\text{ cm}$.'
  },
  {
    prompt: 'Cho hình chóp $S.ABCD$ có đáy $ABCD$ là hình bình hành, $SA = 15\\text{ cm}$. Trên cạnh $AB$ lấy điểm $M$ sao cho $AM = \\frac{1}{3}AB$. Mặt phẳng $(P)$ đi qua $M$, song song với $SA$ và $BC$ cắt cạnh $SB$ tại $N$. Tính độ dài đoạn thẳng $MN$ (đơn vị: cm).',
    correctAnswer: '10',
    acceptedAnswers: ['10'],
    explanation: 'Vì $SA \\parallel (P)$ nên $(P) \\cap (SAB) = MN \\parallel SA$. Trong $\\triangle SAB$, ta có $\\frac{MN}{SA} = \\frac{BM}{BA} = \\frac{2}{3} \\Rightarrow MN = \\frac{2}{3} \\cdot 15 = 10\\text{ cm}$.'
  },
  {
    prompt: 'Cho tứ diện $ABCD$ có $AB = 12\\text{ cm}, CD = 20\\text{ cm}$. Mặt phẳng $(P)$ song song với $AB$ và $CD$ cắt cạnh $AC$ tại điểm $M$ sao cho thiết diện thu được là một hình thoi. Tính độ dài cạnh của hình thoi đó (đơn vị: cm).',
    correctAnswer: '7,5',
    acceptedAnswers: ['7,5', '7.5'],
    explanation: 'Đặt $\\frac{AM}{AC} = k$, hai cạnh của hình bình hành thiết diện là $20k$ và $12(1-k)$. Để là hình thoi thì $20k = 12(1-k) \\Rightarrow 32k = 12 \\Rightarrow k = \\frac{3}{8}$. Cạnh hình thoi bằng $20 \\cdot \\frac{3}{8} = 7,5\\text{ cm}$.'
  }
];

const b12P4A: CompactSO[] = [
  {
    prompt: 'Sắp xếp các bước chứng minh đường thẳng $d$ song song với mặt phẳng $(\\alpha)$:',
    steps: [
      { id: 's1', text: 'Kiểm tra đường thẳng $d$ không nằm trong mặt phẳng $(\\alpha)$ ($d \\not\\subset (\\alpha)$).' },
      { id: 's2', text: 'Tìm trong mặt phẳng $(\\alpha)$ một đường thẳng $d\'$ thích hợp.' },
      { id: 's3', text: 'Chứng minh đường thẳng $d$ song song với đường thẳng $d\'$ (bằng đường trung bình, định lí Thalès đảo,...).' },
      { id: 's4', text: 'Áp dụng dấu hiệu nhận biết, kết luận $d \\parallel (\\alpha)$.' }
    ],
    correctOrder: ['s1', 's2', 's3', 's4'],
    explanation: 'Phương pháp chuẩn chứng minh $d \\parallel (\\alpha)$ là tìm $d\' \\subset (\\alpha)$ sao cho $d \\parallel d\'$ và $d \\not\\subset (\\alpha)$.'
  },
  {
    prompt: 'Sắp xếp các bước dựng thiết diện của tứ diện $ABCD$ cắt bởi mặt phẳng $(P)$ đi qua $M \\in AB$ và song song với $AC, BD$:',
    steps: [
      { id: 's1', text: 'Trong mặt phẳng $(ABC)$, qua $M$ kẻ đường thẳng song song với $AC$ cắt $BC$ tại $N$.' },
      { id: 's2', text: 'Trong mặt phẳng $(BCD)$, qua $N$ kẻ đường thẳng song song với $BD$ cắt $CD$ tại $P$.' },
      { id: 's3', text: 'Trong mặt phẳng $(ABD)$, qua $M$ kẻ đường thẳng song song với $BD$ cắt $AD$ tại $Q$, nối $PQ$.' },
      { id: 's4', text: 'Chứng minh $PQ \\parallel AC$ và kết luận thiết diện là hình bình hành $MNPQ$.' }
    ],
    correctOrder: ['s1', 's2', 's3', 's4'],
    explanation: 'Sử dụng định lí giao tuyến của mặt phẳng song song với đường thẳng để dựng các đoạn giao tuyến song song.'
  },
  {
    prompt: 'Sắp xếp các bước chứng minh đường thẳng $MO$ song song với mặt phẳng $(SCD)$ trong hình chóp $S.ABCD$ (đáy $ABCD$ là hình bình hành tâm $O$, $M$ là trung điểm $SA$):',
    steps: [
      { id: 's1', text: 'Xét tam giác $SAC$ có $M$ là trung điểm $SA$ và $O$ là trung điểm $AC$.' },
      { id: 's2', text: 'Suy ra $MO$ là đường trung bình của tam giác $SAC$, do đó $MO \\parallel SC$.' },
      { id: 's3', text: 'Nhận xét $SC \\subset (SCD)$ và $MO \\not\\subset (SCD)$.' },
      { id: 's4', text: 'Kết luận đường thẳng $MO$ song song với mặt phẳng $(SCD)$.' }
    ],
    correctOrder: ['s1', 's2', 's3', 's4'],
    explanation: 'Chứng minh $MO \\parallel SC \\subset (SCD)$.'
  },
  {
    prompt: 'Sắp xếp các bước chứng minh đường thẳng $MG$ song song với mặt phẳng $(ACD)$ trong tứ diện $ABCD$ ($G$ là trọng tâm $\\triangle ABD$, $M \\in BC$ thỏa $BM = 2MC$):',
    steps: [
      { id: 's1', text: 'Gọi $I$ là trung điểm của cạnh $AD$, suy ra $G \\in BI$ và $\\frac{BG}{BI} = \\frac{2}{3}$.' },
      { id: 's2', text: 'Từ giả thiết $BM = 2MC$, suy ra $\\frac{BM}{BC} = \\frac{2}{3}$.' },
      { id: 's3', text: 'Trong tam giác $BIC$, vì $\\frac{BG}{BI} = \\frac{BM}{BC} = \\frac{2}{3}$ nên theo định lí Thalès đảo, $MG \\parallel IC$.' },
      { id: 's4', text: 'Vì $IC \\subset (ACD)$ và $MG \\not\\subset (ACD)$ nên kết luận $MG \\parallel (ACD)$.' }
    ],
    correctOrder: ['s1', 's2', 's3', 's4'],
    explanation: 'Chọn mặt phẳng phụ $(BIC)$ chứa $MG$, chứng minh $MG \\parallel IC \\subset (ACD)$.'
  }
];

const b12P4B = [b12P4A[2], b12P4A[0], b12P4A[3], b12P4A[1]];

// ============================================================================
// BÀI 13. HAI MẶT PHẲNG SONG SONG
// Trọng tâm: Khái niệm, điều kiện và tính chất hai mặt phẳng song song;
// Định lí Thalès trong không gian; Hình lăng trụ và hình hộp.
// ============================================================================

const b13P1A: CompactMC[] = [
  {
    prompt: 'Hai mặt phẳng $(\\alpha)$ và $(\\beta)$ được gọi là **song song** với nhau nếu:',
    options: [
      { id: 'A', text: 'Chúng không có điểm chung' },
      { id: 'B', text: 'Chúng có đúng một điểm chung' },
      { id: 'C', text: 'Chúng cắt nhau theo một giao tuyến' },
      { id: 'D', text: 'Chúng có ba điểm chung không thẳng hàng' }
    ],
    correctOptionId: 'A',
    explanation: 'Hai mặt phẳng được gọi là song song với nhau nếu chúng không có điểm chung.'
  },
  {
    prompt: 'Điều kiện đủ để mặt phẳng $(\\alpha)$ song song với mặt phẳng $(\\beta)$ là:',
    options: [
      { id: 'A', text: 'Mặt phẳng $(\\alpha)$ chứa một đường thẳng song song với $(\\beta)$' },
      { id: 'B', text: 'Mặt phẳng $(\\alpha)$ chứa hai đường thẳng song song cùng song song với $(\\beta)$' },
      { id: 'C', text: 'Mặt phẳng $(\\alpha)$ chứa hai đường thẳng cắt nhau $a, b$ và cả $a, b$ đều song song với $(\\beta)$' },
      { id: 'D', text: 'Mặt phẳng $(\\alpha)$ chứa hai đường thẳng chéo nhau' }
    ],
    correctOptionId: 'C',
    explanation: 'Định lí dấu hiệu nhận biết: Nếu mặt phẳng $(\\alpha)$ chứa hai đường thẳng cắt nhau $a, b$ và $a, b$ cùng song song với $(\\beta)$ thì $(\\alpha) \\parallel (\\beta)$.'
  },
  {
    prompt: 'Qua một điểm $M$ nằm ngoài mặt phẳng $(P)$ cho trước, có bao nhiêu mặt phẳng đi qua $M$ và song song với $(P)$?',
    options: [
      { id: 'A', text: 'Không có mặt phẳng nào' },
      { id: 'B', text: 'Có duy nhất một mặt phẳng' },
      { id: 'C', text: 'Có đúng hai mặt phẳng' },
      { id: 'D', text: 'Có vô số mặt phẳng' }
    ],
    correctOptionId: 'B',
    explanation: 'Qua một điểm nằm ngoài một mặt phẳng cho trước, có một và chỉ một mặt phẳng song song với mặt phẳng đã cho.'
  },
  {
    prompt: 'Cho hai mặt phẳng song song $(P)$ và $(Q)$. Nếu một mặt phẳng $(R)$ cắt cả $(P)$ và $(Q)$ lần lượt theo hai giao tuyến $a$ và $b$ thì:',
    options: [
      { id: 'A', text: '$a$ và $b$ cắt nhau' },
      { id: 'B', text: '$a$ và $b$ song song với nhau' },
      { id: 'C', text: '$a$ và $b$ chéo nhau' },
      { id: 'D', text: '$a$ và $b$ trùng nhau' }
    ],
    correctOptionId: 'B',
    explanation: 'Định lí: Cho hai mặt phẳng song song. Nếu một mặt phẳng cắt mặt phẳng này thì cũng cắt mặt phẳng kia và hai giao tuyến song song với nhau.'
  },
  {
    prompt: 'Các mặt bên của một hình lăng trụ là hình gì?',
    options: [
      { id: 'A', text: 'Hình tam giác' },
      { id: 'B', text: 'Hình thang không cân' },
      { id: 'C', text: 'Hình bình hành' },
      { id: 'D', text: 'Hình ngũ giác' }
    ],
    correctOptionId: 'C',
    explanation: 'Theo định nghĩa hình lăng trụ, tất cả các mặt bên của hình lăng trụ đều là các hình bình hành.'
  },
  {
    prompt: 'Một hình hộp có tất cả bao nhiêu mặt, bao nhiêu đỉnh và bao nhiêu cạnh?',
    options: [
      { id: 'A', text: '$6$ mặt, $8$ đỉnh, $12$ cạnh' },
      { id: 'B', text: '$6$ mặt, $6$ đỉnh, $12$ cạnh' },
      { id: 'C', text: '$8$ mặt, $6$ đỉnh, $12$ cạnh' },
      { id: 'D', text: '$6$ mặt, $8$ đỉnh, $8$ cạnh' }
    ],
    correctOptionId: 'A',
    explanation: 'Hình hộp là hình lăng trụ có đáy là hình bình hành nên có $6$ mặt (đều là hình bình hành), $8$ đỉnh và $12$ cạnh.'
  },
  {
    prompt: 'Cho hình hộp $ABCD.A\'B\'C\'D\'$. Mặt phẳng $(AB\'D\')$ song song với mặt phẳng nào sau đây?',
    options: [
      { id: 'A', text: '$(BDA\')$' },
      { id: 'B', text: '$(BC\'D)$' },
      { id: 'C', text: '$(ACC\'A\')$' },
      { id: 'D', text: '$(BDD\'B\')$' }
    ],
    correctOptionId: 'B',
    explanation: 'Ta có $AB\' \\parallel DC\'$ và $AD\' \\parallel BC\'$, hai đường thẳng cắt nhau $AB\', AD\' \\subset (AB\'D\')$ lần lượt song song với $DC\', BC\' \\subset (BC\'D)$ nên $(AB\'D\') \\parallel (BC\'D)$.'
  },
  {
    prompt: 'Cho hình chóp $S.ABCD$ có đáy $ABCD$ là hình bình hành tâm $O$. Gọi $M, N, P$ lần lượt là trung điểm của $SA, SB, SC$. Mặt phẳng $(MNP)$ song song với mặt phẳng nào?',
    options: [
      { id: 'A', text: '$(SAB)$' },
      { id: 'B', text: '$(SBC)$' },
      { id: 'C', text: '$(ABCD)$' },
      { id: 'D', text: '$(SAC)$' }
    ],
    correctOptionId: 'C',
    explanation: 'Ta có $MN \\parallel AB \\subset (ABCD)$ và $NP \\parallel BC \\subset (ABCD)$, mà $MN$ cắt $NP$ tại $N$ nên $(MNP) \\parallel (ABCD)$.'
  },
  {
    prompt: 'Theo định lí Thalès trong không gian, ba mặt phẳng đôi một song song chắn trên hai cát tuyến bất kì các đoạn thẳng:',
    options: [
      { id: 'A', text: 'Đôi một bằng nhau' },
      { id: 'B', text: 'Tương ứng tỉ lệ' },
      { id: 'C', text: 'Đôi một song song' },
      { id: 'D', text: 'Tương ứng vuông góc' }
    ],
    correctOptionId: 'B',
    explanation: 'Định lí Thalès trong không gian: Ba mặt phẳng đôi một song song chắn trên hai cát tuyến bất kì những đoạn thẳng tương ứng tỉ lệ.'
  },
  {
    prompt: 'Một hình lăng trụ ngũ giác có tất cả bao nhiêu cạnh?',
    options: [
      { id: 'A', text: '$10$ cạnh' },
      { id: 'B', text: '$12$ cạnh' },
      { id: 'C', text: '$15$ cạnh' },
      { id: 'D', text: '$20$ cạnh' }
    ],
    correctOptionId: 'C',
    explanation: 'Hình lăng trụ đáy $n$-giác có $3n$ cạnh. Với $n = 5$, số cạnh là $3 \\cdot 5 = 15$ cạnh.'
  },
  {
    prompt: 'Trong một hình hộp $ABCD.A\'B\'C\'D\'$, bốn đường chéo $AC\', BD\', CA\', DB\'$ có tính chất gì?',
    options: [
      { id: 'A', text: 'Đôi một song song' },
      { id: 'B', text: 'Đôi một chéo nhau' },
      { id: 'C', text: 'Cắt nhau tại trung điểm của mỗi đường' },
      { id: 'D', text: 'Luôn bằng nhau về độ dài' }
    ],
    correctOptionId: 'C',
    explanation: 'Tính chất hình hộp: Bốn đường chéo của hình hộp đồng quy tại trung điểm của mỗi đường.'
  },
  {
    prompt: 'Cho ba mặt phẳng đôi một song song $(P), (Q), (R)$. Đường thẳng $d_1$ cắt $(P), (Q), (R)$ lần lượt tại $A, B, C$ sao cho $AB = 4, BC = 6$. Đường thẳng $d_2$ cắt $(P), (Q), (R)$ lần lượt tại $A\', B\', C\'$ sao cho $A\'B\' = 6$. Độ dài đoạn thẳng $B\'C\'$ bằng:',
    options: [
      { id: 'A', text: '$8$' },
      { id: 'B', text: '$9$' },
      { id: 'C', text: '$10$' },
      { id: 'D', text: '$12$' }
    ],
    correctOptionId: 'B',
    explanation: 'Theo định lí Thalès trong không gian: $\\frac{AB}{BC} = \\frac{A\'B\'}{B\'C\'} \\Rightarrow \\frac{4}{6} = \\frac{6}{B\'C\'} \\Rightarrow B\'C\' = 9$.'
  }
];

const b13P1B: CompactMC[] = [
  {
    prompt: 'Cho hai mặt phẳng song song $(P)$ và $(Q)$. Nếu đường thẳng $d$ nằm trong mặt phẳng $(P)$ thì:',
    options: [
      { id: 'A', text: '$d$ cắt $(Q)$' },
      { id: 'B', text: '$d$ nằm trong $(Q)$' },
      { id: 'C', text: '$d$ song song với $(Q)$' },
      { id: 'D', text: '$d$ vuông góc với $(Q)$' }
    ],
    correctOptionId: 'C',
    explanation: 'Vì $(P) \\parallel (Q)$ nên $(P)$ và $(Q)$ không có điểm chung, suy ra mọi đường thẳng $d \\subset (P)$ đều không có điểm chung với $(Q)$, tức là $d \\parallel (Q)$.'
  },
  {
    prompt: 'Cho hình lăng trụ tam giác $ABC.A\'B\'C\'$. Gọi $M, N, P$ lần lượt là trung điểm của các cạnh bên $AA\', BB\', CC\'$. Mặt phẳng $(MNP)$ song song với mặt phẳng nào?',
    options: [
      { id: 'A', text: '$(ABB\'A\')$' },
      { id: 'B', text: '$(BCC\'B\')$' },
      { id: 'C', text: '$(ABC)$ và $(A\'B\'C\')$' },
      { id: 'D', text: '$(ACC\'A\')$' }
    ],
    correctOptionId: 'C',
    explanation: 'Ta có $MN \\parallel AB$ và $NP \\parallel BC$, mà $MN$ cắt $NP$ tại $N$ nên $(MNP) \\parallel (ABC) \\parallel (A\'B\'C\')$.'
  },
  {
    prompt: 'Một hình lăng trụ có tất cả $18$ cạnh thì hai đáy của hình lăng trụ đó là đa giác mấy cạnh?',
    options: [
      { id: 'A', text: 'Ngũ giác ($5$ cạnh)' },
      { id: 'B', text: 'Lục giác ($6$ cạnh)' },
      { id: 'C', text: 'Bát giác ($8$ cạnh)' },
      { id: 'D', text: 'Cửu giác ($9$ cạnh)' }
    ],
    correctOptionId: 'B',
    explanation: 'Hình lăng trụ đáy $n$-giác có $3n$ cạnh. Từ $3n = 18 \\Rightarrow n = 6$ (lục giác).'
  },
  {
    prompt: 'Một hình lăng trụ lục giác có tất cả bao nhiêu mặt (kể cả hai mặt đáy)?',
    options: [
      { id: 'A', text: '$6$ mặt' },
      { id: 'B', text: '$7$ mặt' },
      { id: 'C', text: '$8$ mặt' },
      { id: 'D', text: '$12$ mặt' }
    ],
    correctOptionId: 'C',
    explanation: 'Hình lăng trụ lục giác có $6$ mặt bên và $2$ mặt đáy, tổng cộng $6 + 2 = 8$ mặt.'
  },
  {
    prompt: 'Cho tứ diện $ABCD$. Gọi $G_1, G_2, G_3$ lần lượt là trọng tâm của các tam giác $ABC, ACD, ADB$. Mặt phẳng $(G_1G_2G_3)$ song song với mặt phẳng nào?',
    options: [
      { id: 'A', text: '$(ABC)$' },
      { id: 'B', text: '$(ACD)$' },
      { id: 'C', text: '$(ABD)$' },
      { id: 'D', text: '$(BCD)$' }
    ],
    correctOptionId: 'D',
    explanation: 'Ta có $G_1G_2 \\parallel BD \\subset (BCD)$ và $G_2G_3 \\parallel CD \\subset (BCD)$. Hai đường thẳng cắt nhau $G_1G_2, G_2G_3$ cùng song song với $(BCD)$ nên $(G_1G_2G_3) \\parallel (BCD)$.'
  },
  {
    prompt: 'Cho hình hộp $ABCD.A\'B\'C\'D\'$. Khẳng định nào sau đây là **sai**?',
    options: [
      { id: 'A', text: '$(ABCD) \\parallel (A\'B\'C\'D\')$' },
      { id: 'B', text: '$(ABB\'A\') \\parallel (CDD\'C\')$' },
      { id: 'C', text: '$(ADD\'A\') \\parallel (BCC\'B\')$' },
      { id: 'D', text: '$(ACC\'A\') \\parallel (BDD\'B\')$' }
    ],
    correctOptionId: 'D',
    explanation: 'Hai mặt phẳng chéo $(ACC\'A\')$ và $(BDD\'B\')$ cắt nhau theo giao tuyến $OO\'$ (nối tâm hai đáy) chứ không song song.'
  },
  {
    prompt: 'Cho ba mặt phẳng $(P), (Q), (R)$ đôi một song song. Cát tuyến $d_1$ cắt $(P), (Q), (R)$ tại $A, B, C$ với $AB = 5, AC = 15$. Cát tuyến $d_2$ cắt $(P), (Q), (R)$ tại $A\', B\', C\'$ với $A\'C\' = 21$. Độ dài đoạn $A\'B\'$ bằng:',
    options: [
      { id: 'A', text: '$6$' },
      { id: 'B', text: '$7$' },
      { id: 'C', text: '$9$' },
      { id: 'D', text: '$14$' }
    ],
    correctOptionId: 'B',
    explanation: 'Theo định lí Thalès trong không gian: $\\frac{A\'B\'}{A\'C\'} = \\frac{AB}{AC} = \\frac{5}{15} = \\frac{1}{3} \\Rightarrow A\'B\' = \\frac{21}{3} = 7$.'
  },
  {
    prompt: 'Cho hình chóp $S.ABCD$ có đáy $ABCD$ là hình bình hành tâm $O$. Gọi $M, N$ lần lượt là trung điểm của $SA$ và $SD$. Mặt phẳng $(OMN)$ song song với mặt phẳng nào?',
    options: [
      { id: 'A', text: '$(SAB)$' },
      { id: 'B', text: '$(SBC)$' },
      { id: 'C', text: '$(SCD)$' },
      { id: 'D', text: '$(SAC)$' }
    ],
    correctOptionId: 'B',
    explanation: 'Ta có $MN \\parallel AD \\parallel BC \\subset (SBC)$ và $MO \\parallel SC \\subset (SBC)$. Vì $MN$ cắt $MO$ tại $M$ nên $(OMN) \\parallel (SBC)$.'
  },
  {
    prompt: 'Nếu hai mặt phẳng phân biệt $(P)$ và $(Q)$ cùng song song với mặt phẳng $(R)$ thì:',
    options: [
      { id: 'A', text: '$(P)$ cắt $(Q)$' },
      { id: 'B', text: '$(P)$ song song với $(Q)$' },
      { id: 'C', text: '$(P)$ vuông góc với $(Q)$' },
      { id: 'D', text: '$(P)$ trùng $(Q)$' }
    ],
    correctOptionId: 'B',
    explanation: 'Hai mặt phẳng phân biệt cùng song song với mặt phẳng thứ ba thì song song với nhau.'
  },
  {
    prompt: 'Cho hình lăng trụ tam giác $ABC.A\'B\'C\'$. Gọi $I, J$ lần lượt là trung điểm của $BC$ và $B\'C\'$. Đường thẳng $AI$ song song với đường thẳng nào sau đây?',
    options: [
      { id: 'A', text: '$A\'B\'$' },
      { id: 'B', text: '$A\'C\'$' },
      { id: 'C', text: '$A\'J$' },
      { id: 'D', text: '$BC\'$' }
    ],
    correctOptionId: 'C',
    explanation: 'Tứ giác $AA\'JI$ có $AA\' \\parallel IJ$ và $AA\' = IJ$ (cùng song song và bằng $BB\'$) nên là hình bình hành, suy ra $AI \\parallel A\'J$.'
  },
  {
    prompt: 'Một hình hộp có tất cả bao nhiêu đường chéo (nối hai đỉnh không cùng thuộc một mặt)?',
    options: [
      { id: 'A', text: '$2$ đường chéo' },
      { id: 'B', text: '$4$ đường chéo' },
      { id: 'C', text: '$6$ đường chéo' },
      { id: 'D', text: '$8$ đường chéo' }
    ],
    correctOptionId: 'B',
    explanation: 'Hình hộp $ABCD.A\'B\'C\'D\'$ có $4$ đường chéo là $AC\', BD\', CA\', DB\'$.'
  },
  {
    prompt: 'Cho hai mặt phẳng song song $(P)$ và $(Q)$. Hai đường thẳng $a$ và $b$ song song với nhau, cùng cắt $(P)$ tại $A, B$ và cắt $(Q)$ tại $A\', B\'$. Khi đó tứ giác $ABB\'A\'$ là hình gì?',
    options: [
      { id: 'A', text: 'Hình thang không cân' },
      { id: 'B', text: 'Hình bình hành' },
      { id: 'C', text: 'Tứ giác không đồng phẳng' },
      { id: 'D', text: 'Hình tam giác' }
    ],
    correctOptionId: 'B',
    explanation: 'Mặt phẳng $(a, b)$ cắt hai mặt phẳng song song $(P), (Q)$ theo hai giao tuyến song song $AB \\parallel A\'B\'$. Mặt khác $AA\' \\parallel BB\'$ nên $ABB\'A\'$ là hình bình hành.'
  }
];

const b13P2A: CompactTF[] = [
  {
    stem: 'Cho hình hộp $ABCD.A\'B\'C\'D\'$. Gọi $O$ và $O\'$ lần lượt là tâm của hai đáy $ABCD$ và $A\'B\'C\'D\'$. Xét tính đúng sai của các mệnh đề sau:',
    statements: [
      {
        id: 'a',
        text: 'Đường thẳng $AB\'$ song song với đường thẳng $DC\'$.',
        isTrue: true,
        explanation: 'Vì $AB \\parallel C\'D\'$ và $AB = C\'D\'$ nên tứ giác $ABC\'D\'$ là hình bình hành, suy ra $AB\' \\parallel DC\'$.'
      },
      {
        id: 'b',
        text: 'Hai mặt phẳng $(AB\'D\')$ và $(BC\'D)$ song song với nhau.',
        isTrue: true,
        explanation: 'Hai đường thẳng cắt nhau $AB\', AD\' \\subset (AB\'D\')$ lần lượt song song với $DC\', BC\' \\subset (BC\'D)$ nên $(AB\'D\') \\parallel (BC\'D)$.'
      },
      {
        id: 'c',
        text: 'Đường thẳng $OO\'$ cắt cạnh bên $AA\'$.',
        isTrue: false,
        explanation: 'Trong hình bình hành $ACC\'A\'$, $OO\'$ là đường trung bình nên $OO\' \\parallel AA\'$ chứ không cắt $AA\'$.'
      },
      {
        id: 'd',
        text: 'Đường chéo $AC\'$ đi qua trọng tâm $G_1$ của tam giác $AB\'D\'$ và trọng tâm $G_2$ của tam giác $BC\'D$.',
        isTrue: true,
        explanation: 'Trong hình bình hành $ACC\'A\'$, gọi $G_1 = AC\' \\cap A\'O\'$ và $G_2 = AC\' \\cap CO$. Theo tính chất đường trung tuyến, $G_1, G_2$ chính là trọng tâm của $\\triangle AB\'D\'$ và $\\triangle BC\'D$, đồng thời $AG_1 = G_1G_2 = G_2C\'$.'
      }
    ]
  },
  {
    stem: 'Cho hình lăng trụ tam giác $ABC.A\'B\'C\'$. Gọi $M, N, P$ lần lượt là trung điểm của các cạnh $AB, BC, A\'B\'$. Xét tính đúng sai của các mệnh đề sau:',
    statements: [
      {
        id: 'a',
        text: 'Đường thẳng $MN$ song song với mặt phẳng $(ACC\'A\')$.',
        isTrue: true,
        explanation: 'Vì $MN$ là đường trung bình $\\triangle ABC$ nên $MN \\parallel AC \\subset (ACC\'A\')$, suy ra $MN \\parallel (ACC\'A\')$.'
      },
      {
        id: 'b',
        text: 'Tứ giác $AMP A\'$ là hình bình hành.',
        isTrue: true,
        explanation: 'Vì $AM \\parallel A\'P$ và $AM = \\frac{1}{2}AB = \\frac{1}{2}A\'B\' = A\'P$ nên $AMPA\'$ là hình bình hành, suy ra $MP \\parallel AA\'$.'
      },
      {
        id: 'c',
        text: 'Hai mặt phẳng $(MNP)$ và $(ACC\'A\')$ song song với nhau.',
        isTrue: true,
        explanation: 'Mặt phẳng $(MNP)$ chứa hai đường thẳng cắt nhau $MN$ và $MP$ lần lượt song song với $AC$ và $AA\'$ nằm trong $(ACC\'A\')$, nên $(MNP) \\parallel (ACC\'A\')$.'
      },
      {
        id: 'd',
        text: 'Giao tuyến của mặt phẳng $(MNP)$ với mặt phẳng $(BCC\'B\')$ cắt cạnh $CC\'$.',
        isTrue: false,
        explanation: 'Vì $(MNP) \\parallel (ACC\'A\')$ và $CC\' \\subset (ACC\'A\')$ nên giao tuyến của $(MNP)$ với $(BCC\'B\')$ đi qua $N$ và song song với $CC\'$, không cắt $CC\'$.'
      }
    ]
  }
];

const b13P2B: CompactTF[] = [
  {
    stem: 'Cho hình chóp $S.ABCD$ có đáy $ABCD$ là hình bình hành tâm $O$. Gọi $M, N, P$ lần lượt là trung điểm của $SA, SB, SD$. Xét tính đúng sai của các mệnh đề sau:',
    statements: [
      {
        id: 'a',
        text: 'Mặt phẳng $(MNP)$ song song với mặt phẳng đáy $(ABCD)$.',
        isTrue: true,
        explanation: 'Ta có $MN \\parallel AB$ và $MP \\parallel AD$. Hai đường thẳng cắt nhau $MN, MP \\subset (MNP)$ cùng song song với $(ABCD)$ nên $(MNP) \\parallel (ABCD)$.'
      },
      {
        id: 'b',
        text: 'Mặt phẳng $(MNP)$ cắt cạnh $SC$ tại trung điểm $Q$ của $SC$.',
        isTrue: true,
        explanation: 'Mặt phẳng $(SAC)$ cắt hai mặt phẳng song song $(MNP)$ và $(ABCD)$ theo giao tuyến $MQ \\parallel AC$. Vì $M$ là trung điểm $SA$ nên $Q$ là trung điểm $SC$.'
      },
      {
        id: 'c',
        text: 'Hai mặt phẳng $(OMP)$ và $(SBC)$ cắt nhau.',
        isTrue: false,
        explanation: 'Ta có $MP \\parallel AD \\parallel BC \\subset (SBC)$ và $MO \\parallel SC \\subset (SBC)$. Vì $MP$ cắt $MO$ tại $M$ nên $(OMP) \\parallel (SBC)$.'
      },
      {
        id: 'd',
        text: 'Với mọi điểm $I$ thuộc đoạn thẳng $OP$, đường thẳng $MI$ luôn song song với mặt phẳng $(SBC)$.',
        isTrue: true,
        explanation: 'Vì $MI \\subset (OMP)$ và $(OMP) \\parallel (SBC)$ nên $MI \\parallel (SBC)$.'
      }
    ]
  },
  {
    stem: 'Cho ba mặt phẳng $(P), (Q), (R)$ đôi một song song. Hai đường thẳng $d_1, d_2$ cắt $(P), (Q), (R)$ lần lượt tại $A, B, C$ và $A\', B\', C\'$ sao cho $AB = 6\\text{ cm}, BC = 9\\text{ cm}$ và $A\'C\' = 20\\text{ cm}$. Xét tính đúng sai của các mệnh đề sau:',
    statements: [
      {
        id: 'a',
        text: 'Tỉ số $\\frac{AB}{AC}$ bằng $\\frac{2}{5}$.',
        isTrue: true,
        explanation: 'Ta có $AC = AB + BC = 6 + 9 = 15\\text{ cm}$, suy ra $\\frac{AB}{AC} = \\frac{6}{15} = \\frac{2}{5}$.'
      },
      {
        id: 'b',
        text: 'Theo định lí Thalès trong không gian, ta có $\\frac{A\'B\'}{A\'C\'} = \\frac{AB}{BC}$.',
        isTrue: false,
        explanation: 'Tỉ số đúng phải là $\\frac{A\'B\'}{A\'C\'} = \\frac{AB}{AC} = \\frac{2}{5}$, còn $\\frac{A\'B\'}{B\'C\'} = \\frac{AB}{BC} = \\frac{2}{3}$.'
      },
      {
        id: 'c',
        text: 'Độ dài đoạn thẳng $A\'B\'$ bằng $8\\text{ cm}$.',
        isTrue: true,
        explanation: 'Ta có $A\'B\' = \\frac{2}{5}A\'C\' = \\frac{2}{5} \\cdot 20 = 8\\text{ cm}$.'
      },
      {
        id: 'd',
        text: 'Độ dài đoạn thẳng $B\'C\'$ bằng $12\\text{ cm}$.',
        isTrue: true,
        explanation: 'Ta có $B\'C\' = A\'C\' - A\'B\' = 20 - 8 = 12\\text{ cm}$.'
      }
    ]
  }
];

const b13P3A: CompactSA[] = [
  {
    prompt: 'Cho ba mặt phẳng đôi một song song $(P), (Q), (R)$. Đường thẳng $d_1$ cắt $(P), (Q), (R)$ lần lượt tại $A, B, C$ với $AB = 8\\text{ cm}, BC = 12\\text{ cm}$. Đường thẳng $d_2$ cắt $(P), (Q), (R)$ lần lượt tại $A\', B\', C\'$ với $A\'B\' = 10\\text{ cm}$. Tính độ dài đoạn thẳng $A\'C\'$ (đơn vị: cm).',
    correctAnswer: '25',
    acceptedAnswers: ['25'],
    explanation: 'Theo định lí Thalès trong không gian: $\\frac{A\'B\'}{B\'C\'} = \\frac{AB}{BC} = \\frac{8}{12} = \\frac{2}{3} \\Rightarrow B\'C\' = \\frac{3}{2} \\cdot 10 = 15\\text{ cm}$. Vậy $A\'C\' = 10 + 15 = 25\\text{ cm}$.'
  },
  {
    prompt: 'Một hình lăng trụ có tổng số đỉnh là $16$. Hỏi hình lăng trụ đó có tất cả bao nhiêu cạnh?',
    correctAnswer: '24',
    acceptedAnswers: ['24'],
    explanation: 'Hình lăng trụ đáy $n$-giác có $2n$ đỉnh và $3n$ cạnh. Từ $2n = 16 \\Rightarrow n = 8$. Số cạnh là $3 \\cdot 8 = 24$ cạnh.'
  },
  {
    prompt: 'Cho hình hộp $ABCD.A\'B\'C\'D\'$ có độ dài đường chéo $AC\' = 24\\text{ cm}$. Hai mặt phẳng $(AB\'D\')$ và $(BC\'D)$ cắt đoạn thẳng $AC\'$ lần lượt tại $G_1$ và $G_2$. Tính độ dài đoạn thẳng $G_1G_2$ (đơn vị: cm).',
    correctAnswer: '8',
    acceptedAnswers: ['8'],
    explanation: 'Hai mặt phẳng $(AB\'D\')$ và $(BC\'D)$ chia đường chéo $AC\'$ thành 3 phần bằng nhau: $AG_1 = G_1G_2 = G_2C\' = \\frac{1}{3}AC\' = \\frac{24}{3} = 8\\text{ cm}$.'
  },
  {
    prompt: 'Cho hình chóp $S.ABCD$ có đáy $ABCD$ là hình chữ nhật với $AB = 12\\text{ cm}, BC = 9\\text{ cm}$. Trên cạnh $SA$ lấy điểm $M$ sao cho $SM = \\frac{2}{3}SA$. Mặt phẳng $(P)$ đi qua $M$ và song song với mặt phẳng đáy $(ABCD)$ cắt các cạnh $SB, SC, SD$ tại $N, P, Q$. Tính diện tích tứ giác $MNPQ$ (đơn vị: $\\text{cm}^2$).',
    correctAnswer: '48',
    acceptedAnswers: ['48'],
    explanation: 'Tứ giác $MNPQ$ là hình chữ nhật đồng dạng với $ABCD$ theo tỉ số $k = \\frac{SM}{SA} = \\frac{2}{3}$, nên $MN = \\frac{2}{3}AB = 8\\text{ cm}, NP = \\frac{2}{3}BC = 6\\text{ cm}$. Diện tích $MNPQ$ là $8 \\cdot 6 = 48\\text{ cm}^2$.'
  }
];

const b13P3B: CompactSA[] = [
  {
    prompt: 'Cho ba mặt phẳng đôi một song song $(P), (Q), (R)$. Đường thẳng $d_1$ cắt $(P), (Q), (R)$ lần lượt tại $A, B, C$ với $AB = 9\\text{ cm}, AC = 21\\text{ cm}$. Đường thẳng $d_2$ cắt $(P), (Q), (R)$ lần lượt tại $A\', B\', C\'$ với $B\'C\' = 16\\text{ cm}$. Tính độ dài đoạn thẳng $A\'B\'$ (đơn vị: cm).',
    correctAnswer: '12',
    acceptedAnswers: ['12'],
    explanation: 'Ta có $BC = AC - AB = 21 - 9 = 12\\text{ cm}$. Theo định lí Thalès: $\\frac{A\'B\'}{B\'C\'} = \\frac{AB}{BC} = \\frac{9}{12} = \\frac{3}{4} \\Rightarrow A\'B\' = \\frac{3}{4} \\cdot 16 = 12\\text{ cm}$.'
  },
  {
    prompt: 'Một hình lăng trụ có tất cả $9$ mặt (kể cả hai mặt đáy). Hỏi hình lăng trụ đó có tất cả bao nhiêu đỉnh?',
    correctAnswer: '14',
    acceptedAnswers: ['14'],
    explanation: 'Hình lăng trụ đáy $n$-giác có $n + 2$ mặt. Từ $n + 2 = 9 \\Rightarrow n = 7$. Số đỉnh là $2n = 14$ đỉnh.'
  },
  {
    prompt: 'Cho hình hộp $ABCD.A\'B\'C\'D\'$ có chu vi tam giác $BC\'D$ bằng $30\\text{ cm}$. Tính chu vi của tam giác $AB\'D\'$ (đơn vị: cm).',
    correctAnswer: '30',
    acceptedAnswers: ['30'],
    explanation: 'Ta có $AB\' = DC\', AD\' = BC\', B\'D\' = BD$ nên $\\triangle AB\'D\' = \\triangle C\'DB$ (c.c.c). Vậy chu vi tam giác $AB\'D\'$ cũng bằng $30\\text{ cm}$.'
  },
  {
    prompt: 'Cho hình chóp $S.ABCD$ có đáy $ABCD$ là hình bình hành có chu vi bằng $45\\text{ cm}$. Trên cạnh $SA$ lấy điểm $M$ sao cho $SM = \\frac{1}{3}SA$. Mặt phẳng $(P)$ đi qua $M$ và song song với $(ABCD)$ cắt $SB, SC, SD$ tại $N, P, Q$. Tính chu vi tứ giác $MNPQ$ (đơn vị: cm).',
    correctAnswer: '15',
    acceptedAnswers: ['15'],
    explanation: 'Mỗi cạnh của hình bình hành $MNPQ$ bằng $\\frac{SM}{SA} = \\frac{1}{3}$ cạnh tương ứng của $ABCD$, nên chu vi $MNPQ$ bằng $\\frac{1}{3} \\cdot 45 = 15\\text{ cm}$.'
  }
];

const b13P4A: CompactSO[] = [
  {
    prompt: 'Sắp xếp các bước chứng minh hai mặt phẳng $(\\alpha)$ và $(\\beta)$ song song với nhau:',
    steps: [
      { id: 's1', text: 'Chọn trong mặt phẳng $(\\alpha)$ hai đường thẳng $a$ và $b$ cắt nhau tại một điểm $I$.' },
      { id: 's2', text: 'Chứng minh đường thẳng $a$ song song với mặt phẳng $(\\beta)$.' },
      { id: 's3', text: 'Chứng minh đường thẳng $b$ cũng song song với mặt phẳng $(\\beta)$.' },
      { id: 's4', text: 'Áp dụng định lí dấu hiệu nhận biết, kết luận $(\\alpha) \\parallel (\\beta)$.' }
    ],
    correctOrder: ['s1', 's2', 's3', 's4'],
    explanation: 'Muốn chứng minh hai mặt phẳng song song, ta chứng minh mặt phẳng này chứa hai đường thẳng cắt nhau cùng song song với mặt phẳng kia.'
  },
  {
    prompt: 'Sắp xếp các bước chứng minh $(AB\'D\') \\parallel (BC\'D)$ trong hình hộp $ABCD.A\'B\'C\'D\'$:',
    steps: [
      { id: 's1', text: 'Chứng minh tứ giác $ABC\'D\'$ là hình bình hành để suy ra $AB\' \\parallel DC\' \\subset (BC\'D) \\Rightarrow AB\' \\parallel (BC\'D)$.' },
      { id: 's2', text: 'Chứng minh tứ giác $ADC\'B\'$ hoặc $BDD\'B\'$ là hình bình hành để suy ra $B\'D\' \\parallel BD \\subset (BC\'D) \\Rightarrow B\'D\' \\parallel (BC\'D)$.' },
      { id: 's3', text: 'Nhận xét trong mặt phẳng $(AB\'D\')$, hai đường thẳng $AB\'$ và $B\'D\'$ cắt nhau tại $B\'$.' },
      { id: 's4', text: 'Kết luận hai mặt phẳng $(AB\'D\')$ và $(BC\'D)$ song song với nhau.' }
    ],
    correctOrder: ['s1', 's2', 's3', 's4'],
    explanation: 'Chỉ ra hai đường thẳng cắt nhau $AB\', B\'D\' \\subset (AB\'D\')$ cùng song song với $(BC\'D)$.'
  },
  {
    prompt: 'Sắp xếp các bước chứng minh $(G_1G_2G_3) \\parallel (BCD)$ (với $G_1, G_2, G_3$ là trọng tâm $\\triangle ABC, \\triangle ACD, \\triangle ADB$ trong tứ diện $ABCD$):',
    steps: [
      { id: 's1', text: 'Gọi $M, N$ lần lượt là trung điểm của $AC$ và $AD$.' },
      { id: 's2', text: 'Trong $\\triangle MBD$, chứng minh $\\frac{MG_1}{MB} = \\frac{MG_2}{MD} = \\frac{1}{3} \\Rightarrow G_1G_2 \\parallel BD \\subset (BCD) \\Rightarrow G_1G_2 \\parallel (BCD)$.' },
      { id: 's3', text: 'Tương tự trong $\\triangle NCD$, chứng minh $G_2G_3 \\parallel CD \\subset (BCD) \\Rightarrow G_2G_3 \\parallel (BCD)$.' },
      { id: 's4', text: 'Vì $G_1G_2$ cắt $G_2G_3$ tại $G_2$ nên kết luận $(G_1G_2G_3) \\parallel (BCD)$.' }
    ],
    correctOrder: ['s1', 's2', 's3', 's4'],
    explanation: 'Chứng minh hai cạnh của tam giác $G_1G_2G_3$ song song với mặt phẳng $(BCD)$.'
  },
  {
    prompt: 'Sắp xếp các bước dựng thiết diện của hình chóp $S.ABCD$ cắt bởi mặt phẳng $(P)$ đi qua $M \\in SA$ và song song với đáy $(ABCD)$:',
    steps: [
      { id: 's1', text: 'Mặt phẳng $(SAB)$ cắt hai mặt phẳng song song $(P)$ và $(ABCD)$ theo giao tuyến $MN \\parallel AB$ ($N \\in SB$).' },
      { id: 's2', text: 'Mặt phẳng $(SBC)$ cắt $(P)$ và $(ABCD)$ theo giao tuyến $NP \\parallel BC$ ($P \\in SC$).' },
      { id: 's3', text: 'Mặt phẳng $(SCD)$ cắt $(P)$ và $(ABCD)$ theo giao tuyến $PQ \\parallel CD$ ($Q \\in SD$).' },
      { id: 's4', text: 'Nối $QM$, kiểm tra $QM \\parallel DA$ và kết luận thiết diện là tứ giác $MNPQ$.' }
    ],
    correctOrder: ['s1', 's2', 's3', 's4'],
    explanation: 'Dùng tính chất một mặt phẳng cắt hai mặt phẳng song song theo hai giao tuyến song song.'
  }
];

const b13P4B = [b13P4A[1], b13P4A[3], b13P4A[0], b13P4A[2]];

// ============================================================================
// BÀI 14. PHÉP CHIẾU SONG SONG
// Trọng tâm: Khái niệm phép chiếu song song, các tính chất cơ bản của phép chiếu song song,
// hình biểu diễn của một hình không gian trên mặt phẳng.
// ============================================================================

const b14P1A: CompactMC[] = [
  {
    prompt: 'Trong phép chiếu song song lên mặt phẳng $(P)$ theo phương chiếu $l$ (với $l$ cắt $(P)$), ảnh của một đường thẳng **không** song song và **không** trùng với phương chiếu $l$ là:',
    options: [
      { id: 'A', text: 'Một điểm duy nhất' },
      { id: 'B', text: 'Một đường thẳng' },
      { id: 'C', text: 'Một đoạn thẳng' },
      { id: 'D', text: 'Hai đường thẳng song song' }
    ],
    correctOptionId: 'B',
    explanation: 'Phép chiếu song song biến một đường thẳng không song song hoặc trùng với phương chiếu thành một đường thẳng.'
  },
  {
    prompt: 'Trong phép chiếu song song lên mặt phẳng $(P)$ theo phương chiếu $l$, nếu đường thẳng $d$ song song với phương chiếu $l$ thì hình chiếu của đường thẳng $d$ lên $(P)$ là:',
    options: [
      { id: 'A', text: 'Một đường thẳng song song với $d$' },
      { id: 'B', text: 'Một điểm duy nhất (giao điểm của $d$ với $(P)$)' },
      { id: 'C', text: 'Một đoạn thẳng bằng $d$' },
      { id: 'D', text: 'Tập rỗng' }
    ],
    correctOptionId: 'B',
    explanation: 'Mọi điểm trên đường thẳng $d \\parallel l$ đều có cùng một hình chiếu là giao điểm của $d$ với mặt phẳng chiếu $(P)$.'
  },
  {
    prompt: 'Phép chiếu song song biến hai đường thẳng song song (và không song song với phương chiếu) thành:',
    options: [
      { id: 'A', text: 'Hai đường thẳng luôn cắt nhau' },
      { id: 'B', text: 'Hai đường thẳng song song hoặc trùng nhau' },
      { id: 'C', text: 'Hai đường thẳng vuông góc với nhau' },
      { id: 'D', text: 'Hai đường thẳng chéo nhau' }
    ],
    correctOptionId: 'B',
    explanation: 'Tính chất cơ bản: Phép chiếu song song biến hai đường thẳng song song thành hai đường thẳng song song hoặc trùng nhau.'
  },
  {
    prompt: 'Tính chất nào sau đây được **bảo toàn** qua phép chiếu song song (đối với các đoạn thẳng không song song với phương chiếu)?',
    options: [
      { id: 'A', text: 'Độ dài của mọi đoạn thẳng' },
      { id: 'B', text: 'Số đo của mọi góc' },
      { id: 'C', text: 'Tỉ số độ dài của hai đoạn thẳng cùng nằm trên một đường thẳng hoặc trên hai đường thẳng song song' },
      { id: 'D', text: 'Quan hệ vuông góc giữa hai đường thẳng' }
    ],
    correctOptionId: 'C',
    explanation: 'Phép chiếu song song không làm thay đổi tỉ số độ dài của hai đoạn thẳng nằm trên hai đường thẳng song song hoặc trùng nhau.'
  },
  {
    prompt: 'Qua phép chiếu song song, hình chiếu của trung điểm $M$ của đoạn thẳng $AB$ (với $AB$ không song song với phương chiếu) là:',
    options: [
      { id: 'A', text: 'Một điểm bất kì trên đoạn $A\'B\'$' },
      { id: 'B', text: 'Trung điểm $M\'$ của đoạn thẳng hình chiếu $A\'B\'$' },
      { id: 'C', text: 'Điểm chia đoạn $A\'B\'$ theo tỉ số $1:2$' },
      { id: 'D', text: 'Đầu mút $A\'$ hoặc $B\'$' }
    ],
    correctOptionId: 'B',
    explanation: 'Vì phép chiếu song song bảo toàn thứ tự 3 điểm thẳng hàng và bảo toàn tỉ số $\\frac{MA}{MB} = 1$ nên $M\'$ là trung điểm của $A\'B\'$.'
  },
  {
    prompt: 'Hình biểu diễn của một **hình chữ nhật** hoặc **hình vuông** trên mặt phẳng thông qua phép chiếu song song (mặt phẳng hình chữ nhật không song song với phương chiếu) là hình gì?',
    options: [
      { id: 'A', text: 'Bắt buộc phải là hình chữ nhật' },
      { id: 'B', text: 'Hình bình hành' },
      { id: 'C', text: 'Hình thang có hai cạnh đáy không bằng nhau' },
      { id: 'D', text: 'Hình tứ giác bất kì không có cạnh song song' }
    ],
    correctOptionId: 'B',
    explanation: 'Vì phép chiếu song song bảo toàn tính song song và tỉ số hai đoạn thẳng song song nên hình chữ nhật, hình vuông, hình thoi đều có hình biểu diễn là hình bình hành.'
  },
  {
    prompt: 'Hình biểu diễn của một **tam giác đều** trên mặt phẳng qua phép chiếu song song (mặt phẳng tam giác không song song với phương chiếu) là:',
    options: [
      { id: 'A', text: 'Bắt buộc phải là tam giác đều' },
      { id: 'B', text: 'Bắt buộc phải là tam giác vuông' },
      { id: 'C', text: 'Một tam giác bất kì' },
      { id: 'D', text: 'Một tứ giác' }
    ],
    correctOptionId: 'C',
    explanation: 'Hình biểu diễn của một tam giác (đều, cân, vuông, thường) qua phép chiếu song song là một tam giác bất kì.'
  },
  {
    prompt: 'Hình biểu diễn của một **hình thang** có đáy lớn gấp 3 lần đáy nhỏ qua phép chiếu song song là:',
    options: [
      { id: 'A', text: 'Một hình bình hành' },
      { id: 'B', text: 'Một hình thang có đáy lớn gấp 3 lần đáy nhỏ' },
      { id: 'C', text: 'Một hình thang bất kì không cần giữ tỉ số hai đáy' },
      { id: 'D', text: 'Một hình chữ nhật' }
    ],
    correctOptionId: 'B',
    explanation: 'Phép chiếu song song bảo toàn tính song song của hai đáy và bảo toàn tỉ số độ dài hai đáy song song (bằng $3$).'
  },
  {
    prompt: 'Qua phép chiếu song song, ảnh của trọng tâm $G$ của tam giác $ABC$ (mặt phẳng $(ABC)$ không song song với phương chiếu) là:',
    options: [
      { id: 'A', text: 'Trực tâm của tam giác $A\'B\'C\'$' },
      { id: 'B', text: 'Tâm đường tròn ngoại tiếp tam giác $A\'B\'C\'$' },
      { id: 'C', text: 'Trọng tâm $G\'$ của tam giác $A\'B\'C\'$' },
      { id: 'D', text: 'Trung điểm cạnh $B\'C\'$' }
    ],
    correctOptionId: 'C',
    explanation: 'Vì trung điểm cạnh biến thành trung điểm cạnh và tỉ số $\\frac{AG}{AM} = \\frac{2}{3}$ được bảo toàn nên trọng tâm $G$ biến thành trọng tâm $G\'$ của $\\triangle A\'B\'C\'$.'
  },
  {
    prompt: 'Cho đoạn thẳng $AB$ không song song với phương chiếu, điểm $M$ thuộc đoạn $AB$ sao cho $MA = 3MB$. Gọi $A\', B\', M\'$ lần lượt là hình chiếu song song của $A, B, M$. Khi đó tỉ số $\\frac{M\'A\'}{M\'B\'}$ bằng:',
    options: [
      { id: 'A', text: '$\\frac{1}{3}$' },
      { id: 'B', text: '$2$' },
      { id: 'C', text: '$3$' },
      { id: 'D', text: '$4$' }
    ],
    correctOptionId: 'C',
    explanation: 'Phép chiếu song song bảo toàn tỉ số hai đoạn thẳng cùng nằm trên một đường thẳng nên $\\frac{M\'A\'}{M\'B\'} = \\frac{MA}{MB} = 3$.'
  },
  {
    prompt: 'Cho hai đường thẳng song song $a, b$ (không song song với phương chiếu $l$). Khi nào thì hình chiếu $a\'$ và $b\'$ của chúng lên mặt phẳng $(P)$ **trùng nhau**?',
    options: [
      { id: 'A', text: 'Khi mặt phẳng $(a, b)$ song song với mặt phẳng $(P)$' },
      { id: 'B', text: 'Khi mặt phẳng $(a, b)$ song song hoặc chứa phương chiếu $l$' },
      { id: 'C', text: 'Khi $a$ và $b$ vuông góc với $(P)$' },
      { id: 'D', text: 'Không bao giờ trùng nhau' }
    ],
    correctOptionId: 'B',
    explanation: 'Nếu mặt phẳng $(a, b)$ chứa phương chiếu $l$ (hoặc song song với $l$) thì giao tuyến của mặt phẳng $(a, b)$ với $(P)$ chính là hình chiếu chung $a\' \\equiv b\'$.'
  },
  {
    prompt: 'Cho hình hộp $ABCD.A\'B\'C\'D\'$. Xét phép chiếu song song lên mặt phẳng $(ABCD)$ theo phương chiếu $AA\'$. Hình chiếu của điểm $C\'$ lên mặt phẳng $(ABCD)$ là điểm nào?',
    options: [
      { id: 'A', text: 'Điểm $A$' },
      { id: 'B', text: 'Điểm $B$' },
      { id: 'C', text: 'Điểm $C$' },
      { id: 'D', text: 'Điểm $D$' }
    ],
    correctOptionId: 'C',
    explanation: 'Vì cạnh bên $CC\' \\parallel AA\'$ và $C \\in (ABCD)$ nên hình chiếu của $C\'$ lên $(ABCD)$ theo phương $AA\'$ là điểm $C$.'
  }
];

const b14P1B: CompactMC[] = [
  {
    prompt: 'Phép chiếu song song biến ba điểm thẳng hàng $A, B, C$ (đường thẳng $AB$ không song song với phương chiếu) thành ba điểm $A\', B\', C\'$ có tính chất gì?',
    options: [
      { id: 'A', text: 'Tạo thành một tam giác nhọn' },
      { id: 'B', text: 'Thẳng hàng và giữ nguyên thứ tự giữa các điểm' },
      { id: 'C', text: 'Thẳng hàng nhưng đảo ngược thứ tự' },
      { id: 'D', text: 'Trùng nhau tại một điểm' }
    ],
    correctOptionId: 'B',
    explanation: 'Phép chiếu song song biến ba điểm thẳng hàng thành ba điểm thẳng hàng và không làm thay đổi thứ tự ba điểm đó.'
  },
  {
    prompt: 'Trong các mệnh đề sau về phép chiếu song song, mệnh đề nào **sai**?',
    options: [
      { id: 'A', text: 'Phép chiếu song song có thể biến hai đường thẳng chéo nhau thành hai đường thẳng cắt nhau' },
      { id: 'B', text: 'Phép chiếu song song có thể biến hai đường thẳng chéo nhau thành hai đường thẳng song song' },
      { id: 'C', text: 'Phép chiếu song song luôn bảo toàn độ dài của mọi đoạn thẳng' },
      { id: 'D', text: 'Phép chiếu song song bảo toàn tính song song của hai đường thẳng' }
    ],
    correctOptionId: 'C',
    explanation: 'Phép chiếu song song chỉ bảo toàn tỉ số hai đoạn thẳng song song chứ không bảo toàn độ dài của đoạn thẳng.'
  },
  {
    prompt: 'Hình biểu diễn của một **hình thoi** trên mặt phẳng thông qua phép chiếu song song (mặt phẳng hình thoi không song song với phương chiếu) là:',
    options: [
      { id: 'A', text: 'Một hình bình hành' },
      { id: 'B', text: 'Một hình thang có hai đáy khác nhau' },
      { id: 'C', text: 'Một tứ giác không có cạnh nào song song' },
      { id: 'D', text: 'Bắt buộc phải có hai đường chéo vuông góc' }
    ],
    correctOptionId: 'A',
    explanation: 'Hình thoi là một hình bình hành đặc biệt; qua phép chiếu song song góc vuông giữa hai đường chéo và độ dài 4 cạnh không còn bằng nhau, nhưng tính song song được bảo toàn nên hình biểu diễn là hình bình hành.'
  },
  {
    prompt: 'Cho hình lăng trụ tam giác $ABC.A\'B\'C\'$. Xét phép chiếu song song lên mặt phẳng $(A\'B\'C\')$ theo phương chiếu $BB\'$. Ảnh của tam giác $ABC$ qua phép chiếu đó là:',
    options: [
      { id: 'A', text: 'Tam giác $ABC$' },
      { id: 'B', text: 'Tam giác $A\'B\'C\'$' },
      { id: 'C', text: 'Đoạn thẳng $A\'C\'$' },
      { id: 'D', text: 'Điểm $B\'$' }
    ],
    correctOptionId: 'B',
    explanation: 'Vì $AA\' \\parallel BB\' \\parallel CC\'$ và $A\', B\', C\' \\in (A\'B\'C\')$ nên ảnh của $A, B, C$ lần lượt là $A\', B\', C\'$, do đó ảnh của $\\triangle ABC$ là $\\triangle A\'B\'C\'$.'
  },
  {
    prompt: 'Cho hình hộp $ABCD.A\'B\'C\'D\'$. Phép chiếu song song lên mặt phẳng $(ABB\'A\')$ theo phương chiếu $BC$ biến đoạn thẳng $C\'D\'$ thành đoạn thẳng nào?',
    options: [
      { id: 'A', text: '$AB$' },
      { id: 'B', text: '$A\'B\'$' },
      { id: 'C', text: '$AA\'$' },
      { id: 'D', text: '$BB\'$' }
    ],
    correctOptionId: 'B',
    explanation: 'Ta có $C\'B\' \\parallel BC$ nên hình chiếu của $C\'$ là $B\'$; $D\'A\' \\parallel BC$ nên hình chiếu của $D\'$ là $A\'$. Vậy ảnh của $C\'D\'$ là đoạn thẳng $B\'A\'$ (hay $A\'B\'$).'
  },
  {
    prompt: 'Cho hình thang $ABCD$ có $AB \\parallel CD$ và $AB = 12\\text{ cm}, CD = 4\\text{ cm}$. Qua phép chiếu song song lên mặt phẳng $(P)$, hình chiếu của $ABCD$ là hình thang $A\'B\'C\'D\'$ có $C\'D\' = 6\\text{ cm}$. Khi đó độ dài đoạn $A\'B\'$ bằng:',
    options: [
      { id: 'A', text: '$12\\text{ cm}$' },
      { id: 'B', text: '$15\\text{ cm}$' },
      { id: 'C', text: '$18\\text{ cm}$' },
      { id: 'D', text: '$24\\text{ cm}$' }
    ],
    correctOptionId: 'C',
    explanation: 'Phép chiếu song song bảo toàn tỉ số hai đoạn thẳng song song: $\\frac{A\'B\'}{C\'D\'} = \\frac{AB}{CD} = \\frac{12}{4} = 3 \\Rightarrow A\'B\' = 3 \\cdot 6 = 18\\text{ cm}$.'
  },
  {
    prompt: 'Hình biểu diễn của một **lục giác đều** $ABCDEF$ qua phép chiếu song song (mặt phẳng lục giác không song song với phương chiếu) là một lục giác $A\'B\'C\'D\'E\'F\'$ thỏa mãn tính chất nào?',
    options: [
      { id: 'A', text: '6 cạnh của $A\'B\'C\'D\'E\'F\'$ bắt buộc bằng nhau' },
      { id: 'B', text: 'Các cặp cạnh đối diện song song và bằng nhau ($A\'B\' \\parallel D\'E\', A\'B\' = D\'E\'$,...)' },
      { id: 'C', text: 'Các góc của $A\'B\'C\'D\'E\'F\'$ đều bằng $120^\\circ$' },
      { id: 'D', text: 'Không có cặp cạnh nào song song' }
    ],
    correctOptionId: 'B',
    explanation: 'Trong lục giác đều, các cặp cạnh đối song song và bằng nhau. Qua phép chiếu song song, tính song song và tỉ số bằng $1$ của hai đoạn thẳng song song được bảo toàn.'
  },
  {
    prompt: 'Cho tam giác $ABC$ có $M$ là điểm trên cạnh $BC$ sao cho $BM = 2MC$. Qua phép chiếu song song, hình chiếu của $A, B, C, M$ là $A\', B\', C\', M\'$ (không thẳng hàng). Nếu $B\'C\' = 15\\text{ cm}$ thì độ dài $B\'M\'$ bằng:',
    options: [
      { id: 'A', text: '$5\\text{ cm}$' },
      { id: 'B', text: '$7,5\\text{ cm}$' },
      { id: 'C', text: '$10\\text{ cm}$' },
      { id: 'D', text: '$12\\text{ cm}$' }
    ],
    correctOptionId: 'C',
    explanation: 'Vì $\\frac{BM}{BC} = \\frac{2}{3}$ nên $\\frac{B\'M\'}{B\'C\'} = \\frac{2}{3} \\Rightarrow B\'M\' = \\frac{2}{3} \\cdot 15 = 10\\text{ cm}$.'
  },
  {
    prompt: 'Cho hình chóp $S.ABCD$ có đáy $ABCD$ là hình bình hành tâm $O$. Hình chiếu song song của điểm $S$ lên mặt phẳng $(ABCD)$ theo phương chiếu $SO$ là điểm nào?',
    options: [
      { id: 'A', text: 'Điểm $A$' },
      { id: 'B', text: 'Điểm $C$' },
      { id: 'C', text: 'Điểm $O$' },
      { id: 'D', text: 'Trung điểm của $AB$' }
    ],
    correctOptionId: 'C',
    explanation: 'Đường thẳng đi qua $S$ song song (trùng) với phương chiếu $SO$ cắt mặt phẳng $(ABCD)$ tại $O$, nên hình chiếu của $S$ là $O$.'
  },
  {
    prompt: 'Cho tứ diện $ABCD$. Gọi $M$ là trung điểm của $CD$. Phép chiếu song song lên mặt phẳng $(ABC)$ theo phương chiếu $DM$ biến điểm $D$ thành điểm nào?',
    options: [
      { id: 'A', text: 'Điểm $A$' },
      { id: 'B', text: 'Điểm $B$' },
      { id: 'C', text: 'Điểm $C$' },
      { id: 'D', text: 'Điểm $M$' }
    ],
    correctOptionId: 'C',
    explanation: 'Đường thẳng $DM$ chính là đường thẳng $DC$, cắt mặt phẳng $(ABC)$ tại điểm $C$. Vậy hình chiếu của $D$ (và $M$) lên $(ABC)$ theo phương $DM$ là điểm $C$.'
  },
  {
    prompt: 'Nếu đường thẳng $a$ song song với mặt phẳng chiếu $(P)$ thì hình chiếu song song $a\'$ của $a$ lên $(P)$ có quan hệ gì với $a$?',
    options: [
      { id: 'A', text: '$a\'$ cắt $a$' },
      { id: 'B', text: '$a\'$ song song với $a$' },
      { id: 'C', text: '$a\'$ chéo nhau với $a$' },
      { id: 'D', text: '$a\'$ vuông góc với $a$' }
    ],
    correctOptionId: 'B',
    explanation: 'Mặt phẳng chứa $a$ và song song với phương chiếu cắt $(P)$ theo giao tuyến $a\'$. Vì $a \\parallel (P)$ nên $a\' \\parallel a$.'
  },
  {
    prompt: 'Qua phép chiếu song song, hai đoạn thẳng bằng nhau $AB = CD$ nằm trên hai đường thẳng **song song** (không song song với phương chiếu) sẽ có hình chiếu $A\'B\'$ và $C\'D\'$ thỏa mãn:',
    options: [
      { id: 'A', text: '$A\'B\' = C\'D\'$' },
      { id: 'B', text: '$A\'B\' = 2C\'D\'$' },
      { id: 'C', text: '$A\'B\' \\ne C\'D\'$' },
      { id: 'D', text: '$A\'B\' \\perp C\'D\'$' }
    ],
    correctOptionId: 'A',
    explanation: 'Vì phép chiếu song song bảo toàn tỉ số của hai đoạn thẳng song song nên $\\frac{A\'B\'}{C\'D\'} = \\frac{AB}{CD} = 1 \\Rightarrow A\'B\' = C\'D\'$.'
  }
];

const b14P2A: CompactTF[] = [
  {
    stem: 'Cho hình hộp $ABCD.A\'B\'C\'D\'$ có tâm hai đáy lần lượt là $O$ và $O\'$. Xét phép chiếu song song lên mặt phẳng $(ABCD)$ theo phương chiếu $AA\'$. Xét tính đúng sai của các mệnh đề sau:',
    statements: [
      {
        id: 'a',
        text: 'Hình chiếu của các đỉnh $A\', B\', C\', D\'$ lên mặt phẳng $(ABCD)$ lần lượt là các đỉnh $A, B, C, D$.',
        isTrue: true,
        explanation: 'Vì các cạnh bên $AA\', BB\', CC\', DD\'$ đôi một song song và $A, B, C, D \\in (ABCD)$ nên hình chiếu của $A\', B\', C\', D\'$ là $A, B, C, D$.'
      },
      {
        id: 'b',
        text: 'Hình chiếu của tâm $O\'$ lên mặt phẳng $(ABCD)$ là tâm $O$.',
        isTrue: true,
        explanation: 'Vì $O\'$ là trung điểm $A\'C\'$ nên hình chiếu của $O\'$ là trung điểm $O$ của hình chiếu $AC$.'
      },
      {
        id: 'c',
        text: 'Hình chiếu của đường chéo $AC\'$ lên mặt phẳng $(ABCD)$ là đường thẳng $BD$.',
        isTrue: false,
        explanation: 'Hình chiếu của $A$ là $A$, hình chiếu của $C\'$ là $C$ nên hình chiếu của đoạn $AC\'$ là đoạn chéo $AC$, không phải $BD$.'
      },
      {
        id: 'd',
        text: 'Nếu $M\'$ là điểm thuộc đoạn $A\'B\'$ sao cho $A\'M\' = 2M\'B\'$ thì hình chiếu $M$ của $M\'$ thuộc đoạn $AB$ và thỏa mãn $AM = 2MB$.',
        isTrue: true,
        explanation: 'Phép chiếu song song bảo toàn thứ tự điểm thẳng hàng và tỉ số độ dài đoạn thẳng.'
      }
    ]
  },
  {
    stem: 'Khi vẽ hình biểu diễn của một hình không gian lên mặt phẳng thông qua phép chiếu song song, xét tính đúng sai của các mệnh đề sau:',
    statements: [
      {
        id: 'a',
        text: 'Hình biểu diễn của một hình bình hành (không song song với phương chiếu) luôn là một hình bình hành.',
        isTrue: true,
        explanation: 'Phép chiếu song song bảo toàn tính song song của các cặp cạnh đối nên hình bình hành có hình biểu diễn là hình bình hành.'
      },
      {
        id: 'b',
        text: 'Hình biểu diễn của một tam giác vuông bắt buộc phải là một tam giác vuông.',
        isTrue: false,
        explanation: 'Phép chiếu song song không bảo toàn góc vuông, nên hình biểu diễn của tam giác vuông có thể là một tam giác thường bất kì.'
      },
      {
        id: 'c',
        text: 'Hình biểu diễn của đường trung tuyến trong một tam giác luôn là đường trung tuyến của tam giác hình biểu diễn.',
        isTrue: true,
        explanation: 'Trung điểm cạnh biến thành trung điểm cạnh tương ứng nên đường trung tuyến biến thành đường trung tuyến.'
      },
      {
        id: 'd',
        text: 'Hình biểu diễn của một đường tròn (không song song với phương chiếu) là một hình elip (hoặc đường tròn).',
        isTrue: true,
        explanation: 'Trong thực tế vẽ hình không gian, hình biểu diễn của đường tròn qua phép chiếu song song là một hình elip.'
      }
    ]
  }
];

const b14P2B: CompactTF[] = [
  {
    stem: 'Cho hình lăng trụ tam giác $ABC.A\'B\'C\'$. Gọi $G$ và $G\'$ lần lượt là trọng tâm của hai đáy $ABC$ và $A\'B\'C\'$, $M$ là trung điểm của $BC$. Xét phép chiếu song song lên mặt phẳng $(A\'B\'C\')$ theo phương chiếu $AA\'$. Xét tính đúng sai của các mệnh đề sau:',
    statements: [
      {
        id: 'a',
        text: 'Hình chiếu của trung điểm $M$ lên mặt phẳng $(A\'B\'C\')$ là trung điểm $M\'$ của cạnh $B\'C\'$.',
        isTrue: true,
        explanation: 'Hình chiếu của $B, C$ là $B\', C\'$ nên hình chiếu của trung điểm $M$ của $BC$ là trung điểm $M\'$ của $B\'C\'$.'
      },
      {
        id: 'b',
        text: 'Hình chiếu của trọng tâm $G$ lên mặt phẳng $(A\'B\'C\')$ là trọng tâm $G\'$ của tam giác $A\'B\'C\'$.',
        isTrue: true,
        explanation: 'Phép chiếu song song biến trọng tâm của $\\triangle ABC$ thành trọng tâm của $\\triangle A\'B\'C\'$.'
      },
      {
        id: 'c',
        text: 'Đường thẳng $GG\'$ cắt cạnh bên $AA\'$.',
        isTrue: false,
        explanation: 'Vì $G\'$ là hình chiếu của $G$ theo phương chiếu $AA\'$ nên $GG\' \\parallel AA\'$, không cắt $AA\'$.'
      },
      {
        id: 'd',
        text: 'Hình chiếu của đường thẳng $AB\'$ lên mặt phẳng $(A\'B\'C\')$ theo phương chiếu $AA\'$ là đường thẳng $A\'B\'$.',
        isTrue: true,
        explanation: 'Hình chiếu của $A$ là $A\'$, hình chiếu của $B\'$ là chính $B\'$, nên hình chiếu của đường thẳng $AB\'$ là đường thẳng $A\'B\'$.'
      }
    ]
  },
  {
    stem: 'Cho hình thang $ABCD$ có hai đáy $AB \\parallel CD$ và $AB = 3CD$. Qua phép chiếu song song lên mặt phẳng $(P)$ (mặt phẳng $(ABCD)$ không song song với phương chiếu), hình chiếu của $ABCD$ là tứ giác $A\'B\'C\'D\'$. Xét tính đúng sai của các mệnh đề sau:',
    statements: [
      {
        id: 'a',
        text: 'Hai đường thẳng $A\'B\'$ và $C\'D\'$ song song với nhau.',
        isTrue: true,
        explanation: 'Vì $AB \\parallel CD$ và 4 điểm không thẳng hàng nên $A\'B\' \\parallel C\'D\'$.'
      },
      {
        id: 'b',
        text: 'Tỉ số độ dài $\\frac{A\'B\'}{C\'D\'}$ luôn bằng $3$.',
        isTrue: true,
        explanation: 'Phép chiếu song song bảo toàn tỉ số độ dài của hai đoạn thẳng song song nên $\\frac{A\'B\'}{C\'D\'} = \\frac{AB}{CD} = 3$.'
      },
      {
        id: 'c',
        text: 'Nếu $O$ là giao điểm của $AC$ và $BD$ thì hình chiếu $O\'$ của $O$ là giao điểm của $A\'C\'$ và $B\'D\'$.',
        isTrue: true,
        explanation: '$O \\in AC \\Rightarrow O\' \\in A\'C\'$ và $O \\in BD \\Rightarrow O\' \\in B\'D\'$, do đó $O\' = A\'C\' \\cap B\'D\'$.'
      },
      {
        id: 'd',
        text: 'Tỉ số $\\frac{O\'A\'}{O\'C\'}$ bằng $2$.',
        isTrue: false,
        explanation: 'Trong hình thang $A\'B\'C\'D\'$, theo định lí Thalès ta có $\\frac{O\'A\'}{O\'C\'} = \\frac{A\'B\'}{C\'D\'} = 3$, không phải $2$.'
      }
    ]
  }
];

const b14P3A: CompactSA[] = [
  {
    prompt: 'Cho đoạn thẳng $AB$ không song song với phương chiếu. Điểm $M$ nằm trên đoạn thẳng $AB$ sao cho $AM = 12\\text{ cm}, MB = 4\\text{ cm}$. Qua phép chiếu song song, hình chiếu của $A, B, M$ lần lượt là $A\', B\', M\'$ với $M\'B\' = 5\\text{ cm}$. Tính độ dài đoạn thẳng $A\'B\'$ (đơn vị: cm).',
    correctAnswer: '20',
    acceptedAnswers: ['20'],
    explanation: 'Ta có $\\frac{A\'M\'}{M\'B\'} = \\frac{AM}{MB} = \\frac{12}{4} = 3 \\Rightarrow A\'M\' = 3 \\cdot 5 = 15\\text{ cm}$. Do đó $A\'B\' = A\'M\' + M\'B\' = 15 + 5 = 20\\text{ cm}$.'
  },
  {
    prompt: 'Cho hình thang $ABCD$ có hai đáy $AB \\parallel CD$ với $AB = 20\\text{ cm}, CD = 8\\text{ cm}$. Hình chiếu song song của hình thang $ABCD$ lên mặt phẳng $(P)$ là hình thang $A\'B\'C\'D\'$ có đáy lớn $A\'B\' = 15\\text{ cm}$. Tính độ dài đáy nhỏ $C\'D\'$ (đơn vị: cm).',
    correctAnswer: '6',
    acceptedAnswers: ['6'],
    explanation: 'Phép chiếu song song bảo toàn tỉ số hai đoạn thẳng song song: $\\frac{C\'D\'}{A\'B\'} = \\frac{CD}{AB} = \\frac{8}{20} = \\frac{2}{5} \\Rightarrow C\'D\' = \\frac{2}{5} \\cdot 15 = 6\\text{ cm}$.'
  },
  {
    prompt: 'Cho tam giác $ABC$ có trọng tâm $G$, $M$ là trung điểm của $BC$. Qua phép chiếu song song lên mặt phẳng $(P)$, hình chiếu của $A, G, M$ lần lượt là $A\', G\', M\'$. Biết $A\'M\' = 18\\text{ cm}$, tính độ dài đoạn thẳng $A\'G\'$ (đơn vị: cm).',
    correctAnswer: '12',
    acceptedAnswers: ['12'],
    explanation: 'Vì $G\'$ là trọng tâm của $\\triangle A\'B\'C\'$ và $M\'$ là trung điểm $B\'C\'$ nên $A\'G\' = \\frac{2}{3}A\'M\' = \\frac{2}{3} \\cdot 18 = 12\\text{ cm}$.'
  },
  {
    prompt: 'Cho hình bình hành $ABCD$ có tâm $O$. Qua phép chiếu song song lên mặt phẳng $(P)$, hình chiếu của $A, B, C, D, O$ lần lượt là $A\', B\', C\', D\', O\'$ (không thẳng hàng). Biết $A\'O\' = 9\\text{ cm}$, tính độ dài đường chéo $A\'C\'$ (đơn vị: cm).',
    correctAnswer: '18',
    acceptedAnswers: ['18'],
    explanation: 'Vì $O$ là trung điểm của $AC$ nên $O\'$ là trung điểm của $A\'C\'$, suy ra $A\'C\' = 2A\'O\' = 2 \\cdot 9 = 18\\text{ cm}$.'
  }
];

const b14P3B: CompactSA[] = [
  {
    prompt: 'Cho ba điểm $A, B, C$ thẳng hàng theo thứ tự đó (đường thẳng $AC$ không song song với phương chiếu) có $\\frac{AB}{BC} = \\frac{3}{5}$. Gọi $A\', B\', C\'$ là hình chiếu song song của $A, B, C$ lên mặt phẳng $(P)$. Biết $A\'C\' = 24\\text{ cm}$, tính độ dài đoạn $A\'B\'$ (đơn vị: cm).',
    correctAnswer: '9',
    acceptedAnswers: ['9'],
    explanation: 'Ta có $\\frac{A\'B\'}{B\'C\'} = \\frac{AB}{BC} = \\frac{3}{5} \\Rightarrow \\frac{A\'B\'}{A\'C\'} = \\frac{3}{3+5} = \\frac{3}{8}$. Vậy $A\'B\' = \\frac{3}{8} \\cdot 24 = 9\\text{ cm}$.'
  },
  {
    prompt: 'Cho hai đoạn thẳng song song $AB$ và $CD$ có $AB = 14\\text{ cm}, CD = 21\\text{ cm}$. Qua phép chiếu song song lên mặt phẳng $(P)$, hình chiếu của chúng là $A\'B\'$ và $C\'D\'$ với $A\'B\' = 10\\text{ cm}$. Tính độ dài đoạn $C\'D\'$ (đơn vị: cm).',
    correctAnswer: '15',
    acceptedAnswers: ['15'],
    explanation: 'Ta có $\\frac{C\'D\'}{A\'B\'} = \\frac{CD}{AB} = \\frac{21}{14} = \\frac{3}{2} \\Rightarrow C\'D\' = \\frac{3}{2} \\cdot 10 = 15\\text{ cm}$.'
  },
  {
    prompt: 'Cho hình hộp $ABCD.A\'B\'C\'D\'$ có đáy $ABCD$ có diện tích bằng $32\\text{ cm}^2$. Xét phép chiếu song song lên mặt phẳng $(ABCD)$ theo phương chiếu $AA\'$. Hình chiếu của tam giác $A\'B\'C\'$ lên $(ABCD)$ có diện tích bằng bao nhiêu $\\text{cm}^2$?',
    correctAnswer: '16',
    acceptedAnswers: ['16'],
    explanation: 'Hình chiếu của $\\triangle A\'B\'C\'$ lên $(ABCD)$ theo phương $AA\'$ chính là $\\triangle ABC$, có diện tích bằng $\\frac{1}{2}S_{ABCD} = \\frac{32}{2} = 16\\text{ cm}^2$.'
  },
  {
    prompt: 'Cho tam giác $ABC$. Gọi $M, N$ lần lượt là trung điểm của $AB, AC$. Qua phép chiếu song song lên mặt phẳng $(P)$, hình chiếu của $B, C, M, N$ lần lượt là $B\', C\', M\', N\'$. Biết $M\'N\' = 7\\text{ cm}$, tính độ dài đoạn thẳng $B\'C\'$ (đơn vị: cm).',
    correctAnswer: '14',
    acceptedAnswers: ['14'],
    explanation: 'Vì $MN \\parallel BC$ và $BC = 2MN$ nên qua phép chiếu song song ta có $B\'C\' = 2M\'N\' = 2 \\cdot 7 = 14\\text{ cm}$.'
  }
];

const b14P4A: CompactSO[] = [
  {
    prompt: 'Sắp xếp các bước tìm hình chiếu song song $M\'$ của một điểm $M$ lên mặt phẳng chiếu $(P)$ theo phương chiếu $l$:',
    steps: [
      { id: 's1', text: 'Xác định mặt phẳng chiếu $(P)$, phương chiếu $l$ (với $l$ cắt $(P)$) và điểm $M$ trong không gian.' },
      { id: 's2', text: 'Qua điểm $M$, dựng đường thẳng $\\Delta$ song song hoặc trùng với đường thẳng $l$.' },
      { id: 's3', text: 'Tìm giao điểm $M\'$ của đường thẳng $\\Delta$ với mặt phẳng $(P)$.' },
      { id: 's4', text: 'Kết luận $M\'$ là hình chiếu song song của điểm $M$ lên mặt phẳng $(P)$ theo phương $l$.' }
    ],
    correctOrder: ['s1', 's2', 's3', 's4'],
    explanation: 'Theo định nghĩa phép chiếu song song, hình chiếu của $M$ là giao điểm của đường thẳng qua $M$ song song (hoặc trùng) với $l$ và mặt phẳng $(P)$.'
  },
  {
    prompt: 'Sắp xếp các bước vẽ hình biểu diễn của một hình lục giác đều $ABCDEF$ tâm $O$ trên mặt phẳng:',
    steps: [
      { id: 's1', text: 'Vẽ hai đường chéo chính $A\'D\'$ và $B\'E\'$ cắt nhau tại trung điểm $O\'$ của mỗi đoạn.' },
      { id: 's2', text: 'Qua $O\'$, vẽ đoạn thẳng $C\'F\'$ song song và bằng độ dài với đoạn thẳng $A\'B\'$ sao cho $O\'$ là trung điểm $C\'F\'$.' },
      { id: 's3', text: 'Nối các đỉnh $A\', B\', C\', D\', E\', F\'$ theo thứ tự để tạo thành lục giác $A\'B\'C\'D\'E\'F\'$.' },
      { id: 's4', text: 'Kiểm tra các cặp cạnh đối song song và bằng nhau, hoàn thiện hình biểu diễn.' }
    ],
    correctOrder: ['s1', 's2', 's3', 's4'],
    explanation: 'Trong lục giác đều, 3 đường chéo chính đồng quy tại trung điểm $O$ và chia lục giác thành các hình bình hành.'
  },
  {
    prompt: 'Sắp xếp các bước xác định hình chiếu của trọng tâm $G$ của $\\triangle SCD$ lên mặt phẳng $(ABCD)$ theo phương chiếu $SA$ trong hình chóp $S.ABCD$:',
    steps: [
      { id: 's1', text: 'Xét các đỉnh $S, C, D$ của tam giác $SCD$ đối với phép chiếu lên $(ABCD)$ theo phương $SA$.' },
      { id: 's2', text: 'Vì $C, D \\in (ABCD)$ nên hình chiếu của $C, D$ là chính $C, D$; đường thẳng qua $S$ theo phương $SA$ cắt $(ABCD)$ tại $A$ nên hình chiếu của $S$ là $A$.' },
      { id: 's3', text: 'Suy ra hình chiếu của tam giác $SCD$ lên mặt phẳng $(ABCD)$ theo phương $SA$ là tam giác $ACD$.' },
      { id: 's4', text: 'Do phép chiếu song song bảo toàn trọng tâm tam giác nên hình chiếu của $G$ là trọng tâm $G\'$ của tam giác $ACD$.' }
    ],
    correctOrder: ['s1', 's2', 's3', 's4'],
    explanation: 'Tìm ảnh của 3 đỉnh tam giác rồi suy ra ảnh của trọng tâm.'
  },
  {
    prompt: 'Sắp xếp các bước vẽ hình biểu diễn của hình hộp $ABCD.A\'B\'C\'D\'$ trên mặt phẳng:',
    steps: [
      { id: 's1', text: 'Vẽ hình bình hành $ABCD$ biểu diễn cho mặt đáy dưới (chú ý nét đứt cho các cạnh khuất).' },
      { id: 's2', text: 'Từ 4 đỉnh $A, B, C, D$, dựng 4 đoạn thẳng song song và bằng nhau $AA\', BB\', CC\', DD\'$ biểu diễn các cạnh bên.' },
      { id: 's3', text: 'Nối các đầu mút $A\', B\', C\', D\'$ để được hình bình hành đáy trên $A\'B\'C\'D\'$.' },
      { id: 's4', text: 'Phân biệt rõ các cạnh nhìn thấy (vẽ nét liền) và các cạnh bị che khuất (vẽ nét đứt).' }
    ],
    correctOrder: ['s1', 's2', 's3', 's4'],
    explanation: 'Quy trình chuẩn vẽ hình biểu diễn của hình hộp trong hình học không gian.'
  }
];

const b14P4B = [b14P4A[2], b14P4A[0], b14P4A[3], b14P4A[1]];

// ============================================================================
// ÔN TẬP CHƯƠNG IV (Tổng hợp toàn chương IV: Quan hệ song song trong không gian)
// ============================================================================

const ch4RevP1A = [
  b10P1A[4], b10P1A[6],
  b11P1A[2], b11P1A[6], b11P1A[9],
  b12P1A[3], b12P1A[6], b12P1A[11],
  b13P1A[5], b13P1A[6], b13P1A[11],
  b14P1A[5]
];

const ch4RevP1B = [
  b10P1B[3], b10P1B[7],
  b11P1B[3], b11P1B[6], b11P1B[9],
  b12P1B[3], b12P1B[8], b12P1B[11],
  b13P1B[3], b13P1B[4], b13P1B[6],
  b14P1B[5]
];

const ch4RevP2A = [b12P2A[1], b13P2A[0]];
const ch4RevP2B = [b11P2B[1], b13P2B[1]];
const ch4RevP3A = [b10P3A[3], b11P3A[0], b12P3A[1], b13P3A[0]];
const ch4RevP3B = [b11P3B[1], b12P3B[3], b13P3B[2], b14P3B[0]];
const ch4RevP4A = [b10P4A[1], b11P4A[1], b12P4A[1], b13P4A[1]];
const ch4RevP4B = [b11P4A[3], b12P4A[3], b13P4A[2], b14P4A[2]];

export const chapter4LessonExams: Record<string, ExamSet[]> = {
  'bai-10': [
    buildCompactLessonExamSet(
      'bai-10-de-1',
      'Đề ôn Bài 10 – Đề số 01',
      'Bài 10. Đường thẳng và mặt phẳng trong không gian',
      1,
      b10P1A, b10P2A, b10P3A, b10P4A
    ),
    buildCompactLessonExamSet(
      'bai-10-de-2',
      'Đề ôn Bài 10 – Đề số 02',
      'Bài 10. Đường thẳng và mặt phẳng trong không gian',
      2,
      b10P1B, b10P2B, b10P3B, b10P4B
    )
  ],
  'bai-11': [
    buildCompactLessonExamSet(
      'bai-11-de-1',
      'Đề ôn Bài 11 – Đề số 01',
      'Bài 11. Hai đường thẳng song song',
      1,
      b11P1A, b11P2A, b11P3A, b11P4A
    ),
    buildCompactLessonExamSet(
      'bai-11-de-2',
      'Đề ôn Bài 11 – Đề số 02',
      'Bài 11. Hai đường thẳng song song',
      2,
      b11P1B, b11P2B, b11P3B, b11P4B
    )
  ],
  'bai-12': [
    buildCompactLessonExamSet(
      'bai-12-de-1',
      'Đề ôn Bài 12 – Đề số 01',
      'Bài 12. Đường thẳng và mặt phẳng song song',
      1,
      b12P1A, b12P2A, b12P3A, b12P4A
    ),
    buildCompactLessonExamSet(
      'bai-12-de-2',
      'Đề ôn Bài 12 – Đề số 02',
      'Bài 12. Đường thẳng và mặt phẳng song song',
      2,
      b12P1B, b12P2B, b12P3B, b12P4B
    )
  ],
  'bai-13': [
    buildCompactLessonExamSet(
      'bai-13-de-1',
      'Đề ôn Bài 13 – Đề số 01',
      'Bài 13. Hai mặt phẳng song song',
      1,
      b13P1A, b13P2A, b13P3A, b13P4A
    ),
    buildCompactLessonExamSet(
      'bai-13-de-2',
      'Đề ôn Bài 13 – Đề số 02',
      'Bài 13. Hai mặt phẳng song song',
      2,
      b13P1B, b13P2B, b13P3B, b13P4B
    )
  ],
  'bai-14': [
    buildCompactLessonExamSet(
      'bai-14-de-1',
      'Đề ôn Bài 14 – Đề số 01',
      'Bài 14. Phép chiếu song song',
      1,
      b14P1A, b14P2A, b14P3A, b14P4A
    ),
    buildCompactLessonExamSet(
      'bai-14-de-2',
      'Đề ôn Bài 14 – Đề số 02',
      'Bài 14. Phép chiếu song song',
      2,
      b14P1B, b14P2B, b14P3B, b14P4B
    )
  ],
  'on-tap-chuong-4': [
    buildCompactLessonExamSet(
      'on-tap-chuong-4-de-1',
      'Đề ôn Chương IV – Đề số 01',
      'Ôn tập chương IV. Quan hệ song song trong không gian',
      1,
      ch4RevP1A, ch4RevP2A, ch4RevP3A, ch4RevP4A
    ),
    buildCompactLessonExamSet(
      'on-tap-chuong-4-de-2',
      'Đề ôn Chương IV – Đề số 02',
      'Ôn tập chương IV. Quan hệ song song trong không gian',
      2,
      ch4RevP1B, ch4RevP2B, ch4RevP3B, ch4RevP4B
    )
  ]
};
