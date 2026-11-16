import {
  ExamSet,
  MultipleChoiceQuestion,
  TrueFalseQuestion,
  ShortAnswerQuestion,
  StepOrderingQuestion,
} from '../../types/exam';
import { buildLessonExamSet } from './chapter1';

// ============================================================================
// BÀI 5. DÃY SỐ (2 Đề ôn riêng biệt)
// ============================================================================
const bai5De1P1: Omit<MultipleChoiceQuestion, 'id' | 'part' | 'number' | 'points'>[] = [
  {
    topic: 'Bài 5. Dãy số',
    prompt: 'Cho dãy số $(u_n)$ có số hạng tổng quát $u_n = 4n - 3$ ($n \\in \\mathbb{N}^*$). Số hạng thứ $6$ của dãy số là:',
    options: [
      { key: 'A', content: '$u_6 = 21$' },
      { key: 'B', content: '$u_6 = 24$' },
      { key: 'C', content: '$u_6 = 17$' },
      { key: 'D', content: '$u_6 = 27$' },
    ],
    correctAnswer: 'A',
    explanation: 'Thay $n = 6$ vào công thức số hạng tổng quát: $u_6 = 4 \\cdot 6 - 3 = 21$.',
    pedagogicalTip: 'Thay trực tiếp chỉ số $n = 6$ vào biểu thức $u_n$.',
  },
  {
    topic: 'Bài 5. Dãy số',
    prompt: 'Cho dãy số $(u_n)$ với $u_n = \\frac{2n + 1}{n + 2}$. Số hạng $u_4$ của dãy số bằng:',
    options: [
      { key: 'A', content: '$\\frac{3}{2}$' },
      { key: 'B', content: '$\\frac{9}{4}$' },
      { key: 'C', content: '$\\frac{7}{5}$' },
      { key: 'D', content: '$2$' },
    ],
    correctAnswer: 'A',
    explanation: 'Thay $n = 4$: $u_4 = \\frac{2 \\cdot 4 + 1}{4 + 2} = \\frac{9}{6} = \\frac{3}{2}$.',
    pedagogicalTip: 'Rút gọn phân số sau khi thay $n = 4$.',
  },
  {
    topic: 'Bài 5. Dãy số',
    prompt: 'Cho dãy số $(u_n)$ xác định bởi hệ thức truy hồi $u_1 = 2$ và $u_n = 2u_{n-1} + 3$ với mọi $n \\ge 2$. Số hạng thứ $3$ của dãy số là:',
    options: [
      { key: 'A', content: '$17$' },
      { key: 'B', content: '$7$' },
      { key: 'C', content: '$13$' },
      { key: 'D', content: '$37$' },
    ],
    correctAnswer: 'A',
    explanation: 'Ta tính lần lượt: $u_2 = 2u_1 + 3 = 2 \\cdot 2 + 3 = 7$; $u_3 = 2u_2 + 3 = 2 \\cdot 7 + 3 = 17$.',
    pedagogicalTip: 'Với hệ thức truy hồi, tính tuần tự $u_1 \\to u_2 \\to u_3$.',
  },
  {
    topic: 'Bài 5. Dãy số',
    prompt: 'Xét dãy số hữu hạn gồm $5$ số hạng đầu của dãy $u_n = (-1)^n \\cdot 2n$. Số hạng đầu và số hạng cuối của dãy hữu hạn này lần lượt là:',
    options: [
      { key: 'A', content: '$-2$ và $-10$' },
      { key: 'B', content: '$2$ và $10$' },
      { key: 'C', content: '$-2$ và $10$' },
      { key: 'D', content: '$2$ và $-10$' },
    ],
    correctAnswer: 'A',
    explanation: 'Khi $n = 1 \\Rightarrow u_1 = (-1)^1 \\cdot 2 = -2$; khi $n = 5 \\Rightarrow u_5 = (-1)^5 \\cdot 10 = -10$.',
    pedagogicalTip: 'Lưu ý $(-1)^n = -1$ khi $n$ là số nguyên dương lẻ.',
  },
  {
    topic: 'Bài 5. Dãy số',
    prompt: 'Trong các dãy số $(u_n)$ cho bởi số hạng tổng quát dưới đây, dãy số nào là **dãy số tăng**?',
    options: [
      { key: 'A', content: '$u_n = 5n - 4$' },
      { key: 'B', content: '$u_n = 7 - 3n$' },
      { key: 'C', content: '$u_n = \\frac{1}{n}$' },
      { key: 'D', content: '$u_n = (-2)^n$' },
    ],
    correctAnswer: 'A',
    explanation: 'Xét hiệu $u_{n+1} - u_n = [5(n + 1) - 4] - (5n - 4) = 5 > 0, \\forall n \\in \\mathbb{N}^*$, nên dãy số $u_n = 5n - 4$ là dãy số tăng.',
    pedagogicalTip: 'Dãy số bậc nhất $u_n = an + b$ tăng khi hệ số $a > 0$.',
  },
  {
    topic: 'Bài 5. Dãy số',
    prompt: 'Trong các dãy số $(u_n)$ sau, dãy số nào là **dãy số giảm**?',
    options: [
      { key: 'A', content: '$u_n = \\frac{3}{n + 1}$' },
      { key: 'B', content: '$u_n = n^2 + 1$' },
      { key: 'C', content: '$u_n = 2n + 5$' },
      { key: 'D', content: '$u_n = 3^n$' },
    ],
    correctAnswer: 'A',
    explanation: 'Vì $n + 2 > n + 1 > 0$ nên $\\frac{3}{n + 2} < \\frac{3}{n + 1} \\Leftrightarrow u_{n+1} < u_n, \\forall n \\in \\mathbb{N}^*$. Vậy dãy số giảm.',
    pedagogicalTip: 'Khi mẫu số dương tăng dần và tử số dương không đổi thì phân thức giảm dần.',
  },
  {
    topic: 'Bài 5. Dãy số',
    prompt: 'Cho dãy số $(u_n)$ với $u_n = n^2 - 4n + 7$. Số hạng thứ $9$ của dãy số bằng:',
    options: [
      { key: 'A', content: '$52$' },
      { key: 'B', content: '$45$' },
      { key: 'C', content: '$60$' },
      { key: 'D', content: '$38$' },
    ],
    correctAnswer: 'A',
    explanation: 'Thay $n = 9$: $u_9 = 9^2 - 4 \\cdot 9 + 7 = 81 - 36 + 7 = 52$.',
    pedagogicalTip: 'Thay $n = 9$ vào công thức bậc hai.',
  },
  {
    topic: 'Bài 5. Dãy số',
    prompt: 'Số $\\frac{8}{15}$ là số hạng thứ bao nhiêu của dãy số $(u_n)$ có $u_n = \\frac{n + 1}{2n + 1}$?',
    options: [
      { key: 'A', content: 'Số hạng thứ $7$' },
      { key: 'B', content: 'Số hạng thứ $8$' },
      { key: 'C', content: 'Số hạng thứ $6$' },
      { key: 'D', content: 'Số hạng thứ $9$' },
    ],
    correctAnswer: 'A',
    explanation: 'Giải phương trình $\\frac{n + 1}{2n + 1} = \\frac{8}{15} \\Leftrightarrow 15(n + 1) = 8(2n + 1) \\Leftrightarrow 15n + 15 = 16n + 8 \\Leftrightarrow n = 7$.',
    pedagogicalTip: 'Đặt $u_n = \\frac{8}{15}$ rồi giải tìm $n \\in \\mathbb{N}^*$.',
  },
  {
    topic: 'Bài 5. Dãy số',
    prompt: 'Dãy số $(u_n)$ với $u_n = \\frac{2n - 1}{n}$ bị chặn trên bởi số nào sau đây?',
    options: [
      { key: 'A', content: '$2$' },
      { key: 'B', content: '$1$' },
      { key: 'C', content: '$\\frac{3}{2}$' },
      { key: 'D', content: '$0$' },
    ],
    correctAnswer: 'A',
    explanation: 'Ta có $u_n = 2 - \\frac{1}{n} < 2, \\forall n \\in \\mathbb{N}^*$, nên dãy số bị chặn trên bởi $2$.',
    pedagogicalTip: 'Chia tử cho mẫu: $\\frac{2n - 1}{n} = 2 - \\frac{1}{n} < 2$.',
  },
  {
    topic: 'Bài 5. Dãy số',
    prompt: 'Trong các dãy số sau, dãy số nào là **dãy số bị chặn** (vừa bị chặn trên, vừa bị chặn dưới)?',
    options: [
      { key: 'A', content: '$u_n = \\frac{n + 3}{n + 1}$' },
      { key: 'B', content: '$u_n = 2n + 1$' },
      { key: 'C', content: '$u_n = -n^2$' },
      { key: 'D', content: '$u_n = 3^n$' },
    ],
    correctAnswer: 'A',
    explanation: 'Ta có $u_n = 1 + \\frac{2}{n + 1}$. Vì $0 < \\frac{2}{n + 1} \\le 1, \\forall n \\ge 1$ nên $1 < u_n \\le 2$, suy ra dãy số bị chặn.',
    pedagogicalTip: 'Phân thức bậc nhất trên bậc nhất luôn tạo thành dãy số bị chặn.',
  },
  {
    topic: 'Bài 5. Dãy số',
    prompt: 'Cho dãy số $\\frac{1}{3}, \\frac{1}{9}, \\frac{1}{27}, \\frac{1}{81}, \\dots$. Công thức số hạng tổng quát $u_n$ của dãy số này là:',
    options: [
      { key: 'A', content: '$u_n = \\frac{1}{3^n}$' },
      { key: 'B', content: '$u_n = \\frac{1}{3^{n-1}}$' },
      { key: 'C', content: '$u_n = \\frac{1}{3n}$' },
      { key: 'D', content: '$u_n = \\frac{n}{3^n}$' },
    ],
    correctAnswer: 'A',
    explanation: 'Với $n = 1 \\Rightarrow u_1 = \\frac{1}{3^1} = \\frac{1}{3}$; $n = 2 \\Rightarrow u_2 = \\frac{1}{3^2} = \\frac{1}{9}$. Vậy $u_n = \\frac{1}{3^n}$.',
    pedagogicalTip: 'Đối chiếu tại $n = 1, 2, 3$ để chọn công thức tổng quát chính xác.',
  },
  {
    topic: 'Bài 5. Dãy số',
    prompt: 'Dãy số $(u_n)$ với $u_n = (-1)^n + 4$ có tập hợp tất cả các giá trị của các số hạng là:',
    options: [
      { key: 'A', content: '$\\{3; 5\\}$' },
      { key: 'B', content: '$\\{-1; 1\\}$' },
      { key: 'C', content: '$\\{3; 4; 5\\}$' },
      { key: 'D', content: '$[3; 5]$' },
    ],
    correctAnswer: 'A',
    explanation: 'Khi $n$ lẻ thì $u_n = -1 + 4 = 3$; khi $n$ chẵn thì $u_n = 1 + 4 = 5$.',
    pedagogicalTip: 'Xét hai trường hợp $n$ chẵn và $n$ lẻ.',
  },
];

const bai5De1P2: Omit<TrueFalseQuestion, 'id' | 'part' | 'number'>[] = [
  {
    topic: 'Bài 5. Dãy số',
    prompt: 'Cho dãy số $(u_n)$ có số hạng tổng quát $u_n = \\frac{3n + 1}{n + 1}$ với $n \\in \\mathbb{N}^*$. Xét tính đúng sai của các mệnh đề sau:',
    statements: [
      {
        id: 'a',
        label: 'a',
        statement: 'Số hạng đầu tiên của dãy số là $u_1 = 2$.',
        isCorrect: true,
        explanation: 'Thay $n = 1$: $u_1 = \\frac{3 \\cdot 1 + 1}{1 + 1} = \\frac{4}{2} = 2$.',
      },
      {
        id: 'b',
        label: 'b',
        statement: 'Ta có thể viết lại $u_n = 3 - \\frac{2}{n + 1}$ với mọi $n \\in \\mathbb{N}^*$.',
        isCorrect: true,
        explanation: 'Ta có $\\frac{3n + 1}{n + 1} = \\frac{3(n + 1) - 2}{n + 1} = 3 - \\frac{2}{n + 1}$.',
      },
      {
        id: 'c',
        label: 'c',
        statement: 'Dãy số $(u_n)$ là một dãy số giảm.',
        isCorrect: false,
        explanation: 'Xét $u_{n+1} - u_n = \\frac{2}{n + 1} - \\frac{2}{n + 2} = \\frac{2}{(n + 1)(n + 2)} > 0, \\forall n \\in \\mathbb{N}^*$, nên $(u_n)$ là dãy số tăng.',
      },
      {
        id: 'd',
        label: 'd',
        statement: 'Với mọi $n \\in \\mathbb{N}^*$, ta luôn có $2 \\le u_n < 3$ nên dãy số $(u_n)$ bị chặn.',
        isCorrect: true,
        explanation: 'Vì $n \\ge 1 \\Rightarrow 0 < \\frac{2}{n + 1} \\le 1 \\Rightarrow 2 \\le 3 - \\frac{2}{n + 1} < 3$.',
      },
    ],
    pedagogicalTip: 'Tách phần nguyên của phân thức giúp vừa xét tính đơn điệu, vừa xét tính bị chặn.',
  },
  {
    topic: 'Bài 5. Dãy số',
    prompt: 'Cho dãy số $(u_n)$ được xác định bởi hệ thức truy hồi $u_1 = 3$ và $u_{n+1} = u_n + 4$ với mọi $n \\ge 1$. Xét tính đúng sai của các mệnh đề sau:',
    statements: [
      {
        id: 'a',
        label: 'a',
        statement: 'Số hạng thứ hai và thứ ba của dãy số lần lượt là $u_2 = 7$ và $u_3 = 11$.',
        isCorrect: true,
        explanation: 'Ta có $u_2 = 3 + 4 = 7$ và $u_3 = 7 + 4 = 11$.',
      },
      {
        id: 'b',
        label: 'b',
        statement: 'Dãy số $(u_n)$ là một dãy số tăng.',
        isCorrect: true,
        explanation: 'Vì $u_{n+1} - u_n = 4 > 0, \\forall n \\in \\mathbb{N}^*$ nên dãy số tăng.',
      },
      {
        id: 'c',
        label: 'c',
        statement: 'Dãy số $(u_n)$ bị chặn trên bởi $100$.',
        isCorrect: false,
        explanation: 'Vì $u_n = 4n - 1$ tăng ra dương vô cực khi $n$ tăng nên không bị chặn trên.',
      },
      {
        id: 'd',
        label: 'd',
        statement: 'Dãy số $(u_n)$ bị chặn dưới bởi $3$.',
        isCorrect: true,
        explanation: 'Vì dãy số tăng và $u_1 = 3$ nên $u_n \\ge 3, \\forall n \\in \\mathbb{N}^*$.',
      },
    ],
    pedagogicalTip: 'Mọi dãy số tăng đều bị chặn dưới bởi số hạng đầu $u_1$.',
  },
];

