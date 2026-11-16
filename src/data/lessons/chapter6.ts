import { ExamSet } from '../../types/exam';
import {
  CompactMC,
  CompactTF,
  CompactSA,
  CompactSO,
  buildCompactLessonExamSet
} from './chapter4';

// ============================================================================
// HÌNH VẼ ĐỒ THỊ HÀM SỐ MŨ VÀ HÀM SỐ LÔGARIT CHUẨN TIKZ CHO CHƯƠNG VI
// ============================================================================
const TIKZ_EXP_GROWTH_2X = `\\begin{tikzpicture}[line join=round, line cap=round, scale=0.85]
  \\draw[->, thick] (-2.5,0) -- (2.8,0) node[below] {$x$};
  \\draw[->, thick] (0,-0.6) -- (0,4.5) node[left] {$y$};
  \\node[below left] at (0,0) {$O$};
  \\draw[dashed, gray] (1,0) node[below, black] {$1$} -- (1,2) -- (0,2) node[left, black] {$2$};
  \\draw[dashed, gray] (2,0) node[below, black] {$2$} -- (2,4) -- (0,4) node[left, black] {$4$};
  \\draw[very thick, blue, samples=100, domain=-2.2:2.05] plot (\\x, {pow(2,\\x)});
  \\filldraw[red] (0,1) circle (1.8pt) node[above left] {$1$};
  \\filldraw[blue] (1,2) circle (1.8pt);
  \\filldraw[blue] (2,4) circle (1.8pt);
  \\node[right, blue] at (1.6,3.4) {$y=a^x$};
\\end{tikzpicture}`;

const TIKZ_EXP_DECAY_HALF = `\\begin{tikzpicture}[line join=round, line cap=round, scale=0.85]
  \\draw[->, thick] (-2.3,0) -- (2.6,0) node[below] {$x$};
  \\draw[->, thick] (0,-0.6) -- (0,4.5) node[left] {$y$};
  \\node[below left] at (0,0) {$O$};
  \\draw[dashed, gray] (-1,0) node[below, black] {$-1$} -- (-1,3) -- (0,3) node[right, black] {$3$};
  \\draw[very thick, red, samples=100, domain=-1.3:2.3] plot (\\x, {pow(0.3333,\\x)});
  \\filldraw[blue] (0,1) circle (1.8pt) node[above right] {$1$};
  \\filldraw[red] (-1,3) circle (1.8pt);
  \\node[left, red] at (-0.9,3.5) {$y=a^x$};
\\end{tikzpicture}`;

const TIKZ_LOG_GROWTH_BASE2 = `\\begin{tikzpicture}[line join=round, line cap=round, scale=0.85]
  \\draw[->, thick] (-0.8,0) -- (4.6,0) node[below] {$x$};
  \\draw[->, thick] (0,-2.3) -- (0,2.5) node[left] {$y$};
  \\node[below left] at (0,0) {$O$};
  \\draw[dashed, gray] (2,0) node[below, black] {$2$} -- (2,1) -- (0,1) node[left, black] {$1$};
  \\draw[dashed, gray] (4,0) node[below, black] {$4$} -- (4,2) -- (0,2) node[left, black] {$2$};
  \\draw[very thick, blue, samples=100, domain=0.22:4.3] plot (\\x, {ln(\\x)/ln(2)});
  \\filldraw[red] (1,0) circle (1.8pt) node[below right] {$1$};
  \\filldraw[blue] (2,1) circle (1.8pt);
  \\filldraw[blue] (4,2) circle (1.8pt);
  \\node[above left, blue] at (3.6,1.9) {$y=\\log_a x$};
\\end{tikzpicture}`;

const TIKZ_BOTH_EXP_AND_LOG = `\\begin{tikzpicture}[line join=round, line cap=round, scale=0.82]
  \\draw[->, thick] (-2.2,0) -- (4.2,0) node[below] {$x$};
  \\draw[->, thick] (0,-2.2) -- (0,4.2) node[left] {$y$};
  \\node[below left] at (0,0) {$O$};
  \\draw[dashed, gray] (-1.8,-1.8) -- (3.6,3.6) node[above right, black] {$y=x$};
  \\draw[very thick, blue, samples=100, domain=-2.0:1.95] plot (\\x, {pow(2,\\x)}) node[above left] {$C_1: y=a^x$};
  \\draw[very thick, red, samples=100, domain=0.25:3.9] plot (\\x, {ln(\\x)/ln(2)}) node[below right] {$C_2: y=\\log_b x$};
  \\filldraw[blue] (0,1) circle (1.7pt) node[left] {$1$};
  \\filldraw[red] (1,0) circle (1.7pt) node[below] {$1$};
\\end{tikzpicture}`;

// ============================================================================
// BÀI 18. LUỸ THỪA VỚI SỐ MŨ THỰC
// Trọng tâm: Luỹ thừa với số mũ nguyên, căn bậc n, luỹ thừa với số mũ hữu tỉ,
// luỹ thừa với số mũ thực, các tính chất của phép tính luỹ thừa, bài toán lãi kép.
// ============================================================================

const b18P1A: CompactMC[] = [
  {
    prompt: 'Cho số thực $a \\ne 0$ và số nguyên dương $n$. Khẳng định nào sau đây là **đúng**?',
    options: [
      { id: 'A', text: '$a^0 = 0$ và $a^{-n} = -a^n$' },
      { id: 'B', text: '$a^0 = 1$ và $a^{-n} = \\frac{1}{a^n}$' },
      { id: 'C', text: '$a^0 = a$ và $a^{-n} = \\frac{1}{a^{-n}}$' },
      { id: 'D', text: '$a^0 = 1$ và $a^{-n} = -\\frac{1}{a^n}$' }
    ],
    correctOptionId: 'B',
    explanation: 'Theo định nghĩa luỹ thừa với số mũ nguyên: với $a \\ne 0$ và $n \\in \\mathbb{N}^*$, ta có $a^0 = 1$ và $a^{-n} = \\frac{1}{a^n}$.'
  },
  {
    prompt: 'Giá trị của biểu thức $P = 3^{-2} + \\left(\\frac{2}{5}\\right)^0 - 2^{-3} \\cdot 8$ bằng:',
    options: [
      { id: 'A', text: '$\\frac{1}{9}$' },
      { id: 'B', text: '$\\frac{10}{9}$' },
      { id: 'C', text: '$\\frac{19}{9}$' },
      { id: 'D', text: '$-\\frac{8}{9}$' }
    ],
    correctOptionId: 'A',
    explanation: 'Ta có $3^{-2} = \\frac{1}{9}$, $\\left(\\frac{2}{5}\\right)^0 = 1$, và $2^{-3} \\cdot 8 = \\frac{1}{8} \\cdot 8 = 1$. Do đó $P = \\frac{1}{9} + 1 - 1 = \\frac{1}{9}$.'
  },
  {
    prompt: 'Với số thực $a$ bất kì và số nguyên dương $n$ lẻ, đẳng thức nào sau đây là **đúng**?',
    options: [
      { id: 'A', text: '$\\sqrt[n]{a^n} = |a|$' },
      { id: 'B', text: '$\\sqrt[n]{a^n} = a$' },
      { id: 'C', text: '$\\sqrt[n]{a^n} = \\pm a$' },
      { id: 'D', text: '$\\sqrt[n]{a^n} = -a$' }
    ],
    correctOptionId: 'B',
    explanation: 'Theo tính chất của căn bậc $n$: khi $n$ lẻ thì $\\sqrt[n]{a^n} = a$ với mọi $a \\in \\mathbb{R}$; khi $n$ chẵn thì $\\sqrt[n]{a^n} = |a|$.'
  },
  {
    prompt: 'Tính giá trị của biểu thức $A = \\sqrt[3]{-64} + \\sqrt[4]{81} - \\sqrt[5]{-32}$.',
    options: [
      { id: 'A', text: '$-3$' },
      { id: 'B', text: '$1$' },
      { id: 'C', text: '$-1$' },
      { id: 'D', text: '$5$' }
    ],
    correctOptionId: 'B',
    explanation: 'Ta có $\\sqrt[3]{-64} = -4$, $\\sqrt[4]{81} = 3$, và $\\sqrt[5]{-32} = -2$. Vậy $A = -4 + 3 - (-2) = 1$.'
  },
  {
    prompt: 'Cho số thực dương $a$. Biểu thức $a^{\\frac{3}{5}} \\cdot \\sqrt[5]{a^7}$ viết dưới dạng luỹ thừa với số mũ hữu tỉ là:',
    options: [
      { id: 'A', text: '$a^{\\frac{21}{25}}$' },
      { id: 'B', text: '$a^2$' },
      { id: 'C', text: '$a^{\\frac{4}{5}}$' },
      { id: 'D', text: '$a^{10}$' }
    ],
    correctOptionId: 'B',
    explanation: 'Ta có $\\sqrt[5]{a^7} = a^{\\frac{7}{5}}$. Khi đó $a^{\\frac{3}{5}} \\cdot a^{\\frac{7}{5}} = a^{\\frac{3}{5} + \\frac{7}{5}} = a^{\\frac{10}{5}} = a^2$.'
  },
  {
    prompt: 'Tính giá trị của biểu thức $M = 27^{\\frac{2}{3}} + 16^{-0,75} - 25^{0,5}$.',
    options: [
      { id: 'A', text: '$\\frac{33}{8}$' },
      { id: 'B', text: '$\\frac{31}{8}$' },
      { id: 'C', text: '$\\frac{11}{2}$' },
      { id: 'D', text: '$4$' }
    ],
    correctOptionId: 'A',
    explanation: 'Ta có $27^{\\frac{2}{3}} = (3^3)^{\\frac{2}{3}} = 3^2 = 9$; $16^{-0,75} = (2^4)^{-\\frac{3}{4}} = 2^{-3} = \\frac{1}{8}$; $25^{0,5} = 5$. Vậy $M = 9 + \\frac{1}{8} - 5 = 4 + \\frac{1}{8} = \\frac{33}{8}$.'
  },
  {
    prompt: 'Với $a > 0$, rút gọn biểu thức $P = \\frac{a^{\\sqrt{5}+1} \\cdot a^{3-\\sqrt{5}}}{(a^{\\sqrt{2}-1})^{\\sqrt{2}+1}}$ ta được kết quả là:',
    options: [
      { id: 'A', text: '$a^2$' },
      { id: 'B', text: '$a^3$' },
      { id: 'C', text: '$a^4$' },
      { id: 'D', text: '$a$' }
    ],
    correctOptionId: 'B',
    explanation: 'Tử số bằng $a^{(\\sqrt{5}+1)+(3-\\sqrt{5})} = a^4$. Mẫu số bằng $a^{(\\sqrt{2}-1)(\\sqrt{2}+1)} = a^{2-1} = a^1$. Vậy $P = \\frac{a^4}{a^1} = a^3$.'
  },
  {
    prompt: 'Cho hai số thực dương $x, y$. Rút gọn biểu thức $Q = \\frac{x^{\\frac{4}{3}} y + x y^{\\frac{4}{3}}}{\\sqrt[3]{x} + \\sqrt[3]{y}}$ ta được:',
    options: [
      { id: 'A', text: '$xy$' },
      { id: 'B', text: '$x^{\\frac{1}{3}} y^{\\frac{1}{3}}$' },
      { id: 'C', text: '$x + y$' },
      { id: 'D', text: '$\\sqrt[3]{xy}$' }
    ],
    correctOptionId: 'A',
    explanation: 'Đặt nhân tử chung ở tử số: $x^{\\frac{4}{3}} y + x y^{\\frac{4}{3}} = xy\\left(x^{\\frac{1}{3}} + y^{\\frac{1}{3}}\\right) = xy(\\sqrt[3]{x} + \\sqrt[3]{y})$. Chia cho mẫu số $(\\sqrt[3]{x} + \\sqrt[3]{y}) > 0$, ta được $Q = xy$.'
  },
  {
    prompt: 'Khẳng định nào sau đây là **đúng** khi so sánh hai luỹ thừa?',
    options: [
      { id: 'A', text: '$\\left(\\frac{3}{4}\\right)^{\\sqrt{3}} > \\left(\\frac{3}{4}\\right)^{\\sqrt{2}}$' },
      { id: 'B', text: '$\\left(\\frac{5}{3}\\right)^{-2} > \\left(\\frac{5}{3}\\right)^{-1}$' },
      { id: 'C', text: '$(\\sqrt{5})^{2,3} > (\\sqrt{5})^{2,1}$' },
      { id: 'D', text: '$\\left(\\frac{1}{2}\\right)^{1,5} > \\left(\\frac{1}{2}\\right)^{1,2}$' }
    ],
    correctOptionId: 'C',
    explanation: 'Vì cơ số $a = \\sqrt{5} > 1$ và số mũ $2,3 > 2,1$ nên $(\\sqrt{5})^{2,3} > (\\sqrt{5})^{2,1}$. Các đáp án A, D có cơ số thuộc $(0;1)$ nên luỹ thừa nghịch biến theo số mũ; đáp án B có cơ số $\\frac{5}{3} > 1$ và $-2 < -1$ nên $\\left(\\frac{5}{3}\\right)^{-2} < \\left(\\frac{5}{3}\\right)^{-1}$.'
  },
  {
    prompt: 'Biết rằng $(a)^{\\frac{3}{5}} < (a)^{\\frac{4}{5}}$ với $a > 0$. Mệnh đề nào dưới đây là **đúng**?',
    options: [
      { id: 'A', text: '$0 < a < 1$' },
      { id: 'B', text: '$a > 1$' },
      { id: 'C', text: '$a = 1$' },
      { id: 'D', text: '$0 < a \\le 1$' }
    ],
    correctOptionId: 'B',
    explanation: 'Do số mũ $\\frac{3}{5} < \\frac{4}{5}$ cùng chiều với bất đẳng thức $a^{\\frac{3}{5}} < a^{\\frac{4}{5}}$ nên cơ số $a$ phải thoả mãn $a > 1$.'
  },
  {
    prompt: 'Cho $a > 0$. Biểu thức $\\sqrt{a \\cdot \\sqrt[3]{a^2}}$ được viết dưới dạng luỹ thừa với số mũ hữu tỉ là:',
    options: [
      { id: 'A', text: '$a^{\\frac{5}{6}}$' },
      { id: 'B', text: '$a^{\\frac{5}{3}}$' },
      { id: 'C', text: '$a^{\\frac{2}{3}}$' },
      { id: 'D', text: '$a^{\\frac{7}{6}}$' }
    ],
    correctOptionId: 'A',
    explanation: 'Ta có $\\sqrt[3]{a^2} = a^{\\frac{2}{3}}$, suy ra $a \\cdot \\sqrt[3]{a^2} = a^{1 + \\frac{2}{3}} = a^{\\frac{5}{3}}$. Do đó $\\sqrt{a \\cdot \\sqrt[3]{a^2}} = \\left(a^{\\frac{5}{3}}\\right)^{\\frac{1}{2}} = a^{\\frac{5}{6}}$.'
  },
  {
    prompt: 'Một người gửi tiết kiệm $100$ triệu đồng vào ngân hàng theo thể thức lãi kép kì hạn $1$ năm với lãi suất $6,5\\%$/năm. Giả sử người đó không rút tiền ra ở các kì trước, số tiền cả vốn lẫn lãi (đơn vị: triệu đồng) người đó nhận được sau $4$ năm được tính bởi công thức nào?',
    options: [
      { id: 'A', text: '$A = 100(1 + 6,5)^4$' },
      { id: 'B', text: '$A = 100(1 + 0,065)^4$' },
      { id: 'C', text: '$A = 100 \\cdot (0,065)^4$' },
      { id: 'D', text: '$A = 100(1 + 4 \\cdot 0,065)$' }
    ],
    correctOptionId: 'B',
    explanation: 'Theo công thức lãi kép $A = P(1+r)^N$ với $P = 100$ (triệu đồng), $r = 6,5\\% = 0,065$ và $N = 4$ (năm), ta có $A = 100(1 + 0,065)^4$.'
  }
];

const b18P2A: CompactTF[] = [
  {
    stem: 'Cho hai số thực dương $a, b$ và biểu thức $P = \\frac{a^{\\frac{5}{3}} b^{-\\frac{1}{2}}}{a^{\\frac{2}{3}} b^{\\frac{1}{2}}}$. Xét tính đúng sai của các mệnh đề sau:',
    statements: [
      {
        id: 'a',
        text: 'Áp dụng quy tắc chia hai luỹ thừa cùng cơ số, ta có $\\frac{a^{\\frac{5}{3}}}{a^{\\frac{2}{3}}} = a$.',
        isTrue: true,
        explanation: 'Đúng vì $\\frac{a^{\\frac{5}{3}}}{a^{\\frac{2}{3}}} = a^{\\frac{5}{3} - \\frac{2}{3}} = a^1 = a$.'
      },
      {
        id: 'b',
        text: 'Biểu thức rút gọn của $P$ là $P = ab$.',
        isTrue: false,
        explanation: 'Sai vì $\\frac{b^{-\\frac{1}{2}}}{b^{\\frac{1}{2}}} = b^{-1} = \\frac{1}{b}$, nên $P = ab^{-1} = \\frac{a}{b}$.'
      },
      {
        id: 'c',
        text: 'Khi $a = 12$ và $b = 3$ thì giá trị của biểu thức $P$ bằng $4$.',
        isTrue: true,
        explanation: 'Đúng vì $P = \\frac{a}{b} = \\frac{12}{3} = 4$.'
      },
      {
        id: 'd',
        text: 'Với mọi $a > 1$ thì $a^{\\frac{5}{3}} < a^{\\frac{2}{3}}$.',
        isTrue: false,
        explanation: 'Sai vì khi $a > 1$ và $\\frac{5}{3} > \\frac{2}{3}$ thì $a^{\\frac{5}{3}} > a^{\\frac{2}{3}}$.'
      }
    ]
  },
  {
    stem: 'Bác Minh gửi tiết kiệm $200$ triệu đồng vào một ngân hàng theo hình thức lãi kép kì hạn $1$ năm với lãi suất không đổi $6\\%$/năm. Xét tính đúng sai của các mệnh đề sau:',
    statements: [
      {
        id: 'a',
        text: 'Sau $1$ năm đầu tiên, tổng số tiền cả vốn lẫn lãi của bác Minh là $212$ triệu đồng.',
        isTrue: true,
        explanation: 'Đúng vì $A_1 = 200 \\cdot (1 + 0,06)^1 = 212$ (triệu đồng).'
      },
      {
        id: 'b',
        text: 'Công thức tính tổng số tiền cả vốn lẫn lãi sau $n$ năm ($n \\in \\mathbb{N}^*$) là $A_n = 200 \\cdot (1,06)^n$ (triệu đồng).',
        isTrue: true,
        explanation: 'Đúng theo công thức lãi kép $A_n = P(1+r)^n = 200(1 + 0,06)^n = 200(1,06)^n$.'
      },
      {
        id: 'c',
        text: 'Sau $3$ năm, số tiền lãi bác Minh thu được là đúng $36$ triệu đồng.',
        isTrue: false,
        explanation: 'Sai vì $A_3 = 200 \\cdot (1,06)^3 = 238,2032$ triệu đồng, nên tiền lãi là $38,2032$ triệu đồng (lớn hơn $36$ triệu đồng do lãi sinh lãi).'
      },
      {
        id: 'd',
        text: 'Sau $5$ năm, tổng số tiền cả vốn lẫn lãi của bác Minh vượt quá $265$ triệu đồng.',
        isTrue: true,
        explanation: 'Đúng vì $A_5 = 200 \\cdot (1,06)^5 \\approx 267,65$ triệu đồng $> 265$ triệu đồng.'
      }
    ]
  }
];

