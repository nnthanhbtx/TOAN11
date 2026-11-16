import { ExamSet } from '../../types/exam';
import {
  CompactMC,
  CompactTF,
  CompactSA,
  CompactSO,
  buildCompactLessonExamSet
} from './chapter4';

// ============================================================================
// HÌNH VẼ TIẾP TUYẾN CỦA ĐỒ THỊ HÀM SỐ CHUẨN TIKZ CHO CHƯƠNG IX (ĐẠO HÀM)
// ============================================================================
const TIKZ_TANGENT_PARABOLA = `\\begin{tikzpicture}[line join=round, line cap=round, scale=0.85]
  \\draw[->, thick] (-2.2,0) -- (2.8,0) node[below] {$x$};
  \\draw[->, thick] (0,-1.2) -- (0,4.5) node[left] {$y$};
  \\node[below left] at (0,0) {$O$};
  \\draw[dashed, gray] (1,0) node[below, black] {$x_0=1$} -- (1,1) -- (0,1) node[left, black] {$y_0=1$};
  \\draw[very thick, blue, samples=100, domain=-1.9:2.05] plot (\\x, {(\\x)*(\\x)}) node[above left] {$y=f(x)$};
  \\draw[very thick, red, domain=-0.1:2.4] plot (\\x, {2*(\\x)-1}) node[right] {$\\Delta: y = f'(x_0)(x-x_0)+y_0$};
  \\filldraw[red] (1,1) circle (2.0pt) node[above left] {$M_0(1;1)$};
\\end{tikzpicture}`;

// ============================================================================
// BÀI 31. ĐỊNH NGHĨA VÀ Ý NGHĨA CỦA ĐẠO HÀM
// Trọng tâm: Định nghĩa đạo hàm tại một điểm bằng giới hạn, ý nghĩa hình học
// của đạo hàm (hệ số góc tiếp tuyến k = f'(x_0), phương trình tiếp tuyến),
// ý nghĩa cơ học - vật lí (vận tốc tức thời v(t) = s'(t), cường độ dòng điện
// tức thời I(t) = Q'(t)).
// ============================================================================

const b31P1A: CompactMC[] = [
  {
    prompt: 'Cho hàm số $y = f(x)$ xác định trên khoảng $(a; b)$ và điểm $x_0 \\in (a; b)$. Đạo hàm $f\'(x_0)$ của hàm số tại điểm $x_0$ được định nghĩa là:',
    options: [
      { id: 'A', text: '$f\'(x_0) = \\lim_{x \\to x_0} \\frac{f(x) + f(x_0)}{x - x_0}$' },
      { id: 'B', text: '$f\'(x_0) = \\lim_{x \\to x_0} \\frac{f(x) - f(x_0)}{x - x_0}$' },
      { id: 'C', text: '$f\'(x_0) = \\lim_{x \\to 0} \\frac{f(x) - f(x_0)}{x - x_0}$' },
      { id: 'D', text: '$f\'(x_0) = \\lim_{x \\to x_0} \\frac{f(x) - f(x_0)}{x + x_0}$' }
    ],
    correctOptionId: 'B',
    explanation: 'Theo định nghĩa đạo hàm tại một điểm: $f\'(x_0) = \\lim_{x \\to x_0} \\frac{f(x) - f(x_0)}{x - x_0}$ (nếu giới hạn hữu hạn này tồn tại).'
  },
  {
    prompt: 'Nếu đặt $\\Delta x = x - x_0$ là số gia của đối số tại $x_0$ và $\\Delta y = f(x_0 + \\Delta x) - f(x_0)$ là số gia tương ứng của hàm số thì $f\'(x_0)$ bằng:',
    options: [
      { id: 'A', text: '$\\lim_{\\Delta x \\to 0} \\frac{\\Delta x}{\\Delta y}$' },
      { id: 'B', text: '$\\lim_{\\Delta x \\to 0} \\frac{\\Delta y}{\\Delta x}$' },
      { id: 'C', text: '$\\lim_{\\Delta x \\to x_0} \\frac{\\Delta y}{\\Delta x}$' },
      { id: 'D', text: '$\\lim_{\\Delta x \\to +\\infty} \\frac{\\Delta y}{\\Delta x}$' }
    ],
    correctOptionId: 'B',
    explanation: 'Khi $x \\to x_0$ thì $\\Delta x = x - x_0 \\to 0$, do đó $f\'(x_0) = \\lim_{\\Delta x \\to 0} \\frac{f(x_0 + \\Delta x) - f(x_0)}{\\Delta x} = \\lim_{\\Delta x \\to 0} \\frac{\\Delta y}{\\Delta x}$.'
  },
  {
    prompt: 'Cho hàm số $f(x) = x^2$. Số gia $\\Delta y$ của hàm số ứng với $x_0 = 2$ và $\\Delta x = 1$ bằng:',
    options: [
      { id: 'A', text: '$5$' },
      { id: 'B', text: '$4$' },
      { id: 'C', text: '$9$' },
      { id: 'D', text: '$3$' }
    ],
    correctOptionId: 'A',
    explanation: 'Ta có $\\Delta y = f(x_0 + \\Delta x) - f(x_0) = f(3) - f(2) = 3^2 - 2^2 = 9 - 4 = 5$.'
  },
  {
    prompt: 'Bằng định nghĩa, đạo hàm của hàm số $f(x) = 3x^2$ tại điểm $x_0 = 2$ bằng:',
    options: [
      { id: 'A', text: '$6$' },
      { id: 'B', text: '$12$' },
      { id: 'C', text: '$9$' },
      { id: 'D', text: '$24$' }
    ],
    correctOptionId: 'B',
    explanation: 'Ta có $f\'(2) = \\lim_{x \\to 2} \\frac{3x^2 - 12}{x - 2} = \\lim_{x \\to 2} 3(x + 2) = 3 \\cdot 4 = 12$.'
  },
  {
    prompt: 'Về mặt hình học, đạo hàm $f\'(x_0)$ là hệ số góc của đường thẳng nào dưới đây?',
    options: [
      { id: 'A', text: 'Tiếp tuyến của đồ thị hàm số $y = f(x)$ tại điểm $M_0(x_0; f(x_0))$' },
      { id: 'B', text: 'Đường thẳng đi qua gốc tọa độ $O$ và điểm $M_0(x_0; f(x_0))$' },
      { id: 'C', text: 'Đường thẳng vuông góc với trục tung tại điểm $(0; f(x_0))$' },
      { id: 'D', text: 'Đường thẳng vuông góc với tiếp tuyến tại $M_0(x_0; f(x_0))$' }
    ],
    correctOptionId: 'A',
    explanation: 'Theo ý nghĩa hình học của đạo hàm: Đạo hàm của hàm số $y = f(x)$ tại điểm $x_0$ là hệ số góc của tiếp tuyến của đồ thị hàm số đó tại điểm $M_0(x_0; f(x_0))$.',
    tikzType: 'custom',
    tikzCode: TIKZ_TANGENT_PARABOLA
  },
  {
    prompt: 'Phương trình tiếp tuyến của đồ thị hàm số $y = f(x)$ tại điểm $M_0(x_0; y_0)$ (với $y_0 = f(x_0)$) là:',
    options: [
      { id: 'A', text: '$y = f\'(x_0)(x + x_0) + y_0$' },
      { id: 'B', text: '$y = f\'(x_0)(x - x_0) + y_0$' },
      { id: 'C', text: '$y = f\'(x_0)(x - x_0) - y_0$' },
      { id: 'D', text: '$y = f(x_0)(x - x_0) + f\'(x_0)$' }
    ],
    correctOptionId: 'B',
    explanation: 'Phương trình tiếp tuyến của đồ thị $y = f(x)$ tại điểm $M_0(x_0; f(x_0))$ là $y - y_0 = f\'(x_0)(x - x_0) \\Leftrightarrow y = f\'(x_0)(x - x_0) + y_0$.',
    tikzType: 'custom',
    tikzCode: TIKZ_TANGENT_PARABOLA
  },
  {
    prompt: 'Cho hàm số $y = f(x)$ có đồ thị $(C)$. Biết $f(1) = 3$ và $f\'(1) = -2$. Phương trình tiếp tuyến của đồ thị $(C)$ tại điểm có hoành độ $x_0 = 1$ là:',
    options: [
      { id: 'A', text: '$y = -2x + 5$' },
      { id: 'B', text: '$y = -2x + 1$' },
      { id: 'C', text: '$y = 3x - 2$' },
      { id: 'D', text: '$y = -2x + 3$' }
    ],
    correctOptionId: 'A',
    explanation: 'Phương trình tiếp tuyến là $y = f\'(1)(x - 1) + f(1) = -2(x - 1) + 3 = -2x + 5$.'
  },
  {
    prompt: 'Hệ số góc $k$ của tiếp tuyến của parabol $y = x^2 - 4x + 5$ tại điểm có hoành độ $x_0 = 3$ bằng:',
    options: [
      { id: 'A', text: '$k = 2$' },
      { id: 'B', text: '$k = -2$' },
      { id: 'C', text: '$k = 6$' },
      { id: 'D', text: '$k = 1$' }
    ],
    correctOptionId: 'A',
    explanation: 'Ta có $y\'(3) = \\lim_{x \\to 3} \\frac{(x^2 - 4x + 5) - 2}{x - 3} = \\lim_{x \\to 3} \\frac{(x - 3)(x - 1)}{x - 3} = 2$. Vậy hệ số góc $k = 2$.'
  },
  {
    prompt: 'Một chất điểm chuyển động thẳng có phương trình quãng đường $s = s(t)$, trong đó $t$ tính bằng giây và $s$ tính bằng mét. Vận tốc tức thời $v(t_0)$ của chất điểm tại thời điểm $t_0$ bằng:',
    options: [
      { id: 'A', text: '$v(t_0) = \\frac{s(t_0)}{t_0}$' },
      { id: 'B', text: '$v(t_0) = s\'(t_0)$' },
      { id: 'C', text: '$v(t_0) = s(t_0)$' },
      { id: 'D', text: '$v(t_0) = t_0 \\cdot s\'(t_0)$' }
    ],
    correctOptionId: 'B',
    explanation: 'Theo ý nghĩa cơ học của đạo hàm: Vận tốc tức thời của chuyển động tại thời điểm $t_0$ là đạo hàm của hàm quãng đường tại $t_0$: $v(t_0) = s\'(t_0)$.'
  },
  {
    prompt: 'Một vật rơi tự do theo phương trình $s(t) = 4,9t^2$ (với $s$ tính bằng mét và $t$ tính bằng giây). Vận tốc tức thời của vật tại thời điểm $t = 3\\text{ (s)}$ bằng:',
    options: [
      { id: 'A', text: '$14,7\\text{ m/s}$' },
      { id: 'B', text: '$29,4\\text{ m/s}$' },
      { id: 'C', text: '$44,1\\text{ m/s}$' },
      { id: 'D', text: '$9,8\\text{ m/s}$' }
    ],
    correctOptionId: 'B',
    explanation: 'Ta có $v(t) = s\'(t) = 9,8t$. Tại $t = 3\\text{ s}$, vận tốc tức thời của vật là $v(3) = 9,8 \\cdot 3 = 29,4\\text{ (m/s)}$.'
  },
  {
    prompt: 'Điện lượng $Q$ truyền trong dây dẫn theo thời gian $t$ được cho bởi hàm số $Q = Q(t)$. Cường độ dòng điện tức thời $I(t_0)$ tại thời điểm $t_0$ bằng:',
    options: [
      { id: 'A', text: '$I(t_0) = Q\'(t_0)$' },
      { id: 'B', text: '$I(t_0) = \\frac{Q(t_0)}{t_0}$' },
      { id: 'C', text: '$I(t_0) = Q(t_0) \\cdot t_0$' },
      { id: 'D', text: '$I(t_0) = Q(0)$' }
    ],
    correctOptionId: 'A',
    explanation: 'Theo ý nghĩa vật lí của đạo hàm: Cường độ dòng điện tức thời tại thời điểm $t_0$ là $I(t_0) = Q\'(t_0)$.'
  },
  {
    prompt: 'Cho hàm số $y = f(x)$ có đạo hàm tại $x_0 = 2$ là $f\'(2) = 5$. Giá trị của giới hạn $L = \\lim_{h \\to 0} \\frac{f(2 + h) - f(2)}{h}$ bằng:',
    options: [
      { id: 'A', text: '$2$' },
      { id: 'B', text: '$5$' },
      { id: 'C', text: '$10$' },
      { id: 'D', text: '$0$' }
    ],
    correctOptionId: 'B',
    explanation: 'Theo định nghĩa đạo hàm tại $x_0 = 2$, ta có $\\lim_{h \\to 0} \\frac{f(2 + h) - f(2)}{h} = f\'(2) = 5$.'
  }
];

const b31P2A: CompactTF[] = [
  {
    stem: 'Cho hàm số $f(x) = x^2 - 2x + 3$ có đồ thị là parabol $(P)$. Xét tính đúng sai của các mệnh đề sau:',
    statements: [
      {
        id: 'a',
        text: 'Tại điểm có hoành độ $x_0 = 2$, tung độ của điểm thuộc đồ thị $(P)$ là $y_0 = 3$.',
        isTrue: true,
        explanation: 'Đúng vì $y_0 = f(2) = 2^2 - 2 \\cdot 2 + 3 = 3$.'
      },
      {
        id: 'b',
        text: 'Hệ số góc của tiếp tuyến của $(P)$ tại điểm $M(2; 3)$ bằng $f\'(2) = 2$.',
        isTrue: true,
        explanation: 'Đúng vì $f\'(x) = 2x - 2 \\Rightarrow f\'(2) = 2 \\cdot 2 - 2 = 2$.'
      },
      {
        id: 'c',
        text: 'Phương trình tiếp tuyến của $(P)$ tại điểm $M(2; 3)$ là $y = 2x + 1$.',
        isTrue: false,
        explanation: 'Sai vì phương trình tiếp tuyến tại $M(2; 3)$ là $y = 2(x - 2) + 3 = 2x - 1$.'
      },
      {
        id: 'd',
        text: 'Tiếp tuyến của $(P)$ tại đỉnh $I(1; 2)$ là đường thẳng song song với trục hoành.',
        isTrue: true,
        explanation: 'Đúng vì $f\'(1) = 2 \\cdot 1 - 2 = 0$, tiếp tuyến tại $I(1; 2)$ có phương trình $y = 2$ song song với trục $Ox$.'
      }
    ]
  },
  {
    stem: 'Một chất điểm chuyển động thẳng dọc theo trục tọa độ có phương trình quãng đường $s(t) = t^2 + 4t + 2$, trong đó $t \\ge 0$ tính bằng giây (s) và $s$ tính bằng mét (m). Xét tính đúng sai của các mệnh đề sau:',
    statements: [
      {
        id: 'a',
        text: 'Quãng đường chất điểm đi được tính đến thời điểm $t = 2\\text{ s}$ là $s(2) = 14\\text{ m}$.',
        isTrue: true,
        explanation: 'Đúng vì $s(2) = 2^2 + 4 \\cdot 2 + 2 = 14\\text{ (m)}$.'
      },
      {
        id: 'b',
        text: 'Hàm vận tốc tức thời của chất điểm theo thời gian $t$ là $v(t) = s\'(t) = 2t + 4\\text{ (m/s)}$.',
        isTrue: true,
        explanation: 'Đúng vì $s\'(t) = \\lim_{h \\to 0} \\frac{(t+h)^2 + 4(t+h) + 2 - (t^2 + 4t + 2)}{h} = 2t + 4$.'
      },
      {
        id: 'c',
        text: 'Vận tốc tức thời của chất điểm tại thời điểm $t = 3\\text{ s}$ bằng $10\\text{ m/s}$.',
        isTrue: true,
        explanation: 'Đúng vì $v(3) = 2 \\cdot 3 + 4 = 10\\text{ (m/s)}$.'
      },
      {
        id: 'd',
        text: 'Tại thời điểm $t = 5\\text{ s}$, vận tốc tức thời của chất điểm bằng $16\\text{ m/s}$.',
        isTrue: false,
        explanation: 'Sai vì $v(5) = 2 \\cdot 5 + 4 = 14\\text{ m/s} \\ne 16\\text{ m/s}$.'
      }
    ]
  }
];