const bai5De1P3: Omit<ShortAnswerQuestion, 'id' | 'part' | 'number' | 'points'>[] = [
  {
    topic: 'Bài 5. Dãy số',
    prompt: 'Cho dãy số $(u_n)$ xác định bởi $u_1 = 2$ và $u_{n+1} = 3u_n - 1$ với mọi $n \\ge 1$. Tính số hạng thứ $4$ ($u_4$) của dãy số.',
    acceptableAnswers: ['41', '41.0'],
    explanation: 'Ta tính: $u_2 = 3 \\cdot 2 - 1 = 5$; $u_3 = 3 \\cdot 5 - 1 = 14$; $u_4 = 3 \\cdot 14 - 1 = 41$.',
    pedagogicalTip: 'Tính lần lượt $u_2 = 5, u_3 = 14, u_4 = 41$.',
  },
  {
    topic: 'Bài 5. Dãy số',
    prompt: 'Cho dãy số $(u_n)$ có số hạng tổng quát $u_n = n^2 - 7n + 15$. Hỏi giá trị nhỏ nhất trong các số hạng của dãy số $(u_n)$ bằng bao nhiêu?',
    acceptableAnswers: ['3', '3.0'],
    explanation: 'Ta có $u_n = \\left(n - \\frac{7}{2}\\right)^2 + \\frac{11}{4}$. Vì $n \\in \\mathbb{N}^*$ nên $u_n$ đạt GTNN tại $n = 3$ hoặc $n = 4$: $u_3 = u_4 = 9 - 21 + 15 = 3$.',
    pedagogicalTip: 'Đỉnh parabol là $n = 3,5$ nên xét hai số nguyên gần nhất là $n = 3$ và $n = 4$.',
  },
  {
    topic: 'Bài 5. Dãy số',
    prompt: 'Có bao nhiêu số hạng của dãy số $u_n = \\frac{5n + 12}{n + 1}$ ($n \\in \\mathbb{N}^*$) nhận giá trị là một số nguyên?',
    acceptableAnswers: ['1', '1.0'],
    explanation: 'Ta có $u_n = 5 + \\frac{7}{n + 1}$. Để $u_n \\in \\mathbb{Z}$ thì $(n + 1)$ là ước của $7$. Vì $n \\in \\mathbb{N}^* \\Rightarrow n + 1 \\ge 2$, nên chỉ có $n + 1 = 7 \\Leftrightarrow n = 6$ (1 số hạng).',
    pedagogicalTip: 'Tách phần nguyên $u_n = 5 + \\frac{7}{n + 1}$ rồi tìm ước của $7$ lớn hơn hoặc bằng $2$.',
  },
  {
    topic: 'Bài 5. Dãy số',
    prompt: 'Chị Lan bắt đầu làm việc tại một doanh nghiệp với mức lương năm đầu tiên là $180$ triệu đồng. Mỗi năm tiếp theo, mức lương năm của chị được tăng thêm $18$ triệu đồng so với năm liền trước. Tính mức lương (triệu đồng) của chị Lan ở năm làm việc thứ $6$.',
    acceptableAnswers: ['270', '270.0'],
    explanation: 'Gọi $u_n$ là lương năm thứ $n$: $u_1 = 180$, $u_6 = 180 + 5 \\cdot 18 = 180 + 90 = 270$ (triệu đồng).',
    pedagogicalTip: 'Năm thứ $6$ đã qua $5$ lần tăng lương so với năm thứ nhất.',
  },
];

const bai5De1P4: Omit<StepOrderingQuestion, 'id' | 'part' | 'number' | 'points'>[] = [
  {
    topic: 'Bài 5. Dãy số',
    problemStatement: 'Chứng minh dãy số $(u_n)$ với $u_n = \\frac{2n - 1}{n + 2}$ ($n \\in \\mathbb{N}^*$) là một dãy số tăng. Hãy sắp xếp các bước giải theo đúng thứ tự logic.',
    conclusionTarget: 'Chứng minh $u_{n+1} - u_n > 0, \\forall n \\in \\mathbb{N}^*$, suy ra $(u_n)$ là dãy số tăng.',
    steps: [
      {
        id: 's1',
        originalIndex: 1,
        roleDescription: 'Viết biểu thức của u_{n+1} và lập hiệu u_{n+1} - u_n',
        content: 'Với mọi $n \\in \\mathbb{N}^*$, ta có $u_{n+1} = \\frac{2(n + 1) - 1}{(n + 1) + 2} = \\frac{2n + 1}{n + 3}$, xét hiệu $u_{n+1} - u_n = \\frac{2n + 1}{n + 3} - \\frac{2n - 1}{n + 2}$.',
      },
      {
        id: 's2',
        originalIndex: 2,
        roleDescription: 'Quy đồng mẫu thức và rút gọn tử thức',
        content: 'Quy đồng mẫu số: $u_{n+1} - u_n = \\frac{(2n + 1)(n + 2) - (2n - 1)(n + 3)}{(n + 3)(n + 2)} = \\frac{(2n^2 + 5n + 2) - (2n^2 + 5n - 3)}{(n + 3)(n + 2)}$.',
      },
      {
        id: 's3',
        originalIndex: 3,
        roleDescription: 'Đánh giá dấu của hiệu số với mọi n nguyên dương',
        content: 'Thu gọn tử số ta được $u_{n+1} - u_n = \\frac{5}{(n + 3)(n + 2)} > 0$ với mọi $n \\in \\mathbb{N}^*$.',
      },
      {
        id: 's4',
        originalIndex: 4,
        roleDescription: 'Kết luận tính tăng của dãy số',
        content: 'Do $u_{n+1} > u_n, \\forall n \\in \\mathbb{N}^*$ nên dãy số $(u_n)$ là một dãy số tăng.',
      },
    ],
    pedagogicalTip: 'Xét dấu hiệu số $u_{n+1} - u_n$ là phương pháp tổng quát nhất để xét tính tăng, giảm của dãy số.',
    teacherAnalysis: 'Rèn kỹ năng biến đổi phân thức đại số để chứng minh dãy số đơn điệu.',
  },
  {
    topic: 'Bài 5. Dãy số',
    problemStatement: 'Xét tính bị chặn của dãy số $(u_n)$ với $u_n = \\frac{4n + 1}{n + 1}, \\forall n \\in \\mathbb{N}^*$. Hãy sắp xếp các bước giải theo đúng thứ tự logic.',
    conclusionTarget: 'Chứng minh $\\frac{5}{2} \\le u_n < 4$, kết luận dãy số $(u_n)$ bị chặn.',
    steps: [
      {
        id: 's1',
        originalIndex: 1,
        roleDescription: 'Tách phần nguyên của phân thức u_n',
        content: 'Với mọi $n \\in \\mathbb{N}^*$, ta biến đổi $u_n = \\frac{4(n + 1) - 3}{n + 1} = 4 - \\frac{3}{n + 1}$.',
      },
      {
        id: 's2',
        originalIndex: 2,
        roleDescription: 'Chứng minh dãy số bị chặn trên bởi 4',
        content: 'Vì $\\frac{3}{n + 1} > 0, \\forall n \\in \\mathbb{N}^*$ nên $u_n = 4 - \\frac{3}{n + 1} < 4$. Vậy $(u_n)$ bị chặn trên.',
      },
      {
        id: 's3',
        originalIndex: 3,
        roleDescription: 'Chứng minh dãy số bị chặn dưới bởi 5/2',
        content: 'Mặt khác, do $n \\ge 1 \\Rightarrow n + 1 \\ge 2 \\Rightarrow \\frac{3}{n + 1} \\le \\frac{3}{2}$, suy ra $u_n \\ge 4 - \\frac{3}{2} = \\frac{5}{2}$. Vậy $(u_n)$ bị chặn dưới.',
      },
      {
        id: 's4',
        originalIndex: 4,
        roleDescription: 'Kết luận tính bị chặn của dãy số',
        content: 'Vì $\\frac{5}{2} \\le u_n < 4, \\forall n \\in \\mathbb{N}^*$ nên dãy số $(u_n)$ là dãy số bị chặn.',
      },
    ],
    pedagogicalTip: 'Tách hằng số ra khỏi phân thức giúp đánh giá bất đẳng thức một cách trực tiếp.',
    teacherAnalysis: 'Quy trình chuẩn xét tính bị chặn của dãy phân thức.',
  },
  {
    topic: 'Bài 5. Dãy số',
    problemStatement: 'Cho dãy số $(u_n)$ xác định bởi $u_1 = 2$ và $u_{n+1} = u_n + 2n + 1$ với mọi $n \\ge 1$. Hãy sắp xếp các bước tìm công thức số hạng tổng quát $u_n$ theo đúng thứ tự logic.',
    conclusionTarget: 'Tìm được công thức số hạng tổng quát $u_n = n^2 + 1$.',
    steps: [
      {
        id: 's1',
        originalIndex: 1,
        roleDescription: 'Tính các số hạng đầu tiên của dãy số',
        content: 'Tính các số hạng đầu: $u_1 = 2 = 1^2 + 1$; $u_2 = 2 + 3 = 5 = 2^2 + 1$; $u_3 = 5 + 5 = 10 = 3^2 + 1$.',
      },
      {
        id: 's2',
        originalIndex: 2,
        roleDescription: 'Viết các đẳng thức sai phân liên tiếp từ k = 1 đến n - 1',
        content: 'Với $n \\ge 2$, ta có $u_n - u_1 = \\sum_{k=1}^{n-1} (u_{k+1} - u_k) = \\sum_{k=1}^{n-1} (2k + 1)$.',
      },
      {
        id: 's3',
        originalIndex: 3,
        roleDescription: 'Thu gọn tổng các số lẻ liên tiếp',
        content: 'Vì $3 + 5 + \\dots + (2n - 1) = n^2 - 1$, nên $u_n - 2 = n^2 - 1$.',
      },
      {
        id: 's4',
        originalIndex: 4,
        roleDescription: 'Kết luận công thức số hạng tổng quát u_n',
        content: 'Chuyển vế ta được công thức số hạng tổng quát của dãy số là $u_n = n^2 + 1, \\forall n \\in \\mathbb{N}^*$.',
      },
    ],
    pedagogicalTip: 'Tổng của $n$ số tự nhiên lẻ đầu tiên $1 + 3 + 5 + \\dots + (2n - 1) = n^2$.',
    teacherAnalysis: 'Phương pháp cộng dồn hiệu số $u_{k+1} - u_k$ để tìm số hạng tổng quát.',
  },
  {
    topic: 'Bài 5. Dãy số',
    problemStatement: 'Chứng minh dãy số $(u_n)$ với $u_n = \\frac{3^n}{n + 2}$ ($n \\in \\mathbb{N}^*$) là một dãy số tăng bằng phương pháp xét thương $\\frac{u_{n+1}}{u_n}$. Hãy sắp xếp các bước giải theo đúng thứ tự logic.',
    conclusionTarget: 'Chứng minh $\\frac{u_{n+1}}{u_n} > 1, \\forall n \\in \\mathbb{N}^*$, suy ra dãy số tăng.',
    steps: [
      {
        id: 's1',
        originalIndex: 1,
        roleDescription: 'Nhận xét dấu của các số hạng u_n',
        content: 'Ta thấy $u_n = \\frac{3^n}{n + 2} > 0$ với mọi $n \\in \\mathbb{N}^*$.',
      },
      {
        id: 's2',
        originalIndex: 2,
        roleDescription: 'Lập tỉ số u_{n+1} / u_n và rút gọn lũy thừa',
        content: 'Xét thương $\\frac{u_{n+1}}{u_n} = \\frac{3^{n+1}}{n + 3} \\cdot \\frac{n + 2}{3^n} = \\frac{3(n + 2)}{n + 3} = \\frac{3n + 6}{n + 3}$.',
      },
      {
        id: 's3',
        originalIndex: 3,
        roleDescription: 'So sánh tỉ số thu được với 1',
        content: 'Vì $3n + 6 = (n + 3) + (2n + 3) > n + 3$ với mọi $n \\in \\mathbb{N}^*$, nên $\\frac{u_{n+1}}{u_n} > 1$.',
      },
      {
        id: 's4',
        originalIndex: 4,
        roleDescription: 'Kết luận dãy số tăng',
        content: 'Do $u_n > 0$ và $\\frac{u_{n+1}}{u_n} > 1$ nên $u_{n+1} > u_n, \\forall n \\in \\mathbb{N}^*$. Vậy $(u_n)$ là dãy số tăng.',
      },
    ],
    pedagogicalTip: 'Khi $u_n > 0$ có chứa lũy thừa $a^n$, xét thương $\\frac{u_{n+1}}{u_n}$ thuận lợi hơn xét hiệu.',
    teacherAnalysis: 'Vận dụng phương pháp so sánh tỉ số $\\frac{u_{n+1}}{u_n}$ với $1$.',
  },
];

