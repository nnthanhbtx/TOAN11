import {
  ExamSet,
  MultipleChoiceQuestion,
  TrueFalseQuestion,
  ShortAnswerQuestion,
  StepOrderingQuestion,
} from '../../types/exam';

export function buildLessonExamSet(
  examId: string,
  title: string,
  lessonFullName: string,
  examNumber: 1 | 2,
  part1: Omit<MultipleChoiceQuestion, 'id' | 'part' | 'number' | 'points'>[],
  part2: Omit<TrueFalseQuestion, 'id' | 'part' | 'number'>[],
  part3: Omit<ShortAnswerQuestion, 'id' | 'part' | 'number' | 'points'>[],
  part4: Omit<StepOrderingQuestion, 'id' | 'part' | 'number' | 'points'>[]
): ExamSet {
  return {
    id: examId,
    title,
    subtitle: `Đề ôn số 0${examNumber} • Chuẩn kiến thức trọng tâm ${lessonFullName}`,
    grade: 11,
    durationMinutes: 90,
    totalPoints: 10,
    description: `Đề ôn số 0${examNumber} (22 câu hỏi mới tương tự dạng bài SGK, đổi mới hoàn toàn số liệu) tập trung 100% vào kiến thức trọng tâm của ${lessonFullName}.`,
    part1: part1.slice(0, 12).map((q, idx) => ({
      ...q,
      id: `${examId}-p1-${idx + 1}`,
      part: 'part1',
      number: idx + 1,
      points: 0.25,
    })),
    part2: part2.slice(0, 2).map((q, idx) => ({
      ...q,
      id: `${examId}-p2-${idx + 1}`,
      part: 'part2',
      number: 13 + idx,
    })),
    part3: part3.slice(0, 4).map((q, idx) => ({
      ...q,
      id: `${examId}-p3-${idx + 1}`,
      part: 'part3',
      number: 15 + idx,
      points: 0.5,
    })),
    part4: part4.slice(0, 4).map((q, idx) => ({
      ...q,
      id: `${examId}-p4-${idx + 1}`,
      part: 'part4',
      number: 19 + idx,
      points: 0.75,
      steps: q.steps.map((s, sIdx) => ({
        ...s,
        id: `${examId}-p4-${idx + 1}-s${sIdx + 1}`,
        originalIndex: sIdx + 1,
      })),
    })),
  };
}

// ============================================================================
// BÀI 1. GIÁ TRỊ LƯỢNG GIÁC CỦA GÓC LƯỢNG GIÁC (2 Đề ôn riêng biệt)
// ============================================================================
const bai1De1P1: Omit<MultipleChoiceQuestion, 'id' | 'part' | 'number' | 'points'>[] = [
  {
    topic: 'Bài 1. Giá trị lượng giác của góc lượng giác',
    prompt: 'Đổi số đo của góc lượng giác $210^\\circ$ sang đơn vị rađian.',
    options: [
      { key: 'A', content: '$\\frac{7\\pi}{6}$' },
      { key: 'B', content: '$\\frac{5\\pi}{6}$' },
      { key: 'C', content: '$\\frac{4\\pi}{3}$' },
      { key: 'D', content: '$\\frac{7\\pi}{4}$' },
    ],
    correctAnswer: 'A',
    explanation: 'Áp dụng công thức $\\alpha = \\frac{210 \\cdot \\pi}{180} = \\frac{7\\pi}{6}$ (rad).',
    pedagogicalTip: 'Lấy số đo độ chia cho $180$ rồi nhân với $\\pi$.',
  },
  {
    topic: 'Bài 1. Giá trị lượng giác của góc lượng giác',
    prompt: 'Góc lượng giác có số đo $-\\frac{5\\pi}{12}$ rad đổi sang đơn vị độ bằng:',
    options: [
      { key: 'A', content: '$-65^\\circ$' },
      { key: 'B', content: '$-75^\\circ$' },
      { key: 'C', content: '$-85^\\circ$' },
      { key: 'D', content: '$-105^\\circ$' },
    ],
    correctAnswer: 'B',
    explanation: 'Ta có $-\\frac{5\\pi}{12} \\text{ rad} = -\\frac{5}{12} \\cdot 180^\\circ = -75^\\circ$.',
    pedagogicalTip: 'Thay $\\pi \\text{ rad} = 180^\\circ$.',
  },
  {
    topic: 'Bài 1. Giá trị lượng giác của góc lượng giác',
    prompt: 'Trên đường tròn bán kính $R = 12\\text{ cm}$, độ dài $l$ của cung tròn có số đo $\\frac{5\\pi}{6}$ rad là:',
    options: [
      { key: 'A', content: '$10\\pi\\text{ cm}$' },
      { key: 'B', content: '$8\\pi\\text{ cm}$' },
      { key: 'C', content: '$6\\pi\\text{ cm}$' },
      { key: 'D', content: '$12\\pi\\text{ cm}$' },
    ],
    correctAnswer: 'A',
    explanation: 'Ta có $l = R\\alpha = 12 \\cdot \\frac{5\\pi}{6} = 10\\pi\\text{ (cm)}$.',
    pedagogicalTip: 'Công thức tính độ dài cung tròn: $l = R\\alpha$ ($\\alpha$ tính bằng rad).',
  },
  {
    topic: 'Bài 1. Giá trị lượng giác của góc lượng giác',
    prompt: 'Cho hai tia $Ou, Ov, Ow$ thỏa mãn $(Ou, Ov) = 40^\\circ + k360^\\circ$ và $(Ov, Ow) = 110^\\circ + m360^\\circ$ ($k, m \\in \\mathbb{Z}$). Số đo của góc lượng giác $(Ou, Ow)$ là:',
    options: [
      { key: 'A', content: '$150^\\circ + n360^\\circ$ ($n \\in \\mathbb{Z}$)' },
      { key: 'B', content: '$70^\\circ + n360^\\circ$ ($n \\in \\mathbb{Z}$)' },
      { key: 'C', content: '$-70^\\circ + n360^\\circ$ ($n \\in \\mathbb{Z}$)' },
      { key: 'D', content: '$210^\\circ + n360^\\circ$ ($n \\in \\mathbb{Z}$)' },
    ],
    correctAnswer: 'A',
    explanation: 'Theo hệ thức Chasles: $(Ou, Ow) = (Ou, Ov) + (Ov, Ow) = 40^\\circ + 110^\\circ + n360^\\circ = 150^\\circ + n360^\\circ$.',
    pedagogicalTip: 'Hệ thức Chasles cộng hai góc lượng giác nối tiếp.',
  },
  {
    topic: 'Bài 1. Giá trị lượng giác của góc lượng giác',
    prompt: 'Góc lượng giác có số đo $765^\\circ$ có cùng tia cuối trên đường tròn lượng giác với góc nào dưới đây?',
    options: [
      { key: 'A', content: '$45^\\circ$' },
      { key: 'B', content: '$65^\\circ$' },
      { key: 'C', content: '$135^\\circ$' },
      { key: 'D', content: '$-45^\\circ$' },
    ],
    correctAnswer: 'A',
    explanation: 'Ta phân tích $765^\\circ = 45^\\circ + 2 \\cdot 360^\\circ$, nên hai góc $765^\\circ$ và $45^\\circ$ có cùng tia biểu diễn.',
    pedagogicalTip: 'Chia số đo góc cho $360^\\circ$ để tìm phần dư dương nhỏ hơn $360^\\circ$.',
  },
  {
    topic: 'Bài 1. Giá trị lượng giác của góc lượng giác',
    prompt: 'Cho góc lượng giác $\\alpha$ thỏa mãn $\\pi < \\alpha < \\frac{3\\pi}{2}$ (góc phần tư thứ III). Khẳng định nào sau đây đúng?',
    options: [
      { key: 'A', content: '$\\sin\\alpha < 0$ và $\\tan\\alpha > 0$' },
      { key: 'B', content: '$\\sin\\alpha < 0$ và $\\tan\\alpha < 0$' },
      { key: 'C', content: '$\\cos\\alpha > 0$ và $\\cot\\alpha > 0$' },
      { key: 'D', content: '$\\sin\\alpha > 0$ và $\\cos\\alpha < 0$' },
    ],
    correctAnswer: 'A',
    explanation: 'Ở góc phần tư thứ III, cả $\\sin\\alpha < 0$ và $\\cos\\alpha < 0$, do đó $\\tan\\alpha = \\frac{\\sin\\alpha}{\\cos\\alpha} > 0$.',
    pedagogicalTip: 'Trong góc phần tư thứ III, chỉ có $\\tan$ và $\\cot$ nhận giá trị dương.',
  },
  {
    topic: 'Bài 1. Giá trị lượng giác của góc lượng giác',
    prompt: 'Hệ thức lượng giác cơ bản nào sau đây là **sai** (với giả thiết các biểu thức đều có nghĩa)?',
    options: [
      { key: 'A', content: '$\\sin^2\\alpha + \\cos^2\\alpha = 1$' },
      { key: 'B', content: '$1 + \\tan^2\\alpha = \\frac{1}{\\cos^2\\alpha}$' },
      { key: 'C', content: '$1 + \\cot^2\\alpha = \\frac{1}{\\cos^2\\alpha}$' },
      { key: 'D', content: '$\\tan\\alpha \\cdot \\cot\\alpha = 1$' },
    ],
    correctAnswer: 'C',
    explanation: 'Hệ thức đúng phải là $1 + \\cot^2\\alpha = \\frac{1}{\\sin^2\\alpha}$. Do đó C sai.',
    pedagogicalTip: 'Chú ý mẫu số của $\\cot\\alpha = \\frac{\\cos\\alpha}{\\sin\\alpha}$ là $\\sin\\alpha$.',
  },
  {
    topic: 'Bài 1. Giá trị lượng giác của góc lượng giác',
    prompt: 'Với mọi góc lượng giác $\\alpha$, biểu thức $\\cos(\\pi + \\alpha)$ bằng:',
    options: [
      { key: 'A', content: '$-\\cos\\alpha$' },
      { key: 'B', content: '$\\cos\\alpha$' },
      { key: 'C', content: '$\\sin\\alpha$' },
      { key: 'D', content: '$-\\sin\\alpha$' },
    ],
    correctAnswer: 'A',
    explanation: 'Theo tính chất hai góc hơn kém $\\pi$: $\\cos(\\pi + \\alpha) = -\\cos\\alpha$.',
    pedagogicalTip: 'Hai góc hơn kém $\\pi$ có sin và cos đối nhau, tan và cot bằng nhau.',
  },
  {
    topic: 'Bài 1. Giá trị lượng giác của góc lượng giác',
    prompt: 'Với mọi góc $\\alpha$, khẳng định nào sau đây về hai góc phụ nhau là **đúng**?',
    options: [
      { key: 'A', content: '$\\sin\\left(\\frac{\\pi}{2} - \\alpha\\right) = \\cos\\alpha$' },
      { key: 'B', content: '$\\sin\\left(\\frac{\\pi}{2} - \\alpha\\right) = -\\cos\\alpha$' },
      { key: 'C', content: '$\\cos\\left(\\frac{\\pi}{2} - \\alpha\\right) = -\\sin\\alpha$' },
      { key: 'D', content: '$\\tan\\left(\\frac{\\pi}{2} - \\alpha\\right) = -\\cot\\alpha$' },
    ],
    correctAnswer: 'A',
    explanation: 'Theo quy tắc "phụ chéo": $\\sin\\left(\\frac{\\pi}{2} - \\alpha\\right) = \\cos\\alpha$.',
    pedagogicalTip: 'Hai góc phụ nhau có tổng bằng $\\frac{\\pi}{2}$.',
  },
  {
    topic: 'Bài 1. Giá trị lượng giác của góc lượng giác',
    prompt: 'Cho $\\cos\\alpha = \\frac{1}{3}$. Giá trị của biểu thức $P = 3\\sin^2\\alpha + 4\\cos^2\\alpha$ bằng:',
    options: [
      { key: 'A', content: '$\\frac{28}{9}$' },
      { key: 'B', content: '$\\frac{25}{9}$' },
      { key: 'C', content: '$\\frac{31}{9}$' },
      { key: 'D', content: '$3$' },
    ],
    correctAnswer: 'A',
    explanation: 'Ta viết $P = 3(\\sin^2\\alpha + \\cos^2\\alpha) + \\cos^2\\alpha = 3 + \\left(\\frac{1}{3}\\right)^2 = 3 + \\frac{1}{9} = \\frac{28}{9}$.',
    pedagogicalTip: 'Tách $4\\cos^2\\alpha = 3\\cos^2\\alpha + \\cos^2\\alpha$ để nhóm với $3\\sin^2\\alpha$.',
  },
  {
    topic: 'Bài 1. Giá trị lượng giác của góc lượng giác',
    prompt: 'Giá trị của $\\tan\\frac{13\\pi}{4}$ bằng:',
    options: [
      { key: 'A', content: '$1$' },
      { key: 'B', content: '$-1$' },
      { key: 'C', content: '$\\sqrt{3}$' },
      { key: 'D', content: '$0$' },
    ],
    correctAnswer: 'A',
    explanation: 'Ta có $\\tan\\frac{13\\pi}{4} = \\tan\\left(\\frac{\\pi}{4} + 3\\pi\\right) = \\tan\\frac{\\pi}{4} = 1$.',
    pedagogicalTip: 'Hàm $\\tan$ lặp lại giá trị sau mỗi bội nguyên $k\\pi$.',
  },
  {
    topic: 'Bài 1. Giá trị lượng giác của góc lượng giác',
    prompt: 'Cho $\\tan\\alpha = 2$. Giá trị của biểu thức $A = \\frac{2\\sin\\alpha + 3\\cos\\alpha}{4\\sin\\alpha - \\cos\\alpha}$ bằng:',
    options: [
      { key: 'A', content: '$1$' },
      { key: 'B', content: '$\\frac{7}{9}$' },
      { key: 'C', content: '$\\frac{5}{7}$' },
      { key: 'D', content: '$2$' },
    ],
    correctAnswer: 'A',
    explanation: 'Chia cả tử và mẫu cho $\\cos\\alpha \\neq 0$: $A = \\frac{2\\tan\\alpha + 3}{4\\tan\\alpha - 1} = \\frac{2 \\cdot 2 + 3}{4 \\cdot 2 - 1} = \\frac{7}{7} = 1$.',
    pedagogicalTip: 'Biểu thức bậc nhất thuần nhất theo $\\sin\\alpha, \\cos\\alpha$ luôn chia cả tử và mẫu cho $\\cos\\alpha$.',
  },
];

const bai1De1P2: Omit<TrueFalseQuestion, 'id' | 'part' | 'number'>[] = [
  {
    topic: 'Bài 1. Giá trị lượng giác của góc lượng giác',
    prompt: 'Cho góc lượng giác $\\alpha$ thỏa mãn $\\cos\\alpha = -\\frac{5}{13}$ và $\\frac{\\pi}{2} < \\alpha < \\pi$. Xét tính đúng sai của các mệnh đề sau:',
    statements: [
      {
        id: 'a',
        label: 'a',
        statement: 'Điểm biểu diễn của góc $\\alpha$ trên đường tròn lượng giác thuộc góc phần tư thứ II nên $\\sin\\alpha > 0$.',
        isCorrect: true,
        explanation: 'Vì $\\frac{\\pi}{2} < \\alpha < \\pi$ nên điểm cuối nằm ở góc phần tư thứ II, suy ra tung độ $\\sin\\alpha > 0$.',
      },
      {
        id: 'b',
        label: 'b',
        statement: 'Giá trị của $\\sin\\alpha$ bằng $\\frac{12}{13}$.',
        isCorrect: true,
        explanation: 'Ta có $\\sin\\alpha = \\sqrt{1 - \\cos^2\\alpha} = \\sqrt{1 - \\frac{25}{169}} = \\frac{12}{13}$.',
      },
      {
        id: 'c',
        label: 'c',
        statement: 'Giá trị của $\\tan\\alpha$ bằng $\\frac{12}{5}$.',
        isCorrect: false,
        explanation: 'Ta có $\\tan\\alpha = \\frac{\\sin\\alpha}{\\cos\\alpha} = \\frac{12/13}{-5/13} = -\\frac{12}{5} \\neq \\frac{12}{5}$.',
      },
      {
        id: 'd',
        label: 'd',
        statement: 'Giá trị của $\\cot(\\pi - \\alpha)$ bằng $\\frac{5}{12}$.',
        isCorrect: true,
        explanation: 'Ta có $\\cot(\\pi - \\alpha) = -\\cot\\alpha = -\\left(-\\frac{5}{12}\\right) = \\frac{5}{12}$.',
      },
    ],
    pedagogicalTip: 'Áp dụng bộ số Pythagore $(5, 12, 13)$ kết hợp dấu góc phần tư thứ II.',
  },
  {
    topic: 'Bài 1. Giá trị lượng giác của góc lượng giác',
    prompt: 'Một bánh xe nước hình tròn có bán kính $R = 4\\text{ m}$ quay quanh tâm $O$. Xét tính đúng sai của các mệnh đề sau:',
    statements: [
      {
        id: 'a',
        label: 'a',
        statement: 'Khi bánh xe quay được một góc $90^\\circ$ theo chiều dương thì góc lượng giác tương ứng bằng $\\frac{\\pi}{2}$ rad.',
        isCorrect: true,
        explanation: 'Ta có $90^\\circ = \\frac{90\\pi}{180} = \\frac{\\pi}{2}$ rad.',
      },
      {
        id: 'b',
        label: 'b',
        statement: 'Quãng đường một điểm trên vành bánh xe đi được khi bánh xe quay một góc $\\frac{\\pi}{2}$ rad là $2\\pi\\text{ (m)}$.',
        isCorrect: true,
        explanation: 'Độ dài cung tròn là $l = R\\alpha = 4 \\cdot \\frac{\\pi}{2} = 2\\pi\\text{ (m)}$.',
      },
      {
        id: 'c',
        label: 'c',
        statement: 'Khi bánh xe quay theo chiều kim đồng hồ một góc $120^\\circ$ thì góc lượng giác quét được có số đo là $+\\frac{2\\pi}{3}$ rad.',
        isCorrect: false,
        explanation: 'Quay cùng chiều kim đồng hồ là chiều âm nên số đo góc lượng giác phải là $-\\frac{2\\pi}{3}$ rad.',
      },
      {
        id: 'd',
        label: 'd',
        statement: 'Sau khi bánh xe quay đúng $3$ vòng nguyên theo chiều dương, góc lượng giác quét được là $6\\pi$ rad.',
        isCorrect: true,
        explanation: 'Mỗi vòng ứng với $2\\pi$ rad, nên $3$ vòng theo chiều dương là $3 \\cdot 2\\pi = 6\\pi$ rad.',
      },
    ],
    pedagogicalTip: 'Chiều dương lượng giác là ngược chiều kim đồng hồ; chiều âm là cùng chiều kim đồng hồ.',
  },
];

const bai1De1P3: Omit<ShortAnswerQuestion, 'id' | 'part' | 'number' | 'points'>[] = [
  {
    topic: 'Bài 1. Giá trị lượng giác của góc lượng giác',
    prompt: 'Một cabin đu quay có bán kính $R = 15\\text{ m}$ quay được một góc có số đo $\\alpha = 1,4\\text{ rad}$. Tính độ dài cung tròn $l\\text{ (m)}$ mà cabin đã di chuyển được.',
    acceptableAnswers: ['21', '21.0'],
    explanation: 'Áp dụng công thức $l = R\\alpha = 15 \\cdot 1,4 = 21\\text{ (m)}$.',
    pedagogicalTip: 'Nhân trực tiếp bán kính $R$ với số đo góc $\\alpha$ (rad).',
  },
  {
    topic: 'Bài 1. Giá trị lượng giác của góc lượng giác',
    prompt: 'Cho góc lượng giác $\\alpha$ thỏa mãn $\\tan\\alpha + \\cot\\alpha = 3$. Tính giá trị của biểu thức $S = \\tan^2\\alpha + \\cot^2\\alpha$.',
    acceptableAnswers: ['7', '7.0'],
    explanation: 'Ta có $\\tan^2\\alpha + \\cot^2\\alpha = (\\tan\\alpha + \\cot\\alpha)^2 - 2\\tan\\alpha\\cot\\alpha = 3^2 - 2 \\cdot 1 = 7$.',
    pedagogicalTip: 'Sử dụng hằng đẳng thức $a^2 + b^2 = (a + b)^2 - 2ab$ với $\\tan\\alpha\\cot\\alpha = 1$.',
  },
  {
    topic: 'Bài 1. Giá trị lượng giác của góc lượng giác',
    prompt: 'Rút gọn và tính giá trị của biểu thức $M = \\sin^2 25^\\circ + \\sin^2 65^\\circ + 4\\tan 35^\\circ \\tan 55^\\circ$.',
    acceptableAnswers: ['5', '5.0'],
    explanation: 'Vì $65^\\circ = 90^\\circ - 25^\\circ$ nên $\\sin 65^\\circ = \\cos 25^\\circ \\Rightarrow \\sin^2 25^\\circ + \\cos^2 25^\\circ = 1$. Tương tự $\\tan 55^\\circ = \\cot 35^\\circ \\Rightarrow 4\\tan 35^\\circ\\cot 35^\\circ = 4$. Vậy $M = 1 + 4 = 5$.',
    pedagogicalTip: 'Ghép các cặp góc phụ nhau có tổng bằng $90^\\circ$.',
  },
  {
    topic: 'Bài 1. Giá trị lượng giác của góc lượng giác',
    prompt: 'Nhiệt độ ngoài trời $T\\text{ }(^\\circ\\text{C})$ tại một trạm khí tượng vào thời điểm $t$ (giờ, $0 \\le t \\le 24$) được mô hình hóa bởi $T(t) = 26 + 5\\sin\\left(\\frac{\\pi(t - 8)}{12}\\right)$. Tính nhiệt độ $\\text{(}^\\circ\\text{C)}$ lúc $14$ giờ chiều ($t = 14$).',
    acceptableAnswers: ['31', '31.0'],
    explanation: 'Thay $t = 14$ vào công thức: $T(14) = 26 + 5\\sin\\left(\\frac{6\\pi}{12}\\right) = 26 + 5\\sin\\frac{\\pi}{2} = 26 + 5 = 31\\text{ }(^\\circ\\text{C)}$.',
    pedagogicalTip: 'Thay $t = 14$ vào biểu thức và lưu ý $\\sin\\frac{\\pi}{2} = 1$.',
  },
];

