import { LessonTheoryContent } from './tap1Theory';

export const tap2LessonTheory: LessonTheoryContent[] = [
  // ============================================================================
  // CHƯƠNG VI. HÀM SỐ MŨ VÀ HÀM SỐ LÔGARIT
  // ============================================================================
  {
    lessonId: 'bai-18',
    chapterId: 'chuong-6',
    lessonNumber: 'Bài 18',
    lessonTitle: 'Luỹ thừa với số mũ thực',
    fullName: 'Bài 18. Luỹ thừa với số mũ thực',
    volume: 2,
    pageNumber: 4,
    keyTerms: [
      'Luỹ thừa với số mũ nguyên',
      'Căn bậc n',
      'Luỹ thừa với số mũ hữu tỉ',
      'Luỹ thừa với số mũ thực',
    ],
    objectives: [
      'Nhận biết khái niệm luỹ thừa với số mũ nguyên của một số thực khác 0; luỹ thừa với số mũ hữu tỉ và luỹ thừa với số mũ thực của một số thực dương.',
      'Giải thích các tính chất của phép tính luỹ thừa với số mũ nguyên, luỹ thừa với số mũ hữu tỉ và luỹ thừa với số mũ thực.',
      'Sử dụng tính chất của phép tính luỹ thừa trong tính toán các biểu thức số và rút gọn các biểu thức chứa biến (tính viết và tính nhẩm, tính nhanh một cách hợp lí).',
      'Tính giá trị biểu thức số có chứa phép tính luỹ thừa bằng sử dụng máy tính cầm tay.',
      'Giải quyết một số vấn đề có liên quan đến môn học khác hoặc thực tiễn gắn với phép tính luỹ thừa (ví dụ: bài toán về lãi suất, sự tăng trưởng,...).',
    ],
    theorySections: [
      {
        title: '1. Luỹ thừa với số mũ nguyên',
        points: [
          'Cho $n$ là một số nguyên dương. Ta định nghĩa: Với $a$ là số thực tuỳ ý: $a^n = \\underbrace{a \\cdot a \\cdots a}_{n \\text{ thừa số}}$.',
          'Với $a$ là số thực khác $0$: $a^0 = 1$; $a^{-n} = \\frac{1}{a^n}$.',
          'Trong biểu thức $a^m$, $a$ gọi là cơ số, $m$ gọi là số mũ.',
        ],
        note: 'Luỹ thừa với số mũ nguyên có các tính chất tương tự như luỹ thừa với số mũ nguyên dương. Không có khái niệm $0^0$ và $0^{-n}$ ($n \\in \\mathbb{N}^*$).',
      },
      {
        title: '2. Luỹ thừa với số mũ hữu tỉ',
        points: [
          '**Khái niệm căn bậc $n$**: Cho số thực $a$ và số nguyên dương $n$. Số $b$ được gọi là căn bậc $n$ của số $a$ nếu $b^n = a$.',
          'Khi $n$ là số lẻ, mỗi số thực $a$ chỉ có một căn bậc $n$ và kí hiệu là $\\sqrt[n]{a}$ (Căn bậc $1$ của số $a$ chính là $a$).',
          'Khi $n$ là số chẵn, mỗi số thực dương $a$ có đúng hai căn bậc $n$ là hai số đối nhau: giá trị dương kí hiệu là $\\sqrt[n]{a}$ (gọi là căn số học bậc $n$ của $a$), giá trị âm kí hiệu là $-\\sqrt[n]{a}$. Số $0$ có đúng một căn bậc $n$ là $0$ ($\\sqrt[n]{0} = 0$). Số âm không có căn bậc $n$ chẵn.',
          '**Tính chất của căn bậc $n$** (với $a, b \\ge 0$; $m, n, k \\in \\mathbb{N}^*$): $\\sqrt[n]{a} \\cdot \\sqrt[n]{b} = \\sqrt[n]{ab}$; $\\frac{\\sqrt[n]{a}}{\\sqrt[n]{b}} = \\sqrt[n]{\\frac{a}{b}}$ ($b > 0$); $(\\sqrt[n]{a})^m = \\sqrt[n]{a^m}$; $\\sqrt[m]{\\sqrt[n]{a}} = \\sqrt[mn]{a}$; $\\sqrt[n]{a^m} = \\sqrt[nk]{a^{mk}}$.',
          '**Định nghĩa luỹ thừa với số mũ hữu tỉ**: Cho số thực $a$ dương và số hữu tỉ $r = \\frac{m}{n}$, trong đó $m$ là một số nguyên và $n$ là số nguyên dương. Luỹ thừa của $a$ với số mũ $r$, kí hiệu là $a^r$, xác định bởi: $a^r = a^{\\frac{m}{n}} = \\sqrt[n]{a^m}$.',
        ],
        note: 'Từ định nghĩa căn bậc $n$, ta có $(\\sqrt[n]{a})^n = a$ (với mọi $a$ khi $n$ lẻ, với $a \\ge 0$ khi $n$ chẵn). Ngoài ra: $\\sqrt[n]{a^n} = a$ nếu $n$ lẻ và $\\sqrt[n]{a^n} = |a|$ nếu $n$ chẵn.',
      },
      {
        title: '3. Luỹ thừa với số mũ thực',
        points: [
          '**Khái niệm**: Cho $a$ là số thực dương và $\\alpha$ là một số vô tỉ. Xét dãy số hữu tỉ $(r_n)$ mà $\\lim_{n \\to +\\infty} r_n = \\alpha$. Khi đó, dãy số $(a^{r_n})$ có giới hạn xác định và không phụ thuộc vào dãy số hữu tỉ $(r_n)$ đã chọn. Giới hạn đó gọi là luỹ thừa của $a$ với số mũ $\\alpha$, kí hiệu là $a^\\alpha$. Vậy $a^\\alpha = \\lim_{n \\to +\\infty} a^{r_n}$.',
          '**Tính chất của phép tính luỹ thừa**: Cho $a, b$ là những số thực dương; $\\alpha, \\beta$ là những số thực tuỳ ý. Khi đó: $a^\\alpha \\cdot a^\\beta = a^{\\alpha + \\beta}$; $\\frac{a^\\alpha}{a^\\beta} = a^{\\alpha - \\beta}$; $(a^\\alpha)^\\beta = a^{\\alpha \\beta}$; $(ab)^\\alpha = a^\\alpha b^\\alpha$; $\\left(\\frac{a}{b}\\right)^\\alpha = \\frac{a^\\alpha}{b^\\alpha}$.',
          '**So sánh các luỹ thừa**: Nếu $a > 1$ thì $a^\\alpha > a^\\beta \\iff \\alpha > \\beta$. Nếu $0 < a < 1$ thì $a^\\alpha > a^\\beta \\iff \\alpha < \\beta$.',
        ],
        note: 'Công thức lãi kép: Nếu gửi số tiền gốc $P$ với lãi suất $r$ mỗi kì hạn thì sau $N$ kì hạn, số tiền cả gốc và lãi thu được là $A = P(1 + r)^N$. Nếu lãi suất năm là $r$ và ghép lãi $n$ kì mỗi năm thì sau $t$ năm ($N = nt$ kì), số tiền thu được là $A = P\\left(1 + \\frac{r}{n}\\right)^{nt}$.',
      },
    ],
    formulas: [
      {
        name: 'Luỹ thừa với số mũ nguyên âm và 0 ($a \\neq 0, n \\in \\mathbb{N}^*$)',
        latex: 'a^0 = 1, \\qquad a^{-n} = \\frac{1}{a^n}',
        description: 'Không xác định $0^0$ và $0^{-n}$.',
      },
      {
        name: 'Căn bậc $n$ của luỹ thừa bậc $n$',
        latex: '\\sqrt[n]{a^n} = \\begin{cases} a & \\text{nếu } n \\text{ lẻ} \\\\ |a| & \\text{nếu } n \\text{ chẵn} \\end{cases}',
        description: 'Tính chất khai căn bậc $n$ chuẩn SGK trang 6.',
      },
      {
        name: 'Luỹ thừa với số mũ hữu tỉ ($a > 0, m \\in \\mathbb{Z}, n \\in \\mathbb{N}^*$)',
        latex: 'a^{\\frac{m}{n}} = \\sqrt[n]{a^m} = \\left(\\sqrt[n]{a}\\right)^m',
        description: 'Đặc biệt: $a^{\\frac{1}{n}} = \\sqrt[n]{a}$ với $a > 0$.',
      },
      {
        name: 'Các tính chất của luỹ thừa với số mũ thực ($a, b > 0; \\alpha, \\beta \\in \\mathbb{R}$)',
        latex: 'a^\\alpha \\cdot a^\\beta = a^{\\alpha + \\beta}; \\quad \\frac{a^\\alpha}{a^\\beta} = a^{\\alpha - \\beta}; \\quad (a^\\alpha)^\\beta = a^{\\alpha\\beta}; \\quad (ab)^\\alpha = a^\\alpha b^\\alpha; \\quad \\left(\\frac{a}{b}\\right)^\\alpha = \\frac{a^\\alpha}{b^\\alpha}',
        description: '5 quy tắc phép tính luỹ thừa cơ bản.',
      },
      {
        name: 'Công thức lãi kép định kì',
        latex: 'A = P(1 + r)^N \\qquad \\text{hoặc} \\qquad A = P\\left(1 + \\frac{r}{n}\\right)^N',
        description: '$P$: số tiền gốc; $r$: lãi suất năm (hoặc kì); $n$: số kì tính lãi trong một năm; $N$: tổng số kì tính lãi.',
      },
    ],
  },
  {
    lessonId: 'bai-19',
    chapterId: 'chuong-6',
    lessonNumber: 'Bài 19',
    lessonTitle: 'Lôgarit',
    fullName: 'Bài 19. Lôgarit',
    volume: 2,
    pageNumber: 10,
    keyTerms: [
      'Lôgarit cơ số a',
      'Lôgarit thập phân',
      'Số e và lôgarit tự nhiên',
    ],
    objectives: [
      'Nhận biết khái niệm lôgarit cơ số a của một số thực dương.',
      'Giải thích các tính chất của phép tính lôgarit nhờ sử dụng định nghĩa hoặc các tính chất đã biết trước đó.',
      'Sử dụng tính chất của phép tính lôgarit trong tính toán các biểu thức số và rút gọn các biểu thức chứa biến (tính viết và tính nhẩm, tính nhanh một cách hợp lí).',
      'Tính giá trị (đúng hoặc gần đúng) của lôgarit bằng cách sử dụng máy tính cầm tay.',
      'Giải quyết một số vấn đề có liên quan đến môn học khác hoặc thực tiễn gắn với phép tính lôgarit (ví dụ: bài toán liên quan đến độ pH trong Hoá học,...).',
    ],
    theorySections: [
      {
        title: '1. Khái niệm lôgarit',
        points: [
          '**Định nghĩa**: Cho $a$ là một số thực dương khác $1$ và $M$ là một số thực dương. Số thực $\\alpha$ để $a^\\alpha = M$ được gọi là lôgarit cơ số $a$ của $M$ và kí hiệu là $\\log_a M$.',
          'Như vậy: $\\alpha = \\log_a M \\iff a^\\alpha = M$ ($0 < a \\neq 1, M > 0$).',
          '**Tính chất cơ bản**: Với $0 < a \\neq 1, M > 0$ và $\\alpha \\in \\mathbb{R}$ tuỳ ý, ta có: $\\log_a 1 = 0$; $\\log_a a = 1$; $a^{\\log_a M} = M$; $\\log_a a^\\alpha = \\alpha$.',
        ],
        note: 'Không có lôgarit của số âm và số $0$. Cơ số của lôgarit phải dương và khác $1$.',
      },
      {
        title: '2. Tính chất của lôgarit (Quy tắc tính lôgarit và đổi cơ số)',
        points: [
          '**Quy tắc tính lôgarit**: Giả sử $a$ là số thực dương khác $1$, $M$ và $N$ là các số thực dương, $\\alpha$ là số thực tuỳ ý. Khi đó: $\\log_a(MN) = \\log_a M + \\log_a N$ (Lôgarit của một tích); $\\log_a\\left(\\frac{M}{N}\\right) = \\log_a M - \\log_a N$ (Lôgarit của một thương); $\\log_a M^\\alpha = \\alpha \\log_a M$ (Lôgarit của một luỹ thừa).',
          '**Đổi cơ số của lôgarit**: Với mọi cơ số $a, b > 0$ khác $1$ và số thực dương $M$, ta luôn có: $\\log_a M = \\frac{\\log_b M}{\\log_b a}$.',
          '**Hệ quả công thức đổi cơ số**: Với $0 < a \\neq 1, b > 0, c > 0$: Nếu $b \\neq 1$ thì $\\log_a b \\cdot \\log_b c = \\log_a c$, đặc biệt $\\log_a b = \\frac{1}{\\log_b a}$; nếu $\\alpha \\neq 0$ thì $\\log_{a^\\alpha} b = \\frac{1}{\\alpha}\\log_a b$.',
        ],
        note: 'Từ quy tắc lôgarit của một thương và $\\log_a 1 = 0$, với $N > 0$ ta có $\\log_a \\frac{1}{N} = -\\log_a N$. Với $n \\in \\mathbb{N}^*$, $\\log_a \\sqrt[n]{M} = \\frac{1}{n}\\log_a M$.',
      },
      {
        title: '3. Lôgarit thập phân và lôgarit tự nhiên',
        points: [
          '**Lôgarit thập phân**: Lôgarit cơ số $10$ của một số dương $M$ gọi là lôgarit thập phân của $M$ và kí hiệu là $\\log M$ hoặc $\\lg M$ (thường viết là $\\log M$).',
          '**Số $e$ và lôgarit tự nhiên**: Dãy số $(u_n)$ với $u_n = \\left(1 + \\frac{1}{n}\\right)^n$ có giới hạn là một số vô tỉ, gọi là số $e$ và $e = 2{,}718281828...$. Lôgarit cơ số $e$ của một số dương $M$ gọi là lôgarit tự nhiên của $M$ và kí hiệu là $\\ln M$ ($\\ln M = \\log_e M$).',
          '**Công thức lãi kép liên tục**: Nếu đầu tư số tiền vốn $P$ với lãi suất năm $r$ được tính lãi kép liên tục thì sau $t$ năm, số tiền nhận được là $A = P e^{rt}$.',
        ],
        note: 'Trong Hoá học, độ $\\text{pH}$ của dung dịch tính bởi $\\text{pH} = -\\log[\\text{H}^+]$, với $[\\text{H}^+]$ là nồng độ ion $\\text{H}^+$ tính bằng $\\text{mol/L}$.',
      },
    ],
    formulas: [
      {
        name: 'Định nghĩa và 4 tính chất cơ bản của lôgarit ($0 < a \\neq 1, M > 0, \\alpha \\in \\mathbb{R}$)',
        latex: '\\alpha = \\log_a M \\iff a^\\alpha = M; \\qquad \\log_a 1 = 0; \\qquad \\log_a a = 1; \\qquad a^{\\log_a M} = M; \\qquad \\log_a a^\\alpha = \\alpha',
        description: 'Định nghĩa và 4 hằng đẳng thức lôgarit nền tảng.',
      },
      {
        name: 'Quy tắc tính lôgarit ($0 < a \\neq 1; M, N > 0; \\alpha \\in \\mathbb{R}$)',
        latex: '\\log_a(MN) = \\log_a M + \\log_a N; \\qquad \\log_a\\left(\\frac{M}{N}\\right) = \\log_a M - \\log_a N; \\qquad \\log_a M^\\alpha = \\alpha \\log_a M',
        description: 'Lôgarit của tích, thương và luỹ thừa.',
      },
      {
        name: 'Công thức đổi cơ số ($0 < a, b \\neq 1; M > 0; \\alpha \\neq 0$)',
        latex: '\\log_a M = \\frac{\\log_b M}{\\log_b a}; \\qquad \\log_a b = \\frac{1}{\\log_b a}; \\qquad \\log_{a^\\alpha} M = \\frac{1}{\\alpha}\\log_a M',
        description: 'Đổi từ cơ số $a$ sang cơ số $b$ bất kì.',
      },
      {
        name: 'Lôgarit thập phân, lôgarit tự nhiên và lãi kép liên tục',
        latex: '\\log M = \\log_{10} M; \\qquad \\ln M = \\log_e M; \\qquad A = P e^{rt}',
        description: '$e = \\lim_{n \\to +\\infty}\\left(1 + \\frac{1}{n}\\right)^n \\approx 2{,}71828$.',
      },
    ],
  },
  {
    lessonId: 'bai-20',
    chapterId: 'chuong-6',
    lessonNumber: 'Bài 20',
    lessonTitle: 'Hàm số mũ và hàm số lôgarit',
    fullName: 'Bài 20. Hàm số mũ và hàm số lôgarit',
    volume: 2,
    pageNumber: 16,
    keyTerms: [
      'Hàm số mũ',
      'Hàm số lôgarit',
    ],
    objectives: [
      'Nhận biết hàm số mũ và hàm số lôgarit. Nêu một số ví dụ thực tế về hàm số mũ, hàm số lôgarit.',
      'Nhận dạng đồ thị của các hàm số mũ, hàm số lôgarit.',
      'Giải thích các tính chất của hàm số mũ, hàm số lôgarit thông qua đồ thị của chúng.',
      'Giải quyết một số vấn đề có liên quan đến môn học khác hoặc thực tiễn gắn với hàm số mũ và hàm số lôgarit (ví dụ: lãi suất, sự tăng trưởng,...).',
    ],
    theorySections: [
      {
        title: '1. Hàm số mũ',
        points: [
          '**Định nghĩa**: Cho số thực $a$ dương khác $1$ ($0 < a \\neq 1$). Hàm số $y = a^x$ được gọi là hàm số mũ cơ số $a$.',
          '**Tập xác định và tập giá trị**: Hàm số mũ $y = a^x$ có tập xác định là $\\mathbb{R}$ và tập giá trị là $(0; +\\infty)$.',
          '**Tính chất và đồ thị**: Hàm số liên tục trên $\\mathbb{R}$; đồng biến trên $\\mathbb{R}$ khi $a > 1$ và nghịch biến trên $\\mathbb{R}$ khi $0 < a < 1$. Đồ thị của hàm số đi qua hai điểm $(0; 1)$, $(1; a)$ và luôn nằm phía trên trục hoành ($y > 0$ với mọi $x \\in \\mathbb{R}$), nhận trục hoành $Ox$ làm tiệm cận ngang.',
        ],
        note: 'Khi $a > 1$, $\\lim_{x \\to -\\infty} a^x = 0$ và $\\lim_{x \\to +\\infty} a^x = +\\infty$. Khi $0 < a < 1$, $\\lim_{x \\to -\\infty} a^x = +\\infty$ và $\\lim_{x \\to +\\infty} a^x = 0$.',
      },
      {
        title: '2. Hàm số lôgarit',
        points: [
          '**Định nghĩa**: Cho số thực $a$ dương khác $1$ ($0 < a \\neq 1$). Hàm số $y = \\log_a x$ được gọi là hàm số lôgarit cơ số $a$.',
          '**Tập xác định và tập giá trị**: Hàm số lôgarit $y = \\log_a x$ có tập xác định là $(0; +\\infty)$ và tập giá trị là $\\mathbb{R}$.',
          '**Tính chất và đồ thị**: Hàm số liên tục trên $(0; +\\infty)$; đồng biến trên $(0; +\\infty)$ khi $a > 1$ và nghịch biến trên $(0; +\\infty)$ khi $0 < a < 1$. Đồ thị đi qua hai điểm $(1; 0)$, $(a; 1)$ và luôn nằm bên phải trục tung ($x > 0$), nhận trục tung $Oy$ làm tiệm cận đứng.',
        ],
        note: 'Đồ thị của hai hàm số $y = a^x$ và $y = \\log_a x$ ($0 < a \\neq 1$) đối xứng với nhau qua đường phân giác của góc phần tư thứ nhất $y = x$.',
      },
    ],
    formulas: [
      {
        name: 'Hàm số mũ $y = a^x$ ($0 < a \\neq 1$)',
        latex: '\\text{TXĐ: } D = \\mathbb{R}, \\quad \\text{TGT: } T = (0; +\\infty), \\quad \\text{Đi qua } (0; 1), (1; a)',
        description: 'Đồng biến trên $\\mathbb{R}$ khi $a > 1$; nghịch biến trên $\\mathbb{R}$ khi $0 < a < 1$.',
      },
      {
        name: 'Hàm số lôgarit $y = \\log_a x$ ($0 < a \\neq 1$)',
        latex: '\\text{TXĐ: } D = (0; +\\infty), \\quad \\text{TGT: } T = \\mathbb{R}, \\quad \\text{Đi qua } (1; 0), (a; 1)',
        description: 'Đồng biến trên $(0; +\\infty)$ khi $a > 1$; nghịch biến trên $(0; +\\infty)$ khi $0 < a < 1$.',
      },
      {
        name: 'Sự biến thiên của hàm số mũ và hàm số lôgarit',
        latex: '\\begin{cases} a > 1: & x_1 < x_2 \\iff a^{x_1} < a^{x_2} \\quad \\text{và} \\quad 0 < x_1 < x_2 \\iff \\log_a x_1 < \\log_a x_2 \\\\ 0 < a < 1: & x_1 < x_2 \\iff a^{x_1} > a^{x_2} \\quad \\text{và} \\quad 0 < x_1 < x_2 \\iff \\log_a x_1 > \\log_a x_2 \\end{cases}',
        description: 'Quy tắc so sánh dựa trên tính đơn điệu của hàm số mũ và hàm số lôgarit.',
      },
    ],
  },
  {
    lessonId: 'bai-21',
    chapterId: 'chuong-6',
    lessonNumber: 'Bài 21',
    lessonTitle: 'Phương trình, bất phương trình mũ và lôgarit',
    fullName: 'Bài 21. Phương trình, bất phương trình mũ và lôgarit',
    volume: 2,
    pageNumber: 20,
    keyTerms: [
      'Phương trình mũ',
      'Phương trình lôgarit',
      'Bất phương trình mũ',
      'Bất phương trình lôgarit',
    ],
    objectives: [
      'Giải phương trình, bất phương trình mũ và lôgarit ở dạng đơn giản.',
      'Giải quyết một số vấn đề có liên quan đến môn học khác hoặc có liên quan đến thực tiễn gắn với phương trình, bất phương trình mũ và lôgarit (ví dụ: bài toán liên quan đến độ pH, độ rung chấn,...).',
    ],
    theorySections: [
      {
        title: '1. Phương trình mũ',
        points: [
          '**Phương trình mũ cơ bản**: Có dạng $a^x = b$ (với $0 < a \\neq 1$).',
          'Nếu $b > 0$ thì phương trình có nghiệm duy nhất $x = \\log_a b$. Nếu $b \\le 0$ thì phương trình vô nghiệm.',
          '**Phương pháp đưa về cùng cơ số**: Với $0 < a \\neq 1$, ta có: $a^{u(x)} = a^{v(x)} \\iff u(x) = v(x)$.',
        ],
        note: 'Có thể lấy lôgarit cơ số $a$ hai vế của phương trình $a^{u(x)} = b^{v(x)}$ (với $0 < a, b \\neq 1$) để đưa về phương trình đại số.',
      },
      {
        title: '2. Phương trình lôgarit',
        points: [
          '**Phương trình lôgarit cơ bản**: Có dạng $\\log_a x = b$ (với $0 < a \\neq 1$).',
          'Với mọi số thực $b$, phương trình $\\log_a x = b$ luôn có nghiệm duy nhất $x = a^b$.',
          '**Phương pháp đưa về cùng cơ số**: Với $0 < a \\neq 1$, ta có: $\\log_a u(x) = \\log_a v(x) \\iff \\begin{cases} u(x) = v(x) \\\\ u(x) > 0 \\text{ (hoặc } v(x) > 0\\text{)} \\end{cases}$.',
        ],
        note: 'Khi giải phương trình lôgarit, luôn phải đặt điều kiện xác định để mọi biểu thức dưới dấu lôgarit đều dương, hoặc thử lại nghiệm sau khi biến đổi.',
      },
      {
        title: '3. Bất phương trình mũ',
        points: [
          '**Bất phương trình mũ cơ bản**: Có dạng $a^x > b$ (hoặc $a^x \\ge b, a^x < b, a^x \\le b$) với $0 < a \\neq 1$.',
          'Xét bất phương trình $a^x > b$: Nếu $b \\le 0$, tập nghiệm của bất phương trình là $\\mathbb{R}$ (vì $a^x > 0 \\ge b, \\forall x \\in \\mathbb{R}$). Nếu $b > 0$ thì bất phương trình tương đương với $a^x > a^{\\log_a b}$: Với $a > 1$, nghiệm là $x > \\log_a b$; với $0 < a < 1$, nghiệm là $x < \\log_a b$.',
          '**Bất phương trình cùng cơ số**: Với $a > 1$: $a^{u(x)} > a^{v(x)} \\iff u(x) > v(x)$ (giữ nguyên chiều). Với $0 < a < 1$: $a^{u(x)} > a^{v(x)} \\iff u(x) < v(x)$ (đổi chiều).',
        ],
        note: 'Xét bất phương trình $a^x < b$: Nếu $b \\le 0$ thì bất phương trình vô nghiệm; nếu $b > 0$ thì với $a > 1$ nghiệm là $x < \\log_a b$, với $0 < a < 1$ nghiệm là $x > \\log_a b$.',
      },
      {
        title: '4. Bất phương trình lôgarit',
        points: [
          '**Bất phương trình lôgarit cơ bản**: Có dạng $\\log_a x > b$ (hoặc $\\log_a x \\ge b, \\log_a x < b, \\log_a x \\le b$) với $0 < a \\neq 1$.',
          'Xét bất phương trình $\\log_a x > b$ (điều kiện $x > 0$): Với $a > 1$, nghiệm là $x > a^b$. Với $0 < a < 1$, nghiệm là $0 < x < a^b$.',
          'Xét bất phương trình $\\log_a x < b$ (điều kiện $x > 0$): Với $a > 1$, nghiệm là $0 < x < a^b$. Với $0 < a < 1$, nghiệm là $x > a^b$.',
          '**Bất phương trình lôgarit cùng cơ số**: Với $a > 1$: $\\log_a u(x) > \\log_a v(x) \\iff u(x) > v(x) > 0$. Với $0 < a < 1$: $\\log_a u(x) > \\log_a v(x) \\iff 0 < u(x) < v(x)$.',
        ],
        note: 'Sai lầm thường gặp nhất khi giải bất phương trình lôgarit là quên điều kiện xác định $u(x) > 0, v(x) > 0$ (đặc biệt khi $0 < a < 1$ đổi chiều bất đẳng thức).',
      },
    ],
    formulas: [
      {
        name: 'Phương trình mũ và phương trình lôgarit cơ bản ($0 < a \\neq 1$)',
        latex: 'a^x = b \\ (b > 0) \\iff x = \\log_a b; \\qquad \\log_a x = b \\iff x = a^b',
        description: 'Phương trình $a^x = b$ vô nghiệm khi $b \\le 0$; phương trình $\\log_a x = b$ luôn có nghiệm duy nhất $x = a^b > 0$.',
      },
      {
        name: 'Phương trình mũ và lôgarit đưa về cùng cơ số ($0 < a \\neq 1$)',
        latex: 'a^{u(x)} = a^{v(x)} \\iff u(x) = v(x); \\qquad \\log_a u(x) = \\log_a v(x) \\iff \\begin{cases} u(x) > 0 \\\\ u(x) = v(x) \\end{cases}',
        description: 'Quy tắc khử cơ số trong phương trình mũ và lôgarit.',
      },
      {
        name: 'Bất phương trình mũ cùng cơ số ($0 < a \\neq 1$)',
        latex: 'a^{u(x)} > a^{v(x)} \\iff \\begin{cases} u(x) > v(x) & \\text{khi } a > 1 \\\\ u(x) < v(x) & \\text{khi } 0 < a < 1 \\end{cases}',
        description: 'Giữ chiều khi cơ số $a > 1$, đổi chiều khi cơ số $0 < a < 1$.',
      },
      {
        name: 'Bất phương trình lôgarit cùng cơ số ($0 < a \\neq 1$)',
        latex: '\\log_a u(x) > \\log_a v(x) \\iff \\begin{cases} u(x) > v(x) > 0 & \\text{khi } a > 1 \\\\ 0 < u(x) < v(x) & \\text{khi } 0 < a < 1 \\end{cases}',
        description: 'Kết hợp điều kiện xác định và tính đơn điệu theo cơ số $a$.',
      },
    ],
  },

  // ============================================================================
  // CHƯƠNG VII. QUAN HỆ VUÔNG GÓC TRONG KHÔNG GIAN
  // ============================================================================
  {
    lessonId: 'bai-22',
    chapterId: 'chuong-7',
    lessonNumber: 'Bài 22',
    lessonTitle: 'Hai đường thẳng vuông góc',
    fullName: 'Bài 22. Hai đường thẳng vuông góc',
    volume: 2,
    pageNumber: 27,
    keyTerms: [
      'Góc giữa hai đường thẳng',
      'Hai đường thẳng vuông góc',
    ],
    objectives: [
      'Nhận biết khái niệm góc giữa hai đường thẳng trong không gian.',
      'Nhận biết hai đường thẳng vuông góc trong không gian.',
      'Chứng minh hai đường thẳng vuông góc trong không gian trong một số trường hợp đơn giản.',
      'Sử dụng kiến thức về hai đường thẳng vuông góc để mô tả một số hình ảnh trong thực tiễn.',
    ],
    theorySections: [
      {
        title: '1. Góc giữa hai đường thẳng trong không gian',
        points: [
          '**Định nghĩa**: Góc giữa hai đường thẳng $a$ và $b$ trong không gian, kí hiệu $(a, b)$, là góc giữa hai đường thẳng $a\'$ và $b\'$ cùng đi qua một điểm và tương ứng song song (hoặc trùng) với $a$ và $b$.',
          '**Nhận xét**: Để xác định góc giữa hai đường thẳng $a$ và $b$, ta có thể lấy một điểm $O$ nằm trên một trong hai đường thẳng đó và vẽ đường thẳng song song với đường thẳng còn lại. Góc giữa hai đường thẳng luôn thoả mãn: $0^\\circ \\le (a, b) \\le 90^\\circ$.',
        ],
        note: 'Nếu hai đường thẳng song song hoặc trùng nhau thì góc giữa chúng bằng $0^\\circ$. Góc giữa hai đường thẳng không phụ thuộc vào vị trí điểm $O$ được chọn.',
      },
      {
        title: '2. Hai đường thẳng vuông góc trong không gian',
        points: [
          '**Định nghĩa**: Hai đường thẳng $a$ và $b$ được gọi là vuông góc với nhau trong không gian, kí hiệu $a \\perp b$, nếu góc giữa chúng bằng $90^\\circ$, tức là $(a, b) = 90^\\circ$.',
          '**Tính chất**: Nếu một đường thẳng vuông góc với một trong hai đường thẳng song song thì nó vuông góc với đường thẳng còn lại: $\\begin{cases} a \\parallel b \\\\ c \\perp a \\end{cases} \\Rightarrow c \\perp b$.',
        ],
        note: 'Hai đường thẳng vuông góc trong không gian có thể cắt nhau hoặc chéo nhau (không nhất thiết phải đồng phẳng).',
      },
    ],
    formulas: [
      {
        name: 'Số đo góc giữa hai đường thẳng trong không gian',
        latex: '0^\\circ \\le (a, b) = (a\', b\') \\le 90^\\circ \\qquad (\\text{với } O \\in a\' \\cap b\', \\ a\' \\parallel a, \\ b\' \\parallel b)',
        description: 'Góc giữa hai đường thẳng luôn là góc không tù.',
      },
      {
        name: 'Điều kiện và tính chất hai đường thẳng vuông góc',
        latex: 'a \\perp b \\iff (a, b) = 90^\\circ; \\qquad \\begin{cases} a \\parallel b \\\\ c \\perp a \\end{cases} \\Rightarrow c \\perp b',
        description: 'Tính chất bắc cầu giữa quan hệ song song và quan hệ vuông góc của đường thẳng.',
      },
    ],
    tikzCode: `\\begin{tikzpicture}[scale=1, line join=round, line cap=round]
\\coordinate (A) at (0,0);
\\coordinate (B) at (3.2,0);
\\coordinate (D) at (1.1,1.3);
\\coordinate (C) at (4.3,1.3);
\\coordinate (A') at (0,2.6);
\\coordinate (B') at (3.2,2.6);
\\coordinate (D') at (1.1,3.9);
\\coordinate (C') at (4.3,3.9);
\\draw[dashed] (A)--(D) (D)--(C) (D)--(D');
\\draw[thick] (A)--(B)--(C)--(C')--(D')--(A')--(A) (A')--(B')--(C') (B)--(B');
\\draw[red, very thick] (A')--(B) (B')--(C);
\\foreach \\p/\\pos in {A/below left, B/below, C/right, D/above left, A'/left, B'/below right, C'/above right, D'/above left}
  \\fill (\\p) circle (1.5pt) node[\\pos] {$\\p$};
\\end{tikzpicture}`,
    tikzCaption: 'Minh hoạ góc và quan hệ vuông góc giữa các đường thẳng chéo nhau trong hình lập phương $ABCD.A\'B\'C\'D\'$',
  },
  {
    lessonId: 'bai-23',
    chapterId: 'chuong-7',
    lessonNumber: 'Bài 23',
    lessonTitle: 'Đường thẳng vuông góc với mặt phẳng',
    fullName: 'Bài 23. Đường thẳng vuông góc với mặt phẳng',
    volume: 2,
    pageNumber: 31,
    keyTerms: [
      'Đường thẳng vuông góc với mặt phẳng',
      'Mặt phẳng trung trực của đoạn thẳng',
      'Tính chất liên hệ giữa quan hệ song song và quan hệ vuông góc',
    ],
    objectives: [
      'Nhận biết đường thẳng vuông góc với mặt phẳng.',
      'Xác định điều kiện để đường thẳng vuông góc với mặt phẳng.',
      'Giải thích mối liên hệ giữa tính song song và tính vuông góc của đường thẳng và mặt phẳng.',
      'Vận dụng kiến thức về đường thẳng vuông góc với mặt phẳng để mô tả một số hình ảnh trong thực tiễn.',
    ],
    theorySections: [
      {
        title: '1. Định nghĩa đường thẳng vuông góc với mặt phẳng',
        points: [
          '**Định nghĩa**: Đường thẳng $d$ được gọi là vuông góc với mặt phẳng $(P)$, kí hiệu $d \\perp (P)$ hoặc $(P) \\perp d$, nếu $d$ vuông góc với mọi đường thẳng $a$ nằm trong mặt phẳng $(P)$.',
          'Như vậy: $d \\perp (P) \\iff d \\perp a, \\ \\forall a \\subset (P)$.',
        ],
        note: 'Để chứng minh hai đường thẳng $d$ và $a$ vuông góc trong không gian, ta thường chứng minh $d$ vuông góc với một mặt phẳng $(P)$ chứa $a$.',
      },
      {
        title: '2. Điều kiện để đường thẳng vuông góc với mặt phẳng',
        points: [
          '**Định lí**: Nếu một đường thẳng vuông góc với hai đường thẳng cắt nhau thuộc cùng một mặt phẳng thì nó vuông góc với mặt phẳng đó.',
          'Tức là: Nếu $a \\subset (P), b \\subset (P), a \\cap b = \\{I\\}$ và $d \\perp a, d \\perp b$ thì $d \\perp (P)$.',
          '**Hệ quả**: Nếu một đường thẳng vuông góc với hai cạnh của một tam giác thì nó cũng vuông góc với cạnh thứ ba của tam giác đó.',
        ],
        note: 'Hai đường thẳng $a, b$ trong mặt phẳng $(P)$ bắt buộc phải cắt nhau.',
      },
      {
        title: '3. Tính chất và mặt phẳng trung trực',
        points: [
          '**Tính chất 1**: Có duy nhất một mặt phẳng đi qua một điểm cho trước và vuông góc với một đường thẳng cho trước.',
          '**Mặt phẳng trung trực của đoạn thẳng**: Mặt phẳng đi qua trung điểm $I$ của đoạn thẳng $AB$ và vuông góc với đường thẳng $AB$ được gọi là mặt phẳng trung trực của đoạn thẳng $AB$. Mặt phẳng trung trực của đoạn thẳng $AB$ là tập hợp tất cả các điểm cách đều hai đầu mút $A$ và $B$ ($MA = MB$).',
          '**Tính chất 2**: Có duy nhất một đường thẳng đi qua một điểm cho trước và vuông góc với một mặt phẳng cho trước.',
        ],
        note: 'Giao điểm của đường thẳng $d$ vuông góc với $(P)$ và mặt phẳng $(P)$ gọi là chân đường vuông góc.',
      },
      {
        title: '4. Liên hệ giữa quan hệ song song và quan hệ vuông góc của đường thẳng và mặt phẳng',
        points: [
          '**Tính chất 3**: (a) Nếu đường thẳng $a$ vuông góc với mặt phẳng $(P)$ thì các đường thẳng song song với $a$ cũng vuông góc với $(P)$. (b) Hai đường thẳng phân biệt cùng vuông góc với một mặt phẳng thì song song với nhau.',
          '**Tính chất 4**: (a) Nếu đường thẳng $d$ vuông góc với mặt phẳng $(P)$ thì $d$ cũng vuông góc với các mặt phẳng song song với $(P)$. (b) Hai mặt phẳng phân biệt cùng vuông góc với một đường thẳng thì song song với nhau.',
          '**Tính chất 5**: (a) Nếu đường thẳng $a$ song song với mặt phẳng $(P)$ thì các đường thẳng vuông góc với $(P)$ đều vuông góc với $a$. (b) Nếu đường thẳng $a$ và mặt phẳng $(P)$ (không chứa $a$) cùng vuông góc với một đường thẳng $d$ thì chúng song song với nhau.',
        ],
        note: 'Các tính chất này cho phép chuyển đổi linh hoạt giữa bài toán chứng minh song song và bài toán chứng minh vuông góc.',
      },
    ],
    formulas: [
      {
        name: 'Định nghĩa và Định lí nhận biết $d \\perp (P)$',
        latex: 'd \\perp (P) \\iff d \\perp a, \\ \\forall a \\subset (P); \\qquad \\begin{cases} a, b \\subset (P), \\ a \\cap b = \\{I\\} \\\\ d \\perp a, \\ d \\perp b \\end{cases} \\Rightarrow d \\perp (P)',
        description: 'Điều kiện cần và đủ để đường thẳng vuông góc với mặt phẳng.',
      },
      {
        name: 'Liên hệ giữa tính song song và tính vuông góc',
        latex: '\\begin{cases} a \\neq b \\\\ a \\perp (P), \\ b \\perp (P) \\end{cases} \\Rightarrow a \\parallel b; \\qquad \\begin{cases} (P) \\neq (Q) \\\\ (P) \\perp d, \\ (Q) \\perp d \\end{cases} \\Rightarrow (P) \\parallel (Q); \\qquad \\begin{cases} a \\not\\subset (P) \\\\ a \\perp d, \\ (P) \\perp d \\end{cases} \\Rightarrow a \\parallel (P)',
        description: 'Hệ thống các định lí liên hệ giữa song song và vuông góc trong không gian.',
      },
    ],
    tikzCode: `\\begin{tikzpicture}[scale=1, line join=round, line cap=round]
\\coordinate (A) at (0,0);
\\coordinate (C) at (4,0);
\\coordinate (B) at (1.5,-1.3);
\\coordinate (S) at (0,2.8);
\\coordinate (H) at (0.75,-0.65);
\\draw[dashed, thick] (A)--(C) (C)--(H);
\\draw[thick] (S)--(A)--(B)--(C)--(S) (S)--(B) (S)--(H);
\\draw (0,0.28)--(-0.22,0.1)--(-0.22,-0.18);
\\draw (0,0.28)--(0.28,0.28)--(0.28,0);
\\foreach \\p/\\pos in {S/above, A/left, B/below, C/right, H/below left}
  \\fill (\\p) circle (1.5pt) node[\\pos] {$\\p$};
\\end{tikzpicture}`,
    tikzCaption: 'Hình chóp $S.ABC$ có $SA \\perp (ABC)$ và $CH \\perp AB \\Rightarrow AB \\perp (SHC)$',
  },
  {
    lessonId: 'bai-24',
    chapterId: 'chuong-7',
    lessonNumber: 'Bài 24',
    lessonTitle: 'Phép chiếu vuông góc. Góc giữa đường thẳng và mặt phẳng',
    fullName: 'Bài 24. Phép chiếu vuông góc. Góc giữa đường thẳng và mặt phẳng',
    volume: 2,
    pageNumber: 38,
    keyTerms: [
      'Phép chiếu vuông góc',
      'Định lí ba đường vuông góc',
      'Góc giữa đường thẳng và mặt phẳng',
    ],
    objectives: [
      'Nhận biết khái niệm phép chiếu vuông góc.',
      'Xác định được hình chiếu vuông góc của một điểm, một đường thẳng, một tam giác.',
      'Nhận biết công thức tính diện tích hình chiếu của một tam giác (định lí ba đường vuông góc).',
      'Xác định và tính được góc giữa đường thẳng và mặt phẳng trong những trường hợp đơn giản (ví dụ: đã biết hình chiếu vuông góc của đường thẳng lên mặt phẳng).',
      'Vận dụng được kiến thức về góc giữa đường thẳng và mặt phẳng để mô tả một số hình ảnh trong thực tiễn.',
    ],
    theorySections: [
      {
        title: '1. Phép chiếu vuông góc',
        points: [
          '**Định nghĩa**: Phép chiếu song song lên mặt phẳng $(P)$ theo phương $l$ vuông góc với $(P)$ được gọi là phép chiếu vuông góc lên mặt phẳng $(P)$.',
          'Ảnh $H\'$ của hình $H$ qua phép chiếu vuông góc lên mặt phẳng $(P)$ được gọi là hình chiếu vuông góc (hay hình chiếu) của hình $H$ trên mặt phẳng $(P)$.',
          '**Định lí ba đường vuông góc**: Cho đường thẳng $a$ và mặt phẳng $(P)$ không vuông góc với nhau. Khi đó, một đường thẳng $b$ nằm trong mặt phẳng $(P)$ vuông góc với đường thẳng $a$ khi và chỉ khi $b$ vuông góc với hình chiếu vuông góc $a\'$ của $a$ trên $(P)$.',
        ],
        note: 'Phép chiếu vuông góc là trường hợp đặc biệt của phép chiếu song song nên có đầy đủ các tính chất của phép chiếu song song.',
      },
      {
        title: '2. Góc giữa đường thẳng và mặt phẳng',
        points: [
          '**Định nghĩa**: Nếu đường thẳng $a$ vuông góc với mặt phẳng $(P)$ thì ta nói rằng góc giữa đường thẳng $a$ và mặt phẳng $(P)$ bằng $90^\\circ$. Nếu đường thẳng $a$ không vuông góc với mặt phẳng $(P)$ thì góc giữa $a$ và hình chiếu $a\'$ của nó trên $(P)$ được gọi là góc giữa đường thẳng $a$ và mặt phẳng $(P)$.',
          '**Nhận xét**: Góc $\\varphi$ giữa đường thẳng $a$ và mặt phẳng $(P)$ luôn thoả mãn $0^\\circ \\le \\varphi \\le 90^\\circ$. Nếu $a \\subset (P)$ hoặc $a \\parallel (P)$ thì góc giữa $a$ và $(P)$ bằng $0^\\circ$.',
          '**Cách xác định góc giữa đường thẳng $a$ và mặt phẳng $(P)$** (khi $a$ cắt $(P)$ tại $O$ và không vuông góc với $(P)$): Bước 1: Tìm giao điểm $O = a \\cap (P)$. Bước 2: Lấy điểm $A \\in a$ ($A \\neq O$) và tìm hình chiếu vuông góc $H$ của $A$ trên $(P)$ (tức là $AH \\perp (P)$ tại $H$). Bước 3: Khi đó $OH$ là hình chiếu của $OA$ trên $(P)$ và góc giữa $a$ với $(P)$ chính là góc nhọn $\\widehat{AOH}$ trong tam giác vuông $AHO$ tại $H$.',
        ],
        note: 'Nếu tam giác $ABC$ nằm trong mặt phẳng $(Q)$ có hình chiếu vuông góc trên $(P)$ là $\\triangle A\'B\'C\'$ và $\\varphi = ((P), (Q))$ thì $S_{\\triangle A\'B\'C\'} = S_{\\triangle ABC} \\cdot \\cos \\varphi$.',
      },
    ],
    formulas: [
      {
        name: 'Định lí ba đường vuông góc ($a \\not\\perp (P)$, $a\'$ là hình chiếu của $a$ trên $(P)$, $b \\subset (P)$)',
        latex: 'b \\perp a \\iff b \\perp a\'',
        description: 'Đường thẳng trong mặt phẳng vuông góc với đường xiên khi và chỉ khi nó vuông góc với hình chiếu.',
      },
      {
        name: 'Góc giữa đường thẳng $a$ và mặt phẳng $(P)$',
        latex: '(a, (P)) = \\begin{cases} 90^\\circ & \\text{nếu } a \\perp (P) \\\\ (a, a\') & \\text{nếu } a \\not\\perp (P) \\end{cases} \\qquad (0^\\circ \\le (a, (P)) \\le 90^\\circ)',
        description: 'Trong $\\triangle AHO$ vuông tại $H$ ($O = a \\cap (P), AH \\perp (P)$): $\\sin \\widehat{AOH} = \\frac{AH}{AO}, \\ \\tan \\widehat{AOH} = \\frac{AH}{OH}, \\ \\cos \\widehat{AOH} = \\frac{OH}{AO}$.',
      },
    ],
    tikzCode: `\\begin{tikzpicture}[scale=1, line join=round, line cap=round]
\\coordinate (P1) at (0,0);
\\coordinate (P2) at (4.5,0);
\\coordinate (P3) at (5.5,1.6);
\\coordinate (P4) at (1,1.6);
\\coordinate (O) at (1.5,0.6);
\\coordinate (H) at (3.8,0.8);
\\coordinate (A) at (3.8,2.8);
\\draw[thick] (P1)--(P2)--(P3)--(P4)--cycle;
\\draw[thick] (O)--(A) (O)--(H);
\\draw[dashed, thick] (A)--(H);
\\draw (3.55,0.78)--(3.55,1.03)--(3.8,1.05);
\\draw (2.1,0.65) arc (5:42:0.6);
\\node at (2.35,0.9) {$\\varphi$};
\\node at (0.6,0.3) {$P$};
\\foreach \\p/\\pos in {A/above, O/left, H/below right}
  \\fill (\\p) circle (1.5pt) node[\\pos] {$\\p$};
\\end{tikzpicture}`,
    tikzCaption: 'Hình chiếu vuông góc $OH$ của $OA$ trên $(P)$ và góc $\\varphi = \\widehat{AOH}$ giữa đường thẳng $OA$ và mặt phẳng $(P)$',
  },
  {
    lessonId: 'bai-25',
    chapterId: 'chuong-7',
    lessonNumber: 'Bài 25',
    lessonTitle: 'Hai mặt phẳng vuông góc',
    fullName: 'Bài 25. Hai mặt phẳng vuông góc',
    volume: 2,
    pageNumber: 44,
    keyTerms: [
      'Góc giữa hai mặt phẳng',
      'Hai mặt phẳng vuông góc',
      'Góc nhị diện, góc phẳng nhị diện',
      'Hình lăng trụ đứng, lăng trụ đều, hình hộp đứng, hình hộp chữ nhật, hình lập phương',
      'Hình chóp đều, hình chóp cụt đều',
    ],
    objectives: [
      'Nhận biết hai mặt phẳng vuông góc trong không gian.',
      'Xác định điều kiện để hai mặt phẳng vuông góc.',
      'Giải thích tính chất cơ bản về hai mặt phẳng vuông góc.',
      'Nhận biết góc phẳng của góc nhị diện; tính góc phẳng nhị diện trong một số trường hợp đơn giản.',
      'Nhận biết và giải thích tính chất cơ bản của hình lăng trụ đứng, lăng trụ đều, hình hộp đứng, hình hộp chữ nhật, hình lập phương, hình chóp đều, hình chóp cụt đều.',
      'Vận dụng kiến thức về hai mặt phẳng vuông góc để mô tả một số hình ảnh trong thực tiễn.',
    ],
    theorySections: [
      {
        title: '1. Góc giữa hai mặt phẳng và hai mặt phẳng vuông góc',
        points: [
          '**Định nghĩa góc giữa hai mặt phẳng**: Góc giữa hai mặt phẳng $(P)$ và $(Q)$, kí hiệu $((P), (Q))$, là góc giữa hai đường thẳng $a$ và $b$ lần lượt vuông góc với $(P)$ và $(Q)$. Ta luôn có $0^\\circ \\le ((P), (Q)) \\le 90^\\circ$.',
          'Cách xác định góc giữa hai mặt phẳng cắt nhau theo giao tuyến $c$: Tìm hai đường thẳng $a \\subset (P)$ và $b \\subset (Q)$ cùng vuông góc với giao tuyến $c$ tại một điểm $I \\in c$. Khi đó $((P), (Q)) = (a, b)$.',
          '**Định nghĩa hai mặt phẳng vuông góc**: Hai mặt phẳng $(P)$ và $(Q)$ được gọi là vuông góc với nhau, kí hiệu $(P) \\perp (Q)$, nếu góc giữa chúng bằng $90^\\circ$.',
          '**Điều kiện để hai mặt phẳng vuông góc (Định lí)**: Hai mặt phẳng vuông góc với nhau nếu mặt phẳng này chứa một đường thẳng vuông góc với mặt phẳng kia: $\\begin{cases} a \\subset (P) \\\\ a \\perp (Q) \\end{cases} \\Rightarrow (P) \\perp (Q)$.',
        ],
        note: 'Nếu hai mặt phẳng song song hoặc trùng nhau thì góc giữa chúng bằng $0^\\circ$.',
      },
      {
        title: '2. Tính chất của hai mặt phẳng vuông góc',
        points: [
          '**Tính chất 1**: Với hai mặt phẳng vuông góc với nhau, bất kì đường thẳng nào nằm trong mặt phẳng này mà vuông góc với giao tuyến thì cũng vuông góc với mặt phẳng kia: $\\begin{cases} (P) \\perp (Q), \\ (P) \\cap (Q) = c \\\\ a \\subset (P), \\ a \\perp c \\end{cases} \\Rightarrow a \\perp (Q)$.',
          '**Tính chất 2**: Nếu hai mặt phẳng cắt nhau và cùng vuông góc với mặt phẳng thứ ba thì giao tuyến của chúng vuông góc với mặt phẳng thứ ba đó: $\\begin{cases} (P) \\cap (Q) = d \\\\ (P) \\perp (R), \\ (Q) \\perp (R) \\end{cases} \\Rightarrow d \\perp (R)$.',
        ],
        note: 'Hai tính chất này là công cụ quan trọng nhất để xác định đường cao của hình chóp trong các bài toán hình học không gian.',
      },
      {
        title: '3. Góc nhị diện',
        points: [
          '**Khái niệm**: Cho hai nửa mặt phẳng $(P)$ và $(Q)$ có chung bờ là đường thẳng $d$. Hình tạo bởi hai nửa mặt phẳng $(P), (Q)$ và đường thẳng $d$ được gọi là góc nhị diện tạo bởi $(P)$ và $(Q)$, kí hiệu $[P, d, Q]$. Đường thẳng $d$ gọi là cạnh của góc nhị diện, hai nửa mặt phẳng $(P), (Q)$ gọi là hai mặt của góc nhị diện.',
          'Nếu $A \\in (P) \\setminus d$ và $B \\in (Q) \\setminus d$ thì góc nhị diện $[P, d, Q]$ còn được kí hiệu là $[A, d, B]$.',
          '**Góc phẳng nhị diện**: Từ một điểm $O$ bất kì thuộc cạnh $d$ của góc nhị diện $[P, d, Q]$, vẽ hai tia $Ox, Oy$ lần lượt thuộc $(P), (Q)$ và cùng vuông góc với $d$. Góc $\\widehat{xOy}$ được gọi là một góc phẳng nhị diện của góc nhị diện đã cho. Số đo của $\\widehat{xOy}$ không phụ thuộc vị trí của $O$ trên $d$ và gọi là số đo của góc nhị diện $[P, d, Q]$.',
        ],
        note: 'Số đo của góc nhị diện có thể nhận giá trị từ $0^\\circ$ đến $180^\\circ$ (khác với góc giữa hai mặt phẳng chỉ từ $0^\\circ$ đến $90^\\circ$).',
      },
      {
        title: '4. Một số hình lăng trụ đặc biệt, hình chóp đều và hình chóp cụt đều',
        points: [
          '**Hình lăng trụ đứng**: Là hình lăng trụ có các cạnh bên vuông góc với mặt đáy. Các mặt bên là các hình chữ nhật, độ dài cạnh bên bằng chiều cao của lăng trụ.',
          '**Hình lăng trụ đều**: Là hình lăng trụ đứng có đáy là đa giác đều. Các mặt bên là những hình chữ nhật bằng nhau.',
          '**Hình hộp đứng**: Là hình lăng trụ đứng có đáy là hình bình hành. **Hình hộp chữ nhật**: Là hình hộp đứng có đáy là hình chữ nhật (6 mặt đều là hình chữ nhật, đường chéo $d = \\sqrt{a^2 + b^2 + c^2}$). **Hình lập phương**: Là hình hộp chữ nhật có tất cả các cạnh bằng nhau (6 mặt đều là hình vuông, đường chéo $d = a\\sqrt{3}$).',
          '**Hình chóp đều**: Là hình chóp có đáy là một đa giác đều và các cạnh bên bằng nhau. Chân đường cao $SO$ của hình chóp đều trùng với tâm $O$ của đa giác đều đáy; các mặt bên là các tam giác cân bằng nhau.',
          '**Hình chóp cụt đều**: Cắt hình chóp đều bởi một mặt phẳng song song với đáy, phần hình chóp nằm giữa mặt phẳng đó và mặt đáy gọi là hình chóp cụt đều. Các mặt bên là những hình thang cân bằng nhau; đường thẳng nối tâm hai đáy là đường cao.',
        ],
        note: 'Hình chóp có các cạnh bên bằng nhau (hoặc tạo với đáy các góc bằng nhau) thì chân đường cao trùng với tâm đường tròn ngoại tiếp đa giác đáy.',
      },
    ],
    formulas: [
      {
        name: 'Định lí điều kiện và tính chất hai mặt phẳng vuông góc',
        latex: '\\begin{cases} a \\subset (P) \\\\ a \\perp (Q) \\end{cases} \\Rightarrow (P) \\perp (Q); \\qquad \\begin{cases} (P) \\perp (Q), \\ (P) \\cap (Q) = c \\\\ a \\subset (P), \\ a \\perp c \\end{cases} \\Rightarrow a \\perp (Q)',
        description: 'Điều kiện nhận biết và tính chất đường thẳng nằm trong mặt phẳng vuông góc với giao tuyến.',
      },
      {
        name: 'Giao tuyến của hai mặt phẳng cùng vuông góc với mặt phẳng thứ ba',
        latex: '\\begin{cases} (P) \\cap (Q) = d \\\\ (P) \\perp (R), \\ (Q) \\perp (R) \\end{cases} \\Rightarrow d \\perp (R)',
        description: 'Cách xác định đường cao của hình chóp có hai mặt bên cùng vuông góc với mặt đáy.',
      },
      {
        name: 'Số đo góc giữa hai mặt phẳng và số đo góc nhị diện',
        latex: '0^\\circ \\le ((P), (Q)) \\le 90^\\circ; \\qquad 0^\\circ \\le \\text{sđ}[P, d, Q] = \\widehat{xOy} \\le 180^\\circ',
        description: 'Với $O \\in d, Ox \\subset (P), Oy \\subset (Q)$ và $Ox \\perp d, Oy \\perp d$.',
      },
    ],
    tikzCode: `\\begin{tikzpicture}[scale=1, line join=round, line cap=round]
\\coordinate (A) at (0,0);
\\coordinate (B) at (-1.2,-1.15);
\\coordinate (C) at (2.2,-1.15);
\\coordinate (D) at (3.4,0);
\\coordinate (O) at (1.1,-0.575);
\\coordinate (S) at (1.1,2.8);
\\coordinate (M) at (2.8,-0.575);
\\draw[dashed, thick] (S)--(A) (A)--(B) (A)--(D) (A)--(C) (B)--(D) (S)--(O) (O)--(M);
\\draw[thick] (S)--(B) (S)--(C) (S)--(D) (B)--(C) (C)--(D) (S)--(M);
\\draw (1.1,-0.325)--(1.35,-0.325)--(1.35,-0.575);
\\foreach \\p/\\pos in {S/above, A/above left, B/below left, C/below right, D/right, O/below, M/right}
  \\fill (\\p) circle (1.5pt) node[\\pos] {$\\p$};
\\end{tikzpicture}`,
    tikzCaption: 'Hình chóp tứ giác đều $S.ABCD$ có đường cao $SO \\perp (ABCD)$ và góc phẳng nhị diện $[S, CD, O]$ là $\\widehat{SMO}$',
  },
  {
    lessonId: 'bai-26',
    chapterId: 'chuong-7',
    lessonNumber: 'Bài 26',
    lessonTitle: 'Khoảng cách',
    fullName: 'Bài 26. Khoảng cách',
    volume: 2,
    pageNumber: 54,
    keyTerms: [
      'Khoảng cách từ một điểm đến một đường thẳng, đến một mặt phẳng',
      'Khoảng cách giữa hai đường thẳng song song',
      'Khoảng cách giữa đường thẳng và mặt phẳng song song',
      'Khoảng cách giữa hai mặt phẳng song song',
      'Đường vuông góc chung, khoảng cách giữa hai đường thẳng chéo nhau',
    ],
    objectives: [
      'Xác định được khoảng cách từ một điểm đến một đường thẳng; khoảng cách từ một điểm đến một mặt phẳng.',
      'Xác định được khoảng cách giữa hai đường thẳng song song; khoảng cách giữa đường thẳng và mặt phẳng song song; khoảng cách giữa hai mặt phẳng song song trong những trường hợp đơn giản.',
      'Nhận biết đường vuông góc chung của hai đường thẳng chéo nhau; tính được khoảng cách giữa hai đường thẳng chéo nhau trong những trường hợp đơn giản (ví dụ: có một đường thẳng vuông góc với mặt phẳng chứa đường thẳng còn lại).',
      'Sử dụng được kiến thức về khoảng cách trong không gian để mô tả một số hình ảnh trong thực tiễn.',
    ],
    theorySections: [
      {
        title: '1. Khoảng cách từ một điểm đến một đường thẳng, đến một mặt phẳng',
        points: [
          '**Khoảng cách từ một điểm đến một đường thẳng**: Cho điểm $M$ và đường thẳng $a$. Gọi $H$ là hình chiếu vuông góc của $M$ trên $a$. Độ dài đoạn thẳng $MH$ được gọi là khoảng cách từ điểm $M$ đến đường thẳng $a$, kí hiệu $d(M, a) = MH$.',
          '**Khoảng cách từ một điểm đến một mặt phẳng**: Cho điểm $M$ và mặt phẳng $(P)$. Gọi $H$ là hình chiếu vuông góc của $M$ trên mặt phẳng $(P)$. Độ dài đoạn thẳng $MH$ được gọi là khoảng cách từ điểm $M$ đến mặt phẳng $(P)$, kí hiệu $d(M, (P)) = MH$.',
        ],
        note: 'Khoảng cách từ $M$ đến $a$ (hoặc $(P)$) là khoảng cách nhỏ nhất từ $M$ đến một điểm bất kì thuộc $a$ (hoặc $(P)$). Nếu $M \\in a$ thì $d(M, a) = 0$; nếu $M \\in (P)$ thì $d(M, (P)) = 0$.',
      },
      {
        title: '2. Khoảng cách giữa các đường thẳng và mặt phẳng song song',
        points: [
          '**Khoảng cách giữa đường thẳng và mặt phẳng song song**: Cho đường thẳng $a$ song song với mặt phẳng $(P)$. Khoảng cách giữa đường thẳng $a$ và mặt phẳng $(P)$, kí hiệu $d(a, (P))$, là khoảng cách từ một điểm $M$ bất kì trên $a$ đến mặt phẳng $(P)$: $d(a, (P)) = d(M, (P))$ với $M \\in a$.',
          '**Khoảng cách giữa hai mặt phẳng song song**: Khoảng cách giữa hai mặt phẳng song song $(P)$ và $(Q)$, kí hiệu $d((P), (Q))$, là khoảng cách từ một điểm $M$ bất kì thuộc mặt phẳng này đến mặt phẳng kia: $d((P), (Q)) = d(M, (Q))$ với $M \\in (P)$.',
          '**Khoảng cách giữa hai đường thẳng song song**: Là khoảng cách từ một điểm bất kì trên đường thẳng này đến đường thẳng kia.',
        ],
        note: 'Nếu đường thẳng $AM$ cắt mặt phẳng $(P)$ tại $I$ thì tỉ số khoảng cách từ $A$ và $M$ đến $(P)$ bằng tỉ số $\\frac{d(A, (P))}{d(M, (P))} = \\frac{IA}{IM}$ (quy tắc đổi điểm tính khoảng cách).',
      },
      {
        title: '3. Đường vuông góc chung và khoảng cách giữa hai đường thẳng chéo nhau',
        points: [
          '**Định nghĩa đường vuông góc chung**: Đường thẳng $\\Delta$ cắt cả hai đường thẳng chéo nhau $a, b$ và cùng vuông góc với mỗi đường thẳng ấy được gọi là đường vuông góc chung của $a$ và $b$.',
          '**Khoảng cách giữa hai đường thẳng chéo nhau**: Nếu đường vuông góc chung $\\Delta$ cắt hai đường thẳng chéo nhau $a, b$ lần lượt tại $M, N$ thì độ dài đoạn thẳng $MN$ được gọi là khoảng cách giữa hai đường thẳng chéo nhau $a$ và $b$, kí hiệu $d(a, b) = MN$.',
          '**Nhận xét**: Khoảng cách giữa hai đường thẳng chéo nhau $a$ và $b$ bằng khoảng cách giữa một trong hai đường thẳng đó và mặt phẳng song song với nó, chứa đường thẳng còn lại; hoặc bằng khoảng cách giữa hai mặt phẳng song song lần lượt chứa $a$ và $b$.',
        ],
        note: 'Độ dài đoạn vuông góc chung $MN$ là khoảng cách ngắn nhất giữa một điểm trên $a$ và một điểm trên $b$.',
      },
    ],
    formulas: [
      {
        name: 'Khoảng cách từ một điểm đến đường thẳng, mặt phẳng và quy tắc đổi điểm',
        latex: 'd(M, a) = MH \\ (MH \\perp a); \\qquad d(M, (P)) = MK \\ (MK \\perp (P)); \\qquad \\frac{d(A, (P))}{d(B, (P))} = \\frac{IA}{IB} \\ (I = AB \\cap (P))',
        description: 'Quy tắc đổi điểm từ điểm khó về chân đường cao của hình chóp.',
      },
      {
        name: 'Hệ thức tính đường cao trong tam giác vuông và tứ diện vuông',
        latex: '\\frac{1}{h^2} = \\frac{1}{a^2} + \\frac{1}{b^2} \\iff h = \\frac{ab}{\\sqrt{a^2 + b^2}}; \\qquad \\frac{1}{d^2(O, (ABC))} = \\frac{1}{OA^2} + \\frac{1}{OB^2} + \\frac{1}{OC^2}',
        description: 'Áp dụng khi $OA, OB, OC$ đôi một vuông góc tại $O$.',
      },
      {
        name: 'Khoảng cách giữa hai đường thẳng chéo nhau $a$ và $b$',
        latex: 'd(a, b) = MN = d(a, (P)) = d(M_0, (P)) \\qquad (\\text{với } b \\subset (P), \\ a \\parallel (P), \\ M_0 \\in a)',
        description: '$MN$ là đoạn vuông góc chung của $a, b$ ($M \\in a, N \\in b, MN \\perp a, MN \\perp b$).',
      },
    ],
    tikzCode: `\\begin{tikzpicture}[scale=1, line join=round, line cap=round]
\\coordinate (A) at (0,0);
\\coordinate (B) at (1.4,-1.2);
\\coordinate (C) at (3.8,0);
\\coordinate (S) at (0,2.8);
\\coordinate (E) at (2.36,-0.72);
\\coordinate (H) at (1.42,0.69);
\\draw[dashed, thick] (A)--(C) (A)--(E);
\\draw[dashed, very thick, red] (A)--(H);
\\draw[thick] (S)--(A)--(B)--(C)--(S) (S)--(B) (S)--(E);
\\draw (0,0.25)--(0.22,0.06)--(0.22,-0.19);
\\foreach \\p/\\pos in {S/above, A/left, B/below, C/right, E/below right, H/above right}
  \\fill (\\p) circle (1.5pt) node[\\pos] {$\\p$};
\\end{tikzpicture}`,
    tikzCaption: 'Dựng khoảng cách $d(A, (SBC)) = AH$ từ chân đường cao $A$ đến mặt bên $(SBC)$ (với $AE \\perp BC, AH \\perp SE$)',
  },
  {
    lessonId: 'bai-27',
    chapterId: 'chuong-7',
    lessonNumber: 'Bài 27',
    lessonTitle: 'Thể tích',
    fullName: 'Bài 27. Thể tích',
    volume: 2,
    pageNumber: 61,
    keyTerms: [
      'Thể tích của khối chóp',
      'Thể tích của khối chóp cụt đều',
      'Thể tích của khối lăng trụ',
      'Thể tích của khối hộp',
    ],
    objectives: [
      'Nhận biết công thức tính thể tích của khối chóp, khối lăng trụ, khối hộp, khối chóp cụt đều.',
      'Tính được thể tích của khối chóp, khối lăng trụ, khối hộp, khối chóp cụt đều trong những trường hợp đơn giản (ví dụ: nhận biết được đường cao và diện tích mặt đáy của khối đa diện).',
      'Vận dụng được kiến thức về thể tích của các khối đa diện để mô tả một số hình ảnh trong thực tiễn.',
    ],
    theorySections: [
      {
        title: '1. Thể tích của khối chóp và khối chóp cụt đều',
        points: [
          '**Công thức tính thể tích khối chóp**: Thể tích $V$ của khối chóp có diện tích đáy $S$ và chiều cao $h$ là: $V = \\frac{1}{3}Sh$.',
          'Chiều cao $h$ của khối chóp là khoảng cách từ đỉnh tới mặt phẳng đáy.',
          '**Công thức tính thể tích khối chóp cụt đều**: Thể tích của khối chóp cụt đều có diện tích hai đáy là $S, S\'$ và chiều cao $h$ là: $V = \\frac{1}{3}h\\left(S + S\' + \\sqrt{SS\'}\\right)$.',
        ],
        note: 'Thể tích của khối tứ diện vuông $OABC$ (có $OA, OB, OC$ đôi một vuông góc tại $O$) là $V = \\frac{1}{6}OA \\cdot OB \\cdot OC$.',
      },
      {
        title: '2. Thể tích của khối lăng trụ và khối hộp',
        points: [
          '**Công thức tính thể tích khối lăng trụ**: Thể tích $V$ của khối lăng trụ có diện tích đáy $S$ và chiều cao $h$ là: $V = Sh$.',
          'Chiều cao $h$ của khối lăng trụ là khoảng cách giữa hai mặt phẳng đáy. Đặc biệt, thể tích của khối lăng trụ đứng có diện tích đáy $S$ và độ dài cạnh bên $b$ là $V = Sb$.',
          '**Thể tích khối hộp chữ nhật**: Với ba kích thước $a, b, c$, ta có $V = abc$.',
          '**Thể tích khối lập phương**: Với cạnh bằng $a$, ta có $V = a^3$.',
        ],
        note: 'Ba khối chóp có cùng diện tích đáy và cùng chiều cao với khối lăng trụ thì tổng thể tích của chúng bằng thể tích khối lăng trụ ($V_{\\text{chóp}} = \\frac{1}{3}V_{\\text{lăng trụ}}$).',
      },
    ],
    formulas: [
      {
        name: 'Thể tích khối chóp và khối tứ diện vuông',
        latex: 'V_{\\text{chóp}} = \\frac{1}{3} S \\cdot h; \\qquad V_{OABC} = \\frac{1}{6}abc \\quad (OA \\perp OB \\perp OC \\perp OA)',
        description: '$S$: diện tích đa giác đáy; $h$: chiều cao hạ từ đỉnh xuống mặt phẳng đáy.',
      },
      {
        name: 'Thể tích khối chóp cụt đều',
        latex: 'V_{\\text{chóp cụt đều}} = \\frac{1}{3} h \\left(S + S\' + \\sqrt{SS\'}\\right)',
        description: '$S, S\'$: diện tích hai đáy của hình chóp cụt đều; $h$: khoảng cách giữa hai mặt phẳng đáy.',
      },
      {
        name: 'Thể tích khối lăng trụ, khối hộp chữ nhật và khối lập phương',
        latex: 'V_{\\text{lăng trụ}} = S \\cdot h; \\qquad V_{\\text{hộp chữ nhật}} = abc; \\qquad V_{\\text{lập phương}} = a^3',
        description: 'Đối với lăng trụ đứng, chiều cao $h$ chính là độ dài cạnh bên.',
      },
    ],
    tikzCode: `\\begin{tikzpicture}[scale=1, line join=round, line cap=round]
\\coordinate (A) at (0,0);
\\coordinate (B) at (1.5,-1.1);
\\coordinate (C) at (3.8,0);
\\coordinate (S) at (1.6,2.8);
\\coordinate (H) at (1.6,-0.35);
\\draw[dashed] (A)--(C) (S)--(H);
\\draw[thick] (S)--(A)--(B)--(C)--cycle (S)--(B);
\\node[right] at (1.6,1.2) {$h$};
\\node at (2.3,-0.45) {$S$};
\\foreach \\p/\\pos in {S/above, A/left, B/below, C/right, H/below}
  \\fill (\\p) circle (1.5pt) node[\\pos] {$\\p$};
\\end{tikzpicture}`,
    tikzCaption: 'Khối chóp $S.ABC$ có diện tích đáy $S$, chiều cao $h = SH$ và thể tích $V = \\frac{1}{3}Sh$',
  },

  // ============================================================================
  // CHƯƠNG VIII. CÁC QUY TẮC TÍNH XÁC SUẤT
  // ============================================================================
  {
    lessonId: 'bai-28',
    chapterId: 'chuong-8',
    lessonNumber: 'Bài 28',
    lessonTitle: 'Biến cố hợp, biến cố giao, biến cố độc lập',
    fullName: 'Bài 28. Biến cố hợp, biến cố giao, biến cố độc lập',
    volume: 2,
    pageNumber: 66,
    keyTerms: [
      'Biến cố hợp',
      'Biến cố giao',
      'Biến cố độc lập',
    ],
    objectives: [
      'Nhận biết khái niệm biến cố hợp, biến cố giao, biến cố độc lập.',
      'Xác định được biến cố hợp, biến cố giao của hai biến cố bằng cách mô tả bằng lời hoặc liệt kê các kết quả thuận lợi.',
      'Nhận biết hai biến cố độc lập trong các bài toán xác suất đơn giản.',
    ],
    theorySections: [
      {
        title: '1. Biến cố hợp',
        points: [
          '**Định nghĩa**: Cho hai biến cố $A$ và $B$ (cùng liên quan đến một phép thử $T$ và các kết quả của $T$ là đồng khả năng). Biến cố: " $A$ hoặc $B$ xảy ra ", kí hiệu là $A \\cup B$, được gọi là biến cố hợp của $A$ và $B$.',
          'Biến cố $A \\cup B$ xảy ra khi và chỉ khi có ít nhất một trong hai biến cố $A, B$ xảy ra. Tập hợp các kết quả thuận lợi cho biến cố $A \\cup B$ chính là hợp của hai tập hợp kết quả thuận lợi cho $A$ và cho $B$.',
        ],
        note: 'Theo ngôn ngữ tập hợp, $A \\cup B$ là hợp của hai tập con $A$ và $B$ của không gian mẫu $\\Omega$.',
      },
      {
        title: '2. Biến cố giao',
        points: [
          '**Định nghĩa**: Cho hai biến cố $A$ và $B$. Biến cố: " Cả $A$ và $B$ đều xảy ra ", kí hiệu là $AB$ (hoặc $A \\cap B$), được gọi là biến cố giao của $A$ và $B$.',
          'Biến cố $AB$ xảy ra khi và chỉ khi cả hai biến cố $A$ và $B$ đồng thời xảy ra. Tập hợp các kết quả thuận lợi cho biến cố $AB$ chính là giao của hai tập hợp kết quả thuận lợi cho $A$ và cho $B$.',
        ],
        note: 'Biến cố đối của biến cố hợp $A \\cup B$ là $\\overline{A \\cup B} = \\overline{A} \\cap \\overline{B}$ (cả $A$ và $B$ đều không xảy ra). Biến cố đối của $AB$ là $\\overline{AB} = \\overline{A} \\cup \\overline{B}$ (ít nhất một trong hai biến cố không xảy ra).',
      },
      {
        title: '3. Biến cố độc lập',
        points: [
          '**Định nghĩa**: Một cách trực quan, hai biến cố $A$ và $B$ được gọi là độc lập nếu việc xảy ra hay không xảy ra của biến cố này không làm ảnh hưởng tới xác suất xảy ra của biến cố kia.',
          '**Chú ý**: Nếu $A, B$ là hai biến cố độc lập thì mỗi cặp biến cố sau cũng độc lập: $A$ và $\\overline{B}$; $\\overline{A}$ và $B$; $\\overline{A}$ và $\\overline{B}$.',
        ],
        note: 'Các phép thử tiến hành độc lập với nhau (như hai người bắn độc lập, gieo hai con xúc xắc độc lập, lấy thẻ có hoàn lại,...) sẽ dẫn đến các biến cố độc lập.',
      },
    ],
    formulas: [
      {
        name: 'Biến cố hợp $A \\cup B$ và biến cố giao $AB$',
        latex: '\\begin{cases} A \\cup B: & \\text{“}A \\text{ xảy ra hoặc } B \\text{ xảy ra” (ít nhất một biến cố xảy ra)} \\\\ AB = A \\cap B: & \\text{“Cả } A \\text{ và } B \\text{ cùng xảy ra”} \\end{cases}',
        description: 'Định nghĩa phép hợp và phép giao của hai biến cố trong không gian mẫu $\\Omega$.',
      },
      {
        name: 'Tính chất bảo toàn tính độc lập với biến cố đối',
        latex: 'A, B \\text{ độc lập} \\iff (A, \\overline{B}), \\ (\\overline{A}, B), \\ (\\overline{A}, \\overline{B}) \\text{ cũng là các cặp biến cố độc lập}',
        description: 'Chú ý quan trọng SGK trang 70 khi xét các bài toán xác suất.',
      },
    ],
  },
  {
    lessonId: 'bai-29',
    chapterId: 'chuong-8',
    lessonNumber: 'Bài 29',
    lessonTitle: 'Công thức cộng xác suất',
    fullName: 'Bài 29. Công thức cộng xác suất',
    volume: 2,
    pageNumber: 72,
    keyTerms: [
      'Hai biến cố xung khắc',
      'Công thức cộng xác suất cho hai biến cố xung khắc',
      'Công thức cộng xác suất',
    ],
    objectives: [
      'Nhận biết hai biến cố xung khắc.',
      'Giải thích được công thức cộng xác suất cho hai biến cố xung khắc và công thức cộng xác suất tổng quát.',
      'Tính được xác suất của biến cố hợp bằng cách sử dụng công thức cộng xác suất (kết hợp sử dụng sơ đồ hình cây hoặc bảng thống kê 2x2).',
    ],
    theorySections: [
      {
        title: '1. Công thức cộng xác suất cho hai biến cố xung khắc',
        points: [
          '**Biến cố xung khắc**: Biến cố $A$ và biến cố $B$ được gọi là xung khắc nếu $A$ và $B$ không đồng thời xảy ra, tức là $A \\cap B = \\varnothing$.',
          'Hai biến cố $A$ và $B$ là xung khắc khi và chỉ khi nếu biến cố này xảy ra thì biến cố kia không xảy ra.',
          '**Công thức cộng xác suất cho hai biến cố xung khắc**: Nếu $A$ và $B$ là hai biến cố xung khắc thì xác suất của biến cố $A \\cup B$ bằng tổng xác suất của $A$ và của $B$: $P(A \\cup B) = P(A) + P(B)$.',
        ],
        note: 'Hai biến cố đối nhau $A$ và $\\overline{A}$ luôn là hai biến cố xung khắc và $A \\cup \\overline{A} = \\Omega$, suy ra $P(A) + P(\\overline{A}) = P(\\Omega) = 1 \\iff P(\\overline{A}) = 1 - P(A)$. Tuy nhiên, hai biến cố xung khắc thì chưa chắc đã là hai biến cố đối nhau.',
      },
      {
        title: '2. Công thức cộng xác suất tổng quát',
        points: [
          '**Định lí (Công thức cộng xác suất)**: Cho hai biến cố $A$ và $B$ bất kì. Khi đó, ta có: $P(A \\cup B) = P(A) + P(B) - P(AB)$.',
          '**Hệ quả**: Từ công thức cộng xác suất, ta cũng suy ra cách tính xác suất của biến cố giao khi biết xác suất từng biến cố và biến cố hợp: $P(AB) = P(A) + P(B) - P(A \\cup B)$.',
        ],
        note: 'Công thức cộng xác suất cho hai biến cố xung khắc là hệ quả trực tiếp của công thức cộng xác suất tổng quát khi $AB = \\varnothing \\Rightarrow P(AB) = 0$.',
      },
    ],
    formulas: [
      {
        name: 'Công thức cộng xác suất cho hai biến cố xung khắc ($A \\cap B = \\varnothing$)',
        latex: 'P(A \\cup B) = P(A) + P(B); \\qquad P(\\overline{A}) = 1 - P(A)',
        description: 'Áp dụng khi hai biến cố $A$ và $B$ không thể đồng thời xảy ra.',
      },
      {
        name: 'Công thức cộng xác suất cho hai biến cố bất kì',
        latex: 'P(A \\cup B) = P(A) + P(B) - P(AB)',
        description: 'Công thức cộng xác suất tổng quát chuẩn SGK trang 74.',
      },
    ],
  },
  {
    lessonId: 'bai-30',
    chapterId: 'chuong-8',
    lessonNumber: 'Bài 30',
    lessonTitle: 'Công thức nhân xác suất cho hai biến cố độc lập',
    fullName: 'Bài 30. Công thức nhân xác suất cho hai biến cố độc lập',
    volume: 2,
    pageNumber: 76,
    keyTerms: [
      'Công thức nhân xác suất cho hai biến cố độc lập',
      'Sơ đồ hình cây',
    ],
    objectives: [
      'Giải thích được công thức nhân xác suất cho hai biến cố độc lập.',
      'Tính được xác suất của biến cố giao của hai biến cố độc lập bằng công thức nhân xác suất và sơ đồ hình cây.',
      'Vận dụng kết hợp công thức cộng xác suất, công thức nhân xác suất và biến cố đối để giải các bài toán thực tiễn.',
    ],
    theorySections: [
      {
        title: '1. Công thức nhân xác suất cho hai biến cố độc lập',
        points: [
          '**Công thức nhân xác suất**: Nếu hai biến cố $A$ và $B$ độc lập với nhau thì xác suất của biến cố giao $AB$ bằng tích xác suất của $A$ và $B$: $P(AB) = P(A) \\cdot P(B)$.',
          '**Chú ý**: Từ công thức nhân xác suất ta thấy, nếu $P(AB) \\neq P(A)P(B)$ thì hai biến cố $A$ và $B$ không độc lập.',
        ],
        note: 'Không được nhầm lẫn giữa "hai biến cố độc lập" ($P(AB) = P(A)P(B)$) và "hai biến cố xung khắc" ($AB = \\varnothing \\Rightarrow P(AB) = 0$). Nếu $P(A) > 0, P(B) > 0$ và $A, B$ xung khắc thì $A, B$ không thể độc lập.',
      },
      {
        title: '2. Vận dụng sơ đồ hình cây và biến cố đối',
        points: [
          'Với các cặp biến cố độc lập $(A, \\overline{B})$, $(\\overline{A}, B)$ và $(\\overline{A}, \\overline{B})$, ta cũng có: $P(A\\overline{B}) = P(A)P(\\overline{B})$, $P(\\overline{A}B) = P(\\overline{A})P(B)$ và $P(\\overline{A}\\overline{B}) = P(\\overline{A})P(\\overline{B})$.',
          'Để tính xác suất có ít nhất một trong hai biến cố độc lập $A, B$ xảy ra ($A \\cup B$), ngoài công thức $P(A \\cup B) = P(A) + P(B) - P(A)P(B)$, ta thường dùng biến cố đối: $P(A \\cup B) = 1 - P(\\overline{A}\\overline{B}) = 1 - P(\\overline{A})P(\\overline{B})$.',
        ],
        note: 'Mở rộng cho $n$ biến cố độc lập từng đôi và độc lập toàn phần $A_1, A_2, \\dots, A_n$: $P(A_1 A_2 \\cdots A_n) = P(A_1)P(A_2)\\cdots P(A_n)$.',
      },
    ],
    formulas: [
      {
        name: 'Công thức nhân xác suất cho hai biến cố độc lập $A$ và $B$',
        latex: 'P(AB) = P(A) \\cdot P(B)',
        description: 'Nếu $P(AB) \\neq P(A)P(B)$ thì $A$ và $B$ không độc lập.',
      },
      {
        name: 'Xác suất hợp của hai biến cố độc lập $A$ và $B$',
        latex: 'P(A \\cup B) = P(A) + P(B) - P(A)P(B) = 1 - P(\\overline{A})P(\\overline{B})',
        description: 'Xác suất để có ít nhất một trong hai biến cố độc lập xảy ra.',
      },
    ],
  },

  // ============================================================================
  // CHƯƠNG IX. ĐẠO HÀM
  // ============================================================================
  {
    lessonId: 'bai-31',
    chapterId: 'chuong-9',
    lessonNumber: 'Bài 31',
    lessonTitle: 'Định nghĩa và ý nghĩa của đạo hàm',
    fullName: 'Bài 31. Định nghĩa và ý nghĩa của đạo hàm',
    volume: 2,
    pageNumber: 81,
    keyTerms: [
      'Đạo hàm tại một điểm',
      'Đạo hàm trên một khoảng',
      'Vận tốc tức thời, cường độ tức thời',
      'Tiếp tuyến của đồ thị hàm số',
    ],
    objectives: [
      'Nhận biết một số bài toán dẫn đến khái niệm đạo hàm như: xác định vận tốc tức thời của một vật chuyển động không đều, xác định cường độ tức thời của dòng điện.',
      'Nhận biết định nghĩa đạo hàm. Tính đạo hàm của một số hàm đơn giản bằng định nghĩa.',
      'Nhận biết ý nghĩa hình học của đạo hàm. Thiết lập phương trình tiếp tuyến của đồ thị hàm số tại một điểm thuộc đồ thị.',
      'Vận dụng định nghĩa đạo hàm vào giải quyết một số bài toán thực tiễn.',
    ],
    theorySections: [
      {
        title: '1. Định nghĩa đạo hàm tại một điểm và trên một khoảng',
        points: [
          '**Định nghĩa đạo hàm tại một điểm**: Cho hàm số $y = f(x)$ xác định trên khoảng $(a; b)$ và điểm $x_0 \\in (a; b)$. Nếu tồn tại giới hạn hữu hạn $\\lim_{x \\to x_0} \\frac{f(x) - f(x_0)}{x - x_0}$ thì giới hạn đó được gọi là đạo hàm của hàm số $y = f(x)$ tại điểm $x_0$, kí hiệu bởi $f\'(x_0)$ (hoặc $y\'(x_0)$), tức là: $f\'(x_0) = \\lim_{x \\to x_0} \\frac{f(x) - f(x_0)}{x - x_0}$.',
          '**Chú ý**: Đặt $h = x - x_0$ (hay $\\Delta x = x - x_0$ gọi là số gia của đối số và $\\Delta y = f(x_0 + h) - f(x_0)$ gọi là số gia tương ứng của hàm số) thì: $f\'(x_0) = \\lim_{h \\to 0} \\frac{f(x_0 + h) - f(x_0)}{h}$.',
          '**Đạo hàm trên một khoảng**: Hàm số $y = f(x)$ được gọi là có đạo hàm trên khoảng $(a; b)$ nếu nó có đạo hàm $f\'(x)$ tại mọi điểm $x$ thuộc khoảng đó, kí hiệu là $y\' = f\'(x)$.',
        ],
        note: 'Nếu hàm số $y = f(x)$ có đạo hàm tại điểm $x_0$ thì nó liên tục tại điểm $x_0$. Chiều ngược lại không đúng (ví dụ hàm số $f(x) = |x|$ liên tục tại $x_0 = 0$ nhưng không có đạo hàm tại $x_0 = 0$).',
      },
      {
        title: '2. Ý nghĩa vật lí của đạo hàm',
        points: [
          '**Vận tốc tức thời**: Xét chuyển động thẳng xác định bởi phương trình $s = s(t)$, với $s(t)$ là một hàm số có đạo hàm. Vận tốc tức thời của chuyển động tại thời điểm $t_0$ là đạo hàm của hàm số $s = s(t)$ tại $t_0$: $v(t_0) = s\'(t_0)$.',
          '**Cường độ tức thời của dòng điện**: Nếu điện lượng $Q$ truyền trong dây dẫn theo thời gian $t$ biểu thị bởi hàm số $Q = Q(t)$ thì cường độ tức thời của dòng điện tại thời điểm $t_0$ là: $I(t_0) = Q\'(t_0)$.',
        ],
        note: 'Đạo hàm $f\'(x_0)$ biểu thị tốc độ thay đổi tức thời của đại lượng $y = f(x)$ theo đại lượng $x$ tại điểm $x_0$.',
      },
      {
        title: '3. Ý nghĩa hình học của đạo hàm',
        points: [
          '**Hệ số góc của tiếp tuyến**: Đạo hàm của hàm số $y = f(x)$ tại điểm $x_0$ là hệ số góc $k$ của tiếp tuyến $M_0T$ của đồ thị $(C)$ tại điểm $M_0(x_0; f(x_0))$: $k = f\'(x_0)$.',
          '**Phương trình tiếp tuyến**: Phương trình tiếp tuyến của đồ thị hàm số $y = f(x)$ tại điểm $M_0(x_0; y_0)$ (với $y_0 = f(x_0)$) là: $y - y_0 = f\'(x_0)(x - x_0)$ hay $y = f\'(x_0)(x - x_0) + f(x_0)$.',
        ],
        note: 'Nếu tiếp tuyến song song với đường thẳng $y = ax + b$ thì $f\'(x_0) = a$; nếu tiếp tuyến vuông góc với đường thẳng $y = ax + b$ ($a \\neq 0$) thì $f\'(x_0) \\cdot a = -1 \\iff f\'(x_0) = -\\frac{1}{a}$.',
      },
    ],
    formulas: [
      {
        name: 'Định nghĩa đạo hàm tại điểm $x_0$',
        latex: 'f\'(x_0) = \\lim_{x \\to x_0} \\frac{f(x) - f(x_0)}{x - x_0} = \\lim_{h \\to 0} \\frac{f(x_0 + h) - f(x_0)}{h}',
        description: 'Với $h = \\Delta x = x - x_0$ là số gia của biến số tại $x_0$.',
      },
      {
        name: 'Ý nghĩa vật lí của đạo hàm',
        latex: 'v(t_0) = s\'(t_0); \\qquad I(t_0) = Q\'(t_0)',
        description: 'Vận tốc tức thời của chuyển động và cường độ tức thời của dòng điện.',
      },
      {
        name: 'Hệ số góc và phương trình tiếp tuyến tại điểm $M_0(x_0; f(x_0))$',
        latex: 'k = f\'(x_0); \\qquad y - f(x_0) = f\'(x_0)(x - x_0)',
        description: 'Ý nghĩa hình học của đạo hàm chuẩn SGK trang 86.',
      },
    ],
  },
  {
    lessonId: 'bai-32',
    chapterId: 'chuong-9',
    lessonNumber: 'Bài 32',
    lessonTitle: 'Các quy tắc tính đạo hàm',
    fullName: 'Bài 32. Các quy tắc tính đạo hàm',
    volume: 2,
    pageNumber: 88,
    keyTerms: [
      'Đạo hàm của tổng, hiệu, tích, thương',
      'Hàm số hợp và đạo hàm của hàm số hợp',
      'Bảng đạo hàm của các hàm số sơ cấp cơ bản',
    ],
    objectives: [
      'Tính đạo hàm của một số hàm số sơ cấp cơ bản (như hàm đa thức, hàm căn thức đơn giản, hàm số lượng giác, hàm số mũ, hàm số lôgarit).',
      'Sử dụng các công thức tính đạo hàm của tổng, hiệu, tích, thương của các hàm số và đạo hàm của hàm hợp.',
      'Giải quyết một số vấn đề có liên quan đến môn học khác hoặc thực tiễn gắn với đạo hàm (ví dụ: xác định vận tốc tức thời của một vật chuyển động không đều,...).',
    ],
    theorySections: [
      {
        title: '1. Đạo hàm của một số hàm số thường gặp và quy tắc tổng, hiệu, tích, thương',
        points: [
          '**Đạo hàm của hàm số luỹ thừa và căn thức**: $(c)\' = 0$ ($c$ là hằng số); $(x)\' = 1$; $(x^n)\' = n x^{n-1}$ ($n \\in \\mathbb{N}^*$); $(\\sqrt{x})\' = \\frac{1}{2\\sqrt{x}}$ ($x > 0$). Tổng quát: $(x^\\alpha)\' = \\alpha x^{\\alpha - 1}$ ($x > 0, \\alpha \\in \\mathbb{R}$).',
          '**Đạo hàm của tổng, hiệu, tích, thương**: Giả sử các hàm số $u = u(x), v = v(x)$ có đạo hàm trên khoảng $(a; b)$. Khi đó trên $(a; b)$ ta có: $(u + v)\' = u\' + v\'$; $(u - v)\' = u\' - v\'$; $(uv)\' = u\'v + uv\'$; $(ku)\' = ku\'$ ($k$ là hằng số); $\\left(\\frac{u}{v}\\right)\' = \\frac{u\'v - uv\'}{v^2}$ ($v = v(x) \\neq 0$); $\\left(\\frac{1}{v}\\right)\' = -\\frac{v\'}{v^2}$.',
        ],
        note: 'Mở rộng cho tổng nhiều hàm số: $(u + v - w)\' = u\' + v\' - w\'$; tích 3 hàm số: $(uvw)\' = u\'vw + uv\'w + uvw\'$.',
      },
      {
        title: '2. Đạo hàm của hàm số hợp',
        points: [
          '**Khái niệm hàm số hợp**: Cho hàm số $u = g(x)$ xác định trên $(a; b)$ lấy giá trị trên $(c; d)$ và hàm số $y = f(u)$ xác định trên $(c; d)$. Hàm số $y = f(g(x))$ được gọi là hàm số hợp của hàm $y = f(u)$ với $u = g(x)$.',
          '**Định lí đạo hàm của hàm hợp**: Nếu hàm số $u = g(x)$ có đạo hàm tại $x$ là $u\'_x$ và hàm số $y = f(u)$ có đạo hàm tại $u$ là $y\'_u$ thì hàm hợp $y = f(g(x))$ có đạo hàm tại $x$ là: $y\'_x = y\'_u \\cdot u\'_x$.',
          'Hệ quả: $(u^n)\' = n u^{n-1} \\cdot u\'$; $(\\sqrt{u})\' = \\frac{u\'}{2\\sqrt{u}}$ ($u > 0$).',
        ],
        note: 'Khi tính đạo hàm của hàm hợp $f(u(x))$, sau khi áp dụng công thức đạo hàm theo $u$, luôn phải nhân thêm với $u\'(x)$.',
      },
      {
        title: '3. Đạo hàm của hàm số lượng giác, hàm số mũ và hàm số lôgarit',
        points: [
          '**Giới hạn đặc biệt**: $\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1$; $\\lim_{x \\to 0} (1 + x)^{\\frac{1}{x}} = e$; $\\lim_{x \\to 0} \\frac{\\ln(1 + x)}{x} = 1$; $\\lim_{x \\to 0} \\frac{e^x - 1}{x} = 1$.',
          '**Đạo hàm của các hàm số lượng giác**: $(\\sin x)\' = \\cos x$; $(\\cos x)\' = -\\sin x$; $(\\tan x)\' = \\frac{1}{\\cos^2 x}$ ($x \\neq \\frac{\\pi}{2} + k\\pi$); $(\\cot x)\' = -\\frac{1}{\\sin^2 x}$ ($x \\neq k\\pi$).',
          '**Đạo hàm của hàm số mũ và hàm số lôgarit**: $(e^x)\' = e^x$; $(a^x)\' = a^x \\ln a$ ($0 < a \\neq 1$); $(\\ln x)\' = \\frac{1}{x}$ ($x > 0$); $(\\log_a x)\' = \\frac{1}{x \\ln a}$ ($x > 0, 0 < a \\neq 1$).',
        ],
        note: 'Với $x \\neq 0$, ta có $(\\ln|x|)\' = \\frac{1}{x}$ và $(\\log_a|x|)\' = \\frac{1}{x \\ln a}$.',
      },
    ],
    formulas: [
      {
        name: 'Quy tắc tính đạo hàm của tổng, hiệu, tích, thương và hàm hợp',
        latex: '(u \\pm v)\' = u\' \\pm v\'; \\quad (uv)\' = u\'v + uv\'; \\quad \\left(\\frac{u}{v}\\right)\' = \\frac{u\'v - uv\'}{v^2}; \\quad \\left(\\frac{1}{v}\\right)\' = -\\frac{v\'}{v^2}; \\quad y\'_x = y\'_u \\cdot u\'_x',
        description: 'Các quy tắc tính đạo hàm cốt lõi chuẩn SGK trang 89–90.',
      },
      {
        name: 'Đạo hàm của hàm luỹ thừa và căn thức (cơ bản & hàm hợp)',
        latex: '(c)\' = 0; \\quad (x^n)\' = n x^{n-1}; \\quad (u^n)\' = n u^{n-1} u\'; \\quad (\\sqrt{x})\' = \\frac{1}{2\\sqrt{x}}; \\quad (\\sqrt{u})\' = \\frac{u\'}{2\\sqrt{u}}',
        description: 'Công thức đạo hàm của hàm đa thức và căn bậc hai.',
      },
      {
        name: 'Đạo hàm của các hàm số lượng giác (cơ bản & hàm hợp)',
        latex: '\\begin{cases} (\\sin x)\' = \\cos x, & (\\sin u)\' = u\'\\cos u \\\\ (\\cos x)\' = -\\sin x, & (\\cos u)\' = -u\'\\sin u \\\\ (\\tan x)\' = \\frac{1}{\\cos^2 x}, & (\\tan u)\' = \\frac{u\'}{\\cos^2 u} \\\\ (\\cot x)\' = -\\frac{1}{\\sin^2 x}, & (\\cot u)\' = -\\frac{u\'}{\\sin^2 u} \\end{cases}',
        description: 'Bảng đạo hàm 4 hàm số lượng giác và hàm hợp tương ứng.',
      },
      {
        name: 'Đạo hàm của hàm số mũ và hàm số lôgarit (cơ bản & hàm hợp)',
        latex: '\\begin{cases} (e^x)\' = e^x, & (e^u)\' = u\' e^u \\\\ (a^x)\' = a^x \\ln a, & (a^u)\' = u\' a^u \\ln a \\\\ (\\ln x)\' = \\frac{1}{x}, & (\\ln u)\' = \\frac{u\'}{u} \\\\ (\\log_a x)\' = \\frac{1}{x \\ln a}, & (\\log_a u)\' = \\frac{u\'}{u \\ln a} \\end{cases}',
        description: 'Bảng đạo hàm của hàm số mũ và lôgarit chuẩn SGK trang 93.',
      },
    ],
  },
  {
    lessonId: 'bai-33',
    chapterId: 'chuong-9',
    lessonNumber: 'Bài 33',
    lessonTitle: 'Đạo hàm cấp hai',
    fullName: 'Bài 33. Đạo hàm cấp hai',
    volume: 2,
    pageNumber: 95,
    keyTerms: [
      'Đạo hàm cấp hai',
      'Gia tốc tức thời',
    ],
    objectives: [
      'Nhận biết khái niệm đạo hàm cấp hai của một hàm số.',
      'Tính đạo hàm cấp hai của một số hàm số đơn giản.',
      'Vận dụng đạo hàm cấp hai để giải quyết một số bài toán thực tiễn (ví dụ: xác định gia tốc tức thời của chuyển động không đều, dao động điều hoà,...).',
    ],
    theorySections: [
      {
        title: '1. Định nghĩa đạo hàm cấp hai',
        points: [
          '**Định nghĩa**: Cho hàm số $y = f(x)$ có đạo hàm $f\'(x)$ tại mọi điểm $x \\in (a; b)$. Nếu hàm số $f\'(x)$ lại có đạo hàm tại $x$ thì ta gọi đạo hàm của $f\'(x)$ là đạo hàm cấp hai của hàm số $y = f(x)$ tại $x$ và kí hiệu là $f\'\'(x)$ hoặc $y\'\'$.',
          'Như vậy: $f\'\'(x) = [f\'(x)]\'$ hay $y\'\' = (y\')\'$.',
        ],
        note: 'Ví dụ: Với $f(x) = \\sin(\\omega t + \\varphi)$ ($\\omega, \\varphi$ là hằng số) thì $f\'(t) = \\omega \\cos(\\omega t + \\varphi)$ và $f\'\'(t) = -\\omega^2 \\sin(\\omega t + \\varphi) = -\\omega^2 f(t)$.',
      },
      {
        title: '2. Ý nghĩa cơ học của đạo hàm cấp hai',
        points: [
          '**Gia tốc tức thời**: Một chuyển động có phương trình $s = f(t)$ thì đạo hàm cấp hai (nếu có) của hàm số $f(t)$ là gia tốc tức thời của chuyển động. Ta có: $a(t) = v\'(t) = s\'\'(t) = f\'\'(t)$, trong đó $a(t)$ chính là gia tốc tức thời của chuyển động tại thời điểm $t$.',
        ],
        note: 'Nếu biết phương trình chuyển động $s = f(t)$, ta tính vận tốc tức thời $v(t) = s\'(t)$ và gia tốc tức thời $a(t) = v\'(t) = s\'\'(t)$. Tại thời điểm vật dừng lại thì $v(t) = 0$.',
      },
    ],
    formulas: [
      {
        name: 'Định nghĩa đạo hàm cấp hai của hàm số $y = f(x)$',
        latex: 'f\'\'(x) = \\left[f\'(x)\\right]\'; \\qquad y\'\' = (y\')\'',
        description: 'Đạo hàm của đạo hàm cấp một.',
      },
      {
        name: 'Ý nghĩa cơ học: Quãng đường, vận tốc tức thời và gia tốc tức thời',
        latex: 'v(t) = s\'(t) = f\'(t); \\qquad a(t) = v\'(t) = s\'\'(t) = f\'\'(t)',
        description: 'Gia tốc tức thời tại thời điểm $t$ bằng đạo hàm cấp hai của quãng đường theo thời gian.',
      },
    ],
  },
];