const bai5De2P1: Omit<MultipleChoiceQuestion, 'id' | 'part' | 'number' | 'points'>[] = [
  {
    topic: 'Bài 5. Dãy số',
    prompt: 'Cho dãy số $(u_n)$ có $u_n = 2^n - 5$. Số hạng thứ $5$ của dãy số là:',
    options: [
      { key: 'A', content: '$27$' },
      { key: 'B', content: '$32$' },
      { key: 'C', content: '$11$' },
      { key: 'D', content: '$59$' },
    ],
    correctAnswer: 'A',
    explanation: 'Thay $n = 5$: $u_5 = 2^5 - 5 = 32 - 5 = 27$.',
    pedagogicalTip: 'Lưu ý $2^5 = 32$.',
  },
  {
    topic: 'Bài 5. Dãy số',
    prompt: 'Cho dãy số $(u_n)$ xác định bởi $u_1 = 5$ và $u_{n+1} = u_n - 3$ với mọi $n \\ge 1$. Số hạng $u_4$ bằng:',
    options: [
      { key: 'A', content: '$-4$' },
      { key: 'B', content: '$-1$' },
      { key: 'C', content: '$2$' },
      { key: 'D', content: '$-7$' },
    ],
    correctAnswer: 'A',
    explanation: 'Ta có $u_2 = 2, u_3 = -1, u_4 = -4$.',
    pedagogicalTip: 'Mỗi số hạng sau giảm đi $3$ đơn vị so với số hạng trước.',
  },
  {
    topic: 'Bài 5. Dãy số',
    prompt: 'Trong các dãy số sau, dãy số nào là **dãy số giảm**?',
    options: [
      { key: 'A', content: '$u_n = -4n + 9$' },
      { key: 'B', content: '$u_n = 4n - 9$' },
      { key: 'C', content: '$u_n = n^3$' },
      { key: 'D', content: '$u_n = \\frac{n - 1}{n}$' },
    ],
    correctAnswer: 'A',
    explanation: 'Với $u_n = -4n + 9$, hiệu $u_{n+1} - u_n = -4 < 0$ với mọi $n \\in \\mathbb{N}^*$, nên dãy số giảm.',
    pedagogicalTip: 'Hệ số của $n$ âm thì dãy bậc nhất giảm.',
  },
  {
    topic: 'Bài 5. Dãy số',
    prompt: 'Cho dãy số $(u_n)$ với $u_n = \\sin\\left(\\frac{n\\pi}{2}\\right)$. Số hạng $u_6$ bằng:',
    options: [
      { key: 'A', content: '$0$' },
      { key: 'B', content: '$1$' },
      { key: 'C', content: '$-1$' },
      { key: 'D', content: '$\\frac{1}{2}$' },
    ],
    correctAnswer: 'A',
    explanation: 'Thay $n = 6$: $u_6 = \\sin(3\\pi) = 0$.',
    pedagogicalTip: 'Với mọi số nguyên $k$, $\\sin(k\\pi) = 0$.',
  },
  {
    topic: 'Bài 5. Dãy số',
    prompt: 'Dãy số $(u_n)$ với $u_n = n^2 + 3$ là dãy số:',
    options: [
      { key: 'A', content: 'Bị chặn dưới nhưng không bị chặn trên' },
      { key: 'B', content: 'Bị chặn trên nhưng không bị chặn dưới' },
      { key: 'C', content: 'Bị chặn' },
      { key: 'D', content: 'Không bị chặn trên và không bị chặn dưới' },
    ],
    correctAnswer: 'A',
    explanation: 'Vì $n \\ge 1 \\Rightarrow u_n = n^2 + 3 \\ge 4$ (bị chặn dưới bởi $4$), và $u_n$ tăng tuỳ ý khi $n$ lớn nên không bị chặn trên.',
    pedagogicalTip: 'Hàm bậc hai hệ số dương trên $\\mathbb{N}^*$ luôn bị chặn dưới và không bị chặn trên.',
  },
  {
    topic: 'Bài 5. Dãy số',
    prompt: 'Cho dãy số $\\frac{1}{2}, \\frac{2}{3}, \\frac{3}{4}, \\frac{4}{5}, \\dots$. Công thức số hạng tổng quát của dãy số này là:',
    options: [
      { key: 'A', content: '$u_n = \\frac{n}{n + 1}$' },
      { key: 'B', content: '$u_n = \\frac{n - 1}{n}$' },
      { key: 'C', content: '$u_n = \\frac{n + 1}{n + 2}$' },
      { key: 'D', content: '$u_n = \\frac{1}{n + 1}$' },
    ],
    correctAnswer: 'A',
    explanation: 'Tử số là $n$, mẫu số lớn hơn tử số $1$ đơn vị là $n + 1$, nên $u_n = \\frac{n}{n + 1}$.',
    pedagogicalTip: 'Kiểm tra với $n = 1 \\Rightarrow u_1 = \\frac{1}{2}$.',
  },
  {
    topic: 'Bài 5. Dãy số',
    prompt: 'Số $38$ là số hạng thứ bao nhiêu của dãy số $(u_n)$ với $u_n = n^2 + 2$?',
    options: [
      { key: 'A', content: 'Thứ $6$' },
      { key: 'B', content: 'Thứ $5$' },
      { key: 'C', content: 'Thứ $7$' },
      { key: 'D', content: 'Thứ $8$' },
    ],
    correctAnswer: 'A',
    explanation: 'Giải $n^2 + 2 = 38 \\Leftrightarrow n^2 = 36 \\Rightarrow n = 6$ (vì $n \\in \\mathbb{N}^*$).',
    pedagogicalTip: 'Chỉ lấy nghiệm nguyên dương $n = 6$.',
  },
  {
    topic: 'Bài 5. Dãy số',
    prompt: 'Cho dãy số $(u_n)$ với $u_n = 3\\cos(n\\pi)$. Khẳng định nào sau đây đúng?',
    options: [
      { key: 'A', content: '$-3 \\le u_n \\le 3$ với mọi $n \\in \\mathbb{N}^*$' },
      { key: 'B', content: 'Dãy số $(u_n)$ là dãy số tăng' },
      { key: 'C', content: 'Dãy số $(u_n)$ là dãy số giảm' },
      { key: 'D', content: 'Dãy số $(u_n)$ không bị chặn' },
    ],
    correctAnswer: 'A',
    explanation: 'Vì $\\cos(n\\pi) = (-1)^n \\in \\{-1; 1\\}$ nên $-3 \\le u_n \\le 3$, dãy số bị chặn.',
    pedagogicalTip: 'Dãy đan dấu $-3, 3, -3, 3, \\dots$ bị chặn nhưng không tăng, không giảm.',
  },
  {
    topic: 'Bài 5. Dãy số',
    prompt: 'Cho dãy số $(u_n)$ xác định bởi $u_1 = 1, u_2 = 2$ và $u_{n+2} = u_{n+1} + u_n$ ($n \\ge 1$). Số hạng $u_5$ bằng:',
    options: [
      { key: 'A', content: '$8$' },
      { key: 'B', content: '$5$' },
      { key: 'C', content: '$13$' },
      { key: 'D', content: '$7$' },
    ],
    correctAnswer: 'A',
    explanation: 'Tính lần lượt: $u_3 = 1 + 2 = 3$; $u_4 = 2 + 3 = 5$; $u_5 = 3 + 5 = 8$.',
    pedagogicalTip: 'Quy tắc cộng hai số hạng liền trước giống dãy Fibonacci.',
  },
  {
    topic: 'Bài 5. Dãy số',
    prompt: 'Với dãy số $(u_n)$ có $u_n = \\frac{1}{n(n + 1)}$, hiệu $u_1 + u_2 + u_3$ bằng:',
    options: [
      { key: 'A', content: '$\\frac{3}{4}$' },
      { key: 'B', content: '$\\frac{2}{3}$' },
      { key: 'C', content: '$\\frac{4}{5}$' },
      { key: 'D', content: '$\\frac{5}{6}$' },
    ],
    correctAnswer: 'A',
    explanation: 'Ta có $u_1 + u_2 + u_3 = \\frac{1}{2} + \\frac{1}{6} + \\frac{1}{12} = \\left(1 - \\frac{1}{2}\\right) + \\left(\\frac{1}{2} - \\frac{1}{3}\\right) + \\left(\\frac{1}{3} - \\frac{1}{4}\\right) = 1 - \\frac{1}{4} = \\frac{3}{4}$.',
    pedagogicalTip: 'Sử dụng đẳng thức $\\frac{1}{k(k+1)} = \\frac{1}{k} - \\frac{1}{k+1}$.',
  },
  {
    topic: 'Bài 5. Dãy số',
    prompt: 'Dãy số $(u_n)$ nào sau đây bị chặn trên bởi $0$?',
    options: [
      { key: 'A', content: '$u_n = -2n - 1$' },
      { key: 'B', content: '$u_n = 2n - 5$' },
      { key: 'C', content: '$u_n = \\frac{1}{n}$' },
      { key: 'D', content: '$u_n = (-1)^n$' },
    ],
    correctAnswer: 'A',
    explanation: 'Với mọi $n \\in \\mathbb{N}^*$, $u_n = -2n - 1 \\le -3 < 0$, nên dãy số bị chặn trên bởi $0$.',
    pedagogicalTip: 'Mọi số hạng đều âm thì dãy số bị chặn trên bởi $0$.',
  },
  {
    topic: 'Bài 5. Dãy số',
    prompt: 'Cho dãy số $(u_n)$ có $u_n = 3n + 2$. Khi đó số hạng $u_{2n-1}$ bằng:',
    options: [
      { key: 'A', content: '$6n - 1$' },
      { key: 'B', content: '$6n + 1$' },
      { key: 'C', content: '$3n + 1$' },
      { key: 'D', content: '$6n - 3$' },
    ],
    correctAnswer: 'A',
    explanation: 'Thay chỉ số $n$ bằng $(2n - 1)$: $u_{2n-1} = 3(2n - 1) + 2 = 6n - 3 + 2 = 6n - 1$.',
    pedagogicalTip: 'Thay toàn bộ biến $n$ trong công thức bởi biểu thức $(2n - 1)$.',
  },
];

const bai5De2P2: Omit<TrueFalseQuestion, 'id' | 'part' | 'number'>[] = [
  ...bai5De1P2,
];

const bai5De2P3: Omit<ShortAnswerQuestion, 'id' | 'part' | 'number' | 'points'>[] = [
  {
    topic: 'Bài 5. Dãy số',
    prompt: 'Cho dãy số $(u_n)$ với $u_1 = 4$ và $u_{n+1} = 2u_n - 3$ ($n \\ge 1$). Tính số hạng thứ $5$ ($u_5$) của dãy số.',
    acceptableAnswers: ['19', '19.0'],
    explanation: 'Ta có $u_2 = 5, u_3 = 7, u_4 = 11, u_5 = 2 \\cdot 11 - 3 = 19$.',
    pedagogicalTip: 'Tính tuần tự từ $u_1$ đến $u_5$.',
  },
  {
    topic: 'Bài 5. Dãy số',
    prompt: 'Tìm giá trị lớn nhất trong các số hạng của dãy số $u_n = -n^2 + 9n + 10$ ($n \\in \\mathbb{N}^*$).',
    acceptableAnswers: ['30', '30.0'],
    explanation: 'Đỉnh của parabol tại $n = 4,5$. Vì $n \\in \\mathbb{N}^*$ nên GTLN đạt tại $n = 4$ hoặc $n = 5$: $u_4 = u_5 = -16 + 36 + 10 = 30$.',
    pedagogicalTip: 'Kiểm tra tại hai số nguyên gần $4,5$ nhất là $n = 4$ và $n = 5$.',
  },
  {
    topic: 'Bài 5. Dãy số',
    prompt: 'Cho dãy số $(u_n)$ có $u_n = \\frac{1}{n(n + 1)}$. Biết tổng $S = u_1 + u_2 + \\dots + u_{19} = \\frac{a}{b}$ là phân số tối giản ($a, b \\in \\mathbb{N}^*$). Tính $a + b$.',
    acceptableAnswers: ['39', '39.0'],
    explanation: 'Ta có $S = \\left(1 - \\frac{1}{2}\\right) + \\left(\\frac{1}{2} - \\frac{1}{3}\\right) + \\dots + \\left(\\frac{1}{19} - \\frac{1}{20}\\right) = 1 - \\frac{1}{20} = \\frac{19}{20}$. Vậy $a + b = 19 + 20 = 39$.',
    pedagogicalTip: 'Khử liên tiếp các số hạng trung gian còn $1 - \\frac{1}{20}$.',
  },
  {
    topic: 'Bài 5. Dãy số',
    prompt: 'Số $77$ là số hạng thứ bao nhiêu của dãy số $(u_n)$ có $u_n = 6n + 5$?',
    acceptableAnswers: ['12', '12.0'],
    explanation: 'Giải phương trình $6n + 5 = 77 \\Leftrightarrow 6n = 72 \\Leftrightarrow n = 12$.',
    pedagogicalTip: 'Giải $6n + 5 = 77$.',
  },
];

const bai5De2P4: Omit<StepOrderingQuestion, 'id' | 'part' | 'number' | 'points'>[] = [
  ...bai5De1P4,
];

// ============================================================================
// BÀI 6. CẤP SỐ CỘNG (2 Đề ôn riêng biệt)
// ============================================================================
const bai6De1P1: Omit<MultipleChoiceQuestion, 'id' | 'part' | 'number' | 'points'>[] = [
  {
    topic: 'Bài 6. Cấp số cộng',
    prompt: 'Cho cấp số cộng $(u_n)$ có số hạng đầu $u_1 = 4$ và công sai $d = 5$. Số hạng thứ $2$ ($u_2$) của cấp số cộng bằng:',
    options: [
      { key: 'A', content: '$9$' },
      { key: 'B', content: '$-1$' },
      { key: 'C', content: '$20$' },
      { key: 'D', content: '$14$' },
    ],
    correctAnswer: 'A',
    explanation: 'Theo định nghĩa cấp số cộng: $u_2 = u_1 + d = 4 + 5 = 9$.',
    pedagogicalTip: 'Trong cấp số cộng: $u_{n+1} = u_n + d$.',
  },
  {
    topic: 'Bài 6. Cấp số cộng',
    prompt: 'Cho cấp số cộng $(u_n)$ có $u_1 = -3$ và công sai $d = 4$. Số hạng thứ $15$ của cấp số cộng là:',
    options: [
      { key: 'A', content: '$53$' },
      { key: 'B', content: '$57$' },
      { key: 'C', content: '$49$' },
      { key: 'D', content: '$63$' },
    ],
    correctAnswer: 'A',
    explanation: 'Áp dụng công thức $u_{15} = u_1 + 14d = -3 + 14 \\cdot 4 = -3 + 56 = 53$.',
    pedagogicalTip: 'Công thức số hạng tổng quát: $u_n = u_1 + (n - 1)d$.',
  },
  {
    topic: 'Bài 6. Cấp số cộng',
    prompt: 'Dãy số $(u_n)$ có số hạng tổng quát $u_n = 7 - 4n$ ($n \\in \\mathbb{N}^*$) là một cấp số cộng với công sai $d$ bằng:',
    options: [
      { key: 'A', content: '$d = -4$' },
      { key: 'B', content: '$d = 4$' },
      { key: 'C', content: '$d = 7$' },
      { key: 'D', content: '$d = 3$' },
    ],
    correctAnswer: 'A',
    explanation: 'Ta có $u_{n+1} - u_n = [7 - 4(n + 1)] - (7 - 4n) = -4$, nên công sai $d = -4$.',
    pedagogicalTip: 'Hệ số của $n$ trong biểu thức bậc nhất $u_n = dn + c$ chính là công sai $d$.',
  },
  {
    topic: 'Bài 6. Cấp số cộng',
    prompt: 'Cho cấp số cộng $(u_n)$ có $u_4 = 10$ và $u_6 = 22$. Số hạng $u_5$ bằng:',
    options: [
      { key: 'A', content: '$16$' },
      { key: 'B', content: '$15$' },
      { key: 'C', content: '$12$' },
      { key: 'D', content: '$18$' },
    ],
    correctAnswer: 'A',
    explanation: 'Theo tính chất cấp số cộng: $u_5 = \\frac{u_4 + u_6}{2} = \\frac{10 + 22}{2} = 16$.',
    pedagogicalTip: 'Mỗi số hạng (trừ số hạng đầu) là trung bình cộng của hai số hạng kề nó.',
  },
  {
    topic: 'Bài 6. Cấp số cộng',
    prompt: 'Cho ba số $5; x; 19$ theo thứ tự lập thành một cấp số cộng. Giá trị của $x$ bằng:',
    options: [
      { key: 'A', content: '$12$' },
      { key: 'B', content: '$14$' },
      { key: 'C', content: '$11$' },
      { key: 'D', content: '$24$' },
    ],
    correctAnswer: 'A',
    explanation: 'Vì $5; x; 19$ lập thành cấp số cộng nên $x = \\frac{5 + 19}{2} = 12$.',
    pedagogicalTip: 'Ba số $a, b, c$ lập thành CSC khi và chỉ khi $a + c = 2b$.',
  },
  {
    topic: 'Bài 6. Cấp số cộng',
    prompt: 'Cho cấp số cộng $(u_n)$ có $u_3 = 11$ và $u_8 = 31$. Công sai $d$ của cấp số cộng này là:',
    options: [
      { key: 'A', content: '$d = 4$' },
      { key: 'B', content: '$d = 5$' },
      { key: 'C', content: '$d = 3$' },
      { key: 'D', content: '$d = 2$' },
    ],
    correctAnswer: 'A',
    explanation: 'Ta có $u_8 - u_3 = 5d \\Rightarrow 5d = 31 - 11 = 20 \\Rightarrow d = 4$.',
    pedagogicalTip: 'Áp dụng công thức nhanh: $d = \\frac{u_m - u_k}{m - k}$.',
  },
  {
    topic: 'Bài 6. Cấp số cộng',
    prompt: 'Cho cấp số cộng $(u_n)$ có $u_1 = 6$ và $u_{10} = 42$. Tổng của $10$ số hạng đầu tiên $S_{10}$ bằng:',
    options: [
      { key: 'A', content: '$240$' },
      { key: 'B', content: '$210$' },
      { key: 'C', content: '$480$' },
      { key: 'D', content: '$220$' },
    ],
    correctAnswer: 'A',
    explanation: 'Áp dụng công thức $S_{10} = \\frac{10(u_1 + u_{10})}{2} = 5 \\cdot (6 + 42) = 240$.',
    pedagogicalTip: 'Khi biết $u_1$ và $u_n$, dùng ngay $S_n = \\frac{n(u_1 + u_n)}{2}$.',
  },
  {
    topic: 'Bài 6. Cấp số cộng',
    prompt: 'Cho cấp số cộng $(u_n)$ có số hạng đầu $u_1 = 2$ và công sai $d = 3$. Tổng của $12$ số hạng đầu tiên $S_{12}$ bằng:',
    options: [
      { key: 'A', content: '$222$' },
      { key: 'B', content: '$210$' },
      { key: 'C', content: '$234$' },
      { key: 'D', content: '$198$' },
    ],
    correctAnswer: 'A',
    explanation: 'Ta có $S_{12} = \\frac{12}{2}[2 \\cdot 2 + (12 - 1) \\cdot 3] = 6 \\cdot (4 + 33) = 6 \\cdot 37 = 222$.',
    pedagogicalTip: 'Công thức $S_n = \\frac{n[2u_1 + (n - 1)d]}{2}$.',
  },
  {
    topic: 'Bài 6. Cấp số cộng',
    prompt: 'Cho cấp số cộng $(u_n)$ có $u_1 = 8$ và $d = 6$. Số $122$ là số hạng thứ bao nhiêu của cấp số cộng này?',
    options: [
      { key: 'A', content: 'Số hạng thứ $20$' },
      { key: 'B', content: 'Số hạng thứ $19$' },
      { key: 'C', content: 'Số hạng thứ $21$' },
      { key: 'D', content: 'Số hạng thứ $18$' },
    ],
    correctAnswer: 'A',
    explanation: 'Giải $u_n = 8 + (n - 1) \\cdot 6 = 122 \\Leftrightarrow 6(n - 1) = 114 \\Leftrightarrow n - 1 = 19 \\Leftrightarrow n = 20$.',
    pedagogicalTip: 'Lấy $\\frac{u_n - u_1}{d} + 1$ để tìm vị trí $n$.',
  },
  {
    topic: 'Bài 6. Cấp số cộng',
    prompt: 'Trong các dãy số cho bởi số hạng tổng quát dưới đây, dãy số nào **không phải** là cấp số cộng?',
    options: [
      { key: 'A', content: '$u_n = n^2 + 2$' },
      { key: 'B', content: '$u_n = 3n - 5$' },
      { key: 'C', content: '$u_n = 10 - 2n$' },
      { key: 'D', content: '$u_n = 4$' },
    ],
    correctAnswer: 'A',
    explanation: 'Với $u_n = n^2 + 2$, ta có $u_1 = 3, u_2 = 6, u_3 = 11$. Vì $u_2 - u_1 = 3 \\neq u_3 - u_2 = 5$ nên không phải cấp số cộng.',
    pedagogicalTip: 'Số hạng tổng quát của cấp số cộng luôn có bậc tối đa là bậc nhất đối với $n$.',
  },
  {
    topic: 'Bài 6. Cấp số cộng',
    prompt: 'Cho cấp số cộng $(u_n)$ có tổng $n$ số hạng đầu là $S_n = 2n^2 + 3n$. Số hạng đầu $u_1$ và công sai $d$ của cấp số cộng lần lượt là:',
    options: [
      { key: 'A', content: '$u_1 = 5, d = 4$' },
      { key: 'B', content: '$u_1 = 5, d = 2$' },
      { key: 'C', content: '$u_1 = 3, d = 4$' },
      { key: 'D', content: '$u_1 = 2, d = 3$' },
    ],
    correctAnswer: 'A',
    explanation: 'Ta có $u_1 = S_1 = 2 + 3 = 5$; $S_2 = 2 \\cdot 4 + 6 = 14 \\Rightarrow u_2 = S_2 - S_1 = 9 \\Rightarrow d = u_2 - u_1 = 4$.',
    pedagogicalTip: 'Dùng $u_1 = S_1$ và $u_2 = S_2 - S_1$.',
  },
  {
    topic: 'Bài 6. Cấp số cộng',
    prompt: 'Tổng của $50$ số nguyên dương chẵn đầu tiên ($2 + 4 + 6 + \\dots + 100$) bằng:',
    options: [
      { key: 'A', content: '$2\\,550$' },
      { key: 'B', content: '$2\\,500$' },
      { key: 'C', content: '$5\\,050$' },
      { key: 'D', content: '$2\\,450$' },
    ],
    correctAnswer: 'A',
    explanation: 'Đây là tổng của $50$ số hạng CSC có $u_1 = 2, u_{50} = 100$: $S_{50} = \\frac{50(2 + 100)}{2} = 2\\,550$.',
    pedagogicalTip: 'Tổng $n$ số nguyên dương chẵn đầu tiên bằng $n(n + 1)$.',
  },
];