const bai1De1P4: Omit<StepOrderingQuestion, 'id' | 'part' | 'number' | 'points'>[] = [
  {
    topic: 'Bài 1. Giá trị lượng giác của góc lượng giác',
    problemStatement: 'Cho $\\sin\\alpha = -\\frac{4}{5}$ và $\\frac{3\\pi}{2} < \\alpha < 2\\pi$. Hãy sắp xếp các bước tính $\\cos\\alpha$ và $\\cot\\alpha$ theo đúng thứ tự logic.',
    conclusionTarget: 'Tìm được $\\cos\\alpha = \\frac{3}{5}$ và $\\cot\\alpha = -\\frac{3}{4}$.',
    steps: [
      {
        id: 's1',
        originalIndex: 1,
        roleDescription: 'Xác định dấu của cos alpha theo góc phần tư thứ IV',
        content: 'Vì $\\frac{3\\pi}{2} < \\alpha < 2\\pi$ (góc phần tư thứ IV) nên $\\cos\\alpha > 0$.',
      },
      {
        id: 's2',
        originalIndex: 2,
        roleDescription: 'Tính cos^2 alpha từ hệ thức cơ bản',
        content: 'Áp dụng hệ thức $\\cos^2\\alpha = 1 - \\sin^2\\alpha = 1 - \\left(-\\frac{4}{5}\\right)^2 = 1 - \\frac{16}{25} = \\frac{9}{25}$.',
      },
      {
        id: 's3',
        originalIndex: 3,
        roleDescription: 'Suy ra giá trị dương của cos alpha',
        content: 'Kết hợp điều kiện $\\cos\\alpha > 0$, ta suy ra $\\cos\\alpha = \\frac{3}{5}$.',
      },
      {
        id: 's4',
        originalIndex: 4,
        roleDescription: 'Tính cot alpha và kết luận',
        content: 'Từ đó $\\cot\\alpha = \\frac{\\cos\\alpha}{\\sin\\alpha} = \\frac{3/5}{-4/5} = -\\frac{3}{4}$.',
      },
    ],
    pedagogicalTip: 'Ở góc phần tư thứ IV, hoành độ dương nên $\\cos\\alpha > 0$.',
    teacherAnalysis: 'Rèn luyện kỹ năng tính các giá trị lượng giác còn lại khi biết một giá trị.',
  },
  {
    topic: 'Bài 1. Giá trị lượng giác của góc lượng giác',
    problemStatement: 'Rút gọn biểu thức $A = \\cos(\\pi - \\alpha) + \\sin\\left(\\frac{\\pi}{2} + \\alpha\\right) - \\tan(\\pi + \\alpha)\\cot\\alpha$ (với $\\sin\\alpha\\cos\\alpha \\neq 0$). Hãy sắp xếp các bước giải theo đúng thứ tự logic.',
    conclusionTarget: 'Rút gọn được $A = -1$.',
    steps: [
      {
        id: 's1',
        originalIndex: 1,
        roleDescription: 'Biến đổi cos(pi - alpha) theo góc bù nhau',
        content: 'Theo tính chất hai góc bù nhau, ta có $\\cos(\\pi - \\alpha) = -\\cos\\alpha$.',
      },
      {
        id: 's2',
        originalIndex: 2,
        roleDescription: 'Biến đổi sin(pi/2 + alpha) và tan(pi + alpha)',
        content: 'Mặt khác, $\\sin\\left(\\frac{\\pi}{2} + \\alpha\\right) = \\cos\\alpha$ và $\\tan(\\pi + \\alpha) = \\tan\\alpha$.',
      },
      {
        id: 's3',
        originalIndex: 3,
        roleDescription: 'Thay các kết quả vào biểu thức A',
        content: 'Thay vào biểu thức $A$, ta được $A = -\\cos\\alpha + \\cos\\alpha - \\tan\\alpha \\cdot \\cot\\alpha$.',
      },
      {
        id: 's4',
        originalIndex: 4,
        roleDescription: 'Áp dụng tan alpha . cot alpha = 1 và kết luận',
        content: 'Vì $\\tan\\alpha \\cdot \\cot\\alpha = 1$ nên $A = 0 - 1 = -1$.',
      },
    ],
    pedagogicalTip: 'Áp dụng quy tắc góc liên quan đặc biệt cho từng số hạng trước khi thu gọn.',
    teacherAnalysis: 'Củng cố công thức góc bù, hơn kém $\\pi$ và hơn kém $\\frac{\\pi}{2}$.',
  },
  {
    topic: 'Bài 1. Giá trị lượng giác của góc lượng giác',
    problemStatement: 'Cho biết $\\tan\\alpha = -3$ và $\\frac{\\pi}{2} < \\alpha < \\pi$. Hãy sắp xếp các bước tính $\\cos\\alpha$ và $\\sin\\alpha$ theo đúng thứ tự logic.',
    conclusionTarget: 'Tìm được $\\cos\\alpha = -\\frac{\\sqrt{10}}{10}$ và $\\sin\\alpha = \\frac{3\\sqrt{10}}{10}$.',
    steps: [
      {
        id: 's1',
        originalIndex: 1,
        roleDescription: 'Áp dụng hệ thức liên hệ giữa cos^2 alpha và tan^2 alpha',
        content: 'Ta có $\\frac{1}{\\cos^2\\alpha} = 1 + \\tan^2\\alpha = 1 + (-3)^2 = 10 \\Rightarrow \\cos^2\\alpha = \\frac{1}{10}$.',
      },
      {
        id: 's2',
        originalIndex: 2,
        roleDescription: 'Xác định dấu và giá trị của cos alpha',
        content: 'Vì $\\frac{\\pi}{2} < \\alpha < \\pi$ nên $\\cos\\alpha < 0$, suy ra $\\cos\\alpha = -\\frac{1}{\\sqrt{10}} = -\\frac{\\sqrt{10}}{10}$.',
      },
      {
        id: 's3',
        originalIndex: 3,
        roleDescription: 'Biểu diễn sin alpha theo tan alpha và cos alpha',
        content: 'Mặt khác, từ $\\tan\\alpha = \\frac{\\sin\\alpha}{\\cos\\alpha}$ ta có $\\sin\\alpha = \\tan\\alpha \\cdot \\cos\\alpha$.',
      },
      {
        id: 's4',
        originalIndex: 4,
        roleDescription: 'Tính sin alpha và kết luận',
        content: 'Thay số ta được $\\sin\\alpha = (-3) \\cdot \\left(-\\frac{\\sqrt{10}}{10}\\right) = \\frac{3\\sqrt{10}}{10}$.',
      },
    ],
    pedagogicalTip: 'Dùng $\\sin\\alpha = \\tan\\alpha \\cdot \\cos\\alpha$ giúp xác định ngay dấu của $\\sin\\alpha$ mà không sợ nhầm.',
    teacherAnalysis: 'Bài toán tính $\\sin\\alpha, \\cos\\alpha$ khi biết $\\tan\\alpha$.',
  },
  {
    topic: 'Bài 1. Giá trị lượng giác của góc lượng giác',
    problemStatement: 'Chứng minh đẳng thức $\\frac{1 - \\sin^4\\alpha - \\cos^4\\alpha}{\\sin^2\\alpha} = 2\\cos^2\\alpha$ (với $\\sin\\alpha \\neq 0$). Hãy sắp xếp các bước biến đổi theo đúng thứ tự logic.',
    conclusionTarget: 'Chứng minh vế trái bằng $2\\cos^2\\alpha$.',
    steps: [
      {
        id: 's1',
        originalIndex: 1,
        roleDescription: 'Biến đổi tổng bậc bốn theo bình phương của tổng bậc hai',
        content: 'Ta có $\\sin^4\\alpha + \\cos^4\\alpha = (\\sin^2\\alpha + \\cos^2\\alpha)^2 - 2\\sin^2\\alpha\\cos^2\\alpha = 1 - 2\\sin^2\\alpha\\cos^2\\alpha$.',
      },
      {
        id: 's2',
        originalIndex: 2,
        roleDescription: 'Thay vào tử thức của vế trái',
        content: 'Suy ra tử thức $1 - \\sin^4\\alpha - \\cos^4\\alpha = 1 - (1 - 2\\sin^2\\alpha\\cos^2\\alpha) = 2\\sin^2\\alpha\\cos^2\\alpha$.',
      },
      {
        id: 's3',
        originalIndex: 3,
        roleDescription: 'Chia tử thức cho mẫu thức sin^2 alpha',
        content: 'Thay vào vế trái: $\\text{VT} = \\frac{2\\sin^2\\alpha\\cos^2\\alpha}{\\sin^2\\alpha}$ (với $\\sin\\alpha \\neq 0$).',
      },
      {
        id: 's4',
        originalIndex: 4,
        roleDescription: 'Rút gọn và kết luận',
        content: 'Rút gọn $\\sin^2\\alpha$ ở tử và mẫu, ta được $\\text{VT} = 2\\cos^2\\alpha = \\text{VP}$ (điều phải chứng minh).',
      },
    ],
    pedagogicalTip: 'Ghi nhớ đẳng thức quen thuộc $\\sin^4\\alpha + \\cos^4\\alpha = 1 - 2\\sin^2\\alpha\\cos^2\\alpha$.',
    teacherAnalysis: 'Biến đổi đại số kết hợp hằng đẳng thức $\\sin^2\\alpha + \\cos^2\\alpha = 1$.',
  },
];

const bai1De2P1: Omit<MultipleChoiceQuestion, 'id' | 'part' | 'number' | 'points'>[] = [
  {
    topic: 'Bài 1. Giá trị lượng giác của góc lượng giác',
    prompt: 'Đổi số đo của góc lượng giác $-315^\\circ$ sang đơn vị rađian.',
    options: [
      { key: 'A', content: '$-\\frac{7\\pi}{4}$' },
      { key: 'B', content: '$-\\frac{5\\pi}{4}$' },
      { key: 'C', content: '$-\\frac{7\\pi}{6}$' },
      { key: 'D', content: '$-\\frac{11\\pi}{6}$' },
    ],
    correctAnswer: 'A',
    explanation: 'Ta có $-315^\\circ = -\\frac{315\\pi}{180} = -\\frac{7\\pi}{4}$ rad.',
    pedagogicalTip: 'Rút gọn phân số $\\frac{315}{180}$ bằng cách chia cả tử và mẫu cho $45$.',
  },
  {
    topic: 'Bài 1. Giá trị lượng giác của góc lượng giác',
    prompt: 'Góc lượng giác có số đo $\\frac{11\\pi}{6}$ rad đổi sang đơn vị độ bằng:',
    options: [
      { key: 'A', content: '$300^\\circ$' },
      { key: 'B', content: '$330^\\circ$' },
      { key: 'C', content: '$315^\\circ$' },
      { key: 'D', content: '$240^\\circ$' },
    ],
    correctAnswer: 'B',
    explanation: 'Ta có $\\frac{11\\pi}{6} \\text{ rad} = \\frac{11}{6} \\cdot 180^\\circ = 330^\\circ$.',
    pedagogicalTip: 'Lấy $180^\\circ : 6 = 30^\\circ$ rồi nhân với $11$.',
  },
  {
    topic: 'Bài 1. Giá trị lượng giác của góc lượng giác',
    prompt: 'Trên đường tròn có bán kính $R = 15\\text{ cm}$, độ dài của cung tròn có số đo $72^\\circ$ bằng:',
    options: [
      { key: 'A', content: '$6\\pi\\text{ cm}$' },
      { key: 'B', content: '$5\\pi\\text{ cm}$' },
      { key: 'C', content: '$3\\pi\\text{ cm}$' },
      { key: 'D', content: '$9\\pi\\text{ cm}$' },
    ],
    correctAnswer: 'A',
    explanation: 'Đổi $72^\\circ = \\frac{2\\pi}{5}$ rad. Khi đó độ dài cung tròn là $l = R\\alpha = 15 \\cdot \\frac{2\\pi}{5} = 6\\pi\\text{ (cm)}$.',
    pedagogicalTip: 'Đổi số đo độ sang rađian trước khi áp dụng $l = R\\alpha$.',
  },
  {
    topic: 'Bài 1. Giá trị lượng giác của góc lượng giác',
    prompt: 'Trên đường tròn lượng giác gốc $A$, điểm cuối $M$ của góc lượng giác có số đo $-\\frac{\\pi}{3}$ thuộc góc phần tư thứ mấy?',
    options: [
      { key: 'A', content: 'Góc phần tư thứ IV' },
      { key: 'B', content: 'Góc phần tư thứ III' },
      { key: 'C', content: 'Góc phần tư thứ II' },
      { key: 'D', content: 'Góc phần tư thứ I' },
    ],
    correctAnswer: 'A',
    explanation: 'Vì $-\\frac{\\pi}{2} < -\\frac{\\pi}{3} < 0$ nên điểm $M$ nằm ở góc phần tư thứ IV.',
    pedagogicalTip: 'Quay từ $A(1;0)$ theo chiều âm một góc $\\frac{\\pi}{3}$ sẽ rơi vào góc phần tư thứ IV.',
  },
  {
    topic: 'Bài 1. Giá trị lượng giác của góc lượng giác',
    prompt: 'Biết $\\sin\\alpha < 0$ và $\\cos\\alpha > 0$. Điểm biểu diễn của góc lượng giác $\\alpha$ nằm ở góc phần tư thứ mấy?',
    options: [
      { key: 'A', content: 'Thứ IV' },
      { key: 'B', content: 'Thứ II' },
      { key: 'C', content: 'Thứ III' },
      { key: 'D', content: 'Thứ I' },
    ],
    correctAnswer: 'A',
    explanation: 'Hoành độ $\\cos\\alpha > 0$ và tung độ $\\sin\\alpha < 0$ ứng với góc phần tư thứ IV.',
    pedagogicalTip: 'Góc phần tư thứ IV có $x > 0, y < 0$.',
  },
  {
    topic: 'Bài 1. Giá trị lượng giác của góc lượng giác',
    prompt: 'Với mọi góc lượng giác $\\alpha$ mà các biểu thức có nghĩa, khẳng định nào sau đây về hai góc đối nhau là **đúng**?',
    options: [
      { key: 'A', content: '$\\cos(-\\alpha) = \\cos\\alpha$' },
      { key: 'B', content: '$\\sin(-\\alpha) = \\sin\\alpha$' },
      { key: 'C', content: '$\\tan(-\\alpha) = \\tan\\alpha$' },
      { key: 'D', content: '$\\cot(-\\alpha) = \\cot\\alpha$' },
    ],
    correctAnswer: 'A',
    explanation: 'Theo quy tắc "cos đối": $\\cos(-\\alpha) = \\cos\\alpha$, còn $\\sin, \\tan, \\cot$ đều đổi dấu.',
    pedagogicalTip: 'Hàm số $\\cos$ giữ nguyên dấu khi đổi dấu góc $\\alpha$.',
  },
  {
    topic: 'Bài 1. Giá trị lượng giác của góc lượng giác',
    prompt: 'Giá trị chính xác của $\\cos\\frac{7\\pi}{6}$ là:',
    options: [
      { key: 'A', content: '$-\\frac{\\sqrt{3}}{2}$' },
      { key: 'B', content: '$\\frac{\\sqrt{3}}{2}$' },
      { key: 'C', content: '$-\\frac{1}{2}$' },
      { key: 'D', content: '$\\frac{1}{2}$' },
    ],
    correctAnswer: 'A',
    explanation: 'Ta có $\\cos\\frac{7\\pi}{6} = \\cos\\left(\\pi + \\frac{\\pi}{6}\\right) = -\\cos\\frac{\\pi}{6} = -\\frac{\\sqrt{3}}{2}$.',
    pedagogicalTip: 'Tách $\\frac{7\\pi}{6} = \\pi + \\frac{\\pi}{6}$.',
  },
  {
    topic: 'Bài 1. Giá trị lượng giác của góc lượng giác',
    prompt: 'Cho $\\sin\\alpha = \\frac{2}{3}$. Giá trị của biểu thức $B = 9\\cos^2\\alpha + 5$ bằng:',
    options: [
      { key: 'A', content: '$10$' },
      { key: 'B', content: '$9$' },
      { key: 'C', content: '$11$' },
      { key: 'D', content: '$8$' },
    ],
    correctAnswer: 'A',
    explanation: 'Ta có $\\cos^2\\alpha = 1 - \\sin^2\\alpha = 1 - \\frac{4}{9} = \\frac{5}{9}$. Suy ra $B = 9 \\cdot \\frac{5}{9} + 5 = 10$.',
    pedagogicalTip: 'Thay $\\cos^2\\alpha = 1 - \\sin^2\\alpha$.',
  },
  {
    topic: 'Bài 1. Giá trị lượng giác của góc lượng giác',
    prompt: 'Cho $\\cot\\alpha = -2$. Khi đó giá trị của $\\sin^2\\alpha$ bằng:',
    options: [
      { key: 'A', content: '$\\frac{1}{5}$' },
      { key: 'B', content: '$\\frac{4}{5}$' },
      { key: 'C', content: '$\\frac{1}{3}$' },
      { key: 'D', content: '$\\frac{2}{5}$' },
    ],
    correctAnswer: 'A',
    explanation: 'Áp dụng hệ thức $\\frac{1}{\\sin^2\\alpha} = 1 + \\cot^2\\alpha = 1 + (-2)^2 = 5 \\Rightarrow \\sin^2\\alpha = \\frac{1}{5}$.',
    pedagogicalTip: 'Công thức $1 + \\cot^2\\alpha = \\frac{1}{\\sin^2\\alpha}$.',
  },
  {
    topic: 'Bài 1. Giá trị lượng giác của góc lượng giác',
    prompt: 'Rút gọn biểu thức $P = \\sin(\\pi - \\alpha) - \\cos\\left(\\frac{\\pi}{2} - \\alpha\\right)$ ta được:',
    options: [
      { key: 'A', content: '$0$' },
      { key: 'B', content: '$2\\sin\\alpha$' },
      { key: 'C', content: '$-2\\sin\\alpha$' },
      { key: 'D', content: '$2\\cos\\alpha$' },
    ],
    correctAnswer: 'A',
    explanation: 'Vì $\\sin(\\pi - \\alpha) = \\sin\\alpha$ và $\\cos\\left(\\frac{\\pi}{2} - \\alpha\\right) = \\sin\\alpha$ nên $P = \\sin\\alpha - \\sin\\alpha = 0$.',
    pedagogicalTip: 'Kết hợp hai quy tắc "sin bù" và "phụ chéo".',
  },
  {
    topic: 'Bài 1. Giá trị lượng giác của góc lượng giác',
    prompt: 'Cho $\\sin\\alpha + \\cos\\alpha = \\frac{5}{4}$. Giá trị của tích $\\sin\\alpha\\cos\\alpha$ bằng:',
    options: [
      { key: 'A', content: '$\\frac{9}{32}$' },
      { key: 'B', content: '$\\frac{9}{16}$' },
      { key: 'C', content: '$\\frac{7}{32}$' },
      { key: 'D', content: '$\\frac{1}{4}$' },
    ],
    correctAnswer: 'A',
    explanation: 'Bình phương hai vế: $1 + 2\\sin\\alpha\\cos\\alpha = \\frac{25}{16} \\Rightarrow 2\\sin\\alpha\\cos\\alpha = \\frac{9}{16} \\Rightarrow \\sin\\alpha\\cos\\alpha = \\frac{9}{32}$.',
    pedagogicalTip: 'Sử dụng $(\\sin\\alpha + \\cos\\alpha)^2 = 1 + 2\\sin\\alpha\\cos\\alpha$.',
  },
  {
    topic: 'Bài 1. Giá trị lượng giác của góc lượng giác',
    prompt: 'Số điểm biểu diễn trên đường tròn lượng giác của các góc lượng giác có số đo $\\alpha = \\frac{\\pi}{3} + k\\frac{2\\pi}{3}$ ($k \\in \\mathbb{Z}$) là:',
    options: [
      { key: 'A', content: '$3$' },
      { key: 'B', content: '$2$' },
      { key: 'C', content: '$4$' },
      { key: 'D', content: '$6$' },
    ],
    correctAnswer: 'A',
    explanation: 'Vì bước nhảy là $\\frac{2\\pi}{3} = \\frac{2\\pi}{3}$ nên có đúng $3$ điểm biểu diễn tạo thành tam giác đều trên đường tròn lượng giác.',
    pedagogicalTip: 'Họ góc $\\alpha_0 + \\frac{k2\\pi}{n}$ có $n$ điểm biểu diễn trên đường tròn lượng giác.',
  },
];

const bai1De2P2: Omit<TrueFalseQuestion, 'id' | 'part' | 'number'>[] = [
  {
    topic: 'Bài 1. Giá trị lượng giác của góc lượng giác',
    prompt: 'Cho góc lượng giác $\\alpha$ thỏa mãn $\\sin\\alpha = -\\frac{8}{17}$ và $\\pi < \\alpha < \\frac{3\\pi}{2}$. Xét tính đúng sai của các mệnh đề sau:',
    statements: [
      {
        id: 'a',
        label: 'a',
        statement: 'Góc $\\alpha$ thuộc góc phần tư thứ III nên $\\cos\\alpha < 0$.',
        isCorrect: true,
        explanation: 'Với $\\pi < \\alpha < \\frac{3\\pi}{2}$, điểm biểu diễn nằm ở góc phần tư thứ III nên hoành độ $\\cos\\alpha < 0$.',
      },
      {
        id: 'b',
        label: 'b',
        statement: 'Giá trị của $\\cos\\alpha$ bằng $-\\frac{15}{17}$.',
        isCorrect: true,
        explanation: 'Ta có $\\cos\\alpha = -\\sqrt{1 - \\frac{64}{289}} = -\\sqrt{\\frac{225}{289}} = -\\frac{15}{17}$.',
      },
      {
        id: 'c',
        label: 'c',
        statement: 'Giá trị của $\\tan\\alpha$ bằng $-\\frac{8}{15}$.',
        isCorrect: false,
        explanation: 'Ta có $\\tan\\alpha = \\frac{\\sin\\alpha}{\\cos\\alpha} = \\frac{-8/17}{-15/17} = \\frac{8}{15} > 0$.',
      },
      {
        id: 'd',
        label: 'd',
        statement: 'Biểu thức $\\sin(\\pi + \\alpha) + \\cos(-\\alpha)$ có giá trị bằng $-\\frac{7}{17}$.',
        isCorrect: true,
        explanation: 'Ta có $\\sin(\\pi + \\alpha) + \\cos(-\\alpha) = -\\sin\\alpha + \\cos\\alpha = \\frac{8}{17} - \\frac{15}{17} = -\\frac{7}{17}$.',
      },
    ],
    pedagogicalTip: 'Bộ ba Pythagore $(8, 15, 17)$ giúp nhẩm nhanh căn bậc hai.',
  },
  {
    topic: 'Bài 1. Giá trị lượng giác của góc lượng giác',
    prompt: 'Cho biểu thức $f(\\alpha) = \\frac{\\sin(-\\alpha) + \\cos(\\pi - \\alpha)}{\\tan(\\pi + \\alpha)}$ (với $\\sin\\alpha\\cos\\alpha \\neq 0$). Xét tính đúng sai của các mệnh đề sau:',
    statements: [
      {
        id: 'a',
        label: 'a',
        statement: 'Với mọi $\\alpha$, ta có $\\sin(-\\alpha) = -\\sin\\alpha$ và $\\cos(\\pi - \\alpha) = -\\cos\\alpha$.',
        isCorrect: true,
        explanation: 'Áp dụng công thức hai góc đối nhau và hai góc bù nhau.',
      },
      {
        id: 'b',
        label: 'b',
        statement: 'Mẫu thức $\\tan(\\pi + \\alpha)$ bằng $-\\tan\\alpha$.',
        isCorrect: false,
        explanation: 'Theo tính chất hai góc hơn kém $\\pi$: $\\tan(\\pi + \\alpha) = \\tan\\alpha$.',
      },
      {
        id: 'c',
        label: 'c',
        statement: 'Khi $\\alpha = \\frac{\\pi}{4}$ thì $\\tan\\alpha = 1$.',
        isCorrect: true,
        explanation: 'Giá trị lượng giác đặc biệt: $\\tan\\frac{\\pi}{4} = 1$.',
      },
      {
        id: 'd',
        label: 'd',
        statement: 'Tại $\\alpha = \\frac{\\pi}{4}$, giá trị của $f\\left(\\frac{\\pi}{4}\\right)$ bằng $-\\sqrt{2}$.',
        isCorrect: true,
        explanation: 'Tại $\\alpha = \\frac{\\pi}{4}$: $f\\left(\\frac{\\pi}{4}\\right) = \\frac{-\\frac{\\sqrt{2}}{2} - \\frac{\\sqrt{2}}{2}}{1} = -\\sqrt{2}$.',
      },
    ],
    pedagogicalTip: 'Rút gọn từng thành phần bằng bảng giá trị lượng giác các góc đặc biệt.',
  },
];

