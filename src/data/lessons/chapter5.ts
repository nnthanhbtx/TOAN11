import { ExamSet } from '../../types/exam';
import {
  CompactMC,
  CompactTF,
  CompactSA,
  CompactSO,
  buildCompactLessonExamSet
} from './chapter4';

// ============================================================================
// BÀI 15. GIỚI HẠN CỦA DÃY SỐ
// Trọng tâm: Giới hạn hữu hạn của dãy số, các định lí về giới hạn hữu hạn,
// tổng của cấp số nhân lùi vô hạn, giới hạn vô cực của dãy số.
// ============================================================================

const b15P1A: CompactMC[] = [
  {
    prompt: 'Với $k$ là số nguyên dương bất kì, khẳng định nào sau đây là đúng?',
    options: [
      { id: 'A', text: '$\\lim \\frac{1}{n^k} = +\\infty$' },
      { id: 'B', text: '$\\lim \\frac{1}{n^k} = 0$' },
      { id: 'C', text: '$\\lim \\frac{1}{n^k} = 1$' },
      { id: 'D', text: '$\\lim \\frac{1}{n^k} = -\\infty$' }
    ],
    correctOptionId: 'B',
    explanation: 'Theo giới hạn cơ bản của dãy số, với mọi số nguyên dương $k$, ta có $\\lim_{n \\to +\\infty} \\frac{1}{n^k} = 0$.'
  },
  {
    prompt: 'Với số thực $q$ thỏa mãn $|q| < 1$, giá trị của $\\lim q^n$ bằng:',
    options: [
      { id: 'A', text: '$1$' },
      { id: 'B', text: '$0$' },
      { id: 'C', text: '$+\\infty$' },
      { id: 'D', text: '$q$' }
    ],
    correctOptionId: 'B',
    explanation: 'Nếu $|q| < 1$ thì $\\lim_{n \\to +\\infty} q^n = 0$.'
  },
  {
    prompt: 'Tính giới hạn $L = \\lim \\frac{4n - 3}{2n + 1}$.',
    options: [
      { id: 'A', text: '$L = -3$' },
      { id: 'B', text: '$L = 2$' },
      { id: 'C', text: '$L = 4$' },
      { id: 'D', text: '$L = \\frac{1}{2}$' }
    ],
    correctOptionId: 'B',
    explanation: 'Chia cả tử và mẫu cho $n$: $L = \\lim \\frac{4 - \\frac{3}{n}}{2 + \\frac{1}{n}} = \\frac{4}{2} = 2$.'
  },
  {
    prompt: 'Tính giới hạn $L = \\lim \\frac{3n^2 + 5n - 2}{n^2 + 4}$.',
    options: [
      { id: 'A', text: '$L = 3$' },
      { id: 'B', text: '$L = 5$' },
      { id: 'C', text: '$L = \\frac{3}{4}$' },
      { id: 'D', text: '$L = 0$' }
    ],
    correctOptionId: 'A',
    explanation: 'Chia cả tử và mẫu cho $n^2$: $L = \\lim \\frac{3 + \\frac{5}{n} - \\frac{2}{n^2}}{1 + \\frac{4}{n^2}} = 3$.'
  },
  {
    prompt: 'Tính giới hạn $L = \\lim \\frac{5n + 7}{2n^2 + 3n + 1}$.',
    options: [
      { id: 'A', text: '$L = \\frac{5}{2}$' },
      { id: 'B', text: '$L = 0$' },
      { id: 'C', text: '$L = +\\infty$' },
      { id: 'D', text: '$L = 7$' }
    ],
    correctOptionId: 'B',
    explanation: 'Bậc của tử nhỏ hơn bậc của mẫu: chia cả tử và mẫu cho $n^2$ được $L = \\lim \\frac{\\frac{5}{n} + \\frac{7}{n^2}}{2 + \\frac{3}{n} + \\frac{1}{n^2}} = \\frac{0}{2} = 0$.'
  },
  {
    prompt: 'Tính giới hạn $L = \\lim \\frac{3^{n+1} - 2^n}{3^n + 4 \\cdot 2^n}$.',
    options: [
      { id: 'A', text: '$L = 1$' },
      { id: 'B', text: '$L = 3$' },
      { id: 'C', text: '$L = -\\frac{1}{4}$' },
      { id: 'D', text: '$L = 0$' }
    ],
    correctOptionId: 'B',
    explanation: 'Chia cả tử và mẫu cho $3^n$: $L = \\lim \\frac{3 - (2/3)^n}{1 + 4(2/3)^n} = \\frac{3 - 0}{1 + 0} = 3$.'
  },
  {
    prompt: 'Cho hai dãy số $(u_n), (v_n)$ thỏa mãn $\\lim u_n = 5$ và $\\lim v_n = -3$. Giá trị của $\\lim (2u_n - 3v_n)$ bằng:',
    options: [
      { id: 'A', text: '$1$' },
      { id: 'B', text: '$19$' },
      { id: 'C', text: '$-19$' },
      { id: 'D', text: '$16$' }
    ],
    correctOptionId: 'B',
    explanation: 'Theo định lí giới hạn hữu hạn: $\\lim (2u_n - 3v_n) = 2 \\cdot 5 - 3 \\cdot (-3) = 10 + 9 = 19$.'
  },
  {
    prompt: 'Cấp số nhân vô hạn $(u_n)$ có công bội $q$ được gọi là **cấp số nhân lùi vô hạn** khi và chỉ khi:',
    options: [
      { id: 'A', text: '$q < 1$' },
      { id: 'B', text: '$|q| < 1$' },
      { id: 'C', text: '$q > 1$' },
      { id: 'D', text: '$0 < q < 2$' }
    ],
    correctOptionId: 'B',
    explanation: 'Cấp số nhân vô hạn có công bội $q$ thỏa mãn $|q| < 1$ được gọi là cấp số nhân lùi vô hạn.'
  },
  {
    prompt: 'Tính tổng $S$ của cấp số nhân lùi vô hạn có số hạng đầu $u_1 = 6$ và công bội $q = \\frac{1}{3}$.',
    options: [
      { id: 'A', text: '$S = 8$' },
      { id: 'B', text: '$S = 9$' },
      { id: 'C', text: '$S = 12$' },
      { id: 'D', text: '$S = 18$' }
    ],
    correctOptionId: 'B',
    explanation: 'Áp dụng công thức $S = \\frac{u_1}{1 - q} = \\frac{6}{1 - \\frac{1}{3}} = \\frac{6}{\\frac{2}{3}} = 9$.'
  },
  {
    prompt: 'Biểu diễn số thập phân vô hạn tuần hoàn $0,444... = 0,(4)$ dưới dạng phân số tối giản là:',
    options: [
      { id: 'A', text: '$\\frac{2}{5}$' },
      { id: 'B', text: '$\\frac{4}{9}$' },
      { id: 'C', text: '$\\frac{4}{11}$' },
      { id: 'D', text: '$\\frac{1}{4}$' }
    ],
    correctOptionId: 'B',
    explanation: 'Ta có $0,(4) = \\frac{4}{10} + \\frac{4}{10^2} + \\dots = \\frac{4/10}{1 - 1/10} = \\frac{4}{9}$.'
  },
  {
    prompt: 'Tính giới hạn $L = \\lim (2n^3 - 5n^2 + 1)$.',
    options: [
      { id: 'A', text: '$L = 2$' },
      { id: 'B', text: '$L = 0$' },
      { id: 'C', text: '$L = +\\infty$' },
      { id: 'D', text: '$L = -\\infty$' }
    ],
    correctOptionId: 'C',
    explanation: '$\\lim (2n^3 - 5n^2 + 1) = \\lim n^3\\left(2 - \\frac{5}{n} + \\frac{1}{n^3}\\right) = +\\infty$ vì $\\lim n^3 = +\\infty$ và $\\lim(2 - \\frac{5}{n} + \\frac{1}{n^3}) = 2 > 0$.'
  },
  {
    prompt: 'Tính giới hạn $L = \\lim \\frac{\\sqrt{9n^2 + 4n} - n}{2n + 3}$.',
    options: [
      { id: 'A', text: '$L = 1$' },
      { id: 'B', text: '$L = 2$' },
      { id: 'C', text: '$L = 4$' },
      { id: 'D', text: '$L = \\frac{3}{2}$' }
    ],
    correctOptionId: 'A',
    explanation: 'Chia cả tử và mẫu cho $n > 0$: $L = \\lim \\frac{\\sqrt{9 + \\frac{4}{n}} - 1}{2 + \\frac{3}{n}} = \\frac{\\sqrt{9} - 1}{2} = \\frac{3 - 1}{2} = 1$.'
  }
];

const b15P1B: CompactMC[] = [
  {
    prompt: 'Trong các dãy số $(u_n)$ sau đây, dãy số nào có giới hạn bằng $0$ khi $n \\to +\\infty$?',
    options: [
      { id: 'A', text: '$u_n = \\left(\\frac{4}{3}\\right)^n$' },
      { id: 'B', text: '$u_n = \\left(-\\frac{3}{5}\\right)^n$' },
      { id: 'C', text: '$u_n = (-2)^n$' },
      { id: 'D', text: '$u_n = n^2$' }
    ],
    correctOptionId: 'B',
    explanation: 'Vì $\\left|-\\frac{3}{5}\\right| = \\frac{3}{5} < 1$ nên $\\lim \\left(-\\frac{3}{5}\\right)^n = 0$.'
  },
  {
    prompt: 'Tính giới hạn $L = \\lim \\frac{6n + 5}{3n - 2}$.',
    options: [
      { id: 'A', text: '$L = 2$' },
      { id: 'B', text: '$L = -\\frac{5}{2}$' },
      { id: 'C', text: '$L = 3$' },
      { id: 'D', text: '$L = 6$' }
    ],
    correctOptionId: 'A',
    explanation: 'Chia cả tử và mẫu cho $n$: $L = \\lim \\frac{6 + \\frac{5}{n}}{3 - \\frac{2}{n}} = \\frac{6}{3} = 2$.'
  },
  {
    prompt: 'Tính giới hạn $L = \\lim \\frac{8n^2 - 3n + 1}{2n^2 + 5n}$.',
    options: [
      { id: 'A', text: '$L = 2$' },
      { id: 'B', text: '$L = 4$' },
      { id: 'C', text: '$L = -\\frac{3}{5}$' },
      { id: 'D', text: '$L = 0$' }
    ],
    correctOptionId: 'B',
    explanation: 'Chia cả tử và mẫu cho $n^2$: $L = \\lim \\frac{8 - \\frac{3}{n} + \\frac{1}{n^2}}{2 + \\frac{5}{n}} = \\frac{8}{2} = 4$.'
  },
  {
    prompt: 'Tính giới hạn $L = \\lim \\frac{(2n - 1)(3n + 2)}{n^2 + 1}$.',
    options: [
      { id: 'A', text: '$L = 5$' },
      { id: 'B', text: '$L = 6$' },
      { id: 'C', text: '$L = -2$' },
      { id: 'D', text: '$L = 0$' }
    ],
    correctOptionId: 'B',
    explanation: 'Chia cả tử và mẫu cho $n^2$: $L = \\lim \\frac{(2 - \\frac{1}{n})(3 + \\frac{2}{n})}{1 + \\frac{1}{n^2}} = 2 \\cdot 3 = 6$.'
  },
  {
    prompt: 'Tính giới hạn $L = \\lim \\frac{5^n + 3^n}{2 \\cdot 5^n - 4^n}$.',
    options: [
      { id: 'A', text: '$L = 1$' },
      { id: 'B', text: '$L = \\frac{1}{2}$' },
      { id: 'C', text: '$L = \\frac{5}{2}$' },
      { id: 'D', text: '$L = 0$' }
    ],
    correctOptionId: 'B',
    explanation: 'Chia cả tử và mẫu cho $5^n$: $L = \\lim \\frac{1 + (3/5)^n}{2 - (4/5)^n} = \\frac{1}{2}$.'
  },
  {
    prompt: 'Tính tổng $S = 1 - \\frac{1}{2} + \\frac{1}{4} - \\frac{1}{8} + \\dots + \\left(-\\frac{1}{2}\\right)^{n-1} + \\dots$',
    options: [
      { id: 'A', text: '$S = 2$' },
      { id: 'B', text: '$S = \\frac{2}{3}$' },
      { id: 'C', text: '$S = \\frac{3}{2}$' },
      { id: 'D', text: '$S = \\frac{1}{2}$' }
    ],
    correctOptionId: 'B',
    explanation: 'Đây là tổng cấp số nhân lùi vô hạn có $u_1 = 1, q = -\\frac{1}{2}$. Vậy $S = \\frac{1}{1 - (-1/2)} = \\frac{1}{3/2} = \\frac{2}{3}$.'
  },
  {
    prompt: 'Cho hai dãy số $(u_n), (v_n)$ có $\\lim u_n = 4$ và $\\lim v_n = 9$. Giá trị của $\\lim \\frac{\\sqrt{u_n} + v_n}{u_n - 1}$ bằng:',
    options: [
      { id: 'A', text: '$\\frac{11}{3}$' },
      { id: 'B', text: '$\\frac{13}{3}$' },
      { id: 'C', text: '$3$' },
      { id: 'D', text: '$4$' }
    ],
    correctOptionId: 'A',
    explanation: 'Ta có $\\lim \\frac{\\sqrt{u_n} + v_n}{u_n - 1} = \\frac{\\sqrt{4} + 9}{4 - 1} = \\frac{2 + 9}{3} = \\frac{11}{3}$.'
  },
  {
    prompt: 'Tính giới hạn $L = \\lim (-3n^4 + 10n^2 - 5)$.',
    options: [
      { id: 'A', text: '$L = -3$' },
      { id: 'B', text: '$L = +\\infty$' },
      { id: 'C', text: '$L = -\\infty$' },
      { id: 'D', text: '$L = 0$' }
    ],
    correctOptionId: 'C',
    explanation: '$\\lim n^4(-3 + \\frac{10}{n^2} - \\frac{5}{n^4}) = -\\infty$ vì $\\lim n^4 = +\\infty$ và $-3 < 0$.'
  },
  {
    prompt: 'Tính giới hạn $L = \\lim (\\sqrt{n^2 + 6n} - n)$.',
    options: [
      { id: 'A', text: '$L = 0$' },
      { id: 'B', text: '$L = 3$' },
      { id: 'C', text: '$L = 6$' },
      { id: 'D', text: '$L = +\\infty$' }
    ],
    correctOptionId: 'B',
    explanation: 'Nhân lượng liên hợp: $L = \\lim \\frac{6n}{\\sqrt{n^2 + 6n} + n} = \\lim \\frac{6}{\\sqrt{1 + \\frac{6}{n}} + 1} = \\frac{6}{2} = 3$.'
  },
  {
    prompt: 'Số thập phân vô hạn tuần hoàn $0,272727... = 0,(27)$ viết dưới dạng phân số tối giản là:',
    options: [
      { id: 'A', text: '$\\frac{3}{11}$' },
      { id: 'B', text: '$\\frac{9}{33}$' },
      { id: 'C', text: '$\\frac{27}{100}$' },
      { id: 'D', text: '$\\frac{3}{10}$' }
    ],
    correctOptionId: 'A',
    explanation: '$0,(27) = \\frac{27}{99} = \\frac{3}{11}$ (tối giản).'
  },
  {
    prompt: 'Nếu $\\lim u_n = 7$ và $\\lim v_n = +\\infty$ thì $\\lim \\frac{u_n}{v_n}$ bằng:',
    options: [
      { id: 'A', text: '$7$' },
      { id: 'B', text: '$+\\infty$' },
      { id: 'C', text: '$0$' },
      { id: 'D', text: '$1$' }
    ],
    correctOptionId: 'C',
    explanation: 'Theo quy tắc tính giới hạn: Nếu $\\lim u_n = a$ hữu hạn và $\\lim v_n = \\pm\\infty$ thì $\\lim \\frac{u_n}{v_n} = 0$.'
  },
  {
    prompt: 'Tìm giá trị của tham số $a$ để $\\lim \\frac{a n^2 + 3n - 1}{2n^2 + 5} = 4$.',
    options: [
      { id: 'A', text: '$a = 2$' },
      { id: 'B', text: '$a = 4$' },
      { id: 'C', text: '$a = 6$' },
      { id: 'D', text: '$a = 8$' }
    ],
    correctOptionId: 'D',
    explanation: 'Ta có $\\lim \\frac{a n^2 + 3n - 1}{2n^2 + 5} = \\frac{a}{2}$. Để giới hạn bằng $4$ thì $\\frac{a}{2} = 4 \\Leftrightarrow a = 8$.'
  }
];