const b31P3A: CompactSA[] = [
  {
    prompt: 'Tính đạo hàm của hàm số $f(x) = 2x^2 + 3x - 1$ tại điểm $x_0 = 2$.',
    correctAnswer: '11',
    acceptedAnswers: ['11'],
    explanation: 'Ta có $f\'(x) = 4x + 3 \\Rightarrow f\'(2) = 4 \\cdot 2 + 3 = 11$.'
  },
  {
    prompt: 'Tiếp tuyến của đồ thị hàm số $y = x^3 - 2x + 1$ tại điểm $M(2; 5)$ có phương trình dạng $y = ax + b$. Tính giá trị của $a + b$.',
    correctAnswer: '-5',
    acceptedAnswers: ['-5'],
    explanation: 'Hệ số góc tiếp tuyến tại $x_0 = 2$ là $a = y\'(2) = 3 \\cdot 2^2 - 2 = 10$. Phương trình tiếp tuyến là $y = 10(x - 2) + 5 = 10x - 15$. Vậy $a = 10, b = -15 \\Rightarrow a + b = -5$.'
  },
  {
    prompt: 'Một chất điểm chuyển động theo phương trình $s(t) = 3t^2 + 5t$ ($s$ tính bằng mét, $t$ tính bằng giây). Tính vận tốc tức thời (đơn vị: $\\text{m/s}$) của chất điểm tại thời điểm $t = 4\\text{ (s)}$.',
    correctAnswer: '29',
    acceptedAnswers: ['29'],
    explanation: 'Vận tốc tức thời là $v(t) = s\'(t) = 6t + 5$. Tại $t = 4$, ta có $v(4) = 6 \\cdot 4 + 5 = 29\\text{ (m/s)}$.'
  },
  {
    prompt: 'Điện lượng truyền trong một dây dẫn theo thời gian $t$ (giây) được cho bởi $Q(t) = 2t^2 + 6t + 1$ (Coulomb). Tính cường độ dòng điện tức thời (đơn vị: Ampe) tại thời điểm $t = 3$ giây.',
    correctAnswer: '18',
    acceptedAnswers: ['18'],
    explanation: 'Cường độ dòng điện tức thời là $I(t) = Q\'(t) = 4t + 6$. Tại $t = 3\\text{ s}$, ta có $I(3) = 4 \\cdot 3 + 6 = 18\\text{ (A)}$.'
  }
];