const bai1De2P3: Omit<ShortAnswerQuestion, 'id' | 'part' | 'number' | 'points'>[] = [
  {
    topic: 'Bài 1. Giá trị lượng giác của góc lượng giác',
    prompt: 'Một vệ tinh nhân tạo bay quanh Trái Đất theo một quỹ đạo tròn có bán kính $R = 7\\,000\\text{ km}$. Khi vệ tinh quét được một góc ở tâm $\\alpha = 0,6\\text{ rad}$ thì quãng đường nó di chuyển được là bao nhiêu kilômét?',
    acceptableAnswers: ['4200', '4200.0'],
    explanation: 'Độ dài cung tròn mà vệ tinh đi được là $l = R\\alpha = 7\\,000 \\cdot 0,6 = 4\\,200\\text{ (km)}$.',
    pedagogicalTip: 'Áp dụng $l = R\\alpha$.',
  },
  {
    topic: 'Bài 1. Giá trị lượng giác của góc lượng giác',
    prompt: 'Cho $\\tan\\alpha = 3$. Tính giá trị của biểu thức $K = \\frac{5\\sin\\alpha - 3\\cos\\alpha}{2\\sin\\alpha + 6\\cos\\alpha}$.',
    acceptableAnswers: ['1', '1.0'],
    explanation: 'Chia cả tử và mẫu cho $\\cos\\alpha$: $K = \\frac{5\\tan\\alpha - 3}{2\\tan\\alpha + 6} = \\frac{5 \\cdot 3 - 3}{2 \\cdot 3 + 6} = \\frac{12}{12} = 1$.',
    pedagogicalTip: 'Chia tử và mẫu cho $\\cos\\alpha$ để xuất hiện $\\tan\\alpha = 3$.',
  },
  {
    topic: 'Bài 1. Giá trị lượng giác của góc lượng giác',
    prompt: 'Tính giá trị của biểu thức $E = \\cos^2 15^\\circ + \\cos^2 35^\\circ + \\cos^2 55^\\circ + \\cos^2 75^\\circ$.',
    acceptableAnswers: ['2', '2.0'],
    explanation: 'Vì $\\cos 75^\\circ = \\sin 15^\\circ$ và $\\cos 55^\\circ = \\sin 35^\\circ$ nên $E = (\\cos^2 15^\\circ + \\sin^2 15^\\circ) + (\\cos^2 35^\\circ + \\sin^2 35^\\circ) = 1 + 1 = 2$.',
    pedagogicalTip: 'Nhóm hai góc phụ nhau: $(15^\\circ, 75^\\circ)$ và $(35^\\circ, 55^\\circ)$.',
  },
  {
    topic: 'Bài 1. Giá trị lượng giác của góc lượng giác',
    prompt: 'Mực nước thủy triều $h\\text{ (m)}$ tại một cửa biển vào thời điểm $t$ (giờ, $0 \\le t \\le 24$) được tính theo công thức $h(t) = 4,5 + 1,8\\cos\\left(\\frac{\\pi t}{6}\\right)$. Tính mực nước $h\\text{ (m)}$ tại cửa biển lúc $12$ giờ trưa ($t = 12$).',
    acceptableAnswers: ['6.3', '6,3'],
    explanation: 'Thay $t = 12$: $h(12) = 4,5 + 1,8\\cos(2\\pi) = 4,5 + 1,8 \\cdot 1 = 6,3\\text{ (m)}$.',
    pedagogicalTip: 'Lưu ý $\\cos(2\\pi) = 1$.',
  },
];

const bai1De2P4: Omit<StepOrderingQuestion, 'id' | 'part' | 'number' | 'points'>[] = [
  ...bai1De1P4,
];

// ============================================================================
// BÀI 2. CÔNG THỨC LƯỢNG GIÁC (2 Đề ôn riêng biệt)
// ============================================================================
const bai2De1P1: Omit<MultipleChoiceQuestion, 'id' | 'part' | 'number' | 'points'>[] = [
  {
    topic: 'Bài 2. Công thức lượng giác',
    prompt: 'Với mọi góc lượng giác $a, b$, công thức cộng nào sau đây **đúng**?',
    options: [
      { key: 'A', content: '$\\sin(a + b) = \\sin a\\cos b + \\cos a\\sin b$' },
      { key: 'B', content: '$\\sin(a + b) = \\sin a\\cos b - \\cos a\\sin b$' },
      { key: 'C', content: '$\\sin(a + b) = \\cos a\\cos b + \\sin a\\sin b$' },
      { key: 'D', content: '$\\sin(a + b) = \\sin a\\sin b - \\cos a\\cos b$' },
    ],
    correctAnswer: 'A',
    explanation: 'Theo công thức cộng: $\\sin(a + b) = \\sin a\\cos b + \\cos a\\sin b$.',
    pedagogicalTip: '"Sin thì sin cos cos sin, cos thì cos cos sin sin dấu trừ".',
  },
  {
    topic: 'Bài 2. Công thức lượng giác',
    prompt: 'Biểu thức $M = \\cos 42^\\circ\\cos 18^\\circ - \\sin 42^\\circ\\sin 18^\\circ$ có giá trị bằng:',
    options: [
      { key: 'A', content: '$\\frac{1}{2}$' },
      { key: 'B', content: '$\\frac{\\sqrt{3}}{2}$' },
      { key: 'C', content: '$\\frac{\\sqrt{2}}{2}$' },
      { key: 'D', content: '$-\\frac{1}{2}$' },
    ],
    correctAnswer: 'A',
    explanation: 'Áp dụng công thức cộng: $M = \\cos(42^\\circ + 18^\\circ) = \\cos 60^\\circ = \\frac{1}{2}$.',
    pedagogicalTip: 'Nhận dạng $\\cos a\\cos b - \\sin a\\sin b = \\cos(a + b)$.',
  },
  {
    topic: 'Bài 2. Công thức lượng giác',
    prompt: 'Rút gọn biểu thức $P = \\sin 5x\\cos 2x - \\cos 5x\\sin 2x$ ta được:',
    options: [
      { key: 'A', content: '$\\sin 3x$' },
      { key: 'B', content: '$\\sin 7x$' },
      { key: 'C', content: '$\\cos 3x$' },
      { key: 'D', content: '$\\cos 7x$' },
    ],
    correctAnswer: 'A',
    explanation: 'Ta có $P = \\sin(5x - 2x) = \\sin 3x$.',
    pedagogicalTip: 'Áp dụng công thức $\\sin(a - b) = \\sin a\\cos b - \\cos a\\sin b$.',
  },
  {
    topic: 'Bài 2. Công thức lượng giác',
    prompt: 'Giá trị chính xác của $\\sin 15^\\circ$ là:',
    options: [
      { key: 'A', content: '$\\frac{\\sqrt{6} - \\sqrt{2}}{4}$' },
      { key: 'B', content: '$\\frac{\\sqrt{6} + \\sqrt{2}}{4}$' },
      { key: 'C', content: '$\\frac{\\sqrt{3} - 1}{2}$' },
      { key: 'D', content: '$\\frac{\\sqrt{3} + 1}{4}$' },
    ],
    correctAnswer: 'A',
    explanation: 'Ta có $\\sin 15^\\circ = \\sin(45^\\circ - 30^\\circ) = \\sin 45^\\circ\\cos 30^\\circ - \\cos 45^\\circ\\sin 30^\\circ = \\frac{\\sqrt{6} - \\sqrt{2}}{4}$.',
    pedagogicalTip: 'Tách $15^\\circ = 45^\\circ - 30^\\circ$.',
  },
  {
    topic: 'Bài 2. Công thức lượng giác',
    prompt: 'Cho $\\tan a = 2$ và $\\tan b = 3$. Giá trị của $\\tan(a + b)$ bằng:',
    options: [
      { key: 'A', content: '$-1$' },
      { key: 'B', content: '$1$' },
      { key: 'C', content: '$5$' },
      { key: 'D', content: '$-\\frac{5}{7}$' },
    ],
    correctAnswer: 'A',
    explanation: 'Ta có $\\tan(a + b) = \\frac{\\tan a + \\tan b}{1 - \\tan a\\tan b} = \\frac{2 + 3}{1 - 2 \\cdot 3} = \\frac{5}{-5} = -1$.',
    pedagogicalTip: 'Công thức cộng đối với tang: $\\tan(a + b) = \\frac{\\tan a + \\tan b}{1 - \\tan a\\tan b}$.',
  },
  {
    topic: 'Bài 2. Công thức lượng giác',
    prompt: 'Với mọi góc lượng giác $\\alpha$, công thức nhân đôi nào sau đây **đúng**?',
    options: [
      { key: 'A', content: '$\\sin 2\\alpha = 2\\sin\\alpha\\cos\\alpha$' },
      { key: 'B', content: '$\\sin 2\\alpha = \\sin\\alpha\\cos\\alpha$' },
      { key: 'C', content: '$\\cos 2\\alpha = 2\\sin^2\\alpha - 1$' },
      { key: 'D', content: '$\\tan 2\\alpha = \\frac{2\\tan\\alpha}{1 + \\tan^2\\alpha}$' },
    ],
    correctAnswer: 'A',
    explanation: 'Công thức nhân đôi của hàm sin là $\\sin 2\\alpha = 2\\sin\\alpha\\cos\\alpha$.',
    pedagogicalTip: 'Lưu ý $\\cos 2\\alpha = 1 - 2\\sin^2\\alpha$ và $\\tan 2\\alpha = \\frac{2\\tan\\alpha}{1 - \\tan^2\\alpha}$.',
  },
  {
    topic: 'Bài 2. Công thức lượng giác',
    prompt: 'Công thức hạ bậc nào sau đây **đúng**?',
    options: [
      { key: 'A', content: '$\\cos^2\\alpha = \\frac{1 + \\cos 2\\alpha}{2}$' },
      { key: 'B', content: '$\\cos^2\\alpha = \\frac{1 - \\cos 2\\alpha}{2}$' },
      { key: 'C', content: '$\\sin^2\\alpha = \\frac{1 + \\cos 2\\alpha}{2}$' },
      { key: 'D', content: '$\\sin^2\\alpha = 1 - \\cos 2\\alpha$' },
    ],
    correctAnswer: 'A',
    explanation: 'Từ $\\cos 2\\alpha = 2\\cos^2\\alpha - 1 \\Rightarrow \\cos^2\\alpha = \\frac{1 + \\cos 2\\alpha}{2}$.',
    pedagogicalTip: 'Hạ bậc $\\cos^2\\alpha$ mang dấu cộng, hạ bậc $\\sin^2\\alpha$ mang dấu trừ.',
  },
  {
    topic: 'Bài 2. Công thức lượng giác',
    prompt: 'Cho $\\sin\\alpha = \\frac{1}{3}$. Giá trị của $\\cos 2\\alpha$ bằng:',
    options: [
      { key: 'A', content: '$\\frac{7}{9}$' },
      { key: 'B', content: '$-\\frac{7}{9}$' },
      { key: 'C', content: '$\\frac{8}{9}$' },
      { key: 'D', content: '$\\frac{5}{9}$' },
    ],
    correctAnswer: 'A',
    explanation: 'Ta có $\\cos 2\\alpha = 1 - 2\\sin^2\\alpha = 1 - 2 \\cdot \\left(\\frac{1}{3}\\right)^2 = 1 - \\frac{2}{9} = \\frac{7}{9}$.',
    pedagogicalTip: 'Khi biết $\\sin\\alpha$, dùng ngay $\\cos 2\\alpha = 1 - 2\\sin^2\\alpha$ không cần tìm $\\cos\\alpha$.',
  },
  {
    topic: 'Bài 2. Công thức lượng giác',
    prompt: 'Theo công thức biến đổi tổng thành tích, $\\cos u + \\cos v$ bằng:',
    options: [
      { key: 'A', content: '$2\\cos\\frac{u + v}{2}\\cos\\frac{u - v}{2}$' },
      { key: 'B', content: '$-2\\sin\\frac{u + v}{2}\\sin\\frac{u - v}{2}$' },
      { key: 'C', content: '$2\\sin\\frac{u + v}{2}\\cos\\frac{u - v}{2}$' },
      { key: 'D', content: '$2\\cos\\frac{u + v}{2}\\sin\\frac{u - v}{2}$' },
    ],
    correctAnswer: 'A',
    explanation: 'Ta có $\\cos u + \\cos v = 2\\cos\\frac{u + v}{2}\\cos\\frac{u - v}{2}$.',
    pedagogicalTip: '"Cos cộng cos bằng hai cos cos".',
  },
  {
    topic: 'Bài 2. Công thức lượng giác',
    prompt: 'Biến đổi tích $\\sin 4x\\cos 2x$ thành tổng ta được:',
    options: [
      { key: 'A', content: '$\\frac{1}{2}(\\sin 6x + \\sin 2x)$' },
      { key: 'B', content: '$\\frac{1}{2}(\\cos 6x + \\cos 2x)$' },
      { key: 'C', content: '$\\sin 6x + \\sin 2x$' },
      { key: 'D', content: '$\\frac{1}{2}(\\sin 6x - \\sin 2x)$' },
    ],
    correctAnswer: 'A',
    explanation: 'Áp dụng công thức $\\sin a\\cos b = \\frac{1}{2}[\\sin(a + b) + \\sin(a - b)] = \\frac{1}{2}(\\sin 6x + \\sin 2x)$.',
    pedagogicalTip: 'Đừng quên hệ số $\\frac{1}{2}$ ở công thức biến đổi tích thành tổng.',
  },
  {
    topic: 'Bài 2. Công thức lượng giác',
    prompt: 'Giá trị của biểu thức $Q = 4\\sin 15^\\circ\\cos 15^\\circ$ bằng:',
    options: [
      { key: 'A', content: '$1$' },
      { key: 'B', content: '$2$' },
      { key: 'C', content: '$\\sqrt{3}$' },
      { key: 'D', content: '$\\frac{1}{2}$' },
    ],
    correctAnswer: 'A',
    explanation: 'Ta có $Q = 2 \\cdot (2\\sin 15^\\circ\\cos 15^\\circ) = 2\\sin 30^\\circ = 2 \\cdot \\frac{1}{2} = 1$.',
    pedagogicalTip: 'Nhóm $2\\sin 15^\\circ\\cos 15^\\circ = \\sin 30^\\circ$.',
  },
  {
    topic: 'Bài 2. Công thức lượng giác',
    prompt: 'Rút gọn biểu thức $R = \\frac{\\sin 5\\alpha + \\sin \\alpha}{\\cos 5\\alpha + \\cos \\alpha}$ (khi mẫu thức khác $0$) ta được:',
    options: [
      { key: 'A', content: '$\\tan 3\\alpha$' },
      { key: 'B', content: '$\\cot 3\\alpha$' },
      { key: 'C', content: '$\\tan 2\\alpha$' },
      { key: 'D', content: '$\\tan 6\\alpha$' },
    ],
    correctAnswer: 'A',
    explanation: 'Biến đổi tổng thành tích: $R = \\frac{2\\sin 3\\alpha\\cos 2\\alpha}{2\\cos 3\\alpha\\cos 2\\alpha} = \\tan 3\\alpha$.',
    pedagogicalTip: 'Biến đổi cả tử và mẫu thành tích rồi giản ước $2\\cos 2\\alpha$.',
  },
];

const bai2De1P2: Omit<TrueFalseQuestion, 'id' | 'part' | 'number'>[] = [
  {
    topic: 'Bài 2. Công thức lượng giác',
    prompt: 'Cho góc lượng giác $\\alpha$ thỏa mãn $\\sin\\alpha = \\frac{4}{5}$ và $0 < \\alpha < \\frac{\\pi}{2}$. Xét tính đúng sai của các mệnh đề sau:',
    statements: [
      {
        id: 'a',
        label: 'a',
        statement: 'Ta có $\\cos\\alpha = \\frac{3}{5}$.',
        isCorrect: true,
        explanation: 'Vì $0 < \\alpha < \\frac{\\pi}{2}$ nên $\\cos\\alpha = \\sqrt{1 - \\frac{16}{25}} = \\frac{3}{5}$.',
      },
      {
        id: 'b',
        label: 'b',
        statement: 'Giá trị của $\\sin 2\\alpha$ bằng $\\frac{24}{25}$.',
        isCorrect: true,
        explanation: 'Ta có $\\sin 2\\alpha = 2\\sin\\alpha\\cos\\alpha = 2 \\cdot \\frac{4}{5} \\cdot \\frac{3}{5} = \\frac{24}{25}$.',
      },
      {
        id: 'c',
        label: 'c',
        statement: 'Giá trị của $\\cos 2\\alpha$ bằng $\\frac{7}{25}$.',
        isCorrect: false,
        explanation: 'Ta có $\\cos 2\\alpha = \\cos^2\\alpha - \\sin^2\\alpha = \\frac{9}{25} - \\frac{16}{25} = -\\frac{7}{25} \\neq \\frac{7}{25}$.',
      },
      {
        id: 'd',
        label: 'd',
        statement: 'Giá trị của $\\cos\\left(\\alpha + \\frac{\\pi}{3}\\right)$ bằng $\\frac{3 - 4\\sqrt{3}}{10}$.',
        isCorrect: true,
        explanation: 'Ta có $\\cos\\left(\\alpha + \\frac{\\pi}{3}\\right) = \\cos\\alpha\\cos\\frac{\\pi}{3} - \\sin\\alpha\\sin\\frac{\\pi}{3} = \\frac{3}{5} \\cdot \\frac{1}{2} - \\frac{4}{5} \\cdot \\frac{\\sqrt{3}}{2} = \\frac{3 - 4\\sqrt{3}}{10}$.',
      },
    ],
    pedagogicalTip: 'Kiểm tra kỹ dấu của $\\cos 2\\alpha = \\cos^2\\alpha - \\sin^2\\alpha$.',
  },
  {
    topic: 'Bài 2. Công thức lượng giác',
    prompt: 'Xét các biểu thức biến đổi lượng giác với mọi góc $x$. Xét tính đúng sai của các mệnh đề sau:',
    statements: [
      {
        id: 'a',
        label: 'a',
        statement: 'Biểu thức $\\cos 7x - \\cos 3x$ được biến đổi thành tích là $-2\\sin 5x\\sin 2x$.',
        isCorrect: true,
        explanation: 'Áp dụng $\\cos u - \\cos v = -2\\sin\\frac{u+v}{2}\\sin\\frac{u-v}{2} = -2\\sin 5x\\sin 2x$.',
      },
      {
        id: 'b',
        label: 'b',
        statement: 'Biểu thức $\\sin x + \\sqrt{3}\\cos x$ viết được dưới dạng $2\\sin\\left(x + \\frac{\\pi}{3}\\right)$.',
        isCorrect: true,
        explanation: 'Ta có $2\\sin\\left(x + \\frac{\\pi}{3}\\right) = 2\\left(\\sin x \\cdot \\frac{1}{2} + \\cos x \\cdot \\frac{\\sqrt{3}}{2}\\right) = \\sin x + \\sqrt{3}\\cos x$.',
      },
      {
        id: 'c',
        label: 'c',
        statement: 'Với mọi $x$, ta luôn có $\\cos^4 x - \\sin^4 x = \\cos 4x$.',
        isCorrect: false,
        explanation: 'Ta có $\\cos^4 x - \\sin^4 x = (\\cos^2 x - \\sin^2 x)(\\cos^2 x + \\sin^2 x) = \\cos 2x \\cdot 1 = \\cos 2x \\neq \\cos 4x$.',
      },
      {
        id: 'd',
        label: 'd',
        statement: 'Giá trị của tích $8\\sin 10^\\circ\\sin 50^\\circ\\sin 70^\\circ$ bằng $1$.',
        isCorrect: true,
        explanation: 'Nhân với $\\cos 10^\\circ$: $8\\cos 10^\\circ\\sin 10^\\circ\\cos 40^\\circ\\cos 20^\\circ = 4\\sin 20^\\circ\\cos 20^\\circ\\cos 40^\\circ = 2\\sin 40^\\circ\\cos 40^\\circ = \\sin 80^\\circ = \\cos 10^\\circ$. Rút gọn $\\cos 10^\\circ$ được kết quả bằng $1$.',
      },
    ],
    pedagogicalTip: 'Sử dụng linh hoạt công thức nhân đôi liên tiếp.',
  },
];

const bai2De1P3: Omit<ShortAnswerQuestion, 'id' | 'part' | 'number' | 'points'>[] = [
  {
    topic: 'Bài 2. Công thức lượng giác',
    prompt: 'Không dùng máy tính, tính giá trị của biểu thức $A = \\frac{\\tan 22^\\circ + \\tan 23^\\circ}{1 - \\tan 22^\\circ\\tan 23^\\circ}$.',
    acceptableAnswers: ['1', '1.0'],
    explanation: 'Áp dụng công thức cộng: $A = \\tan(22^\\circ + 23^\\circ) = \\tan 45^\\circ = 1$.',
    pedagogicalTip: 'Nhận dạng công thức $\\tan(a + b)$.',
  },
  {
    topic: 'Bài 2. Công thức lượng giác',
    prompt: 'Cho $\\cos 2\\alpha = \\frac{1}{4}$. Tính giá trị của biểu thức $P = 8\\sin^2\\alpha + 5$.',
    acceptableAnswers: ['8', '8.0'],
    explanation: 'Áp dụng công thức hạ bậc: $2\\sin^2\\alpha = 1 - \\cos 2\\alpha = 1 - \\frac{1}{4} = \\frac{3}{4} \\Rightarrow 8\\sin^2\\alpha = 3$. Vậy $P = 3 + 5 = 8$.',
    pedagogicalTip: 'Thay $8\\sin^2\\alpha = 4(1 - \\cos 2\\alpha)$.',
  },
  {
    topic: 'Bài 2. Công thức lượng giác',
    prompt: 'Tính giá trị của biểu thức $B = \\cos\\frac{\\pi}{7} - \\cos\\frac{2\\pi}{7} + \\cos\\frac{3\\pi}{7}$.',
    acceptableAnswers: ['0.5', '0,5'],
    explanation: 'Nhân $B$ với $2\\sin\\frac{\\pi}{7}$: $2\\sin\\frac{\\pi}{7}B = \\sin\\frac{2\\pi}{7} - (\\sin\\frac{3\\pi}{7} - \\sin\\frac{\\pi}{7}) + (\\sin\\frac{4\\pi}{7} - \\sin\\frac{2\\pi}{7}) = \\sin\\frac{\\pi}{7} - \\sin\\frac{3\\pi}{7} + \\sin\\frac{4\\pi}{7}$. Vì $\\sin\\frac{4\\pi}{7} = \\sin\\left(\\pi - \\frac{3\\pi}{7}\\right) = \\sin\\frac{3\\pi}{7}$ nên $2\\sin\\frac{\\pi}{7}B = \\sin\\frac{\\pi}{7} \\Rightarrow B = \\frac{1}{2} = 0,5$.',
    pedagogicalTip: 'Nhân biểu thức tổng côsin các góc lập thành CSC với $2\\sin\\frac{d}{2}$.',
  },
  {
    topic: 'Bài 2. Công thức lượng giác',
    prompt: 'Cho hai góc nhọn $a, b$ thỏa mãn $\\tan a = \\frac{1}{4}$ và $\\tan b = \\frac{3}{5}$. Tính số đo (theo đơn vị độ) của góc $a + b$.',
    acceptableAnswers: ['45', '45.0'],
    explanation: 'Ta có $\\tan(a + b) = \\frac{\\frac{1}{4} + \\frac{3}{5}}{1 - \\frac{1}{4} \\cdot \\frac{3}{5}} = \\frac{\\frac{17}{20}}{\\frac{17}{20}} = 1$. Vì $0^\\circ < a, b < 90^\\circ \\Rightarrow 0^\\circ < a + b < 180^\\circ$ nên $a + b = 45^\\circ$.',
    pedagogicalTip: 'Tính $\\tan(a + b) = 1$ rồi suy ra $a + b = 45^\\circ$.',
  },
];