const b15P2A: CompactTF[] = [
  {
    stem: 'Cho hai dãy số $(u_n)$ và $(v_n)$ với $u_n = \\frac{6n^2 - 5n + 1}{2n^2 + 3}$ và $v_n = \\sqrt{n^2 + 8n} - n$. Xét tính đúng sai của các mệnh đề sau:',
    statements: [
      {
        id: 'a',
        text: 'Giới hạn của dãy số $(u_n)$ là $\\lim u_n = 3$.',
        isTrue: true,
        explanation: 'Chia cả tử và mẫu cho $n^2$: $\\lim u_n = \\lim \\frac{6 - \\frac{5}{n} + \\frac{1}{n^2}}{2 + \\frac{3}{n^2}} = \\frac{6}{2} = 3$.'
      },
      {
        id: 'b',
        text: 'Biểu thức $v_n$ sau khi nhân lượng liên hợp được viết thành $v_n = \\frac{8n}{\\sqrt{n^2 + 8n} + n}$.',
        isTrue: true,
        explanation: 'Ta có $(\\sqrt{n^2+8n} - n)(\\sqrt{n^2+8n} + n) = n^2 + 8n - n^2 = 8n$.'
      },
      {
        id: 'c',
        text: 'Giới hạn của dãy số $(v_n)$ là $\\lim v_n = 8$.',
        isTrue: false,
        explanation: '$\\lim v_n = \\lim \\frac{8}{\\sqrt{1 + \\frac{8}{n}} + 1} = \\frac{8}{1 + 1} = 4$, không phải $8$.'
      },
      {
        id: 'd',
        text: 'Giới hạn $\\lim (2u_n + v_n)$ bằng $10$.',
        isTrue: true,
        explanation: '$\\lim (2u_n + v_n) = 2 \\cdot 3 + 4 = 10$.'
      }
    ]
  },
  {
    stem: 'Cho cấp số nhân vô hạn $(u_n)$ có $u_n = 12 \\cdot \\left(\\frac{1}{4}\\right)^{n-1}$ với mọi $n \\ge 1$. Xét tính đúng sai của các mệnh đề sau:',
    statements: [
      {
        id: 'a',
        text: 'Dãy số $(u_n)$ là một cấp số nhân lùi vô hạn có số hạng đầu $u_1 = 12$ và công bội $q = \\frac{1}{4}$.',
        isTrue: true,
        explanation: 'Với $n = 1 \\Rightarrow u_1 = 12$, công bội $q = \\frac{1}{4}$ thỏa mãn $|q| < 1$.'
      },
      {
        id: 'b',
        text: 'Giới hạn $\\lim u_n$ bằng $\\frac{1}{4}$.',
        isTrue: false,
        explanation: 'Vì $|q| = \\frac{1}{4} < 1$ nên $\\lim u_n = \\lim 12 \\cdot (1/4)^{n-1} = 0$.'
      },
      {
        id: 'c',
        text: 'Tổng của cấp số nhân lùi vô hạn đã cho là $S = u_1 + u_2 + \\dots + u_n + \\dots = 16$.',
        isTrue: true,
        explanation: '$S = \\frac{u_1}{1 - q} = \\frac{12}{1 - 1/4} = \\frac{12}{3/4} = 16$.'
      },
      {
        id: 'd',
        text: 'Tổng của $3$ số hạng đầu tiên của cấp số nhân này lớn hơn $15,8$.',
        isTrue: false,
        explanation: 'Ta có $S_3 = u_1 + u_2 + u_3 = 12 + 3 + 0,75 = 15,75 < 15,8$.'
      }
    ]
  }
];

const b15P2B: CompactTF[] = [
  {
    stem: 'Cho dãy số $(u_n)$ xác định bởi $u_n = \\frac{4^{n+1} + 3^n}{2 \\cdot 4^n - 5}$. Xét tính đúng sai của các mệnh đề sau:',
    statements: [
      {
        id: 'a',
        text: 'Chia cả tử và mẫu của $u_n$ cho $4^n$, ta được $u_n = \\frac{4 + (3/4)^n}{2 - 5 \\cdot (1/4)^n}$.',
        isTrue: true,
        explanation: 'Vì $\\frac{4^{n+1}}{4^n} = 4, \\frac{3^n}{4^n} = (3/4)^n$ và $\\frac{5}{4^n} = 5(1/4)^n$.'
      },
      {
        id: 'b',
        text: 'Ta có $\\lim \\left(\\frac{3}{4}\\right)^n = 0$ và $\\lim \\left(\\frac{1}{4}\\right)^n = 0$.',
        isTrue: true,
        explanation: 'Do $|3/4| < 1$ và $|1/4| < 1$.'
      },
      {
        id: 'c',
        text: 'Giới hạn của dãy số $(u_n)$ là $\\lim u_n = \\frac{1}{2}$.',
        isTrue: false,
        explanation: '$\\lim u_n = \\frac{4 + 0}{2 - 0} = 2$, không phải $\\frac{1}{2}$.'
      },
      {
        id: 'd',
        text: 'Dãy số $(v_n)$ với $v_n = n \\cdot (u_n - 2)$ có giới hạn bằng $+\\infty$.',
        isTrue: false,
        explanation: 'Ta có $u_n - 2 = \\frac{3^n + 10}{2 \\cdot 4^n - 5}$, suy ra $\\lim n(u_n - 2) = \\lim \\frac{n(3/4)^n + 10n/4^n}{2 - 5/4^n} = 0$.'
      }
    ]
  },
  {
    stem: 'Một quả bóng cao su được thả rơi tự do từ độ cao $18\\text{ m}$ xuống mặt đất phẳng. Mỗi lần chạm đất, quả bóng lại nảy lên theo phương thẳng đứng đạt độ cao bằng $\\frac{2}{3}$ độ cao của lần rơi ngay trước đó. Xét tính đúng sai của các mệnh đề sau:',
    statements: [
      {
        id: 'a',
        text: 'Độ cao cực đại của quả bóng sau lần chạm đất thứ nhất là $12\\text{ m}$.',
        isTrue: true,
        explanation: '$h_1 = \\frac{2}{3} \\cdot 18 = 12\\text{ m}$.'
      },
      {
        id: 'b',
        text: 'Dãy các độ cao cực đại $h_1, h_2, h_3, \\dots$ sau mỗi lần chạm đất lập thành một cấp số nhân lùi vô hạn có $u_1 = 12$ và công bội $q = \\frac{2}{3}$.',
        isTrue: true,
        explanation: 'Ta có $h_1 = 12$ và $h_{n+1} = \\frac{2}{3}h_n$ với $|q| = \\frac{2}{3} < 1$.'
      },
      {
        id: 'c',
        text: 'Tổng các độ cao cực đại $h_1 + h_2 + h_3 + \\dots$ bằng $36\\text{ m}$.',
        isTrue: true,
        explanation: 'Tổng cấp số nhân lùi vô hạn: $S_h = \\frac{12}{1 - 2/3} = 36\\text{ m}$.'
      },
      {
        id: 'd',
        text: 'Tổng quãng đường quả bóng đã di chuyển (cả rơi xuống và nảy lên) từ lúc thả cho đến khi đứng yên hẳn bằng $54\\text{ m}$.',
        isTrue: false,
        explanation: 'Mỗi độ cao $h_k$ quả bóng đi qua 2 lần (lên và xuống), cộng với quãng đường rơi ban đầu $18\\text{ m}$, nên tổng quãng đường là $18 + 2 \\cdot 36 = 90\\text{ m}$, không phải $54\\text{ m}$.'
      }
    ]
  }
];

const b15P3A: CompactSA[] = [
  {
    prompt: 'Tính giới hạn $L = \\lim \\frac{9n^2 - 4n + 7}{3n^2 + 2n - 1}$.',
    correctAnswer: '3',
    acceptedAnswers: ['3'],
    explanation: 'Chia cả tử và mẫu cho $n^2$: $L = \\frac{9}{3} = 3$.'
  },
  {
    prompt: 'Tính giới hạn $L = \\lim (\\sqrt{n^2 + 10n + 3} - n)$.',
    correctAnswer: '5',
    acceptedAnswers: ['5'],
    explanation: '$L = \\lim \\frac{10n + 3}{\\sqrt{n^2 + 10n + 3} + n} = \\lim \\frac{10 + \\frac{3}{n}}{\\sqrt{1 + \\frac{10}{n} + \\frac{3}{n^2}} + 1} = \\frac{10}{2} = 5$.'
  },
  {
    prompt: 'Tính tổng $S$ của cấp số nhân lùi vô hạn: $S = 10 + 5 + \\frac{5}{2} + \\frac{5}{4} + \\dots$',
    correctAnswer: '20',
    acceptedAnswers: ['20'],
    explanation: 'Ta có $u_1 = 10, q = \\frac{1}{2} \\Rightarrow S = \\frac{10}{1 - 1/2} = 20$.'
  },
  {
    prompt: 'Biểu diễn số thập phân vô hạn tuần hoàn $1,(36) = 1,363636...$ dưới dạng phân số tối giản $\\frac{a}{b}$ (với $a, b \\in \\mathbb{N}^*$, $\\text{ƯCLN}(a,b)=1$). Tính tổng $a + b$.',
    correctAnswer: '26',
    acceptedAnswers: ['26'],
    explanation: 'Ta có $1,(36) = 1 + \\frac{36}{99} = 1 + \\frac{4}{11} = \\frac{15}{11}$. Vậy $a = 15, b = 11 \\Rightarrow a + b = 26$.'
  }
];