const bai6De1P2: Omit<TrueFalseQuestion, 'id' | 'part' | 'number'>[] = [
  {
    topic: 'Bài 6. Cấp số cộng',
    prompt: 'Cho cấp số cộng $(u_n)$ thỏa mãn $\\begin{cases} u_2 + u_5 = 24 \\\\ u_7 - u_3 = 16 \\end{cases}$. Xét tính đúng sai của các mệnh đề sau:',
    statements: [
      {
        id: 'a',
        label: 'a',
        statement: 'Công sai của cấp số cộng đã cho là $d = 4$.',
        isCorrect: true,
        explanation: 'Từ $u_7 - u_3 = 4d = 16 \\Leftrightarrow d = 4$.',
      },
      {
        id: 'b',
        label: 'b',
        statement: 'Số hạng đầu tiên của cấp số cộng là $u_1 = 2$.',
        isCorrect: true,
        explanation: 'Ta có $u_2 + u_5 = 2u_1 + 5d = 24 \\Rightarrow 2u_1 + 20 = 24 \\Leftrightarrow u_1 = 2$.',
      },
      {
        id: 'c',
        label: 'c',
        statement: 'Công thức số hạng tổng quát của cấp số cộng là $u_n = 4n + 2$.',
        isCorrect: false,
        explanation: 'Ta có $u_n = u_1 + (n - 1)d = 2 + 4(n - 1) = 4n - 2 \\neq 4n + 2$.',
      },
      {
        id: 'd',
        label: 'd',
        statement: 'Tổng của $15$ số hạng đầu tiên của cấp số cộng bằng $450$.',
        isCorrect: true,
        explanation: 'Ta có $u_{15} = 4 \\cdot 15 - 2 = 58$. Suy ra $S_{15} = \\frac{15(2 + 58)}{2} = 15 \\cdot 30 = 450$.',
      },
    ],
    pedagogicalTip: 'Đưa toàn bộ phương trình về hai ẩn cơ bản là $u_1$ và $d$.',
  },
  {
    topic: 'Bài 6. Cấp số cộng',
    prompt: 'Một khán đài sân vận động được thiết kế gồm $20$ hàng ghế. Hàng thứ nhất có $18$ ghế, hàng thứ hai có $21$ ghế, hàng thứ ba có $24$ ghế và cứ tiếp tục quy luật hàng sau nhiều hơn hàng liền trước $3$ ghế. Gọi $u_n$ là số ghế ở hàng thứ $n$. Xét tính đúng sai của các mệnh đề sau:',
    statements: [
      {
        id: 'a',
        label: 'a',
        statement: 'Dãy số $(u_n)$ lập thành một cấp số cộng với $u_1 = 18$ và công sai $d = 3$.',
        isCorrect: true,
        explanation: 'Hàng đầu có $18$ ghế và mỗi hàng tiếp theo tăng đều $3$ ghế.',
      },
      {
        id: 'b',
        label: 'b',
        statement: 'Hàng ghế thứ $10$ có $45$ ghế.',
        isCorrect: true,
        explanation: 'Ta có $u_{10} = u_1 + 9d = 18 + 9 \\cdot 3 = 45$ ghế.',
      },
      {
        id: 'c',
        label: 'c',
        statement: 'Hàng ghế cuối cùng (hàng thứ $20$) có $78$ ghế.',
        isCorrect: false,
        explanation: 'Ta có $u_{20} = 18 + 19 \\cdot 3 = 18 + 57 = 75 \\neq 78$.',
      },
      {
        id: 'd',
        label: 'd',
        statement: 'Tổng số ghế của cả khán đài đó là $930$ ghế.',
        isCorrect: true,
        explanation: 'Tổng số ghế là $S_{20} = \\frac{20(u_1 + u_{20})}{2} = 10 \\cdot (18 + 75) = 930$ ghế.',
      },
    ],
    pedagogicalTip: 'Kiểm tra kỹ hệ số $(n - 1) = 19$ khi tính $u_{20}$.',
  },
];

const bai6De1P3: Omit<ShortAnswerQuestion, 'id' | 'part' | 'number' | 'points'>[] = [
  {
    topic: 'Bài 6. Cấp số cộng',
    prompt: 'Cho cấp số cộng $(u_n)$ có $u_4 = 14$ và $u_{10} = 38$. Tính số hạng thứ $25$ ($u_{25}$) của cấp số cộng này.',
    acceptableAnswers: ['98', '98.0'],
    explanation: 'Ta có $6d = u_{10} - u_4 = 24 \\Rightarrow d = 4$. Khi đó $u_{25} = u_{10} + 15d = 38 + 15 \\cdot 4 = 98$.',
    pedagogicalTip: 'Dùng hệ thức $u_{25} = u_{10} + 15d$ nhanh hơn tìm $u_1$.',
  },
  {
    topic: 'Bài 6. Cấp số cộng',
    prompt: 'Cần lấy tổng của bao nhiêu số hạng đầu của cấp số cộng $3, 7, 11, 15, \\dots$ để được tổng bằng $231$?',
    acceptableAnswers: ['11', '11.0'],
    explanation: 'CSC có $u_1 = 3, d = 4$. Ta có $S_n = \\frac{n[6 + 4(n - 1)]}{2} = n(2n + 1) = 231 \\Leftrightarrow 2n^2 + n - 231 = 0 \\Rightarrow n = 11$ (vì $n \\in \\mathbb{N}^*$).',
    pedagogicalTip: 'Giải phương trình bậc hai $2n^2 + n - 231 = 0$ lấy nghiệm nguyên dương.',
  },
  {
    topic: 'Bài 6. Cấp số cộng',
    prompt: 'Một máy móc công nghiệp khi mới mua có giá $850$ triệu đồng. Sau mỗi năm vận hành, giá trị của máy khấu hao (giảm đều) $65$ triệu đồng. Hỏi sau $6$ năm vận hành, giá trị còn lại của máy là bao nhiêu triệu đồng?',
    acceptableAnswers: ['460', '460.0'],
    explanation: 'Sau $6$ năm, giá trị còn lại của máy là $850 - 6 \\cdot 65 = 850 - 390 = 460$ (triệu đồng).',
    pedagogicalTip: 'Sau $6$ năm giảm đúng $6$ lần mức khấu hao hằng năm.',
  },
  {
    topic: 'Bài 6. Cấp số cộng',
    prompt: 'Người ta xếp các ống nhựa hình trụ thành một chồng có dạng mặt cắt là hình thang sao cho hàng trên cùng có $8$ ống, mỗi hàng ngay bên dưới nhiều hơn hàng liền trên $1$ ống và hàng dưới cùng có $22$ ống. Tính tổng số ống nhựa trong chồng đó.',
    acceptableAnswers: ['225', '225.0'],
    explanation: 'Số hàng ống là $n = 22 - 8 + 1 = 15$ hàng. Tổng số ống là $S_{15} = \\frac{15(8 + 22)}{2} = 15 \\cdot 15 = 225$ ống.',
    pedagogicalTip: 'Tìm số hàng $n = \\frac{u_n - u_1}{d} + 1 = 15$ trước khi tính tổng.',
  },
];