const bai2De1P4: Omit<StepOrderingQuestion, 'id' | 'part' | 'number' | 'points'>[] = [
  {
    topic: 'Bài 2. Công thức lượng giác',
    problemStatement: 'Chứng minh đẳng thức $\\frac{1 + \\cos 2x + \\cos x}{\\sin 2x + \\sin x} = \\cot x$ (với điều kiện biểu thức có nghĩa). Hãy sắp xếp các bước biến đổi theo đúng thứ tự logic.',
    conclusionTarget: 'Chứng minh vế trái bằng $\\cot x$.',
    steps: [
      {
        id: 's1',
        originalIndex: 1,
        roleDescription: 'Áp dụng công thức nhân đôi ở cả tử và mẫu',
        content: 'Thay $1 + \\cos 2x = 2\\cos^2 x$ trên tử thức và $\\sin 2x = 2\\sin x\\cos x$ dưới mẫu thức.',
      },
      {
        id: 's2',
        originalIndex: 2,
        roleDescription: 'Viết lại phân thức sau khi thay',
        content: 'Khi đó vế trái trở thành $\\text{VT} = \\frac{2\\cos^2 x + \\cos x}{2\\sin x\\cos x + \\sin x}$.',
      },
      {
        id: 's3',
        originalIndex: 3,
        roleDescription: 'Đặt nhân tử chung ở tử và mẫu',
        content: 'Đặt $\\cos x$ làm nhân tử chung ở tử và $\\sin x$ ở mẫu: $\\text{VT} = \\frac{\\cos x(2\\cos x + 1)}{\\sin x(2\\cos x + 1)}$.',
      },
      {
        id: 's4',
        originalIndex: 4,
        roleDescription: 'Giản ước nhân tử chung và kết luận',
        content: 'Rút gọn $(2\\cos x + 1)$, ta được $\\text{VT} = \\frac{\\cos x}{\\sin x} = \\cot x = \\text{VP}$ (điều phải chứng minh).',
      },
    ],
    pedagogicalTip: 'Cụm $1 + \\cos 2x$ luôn đưa về $2\\cos^2 x$ để đặt nhân tử chung với $\\cos x$.',
    teacherAnalysis: 'Bài toán kinh điển rèn luyện công thức nhân đôi.',
  },
  {
    topic: 'Bài 2. Công thức lượng giác',
    problemStatement: 'Tính giá trị của biểu thức $P = \\sin 20^\\circ\\sin 40^\\circ\\sin 80^\\circ$. Hãy sắp xếp các bước giải theo đúng thứ tự logic.',
    conclusionTarget: 'Tính được $P = \\frac{\\sqrt{3}}{8}$.',
    steps: [
      {
        id: 's1',
        originalIndex: 1,
        roleDescription: 'Biến đổi tích sin 20 . sin 40 thành tổng',
        content: 'Áp dụng công thức tích thành tổng cho $\\sin 20^\\circ\\sin 40^\\circ = \\frac{1}{2}(\\cos 20^\\circ - \\cos 60^\\circ) = \\frac{1}{2}\\cos 20^\\circ - \\frac{1}{4}$.',
      },
      {
        id: 's2',
        originalIndex: 2,
        roleDescription: 'Nhân biểu thức thu được với sin 80',
        content: 'Thay vào $P$: $P = \\left(\\frac{1}{2}\\cos 20^\\circ - \\frac{1}{4}\\right)\\sin 80^\\circ = \\frac{1}{2}\\sin 80^\\circ\\cos 20^\\circ - \\frac{1}{4}\\sin 80^\\circ$.',
      },
      {
        id: 's3',
        originalIndex: 3,
        roleDescription: 'Biến đổi tích sin 80 . cos 20 thành tổng',
        content: 'Ta có $\\frac{1}{2}\\sin 80^\\circ\\cos 20^\\circ = \\frac{1}{4}(\\sin 100^\\circ + \\sin 60^\\circ) = \\frac{1}{4}\\sin 80^\\circ + \\frac{\\sqrt{3}}{8}$ (vì $\\sin 100^\\circ = \\sin 80^\\circ$).',
      },
      {
        id: 's4',
        originalIndex: 4,
        roleDescription: 'Thu gọn và kết luận',
        content: 'Suy ra $P = \\frac{1}{4}\\sin 80^\\circ + \\frac{\\sqrt{3}}{8} - \\frac{1}{4}\\sin 80^\\circ = \\frac{\\sqrt{3}}{8}$.',
      },
    ],
    pedagogicalTip: 'Chú ý hai góc bù nhau $100^\\circ$ và $80^\\circ$ có $\\sin 100^\\circ = \\sin 80^\\circ$.',
    teacherAnalysis: 'Vận dụng công thức biến đổi tích thành tổng hai lần liên tiếp.',
  },
  {
    topic: 'Bài 2. Công thức lượng giác',
    problemStatement: 'Biến đổi biểu thức $S = \\sin x + \\sin 2x + \\sin 3x + \\sin 4x$ thành tích. Hãy sắp xếp các bước giải theo đúng thứ tự logic.',
    conclusionTarget: 'Biến đổi được $S = 4\\cos\\frac{x}{2}\\cos x\\sin\\frac{5x}{2}$.',
    steps: [
      {
        id: 's1',
        originalIndex: 1,
        roleDescription: 'Nhóm các hạng tử có trung bình cộng góc bằng nhau',
        content: 'Ta nhóm $S = (\\sin 4x + \\sin x) + (\\sin 3x + \\sin 2x)$.',
      },
      {
        id: 's2',
        originalIndex: 2,
        roleDescription: 'Áp dụng công thức tổng thành tích cho từng nhóm',
        content: 'Ta có $\\sin 4x + \\sin x = 2\\sin\\frac{5x}{2}\\cos\\frac{3x}{2}$ và $\\sin 3x + \\sin 2x = 2\\sin\\frac{5x}{2}\\cos\\frac{x}{2}$.',
      },
      {
        id: 's3',
        originalIndex: 3,
        roleDescription: 'Đặt nhân tử chung 2 sin(5x/2)',
        content: 'Cộng lại và đặt nhân tử chung: $S = 2\\sin\\frac{5x}{2}\\left(\\cos\\frac{3x}{2} + \\cos\\frac{x}{2}\\right)$.',
      },
      {
        id: 's4',
        originalIndex: 4,
        roleDescription: 'Biến đổi tổng hai côsin còn lại thành tích',
        content: 'Vì $\\cos\\frac{3x}{2} + \\cos\\frac{x}{2} = 2\\cos x\\cos\\frac{x}{2}$ nên $S = 4\\cos\\frac{x}{2}\\cos x\\sin\\frac{5x}{2}$.',
      },
    ],
    pedagogicalTip: 'Nhóm $(x, 4x)$ và $(2x, 3x)$ để xuất hiện nhân tử chung $\\sin\\frac{5x}{2}$.',
    teacherAnalysis: 'Kỹ thuật nhóm hạng tử đối xứng trong biến đổi tổng thành tích.',
  },
  {
    topic: 'Bài 2. Công thức lượng giác',
    problemStatement: 'Cho $\\sin\\alpha - \\cos\\alpha = \\frac{1}{5}$. Hãy sắp xếp các bước tính $\\sin 2\\alpha$ và $\\cos 4\\alpha$ theo đúng thứ tự logic.',
    conclusionTarget: 'Tìm được $\\sin 2\\alpha = \\frac{24}{25}$ và $\\cos 4\\alpha = -\\frac{527}{625}$.',
    steps: [
      {
        id: 's1',
        originalIndex: 1,
        roleDescription: 'Bình phương hai vế của giả thiết',
        content: 'Bình phương hai vế của $\\sin\\alpha - \\cos\\alpha = \\frac{1}{5}$, ta được $\\sin^2\\alpha + \\cos^2\\alpha - 2\\sin\\alpha\\cos\\alpha = \\frac{1}{25}$.',
      },
      {
        id: 's2',
        originalIndex: 2,
        roleDescription: 'Thay công thức sin 2 alpha để tìm giá trị sin 2 alpha',
        content: 'Vì $\\sin^2\\alpha + \\cos^2\\alpha = 1$ và $2\\sin\\alpha\\cos\\alpha = \\sin 2\\alpha$, ta có $1 - \\sin 2\\alpha = \\frac{1}{25} \\Leftrightarrow \\sin 2\\alpha = \\frac{24}{25}$.',
      },
      {
        id: 's3',
        originalIndex: 3,
        roleDescription: 'Biểu diễn cos 4 alpha theo sin 2 alpha bằng công thức nhân đôi',
        content: 'Áp dụng công thức nhân đôi cho góc $4\\alpha = 2 \\cdot (2\\alpha)$: $\\cos 4\\alpha = 1 - 2\\sin^2 2\\alpha$.',
      },
      {
        id: 's4',
        originalIndex: 4,
        roleDescription: 'Thay số và kết luận',
        content: 'Thay $\\sin 2\\alpha = \\frac{24}{25}$ vào, ta được $\\cos 4\\alpha = 1 - 2 \\cdot \\left(\\frac{24}{25}\\right)^2 = 1 - \\frac{1152}{625} = -\\frac{527}{625}$.',
      },
    ],
    pedagogicalTip: 'Liên hệ $(\\sin\\alpha \\pm \\cos\\alpha)^2 = 1 \\pm \\sin 2\\alpha$.',
    teacherAnalysis: 'Bài toán kết nối tổng/hiệu $\\sin\\alpha, \\cos\\alpha$ với góc nhân đôi.',
  },
];

const bai2De2P1: Omit<MultipleChoiceQuestion, 'id' | 'part' | 'number' | 'points'>[] = [
  {
    topic: 'Bài 2. Công thức lượng giác',
    prompt: 'Biểu thức $A = \\sin 68^\\circ\\cos 22^\\circ + \\cos 68^\\circ\\sin 22^\\circ$ có giá trị bằng:',
    options: [
      { key: 'A', content: '$1$' },
      { key: 'B', content: '$0$' },
      { key: 'C', content: '$\\frac{\\sqrt{2}}{2}$' },
      { key: 'D', content: '$\\frac{1}{2}$' },
    ],
    correctAnswer: 'A',
    explanation: 'Ta có $A = \\sin(68^\\circ + 22^\\circ) = \\sin 90^\\circ = 1$.',
    pedagogicalTip: 'Áp dụng công thức $\\sin(a + b)$.',
  },
  {
    topic: 'Bài 2. Công thức lượng giác',
    prompt: 'Biểu thức $B = \\cos 70^\\circ\\cos 10^\\circ + \\sin 70^\\circ\\sin 10^\\circ$ có giá trị bằng:',
    options: [
      { key: 'A', content: '$\\frac{1}{2}$' },
      { key: 'B', content: '$\\frac{\\sqrt{3}}{2}$' },
      { key: 'C', content: '$-\\frac{1}{2}$' },
      { key: 'D', content: '$0$' },
    ],
    correctAnswer: 'A',
    explanation: 'Ta có $B = \\cos(70^\\circ - 10^\\circ) = \\cos 60^\\circ = \\frac{1}{2}$.',
    pedagogicalTip: 'Áp dụng công thức $\\cos(a - b) = \\cos a\\cos b + \\sin a\\sin b$.',
  },
  {
    topic: 'Bài 2. Công thức lượng giác',
    prompt: 'Giá trị chính xác của $\\tan 105^\\circ$ là:',
    options: [
      { key: 'A', content: '$-2 - \\sqrt{3}$' },
      { key: 'B', content: '$2 - \\sqrt{3}$' },
      { key: 'C', content: '$2 + \\sqrt{3}$' },
      { key: 'D', content: '$\\sqrt{3} - 2$' },
    ],
    correctAnswer: 'A',
    explanation: 'Ta có $\\tan 105^\\circ = \\tan(60^\\circ + 45^\\circ) = \\frac{\\sqrt{3} + 1}{1 - \\sqrt{3}} = \\frac{(\\sqrt{3} + 1)^2}{-2} = -2 - \\sqrt{3}$.',
    pedagogicalTip: 'Tách $105^\\circ = 60^\\circ + 45^\\circ$ và trục căn thức ở mẫu.',
  },
  {
    topic: 'Bài 2. Công thức lượng giác',
    prompt: 'Rút gọn biểu thức $C = \\cos^2\\frac{\\pi}{8} - \\sin^2\\frac{\\pi}{8}$ ta được:',
    options: [
      { key: 'A', content: '$\\frac{\\sqrt{2}}{2}$' },
      { key: 'B', content: '$\\frac{1}{2}$' },
      { key: 'C', content: '$\\frac{\\sqrt{3}}{2}$' },
      { key: 'D', content: '$1$' },
    ],
    correctAnswer: 'A',
    explanation: 'Áp dụng công thức nhân đôi: $C = \\cos\\left(2 \\cdot \\frac{\\pi}{8}\\right) = \\cos\\frac{\\pi}{4} = \\frac{\\sqrt{2}}{2}$.',
    pedagogicalTip: 'Nhận dạng $\\cos^2 a - \\sin^2 a = \\cos 2a$.',
  },
  {
    topic: 'Bài 2. Công thức lượng giác',
    prompt: 'Cho $\\tan\\alpha = \\frac{1}{2}$. Giá trị của $\\tan 2\\alpha$ bằng:',
    options: [
      { key: 'A', content: '$\\frac{4}{3}$' },
      { key: 'B', content: '$\\frac{3}{4}$' },
      { key: 'C', content: '$1$' },
      { key: 'D', content: '$\\frac{4}{5}$' },
    ],
    correctAnswer: 'A',
    explanation: 'Ta có $\\tan 2\\alpha = \\frac{2\\tan\\alpha}{1 - \\tan^2\\alpha} = \\frac{2 \\cdot \\frac{1}{2}}{1 - \\frac{1}{4}} = \\frac{1}{\\frac{3}{4}} = \\frac{4}{3}$.',
    pedagogicalTip: 'Công thức nhân đôi của hàm tang: $\\tan 2\\alpha = \\frac{2\\tan\\alpha}{1 - \\tan^2\\alpha}$.',
  },
  {
    topic: 'Bài 2. Công thức lượng giác',
    prompt: 'Theo công thức biến đổi tổng thành tích, $\\sin u - \\sin v$ bằng:',
    options: [
      { key: 'A', content: '$2\\cos\\frac{u + v}{2}\\sin\\frac{u - v}{2}$' },
      { key: 'B', content: '$2\\sin\\frac{u + v}{2}\\cos\\frac{u - v}{2}$' },
      { key: 'C', content: '$2\\cos\\frac{u + v}{2}\\cos\\frac{u - v}{2}$' },
      { key: 'D', content: '$-2\\sin\\frac{u + v}{2}\\sin\\frac{u - v}{2}$' },
    ],
    correctAnswer: 'A',
    explanation: 'Theo công thức SGK: $\\sin u - \\sin v = 2\\cos\\frac{u + v}{2}\\sin\\frac{u - v}{2}$.',
    pedagogicalTip: '"Sin trừ sin bằng hai cos sin".',
  },
  {
    topic: 'Bài 2. Công thức lượng giác',
    prompt: 'Biến đổi tích $\\cos 5x\\cos 3x$ thành tổng ta được:',
    options: [
      { key: 'A', content: '$\\frac{1}{2}(\\cos 8x + \\cos 2x)$' },
      { key: 'B', content: '$\\frac{1}{2}(\\cos 8x - \\cos 2x)$' },
      { key: 'C', content: '$\\cos 8x + \\cos 2x$' },
      { key: 'D', content: '$\\frac{1}{2}(\\sin 8x + \\sin 2x)$' },
    ],
    correctAnswer: 'A',
    explanation: 'Áp dụng công thức $\\cos a\\cos b = \\frac{1}{2}[\\cos(a - b) + \\cos(a + b)] = \\frac{1}{2}(\\cos 2x + \\cos 8x)$.',
    pedagogicalTip: 'Tích hai côsin biến thành nửa tổng hai côsin.',
  },
  {
    topic: 'Bài 2. Công thức lượng giác',
    prompt: 'Cho $\\cos\\alpha = -\\frac{1}{4}$. Giá trị của $\\cos 2\\alpha$ bằng:',
    options: [
      { key: 'A', content: '$-\\frac{7}{8}$' },
      { key: 'B', content: '$\\frac{7}{8}$' },
      { key: 'C', content: '$-\\frac{3}{4}$' },
      { key: 'D', content: '$-\\frac{1}{2}$' },
    ],
    correctAnswer: 'A',
    explanation: 'Ta có $\\cos 2\\alpha = 2\\cos^2\\alpha - 1 = 2 \\cdot \\frac{1}{16} - 1 = \\frac{1}{8} - 1 = -\\frac{7}{8}$.',
    pedagogicalTip: 'Sử dụng $\\cos 2\\alpha = 2\\cos^2\\alpha - 1$.',
  },
  {
    topic: 'Bài 2. Công thức lượng giác',
    prompt: 'Rút gọn biểu thức $D = \\frac{1 - \\cos 2x}{\\sin 2x}$ (với $\\sin 2x \\neq 0$) ta được:',
    options: [
      { key: 'A', content: '$\\tan x$' },
      { key: 'B', content: '$\\cot x$' },
      { key: 'C', content: '$2\\tan x$' },
      { key: 'D', content: '$\\tan 2x$' },
    ],
    correctAnswer: 'A',
    explanation: 'Ta có $D = \\frac{2\\sin^2 x}{2\\sin x\\cos x} = \\frac{\\sin x}{\\cos x} = \\tan x$.',
    pedagogicalTip: 'Dùng công thức hạ bậc $1 - \\cos 2x = 2\\sin^2 x$.',
  },
  {
    topic: 'Bài 2. Công thức lượng giác',
    prompt: 'Giá trị của biểu thức $E = \\sin 75^\\circ + \\sin 15^\\circ$ bằng:',
    options: [
      { key: 'A', content: '$\\frac{\\sqrt{6}}{2}$' },
      { key: 'B', content: '$\\frac{\\sqrt{2}}{2}$' },
      { key: 'C', content: '$\\frac{\\sqrt{3}}{2}$' },
      { key: 'D', content: '$\\sqrt{6}$' },
    ],
    correctAnswer: 'A',
    explanation: 'Biến đổi tổng thành tích: $E = 2\\sin 45^\\circ\\cos 30^\\circ = 2 \\cdot \\frac{\\sqrt{2}}{2} \\cdot \\frac{\\sqrt{3}}{2} = \\frac{\\sqrt{6}}{2}$.',
    pedagogicalTip: 'Trung bình cộng của $75^\\circ$ và $15^\\circ$ là $45^\\circ$, nửa hiệu là $30^\\circ$.',
  },
  {
    topic: 'Bài 2. Công thức lượng giác',
    prompt: 'Biểu thức $\\sqrt{3}\\sin x - \\cos x$ bằng biểu thức nào sau đây?',
    options: [
      { key: 'A', content: '$2\\sin\\left(x - \\frac{\\pi}{6}\\right)$' },
      { key: 'B', content: '$2\\sin\\left(x + \\frac{\\pi}{6}\\right)$' },
      { key: 'C', content: '$2\\cos\\left(x - \\frac{\\pi}{6}\\right)$' },
      { key: 'D', content: '$2\\sin\\left(x - \\frac{\\pi}{3}\\right)$' },
    ],
    correctAnswer: 'A',
    explanation: 'Ta có $\\sqrt{3}\\sin x - \\cos x = 2\\left(\\frac{\\sqrt{3}}{2}\\sin x - \\frac{1}{2}\\cos x\\right) = 2\\left(\\sin x\\cos\\frac{\\pi}{6} - \\cos x\\sin\\frac{\\pi}{6}\\right) = 2\\sin\\left(x - \\frac{\\pi}{6}\\right)$.',
    pedagogicalTip: 'Đặt $2$ ra ngoài ngoặc và thay $\\frac{\\sqrt{3}}{2} = \\cos\\frac{\\pi}{6}, \\frac{1}{2} = \\sin\\frac{\\pi}{6}$.',
  },
  {
    topic: 'Bài 2. Công thức lượng giác',
    prompt: 'Với mọi $x$, biểu thức $\\cos^4 x + \\sin^4 x$ viết theo $\\cos 4x$ là:',
    options: [
      { key: 'A', content: '$\\frac{3 + \\cos 4x}{4}$' },
      { key: 'B', content: '$\\frac{1 + \\cos 4x}{4}$' },
      { key: 'C', content: '$\\frac{3 - \\cos 4x}{4}$' },
      { key: 'D', content: '$1 - \\frac{1}{2}\\cos 4x$' },
    ],
    correctAnswer: 'A',
    explanation: 'Ta có $\\cos^4 x + \\sin^4 x = 1 - \\frac{1}{2}\\sin^2 2x = 1 - \\frac{1 - \\cos 4x}{4} = \\frac{3 + \\cos 4x}{4}$.',
    pedagogicalTip: 'Hạ bậc $\\sin^2 2x = \\frac{1 - \\cos 4x}{2}$.',
  },
];

const bai2De2P2: Omit<TrueFalseQuestion, 'id' | 'part' | 'number'>[] = [
  ...bai2De1P2,
];

const bai2De2P3: Omit<ShortAnswerQuestion, 'id' | 'part' | 'number' | 'points'>[] = [
  {
    topic: 'Bài 2. Công thức lượng giác',
    prompt: 'Tính giá trị của biểu thức $M = \\frac{\\tan 78^\\circ - \\tan 18^\\circ}{1 + \\tan 78^\\circ\\tan 18^\\circ}$ (làm tròn đến hai chữ số thập phân).',
    acceptableAnswers: ['1.73', '1,73'],
    explanation: 'Ta có $M = \\tan(78^\\circ - 18^\\circ) = \\tan 60^\\circ = \\sqrt{3} \\approx 1,73$.',
    pedagogicalTip: 'Áp dụng công thức $\\tan(a - b)$.',
  },
  {
    topic: 'Bài 2. Công thức lượng giác',
    prompt: 'Cho $\\sin\\alpha + \\cos\\alpha = \\frac{\\sqrt{6}}{2}$. Tính giá trị của $\\sin 2\\alpha$.',
    acceptableAnswers: ['0.5', '0,5'],
    explanation: 'Bình phương hai vế: $1 + \\sin 2\\alpha = \\frac{6}{4} = 1,5 \\Rightarrow \\sin 2\\alpha = 0,5$.',
    pedagogicalTip: 'Sử dụng $(\\sin\\alpha + \\cos\\alpha)^2 = 1 + \\sin 2\\alpha$.',
  },
  {
    topic: 'Bài 2. Công thức lượng giác',
    prompt: 'Tính giá trị của biểu thức $N = 16\\sin 10^\\circ\\sin 30^\\circ\\sin 50^\\circ\\sin 70^\\circ$.',
    acceptableAnswers: ['1', '1.0'],
    explanation: 'Vì $\\sin 30^\\circ = \\frac{1}{2}$ và $8\\sin 10^\\circ\\sin 50^\\circ\\sin 70^\\circ = 1$ nên $N = 2 \\cdot \\frac{1}{2} \\cdot 1 = 1$.',
    pedagogicalTip: 'Tích $\\sin 10^\\circ\\sin 50^\\circ\\sin 70^\\circ = \\frac{1}{8}$.',
  },
  {
    topic: 'Bài 2. Công thức lượng giác',
    prompt: 'Cho $\\cos 2x = -\\frac{1}{3}$. Tính giá trị của biểu thức $H = 6\\cos^2 x + 4$.',
    acceptableAnswers: ['6', '6.0'],
    explanation: 'Ta có $6\\cos^2 x = 3(1 + \\cos 2x) = 3\\left(1 - \\frac{1}{3}\\right) = 2$. Suy ra $H = 2 + 4 = 6$.',
    pedagogicalTip: 'Hạ bậc $2\\cos^2 x = 1 + \\cos 2x$.',
  },
];

const bai2De2P4: Omit<StepOrderingQuestion, 'id' | 'part' | 'number' | 'points'>[] = [
  ...bai2De1P4,
];