const b15P3B: CompactSA[] = [
  {
    prompt: 'Tính giới hạn $L = \\lim \\frac{(4n + 1)(3n - 2)}{2n^2 + 5}$.',
    correctAnswer: '6',
    acceptedAnswers: ['6'],
    explanation: 'Hệ số của $n^2$ ở tử là $4 \\cdot 3 = 12$, ở mẫu là $2$. Vậy $L = \\frac{12}{2} = 6$.'
  },
  {
    prompt: 'Tính giới hạn $L = \\lim (\\sqrt{4n^2 + 12n} - 2n)$.',
    correctAnswer: '3',
    acceptedAnswers: ['3'],
    explanation: '$L = \\lim \\frac{12n}{\\sqrt{4n^2 + 12n} + 2n} = \\lim \\frac{12}{\\sqrt{4 + \\frac{12}{n}} + 2} = \\frac{12}{2 + 2} = 3$.'
  },
  {
    prompt: 'Tính tổng của cấp số nhân lùi vô hạn có số hạng đầu $u_1 = 15$ và công bội $q = \\frac{2}{5}$.',
    correctAnswer: '25',
    acceptedAnswers: ['25'],
    explanation: '$S = \\frac{15}{1 - 2/5} = \\frac{15}{3/5} = 25$.'
  },
  {
    prompt: 'Cho $\\lim \\frac{(2a - 1)n^3 + 4n^2 - 1}{n^3 + 2n + 3} = 7$. Tìm giá trị của tham số $a$.',
    correctAnswer: '4',
    acceptedAnswers: ['4'],
    explanation: 'Ta có giới hạn bằng $2a - 1$. Từ $2a - 1 = 7 \\Rightarrow 2a = 8 \\Rightarrow a = 4$.'
  }
];

const b15P4A: CompactSO[] = [
  {
    prompt: 'Sắp xếp các bước tính giới hạn $L = \\lim \\frac{6n^2 - 3n + 2}{2n^2 + 5n}$:',
    steps: [
      { id: 's1', text: 'Nhận xét tử và mẫu đều là đa thức bậc $2$ đối với $n$, chia cả tử và mẫu cho lũy thừa cao nhất là $n^2$.' },
      { id: 's2', text: 'Viết lại biểu thức thành $L = \\lim \\frac{6 - \\frac{3}{n} + \\frac{2}{n^2}}{2 + \\frac{5}{n}}$.' },
      { id: 's3', text: 'Sử dụng các giới hạn cơ bản $\\lim \\frac{1}{n} = 0$ và $\\lim \\frac{1}{n^2} = 0$.' },
      { id: 's4', text: 'Áp dụng định lí giới hạn của thương, tính được $L = \\frac{6 - 0 + 0}{2 + 0} = 3$.' }
    ],
    correctOrder: ['s1', 's2', 's3', 's4'],
    explanation: 'Quy tắc tính giới hạn dãy phân thức hữu tỉ: chia cả tử và mẫu cho lũy thừa bậc cao nhất của $n$.'
  },
  {
    prompt: 'Sắp xếp các bước tính giới hạn $L = \\lim (\\sqrt{n^2 + 6n} - n)$:',
    steps: [
      { id: 's1', text: 'Nhận dạng giới hạn vô định $\\infty - \\infty$, nhân và chia với biểu thức liên hợp $\\sqrt{n^2 + 6n} + n$.' },
      { id: 's2', text: 'Thu gọn tử số: $L = \\lim \\frac{(n^2 + 6n) - n^2}{\\sqrt{n^2 + 6n} + n} = \\lim \\frac{6n}{\\sqrt{n^2 + 6n} + n}$.' },
      { id: 's3', text: 'Chia cả tử và mẫu cho $n > 0$: $L = \\lim \\frac{6}{\\sqrt{1 + \\frac{6}{n}} + 1}$.' },
      { id: 's4', text: 'Thay $\\lim \\frac{6}{n} = 0$, kết luận $L = \\frac{6}{\\sqrt{1 + 0} + 1} = 3$.' }
    ],
    correctOrder: ['s1', 's2', 's3', 's4'],
    explanation: 'Nhân lượng liên hợp để khử dạng $\\infty - \\infty$ rồi chia cả tử và mẫu cho $n$.'
  },
  {
    prompt: 'Sắp xếp các bước đổi số thập phân vô hạn tuần hoàn $0,(36)$ ra phân số tối giản:',
    steps: [
      { id: 's1', text: 'Tách số thập phân thành tổng vô hạn: $0,(36) = 0,36 + 0,0036 + 0,000036 + \\dots$' },
      { id: 's2', text: 'Nhận xét đây là tổng của cấp số nhân lùi vô hạn với $u_1 = \\frac{36}{100}$ và công bội $q = \\frac{1}{100}$ ($|q| < 1$).' },
      { id: 's3', text: 'Áp dụng công thức tổng cấp số nhân lùi vô hạn: $S = \\frac{u_1}{1 - q} = \\frac{36/100}{1 - 1/100} = \\frac{36}{99}$.' },
      { id: 's4', text: 'Rút gọn phân số cho $9$, kết luận $0,(36) = \\frac{4}{11}$.' }
    ],
    correctOrder: ['s1', 's2', 's3', 's4'],
    explanation: 'Ứng dụng công thức tổng cấp số nhân lùi vô hạn $S = \\frac{u_1}{1-q}$.'
  },
  {
    prompt: 'Sắp xếp các bước tính giới hạn $L = \\lim \\frac{5^{n+1} - 3^n}{5^n + 2 \\cdot 3^n}$:',
    steps: [
      { id: 's1', text: 'Biến đổi $5^{n+1} = 5 \\cdot 5^n$ và nhận xét cơ số lớn nhất trong biểu thức là $5$.' },
      { id: 's2', text: 'Chia cả tử và mẫu cho $5^n$: $L = \\lim \\frac{5 - \\left(\\frac{3}{5}\\right)^n}{1 + 2 \\cdot \\left(\\frac{3}{5}\\right)^n}$.' },
      { id: 's3', text: 'Vì $\\left|\\frac{3}{5}\\right| < 1$ nên $\\lim \\left(\\frac{3}{5}\\right)^n = 0$.' },
      { id: 's4', text: 'Tính giá trị giới hạn $L = \\frac{5 - 0}{1 + 2 \\cdot 0} = 5$.' }
    ],
    correctOrder: ['s1', 's2', 's3', 's4'],
    explanation: 'Đối với giới hạn chứa hàm số mũ $a^n$, ta chia cả tử và mẫu cho lũy thừa có cơ số lớn nhất.'
  }
];

const b15P4B = [b15P4A[1], b15P4A[3], b15P4A[0], b15P4A[2]];

// ============================================================================
// BÀI 16. GIỚI HẠN CỦA HÀM SỐ
// Trọng tâm: Giới hạn hữu hạn của hàm số tại một điểm, các phép toán trên giới hạn,
// khử dạng vô định 0/0, giới hạn một bên, giới hạn của hàm số tại vô cực, giới hạn vô cực.
// ============================================================================

const b16P1A: CompactMC[] = [
  {
    prompt: 'Tính giới hạn $L = \\lim_{x \\to 2} (3x^2 - 4x + 5)$.',
    options: [
      { id: 'A', text: '$L = 7$' },
      { id: 'B', text: '$L = 9$' },
      { id: 'C', text: '$L = 11$' },
      { id: 'D', text: '$L = 5$' }
    ],
    correctOptionId: 'B',
    explanation: 'Thay trực tiếp $x = 2$: $L = 3 \\cdot 2^2 - 4 \\cdot 2 + 5 = 12 - 8 + 5 = 9$.'
  },
  {
    prompt: 'Tính giới hạn $L = \\lim_{x \\to 3} \\frac{x^2 - 9}{x - 3}$.',
    options: [
      { id: 'A', text: '$L = 0$' },
      { id: 'B', text: '$L = 3$' },
      { id: 'C', text: '$L = 6$' },
      { id: 'D', text: '$L = 9$' }
    ],
    correctOptionId: 'C',
    explanation: 'Với $x \\ne 3$, ta có $\\frac{x^2 - 9}{x - 3} = \\frac{(x-3)(x+3)}{x-3} = x + 3$. Vậy $L = \\lim_{x \\to 3} (x + 3) = 6$.'
  },
  {
    prompt: 'Tính giới hạn $L = \\lim_{x \\to 1} \\frac{x^2 + 3x - 4}{x - 1}$.',
    options: [
      { id: 'A', text: '$L = 3$' },
      { id: 'B', text: '$L = 4$' },
      { id: 'C', text: '$L = 5$' },
      { id: 'D', text: '$L = -4$' }
    ],
    correctOptionId: 'C',
    explanation: 'Phân tích tử thức: $x^2 + 3x - 4 = (x - 1)(x + 4)$. Do đó $L = \\lim_{x \\to 1} (x + 4) = 1 + 4 = 5$.'
  },
  {
    prompt: 'Tính giới hạn $L = \\lim_{x \\to 0} \\frac{\\sqrt{x + 4} - 2}{x}$.',
    options: [
      { id: 'A', text: '$L = \\frac{1}{2}$' },
      { id: 'B', text: '$L = \\frac{1}{4}$' },
      { id: 'C', text: '$L = 0$' },
      { id: 'D', text: '$L = 4$' }
    ],
    correctOptionId: 'B',
    explanation: 'Nhân lượng liên hợp: $L = \\lim_{x \\to 0} \\frac{x}{x(\\sqrt{x+4} + 2)} = \\lim_{x \\to 0} \\frac{1}{\\sqrt{x+4} + 2} = \\frac{1}{2 + 2} = \\frac{1}{4}$.'
  },
  {
    prompt: 'Hàm số $y = f(x)$ có giới hạn $\\lim_{x \\to x_0} f(x) = L$ khi và chỉ khi:',
    options: [
      { id: 'A', text: '$\\lim_{x \\to x_0^+} f(x) = L$' },
      { id: 'B', text: '$\\lim_{x \\to x_0^-} f(x) = L$' },
      { id: 'C', text: '$\\lim_{x \\to x_0^-} f(x) = \\lim_{x \\to x_0^+} f(x) = L$' },
      { id: 'D', text: '$f(x_0) = L$' }
    ],
    correctOptionId: 'C',
    explanation: 'Định lí giới hạn một bên: $\\lim_{x \\to x_0} f(x) = L \\Leftrightarrow \\lim_{x \\to x_0^-} f(x) = \\lim_{x \\to x_0^+} f(x) = L$.'
  },
  {
    prompt: 'Tính giới hạn một bên $L = \\lim_{x \\to 2^+} \\frac{x + 3}{x - 2}$.',
    options: [
      { id: 'A', text: '$L = +\\infty$' },
      { id: 'B', text: '$L = -\\infty$' },
      { id: 'C', text: '$L = 1$' },
      { id: 'D', text: '$L = 5$' }
    ],
    correctOptionId: 'A',
    explanation: 'Khi $x \\to 2^+$ thì $x - 2 > 0$ và $\\lim_{x \\to 2^+} (x - 2) = 0$, còn $\\lim_{x \\to 2^+} (x + 3) = 5 > 0$. Vậy $L = +\\infty$.'
  },
  {
    prompt: 'Tính giới hạn một bên $L = \\lim_{x \\to 1^-} \\frac{2x + 1}{x - 1}$.',
    options: [
      { id: 'A', text: '$L = +\\infty$' },
      { id: 'B', text: '$L = -\\infty$' },
      { id: 'C', text: '$L = 2$' },
      { id: 'D', text: '$L = -1$' }
    ],
    correctOptionId: 'B',
    explanation: 'Khi $x \\to 1^-$ thì $x - 1 < 0, \\lim_{x \\to 1^-} (x - 1) = 0$ và $\\lim_{x \\to 1^-} (2x + 1) = 3 > 0$, nên $L = -\\infty$.'
  },
  {
    prompt: 'Tính giới hạn tại vô cực $L = \\lim_{x \\to +\\infty} \\frac{5x - 2}{x + 3}$.',
    options: [
      { id: 'A', text: '$L = -\\frac{2}{3}$' },
      { id: 'B', text: '$L = 5$' },
      { id: 'C', text: '$L = 1$' },
      { id: 'D', text: '$L = +\\infty$' }
    ],
    correctOptionId: 'B',
    explanation: 'Chia cả tử và mẫu cho $x$: $L = \\lim_{x \\to +\\infty} \\frac{5 - \\frac{2}{x}}{1 + \\frac{3}{x}} = 5$.'
  },
  {
    prompt: 'Tính giới hạn tại vô cực $L = \\lim_{x \\to -\\infty} (-2x^3 + 4x^2 - 1)$.',
    options: [
      { id: 'A', text: '$L = -2$' },
      { id: 'B', text: '$L = +\\infty$' },
      { id: 'C', text: '$L = -\\infty$' },
      { id: 'D', text: '$L = 0$' }
    ],
    correctOptionId: 'B',
    explanation: 'Ta có $\\lim_{x \\to -\\infty} x^3 = -\\infty$ và $\\lim_{x \\to -\\infty} \\left(-2 + \\frac{4}{x} - \\frac{1}{x^3}\\right) = -2 < 0$. Tích hai dấu âm cho kết quả $+\\infty$.'
  },
  {
    prompt: 'Tính giới hạn $L = \\lim_{x \\to -\\infty} \\frac{\\sqrt{4x^2 + 1}}{x - 2}$.',
    options: [
      { id: 'A', text: '$L = 2$' },
      { id: 'B', text: '$L = -2$' },
      { id: 'C', text: '$L = 4$' },
      { id: 'D', text: '$L = -4$' }
    ],
    correctOptionId: 'B',
    explanation: 'Khi $x \\to -\\infty$ thì $x < 0 \\Rightarrow \\sqrt{4x^2 + 1} = |x|\\sqrt{4 + \\frac{1}{x^2}} = -x\\sqrt{4 + \\frac{1}{x^2}}$. Chia cả tử và mẫu cho $x$ được $L = \\frac{-\\sqrt{4}}{1} = -2$.'
  },
  {
    prompt: 'Cho hàm số $f(x) = \\begin{cases} 2x + 3 & \\text{khi } x \\ge 1 \\\\ 5x & \\text{khi } x < 1 \\end{cases}$. Giá trị của $\\lim_{x \\to 1} f(x)$ bằng:',
    options: [
      { id: 'A', text: '$3$' },
      { id: 'B', text: '$5$' },
      { id: 'C', text: '$2$' },
      { id: 'D', text: 'Không tồn tại' }
    ],
    correctOptionId: 'B',
    explanation: 'Ta có $\\lim_{x \\to 1^+} f(x) = 2(1) + 3 = 5$ và $\\lim_{x \\to 1^-} f(x) = 5(1) = 5$. Vì hai giới hạn một bên bằng nhau nên $\\lim_{x \\to 1} f(x) = 5$.'
  },
  {
    prompt: 'Cho hai hàm số $f(x), g(x)$ thỏa mãn $\\lim_{x \\to 2} f(x) = 4$ và $\\lim_{x \\to 2} g(x) = -1$. Giá trị của $\\lim_{x \\to 2} [f(x) \\cdot g(x) + 3]$ bằng:',
    options: [
      { id: 'A', text: '$-1$' },
      { id: 'B', text: '$7$' },
      { id: 'C', text: '$-4$' },
      { id: 'D', text: '$1$' }
    ],
    correctOptionId: 'A',
    explanation: '$\\lim_{x \\to 2} [f(x)g(x) + 3] = 4 \\cdot (-1) + 3 = -1$.'
  }
];

