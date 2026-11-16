import { ExamSet } from '../../types/exam';
import {
  CompactMC,
  CompactTF,
  CompactSA,
  CompactSO,
  buildCompactLessonExamSet
} from './chapter4';

// ============================================================================
// HÌNH VẼ SƠ ĐỒ VENN CHUẨN TIKZ CHO CHƯƠNG VIII (XÁC SUẤT)
// ============================================================================
const TIKZ_VENN_INTERSECT = `\\begin{tikzpicture}[line join=round, line cap=round, scale=0.88]
  \\draw[thick] (-2.8,-1.8) rectangle (2.8,1.8);
  \\node[above left] at (2.75,-1.75) {$\\Omega$};
  \\fill[blue!12] (-0.75,0) circle (1.25);
  \\fill[red!12] (0.75,0) circle (1.25);
  \\begin{scope}
    \\clip (-0.75,0) circle (1.25);
    \\fill[purple!28] (0.75,0) circle (1.25);
  \\end{scope}
  \\draw[very thick, blue] (-0.75,0) circle (1.25);
  \\draw[very thick, red] (0.75,0) circle (1.25);
  \\node[blue] at (-1.35,0) {$A$};
  \\node[red] at (1.35,0) {$B$};
  \\node at (0,0) {$A \\cap B$};
\\end{tikzpicture}`;

const TIKZ_VENN_DISJOINT = `\\begin{tikzpicture}[line join=round, line cap=round, scale=0.88]
  \\draw[thick] (-3.1,-1.7) rectangle (3.1,1.7);
  \\node[above left] at (3.05,-1.65) {$\\Omega$};
  \\fill[blue!12] (-1.35,0) circle (1.05);
  \\fill[red!12] (1.35,0) circle (1.05);
  \\draw[very thick, blue] (-1.35,0) circle (1.05);
  \\draw[very thick, red] (1.35,0) circle (1.05);
  \\node[blue] at (-1.35,0) {$A$};
  \\node[red] at (1.35,0) {$B$};
\\end{tikzpicture}`;

// ============================================================================
// BÀI 28. BIẾN CỐ HỢP, BIẾN CỐ GIAO, BIẾN CỐ ĐỘC LẬP
// Trọng tâm: Khái niệm biến cố hợp A U B ("A hoặc B xảy ra"), biến cố giao
// AB = A ∩ B ("Cả A và B cùng xảy ra"), hai biến cố độc lập và tính chất.
// ============================================================================

const b28P1A: CompactMC[] = [
  {
    prompt: 'Cho hai biến cố $A$ và $B$ cùng liên quan đến một phép thử. Biến cố "Có ít nhất một trong hai biến cố $A$ hoặc $B$ xảy ra" được gọi là:',
    options: [
      { id: 'A', text: 'Biến cố giao của $A$ và $B$, kí hiệu $AB$' },
      { id: 'B', text: 'Biến cố hợp của $A$ và $B$, kí hiệu $A \\cup B$' },
      { id: 'C', text: 'Biến cố đối của $A$, kí hiệu $\\overline{A}$' },
      { id: 'D', text: 'Hai biến cố xung khắc' }
    ],
    correctOptionId: 'B',
    explanation: 'Biến cố "$A$ hoặc $B$ xảy ra" (có ít nhất một trong hai biến cố xảy ra) là biến cố hợp của $A$ và $B$, kí hiệu $A \\cup B$.'
  },
  {
    prompt: 'Cho hai biến cố $A$ và $B$ cùng liên quan đến một phép thử. Biến cố "Cả hai biến cố $A$ và $B$ đều xảy ra" được gọi là:',
    options: [
      { id: 'A', text: 'Biến cố hợp $A \\cup B$' },
      { id: 'B', text: 'Biến cố giao $A \\cap B$ (hoặc $AB$)' },
      { id: 'C', text: 'Biến cố đối $\\overline{A}$' },
      { id: 'D', text: 'Biến cố chắc chắn $\\Omega$' }
    ],
    correctOptionId: 'B',
    explanation: 'Biến cố "Cả $A$ và $B$ đều xảy ra" là biến cố giao của $A$ và $B$, kí hiệu $A \\cap B$ hoặc $AB$.',
    tikzType: 'custom',
    tikzCode: TIKZ_VENN_INTERSECT
  },
  {
    prompt: 'Gieo một con xúc xắc cân đối và đồng chất một lần. Gọi $A$ là biến cố "Số chấm xuất hiện là số chẵn" và $B$ là biến cố "Số chấm xuất hiện lớn hơn $3$". Tập hợp các kết quả thuận lợi cho biến cố hợp $A \\cup B$ là:',
    options: [
      { id: 'A', text: '$\\{4; 6\\}$' },
      { id: 'B', text: '$\\{2; 4; 5; 6\\}$' },
      { id: 'C', text: '$\\{2; 3; 4; 5; 6\\}$' },
      { id: 'D', text: '$\\{2; 4; 6\\}$' }
    ],
    correctOptionId: 'B',
    explanation: 'Ta có $A = \\{2; 4; 6\\}$ và $B = \\{4; 5; 6\\}$. Khi đó $A \\cup B = \\{2; 4; 5; 6\\}$.'
  },
  {
    prompt: 'Với cùng phép thử ở câu trên ($A = \\{2; 4; 6\\}$ và $B = \\{4; 5; 6\\}$), tập hợp các kết quả thuận lợi cho biến cố giao $AB$ là:',
    options: [
      { id: 'A', text: '$\\{4; 6\\}$' },
      { id: 'B', text: '$\\{2; 4; 5; 6\\}$' },
      { id: 'C', text: '$\\{5\\}$' },
      { id: 'D', text: '$\\{2\\}$' }
    ],
    correctOptionId: 'A',
    explanation: 'Ta có $AB = A \\cap B = \\{2; 4; 6\\} \\cap \\{4; 5; 6\\} = \\{4; 6\\}$.'
  },
  {
    prompt: 'Chọn ngẫu nhiên một số tự nhiên từ tập hợp $\\{1; 2; 3; 4; 5; 6; 7; 8; 9; 10\\}$. Gọi $A$ là biến cố "Số được chọn chia hết cho $3$" và $B$ là biến cố "Số được chọn là số nguyên tố". Số kết quả thuận lợi cho biến cố giao $AB$ là:',
    options: [
      { id: 'A', text: '$0$' },
      { id: 'B', text: '$1$' },
      { id: 'C', text: '$2$' },
      { id: 'D', text: '$3$' }
    ],
    correctOptionId: 'B',
    explanation: 'Ta có $A = \\{3; 6; 9\\}$ và $B = \\{2; 3; 5; 7\\}$. Khi đó $AB = A \\cap B = \\{3\\}$, có đúng $1$ kết quả thuận lợi.'
  },
  {
    prompt: 'Hai biến cố $A$ và $B$ được gọi là **độc lập** với nhau khi và chỉ khi:',
    options: [
      { id: 'A', text: '$A$ và $B$ không thể đồng thời xảy ra ($A \\cap B = \\varnothing$)' },
      { id: 'B', text: 'Việc xảy ra hay không xảy ra của biến cố này không làm ảnh hưởng tới xác suất xảy ra của biến cố kia' },
      { id: 'C', text: 'Nếu biến cố $A$ xảy ra thì biến cố $B$ chắc chắn xảy ra' },
      { id: 'D', text: '$A \\cup B = \\Omega$' }
    ],
    correctOptionId: 'B',
    explanation: 'Theo định nghĩa: Hai biến cố $A$ và $B$ độc lập nếu việc xảy ra hay không xảy ra của biến cố này không làm ảnh hưởng tới xác suất xảy ra của biến cố kia.'
  },
  {
    prompt: 'Nếu hai biến cố $A$ và $B$ độc lập với nhau thì khẳng định nào sau đây là **sai**?',
    options: [
      { id: 'A', text: '$A$ và $\\overline{B}$ độc lập với nhau' },
      { id: 'B', text: '$\\overline{A}$ và $B$ độc lập với nhau' },
      { id: 'C', text: '$\\overline{A}$ và $\\overline{B}$ độc lập với nhau' },
      { id: 'D', text: '$A$ và $\\overline{A}$ độc lập với nhau' }
    ],
    correctOptionId: 'D',
    explanation: 'Nếu $A$ và $B$ độc lập thì các cặp $(A, \\overline{B}), (\\overline{A}, B), (\\overline{A}, \\overline{B})$ cũng độc lập. Còn $A$ và $\\overline{A}$ là hai biến cố đối nhau, không độc lập (khi $0 < P(A) < 1$).'
  },
  {
    prompt: 'Hai xạ thủ An và Bình độc lập với nhau cùng bắn vào một bia (mỗi người bắn $1$ viên đạn). Gọi $A$ là biến cố "An bắn trúng bia", $B$ là biến cố "Bình bắn trúng bia". Biến cố "Chỉ có đúng một người bắn trúng bia" được biểu diễn là:',
    options: [
      { id: 'A', text: '$A \\cup B$' },
      { id: 'B', text: '$AB$' },
      { id: 'C', text: '$A\\overline{B} \\cup \\overline{A}B$' },
      { id: 'D', text: '$\\overline{A}\\,\\overline{B}$' }
    ],
    correctOptionId: 'C',
    explanation: '"Chỉ có đúng một người bắn trúng bia" nghĩa là "An trúng và Bình trượt" ($A\\overline{B}$) hoặc "An trượt và Bình trúng" ($\\overline{A}B$), nên biến cố đó là $A\\overline{B} \\cup \\overline{A}B$.'
  },
  {
    prompt: 'Với hai biến cố $A, B$ ở câu trên (An bắn trúng, Bình bắn trúng), biến cố $\\overline{A}\\,\\overline{B}$ có ý nghĩa là:',
    options: [
      { id: 'A', text: 'Cả hai người đều bắn trúng bia' },
      { id: 'B', text: 'Cả hai người đều bắn trượt bia' },
      { id: 'C', text: 'Có ít nhất một người bắn trượt bia' },
      { id: 'D', text: 'Có ít nhất một người bắn trúng bia' }
    ],
    correctOptionId: 'B',
    explanation: '$\\overline{A}$ là "An bắn trượt", $\\overline{B}$ là "Bình bắn trượt", nên $\\overline{A}\\,\\overline{B}$ là "Cả hai người đều bắn trượt bia".'
  },
  {
    prompt: 'Biến cố đối của biến cố hợp $A \\cup B$ ("Có ít nhất một trong hai biến cố $A, B$ xảy ra") là biến cố nào sau đây?',
    options: [
      { id: 'A', text: '$AB$' },
      { id: 'B', text: '$\\overline{A} \\cup \\overline{B}$' },
      { id: 'C', text: '$\\overline{A}\\,\\overline{B}$' },
      { id: 'D', text: '$A\\overline{B}$' }
    ],
    correctOptionId: 'C',
    explanation: 'Phủ định của "Có ít nhất một trong hai biến cố $A, B$ xảy ra" là "Cả hai biến cố $A, B$ đều không xảy ra", tức là $\\overline{A}\\,\\overline{B}$.'
  },
  {
    prompt: 'Một hộp có $5$ quả bóng màu xanh được đánh số từ $1$ đến $5$ và $4$ quả bóng màu đỏ được đánh số từ $1$ đến $4$. Lấy ngẫu nhiên $1$ quả bóng. Gọi $A$ là biến cố "Quả bóng lấy ra màu xanh" và $B$ là biến cố "Quả bóng lấy ra ghi số chẵn". Số kết quả thuận lợi cho biến cố $AB$ là:',
    options: [
      { id: 'A', text: '$2$' },
      { id: 'B', text: '$4$' },
      { id: 'C', text: '$5$' },
      { id: 'D', text: '$7$' }
    ],
    correctOptionId: 'A',
    explanation: 'Biến cố $AB$ là "Quả bóng lấy ra màu xanh và ghi số chẵn", gồm $2$ quả bóng xanh số $2$ và số $4$.'
  },
  {
    prompt: 'Trong các cặp biến cố sau, cặp biến cố nào là **hai biến cố độc lập**?',
    options: [
      { id: 'A', text: 'Rút $1$ lá bài từ bộ bài $52$ lá: $A$ là "Rút được lá Át", $B$ là "Rút được lá K"' },
      { id: 'B', text: 'Tung một đồng xu cân đối $2$ lần liên tiếp: $A$ là "Lần $1$ xuất hiện mặt sấp", $B$ là "Lần $2$ xuất hiện mặt ngửa"' },
      { id: 'C', text: 'Lấy không hoàn lại $2$ viên bi liên tiếp từ hộp: $A$ là "Lần $1$ lấy được bi đỏ", $B$ là "Lần $2$ lấy được bi đỏ"' },
      { id: 'D', text: 'Gieo $1$ con xúc xắc: $A$ là "Số chấm chẵn", $B$ là "Số chấm lẻ"' }
    ],
    correctOptionId: 'B',
    explanation: 'Kết quả của lần tung đồng xu thứ nhất không ảnh hưởng đến xác suất của lần tung thứ hai, nên $A$ và $B$ độc lập.'
  }
];

const b28P2A: CompactTF[] = [
  {
    stem: 'Chọn ngẫu nhiên một số tự nhiên từ tập hợp $S = \\{1; 2; 3; \\dots; 12\\}$. Xét hai biến cố $A$: "Số được chọn chia hết cho $3$" và $B$: "Số được chọn chia hết cho $4$". Xét tính đúng sai của các mệnh đề sau:',
    statements: [
      {
        id: 'a',
        text: 'Tập hợp các kết quả thuận lợi của biến cố $A$ là $\\{3; 6; 9; 12\\}$ và của biến cố $B$ là $\\{4; 8; 12\\}$.',
        isTrue: true,
        explanation: 'Đúng vì trong $S$, các bội của $3$ là $3, 6, 9, 12$ và các bội của $4$ là $4, 8, 12$.'
      },
      {
        id: 'b',
        text: 'Biến cố giao $AB$ là "Số được chọn chia hết cho $12$" và chỉ có $1$ kết quả thuận lợi là $12$.',
        isTrue: true,
        explanation: 'Đúng vì $AB = A \\cap B = \\{12\\}$.'
      },
      {
        id: 'c',
        text: 'Số kết quả thuận lợi cho biến cố hợp $A \\cup B$ bằng $7$.',
        isTrue: false,
        explanation: 'Sai vì $A \\cup B = \\{3; 4; 6; 8; 9; 12\\}$ có $6$ kết quả thuận lợi.'
      },
      {
        id: 'd',
        text: 'Biến cố $A\\overline{B}$ có $3$ kết quả thuận lợi là $\\{3; 6; 9\\}$.',
        isTrue: true,
        explanation: 'Đúng vì $A\\overline{B} = A \\setminus B = \\{3; 6; 9\\}$ gồm $3$ phần tử.'
      }
    ]
  },
  {
    stem: 'Một hệ thống điện gồm hai mạch nhánh hoạt động độc lập là mạch I và mạch II. Gọi $E_1$ là biến cố "Mạch I hoạt động tốt" và $E_2$ là biến cố "Mạch II hoạt động tốt". Xét tính đúng sai của các mệnh đề sau:',
    statements: [
      {
        id: 'a',
        text: 'Hai biến cố $E_1$ và $E_2$ là hai biến cố độc lập.',
        isTrue: true,
        explanation: 'Đúng vì hai mạch nhánh hoạt động độc lập với nhau.'
      },
      {
        id: 'b',
        text: 'Biến cố "Cả hai mạch đều hoạt động tốt" là biến cố giao $E_1 E_2$.',
        isTrue: true,
        explanation: 'Đúng theo định nghĩa biến cố giao.'
      },
      {
        id: 'c',
        text: 'Biến cố "Có ít nhất một mạch hoạt động tốt" là biến cố hợp $E_1 \\cup E_2$.',
        isTrue: true,
        explanation: 'Đúng theo định nghĩa biến cố hợp.'
      },
      {
        id: 'd',
        text: 'Hai biến cố $\\overline{E_1}$ ("Mạch I bị hỏng") và $E_2$ ("Mạch II hoạt động tốt") không độc lập với nhau.',
        isTrue: false,
        explanation: 'Sai vì khi $E_1, E_2$ độc lập thì $\\overline{E_1}$ và $E_2$ cũng độc lập với nhau.'
      }
    ]
  }
];