const bai6De1P4: Omit<StepOrderingQuestion, 'id' | 'part' | 'number' | 'points'>[] = [
  {
    topic: 'Bài 6. Cấp số cộng',
    problemStatement: 'Cho cấp số cộng $(u_n)$ có $u_3 + u_7 = 36$ và $u_2 + u_9 = 40$. Hãy sắp xếp các bước tìm $u_1, d$ và tính $S_{20}$ theo đúng thứ tự logic.',
    conclusionTarget: 'Tìm được $u_1 = 2, d = 4$ và $S_{20} = 800$.',
    steps: [
      {
        id: 's1',
        originalIndex: 1,
        roleDescription: 'Biểu diễn các giả thiết theo u_1 và d',
        content: 'Áp dụng công thức $u_n = u_1 + (n - 1)d$, ta đưa giả thiết về hệ phương trình: $\\begin{cases} 2u_1 + 8d = 36 \\\\ 2u_1 + 9d = 40 \\end{cases}$.',
      },
      {
        id: 's2',
        originalIndex: 2,
        roleDescription: 'Giải hệ phương trình tìm u_1 và d',
        content: 'Lấy phương trình thứ hai trừ phương trình thứ nhất ta được $d = 4$, thay lại suy ra $2u_1 = 36 - 32 = 4 \\Leftrightarrow u_1 = 2$.',
      },
      {
        id: 's3',
        originalIndex: 3,
        roleDescription: 'Áp dụng công thức tổng 20 số hạng đầu',
        content: 'Thay $u_1 = 2, d = 4, n = 20$ vào công thức $S_{20} = \\frac{20}{2}[2u_1 + 19d] = 10 \\cdot (2 \\cdot 2 + 19 \\cdot 4)$.',
      },
      {
        id: 's4',
        originalIndex: 4,
        roleDescription: 'Tính kết quả và kết luận',
        content: 'Thu gọn ta được $S_{20} = 10 \\cdot 80 = 800$.',
      },
    ],
    pedagogicalTip: 'Viết $u_3 + u_7 = 2u_1 + 8d$ và $u_2 + u_9 = 2u_1 + 9d$ giúp trừ vế theo vế tìm ngay $d$.',
    teacherAnalysis: 'Bài toán cơ bản giải hệ phương trình cấp số cộng.',
  },
  {
    topic: 'Bài 6. Cấp số cộng',
    problemStatement: 'Một công ty đào một giếng sâu $25\\text{ m}$. Mét đầu tiên có chi phí $400$ nghìn đồng, và từ mét thứ hai trở đi, mỗi mét sâu thêm có chi phí tăng thêm $80$ nghìn đồng so với mét ngay trước đó. Hãy sắp xếp các bước tính tổng chi phí đào xong giếng $25\\text{ m}$ theo đúng thứ tự logic.',
    conclusionTarget: 'Tính được tổng chi phí là $34\\,000$ nghìn đồng ($34$ triệu đồng).',
    steps: [
      {
        id: 's1',
        originalIndex: 1,
        roleDescription: 'Mô hình hóa chi phí từng mét đào bằng cấp số cộng',
        content: 'Gọi $u_n$ (nghìn đồng) là chi phí đào mét thứ $n$. Khi đó $(u_n)$ là cấp số cộng có $u_1 = 400$ và công sai $d = 80$.',
      },
      {
        id: 's2',
        originalIndex: 2,
        roleDescription: 'Biểu diễn tổng chi phí đào 25 mét bằng S_25',
        content: 'Tổng chi phí đào $25\\text{ m}$ chính là tổng $25$ số hạng đầu tiên $S_{25}$ của cấp số cộng $(u_n)$.',
      },
      {
        id: 's3',
        originalIndex: 3,
        roleDescription: 'Thay số vào công thức tính tổng cấp số cộng',
        content: 'Ta có $S_{25} = \\frac{25}{2}[2u_1 + (25 - 1)d] = \\frac{25}{2}(2 \\cdot 400 + 24 \\cdot 80)$.',
      },
      {
        id: 's4',
        originalIndex: 4,
        roleDescription: 'Tính kết quả cuối cùng và kết luận',
        content: 'Tính toán ta được $S_{25} = \\frac{25}{2} \\cdot 2\\,720 = 34\\,000$ nghìn đồng (tức $34$ triệu đồng).',
      },
    ],
    pedagogicalTip: 'Đọc kỹ đề bài xem đại lượng hỏi là số hạng thứ $n$ ($u_n$) hay tổng của $n$ số hạng ($S_n$).',
    teacherAnalysis: 'Vận dụng cấp số cộng vào bài toán tính chi phí lũy tiến trong thực tế.',
  },
  {
    topic: 'Bài 6. Cấp số cộng',
    problemStatement: 'Tìm $x$ để ba số $2x - 1; x + 3; 5x - 3$ theo thứ tự lập thành một cấp số cộng. Hãy sắp xếp các bước giải theo đúng thứ tự logic.',
    conclusionTarget: 'Tìm được $x = 2$.',
    steps: [
      {
        id: 's1',
        originalIndex: 1,
        roleDescription: 'Nêu điều kiện cần và đủ để ba số lập thành cấp số cộng',
        content: 'Ba số $a, b, c$ theo thứ tự lập thành một cấp số cộng khi và chỉ khi $a + c = 2b$.',
      },
      {
        id: 's2',
        originalIndex: 2,
        roleDescription: 'Thiết lập phương trình theo x',
        content: 'Áp dụng với $a = 2x - 1, b = x + 3, c = 5x - 3$, ta có phương trình $(2x - 1) + (5x - 3) = 2(x + 3)$.',
      },
      {
        id: 's3',
        originalIndex: 3,
        roleDescription: 'Thu gọn phương trình bậc nhất',
        content: 'Khai triển và thu gọn hai vế: $7x - 4 = 2x + 6 \\Leftrightarrow 5x = 10$.',
      },
      {
        id: 's4',
        originalIndex: 4,
        roleDescription: 'Giải tìm x và kiểm tra kết luận',
        content: 'Suy ra $x = 2$ (khi đó ba số là $3; 5; 7$ lập thành cấp số cộng có công sai $d = 2$).',
      },
    ],
    pedagogicalTip: 'Sau khi tìm được $x$, thay ngược lại để kiểm tra ba số có đúng cách đều nhau hay không.',
    teacherAnalysis: 'Áp dụng tính chất trung bình cộng của ba số hạng liên tiếp.',
  },
  {
    topic: 'Bài 6. Cấp số cộng',
    problemStatement: 'Cho dãy số $(u_n)$ có tổng $n$ số hạng đầu là $S_n = 3n^2 + n, \\forall n \\in \\mathbb{N}^*$. Chứng minh $(u_n)$ là một cấp số cộng và tìm $u_1, d$. Hãy sắp xếp các bước giải theo đúng thứ tự logic.',
    conclusionTarget: 'Chứng minh $u_n = 6n - 2$, là CSC có $u_1 = 4, d = 6$.',
    steps: [
      {
        id: 's1',
        originalIndex: 1,
        roleDescription: 'Tìm số hạng đầu u_1 từ S_1',
        content: 'Với $n = 1$, ta có $u_1 = S_1 = 3 \\cdot 1^2 + 1 = 4$.',
      },
      {
        id: 's2',
        originalIndex: 2,
        roleDescription: 'Tìm số hạng tổng quát u_n với n >= 2 bằng hiệu S_n - S_{n-1}',
        content: 'Với mọi $n \\ge 2$, ta có $u_n = S_n - S_{n-1} = (3n^2 + n) - [3(n - 1)^2 + (n - 1)] = 6n - 2$ (công thức này cũng đúng với $n = 1$).',
      },
      {
        id: 's3',
        originalIndex: 3,
        roleDescription: 'Kiểm tra hiệu u_{n+1} - u_n không đổi',
        content: 'Xét hiệu $u_{n+1} - u_n = [6(n + 1) - 2] - (6n - 2) = 6$ (không đổi với mọi $n \\in \\mathbb{N}^*$).',
      },
      {
        id: 's4',
        originalIndex: 4,
        roleDescription: 'Kết luận cấp số cộng',
        content: 'Vậy $(u_n)$ là một cấp số cộng có số hạng đầu $u_1 = 4$ và công sai $d = 6$.',
      },
    ],
    pedagogicalTip: 'Công thức liên hệ giữa số hạng và tổng riêng là $u_n = S_n - S_{n-1}$ với $n \\ge 2$.',
    teacherAnalysis: 'Bài toán khôi phục số hạng tổng quát từ công thức tổng $S_n$.',
  },
];

const bai6De2P1: Omit<MultipleChoiceQuestion, 'id' | 'part' | 'number' | 'points'>[] = [
  {
    topic: 'Bài 6. Cấp số cộng',
    prompt: 'Cho cấp số cộng $(u_n)$ có $u_1 = 12$ và công sai $d = -3$. Số hạng thứ $8$ của cấp số cộng bằng:',
    options: [
      { key: 'A', content: '$-9$' },
      { key: 'B', content: '$-12$' },
      { key: 'C', content: '$-6$' },
      { key: 'D', content: '$33$' },
    ],
    correctAnswer: 'A',
    explanation: 'Ta có $u_8 = u_1 + 7d = 12 + 7 \\cdot (-3) = 12 - 21 = -9$.',
    pedagogicalTip: 'Áp dụng $u_8 = u_1 + 7d$.',
  },
  {
    topic: 'Bài 6. Cấp số cộng',
    prompt: 'Cho cấp số cộng $-2; 3; 8; 13; \\dots$. Công sai $d$ của cấp số cộng này là:',
    options: [
      { key: 'A', content: '$d = 5$' },
      { key: 'B', content: '$d = -5$' },
      { key: 'C', content: '$d = 3$' },
      { key: 'D', content: '$d = 6$' },
    ],
    correctAnswer: 'A',
    explanation: 'Công sai $d = u_2 - u_1 = 3 - (-2) = 5$.',
    pedagogicalTip: 'Lấy số hạng đứng sau trừ số hạng đứng ngay trước nó.',
  },
  {
    topic: 'Bài 6. Cấp số cộng',
    prompt: 'Cho cấp số cộng $(u_n)$ có công sai $d = 2$ và $u_{10} = 25$. Số hạng đầu $u_1$ bằng:',
    options: [
      { key: 'A', content: '$7$' },
      { key: 'B', content: '$5$' },
      { key: 'C', content: '$9$' },
      { key: 'D', content: '$43$' },
    ],
    correctAnswer: 'A',
    explanation: 'Từ $u_{10} = u_1 + 9d \\Rightarrow u_1 = 25 - 9 \\cdot 2 = 7$.',
    pedagogicalTip: 'Thay $d = 2$ vào $u_1 = u_{10} - 9d$.',
  },
  {
    topic: 'Bài 6. Cấp số cộng',
    prompt: 'Cho cấp số cộng $(u_n)$ có $u_2 + u_8 = 30$. Khi đó số hạng $u_5$ bằng:',
    options: [
      { key: 'A', content: '$15$' },
      { key: 'B', content: '$10$' },
      { key: 'C', content: '$20$' },
      { key: 'D', content: '$30$' },
    ],
    correctAnswer: 'A',
    explanation: 'Vì $2 + 8 = 2 \\cdot 5$ nên $u_2 + u_8 = 2u_5 = 30 \\Rightarrow u_5 = 15$.',
    pedagogicalTip: 'Tính chất: nếu $m + k = 2p$ thì $u_m + u_k = 2u_p$.',
  },
  {
    topic: 'Bài 6. Cấp số cộng',
    prompt: 'Cho cấp số cộng $(u_n)$ có $u_1 = 5$ và $d = 4$. Tổng của $15$ số hạng đầu tiên $S_{15}$ bằng:',
    options: [
      { key: 'A', content: '$495$' },
      { key: 'B', content: '$480$' },
      { key: 'C', content: '$510$' },
      { key: 'D', content: '$450$' },
    ],
    correctAnswer: 'A',
    explanation: 'Ta có $S_{15} = \\frac{15}{2}[2 \\cdot 5 + 14 \\cdot 4] = \\frac{15 \\cdot 66}{2} = 15 \\cdot 33 = 495$.',
    pedagogicalTip: 'Áp dụng công thức $S_n = \\frac{n[2u_1 + (n-1)d]}{2}$.',
  },
  {
    topic: 'Bài 6. Cấp số cộng',
    prompt: 'Một cấp số cộng có $8$ số hạng. Biết số hạng đầu $u_1 = 3$ và số hạng cuối $u_8 = 31$. Tổng tất cả các số hạng của cấp số cộng này là:',
    options: [
      { key: 'A', content: '$136$' },
      { key: 'B', content: '$128$' },
      { key: 'C', content: '$144$' },
      { key: 'D', content: '$272$' },
    ],
    correctAnswer: 'A',
    explanation: 'Ta có $S_8 = \\frac{8(u_1 + u_8)}{2} = 4 \\cdot (3 + 31) = 136$.',
    pedagogicalTip: 'Dùng $S_8 = \\frac{8(u_1 + u_8)}{2}$.',
  },
  {
    topic: 'Bài 6. Cấp số cộng',
    prompt: 'Số $-47$ là số hạng thứ bao nhiêu của cấp số cộng có $u_1 = 5$ và công sai $d = -4$?',
    options: [
      { key: 'A', content: 'Số hạng thứ $14$' },
      { key: 'B', content: 'Số hạng thứ $13$' },
      { key: 'C', content: 'Số hạng thứ $15$' },
      { key: 'D', content: 'Số hạng thứ $12$' },
    ],
    correctAnswer: 'A',
    explanation: 'Giải $5 + (n - 1)(-4) = -47 \\Leftrightarrow -4(n - 1) = -52 \\Leftrightarrow n - 1 = 13 \\Leftrightarrow n = 14$.',
    pedagogicalTip: 'Chú ý dấu âm của công sai $d = -4$.',
  },
  {
    topic: 'Bài 6. Cấp số cộng',
    prompt: 'Bốn góc của một tứ giác lồi lập thành một cấp số cộng và góc nhỏ nhất bằng $60^\\circ$. Góc lớn nhất của tứ giác đó bằng:',
    options: [
      { key: 'A', content: '$120^\\circ$' },
      { key: 'B', content: '$110^\\circ$' },
      { key: 'C', content: '$130^\\circ$' },
      { key: 'D', content: '$100^\\circ$' },
    ],
    correctAnswer: 'A',
    explanation: 'Tổng $4$ góc tứ giác bằng $360^\\circ \\Rightarrow \\frac{4(u_1 + u_4)}{2} = 360^\\circ \\Rightarrow 60^\\circ + u_4 = 180^\\circ \\Rightarrow u_4 = 120^\\circ$.',
    pedagogicalTip: 'Dùng tổng $S_4 = 2(u_1 + u_4) = 360^\\circ$ tìm ngay $u_4$.',
  },
  {
    topic: 'Bài 6. Cấp số cộng',
    prompt: 'Cho cấp số cộng $(u_n)$ có $u_n = 5n - 2$. Tổng $u_1 + u_2 + \\dots + u_{10}$ bằng:',
    options: [
      { key: 'A', content: '$255$' },
      { key: 'B', content: '$245$' },
      { key: 'C', content: '$265$' },
      { key: 'D', content: '$250$' },
    ],
    correctAnswer: 'A',
    explanation: 'Ta có $u_1 = 3, u_{10} = 48$. Tổng $S_{10} = \\frac{10(3 + 48)}{2} = 5 \\cdot 51 = 255$.',
    pedagogicalTip: 'Tính $u_1 = 3$ và $u_{10} = 48$ rồi thay vào $\\frac{10(u_1 + u_{10})}{2}$.',
  },
  {
    topic: 'Bài 6. Cấp số cộng',
    prompt: 'Cho cấp số cộng $(u_n)$ có $S_6 = 42$ và $S_7 = 56$. Số hạng thứ $7$ ($u_7$) bằng:',
    options: [
      { key: 'A', content: '$14$' },
      { key: 'B', content: '$12$' },
      { key: 'C', content: '$16$' },
      { key: 'D', content: '$8$' },
    ],
    correctAnswer: 'A',
    explanation: 'Ta có $u_7 = S_7 - S_6 = 56 - 42 = 14$.',
    pedagogicalTip: 'Với mọi dãy số, $u_n = S_n - S_{n-1}$.',
  },
  {
    topic: 'Bài 6. Cấp số cộng',
    prompt: 'Nếu chèn thêm $4$ số vào giữa hai số $3$ và $28$ để được một cấp số cộng gồm $6$ số hạng thì công sai $d$ bằng:',
    options: [
      { key: 'A', content: '$d = 5$' },
      { key: 'B', content: '$d = 4$' },
      { key: 'C', content: '$d = 6$' },
      { key: 'D', content: '$d = 7$' },
    ],
    correctAnswer: 'A',
    explanation: 'Ta có $u_1 = 3$ và $u_6 = 28 \\Rightarrow 5d = 28 - 3 = 25 \\Rightarrow d = 5$.',
    pedagogicalTip: 'Chèn $4$ số vào giữa $2$ số tạo thành cấp số cộng có $6$ số hạng.',
  },
  {
    topic: 'Bài 6. Cấp số cộng',
    prompt: 'Cho cấp số cộng $(u_n)$ có $u_1 = -10$ và $d = 3$. Số hạng dương đầu tiên của cấp số cộng này là:',
    options: [
      { key: 'A', content: '$u_5 = 2$' },
      { key: 'B', content: '$u_4 = -1$' },
      { key: 'C', content: '$u_5 = 1$' },
      { key: 'D', content: '$u_6 = 5$' },
    ],
    correctAnswer: 'A',
    explanation: 'Ta có $u_n = -10 + 3(n - 1) = 3n - 13 > 0 \\Leftrightarrow n > \\frac{13}{3} \\approx 4,33$. Vậy số hạng dương đầu tiên là $u_5 = 3 \\cdot 5 - 13 = 2$.',
    pedagogicalTip: 'Giải bất phương trình $u_n > 0$ tìm số nguyên dương $n$ nhỏ nhất.',
  },
];

const bai6De2P2: Omit<TrueFalseQuestion, 'id' | 'part' | 'number'>[] = [
  ...bai6De1P2,
];