const b16P1B: CompactMC[] = [
  {
    prompt: 'Tính giới hạn $L = \\lim_{x \\to -1} (x^3 - 3x + 4)$.',
    options: [
      { id: 'A', text: '$L = 0$' },
      { id: 'B', text: '$L = 2$' },
      { id: 'C', text: '$L = 6$' },
      { id: 'D', text: '$L = 8$' }
    ],
    correctOptionId: 'C',
    explanation: 'Thay $x = -1$: $L = (-1)^3 - 3(-1) + 4 = -1 + 3 + 4 = 6$.'
  },
  {
    prompt: 'Tính giới hạn $L = \\lim_{x \\to 4} \\frac{x^2 - 16}{x - 4}$.',
    options: [
      { id: 'A', text: '$L = 4$' },
      { id: 'B', text: '$L = 8$' },
      { id: 'C', text: '$L = 16$' },
      { id: 'D', text: '$L = 0$' }
    ],
    correctOptionId: 'B',
    explanation: '$L = \\lim_{x \\to 4} (x + 4) = 8$.'
  },
  {
    prompt: 'Tính giới hạn $L = \\lim_{x \\to 2} \\frac{x^2 - 5x + 6}{x - 2}$.',
    options: [
      { id: 'A', text: '$L = 1$' },
      { id: 'B', text: '$L = -1$' },
      { id: 'C', text: '$L = 5$' },
      { id: 'D', text: '$L = -5$' }
    ],
    correctOptionId: 'B',
    explanation: 'Phân tích $x^2 - 5x + 6 = (x - 2)(x - 3)$. Vậy $L = \\lim_{x \\to 2} (x - 3) = 2 - 3 = -1$.'
  },
  {
    prompt: 'Tính giới hạn $L = \\lim_{x \\to 5} \\frac{\\sqrt{x + 4} - 3}{x - 5}$.',
    options: [
      { id: 'A', text: '$L = \\frac{1}{3}$' },
      { id: 'B', text: '$L = \\frac{1}{6}$' },
      { id: 'C', text: '$L = \\frac{1}{9}$' },
      { id: 'D', text: '$L = 6$' }
    ],
    correctOptionId: 'B',
    explanation: 'Nhân lượng liên hợp: $L = \\lim_{x \\to 5} \\frac{x - 5}{(x - 5)(\\sqrt{x + 4} + 3)} = \\frac{1}{3 + 3} = \\frac{1}{6}$.'
  },
  {
    prompt: 'Tính giới hạn một bên $L = \\lim_{x \\to 3^+} \\frac{4 - 2x}{x - 3}$.',
    options: [
      { id: 'A', text: '$L = +\\infty$' },
      { id: 'B', text: '$L = -\\infty$' },
      { id: 'C', text: '$L = -2$' },
      { id: 'D', text: '$L = 2$' }
    ],
    correctOptionId: 'B',
    explanation: 'Khi $x \\to 3^+$ thì $x - 3 > 0, \\lim(x - 3) = 0$, nhưng tử số $4 - 2x \\to 4 - 6 = -2 < 0$. Do đó $L = -\\infty$.'
  },
  {
    prompt: 'Tính giới hạn tại vô cực $L = \\lim_{x \\to -\\infty} \\frac{6x^2 - x + 1}{3x^2 + 2}$.',
    options: [
      { id: 'A', text: '$L = 2$' },
      { id: 'B', text: '$L = -2$' },
      { id: 'C', text: '$L = 3$' },
      { id: 'D', text: '$L = 0$' }
    ],
    correctOptionId: 'A',
    explanation: 'Chia cả tử và mẫu cho $x^2$: $L = \\frac{6}{3} = 2$.'
  },
  {
    prompt: 'Tính giới hạn $L = \\lim_{x \\to +\\infty} \\frac{\\sqrt{9x^2 + 2x} + x}{2x - 1}$.',
    options: [
      { id: 'A', text: '$L = 1$' },
      { id: 'B', text: '$L = 2$' },
      { id: 'C', text: '$L = 5$' },
      { id: 'D', text: '$L = \\frac{3}{2}$' }
    ],
    correctOptionId: 'B',
    explanation: 'Khi $x \\to +\\infty$ thì $x > 0$, chia cả tử và mẫu cho $x$ được $L = \\frac{\\sqrt{9} + 1}{2} = \\frac{4}{2} = 2$.'
  },
  {
    prompt: 'Tính giới hạn $L = \\lim_{x \\to 2} \\frac{x^3 - 8}{x - 2}$.',
    options: [
      { id: 'A', text: '$L = 4$' },
      { id: 'B', text: '$L = 8$' },
      { id: 'C', text: '$L = 12$' },
      { id: 'D', text: '$L = 24$' }
    ],
    correctOptionId: 'C',
    explanation: 'Rút gọn $\\frac{x^3 - 8}{x - 2} = x^2 + 2x + 4$. Khi $x \\to 2$, $L = 2^2 + 2(2) + 4 = 12$.'
  },
  {
    prompt: 'Cho $\\lim_{x \\to 3} \\frac{f(x) - 5}{x - 3} = 2$. Khi đó $\\lim_{x \\to 3} f(x)$ bằng:',
    options: [
      { id: 'A', text: '$2$' },
      { id: 'B', text: '$3$' },
      { id: 'C', text: '$5$' },
      { id: 'D', text: '$0$' }
    ],
    correctOptionId: 'C',
    explanation: 'Ta có $f(x) - 5 = \\frac{f(x) - 5}{x - 3} \\cdot (x - 3) \\to 2 \\cdot 0 = 0$ khi $x \\to 3$. Vậy $\\lim_{x \\to 3} f(x) = 5$.'
  },
  {
    prompt: 'Tính giới hạn $L = \\lim_{x \\to 2^-} \\frac{|x - 2|}{x - 2}$.',
    options: [
      { id: 'A', text: '$L = 1$' },
      { id: 'B', text: '$L = -1$' },
      { id: 'C', text: '$L = 0$' },
      { id: 'D', text: '$L = 2$' }
    ],
    correctOptionId: 'B',
    explanation: 'Khi $x < 2$ thì $|x - 2| = -(x - 2)$, suy ra $\\frac{|x - 2|}{x - 2} = -1$. Vậy $L = -1$.'
  },
  {
    prompt: 'Tính giới hạn $L = \\lim_{x \\to +\\infty} (\\sqrt{x^2 + 4x} - x)$.',
    options: [
      { id: 'A', text: '$L = 0$' },
      { id: 'B', text: '$L = 2$' },
      { id: 'C', text: '$L = 4$' },
      { id: 'D', text: '$L = +\\infty$' }
    ],
    correctOptionId: 'B',
    explanation: 'Nhân lượng liên hợp: $L = \\lim_{x \\to +\\infty} \\frac{4x}{\\sqrt{x^2+4x} + x} = \\frac{4}{1 + 1} = 2$.'
  },
  {
    prompt: 'Với số nguyên dương $k$ chẵn, giá trị của $\\lim_{x \\to -\\infty} x^k$ bằng:',
    options: [
      { id: 'A', text: '$0$' },
      { id: 'B', text: '$-\\infty$' },
      { id: 'C', text: '$+\\infty$' },
      { id: 'D', text: '$1$' }
    ],
    correctOptionId: 'C',
    explanation: 'Với $k$ nguyên dương chẵn, $\\lim_{x \\to -\\infty} x^k = +\\infty$.'
  }
];

const b16P2A: CompactTF[] = [
  {
    stem: 'Cho hàm số $f(x) = \\frac{x^2 - 3x + 2}{x^2 - 4}$. Xét tính đúng sai của các mệnh đề sau:',
    statements: [
      {
        id: 'a',
        text: 'Giới hạn của hàm số tại $x = 1$ là $\\lim_{x \\to 1} f(x) = 0$.',
        isTrue: true,
        explanation: 'Thay $x = 1$: $f(1) = \\frac{1 - 3 + 2}{1 - 4} = \\frac{0}{-3} = 0$.'
      },
      {
        id: 'b',
        text: 'Với mọi $x \\notin \\{-2; 2\\}$, biểu thức $f(x)$ rút gọn được thành $\\frac{x - 1}{x + 2}$.',
        isTrue: true,
        explanation: 'Ta có $\\frac{x^2 - 3x + 2}{x^2 - 4} = \\frac{(x - 1)(x - 2)}{(x - 2)(x + 2)} = \\frac{x - 1}{x + 2}$ với $x \\ne \\pm 2$.'
      },
      {
        id: 'c',
        text: 'Giới hạn của hàm số khi $x \\to 2$ là $\\lim_{x \\to 2} f(x) = \\frac{1}{4}$.',
        isTrue: true,
        explanation: '$\\lim_{x \\to 2} f(x) = \\lim_{x \\to 2} \\frac{x - 1}{x + 2} = \\frac{2 - 1}{2 + 2} = \\frac{1}{4}$.'
      },
      {
        id: 'd',
        text: 'Giới hạn của hàm số khi $x \\to +\\infty$ là $\\lim_{x \\to +\\infty} f(x) = 0$.',
        isTrue: false,
        explanation: 'Chia cả tử và mẫu cho $x^2$: $\\lim_{x \\to +\\infty} \\frac{x^2 - 3x + 2}{x^2 - 4} = 1$, không phải $0$.'
      }
    ]
  },
  {
    stem: 'Cho hàm số $g(x) = \\begin{cases} \\frac{\\sqrt{x + 3} - 2}{x - 1} & \\text{khi } x > 1 \\\\ 2x - m & \\text{khi } x \\le 1 \\end{cases}$ (với $m$ là tham số thực). Xét tính đúng sai của các mệnh đề sau:',
    statements: [
      {
        id: 'a',
        text: 'Giới hạn bên phải $\\lim_{x \\to 1^+} g(x)$ có dạng vô định $\\frac{0}{0}$ trước khi rút gọn.',
        isTrue: true,
        explanation: 'Khi $x \\to 1^+$, tử $\\sqrt{1+3} - 2 = 0$ và mẫu $1 - 1 = 0$.'
      },
      {
        id: 'b',
        text: 'Giá trị của $\\lim_{x \\to 1^+} g(x)$ bằng $\\frac{1}{4}$.',
        isTrue: true,
        explanation: '$\\lim_{x \\to 1^+} \\frac{x - 1}{(x - 1)(\\sqrt{x+3} + 2)} = \\lim_{x \\to 1^+} \\frac{1}{\\sqrt{x+3} + 2} = \\frac{1}{2 + 2} = \\frac{1}{4}$.'
      },
      {
        id: 'c',
        text: 'Giới hạn bên trái $\\lim_{x \\to 1^-} g(x) = 2 - m$.',
        isTrue: true,
        explanation: 'Khi $x < 1$, $g(x) = 2x - m \\Rightarrow \\lim_{x \\to 1^-} g(x) = 2(1) - m = 2 - m$.'
      },
      {
        id: 'd',
        text: 'Hàm số $g(x)$ có giới hạn khi $x \\to 1$ khi và chỉ khi $m = 2$.',
        isTrue: false,
        explanation: 'Để tồn tại $\\lim_{x \\to 1} g(x)$ thì $2 - m = \\frac{1}{4} \\Leftrightarrow m = \\frac{7}{4} = 1,75$, không phải $m = 2$.'
      }
    ]
  }
];