// ============================================================================
// BÀI 3. HÀM SỐ LƯỢNG GIÁC (2 Đề ôn riêng biệt)
// ============================================================================
const bai3De1P1: Omit<MultipleChoiceQuestion, 'id' | 'part' | 'number' | 'points'>[] = [
  {
    topic: 'Bài 3. Hàm số lượng giác',
    prompt: 'Tập xác định của hàm số $y = \\cot x$ là:',
    options: [
      { key: 'A', content: '$\\mathbb{R} \\setminus \\{k\\pi \\mid k \\in \\mathbb{Z}\\}$' },
      { key: 'B', content: '$\\mathbb{R} \\setminus \\left\\{\\frac{\\pi}{2} + k\\pi \\mid k \\in \\mathbb{Z}\\right\\}$' },
      { key: 'C', content: '$\\mathbb{R} \\setminus \\{k2\\pi \\mid k \\in \\mathbb{Z}\\}$' },
      { key: 'D', content: '$\\mathbb{R}$' },
    ],
    correctAnswer: 'A',
    explanation: 'Hàm số $y = \\cot x = \\frac{\\cos x}{\\sin x}$ xác định khi $\\sin x \\neq 0 \\Leftrightarrow x \\neq k\\pi$ ($k \\in \\mathbb{Z}$).',
    pedagogicalTip: 'Điều kiện của $\\cot x$ là $\\sin x \\neq 0$.',
  },
  {
    topic: 'Bài 3. Hàm số lượng giác',
    prompt: 'Tập giá trị của hàm số $y = \\cos x$ trên $\\mathbb{R}$ là:',
    options: [
      { key: 'A', content: '$[-1; 1]$' },
      { key: 'B', content: '$(-1; 1)$' },
      { key: 'C', content: '$[0; 1]$' },
      { key: 'D', content: '$\\mathbb{R}$' },
    ],
    correctAnswer: 'A',
    explanation: 'Với mọi $x \\in \\mathbb{R}$, ta luôn có $-1 \\le \\cos x \\le 1$, nên tập giá trị là đoạn $[-1; 1]$.',
    pedagogicalTip: 'Hai hàm số $y = \\sin x$ và $y = \\cos x$ có cùng tập giá trị $[-1; 1]$.',
  },
  {
    topic: 'Bài 3. Hàm số lượng giác',
    prompt: 'Trong các hàm số sau đây, hàm số nào là **hàm số chẵn**?',
    options: [
      { key: 'A', content: '$y = \\cos 3x$' },
      { key: 'B', content: '$y = \\sin 2x$' },
      { key: 'C', content: '$y = \\tan x$' },
      { key: 'D', content: '$y = x + \\cos x$' },
    ],
    correctAnswer: 'A',
    explanation: 'Với $f(x) = \\cos 3x$, tập xác định $D = \\mathbb{R}$ và $f(-x) = \\cos(-3x) = \\cos 3x = f(x)$, nên hàm số chẵn.',
    pedagogicalTip: 'Trong 4 hàm lượng giác cơ bản, chỉ có hàm côsin là hàm số chẵn.',
  },
  {
    topic: 'Bài 3. Hàm số lượng giác',
    prompt: 'Trong các hàm số sau, hàm số nào là **hàm số lẻ**?',
    options: [
      { key: 'A', content: '$y = \\sin x + \\tan x$' },
      { key: 'B', content: '$y = \\cos x$' },
      { key: 'C', content: '$y = x\\sin x$' },
      { key: 'D', content: '$y = \\sin^2 x$' },
    ],
    correctAnswer: 'A',
    explanation: 'Vì $\\sin(-x) + \\tan(-x) = -(\\sin x + \\tan x)$ trên miền đối xứng $D = \\mathbb{R} \\setminus \\left\\{\\frac{\\pi}{2} + k\\pi\\right\\}$ nên đây là hàm số lẻ.',
    pedagogicalTip: 'Tổng của hai hàm số lẻ trên tập đối xứng là một hàm số lẻ.',
  },
  {
    topic: 'Bài 3. Hàm số lượng giác',
    prompt: 'Chu kì tuần hoàn của hàm số $y = \\cos 4x$ là:',
    options: [
      { key: 'A', content: '$T = \\frac{\\pi}{2}$' },
      { key: 'B', content: '$T = \\pi$' },
      { key: 'C', content: '$T = 2\\pi$' },
      { key: 'D', content: '$T = \\frac{\\pi}{4}$' },
    ],
    correctAnswer: 'A',
    explanation: 'Chu kì của hàm số $y = \\cos(4x)$ là $T = \\frac{2\\pi}{4} = \\frac{\\pi}{2}$.',
    pedagogicalTip: 'Công thức chu kì của $\\sin(\\omega x), \\cos(\\omega x)$ là $T = \\frac{2\\pi}{|\\omega|}$.',
  },
  {
    topic: 'Bài 3. Hàm số lượng giác',
    prompt: 'Chu kì tuần hoàn của hàm số $y = \\tan 3x$ là:',
    options: [
      { key: 'A', content: '$T = \\frac{\\pi}{3}$' },
      { key: 'B', content: '$T = \\frac{2\\pi}{3}$' },
      { key: 'C', content: '$T = \\pi$' },
      { key: 'D', content: '$T = 3\\pi$' },
    ],
    correctAnswer: 'A',
    explanation: 'Hàm số $y = \\tan(\\omega x)$ có chu kì tuần hoàn $T = \\frac{\\pi}{|\\omega|} = \\frac{\\pi}{3}$.',
    pedagogicalTip: 'Chu kì cơ sở của $\\tan x$ và $\\cot x$ là $\\pi$ (không phải $2\\pi$).',
  },
  {
    topic: 'Bài 3. Hàm số lượng giác',
    prompt: 'Hàm số $y = \\sin x$ đồng biến trên khoảng nào dưới đây?',
    options: [
      { key: 'A', content: '$\\left(-\\frac{\\pi}{2}; \\frac{\\pi}{2}\\right)$' },
      { key: 'B', content: '$\\left(\\frac{\\pi}{2}; \\frac{3\\pi}{2}\\right)$' },
      { key: 'C', content: '$(0; \\pi)$' },
      { key: 'D', content: '$(\\pi; 2\\pi)$' },
    ],
    correctAnswer: 'A',
    explanation: 'Trên khoảng $\\left(-\\frac{\\pi}{2}; \\frac{\\pi}{2}\\right)$, đồ thị hàm số $y = \\sin x$ đi lên từ $-1$ đến $1$ nên hàm số đồng biến.',
    pedagogicalTip: 'Hàm số $y = \\sin x$ đồng biến trên $\\left(-\\frac{\\pi}{2} + k2\\pi; \\frac{\\pi}{2} + k2\\pi\\right)$.',
  },
  {
    topic: 'Bài 3. Hàm số lượng giác',
    prompt: 'Hàm số $y = \\cos x$ nghịch biến trên khoảng nào dưới đây?',
    options: [
      { key: 'A', content: '$(0; \\pi)$' },
      { key: 'B', content: '$(\\pi; 2\\pi)$' },
      { key: 'C', content: '$\\left(-\\frac{\\pi}{2}; \\frac{\\pi}{2}\\right)$' },
      { key: 'D', content: '$(-\\pi; 0)$' },
    ],
    correctAnswer: 'A',
    explanation: 'Trên khoảng $(0; \\pi)$, giá trị của $\\cos x$ giảm từ $1$ xuống $-1$ nên hàm số nghịch biến.',
    pedagogicalTip: 'Hàm $y = \\cos x$ nghịch biến trên $(k2\\pi; \\pi + k2\\pi)$ và đồng biến trên $(-\\pi + k2\\pi; k2\\pi)$.',
  },
  {
    topic: 'Bài 3. Hàm số lượng giác',
    prompt: 'Giá trị lớn nhất của hàm số $y = 4 - 3\\sin x$ trên $\\mathbb{R}$ bằng:',
    options: [
      { key: 'A', content: '$7$' },
      { key: 'B', content: '$1$' },
      { key: 'C', content: '$4$' },
      { key: 'D', content: '$3$' },
    ],
    correctAnswer: 'A',
    explanation: 'Vì $-1 \\le \\sin x \\le 1 \\Rightarrow -3 \\le -3\\sin x \\le 3 \\Rightarrow 1 \\le 4 - 3\\sin x \\le 7$. Vậy GTLN bằng $7$ (đạt khi $\\sin x = -1$).',
    pedagogicalTip: 'Khi nhân bất đẳng thức với số âm $-3$, chiều bất đẳng thức đổi ngược lại.',
  },
  {
    topic: 'Bài 3. Hàm số lượng giác',
    prompt: 'Tập xác định của hàm số $y = \\frac{1 + \\sin x}{\\cos x - 1}$ là:',
    options: [
      { key: 'A', content: '$\\mathbb{R} \\setminus \\{k2\\pi \\mid k \\in \\mathbb{Z}\\}$' },
      { key: 'B', content: '$\\mathbb{R} \\setminus \\{k\\pi \\mid k \\in \\mathbb{Z}\\}$' },
      { key: 'C', content: '$\\mathbb{R} \\setminus \\left\\{\\frac{\\pi}{2} + k2\\pi \\mid k \\in \\mathbb{Z}\\right\\}$' },
      { key: 'D', content: '$\\mathbb{R}$' },
    ],
    correctAnswer: 'A',
    explanation: 'Điều kiện xác định: $\\cos x - 1 \\neq 0 \\Leftrightarrow \\cos x \\neq 1 \\Leftrightarrow x \\neq k2\\pi$ ($k \\in \\mathbb{Z}$).',
    pedagogicalTip: '$\\cos x = 1 \\Leftrightarrow x = k2\\pi$.',
  },
  {
    topic: 'Bài 3. Hàm số lượng giác',
    prompt: 'Đồ thị của hàm số nào sau đây nhận trục tung $Oy$ làm trục đối xứng?',
    options: [
      { key: 'A', content: '$y = \\cos 2x$' },
      { key: 'B', content: '$y = \\sin 2x$' },
      { key: 'C', content: '$y = \\tan x$' },
      { key: 'D', content: '$y = \\cot x$' },
    ],
    correctAnswer: 'A',
    explanation: 'Hàm số chẵn $y = \\cos 2x$ có đồ thị nhận trục tung $Oy$ làm trục đối xứng; các hàm lẻ nhận gốc tọa độ $O$ làm tâm đối xứng.',
    pedagogicalTip: 'Hàm chẵn đối xứng qua $Oy$; hàm lẻ đối xứng qua gốc $O$.',
  },
  {
    topic: 'Bài 3. Hàm số lượng giác',
    prompt: 'Giá trị nhỏ nhất của hàm số $y = 2\\cos^2 x - 5$ trên $\\mathbb{R}$ là:',
    options: [
      { key: 'A', content: '$-5$' },
      { key: 'B', content: '$-7$' },
      { key: 'C', content: '$-3$' },
      { key: 'D', content: '$0$' },
    ],
    correctAnswer: 'A',
    explanation: 'Vì $0 \\le \\cos^2 x \\le 1$ với mọi $x \\in \\mathbb{R}$ nên $-5 \\le 2\\cos^2 x - 5 \\le -3$. Vậy GTNN bằng $-5$.',
    pedagogicalTip: 'Lưu ý $\\cos^2 x \\ge 0$ chứ không phải $\\ge -1$.',
  },
];

const bai3De1P2: Omit<TrueFalseQuestion, 'id' | 'part' | 'number'>[] = [
  {
    topic: 'Bài 3. Hàm số lượng giác',
    prompt: 'Cho hàm số $y = f(x) = 3\\sin\\left(2x + \\frac{\\pi}{4}\\right) + 2$. Xét tính đúng sai của các mệnh đề sau:',
    statements: [
      {
        id: 'a',
        label: 'a',
        statement: 'Tập xác định của hàm số đã cho là $D = \\mathbb{R}$.',
        isCorrect: true,
        explanation: 'Hàm số sin xác định với mọi giá trị thực của $x$.',
      },
      {
        id: 'b',
        label: 'b',
        statement: 'Hàm số tuần hoàn với chu kì $T = \\pi$.',
        isCorrect: true,
        explanation: 'Chu kì của hàm số là $T = \\frac{2\\pi}{2} = \\pi$.',
      },
      {
        id: 'c',
        label: 'c',
        statement: 'Tập giá trị của hàm số là đoạn $[-3; 3]$.',
        isCorrect: false,
        explanation: 'Vì $-1 \\le \\sin\\left(2x + \\frac{\\pi}{4}\\right) \\le 1$ nên $-1 \\le 3\\sin\\left(2x + \\frac{\\pi}{4}\\right) + 2 \\le 5$, tập giá trị là $[-1; 5]$.',
      },
      {
        id: 'd',
        label: 'd',
        statement: 'Tại $x = \\frac{\\pi}{8}$, hàm số đạt giá trị lớn nhất bằng $5$.',
        isCorrect: true,
        explanation: 'Thay $x = \\frac{\\pi}{8}$: $f\\left(\\frac{\\pi}{8}\\right) = 3\\sin\\left(\\frac{\\pi}{4} + \\frac{\\pi}{4}\\right) + 2 = 3\\sin\\frac{\\pi}{2} + 2 = 5$.',
      },
    ],
    pedagogicalTip: 'Đánh giá miền giá trị của $\\sin u \\in [-1; 1]$ rồi nhân $3$ và cộng $2$.',
  },
  {
    topic: 'Bài 3. Hàm số lượng giác',
    prompt: 'Cho hai hàm số $f(x) = x^2\\cos x$ và $g(x) = \\tan 2x$. Xét tính đúng sai của các mệnh đề sau:',
    statements: [
      {
        id: 'a',
        label: 'a',
        statement: 'Hàm số $f(x) = x^2\\cos x$ là một hàm số chẵn trên $\\mathbb{R}$.',
        isCorrect: true,
        explanation: 'Ta có $f(-x) = (-x)^2\\cos(-x) = x^2\\cos x = f(x), \\forall x \\in \\mathbb{R}$.',
      },
      {
        id: 'b',
        label: 'b',
        statement: 'Đồ thị của hàm số $f(x)$ nhận trục tung $Oy$ làm trục đối xứng.',
        isCorrect: true,
        explanation: 'Mọi hàm số chẵn đều có đồ thị nhận trục tung $Oy$ làm trục đối xứng.',
      },
      {
        id: 'c',
        label: 'c',
        statement: 'Tập xác định của hàm số $g(x) = \\tan 2x$ là $D = \\mathbb{R} \\setminus \\left\\{\\frac{\\pi}{2} + k\\pi \\mid k \\in \\mathbb{Z}\\right\\}$.',
        isCorrect: false,
        explanation: 'Điều kiện $\\cos 2x \\neq 0 \\Leftrightarrow 2x \\neq \\frac{\\pi}{2} + k\\pi \\Leftrightarrow x \\neq \\frac{\\pi}{4} + k\\frac{\\pi}{2}$ ($k \\in \\mathbb{Z}$).',
      },
      {
        id: 'd',
        label: 'd',
        statement: 'Hàm số $g(x) = \\tan 2x$ tuần hoàn với chu kì $T = \\frac{\\pi}{2}$.',
        isCorrect: true,
        explanation: 'Chu kì của $\\tan 2x$ là $T = \\frac{\\pi}{2}$.',
      },
    ],
    pedagogicalTip: 'Khi tìm tập xác định của $\\tan(ax)$, nhớ chia cả $\\frac{\\pi}{2}$ và $k\\pi$ cho $a$.',
  },
];

const bai3De1P3: Omit<ShortAnswerQuestion, 'id' | 'part' | 'number' | 'points'>[] = [
  {
    topic: 'Bài 3. Hàm số lượng giác',
    prompt: 'Gọi $M$ và $m$ lần lượt là giá trị lớn nhất và giá trị nhỏ nhất của hàm số $y = 5\\cos\\left(3x - \\frac{\\pi}{6}\\right) + 7$. Tính hiệu $M - m$.',
    acceptableAnswers: ['10', '10.0'],
    explanation: 'Ta có $M = 5 \\cdot 1 + 7 = 12$ và $m = 5 \\cdot (-1) + 7 = 2$. Suy ra $M - m = 12 - 2 = 10$.',
    pedagogicalTip: 'Biên độ dao động $M - m$ của hàm $y = A\\cos(\\omega x + \\varphi) + B$ bằng $2|A|$.',
  },
  {
    topic: 'Bài 3. Hàm số lượng giác',
    prompt: 'Tìm giá trị lớn nhất của hàm số $y = \\sin^2 x + 4\\sin x + 3$ trên $\\mathbb{R}$.',
    acceptableAnswers: ['8', '8.0'],
    explanation: 'Đặt $t = \\sin x \\in [-1; 1]$. Hàm số $f(t) = t^2 + 4t + 3 = (t + 2)^2 - 1$ đồng biến trên $[-1; 1]$ nên đạt GTLN tại $t = 1$ bằng $1 + 4 + 3 = 8$.',
    pedagogicalTip: 'Viết dưới dạng bình phương $(1 + 2)^2 - 1 = 8$ khi $\\sin x = 1$.',
  },
  {
    topic: 'Bài 3. Hàm số lượng giác',
    prompt: 'Một vật dao động điều hòa có li độ $x\\text{ (cm)}$ theo thời gian $t\\text{ (giây)}$ được cho bởi hàm số $x(t) = 6\\cos\\left(4\\pi t\\right)$. Chu kì dao động $T\\text{ (giây)}$ của vật bằng bao nhiêu?',
    acceptableAnswers: ['0.5', '0,5'],
    explanation: 'Chu kì của hàm số là $T = \\frac{2\\pi}{4\\pi} = 0,5\\text{ (giây)}$.',
    pedagogicalTip: 'Áp dụng công thức $T = \\frac{2\\pi}{\\omega}$ với $\\omega = 4\\pi$.',
  },
  {
    topic: 'Bài 3. Hàm số lượng giác',
    prompt: 'Tính tổng giá trị lớn nhất và giá trị nhỏ nhất của hàm số $y = 4\\sin^2 x - 2\\cos 2x + 1$.',
    acceptableAnswers: ['6', '6.0'],
    explanation: 'Hạ bậc $4\\sin^2 x = 2(1 - \\cos 2x) = 2 - 2\\cos 2x$. Khi đó $y = 3 - 4\\cos 2x$. Do $-1 \\le \\cos 2x \\le 1$ nên $M = 7, m = -1 \\Rightarrow M + m = 6$.',
    pedagogicalTip: 'Đưa toàn bộ biểu thức về cùng một góc $2x$ trước khi đánh giá GTLN, GTNN.',
  },
];

const bai3De1P4: Omit<StepOrderingQuestion, 'id' | 'part' | 'number' | 'points'>[] = [
  {
    topic: 'Bài 3. Hàm số lượng giác',
    problemStatement: 'Xét tính chẵn, lẻ của hàm số $f(x) = \\frac{\\sin 2x}{\\cos x}$. Hãy sắp xếp các bước giải theo đúng thứ tự logic.',
    conclusionTarget: 'Kết luận $f(x)$ là hàm số lẻ.',
    steps: [
      {
        id: 's1',
        originalIndex: 1,
        roleDescription: 'Tìm tập xác định và kiểm tra tính đối xứng của D',
        content: 'Điều kiện $\\cos x \\neq 0 \\Leftrightarrow x \\neq \\frac{\\pi}{2} + k\\pi$ ($k \\in \\mathbb{Z}$). Tập xác định $D = \\mathbb{R} \\setminus \\left\\{\\frac{\\pi}{2} + k\\pi\\right\\}$ là tập đối xứng (với mọi $x \\in D$ thì $-x \\in D$).',
      },
      {
        id: 's2',
        originalIndex: 2,
        roleDescription: 'Tính biểu thức f(-x)',
        content: 'Với mọi $x \\in D$, ta có $f(-x) = \\frac{\\sin(-2x)}{\\cos(-x)}$.',
      },
      {
        id: 's3',
        originalIndex: 3,
        roleDescription: 'Áp dụng tính chất hai góc đối nhau',
        content: 'Vì $\\sin(-2x) = -\\sin 2x$ và $\\cos(-x) = \\cos x$ nên $f(-x) = \\frac{-\\sin 2x}{\\cos x} = -f(x)$.',
      },
      {
        id: 's4',
        originalIndex: 4,
        roleDescription: 'Kết luận tính chẵn lẻ của hàm số',
        content: 'Vậy $f(-x) = -f(x)$ với mọi $x \\in D$, suy ra $f(x)$ là một hàm số lẻ.',
      },
    ],
    pedagogicalTip: 'Luôn tìm tập xác định và kiểm tra điều kiện $\\forall x \\in D \\Rightarrow -x \\in D$ ở bước đầu tiên.',
    teacherAnalysis: 'Quy trình chuẩn xét tính chẵn lẻ của hàm số lượng giác.',
  },
  {
    topic: 'Bài 3. Hàm số lượng giác',
    problemStatement: 'Tìm tập giá trị của hàm số $y = 3\\sin x + 4\\cos x + 2$ trên $\\mathbb{R}$. Hãy sắp xếp các bước giải theo đúng thứ tự logic.',
    conclusionTarget: 'Tìm được tập giá trị của hàm số là đoạn $[-3; 7]$.',
    steps: [
      {
        id: 's1',
        originalIndex: 1,
        roleDescription: 'Đưa biểu thức 3sin x + 4cos x về dạng 5sin(x + alpha)',
        content: 'Ta viết $3\\sin x + 4\\cos x = 5\\left(\\frac{3}{5}\\sin x + \\frac{4}{5}\\cos x\\right) = 5\\sin(x + \\alpha)$ (với $\\cos\\alpha = \\frac{3}{5}, \\sin\\alpha = \\frac{4}{5}$).',
      },
      {
        id: 's2',
        originalIndex: 2,
        roleDescription: 'Viết lại hàm số y theo một hàm sin duy nhất',
        content: 'Khi đó hàm số đã cho trở thành $y = 5\\sin(x + \\alpha) + 2$.',
      },
      {
        id: 's3',
        originalIndex: 3,
        roleDescription: 'Đánh giá bất đẳng thức từ tập giá trị của hàm sin',
        content: 'Vì $-1 \\le \\sin(x + \\alpha) \\le 1, \\forall x \\in \\mathbb{R}$ nên $-5 \\le 5\\sin(x + \\alpha) \\le 5 \\Leftrightarrow -3 \\le y \\le 7$.',
      },
      {
        id: 's4',
        originalIndex: 4,
        roleDescription: 'Kết luận tập giá trị của hàm số',
        content: 'Vậy tập giá trị của hàm số $y = 3\\sin x + 4\\cos x + 2$ là đoạn $T = [-3; 7]$.',
      },
    ],
    pedagogicalTip: 'Biểu thức $a\\sin x + b\\cos x$ luôn có giá trị lớn nhất là $\\sqrt{a^2 + b^2}$ và nhỏ nhất là $-\\sqrt{a^2 + b^2}$.',
    teacherAnalysis: 'Vận dụng công thức cộng để tìm tập giá trị hàm bậc nhất đối với $\\sin x, \\cos x$.',
  },
  {
    topic: 'Bài 3. Hàm số lượng giác',
    problemStatement: 'Tìm tập xác định của hàm số $y = \\frac{\\cot x}{\\sin x - 1}$. Hãy sắp xếp các bước giải theo đúng thứ tự logic.',
    conclusionTarget: 'Tìm được $D = \\mathbb{R} \\setminus \\left(\\{k\\pi\\} \\cup \\left\\{\\frac{\\pi}{2} + k2\\pi\\right\\}\\right)$ ($k \\in \\mathbb{Z}$).',
    steps: [
      {
        id: 's1',
        originalIndex: 1,
        roleDescription: 'Đặt điều kiện có nghĩa cho cả cot x và mẫu thức',
        content: 'Biểu thức $\\frac{\\cot x}{\\sin x - 1}$ xác định khi và chỉ khi $\\begin{cases} \\sin x \\neq 0 \\\\ \\sin x - 1 \\neq 0 \\end{cases}$.',
      },
      {
        id: 's2',
        originalIndex: 2,
        roleDescription: 'Giải điều kiện sin x != 0',
        content: 'Điều kiện thứ nhất: $\\sin x \\neq 0 \\Leftrightarrow x \\neq k\\pi$ ($k \\in \\mathbb{Z}$).',
      },
      {
        id: 's3',
        originalIndex: 3,
        roleDescription: 'Giải điều kiện sin x != 1',
        content: 'Điều kiện thứ hai: $\\sin x \\neq 1 \\Leftrightarrow x \\neq \\frac{\\pi}{2} + k2\\pi$ ($k \\in \\mathbb{Z}$).',
      },
      {
        id: 's4',
        originalIndex: 4,
        roleDescription: 'Kết luận tập xác định D',
        content: 'Vậy tập xác định của hàm số là $D = \\mathbb{R} \\setminus \\left\\{k\\pi, \\frac{\\pi}{2} + k2\\pi \\mid k \\in \\mathbb{Z}\\right\\}$.',
      },
    ],
    pedagogicalTip: 'Đừng quên điều kiện xác định ẩn bên trong $\\cot x = \\frac{\\cos x}{\\sin x}$ là $\\sin x \\neq 0$.',
    teacherAnalysis: 'Bài toán tìm tập xác định kết hợp nhiều điều kiện lượng giác.',
  },
  {
    topic: 'Bài 3. Hàm số lượng giác',
    problemStatement: 'Tìm giá trị lớn nhất và giá trị nhỏ nhất của hàm số $y = \\cos 2x + 2\\sin x + 2$. Hãy sắp xếp các bước giải theo đúng thứ tự logic.',
    conclusionTarget: 'Tìm được $\\max y = \\frac{7}{2}$ và $\\min y = 0$.',
    steps: [
      {
        id: 's1',
        originalIndex: 1,
        roleDescription: 'Biểu diễn cos 2x theo sin^2 x',
        content: 'Áp dụng công thức nhân đôi $\\cos 2x = 1 - 2\\sin^2 x$, ta viết lại $y = -2\\sin^2 x + 2\\sin x + 3$.',
      },
      {
        id: 's2',
        originalIndex: 2,
        roleDescription: 'Đặt ẩn phụ t = sin x với t thuộc [-1; 1]',
        content: 'Đặt $t = \\sin x$ ($t \\in [-1; 1]$), bài toán quy về tìm GTLN, GTNN của $g(t) = -2t^2 + 2t + 3 = -2\\left(t - \\frac{1}{2}\\right)^2 + \\frac{7}{2}$ trên $[-1; 1]$.',
      },
      {
        id: 's3',
        originalIndex: 3,
        roleDescription: 'Tìm GTLN và GTNN của g(t) trên đoạn [-1; 1]',
        content: 'Do đỉnh $t = \\frac{1}{2} \\in [-1; 1]$ nên $\\max_{[-1; 1]} g(t) = g\\left(\\frac{1}{2}\\right) = \\frac{7}{2}$ và $\\min_{[-1; 1]} g(t) = g(-1) = -2 - 2 + 3 = -1$.',
      },
      {
        id: 's4',
        originalIndex: 4,
        roleDescription: 'Kết luận GTLN và GTNN của hàm số y',
        content: 'Vậy giá trị lớn nhất của hàm số là $\\frac{7}{2}$ (khi $\\sin x = \\frac{1}{2}$) và giá trị nhỏ nhất là $-1$ (khi $\\sin x = -1$).',
      },
    ],
    pedagogicalTip: 'Đưa hàm bậc hai theo $\\sin x$ về đỉnh parabol $t_0 = \\frac{1}{2} \\in [-1; 1]$.',
    teacherAnalysis: 'Rèn luyện kỹ năng tìm cực trị hàm lượng giác quy về bậc hai.',
  },
];