const b28P3A: CompactSA[] = [
  {
    prompt: 'Chọn ngẫu nhiên một số nguyên dương không vượt quá $20$. Gọi $A$ là biến cố "Số được chọn chia hết cho $4$" và $B$ là biến cố "Số được chọn chia hết cho $6$". Có bao nhiêu kết quả thuận lợi cho biến cố hợp $A \\cup B$?',
    correctAnswer: '7',
    acceptedAnswers: ['7'],
    explanation: 'Ta có $A = \\{4; 8; 12; 16; 20\\}$ ($5$ phần tử) và $B = \\{6; 12; 18\\}$ ($3$ phần tử), với $A \\cap B = \\{12\\}$ ($1$ phần tử). Vậy $n(A \\cup B) = 5 + 3 - 1 = 7$.'
  },
  {
    prompt: 'Từ một hộp chứa $4$ viên bi đỏ và $3$ viên bi xanh, lấy ngẫu nhiên đồng thời $2$ viên bi. Gọi $A$ là biến cố "Hai viên bi lấy ra cùng màu đỏ" và $B$ là biến cố "Hai viên bi lấy ra cùng màu xanh". Tính số kết quả thuận lợi cho biến cố hợp $A \\cup B$ ("Hai viên bi lấy ra cùng màu").',
    correctAnswer: '9',
    acceptedAnswers: ['9'],
    explanation: 'Số cách lấy $2$ bi đỏ là $C_4^2 = 6$, số cách lấy $2$ bi xanh là $C_3^2 = 3$. Vì $A \\cap B = \\varnothing$ nên số kết quả thuận lợi của $A \\cup B$ là $6 + 3 = 9$.'
  },
  {
    prompt: 'Gieo đồng thời hai con xúc xắc cân đối và đồng chất. Gọi $A$ là biến cố "Con xúc xắc thứ nhất xuất hiện mặt $6$ chấm" và $B$ là biến cố "Tổng số chấm trên hai con xúc xắc bằng $8$". Có bao nhiêu kết quả thuận lợi cho biến cố giao $AB$?',
    correctAnswer: '1',
    acceptedAnswers: ['1'],
    explanation: 'Biến cố $AB$ xảy ra khi con thứ nhất ra $6$ chấm và tổng bằng $8$, tức là kết quả duy nhất $(6; 2)$.'
  },
  {
    prompt: 'Chọn ngẫu nhiên một thẻ từ hộp gồm $15$ thẻ đánh số từ $1$ đến $15$. Gọi $A$ là biến cố "Số trên thẻ là số lẻ" và $B$ là biến cố "Số trên thẻ lớn hơn $9$". Có bao nhiêu kết quả thuận lợi cho biến cố giao $AB$?',
    correctAnswer: '3',
    acceptedAnswers: ['3'],
    explanation: 'Biến cố $AB$ gồm các số lẻ lớn hơn $9$ và không vượt quá $15$, đó là $\\{11; 13; 15\\}$, có $3$ kết quả thuận lợi.'
  }
];