const b16P2B: CompactTF[] = [
  {
    stem: 'Cho hàm số $f(x) = \\frac{\\sqrt{9x^2 + 1} + 2x}{x - 1}$. Xét tính đúng sai của các mệnh đề sau:',
    statements: [
      {
        id: 'a',
        text: 'Khi $x > 0$, ta có $\\sqrt{9x^2 + 1} = 3x\\sqrt{1 + \\frac{1}{9x^2}}$.',
        isTrue: true,
        explanation: 'Với $x > 0$ thì $|x| = x$, nên đưa $x^2$ ra ngoài căn được $x\\sqrt{9 + \\frac{1}{x^2}} = 3x\\sqrt{1 + \\frac{1}{9x^2}}$.'
      },
      {
        id: 'b',
        text: 'Giới hạn $\\lim_{x \\to +\\infty} f(x) = 5$.',
        isTrue: true,
        explanation: 'Khi $x \\to +\\infty$, chia cả tử và mẫu cho $x > 0$: $\\lim_{x \\to +\\infty} \\frac{\\sqrt{9 + 1/x^2} + 2}{1 - 1/x} = 3 + 2 = 5$.'
      },
      {
        id: 'c',
        text: 'Giới hạn $\\lim_{x \\to -\\infty} f(x) = 5$.',
        isTrue: false,
        explanation: 'Khi $x \\to -\\infty$ thì $x < 0 \\Rightarrow \\sqrt{9x^2 + 1} = -x\\sqrt{9 + 1/x^2}$. Do đó $\\lim_{x \\to -\\infty} f(x) = \\frac{-3 + 2}{1} = -1$, không phải $5$.'
      },
      {
        id: 'd',
        text: 'Giới hạn một bên $\\lim_{x \\to 1^+} f(x) = +\\infty$.',
        isTrue: true,
        explanation: 'Khi $x \\to 1^+$, tử số $\\to \\sqrt{10} + 2 > 0$ và mẫu số $x - 1 \\to 0$ ($x - 1 > 0$), nên giới hạn bằng $+\\infty$.'
      }
    ]
  },
  {
    stem: 'Cho giới hạn $L = \\lim_{x \\to 2} \\frac{x^2 + ax + b}{x - 2} = 6$ (với $a, b \\in \\mathbb{R}$). Xét tính đúng sai của các mệnh đề sau:',
    statements: [
      {
        id: 'a',
        text: 'Vì mẫu số $(x - 2) \\to 0$ khi $x \\to 2$ và giới hạn $L = 6$ hữu hạn nên tử số phải có nghiệm $x = 2$.',
        isTrue: true,
        explanation: 'Nếu tử số không tiến tới $0$ khi $x \\to 2$ thì phân thức sẽ tiến ra vô cực, trái với giả thiết $L = 6$ hữu hạn.'
      },
      {
        id: 'b',
        text: 'Ta có hệ thức $4 + 2a + b = 0$, suy ra $b = -2a - 4$.',
        isTrue: true,
        explanation: 'Thay $x = 2$ vào tử số $x^2 + ax + b = 0 \\Leftrightarrow 4 + 2a + b = 0$.'
      },
      {
        id: 'c',
        text: 'Sau khi rút gọn nhân tử $(x - 2)$, ta được $\\lim_{x \\to 2} (x + a + 2) = 6$, suy ra $a = 2$.',
        isTrue: true,
        explanation: 'Ta có $x^2 + ax - 2a - 4 = (x - 2)(x + a + 2)$. Vậy $\\lim_{x \\to 2} (x + a + 2) = a + 4 = 6 \\Leftrightarrow a = 2$.'
      },
      {
        id: 'd',
        text: 'Giá trị của $b$ bằng $8$.',
        isTrue: false,
        explanation: 'Với $a = 2$, ta có $b = -2(2) - 4 = -8$, không phải $8$.'
      }
    ]
  }
];

const b16P3A: CompactSA[] = [
  {
    prompt: 'Tính giới hạn $L = \\lim_{x \\to 3} \\frac{x^2 - x - 6}{x - 3}$.',
    correctAnswer: '5',
    acceptedAnswers: ['5'],
    explanation: 'Phân tích $x^2 - x - 6 = (x - 3)(x + 2)$. Vậy $L = \\lim_{x \\to 3} (x + 2) = 5$.'
  },
  {
    prompt: 'Tính giới hạn $L = \\lim_{x \\to 2} \\frac{\\sqrt{2x + 5} - 3}{x - 2}$ (viết kết quả dưới dạng phân số tối giản $a/b$ hoặc số thập phân). Hãy tính giá trị của $6L$.',
    correctAnswer: '2',
    acceptedAnswers: ['2'],
    explanation: '$L = \\lim_{x \\to 2} \\frac{2(x - 2)}{(x - 2)(\\sqrt{2x+5} + 3)} = \\frac{2}{3 + 3} = \\frac{1}{3}$. Vậy $6L = 6 \\cdot \\frac{1}{3} = 2$.'
  },
  {
    prompt: 'Tính giới hạn $L = \\lim_{x \\to -\\infty} \\frac{8x^2 - 3x + 5}{2x^2 + x - 1}$.',
    correctAnswer: '4',
    acceptedAnswers: ['4'],
    explanation: 'Chia cả tử và mẫu cho $x^2$: $L = \\frac{8}{2} = 4$.'
  },
  {
    prompt: 'Biết $\\lim_{x \\to 1} \\frac{x^2 + ax + b}{x - 1} = 5$. Tính tổng $a + b$.',
    correctAnswer: '-1',
    acceptedAnswers: ['-1'],
    explanation: 'Để giới hạn hữu hạn khi $x \\to 1$, tử số phải bằng $0$ tại $x = 1$, tức là $1 + a + b = 0 \\Leftrightarrow a + b = -1$ (với $a = 3, b = -4$).'
  }
];

const b16P3B: CompactSA[] = [
  {
    prompt: 'Tính giới hạn $L = \\lim_{x \\to -2} \\frac{x^2 + 5x + 6}{x + 2}$.',
    correctAnswer: '1',
    acceptedAnswers: ['1'],
    explanation: 'Ta có $x^2 + 5x + 6 = (x + 2)(x + 3) \\Rightarrow L = \\lim_{x \\to -2} (x + 3) = 1$.'
  },
  {
    prompt: 'Tính giới hạn $L = \\lim_{x \\to 3} \\frac{x - 3}{\\sqrt{x + 1} - 2}$.',
    correctAnswer: '4',
    acceptedAnswers: ['4'],
    explanation: 'Nhân lượng liên hợp: $L = \\lim_{x \\to 3} (\\sqrt{x + 1} + 2) = 2 + 2 = 4$.'
  },
  {
    prompt: 'Tính giới hạn $L = \\lim_{x \\to +\\infty} (\\sqrt{x^2 + 12x} - x)$.',
    correctAnswer: '6',
    acceptedAnswers: ['6'],
    explanation: '$L = \\lim_{x \\to +\\infty} \\frac{12x}{\\sqrt{x^2 + 12x} + x} = \\frac{12}{1 + 1} = 6$.'
  },
  {
    prompt: 'Cho $\\lim_{x \\to 2} \\frac{x^2 + ax + b}{x - 2} = 7$. Tìm giá trị của hệ số $a$.',
    correctAnswer: '3',
    acceptedAnswers: ['3'],
    explanation: 'Vì $x = 2$ là nghiệm của tử nên $x^2 + ax + b = (x - 2)(x + a + 2)$. Suy ra $\\lim_{x \\to 2} (x + a + 2) = a + 4 = 7 \\Rightarrow a = 3$.'
  }
];

const b16P4A: CompactSO[] = [
  {
    prompt: 'Sắp xếp các bước tính giới hạn $L = \\lim_{x \\to 2} \\frac{x^2 - 5x + 6}{x^2 - 4}$:',
    steps: [
      { id: 's1', text: 'Nhận xét khi thay $x = 2$, cả tử và mẫu đều bằng $0$ (dạng vô định $\\frac{0}{0}$).' },
      { id: 's2', text: 'Phân tích tử và mẫu thành nhân tử: $x^2 - 5x + 6 = (x - 2)(x - 3)$ và $x^2 - 4 = (x - 2)(x + 2)$.' },
      { id: 's3', text: 'Rút gọn nhân tử chung $(x - 2)$ (do $x \\ne 2$): $L = \\lim_{x \\to 2} \\frac{x - 3}{x + 2}$.' },
      { id: 's4', text: 'Thay $x = 2$ vào biểu thức đã rút gọn, tính được $L = \\frac{2 - 3}{2 + 2} = -\\frac{1}{4}$.' }
    ],
    correctOrder: ['s1', 's2', 's3', 's4'],
    explanation: 'Phương pháp khử dạng vô định $0/0$ của phân thức đại số bằng phân tích đa thức thành nhân tử.'
  },
  {
    prompt: 'Sắp xếp các bước tính giới hạn $L = \\lim_{x \\to 1} \\frac{\\sqrt{3x + 1} - 2}{x - 1}$:',
    steps: [
      { id: 's1', text: 'Nhận dạng vô định $\\frac{0}{0}$ chứa căn bậc hai, nhân cả tử và mẫu với biểu thức liên hợp $\\sqrt{3x + 1} + 2$.' },
      { id: 's2', text: 'Biến đổi tử số: $(\\sqrt{3x + 1})^2 - 2^2 = 3x + 1 - 4 = 3(x - 1)$.' },
      { id: 's3', text: 'Rút gọn nhân tử $(x - 1)$: $L = \\lim_{x \\to 1} \\frac{3}{\\sqrt{3x + 1} + 2}$.' },
      { id: 's4', text: 'Thay $x = 1$ vào biểu thức, kết luận $L = \\frac{3}{\\sqrt{4} + 2} = \\frac{3}{4}$.' }
    ],
    correctOrder: ['s1', 's2', 's3', 's4'],
    explanation: 'Nhân lượng liên hợp để xuất hiện nhân tử $(x - x_0)$ rồi rút gọn.'
  },
  {
    prompt: 'Sắp xếp các bước tính giới hạn $L = \\lim_{x \\to -\\infty} \\frac{\\sqrt{4x^2 + 3}}{x - 1}$:',
    steps: [
      { id: 's1', text: 'Vì $x \\to -\\infty$ nên xét với $x < 0$, khi đó $\\sqrt{x^2} = |x| = -x$.' },
      { id: 's2', text: 'Đưa $x^2$ ra khỏi dấu căn: $\\sqrt{4x^2 + 3} = -x\\sqrt{4 + \\frac{3}{x^2}}$.' },
      { id: 's3', text: 'Chia cả tử và mẫu cho $x$: $L = \\lim_{x \\to -\\infty} \\frac{-\\sqrt{4 + \\frac{3}{x^2}}}{1 - \\frac{1}{x}}$.' },
      { id: 's4', text: 'Vì $\\lim_{x \\to -\\infty} \\frac{1}{x} = 0$ và $\\lim_{x \\to -\\infty} \\frac{3}{x^2} = 0$ nên kết luận $L = -2$.' }
    ],
    correctOrder: ['s1', 's2', 's3', 's4'],
    explanation: 'Lưu ý dấu của $|x| = -x$ khi $x \\to -\\infty$.'
  },
  {
    prompt: 'Sắp xếp các bước xét sự tồn tại của $\\lim_{x \\to x_0} f(x)$ đối với hàm số cho bởi nhiều công thức:',
    steps: [
      { id: 's1', text: 'Tính giới hạn bên phải $L^+ = \\lim_{x \\to x_0^+} f(x)$ theo công thức ứng với $x > x_0$.' },
      { id: 's2', text: 'Tính giới hạn bên trái $L^- = \\lim_{x \\to x_0^-} f(x)$ theo công thức ứng với $x < x_0$.' },
      { id: 's3', text: 'So sánh hai giá trị giới hạn một bên $L^+$ và $L^-$.' },
      { id: 's4', text: 'Nếu $L^+ = L^- = L$ thì kết luận $\\lim_{x \\to x_0} f(x) = L$; ngược lại kết luận không tồn tại giới hạn.' }
    ],
    correctOrder: ['s1', 's2', 's3', 's4'],
    explanation: 'Sử dụng định lí điều kiện cần và đủ để hàm số có giới hạn tại một điểm thông qua giới hạn một bên.'
  }
];

const b16P4B = [b16P4A[1], b16P4A[2], b16P4A[0], b16P4A[3]];

// ============================================================================
// BÀI 17. HÀM SỐ LIÊN TỤC
// Trọng tâm: Hàm số liên tục tại một điểm, hàm số liên tục trên một khoảng hoặc một đoạn,
// tính liên tục của các hàm sơ cấp cơ bản, Định lí giá trị trung gian (chứng minh PT có nghiệm).
// ============================================================================