const bai3De2P1: Omit<MultipleChoiceQuestion, 'id' | 'part' | 'number' | 'points'>[] = [
  {
    topic: 'Bài 3. Hàm số lượng giác',
    prompt: 'Hàm số nào sau đây có tập xác định là $D = \\mathbb{R}$?',
    options: [
      { key: 'A', content: '$y = \\sin 3x - 2\\cos x$' },
      { key: 'B', content: '$y = \\tan 2x$' },
      { key: 'C', content: '$y = \\cot x$' },
      { key: 'D', content: '$y = \\frac{1}{\\sin x}$' },
    ],
    correctAnswer: 'A',
    explanation: 'Các hàm số $\\sin 3x$ và $\\cos x$ đều xác định với mọi $x \\in \\mathbb{R}$.',
    pedagogicalTip: 'Chỉ có hàm $\\sin$ và $\\cos$ xác định trên toàn bộ $\\mathbb{R}$.',
  },
  {
    topic: 'Bài 3. Hàm số lượng giác',
    prompt: 'Chu kì tuần hoàn của hàm số $y = \\sin\\frac{x}{2}$ là:',
    options: [
      { key: 'A', content: '$T = 4\\pi$' },
      { key: 'B', content: '$T = \\pi$' },
      { key: 'C', content: '$T = 2\\pi$' },
      { key: 'D', content: '$T = \\frac{\\pi}{2}$' },
    ],
    correctAnswer: 'A',
    explanation: 'Áp dụng công thức $T = \\frac{2\\pi}{1/2} = 4\\pi$.',
    pedagogicalTip: 'Với $\\omega = \\frac{1}{2}$ thì $T = \\frac{2\\pi}{1/2} = 4\\pi$.',
  },
  {
    topic: 'Bài 3. Hàm số lượng giác',
    prompt: 'Chu kì tuần hoàn của hàm số $y = \\cot\\frac{x}{3}$ là:',
    options: [
      { key: 'A', content: '$T = 3\\pi$' },
      { key: 'B', content: '$T = 6\\pi$' },
      { key: 'C', content: '$T = \\frac{\\pi}{3}$' },
      { key: 'D', content: '$T = \\pi$' },
    ],
    correctAnswer: 'A',
    explanation: 'Chu kì của hàm $y = \\cot(\\omega x)$ là $T = \\frac{\\pi}{|\\omega|} = \\frac{\\pi}{1/3} = 3\\pi$.',
    pedagogicalTip: 'Chu kì của $\\cot(\\omega x)$ là $\\frac{\\pi}{|\\omega|}$.',
  },
  {
    topic: 'Bài 3. Hàm số lượng giác',
    prompt: 'Tập xác định của hàm số $y = \\sqrt{1 - \\cos x}$ là:',
    options: [
      { key: 'A', content: '$D = \\mathbb{R}$' },
      { key: 'B', content: '$D = [0; +\\infty)$' },
      { key: 'C', content: '$D = \\mathbb{R} \\setminus \\{k2\\pi \\mid k \\in \\mathbb{Z}\\}$' },
      { key: 'D', content: '$D = [-1; 1]$' },
    ],
    correctAnswer: 'A',
    explanation: 'Vì $\\cos x \\le 1 \\Rightarrow 1 - \\cos x \\ge 0$ luôn đúng với mọi $x \\in \\mathbb{R}$, nên tập xác định là $D = \\mathbb{R}$.',
    pedagogicalTip: 'Do $-1 \\le \\cos x \\le 1$ nên $1 - \\cos x \\ge 0$ với mọi $x \\in \\mathbb{R}$.',
  },
  {
    topic: 'Bài 3. Hàm số lượng giác',
    prompt: 'Trong các hàm số sau, hàm số nào vừa không chẵn, vừa không lẻ?',
    options: [
      { key: 'A', content: '$y = \\sin x + \\cos x$' },
      { key: 'B', content: '$y = \\sin 3x$' },
      { key: 'C', content: '$y = \\cos 5x$' },
      { key: 'D', content: '$y = x\\tan x$' },
    ],
    correctAnswer: 'A',
    explanation: 'Xét $f(x) = \\sin x + \\cos x$: $f\\left(\\frac{\\pi}{2}\\right) = 1$, còn $f\\left(-\\frac{\\pi}{2}\\right) = -1$; trong khi $f(\\pi) = -1$ và $f(-\\pi) = -1$, nên $f$ không chẵn cũng không lẻ.',
    pedagogicalTip: 'Tổng của một hàm chẵn khác $0$ và một hàm lẻ khác $0$ là hàm không chẵn không lẻ.',
  },
  {
    topic: 'Bài 3. Hàm số lượng giác',
    prompt: 'Giá trị nhỏ nhất của hàm số $y = 6\\sin 2x + 1$ trên $\\mathbb{R}$ là:',
    options: [
      { key: 'A', content: '$-5$' },
      { key: 'B', content: '$-6$' },
      { key: 'C', content: '$7$' },
      { key: 'D', content: '$1$' },
    ],
    correctAnswer: 'A',
    explanation: 'Vì $\\sin 2x \\ge -1$ nên $y = 6\\sin 2x + 1 \\ge -6 + 1 = -5$.',
    pedagogicalTip: 'Thay $\\sin 2x = -1$ để tìm giá trị nhỏ nhất.',
  },
  {
    topic: 'Bài 3. Hàm số lượng giác',
    prompt: 'Hàm số $y = \\tan x$ có tính chất biến thiên nào sau đây trên mỗi khoảng $\\left(-\\frac{\\pi}{2} + k\\pi; \\frac{\\pi}{2} + k\\pi\\right)$?',
    options: [
      { key: 'A', content: 'Luôn đồng biến' },
      { key: 'B', content: 'Luôn nghịch biến' },
      { key: 'C', content: 'Đồng biến trên nửa khoảng đầu, nghịch biến trên nửa khoảng sau' },
      { key: 'D', content: 'Là hàm hằng' },
    ],
    correctAnswer: 'A',
    explanation: 'Đồ thị hàm số $y = \\tan x$ luôn đi lên từ trái sang phải trên từng khoảng xác định $\\left(-\\frac{\\pi}{2} + k\\pi; \\frac{\\pi}{2} + k\\pi\\right)$.',
    pedagogicalTip: 'Hàm $\\tan x$ đồng biến trên từng khoảng xác định; hàm $\\cot x$ nghịch biến trên từng khoảng xác định.',
  },
  {
    topic: 'Bài 3. Hàm số lượng giác',
    prompt: 'Tập giá trị của hàm số $y = \\tan x$ là:',
    options: [
      { key: 'A', content: '$\\mathbb{R}$' },
      { key: 'B', content: '$[-1; 1]$' },
      { key: 'C', content: '$[0; +\\infty)$' },
      { key: 'D', content: '$\\mathbb{R} \\setminus \\{-1; 1\\}$' },
    ],
    correctAnswer: 'A',
    explanation: 'Hàm số $y = \\tan x$ nhận mọi giá trị thực nên có tập giá trị là $\\mathbb{R}$.',
    pedagogicalTip: 'Hai hàm $\\tan x$ và $\\cot x$ đều có tập giá trị là $(-\\infty; +\\infty) = \\mathbb{R}$.',
  },
  {
    topic: 'Bài 3. Hàm số lượng giác',
    prompt: 'Đồ thị hàm số $y = \\sin x$ đi qua điểm nào sau đây?',
    options: [
      { key: 'A', content: '$M\\left(\\frac{\\pi}{6}; \\frac{1}{2}\\right)$' },
      { key: 'B', content: '$N\\left(\\frac{\\pi}{6}; \\frac{\\sqrt{3}}{2}\\right)$' },
      { key: 'C', content: '$P(0; 1)$' },
      { key: 'D', content: '$Q\\left(\\frac{\\pi}{2}; 0\\right)$' },
    ],
    correctAnswer: 'A',
    explanation: 'Thay $x = \\frac{\\pi}{6}$ vào $y = \\sin x$ ta được $y = \\sin\\frac{\\pi}{6} = \\frac{1}{2}$.',
    pedagogicalTip: 'Kiểm tra tọa độ $(x_0; y_0)$ thỏa mãn $y_0 = \\sin x_0$.',
  },
  {
    topic: 'Bài 3. Hàm số lượng giác',
    prompt: 'Tập xác định của hàm số $y = \\frac{3}{\\sin 2x}$ là:',
    options: [
      { key: 'A', content: '$\\mathbb{R} \\setminus \\left\\{k\\frac{\\pi}{2} \\mid k \\in \\mathbb{Z}\\right\\}$' },
      { key: 'B', content: '$\\mathbb{R} \\setminus \\{k\\pi \\mid k \\in \\mathbb{Z}\\}$' },
      { key: 'C', content: '$\\mathbb{R} \\setminus \\{k2\\pi \\mid k \\in \\mathbb{Z}\\}$' },
      { key: 'D', content: '$\\mathbb{R} \\setminus \\left\\{\\frac{\\pi}{4} + k\\pi \\mid k \\in \\mathbb{Z}\\right\\}$' },
    ],
    correctAnswer: 'A',
    explanation: 'Điều kiện $\\sin 2x \\neq 0 \\Leftrightarrow 2x \\neq k\\pi \\Leftrightarrow x \\neq k\\frac{\\pi}{2}$ ($k \\in \\mathbb{Z}$).',
    pedagogicalTip: '$\\sin u \\neq 0 \\Leftrightarrow u \\neq k\\pi$.',
  },
  {
    topic: 'Bài 3. Hàm số lượng giác',
    prompt: 'Giá trị lớn nhất của hàm số $y = 3 - 4\\sin^2 x$ trên $\\mathbb{R}$ bằng:',
    options: [
      { key: 'A', content: '$3$' },
      { key: 'B', content: '$7$' },
      { key: 'C', content: '$-1$' },
      { key: 'D', content: '$4$' },
    ],
    correctAnswer: 'A',
    explanation: 'Vì $\\sin^2 x \\ge 0$ nên $3 - 4\\sin^2 x \\le 3$. Dấu bằng xảy ra khi $\\sin x = 0$.',
    pedagogicalTip: 'Chú ý $\\sin^2 x \\in [0; 1]$.',
  },
  {
    topic: 'Bài 3. Hàm số lượng giác',
    prompt: 'Hàm số $y = \\sin x$ tuần hoàn với chu kì nhỏ nhất là $T_1$, hàm số $y = \\cot x$ tuần hoàn với chu kì nhỏ nhất là $T_2$. Khi đó tỉ số $\\frac{T_1}{T_2}$ bằng:',
    options: [
      { key: 'A', content: '$2$' },
      { key: 'B', content: '$1$' },
      { key: 'C', content: '$\\frac{1}{2}$' },
      { key: 'D', content: '$4$' },
    ],
    correctAnswer: 'A',
    explanation: 'Ta có $T_1 = 2\\pi$ và $T_2 = \\pi$, suy ra $\\frac{T_1}{T_2} = \\frac{2\\pi}{\\pi} = 2$.',
    pedagogicalTip: '$T_{\\sin} = 2\\pi$ và $T_{\\cot} = \\pi$.',
  },
];

const bai3De2P2: Omit<TrueFalseQuestion, 'id' | 'part' | 'number'>[] = [
  ...bai3De1P2,
];

const bai3De2P3: Omit<ShortAnswerQuestion, 'id' | 'part' | 'number' | 'points'>[] = [
  {
    topic: 'Bài 3. Hàm số lượng giác',
    prompt: 'Tìm tích của giá trị lớn nhất và giá trị nhỏ nhất của hàm số $y = 2\\sin x + 5$ trên $\\mathbb{R}$.',
    acceptableAnswers: ['21', '21.0'],
    explanation: 'Ta có $M = 2 + 5 = 7$ và $m = -2 + 5 = 3$. Tích $M \\cdot m = 7 \\cdot 3 = 21$.',
    pedagogicalTip: 'Tìm $M = 7, m = 3$ rồi nhân lại.',
  },
  {
    topic: 'Bài 3. Hàm số lượng giác',
    prompt: 'Tìm giá trị lớn nhất của hàm số $y = 5\\sin x - 12\\cos x + 4$ trên $\\mathbb{R}$.',
    acceptableAnswers: ['17', '17.0'],
    explanation: 'Ta có $\\max(5\\sin x - 12\\cos x) = \\sqrt{5^2 + (-12)^2} = 13$. Suy ra $\\max y = 13 + 4 = 17$.',
    pedagogicalTip: 'Áp dụng $\\max(a\\sin x + b\\cos x) = \\sqrt{a^2 + b^2}$.',
  },
  {
    topic: 'Bài 3. Hàm số lượng giác',
    prompt: 'Guồng nước của một nông trại có tâm đặt ở độ cao $4\\text{ m}$ so với mặt nước và bán kính guồng là $3,2\\text{ m}$. Độ cao $h(t)\\text{ (m)}$ của một ống trúc trên guồng được cho bởi $h(t) = 4 + 3,2\\sin\\left(\\frac{\\pi t}{15}\\right)$. Hỏi độ cao thấp nhất của ống trúc so với mặt nước là bao nhiêu mét?',
    acceptableAnswers: ['0.8', '0,8'],
    explanation: 'Giá trị nhỏ nhất của $h(t)$ đạt khi $\\sin\\left(\\frac{\\pi t}{15}\\right) = -1$, khi đó $h_{\\min} = 4 - 3,2 = 0,8\\text{ (m)}$.',
    pedagogicalTip: 'Độ cao thấp nhất ứng với giá trị nhỏ nhất của hàm sin bằng $-1$.',
  },
  {
    topic: 'Bài 3. Hàm số lượng giác',
    prompt: 'Chu kì tuần hoàn của hàm số $y = \\cos\\left(\\frac{\\pi x}{6}\\right)$ bằng bao nhiêu?',
    acceptableAnswers: ['12', '12.0'],
    explanation: 'Chu kì $T = \\frac{2\\pi}{\\pi / 6} = 12$.',
    pedagogicalTip: 'Áp dụng công thức $T = \\frac{2\\pi}{|\\omega|}$.',
  },
];

const bai3De2P4: Omit<StepOrderingQuestion, 'id' | 'part' | 'number' | 'points'>[] = [
  ...bai3De1P4,
];

// ============================================================================
// BÀI 4. PHƯƠNG TRÌNH LƯỢNG GIÁC CƠ BẢN (2 Đề ôn riêng biệt)
// ============================================================================
const bai4De1P1: Omit<MultipleChoiceQuestion, 'id' | 'part' | 'number' | 'points'>[] = [
  {
    topic: 'Bài 4. Phương trình lượng giác cơ bản',
    prompt: 'Phương trình $\\sin x = m$ có nghiệm thực khi và chỉ khi tham số $m$ thỏa mãn:',
    options: [
      { key: 'A', content: '$-1 \\le m \\le 1$' },
      { key: 'B', content: '$-1 < m < 1$' },
      { key: 'C', content: '$m \\ge -1$' },
      { key: 'D', content: '$m \\in \\mathbb{R}$' },
    ],
    correctAnswer: 'A',
    explanation: 'Vì tập giá trị của hàm số $y = \\sin x$ là $[-1; 1]$ nên phương trình $\\sin x = m$ có nghiệm khi và chỉ khi $|m| \\le 1 \\Leftrightarrow -1 \\le m \\le 1$.',
    pedagogicalTip: 'Phương trình $\\sin x = m$ và $\\cos x = m$ có nghiệm khi $|m| \\le 1$.',
  },
  {
    topic: 'Bài 4. Phương trình lượng giác cơ bản',
    prompt: 'Nghiệm của phương trình $\\sin x = \\frac{\\sqrt{3}}{2}$ là:',
    options: [
      { key: 'A', content: '$x = \\frac{\\pi}{3} + k2\\pi$ hoặc $x = \\frac{2\\pi}{3} + k2\\pi$ ($k \\in \\mathbb{Z}$)' },
      { key: 'B', content: '$x = \\pm\\frac{\\pi}{3} + k2\\pi$ ($k \\in \\mathbb{Z}$)' },
      { key: 'C', content: '$x = \\frac{\\pi}{6} + k2\\pi$ hoặc $x = \\frac{5\\pi}{6} + k2\\pi$ ($k \\in \\mathbb{Z}$)' },
      { key: 'D', content: '$x = \\frac{\\pi}{3} + k\\pi$ ($k \\in \\mathbb{Z}$)' },
    ],
    correctAnswer: 'A',
    explanation: 'Ta có $\\sin x = \\frac{\\sqrt{3}}{2} = \\sin\\frac{\\pi}{3} \\Leftrightarrow x = \\frac{\\pi}{3} + k2\\pi$ hoặc $x = \\pi - \\frac{\\pi}{3} + k2\\pi = \\frac{2\\pi}{3} + k2\\pi$ ($k \\in \\mathbb{Z}$).',
    pedagogicalTip: 'Hai họ nghiệm của $\\sin x = \\sin\\alpha$ là $\\alpha + k2\\pi$ và $\\pi - \\alpha + k2\\pi$.',
  },
  {
    topic: 'Bài 4. Phương trình lượng giác cơ bản',
    prompt: 'Nghiệm của phương trình $\\cos x = \\frac{\\sqrt{2}}{2}$ là:',
    options: [
      { key: 'A', content: '$x = \\pm\\frac{\\pi}{4} + k2\\pi$ ($k \\in \\mathbb{Z}$)' },
      { key: 'B', content: '$x = \\frac{\\pi}{4} + k2\\pi$ hoặc $x = \\frac{3\\pi}{4} + k2\\pi$ ($k \\in \\mathbb{Z}$)' },
      { key: 'C', content: '$x = \\pm\\frac{\\pi}{4} + k\\pi$ ($k \\in \\mathbb{Z}$)' },
      { key: 'D', content: '$x = \\frac{\\pi}{4} + k2\\pi$ ($k \\in \\mathbb{Z}$)' },
    ],
    correctAnswer: 'A',
    explanation: 'Ta có $\\cos x = \\frac{\\sqrt{2}}{2} = \\cos\\frac{\\pi}{4} \\Leftrightarrow x = \\pm\\frac{\\pi}{4} + k2\\pi$ ($k \\in \\mathbb{Z}$).',
    pedagogicalTip: 'Phương trình $\\cos x = \\cos\\alpha$ có nghiệm $x = \\pm\\alpha + k2\\pi$.',
  },
  {
    topic: 'Bài 4. Phương trình lượng giác cơ bản',
    prompt: 'Nghiệm của phương trình $\\tan x = \\sqrt{3}$ là:',
    options: [
      { key: 'A', content: '$x = \\frac{\\pi}{3} + k\\pi$ ($k \\in \\mathbb{Z}$)' },
      { key: 'B', content: '$x = \\frac{\\pi}{3} + k2\\pi$ ($k \\in \\mathbb{Z}$)' },
      { key: 'C', content: '$x = \\pm\\frac{\\pi}{3} + k\\pi$ ($k \\in \\mathbb{Z}$)' },
      { key: 'D', content: '$x = \\frac{\\pi}{6} + k\\pi$ ($k \\in \\mathbb{Z}$)' },
    ],
    correctAnswer: 'A',
    explanation: 'Ta có $\\tan x = \\sqrt{3} = \\tan\\frac{\\pi}{3} \\Leftrightarrow x = \\frac{\\pi}{3} + k\\pi$ ($k \\in \\mathbb{Z}$).',
    pedagogicalTip: 'Phương trình $\\tan x = m$ luôn có duy nhất một họ nghiệm theo chu kì $k\\pi$.',
  },
  {
    topic: 'Bài 4. Phương trình lượng giác cơ bản',
    prompt: 'Nghiệm của phương trình $\\cot x = -1$ là:',
    options: [
      { key: 'A', content: '$x = -\\frac{\\pi}{4} + k\\pi$ ($k \\in \\mathbb{Z}$)' },
      { key: 'B', content: '$x = -\\frac{\\pi}{4} + k2\\pi$ ($k \\in \\mathbb{Z}$)' },
      { key: 'C', content: '$x = \\pm\\frac{\\pi}{4} + k\\pi$ ($k \\in \\mathbb{Z}$)' },
      { key: 'D', content: '$x = \\frac{\\pi}{4} + k\\pi$ ($k \\in \\mathbb{Z}$)' },
    ],
    correctAnswer: 'A',
    explanation: 'Ta có $\\cot x = -1 = \\cot\\left(-\\frac{\\pi}{4}\\right) \\Leftrightarrow x = -\\frac{\\pi}{4} + k\\pi$ ($k \\in \\mathbb{Z}$).',
    pedagogicalTip: 'Họ nghiệm của $\\cot x = \\cot\\alpha$ là $x = \\alpha + k\\pi$.',
  },
  {
    topic: 'Bài 4. Phương trình lượng giác cơ bản',
    prompt: 'Nghiệm của phương trình đặc biệt $\\sin x = -1$ là:',
    options: [
      { key: 'A', content: '$x = -\\frac{\\pi}{2} + k2\\pi$ ($k \\in \\mathbb{Z}$)' },
      { key: 'B', content: '$x = -\\frac{\\pi}{2} + k\\pi$ ($k \\in \\mathbb{Z}$)' },
      { key: 'C', content: '$x = \\pi + k2\\pi$ ($k \\in \\mathbb{Z}$)' },
      { key: 'D', content: '$x = \\frac{\\pi}{2} + k2\\pi$ ($k \\in \\mathbb{Z}$)' },
    ],
    correctAnswer: 'A',
    explanation: 'Trên đường tròn lượng giác, $\\sin x = -1$ có duy nhất điểm cuối ở góc $-\\frac{\\pi}{2}$, nên $x = -\\frac{\\pi}{2} + k2\\pi$ ($k \\in \\mathbb{Z}$).',
    pedagogicalTip: 'Các trường hợp đặc biệt $\\sin x = \\pm 1, \\cos x = \\pm 1$ chỉ có $1$ điểm biểu diễn nên đuôi là $+k2\\pi$.',
  },
  {
    topic: 'Bài 4. Phương trình lượng giác cơ bản',
    prompt: 'Nghiệm của phương trình đặc biệt $\\cos x = 0$ là:',
    options: [
      { key: 'A', content: '$x = \\frac{\\pi}{2} + k\\pi$ ($k \\in \\mathbb{Z}$)' },
      { key: 'B', content: '$x = \\frac{\\pi}{2} + k2\\pi$ ($k \\in \\mathbb{Z}$)' },
      { key: 'C', content: '$x = k\\pi$ ($k \\in \\mathbb{Z}$)' },
      { key: 'D', content: '$x = k2\\pi$ ($k \\in \\mathbb{Z}$)' },
    ],
    correctAnswer: 'A',
    explanation: 'Ta có $\\cos x = 0 \\Leftrightarrow x = \\frac{\\pi}{2} + k\\pi$ ($k \\in \\mathbb{Z}$).',
    pedagogicalTip: '$\\cos x = 0$ có $2$ điểm đối tâm trên trục tung nên đuôi là $+k\\pi$.',
  },
  {
    topic: 'Bài 4. Phương trình lượng giác cơ bản',
    prompt: 'Trong các phương trình sau, phương trình nào **vô nghiệm**?',
    options: [
      { key: 'A', content: '$\\cos x = \\frac{\\pi}{3}$' },
      { key: 'B', content: '$\\tan x = 2025$' },
      { key: 'C', content: '$\\sin x = -\\frac{\\sqrt{3}}{2}$' },
      { key: 'D', content: '$\\cot x = -5$' },
    ],
    correctAnswer: 'A',
    explanation: 'Vì $\\pi \\approx 3,14 > 3 \\Rightarrow \\frac{\\pi}{3} > 1$, mà $|\\cos x| \\le 1$ nên phương trình $\\cos x = \\frac{\\pi}{3}$ vô nghiệm.',
    pedagogicalTip: 'Lưu ý $\\frac{\\pi}{3}$ ở vế phải là một con số lớn hơn $1$, không phải góc!',
  },
  {
    topic: 'Bài 4. Phương trình lượng giác cơ bản',
    prompt: 'Tập nghiệm của phương trình $\\sin 2x = 0$ là:',
    options: [
      { key: 'A', content: '$S = \\left\\{k\\frac{\\pi}{2} \\mid k \\in \\mathbb{Z}\\right\\}$' },
      { key: 'B', content: '$S = \\{k\\pi \\mid k \\in \\mathbb{Z}\\}$' },
      { key: 'C', content: '$S = \\{k2\\pi \\mid k \\in \\mathbb{Z}\\}$' },
      { key: 'D', content: '$S = \\left\\{\\frac{\\pi}{4} + k\\pi \\mid k \\in \\mathbb{Z}\\right\\}$' },
    ],
    correctAnswer: 'A',
    explanation: 'Ta có $\\sin 2x = 0 \\Leftrightarrow 2x = k\\pi \\Leftrightarrow x = k\\frac{\\pi}{2}$ ($k \\in \\mathbb{Z}$).',
    pedagogicalTip: 'Giải $2x = k\\pi$ rồi chia cả hai vế cho $2$.',
  },
  {
    topic: 'Bài 4. Phương trình lượng giác cơ bản',
    prompt: 'Nghiệm của phương trình $\\cos(x - 30^\\circ) = \\frac{1}{2}$ là:',
    options: [
      { key: 'A', content: '$x = 90^\\circ + k360^\\circ$ hoặc $x = -30^\\circ + k360^\\circ$ ($k \\in \\mathbb{Z}$)' },
      { key: 'B', content: '$x = \\pm 60^\\circ + k360^\\circ$ ($k \\in \\mathbb{Z}$)' },
      { key: 'C', content: '$x = 90^\\circ + k180^\\circ$ ($k \\in \\mathbb{Z}$)' },
      { key: 'D', content: '$x = 30^\\circ + k360^\\circ$ ($k \\in \\mathbb{Z}$)' },
    ],
    correctAnswer: 'A',
    explanation: 'Ta có $\\cos(x - 30^\\circ) = \\cos 60^\\circ \\Leftrightarrow x - 30^\\circ = \\pm 60^\\circ + k360^\\circ \\Leftrightarrow x = 90^\\circ + k360^\\circ$ hoặc $x = -30^\\circ + k360^\\circ$ ($k \\in \\mathbb{Z}$).',
    pedagogicalTip: 'Không được viết lẫn lộn độ ($30^\\circ$) và rađian ($2\\pi$) trong cùng một công thức nghiệm.',
  },
  {
    topic: 'Bài 4. Phương trình lượng giác cơ bản',
    prompt: 'Phương trình $\\tan\\left(2x - \\frac{\\pi}{6}\\right) = 0$ có các nghiệm là:',
    options: [
      { key: 'A', content: '$x = \\frac{\\pi}{12} + k\\frac{\\pi}{2}$ ($k \\in \\mathbb{Z}$)' },
      { key: 'B', content: '$x = \\frac{\\pi}{12} + k\\pi$ ($k \\in \\mathbb{Z}$)' },
      { key: 'C', content: '$x = \\frac{\\pi}{6} + k\\frac{\\pi}{2}$ ($k \\in \\mathbb{Z}$)' },
      { key: 'D', content: '$x = k\\frac{\\pi}{2}$ ($k \\in \\mathbb{Z}$)' },
    ],
    correctAnswer: 'A',
    explanation: 'Ta có $\\tan\\left(2x - \\frac{\\pi}{6}\\right) = 0 \\Leftrightarrow 2x - \\frac{\\pi}{6} = k\\pi \\Leftrightarrow x = \\frac{\\pi}{12} + k\\frac{\\pi}{2}$ ($k \\in \\mathbb{Z}$).',
    pedagogicalTip: '$\\tan u = 0 \\Leftrightarrow u = k\\pi$.',
  },
  {
    topic: 'Bài 4. Phương trình lượng giác cơ bản',
    prompt: 'Số nghiệm của phương trình $\\cos x = -\\frac{1}{2}$ thuộc khoảng $(0; 2\\pi)$ là:',
    options: [
      { key: 'A', content: '$2$' },
      { key: 'B', content: '$1$' },
      { key: 'C', content: '$3$' },
      { key: 'D', content: '$4$' },
    ],
    correctAnswer: 'A',
    explanation: 'Trong khoảng $(0; 2\\pi)$, phương trình $\\cos x = -\\frac{1}{2}$ có đúng $2$ nghiệm là $x = \\frac{2\\pi}{3}$ và $x = \\frac{4\\pi}{3}$.',
    pedagogicalTip: 'Quan sát giao điểm của đường thẳng $y = -\\frac{1}{2}$ với đường tròn lượng giác trong một vòng quay.',
  },
];

