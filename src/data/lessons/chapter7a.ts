import { ExamSet } from '../../types/exam';
import {
  CompactMC,
  CompactTF,
  CompactSA,
  CompactSO
} from './chapter4';

// ============================================================================
// BỘ HÌNH VẼ 3D CHUẨN TIKZ CHO CHƯƠNG VII (QUAN HỆ VUÔNG GÓC TRONG KHÔNG GIAN)
// - Đường nhìn thấy: nét liền (thick)
// - Đường khuất: nét đứt (dashed, thick)
// - Kí hiệu góc vuông và đúng chính xác các điểm được nêu trong câu hỏi
// ============================================================================

export const TIKZ_CUBE_ABCD = `\\begin{tikzpicture}[line join=round, line cap=round, scale=0.9]
  \\coordinate (A) at (0,0);
  \\coordinate (D) at (-1.1,-0.95);
  \\coordinate (C) at (2.1,-0.95);
  \\coordinate (B) at (3.2,0);
  \\coordinate (A1) at (0,2.7);
  \\coordinate (D1) at (-1.1,1.75);
  \\coordinate (C1) at (2.1,1.75);
  \\coordinate (B1) at (3.2,2.7);
  \\draw[dashed, thick] (A)--(B) (A)--(D) (A)--(A1);
  \\draw[thick] (D)--(C)--(B)--(B1)--(C1)--(D1)--cycle;
  \\draw[thick] (D1)--(A1)--(B1) (C)--(C1);
  \\filldraw (A) circle (1.4pt) node[below right] {$A$};
  \\filldraw (B) circle (1.4pt) node[right] {$B$};
  \\filldraw (C) circle (1.4pt) node[below] {$C$};
  \\filldraw (D) circle (1.4pt) node[left] {$D$};
  \\filldraw (A1) circle (1.4pt) node[above] {$A'$};
  \\filldraw (B1) circle (1.4pt) node[above right] {$B'$};
  \\filldraw (C1) circle (1.4pt) node[right] {$C'$};
  \\filldraw (D1) circle (1.4pt) node[left] {$D'$};
\\end{tikzpicture}`;

export const TIKZ_PYR_SABC_SA_PERP = `\\begin{tikzpicture}[line join=round, line cap=round, scale=0.95]
  \\coordinate (A) at (0,0);
  \\coordinate (B) at (1.5,-1.25);
  \\coordinate (C) at (3.6,0);
  \\coordinate (S) at (0,2.75);
  \\draw[dashed, thick] (A)--(C);
  \\draw[thick] (S)--(A) (S)--(B) (S)--(C) (A)--(B) (B)--(C);
  \\draw[thick, red] (0,0.28)--(0.28,0.28)--(0.28,0);
  \\filldraw (S) circle (1.5pt) node[above] {$S$};
  \\filldraw (A) circle (1.5pt) node[left] {$A$};
  \\filldraw (B) circle (1.5pt) node[below] {$B$};
  \\filldraw (C) circle (1.5pt) node[right] {$C$};
\\end{tikzpicture}`;

export const TIKZ_PYR_SABC_SA_PERP_AH = `\\begin{tikzpicture}[line join=round, line cap=round, scale=0.95]
  \\coordinate (A) at (0,0);
  \\coordinate (B) at (1.5,-1.25);
  \\coordinate (C) at (3.6,0);
  \\coordinate (S) at (0,2.75);
  \\coordinate (H) at (0.6,1.65);
  \\draw[dashed, thick] (A)--(C);
  \\draw[thick] (S)--(A) (S)--(B) (S)--(C) (A)--(B) (B)--(C);
  \\draw[very thick, blue] (A)--(H);
  \\draw[thick, red] (0,0.28)--(0.28,0.28)--(0.28,0);
  \\filldraw (S) circle (1.5pt) node[above] {$S$};
  \\filldraw (A) circle (1.5pt) node[left] {$A$};
  \\filldraw (B) circle (1.5pt) node[below] {$B$};
  \\filldraw (C) circle (1.5pt) node[right] {$C$};
  \\filldraw[blue] (H) circle (1.6pt) node[right] {$H$};
\\end{tikzpicture}`;

export const TIKZ_PYR_SABCD_SA_PERP = `\\begin{tikzpicture}[line join=round, line cap=round, scale=0.92]
  \\coordinate (A) at (0,0);
  \\coordinate (D) at (-1.15,-1.05);
  \\coordinate (C) at (2.15,-1.05);
  \\coordinate (B) at (3.3,0);
  \\coordinate (S) at (0,2.85);
  \\draw[dashed, thick] (S)--(A) (A)--(B) (A)--(D) (A)--(C) (B)--(D);
  \\draw[thick] (S)--(D) (S)--(C) (S)--(B) (D)--(C) (C)--(B);
  \\draw[dashed, thick, red] (0,0.28)--(0.28,0.28)--(0.28,0);
  \\filldraw (S) circle (1.5pt) node[above] {$S$};
  \\filldraw (A) circle (1.5pt) node[above left] {$A$};
  \\filldraw (B) circle (1.5pt) node[right] {$B$};
  \\filldraw (C) circle (1.5pt) node[below] {$C$};
  \\filldraw (D) circle (1.5pt) node[left] {$D$};
\\end{tikzpicture}`;

export const TIKZ_PYR_REGULAR_SABCD = `\\begin{tikzpicture}[line join=round, line cap=round, scale=0.92]
  \\coordinate (A) at (0,0);
  \\coordinate (D) at (-1.15,-1.05);
  \\coordinate (C) at (2.15,-1.05);
  \\coordinate (B) at (3.3,0);
  \\coordinate (O) at (1.075,-0.525);
  \\coordinate (S) at (1.075,2.75);
  \\draw[dashed, thick] (S)--(A) (A)--(B) (A)--(D) (A)--(C) (B)--(D);
  \\draw[dashed, very thick, red] (S)--(O);
  \\draw[thick] (S)--(D) (S)--(C) (S)--(B) (D)--(C) (C)--(B);
  \\filldraw (S) circle (1.5pt) node[above] {$S$};
  \\filldraw (A) circle (1.5pt) node[above left] {$A$};
  \\filldraw (B) circle (1.5pt) node[right] {$B$};
  \\filldraw (C) circle (1.5pt) node[below] {$C$};
  \\filldraw (D) circle (1.5pt) node[left] {$D$};
  \\filldraw[red] (O) circle (1.5pt) node[below] {$O$};
\\end{tikzpicture}`;

export const TIKZ_RIGHT_PRISM_ABCA1B1C1 = `\\begin{tikzpicture}[line join=round, line cap=round, scale=0.92]
  \\coordinate (A) at (0,0);
  \\coordinate (B) at (1.45,-1.15);
  \\coordinate (C) at (3.4,0);
  \\coordinate (A1) at (0,2.65);
  \\coordinate (B1) at (1.45,1.5);
  \\coordinate (C1) at (3.4,2.65);
  \\draw[dashed, thick] (A)--(C);
  \\draw[thick] (A)--(B)--(C)--(C1)--(B1)--(A1)--cycle;
  \\draw[thick] (B)--(B1) (A1)--(C1);
  \\draw[thick, red] (0,0.25)--(0.22,-0.17)--(0.22,0.08);
  \\filldraw (A) circle (1.4pt) node[left] {$A$};
  \\filldraw (B) circle (1.4pt) node[below] {$B$};
  \\filldraw (C) circle (1.4pt) node[right] {$C$};
  \\filldraw (A1) circle (1.4pt) node[left] {$A'$};
  \\filldraw (B1) circle (1.4pt) node[below right] {$B'$};
  \\filldraw (C1) circle (1.4pt) node[right] {$C'$};
\\end{tikzpicture}`;

export const TIKZ_TETRA_OABC_ORTHO = `\\begin{tikzpicture}[line join=round, line cap=round, scale=0.95]
  \\coordinate (O) at (0,0);
  \\coordinate (A) at (-1.25,-1.1);
  \\coordinate (B) at (3.2,0);
  \\coordinate (C) at (0,2.65);
  \\draw[dashed, thick] (O)--(A) (O)--(B) (O)--(C);
  \\draw[thick] (C)--(A)--(B)--cycle;
  \\draw[dashed, thick, red] (0,0.26)--(0.26,0.26)--(0.26,0);
  \\filldraw (O) circle (1.5pt) node[above right] {$O$};
  \\filldraw (A) circle (1.5pt) node[left] {$A$};
  \\filldraw (B) circle (1.5pt) node[right] {$B$};
  \\filldraw (C) circle (1.5pt) node[above] {$C$};
\\end{tikzpicture}`;

export const TIKZ_TETRA_ABCD_MN = `\\begin{tikzpicture}[line join=round, line cap=round, scale=0.95]
  \\coordinate (A) at (1.55,2.85);
  \\coordinate (B) at (0,0);
  \\coordinate (C) at (1.7,-1.3);
  \\coordinate (D) at (3.7,0);
  \\coordinate (M) at (0.775,1.425);
  \\coordinate (N) at (2.7,-0.65);
  \\draw[dashed, thick] (B)--(D);
  \\draw[dashed, very thick, red] (M)--(N);
  \\draw[thick] (A)--(B) (A)--(C) (A)--(D) (B)--(C) (C)--(D);
  \\filldraw (A) circle (1.5pt) node[above] {$A$};
  \\filldraw (B) circle (1.5pt) node[left] {$B$};
  \\filldraw (C) circle (1.5pt) node[below] {$C$};
  \\filldraw (D) circle (1.5pt) node[right] {$D$};
  \\filldraw[red] (M) circle (1.5pt) node[left] {$M$};
  \\filldraw[red] (N) circle (1.5pt) node[below right] {$N$};
\\end{tikzpicture}`;

// ============================================================================
// BÀI 22. HAI ĐƯỜNG THẲNG VUÔNG GÓC
// Trọng tâm: Góc giữa hai đường thẳng trong không gian (0° <= φ <= 90°),
// định nghĩa và tính chất hai đường thẳng vuông góc trong không gian.
// ============================================================================

export const b22P1A: CompactMC[] = [
  {
    prompt: 'Trong không gian, góc $\\varphi$ giữa hai đường thẳng $a$ và $b$ bất kì luôn thoả mãn điều kiện nào sau đây?',
    options: [
      { id: 'A', text: '$0^\\circ \\le \\varphi \\le 180^\\circ$' },
      { id: 'B', text: '$0^\\circ \\le \\varphi \\le 90^\\circ$' },
      { id: 'C', text: '$0^\\circ < \\varphi < 90^\\circ$' },
      { id: 'D', text: '$90^\\circ \\le \\varphi \\le 180^\\circ$' }
    ],
    correctOptionId: 'B',
    explanation: 'Góc giữa hai đường thẳng trong không gian không vượt quá $90^\\circ$: $0^\\circ \\le (a, b) \\le 90^\\circ$.'
  },
  {
    prompt: 'Trong không gian, cho ba đường thẳng $a, b, c$. Nếu $a \\parallel b$ và $c \\perp a$ thì khẳng định nào sau đây là **đúng**?',
    options: [
      { id: 'A', text: '$c \\parallel b$' },
      { id: 'B', text: '$c \\perp b$' },
      { id: 'C', text: '$c$ cắt $b$' },
      { id: 'D', text: '$c$ trùng $b$' }
    ],
    correctOptionId: 'B',
    explanation: 'Trong không gian, nếu hai đường thẳng song song thì đường thẳng nào vuông góc với đường này cũng vuông góc với đường kia: $a \\parallel b, c \\perp a \\Rightarrow c \\perp b$.'
  },
  {
    prompt: 'Cho hình lập phương $ABCD.A\'B\'C\'D\'$. Góc giữa hai đường thẳng $AB$ và $B\'C\'$ bằng:',
    options: [
      { id: 'A', text: '$45^\\circ$' },
      { id: 'B', text: '$60^\\circ$' },
      { id: 'C', text: '$90^\\circ$' },
      { id: 'D', text: '$0^\\circ$' }
    ],
    correctOptionId: 'C',
    explanation: 'Ta có $B\'C\' \\parallel BC$, mà $AB \\perp BC$ (vì $ABCD$ là hình vuông) nên $(AB, B\'C\') = (AB, BC) = 90^\\circ$.',
    tikzType: 'custom',
    tikzCode: TIKZ_CUBE_ABCD
  },
  {
    prompt: 'Cho hình lập phương $ABCD.A\'B\'C\'D\'$. Góc giữa hai đường thẳng $AC$ và $A\'D\'$ bằng:',
    options: [
      { id: 'A', text: '$30^\\circ$' },
      { id: 'B', text: '$45^\\circ$' },
      { id: 'C', text: '$60^\\circ$' },
      { id: 'D', text: '$90^\\circ$' }
    ],
    correctOptionId: 'B',
    explanation: 'Vì $A\'D\' \\parallel AD$ nên $(AC, A\'D\') = (AC, AD) = \\widehat{CAD} = 45^\\circ$ (do $ABCD$ là hình vuông).',
    tikzType: 'custom',
    tikzCode: TIKZ_CUBE_ABCD
  },
  {
    prompt: 'Cho hình lập phương $ABCD.A\'B\'C\'D\'$. Góc giữa hai đường thẳng chéo nhau $AB\'$ và $BC\'$ bằng:',
    options: [
      { id: 'A', text: '$60^\\circ$' },
      { id: 'B', text: '$45^\\circ$' },
      { id: 'C', text: '$90^\\circ$' },
      { id: 'D', text: '$30^\\circ$' }
    ],
    correctOptionId: 'A',
    explanation: 'Vì $AB\' \\parallel DC\'$ nên $(AB\', BC\') = (DC\', BC\')$. Tam giác $DBC\'$ có ba cạnh $DB = BC\' = C\'D = a\\sqrt{2}$ nên là tam giác đều, suy ra $(AB\', BC\') = 60^\\circ$.',
    tikzType: 'custom',
    tikzCode: TIKZ_CUBE_ABCD
  },
  {
    prompt: 'Cho hình lập phương $ABCD.A\'B\'C\'D\'$. Đường thẳng $A\'C\'$ vuông góc với đường thẳng nào sau đây?',
    options: [
      { id: 'A', text: '$AB$' },
      { id: 'B', text: '$BD$' },
      { id: 'C', text: '$AD\'$' },
      { id: 'D', text: '$BC$' }
    ],
    correctOptionId: 'B',
    explanation: 'Vì $A\'C\' \\parallel AC$ và hai đường chéo hình vuông $AC \\perp BD$ nên $A\'C\' \\perp BD$.',
    tikzType: 'custom',
    tikzCode: TIKZ_CUBE_ABCD
  },
  {
    prompt: 'Cho tứ diện đều $ABCD$ cạnh $a$. Gọi $M$ là trung điểm của cạnh $CD$. Giá trị $\\cos(AB, BM)$ bằng:',
    options: [
      { id: 'A', text: '$\\frac{\\sqrt{3}}{6}$' },
      { id: 'B', text: '$\\frac{\\sqrt{3}}{3}$' },
      { id: 'C', text: '$\\frac{1}{2}$' },
      { id: 'D', text: '$\\frac{\\sqrt{3}}{2}$' }
    ],
    correctOptionId: 'B',
    explanation: 'Trong các tam giác đều $BCD$ và $ACD$ cạnh $a$, hai đường trung tuyến là $BM = AM = \\frac{a\\sqrt{3}}{2}$. Áp dụng định lí côsin trong $\\triangle ABM$: $\\cos\\widehat{ABM} = \\frac{AB^2 + BM^2 - AM^2}{2 \\cdot AB \\cdot BM} = \\frac{a^2}{2a \\cdot \\frac{a\\sqrt{3}}{2}} = \\frac{1}{\\sqrt{3}} = \\frac{\\sqrt{3}}{3}$.'
  },
  {
    prompt: 'Cho hình lăng trụ tam giác đều $ABC.A\'B\'C\'$ có tất cả các cạnh bằng $a$. Góc giữa hai đường thẳng $AB$ và $B\'C\'$ bằng:',
    options: [
      { id: 'A', text: '$30^\\circ$' },
      { id: 'B', text: '$45^\\circ$' },
      { id: 'C', text: '$60^\\circ$' },
      { id: 'D', text: '$90^\\circ$' }
    ],
    correctOptionId: 'C',
    explanation: 'Vì $B\'C\' \\parallel BC$ nên $(AB, B\'C\') = (AB, BC) = \\widehat{ABC} = 60^\\circ$ (do đáy $ABC$ là tam giác đều).',
    tikzType: 'custom',
    tikzCode: TIKZ_RIGHT_PRISM_ABCA1B1C1
  },
  {
    prompt: 'Cho hình chóp $S.ABC$ có $SA = SB = SC = AB = AC = a$ và $BC = a\\sqrt{2}$. Góc giữa hai đường thẳng $AB$ và $SC$ bằng:',
    options: [
      { id: 'A', text: '$30^\\circ$' },
      { id: 'B', text: '$45^\\circ$' },
      { id: 'C', text: '$60^\\circ$' },
      { id: 'D', text: '$90^\\circ$' }
    ],
    correctOptionId: 'C',
    explanation: 'Ta có $\\overrightarrow{AB} \\cdot \\overrightarrow{SC} = \\overrightarrow{AB} \\cdot (\\overrightarrow{AC} - \\overrightarrow{AS}) = \\overrightarrow{AB} \\cdot \\overrightarrow{AC} - \\overrightarrow{AB} \\cdot \\overrightarrow{AS}$. Vì $AB^2 + AC^2 = 2a^2 = BC^2$ nên $\\triangle ABC$ vuông tại $A \\Rightarrow \\overrightarrow{AB} \\cdot \\overrightarrow{AC} = 0$. Tam giác $SAB$ đều cạnh $a$ nên $\\overrightarrow{AB} \\cdot \\overrightarrow{AS} = a^2 \\cos 60^\\circ = \\frac{a^2}{2}$. Do đó $|\\cos(AB, SC)| = \\frac{a^2/2}{a \\cdot a} = \\frac{1}{2} \\Rightarrow (AB, SC) = 60^\\circ$.'
  },
  {
    prompt: 'Cho tứ diện $ABCD$ có $AB = CD = 2a$. Gọi $M, N$ lần lượt là trung điểm của $BC$ và $AD$, biết $MN = a\\sqrt{3}$. Góc giữa hai đường thẳng $AB$ và $CD$ bằng:',
    options: [
      { id: 'A', text: '$30^\\circ$' },
      { id: 'B', text: '$60^\\circ$' },
      { id: 'C', text: '$90^\\circ$' },
      { id: 'D', text: '$45^\\circ$' }
    ],
    correctOptionId: 'B',
    explanation: 'Gọi $P$ là trung điểm $AC$. Khi đó $MP \\parallel AB, MP = a$ và $NP \\parallel CD, NP = a$. Trong $\\triangle MNP$: $\\cos\\widehat{MPN} = \\frac{MP^2 + NP^2 - MN^2}{2 \\cdot MP \\cdot NP} = \\frac{a^2 + a^2 - 3a^2}{2a^2} = -\\frac{1}{2} \\Rightarrow \\widehat{MPN} = 120^\\circ$. Vậy $(AB, CD) = 180^\\circ - 120^\\circ = 60^\\circ$.'
  },
  {
    prompt: 'Cho tứ diện $ABCD$ có $AB \\perp CD$. Gọi $M, N, P, Q$ lần lượt là trung điểm của các cạnh $AC, BC, BD, AD$. Tứ giác $MNPQ$ là hình gì?',
    options: [
      { id: 'A', text: 'Hình thang cân' },
      { id: 'B', text: 'Hình chữ nhật' },
      { id: 'C', text: 'Hình thoi' },
      { id: 'D', text: 'Hình bình hành không có góc vuông' }
    ],
    correctOptionId: 'B',
    explanation: 'Theo tính chất đường trung bình, $MN \\parallel AB, PQ \\parallel AB, MN = PQ = \\frac{1}{2}AB$ và $NP \\parallel CD$. Vì $AB \\perp CD$ nên $MN \\perp NP$, suy ra hình bình hành $MNPQ$ là hình chữ nhật.'
  },
  {
    prompt: 'Cho hình hộp chữ nhật $ABCD.A\'B\'C\'D\'$ có $AB = a, AD = a\\sqrt{3}$. Góc giữa hai đường thẳng $AC$ và $B\'D\'$ bằng:',
    options: [
      { id: 'A', text: '$30^\\circ$' },
      { id: 'B', text: '$45^\\circ$' },
      { id: 'C', text: '$60^\\circ$' },
      { id: 'D', text: '$90^\\circ$' }
    ],
    correctOptionId: 'C',
    explanation: 'Trong hình chữ nhật $ABCD$, $\\tan\\widehat{BAC} = \\frac{BC}{AB} = \\sqrt{3} \\Rightarrow \\widehat{BAC} = 60^\\circ$. Gọi $O = AC \\cap BD$, tam giác $OAB$ cân tại $O$ có $\\widehat{OAB} = 60^\\circ$ nên $\\triangle OAB$ đều $\\Rightarrow \\widehat{AOB} = 60^\\circ$. Vì $B\'D\' \\parallel BD$ nên $(AC, B\'D\') = (AC, BD) = 60^\\circ$.',
    tikzType: 'custom',
    tikzCode: TIKZ_CUBE_ABCD
  }
];