const b17P1A: CompactMC[] = [
  {
    prompt: 'Cho hàm số $y = f(x)$ xác định trên khoảng $(a; b)$ và $x_0 \\in (a; b)$. Hàm số $f(x)$ được gọi là **liên tục tại điểm $x_0$** nếu:',
    options: [
      { id: 'A', text: 'Tồn tại $\\lim_{x \\to x_0} f(x)$' },
      { id: 'B', text: '$\\lim_{x \\to x_0} f(x) = f(x_0)$' },
      { id: 'C', text: '$\\lim_{x \\to x_0^+} f(x) = f(x_0)$' },
      { id: 'D', text: '$f(x_0) = 0$' }
    ],
    correctOptionId: 'B',
    explanation: 'Định nghĩa: Hàm số $y = f(x)$ xác định trên khoảng $(a;b)$ chứa $x_0$ được gọi là liên tục tại $x_0$ nếu $\\lim_{x \\to x_0} f(x) = f(x_0)$.'
  },
  {
    prompt: 'Hàm số $y = f(x)$ được gọi là **liên tục trên đoạn $[a; b]$** nếu:',
    options: [
      { id: 'A', text: 'Hàm số liên tục trên khoảng $(a; b)$' },
      { id: 'B', text: 'Hàm số liên tục tại hai đầu mút $a$ và $b$' },
      { id: 'C', text: 'Hàm số liên tục trên khoảng $(a; b)$ đồng thời $\\lim_{x \\to a^+} f(x) = f(a)$ và $\\lim_{x \\to b^-} f(x) = f(b)$' },
      { id: 'D', text: 'Hàm số có $f(a) = f(b)$' }
    ],
    correctOptionId: 'C',
    explanation: 'Định nghĩa: Hàm số liên tục trên đoạn $[a;b]$ nếu nó liên tục trên khoảng $(a;b)$ và liên tục phải tại $a$, liên tục trái tại $b$.'
  },
  {
    prompt: 'Trong các hàm số sau đây, hàm số nào liên tục trên toàn bộ tập số thực $\\mathbb{R}$?',
    options: [
      { id: 'A', text: '$y = \\frac{2x + 1}{x - 1}$' },
      { id: 'B', text: '$y = x^3 - 3x^2 + 5$' },
      { id: 'C', text: '$y = \\tan x$' },
      { id: 'D', text: '$y = \\sqrt{x - 2}$' }
    ],
    correctOptionId: 'B',
    explanation: 'Mọi hàm đa thức đều liên tục trên toàn bộ tập số thực $\\mathbb{R}$.'
  },
  {
    prompt: 'Hàm số phân thức $y = \\frac{3x - 2}{x + 4}$ gián đoạn tại điểm nào sau đây?',
    options: [
      { id: 'A', text: '$x = 4$' },
      { id: 'B', text: '$x = -4$' },
      { id: 'C', text: '$x = \\frac{2}{3}$' },
      { id: 'D', text: '$x = 0$' }
    ],
    correctOptionId: 'B',
    explanation: 'Hàm phân thức hữu tỉ liên tục trên từng khoảng xác định của nó và bị gián đoạn tại điểm làm mẫu số bằng $0$, tức là $x + 4 = 0 \\Leftrightarrow x = -4$.'
  },
  {
    prompt: 'Cho hàm số $f(x) = \\begin{cases} 3x + 2 & \\text{khi } x \\ge 1 \\\\ x + m & \\text{khi } x < 1 \\end{cases}$. Tìm giá trị của tham số $m$ để hàm số liên tục tại $x = 1$.',
    options: [
      { id: 'A', text: '$m = 2$' },
      { id: 'B', text: '$m = 3$' },
      { id: 'C', text: '$m = 4$' },
      { id: 'D', text: '$m = 5$' }
    ],
    correctOptionId: 'C',
    explanation: 'Ta có $f(1) = \\lim_{x \\to 1^+} f(x) = 3(1) + 2 = 5$ và $\\lim_{x \\to 1^-} f(x) = 1 + m$. Để hàm số liên tục tại $x = 1$ thì $1 + m = 5 \\Leftrightarrow m = 4$.'
  },
  {
    prompt: 'Cho hàm số $f(x) = \\begin{cases} \\frac{x^2 - 4}{x - 2} & \\text{khi } x \\ne 2 \\\\ a & \\text{khi } x = 2 \\end{cases}$. Để hàm số liên tục tại $x = 2$ thì giá trị của $a$ bằng:',
    options: [
      { id: 'A', text: '$a = 0$' },
      { id: 'B', text: '$a = 2$' },
      { id: 'C', text: '$a = 4$' },
      { id: 'D', text: '$a = -4$' }
    ],
    correctOptionId: 'C',
    explanation: 'Ta có $\\lim_{x \\to 2} f(x) = \\lim_{x \\to 2} (x + 2) = 4$. Để hàm số liên tục tại $x = 2$ thì $a = f(2) = 4$.'
  },
  {
    prompt: 'Cho hai hàm số $f(x)$ và $g(x)$ cùng liên tục tại điểm $x_0$. Hàm số nào sau đây cũng chắc chắn liên tục tại $x_0$?',
    options: [
      { id: 'A', text: '$y = \\frac{f(x)}{g(x)}$ với mọi $g(x_0)$' },
      { id: 'B', text: '$y = 2f(x) - 3g(x)$' },
      { id: 'C', text: '$y = \\frac{1}{f(x) - g(x)}$' },
      { id: 'D', text: '$y = \\sqrt{f(x)}$ với mọi $f(x_0)$' }
    ],
    correctOptionId: 'B',
    explanation: 'Tổng, hiệu, tích của các hàm số liên tục tại $x_0$ là hàm số liên tục tại $x_0$. Thương chỉ liên tục khi mẫu tại $x_0$ khác $0$.'
  },
  {
    prompt: 'Cho hàm số $f(x)$ liên tục trên đoạn $[a; b]$. Nếu $f(a) \\cdot f(b) < 0$ thì theo hệ quả định lí giá trị trung gian:',
    options: [
      { id: 'A', text: 'Phương trình $f(x) = 0$ vô nghiệm trên $(a; b)$' },
      { id: 'B', text: 'Phương trình $f(x) = 0$ có ít nhất một nghiệm $c \\in (a; b)$' },
      { id: 'C', text: 'Hàm số $f(x)$ luôn đồng biến trên $[a; b]$' },
      { id: 'D', text: 'Phương trình $f(x) = 0$ có duy nhất một nghiệm trên $(a; b)$' }
    ],
    correctOptionId: 'B',
    explanation: 'Nếu hàm số $f(x)$ liên tục trên $[a; b]$ và $f(a) \\cdot f(b) < 0$ thì tồn tại ít nhất một điểm $c \\in (a; b)$ sao cho $f(c) = 0$.'
  },
  {
    prompt: 'Cho phương trình $x^3 + 2x - 5 = 0$. Khoảng nào sau đây chắc chắn chứa ít nhất một nghiệm của phương trình?',
    options: [
      { id: 'A', text: '$(-1; 0)$' },
      { id: 'B', text: '$(0; 1)$' },
      { id: 'C', text: '$(1; 2)$' },
      { id: 'D', text: '$(2; 3)$' }
    ],
    correctOptionId: 'C',
    explanation: 'Đặt $f(x) = x^3 + 2x - 5$ liên tục trên $\\mathbb{R}$. Ta có $f(1) = 1 + 2 - 5 = -2 < 0$ và $f(2) = 8 + 4 - 5 = 7 > 0$. Vì $f(1) \\cdot f(2) < 0$ nên phương trình có nghiệm trong khoảng $(1; 2)$.'
  },
  {
    prompt: 'Hàm số $y = \\sqrt{x - 3}$ liên tục trên tập hợp nào sau đây?',
    options: [
      { id: 'A', text: '$\\mathbb{R}$' },
      { id: 'B', text: '$(-\\infty; 3]$' },
      { id: 'C', text: '$[3; +\\infty)$' },
      { id: 'D', text: '$(0; +\\infty)$' }
    ],
    correctOptionId: 'C',
    explanation: 'Hàm số $y = \\sqrt{x - 3}$ xác định và liên tục trên nửa khoảng $[3; +\\infty)$.'
  },
  {
    prompt: 'Trong các hàm số lượng giác sau, hàm số nào liên tục trên toàn bộ $\\mathbb{R}$?',
    options: [
      { id: 'A', text: '$y = \\tan x$' },
      { id: 'B', text: '$y = \\cot x$' },
      { id: 'C', text: '$y = \\sin x + \\cos x$' },
      { id: 'D', text: '$y = \\frac{1}{\\sin x}$' }
    ],
    correctOptionId: 'C',
    explanation: 'Hai hàm số $y = \\sin x$ và $y = \\cos x$ liên tục trên $\\mathbb{R}$ nên tổng của chúng liên tục trên $\\mathbb{R}$.'
  },
  {
    prompt: 'Cho hàm số $f(x) = \\begin{cases} \\frac{\\sqrt{x + 1} - 1}{x} & \\text{khi } x > 0 \\\\ m & \\text{khi } x \\le 0 \\end{cases}$. Tìm $m$ để hàm số liên tục tại $x = 0$.',
    options: [
      { id: 'A', text: '$m = 1$' },
      { id: 'B', text: '$m = \\frac{1}{2}$' },
      { id: 'C', text: '$m = 0$' },
      { id: 'D', text: '$m = 2$' }
    ],
    correctOptionId: 'B',
    explanation: 'Ta có $\\lim_{x \\to 0^+} f(x) = \\lim_{x \\to 0^+} \\frac{1}{\\sqrt{x + 1} + 1} = \\frac{1}{2}$, và $f(0) = \\lim_{x \\to 0^-} f(x) = m$. Vậy $m = \\frac{1}{2}$.'
  }
];

const b17P1B: CompactMC[] = [
  {
    prompt: 'Nếu hàm số $y = f(x)$ **không** liên tục tại điểm $x_0$ thì ta nói:',
    options: [
      { id: 'A', text: 'Hàm số $f(x)$ đạt cực trị tại $x_0$' },
      { id: 'B', text: 'Hàm số $f(x)$ bị gián đoạn tại điểm $x_0$' },
      { id: 'C', text: 'Hàm số $f(x)$ bằng $0$ tại $x_0$' },
      { id: 'D', text: 'Hàm số $f(x)$ đồng biến tại $x_0$' }
    ],
    correctOptionId: 'B',
    explanation: 'Hàm số không liên tục tại $x_0$ được gọi là gián đoạn tại $x_0$ và $x_0$ được gọi là điểm gián đoạn của hàm số.'
  },
  {
    prompt: 'Hàm số $y = \\frac{x + 1}{x^2 - 9}$ liên tục trên khoảng nào sau đây?',
    options: [
      { id: 'A', text: '$(-\\infty; +\\infty)$' },
      { id: 'B', text: '$(-4; 0)$' },
      { id: 'C', text: '$(-3; 3)$' },
      { id: 'D', text: '$(0; 5)$' }
    ],
    correctOptionId: 'C',
    explanation: 'Hàm số xác định khi $x \\ne \\pm 3$, nên liên tục trên các khoảng $(-\\infty; -3), (-3; 3)$ và $(3; +\\infty)$.'
  },
  {
    prompt: 'Cho hàm số $f(x) = \\begin{cases} \\frac{x^2 - 9}{x - 3} & \\text{khi } x \\ne 3 \\\\ 2m & \\text{khi } x = 3 \\end{cases}$. Tìm $m$ để hàm số liên tục trên $\\mathbb{R}$.',
    options: [
      { id: 'A', text: '$m = 6$' },
      { id: 'B', text: '$m = 3$' },
      { id: 'C', text: '$m = 9$' },
      { id: 'D', text: '$m = 0$' }
    ],
    correctOptionId: 'B',
    explanation: '$\\lim_{x \\to 3} f(x) = \\lim_{x \\to 3} (x + 3) = 6$. Để hàm số liên tục tại $x = 3$ thì $2m = 6 \\Leftrightarrow m = 3$.'
  },
  {
    prompt: 'Cho hàm số $f(x) = \\begin{cases} x^2 + 1 & \\text{khi } x \\ge 2 \\\\ 3x - a & \\text{khi } x < 2 \\end{cases}$. Tìm $a$ để hàm số liên tục tại $x = 2$.',
    options: [
      { id: 'A', text: '$a = 1$' },
      { id: 'B', text: '$a = -1$' },
      { id: 'C', text: '$a = 5$' },
      { id: 'D', text: '$a = 2$' }
    ],
    correctOptionId: 'A',
    explanation: '$f(2) = \\lim_{x \\to 2^+} f(x) = 2^2 + 1 = 5$. Giới hạn trái $\\lim_{x \\to 2^-} f(x) = 6 - a$. Để liên tục thì $6 - a = 5 \\Leftrightarrow a = 1$.'
  },
  {
    prompt: 'Hình ảnh đồ thị của một hàm số **liên tục** trên một khoảng $(a; b)$ là:',
    options: [
      { id: 'A', text: 'Một đường nét đứt gồm các điểm rời rạc' },
      { id: 'B', text: 'Một đường liền nét (không bị đứt quãng) trên khoảng đó' },
      { id: 'C', text: 'Bắt buộc phải là một đường thẳng' },
      { id: 'D', text: 'Một đường song song với trục hoành' }
    ],
    correctOptionId: 'B',
    explanation: 'Đồ thị của hàm số liên tục trên một khoảng là một đường liền nét trên khoảng đó.'
  },
  {
    prompt: 'Cho hàm số $f(x)$ liên tục trên đoạn $[-2; 3]$ có $f(-2) = -4$ và $f(3) = 5$. Theo định lí giá trị trung gian, với mọi số thực $m \\in (-4; 5)$:',
    options: [
      { id: 'A', text: 'Phương trình $f(x) = m$ vô nghiệm trên $(-2; 3)$' },
      { id: 'B', text: 'Tồn tại ít nhất một số $c \\in (-2; 3)$ sao cho $f(c) = m$' },
      { id: 'C', text: 'Hàm số $f(x)$ không đổi dấu trên $[-2; 3]$' },
      { id: 'D', text: '$f(0) = m$' }
    ],
    correctOptionId: 'B',
    explanation: 'Định lí giá trị trung gian: Nếu $f(x)$ liên tục trên $[a;b]$ và $f(a) \\ne f(b)$ thì với mọi giá trị $m$ nằm giữa $f(a)$ và $f(b)$, tồn tại ít nhất một $c \\in (a;b)$ sao cho $f(c) = m$.'
  },
  {
    prompt: 'Cho phương trình $x^4 - 3x^2 + x - 1 = 0$. Nhận xét nào sau đây là đúng?',
    options: [
      { id: 'A', text: 'Phương trình có ít nhất một nghiệm trong khoảng $(-2; -1)$' },
      { id: 'B', text: 'Phương trình vô nghiệm trên $\\mathbb{R}$' },
      { id: 'C', text: 'Phương trình không có nghiệm dương' },
      { id: 'D', text: 'Phương trình chỉ có nghiệm nguyên' }
    ],
    correctOptionId: 'A',
    explanation: 'Đặt $f(x) = x^4 - 3x^2 + x - 1$ liên tục trên $\\mathbb{R}$. Ta có $f(-2) = 16 - 12 - 2 - 1 = 1 > 0$ và $f(-1) = 1 - 3 - 1 - 1 = -4 < 0$. Vì $f(-2)f(-1) < 0$ nên phương trình có ít nhất 1 nghiệm thuộc $(-2; -1)$.'
  },
  {
    prompt: 'Hàm số $y = \\tan x$ liên tục trên khoảng nào sau đây?',
    options: [
      { id: 'A', text: '$(0; \\pi)$' },
      { id: 'B', text: '$\\left(-\\frac{\\pi}{2}; \\frac{\\pi}{2}\\right)$' },
      { id: 'C', text: '$\\mathbb{R}$' },
      { id: 'D', text: '$\\left(0; 2\\pi\\right)$' }
    ],
    correctOptionId: 'B',
    explanation: 'Hàm số $y = \\tan x$ xác định và liên tục trên mỗi khoảng $\\left(-\\frac{\\pi}{2} + k\\pi; \\frac{\\pi}{2} + k\\pi\\right), k \\in \\mathbb{Z}$.'
  },
  {
    prompt: 'Cho hàm số $f(x) = \\frac{x^2 + 1}{x^2 - 5x + 6}$. Số điểm gián đoạn của hàm số trên $\\mathbb{R}$ là:',
    options: [
      { id: 'A', text: '$0$' },
      { id: 'B', text: '$1$' },
      { id: 'C', text: '$2$' },
      { id: 'D', text: '$3$' }
    ],
    correctOptionId: 'C',
    explanation: 'Mẫu số $x^2 - 5x + 6 = 0 \\Leftrightarrow x = 2$ hoặc $x = 3$. Vậy hàm số có $2$ điểm gián đoạn.'
  },
  {
    prompt: 'Cho hàm số $f(x)$ liên tục tại $x = 3$ và biết $\\lim_{x \\to 3} [2f(x) + 1] = 9$. Giá trị của $f(3)$ bằng:',
    options: [
      { id: 'A', text: '$3$' },
      { id: 'B', text: '$4$' },
      { id: 'C', text: '$5$' },
      { id: 'D', text: '$9$' }
    ],
    correctOptionId: 'B',
    explanation: 'Vì $f(x)$ liên tục tại $x = 3$ nên $\\lim_{x \\to 3} f(x) = f(3)$. Ta có $2f(3) + 1 = 9 \\Leftrightarrow f(3) = 4$.'
  },
  {
    prompt: 'Cho hàm số $f(x) = \\begin{cases} \\frac{x^3 - 1}{x - 1} & \\text{khi } x \\ne 1 \\\\ k & \\text{khi } x = 1 \\end{cases}$. Để hàm số liên tục tại $x = 1$ thì $k$ bằng:',
    options: [
      { id: 'A', text: '$k = 1$' },
      { id: 'B', text: '$k = 2$' },
      { id: 'C', text: '$k = 3$' },
      { id: 'D', text: '$k = 0$' }
    ],
    correctOptionId: 'C',
    explanation: '$\\lim_{x \\to 1} \\frac{x^3 - 1}{x - 1} = \\lim_{x \\to 1} (x^2 + x + 1) = 3$. Vậy $k = 3$.'
  },
  {
    prompt: 'Cho phương trình $2x^3 - 6x + 1 = 0$. Trên đoạn $[-2; 2]$, phương trình này có bao nhiêu nghiệm phân biệt?',
    options: [
      { id: 'A', text: '$0$' },
      { id: 'B', text: '$1$' },
      { id: 'C', text: '$2$' },
      { id: 'D', text: '$3$' }
    ],
    correctOptionId: 'D',
    explanation: 'Đặt $f(x) = 2x^3 - 6x + 1$ liên tục trên $\\mathbb{R}$. Ta có $f(-2) = -3 < 0, f(0) = 1 > 0, f(1) = -3 < 0, f(2) = 5 > 0$. Hàm số đổi dấu trên 3 khoảng $(-2;0), (0;1), (1;2)$ nên phương trình bậc ba có đủ $3$ nghiệm phân biệt trên $[-2; 2]$.'
  }
];