const bai4De1P2: Omit<TrueFalseQuestion, 'id' | 'part' | 'number'>[] = [
  {
    topic: 'Bài 4. Phương trình lượng giác cơ bản',
    prompt: 'Cho phương trình lượng giác $2\\sin\\left(x - \\frac{\\pi}{4}\\right) - \\sqrt{2} = 0$. Xét tính đúng sai của các mệnh đề sau:',
    statements: [
      {
        id: 'a',
        label: 'a',
        statement: 'Phương trình đã cho tương đương với phương trình $\\sin\\left(x - \\frac{\\pi}{4}\\right) = \\sin\\frac{\\pi}{4}$.',
        isCorrect: true,
        explanation: 'Chuyển vế chia $2$: $\\sin\\left(x - \\frac{\\pi}{4}\\right) = \\frac{\\sqrt{2}}{2} = \\sin\\frac{\\pi}{4}$.',
      },
      {
        id: 'b',
        label: 'b',
        statement: 'Các họ nghiệm của phương trình là $x = \\frac{\\pi}{2} + k2\\pi$ và $x = \\pi + k2\\pi$ ($k \\in \\mathbb{Z}$).',
        isCorrect: true,
        explanation: 'Ta có $x - \\frac{\\pi}{4} = \\frac{\\pi}{4} + k2\\pi \\Leftrightarrow x = \\frac{\\pi}{2} + k2\\pi$ hoặc $x - \\frac{\\pi}{4} = \\pi - \\frac{\\pi}{4} + k2\\pi \\Leftrightarrow x = \\pi + k2\\pi$.',
      },
      {
        id: 'c',
        label: 'c',
        statement: 'Nghiệm dương nhỏ nhất của phương trình đã cho là $x = \\frac{\\pi}{4}$.',
        isCorrect: false,
        explanation: 'Với $k = 0$, hai nghiệm dương là $\\frac{\\pi}{2}$ và $\\pi$, nên nghiệm dương nhỏ nhất là $\\frac{\\pi}{2} \\neq \\frac{\\pi}{4}$.',
      },
      {
        id: 'd',
        label: 'd',
        statement: 'Trên đoạn $[0; 2\\pi]$, phương trình đã cho có đúng $2$ nghiệm.',
        isCorrect: true,
        explanation: 'Trên đoạn $[0; 2\\pi]$, phương trình có $2$ nghiệm là $x = \\frac{\\pi}{2}$ và $x = \\pi$.',
      },
    ],
    pedagogicalTip: 'Thay $k = 0, \\pm 1$ để đối chiếu các nghiệm thuộc đoạn $[0; 2\\pi]$.',
  },
  {
    topic: 'Bài 4. Phương trình lượng giác cơ bản',
    prompt: 'Cho phương trình $\\cos 3x = \\cos x$. Xét tính đúng sai của các mệnh đề sau:',
    statements: [
      {
        id: 'a',
        label: 'a',
        statement: 'Phương trình $\\cos 3x = \\cos x \\Leftrightarrow 3x = x + k2\\pi$ hoặc $3x = -x + k2\\pi$ ($k \\in \\mathbb{Z}$).',
        isCorrect: true,
        explanation: 'Áp dụng công thức $\\cos u = \\cos v \\Leftrightarrow u = \\pm v + k2\\pi$.',
      },
      {
        id: 'b',
        label: 'b',
        statement: 'Họ nghiệm $3x = -x + k2\\pi$ tương đương với $x = k\\frac{\\pi}{2}$ ($k \\in \\mathbb{Z}$).',
        isCorrect: true,
        explanation: 'Ta có $4x = k2\\pi \\Leftrightarrow x = k\\frac{\\pi}{2}$.',
      },
      {
        id: 'c',
        label: 'c',
        statement: 'Họ nghiệm $x = k\\pi$ không nằm trong họ nghiệm $x = k\\frac{\\pi}{2}$.',
        isCorrect: false,
        explanation: 'Với $k = 2m$ chẵn thì $k\\frac{\\pi}{2} = m\\pi$, nên họ $x = k\\frac{\\pi}{2}$ đã bao hàm toàn bộ họ $x = m\\pi$.',
      },
      {
        id: 'd',
        label: 'd',
        statement: 'Trên đoạn $[0; \\pi]$, phương trình $\\cos 3x = \\cos x$ có tất cả $3$ nghiệm.',
        isCorrect: true,
        explanation: 'Cho $0 \\le k\\frac{\\pi}{2} \\le \\pi \\Leftrightarrow k \\in \\{0; 1; 2\\}$, có $3$ nghiệm là $0; \\frac{\\pi}{2}; \\pi$.',
      },
    ],
    pedagogicalTip: 'Khi một họ nghiệm là ước của họ nghiệm kia, ta gộp lại thành một họ nghiệm duy nhất.',
  },
];

const bai4De1P3: Omit<ShortAnswerQuestion, 'id' | 'part' | 'number' | 'points'>[] = [
  {
    topic: 'Bài 4. Phương trình lượng giác cơ bản',
    prompt: 'Tìm số nghiệm của phương trình $\\sin x = \\frac{1}{3}$ trên đoạn $[0; 3\\pi]$.',
    acceptableAnswers: ['4', '4.0'],
    explanation: 'Trên $[0; 2\\pi]$ phương trình $\\sin x = \\frac{1}{3} \\in (0; 1)$ có $2$ nghiệm thuộc $(0; \\pi)$, và trên $[2\\pi; 3\\pi]$ lại có thêm $2$ nghiệm nữa. Tổng cộng có $4$ nghiệm.',
    pedagogicalTip: 'Trên mỗi nửa vòng tròn phía trên $(k2\\pi; \\pi + k2\\pi)$, đường thẳng $y = \\frac{1}{3}$ cắt đường tròn tại $2$ điểm.',
  },
  {
    topic: 'Bài 4. Phương trình lượng giác cơ bản',
    prompt: 'Có bao nhiêu giá trị nguyên của tham số $m$ để phương trình $\\cos 2x = m - 3$ có nghiệm thực?',
    acceptableAnswers: ['3', '3.0'],
    explanation: 'Điều kiện có nghiệm: $-1 \\le m - 3 \\le 1 \\Leftrightarrow 2 \\le m \\le 4$. Vì $m \\in \\mathbb{Z}$ nên $m \\in \\{2; 3; 4\\}$, có $3$ giá trị nguyên.',
    pedagogicalTip: 'Giải bất phương trình $-1 \\le m - 3 \\le 1$.',
  },
  {
    topic: 'Bài 4. Phương trình lượng giác cơ bản',
    prompt: 'Tìm nghiệm dương nhỏ nhất (đơn vị: độ) của phương trình $\\tan(2x - 15^\\circ) = 1$.',
    acceptableAnswers: ['30', '30.0'],
    explanation: 'Ta có $2x - 15^\\circ = 45^\\circ + k180^\\circ \\Leftrightarrow x = 30^\\circ + k90^\\circ$ ($k \\in \\mathbb{Z}$). Nghiệm dương nhỏ nhất ứng với $k = 0$ là $x = 30^\\circ$.',
    pedagogicalTip: 'Cho $k = 0$ để tìm nghiệm dương nhỏ nhất.',
  },
  {
    topic: 'Bài 4. Phương trình lượng giác cơ bản',
    prompt: 'Hỏi trên đoạn $[0; 2\\pi]$, phương trình $\\sin 2x = -1$ có bao nhiêu nghiệm?',
    acceptableAnswers: ['2', '2.0'],
    explanation: 'Ta có $\\sin 2x = -1 \\Leftrightarrow 2x = -\\frac{\\pi}{2} + k2\\pi \\Leftrightarrow x = -\\frac{\\pi}{4} + k\\pi$. Cho $0 \\le -\\frac{\\pi}{4} + k\\pi \\le 2\\pi \\Leftrightarrow 0,25 \\le k \\le 2,25 \\Rightarrow k \\in \\{1; 2\\}$, có $2$ nghiệm.',
    pedagogicalTip: 'Chặn $0 \\le x \\le 2\\pi$ để đếm số giá trị nguyên của $k$.',
  },
];

const bai4De1P4: Omit<StepOrderingQuestion, 'id' | 'part' | 'number' | 'points'>[] = [
  {
    topic: 'Bài 4. Phương trình lượng giác cơ bản',
    problemStatement: 'Giải phương trình $\\cos\\left(2x + \\frac{\\pi}{6}\\right) = -\\frac{1}{2}$. Hãy sắp xếp các bước giải theo đúng thứ tự logic.',
    conclusionTarget: 'Tìm được hai họ nghiệm $x = \\frac{\\pi}{4} + k\\pi$ và $x = -\\frac{5\\pi}{12} + k\\pi$ ($k \\in \\mathbb{Z}$).',
    steps: [
      {
        id: 's1',
        originalIndex: 1,
        roleDescription: 'Đưa -1/2 về cos(2pi/3)',
        content: 'Vì $-\\frac{1}{2} = \\cos\\frac{2\\pi}{3}$ nên phương trình viết lại thành $\\cos\\left(2x + \\frac{\\pi}{6}\\right) = \\cos\\frac{2\\pi}{3}$.',
      },
      {
        id: 's2',
        originalIndex: 2,
        roleDescription: 'Áp dụng công thức nghiệm cos u = cos alpha',
        content: 'Phương trình tương đương với $\\left[\\begin{matrix} 2x + \\frac{\\pi}{6} = \\frac{2\\pi}{3} + k2\\pi \\\\ 2x + \\frac{\\pi}{6} = -\\frac{2\\pi}{3} + k2\\pi \\end{matrix}\\right. (k \\in \\mathbb{Z})$.',
      },
      {
        id: 's3',
        originalIndex: 3,
        roleDescription: 'Chuyển vế và thu gọn 2x',
        content: 'Chuyển $-\\frac{\\pi}{6}$ sang vế phải, ta được $\\left[\\begin{matrix} 2x = \\frac{\\pi}{2} + k2\\pi \\\\ 2x = -\\frac{5\\pi}{6} + k2\\pi \\end{matrix}\\right. (k \\in \\mathbb{Z})$.',
      },
      {
        id: 's4',
        originalIndex: 4,
        roleDescription: 'Chia cả hai vế cho 2 và kết luận nghiệm',
        content: 'Chia hai vế cho $2$, ta được nghiệm của phương trình là $x = \\frac{\\pi}{4} + k\\pi$ hoặc $x = -\\frac{5\\pi}{12} + k\\pi$ ($k \\in \\mathbb{Z}$).',
      },
    ],
    pedagogicalTip: 'Khi chia hai vế cho $2$, nhớ chia cả số hạng $k2\\pi$ thành $k\\pi$.',
    teacherAnalysis: 'Quy trình 4 bước giải phương trình $\\cos(ax + b) = m$.',
  },
  {
    topic: 'Bài 4. Phương trình lượng giác cơ bản',
    problemStatement: 'Giải phương trình $\\sin 3x + \\cos 2x = 0$. Hãy sắp xếp các bước giải theo đúng thứ tự logic.',
    conclusionTarget: 'Tìm được $x = -\\frac{\\pi}{2} + k2\\pi$ và $x = \\frac{\\pi}{10} + k\\frac{2\\pi}{5}$ ($k \\in \\mathbb{Z}$).',
    steps: [
      {
        id: 's1',
        originalIndex: 1,
        roleDescription: 'Chuyển vế và đưa về phương trình sin u = sin v',
        content: 'Ta có $\\sin 3x + \\cos 2x = 0 \\Leftrightarrow \\sin 3x = -\\cos 2x = \\sin\\left(2x - \\frac{\\pi}{2}\\right)$.',
      },
      {
        id: 's2',
        originalIndex: 2,
        roleDescription: 'Áp dụng công thức nghiệm của phương trình sin u = sin v',
        content: 'Khi đó $\\left[\\begin{matrix} 3x = 2x - \\frac{\\pi}{2} + k2\\pi \\\\ 3x = \\pi - \\left(2x - \\frac{\\pi}{2}\\right) + k2\\pi \\end{matrix}\\right. (k \\in \\mathbb{Z})$.',
      },
      {
        id: 's3',
        originalIndex: 3,
        roleDescription: 'Thu gọn ẩn x ở từng phương trình nhánh',
        content: 'Chuyển vế thu gọn ta được $\\left[\\begin{matrix} x = -\\frac{\\pi}{2} + k2\\pi \\\\ 5x = \\frac{3\\pi}{2} + k2\\pi \\end{matrix}\\right. (k \\in \\mathbb{Z})$.',
      },
      {
        id: 's4',
        originalIndex: 4,
        roleDescription: 'Chia hệ số và kết luận hai họ nghiệm',
        content: 'Vậy phương trình có hai họ nghiệm là $x = -\\frac{\\pi}{2} + k2\\pi$ và $x = \\frac{3\\pi}{10} + k\\frac{2\\pi}{5}$ ($k \\in \\mathbb{Z}$).',
      },
    ],
    pedagogicalTip: 'Sử dụng công thức phụ chéo $-\\cos 2x = \\sin\\left(2x - \\frac{\\pi}{2}\\right)$ để đưa về $\\sin u = \\sin v$.',
    teacherAnalysis: 'Rèn kỹ năng chuyển đổi giữa $\\sin$ và $\\cos$ khi giải phương trình.',
  },
  {
    topic: 'Bài 4. Phương trình lượng giác cơ bản',
    problemStatement: 'Tìm các nghiệm thuộc khoảng $(0; \\pi)$ của phương trình $\\tan\\left(2x - \\frac{\\pi}{3}\\right) = -\\sqrt{3}$. Hãy sắp xếp các bước giải theo đúng thứ tự logic.',
    conclusionTarget: 'Tìm được hai nghiệm $x = \\frac{\\pi}{2}$ và $x = 0$ (loại $0$), chỉ nhận $x = \\frac{\\pi}{2}$.',
    steps: [
      {
        id: 's1',
        originalIndex: 1,
        roleDescription: 'Giải họ nghiệm tổng quát của phương trình tang',
        content: 'Ta có $\\tan\\left(2x - \\frac{\\pi}{3}\\right) = \\tan\\left(-\\frac{\\pi}{3}\\right) \\Leftrightarrow 2x - \\frac{\\pi}{3} = -\\frac{\\pi}{3} + k\\pi$ ($k \\in \\mathbb{Z}$).',
      },
      {
        id: 's2',
        originalIndex: 2,
        roleDescription: 'Rút gọn công thức nghiệm x theo k',
        content: 'Rút gọn $-\\frac{\\pi}{3}$ ở hai vế và chia cho $2$, ta được $x = k\\frac{\\pi}{2}$ ($k \\in \\mathbb{Z}$).',
      },
      {
        id: 's3',
        originalIndex: 3,
        roleDescription: 'Thiết lập bất phương trình chặn nghiệm trên khoảng (0; pi)',
        content: 'Do $x \\in (0; \\pi)$ nên $0 < k\\frac{\\pi}{2} < \\pi \\Leftrightarrow 0 < k < 2$.',
      },
      {
        id: 's4',
        originalIndex: 4,
        roleDescription: 'Chọn giá trị nguyên của k và kết luận nghiệm',
        content: 'Vì $k \\in \\mathbb{Z}$ nên $k = 1$, suy ra nghiệm duy nhất thuộc $(0; \\pi)$ là $x = \\frac{\\pi}{2}$.',
      },
    ],
    pedagogicalTip: 'Chú ý khoảng mở $(0; \\pi)$ không lấy hai đầu mút $0$ và $\\pi$.',
    teacherAnalysis: 'Bài toán tìm nghiệm phương trình lượng giác trên một khoảng cho trước.',
  },
  {
    topic: 'Bài 4. Phương trình lượng giác cơ bản',
    problemStatement: 'Giải phương trình $\\sin x + \\sqrt{3}\\cos x = \\sqrt{2}$. Hãy sắp xếp các bước giải theo đúng thứ tự logic.',
    conclusionTarget: 'Tìm được $x = -\\frac{\\pi}{12} + k2\\pi$ và $x = \\frac{5\\pi}{12} + k2\\pi$ ($k \\in \\mathbb{Z}$).',
    steps: [
      {
        id: 's1',
        originalIndex: 1,
        roleDescription: 'Chia cả hai vế của phương trình cho 2',
        content: 'Chia cả hai vế cho $2$, ta được $\\frac{1}{2}\\sin x + \\frac{\\sqrt{3}}{2}\\cos x = \\frac{\\sqrt{2}}{2}$.',
      },
      {
        id: 's2',
        originalIndex: 2,
        roleDescription: 'Áp dụng công thức cộng đưa vế trái về một hàm sin',
        content: 'Thay $\\frac{1}{2} = \\cos\\frac{\\pi}{3}, \\frac{\\sqrt{3}}{2} = \\sin\\frac{\\pi}{3}$, phương trình trở thành $\\sin\\left(x + \\frac{\\pi}{3}\\right) = \\sin\\frac{\\pi}{4}$.',
      },
      {
        id: 's3',
        originalIndex: 3,
        roleDescription: 'Áp dụng công thức nghiệm cơ bản của hàm sin',
        content: 'Ta có $\\left[\\begin{matrix} x + \\frac{\\pi}{3} = \\frac{\\pi}{4} + k2\\pi \\\\ x + \\frac{\\pi}{3} = \\pi - \\frac{\\pi}{4} + k2\\pi \\end{matrix}\\right. (k \\in \\mathbb{Z})$.',
      },
      {
        id: 's4',
        originalIndex: 4,
        roleDescription: 'Rút gọn và kết luận nghiệm',
        content: 'Chuyển vế thu gọn, ta được hai họ nghiệm $x = -\\frac{\\pi}{12} + k2\\pi$ và $x = \\frac{5\\pi}{12} + k2\\pi$ ($k \\in \\mathbb{Z}$).',
      },
    ],
    pedagogicalTip: 'Chia hai vế cho $\\sqrt{1^2 + (\\sqrt{3})^2} = 2$ để đưa về công thức cộng.',
    teacherAnalysis: 'Kết hợp công thức cộng ở Bài 2 với phương trình lượng giác cơ bản ở Bài 4.',
  },
];