const b31P4A: CompactSO[] = [
  {
    prompt: 'Sắp xếp các bước tính đạo hàm của hàm số $f(x) = x^2 + 3x$ tại điểm $x_0 = 1$ bằng định nghĩa:',
    steps: [
      { id: '1', text: 'Tính giá trị của hàm số tại $x_0 = 1$: $f(1) = 1^2 + 3 \\cdot 1 = 4$.' },
      { id: '2', text: 'Lập tỉ số $\\frac{f(x) - f(1)}{x - 1} = \\frac{x^2 + 3x - 4}{x - 1}$ với $x \\ne 1$.' },
      { id: '3', text: 'Phân tích tử số thành nhân tử và rút gọn: $\\frac{(x - 1)(x + 4)}{x - 1} = x + 4$.' },
      { id: '4', text: 'Tính giới hạn khi $x \\to 1$: $f\'(1) = \\lim_{x \\to 1} (x + 4) = 1 + 4 = 5$.' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Tính $f(1) = 4 \\to$ Lập tỉ số $\\frac{f(x)-f(1)}{x-1} \\to$ Rút gọn thành $x + 4 \\to$ Lấy giới hạn khi $x \\to 1$ được $5$.'
  },
  {
    prompt: 'Sắp xếp các bước viết phương trình tiếp tuyến của parabol $y = x^2 - 3x + 4$ tại điểm có hoành độ $x_0 = 3$:',
    steps: [
      { id: '1', text: 'Tính tung độ tiếp điểm: $y_0 = f(3) = 3^2 - 3 \\cdot 3 + 4 = 4$, suy ra tiếp điểm $M_0(3; 4)$.' },
      { id: '2', text: 'Tính đạo hàm của hàm số tại $x_0 = 3$: $f\'(3) = 2 \\cdot 3 - 3 = 3$ (hệ số góc tiếp tuyến).' },
      { id: '3', text: 'Thay vào công thức phương trình tiếp tuyến: $y - 4 = 3(x - 3)$.' },
      { id: '4', text: 'Thu gọn về dạng hàm bậc nhất: $y = 3x - 5$.' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Tìm $y_0 = 4 \\to$ Tính hệ số góc $f\'(3) = 3 \\to$ Viết $y - 4 = 3(x - 3) \\Leftrightarrow y = 3x - 5$.'
  },
  {
    prompt: 'Sắp xếp các bước tìm thời điểm mà vận tốc tức thời của vật bằng $0$ biết phương trình chuyển động là $s(t) = -5t^2 + 20t + 1$ ($t \\ge 0$):',
    steps: [
      { id: '1', text: 'Sử dụng ý nghĩa cơ học của đạo hàm: vận tốc tức thời tại thời điểm $t$ là $v(t) = s\'(t)$.' },
      { id: '2', text: 'Tính đạo hàm của hàm quãng đường: $v(t) = -10t + 20$.' },
      { id: '3', text: 'Cho vận tốc tức thời bằng $0$: $-10t + 20 = 0$.' },
      { id: '4', text: 'Giải phương trình tìm được thời điểm $t = 2\\text{ (s)}$.' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Từ $v(t) = s\'(t) = -10t + 20 = 0$, giải được $t = 2\\text{ s}$.'
  },
  {
    prompt: 'Sắp xếp các bước tính đạo hàm của hàm số $f(x) = \\frac{1}{x}$ tại điểm $x_0 = 2$ bằng định nghĩa:',
    steps: [
      { id: '1', text: 'Tính $f(2) = \\frac{1}{2}$ và thiết lập giới hạn $f\'(2) = \\lim_{x \\to 2} \\frac{\\frac{1}{x} - \\frac{1}{2}}{x - 2}$.' },
      { id: '2', text: 'Quy đồng mẫu số ở tử thức: $\\frac{1}{x} - \\frac{1}{2} = \\frac{2 - x}{2x} = \\frac{-(x - 2)}{2x}$.' },
      { id: '3', text: 'Rút gọn biểu thức dưới dấu giới hạn (với $x \\ne 2$): $\\frac{-(x - 2)}{2x(x - 2)} = -\\frac{1}{2x}$.' },
      { id: '4', text: 'Lấy giới hạn khi $x \\to 2$: $f\'(2) = \\lim_{x \\to 2} \\left(-\\frac{1}{2x}\\right) = -\\frac{1}{4}$.' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Quy đồng $\\frac{1}{x} - \\frac{1}{2} = \\frac{2-x}{2x}$, giản ước $(x - 2)$ rồi thay $x = 2$ được $-\\frac{1}{4}$.'
  }
];

const b31P1B: CompactMC[] = [
  {
    prompt: 'Cho hàm số $f(x)$ có đạo hàm tại $x_0$. Khẳng định nào sau đây là **đúng**?',
    options: [
      { id: 'A', text: 'Hàm số $f(x)$ liên tục tại điểm $x_0$' },
      { id: 'B', text: 'Hàm số $f(x)$ gián đoạn tại điểm $x_0$' },
      { id: 'C', text: '$f\'(x_0) = f(x_0)$' },
      { id: 'D', text: '$f(x_0) = 0$' }
    ],
    correctOptionId: 'A',
    explanation: 'Nếu hàm số $y = f(x)$ có đạo hàm tại điểm $x_0$ thì nó liên tục tại điểm $x_0$.'
  },
  {
    prompt: 'Cho hàm số $f(x) = 5x - 2$. Số gia $\\Delta y$ của hàm số ứng với số gia $\\Delta x$ tại điểm $x_0$ bất kì bằng:',
    options: [
      { id: 'A', text: '$5\\Delta x$' },
      { id: 'B', text: '$5\\Delta x - 2$' },
      { id: 'C', text: '$\\Delta x$' },
      { id: 'D', text: '$5x_0$' }
    ],
    correctOptionId: 'A',
    explanation: 'Ta có $\\Delta y = [5(x_0 + \\Delta x) - 2] - (5x_0 - 2) = 5\\Delta x$.'
  },
  {
    prompt: 'Cho hàm số $y = f(x)$ có $\\lim_{x \\to -1} \\frac{f(x) - f(-1)}{x + 1} = 4$. Khẳng định nào sau đây là **đúng**?',
    options: [
      { id: 'A', text: '$f\'(1) = 4$' },
      { id: 'B', text: '$f\'(-1) = 4$' },
      { id: 'C', text: '$f(-1) = 4$' },
      { id: 'D', text: '$f\'(4) = -1$' }
    ],
    correctOptionId: 'B',
    explanation: 'Vì $x + 1 = x - (-1)$ nên theo định nghĩa đạo hàm tại điểm $x_0 = -1$, ta có $f\'(-1) = 4$.'
  },
  {
    prompt: 'Hệ số góc của tiếp tuyến của đồ thị hàm số $y = x^3$ tại điểm có hoành độ $x_0 = -2$ bằng:',
    options: [
      { id: 'A', text: '$-12$' },
      { id: 'B', text: '$12$' },
      { id: 'C', text: '$-8$' },
      { id: 'D', text: '$6$' }
    ],
    correctOptionId: 'B',
    explanation: 'Ta có $y\'(x) = 3x^2 \\Rightarrow y\'(-2) = 3 \\cdot (-2)^2 = 12$.'
  },
  {
    prompt: 'Phương trình tiếp tuyến của parabol $y = x^2 + 1$ tại điểm $M(1; 2)$ là:',
    options: [
      { id: 'A', text: '$y = 2x$' },
      { id: 'B', text: '$y = 2x + 1$' },
      { id: 'C', text: '$y = x + 1$' },
      { id: 'D', text: '$y = 2x - 1$' }
    ],
    correctOptionId: 'A',
    explanation: 'Hệ số góc tiếp tuyến tại $x_0 = 1$ là $y\'(1) = 2 \\cdot 1 = 2$. Phương trình tiếp tuyến tại $M(1; 2)$ là $y = 2(x - 1) + 2 = 2x$.'
  },
  {
    prompt: 'Tiếp tuyến của đồ thị hàm số $y = f(x)$ tại điểm có hoành độ $x_0$ song song với đường thẳng $y = 4x - 7$ khi:',
    options: [
      { id: 'A', text: '$f\'(x_0) = -7$' },
      { id: 'B', text: '$f\'(x_0) = 4$' },
      { id: 'C', text: '$f\'(x_0) = -\\frac{1}{4}$' },
      { id: 'D', text: '$f(x_0) = 4$' }
    ],
    correctOptionId: 'B',
    explanation: 'Hai đường thẳng song song có cùng hệ số góc, nên hệ số góc của tiếp tuyến phải bằng $f\'(x_0) = 4$.'
  },
  {
    prompt: 'Hoành độ tiếp điểm $x_0$ của tiếp tuyến với parabol $y = x^2 - 2x + 5$ biết tiếp tuyến đó có hệ số góc bằng $6$ là:',
    options: [
      { id: 'A', text: '$x_0 = 4$' },
      { id: 'B', text: '$x_0 = 3$' },
      { id: 'C', text: '$x_0 = 2$' },
      { id: 'D', text: '$x_0 = 6$' }
    ],
    correctOptionId: 'A',
    explanation: 'Ta có $y\'(x_0) = 2x_0 - 2 = 6 \\Leftrightarrow 2x_0 = 8 \\Leftrightarrow x_0 = 4$.'
  },
  {
    prompt: 'Một chất điểm chuyển động theo quy luật $s(t) = t^3 - 3t^2 + 12t$ ($t$ tính bằng giây, $s$ tính bằng mét). Vận tốc tức thời của chất điểm tại thời điểm $t = 2$ giây là:',
    options: [
      { id: 'A', text: '$12\\text{ m/s}$' },
      { id: 'B', text: '$20\\text{ m/s}$' },
      { id: 'C', text: '$8\\text{ m/s}$' },
      { id: 'D', text: '$16\\text{ m/s}$' }
    ],
    correctOptionId: 'A',
    explanation: 'Ta có $v(t) = s\'(t) = 3t^2 - 6t + 12$. Tại $t = 2$, $v(2) = 3 \\cdot 4 - 6 \\cdot 2 + 12 = 12\\text{ (m/s)}$.'
  },
  {
    prompt: 'Đạo hàm của hàm số $f(x) = \\sqrt{x}$ tại điểm $x_0 = 9$ bằng:',
    options: [
      { id: 'A', text: '$3$' },
      { id: 'B', text: '$\\frac{1}{6}$' },
      { id: 'C', text: '$\\frac{1}{3}$' },
      { id: 'D', text: '$\\frac{1}{18}$' }
    ],
    correctOptionId: 'B',
    explanation: 'Ta có $f\'(9) = \\lim_{x \\to 9} \\frac{\\sqrt{x} - 3}{x - 9} = \\lim_{x \\to 9} \\frac{1}{\\sqrt{x} + 3} = \\frac{1}{6}$.'
  },
  {
    prompt: 'Cho hàm số $f(x)$ xác định trên $\\mathbb{R}$ thoả mãn $\\lim_{x \\to 3} \\frac{f(x) - 7}{x - 3} = -4$. Phương trình tiếp tuyến của đồ thị hàm số $y = f(x)$ tại điểm có hoành độ $x_0 = 3$ là:',
    options: [
      { id: 'A', text: '$y = -4x + 19$' },
      { id: 'B', text: '$y = -4x - 5$' },
      { id: 'C', text: '$y = 7x - 4$' },
      { id: 'D', text: '$y = -4x + 7$' }
    ],
    correctOptionId: 'A',
    explanation: 'Từ giới hạn hữu hạn suy ra $f(3) = 7$ và $f\'(3) = -4$. Phương trình tiếp tuyến là $y = -4(x - 3) + 7 = -4x + 19$.'
  },
  {
    prompt: 'Nhiệt độ $T$ (đơn vị: $^\\circ\\text{C}$) của một thanh kim loại sau $t$ phút đun nóng được cho bởi $T(t) = 25 + 8t - 0,2t^2$. Tốc độ tăng nhiệt độ tức thời của thanh kim loại tại thời điểm $t = 5$ phút là:',
    options: [
      { id: 'A', text: '$6\\text{ }^\\circ\\text{C/phút}$' },
      { id: 'B', text: '$8\\text{ }^\\circ\\text{C/phút}$' },
      { id: 'C', text: '$60\\text{ }^\\circ\\text{C/phút}$' },
      { id: 'D', text: '$4\\text{ }^\\circ\\text{C/phút}$' }
    ],
    correctOptionId: 'A',
    explanation: 'Tốc độ thay đổi nhiệt độ tức thời là $T\'(t) = 8 - 0,4t$. Tại $t = 5$, ta có $T\'(5) = 8 - 0,4 \\cdot 5 = 6\\text{ }(^\\circ\\text{C/phút})$.'
  },
  {
    prompt: 'Tiếp tuyến của đồ thị hàm số $y = \\frac{1}{x}$ tại điểm $A(1; 1)$ cắt trục hoành $Ox$ tại điểm có hoành độ bằng:',
    options: [
      { id: 'A', text: '$2$' },
      { id: 'B', text: '$1$' },
      { id: 'C', text: '$-1$' },
      { id: 'D', text: '$0$' }
    ],
    correctOptionId: 'A',
    explanation: 'Ta có $y\'(1) = -1$. Phương trình tiếp tuyến tại $A(1; 1)$ là $y = -(x - 1) + 1 = -x + 2$. Cho $y = 0 \\Rightarrow x = 2$.'
  }
];

const b31P2B: CompactTF[] = [
  {
    stem: 'Cho hàm số $f(x) = x^3 - 3x + 2$ có đồ thị $(C)$. Xét tính đúng sai của các mệnh đề sau:',
    statements: [
      {
        id: 'a',
        text: 'Đạo hàm của hàm số tại điểm $x_0$ bất kì là $f\'(x_0) = 3x_0^2 - 3$.',
        isTrue: true,
        explanation: 'Đúng vì $(x^3 - 3x + 2)\' = 3x^2 - 3$.'
      },
      {
        id: 'b',
        text: 'Hệ số góc của tiếp tuyến của $(C)$ tại điểm có hoành độ $x_0 = 2$ bằng $9$.',
        isTrue: true,
        explanation: 'Đúng vì $f\'(2) = 3 \\cdot 2^2 - 3 = 9$.'
      },
      {
        id: 'c',
        text: 'Phương trình tiếp tuyến của $(C)$ tại điểm có hoành độ $x_0 = 0$ là $y = -3x + 2$.',
        isTrue: true,
        explanation: 'Đúng vì $f(0) = 2, f\'(0) = -3 \\Rightarrow y = -3(x - 0) + 2 = -3x + 2$.'
      },
      {
        id: 'd',
        text: 'Có duy nhất một điểm trên $(C)$ mà tiếp tuyến tại đó song song với trục hoành.',
        isTrue: false,
        explanation: 'Sai vì $f\'(x_0) = 0 \\Leftrightarrow 3x_0^2 - 3 = 0 \\Leftrightarrow x_0 = 1$ (tiếp tuyến trùng với trục $Ox$) hoặc $x_0 = -1$ (tiếp tuyến $y = 4$ song song trục $Ox$).'
      }
    ]
  },
  {
    stem: 'Một viên đạn được bắn thẳng đứng lên trên từ mặt đất với vận tốc ban đầu $40\\text{ m/s}$. Độ cao của viên đạn sau $t$ giây được cho bởi $h(t) = 40t - 5t^2$ (m). Xét tính đúng sai của các mệnh đề sau:',
    statements: [
      {
        id: 'a',
        text: 'Vận tốc tức thời của viên đạn tại thời điểm $t$ là $v(t) = h\'(t) = 40 - 10t\\text{ (m/s)}$.',
        isTrue: true,
        explanation: 'Đúng vì $h\'(t) = 40 - 10t$.'
      },
      {
        id: 'b',
        text: 'Tại thời điểm $t = 2\\text{ s}$, vận tốc tức thời của viên đạn là $20\\text{ m/s}$.',
        isTrue: true,
        explanation: 'Đúng vì $v(2) = 40 - 10 \\cdot 2 = 20\\text{ (m/s)}$.'
      },
      {
        id: 'c',
        text: 'Viên đạn đạt độ cao lớn nhất tại thời điểm $t = 4\\text{ s}$ (khi $v(t) = 0$).',
        isTrue: true,
        explanation: 'Đúng vì $v(t) = 0 \\Leftrightarrow 40 - 10t = 0 \\Leftrightarrow t = 4\\text{ s}$.'
      },
      {
        id: 'd',
        text: 'Độ cao lớn nhất mà viên đạn đạt được là $100\\text{ m}$.',
        isTrue: false,
        explanation: 'Sai vì $h(4) = 40 \\cdot 4 - 5 \\cdot 4^2 = 160 - 80 = 80\\text{ m}$.'
      }
    ]
  }
];

const b31P3B: CompactSA[] = [
  {
    prompt: 'Cho hàm số $f(x) = x^2 - 5x + 6$. Tính số gia $\\Delta y$ của hàm số ứng với $x_0 = 3$ và $\\Delta x = 2$.',
    correctAnswer: '6',
    acceptedAnswers: ['6'],
    explanation: 'Ta có $f(3) = 9 - 15 + 6 = 0$ và $f(3 + 2) = f(5) = 25 - 25 + 6 = 6$. Vậy $\\Delta y = f(5) - f(3) = 6$.'
  },
  {
    prompt: 'Tính hệ số góc của tiếp tuyến của đồ thị hàm số $y = 2x^3 - 3x^2 + 5$ tại điểm có hoành độ $x_0 = 2$.',
    correctAnswer: '12',
    acceptedAnswers: ['12'],
    explanation: 'Ta có $y\' = 6x^2 - 6x \\Rightarrow k = y\'(2) = 6 \\cdot 4 - 6 \\cdot 2 = 12$.'
  },
  {
    prompt: 'Biết tiếp tuyến của parabol $y = x^2 + 2x - 3$ tại điểm $M(x_0; y_0)$ có hệ số góc bằng $8$. Tính tung độ $y_0$ của tiếp điểm $M$.',
    correctAnswer: '12',
    acceptedAnswers: ['12'],
    explanation: 'Ta có $y\'(x_0) = 2x_0 + 2 = 8 \\Leftrightarrow x_0 = 3$. Khi đó $y_0 = 3^2 + 2 \\cdot 3 - 3 = 12$.'
  },
  {
    prompt: 'Một ô tô đang chạy thì người lái đạp phanh; từ thời điểm đó ô tô chuyển động chậm dần với quãng đường $s(t) = 24t - 3t^2$ (m), trong đó $t$ (giây) là thời gian tính từ lúc bắt đầu đạp phanh. Hỏi sau bao nhiêu giây kể từ lúc đạp phanh thì ô tô dừng hẳn?',
    correctAnswer: '4',
    acceptedAnswers: ['4'],
    explanation: 'Ô tô dừng hẳn khi vận tốc tức thời bằng $0$: $v(t) = s\'(t) = 24 - 6t = 0 \\Leftrightarrow t = 4$ (giây).'
  }
];

const b31P4B: CompactSO[] = [
  {
    prompt: 'Sắp xếp các bước tìm phương trình tiếp tuyến của parabol $(P): y = x^2 - 4x + 3$ biết tiếp tuyến song song với đường thẳng $d: y = 2x - 5$:',
    steps: [
      { id: '1', text: 'Vì tiếp tuyến song song với đường thẳng $d: y = 2x - 5$ nên hệ số góc của tiếp tuyến là $k = 2$.' },
      { id: '2', text: 'Gọi $x_0$ là hoành độ tiếp điểm, giải phương trình $y\'(x_0) = 2 \\Leftrightarrow 2x_0 - 4 = 2 \\Leftrightarrow x_0 = 3$.' },
      { id: '3', text: 'Tính tung độ tiếp điểm: $y_0 = 3^2 - 4 \\cdot 3 + 3 = 0$, suy ra tiếp điểm là $M(3; 0)$.' },
      { id: '4', text: 'Viết phương trình tiếp tuyến: $y = 2(x - 3) + 0 \\Leftrightarrow y = 2x - 6$ (thoả mãn không trùng với $d$).' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Từ hệ số góc $k = 2 \\Rightarrow 2x_0 - 4 = 2 \\Leftrightarrow x_0 = 3 \\Rightarrow M(3; 0) \\Rightarrow y = 2x - 6$.'
  },
  {
    prompt: 'Sắp xếp các bước tính đạo hàm của hàm số $f(x) = \\sqrt{x + 1}$ tại điểm $x_0 = 3$ bằng định nghĩa:',
    steps: [
      { id: '1', text: 'Tính $f(3) = \\sqrt{3 + 1} = 2$ và lập tỉ số $\\frac{f(x) - f(3)}{x - 3} = \\frac{\\sqrt{x + 1} - 2}{x - 3}$ ($x \\ne 3$).' },
      { id: '2', text: 'Nhân cả tử và mẫu với lượng liên hợp $(\\sqrt{x + 1} + 2)$: $\\frac{(x + 1) - 4}{(x - 3)(\\sqrt{x + 1} + 2)}$.' },
      { id: '3', text: 'Giản ước nhân tử $(x - 3)$ ở tử và mẫu, thu được $\\frac{1}{\\sqrt{x + 1} + 2}$.' },
      { id: '4', text: 'Lấy giới hạn khi $x \\to 3$: $f\'(3) = \\lim_{x \\to 3} \\frac{1}{\\sqrt{x + 1} + 2} = \\frac{1}{2 + 2} = \\frac{1}{4}$.' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Nhân lượng liên hợp $(\\sqrt{x+1}+2)$, giản ước $(x - 3)$ rồi lấy giới hạn tại $x = 3$ được $\\frac{1}{4}$.'
  },
  {
    prompt: 'Sắp xếp các bước tính quãng đường ô tô đi được từ lúc đạp phanh đến khi dừng hẳn biết $s(t) = 20t - 2t^2$ (m):',
    steps: [
      { id: '1', text: 'Tính vận tốc tức thời của ô tô tại thời điểm $t$: $v(t) = s\'(t) = 20 - 4t$.' },
      { id: '2', text: 'Khi ô tô dừng hẳn thì vận tốc tức thời bằng $0$: $20 - 4t = 0$.' },
      { id: '3', text: 'Giải phương trình tìm được thời gian từ lúc đạp phanh đến lúc dừng là $t = 5$ (giây).' },
      { id: '4', text: 'Thay $t = 5$ vào hàm quãng đường: $s(5) = 20 \\cdot 5 - 2 \\cdot 5^2 = 50\\text{ (m)}$.' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Giải $v(t) = 20 - 4t = 0 \\Leftrightarrow t = 5\\text{ s}$, sau đó thay vào $s(5) = 50\\text{ m}$.'
  },
  {
    prompt: 'Sắp xếp các bước tìm tọa độ giao điểm của tiếp tuyến đồ thị $y = x^2$ tại $M(2; 4)$ với hai trục tọa độ:',
    steps: [
      { id: '1', text: 'Tính hệ số góc tiếp tuyến tại $x_0 = 2$: $k = y\'(2) = 2 \\cdot 2 = 4$.' },
      { id: '2', text: 'Viết phương trình tiếp tuyến $\\Delta$ tại $M(2; 4)$: $y = 4(x - 2) + 4 \\Leftrightarrow y = 4x - 4$.' },
      { id: '3', text: 'Cho $y = 0 \\Rightarrow 4x - 4 = 0 \\Leftrightarrow x = 1$, suy ra giao điểm với trục $Ox$ là $A(1; 0)$.' },
      { id: '4', text: 'Cho $x = 0 \\Rightarrow y = -4$, suy ra giao điểm với trục $Oy$ là $B(0; -4)$.' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Viết phương trình tiếp tuyến $y = 4x - 4$, lần lượt cho $y = 0$ và $x = 0$ để tìm giao điểm với $Ox, Oy$.'
  }
];

// ============================================================================
// BÀI 32. CÁC QUY TẮC TÍNH ĐẠO HÀM
// Trọng tâm: Đạo hàm của các hàm số sơ cấp cơ bản (luỹ thừa, căn thức, lượng
// giác, mũ, lôgarit); quy tắc đạo hàm tổng, hiệu, tích, thương; đạo hàm hàm hợp.
// ============================================================================

const b32P1A: CompactMC[] = [
  {
    prompt: 'Với số nguyên dương $n$ và $x \\in \\mathbb{R}$, công thức đạo hàm nào sau đây là **đúng**?',
    options: [
      { id: 'A', text: '$(x^n)\' = x^{n-1}$' },
      { id: 'B', text: '$(x^n)\' = n x^{n-1}$' },
      { id: 'C', text: '$(x^n)\' = n x^{n+1}$' },
      { id: 'D', text: '$(x^n)\' = (n-1)x^n$' }
    ],
    correctOptionId: 'B',
    explanation: 'Theo bảng đạo hàm cơ bản: $(x^n)\' = n x^{n-1}$.'
  },
  {
    prompt: 'Đạo hàm của hàm số $y = x^4 - 3x^2 + 5x - 7$ là:',
    options: [
      { id: 'A', text: '$y\' = 4x^3 - 6x + 5$' },
      { id: 'B', text: '$y\' = 4x^3 - 3x + 5$' },
      { id: 'C', text: '$y\' = 4x^3 - 6x - 7$' },
      { id: 'D', text: '$y\' = x^3 - 6x + 5$' }
    ],
    correctOptionId: 'A',
    explanation: 'Áp dụng quy tắc đạo hàm của tổng, hiệu: $y\' = 4x^3 - 3(2x) + 5 - 0 = 4x^3 - 6x + 5$.'
  },
  {
    prompt: 'Với $x > 0$, đạo hàm của hàm số $y = \\sqrt{x}$ là:',
    options: [
      { id: 'A', text: '$y\' = \\frac{1}{\\sqrt{x}}$' },
      { id: 'B', text: '$y\' = \\frac{1}{2\\sqrt{x}}$' },
      { id: 'C', text: '$y\' = 2\\sqrt{x}$' },
      { id: 'D', text: '$y\' = -\\frac{1}{2\\sqrt{x}}$' }
    ],
    correctOptionId: 'B',
    explanation: 'Với $x > 0$, ta có $(\\sqrt{x})\' = \\frac{1}{2\\sqrt{x}}$.'
  },
  {
    prompt: 'Cho hai hàm số $u = u(x)$ và $v = v(x)$ có đạo hàm trên khoảng $J$. Quy tắc đạo hàm của một tích $(u \\cdot v)\'$ là:',
    options: [
      { id: 'A', text: '$(u \\cdot v)\' = u\' \\cdot v\'$' },
      { id: 'B', text: '$(u \\cdot v)\' = u\'v + uv\'$' },
      { id: 'C', text: '$(u \\cdot v)\' = u\'v - uv\'$' },
      { id: 'D', text: '$(u \\cdot v)\' = \\frac{u\'v - uv\'}{v^2}$' }
    ],
    correctOptionId: 'B',
    explanation: 'Quy tắc đạo hàm của một tích: $(uv)\' = u\'v + uv\'.$'
  },
  {
    prompt: 'Đạo hàm của hàm số phân thức $y = \\frac{2x + 1}{x - 3}$ (với $x \\ne 3$) là:',
    options: [
      { id: 'A', text: '$y\' = \\frac{-7}{(x - 3)^2}$' },
      { id: 'B', text: '$y\' = \\frac{7}{(x - 3)^2}$' },
      { id: 'C', text: '$y\' = \\frac{-5}{(x - 3)^2}$' },
      { id: 'D', text: '$y\' = \\frac{2}{(x - 3)^2}$' }
    ],
    correctOptionId: 'A',
    explanation: 'Áp dụng công thức $\\left(\\frac{ax+b}{cx+d}\\right)\' = \\frac{ad - bc}{(cx+d)^2}$, ta có $y\' = \\frac{2 \\cdot (-3) - 1 \\cdot 1}{(x - 3)^2} = \\frac{-7}{(x - 3)^2}$.'
  },
  {
    prompt: 'Trong các công thức đạo hàm của hàm số lượng giác dưới đây, công thức nào là **sai**?',
    options: [
      { id: 'A', text: '$(\\sin x)\' = \\cos x$' },
      { id: 'B', text: '$(\\cos x)\' = \\sin x$' },
      { id: 'C', text: '$(\\tan x)\' = \\frac{1}{\\cos^2 x}$' },
      { id: 'D', text: '$(\\cot x)\' = -\\frac{1}{\\sin^2 x}$' }
    ],
    correctOptionId: 'B',
    explanation: 'Công thức đúng là $(\\cos x)\' = -\\sin x$, nên đáp án B sai.'
  },
  {
    prompt: 'Đạo hàm của hàm số $y = \\sin 3x$ là:',
    options: [
      { id: 'A', text: '$y\' = \\cos 3x$' },
      { id: 'B', text: '$y\' = 3\\cos 3x$' },
      { id: 'C', text: '$y\' = -3\\cos 3x$' },
      { id: 'D', text: '$y\' = 3\\sin 3x$' }
    ],
    correctOptionId: 'B',
    explanation: 'Áp dụng đạo hàm hàm hợp $(\\sin u)\' = u\' \\cos u$: $(\\sin 3x)\' = (3x)\' \\cos 3x = 3\\cos 3x$.'
  },
  {
    prompt: 'Với cơ số $0 < a \\ne 1$, đạo hàm của hàm số mũ $y = a^x$ là:',
    options: [
      { id: 'A', text: '$y\' = x a^{x-1}$' },
      { id: 'B', text: '$y\' = a^x \\ln a$' },
      { id: 'C', text: '$y\' = \\frac{a^x}{\\ln a}$' },
      { id: 'D', text: '$y\' = a^x$' }
    ],
    correctOptionId: 'B',
    explanation: 'Theo công thức đạo hàm của hàm số mũ: $(a^x)\' = a^x \\ln a$ (đặc biệt $(e^x)\' = e^x$).'
  },
  {
    prompt: 'Với $x > 0$ và cơ số $0 < a \\ne 1$, đạo hàm của hàm số lôgarit $y = \\log_a x$ là:',
    options: [
      { id: 'A', text: '$y\' = \\frac{1}{x}$' },
      { id: 'B', text: '$y\' = \\frac{1}{x \\ln a}$' },
      { id: 'C', text: '$y\' = \\frac{\\ln a}{x}$' },
      { id: 'D', text: '$y\' = \\frac{1}{a \\ln x}$' }
    ],
    correctOptionId: 'B',
    explanation: 'Theo công thức đạo hàm của hàm số lôgarit: $(\\log_a x)\' = \\frac{1}{x \\ln a}$ (đặc biệt $(\\ln x)\' = \\frac{1}{x}$).'
  },
  {
    prompt: 'Đạo hàm của hàm số $y = e^{2x + 1}$ là:',
    options: [
      { id: 'A', text: '$y\' = e^{2x + 1}$' },
      { id: 'B', text: '$y\' = 2e^{2x + 1}$' },
      { id: 'C', text: '$y\' = (2x + 1)e^{2x}$' },
      { id: 'D', text: '$y\' = \\frac{1}{2}e^{2x + 1}$' }
    ],
    correctOptionId: 'B',
    explanation: 'Áp dụng công thức $(e^u)\' = u\' e^u$: $(e^{2x+1})\' = (2x + 1)\' e^{2x+1} = 2e^{2x+1}$.'
  },
  {
    prompt: 'Với $x > 0$, đạo hàm của hàm số $y = \\ln(x^2 + 3)$ là:',
    options: [
      { id: 'A', text: '$y\' = \\frac{1}{x^2 + 3}$' },
      { id: 'B', text: '$y\' = \\frac{2x}{x^2 + 3}$' },
      { id: 'C', text: '$y\' = \\frac{x}{x^2 + 3}$' },
      { id: 'D', text: '$y\' = 2x \\ln(x^2 + 3)$' }
    ],
    correctOptionId: 'B',
    explanation: 'Áp dụng công thức $(\\ln u)\' = \\frac{u\'}{u}$: $y\' = \\frac{(x^2 + 3)\'}{x^2 + 3} = \\frac{2x}{x^2 + 3}$.'
  },
  {
    prompt: 'Đạo hàm của hàm số $y = \\sqrt{x^2 + 5}$ là:',
    options: [
      { id: 'A', text: '$y\' = \\frac{1}{2\\sqrt{x^2 + 5}}$' },
      { id: 'B', text: '$y\' = \\frac{x}{\\sqrt{x^2 + 5}}$' },
      { id: 'C', text: '$y\' = \\frac{2x}{\\sqrt{x^2 + 5}}$' },
      { id: 'D', text: '$y\' = \\frac{5}{\\sqrt{x^2 + 5}}$' }
    ],
    correctOptionId: 'B',
    explanation: 'Áp dụng $(\\sqrt{u})\' = \\frac{u\'}{2\\sqrt{u}}$: $y\' = \\frac{2x}{2\\sqrt{x^2 + 5}} = \\frac{x}{\\sqrt{x^2 + 5}}$.'
  }
];

const b32P2A: CompactTF[] = [
  {
    stem: 'Cho hàm số $f(x) = x \\cdot e^x$. Xét tính đúng sai của các mệnh đề sau:',
    statements: [
      {
        id: 'a',
        text: 'Áp dụng quy tắc đạo hàm của một tích, ta có $f\'(x) = (x)\' e^x + x (e^x)\'$.',
        isTrue: true,
        explanation: 'Đúng theo quy tắc $(uv)\' = u\'v + uv\'$.'
      },
      {
        id: 'b',
        text: 'Đạo hàm của hàm số là $f\'(x) = (x + 1)e^x$.',
        isTrue: true,
        explanation: 'Đúng vì $f\'(x) = 1 \\cdot e^x + x \\cdot e^x = (x + 1)e^x$.'
      },
      {
        id: 'c',
        text: 'Giá trị của $f\'(0)$ bằng $0$.',
        isTrue: false,
        explanation: 'Sai vì $f\'(0) = (0 + 1)e^0 = 1 \\ne 0$.'
      },
      {
        id: 'd',
        text: 'Phương trình $f\'(x) = 0$ có nghiệm duy nhất là $x = -1$.',
        isTrue: true,
        explanation: 'Đúng vì $(x + 1)e^x = 0 \\Leftrightarrow x + 1 = 0 \\Leftrightarrow x = -1$ (do $e^x > 0, \\forall x \\in \\mathbb{R}$).'
      }
    ]
  },
  {
    stem: 'Cho hàm số lượng giác $g(x) = \\sin 2x - 2\\cos x$. Xét tính đúng sai của các mệnh đề sau:',
    statements: [
      {
        id: 'a',
        text: 'Đạo hàm của $\\sin 2x$ là $2\\cos 2x$.',
        isTrue: true,
        explanation: 'Đúng theo công thức $(\\sin u)\' = u\' \\cos u$.'
      },
      {
        id: 'b',
        text: 'Đạo hàm của hàm số $g(x)$ là $g\'(x) = 2\\cos 2x - 2\\sin x$.',
        isTrue: false,
        explanation: 'Sai vì $(-2\\cos x)\' = -2(-\\sin x) = +2\\sin x$, nên $g\'(x) = 2\\cos 2x + 2\\sin x$.'
      },
      {
        id: 'c',
        text: 'Tại $x = 0$, ta có $g\'(0) = 2$.',
        isTrue: true,
        explanation: 'Đúng vì $g\'(0) = 2\\cos 0 + 2\\sin 0 = 2 \\cdot 1 + 0 = 2$.'
      },
      {
        id: 'd',
        text: 'Tại $x = \\frac{\\pi}{2}$, ta có $g\'\\left(\\frac{\\pi}{2}\\right) = 0$.',
        isTrue: true,
        explanation: 'Đúng vì $g\'\\left(\\frac{\\pi}{2}\\right) = 2\\cos \\pi + 2\\sin\\frac{\\pi}{2} = 2(-1) + 2(1) = 0$.'
      }
    ]
  }
];

const b32P3A: CompactSA[] = [
  {
    prompt: 'Cho hàm số $f(x) = (2x - 1)^4$. Tính giá trị của đạo hàm $f\'(1)$.',
    correctAnswer: '8',
    acceptedAnswers: ['8'],
    explanation: 'Ta có $f\'(x) = 4(2x - 1)^3 \\cdot (2x - 1)\' = 8(2x - 1)^3$. Thay $x = 1$, được $f\'(1) = 8 \\cdot 1^3 = 8$.'
  },
  {
    prompt: 'Cho hàm số $f(x) = \\frac{3x - 2}{x + 1}$. Tính giá trị của $f\'(0)$.',
    correctAnswer: '5',
    acceptedAnswers: ['5'],
    explanation: 'Ta có $f\'(x) = \\frac{3 \\cdot 1 - (-2) \\cdot 1}{(x + 1)^2} = \\frac{5}{(x + 1)^2}$. Suy ra $f\'(0) = 5$.'
  },
  {
    prompt: 'Cho hàm số $f(x) = \\sqrt{x^2 + 16}$. Tính giá trị của biểu thức $25 \\cdot f\'(3)$.',
    correctAnswer: '15',
    acceptedAnswers: ['15'],
    explanation: 'Ta có $f\'(x) = \\frac{x}{\\sqrt{x^2 + 16}} \\Rightarrow f\'(3) = \\frac{3}{\\sqrt{9 + 16}} = \\frac{3}{5}$. Vậy $25 \\cdot f\'(3) = 25 \\cdot \\frac{3}{5} = 15$.'
  },
  {
    prompt: 'Tính tổng các nghiệm của phương trình $f\'(x) = 0$ biết $f(x) = \\frac{1}{3}x^3 - 3x^2 + 5x + 2$.',
    correctAnswer: '6',
    acceptedAnswers: ['6'],
    explanation: 'Ta có $f\'(x) = x^2 - 6x + 5 = 0 \\Leftrightarrow x = 1$ hoặc $x = 5$. Tổng hai nghiệm bằng $1 + 5 = 6$.'
  }
];

const b32P4A: CompactSO[] = [
  {
    prompt: 'Sắp xếp các bước tính đạo hàm của hàm số thương $y = \\frac{x^2 + 1}{x - 1}$ (với $x \\ne 1$):',
    steps: [
      { id: '1', text: 'Đặt $u = x^2 + 1$ và $v = x - 1$, tính được $u\' = 2x$ và $v\' = 1$.' },
      { id: '2', text: 'Áp dụng quy tắc đạo hàm của một thương: $y\' = \\frac{u\'v - uv\'}{v^2} = \\frac{2x(x - 1) - (x^2 + 1) \\cdot 1}{(x - 1)^2}$.' },
      { id: '3', text: 'Khai triển tử thức: $2x(x - 1) - (x^2 + 1) = 2x^2 - 2x - x^2 - 1 = x^2 - 2x - 1$.' },
      { id: '4', text: 'Kết luận $y\' = \\frac{x^2 - 2x - 1}{(x - 1)^2}$.' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Tính $u\', v\' \\to$ Thay vào $\\frac{u\'v - uv\'}{v^2} \\to$ Thu gọn tử số thành $x^2 - 2x - 1$.'
  },
  {
    prompt: 'Sắp xếp các bước tính đạo hàm của hàm hợp $y = \\ln(\\sin x)$ trên khoảng $\\left(0; \\frac{\\pi}{2}\\right)$:',
    steps: [
      { id: '1', text: 'Xem hàm số dưới dạng hàm hợp $y = \\ln u$ với $u = \\sin x > 0$.' },
      { id: '2', text: 'Áp dụng công thức đạo hàm $(\\ln u)\' = \\frac{u\'}{u} = \\frac{(\\sin x)\'}{\\sin x}$.' },
      { id: '3', text: 'Thay $(\\sin x)\' = \\cos x$ vào tử thức, ta được $y\' = \\frac{\\cos x}{\\sin x}$.' },
      { id: '4', text: 'Thu gọn kết quả: $y\' = \\cot x$.' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Áp dụng $(\\ln u)\' = \\frac{u\'}{u} = \\frac{\\cos x}{\\sin x} = \\cot x$.'
  },
  {
    prompt: 'Sắp xếp các bước giải bất phương trình $f\'(x) \\le 0$ với $f(x) = x^3 - 3x^2 - 9x + 10$:',
    steps: [
      { id: '1', text: 'Tính đạo hàm của hàm số: $f\'(x) = 3x^2 - 6x - 9$.' },
      { id: '2', text: 'Thiết lập bất phương trình: $3x^2 - 6x - 9 \\le 0 \\Leftrightarrow x^2 - 2x - 3 \\le 0$.' },
      { id: '3', text: 'Tìm nghiệm của phương trình $x^2 - 2x - 3 = 0 \\Leftrightarrow x = -1$ hoặc $x = 3$.' },
      { id: '4', text: 'Xét dấu tam thức bậc hai, kết luận tập nghiệm là đoạn $[-1; 3]$.' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Tính $f\'(x) = 3(x^2 - 2x - 3) \\le 0 \\Leftrightarrow -1 \\le x \\le 3$.'
  },
  {
    prompt: 'Sắp xếp các bước tính đạo hàm của hàm số $y = (x^2 + 1)e^{2x}$:',
    steps: [
      { id: '1', text: 'Áp dụng quy tắc đạo hàm của một tích: $y\' = (x^2 + 1)\' e^{2x} + (x^2 + 1)(e^{2x})\'$.' },
      { id: '2', text: 'Tính đạo hàm từng thành phần: $(x^2 + 1)\' = 2x$ và $(e^{2x})\' = 2e^{2x}$.' },
      { id: '3', text: 'Thay vào biểu thức: $y\' = 2x e^{2x} + 2(x^2 + 1)e^{2x}$.' },
      { id: '4', text: 'Đặt nhân tử chung $2e^{2x}$: $y\' = 2(x^2 + x + 1)e^{2x}$.' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Dùng quy tắc tích $(uv)\' = u\'v + uv\'$ và đặt nhân tử chung $2e^{2x}$.'
  }
];

const b32P1B: CompactMC[] = [
  {
    prompt: 'Đạo hàm của hàm số $y = \\frac{1}{x}$ (với $x \\ne 0$) là:',
    options: [
      { id: 'A', text: '$y\' = \\frac{1}{x^2}$' },
      { id: 'B', text: '$y\' = -\\frac{1}{x^2}$' },
      { id: 'C', text: '$y\' = \\ln|x|$' },
      { id: 'D', text: '$y\' = -\\frac{2}{x^2}$' }
    ],
    correctOptionId: 'B',
    explanation: 'Với $x \\ne 0$, ta có $\\left(\\frac{1}{x}\\right)\' = -\\frac{1}{x^2}$.'
  },
  {
    prompt: 'Đạo hàm của hàm số $y = (x^2 - 3x)^5$ là:',
    options: [
      { id: 'A', text: '$y\' = 5(x^2 - 3x)^4$' },
      { id: 'B', text: '$y\' = 5(2x - 3)(x^2 - 3x)^4$' },
      { id: 'C', text: '$y\' = (2x - 3)(x^2 - 3x)^4$' },
      { id: 'D', text: '$y\' = 10x(x^2 - 3x)^4$' }
    ],
    correctOptionId: 'B',
    explanation: 'Áp dụng công thức $(u^n)\' = n u^{n-1} u\'$: $y\' = 5(x^2 - 3x)^4 (x^2 - 3x)\' = 5(2x - 3)(x^2 - 3x)^4$.'
  },
  {
    prompt: 'Đạo hàm của hàm số $y = \\cos(4x - 1)$ là:',
    options: [
      { id: 'A', text: '$y\' = 4\\sin(4x - 1)$' },
      { id: 'B', text: '$y\' = -4\\sin(4x - 1)$' },
      { id: 'C', text: '$y\' = -\\sin(4x - 1)$' },
      { id: 'D', text: '$y\' = 4\\cos(4x - 1)$' }
    ],
    correctOptionId: 'B',
    explanation: 'Áp dụng $(\\cos u)\' = -u\' \\sin u$: $y\' = -(4x - 1)\' \\sin(4x - 1) = -4\\sin(4x - 1)$.'
  },
  {
    prompt: 'Đạo hàm của hàm số $y = \\tan 2x$ (với $\\cos 2x \\ne 0$) là:',
    options: [
      { id: 'A', text: '$y\' = \\frac{1}{\\cos^2 2x}$' },
      { id: 'B', text: '$y\' = \\frac{2}{\\cos^2 2x}$' },
      { id: 'C', text: '$y\' = -\\frac{2}{\\sin^2 2x}$' },
      { id: 'D', text: '$y\' = 2\\cot 2x$' }
    ],
    correctOptionId: 'B',
    explanation: 'Áp dụng $(\\tan u)\' = \\frac{u\'}{\\cos^2 u}$: $(\\tan 2x)\' = \\frac{(2x)\'}{\\cos^2 2x} = \\frac{2}{\\cos^2 2x}$.'
  },
  {
    prompt: 'Đạo hàm của hàm số $y = 3^x$ là:',
    options: [
      { id: 'A', text: '$y\' = 3^x \\ln 3$' },
      { id: 'B', text: '$y\' = x \\cdot 3^{x-1}$' },
      { id: 'C', text: '$y\' = \\frac{3^x}{\\ln 3}$' },
      { id: 'D', text: '$y\' = 3^x$' }
    ],
    correctOptionId: 'A',
    explanation: 'Theo công thức $(a^x)\' = a^x \\ln a$, ta có $(3^x)\' = 3^x \\ln 3$.'
  },
  {
    prompt: 'Đạo hàm của hàm số $y = \\log_2 (3x + 1)$ (với $x > -\\frac{1}{3}$) là:',
    options: [
      { id: 'A', text: '$y\' = \\frac{1}{(3x + 1)\\ln 2}$' },
      { id: 'B', text: '$y\' = \\frac{3}{(3x + 1)\\ln 2}$' },
      { id: 'C', text: '$y\' = \\frac{3}{3x + 1}$' },
      { id: 'D', text: '$y\' = \\frac{3\\ln 2}{3x + 1}$' }
    ],
    correctOptionId: 'B',
    explanation: 'Áp dụng $(\\log_a u)\' = \\frac{u\'}{u \\ln a}$: $y\' = \\frac{(3x + 1)\'}{(3x + 1)\\ln 2} = \\frac{3}{(3x + 1)\\ln 2}$.'
  },
  {
    prompt: 'Đạo hàm của hàm số $y = x \\ln x - x$ (với $x > 0$) là:',
    options: [
      { id: 'A', text: '$y\' = \\ln x$' },
      { id: 'B', text: '$y\' = \\ln x + 1$' },
      { id: 'C', text: '$y\' = \\frac{1}{x} - 1$' },
      { id: 'D', text: '$y\' = \\ln x - 1$' }
    ],
    correctOptionId: 'A',
    explanation: 'Ta có $y\' = (x)\' \\ln x + x (\\ln x)\' - 1 = \\ln x + x \\cdot \\frac{1}{x} - 1 = \\ln x + 1 - 1 = \\ln x$.'
  },
  {
    prompt: 'Đạo hàm của hàm số $y = \\sin^2 x$ là:',
    options: [
      { id: 'A', text: '$y\' = 2\\sin x$' },
      { id: 'B', text: '$y\' = \\sin 2x$' },
      { id: 'C', text: '$y\' = \\cos^2 x$' },
      { id: 'D', text: '$y\' = -\\sin 2x$' }
    ],
    correctOptionId: 'B',
    explanation: 'Ta có $(\\sin^2 x)\' = 2\\sin x \\cdot (\\sin x)\' = 2\\sin x \\cos x = \\sin 2x$.'
  },
  {
    prompt: 'Cho hàm số $f(x) = \\frac{x + 2}{x - 1}$. Tập nghiệm của bất phương trình $f\'(x) < 0$ là:',
    options: [
      { id: 'A', text: '$\\mathbb{R} \\setminus \\{1\\}$' },
      { id: 'B', text: '$\\varnothing$' },
      { id: 'C', text: '$(-\\infty; 1)$' },
      { id: 'D', text: '$(1; +\\infty)$' }
    ],
    correctOptionId: 'A',
    explanation: 'Ta có $f\'(x) = \\frac{-3}{(x - 1)^2} < 0$ với mọi $x \\ne 1$. Vậy tập nghiệm là $\\mathbb{R} \\setminus \\{1\\}$.'
  },
  {
    prompt: 'Cho hàm số $f(x) = 2^{x^2 - 2x}$. Nghiệm của phương trình $f\'(x) = 0$ là:',
    options: [
      { id: 'A', text: '$x = 1$' },
      { id: 'B', text: '$x = 0$ hoặc $x = 2$' },
      { id: 'C', text: '$x = 2$' },
      { id: 'D', text: '$x = 0$' }
    ],
    correctOptionId: 'A',
    explanation: 'Ta có $f\'(x) = (2x - 2) \\cdot 2^{x^2 - 2x} \\ln 2 = 0 \\Leftrightarrow 2x - 2 = 0 \\Leftrightarrow x = 1$.'
  },
  {
    prompt: 'Cho hàm số $f(x) = \\sqrt{2x + 7}$. Giá trị của $f\'(1)$ bằng:',
    options: [
      { id: 'A', text: '$\\frac{1}{3}$' },
      { id: 'B', text: '$\\frac{2}{3}$' },
      { id: 'C', text: '$\\frac{1}{6}$' },
      { id: 'D', text: '$3$' }
    ],
    correctOptionId: 'A',
    explanation: 'Ta có $f\'(x) = \\frac{2}{2\\sqrt{2x + 7}} = \\frac{1}{\\sqrt{2x + 7}} \\Rightarrow f\'(1) = \\frac{1}{\\sqrt{9}} = \\frac{1}{3}$.'
  },
  {
    prompt: 'Phương trình tiếp tuyến của đồ thị hàm số $y = e^x$ tại điểm có hoành độ $x_0 = 0$ là:',
    options: [
      { id: 'A', text: '$y = x + 1$' },
      { id: 'B', text: '$y = e x + 1$' },
      { id: 'C', text: '$y = x$' },
      { id: 'D', text: '$y = x - 1$' }
    ],
    correctOptionId: 'A',
    explanation: 'Ta có $y(0) = e^0 = 1$ và $y\'(x) = e^x \\Rightarrow y\'(0) = 1$. Phương trình tiếp tuyến là $y = 1(x - 0) + 1 = x + 1$.'
  }
];

const b32P2B: CompactTF[] = [
  {
    stem: 'Cho hàm số $f(x) = \\frac{2x - 1}{x + 2}$ (với $x \\ne -2$). Xét tính đúng sai của các mệnh đề sau:',
    statements: [
      {
        id: 'a',
        text: 'Đạo hàm của hàm số là $f\'(x) = \\frac{5}{(x + 2)^2}$ với mọi $x \\ne -2$.',
        isTrue: true,
        explanation: 'Đúng vì $f\'(x) = \\frac{2 \\cdot 2 - (-1) \\cdot 1}{(x + 2)^2} = \\frac{5}{(x + 2)^2}$.'
      },
      {
        id: 'b',
        text: 'Với mọi $x \\ne -2$, ta luôn có $f\'(x) > 0$.',
        isTrue: true,
        explanation: 'Đúng vì $(x + 2)^2 > 0, \\forall x \\ne -2$ nên $\\frac{5}{(x+2)^2} > 0$.'
      },
      {
        id: 'c',
        text: 'Giá trị của $f\'(-1)$ bằng $5$.',
        isTrue: true,
        explanation: 'Đúng vì $f\'(-1) = \\frac{5}{(-1 + 2)^2} = 5$.'
      },
      {
        id: 'd',
        text: 'Có hai điểm trên đồ thị hàm số mà tiếp tuyến tại đó có hệ số góc bằng $-5$.',
        isTrue: false,
        explanation: 'Sai vì $f\'(x) = \\frac{5}{(x + 2)^2} > 0$ nên phương trình $f\'(x) = -5$ vô nghiệm.'
      }
    ]
  },
  {
    stem: 'Cho hàm số $g(x) = \\ln(x^2 + 1)$ xác định với mọi $x \\in \\mathbb{R}$. Xét tính đúng sai của các mệnh đề sau:',
    statements: [
      {
        id: 'a',
        text: 'Đạo hàm của hàm số $g(x)$ là $g\'(x) = \\frac{2x}{x^2 + 1}$.',
        isTrue: true,
        explanation: 'Đúng theo công thức $(\\ln u)\' = \\frac{u\'}{u}$.'
      },
      {
        id: 'b',
        text: 'Tại $x = 1$, ta có $g\'(1) = 1$.',
        isTrue: true,
        explanation: 'Đúng vì $g\'(1) = \\frac{2 \\cdot 1}{1^2 + 1} = 1$.'
      },
      {
        id: 'c',
        text: 'Phương trình $g\'(x) = 1$ có nghiệm duy nhất là $x = 1$.',
        isTrue: true,
        explanation: 'Đúng vì $\\frac{2x}{x^2 + 1} = 1 \\Leftrightarrow x^2 - 2x + 1 = 0 \\Leftrightarrow (x - 1)^2 = 0 \\Leftrightarrow x = 1$.'
      },
      {
        id: 'd',
        text: 'Với mọi $x \\in \\mathbb{R}$, ta luôn có $g\'(x) \\ge 0$.',
        isTrue: false,
        explanation: 'Sai vì khi $x < 0$ thì $g\'(x) = \\frac{2x}{x^2 + 1} < 0$.'
      }
    ]
  }
];

const b32P3B: CompactSA[] = [
  {
    prompt: 'Cho hàm số $f(x) = (x^2 + 1)(2x - 3)$. Tính giá trị của đạo hàm $f\'(2)$.',
    correctAnswer: '14',
    acceptedAnswers: ['14'],
    explanation: 'Ta có $f\'(x) = 2x(2x - 3) + (x^2 + 1) \\cdot 2$. Thay $x = 2$, ta được $f\'(2) = 4 \\cdot 1 + 5 \\cdot 2 = 14$.'
  },
  {
    prompt: 'Cho hàm số $f(x) = \\sin x + \\sqrt{3}\\cos x$. Tính giá trị của $f\'\\left(\\frac{\\pi}{6}\\right)$.',
    correctAnswer: '0',
    acceptedAnswers: ['0'],
    explanation: 'Ta có $f\'(x) = \\cos x - \\sqrt{3}\\sin x \\Rightarrow f\'\\left(\\frac{\\pi}{6}\\right) = \\frac{\\sqrt{3}}{2} - \\sqrt{3} \\cdot \\frac{1}{2} = 0$.'
  },
  {
    prompt: 'Cho hàm số $f(x) = x \\cdot \\ln x$ ($x > 0$). Tính giá trị của $f\'(e^2)$.',
    correctAnswer: '3',
    acceptedAnswers: ['3'],
    explanation: 'Ta có $f\'(x) = \\ln x + x \\cdot \\frac{1}{x} = \\ln x + 1$. Khi đó $f\'(e^2) = \\ln(e^2) + 1 = 2 + 1 = 3$.'
  },
  {
    prompt: 'Cho hàm số $f(x) = \\frac{x^2 - 2x + 5}{x - 1}$. Tính tổng tất cả các nghiệm của phương trình $f\'(x) = 0$.',
    correctAnswer: '2',
    acceptedAnswers: ['2'],
    explanation: 'Ta có $f\'(x) = \\frac{(2x - 2)(x - 1) - (x^2 - 2x + 5)}{(x - 1)^2} = \\frac{x^2 - 2x - 3}{(x - 1)^2} = 0 \\Leftrightarrow x = -1$ hoặc $x = 3$. Tổng hai nghiệm là $-1 + 3 = 2$.'
  }
];

const b32P4B: CompactSO[] = [
  {
    prompt: 'Sắp xếp các bước tính đạo hàm của hàm số $y = \\sqrt{\\sin^2 x + 3}$:',
    steps: [
      { id: '1', text: 'Áp dụng công thức đạo hàm của căn thức hàm hợp $(\\sqrt{u})\' = \\frac{u\'}{2\\sqrt{u}}$ với $u = \\sin^2 x + 3$.' },
      { id: '2', text: 'Tính đạo hàm của $u$: $u\' = (\\sin^2 x + 3)\' = 2\\sin x \\cos x = \\sin 2x$.' },
      { id: '3', text: 'Thay $u$ và $u\'$ vào công thức: $y\' = \\frac{2\\sin x \\cos x}{2\\sqrt{\\sin^2 x + 3}}$.' },
      { id: '4', text: 'Rút gọn thừa số $2$ ở tử và mẫu, thu được $y\' = \\frac{\\sin x \\cos x}{\\sqrt{\\sin^2 x + 3}}$.' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Áp dụng $(\\sqrt{u})\' = \\frac{u\'}{2\\sqrt{u}}$ với $u\' = 2\\sin x\\cos x$, rút gọn được $\\frac{\\sin x\\cos x}{\\sqrt{\\sin^2 x+3}}$.'
  },
  {
    prompt: 'Sắp xếp các bước chứng minh đẳng thức $y\' - 2y = 3e^{2x}$ với hàm số $y = 3x e^{2x}$:',
    steps: [
      { id: '1', text: 'Áp dụng quy tắc đạo hàm của một tích cho $y = 3x \\cdot e^{2x}$: $y\' = (3x)\' e^{2x} + 3x (e^{2x})\'$.' },
      { id: '2', text: 'Tính được $y\' = 3e^{2x} + 3x \\cdot 2e^{2x} = 3e^{2x} + 6x e^{2x}$.' },
      { id: '3', text: 'Thay $y\'$ và $y = 3x e^{2x}$ vào vế trái: $VT = (3e^{2x} + 6x e^{2x}) - 2(3x e^{2x})$.' },
      { id: '4', text: 'Rút gọn hai hạng tử đối nhau $6x e^{2x} - 6x e^{2x} = 0$, thu được $VT = 3e^{2x} = VP$.' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Tính $y\' = 3e^{2x} + 6xe^{2x} = 3e^{2x} + 2y \\Rightarrow y\' - 2y = 3e^{2x}$.'
  },
  {
    prompt: 'Sắp xếp các bước viết phương trình tiếp tuyến của đồ thị hàm số $y = \\ln x$ tại điểm có hoành độ $x_0 = e$:',
    steps: [
      { id: '1', text: 'Tính tung độ tiếp điểm: $y_0 = \\ln e = 1$, suy ra tiếp điểm là $M(e; 1)$.' },
      { id: '2', text: 'Tính đạo hàm của hàm số: $y\' = \\frac{1}{x}$, suy ra hệ số góc tại $x_0 = e$ là $k = y\'(e) = \\frac{1}{e}$.' },
      { id: '3', text: 'Thay vào phương trình tiếp tuyến: $y - 1 = \\frac{1}{e}(x - e)$.' },
      { id: '4', text: 'Khai triển và rút gọn: $y = \\frac{1}{e}x - 1 + 1 \\Leftrightarrow y = \\frac{x}{e}$.' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Tại $M(e; 1)$, hệ số góc $y\'(e) = \\frac{1}{e}$, tiếp tuyến là $y = \\frac{1}{e}(x - e) + 1 = \\frac{x}{e}$.'
  },
  {
    prompt: 'Sắp xếp các bước tìm các điểm cực trị (nghiệm của $y\' = 0$) của hàm số $y = x - \\ln(2x + 1)$:',
    steps: [
      { id: '1', text: 'Tìm điều kiện xác định của hàm số: $2x + 1 > 0 \\Leftrightarrow x > -\\frac{1}{2}$.' },
      { id: '2', text: 'Tính đạo hàm của hàm số: $y\' = 1 - \\frac{(2x + 1)\'}{2x + 1} = 1 - \\frac{2}{2x + 1}$.' },
      { id: '3', text: 'Giải phương trình $y\' = 0 \\Leftrightarrow \\frac{2}{2x + 1} = 1 \\Leftrightarrow 2x + 1 = 2$.' },
      { id: '4', text: 'Tìm được $x = \\frac{1}{2}$ (thoả mãn điều kiện $x > -\\frac{1}{2}$).' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'ĐKXĐ $x > -\\frac{1}{2}$, giải $y\' = 1 - \\frac{2}{2x+1} = 0 \\Leftrightarrow x = \\frac{1}{2}$.'
  }
];

// ============================================================================
// BÀI 33. ĐẠO HÀM CẤP HAI
// Trọng tâm: Định nghĩa và cách tính đạo hàm cấp hai f''(x) = [f'(x)]';
// ý nghĩa cơ học của đạo hàm cấp hai (gia tốc tức thời a(t) = v'(t) = s''(t)).
// ============================================================================

const b33P1A: CompactMC[] = [
  {
    prompt: 'Cho hàm số $y = f(x)$ có đạo hàm $f\'(x)$ trên khoảng $(a; b)$. Đạo hàm cấp hai $f\'\'(x)$ của hàm số $y = f(x)$ được định nghĩa là:',
    options: [
      { id: 'A', text: '$f\'\'(x) = [f\'(x)]^2$' },
      { id: 'B', text: '$f\'\'(x) = [f\'(x)]\'$' },
      { id: 'C', text: '$f\'\'(x) = 2f\'(x)$' },
      { id: 'D', text: '$f\'\'(x) = f(x) \\cdot f\'(x)$' }
    ],
    correctOptionId: 'B',
    explanation: 'Theo định nghĩa: Đạo hàm của hàm số $f\'(x)$ (nếu có) được gọi là đạo hàm cấp hai của hàm số $f(x)$, kí hiệu $f\'\'(x) = [f\'(x)]\'$.'
  },
  {
    prompt: 'Đạo hàm cấp hai của hàm số $y = x^4 - 5x^2 + 3x - 1$ là:',
    options: [
      { id: 'A', text: '$y\'\' = 4x^3 - 10x + 3$' },
      { id: 'B', text: '$y\'\' = 12x^2 - 10$' },
      { id: 'C', text: '$y\'\' = 12x^2 - 10x$' },
      { id: 'D', text: '$y\'\' = 24x$' }
    ],
    correctOptionId: 'B',
    explanation: 'Ta có $y\' = 4x^3 - 10x + 3 \\Rightarrow y\'\' = (4x^3 - 10x + 3)\' = 12x^2 - 10$.'
  },
  {
    prompt: 'Cho hàm số $f(x) = x^3 - 2x^2 + 4x - 5$. Giá trị của $f\'\'(2)$ bằng:',
    options: [
      { id: 'A', text: '$8$' },
      { id: 'B', text: '$12$' },
      { id: 'C', text: '$4$' },
      { id: 'D', text: '$6$' }
    ],
    correctOptionId: 'A',
    explanation: 'Ta có $f\'(x) = 3x^2 - 4x + 4 \\Rightarrow f\'\'(x) = 6x - 4$. Khi đó $f\'\'(2) = 6 \\cdot 2 - 4 = 8$.'
  },
  {
    prompt: 'Đạo hàm cấp hai của hàm số $y = \\sin x$ là:',
    options: [
      { id: 'A', text: '$y\'\' = \\cos x$' },
      { id: 'B', text: '$y\'\' = -\\sin x$' },
      { id: 'C', text: '$y\'\' = \\sin x$' },
      { id: 'D', text: '$y\'\' = -\\cos x$' }
    ],
    correctOptionId: 'B',
    explanation: 'Ta có $y\' = (\\sin x)\' = \\cos x \\Rightarrow y\'\' = (\\cos x)\' = -\\sin x$.'
  },
  {
    prompt: 'Đạo hàm cấp hai của hàm số $y = \\cos 2x$ là:',
    options: [
      { id: 'A', text: '$y\'\' = -2\\cos 2x$' },
      { id: 'B', text: '$y\'\' = -4\\cos 2x$' },
      { id: 'C', text: '$y\'\' = 4\\cos 2x$' },
      { id: 'D', text: '$y\'\' = -4\\sin 2x$' }
    ],
    correctOptionId: 'B',
    explanation: 'Ta có $y\' = -2\\sin 2x \\Rightarrow y\'\' = -2 \\cdot 2\\cos 2x = -4\\cos 2x$.'
  },
  {
    prompt: 'Đạo hàm cấp hai của hàm số $y = e^{3x}$ là:',
    options: [
      { id: 'A', text: '$y\'\' = 3e^{3x}$' },
      { id: 'B', text: '$y\'\' = 9e^{3x}$' },
      { id: 'C', text: '$y\'\' = 6e^{3x}$' },
      { id: 'D', text: '$y\'\' = e^{3x}$' }
    ],
    correctOptionId: 'B',
    explanation: 'Ta có $y\' = 3e^{3x} \\Rightarrow y\'\' = 3 \\cdot 3e^{3x} = 9e^{3x}$.'
  },
  {
    prompt: 'Với $x > 0$, đạo hàm cấp hai của hàm số $y = \\ln x$ là:',
    options: [
      { id: 'A', text: '$y\'\' = \\frac{1}{x^2}$' },
      { id: 'B', text: '$y\'\' = -\\frac{1}{x^2}$' },
      { id: 'C', text: '$y\'\' = \\frac{1}{x}$' },
      { id: 'D', text: '$y\'\' = -\\frac{2}{x^2}$' }
    ],
    correctOptionId: 'B',
    explanation: 'Ta có $y\' = \\frac{1}{x} \\Rightarrow y\'\' = \\left(\\frac{1}{x}\\right)\' = -\\frac{1}{x^2}$.'
  },
  {
    prompt: 'Với $x \\ne 0$, đạo hàm cấp hai của hàm số $y = \\frac{1}{x}$ là:',
    options: [
      { id: 'A', text: '$y\'\' = \\frac{2}{x^3}$' },
      { id: 'B', text: '$y\'\' = -\\frac{2}{x^3}$' },
      { id: 'C', text: '$y\'\' = \\frac{1}{x^3}$' },
      { id: 'D', text: '$y\'\' = \\frac{2}{x^2}$' }
    ],
    correctOptionId: 'A',
    explanation: 'Ta có $y = x^{-1} \\Rightarrow y\' = -x^{-2} \\Rightarrow y\'\' = 2x^{-3} = \\frac{2}{x^3}$.'
  },
  {
    prompt: 'Một chất điểm chuyển động thẳng có phương trình quãng đường $s = s(t)$. Gia tốc tức thời $a(t)$ của chất điểm tại thời điểm $t$ được tính theo công thức nào?',
    options: [
      { id: 'A', text: '$a(t) = s\'(t)$' },
      { id: 'B', text: '$a(t) = s\'\'(t)$' },
      { id: 'C', text: '$a(t) = \\frac{v(t)}{t}$' },
      { id: 'D', text: '$a(t) = [s\'(t)]^2$' }
    ],
    correctOptionId: 'B',
    explanation: 'Theo ý nghĩa cơ học của đạo hàm cấp hai: Gia tốc tức thời tại thời điểm $t$ là $a(t) = v\'(t) = s\'\'(t)$.'
  },
  {
    prompt: 'Một chất điểm chuyển động theo phương trình $s(t) = t^3 - 3t^2 + 5t + 2$ ($s$ tính bằng mét, $t$ tính bằng giây). Gia tốc tức thời của chất điểm tại thời điểm $t = 3$ giây bằng:',
    options: [
      { id: 'A', text: '$12\\text{ m/s}^2$' },
      { id: 'B', text: '$14\\text{ m/s}^2$' },
      { id: 'C', text: '$6\\text{ m/s}^2$' },
      { id: 'D', text: '$18\\text{ m/s}^2$' }
    ],
    correctOptionId: 'A',
    explanation: 'Ta có $v(t) = s\'(t) = 3t^2 - 6t + 5$ và $a(t) = s\'\'(t) = 6t - 6$. Tại $t = 3$, gia tốc là $a(3) = 6 \\cdot 3 - 6 = 12\\text{ (m/s}^2)$.'
  },
  {
    prompt: 'Cho hàm số $f(x) = (2x - 3)^4$. Đạo hàm cấp hai $f\'\'(x)$ của hàm số là:',
    options: [
      { id: 'A', text: '$f\'\'(x) = 12(2x - 3)^2$' },
      { id: 'B', text: '$f\'\'(x) = 48(2x - 3)^2$' },
      { id: 'C', text: '$f\'\'(x) = 24(2x - 3)^2$' },
      { id: 'D', text: '$f\'\'(x) = 8(2x - 3)^3$' }
    ],
    correctOptionId: 'B',
    explanation: 'Ta có $f\'(x) = 4(2x - 3)^3 \\cdot 2 = 8(2x - 3)^3 \\Rightarrow f\'\'(x) = 8 \\cdot 3(2x - 3)^2 \\cdot 2 = 48(2x - 3)^2$.'
  },
  {
    prompt: 'Cho hàm số $y = \\sin 3x$. Hệ thức nào sau đây là **đúng** với mọi $x \\in \\mathbb{R}$?',
    options: [
      { id: 'A', text: '$y\'\' + 3y = 0$' },
      { id: 'B', text: '$y\'\' + 9y = 0$' },
      { id: 'C', text: '$y\'\' - 9y = 0$' },
      { id: 'D', text: '$y\'\' + y = 0$' }
    ],
    correctOptionId: 'B',
    explanation: 'Ta có $y\' = 3\\cos 3x \\Rightarrow y\'\' = -9\\sin 3x = -9y \\Leftrightarrow y\'\' + 9y = 0$.'
  }
];

const b33P2A: CompactTF[] = [
  {
    stem: 'Cho hàm số $f(x) = x^3 - 6x^2 + 9x + 1$. Xét tính đúng sai của các mệnh đề sau:',
    statements: [
      {
        id: 'a',
        text: 'Đạo hàm cấp một của hàm số là $f\'(x) = 3x^2 - 12x + 9$.',
        isTrue: true,
        explanation: 'Đúng theo quy tắc đạo hàm của đa thức.'
      },
      {
        id: 'b',
        text: 'Đạo hàm cấp hai của hàm số là $f\'\'(x) = 6x - 12$.',
        isTrue: true,
        explanation: 'Đúng vì $f\'\'(x) = (3x^2 - 12x + 9)\' = 6x - 12$.'
      },
      {
        id: 'c',
        text: 'Nghiệm của phương trình $f\'\'(x) = 0$ là $x = 2$.',
        isTrue: true,
        explanation: 'Đúng vì $6x - 12 = 0 \\Leftrightarrow x = 2$.'
      },
      {
        id: 'd',
        text: 'Tại nghiệm của phương trình $f\'\'(x) = 0$, đạo hàm cấp một $f\'(2)$ bằng $0$.',
        isTrue: false,
        explanation: 'Sai vì $f\'(2) = 3 \\cdot 2^2 - 12 \\cdot 2 + 9 = -3 \\ne 0$.'
      }
    ]
  },
  {
    stem: 'Một chất điểm chuyển động thẳng theo phương trình $s(t) = t^3 - 6t^2 + 15t + 4$, trong đó $t \\ge 0$ tính bằng giây (s) và $s$ tính bằng mét (m). Xét tính đúng sai của các mệnh đề sau:',
    statements: [
      {
        id: 'a',
        text: 'Vận tốc tức thời của chất điểm tại thời điểm $t$ là $v(t) = 3t^2 - 12t + 15\\text{ (m/s)}$.',
        isTrue: true,
        explanation: 'Đúng vì $v(t) = s\'(t) = 3t^2 - 12t + 15$.'
      },
      {
        id: 'b',
        text: 'Gia tốc tức thời của chất điểm tại thời điểm $t$ là $a(t) = 6t - 12\\text{ (m/s}^2)$.',
        isTrue: true,
        explanation: 'Đúng vì $a(t) = v\'(t) = s\'\'(t) = 6t - 12$.'
      },
      {
        id: 'c',
        text: 'Gia tốc tức thời của chất điểm bằng $0$ tại thời điểm $t = 2$ giây.',
        isTrue: true,
        explanation: 'Đúng vì $a(t) = 0 \\Leftrightarrow 6t - 12 = 0 \\Leftrightarrow t = 2\\text{ s}$.'
      },
      {
        id: 'd',
        text: 'Tại thời điểm mà gia tốc tức thời bằng $0$, vận tốc tức thời của chất điểm bằng $6\\text{ m/s}$.',
        isTrue: false,
        explanation: 'Sai vì tại $t = 2$, vận tốc tức thời là $v(2) = 3 \\cdot 4 - 12 \\cdot 2 + 15 = 3\\text{ m/s} \\ne 6\\text{ m/s}$.'
      }
    ]
  }
];

const b33P3A: CompactSA[] = [
  {
    prompt: 'Cho hàm số $f(x) = 2x^4 - 3x^2 + 7x - 2$. Tính giá trị của $f\'\'(1)$.',
    correctAnswer: '18',
    acceptedAnswers: ['18'],
    explanation: 'Ta có $f\'(x) = 8x^3 - 6x + 7 \\Rightarrow f\'\'(x) = 24x^2 - 6$. Tại $x = 1$, ta có $f\'\'(1) = 24 - 6 = 18$.'
  },
  {
    prompt: 'Cho hàm số $f(x) = x \\cdot e^x$. Tính giá trị của $f\'\'(0)$.',
    correctAnswer: '2',
    acceptedAnswers: ['2'],
    explanation: 'Ta có $f\'(x) = (x + 1)e^x \\Rightarrow f\'\'(x) = (x + 2)e^x$. Suy ra $f\'\'(0) = 2e^0 = 2$.'
  },
  {
    prompt: 'Một vật chuyển động theo phương trình $s(t) = 2t^3 - 3t^2 + 8t$ ($s$ tính bằng mét, $t$ tính bằng giây). Tính gia tốc tức thời (đơn vị: $\\text{m/s}^2$) của vật tại thời điểm $t = 2$ giây.',
    correctAnswer: '18',
    acceptedAnswers: ['18'],
    explanation: 'Ta có $v(t) = 6t^2 - 6t + 8 \\Rightarrow a(t) = s\'\'(t) = 12t - 6$. Tại $t = 2\\text{ s}$, gia tốc là $a(2) = 12 \\cdot 2 - 6 = 18\\text{ (m/s}^2)$.'
  },
  {
    prompt: 'Một chất điểm dao động điều hòa với phương trình li độ $x(t) = 5\\cos(\\pi t)$ (cm), trong đó $t$ tính bằng giây. Biết $\\pi^2 \\approx 10$, tính gia tốc tức thời $a(t) = x\'\'(t)$ của chất điểm tại thời điểm $t = 1$ giây (đơn vị: $\\text{cm/s}^2$).',
    correctAnswer: '50',
    acceptedAnswers: ['50'],
    explanation: 'Ta có $x\'(t) = -5\\pi \\sin(\\pi t) \\Rightarrow a(t) = x\'\'(t) = -5\\pi^2 \\cos(\\pi t)$. Tại $t = 1$, $\\cos \\pi = -1$ nên $a(1) = -5 \\cdot 10 \\cdot (-1) = 50\\text{ (cm/s}^2)$.'
  }
];

const b33P4A: CompactSO[] = [
  {
    prompt: 'Sắp xếp các bước tính đạo hàm cấp hai của hàm số $y = (x^2 + 1)e^x$:',
    steps: [
      { id: '1', text: 'Tính đạo hàm cấp một bằng quy tắc tích: $y\' = 2x e^x + (x^2 + 1)e^x = (x^2 + 2x + 1)e^x$.' },
      { id: '2', text: 'Viết biểu thức đạo hàm cấp hai: $y\'\' = [(x^2 + 2x + 1)e^x]\'$.' },
      { id: '3', text: 'Áp dụng quy tắc tích lần thứ hai: $y\'\' = (2x + 2)e^x + (x^2 + 2x + 1)e^x$.' },
      { id: '4', text: 'Thu gọn đa thức nhân tử chung: $y\'\' = (x^2 + 4x + 3)e^x$.' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Tính $y\' = (x^2 + 2x + 1)e^x$, sau đó lấy đạo hàm lần nữa được $y\'\' = (x^2 + 4x + 3)e^x$.'
  },
  {
    prompt: 'Sắp xếp các bước tính vận tốc của chất điểm tại thời điểm gia tốc bằng $0$ biết $s(t) = t^3 - 9t^2 + 30t + 5$:',
    steps: [
      { id: '1', text: 'Tính hàm vận tốc tức thời: $v(t) = s\'(t) = 3t^2 - 18t + 30$.' },
      { id: '2', text: 'Tính hàm gia tốc tức thời: $a(t) = v\'(t) = 6t - 18$.' },
      { id: '3', text: 'Giải phương trình $a(t) = 0 \\Leftrightarrow 6t - 18 = 0 \\Leftrightarrow t = 3$ (giây).' },
      { id: '4', text: 'Thay $t = 3$ vào hàm vận tốc: $v(3) = 3 \\cdot 3^2 - 18 \\cdot 3 + 30 = 3\\text{ (m/s)}$.' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Tính $v(t), a(t)$, giải $a(t) = 0 \\Leftrightarrow t = 3$ rồi thay vào $v(3) = 3\\text{ m/s}$.'
  },
  {
    prompt: 'Sắp xếp các bước chứng minh hệ thức $y\'\' - 5y\' + 6y = 0$ với hàm số $y = e^{2x} + e^{3x}$:',
    steps: [
      { id: '1', text: 'Tính đạo hàm cấp một: $y\' = 2e^{2x} + 3e^{3x}$.' },
      { id: '2', text: 'Tính đạo hàm cấp hai: $y\'\' = 4e^{2x} + 9e^{3x}$.' },
      { id: '3', text: 'Thay $y, y\', y\'\'$ vào vế trái: $VT = (4e^{2x} + 9e^{3x}) - 5(2e^{2x} + 3e^{3x}) + 6(e^{2x} + e^{3x})$.' },
      { id: '4', text: 'Nhóm các số hạng đồng dạng: $(4 - 10 + 6)e^{2x} + (9 - 15 + 6)e^{3x} = 0 = VP$.' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Tính $y\', y\'\'$ rồi thay vào biểu thức $y\'\' - 5y\' + 6y$ thu gọn bằng $0$.'
  },
  {
    prompt: 'Sắp xếp các bước tính đạo hàm cấp hai của hàm số $y = \\frac{1}{x + 2}$ (với $x \\ne -2$):',
    steps: [
      { id: '1', text: 'Áp dụng công thức $\\left(\\frac{1}{u}\\right)\' = -\\frac{u\'}{u^2}$ để tính đạo hàm cấp một: $y\' = -\\frac{1}{(x + 2)^2}$.' },
      { id: '2', text: 'Viết lại $y\'$ dưới dạng luỹ thừa hoặc phân thức: $y\'\' = \\left[-\\frac{1}{(x + 2)^2}\\right]\'$.' },
      { id: '3', text: 'Áp dụng công thức đạo hàm: $y\'\' = -\\left[-\\frac{[(x + 2)^2]\'}{(x + 2)^4}\\right] = \\frac{2(x + 2)}{(x + 2)^4}$.' },
      { id: '4', text: 'Rút gọn nhân tử $(x + 2)$ ở tử và mẫu, thu được $y\'\' = \\frac{2}{(x + 2)^3}$.' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Tính $y\' = -(x+2)^{-2} \\Rightarrow y\'\' = 2(x+2)^{-3} = \\frac{2}{(x+2)^3}$.'
  }
];

const b33P1B: CompactMC[] = [
  {
    prompt: 'Đạo hàm cấp hai của hàm số $y = x^5 - 2x^3 + 7x$ là:',
    options: [
      { id: 'A', text: '$y\'\' = 5x^4 - 6x^2 + 7$' },
      { id: 'B', text: '$y\'\' = 20x^3 - 12x$' },
      { id: 'C', text: '$y\'\' = 20x^3 - 6x$' },
      { id: 'D', text: '$y\'\' = 60x^2 - 12$' }
    ],
    correctOptionId: 'B',
    explanation: 'Ta có $y\' = 5x^4 - 6x^2 + 7 \\Rightarrow y\'\' = 20x^3 - 12x$.'
  },
  {
    prompt: 'Đạo hàm cấp hai của hàm số $y = \\sin 2x$ là:',
    options: [
      { id: 'A', text: '$y\'\' = 4\\sin 2x$' },
      { id: 'B', text: '$y\'\' = -4\\sin 2x$' },
      { id: 'C', text: '$y\'\' = -2\\sin 2x$' },
      { id: 'D', text: '$y\'\' = 2\\cos 2x$' }
    ],
    correctOptionId: 'B',
    explanation: 'Ta có $y\' = 2\\cos 2x \\Rightarrow y\'\' = -4\\sin 2x$.'
  },
  {
    prompt: 'Với $x > 0$, đạo hàm cấp hai của hàm số $y = \\sqrt{x}$ là:',
    options: [
      { id: 'A', text: '$y\'\' = -\\frac{1}{4x\\sqrt{x}}$' },
      { id: 'B', text: '$y\'\' = \\frac{1}{4x\\sqrt{x}}$' },
      { id: 'C', text: '$y\'\' = -\\frac{1}{2x\\sqrt{x}}$' },
      { id: 'D', text: '$y\'\' = \\frac{1}{2\\sqrt{x}}$' }
    ],
    correctOptionId: 'A',
    explanation: 'Ta có $y = x^{\\frac{1}{2}} \\Rightarrow y\' = \\frac{1}{2}x^{-\\frac{1}{2}} \\Rightarrow y\'\' = -\\frac{1}{4}x^{-\\frac{3}{2}} = -\\frac{1}{4x\\sqrt{x}}$.'
  },
  {
    prompt: 'Cho hàm số $f(x) = \\ln(2x + 1)$ với $x > -\\frac{1}{2}$. Giá trị của $f\'\'(0)$ bằng:',
    options: [
      { id: 'A', text: '$-4$' },
      { id: 'B', text: '$4$' },
      { id: 'C', text: '$-2$' },
      { id: 'D', text: '$2$' }
    ],
    correctOptionId: 'A',
    explanation: 'Ta có $f\'(x) = \\frac{2}{2x + 1} \\Rightarrow f\'\'(x) = -\\frac{4}{(2x + 1)^2}$. Khi đó $f\'\'(0) = -4$.'
  },
  {
    prompt: 'Đạo hàm cấp hai của hàm số $y = 2^x$ là:',
    options: [
      { id: 'A', text: '$y\'\' = 2^x \\ln 2$' },
      { id: 'B', text: '$y\'\' = 2^x (\\ln 2)^2$' },
      { id: 'C', text: '$y\'\' = 2^x \\ln 4$' },
      { id: 'D', text: '$y\'\' = x(x - 1)2^{x-2}$' }
    ],
    correctOptionId: 'B',
    explanation: 'Ta có $y\' = 2^x \\ln 2 \\Rightarrow y\'\' = (2^x)\' \\ln 2 = 2^x (\\ln 2)^2$.'
  },
  {
    prompt: 'Cho hàm số $f(x) = \\tan x$ với $x \\in \\left(-\\frac{\\pi}{2}; \\frac{\\pi}{2}\\right)$. Giá trị của $f\'\'\\left(\\frac{\\pi}{4}\\right)$ bằng:',
    options: [
      { id: 'A', text: '$4$' },
      { id: 'B', text: '$2$' },
      { id: 'C', text: '$1$' },
      { id: 'D', text: '$-4$' }
    ],
    correctOptionId: 'A',
    explanation: 'Ta có $f\'(x) = \\frac{1}{\\cos^2 x} = 1 + \\tan^2 x \\Rightarrow f\'\'(x) = 2\\tan x \\cdot \\frac{1}{\\cos^2 x}$. Tại $x = \\frac{\\pi}{4}$, $f\'\'\\left(\\frac{\\pi}{4}\\right) = 2 \\cdot 1 \\cdot 2 = 4$.'
  },
  {
    prompt: 'Tập nghiệm của bất phương trình $f\'\'(x) > 0$ với $f(x) = x^3 - 9x^2 + 15x - 3$ là:',
    options: [
      { id: 'A', text: '$(3; +\\infty)$' },
      { id: 'B', text: '$(-\\infty; 3)$' },
      { id: 'C', text: '$(1; 5)$' },
      { id: 'D', text: '$(-3; +\\infty)$' }
    ],
    correctOptionId: 'A',
    explanation: 'Ta có $f\'(x) = 3x^2 - 18x + 15 \\Rightarrow f\'\'(x) = 6x - 18 > 0 \\Leftrightarrow x > 3$.'
  },
  {
    prompt: 'Cho hàm số $y = e^{-x}$. Hệ thức nào sau đây là **đúng**?',
    options: [
      { id: 'A', text: '$y\' + y\'\' = 0$' },
      { id: 'B', text: '$y\' - y\'\' = 0$' },
      { id: 'C', text: '$y\'\' + y = 0$' },
      { id: 'D', text: '$y\'\' = -y$' }
    ],
    correctOptionId: 'A',
    explanation: 'Ta có $y\' = -e^{-x}$ và $y\'\' = e^{-x}$, do đó $y\' + y\'\' = -e^{-x} + e^{-x} = 0$.'
  },
  {
    prompt: 'Một chất điểm chuyển động thẳng với phương trình $s(t) = 2t^3 - 12t^2 + 30t$ ($t$ tính bằng giây, $s$ tính bằng mét). Thời điểm mà gia tốc tức thời của chất điểm bằng $0$ là:',
    options: [
      { id: 'A', text: '$t = 2$ giây' },
      { id: 'B', text: '$t = 1$ giây' },
      { id: 'C', text: '$t = 3$ giây' },
      { id: 'D', text: '$t = 4$ giây' }
    ],
    correctOptionId: 'A',
    explanation: 'Ta có $v(t) = 6t^2 - 24t + 30 \\Rightarrow a(t) = 12t - 24 = 0 \\Leftrightarrow t = 2$ (giây).'
  },
  {
    prompt: 'Một vật chuyển động thẳng đều theo phương trình $s(t) = 15t + 4$ ($s$ tính bằng mét, $t$ tính bằng giây). Gia tốc tức thời của vật tại mọi thời điểm $t$ bằng:',
    options: [
      { id: 'A', text: '$0\\text{ m/s}^2$' },
      { id: 'B', text: '$15\\text{ m/s}^2$' },
      { id: 'C', text: '$4\\text{ m/s}^2$' },
      { id: 'D', text: '$19\\text{ m/s}^2$' }
    ],
    correctOptionId: 'A',
    explanation: 'Ta có $v(t) = s\'(t) = 15$ (hằng số) $\\Rightarrow a(t) = s\'\'(t) = 0\\text{ (m/s}^2)$.'
  },
  {
    prompt: 'Cho hàm số $f(x) = \\cos^2 x$. Đạo hàm cấp hai $f\'\'(x)$ của hàm số bằng:',
    options: [
      { id: 'A', text: '$-2\\cos 2x$' },
      { id: 'B', text: '$2\\cos 2x$' },
      { id: 'C', text: '$-\\sin 2x$' },
      { id: 'D', text: '$-4\\cos 2x$' }
    ],
    correctOptionId: 'A',
    explanation: 'Ta có $f\'(x) = -2\\cos x \\sin x = -\\sin 2x \\Rightarrow f\'\'(x) = -2\\cos 2x$.'
  },
  {
    prompt: 'Cho hàm số $f(x) = x \\ln x$ ($x > 0$). Giá trị của $f\'\'(2)$ bằng:',
    options: [
      { id: 'A', text: '$\\frac{1}{2}$' },
      { id: 'B', text: '$\\ln 2$' },
      { id: 'C', text: '$\\frac{1}{4}$' },
      { id: 'D', text: '$2$' }
    ],
    correctOptionId: 'A',
    explanation: 'Ta có $f\'(x) = \\ln x + 1 \\Rightarrow f\'\'(x) = \\frac{1}{x} \\Rightarrow f\'\'(2) = \\frac{1}{2}$.'
  }
];

const b33P2B: CompactTF[] = [
  {
    stem: 'Cho hàm số $f(x) = e^{2x} - 4x^2 + 3x$. Xét tính đúng sai của các mệnh đề sau:',
    statements: [
      {
        id: 'a',
        text: 'Đạo hàm cấp một của hàm số là $f\'(x) = 2e^{2x} - 8x + 3$.',
        isTrue: true,
        explanation: 'Đúng vì $(e^{2x})\' = 2e^{2x}$, $(-4x^2)\' = -8x$ và $(3x)\' = 3$.'
      },
      {
        id: 'b',
        text: 'Đạo hàm cấp hai của hàm số là $f\'\'(x) = 4e^{2x} - 8$.',
        isTrue: true,
        explanation: 'Đúng vì $f\'\'(x) = (2e^{2x} - 8x + 3)\' = 4e^{2x} - 8$.'
      },
      {
        id: 'c',
        text: 'Giá trị của $f\'\'(0)$ bằng $-4$.',
        isTrue: true,
        explanation: 'Đúng vì $f\'\'(0) = 4e^0 - 8 = 4 - 8 = -4$.'
      },
      {
        id: 'd',
        text: 'Phương trình $f\'\'(x) = 0$ vô nghiệm trên $\\mathbb{R}$.',
        isTrue: false,
        explanation: 'Sai vì $4e^{2x} - 8 = 0 \\Leftrightarrow e^{2x} = 2 \\Leftrightarrow x = \\frac{\\ln 2}{2}$.'
      }
    ]
  },
  {
    stem: 'Một con lắc lò xo dao động điều hoà theo phương ngang có phương trình li độ $x(t) = 4\\sin(2t)$ (với $x$ tính bằng cm và $t$ tính bằng giây). Xét tính đúng sai của các mệnh đề sau:',
    statements: [
      {
        id: 'a',
        text: 'Vận tốc tức thời của con lắc tại thời điểm $t$ là $v(t) = x\'(t) = 8\\cos(2t)\\text{ (cm/s)}$.',
        isTrue: true,
        explanation: 'Đúng vì $(4\\sin 2t)\' = 8\\cos 2t$.'
      },
      {
        id: 'b',
        text: 'Gia tốc tức thời của con lắc tại thời điểm $t$ là $a(t) = x\'\'(t) = -16\\sin(2t)\\text{ (cm/s}^2)$.',
        isTrue: true,
        explanation: 'Đúng vì $(8\\cos 2t)\' = -16\\sin 2t$.'
      },
      {
        id: 'c',
        text: 'Tại mọi thời điểm $t$, ta luôn có hệ thức $a(t) + 4x(t) = 0$.',
        isTrue: true,
        explanation: 'Đúng vì $a(t) = -16\\sin(2t) = -4 \\cdot 4\\sin(2t) = -4x(t) \\Leftrightarrow a(t) + 4x(t) = 0$.'
      },
      {
        id: 'd',
        text: 'Tại thời điểm $t = \\frac{\\pi}{4}$ giây, gia tốc tức thời của con lắc bằng $0$.',
        isTrue: false,
        explanation: 'Sai vì $a\\left(\\frac{\\pi}{4}\\right) = -16\\sin\\frac{\\pi}{2} = -16\\text{ cm/s}^2 \\ne 0$.'
      }
    ]
  }
];

const b33P3B: CompactSA[] = [
  {
    prompt: 'Cho hàm số $f(x) = x^4 - 4x^3 + 6x^2 - 5x + 1$. Tính giá trị của $f\'\'(2)$.',
    correctAnswer: '12',
    acceptedAnswers: ['12'],
    explanation: 'Ta có $f\'(x) = 4x^3 - 12x^2 + 12x - 5 \\Rightarrow f\'\'(x) = 12x^2 - 24x + 12$. Tại $x = 2$, $f\'\'(2) = 12 \\cdot 4 - 48 + 12 = 12$.'
  },
  {
    prompt: 'Cho hàm số $f(x) = \\frac{2}{x - 1}$. Tính giá trị của $f\'\'(2)$.',
    correctAnswer: '4',
    acceptedAnswers: ['4'],
    explanation: 'Ta có $f\'(x) = -\\frac{2}{(x - 1)^2} \\Rightarrow f\'\'(x) = \\frac{4}{(x - 1)^3}$. Thay $x = 2$, ta được $f\'\'(2) = 4$.'
  },
  {
    prompt: 'Tìm nghiệm của phương trình $f\'\'(x) = 0$ biết $f(x) = x^3 - 15x^2 + 20x - 8$.',
    correctAnswer: '5',
    acceptedAnswers: ['5'],
    explanation: 'Ta có $f\'(x) = 3x^2 - 30x + 20 \\Rightarrow f\'\'(x) = 6x - 30 = 0 \\Leftrightarrow x = 5$.'
  },
  {
    prompt: 'Một chất điểm chuyển động thẳng theo phương trình $s(t) = t^3 + 2t^2 - 7t + 1$ ($s$ tính bằng mét, $t$ tính bằng giây). Tính gia tốc tức thời (đơn vị: $\\text{m/s}^2$) của chất điểm tại thời điểm $t = 4$ giây.',
    correctAnswer: '28',
    acceptedAnswers: ['28'],
    explanation: 'Ta có $v(t) = 3t^2 + 4t - 7 \\Rightarrow a(t) = s\'\'(t) = 6t + 4$. Tại $t = 4$, $a(4) = 6 \\cdot 4 + 4 = 28\\text{ (m/s}^2)$.'
  }
];

const b33P4B: CompactSO[] = [
  {
    prompt: 'Sắp xếp các bước tính đạo hàm cấp hai của hàm số $y = \\ln(x^2 + 1)$:',
    steps: [
      { id: '1', text: 'Tính đạo hàm cấp một bằng công thức $(\\ln u)\' = \\frac{u\'}{u}$: $y\' = \\frac{2x}{x^2 + 1}$.' },
      { id: '2', text: 'Áp dụng quy tắc đạo hàm của một thương cho $y\'$: $y\'\' = \\frac{(2x)\'(x^2 + 1) - 2x(x^2 + 1)\'}{(x^2 + 1)^2}$.' },
      { id: '3', text: 'Tính các đạo hàm ở tử số: $y\'\' = \\frac{2(x^2 + 1) - 2x \\cdot 2x}{(x^2 + 1)^2}$.' },
      { id: '4', text: 'Thu gọn tử số: $y\'\' = \\frac{2 - 2x^2}{(x^2 + 1)^2}$.' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Tính $y\' = \\frac{2x}{x^2+1}$, sau đó dùng quy tắc thương được $y\'\' = \\frac{2 - 2x^2}{(x^2+1)^2}$.'
  },
  {
    prompt: 'Sắp xếp các bước giải phương trình $f\'\'(x) = f\'(x)$ với hàm số $f(x) = e^{2x} - 3x$:',
    steps: [
      { id: '1', text: 'Tính đạo hàm cấp một: $f\'(x) = 2e^{2x} - 3$.' },
      { id: '2', text: 'Tính đạo hàm cấp hai: $f\'\'(x) = 4e^{2x}$.' },
      { id: '3', text: 'Thiết lập phương trình: $4e^{2x} = 2e^{2x} - 3 \\Leftrightarrow 2e^{2x} = -3$.' },
      { id: '4', text: 'Vì $2e^{2x} > 0, \\forall x \\in \\mathbb{R}$ còn $-3 < 0$ nên kết luận phương trình vô nghiệm.' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Tính $f\'(x) = 2e^{2x} - 3, f\'\'(x) = 4e^{2x}$, phương trình $2e^{2x} = -3$ vô nghiệm.'
  },
  {
    prompt: 'Sắp xếp các bước chứng minh $y\'\' + y = 0$ với hàm số $y = A\\cos x + B\\sin x$ ($A, B$ là hằng số):',
    steps: [
      { id: '1', text: 'Tính đạo hàm cấp một: $y\' = -A\\sin x + B\\cos x$.' },
      { id: '2', text: 'Tính đạo hàm cấp hai: $y\'\' = -A\\cos x - B\\sin x$.' },
      { id: '3', text: 'Đặt dấu trừ ra ngoài ở biểu thức $y\'\'$: $y\'\' = -(A\\cos x + B\\sin x) = -y$.' },
      { id: '4', text: 'Chuyển vế suy ra $y\'\' + y = 0$ với mọi $x \\in \\mathbb{R}$.' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Tính $y\'$ và $y\'\' = -(A\\cos x + B\\sin x) = -y \\Leftrightarrow y\'\' + y = 0$.'
  },
  {
    prompt: 'Sắp xếp các bước tính gia tốc của chất điểm tại thời điểm vận tốc bằng $12\\text{ m/s}$ biết $s(t) = t^3 + 3t$ ($t \\ge 0$):',
    steps: [
      { id: '1', text: 'Tính vận tốc tức thời: $v(t) = s\'(t) = 3t^2 + 3$; và gia tốc tức thời: $a(t) = s\'\'(t) = 6t$.' },
      { id: '2', text: 'Cho vận tốc bằng $12\\text{ m/s}$: $3t^2 + 3 = 12 \\Leftrightarrow t^2 = 3$.' },
      { id: '3', text: 'Vì thời gian $t \\ge 0$ nên chọn $t = \\sqrt{3}$ (giây).' },
      { id: '4', text: 'Thay $t = \\sqrt{3}$ vào công thức gia tốc: $a(\\sqrt{3}) = 6\\sqrt{3}\\text{ (m/s}^2)$. ' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Giải $v(t) = 3t^2 + 3 = 12 \\Rightarrow t = \\sqrt{3}$, suy ra $a(\\sqrt{3}) = 6\\sqrt{3}\\text{ m/s}^2$.'
  }
];

// ============================================================================
// ÔN TẬP CHƯƠNG IX. ĐẠO HÀM
// Tổng hợp toàn chương IX (Bài 31, Bài 32, Bài 33)
// ============================================================================

const ch9RevP1A: CompactMC[] = [
  b31P1A[4], b31P1A[6], b31P1A[9], b31P1A[11],
  b32P1A[4], b32P1A[6], b32P1A[9], b32P1A[10],
  b33P1A[2], b33P1A[4], b33P1A[9], b33P1A[11]
];

const ch9RevP1B: CompactMC[] = [
  b31P1B[4], b31P1B[6], b31P1B[7], b31P1B[9],
  b32P1B[1], b32P1B[5], b32P1B[6], b32P1B[9],
  b33P1B[3], b33P1B[5], b33P1B[8], b33P1B[10]
];

const ch9RevP2A: CompactTF[] = [b31P2A[0], b32P2A[0]];
const ch9RevP2B: CompactTF[] = [b32P2B[0], b33P2A[1]];
const ch9RevP3A: CompactSA[] = [b31P3A[1], b32P3A[0], b32P3A[3], b33P3A[2]];
const ch9RevP3B: CompactSA[] = [b31P3B[3], b32P3B[0], b32P3B[2], b33P3B[3]];
const ch9RevP4A: CompactSO[] = [b31P4A[1], b32P4A[0], b32P4A[2], b33P4A[1]];
const ch9RevP4B: CompactSO[] = [b31P4B[0], b32P4B[2], b33P4B[0], b33P4B[2]];

export const chapter9LessonExams: Record<string, ExamSet[]> = {
  'bai-31': [
    buildCompactLessonExamSet(
      'bai-31-de-1',
      'Đề ôn Bài 31 – Đề số 01',
      'Bài 31. Định nghĩa và ý nghĩa của đạo hàm',
      1,
      b31P1A, b31P2A, b31P3A, b31P4A
    ),
    buildCompactLessonExamSet(
      'bai-31-de-2',
      'Đề ôn Bài 31 – Đề số 02',
      'Bài 31. Định nghĩa và ý nghĩa của đạo hàm',
      2,
      b31P1B, b31P2B, b31P3B, b31P4B
    )
  ],
  'bai-32': [
    buildCompactLessonExamSet(
      'bai-32-de-1',
      'Đề ôn Bài 32 – Đề số 01',
      'Bài 32. Các quy tắc tính đạo hàm',
      1,
      b32P1A, b32P2A, b32P3A, b32P4A
    ),
    buildCompactLessonExamSet(
      'bai-32-de-2',
      'Đề ôn Bài 32 – Đề số 02',
      'Bài 32. Các quy tắc tính đạo hàm',
      2,
      b32P1B, b32P2B, b32P3B, b32P4B
    )
  ],
  'bai-33': [
    buildCompactLessonExamSet(
      'bai-33-de-1',
      'Đề ôn Bài 33 – Đề số 01',
      'Bài 33. Đạo hàm cấp hai',
      1,
      b33P1A, b33P2A, b33P3A, b33P4A
    ),
    buildCompactLessonExamSet(
      'bai-33-de-2',
      'Đề ôn Bài 33 – Đề số 02',
      'Bài 33. Đạo hàm cấp hai',
      2,
      b33P1B, b33P2B, b33P3B, b33P4B
    )
  ],
  'on-tap-chuong-9': [
    buildCompactLessonExamSet(
      'on-tap-chuong-9-de-1',
      'Đề ôn Chương IX – Đề số 01',
      'Ôn tập chương IX. Đạo hàm',
      1,
      ch9RevP1A, ch9RevP2A, ch9RevP3A, ch9RevP4A
    ),
    buildCompactLessonExamSet(
      'on-tap-chuong-9-de-2',
      'Đề ôn Chương IX – Đề số 02',
      'Ôn tập chương IX. Đạo hàm',
      2,
      ch9RevP1B, ch9RevP2B, ch9RevP3B, ch9RevP4B
    )
  ]
};