const b17P2A: CompactTF[] = [
  {
    stem: 'Cho hàm số $f(x) = \\begin{cases} \\frac{x^2 - x - 6}{x - 3} & \\text{khi } x > 3 \\\\ 2x + m & \\text{khi } x \\le 3 \\end{cases}$ (với $m$ là tham số thực). Xét tính đúng sai của các mệnh đề sau:',
    statements: [
      {
        id: 'a',
        text: 'Trên khoảng $(-\\infty; 3)$ và khoảng $(3; +\\infty)$, hàm số $f(x)$ luôn liên tục với mọi $m$.',
        isTrue: true,
        explanation: 'Trên $(-\\infty; 3)$ hàm số là đa thức bậc nhất; trên $(3; +\\infty)$ hàm số là phân thức hữu tỉ có mẫu khác $0$ nên liên tục.'
      },
      {
        id: 'b',
        text: 'Giới hạn bên phải của hàm số tại $x = 3$ là $\\lim_{x \\to 3^+} f(x) = 5$.',
        isTrue: true,
        explanation: '$\\lim_{x \\to 3^+} \\frac{(x - 3)(x + 2)}{x - 3} = \\lim_{x \\to 3^+} (x + 2) = 5$.'
      },
      {
        id: 'c',
        text: 'Tại $x = 3$, ta có $f(3) = \\lim_{x \\to 3^-} f(x) = 6 + m$.',
        isTrue: true,
        explanation: 'Vì nhánh $x \\le 3$ có $f(x) = 2x + m$ nên $f(3) = \\lim_{x \\to 3^-} (2x + m) = 6 + m$.'
      },
      {
        id: 'd',
        text: 'Hàm số $f(x)$ liên tục trên toàn bộ $\\mathbb{R}$ khi và chỉ khi $m = 1$.',
        isTrue: false,
        explanation: 'Để hàm số liên tục tại $x = 3$ thì $6 + m = 5 \\Leftrightarrow m = -1$, không phải $m = 1$.'
      }
    ]
  },
  {
    stem: 'Xét phương trình $x^3 - 3x + 1 = 0$ và đặt hàm số $f(x) = x^3 - 3x + 1$. Xét tính đúng sai của các mệnh đề sau:',
    statements: [
      {
        id: 'a',
        text: 'Hàm số $f(x) = x^3 - 3x + 1$ là hàm đa thức nên liên tục trên toàn bộ tập số thực $\\mathbb{R}$.',
        isTrue: true,
        explanation: 'Mọi hàm đa thức đều liên tục trên $\\mathbb{R}$.'
      },
      {
        id: 'b',
        text: 'Ta có $f(-2) = -1, f(0) = 1, f(1) = -1$ và $f(2) = 3$.',
        isTrue: true,
        explanation: 'Thay trực tiếp: $f(-2) = -8 + 6 + 1 = -1; f(0) = 1; f(1) = 1 - 3 + 1 = -1; f(2) = 8 - 6 + 1 = 3$.'
      },
      {
        id: 'c',
        text: 'Trên khoảng $(0; 1)$, phương trình $f(x) = 0$ vô nghiệm.',
        isTrue: false,
        explanation: 'Vì $f(0) \\cdot f(1) = 1 \\cdot (-1) = -1 < 0$ và $f(x)$ liên tục trên $[0; 1]$ nên phương trình có ít nhất 1 nghiệm thuộc khoảng $(0; 1)$.'
      },
      {
        id: 'd',
        text: 'Phương trình $x^3 - 3x + 1 = 0$ có đúng $3$ nghiệm thực phân biệt thuộc đoạn $[-2; 2]$.',
        isTrue: true,
        explanation: 'Vì $f(-2)f(0) < 0, f(0)f(1) < 0, f(1)f(2) < 0$ nên phương trình có ít nhất 3 nghiệm phân biệt thuộc $(-2; 0), (0; 1), (1; 2)$. Mặt khác phương trình bậc 3 có tối đa 3 nghiệm nên có đúng 3 nghiệm.'
      }
    ]
  }
];

const b17P2B: CompactTF[] = [
  {
    stem: 'Cho hàm số $f(x) = \\begin{cases} \\frac{\\sqrt{2x + 1} - 3}{x - 4} & \\text{khi } x \\ne 4 \\\\ a & \\text{khi } x = 4 \\end{cases}$ (với $a$ là tham số thực). Xét tính đúng sai của các mệnh đề sau:',
    statements: [
      {
        id: 'a',
        text: 'Tập xác định của hàm số $f(x)$ là $D = \\left[-\\frac{1}{2}; +\\infty\\right)$.',
        isTrue: true,
        explanation: 'Điều kiện căn thức: $2x + 1 \\ge 0 \\Leftrightarrow x \\ge -\\frac{1}{2}$, tại $x = 4$ hàm số xác định bằng $a$.'
      },
      {
        id: 'b',
        text: 'Với $x \\ge -\\frac{1}{2}$ và $x \\ne 4$, ta có $\\frac{\\sqrt{2x + 1} - 3}{x - 4} = \\frac{2}{\\sqrt{2x + 1} + 3}$.',
        isTrue: true,
        explanation: 'Nhân lượng liên hợp: $(\\sqrt{2x+1} - 3)(\\sqrt{2x+1} + 3) = 2x + 1 - 9 = 2(x - 4)$, rút gọn $(x-4)$ được $\\frac{2}{\\sqrt{2x+1} + 3}$.'
      },
      {
        id: 'c',
        text: 'Giới hạn $\\lim_{x \\to 4} f(x)$ bằng $\\frac{1}{6}$.',
        isTrue: false,
        explanation: '$\\lim_{x \\to 4} f(x) = \\frac{2}{\\sqrt{9} + 3} = \\frac{2}{6} = \\frac{1}{3}$, không phải $\\frac{1}{6}$.'
      },
      {
        id: 'd',
        text: 'Hàm số liên tục tại $x = 4$ khi và chỉ khi $a = \\frac{1}{3}$.',
        isTrue: true,
        explanation: 'Để hàm số liên tục tại $x = 4$ thì $f(4) = \\lim_{x \\to 4} f(x) \\Leftrightarrow a = \\frac{1}{3}$.'
      }
    ]
  },
  {
    stem: 'Cho phương trình $m(x - 1)(x + 2) + 2x - 1 = 0$ (với $m$ là tham số thực bất kì). Đặt $f(x) = m(x - 1)(x + 2) + 2x - 1$. Xét tính đúng sai của các mệnh đề sau:',
    statements: [
      {
        id: 'a',
        text: 'Với mọi giá trị của tham số $m$, hàm số $f(x)$ luôn liên tục trên $\\mathbb{R}$.',
        isTrue: true,
        explanation: 'Với mọi $m \\in \\mathbb{R}$, $f(x)$ là hàm đa thức nên liên tục trên $\\mathbb{R}$.'
      },
      {
        id: 'b',
        text: 'Giá trị của $f(1)$ bằng $1$ (không phụ thuộc vào $m$).',
        isTrue: true,
        explanation: 'Thay $x = 1$: $f(1) = m(0)(3) + 2(1) - 1 = 1$.'
      },
      {
        id: 'c',
        text: 'Giá trị của $f(-2)$ bằng $5$ (không phụ thuộc vào $m$).',
        isTrue: false,
        explanation: 'Thay $x = -2$: $f(-2) = m(-3)(0) + 2(-2) - 1 = -5$, không phải $5$.'
      },
      {
        id: 'd',
        text: 'Phương trình đã cho luôn có ít nhất một nghiệm thuộc khoảng $(-2; 1)$ với mọi giá trị của tham số $m$.',
        isTrue: true,
        explanation: 'Vì $f(x)$ liên tục trên $[-2; 1]$ và $f(-2) \\cdot f(1) = (-5) \\cdot 1 = -5 < 0$ với mọi $m$, nên phương trình luôn có nghiệm trong $(-2; 1)$.'
      }
    ]
  }
];