const bai4De2P1: Omit<MultipleChoiceQuestion, 'id' | 'part' | 'number' | 'points'>[] = [
  {
    topic: 'Bài 4. Phương trình lượng giác cơ bản',
    prompt: 'Nghiệm của phương trình $\\sin x = -\\frac{1}{2}$ là:',
    options: [
      { key: 'A', content: '$x = -\\frac{\\pi}{6} + k2\\pi$ hoặc $x = \\frac{7\\pi}{6} + k2\\pi$ ($k \\in \\mathbb{Z}$)' },
      { key: 'B', content: '$x = \\pm\\frac{\\pi}{6} + k2\\pi$ ($k \\in \\mathbb{Z}$)' },
      { key: 'C', content: '$x = -\\frac{\\pi}{3} + k2\\pi$ hoặc $x = \\frac{4\\pi}{3} + k2\\pi$ ($k \\in \\mathbb{Z}$)' },
      { key: 'D', content: '$x = -\\frac{\\pi}{6} + k\\pi$ ($k \\in \\mathbb{Z}$)' },
    ],
    correctAnswer: 'A',
    explanation: 'Ta có $\\sin x = -\\frac{1}{2} = \\sin\\left(-\\frac{\\pi}{6}\\right) \\Leftrightarrow x = -\\frac{\\pi}{6} + k2\\pi$ hoặc $x = \\pi - \\left(-\\frac{\\pi}{6}\\right) + k2\\pi = \\frac{7\\pi}{6} + k2\\pi$.',
    pedagogicalTip: 'Chú ý $\\pi - \\left(-\\frac{\\pi}{6}\\right) = \\frac{7\\pi}{6}$.',
  },
  {
    topic: 'Bài 4. Phương trình lượng giác cơ bản',
    prompt: 'Nghiệm của phương trình $\\cos x = -1$ là:',
    options: [
      { key: 'A', content: '$x = \\pi + k2\\pi$ ($k \\in \\mathbb{Z}$)' },
      { key: 'B', content: '$x = \\pi + k\\pi$ ($k \\in \\mathbb{Z}$)' },
      { key: 'C', content: '$x = k2\\pi$ ($k \\in \\mathbb{Z}$)' },
      { key: 'D', content: '$x = -\\frac{\\pi}{2} + k2\\pi$ ($k \\in \\mathbb{Z}$)' },
    ],
    correctAnswer: 'A',
    explanation: 'Trên đường tròn lượng giác, $\\cos x = -1$ tại điểm $A\'(-1; 0)$ ứng với góc $\\pi + k2\\pi$ ($k \\in \\mathbb{Z}$).',
    pedagogicalTip: '$\\cos x = -1 \\Leftrightarrow x = \\pi + k2\\pi$.',
  },
  {
    topic: 'Bài 4. Phương trình lượng giác cơ bản',
    prompt: 'Nghiệm của phương trình $\\tan x = -\\frac{\\sqrt{3}}{3}$ là:',
    options: [
      { key: 'A', content: '$x = -\\frac{\\pi}{6} + k\\pi$ ($k \\in \\mathbb{Z}$)' },
      { key: 'B', content: '$x = -\\frac{\\pi}{3} + k\\pi$ ($k \\in \\mathbb{Z}$)' },
      { key: 'C', content: '$x = -\\frac{\\pi}{6} + k2\\pi$ ($k \\in \\mathbb{Z}$)' },
      { key: 'D', content: '$x = \\pm\\frac{\\pi}{6} + k\\pi$ ($k \\in \\mathbb{Z}$)' },
    ],
    correctAnswer: 'A',
    explanation: 'Ta có $\\tan x = -\\frac{\\sqrt{3}}{3} = \\tan\\left(-\\frac{\\pi}{6}\\right) \\Leftrightarrow x = -\\frac{\\pi}{6} + k\\pi$ ($k \\in \\mathbb{Z}$).',
    pedagogicalTip: 'Nhớ $\\tan\\frac{\\pi}{6} = \\frac{\\sqrt{3}}{3}$.',
  },
  {
    topic: 'Bài 4. Phương trình lượng giác cơ bản',
    prompt: 'Nghiệm của phương trình $\\cot x = \\sqrt{3}$ là:',
    options: [
      { key: 'A', content: '$x = \\frac{\\pi}{6} + k\\pi$ ($k \\in \\mathbb{Z}$)' },
      { key: 'B', content: '$x = \\frac{\\pi}{3} + k\\pi$ ($k \\in \\mathbb{Z}$)' },
      { key: 'C', content: '$x = \\frac{\\pi}{6} + k2\\pi$ ($k \\in \\mathbb{Z}$)' },
      { key: 'D', content: '$x = \\pm\\frac{\\pi}{6} + k\\pi$ ($k \\in \\mathbb{Z}$)' },
    ],
    correctAnswer: 'A',
    explanation: 'Ta có $\\cot x = \\sqrt{3} = \\cot\\frac{\\pi}{6} \\Leftrightarrow x = \\frac{\\pi}{6} + k\\pi$ ($k \\in \\mathbb{Z}$).',
    pedagogicalTip: 'Nhớ $\\cot\\frac{\\pi}{6} = \\sqrt{3}$.',
  },
  {
    topic: 'Bài 4. Phương trình lượng giác cơ bản',
    prompt: 'Phương trình $\\sin x = 1$ có nghiệm là:',
    options: [
      { key: 'A', content: '$x = \\frac{\\pi}{2} + k2\\pi$ ($k \\in \\mathbb{Z}$)' },
      { key: 'B', content: '$x = \\frac{\\pi}{2} + k\\pi$ ($k \\in \\mathbb{Z}$)' },
      { key: 'C', content: '$x = k2\\pi$ ($k \\in \\mathbb{Z}$)' },
      { key: 'D', content: '$x = \\pi + k2\\pi$ ($k \\in \\mathbb{Z}$)' },
    ],
    correctAnswer: 'A',
    explanation: 'Ta có $\\sin x = 1 \\Leftrightarrow x = \\frac{\\pi}{2} + k2\\pi$ ($k \\in \\mathbb{Z}$).',
    pedagogicalTip: 'Điểm cao nhất trên đường tròn lượng giác ứng với $\\frac{\\pi}{2} + k2\\pi$.',
  },
  {
    topic: 'Bài 4. Phương trình lượng giác cơ bản',
    prompt: 'Trong các phương trình sau, phương trình nào **có nghiệm**?',
    options: [
      { key: 'A', content: '$\\sin x = \\frac{\\sqrt{3}}{2}$' },
      { key: 'B', content: '$\\cos x = \\sqrt{2}$' },
      { key: 'C', content: '$\\sin x = -\\frac{5}{4}$' },
      { key: 'D', content: '$2\\cos x = 3$' },
    ],
    correctAnswer: 'A',
    explanation: 'Vì $\\left|\\frac{\\sqrt{3}}{2}\\right| \\approx 0,866 \\le 1$ nên phương trình $\\sin x = \\frac{\\sqrt{3}}{2}$ có nghiệm; các phương trình còn lại đều có $|m| > 1$ nên vô nghiệm.',
    pedagogicalTip: 'Kiểm tra điều kiện $|m| \\le 1$.',
  },
  {
    topic: 'Bài 4. Phương trình lượng giác cơ bản',
    prompt: 'Tập nghiệm của phương trình $\\cos 2x = 1$ là:',
    options: [
      { key: 'A', content: '$S = \\{k\\pi \\mid k \\in \\mathbb{Z}\\}$' },
      { key: 'B', content: '$S = \\{k2\\pi \\mid k \\in \\mathbb{Z}\\}$' },
      { key: 'C', content: '$S = \\left\\{k\\frac{\\pi}{2} \\mid k \\in \\mathbb{Z}\\right\\}$' },
      { key: 'D', content: '$S = \\left\\{\\frac{\\pi}{2} + k\\pi \\mid k \\in \\mathbb{Z}\\right\\}$' },
    ],
    correctAnswer: 'A',
    explanation: 'Ta có $\\cos 2x = 1 \\Leftrightarrow 2x = k2\\pi \\Leftrightarrow x = k\\pi$ ($k \\in \\mathbb{Z}$).',
    pedagogicalTip: 'Chia $k2\\pi$ cho $2$ được $k\\pi$.',
  },
  {
    topic: 'Bài 4. Phương trình lượng giác cơ bản',
    prompt: 'Nghiệm của phương trình $\\sin(x + 45^\\circ) = \\frac{\\sqrt{2}}{2}$ là:',
    options: [
      { key: 'A', content: '$x = k360^\\circ$ hoặc $x = 90^\\circ + k360^\\circ$ ($k \\in \\mathbb{Z}$)' },
      { key: 'B', content: '$x = 45^\\circ + k360^\\circ$ hoặc $x = 135^\\circ + k360^\\circ$ ($k \\in \\mathbb{Z}$)' },
      { key: 'C', content: '$x = \\pm 45^\\circ + k360^\\circ$ ($k \\in \\mathbb{Z}$)' },
      { key: 'D', content: '$x = k180^\\circ$ ($k \\in \\mathbb{Z}$)' },
    ],
    correctAnswer: 'A',
    explanation: 'Ta có $x + 45^\\circ = 45^\\circ + k360^\\circ \\Rightarrow x = k360^\\circ$ hoặc $x + 45^\\circ = 135^\\circ + k360^\\circ \\Rightarrow x = 90^\\circ + k360^\\circ$.',
    pedagogicalTip: 'Sử dụng $\\frac{\\sqrt{2}}{2} = \\sin 45^\\circ$.',
  },
  {
    topic: 'Bài 4. Phương trình lượng giác cơ bản',
    prompt: 'Nghiệm của phương trình $\\cot 3x = 0$ là:',
    options: [
      { key: 'A', content: '$x = \\frac{\\pi}{6} + k\\frac{\\pi}{3}$ ($k \\in \\mathbb{Z}$)' },
      { key: 'B', content: '$x = \\frac{\\pi}{2} + k\\pi$ ($k \\in \\mathbb{Z}$)' },
      { key: 'C', content: '$x = k\\frac{\\pi}{3}$ ($k \\in \\mathbb{Z}$)' },
      { key: 'D', content: '$x = \\frac{\\pi}{6} + k\\pi$ ($k \\in \\mathbb{Z}$)' },
    ],
    correctAnswer: 'A',
    explanation: 'Ta có $\\cot 3x = 0 \\Leftrightarrow 3x = \\frac{\\pi}{2} + k\\pi \\Leftrightarrow x = \\frac{\\pi}{6} + k\\frac{\\pi}{3}$ ($k \\in \\mathbb{Z}$).',
    pedagogicalTip: '$\\cot u = 0 \\Leftrightarrow \\cos u = 0 \\Leftrightarrow u = \\frac{\\pi}{2} + k\\pi$.',
  },
  {
    topic: 'Bài 4. Phương trình lượng giác cơ bản',
    prompt: 'Số nghiệm của phương trình $\\sin x = \\frac{\\sqrt{2}}{2}$ trên đoạn $[0; \\pi]$ là:',
    options: [
      { key: 'A', content: '$2$' },
      { key: 'B', content: '$1$' },
      { key: 'C', content: '$3$' },
      { key: 'D', content: '$0$' },
    ],
    correctAnswer: 'A',
    explanation: 'Trên đoạn $[0; \\pi]$, phương trình có $2$ nghiệm là $x = \\frac{\\pi}{4}$ và $x = \\frac{3\\pi}{4}$.',
    pedagogicalTip: 'Cả hai góc bù nhau $\\frac{\\pi}{4}$ và $\\frac{3\\pi}{4}$ đều thuộc $[0; \\pi]$.',
  },
  {
    topic: 'Bài 4. Phương trình lượng giác cơ bản',
    prompt: 'Phương trình $\\cos^2 x = \\frac{1}{2}$ tương đương với phương trình nào sau đây?',
    options: [
      { key: 'A', content: '$\\cos 2x = 0$' },
      { key: 'B', content: '$\\cos 2x = 1$' },
      { key: 'C', content: '$\\cos 2x = -1$' },
      { key: 'D', content: '$\\sin 2x = 0$' },
    ],
    correctAnswer: 'A',
    explanation: 'Hạ bậc $\\cos^2 x = \\frac{1 + \\cos 2x}{2} = \\frac{1}{2} \\Leftrightarrow \\cos 2x = 0$.',
    pedagogicalTip: 'Dùng công thức hạ bậc giúp giảm số họ nghiệm phải viết.',
  },
  {
    topic: 'Bài 4. Phương trình lượng giác cơ bản',
    prompt: 'Họ nghiệm của phương trình $\\tan 2x = \\tan x$ là:',
    options: [
      { key: 'A', content: '$x = k\\pi$ ($k \\in \\mathbb{Z}$)' },
      { key: 'B', content: '$x = k\\frac{\\pi}{3}$ ($k \\in \\mathbb{Z}$)' },
      { key: 'C', content: '$x = k\\frac{\\pi}{2}$ ($k \\in \\mathbb{Z}$)' },
      { key: 'D', content: '$x = \\frac{\\pi}{4} + k\\pi$ ($k \\in \\mathbb{Z}$)' },
    ],
    correctAnswer: 'A',
    explanation: 'Điều kiện $\\cos 2x \\neq 0, \\cos x \\neq 0$. Khi đó $2x = x + k\\pi \\Leftrightarrow x = k\\pi$ (thỏa mãn cả hai điều kiện xác định vì $\\cos(k\\pi) = \\pm 1 \\neq 0$ và $\\cos(2k\\pi) = 1 \\neq 0$).',
    pedagogicalTip: 'Khi giải $\\tan u = \\tan v$, luôn kiểm tra điều kiện $\\cos u \\neq 0$.',
  },
];

const bai4De2P2: Omit<TrueFalseQuestion, 'id' | 'part' | 'number'>[] = [
  ...bai4De1P2,
];

const bai4De2P3: Omit<ShortAnswerQuestion, 'id' | 'part' | 'number' | 'points'>[] = [
  {
    topic: 'Bài 4. Phương trình lượng giác cơ bản',
    prompt: 'Tìm số nghiệm của phương trình $\\cos x = \\frac{2}{5}$ trên đoạn $[0; 2\\pi]$.',
    acceptableAnswers: ['2', '2.0'],
    explanation: 'Trên một chu kì $[0; 2\\pi]$, phương trình $\\cos x = m$ với $m \\in (-1; 1)$ có đúng $2$ nghiệm phân biệt.',
    pedagogicalTip: 'Đường thẳng $x = \\frac{2}{5}$ cắt đường tròn lượng giác tại $2$ điểm đối xứng qua trục hoành.',
  },
  {
    topic: 'Bài 4. Phương trình lượng giác cơ bản',
    prompt: 'Tìm nghiệm âm lớn nhất (đơn vị: độ) của phương trình $\\sin 2x = 1$.',
    acceptableAnswers: ['-135', '-135.0'],
    explanation: 'Ta có $2x = 90^\\circ + k360^\\circ \\Leftrightarrow x = 45^\\circ + k180^\\circ$. Với $k = -1 \\Rightarrow x = -135^\\circ$ là nghiệm âm lớn nhất.',
    pedagogicalTip: 'Thay $k = -1$ vào công thức $x = 45^\\circ + k180^\\circ$.',
  },
  {
    topic: 'Bài 4. Phương trình lượng giác cơ bản',
    prompt: 'Có bao nhiêu giá trị nguyên của tham số $m$ để phương trình $3\\sin x = 2m - 1$ có nghiệm?',
    acceptableAnswers: ['3', '3.0'],
    explanation: 'Điều kiện có nghiệm: $-3 \\le 2m - 1 \\le 3 \\Leftrightarrow -1 \\le m \\le 2$. Vì $m \\in \\mathbb{Z}$ nên $m \\in \\{-1; 0; 1; 2\\}$... Khoan: $-3 \\le 2m - 1 \\le 3 \\Leftrightarrow -2 \\le 2m \\le 4 \\Leftrightarrow -1 \\le m \\le 2$, có $4$ giá trị nguyên!',
    pedagogicalTip: 'Giải $-3 \\le 2m - 1 \\le 3 \\Leftrightarrow -1 \\le m \\le 2$.',
  },
  {
    topic: 'Bài 4. Phương trình lượng giác cơ bản',
    prompt: 'Trên khoảng $(0; \\pi)$, phương trình $\\tan x = \\cot x$ có bao nhiêu nghiệm?',
    acceptableAnswers: ['2', '2.0'],
    explanation: 'Ta có $\\tan x = \\cot x \\Leftrightarrow \\tan^2 x = 1 \\Leftrightarrow \\tan x = \\pm 1$. Trên khoảng $(0; \\pi)$ có $2$ nghiệm là $x = \\frac{\\pi}{4}$ và $x = \\frac{3\\pi}{4}$.',
    pedagogicalTip: 'Giải $\\tan x = 1$ và $\\tan x = -1$ trên $(0; \\pi)$.',
  },
];

// Fix acceptableAnswers for question 3 of bai4De2P3 to 4:
bai4De2P3[2] = {
  topic: 'Bài 4. Phương trình lượng giác cơ bản',
  prompt: 'Có bao nhiêu giá trị nguyên của tham số $m$ để phương trình $3\\sin x = 2m - 1$ có nghiệm thực?',
  acceptableAnswers: ['4', '4.0'],
  explanation: 'Phương trình tương đương $\\sin x = \\frac{2m - 1}{3}$. Điều kiện có nghiệm: $-1 \\le \\frac{2m - 1}{3} \\le 1 \\Leftrightarrow -3 \\le 2m - 1 \\le 3 \\Leftrightarrow -1 \\le m \\le 2$. Vì $m \\in \\mathbb{Z}$ nên $m \\in \\{-1; 0; 1; 2\\}$, có $4$ giá trị nguyên.',
  pedagogicalTip: 'Đếm số nguyên từ $-1$ đến $2$ gồm $-1, 0, 1, 2$ (4 giá trị).',
};

const bai4De2P4: Omit<StepOrderingQuestion, 'id' | 'part' | 'number' | 'points'>[] = [
  ...bai4De1P4,
];

// ============================================================================
// ÔN TẬP CHƯƠNG I. BÀI TẬP CUỐI CHƯƠNG I (2 Đề ôn tổng hợp Chương I)
// ============================================================================
const onTapC1De1P1 = [
  bai1De1P1[0],
  bai1De1P1[2],
  bai1De1P1[5],
  bai2De1P1[1],
  bai2De1P1[3],
  bai2De1P1[7],
  bai3De1P1[0],
  bai3De1P1[4],
  bai3De1P1[8],
  bai4De1P1[1],
  bai4De1P1[3],
  bai4De1P1[11],
];

const onTapC1De1P2 = [bai1De1P2[0], bai3De1P2[0]];
const onTapC1De1P3 = [bai1De1P3[3], bai2De1P3[1], bai3De1P3[0], bai4De1P3[0]];
const onTapC1De1P4 = [bai1De1P4[0], bai2De1P4[0], bai3De1P4[0], bai4De1P4[0]];

const onTapC1De2P1 = [
  bai1De2P1[0],
  bai1De2P1[2],
  bai1De2P1[6],
  bai2De2P1[0],
  bai2De2P1[4],
  bai2De2P1[8],
  bai3De2P1[1],
  bai3De2P1[3],
  bai3De2P1[5],
  bai4De2P1[0],
  bai4De2P1[6],
  bai4De2P1[9],
];

const onTapC1De2P2 = [bai2De1P2[0], bai4De1P2[0]];
const onTapC1De2P3 = [bai1De2P3[3], bai2De2P3[1], bai3De2P3[1], bai4De2P3[2]];
const onTapC1De2P4 = [bai1De1P4[2], bai2De1P4[3], bai3De1P4[1], bai4De1P4[3]];

export const chapter1LessonExams: Record<string, ExamSet[]> = {
  'bai-1': [
    buildLessonExamSet(
      'de-on-bai-1-so-1',
      'Đề ôn số 01 - Bài 1. Giá trị lượng giác của góc lượng giác',
      'Bài 1. Giá trị lượng giác của góc lượng giác',
      1,
      bai1De1P1,
      bai1De1P2,
      bai1De1P3,
      bai1De1P4
    ),
    buildLessonExamSet(
      'de-on-bai-1-so-2',
      'Đề ôn số 02 - Bài 1. Giá trị lượng giác của góc lượng giác',
      'Bài 1. Giá trị lượng giác của góc lượng giác',
      2,
      bai1De2P1,
      bai1De2P2,
      bai1De2P3,
      bai1De2P4
    ),
  ],
  'bai-2': [
    buildLessonExamSet(
      'de-on-bai-2-so-1',
      'Đề ôn số 01 - Bài 2. Công thức lượng giác',
      'Bài 2. Công thức lượng giác',
      1,
      bai2De1P1,
      bai2De1P2,
      bai2De1P3,
      bai2De1P4
    ),
    buildLessonExamSet(
      'de-on-bai-2-so-2',
      'Đề ôn số 02 - Bài 2. Công thức lượng giác',
      'Bài 2. Công thức lượng giác',
      2,
      bai2De2P1,
      bai2De2P2,
      bai2De2P3,
      bai2De2P4
    ),
  ],
  'bai-3': [
    buildLessonExamSet(
      'de-on-bai-3-so-1',
      'Đề ôn số 01 - Bài 3. Hàm số lượng giác',
      'Bài 3. Hàm số lượng giác',
      1,
      bai3De1P1,
      bai3De1P2,
      bai3De1P3,
      bai3De1P4
    ),
    buildLessonExamSet(
      'de-on-bai-3-so-2',
      'Đề ôn số 02 - Bài 3. Hàm số lượng giác',
      'Bài 3. Hàm số lượng giác',
      2,
      bai3De2P1,
      bai3De2P2,
      bai3De2P3,
      bai3De2P4
    ),
  ],
  'bai-4': [
    buildLessonExamSet(
      'de-on-bai-4-so-1',
      'Đề ôn số 01 - Bài 4. Phương trình lượng giác cơ bản',
      'Bài 4. Phương trình lượng giác cơ bản',
      1,
      bai4De1P1,
      bai4De1P2,
      bai4De1P3,
      bai4De1P4
    ),
    buildLessonExamSet(
      'de-on-bai-4-so-2',
      'Đề ôn số 02 - Bài 4. Phương trình lượng giác cơ bản',
      'Bài 4. Phương trình lượng giác cơ bản',
      2,
      bai4De2P1,
      bai4De2P2,
      bai4De2P3,
      bai4De2P4
    ),
  ],
  'on-tap-chuong-1': [
    buildLessonExamSet(
      'de-on-on-tap-chuong-1-so-1',
      'Đề ôn số 01 - Ôn tập chương I. Bài tập cuối chương I',
      'Ôn tập chương I. Bài tập cuối chương I',
      1,
      onTapC1De1P1,
      onTapC1De1P2,
      onTapC1De1P3,
      onTapC1De1P4
    ),
    buildLessonExamSet(
      'de-on-on-tap-chuong-1-so-2',
      'Đề ôn số 02 - Ôn tập chương I. Bài tập cuối chương I',
      'Ôn tập chương I. Bài tập cuối chương I',
      2,
      onTapC1De2P1,
      onTapC1De2P2,
      onTapC1De2P3,
      onTapC1De2P4
    ),
  ],
};