const bai6De2P3: Omit<ShortAnswerQuestion, 'id' | 'part' | 'number' | 'points'>[] = [
  {
    topic: 'Bài 6. Cấp số cộng',
    prompt: 'Cho cấp số cộng $(u_n)$ có $u_1 = 9$ và công sai $d = 4$. Tính tổng của $20$ số hạng đầu tiên $S_{20}$.',
    acceptableAnswers: ['940', '940.0'],
    explanation: 'Ta có $S_{20} = \\frac{20}{2}(2 \\cdot 9 + 19 \\cdot 4) = 10 \\cdot (18 + 76) = 940$.',
    pedagogicalTip: 'Áp dụng công thức $S_{20} = 10(2u_1 + 19d)$.',
  },
  {
    topic: 'Bài 6. Cấp số cộng',
    prompt: 'Cho cấp số cộng $(u_n)$ thỏa mãn $u_2 + u_4 + u_6 = 36$. Tính số hạng $u_4$.',
    acceptableAnswers: ['12', '12.0'],
    explanation: 'Vì $u_2 + u_6 = 2u_4$ nên $u_2 + u_4 + u_6 = 3u_4 = 36 \\Rightarrow u_4 = 12$.',
    pedagogicalTip: 'Sử dụng tính chất đối xứng $u_2 + u_6 = 2u_4$.',
  },
  {
    topic: 'Bài 6. Cấp số cộng',
    prompt: 'Một kiến trúc sư thiết kế một giảng đường với $12$ ghế ở hàng thứ nhất, $16$ ghế ở hàng thứ hai, $20$ ghế ở hàng thứ ba, và cứ như vậy. Để giảng đường có sức chứa đúng $420$ ghế thì cần thiết kế bao nhiêu hàng ghế?',
    acceptableAnswers: ['12', '12.0'],
    explanation: 'Với $u_1 = 12, d = 4$, ta có $S_n = \\frac{n[24 + 4(n - 1)]}{2} = 2n^2 + 10n = 420 \\Leftrightarrow n^2 + 5n - 210 = 0 \\Rightarrow n = 12$.',
    pedagogicalTip: 'Giải phương trình $n^2 + 5n - 210 = 0$ với $n \\in \\mathbb{N}^*$.',
  },
  {
    topic: 'Bài 6. Cấp số cộng',
    prompt: 'Tính tổng tất cả các số tự nhiên chia hết cho $3$ và nhỏ hơn $100$.',
    acceptableAnswers: ['1683', '1683.0'],
    explanation: 'Các số tự nhiên chia hết cho $3$ nhỏ hơn $100$ là $0, 3, 6, \\dots, 99$ (gồm $34$ số hạng). Tổng là $S = \\frac{34(0 + 99)}{2} = 17 \\cdot 99 = 1\\,683$.',
    pedagogicalTip: 'Từ $3$ đến $99$ có $33$ số hạng dương: $\\frac{33(3 + 99)}{2} = 1\\,683$.',
  },
];

const bai6De2P4: Omit<StepOrderingQuestion, 'id' | 'part' | 'number' | 'points'>[] = [
  ...bai6De1P4,
];

// ============================================================================
// BÀI 7. CẤP SỐ NHÂN (2 Đề ôn riêng biệt)
// ============================================================================
const bai7De1P1: Omit<MultipleChoiceQuestion, 'id' | 'part' | 'number' | 'points'>[] = [
  {
    topic: 'Bài 7. Cấp số nhân',
    prompt: 'Cho cấp số nhân $(u_n)$ có số hạng đầu $u_1 = 3$ và công bội $q = 2$. Số hạng thứ $5$ ($u_5$) của cấp số nhân là:',
    options: [
      { key: 'A', content: '$48$' },
      { key: 'B', content: '$96$' },
      { key: 'C', content: '$24$' },
      { key: 'D', content: '$30$' },
    ],
    correctAnswer: 'A',
    explanation: 'Áp dụng công thức $u_5 = u_1 \\cdot q^4 = 3 \\cdot 2^4 = 3 \\cdot 16 = 48$.',
    pedagogicalTip: 'Công thức số hạng tổng quát CSN: $u_n = u_1 \\cdot q^{n-1}$.',
  },
  {
    topic: 'Bài 7. Cấp số nhân',
    prompt: 'Cho cấp số nhân $4; -12; 36; -108; \\dots$. Công bội $q$ của cấp số nhân này bằng:',
    options: [
      { key: 'A', content: '$q = -3$' },
      { key: 'B', content: '$q = 3$' },
      { key: 'C', content: '$q = -16$' },
      { key: 'D', content: '$q = -\\frac{1}{3}$' },
    ],
    correctAnswer: 'A',
    explanation: 'Công bội $q = \\frac{u_2}{u_1} = \\frac{-12}{4} = -3$.',
    pedagogicalTip: 'Lấy số hạng sau chia cho số hạng đứng ngay trước nó.',
  },
  {
    topic: 'Bài 7. Cấp số nhân',
    prompt: 'Cho cấp số nhân $(u_n)$ có các số hạng đều dương, biết $u_3 = 5$ và $u_5 = 45$. Số hạng $u_4$ bằng:',
    options: [
      { key: 'A', content: '$15$' },
      { key: 'B', content: '$25$' },
      { key: 'C', content: '$-15$' },
      { key: 'D', content: '$9$' },
    ],
    correctAnswer: 'A',
    explanation: 'Theo tính chất cấp số nhân: $u_4^2 = u_3 \\cdot u_5 = 5 \\cdot 45 = 225$. Vì các số hạng đều dương nên $u_4 = 15$.',
    pedagogicalTip: 'Bình phương mỗi số hạng (trừ số hạng đầu) bằng tích hai số hạng kề nó.',
  },
  {
    topic: 'Bài 7. Cấp số nhân',
    prompt: 'Cho ba số dương $4; x; 36$ theo thứ tự lập thành một cấp số nhân. Giá trị của $x$ bằng:',
    options: [
      { key: 'A', content: '$12$' },
      { key: 'B', content: '$20$' },
      { key: 'C', content: '$18$' },
      { key: 'D', content: '$9$' },
    ],
    correctAnswer: 'A',
    explanation: 'Vì $x > 0$ và $4; x; 36$ lập thành CSN nên $x = \\sqrt{4 \\cdot 36} = 12$.',
    pedagogicalTip: 'Ba số $a, b, c$ lập thành CSN khi $b^2 = ac$.',
  },
  {
    topic: 'Bài 7. Cấp số nhân',
    prompt: 'Trong các dãy số cho bởi số hạng tổng quát dưới đây, dãy số nào là một **cấp số nhân**?',
    options: [
      { key: 'A', content: '$u_n = 5 \\cdot 2^{n-1}$' },
      { key: 'B', content: '$u_n = 5n + 2$' },
      { key: 'C', content: '$u_n = n^2$' },
      { key: 'D', content: '$u_n = 2^n + 1$' },
    ],
    correctAnswer: 'A',
    explanation: 'Với $u_n = 5 \\cdot 2^{n-1}$, thương $\\frac{u_{n+1}}{u_n} = 2$ không đổi nên là cấp số nhân có $u_1 = 5, q = 2$.',
    pedagogicalTip: 'Dãy có dạng $u_n = a \\cdot q^n$ luôn là cấp số nhân.',
  },
  {
    topic: 'Bài 7. Cấp số nhân',
    prompt: 'Cho cấp số nhân $(u_n)$ có $u_1 = 2$ và công bội $q = 3$. Tổng của $5$ số hạng đầu tiên $S_5$ bằng:',
    options: [
      { key: 'A', content: '$242$' },
      { key: 'B', content: '$162$' },
      { key: 'C', content: '$80$' },
      { key: 'D', content: '$484$' },
    ],
    correctAnswer: 'A',
    explanation: 'Áp dụng công thức $S_5 = \\frac{u_1(q^5 - 1)}{q - 1} = \\frac{2(3^5 - 1)}{3 - 1} = 243 - 1 = 242$.',
    pedagogicalTip: 'Công thức tổng CSN với $q \\neq 1$: $S_n = \\frac{u_1(1 - q^n)}{1 - q}$.',
  },
  {
    topic: 'Bài 7. Cấp số nhân',
    prompt: 'Cho cấp số nhân $(u_n)$ có $u_1 = 3$ và $q = 2$. Số $384$ là số hạng thứ bao nhiêu của cấp số nhân này?',
    options: [
      { key: 'A', content: 'Số hạng thứ $8$' },
      { key: 'B', content: 'Số hạng thứ $7$' },
      { key: 'C', content: 'Số hạng thứ $9$' },
      { key: 'D', content: 'Số hạng thứ $6$' },
    ],
    correctAnswer: 'A',
    explanation: 'Giải $3 \\cdot 2^{n-1} = 384 \\Leftrightarrow 2^{n-1} = 128 = 2^7 \\Leftrightarrow n - 1 = 7 \\Leftrightarrow n = 8$.',
    pedagogicalTip: 'Nhớ các lũy thừa của $2$: $2^7 = 128, 2^8 = 256, 2^{10} = 1\\,024$.',
  },
  {
    topic: 'Bài 7. Cấp số nhân',
    prompt: 'Cho cấp số nhân $(u_n)$ có $u_2 = 6$ và $u_5 = 162$. Công bội $q$ của cấp số nhân bằng:',
    options: [
      { key: 'A', content: '$q = 3$' },
      { key: 'B', content: '$q = -3$' },
      { key: 'C', content: '$q = 2$' },
      { key: 'D', content: '$q = 9$' },
    ],
    correctAnswer: 'A',
    explanation: 'Ta có $\\frac{u_5}{u_2} = q^3 = \\frac{162}{6} = 27 = 3^3 \\Leftrightarrow q = 3$.',
    pedagogicalTip: 'Tỉ số $\\frac{u_m}{u_k} = q^{m - k}$.',
  },
  {
    topic: 'Bài 7. Cấp số nhân',
    prompt: 'Cho cấp số nhân $(u_n)$ có $u_1 = 16$ và công bội $q = \\frac{1}{2}$. Tổng của $6$ số hạng đầu tiên $S_6$ bằng:',
    options: [
      { key: 'A', content: '$\\frac{63}{2}$' },
      { key: 'B', content: '$31$' },
      { key: 'C', content: '$32$' },
      { key: 'D', content: '$\\frac{31}{2}$' },
    ],
    correctAnswer: 'A',
    explanation: 'Ta có $S_6 = \\frac{16\\left[1 - \\left(\\frac{1}{2}\\right)^6\\right]}{1 - \\frac{1}{2}} = 32 \\cdot \\frac{63}{64} = \\frac{63}{2}$.',
    pedagogicalTip: 'Với $q = \\frac{1}{2}$, mẫu số $1 - q = \\frac{1}{2}$ nên nhân $2$ lên tử số.',
  },
  {
    topic: 'Bài 7. Cấp số nhân',
    prompt: 'Một cấp số nhân có số hạng đầu $u_1 = 7$ và công bội $q = 1$. Tổng của $20$ số hạng đầu tiên $S_{20}$ bằng:',
    options: [
      { key: 'A', content: '$140$' },
      { key: 'B', content: '$7$' },
      { key: 'C', content: '$7^{20}$' },
      { key: 'D', content: '$27$' },
    ],
    correctAnswer: 'A',
    explanation: 'Khi $q = 1$, tất cả các số hạng đều bằng $u_1 = 7$, nên $S_{20} = 20 \\cdot 7 = 140$.',
    pedagogicalTip: 'Chú ý trường hợp đặc biệt $q = 1$ thì $S_n = n \\cdot u_1$.',
  },
  {
    topic: 'Bài 7. Cấp số nhân',
    prompt: 'Cho cấp số nhân $(u_n)$ có $u_1 = -2$ và $q = -2$. Tổng $S_4 = u_1 + u_2 + u_3 + u_4$ bằng:',
    options: [
      { key: 'A', content: '$10$' },
      { key: 'B', content: '$-10$' },
      { key: 'C', content: '$30$' },
      { key: 'D', content: '$-30$' },
    ],
    correctAnswer: 'A',
    explanation: 'Các số hạng là $-2; 4; -8; 16$. Tổng $S_4 = -2 + 4 - 8 + 16 = 10$.',
    pedagogicalTip: 'Với $n$ nhỏ có thể liệt kê trực tiếp hoặc dùng $S_4 = \\frac{-2[1 - (-2)^4]}{1 - (-2)} = 10$.',
  },
  {
    topic: 'Bài 7. Cấp số nhân',
    prompt: 'Một chủng vi khuẩn cứ sau mỗi giờ lại nhân đôi số lượng. Ban đầu có $100$ vi khuẩn. Sau $5$ giờ, số lượng vi khuẩn là:',
    options: [
      { key: 'A', content: '$3\\,200$' },
      { key: 'B', content: '$1\\,600$' },
      { key: 'C', content: '$6\\,400$' },
      { key: 'D', content: '$500$' },
    ],
    correctAnswer: 'A',
    explanation: 'Sau $5$ lần nhân đôi, số vi khuẩn là $100 \\cdot 2^5 = 100 \\cdot 32 = 3\\,200$.',
    pedagogicalTip: 'Sau $n$ chu kì nhân đôi từ số lượng $N_0$, số lượng là $N_0 \\cdot 2^n$ (tức số hạng thứ $n + 1$ của CSN).',
  },
];

const bai7De1P2: Omit<TrueFalseQuestion, 'id' | 'part' | 'number'>[] = [
  {
    topic: 'Bài 7. Cấp số nhân',
    prompt: 'Cho cấp số nhân $(u_n)$ gồm các số hạng dương, biết $u_2 = 12$ và $u_4 = 108$. Xét tính đúng sai của các mệnh đề sau:',
    statements: [
      {
        id: 'a',
        label: 'a',
        statement: 'Ta có hệ thức $\\frac{u_4}{u_2} = q^2 = 9$.',
        isCorrect: true,
        explanation: 'Vì $u_4 = u_2 \\cdot q^2$ nên $q^2 = \\frac{108}{12} = 9$.',
      },
      {
        id: 'b',
        label: 'b',
        statement: 'Công bội của cấp số nhân là $q = 3$ và số hạng đầu là $u_1 = 4$.',
        isCorrect: true,
        explanation: 'Do các số hạng đều dương nên $q > 0 \\Rightarrow q = 3$, suy ra $u_1 = \\frac{u_2}{q} = \\frac{12}{3} = 4$.',
      },
      {
        id: 'c',
        label: 'c',
        statement: 'Số hạng thứ $6$ của cấp số nhân bằng $486$.',
        isCorrect: false,
        explanation: 'Ta có $u_6 = u_4 \\cdot q^2 = 108 \\cdot 9 = 972 \\neq 486$.',
      },
      {
        id: 'd',
        label: 'd',
        statement: 'Tổng của $5$ số hạng đầu tiên của cấp số nhân bằng $484$.',
        isCorrect: true,
        explanation: 'Ta có $S_5 = \\frac{4(3^5 - 1)}{3 - 1} = 2 \\cdot 242 = 484$.',
      },
    ],
    pedagogicalTip: 'Khai thác giả thiết "các số hạng dương" để xác định $q > 0$.',
  },
  {
    topic: 'Bài 7. Cấp số nhân',
    prompt: 'Ông An gửi tiết kiệm $100$ triệu đồng vào ngân hàng theo hình thức lãi kép với lãi suất $6\\%$/năm (giả sử không rút gốc và lãi trong suốt kỳ hạn). Gọi $A_n$ (triệu đồng) là tổng số tiền cả vốn lẫn lãi sau $n$ năm. Xét tính đúng sai của các mệnh đề sau:',
    statements: [
      {
        id: 'a',
        label: 'a',
        statement: 'Sau $1$ năm, tổng số tiền cả vốn lẫn lãi ông An có được là $A_1 = 106$ triệu đồng.',
        isCorrect: true,
        explanation: 'Ta có $A_1 = 100 \\cdot (1 + 0,06) = 106$ triệu đồng.',
      },
      {
        id: 'b',
        label: 'b',
        statement: 'Dãy số $(A_n)$ lập thành một cấp số nhân có công bội $q = 1,06$.',
        isCorrect: true,
        explanation: 'Mỗi năm số tiền nhân với hệ số $(1 + 6\\%) = 1,06$.',
      },
      {
        id: 'c',
        label: 'c',
        statement: 'Công thức tính tổng số tiền sau $n$ năm là $A_n = 100 \\cdot (1,06)^{n-1}$.',
        isCorrect: false,
        explanation: 'Sau $n$ năm có $n$ kỳ tính lãi nên công thức đúng phải là $A_n = 100 \\cdot (1,06)^n$.',
      },
      {
        id: 'd',
        label: 'd',
        statement: 'Sau $5$ năm, tổng số tiền ông An nhận được xấp xỉ $133,82$ triệu đồng.',
        isCorrect: true,
        explanation: 'Ta có $A_5 = 100 \\cdot (1,06)^5 \\approx 133,82$ triệu đồng.',
      },
    ],
    pedagogicalTip: 'Công thức lãi kép sau $n$ kỳ hạn với vốn ban đầu $P$ là $A_n = P(1 + r)^n$.',
  },
];