const b18P3A: CompactSA[] = [
  {
    prompt: 'Tính giá trị của biểu thức $T = 81^{0,75} - \\left(\\frac{1}{125}\\right)^{-\\frac{1}{3}} + 32^{\\frac{2}{5}}$.',
    correctAnswer: '26',
    acceptedAnswers: ['26'],
    explanation: 'Ta có $81^{0,75} = (3^4)^{\\frac{3}{4}} = 3^3 = 27$; $\\left(\\frac{1}{125}\\right)^{-\\frac{1}{3}} = (5^{-3})^{-\\frac{1}{3}} = 5^1 = 5$; $32^{\\frac{2}{5}} = (2^5)^{\\frac{2}{5}} = 2^2 = 4$. Vậy $T = 27 - 5 + 4 = 26$.'
  },
  {
    prompt: 'Cho số thực dương $a$ thỏa mãn biểu thức $\\sqrt[3]{a^2 \\cdot \\sqrt{a}} = a^{\\frac{m}{n}}$ với $\\frac{m}{n}$ là phân số tối giản và $m, n \\in \\mathbb{N}^*$. Tính tổng $m + n$.',
    correctAnswer: '11',
    acceptedAnswers: ['11'],
    explanation: 'Ta có $a^2 \\cdot \\sqrt{a} = a^{2 + \\frac{1}{2}} = a^{\\frac{5}{2}}$, suy ra $\\sqrt[3]{a^2 \\cdot \\sqrt{a}} = \\left(a^{\\frac{5}{2}}\\right)^{\\frac{1}{3}} = a^{\\frac{5}{6}}$. Phân số tối giản là $\\frac{5}{6}$ nên $m = 5, n = 6 \\Rightarrow m + n = 11$.'
  },
  {
    prompt: 'Cho số thực $x$ thỏa mãn $3^x + 3^{-x} = 4$. Tính giá trị của biểu thức $K = 9^x + 9^{-x}$.',
    correctAnswer: '14',
    acceptedAnswers: ['14'],
    explanation: 'Bình phương hai vế của giả thiết: $(3^x + 3^{-x})^2 = 4^2 \\Leftrightarrow 9^x + 2 \\cdot 3^x \\cdot 3^{-x} + 9^{-x} = 16 \\Leftrightarrow 9^x + 9^{-x} + 2 = 16 \\Rightarrow K = 14$.'
  },
  {
    prompt: 'Một người gửi $150$ triệu đồng vào ngân hàng theo thể thức lãi kép kì hạn $1$ năm với lãi suất $7\\%$/năm. Hỏi sau $3$ năm, người đó nhận được cả vốn lẫn lãi là bao nhiêu triệu đồng (làm tròn kết quả đến chữ số thập phân thứ nhất)?',
    correctAnswer: '183,8',
    acceptedAnswers: ['183,8', '183.8'],
    explanation: 'Số tiền nhận được sau $3$ năm là $A = 150 \\cdot (1 + 0,07)^3 = 150 \\cdot 1,225043 = 183,75645 \\approx 183,8$ (triệu đồng).'
  }
];