const b28P4A: CompactSO[] = [
  {
    prompt: 'Sắp xếp các bước tìm số phần tử của biến cố hợp $A \\cup B$ khi chọn ngẫu nhiên $1$ số từ $\\{1; 2; \\dots; 15\\}$ với $A$: "Chia hết cho $3$" và $B$: "Chia hết cho $5$":',
    steps: [
      { id: '1', text: 'Liệt kê các phần tử của biến cố $A$: $A = \\{3; 6; 9; 12; 15\\}$ gồm $5$ phần tử.' },
      { id: '2', text: 'Liệt kê các phần tử của biến cố $B$: $B = \\{5; 10; 15\\}$ gồm $3$ phần tử.' },
      { id: '3', text: 'Tìm giao của hai tập hợp: $A \\cap B = \\{15\\}$ gồm $1$ phần tử.' },
      { id: '4', text: 'Kết luận $A \\cup B = \\{3; 5; 6; 9; 10; 12; 15\\}$ có $5 + 3 - 1 = 7$ phần tử.' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Liệt kê $A, B$, tìm $A \\cap B$ và suy ra $n(A \\cup B) = 7$.'
  },
  {
    prompt: 'Sắp xếp các bước biểu diễn biến cố $C$: "Có ít nhất một động cơ hoạt động" và biến cố $D$: "Cả hai động cơ đều ngừng hoạt động" theo $A$ ("Động cơ I hoạt động") và $B$ ("Động cơ II hoạt động"):',
    steps: [
      { id: '1', text: 'Xác định các biến cố đối: $\\overline{A}$ là "Động cơ I ngừng hoạt động" và $\\overline{B}$ là "Động cơ II ngừng hoạt động".' },
      { id: '2', text: 'Biến cố $C$ ("Có ít nhất một động cơ hoạt động") xảy ra khi $A$ hoặc $B$ xảy ra, nên $C = A \\cup B$.' },
      { id: '3', text: 'Biến cố $D$ ("Cả hai động cơ đều ngừng hoạt động") xảy ra khi cả $\\overline{A}$ và $\\overline{B}$ cùng xảy ra, nên $D = \\overline{A}\\,\\overline{B}$.' },
      { id: '4', text: 'Nhận xét $C$ và $D$ là hai biến cố đối nhau: $\\overline{C} = \\overline{A \\cup B} = \\overline{A}\\,\\overline{B} = D$.' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Biểu diễn $C = A \\cup B$, $D = \\overline{A}\\,\\overline{B}$ và chỉ ra quan hệ đối nhau.'
  },
  {
    prompt: 'Sắp xếp các bước phân tích biến cố $E$: "Có đúng một học sinh giải được bài toán" theo $A$ ("Học sinh thứ nhất giải được") và $B$ ("Học sinh thứ hai giải được"):',
    steps: [
      { id: '1', text: 'Xét trường hợp 1: Học sinh thứ nhất giải được và học sinh thứ hai không giải được, tương ứng biến cố giao $A\\overline{B}$.' },
      { id: '2', text: 'Xét trường hợp 2: Học sinh thứ nhất không giải được và học sinh thứ hai giải được, tương ứng biến cố giao $\\overline{A}B$.' },
      { id: '3', text: 'Biến cố $E$ xảy ra khi trường hợp 1 hoặc trường hợp 2 xảy ra.' },
      { id: '4', text: 'Kết luận $E = A\\overline{B} \\cup \\overline{A}B$.' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Tách thành hai trường hợp xung khắc $A\\overline{B}$ và $\\overline{A}B$, hợp lại được $E = A\\overline{B} \\cup \\overline{A}B$.'
  },
  {
    prompt: 'Sắp xếp các bước xét tính độc lập của hai biến cố $A$ và $B$ khi gieo hai con xúc xắc cân đối độc lập:',
    steps: [
      { id: '1', text: 'Gọi $A$ là biến cố "Xúc xắc I ra mặt chẵn" và $B$ là biến cố "Xúc xắc II ra mặt $6$ chấm".' },
      { id: '2', text: 'Nhận xét kết quả gieo của con xúc xắc I hoàn toàn phụ thuộc vào lần gieo thứ nhất, có xác suất $P(A) = \\frac{1}{2}$.' },
      { id: '3', text: 'Dù $A$ có xảy ra hay không thì xác suất con xúc xắc II ra mặt $6$ chấm vẫn luôn bằng $P(B) = \\frac{1}{6}$.' },
      { id: '4', text: 'Kết luận hai biến cố $A$ và $B$ là hai biến cố độc lập.' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Hai phép thử độc lập dẫn tới hai biến cố gắn riêng với từng phép thử là độc lập.'
  }
];

const b28P1B: CompactMC[] = [
  {
    prompt: 'Cho hai biến cố $A$ và $B$. Biến cố $A\\overline{B}$ được phát biểu bằng lời là:',
    options: [
      { id: 'A', text: 'Cả $A$ và $B$ đều xảy ra' },
      { id: 'B', text: 'Biến cố $A$ xảy ra và biến cố $B$ không xảy ra' },
      { id: 'C', text: 'Biến cố $A$ không xảy ra hoặc biến cố $B$ xảy ra' },
      { id: 'D', text: 'Cả $A$ và $B$ đều không xảy ra' }
    ],
    correctOptionId: 'B',
    explanation: '$A\\overline{B} = A \\cap \\overline{B}$ nghĩa là biến cố $A$ xảy ra đồng thời biến cố $\\overline{B}$ xảy ra (tức $B$ không xảy ra).'
  },
  {
    prompt: 'Gieo một đồng xu cân đối $2$ lần liên tiếp. Gọi $A$ là biến cố "Lần đầu xuất hiện mặt Sấp (S)" và $B$ là biến cố "Lần thứ hai xuất hiện mặt Sấp (S)". Tập hợp các kết quả thuận lợi của biến cố hợp $A \\cup B$ là:',
    options: [
      { id: 'A', text: '$\\{\\text{SS}\\}$' },
      { id: 'B', text: '$\\{\\text{SS}; \\text{SN}; \\text{NS}\\}$' },
      { id: 'C', text: '$\\{\\text{SN}; \\text{NS}\\}$' },
      { id: 'D', text: '$\\{\\text{SS}; \\text{NN}\\}$' }
    ],
    correctOptionId: 'B',
    explanation: 'Ta có $A = \\{\\text{SS}; \\text{SN}\\}$ và $B = \\{\\text{SS}; \\text{NS}\\}$, nên $A \\cup B = \\{\\text{SS}; \\text{SN}; \\text{NS}\\}$.'
  },
  {
    prompt: 'Một hộp có $10$ tấm thẻ được đánh số từ $1$ đến $10$. Rút ngẫu nhiên $1$ tấm thẻ. Gọi $A$ là biến cố "Số trên thẻ nhỏ hơn $5$" và $B$ là biến cố "Số trên thẻ là số chẵn". Tập hợp mô tả biến cố giao $AB$ là:',
    options: [
      { id: 'A', text: '$\\{2; 4\\}$' },
      { id: 'B', text: '$\\{2; 4; 6\\}$' },
      { id: 'C', text: '$\\{1; 2; 3; 4; 6; 8; 10\\}$' },
      { id: 'D', text: '$\\{1; 3\\}$' }
    ],
    correctOptionId: 'A',
    explanation: 'Ta có $A = \\{1; 2; 3; 4\\}$ và $B = \\{2; 4; 6; 8; 10\\}$. Do đó $AB = A \\cap B = \\{2; 4\\}$.'
  },
  {
    prompt: 'Ba xạ thủ độc lập cùng bắn vào một mục tiêu (mỗi người bắn $1$ viên). Gọi $A_i$ là biến cố "Xạ thủ thứ $i$ bắn trúng mục tiêu" ($i = 1, 2, 3$). Biến cố "Cả ba xạ thủ đều bắn trúng mục tiêu" là:',
    options: [
      { id: 'A', text: '$A_1 \\cup A_2 \\cup A_3$' },
      { id: 'B', text: '$A_1 A_2 A_3$' },
      { id: 'C', text: '$\\overline{A_1}\\,\\overline{A_2}\\,\\overline{A_3}$' },
      { id: 'D', text: '$A_1 \\overline{A_2}\\,\\overline{A_3}$' }
    ],
    correctOptionId: 'B',
    explanation: '"Cả ba xạ thủ đều bắn trúng" là biến cố giao $A_1 \\cap A_2 \\cap A_3 = A_1 A_2 A_3$.'
  },
  {
    prompt: 'Với ba biến cố $A_1, A_2, A_3$ ở câu trên, biến cố "Có ít nhất một xạ thủ bắn trúng mục tiêu" được biểu diễn là:',
    options: [
      { id: 'A', text: '$A_1 A_2 A_3$' },
      { id: 'B', text: '$A_1 \\cup A_2 \\cup A_3$' },
      { id: 'C', text: '$\\overline{A_1} \\cup \\overline{A_2} \\cup \\overline{A_3}$' },
      { id: 'D', text: '$\\overline{A_1}\\,\\overline{A_2}\\,\\overline{A_3}$' }
    ],
    correctOptionId: 'B',
    explanation: '"Có ít nhất một xạ thủ bắn trúng" là biến cố hợp $A_1 \\cup A_2 \\cup A_3$.'
  },
  {
    prompt: 'Cho hai biến cố $A$ và $B$. Biểu thức $(A \\cap B) \\cup (A \\cap \\overline{B})$ sau khi rút gọn bằng biến cố nào?',
    options: [
      { id: 'A', text: '$B$' },
      { id: 'B', text: '$A$' },
      { id: 'C', text: '$A \\cup B$' },
      { id: 'D', text: '$\\Omega$' }
    ],
    correctOptionId: 'B',
    explanation: 'Ta có $(A \\cap B) \\cup (A \\cap \\overline{B}) = A \\cap (B \\cup \\overline{B}) = A \\cap \\Omega = A$.'
  },
  {
    prompt: 'Một lớp học có $25$ học sinh thích môn Toán, $20$ học sinh thích môn Vật lí và $10$ học sinh thích cả hai môn Toán và Vật lí. Chọn ngẫu nhiên $1$ học sinh trong lớp. Gọi $A$ là biến cố "Học sinh được chọn thích môn Toán", $B$ là biến cố "Học sinh được chọn thích môn Vật lí". Số kết quả thuận lợi cho biến cố $A \\cup B$ là:',
    options: [
      { id: 'A', text: '$45$' },
      { id: 'B', text: '$35$' },
      { id: 'C', text: '$15$' },
      { id: 'D', text: '$25$' }
    ],
    correctOptionId: 'B',
    explanation: 'Số học sinh thích ít nhất một trong hai môn là $n(A \\cup B) = n(A) + n(B) - n(AB) = 25 + 20 - 10 = 35$.',
    tikzType: 'custom',
    tikzCode: TIKZ_VENN_INTERSECT
  },
  {
    prompt: 'Hai bệnh nhân X và Y cùng được điều trị độc lập bằng một phương pháp mới. Gọi $A$ là biến cố "Bệnh nhân X khỏi bệnh" và $B$ là biến cố "Bệnh nhân Y khỏi bệnh". Biến cố "Bệnh nhân X khỏi bệnh nhưng bệnh nhân Y không khỏi bệnh" là:',
    options: [
      { id: 'A', text: '$\\overline{A}B$' },
      { id: 'B', text: '$A\\overline{B}$' },
      { id: 'C', text: '$AB$' },
      { id: 'D', text: '$A \\cup \\overline{B}$' }
    ],
    correctOptionId: 'B',
    explanation: 'X khỏi bệnh ($A$) và Y không khỏi bệnh ($\\overline{B}$) đồng thời xảy ra là biến cố giao $A\\overline{B}$.'
  },
  {
    prompt: 'Gieo một con xúc xắc cân đối một lần. Gọi $A$ là biến cố "Xuất hiện mặt có số chấm chia hết cho $2$" và $B$ là biến cố "Xuất hiện mặt có số chấm chia hết cho $3$". Hai biến cố $A$ và $B$ có độc lập không?',
    options: [
      { id: 'A', text: 'Có độc lập vì $P(AB) = P(A) \\cdot P(B)$' },
      { id: 'B', text: 'Không độc lập vì chúng xung khắc' },
      { id: 'C', text: 'Không độc lập vì cùng một con xúc xắc' },
      { id: 'D', text: 'Có độc lập vì $A \\cap B = \\varnothing$' }
    ],
    correctOptionId: 'A',
    explanation: 'Ta có $A = \\{2; 4; 6\\} \\Rightarrow P(A) = \\frac{3}{6} = \\frac{1}{2}$; $B = \\{3; 6\\} \\Rightarrow P(B) = \\frac{2}{6} = \\frac{1}{3}$; $AB = \\{6\\} \\Rightarrow P(AB) = \\frac{1}{6} = P(A)P(B)$. Khi $A$ xảy ra thì xác suất của $B$ vẫn là $\\frac{1}{3}$, nên $A$ và $B$ độc lập!'
  },
  {
    prompt: 'Từ một hộp chứa $3$ quả cầu trắng và $2$ quả cầu đen, lấy ngẫu nhiên đồng thời $2$ quả cầu. Gọi $A$ là biến cố "Có ít nhất $1$ quả cầu trắng" và $B$ là biến cố "Có ít nhất $1$ quả cầu đen". Biến cố giao $AB$ là:',
    options: [
      { id: 'A', text: 'Lấy được $2$ quả cầu trắng' },
      { id: 'B', text: 'Lấy được $2$ quả cầu đen' },
      { id: 'C', text: 'Lấy được $1$ quả cầu trắng và $1$ quả cầu đen' },
      { id: 'D', text: 'Lấy được $2$ quả cầu cùng màu' }
    ],
    correctOptionId: 'C',
    explanation: 'Khi lấy $2$ quả cầu, vừa có ít nhất $1$ quả trắng vừa có ít nhất $1$ quả đen nghĩa là lấy được đúng $1$ quả trắng và $1$ quả đen.'
  },
  {
    prompt: 'Trong câu trên (hộp có $3$ cầu trắng, $2$ cầu đen, lấy $2$ quả), số kết quả thuận lợi cho biến cố giao $AB$ ("$1$ quả trắng và $1$ quả đen") là:',
    options: [
      { id: 'A', text: '$5$' },
      { id: 'B', text: '$6$' },
      { id: 'C', text: '$10$' },
      { id: 'D', text: '$3$' }
    ],
    correctOptionId: 'B',
    explanation: 'Số cách chọn $1$ quả trắng từ $3$ quả và $1$ quả đen từ $2$ quả là $3 \\cdot 2 = 6$.'
  },
  {
    prompt: 'Cho hai biến cố $A$ và $B$ xung khắc ($A \\cap B = \\varnothing$) có $P(A) > 0$ và $P(B) > 0$. Khẳng định nào sau đây là **đúng**?',
    options: [
      { id: 'A', text: '$A$ và $B$ độc lập với nhau' },
      { id: 'B', text: '$A$ và $B$ không độc lập với nhau' },
      { id: 'C', text: '$A$ và $B$ là hai biến cố đối nhau' },
      { id: 'D', text: '$A \\cup B = \\Omega$' }
    ],
    correctOptionId: 'B',
    explanation: 'Vì $A \\cap B = \\varnothing$ nên nếu $A$ xảy ra thì $B$ chắc chắn không thể xảy ra (xác suất của $B$ giảm từ $P(B) > 0$ xuống $0$). Do đó $A$ và $B$ không độc lập.'
  }
];

const b28P2B: CompactTF[] = [
  {
    stem: 'Một hộp chứa $8$ tấm thẻ cùng loại được đánh số từ $1$ đến $8$. Lấy ngẫu nhiên $1$ tấm thẻ từ hộp. Gọi $A$ là biến cố "Số ghi trên thẻ là số chẵn" và $B$ là biến cố "Số ghi trên thẻ chia hết cho $3$". Xét tính đúng sai của các mệnh đề sau:',
    statements: [
      {
        id: 'a',
        text: 'Tập hợp mô tả biến cố $A$ là $\\{2; 4; 6; 8\\}$ và biến cố $B$ là $\\{3; 6\\}$.',
        isTrue: true,
        explanation: 'Đúng vì trong các số từ $1$ đến $8$, số chẵn là $2, 4, 6, 8$ và bội của $3$ là $3, 6$.'
      },
      {
        id: 'b',
        text: 'Biến cố giao $AB$ có duy nhất $1$ kết quả thuận lợi là thẻ số $6$.',
        isTrue: true,
        explanation: 'Đúng vì $AB = A \\cap B = \\{6\\}$.'
      },
      {
        id: 'c',
        text: 'Biến cố hợp $A \\cup B$ có $6$ kết quả thuận lợi.',
        isTrue: false,
        explanation: 'Sai vì $A \\cup B = \\{2; 3; 4; 6; 8\\}$ chỉ có $5$ kết quả thuận lợi.'
      },
      {
        id: 'd',
        text: 'Biến cố $\\overline{A}\\,\\overline{B}$ gồm các tấm thẻ mang số $\\{1; 5; 7\\}$.',
        isTrue: true,
        explanation: 'Đúng vì $\\overline{A}\\,\\overline{B} = \\Omega \\setminus (A \\cup B) = \\{1; 5; 7\\}$.'
      }
    ]
  },
  {
    stem: 'Hai vận động viên bắn cung X và Y độc lập với nhau, mỗi người bắn $1$ mũi tên vào bia. Gọi $A$ là biến cố "X bắn trúng tâm bia" và $B$ là biến cố "Y bắn trúng tâm bia". Xét tính đúng sai của các mệnh đề sau:',
    statements: [
      {
        id: 'a',
        text: 'Hai biến cố $\\overline{A}$ và $\\overline{B}$ là hai biến cố độc lập.',
        isTrue: true,
        explanation: 'Đúng vì $A$ và $B$ độc lập nên $\\overline{A}$ và $\\overline{B}$ cũng độc lập.'
      },
      {
        id: 'b',
        text: 'Biến cố $A \\cup B$ là biến cố "Cả hai vận động viên đều bắn trúng tâm bia".',
        isTrue: false,
        explanation: 'Sai vì $A \\cup B$ là biến cố "Có ít nhất một vận động viên bắn trúng tâm bia".'
      },
      {
        id: 'c',
        text: 'Hai biến cố $A\\overline{B}$ và $\\overline{A}B$ không thể đồng thời xảy ra.',
        isTrue: true,
        explanation: 'Đúng vì $(A\\overline{B}) \\cap (\\overline{A}B) = \\varnothing$.'
      },
      {
        id: 'd',
        text: 'Biến cố đối của biến cố $AB$ ("Cả hai cùng bắn trúng") là biến cố $\\overline{A} \\cup \\overline{B}$ ("Có ít nhất một người bắn trượt").',
        isTrue: true,
        explanation: 'Đúng theo quy tắc De Morgan: $\\overline{A \\cap B} = \\overline{A} \\cup \\overline{B}$.'
      }
    ]
  }
];

const b28P3B: CompactSA[] = [
  {
    prompt: 'Chọn ngẫu nhiên một số tự nhiên từ $1$ đến $30$. Gọi $A$ là biến cố "Số được chọn chia hết cho $5$" và $B$ là biến cố "Số được chọn chia hết cho $10$". Tính số kết quả thuận lợi cho biến cố hợp $A \\cup B$.',
    correctAnswer: '6',
    acceptedAnswers: ['6'],
    explanation: 'Vì mọi số chia hết cho $10$ đều chia hết cho $5$ nên $B \\subset A \\Rightarrow A \\cup B = A = \\{5; 10; 15; 20; 25; 30\\}$, gồm $6$ kết quả thuận lợi.'
  },
  {
    prompt: 'Trong câu trên (chọn số từ $1$ đến $30$, $A$: chia hết cho $5$, $B$: chia hết cho $10$), tính số kết quả thuận lợi cho biến cố giao $AB$.',
    correctAnswer: '3',
    acceptedAnswers: ['3'],
    explanation: 'Vì $B \\subset A$ nên $AB = A \\cap B = B = \\{10; 20; 30\\}$, có $3$ kết quả thuận lợi.'
  },
  {
    prompt: 'Gieo một con xúc xắc cân đối $2$ lần liên tiếp. Gọi $A$ là biến cố "Lần thứ nhất xuất hiện mặt $1$ chấm" và $B$ là biến cố "Lần thứ hai xuất hiện mặt $1$ chấm". Có bao nhiêu kết quả thuận lợi cho biến cố hợp $A \\cup B$?',
    correctAnswer: '11',
    acceptedAnswers: ['11'],
    explanation: 'Ta có $n(A) = 6, n(B) = 6$ và $n(AB) = 1$ (kết quả $(1; 1)$). Do đó $n(A \\cup B) = 6 + 6 - 1 = 11$.'
  },
  {
    prompt: 'Một tổ gồm $5$ nam và $4$ nữ. Chọn ngẫu nhiên đồng thời $3$ người. Gọi $A$ là biến cố "Trong $3$ người được chọn có ít nhất $2$ nam" và $B$ là biến cố "Trong $3$ người được chọn có ít nhất $1$ nữ". Tính số kết quả thuận lợi cho biến cố giao $AB$.',
    correctAnswer: '40',
    acceptedAnswers: ['40'],
    explanation: 'Biến cố $AB$ là "Trong $3$ người có đúng $2$ nam và $1$ nữ". Số kết quả thuận lợi là $C_5^2 \\cdot C_4^1 = 10 \\cdot 4 = 40$.'
  }
];

const b28P4B: CompactSO[] = [
  {
    prompt: 'Sắp xếp các bước tìm số kết quả thuận lợi của biến cố giao $AB$ khi lấy $2$ viên bi từ hộp có $5$ bi xanh, $4$ bi vàng với $A$: "Có ít nhất $1$ bi xanh" và $B$: "Có ít nhất $1$ bi vàng":',
    steps: [
      { id: '1', text: 'Phân tích ý nghĩa của biến cố giao $AB$: trong $2$ viên bi lấy ra vừa có ít nhất $1$ bi xanh, vừa có ít nhất $1$ bi vàng.' },
      { id: '2', text: 'Suy ra biến cố $AB$ chính là biến cố "Lấy được đúng $1$ viên bi xanh và $1$ viên bi vàng".' },
      { id: '3', text: 'Số cách chọn $1$ bi xanh trong $5$ bi xanh là $5$ cách; số cách chọn $1$ bi vàng trong $4$ bi vàng là $4$ cách.' },
      { id: '4', text: 'Áp dụng quy tắc nhân, số kết quả thuận lợi cho $AB$ là $5 \\cdot 4 = 20$.' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Xác định $AB$ là "$1$ bi xanh và $1$ bi vàng", dùng quy tắc nhân được $5 \\cdot 4 = 20$.'
  },
  {
    prompt: 'Sắp xếp các bước chứng minh đẳng thức tập hợp $A \\cup B = A \\cup (\\overline{A}B)$:',
    steps: [
      { id: '1', text: 'Xét vế phải: $VP = A \\cup (\\overline{A} \\cap B)$.' },
      { id: '2', text: 'Áp dụng tính chất phân phối của phép hợp đối với phép giao: $VP = (A \\cup \\overline{A}) \\cap (A \\cup B)$.' },
      { id: '3', text: 'Sử dụng tính chất của biến cố đối: $A \\cup \\overline{A} = \\Omega$ (không gian mẫu).' },
      { id: '4', text: 'Suy ra $VP = \\Omega \\cap (A \\cup B) = A \\cup B = VT$ (điều phải chứng minh).' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Phân phối $A \\cup (\\overline{A} \\cap B) = (A \\cup \\overline{A}) \\cap (A \\cup B) = \\Omega \\cap (A \\cup B) = A \\cup B$.'
  },
  {
    prompt: 'Sắp xếp các bước liệt kê các kết quả thuận lợi cho biến cố $A \\cup B$ khi gieo $1$ con xúc xắc với $A$: "Số chấm là ước của $6$" và $B$: "Số chấm lớn hơn $4$":',
    steps: [
      { id: '1', text: 'Xác định không gian mẫu $\\Omega = \\{1; 2; 3; 4; 5; 6\\}$.' },
      { id: '2', text: 'Liệt kê các kết quả thuận lợi cho $A$ (ước của $6$): $A = \\{1; 2; 3; 6\\}$.' },
      { id: '3', text: 'Liệt kê các kết quả thuận lợi cho $B$ (lớn hơn $4$): $B = \\{5; 6\\}$.' },
      { id: '4', text: 'Lấy hợp hai tập hợp, kết luận $A \\cup B = \\{1; 2; 3; 5; 6\\}$ gồm $5$ phần tử.' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Liệt kê $A = \\{1; 2; 3; 6\\}$ và $B = \\{5; 6\\}$, suy ra $A \\cup B = \\{1; 2; 3; 5; 6\\}$.'
  },
  {
    prompt: 'Sắp xếp các bước mô tả biến cố "Có không quá một thiết bị hỏng" theo $A$ ("Thiết bị 1 hỏng") và $B$ ("Thiết bị 2 hỏng"):',
    steps: [
      { id: '1', text: 'Phân tích cụm từ "không quá một thiết bị hỏng" nghĩa là có $0$ thiết bị hỏng hoặc có đúng $1$ thiết bị hỏng.' },
      { id: '2', text: 'Cách 1 (trực tiếp): Biểu diễn dưới dạng hợp $\\overline{A}\\,\\overline{B} \\cup A\\overline{B} \\cup \\overline{A}B$.' },
      { id: '3', text: 'Cách 2 (qua biến cố đối): Biến cố đối của "không quá một thiết bị hỏng" là "cả $2$ thiết bị đều hỏng" ($AB$).' },
      { id: '4', text: 'Do đó biến cố cần tìm chính là $\\overline{AB} = \\overline{A} \\cup \\overline{B}$.' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Phân tích theo trực tiếp hoặc dùng biến cố đối của $AB$ là $\\overline{AB} = \\overline{A} \\cup \\overline{B}$.'
  }
];

// ============================================================================
// BÀI 29. CÔNG THỨC CỘNG XÁC SUẤT
// Trọng tâm: Hai biến cố xung khắc, công thức cộng xác suất cho hai biến cố
// xung khắc P(A U B) = P(A) + P(B), công thức cộng xác suất tổng quát
// P(A U B) = P(A) + P(B) - P(AB).
// ============================================================================

const b29P1A: CompactMC[] = [
  {
    prompt: 'Cho hai biến cố $A$ và $B$ **xung khắc** ($A \\cap B = \\varnothing$). Công thức tính xác suất của biến cố hợp $A \\cup B$ là:',
    options: [
      { id: 'A', text: '$P(A \\cup B) = P(A) \\cdot P(B)$' },
      { id: 'B', text: '$P(A \\cup B) = P(A) + P(B)$' },
      { id: 'C', text: '$P(A \\cup B) = P(A) - P(B)$' },
      { id: 'D', text: '$P(A \\cup B) = 1 - P(A)P(B)$' }
    ],
    correctOptionId: 'B',
    explanation: 'Với hai biến cố xung khắc $A$ và $B$ ($A \\cap B = \\varnothing$), ta có $P(A \\cup B) = P(A) + P(B)$.',
    tikzType: 'custom',
    tikzCode: TIKZ_VENN_DISJOINT
  },
  {
    prompt: 'Cho hai biến cố $A$ và $B$ bất kì cùng liên quan đến một phép thử. Công thức cộng xác suất tổng quát là:',
    options: [
      { id: 'A', text: '$P(A \\cup B) = P(A) + P(B)$' },
      { id: 'B', text: '$P(A \\cup B) = P(A) + P(B) + P(AB)$' },
      { id: 'C', text: '$P(A \\cup B) = P(A) + P(B) - P(AB)$' },
      { id: 'D', text: '$P(A \\cup B) = P(A) \\cdot P(B) - P(AB)$' }
    ],
    correctOptionId: 'C',
    explanation: 'Theo định lí công thức cộng xác suất tổng quát: $P(A \\cup B) = P(A) + P(B) - P(AB)$.',
    tikzType: 'custom',
    tikzCode: TIKZ_VENN_INTERSECT
  },
  {
    prompt: 'Cho hai biến cố xung khắc $A$ và $B$ biết $P(A) = 0,35$ và $P(B) = 0,45$. Giá trị của $P(A \\cup B)$ bằng:',
    options: [
      { id: 'A', text: '$0,80$' },
      { id: 'B', text: '$0,10$' },
      { id: 'C', text: '$0,1575$' },
      { id: 'D', text: '$0,65$' }
    ],
    correctOptionId: 'A',
    explanation: 'Vì $A$ và $B$ xung khắc nên $P(A \\cup B) = P(A) + P(B) = 0,35 + 0,45 = 0,80$.'
  },
  {
    prompt: 'Cho hai biến cố $A$ và $B$ biết $P(A) = 0,5$, $P(B) = 0,6$ và $P(AB) = 0,2$. Giá trị của $P(A \\cup B)$ bằng:',
    options: [
      { id: 'A', text: '$1,1$' },
      { id: 'B', text: '$0,9$' },
      { id: 'C', text: '$0,7$' },
      { id: 'D', text: '$0,8$' }
    ],
    correctOptionId: 'B',
    explanation: 'Áp dụng công thức cộng xác suất: $P(A \\cup B) = P(A) + P(B) - P(AB) = 0,5 + 0,6 - 0,2 = 0,9$.'
  },
  {
    prompt: 'Cho hai biến cố $A$ và $B$ biết $P(A) = 0,4$, $P(B) = 0,5$ và $P(A \\cup B) = 0,7$. Giá trị của $P(AB)$ bằng:',
    options: [
      { id: 'A', text: '$0,2$' },
      { id: 'B', text: '$0,1$' },
      { id: 'C', text: '$0,3$' },
      { id: 'D', text: '$0,9$' }
    ],
    correctOptionId: 'A',
    explanation: 'Từ $P(A \\cup B) = P(A) + P(B) - P(AB) \\Rightarrow P(AB) = P(A) + P(B) - P(A \\cup B) = 0,4 + 0,5 - 0,7 = 0,2$.'
  },
  {
    prompt: 'Một hộp chứa $5$ viên bi xanh, $4$ viên bi đỏ và $3$ viên bi vàng. Lấy ngẫu nhiên $1$ viên bi từ hộp. Xác suất để lấy được viên bi màu xanh hoặc màu đỏ là:',
    options: [
      { id: 'A', text: '$\\frac{3}{4}$' },
      { id: 'B', text: '$\\frac{5}{12}$' },
      { id: 'C', text: '$\\frac{1}{3}$' },
      { id: 'D', text: '$\\frac{7}{12}$' }
    ],
    correctOptionId: 'A',
    explanation: 'Gọi $A$: "Lấy được bi xanh", $B$: "Lấy được bi đỏ". Vì $A, B$ xung khắc nên $P(A \\cup B) = P(A) + P(B) = \\frac{5}{12} + \\frac{4}{12} = \\frac{9}{12} = \\frac{3}{4}$.'
  },
  {
    prompt: 'Một hộp có $6$ quả bóng trắng và $4$ quả bóng đen. Lấy ngẫu nhiên đồng thời $2$ quả bóng. Xác suất để lấy được $2$ quả bóng cùng màu bằng:',
    options: [
      { id: 'A', text: '$\\frac{7}{15}$' },
      { id: 'B', text: '$\\frac{8}{15}$' },
      { id: 'C', text: '$\\frac{1}{3}$' },
      { id: 'D', text: '$\\frac{2}{15}$' }
    ],
    correctOptionId: 'A',
    explanation: 'Không gian mẫu $n(\\Omega) = C_{10}^2 = 45$. Gọi $A$: "2 bóng trắng" ($n(A) = C_6^2 = 15$) và $B$: "2 bóng đen" ($n(B) = C_4^2 = 6$). Vì $A, B$ xung khắc nên $P(A \\cup B) = \\frac{15 + 6}{45} = \\frac{21}{45} = \\frac{7}{15}$.'
  },
  {
    prompt: 'Chọn ngẫu nhiên một số nguyên dương không vượt quá $20$. Xác suất để số được chọn chia hết cho $3$ hoặc chia hết cho $5$ là:',
    options: [
      { id: 'A', text: '$\\frac{9}{20}$' },
      { id: 'B', text: '$\\frac{1}{2}$' },
      { id: 'C', text: '$\\frac{11}{20}$' },
      { id: 'D', text: '$\\frac{2}{5}$' }
    ],
    correctOptionId: 'A',
    explanation: 'Trong $\\{1; \\dots; 20\\}$ có $6$ số chia hết cho $3$, $4$ số chia hết cho $5$ và $1$ số chia hết cho $15$ (là số $15$). Theo công thức cộng: $P(A \\cup B) = \\frac{6}{20} + \\frac{4}{20} - \\frac{1}{20} = \\frac{9}{20}$.'
  },
  {
    prompt: 'Tại một câu lạc bộ ngoại ngữ có $40$ học viên, trong đó có $25$ người học tiếng Anh, $18$ người học tiếng Nhật và $8$ người học cả hai thứ tiếng Anh và Nhật. Chọn ngẫu nhiên $1$ học viên. Xác suất để học viên được chọn học tiếng Anh hoặc tiếng Nhật là:',
    options: [
      { id: 'A', text: '$\\frac{7}{8}$' },
      { id: 'B', text: '$\\frac{3}{4}$' },
      { id: 'C', text: '$\\frac{5}{8}$' },
      { id: 'D', text: '$\\frac{9}{10}$' }
    ],
    correctOptionId: 'A',
    explanation: 'Ta có $P(A \\cup B) = P(A) + P(B) - P(AB) = \\frac{25}{40} + \\frac{18}{40} - \\frac{8}{40} = \\frac{35}{40} = \\frac{7}{8}$.',
    tikzType: 'custom',
    tikzCode: TIKZ_VENN_INTERSECT
  },
  {
    prompt: 'Rút ngẫu nhiên $1$ lá bài từ bộ bài tú lơ khơ $52$ lá. Xác suất để rút được lá bài chất Cơ hoặc lá bài hình (J, Q, K) bằng:',
    options: [
      { id: 'A', text: '$\\frac{11}{26}$' },
      { id: 'B', text: '$\\frac{25}{52}$' },
      { id: 'C', text: '$\\frac{19}{52}$' },
      { id: 'D', text: '$\\frac{15}{52}$' }
    ],
    correctOptionId: 'A',
    explanation: 'Bộ bài $52$ lá có $13$ lá Cơ, $12$ lá hình (J, Q, K của $4$ chất) và $3$ lá vừa chất Cơ vừa là lá hình (J Cơ, Q Cơ, K Cơ). Vậy $P(A \\cup B) = \\frac{13 + 12 - 3}{52} = \\frac{22}{52} = \\frac{11}{26}$.'
  },
  {
    prompt: 'Cho hai biến cố $A$ và $B$ biết $P(A) = 0,6$, $P(B) = 0,5$ và $P(A \\cup B) = 0,8$. Xác suất để **cả hai biến cố $A$ và $B$ đều không xảy ra** ($P(\\overline{A}\\,\\overline{B})$) bằng:',
    options: [
      { id: 'A', text: '$0,2$' },
      { id: 'B', text: '$0,3$' },
      { id: 'C', text: '$0,1$' },
      { id: 'D', text: '$0,4$' }
    ],
    correctOptionId: 'A',
    explanation: 'Vì $\\overline{A}\\,\\overline{B} = \\overline{A \\cup B}$ nên $P(\\overline{A}\\,\\overline{B}) = 1 - P(A \\cup B) = 1 - 0,8 = 0,2$.'
  },
  {
    prompt: 'Cho hai biến cố $A, B$ có $P(A) = 0,45$ và $P(AB) = 0,15$. Xác suất của biến cố $A\\overline{B}$ ("$A$ xảy ra nhưng $B$ không xảy ra") bằng:',
    options: [
      { id: 'A', text: '$0,30$' },
      { id: 'B', text: '$0,60$' },
      { id: 'C', text: '$0,15$' },
      { id: 'D', text: '$0,25$' }
    ],
    correctOptionId: 'A',
    explanation: 'Vì $A = AB \\cup A\\overline{B}$ và hai biến cố $AB, A\\overline{B}$ xung khắc nên $P(A) = P(AB) + P(A\\overline{B}) \\Rightarrow P(A\\overline{B}) = 0,45 - 0,15 = 0,30$.'
  }
];

const b29P2A: CompactTF[] = [
  {
    stem: 'Một lớp có $50$ học sinh, trong đó có $30$ học sinh giỏi Toán, $25$ học sinh giỏi Tin học và $15$ học sinh giỏi cả hai môn Toán và Tin học. Chọn ngẫu nhiên $1$ học sinh trong lớp. Gọi $A$ là biến cố "Học sinh được chọn giỏi Toán" và $B$ là biến cố "Học sinh được chọn giỏi Tin học". Xét tính đúng sai của các mệnh đề sau:',
    tikzType: 'custom',
    tikzCode: TIKZ_VENN_INTERSECT,
    statements: [
      {
        id: 'a',
        text: 'Ta có $P(A) = 0,6$, $P(B) = 0,5$ và $P(AB) = 0,3$.',
        isTrue: true,
        explanation: 'Đúng vì $P(A) = \\frac{30}{50} = 0,6$; $P(B) = \\frac{25}{50} = 0,5$ và $P(AB) = \\frac{15}{50} = 0,3$.'
      },
      {
        id: 'b',
        text: 'Hai biến cố $A$ và $B$ là hai biến cố xung khắc.',
        isTrue: false,
        explanation: 'Sai vì $P(AB) = 0,3 > 0$ nên $A \\cap B \\ne \\varnothing$, hai biến cố không xung khắc.'
      },
      {
        id: 'c',
        text: 'Xác suất để học sinh được chọn giỏi ít nhất một trong hai môn Toán hoặc Tin học là $0,8$.',
        isTrue: true,
        explanation: 'Đúng vì $P(A \\cup B) = P(A) + P(B) - P(AB) = 0,6 + 0,5 - 0,3 = 0,8$.'
      },
      {
        id: 'd',
        text: 'Xác suất để học sinh được chọn không giỏi môn nào trong hai môn trên là $0,2$.',
        isTrue: true,
        explanation: 'Đúng vì $P(\\overline{A \\cup B}) = 1 - P(A \\cup B) = 1 - 0,8 = 0,2$.'
      }
    ]
  },
  {
    stem: 'Một hộp chứa $5$ viên bi đỏ, $4$ viên bi xanh và $3$ viên bi vàng có cùng kích thước và khối lượng. Lấy ngẫu nhiên đồng thời $2$ viên bi từ hộp. Xét tính đúng sai của các mệnh đề sau:',
    statements: [
      {
        id: 'a',
        text: 'Số phần tử của không gian mẫu là $n(\\Omega) = C_{12}^2 = 66$.',
        isTrue: true,
        explanation: 'Đúng vì chọn $2$ viên bi từ $12$ viên bi có $C_{12}^2 = 66$ cách.'
      },
      {
        id: 'b',
        text: 'Xác suất để lấy được $2$ viên bi màu đỏ là $\\frac{5}{33}$.',
        isTrue: true,
        explanation: 'Đúng vì $P(\\text{2 đỏ}) = \\frac{C_5^2}{66} = \\frac{10}{66} = \\frac{5}{33}$.'
      },
      {
        id: 'c',
        text: 'Xác suất để lấy được $2$ viên bi cùng màu xanh hoặc cùng màu vàng là $\\frac{9}{22}$.',
        isTrue: false,
        explanation: 'Sai vì hai biến cố xung khắc nên $P = \\frac{C_4^2 + C_3^2}{66} = \\frac{6 + 3}{66} = \\frac{9}{66} = \\frac{3}{22}$.'
      },
      {
        id: 'd',
        text: 'Xác suất để lấy được $2$ viên bi cùng màu bằng $\\frac{19}{66}$.',
        isTrue: true,
        explanation: 'Đúng vì $P(\\text{cùng màu}) = \\frac{C_5^2 + C_4^2 + C_3^2}{66} = \\frac{10 + 6 + 3}{66} = \\frac{19}{66}$.'
      }
    ]
  }
];

const b29P3A: CompactSA[] = [
  {
    prompt: 'Cho hai biến cố $A$ và $B$ có $P(A) = 0,45$, $P(B) = 0,55$ và $P(AB) = 0,25$. Tính xác suất $P(A \\cup B)$ (viết kết quả dưới dạng số thập phân).',
    correctAnswer: '0,75',
    acceptedAnswers: ['0,75', '0.75'],
    explanation: 'Ta có $P(A \\cup B) = P(A) + P(B) - P(AB) = 0,45 + 0,55 - 0,25 = 0,75$.'
  },
  {
    prompt: 'Tại một khu dân cư, tỉ lệ hộ gia đình có ô tô là $0,35$, tỉ lệ hộ gia đình có xe máy điện là $0,50$ và tỉ lệ hộ gia đình có cả ô tô lẫn xe máy điện là $0,15$. Chọn ngẫu nhiên một hộ gia đình. Tính xác suất để hộ đó có ô tô hoặc xe máy điện.',
    correctAnswer: '0,7',
    acceptedAnswers: ['0,7', '0.7', '0,70', '0.70'],
    explanation: 'Áp dụng công thức cộng xác suất: $P(A \\cup B) = 0,35 + 0,50 - 0,15 = 0,7$.'
  },
  {
    prompt: 'Chọn ngẫu nhiên một số tự nhiên từ $1$ đến $40$. Tính xác suất để số được chọn chia hết cho $4$ hoặc chia hết cho $5$ (viết kết quả dưới dạng số thập phân).',
    correctAnswer: '0,4',
    acceptedAnswers: ['0,4', '0.4', '2/5'],
    explanation: 'Từ $1$ đến $40$ có $10$ số chia hết cho $4$, $8$ số chia hết cho $5$ và $2$ số chia hết cho $20$ (là $20, 40$). Vậy $P = \\frac{10 + 8 - 2}{40} = \\frac{16}{40} = 0,4$.'
  },
  {
    prompt: 'Cho hai biến cố xung khắc $A$ và $B$ biết $P(A) = 0,28$ và $P(A \\cup B) = 0,72$. Tính xác suất $P(B)$.',
    correctAnswer: '0,44',
    acceptedAnswers: ['0,44', '0.44'],
    explanation: 'Vì $A, B$ xung khắc nên $P(A \\cup B) = P(A) + P(B) \\Rightarrow P(B) = 0,72 - 0,28 = 0,44$.'
  }
];

const b29P4A: CompactSO[] = [
  {
    prompt: 'Sắp xếp các bước tính xác suất chọn được học sinh giỏi Văn hoặc giỏi Sử từ lớp $45$ học sinh (biết $20$ em giỏi Văn, $16$ em giỏi Sử, $9$ em giỏi cả hai môn):',
    steps: [
      { id: '1', text: 'Gọi $A$ là biến cố "Học sinh giỏi Văn" và $B$ là biến cố "Học sinh giỏi Sử", khi đó biến cố cần tính là $A \\cup B$.' },
      { id: '2', text: 'Tính xác suất của từng biến cố: $P(A) = \\frac{20}{45}$, $P(B) = \\frac{16}{45}$ và $P(AB) = \\frac{9}{45}$.' },
      { id: '3', text: 'Áp dụng công thức cộng xác suất: $P(A \\cup B) = P(A) + P(B) - P(AB)$.' },
      { id: '4', text: 'Thay số và rút gọn: $P(A \\cup B) = \\frac{20 + 16 - 9}{45} = \\frac{27}{45} = 0,6$.' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Đặt tên biến cố $A, B \\to$ Tính $P(A), P(B), P(AB) \\to$ Áp dụng $P(A \\cup B) = P(A) + P(B) - P(AB) = 0,6$.'
  },
  {
    prompt: 'Sắp xếp các bước tính xác suất lấy được $2$ quả cầu cùng màu khi lấy ngẫu nhiên $2$ quả từ hộp có $5$ cầu đỏ và $5$ cầu xanh:',
    steps: [
      { id: '1', text: 'Tính số phần tử của không gian mẫu khi lấy $2$ quả từ $10$ quả: $n(\\Omega) = C_{10}^2 = 45$.' },
      { id: '2', text: 'Gọi $A$: "Lấy được $2$ quả đỏ" và $B$: "Lấy được $2$ quả xanh"; nhận xét $A$ và $B$ là hai biến cố xung khắc.' },
      { id: '3', text: 'Tính $P(A) = \\frac{C_5^2}{45} = \\frac{10}{45}$ và $P(B) = \\frac{C_5^2}{45} = \\frac{10}{45}$.' },
      { id: '4', text: 'Áp dụng công thức cộng cho hai biến cố xung khắc: $P(A \\cup B) = P(A) + P(B) = \\frac{20}{45} = \\frac{4}{9}$.' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Tính $n(\\Omega) = 45$, xét hai biến cố xung khắc $A, B$ có $P(A) = P(B) = \\frac{10}{45} \\Rightarrow P(A \\cup B) = \\frac{4}{9}$.'
  },
  {
    prompt: 'Sắp xếp các bước chứng minh công thức $P(A\\overline{B}) = P(A) - P(AB)$:',
    steps: [
      { id: '1', text: 'Biểu diễn biến cố $A$ dưới dạng hợp của hai biến cố thành phần: $A = AB \\cup A\\overline{B}$.' },
      { id: '2', text: 'Nhận xét hai biến cố $AB$ và $A\\overline{B}$ xung khắc với nhau vì $(AB) \\cap (A\\overline{B}) = \\varnothing$.' },
      { id: '3', text: 'Áp dụng công thức cộng xác suất cho hai biến cố xung khắc: $P(A) = P(AB) + P(A\\overline{B})$.' },
      { id: '4', text: 'Chuyển vế suy ra $P(A\\overline{B}) = P(A) - P(AB)$.' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Tách $A = AB \\cup A\\overline{B}$ xung khắc, áp dụng công thức cộng rồi chuyển vế.'
  },
  {
    prompt: 'Sắp xếp các bước tính xác suất $P(\\overline{A}\\,\\overline{B})$ biết $P(A) = 0,4, P(B) = 0,5$ và $P(AB) = 0,15$:',
    steps: [
      { id: '1', text: 'Áp dụng công thức cộng xác suất để tính $P(A \\cup B) = P(A) + P(B) - P(AB)$.' },
      { id: '2', text: 'Thay số tìm được $P(A \\cup B) = 0,4 + 0,5 - 0,15 = 0,75$.' },
      { id: '3', text: 'Nhận xét biến cố $\\overline{A}\\,\\overline{B}$ là biến cố đối của biến cố hợp $A \\cup B$.' },
      { id: '4', text: 'Suy ra $P(\\overline{A}\\,\\overline{B}) = 1 - P(A \\cup B) = 1 - 0,75 = 0,25$.' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Tính $P(A \\cup B) = 0,75$, sau đó lấy $1 - P(A \\cup B) = 0,25$.'
  }
];

const b29P1B: CompactMC[] = [
  {
    prompt: 'Với mọi biến cố $A$, hai biến cố $A$ và $\\overline{A}$ là hai biến cố xung khắc và $A \\cup \\overline{A} = \\Omega$. Đẳng thức nào sau đây là **đúng**?',
    options: [
      { id: 'A', text: '$P(A) + P(\\overline{A}) = 1$' },
      { id: 'B', text: '$P(A) \\cdot P(\\overline{A}) = 1$' },
      { id: 'C', text: '$P(A) - P(\\overline{A}) = 1$' },
      { id: 'D', text: '$P(A) + P(\\overline{A}) = 0$' }
    ],
    correctOptionId: 'A',
    explanation: 'Theo quy tắc cộng xác suất cho hai biến cố đối nhau: $P(A) + P(\\overline{A}) = P(\\Omega) = 1$.'
  },
  {
    prompt: 'Cho hai biến cố $A$ và $B$ biết $P(A) = 0,3$, $P(B) = 0,4$ và $P(A \\cup B) = 0,7$. Khẳng định nào sau đây là **đúng**?',
    options: [
      { id: 'A', text: '$P(AB) = 0,12$' },
      { id: 'B', text: 'Hai biến cố $A$ và $B$ xung khắc ($P(AB) = 0$)' },
      { id: 'C', text: 'Hai biến cố $A$ và $B$ độc lập' },
      { id: 'D', text: 'Hai biến cố $A$ và $B$ đối nhau' }
    ],
    correctOptionId: 'B',
    explanation: 'Ta có $P(AB) = P(A) + P(B) - P(A \\cup B) = 0,3 + 0,4 - 0,7 = 0$, nên $A$ và $B$ là hai biến cố xung khắc.'
  },
  {
    prompt: 'Một hộp có $15$ quả cầu đánh số từ $1$ đến $15$. Lấy ngẫu nhiên $1$ quả cầu. Xác suất để lấy được quả cầu ghi số chia hết cho $4$ hoặc chia hết cho $6$ là:',
    options: [
      { id: 'A', text: '$\\frac{4}{15}$' },
      { id: 'B', text: '$\\frac{1}{3}$' },
      { id: 'C', text: '$\\frac{1}{5}$' },
      { id: 'D', text: '$\\frac{2}{5}$' }
    ],
    correctOptionId: 'A',
    explanation: 'Trong $\\{1; \\dots; 15\\}$, tập chia hết cho $4$ là $\\{4; 8; 12\\}$ ($3$ số), tập chia hết cho $6$ là $\\{6; 12\\}$ ($2$ số), giao của chúng là $\\{12\\}$ ($1$ số). Vậy $P = \\frac{3 + 2 - 1}{15} = \\frac{4}{15}$.'
  },
  {
    prompt: 'Một đoàn khách du lịch gồm $50$ người, trong đó có $32$ người thích đi tắm biển, $26$ người thích đi leo núi và $14$ người thích cả tắm biển lẫn leo núi. Chọn ngẫu nhiên $1$ du khách. Xác suất để du khách đó thích tắm biển hoặc leo núi bằng:',
    options: [
      { id: 'A', text: '$0,88$' },
      { id: 'B', text: '$0,72$' },
      { id: 'C', text: '$0,84$' },
      { id: 'D', text: '$0,92$' }
    ],
    correctOptionId: 'A',
    explanation: 'Áp dụng công thức cộng: $P(A \\cup B) = \\frac{32 + 26 - 14}{50} = \\frac{44}{50} = 0,88$.'
  },
  {
    prompt: 'Gieo đồng thời hai con xúc xắc cân đối. Xác suất để tổng số chấm xuất hiện trên hai con xúc xắc bằng $7$ hoặc bằng $11$ là:',
    options: [
      { id: 'A', text: '$\\frac{2}{9}$' },
      { id: 'B', text: '$\\frac{1}{6}$' },
      { id: 'C', text: '$\\frac{5}{36}$' },
      { id: 'D', text: '$\\frac{7}{36}$' }
    ],
    correctOptionId: 'A',
    explanation: 'Biến cố $A$: "Tổng bằng $7$" gồm $6$ kết quả: $(1;6),(2;5),(3;4),(4;3),(5;2),(6;1)$. Biến cố $B$: "Tổng bằng $11$" gồm $2$ kết quả: $(5;6),(6;5)$. Vì $A, B$ xung khắc nên $P(A \\cup B) = \\frac{6 + 2}{36} = \\frac{8}{36} = \\frac{2}{9}$.'
  },
  {
    prompt: 'Một tổ học sinh có $6$ nam và $4$ nữ. Chọn ngẫu nhiên đồng thời $3$ học sinh. Xác suất để $3$ học sinh được chọn có cả nam và nữ hoặc toàn là nam bằng:',
    options: [
      { id: 'A', text: '$\\frac{29}{30}$' },
      { id: 'B', text: '$\\frac{5}{6}$' },
      { id: 'C', text: '$\\frac{23}{30}$' },
      { id: 'D', text: '$\\frac{14}{15}$' }
    ],
    correctOptionId: 'A',
    explanation: 'Biến cố đối là "Cả $3$ học sinh đều là nữ", có $C_4^3 = 4$ kết quả trong $C_{10}^3 = 120$ kết quả. Vậy xác suất cần tìm là $1 - \\frac{4}{120} = \\frac{116}{120} = \\frac{29}{30}$.'
  },
  {
    prompt: 'Rút ngẫu nhiên $1$ lá bài từ bộ bài $52$ lá. Xác suất để rút được lá bài màu đỏ (Cơ hoặc Rô) hoặc là lá Át bằng:',
    options: [
      { id: 'A', text: '$\\frac{7}{13}$' },
      { id: 'B', text: '$\\frac{15}{26}$' },
      { id: 'C', text: '$\\frac{1}{2}$' },
      { id: 'D', text: '$\\frac{4}{13}$' }
    ],
    correctOptionId: 'A',
    explanation: 'Có $26$ lá màu đỏ, $4$ lá Át và $2$ lá Át màu đỏ (Át Cơ, Át Rô). Do đó $P(A \\cup B) = \\frac{26 + 4 - 2}{52} = \\frac{28}{52} = \\frac{7}{13}$.'
  },
  {
    prompt: 'Cho hai biến cố $A, B$ thỏa mãn $P(A) = 0,5$, $P(B) = 0,4$ và $P(A\\overline{B}) = 0,3$. Khi đó $P(A \\cup B)$ bằng:',
    options: [
      { id: 'A', text: '$0,7$' },
      { id: 'B', text: '$0,6$' },
      { id: 'C', text: '$0,8$' },
      { id: 'D', text: '$0,9$' }
    ],
    correctOptionId: 'A',
    explanation: 'Vì $A \\cup B = B \\cup A\\overline{B}$ và hai biến cố $B, A\\overline{B}$ xung khắc nên $P(A \\cup B) = P(B) + P(A\\overline{B}) = 0,4 + 0,3 = 0,7$.'
  },
  {
    prompt: 'Trong một phòng khám có $100$ bệnh nhân đến khám mắt hoặc khám răng. Biết $65$ người khám mắt, $55$ người khám răng. Chọn ngẫu nhiên $1$ bệnh nhân. Xác suất để bệnh nhân đó khám cả mắt và răng là:',
    options: [
      { id: 'A', text: '$0,20$' },
      { id: 'B', text: '$0,25$' },
      { id: 'C', text: '$0,15$' },
      { id: 'D', text: '$0,30$' }
    ],
    correctOptionId: 'A',
    explanation: 'Vì mọi bệnh nhân đều khám ít nhất một trong hai khoa nên $P(A \\cup B) = 1$. Do đó $P(AB) = P(A) + P(B) - P(A \\cup B) = 0,65 + 0,55 - 1 = 0,20$.'
  },
  {
    prompt: 'Xác suất để một học sinh đạt điểm giỏi môn Toán là $0,3$, đạt điểm giỏi môn Hóa là $0,25$ và đạt điểm giỏi cả hai môn là $0,15$. Xác suất để học sinh đó đạt điểm giỏi **đúng một** trong hai môn trên là:',
    options: [
      { id: 'A', text: '$0,25$' },
      { id: 'B', text: '$0,40$' },
      { id: 'C', text: '$0,35$' },
      { id: 'D', text: '$0,10$' }
    ],
    correctOptionId: 'A',
    explanation: 'Xác suất đạt giỏi đúng một môn là $P(A\\overline{B}) + P(\\overline{A}B) = [P(A) - P(AB)] + [P(B) - P(AB)] = (0,3 - 0,15) + (0,25 - 0,15) = 0,15 + 0,10 = 0,25$.'
  },
  {
    prompt: 'Cho ba biến cố $A, B, C$ đôi một xung khắc với nhau biết $P(A) = 0,2$, $P(B) = 0,3$ và $P(C) = 0,35$. Giá trị của $P(A \\cup B \\cup C)$ bằng:',
    options: [
      { id: 'A', text: '$0,85$' },
      { id: 'B', text: '$0,50$' },
      { id: 'C', text: '$0,65$' },
      { id: 'D', text: '$0,021$' }
    ],
    correctOptionId: 'A',
    explanation: 'Vì $A, B, C$ đôi một xung khắc nên $P(A \\cup B \\cup C) = P(A) + P(B) + P(C) = 0,2 + 0,3 + 0,35 = 0,85$.'
  },
  {
    prompt: 'Một hộp có $4$ quả cầu xanh, $3$ quả cầu đỏ, $2$ quả cầu vàng. Chọn ngẫu nhiên $2$ quả cầu. Xác suất để chọn được $2$ quả cầu khác màu bằng:',
    options: [
      { id: 'A', text: '$\\frac{13}{18}$' },
      { id: 'B', text: '$\\frac{5}{18}$' },
      { id: 'C', text: '$\\frac{7}{18}$' },
      { id: 'D', text: '$\\frac{11}{18}$' }
    ],
    correctOptionId: 'A',
    explanation: 'Ta có $n(\\Omega) = C_9^2 = 36$. Số cách chọn $2$ quả cùng màu là $C_4^2 + C_3^2 + C_2^2 = 6 + 3 + 1 = 10$. Vậy xác suất chọn $2$ quả khác màu là $1 - \\frac{10}{36} = \\frac{26}{36} = \\frac{13}{18}$.'
  }
];

const b29P2B: CompactTF[] = [
  {
    stem: 'Cho hai biến cố $A$ và $B$ cùng liên quan đến một phép thử, biết $P(A) = 0,55$, $P(B) = 0,45$ và $P(AB) = 0,20$. Xét tính đúng sai của các mệnh đề sau:',
    tikzType: 'custom',
    tikzCode: TIKZ_VENN_INTERSECT,
    statements: [
      {
        id: 'a',
        text: 'Xác suất của biến cố hợp $A \\cup B$ bằng $0,80$.',
        isTrue: true,
        explanation: 'Đúng vì $P(A \\cup B) = 0,55 + 0,45 - 0,20 = 0,80$.'
      },
      {
        id: 'b',
        text: 'Xác suất của biến cố $A\\overline{B}$ bằng $0,35$.',
        isTrue: true,
        explanation: 'Đúng vì $P(A\\overline{B}) = P(A) - P(AB) = 0,55 - 0,20 = 0,35$.'
      },
      {
        id: 'c',
        text: 'Xác suất của biến cố $\\overline{A}B$ bằng $0,35$.',
        isTrue: false,
        explanation: 'Sai vì $P(\\overline{A}B) = P(B) - P(AB) = 0,45 - 0,20 = 0,25$.'
      },
      {
        id: 'd',
        text: 'Xác suất để có đúng một trong hai biến cố $A, B$ xảy ra bằng $0,60$.',
        isTrue: true,
        explanation: 'Đúng vì $P(A\\overline{B} \\cup \\overline{A}B) = P(A\\overline{B}) + P(\\overline{A}B) = 0,35 + 0,25 = 0,60$.'
      }
    ]
  },
  {
    stem: 'Gieo một con xúc xắc cân đối và đồng chất một lần. Gọi $A$ là biến cố "Số chấm xuất hiện là số nguyên tố" và $B$ là biến cố "Số chấm xuất hiện là số lẻ". Xét tính đúng sai của các mệnh đề sau:',
    statements: [
      {
        id: 'a',
        text: 'Ta có $P(A) = \\frac{1}{2}$ và $P(B) = \\frac{1}{2}$.',
        isTrue: true,
        explanation: 'Đúng vì $A = \\{2; 3; 5\\}$ và $B = \\{1; 3; 5\\}$ đều có $3$ phần tử trên $6$ phần tử của $\\Omega$.'
      },
      {
        id: 'b',
        text: 'Biến cố giao $AB$ gồm $2$ phần tử là $\\{3; 5\\}$ nên $P(AB) = \\frac{1}{3}$.',
        isTrue: true,
        explanation: 'Đúng vì các số nguyên tố lẻ từ $1$ đến $6$ là $3$ và $5$.'
      },
      {
        id: 'c',
        text: 'Xác suất của biến cố hợp $A \\cup B$ bằng $1$.',
        isTrue: false,
        explanation: 'Sai vì $P(A \\cup B) = \\frac{1}{2} + \\frac{1}{2} - \\frac{1}{3} = \\frac{2}{3} \\ne 1$.'
      },
      {
        id: 'd',
        text: 'Xác suất để số chấm xuất hiện không phải số nguyên tố và cũng không phải số lẻ bằng $\\frac{1}{3}$.',
        isTrue: true,
        explanation: 'Đúng vì $P(\\overline{A \\cup B}) = 1 - \\frac{2}{3} = \\frac{1}{3}$ (ứng với hai kết quả $4$ và $6$).'
      }
    ]
  }
];

const b29P3B: CompactSA[] = [
  {
    prompt: 'Cho hai biến cố $A$ và $B$ có $P(A) = 0,6$, $P(B) = 0,7$ và $P(A \\cup B) = 0,85$. Tính xác suất $P(AB)$ (viết kết quả dưới dạng số thập phân).',
    correctAnswer: '0,45',
    acceptedAnswers: ['0,45', '0.45'],
    explanation: 'Ta có $P(AB) = P(A) + P(B) - P(A \\cup B) = 0,6 + 0,7 - 0,85 = 0,45$.'
  },
  {
    prompt: 'Trong một hội thảo khoa học có $80$ đại biểu, trong đó có $48$ người nói được tiếng Anh, $36$ người nói được tiếng Pháp và $20$ người nói được cả tiếng Anh và tiếng Pháp. Chọn ngẫu nhiên $1$ đại biểu. Tính xác suất để đại biểu đó nói được ít nhất một trong hai thứ tiếng trên.',
    correctAnswer: '0,8',
    acceptedAnswers: ['0,8', '0.8', '4/5'],
    explanation: 'Ta có $P(A \\cup B) = \\frac{48 + 36 - 20}{80} = \\frac{64}{80} = 0,8$.'
  },
  {
    prompt: 'Chọn ngẫu nhiên một số nguyên dương từ $1$ đến $100$. Tính xác suất để số được chọn chia hết cho $10$ hoặc chia hết cho $15$ (viết kết quả dưới dạng số thập phân).',
    correctAnswer: '0,13',
    acceptedAnswers: ['0,13', '0.13', '13/100'],
    explanation: 'Từ $1$ đến $100$ có $10$ số chia hết cho $10$, $6$ số chia hết cho $15$ và $3$ số chia hết cho cả $10$ và $15$ (tức chia hết cho $30$: $30, 60, 90$). Theo công thức cộng xác suất: $P = \\frac{10 + 6 - 3}{100} = \\frac{13}{100} = 0,13$.'
  },
  {
    prompt: 'Cho hai biến cố $A$ và $B$ biết $P(A) = 0,5$, $P(B) = 0,4$ và $P(AB) = 0,15$. Tính xác suất để **chỉ có đúng một** trong hai biến cố $A, B$ xảy ra.',
    correctAnswer: '0,6',
    acceptedAnswers: ['0,6', '0.6', '0,60', '0.60'],
    explanation: 'Xác suất chỉ có đúng một biến cố xảy ra là $P(A) + P(B) - 2P(AB) = 0,5 + 0,4 - 2 \\cdot 0,15 = 0,6$.'
  }
];

const b29P4B: CompactSO[] = [
  {
    prompt: 'Sắp xếp các bước tính xác suất rút được lá bài Bích hoặc lá Át khi rút ngẫu nhiên $1$ lá từ bộ bài $52$ lá:',
    steps: [
      { id: '1', text: 'Gọi $A$: "Rút được lá Bích" và $B$: "Rút được lá Át", ta cần tính $P(A \\cup B)$.' },
      { id: '2', text: 'Tính $P(A) = \\frac{13}{52}$ (vì có $13$ lá Bích) và $P(B) = \\frac{4}{52}$ (vì có $4$ lá Át).' },
      { id: '3', text: 'Biến cố giao $AB$ là "Rút được lá Át Bích", chỉ có $1$ lá nên $P(AB) = \\frac{1}{52}$.' },
      { id: '4', text: 'Áp dụng công thức cộng: $P(A \\cup B) = \\frac{13}{52} + \\frac{4}{52} - \\frac{1}{52} = \\frac{16}{52} = \\frac{4}{13}$.' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Tính $P(A) = \\frac{13}{52}, P(B) = \\frac{4}{52}, P(AB) = \\frac{1}{52} \\Rightarrow P(A \\cup B) = \\frac{16}{52} = \\frac{4}{13}$.'
  },
  {
    prompt: 'Sắp xếp các bước tính xác suất chọn được ít nhất $1$ học sinh nữ khi chọn $3$ học sinh từ tổ gồm $5$ nam và $4$ nữ:',
    steps: [
      { id: '1', text: 'Tính số phần tử của không gian mẫu: $n(\\Omega) = C_9^3 = 84$.' },
      { id: '2', text: 'Gọi $A$ là biến cố "Có ít nhất $1$ học sinh nữ", khi đó biến cố đối $\\overline{A}$ là "Cả $3$ học sinh được chọn đều là nam".' },
      { id: '3', text: 'Tính xác suất của biến cố đối: $P(\\overline{A}) = \\frac{C_5^3}{84} = \\frac{10}{84} = \\frac{5}{42}$.' },
      { id: '4', text: 'Áp dụng quy tắc biến cố đối: $P(A) = 1 - P(\\overline{A}) = 1 - \\frac{5}{42} = \\frac{37}{42}$.' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Tính $n(\\Omega) = 84$, xét biến cố đối "Cả $3$ là nam" có $P(\\overline{A}) = \\frac{5}{42}$, suy ra $P(A) = \\frac{37}{42}$.'
  },
  {
    prompt: 'Sắp xếp các bước tính xác suất để chỉ có đúng một trong hai biến cố $A, B$ xảy ra khi biết $P(A), P(B)$ và $P(AB)$:',
    steps: [
      { id: '1', text: 'Biểu diễn biến cố $E$ ("Chỉ có đúng một biến cố xảy ra") dưới dạng hợp xung khắc: $E = A\\overline{B} \\cup \\overline{A}B$.' },
      { id: '2', text: 'Áp dụng công thức cộng cho hai biến cố xung khắc: $P(E) = P(A\\overline{B}) + P(\\overline{A}B)$.' },
      { id: '3', text: 'Thay $P(A\\overline{B}) = P(A) - P(AB)$ và $P(\\overline{A}B) = P(B) - P(AB)$.' },
      { id: '4', text: 'Rút gọn công thức: $P(E) = P(A) + P(B) - 2P(AB)$.' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Tách $E = A\\overline{B} \\cup \\overline{A}B$ xung khắc, thay $P(A\\overline{B})$ và $P(\\overline{A}B)$ thu được $P(A) + P(B) - 2P(AB)$.'
  },
  {
    prompt: 'Sắp xếp các bước chứng minh công thức cộng xác suất tổng quát $P(A \\cup B) = P(A) + P(B) - P(AB)$:',
    steps: [
      { id: '1', text: 'Biểu diễn biến cố hợp $A \\cup B$ thành hợp của hai biến cố xung khắc: $A \\cup B = A \\cup (\\overline{A}B)$.' },
      { id: '2', text: 'Áp dụng công thức cộng cho hai biến cố xung khắc: $P(A \\cup B) = P(A) + P(\\overline{A}B)$ (1).' },
      { id: '3', text: 'Mặt khác, tách $B = AB \\cup \\overline{A}B$ xung khắc nên $P(B) = P(AB) + P(\\overline{A}B) \\Rightarrow P(\\overline{A}B) = P(B) - P(AB)$ (2).' },
      { id: '4', text: 'Thay (2) vào (1), ta được $P(A \\cup B) = P(A) + P(B) - P(AB)$ (điều phải chứng minh).' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Tách $A \\cup B = A \\cup \\overline{A}B$ và $B = AB \\cup \\overline{A}B$ thành các biến cố xung khắc.'
  }
];

// ============================================================================
// BÀI 30. CÔNG THỨC NHÂN XÁC SUẤT CHO HAI BIẾN CỐ ĐỘC LẬP
// Trọng tâm: Công thức nhân xác suất cho hai biến cố độc lập P(AB) = P(A)P(B),
// nhận biết tính độc lập qua P(AB) = P(A)P(B), kết hợp công thức cộng và biến cố đối.
// ============================================================================

const b30P1A: CompactMC[] = [
  {
    prompt: 'Nếu hai biến cố $A$ và $B$ **độc lập** với nhau thì công thức nhân xác suất nào sau đây là **đúng**?',
    options: [
      { id: 'A', text: '$P(AB) = P(A) + P(B)$' },
      { id: 'B', text: '$P(AB) = P(A) \\cdot P(B)$' },
      { id: 'C', text: '$P(AB) = P(A) - P(B)$' },
      { id: 'D', text: '$P(A \\cup B) = P(A) \\cdot P(B)$' }
    ],
    correctOptionId: 'B',
    explanation: 'Theo định lí công thức nhân xác suất: Nếu hai biến cố $A$ và $B$ độc lập với nhau thì $P(AB) = P(A) \\cdot P(B)$.'
  },
  {
    prompt: 'Cho hai biến cố độc lập $A$ và $B$ biết $P(A) = 0,4$ và $P(B) = 0,7$. Xác suất của biến cố giao $AB$ bằng:',
    options: [
      { id: 'A', text: '$0,28$' },
      { id: 'B', text: '$1,10$' },
      { id: 'C', text: '$0,30$' },
      { id: 'D', text: '$0,82$' }
    ],
    correctOptionId: 'A',
    explanation: 'Vì $A$ và $B$ độc lập nên $P(AB) = P(A) \\cdot P(B) = 0,4 \\cdot 0,7 = 0,28$.'
  },
  {
    prompt: 'Cho hai biến cố độc lập $A$ và $B$ biết $P(A) = 0,6$ và $P(B) = 0,5$. Xác suất của biến cố $A\\overline{B}$ ("$A$ xảy ra và $B$ không xảy ra") bằng:',
    options: [
      { id: 'A', text: '$0,3$' },
      { id: 'B', text: '$0,1$' },
      { id: 'C', text: '$0,2$' },
      { id: 'D', text: '$0,8$' }
    ],
    correctOptionId: 'A',
    explanation: 'Vì $A, B$ độc lập nên $A, \\overline{B}$ cũng độc lập, với $P(\\overline{B}) = 1 - 0,5 = 0,5$. Vậy $P(A\\overline{B}) = P(A) \\cdot P(\\overline{B}) = 0,6 \\cdot 0,5 = 0,3$.'
  },
  {
    prompt: 'Cho hai biến cố độc lập $A$ và $B$ biết $P(A) = 0,3$ và $P(B) = 0,4$. Xác suất để **cả hai biến cố $A$ và $B$ đều không xảy ra** ($P(\\overline{A}\\,\\overline{B})$) bằng:',
    options: [
      { id: 'A', text: '$0,12$' },
      { id: 'B', text: '$0,42$' },
      { id: 'C', text: '$0,58$' },
      { id: 'D', text: '$0,88$' }
    ],
    correctOptionId: 'B',
    explanation: 'Vì $\\overline{A}$ và $\\overline{B}$ độc lập nên $P(\\overline{A}\\,\\overline{B}) = P(\\overline{A}) \\cdot P(\\overline{B}) = (1 - 0,3)(1 - 0,4) = 0,7 \\cdot 0,6 = 0,42$.'
  },
  {
    prompt: 'Cho hai biến cố độc lập $A$ và $B$ biết $P(A) = 0,5$ và $P(B) = 0,4$. Xác suất của biến cố hợp $A \\cup B$ bằng:',
    options: [
      { id: 'A', text: '$0,9$' },
      { id: 'B', text: '$0,7$' },
      { id: 'C', text: '$0,2$' },
      { id: 'D', text: '$0,8$' }
    ],
    correctOptionId: 'B',
    explanation: 'Vì $A, B$ độc lập nên $P(AB) = 0,5 \\cdot 0,4 = 0,2$. Áp dụng công thức cộng: $P(A \\cup B) = P(A) + P(B) - P(AB) = 0,5 + 0,4 - 0,2 = 0,7$.'
  },
  {
    prompt: 'Hai xạ thủ độc lập cùng bắn vào một mục tiêu (mỗi người bắn $1$ viên). Xác suất bắn trúng của người thứ nhất là $0,8$ và của người thứ hai là $0,7$. Xác suất để có **ít nhất một người** bắn trúng mục tiêu là:',
    options: [
      { id: 'A', text: '$0,94$' },
      { id: 'B', text: '$0,56$' },
      { id: 'C', text: '$0,38$' },
      { id: 'D', text: '$0,90$' }
    ],
    correctOptionId: 'A',
    explanation: 'Xác suất cả hai cùng bắn trượt là $(1 - 0,8)(1 - 0,7) = 0,2 \\cdot 0,3 = 0,06$. Vậy xác suất có ít nhất một người bắn trúng là $1 - 0,06 = 0,94$.'
  },
  {
    prompt: 'Với hai xạ thủ ở câu trên ($P(A) = 0,8, P(B) = 0,7$), xác suất để **chỉ có đúng một người** bắn trúng mục tiêu là:',
    options: [
      { id: 'A', text: '$0,38$' },
      { id: 'B', text: '$0,56$' },
      { id: 'C', text: '$0,44$' },
      { id: 'D', text: '$0,24$' }
    ],
    correctOptionId: 'A',
    explanation: 'Ta có $P(A\\overline{B} \\cup \\overline{A}B) = P(A)P(\\overline{B}) + P(\\overline{A})P(B) = 0,8 \\cdot 0,3 + 0,2 \\cdot 0,7 = 0,24 + 0,14 = 0,38$.'
  },
  {
    prompt: 'Một hộp thứ nhất có $3$ bi đỏ, $2$ bi xanh; hộp thứ hai có $4$ bi đỏ, $6$ bi xanh. Lấy ngẫu nhiên từ mỗi hộp ra $1$ viên bi. Xác suất để cả $2$ viên bi lấy ra đều màu đỏ bằng:',
    options: [
      { id: 'A', text: '$0,24$' },
      { id: 'B', text: '$0,36$' },
      { id: 'C', text: '$0,40$' },
      { id: 'D', text: '$0,60$' }
    ],
    correctOptionId: 'A',
    explanation: 'Xác suất lấy được bi đỏ ở hộp I là $\\frac{3}{5} = 0,6$; ở hộp II là $\\frac{4}{10} = 0,4$. Vì hai phép lấy độc lập nên $P = 0,6 \\cdot 0,4 = 0,24$.'
  },
  {
    prompt: 'Một học sinh làm $3$ câu trắc nghiệm độc lập, mỗi câu có $4$ phương án lựa chọn trong đó chỉ có $1$ phương án đúng. Nếu học sinh đó chọn ngẫu nhiên đáp án ở cả $3$ câu thì xác suất trả lời đúng cả $3$ câu bằng:',
    options: [
      { id: 'A', text: '$\\frac{1}{64}$' },
      { id: 'B', text: '$\\frac{3}{4}$' },
      { id: 'C', text: '$\\frac{1}{12}$' },
      { id: 'D', text: '$\\frac{27}{64}$' }
    ],
    correctOptionId: 'A',
    explanation: 'Xác suất chọn đúng mỗi câu là $\\frac{1}{4}$. Vì $3$ câu độc lập nên xác suất đúng cả $3$ câu là $\\left(\\frac{1}{4}\\right)^3 = \\frac{1}{64}$.'
  },
  {
    prompt: 'Cho hai biến cố độc lập $A, B$ có $P(A) = 0,4$ và $P(AB) = 0,12$. Khi đó xác suất $P(B)$ bằng:',
    options: [
      { id: 'A', text: '$0,3$' },
      { id: 'B', text: '$0,28$' },
      { id: 'C', text: '$0,48$' },
      { id: 'D', text: '$0,52$' }
    ],
    correctOptionId: 'A',
    explanation: 'Vì $A$ và $B$ độc lập nên $P(AB) = P(A) \\cdot P(B) \\Rightarrow P(B) = \\frac{0,12}{0,4} = 0,3$.'
  },
  {
    prompt: 'Cho hai biến cố $A$ và $B$ có $P(A) = 0,5$, $P(B) = 0,4$ và $P(A \\cup B) = 0,6$. Khẳng định nào sau đây là **đúng**?',
    options: [
      { id: 'A', text: 'Hai biến cố $A$ và $B$ độc lập' },
      { id: 'B', text: 'Hai biến cố $A$ và $B$ không độc lập' },
      { id: 'C', text: 'Hai biến cố $A$ và $B$ xung khắc' },
      { id: 'D', text: '$P(AB) = 0,2$' }
    ],
    correctOptionId: 'B',
    explanation: 'Ta có $P(AB) = P(A) + P(B) - P(A \\cup B) = 0,5 + 0,4 - 0,6 = 0,3$. Mặt khác $P(A) \\cdot P(B) = 0,5 \\cdot 0,4 = 0,2 \\ne 0,3$. Vì $P(AB) \\ne P(A)P(B)$ nên $A$ và $B$ không độc lập.'
  },
  {
    prompt: 'Một máy bay có $2$ động cơ hoạt động độc lập. Xác suất để động cơ I hoạt động tốt là $0,95$ và động cơ II hoạt động tốt là $0,90$. Máy bay bay an toàn nếu có ít nhất một động cơ hoạt động tốt. Xác suất để máy bay bay an toàn là:',
    options: [
      { id: 'A', text: '$0,995$' },
      { id: 'B', text: '$0,855$' },
      { id: 'C', text: '$0,985$' },
      { id: 'D', text: '$0,990$' }
    ],
    correctOptionId: 'A',
    explanation: 'Xác suất cả $2$ động cơ cùng hỏng là $(1 - 0,95)(1 - 0,90) = 0,05 \\cdot 0,10 = 0,005$. Xác suất máy bay bay an toàn là $1 - 0,005 = 0,995$.'
  }
];

const b30P2A: CompactTF[] = [
  {
    stem: 'Hai vận động viên cầu lông An và Bình thi đấu ở hai bảng khác nhau một cách độc lập. Xác suất lọt vào vòng bán kết của An là $0,7$ và của Bình là $0,6$. Xét tính đúng sai của các mệnh đề sau:',
    statements: [
      {
        id: 'a',
        text: 'Xác suất để cả An và Bình đều lọt vào vòng bán kết là $0,42$.',
        isTrue: true,
        explanation: 'Đúng vì $P(AB) = 0,7 \\cdot 0,6 = 0,42$.'
      },
      {
        id: 'b',
        text: 'Xác suất để cả An và Bình đều không lọt vào vòng bán kết là $0,12$.',
        isTrue: true,
        explanation: 'Đúng vì $P(\\overline{A}\\,\\overline{B}) = (1 - 0,7)(1 - 0,6) = 0,3 \\cdot 0,4 = 0,12$.'
      },
      {
        id: 'c',
        text: 'Xác suất để An lọt vào bán kết nhưng Bình không lọt vào bán kết là $0,28$.',
        isTrue: true,
        explanation: 'Đúng vì $P(A\\overline{B}) = 0,7 \\cdot (1 - 0,6) = 0,28$.'
      },
      {
        id: 'd',
        text: 'Xác suất để có ít nhất một trong hai người lọt vào vòng bán kết là $0,58$.',
        isTrue: false,
        explanation: 'Sai vì $P(A \\cup B) = 1 - P(\\overline{A}\\,\\overline{B}) = 1 - 0,12 = 0,88$.'
      }
    ]
  },
  {
    stem: 'Một hạt giống loại I có xác suất nảy mầm là $0,9$. Gieo độc lập $3$ hạt giống loại I vào $3$ chậu khác nhau. Xét tính đúng sai của các mệnh đề sau:',
    statements: [
      {
        id: 'a',
        text: 'Xác suất để một hạt giống không nảy mầm là $0,1$.',
        isTrue: true,
        explanation: 'Đúng vì $1 - 0,9 = 0,1$.'
      },
      {
        id: 'b',
        text: 'Xác suất để cả $3$ hạt giống đều nảy mầm là $0,729$.',
        isTrue: true,
        explanation: 'Đúng vì $(0,9)^3 = 0,729$.'
      },
      {
        id: 'c',
        text: 'Xác suất để cả $3$ hạt giống đều không nảy mầm là $0,001$.',
        isTrue: true,
        explanation: 'Đúng vì $(0,1)^3 = 0,001$.'
      },
      {
        id: 'd',
        text: 'Xác suất để có ít nhất $1$ hạt giống nảy mầm là $0,271$.',
        isTrue: false,
        explanation: 'Sai vì xác suất có ít nhất $1$ hạt nảy mầm là $1 - (0,1)^3 = 1 - 0,001 = 0,999$.'
      }
    ]
  }
];

const b30P3A: CompactSA[] = [
  {
    prompt: 'Cho hai biến cố độc lập $A$ và $B$ biết $P(A) = 0,65$ và $P(B) = 0,4$. Tính xác suất $P(AB)$ (viết kết quả dưới dạng số thập phân).',
    correctAnswer: '0,26',
    acceptedAnswers: ['0,26', '0.26'],
    explanation: 'Vì $A$ và $B$ độc lập nên $P(AB) = P(A) \\cdot P(B) = 0,65 \\cdot 0,4 = 0,26$.'
  },
  {
    prompt: 'Cho hai biến cố độc lập $A$ và $B$ biết $P(A) = 0,5$ và $P(A \\cup B) = 0,8$. Tính xác suất $P(B)$.',
    correctAnswer: '0,6',
    acceptedAnswers: ['0,6', '0.6', '0,60', '0.60'],
    explanation: 'Ta có $P(A \\cup B) = P(A) + P(B) - P(A)P(B) \\Leftrightarrow 0,8 = 0,5 + 0,5 P(B) \\Leftrightarrow 0,5 P(B) = 0,3 \\Leftrightarrow P(B) = 0,6$.'
  },
  {
    prompt: 'Hai hệ thống radar cảnh báo sớm hoạt động độc lập với xác suất phát hiện mục tiêu lần lượt là $0,85$ và $0,80$. Tính xác suất để mục tiêu bị phát hiện bởi ít nhất một hệ thống radar.',
    correctAnswer: '0,97',
    acceptedAnswers: ['0,97', '0.97'],
    explanation: 'Xác suất cả hai radar đều không phát hiện được là $(1 - 0,85)(1 - 0,80) = 0,15 \\cdot 0,20 = 0,03$. Vậy xác suất phát hiện được là $1 - 0,03 = 0,97$.'
  },
  {
    prompt: 'Một hộp I có $4$ quả cầu trắng, $6$ quả cầu đỏ; hộp II có $5$ quả cầu trắng, $5$ quả cầu đỏ. Lấy ngẫu nhiên từ mỗi hộp $1$ quả cầu. Tính xác suất để $2$ quả cầu lấy ra khác màu nhau.',
    correctAnswer: '0,5',
    acceptedAnswers: ['0,5', '0.5', '1/2'],
    explanation: 'Gọi $A$: "Hộp I ra trắng" ($P(A) = 0,4$) và $B$: "Hộp II ra trắng" ($P(B) = 0,5$). Xác suất $2$ quả khác màu là $P(A\\overline{B}) + P(\\overline{A}B) = 0,4 \\cdot 0,5 + 0,6 \\cdot 0,5 = 0,5$.'
  }
];

const b30P4A: CompactSO[] = [
  {
    prompt: 'Sắp xếp các bước tính xác suất có ít nhất một người bắn trúng bia khi hai xạ thủ bắn độc lập với xác suất trúng lần lượt là $0,75$ và $0,80$:',
    steps: [
      { id: '1', text: 'Gọi $A$: "Xạ thủ I bắn trúng" ($P(A) = 0,75$) và $B$: "Xạ thủ II bắn trúng" ($P(B) = 0,80$).' },
      { id: '2', text: 'Xét biến cố đối của $A \\cup B$ là $\\overline{A}\\,\\overline{B}$ ("Cả hai xạ thủ đều bắn trượt") với $P(\\overline{A}) = 0,25$ và $P(\\overline{B}) = 0,20$.' },
      { id: '3', text: 'Vì $\\overline{A}, \\overline{B}$ độc lập nên $P(\\overline{A}\\,\\overline{B}) = P(\\overline{A}) \\cdot P(\\overline{B}) = 0,25 \\cdot 0,20 = 0,05$.' },
      { id: '4', text: 'Kết luận xác suất có ít nhất một người bắn trúng là $P(A \\cup B) = 1 - 0,05 = 0,95$.' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Tính xác suất biến cố đối $P(\\overline{A}\\,\\overline{B}) = 0,25 \\cdot 0,20 = 0,05$, suy ra $P(A \\cup B) = 0,95$.'
  },
  {
    prompt: 'Sắp xếp các bước tìm $P(B)$ khi biết hai biến cố $A, B$ độc lập có $P(A) = 0,4$ và $P(A \\cup B) = 0,7$:',
    steps: [
      { id: '1', text: 'Áp dụng công thức cộng xác suất: $P(A \\cup B) = P(A) + P(B) - P(AB)$.' },
      { id: '2', text: 'Vì $A$ và $B$ độc lập nên thay $P(AB) = P(A) \\cdot P(B)$ vào công thức trên.' },
      { id: '3', text: 'Thay số $P(A) = 0,4$ và $P(A \\cup B) = 0,7$: $0,7 = 0,4 + P(B) - 0,4 P(B) \\Leftrightarrow 0,6 P(B) = 0,3$.' },
      { id: '4', text: 'Giải phương trình tìm được $P(B) = 0,5$.' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Thay $P(AB) = P(A)P(B)$ vào công thức cộng xác suất để giải tìm $P(B) = 0,5$.'
  },
  {
    prompt: 'Sắp xếp các bước kiểm tra tính độc lập của hai biến cố $A$ và $B$ biết $P(A) = 0,5, P(B) = 0,6$ và $P(A \\cup B) = 0,8$:',
    steps: [
      { id: '1', text: 'Từ công thức cộng xác suất, tính $P(AB) = P(A) + P(B) - P(A \\cup B)$.' },
      { id: '2', text: 'Thay số được $P(AB) = 0,5 + 0,6 - 0,8 = 0,3$.' },
      { id: '3', text: 'Tính tích xác suất: $P(A) \\cdot P(B) = 0,5 \\cdot 0,6 = 0,3$.' },
      { id: '4', text: 'Vì $P(AB) = P(A) \\cdot P(B) = 0,3$ nên kết luận hai biến cố $A$ và $B$ độc lập.' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Tính $P(AB) = 0,3$ và so sánh với $P(A)P(B) = 0,3$ để kết luận hai biến cố độc lập.'
  },
  {
    prompt: 'Sắp xếp các bước tính xác suất gieo một con xúc xắc cân đối $3$ lần liên tiếp có đúng $1$ lần xuất hiện mặt $6$ chấm:',
    steps: [
      { id: '1', text: 'Gọi $A_i$ ($i = 1, 2, 3$) là biến cố "Lần thứ $i$ xuất hiện mặt $6$ chấm", ta có $P(A_i) = \\frac{1}{6}$ và $P(\\overline{A_i}) = \\frac{5}{6}$.' },
      { id: '2', text: 'Biến cố $E$ ("Có đúng $1$ lần ra mặt $6$ chấm") là hợp của $3$ biến cố xung khắc: $A_1\\overline{A_2}\\,\\overline{A_3} \\cup \\overline{A_1}A_2\\overline{A_3} \\cup \\overline{A_1}\\,\\overline{A_2}A_3$.' },
      { id: '3', text: 'Vì các lần gieo độc lập nên mỗi trường hợp có xác suất bằng $\\frac{1}{6} \\cdot \\frac{5}{6} \\cdot \\frac{5}{6} = \\frac{25}{216}$.' },
      { id: '4', text: 'Cộng xác suất của $3$ trường hợp xung khắc: $P(E) = 3 \\cdot \\frac{25}{216} = \\frac{25}{72}$.' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Tách thành $3$ trường hợp xung khắc, mỗi trường hợp có xác suất $\\frac{25}{216}$, tổng bằng $\\frac{25}{72}$.'
  }
];

const b30P1B: CompactMC[] = [
  {
    prompt: 'Cho hai biến cố độc lập $A$ và $B$ với $P(A) = 0,7$ và $P(B) = 0,2$. Giá trị của $P(\\overline{A}B)$ bằng:',
    options: [
      { id: 'A', text: '$0,06$' },
      { id: 'B', text: '$0,14$' },
      { id: 'C', text: '$0,56$' },
      { id: 'D', text: '$0,24$' }
    ],
    correctOptionId: 'A',
    explanation: 'Vì $\\overline{A}$ và $B$ độc lập nên $P(\\overline{A}B) = P(\\overline{A}) \\cdot P(B) = (1 - 0,7) \\cdot 0,2 = 0,3 \\cdot 0,2 = 0,06$.'
  },
  {
    prompt: 'Tung một đồng xu cân đối và gieo một con xúc xắc cân đối một cách độc lập. Xác suất để đồng xu xuất hiện mặt Ngửa và con xúc xắc xuất hiện mặt $6$ chấm là:',
    options: [
      { id: 'A', text: '$\\frac{1}{12}$' },
      { id: 'B', text: '$\\frac{2}{3}$' },
      { id: 'C', text: '$\\frac{1}{6}$' },
      { id: 'D', text: '$\\frac{7}{12}$' }
    ],
    correctOptionId: 'A',
    explanation: 'Xác suất đồng xu ra Ngửa là $\\frac{1}{2}$ và xúc xắc ra $6$ chấm là $\\frac{1}{6}$. Vì hai phép thử độc lập nên $P = \\frac{1}{2} \\cdot \\frac{1}{6} = \\frac{1}{12}$.'
  },
  {
    prompt: 'Ba cầu thủ sút phạt đền độc lập (mỗi người sút $1$ quả). Xác suất sút vào lưới của ba cầu thủ lần lượt là $0,8; 0,7$ và $0,9$. Xác suất để cả ba cầu thủ đều sút vào lưới bằng:',
    options: [
      { id: 'A', text: '$0,504$' },
      { id: 'B', text: '$0,994$' },
      { id: 'C', text: '$0,496$' },
      { id: 'D', text: '$0,240$' }
    ],
    correctOptionId: 'A',
    explanation: 'Vì ba cầu thủ sút độc lập nên xác suất cả ba cùng sút vào là $0,8 \\cdot 0,7 \\cdot 0,9 = 0,504$.'
  },
  {
    prompt: 'Với ba cầu thủ ở câu trên ($0,8; 0,7; 0,9$), xác suất để có **ít nhất một cầu thủ** sút vào lưới bằng:',
    options: [
      { id: 'A', text: '$0,994$' },
      { id: 'B', text: '$0,504$' },
      { id: 'C', text: '$0,980$' },
      { id: 'D', text: '$0,996$' }
    ],
    correctOptionId: 'A',
    explanation: 'Xác suất cả ba cầu thủ đều sút trượt là $(1 - 0,8)(1 - 0,7)(1 - 0,9) = 0,2 \\cdot 0,3 \\cdot 0,1 = 0,006$. Vậy xác suất có ít nhất một người sút vào là $1 - 0,006 = 0,994$.'
  },
  {
    prompt: 'Một đề thi trắc nghiệm có $5$ câu hỏi, mỗi câu có $4$ phương án trong đó chỉ có $1$ phương án đúng. Một thí sinh khoanh ngẫu nhiên cả $5$ câu. Xác suất để thí sinh đó làm sai hết cả $5$ câu là:',
    options: [
      { id: 'A', text: '$\\left(\\frac{3}{4}\\right)^5$' },
      { id: 'B', text: '$\\left(\\frac{1}{4}\\right)^5$' },
      { id: 'C', text: '$1 - \\left(\\frac{3}{4}\\right)^5$' },
      { id: 'D', text: '$\\frac{15}{4}$' }
    ],
    correctOptionId: 'A',
    explanation: 'Xác suất chọn sai mỗi câu là $\\frac{3}{4}$. Vì $5$ câu độc lập nên xác suất sai cả $5$ câu là $\\left(\\frac{3}{4}\\right)^5$.'
  },
  {
    prompt: 'Hai máy tự động cùng sản xuất một loại linh kiện một cách độc lập. Tỉ lệ chính phẩm của máy I là $0,92$ và của máy II là $0,95$. Lấy ngẫu nhiên từ mỗi máy $1$ linh kiện. Xác suất để cả $2$ linh kiện lấy ra đều là phế phẩm bằng:',
    options: [
      { id: 'A', text: '$0,004$' },
      { id: 'B', text: '$0,874$' },
      { id: 'C', text: '$0,126$' },
      { id: 'D', text: '$0,040$' }
    ],
    correctOptionId: 'A',
    explanation: 'Xác suất phế phẩm của máy I là $1 - 0,92 = 0,08$; của máy II là $1 - 0,95 = 0,05$. Xác suất cả $2$ đều là phế phẩm là $0,08 \\cdot 0,05 = 0,004$.'
  },
  {
    prompt: 'Cho hai biến cố độc lập $A, B$ có $P(\\overline{A}) = 0,3$ và $P(\\overline{B}) = 0,4$. Khi đó $P(AB)$ bằng:',
    options: [
      { id: 'A', text: '$0,42$' },
      { id: 'B', text: '$0,12$' },
      { id: 'C', text: '$0,88$' },
      { id: 'D', text: '$0,58$' }
    ],
    correctOptionId: 'A',
    explanation: 'Ta có $P(A) = 1 - 0,3 = 0,7$ và $P(B) = 1 - 0,4 = 0,6$. Do $A, B$ độc lập nên $P(AB) = 0,7 \\cdot 0,6 = 0,42$.'
  },
  {
    prompt: 'Cho hai biến cố độc lập $A, B$ biết $P(A) = 0,4$ và $P(A\\overline{B}) = 0,28$. Giá trị của $P(B)$ bằng:',
    options: [
      { id: 'A', text: '$0,3$' },
      { id: 'B', text: '$0,7$' },
      { id: 'C', text: '$0,6$' },
      { id: 'D', text: '$0,12$' }
    ],
    correctOptionId: 'A',
    explanation: 'Vì $A, \\overline{B}$ độc lập nên $P(A\\overline{B}) = P(A)P(\\overline{B}) \\Rightarrow 0,28 = 0,4 P(\\overline{B}) \\Rightarrow P(\\overline{B}) = 0,7 \\Rightarrow P(B) = 0,3$.'
  },
  {
    prompt: 'Gieo một đồng xu cân đối $4$ lần liên tiếp. Xác suất để trong $4$ lần gieo có ít nhất một lần xuất hiện mặt Sấp là:',
    options: [
      { id: 'A', text: '$\\frac{15}{16}$' },
      { id: 'B', text: '$\\frac{1}{16}$' },
      { id: 'C', text: '$\\frac{3}{4}$' },
      { id: 'D', text: '$\\frac{7}{8}$' }
    ],
    correctOptionId: 'A',
    explanation: 'Xác suất cả $4$ lần đều ra mặt Ngửa là $\\left(\\frac{1}{2}\\right)^4 = \\frac{1}{16}$. Vậy xác suất có ít nhất một lần ra mặt Sấp là $1 - \\frac{1}{16} = \\frac{15}{16}$.'
  },
  {
    prompt: 'Một mạch điện gồm hai công tắc $K_1, K_2$ mắc **nối tiếp** hoạt động độc lập. Xác suất đóng mạch của $K_1$ là $0,9$ và của $K_2$ là $0,8$. Xác suất để dòng điện chạy qua được đoạn mạch đó là:',
    options: [
      { id: 'A', text: '$0,72$' },
      { id: 'B', text: '$0,98$' },
      { id: 'C', text: '$0,28$' },
      { id: 'D', text: '$0,85$' }
    ],
    correctOptionId: 'A',
    explanation: 'Mạch nối tiếp chỉ thông mạch khi cả hai công tắc $K_1$ và $K_2$ cùng đóng, nên xác suất bằng $0,9 \\cdot 0,8 = 0,72$.'
  },
  {
    prompt: 'Nếu hai công tắc $K_1, K_2$ ở câu trên ($P(K_1) = 0,9, P(K_2) = 0,8$) được mắc **song song** thì xác suất để dòng điện chạy qua được đoạn mạch là:',
    options: [
      { id: 'A', text: '$0,98$' },
      { id: 'B', text: '$0,72$' },
      { id: 'C', text: '$0,90$' },
      { id: 'D', text: '$0,80$' }
    ],
    correctOptionId: 'A',
    explanation: 'Mạch song song thông mạch khi có ít nhất một công tắc đóng, nên xác suất bằng $1 - (1 - 0,9)(1 - 0,8) = 1 - 0,02 = 0,98$.'
  },
  {
    prompt: 'Một chiếc hộp có $5$ tấm thẻ đánh số từ $1$ đến $5$. Rút ngẫu nhiên $1$ thẻ, ghi lại số rồi trả thẻ lại vào hộp, sau đó rút tiếp ngẫu nhiên $1$ thẻ lần thứ hai. Xác suất để cả hai lần đều rút được thẻ ghi số lẻ là:',
    options: [
      { id: 'A', text: '$\\frac{9}{25}$' },
      { id: 'B', text: '$\\frac{3}{10}$' },
      { id: 'C', text: '$\\frac{6}{25}$' },
      { id: 'D', text: '$\\frac{16}{25}$' }
    ],
    correctOptionId: 'A',
    explanation: 'Vì rút có hoàn lại nên hai lần rút độc lập, mỗi lần có xác suất ra số lẻ là $\\frac{3}{5}$. Vậy xác suất cần tìm là $\\frac{3}{5} \\cdot \\frac{3}{5} = \\frac{9}{25}$.'
  }
];

const b30P2B: CompactTF[] = [
  {
    stem: 'Hai bệnh nhân A và B độc lập với nhau cùng thực hiện một xét nghiệm y khoa. Xác suất để xét nghiệm cho kết quả dương tính đối với bệnh nhân A là $0,2$ và đối với bệnh nhân B là $0,3$. Xét tính đúng sai của các mệnh đề sau:',
    statements: [
      {
        id: 'a',
        text: 'Xác suất để cả hai bệnh nhân đều có kết quả dương tính là $0,06$.',
        isTrue: true,
        explanation: 'Đúng vì $0,2 \\cdot 0,3 = 0,06$.'
      },
      {
        id: 'b',
        text: 'Xác suất để cả hai bệnh nhân đều có kết quả âm tính là $0,56$.',
        isTrue: true,
        explanation: 'Đúng vì $(1 - 0,2)(1 - 0,3) = 0,8 \\cdot 0,7 = 0,56$.'
      },
      {
        id: 'c',
        text: 'Xác suất để có ít nhất một bệnh nhân có kết quả dương tính là $0,50$.',
        isTrue: false,
        explanation: 'Sai vì $P(A \\cup B) = 1 - 0,56 = 0,44 \\ne 0,50$.'
      },
      {
        id: 'd',
        text: 'Xác suất để chỉ có đúng một bệnh nhân có kết quả dương tính là $0,38$.',
        isTrue: true,
        explanation: 'Đúng vì $0,2 \\cdot 0,7 + 0,8 \\cdot 0,3 = 0,14 + 0,24 = 0,38$.'
      }
    ]
  },
  {
    stem: 'Một hộp I chứa $3$ viên bi xanh, $2$ viên bi đỏ; hộp II chứa $2$ viên bi xanh, $3$ viên bi đỏ. Lấy ngẫu nhiên từ mỗi hộp ra $1$ viên bi. Gọi $A$ là biến cố "Viên bi lấy từ hộp I màu xanh" và $B$ là biến cố "Viên bi lấy từ hộp II màu xanh". Xét tính đúng sai của các mệnh đề sau:',
    statements: [
      {
        id: 'a',
        text: 'Hai biến cố $A$ và $B$ là hai biến cố độc lập với $P(A) = 0,6$ và $P(B) = 0,4$.',
        isTrue: true,
        explanation: 'Đúng vì việc lấy bi ở hai hộp độc lập nhau, $P(A) = \\frac{3}{5} = 0,6$ và $P(B) = \\frac{2}{5} = 0,4$.'
      },
      {
        id: 'b',
        text: 'Xác suất để cả hai viên bi lấy ra đều màu xanh là $0,24$.',
        isTrue: true,
        explanation: 'Đúng vì $P(AB) = 0,6 \\cdot 0,4 = 0,24$.'
      },
      {
        id: 'c',
        text: 'Xác suất để cả hai viên bi lấy ra đều màu đỏ là $0,24$.',
        isTrue: true,
        explanation: 'Đúng vì $P(\\overline{A}\\,\\overline{B}) = 0,4 \\cdot 0,6 = 0,24$.'
      },
      {
        id: 'd',
        text: 'Xác suất để hai viên bi lấy ra có cùng màu là $0,52$.',
        isTrue: false,
        explanation: 'Sai vì xác suất hai viên bi cùng màu là $P(AB) + P(\\overline{A}\\,\\overline{B}) = 0,24 + 0,24 = 0,48$.'
      }
    ]
  }
];

const b30P3B: CompactSA[] = [
  {
    prompt: 'Cho hai biến cố độc lập $A$ và $B$ biết $P(\\overline{A}) = 0,25$ và $P(B) = 0,6$. Tính xác suất $P(AB)$ (viết kết quả dưới dạng số thập phân).',
    correctAnswer: '0,45',
    acceptedAnswers: ['0,45', '0.45'],
    explanation: 'Ta có $P(A) = 1 - 0,25 = 0,75$. Vì $A, B$ độc lập nên $P(AB) = 0,75 \\cdot 0,6 = 0,45$.'
  },
  {
    prompt: 'Hai vận động viên bắn súng độc lập, mỗi người bắn $1$ viên đạn vào bia. Xác suất bắn trúng của người thứ nhất là $0,7$ và của người thứ hai là $0,8$. Tính xác suất để có đúng một người bắn trúng bia.',
    correctAnswer: '0,38',
    acceptedAnswers: ['0,38', '0.38'],
    explanation: 'Xác suất đúng một người bắn trúng là $0,7 \\cdot (1 - 0,8) + (1 - 0,7) \\cdot 0,8 = 0,14 + 0,24 = 0,38$.'
  },
  {
    prompt: 'Một mật khẩu gồm $2$ chữ số được tạo ngẫu nhiên và độc lập, mỗi chữ số được chọn từ tập $\\{0; 1; 2; 3; 4\\}$. Tính xác suất để cả $2$ chữ số đều là chữ số chẵn.',
    correctAnswer: '0,36',
    acceptedAnswers: ['0,36', '0.36', '9/25'],
    explanation: 'Trong tập $\\{0; 1; 2; 3; 4\\}$ có $3$ chữ số chẵn ($0, 2, 4$), nên xác suất mỗi chữ số là số chẵn bằng $\\frac{3}{5} = 0,6$. Xác suất cả $2$ chữ số đều chẵn là $0,6 \\cdot 0,6 = 0,36$.'
  },
  {
    prompt: 'Cho hai biến cố độc lập $A$ và $B$ có $P(A) = 0,4$ và $P(A \\cup B) = 0,82$. Tính xác suất $P(B)$.',
    correctAnswer: '0,7',
    acceptedAnswers: ['0,7', '0.7', '0,70', '0.70'],
    explanation: 'Từ $P(A \\cup B) = P(A) + P(B) - P(A)P(B) \\Rightarrow 0,82 = 0,4 + 0,6 P(B) \\Rightarrow 0,6 P(B) = 0,42 \\Rightarrow P(B) = 0,7$.'
  }
];

const b30P4B: CompactSO[] = [
  {
    prompt: 'Sắp xếp các bước tính xác suất lấy được $2$ quả cầu cùng màu khi lấy mỗi hộp $1$ quả (Hộp I: $3$ đỏ, $2$ xanh; Hộp II: $2$ đỏ, $3$ xanh):',
    steps: [
      { id: '1', text: 'Gọi $A$: "Hộp I ra cầu đỏ" ($P(A) = 0,6, P(\\overline{A}) = 0,4$) và $B$: "Hộp II ra cầu đỏ" ($P(B) = 0,4, P(\\overline{B}) = 0,6$).' },
      { id: '2', text: 'Biến cố $E$ ("Hai quả cầu cùng màu") là hợp của hai biến cố xung khắc: $AB$ (cùng đỏ) và $\\overline{A}\\,\\overline{B}$ (cùng xanh).' },
      { id: '3', text: 'Áp dụng công thức nhân cho các biến cố độc lập: $P(AB) = 0,6 \\cdot 0,4 = 0,24$ và $P(\\overline{A}\\,\\overline{B}) = 0,4 \\cdot 0,6 = 0,24$.' },
      { id: '4', text: 'Áp dụng công thức cộng: $P(E) = P(AB) + P(\\overline{A}\\,\\overline{B}) = 0,24 + 0,24 = 0,48$.' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Tách thành hai trường hợp xung khắc "cùng đỏ" ($AB$) và "cùng xanh" ($\\overline{A}\\,\\overline{B}$), nhân rồi cộng xác suất.'
  },
  {
    prompt: 'Sắp xếp các bước tìm số lần bắn tối thiểu $n$ để xác suất bắn trúng mục tiêu ít nhất $1$ lần lớn hơn $0,99$ khi xác suất bắn trúng mỗi viên là $0,8$:',
    steps: [
      { id: '1', text: 'Xác suất bắn trượt trong mỗi lần bắn là $1 - 0,8 = 0,2$.' },
      { id: '2', text: 'Vì $n$ lần bắn độc lập nên xác suất bắn trượt cả $n$ lần là $(0,2)^n$.' },
      { id: '3', text: 'Xác suất bắn trúng ít nhất $1$ lần là $1 - (0,2)^n > 0,99 \\Leftrightarrow (0,2)^n < 0,01$.' },
      { id: '4', text: 'Vì $(0,2)^2 = 0,04$ và $(0,2)^3 = 0,008 < 0,01$ nên cần bắn ít nhất $n = 3$ viên.' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Dùng biến cố đối $1 - (0,2)^n > 0,99 \\Leftrightarrow (0,2)^n < 0,01 \\Rightarrow n \\ge 3$.'
  },
  {
    prompt: 'Sắp xếp các bước chứng minh nếu $A$ và $B$ độc lập thì $A$ và $\\overline{B}$ cũng độc lập (tức $P(A\\overline{B}) = P(A)P(\\overline{B})$):',
    steps: [
      { id: '1', text: 'Tách biến cố $A$ thành hợp của hai biến cố xung khắc: $A = AB \\cup A\\overline{B}$.' },
      { id: '2', text: 'Áp dụng công thức cộng xác suất: $P(A) = P(AB) + P(A\\overline{B}) \\Rightarrow P(A\\overline{B}) = P(A) - P(AB)$.' },
      { id: '3', text: 'Vì $A$ và $B$ độc lập nên thay $P(AB) = P(A) \\cdot P(B)$: $P(A\\overline{B}) = P(A) - P(A)P(B) = P(A)[1 - P(B)]$.' },
      { id: '4', text: 'Do $1 - P(B) = P(\\overline{B})$ nên $P(A\\overline{B}) = P(A) \\cdot P(\\overline{B})$ (điều phải chứng minh).' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Từ $P(A\\overline{B}) = P(A) - P(AB) = P(A)[1 - P(B)] = P(A)P(\\overline{B})$.'
  },
  {
    prompt: 'Sắp xếp các bước tính xác suất mạch điện gồm công tắc $K_1$ mắc nối tiếp với cụm $(K_2 \\parallel K_3)$ đóng mạch khi $P(K_1) = 0,9, P(K_2) = 0,8, P(K_3) = 0,7$:',
    steps: [
      { id: '1', text: 'Xét cụm mắc song song $(K_2 \\parallel K_3)$: xác suất cả $K_2$ và $K_3$ cùng hở là $(1 - 0,8)(1 - 0,7) = 0,06$.' },
      { id: '2', text: 'Suy ra xác suất cụm $(K_2 \\parallel K_3)$ thông mạch là $P(K_2 \\cup K_3) = 1 - 0,06 = 0,94$.' },
      { id: '3', text: 'Toàn mạch thông khi cả $K_1$ và cụm $(K_2 \\parallel K_3)$ cùng thông mạch.' },
      { id: '4', text: 'Vì các công tắc độc lập nên xác suất toàn mạch thông là $0,9 \\cdot 0,94 = 0,846$.' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Tính xác suất nhánh song song $1 - 0,2 \\cdot 0,3 = 0,94$, sau đó nhân với xác suất của $K_1$ là $0,9$ được $0,846$.'
  }
];

// ============================================================================
// ÔN TẬP CHƯƠNG VIII. CÁC QUY TẮC TÍNH XÁC SUẤT
// Tổng hợp toàn chương VIII (Bài 28, Bài 29, Bài 30)
// ============================================================================

const ch8RevP1A: CompactMC[] = [
  b28P1A[2], b28P1A[7], b28P1A[9], b28P1A[11],
  b29P1A[1], b29P1A[3], b29P1A[6], b29P1A[8],
  b30P1A[1], b30P1A[4], b30P1A[5], b30P1A[11]
];

const ch8RevP1B: CompactMC[] = [
  b28P1B[3], b28P1B[6], b28P1B[8], b28P1B[11],
  b29P1B[2], b29P1B[3], b29P1B[6], b29P1B[9],
  b30P1B[2], b30P1B[3], b30P1B[9], b30P1B[10]
];

const ch8RevP2A: CompactTF[] = [b29P2A[0], b30P2A[0]];
const ch8RevP2B: CompactTF[] = [b28P2B[0], b30P2B[1]];
const ch8RevP3A: CompactSA[] = [b28P3A[0], b29P3A[1], b30P3A[1], b30P3A[2]];
const ch8RevP3B: CompactSA[] = [b28P3B[3], b29P3B[1], b29P3B[3], b30P3B[1]];
const ch8RevP4A: CompactSO[] = [b28P4A[2], b29P4A[0], b30P4A[0], b30P4A[2]];
const ch8RevP4B: CompactSO[] = [b28P4B[0], b29P4B[1], b30P4B[0], b30P4B[3]];

export const chapter8LessonExams: Record<string, ExamSet[]> = {
  'bai-28': [
    buildCompactLessonExamSet(
      'bai-28-de-1',
      'Đề ôn Bài 28 – Đề số 01',
      'Bài 28. Biến cố hợp, biến cố giao, biến cố độc lập',
      1,
      b28P1A, b28P2A, b28P3A, b28P4A
    ),
    buildCompactLessonExamSet(
      'bai-28-de-2',
      'Đề ôn Bài 28 – Đề số 02',
      'Bài 28. Biến cố hợp, biến cố giao, biến cố độc lập',
      2,
      b28P1B, b28P2B, b28P3B, b28P4B
    )
  ],
  'bai-29': [
    buildCompactLessonExamSet(
      'bai-29-de-1',
      'Đề ôn Bài 29 – Đề số 01',
      'Bài 29. Công thức cộng xác suất',
      1,
      b29P1A, b29P2A, b29P3A, b29P4A
    ),
    buildCompactLessonExamSet(
      'bai-29-de-2',
      'Đề ôn Bài 29 – Đề số 02',
      'Bài 29. Công thức cộng xác suất',
      2,
      b29P1B, b29P2B, b29P3B, b29P4B
    )
  ],
  'bai-30': [
    buildCompactLessonExamSet(
      'bai-30-de-1',
      'Đề ôn Bài 30 – Đề số 01',
      'Bài 30. Công thức nhân xác suất cho hai biến cố độc lập',
      1,
      b30P1A, b30P2A, b30P3A, b30P4A
    ),
    buildCompactLessonExamSet(
      'bai-30-de-2',
      'Đề ôn Bài 30 – Đề số 02',
      'Bài 30. Công thức nhân xác suất cho hai biến cố độc lập',
      2,
      b30P1B, b30P2B, b30P3B, b30P4B
    )
  ],
  'on-tap-chuong-8': [
    buildCompactLessonExamSet(
      'on-tap-chuong-8-de-1',
      'Đề ôn Chương VIII – Đề số 01',
      'Ôn tập chương VIII. Các quy tắc tính xác suất',
      1,
      ch8RevP1A, ch8RevP2A, ch8RevP3A, ch8RevP4A
    ),
    buildCompactLessonExamSet(
      'on-tap-chuong-8-de-2',
      'Đề ôn Chương VIII – Đề số 02',
      'Ôn tập chương VIII. Các quy tắc tính xác suất',
      2,
      ch8RevP1B, ch8RevP2B, ch8RevP3B, ch8RevP4B
    )
  ]
};