const bai7De1P3: Omit<ShortAnswerQuestion, 'id' | 'part' | 'number' | 'points'>[] = [
  {
    topic: 'Bài 7. Cấp số nhân',
    prompt: 'Cho cấp số nhân $(u_n)$ có $u_1 = 3$ và công bội $q = 2$. Cần lấy tổng của bao nhiêu số hạng đầu tiên để được tổng $S_n = 1\\,533$?',
    acceptableAnswers: ['9', '9.0'],
    explanation: 'Ta có $S_n = \\frac{3(2^n - 1)}{2 - 1} = 3(2^n - 1) = 1\\,533 \\Leftrightarrow 2^n - 1 = 511 \\Leftrightarrow 2^n = 512 = 2^9 \\Leftrightarrow n = 9$.',
    pedagogicalTip: 'Lưu ý $2^9 = 512$.',
  },
  {
    topic: 'Bài 7. Cấp số nhân',
    prompt: 'Biết ba số $x - 2; x + 2; 3x + 2$ theo thứ tự lập thành một cấp số nhân và $x > 0$. Tìm giá trị của $x$.',
    acceptableAnswers: ['6', '6.0'],
    explanation: 'Ta có $(x + 2)^2 = (x - 2)(3x + 2) \\Leftrightarrow x^2 + 4x + 4 = 3x^2 - 4x - 4 \\Leftrightarrow 2x^2 - 8x - 8 = 0$... Kiểm tra lại để nghiệm nguyên đẹp!',
    pedagogicalTip: 'Áp dụng tính chất $b^2 = ac$.',
  },
  {
    topic: 'Bài 7. Cấp số nhân',
    prompt: 'Cho cấp số nhân $(u_n)$ có $u_2 = 10$ và $u_5 = 1\\,250$. Tính số hạng thứ $3$ ($u_3$) của cấp số nhân.',
    acceptableAnswers: ['50', '50.0'],
    explanation: 'Ta có $q^3 = \\frac{u_5}{u_2} = \\frac{1250}{10} = 125 = 5^3 \\Leftrightarrow q = 5$. Suy ra $u_3 = u_2 \\cdot q = 10 \\cdot 5 = 50$.',
    pedagogicalTip: 'Tìm $q = 5$ từ $q^3 = 125$ rồi tính $u_3 = u_2 \\cdot q$.',
  },
  {
    topic: 'Bài 7. Cấp số nhân',
    prompt: 'Một quả bóng cao su được thả rơi tự do từ độ cao $16\\text{ m}$ xuống mặt sàn. Sau mỗi lần chạm đất, quả bóng nảy lên độ cao bằng $\\frac{3}{4}$ độ cao của lần rơi ngay trước đó. Tính độ cao (m) của quả bóng ở lần nảy lên thứ $3$.',
    acceptableAnswers: ['6.75', '6,75'],
    explanation: 'Độ cao sau lần nảy thứ $3$ là $h_3 = 16 \\cdot \\left(\\frac{3}{4}\\right)^3 = 16 \\cdot \\frac{27}{64} = \\frac{27}{4} = 6,75\\text{ (m)}$.',
    pedagogicalTip: 'Lần nảy thứ $n$ có độ cao $h_n = h_0 \\cdot q^n$.',
  },
];

// Sửa câu số 2 của bai7De1P3 để có nghiệm nguyên đẹp x = 6:
// Với x = 6: (6 - 3) = 3, (6 + 3) = 9, (4*6 + 3) = 27 -> 3, 9, 27 là CSN!
bai7De1P3[1] = {
  topic: 'Bài 7. Cấp số nhân',
  prompt: 'Biết ba số $x - 3; x + 3; 4x + 3$ theo thứ tự lập thành một cấp số nhân với $x > 0$. Tìm giá trị của $x$.',
  acceptableAnswers: ['6', '6.0'],
  explanation: 'Theo tính chất cấp số nhân: $(x + 3)^2 = (x - 3)(4x + 3) \\Leftrightarrow x^2 + 6x + 9 = 4x^2 - 9x - 9 \\Leftrightarrow 3x^2 - 15x - 18 = 0 \\Leftrightarrow x^2 - 5x - 6 = 0$. Vì $x > 0$ nên $x = 6$ (khi đó ba số là $3; 9; 27$).',
  pedagogicalTip: 'Giải phương trình $(x + 3)^2 = (x - 3)(4x + 3)$ và chọn nghiệm dương $x = 6$.',
};

const bai7De1P4: Omit<StepOrderingQuestion, 'id' | 'part' | 'number' | 'points'>[] = [
  {
    topic: 'Bài 7. Cấp số nhân',
    problemStatement: 'Cho cấp số nhân $(u_n)$ có các số hạng dương, biết $u_3 = 18$ và $u_6 = 486$. Hãy sắp xếp các bước tìm $u_1, q$ và tính tổng $6$ số hạng đầu $S_6$ theo đúng thứ tự logic.',
    conclusionTarget: 'Tìm được $u_1 = 2, q = 3$ và $S_6 = 728$.',
    steps: [
      {
        id: 's1',
        originalIndex: 1,
        roleDescription: 'Biểu diễn u_3 và u_6 theo u_1 và q',
        content: 'Áp dụng công thức số hạng tổng quát $u_n = u_1 q^{n-1}$, ta có hệ phương trình $\\begin{cases} u_1 q^2 = 18 \\\\ u_1 q^5 = 486 \\end{cases}$.',
      },
      {
        id: 's2',
        originalIndex: 2,
        roleDescription: 'Chia vế theo vế để tìm công bội q và số hạng đầu u_1',
        content: 'Chia phương trình thứ hai cho phương trình thứ nhất: $q^3 = \\frac{486}{18} = 27 \\Leftrightarrow q = 3$, suy ra $u_1 = \\frac{18}{3^2} = 2$.',
      },
      {
        id: 's3',
        originalIndex: 3,
        roleDescription: 'Áp dụng công thức tổng 6 số hạng đầu tiên',
        content: 'Thay $u_1 = 2, q = 3, n = 6$ vào công thức $S_6 = \\frac{u_1(q^6 - 1)}{q - 1} = \\frac{2(3^6 - 1)}{3 - 1}$.',
      },
      {
        id: 's4',
        originalIndex: 4,
        roleDescription: 'Tính kết quả và kết luận',
        content: 'Vì $3^6 = 729$ nên $S_6 = 729 - 1 = 728$.',
      },
    ],
    pedagogicalTip: 'Trong hệ phương trình cấp số nhân, phép chia vế theo vế giúp khử ngay $u_1$.',
    teacherAnalysis: 'Rèn kỹ năng giải hệ phương trình mũ của cấp số nhân.',
  },
  {
    topic: 'Bài 7. Cấp số nhân',
    problemStatement: 'Cho dãy số $(u_n)$ với $u_n = 4 \\cdot \\left(\\frac{1}{2}\\right)^n$ ($n \\in \\mathbb{N}^*$). Chứng minh $(u_n)$ là một cấp số nhân và tìm $u_1, q$. Hãy sắp xếp các bước giải theo đúng thứ tự logic.',
    conclusionTarget: 'Chứng minh $(u_n)$ là CSN có $u_1 = 2$ và $q = \\frac{1}{2}$.',
    steps: [
      {
        id: 's1',
        originalIndex: 1,
        roleDescription: 'Lập tỉ số u_{n+1} / u_n với mọi n nguyên dương',
        content: 'Với mọi $n \\in \\mathbb{N}^*$, ta có $u_n > 0$ và xét thương $\\frac{u_{n+1}}{u_n} = \\frac{4 \\cdot \\left(\\frac{1}{2}\\right)^{n+1}}{4 \\cdot \\left(\\frac{1}{2}\\right)^n}$.',
      },
      {
        id: 's2',
        originalIndex: 2,
        roleDescription: 'Rút gọn lũy thừa để được hằng số không đổi',
        content: 'Rút gọn biểu thức, ta được $\\frac{u_{n+1}}{u_n} = \\frac{1}{2}$ không đổi với mọi $n \\in \\mathbb{N}^*$, hay $u_{n+1} = \\frac{1}{2}u_n$.',
      },
      {
        id: 's3',
        originalIndex: 3,
        roleDescription: 'Tính số hạng đầu u_1',
        content: 'Thay $n = 1$ vào công thức ta được số hạng đầu tiên $u_1 = 4 \\cdot \\frac{1}{2} = 2$.',
      },
      {
        id: 's4',
        originalIndex: 4,
        roleDescription: 'Kết luận cấp số nhân',
        content: 'Vậy $(u_n)$ là một cấp số nhân với số hạng đầu $u_1 = 2$ và công bội $q = \\frac{1}{2}$.',
      },
    ],
    pedagogicalTip: 'Chứng minh thương $\\frac{u_{n+1}}{u_n}$ là hằng số không phụ thuộc vào $n$.',
    teacherAnalysis: 'Quy trình chuẩn chứng minh một dãy số là cấp số nhân.',
  },
  {
    topic: 'Bài 7. Cấp số nhân',
    problemStatement: 'Tính tổng $S = 5 + 55 + 555 + \\dots + \\underbrace{55\\dots 5}_{n \\text{ chữ số } 5}$ theo $n$. Hãy sắp xếp các bước giải theo đúng thứ tự logic.',
    conclusionTarget: 'Tìm được $S = \\frac{5}{81}\\left(10^{n+1} - 9n - 10\\right)$.',
    steps: [
      {
        id: 's1',
        originalIndex: 1,
        roleDescription: 'Đặt nhân tử 5/9 để đưa về các số dạng 10^k - 1',
        content: 'Ta biến đổi $S = \\frac{5}{9}(9 + 99 + 999 + \\dots + \\underbrace{99\\dots 9}_{n \\text{ chữ số } 9})$.',
      },
      {
        id: 's2',
        originalIndex: 2,
        roleDescription: 'Viết mỗi số hạng dưới dạng hiệu 10^k - 1',
        content: 'Thay $9 = 10 - 1, 99 = 10^2 - 1, \\dots$, ta được $S = \\frac{5}{9}[(10 + 10^2 + \\dots + 10^n) - n]$.',
      },
      {
        id: 's3',
        originalIndex: 3,
        roleDescription: 'Áp dụng công thức tổng cấp số nhân cho 10 + 10^2 + ... + 10^n',
        content: 'Vì $10 + 10^2 + \\dots + 10^n = \\frac{10(10^n - 1)}{10 - 1} = \\frac{10^{n+1} - 10}{9}$ (tổng CSN có $u_1 = 10, q = 10$).',
      },
      {
        id: 's4',
        originalIndex: 4,
        roleDescription: 'Quy đồng và kết luận biểu thức rút gọn của S',
        content: 'Thay vào ta được $S = \\frac{5}{9}\\left(\\frac{10^{n+1} - 10}{9} - n\\right) = \\frac{5}{81}\\left(10^{n+1} - 9n - 10\\right)$.',
      },
    ],
    pedagogicalTip: 'Mọi bài toán tổng dạng $a + aa + aaa + \\dots$ đều quy về $\\frac{a}{9}(9 + 99 + 999 + \\dots)$.',
    teacherAnalysis: 'Bài toán vận dụng cao về tổng cấp số nhân rất hay gặp trong đề thi.',
  },
  {
    topic: 'Bài 7. Cấp số nhân',
    problemStatement: 'Tìm ba số hạng đầu của một cấp số nhân, biết tổng của chúng bằng $21$ và tích của chúng bằng $216$. Hãy sắp xếp các bước giải theo đúng thứ tự logic.',
    conclusionTarget: 'Tìm được bộ ba số $(3; 6; 12)$ hoặc $(12; 6; 3)$.',
    steps: [
      {
        id: 's1',
        originalIndex: 1,
        roleDescription: 'Dùng tính chất tích u_1 . u_3 = u_2^2 để tìm u_2',
        content: 'Từ tính chất $u_1 \\cdot u_3 = u_2^2$, giả thiết $u_1 u_2 u_3 = 216$ trở thành $u_2^3 = 216 \\Leftrightarrow u_2 = 6$.',
      },
      {
        id: 's2',
        originalIndex: 2,
        roleDescription: 'Lập hệ phương trình tổng và tích của u_1 và u_3',
        content: 'Thay $u_2 = 6$ vào giả thiết tổng và tích, ta có hệ $\\begin{cases} u_1 + u_3 = 21 - 6 = 15 \\\\ u_1 \\cdot u_3 = 6^2 = 36 \\end{cases}$.',
      },
      {
        id: 's3',
        originalIndex: 3,
        roleDescription: 'Áp dụng định lý Viète đảo để tìm u_1 và u_3',
        content: 'Do đó $u_1, u_3$ là hai nghiệm của phương trình bậc hai $X^2 - 15X + 36 = 0 \\Leftrightarrow X = 3$ hoặc $X = 12$.',
      },
      {
        id: 's4',
        originalIndex: 4,
        roleDescription: 'Kết luận hai bộ ba số thỏa mãn',
        content: 'Vậy ba số hạng cần tìm là $(3; 6; 12)$ (ứng với $q = 2$) hoặc $(12; 6; 3)$ (ứng với $q = \\frac{1}{2}$).',
      },
    ],
    pedagogicalTip: 'Khi biết tích $3$ số hạng liên tiếp của CSN, ta luôn tìm được ngay số hạng chính giữa $u_2$.',
    teacherAnalysis: 'Vận dụng tính chất trung bình nhân kết hợp định lý Viète.',
  },
];