const b18P4A: CompactSO[] = [
  {
    prompt: 'Sắp xếp các bước dưới đây theo thứ tự đúng để rút gọn biểu thức $P = \\sqrt[4]{x^2 \\cdot \\sqrt[3]{x^4}}$ (với $x > 0$) về dạng một luỹ thừa:',
    steps: [
      { id: '1', text: 'Viết căn bậc ba ở trong cùng dưới dạng luỹ thừa với số mũ hữu tỉ: $\\sqrt[3]{x^4} = x^{\\frac{4}{3}}$.' },
      { id: '2', text: 'Áp dụng quy tắc nhân hai luỹ thừa cùng cơ số: $x^2 \\cdot x^{\\frac{4}{3}} = x^{2 + \\frac{4}{3}} = x^{\\frac{10}{3}}$.' },
      { id: '3', text: 'Viết căn bậc bốn ngoài cùng dưới dạng luỹ thừa: $P = \\left(x^{\\frac{10}{3}}\\right)^{\\frac{1}{4}}$.' },
      { id: '4', text: 'Nhân hai số mũ và rút gọn phân số: $P = x^{\\frac{10}{12}} = x^{\\frac{5}{6}}$.' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Thực hiện biến đổi từ căn thức bên trong ra bên ngoài: $\\sqrt[3]{x^4} = x^{\\frac{4}{3}} \\to x^2 \\cdot x^{\\frac{4}{3}} = x^{\\frac{10}{3}} \\to \\left(x^{\\frac{10}{3}}\\right)^{\\frac{1}{4}} = x^{\\frac{5}{6}}$.'
  },
  {
    prompt: 'Sắp xếp các bước giải bài toán: "Tính giá trị của $A = 4^x + 4^{-x}$ biết $2^x + 2^{-x} = 5$":',
    steps: [
      { id: '1', text: 'Bình phương hai vế của đẳng thức đã cho: $(2^x + 2^{-x})^2 = 5^2 = 25$.' },
      { id: '2', text: 'Khai triển hằng đẳng thức ở vế trái: $(2^x)^2 + 2 \\cdot 2^x \\cdot 2^{-x} + (2^{-x})^2 = 25$.' },
      { id: '3', text: 'Sử dụng tính chất $(2^x)^2 = 4^x$ và $2^x \\cdot 2^{-x} = 2^0 = 1$, thu gọn được $4^x + 2 + 4^{-x} = 25$.' },
      { id: '4', text: 'Chuyển vế và kết luận: $A = 4^x + 4^{-x} = 25 - 2 = 23$.' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Trình tự chuẩn: Bình phương hai vế $\\to$ Khai triển hằng đẳng thức $\\to$ Áp dụng $2^x \\cdot 2^{-x} = 1$ $\\to$ Suy ra $A = 23$.'
  },
  {
    prompt: 'Sắp xếp các bước để so sánh hai số $M = 2^{300}$ và $N = 3^{200}$:',
    steps: [
      { id: '1', text: 'Tách số mũ của hai luỹ thừa để đưa về cùng số mũ là $100$: $M = 2^{3 \\cdot 100}$ và $N = 3^{2 \\cdot 100}$.' },
      { id: '2', text: 'Áp dụng tính chất luỹ thừa của một luỹ thừa: $M = (2^3)^{100} = 8^{100}$ và $N = (3^2)^{100} = 9^{100}$.' },
      { id: '3', text: 'So sánh hai cơ số dương với số mũ dương $100$: vì $0 < 8 < 9$ nên $8^{100} < 9^{100}$.' },
      { id: '4', text: 'Kết luận $2^{300} < 3^{200}$ (tức là $M < N$).' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Đưa hai luỹ thừa về cùng số mũ $100$: $2^{300} = 8^{100}$ và $3^{200} = 9^{100}$, từ đó suy ra $2^{300} < 3^{200}$.'
  },
  {
    prompt: 'Sắp xếp các bước rút gọn biểu thức $B = \\frac{a^{\\frac{1}{2}} - b^{\\frac{1}{2}}}{a^{\\frac{1}{4}} + b^{\\frac{1}{4}}}$ (với $a > 0, b > 0$):',
    steps: [
      { id: '1', text: 'Biểu diễn tử số dưới dạng hiệu hai bình phương: $a^{\\frac{1}{2}} - b^{\\frac{1}{2}} = \\left(a^{\\frac{1}{4}}\\right)^2 - \\left(b^{\\frac{1}{4}}\\right)^2$.' },
      { id: '2', text: 'Phân tích tử số thành nhân tử: $a^{\\frac{1}{2}} - b^{\\frac{1}{2}} = \\left(a^{\\frac{1}{4}} - b^{\\frac{1}{4}}\\right)\\left(a^{\\frac{1}{4}} + b^{\\frac{1}{4}}\\right)$.' },
      { id: '3', text: 'Thay tử số đã phân tích vào biểu thức $B$: $B = \\frac{\\left(a^{\\frac{1}{4}} - b^{\\frac{1}{4}}\\right)\\left(a^{\\frac{1}{4}} + b^{\\frac{1}{4}}\\right)}{a^{\\frac{1}{4}} + b^{\\frac{1}{4}}}$.' },
      { id: '4', text: 'Chia cả tử và mẫu cho $\\left(a^{\\frac{1}{4}} + b^{\\frac{1}{4}}\\right) > 0$, thu được $B = a^{\\frac{1}{4}} - b^{\\frac{1}{4}}$.' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Sử dụng hằng đẳng thức hiệu hai bình phương với $u = a^{\\frac{1}{4}}, v = b^{\\frac{1}{4}}$ rồi giản ước nhân tử chung dương.'
  }
];

const b18P1B: CompactMC[] = [
  {
    prompt: 'Với các số thực dương $a, b$ và hai số thực $m, n$ bất kì, khẳng định nào sau đây là **sai**?',
    options: [
      { id: 'A', text: '$a^m \\cdot a^n = a^{m+n}$' },
      { id: 'B', text: '$(a^m)^n = a^{m+n}$' },
      { id: 'C', text: '$\\frac{a^m}{a^n} = a^{m-n}$' },
      { id: 'D', text: '$(ab)^m = a^m \\cdot b^m$' }
    ],
    correctOptionId: 'B',
    explanation: 'Theo tính chất của luỹ thừa với số mũ thực, $(a^m)^n = a^{m \\cdot n}$ chứ không phải $a^{m+n}$.'
  },
  {
    prompt: 'Tính giá trị của biểu thức $P = \\left(\\frac{1}{4}\\right)^{-2} - 5^0 + (-2)^3$.',
    options: [
      { id: 'A', text: '$7$' },
      { id: 'B', text: '$8$' },
      { id: 'C', text: '$23$' },
      { id: 'D', text: '$-9$' }
    ],
    correctOptionId: 'A',
    explanation: 'Ta có $\\left(\\frac{1}{4}\\right)^{-2} = 4^2 = 16$, $5^0 = 1$, và $(-2)^3 = -8$. Vậy $P = 16 - 1 + (-8) = 7$.'
  },
  {
    prompt: 'Với mọi số thực $a$, đẳng thức $\\sqrt[4]{a^4}$ bằng:',
    options: [
      { id: 'A', text: '$a$' },
      { id: 'B', text: '$-a$' },
      { id: 'C', text: '$|a|$' },
      { id: 'D', text: '$a^2$' }
    ],
    correctOptionId: 'C',
    explanation: 'Vì $n = 4$ là số nguyên dương chẵn nên $\\sqrt[4]{a^4} = |a|$ với mọi $a \\in \\mathbb{R}$.'
  },
  {
    prompt: 'Cho $a > 0$. Biểu thức $P = \\frac{a^{\\frac{7}{4}} \\cdot a^{-\\frac{1}{4}}}{\\sqrt{a}}$ bằng:',
    options: [
      { id: 'A', text: '$a^2$' },
      { id: 'B', text: '$a$' },
      { id: 'C', text: '$a^{\\frac{3}{2}}$' },
      { id: 'D', text: '$a^{\\frac{1}{2}}$' }
    ],
    correctOptionId: 'B',
    explanation: 'Tử số là $a^{\\frac{7}{4} - \\frac{1}{4}} = a^{\\frac{6}{4}} = a^{\\frac{3}{2}}$. Mẫu số là $\\sqrt{a} = a^{\\frac{1}{2}}$. Do đó $P = a^{\\frac{3}{2} - \\frac{1}{2}} = a^1 = a$.'
  },
  {
    prompt: 'Giá trị của biểu thức $N = 64^{\\frac{1}{3}} + 81^{-0,25} - 9^{1,5}$ là:',
    options: [
      { id: 'A', text: '$-\\frac{68}{3}$' },
      { id: 'B', text: '$-\\frac{70}{3}$' },
      { id: 'C', text: '$\\frac{13}{3}$' },
      { id: 'D', text: '$-23$' }
    ],
    correctOptionId: 'A',
    explanation: 'Ta có $64^{\\frac{1}{3}} = 4$; $81^{-0,25} = (3^4)^{-\\frac{1}{4}} = 3^{-1} = \\frac{1}{3}$; $9^{1,5} = (3^2)^{\\frac{3}{2}} = 3^3 = 27$. Vậy $N = 4 + \\frac{1}{3} - 27 = -23 + \\frac{1}{3} = -\\frac{68}{3}$.'
  },
  {
    prompt: 'Với $b > 0$, rút gọn biểu thức $K = \\left(b^{\\sqrt{3}-1}\\right)^{\\sqrt{3}+1} \\cdot b^3$ ta được:',
    options: [
      { id: 'A', text: '$b^5$' },
      { id: 'B', text: '$b^6$' },
      { id: 'C', text: '$b^4$' },
      { id: 'D', text: '$b^2$' }
    ],
    correctOptionId: 'A',
    explanation: 'Ta có $\\left(b^{\\sqrt{3}-1}\\right)^{\\sqrt{3}+1} = b^{(\\sqrt{3}-1)(\\sqrt{3}+1)} = b^{3-1} = b^2$. Do đó $K = b^2 \\cdot b^3 = b^5$.'
  },
  {
    prompt: 'Cho $a > 0$. Viết biểu thức $Q = \\sqrt[3]{a \\cdot \\sqrt{a^3}}$ dưới dạng luỹ thừa với số mũ hữu tỉ:',
    options: [
      { id: 'A', text: '$a^{\\frac{5}{6}}$' },
      { id: 'B', text: '$a^{\\frac{3}{2}}$' },
      { id: 'C', text: '$a^{\\frac{7}{6}}$' },
      { id: 'D', text: '$a^{\\frac{2}{3}}$' }
    ],
    correctOptionId: 'A',
    explanation: 'Ta có $a \\cdot \\sqrt{a^3} = a^1 \\cdot a^{\\frac{3}{2}} = a^{\\frac{5}{2}}$. Suy ra $Q = \\left(a^{\\frac{5}{2}}\\right)^{\\frac{1}{3}} = a^{\\frac{5}{6}}$.'
  },
  {
    prompt: 'Biết rằng $a^{\\sqrt{7}} > a^{\\sqrt{5}}$ với $a > 0, a \\ne 1$. Khẳng định nào sau đây là **đúng**?',
    options: [
      { id: 'A', text: '$0 < a < 1$' },
      { id: 'B', text: '$a > 1$' },
      { id: 'C', text: '$0 < a < \\sqrt{5}$' },
      { id: 'D', text: '$a < 0$' }
    ],
    correctOptionId: 'B',
    explanation: 'Vì $\\sqrt{7} > \\sqrt{5}$ và $a^{\\sqrt{7}} > a^{\\sqrt{5}}$ cùng chiều nên cơ số $a$ thỏa mãn $a > 1$.'
  },
  {
    prompt: 'Biết rằng $b^{-\\frac{2}{3}} < b^{-\\frac{1}{3}}$ với $b > 0, b \\ne 1$. Khẳng định nào sau đây là **đúng**?',
    options: [
      { id: 'A', text: '$0 < b < 1$' },
      { id: 'B', text: '$b > 1$' },
      { id: 'C', text: '$b = 1$' },
      { id: 'D', text: '$b < 0$' }
    ],
    correctOptionId: 'B',
    explanation: 'Ta có $-\\frac{2}{3} < -\\frac{1}{3}$. Vì bất đẳng thức $b^{-\\frac{2}{3}} < b^{-\\frac{1}{3}}$ giữ nguyên chiều so với hai số mũ nên $b > 1$.'
  },
  {
    prompt: 'Cho hai số thực dương $a, b$ thoả mãn $a \\ne b$. Rút gọn biểu thức $H = \\frac{a - b}{a^{\\frac{1}{2}} - b^{\\frac{1}{2}}} - \\frac{a - b}{a^{\\frac{1}{2}} + b^{\\frac{1}{2}}}$ ta được:',
    options: [
      { id: 'A', text: '$2\\sqrt{a}$' },
      { id: 'B', text: '$2\\sqrt{b}$' },
      { id: 'C', text: '$2(\\sqrt{a} + \\sqrt{b})$' },
      { id: 'D', text: '$0$' }
    ],
    correctOptionId: 'B',
    explanation: 'Vì $a - b = (\\sqrt{a} - \\sqrt{b})(\\sqrt{a} + \\sqrt{b})$ nên $\\frac{a-b}{\\sqrt{a}-\\sqrt{b}} = \\sqrt{a} + \\sqrt{b}$ và $\\frac{a-b}{\\sqrt{a}+\\sqrt{b}} = \\sqrt{a} - \\sqrt{b}$. Do đó $H = (\\sqrt{a} + \\sqrt{b}) - (\\sqrt{a} - \\sqrt{b}) = 2\\sqrt{b}$.'
  },
  {
    prompt: 'Dân số của một tỉnh năm $2024$ là $1{,}5$ triệu người. Giả sử tỉ lệ tăng dân số hàng năm của tỉnh đó không đổi là $1{,}2\\%$/năm. Dân số của tỉnh đó sau $6$ năm (tức năm $2030$), tính theo đơn vị triệu người, là:',
    options: [
      { id: 'A', text: '$1{,}5 \\cdot (1 + 0{,}012)^6$' },
      { id: 'B', text: '$1{,}5 \\cdot (1 + 1{,}2)^6$' },
      { id: 'C', text: '$1{,}5 \\cdot (0{,}012)^6$' },
      { id: 'D', text: '$1{,}5 \\cdot (1 + 6 \\cdot 0{,}012)$' }
    ],
    correctOptionId: 'A',
    explanation: 'Theo công thức tăng trưởng mũ $P_n = P_0(1+r)^n$ với $P_0 = 1{,}5$, $r = 1{,}2\\% = 0{,}012$ và $n = 6$, ta có $P_6 = 1{,}5 \\cdot (1 + 0{,}012)^6$.'
  },
  {
    prompt: 'Cho $5^x = 3$. Giá trị của biểu thức $A = 5^{2x + 1} - 125^x$ bằng:',
    options: [
      { id: 'A', text: '$18$' },
      { id: 'B', text: '$-18$' },
      { id: 'C', text: '$72$' },
      { id: 'D', text: '$9$' }
    ],
    correctOptionId: 'A',
    explanation: 'Ta có $5^{2x+1} = 5 \\cdot (5^x)^2 = 5 \\cdot 3^2 = 45$ và $125^x = (5^x)^3 = 3^3 = 27$. Vậy $A = 45 - 27 = 18$.'
  }
];

const b18P2B: CompactTF[] = [
  {
    stem: 'Cho số thực dương $x$ và biểu thức $A = \\frac{\\sqrt[3]{x^5} \\cdot x^{\\frac{4}{3}}}{\\sqrt{x^4}}$. Xét tính đúng sai của các mệnh đề sau:',
    statements: [
      {
        id: 'a',
        text: 'Ta có $\\sqrt[3]{x^5} = x^{\\frac{5}{3}}$ và $\\sqrt{x^4} = x^2$ (với $x > 0$).',
        isTrue: true,
        explanation: 'Đúng theo định nghĩa luỹ thừa với số mũ hữu tỉ.'
      },
      {
        id: 'b',
        text: 'Tử số của biểu thức $A$ sau khi thu gọn bằng $x^4$.',
        isTrue: false,
        explanation: 'Sai vì $x^{\\frac{5}{3}} \\cdot x^{\\frac{4}{3}} = x^{\\frac{9}{3}} = x^3$.'
      },
      {
        id: 'c',
        text: 'Biểu thức $A$ sau khi rút gọn bằng $x$.',
        isTrue: true,
        explanation: 'Đúng vì $A = \\frac{x^3}{x^2} = x$.'
      },
      {
        id: 'd',
        text: 'Tại $x = 27^{\\frac{2}{3}}$ thì giá trị của biểu thức $A$ bằng $9$.',
        isTrue: true,
        explanation: 'Đúng vì $A = x = 27^{\\frac{2}{3}} = (3^3)^{\\frac{2}{3}} = 3^2 = 9$.'
      }
    ]
  },
  {
    stem: 'Cho hai số thực $a, b$ thỏa mãn $0 < a < 1 < b$. Xét tính đúng sai của các mệnh đề sau:',
    statements: [
      {
        id: 'a',
        text: '$a^{\\sqrt{3}} < a^{\\sqrt{2}}$.',
        isTrue: true,
        explanation: 'Đúng vì $0 < a < 1$ và $\\sqrt{3} > \\sqrt{2}$ nên $a^{\\sqrt{3}} < a^{\\sqrt{2}}$.'
      },
      {
        id: 'b',
        text: '$b^{2,5} < b^{2,1}$.',
        isTrue: false,
        explanation: 'Sai vì $b > 1$ và $2,5 > 2,1$ nên $b^{2,5} > b^{2,1}$.'
      },
      {
        id: 'c',
        text: '$a^2 < 1 < b^2$.',
        isTrue: true,
        explanation: 'Đúng vì $0 < a < 1 \\Rightarrow a^2 < 1$ và $b > 1 \\Rightarrow b^2 > 1$.'
      },
      {
        id: 'd',
        text: '$\\left(\\frac{a}{b}\\right)^{-3} > \\left(\\frac{a}{b}\\right)^{-1}$.',
        isTrue: true,
        explanation: 'Đúng vì $0 < a < 1 < b \\Rightarrow 0 < \\frac{a}{b} < 1$. Do $-3 < -1$ và cơ số thuộc $(0;1)$ nên $\\left(\\frac{a}{b}\\right)^{-3} > \\left(\\frac{a}{b}\\right)^{-1}$.'
      }
    ]
  }
];

const b18P3B: CompactSA[] = [
  {
    prompt: 'Tính giá trị của biểu thức $S = 16^{0,75} + 125^{\\frac{2}{3}} - \\left(\\frac{1}{49}\\right)^{-0,5}$.',
    correctAnswer: '26',
    acceptedAnswers: ['26'],
    explanation: 'Ta có $16^{0,75} = (2^4)^{\\frac{3}{4}} = 8$; $125^{\\frac{2}{3}} = (5^3)^{\\frac{2}{3}} = 25$; $\\left(\\frac{1}{49}\\right)^{-0,5} = 49^{0,5} = 7$. Vậy $S = 8 + 25 - 7 = 26$.'
  },
  {
    prompt: 'Cho $a > 0$ thỏa mãn $\\frac{a^{\\frac{5}{4}} \\cdot \\sqrt[4]{a^7}}{\\sqrt[3]{a^2}} = a^{\\frac{p}{q}}$ với $\\frac{p}{q}$ là phân số tối giản ($p, q \\in \\mathbb{N}^*$). Tính hiệu $p - q$.',
    correctAnswer: '4',
    acceptedAnswers: ['4'],
    explanation: 'Tử số là $a^{\\frac{5}{4} + \\frac{7}{4}} = a^3$. Mẫu số là $a^{\\frac{2}{3}}$. Do đó biểu thức bằng $a^{3 - \\frac{2}{3}} = a^{\\frac{7}{3}}$. Suy ra $p = 7, q = 3 \\Rightarrow p - q = 4$.'
  },
  {
    prompt: 'Cho $2^x = 5$. Tính giá trị của biểu thức $M = 4^{x+1} - 2^{x+3}$.',
    correctAnswer: '60',
    acceptedAnswers: ['60'],
    explanation: 'Ta có $4^{x+1} = 4 \\cdot (2^x)^2 = 4 \\cdot 5^2 = 100$ và $2^{x+3} = 8 \\cdot 2^x = 8 \\cdot 5 = 40$. Vậy $M = 100 - 40 = 60$.'
  },
  {
    prompt: 'Chị Lan gửi tiết kiệm $300$ triệu đồng vào ngân hàng theo hình thức lãi kép kì hạn $1$ năm với lãi suất $6\\%$/năm. Hỏi sau $4$ năm, tổng số tiền cả vốn lẫn lãi chị Lan nhận được là bao nhiêu triệu đồng (làm tròn kết quả đến chữ số thập phân thứ nhất)?',
    correctAnswer: '378,7',
    acceptedAnswers: ['378,7', '378.7'],
    explanation: 'Tổng số tiền sau $4$ năm là $A = 300 \\cdot (1 + 0,06)^4 = 300 \\cdot 1,26247696 = 378,743088 \\approx 378,7$ (triệu đồng).'
  }
];

const b18P4B: CompactSO[] = [
  {
    prompt: 'Sắp xếp các bước tính giá trị của biểu thức $P = 27^{\\frac{2}{3}} + \\left(\\frac{1}{16}\\right)^{-0,75}$:',
    steps: [
      { id: '1', text: 'Phân tích các cơ số thành luỹ thừa của số nguyên tố: $27 = 3^3$ và $\\frac{1}{16} = 2^{-4}$.' },
      { id: '2', text: 'Thay vào biểu thức và đổi số thập phân sang phân số: $P = (3^3)^{\\frac{2}{3}} + (2^{-4})^{-\\frac{3}{4}}$.' },
      { id: '3', text: 'Áp dụng quy tắc $(a^m)^n = a^{m \\cdot n}$: $P = 3^{3 \\cdot \\frac{2}{3}} + 2^{(-4) \\cdot (-\\frac{3}{4})} = 3^2 + 2^3$.' },
      { id: '4', text: 'Tính giá trị luỹ thừa và cộng kết quả: $P = 9 + 8 = 17$.' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Đưa các cơ số về $3^3$ và $2^{-4}$, áp dụng $(a^m)^n = a^{mn}$ được $3^2 + 2^3 = 17$.'
  },
  {
    prompt: 'Sắp xếp các bước giải bài toán thực tế: "Một khu rừng có trữ lượng gỗ ban đầu là $4 \\cdot 10^5\\text{ m}^3$, tốc độ sinh trưởng trung bình mỗi năm là $4\\%$. Tính trữ lượng gỗ sau $5$ năm":',
    steps: [
      { id: '1', text: 'Xác định các đại lượng trong công thức tăng trưởng mũ: $P_0 = 4 \\cdot 10^5\\text{ (m}^3)$, $r = 4\\% = 0,04$, $N = 5$ (năm).' },
      { id: '2', text: 'Áp dụng công thức lãi kép (tăng trưởng định kì): $A = P_0(1 + r)^N$.' },
      { id: '3', text: 'Thay số vào công thức: $A = 4 \\cdot 10^5 \\cdot (1 + 0,04)^5 = 4 \\cdot 10^5 \\cdot (1,04)^5$.' },
      { id: '4', text: 'Tính giá trị xấp xỉ: $A \\approx 4{,}867 \\cdot 10^5\\text{ (m}^3)$.' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Xác định $P_0, r, N \\to$ Viết công thức $A = P_0(1+r)^N \\to$ Thay số $\\to$ Tính kết quả.'
  },
  {
    prompt: 'Sắp xếp các bước rút gọn biểu thức $M = \\frac{x^{\\frac{3}{2}} - y^{\\frac{3}{2}}}{x^{\\frac{1}{2}} - y^{\\frac{1}{2}}}$ (với $x > 0, y > 0, x \\ne y$):',
    steps: [
      { id: '1', text: 'Đặt $u = x^{\\frac{1}{2}}$ và $v = y^{\\frac{1}{2}}$ ($u > 0, v > 0, u \\ne v$), khi đó $x^{\\frac{3}{2}} = u^3$ và $y^{\\frac{3}{2}} = v^3$.' },
      { id: '2', text: 'Viết lại biểu thức theo $u, v$: $M = \\frac{u^3 - v^3}{u - v}$.' },
      { id: '3', text: 'Áp dụng hằng đẳng thức hiệu hai lập phương: $M = \\frac{(u - v)(u^2 + uv + v^2)}{u - v} = u^2 + uv + v^2$.' },
      { id: '4', text: 'Thay lại $u = \\sqrt{x}, v = \\sqrt{y}$ để kết luận: $M = x + \\sqrt{xy} + y$.' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Đặt ẩn phụ $u = x^{1/2}, v = y^{1/2}$, dùng hằng đẳng thức $u^3 - v^3 = (u-v)(u^2+uv+v^2)$ rồi trả về biến ban đầu.'
  },
  {
    prompt: 'Sắp xếp các bước tìm số nguyên $n$ thỏa mãn $\\left(\\frac{2}{3}\\right)^5 < \\left(\\frac{2}{3}\\right)^n < \\left(\\frac{2}{3}\\right)^3$:',
    steps: [
      { id: '1', text: 'Nhận xét cơ số của các luỹ thừa là $a = \\frac{2}{3}$ thoả mãn $0 < a < 1$.' },
      { id: '2', text: 'Áp dụng tính chất so sánh luỹ thừa với cơ số thuộc $(0; 1)$: đổi chiều bất đẳng thức đối với các số mũ.' },
      { id: '3', text: 'Suy ra điều kiện của số mũ $n$ là $3 < n < 5$.' },
      { id: '4', text: 'Vì $n \\in \\mathbb{Z}$ nên kết luận $n = 4$.' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Vì cơ số $0 < \\frac{2}{3} < 1$ nên đổi chiều bất đẳng thức mũ được $3 < n < 5$, suy ra $n = 4$.'
  }
];

// ============================================================================
// BÀI 19. LÔGARIT
// Trọng tâm: Khái niệm lôgarit, tính chất cơ bản, quy tắc tính lôgarit (tích,
// thương, luỹ thừa), công thức đổi cơ số, lôgarit thập phân & lôgarit tự nhiên,
// ứng dụng thực tiễn (độ pH, mức cường độ âm, Richter).
// ============================================================================

const b19P1A: CompactMC[] = [
  {
    prompt: 'Cho hai số thực dương $a, M$ với $a \\ne 1$. Theo định nghĩa lôgarit, khẳng định nào sau đây là **đúng**?',
    options: [
      { id: 'A', text: '$\\alpha = \\log_a M \\Leftrightarrow M^\\alpha = a$' },
      { id: 'B', text: '$\\alpha = \\log_a M \\Leftrightarrow a^\\alpha = M$' },
      { id: 'C', text: '$\\alpha = \\log_a M \\Leftrightarrow a^M = \\alpha$' },
      { id: 'D', text: '$\\alpha = \\log_a M \\Leftrightarrow \\alpha^a = M$' }
    ],
    correctOptionId: 'B',
    explanation: 'Theo định nghĩa: với $0 < a \\ne 1$ và $M > 0$, số thực $\\alpha$ thoả mãn $a^\\alpha = M$ được gọi là lôgarit cơ số $a$ của $M$, kí hiệu $\\alpha = \\log_a M$.'
  },
  {
    prompt: 'Với $0 < a \\ne 1$, khẳng định nào sau đây là **sai**?',
    options: [
      { id: 'A', text: '$\\log_a 1 = 0$' },
      { id: 'B', text: '$\\log_a a = 1$' },
      { id: 'C', text: '$\\log_a a^5 = 5$' },
      { id: 'D', text: '$\\log_a 0 = 1$' }
    ],
    correctOptionId: 'D',
    explanation: 'Biểu thức $\\log_a M$ chỉ có nghĩa khi $M > 0$, nên không tồn tại $\\log_a 0$.'
  },
  {
    prompt: 'Tính giá trị của biểu thức $P = \\log_2 32 + \\log_3 \\frac{1}{27} - \\log_5 1$.',
    options: [
      { id: 'A', text: '$2$' },
      { id: 'B', text: '$8$' },
      { id: 'C', text: '$1$' },
      { id: 'D', text: '$-2$' }
    ],
    correctOptionId: 'A',
    explanation: 'Ta có $\\log_2 32 = \\log_2 2^5 = 5$, $\\log_3 \\frac{1}{27} = \\log_3 3^{-3} = -3$, và $\\log_5 1 = 0$. Vậy $P = 5 + (-3) - 0 = 2$.'
  },
  {
    prompt: 'Tính giá trị của biểu thức $Q = 4^{\\log_2 5} + 27^{\\log_3 2}$.',
    options: [
      { id: 'A', text: '$18$' },
      { id: 'B', text: '$33$' },
      { id: 'C', text: '$16$' },
      { id: 'D', text: '$31$' }
    ],
    correctOptionId: 'B',
    explanation: 'Ta có $4^{\\log_2 5} = (2^{\\log_2 5})^2 = 5^2 = 25$ và $27^{\\log_3 2} = (3^{\\log_3 2})^3 = 2^3 = 8$. Vậy $Q = 25 + 8 = 33$.'
  },
  {
    prompt: 'Cho $0 < a \\ne 1$ và hai số thực dương $x, y$. Đẳng thức nào sau đây là **đúng**?',
    options: [
      { id: 'A', text: '$\\log_a (xy) = \\log_a x \\cdot \\log_a y$' },
      { id: 'B', text: '$\\log_a (x + y) = \\log_a x + \\log_a y$' },
      { id: 'C', text: '$\\log_a \\frac{x}{y} = \\log_a x - \\log_a y$' },
      { id: 'D', text: '$\\log_a \\frac{x}{y} = \\frac{\\log_a x}{\\log_a y}$' }
    ],
    correctOptionId: 'C',
    explanation: 'Theo quy tắc tính lôgarit của một thương: với $0 < a \\ne 1$ và $x, y > 0$, ta có $\\log_a \\frac{x}{y} = \\log_a x - \\log_a y$.'
  },
  {
    prompt: 'Tính giá trị của biểu thức $A = \\log_6 9 + \\log_6 4$.',
    options: [
      { id: 'A', text: '$2$' },
      { id: 'B', text: '$6$' },
      { id: 'C', text: '$3$' },
      { id: 'D', text: '$1$' }
    ],
    correctOptionId: 'A',
    explanation: 'Ta có $A = \\log_6 (9 \\cdot 4) = \\log_6 36 = \\log_6 6^2 = 2$.'
  },
  {
    prompt: 'Với số thực dương $a \\ne 1$, giá trị của $\\log_{a^3} \\left(a^5 \\sqrt{a}\\right)$ bằng:',
    options: [
      { id: 'A', text: '$\\frac{11}{6}$' },
      { id: 'B', text: '$\\frac{11}{2}$' },
      { id: 'C', text: '$\\frac{5}{6}$' },
      { id: 'D', text: '$\\frac{33}{2}$' }
    ],
    correctOptionId: 'A',
    explanation: 'Ta có $a^5 \\sqrt{a} = a^{5 + \\frac{1}{2}} = a^{\\frac{11}{2}}$. Áp dụng công thức $\\log_{a^\\alpha} a^\\beta = \\frac{\\beta}{\\alpha}$, ta được $\\log_{a^3} a^{\\frac{11}{2}} = \\frac{11/2}{3} = \\frac{11}{6}$.'
  },
  {
    prompt: 'Cho $\\log_2 3 = a$. Biểu thức $\\log_8 27$ tính theo $a$ bằng:',
    options: [
      { id: 'A', text: '$3a$' },
      { id: 'B', text: '$a$' },
      { id: 'C', text: '$\\frac{a}{3}$' },
      { id: 'D', text: '$a^3$' }
    ],
    correctOptionId: 'B',
    explanation: 'Ta có $\\log_8 27 = \\log_{2^3} (3^3) = \\frac{3}{3} \\log_2 3 = \\log_2 3 = a$.'
  },
  {
    prompt: 'Đặt $a = \\log_3 5$ và $b = \\log_3 2$. Biểu thức $\\log_3 90$ được biểu diễn theo $a$ và $b$ là:',
    options: [
      { id: 'A', text: '$2 + a + b$' },
      { id: 'B', text: '$2ab$' },
      { id: 'C', text: '$1 + 2a + b$' },
      { id: 'D', text: '$2 + a - b$' }
    ],
    correctOptionId: 'A',
    explanation: 'Phân tích $90 = 3^2 \\cdot 5 \\cdot 2$. Khi đó $\\log_3 90 = \\log_3(3^2 \\cdot 5 \\cdot 2) = \\log_3 3^2 + \\log_3 5 + \\log_3 2 = 2 + a + b$.'
  },
  {
    prompt: 'Giá trị của biểu thức $M = \\log_2 5 \\cdot \\log_5 7 \\cdot \\log_7 16$ bằng:',
    options: [
      { id: 'A', text: '$2$' },
      { id: 'B', text: '$4$' },
      { id: 'C', text: '$8$' },
      { id: 'D', text: '$16$' }
    ],
    correctOptionId: 'B',
    explanation: 'Áp dụng công thức đổi cơ số: $\\log_2 5 \\cdot \\log_5 7 = \\log_2 7$, suy ra $M = \\log_2 7 \\cdot \\log_7 16 = \\log_2 16 = \\log_2 2^4 = 4$.'
  },
  {
    prompt: 'Tính giá trị của biểu thức $K = \\log 250 + \\log 4 - \\ln e^3$.',
    options: [
      { id: 'A', text: '$0$' },
      { id: 'B', text: '$1$' },
      { id: 'C', text: '$-1$' },
      { id: 'D', text: '$3$' }
    ],
    correctOptionId: 'A',
    explanation: 'Ta có $\\log 250 + \\log 4 = \\log(250 \\cdot 4) = \\log 1000 = \\log 10^3 = 3$, và $\\ln e^3 = 3$. Do đó $K = 3 - 3 = 0$.'
  },
  {
    prompt: 'Trong hoá học, độ pH của một dung dịch được tính theo công thức $\\text{pH} = -\\log[\\text{H}^+]$, trong đó $[\\text{H}^+]$ là nồng độ ion hiđrô tính bằng mol/lít. Nếu một mẫu nước cam có nồng độ $[\\text{H}^+] = 10^{-3,5}\\text{ mol/L}$ thì độ pH của mẫu nước cam đó bằng:',
    options: [
      { id: 'A', text: '$3,5$' },
      { id: 'B', text: '$-3,5$' },
      { id: 'C', text: '$7$' },
      { id: 'D', text: '$10,5$' }
    ],
    correctOptionId: 'A',
    explanation: 'Thay $[\\text{H}^+] = 10^{-3,5}$ vào công thức: $\\text{pH} = -\\log(10^{-3,5}) = -(-3,5) = 3,5$.'
  }
];

const b19P2A: CompactTF[] = [
  {
    stem: 'Cho hai số thực dương $x, y$ thỏa mãn $\\log_2 x = 3$ và $\\log_2 y = -1$. Xét tính đúng sai của các mệnh đề sau:',
    statements: [
      {
        id: 'a',
        text: 'Giá trị của $x$ bằng $8$ và giá trị của $y$ bằng $\\frac{1}{2}$.',
        isTrue: true,
        explanation: 'Đúng vì $\\log_2 x = 3 \\Rightarrow x = 2^3 = 8$ và $\\log_2 y = -1 \\Rightarrow y = 2^{-1} = \\frac{1}{2}$.'
      },
      {
        id: 'b',
        text: 'Giá trị của biểu thức $\\log_2(x^2 y)$ bằng $5$.',
        isTrue: true,
        explanation: 'Đúng vì $\\log_2(x^2 y) = 2\\log_2 x + \\log_2 y = 2 \\cdot 3 + (-1) = 5$.'
      },
      {
        id: 'c',
        text: 'Giá trị của biểu thức $\\log_4 \\left(\\frac{x}{y^3}\\right)$ bằng $6$.',
        isTrue: false,
        explanation: 'Sai vì $\\log_4 \\left(\\frac{x}{y^3}\\right) = \\frac{1}{2}(\\log_2 x - 3\\log_2 y) = \\frac{1}{2}(3 - 3 \\cdot (-1)) = \\frac{6}{2} = 3$.'
      },
      {
        id: 'd',
        text: 'Giá trị của $\\log_x (4y)$ bằng $\\frac{1}{3}$.',
        isTrue: true,
        explanation: 'Đúng vì $\\log_x(4y) = \\frac{\\log_2(4y)}{\\log_2 x} = \\frac{2 + \\log_2 y}{\\log_2 x} = \\frac{2 + (-1)}{3} = \\frac{1}{3}$.'
      }
    ]
  },
  {
    stem: 'Mức cường độ âm $L$ (đơn vị: dB) được tính bởi công thức $L = 10\\log\\frac{I}{I_0}$, trong đó $I\\text{ (W/m}^2)$ là cường độ âm và $I_0 = 10^{-12}\\text{ W/m}^2$ là cường độ âm chuẩn. Xét tính đúng sai của các mệnh đề sau:',
    statements: [
      {
        id: 'a',
        text: 'Khi cường độ âm $I = I_0$ thì mức cường độ âm $L = 0\\text{ dB}$.',
        isTrue: true,
        explanation: 'Đúng vì $L = 10\\log\\frac{I_0}{I_0} = 10\\log 1 = 0\\text{ dB}$.'
      },
      {
        id: 'b',
        text: 'Một cuộc trò chuyện bình thường có cường độ âm $I = 10^{-6}\\text{ W/m}^2$ thì có mức cường độ âm là $60\\text{ dB}$.',
        isTrue: true,
        explanation: 'Đúng vì $L = 10\\log\\frac{10^{-6}}{10^{-12}} = 10\\log 10^6 = 60\\text{ dB}$.'
      },
      {
        id: 'c',
        text: 'Nếu cường độ âm $I$ tăng gấp $100$ lần thì mức cường độ âm $L$ tăng gấp $100$ lần.',
        isTrue: false,
        explanation: 'Sai vì $L\' = 10\\log\\frac{100I}{I_0} = 10(\\log 100 + \\log\\frac{I}{I_0}) = 20 + L$, tức là mức cường độ âm tăng thêm $20\\text{ dB}$ chứ không phải tăng gấp $100$ lần.'
      },
      {
        id: 'd',
        text: 'Một tiếng còi xe tải có mức cường độ âm $90\\text{ dB}$ thì có cường độ âm $I = 10^{-3}\\text{ W/m}^2$.',
        isTrue: true,
        explanation: 'Đúng vì $10\\log\\frac{I}{10^{-12}} = 90 \\Leftrightarrow \\log\\frac{I}{10^{-12}} = 9 \\Leftrightarrow \\frac{I}{10^{-12}} = 10^9 \\Leftrightarrow I = 10^{-3}\\text{ W/m}^2$.'
      }
    ]
  }
];

const b19P3A: CompactSA[] = [
  {
    prompt: 'Tính giá trị của biểu thức $P = \\log_3 54 - \\log_3 2 + 9^{\\log_3 4}$.',
    correctAnswer: '19',
    acceptedAnswers: ['19'],
    explanation: 'Ta có $\\log_3 54 - \\log_3 2 = \\log_3 \\frac{54}{2} = \\log_3 27 = 3$, và $9^{\\log_3 4} = (3^{\\log_3 4})^2 = 4^2 = 16$. Vậy $P = 3 + 16 = 19$.'
  },
  {
    prompt: 'Cho $\\log_2 5 = a$. Biểu thức $\\log_4 500$ viết dưới dạng $m + \\frac{n}{2}a$ với $m, n$ là các số nguyên. Tính giá trị của $2m + n$.',
    correctAnswer: '5',
    acceptedAnswers: ['5'],
    explanation: 'Ta có $500 = 4 \\cdot 125 = 2^2 \\cdot 5^3$. Khi đó $\\log_4 500 = \\frac{1}{2}\\log_2(2^2 \\cdot 5^3) = \\frac{1}{2}(2 + 3\\log_2 5) = 1 + \\frac{3}{2}a$. Vậy $m = 1, n = 3 \\Rightarrow 2m + n = 5$.'
  },
  {
    prompt: 'Cho hai số thực dương $a, b$ thỏa mãn $a^2 b^3 = 64$. Tính giá trị của biểu thức $S = 2\\log_2 a + 3\\log_2 b$.',
    correctAnswer: '6',
    acceptedAnswers: ['6'],
    explanation: 'Ta có $S = 2\\log_2 a + 3\\log_2 b = \\log_2(a^2) + \\log_2(b^3) = \\log_2(a^2 b^3) = \\log_2 64 = \\log_2 2^6 = 6$.'
  },
  {
    prompt: 'Độ lớn $M$ của một trận động đất theo thang Richter được tính bởi $M = \\log A - \\log A_0$, trong đó $A$ là biên độ rung chấn tối đa và $A_0$ là biên độ chuẩn. Hỏi một trận động đất độ lớn $7$ độ Richter có biên độ rung chấn tối đa gấp bao nhiêu lần biên độ rung chấn tối đa của một trận động đất độ lớn $5$ độ Richter?',
    correctAnswer: '100',
    acceptedAnswers: ['100'],
    explanation: 'Ta có $M_1 - M_2 = (\\log A_1 - \\log A_0) - (\\log A_2 - \\log A_0) = \\log\\frac{A_1}{A_2} \\Rightarrow \\log\\frac{A_1}{A_2} = 7 - 5 = 2 \\Rightarrow \\frac{A_1}{A_2} = 10^2 = 100$.'
  }
];

const b19P4A: CompactSO[] = [
  {
    prompt: 'Sắp xếp các bước tính giá trị của biểu thức $A = \\log_2 12 + \\log_2 6 - \\log_2 9$:',
    steps: [
      { id: '1', text: 'Áp dụng quy tắc lôgarit của một tích cho hai số hạng đầu: $\\log_2 12 + \\log_2 6 = \\log_2(12 \\cdot 6) = \\log_2 72$.' },
      { id: '2', text: 'Áp dụng quy tắc lôgarit của một thương: $A = \\log_2 72 - \\log_2 9 = \\log_2 \\left(\\frac{72}{9}\\right) = \\log_2 8$.' },
      { id: '3', text: 'Biểu diễn $8$ dưới dạng luỹ thừa cơ số $2$: $8 = 2^3$.' },
      { id: '4', text: 'Suy ra $A = \\log_2 2^3 = 3$.' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Gộp tổng thành tích $\\log_2 72$, trừ thành thương $\\log_2(72/9) = \\log_2 8 = 3$.'
  },
  {
    prompt: 'Sắp xếp các bước biểu diễn $\\log_6 45$ theo $a = \\log_2 3$ và $b = \\log_2 5$:',
    steps: [
      { id: '1', text: 'Áp dụng công thức đổi cơ số sang cơ số $2$: $\\log_6 45 = \\frac{\\log_2 45}{\\log_2 6}$.' },
      { id: '2', text: 'Phân tích $45 = 3^2 \\cdot 5$ và $6 = 2 \\cdot 3$ thành tích các thừa số nguyên tố.' },
      { id: '3', text: 'Dùng quy tắc lôgarit của tích và luỹ thừa: $\\frac{\\log_2(3^2 \\cdot 5)}{\\log_2(2 \\cdot 3)} = \\frac{2\\log_2 3 + \\log_2 5}{1 + \\log_2 3}$.' },
      { id: '4', text: 'Thay $a = \\log_2 3$ và $b = \\log_2 5$ vào, thu được $\\log_6 45 = \\frac{2a + b}{1 + a}$.' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Đổi sang cơ số $2$, phân tích $45 = 3^2 \\cdot 5$ và $6 = 2 \\cdot 3$, tách lôgarit và thay $a, b$.'
  },
  {
    prompt: 'Sắp xếp các bước rút gọn biểu thức $P = 3^{2 - \\log_3 5}$:',
    steps: [
      { id: '1', text: 'Áp dụng quy tắc chia hai luỹ thừa cùng cơ số: $3^{2 - \\log_3 5} = \\frac{3^2}{3^{\\log_3 5}}$.' },
      { id: '2', text: 'Tính tử số: $3^2 = 9$.' },
      { id: '3', text: 'Áp dụng tính chất cơ bản của lôgarit ở mẫu số: $3^{\\log_3 5} = 5$.' },
      { id: '4', text: 'Kết luận $P = \\frac{9}{5}$.' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Tách $3^{2 - \\log_3 5} = \\frac{3^2}{3^{\\log_3 5}} = \\frac{9}{5}$.'
  },
  {
    prompt: 'Sắp xếp các bước chứng minh đẳng thức $\\log_a b \\cdot \\log_b c = \\log_a c$ (với $0 < a, b, c \\ne 1$):',
    steps: [
      { id: '1', text: 'Sử dụng công thức đổi cơ số từ cơ số $b$ sang cơ số $a$ cho thừa số thứ hai: $\\log_b c = \\frac{\\log_a c}{\\log_a b}$.' },
      { id: '2', text: 'Thay vào vế trái của đẳng thức: $VT = \\log_a b \\cdot \\frac{\\log_a c}{\\log_a b}$.' },
      { id: '3', text: 'Vì $b > 0, b \\ne 1$ nên $\\log_a b \\ne 0$, ta giản ước thừa số $\\log_a b$ ở tử và mẫu.' },
      { id: '4', text: 'Thu được $VT = \\log_a c = VP$ (điều phải chứng minh).' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Áp dụng định lí đổi cơ số $\\log_b c = \\frac{\\log_a c}{\\log_a b}$ và giản ước $\\log_a b \\ne 0$.'
  }
];

const b19P1B: CompactMC[] = [
  {
    prompt: 'Biểu thức $\\log_a x$ có nghĩa khi và chỉ khi:',
    options: [
      { id: 'A', text: '$a > 0$ và $x > 0$' },
      { id: 'B', text: '$0 < a \\ne 1$ và $x > 0$' },
      { id: 'C', text: '$0 < a \\ne 1$ và $x \\ge 0$' },
      { id: 'D', text: '$a > 1$ và $x \\in \\mathbb{R}$' }
    ],
    correctOptionId: 'B',
    explanation: 'Lôgarit $\\log_a x$ xác định khi và chỉ khi cơ số $0 < a \\ne 1$ và biểu thức lấy lôgarit $x > 0$.'
  },
  {
    prompt: 'Tính giá trị của biểu thức $M = \\log_5 125 - \\log_2 \\frac{1}{16} + \\ln e^2$.',
    options: [
      { id: 'A', text: '$9$' },
      { id: 'B', text: '$1$' },
      { id: 'C', text: '$5$' },
      { id: 'D', text: '$7$' }
    ],
    correctOptionId: 'A',
    explanation: 'Ta có $\\log_5 125 = 3$, $\\log_2 \\frac{1}{16} = -4$, và $\\ln e^2 = 2$. Vậy $M = 3 - (-4) + 2 = 9$.'
  },
  {
    prompt: 'Với số thực dương $a \\ne 1$, biểu thức $P = \\log_{\\sqrt{a}} (a^3)$ có giá trị bằng:',
    options: [
      { id: 'A', text: '$\\frac{3}{2}$' },
      { id: 'B', text: '$6$' },
      { id: 'C', text: '$3$' },
      { id: 'D', text: '$9$' }
    ],
    correctOptionId: 'B',
    explanation: 'Ta có $\\log_{\\sqrt{a}}(a^3) = \\log_{a^{1/2}}(a^3) = \\frac{3}{1/2} \\log_a a = 6$.'
  },
  {
    prompt: 'Tính giá trị của biểu thức $A = \\log_3 54 - \\log_3 6 + \\log_2 8$.',
    options: [
      { id: 'A', text: '$5$' },
      { id: 'B', text: '$6$' },
      { id: 'C', text: '$4$' },
      { id: 'D', text: '$9$' }
    ],
    correctOptionId: 'A',
    explanation: 'Ta có $\\log_3 54 - \\log_3 6 = \\log_3 \\frac{54}{6} = \\log_3 9 = 2$, và $\\log_2 8 = 3$. Vậy $A = 2 + 3 = 5$.'
  },
  {
    prompt: 'Cho hai số thực dương $a, b$ thỏa mãn $\\log_3 a = 4$ và $\\log_3 b = -2$. Giá trị của $\\log_3 (a^2 b^3)$ bằng:',
    options: [
      { id: 'A', text: '$2$' },
      { id: 'B', text: '$14$' },
      { id: 'C', text: '$-2$' },
      { id: 'D', text: '$10$' }
    ],
    correctOptionId: 'A',
    explanation: 'Ta có $\\log_3(a^2 b^3) = 2\\log_3 a + 3\\log_3 b = 2 \\cdot 4 + 3 \\cdot (-2) = 8 - 6 = 2$.'
  },
  {
    prompt: 'Tính giá trị của biểu thức $T = 5^{2 + \\log_5 3}$.',
    options: [
      { id: 'A', text: '$15$' },
      { id: 'B', text: '$75$' },
      { id: 'C', text: '$28$' },
      { id: 'D', text: '$125$' }
    ],
    correctOptionId: 'B',
    explanation: 'Ta có $T = 5^2 \\cdot 5^{\\log_5 3} = 25 \\cdot 3 = 75$.'
  },
  {
    prompt: 'Đặt $m = \\log_2 7$. Biểu thức $\\log_7 32$ tính theo $m$ bằng:',
    options: [
      { id: 'A', text: '$5m$' },
      { id: 'B', text: '$\\frac{5}{m}$' },
      { id: 'C', text: '$\\frac{m}{5}$' },
      { id: 'D', text: '$m^5$' }
    ],
    correctOptionId: 'B',
    explanation: 'Ta có $\\log_7 32 = \\log_7 (2^5) = 5 \\log_7 2 = \\frac{5}{\\log_2 7} = \\frac{5}{m}$.'
  },
  {
    prompt: 'Cho $\\log 2 = a$. Giá trị của $\\log 50$ tính theo $a$ là:',
    options: [
      { id: 'A', text: '$2 - a$' },
      { id: 'B', text: '$1 + a$' },
      { id: 'C', text: '$2 + a$' },
      { id: 'D', text: '$5a$' }
    ],
    correctOptionId: 'A',
    explanation: 'Ta có $50 = \\frac{100}{2} \\Rightarrow \\log 50 = \\log 100 - \\log 2 = 2 - a$.'
  },
  {
    prompt: 'Giá trị của biểu thức $H = \\frac{1}{\\log_3 15} + \\frac{1}{\\log_5 15}$ bằng:',
    options: [
      { id: 'A', text: '$1$' },
      { id: 'B', text: '$15$' },
      { id: 'C', text: '$8$' },
      { id: 'D', text: '$2$' }
    ],
    correctOptionId: 'A',
    explanation: 'Áp dụng $\\frac{1}{\\log_a b} = \\log_b a$, ta có $H = \\log_{15} 3 + \\log_{15} 5 = \\log_{15}(3 \\cdot 5) = \\log_{15} 15 = 1$.'
  },
  {
    prompt: 'Với mọi số thực dương $x, y$, biểu thức $\\ln(e^4 x^3 y^{-2})$ bằng:',
    options: [
      { id: 'A', text: '$4 + 3\\ln x - 2\\ln y$' },
      { id: 'B', text: '$4 + 3\\ln x + 2\\ln y$' },
      { id: 'C', text: '$12\\ln x - 8\\ln y$' },
      { id: 'D', text: '$e^4 + 3\\ln x - 2\\ln y$' }
    ],
    correctOptionId: 'A',
    explanation: 'Ta có $\\ln(e^4 x^3 y^{-2}) = \\ln e^4 + \\ln x^3 + \\ln y^{-2} = 4 + 3\\ln x - 2\\ln y$.'
  },
  {
    prompt: 'Cho hai số thực dương $a, b$ thỏa mãn $\\log_2 a - 2\\log_4 b = 3$. Mối liên hệ giữa $a$ và $b$ là:',
    options: [
      { id: 'A', text: '$a = 8b$' },
      { id: 'B', text: '$a = 8b^2$' },
      { id: 'C', text: '$a = 6b$' },
      { id: 'D', text: '$a = 3b$' }
    ],
    correctOptionId: 'A',
    explanation: 'Ta có $2\\log_4 b = 2 \\cdot \\frac{1}{2}\\log_2 b = \\log_2 b$. Khi đó $\\log_2 a - \\log_2 b = 3 \\Leftrightarrow \\log_2 \\frac{a}{b} = 3 \\Leftrightarrow \\frac{a}{b} = 2^3 = 8 \\Leftrightarrow a = 8b$.'
  },
  {
    prompt: 'Bác An gửi tiết kiệm theo hình thức lãi kép liên tục được tính bởi công thức $A = P e^{rt}$, trong đó $P$ là vốn ban đầu, $r = 0,06$/năm là lãi suất và $t$ là thời gian gửi (tính bằng năm). Thời gian $t$ để số tiền cả vốn lẫn lãi gấp đôi vốn ban đầu ($A = 2P$) là:',
    options: [
      { id: 'A', text: '$t = \\frac{\\ln 2}{0,06}$ (năm)' },
      { id: 'B', text: '$t = \\frac{\\log 2}{0,06}$ (năm)' },
      { id: 'C', text: '$t = 2 \\ln(0,06)$ (năm)' },
      { id: 'D', text: '$t = \\frac{2}{0,06}$ (năm)' }
    ],
    correctOptionId: 'A',
    explanation: 'Khi $A = 2P$, ta có $2P = P e^{0,06t} \\Leftrightarrow e^{0,06t} = 2 \\Leftrightarrow 0,06t = \\ln 2 \\Leftrightarrow t = \\frac{\\ln 2}{0,06}$ (năm).'
  }
];

const b19P2B: CompactTF[] = [
  {
    stem: 'Đặt $a = \\log_2 3$ và $b = \\log_3 5$. Xét tính đúng sai của các mệnh đề sau:',
    statements: [
      {
        id: 'a',
        text: 'Giá trị của $\\log_2 5$ tính theo $a, b$ là $a + b$.',
        isTrue: false,
        explanation: 'Sai vì theo công thức đổi cơ số, $\\log_2 5 = \\log_2 3 \\cdot \\log_3 5 = ab$.'
      },
      {
        id: 'b',
        text: 'Giá trị của $\\log_2 15$ tính theo $a, b$ là $a(1 + b)$.',
        isTrue: true,
        explanation: 'Đúng vì $\\log_2 15 = \\log_2(3 \\cdot 5) = \\log_2 3 + \\log_2 5 = a + ab = a(1 + b)$.'
      },
      {
        id: 'c',
        text: 'Giá trị của $\\log_3 2$ bằng $\\frac{1}{a}$.',
        isTrue: true,
        explanation: 'Đúng theo công thức $\\log_3 2 = \\frac{1}{\\log_2 3} = \\frac{1}{a}$.'
      },
      {
        id: 'd',
        text: 'Biểu thức $\\log_6 15$ bằng $\\frac{a + ab}{1 + a}$.',
        isTrue: true,
        explanation: 'Đúng vì $\\log_6 15 = \\frac{\\log_2 15}{\\log_2 6} = \\frac{a + ab}{1 + a}$.'
      }
    ]
  },
  {
    stem: 'Độ pH của một dung dịch được tính theo công thức $\\text{pH} = -\\log[\\text{H}^+]$, với $[\\text{H}^+]$ là nồng độ ion hiđrô (mol/L). Dung dịch có $\\text{pH} < 7$ có tính axit, $\\text{pH} = 7$ là trung tính và $\\text{pH} > 7$ có tính kiềm. Xét tính đúng sai của các mệnh đề sau:',
    statements: [
      {
        id: 'a',
        text: 'Nước tinh khiết có $[\\text{H}^+] = 10^{-7}\\text{ mol/L}$ nên có $\\text{pH} = 7$ (trung tính).',
        isTrue: true,
        explanation: 'Đúng vì $\\text{pH} = -\\log(10^{-7}) = 7$.'
      },
      {
        id: 'b',
        text: 'Một dung dịch nước chanh có $[\\text{H}^+] = 10^{-2,4}\\text{ mol/L}$ có tính kiềm.',
        isTrue: false,
        explanation: 'Sai vì $\\text{pH} = -\\log(10^{-2,4}) = 2,4 < 7$, nên nước chanh có tính axit.'
      },
      {
        id: 'c',
        text: 'Dung dịch A có $\\text{pH} = 3$ và dung dịch B có $\\text{pH} = 5$ thì nồng độ $[\\text{H}^+]$ của dung dịch A gấp $100$ lần nồng độ $[\\text{H}^+]$ của dung dịch B.',
        isTrue: true,
        explanation: 'Đúng vì $[\\text{H}^+]_A = 10^{-3}$ và $[\\text{H}^+]_B = 10^{-5}$, suy ra $\\frac{[\\text{H}^+]_A}{[\\text{H}^+]_B} = \\frac{10^{-3}}{10^{-5}} = 10^2 = 100$.'
      },
      {
        id: 'd',
        text: 'Khi nồng độ $[\\text{H}^+]$ của dung dịch tăng lên $10$ lần thì độ pH của dung dịch giảm đi $1$ đơn vị.',
        isTrue: true,
        explanation: 'Đúng vì $\\text{pH}\' = -\\log(10[\\text{H}^+]) = -1 - \\log[\\text{H}^+] = \\text{pH} - 1$.'
      }
    ]
  }
];

const b19P3B: CompactSA[] = [
  {
    prompt: 'Tính giá trị của biểu thức $A = \\log_2 24 - \\log_2 3 + 25^{\\log_5 3}$.',
    correctAnswer: '12',
    acceptedAnswers: ['12'],
    explanation: 'Ta có $\\log_2 24 - \\log_2 3 = \\log_2 \\frac{24}{3} = \\log_2 8 = 3$, và $25^{\\log_5 3} = (5^{\\log_5 3})^2 = 3^2 = 9$. Vậy $A = 3 + 9 = 12$.'
  },
  {
    prompt: 'Tính giá trị của biểu thức $P = \\log_3 4 \\cdot \\log_4 5 \\cdot \\log_5 6 \\cdot \\log_6 81$.',
    correctAnswer: '4',
    acceptedAnswers: ['4'],
    explanation: 'Áp dụng liên tiếp công thức đổi cơ số: $P = \\log_3 81 = \\log_3(3^4) = 4$.'
  },
  {
    prompt: 'Cho hai số thực dương $x, y$ thỏa mãn $\\log_3 x = 2$ và $\\log_3 y = 3$. Tính giá trị của biểu thức $T = \\log_3(3x^2 y)$.',
    correctAnswer: '8',
    acceptedAnswers: ['8'],
    explanation: 'Ta có $T = \\log_3 3 + 2\\log_3 x + \\log_3 y = 1 + 2 \\cdot 2 + 3 = 8$.'
  },
  {
    prompt: 'Tại một nhà máy, khi một máy dệt hoạt động thì tạo ra mức cường độ âm là $80\\text{ dB}$. Nếu có $100$ máy dệt giống hệt nhau cùng hoạt động đồng thời (cường độ âm tổng cộng gấp $100$ lần cường độ âm của $1$ máy) thì mức cường độ âm tại đó bằng bao nhiêu $\\text{dB}$?',
    correctAnswer: '100',
    acceptedAnswers: ['100'],
    explanation: 'Ta có $L_{100} = 10\\log\\frac{100I_1}{I_0} = 10\\log 100 + 10\\log\\frac{I_1}{I_0} = 20 + 80 = 100\\text{ (dB)}$.'
  }
];

const b19P4B: CompactSO[] = [
  {
    prompt: 'Sắp xếp các bước tính giá trị của biểu thức $M = 8^{\\log_2 3}$:',
    steps: [
      { id: '1', text: 'Viết cơ số $8$ dưới dạng luỹ thừa cơ số $2$: $8 = 2^3$.' },
      { id: '2', text: 'Thay vào biểu thức và áp dụng tính chất luỹ thừa của một luỹ thừa: $M = (2^3)^{\\log_2 3} = \\left(2^{\\log_2 3}\\right)^3$.' },
      { id: '3', text: 'Áp dụng tính chất cơ bản $a^{\\log_a b} = b$: $2^{\\log_2 3} = 3$.' },
      { id: '4', text: 'Suy ra $M = 3^3 = 27$.' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Biến đổi $8^{\\log_2 3} = (2^{\\log_2 3})^3 = 3^3 = 27$.'
  },
  {
    prompt: 'Sắp xếp các bước rút gọn biểu thức $S = \\log_5 20 + 2\\log_5 \\frac{5}{2}$:',
    steps: [
      { id: '1', text: 'Áp dụng quy tắc đưa thừa số vào trong dấu lôgarit: $2\\log_5 \\frac{5}{2} = \\log_5 \\left(\\frac{5}{2}\\right)^2 = \\log_5 \\frac{25}{4}$.' },
      { id: '2', text: 'Áp dụng quy tắc lôgarit của một tích: $S = \\log_5 20 + \\log_5 \\frac{25}{4} = \\log_5 \\left(20 \\cdot \\frac{25}{4}\\right)$.' },
      { id: '3', text: 'Rút gọn biểu thức bên trong lôgarit: $20 \\cdot \\frac{25}{4} = 5 \\cdot 25 = 125 = 5^3$.' },
      { id: '4', text: 'Kết luận $S = \\log_5 5^3 = 3$.' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Đưa hệ số $2$ vào số mũ $\\to$ Nhân hai biểu thức trong $\\log_5$ được $125 = 5^3 \\to$ Kết quả bằng $3$.'
  },
  {
    prompt: 'Sắp xếp các bước tính $\\log_{12} 18$ theo $a = \\log_2 3$:',
    steps: [
      { id: '1', text: 'Áp dụng công thức đổi cơ số sang cơ số $2$: $\\log_{12} 18 = \\frac{\\log_2 18}{\\log_2 12}$.' },
      { id: '2', text: 'Phân tích $18 = 2 \\cdot 3^2$ và $12 = 2^2 \\cdot 3$.' },
      { id: '3', text: 'Khai triển tử số và mẫu số theo quy tắc lôgarit: $\\frac{\\log_2 2 + 2\\log_2 3}{\\log_2 2^2 + \\log_2 3} = \\frac{1 + 2\\log_2 3}{2 + \\log_2 3}$.' },
      { id: '4', text: 'Thay $\\log_2 3 = a$, ta được kết quả $\\log_{12} 18 = \\frac{1 + 2a}{2 + a}$.' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Đổi sang cơ số $2$, tách $18 = 2 \\cdot 3^2$ và $12 = 2^2 \\cdot 3$, thu được $\\frac{1+2a}{2+a}$.'
  },
  {
    prompt: 'Sắp xếp các bước tìm nồng độ $[\\text{H}^+]$ của dung dịch biết $\\text{pH} = 4,5$:',
    steps: [
      { id: '1', text: 'Viết công thức định nghĩa độ pH: $\\text{pH} = -\\log[\\text{H}^+]$.' },
      { id: '2', text: 'Thay $\\text{pH} = 4,5$ vào công thức: $-\\log[\\text{H}^+] = 4,5 \\Leftrightarrow \\log[\\text{H}^+] = -4,5$.' },
      { id: '3', text: 'Áp dụng định nghĩa lôgarit thập phân (cơ số $10$): $[\\text{H}^+] = 10^{-4,5}\\text{ (mol/L)}$.' },
      { id: '4', text: 'Tính giá trị xấp xỉ: $[\\text{H}^+] \\approx 3,16 \\cdot 10^{-5}\\text{ (mol/L)}$.' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Từ $\\text{pH} = -\\log[\\text{H}^+] = 4,5 \\Rightarrow \\log[\\text{H}^+] = -4,5 \\Rightarrow [\\text{H}^+] = 10^{-4,5}\\text{ mol/L}$.'
  }
];

// ============================================================================
// BÀI 20. HÀM SỐ MŨ VÀ HÀM SỐ LÔGARIT
// Trọng tâm: Định nghĩa, tập xác định, tập giá trị, tính đơn điệu (đồng biến,
// nghịch biến), tiệm cận và đồ thị của hàm số mũ y = a^x và hàm số lôgarit
// y = log_a x; ứng dụng thực tiễn.
// ============================================================================

const b20P1A: CompactMC[] = [
  {
    prompt: 'Hàm số nào trong các hàm số dưới đây là **hàm số mũ**?',
    options: [
      { id: 'A', text: '$y = x^5$' },
      { id: 'B', text: '$y = 5^x$' },
      { id: 'C', text: '$y = \\log_5 x$' },
      { id: 'D', text: '$y = x^{-3}$' }
    ],
    correctOptionId: 'B',
    explanation: 'Hàm số mũ có dạng $y = a^x$ với cơ số $0 < a \\ne 1$, nên $y = 5^x$ là hàm số mũ.'
  },
  {
    prompt: 'Tập xác định và tập giá trị của hàm số mũ $y = 3^x$ lần lượt là:',
    options: [
      { id: 'A', text: '$D = \\mathbb{R}$ và $T = \\mathbb{R}$' },
      { id: 'B', text: '$D = (0; +\\infty)$ và $T = \\mathbb{R}$' },
      { id: 'C', text: '$D = \\mathbb{R}$ và $T = (0; +\\infty)$' },
      { id: 'D', text: '$D = [0; +\\infty)$ và $T = (0; +\\infty)$' }
    ],
    correctOptionId: 'C',
    explanation: 'Mọi hàm số mũ $y = a^x$ ($0 < a \\ne 1$) có tập xác định $D = \\mathbb{R}$ và tập giá trị $T = (0; +\\infty)$.'
  },
  {
    prompt: 'Tập xác định của hàm số $y = \\log_3 (x - 4)$ là:',
    options: [
      { id: 'A', text: '$D = [4; +\\infty)$' },
      { id: 'B', text: '$D = (4; +\\infty)$' },
      { id: 'C', text: '$D = (-\\infty; 4)$' },
      { id: 'D', text: '$D = \\mathbb{R} \\setminus \\{4\\}$' }
    ],
    correctOptionId: 'B',
    explanation: 'Hàm số $\\log_3(x-4)$ xác định khi và chỉ khi $x - 4 > 0 \\Leftrightarrow x > 4$. Vậy $D = (4; +\\infty)$.'
  },
  {
    prompt: 'Trong các hàm số sau, hàm số nào **nghịch biến** trên $\\mathbb{R}$?',
    options: [
      { id: 'A', text: '$y = \\left(\\frac{4}{3}\\right)^x$' },
      { id: 'B', text: '$y = e^x$' },
      { id: 'C', text: '$y = \\left(\\frac{2}{5}\\right)^x$' },
      { id: 'D', text: '$y = (\\sqrt{3})^x$' }
    ],
    correctOptionId: 'C',
    explanation: 'Hàm số mũ $y = a^x$ nghịch biến trên $\\mathbb{R}$ khi $0 < a < 1$. Vì $0 < \\frac{2}{5} < 1$ nên $y = \\left(\\frac{2}{5}\\right)^x$ nghịch biến trên $\\mathbb{R}$.'
  },
  {
    prompt: 'Trong các hàm số sau, hàm số nào **đồng biến** trên khoảng $(0; +\\infty)$?',
    options: [
      { id: 'A', text: '$y = \\log_{0,4} x$' },
      { id: 'B', text: '$y = \\log_{\\frac{1}{3}} x$' },
      { id: 'C', text: '$y = \\ln x$' },
      { id: 'D', text: '$y = \\log_{\\frac{\\sqrt{2}}{2}} x$' }
    ],
    correctOptionId: 'C',
    explanation: 'Hàm số $y = \\ln x = \\log_e x$ có cơ số $e \\approx 2,718 > 1$ nên đồng biến trên khoảng $(0; +\\infty)$.'
  },
  {
    prompt: 'Đồ thị của hàm số mũ $y = a^x$ ($0 < a \\ne 1$) luôn đi qua điểm cố định nào sau đây?',
    options: [
      { id: 'A', text: '$M(1; 0)$' },
      { id: 'B', text: '$N(0; 1)$' },
      { id: 'C', text: '$P(0; 0)$' },
      { id: 'D', text: '$Q(1; 1)$' }
    ],
    correctOptionId: 'B',
    explanation: 'Vì $a^0 = 1$ với mọi $0 < a \\ne 1$ nên đồ thị hàm số $y = a^x$ luôn đi qua điểm $(0; 1)$.'
  },
  {
    prompt: 'Đồ thị của hàm số lôgarit $y = \\log_a x$ ($0 < a \\ne 1$) luôn đi qua điểm cố định nào sau đây?',
    options: [
      { id: 'A', text: '$A(1; 0)$' },
      { id: 'B', text: '$B(0; 1)$' },
      { id: 'C', text: '$C(0; 0)$' },
      { id: 'D', text: '$D(1; 1)$' }
    ],
    correctOptionId: 'A',
    explanation: 'Vì $\\log_a 1 = 0$ với mọi $0 < a \\ne 1$ nên đồ thị hàm số $y = \\log_a x$ luôn đi qua điểm $(1; 0)$.'
  },
  {
    prompt: 'Cho đồ thị hàm số mũ $y = a^x$ ($0 < a \\ne 1$) như hình vẽ bên dưới. Giá trị của cơ số $a$ bằng:',
    options: [
      { id: 'A', text: '$a = 2$' },
      { id: 'B', text: '$a = \\frac{1}{2}$' },
      { id: 'C', text: '$a = 4$' },
      { id: 'D', text: '$a = 3$' }
    ],
    correctOptionId: 'A',
    explanation: 'Từ hình vẽ, đồ thị hàm số $y = a^x$ đi qua điểm $(1; 2)$ và $(2; 4)$ nên $a^1 = 2 \\Leftrightarrow a = 2$.',
    tikzType: 'custom',
    tikzCode: TIKZ_EXP_GROWTH_2X
  },
  {
    prompt: 'Cho đồ thị hàm số lôgarit $y = \\log_a x$ ($0 < a \\ne 1$) như hình vẽ bên dưới. Giá trị của cơ số $a$ bằng:',
    options: [
      { id: 'A', text: '$a = 4$' },
      { id: 'B', text: '$a = 2$' },
      { id: 'C', text: '$a = \\frac{1}{2}$' },
      { id: 'D', text: '$a = \\sqrt{2}$' }
    ],
    correctOptionId: 'B',
    explanation: 'Từ hình vẽ, đồ thị hàm số $y = \\log_a x$ đi qua điểm $(2; 1)$ và $(4; 2)$, suy ra $\\log_a 2 = 1 \\Leftrightarrow a = 2$.',
    tikzType: 'custom',
    tikzCode: TIKZ_LOG_GROWTH_BASE2
  },
  {
    prompt: 'Tìm tập xác định $D$ của hàm số $y = \\ln(9 - x^2)$.',
    options: [
      { id: 'A', text: '$D = [-3; 3]$' },
      { id: 'B', text: '$D = (-3; 3)$' },
      { id: 'C', text: '$D = (-\\infty; -3) \\cup (3; +\\infty)$' },
      { id: 'D', text: '$D = (0; 3)$' }
    ],
    correctOptionId: 'B',
    explanation: 'Điều kiện xác định: $9 - x^2 > 0 \\Leftrightarrow -3 < x < 3$. Vậy $D = (-3; 3)$.'
  },
  {
    prompt: 'Giá trị lớn nhất của hàm số $y = 2^x$ trên đoạn $[-1; 3]$ bằng:',
    options: [
      { id: 'A', text: '$\\frac{1}{2}$' },
      { id: 'B', text: '$6$' },
      { id: 'C', text: '$8$' },
      { id: 'D', text: '$9$' }
    ],
    correctOptionId: 'C',
    explanation: 'Vì hàm số $y = 2^x$ có cơ số $2 > 1$ nên đồng biến trên $[-1; 3]$. Do đó $\\max_{[-1;3]} y = y(3) = 2^3 = 8$.'
  },
  {
    prompt: 'Số lượng vi khuẩn trong một mẫu nuôi cấy sau $t$ giờ được tính theo công thức $N(t) = 1000 \\cdot 2^t$. Số lượng vi khuẩn trong mẫu sau $5$ giờ là:',
    options: [
      { id: 'A', text: '$10\\,000$ vi khuẩn' },
      { id: 'B', text: '$32\\,000$ vi khuẩn' },
      { id: 'C', text: '$16\\,000$ vi khuẩn' },
      { id: 'D', text: '$25\\,000$ vi khuẩn' }
    ],
    correctOptionId: 'B',
    explanation: 'Thay $t = 5$ vào công thức: $N(5) = 1000 \\cdot 2^5 = 1000 \\cdot 32 = 32\\,000$ (vi khuẩn).'
  }
];

const b20P2A: CompactTF[] = [
  {
    stem: 'Cho hàm số mũ $f(x) = \\left(\\frac{1}{3}\\right)^x$ có đồ thị như hình vẽ bên dưới. Xét tính đúng sai của các mệnh đề sau:',
    tikzType: 'custom',
    tikzCode: TIKZ_EXP_DECAY_HALF,
    statements: [
      {
        id: 'a',
        text: 'Hàm số $f(x)$ có tập xác định là $\\mathbb{R}$ và tập giá trị là $(0; +\\infty)$.',
        isTrue: true,
        explanation: 'Đúng theo tính chất của hàm số mũ.'
      },
      {
        id: 'b',
        text: 'Hàm số $f(x)$ đồng biến trên $\\mathbb{R}$.',
        isTrue: false,
        explanation: 'Sai vì cơ số $a = \\frac{1}{3} \\in (0; 1)$ nên hàm số nghịch biến trên $\\mathbb{R}$.'
      },
      {
        id: 'c',
        text: 'Đồ thị hàm số luôn nằm phía trên trục hoành và đi qua hai điểm $(0; 1)$, $(-1; 3)$.',
        isTrue: true,
        explanation: 'Đúng vì $f(x) > 0, \\forall x \\in \\mathbb{R}$, $f(0) = 1$ và $f(-1) = \\left(\\frac{1}{3}\\right)^{-1} = 3$.'
      },
      {
        id: 'd',
        text: 'Trên đoạn $[-2; 1]$, giá trị lớn nhất của hàm số $f(x)$ bằng $9$.',
        isTrue: true,
        explanation: 'Đúng vì hàm số nghịch biến trên $[-2; 1]$ nên $\\max_{[-2;1]} f(x) = f(-2) = \\left(\\frac{1}{3}\\right)^{-2} = 9$.'
      }
    ]
  },
  {
    stem: 'Cho hàm số lôgarit $g(x) = \\log_2 (x - 1)$. Xét tính đúng sai của các mệnh đề sau:',
    statements: [
      {
        id: 'a',
        text: 'Tập xác định của hàm số $g(x)$ là $D = (1; +\\infty)$.',
        isTrue: true,
        explanation: 'Đúng vì điều kiện xác định là $x - 1 > 0 \\Leftrightarrow x > 1$.'
      },
      {
        id: 'b',
        text: 'Hàm số $g(x)$ đồng biến trên khoảng $(1; +\\infty)$.',
        isTrue: true,
        explanation: 'Đúng vì cơ số $a = 2 > 1$ và $u(x) = x - 1$ đồng biến nên $g(x)$ đồng biến trên $(1; +\\infty)$.'
      },
      {
        id: 'c',
        text: 'Đồ thị hàm số $g(x)$ cắt trục hoành tại điểm có hoành độ $x = 1$.',
        isTrue: false,
        explanation: 'Sai vì $g(x) = 0 \\Leftrightarrow \\log_2(x - 1) = 0 \\Leftrightarrow x - 1 = 1 \\Leftrightarrow x = 2$.'
      },
      {
        id: 'd',
        text: 'Giá trị của hàm số tại $x = 9$ bằng $3$.',
        isTrue: true,
        explanation: 'Đúng vì $g(9) = \\log_2(9 - 1) = \\log_2 8 = 3$.'
      }
    ]
  }
];

const b20P3A: CompactSA[] = [
  {
    prompt: 'Có bao nhiêu giá trị nguyên của $x$ thuộc tập xác định của hàm số $y = \\log_5 (6x - x^2 - 5)$?',
    correctAnswer: '3',
    acceptedAnswers: ['3'],
    explanation: 'Điều kiện xác định: $6x - x^2 - 5 > 0 \\Leftrightarrow x^2 - 6x + 5 < 0 \\Leftrightarrow 1 < x < 5$. Vì $x \\in \\mathbb{Z}$ nên $x \\in \\{2; 3; 4\\}$, có tất cả $3$ giá trị nguyên.'
  },
  {
    prompt: 'Biết đồ thị hàm số mũ $y = a^x$ ($0 < a \\ne 1$) đi qua điểm $M(3; 27)$. Tính giá trị của hàm số tại $x = 4$.',
    correctAnswer: '81',
    acceptedAnswers: ['81'],
    explanation: 'Vì $M(3; 27)$ thuộc đồ thị $y = a^x$ nên $a^3 = 27 \\Leftrightarrow a = 3$. Khi đó tại $x = 4$, ta có $y(4) = 3^4 = 81$.'
  },
  {
    prompt: 'Tìm giá trị lớn nhất của hàm số $y = \\log_2 (x + 3)$ trên đoạn $[1; 13]$.',
    correctAnswer: '4',
    acceptedAnswers: ['4'],
    explanation: 'Hàm số $y = \\log_2(x + 3)$ đồng biến trên $[1; 13]$ nên $\\max_{[1;13]} y = y(13) = \\log_2(13 + 3) = \\log_2 16 = 4$.'
  },
  {
    prompt: 'Hàm số $y = (2m - 5)^x$ là hàm số mũ đồng biến trên $\\mathbb{R}$. Tìm giá trị nguyên nhỏ nhất của tham số $m$.',
    correctAnswer: '4',
    acceptedAnswers: ['4'],
    explanation: 'Để hàm số $y = (2m - 5)^x$ đồng biến trên $\\mathbb{R}$ thì cơ số phải thoả mãn $2m - 5 > 1 \\Leftrightarrow 2m > 6 \\Leftrightarrow m > 3$. Giá trị nguyên nhỏ nhất của $m$ là $4$.'
  }
];

const b20P4A: CompactSO[] = [
  {
    prompt: 'Sắp xếp các bước tìm tập xác định của hàm số $y = \\log_3 (x^2 - 5x + 6)$:',
    steps: [
      { id: '1', text: 'Nêu điều kiện để biểu thức lôgarit có nghĩa: $x^2 - 5x + 6 > 0$.' },
      { id: '2', text: 'Tìm nghiệm của tam thức bậc hai $x^2 - 5x + 6 = 0 \\Leftrightarrow x = 2$ hoặc $x = 3$.' },
      { id: '3', text: 'Xét dấu tam thức bậc hai (hệ số $a = 1 > 0$): $x^2 - 5x + 6 > 0 \\Leftrightarrow x < 2$ hoặc $x > 3$.' },
      { id: '4', text: 'Kết luận tập xác định của hàm số là $D = (-\\infty; 2) \\cup (3; +\\infty)$.' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Đặt điều kiện $x^2 - 5x + 6 > 0 \\to$ Giải nghiệm $2, 3 \\to$ Xét dấu $\\to$ Kết luận $D = (-\\infty; 2) \\cup (3; +\\infty)$.'
  },
  {
    prompt: 'Sắp xếp các bước tìm cơ số $a$ và tính $f(-2)$ biết đồ thị hàm số mũ $f(x) = a^x$ ($0 < a \\ne 1$) đi qua điểm $A(2; 9)$:',
    steps: [
      { id: '1', text: 'Vì điểm $A(2; 9)$ thuộc đồ thị hàm số $f(x) = a^x$ nên ta có $a^2 = 9$.' },
      { id: '2', text: 'Kết hợp điều kiện cơ số $a > 0$, giải phương trình được $a = 3$.' },
      { id: '3', text: 'Xác định công thức hàm số là $f(x) = 3^x$.' },
      { id: '4', text: 'Thay $x = -2$ vào công thức: $f(-2) = 3^{-2} = \\frac{1}{9}$.' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Thay tọa độ $A(2; 9)$ tìm được $a = 3$, suy ra $f(x) = 3^x$ và $f(-2) = \\frac{1}{9}$.'
  },
  {
    prompt: 'Sắp xếp các bước tìm giá trị lớn nhất và nhỏ nhất của hàm số $y = \\left(\\frac{1}{2}\\right)^x$ trên đoạn $[-3; 2]$:',
    steps: [
      { id: '1', text: 'Nhận xét hàm số $y = \\left(\\frac{1}{2}\\right)^x$ có cơ số $a = \\frac{1}{2} \\in (0; 1)$ nên nghịch biến trên $\\mathbb{R}$.' },
      { id: '2', text: 'Suy ra hàm số nghịch biến trên đoạn $[-3; 2]$, đạt GTLN tại $x = -3$ và đạt GTNN tại $x = 2$.' },
      { id: '3', text: 'Tính giá trị lớn nhất: $\\max_{[-3;2]} y = y(-3) = \\left(\\frac{1}{2}\\right)^{-3} = 8$.' },
      { id: '4', text: 'Tính giá trị nhỏ nhất: $\\min_{[-3;2]} y = y(2) = \\left(\\frac{1}{2}\\right)^2 = \\frac{1}{4}$.' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Xét tính nghịch biến của hàm số cơ số $\\frac{1}{2} \\in (0;1)$, từ đó tính GTLN tại $x=-3$ và GTNN tại $x=2$.'
  },
  {
    prompt: 'Sắp xếp các bước tìm điều kiện của tham số $m$ để hàm số $y = \\log_{m-2} x$ nghịch biến trên khoảng $(0; +\\infty)$:',
    steps: [
      { id: '1', text: 'Nêu điều kiện để hàm số lôgarit $y = \\log_a x$ nghịch biến trên $(0; +\\infty)$ là $0 < a < 1$.' },
      { id: '2', text: 'Áp dụng cho cơ số $a = m - 2$, ta được bất phương trình kép $0 < m - 2 < 1$.' },
      { id: '3', text: 'Cộng cả ba vế của bất phương trình với $2$: $0 + 2 < m < 1 + 2$.' },
      { id: '4', text: 'Kết luận điều kiện của tham số $m$ là $2 < m < 3$.' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Hàm số $\\log_{m-2} x$ nghịch biến trên $(0; +\\infty) \\Leftrightarrow 0 < m - 2 < 1 \\Leftrightarrow 2 < m < 3$.'
  }
];

const b20P1B: CompactMC[] = [
  {
    prompt: 'Hàm số nào trong các hàm số dưới đây là **hàm số lôgarit**?',
    options: [
      { id: 'A', text: '$y = x^{\\ln 2}$' },
      { id: 'B', text: '$y = 2^x$' },
      { id: 'C', text: '$y = \\log_5 x$' },
      { id: 'D', text: '$y = \\frac{1}{x}$' }
    ],
    correctOptionId: 'C',
    explanation: 'Hàm số lôgarit có dạng $y = \\log_a x$ ($0 < a \\ne 1$), do đó $y = \\log_5 x$ là hàm số lôgarit.'
  },
  {
    prompt: 'Tập xác định và tập giá trị của hàm số lôgarit $y = \\log_2 x$ lần lượt là:',
    options: [
      { id: 'A', text: '$D = (0; +\\infty)$ và $T = \\mathbb{R}$' },
      { id: 'B', text: '$D = \\mathbb{R}$ và $T = (0; +\\infty)$' },
      { id: 'C', text: '$D = (0; +\\infty)$ và $T = (0; +\\infty)$' },
      { id: 'D', text: '$D = [0; +\\infty)$ và $T = \\mathbb{R}$' }
    ],
    correctOptionId: 'A',
    explanation: 'Hàm số lôgarit $y = \\log_a x$ ($0 < a \\ne 1$) có tập xác định $D = (0; +\\infty)$ và tập giá trị $T = \\mathbb{R}$.'
  },
  {
    prompt: 'Tìm tập xác định $D$ của hàm số $y = \\log_2 (10 - 2x)$.',
    options: [
      { id: 'A', text: '$D = (5; +\\infty)$' },
      { id: 'B', text: '$D = (-\\infty; 5)$' },
      { id: 'C', text: '$D = (-\\infty; 5]$' },
      { id: 'D', text: '$D = \\mathbb{R} \\setminus \\{5\\}$' }
    ],
    correctOptionId: 'B',
    explanation: 'Điều kiện xác định: $10 - 2x > 0 \\Leftrightarrow 2x < 10 \\Leftrightarrow x < 5$. Vậy $D = (-\\infty; 5)$.'
  },
  {
    prompt: 'Trong các hàm số sau, hàm số nào **đồng biến** trên $\\mathbb{R}$?',
    options: [
      { id: 'A', text: '$y = (0,8)^x$' },
      { id: 'B', text: '$y = \\left(\\frac{\\pi}{4}\\right)^x$' },
      { id: 'C', text: '$y = \\left(\\frac{e}{2}\\right)^x$' },
      { id: 'D', text: '$y = \\left(\\frac{1}{\\sqrt{3}}\\right)^x$' }
    ],
    correctOptionId: 'C',
    explanation: 'Vì $e \\approx 2,718 > 2$ nên cơ số $\\frac{e}{2} > 1$, suy ra hàm số $y = \\left(\\frac{e}{2}\\right)^x$ đồng biến trên $\\mathbb{R}$.'
  },
  {
    prompt: 'Trong các hàm số sau, hàm số nào **nghịch biến** trên khoảng $(0; +\\infty)$?',
    options: [
      { id: 'A', text: '$y = \\log_3 x$' },
      { id: 'B', text: '$y = \\log x$' },
      { id: 'C', text: '$y = \\ln x$' },
      { id: 'D', text: '$y = \\log_{0,5} x$' }
    ],
    correctOptionId: 'D',
    explanation: 'Hàm số lôgarit $y = \\log_a x$ nghịch biến trên $(0; +\\infty)$ khi $0 < a < 1$. Vì $a = 0,5 \\in (0; 1)$ nên $y = \\log_{0,5} x$ nghịch biến trên $(0; +\\infty)$.'
  },
  {
    prompt: 'Đồ thị của hàm số mũ $y = a^x$ ($0 < a \\ne 1$) nhận đường thẳng nào làm đường tiệm cận ngang?',
    options: [
      { id: 'A', text: 'Trục hoành $Ox$ ($y = 0$)' },
      { id: 'B', text: 'Trục tung $Oy$ ($x = 0$)' },
      { id: 'C', text: 'Đường thẳng $y = 1$' },
      { id: 'D', text: 'Đường thẳng $x = 1$' }
    ],
    correctOptionId: 'A',
    explanation: 'Đồ thị hàm số mũ $y = a^x$ luôn nằm phía trên trục hoành và nhận trục hoành $Ox$ ($y = 0$) làm tiệm cận ngang.'
  },
  {
    prompt: 'Cho đồ thị của hai hàm số $C_1: y = a^x$ và $C_2: y = \\log_b x$ đối xứng nhau qua đường phân giác $y = x$ như hình vẽ bên dưới. Khẳng định nào sau đây là **đúng**?',
    options: [
      { id: 'A', text: '$0 < a < 1$ và $0 < b < 1$' },
      { id: 'B', text: '$a > 1$ và $b > 1$' },
      { id: 'C', text: '$a > 1$ và $0 < b < 1$' },
      { id: 'D', text: '$0 < a < 1$ và $b > 1$' }
    ],
    correctOptionId: 'B',
    explanation: 'Từ hình vẽ, cả hai đồ thị $C_1: y = a^x$ và $C_2: y = \\log_b x$ đều đi lên từ trái sang phải (đồng biến trên tập xác định), do đó $a > 1$ và $b > 1$.',
    tikzType: 'custom',
    tikzCode: TIKZ_BOTH_EXP_AND_LOG
  },
  {
    prompt: 'Biết đồ thị hàm số $y = \\log_a x$ ($0 < a \\ne 1$) đi qua điểm $P(16; 2)$. Giá trị của cơ số $a$ là:',
    options: [
      { id: 'A', text: '$a = 8$' },
      { id: 'B', text: '$a = 4$' },
      { id: 'C', text: '$a = 2$' },
      { id: 'D', text: '$a = \\frac{1}{4}$' }
    ],
    correctOptionId: 'B',
    explanation: 'Thay tọa độ $P(16; 2)$ vào phương trình hàm số: $\\log_a 16 = 2 \\Leftrightarrow a^2 = 16$. Vì $0 < a \\ne 1$ nên $a = 4$.'
  },
  {
    prompt: 'Tìm tập xác định $D$ của hàm số $y = \\frac{2^x}{\\log_3 x - 1}$.',
    options: [
      { id: 'A', text: '$D = (0; +\\infty) \\setminus \\{3\\}$' },
      { id: 'B', text: '$D = \\mathbb{R} \\setminus \\{3\\}$' },
      { id: 'C', text: '$D = (3; +\\infty)$' },
      { id: 'D', text: '$D = (0; +\\infty) \\setminus \\{1\\}$' }
    ],
    correctOptionId: 'A',
    explanation: 'Điều kiện xác định: $x > 0$ và $\\log_3 x - 1 \\ne 0 \\Leftrightarrow x > 0$ và $x \\ne 3$. Vậy $D = (0; +\\infty) \\setminus \\{3\\}$.'
  },
  {
    prompt: 'Giá trị nhỏ nhất của hàm số $y = 3^{x-1}$ trên đoạn $[0; 3]$ bằng:',
    options: [
      { id: 'A', text: '$1$' },
      { id: 'B', text: '$\\frac{1}{3}$' },
      { id: 'C', text: '$9$' },
      { id: 'D', text: '$0$' }
    ],
    correctOptionId: 'B',
    explanation: 'Hàm số $y = 3^{x-1}$ đồng biến trên $[0; 3]$ nên $\\min_{[0;3]} y = y(0) = 3^{-1} = \\frac{1}{3}$.'
  },
  {
    prompt: 'Cho ba hàm số $y = a^x, y = b^x, y = c^x$ với $0 < a < 1 < b < c$. Tại $x = 2$, khẳng định nào sau đây là **đúng**?',
    options: [
      { id: 'A', text: '$a^2 < b^2 < c^2$' },
      { id: 'B', text: '$c^2 < b^2 < a^2$' },
      { id: 'C', text: '$a^2 < c^2 < b^2$' },
      { id: 'D', text: '$b^2 < a^2 < c^2$' }
    ],
    correctOptionId: 'A',
    explanation: 'Với $0 < a < 1 < b < c$ và số mũ dương $2 > 0$, ta có $a^2 < 1 < b^2 < c^2$.'
  },
  {
    prompt: 'Chất phóng xạ Polonium-210 có chu kì bán rã là $138$ ngày, nghĩa là cứ sau $138$ ngày thì khối lượng của nó giảm đi một nửa theo hàm số $m(t) = m_0 \\cdot \\left(\\frac{1}{2}\\right)^{\\frac{t}{138}}$. Nếu ban đầu có $80\\text{ g}$ Polonium-210 thì sau $276$ ngày khối lượng còn lại là:',
    options: [
      { id: 'A', text: '$40\\text{ g}$' },
      { id: 'B', text: '$20\\text{ g}$' },
      { id: 'C', text: '$10\\text{ g}$' },
      { id: 'D', text: '$30\\text{ g}$' }
    ],
    correctOptionId: 'B',
    explanation: 'Thay $m_0 = 80$ và $t = 276$ vào công thức: $m(276) = 80 \\cdot \\left(\\frac{1}{2}\\right)^{\\frac{276}{138}} = 80 \\cdot \\left(\\frac{1}{2}\\right)^2 = 20\\text{ (g)}$.'
  }
];

const b20P2B: CompactTF[] = [
  {
    stem: 'Cho hàm số $f(x) = \\log_{\\frac{1}{2}} x$. Xét tính đúng sai của các mệnh đề sau:',
    statements: [
      {
        id: 'a',
        text: 'Tập xác định của hàm số $f(x)$ là $D = (0; +\\infty)$.',
        isTrue: true,
        explanation: 'Đúng theo định nghĩa hàm số lôgarit.'
      },
      {
        id: 'b',
        text: 'Hàm số $f(x)$ nghịch biến trên khoảng $(0; +\\infty)$.',
        isTrue: true,
        explanation: 'Đúng vì cơ số $a = \\frac{1}{2} \\in (0; 1)$.'
      },
      {
        id: 'c',
        text: 'Với mọi $x > 1$ thì $f(x) > 0$.',
        isTrue: false,
        explanation: 'Sai vì $f(x)$ nghịch biến trên $(0; +\\infty)$ nên với $x > 1$ ta có $f(x) < f(1) = 0$.'
      },
      {
        id: 'd',
        text: 'Trên đoạn $[2; 8]$, giá trị nhỏ nhất của hàm số $f(x)$ bằng $-3$.',
        isTrue: true,
        explanation: 'Đúng vì hàm số nghịch biến trên $[2; 8]$ nên $\\min_{[2;8]} f(x) = f(8) = \\log_{1/2} 8 = -3$.'
      }
    ]
  },
  {
    stem: 'Áp suất khí quyển $P$ (đơn vị: mmHg) ở độ cao $h$ (đơn vị: km) so với mực nước biển được mô hình hoá bởi hàm số mũ $P(h) = 760 \\cdot e^{-0,125h}$. Xét tính đúng sai của các mệnh đề sau:',
    statements: [
      {
        id: 'a',
        text: 'Ở mực nước biển ($h = 0\\text{ km}$), áp suất khí quyển là $760\\text{ mmHg}$.',
        isTrue: true,
        explanation: 'Đúng vì $P(0) = 760 \\cdot e^0 = 760\\text{ mmHg}$.'
      },
      {
        id: 'b',
        text: 'Khi độ cao $h$ càng tăng thì áp suất khí quyển $P(h)$ càng giảm.',
        isTrue: true,
        explanation: 'Đúng vì $P(h) = 760 \\cdot (e^{-0,125})^h$ có cơ số $e^{-0,125} < 1$ nên nghịch biến theo $h$.'
      },
      {
        id: 'c',
        text: 'Ở độ cao $h = 8\\text{ km}$, áp suất khí quyển bằng $\\frac{760}{e}\\text{ mmHg}$.',
        isTrue: true,
        explanation: 'Đúng vì $P(8) = 760 \\cdot e^{-0,125 \\cdot 8} = 760 \\cdot e^{-1} = \\frac{760}{e}\\text{ mmHg}$.'
      },
      {
        id: 'd',
        text: 'Ở độ cao $h = 4\\text{ km}$, áp suất khí quyển lớn hơn $500\\text{ mmHg}$.',
        isTrue: false,
        explanation: 'Sai vì $P(4) = 760 \\cdot e^{-0,5} \\approx 460,96\\text{ mmHg} < 500\\text{ mmHg}$.'
      }
    ]
  }
];

const b20P3B: CompactSA[] = [
  {
    prompt: 'Biết đồ thị hàm số lôgarit $y = \\log_a x$ ($0 < a \\ne 1$) đi qua điểm $A(8; 3)$. Tính giá trị của hàm số tại $x = 32$.',
    correctAnswer: '5',
    acceptedAnswers: ['5'],
    explanation: 'Vì $A(8; 3)$ thuộc đồ thị nên $\\log_a 8 = 3 \\Leftrightarrow a^3 = 8 \\Leftrightarrow a = 2$. Khi đó tại $x = 32$, ta có $y(32) = \\log_2 32 = 5$.'
  },
  {
    prompt: 'Tìm tổng tất cả các giá trị nguyên của $x$ thuộc tập xác định của hàm số $y = \\ln(-x^2 + 7x - 6)$.',
    correctAnswer: '14',
    acceptedAnswers: ['14'],
    explanation: 'Điều kiện xác định: $-x^2 + 7x - 6 > 0 \\Leftrightarrow x^2 - 7x + 6 < 0 \\Leftrightarrow 1 < x < 6$. Các giá trị nguyên của $x$ là $2, 3, 4, 5$. Tổng của chúng bằng $2 + 3 + 4 + 5 = 14$.'
  },
  {
    prompt: 'Tính tổng giá trị lớn nhất và giá trị nhỏ nhất của hàm số $y = 3^x + 1$ trên đoạn $[0; 2]$.',
    correctAnswer: '12',
    acceptedAnswers: ['12'],
    explanation: 'Hàm số $y = 3^x + 1$ đồng biến trên $[0; 2]$ nên $\\min_{[0;2]} y = y(0) = 2$ và $\\max_{[0;2]} y = y(2) = 10$. Tổng GTLN và GTNN là $10 + 2 = 12$.'
  },
  {
    prompt: 'Có bao nhiêu giá trị nguyên của tham số $m$ để hàm số $y = (7 - m)^x$ là hàm số mũ nghịch biến trên $\\mathbb{R}$?',
    correctAnswer: '0',
    acceptedAnswers: ['0'],
    explanation: 'Hàm số $y = (7 - m)^x$ nghịch biến trên $\\mathbb{R} \\Leftrightarrow 0 < 7 - m < 1 \\Leftrightarrow 6 < m < 7$. Không có số nguyên $m$ nào thuộc khoảng $(6; 7)$ nên kết quả bằng $0$.'
  }
];

const b20P4B: CompactSO[] = [
  {
    prompt: 'Sắp xếp các bước tìm tập xác định của hàm số $y = \\frac{1}{\\sqrt{\\log_2 x - 3}}$:',
    steps: [
      { id: '1', text: 'Nêu điều kiện xác định của biểu thức lôgarit và căn thức ở mẫu: $x > 0$ và $\\log_2 x - 3 > 0$.' },
      { id: '2', text: 'Chuyển vế bất phương trình: $\\log_2 x > 3$.' },
      { id: '3', text: 'Vì cơ số $2 > 1$ nên hàm số $\\log_2 x$ đồng biến, suy ra $x > 2^3 = 8$ (thoả mãn $x > 0$).' },
      { id: '4', text: 'Kết luận tập xác định của hàm số là $D = (8; +\\infty)$.' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Điều kiện $x > 0$ và $\\log_2 x - 3 > 0 \\Leftrightarrow x > 8$, suy ra $D = (8; +\\infty)$.'
  },
  {
    prompt: 'Sắp xếp các bước tìm giá trị lớn nhất và nhỏ nhất của hàm số $y = \\log_3 (2x + 1)$ trên đoạn $[1; 4]$:',
    steps: [
      { id: '1', text: 'Xét trên đoạn $[1; 4]$, ta có $2x + 1 \\ge 3 > 0$ nên hàm số xác định và liên tục.' },
      { id: '2', text: 'Vì cơ số $3 > 1$ và $u = 2x + 1$ đồng biến nên hàm số $y = \\log_3(2x + 1)$ đồng biến trên đoạn $[1; 4]$.' },
      { id: '3', text: 'Tính giá trị nhỏ nhất tại đầu mút trái: $\\min_{[1;4]} y = y(1) = \\log_3 3 = 1$.' },
      { id: '4', text: 'Tính giá trị lớn nhất tại đầu mút phải: $\\max_{[1;4]} y = y(4) = \\log_3 9 = 2$.' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Hàm số đồng biến trên $[1; 4]$ nên đạt GTNN bằng $1$ tại $x=1$ và đạt GTLN bằng $2$ tại $x=4$.'
  },
  {
    prompt: 'Sắp xếp các bước xác định công thức hàm số lôgarit $y = \\log_a x$ biết đồ thị đi qua điểm $M\\left(\\frac{1}{9}; -2\\right)$:',
    steps: [
      { id: '1', text: 'Thay tọa độ điểm $M\\left(\\frac{1}{9}; -2\\right)$ vào phương trình $y = \\log_a x$: $\\log_a \\left(\\frac{1}{9}\\right) = -2$.' },
      { id: '2', text: 'Theo định nghĩa lôgarit, suy ra $a^{-2} = \\frac{1}{9} \\Leftrightarrow \\frac{1}{a^2} = \\frac{1}{9} \\Leftrightarrow a^2 = 9$.' },
      { id: '3', text: 'Kết hợp điều kiện cơ số $0 < a \\ne 1$, ta chọn $a = 3$.' },
      { id: '4', text: 'Kết luận công thức hàm số là $y = \\log_3 x$.' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Thay tọa độ điểm $M$ được $a^{-2} = \\frac{1}{9} \\Rightarrow a = 3$, suy ra $y = \\log_3 x$.'
  },
  {
    prompt: 'Sắp xếp các bước giải bài toán: "Đồng vị phóng xạ Carbon-14 phân rã theo công thức $m(t) = m_0 \\cdot 2^{-\\frac{t}{5730}}$. Tính tỉ số phần trăm khối lượng còn lại sau $11\\,460$ năm":',
    steps: [
      { id: '1', text: 'Lập tỉ số giữa khối lượng còn lại ở thời điểm $t$ và khối lượng ban đầu: $\\frac{m(t)}{m_0} = 2^{-\\frac{t}{5730}}$.' },
      { id: '2', text: 'Thay $t = 11\\,460$ năm vào biểu thức số mũ: $-\\frac{11\\,460}{5730} = -2$.' },
      { id: '3', text: 'Tính giá trị luỹ thừa: $\\frac{m(11\\,460)}{m_0} = 2^{-2} = \\frac{1}{4} = 0,25$.' },
      { id: '4', text: 'Kết luận khối lượng Carbon-14 còn lại bằng $25\\%$ khối lượng ban đầu.' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Thay $t = 11\\,460 = 2 \\cdot 5730$ được $2^{-2} = 0,25 = 25\\%$.'
  }
];

// ============================================================================
// BÀI 21. PHƯƠNG TRÌNH, BẤT PHƯƠNG TRÌNH MŨ VÀ LÔGARIT
// Trọng tâm: Phương trình mũ cơ bản a^x = b, phương trình lôgarit cơ bản
// log_a x = b, bất phương trình mũ và bất phương trình lôgarit (chú ý điều kiện
// xác định và chiều biến thiên khi 0 < a < 1 hoặc a > 1).
// ============================================================================

const b21P1A: CompactMC[] = [
  {
    prompt: 'Nghiệm của phương trình $3^{x - 2} = 27$ là:',
    options: [
      { id: 'A', text: '$x = 5$' },
      { id: 'B', text: '$x = 3$' },
      { id: 'C', text: '$x = 1$' },
      { id: 'D', text: '$x = 6$' }
    ],
    correctOptionId: 'A',
    explanation: 'Ta có $3^{x - 2} = 27 \\Leftrightarrow 3^{x - 2} = 3^3 \\Leftrightarrow x - 2 = 3 \\Leftrightarrow x = 5$.'
  },
  {
    prompt: 'Nghiệm của phương trình $2^{2x + 1} = 7$ là:',
    options: [
      { id: 'A', text: '$x = \\frac{\\log_2 7 - 1}{2}$' },
      { id: 'B', text: '$x = \\frac{\\log_7 2 - 1}{2}$' },
      { id: 'C', text: '$x = \\log_2 7 - 1$' },
      { id: 'D', text: '$x = \\frac{\\log_2 7 + 1}{2}$' }
    ],
    correctOptionId: 'A',
    explanation: 'Ta có $2^{2x + 1} = 7 \\Leftrightarrow 2x + 1 = \\log_2 7 \\Leftrightarrow x = \\frac{\\log_2 7 - 1}{2}$.'
  },
  {
    prompt: 'Tập nghiệm $S$ của phương trình $5^{x^2 - 4x + 3} = 1$ là:',
    options: [
      { id: 'A', text: '$S = \\{0\\}$' },
      { id: 'B', text: '$S = \\{1; 3\\}$' },
      { id: 'C', text: '$S = \\{-1; -3\\}$' },
      { id: 'D', text: '$S = \\{1; 4\\}$' }
    ],
    correctOptionId: 'B',
    explanation: 'Ta có $5^{x^2 - 4x + 3} = 1 \\Leftrightarrow x^2 - 4x + 3 = 0 \\Leftrightarrow x = 1$ hoặc $x = 3$. Vậy $S = \\{1; 3\\}$.'
  },
  {
    prompt: 'Nghiệm của phương trình $\\log_2 (3x - 5) = 3$ là:',
    options: [
      { id: 'A', text: '$x = \\frac{13}{3}$' },
      { id: 'B', text: '$x = \\frac{14}{3}$' },
      { id: 'C', text: '$x = \\frac{11}{3}$' },
      { id: 'D', text: '$x = 3$' }
    ],
    correctOptionId: 'A',
    explanation: 'Điều kiện $x > \\frac{5}{3}$. Ta có $\\log_2(3x - 5) = 3 \\Leftrightarrow 3x - 5 = 2^3 = 8 \\Leftrightarrow 3x = 13 \\Leftrightarrow x = \\frac{13}{3}$ (thoả mãn).'
  },
  {
    prompt: 'Tập nghiệm $S$ của phương trình $\\log_3 (x^2 - 2x) = 1$ là:',
    options: [
      { id: 'A', text: '$S = \\{3\\}$' },
      { id: 'B', text: '$S = \\{-1; 3\\}$' },
      { id: 'C', text: '$S = \\{1; -3\\}$' },
      { id: 'D', text: '$S = \\{-1\\}$' }
    ],
    correctOptionId: 'B',
    explanation: 'Ta có $\\log_3(x^2 - 2x) = 1 \\Leftrightarrow x^2 - 2x = 3 \\Leftrightarrow x^2 - 2x - 3 = 0 \\Leftrightarrow x = -1$ hoặc $x = 3$. Vậy $S = \\{-1; 3\\}$.'
  },
  {
    prompt: 'Số nghiệm thực của phương trình $\\log_5 (x - 1) + \\log_5 (x + 3) = 1$ là:',
    options: [
      { id: 'A', text: '$1$' },
      { id: 'B', text: '$2$' },
      { id: 'C', text: '$0$' },
      { id: 'D', text: '$3$' }
    ],
    correctOptionId: 'A',
    explanation: 'Điều kiện: $x > 1$. Khi đó $\\log_5[(x-1)(x+3)] = 1 \\Leftrightarrow x^2 + 2x - 3 = 5 \\Leftrightarrow x^2 + 2x - 8 = 0 \\Leftrightarrow x = 2$ (nhận) hoặc $x = -4$ (loại). Phương trình có đúng $1$ nghiệm.'
  },
  {
    prompt: 'Tập nghiệm của bất phương trình $2^{3x - 1} > 16$ là:',
    options: [
      { id: 'A', text: '$\\left(\\frac{5}{3}; +\\infty\\right)$' },
      { id: 'B', text: '$\\left(-\\infty; \\frac{5}{3}\\right)$' },
      { id: 'C', text: '$\\left(1; +\\infty\\right)$' },
      { id: 'D', text: '$\\left[\\frac{5}{3}; +\\infty\\right)$' }
    ],
    correctOptionId: 'A',
    explanation: 'Vì cơ số $2 > 1$ nên $2^{3x - 1} > 2^4 \\Leftrightarrow 3x - 1 > 4 \\Leftrightarrow x > \\frac{5}{3}$.'
  },
  {
    prompt: 'Tập nghiệm của bất phương trình $\\left(\\frac{1}{3}\\right)^{x - 2} \\ge 9$ là:',
    options: [
      { id: 'A', text: '$[0; +\\infty)$' },
      { id: 'B', text: '$(-\\infty; 0]$' },
      { id: 'C', text: '$(-\\infty; 4]$' },
      { id: 'D', text: '$[4; +\\infty)$' }
    ],
    correctOptionId: 'B',
    explanation: 'Ta có $\\left(\\frac{1}{3}\\right)^{x - 2} \\ge \\left(\\frac{1}{3}\\right)^{-2}$. Vì cơ số $0 < \\frac{1}{3} < 1$ nên đổi chiều bất đẳng thức: $x - 2 \\le -2 \\Leftrightarrow x \\le 0$.'
  },
  {
    prompt: 'Tập nghiệm của bất phương trình $\\log_3 (2x - 4) < 2$ là:',
    options: [
      { id: 'A', text: '$(-\\infty; 6,5)$' },
      { id: 'B', text: '$(2; 6,5)$' },
      { id: 'C', text: '$[2; 6,5)$' },
      { id: 'D', text: '$(6,5; +\\infty)$' }
    ],
    correctOptionId: 'B',
    explanation: 'Điều kiện xác định: $2x - 4 > 0 \\Leftrightarrow x > 2$. Vì cơ số $3 > 1$ nên $\\log_3(2x - 4) < 2 \\Leftrightarrow 0 < 2x - 4 < 3^2 = 9 \\Leftrightarrow 4 < 2x < 13 \\Leftrightarrow 2 < x < 6,5$.'
  },
  {
    prompt: 'Tập nghiệm của bất phương trình $\\log_{\\frac{1}{2}} (x - 1) \\ge -3$ là:',
    options: [
      { id: 'A', text: '$(1; 9]$' },
      { id: 'B', text: '$[9; +\\infty)$' },
      { id: 'C', text: '$(-\\infty; 9]$' },
      { id: 'D', text: '$[1; 9]$' }
    ],
    correctOptionId: 'A',
    explanation: 'Điều kiện: $x - 1 > 0 \\Leftrightarrow x > 1$. Vì cơ số $0 < \\frac{1}{2} < 1$ nên $\\log_{1/2}(x - 1) \\ge -3 \\Leftrightarrow 0 < x - 1 \\le \\left(\\frac{1}{2}\\right)^{-3} = 8 \\Leftrightarrow 1 < x \\le 9$.'
  },
  {
    prompt: 'Tổng tất cả các nghiệm của phương trình $4^{x^2 - 3x + 2} = 16$ bằng:',
    options: [
      { id: 'A', text: '$3$' },
      { id: 'B', text: '$-3$' },
      { id: 'C', text: '$0$' },
      { id: 'D', text: '$2$' }
    ],
    correctOptionId: 'A',
    explanation: 'Ta có $4^{x^2 - 3x + 2} = 4^2 \\Leftrightarrow x^2 - 3x + 2 = 2 \\Leftrightarrow x^2 - 3x = 0 \\Leftrightarrow x = 0$ hoặc $x = 3$. Tổng các nghiệm bằng $0 + 3 = 3$.'
  },
  {
    prompt: 'Tập nghiệm của bất phương trình $\\ln(2x + 1) > \\ln(x + 5)$ là:',
    options: [
      { id: 'A', text: '$(4; +\\infty)$' },
      { id: 'B', text: '$\\left(-\\frac{1}{2}; 4\\right)$' },
      { id: 'C', text: '$(-5; 4)$' },
      { id: 'D', text: '$[4; +\\infty)$' }
    ],
    correctOptionId: 'A',
    explanation: 'Vì cơ số $e > 1$ nên $\\ln(2x + 1) > \\ln(x + 5) \\Leftrightarrow 2x + 1 > x + 5 > 0 \\Leftrightarrow x > 4$.'
  }
];

const b21P2A: CompactTF[] = [
  {
    stem: 'Cho phương trình lôgarit $\\log_2 (x - 2) + \\log_2 (x - 4) = 3$ (1). Xét tính đúng sai của các mệnh đề sau:',
    statements: [
      {
        id: 'a',
        text: 'Điều kiện xác định của phương trình (1) là $x > 4$.',
        isTrue: true,
        explanation: 'Đúng vì $\\begin{cases} x - 2 > 0 \\\\ x - 4 > 0 \\end{cases} \\Leftrightarrow x > 4$.'
      },
      {
        id: 'b',
        text: 'Trên tập xác định, phương trình (1) tương đương với phương trình bậc hai $x^2 - 6x = 0$.',
        isTrue: true,
        explanation: 'Đúng vì $\\log_2[(x-2)(x-4)] = 3 \\Leftrightarrow x^2 - 6x + 8 = 2^3 = 8 \\Leftrightarrow x^2 - 6x = 0$.'
      },
      {
        id: 'c',
        text: 'Phương trình (1) có hai nghiệm phân biệt là $x = 0$ và $x = 6$.',
        isTrue: false,
        explanation: 'Sai vì đối chiếu điều kiện $x > 4$, nghiệm $x = 0$ bị loại, chỉ nhận $x = 6$.'
      },
      {
        id: 'd',
        text: 'Nghiệm của phương trình (1) cũng là nghiệm của phương trình $2^{x - 3} = 8$.',
        isTrue: true,
        explanation: 'Đúng vì phương trình $2^{x - 3} = 8 = 2^3$ có nghiệm duy nhất $x = 6$.'
      }
    ]
  },
  {
    stem: 'Cho bất phương trình mũ $\\left(\\frac{1}{5}\\right)^{x^2 - 4x} > \\frac{1}{125}$ (2). Xét tính đúng sai của các mệnh đề sau:',
    statements: [
      {
        id: 'a',
        text: 'Vế phải của bất phương trình (2) viết dưới dạng luỹ thừa cơ số $\\frac{1}{5}$ là $\\left(\\frac{1}{5}\\right)^3$.',
        isTrue: true,
        explanation: 'Đúng vì $\\frac{1}{125} = \\frac{1}{5^3} = \\left(\\frac{1}{5}\\right)^3$.'
      },
      {
        id: 'b',
        text: 'Bất phương trình (2) tương đương với $x^2 - 4x > 3$.',
        isTrue: false,
        explanation: 'Sai vì cơ số $\\frac{1}{5} \\in (0; 1)$ nên phải đổi chiều bất đẳng thức thành $x^2 - 4x < 3$.'
      },
      {
        id: 'c',
        text: 'Tập nghiệm của bất phương trình (2) là khoảng $(2 - \\sqrt{7}; 2 + \\sqrt{7})$.',
        isTrue: true,
        explanation: 'Đúng vì $x^2 - 4x - 3 < 0 \\Leftrightarrow 2 - \\sqrt{7} < x < 2 + \\sqrt{7}$.'
      },
      {
        id: 'd',
        text: 'Bất phương trình (2) có tất cả $5$ nghiệm nguyên.',
        isTrue: true,
        explanation: 'Đúng vì $\\sqrt{7} \\approx 2,646$ nên $x \\in (-0,646; 4,646)$. Các nghiệm nguyên là $x \\in \\{0; 1; 2; 3; 4\\}$, gồm $5$ nghiệm nguyên.'
      }
    ]
  }
];

const b21P3A: CompactSA[] = [
  {
    prompt: 'Tìm nghiệm của phương trình $3^{2x - 1} = 243$.',
    correctAnswer: '3',
    acceptedAnswers: ['3'],
    explanation: 'Ta có $3^{2x - 1} = 243 = 3^5 \\Leftrightarrow 2x - 1 = 5 \\Leftrightarrow x = 3$.'
  },
  {
    prompt: 'Tìm nghiệm của phương trình $\\log_3 (2x + 1) = \\log_3 (x + 7)$.',
    correctAnswer: '6',
    acceptedAnswers: ['6'],
    explanation: 'Điều kiện: $x > -\\frac{1}{2}$. Phương trình tương đương $2x + 1 = x + 7 \\Leftrightarrow x = 6$ (thoả mãn).'
  },
  {
    prompt: 'Có bao nhiêu nghiệm nguyên của bất phương trình $\\log_2 (x - 3) \\le 3$?',
    correctAnswer: '8',
    acceptedAnswers: ['8'],
    explanation: 'Điều kiện $x > 3$. Ta có $\\log_2(x - 3) \\le 3 \\Leftrightarrow 0 < x - 3 \\le 8 \\Leftrightarrow 3 < x \\le 11$. Các nghiệm nguyên là $4, 5, 6, 7, 8, 9, 10, 11$, có tất cả $8$ nghiệm nguyên.'
  },
  {
    prompt: 'Một người gửi tiết kiệm $100$ triệu đồng vào ngân hàng với lãi suất kép $8\\%$/năm. Hỏi sau ít nhất bao nhiêu năm nguyên thì tổng số tiền cả vốn lẫn lãi người đó nhận được vượt quá $200$ triệu đồng?',
    correctAnswer: '10',
    acceptedAnswers: ['10'],
    explanation: 'Ta cần $100 \\cdot (1,08)^n > 200 \\Leftrightarrow (1,08)^n > 2 \\Leftrightarrow n > \\log_{1,08} 2 = \\frac{\\ln 2}{\\ln 1,08} \\approx 9,006$. Vậy cần ít nhất $10$ năm.'
  }
];

const b21P4A: CompactSO[] = [
  {
    prompt: 'Sắp xếp các bước giải phương trình mũ $9^{x - 1} = 27^{x - 2}$:',
    steps: [
      { id: '1', text: 'Đưa hai vế của phương trình về cùng cơ số $3$: $(3^2)^{x - 1} = (3^3)^{x - 2}$.' },
      { id: '2', text: 'Áp dụng quy tắc luỹ thừa của một luỹ thừa: $3^{2x - 2} = 3^{3x - 6}$.' },
      { id: '3', text: 'Cho hai số mũ bằng nhau: $2x - 2 = 3x - 6$.' },
      { id: '4', text: 'Giải phương trình bậc nhất tìm được $x = 4$ và kết luận nghiệm.' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Đưa về cùng cơ số $3$: $3^{2x-2} = 3^{3x-6} \\Leftrightarrow 2x - 2 = 3x - 6 \\Leftrightarrow x = 4$.'
  },
  {
    prompt: 'Sắp xếp các bước giải phương trình lôgarit $\\log_3 x + \\log_3 (x - 8) = 2$:',
    steps: [
      { id: '1', text: 'Tìm điều kiện xác định của phương trình: $x > 0$ và $x - 8 > 0 \\Leftrightarrow x > 8$.' },
      { id: '2', text: 'Áp dụng quy tắc lôgarit của một tích: $\\log_3 [x(x - 8)] = 2$.' },
      { id: '3', text: 'Đưa về phương trình bậc hai: $x(x - 8) = 3^2 \\Leftrightarrow x^2 - 8x - 9 = 0 \\Leftrightarrow x = 9$ hoặc $x = -1$.' },
      { id: '4', text: 'Đối chiếu với điều kiện $x > 8$, loại $x = -1$ và kết luận nghiệm duy nhất là $x = 9$.' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Đặt ĐKXĐ $x > 8 \\to$ Gộp $\\log_3[x(x-8)] = 2 \\to$ Giải $x^2 - 8x - 9 = 0 \\to$ Chọn $x = 9$.'
  },
  {
    prompt: 'Sắp xếp các bước giải bất phương trình $\\left(\\frac{2}{5}\\right)^{3x - 4} \\le \\left(\\frac{2}{5}\\right)^{x + 2}$:',
    steps: [
      { id: '1', text: 'Nhận xét hai vế đã có cùng cơ số $a = \\frac{2}{5}$ thoả mãn $0 < a < 1$.' },
      { id: '2', text: 'Vì cơ số thuộc khoảng $(0; 1)$ nên đổi chiều bất phương trình đối với số mũ: $3x - 4 \\ge x + 2$.' },
      { id: '3', text: 'Chuyển vế và thu gọn: $2x \\ge 6 \\Leftrightarrow x \\ge 3$.' },
      { id: '4', text: 'Kết luận tập nghiệm của bất phương trình là $S = [3; +\\infty)$.' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Cơ số $\\frac{2}{5} \\in (0;1) \\to$ Đổi chiều $3x - 4 \\ge x + 2 \\Leftrightarrow x \\ge 3$.'
  },
  {
    prompt: 'Sắp xếp các bước giải bất phương trình $\\log_{0,5} (2x - 6) > -2$:',
    steps: [
      { id: '1', text: 'Đặt điều kiện xác định của biểu thức lôgarit: $2x - 6 > 0 \\Leftrightarrow x > 3$.' },
      { id: '2', text: 'Vì cơ số $0,5 \\in (0; 1)$ nên bất phương trình tương đương với $2x - 6 < (0,5)^{-2} = 4$.' },
      { id: '3', text: 'Giải bất phương trình bậc nhất: $2x < 10 \\Leftrightarrow x < 5$.' },
      { id: '4', text: 'Kết hợp với điều kiện xác định $x > 3$, kết luận tập nghiệm là $S = (3; 5)$.' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'ĐKXĐ $x > 3$; đổi chiều $2x - 6 < 4 \\Leftrightarrow x < 5$; giao với ĐKXĐ được $S = (3; 5)$.'
  }
];

const b21P1B: CompactMC[] = [
  {
    prompt: 'Nghiệm của phương trình $5^{2x - 3} = 125$ là:',
    options: [
      { id: 'A', text: '$x = 3$' },
      { id: 'B', text: '$x = 2$' },
      { id: 'C', text: '$x = 4$' },
      { id: 'D', text: '$x = 0$' }
    ],
    correctOptionId: 'A',
    explanation: 'Ta có $5^{2x - 3} = 5^3 \\Leftrightarrow 2x - 3 = 3 \\Leftrightarrow 2x = 6 \\Leftrightarrow x = 3$.'
  },
  {
    prompt: 'Phương trình nào dưới đây **vô nghiệm** trên tập số thực $\\mathbb{R}$?',
    options: [
      { id: 'A', text: '$2^x = 3$' },
      { id: 'B', text: '$3^x = -1$' },
      { id: 'C', text: '$\\log_2 x = -5$' },
      { id: 'D', text: '$5^x = 1$' }
    ],
    correctOptionId: 'B',
    explanation: 'Vì $a^x > 0$ với mọi $x \\in \\mathbb{R}$ nên phương trình $3^x = -1$ vô nghiệm.'
  },
  {
    prompt: 'Nghiệm của phương trình $4^{x + 1} = 8^{x - 1}$ là:',
    options: [
      { id: 'A', text: '$x = 5$' },
      { id: 'B', text: '$x = 3$' },
      { id: 'C', text: '$x = 2$' },
      { id: 'D', text: '$x = 4$' }
    ],
    correctOptionId: 'A',
    explanation: 'Đưa về cơ số $2$: $2^{2x + 2} = 2^{3x - 3} \\Leftrightarrow 2x + 2 = 3x - 3 \\Leftrightarrow x = 5$.'
  },
  {
    prompt: 'Nghiệm của phương trình $\\log_4 (5x - 4) = 2$ là:',
    options: [
      { id: 'A', text: '$x = 4$' },
      { id: 'B', text: '$x = \\frac{12}{5}$' },
      { id: 'C', text: '$x = \\frac{20}{3}$' },
      { id: 'D', text: '$x = 3$' }
    ],
    correctOptionId: 'A',
    explanation: 'Ta có $\\log_4(5x - 4) = 2 \\Leftrightarrow 5x - 4 = 4^2 = 16 \\Leftrightarrow 5x = 20 \\Leftrightarrow x = 4$.'
  },
  {
    prompt: 'Tập nghiệm của phương trình $\\ln(x^2 - 4x + 5) = 0$ là:',
    options: [
      { id: 'A', text: '$S = \\{2\\}$' },
      { id: 'B', text: '$S = \\{1; 3\\}$' },
      { id: 'C', text: '$S = \\{0; 4\\}$' },
      { id: 'D', text: '$S = \\varnothing$' }
    ],
    correctOptionId: 'A',
    explanation: 'Ta có $\\ln(x^2 - 4x + 5) = 0 \\Leftrightarrow x^2 - 4x + 5 = 1 \\Leftrightarrow (x - 2)^2 = 0 \\Leftrightarrow x = 2$.'
  },
  {
    prompt: 'Nghiệm của phương trình $\\log_2 (3x - 2) = \\log_2 (x + 6)$ là:',
    options: [
      { id: 'A', text: '$x = 4$' },
      { id: 'B', text: '$x = 2$' },
      { id: 'C', text: '$x = 3$' },
      { id: 'D', text: '$x = 5$' }
    ],
    correctOptionId: 'A',
    explanation: 'Điều kiện $x > \\frac{2}{3}$. Khi đó $3x - 2 = x + 6 \\Leftrightarrow 2x = 8 \\Leftrightarrow x = 4$ (nhận).'
  },
  {
    prompt: 'Tập nghiệm của bất phương trình $3^{2x + 1} \\le 81$ là:',
    options: [
      { id: 'A', text: '$\\left(-\\infty; \\frac{3}{2}\\right]$' },
      { id: 'B', text: '$\\left[\\frac{3}{2}; +\\infty\\right)$' },
      { id: 'C', text: '$\\left(-\\infty; \\frac{5}{2}\\right]$' },
      { id: 'D', text: '$\\left(0; \\frac{3}{2}\\right]$' }
    ],
    correctOptionId: 'A',
    explanation: 'Vì cơ số $3 > 1$ nên $3^{2x + 1} \\le 3^4 \\Leftrightarrow 2x + 1 \\le 4 \\Leftrightarrow x \\le \\frac{3}{2}$.'
  },
  {
    prompt: 'Tập nghiệm của bất phương trình $(0,5)^{2x - 3} < (0,5)^{x + 1}$ là:',
    options: [
      { id: 'A', text: '$(-\\infty; 4)$' },
      { id: 'B', text: '$(4; +\\infty)$' },
      { id: 'C', text: '$(2; +\\infty)$' },
      { id: 'D', text: '$(-\\infty; 2)$' }
    ],
    correctOptionId: 'B',
    explanation: 'Vì cơ số $0,5 \\in (0; 1)$ nên đổi chiều bất đẳng thức: $2x - 3 > x + 1 \\Leftrightarrow x > 4$.'
  },
  {
    prompt: 'Tập nghiệm của bất phương trình $\\log_5 (3x - 6) > 1$ là:',
    options: [
      { id: 'A', text: '$\\left(\\frac{11}{3}; +\\infty\\right)$' },
      { id: 'B', text: '$\\left(2; \\frac{11}{3}\\right)$' },
      { id: 'C', text: '$\\left(-\\infty; \\frac{11}{3}\\right)$' },
      { id: 'D', text: '$(2; +\\infty)$' }
    ],
    correctOptionId: 'A',
    explanation: 'Vì cơ số $5 > 1$ nên $\\log_5(3x - 6) > 1 \\Leftrightarrow 3x - 6 > 5 \\Leftrightarrow 3x > 11 \\Leftrightarrow x > \\frac{11}{3}$.'
  },
  {
    prompt: 'Tập nghiệm của bất phương trình $\\log_{\\frac{1}{3}} (2x - 1) > -2$ là:',
    options: [
      { id: 'A', text: '$\\left(-\\infty; 5\\right)$' },
      { id: 'B', text: '$\\left(\\frac{1}{2}; 5\\right)$' },
      { id: 'C', text: '$\\left(5; +\\infty\\right)$' },
      { id: 'D', text: '$\\left[\\frac{1}{2}; 5\\right)$' }
    ],
    correctOptionId: 'B',
    explanation: 'Điều kiện $2x - 1 > 0 \\Leftrightarrow x > \\frac{1}{2}$. Vì cơ số $\\frac{1}{3} \\in (0;1)$ nên $2x - 1 < \\left(\\frac{1}{3}\\right)^{-2} = 9 \\Leftrightarrow x < 5$. Kết hợp điều kiện được $\\frac{1}{2} < x < 5$.'
  },
  {
    prompt: 'Tích tất cả các nghiệm của phương trình $3^{x^2 - 5x + 6} = 9$ bằng:',
    options: [
      { id: 'A', text: '$4$' },
      { id: 'B', text: '$6$' },
      { id: 'C', text: '$5$' },
      { id: 'D', text: '$-4$' }
    ],
    correctOptionId: 'A',
    explanation: 'Ta có $3^{x^2 - 5x + 6} = 3^2 \\Leftrightarrow x^2 - 5x + 6 = 2 \\Leftrightarrow x^2 - 5x + 4 = 0 \\Leftrightarrow x = 1$ hoặc $x = 4$. Tích các nghiệm bằng $1 \\cdot 4 = 4$.'
  },
  {
    prompt: 'Tập nghiệm của bất phương trình $\\log_{0,3} (x - 2) \\le \\log_{0,3} (8 - x)$ là:',
    options: [
      { id: 'A', text: '$(2; 5]$' },
      { id: 'B', text: '$[5; 8)$' },
      { id: 'C', text: '$[5; +\\infty)$' },
      { id: 'D', text: '$(-\\infty; 5]$' }
    ],
    correctOptionId: 'B',
    explanation: 'Điều kiện xác định: $2 < x < 8$. Vì cơ số $0,3 \\in (0; 1)$ nên $\\log_{0,3}(x-2) \\le \\log_{0,3}(8-x) \\Leftrightarrow x - 2 \\ge 8 - x > 0 \\Leftrightarrow 5 \\le x < 8$.'
  }
];

const b21P2B: CompactTF[] = [
  {
    stem: 'Cho phương trình mũ $2^{x^2 - 3x} = \\frac{1}{4}$ (1). Xét tính đúng sai của các mệnh đề sau:',
    statements: [
      {
        id: 'a',
        text: 'Tập xác định của phương trình (1) là $D = \\mathbb{R}$.',
        isTrue: true,
        explanation: 'Đúng vì luỹ thừa cơ số $2$ xác định với mọi số thực.'
      },
      {
        id: 'b',
        text: 'Phương trình (1) tương đương với phương trình $x^2 - 3x + 2 = 0$.',
        isTrue: true,
        explanation: 'Đúng vì $2^{x^2 - 3x} = 2^{-2} \\Leftrightarrow x^2 - 3x = -2 \\Leftrightarrow x^2 - 3x + 2 = 0$.'
      },
      {
        id: 'c',
        text: 'Tổng các nghiệm của phương trình (1) bằng $-3$.',
        isTrue: false,
        explanation: 'Sai vì phương trình có hai nghiệm $x = 1$ và $x = 2$, tổng hai nghiệm bằng $3$.'
      },
      {
        id: 'd',
        text: 'Mọi nghiệm của phương trình (1) đều thoả mãn bất phương trình $\\log_2 x \\ge 0$.',
        isTrue: true,
        explanation: 'Đúng vì $\\log_2 1 = 0 \\ge 0$ và $\\log_2 2 = 1 \\ge 0$.'
      }
    ]
  },
  {
    stem: 'Cho bất phương trình lôgarit $\\log_2 (x^2 - 6x + 8) \\le 3$ (2). Xét tính đúng sai của các mệnh đề sau:',
    statements: [
      {
        id: 'a',
        text: 'Điều kiện xác định của bất phương trình (2) là $x \\in (-\\infty; 2) \\cup (4; +\\infty)$.',
        isTrue: true,
        explanation: 'Đúng vì $x^2 - 6x + 8 > 0 \\Leftrightarrow (x - 2)(x - 4) > 0 \\Leftrightarrow x < 2$ hoặc $x > 4$.'
      },
      {
        id: 'b',
        text: 'Khi bỏ lôgarit cơ số $2$, ta được $x^2 - 6x + 8 \\le 8 \\Leftrightarrow 0 \\le x \\le 6$.',
        isTrue: true,
        explanation: 'Đúng vì cơ số $2 > 1$ nên $x^2 - 6x + 8 \\le 2^3 = 8 \\Leftrightarrow x^2 - 6x \\le 0 \\Leftrightarrow 0 \\le x \\le 6$.'
      },
      {
        id: 'c',
        text: 'Tập nghiệm của bất phương trình (2) là đoạn $[0; 6]$.',
        isTrue: false,
        explanation: 'Sai vì phải kết hợp với điều kiện xác định $x < 2$ hoặc $x > 4$, nên tập nghiệm là $[0; 2) \\cup (4; 6]$.'
      },
      {
        id: 'd',
        text: 'Có tất cả $4$ giá trị nguyên của $x$ thoả mãn bất phương trình (2).',
        isTrue: true,
        explanation: 'Đúng vì $x \\in [0; 2) \\cup (4; 6]$ và $x \\in \\mathbb{Z}$ nên $x \\in \\{0; 1; 5; 6\\}$, có $4$ giá trị nguyên.'
      }
    ]
  }
];

const b21P3B: CompactSA[] = [
  {
    prompt: 'Tìm nghiệm của phương trình $\\log_2 (4x - 4) = 4$.',
    correctAnswer: '5',
    acceptedAnswers: ['5'],
    explanation: 'Ta có $\\log_2(4x - 4) = 4 \\Leftrightarrow 4x - 4 = 2^4 = 16 \\Leftrightarrow 4x = 20 \\Leftrightarrow x = 5$.'
  },
  {
    prompt: 'Tính tổng tất cả các nghiệm của phương trình $\\log_3 (x^2 - 5x + 9) = 1$.',
    correctAnswer: '5',
    acceptedAnswers: ['5'],
    explanation: 'Ta có $x^2 - 5x + 9 = 3^1 = 3 \\Leftrightarrow x^2 - 5x + 6 = 0 \\Leftrightarrow x = 2$ hoặc $x = 3$. Tổng hai nghiệm bằng $2 + 3 = 5$.'
  },
  {
    prompt: 'Có bao nhiêu nghiệm nguyên của bất phương trình $3^{x^2 - 5x} \\le 81^{-1}$?',
    correctAnswer: '4',
    acceptedAnswers: ['4'],
    explanation: 'Ta có $3^{x^2 - 5x} \\le 3^{-4} \\Leftrightarrow x^2 - 5x + 4 \\le 0 \\Leftrightarrow 1 \\le x \\le 4$. Các nghiệm nguyên là $1, 2, 3, 4$, có tất cả $4$ nghiệm nguyên.'
  },
  {
    prompt: 'Tìm nghiệm nguyên lớn nhất của bất phương trình $\\log_{\\frac{1}{3}} (x - 2) > -2$.',
    correctAnswer: '10',
    acceptedAnswers: ['10'],
    explanation: 'Điều kiện $x > 2$. Ta có $0 < x - 2 < \\left(\\frac{1}{3}\\right)^{-2} = 9 \\Leftrightarrow 2 < x < 11$. Vậy nghiệm nguyên lớn nhất là $x = 10$.'
  }
];

const b21P4B: CompactSO[] = [
  {
    prompt: 'Sắp xếp các bước giải phương trình $\\log_2 (x + 1) = \\log_2 (3x - 7)$:',
    steps: [
      { id: '1', text: 'Đặt điều kiện xác định: $x + 1 > 0$ và $3x - 7 > 0 \\Leftrightarrow x > \\frac{7}{3}$.' },
      { id: '2', text: 'Khử lôgarit hai vế cùng cơ số $2$: $x + 1 = 3x - 7$.' },
      { id: '3', text: 'Giải phương trình bậc nhất: $2x = 8 \\Leftrightarrow x = 4$.' },
      { id: '4', text: 'Đối chiếu với điều kiện $x > \\frac{7}{3}$, nhận $x = 4$ và kết luận nghiệm.' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'ĐKXĐ $x > \\frac{7}{3} \\to$ Giải $x + 1 = 3x - 7 \\Leftrightarrow x = 4$ (thoả mãn).'
  },
  {
    prompt: 'Sắp xếp các bước giải bất phương trình $4^{x - 1} > 8^{2 - x}$:',
    steps: [
      { id: '1', text: 'Đưa hai vế về cùng cơ số $2$: $(2^2)^{x - 1} > (2^3)^{2 - x} \\Leftrightarrow 2^{2x - 2} > 2^{6 - 3x}$.' },
      { id: '2', text: 'Vì cơ số $2 > 1$ nên giữ nguyên chiều bất đẳng thức đối với số mũ: $2x - 2 > 6 - 3x$.' },
      { id: '3', text: 'Chuyển vế thu gọn: $5x > 8 \\Leftrightarrow x > \\frac{8}{5}$.' },
      { id: '4', text: 'Kết luận tập nghiệm là $S = \\left(\\frac{8}{5}; +\\infty\\right)$.' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Đưa về cơ số $2$: $2^{2x-2} > 2^{6-3x} \\Leftrightarrow 2x - 2 > 6 - 3x \\Leftrightarrow x > \\frac{8}{5}$.'
  },
  {
    prompt: 'Sắp xếp các bước giải bất phương trình $\\log_3 (x - 1) + \\log_3 (x - 3) \\le 1$:',
    steps: [
      { id: '1', text: 'Tìm điều kiện xác định của bất phương trình: $\\begin{cases} x - 1 > 0 \\\\ x - 3 > 0 \\end{cases} \\Leftrightarrow x > 3$.' },
      { id: '2', text: 'Áp dụng quy tắc lôgarit của một tích: $\\log_3 [(x - 1)(x - 3)] \\le 1$.' },
      { id: '3', text: 'Vì cơ số $3 > 1$ nên $(x - 1)(x - 3) \\le 3^1 \\Leftrightarrow x^2 - 4x \\le 0 \\Leftrightarrow 0 \\le x \\le 4$.' },
      { id: '4', text: 'Kết hợp điều kiện $x > 3$, kết luận tập nghiệm của bất phương trình là $S = (3; 4]$.' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'ĐKXĐ $x > 3$; biến đổi $x^2 - 4x \\le 0 \\Leftrightarrow 0 \\le x \\le 4$; giao với ĐKXĐ được $S = (3; 4]$.'
  },
  {
    prompt: 'Sắp xếp các bước giải bài toán lãi kép: "Tìm số năm tối thiểu $n$ để số tiền gốc $P$ tăng gấp ba lần khi gửi lãi kép kì hạn $1$ năm với lãi suất $9\\%$/năm":',
    steps: [
      { id: '1', text: 'Thiết lập bất phương trình từ công thức lãi kép: $P(1 + 0,09)^n \\ge 3P$.' },
      { id: '2', text: 'Chia cả hai vế cho $P > 0$: $(1,09)^n \\ge 3$.' },
      { id: '3', text: 'Lấy lôgarit cơ số $1,09$ (cơ số lớn hơn $1$) hai vế: $n \\ge \\log_{1,09} 3 \\approx 12,75$.' },
      { id: '4', text: 'Vì $n$ là số nguyên dương chỉ số năm nên kết luận cần ít nhất $n = 13$ năm.' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Từ $(1,09)^n \\ge 3 \\Leftrightarrow n \\ge \\log_{1,09} 3 \\approx 12,75$, suy ra tối thiểu $13$ năm.'
  }
];

// ============================================================================
// ÔN TẬP CHƯƠNG VI. HÀM SỐ MŨ VÀ HÀM SỐ LÔGARIT
// Tổng hợp toàn chương VI: Luỹ thừa, Lôgarit, Hàm số mũ - lôgarit, Phương trình
// và Bất phương trình mũ - lôgarit.
// ============================================================================

const ch6RevP1A: CompactMC[] = [
  b18P1A[4], b18P1A[6], b18P1A[11],
  b19P1A[3], b19P1A[8], b19P1A[10],
  b20P1A[2], b20P1A[7], b20P1A[10],
  b21P1A[0], b21P1A[5], b21P1A[8]
];

const ch6RevP1B: CompactMC[] = [
  b18P1B[3], b18P1B[5], b18P1B[11],
  b19P1B[4], b19P1B[8], b19P1B[10],
  b20P1B[4], b20P1B[6], b20P1B[11],
  b21P1B[2], b21P1B[7], b21P1B[11]
];

const ch6RevP2A: CompactTF[] = [b19P2A[1], b21P2A[0]];
const ch6RevP2B: CompactTF[] = [b20P2A[0], b21P2B[1]];
const ch6RevP3A: CompactSA[] = [b18P3A[2], b19P3A[0], b20P3A[0], b21P3A[2]];
const ch6RevP3B: CompactSA[] = [b18P3B[0], b19P3B[1], b20P3B[2], b21P3B[2]];
const ch6RevP4A: CompactSO[] = [b18P4A[0], b19P4A[1], b20P4A[0], b21P4A[1]];
const ch6RevP4B: CompactSO[] = [b18P4B[0], b19P4B[0], b20P4B[0], b21P4B[2]];

export const chapter6LessonExams: Record<string, ExamSet[]> = {
  'bai-18': [
    buildCompactLessonExamSet(
      'bai-18-de-1',
      'Đề ôn Bài 18 – Đề số 01',
      'Bài 18. Luỹ thừa với số mũ thực',
      1,
      b18P1A, b18P2A, b18P3A, b18P4A
    ),
    buildCompactLessonExamSet(
      'bai-18-de-2',
      'Đề ôn Bài 18 – Đề số 02',
      'Bài 18. Luỹ thừa với số mũ thực',
      2,
      b18P1B, b18P2B, b18P3B, b18P4B
    )
  ],
  'bai-19': [
    buildCompactLessonExamSet(
      'bai-19-de-1',
      'Đề ôn Bài 19 – Đề số 01',
      'Bài 19. Lôgarit',
      1,
      b19P1A, b19P2A, b19P3A, b19P4A
    ),
    buildCompactLessonExamSet(
      'bai-19-de-2',
      'Đề ôn Bài 19 – Đề số 02',
      'Bài 19. Lôgarit',
      2,
      b19P1B, b19P2B, b19P3B, b19P4B
    )
  ],
  'bai-20': [
    buildCompactLessonExamSet(
      'bai-20-de-1',
      'Đề ôn Bài 20 – Đề số 01',
      'Bài 20. Hàm số mũ và hàm số lôgarit',
      1,
      b20P1A, b20P2A, b20P3A, b20P4A
    ),
    buildCompactLessonExamSet(
      'bai-20-de-2',
      'Đề ôn Bài 20 – Đề số 02',
      'Bài 20. Hàm số mũ và hàm số lôgarit',
      2,
      b20P1B, b20P2B, b20P3B, b20P4B
    )
  ],
  'bai-21': [
    buildCompactLessonExamSet(
      'bai-21-de-1',
      'Đề ôn Bài 21 – Đề số 01',
      'Bài 21. Phương trình, bất phương trình mũ và lôgarit',
      1,
      b21P1A, b21P2A, b21P3A, b21P4A
    ),
    buildCompactLessonExamSet(
      'bai-21-de-2',
      'Đề ôn Bài 21 – Đề số 02',
      'Bài 21. Phương trình, bất phương trình mũ và lôgarit',
      2,
      b21P1B, b21P2B, b21P3B, b21P4B
    )
  ],
  'on-tap-chuong-6': [
    buildCompactLessonExamSet(
      'on-tap-chuong-6-de-1',
      'Đề ôn Chương VI – Đề số 01',
      'Ôn tập chương VI. Hàm số mũ và hàm số lôgarit',
      1,
      ch6RevP1A, ch6RevP2A, ch6RevP3A, ch6RevP4A
    ),
    buildCompactLessonExamSet(
      'on-tap-chuong-6-de-2',
      'Đề ôn Chương VI – Đề số 02',
      'Ôn tập chương VI. Hàm số mũ và hàm số lôgarit',
      2,
      ch6RevP1B, ch6RevP2B, ch6RevP3B, ch6RevP4B
    )
  ]
};