const b17P3A: CompactSA[] = [
  {
    prompt: 'Tìm giá trị của tham số $m$ để hàm số $f(x) = \\begin{cases} \\frac{x^2 - 16}{x - 4} & \\text{khi } x \\ne 4 \\\\ m & \\text{khi } x = 4 \\end{cases}$ liên tục tại điểm $x = 4$.',
    correctAnswer: '8',
    acceptedAnswers: ['8'],
    explanation: 'Ta có $\\lim_{x \\to 4} f(x) = \\lim_{x \\to 4} (x + 4) = 8$. Vậy $m = f(4) = 8$.'
  },
  {
    prompt: 'Tìm giá trị của tham số $a$ để hàm số $f(x) = \\begin{cases} x^2 + 3x & \\text{khi } x \\ge 2 \\\\ ax + 4 & \\text{khi } x < 2 \\end{cases}$ liên tục trên $\\mathbb{R}$.',
    correctAnswer: '3',
    acceptedAnswers: ['3'],
    explanation: 'Tại $x = 2$, $f(2) = \\lim_{x \\to 2^+} f(x) = 2^2 + 3(2) = 10$ và $\\lim_{x \\to 2^-} f(x) = 2a + 4$. Để hàm số liên tục thì $2a + 4 = 10 \\Leftrightarrow a = 3$.'
  },
  {
    prompt: 'Tìm giá trị của tham số $k$ để hàm số $f(x) = \\begin{cases} \\frac{\\sqrt{x + 8} - 3}{x - 1} & \\text{khi } x > 1 \\\\ \\frac{k}{6} & \\text{khi } x \\le 1 \\end{cases}$ liên tục tại $x = 1$.',
    correctAnswer: '1',
    acceptedAnswers: ['1'],
    explanation: 'Ta có $\\lim_{x \\to 1^+} f(x) = \\lim_{x \\to 1^+} \\frac{1}{\\sqrt{x+8} + 3} = \\frac{1}{6}$. Để liên tục tại $x = 1$ thì $\\frac{k}{6} = \\frac{1}{6} \\Leftrightarrow k = 1$.'
  },
  {
    prompt: 'Cho hàm số $f(x) = \\frac{2x + 5}{x^3 - 4x}$. Hỏi hàm số $f(x)$ bị gián đoạn tại bao nhiêu điểm trên $\\mathbb{R}$?',
    correctAnswer: '3',
    acceptedAnswers: ['3'],
    explanation: 'Mẫu số $x^3 - 4x = 0 \\Leftrightarrow x(x^2 - 4) = 0 \\Leftrightarrow x \\in \\{-2; 0; 2\\}$. Vậy hàm số gián đoạn tại $3$ điểm.'
  }
];

const b17P3B: CompactSA[] = [
  {
    prompt: 'Tìm giá trị của tham số $m$ để hàm số $f(x) = \\begin{cases} \\frac{x^2 + 2x - 15}{x - 3} & \\text{khi } x \\ne 3 \\\\ m + 1 & \\text{khi } x = 3 \\end{cases}$ liên tục tại $x = 3$.',
    correctAnswer: '7',
    acceptedAnswers: ['7'],
    explanation: 'Ta có $\\lim_{x \\to 3} \\frac{(x - 3)(x + 5)}{x - 3} = 3 + 5 = 8$. Để liên tục tại $x = 3$ thì $m + 1 = 8 \\Leftrightarrow m = 7$.'
  },
  {
    prompt: 'Tìm giá trị của tham số $b$ để hàm số $f(x) = \\begin{cases} 4x - 1 & \\text{khi } x \\ge 1 \\\\ x^2 + b & \\text{khi } x < 1 \\end{cases}$ liên tục tại $x = 1$.',
    correctAnswer: '2',
    acceptedAnswers: ['2'],
    explanation: '$f(1) = \\lim_{x \\to 1^+} f(x) = 3$ và $\\lim_{x \\to 1^-} f(x) = 1 + b$. Vậy $1 + b = 3 \\Leftrightarrow b = 2$.'
  },
  {
    prompt: 'Cho hàm số $f(x) = \\begin{cases} \\frac{x - 5}{\\sqrt{x + 4} - 3} & \\text{khi } x > 5 \\\\ m & \\text{khi } x \\le 5 \\end{cases}$. Tìm $m$ để hàm số liên tục tại $x = 5$.',
    correctAnswer: '6',
    acceptedAnswers: ['6'],
    explanation: 'Khi $x > 5$, $\\frac{x - 5}{\\sqrt{x+4} - 3} = \\sqrt{x+4} + 3 \\to 3 + 3 = 6$ khi $x \\to 5^+$. Vậy $m = 6$.'
  },
  {
    prompt: 'Cho phương trình $x^3 - 6x^2 + 9x - 1 = 0$. Biết phương trình có đúng $3$ nghiệm thực phân biệt thuộc các khoảng $(0; 1), (1; 3)$ và $(3; a)$ với $a$ là số nguyên dương nhỏ nhất. Tìm $a$.',
    correctAnswer: '4',
    acceptedAnswers: ['4'],
    explanation: 'Đặt $f(x) = x^3 - 6x^2 + 9x - 1$. Ta có $f(3) = 27 - 54 + 27 - 1 = -1 < 0$ và $f(4) = 64 - 96 + 36 - 1 = 3 > 0$. Vì $f(3)f(4) < 0$ nên số nguyên dương nhỏ nhất $a > 3$ là $a = 4$.'
  }
];

const b17P4A: CompactSO[] = [
  {
    prompt: 'Sắp xếp các bước xét tính liên tục của hàm số $y = f(x)$ tại điểm $x = x_0$:',
    steps: [
      { id: 's1', text: 'Kiểm tra $x_0$ thuộc tập xác định của hàm số và tính giá trị $f(x_0)$.' },
      { id: 's2', text: 'Tính giới hạn $\\lim_{x \\to x_0} f(x)$ (hoặc tính $\\lim_{x \\to x_0^+} f(x)$ và $\\lim_{x \\to x_0^-} f(x)$).' },
      { id: 's3', text: 'So sánh giá trị của giới hạn $\\lim_{x \\to x_0} f(x)$ với giá trị hàm số $f(x_0)$.' },
      { id: 's4', text: 'Nếu $\\lim_{x \\to x_0} f(x) = f(x_0)$ thì kết luận hàm số liên tục tại $x_0$; ngược lại kết luận hàm số gián đoạn tại $x_0$.' }
    ],
    correctOrder: ['s1', 's2', 's3', 's4'],
    explanation: 'Quy trình 4 bước chuẩn để xét tính liên tục của hàm số tại một điểm.'
  },
  {
    prompt: 'Sắp xếp các bước chứng minh phương trình $x^3 + 3x - 2 = 0$ có ít nhất một nghiệm thuộc khoảng $(0; 1)$:',
    steps: [
      { id: 's1', text: 'Đặt $f(x) = x^3 + 3x - 2$, nhận xét $f(x)$ là hàm đa thức nên liên tục trên $\\mathbb{R}$, do đó liên tục trên đoạn $[0; 1]$.' },
      { id: 's2', text: 'Tính giá trị của hàm số tại hai đầu mút: $f(0) = -2$ và $f(1) = 1 + 3 - 2 = 2$.' },
      { id: 's3', text: 'Nhận xét $f(0) \\cdot f(1) = (-2) \\cdot 2 = -4 < 0$ (hai giá trị trái dấu).' },
      { id: 's4', text: 'Theo hệ quả định lí giá trị trung gian, kết luận phương trình $f(x) = 0$ có ít nhất một nghiệm $c \\in (0; 1)$.' }
    ],
    correctOrder: ['s1', 's2', 's3', 's4'],
    explanation: 'Vận dụng hệ quả của định lí giá trị trung gian cho hàm số liên tục trên đoạn $[a; b]$.'
  },
  {
    prompt: 'Sắp xếp các bước tìm tham số $m$ để hàm số $f(x) = \\begin{cases} \\frac{x^2 - 4}{x - 2} & \\text{khi } x > 2 \\\\ mx + 1 & \\text{khi } x \\le 2 \\end{cases}$ liên tục trên $\\mathbb{R}$:',
    steps: [
      { id: 's1', text: 'Khẳng định trên các khoảng $(-\\infty; 2)$ và $(2; +\\infty)$, hàm số luôn liên tục với mọi $m$.' },
      { id: 's2', text: 'Tại điểm nối $x = 2$, tính $f(2) = \\lim_{x \\to 2^-} (mx + 1) = 2m + 1$.' },
      { id: 's3', text: 'Tính giới hạn phải $\\lim_{x \\to 2^+} f(x) = \\lim_{x \\to 2^+} (x + 2) = 4$.' },
      { id: 's4', text: 'Cho $\\lim_{x \\to 2^+} f(x) = f(2) \\Leftrightarrow 2m + 1 = 4 \\Leftrightarrow m = \\frac{3}{2}$ và kết luận.' }
    ],
    correctOrder: ['s1', 's2', 's3', 's4'],
    explanation: 'Hàm số liên tục trên $\\mathbb{R}$ khi và chỉ khi nó liên tục tại điểm phân nhánh $x = 2$.'
  },
  {
    prompt: 'Sắp xếp các bước chứng minh phương trình $\\cos x = x$ có ít nhất một nghiệm trên khoảng $\\left(0; \\frac{\\pi}{2}\\right)$:',
    steps: [
      { id: 's1', text: 'Chuyển phương trình về dạng $f(x) = \\cos x - x = 0$.' },
      { id: 's2', text: 'Nhận xét hàm số $f(x) = \\cos x - x$ liên tục trên $\\mathbb{R}$ nên liên tục trên đoạn $\\left[0; \\frac{\\pi}{2}\\right]$.' },
      { id: 's3', text: 'Tính $f(0) = \\cos 0 - 0 = 1 > 0$ và $f\\left(\\frac{\\pi}{2}\\right) = \\cos\\frac{\\pi}{2} - \\frac{\\pi}{2} = -\\frac{\\pi}{2} < 0$.' },
      { id: 's4', text: 'Vì $f(0) \\cdot f\\left(\\frac{\\pi}{2}\\right) < 0$ nên kết luận phương trình có ít nhất một nghiệm thuộc $\\left(0; \\frac{\\pi}{2}\\right)$.' }
    ],
    correctOrder: ['s1', 's2', 's3', 's4'],
    explanation: 'Đưa phương trình $g(x) = h(x)$ về dạng $f(x) = g(x) - h(x) = 0$ rồi áp dụng định lí giá trị trung gian.'
  }
];

const b17P4B = [b17P4A[2], b17P4A[1], b17P4A[0], b17P4A[3]];

// ============================================================================
// ÔN TẬP CHƯƠNG V (Tổng hợp toàn chương V: Giới hạn. Hàm số liên tục)
// ============================================================================

const ch5RevP1A = [
  b15P1A[2], b15P1A[5], b15P1A[8], b15P1A[11],
  b16P1A[1], b16P1A[3], b16P1A[5], b16P1A[9],
  b17P1A[2], b17P1A[4], b17P1A[8], b17P1A[11]
];

const ch5RevP1B = [
  b15P1B[3], b15P1B[5], b15P1B[8], b15P1B[11],
  b16P1B[2], b16P1B[3], b16P1B[6], b16P1B[7],
  b17P1B[2], b17P1B[3], b17P1B[6], b17P1B[11]
];

const ch5RevP2A = [b15P2A[1], b17P2A[1]];
const ch5RevP2B = [b16P2B[1], b17P2B[1]];
const ch5RevP3A = [b15P3A[1], b15P3A[2], b16P3A[0], b17P3A[1]];
const ch5RevP3B = [b15P3B[1], b16P3B[1], b16P3B[3], b17P3B[0]];
const ch5RevP4A = [b15P4A[1], b16P4A[1], b17P4A[1], b17P4A[2]];
const ch5RevP4B = [b15P4A[2], b16P4A[2], b17P4A[0], b17P4A[3]];

export const chapter5LessonExams: Record<string, ExamSet[]> = {
  'bai-15': [
    buildCompactLessonExamSet(
      'bai-15-de-1',
      'Đề ôn Bài 15 – Đề số 01',
      'Bài 15. Giới hạn của dãy số',
      1,
      b15P1A, b15P2A, b15P3A, b15P4A
    ),
    buildCompactLessonExamSet(
      'bai-15-de-2',
      'Đề ôn Bài 15 – Đề số 02',
      'Bài 15. Giới hạn của dãy số',
      2,
      b15P1B, b15P2B, b15P3B, b15P4B
    )
  ],
  'bai-16': [
    buildCompactLessonExamSet(
      'bai-16-de-1',
      'Đề ôn Bài 16 – Đề số 01',
      'Bài 16. Giới hạn của hàm số',
      1,
      b16P1A, b16P2A, b16P3A, b16P4A
    ),
    buildCompactLessonExamSet(
      'bai-16-de-2',
      'Đề ôn Bài 16 – Đề số 02',
      'Bài 16. Giới hạn của hàm số',
      2,
      b16P1B, b16P2B, b16P3B, b16P4B
    )
  ],
  'bai-17': [
    buildCompactLessonExamSet(
      'bai-17-de-1',
      'Đề ôn Bài 17 – Đề số 01',
      'Bài 17. Hàm số liên tục',
      1,
      b17P1A, b17P2A, b17P3A, b17P4A
    ),
    buildCompactLessonExamSet(
      'bai-17-de-2',
      'Đề ôn Bài 17 – Đề số 02',
      'Bài 17. Hàm số liên tục',
      2,
      b17P1B, b17P2B, b17P3B, b17P4B
    )
  ],
  'on-tap-chuong-5': [
    buildCompactLessonExamSet(
      'on-tap-chuong-5-de-1',
      'Đề ôn Chương V – Đề số 01',
      'Ôn tập chương V. Giới hạn. Hàm số liên tục',
      1,
      ch5RevP1A, ch5RevP2A, ch5RevP3A, ch5RevP4A
    ),
    buildCompactLessonExamSet(
      'on-tap-chuong-5-de-2',
      'Đề ôn Chương V – Đề số 02',
      'Ôn tập chương V. Giới hạn. Hàm số liên tục',
      2,
      ch5RevP1B, ch5RevP2B, ch5RevP3B, ch5RevP4B
    )
  ]
};