export const b22P2A: CompactTF[] = [
  {
    stem: 'Cho hình lập phương $ABCD.A\'B\'C\'D\'$ cạnh $a$. Xét tính đúng sai của các mệnh đề sau:',
    tikzType: 'custom',
    tikzCode: TIKZ_CUBE_ABCD,
    statements: [
      {
        id: 'a',
        text: 'Góc giữa hai đường thẳng $AB$ và $DD\'$ bằng $90^\\circ$.',
        isTrue: true,
        explanation: 'Đúng vì $DD\' \\parallel AA\'$ và $AB \\perp AA\'$ nên $AB \\perp DD\'$, góc bằng $90^\\circ$.'
      },
      {
        id: 'b',
        text: 'Góc giữa hai đường thẳng $AC$ và $B\'C\'$ bằng $60^\\circ$.',
        isTrue: false,
        explanation: 'Sai vì $B\'C\' \\parallel BC$ nên $(AC, B\'C\') = (AC, BC) = \\widehat{ACB} = 45^\\circ$.'
      },
      {
        id: 'c',
        text: 'Góc giữa hai đường thẳng $A\'C\'$ và $B\'C$ bằng $60^\\circ$.',
        isTrue: true,
        explanation: 'Đúng vì $\\triangle A\'B\'C$ có $A\'B\'$? Không, $A\'C\' = B\'C = A\'B = a\\sqrt{2}$ nên $\\triangle A\'B\'C$ vuông còn $\\triangle A\'C\'B$ đều cạnh $a\\sqrt{2}$, mà $A\'C\'$ và $B\'C$ cắt nhau tại $C\'$ tạo tam giác đều $A\'B\'C$? Chú ý $A\'C\' = B\'C = A\'B = a\\sqrt{2}$ nên $\\triangle A\'BC\'$ đều cạnh $a\\sqrt{2} \\Rightarrow (A\'C\', BC\') = 60^\\circ$.'
      },
      {
        id: 'd',
        text: 'Hai đường thẳng $BD$ và $A\'C\'$ vuông góc với nhau.',
        isTrue: true,
        explanation: 'Đúng vì $A\'C\' \\parallel AC$ và $AC \\perp BD$ nên $A\'C\' \\perp BD$.'
      }
    ]
  },
  {
    stem: 'Cho tứ diện đều $ABCD$ có tất cả các cạnh bằng $a$. Gọi $M, N$ lần lượt là trung điểm của các cạnh $AB$ và $CD$. Xét tính đúng sai của các mệnh đề sau:',
    tikzType: 'custom',
    tikzCode: TIKZ_TETRA_ABCD_MN,
    statements: [
      {
        id: 'a',
        text: 'Độ dài các đoạn trung tuyến $AN$ và $BN$ cùng bằng $\\frac{a\\sqrt{3}}{2}$.',
        isTrue: true,
        explanation: 'Đúng vì $\\triangle ACD$ và $\\triangle BCD$ là các tam giác đều cạnh $a$ nên trung tuyến $AN = BN = \\frac{a\\sqrt{3}}{2}$.'
      },
      {
        id: 'b',
        text: 'Tam giác $NAB$ là tam giác cân tại $N$ nên trung tuyến $NM$ vuông góc với $AB$.',
        isTrue: true,
        explanation: 'Đúng vì $NA = NB = \\frac{a\\sqrt{3}}{2}$ và $M$ là trung điểm $AB$ nên $NM \\perp AB$.'
      },
      {
        id: 'c',
        text: 'Độ dài đoạn thẳng $MN$ bằng $\\frac{a\\sqrt{3}}{2}$.',
        isTrue: false,
        explanation: 'Sai vì trong $\\triangle ANM$ vuông tại $M$: $MN = \\sqrt{AN^2 - AM^2} = \\sqrt{\\frac{3a^2}{4} - \\frac{a^2}{4}} = \\frac{a\\sqrt{2}}{2}$.'
      },
      {
        id: 'd',
        text: 'Hai đường thẳng đối diện $AB$ và $CD$ vuông góc với nhau.',
        isTrue: true,
        explanation: 'Đúng vì $\\overrightarrow{AB} \\cdot \\overrightarrow{CD} = \\overrightarrow{AB} \\cdot (\\overrightarrow{AD} - \\overrightarrow{AC}) = a^2 \\cos 60^\\circ - a^2 \\cos 60^\\circ = 0 \\Rightarrow AB \\perp CD$.'
      }
    ]
  }
];

export const b22P3A: CompactSA[] = [
  {
    prompt: 'Cho hình lập phương $ABCD.A\'B\'C\'D\'$. Số đo góc (đơn vị: độ) giữa hai đường thẳng $AC$ và $DA\'$ bằng bao nhiêu?',
    correctAnswer: '60',
    acceptedAnswers: ['60'],
    explanation: 'Vì $DA\' \\parallel CB\'$ nên $(AC, DA\') = (AC, CB\')$. Tam giác $ACB\'$ có $AC = CB\' = B\'A = a\\sqrt{2}$ nên là tam giác đều, suy ra $(AC, DA\') = 60^\\circ$.',
    tikzType: 'custom',
    tikzCode: TIKZ_CUBE_ABCD
  },
  {
    prompt: 'Cho hình lăng trụ đứng $ABC.A\'B\'C\'$ có đáy $ABC$ là tam giác vuông cân tại $A$. Số đo góc (đơn vị: độ) giữa hai đường thẳng $AB$ và $B\'C\'$ bằng bao nhiêu?',
    correctAnswer: '45',
    acceptedAnswers: ['45'],
    explanation: 'Vì $B\'C\' \\parallel BC$ nên $(AB, B\'C\') = (AB, BC) = \\widehat{ABC} = 45^\\circ$ (do $\\triangle ABC$ vuông cân tại $A$).',
    tikzType: 'custom',
    tikzCode: TIKZ_RIGHT_PRISM_ABCA1B1C1
  },
  {
    prompt: 'Cho tứ diện $ABCD$ có $AB = CD = 6$. Gọi $I, J$ lần lượt là trung điểm của $BC$ và $AD$, biết $IJ = 3\\sqrt{2}$. Số đo góc (đơn vị: độ) giữa hai đường thẳng $AB$ và $CD$ bằng bao nhiêu?',
    correctAnswer: '90',
    acceptedAnswers: ['90'],
    explanation: 'Gọi $K$ là trung điểm $AC$. Ta có $IK = \\frac{1}{2}AB = 3$ và $JK = \\frac{1}{2}CD = 3$. Vì $IK^2 + JK^2 = 9 + 9 = 18 = IJ^2$ nên $\\triangle IJK$ vuông tại $K \\Rightarrow (AB, CD) = (IK, JK) = 90^\\circ$.'
  },
  {
    prompt: 'Cho hình chóp $S.ABCD$ có tất cả các cạnh đều bằng $a$. Số đo góc (đơn vị: độ) giữa hai đường thẳng $SA$ và $CD$ bằng bao nhiêu?',
    correctAnswer: '60',
    acceptedAnswers: ['60'],
    explanation: 'Vì đáy $ABCD$ là hình thoi (hình vuông) nên $CD \\parallel AB$. Do đó $(SA, CD) = (SA, AB) = \\widehat{SAB} = 60^\\circ$ (vì $\\triangle SAB$ đều cạnh $a$).',
    tikzType: 'custom',
    tikzCode: TIKZ_PYR_REGULAR_SABCD
  }
];

