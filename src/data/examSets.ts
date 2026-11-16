import { ExamSet } from '../types/exam';

export const examSets: ExamSet[] = [
  // ============================================================================
  // ĐỀ 01: BÀI TẬP & ĐỀ KHẢO SÁT TOÁN 11 (GV NGUYỄN NGỌC THANH)
  // ============================================================================
  {
    id: 'de-01',
    title: 'đề ôn gk1 01',
    subtitle: 'Lượng Giác, Dãy Số - Cấp Số Cộng - Cấp Số Nhân & Mẫu Số Liệu Ghép Nhóm',
    grade: 11,
    durationMinutes: 90,
    totalPoints: 10,
    description:
      'Đề khảo sát đánh giá năng lực môn Toán lớp 11 chuẩn cấu trúc 4 phần (22 câu hỏi): Hàm số lượng giác và phương trình lượng giác, Dãy số - Cấp số cộng - Cấp số nhân, và Các số đặc trưng đo xu thế trung tâm của mẫu số liệu ghép nhóm.',
    part1: [
      {
        id: 'd1-p1-q1',
        part: 'part1',
        number: 1,
        topic: 'Góc lượng giác',
        prompt: 'Đổi số đo góc lượng giác $120^\\circ$ sang radian.',
        options: [
          { key: 'A', content: '$\\frac{\\pi}{3}$' },
          { key: 'B', content: '$\\frac{\\pi}{6}$' },
          { key: 'C', content: '$\\frac{3\\pi}{2}$' },
          { key: 'D', content: '$\\frac{2\\pi}{3}$' },
        ],
        correctAnswer: 'D',
        explanation:
          'Ta có công thức chuyển đổi từ độ sang radian là $\\alpha = \\frac{a \\cdot \\pi}{180}$. Với $a = 120^\\circ$, ta có $\\alpha = \\frac{120 \\cdot \\pi}{180} = \\frac{2\\pi}{3}$.',
        pedagogicalTip: 'Công thức đổi từ độ sang radian: $\\alpha = \\frac{a \\cdot \\pi}{180}$.',
        points: 0.25,
      },
      {
        id: 'd1-p1-q2',
        part: 'part1',
        number: 2,
        topic: 'Hệ thức lượng giác cơ bản',
        prompt: 'Trong các hệ thức lượng giác sau, hệ thức nào đúng?',
        options: [
          { key: 'A', content: '$\\sin^2\\alpha - \\cos^2\\alpha = 1$' },
          { key: 'B', content: '$\\sin^2\\alpha + \\cos^2\\alpha = 0$' },
          { key: 'C', content: '$\\sin^2\\alpha + \\cos^2\\alpha = 1$' },
          { key: 'D', content: '$\\sin\\alpha + \\cos\\alpha = 1$' },
        ],
        correctAnswer: 'C',
        explanation:
          'Theo công thức lượng giác cơ bản, ta luôn có $\\sin^2\\alpha + \\cos^2\\alpha = 1$ với mọi $\\alpha$.',
        pedagogicalTip: 'Hệ thức lượng giác cơ bản quan trọng nhất là $\\sin^2\\alpha + \\cos^2\\alpha = 1$ với mọi $\\alpha \\in \\mathbb{R}$.',
        points: 0.25,
      },
      {
        id: 'd1-p1-q3',
        part: 'part1',
        number: 3,
        topic: 'Hàm số lượng giác',
        prompt: 'Tập xác định của hàm số $y = \\tan x$ là:',
        options: [
          { key: 'A', content: '$\\mathbb{R}$' },
          { key: 'B', content: '$\\mathbb{R} \\setminus \\left\\{\\frac{\\pi}{2} + k\\pi, k \\in \\mathbb{Z}\\right\\}$' },
          { key: 'C', content: '$\\mathbb{R} \\setminus \\{k\\pi, k \\in \\mathbb{Z}\\}$' },
          { key: 'D', content: '$[-1; 1]$' },
        ],
        correctAnswer: 'B',
        explanation:
          'Hàm số $y = \\tan x = \\frac{\\sin x}{\\cos x}$ xác định khi $\\cos x \\neq 0 \\Leftrightarrow x \\neq \\frac{\\pi}{2} + k\\pi\\ (k \\in \\mathbb{Z})$. Vậy tập xác định là $D = \\mathbb{R} \\setminus \\left\\{\\frac{\\pi}{2} + k\\pi, k \\in \\mathbb{Z}\\right\\}$.',
        pedagogicalTip: 'Hàm số $y = \\tan x$ xác định khi mẫu số $\\cos x \\neq 0 \\Leftrightarrow x \\neq \\frac{\\pi}{2} + k\\pi\\ (k \\in \\mathbb{Z})$.',
        points: 0.25,
      },
      {
        id: 'd1-p1-q4',
        part: 'part1',
        number: 4,
        topic: 'Phương trình lượng giác cơ bản',
        prompt: 'Nghiệm của phương trình $\\cos x = \\frac{1}{2}$ là:',
        options: [
          { key: 'A', content: '$x = \\pm\\frac{\\pi}{3} + k2\\pi\\ (k \\in \\mathbb{Z})$' },
          { key: 'B', content: '$x = \\pm\\frac{\\pi}{6} + k2\\pi\\ (k \\in \\mathbb{Z})$' },
          { key: 'C', content: '$x = \\frac{\\pi}{3} + k\\pi\\ (k \\in \\mathbb{Z})$' },
          { key: 'D', content: '$x = \\frac{\\pi}{6} + k\\pi\\ (k \\in \\mathbb{Z})$' },
        ],
        correctAnswer: 'A',
        explanation:
          'Ta có $\\cos x = \\frac{1}{2} \\Leftrightarrow \\cos x = \\cos\\frac{\\pi}{3} \\Leftrightarrow x = \\pm\\frac{\\pi}{3} + k2\\pi\\ (k \\in \\mathbb{Z})$.',
        pedagogicalTip: 'Phương trình $\\cos x = \\cos\\alpha$ có nghiệm $x = \\pm\\alpha + k2\\pi\\ (k \\in \\mathbb{Z})$.',
        points: 0.25,
      },
      {
        id: 'd1-p1-q5',
        part: 'part1',
        number: 5,
        topic: 'Giá trị lượng giác của một góc',
        prompt: 'Cho $\\sin\\alpha = \\frac{3}{5}$ và $\\frac{\\pi}{2} < \\alpha < \\pi$. Tính giá trị của $\\cos\\alpha$.',
        options: [
          { key: 'A', content: '$-\\frac{4}{5}$' },
          { key: 'B', content: '$-\\frac{16}{25}$' },
          { key: 'C', content: '$\\frac{4}{5}$' },
          { key: 'D', content: '$\\frac{16}{25}$' },
        ],
        correctAnswer: 'A',
        explanation:
          'Ta có $\\sin^2\\alpha + \\cos^2\\alpha = 1 \\Rightarrow \\cos^2\\alpha = 1 - \\sin^2\\alpha = 1 - \\left(\\frac{3}{5}\\right)^2 = \\frac{16}{25}$. Vì $\\frac{\\pi}{2} < \\alpha < \\pi$ nên $\\cos\\alpha < 0$. Do đó $\\cos\\alpha = -\\sqrt{\\frac{16}{25}} = -\\frac{4}{5}$.',
        pedagogicalTip: 'Trên khoảng $\\left(\\frac{\\pi}{2}; \\pi\\right)$ (góc phần tư thứ II), $\\sin\\alpha > 0$ và $\\cos\\alpha < 0$.',
        points: 0.25,
      },
      {
        id: 'd1-p1-q6',
        part: 'part1',
        number: 6,
        topic: 'Tập giá trị của hàm số lượng giác',
        prompt: 'Tập giá trị của hàm số $y = 3\\sin x + 2$ là:',
        options: [
          { key: 'A', content: '$[-3; 3]$' },
          { key: 'B', content: '$[-1; 1]$' },
          { key: 'C', content: '$[-1; 5]$' },
          { key: 'D', content: '$[2; 5]$' },
        ],
        correctAnswer: 'C',
        explanation:
          'Ta có $-1 \\le \\sin x \\le 1 \\Leftrightarrow -3 \\le 3\\sin x \\le 3 \\Leftrightarrow -3 + 2 \\le 3\\sin x + 2 \\le 3 + 2 \\Leftrightarrow -1 \\le y \\le 5$. Vậy tập giá trị của hàm số là $T = [-1; 5]$.',
        pedagogicalTip: 'Xuất phát từ bất đẳng thức $-1 \\le \\sin x \\le 1$ với mọi $x \\in \\mathbb{R}$ để tìm miền giá trị của $y$.',
        points: 0.25,
      },
      {
        id: 'd1-p1-q7',
        part: 'part1',
        number: 7,
        topic: 'Tính tăng, giảm của dãy số',
        prompt: 'Cho dãy số $(u_n)$ với $u_n = 2n - 1$. Khẳng định nào sau đây là đúng?',
        options: [
          { key: 'A', content: '$(u_n)$ là dãy số tăng.' },
          { key: 'B', content: '$(u_n)$ là dãy số không đổi.' },
          { key: 'C', content: '$(u_n)$ không tăng, không giảm.' },
          { key: 'D', content: '$(u_n)$ là dãy số giảm.' },
        ],
        correctAnswer: 'A',
        explanation:
          'Xét hiệu $u_{n+1} - u_n = [2(n + 1) - 1] - (2n - 1) = 2n + 2 - 1 - 2n + 1 = 2 > 0$ với mọi $n \\in \\mathbb{N}^*$. Vậy dãy số $(u_n)$ là dãy số tăng.',
        pedagogicalTip: 'Nếu $u_{n+1} - u_n > 0$ với mọi $n \\in \\mathbb{N}^*$ thì dãy số $(u_n)$ là dãy số tăng.',
        points: 0.25,
      },
      {
        id: 'd1-p1-q8',
        part: 'part1',
        number: 8,
        topic: 'Cấp số cộng',
        prompt: 'Cho cấp số cộng $(u_n)$ có số hạng đầu $u_1 = 3$ và $u_2 = 5$. Công sai $d$ của cấp số cộng này là:',
        options: [
          { key: 'A', content: '$2$' },
          { key: 'B', content: '$-2$' },
          { key: 'C', content: '$15$' },
          { key: 'D', content: '$8$' },
        ],
        correctAnswer: 'A',
        explanation:
          'Công sai của cấp số cộng là $d = u_2 - u_1 = 5 - 3 = 2$.',
        pedagogicalTip: 'Công sai của cấp số cộng được xác định bởi $d = u_{n+1} - u_n = u_2 - u_1$.',
        points: 0.25,
      },
      {
        id: 'd1-p1-q9',
        part: 'part1',
        number: 9,
        topic: 'Số hạng tổng quát của cấp số cộng',
        prompt: 'Cho cấp số cộng $(u_n)$ có $u_1 = -2$ và công sai $d = 3$. Số hạng tổng quát $u_n$ là:',
        options: [
          { key: 'A', content: '$u_n = 3n - 2$' },
          { key: 'B', content: '$u_n = 3n - 5$' },
          { key: 'C', content: '$u_n = -2n + 3$' },
          { key: 'D', content: '$u_n = -5n + 3$' },
        ],
        correctAnswer: 'B',
        explanation:
          'Số hạng tổng quát của cấp số cộng là $u_n = u_1 + (n - 1)d = -2 + (n - 1)3 = 3n - 5$.',
        pedagogicalTip: 'Áp dụng công thức số hạng tổng quát $u_n = u_1 + (n - 1)d$ với $n \\ge 2$.',
        points: 0.25,
      },
      {
        id: 'd1-p1-q10',
        part: 'part1',
        number: 10,
        topic: 'Cấp số nhân',
        prompt: 'Cho cấp số nhân $(u_n)$ có số hạng đầu $u_1 = 2$ và công bội $q = 3$. Số hạng thứ ba $u_3$ bằng:',
        options: [
          { key: 'A', content: '$12$' },
          { key: 'B', content: '$18$' },
          { key: 'C', content: '$8$' },
          { key: 'D', content: '$6$' },
        ],
        correctAnswer: 'B',
        explanation:
          'Số hạng thứ ba của cấp số nhân là $u_3 = u_1 \\cdot q^2 = 2 \\cdot 3^2 = 2 \\cdot 9 = 18$.',
        pedagogicalTip: 'Số hạng tổng quát của cấp số nhân là $u_n = u_1 \\cdot q^{n-1}$.',
        points: 0.25,
      },
      {
        id: 'd1-p1-q11',
        part: 'part1',
        number: 11,
        topic: 'Số trung bình của mẫu số liệu ghép nhóm',
        prompt:
          'Khảo sát chiều cao (cm) của $40$ học sinh lớp 11A, ta có bảng số liệu ghép nhóm sau:\n$$\\begin{array}{|l|c|c|c|c|c|}\\hline \\text{Chiều cao} & [150; 155) & [155; 160) & [160; 165) & [165; 170) & [170; 175) \\\\ \\hline \\text{Số học sinh} & 5 & 10 & 15 & 7 & 3 \\\\ \\hline \\end{array}$$\nTính số trung bình của mẫu số liệu là:',
        options: [
          { key: 'A', content: '$160,5$' },
          { key: 'B', content: '$162,5$' },
          { key: 'C', content: '$161,5$' },
          { key: 'D', content: '$161,625$' },
        ],
        correctAnswer: 'D',
        explanation:
          'Giá trị đại diện của các nhóm lần lượt là: $152,5;\\ 157,5;\\ 162,5;\\ 167,5;\\ 172,5$. Số trung bình là: $\\bar{x} = \\frac{5 \\cdot 152,5 + 10 \\cdot 157,5 + 15 \\cdot 162,5 + 7 \\cdot 167,5 + 3 \\cdot 172,5}{40} = 161,625$.',
        pedagogicalTip: 'Tính giá trị đại diện $c_i$ của từng nhóm trước khi áp dụng công thức số trung bình $\\bar{x} = \\frac{\\sum n_i c_i}{n}$.',
        points: 0.25,
      },
      {
        id: 'd1-p1-q12',
        part: 'part1',
        number: 12,
        topic: 'Mẫu số liệu ghép nhóm',
        prompt:
          'Khảo sát chiều cao (cm) của $40$ học sinh lớp 11B, ta có bảng số liệu ghép nhóm sau:\n$$\\begin{array}{|l|c|c|c|c|c|}\\hline \\text{Chiều cao} & [150; 155) & [155; 160) & [160; 165) & [165; 170) & [170; 175) \\\\ \\hline \\text{Số học sinh} & 5 & 10 & 15 & 7 & 3 \\\\ \\hline \\end{array}$$\nGiá trị đại diện của nhóm $[160; 165)$ là:',
        options: [
          { key: 'A', content: '$162,5$' },
          { key: 'B', content: '$160$' },
          { key: 'C', content: '$165$' },
          { key: 'D', content: '$164$' },
        ],
        correctAnswer: 'A',
        explanation:
          'Giá trị đại diện của nhóm $[160; 165)$ là $\\frac{160 + 165}{2} = 162,5$.',
        pedagogicalTip: 'Giá trị đại diện của nhóm $[a_i; a_{i+1})$ là trung bình cộng hai đầu mút $\\frac{a_i + a_{i+1}}{2}$.',
        points: 0.25,
      },
    ],
    part2: [
      {
        id: 'd1-p2-q1',
        part: 'part2',
        number: 13,
        topic: 'Hàm số lượng giác',
        prompt: 'Cho hàm số lượng giác $y = \\cos x$. Xét tính đúng sai của các khẳng định sau:',
        statements: [
          {
            id: 'a',
            label: 'a',
            statement: 'Tập xác định của hàm số là $\\mathbb{R}$.',
            isCorrect: true,
            explanation: 'Hàm số $y = \\cos x$ xác định với mọi $x \\in \\mathbb{R}$. Khẳng định đúng.',
          },
          {
            id: 'b',
            label: 'b',
            statement: 'Tập giá trị của hàm số là $[-1; 1]$.',
            isCorrect: true,
            explanation: 'Ta luôn có $-1 \\le \\cos x \\le 1$ với mọi $x \\in \\mathbb{R}$. Khẳng định đúng.',
          },
          {
            id: 'c',
            label: 'c',
            statement: 'Hàm số $y = \\cos x$ là hàm số chẵn.',
            isCorrect: true,
            explanation: 'Ta có $\\cos(-x) = \\cos x$ nên hàm số là hàm số chẵn. Khẳng định đúng.',
          },
          {
            id: 'd',
            label: 'd',
            statement: 'Đồ thị hàm số đi qua gốc tọa độ $O(0; 0)$.',
            isCorrect: false,
            explanation: 'Với $x = 0$ thì $y = \\cos 0 = 1 \\neq 0$. Vậy đồ thị không đi qua gốc tọa độ. Khẳng định sai.',
          },
        ],
        pedagogicalTip: 'Đồ thị hàm số $y = \\cos x$ cắt trục tung tại điểm $(0; 1)$, còn đồ thị hàm số $y = \\sin x$ đi qua gốc tọa độ $O(0; 0)$.',
      },
      {
        id: 'd1-p2-q2',
        part: 'part2',
        number: 14,
        topic: 'Ứng dụng cấp số cộng',
        prompt:
          'Một hội trường được thiết kế các hàng ghế theo cấu trúc: hàng ghế đầu tiên có $20$ ghế, và mỗi hàng ghế phía sau có nhiều hơn hàng liền trước nó $3$ ghế. Xét tính đúng sai của các khẳng định sau:',
        statements: [
          {
            id: 'a',
            label: 'a',
            statement:
              'Số lượng ghế ở mỗi hàng theo thứ tự từ trước ra sau lập thành một cấp số cộng với số hạng đầu $u_1 = 20$ và công sai $d = 3$.',
            isCorrect: true,
            explanation:
              'Hàng đầu có $20$ ghế ($u_1 = 20$), mỗi hàng sau hơn hàng trước $3$ ghế ($d = 3$). Đây là cấp số cộng. Khẳng định đúng.',
          },
          {
            id: 'b',
            label: 'b',
            statement: 'Hàng ghế thứ $10$ của hội trường có $50$ ghế.',
            isCorrect: false,
            explanation:
              'Số ghế hàng thứ $10$ là $u_{10} = u_1 + 9d = 20 + 9 \\cdot 3 = 47$ ghế. Khẳng định sai.',
          },
          {
            id: 'c',
            label: 'c',
            statement: 'Tổng số ghế của $10$ hàng đầu tiên là $335$ ghế.',
            isCorrect: true,
            explanation:
              'Tổng số ghế $10$ hàng đầu là $S_{10} = \\frac{10}{2}(2u_1 + 9d) = 5(2 \\cdot 20 + 27) = 335$ ghế. Khẳng định đúng.',
          },
          {
            id: 'd',
            label: 'd',
            statement:
              'Người ta dự định sắp xếp lại sao cho hàng ghế cuối cùng có đúng $56$ ghế, khi đó hội trường này có tổng cộng $13$ hàng ghế.',
            isCorrect: true,
            explanation:
              'Ta có $u_n = u_1 + (n - 1)d \\Rightarrow 56 = 20 + (n - 1)3 \\Rightarrow 3(n - 1) = 36 \\Rightarrow n - 1 = 12 \\Rightarrow n = 13$. Khẳng định đúng.',
          },
        ],
        pedagogicalTip: 'Vận dụng công thức số hạng tổng quát $u_n = u_1 + (n - 1)d$ và tổng $S_n = \\frac{n[2u_1 + (n - 1)d]}{2}$ của cấp số cộng.',
      },
    ],
    part3: [
      {
        id: 'd1-p3-q1',
        part: 'part3',
        number: 15,
        topic: 'Phương trình lượng giác',
        prompt:
          'Tìm nghiệm âm lớn nhất của phương trình lượng giác $\\cos x = \\frac{1}{2}$, biết nghiệm có dạng $-\\frac{a\\pi}{b}$ với $a, b$ là số nguyên dương và phân số tối giản. Tính $a + b$.',
        acceptableAnswers: ['4'],
        explanation:
          'Ta có $\\cos x = \\frac{1}{2} \\Leftrightarrow x = \\pm\\frac{\\pi}{3} + k2\\pi\\ (k \\in \\mathbb{Z})$. Các nghiệm âm của phương trình là: $-\\frac{\\pi}{3} + k2\\pi$ (với $k \\le 0$) và $\\frac{\\pi}{3} + k2\\pi$ (với $k \\le -1$). Nghiệm âm lớn nhất là $-\\frac{\\pi}{3}$. Khi đó $a = 1,\\ b = 3 \\Rightarrow a + b = 4$.',
        pedagogicalTip: 'Xét riêng từng họ nghiệm với điều kiện $x < 0$ để tìm nghiệm âm lớn nhất.',
        points: 0.5,
      },
      {
        id: 'd1-p3-q2',
        part: 'part3',
        number: 16,
        topic: 'Ứng dụng hàm số lượng giác',
        prompt:
          'Độ sâu $h$ (mét) của mực nước ở một cảng biển vào thời điểm $t$ (giờ) sau khi thủy triều lên lần đầu tiên trong ngày được tính xấp xỉ bởi công thức: $h = 0,8\\cos\\left(\\frac{\\pi}{6}t\\right) + 4$. Tìm độ sâu lớn nhất của mực nước biển.',
        acceptableAnswers: ['4,8', '4.8'],
        unit: 'mét',
        explanation:
          'Ta có $-1 \\le \\cos\\left(\\frac{\\pi}{6}t\\right) \\le 1$. Do đó $h \\le 0,8 \\cdot 1 + 4 = 4,8$. Vậy độ sâu lớn nhất là $4,8$ mét.',
        pedagogicalTip: 'Giá trị lớn nhất của $\\cos u$ bằng $1$, suy ra $h_{\\max} = 0,8 \\cdot 1 + 4 = 4,8$.',
        points: 0.5,
      },
      {
        id: 'd1-p3-q3',
        part: 'part3',
        number: 17,
        topic: 'Cấp số cộng',
        prompt:
          'Cho cấp số cộng $(u_n)$ có số hạng đầu $u_1 = -5$ và công sai $d = 3$. Số $100$ là số hạng thứ bao nhiêu của cấp số cộng này?',
        acceptableAnswers: ['36'],
        explanation:
          'Ta có $u_n = u_1 + (n - 1)d \\Rightarrow 100 = -5 + (n - 1)3 \\Rightarrow 105 = 3(n - 1) \\Rightarrow n - 1 = 35 \\Rightarrow n = 36$. Vậy số $100$ là số hạng thứ $36$.',
        pedagogicalTip: 'Giải phương trình $u_n = u_1 + (n - 1)d = 100$ để tìm chỉ số $n$.',
        points: 0.5,
      },
      {
        id: 'd1-p3-q4',
        part: 'part3',
        number: 18,
        topic: 'Mốt của mẫu số liệu ghép nhóm',
        prompt:
          'Khảo sát thời gian tự học (giờ/tuần) của $40$ học sinh thu được bảng phân bố tần số ghép nhóm sau:\n$$\\begin{array}{|l|c|c|c|c|c|}\\hline \\text{Thời gian (giờ)} & [0; 2) & [2; 4) & [4; 6) & [6; 8) & [8; 10) \\\\ \\hline \\text{Số học sinh} & 4 & 8 & 12 & 10 & 6 \\\\ \\hline \\end{array}$$\nTính giá trị Mốt của mẫu số liệu ghép nhóm trên (làm tròn kết quả đến chữ số thập phân thứ hai).',
        acceptableAnswers: ['5,33', '5.33'],
        explanation:
          'Nhóm chứa Mốt là nhóm $[4; 6)$ có tần số lớn nhất $n_3 = 12$. Ta có $u_3 = 4,\\ u_4 - u_3 = 2,\\ n_3 = 12,\\ n_2 = 8,\\ n_4 = 10$. Áp dụng công thức: $M_o = 4 + \\frac{12 - 8}{(12 - 8) + (12 - 10)} \\cdot 2 = 4 + \\frac{4}{4 + 2} \\cdot 2 = 4 + \\frac{8}{6} \\approx 5,33$.',
        pedagogicalTip: 'Công thức mốt của mẫu số liệu ghép nhóm: $M_o = u_m + \\frac{n_m - n_{m-1}}{(n_m - n_{m-1}) + (n_m - n_{m+1})} \\cdot (u_{m+1} - u_m)$.',
        points: 0.5,
      },
    ],
    part4: [
      {
        id: 'd1-p4-q1',
        part: 'part4',
        number: 19,
        topic: 'Phương trình lượng giác trên một đoạn',
        problemStatement: 'Tìm số nghiệm của phương trình lượng giác $\\sin 2x = \\frac{1}{2}$ trên đoạn $[0; 2\\pi]$.',
        conclusionTarget: 'Xác định tất cả các nghiệm thuộc đoạn $[0; 2\\pi]$ và kết luận số nghiệm của phương trình.',
        steps: [
          {
            id: 'd1-p4-q1-s1',
            originalIndex: 1,
            roleDescription: 'Giải phương trình lượng giác tìm các họ nghiệm',
            content:
              'Ta có $\\sin 2x = \\frac{1}{2} \\Leftrightarrow \\left[\\begin{array}{l} 2x = \\frac{\\pi}{6} + k2\\pi \\\\ 2x = \\frac{5\\pi}{6} + k2\\pi \\end{array}\\right. \\Leftrightarrow \\left[\\begin{array}{l} x = \\frac{\\pi}{12} + k\\pi \\\\ x = \\frac{5\\pi}{12} + k\\pi \\end{array}\\right. (k \\in \\mathbb{Z})$.',
          },
          {
            id: 'd1-p4-q1-s2',
            originalIndex: 2,
            roleDescription: 'Xét họ nghiệm thứ nhất trên đoạn [0; 2π]',
            content:
              'Vì $x \\in [0; 2\\pi]$, với họ nghiệm $x = \\frac{\\pi}{12} + k\\pi$: cho $k = 0 \\Rightarrow x = \\frac{\\pi}{12}$; cho $k = 1 \\Rightarrow x = \\frac{13\\pi}{12}$.',
          },
          {
            id: 'd1-p4-q1-s3',
            originalIndex: 3,
            roleDescription: 'Xét họ nghiệm thứ hai trên đoạn [0; 2π]',
            content:
              'Với họ nghiệm $x = \\frac{5\\pi}{12} + k\\pi$ trên đoạn $[0; 2\\pi]$: cho $k = 0 \\Rightarrow x = \\frac{5\\pi}{12}$; cho $k = 1 \\Rightarrow x = \\frac{17\\pi}{12}$.',
          },
          {
            id: 'd1-p4-q1-s4',
            originalIndex: 4,
            roleDescription: 'Kết luận số nghiệm của phương trình',
            content: 'Vậy phương trình đã cho có $4$ nghiệm phân biệt trên đoạn $[0; 2\\pi]$.',
          },
        ],
        pedagogicalTip: 'Khi chia hai vế cho $2$, chu kỳ $k2\\pi$ cũng được chia cho $2$ thành $k\\pi$.',
        teacherAnalysis: 'Giải họ nghiệm của $\\sin 2x = \\frac{1}{2}$ -> Xét từng họ nghiệm trên $[0; 2\\pi]$ -> Kết luận số nghiệm.',
        points: 0.75,
      },
      {
        id: 'd1-p4-q2',
        part: 'part4',
        number: 20,
        topic: 'Bài toán thực tế cấp số nhân',
        problemStatement:
          'Dân số của một thành phố năm 2020 là $2$ triệu người. Giả sử tỷ lệ tăng dân số mỗi năm của thành phố này không đổi và luôn bằng $1,5\\%$. Tính dự đoán dân số của thành phố này vào năm 2030 (làm tròn kết quả đến hàng nghìn).',
        conclusionTarget: 'Tính số dân dự đoán của thành phố vào năm 2030.',
        steps: [
          {
            id: 'd1-p4-q2-s1',
            originalIndex: 1,
            roleDescription: 'Mô hình hóa bài toán bằng cấp số nhân',
            content:
              'Đây là bài toán tăng trưởng theo cấp số nhân với $u_1 = 2$ (triệu người) và công bội $q = 1 + 1,5\\% = 1,015$.',
          },
          {
            id: 'd1-p4-q2-s2',
            originalIndex: 2,
            roleDescription: 'Xác định khoảng thời gian tăng trưởng',
            content: 'Từ năm 2020 đến năm 2030 là khoảng thời gian $n = 10$ năm.',
          },
          {
            id: 'd1-p4-q2-s3',
            originalIndex: 3,
            roleDescription: 'Tính dân số dự đoán năm 2030',
            content: 'Dân số năm 2030 là: $P = 2 \\cdot (1,015)^{10} \\approx 2,321082$ (triệu người).',
          },
          {
            id: 'd1-p4-q2-s4',
            originalIndex: 4,
            roleDescription: 'Làm tròn kết quả và kết luận',
            content: 'Làm tròn kết quả đến hàng nghìn, ta được dân số năm 2030 khoảng $2.321.000$ người.',
          },
        ],
        pedagogicalTip: 'Công thức tăng trưởng dân số sau $n$ năm với tỉ lệ tăng $r$ mỗi năm là $P_n = P_0(1 + r)^n$.',
        teacherAnalysis: 'Xác định $u_1$ và công bội $q = 1 + r$ -> Tính số năm $n = 10$ -> Thay vào công thức -> Làm tròn đến hàng nghìn.',
        points: 0.75,
      },
      {
        id: 'd1-p4-q3',
        part: 'part4',
        number: 21,
        topic: 'Biến đổi công thức lượng giác',
        problemStatement:
          'Cho $\\cos\\alpha = -\\frac{4}{5}$ và $\\frac{\\pi}{2} < \\alpha < \\pi$. Tính giá trị của biểu thức lượng giác $A = 2\\sin 2\\alpha$.',
        conclusionTarget: 'Tìm giá trị chính xác của biểu thức $A = 2\\sin 2\\alpha$.',
        steps: [
          {
            id: 'd1-p4-q3-s1',
            originalIndex: 1,
            roleDescription: 'Xác định dấu của sin α',
            content: 'Vì $\\frac{\\pi}{2} < \\alpha < \\pi$ nên $\\sin\\alpha > 0$.',
          },
          {
            id: 'd1-p4-q3-s2',
            originalIndex: 2,
            roleDescription: 'Tính giá trị của sin α',
            content:
              'Ta có $\\sin\\alpha = \\sqrt{1 - \\cos^2\\alpha} = \\sqrt{1 - \\left(-\\frac{4}{5}\\right)^2} = \\frac{3}{5}$.',
          },
          {
            id: 'd1-p4-q3-s3',
            originalIndex: 3,
            roleDescription: 'Áp dụng công thức nhân đôi tính sin 2α',
            content:
              'Khi đó $\\sin 2\\alpha = 2\\sin\\alpha\\cos\\alpha = 2 \\cdot \\frac{3}{5} \\cdot \\left(-\\frac{4}{5}\\right) = -\\frac{24}{25}$.',
          },
          {
            id: 'd1-p4-q3-s4',
            originalIndex: 4,
            roleDescription: 'Tính giá trị biểu thức A và kết luận',
            content: 'Vậy $A = 2\\sin 2\\alpha = 2 \\cdot \\left(-\\frac{24}{25}\\right) = -\\frac{48}{25}$.',
          },
        ],
        pedagogicalTip: 'Sử dụng hệ thức $\\sin^2\\alpha + \\cos^2\\alpha = 1$ kết hợp dấu của $\\sin\\alpha$ trên $\\left(\\frac{\\pi}{2}; \\pi\\right)$ và công thức nhân đôi $\\sin 2\\alpha = 2\\sin\\alpha\\cos\\alpha$.',
        teacherAnalysis: 'Xét dấu $\\sin\\alpha > 0$ -> Tính $\\sin\\alpha$ -> Tính $\\sin 2\\alpha$ -> Nhân $2$ để suy ra $A$.',
        points: 0.75,
      },
      {
        id: 'd1-p4-q4',
        part: 'part4',
        number: 22,
        topic: 'Tứ phân vị của mẫu số liệu ghép nhóm',
        problemStatement:
          'Bảng sau đây thống kê điểm khảo sát môn Toán của $40$ học sinh (thang điểm $10$):\n$$\\begin{array}{|l|c|c|c|c|c|}\\hline \\text{Điểm số} & [0; 2) & [2; 4) & [4; 6) & [6; 8) & [8; 10] \\\\ \\hline \\text{Số học sinh} & 2 & 4 & 10 & 16 & 8 \\\\ \\hline \\end{array}$$\nTính tứ phân vị thứ nhất $Q_1$ của mẫu số liệu ghép nhóm trên.',
        conclusionTarget: 'Tính giá trị tứ phân vị thứ nhất $Q_1$.',
        steps: [
          {
            id: 'd1-p4-q4-s1',
            originalIndex: 1,
            roleDescription: 'Xác định cỡ mẫu và vị trí tứ phân vị thứ nhất',
            content:
              'Tổng số học sinh là $n = 40$. Tứ phân vị thứ nhất $Q_1$ ứng với vị trí thứ $\\frac{n}{4} = \\frac{40}{4} = 10$.',
          },
          {
            id: 'd1-p4-q4-s2',
            originalIndex: 2,
            roleDescription: 'Lập tần số tích lũy và tìm nhóm chứa Q₁',
            content:
              'Cộng dồn tần số: $2;\\ 6;\\ 16;\\ 32;\\ 40$. Giá trị thứ $10$ thuộc nhóm $[4; 6)$.',
          },
          {
            id: 'd1-p4-q4-s3',
            originalIndex: 3,
            roleDescription: 'Xác định các đại lượng trong công thức Q₁',
            content:
              'Nhóm $[4; 6)$ có đầu mút trái $u_3 = 4$, cỡ mẫu $n = 40$, tần số tích lũy nhóm liền trước $C = 6$, tần số nhóm $n_3 = 10$ và độ dài nhóm $u_4 - u_3 = 2$.',
          },
          {
            id: 'd1-p4-q4-s4',
            originalIndex: 4,
            roleDescription: 'Thay số vào công thức tính Q₁ và kết luận',
            content:
              'Ta có $Q_1 = u_3 + \\frac{\\frac{n}{4} - C}{n_3} \\cdot (u_4 - u_3) = 4 + \\frac{10 - 6}{10} \\cdot 2 = 4 + 0,8 = 4,8$.',
          },
        ],
        pedagogicalTip: 'Công thức tứ phân vị thứ nhất của mẫu số liệu ghép nhóm: $Q_1 = u_m + \\frac{\\frac{n}{4} - C}{n_m} \\cdot (u_{m+1} - u_m)$.',
        teacherAnalysis: 'Tính $\\frac{n}{4} = 10$ -> Xác định nhóm $[4; 6)$ chứa $Q_1$ -> Xác định $u_3 = 4, C = 6, n_3 = 10, h = 2$ -> Thay vào công thức tính $Q_1 = 4,8$.',
        points: 0.75,
      },
    ],
  },

  // ============================================================================
  // ĐỀ 02: ĐỀ ÔN TẬP & KIỂM TRA GIỮA HỌC KỲ I TOÁN 11 - ĐỀ 2
  // ============================================================================
  {
    id: 'de-02',
    title: 'đề ôn gk1 02',
    subtitle: 'Lượng Giác, Dãy Số - Cấp Số Cộng - Cấp Số Nhân & Mẫu Số Liệu Ghép Nhóm (Đề 2)',
    grade: 11,
    durationMinutes: 90,
    totalPoints: 10,
    description:
      'Đề khảo sát đánh giá năng lực môn Toán lớp 11 - Đề 02 chuẩn cấu trúc 4 phần (22 câu hỏi): Góc và công thức lượng giác, Hàm số & Phương trình lượng giác, Dãy số - Cấp số cộng - Cấp số nhân, và Mẫu số liệu ghép nhóm.',
    part1: [
      {
        id: 'd2-p1-q1',
        part: 'part1',
        number: 1,
        topic: 'Góc lượng giác',
        prompt: 'Đổi số đo góc lượng giác $\\frac{2\\pi}{3}$ radian sang độ.',
        options: [
          { key: 'A', content: '$120^\\circ$' },
          { key: 'B', content: '$60^\\circ$' },
          { key: 'C', content: '$150^\\circ$' },
          { key: 'D', content: '$90^\\circ$' },
        ],
        correctAnswer: 'A',
        explanation:
          'Áp dụng công thức đổi từ radian sang độ: $a^\\circ = \\alpha \\cdot \\frac{180^\\circ}{\\pi} = \\frac{2\\pi}{3} \\cdot \\frac{180^\\circ}{\\pi} = 120^\\circ$.',
        pedagogicalTip: 'Công thức chuyển đổi từ radian sang độ: $\\alpha\\text{ (rad)} = \\left(\\alpha \\cdot \\frac{180}{\\pi}\\right)^\\circ$.',
        points: 0.25,
      },
      {
        id: 'd2-p1-q2',
        part: 'part1',
        number: 2,
        topic: 'Hệ thức lượng giác cơ bản',
        prompt: 'Trong các hệ thức lượng giác cơ bản sau, hệ thức nào sai?',
        options: [
          { key: 'A', content: '$\\sin^2 x + \\cos^2 x = 1$' },
          { key: 'B', content: '$\\tan x \\cdot \\cot x = 1$' },
          { key: 'C', content: '$1 + \\tan^2 x = \\frac{1}{\\cos^2 x}$' },
          { key: 'D', content: '$1 + \\cot^2 x = \\frac{1}{\\cos^2 x}$' },
        ],
        correctAnswer: 'D',
        explanation:
          'Hệ thức đúng là $1 + \\cot^2 x = \\frac{1}{\\sin^2 x}$ (với $\\sin x \\neq 0$), nên phương án $1 + \\cot^2 x = \\frac{1}{\\cos^2 x}$ là sai.',
        pedagogicalTip: 'Ghi nhớ cặp hệ thức: $1 + \\tan^2 x = \\frac{1}{\\cos^2 x}$ và $1 + \\cot^2 x = \\frac{1}{\\sin^2 x}$.',
        points: 0.25,
      },
      {
        id: 'd2-p1-q3',
        part: 'part1',
        number: 3,
        topic: 'Tập xác định của hàm số lượng giác',
        prompt: 'Tập xác định của hàm số $y = \\cot 2x + 1$ là:',
        options: [
          { key: 'A', content: '$D = \\mathbb{R} \\setminus \\left\\{k\\frac{\\pi}{2}, k \\in \\mathbb{Z}\\right\\}$' },
          { key: 'B', content: '$D = \\mathbb{R} \\setminus \\left\\{\\frac{\\pi}{4} + k\\frac{\\pi}{2}, k \\in \\mathbb{Z}\\right\\}$' },
          { key: 'C', content: '$D = \\mathbb{R} \\setminus \\{k\\pi, k \\in \\mathbb{Z}\\}$' },
          { key: 'D', content: '$D = \\mathbb{R} \\setminus \\left\\{\\frac{\\pi}{2} + k\\pi, k \\in \\mathbb{Z}\\right\\}$' },
        ],
        correctAnswer: 'A',
        explanation:
          'Hàm số $y = \\cot 2x + 1 = \\frac{\\cos 2x}{\\sin 2x} + 1$ xác định khi $\\sin 2x \\neq 0 \\Leftrightarrow 2x \\neq k\\pi \\Leftrightarrow x \\neq k\\frac{\\pi}{2}\\ (k \\in \\mathbb{Z})$. Vậy tập xác định là $D = \\mathbb{R} \\setminus \\left\\{k\\frac{\\pi}{2}, k \\in \\mathbb{Z}\\right\\}$.',
        pedagogicalTip: 'Điều kiện xác định của $\\cot u$ là $\\sin u \\neq 0 \\Leftrightarrow u \\neq k\\pi\\ (k \\in \\mathbb{Z})$.',
        points: 0.25,
      },
      {
        id: 'd2-p1-q4',
        part: 'part1',
        number: 4,
        topic: 'Phương trình lượng giác cơ bản',
        prompt: 'Nghiệm của phương trình $\\sin 2x = \\sin\\left(-\\frac{\\pi}{3}\\right)$ là:',
        options: [
          { key: 'A', content: '$x = -\\frac{\\pi}{6} + k\\pi$ hoặc $x = \\frac{2\\pi}{3} + k\\pi\\ (k \\in \\mathbb{Z})$' },
          { key: 'B', content: '$x = -\\frac{\\pi}{3} + k2\\pi$ hoặc $x = \\frac{4\\pi}{3} + k2\\pi\\ (k \\in \\mathbb{Z})$' },
          { key: 'C', content: '$x = -\\frac{\\pi}{6} + k2\\pi$ hoặc $x = \\frac{2\\pi}{3} + k2\\pi\\ (k \\in \\mathbb{Z})$' },
          { key: 'D', content: '$x = -\\frac{\\pi}{6} + k\\pi$ hoặc $x = \\frac{5\\pi}{6} + k\\pi\\ (k \\in \\mathbb{Z})$' },
        ],
        correctAnswer: 'A',
        explanation:
          'Ta có $\\sin 2x = \\sin\\left(-\\frac{\\pi}{3}\\right) \\Leftrightarrow \\left[\\begin{array}{l} 2x = -\\frac{\\pi}{3} + k2\\pi \\\\ 2x = \\pi - \\left(-\\frac{\\pi}{3}\\right) + k2\\pi = \\frac{4\\pi}{3} + k2\\pi \\end{array}\\right. \\Leftrightarrow \\left[\\begin{array}{l} x = -\\frac{\\pi}{6} + k\\pi \\\\ x = \\frac{2\\pi}{3} + k\\pi \\end{array}\\right. (k \\in \\mathbb{Z})$.',
        pedagogicalTip: 'Khi chia cả hai vế của họ nghiệm cho $2$, nhớ chia cả chu kỳ $k2\\pi$ cho $2$ để được $k\\pi$.',
        points: 0.25,
      },
      {
        id: 'd2-p1-q5',
        part: 'part1',
        number: 5,
        topic: 'Giá trị lượng giác của một góc',
        prompt: 'Cho $\\cos x = \\frac{3}{5}$ với $-\\frac{\\pi}{2} < x < 0$. Tính giá trị của $\\sin x$.',
        options: [
          { key: 'A', content: '$\\frac{4}{5}$' },
          { key: 'B', content: '$-\\frac{4}{5}$' },
          { key: 'C', content: '$\\frac{16}{25}$' },
          { key: 'D', content: '$-\\frac{16}{25}$' },
        ],
        correctAnswer: 'B',
        explanation:
          'Ta có $\\sin^2 x = 1 - \\cos^2 x = 1 - \\left(\\frac{3}{5}\\right)^2 = \\frac{16}{25}$. Vì $-\\frac{\\pi}{2} < x < 0$ (góc phần tư thứ IV) nên $\\sin x < 0 \\Rightarrow \\sin x = -\\sqrt{\\frac{16}{25}} = -\\frac{4}{5}$.',
        pedagogicalTip: 'Trên khoảng $\\left(-\\frac{\\pi}{2}; 0\\right)$ thuộc góc phần tư thứ IV, $\\cos x > 0$ và $\\sin x < 0$.',
        points: 0.25,
      },
      {
        id: 'd2-p1-q6',
        part: 'part1',
        number: 6,
        topic: 'Tập giá trị của hàm số lượng giác',
        prompt: 'Tập giá trị của hàm số $y = \\tan 2x$ là:',
        options: [
          { key: 'A', content: '$\\mathbb{R}$' },
          { key: 'B', content: '$[-1; 1]$' },
          { key: 'C', content: '$[-2; 2]$' },
          { key: 'D', content: '$\\mathbb{R} \\setminus \\left\\{\\frac{\\pi}{4} + k\\frac{\\pi}{2}, k \\in \\mathbb{Z}\\right\\}$' },
        ],
        correctAnswer: 'A',
        explanation:
          'Hàm số $y = \\tan 2x$ nhận mọi giá trị thực nên có tập giá trị là $T = \\mathbb{R}$ (còn $\\mathbb{R} \\setminus \\left\\{\\frac{\\pi}{4} + k\\frac{\\pi}{2}, k \\in \\mathbb{Z}\\right\\}$ là tập xác định của hàm số).',
        pedagogicalTip: 'Cần phân biệt rõ Tập xác định $D$ và Tập giá trị $T = \\mathbb{R}$ của hàm số $y = \\tan u$.',
        points: 0.25,
      },
      {
        id: 'd2-p1-q7',
        part: 'part1',
        number: 7,
        topic: 'Tính tăng, giảm của dãy số',
        prompt: 'Cho dãy số $(u_n)$ với $u_n = 3 \\cdot (-2)^n$. Khẳng định nào sau đây là đúng?',
        options: [
          { key: 'A', content: '$(u_n)$ là dãy số giảm.' },
          { key: 'B', content: '$(u_n)$ là dãy số tăng.' },
          { key: 'C', content: '$(u_n)$ là dãy số không đổi.' },
          { key: 'D', content: '$(u_n)$ không tăng, không giảm.' },
        ],
        correctAnswer: 'D',
        explanation:
          'Ta có $u_1 = -6,\\ u_2 = 12,\\ u_3 = -24$. Vì $u_1 < u_2$ nhưng $u_2 > u_3$ (dãy số đan dấu) nên dãy số $(u_n)$ không tăng, không giảm.',
        pedagogicalTip: 'Dãy số có chứa lũy thừa cơ số âm $(-a)^n$ với $a > 0$ là dãy đan dấu nên không tăng, không giảm.',
        points: 0.25,
      },
      {
        id: 'd2-p1-q8',
        part: 'part1',
        number: 8,
        topic: 'Cấp số cộng',
        prompt: 'Cho cấp số cộng $(u_n)$ có số hạng đầu $u_1 = 4$ và $u_2 = 9$. Công sai $d$ của cấp số cộng này là:',
        options: [
          { key: 'A', content: '$5$' },
          { key: 'B', content: '$-5$' },
          { key: 'C', content: '$13$' },
          { key: 'D', content: '$36$' },
        ],
        correctAnswer: 'A',
        explanation:
          'Công sai của cấp số cộng là $d = u_2 - u_1 = 9 - 4 = 5$.',
        pedagogicalTip: 'Công sai của cấp số cộng bằng số hạng đứng sau trừ số hạng đứng ngay trước nó: $d = u_2 - u_1$.',
        points: 0.25,
      },
      {
        id: 'd2-p1-q9',
        part: 'part1',
        number: 9,
        topic: 'Số hạng tổng quát của cấp số cộng',
        prompt: 'Cho cấp số cộng $(u_n)$ có $u_1 = 2$ và công sai $d = 4$. Số hạng tổng quát $u_n$ là:',
        options: [
          { key: 'A', content: '$u_n = 4n - 1$' },
          { key: 'B', content: '$u_n = 4n + 2$' },
          { key: 'C', content: '$u_n = 2n + 4$' },
          { key: 'D', content: '$u_n = 4n - 2$' },
        ],
        correctAnswer: 'D',
        explanation:
          'Số hạng tổng quát của cấp số cộng là $u_n = u_1 + (n - 1)d = 2 + (n - 1) \\cdot 4 = 4n - 2$.',
        pedagogicalTip: 'Áp dụng công thức $u_n = u_1 + (n - 1)d = 2 + 4n - 4 = 4n - 2$.',
        points: 0.25,
      },
      {
        id: 'd2-p1-q10',
        part: 'part1',
        number: 10,
        topic: 'Cấp số nhân',
        prompt: 'Cho cấp số nhân $(u_n)$ có số hạng đầu $u_1 = 3$ và công bội $q = 2$. Số hạng thứ ba $u_3$ bằng:',
        options: [
          { key: 'A', content: '$12$' },
          { key: 'B', content: '$6$' },
          { key: 'C', content: '$18$' },
          { key: 'D', content: '$24$' },
        ],
        correctAnswer: 'A',
        explanation:
          'Số hạng thứ ba của cấp số nhân là $u_3 = u_1 \\cdot q^2 = 3 \\cdot 2^2 = 12$.',
        pedagogicalTip: 'Áp dụng công thức số hạng tổng quát của cấp số nhân: $u_n = u_1 \\cdot q^{n-1}$.',
        points: 0.25,
      },
      {
        id: 'd2-p1-q11',
        part: 'part1',
        number: 11,
        topic: 'Số trung bình của mẫu số liệu ghép nhóm',
        prompt:
          'Khảo sát khối lượng (kg) của $40$ học sinh lớp 11B, ta có bảng số liệu ghép nhóm sau:\n$$\\begin{array}{|l|c|c|c|c|c|}\\hline \\text{Khối lượng} & [40; 45) & [45; 50) & [50; 55) & [55; 60) & [60; 65) \\\\ \\hline \\text{Số học sinh} & 4 & 12 & 15 & 6 & 3 \\\\ \\hline \\end{array}$$\nSố trung bình của mẫu số liệu ghép nhóm trên là:',
        options: [
          { key: 'A', content: '$51,5$' },
          { key: 'B', content: '$52,5$' },
          { key: 'C', content: '$50,5$' },
          { key: 'D', content: '$49,5$' },
        ],
        correctAnswer: 'A',
        explanation:
          'Giá trị đại diện của các nhóm $[40; 45),\\ [45; 50),\\ [50; 55),\\ [55; 60),\\ [60; 65)$ lần lượt là $42,5;\\ 47,5;\\ 52,5;\\ 57,5;\\ 62,5$. Số trung bình của mẫu số liệu ghép nhóm là $\\bar{x} = \\frac{4 \\cdot 42,5 + 12 \\cdot 47,5 + 15 \\cdot 52,5 + 6 \\cdot 57,5 + 3 \\cdot 62,5}{40} = \\frac{2060}{40} = 51,5$ (kg).',
        pedagogicalTip: 'Công thức số trung bình của mẫu số liệu ghép nhóm: $\\bar{x} = \\frac{n_1 c_1 + n_2 c_2 + \\dots + n_k c_k}{n}$, với $c_i$ là giá trị đại diện của nhóm thứ $i$.',
        points: 0.25,
      },
      {
        id: 'd2-p1-q12',
        part: 'part1',
        number: 12,
        topic: 'Mẫu số liệu ghép nhóm',
        prompt:
          'Khảo sát khối lượng (kg) của $40$ học sinh lớp 11B, ta có bảng số liệu ghép nhóm sau:\n$$\\begin{array}{|l|c|c|c|c|c|}\\hline \\text{Khối lượng} & [40; 45) & [45; 50) & [50; 55) & [55; 60) & [60; 65) \\\\ \\hline \\text{Số học sinh} & 4 & 12 & 15 & 6 & 3 \\\\ \\hline \\end{array}$$\nGiá trị đại diện của nhóm $[50; 55)$ là:',
        options: [
          { key: 'A', content: '$52,5$' },
          { key: 'B', content: '$50$' },
          { key: 'C', content: '$55$' },
          { key: 'D', content: '$5$' },
        ],
        correctAnswer: 'A',
        explanation:
          'Giá trị đại diện của nhóm $[50; 55)$ là $\\frac{50 + 55}{2} = 52,5$.',
        pedagogicalTip: 'Giá trị đại diện của nhóm $[a; b)$ bằng trung bình cộng hai đầu mút $\\frac{a + b}{2}$.',
        points: 0.25,
      },
    ],
    part2: [
      {
        id: 'd2-p2-q1',
        part: 'part2',
        number: 13,
        topic: 'Hàm số lượng giác',
        prompt: 'Cho hàm số lượng giác $y = 3 - 2\\sin x$. Xét tính đúng sai của các khẳng định sau:',
        statements: [
          {
            id: 'a',
            label: 'a',
            statement: 'Tập xác định của hàm số là $\\mathbb{R}$.',
            isCorrect: true,
            explanation: 'Đúng. Hàm số $y = \\sin x$ xác định với mọi $x \\in \\mathbb{R}$ nên hàm số $y = 3 - 2\\sin x$ có tập xác định $D = \\mathbb{R}$.',
          },
          {
            id: 'b',
            label: 'b',
            statement: 'Tập giá trị của hàm số là $[-1; 5]$.',
            isCorrect: false,
            explanation: 'Sai. Vì $-1 \\le \\sin x \\le 1 \\Rightarrow -2 \\le -2\\sin x \\le 2 \\Rightarrow 1 \\le 3 - 2\\sin x \\le 5$. Vậy tập giá trị của hàm số là $[1; 5]$.',
          },
          {
            id: 'c',
            label: 'c',
            statement: 'Hàm số $y = 3 - 2\\sin x$ là hàm số chẵn.',
            isCorrect: false,
            explanation: 'Sai. Xét $y(-x) = 3 - 2\\sin(-x) = 3 + 2\\sin x \\neq y(x)$, nên hàm số đã cho không phải là hàm số chẵn.',
          },
          {
            id: 'd',
            label: 'd',
            statement: 'Giá trị lớn nhất của hàm số là $5$.',
            isCorrect: true,
            explanation: 'Đúng. Vì $1 \\le y \\le 5\\,\\forall x \\in \\mathbb{R}$ và $y = 5$ đạt được khi $\\sin x = -1$, nên giá trị lớn nhất của hàm số bằng $5$.',
          },
        ],
        pedagogicalTip: 'Khi nhân bất đẳng thức $-1 \\le \\sin x \\le 1$ với $-2$, nhớ đổi chiều bất đẳng thức trước khi cộng thêm $3$.',
      },
      {
        id: 'd2-p2-q2',
        part: 'part2',
        number: 14,
        topic: 'Ứng dụng cấp số cộng',
        prompt:
          'Một người thợ nhận đào một cái giếng sâu. Giá của mét khoan đầu tiên là $100\\,000$ đồng. Kể từ mét khoan thứ hai, giá của mỗi mét khoan tăng thêm $30\\,000$ đồng so với giá của mét khoan ngay trước đó. Xét tính đúng sai của các khẳng định sau:',
        statements: [
          {
            id: 'a',
            label: 'a',
            statement:
              'Giá tiền của mỗi mét khoan (theo thứ tự từ mét đầu tiên xuống sâu) lập thành cấp số cộng với số hạng đầu $u_1 = 100\\,000$ và công sai $d = 30\\,000$.',
            isCorrect: true,
            explanation:
              'Đúng. Mét đầu tiên có giá $u_1 = 100\\,000$ đồng và mỗi mét tiếp theo hơn mét liền trước $d = 30\\,000$ đồng nên lập thành một cấp số cộng.',
          },
          {
            id: 'b',
            label: 'b',
            statement: 'Giá của mét khoan thứ $10$ là $370\\,000$ đồng.',
            isCorrect: true,
            explanation:
              'Đúng. Giá của mét khoan thứ $10$ là $u_{10} = u_1 + 9d = 100\\,000 + 9 \\cdot 30\\,000 = 370\\,000$ (đồng).',
          },
          {
            id: 'c',
            label: 'c',
            statement: 'Tổng chi phí để khoan giếng sâu $10$ mét là $2\\,350\\,000$ đồng.',
            isCorrect: true,
            explanation:
              'Đúng. Tổng chi phí khoan $10$ mét là $S_{10} = \\frac{10}{2}(2u_1 + 9d) = 5(200\\,000 + 270\\,000) = 2\\,350\\,000$ (đồng).',
          },
          {
            id: 'd',
            label: 'd',
            statement: 'Nếu chủ nhà có $4\\,500\\,000$ đồng thì đủ trả chi phí để khoan giếng sâu $15$ mét.',
            isCorrect: false,
            explanation:
              'Sai. Tổng chi phí khoan giếng sâu $15$ mét là $S_{15} = \\frac{15}{2}(2 \\cdot 100\\,000 + 14 \\cdot 30\\,000) = \\frac{15 \\cdot 620\\,000}{2} = 4\\,650\\,000$ đồng $> 4\\,500\\,000$ đồng, nên không đủ.',
          },
        ],
        pedagogicalTip: 'Phân biệt rõ giá tiền của riêng mét khoan thứ $n$ ($u_n$) với tổng chi phí khoan $n$ mét đầu tiên ($S_n$).',
      },
    ],
    part3: [
      {
        id: 'd2-p3-q1',
        part: 'part3',
        number: 15,
        topic: 'Phương trình lượng giác',
        prompt:
          'Tìm nghiệm âm lớn nhất của phương trình lượng giác $\\cos x = \\frac{1}{2}$, biết nghiệm có dạng $-\\frac{a\\pi}{b}$ với $a, b$ là số nguyên dương và phân số tối giản. Tính $a + b$.',
        acceptableAnswers: ['4'],
        explanation:
          'Ta có $\\cos x = \\frac{1}{2} \\Leftrightarrow x = \\pm\\frac{\\pi}{3} + k2\\pi\\ (k \\in \\mathbb{Z})$. Nghiệm âm lớn nhất của phương trình là $x = -\\frac{\\pi}{3}$ (ứng với $k = 0$ ở họ nghiệm $-\\frac{\\pi}{3} + k2\\pi$). Suy ra $a = 1,\\ b = 3 \\Rightarrow a + b = 4$.',
        pedagogicalTip: 'Biểu diễn nghiệm trên đường tròn lượng giác hoặc thử các giá trị nguyên $k \\le 0$ để tìm nghiệm âm lớn nhất.',
        points: 0.5,
      },
      {
        id: 'd2-p3-q2',
        part: 'part3',
        number: 16,
        topic: 'Ứng dụng hàm số lượng giác',
        prompt:
          'Một chiếc cabin của vòng quay mặt trời (Ferris wheel) có độ cao $h$ (mét) so với mặt đất phụ thuộc vào thời gian $t$ (phút) kể từ lúc bắt đầu quay theo công thức $h(t) = 50 + 40\\sin\\left(\\frac{\\pi}{15}t - \\frac{\\pi}{2}\\right)$. Tìm độ cao lớn nhất của chiếc cabin này (đơn vị: mét).',
        acceptableAnswers: ['90'],
        unit: 'mét',
        explanation:
          'Vì $-1 \\le \\sin\\left(\\frac{\\pi}{15}t - \\frac{\\pi}{2}\\right) \\le 1$ với mọi $t \\ge 0$ nên $h(t) \\le 50 + 40 \\cdot 1 = 90$ (mét). Dấu bằng xảy ra chẳng hạn khi $t = 15$ phút. Vậy độ cao lớn nhất của chiếc cabin là $90$ mét.',
        pedagogicalTip: 'Độ cao lớn nhất đạt được khi hàm $\\sin$ nhận giá trị lớn nhất bằng $1$.',
        points: 0.5,
      },
      {
        id: 'd2-p3-q3',
        part: 'part3',
        number: 17,
        topic: 'Cấp số nhân',
        prompt:
          'Cho cấp số nhân $(u_n)$ có số hạng thứ hai $u_2 = 6$ và công bội $q = 2$. Hỏi số $192$ là số hạng thứ bao nhiêu của cấp số nhân này?',
        acceptableAnswers: ['7'],
        explanation:
          'Số hạng đầu của cấp số nhân là $u_1 = \\frac{u_2}{q} = \\frac{6}{2} = 3$. Ta có $u_n = u_1 \\cdot q^{n-1} = 192 \\Leftrightarrow 3 \\cdot 2^{n-1} = 192 \\Leftrightarrow 2^{n-1} = 64 = 2^6 \\Leftrightarrow n - 1 = 6 \\Leftrightarrow n = 7$. Vậy số $192$ là số hạng thứ $7$.',
        pedagogicalTip: 'Có thể dùng trực tiếp hệ thức $u_n = u_2 \\cdot q^{n-2} \\Rightarrow 192 = 6 \\cdot 2^{n-2} \\Leftrightarrow 2^{n-2} = 32 = 2^5 \\Leftrightarrow n = 7$.',
        points: 0.5,
      },
      {
        id: 'd2-p3-q4',
        part: 'part3',
        number: 18,
        topic: 'Mốt của mẫu số liệu ghép nhóm',
        prompt:
          'Khảo sát thời gian tự học (giờ/tuần) của $40$ học sinh thu được bảng phân bố tần số ghép nhóm sau:\n$$\\begin{array}{|l|c|c|c|c|c|}\\hline \\text{Thời gian} & [0; 2) & [2; 4) & [4; 6) & [6; 8) & [8; 10) \\\\ \\hline \\text{Số học sinh} & 4 & 8 & 12 & 10 & 6 \\\\ \\hline \\end{array}$$\nTính giá trị Mốt của mẫu số liệu ghép nhóm trên (làm tròn kết quả đến chữ số thập phân thứ hai).',
        acceptableAnswers: ['5,33', '5.33'],
        explanation:
          'Nhóm chứa Mốt là nhóm $[4; 6)$ có tần số lớn nhất $n_3 = 12$. Ta có $u_m = 4,\\ u_{m+1} - u_m = 2,\\ n_m = 12,\\ n_{m-1} = 8,\\ n_{m+1} = 10$. Khi đó $M_o = 4 + \\frac{12 - 8}{(12 - 8) + (12 - 10)} \\cdot 2 = 4 + \\frac{4}{6} \\cdot 2 = \\frac{16}{3} \\approx 5,33$.',
        pedagogicalTip: 'Áp dụng công thức mốt: $M_o = u_m + \\frac{n_m - n_{m-1}}{(n_m - n_{m-1}) + (n_m - n_{m+1})} \\cdot (u_{m+1} - u_m)$.',
        points: 0.5,
      },
    ],
    part4: [
      {
        id: 'd2-p4-q1',
        part: 'part4',
        number: 19,
        topic: 'Phương trình lượng giác trên nửa khoảng',
        problemStatement: 'Tính tổng các nghiệm của phương trình lượng giác $\\sin 2x = \\frac{1}{2}$ trên nửa khoảng $[0; \\pi)$.',
        conclusionTarget: 'Xác định các nghiệm thuộc $[0; \\pi)$ và tính tổng các nghiệm đó.',
        steps: [
          {
            id: 'd2-p4-q1-s1',
            originalIndex: 1,
            roleDescription: 'Giải phương trình tìm các họ nghiệm',
            content:
              'Ta có $\\sin 2x = \\frac{1}{2} \\Leftrightarrow \\left[\\begin{array}{l} 2x = \\frac{\\pi}{6} + k2\\pi \\\\ 2x = \\frac{5\\pi}{6} + k2\\pi \\end{array}\\right. \\Leftrightarrow \\left[\\begin{array}{l} x = \\frac{\\pi}{12} + k\\pi \\\\ x = \\frac{5\\pi}{12} + k\\pi \\end{array}\\right. (k \\in \\mathbb{Z})$.',
          },
          {
            id: 'd2-p4-q1-s2',
            originalIndex: 2,
            roleDescription: 'Tìm các nghiệm thuộc nửa khoảng [0; π)',
            content:
              'Vì $x \\in [0; \\pi)$ nên ứng với $k = 0$, phương trình có đúng hai nghiệm thuộc $[0; \\pi)$ là $x_1 = \\frac{\\pi}{12}$ và $x_2 = \\frac{5\\pi}{12}$.',
          },
          {
            id: 'd2-p4-q1-s3',
            originalIndex: 3,
            roleDescription: 'Tính tổng các nghiệm trên [0; π)',
            content:
              'Tổng các nghiệm của phương trình trên $[0; \\pi)$ là $S = x_1 + x_2 = \\frac{\\pi}{12} + \\frac{5\\pi}{12} = \\frac{6\\pi}{12} = \\frac{\\pi}{2}$.',
          },
          {
            id: 'd2-p4-q1-s4',
            originalIndex: 4,
            roleDescription: 'Kết luận kết quả',
            content: 'Vậy tổng các nghiệm của phương trình đã cho trên nửa khoảng $[0; \\pi)$ bằng $\\frac{\\pi}{2}$.',
          },
        ],
        pedagogicalTip: 'Chú ý miền nghiệm là nửa khoảng $[0; \\pi)$ nên chỉ nhận các nghiệm ứng với $k = 0$.',
        teacherAnalysis: 'Giải họ nghiệm của $\\sin 2x = \\frac{1}{2}$ -> Lọc nghiệm thuộc $[0; \\pi)$ -> Cộng hai nghiệm $x_1 + x_2 = \\frac{\\pi}{2}$.',
        points: 0.75,
      },
      {
        id: 'd2-p4-q2',
        part: 'part4',
        number: 20,
        topic: 'Bài toán thực tế cấp số nhân',
        problemStatement:
          'Một bài toán lan truyền tin đồn được mô hình hóa như sau: Giả sử ngày đầu tiên (ngày thứ $1$) có $1$ người biết một tin đồn bí mật. Ngày hôm sau, người này kể cho $3$ người khác chưa biết. Ngày tiếp theo, mỗi người trong số $3$ người mới biết lại đi kể cho $3$ người khác chưa biết. Cứ như vậy, giả định rằng mỗi người chỉ đi kể tin đồn đúng một lần cho $3$ người mới vào ngày ngay sau khi họ biết tin. Tính tổng số người biết tin đồn này sau $10$ ngày kể từ ngày đầu tiên.',
        conclusionTarget: 'Tính tổng số người biết tin đồn sau $10$ ngày.',
        steps: [
          {
            id: 'd2-p4-q2-s1',
            originalIndex: 1,
            roleDescription: 'Biểu diễn số người mới biết tin mỗi ngày',
            content:
              'Gọi $u_n$ là số người mới biết tin đồn vào ngày thứ $n$. Theo giả thiết, ta có $u_1 = 1,\\ u_2 = 3,\\ u_3 = 3^2 = 9,\\dots$',
          },
          {
            id: 'd2-p4-q2-s2',
            originalIndex: 2,
            roleDescription: 'Xác định cấp số nhân',
            content:
              'Dãy số $(u_n)$ lập thành một cấp số nhân với số hạng đầu $u_1 = 1$ và công bội $q = 3$.',
          },
          {
            id: 'd2-p4-q2-s3',
            originalIndex: 3,
            roleDescription: 'Lập công thức tổng 10 số hạng đầu tiên',
            content:
              'Tổng số người biết tin đồn sau $10$ ngày là tổng của $10$ số hạng đầu tiên: $S_{10} = \\frac{u_1(q^{10} - 1)}{q - 1}$.',
          },
          {
            id: 'd2-p4-q2-s4',
            originalIndex: 4,
            roleDescription: 'Thay số và kết luận',
            content:
              'Thay số vào công thức, ta được $S_{10} = \\frac{1 \\cdot (3^{10} - 1)}{3 - 1} = \\frac{59\\,049 - 1}{2} = 29\\,524$ (người).',
          },
        ],
        pedagogicalTip: 'Đọc kỹ yêu cầu đề bài hỏi "tổng số người biết tin sau 10 ngày" ($S_{10}$) chứ không phải số người mới biết tin ở riêng ngày thứ 10 ($u_{10}$).',
        teacherAnalysis: 'Xác định dãy $u_n$ là cấp số nhân ($u_1 = 1, q = 3$) -> Áp dụng công thức tổng $S_{10} = \\frac{u_1(q^{10} - 1)}{q - 1}$ -> Tính ra $29\\,524$ người.',
        points: 0.75,
      },
      {
        id: 'd2-p4-q3',
        part: 'part4',
        number: 21,
        topic: 'Tính giá trị biểu thức lượng giác',
        problemStatement:
          'Cho $\\cos\\alpha = -\\frac{4}{5}$ và $\\pi < \\alpha < \\frac{3\\pi}{2}$. Tính giá trị của biểu thức lượng giác $A = \\sin 2\\alpha + \\cos\\alpha$.',
        conclusionTarget: 'Tính giá trị chính xác của biểu thức $A = \\sin 2\\alpha + \\cos\\alpha$.',
        steps: [
          {
            id: 'd2-p4-q3-s1',
            originalIndex: 1,
            roleDescription: 'Xác định dấu của sin α',
            content: 'Vì $\\pi < \\alpha < \\frac{3\\pi}{2}$ (góc thuộc góc phần tư thứ III) nên $\\sin\\alpha < 0$.',
          },
          {
            id: 'd2-p4-q3-s2',
            originalIndex: 2,
            roleDescription: 'Tính giá trị của sin α',
            content:
              'Ta có $\\sin\\alpha = -\\sqrt{1 - \\cos^2\\alpha} = -\\sqrt{1 - \\left(-\\frac{4}{5}\\right)^2} = -\\frac{3}{5}$.',
          },
          {
            id: 'd2-p4-q3-s3',
            originalIndex: 3,
            roleDescription: 'Áp dụng công thức nhân đôi tính sin 2α',
            content:
              'Khi đó $\\sin 2\\alpha = 2\\sin\\alpha\\cos\\alpha = 2 \\cdot \\left(-\\frac{3}{5}\\right) \\cdot \\left(-\\frac{4}{5}\\right) = \\frac{24}{25}$.',
          },
          {
            id: 'd2-p4-q3-s4',
            originalIndex: 4,
            roleDescription: 'Thay vào biểu thức A và kết luận',
            content:
              'Vậy $A = \\sin 2\\alpha + \\cos\\alpha = \\frac{24}{25} + \\left(-\\frac{4}{5}\\right) = \\frac{24 - 20}{25} = \\frac{4}{25}$.',
          },
        ],
        pedagogicalTip: 'Trên khoảng $\\left(\\pi; \\frac{3\\pi}{2}\\right)$, cả $\\sin\\alpha$ và $\\cos\\alpha$ đều âm nên tích $\\sin 2\\alpha = 2\\sin\\alpha\\cos\\alpha$ mang dấu dương.',
        teacherAnalysis: 'Xác định $\\sin\\alpha < 0$ -> Tính $\\sin\\alpha = -\\frac{3}{5}$ -> Tính $\\sin 2\\alpha = \\frac{24}{25}$ -> Cộng với $\\cos\\alpha$ được $A = \\frac{4}{25}$.',
        points: 0.75,
      },
      {
        id: 'd2-p4-q4',
        part: 'part4',
        number: 22,
        topic: 'Tứ phân vị của mẫu số liệu ghép nhóm',
        problemStatement:
          'Bảng sau đây thống kê điểm khảo sát môn Toán của $40$ học sinh (thang điểm $10$):\n$$\\begin{array}{|l|c|c|c|c|c|}\\hline \\text{Điểm số} & [0; 2) & [2; 4) & [4; 6) & [6; 8) & [8; 10] \\\\ \\hline \\text{Số học sinh} & 2 & 4 & 10 & 16 & 8 \\\\ \\hline \\end{array}$$\nTính tứ phân vị thứ ba ($Q_3$) của mẫu số liệu ghép nhóm trên.',
        conclusionTarget: 'Tính giá trị tứ phân vị thứ ba $Q_3$.',
        steps: [
          {
            id: 'd2-p4-q4-s1',
            originalIndex: 1,
            roleDescription: 'Xác định cỡ mẫu và vị trí tứ phân vị thứ ba',
            content:
              'Tổng số học sinh là $n = 40$. Tứ phân vị thứ ba $Q_3$ ứng với vị trí thứ $\\frac{3n}{4} = \\frac{3 \\cdot 40}{4} = 30$.',
          },
          {
            id: 'd2-p4-q4-s2',
            originalIndex: 2,
            roleDescription: 'Lập tần số tích lũy và xác định nhóm chứa Q₃',
            content:
              'Cộng dồn tần số các nhóm: $2;\\ 6;\\ 16;\\ 32;\\ 40$. Do $16 < 30 \\le 32$ nên giá trị thứ $30$ thuộc nhóm $[6; 8)$.',
          },
          {
            id: 'd2-p4-q4-s3',
            originalIndex: 3,
            roleDescription: 'Xác định các đại lượng trong công thức Q₃',
            content:
              'Nhóm $[6; 8)$ chứa $Q_3$ có đầu mút trái $u_m = 6$, tần số tích lũy của nhóm liền trước $C = 16$, tần số của nhóm $n_m = 16$ và độ dài nhóm $u_{m+1} - u_m = 2$.',
          },
          {
            id: 'd2-p4-q4-s4',
            originalIndex: 4,
            roleDescription: 'Thay số vào công thức tính Q₃ và kết luận',
            content:
              'Áp dụng công thức: $Q_3 = u_m + \\frac{\\frac{3n}{4} - C}{n_m} \\cdot (u_{m+1} - u_m) = 6 + \\frac{30 - 16}{16} \\cdot 2 = 6 + \\frac{14}{8} = 7,75$.',
          },
        ],
        pedagogicalTip: 'Công thức tính tứ phân vị thứ ba của mẫu số liệu ghép nhóm: $Q_3 = u_m + \\frac{\\frac{3n}{4} - C}{n_m} \\cdot (u_{m+1} - u_m)$.',
        teacherAnalysis: 'Tính $\\frac{3n}{4} = 30$ -> Tìm nhóm $[6; 8)$ chứa $Q_3$ -> Xác định $u_m = 6, C = 16, n_m = 16, u_{m+1} - u_m = 2$ -> Tính $Q_3 = 7,75$.',
        points: 0.75,
      },
    ],
  },

  // ============================================================================
  // ĐỀ 03: ĐỀ ÔN TẬP & KIỂM TRA GIỮA HỌC KỲ I TOÁN 11 - ĐỀ 3
  // ============================================================================
  {
    id: 'de-03',
    title: 'đề ôn gk1 03',
    subtitle: 'Lượng Giác, Dãy Số - Cấp Số Cộng - Cấp Số Nhân & Mẫu Số Liệu Ghép Nhóm (Đề 3)',
    grade: 11,
    durationMinutes: 90,
    totalPoints: 10,
    description:
      'Đề khảo sát đánh giá năng lực môn Toán lớp 11 - Đề 03 chuẩn cấu trúc 4 phần (22 câu hỏi): Góc và công thức lượng giác, Hàm số & Phương trình lượng giác, Dãy số - Cấp số cộng - Cấp số nhân, và Mẫu số liệu ghép nhóm.',
    part1: [
      {
        id: 'd3-p1-q1',
        part: 'part1',
        number: 1,
        topic: 'Đổi số đo góc lượng giác',
        prompt: 'Đổi số đo góc lượng giác $240^\\circ$ sang radian.',
        options: [
          { key: 'A', content: '$\\frac{3\\pi}{4}$' },
          { key: 'B', content: '$\\frac{4\\pi}{3}$' },
          { key: 'C', content: '$\\frac{5\\pi}{3}$' },
          { key: 'D', content: '$\\frac{2\\pi}{3}$' },
        ],
        correctAnswer: 'B',
        explanation:
          'Ta có $240^\\circ = 240 \\cdot \\frac{\\pi}{180} = \\frac{4\\pi}{3}$ (rad).',
        pedagogicalTip: 'Công thức đổi từ độ sang radian: $\\alpha = a^\\circ \\cdot \\frac{\\pi}{180^\\circ}$.',
        points: 0.25,
      },
      {
        id: 'd3-p1-q2',
        part: 'part1',
        number: 2,
        topic: 'Hệ thức lượng giác cơ bản',
        prompt: 'Trong các hệ thức lượng giác sau, hệ thức nào đúng với mọi $\\alpha$ làm cho biểu thức có nghĩa?',
        options: [
          { key: 'A', content: '$\\sin^2\\alpha - \\cos^2\\alpha = 1$' },
          { key: 'B', content: '$1 + \\cot^2\\alpha = \\frac{1}{\\sin^2\\alpha}$' },
          { key: 'C', content: '$\\tan\\alpha \\cdot \\cot\\alpha = -1$' },
          { key: 'D', content: '$1 + \\tan^2\\alpha = \\frac{1}{\\sin^2\\alpha}$' },
        ],
        correctAnswer: 'B',
        explanation:
          'Hệ thức cơ bản trong lượng giác là $1 + \\cot^2\\alpha = \\frac{1}{\\sin^2\\alpha}$ với mọi $\\alpha \\neq k\\pi\\ (k \\in \\mathbb{Z})$.',
        pedagogicalTip: 'Ghi nhớ hai hệ thức đi kèm: $1 + \\tan^2\\alpha = \\frac{1}{\\cos^2\\alpha}$ và $1 + \\cot^2\\alpha = \\frac{1}{\\sin^2\\alpha}$.',
        points: 0.25,
      },
      {
        id: 'd3-p1-q3',
        part: 'part1',
        number: 3,
        topic: 'Giá trị lượng giác của một góc',
        prompt: 'Cho $\\cos\\alpha = -\\frac{5}{13}$ và $\\pi < \\alpha < \\frac{3\\pi}{2}$. Tính giá trị của $\\sin\\alpha$.',
        options: [
          { key: 'A', content: '$\\frac{12}{13}$' },
          { key: 'B', content: '$-\\frac{12}{13}$' },
          { key: 'C', content: '$-\\frac{144}{169}$' },
          { key: 'D', content: '$\\frac{5}{12}$' },
        ],
        correctAnswer: 'B',
        explanation:
          'Ta có $\\sin^2\\alpha = 1 - \\cos^2\\alpha = 1 - \\left(-\\frac{5}{13}\\right)^2 = \\frac{144}{169}$. Do $\\pi < \\alpha < \\frac{3\\pi}{2}$ (góc phần tư thứ III) nên $\\sin\\alpha < 0$, suy ra $\\sin\\alpha = -\\frac{12}{13}$.',
        pedagogicalTip: 'Khi $\\pi < \\alpha < \\frac{3\\pi}{2}$, điểm biểu diễn thuộc góc phần tư thứ III nên $\\sin\\alpha < 0$ và $\\cos\\alpha < 0$.',
        points: 0.25,
      },
      {
        id: 'd3-p1-q4',
        part: 'part1',
        number: 4,
        topic: 'Tập xác định của hàm số lượng giác',
        prompt: 'Tập xác định của hàm số $y = \\cos x$ là:',
        options: [
          { key: 'A', content: '$\\mathbb{R}$' },
          { key: 'B', content: '$[-1; 1]$' },
          { key: 'C', content: '$\\mathbb{R} \\setminus \\left\\{\\frac{\\pi}{2} + k\\pi, k \\in \\mathbb{Z}\\right\\}$' },
          { key: 'D', content: '$\\mathbb{R} \\setminus \\{k\\pi, k \\in \\mathbb{Z}\\}$' },
        ],
        correctAnswer: 'A',
        explanation:
          'Hàm số $y = \\cos x$ xác định với mọi $x \\in \\mathbb{R}$. Vậy tập xác định của hàm số là $D = \\mathbb{R}$.',
        pedagogicalTip: 'Hai hàm số $y = \\sin x$ và $y = \\cos x$ đều có tập xác định là $D = \\mathbb{R}$ và tập giá trị là $T = [-1; 1]$.',
        points: 0.25,
      },
      {
        id: 'd3-p1-q5',
        part: 'part1',
        number: 5,
        topic: 'Tính tăng, giảm của dãy số',
        prompt: 'Cho dãy số $(u_n)$ với $u_n = -3n + 5$. Khẳng định nào sau đây là đúng?',
        options: [
          { key: 'A', content: '$(u_n)$ là dãy số tăng.' },
          { key: 'B', content: '$(u_n)$ là dãy số giảm.' },
          { key: 'C', content: '$(u_n)$ không tăng, không giảm.' },
          { key: 'D', content: '$(u_n)$ là dãy số không đổi.' },
        ],
        correctAnswer: 'B',
        explanation:
          'Xét hiệu $u_{n+1} - u_n = [-3(n + 1) + 5] - (-3n + 5) = -3 < 0$ với mọi $n \\ge 1$. Do đó dãy số $(u_n)$ là dãy số giảm.',
        pedagogicalTip: 'Dãy số bậc nhất $u_n = an + b$ là dãy số tăng khi $a > 0$ và là dãy số giảm khi $a < 0$.',
        points: 0.25,
      },
      {
        id: 'd3-p1-q6',
        part: 'part1',
        number: 6,
        topic: 'Cấp số cộng',
        prompt: 'Cho cấp số cộng $(u_n)$ có số hạng đầu $u_1 = 5$ và công sai $d = -3$. Số hạng thứ hai $u_2$ bằng:',
        options: [
          { key: 'A', content: '$-15$' },
          { key: 'B', content: '$8$' },
          { key: 'C', content: '$2$' },
          { key: 'D', content: '$-2$' },
        ],
        correctAnswer: 'C',
        explanation:
          'Ta có $u_2 = u_1 + d = 5 + (-3) = 2$.',
        pedagogicalTip: 'Số hạng thứ hai của cấp số cộng bằng số hạng đầu cộng với công sai: $u_2 = u_1 + d$.',
        points: 0.25,
      },
      {
        id: 'd3-p1-q7',
        part: 'part1',
        number: 7,
        topic: 'Số trung bình của mẫu số liệu ghép nhóm',
        prompt:
          'Khảo sát thời gian tự học (giờ/tuần) của $40$ học sinh lớp 11B, ta có bảng số liệu ghép nhóm sau:\n$$\\begin{array}{|l|c|c|c|c|c|}\\hline \\text{Thời gian} & [0; 4) & [4; 8) & [8; 12) & [12; 16) & [16; 20) \\\\ \\hline \\text{Số học sinh} & 5 & 10 & 15 & 7 & 3 \\\\ \\hline \\end{array}$$\nSố trung bình của mẫu số liệu là:',
        options: [
          { key: 'A', content: '$9,3$' },
          { key: 'B', content: '$8,8$' },
          { key: 'C', content: '$10,0$' },
          { key: 'D', content: '$9,5$' },
        ],
        correctAnswer: 'A',
        explanation:
          'Giá trị đại diện của các nhóm lần lượt là $x_1 = 2,\\ x_2 = 6,\\ x_3 = 10,\\ x_4 = 14,\\ x_5 = 18$. Số trung bình của mẫu số liệu là $\\bar{x} = \\frac{5 \\cdot 2 + 10 \\cdot 6 + 15 \\cdot 10 + 7 \\cdot 14 + 3 \\cdot 18}{40} = \\frac{372}{40} = 9,3$.',
        pedagogicalTip: 'Tính giá trị đại diện $x_i = \\frac{a_i + a_{i+1}}{2}$ của từng nhóm trước khi áp dụng công thức số trung bình.',
        points: 0.25,
      },
      {
        id: 'd3-p1-q8',
        part: 'part1',
        number: 8,
        topic: 'Trung vị của mẫu số liệu ghép nhóm',
        prompt:
          'Khảo sát số tiền chi tiêu trong một ngày (nghìn đồng) của $50$ học sinh, ta có bảng số liệu ghép nhóm sau:\n$$\\begin{array}{|l|c|c|c|c|c|}\\hline \\text{Số tiền} & [10; 20) & [20; 30) & [30; 40) & [40; 50) & [50; 60) \\\\ \\hline \\text{Số học sinh} & 6 & 14 & 16 & 10 & 4 \\\\ \\hline \\end{array}$$\nTrung vị của mẫu số liệu là:',
        options: [
          { key: 'A', content: '$31,25$' },
          { key: 'B', content: '$35,0$' },
          { key: 'C', content: '$32,5$' },
          { key: 'D', content: '$33,125$' },
        ],
        correctAnswer: 'D',
        explanation:
          'Cỡ mẫu $n = 50 \\Rightarrow \\frac{n}{2} = 25$. Nhóm chứa trung vị là $[30; 40)$ vì có tần số tích lũy $6 + 14 + 16 = 36 \\ge 25$. Ta có $u_3 = 30,\\ u_4 = 40,\\ n_3 = 16,\\ C = 6 + 14 = 20$. Trung vị $M_e = 30 + \\frac{25 - 20}{16} \\cdot (40 - 30) = 33,125$.',
        pedagogicalTip: 'Công thức trung vị của mẫu số liệu ghép nhóm: $M_e = u_m + \\frac{\\frac{n}{2} - C}{n_m} \\cdot (u_{m+1} - u_m)$.',
        points: 0.25,
      },
      {
        id: 'd3-p1-q9',
        part: 'part1',
        number: 9,
        topic: 'Tập giá trị của hàm số lượng giác',
        prompt: 'Tập giá trị của hàm số $y = 3\\cos x$ là:',
        options: [
          { key: 'A', content: '$[-3; 3]$' },
          { key: 'B', content: '$[-1; 1]$' },
          { key: 'C', content: '$(-3; 3)$' },
          { key: 'D', content: '$[0; 3]$' },
        ],
        correctAnswer: 'A',
        explanation:
          'Ta có $-1 \\le \\cos x \\le 1$ với mọi $x \\in \\mathbb{R}$, suy ra $-3 \\le 3\\cos x \\le 3$. Vậy tập giá trị của hàm số là $[-3; 3]$.',
        pedagogicalTip: 'Vì $\\cos x$ đạt cả hai giá trị biên $-1$ và $1$ nên tập giá trị là đoạn đóng $[-3; 3]$.',
        points: 0.25,
      },
      {
        id: 'd3-p1-q10',
        part: 'part1',
        number: 10,
        topic: 'Phương trình lượng giác cơ bản',
        prompt: 'Nghiệm của phương trình $\\tan x = 1$ là:',
        options: [
          { key: 'A', content: '$x = \\frac{\\pi}{2} + k\\pi\\ (k \\in \\mathbb{Z})$' },
          { key: 'B', content: '$x = -\\frac{\\pi}{4} + k\\pi\\ (k \\in \\mathbb{Z})$' },
          { key: 'C', content: '$x = \\frac{\\pi}{4} + k2\\pi\\ (k \\in \\mathbb{Z})$' },
          { key: 'D', content: '$x = \\frac{\\pi}{4} + k\\pi\\ (k \\in \\mathbb{Z})$' },
        ],
        correctAnswer: 'D',
        explanation:
          'Phương trình $\\tan x = 1 \\Leftrightarrow \\tan x = \\tan\\frac{\\pi}{4} \\Leftrightarrow x = \\frac{\\pi}{4} + k\\pi\\ (k \\in \\mathbb{Z})$.',
        pedagogicalTip: 'Chu kỳ của hàm số $y = \\tan x$ là $\\pi$, nên họ nghiệm của phương trình $\\tan x = \\tan\\alpha$ có đuôi $+ k\\pi$.',
        points: 0.25,
      },
      {
        id: 'd3-p1-q11',
        part: 'part1',
        number: 11,
        topic: 'Tổng n số hạng đầu của cấp số cộng',
        prompt: 'Cho cấp số cộng $(u_n)$ có $u_1 = 3$ và công sai $d = 4$. Tổng của $40$ số hạng đầu tiên là:',
        options: [
          { key: 'A', content: '$159$' },
          { key: 'B', content: '$3240$' },
          { key: 'C', content: '$6480$' },
          { key: 'D', content: '$3120$' },
        ],
        correctAnswer: 'B',
        explanation:
          'Áp dụng công thức tính tổng $40$ số hạng đầu tiên của cấp số cộng: $S_{40} = \\frac{40 \\cdot [2u_1 + 39d]}{2} = 20 \\cdot [2 \\cdot 3 + 39 \\cdot 4] = 20 \\cdot 162 = 3240$.',
        pedagogicalTip: 'Công thức tổng $n$ số hạng đầu của cấp số cộng: $S_n = \\frac{n[2u_1 + (n - 1)d]}{2}$.',
        points: 0.25,
      },
      {
        id: 'd3-p1-q12',
        part: 'part1',
        number: 12,
        topic: 'Cấp số nhân',
        prompt: 'Cho cấp số nhân $(u_n)$ có số hạng đầu $u_1 = 3$ và công bội $q = 2$. Số hạng thứ năm $u_5$ bằng:',
        options: [
          { key: 'A', content: '$48$' },
          { key: 'B', content: '$96$' },
          { key: 'C', content: '$24$' },
          { key: 'D', content: '$30$' },
        ],
        correctAnswer: 'A',
        explanation:
          'Ta có $u_5 = u_1 \\cdot q^4 = 3 \\cdot 2^4 = 48$.',
        pedagogicalTip: 'Áp dụng công thức số hạng tổng quát của cấp số nhân: $u_n = u_1 \\cdot q^{n-1}$.',
        points: 0.25,
      },
    ],
    part2: [
      {
        id: 'd3-p2-q1',
        part: 'part2',
        number: 13,
        topic: 'Hàm số lượng giác',
        prompt: 'Cho hàm số lượng giác $y = 2\\sin 3x - 1$. Xét tính đúng sai của các khẳng định sau:',
        statements: [
          {
            id: 'a',
            label: 'a',
            statement: 'Tập xác định của hàm số là $\\mathbb{R}$.',
            isCorrect: true,
            explanation: 'Đúng. Hàm số $y = 2\\sin 3x - 1$ xác định với mọi $x \\in \\mathbb{R}$ nên tập xác định là $D = \\mathbb{R}$.',
          },
          {
            id: 'b',
            label: 'b',
            statement: 'Giá trị lớn nhất của hàm số là $1$.',
            isCorrect: true,
            explanation: 'Đúng. Ta có $-1 \\le \\sin 3x \\le 1 \\Rightarrow -2 \\le 2\\sin 3x \\le 2 \\Rightarrow -3 \\le 2\\sin 3x - 1 \\le 1$. Giá trị lớn nhất của hàm số là $1$.',
          },
          {
            id: 'c',
            label: 'c',
            statement: 'Đồ thị hàm số đi qua điểm $N\\left(\\frac{\\pi}{6}; 1\\right)$.',
            isCorrect: true,
            explanation: 'Đúng. Thay $x = \\frac{\\pi}{6}$ vào hàm số ta được $y = 2\\sin\\left(3 \\cdot \\frac{\\pi}{6}\\right) - 1 = 2\\sin\\frac{\\pi}{2} - 1 = 2 \\cdot 1 - 1 = 1$. Do đó đồ thị đi qua điểm $N\\left(\\frac{\\pi}{6}; 1\\right)$.',
          },
          {
            id: 'd',
            label: 'd',
            statement: 'Hàm số đã cho là hàm số lẻ.',
            isCorrect: false,
            explanation: 'Sai. Ta có $f(-x) = 2\\sin(-3x) - 1 = -2\\sin 3x - 1 \\neq -f(x) = -2\\sin 3x + 1$. Do đó hàm số không phải là hàm số lẻ.',
          },
        ],
        pedagogicalTip: 'Hàm số $y = a\\sin bx + c$ với $c \\neq 0$ không phải là hàm số lẻ vì $f(0) = c \\neq 0$.',
      },
      {
        id: 'd3-p2-q2',
        part: 'part2',
        number: 14,
        topic: 'Ứng dụng thực tế của cấp số cộng',
        prompt:
          'Để trang trí sân khấu, người ta xếp các khối hộp thành một hình tháp: hàng trên cùng có $4$ khối, hàng ngay dưới có $7$ khối, hàng dưới tiếp theo có $10$ khối,... và cứ tiếp tục như vậy. Biết tháp có tất cả $12$ hàng. Xét tính đúng sai của các khẳng định sau:',
        statements: [
          {
            id: 'a',
            label: 'a',
            statement:
              'Số khối hộp ở mỗi hàng tính từ trên xuống lập thành một cấp số cộng với số hạng đầu $u_1 = 4$ và công sai $d = 3$.',
            isCorrect: true,
            explanation:
              'Đúng. Số khối hộp ở các hàng lần lượt là $4,\\ 7,\\ 10,\\dots$ Đây là cấp số cộng có số hạng đầu $u_1 = 4$ và công sai $d = 7 - 4 = 3$.',
          },
          {
            id: 'b',
            label: 'b',
            statement: 'Hàng thứ $5$ của tháp có $19$ khối hộp.',
            isCorrect: false,
            explanation:
              'Sai. Số khối hộp ở hàng thứ $5$ là $u_5 = u_1 + 4d = 4 + 4 \\cdot 3 = 16$ (khối hộp).',
          },
          {
            id: 'c',
            label: 'c',
            statement: 'Hàng dưới cùng có $37$ khối hộp.',
            isCorrect: true,
            explanation:
              'Đúng. Hàng dưới cùng là hàng thứ $12$, số khối hộp là $u_{12} = u_1 + 11d = 4 + 11 \\cdot 3 = 37$ (khối hộp).',
          },
          {
            id: 'd',
            label: 'd',
            statement: 'Tổng số khối hộp cần dùng để xếp toàn bộ tháp là $250$ khối.',
            isCorrect: false,
            explanation:
              'Sai. Tổng số khối hộp cần dùng để xếp toàn bộ tháp là $S_{12} = \\frac{12 \\cdot (u_1 + u_{12})}{2} = 6 \\cdot (4 + 37) = 246$ (khối hộp).',
          },
        ],
        pedagogicalTip: 'Chú ý công thức số hạng thứ $n$ là $u_n = u_1 + (n - 1)d$ (hàng thứ $5$ ứng với $u_1 + 4d = 16$, tránh nhầm thành $u_1 + 5d = 19$).',
      },
    ],
    part3: [
      {
        id: 'd3-p3-q1',
        part: 'part3',
        number: 15,
        topic: 'Phương trình lượng giác',
        prompt:
          'Tìm nghiệm âm lớn nhất của phương trình lượng giác $2\\sin x + \\sqrt{2} = 0$, biết nghiệm có dạng $-\\frac{a\\pi}{b}$ với $a, b$ là các số nguyên dương và phân số $\\frac{a}{b}$ tối giản. Tính $3a + b$.',
        acceptableAnswers: ['7'],
        explanation:
          'Ta có $2\\sin x + \\sqrt{2} = 0 \\Leftrightarrow \\sin x = -\\frac{\\sqrt{2}}{2} \\Leftrightarrow \\left[\\begin{array}{l} x = -\\frac{\\pi}{4} + k2\\pi \\\\ x = \\frac{5\\pi}{4} + k2\\pi \\end{array}\\right. (k \\in \\mathbb{Z})$. Nghiệm âm lớn nhất của phương trình là $x = -\\frac{\\pi}{4}$, ứng với $a = 1,\\ b = 4$. Suy ra $3a + b = 3 \\cdot 1 + 4 = 7$.',
        pedagogicalTip: 'Xét các giá trị nguyên của $k$ để tìm nghiệm âm gần $0$ nhất trên đường tròn lượng giác.',
        points: 0.5,
      },
      {
        id: 'd3-p3-q2',
        part: 'part3',
        number: 16,
        topic: 'Ứng dụng thực tế của hàm số lượng giác',
        prompt:
          'Độ sâu $h$ (mét) của mực nước ở một cảng biển vào thời điểm $t$ (giờ) sau khi thủy triều lên lần đầu tiên trong ngày được tính xấp xỉ bởi công thức: $h = 5 + 3\\sin\\left(\\frac{\\pi}{6}t\\right)$. Tìm độ sâu lớn nhất của mực nước biển.',
        acceptableAnswers: ['8'],
        unit: 'mét',
        explanation:
          'Vì $-1 \\le \\sin\\left(\\frac{\\pi}{6}t\\right) \\le 1$ nên $-3 \\le 3\\sin\\left(\\frac{\\pi}{6}t\\right) \\le 3 \\Rightarrow 2 \\le 5 + 3\\sin\\left(\\frac{\\pi}{6}t\\right) \\le 8$. Do đó độ sâu lớn nhất của mực nước biển là $8$ mét.',
        pedagogicalTip: 'Giá trị lớn nhất của biểu thức $A + B\\sin(u)$ (với $B > 0$) bằng $A + B$.',
        points: 0.5,
      },
      {
        id: 'd3-p3-q3',
        part: 'part3',
        number: 17,
        topic: 'Cấp số cộng',
        prompt:
          'Cho cấp số cộng $(u_n)$ có số hạng đầu $u_1 = 7$ và công sai $d = 5$. Số $102$ là số hạng thứ bao nhiêu của cấp số cộng này?',
        acceptableAnswers: ['20'],
        explanation:
          'Áp dụng công thức số hạng tổng quát $u_n = u_1 + (n - 1)d$: $102 = 7 + (n - 1) \\cdot 5 \\Leftrightarrow 5(n - 1) = 95 \\Leftrightarrow n - 1 = 19 \\Leftrightarrow n = 20$. Vậy số $102$ là số hạng thứ $20$.',
        pedagogicalTip: 'Từ $u_n = u_1 + (n - 1)d$, ta tính nhanh thứ tự số hạng theo công thức $n = \\frac{u_n - u_1}{d} + 1$.',
        points: 0.5,
      },
      {
        id: 'd3-p3-q4',
        part: 'part3',
        number: 18,
        topic: 'Mốt của mẫu số liệu ghép nhóm',
        prompt:
          'Khảo sát điểm thi môn Toán của $50$ học sinh, thu được bảng phân bố tần số ghép nhóm sau:\n$$\\begin{array}{|l|c|c|c|c|}\\hline \\text{Điểm số} & [2; 4) & [4; 6) & [6; 8) & [8; 10] \\\\ \\hline \\text{Số học sinh} & 5 & 15 & 22 & 8 \\\\ \\hline \\end{array}$$\nTính giá trị Mốt của mẫu số liệu ghép nhóm trên (làm tròn kết quả đến chữ số thập phân thứ nhất).',
        acceptableAnswers: ['6,7', '6.7'],
        explanation:
          'Nhóm chứa Mốt là nhóm $[6; 8)$ vì có tần số lớn nhất là $n_3 = 22$. Ta có $u_3 = 6,\\ u_4 - u_3 = 2,\\ n_2 = 15,\\ n_4 = 8$. Mốt $M_o = 6 + \\frac{22 - 15}{(22 - 15) + (22 - 8)} \\cdot 2 = 6 + \\frac{7}{21} \\cdot 2 = 6 + \\frac{2}{3} \\approx 6,7$.',
        pedagogicalTip: 'Công thức mốt của mẫu số liệu ghép nhóm: $M_o = u_m + \\frac{n_m - n_{m-1}}{(n_m - n_{m-1}) + (n_m - n_{m+1})} \\cdot (u_{m+1} - u_m)$.',
        points: 0.5,
      },
    ],
    part4: [
      {
        id: 'd3-p4-q1',
        part: 'part4',
        number: 19,
        topic: 'Tổng các nghiệm của phương trình lượng giác',
        problemStatement:
          'Tính tổng các nghiệm phân biệt của phương trình $\\tan x = 1$ trên khoảng $(0; 3\\pi)$ (kết quả chia cho $\\pi$).',
        conclusionTarget: 'Xác định các nghiệm thuộc $(0; 3\\pi)$ và tính tổng các nghiệm chia cho $\\pi$.',
        steps: [
          {
            id: 'd3-p4-q1-s1',
            originalIndex: 1,
            roleDescription: 'Giải phương trình tìm họ nghiệm tổng quát',
            content:
              'Phương trình $\\tan x = 1 \\Leftrightarrow x = \\frac{\\pi}{4} + k\\pi\\ (k \\in \\mathbb{Z})$.',
          },
          {
            id: 'd3-p4-q1-s2',
            originalIndex: 2,
            roleDescription: 'Tìm các giá trị nguyên k ứng với khoảng (0; 3π)',
            content:
              'Vì $x \\in (0; 3\\pi)$ nên $0 < \\frac{\\pi}{4} + k\\pi < 3\\pi \\Leftrightarrow -\\frac{1}{4} < k < \\frac{11}{4}$, kết hợp $k \\in \\mathbb{Z}$ suy ra $k \\in \\{0; 1; 2\\}$.',
          },
          {
            id: 'd3-p4-q1-s3',
            originalIndex: 3,
            roleDescription: 'Liệt kê các nghiệm phân biệt trên (0; 3π)',
            content:
              'Ứng với $k \\in \\{0; 1; 2\\}$, các nghiệm của phương trình trên $(0; 3\\pi)$ là $x_1 = \\frac{\\pi}{4},\\ x_2 = \\frac{5\\pi}{4},\\ x_3 = \\frac{9\\pi}{4}$.',
          },
          {
            id: 'd3-p4-q1-s4',
            originalIndex: 4,
            roleDescription: 'Tính tổng các nghiệm và chia cho π',
            content:
              'Tổng các nghiệm là $S = \\frac{\\pi}{4} + \\frac{5\\pi}{4} + \\frac{9\\pi}{4} = \\frac{15\\pi}{4} = 3,75\\pi$. Vậy kết quả chia cho $\\pi$ bằng $3,75$.',
          },
        ],
        pedagogicalTip: 'Đặt bất phương trình $0 < \\frac{\\pi}{4} + k\\pi < 3\\pi$ và rút gọn $\\pi$ ở cả ba vế để tìm chính xác các giá trị nguyên $k$.',
        teacherAnalysis: 'Giải $\\tan x = 1 \\Leftrightarrow x = \\frac{\\pi}{4} + k\\pi$ -> Chặn $0 < x < 3\\pi$ tìm $k \\in \\{0; 1; 2\\}$ -> Cộng 3 nghiệm được $3,75\\pi$.',
        points: 0.75,
      },
      {
        id: 'd3-p4-q2',
        part: 'part4',
        number: 20,
        topic: 'Bài toán thực tế cấp số nhân',
        problemStatement:
          'Một bệnh nhân được chỉ định uống một loại thuốc đặc trị. Mỗi liều thuốc chứa $20\\text{ mg}$ hoạt chất và được uống định kỳ cách nhau đúng $24$ giờ. Tuy nhiên, sau mỗi $24$ giờ, thận của bệnh nhân sẽ đào thải $25\\%$ lượng hoạt chất có trong máu (nghĩa là chỉ còn lại $75\\%$). Ngay sau khi bệnh nhân uống liều thứ $5$, tổng lượng hoạt chất của thuốc còn lại trong cơ thể là bao nhiêu? (Kết quả làm tròn đến hàng đơn vị).',
        conclusionTarget: 'Tính tổng lượng hoạt chất còn lại trong cơ thể ngay sau liều thứ $5$ (làm tròn đến hàng đơn vị).',
        steps: [
          {
            id: 'd3-p4-q2-s1',
            originalIndex: 1,
            roleDescription: 'Xác định quy luật lượng thuốc còn lại sau mỗi 24 giờ',
            content:
              'Mỗi liều thuốc chứa $u_1 = 20\\text{ mg}$ hoạt chất và sau mỗi $24$ giờ lượng hoạt chất còn lại trong máu bằng $75\\%$ lượng trước đó (tức nhân với $q = 0,75$).',
          },
          {
            id: 'd3-p4-q2-s2',
            originalIndex: 2,
            roleDescription: 'Biểu diễn lượng thuốc bằng tổng của cấp số nhân',
            content:
              'Ngay sau khi uống liều thứ $5$, tổng lượng hoạt chất của cả $5$ liều còn lại trong cơ thể lập thành tổng của một cấp số nhân gồm $5$ số hạng với $u_1 = 20$ và công bội $q = 0,75$.',
          },
          {
            id: 'd3-p4-q2-s3',
            originalIndex: 3,
            roleDescription: 'Áp dụng công thức tổng 5 số hạng đầu của cấp số nhân',
            content:
              'Tổng lượng hoạt chất ngay sau khi uống liều thứ $5$ là: $S_5 = 20 \\cdot \\frac{1 - 0,75^5}{1 - 0,75} = 80 \\cdot (1 - 0,75^5)\\text{ (mg)}$.',
          },
          {
            id: 'd3-p4-q2-s4',
            originalIndex: 4,
            roleDescription: 'Tính giá trị xấp xỉ và làm tròn kết quả',
            content:
              'Ta tính được $S_5 \\approx 61,015625\\text{ mg}$. Làm tròn kết quả đến hàng đơn vị ta được $61\\text{ mg}$.',
          },
        ],
        pedagogicalTip: 'Đào thải $25\\%$ có nghĩa là tỷ lệ hoạt chất giữ lại sau mỗi $24$ giờ là công bội $q = 1 - 0,25 = 0,75$.',
        teacherAnalysis: 'Xác định cấp số nhân $u_1 = 20, q = 0,75$ -> Tính tổng $S_5 = 20 \\cdot \\frac{1 - 0,75^5}{1 - 0,75}$ -> Làm tròn được $61\\text{ mg}$.',
        points: 0.75,
      },
      {
        id: 'd3-p4-q3',
        part: 'part4',
        number: 21,
        topic: 'Tính giá trị biểu thức lượng giác',
        problemStatement:
          'Cho $\\sin x = -\\frac{4}{5}$ với $\\pi < x < \\frac{3\\pi}{2}$. Tính giá trị biểu thức $B = \\sin 2x + \\cos x$.',
        conclusionTarget: 'Tính giá trị của biểu thức $B = \\sin 2x + \\cos x$.',
        steps: [
          {
            id: 'd3-p4-q3-s1',
            originalIndex: 1,
            roleDescription: 'Xác định dấu của cos x',
            content:
              'Vì $\\pi < x < \\frac{3\\pi}{2}$ (góc thuộc góc phần tư thứ III) nên $\\cos x < 0$.',
          },
          {
            id: 'd3-p4-q3-s2',
            originalIndex: 2,
            roleDescription: 'Tính giá trị của cos x',
            content:
              'Ta có $\\cos x = -\\sqrt{1 - \\sin^2 x} = -\\sqrt{1 - \\left(-\\frac{4}{5}\\right)^2} = -\\frac{3}{5}$.',
          },
          {
            id: 'd3-p4-q3-s3',
            originalIndex: 3,
            roleDescription: 'Áp dụng công thức nhân đôi tính sin 2x',
            content:
              'Khi đó $\\sin 2x = 2\\sin x\\cos x = 2 \\cdot \\left(-\\frac{4}{5}\\right) \\cdot \\left(-\\frac{3}{5}\\right) = \\frac{24}{25}$.',
          },
          {
            id: 'd3-p4-q3-s4',
            originalIndex: 4,
            roleDescription: 'Thay vào biểu thức B và kết luận',
            content:
              'Suy ra $B = \\sin 2x + \\cos x = \\frac{24}{25} - \\frac{3}{5} = \\frac{9}{25} = 0,36$.',
          },
        ],
        pedagogicalTip: 'Chú ý dấu của $\\cos x$ trên khoảng $\\left(\\pi; \\frac{3\\pi}{2}\\right)$ là âm trước khi thay vào công thức $\\sin 2x = 2\\sin x\\cos x$.',
        teacherAnalysis: 'Xác định $\\cos x < 0$ -> Tính $\\cos x = -\\frac{3}{5}$ -> Tính $\\sin 2x = \\frac{24}{25}$ -> Suy ra $B = \\frac{9}{25} = 0,36$.',
        points: 0.75,
      },
      {
        id: 'd3-p4-q4',
        part: 'part4',
        number: 22,
        topic: 'Tứ phân vị của mẫu số liệu ghép nhóm',
        problemStatement:
          'Cho bảng sau thống kê thời gian ôn thi (giờ) của $40$ học sinh lớp 11C như sau:\n$$\\begin{array}{|l|c|c|c|c|c|}\\hline \\text{Thời gian (giờ)} & [10; 15) & [15; 20) & [20; 25) & [25; 30) & [30; 35) \\\\ \\hline \\text{Số học sinh} & 6 & 10 & 14 & 7 & 3 \\\\ \\hline \\end{array}$$\nTính tứ phân vị thứ ba ($Q_3$) của mẫu số liệu trên.',
        conclusionTarget: 'Tính giá trị tứ phân vị thứ ba $Q_3$.',
        steps: [
          {
            id: 'd3-p4-q4-s1',
            originalIndex: 1,
            roleDescription: 'Xác định cỡ mẫu và vị trí tứ phân vị thứ ba',
            content:
              'Cỡ mẫu $n = 40$. Vị trí của tứ phân vị thứ ba $Q_3$ ứng với $\\frac{3n}{4} = \\frac{3 \\cdot 40}{4} = 30$.',
          },
          {
            id: 'd3-p4-q4-s2',
            originalIndex: 2,
            roleDescription: 'Xác định nhóm chứa Q₃ theo tần số tích lũy',
            content:
              'Nhóm chứa $Q_3$ là nhóm $[20; 25)$ do có tần số tích lũy $6 + 10 + 14 = 30$.',
          },
          {
            id: 'd3-p4-q4-s3',
            originalIndex: 3,
            roleDescription: 'Xác định các đại lượng trong công thức Q₃',
            content:
              'Nhóm $[20; 25)$ có đầu mút trái $u_3 = 20$, đầu mút phải $u_4 = 25$, tần số của nhóm $n_3 = 14$ và tần số tích lũy của nhóm liền trước $C = 6 + 10 = 16$.',
          },
          {
            id: 'd3-p4-q4-s4',
            originalIndex: 4,
            roleDescription: 'Thay số vào công thức tính Q₃ và kết luận',
            content:
              'Áp dụng công thức tứ phân vị thứ ba: $Q_3 = 20 + \\frac{30 - 16}{14} \\cdot (25 - 20) = 20 + 5 = 25$.',
          },
        ],
        pedagogicalTip: 'Khi $\\frac{3n}{4}$ bằng đúng tần số tích lũy của nhóm $[u_m; u_{m+1})$, giá trị $Q_3$ sẽ bằng đúng đầu mút phải $u_{m+1}$.',
        teacherAnalysis: 'Tính $\\frac{3n}{4} = 30$ -> Xác định nhóm $[20; 25)$ chứa $Q_3$ -> Xác định $u_3 = 20, C = 16, n_3 = 14, h = 5$ -> Tính $Q_3 = 25$.',
        points: 0.75,
      },
    ],
  },

  // ============================================================================
  // ĐỀ 04: ĐỀ ÔN TẬP & KIỂM TRA GIỮA HỌC KỲ I TOÁN 11 - ĐỀ 4
  // ============================================================================
  {
    id: 'de-04',
    title: 'đề ôn gk1 04',
    subtitle: 'Lượng Giác, Dãy Số - Cấp Số Cộng - Cấp Số Nhân & Mẫu Số Liệu Ghép Nhóm (Đề 4)',
    grade: 11,
    durationMinutes: 90,
    totalPoints: 10,
    description:
      'Đề khảo sát đánh giá năng lực môn Toán lớp 11 - Đề 04 chuẩn cấu trúc 4 phần (22 câu hỏi): Góc và công thức lượng giác, Hàm số & Phương trình lượng giác, Dãy số - Cấp số cộng - Cấp số nhân, và Mẫu số liệu ghép nhóm.',
    part1: [
      {
        id: 'd4-p1-q1',
        part: 'part1',
        number: 1,
        topic: 'Đổi số đo góc lượng giác',
        prompt: 'Đổi số đo góc lượng giác $300^\\circ$ sang radian.',
        options: [
          { key: 'A', content: '$\\frac{5\\pi}{6}$' },
          { key: 'B', content: '$\\frac{7\\pi}{4}$' },
          { key: 'C', content: '$\\frac{5\\pi}{3}$' },
          { key: 'D', content: '$\\frac{4\\pi}{3}$' },
        ],
        correctAnswer: 'C',
        explanation:
          'Ta có $300^\\circ = 300 \\cdot \\frac{\\pi}{180} = \\frac{5\\pi}{3}$ (rad).',
        pedagogicalTip: 'Công thức đổi từ độ sang radian: $\\alpha = a^\\circ \\cdot \\frac{\\pi}{180^\\circ}$.',
        points: 0.25,
      },
      {
        id: 'd4-p1-q2',
        part: 'part1',
        number: 2,
        topic: 'Hệ thức lượng giác cơ bản',
        prompt: 'Trong các hệ thức lượng giác sau, hệ thức nào đúng với mọi $\\alpha$ làm cho biểu thức có nghĩa?',
        options: [
          { key: 'A', content: '$1 + \\tan^2\\alpha = \\frac{1}{\\cos^2\\alpha}$' },
          { key: 'B', content: '$\\sin^2\\alpha - \\cos^2\\alpha = 1$' },
          { key: 'C', content: '$\\tan\\alpha \\cdot \\cot\\alpha = -1$' },
          { key: 'D', content: '$1 + \\cot^2\\alpha = \\frac{1}{\\sin\\alpha}$' },
        ],
        correctAnswer: 'A',
        explanation:
          'Theo các hằng đẳng thức lượng giác cơ bản, ta có $1 + \\tan^2\\alpha = \\frac{1}{\\cos^2\\alpha}$ với mọi $\\alpha \\neq \\frac{\\pi}{2} + k\\pi\\ (k \\in \\mathbb{Z})$.',
        pedagogicalTip: 'Chú ý mẫu số ở vế phải phải có bình phương: $1 + \\tan^2\\alpha = \\frac{1}{\\cos^2\\alpha}$ và $1 + \\cot^2\\alpha = \\frac{1}{\\sin^2\\alpha}$.',
        points: 0.25,
      },
      {
        id: 'd4-p1-q3',
        part: 'part1',
        number: 3,
        topic: 'Giá trị lượng giác của một góc',
        prompt: 'Cho $\\sin\\alpha = -\\frac{3}{5}$ và $\\pi < \\alpha < \\frac{3\\pi}{2}$. Tính giá trị của $\\cos\\alpha$.',
        options: [
          { key: 'A', content: '$-\\frac{4}{5}$' },
          { key: 'B', content: '$-\\frac{16}{25}$' },
          { key: 'C', content: '$\\frac{4}{5}$' },
          { key: 'D', content: '$\\frac{16}{25}$' },
        ],
        correctAnswer: 'A',
        explanation:
          'Vì $\\pi < \\alpha < \\frac{3\\pi}{2}$ (góc phần tư thứ III) nên $\\cos\\alpha < 0$. Ta có $\\cos\\alpha = -\\sqrt{1 - \\sin^2\\alpha} = -\\sqrt{1 - \\left(-\\frac{3}{5}\\right)^2} = -\\sqrt{1 - \\frac{9}{25}} = -\\frac{4}{5}$.',
        pedagogicalTip: 'Trên khoảng $\\left(\\pi; \\frac{3\\pi}{2}\\right)$ thuộc góc phần tư thứ III, cả $\\sin\\alpha$ và $\\cos\\alpha$ đều nhận giá trị âm.',
        points: 0.25,
      },
      {
        id: 'd4-p1-q4',
        part: 'part1',
        number: 4,
        topic: 'Tập xác định của hàm số lượng giác',
        prompt: 'Tập xác định của hàm số $y = \\tan x$ là:',
        options: [
          { key: 'A', content: '$\\mathbb{R} \\setminus \\left\\{\\frac{\\pi}{2} + k\\pi, k \\in \\mathbb{Z}\\right\\}$' },
          { key: 'B', content: '$\\mathbb{R} \\setminus \\{k\\pi, k \\in \\mathbb{Z}\\}$' },
          { key: 'C', content: '$\\mathbb{R}$' },
          { key: 'D', content: '$[-1; 1]$' },
        ],
        correctAnswer: 'A',
        explanation:
          'Hàm số $y = \\tan x = \\frac{\\sin x}{\\cos x}$ xác định khi $\\cos x \\neq 0 \\Leftrightarrow x \\neq \\frac{\\pi}{2} + k\\pi\\ (k \\in \\mathbb{Z})$. Vậy tập xác định của hàm số là $D = \\mathbb{R} \\setminus \\left\\{\\frac{\\pi}{2} + k\\pi, k \\in \\mathbb{Z}\\right\\}$.',
        pedagogicalTip: 'Hàm số $y = \\tan x$ xác định khi $\\cos x \\neq 0 \\Leftrightarrow x \\neq \\frac{\\pi}{2} + k\\pi\\ (k \\in \\mathbb{Z})$.',
        points: 0.25,
      },
      {
        id: 'd4-p1-q5',
        part: 'part1',
        number: 5,
        topic: 'Tính tăng, giảm của dãy số',
        prompt: 'Cho dãy số $(u_n)$ với $u_n = 2n - 7$. Khẳng định nào sau đây là đúng?',
        options: [
          { key: 'A', content: '$(u_n)$ là dãy số giảm.' },
          { key: 'B', content: '$(u_n)$ là dãy số không đổi.' },
          { key: 'C', content: '$(u_n)$ là dãy số tăng.' },
          { key: 'D', content: '$(u_n)$ không tăng, không giảm.' },
        ],
        correctAnswer: 'C',
        explanation:
          'Xét hiệu $u_{n+1} - u_n = [2(n + 1) - 7] - (2n - 7) = 2n + 2 - 7 - 2n + 7 = 2 > 0$ với mọi $n \\ge 1$. Do đó $(u_n)$ là dãy số tăng.',
        pedagogicalTip: 'Nếu $u_{n+1} - u_n > 0$ với mọi $n \\in \\mathbb{N}^*$ thì dãy số $(u_n)$ là dãy số tăng.',
        points: 0.25,
      },
      {
        id: 'd4-p1-q6',
        part: 'part1',
        number: 6,
        topic: 'Cấp số cộng',
        prompt: 'Cho cấp số cộng $(u_n)$ có số hạng đầu $u_1 = 4$ và công sai $d = -2$. Số hạng thứ ba $u_3$ bằng:',
        options: [
          { key: 'A', content: '$-2$' },
          { key: 'B', content: '$8$' },
          { key: 'C', content: '$2$' },
          { key: 'D', content: '$0$' },
        ],
        correctAnswer: 'D',
        explanation:
          'Ta có số hạng tổng quát của cấp số cộng là $u_n = u_1 + (n - 1)d$. Do đó $u_3 = u_1 + 2d = 4 + 2 \\cdot (-2) = 0$.',
        pedagogicalTip: 'Áp dụng công thức số hạng tổng quát của cấp số cộng: $u_n = u_1 + (n - 1)d$.',
        points: 0.25,
      },
      {
        id: 'd4-p1-q7',
        part: 'part1',
        number: 7,
        topic: 'Số trung bình của mẫu số liệu ghép nhóm',
        prompt:
          'Khảo sát thời gian tự học (giờ/tuần) của $40$ học sinh lớp 11A, ta có bảng số liệu ghép nhóm sau:\n$$\\begin{array}{|l|c|c|c|c|c|}\\hline \\text{Thời gian} & [0; 4) & [4; 8) & [8; 12) & [12; 16) & [16; 20) \\\\ \\hline \\text{Số học sinh} & 4 & 8 & 12 & 10 & 6 \\\\ \\hline \\end{array}$$\nSố trung bình của mẫu số liệu là:',
        options: [
          { key: 'A', content: '$11,0$' },
          { key: 'B', content: '$10,6$' },
          { key: 'C', content: '$9,8$' },
          { key: 'D', content: '$10,2$' },
        ],
        correctAnswer: 'B',
        explanation:
          'Giá trị đại diện của các nhóm lần lượt là $x_1 = 2,\\ x_2 = 6,\\ x_3 = 10,\\ x_4 = 14,\\ x_5 = 18$. Số trung bình của mẫu số liệu ghép nhóm là $\\bar{x} = \\frac{4 \\cdot 2 + 8 \\cdot 6 + 12 \\cdot 10 + 10 \\cdot 14 + 6 \\cdot 18}{40} = \\frac{8 + 48 + 120 + 140 + 108}{40} = \\frac{424}{40} = 10,6$.',
        pedagogicalTip: 'Tính giá trị đại diện $x_i = \\frac{a_i + a_{i+1}}{2}$ của từng nhóm trước khi áp dụng công thức $\\bar{x} = \\frac{\\sum n_i x_i}{n}$.',
        points: 0.25,
      },
      {
        id: 'd4-p1-q8',
        part: 'part1',
        number: 8,
        topic: 'Trung vị của mẫu số liệu ghép nhóm',
        prompt:
          'Khảo sát số tiền chi tiêu trong một ngày (nghìn đồng) của $50$ học sinh, ta có bảng số liệu ghép nhóm sau:\n$$\\begin{array}{|l|c|c|c|c|c|}\\hline \\text{Số tiền} & [10; 20) & [20; 30) & [30; 40) & [40; 50) & [50; 60) \\\\ \\hline \\text{Số học sinh} & 8 & 12 & 16 & 10 & 4 \\\\ \\hline \\end{array}$$\nTrung vị của mẫu số liệu là:',
        options: [
          { key: 'A', content: '$31,25$' },
          { key: 'B', content: '$33,125$' },
          { key: 'C', content: '$35,0$' },
          { key: 'D', content: '$32,5$' },
        ],
        correctAnswer: 'B',
        explanation:
          'Cỡ mẫu $n = 50 \\Rightarrow \\frac{n}{2} = 25$. Tần số tích lũy của nhóm $1$ là $8$; nhóm $2$ là $8 + 12 = 20$; nhóm $3$ là $20 + 16 = 36$. Do đó nhóm chứa trung vị là nhóm thứ ba $[30; 40)$. Ta có $u_3 = 30,\\ n_3 = 16,\\ C = 20,\\ h = 10$. Trung vị là $M_e = 30 + \\frac{25 - 20}{16} \\cdot 10 = 30 + \\frac{50}{16} = 33,125$.',
        pedagogicalTip: 'Công thức trung vị của mẫu số liệu ghép nhóm: $M_e = u_m + \\frac{\\frac{n}{2} - C}{n_m} \\cdot (u_{m+1} - u_m)$.',
        points: 0.25,
      },
      {
        id: 'd4-p1-q9',
        part: 'part1',
        number: 9,
        topic: 'Tập giá trị của hàm số lượng giác',
        prompt: 'Tập giá trị của hàm số $y = 2\\sin x - 1$ là:',
        options: [
          { key: 'A', content: '$[-2; 2]$' },
          { key: 'B', content: '$[-1; 1]$' },
          { key: 'C', content: '$[0; 2]$' },
          { key: 'D', content: '$[-3; 1]$' },
        ],
        correctAnswer: 'D',
        explanation:
          'Ta có $-1 \\le \\sin x \\le 1 \\Leftrightarrow -2 \\le 2\\sin x \\le 2 \\Leftrightarrow -3 \\le 2\\sin x - 1 \\le 1$. Vậy tập giá trị của hàm số là $[-3; 1]$.',
        pedagogicalTip: 'Từ $-1 \\le \\sin x \\le 1$, nhân với $2$ rồi trừ $1$ ở cả ba vế để suy ra tập giá trị.',
        points: 0.25,
      },
      {
        id: 'd4-p1-q10',
        part: 'part1',
        number: 10,
        topic: 'Phương trình lượng giác cơ bản',
        prompt: 'Nghiệm của phương trình $\\tan x = \\sqrt{3}$ là:',
        options: [
          { key: 'A', content: '$x = \\frac{\\pi}{3} + k\\pi\\ (k \\in \\mathbb{Z})$' },
          { key: 'B', content: '$x = \\frac{\\pi}{3} + k2\\pi\\ (k \\in \\mathbb{Z})$' },
          { key: 'C', content: '$x = -\\frac{\\pi}{3} + k\\pi\\ (k \\in \\mathbb{Z})$' },
          { key: 'D', content: '$x = \\frac{\\pi}{6} + k\\pi\\ (k \\in \\mathbb{Z})$' },
        ],
        correctAnswer: 'A',
        explanation:
          'Ta có $\\tan x = \\sqrt{3} \\Leftrightarrow \\tan x = \\tan\\frac{\\pi}{3} \\Leftrightarrow x = \\frac{\\pi}{3} + k\\pi\\ (k \\in \\mathbb{Z})$.',
        pedagogicalTip: 'Phương trình $\\tan x = \\tan\\alpha$ có họ nghiệm $x = \\alpha + k\\pi\\ (k \\in \\mathbb{Z})$.',
        points: 0.25,
      },
      {
        id: 'd4-p1-q11',
        part: 'part1',
        number: 11,
        topic: 'Tổng n số hạng đầu của cấp số cộng',
        prompt: 'Cho cấp số cộng $(u_n)$ có $u_1 = 2$ và công sai $d = 3$. Tổng của $30$ số hạng đầu tiên là:',
        options: [
          { key: 'A', content: '$2730$' },
          { key: 'B', content: '$1365$' },
          { key: 'C', content: '$1410$' },
          { key: 'D', content: '$1350$' },
        ],
        correctAnswer: 'B',
        explanation:
          'Tổng $n$ số hạng đầu tiên của cấp số cộng là $S_n = \\frac{n}{2}[2u_1 + (n - 1)d]$. Thay $n = 30,\\ u_1 = 2,\\ d = 3$ ta được $S_{30} = \\frac{30}{2}[2 \\cdot 2 + 29 \\cdot 3] = 15 \\cdot (4 + 87) = 15 \\cdot 91 = 1365$.',
        pedagogicalTip: 'Công thức tổng $n$ số hạng đầu của cấp số cộng: $S_n = \\frac{n[2u_1 + (n - 1)d]}{2}$.',
        points: 0.25,
      },
      {
        id: 'd4-p1-q12',
        part: 'part1',
        number: 12,
        topic: 'Cấp số nhân',
        prompt: 'Cho cấp số nhân $(u_n)$ có số hạng đầu $u_1 = 2$ và công bội $q = 3$. Số hạng thứ tư $u_4$ bằng:',
        options: [
          { key: 'A', content: '$18$' },
          { key: 'B', content: '$54$' },
          { key: 'C', content: '$24$' },
          { key: 'D', content: '$162$' },
        ],
        correctAnswer: 'B',
        explanation:
          'Số hạng tổng quát của cấp số nhân là $u_n = u_1 \\cdot q^{n-1}$. Do đó $u_4 = u_1 \\cdot q^3 = 2 \\cdot 3^3 = 2 \\cdot 27 = 54$.',
        pedagogicalTip: 'Số hạng thứ tư của cấp số nhân là $u_4 = u_1 \\cdot q^3$.',
        points: 0.25,
      },
    ],
    part2: [
      {
        id: 'd4-p2-q1',
        part: 'part2',
        number: 13,
        topic: 'Hàm số lượng giác',
        prompt: 'Cho hàm số lượng giác $y = 3\\cos 2x + 1$. Xét tính đúng sai của các khẳng định sau:',
        statements: [
          {
            id: 'a',
            label: 'a',
            statement: 'Tập xác định của hàm số là $\\mathbb{R}$.',
            isCorrect: true,
            explanation: 'Đúng. Hàm số $y = 3\\cos 2x + 1$ xác định với mọi $x \\in \\mathbb{R}$.',
          },
          {
            id: 'b',
            label: 'b',
            statement: 'Giá trị lớn nhất của hàm số là $3$.',
            isCorrect: false,
            explanation: 'Sai. Vì $-1 \\le \\cos 2x \\le 1 \\Rightarrow -3 \\le 3\\cos 2x \\le 3 \\Rightarrow -2 \\le 3\\cos 2x + 1 \\le 4$. Giá trị lớn nhất của hàm số là $4$.',
          },
          {
            id: 'c',
            label: 'c',
            statement: 'Đồ thị hàm số đi qua điểm $M\\left(\\frac{\\pi}{2}; -2\\right)$.',
            isCorrect: true,
            explanation: 'Đúng. Thay $x = \\frac{\\pi}{2}$ vào hàm số ta được $y = 3\\cos\\left(2 \\cdot \\frac{\\pi}{2}\\right) + 1 = 3\\cos\\pi + 1 = 3(-1) + 1 = -2$.',
          },
          {
            id: 'd',
            label: 'd',
            statement: 'Hàm số đã cho là hàm số lẻ.',
            isCorrect: false,
            explanation: 'Sai. Với mọi $x \\in \\mathbb{R}$, ta có $-x \\in \\mathbb{R}$ và $f(-x) = 3\\cos(-2x) + 1 = 3\\cos 2x + 1 = f(x)$, nên hàm số đã cho là hàm số chẵn.',
          },
        ],
        pedagogicalTip: 'Hàm số $y = a\\cos bx + c$ luôn là hàm số chẵn trên $\\mathbb{R}$ vì $\\cos(-bx) = \\cos bx$.',
      },
      {
        id: 'd4-p2-q2',
        part: 'part2',
        number: 14,
        topic: 'Ứng dụng thực tế của cấp số cộng',
        prompt:
          'Để trang trí sân khấu, người ta xếp các khối hộp thành một hình tháp: hàng trên cùng (hàng $1$) có $5$ khối, hàng ngay dưới có $8$ khối, hàng dưới tiếp theo có $11$ khối,... và cứ tiếp tục như vậy. Biết tháp có tất cả $10$ hàng. Xét tính đúng sai của các khẳng định sau:',
        statements: [
          {
            id: 'a',
            label: 'a',
            statement:
              'Số khối hộp ở mỗi hàng tính từ trên xuống lập thành một cấp số cộng với số hạng đầu $u_1 = 5$ và công sai $d = 3$.',
            isCorrect: true,
            explanation:
              'Đúng. Dãy số biểu diễn số khối hộp mỗi hàng từ trên xuống là $5;\\ 8;\\ 11;\\dots$ lập thành cấp số cộng có $u_1 = 5$ và $d = 8 - 5 = 3$.',
          },
          {
            id: 'b',
            label: 'b',
            statement: 'Hàng thứ $6$ của tháp có $21$ khối hộp.',
            isCorrect: false,
            explanation:
              'Sai. Hàng thứ $6$ có số khối hộp là $u_6 = u_1 + 5d = 5 + 5 \\cdot 3 = 20$ (khối hộp).',
          },
          {
            id: 'c',
            label: 'c',
            statement: 'Hàng dưới cùng có $32$ khối hộp.',
            isCorrect: true,
            explanation:
              'Đúng. Hàng dưới cùng là hàng thứ $10$, có số khối hộp là $u_{10} = u_1 + 9d = 5 + 9 \\cdot 3 = 32$ (khối hộp).',
          },
          {
            id: 'd',
            label: 'd',
            statement: 'Tổng số khối hộp cần dùng để xếp toàn bộ tháp là $200$ khối.',
            isCorrect: false,
            explanation:
              'Sai. Tổng số khối hộp cần dùng là $S_{10} = \\frac{10}{2}(u_1 + u_{10}) = 5 \\cdot (5 + 32) = 185$ (khối hộp).',
          },
        ],
        pedagogicalTip: 'Áp dụng công thức $u_n = u_1 + (n - 1)d$ và $S_n = \\frac{n(u_1 + u_n)}{2}$.',
      },
    ],
    part3: [
      {
        id: 'd4-p3-q1',
        part: 'part3',
        number: 15,
        topic: 'Phương trình lượng giác',
        prompt:
          'Tìm nghiệm âm lớn nhất của phương trình lượng giác $2\\cos x + \\sqrt{3} = 0$, biết nghiệm có dạng $-\\frac{a\\pi}{b}$ với $a, b$ là các số nguyên dương và phân số $\\frac{a}{b}$ tối giản. Tính $a + b$.',
        acceptableAnswers: ['11'],
        explanation:
          'Phương trình $2\\cos x + \\sqrt{3} = 0 \\Leftrightarrow \\cos x = -\\frac{\\sqrt{3}}{2} \\Leftrightarrow x = \\pm\\frac{5\\pi}{6} + k2\\pi\\ (k \\in \\mathbb{Z})$. Nghiệm âm lớn nhất của phương trình ứng với $k = 0$ ở họ nghiệm $x = -\\frac{5\\pi}{6} + k2\\pi$, tức là $x = -\\frac{5\\pi}{6}$. Do đó $a = 5,\\ b = 6 \\Rightarrow a + b = 11$.',
        pedagogicalTip: 'Phương trình $\\cos x = -\\frac{\\sqrt{3}}{2} = \\cos\\frac{5\\pi}{6}$ có nghiệm âm lớn nhất là $-\\frac{5\\pi}{6}$.',
        points: 0.5,
      },
      {
        id: 'd4-p3-q2',
        part: 'part3',
        number: 16,
        topic: 'Ứng dụng thực tế của hàm số lượng giác',
        prompt:
          'Độ sâu $h$ (mét) của mực nước ở một cảng biển vào thời điểm $t$ (giờ) sau khi thủy triều lên lần đầu tiên trong ngày được tính xấp xỉ bởi công thức: $h = 6 + 4\\sin\\left(\\frac{\\pi}{12}t\\right)$. Tìm độ sâu lớn nhất của mực nước biển.',
        acceptableAnswers: ['10'],
        unit: 'mét',
        explanation:
          'Ta có $-1 \\le \\sin\\left(\\frac{\\pi}{12}t\\right) \\le 1 \\Rightarrow -4 \\le 4\\sin\\left(\\frac{\\pi}{12}t\\right) \\le 4 \\Rightarrow 2 \\le 6 + 4\\sin\\left(\\frac{\\pi}{12}t\\right) \\le 10$. Do đó độ sâu lớn nhất của mực nước biển là $10$ mét (đạt được khi $\\sin\\left(\\frac{\\pi}{12}t\\right) = 1$).',
        pedagogicalTip: 'Độ sâu lớn nhất của mực nước biển đạt được khi $\\sin\\left(\\frac{\\pi}{12}t\\right) = 1$, tức $h_{\\max} = 6 + 4 = 10$ mét.',
        points: 0.5,
      },
      {
        id: 'd4-p3-q3',
        part: 'part3',
        number: 17,
        topic: 'Cấp số cộng',
        prompt:
          'Cho cấp số cộng $(u_n)$ có số hạng đầu $u_1 = 3$ và công sai $d = 4$. Số $79$ là số hạng thứ bao nhiêu của cấp số cộng này?',
        acceptableAnswers: ['20'],
        explanation:
          'Ta có số hạng tổng quát của cấp số cộng là $u_n = u_1 + (n - 1)d$. Theo bài ra ta có: $3 + (n - 1) \\cdot 4 = 79 \\Leftrightarrow 4(n - 1) = 76 \\Leftrightarrow n - 1 = 19 \\Leftrightarrow n = 20$. Vậy số $79$ là số hạng thứ $20$ của cấp số cộng.',
        pedagogicalTip: 'Tính nhanh thứ tự số hạng bằng công thức $n = \\frac{u_n - u_1}{d} + 1 = \\frac{79 - 3}{4} + 1 = 20$.',
        points: 0.5,
      },
      {
        id: 'd4-p3-q4',
        part: 'part3',
        number: 18,
        topic: 'Mốt của mẫu số liệu ghép nhóm',
        prompt:
          'Khảo sát điểm thi môn Toán của $50$ học sinh, thu được bảng phân bố tần số ghép nhóm sau:\n$$\\begin{array}{|l|c|c|c|c|}\\hline \\text{Điểm số} & [2; 4) & [4; 6) & [6; 8) & [8; 10] \\\\ \\hline \\text{Số học sinh} & 5 & 15 & 20 & 10 \\\\ \\hline \\end{array}$$\nTính giá trị Mốt của mẫu số liệu ghép nhóm trên (làm tròn kết quả đến chữ số thập phân thứ nhất).',
        acceptableAnswers: ['6,7', '6.7'],
        explanation:
          'Nhóm chứa Mốt là nhóm $[6; 8)$ có tần số lớn nhất là $n_3 = 20$. Ta có $u_3 = 6,\\ n_2 = 15,\\ n_4 = 10,\\ h = 8 - 6 = 2$. Giá trị Mốt của mẫu số liệu ghép nhóm là $M_o = 6 + \\frac{20 - 15}{(20 - 15) + (20 - 10)} \\cdot 2 = 6 + \\frac{5}{5 + 10} \\cdot 2 = 6 + \\frac{10}{15} \\approx 6,7$.',
        pedagogicalTip: 'Công thức mốt của mẫu số liệu ghép nhóm: $M_o = u_m + \\frac{n_m - n_{m-1}}{(n_m - n_{m-1}) + (n_m - n_{m+1})} \\cdot (u_{m+1} - u_m)$.',
        points: 0.5,
      },
    ],
    part4: [
      {
        id: 'd4-p4-q1',
        part: 'part4',
        number: 19,
        topic: 'Tổng các nghiệm của phương trình lượng giác',
        problemStatement:
          'Tính tổng các nghiệm phân biệt của phương trình $\\tan x = 1$ trên khoảng $(0; 3\\pi)$.',
        conclusionTarget: 'Xác định các nghiệm thuộc $(0; 3\\pi)$ và tính tổng các nghiệm đó.',
        steps: [
          {
            id: 'd4-p4-q1-s1',
            originalIndex: 1,
            roleDescription: 'Giải phương trình tìm họ nghiệm tổng quát',
            content:
              'Phương trình $\\tan x = 1 \\Leftrightarrow x = \\frac{\\pi}{4} + k\\pi\\ (k \\in \\mathbb{Z})$.',
          },
          {
            id: 'd4-p4-q1-s2',
            originalIndex: 2,
            roleDescription: 'Xét điều kiện nghiệm thuộc khoảng (0; 3π)',
            content:
              'Xét nghiệm trên khoảng $(0; 3\\pi)$: $0 < \\frac{\\pi}{4} + k\\pi < 3\\pi \\Leftrightarrow -\\frac{1}{4} < k < \\frac{11}{4}$. Vì $k \\in \\mathbb{Z}$ nên $k \\in \\{0; 1; 2\\}$.',
          },
          {
            id: 'd4-p4-q1-s3',
            originalIndex: 3,
            roleDescription: 'Liệt kê các nghiệm tương ứng trên (0; 3π)',
            content:
              'Các nghiệm tương ứng trên khoảng $(0; 3\\pi)$ là $x_1 = \\frac{\\pi}{4},\\ x_2 = \\frac{5\\pi}{4},\\ x_3 = \\frac{9\\pi}{4}$.',
          },
          {
            id: 'd4-p4-q1-s4',
            originalIndex: 4,
            roleDescription: 'Tính tổng các nghiệm và kết luận',
            content:
              'Tổng các nghiệm của phương trình trên khoảng $(0; 3\\pi)$ là $S = \\frac{\\pi}{4} + \\frac{5\\pi}{4} + \\frac{9\\pi}{4} = \\frac{15\\pi}{4}$.',
          },
        ],
        pedagogicalTip: 'Giải bất phương trình $0 < \\frac{\\pi}{4} + k\\pi < 3\\pi$ với $k \\in \\mathbb{Z}$ để tìm đầy đủ các nghiệm trên $(0; 3\\pi)$.',
        teacherAnalysis: 'Giải $\\tan x = 1 \\Leftrightarrow x = \\frac{\\pi}{4} + k\\pi$ -> Chặn $0 < x < 3\\pi$ tìm $k \\in \\{0; 1; 2\\}$ -> Cộng 3 nghiệm được $\\frac{15\\pi}{4}$.',
        points: 0.75,
      },
      {
        id: 'd4-p4-q2',
        part: 'part4',
        number: 20,
        topic: 'Bài toán thực tế cấp số nhân',
        problemStatement:
          'Một bệnh nhân được chỉ định uống một loại thuốc đặc trị. Mỗi liều thuốc chứa $30\\text{ mg}$ hoạt chất và được uống định kỳ cách nhau đúng $24$ giờ. Tuy nhiên, sau mỗi $24$ giờ, thận của bệnh nhân sẽ đào thải $20\\%$ lượng hoạt chất có trong máu (nghĩa là chỉ còn lại $80\\%$). Ngay sau khi bệnh nhân uống liều thứ $5$, tổng lượng hoạt chất của thuốc còn lại trong cơ thể là bao nhiêu?',
        conclusionTarget: 'Tính tổng lượng hoạt chất còn lại trong cơ thể ngay sau khi uống liều thứ $5$.',
        steps: [
          {
            id: 'd4-p4-q2-s1',
            originalIndex: 1,
            roleDescription: 'Xác định lượng hoạt chất còn lại của từng liều thuốc',
            content:
              'Ngay sau khi uống liều thứ $5$, lượng hoạt chất từ liều thứ $5$ là $30\\text{ mg}$, từ liều thứ $4$ còn lại $30 \\cdot 0,8\\text{ mg}$, từ liều thứ $3$ còn lại $30 \\cdot 0,8^2\\text{ mg}$,...',
          },
          {
            id: 'd4-p4-q2-s2',
            originalIndex: 2,
            roleDescription: 'Mô hình hóa bằng tổng của cấp số nhân',
            content:
              'Tổng lượng hoạt chất còn lại sau khi uống liều thứ $5$ là tổng của $5$ số hạng đầu của cấp số nhân có số hạng đầu $u_1 = 30$ và công bội $q = 0,8$.',
          },
          {
            id: 'd4-p4-q2-s3',
            originalIndex: 3,
            roleDescription: 'Áp dụng công thức tổng 5 số hạng đầu của cấp số nhân',
            content:
              'Ta có $S_5 = 30 + 30 \\cdot 0,8 + 30 \\cdot 0,8^2 + 30 \\cdot 0,8^3 + 30 \\cdot 0,8^4 = 30 \\cdot \\frac{1 - 0,8^5}{1 - 0,8}$.',
          },
          {
            id: 'd4-p4-q2-s4',
            originalIndex: 4,
            roleDescription: 'Tính toán kết quả và kết luận',
            content:
              'Thay số tính được $S_5 = 30 \\cdot \\frac{1 - 0,32768}{0,2} = 100,848\\text{ mg}$.',
          },
        ],
        pedagogicalTip: 'Đào thải $20\\%$ sau mỗi $24$ giờ nghĩa là lượng hoạt chất còn lại gấp $q = 0,8$ lần lượng hoạt chất của ngày ngay trước đó.',
        teacherAnalysis: 'Xác định cấp số nhân $u_1 = 30, q = 0,8$ -> Lập tổng $S_5 = 30 \\cdot \\frac{1 - 0,8^5}{1 - 0,8}$ -> Tính ra $100,848\\text{ mg}$.',
        points: 0.75,
      },
      {
        id: 'd4-p4-q3',
        part: 'part4',
        number: 21,
        topic: 'Tính giá trị biểu thức lượng giác',
        problemStatement:
          'Cho $\\cos x = -\\frac{4}{5}$ với $\\pi < x < \\frac{3\\pi}{2}$. Tính giá trị biểu thức $B = \\sin 2x + \\cos x$.',
        conclusionTarget: 'Tính giá trị của biểu thức $B = \\sin 2x + \\cos x$.',
        steps: [
          {
            id: 'd4-p4-q3-s1',
            originalIndex: 1,
            roleDescription: 'Xác định dấu của sin x',
            content:
              'Vì $\\pi < x < \\frac{3\\pi}{2}$ (góc thuộc góc phần tư thứ III) nên $\\sin x < 0$.',
          },
          {
            id: 'd4-p4-q3-s2',
            originalIndex: 2,
            roleDescription: 'Tính giá trị của sin x',
            content:
              'Ta có $\\sin x = -\\sqrt{1 - \\cos^2 x} = -\\sqrt{1 - \\left(-\\frac{4}{5}\\right)^2} = -\\frac{3}{5}$.',
          },
          {
            id: 'd4-p4-q3-s3',
            originalIndex: 3,
            roleDescription: 'Áp dụng công thức nhân đôi tính sin 2x',
            content:
              'Suy ra $\\sin 2x = 2\\sin x\\cos x = 2 \\cdot \\left(-\\frac{3}{5}\\right) \\cdot \\left(-\\frac{4}{5}\\right) = \\frac{24}{25}$.',
          },
          {
            id: 'd4-p4-q3-s4',
            originalIndex: 4,
            roleDescription: 'Thay vào biểu thức B và kết luận',
            content:
              'Khi đó $B = \\sin 2x + \\cos x = \\frac{24}{25} + \\left(-\\frac{4}{5}\\right) = \\frac{24 - 20}{25} = \\frac{4}{25} = 0,16$.',
          },
        ],
        pedagogicalTip: 'Trên khoảng $\\left(\\pi; \\frac{3\\pi}{2}\\right)$, cả $\\sin x$ và $\\cos x$ đều âm nên $\\sin 2x = 2\\sin x\\cos x > 0$.',
        teacherAnalysis: 'Xác định $\\sin x < 0$ -> Tính $\\sin x = -\\frac{3}{5}$ -> Tính $\\sin 2x = \\frac{24}{25}$ -> Cộng với $\\cos x$ được $B = \\frac{4}{25}$.',
        points: 0.75,
      },
      {
        id: 'd4-p4-q4',
        part: 'part4',
        number: 22,
        topic: 'Tứ phân vị của mẫu số liệu ghép nhóm',
        problemStatement:
          'Cho bảng sau thống kê thời gian ôn thi (giờ) của $40$ học sinh lớp 11C như sau:\n$$\\begin{array}{|l|c|c|c|c|c|}\\hline \\text{Thời gian (giờ)} & [10; 15) & [15; 20) & [20; 25) & [25; 30) & [30; 35) \\\\ \\hline \\text{Số học sinh} & 5 & 9 & 14 & 8 & 4 \\\\ \\hline \\end{array}$$\nTính tứ phân vị thứ ba ($Q_3$) của mẫu số liệu trên.',
        conclusionTarget: 'Tính giá trị tứ phân vị thứ ba $Q_3$.',
        steps: [
          {
            id: 'd4-p4-q4-s1',
            originalIndex: 1,
            roleDescription: 'Xác định cỡ mẫu và tần số tích lũy của các nhóm',
            content:
              'Cỡ mẫu $n = 40$. Tần số tích lũy của các nhóm lần lượt là: nhóm $1$ là $5$; nhóm $2$ là $5 + 9 = 14$; nhóm $3$ là $14 + 14 = 28$; nhóm $4$ là $28 + 8 = 36$; nhóm $5$ là $36 + 4 = 40$.',
          },
          {
            id: 'd4-p4-q4-s2',
            originalIndex: 2,
            roleDescription: 'Xác định vị trí và nhóm chứa Q₃',
            content:
              'Tứ phân vị thứ ba $Q_3$ ứng với vị trí $\\frac{3n}{4} = \\frac{3 \\cdot 40}{4} = 30$. Do $28 < 30 \\le 36$ nên nhóm chứa $Q_3$ là nhóm thứ $4$: $[25; 30)$.',
          },
          {
            id: 'd4-p4-q4-s3',
            originalIndex: 3,
            roleDescription: 'Xác định các đại lượng trong công thức Q₃',
            content:
              'Nhóm $[25; 30)$ có đầu mút trái $u_4 = 25$, độ dài nhóm $h = 5$, tần số của nhóm $n_4 = 8$ và tần số tích lũy của nhóm liền trước $C = 5 + 9 + 14 = 28$.',
          },
          {
            id: 'd4-p4-q4-s4',
            originalIndex: 4,
            roleDescription: 'Thay số vào công thức tính Q₃ và kết luận',
            content:
              'Áp dụng công thức tứ phân vị thứ ba: $Q_3 = 25 + \\frac{30 - 28}{8} \\cdot 5 = 25 + \\frac{2}{8} \\cdot 5 = 25 + 1,25 = 26,25$.',
          },
        ],
        pedagogicalTip: 'Công thức tứ phân vị thứ ba của mẫu số liệu ghép nhóm: $Q_3 = u_m + \\frac{\\frac{3n}{4} - C}{n_m} \\cdot (u_{m+1} - u_m)$.',
        teacherAnalysis: 'Tính $\\frac{3n}{4} = 30$ -> Tìm nhóm $[25; 30)$ chứa $Q_3$ -> Xác định $u_4 = 25, C = 28, n_4 = 8, h = 5$ -> Tính $Q_3 = 26,25$.',
        points: 0.75,
      },
    ],
  },

  // ============================================================================
  // ĐỀ 05: ĐỀ ÔN TẬP & KIỂM TRA GIỮA HỌC KỲ I TOÁN 11 - ĐỀ 5 (TƯƠNG TỰ ĐỀ 04)
  // ============================================================================
  {
    id: 'de-05',
    title: 'đề ôn gk1 05',
    subtitle: 'Lượng Giác, Dãy Số - Cấp Số Cộng - Cấp Số Nhân & Mẫu Số Liệu Ghép Nhóm (Đề 5)',
    grade: 11,
    durationMinutes: 90,
    totalPoints: 10,
    description:
      'Đề khảo sát đánh giá năng lực môn Toán lớp 11 - Đề 05 chuẩn cấu trúc 4 phần (22 câu hỏi, ma trận tương tự Đề 04): Góc và công thức lượng giác, Hàm số & Phương trình lượng giác, Dãy số - Cấp số cộng - Cấp số nhân, và Mẫu số liệu ghép nhóm.',
    part1: [
      {
        id: 'd5-p1-q1',
        part: 'part1',
        number: 1,
        topic: 'Đổi số đo góc lượng giác',
        prompt: 'Đổi số đo góc lượng giác $210^\\circ$ sang radian.',
        options: [
          { key: 'A', content: '$\\frac{5\\pi}{6}$' },
          { key: 'B', content: '$\\frac{7\\pi}{6}$' },
          { key: 'C', content: '$\\frac{4\\pi}{3}$' },
          { key: 'D', content: '$\\frac{7\\pi}{4}$' },
        ],
        correctAnswer: 'B',
        explanation:
          'Ta có $210^\\circ = 210 \\cdot \\frac{\\pi}{180} = \\frac{7\\pi}{6}$ (rad).',
        pedagogicalTip: 'Công thức đổi từ độ sang radian: $\\alpha = a^\\circ \\cdot \\frac{\\pi}{180^\\circ}$.',
        points: 0.25,
      },
      {
        id: 'd5-p1-q2',
        part: 'part1',
        number: 2,
        topic: 'Hệ thức lượng giác cơ bản',
        prompt: 'Trong các hệ thức lượng giác sau, hệ thức nào đúng với mọi $\\alpha$ làm cho biểu thức có nghĩa?',
        options: [
          { key: 'A', content: '$\\sin^2\\alpha + \\cos^2\\alpha = -1$' },
          { key: 'B', content: '$1 + \\tan^2\\alpha = \\frac{1}{\\cos\\alpha}$' },
          { key: 'C', content: '$\\tan\\alpha \\cdot \\cot\\alpha = 1$' },
          { key: 'D', content: '$1 + \\cot^2\\alpha = \\frac{1}{\\cos^2\\alpha}$' },
        ],
        correctAnswer: 'C',
        explanation:
          'Theo các hằng đẳng thức lượng giác cơ bản, ta có $\\tan\\alpha \\cdot \\cot\\alpha = 1$ với mọi $\\alpha \\neq k\\frac{\\pi}{2}\\ (k \\in \\mathbb{Z})$.',
        pedagogicalTip: 'Ghi nhớ $\\tan\\alpha \\cdot \\cot\\alpha = 1$ với mọi $\\alpha \\neq k\\frac{\\pi}{2}\\ (k \\in \\mathbb{Z})$.',
        points: 0.25,
      },
      {
        id: 'd5-p1-q3',
        part: 'part1',
        number: 3,
        topic: 'Giá trị lượng giác của một góc',
        prompt: 'Cho $\\sin\\alpha = -\\frac{4}{5}$ và $\\frac{3\\pi}{2} < \\alpha < 2\\pi$. Tính giá trị của $\\cos\\alpha$.',
        options: [
          { key: 'A', content: '$\\frac{3}{5}$' },
          { key: 'B', content: '$-\\frac{3}{5}$' },
          { key: 'C', content: '$\\frac{9}{25}$' },
          { key: 'D', content: '$-\\frac{9}{25}$' },
        ],
        correctAnswer: 'A',
        explanation:
          'Vì $\\frac{3\\pi}{2} < \\alpha < 2\\pi$ (góc phần tư thứ IV) nên $\\cos\\alpha > 0$. Ta có $\\cos\\alpha = \\sqrt{1 - \\sin^2\\alpha} = \\sqrt{1 - \\left(-\\frac{4}{5}\\right)^2} = \\sqrt{1 - \\frac{16}{25}} = \\frac{3}{5}$.',
        pedagogicalTip: 'Trên khoảng $\\left(\\frac{3\\pi}{2}; 2\\pi\\right)$ thuộc góc phần tư thứ IV, $\\sin\\alpha < 0$ và $\\cos\\alpha > 0$.',
        points: 0.25,
      },
      {
        id: 'd5-p1-q4',
        part: 'part1',
        number: 4,
        topic: 'Tập xác định của hàm số lượng giác',
        prompt: 'Tập xác định của hàm số $y = \\cot x$ là:',
        options: [
          { key: 'A', content: '$\\mathbb{R} \\setminus \\left\\{\\frac{\\pi}{2} + k\\pi, k \\in \\mathbb{Z}\\right\\}$' },
          { key: 'B', content: '$\\mathbb{R} \\setminus \\{k\\pi, k \\in \\mathbb{Z}\\}$' },
          { key: 'C', content: '$\\mathbb{R}$' },
          { key: 'D', content: '$[-1; 1]$' },
        ],
        correctAnswer: 'B',
        explanation:
          'Hàm số $y = \\cot x = \\frac{\\cos x}{\\sin x}$ xác định khi $\\sin x \\neq 0 \\Leftrightarrow x \\neq k\\pi\\ (k \\in \\mathbb{Z})$. Vậy tập xác định của hàm số là $D = \\mathbb{R} \\setminus \\{k\\pi, k \\in \\mathbb{Z}\\}$.',
        pedagogicalTip: 'Hàm số $y = \\cot x$ xác định khi mẫu số $\\sin x \\neq 0 \\Leftrightarrow x \\neq k\\pi\\ (k \\in \\mathbb{Z})$.',
        points: 0.25,
      },
      {
        id: 'd5-p1-q5',
        part: 'part1',
        number: 5,
        topic: 'Tính tăng, giảm của dãy số',
        prompt: 'Cho dãy số $(u_n)$ với $u_n = 4n - 9$. Khẳng định nào sau đây là đúng?',
        options: [
          { key: 'A', content: '$(u_n)$ là dãy số tăng.' },
          { key: 'B', content: '$(u_n)$ là dãy số giảm.' },
          { key: 'C', content: '$(u_n)$ là dãy số không đổi.' },
          { key: 'D', content: '$(u_n)$ không tăng, không giảm.' },
        ],
        correctAnswer: 'A',
        explanation:
          'Xét hiệu $u_{n+1} - u_n = [4(n + 1) - 9] - (4n - 9) = 4n + 4 - 9 - 4n + 9 = 4 > 0$ với mọi $n \\ge 1$. Do đó $(u_n)$ là dãy số tăng.',
        pedagogicalTip: 'Nếu $u_{n+1} - u_n > 0$ với mọi $n \\in \\mathbb{N}^*$ thì dãy số $(u_n)$ là dãy số tăng.',
        points: 0.25,
      },
      {
        id: 'd5-p1-q6',
        part: 'part1',
        number: 6,
        topic: 'Cấp số cộng',
        prompt: 'Cho cấp số cộng $(u_n)$ có số hạng đầu $u_1 = 7$ và công sai $d = -2$. Số hạng thứ tư $u_4$ bằng:',
        options: [
          { key: 'A', content: '$13$' },
          { key: 'B', content: '$3$' },
          { key: 'C', content: '$1$' },
          { key: 'D', content: '$-1$' },
        ],
        correctAnswer: 'C',
        explanation:
          'Ta có số hạng tổng quát của cấp số cộng là $u_n = u_1 + (n - 1)d$. Do đó $u_4 = u_1 + 3d = 7 + 3 \\cdot (-2) = 1$.',
        pedagogicalTip: 'Áp dụng công thức số hạng tổng quát của cấp số cộng: $u_n = u_1 + (n - 1)d$.',
        points: 0.25,
      },
      {
        id: 'd5-p1-q7',
        part: 'part1',
        number: 7,
        topic: 'Số trung bình của mẫu số liệu ghép nhóm',
        prompt:
          'Khảo sát thời gian tự học (giờ/tuần) của $40$ học sinh lớp 11A, ta có bảng số liệu ghép nhóm sau:\n$$\\begin{array}{|l|c|c|c|c|c|}\\hline \\text{Thời gian} & [0; 4) & [4; 8) & [8; 12) & [12; 16) & [16; 20) \\\\ \\hline \\text{Số học sinh} & 3 & 7 & 14 & 10 & 6 \\\\ \\hline \\end{array}$$\nSố trung bình của mẫu số liệu là:',
        options: [
          { key: 'A', content: '$10,5$' },
          { key: 'B', content: '$11,2$' },
          { key: 'C', content: '$10,9$' },
          { key: 'D', content: '$9,8$' },
        ],
        correctAnswer: 'C',
        explanation:
          'Giá trị đại diện của các nhóm lần lượt là $x_1 = 2,\\ x_2 = 6,\\ x_3 = 10,\\ x_4 = 14,\\ x_5 = 18$. Số trung bình của mẫu số liệu ghép nhóm là $\\bar{x} = \\frac{3 \\cdot 2 + 7 \\cdot 6 + 14 \\cdot 10 + 10 \\cdot 14 + 6 \\cdot 18}{40} = \\frac{6 + 42 + 140 + 140 + 108}{40} = \\frac{436}{40} = 10,9$.',
        pedagogicalTip: 'Tính giá trị đại diện $x_i = \\frac{a_i + a_{i+1}}{2}$ của từng nhóm trước khi áp dụng công thức $\\bar{x} = \\frac{\\sum n_i x_i}{n}$.',
        points: 0.25,
      },
      {
        id: 'd5-p1-q8',
        part: 'part1',
        number: 8,
        topic: 'Trung vị của mẫu số liệu ghép nhóm',
        prompt:
          'Khảo sát số tiền chi tiêu trong một ngày (nghìn đồng) của $50$ học sinh, ta có bảng số liệu ghép nhóm sau:\n$$\\begin{array}{|l|c|c|c|c|c|}\\hline \\text{Số tiền} & [10; 20) & [20; 30) & [30; 40) & [40; 50) & [50; 60) \\\\ \\hline \\text{Số học sinh} & 7 & 12 & 16 & 10 & 5 \\\\ \\hline \\end{array}$$\nTrung vị của mẫu số liệu là:',
        options: [
          { key: 'A', content: '$33,75$' },
          { key: 'B', content: '$33,25$' },
          { key: 'C', content: '$35,0$' },
          { key: 'D', content: '$32,5$' },
        ],
        correctAnswer: 'A',
        explanation:
          'Cỡ mẫu $n = 50 \\Rightarrow \\frac{n}{2} = 25$. Tần số tích lũy của nhóm $1$ là $7$; nhóm $2$ là $7 + 12 = 19$; nhóm $3$ là $19 + 16 = 35$. Do đó nhóm chứa trung vị là nhóm thứ ba $[30; 40)$. Ta có $u_3 = 30,\\ n_3 = 16,\\ C = 19,\\ h = 10$. Trung vị là $M_e = 30 + \\frac{25 - 19}{16} \\cdot 10 = 30 + \\frac{60}{16} = 33,75$.',
        pedagogicalTip: 'Công thức trung vị của mẫu số liệu ghép nhóm: $M_e = u_m + \\frac{\\frac{n}{2} - C}{n_m} \\cdot (u_{m+1} - u_m)$.',
        points: 0.25,
      },
      {
        id: 'd5-p1-q9',
        part: 'part1',
        number: 9,
        topic: 'Tập giá trị của hàm số lượng giác',
        prompt: 'Tập giá trị của hàm số $y = 4\\cos x - 1$ là:',
        options: [
          { key: 'A', content: '$[-4; 4]$' },
          { key: 'B', content: '$[-3; 5]$' },
          { key: 'C', content: '$[-5; 3]$' },
          { key: 'D', content: '$[-1; 1]$' },
        ],
        correctAnswer: 'C',
        explanation:
          'Ta có $-1 \\le \\cos x \\le 1 \\Leftrightarrow -4 \\le 4\\cos x \\le 4 \\Leftrightarrow -5 \\le 4\\cos x - 1 \\le 3$. Vậy tập giá trị của hàm số là $[-5; 3]$.',
        pedagogicalTip: 'Từ $-1 \\le \\cos x \\le 1$, nhân với $4$ rồi trừ $1$ ở cả ba vế để suy ra tập giá trị.',
        points: 0.25,
      },
      {
        id: 'd5-p1-q10',
        part: 'part1',
        number: 10,
        topic: 'Phương trình lượng giác cơ bản',
        prompt: 'Nghiệm của phương trình $\\tan x = \\frac{\\sqrt{3}}{3}$ là:',
        options: [
          { key: 'A', content: '$x = \\frac{\\pi}{3} + k\\pi\\ (k \\in \\mathbb{Z})$' },
          { key: 'B', content: '$x = \\frac{\\pi}{6} + k\\pi\\ (k \\in \\mathbb{Z})$' },
          { key: 'C', content: '$x = \\frac{\\pi}{6} + k2\\pi\\ (k \\in \\mathbb{Z})$' },
          { key: 'D', content: '$x = -\\frac{\\pi}{6} + k\\pi\\ (k \\in \\mathbb{Z})$' },
        ],
        correctAnswer: 'B',
        explanation:
          'Ta có $\\tan x = \\frac{\\sqrt{3}}{3} \\Leftrightarrow \\tan x = \\tan\\frac{\\pi}{6} \\Leftrightarrow x = \\frac{\\pi}{6} + k\\pi\\ (k \\in \\mathbb{Z})$.',
        pedagogicalTip: 'Phương trình $\\tan x = \\tan\\alpha$ có họ nghiệm $x = \\alpha + k\\pi\\ (k \\in \\mathbb{Z})$.',
        points: 0.25,
      },
      {
        id: 'd5-p1-q11',
        part: 'part1',
        number: 11,
        topic: 'Tổng n số hạng đầu của cấp số cộng',
        prompt: 'Cho cấp số cộng $(u_n)$ có $u_1 = 4$ và công sai $d = 3$. Tổng của $20$ số hạng đầu tiên là:',
        options: [
          { key: 'A', content: '$610$' },
          { key: 'B', content: '$650$' },
          { key: 'C', content: '$1300$' },
          { key: 'D', content: '$620$' },
        ],
        correctAnswer: 'B',
        explanation:
          'Tổng $n$ số hạng đầu tiên của cấp số cộng là $S_n = \\frac{n}{2}[2u_1 + (n - 1)d]$. Thay $n = 20,\\ u_1 = 4,\\ d = 3$ ta được $S_{20} = \\frac{20}{2}[2 \\cdot 4 + 19 \\cdot 3] = 10 \\cdot (8 + 57) = 10 \\cdot 65 = 650$.',
        pedagogicalTip: 'Công thức tổng $n$ số hạng đầu của cấp số cộng: $S_n = \\frac{n[2u_1 + (n - 1)d]}{2}$.',
        points: 0.25,
      },
      {
        id: 'd5-p1-q12',
        part: 'part1',
        number: 12,
        topic: 'Cấp số nhân',
        prompt: 'Cho cấp số nhân $(u_n)$ có số hạng đầu $u_1 = 5$ và công bội $q = 2$. Số hạng thứ tư $u_4$ bằng:',
        options: [
          { key: 'A', content: '$20$' },
          { key: 'B', content: '$80$' },
          { key: 'C', content: '$40$' },
          { key: 'D', content: '$10$' },
        ],
        correctAnswer: 'C',
        explanation:
          'Số hạng tổng quát của cấp số nhân là $u_n = u_1 \\cdot q^{n-1}$. Do đó $u_4 = u_1 \\cdot q^3 = 5 \\cdot 2^3 = 5 \\cdot 8 = 40$.',
        pedagogicalTip: 'Số hạng thứ tư của cấp số nhân là $u_4 = u_1 \\cdot q^3$.',
        points: 0.25,
      },
    ],
    part2: [
      {
        id: 'd5-p2-q1',
        part: 'part2',
        number: 13,
        topic: 'Hàm số lượng giác',
        prompt: 'Cho hàm số lượng giác $y = 4\\cos 2x - 1$. Xét tính đúng sai của các khẳng định sau:',
        statements: [
          {
            id: 'a',
            label: 'a',
            statement: 'Tập xác định của hàm số là $\\mathbb{R}$.',
            isCorrect: true,
            explanation: 'Đúng. Hàm số $y = 4\\cos 2x - 1$ xác định với mọi $x \\in \\mathbb{R}$.',
          },
          {
            id: 'b',
            label: 'b',
            statement: 'Giá trị lớn nhất của hàm số là $3$.',
            isCorrect: true,
            explanation: 'Đúng. Vì $-1 \\le \\cos 2x \\le 1 \\Rightarrow -4 \\le 4\\cos 2x \\le 4 \\Rightarrow -5 \\le 4\\cos 2x - 1 \\le 3$. Giá trị lớn nhất của hàm số là $3$.',
          },
          {
            id: 'c',
            label: 'c',
            statement: 'Đồ thị hàm số đi qua điểm $M\\left(\\frac{\\pi}{2}; -5\\right)$.',
            isCorrect: true,
            explanation: 'Đúng. Thay $x = \\frac{\\pi}{2}$ vào hàm số ta được $y = 4\\cos\\left(2 \\cdot \\frac{\\pi}{2}\\right) - 1 = 4\\cos\\pi - 1 = 4(-1) - 1 = -5$.',
          },
          {
            id: 'd',
            label: 'd',
            statement: 'Hàm số đã cho là hàm số lẻ.',
            isCorrect: false,
            explanation: 'Sai. Với mọi $x \\in \\mathbb{R}$, ta có $-x \\in \\mathbb{R}$ và $f(-x) = 4\\cos(-2x) - 1 = 4\\cos 2x - 1 = f(x)$, nên hàm số đã cho là hàm số chẵn.',
          },
        ],
        pedagogicalTip: 'Hàm số $y = a\\cos bx + c$ luôn là hàm số chẵn trên $\\mathbb{R}$ vì $\\cos(-bx) = \\cos bx$.',
      },
      {
        id: 'd5-p2-q2',
        part: 'part2',
        number: 14,
        topic: 'Ứng dụng thực tế của cấp số cộng',
        prompt:
          'Để trang trí sân khấu, người ta xếp các khối hộp thành một hình tháp: hàng trên cùng (hàng $1$) có $3$ khối, hàng ngay dưới có $7$ khối, hàng dưới tiếp theo có $11$ khối,... và cứ tiếp tục như vậy. Biết tháp có tất cả $10$ hàng. Xét tính đúng sai của các khẳng định sau:',
        statements: [
          {
            id: 'a',
            label: 'a',
            statement:
              'Số khối hộp ở mỗi hàng tính từ trên xuống lập thành một cấp số cộng với số hạng đầu $u_1 = 3$ và công sai $d = 4$.',
            isCorrect: true,
            explanation:
              'Đúng. Dãy số biểu diễn số khối hộp mỗi hàng từ trên xuống là $3;\\ 7;\\ 11;\\dots$ lập thành cấp số cộng có $u_1 = 3$ và $d = 7 - 3 = 4$.',
          },
          {
            id: 'b',
            label: 'b',
            statement: 'Hàng thứ $6$ của tháp có $23$ khối hộp.',
            isCorrect: true,
            explanation:
              'Đúng. Hàng thứ $6$ có số khối hộp là $u_6 = u_1 + 5d = 3 + 5 \\cdot 4 = 23$ (khối hộp).',
          },
          {
            id: 'c',
            label: 'c',
            statement: 'Hàng dưới cùng có $43$ khối hộp.',
            isCorrect: false,
            explanation:
              'Sai. Hàng dưới cùng là hàng thứ $10$, có số khối hộp là $u_{10} = u_1 + 9d = 3 + 9 \\cdot 4 = 39$ (khối hộp).',
          },
          {
            id: 'd',
            label: 'd',
            statement: 'Tổng số khối hộp cần dùng để xếp toàn bộ tháp là $210$ khối.',
            isCorrect: true,
            explanation:
              'Đúng. Tổng số khối hộp cần dùng là $S_{10} = \\frac{10}{2}(u_1 + u_{10}) = 5 \\cdot (3 + 39) = 210$ (khối hộp).',
          },
        ],
        pedagogicalTip: 'Áp dụng công thức $u_n = u_1 + (n - 1)d$ và $S_n = \\frac{n(u_1 + u_n)}{2}$.',
      },
    ],
    part3: [
      {
        id: 'd5-p3-q1',
        part: 'part3',
        number: 15,
        topic: 'Phương trình lượng giác',
        prompt:
          'Tìm nghiệm âm lớn nhất của phương trình lượng giác $2\\cos x - \\sqrt{2} = 0$, biết nghiệm có dạng $-\\frac{a\\pi}{b}$ với $a, b$ là các số nguyên dương và phân số $\\frac{a}{b}$ tối giản. Tính $a + b$.',
        acceptableAnswers: ['5'],
        explanation:
          'Phương trình $2\\cos x - \\sqrt{2} = 0 \\Leftrightarrow \\cos x = \\frac{\\sqrt{2}}{2} \\Leftrightarrow x = \\pm\\frac{\\pi}{4} + k2\\pi\\ (k \\in \\mathbb{Z})$. Nghiệm âm lớn nhất của phương trình ứng với $k = 0$ ở họ nghiệm $x = -\\frac{\\pi}{4} + k2\\pi$, tức là $x = -\\frac{\\pi}{4}$. Do đó $a = 1,\\ b = 4 \\Rightarrow a + b = 5$.',
        pedagogicalTip: 'Phương trình $\\cos x = \\frac{\\sqrt{2}}{2} = \\cos\\frac{\\pi}{4}$ có nghiệm âm lớn nhất là $-\\frac{\\pi}{4}$.',
        points: 0.5,
      },
      {
        id: 'd5-p3-q2',
        part: 'part3',
        number: 16,
        topic: 'Ứng dụng thực tế của hàm số lượng giác',
        prompt:
          'Độ sâu $h$ (mét) của mực nước ở một cảng biển vào thời điểm $t$ (giờ) sau khi thủy triều lên lần đầu tiên trong ngày được tính xấp xỉ bởi công thức: $h = 8 + 3\\sin\\left(\\frac{\\pi}{12}t\\right)$. Tìm độ sâu lớn nhất của mực nước biển.',
        acceptableAnswers: ['11'],
        unit: 'mét',
        explanation:
          'Ta có $-1 \\le \\sin\\left(\\frac{\\pi}{12}t\\right) \\le 1 \\Rightarrow -3 \\le 3\\sin\\left(\\frac{\\pi}{12}t\\right) \\le 3 \\Rightarrow 5 \\le 8 + 3\\sin\\left(\\frac{\\pi}{12}t\\right) \\le 11$. Do đó độ sâu lớn nhất của mực nước biển là $11$ mét (đạt được khi $\\sin\\left(\\frac{\\pi}{12}t\\right) = 1$).',
        pedagogicalTip: 'Độ sâu lớn nhất của mực nước biển đạt được khi $\\sin\\left(\\frac{\\pi}{12}t\\right) = 1$, tức $h_{\\max} = 8 + 3 = 11$ mét.',
        points: 0.5,
      },
      {
        id: 'd5-p3-q3',
        part: 'part3',
        number: 17,
        topic: 'Cấp số cộng',
        prompt:
          'Cho cấp số cộng $(u_n)$ có số hạng đầu $u_1 = 5$ và công sai $d = 4$. Số $97$ là số hạng thứ bao nhiêu của cấp số cộng này?',
        acceptableAnswers: ['24'],
        explanation:
          'Ta có số hạng tổng quát của cấp số cộng là $u_n = u_1 + (n - 1)d$. Theo bài ra ta có: $5 + (n - 1) \\cdot 4 = 97 \\Leftrightarrow 4(n - 1) = 92 \\Leftrightarrow n - 1 = 23 \\Leftrightarrow n = 24$. Vậy số $97$ là số hạng thứ $24$ của cấp số cộng.',
        pedagogicalTip: 'Tính nhanh thứ tự số hạng bằng công thức $n = \\frac{u_n - u_1}{d} + 1 = \\frac{97 - 5}{4} + 1 = 24$.',
        points: 0.5,
      },
      {
        id: 'd5-p3-q4',
        part: 'part3',
        number: 18,
        topic: 'Mốt của mẫu số liệu ghép nhóm',
        prompt:
          'Khảo sát điểm thi môn Toán của $50$ học sinh, thu được bảng phân bố tần số ghép nhóm sau:\n$$\\begin{array}{|l|c|c|c|c|}\\hline \\text{Điểm số} & [2; 4) & [4; 6) & [6; 8) & [8; 10] \\\\ \\hline \\text{Số học sinh} & 6 & 14 & 20 & 10 \\\\ \\hline \\end{array}$$\nTính giá trị Mốt của mẫu số liệu ghép nhóm trên (làm tròn kết quả đến chữ số thập phân thứ hai).',
        acceptableAnswers: ['6,75', '6.75', '6,8', '6.8'],
        explanation:
          'Nhóm chứa Mốt là nhóm $[6; 8)$ có tần số lớn nhất là $n_3 = 20$. Ta có $u_3 = 6,\\ n_2 = 14,\\ n_4 = 10,\\ h = 8 - 6 = 2$. Giá trị Mốt của mẫu số liệu ghép nhóm là $M_o = 6 + \\frac{20 - 14}{(20 - 14) + (20 - 10)} \\cdot 2 = 6 + \\frac{6}{6 + 10} \\cdot 2 = 6 + \\frac{12}{16} = 6,75$.',
        pedagogicalTip: 'Công thức mốt của mẫu số liệu ghép nhóm: $M_o = u_m + \\frac{n_m - n_{m-1}}{(n_m - n_{m-1}) + (n_m - n_{m+1})} \\cdot (u_{m+1} - u_m)$.',
        points: 0.5,
      },
    ],
    part4: [
      {
        id: 'd5-p4-q1',
        part: 'part4',
        number: 19,
        topic: 'Tổng các nghiệm của phương trình lượng giác',
        problemStatement:
          'Tính tổng các nghiệm phân biệt của phương trình $\\tan x = \\sqrt{3}$ trên khoảng $(0; 2\\pi)$.',
        conclusionTarget: 'Xác định các nghiệm thuộc $(0; 2\\pi)$ và tính tổng các nghiệm đó.',
        steps: [
          {
            id: 'd5-p4-q1-s1',
            originalIndex: 1,
            roleDescription: 'Giải phương trình tìm họ nghiệm tổng quát',
            content:
              'Phương trình $\\tan x = \\sqrt{3} \\Leftrightarrow x = \\frac{\\pi}{3} + k\\pi\\ (k \\in \\mathbb{Z})$.',
          },
          {
            id: 'd5-p4-q1-s2',
            originalIndex: 2,
            roleDescription: 'Xét điều kiện nghiệm thuộc khoảng (0; 2π)',
            content:
              'Xét nghiệm trên khoảng $(0; 2\\pi)$: $0 < \\frac{\\pi}{3} + k\\pi < 2\\pi \\Leftrightarrow -\\frac{1}{3} < k < \\frac{5}{3}$. Vì $k \\in \\mathbb{Z}$ nên $k \\in \\{0; 1\\}$.',
          },
          {
            id: 'd5-p4-q1-s3',
            originalIndex: 3,
            roleDescription: 'Liệt kê các nghiệm tương ứng trên (0; 2π)',
            content:
              'Các nghiệm tương ứng trên khoảng $(0; 2\\pi)$ là $x_1 = \\frac{\\pi}{3}$ và $x_2 = \\frac{4\\pi}{3}$.',
          },
          {
            id: 'd5-p4-q1-s4',
            originalIndex: 4,
            roleDescription: 'Tính tổng các nghiệm và kết luận',
            content:
              'Tổng các nghiệm của phương trình trên khoảng $(0; 2\\pi)$ là $S = \\frac{\\pi}{3} + \\frac{4\\pi}{3} = \\frac{5\\pi}{3}$.',
          },
        ],
        pedagogicalTip: 'Giải bất phương trình $0 < \\frac{\\pi}{3} + k\\pi < 2\\pi$ với $k \\in \\mathbb{Z}$ để tìm đầy đủ các nghiệm trên $(0; 2\\pi)$.',
        teacherAnalysis: 'Giải $\\tan x = \\sqrt{3} \\Leftrightarrow x = \\frac{\\pi}{3} + k\\pi$ -> Chặn $0 < x < 2\\pi$ tìm $k \\in \\{0; 1\\}$ -> Cộng 2 nghiệm được $\\frac{5\\pi}{3}$.',
        points: 0.75,
      },
      {
        id: 'd5-p4-q2',
        part: 'part4',
        number: 20,
        topic: 'Bài toán thực tế cấp số nhân',
        problemStatement:
          'Một bệnh nhân được chỉ định uống một loại thuốc đặc trị. Mỗi liều thuốc chứa $40\\text{ mg}$ hoạt chất và được uống định kỳ cách nhau đúng $24$ giờ. Tuy nhiên, sau mỗi $24$ giờ, thận của bệnh nhân sẽ đào thải $50\\%$ lượng hoạt chất có trong máu (nghĩa là chỉ còn lại $50\\%$). Ngay sau khi bệnh nhân uống liều thứ $5$, tổng lượng hoạt chất của thuốc còn lại trong cơ thể là bao nhiêu?',
        conclusionTarget: 'Tính tổng lượng hoạt chất còn lại trong cơ thể ngay sau khi uống liều thứ $5$.',
        steps: [
          {
            id: 'd5-p4-q2-s1',
            originalIndex: 1,
            roleDescription: 'Xác định lượng hoạt chất còn lại của từng liều thuốc',
            content:
              'Ngay sau khi uống liều thứ $5$, lượng hoạt chất từ liều thứ $5$ là $40\\text{ mg}$, từ liều thứ $4$ còn lại $40 \\cdot 0,5\\text{ mg}$, từ liều thứ $3$ còn lại $40 \\cdot 0,5^2\\text{ mg}$,...',
          },
          {
            id: 'd5-p4-q2-s2',
            originalIndex: 2,
            roleDescription: 'Mô hình hóa bằng tổng của cấp số nhân',
            content:
              'Tổng lượng hoạt chất còn lại sau khi uống liều thứ $5$ là tổng của $5$ số hạng đầu của cấp số nhân có số hạng đầu $u_1 = 40$ và công bội $q = 0,5$.',
          },
          {
            id: 'd5-p4-q2-s3',
            originalIndex: 3,
            roleDescription: 'Áp dụng công thức tổng 5 số hạng đầu của cấp số nhân',
            content:
              'Ta có $S_5 = 40 + 40 \\cdot 0,5 + 40 \\cdot 0,5^2 + 40 \\cdot 0,5^3 + 40 \\cdot 0,5^4 = 40 \\cdot \\frac{1 - 0,5^5}{1 - 0,5}$.',
          },
          {
            id: 'd5-p4-q2-s4',
            originalIndex: 4,
            roleDescription: 'Tính toán kết quả và kết luận',
            content:
              'Thay số tính được $S_5 = 80 \\cdot (1 - 0,03125) = 77,5\\text{ mg}$.',
          },
        ],
        pedagogicalTip: 'Đào thải $50\\%$ sau mỗi $24$ giờ nghĩa là lượng hoạt chất còn lại gấp $q = 0,5$ lần lượng hoạt chất của ngày ngay trước đó.',
        teacherAnalysis: 'Xác định cấp số nhân $u_1 = 40, q = 0,5$ -> Lập tổng $S_5 = 40 \\cdot \\frac{1 - 0,5^5}{1 - 0,5}$ -> Tính ra $77,5\\text{ mg}$.',
        points: 0.75,
      },
      {
        id: 'd5-p4-q3',
        part: 'part4',
        number: 21,
        topic: 'Tính giá trị biểu thức lượng giác',
        problemStatement:
          'Cho $\\cos x = -\\frac{3}{5}$ với $\\pi < x < \\frac{3\\pi}{2}$. Tính giá trị biểu thức $B = \\sin 2x - \\sin x$.',
        conclusionTarget: 'Tính giá trị của biểu thức $B = \\sin 2x - \\sin x$.',
        steps: [
          {
            id: 'd5-p4-q3-s1',
            originalIndex: 1,
            roleDescription: 'Xác định dấu của sin x',
            content:
              'Vì $\\pi < x < \\frac{3\\pi}{2}$ (góc thuộc góc phần tư thứ III) nên $\\sin x < 0$.',
          },
          {
            id: 'd5-p4-q3-s2',
            originalIndex: 2,
            roleDescription: 'Tính giá trị của sin x',
            content:
              'Ta có $\\sin x = -\\sqrt{1 - \\cos^2 x} = -\\sqrt{1 - \\left(-\\frac{3}{5}\\right)^2} = -\\frac{4}{5}$.',
          },
          {
            id: 'd5-p4-q3-s3',
            originalIndex: 3,
            roleDescription: 'Áp dụng công thức nhân đôi tính sin 2x',
            content:
              'Suy ra $\\sin 2x = 2\\sin x\\cos x = 2 \\cdot \\left(-\\frac{4}{5}\\right) \\cdot \\left(-\\frac{3}{5}\\right) = \\frac{24}{25}$.',
          },
          {
            id: 'd5-p4-q3-s4',
            originalIndex: 4,
            roleDescription: 'Thay vào biểu thức B và kết luận',
            content:
              'Khi đó $B = \\sin 2x - \\sin x = \\frac{24}{25} - \\left(-\\frac{4}{5}\\right) = \\frac{24 + 20}{25} = \\frac{44}{25} = 1,76$.',
          },
        ],
        pedagogicalTip: 'Trên khoảng $\\left(\\pi; \\frac{3\\pi}{2}\\right)$, cả $\\sin x$ và $\\cos x$ đều âm nên $\\sin 2x = 2\\sin x\\cos x > 0$.',
        teacherAnalysis: 'Xác định $\\sin x < 0$ -> Tính $\\sin x = -\\frac{4}{5}$ -> Tính $\\sin 2x = \\frac{24}{25}$ -> Trừ $\\sin x$ được $B = \\frac{44}{25} = 1,76$.',
        points: 0.75,
      },
      {
        id: 'd5-p4-q4',
        part: 'part4',
        number: 22,
        topic: 'Tứ phân vị của mẫu số liệu ghép nhóm',
        problemStatement:
          'Cho bảng sau thống kê thời gian ôn thi (giờ) của $40$ học sinh lớp 11C như sau:\n$$\\begin{array}{|l|c|c|c|c|c|}\\hline \\text{Thời gian (giờ)} & [10; 15) & [15; 20) & [20; 25) & [25; 30) & [30; 35) \\\\ \\hline \\text{Số học sinh} & 4 & 8 & 14 & 10 & 4 \\\\ \\hline \\end{array}$$\nTính tứ phân vị thứ ba ($Q_3$) của mẫu số liệu trên.',
        conclusionTarget: 'Tính giá trị tứ phân vị thứ ba $Q_3$.',
        steps: [
          {
            id: 'd5-p4-q4-s1',
            originalIndex: 1,
            roleDescription: 'Xác định cỡ mẫu và tần số tích lũy của các nhóm',
            content:
              'Cỡ mẫu $n = 40$. Tần số tích lũy của các nhóm lần lượt là: nhóm $1$ là $4$; nhóm $2$ là $4 + 8 = 12$; nhóm $3$ là $12 + 14 = 26$; nhóm $4$ là $26 + 10 = 36$; nhóm $5$ là $36 + 4 = 40$.',
          },
          {
            id: 'd5-p4-q4-s2',
            originalIndex: 2,
            roleDescription: 'Xác định vị trí và nhóm chứa Q₃',
            content:
              'Tứ phân vị thứ ba $Q_3$ ứng với vị trí $\\frac{3n}{4} = \\frac{3 \\cdot 40}{4} = 30$. Do $26 < 30 \\le 36$ nên nhóm chứa $Q_3$ là nhóm thứ $4$: $[25; 30)$.',
          },
          {
            id: 'd5-p4-q4-s3',
            originalIndex: 3,
            roleDescription: 'Xác định các đại lượng trong công thức Q₃',
            content:
              'Nhóm $[25; 30)$ có đầu mút trái $u_4 = 25$, độ dài nhóm $h = 5$, tần số của nhóm $n_4 = 10$ và tần số tích lũy của nhóm liền trước $C = 4 + 8 + 14 = 26$.',
          },
          {
            id: 'd5-p4-q4-s4',
            originalIndex: 4,
            roleDescription: 'Thay số vào công thức tính Q₃ và kết luận',
            content:
              'Áp dụng công thức tứ phân vị thứ ba: $Q_3 = 25 + \\frac{30 - 26}{10} \\cdot 5 = 25 + 2 = 27$.',
          },
        ],
        pedagogicalTip: 'Công thức tứ phân vị thứ ba của mẫu số liệu ghép nhóm: $Q_3 = u_m + \\frac{\\frac{3n}{4} - C}{n_m} \\cdot (u_{m+1} - u_m)$.',
        teacherAnalysis: 'Tính $\\frac{3n}{4} = 30$ -> Tìm nhóm $[25; 30)$ chứa $Q_3$ -> Xác định $u_4 = 25, C = 26, n_4 = 10, h = 5$ -> Tính $Q_3 = 27$.',
        points: 0.75,
      },
    ],
  },
  // ============================================================================
  // ĐỀ 06: ĐỀ KHẢO SÁT TOÁN 11 — TƯƠNG TỰ ĐỀ 01
  // ============================================================================
  {
    id: 'de-06',
    title: 'đề ôn gk1 06',
    subtitle: 'Lượng Giác, Dãy Số - Cấp Số Cộng - Cấp Số Nhân & Mẫu Số Liệu Ghép Nhóm (Đề tương tự Đề 01)',
    grade: 11,
    durationMinutes: 90,
    totalPoints: 10,
    description:
      'Đề khảo sát đánh giá năng lực môn Toán lớp 11 chuẩn cấu trúc 4 phần (22 câu hỏi, tương tự Đề 01): Hàm số lượng giác và phương trình lượng giác, Dãy số - Cấp số cộng - Cấp số nhân, và Các số đặc trưng đo xu thế trung tâm của mẫu số liệu ghép nhóm.',
    part1: [
      {
        id: 'd6-p1-q1',
        part: 'part1',
        number: 1,
        topic: 'Góc lượng giác',
        prompt: 'Đổi số đo của góc lượng giác $150^\\circ$ sang đơn vị radian.',
        options: [
          { key: 'A', content: '$\\frac{2\\pi}{3}$' },
          { key: 'B', content: '$\\frac{5\\pi}{6}$' },
          { key: 'C', content: '$\\frac{3\\pi}{4}$' },
          { key: 'D', content: '$\\frac{4\\pi}{3}$' },
        ],
        correctAnswer: 'B',
        explanation:
          'Áp dụng công thức đổi từ độ sang radian: $\\alpha = \\frac{a \\cdot \\pi}{180} = \\frac{150 \\cdot \\pi}{180} = \\frac{5\\pi}{6}$ (rad).',
        pedagogicalTip: 'Công thức đổi từ độ sang radian: $\\alpha = \\frac{a \\cdot \\pi}{180}$.',
        points: 0.25,
      },
      {
        id: 'd6-p1-q2',
        part: 'part1',
        number: 2,
        topic: 'Hệ thức lượng giác cơ bản',
        prompt: 'Trong các hệ thức lượng giác sau, hệ thức nào đúng (với giả thiết các biểu thức đều có nghĩa)?',
        options: [
          { key: 'A', content: '$\\sin^2\\alpha - \\cos^2\\alpha = 1$' },
          { key: 'B', content: '$1 + \\tan^2\\alpha = \\frac{1}{\\sin^2\\alpha}$' },
          { key: 'C', content: '$1 + \\cot^2\\alpha = \\frac{1}{\\sin^2\\alpha}$' },
          { key: 'D', content: '$\\tan\\alpha + \\cot\\alpha = 1$' },
        ],
        correctAnswer: 'C',
        explanation:
          'Theo các hệ thức lượng giác cơ bản: $\\sin^2\\alpha + \\cos^2\\alpha = 1$, $1 + \\tan^2\\alpha = \\frac{1}{\\cos^2\\alpha}$, $1 + \\cot^2\\alpha = \\frac{1}{\\sin^2\\alpha}$ và $\\tan\\alpha \\cdot \\cot\\alpha = 1$. Do đó hệ thức ở đáp án C đúng.',
        pedagogicalTip: 'Ghi nhớ hai hệ thức đi kèm: $1 + \\tan^2\\alpha = \\frac{1}{\\cos^2\\alpha}$ và $1 + \\cot^2\\alpha = \\frac{1}{\\sin^2\\alpha}$.',
        points: 0.25,
      },
      {
        id: 'd6-p1-q3',
        part: 'part1',
        number: 3,
        topic: 'Hàm số lượng giác',
        prompt: 'Tập xác định của hàm số $y = \\cot x$ là:',
        options: [
          { key: 'A', content: '$\\mathbb{R}$' },
          { key: 'B', content: '$\\mathbb{R} \\setminus \\left\\{\\frac{\\pi}{2} + k\\pi, k \\in \\mathbb{Z}\\right\\}$' },
          { key: 'C', content: '$\\mathbb{R} \\setminus \\{k\\pi, k \\in \\mathbb{Z}\\}$' },
          { key: 'D', content: '$\\mathbb{R} \\setminus \\{k2\\pi, k \\in \\mathbb{Z}\\}$' },
        ],
        correctAnswer: 'C',
        explanation:
          'Hàm số $y = \\cot x = \\frac{\\cos x}{\\sin x}$ xác định khi và chỉ khi $\\sin x \\neq 0 \\Leftrightarrow x \\neq k\\pi\\ (k \\in \\mathbb{Z})$. Vậy tập xác định là $D = \\mathbb{R} \\setminus \\{k\\pi, k \\in \\mathbb{Z}\\}$.',
        pedagogicalTip: 'Hàm số $y = \\cot x$ xác định khi mẫu số $\\sin x \\neq 0 \\Leftrightarrow x \\neq k\\pi\\ (k \\in \\mathbb{Z})$.',
        points: 0.25,
      },
      {
        id: 'd6-p1-q4',
        part: 'part1',
        number: 4,
        topic: 'Phương trình lượng giác cơ bản',
        prompt: 'Nghiệm của phương trình $\\cos x = \\frac{\\sqrt{3}}{2}$ là:',
        options: [
          { key: 'A', content: '$x = \\pm\\frac{\\pi}{3} + k2\\pi\\ (k \\in \\mathbb{Z})$' },
          { key: 'B', content: '$x = \\pm\\frac{\\pi}{6} + k2\\pi\\ (k \\in \\mathbb{Z})$' },
          { key: 'C', content: '$x = \\frac{\\pi}{6} + k\\pi\\ (k \\in \\mathbb{Z})$' },
          { key: 'D', content: '$x = \\frac{\\pi}{3} + k\\pi\\ (k \\in \\mathbb{Z})$' },
        ],
        correctAnswer: 'B',
        explanation:
          'Ta có $\\cos x = \\frac{\\sqrt{3}}{2} \\Leftrightarrow \\cos x = \\cos\\frac{\\pi}{6} \\Leftrightarrow x = \\pm\\frac{\\pi}{6} + k2\\pi\\ (k \\in \\mathbb{Z})$.',
        pedagogicalTip: 'Phương trình $\\cos x = \\cos\\alpha$ có nghiệm $x = \\pm\\alpha + k2\\pi\\ (k \\in \\mathbb{Z})$.',
        points: 0.25,
      },
      {
        id: 'd6-p1-q5',
        part: 'part1',
        number: 5,
        topic: 'Giá trị lượng giác của một góc',
        prompt: 'Cho $\\sin\\alpha = \\frac{4}{5}$ và $\\frac{\\pi}{2} < \\alpha < \\pi$. Tính giá trị của $\\cos\\alpha$.',
        options: [
          { key: 'A', content: '$\\frac{3}{5}$' },
          { key: 'B', content: '$-\\frac{3}{5}$' },
          { key: 'C', content: '$\\frac{9}{25}$' },
          { key: 'D', content: '$-\\frac{9}{25}$' },
        ],
        correctAnswer: 'B',
        explanation:
          'Ta có $\\cos^2\\alpha = 1 - \\sin^2\\alpha = 1 - \\left(\\frac{4}{5}\\right)^2 = \\frac{9}{25}$. Vì $\\frac{\\pi}{2} < \\alpha < \\pi$ (góc phần tư thứ II) nên $\\cos\\alpha < 0$, suy ra $\\cos\\alpha = -\\frac{3}{5}$.',
        pedagogicalTip: 'Trên khoảng $\\left(\\frac{\\pi}{2}; \\pi\\right)$ (góc phần tư thứ II), $\\sin\\alpha > 0$ và $\\cos\\alpha < 0$.',
        points: 0.25,
      },
      {
        id: 'd6-p1-q6',
        part: 'part1',
        number: 6,
        topic: 'Tập giá trị của hàm số lượng giác',
        prompt: 'Tập giá trị của hàm số $y = 2\\sin x + 3$ là:',
        options: [
          { key: 'A', content: '$[1; 5]$' },
          { key: 'B', content: '$[-1; 1]$' },
          { key: 'C', content: '$[-2; 2]$' },
          { key: 'D', content: '$[2; 5]$' },
        ],
        correctAnswer: 'A',
        explanation:
          'Vì $-1 \\le \\sin x \\le 1, \\forall x \\in \\mathbb{R}$ nên $-2 \\le 2\\sin x \\le 2 \\Leftrightarrow 1 \\le 2\\sin x + 3 \\le 5$. Vậy tập giá trị của hàm số là $T = [1; 5]$.',
        pedagogicalTip: 'Xuất phát từ bất đẳng thức $-1 \\le \\sin x \\le 1$ với mọi $x \\in \\mathbb{R}$ để tìm miền giá trị của $y$.',
        points: 0.25,
      },
      {
        id: 'd6-p1-q7',
        part: 'part1',
        number: 7,
        topic: 'Tính tăng, giảm của dãy số',
        prompt: 'Cho dãy số $(u_n)$ với $u_n = 3n - 2$. Khẳng định nào sau đây là đúng?',
        options: [
          { key: 'A', content: '$(u_n)$ là dãy số tăng.' },
          { key: 'B', content: '$(u_n)$ là dãy số không đổi.' },
          { key: 'C', content: '$(u_n)$ không tăng, không giảm.' },
          { key: 'D', content: '$(u_n)$ là dãy số giảm.' },
        ],
        correctAnswer: 'A',
        explanation:
          'Xét hiệu $u_{n+1} - u_n = [3(n + 1) - 2] - (3n - 2) = 3 > 0$ với mọi $n \\in \\mathbb{N}^*$. Vậy dãy số $(u_n)$ là dãy số tăng.',
        pedagogicalTip: 'Nếu $u_{n+1} - u_n > 0$ với mọi $n \\in \\mathbb{N}^*$ thì dãy số $(u_n)$ là dãy số tăng.',
        points: 0.25,
      },
      {
        id: 'd6-p1-q8',
        part: 'part1',
        number: 8,
        topic: 'Cấp số cộng',
        prompt: 'Cho cấp số cộng $(u_n)$ có số hạng đầu $u_1 = 5$ và $u_2 = 9$. Công sai $d$ của cấp số cộng này là:',
        options: [
          { key: 'A', content: '$-4$' },
          { key: 'B', content: '$4$' },
          { key: 'C', content: '$14$' },
          { key: 'D', content: '$45$' },
        ],
        correctAnswer: 'B',
        explanation:
          'Công sai của cấp số cộng là $d = u_2 - u_1 = 9 - 5 = 4$.',
        pedagogicalTip: 'Công sai của cấp số cộng được xác định bởi $d = u_{n+1} - u_n = u_2 - u_1$.',
        points: 0.25,
      },
      {
        id: 'd6-p1-q9',
        part: 'part1',
        number: 9,
        topic: 'Số hạng tổng quát của cấp số cộng',
        prompt: 'Cho cấp số cộng $(u_n)$ có $u_1 = -3$ và công sai $d = 4$. Số hạng tổng quát $u_n$ là:',
        options: [
          { key: 'A', content: '$u_n = 4n - 3$' },
          { key: 'B', content: '$u_n = -3n + 4$' },
          { key: 'C', content: '$u_n = 4n - 7$' },
          { key: 'D', content: '$u_n = 4n + 1$' },
        ],
        correctAnswer: 'C',
        explanation:
          'Số hạng tổng quát của cấp số cộng là $u_n = u_1 + (n - 1)d = -3 + (n - 1)4 = 4n - 7$.',
        pedagogicalTip: 'Áp dụng công thức số hạng tổng quát $u_n = u_1 + (n - 1)d$ với $n \\ge 2$.',
        points: 0.25,
      },
      {
        id: 'd6-p1-q10',
        part: 'part1',
        number: 10,
        topic: 'Cấp số nhân',
        prompt: 'Cho cấp số nhân $(u_n)$ có số hạng đầu $u_1 = 4$ và công bội $q = 3$. Số hạng thứ ba $u_3$ bằng:',
        options: [
          { key: 'A', content: '$12$' },
          { key: 'B', content: '$27$' },
          { key: 'C', content: '$36$' },
          { key: 'D', content: '$108$' },
        ],
        correctAnswer: 'C',
        explanation:
          'Số hạng thứ ba của cấp số nhân là $u_3 = u_1 \\cdot q^2 = 4 \\cdot 3^2 = 36$.',
        pedagogicalTip: 'Số hạng tổng quát của cấp số nhân là $u_n = u_1 \\cdot q^{n-1}$.',
        points: 0.25,
      },
      {
        id: 'd6-p1-q11',
        part: 'part1',
        number: 11,
        topic: 'Số trung bình của mẫu số liệu ghép nhóm',
        prompt:
          'Khảo sát chiều cao (cm) của $40$ học sinh lớp 11A, ta có bảng số liệu ghép nhóm sau:\n$$\\begin{array}{|l|c|c|c|c|c|}\\hline \\text{Chiều cao} & [150; 155) & [155; 160) & [160; 165) & [165; 170) & [170; 175) \\\\ \\hline \\text{Số học sinh} & 4 & 10 & 14 & 8 & 4 \\\\ \\hline \\end{array}$$\nSố trung bình của mẫu số liệu ghép nhóm trên là:',
        options: [
          { key: 'A', content: '$161,5$' },
          { key: 'B', content: '$162,0$' },
          { key: 'C', content: '$162,25$' },
          { key: 'D', content: '$163,25$' },
        ],
        correctAnswer: 'C',
        explanation:
          'Giá trị đại diện của các nhóm lần lượt là: $152,5;\\ 157,5;\\ 162,5;\\ 167,5;\\ 172,5$. Số trung bình là: $\\bar{x} = \\frac{4 \\cdot 152,5 + 10 \\cdot 157,5 + 14 \\cdot 162,5 + 8 \\cdot 167,5 + 4 \\cdot 172,5}{40} = \\frac{6490}{40} = 162,25$.',
        pedagogicalTip: 'Tính giá trị đại diện $c_i$ của từng nhóm trước khi áp dụng công thức số trung bình $\\bar{x} = \\frac{\\sum n_i c_i}{n}$.',
        points: 0.25,
      },
      {
        id: 'd6-p1-q12',
        part: 'part1',
        number: 12,
        topic: 'Mẫu số liệu ghép nhóm',
        prompt:
          'Khảo sát chiều cao (cm) của $40$ học sinh lớp 11A, ta có bảng số liệu ghép nhóm sau:\n$$\\begin{array}{|l|c|c|c|c|c|}\\hline \\text{Chiều cao} & [150; 155) & [155; 160) & [160; 165) & [165; 170) & [170; 175) \\\\ \\hline \\text{Số học sinh} & 4 & 10 & 14 & 8 & 4 \\\\ \\hline \\end{array}$$\nGiá trị đại diện của nhóm $[165; 170)$ là:',
        options: [
          { key: 'A', content: '$167,5$' },
          { key: 'B', content: '$165$' },
          { key: 'C', content: '$170$' },
          { key: 'D', content: '$8$' },
        ],
        correctAnswer: 'A',
        explanation:
          'Giá trị đại diện của nhóm $[165; 170)$ là trung bình cộng hai đầu mút: $\\frac{165 + 170}{2} = 167,5$.',
        pedagogicalTip: 'Giá trị đại diện của nhóm $[a_i; a_{i+1})$ là trung bình cộng hai đầu mút $\\frac{a_i + a_{i+1}}{2}$.',
        points: 0.25,
      },
    ],
    part2: [
      {
        id: 'd6-p2-q1',
        part: 'part2',
        number: 13,
        topic: 'Hàm số lượng giác',
        prompt: 'Cho hàm số lượng giác $y = \\sin x$. Xét tính đúng sai của các khẳng định sau:',
        statements: [
          {
            id: 'a',
            label: 'a',
            statement: 'Tập xác định của hàm số là $\\mathbb{R}$.',
            isCorrect: true,
            explanation: 'Hàm số $y = \\sin x$ xác định với mọi $x \\in \\mathbb{R}$. Khẳng định đúng.',
          },
          {
            id: 'b',
            label: 'b',
            statement: 'Tập giá trị của hàm số là $[-1; 1]$.',
            isCorrect: true,
            explanation: 'Ta luôn có $-1 \\le \\sin x \\le 1$ với mọi $x \\in \\mathbb{R}$. Khẳng định đúng.',
          },
          {
            id: 'c',
            label: 'c',
            statement: 'Hàm số $y = \\sin x$ là hàm số chẵn.',
            isCorrect: false,
            explanation: 'Ta có $\\sin(-x) = -\\sin x$ với mọi $x \\in \\mathbb{R}$ nên hàm số $y = \\sin x$ là hàm số lẻ. Khẳng định sai.',
          },
          {
            id: 'd',
            label: 'd',
            statement: 'Đồ thị hàm số đi qua gốc tọa độ $O(0; 0)$.',
            isCorrect: true,
            explanation: 'Với $x = 0$ thì $y = \\sin 0 = 0$, nên đồ thị hàm số đi qua gốc tọa độ $O(0; 0)$. Khẳng định đúng.',
          },
        ],
        pedagogicalTip: 'Hàm số $y = \\sin x$ là hàm số lẻ và đồ thị đi qua gốc tọa độ $O(0; 0)$; hàm số $y = \\cos x$ là hàm số chẵn và đồ thị cắt trục tung tại $(0; 1)$.',
      },
      {
        id: 'd6-p2-q2',
        part: 'part2',
        number: 14,
        topic: 'Ứng dụng cấp số cộng',
        prompt:
          'Một hội trường được thiết kế các hàng ghế theo cấu trúc: hàng ghế đầu tiên có $18$ ghế, và mỗi hàng ghế phía sau có nhiều hơn hàng liền trước nó $4$ ghế. Xét tính đúng sai của các khẳng định sau:',
        statements: [
          {
            id: 'a',
            label: 'a',
            statement:
              'Số lượng ghế ở mỗi hàng theo thứ tự từ trước ra sau lập thành một cấp số cộng với số hạng đầu $u_1 = 18$ và công sai $d = 4$.',
            isCorrect: true,
            explanation:
              'Hàng đầu có $18$ ghế ($u_1 = 18$), mỗi hàng sau hơn hàng trước $4$ ghế ($d = 4$). Đây là một cấp số cộng. Khẳng định đúng.',
          },
          {
            id: 'b',
            label: 'b',
            statement: 'Hàng ghế thứ $10$ của hội trường có $54$ ghế.',
            isCorrect: true,
            explanation:
              'Số ghế ở hàng thứ $10$ là $u_{10} = u_1 + 9d = 18 + 9 \\cdot 4 = 54$ ghế. Khẳng định đúng.',
          },
          {
            id: 'c',
            label: 'c',
            statement: 'Tổng số ghế của $10$ hàng đầu tiên là $360$ ghế.',
            isCorrect: true,
            explanation:
              'Tổng số ghế của $10$ hàng đầu là $S_{10} = \\frac{10(u_1 + u_{10})}{2} = \\frac{10(18 + 54)}{2} = 360$ ghế. Khẳng định đúng.',
          },
          {
            id: 'd',
            label: 'd',
            statement:
              'Nếu hàng ghế cuối cùng có đúng $70$ ghế thì hội trường này có tổng cộng $15$ hàng ghế.',
            isCorrect: false,
            explanation:
              'Ta có $u_n = u_1 + (n - 1)d \\Rightarrow 70 = 18 + (n - 1)4 \\Rightarrow 4(n - 1) = 52 \\Rightarrow n - 1 = 13 \\Rightarrow n = 14$ hàng ghế (không phải $15$ hàng). Khẳng định sai.',
          },
        ],
        pedagogicalTip: 'Vận dụng công thức số hạng tổng quát $u_n = u_1 + (n - 1)d$ và tổng $S_n = \\frac{n[2u_1 + (n - 1)d]}{2}$ của cấp số cộng.',
      },
    ],
    part3: [
      {
        id: 'd6-p3-q1',
        part: 'part3',
        number: 15,
        topic: 'Phương trình lượng giác',
        prompt:
          'Tìm nghiệm âm lớn nhất của phương trình lượng giác $\\cos x = \\frac{\\sqrt{3}}{2}$, biết nghiệm có dạng $-\\frac{a\\pi}{b}$ với $a, b$ là các số nguyên dương và phân số $\\frac{a}{b}$ tối giản. Tính $a + b$.',
        acceptableAnswers: ['7'],
        explanation:
          'Ta có $\\cos x = \\frac{\\sqrt{3}}{2} \\Leftrightarrow x = \\pm\\frac{\\pi}{6} + k2\\pi\\ (k \\in \\mathbb{Z})$. Xét các nghiệm âm: với $x = -\\frac{\\pi}{6} + k2\\pi < 0 \\ (k \\le 0)$ thì nghiệm âm lớn nhất ứng với $k = 0$ là $x = -\\frac{\\pi}{6}$; với $x = \\frac{\\pi}{6} + k2\\pi < 0 \\ (k \\le -1)$ thì ứng với $k = -1$ ta được $x = -\\frac{11\\pi}{6} < -\\frac{\\pi}{6}$. Vậy nghiệm âm lớn nhất là $-\\frac{\\pi}{6}$, suy ra $a = 1, b = 6 \\Rightarrow a + b = 7$.',
        pedagogicalTip: 'Xét riêng từng họ nghiệm với điều kiện $x < 0$ để tìm nghiệm âm lớn nhất.',
        points: 0.5,
      },
      {
        id: 'd6-p3-q2',
        part: 'part3',
        number: 16,
        topic: 'Ứng dụng hàm số lượng giác',
        prompt:
          'Độ sâu $h$ (mét) của mực nước ở một cảng biển vào thời điểm $t$ (giờ) sau khi thủy triều lên lần đầu tiên trong ngày được tính xấp xỉ bởi công thức: $h = 1,2\\cos\\left(\\frac{\\pi}{6}t\\right) + 5$. Tìm độ sâu lớn nhất của mực nước biển ở cảng này.',
        acceptableAnswers: ['6,2', '6.2'],
        unit: 'mét',
        explanation:
          'Vì $-1 \\le \\cos\\left(\\frac{\\pi}{6}t\\right) \\le 1$ với mọi $t \\ge 0$ nên $h \\le 1,2 \\cdot 1 + 5 = 6,2$. Vậy độ sâu lớn nhất của mực nước biển là $6,2$ mét.',
        pedagogicalTip: 'Giá trị lớn nhất của $\\cos u$ bằng $1$, suy ra $h_{\\max} = 1,2 \\cdot 1 + 5 = 6,2$.',
        points: 0.5,
      },
      {
        id: 'd6-p3-q3',
        part: 'part3',
        number: 17,
        topic: 'Cấp số cộng',
        prompt:
          'Cho cấp số cộng $(u_n)$ có số hạng đầu $u_1 = -4$ và công sai $d = 3$. Số $86$ là số hạng thứ bao nhiêu của cấp số cộng này?',
        acceptableAnswers: ['31'],
        explanation:
          'Ta có $u_n = u_1 + (n - 1)d \\Rightarrow 86 = -4 + (n - 1)3 \\Rightarrow 3(n - 1) = 90 \\Rightarrow n - 1 = 30 \\Rightarrow n = 31$. Vậy số $86$ là số hạng thứ $31$.',
        pedagogicalTip: 'Giải phương trình $u_n = u_1 + (n - 1)d = 86$ để tìm chỉ số $n$.',
        points: 0.5,
      },
      {
        id: 'd6-p3-q4',
        part: 'part3',
        number: 18,
        topic: 'Mốt của mẫu số liệu ghép nhóm',
        prompt:
          'Khảo sát thời gian tự học (giờ/tuần) của $40$ học sinh thu được bảng phân bố tần số ghép nhóm sau:\n$$\\begin{array}{|l|c|c|c|c|c|}\\hline \\text{Thời gian (giờ)} & [0; 2) & [2; 4) & [4; 6) & [6; 8) & [8; 10) \\\\ \\hline \\text{Số học sinh} & 3 & 7 & 15 & 9 & 6 \\\\ \\hline \\end{array}$$\nTính giá trị Mốt $M_o$ của mẫu số liệu ghép nhóm trên (làm tròn kết quả đến chữ số thập phân thứ hai).',
        acceptableAnswers: ['5,14', '5.14'],
        explanation:
          'Nhóm chứa Mốt là nhóm $[4; 6)$ có tần số lớn nhất $n_3 = 15$. Ta có $u_3 = 4,\\ u_4 - u_3 = 2,\\ n_3 = 15,\\ n_2 = 7,\\ n_4 = 9$. Áp dụng công thức: $M_o = 4 + \\frac{15 - 7}{(15 - 7) + (15 - 9)} \\cdot 2 = 4 + \\frac{8}{8 + 6} \\cdot 2 = 4 + \\frac{8}{7} = \\frac{36}{7} \\approx 5,14$.',
        pedagogicalTip: 'Công thức mốt của mẫu số liệu ghép nhóm: $M_o = u_m + \\frac{n_m - n_{m-1}}{(n_m - n_{m-1}) + (n_m - n_{m+1})} \\cdot (u_{m+1} - u_m)$.',
        points: 0.5,
      },
    ],
    part4: [
      {
        id: 'd6-p4-q1',
        part: 'part4',
        number: 19,
        topic: 'Phương trình lượng giác trên một đoạn',
        problemStatement: 'Tìm số nghiệm của phương trình lượng giác $\\cos 2x = \\frac{1}{2}$ trên đoạn $[0; 2\\pi]$.',
        conclusionTarget: 'Xác định tất cả các nghiệm thuộc đoạn $[0; 2\\pi]$ và kết luận số nghiệm của phương trình.',
        steps: [
          {
            id: 'd6-p4-q1-s1',
            originalIndex: 1,
            roleDescription: 'Giải phương trình lượng giác tìm các họ nghiệm',
            content:
              'Ta có $\\cos 2x = \\frac{1}{2} \\Leftrightarrow 2x = \\pm\\frac{\\pi}{3} + k2\\pi \\Leftrightarrow x = \\pm\\frac{\\pi}{6} + k\\pi\\ (k \\in \\mathbb{Z})$.',
          },
          {
            id: 'd6-p4-q1-s2',
            originalIndex: 2,
            roleDescription: 'Xét họ nghiệm thứ nhất trên đoạn [0; 2π]',
            content:
              'Vì $x \\in [0; 2\\pi]$, với họ nghiệm $x = \\frac{\\pi}{6} + k\\pi$: cho $k = 0 \\Rightarrow x = \\frac{\\pi}{6}$; cho $k = 1 \\Rightarrow x = \\frac{7\\pi}{6}$.',
          },
          {
            id: 'd6-p4-q1-s3',
            originalIndex: 3,
            roleDescription: 'Xét họ nghiệm thứ hai trên đoạn [0; 2π]',
            content:
              'Với họ nghiệm $x = -\\frac{\\pi}{6} + k\\pi$ trên đoạn $[0; 2\\pi]$: cho $k = 1 \\Rightarrow x = \\frac{5\\pi}{6}$; cho $k = 2 \\Rightarrow x = \\frac{11\\pi}{6}$.',
          },
          {
            id: 'd6-p4-q1-s4',
            originalIndex: 4,
            roleDescription: 'Kết luận số nghiệm của phương trình',
            content: 'Vậy phương trình đã cho có $4$ nghiệm phân biệt trên đoạn $[0; 2\\pi]$.',
          },
        ],
        pedagogicalTip: 'Khi chia hai vế cho $2$, chu kỳ $k2\\pi$ cũng được chia cho $2$ thành $k\\pi$.',
        teacherAnalysis: 'Giải họ nghiệm của $\\cos 2x = \\frac{1}{2}$ -> Xét từng họ nghiệm trên $[0; 2\\pi]$ -> Kết luận $4$ nghiệm.',
        points: 0.75,
      },
      {
        id: 'd6-p4-q2',
        part: 'part4',
        number: 20,
        topic: 'Bài toán thực tế cấp số nhân',
        problemStatement:
          'Dân số của một thành phố năm 2020 là $3$ triệu người. Giả sử tỷ lệ tăng dân số mỗi năm của thành phố này không đổi và luôn bằng $2\\%$. Tính dự đoán dân số của thành phố này vào năm 2030 (làm tròn kết quả đến hàng nghìn).',
        conclusionTarget: 'Tính số dân dự đoán của thành phố vào năm 2030.',
        steps: [
          {
            id: 'd6-p4-q2-s1',
            originalIndex: 1,
            roleDescription: 'Mô hình hóa bài toán bằng cấp số nhân',
            content:
              'Đây là bài toán tăng trưởng theo cấp số nhân với dân số ban đầu $P_0 = 3$ (triệu người) và công bội $q = 1 + 2\\% = 1,02$.',
          },
          {
            id: 'd6-p4-q2-s2',
            originalIndex: 2,
            roleDescription: 'Xác định khoảng thời gian tăng trưởng',
            content: 'Từ năm 2020 đến năm 2030 là khoảng thời gian $n = 2030 - 2020 = 10$ năm.',
          },
          {
            id: 'd6-p4-q2-s3',
            originalIndex: 3,
            roleDescription: 'Tính dân số dự đoán năm 2030',
            content: 'Dân số năm 2030 là: $P_{10} = 3 \\cdot (1,02)^{10} \\approx 3,656983$ (triệu người).',
          },
          {
            id: 'd6-p4-q2-s4',
            originalIndex: 4,
            roleDescription: 'Làm tròn kết quả và kết luận',
            content: 'Làm tròn kết quả đến hàng nghìn, ta được dân số năm 2030 khoảng $3.657.000$ người.',
          },
        ],
        pedagogicalTip: 'Công thức tăng trưởng dân số sau $n$ năm với tỉ lệ tăng $r$ mỗi năm là $P_n = P_0(1 + r)^n$.',
        teacherAnalysis: 'Xác định $P_0 = 3$ triệu và $q = 1,02$ -> Tính số năm $n = 10$ -> Thay vào công thức -> Làm tròn $3.657.000$ người.',
        points: 0.75,
      },
      {
        id: 'd6-p4-q3',
        part: 'part4',
        number: 21,
        topic: 'Biến đổi công thức lượng giác',
        problemStatement:
          'Cho $\\sin\\alpha = \\frac{4}{5}$ và $\\frac{\\pi}{2} < \\alpha < \\pi$. Tính giá trị của biểu thức lượng giác $A = 5\\sin 2\\alpha$.',
        conclusionTarget: 'Tìm giá trị chính xác của biểu thức $A = 5\\sin 2\\alpha$.',
        steps: [
          {
            id: 'd6-p4-q3-s1',
            originalIndex: 1,
            roleDescription: 'Xác định dấu của cos α',
            content: 'Vì $\\frac{\\pi}{2} < \\alpha < \\pi$ (góc phần tư thứ II) nên $\\cos\\alpha < 0$.',
          },
          {
            id: 'd6-p4-q3-s2',
            originalIndex: 2,
            roleDescription: 'Tính giá trị của cos α',
            content:
              'Ta có $\\cos\\alpha = -\\sqrt{1 - \\sin^2\\alpha} = -\\sqrt{1 - \\left(\\frac{4}{5}\\right)^2} = -\\frac{3}{5}$.',
          },
          {
            id: 'd6-p4-q3-s3',
            originalIndex: 3,
            roleDescription: 'Áp dụng công thức nhân đôi tính sin 2α',
            content:
              'Khi đó $\\sin 2\\alpha = 2\\sin\\alpha\\cos\\alpha = 2 \\cdot \\frac{4}{5} \\cdot \\left(-\\frac{3}{5}\\right) = -\\frac{24}{25}$.',
          },
          {
            id: 'd6-p4-q3-s4',
            originalIndex: 4,
            roleDescription: 'Tính giá trị biểu thức A và kết luận',
            content: 'Vậy $A = 5\\sin 2\\alpha = 5 \\cdot \\left(-\\frac{24}{25}\\right) = -\\frac{24}{5} = -4,8$.',
          },
        ],
        pedagogicalTip: 'Sử dụng hệ thức $\\sin^2\\alpha + \\cos^2\\alpha = 1$ kết hợp dấu của $\\cos\\alpha$ trên $\\left(\\frac{\\pi}{2}; \\pi\\right)$ và công thức nhân đôi $\\sin 2\\alpha = 2\\sin\\alpha\\cos\\alpha$.',
        teacherAnalysis: 'Xét dấu $\\cos\\alpha < 0$ -> Tính $\\cos\\alpha = -\\frac{3}{5}$ -> Tính $\\sin 2\\alpha = -\\frac{24}{25}$ -> Nhân $5$ suy ra $A = -4,8$.',
        points: 0.75,
      },
      {
        id: 'd6-p4-q4',
        part: 'part4',
        number: 22,
        topic: 'Tứ phân vị của mẫu số liệu ghép nhóm',
        problemStatement:
          'Bảng sau đây thống kê điểm khảo sát môn Toán của $40$ học sinh (thang điểm $10$):\n$$\\begin{array}{|l|c|c|c|c|c|}\\hline \\text{Điểm số} & [0; 2) & [2; 4) & [4; 6) & [6; 8) & [8; 10] \\\\ \\hline \\text{Số học sinh} & 3 & 5 & 10 & 14 & 8 \\\\ \\hline \\end{array}$$\nTính tứ phân vị thứ nhất $Q_1$ của mẫu số liệu ghép nhóm trên.',
        conclusionTarget: 'Tính giá trị tứ phân vị thứ nhất $Q_1$.',
        steps: [
          {
            id: 'd6-p4-q4-s1',
            originalIndex: 1,
            roleDescription: 'Xác định cỡ mẫu và vị trí tứ phân vị thứ nhất',
            content:
              'Tổng số học sinh là $n = 40$. Tứ phân vị thứ nhất $Q_1$ ứng với vị trí thứ $\\frac{n}{4} = \\frac{40}{4} = 10$.',
          },
          {
            id: 'd6-p4-q4-s2',
            originalIndex: 2,
            roleDescription: 'Lập tần số tích lũy và tìm nhóm chứa Q₁',
            content:
              'Cộng dồn tần số: $3;\\ 8;\\ 18;\\ 32;\\ 40$. Giá trị thứ $10$ thuộc nhóm $[4; 6)$.',
          },
          {
            id: 'd6-p4-q4-s3',
            originalIndex: 3,
            roleDescription: 'Xác định các đại lượng trong công thức Q₁',
            content:
              'Nhóm $[4; 6)$ có đầu mút trái $u_3 = 4$, cỡ mẫu $n = 40$, tần số tích lũy nhóm liền trước $C = 8$, tần số nhóm $n_3 = 10$ và độ dài nhóm $u_4 - u_3 = 2$.',
          },
          {
            id: 'd6-p4-q4-s4',
            originalIndex: 4,
            roleDescription: 'Thay số vào công thức tính Q₁ và kết luận',
            content:
              'Ta có $Q_1 = u_3 + \\frac{\\frac{n}{4} - C}{n_3} \\cdot (u_4 - u_3) = 4 + \\frac{10 - 8}{10} \\cdot 2 = 4 + 0,4 = 4,4$.',
          },
        ],
        pedagogicalTip: 'Công thức tứ phân vị thứ nhất của mẫu số liệu ghép nhóm: $Q_1 = u_m + \\frac{\\frac{n}{4} - C}{n_m} \\cdot (u_{m+1} - u_m)$.',
        teacherAnalysis: 'Tính $\\frac{n}{4} = 10$ -> Xác định nhóm $[4; 6)$ chứa $Q_1$ -> Xác định $u_3 = 4, C = 8, n_3 = 10, h = 2$ -> Thay vào công thức tính $Q_1 = 4,4$.',
        points: 0.75,
      },
    ],
  },
  // ============================================================================
  // ĐỀ 07: ĐỀ KHẢO SÁT TOÁN 11 — TƯƠNG TỰ ĐỀ 02
  // ============================================================================
  {
    id: 'de-07',
    title: 'đề ôn gk1 07',
    subtitle: 'Lượng Giác, Dãy Số - Cấp Số Cộng - Cấp Số Nhân & Mẫu Số Liệu Ghép Nhóm (Đề tương tự Đề 02)',
    grade: 11,
    durationMinutes: 90,
    totalPoints: 10,
    description:
      'Đề khảo sát đánh giá năng lực môn Toán lớp 11 chuẩn cấu trúc 4 phần (22 câu hỏi, tương tự Đề 02): Góc và công thức lượng giác, Hàm số & Phương trình lượng giác, Dãy số - Cấp số cộng - Cấp số nhân, và Mẫu số liệu ghép nhóm.',
    part1: [
      {
        id: 'd7-p1-q1',
        part: 'part1',
        number: 1,
        topic: 'Góc lượng giác',
        prompt: 'Đổi số đo góc lượng giác $\\frac{3\\pi}{4}$ radian sang độ.',
        options: [
          { key: 'A', content: '$135^\\circ$' },
          { key: 'B', content: '$120^\\circ$' },
          { key: 'C', content: '$150^\\circ$' },
          { key: 'D', content: '$45^\\circ$' },
        ],
        correctAnswer: 'A',
        explanation:
          'Áp dụng công thức đổi từ radian sang độ: $a^\\circ = \\alpha \\cdot \\frac{180^\\circ}{\\pi} = \\frac{3\\pi}{4} \\cdot \\frac{180^\\circ}{\\pi} = 135^\\circ$.',
        pedagogicalTip: 'Công thức chuyển đổi từ radian sang độ: $\\alpha\\text{ (rad)} = \\left(\\alpha \\cdot \\frac{180}{\\pi}\\right)^\\circ$.',
        points: 0.25,
      },
      {
        id: 'd7-p1-q2',
        part: 'part1',
        number: 2,
        topic: 'Hệ thức lượng giác cơ bản',
        prompt: 'Trong các hệ thức lượng giác cơ bản sau, hệ thức nào sai (với giả thiết các biểu thức đều có nghĩa)?',
        options: [
          { key: 'A', content: '$\\sin^2 x + \\cos^2 x = 1$' },
          { key: 'B', content: '$\\tan x \\cdot \\cot x = 1$' },
          { key: 'C', content: '$1 + \\tan^2 x = \\frac{1}{\\sin^2 x}$' },
          { key: 'D', content: '$1 + \\cot^2 x = \\frac{1}{\\sin^2 x}$' },
        ],
        correctAnswer: 'C',
        explanation:
          'Hệ thức đúng là $1 + \\tan^2 x = \\frac{1}{\\cos^2 x}$ (với $\\cos x \\neq 0$), nên phương án $1 + \\tan^2 x = \\frac{1}{\\sin^2 x}$ là sai.',
        pedagogicalTip: 'Ghi nhớ cặp hệ thức: $1 + \\tan^2 x = \\frac{1}{\\cos^2 x}$ và $1 + \\cot^2 x = \\frac{1}{\\sin^2 x}$.',
        points: 0.25,
      },
      {
        id: 'd7-p1-q3',
        part: 'part1',
        number: 3,
        topic: 'Tập xác định của hàm số lượng giác',
        prompt: 'Tập xác định của hàm số $y = \\tan 2x - 1$ là:',
        options: [
          { key: 'A', content: '$D = \\mathbb{R} \\setminus \\left\\{k\\frac{\\pi}{2}, k \\in \\mathbb{Z}\\right\\}$' },
          { key: 'B', content: '$D = \\mathbb{R} \\setminus \\left\\{\\frac{\\pi}{4} + k\\frac{\\pi}{2}, k \\in \\mathbb{Z}\\right\\}$' },
          { key: 'C', content: '$D = \\mathbb{R} \\setminus \\{k\\pi, k \\in \\mathbb{Z}\\}$' },
          { key: 'D', content: '$D = \\mathbb{R} \\setminus \\left\\{\\frac{\\pi}{2} + k\\pi, k \\in \\mathbb{Z}\\right\\}$' },
        ],
        correctAnswer: 'B',
        explanation:
          'Hàm số $y = \\tan 2x - 1 = \\frac{\\sin 2x}{\\cos 2x} - 1$ xác định khi $\\cos 2x \\neq 0 \\Leftrightarrow 2x \\neq \\frac{\\pi}{2} + k\\pi \\Leftrightarrow x \\neq \\frac{\\pi}{4} + k\\frac{\\pi}{2}\\ (k \\in \\mathbb{Z})$. Vậy tập xác định là $D = \\mathbb{R} \\setminus \\left\\{\\frac{\\pi}{4} + k\\frac{\\pi}{2}, k \\in \\mathbb{Z}\\right\\}$.',
        pedagogicalTip: 'Điều kiện xác định của $\\tan u$ là $\\cos u \\neq 0 \\Leftrightarrow u \\neq \\frac{\\pi}{2} + k\\pi\\ (k \\in \\mathbb{Z})$.',
        points: 0.25,
      },
      {
        id: 'd7-p1-q4',
        part: 'part1',
        number: 4,
        topic: 'Phương trình lượng giác cơ bản',
        prompt: 'Nghiệm của phương trình $\\sin 2x = \\sin\\left(-\\frac{\\pi}{6}\\right)$ là:',
        options: [
          { key: 'A', content: '$x = -\\frac{\\pi}{12} + k\\pi$ hoặc $x = \\frac{7\\pi}{12} + k\\pi\\ (k \\in \\mathbb{Z})$' },
          { key: 'B', content: '$x = -\\frac{\\pi}{6} + k2\\pi$ hoặc $x = \\frac{7\\pi}{6} + k2\\pi\\ (k \\in \\mathbb{Z})$' },
          { key: 'C', content: '$x = -\\frac{\\pi}{12} + k2\\pi$ hoặc $x = \\frac{7\\pi}{12} + k2\\pi\\ (k \\in \\mathbb{Z})$' },
          { key: 'D', content: '$x = \\pm\\frac{\\pi}{12} + k\\pi\\ (k \\in \\mathbb{Z})$' },
        ],
        correctAnswer: 'A',
        explanation:
          'Ta có $\\sin 2x = \\sin\\left(-\\frac{\\pi}{6}\\right) \\Leftrightarrow \\left[\\begin{array}{l} 2x = -\\frac{\\pi}{6} + k2\\pi \\\\ 2x = \\pi - \\left(-\\frac{\\pi}{6}\\right) + k2\\pi = \\frac{7\\pi}{6} + k2\\pi \\end{array}\\right. \\Leftrightarrow \\left[\\begin{array}{l} x = -\\frac{\\pi}{12} + k\\pi \\\\ x = \\frac{7\\pi}{12} + k\\pi \\end{array}\\right. (k \\in \\mathbb{Z})$.',
        pedagogicalTip: 'Khi chia cả hai vế của họ nghiệm cho $2$, nhớ chia cả chu kỳ $k2\\pi$ cho $2$ để được $k\\pi$.',
        points: 0.25,
      },
      {
        id: 'd7-p1-q5',
        part: 'part1',
        number: 5,
        topic: 'Giá trị lượng giác của một góc',
        prompt: 'Cho $\\cos x = \\frac{4}{5}$ với $-\\frac{\\pi}{2} < x < 0$. Tính giá trị của $\\sin x$.',
        options: [
          { key: 'A', content: '$\\frac{3}{5}$' },
          { key: 'B', content: '$-\\frac{3}{5}$' },
          { key: 'C', content: '$\\frac{9}{25}$' },
          { key: 'D', content: '$-\\frac{9}{25}$' },
        ],
        correctAnswer: 'B',
        explanation:
          'Ta có $\\sin^2 x = 1 - \\cos^2 x = 1 - \\left(\\frac{4}{5}\\right)^2 = \\frac{9}{25}$. Vì $-\\frac{\\pi}{2} < x < 0$ (góc phần tư thứ IV) nên $\\sin x < 0 \\Rightarrow \\sin x = -\\sqrt{\\frac{9}{25}} = -\\frac{3}{5}$.',
        pedagogicalTip: 'Trên khoảng $\\left(-\\frac{\\pi}{2}; 0\\right)$ thuộc góc phần tư thứ IV, $\\cos x > 0$ và $\\sin x < 0$.',
        points: 0.25,
      },
      {
        id: 'd7-p1-q6',
        part: 'part1',
        number: 6,
        topic: 'Tập giá trị của hàm số lượng giác',
        prompt: 'Tập giá trị của hàm số $y = \\cot 2x$ là:',
        options: [
          { key: 'A', content: '$\\mathbb{R}$' },
          { key: 'B', content: '$[-1; 1]$' },
          { key: 'C', content: '$[-2; 2]$' },
          { key: 'D', content: '$\\mathbb{R} \\setminus \\left\\{k\\frac{\\pi}{2}, k \\in \\mathbb{Z}\\right\\}$' },
        ],
        correctAnswer: 'A',
        explanation:
          'Hàm số $y = \\cot 2x$ nhận mọi giá trị thực nên có tập giá trị là $T = \\mathbb{R}$ (còn $\\mathbb{R} \\setminus \\left\\{k\\frac{\\pi}{2}, k \\in \\mathbb{Z}\\right\\}$ là tập xác định của hàm số).',
        pedagogicalTip: 'Cần phân biệt rõ Tập xác định $D$ và Tập giá trị $T = \\mathbb{R}$ của hàm số $y = \\cot u$.',
        points: 0.25,
      },
      {
        id: 'd7-p1-q7',
        part: 'part1',
        number: 7,
        topic: 'Tính tăng, giảm của dãy số',
        prompt: 'Cho dãy số $(u_n)$ với $u_n = 2 \\cdot (-3)^n$. Khẳng định nào sau đây là đúng?',
        options: [
          { key: 'A', content: '$(u_n)$ là dãy số giảm.' },
          { key: 'B', content: '$(u_n)$ là dãy số tăng.' },
          { key: 'C', content: '$(u_n)$ là dãy số không đổi.' },
          { key: 'D', content: '$(u_n)$ không tăng, không giảm.' },
        ],
        correctAnswer: 'D',
        explanation:
          'Ta có $u_1 = -6,\\ u_2 = 18,\\ u_3 = -54$. Vì $u_1 < u_2$ nhưng $u_2 > u_3$ (dãy số đan dấu) nên dãy số $(u_n)$ không tăng, không giảm.',
        pedagogicalTip: 'Dãy số có chứa lũy thừa cơ số âm $(-a)^n$ với $a > 0$ là dãy đan dấu nên không tăng, không giảm.',
        points: 0.25,
      },
      {
        id: 'd7-p1-q8',
        part: 'part1',
        number: 8,
        topic: 'Cấp số cộng',
        prompt: 'Cho cấp số cộng $(u_n)$ có số hạng đầu $u_1 = 6$ và $u_2 = 13$. Công sai $d$ của cấp số cộng này là:',
        options: [
          { key: 'A', content: '$7$' },
          { key: 'B', content: '$-7$' },
          { key: 'C', content: '$19$' },
          { key: 'D', content: '$78$' },
        ],
        correctAnswer: 'A',
        explanation:
          'Công sai của cấp số cộng là $d = u_2 - u_1 = 13 - 6 = 7$.',
        pedagogicalTip: 'Công sai của cấp số cộng bằng số hạng đứng sau trừ số hạng đứng ngay trước nó: $d = u_2 - u_1$.',
        points: 0.25,
      },
      {
        id: 'd7-p1-q9',
        part: 'part1',
        number: 9,
        topic: 'Số hạng tổng quát của cấp số cộng',
        prompt: 'Cho cấp số cộng $(u_n)$ có $u_1 = 3$ và công sai $d = 5$. Số hạng tổng quát $u_n$ là:',
        options: [
          { key: 'A', content: '$u_n = 5n + 3$' },
          { key: 'B', content: '$u_n = 3n + 5$' },
          { key: 'C', content: '$u_n = 5n - 3$' },
          { key: 'D', content: '$u_n = 5n - 2$' },
        ],
        correctAnswer: 'D',
        explanation:
          'Số hạng tổng quát của cấp số cộng là $u_n = u_1 + (n - 1)d = 3 + (n - 1) \\cdot 5 = 5n - 2$.',
        pedagogicalTip: 'Áp dụng công thức $u_n = u_1 + (n - 1)d = 3 + 5n - 5 = 5n - 2$.',
        points: 0.25,
      },
      {
        id: 'd7-p1-q10',
        part: 'part1',
        number: 10,
        topic: 'Cấp số nhân',
        prompt: 'Cho cấp số nhân $(u_n)$ có số hạng đầu $u_1 = 5$ và công bội $q = 2$. Số hạng thứ ba $u_3$ bằng:',
        options: [
          { key: 'A', content: '$20$' },
          { key: 'B', content: '$10$' },
          { key: 'C', content: '$40$' },
          { key: 'D', content: '$25$' },
        ],
        correctAnswer: 'A',
        explanation:
          'Số hạng thứ ba của cấp số nhân là $u_3 = u_1 \\cdot q^2 = 5 \\cdot 2^2 = 20$.',
        pedagogicalTip: 'Áp dụng công thức số hạng tổng quát của cấp số nhân: $u_n = u_1 \\cdot q^{n-1}$.',
        points: 0.25,
      },
      {
        id: 'd7-p1-q11',
        part: 'part1',
        number: 11,
        topic: 'Số trung bình của mẫu số liệu ghép nhóm',
        prompt:
          'Khảo sát khối lượng (kg) của $40$ học sinh lớp 11B, ta có bảng số liệu ghép nhóm sau:\n$$\\begin{array}{|l|c|c|c|c|c|}\\hline \\text{Khối lượng} & [40; 45) & [45; 50) & [50; 55) & [55; 60) & [60; 65) \\\\ \\hline \\text{Số học sinh} & 4 & 10 & 16 & 6 & 4 \\\\ \\hline \\end{array}$$\nSố trung bình của mẫu số liệu ghép nhóm trên là:',
        options: [
          { key: 'A', content: '$52,0$' },
          { key: 'B', content: '$51,5$' },
          { key: 'C', content: '$52,5$' },
          { key: 'D', content: '$50,5$' },
        ],
        correctAnswer: 'A',
        explanation:
          'Giá trị đại diện của các nhóm $[40; 45),\\ [45; 50),\\ [50; 55),\\ [55; 60),\\ [60; 65)$ lần lượt là $42,5;\\ 47,5;\\ 52,5;\\ 57,5;\\ 62,5$. Số trung bình của mẫu số liệu ghép nhóm là $\\bar{x} = \\frac{4 \\cdot 42,5 + 10 \\cdot 47,5 + 16 \\cdot 52,5 + 6 \\cdot 57,5 + 4 \\cdot 62,5}{40} = \\frac{2080}{40} = 52,0$ (kg).',
        pedagogicalTip: 'Công thức số trung bình của mẫu số liệu ghép nhóm: $\\bar{x} = \\frac{n_1 c_1 + n_2 c_2 + \\dots + n_k c_k}{n}$, với $c_i$ là giá trị đại diện của nhóm thứ $i$.',
        points: 0.25,
      },
      {
        id: 'd7-p1-q12',
        part: 'part1',
        number: 12,
        topic: 'Mẫu số liệu ghép nhóm',
        prompt:
          'Khảo sát khối lượng (kg) của $40$ học sinh lớp 11B, ta có bảng số liệu ghép nhóm sau:\n$$\\begin{array}{|l|c|c|c|c|c|}\\hline \\text{Khối lượng} & [40; 45) & [45; 50) & [50; 55) & [55; 60) & [60; 65) \\\\ \\hline \\text{Số học sinh} & 4 & 10 & 16 & 6 & 4 \\\\ \\hline \\end{array}$$\nGiá trị đại diện của nhóm $[55; 60)$ là:',
        options: [
          { key: 'A', content: '$57,5$' },
          { key: 'B', content: '$55$' },
          { key: 'C', content: '$60$' },
          { key: 'D', content: '$6$' },
        ],
        correctAnswer: 'A',
        explanation:
          'Giá trị đại diện của nhóm $[55; 60)$ là $\\frac{55 + 60}{2} = 57,5$.',
        pedagogicalTip: 'Giá trị đại diện của nhóm $[a; b)$ bằng trung bình cộng hai đầu mút $\\frac{a + b}{2}$.',
        points: 0.25,
      },
    ],
    part2: [
      {
        id: 'd7-p2-q1',
        part: 'part2',
        number: 13,
        topic: 'Hàm số lượng giác',
        prompt: 'Cho hàm số lượng giác $y = 4 - 3\\cos x$. Xét tính đúng sai của các khẳng định sau:',
        statements: [
          {
            id: 'a',
            label: 'a',
            statement: 'Tập xác định của hàm số là $\\mathbb{R}$.',
            isCorrect: true,
            explanation: 'Đúng. Hàm số $y = \\cos x$ xác định với mọi $x \\in \\mathbb{R}$ nên hàm số $y = 4 - 3\\cos x$ có tập xác định $D = \\mathbb{R}$.',
          },
          {
            id: 'b',
            label: 'b',
            statement: 'Tập giá trị của hàm số là $[-3; 7]$.',
            isCorrect: false,
            explanation: 'Sai. Vì $-1 \\le \\cos x \\le 1 \\Rightarrow -3 \\le -3\\cos x \\le 3 \\Rightarrow 1 \\le 4 - 3\\cos x \\le 7$. Vậy tập giá trị của hàm số là $[1; 7]$.',
          },
          {
            id: 'c',
            label: 'c',
            statement: 'Hàm số $y = 4 - 3\\cos x$ là hàm số lẻ.',
            isCorrect: false,
            explanation: 'Sai. Xét $y(-x) = 4 - 3\\cos(-x) = 4 - 3\\cos x = y(x),\\ \\forall x \\in \\mathbb{R}$, nên hàm số đã cho là hàm số chẵn, không phải hàm số lẻ.',
          },
          {
            id: 'd',
            label: 'd',
            statement: 'Giá trị lớn nhất của hàm số là $7$.',
            isCorrect: true,
            explanation: 'Đúng. Vì $1 \\le y \\le 7\\,\\forall x \\in \\mathbb{R}$ và $y = 7$ đạt được khi $\\cos x = -1$, nên giá trị lớn nhất của hàm số bằng $7$.',
          },
        ],
        pedagogicalTip: 'Khi nhân bất đẳng thức $-1 \\le \\cos x \\le 1$ với $-3$, nhớ đổi chiều bất đẳng thức trước khi cộng thêm $4$.',
      },
      {
        id: 'd7-p2-q2',
        part: 'part2',
        number: 14,
        topic: 'Ứng dụng cấp số cộng',
        prompt:
          'Một người thợ nhận đào một cái giếng sâu. Giá của mét khoan đầu tiên là $120\\,000$ đồng. Kể từ mét khoan thứ hai, giá của mỗi mét khoan tăng thêm $40\\,000$ đồng so với giá của mét khoan ngay trước đó. Xét tính đúng sai của các khẳng định sau:',
        statements: [
          {
            id: 'a',
            label: 'a',
            statement:
              'Giá tiền của mỗi mét khoan (theo thứ tự từ mét đầu tiên xuống sâu) lập thành cấp số cộng với số hạng đầu $u_1 = 120\\,000$ và công sai $d = 40\\,000$.',
            isCorrect: true,
            explanation:
              'Đúng. Mét đầu tiên có giá $u_1 = 120\\,000$ đồng và mỗi mét tiếp theo hơn mét liền trước $d = 40\\,000$ đồng nên lập thành một cấp số cộng.',
          },
          {
            id: 'b',
            label: 'b',
            statement: 'Giá của mét khoan thứ $10$ là $480\\,000$ đồng.',
            isCorrect: true,
            explanation:
              'Đúng. Giá của mét khoan thứ $10$ là $u_{10} = u_1 + 9d = 120\\,000 + 9 \\cdot 40\\,000 = 480\\,000$ (đồng).',
          },
          {
            id: 'c',
            label: 'c',
            statement: 'Tổng chi phí để khoan giếng sâu $10$ mét là $3\\,000\\,000$ đồng.',
            isCorrect: true,
            explanation:
              'Đúng. Tổng chi phí khoan $10$ mét là $S_{10} = \\frac{10}{2}(2u_1 + 9d) = 5(240\\,000 + 360\\,000) = 3\\,000\\,000$ (đồng).',
          },
          {
            id: 'd',
            label: 'd',
            statement: 'Nếu chủ nhà có $5\\,500\\,000$ đồng thì đủ trả chi phí để khoan giếng sâu $15$ mét.',
            isCorrect: false,
            explanation:
              'Sai. Tổng chi phí khoan giếng sâu $15$ mét là $S_{15} = \\frac{15}{2}(2 \\cdot 120\\,000 + 14 \\cdot 40\\,000) = \\frac{15 \\cdot 800\\,000}{2} = 6\\,000\\,000$ đồng $> 5\\,500\\,000$ đồng, nên không đủ.',
          },
        ],
        pedagogicalTip: 'Phân biệt rõ giá tiền của riêng mét khoan thứ $n$ ($u_n$) với tổng chi phí khoan $n$ mét đầu tiên ($S_n$).',
      },
    ],
    part3: [
      {
        id: 'd7-p3-q1',
        part: 'part3',
        number: 15,
        topic: 'Phương trình lượng giác',
        prompt:
          'Tìm nghiệm âm lớn nhất của phương trình lượng giác $\\cos x = -\\frac{1}{2}$, biết nghiệm có dạng $-\\frac{a\\pi}{b}$ với $a, b$ là số nguyên dương và phân số tối giản. Tính $a + b$.',
        acceptableAnswers: ['5'],
        explanation:
          'Ta có $\\cos x = -\\frac{1}{2} \\Leftrightarrow x = \\pm\\frac{2\\pi}{3} + k2\\pi\\ (k \\in \\mathbb{Z})$. Nghiệm âm lớn nhất của phương trình là $x = -\\frac{2\\pi}{3}$ (ứng với $k = 0$ ở họ nghiệm $-\\frac{2\\pi}{3} + k2\\pi$). Suy ra $a = 2,\\ b = 3 \\Rightarrow a + b = 5$.',
        pedagogicalTip: 'Biểu diễn nghiệm trên đường tròn lượng giác hoặc thử các giá trị nguyên $k \\le 0$ để tìm nghiệm âm lớn nhất.',
        points: 0.5,
      },
      {
        id: 'd7-p3-q2',
        part: 'part3',
        number: 16,
        topic: 'Ứng dụng hàm số lượng giác',
        prompt:
          'Một chiếc cabin của vòng quay mặt trời (Ferris wheel) có độ cao $h$ (mét) so với mặt đất phụ thuộc vào thời gian $t$ (phút) kể từ lúc bắt đầu quay theo công thức $h(t) = 60 + 45\\sin\\left(\\frac{\\pi}{15}t - \\frac{\\pi}{2}\\right)$. Tìm độ cao lớn nhất của chiếc cabin này (đơn vị: mét).',
        acceptableAnswers: ['105'],
        unit: 'mét',
        explanation:
          'Vì $-1 \\le \\sin\\left(\\frac{\\pi}{15}t - \\frac{\\pi}{2}\\right) \\le 1$ với mọi $t \\ge 0$ nên $h(t) \\le 60 + 45 \\cdot 1 = 105$ (mét). Dấu bằng xảy ra chẳng hạn khi $t = 15$ phút. Vậy độ cao lớn nhất của chiếc cabin là $105$ mét.',
        pedagogicalTip: 'Độ cao lớn nhất đạt được khi hàm $\\sin$ nhận giá trị lớn nhất bằng $1$.',
        points: 0.5,
      },
      {
        id: 'd7-p3-q3',
        part: 'part3',
        number: 17,
        topic: 'Cấp số nhân',
        prompt:
          'Cho cấp số nhân $(u_n)$ có số hạng thứ hai $u_2 = 10$ và công bội $q = 2$. Hỏi số $320$ là số hạng thứ bao nhiêu của cấp số nhân này?',
        acceptableAnswers: ['7'],
        explanation:
          'Số hạng đầu của cấp số nhân là $u_1 = \\frac{u_2}{q} = \\frac{10}{2} = 5$. Ta có $u_n = u_1 \\cdot q^{n-1} = 320 \\Leftrightarrow 5 \\cdot 2^{n-1} = 320 \\Leftrightarrow 2^{n-1} = 64 = 2^6 \\Leftrightarrow n - 1 = 6 \\Leftrightarrow n = 7$. Vậy số $320$ là số hạng thứ $7$.',
        pedagogicalTip: 'Có thể dùng trực tiếp hệ thức $u_n = u_2 \\cdot q^{n-2} \\Rightarrow 320 = 10 \\cdot 2^{n-2} \\Leftrightarrow 2^{n-2} = 32 = 2^5 \\Leftrightarrow n = 7$.',
        points: 0.5,
      },
      {
        id: 'd7-p3-q4',
        part: 'part3',
        number: 18,
        topic: 'Mốt của mẫu số liệu ghép nhóm',
        prompt:
          'Khảo sát thời gian tự học (giờ/tuần) của $40$ học sinh thu được bảng phân bố tần số ghép nhóm sau:\n$$\\begin{array}{|l|c|c|c|c|c|}\\hline \\text{Thời gian} & [0; 2) & [2; 4) & [4; 6) & [6; 8) & [8; 10) \\\\ \\hline \\text{Số học sinh} & 3 & 7 & 16 & 10 & 4 \\\\ \\hline \\end{array}$$\nTính giá trị Mốt của mẫu số liệu ghép nhóm trên (làm tròn kết quả đến chữ số thập phân thứ nhất).',
        acceptableAnswers: ['5,2', '5.2'],
        explanation:
          'Nhóm chứa Mốt là nhóm $[4; 6)$ có tần số lớn nhất $n_3 = 16$. Ta có $u_m = 4,\\ u_{m+1} - u_m = 2,\\ n_m = 16,\\ n_{m-1} = 7,\\ n_{m+1} = 10$. Khi đó $M_o = 4 + \\frac{16 - 7}{(16 - 7) + (16 - 10)} \\cdot 2 = 4 + \\frac{9}{15} \\cdot 2 = 4 + 1,2 = 5,2$.',
        pedagogicalTip: 'Áp dụng công thức mốt: $M_o = u_m + \\frac{n_m - n_{m-1}}{(n_m - n_{m-1}) + (n_m - n_{m+1})} \\cdot (u_{m+1} - u_m)$.',
        points: 0.5,
      },
    ],
    part4: [
      {
        id: 'd7-p4-q1',
        part: 'part4',
        number: 19,
        topic: 'Phương trình lượng giác trên nửa khoảng',
        problemStatement: 'Tính tổng các nghiệm của phương trình lượng giác $\\sin 2x = \\frac{\\sqrt{3}}{2}$ trên nửa khoảng $[0; \\pi)$.',
        conclusionTarget: 'Xác định các nghiệm thuộc $[0; \\pi)$ và tính tổng các nghiệm đó.',
        steps: [
          {
            id: 'd7-p4-q1-s1',
            originalIndex: 1,
            roleDescription: 'Giải phương trình tìm các họ nghiệm',
            content:
              'Ta có $\\sin 2x = \\frac{\\sqrt{3}}{2} \\Leftrightarrow \\left[\\begin{array}{l} 2x = \\frac{\\pi}{3} + k2\\pi \\\\ 2x = \\frac{2\\pi}{3} + k2\\pi \\end{array}\\right. \\Leftrightarrow \\left[\\begin{array}{l} x = \\frac{\\pi}{6} + k\\pi \\\\ x = \\frac{\\pi}{3} + k\\pi \\end{array}\\right. (k \\in \\mathbb{Z})$.',
          },
          {
            id: 'd7-p4-q1-s2',
            originalIndex: 2,
            roleDescription: 'Tìm các nghiệm thuộc nửa khoảng [0; π)',
            content:
              'Vì $x \\in [0; \\pi)$ nên ứng với $k = 0$, phương trình có đúng hai nghiệm thuộc $[0; \\pi)$ là $x_1 = \\frac{\\pi}{6}$ và $x_2 = \\frac{\\pi}{3}$.',
          },
          {
            id: 'd7-p4-q1-s3',
            originalIndex: 3,
            roleDescription: 'Tính tổng các nghiệm trên [0; π)',
            content:
              'Tổng các nghiệm của phương trình trên $[0; \\pi)$ là $S = x_1 + x_2 = \\frac{\\pi}{6} + \\frac{\\pi}{3} = \\frac{\\pi}{2}$.',
          },
          {
            id: 'd7-p4-q1-s4',
            originalIndex: 4,
            roleDescription: 'Kết luận kết quả',
            content: 'Vậy tổng các nghiệm của phương trình đã cho trên nửa khoảng $[0; \\pi)$ bằng $\\frac{\\pi}{2}$.',
          },
        ],
        pedagogicalTip: 'Chú ý miền nghiệm là nửa khoảng $[0; \\pi)$ nên chỉ nhận các nghiệm ứng với $k = 0$.',
        teacherAnalysis: 'Giải họ nghiệm của $\\sin 2x = \\frac{\\sqrt{3}}{2}$ -> Lọc nghiệm thuộc $[0; \\pi)$ -> Cộng hai nghiệm $x_1 + x_2 = \\frac{\\pi}{2}$.',
        points: 0.75,
      },
      {
        id: 'd7-p4-q2',
        part: 'part4',
        number: 20,
        topic: 'Bài toán thực tế cấp số nhân',
        problemStatement:
          'Một bài toán lan truyền tin đồn được mô hình hóa như sau: Giả sử ngày đầu tiên (ngày thứ $1$) có $1$ người biết một tin đồn bí mật. Ngày hôm sau, người này kể cho $2$ người khác chưa biết. Ngày tiếp theo, mỗi người trong số $2$ người mới biết lại đi kể cho $2$ người khác chưa biết. Cứ như vậy, giả định rằng mỗi người chỉ đi kể tin đồn đúng một lần cho $2$ người mới vào ngày ngay sau khi họ biết tin. Tính tổng số người biết tin đồn này sau $10$ ngày kể từ ngày đầu tiên.',
        conclusionTarget: 'Tính tổng số người biết tin đồn sau $10$ ngày.',
        steps: [
          {
            id: 'd7-p4-q2-s1',
            originalIndex: 1,
            roleDescription: 'Biểu diễn số người mới biết tin mỗi ngày',
            content:
              'Gọi $u_n$ là số người mới biết tin đồn vào ngày thứ $n$. Theo giả thiết, ta có $u_1 = 1,\\ u_2 = 2,\\ u_3 = 2^2 = 4,\\dots$',
          },
          {
            id: 'd7-p4-q2-s2',
            originalIndex: 2,
            roleDescription: 'Xác định cấp số nhân',
            content:
              'Dãy số $(u_n)$ lập thành một cấp số nhân với số hạng đầu $u_1 = 1$ và công bội $q = 2$.',
          },
          {
            id: 'd7-p4-q2-s3',
            originalIndex: 3,
            roleDescription: 'Lập công thức tổng 10 số hạng đầu tiên',
            content:
              'Tổng số người biết tin đồn sau $10$ ngày là tổng của $10$ số hạng đầu tiên: $S_{10} = \\frac{u_1(q^{10} - 1)}{q - 1}$.',
          },
          {
            id: 'd7-p4-q2-s4',
            originalIndex: 4,
            roleDescription: 'Thay số và kết luận',
            content:
              'Thay số vào công thức, ta được $S_{10} = \\frac{1 \\cdot (2^{10} - 1)}{2 - 1} = 1024 - 1 = 1\\,023$ (người).',
          },
        ],
        pedagogicalTip: 'Đọc kỹ yêu cầu đề bài hỏi "tổng số người biết tin sau 10 ngày" ($S_{10}$) chứ không phải số người mới biết tin ở riêng ngày thứ 10 ($u_{10}$).',
        teacherAnalysis: 'Xác định dãy $u_n$ là cấp số nhân ($u_1 = 1, q = 2$) -> Áp dụng công thức tổng $S_{10} = \\frac{u_1(q^{10} - 1)}{q - 1}$ -> Tính ra $1\\,023$ người.',
        points: 0.75,
      },
      {
        id: 'd7-p4-q3',
        part: 'part4',
        number: 21,
        topic: 'Tính giá trị biểu thức lượng giác',
        problemStatement:
          'Cho $\\cos\\alpha = -\\frac{3}{5}$ và $\\pi < \\alpha < \\frac{3\\pi}{2}$. Tính giá trị của biểu thức lượng giác $A = \\sin 2\\alpha + \\sin\\alpha$.',
        conclusionTarget: 'Tính giá trị chính xác của biểu thức $A = \\sin 2\\alpha + \\sin\\alpha$.',
        steps: [
          {
            id: 'd7-p4-q3-s1',
            originalIndex: 1,
            roleDescription: 'Xác định dấu của sin α',
            content: 'Vì $\\pi < \\alpha < \\frac{3\\pi}{2}$ (góc thuộc góc phần tư thứ III) nên $\\sin\\alpha < 0$.',
          },
          {
            id: 'd7-p4-q3-s2',
            originalIndex: 2,
            roleDescription: 'Tính giá trị của sin α',
            content:
              'Ta có $\\sin\\alpha = -\\sqrt{1 - \\cos^2\\alpha} = -\\sqrt{1 - \\left(-\\frac{3}{5}\\right)^2} = -\\frac{4}{5}$.',
          },
          {
            id: 'd7-p4-q3-s3',
            originalIndex: 3,
            roleDescription: 'Áp dụng công thức nhân đôi tính sin 2α',
            content:
              'Khi đó $\\sin 2\\alpha = 2\\sin\\alpha\\cos\\alpha = 2 \\cdot \\left(-\\frac{4}{5}\\right) \\cdot \\left(-\\frac{3}{5}\\right) = \\frac{24}{25}$.',
          },
          {
            id: 'd7-p4-q3-s4',
            originalIndex: 4,
            roleDescription: 'Thay vào biểu thức A và kết luận',
            content:
              'Vậy $A = \\sin 2\\alpha + \\sin\\alpha = \\frac{24}{25} + \\left(-\\frac{4}{5}\\right) = \\frac{24 - 20}{25} = \\frac{4}{25}$.',
          },
        ],
        pedagogicalTip: 'Trên khoảng $\\left(\\pi; \\frac{3\\pi}{2}\\right)$, cả $\\sin\\alpha$ và $\\cos\\alpha$ đều âm nên tích $\\sin 2\\alpha = 2\\sin\\alpha\\cos\\alpha$ mang dấu dương.',
        teacherAnalysis: 'Xác định $\\sin\\alpha < 0$ -> Tính $\\sin\\alpha = -\\frac{4}{5}$ -> Tính $\\sin 2\\alpha = \\frac{24}{25}$ -> Cộng với $\\sin\\alpha$ được $A = \\frac{4}{25}$.',
        points: 0.75,
      },
      {
        id: 'd7-p4-q4',
        part: 'part4',
        number: 22,
        topic: 'Tứ phân vị của mẫu số liệu ghép nhóm',
        problemStatement:
          'Bảng sau đây thống kê điểm khảo sát môn Toán của $40$ học sinh (thang điểm $10$):\n$$\\begin{array}{|l|c|c|c|c|c|}\\hline \\text{Điểm số} & [0; 2) & [2; 4) & [4; 6) & [6; 8) & [8; 10] \\\\ \\hline \\text{Số học sinh} & 2 & 6 & 10 & 16 & 6 \\\\ \\hline \\end{array}$$\nTính tứ phân vị thứ ba ($Q_3$) của mẫu số liệu ghép nhóm trên.',
        conclusionTarget: 'Tính giá trị tứ phân vị thứ ba $Q_3$.',
        steps: [
          {
            id: 'd7-p4-q4-s1',
            originalIndex: 1,
            roleDescription: 'Xác định cỡ mẫu và vị trí tứ phân vị thứ ba',
            content:
              'Tổng số học sinh là $n = 40$. Tứ phân vị thứ ba $Q_3$ ứng với vị trí thứ $\\frac{3n}{4} = \\frac{3 \\cdot 40}{4} = 30$.',
          },
          {
            id: 'd7-p4-q4-s2',
            originalIndex: 2,
            roleDescription: 'Lập tần số tích lũy và xác định nhóm chứa Q₃',
            content:
              'Cộng dồn tần số các nhóm: $2;\\ 8;\\ 18;\\ 34;\\ 40$. Do $18 < 30 \\le 34$ nên giá trị thứ $30$ thuộc nhóm $[6; 8)$.',
          },
          {
            id: 'd7-p4-q4-s3',
            originalIndex: 3,
            roleDescription: 'Xác định các đại lượng trong công thức Q₃',
            content:
              'Nhóm $[6; 8)$ chứa $Q_3$ có đầu mút trái $u_m = 6$, tần số tích lũy của nhóm liền trước $C = 18$, tần số của nhóm $n_m = 16$ và độ dài nhóm $u_{m+1} - u_m = 2$.',
          },
          {
            id: 'd7-p4-q4-s4',
            originalIndex: 4,
            roleDescription: 'Thay số vào công thức tính Q₃ và kết luận',
            content:
              'Áp dụng công thức: $Q_3 = u_m + \\frac{\\frac{3n}{4} - C}{n_m} \\cdot (u_{m+1} - u_m) = 6 + \\frac{30 - 18}{16} \\cdot 2 = 6 + \\frac{12}{8} = 7,5$.',
          },
        ],
        pedagogicalTip: 'Công thức tính tứ phân vị thứ ba của mẫu số liệu ghép nhóm: $Q_3 = u_m + \\frac{\\frac{3n}{4} - C}{n_m} \\cdot (u_{m+1} - u_m)$.',
        teacherAnalysis: 'Tính $\\frac{3n}{4} = 30$ -> Tìm nhóm $[6; 8)$ chứa $Q_3$ -> Xác định $u_m = 6, C = 18, n_m = 16, u_{m+1} - u_m = 2$ -> Tính $Q_3 = 7,5$.',
        points: 0.75,
      },
    ],
  },
  // ============================================================================
  // ĐỀ 08: ĐỀ KHẢO SÁT TOÁN 11 — TƯƠNG TỰ ĐỀ 03
  // ============================================================================
  {
    id: 'de-08',
    title: 'đề ôn gk1 08',
    subtitle: 'Lượng Giác, Dãy Số - Cấp Số Cộng - Cấp Số Nhân & Mẫu Số Liệu Ghép Nhóm (Đề tương tự Đề 03)',
    grade: 11,
    durationMinutes: 90,
    totalPoints: 10,
    description:
      'Đề khảo sát đánh giá năng lực môn Toán lớp 11 chuẩn cấu trúc 4 phần (22 câu hỏi, tương tự Đề 03): Góc và công thức lượng giác, Hàm số & Phương trình lượng giác, Dãy số - Cấp số cộng - Cấp số nhân, và Mẫu số liệu ghép nhóm.',
    part1: [
      {
        id: 'd8-p1-q1',
        part: 'part1',
        number: 1,
        topic: 'Đổi số đo góc lượng giác',
        prompt: 'Đổi số đo góc lượng giác $300^\\circ$ sang radian.',
        options: [
          { key: 'A', content: '$\\frac{4\\pi}{3}$' },
          { key: 'B', content: '$\\frac{5\\pi}{4}$' },
          { key: 'C', content: '$\\frac{5\\pi}{3}$' },
          { key: 'D', content: '$\\frac{7\\pi}{6}$' },
        ],
        correctAnswer: 'C',
        explanation:
          'Ta có $300^\\circ = 300 \\cdot \\frac{\\pi}{180} = \\frac{5\\pi}{3}$ (rad).',
        pedagogicalTip: 'Công thức đổi từ độ sang radian: $\\alpha = a^\\circ \\cdot \\frac{\\pi}{180^\\circ}$.',
        points: 0.25,
      },
      {
        id: 'd8-p1-q2',
        part: 'part1',
        number: 2,
        topic: 'Hệ thức lượng giác cơ bản',
        prompt: 'Trong các hệ thức lượng giác sau, hệ thức nào đúng với mọi $\\alpha$ làm cho biểu thức có nghĩa?',
        options: [
          { key: 'A', content: '$\\sin^2\\alpha - \\cos^2\\alpha = 1$' },
          { key: 'B', content: '$1 + \\tan^2\\alpha = \\frac{1}{\\cos^2\\alpha}$' },
          { key: 'C', content: '$\\tan\\alpha \\cdot \\cot\\alpha = -1$' },
          { key: 'D', content: '$1 + \\cot^2\\alpha = \\frac{1}{\\cos^2\\alpha}$' },
        ],
        correctAnswer: 'B',
        explanation:
          'Hệ thức cơ bản trong lượng giác là $1 + \\tan^2\\alpha = \\frac{1}{\\cos^2\\alpha}$ với mọi $\\alpha \\neq \\frac{\\pi}{2} + k\\pi\\ (k \\in \\mathbb{Z})$.',
        pedagogicalTip: 'Ghi nhớ hai hệ thức đi kèm: $1 + \\tan^2\\alpha = \\frac{1}{\\cos^2\\alpha}$ và $1 + \\cot^2\\alpha = \\frac{1}{\\sin^2\\alpha}$.',
        points: 0.25,
      },
      {
        id: 'd8-p1-q3',
        part: 'part1',
        number: 3,
        topic: 'Giá trị lượng giác của một góc',
        prompt: 'Cho $\\cos\\alpha = -\\frac{12}{13}$ và $\\pi < \\alpha < \\frac{3\\pi}{2}$. Tính giá trị của $\\sin\\alpha$.',
        options: [
          { key: 'A', content: '$\\frac{5}{13}$' },
          { key: 'B', content: '$-\\frac{5}{13}$' },
          { key: 'C', content: '$-\\frac{25}{169}$' },
          { key: 'D', content: '$\\frac{12}{5}$' },
        ],
        correctAnswer: 'B',
        explanation:
          'Ta có $\\sin^2\\alpha = 1 - \\cos^2\\alpha = 1 - \\left(-\\frac{12}{13}\\right)^2 = \\frac{25}{169}$. Do $\\pi < \\alpha < \\frac{3\\pi}{2}$ (góc phần tư thứ III) nên $\\sin\\alpha < 0$, suy ra $\\sin\\alpha = -\\frac{5}{13}$.',
        pedagogicalTip: 'Khi $\\pi < \\alpha < \\frac{3\\pi}{2}$, điểm biểu diễn thuộc góc phần tư thứ III nên $\\sin\\alpha < 0$ và $\\cos\\alpha < 0$.',
        points: 0.25,
      },
      {
        id: 'd8-p1-q4',
        part: 'part1',
        number: 4,
        topic: 'Tập xác định của hàm số lượng giác',
        prompt: 'Tập xác định của hàm số $y = \\sin x$ là:',
        options: [
          { key: 'A', content: '$\\mathbb{R}$' },
          { key: 'B', content: '$[-1; 1]$' },
          { key: 'C', content: '$\\mathbb{R} \\setminus \\left\\{\\frac{\\pi}{2} + k\\pi, k \\in \\mathbb{Z}\\right\\}$' },
          { key: 'D', content: '$\\mathbb{R} \\setminus \\{k\\pi, k \\in \\mathbb{Z}\\}$' },
        ],
        correctAnswer: 'A',
        explanation:
          'Hàm số $y = \\sin x$ xác định với mọi $x \\in \\mathbb{R}$. Vậy tập xác định của hàm số là $D = \\mathbb{R}$.',
        pedagogicalTip: 'Hai hàm số $y = \\sin x$ và $y = \\cos x$ đều có tập xác định là $D = \\mathbb{R}$ và tập giá trị là $T = [-1; 1]$.',
        points: 0.25,
      },
      {
        id: 'd8-p1-q5',
        part: 'part1',
        number: 5,
        topic: 'Tính tăng, giảm của dãy số',
        prompt: 'Cho dãy số $(u_n)$ với $u_n = -4n + 7$. Khẳng định nào sau đây là đúng?',
        options: [
          { key: 'A', content: '$(u_n)$ là dãy số tăng.' },
          { key: 'B', content: '$(u_n)$ là dãy số giảm.' },
          { key: 'C', content: '$(u_n)$ không tăng, không giảm.' },
          { key: 'D', content: '$(u_n)$ là dãy số không đổi.' },
        ],
        correctAnswer: 'B',
        explanation:
          'Xét hiệu $u_{n+1} - u_n = [-4(n + 1) + 7] - (-4n + 7) = -4 < 0$ với mọi $n \\ge 1$. Do đó dãy số $(u_n)$ là dãy số giảm.',
        pedagogicalTip: 'Dãy số bậc nhất $u_n = an + b$ là dãy số tăng khi $a > 0$ và là dãy số giảm khi $a < 0$.',
        points: 0.25,
      },
      {
        id: 'd8-p1-q6',
        part: 'part1',
        number: 6,
        topic: 'Cấp số cộng',
        prompt: 'Cho cấp số cộng $(u_n)$ có số hạng đầu $u_1 = 8$ và công sai $d = -5$. Số hạng thứ hai $u_2$ bằng:',
        options: [
          { key: 'A', content: '$-40$' },
          { key: 'B', content: '$13$' },
          { key: 'C', content: '$3$' },
          { key: 'D', content: '$-3$' },
        ],
        correctAnswer: 'C',
        explanation:
          'Ta có $u_2 = u_1 + d = 8 + (-5) = 3$.',
        pedagogicalTip: 'Số hạng thứ hai của cấp số cộng bằng số hạng đầu cộng với công sai: $u_2 = u_1 + d$.',
        points: 0.25,
      },
      {
        id: 'd8-p1-q7',
        part: 'part1',
        number: 7,
        topic: 'Số trung bình của mẫu số liệu ghép nhóm',
        prompt:
          'Khảo sát thời gian tự học (giờ/tuần) của $40$ học sinh lớp 11B, ta có bảng số liệu ghép nhóm sau:\n$$\\begin{array}{|l|c|c|c|c|c|}\\hline \\text{Thời gian} & [0; 4) & [4; 8) & [8; 12) & [12; 16) & [16; 20) \\\\ \\hline \\text{Số học sinh} & 4 & 12 & 14 & 6 & 4 \\\\ \\hline \\end{array}$$\nSố trung bình của mẫu số liệu là:',
        options: [
          { key: 'A', content: '$9,4$' },
          { key: 'B', content: '$9,2$' },
          { key: 'C', content: '$10,0$' },
          { key: 'D', content: '$8,6$' },
        ],
        correctAnswer: 'A',
        explanation:
          'Giá trị đại diện của các nhóm lần lượt là $x_1 = 2,\\ x_2 = 6,\\ x_3 = 10,\\ x_4 = 14,\\ x_5 = 18$. Số trung bình của mẫu số liệu là $\\bar{x} = \\frac{4 \\cdot 2 + 12 \\cdot 6 + 14 \\cdot 10 + 6 \\cdot 14 + 4 \\cdot 18}{40} = \\frac{376}{40} = 9,4$.',
        pedagogicalTip: 'Tính giá trị đại diện $x_i = \\frac{a_i + a_{i+1}}{2}$ của từng nhóm trước khi áp dụng công thức số trung bình.',
        points: 0.25,
      },
      {
        id: 'd8-p1-q8',
        part: 'part1',
        number: 8,
        topic: 'Trung vị của mẫu số liệu ghép nhóm',
        prompt:
          'Khảo sát số tiền chi tiêu trong một ngày (nghìn đồng) của $50$ học sinh, ta có bảng số liệu ghép nhóm sau:\n$$\\begin{array}{|l|c|c|c|c|c|}\\hline \\text{Số tiền} & [10; 20) & [20; 30) & [30; 40) & [40; 50) & [50; 60) \\\\ \\hline \\text{Số học sinh} & 7 & 12 & 16 & 10 & 5 \\\\ \\hline \\end{array}$$\nTrung vị của mẫu số liệu là:',
        options: [
          { key: 'A', content: '$31,25$' },
          { key: 'B', content: '$35,0$' },
          { key: 'C', content: '$32,5$' },
          { key: 'D', content: '$33,75$' },
        ],
        correctAnswer: 'D',
        explanation:
          'Cỡ mẫu $n = 50 \\Rightarrow \\frac{n}{2} = 25$. Nhóm chứa trung vị là $[30; 40)$ vì có tần số tích lũy $7 + 12 + 16 = 35 \\ge 25$. Ta có $u_3 = 30,\\ u_4 = 40,\\ n_3 = 16,\\ C = 7 + 12 = 19$. Trung vị $M_e = 30 + \\frac{25 - 19}{16} \\cdot (40 - 30) = 33,75$.',
        pedagogicalTip: 'Công thức trung vị của mẫu số liệu ghép nhóm: $M_e = u_m + \\frac{\\frac{n}{2} - C}{n_m} \\cdot (u_{m+1} - u_m)$.',
        points: 0.25,
      },
      {
        id: 'd8-p1-q9',
        part: 'part1',
        number: 9,
        topic: 'Tập giá trị của hàm số lượng giác',
        prompt: 'Tập giá trị của hàm số $y = 4\\sin x$ là:',
        options: [
          { key: 'A', content: '$[-4; 4]$' },
          { key: 'B', content: '$[-1; 1]$' },
          { key: 'C', content: '$(-4; 4)$' },
          { key: 'D', content: '$[0; 4]$' },
        ],
        correctAnswer: 'A',
        explanation:
          'Ta có $-1 \\le \\sin x \\le 1$ với mọi $x \\in \\mathbb{R}$, suy ra $-4 \\le 4\\sin x \\le 4$. Vậy tập giá trị của hàm số là $[-4; 4]$.',
        pedagogicalTip: 'Vì $\\sin x$ đạt cả hai giá trị biên $-1$ và $1$ nên tập giá trị là đoạn đóng $[-4; 4]$.',
        points: 0.25,
      },
      {
        id: 'd8-p1-q10',
        part: 'part1',
        number: 10,
        topic: 'Phương trình lượng giác cơ bản',
        prompt: 'Nghiệm của phương trình $\\cot x = 1$ là:',
        options: [
          { key: 'A', content: '$x = \\frac{\\pi}{2} + k\\pi\\ (k \\in \\mathbb{Z})$' },
          { key: 'B', content: '$x = -\\frac{\\pi}{4} + k\\pi\\ (k \\in \\mathbb{Z})$' },
          { key: 'C', content: '$x = \\frac{\\pi}{4} + k2\\pi\\ (k \\in \\mathbb{Z})$' },
          { key: 'D', content: '$x = \\frac{\\pi}{4} + k\\pi\\ (k \\in \\mathbb{Z})$' },
        ],
        correctAnswer: 'D',
        explanation:
          'Phương trình $\\cot x = 1 \\Leftrightarrow \\cot x = \\cot\\frac{\\pi}{4} \\Leftrightarrow x = \\frac{\\pi}{4} + k\\pi\\ (k \\in \\mathbb{Z})$.',
        pedagogicalTip: 'Chu kỳ của hàm số $y = \\cot x$ là $\\pi$, nên họ nghiệm của phương trình $\\cot x = \\cot\\alpha$ có đuôi $+ k\\pi$.',
        points: 0.25,
      },
      {
        id: 'd8-p1-q11',
        part: 'part1',
        number: 11,
        topic: 'Tổng n số hạng đầu của cấp số cộng',
        prompt: 'Cho cấp số cộng $(u_n)$ có $u_1 = 2$ và công sai $d = 5$. Tổng của $40$ số hạng đầu tiên là:',
        options: [
          { key: 'A', content: '$197$' },
          { key: 'B', content: '$3980$' },
          { key: 'C', content: '$7960$' },
          { key: 'D', content: '$3880$' },
        ],
        correctAnswer: 'B',
        explanation:
          'Áp dụng công thức tính tổng $40$ số hạng đầu tiên của cấp số cộng: $S_{40} = \\frac{40 \\cdot [2u_1 + 39d]}{2} = 20 \\cdot [2 \\cdot 2 + 39 \\cdot 5] = 20 \\cdot 199 = 3980$.',
        pedagogicalTip: 'Công thức tổng $n$ số hạng đầu của cấp số cộng: $S_n = \\frac{n[2u_1 + (n - 1)d]}{2}$.',
        points: 0.25,
      },
      {
        id: 'd8-p1-q12',
        part: 'part1',
        number: 12,
        topic: 'Cấp số nhân',
        prompt: 'Cho cấp số nhân $(u_n)$ có số hạng đầu $u_1 = 2$ và công bội $q = 3$. Số hạng thứ năm $u_5$ bằng:',
        options: [
          { key: 'A', content: '$162$' },
          { key: 'B', content: '$54$' },
          { key: 'C', content: '$486$' },
          { key: 'D', content: '$30$' },
        ],
        correctAnswer: 'A',
        explanation:
          'Ta có $u_5 = u_1 \\cdot q^4 = 2 \\cdot 3^4 = 2 \\cdot 81 = 162$.',
        pedagogicalTip: 'Áp dụng công thức số hạng tổng quát của cấp số nhân: $u_n = u_1 \\cdot q^{n-1}$.',
        points: 0.25,
      },
    ],
    part2: [
      {
        id: 'd8-p2-q1',
        part: 'part2',
        number: 13,
        topic: 'Hàm số lượng giác',
        prompt: 'Cho hàm số lượng giác $y = 3\\sin 2x - 1$. Xét tính đúng sai của các khẳng định sau:',
        statements: [
          {
            id: 'a',
            label: 'a',
            statement: 'Tập xác định của hàm số là $\\mathbb{R}$.',
            isCorrect: true,
            explanation: 'Đúng. Hàm số $y = 3\\sin 2x - 1$ xác định với mọi $x \\in \\mathbb{R}$ nên tập xác định là $D = \\mathbb{R}$.',
          },
          {
            id: 'b',
            label: 'b',
            statement: 'Giá trị lớn nhất của hàm số là $2$.',
            isCorrect: true,
            explanation: 'Đúng. Ta có $-1 \\le \\sin 2x \\le 1 \\Rightarrow -3 \\le 3\\sin 2x \\le 3 \\Rightarrow -4 \\le 3\\sin 2x - 1 \\le 2$. Giá trị lớn nhất của hàm số là $2$.',
          },
          {
            id: 'c',
            label: 'c',
            statement: 'Đồ thị hàm số đi qua điểm $N\\left(\\frac{\\pi}{4}; 2\\right)$.',
            isCorrect: true,
            explanation: 'Đúng. Thay $x = \\frac{\\pi}{4}$ vào hàm số ta được $y = 3\\sin\\left(2 \\cdot \\frac{\\pi}{4}\\right) - 1 = 3\\sin\\frac{\\pi}{2} - 1 = 3 \\cdot 1 - 1 = 2$. Do đó đồ thị đi qua điểm $N\\left(\\frac{\\pi}{4}; 2\\right)$.',
          },
          {
            id: 'd',
            label: 'd',
            statement: 'Hàm số đã cho là hàm số lẻ.',
            isCorrect: false,
            explanation: 'Sai. Ta có $f(-x) = 3\\sin(-2x) - 1 = -3\\sin 2x - 1 \\neq -f(x) = -3\\sin 2x + 1$. Do đó hàm số không phải là hàm số lẻ.',
          },
        ],
        pedagogicalTip: 'Hàm số $y = a\\sin bx + c$ với $c \\neq 0$ không phải là hàm số lẻ vì $f(0) = c \\neq 0$.',
      },
      {
        id: 'd8-p2-q2',
        part: 'part2',
        number: 14,
        topic: 'Ứng dụng thực tế của cấp số cộng',
        prompt:
          'Để trang trí sân khấu, người ta xếp các khối hộp thành một hình tháp: hàng trên cùng có $5$ khối, hàng ngay dưới có $9$ khối, hàng dưới tiếp theo có $13$ khối,... và cứ tiếp tục như vậy. Biết tháp có tất cả $12$ hàng. Xét tính đúng sai của các khẳng định sau:',
        statements: [
          {
            id: 'a',
            label: 'a',
            statement:
              'Số khối hộp ở mỗi hàng tính từ trên xuống lập thành một cấp số cộng với số hạng đầu $u_1 = 5$ và công sai $d = 4$.',
            isCorrect: true,
            explanation:
              'Đúng. Số khối hộp ở các hàng lần lượt là $5,\\ 9,\\ 13,\\dots$ Đây là cấp số cộng có số hạng đầu $u_1 = 5$ và công sai $d = 9 - 5 = 4$.',
          },
          {
            id: 'b',
            label: 'b',
            statement: 'Hàng thứ $5$ của tháp có $25$ khối hộp.',
            isCorrect: false,
            explanation:
              'Sai. Số khối hộp ở hàng thứ $5$ là $u_5 = u_1 + 4d = 5 + 4 \\cdot 4 = 21$ (khối hộp).',
          },
          {
            id: 'c',
            label: 'c',
            statement: 'Hàng dưới cùng có $49$ khối hộp.',
            isCorrect: true,
            explanation:
              'Đúng. Hàng dưới cùng là hàng thứ $12$, số khối hộp là $u_{12} = u_1 + 11d = 5 + 11 \\cdot 4 = 49$ (khối hộp).',
          },
          {
            id: 'd',
            label: 'd',
            statement: 'Tổng số khối hộp cần dùng để xếp toàn bộ tháp là $330$ khối.',
            isCorrect: false,
            explanation:
              'Sai. Tổng số khối hộp cần dùng để xếp toàn bộ tháp là $S_{12} = \\frac{12 \\cdot (u_1 + u_{12})}{2} = 6 \\cdot (5 + 49) = 324$ (khối hộp).',
          },
        ],
        pedagogicalTip: 'Chú ý công thức số hạng thứ $n$ là $u_n = u_1 + (n - 1)d$ (hàng thứ $5$ ứng với $u_1 + 4d = 21$, tránh nhầm thành $u_1 + 5d = 25$).',
      },
    ],
    part3: [
      {
        id: 'd8-p3-q1',
        part: 'part3',
        number: 15,
        topic: 'Phương trình lượng giác',
        prompt:
          'Tìm nghiệm âm lớn nhất của phương trình lượng giác $2\\sin x + \\sqrt{3} = 0$, biết nghiệm có dạng $-\\frac{a\\pi}{b}$ với $a, b$ là các số nguyên dương và phân số $\\frac{a}{b}$ tối giản. Tính $3a + b$.',
        acceptableAnswers: ['6'],
        explanation:
          'Ta có $2\\sin x + \\sqrt{3} = 0 \\Leftrightarrow \\sin x = -\\frac{\\sqrt{3}}{2} \\Leftrightarrow \\left[\\begin{array}{l} x = -\\frac{\\pi}{3} + k2\\pi \\\\ x = \\frac{4\\pi}{3} + k2\\pi \\end{array}\\right. (k \\in \\mathbb{Z})$. Nghiệm âm lớn nhất của phương trình là $x = -\\frac{\\pi}{3}$, ứng với $a = 1,\\ b = 3$. Suy ra $3a + b = 3 \\cdot 1 + 3 = 6$.',
        pedagogicalTip: 'Xét các giá trị nguyên của $k$ để tìm nghiệm âm gần $0$ nhất trên đường tròn lượng giác.',
        points: 0.5,
      },
      {
        id: 'd8-p3-q2',
        part: 'part3',
        number: 16,
        topic: 'Ứng dụng thực tế của hàm số lượng giác',
        prompt:
          'Độ sâu $h$ (mét) của mực nước ở một cảng biển vào thời điểm $t$ (giờ) sau khi thủy triều lên lần đầu tiên trong ngày được tính xấp xỉ bởi công thức: $h = 6 + 2,5\\sin\\left(\\frac{\\pi}{6}t\\right)$. Tìm độ sâu lớn nhất của mực nước biển.',
        acceptableAnswers: ['8,5', '8.5'],
        unit: 'mét',
        explanation:
          'Vì $-1 \\le \\sin\\left(\\frac{\\pi}{6}t\\right) \\le 1$ nên $-2,5 \\le 2,5\\sin\\left(\\frac{\\pi}{6}t\\right) \\le 2,5 \\Rightarrow 3,5 \\le 6 + 2,5\\sin\\left(\\frac{\\pi}{6}t\\right) \\le 8,5$. Do đó độ sâu lớn nhất của mực nước biển là $8,5$ mét.',
        pedagogicalTip: 'Giá trị lớn nhất của biểu thức $A + B\\sin(u)$ (với $B > 0$) bằng $A + B$.',
        points: 0.5,
      },
      {
        id: 'd8-p3-q3',
        part: 'part3',
        number: 17,
        topic: 'Cấp số cộng',
        prompt:
          'Cho cấp số cộng $(u_n)$ có số hạng đầu $u_1 = 6$ và công sai $d = 4$. Số $98$ là số hạng thứ bao nhiêu của cấp số cộng này?',
        acceptableAnswers: ['24'],
        explanation:
          'Áp dụng công thức số hạng tổng quát $u_n = u_1 + (n - 1)d$: $98 = 6 + (n - 1) \\cdot 4 \\Leftrightarrow 4(n - 1) = 92 \\Leftrightarrow n - 1 = 23 \\Leftrightarrow n = 24$. Vậy số $98$ là số hạng thứ $24$.',
        pedagogicalTip: 'Từ $u_n = u_1 + (n - 1)d$, ta tính nhanh thứ tự số hạng theo công thức $n = \\frac{u_n - u_1}{d} + 1$.',
        points: 0.5,
      },
      {
        id: 'd8-p3-q4',
        part: 'part3',
        number: 18,
        topic: 'Mốt của mẫu số liệu ghép nhóm',
        prompt:
          'Khảo sát điểm thi môn Toán của $50$ học sinh, thu được bảng phân bố tần số ghép nhóm sau:\n$$\\begin{array}{|l|c|c|c|c|}\\hline \\text{Điểm số} & [2; 4) & [4; 6) & [6; 8) & [8; 10] \\\\ \\hline \\text{Số học sinh} & 6 & 14 & 20 & 10 \\\\ \\hline \\end{array}$$\nTính giá trị Mốt của mẫu số liệu ghép nhóm trên (viết kết quả dưới dạng số thập phân).',
        acceptableAnswers: ['6,75', '6.75'],
        explanation:
          'Nhóm chứa Mốt là nhóm $[6; 8)$ vì có tần số lớn nhất là $n_3 = 20$. Ta có $u_3 = 6,\\ u_4 - u_3 = 2,\\ n_2 = 14,\\ n_4 = 10$. Mốt $M_o = 6 + \\frac{20 - 14}{(20 - 14) + (20 - 10)} \\cdot 2 = 6 + \\frac{6}{16} \\cdot 2 = 6 + 0,75 = 6,75$.',
        pedagogicalTip: 'Công thức mốt của mẫu số liệu ghép nhóm: $M_o = u_m + \\frac{n_m - n_{m-1}}{(n_m - n_{m-1}) + (n_m - n_{m+1})} \\cdot (u_{m+1} - u_m)$.',
        points: 0.5,
      },
    ],
    part4: [
      {
        id: 'd8-p4-q1',
        part: 'part4',
        number: 19,
        topic: 'Tổng các nghiệm của phương trình lượng giác',
        problemStatement:
          'Tính tổng các nghiệm phân biệt của phương trình $\\cot x = \\sqrt{3}$ trên khoảng $(0; 3\\pi)$ (kết quả chia cho $\\pi$).',
        conclusionTarget: 'Xác định các nghiệm thuộc $(0; 3\\pi)$ và tính tổng các nghiệm chia cho $\\pi$.',
        steps: [
          {
            id: 'd8-p4-q1-s1',
            originalIndex: 1,
            roleDescription: 'Giải phương trình tìm họ nghiệm tổng quát',
            content:
              'Phương trình $\\cot x = \\sqrt{3} \\Leftrightarrow x = \\frac{\\pi}{6} + k\\pi\\ (k \\in \\mathbb{Z})$.',
          },
          {
            id: 'd8-p4-q1-s2',
            originalIndex: 2,
            roleDescription: 'Tìm các giá trị nguyên k ứng với khoảng (0; 3π)',
            content:
              'Vì $x \\in (0; 3\\pi)$ nên $0 < \\frac{\\pi}{6} + k\\pi < 3\\pi \\Leftrightarrow -\\frac{1}{6} < k < \\frac{17}{6}$, kết hợp $k \\in \\mathbb{Z}$ suy ra $k \\in \\{0; 1; 2\\}$.',
          },
          {
            id: 'd8-p4-q1-s3',
            originalIndex: 3,
            roleDescription: 'Liệt kê các nghiệm phân biệt trên (0; 3π)',
            content:
              'Ứng với $k \\in \\{0; 1; 2\\}$, các nghiệm của phương trình trên $(0; 3\\pi)$ là $x_1 = \\frac{\\pi}{6},\\ x_2 = \\frac{7\\pi}{6},\\ x_3 = \\frac{13\\pi}{6}$.',
          },
          {
            id: 'd8-p4-q1-s4',
            originalIndex: 4,
            roleDescription: 'Tính tổng các nghiệm và chia cho π',
            content:
              'Tổng các nghiệm là $S = \\frac{\\pi}{6} + \\frac{7\\pi}{6} + \\frac{13\\pi}{6} = \\frac{21\\pi}{6} = 3,5\\pi$. Vậy kết quả chia cho $\\pi$ bằng $3,5$.',
          },
        ],
        pedagogicalTip: 'Đặt bất phương trình $0 < \\frac{\\pi}{6} + k\\pi < 3\\pi$ và rút gọn $\\pi$ ở cả ba vế để tìm chính xác các giá trị nguyên $k$.',
        teacherAnalysis: 'Giải $\\cot x = \\sqrt{3} \\Leftrightarrow x = \\frac{\\pi}{6} + k\\pi$ -> Chặn $0 < x < 3\\pi$ tìm $k \\in \\{0; 1; 2\\}$ -> Cộng 3 nghiệm được $3,5\\pi$.',
        points: 0.75,
      },
      {
        id: 'd8-p4-q2',
        part: 'part4',
        number: 20,
        topic: 'Bài toán thực tế cấp số nhân',
        problemStatement:
          'Một bệnh nhân được chỉ định uống một loại thuốc đặc trị. Mỗi liều thuốc chứa $30\\text{ mg}$ hoạt chất và được uống định kỳ cách nhau đúng $24$ giờ. Tuy nhiên, sau mỗi $24$ giờ, thận của bệnh nhân sẽ đào thải $20\\%$ lượng hoạt chất có trong máu (nghĩa là chỉ còn lại $80\\%$). Ngay sau khi bệnh nhân uống liều thứ $5$, tổng lượng hoạt chất của thuốc còn lại trong cơ thể là bao nhiêu? (Kết quả làm tròn đến hàng đơn vị).',
        conclusionTarget: 'Tính tổng lượng hoạt chất còn lại trong cơ thể ngay sau liều thứ $5$ (làm tròn đến hàng đơn vị).',
        steps: [
          {
            id: 'd8-p4-q2-s1',
            originalIndex: 1,
            roleDescription: 'Xác định quy luật lượng thuốc còn lại sau mỗi 24 giờ',
            content:
              'Mỗi liều thuốc chứa $u_1 = 30\\text{ mg}$ hoạt chất và sau mỗi $24$ giờ lượng hoạt chất còn lại trong máu bằng $80\\%$ lượng trước đó (tức nhân với $q = 0,8$).',
          },
          {
            id: 'd8-p4-q2-s2',
            originalIndex: 2,
            roleDescription: 'Biểu diễn lượng thuốc bằng tổng của cấp số nhân',
            content:
              'Ngay sau khi uống liều thứ $5$, tổng lượng hoạt chất của cả $5$ liều còn lại trong cơ thể lập thành tổng của một cấp số nhân gồm $5$ số hạng với $u_1 = 30$ và công bội $q = 0,8$.',
          },
          {
            id: 'd8-p4-q2-s3',
            originalIndex: 3,
            roleDescription: 'Áp dụng công thức tổng 5 số hạng đầu của cấp số nhân',
            content:
              'Tổng lượng hoạt chất ngay sau khi uống liều thứ $5$ là: $S_5 = 30 \\cdot \\frac{1 - 0,8^5}{1 - 0,8} = 150 \\cdot (1 - 0,8^5)\\text{ (mg)}$.',
          },
          {
            id: 'd8-p4-q2-s4',
            originalIndex: 4,
            roleDescription: 'Tính giá trị xấp xỉ và làm tròn kết quả',
            content:
              'Ta tính được $S_5 = 150 \\cdot (1 - 0,32768) = 100,848\\text{ mg}$. Làm tròn kết quả đến hàng đơn vị ta được $101\\text{ mg}$.',
          },
        ],
        pedagogicalTip: 'Đào thải $20\\%$ có nghĩa là tỷ lệ hoạt chất giữ lại sau mỗi $24$ giờ là công bội $q = 1 - 0,20 = 0,8$.',
        teacherAnalysis: 'Xác định cấp số nhân $u_1 = 30, q = 0,8$ -> Tính tổng $S_5 = 30 \\cdot \\frac{1 - 0,8^5}{1 - 0,8}$ -> Làm tròn được $101\\text{ mg}$.',
        points: 0.75,
      },
      {
        id: 'd8-p4-q3',
        part: 'part4',
        number: 21,
        topic: 'Tính giá trị biểu thức lượng giác',
        problemStatement:
          'Cho $\\sin x = -\\frac{3}{5}$ với $\\pi < x < \\frac{3\\pi}{2}$. Tính giá trị biểu thức $B = \\sin 2x + \\cos x$.',
        conclusionTarget: 'Tính giá trị của biểu thức $B = \\sin 2x + \\cos x$.',
        steps: [
          {
            id: 'd8-p4-q3-s1',
            originalIndex: 1,
            roleDescription: 'Xác định dấu của cos x',
            content:
              'Vì $\\pi < x < \\frac{3\\pi}{2}$ (góc thuộc góc phần tư thứ III) nên $\\cos x < 0$.',
          },
          {
            id: 'd8-p4-q3-s2',
            originalIndex: 2,
            roleDescription: 'Tính giá trị của cos x',
            content:
              'Ta có $\\cos x = -\\sqrt{1 - \\sin^2 x} = -\\sqrt{1 - \\left(-\\frac{3}{5}\\right)^2} = -\\frac{4}{5}$.',
          },
          {
            id: 'd8-p4-q3-s3',
            originalIndex: 3,
            roleDescription: 'Áp dụng công thức nhân đôi tính sin 2x',
            content:
              'Khi đó $\\sin 2x = 2\\sin x\\cos x = 2 \\cdot \\left(-\\frac{3}{5}\\right) \\cdot \\left(-\\frac{4}{5}\\right) = \\frac{24}{25}$.',
          },
          {
            id: 'd8-p4-q3-s4',
            originalIndex: 4,
            roleDescription: 'Thay vào biểu thức B và kết luận',
            content:
              'Suy ra $B = \\sin 2x + \\cos x = \\frac{24}{25} - \\frac{4}{5} = \\frac{4}{25} = 0,16$.',
          },
        ],
        pedagogicalTip: 'Chú ý dấu của $\\cos x$ trên khoảng $\\left(\\pi; \\frac{3\\pi}{2}\\right)$ là âm trước khi thay vào công thức $\\sin 2x = 2\\sin x\\cos x$.',
        teacherAnalysis: 'Xác định $\\cos x < 0$ -> Tính $\\cos x = -\\frac{4}{5}$ -> Tính $\\sin 2x = \\frac{24}{25}$ -> Suy ra $B = \\frac{4}{25} = 0,16$.',
        points: 0.75,
      },
      {
        id: 'd8-p4-q4',
        part: 'part4',
        number: 22,
        topic: 'Tứ phân vị của mẫu số liệu ghép nhóm',
        problemStatement:
          'Cho bảng sau thống kê thời gian ôn thi (giờ) của $40$ học sinh lớp 11C như sau:\n$$\\begin{array}{|l|c|c|c|c|c|}\\hline \\text{Thời gian (giờ)} & [10; 15) & [15; 20) & [20; 25) & [25; 30) & [30; 35) \\\\ \\hline \\text{Số học sinh} & 4 & 12 & 14 & 6 & 4 \\\\ \\hline \\end{array}$$\nTính tứ phân vị thứ ba ($Q_3$) của mẫu số liệu trên.',
        conclusionTarget: 'Tính giá trị tứ phân vị thứ ba $Q_3$.',
        steps: [
          {
            id: 'd8-p4-q4-s1',
            originalIndex: 1,
            roleDescription: 'Xác định cỡ mẫu và vị trí tứ phân vị thứ ba',
            content:
              'Cỡ mẫu $n = 40$. Vị trí của tứ phân vị thứ ba $Q_3$ ứng với $\\frac{3n}{4} = \\frac{3 \\cdot 40}{4} = 30$.',
          },
          {
            id: 'd8-p4-q4-s2',
            originalIndex: 2,
            roleDescription: 'Xác định nhóm chứa Q₃ theo tần số tích lũy',
            content:
              'Nhóm chứa $Q_3$ là nhóm $[20; 25)$ do có tần số tích lũy $4 + 12 + 14 = 30$.',
          },
          {
            id: 'd8-p4-q4-s3',
            originalIndex: 3,
            roleDescription: 'Xác định các đại lượng trong công thức Q₃',
            content:
              'Nhóm $[20; 25)$ có đầu mút trái $u_3 = 20$, đầu mút phải $u_4 = 25$, tần số của nhóm $n_3 = 14$ và tần số tích lũy của nhóm liền trước $C = 4 + 12 = 16$.',
          },
          {
            id: 'd8-p4-q4-s4',
            originalIndex: 4,
            roleDescription: 'Thay số vào công thức tính Q₃ và kết luận',
            content:
              'Áp dụng công thức tứ phân vị thứ ba: $Q_3 = 20 + \\frac{30 - 16}{14} \\cdot (25 - 20) = 20 + 5 = 25$.',
          },
        ],
        pedagogicalTip: 'Khi $\\frac{3n}{4}$ bằng đúng tần số tích lũy của nhóm $[u_m; u_{m+1})$, giá trị $Q_3$ sẽ bằng đúng đầu mút phải $u_{m+1}$.',
        teacherAnalysis: 'Tính $\\frac{3n}{4} = 30$ -> Xác định nhóm $[20; 25)$ chứa $Q_3$ -> Xác định $u_3 = 20, C = 16, n_3 = 14, h = 5$ -> Tính $Q_3 = 25$.',
        points: 0.75,
      },
    ],
  },
];