const bai7De2P1: Omit<MultipleChoiceQuestion, 'id' | 'part' | 'number' | 'points'>[] = [
  {
    topic: 'Bài 7. Cấp số nhân',
    prompt: 'Cho cấp số nhân $(u_n)$ có $u_1 = -4$ và công bội $q = -2$. Số hạng thứ $6$ ($u_6$) của cấp số nhân là:',
    options: [
      { key: 'A', content: '$128$' },
      { key: 'B', content: '$-128$' },
      { key: 'C', content: '$64$' },
      { key: 'D', content: '$-64$' },
    ],
    correctAnswer: 'A',
    explanation: 'Ta có $u_6 = u_1 \\cdot q^5 = (-4) \\cdot (-2)^5 = (-4) \\cdot (-32) = 128$.',
    pedagogicalTip: 'Tích của hai số âm $(-4)$ và $(-32)$ là số dương $128$.',
  },
  {
    topic: 'Bài 7. Cấp số nhân',
    prompt: 'Cho cấp số nhân $(u_n)$ có $u_1 = 81$ và $u_2 = 27$. Công bội $q$ của cấp số nhân bằng:',
    options: [
      { key: 'A', content: '$q = \\frac{1}{3}$' },
      { key: 'B', content: '$q = 3$' },
      { key: 'C', content: '$q = -\\frac{1}{3}$' },
      { key: 'D', content: '$q = -54$' },
    ],
    correctAnswer: 'A',
    explanation: 'Ta có $q = \\frac{u_2}{u_1} = \\frac{27}{81} = \\frac{1}{3}$.',
    pedagogicalTip: 'Công bội $q = \\frac{u_2}{u_1}$.',
  },
  {
    topic: 'Bài 7. Cấp số nhân',
    prompt: 'Cho cấp số nhân $(u_n)$ có $u_3 = 12$ và công bội $q = -2$. Số hạng đầu $u_1$ bằng:',
    options: [
      { key: 'A', content: '$3$' },
      { key: 'B', content: '$-3$' },
      { key: 'C', content: '$6$' },
      { key: 'D', content: '$-6$' },
    ],
    correctAnswer: 'A',
    explanation: 'Từ $u_3 = u_1 q^2 \\Rightarrow 12 = u_1 \\cdot (-2)^2 = 4u_1 \\Rightarrow u_1 = 3$.',
    pedagogicalTip: 'Lưu ý $(-2)^2 = 4 > 0$.',
  },
  {
    topic: 'Bài 7. Cấp số nhân',
    prompt: 'Trong một cấp số nhân có các số hạng dương, biết $u_2 \\cdot u_8 = 64$. Khi đó số hạng $u_5$ bằng:',
    options: [
      { key: 'A', content: '$8$' },
      { key: 'B', content: '$16$' },
      { key: 'C', content: '$32$' },
      { key: 'D', content: '$4$' },
    ],
    correctAnswer: 'A',
    explanation: 'Vì $2 + 8 = 2 \\cdot 5$ nên $u_2 \\cdot u_8 = u_5^2 = 64$. Do $u_5 > 0$ nên $u_5 = 8$.',
    pedagogicalTip: 'Tính chất đối xứng trong CSN: nếu $m + k = 2p$ thì $u_m \\cdot u_k = u_p^2$.',
  },
  {
    topic: 'Bài 7. Cấp số nhân',
    prompt: 'Cho cấp số nhân $(u_n)$ có $u_1 = 1$ và $q = 4$. Tổng của $4$ số hạng đầu tiên $S_4$ bằng:',
    options: [
      { key: 'A', content: '$85$' },
      { key: 'B', content: '$64$' },
      { key: 'C', content: '$255$' },
      { key: 'D', content: '$84$' },
    ],
    correctAnswer: 'A',
    explanation: 'Ta có $S_4 = \\frac{1(4^4 - 1)}{4 - 1} = \\frac{255}{3} = 85$.',
    pedagogicalTip: 'Áp dụng công thức $S_4 = \\frac{u_1(q^4 - 1)}{q - 1}$.',
  },
  {
    topic: 'Bài 7. Cấp số nhân',
    prompt: 'Số $\\frac{1}{128}$ là số hạng thứ bao nhiêu của cấp số nhân $\\frac{1}{2}; \\frac{1}{4}; \\frac{1}{8}; \\dots$?',
    options: [
      { key: 'A', content: 'Số hạng thứ $7$' },
      { key: 'B', content: 'Số hạng thứ $8$' },
      { key: 'C', content: 'Số hạng thứ $6$' },
      { key: 'D', content: 'Số hạng thứ $9$' },
    ],
    correctAnswer: 'A',
    explanation: 'Ta có $u_n = \\left(\\frac{1}{2}\\right)^n = \\frac{1}{128} = \\left(\\frac{1}{2}\\right)^7 \\Leftrightarrow n = 7$.',
    pedagogicalTip: 'Nhớ $2^7 = 128$.',
  },
  {
    topic: 'Bài 7. Cấp số nhân',
    prompt: 'Tổng $S = 1 + 3 + 3^2 + 3^3 + \\dots + 3^7$ bằng:',
    options: [
      { key: 'A', content: '$3\\,280$' },
      { key: 'B', content: '$1\\,093$' },
      { key: 'C', content: '$6\\,560$' },
      { key: 'D', content: '$2\\,187$' },
    ],
    correctAnswer: 'A',
    explanation: 'Đây là tổng của $8$ số hạng đầu của CSN có $u_1 = 1, q = 3$: $S = \\frac{3^8 - 1}{3 - 1} = \\frac{6561 - 1}{2} = 3\\,280$.',
    pedagogicalTip: 'Từ $3^0$ đến $3^7$ có $8$ số hạng (không phải $7$ số hạng!).',
  },
  {
    topic: 'Bài 7. Cấp số nhân',
    prompt: 'Cho cấp số nhân $(u_n)$ có $u_1 = 2$ và $u_4 = -54$. Tổng của $5$ số hạng đầu tiên $S_5$ bằng:',
    options: [
      { key: 'A', content: '$122$' },
      { key: 'B', content: '$-122$' },
      { key: 'C', content: '$242$' },
      { key: 'D', content: '$62$' },
    ],
    correctAnswer: 'A',
    explanation: 'Ta có $q^3 = \\frac{-54}{2} = -27 \\Rightarrow q = -3$. Khi đó $S_5 = \\frac{2[1 - (-3)^5]}{1 - (-3)} = \\frac{2(1 + 243)}{4} = 122$.',
    pedagogicalTip: 'Chú ý $(-3)^5 = -243$ nên $1 - (-3)^5 = 244$.',
  },
  {
    topic: 'Bài 7. Cấp số nhân',
    prompt: 'Trong các dãy số xác định bởi hệ thức truy hồi dưới đây, dãy số nào là **cấp số nhân**?',
    options: [
      { key: 'A', content: '$u_1 = 4, u_{n+1} = -3u_n$' },
      { key: 'B', content: '$u_1 = 4, u_{n+1} = u_n - 3$' },
      { key: 'C', content: '$u_1 = 4, u_{n+1} = 2u_n + 1$' },
      { key: 'D', content: '$u_1 = 4, u_{n+1} = u_n^3$' },
    ],
    correctAnswer: 'A',
    explanation: 'Hệ thức $u_{n+1} = -3u_n$ xác định cấp số nhân có công bội $q = -3$.',
    pedagogicalTip: 'Định nghĩa CSN: $u_{n+1} = q \\cdot u_n$.',
  },
  {
    topic: 'Bài 7. Cấp số nhân',
    prompt: 'Nếu ba số $2; a; 18$ lập thành cấp số nhân thì giá trị của $a$ có thể là:',
    options: [
      { key: 'A', content: '$a = 6$ hoặc $a = -6$' },
      { key: 'B', content: 'Chỉ $a = 6$' },
      { key: 'C', content: '$a = 10$' },
      { key: 'D', content: '$a = 9$ hoặc $a = -9$' },
    ],
    correctAnswer: 'A',
    explanation: 'Ta có $a^2 = 2 \\cdot 18 = 36 \\Leftrightarrow a = 6$ (ứng với $q = 3$) hoặc $a = -6$ (ứng với $q = -3$).',
    pedagogicalTip: 'Khi đề bài không cho điều kiện $a > 0$, phương trình $a^2 = 36$ có đủ hai nghiệm $\\pm 6$.',
  },
  {
    topic: 'Bài 7. Cấp số nhân',
    prompt: 'Cho cấp số nhân $(u_n)$ có $S_3 = 21$ và $S_4 = 45$ với công bội $q = 2$. Số hạng đầu $u_1$ bằng:',
    options: [
      { key: 'A', content: '$3$' },
      { key: 'B', content: '$2$' },
      { key: 'C', content: '$4$' },
      { key: 'D', content: '$6$' },
    ],
    correctAnswer: 'A',
    explanation: 'Ta có $u_4 = S_4 - S_3 = 45 - 21 = 24$. Mà $u_4 = u_1 q^3 = 8u_1 \\Rightarrow u_1 = \\frac{24}{8} = 3$.',
    pedagogicalTip: 'Dùng $u_4 = S_4 - S_3 = 24$.',
  },
  {
    topic: 'Bài 7. Cấp số nhân',
    prompt: 'Dân số của một thị trấn hiện nay là $50\\,000$ người và tốc độ tăng dân số không đổi là $2\\%$/năm. Sau $2$ năm nữa, dân số của thị trấn đó là:',
    options: [
      { key: 'A', content: '$52\\,020$ người' },
      { key: 'B', content: '$52\\,000$ người' },
      { key: 'C', content: '$51\\,000$ người' },
      { key: 'D', content: '$54\\,000$ người' },
    ],
    correctAnswer: 'A',
    explanation: 'Sau $2$ năm, dân số là $50\\,000 \\cdot (1,02)^2 = 50\\,000 \\cdot 1,0404 = 52\\,020$ người.',
    pedagogicalTip: 'Bài toán tăng trưởng dân số tuân theo quy luật cấp số nhân với $q = 1 + r$.',
  },
];

const bai7De2P2: Omit<TrueFalseQuestion, 'id' | 'part' | 'number'>[] = [
  ...bai7De1P2,
];

const bai7De2P3: Omit<ShortAnswerQuestion, 'id' | 'part' | 'number' | 'points'>[] = [
  {
    topic: 'Bài 7. Cấp số nhân',
    prompt: 'Cho cấp số nhân $(u_n)$ có $u_1 = 4$ và công bội $q = 3$. Tính tổng của $5$ số hạng đầu tiên $S_5$.',
    acceptableAnswers: ['484', '484.0'],
    explanation: 'Ta có $S_5 = \\frac{4(3^5 - 1)}{3 - 1} = 2 \\cdot 242 = 484$.',
    pedagogicalTip: 'Áp dụng công thức $S_5 = \\frac{u_1(q^5 - 1)}{q - 1}$.',
  },
  {
    topic: 'Bài 7. Cấp số nhân',
    prompt: 'Cho cấp số nhân $(u_n)$ có các số hạng dương thỏa mãn $u_1 = 3$ và $u_5 = 243$. Tính số hạng thứ $4$ ($u_4$).',
    acceptableAnswers: ['81', '81.0'],
    explanation: 'Ta có $q^4 = \\frac{243}{3} = 81 \\Rightarrow q = 3$ (do $u_n > 0$). Suy ra $u_4 = u_1 q^3 = 3 \\cdot 27 = 81$.',
    pedagogicalTip: 'Tìm $q = 3$ rồi tính $u_4 = 3 \\cdot 3^3 = 81$.',
  },
  {
    topic: 'Bài 7. Cấp số nhân',
    prompt: 'Cần lấy tổng của bao nhiêu số hạng đầu của cấp số nhân $3; 6; 12; 24; \\dots$ để được tổng bằng $765$?',
    acceptableAnswers: ['8', '8.0'],
    explanation: 'Ta có $S_n = 3(2^n - 1) = 765 \\Leftrightarrow 2^n - 1 = 255 \\Leftrightarrow 2^n = 256 = 2^8 \\Leftrightarrow n = 8$.',
    pedagogicalTip: 'Nhớ $2^8 = 256$.',
  },
  {
    topic: 'Bài 7. Cấp số nhân',
    prompt: 'Tế bào E. coli trong điều kiện nuôi cấy thích hợp cứ $20$ phút lại phân đôi một lần. Giả sử ban đầu có $5$ tế bào. Hỏi sau $2$ giờ (tức $120$ phút) sẽ có bao nhiêu tế bào?',
    acceptableAnswers: ['320', '320.0'],
    explanation: 'Trong $120$ phút có $\\frac{120}{20} = 6$ lần phân đôi. Số tế bào thu được là $5 \\cdot 2^6 = 5 \\cdot 64 = 320$ tế bào.',
    pedagogicalTip: 'Số lần phân đôi trong $2$ giờ là $120 : 20 = 6$ lần.',
  },
];

const bai7De2P4: Omit<StepOrderingQuestion, 'id' | 'part' | 'number' | 'points'>[] = [
  ...bai7De1P4,
];

// ============================================================================
// ÔN TẬP CHƯƠNG II. BÀI TẬP CUỐI CHƯƠNG II (2 Đề ôn tổng hợp Chương II)
// ============================================================================
const onTapC2De1P1 = [
  bai5De1P1[0],
  bai5De1P1[2],
  bai5De1P1[4],
  bai5De1P1[9],
  bai6De1P1[1],
  bai6De1P1[5],
  bai6De1P1[6],
  bai6De1P1[10],
  bai7De1P1[0],
  bai7De1P1[2],
  bai7De1P1[5],
  bai7De1P1[11],
];
const onTapC2De1P2 = [bai6De1P2[0], bai7De1P2[0]];
const onTapC2De1P3 = [bai5De1P3[1], bai6De1P3[1], bai6De1P3[3], bai7De1P3[0]];
const onTapC2De1P4 = [bai5De1P4[0], bai5De1P4[1], bai6De1P4[0], bai7De1P4[0]];

const onTapC2De2P1 = [
  bai5De2P1[0],
  bai5De2P1[2],
  bai5De2P1[4],
  bai5De2P1[8],
  bai6De2P1[0],
  bai6De2P1[3],
  bai6De2P1[7],
  bai6De2P1[10],
  bai7De2P1[0],
  bai7De2P1[3],
  bai7De2P1[6],
  bai7De2P1[11],
];
const onTapC2De2P2 = [bai5De1P2[0], bai7De1P2[1]];
const onTapC2De2P3 = [bai5De2P3[2], bai6De2P3[2], bai7De2P3[1], bai7De2P3[3]];
const onTapC2De2P4 = [bai5De1P4[3], bai6De1P4[1], bai7De1P4[2], bai7De1P4[3]];

export const chapter2LessonExams: Record<string, ExamSet[]> = {
  'bai-5': [
    buildLessonExamSet(
      'de-on-bai-5-so-1',
      'Đề ôn số 01 - Bài 5. Dãy số',
      'Bài 5. Dãy số',
      1,
      bai5De1P1,
      bai5De1P2,
      bai5De1P3,
      bai5De1P4
    ),
    buildLessonExamSet(
      'de-on-bai-5-so-2',
      'Đề ôn số 02 - Bài 5. Dãy số',
      'Bài 5. Dãy số',
      2,
      bai5De2P1,
      bai5De2P2,
      bai5De2P3,
      bai5De2P4
    ),
  ],
  'bai-6': [
    buildLessonExamSet(
      'de-on-bai-6-so-1',
      'Đề ôn số 01 - Bài 6. Cấp số cộng',
      'Bài 6. Cấp số cộng',
      1,
      bai6De1P1,
      bai6De1P2,
      bai6De1P3,
      bai6De1P4
    ),
    buildLessonExamSet(
      'de-on-bai-6-so-2',
      'Đề ôn số 02 - Bài 6. Cấp số cộng',
      'Bài 6. Cấp số cộng',
      2,
      bai6De2P1,
      bai6De2P2,
      bai6De2P3,
      bai6De2P4
    ),
  ],
  'bai-7': [
    buildLessonExamSet(
      'de-on-bai-7-so-1',
      'Đề ôn số 01 - Bài 7. Cấp số nhân',
      'Bài 7. Cấp số nhân',
      1,
      bai7De1P1,
      bai7De1P2,
      bai7De1P3,
      bai7De1P4
    ),
    buildLessonExamSet(
      'de-on-bai-7-so-2',
      'Đề ôn số 02 - Bài 7. Cấp số nhân',
      'Bài 7. Cấp số nhân',
      2,
      bai7De2P1,
      bai7De2P2,
      bai7De2P3,
      bai7De2P4
    ),
  ],
  'on-tap-chuong-2': [
    buildLessonExamSet(
      'de-on-on-tap-chuong-2-so-1',
      'Đề ôn số 01 - Ôn tập chương II. Bài tập cuối chương II',
      'Ôn tập chương II. Bài tập cuối chương II',
      1,
      onTapC2De1P1,
      onTapC2De1P2,
      onTapC2De1P3,
      onTapC2De1P4
    ),
    buildLessonExamSet(
      'de-on-on-tap-chuong-2-so-2',
      'Đề ôn số 02 - Ôn tập chương II. Bài tập cuối chương II',
      'Ôn tập chương II. Bài tập cuối chương II',
      2,
      onTapC2De2P1,
      onTapC2De2P2,
      onTapC2De2P3,
      onTapC2De2P4
    ),
  ],
};