export const b22P4A: CompactSO[] = [
  {
    prompt: 'Sắp xếp các bước tính góc giữa hai đường thẳng $AB\'$ và $CD\'$ trong hình lập phương $ABCD.A\'B\'C\'D\'$:',
    tikzType: 'custom',
    tikzCode: TIKZ_CUBE_ABCD,
    steps: [
      { id: '1', text: 'Nhận xét tứ giác $ABC\'D\'$ có $AB \\parallel C\'D\'$ và $AB = C\'D\'$ nên là hình bình hành, suy ra $AB\' \\parallel DC\'$.' },
      { id: '2', text: 'Do đó góc giữa hai đường thẳng $AB\'$ và $CD\'$ bằng góc giữa hai đường thẳng $DC\'$ và $CD\'$ trong mặt phẳng $(CDD\'C\')$.' },
      { id: '3', text: 'Vì mặt bên $CDD\'C\'$ là hình vuông nên hai đường chéo $DC\'$ và $CD\'$ vuông góc với nhau.' },
      { id: '4', text: 'Kết luận $(AB\', CD\') = 90^\\circ$.' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Thay $AB\'$ bởi đường thẳng song song $DC\'$, sử dụng tính chất hai đường chéo hình vuông $DC\' \\perp CD\'$ suy ra góc bằng $90^\\circ$.'
  },
  {
    prompt: 'Sắp xếp các bước chứng minh $AB \\perp CD$ trong tứ diện đều $ABCD$ cạnh $a$:',
    steps: [
      { id: '1', text: 'Phân tích vectơ $\\overrightarrow{CD} = \\overrightarrow{AD} - \\overrightarrow{AC}$ theo quy tắc hiệu hai vectơ.' },
      { id: '2', text: 'Lập tích vô hướng: $\\overrightarrow{AB} \\cdot \\overrightarrow{CD} = \\overrightarrow{AB} \\cdot (\\overrightarrow{AD} - \\overrightarrow{AC}) = \\overrightarrow{AB} \\cdot \\overrightarrow{AD} - \\overrightarrow{AB} \\cdot \\overrightarrow{AC}$.' },
      { id: '3', text: 'Vì các mặt $\\triangle ABD$ và $\\triangle ABC$ là tam giác đều cạnh $a$ nên $\\overrightarrow{AB} \\cdot \\overrightarrow{AD} = \\overrightarrow{AB} \\cdot \\overrightarrow{AC} = a^2 \\cos 60^\\circ = \\frac{a^2}{2}$.' },
      { id: '4', text: 'Suy ra $\\overrightarrow{AB} \\cdot \\overrightarrow{CD} = 0$, tức là $AB \\perp CD$.' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Dùng tích vô hướng $\\overrightarrow{AB} \\cdot (\\overrightarrow{AD} - \\overrightarrow{AC}) = 0 \\Rightarrow AB \\perp CD$.'
  },
  {
    prompt: 'Sắp xếp các bước xác định góc giữa hai đường thẳng $MN$ và $BC$ trong tứ diện $ABCD$ biết $M, N, P$ lần lượt là trung điểm của $AB, CD, AC$ và $AB = BC = a$:',
    steps: [
      { id: '1', text: 'Trong $\\triangle ABC$, $MP$ là đường trung bình nên $MP \\parallel BC$ và $MP = \\frac{1}{2}BC = \\frac{a}{2}$.' },
      { id: '2', text: 'Trong $\\triangle ACD$ (giả sử $AD = a$ và $MN = \\frac{a\\sqrt{2}}{2}$), $NP$ là đường trung bình nên $NP = \\frac{1}{2}AD = \\frac{a}{2}$.' },
      { id: '3', text: 'Xét $\\triangle MNP$ có $MP^2 + NP^2 = \\frac{a^2}{4} + \\frac{a^2}{4} = \\frac{a^2}{2} = MN^2$ nên $\\triangle MNP$ vuông cân tại $P$, suy ra $\\widehat{PMN} = 45^\\circ$.' },
      { id: '4', text: 'Vì $MP \\parallel BC$ nên kết luận $(MN, BC) = (MN, MP) = \\widehat{PMN} = 45^\\circ$.' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Dựng đường trung bình $MP \\parallel BC$, tính các cạnh của $\\triangle MNP$ để suy ra $(MN, BC) = 45^\\circ$.'
  },
  {
    prompt: 'Sắp xếp các bước tính góc giữa hai đường thẳng $AA\'$ và $BC$ trong hình lăng trụ đứng $ABC.A\'B\'C\'$:',
    tikzType: 'custom',
    tikzCode: TIKZ_RIGHT_PRISM_ABCA1B1C1,
    steps: [
      { id: '1', text: 'Trong hình lăng trụ đứng $ABC.A\'B\'C\'$, các mặt bên đều là các hình chữ nhật.' },
      { id: '2', text: 'Các cạnh bên song song với nhau nên $AA\' \\parallel BB\'$.' },
      { id: '3', text: 'Vì mặt bên $BCC\'B\'$ là hình chữ nhật nên $BB\' \\perp BC$.' },
      { id: '4', text: 'Từ $AA\' \\parallel BB\'$ và $BB\' \\perp BC$, suy ra $AA\' \\perp BC$ hay $(AA\', BC) = 90^\\circ$.' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Từ $AA\' \\parallel BB\'$ và $BB\' \\perp BC$ suy ra $AA\' \\perp BC$, góc bằng $90^\\circ$.'
  }
];

export const b22P1B: CompactMC[] = [
  {
    prompt: 'Hai đường thẳng $a$ và $b$ trong không gian được gọi là vuông góc với nhau khi góc giữa chúng bằng:',
    options: [
      { id: 'A', text: '$0^\\circ$' },
      { id: 'B', text: '$45^\\circ$' },
      { id: 'C', text: '$90^\\circ$' },
      { id: 'D', text: '$180^\\circ$' }
    ],
    correctOptionId: 'C',
    explanation: 'Theo định nghĩa: hai đường thẳng $a, b$ vuông góc với nhau ($a \\perp b$) khi và chỉ khi $(a, b) = 90^\\circ$.'
  },
  {
    prompt: 'Trong không gian, cho hai đường thẳng vuông góc $a \\perp b$. Vị trí tương đối của $a$ và $b$ có thể là:',
    options: [
      { id: 'A', text: 'Chỉ có thể cắt nhau' },
      { id: 'B', text: 'Chỉ có thể chéo nhau' },
      { id: 'C', text: 'Cắt nhau hoặc chéo nhau' },
      { id: 'D', text: 'Song song hoặc cắt nhau' }
    ],
    correctOptionId: 'C',
    explanation: 'Trong không gian, hai đường thẳng vuông góc với nhau có thể cắt nhau hoặc chéo nhau.'
  },
  {
    prompt: 'Cho hình lập phương $ABCD.A\'B\'C\'D\'$. Góc giữa hai đường thẳng $AA\'$ và $CD$ bằng:',
    options: [
      { id: 'A', text: '$45^\\circ$' },
      { id: 'B', text: '$60^\\circ$' },
      { id: 'C', text: '$90^\\circ$' },
      { id: 'D', text: '$30^\\circ$' }
    ],
    correctOptionId: 'C',
    explanation: 'Vì $AA\' \\parallel DD\'$ và $DD\' \\perp CD$ nên $(AA\', CD) = (DD\', CD) = 90^\\circ$.',
    tikzType: 'custom',
    tikzCode: TIKZ_CUBE_ABCD
  },
  {
    prompt: 'Cho hình lập phương $ABCD.A\'B\'C\'D\'$. Góc giữa hai đường thẳng $A\'B$ và $B\'C$ bằng:',
    options: [
      { id: 'A', text: '$30^\\circ$' },
      { id: 'B', text: '$45^\\circ$' },
      { id: 'C', text: '$60^\\circ$' },
      { id: 'D', text: '$90^\\circ$' }
    ],
    correctOptionId: 'C',
    explanation: 'Vì $A\'B \\parallel D\'C$ nên $(A\'B, B\'C) = (D\'C, B\'C)$. Tam giác $B\'CD\'$ đều (ba cạnh là đường chéo các mặt hình vuông bằng $a\\sqrt{2}$) nên góc bằng $60^\\circ$.',
    tikzType: 'custom',
    tikzCode: TIKZ_CUBE_ABCD
  },
  {
    prompt: 'Cho hình lập phương $ABCD.A\'B\'C\'D\'$. Góc giữa hai đường thẳng $AB$ và $A\'C\'$ bằng:',
    options: [
      { id: 'A', text: '$45^\\circ$' },
      { id: 'B', text: '$60^\\circ$' },
      { id: 'C', text: '$90^\\circ$' },
      { id: 'D', text: '$30^\\circ$' }
    ],
    correctOptionId: 'A',
    explanation: 'Vì $A\'C\' \\parallel AC$ nên $(AB, A\'C\') = (AB, AC) = \\widehat{BAC} = 45^\\circ$.',
    tikzType: 'custom',
    tikzCode: TIKZ_CUBE_ABCD
  },
  {
    prompt: 'Cho tứ diện đều $ABCD$. Gọi $M, N$ lần lượt là trung điểm của $BC$ và $BD$. Góc giữa hai đường thẳng $MN$ và $AB$ bằng:',
    options: [
      { id: 'A', text: '$30^\\circ$' },
      { id: 'B', text: '$45^\\circ$' },
      { id: 'C', text: '$60^\\circ$' },
      { id: 'D', text: '$90^\\circ$' }
    ],
    correctOptionId: 'D',
    explanation: 'Vì $MN$ là đường trung bình của $\\triangle BCD$ nên $MN \\parallel CD$. Mà trong tứ diện đều, hai cạnh đối $AB$ và $CD$ vuông góc với nhau ($AB \\perp CD$), do đó $(MN, AB) = (CD, AB) = 90^\\circ$.'
  },
  {
    prompt: 'Cho tứ diện đều $ABCD$. Gọi $E, F$ lần lượt là trung điểm của $BC$ và $BD$. Góc giữa hai đường thẳng $EF$ và $AD$ bằng:',
    options: [
      { id: 'A', text: '$30^\\circ$' },
      { id: 'B', text: '$45^\\circ$' },
      { id: 'C', text: '$60^\\circ$' },
      { id: 'D', text: '$90^\\circ$' }
    ],
    correctOptionId: 'C',
    explanation: 'Vì $EF$ là đường trung bình của $\\triangle BCD$ nên $EF \\parallel CD$. Do đó $(EF, AD) = (CD, AD) = \\widehat{ADC} = 60^\\circ$ (vì $\\triangle ACD$ đều).'
  },
  {
    prompt: 'Cho hình chóp tứ giác đều $S.ABCD$ có tất cả các cạnh đều bằng $a$. Góc giữa hai đường thẳng $SB$ và $AD$ bằng:',
    options: [
      { id: 'A', text: '$30^\\circ$' },
      { id: 'B', text: '$45^\\circ$' },
      { id: 'C', text: '$60^\\circ$' },
      { id: 'D', text: '$90^\\circ$' }
    ],
    correctOptionId: 'C',
    explanation: 'Vì $AD \\parallel BC$ nên $(SB, AD) = (SB, BC) = \\widehat{SBC} = 60^\\circ$ (do $\\triangle SBC$ đều cạnh $a$).',
    tikzType: 'custom',
    tikzCode: TIKZ_PYR_REGULAR_SABCD
  },
  {
    prompt: 'Cho tứ diện $OABC$ có $OA, OB, OC$ đôi một vuông góc với nhau và $OA = OB = OC = a$. Góc giữa hai đường thẳng $AB$ và $BC$ bằng:',
    options: [
      { id: 'A', text: '$30^\\circ$' },
      { id: 'B', text: '$45^\\circ$' },
      { id: 'C', text: '$60^\\circ$' },
      { id: 'D', text: '$90^\\circ$' }
    ],
    correctOptionId: 'C',
    explanation: 'Ta có $AB = BC = CA = a\\sqrt{2}$ nên $\\triangle ABC$ là tam giác đều, suy ra $(AB, BC) = 60^\\circ$.',
    tikzType: 'custom',
    tikzCode: TIKZ_TETRA_OABC_ORTHO
  },
  {
    prompt: 'Cho hình lăng trụ đứng $ABC.A\'B\'C\'$ có đáy là tam giác đều cạnh $a$ và cạnh bên $AA\' = a$. Góc giữa hai đường thẳng $AB\'$ và $BC\'$ có côsin bằng:',
    options: [
      { id: 'A', text: '$\\frac{1}{4}$' },
      { id: 'B', text: '$\\frac{1}{2}$' },
      { id: 'C', text: '$\\frac{\\sqrt{2}}{4}$' },
      { id: 'D', text: '$\\frac{3}{4}$' }
    ],
    correctOptionId: 'A',
    explanation: 'Ta có $AB\' = BC\' = a\\sqrt{2}$. Xét tích vô hướng: $\\overrightarrow{AB\'} \\cdot \\overrightarrow{BC\'} = (\\overrightarrow{AB} + \\overrightarrow{AA\'}) \\cdot (\\overrightarrow{BC} + \\overrightarrow{AA\'}) = \\overrightarrow{AB} \\cdot \\overrightarrow{BC} + AA\'^2 = -a^2 \\cos 60^\\circ + a^2 = \\frac{a^2}{2}$. Do đó $\\cos(AB\', BC\') = \\frac{a^2/2}{a\\sqrt{2} \\cdot a\\sqrt{2}} = \\frac{1}{4}$.',
    tikzType: 'custom',
    tikzCode: TIKZ_RIGHT_PRISM_ABCA1B1C1
  },
  {
    prompt: 'Cho tứ diện $ABCD$ có $AC = 8, BD = 6$. Gọi $M, N$ lần lượt là trung điểm của $AB$ và $CD$, biết $AC \\perp BD$. Độ dài đoạn thẳng $MN$ bằng:',
    options: [
      { id: 'A', text: '$5$' },
      { id: 'B', text: '$7$' },
      { id: 'C', text: '$10$' },
      { id: 'D', text: '$5\\sqrt{2}$' }
    ],
    correctOptionId: 'A',
    explanation: 'Gọi $P$ là trung điểm $BC$. Ta có $MP \\parallel AC, MP = \\frac{1}{2}AC = 4$ và $NP \\parallel BD, NP = \\frac{1}{2}BD = 3$. Vì $AC \\perp BD$ nên $MP \\perp NP \\Rightarrow MN = \\sqrt{MP^2 + NP^2} = \\sqrt{4^2 + 3^2} = 5$.',
    tikzType: 'custom',
    tikzCode: TIKZ_TETRA_ABCD_MN
  },
  {
    prompt: 'Trong không gian, cho hai vectơ chỉ phương $\\vec{u}, \\vec{v}$ của hai đường thẳng $a, b$ thỏa mãn $(\\vec{u}, \\vec{v}) = 135^\\circ$. Khi đó góc giữa hai đường thẳng $a$ và $b$ bằng:',
    options: [
      { id: 'A', text: '$135^\\circ$' },
      { id: 'B', text: '$45^\\circ$' },
      { id: 'C', text: '$65^\\circ$' },
      { id: 'D', text: '$90^\\circ$' }
    ],
    correctOptionId: 'B',
    explanation: 'Vì $(\\vec{u}, \\vec{v}) = 135^\\circ > 90^\\circ$ nên góc giữa hai đường thẳng là $(a, b) = 180^\\circ - 135^\\circ = 45^\\circ$.'
  }
];

export const b22P2B: CompactTF[] = [
  {
    stem: 'Cho tứ diện $OABC$ có ba cạnh $OA, OB, OC$ đôi một vuông góc với nhau và $OA = OB = OC = a$. Xét tính đúng sai của các mệnh đề sau:',
    tikzType: 'custom',
    tikzCode: TIKZ_TETRA_OABC_ORTHO,
    statements: [
      {
        id: 'a',
        text: 'Các tam giác $OAB, OBC, OCA$ đều là các tam giác vuông cân tại $O$.',
        isTrue: true,
        explanation: 'Đúng vì $OA, OB, OC$ đôi một vuông góc và bằng $a$.'
      },
      {
        id: 'b',
        text: 'Tam giác $ABC$ là tam giác đều có cạnh bằng $a\\sqrt{2}$.',
        isTrue: true,
        explanation: 'Đúng vì $AB = BC = CA = \\sqrt{a^2 + a^2} = a\\sqrt{2}$.'
      },
      {
        id: 'c',
        text: 'Góc giữa hai đường thẳng $OA$ và $BC$ bằng $60^\\circ$.',
        isTrue: false,
        explanation: 'Sai vì $\\overrightarrow{OA} \\cdot \\overrightarrow{BC} = \\overrightarrow{OA} \\cdot (\\overrightarrow{OC} - \\overrightarrow{OB}) = 0 \\Rightarrow OA \\perp BC$, tức góc bằng $90^\\circ$.'
      },
      {
        id: 'd',
        text: 'Các cặp cạnh đối của tứ diện $OABC$ đôi một vuông góc với nhau.',
        isTrue: true,
        explanation: 'Đúng vì hoàn toàn tương tự, $OA \\perp BC$, $OB \\perp AC$ và $OC \\perp AB$.'
      }
    ]
  },
  {
    stem: 'Cho hình chóp tứ giác đều $S.ABCD$ có tất cả các cạnh bằng $a$, tâm đáy là $O$. Xét tính đúng sai của các mệnh đề sau:',
    tikzType: 'custom',
    tikzCode: TIKZ_PYR_REGULAR_SABCD,
    statements: [
      {
        id: 'a',
        text: 'Góc giữa hai đường thẳng $SA$ và $AB$ bằng $60^\\circ$.',
        isTrue: true,
        explanation: 'Đúng vì $\\triangle SAB$ đều cạnh $a$ nên $\\widehat{SAB} = 60^\\circ$.'
      },
      {
        id: 'b',
        text: 'Góc giữa hai đường thẳng $SB$ và $CD$ bằng $60^\\circ$.',
        isTrue: true,
        explanation: 'Đúng vì $CD \\parallel AB$ nên $(SB, CD) = (SB, AB) = \\widehat{SBA} = 60^\\circ$.'
      },
      {
        id: 'c',
        text: 'Tam giác $SAC$ là tam giác đều.',
        isTrue: false,
        explanation: 'Sai vì $SA = SC = a$ còn $AC = a\\sqrt{2}$, nên $\\triangle SAC$ vuông cân tại $S$ ($SA^2 + SC^2 = AC^2$).'
      },
      {
        id: 'd',
        text: 'Hai đường thẳng $SA$ và $SC$ vuông góc với nhau.',
        isTrue: true,
        explanation: 'Đúng vì trong $\\triangle SAC$ có $SA^2 + SC^2 = 2a^2 = AC^2 \\Rightarrow SA \\perp SC$.'
      }
    ]
  }
];

export const b22P3B: CompactSA[] = [
  {
    prompt: 'Cho hình lập phương $ABCD.A\'B\'C\'D\'$. Số đo góc (đơn vị: độ) giữa hai đường thẳng $A\'C\'$ và $B\'C$ bằng bao nhiêu?',
    correctAnswer: '60',
    acceptedAnswers: ['60'],
    explanation: 'Tam giác $A\'B\'C$? Xét tam giác $A\'BC\'$: ba cạnh $A\'C\' = B\'C$? Chú ý hai đường thẳng $A\'C\'$ và $B\'C$: vì $B\'C \\parallel A\'D$ nên $(A\'C\', B\'C) = (A\'C\', A\'D) = \\widehat{C\'A\'D} = 60^\\circ$ (do $\\triangle A\'C\'D$ đều cạnh $a\\sqrt{2}$).',
    tikzType: 'custom',
    tikzCode: TIKZ_CUBE_ABCD
  },
  {
    prompt: 'Cho tứ diện $ABCD$ có $AC = 10, BD = 24$ và $AC \\perp BD$. Gọi $M, N$ lần lượt là trung điểm của $AB$ và $CD$. Tính độ dài đoạn thẳng $MN$.',
    correctAnswer: '13',
    acceptedAnswers: ['13'],
    explanation: 'Gọi $P$ là trung điểm $BC$. Ta có $MP = \\frac{1}{2}AC = 5$, $NP = \\frac{1}{2}BD = 12$ và $MP \\perp NP$ (do $AC \\perp BD$). Suy ra $MN = \\sqrt{5^2 + 12^2} = 13$.',
    tikzType: 'custom',
    tikzCode: TIKZ_TETRA_ABCD_MN
  },
  {
    prompt: 'Cho hình chóp $S.ABCD$ có tất cả các cạnh đều bằng $a$. Số đo góc (đơn vị: độ) giữa hai đường thẳng $SB$ và $SD$ bằng bao nhiêu?',
    correctAnswer: '90',
    acceptedAnswers: ['90'],
    explanation: 'Đáy $ABCD$ là hình vuông cạnh $a$ nên $BD = a\\sqrt{2}$. Trong $\\triangle SBD$ có $SB^2 + SD^2 = a^2 + a^2 = 2a^2 = BD^2$ nên $\\triangle SBD$ vuông tại $S \\Rightarrow (SB, SD) = 90^\\circ$.',
    tikzType: 'custom',
    tikzCode: TIKZ_PYR_REGULAR_SABCD
  },
  {
    prompt: 'Cho tứ diện đều $ABCD$ cạnh $a$. Gọi $M, N$ lần lượt là trung điểm của $AB$ và $CD$. Số đo góc (đơn vị: độ) giữa hai đường thẳng $MN$ và $CD$ bằng bao nhiêu?',
    correctAnswer: '90',
    acceptedAnswers: ['90'],
    explanation: 'Trong tứ diện đều $ABCD$, ta có $MC = MD = \\frac{a\\sqrt{3}}{2}$ nên $\\triangle MCD$ cân tại $M$. Vì $N$ là trung điểm $CD$ nên $MN \\perp CD$, tức góc bằng $90^\\circ$.',
    tikzType: 'custom',
    tikzCode: TIKZ_TETRA_ABCD_MN
  }
];

export const b22P4B: CompactSO[] = [
  {
    prompt: 'Sắp xếp các bước tính số đo góc giữa hai đường thẳng $SA$ và $SC$ trong hình chóp tứ giác đều $S.ABCD$ có tất cả các cạnh bằng $a$:',
    tikzType: 'custom',
    tikzCode: TIKZ_PYR_REGULAR_SABCD,
    steps: [
      { id: '1', text: 'Vì đáy $ABCD$ là hình vuông cạnh $a$ nên đường chéo $AC = a\\sqrt{2}$.' },
      { id: '2', text: 'Xét tam giác $SAC$ có $SA = SC = a$ và $AC = a\\sqrt{2}$.' },
      { id: '3', text: 'Kiểm tra hệ thức Pythagore đảo: $SA^2 + SC^2 = a^2 + a^2 = 2a^2 = AC^2$.' },
      { id: '4', text: 'Suy ra $\\triangle SAC$ vuông tại $S$, nên $(SA, SC) = 90^\\circ$.' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Tính $AC = a\\sqrt{2}$ và áp dụng định lí Pythagore đảo trong $\\triangle SAC$ suy ra $\\widehat{ASC} = 90^\\circ$.'
  },
  {
    prompt: 'Sắp xếp các bước chứng minh $OA \\perp BC$ trong tứ diện $OABC$ có $OA, OB, OC$ đôi một vuông góc:',
    tikzType: 'custom',
    tikzCode: TIKZ_TETRA_OABC_ORTHO,
    steps: [
      { id: '1', text: 'Biểu diễn vectơ $\\overrightarrow{BC}$ theo quy tắc ba điểm: $\\overrightarrow{BC} = \\overrightarrow{OC} - \\overrightarrow{OB}$.' },
      { id: '2', text: 'Lập tích vô hướng: $\\overrightarrow{OA} \\cdot \\overrightarrow{BC} = \\overrightarrow{OA} \\cdot \\overrightarrow{OC} - \\overrightarrow{OA} \\cdot \\overrightarrow{OB}$.' },
      { id: '3', text: 'Vì $OA \\perp OC$ và $OA \\perp OB$ nên $\\overrightarrow{OA} \\cdot \\overrightarrow{OC} = 0$ và $\\overrightarrow{OA} \\cdot \\overrightarrow{OB} = 0$.' },
      { id: '4', text: 'Suy ra $\\overrightarrow{OA} \\cdot \\overrightarrow{BC} = 0$, vậy $OA \\perp BC$.' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Phân tích $\\overrightarrow{BC} = \\overrightarrow{OC} - \\overrightarrow{OB}$ và dùng $\\overrightarrow{OA} \\cdot \\overrightarrow{OC} = \\overrightarrow{OA} \\cdot \\overrightarrow{OB} = 0$.'
  },
  {
    prompt: 'Sắp xếp các bước tính độ dài $MN$ trong tứ diện $ABCD$ có $AB = CD = 2a, AB \\perp CD$ và $M, N$ là trung điểm $BC, AD$:',
    steps: [
      { id: '1', text: 'Gọi $I$ là trung điểm của cạnh $AC$.' },
      { id: '2', text: 'Theo tính chất đường trung bình, $MI \\parallel AB, MI = a$ và $NI \\parallel CD, NI = a$.' },
      { id: '3', text: 'Vì $AB \\perp CD$ nên $MI \\perp NI$, suy ra tam giác $MIN$ vuông cân tại $I$.' },
      { id: '4', text: 'Áp dụng định lí Pythagore: $MN = \\sqrt{MI^2 + NI^2} = \\sqrt{a^2 + a^2} = a\\sqrt{2}$.' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Dựng trung điểm $I$ của $AC$, chứng minh $\\triangle MIN$ vuông cân tại $I$ có cạnh góc vuông $a$, suy ra $MN = a\\sqrt{2}$.'
  },
  {
    prompt: 'Sắp xếp các bước tính góc giữa hai đường thẳng $A\'C\'$ và $A\'D$ trong hình lập phương $ABCD.A\'B\'C\'D\'$ cạnh $a$:',
    tikzType: 'custom',
    tikzCode: TIKZ_CUBE_ABCD,
    steps: [
      { id: '1', text: 'Tính độ dài các đường chéo của ba mặt hình vuông: $A\'C\' = a\\sqrt{2}, A\'D = a\\sqrt{2}$ và $C\'D = a\\sqrt{2}$.' },
      { id: '2', text: 'Xét tam giác $A\'C\'D$ có ba cạnh bằng nhau $A\'C\' = A\'D = C\'D = a\\sqrt{2}$.' },
      { id: '3', text: 'Suy ra tam giác $A\'C\'D$ là tam giác đều, có $\\widehat{C\'A\'D} = 60^\\circ$.' },
      { id: '4', text: 'Kết luận góc giữa hai đường thẳng $A\'C\'$ và $A\'D$ bằng $60^\\circ$.' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Tam giác $A\'C\'D$ có ba cạnh là đường chéo các mặt hình vuông nên là tam giác đều, suy ra $(A\'C\', A\'D) = 60^\\circ$.'
  }
];

// ============================================================================
// BÀI 23. ĐƯỜNG THẲNG VUÔNG GÓC VỚI MẶT PHẲNG
// Trọng tâm: Định nghĩa d vuông góc (P), điều kiện đủ để d vuông góc (P) (vuông
// góc với hai đường thẳng cắt nhau trong (P)), tính chất, liên hệ giữa quan hệ
// song song và vuông góc.
// ============================================================================

export const b23P1A: CompactMC[] = [
  {
    prompt: 'Đường thẳng $d$ được gọi là vuông góc với mặt phẳng $(P)$ nếu:',
    options: [
      { id: 'A', text: '$d$ vuông góc với ít nhất một đường thẳng nằm trong $(P)$' },
      { id: 'B', text: '$d$ vuông góc với hai đường thẳng song song nằm trong $(P)$' },
      { id: 'C', text: '$d$ vuông góc với mọi đường thẳng nằm trong $(P)$' },
      { id: 'D', text: '$d$ cắt mặt phẳng $(P)$' }
    ],
    correctOptionId: 'C',
    explanation: 'Theo định nghĩa: Đường thẳng $d$ vuông góc với mặt phẳng $(P)$ nếu $d$ vuông góc với mọi đường thẳng $a$ nằm trong mặt phẳng $(P)$.'
  },
  {
    prompt: 'Điều kiện đủ để đường thẳng $d$ vuông góc với mặt phẳng $(P)$ là:',
    options: [
      { id: 'A', text: '$d$ vuông góc với hai đường thẳng phân biệt bất kì nằm trong $(P)$' },
      { id: 'B', text: '$d$ vuông góc với hai đường thẳng cắt nhau nằm trong $(P)$' },
      { id: 'C', text: '$d$ vuông góc với hai đường thẳng song song nằm trong $(P)$' },
      { id: 'D', text: '$d$ vuông góc với một đường thẳng nằm trong $(P)$' }
    ],
    correctOptionId: 'B',
    explanation: 'Theo định lí điều kiện đủ: Nếu một đường thẳng vuông góc với hai đường thẳng cắt nhau thuộc cùng một mặt phẳng thì nó vuông góc với mặt phẳng đó.'
  },
  {
    prompt: 'Cho hình chóp $S.ABC$ có $SA \\perp (ABC)$ và đáy $ABC$ là tam giác vuông tại $B$. Đường thẳng $BC$ vuông góc với mặt phẳng nào sau đây?',
    options: [
      { id: 'A', text: '$(SAC)$' },
      { id: 'B', text: '$(SAB)$' },
      { id: 'C', text: '$(SBC)$' },
      { id: 'D', text: '$(ABC)$' }
    ],
    correctOptionId: 'B',
    explanation: 'Ta có $BC \\perp AB$ (do $\\triangle ABC$ vuông tại $B$) và $BC \\perp SA$ (do $SA \\perp (ABC)$). Vì $SA, AB$ cắt nhau trong $(SAB)$ nên $BC \\perp (SAB)$.',
    tikzType: 'custom',
    tikzCode: TIKZ_PYR_SABC_SA_PERP
  },
  {
    prompt: 'Cho hình chóp $S.ABC$ có $SA \\perp (ABC)$, tam giác $ABC$ vuông tại $B$. Kẻ $AH \\perp SB$ tại $H$. Khẳng định nào sau đây là **đúng**?',
    options: [
      { id: 'A', text: '$AH \\perp (SBC)$' },
      { id: 'B', text: '$AH \\perp (SAC)$' },
      { id: 'C', text: '$AH \\perp (ABC)$' },
      { id: 'D', text: '$AH \\parallel BC$' }
    ],
    correctOptionId: 'A',
    explanation: 'Vì $BC \\perp (SAB)$ và $AH \\subset (SAB)$ nên $BC \\perp AH$. Mặt khác $AH \\perp SB$, mà $SB, BC$ cắt nhau trong $(SBC)$ nên $AH \\perp (SBC)$.',
    tikzType: 'custom',
    tikzCode: TIKZ_PYR_SABC_SA_PERP_AH
  },
  {
    prompt: 'Cho hình chóp $S.ABCD$ có đáy $ABCD$ là hình vuông và $SA \\perp (ABCD)$. Đường thẳng $BD$ vuông góc với mặt phẳng nào sau đây?',
    options: [
      { id: 'A', text: '$(SAB)$' },
      { id: 'B', text: '$(SAC)$' },
      { id: 'C', text: '$(SCD)$' },
      { id: 'D', text: '$(SBC)$' }
    ],
    correctOptionId: 'B',
    explanation: 'Vì $ABCD$ là hình vuông nên $BD \\perp AC$. Mặt khác $SA \\perp (ABCD) \\Rightarrow SA \\perp BD$. Do $SA, AC$ cắt nhau trong $(SAC)$ nên $BD \\perp (SAC)$.',
    tikzType: 'custom',
    tikzCode: TIKZ_PYR_SABCD_SA_PERP
  },
  {
    prompt: 'Cho hình chóp $S.ABCD$ có đáy $ABCD$ là hình chữ nhật và $SA \\perp (ABCD)$. Tam giác $SCD$ là tam giác gì?',
    options: [
      { id: 'A', text: 'Tam giác vuông tại $S$' },
      { id: 'B', text: 'Tam giác vuông tại $D$' },
      { id: 'C', text: 'Tam giác vuông tại $C$' },
      { id: 'D', text: 'Tam giác cân tại $S$' }
    ],
    correctOptionId: 'B',
    explanation: 'Ta có $CD \\perp AD$ (do $ABCD$ là hình chữ nhật) và $CD \\perp SA$ (do $SA \\perp (ABCD)$), suy ra $CD \\perp (SAD) \\Rightarrow CD \\perp SD$. Vậy $\\triangle SCD$ vuông tại $D$.',
    tikzType: 'custom',
    tikzCode: TIKZ_PYR_SABCD_SA_PERP
  },
  {
    prompt: 'Trong không gian, tập hợp tất cả các điểm cách đều hai đầu mút của đoạn thẳng $AB$ cho trước là:',
    options: [
      { id: 'A', text: 'Đường trung trực của đoạn thẳng $AB$' },
      { id: 'B', text: 'Mặt phẳng trung trực của đoạn thẳng $AB$' },
      { id: 'C', text: 'Mặt cầu đường kính $AB$' },
      { id: 'D', text: 'Trung điểm $I$ của đoạn thẳng $AB$' }
    ],
    correctOptionId: 'B',
    explanation: 'Trong không gian, tập hợp các điểm cách đều hai điểm phân biệt $A, B$ là mặt phẳng trung trực của đoạn thẳng $AB$ (mặt phẳng đi qua trung điểm $I$ của $AB$ và vuông góc với $AB$).'
  },
  {
    prompt: 'Trong không gian, cho hai đường thẳng phân biệt $a, b$ và mặt phẳng $(P)$. Mệnh đề nào sau đây là **đúng**?',
    options: [
      { id: 'A', text: 'Nếu $a \\perp (P)$ và $b \\perp (P)$ thì $a \\parallel b$' },
      { id: 'B', text: 'Nếu $a \\perp (P)$ và $b \\perp a$ thì $b \\parallel (P)$' },
      { id: 'C', text: 'Nếu $a \\parallel (P)$ và $b \\perp a$ thì $b \\perp (P)$' },
      { id: 'D', text: 'Nếu $a \\perp (P)$ và $b \\parallel (P)$ thì $a \\parallel b$' }
    ],
    correctOptionId: 'A',
    explanation: 'Theo định lí liên hệ giữa quan hệ song song và vuông góc: Hai đường thẳng phân biệt cùng vuông góc với một mặt phẳng thì song song với nhau.'
  },
  {
    prompt: 'Cho tứ diện $OABC$ có $OA, OB, OC$ đôi một vuông góc. Khẳng định nào sau đây là **đúng**?',
    options: [
      { id: 'A', text: '$OA \\perp (OBC)$' },
      { id: 'B', text: '$OA \\perp (ABC)$' },
      { id: 'C', text: '$AB \\perp (OBC)$' },
      { id: 'D', text: '$BC \\perp (OAB)$' }
    ],
    correctOptionId: 'A',
    explanation: 'Vì $OA \\perp OB$ và $OA \\perp OC$, mà $OB, OC$ cắt nhau trong $(OBC)$ nên $OA \\perp (OBC)$.',
    tikzType: 'custom',
    tikzCode: TIKZ_TETRA_OABC_ORTHO
  },
  {
    prompt: 'Cho hình lập phương $ABCD.A\'B\'C\'D\'$. Đường thẳng $AB\'$ vuông góc với mặt phẳng nào sau đây?',
    options: [
      { id: 'A', text: '$(A\'B\'C\'D\')$' },
      { id: 'B', text: '$(A\'BCD\')$' },
      { id: 'C', text: '$(BDD\'B\')$' },
      { id: 'D', text: '$(ACC\'A\')$' }
    ],
    correctOptionId: 'B',
    explanation: 'Ta có $AB\' \\perp A\'B$ (hai đường chéo hình vuông $ABB\'A\'$) và $AB\' \\perp BC$ (do $BC \\perp (ABB\'A\')$). Vì $A\'B, BC$ cắt nhau trong $(A\'BCD\')$ nên $AB\' \\perp (A\'BCD\')$.',
    tikzType: 'custom',
    tikzCode: TIKZ_CUBE_ABCD
  },
  {
    prompt: 'Cho hình chóp $S.ABC$ có $SA = SB = SC$ và tam giác $ABC$ đều. Gọi $G$ là trọng tâm tam giác $ABC$. Khẳng định nào sau đây là **đúng**?',
    options: [
      { id: 'A', text: '$SG \\perp (ABC)$' },
      { id: 'B', text: '$SA \\perp (ABC)$' },
      { id: 'C', text: '$SG \\perp (SAB)$' },
      { id: 'D', text: '$AB \\perp (SAC)$' }
    ],
    correctOptionId: 'A',
    explanation: 'Vì $S.ABC$ là hình chóp tam giác đều nên trọng tâm $G$ là tâm đường tròn ngoại tiếp $\\triangle ABC$ cách đều $A, B, C$; kết hợp $SA = SB = SC$ suy ra $SG$ thuộc trục của $\\triangle ABC$, tức $SG \\perp (ABC)$.'
  },
  {
    prompt: 'Cho hình lăng trụ đứng $ABC.A\'B\'C\'$ có đáy $ABC$ là tam giác cân tại $A$. Gọi $M$ là trung điểm của $BC$. Đường thẳng $AM$ vuông góc với mặt phẳng nào sau đây?',
    options: [
      { id: 'A', text: '$(ABB\'A\')$' },
      { id: 'B', text: '$(ACC\'A\')$' },
      { id: 'C', text: '$(BCC\'B\')$' },
      { id: 'D', text: '$(A\'B\'C\')$' }
    ],
    correctOptionId: 'C',
    explanation: 'Vì $\\triangle ABC$ cân tại $A$ nên trung tuyến $AM \\perp BC$. Mặt khác $BB\' \\perp (ABC) \\Rightarrow BB\' \\perp AM$. Do $BC, BB\'$ cắt nhau trong $(BCC\'B\')$ nên $AM \\perp (BCC\'B\')$.',
    tikzType: 'custom',
    tikzCode: TIKZ_RIGHT_PRISM_ABCA1B1C1
  }
];

export const b23P2A: CompactTF[] = [
  {
    stem: 'Cho hình chóp $S.ABCD$ có đáy $ABCD$ là hình vuông cạnh $a$ tâm $O$, cạnh bên $SA \\perp (ABCD)$. Xét tính đúng sai của các mệnh đề sau:',
    tikzType: 'custom',
    tikzCode: TIKZ_PYR_SABCD_SA_PERP,
    statements: [
      {
        id: 'a',
        text: 'Đường thẳng $BC$ vuông góc với mặt phẳng $(SAB)$.',
        isTrue: true,
        explanation: 'Đúng vì $BC \\perp AB$ và $BC \\perp SA$ (do $SA \\perp (ABCD)$) nên $BC \\perp (SAB)$.'
      },
      {
        id: 'b',
        text: 'Đường thẳng $CD$ vuông góc với mặt phẳng $(SAD)$.',
        isTrue: true,
        explanation: 'Đúng vì $CD \\perp AD$ và $CD \\perp SA$ nên $CD \\perp (SAD)$.'
      },
      {
        id: 'c',
        text: 'Đường thẳng $BD$ vuông góc với đường thẳng $SC$.',
        isTrue: true,
        explanation: 'Đúng vì $BD \\perp AC$ và $BD \\perp SA \\Rightarrow BD \\perp (SAC)$, mà $SC \\subset (SAC)$ nên $BD \\perp SC$.'
      },
      {
        id: 'd',
        text: 'Đường thẳng $SO$ vuông góc với mặt phẳng $(ABCD)$.',
        isTrue: false,
        explanation: 'Sai vì $SA \\perp (ABCD)$ và $O \\ne A$ nên qua $S$ chỉ có duy nhất đường thẳng $SA$ vuông góc với $(ABCD)$, do đó $SO$ không vuông góc với $(ABCD)$.'
      }
    ]
  },
  {
    stem: 'Cho tứ diện $OABC$ có $OA, OB, OC$ đôi một vuông góc với nhau. Gọi $H$ là trực tâm của tam giác $ABC$. Xét tính đúng sai của các mệnh đề sau:',
    tikzType: 'custom',
    tikzCode: TIKZ_TETRA_OABC_ORTHO,
    statements: [
      {
        id: 'a',
        text: 'Đường thẳng $OA$ vuông góc với mặt phẳng $(OBC)$, suy ra $OA \\perp BC$.',
        isTrue: true,
        explanation: 'Đúng vì $OA \\perp OB$ và $OA \\perp OC \\Rightarrow OA \\perp (OBC) \\Rightarrow OA \\perp BC$.'
      },
      {
        id: 'b',
        text: 'Đường thẳng $BC$ vuông góc với mặt phẳng $(OAH)$.',
        isTrue: true,
        explanation: 'Đúng vì $BC \\perp AH$ ($H$ là trực tâm $\\triangle ABC$) và $BC \\perp OA$, mà $OA, AH$ cắt nhau tại $A$ nên $BC \\perp (OAH)$.'
      },
      {
        id: 'c',
        text: 'Đường thẳng $OH$ vuông góc với mặt phẳng $(ABC)$.',
        isTrue: true,
        explanation: 'Đúng vì $BC \\perp (OAH) \\Rightarrow BC \\perp OH$; chứng minh tương tự $AB \\perp (OCH) \\Rightarrow AB \\perp OH$. Do đó $OH \\perp (ABC)$.'
      },
      {
        id: 'd',
        text: 'Tam giác $ABC$ có thể là một tam giác tù.',
        isTrue: false,
        explanation: 'Sai vì $\\overrightarrow{AB} \\cdot \\overrightarrow{AC} = (\\overrightarrow{OB} - \\overrightarrow{OA}) \\cdot (\\overrightarrow{OC} - \\overrightarrow{OA}) = OA^2 > 0$, tương tự cho góc $B, C$ nên $\\triangle ABC$ luôn là tam giác nhọn.'
      }
    ]
  }
];

export const b23P3A: CompactSA[] = [
  {
    prompt: 'Cho hình chóp $S.ABCD$ có đáy $ABCD$ là hình chữ nhật và $SA \\perp (ABCD)$. Trong bốn mặt bên $(SAB), (SBC), (SCD), (SDA)$ của hình chóp, có tất cả bao nhiêu mặt bên là tam giác vuông?',
    correctAnswer: '4',
    acceptedAnswers: ['4'],
    explanation: 'Ta có $\\triangle SAB$ và $\\triangle SAD$ vuông tại $A$ (vì $SA \\perp (ABCD)$); $BC \\perp (SAB) \\Rightarrow \\triangle SBC$ vuông tại $B$; $CD \\perp (SAD) \\Rightarrow \\triangle SCD$ vuông tại $D$. Vậy cả $4$ mặt bên đều là tam giác vuông.',
    tikzType: 'custom',
    tikzCode: TIKZ_PYR_SABCD_SA_PERP
  },
  {
    prompt: 'Cho hình chóp $S.ABC$ có $SA \\perp (ABC)$, $SA = 3$, tam giác $ABC$ vuông tại $B$ có $AB = 4, BC = 12$. Tính độ dài cạnh $SC$.',
    correctAnswer: '13',
    acceptedAnswers: ['13'],
    explanation: 'Trong $\\triangle ABC$ vuông tại $B$: $AC^2 = AB^2 + BC^2 = 4^2 + 12^2 = 160$. Vì $SA \\perp (ABC)$ nên $\\triangle SAC$ vuông tại $A$: $SC = \\sqrt{SA^2 + AC^2} = \\sqrt{9 + 160} = \\sqrt{169} = 13$.',
    tikzType: 'custom',
    tikzCode: TIKZ_PYR_SABC_SA_PERP
  },
  {
    prompt: 'Cho hình chóp tứ giác đều $S.ABCD$ có cạnh đáy bằng $6\\sqrt{2}$ và cạnh bên bằng $10$. Gọi $O$ là tâm của đáy $ABCD$. Tính độ dài đường cao $SO$ của hình chóp.',
    correctAnswer: '8',
    acceptedAnswers: ['8'],
    explanation: 'Đáy $ABCD$ là hình vuông cạnh $a = 6\\sqrt{2}$ nên $AC = a\\sqrt{2} = 12 \\Rightarrow OA = 6$. Vì $SO \\perp (ABCD)$ nên $\\triangle SOA$ vuông tại $O$: $SO = \\sqrt{SA^2 - OA^2} = \\sqrt{10^2 - 6^2} = 8$.',
    tikzType: 'custom',
    tikzCode: TIKZ_PYR_REGULAR_SABCD
  },
  {
    prompt: 'Cho hình chóp $S.ABC$ có $SA \\perp (ABC)$, tam giác $ABC$ vuông tại $B$, biết $SA = 6$ và $AB = 8$. Kẻ $AH \\perp SB$ tại $H$. Tính độ dài đoạn thẳng $AH$.',
    correctAnswer: '4,8',
    acceptedAnswers: ['4,8', '4.8', '24/5'],
    explanation: 'Trong $\\triangle SAB$ vuông tại $A$, ta có $SB = \\sqrt{SA^2 + AB^2} = \\sqrt{6^2 + 8^2} = 10$. Đường cao $AH = \\frac{SA \\cdot AB}{SB} = \\frac{6 \\cdot 8}{10} = 4,8$.',
    tikzType: 'custom',
    tikzCode: TIKZ_PYR_SABC_SA_PERP_AH
  }
];

export const b23P4A: CompactSO[] = [
  {
    prompt: 'Sắp xếp các bước chứng minh $BC \\perp (SAB)$ trong hình chóp $S.ABC$ có $SA \\perp (ABC)$ và $\\triangle ABC$ vuông tại $B$:',
    tikzType: 'custom',
    tikzCode: TIKZ_PYR_SABC_SA_PERP,
    steps: [
      { id: '1', text: 'Vì $\\triangle ABC$ vuông tại $B$ nên ta có $BC \\perp AB$ (1).' },
      { id: '2', text: 'Vì $SA \\perp (ABC)$ và $BC \\subset (ABC)$ nên $SA \\perp BC$ hay $BC \\perp SA$ (2).' },
      { id: '3', text: 'Trong mặt phẳng $(SAB)$, hai đường thẳng $SA$ và $AB$ cắt nhau tại $A$ (3).' },
      { id: '4', text: 'Từ (1), (2) và (3), theo định lí điều kiện đủ, kết luận $BC \\perp (SAB)$.' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Chứng minh $BC$ vuông góc với hai đường thẳng cắt nhau $AB$ và $SA$ nằm trong mặt phẳng $(SAB)$.'
  },
  {
    prompt: 'Sắp xếp các bước chứng minh $BD \\perp SC$ trong hình chóp $S.ABCD$ có đáy $ABCD$ là hình thoi và $SA \\perp (ABCD)$:',
    tikzType: 'custom',
    tikzCode: TIKZ_PYR_SABCD_SA_PERP,
    steps: [
      { id: '1', text: 'Vì đáy $ABCD$ là hình thoi nên hai đường chéo vuông góc: $BD \\perp AC$.' },
      { id: '2', text: 'Vì $SA \\perp (ABCD)$ và $BD \\subset (ABCD)$ nên $BD \\perp SA$.' },
      { id: '3', text: 'Do $SA$ và $AC$ cắt nhau tại $A$ trong mặt phẳng $(SAC)$ nên $BD \\perp (SAC)$.' },
      { id: '4', text: 'Vì $SC \\subset (SAC)$ nên từ $BD \\perp (SAC)$ suy ra $BD \\perp SC$.' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Chứng minh $BD \\perp AC$ và $BD \\perp SA \\Rightarrow BD \\perp (SAC) \\Rightarrow BD \\perp SC$.'
  },
  {
    prompt: 'Sắp xếp các bước chứng minh $AH \\perp SC$ trong hình chóp $S.ABC$ có $SA \\perp (ABC), \\triangle ABC$ vuông tại $B$ và $AH \\perp SB$ tại $H$:',
    tikzType: 'custom',
    tikzCode: TIKZ_PYR_SABC_SA_PERP_AH,
    steps: [
      { id: '1', text: 'Từ $BC \\perp AB$ và $BC \\perp SA$, suy ra $BC \\perp (SAB)$.' },
      { id: '2', text: 'Vì $AH \\subset (SAB)$ nên $BC \\perp AH$.' },
      { id: '3', text: 'Kết hợp giả thiết $AH \\perp SB$ và $SB \\cap BC = B$ trong $(SBC)$, suy ra $AH \\perp (SBC)$.' },
      { id: '4', text: 'Mà $SC \\subset (SBC)$ nên $AH \\perp SC$.' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Từ $BC \\perp (SAB) \\Rightarrow BC \\perp AH$, kết hợp $AH \\perp SB \\Rightarrow AH \\perp (SBC) \\Rightarrow AH \\perp SC$.'
  },
  {
    prompt: 'Sắp xếp các bước chứng minh $CD \\perp (SHK)$ khi $SH \\perp (ABC)$ và $HK \\perp CD$:',
    steps: [
      { id: '1', text: 'Vì $SH \\perp (ABC)$ và $CD \\subset (ABC)$ nên $CD \\perp SH$.' },
      { id: '2', text: 'Theo giả thiết, trong mặt phẳng $(ABC)$ ta có $CD \\perp HK$.' },
      { id: '3', text: 'Nhận xét hai đường thẳng $SH$ và $HK$ cắt nhau tại $H$ và cùng nằm trong mặt phẳng $(SHK)$.' },
      { id: '4', text: 'Kết luận $CD \\perp (SHK)$.' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Chứng minh $CD \\perp SH$ và $CD \\perp HK$ với $SH \\cap HK = H$ trong $(SHK)$.'
  }
];

export const b23P1B: CompactMC[] = [
  {
    prompt: 'Trong không gian, có bao nhiêu mặt phẳng đi qua một điểm $M$ cho trước và vuông góc với một đường thẳng $d$ cho trước?',
    options: [
      { id: 'A', text: 'Vô số' },
      { id: 'B', text: 'Có duy nhất một mặt phẳng' },
      { id: 'C', text: 'Có đúng hai mặt phẳng' },
      { id: 'D', text: 'Không có mặt phẳng nào' }
    ],
    correctOptionId: 'B',
    explanation: 'Theo tính chất cơ bản: Có duy nhất một mặt phẳng đi qua một điểm cho trước và vuông góc với một đường thẳng cho trước.'
  },
  {
    prompt: 'Trong không gian, có bao nhiêu đường thẳng đi qua một điểm $O$ cho trước và vuông góc với một mặt phẳng $(P)$ cho trước?',
    options: [
      { id: 'A', text: 'Có duy nhất một đường thẳng' },
      { id: 'B', text: 'Có hai đường thẳng' },
      { id: 'C', text: 'Vô số đường thẳng' },
      { id: 'D', text: 'Không có đường thẳng nào' }
    ],
    correctOptionId: 'A',
    explanation: 'Theo tính chất cơ bản: Có duy nhất một đường thẳng đi qua một điểm cho trước và vuông góc với một mặt phẳng cho trước.'
  },
  {
    prompt: 'Trong không gian, cho hai mặt phẳng phân biệt $(P), (Q)$ cùng vuông góc với đường thẳng $d$. Khẳng định nào sau đây là **đúng**?',
    options: [
      { id: 'A', text: '$(P)$ cắt $(Q)$' },
      { id: 'B', text: '$(P) \\parallel (Q)$' },
      { id: 'C', text: '$(P) \\perp (Q)$' },
      { id: 'D', text: '$d \\subset (P)$' }
    ],
    correctOptionId: 'B',
    explanation: 'Hai mặt phẳng phân biệt cùng vuông góc với một đường thẳng thì song song với nhau: $(P) \\parallel (Q)$.'
  },
  {
    prompt: 'Cho hình chóp $S.ABC$ có $SA \\perp (ABC)$ và tam giác $ABC$ vuông tại $C$. Đường thẳng $BC$ vuông góc với mặt phẳng nào sau đây?',
    options: [
      { id: 'A', text: '$(SAB)$' },
      { id: 'B', text: '$(SAC)$' },
      { id: 'C', text: '$(SBC)$' },
      { id: 'D', text: '$(ABC)$' }
    ],
    correctOptionId: 'B',
    explanation: 'Vì $\\triangle ABC$ vuông tại $C$ nên $BC \\perp AC$. Mặt khác $SA \\perp (ABC) \\Rightarrow BC \\perp SA$. Do đó $BC \\perp (SAC)$.',
    tikzType: 'custom',
    tikzCode: TIKZ_PYR_SABC_SA_PERP
  },
  {
    prompt: 'Cho hình chóp $S.ABCD$ có đáy $ABCD$ là hình vuông tâm $O$ và $SA \\perp (ABCD)$. Gọi $H, K$ lần lượt là hình chiếu vuông góc của $A$ lên $SB, SD$. Đường thẳng $SC$ vuông góc với mặt phẳng nào sau đây?',
    options: [
      { id: 'A', text: '$(ABCD)$' },
      { id: 'B', text: '$(AHK)$' },
      { id: 'C', text: '$(SBD)$' },
      { id: 'D', text: '$(SAC)$' }
    ],
    correctOptionId: 'B',
    explanation: 'Ta có $BC \\perp (SAB) \\Rightarrow BC \\perp AH$; kết hợp $AH \\perp SB \\Rightarrow AH \\perp (SBC) \\Rightarrow AH \\perp SC$. Chứng minh tương tự $AK \\perp (SCD) \\Rightarrow AK \\perp SC$. Vậy $SC \\perp (AHK)$.',
    tikzType: 'custom',
    tikzCode: TIKZ_PYR_SABCD_SA_PERP
  },
  {
    prompt: 'Cho hình lập phương $ABCD.A\'B\'C\'D\'$. Đường thẳng $BD$ vuông góc với mặt phẳng nào sau đây?',
    options: [
      { id: 'A', text: '$(ABB\'A\')$' },
      { id: 'B', text: '$(ACC\'A\')$' },
      { id: 'C', text: '$(BCC\'B\')$' },
      { id: 'D', text: '$(ADD\'A\')$' }
    ],
    correctOptionId: 'B',
    explanation: 'Ta có $BD \\perp AC$ (hai đường chéo hình vuông) và $BD \\perp AA\'$ (do $AA\' \\perp (ABCD)$). Vì $AC, AA\'$ cắt nhau trong $(ACC\'A\')$ nên $BD \\perp (ACC\'A\')$.',
    tikzType: 'custom',
    tikzCode: TIKZ_CUBE_ABCD
  },
  {
    prompt: 'Cho hình chóp $S.ABC$ có đáy $ABC$ là tam giác cân tại $A$, cạnh bên $SA \\perp (ABC)$. Gọi $M$ là trung điểm của cạnh $BC$. Đường thẳng $BC$ vuông góc với mặt phẳng nào sau đây?',
    options: [
      { id: 'A', text: '$(SAB)$' },
      { id: 'B', text: '$(SAC)$' },
      { id: 'C', text: '$(SAM)$' },
      { id: 'D', text: '$(SBC)$' }
    ],
    correctOptionId: 'C',
    explanation: 'Vì $\\triangle ABC$ cân tại $A$ nên trung tuyến $AM \\perp BC$. Kết hợp $SA \\perp BC$ (do $SA \\perp (ABC)$) suy ra $BC \\perp (SAM)$.',
    tikzType: 'custom',
    tikzCode: TIKZ_PYR_SABC_SA_PERP
  },
  {
    prompt: 'Cho hình chóp tứ giác đều $S.ABCD$ có tâm đáy là $O$. Gọi $M$ là trung điểm của cạnh $CD$. Đường thẳng $CD$ vuông góc với mặt phẳng nào sau đây?',
    options: [
      { id: 'A', text: '$(SAC)$' },
      { id: 'B', text: '$(SBD)$' },
      { id: 'C', text: '$(SOM)$' },
      { id: 'D', text: '$(SAD)$' }
    ],
    correctOptionId: 'C',
    explanation: 'Ta có $SO \\perp (ABCD) \\Rightarrow SO \\perp CD$, và $OM$ là đường trung bình trong hình vuông nên $OM \\perp CD$. Do đó $CD \\perp (SOM)$.',
    tikzType: 'custom',
    tikzCode: TIKZ_PYR_REGULAR_SABCD
  },
  {
    prompt: 'Trong không gian, cho đường thẳng $a$ không nằm trong mặt phẳng $(P)$. Khẳng định "$a \\parallel (P)$" đúng khi nào?',
    options: [
      { id: 'A', text: 'Khi $a$ cùng vuông góc với một đường thẳng $d$ nào đó mà $d \\perp (P)$' },
      { id: 'B', text: 'Khi $a$ vuông góc với một đường thẳng nằm trong $(P)$' },
      { id: 'C', text: 'Khi $a$ cắt mặt phẳng $(P)$' },
      { id: 'D', text: 'Khi $a \\perp (P)$' }
    ],
    correctOptionId: 'A',
    explanation: 'Theo định lí: Nếu đường thẳng $a \\not\\subset (P)$ và $a$ vuông góc với đường thẳng $d$ mà $d \\perp (P)$ thì $a \\parallel (P)$.'
  },
  {
    prompt: 'Cho tứ diện $ABCD$ có $AB = AC$ và $DB = DC$. Gọi $I$ là trung điểm của cạnh $BC$. Đường thẳng $BC$ vuông góc với mặt phẳng nào?',
    options: [
      { id: 'A', text: '$(ABC)$' },
      { id: 'B', text: '$(BCD)$' },
      { id: 'C', text: '$(ADI)$' },
      { id: 'D', text: '$(ABD)$' }
    ],
    correctOptionId: 'C',
    explanation: 'Các tam giác $ABC$ và $DBC$ cân tại $A$ và $D$ nên trung tuyến $AI \\perp BC$ và $DI \\perp BC$. Vì $AI, DI$ cắt nhau tại $I$ trong $(ADI)$ nên $BC \\perp (ADI)$.'
  },
  {
    prompt: 'Cho hình lăng trụ đứng $ABC.A\'B\'C\'$ có đáy $ABC$ là tam giác vuông tại $B$. Đường thẳng $B\'C\'$ vuông góc với mặt phẳng nào sau đây?',
    options: [
      { id: 'A', text: '$(ABB\'A\')$' },
      { id: 'B', text: '$(ACC\'A\')$' },
      { id: 'C', text: '$(BCC\'B\')$' },
      { id: 'D', text: '$(ABC)$' }
    ],
    correctOptionId: 'A',
    explanation: 'Vì $\\triangle A\'B\'C\'$ vuông tại $B\'$ nên $B\'C\' \\perp A\'B\'$. Mặt khác $BB\' \\perp (A\'B\'C\') \\Rightarrow B\'C\' \\perp BB\'$. Do đó $B\'C\' \\perp (ABB\'A\')$.',
    tikzType: 'custom',
    tikzCode: TIKZ_RIGHT_PRISM_ABCA1B1C1
  },
  {
    prompt: 'Cho hình lập phương $ABCD.A\'B\'C\'D\'$. Đường chéo $AC\'$ của hình lập phương vuông góc với mặt phẳng nào sau đây?',
    options: [
      { id: 'A', text: '$(A\'BD)$' },
      { id: 'B', text: '$(ABCD)$' },
      { id: 'C', text: '$(ABB\'A\')$' },
      { id: 'D', text: '$(BCC\'B\')$' }
    ],
    correctOptionId: 'A',
    explanation: 'Ta có $BD \\perp (ACC\'A\') \\Rightarrow BD \\perp AC\'$; tương tự $A\'B \\perp (ABC\'D\') \\Rightarrow A\'B \\perp AC\'$. Vì $BD, A\'B$ cắt nhau trong $(A\'BD)$ nên $AC\' \\perp (A\'BD)$.',
    tikzType: 'custom',
    tikzCode: TIKZ_CUBE_ABCD
  }
];

export const b23P2B: CompactTF[] = [
  {
    stem: 'Cho hình lăng trụ đứng $ABC.A\'B\'C\'$ có đáy $ABC$ là tam giác đều cạnh $a$, gọi $M$ là trung điểm của cạnh $BC$. Xét tính đúng sai của các mệnh đề sau:',
    tikzType: 'custom',
    tikzCode: TIKZ_RIGHT_PRISM_ABCA1B1C1,
    statements: [
      {
        id: 'a',
        text: 'Các cạnh bên $AA\', BB\', CC\'$ đều vuông góc với mặt phẳng đáy $(ABC)$.',
        isTrue: true,
        explanation: 'Đúng theo định nghĩa hình lăng trụ đứng.'
      },
      {
        id: 'b',
        text: 'Đường thẳng $AM$ vuông góc với mặt phẳng bên $(BCC\'B\')$.',
        isTrue: true,
        explanation: 'Đúng vì $AM \\perp BC$ (trong $\\triangle ABC$ đều) và $AM \\perp BB\'$ (do $BB\' \\perp (ABC)$).'
      },
      {
        id: 'c',
        text: 'Đường thẳng $AM$ vuông góc với đường thẳng $B\'C$.',
        isTrue: true,
        explanation: 'Đúng vì $AM \\perp (BCC\'B\')$ và $B\'C \\subset (BCC\'B\')$ nên $AM \\perp B\'C$.'
      },
      {
        id: 'd',
        text: 'Tam giác $A\'BC$ là tam giác vuông tại $B$.',
        isTrue: false,
        explanation: 'Sai vì $A\'B = A\'C = \\sqrt{AA\'^2 + a^2}$ nên $\\triangle A\'BC$ cân tại $A\'$, không vuông tại $B$.'
      }
    ]
  },
  {
    stem: 'Cho hình chóp $S.ABC$ có $SA \\perp (ABC)$ và đáy $ABC$ là tam giác vuông tại $B$. Kẻ $AH \\perp SB$ tại $H$ và $AK \\perp SC$ tại $K$. Xét tính đúng sai của các mệnh đề sau:',
    tikzType: 'custom',
    tikzCode: TIKZ_PYR_SABC_SA_PERP_AH,
    statements: [
      {
        id: 'a',
        text: 'Đường thẳng $BC$ vuông góc với mặt phẳng $(SAB)$.',
        isTrue: true,
        explanation: 'Đúng vì $BC \\perp AB$ và $BC \\perp SA$.'
      },
      {
        id: 'b',
        text: 'Đường thẳng $AH$ vuông góc với mặt phẳng $(SBC)$.',
        isTrue: true,
        explanation: 'Đúng vì $AH \\perp SB$ và $AH \\perp BC$ (do $BC \\perp (SAB)$).'
      },
      {
        id: 'c',
        text: 'Đường thẳng $SC$ vuông góc với mặt phẳng $(AHK)$.',
        isTrue: true,
        explanation: 'Đúng vì $AH \\perp (SBC) \\Rightarrow AH \\perp SC$, kết hợp $AK \\perp SC$ suy ra $SC \\perp (AHK)$.'
      },
      {
        id: 'd',
        text: 'Tam giác $AHK$ là tam giác vuông tại $A$.',
        isTrue: false,
        explanation: 'Sai vì $AH \\perp (SBC)$ và $HK \\subset (SBC)$ nên $AH \\perp HK$, tức là $\\triangle AHK$ vuông tại $H$ chứ không vuông tại $A$.'
      }
    ]
  }
];

export const b23P3B: CompactSA[] = [
  {
    prompt: 'Cho hình chóp $S.ABCD$ có đáy $ABCD$ là hình vuông cạnh $6$, $SA \\perp (ABCD)$ và $SA = 8$. Tính độ dài cạnh bên $SB$.',
    correctAnswer: '10',
    acceptedAnswers: ['10'],
    explanation: 'Vì $SA \\perp (ABCD)$ nên $\\triangle SAB$ vuông tại $A$: $SB = \\sqrt{SA^2 + AB^2} = \\sqrt{8^2 + 6^2} = 10$.',
    tikzType: 'custom',
    tikzCode: TIKZ_PYR_SABCD_SA_PERP
  },
  {
    prompt: 'Cho hình chóp $S.ABCD$ có đáy $ABCD$ là hình vuông cạnh $4$, $SA \\perp (ABCD)$ và $SA = 3$. Tính diện tích của tam giác vuông $SBC$.',
    correctAnswer: '10',
    acceptedAnswers: ['10'],
    explanation: 'Ta có $SB = \\sqrt{SA^2 + AB^2} = \\sqrt{3^2 + 4^2} = 5$. Vì $BC \\perp (SAB)$ nên $BC \\perp SB$, suy ra $\\triangle SBC$ vuông tại $B$ có diện tích $S = \\frac{1}{2} SB \\cdot BC = \\frac{1}{2} \\cdot 5 \\cdot 4 = 10$.',
    tikzType: 'custom',
    tikzCode: TIKZ_PYR_SABCD_SA_PERP
  },
  {
    prompt: 'Cho tứ diện $OABC$ có $OA, OB, OC$ đôi một vuông góc với nhau và $OA = 3, OB = 6, OC = 6$. Gọi $H$ là hình chiếu vuông góc của $O$ trên mặt phẳng $(ABC)$. Tính giá trị của $OH^2$.',
    correctAnswer: '6',
    acceptedAnswers: ['6'],
    explanation: 'Trong tứ diện vuông $OABC$ có $OH \\perp (ABC)$, ta có $\\frac{1}{OH^2} = \\frac{1}{OA^2} + \\frac{1}{OB^2} + \\frac{1}{OC^2} = \\frac{1}{9} + \\frac{1}{36} + \\frac{1}{36} = \\frac{6}{36} = \\frac{1}{6} \\Rightarrow OH^2 = 6$.',
    tikzType: 'custom',
    tikzCode: TIKZ_TETRA_OABC_ORTHO
  },
  {
    prompt: 'Cho hình chóp tam giác đều $S.ABC$ có cạnh đáy bằng $6$ và cạnh bên bằng $5$. Gọi $G$ là trọng tâm tam giác $ABC$. Tính độ dài đoạn thẳng $SG$ (viết dưới dạng căn thức hoặc bình phương: tính $SG^2$).',
    correctAnswer: '13',
    acceptedAnswers: ['13'],
    explanation: 'Tam giác đều $ABC$ cạnh $a = 6$ có bán kính ngoại tiếp $AG = \\frac{a\\sqrt{3}}{3} = 2\\sqrt{3} \\Rightarrow AG^2 = 12$. Vì $SG \\perp (ABC)$ nên $SG^2 = SA^2 - AG^2 = 5^2 - 12 = 13$.'
  }
];

export const b23P4B: CompactSO[] = [
  {
    prompt: 'Sắp xếp các bước chứng minh $AM \\perp (BCC\'B\')$ trong hình lăng trụ đứng $ABC.A\'B\'C\'$ có đáy $ABC$ cân tại $A$ và $M$ là trung điểm $BC$:',
    tikzType: 'custom',
    tikzCode: TIKZ_RIGHT_PRISM_ABCA1B1C1,
    steps: [
      { id: '1', text: 'Vì $\\triangle ABC$ cân tại $A$ và $M$ là trung điểm $BC$ nên đường trung tuyến $AM$ đồng thời là đường cao: $AM \\perp BC$.' },
      { id: '2', text: 'Vì $ABC.A\'B\'C\'$ là hình lăng trụ đứng nên $BB\' \\perp (ABC)$, suy ra $BB\' \\perp AM$.' },
      { id: '3', text: 'Trong mặt phẳng $(BCC\'B\')$, hai đường thẳng $BC$ và $BB\'$ cắt nhau tại $B$.' },
      { id: '4', text: 'Kết luận $AM \\perp (BCC\'B\')$.' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Chứng minh $AM \\perp BC$ và $AM \\perp BB\'$ với $BC \\cap BB\' = B$ trong $(BCC\'B\')$.'
  },
  {
    prompt: 'Sắp xếp các bước chứng minh $BC \\perp (ADI)$ trong tứ diện $ABCD$ có $AB = AC, DB = DC$ và $I$ là trung điểm $BC$:',
    steps: [
      { id: '1', text: 'Trong $\\triangle ABC$ cân tại $A$, trung tuyến $AI$ đồng thời là đường cao nên $BC \\perp AI$.' },
      { id: '2', text: 'Trong $\\triangle DBC$ cân tại $D$, trung tuyến $DI$ đồng thời là đường cao nên $BC \\perp DI$.' },
      { id: '3', text: 'Hai đường thẳng $AI$ và $DI$ cắt nhau tại $I$ và cùng nằm trong mặt phẳng $(ADI)$.' },
      { id: '4', text: 'Suy ra $BC \\perp (ADI)$.' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Dùng tính chất tam giác cân suy ra $BC \\perp AI$ và $BC \\perp DI \\Rightarrow BC \\perp (ADI)$.'
  },
  {
    prompt: 'Sắp xếp các bước chứng minh $SC \\perp (AHK)$ trong hình chóp $S.ABC$ có $SA \\perp (ABC), \\triangle ABC$ vuông tại $B, AH \\perp SB, AK \\perp SC$:',
    tikzType: 'custom',
    tikzCode: TIKZ_PYR_SABC_SA_PERP_AH,
    steps: [
      { id: '1', text: 'Chứng minh $BC \\perp (SAB)$ (do $BC \\perp AB$ và $BC \\perp SA$), từ đó suy ra $BC \\perp AH$.' },
      { id: '2', text: 'Từ $AH \\perp SB$ và $AH \\perp BC$, suy ra $AH \\perp (SBC)$, do đó $SC \\perp AH$.' },
      { id: '3', text: 'Theo giả thiết, ta có $SC \\perp AK$ tại $K$.' },
      { id: '4', text: 'Vì $AH$ và $AK$ cắt nhau tại $A$ trong mặt phẳng $(AHK)$ nên $SC \\perp (AHK)$.' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Từ $AH \\perp (SBC) \\Rightarrow SC \\perp AH$, kết hợp $SC \\perp AK \\Rightarrow SC \\perp (AHK)$.'
  },
  {
    prompt: 'Sắp xếp các bước tính diện tích $\\triangle SCD$ trong hình chóp $S.ABCD$ có đáy là hình vuông cạnh $a$ và $SA \\perp (ABCD), SA = a\\sqrt{3}$:',
    tikzType: 'custom',
    tikzCode: TIKZ_PYR_SABCD_SA_PERP,
    steps: [
      { id: '1', text: 'Chứng minh $CD \\perp (SAD)$ (vì $CD \\perp AD$ và $CD \\perp SA$), suy ra $CD \\perp SD$ hay $\\triangle SCD$ vuông tại $D$.' },
      { id: '2', text: 'Xét $\\triangle SAD$ vuông tại $A$, tính độ dài $SD = \\sqrt{SA^2 + AD^2} = \\sqrt{3a^2 + a^2} = 2a$.' },
      { id: '3', text: 'Áp dụng công thức diện tích tam giác vuông $SCD$: $S_{\\triangle SCD} = \\frac{1}{2} SD \\cdot CD$.' },
      { id: '4', text: 'Thay $SD = 2a$ và $CD = a$, kết luận $S_{\\triangle SCD} = a^2$.' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Chứng minh $\\triangle SCD$ vuông tại $D$, tính $SD = 2a$ và suy ra $S_{\\triangle SCD} = \\frac{1}{2} \\cdot 2a \\cdot a = a^2$.'
  }
];

// ============================================================================
// BÀI 24. PHÉP CHIẾU VUÔNG GÓC. GÓC GIỮA ĐƯỜNG THẲNG VÀ MẶT PHẲNG
// Trọng tâm: Phép chiếu vuông góc, Định lí ba đường vuông góc, định nghĩa và
// cách xác định góc giữa đường thẳng và mặt phẳng (0° <= α <= 90°).
// ============================================================================

export const b24P1A: CompactMC[] = [
  {
    prompt: 'Cho đường thẳng $d$ không vuông góc với mặt phẳng $(P)$ và cắt $(P)$. Góc giữa đường thẳng $d$ và mặt phẳng $(P)$ là góc giữa:',
    options: [
      { id: 'A', text: 'Đường thẳng $d$ và một đường thẳng bất kì nằm trong $(P)$' },
      { id: 'B', text: 'Đường thẳng $d$ và hình chiếu vuông góc $d\'$ của nó trên mặt phẳng $(P)$' },
      { id: 'C', text: 'Đường thẳng $d$ và đường thẳng vuông góc với $(P)$' },
      { id: 'D', text: 'Hai đường thẳng bất kì nằm trong $(P)$' }
    ],
    correctOptionId: 'B',
    explanation: 'Theo định nghĩa: Nếu đường thẳng $d$ không vuông góc với mặt phẳng $(P)$ thì góc giữa $d$ và hình chiếu vuông góc $d\'$ của nó trên $(P)$ được gọi là góc giữa đường thẳng $d$ và mặt phẳng $(P)$.'
  },
  {
    prompt: 'Nếu đường thẳng $d$ vuông góc với mặt phẳng $(P)$ thì góc giữa $d$ và $(P)$ bằng:',
    options: [
      { id: 'A', text: '$0^\\circ$' },
      { id: 'B', text: '$45^\\circ$' },
      { id: 'C', text: '$90^\\circ$' },
      { id: 'D', text: '$180^\\circ$' }
    ],
    correctOptionId: 'C',
    explanation: 'Theo định nghĩa: Nếu $d \\perp (P)$ thì góc giữa đường thẳng $d$ và mặt phẳng $(P)$ bằng $90^\\circ$.'
  },
  {
    prompt: 'Cho hình chóp $S.ABC$ có $SA \\perp (ABC)$. Hình chiếu vuông góc của đường thẳng $SB$ trên mặt phẳng $(ABC)$ là:',
    options: [
      { id: 'A', text: 'Đường thẳng $SA$' },
      { id: 'B', text: 'Đường thẳng $AB$' },
      { id: 'C', text: 'Đường thẳng $BC$' },
      { id: 'D', text: 'Đường thẳng $AC$' }
    ],
    correctOptionId: 'B',
    explanation: 'Vì $SA \\perp (ABC)$ tại $A$ nên hình chiếu vuông góc của $S$ trên $(ABC)$ là $A$, suy ra hình chiếu vuông góc của $SB$ trên $(ABC)$ là $AB$.',
    tikzType: 'custom',
    tikzCode: TIKZ_PYR_SABC_SA_PERP
  },
  {
    prompt: 'Cho hình chóp $S.ABC$ có $SA \\perp (ABC)$. Góc giữa đường thẳng $SC$ và mặt phẳng $(ABC)$ là góc nào sau đây?',
    options: [
      { id: 'A', text: '$\\widehat{SAC}$' },
      { id: 'B', text: '$\\widehat{SCA}$' },
      { id: 'C', text: '$\\widehat{SBC}$' },
      { id: 'D', text: '$\\widehat{SCB}$' }
    ],
    correctOptionId: 'B',
    explanation: 'Vì $SA \\perp (ABC)$ nên $AC$ là hình chiếu vuông góc của $SC$ trên $(ABC)$. Do đó $(SC, (ABC)) = (SC, AC) = \\widehat{SCA}$.',
    tikzType: 'custom',
    tikzCode: TIKZ_PYR_SABC_SA_PERP
  },
  {
    prompt: 'Cho hình chóp $S.ABC$ có $SA \\perp (ABC)$, đáy $ABC$ là tam giác đều cạnh $a$ và $SA = a\\sqrt{3}$. Góc giữa đường thẳng $SB$ và mặt phẳng $(ABC)$ bằng:',
    options: [
      { id: 'A', text: '$30^\\circ$' },
      { id: 'B', text: '$45^\\circ$' },
      { id: 'C', text: '$60^\\circ$' },
      { id: 'D', text: '$90^\\circ$' }
    ],
    correctOptionId: 'C',
    explanation: 'Góc giữa $SB$ và $(ABC)$ là $\\widehat{SBA}$. Trong $\\triangle SAB$ vuông tại $A$, ta có $\\tan\\widehat{SBA} = \\frac{SA}{AB} = \\frac{a\\sqrt{3}}{a} = \\sqrt{3} \\Rightarrow \\widehat{SBA} = 60^\\circ$.',
    tikzType: 'custom',
    tikzCode: TIKZ_PYR_SABC_SA_PERP
  },
  {
    prompt: 'Cho hình chóp $S.ABCD$ có đáy $ABCD$ là hình vuông cạnh $a$, $SA \\perp (ABCD)$ và $SA = a\\sqrt{2}$. Góc giữa đường thẳng $SC$ và mặt phẳng $(ABCD)$ bằng:',
    options: [
      { id: 'A', text: '$30^\\circ$' },
      { id: 'B', text: '$45^\\circ$' },
      { id: 'C', text: '$60^\\circ$' },
      { id: 'D', text: '$90^\\circ$' }
    ],
    correctOptionId: 'B',
    explanation: 'Hình chiếu của $SC$ trên $(ABCD)$ là $AC = a\\sqrt{2}$. Trong $\\triangle SAC$ vuông tại $A$, ta có $\\tan\\widehat{SCA} = \\frac{SA}{AC} = \\frac{a\\sqrt{2}}{a\\sqrt{2}} = 1 \\Rightarrow \\widehat{SCA} = 45^\\circ$.',
    tikzType: 'custom',
    tikzCode: TIKZ_PYR_SABCD_SA_PERP
  },
  {
    prompt: 'Cho hình chóp $S.ABCD$ có đáy $ABCD$ là hình vuông cạnh $a$ và $SA \\perp (ABCD)$. Góc giữa đường thẳng $SC$ và mặt phẳng $(SAB)$ là góc nào sau đây?',
    options: [
      { id: 'A', text: '$\\widehat{CSA}$' },
      { id: 'B', text: '$\\widehat{CSB}$' },
      { id: 'C', text: '$\\widehat{SCB}$' },
      { id: 'D', text: '$\\widehat{SCA}$' }
    ],
    correctOptionId: 'B',
    explanation: 'Vì $BC \\perp AB$ và $BC \\perp SA$ nên $BC \\perp (SAB)$ tại $B$. Do đó $SB$ là hình chiếu vuông góc của $SC$ trên $(SAB)$, suy ra $(SC, (SAB)) = \\widehat{CSB}$.',
    tikzType: 'custom',
    tikzCode: TIKZ_PYR_SABCD_SA_PERP
  },
  {
    prompt: 'Cho hình lập phương $ABCD.A\'B\'C\'D\'$ cạnh $a$. Giá trị $\\tan$ của góc giữa đường chéo $AC\'$ và mặt phẳng đáy $(ABCD)$ bằng:',
    options: [
      { id: 'A', text: '$\\frac{\\sqrt{2}}{2}$' },
      { id: 'B', text: '$\\sqrt{2}$' },
      { id: 'C', text: '$1$' },
      { id: 'D', text: '$\\frac{\\sqrt{3}}{3}$' }
    ],
    correctOptionId: 'A',
    explanation: 'Vì $CC\' \\perp (ABCD)$ tại $C$ nên hình chiếu của $AC\'$ trên $(ABCD)$ là $AC = a\\sqrt{2}$. Khi đó $\\tan\\widehat{C\'AC} = \\frac{CC\'}{AC} = \\frac{a}{a\\sqrt{2}} = \\frac{\\sqrt{2}}{2}$.',
    tikzType: 'custom',
    tikzCode: TIKZ_CUBE_ABCD
  },
  {
    prompt: 'Cho hình chóp tứ giác đều $S.ABCD$ có cạnh đáy bằng $a$, tâm đáy là $O$ và chiều cao $SO = \\frac{a\\sqrt{6}}{2}$. Góc giữa cạnh bên $SA$ và mặt phẳng đáy $(ABCD)$ bằng:',
    options: [
      { id: 'A', text: '$30^\\circ$' },
      { id: 'B', text: '$45^\\circ$' },
      { id: 'C', text: '$60^\\circ$' },
      { id: 'D', text: '$75^\\circ$' }
    ],
    correctOptionId: 'C',
    explanation: 'Vì $SO \\perp (ABCD)$ nên $(SA, (ABCD)) = \\widehat{SAO}$. Ta có $OA = \\frac{AC}{2} = \\frac{a\\sqrt{2}}{2}$, suy ra $\\tan\\widehat{SAO} = \\frac{SO}{OA} = \\frac{a\\sqrt{6}/2}{a\\sqrt{2}/2} = \\sqrt{3} \\Rightarrow \\widehat{SAO} = 60^\\circ$.',
    tikzType: 'custom',
    tikzCode: TIKZ_PYR_REGULAR_SABCD
  },
  {
    prompt: 'Theo **Định lí ba đường vuông góc**, cho đường thẳng $a$ nằm trong mặt phẳng $(P)$ và đường thẳng $b$ không nằm trong $(P)$ đồng thời không vuông góc với $(P)$. Gọi $b\'$ là hình chiếu vuông góc của $b$ trên $(P)$. Khi đó:',
    options: [
      { id: 'A', text: '$a \\perp b \\Leftrightarrow a \\parallel b\'$' },
      { id: 'B', text: '$a \\perp b \\Leftrightarrow a \\perp b\'$' },
      { id: 'C', text: '$a \\parallel b \\Leftrightarrow a \\perp b\'$' },
      { id: 'D', text: '$a \\perp b \\Leftrightarrow b \\perp (P)$' }
    ],
    correctOptionId: 'B',
    explanation: 'Định lí ba đường vuông góc phát biểu: $a \\perp b$ khi và chỉ khi $a \\perp b\'$.'
  },
  {
    prompt: 'Cho hình lăng trụ đứng $ABC.A\'B\'C\'$ có đáy $ABC$ là tam giác đều cạnh $a$ và cạnh bên $AA\' = a$. Góc giữa đường thẳng $A\'B$ và mặt phẳng đáy $(ABC)$ bằng:',
    options: [
      { id: 'A', text: '$30^\\circ$' },
      { id: 'B', text: '$45^\\circ$' },
      { id: 'C', text: '$60^\\circ$' },
      { id: 'D', text: '$90^\\circ$' }
    ],
    correctOptionId: 'B',
    explanation: 'Vì $AA\' \\perp (ABC)$ tại $A$ nên $(A\'B, (ABC)) = \\widehat{A\'BA}$. Tam giác $A\'AB$ vuông cân tại $A$ ($AA\' = AB = a$) nên $\\widehat{A\'BA} = 45^\\circ$.',
    tikzType: 'custom',
    tikzCode: TIKZ_RIGHT_PRISM_ABCA1B1C1
  },
  {
    prompt: 'Một chiếc thang dài $6\\text{ m}$ tựa đầu trên vào một bức tường thẳng đứng và chân thang đặt trên mặt đất phẳng ngang. Biết đầu trên của thang ở độ cao $3\\sqrt{3}\\text{ m}$ so với mặt đất. Góc tạo bởi chiếc thang và mặt đất bằng:',
    options: [
      { id: 'A', text: '$30^\\circ$' },
      { id: 'B', text: '$45^\\circ$' },
      { id: 'C', text: '$60^\\circ$' },
      { id: 'D', text: '$75^\\circ$' }
    ],
    correctOptionId: 'C',
    explanation: 'Gọi $\\alpha$ là góc giữa thang và mặt đất. Ta có $\\sin\\alpha = \\frac{3\\sqrt{3}}{6} = \\frac{\\sqrt{3}}{2} \\Rightarrow \\alpha = 60^\\circ$.'
  }
];

export const b24P2A: CompactTF[] = [
  {
    stem: 'Cho hình chóp $S.ABCD$ có đáy $ABCD$ là hình vuông cạnh $a$, cạnh bên $SA \\perp (ABCD)$ và $SA = a\\sqrt{3}$. Xét tính đúng sai của các mệnh đề sau:',
    tikzType: 'custom',
    tikzCode: TIKZ_PYR_SABCD_SA_PERP,
    statements: [
      {
        id: 'a',
        text: 'Hình chiếu vuông góc của đường thẳng $SD$ trên mặt phẳng $(ABCD)$ là đường thẳng $AD$.',
        isTrue: true,
        explanation: 'Đúng vì $SA \\perp (ABCD)$ tại $A$.'
      },
      {
        id: 'b',
        text: 'Góc giữa đường thẳng $SD$ và mặt phẳng $(ABCD)$ bằng $60^\\circ$.',
        isTrue: true,
        explanation: 'Đúng vì $\\tan\\widehat{SDA} = \\frac{SA}{AD} = \\frac{a\\sqrt{3}}{a} = \\sqrt{3} \\Rightarrow \\widehat{SDA} = 60^\\circ$.'
      },
      {
        id: 'c',
        text: 'Góc giữa đường thẳng $SC$ và mặt phẳng $(ABCD)$ cũng bằng $60^\\circ$.',
        isTrue: false,
        explanation: 'Sai vì $\\tan\\widehat{SCA} = \\frac{SA}{AC} = \\frac{a\\sqrt{3}}{a\\sqrt{2}} = \\sqrt{\\frac{3}{2}} \\ne \\sqrt{3}$, nên $\\widehat{SCA} \\ne 60^\\circ$.'
      },
      {
        id: 'd',
        text: 'Góc giữa đường thẳng $SC$ và mặt phẳng $(SAB)$ bằng $30^\\circ$.',
        isTrue: false,
        explanation: 'Sai vì $BC \\perp (SAB)$ tại $B$ nên $(SC, (SAB)) = \\widehat{CSB}$. Ta có $SB = \\sqrt{SA^2 + AB^2} = 2a$, nên $\\tan\\widehat{CSB} = \\frac{BC}{SB} = \\frac{a}{2a} = \\frac{1}{2} \\ne \\frac{\\sqrt{3}}{3}$.'
      }
    ]
  },
  {
    stem: 'Cho hình chóp tứ giác đều $S.ABCD$ có tất cả các cạnh đều bằng $a$, tâm đáy là $O$. Xét tính đúng sai của các mệnh đề sau:',
    tikzType: 'custom',
    tikzCode: TIKZ_PYR_REGULAR_SABCD,
    statements: [
      {
        id: 'a',
        text: 'Hình chiếu vuông góc của đỉnh $S$ trên mặt phẳng $(ABCD)$ là tâm $O$.',
        isTrue: true,
        explanation: 'Đúng vì trong hình chóp đều, chân đường cao trùng với tâm của đáy.'
      },
      {
        id: 'b',
        text: 'Độ dài đường cao $SO$ bằng $\\frac{a\\sqrt{2}}{2}$.',
        isTrue: true,
        explanation: 'Đúng vì $OA = \\frac{a\\sqrt{2}}{2}$ và $SO = \\sqrt{SA^2 - OA^2} = \\sqrt{a^2 - \\frac{a^2}{2}} = \\frac{a\\sqrt{2}}{2}$.'
      },
      {
        id: 'c',
        text: 'Góc giữa cạnh bên $SB$ và mặt phẳng đáy $(ABCD)$ bằng $45^\\circ$.',
        isTrue: true,
        explanation: 'Đúng vì $\\tan\\widehat{SBO} = \\frac{SO}{OB} = 1 \\Rightarrow \\widehat{SBO} = 45^\\circ$.'
      },
      {
        id: 'd',
        text: 'Góc giữa đường thẳng $SA$ và mặt phẳng $(SBD)$ bằng $60^\\circ$.',
        isTrue: false,
        explanation: 'Sai vì $AO \\perp (SBD)$ tại $O$ nên $(SA, (SBD)) = \\widehat{ASO} = 45^\\circ$ (do $\\triangle SOA$ vuông cân tại $O$).'
      }
    ]
  }
];

export const b24P3A: CompactSA[] = [
  {
    prompt: 'Cho hình chóp $S.ABC$ có $SA \\perp (ABC)$, tam giác $ABC$ vuông tại $B$ có $AB = 3, BC = 4$ và $SA = 5$. Số đo góc (đơn vị: độ) giữa đường thẳng $SC$ và mặt phẳng $(ABC)$ bằng bao nhiêu?',
    correctAnswer: '45',
    acceptedAnswers: ['45'],
    explanation: 'Trong $\\triangle ABC$ vuông tại $B$: $AC = \\sqrt{3^2 + 4^2} = 5$. Vì $SA \\perp (ABC)$ nên $(SC, (ABC)) = \\widehat{SCA}$. Do $SA = AC = 5$ nên $\\triangle SAC$ vuông cân tại $A \\Rightarrow \\widehat{SCA} = 45^\\circ$.',
    tikzType: 'custom',
    tikzCode: TIKZ_PYR_SABC_SA_PERP
  },
  {
    prompt: 'Cho hình chóp $S.ABCD$ có đáy $ABCD$ là hình vuông cạnh $a$, $SA \\perp (ABCD)$ và $SA = a\\sqrt{2}$. Số đo góc (đơn vị: độ) giữa đường thẳng $SC$ và mặt phẳng $(SAB)$ bằng bao nhiêu?',
    correctAnswer: '30',
    acceptedAnswers: ['30'],
    explanation: 'Vì $BC \\perp (SAB)$ tại $B$ nên $(SC, (SAB)) = \\widehat{CSB}$. Ta có $SB = \\sqrt{SA^2 + AB^2} = \\sqrt{2a^2 + a^2} = a\\sqrt{3}$. Trong $\\triangle SBC$ vuông tại $B$: $\\tan\\widehat{CSB} = \\frac{BC}{SB} = \\frac{a}{a\\sqrt{3}} = \\frac{\\sqrt{3}}{3} \\Rightarrow \\widehat{CSB} = 30^\\circ$.',
    tikzType: 'custom',
    tikzCode: TIKZ_PYR_SABCD_SA_PERP
  },
  {
    prompt: 'Cho hình lăng trụ đứng $ABC.A\'B\'C\'$ có đáy $ABC$ là tam giác đều cạnh $2a$ và cạnh bên $AA\' = 2a\\sqrt{3}$. Số đo góc (đơn vị: độ) giữa đường thẳng $A\'C$ và mặt phẳng đáy $(ABC)$ bằng bao nhiêu?',
    correctAnswer: '60',
    acceptedAnswers: ['60'],
    explanation: 'Vì $AA\' \\perp (ABC)$ tại $A$ nên $(A\'C, (ABC)) = \\widehat{A\'CA}$. Ta có $\\tan\\widehat{A\'CA} = \\frac{AA\'}{AC} = \\frac{2a\\sqrt{3}}{2a} = \\sqrt{3} \\Rightarrow \\widehat{A\'CA} = 60^\\circ$.',
    tikzType: 'custom',
    tikzCode: TIKZ_RIGHT_PRISM_ABCA1B1C1
  },
  {
    prompt: 'Cho hình chóp tam giác đều $S.ABC$ có cạnh đáy bằng $3$ và góc giữa cạnh bên $SA$ với mặt phẳng đáy $(ABC)$ bằng $60^\\circ$. Tính độ dài đường cao $SG$ của hình chóp.',
    correctAnswer: '3',
    acceptedAnswers: ['3'],
    explanation: 'Tam giác đều $ABC$ cạnh $a = 3$ có $AG = \\frac{a\\sqrt{3}}{3} = \\sqrt{3}$. Vì $SG \\perp (ABC)$ tại $G$ nên $(SA, (ABC)) = \\widehat{SAG} = 60^\\circ$. Trong $\\triangle SGA$ vuông tại $G$: $SG = AG \\cdot \\tan 60^\\circ = \\sqrt{3} \\cdot \\sqrt{3} = 3$.'
  }
];

export const b24P4A: CompactSO[] = [
  {
    prompt: 'Sắp xếp các bước xác định và tính góc giữa đường thẳng $SC$ và mặt phẳng $(ABCD)$ trong hình chóp $S.ABCD$ có đáy là hình vuông cạnh $a$ và $SA \\perp (ABCD), SA = a\\sqrt{6}$:',
    tikzType: 'custom',
    tikzCode: TIKZ_PYR_SABCD_SA_PERP,
    steps: [
      { id: '1', text: 'Vì $SA \\perp (ABCD)$ tại $A$ nên $AC$ là hình chiếu vuông góc của $SC$ trên mặt phẳng $(ABCD)$.' },
      { id: '2', text: 'Suy ra góc giữa đường thẳng $SC$ và mặt phẳng $(ABCD)$ là góc $\\widehat{SCA}$.' },
      { id: '3', text: 'Trong hình vuông $ABCD$ cạnh $a$, đường chéo $AC = a\\sqrt{2}$.' },
      { id: '4', text: 'Xét $\\triangle SAC$ vuông tại $A$: $\\tan\\widehat{SCA} = \\frac{SA}{AC} = \\frac{a\\sqrt{6}}{a\\sqrt{2}} = \\sqrt{3} \\Rightarrow \\widehat{SCA} = 60^\\circ$.' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Tìm hình chiếu $AC$ của $SC$ trên $(ABCD)$, tính $\\tan\\widehat{SCA} = \\frac{SA}{AC} = \\sqrt{3} \\Rightarrow 60^\\circ$.'
  },
  {
    prompt: 'Sắp xếp các bước tính góc giữa đường thẳng $SC$ và mặt phẳng $(SAB)$ trong hình chóp $S.ABCD$ có đáy là hình vuông cạnh $a$ và $SA \\perp (ABCD), SA = a\\sqrt{2}$:',
    tikzType: 'custom',
    tikzCode: TIKZ_PYR_SABCD_SA_PERP,
    steps: [
      { id: '1', text: 'Chứng minh $BC \\perp (SAB)$ tại $B$ (vì $BC \\perp AB$ và $BC \\perp SA$), suy ra $SB$ là hình chiếu vuông góc của $SC$ trên $(SAB)$.' },
      { id: '2', text: 'Do đó góc giữa $SC$ và mặt phẳng $(SAB)$ là góc $\\widehat{CSB}$.' },
      { id: '3', text: 'Trong $\\triangle SAB$ vuông tại $A$, tính $SB = \\sqrt{SA^2 + AB^2} = \\sqrt{2a^2 + a^2} = a\\sqrt{3}$.' },
      { id: '4', text: 'Trong $\\triangle SBC$ vuông tại $B$: $\\tan\\widehat{CSB} = \\frac{BC}{SB} = \\frac{a}{a\\sqrt{3}} = \\frac{\\sqrt{3}}{3} \\Rightarrow \\widehat{CSB} = 30^\\circ$.' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Chứng minh $B$ là hình chiếu của $C$ trên $(SAB)$, suy ra góc là $\\widehat{CSB} = 30^\\circ$.'
  },
  {
    prompt: 'Sắp xếp các bước tính chiều cao $SO$ của hình chóp tứ giác đều $S.ABCD$ có cạnh đáy bằng $a$ và cạnh bên tạo với mặt đáy một góc $60^\\circ$:',
    tikzType: 'custom',
    tikzCode: TIKZ_PYR_REGULAR_SABCD,
    steps: [
      { id: '1', text: 'Gọi $O$ là tâm hình vuông $ABCD$, khi đó $SO \\perp (ABCD)$ tại $O$.' },
      { id: '2', text: 'Hình chiếu vuông góc của $SA$ trên $(ABCD)$ là $OA$, nên $(SA, (ABCD)) = \\widehat{SAO} = 60^\\circ$.' },
      { id: '3', text: 'Tính bán kính đường tròn ngoại tiếp đáy: $OA = \\frac{AC}{2} = \\frac{a\\sqrt{2}}{2}$.' },
      { id: '4', text: 'Trong $\\triangle SOA$ vuông tại $O$: $SO = OA \\cdot \\tan 60^\\circ = \\frac{a\\sqrt{2}}{2} \\cdot \\sqrt{3} = \\frac{a\\sqrt{6}}{2}$.' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Xác định góc $\\widehat{SAO} = 60^\\circ$, tính $OA = \\frac{a\\sqrt{2}}{2}$ và suy ra $SO = OA\\tan 60^\\circ = \\frac{a\\sqrt{6}}{2}$.'
  },
  {
    prompt: 'Sắp xếp các bước vận dụng Định lí ba đường vuông góc để chứng minh $BC \\perp SB$ trong hình chóp $S.ABC$ có $SA \\perp (ABC)$ và $\\triangle ABC$ vuông tại $B$:',
    tikzType: 'custom',
    tikzCode: TIKZ_PYR_SABC_SA_PERP,
    steps: [
      { id: '1', text: 'Vì $SA \\perp (ABC)$ tại $A$ nên $AB$ là hình chiếu vuông góc của đường xiên $SB$ trên mặt phẳng $(ABC)$.' },
      { id: '2', text: 'Đường thẳng $BC$ nằm trong mặt phẳng $(ABC)$.' },
      { id: '3', text: 'Theo giả thiết $\\triangle ABC$ vuông tại $B$, nên $BC$ vuông góc với hình chiếu $AB$ ($BC \\perp AB$).' },
      { id: '4', text: 'Theo Định lí ba đường vuông góc, suy ra $BC$ vuông góc với đường xiên $SB$ ($BC \\perp SB$).' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Áp dụng trực tiếp Định lí ba đường vuông góc cho đường xiên $SB$, hình chiếu $AB$ và đường thẳng $BC \\subset (ABC)$.'
  }
];

export const b24P1B: CompactMC[] = [
  {
    prompt: 'Nếu đường thẳng $d$ song song hoặc nằm trong mặt phẳng $(P)$ thì số đo góc giữa $d$ và $(P)$ bằng:',
    options: [
      { id: 'A', text: '$0^\\circ$' },
      { id: 'B', text: '$45^\\circ$' },
      { id: 'C', text: '$90^\\circ$' },
      { id: 'D', text: '$180^\\circ$' }
    ],
    correctOptionId: 'A',
    explanation: 'Nếu đường thẳng $d$ song song hoặc nằm trong mặt phẳng $(P)$ thì góc giữa $d$ và $(P)$ bằng $0^\\circ$.'
  },
  {
    prompt: 'Cho hình chóp $S.ABCD$ có đáy $ABCD$ là hình vuông và $SA \\perp (ABCD)$. Hình chiếu vuông góc của đường thẳng $SC$ trên mặt phẳng $(SAD)$ là:',
    options: [
      { id: 'A', text: 'Đường thẳng $SA$' },
      { id: 'B', text: 'Đường thẳng $SD$' },
      { id: 'C', text: 'Đường thẳng $AD$' },
      { id: 'D', text: 'Đường thẳng $AC$' }
    ],
    correctOptionId: 'B',
    explanation: 'Vì $CD \\perp AD$ và $CD \\perp SA$ nên $CD \\perp (SAD)$ tại $D$. Do đó hình chiếu vuông góc của $C$ trên $(SAD)$ là $D$, suy ra hình chiếu của $SC$ trên $(SAD)$ là $SD$.',
    tikzType: 'custom',
    tikzCode: TIKZ_PYR_SABCD_SA_PERP
  },
  {
    prompt: 'Cho hình chóp $S.ABC$ có $SA \\perp (ABC)$, đáy $ABC$ là tam giác vuông cân tại $B$ với $AB = BC = a$ và $SA = a\\sqrt{2}$. Góc giữa đường thẳng $SC$ và mặt phẳng $(ABC)$ bằng:',
    options: [
      { id: 'A', text: '$30^\\circ$' },
      { id: 'B', text: '$45^\\circ$' },
      { id: 'C', text: '$60^\\circ$' },
      { id: 'D', text: '$90^\\circ$' }
    ],
    correctOptionId: 'B',
    explanation: 'Ta có $AC = \\sqrt{AB^2 + BC^2} = a\\sqrt{2}$. Vì $SA \\perp (ABC)$ nên $(SC, (ABC)) = \\widehat{SCA}$. Do $SA = AC = a\\sqrt{2}$ nên $\\widehat{SCA} = 45^\\circ$.',
    tikzType: 'custom',
    tikzCode: TIKZ_PYR_SABC_SA_PERP
  },
  {
    prompt: 'Cho hình lập phương $ABCD.A\'B\'C\'D\'$. Góc giữa đường thẳng $A\'B$ và mặt phẳng đáy $(ABCD)$ bằng:',
    options: [
      { id: 'A', text: '$30^\\circ$' },
      { id: 'B', text: '$45^\\circ$' },
      { id: 'C', text: '$60^\\circ$' },
      { id: 'D', text: '$90^\\circ$' }
    ],
    correctOptionId: 'B',
    explanation: 'Vì $AA\' \\perp (ABCD)$ tại $A$ nên $(A\'B, (ABCD)) = \\widehat{A\'BA} = 45^\\circ$ (do $ABB\'A\'$ là hình vuông).',
    tikzType: 'custom',
    tikzCode: TIKZ_CUBE_ABCD
  },
  {
    prompt: 'Cho hình lập phương $ABCD.A\'B\'C\'D\'$ cạnh $a$. Giá trị $\\sin$ của góc giữa đường thẳng $A\'C$ và mặt phẳng $(ABB\'A\')$ bằng:',
    options: [
      { id: 'A', text: '$\\frac{\\sqrt{3}}{3}$' },
      { id: 'B', text: '$\\frac{\\sqrt{2}}{2}$' },
      { id: 'C', text: '$\\frac{1}{2}$' },
      { id: 'D', text: '$\\frac{\\sqrt{6}}{3}$' }
    ],
    correctOptionId: 'A',
    explanation: 'Vì $BC \\perp (ABB\'A\')$ tại $B$ nên hình chiếu của $A\'C$ trên $(ABB\'A\')$ là $A\'B$. Do đó góc cần tìm là $\\widehat{CA\'B}$, với $\\sin\\widehat{CA\'B} = \\frac{BC}{A\'C} = \\frac{a}{a\\sqrt{3}} = \\frac{\\sqrt{3}}{3}$.',
    tikzType: 'custom',
    tikzCode: TIKZ_CUBE_ABCD
  },
  {
    prompt: 'Cho hình chóp tam giác đều $S.ABC$ có cạnh đáy bằng $a$ và chiều cao $SG = \\frac{a}{3}$. Góc giữa cạnh bên $SA$ và mặt phẳng đáy $(ABC)$ bằng:',
    options: [
      { id: 'A', text: '$30^\\circ$' },
      { id: 'B', text: '$45^\\circ$' },
      { id: 'C', text: '$60^\\circ$' },
      { id: 'D', text: '$75^\\circ$' }
    ],
    correctOptionId: 'A',
    explanation: 'Bán kính ngoại tiếp $\\triangle ABC$ đều là $AG = \\frac{a\\sqrt{3}}{3}$. Khi đó $\\tan\\widehat{SAG} = \\frac{SG}{AG} = \\frac{a/3}{a\\sqrt{3}/3} = \\frac{1}{\\sqrt{3}} \\Rightarrow \\widehat{SAG} = 30^\\circ$.'
  },
  {
    prompt: 'Cho hình chóp $S.ABC$ có $SA \\perp (ABC)$, tam giác $ABC$ đều cạnh $2a$ và $SA = a$. Gọi $M$ là trung điểm của cạnh $BC$. Góc giữa đường thẳng $SM$ và mặt phẳng $(ABC)$ bằng:',
    options: [
      { id: 'A', text: '$30^\\circ$' },
      { id: 'B', text: '$45^\\circ$' },
      { id: 'C', text: '$60^\\circ$' },
      { id: 'D', text: '$90^\\circ$' }
    ],
    correctOptionId: 'A',
    explanation: 'Trong $\\triangle ABC$ đều cạnh $2a$, đường trung tuyến $AM = \\frac{2a\\sqrt{3}}{2} = a\\sqrt{3}$. Vì $SA \\perp (ABC)$ nên $(SM, (ABC)) = \\widehat{SMA}$. Ta có $\\tan\\widehat{SMA} = \\frac{SA}{AM} = \\frac{a}{a\\sqrt{3}} = \\frac{\\sqrt{3}}{3} \\Rightarrow \\widehat{SMA} = 30^\\circ$.',
    tikzType: 'custom',
    tikzCode: TIKZ_PYR_SABC_SA_PERP
  },
  {
    prompt: 'Cho hình lăng trụ đứng $ABC.A\'B\'C\'$ có đáy $ABC$ là tam giác cân tại $A$ với $AB = AC = 2a, \\widehat{BAC} = 120^\\circ$ và cạnh bên $AA\' = a$. Góc giữa đường thẳng $A\'M$ (với $M$ là trung điểm $BC$) và mặt phẳng $(ABC)$ bằng:',
    options: [
      { id: 'A', text: '$30^\\circ$' },
      { id: 'B', text: '$45^\\circ$' },
      { id: 'C', text: '$60^\\circ$' },
      { id: 'D', text: '$90^\\circ$' }
    ],
    correctOptionId: 'B',
    explanation: 'Trong $\\triangle ABC$ cân tại $A$, ta có $AM = AB \\cos 60^\\circ = 2a \\cdot \\frac{1}{2} = a$. Vì $AA\' \\perp (ABC)$ tại $A$ nên $(A\'M, (ABC)) = \\widehat{A\'MA}$ với $\\tan\\widehat{A\'MA} = \\frac{AA\'}{AM} = \\frac{a}{a} = 1 \\Rightarrow \\widehat{A\'MA} = 45^\\circ$.',
    tikzType: 'custom',
    tikzCode: TIKZ_RIGHT_PRISM_ABCA1B1C1
  },
  {
    prompt: 'Cho tứ diện $OABC$ có $OA, OB, OC$ đôi một vuông góc và $OA = a\\sqrt{3}, OB = a$. Góc giữa đường thẳng $AB$ và mặt phẳng $(OBC)$ bằng:',
    options: [
      { id: 'A', text: '$30^\\circ$' },
      { id: 'B', text: '$45^\\circ$' },
      { id: 'C', text: '$60^\\circ$' },
      { id: 'D', text: '$90^\\circ$' }
    ],
    correctOptionId: 'C',
    explanation: 'Vì $OA \\perp (OBC)$ tại $O$ nên $OB$ là hình chiếu của $AB$ trên $(OBC)$. Khi đó $(AB, (OBC)) = \\widehat{ABO}$ với $\\tan\\widehat{ABO} = \\frac{OA}{OB} = \\sqrt{3} \\Rightarrow \\widehat{ABO} = 60^\\circ$.',
    tikzType: 'custom',
    tikzCode: TIKZ_TETRA_OABC_ORTHO
  },
  {
    prompt: 'Cho đoạn thẳng $AB$ có độ dài $10\\text{ cm}$ tạo với mặt phẳng $(P)$ một góc $60^\\circ$. Độ dài hình chiếu vuông góc $A\'B\'$ của đoạn thẳng $AB$ trên mặt phẳng $(P)$ bằng:',
    options: [
      { id: 'A', text: '$5\\text{ cm}$' },
      { id: 'B', text: '$5\\sqrt{3}\\text{ cm}$' },
      { id: 'C', text: '$5\\sqrt{2}\\text{ cm}$' },
      { id: 'D', text: '$10\\text{ cm}$' }
    ],
    correctOptionId: 'A',
    explanation: 'Độ dài hình chiếu vuông góc là $A\'B\' = AB \\cdot \\cos 60^\\circ = 10 \\cdot \\frac{1}{2} = 5\\text{ (cm)}$.'
  },
  {
    prompt: 'Cho hình chóp $S.ABCD$ có đáy $ABCD$ là hình chữ nhật với $AB = a, AD = a\\sqrt{3}$, cạnh bên $SA \\perp (ABCD)$ và $SA = 2a$. Giá trị $\\sin$ của góc giữa đường thẳng $BD$ và mặt phẳng $(SAC)$ bằng:',
    options: [
      { id: 'A', text: '$\\frac{\\sqrt{3}}{2}$' },
      { id: 'B', text: '$\\frac{1}{2}$' },
      { id: 'C', text: '$\\frac{\\sqrt{2}}{2}$' },
      { id: 'D', text: '$\\frac{\\sqrt{3}}{4}$' }
    ],
    correctOptionId: 'A',
    explanation: 'Trong hình chữ nhật $ABCD$, đường chéo $BD = 2a$. Kẻ $BH \\perp AC$ tại $H$, vì $SA \\perp BH$ nên $BH \\perp (SAC)$ tại $H$. Do đó $\\sin(BD, (SAC)) = \\text{?}$ Chú ý $BD$ cắt $(SAC)$ tại trung điểm $O$ của $BD$ ($OB = a$). Trong $\\triangle ABC$ vuông tại $B$: $BH = \\frac{AB \\cdot BC}{AC} = \\frac{a \\cdot a\\sqrt{3}}{2a} = \\frac{a\\sqrt{3}}{2}$. Vậy $\\sin(BD, (SAC)) = \\frac{BH}{OB} = \\frac{a\\sqrt{3}/2}{a} = \\frac{\\sqrt{3}}{2}$.',
    tikzType: 'custom',
    tikzCode: TIKZ_PYR_SABCD_SA_PERP
  },
  {
    prompt: 'Một cột ăng-ten thẳng đứng cao $15\\text{ m}$ đặt trên mặt đất phẳng ngang. Khi tia nắng mặt trời tạo với mặt đất một góc $60^\\circ$, độ dài bóng của cột ăng-ten trên mặt đất là:',
    options: [
      { id: 'A', text: '$5\\sqrt{3}\\text{ m}$' },
      { id: 'B', text: '$15\\sqrt{3}\\text{ m}$' },
      { id: 'C', text: '$15\\text{ m}$' },
      { id: 'D', text: '$10\\sqrt{3}\\text{ m}$' }
    ],
    correctOptionId: 'A',
    explanation: 'Độ dài bóng trên mặt đất là $L = \\frac{h}{\\tan 60^\\circ} = \\frac{15}{\\sqrt{3}} = 5\\sqrt{3}\\text{ (m)}$.'
  }
];

export const b24P2B: CompactTF[] = [
  {
    stem: 'Cho hình lăng trụ đứng $ABC.A\'B\'C\'$ có đáy $ABC$ là tam giác vuông tại $B$ với $AB = a, BC = a\\sqrt{3}$ và cạnh bên $AA\' = 2a$. Xét tính đúng sai của các mệnh đề sau:',
    tikzType: 'custom',
    tikzCode: TIKZ_RIGHT_PRISM_ABCA1B1C1,
    statements: [
      {
        id: 'a',
        text: 'Hình chiếu vuông góc của đường thẳng $A\'C$ trên mặt phẳng $(ABC)$ là đường thẳng $AC$.',
        isTrue: true,
        explanation: 'Đúng vì $AA\' \\perp (ABC)$ tại $A$.'
      },
      {
        id: 'b',
        text: 'Góc giữa đường thẳng $A\'C$ và mặt phẳng $(ABC)$ bằng $45^\\circ$.',
        isTrue: true,
        explanation: 'Đúng vì $AC = \\sqrt{AB^2 + BC^2} = 2a = AA\'$, nên $\\triangle A\'AC$ vuông cân tại $A \\Rightarrow \\widehat{A\'CA} = 45^\\circ$.'
      },
      {
        id: 'c',
        text: 'Hình chiếu vuông góc của đường thẳng $A\'C$ trên mặt phẳng $(ABB\'A\')$ là đường thẳng $AB$.',
        isTrue: false,
        explanation: 'Sai vì $BC \\perp (ABB\'A\')$ tại $B$ nên hình chiếu của $C$ là $B$, do đó hình chiếu của $A\'C$ trên $(ABB\'A\')$ là $A\'B$ chứ không phải $AB$.'
      },
      {
        id: 'd',
        text: 'Giá trị $\\sin$ của góc giữa đường thẳng $A\'C$ và mặt phẳng $(ABB\'A\')$ bằng $\\frac{\\sqrt{6}}{4}$.',
        isTrue: true,
        explanation: 'Đúng vì $(A\'C, (ABB\'A\')) = \\widehat{CA\'B}$, với $A\'C = \\sqrt{AA\'^2 + AC^2} = 2a\\sqrt{2}$ nên $\\sin\\widehat{CA\'B} = \\frac{BC}{A\'C} = \\frac{a\\sqrt{3}}{2a\\sqrt{2}} = \\frac{\\sqrt{6}}{4}$.'
      }
    ]
  },
  {
    stem: 'Cho hình chóp $S.ABC$ có $SA \\perp (ABC)$ và tam giác $ABC$ đều cạnh $a$, biết $SA = \\frac{a\\sqrt{3}}{2}$. Gọi $M$ là trung điểm của cạnh $BC$. Xét tính đúng sai của các mệnh đề sau:',
    tikzType: 'custom',
    tikzCode: TIKZ_PYR_SABC_SA_PERP,
    statements: [
      {
        id: 'a',
        text: 'Độ dài đường trung tuyến $AM$ của tam giác đều $ABC$ bằng $\\frac{a\\sqrt{3}}{2}$.',
        isTrue: true,
        explanation: 'Đúng theo công thức đường cao tam giác đều cạnh $a$.'
      },
      {
        id: 'b',
        text: 'Theo Định lí ba đường vuông góc, vì $BC \\perp AM$ nên $BC \\perp SM$.',
        isTrue: true,
        explanation: 'Đúng vì $AM$ là hình chiếu vuông góc của $SM$ trên $(ABC)$ và $BC \\perp AM \\Rightarrow BC \\perp SM$.'
      },
      {
        id: 'c',
        text: 'Góc giữa đường thẳng $SM$ và mặt phẳng $(ABC)$ bằng $45^\\circ$.',
        isTrue: true,
        explanation: 'Đúng vì $\\tan\\widehat{SMA} = \\frac{SA}{AM} = 1 \\Rightarrow \\widehat{SMA} = 45^\\circ$.'
      },
      {
        id: 'd',
        text: 'Góc giữa đường thẳng $SB$ và mặt phẳng $(ABC)$ bằng $60^\\circ$.',
        isTrue: false,
        explanation: 'Sai vì $\\tan\\widehat{SBA} = \\frac{SA}{AB} = \\frac{\\sqrt{3}}{2} \\ne \\sqrt{3}$ nên $\\widehat{SBA} \\ne 60^\\circ$.'
      }
    ]
  }
];

export const b24P3B: CompactSA[] = [
  {
    prompt: 'Cho hình chóp $S.ABCD$ có đáy $ABCD$ là hình chữ nhật với $AB = 3, AD = 4$, cạnh bên $SA \\perp (ABCD)$ và $SA = 5\\sqrt{3}$. Số đo góc (đơn vị: độ) giữa đường thẳng $SC$ và mặt phẳng $(ABCD)$ bằng bao nhiêu?',
    correctAnswer: '60',
    acceptedAnswers: ['60'],
    explanation: 'Trong hình chữ nhật $ABCD$: $AC = \\sqrt{3^2 + 4^2} = 5$. Vì $SA \\perp (ABCD)$ nên $(SC, (ABCD)) = \\widehat{SCA}$ với $\\tan\\widehat{SCA} = \\frac{SA}{AC} = \\frac{5\\sqrt{3}}{5} = \\sqrt{3} \\Rightarrow \\widehat{SCA} = 60^\\circ$.',
    tikzType: 'custom',
    tikzCode: TIKZ_PYR_SABCD_SA_PERP
  },
  {
    prompt: 'Cho hình chóp tứ giác đều $S.ABCD$ có cạnh đáy bằng $4\\sqrt{2}$ và góc giữa cạnh bên $SA$ với mặt phẳng đáy $(ABCD)$ bằng $45^\\circ$. Tính độ dài đường cao $SO$ của hình chóp.',
    correctAnswer: '4',
    acceptedAnswers: ['4'],
    explanation: 'Đáy $ABCD$ là hình vuông cạnh $4\\sqrt{2}$ nên $AC = 8 \\Rightarrow OA = 4$. Vì $(SA, (ABCD)) = \\widehat{SAO} = 45^\\circ$ nên $SO = OA \\cdot \\tan 45^\\circ = 4$.',
    tikzType: 'custom',
    tikzCode: TIKZ_PYR_REGULAR_SABCD
  },
  {
    prompt: 'Cho đoạn thẳng $AB = 16$ có điểm $A$ thuộc mặt phẳng $(P)$ và đường thẳng $AB$ tạo với $(P)$ một góc $30^\\circ$. Tính khoảng cách từ điểm $B$ đến mặt phẳng $(P)$ (tức độ dài đoạn vuông góc $BH$ kẻ từ $B$ xuống $(P)$).',
    correctAnswer: '8',
    acceptedAnswers: ['8'],
    explanation: 'Trong $\\triangle ABH$ vuông tại $H$ có $\\widehat{BAH} = 30^\\circ$, ta có $BH = AB \\cdot \\sin 30^\\circ = 16 \\cdot \\frac{1}{2} = 8$.'
  },
  {
    prompt: 'Cho hình chóp $S.ABC$ có $SA \\perp (ABC)$, tam giác $ABC$ vuông tại $B$ với $AB = 4, BC = 5$ và $SA = 3$. Tính độ dài đoạn thẳng $SB$.',
    correctAnswer: '5',
    acceptedAnswers: ['5'],
    explanation: 'Vì $SA \\perp (ABC)$ nên $SA \\perp AB$, suy ra $\\triangle SAB$ vuông tại $A$: $SB = \\sqrt{SA^2 + AB^2} = \\sqrt{3^2 + 4^2} = 5$.',
    tikzType: 'custom',
    tikzCode: TIKZ_PYR_SABC_SA_PERP
  }
];

export const b24P4B: CompactSO[] = [
  {
    prompt: 'Sắp xếp các bước tính góc giữa đường thẳng $A\'B$ và mặt phẳng $(ACC\'A\')$ trong hình lăng trụ đứng $ABC.A\'B\'C\'$ có đáy $ABC$ vuông cân tại $B$ ($AB = BC = a$) và $AA\' = a$:',
    tikzType: 'custom',
    tikzCode: TIKZ_RIGHT_PRISM_ABCA1B1C1,
    steps: [
      { id: '1', text: 'Gọi $M$ là trung điểm của $AC$, vì $\\triangle ABC$ vuông cân tại $B$ nên $BM \\perp AC$ và $BM = \\frac{AC}{2} = \\frac{a\\sqrt{2}}{2}$.' },
      { id: '2', text: 'Vì $AA\' \\perp (ABC)$ nên $AA\' \\perp BM$, kết hợp $BM \\perp AC$ suy ra $BM \\perp (ACC\'A\')$ tại $M$.' },
      { id: '3', text: 'Do đó $A\'M$ là hình chiếu vuông góc của $A\'B$ trên $(ACC\'A\')$, góc cần tìm là $\\widehat{BA\'M}$.' },
      { id: '4', text: 'Trong $\\triangle A\'MB$ vuông tại $M$, có $A\'B = a\\sqrt{2}$ nên $\\sin\\widehat{BA\'M} = \\frac{BM}{A\'B} = \\frac{1}{2} \\Rightarrow \\widehat{BA\'M} = 30^\\circ$.' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Kẻ trung tuyến $BM \\perp AC \\Rightarrow BM \\perp (ACC\'A\')$, tính $\\sin\\widehat{BA\'M} = \\frac{BM}{A\'B} = \\frac{1}{2} \\Rightarrow 30^\\circ$.'
  },
  {
    prompt: 'Sắp xếp các bước tính góc giữa cạnh bên $SA$ và mặt phẳng $(SBD)$ trong hình chóp tứ giác đều $S.ABCD$ có tất cả các cạnh bằng $a$:',
    tikzType: 'custom',
    tikzCode: TIKZ_PYR_REGULAR_SABCD,
    steps: [
      { id: '1', text: 'Gọi $O = AC \\cap BD$ là tâm hình vuông $ABCD$, ta có $AO \\perp BD$ và $AO \\perp SO$ nên $AO \\perp (SBD)$ tại $O$.' },
      { id: '2', text: 'Suy ra $SO$ là hình chiếu vuông góc của $SA$ trên mặt phẳng $(SBD)$, góc cần tìm là $\\widehat{ASO}$.' },
      { id: '3', text: 'Trong hình vuông cạnh $a$, ta có $AO = \\frac{a\\sqrt{2}}{2}$.' },
      { id: '4', text: 'Trong $\\triangle SOA$ vuông tại $O$: $\\sin\\widehat{ASO} = \\frac{AO}{SA} = \\frac{\\sqrt{2}}{2} \\Rightarrow \\widehat{ASO} = 45^\\circ$.' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Chứng minh $AO \\perp (SBD)$ tại $O$, suy ra $(SA, (SBD)) = \\widehat{ASO} = 45^\\circ$.'
  },
  {
    prompt: 'Sắp xếp các bước tính độ dài $SA$ trong hình chóp $S.ABC$ có $SA \\perp (ABC)$, $\\triangle ABC$ vuông tại $B$ ($AB = 3a, BC = 4a$) và $(SC, (ABC)) = 60^\\circ$:',
    tikzType: 'custom',
    tikzCode: TIKZ_PYR_SABC_SA_PERP,
    steps: [
      { id: '1', text: 'Trong $\\triangle ABC$ vuông tại $B$, áp dụng định lí Pythagore: $AC = \\sqrt{AB^2 + BC^2} = 5a$.' },
      { id: '2', text: 'Vì $SA \\perp (ABC)$ tại $A$ nên $AC$ là hình chiếu vuông góc của $SC$ trên $(ABC)$.' },
      { id: '3', text: 'Suy ra góc giữa $SC$ và $(ABC)$ là $\\widehat{SCA} = 60^\\circ$.' },
      { id: '4', text: 'Trong $\\triangle SAC$ vuông tại $A$: $SA = AC \\cdot \\tan 60^\\circ = 5a\\sqrt{3}$.' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Tính $AC = 5a$, xác định $(SC, (ABC)) = \\widehat{SCA} = 60^\\circ$ và suy ra $SA = 5a\\sqrt{3}$.'
  },
  {
    prompt: 'Sắp xếp các bước chứng minh $BC \\perp SC$ trong hình chóp $S.ABCD$ có đáy là hình thang vuông tại $A, D$, biết $AB = 2a, AD = DC = a$ và $SA \\perp (ABCD)$:',
    steps: [
      { id: '1', text: 'Gọi $I$ là trung điểm của $AB$, suy ra tứ giác $ADCI$ là hình vuông cạnh $a$ và $CI = IA = IB = a$.' },
      { id: '2', text: 'Trong $\\triangle ABC$, đường trung tuyến $CI = \\frac{1}{2}AB$ nên $\\triangle ABC$ vuông tại $C$, tức là $BC \\perp AC$.' },
      { id: '3', text: 'Vì $SA \\perp (ABCD)$ tại $A$ nên $AC$ là hình chiếu vuông góc của đường xiên $SC$ trên mặt phẳng $(ABCD)$.' },
      { id: '4', text: 'Theo Định lí ba đường vuông góc, vì $BC \\perp AC$ nên $BC \\perp SC$.' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Sử dụng tính chất trung tuyến bằng nửa cạnh huyền để suy ra $BC \\perp AC$, sau đó áp dụng Định lí ba đường vuông góc suy ra $BC \\perp SC$.'
  }
];
