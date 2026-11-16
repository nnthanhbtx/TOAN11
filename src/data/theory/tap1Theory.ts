export interface TheorySubsection {
  title: string;
  points: string[];
  note?: string;
}

export interface FormulaCard {
  name: string;
  latex: string;
  description?: string;
}

export interface LessonTheoryContent {
  lessonId: string;
  chapterId: string;
  lessonNumber: string;
  lessonTitle: string;
  fullName: string;
  volume: 1 | 2;
  pageNumber: number;
  keyTerms: string[];
  objectives: string[];
  theorySections: TheorySubsection[];
  formulas: FormulaCard[];
  tikzCode?: string;
  tikzCaption?: string;
}

export const tap1LessonTheory: LessonTheoryContent[] = [
  // ============================================================================
  // CHƯƠNG I. HÀM SỐ LƯỢNG GIÁC VÀ PHƯƠNG TRÌNH LƯỢNG GIÁC
  // ============================================================================
  {
    lessonId: 'bai-1',
    chapterId: 'chuong-1',
    lessonNumber: 'Bài 1',
    lessonTitle: 'Giá trị lượng giác của góc lượng giác',
    fullName: 'Bài 1. Giá trị lượng giác của góc lượng giác',
    volume: 1,
    pageNumber: 5,
    keyTerms: [
      'Góc lượng giác',
      'Số đo của góc lượng giác',
      'Đường tròn lượng giác',
      'Giá trị lượng giác của góc lượng giác',
      'Hệ thức cơ bản giữa các giá trị lượng giác',
    ],
    objectives: [
      'Nhận biết các khái niệm cơ bản về góc lượng giác và số đo của góc lượng giác.',
      'Mô tả bảng giá trị lượng giác của một số góc lượng giác thường gặp; hệ thức cơ bản giữa các giá trị lượng giác; quan hệ giữa các giá trị lượng giác của các góc có liên quan đặc biệt: đối nhau, bù nhau, phụ nhau, hơn kém nhau π.',
      'Giải quyết một số vấn đề thực tiễn gắn với giá trị lượng giác của góc lượng giác.',
    ],
    theorySections: [
      {
        title: '1. Góc lượng giác',
        points: [
          '**Khái niệm góc lượng giác:** Trong mặt phẳng, cho hai tia $Ou, Ov$. Xét tia $Om$ cùng nằm trong mặt phẳng này. Nếu tia $Om$ quay quanh điểm $O$, theo một chiều nhất định từ $Ou$ đến $Ov$, thì ta nói nó quét một **góc lượng giác** với tia đầu $Ou$, tia cuối $Ov$ và kí hiệu là $(Ou, Ov)$.',
          '**Quy ước chiều quay:** Chiều quay ngược với chiều quay của kim đồng hồ là **chiều dương**, chiều quay cùng chiều kim đồng hồ là **chiều âm**.',
          '**Số đo của góc lượng giác:** Khi tia $Om$ quay góc $\\alpha^\\circ$ (hoặc $\\alpha\\text{ rad}$) thì góc lượng giác mà tia đó quét nên có số đo $\\alpha^\\circ$ (hoặc $\\alpha\\text{ rad}$), kí hiệu $\\text{sđ}(Ou, Ov)$. Mỗi góc lượng giác gốc $O$ được xác định bởi tia đầu $Ou$, tia cuối $Ov$ và số đo của nó.',
          '**Hệ thức Chasles:** Với ba tia $Ou, Ov, Ow$ bất kì, ta có: $\\text{sđ}(Ou, Ov) + \\text{sđ}(Ov, Ow) = \\text{sđ}(Ou, Ow) + k360^\\circ \\ (k \\in \\mathbb{Z})$.',
        ],
        note: 'Cho hai tia $Ou, Ov$ thì có vô số góc lượng giác tia đầu $Ou$, tia cuối $Ov$. Số đo của các góc lượng giác này sai khác nhau một bội nguyên của $360^\\circ$ (hoặc $2\\pi\\text{ rad}$). Từ hệ thức Chasles suy ra với ba tia tuỳ ý $Ox, Ou, Ov$: $\\text{sđ}(Ou, Ov) = \\text{sđ}(Ox, Ov) - \\text{sđ}(Ox, Ou) + k360^\\circ \\ (k \\in \\mathbb{Z})$.',
      },
      {
        title: '2. Đơn vị đo góc và độ dài cung tròn',
        points: [
          '**Đơn vị độ:** Góc $1^\\circ$ bằng $\\frac{1}{180}$ góc bẹt. Các đơn vị nhỏ hơn: $1^\\circ = 60\'; \\ 1\' = 60\'\'$.',
          '**Đơn vị rađian:** Cho đường tròn $(O)$ tâm $O$, bán kính $R$ và một cung $AB$ trên $(O)$. Ta nói cung tròn $AB$ có số đo bằng $1\\text{ rađian}$ nếu độ dài của nó đúng bằng bán kính $R$. Khi đó góc $AOB$ có số đo bằng $1\\text{ rađian}$ và viết $\\widehat{AOB} = 1\\text{ rad}$.',
          '**Quan hệ giữa độ và rađian:** $360^\\circ = 2\\pi\\text{ rad} \\Rightarrow 180^\\circ = \\pi\\text{ rad}$, do đó $1^\\circ = \\frac{\\pi}{180}\\text{ rad}$ và $1\\text{ rad} = \\left(\\frac{180}{\\pi}\\right)^\\circ$.',
          '**Độ dài cung tròn:** Một cung của đường tròn bán kính $R$ và có số đo $\\alpha\\text{ rad}$ thì có độ dài $l = R\\alpha$.',
        ],
        note: 'Khi viết số đo của một góc theo đơn vị rađian, người ta thường không viết chữ $\\text{rad}$ sau số đo. Chẳng hạn góc $\\frac{\\pi}{2}$ được hiểu là góc $\\frac{\\pi}{2}\\text{ rad}$.',
      },
      {
        title: '3. Giá trị lượng giác của góc lượng giác',
        points: [
          '**Đường tròn lượng giác:** Là đường tròn có tâm tại gốc toạ độ $O(0; 0)$, bán kính bằng $1$, được định hướng (chiều dương ngược chiều kim đồng hồ, chiều âm cùng chiều kim đồng hồ) và lấy điểm $A(1; 0)$ làm điểm gốc của đường tròn.',
          '**Điểm biểu diễn góc lượng giác:** Điểm trên đường tròn lượng giác biểu diễn góc lượng giác có số đo $\\alpha$ (độ hoặc rađian) là điểm $M$ trên đường tròn lượng giác sao cho $\\text{sđ}(OA, OM) = \\alpha$.',
          '**Định nghĩa các giá trị lượng giác:** Giả sử $M(x; y)$ là điểm trên đường tròn lượng giác biểu diễn góc lượng giác có số đo $\\alpha$:\n• Hoành độ $x$ của điểm $M$ gọi là **côsin** của $\\alpha$, kí hiệu $\\cos\\alpha = x$.\n• Tung độ $y$ của điểm $M$ gọi là **sin** của $\\alpha$, kí hiệu $\\sin\\alpha = y$.\n• Nếu $\\cos\\alpha \\neq 0$, tỉ số $\\frac{\\sin\\alpha}{\\cos\\alpha}$ gọi là **tang** của $\\alpha$, kí hiệu $\\tan\\alpha = \\frac{\\sin\\alpha}{\\cos\\alpha} = \\frac{y}{x} \\ (x \\neq 0)$.\n• Nếu $\\sin\\alpha \\neq 0$, tỉ số $\\frac{\\cos\\alpha}{\\sin\\alpha}$ gọi là **côtang** của $\\alpha$, kí hiệu $\\cot\\alpha = \\frac{\\cos\\alpha}{\\sin\\alpha} = \\frac{x}{y} \\ (y \\neq 0)$.',
          '**Dấu của các giá trị lượng giác theo góc phần tư:**\n• Góc phần tư I ($0 < \\alpha < \\frac{\\pi}{2}$): $\\cos\\alpha > 0, \\ \\sin\\alpha > 0, \\ \\tan\\alpha > 0, \\ \\cot\\alpha > 0$.\n• Góc phần tư II ($\\frac{\\pi}{2} < \\alpha < \\pi$): $\\cos\\alpha < 0, \\ \\sin\\alpha > 0, \\ \\tan\\alpha < 0, \\ \\cot\\alpha < 0$.\n• Góc phần tư III ($\\pi < \\alpha < \\frac{3\\pi}{2}$): $\\cos\\alpha < 0, \\ \\sin\\alpha < 0, \\ \\tan\\alpha > 0, \\ \\cot\\alpha > 0$.\n• Góc phần tư IV ($\\frac{3\\pi}{2} < \\alpha < 2\\pi$): $\\cos\\alpha > 0, \\ \\sin\\alpha < 0, \\ \\tan\\alpha < 0, \\ \\cot\\alpha < 0$.',
        ],
        note: 'Trục tung $Oy$ gọi là trục sin, trục hoành $Ox$ gọi là trục côsin. Với mọi $\\alpha$: $-1 \\le \\sin\\alpha \\le 1; \\ -1 \\le \\cos\\alpha \\le 1$; $\\tan\\alpha$ xác định khi $\\alpha \\neq \\frac{\\pi}{2} + k\\pi \\ (k \\in \\mathbb{Z})$; $\\cot\\alpha$ xác định khi $\\alpha \\neq k\\pi \\ (k \\in \\mathbb{Z})$.',
      },
      {
        title: '4. Quan hệ giữa các giá trị lượng giác',
        points: [
          '**Các hệ thức lượng giác cơ bản:** Liên hệ trực tiếp giữa $\\sin\\alpha, \\cos\\alpha, \\tan\\alpha, \\cot\\alpha$ của cùng một góc lượng giác $\\alpha$.',
          '**Giá trị lượng giác của các góc có liên quan đặc biệt** (Quy tắc ghi nhớ: *"Cos đối, sin bù, phụ chéo, khác $\\pi$ tang và côtang"*):\n• **Góc đối nhau** ($\\alpha$ và $-\\alpha$): $\\cos(-\\alpha) = \\cos\\alpha$; $\\sin(-\\alpha) = -\\sin\\alpha$; $\\tan(-\\alpha) = -\\tan\\alpha$; $\\cot(-\\alpha) = -\\cot\\alpha$.\n• **Góc bù nhau** ($\\alpha$ và $\\pi - \\alpha$): $\\sin(\\pi - \\alpha) = \\sin\\alpha$; $\\cos(\\pi - \\alpha) = -\\cos\\alpha$; $\\tan(\\pi - \\alpha) = -\\tan\\alpha$; $\\cot(\\pi - \\alpha) = -\\cot\\alpha$.\n• **Góc phụ nhau** ($\\alpha$ và $\\frac{\\pi}{2} - \\alpha$): $\\sin\\left(\\frac{\\pi}{2} - \\alpha\\right) = \\cos\\alpha$; $\\cos\\left(\\frac{\\pi}{2} - \\alpha\\right) = \\sin\\alpha$; $\\tan\\left(\\frac{\\pi}{2} - \\alpha\\right) = \\cot\\alpha$; $\\cot\\left(\\frac{\\pi}{2} - \\alpha\\right) = \\tan\\alpha$.\n• **Góc hơn kém $\\pi$** ($\\alpha$ và $\\pi + \\alpha$): $\\sin(\\pi + \\alpha) = -\\sin\\alpha$; $\\cos(\\pi + \\alpha) = -\\cos\\alpha$; $\\tan(\\pi + \\alpha) = \\tan\\alpha$; $\\cot(\\pi + \\alpha) = \\cot\\alpha$.',
        ],
      },
    ],
    formulas: [
      {
        name: 'Hệ thức Chasles',
        latex: '\\text{sđ}(Ou, Ov) + \\text{sđ}(Ov, Ow) = \\text{sđ}(Ou, Ow) + k360^\\circ \\quad (k \\in \\mathbb{Z})',
        description: 'Suy ra: $\\text{sđ}(Ou, Ov) = \\text{sđ}(Ox, Ov) - \\text{sđ}(Ox, Ou) + k360^\\circ$',
      },
      {
        name: 'Đổi đơn vị Độ và Rađian',
        latex: '\\alpha^\\circ = \\alpha \\cdot \\frac{\\pi}{180}\\text{ rad}; \\quad \\alpha\\text{ rad} = \\left(\\alpha \\cdot \\frac{180}{\\pi}\\right)^\\circ',
        description: 'Quan hệ cơ sở: $180^\\circ = \\pi\\text{ rad}$',
      },
      {
        name: 'Độ dài cung tròn',
        latex: 'l = R\\alpha',
        description: 'Trong đó $R$ là bán kính đường tròn, $\\alpha$ là số đo cung tính bằng rađian ($\\text{rad}$)',
      },
      {
        name: 'Tính tuần hoàn chẵn vòng của sin và cos',
        latex: '\\sin(\\alpha + k2\\pi) = \\sin\\alpha; \\quad \\cos(\\alpha + k2\\pi) = \\cos\\alpha \\quad (k \\in \\mathbb{Z})',
        description: 'Tập giá trị: $-1 \\le \\sin\\alpha \\le 1$ và $-1 \\le \\cos\\alpha \\le 1$',
      },
      {
        name: 'Bốn hệ thức lượng giác cơ bản',
        latex: '\\sin^2\\alpha + \\cos^2\\alpha = 1; \\quad 1 + \\tan^2\\alpha = \\frac{1}{\\cos^2\\alpha}; \\quad 1 + \\cot^2\\alpha = \\frac{1}{\\sin^2\\alpha}; \\quad \\tan\\alpha \\cdot \\cot\\alpha = 1',
        description: 'Điều kiện: $\\cos\\alpha \\neq 0 \\iff \\alpha \\neq \\frac{\\pi}{2} + k\\pi$; $\\sin\\alpha \\neq 0 \\iff \\alpha \\neq k\\pi \\ (k \\in \\mathbb{Z})$',
      },
      {
        name: 'Hai góc đối nhau ($\\alpha$ và $-\\alpha$)',
        latex: '\\cos(-\\alpha) = \\cos\\alpha; \\quad \\sin(-\\alpha) = -\\sin\\alpha; \\quad \\tan(-\\alpha) = -\\tan\\alpha; \\quad \\cot(-\\alpha) = -\\cot\\alpha',
        description: 'Ghi nhớ: Cos đối',
      },
      {
        name: 'Hai góc bù nhau ($\\alpha$ và $\\pi - \\alpha$)',
        latex: '\\sin(\\pi - \\alpha) = \\sin\\alpha; \\quad \\cos(\\pi - \\alpha) = -\\cos\\alpha; \\quad \\tan(\\pi - \\alpha) = -\\tan\\alpha; \\quad \\cot(\\pi - \\alpha) = -\\cot\\alpha',
        description: 'Ghi nhớ: Sin bù',
      },
      {
        name: 'Hai góc phụ nhau ($\\alpha$ và $\\frac{\\pi}{2} - \\alpha$)',
        latex: '\\sin\\left(\\frac{\\pi}{2} - \\alpha\\right) = \\cos\\alpha; \\quad \\cos\\left(\\frac{\\pi}{2} - \\alpha\\right) = \\sin\\alpha; \\quad \\tan\\left(\\frac{\\pi}{2} - \\alpha\\right) = \\cot\\alpha; \\quad \\cot\\left(\\frac{\\pi}{2} - \\alpha\\right) = \\tan\\alpha',
        description: 'Ghi nhớ: Phụ chéo',
      },
      {
        name: 'Hai góc hơn kém $\\pi$ ($\\alpha$ và $\\pi + \\alpha$)',
        latex: '\\sin(\\pi + \\alpha) = -\\sin\\alpha; \\quad \\cos(\\pi + \\alpha) = -\\cos\\alpha; \\quad \\tan(\\pi + \\alpha) = \\tan\\alpha; \\quad \\cot(\\pi + \\alpha) = \\cot\\alpha',
        description: 'Ghi nhớ: Khác $\\pi$ tang và côtang',
      },
    ],
    tikzCode: `\\begin{tikzpicture}[scale=1.1, line join=round, line cap=round]
\\draw[->, thick] (-2.2,0) -- (2.3,0) node[below] {$x$};
\\draw[->, thick] (0,-2.2) -- (0,2.3) node[left] {$y$};
\\draw[thick, blue] (0,0) circle (1.6);
\\coordinate (O) at (0,0);
\\coordinate (A) at (1.6,0);
\\coordinate (M) at (1.03,1.22);
\\coordinate (H) at (1.03,0);
\\coordinate (K) at (0,1.22);
\\draw[dashed, gray] (M)--(H) (M)--(K);
\\draw[very thick, red] (O)--(M);
\\draw[->, thick, red] (0.55,0) arc (0:50:0.55);
\\node[above right, red] at (0.45,0.12) {$\\alpha$};
\\node[below left] at (0,0) {$O$};
\\node[below right] at (1.6,0) {$A(1;0)$};
\\node[above right, red] at (1.03,1.22) {$M(\\cos\\alpha;\\sin\\alpha)$};
\\node[below] at (1.03,0) {$\\cos\\alpha$};
\\node[left] at (0,1.22) {$\\sin\\alpha$};
\\fill (O) circle (1.5pt) (A) circle (1.5pt) (M) circle (1.8pt);
\\end{tikzpicture}`,
    tikzCaption: 'Đường tròn lượng giác tâm $O$ bán kính $R=1$, điểm biểu diễn $M(\\cos\\alpha; \\sin\\alpha)$ của góc lượng giác $\\alpha$',
  },
  {
    lessonId: 'bai-2',
    chapterId: 'chuong-1',
    lessonNumber: 'Bài 2',
    lessonTitle: 'Công thức lượng giác',
    fullName: 'Bài 2. Công thức lượng giác',
    volume: 1,
    pageNumber: 17,
    keyTerms: [
      'Công thức cộng',
      'Công thức nhân đôi',
      'Công thức hạ bậc',
      'Công thức biến đổi tích thành tổng',
      'Công thức biến đổi tổng thành tích',
    ],
    objectives: [
      'Mô tả các phép biến đổi lượng giác cơ bản: công thức cộng; công thức góc nhân đôi; công thức biến đổi tích thành tổng và công thức biến đổi tổng thành tích.',
      'Giải quyết một số vấn đề thực tiễn gắn với giá trị lượng giác của góc lượng giác và các phép biến đổi lượng giác.',
    ],
    theorySections: [
      {
        title: '1. Công thức cộng',
        points: [
          'Biểu diễn các giá trị lượng giác của tổng hoặc hiệu hai góc $a + b, \\ a - b$ thông qua các giá trị lượng giác của từng góc $a$ và $b$ (giả thiết các biểu thức đều có nghĩa).',
          'Quy tắc ghi nhớ nhanh: *"Sin thì sin cos cos sin, cos thì cos cos sin sin dấu trừ; Tang tổng thì lấy tổng tang, chia một trừ với tích tang dễ dàng"*.',
        ],
      },
      {
        title: '2. Công thức nhân đôi và công thức hạ bậc',
        points: [
          '**Công thức nhân đôi:** Cho $b = a$ trong các công thức cộng, ta thu được các công thức tính $\\sin 2a, \\ \\cos 2a, \\ \\tan 2a$ theo các giá trị lượng giác của góc $a$.',
          '**Công thức hạ bậc:** Từ công thức $\\cos 2a = 2\\cos^2 a - 1 = 1 - 2\\sin^2 a$, ta suy ra công thức biểu diễn $\\cos^2 a$ và $\\sin^2 a$ bậc nhất theo $\\cos 2a$.',
        ],
      },
      {
        title: '3. Công thức biến đổi tích thành tổng',
        points: [
          'Cộng hoặc trừ từng vế các công thức cộng $\\cos(a - b), \\ \\cos(a + b)$ và $\\sin(a - b), \\ \\sin(a + b)$, ta biến đổi tích của hai giá trị lượng giác thành tổng hoặc hiệu của hai giá trị lượng giác.',
        ],
      },
      {
        title: '4. Công thức biến đổi tổng thành tích',
        points: [
          'Đặt $u = a - b, \\ v = a + b$ (suy ra $a = \\frac{u+v}{2}, \\ b = \\frac{v-u}{2}$) trong các công thức biến đổi tích thành tổng, ta thu được các công thức biến đổi tổng hoặc hiệu hai giá trị lượng giác thành tích.',
        ],
      },
    ],
    formulas: [
      {
        name: 'Công thức cộng đối với côsin',
        latex: '\\cos(a - b) = \\cos a\\cos b + \\sin a\\sin b \\\\ \\cos(a + b) = \\cos a\\cos b - \\sin a\\sin b',
      },
      {
        name: 'Công thức cộng đối với sin',
        latex: '\\sin(a - b) = \\sin a\\cos b - \\cos a\\sin b \\\\ \\sin(a + b) = \\sin a\\cos b + \\cos a\\sin b',
      },
      {
        name: 'Công thức cộng đối với tang',
        latex: '\\tan(a - b) = \\frac{\\tan a - \\tan b}{1 + \\tan a\\tan b}; \\quad \\tan(a + b) = \\frac{\\tan a + \\tan b}{1 - \\tan a\\tan b}',
        description: 'Giả thiết các biểu thức đều có nghĩa',
      },
      {
        name: 'Công thức nhân đôi',
        latex: '\\sin 2a = 2\\sin a\\cos a \\\\ \\cos 2a = \\cos^2 a - \\sin^2 a = 2\\cos^2 a - 1 = 1 - 2\\sin^2 a \\\\ \\tan 2a = \\frac{2\\tan a}{1 - \\tan^2 a}',
      },
      {
        name: 'Công thức hạ bậc',
        latex: '\\cos^2 a = \\frac{1 + \\cos 2a}{2}; \\quad \\sin^2 a = \\frac{1 - \\cos 2a}{2}; \\quad \\tan^2 a = \\frac{1 - \\cos 2a}{1 + \\cos 2a}',
      },
      {
        name: 'Công thức biến đổi tích thành tổng',
        latex: '\\cos a\\cos b = \\frac{1}{2}[\\cos(a - b) + \\cos(a + b)] \\\\ \\sin a\\sin b = \\frac{1}{2}[\\cos(a - b) - \\cos(a + b)] \\\\ \\sin a\\cos b = \\frac{1}{2}[\\sin(a - b) + \\sin(a + b)]',
      },
      {
        name: 'Công thức biến đổi tổng thành tích',
        latex: '\\cos u + \\cos v = 2\\cos\\frac{u + v}{2}\\cos\\frac{u - v}{2} \\\\ \\cos u - \\cos v = -2\\sin\\frac{u + v}{2}\\sin\\frac{u - v}{2} \\\\ \\sin u + \\sin v = 2\\sin\\frac{u + v}{2}\\cos\\frac{u - v}{2} \\\\ \\sin u - \\sin v = 2\\cos\\frac{u + v}{2}\\sin\\frac{u - v}{2}',
      },
    ],
  },
  {
    lessonId: 'bai-3',
    chapterId: 'chuong-1',
    lessonNumber: 'Bài 3',
    lessonTitle: 'Hàm số lượng giác',
    fullName: 'Bài 3. Hàm số lượng giác',
    volume: 1,
    pageNumber: 22,
    keyTerms: [
      'Hàm số lượng giác',
      'Hàm số chẵn',
      'Hàm số lẻ',
      'Hàm số tuần hoàn',
      'Đồ thị của hàm số lượng giác',
    ],
    objectives: [
      'Nhận biết các khái niệm về hàm số chẵn, hàm số lẻ, hàm số tuần hoàn.',
      'Nhận biết các hàm số lượng giác y = sin x, y = cos x, y = tan x, y = cot x; giải thích tập xác định, tập giá trị, tính chất chẵn lẻ, tính tuần hoàn, chu kì, khoảng đồng biến và nghịch biến dựa vào đồ thị.',
      'Giải quyết một số vấn đề thực tiễn gắn với hàm số lượng giác.',
    ],
    theorySections: [
      {
        title: '1. Định nghĩa các hàm số lượng giác',
        points: [
          '**Hàm số sin:** Quy tắc đặt tương ứng mỗi số thực $x$ với số thực $\\sin x$ được gọi là hàm số sin, kí hiệu $y = \\sin x$. Tập xác định của hàm số sin là $D = \\mathbb{R}$.',
          '**Hàm số côsin:** Quy tắc đặt tương ứng mỗi số thực $x$ với số thực $\\cos x$ được gọi là hàm số côsin, kí hiệu $y = \\cos x$. Tập xác định của hàm số côsin là $D = \\mathbb{R}$.',
          '**Hàm số tang:** Hàm số cho bằng công thức $y = \\frac{\\sin x}{\\cos x}$ được gọi là hàm số tang, kí hiệu $y = \\tan x$. Tập xác định của hàm số tang là $D = \\mathbb{R} \\setminus \\left\\{\\frac{\\pi}{2} + k\\pi \\mid k \\in \\mathbb{Z}\\right\\}$.',
          '**Hàm số côtang:** Hàm số cho bằng công thức $y = \\frac{\\cos x}{\\sin x}$ được gọi là hàm số côtang, kí hiệu $y = \\cot x$. Tập xác định của hàm số côtang là $D = \\mathbb{R} \\setminus \\{k\\pi \\mid k \\in \\mathbb{Z}\\}$.',
        ],
      },
      {
        title: '2. Hàm số chẵn, hàm số lẻ, hàm số tuần hoàn',
        points: [
          '**Hàm số chẵn:** Hàm số $y = f(x)$ có tập xác định $D$ được gọi là hàm số chẵn nếu $\\forall x \\in D$ thì $-x \\in D$ và $f(-x) = f(x)$. Đồ thị của một hàm số chẵn nhận **trục tung** làm trục đối xứng.',
          '**Hàm số lẻ:** Hàm số $y = f(x)$ có tập xác định $D$ được gọi là hàm số lẻ nếu $\\forall x \\in D$ thì $-x \\in D$ và $f(-x) = -f(x)$. Đồ thị của một hàm số lẻ nhận **gốc toạ độ** làm tâm đối xứng.',
          '**Hàm số tuần hoàn:** Hàm số $y = f(x)$ có tập xác định $D$ được gọi là hàm số tuần hoàn nếu tồn tại số $T \\neq 0$ sao cho với mọi $x \\in D$ ta có: (i) $x + T \\in D$ và $x - T \\in D$; (ii) $f(x + T) = f(x)$. Số $T$ dương nhỏ nhất thoả mãn các điều kiện trên (nếu có) được gọi là **chu kì** của hàm số tuần hoàn đó.',
        ],
        note: 'Các hàm số $y = \\sin x$ và $y = \\cos x$ tuần hoàn với chu kì $2\\pi$. Các hàm số $y = \\tan x$ và $y = \\cot x$ tuần hoàn với chu kì $\\pi$. Tổng quát: $y = A\\sin\\omega x$ và $y = A\\cos\\omega x \\ (\\omega \\neq 0)$ tuần hoàn với chu kì $T = \\frac{2\\pi}{|\\omega|}$.',
      },
      {
        title: '3. Đồ thị và tính chất của 4 hàm số lượng giác cơ bản',
        points: [
          '**Hàm số $y = \\sin x$:**\n• Tập xác định: $\\mathbb{R}$; Tập giá trị: $[-1; 1]$.\n• Là hàm số **lẻ** và tuần hoàn với chu kì $2\\pi$.\n• Đồng biến trên mỗi khoảng $\\left(-\\frac{\\pi}{2} + k2\\pi; \\frac{\\pi}{2} + k2\\pi\\right)$ và nghịch biến trên mỗi khoảng $\\left(\\frac{\\pi}{2} + k2\\pi; \\frac{3\\pi}{2} + k2\\pi\\right), \\ k \\in \\mathbb{Z}$.\n• Có đồ thị đối xứng qua gốc toạ độ và gọi là một **đường hình sin**.',
          '**Hàm số $y = \\cos x$:**\n• Tập xác định: $\\mathbb{R}$; Tập giá trị: $[-1; 1]$.\n• Là hàm số **chẵn** và tuần hoàn với chu kì $2\\pi$.\n• Đồng biến trên mỗi khoảng $(-\\pi + k2\\pi; k2\\pi)$ và nghịch biến trên mỗi khoảng $(k2\\pi; \\pi + k2\\pi), \\ k \\in \\mathbb{Z}$.\n• Có đồ thị là một đường hình sin đối xứng qua trục tung.',
          '**Hàm số $y = \\tan x$:**\n• Tập xác định: $\\mathbb{R} \\setminus \\left\\{\\frac{\\pi}{2} + k\\pi \\mid k \\in \\mathbb{Z}\\right\\}$; Tập giá trị: $\\mathbb{R}$.\n• Là hàm số **lẻ** và tuần hoàn với chu kì $\\pi$.\n• Đồng biến trên mỗi khoảng $\\left(-\\frac{\\pi}{2} + k\\pi; \\frac{\\pi}{2} + k\\pi\\right), \\ k \\in \\mathbb{Z}$.\n• Có đồ thị đối xứng qua gốc toạ độ.',
          '**Hàm số $y = \\cot x$:**\n• Tập xác định: $\\mathbb{R} \\setminus \\{k\\pi \\mid k \\in \\mathbb{Z}\\}$; Tập giá trị: $\\mathbb{R}$.\n• Là hàm số **lẻ** và tuần hoàn với chu kì $\\pi$.\n• Nghịch biến trên mỗi khoảng $(k\\pi; \\pi + k\\pi), \\ k \\in \\mathbb{Z}$.\n• Có đồ thị đối xứng qua gốc toạ độ.',
        ],
      },
    ],
    formulas: [
      {
        name: 'Tập xác định của 4 hàm số lượng giác',
        latex: 'y = \\sin x, \\ y = \\cos x: D = \\mathbb{R} \\\\ y = \\tan x: D = \\mathbb{R} \\setminus \\left\\{\\frac{\\pi}{2} + k\\pi \\mid k \\in \\mathbb{Z}\\right\\} \\\\ y = \\cot x: D = \\mathbb{R} \\setminus \\{k\\pi \\mid k \\in \\mathbb{Z}\\}',
      },
      {
        name: 'Điều kiện hàm số chẵn và hàm số lẻ',
        latex: '\\text{Hàm chẵn: } \\forall x \\in D, -x \\in D \\text{ và } f(-x) = f(x) \\\\ \\text{Hàm lẻ: } \\forall x \\in D, -x \\in D \\text{ và } f(-x) = -f(x)',
        description: 'Trong 4 hàm lượng giác cơ bản, chỉ có $y = \\cos x$ là hàm số chẵn; $\\sin x, \\tan x, \\cot x$ đều là hàm số lẻ.',
      },
      {
        name: 'Chu kì tuần hoàn cơ bản và mở rộng',
        latex: 'T(\\sin x) = T(\\cos x) = 2\\pi; \\quad T(\\tan x) = T(\\cot x) = \\pi \\\\ T(A\\sin(\\omega x + \\varphi)) = T(A\\cos(\\omega x + \\varphi)) = \\frac{2\\pi}{|\\omega|} \\quad (\\omega \\neq 0)',
      },
    ],
  },
  {
    lessonId: 'bai-4',
    chapterId: 'chuong-1',
    lessonNumber: 'Bài 4',
    lessonTitle: 'Phương trình lượng giác cơ bản',
    fullName: 'Bài 4. Phương trình lượng giác cơ bản',
    volume: 1,
    pageNumber: 31,
    keyTerms: [
      'Phương trình tương đương',
      'Phương trình lượng giác cơ bản',
      'Công thức nghiệm',
    ],
    objectives: [
      'Nhận biết công thức nghiệm của phương trình lượng giác cơ bản bằng cách vận dụng đồ thị hàm số lượng giác tương ứng.',
      'Tính nghiệm gần đúng của phương trình lượng giác cơ bản bằng máy tính cầm tay.',
      'Giải phương trình lượng giác ở dạng vận dụng trực tiếp phương trình lượng giác cơ bản và giải quyết vấn đề thực tiễn.',
    ],
    theorySections: [
      {
        title: '1. Khái niệm phương trình tương đương',
        points: [
          'Hai phương trình được gọi là **tương đương** khi chúng có cùng tập nghiệm. Nếu phương trình $f(x) = 0$ tương đương với phương trình $g(x) = 0$ thì ta viết $f(x) = 0 \\Leftrightarrow g(x) = 0$.',
          'Các phép biến đổi tương đương cơ bản (không làm thay đổi điều kiện xác định):\n• Cộng hay trừ hai vế với cùng một số hoặc một biểu thức: $f(x) = g(x) \\Leftrightarrow f(x) + h(x) = g(x) + h(x)$.\n• Nhân hoặc chia hai vế với cùng một số khác $0$ hoặc với cùng một biểu thức luôn có giá trị khác $0$: $f(x) = g(x) \\Leftrightarrow f(x)h(x) = g(x)h(x), \\ (h(x) \\neq 0)$.',
        ],
        note: 'Hai phương trình vô nghiệm là tương đương.',
      },
      {
        title: '2. Phương trình sin x = m',
        points: [
          'Phương trình $\\sin x = m$ **có nghiệm khi và chỉ khi $|m| \\le 1$** (nếu $|m| > 1$ thì phương trình vô nghiệm).',
          'Khi $|m| \\le 1$, sẽ tồn tại duy nhất $\\alpha \\in \\left[-\\frac{\\pi}{2}; \\frac{\\pi}{2}\\right]$ thoả mãn $\\sin\\alpha = m$. Khi đó:\n$\\sin x = m \\Leftrightarrow \\sin x = \\sin\\alpha \\Leftrightarrow \\left[\\begin{array}{l} x = \\alpha + k2\\pi \\\\ x = \\pi - \\alpha + k2\\pi \\end{array}\\right. \\ (k \\in \\mathbb{Z})$.',
          'Nếu góc được cho bằng đơn vị độ: $\\sin x = \\sin\\alpha^\\circ \\Leftrightarrow \\left[\\begin{array}{l} x = \\alpha^\\circ + k360^\\circ \\\\ x = 180^\\circ - \\alpha^\\circ + k360^\\circ \\end{array}\\right. \\ (k \\in \\mathbb{Z})$.',
        ],
      },
      {
        title: '3. Phương trình cos x = m',
        points: [
          'Phương trình $\\cos x = m$ **có nghiệm khi và chỉ khi $|m| \\le 1$** (nếu $|m| > 1$ thì phương trình vô nghiệm).',
          'Khi $|m| \\le 1$, sẽ tồn tại duy nhất $\\alpha \\in [0; \\pi]$ thoả mãn $\\cos\\alpha = m$. Khi đó:\n$\\cos x = m \\Leftrightarrow \\cos x = \\cos\\alpha \\Leftrightarrow \\left[\\begin{array}{l} x = \\alpha + k2\\pi \\\\ x = -\\alpha + k2\\pi \\end{array}\\right. \\ (k \\in \\mathbb{Z})$.',
          'Nếu góc được cho bằng đơn vị độ: $\\cos x = \\cos\\alpha^\\circ \\Leftrightarrow \\left[\\begin{array}{l} x = \\alpha^\\circ + k360^\\circ \\\\ x = -\\alpha^\\circ + k360^\\circ \\end{array}\\right. \\ (k \\in \\mathbb{Z})$.',
        ],
      },
      {
        title: '4. Phương trình tan x = m và 5. Phương trình cot x = m',
        points: [
          '**Phương trình $\\tan x = m$:** Có nghiệm với **mọi $m \\in \\mathbb{R}$**. Với mọi $m \\in \\mathbb{R}$, tồn tại duy nhất $\\alpha \\in \\left(-\\frac{\\pi}{2}; \\frac{\\pi}{2}\\right)$ thoả mãn $\\tan\\alpha = m$. Khi đó: $\\tan x = m \\Leftrightarrow \\tan x = \\tan\\alpha \\Leftrightarrow x = \\alpha + k\\pi \\ (k \\in \\mathbb{Z})$.',
          '**Phương trình $\\cot x = m$:** Có nghiệm với **mọi $m \\in \\mathbb{R}$**. Với mọi $m \\in \\mathbb{R}$, tồn tại duy nhất $\\alpha \\in (0; \\pi)$ thoả mãn $\\cot\\alpha = m$. Khi đó: $\\cot x = m \\Leftrightarrow \\cot x = \\cot\\alpha \\Leftrightarrow x = \\alpha + k\\pi \\ (k \\in \\mathbb{Z})$.',
        ],
      },
    ],
    formulas: [
      {
        name: 'Công thức nghiệm của phương trình $\\sin u = \\sin v$',
        latex: '\\sin u = \\sin v \\Leftrightarrow \\left[\\begin{array}{l} u = v + k2\\pi \\\\ u = \\pi - v + k2\\pi \\end{array}\\right. \\quad (k \\in \\mathbb{Z})',
        description: 'Trường hợp đặc biệt: $\\sin x = 0 \\Leftrightarrow x = k\\pi$; $\\sin x = 1 \\Leftrightarrow x = \\frac{\\pi}{2} + k2\\pi$; $\\sin x = -1 \\Leftrightarrow x = -\\frac{\\pi}{2} + k2\\pi$',
      },
      {
        name: 'Công thức nghiệm của phương trình $\\cos u = \\cos v$',
        latex: '\\cos u = \\cos v \\Leftrightarrow \\left[\\begin{array}{l} u = v + k2\\pi \\\\ u = -v + k2\\pi \\end{array}\\right. \\quad (k \\in \\mathbb{Z})',
        description: 'Trường hợp đặc biệt: $\\cos x = 0 \\Leftrightarrow x = \\frac{\\pi}{2} + k\\pi$; $\\cos x = 1 \\Leftrightarrow x = k2\\pi$; $\\cos x = -1 \\Leftrightarrow x = \\pi + k2\\pi$',
      },
      {
        name: 'Công thức nghiệm của phương trình $\\tan u = \\tan v$',
        latex: '\\tan u = \\tan v \\Leftrightarrow u = v + k\\pi \\quad (k \\in \\mathbb{Z})',
        description: 'Điều kiện xác định: $u, v \\neq \\frac{\\pi}{2} + k\\pi \\ (k \\in \\mathbb{Z})$. Theo độ: $\\tan x = \\tan\\alpha^\\circ \\Leftrightarrow x = \\alpha^\\circ + k180^\\circ$',
      },
      {
        name: 'Công thức nghiệm của phương trình $\\cot u = \\cot v$',
        latex: '\\cot u = \\cot v \\Leftrightarrow u = v + k\\pi \\quad (k \\in \\mathbb{Z})',
        description: 'Điều kiện xác định: $u, v \\neq k\\pi \\ (k \\in \\mathbb{Z})$. Theo độ: $\\cot x = \\cot\\alpha^\\circ \\Leftrightarrow x = \\alpha^\\circ + k180^\\circ$',
      },
    ],
  },

  // ============================================================================
  // CHƯƠNG II. DÃY SỐ. CẤP SỐ CỘNG VÀ CẤP SỐ NHÂN
  // ============================================================================
  {
    lessonId: 'bai-5',
    chapterId: 'chuong-2',
    lessonNumber: 'Bài 5',
    lessonTitle: 'Dãy số',
    fullName: 'Bài 5. Dãy số',
    volume: 1,
    pageNumber: 42,
    keyTerms: ['Dãy số', 'Dãy số hữu hạn', 'Dãy số vô hạn', 'Dãy số tăng', 'Dãy số giảm', 'Dãy số bị chặn'],
    objectives: [
      'Nhận biết dãy số hữu hạn, dãy số vô hạn.',
      'Thể hiện cách cho dãy số bằng liệt kê các số hạng; bằng công thức tổng quát; bằng hệ thức truy hồi; bằng cách mô tả.',
      'Nhận biết tính chất tăng, giảm, bị chặn của dãy số trong những trường hợp đơn giản.',
    ],
    theorySections: [
      {
        title: '1. Định nghĩa dãy số',
        points: [
          '**Dãy số vô hạn:** Mỗi hàm số $u$ xác định trên tập các số nguyên dương $\\mathbb{N}^*$ được gọi là một **dãy số vô hạn** (gọi tắt là dãy số), kí hiệu là $u = u(n)$ hoặc $(u_n)$. Dạng khai triển: $u_1, u_2, u_3, \\dots, u_n, \\dots$ trong đó $u_1$ là **số hạng đầu**, $u_n$ là số hạng thứ $n$ và gọi là **số hạng tổng quát** của dãy số.',
          '**Dãy số hữu hạn:** Mỗi hàm số $u$ xác định trên tập $M = \\{1; 2; 3; \\dots; m\\}$ với $m \\in \\mathbb{N}^*$ được gọi là một **dãy số hữu hạn**. Dạng khai triển là $u_1, u_2, \\dots, u_m$, trong đó $u_1$ là **số hạng đầu**, $u_m$ là **số hạng cuối**.',
        ],
        note: 'Nếu $\\forall n \\in \\mathbb{N}^*, \\ u_n = c$ thì $(u_n)$ được gọi là dãy số không đổi.',
      },
      {
        title: '2. Các cách cho một dãy số',
        points: [
          'Một dãy số có thể cho bằng 4 cách:\n• Liệt kê các số hạng (chỉ dùng cho các dãy số hữu hạn và có ít số hạng).\n• Công thức của số hạng tổng quát $u_n$.\n• Phương pháp mô tả.\n• Phương pháp truy hồi (cho số hạng đầu hoặc vài số hạng đầu và hệ thức biểu thị số hạng thứ $n$ qua số hạng hoặc vài số hạng đứng trước nó).',
        ],
      },
      {
        title: '3. Dãy số tăng, dãy số giảm và dãy số bị chặn',
        points: [
          '**Dãy số tăng, dãy số giảm:**\n• Dãy số $(u_n)$ được gọi là **dãy số tăng** nếu ta có $u_{n+1} > u_n$ với mọi $n \\in \\mathbb{N}^*$.\n• Dãy số $(u_n)$ được gọi là **dãy số giảm** nếu ta có $u_{n+1} < u_n$ với mọi $n \\in \\mathbb{N}^*$.',
          '**Dãy số bị chặn:**\n• Dãy số $(u_n)$ được gọi là **bị chặn trên** nếu tồn tại một số $M$ sao cho $u_n \\le M$ với mọi $n \\in \\mathbb{N}^*$.\n• Dãy số $(u_n)$ được gọi là **bị chặn dưới** nếu tồn tại một số $m$ sao cho $u_n \\ge m$ với mọi $n \\in \\mathbb{N}^*$.\n• Dãy số $(u_n)$ được gọi là **bị chặn** nếu nó vừa bị chặn trên vừa bị chặn dưới, tức là tồn tại các số $m, M$ sao cho $m \\le u_n \\le M$ với mọi $n \\in \\mathbb{N}^*$.',
        ],
      },
    ],
    formulas: [
      {
        name: 'Điều kiện dãy số tăng và dãy số giảm',
        latex: '\\text{Dãy tăng: } u_{n+1} > u_n \\iff u_{n+1} - u_n > 0 \\quad (\\forall n \\in \\mathbb{N}^*) \\\\ \\text{Dãy giảm: } u_{n+1} < u_n \\iff u_{n+1} - u_n < 0 \\quad (\\forall n \\in \\mathbb{N}^*)',
      },
      {
        name: 'Điều kiện dãy số bị chặn',
        latex: '\\text{Bị chặn trên: } u_n \\le M; \\quad \\text{Bị chặn dưới: } u_n \\ge m; \\quad \\text{Bị chặn: } m \\le u_n \\le M \\quad (\\forall n \\in \\mathbb{N}^*)',
      },
    ],
  },
  {
    lessonId: 'bai-6',
    chapterId: 'chuong-2',
    lessonNumber: 'Bài 6',
    lessonTitle: 'Cấp số cộng',
    fullName: 'Bài 6. Cấp số cộng',
    volume: 1,
    pageNumber: 48,
    keyTerms: ['Cấp số cộng', 'Công sai', 'Số hạng tổng quát', 'Tổng của n số hạng đầu'],
    objectives: [
      'Nhận biết một dãy số là cấp số cộng.',
      'Giải thích công thức xác định số hạng tổng quát của cấp số cộng.',
      'Tính tổng của n số hạng đầu của cấp số cộng và giải quyết một số vấn đề thực tiễn.',
    ],
    theorySections: [
      {
        title: '1. Định nghĩa cấp số cộng',
        points: [
          '**Cấp số cộng** là một dãy số (hữu hạn hay vô hạn), trong đó kể từ số hạng thứ hai, mỗi số hạng đều bằng số hạng đứng ngay trước nó cộng với một số không đổi $d$. Số $d$ được gọi là **công sai** của cấp số cộng.',
          'Cấp số cộng $(u_n)$ với công sai $d$ được cho bởi hệ thức truy hồi: $u_n = u_{n-1} + d$ với $n \\ge 2$.',
        ],
        note: 'Để chứng minh dãy số $(u_n)$ là một cấp số cộng, ta chứng minh hiệu hai số hạng liên tiếp $u_n - u_{n-1} = d$ không đổi với mọi $n \\ge 2$. Dãy số không đổi $a, a, a, \\dots$ là một cấp số cộng có công sai $d = 0$.',
      },
      {
        title: '2. Số hạng tổng quát của cấp số cộng',
        points: [
          'Nếu cấp số cộng $(u_n)$ có số hạng đầu $u_1$ và công sai $d$ thì số hạng tổng quát $u_n$ của nó được xác định theo công thức: $u_n = u_1 + (n - 1)d \\ (n \\ge 2)$.',
          '**Tính chất trung bình cộng:** Trong một cấp số cộng $(u_n)$, mỗi số hạng (trừ số hạng đầu và số hạng cuối, nếu có) đều là trung bình cộng của hai số hạng đứng kề với nó: $u_k = \\frac{u_{k-1} + u_{k+1}}{2}$ với $k \\ge 2$.',
        ],
      },
      {
        title: '3. Tổng n số hạng đầu của một cấp số cộng',
        points: [
          'Cho cấp số cộng $(u_n)$ với số hạng đầu $u_1$ và công sai $d$. Đặt $S_n = u_1 + u_2 + \\dots + u_n$. Khi đó:\n$S_n = \\frac{n}{2}[2u_1 + (n - 1)d] = \\frac{n(u_1 + u_n)}{2}$.',
        ],
      },
    ],
    formulas: [
      {
        name: 'Hệ thức truy hồi & Công sai của cấp số cộng',
        latex: 'u_n = u_{n-1} + d \\iff d = u_n - u_{n-1} \\quad (n \\ge 2)',
      },
      {
        name: 'Số hạng tổng quát của cấp số cộng',
        latex: 'u_n = u_1 + (n - 1)d \\quad (n \\ge 2)',
        description: 'Mở rộng: $u_n = u_k + (n - k)d$',
      },
      {
        name: 'Tính chất trung bình cộng của 3 số hạng liên tiếp',
        latex: 'u_k = \\frac{u_{k-1} + u_{k+1}}{2} \\iff u_{k-1} + u_{k+1} = 2u_k \\quad (k \\ge 2)',
      },
      {
        name: 'Tổng $n$ số hạng đầu của cấp số cộng',
        latex: 'S_n = u_1 + u_2 + \\dots + u_n = \\frac{n(u_1 + u_n)}{2} = \\frac{n[2u_1 + (n - 1)d]}{2}',
      },
    ],
  },
  {
    lessonId: 'bai-7',
    chapterId: 'chuong-2',
    lessonNumber: 'Bài 7',
    lessonTitle: 'Cấp số nhân',
    fullName: 'Bài 7. Cấp số nhân',
    volume: 1,
    pageNumber: 52,
    keyTerms: ['Cấp số nhân', 'Công bội', 'Số hạng tổng quát', 'Tổng của n số hạng đầu'],
    objectives: [
      'Nhận biết một dãy số là cấp số nhân.',
      'Giải thích công thức xác định số hạng tổng quát của cấp số nhân.',
      'Tính tổng của n số hạng đầu của cấp số nhân và giải quyết một số bài toán thực tiễn.',
    ],
    theorySections: [
      {
        title: '1. Định nghĩa cấp số nhân',
        points: [
          '**Cấp số nhân** là một dãy số (hữu hạn hay vô hạn), trong đó kể từ số hạng thứ hai, mỗi số hạng đều là tích của số hạng đứng ngay trước nó với một số không đổi $q$. Số $q$ được gọi là **công bội** của cấp số nhân.',
          'Cấp số nhân $(u_n)$ với công bội $q$ được cho bởi hệ thức truy hồi: $u_n = u_{n-1} \\cdot q$ với $n \\ge 2$.',
        ],
        note: 'Để chứng minh dãy số $(u_n)$ gồm các số khác $0$ là một cấp số nhân, hãy chứng minh tỉ số $\\frac{u_n}{u_{n-1}} = q$ không đổi với mọi $n \\ge 2$. Dãy số không đổi $a, a, a, \\dots$ là một cấp số nhân với công bội $q = 1$.',
      },
      {
        title: '2. Số hạng tổng quát của cấp số nhân',
        points: [
          'Nếu một cấp số nhân có số hạng đầu $u_1$ và công bội $q$ thì **số hạng tổng quát** $u_n$ của nó được xác định bởi công thức: $u_n = u_1 \\cdot q^{n-1}$ với $n \\ge 2$.',
          '**Tính chất trung bình nhân:** Trong một cấp số nhân, bình phương của mỗi số hạng (trừ số hạng đầu và số hạng cuối, nếu có) đều là tích của hai số hạng đứng kề với nó: $u_k^2 = u_{k-1} \\cdot u_{k+1}$ với $k \\ge 2$.',
        ],
      },
      {
        title: '3. Tổng n số hạng đầu của một cấp số nhân',
        points: [
          'Cho cấp số nhân $(u_n)$ với công bội $q \\neq 1$. Đặt $S_n = u_1 + u_2 + \\dots + u_n$. Khi đó:\n$S_n = \\frac{u_1(1 - q^n)}{1 - q}$.',
        ],
        note: 'Nếu cấp số nhân có công bội $q = 1$ thì mọi số hạng đều bằng $u_1$, suy ra tổng $n$ số hạng đầu là $S_n = n \\cdot u_1$.',
      },
    ],
    formulas: [
      {
        name: 'Hệ thức truy hồi & Công bội của cấp số nhân',
        latex: 'u_n = u_{n-1} \\cdot q \\quad (n \\ge 2); \\quad q = \\frac{u_n}{u_{n-1}} \\ (u_{n-1} \\neq 0)',
      },
      {
        name: 'Số hạng tổng quát của cấp số nhân',
        latex: 'u_n = u_1 \\cdot q^{n-1} \\quad (n \\ge 2)',
        description: 'Mở rộng: $u_n = u_k \\cdot q^{n-k}$',
      },
      {
        name: 'Tính chất trung bình nhân của 3 số hạng liên tiếp',
        latex: 'u_k^2 = u_{k-1} \\cdot u_{k+1} \\iff |u_k| = \\sqrt{u_{k-1} \\cdot u_{k+1}} \\quad (k \\ge 2)',
      },
      {
        name: 'Tổng $n$ số hạng đầu của cấp số nhân',
        latex: 'S_n = \\frac{u_1(1 - q^n)}{1 - q} \\quad (q \\neq 1); \\qquad S_n = n \\cdot u_1 \\quad (q = 1)',
      },
    ],
  },

  // ============================================================================
  // CHƯƠNG III. CÁC SỐ ĐẶC TRƯNG ĐO XU THẾ TRUNG TÂM CỦA MẪU SỐ LIỆU GHÉP NHÓM
  // ============================================================================
  {
    lessonId: 'bai-8',
    chapterId: 'chuong-3',
    lessonNumber: 'Bài 8',
    lessonTitle: 'Mẫu số liệu ghép nhóm',
    fullName: 'Bài 8. Mẫu số liệu ghép nhóm',
    volume: 1,
    pageNumber: 58,
    keyTerms: ['Mẫu số liệu ghép nhóm', 'Nhóm số liệu [a; b)', 'Đầu mút trái, đầu mút phải', 'Độ dài nhóm', 'Tần số nhóm'],
    objectives: [
      'Đọc và giải thích mẫu số liệu ghép nhóm.',
      'Ghép nhóm mẫu số liệu từ mẫu số liệu không ghép nhóm.',
    ],
    theorySections: [
      {
        title: '1. Giới thiệu về mẫu số liệu ghép nhóm',
        points: [
          '**Mẫu số liệu ghép nhóm** là mẫu số liệu cho dưới dạng bảng tần số của các nhóm số liệu. Mỗi nhóm số liệu là tập hợp gồm các giá trị của số liệu được ghép nhóm theo một tiêu chí xác định.',
          'Nhóm số liệu thường được cho dưới dạng $[a; b)$, trong đó $a$ là **đầu mút trái**, $b$ là **đầu mút phải** (nhóm gồm các giá trị $x$ thoả mãn $a \\le x < b$). Trong một số trường hợp, nhóm số liệu cuối cùng có thể lấy cả đầu mút bên phải $[a; b]$.',
          'Mẫu số liệu ghép nhóm được dùng khi ta không thể thu thập được số liệu chính xác hoặc do yêu cầu của bài toán mà ta phải biểu diễn mẫu số liệu dưới dạng ghép nhóm để thuận lợi cho việc tổ chức, đọc và phân tích số liệu.',
        ],
      },
      {
        title: '2. Ghép nhóm mẫu số liệu',
        points: [
          'Để chuyển mẫu số liệu không ghép nhóm sang mẫu số liệu ghép nhóm, ta làm như sau:\n• **Bước 1:** Chia miền giá trị của mẫu số liệu thành một số nhóm theo tiêu chí cho trước.\n• **Bước 2:** Đếm số giá trị của mẫu số liệu thuộc mỗi nhóm (tần số) và lập bảng thống kê cho mẫu số liệu ghép nhóm.',
          '**Độ dài của nhóm $[a; b)$** là $L = b - a$.',
        ],
        note: 'Không nên chia thành quá nhiều nhóm hoặc quá ít nhóm. Các nhóm không giao nhau, các nhóm nên có độ dài như nhau và tổng độ dài các nhóm lớn hơn khoảng biến thiên $R = x_{\\max} - x_{\\min}$. Đối với số liệu rời rạc cho dưới dạng $k_1 - k_2 \\ (k_1, k_2 \\in \\mathbb{N})$, ta hiệu chỉnh thành nhóm $[k_1 - 0,5; k_2 + 0,5)$ trước khi tính các số đặc trưng.',
      },
    ],
    formulas: [
      {
        name: 'Độ dài của nhóm $[a_i; a_{i+1})$',
        latex: 'h_i = a_{i+1} - a_i',
      },
      {
        name: 'Giá trị đại diện của nhóm $[a_i; a_{i+1})$',
        latex: 'x_i = \\frac{a_i + a_{i+1}}{2}',
        description: 'Là trung bình cộng của hai đầu mút nhóm thứ $i$',
      },
      {
        name: 'Cỡ mẫu $n$ của bảng tần số ghép nhóm $k$ nhóm',
        latex: 'n = m_1 + m_2 + \\dots + m_k',
        description: 'Trong đó $m_i$ là tần số của nhóm thứ $i$',
      },
      {
        name: 'Quy tắc hiệu chỉnh nhóm số liệu rời rạc $k_1 - k_2$',
        latex: 'k_1 - k_2 \\longrightarrow [k_1 - 0,5; \\ k_2 + 0,5)',
      },
    ],
  },
  {
    lessonId: 'bai-9',
    chapterId: 'chuong-3',
    lessonNumber: 'Bài 9',
    lessonTitle: 'Các số đặc trưng đo xu thế trung tâm',
    fullName: 'Bài 9. Các số đặc trưng đo xu thế trung tâm',
    volume: 1,
    pageNumber: 62,
    keyTerms: ['Số trung bình', 'Trung vị', 'Tứ phân vị', 'Mốt'],
    objectives: [
      'Tính các số đặc trưng đo xu thế trung tâm (số trung bình, trung vị, tứ phân vị, mốt) của mẫu số liệu ghép nhóm.',
      'Hiểu ý nghĩa, vai trò của các số đặc trưng của mẫu số liệu thực tế.',
    ],
    theorySections: [
      {
        title: '1. Số trung bình của mẫu số liệu ghép nhóm',
        points: [
          'Cho mẫu số liệu ghép nhóm gồm $k$ nhóm $[a_i; a_{i+1})$ với tần số tương ứng $m_i \\ (i = 1, \\dots, k)$. **Số trung bình** của mẫu số liệu ghép nhóm, kí hiệu $\\bar{x}$, được tính bằng công thức:\n$\\bar{x} = \\frac{m_1 x_1 + m_2 x_2 + \\dots + m_k x_k}{n}$, trong đó $n = m_1 + \\dots + m_k$ là cỡ mẫu và $x_i = \\frac{a_i + a_{i+1}}{2}$ là giá trị đại diện của nhóm $[a_i; a_{i+1})$.',
          '**Ý nghĩa:** Số trung bình của mẫu số liệu ghép nhóm xấp xỉ cho số trung bình của mẫu số liệu gốc, nó cho biết vị trí trung tâm của mẫu số liệu và có thể dùng để đại diện cho mẫu số liệu.',
        ],
      },
      {
        title: '2. Trung vị của mẫu số liệu ghép nhóm',
        points: [
          '**Các bước tính trung vị $M_e$:**\n• **Bước 1:** Xác định nhóm chứa trung vị (nhóm đầu tiên có tần số tích luỹ lớn hơn hoặc bằng $\\frac{n}{2}$). Giả sử đó là nhóm thứ $p$: $[a_p; a_{p+1})$.\n• **Bước 2:** Trung vị là $M_e = a_p + \\frac{\\frac{n}{2} - (m_1 + \\dots + m_{p-1})}{m_p} \\cdot (a_{p+1} - a_p)$, trong đó $n$ là cỡ mẫu, $m_p$ là tần số nhóm $p$. Với $p = 1$, ta quy ước $m_1 + \\dots + m_{p-1} = 0$.',
          '**Ý nghĩa:** Trung vị của mẫu số liệu ghép nhóm xấp xỉ cho trung vị của mẫu số liệu gốc, nó chia mẫu số liệu thành hai phần, mỗi phần chứa $50\\%$ giá trị (không bị ảnh hưởng bởi các giá trị bất thường).',
        ],
      },
      {
        title: '3. Tứ phân vị của mẫu số liệu ghép nhóm',
        points: [
          '**Tứ phân vị thứ nhất $Q_1$:** Xác định nhóm chứa $Q_1$ (nhóm đầu tiên có tần số tích luỹ $\\ge \\frac{n}{4}$), giả sử là nhóm thứ $p$: $[a_p; a_{p+1})$. Khi đó:\n$Q_1 = a_p + \\frac{\\frac{n}{4} - (m_1 + \\dots + m_{p-1})}{m_p} \\cdot (a_{p+1} - a_p)$.',
          '**Tứ phân vị thứ hai $Q_2$:** Chính là trung vị $M_e$ ($Q_2 = M_e$).',
          '**Tứ phân vị thứ ba $Q_3$:** Xác định nhóm chứa $Q_3$ (nhóm đầu tiên có tần số tích luỹ $\\ge \\frac{3n}{4}$), giả sử là nhóm thứ $p$: $[a_p; a_{p+1})$. Khi đó:\n$Q_3 = a_p + \\frac{\\frac{3n}{4} - (m_1 + \\dots + m_{p-1})}{m_p} \\cdot (a_{p+1} - a_p)$.',
          '**Ý nghĩa:** Các tứ phân vị $Q_1, Q_2, Q_3$ chia mẫu số liệu thành $4$ phần, mỗi phần chứa $25\\%$ giá trị (lần lượt có $25\\%, 50\\%, 75\\%$ số giá trị nhỏ hơn $Q_1, Q_2, Q_3$).',
        ],
      },
      {
        title: '4. Mốt của mẫu số liệu ghép nhóm',
        points: [
          '**Các bước tìm mốt $M_o$** (chỉ định nghĩa cho mẫu ghép nhóm có độ dài các nhóm bằng nhau bằng $h$):\n• **Bước 1:** Xác định nhóm có tần số lớn nhất (gọi là **nhóm chứa mốt**), giả sử là nhóm $j$: $[a_j; a_{j+1})$.\n• **Bước 2:** Mốt được xác định là $M_o = a_j + \\frac{m_j - m_{j-1}}{(m_j - m_{j-1}) + (m_j - m_{j+1})} \\cdot h$, trong đó $m_j$ là tần số của nhóm $j$ (quy ước $m_0 = m_{k+1} = 0$) và $h = a_{j+1} - a_j$ là độ dài của nhóm.',
          '**Ý nghĩa:** Mốt của mẫu số liệu ghép nhóm xấp xỉ cho mốt của mẫu số liệu gốc, cho biết giá trị xuất hiện phổ biến nhất trong mẫu số liệu.',
        ],
        note: 'Khi tần số của các nhóm số liệu bằng nhau thì mẫu số liệu ghép nhóm không có mốt. Một mẫu có thể có nhiều hơn một mốt.',
      },
    ],
    formulas: [
      {
        name: 'Số trung bình cộng của mẫu số liệu ghép nhóm',
        latex: '\\bar{x} = \\frac{m_1 x_1 + m_2 x_2 + \\dots + m_k x_k}{n}, \\quad x_i = \\frac{a_i + a_{i+1}}{2}, \\quad n = \\sum_{i=1}^k m_i',
      },
      {
        name: 'Trung vị $M_e$ (cũng là tứ phân vị thứ hai $Q_2$)',
        latex: 'M_e = Q_2 = a_p + \\frac{\\frac{n}{2} - (m_1 + \\dots + m_{p-1})}{m_p} \\cdot (a_{p+1} - a_p)',
        description: 'Nhóm $p$: $[a_p; a_{p+1})$ là nhóm chứa trung vị (quy ước $m_1 + \\dots + m_{p-1} = 0$ nếu $p = 1$)',
      },
      {
        name: 'Tứ phân vị thứ nhất $Q_1$ và thứ ba $Q_3$',
        latex: 'Q_1 = a_p + \\frac{\\frac{n}{4} - (m_1 + \\dots + m_{p-1})}{m_p} \\cdot (a_{p+1} - a_p) \\\\ Q_3 = a_p + \\frac{\\frac{3n}{4} - (m_1 + \\dots + m_{p-1})}{m_p} \\cdot (a_{p+1} - a_p)',
      },
      {
        name: 'Mốt $M_o$ của mẫu số liệu ghép nhóm',
        latex: 'M_o = a_j + \\frac{m_j - m_{j-1}}{(m_j - m_{j-1}) + (m_j - m_{j+1})} \\cdot h',
        description: 'Nhóm $j$: $[a_j; a_{j+1})$ có tần số $m_j$ lớn nhất; $h = a_{j+1} - a_j$; quy ước $m_0 = m_{k+1} = 0$',
      },
    ],
  },

  // ============================================================================
  // CHƯƠNG IV. QUAN HỆ SONG SONG TRONG KHÔNG GIAN
  // ============================================================================
  {
    lessonId: 'bai-10',
    chapterId: 'chuong-4',
    lessonNumber: 'Bài 10',
    lessonTitle: 'Đường thẳng và mặt phẳng trong không gian',
    fullName: 'Bài 10. Đường thẳng và mặt phẳng trong không gian',
    volume: 1,
    pageNumber: 70,
    keyTerms: [
      'Mặt phẳng',
      'Điểm thuộc mặt phẳng',
      'Các điểm đồng phẳng',
      'Giao tuyến của hai mặt phẳng',
      'Hình chóp và hình tứ diện',
    ],
    objectives: [
      'Nhận biết các quan hệ liên thuộc cơ bản giữa điểm, đường thẳng, mặt phẳng trong không gian.',
      'Mô tả ba cách xác định mặt phẳng; xác định giao tuyến của hai mặt phẳng, giao điểm của đường thẳng và mặt phẳng.',
      'Nhận biết hình chóp và hình tứ diện.',
    ],
    theorySections: [
      {
        title: '1. Khái niệm mở đầu & Quy tắc vẽ hình biểu diễn',
        points: [
          'Điểm $A$ thuộc mặt phẳng $(P)$, kí hiệu $A \\in (P)$ (nói $A$ nằm trên $(P)$, hoặc $(P)$ chứa $A$, hoặc $(P)$ đi qua $A$). Điểm $B$ không thuộc mặt phẳng $(P)$, kí hiệu $B \\notin (P)$.',
          '**Quy tắc vẽ hình biểu diễn của một hình không gian:**\n• Hình biểu diễn của đường thẳng là đường thẳng, của đoạn thẳng là đoạn thẳng.\n• Hình biểu diễn của hai đường thẳng song song là hai đường thẳng song song, của hai đường thẳng cắt nhau là hai đường thẳng cắt nhau.\n• Hình biểu diễn giữ nguyên quan hệ liên thuộc giữa điểm và đường thẳng.\n• Dùng **nét vẽ liền** để biểu diễn cho đường nhìn thấy và **nét đứt đoạn** để biểu diễn cho đường bị che khuất.',
        ],
      },
      {
        title: '2. Các tính chất thừa nhận của hình học không gian',
        points: [
          '**Tính chất 1:** Có một và chỉ một đường thẳng đi qua hai điểm phân biệt.',
          '**Tính chất 2:** Có một và chỉ một mặt phẳng đi qua ba điểm không thẳng hàng.',
          '**Tính chất 3:** Tồn tại bốn điểm không cùng thuộc một mặt phẳng (không đồng phẳng).',
          '**Tính chất 4:** Nếu một đường thẳng có hai điểm phân biệt thuộc một mặt phẳng thì tất cả các điểm của đường thẳng đều thuộc mặt phẳng đó (kí hiệu $d \\subset (P)$ hoặc $(P) \\supset d$).',
          '**Tính chất 5:** Nếu hai mặt phẳng phân biệt có điểm chung thì các điểm chung của hai mặt phẳng là một đường thẳng đi qua điểm chung đó (đường thẳng chung $d = (P) \\cap (Q)$ gọi là **giao tuyến** của hai mặt phẳng).',
          '**Tính chất 6:** Trên mỗi mặt phẳng, tất cả các kết quả đã biết trong hình học phẳng đều đúng.',
        ],
      },
      {
        title: '3. Ba cách xác định một mặt phẳng',
        points: [
          '**Cách 1:** Một mặt phẳng được hoàn toàn xác định khi biết nó đi qua **ba điểm không thẳng hàng**, kí hiệu $(ABC)$.',
          '**Cách 2:** Một mặt phẳng được hoàn toàn xác định khi biết nó đi qua **một điểm và chứa một đường thẳng không đi qua điểm đó**, kí hiệu $\\text{mp}(A, d)$.',
          '**Cách 3:** Một mặt phẳng được hoàn toàn xác định khi biết nó chứa **hai đường thẳng cắt nhau**, kí hiệu $\\text{mp}(a, b)$.',
        ],
      },
      {
        title: '4. Hình chóp và hình tứ diện',
        points: [
          '**Hình chóp $S.A_1A_2\\dots A_n$:** Cho đa giác lồi $A_1A_2\\dots A_n$ và điểm $S$ nằm ngoài mặt phẳng chứa đa giác đó. Nối $S$ với các đỉnh $A_1, A_2, \\dots, A_n$ để được $n$ tam giác $SA_1A_2, SA_2A_3, \\dots, SA_nA_1$. Điểm $S$ gọi là **đỉnh**, đa giác $A_1A_2\\dots A_n$ gọi là **mặt đáy**, các tam giác $SA_1A_2, \\dots$ gọi là các **mặt bên**, các đoạn $SA_1, \\dots$ gọi là các **cạnh bên**, các cạnh $A_1A_2, \\dots$ gọi là các **cạnh đáy**.',
          '**Hình tứ diện $ABCD$:** Cho bốn điểm $A, B, C, D$ không đồng phẳng. Hình gồm bốn tam giác $ABC, ACD, ABD, BCD$ được gọi là **hình tứ diện** (có $4$ đỉnh, $6$ cạnh, $4$ mặt). Hai cạnh không có đỉnh chung gọi là **hai cạnh đối diện** ($AB$ và $CD$, $AC$ và $BD$, $AD$ và $BC$). Hình tứ diện có bốn mặt là các tam giác đều gọi là **hình tứ diện đều**.',
        ],
      },
    ],
    formulas: [
      {
        name: 'Phương pháp tìm giao tuyến của hai mặt phẳng $(P)$ và $(Q)$',
        latex: '\\left.\\begin{array}{l} A \\in (P) \\cap (Q) \\\\ B \\in (P) \\cap (Q) \\ (A \\neq B) \\end{array}\\right\\} \\Rightarrow (P) \\cap (Q) = AB',
        description: 'Tìm hai điểm chung phân biệt của hai mặt phẳng',
      },
      {
        name: 'Phương pháp tìm giao điểm của đường thẳng $d$ và mặt phẳng $(P)$',
        latex: '\\left.\\begin{array}{l} a \\subset (P) \\\\ d \\cap a = \\{I\\} \\end{array}\\right\\} \\Rightarrow d \\cap (P) = \\{I\\}',
        description: 'Tìm giao điểm của $d$ với một đường thẳng $a$ nằm trong mặt phẳng $(P)$',
      },
      {
        name: 'Số đỉnh, số cạnh, số mặt của hình chóp có đáy là $n$-giác ($n \\ge 3$)',
        latex: '\\text{Số đỉnh} = n + 1; \\quad \\text{Số mặt} = n + 1; \\quad \\text{Số cạnh} = 2n',
        description: 'Với tứ diện ($n = 3$): $4$ đỉnh, $4$ mặt, $6$ cạnh ($3$ cặp cạnh đối diện)',
      },
    ],
    tikzCode: `\\begin{tikzpicture}[scale=1, line join=round, line cap=round]
\\coordinate (A) at (0,0);
\\coordinate (B) at (-1.2,-1.15);
\\coordinate (C) at (2.2,-1.15);
\\coordinate (D) at (3.4,0);
\\coordinate (O) at (1.1,-0.575);
\\coordinate (S) at (1.1,2.8);
\\draw[dashed, thick] (S)--(A) (A)--(B) (A)--(D) (A)--(C) (B)--(D);
\\draw[dashed, very thick, red] (S)--(O);
\\draw[thick] (S)--(B) (S)--(C) (S)--(D) (B)--(C) (C)--(D);
\\foreach \\p/\\pos in {S/above, A/above left, B/below left, C/below right, D/right, O/below}
  \\fill (\\p) circle (1.5pt) node[\\pos] {$\\p$};
\\end{tikzpicture}`,
    tikzCaption: 'Hình chóp tứ giác $S.ABCD$ với giao tuyến $SO = (SAC) \\cap (SBD)$ (nét liền cho đường nhìn thấy, nét đứt cho đường bị khuất)',
  },
  {
    lessonId: 'bai-11',
    chapterId: 'chuong-4',
    lessonNumber: 'Bài 11',
    lessonTitle: 'Hai đường thẳng song song',
    fullName: 'Bài 11. Hai đường thẳng song song',
    volume: 1,
    pageNumber: 78,
    keyTerms: ['Hai đường thẳng đồng phẳng', 'Hai đường thẳng song song', 'Hai đường thẳng chéo nhau', 'Định lí ba đường giao tuyến'],
    objectives: [
      'Nhận biết vị trí tương đối của hai đường thẳng trong không gian: trùng nhau, song song, cắt nhau, chéo nhau.',
      'Giải thích tính chất cơ bản của hai đường thẳng song song trong không gian và định lí về ba đường giao tuyến.',
    ],
    theorySections: [
      {
        title: '1. Vị trí tương đối của hai đường thẳng trong không gian',
        points: [
          'Cho hai đường thẳng $a$ và $b$ trong không gian:\n• **Trường hợp 1 ($a$ và $b$ đồng phẳng):** Có 3 vị trí tương đối: **cắt nhau** ($a \\cap b = \\{M\\}$), **song song** ($a \\parallel b$, không có điểm chung), hoặc **trùng nhau** ($a \\equiv b$).\n• **Trường hợp 2 ($a$ và $b$ không cùng nằm trong bất kì mặt phẳng nào):** Ta nói $a$ và $b$ **chéo nhau** (không đồng phẳng và không có điểm chung).',
          '**Định nghĩa hai đường thẳng song song:** Hai đường thẳng song song là hai đường thẳng **đồng phẳng** và **không có điểm chung**. Có đúng một mặt phẳng chứa hai đường thẳng song song.',
        ],
      },
      {
        title: '2. Tính chất của hai đường thẳng song song',
        points: [
          '**Định lí 1:** Trong không gian, qua một điểm không nằm trên đường thẳng cho trước, có đúng một đường thẳng song song với đường thẳng đã cho.',
          '**Định lí 2:** Trong không gian, hai đường thẳng phân biệt cùng song song với đường thẳng thứ ba thì song song với nhau ($a \\parallel c, \\ b \\parallel c \\Rightarrow a \\parallel b$).',
          '**Định lí 3 (Định lí về ba đường giao tuyến):** Nếu ba mặt phẳng đôi một cắt nhau theo ba giao tuyến phân biệt thì ba giao tuyến đó **đồng quy** hoặc **đôi một song song** với nhau.',
          '**Hệ quả:** Nếu hai mặt phẳng phân biệt chứa hai đường thẳng song song với nhau thì giao tuyến của chúng (nếu có) song song với hai đường thẳng đó hoặc trùng với một trong hai đường thẳng đó.',
        ],
      },
    ],
    formulas: [
      {
        name: 'Tính chất bắc cầu của quan hệ song song',
        latex: '\\left.\\begin{array}{l} a \\parallel c \\\\ b \\parallel c \\ (a \\neq b) \\end{array}\\right\\} \\Rightarrow a \\parallel b',
      },
      {
        name: 'Hệ quả giao tuyến của hai mặt phẳng chứa hai đường thẳng song song',
        latex: '\\left.\\begin{array}{l} a \\subset (P), \\ b \\subset (Q) \\\\ a \\parallel b \\\\ (P) \\cap (Q) = d \\end{array}\\right\\} \\Rightarrow d \\parallel a \\parallel b \\quad (\\text{hoặc } d \\equiv a, \\ d \\equiv b)',
      },
    ],
    tikzCode: `\\begin{tikzpicture}[scale=1, line join=round, line cap=round]
\\coordinate (A) at (1.6,2.7);
\\coordinate (B) at (0,0);
\\coordinate (C) at (1.8,-1.1);
\\coordinate (D) at (3.8,0);
\\coordinate (M) at (0.8,1.35);
\\coordinate (N) at (2.7,1.35);
\\draw[dashed, thick] (B)--(D);
\\draw[thick] (A)--(B)--(C)--(D)--cycle (A)--(C);
\\draw[very thick, red] (M)--(N);
\\foreach \\p/\\pos in {A/above, B/left, C/below, D/right, M/left, N/right}
  \\fill (\\p) circle (1.5pt) node[\\pos] {$\\p$};
\\end{tikzpicture}`,
    tikzCaption: 'Tứ diện $ABCD$ có $M, N$ là trung điểm $AB, AD \\Rightarrow MN \\parallel BD$ và $BC, AD$ là hai đường thẳng chéo nhau',
  },
  {
    lessonId: 'bai-12',
    chapterId: 'chuong-4',
    lessonNumber: 'Bài 12',
    lessonTitle: 'Đường thẳng và mặt phẳng song song',
    fullName: 'Bài 12. Đường thẳng và mặt phẳng song song',
    volume: 1,
    pageNumber: 84,
    keyTerms: ['Đường thẳng song song với mặt phẳng', 'Đường thẳng cắt mặt phẳng', 'Đường thẳng nằm trong mặt phẳng'],
    objectives: [
      'Nhận biết đường thẳng song song với mặt phẳng.',
      'Giải thích điều kiện để đường thẳng song song với mặt phẳng và các tính chất cơ bản.',
    ],
    theorySections: [
      {
        title: '1. Đường thẳng song song với mặt phẳng',
        points: [
          'Cho đường thẳng $d$ và mặt phẳng $(\\alpha)$. Phụ thuộc vào số điểm chung của $d$ và $(\\alpha)$, ta có 3 vị trí tương đối:\n• **$d$ và $(\\alpha)$ không có điểm chung:** Ta nói $d$ **song song** với $(\\alpha)$, kí hiệu $d \\parallel (\\alpha)$ hay $(\\alpha) \\parallel d$.\n• **$d$ và $(\\alpha)$ có một điểm chung duy nhất $M$:** Ta nói $d$ và $(\\alpha)$ **cắt nhau** tại điểm $M$, kí hiệu $d \\cap (\\alpha) = \\{M\\}$.\n• **$d$ và $(\\alpha)$ có nhiều hơn một điểm chung:** Ta nói $d$ **nằm trong** $(\\alpha)$, kí hiệu $d \\subset (\\alpha)$ hay $(\\alpha) \\supset d$.',
        ],
      },
      {
        title: '2. Điều kiện và tính chất của đường thẳng song song với mặt phẳng',
        points: [
          '**Định lí 1 (Dấu hiệu nhận biết):** Nếu đường thẳng $a$ không nằm trong mặt phẳng $(P)$ và song song với một đường thẳng $b$ nằm trong $(P)$ thì $a$ song song với $(P)$.',
          '**Định lí 2 (Tính chất giao tuyến):** Cho đường thẳng $a$ song song với mặt phẳng $(P)$. Nếu mặt phẳng $(Q)$ chứa $a$ và cắt $(P)$ theo giao tuyến $b$ thì $b$ song song với $a$.',
          '**Chú ý (Hai đường thẳng chéo nhau):** Cho trước hai đường thẳng chéo nhau $a$ và $b$, có **duy nhất** một mặt phẳng chứa đường thẳng này và song song với đường thẳng kia.',
        ],
      },
    ],
    formulas: [
      {
        name: 'Dấu hiệu nhận biết đường thẳng song song mặt phẳng',
        latex: '\\left.\\begin{array}{l} a \\not\\subset (P) \\\\ a \\parallel b \\\\ b \\subset (P) \\end{array}\\right\\} \\Rightarrow a \\parallel (P)',
      },
      {
        name: 'Định lí tính chất của đường thẳng song song mặt phẳng',
        latex: '\\left.\\begin{array}{l} a \\parallel (P) \\\\ a \\subset (Q) \\\\ (P) \\cap (Q) = b \\end{array}\\right\\} \\Rightarrow b \\parallel a',
      },
      {
        name: 'Giao tuyến của hai mặt phẳng cùng song song với một đường thẳng',
        latex: '\\left.\\begin{array}{l} (P) \\cap (Q) = d \\\\ a \\parallel (P), \\ a \\parallel (Q) \\end{array}\\right\\} \\Rightarrow d \\parallel a',
      },
    ],
    tikzCode: `\\begin{tikzpicture}[scale=1, line join=round, line cap=round]
\\coordinate (P1) at (0,0);
\\coordinate (P2) at (4.2,0);
\\coordinate (P3) at (5.2,1.5);
\\coordinate (P4) at (1.0,1.5);
\\draw[thick] (P1)--(P2)--(P3)--(P4)--cycle;
\\draw[dashed, gray] (1.3,2.3)--(1.3,0.75) (3.9,2.3)--(3.9,0.75);
\\draw[very thick, blue] (1.1,0.75)--(4.1,0.75) node[right] {$b$};
\\draw[very thick, red] (1.1,2.3)--(4.1,2.3) node[right] {$a$};
\\node at (0.6,0.3) {$P$};
\\end{tikzpicture}`,
    tikzCaption: 'Đường thẳng $a \\not\\subset (P)$ song song với đường thẳng $b \\subset (P) \\Rightarrow a \\parallel (P)$',
  },
  {
    lessonId: 'bai-13',
    chapterId: 'chuong-4',
    lessonNumber: 'Bài 13',
    lessonTitle: 'Hai mặt phẳng song song',
    fullName: 'Bài 13. Hai mặt phẳng song song',
    volume: 1,
    pageNumber: 88,
    keyTerms: ['Hai mặt phẳng song song', 'Định lí Thalès trong không gian', 'Hình lăng trụ', 'Hình hộp'],
    objectives: [
      'Nhận biết hai mặt phẳng song song trong không gian; giải thích điều kiện và tính chất của hai mặt phẳng song song.',
      'Giải thích định lí Thalès trong không gian và tính chất cơ bản của hình lăng trụ, hình hộp.',
    ],
    theorySections: [
      {
        title: '1. Hai mặt phẳng song song',
        points: [
          'Hai mặt phẳng $(\\alpha)$ và $(\\beta)$ được gọi là **song song** với nhau nếu chúng không có điểm chung, kí hiệu $(\\alpha) \\parallel (\\beta)$ hay $(\\beta) \\parallel (\\alpha)$.',
          '**Nhận xét:** Nếu hai mặt phẳng $(\\alpha)$ và $(\\beta)$ song song với nhau thì mọi đường thẳng $d$ nằm trong $(\\alpha)$ đều song song với $(\\beta)$.',
        ],
      },
      {
        title: '2. Điều kiện và tính chất của hai mặt phẳng song song',
        points: [
          '**Định lí 1 (Điều kiện):** Nếu mặt phẳng $(\\alpha)$ chứa hai đường thẳng cắt nhau $a, b$ và hai đường thẳng này cùng song song với mặt phẳng $(\\beta)$ thì $(\\alpha)$ và $(\\beta)$ song song với nhau.',
          '**Định lí 2:** Qua một điểm nằm ngoài một mặt phẳng cho trước có một và chỉ một mặt phẳng song song với mặt phẳng đã cho.',
          '**Hệ quả:** Hai mặt phẳng phân biệt cùng song song với mặt phẳng thứ ba thì song song với nhau.',
          '**Định lí 3:** Cho hai mặt phẳng song song $(P)$ và $(Q)$. Nếu một mặt phẳng $(R)$ cắt mặt phẳng $(P)$ thì cũng cắt mặt phẳng $(Q)$ và hai giao tuyến song song với nhau.',
        ],
      },
      {
        title: '3. Định lí Thalès trong không gian',
        points: [
          '**Định lí Thalès:** Ba mặt phẳng đôi một song song chắn trên hai cát tuyến phân biệt bất kì những đoạn thẳng tương ứng tỉ lệ.',
          'Nếu hai đường thẳng $d, d\'$ cắt ba mặt phẳng đôi một song song $(P), (Q), (R)$ lần lượt tại $A, B, C$ và $A\', B\', C\'$ thì: $\\frac{AB}{A\'B\'} = \\frac{BC}{B\'C\'} = \\frac{AC}{A\'C\'}$.',
        ],
      },
      {
        title: '4. Hình lăng trụ và hình hộp',
        points: [
          '**Hình lăng trụ $A_1A_2\\dots A_n.A\'_1A\'_2\\dots A\'_n$:** Có hai mặt đáy $A_1A_2\\dots A_n$ và $A\'_1A\'_2\\dots A\'_n$ là hai đa giác nằm trên hai mặt phẳng song song; các cạnh bên $A_1A\'_1, A_2A\'_2, \\dots, A_nA\'_n$ đôi một song song và bằng nhau; các mặt bên là các hình bình hành.',
          '**Hình hộp $ABCD.A\'B\'C\'D\'$:** Là hình lăng trụ tứ giác có hai đáy là hình bình hành.\n• Có $6$ mặt đều là hình bình hành ($3$ cặp mặt đối diện đôi một song song).\n• Có $4$ đường chéo $AC\', BD\', CA\', DB\'$ cùng đi qua **trung điểm** của mỗi đường (điểm đó là tâm của hình hộp).',
        ],
      },
    ],
    formulas: [
      {
        name: 'Điều kiện để hai mặt phẳng song song',
        latex: '\\left.\\begin{array}{l} a, b \\subset (\\alpha), \\ a \\cap b = \\{I\\} \\\\ a \\parallel (\\beta), \\ b \\parallel (\\beta) \\end{array}\\right\\} \\Rightarrow (\\alpha) \\parallel (\\beta)',
      },
      {
        name: 'Giao tuyến của một mặt phẳng với hai mặt phẳng song song',
        latex: '\\left.\\begin{array}{l} (P) \\parallel (Q) \\\\ (R) \\cap (P) = a, \\ (R) \\cap (Q) = b \\end{array}\\right\\} \\Rightarrow a \\parallel b',
      },
      {
        name: 'Định lí Thalès trong không gian',
        latex: '\\frac{AB}{A\'B\'} = \\frac{BC}{B\'C\'} = \\frac{AC}{A\'C\'} \\iff \\frac{AB}{BC} = \\frac{A\'B\'}{B\'C\'}',
        description: 'Với $A, B, C$ và $A\', B\', C\'$ là giao điểm của 2 cát tuyến với 3 mặt phẳng đôi một song song $(P), (Q), (R)$',
      },
    ],
    tikzCode: `\\begin{tikzpicture}[scale=1, line join=round, line cap=round]
\\coordinate (A) at (0,0);
\\coordinate (B) at (3.0,0);
\\coordinate (D) at (1.1,1.1);
\\coordinate (C) at (4.1,1.1);
\\coordinate (A') at (0.4,2.4);
\\coordinate (B') at (3.4,2.4);
\\coordinate (D') at (1.5,3.5);
\\coordinate (C') at (4.5,3.5);
\\draw[dashed] (A)--(D) (D)--(C) (D)--(D');
\\draw[thick] (A)--(B)--(C)--(C')--(D')--(A')--(A) (A')--(B')--(C') (B)--(B');
\\foreach \\p/\\pos in {A/below left, B/below, C/right, D/above left, A'/left, B'/below right, C'/above right, D'/above left}
  \\fill (\\p) circle (1.5pt) node[\\pos] {$\\p$};
\\end{tikzpicture}`,
    tikzCaption: 'Hình hộp $ABCD.A\'B\'C\'D\'$ có các cặp mặt đối diện đôi một song song và bằng nhau',
  },
  {
    lessonId: 'bai-14',
    chapterId: 'chuong-4',
    lessonNumber: 'Bài 14',
    lessonTitle: 'Phép chiếu song song',
    fullName: 'Bài 14. Phép chiếu song song',
    volume: 1,
    pageNumber: 95,
    keyTerms: ['Phép chiếu song song', 'Mặt phẳng chiếu', 'Phương chiếu', 'Hình chiếu song song', 'Hình biểu diễn'],
    objectives: [
      'Nhận biết khái niệm và tính chất cơ bản về phép chiếu song song.',
      'Xác định ảnh của một điểm, một đoạn thẳng, một tam giác, một đường tròn qua phép chiếu song song và vẽ hình biểu diễn của một số hình khối đơn giản.',
    ],
    theorySections: [
      {
        title: '1. Phép chiếu song song',
        points: [
          'Cho mặt phẳng $(\\alpha)$ và đường thẳng $\\Delta$ cắt $(\\alpha)$. Với mỗi điểm $M$ trong không gian, đường thẳng đi qua $M$ và song song (hoặc trùng) với $\\Delta$ cắt $(\\alpha)$ tại điểm $M\'$ xác định.',
          'Điểm $M\'$ được gọi là **hình chiếu song song** của điểm $M$ trên mặt phẳng $(\\alpha)$ theo phương $\\Delta$. Mặt phẳng $(\\alpha)$ gọi là **mặt phẳng chiếu**, phương $\\Delta$ gọi là **phương chiếu**.',
          'Nếu một đường thẳng cùng phương với phương chiếu thì hình chiếu của đường thẳng đó là một điểm.',
        ],
      },
      {
        title: '2. Tính chất của phép chiếu song song',
        points: [
          'Phép chiếu song song biến ba điểm thẳng hàng thành ba điểm thẳng hàng và **không làm thay đổi thứ tự** ba điểm đó. Phép chiếu song song biến đường thẳng thành đường thẳng, tia thành tia, đoạn thẳng thành đoạn thẳng.',
          'Phép chiếu song song biến hai đường thẳng song song thành hai đường thẳng song song hoặc trùng nhau.',
          'Phép chiếu song song **giữ nguyên tỉ số độ dài của hai đoạn thẳng cùng nằm trên một đường thẳng hoặc nằm trên hai đường thẳng song song** (đặc biệt: biến trung điểm của đoạn thẳng thành trung điểm của đoạn thẳng hình chiếu).',
        ],
      },
      {
        title: '3. Hình biểu diễn của một hình không gian trên mặt phẳng',
        points: [
          '**Hình biểu diễn** của một hình trong không gian là hình chiếu song song của hình đó trên một mặt phẳng theo một phương chiếu nào đó hoặc hình đồng dạng với hình chiếu đó.',
          '**Hình biểu diễn của các hình phẳng thường gặp:**\n• Hình biểu diễn của một tam giác (cân, đều, vuông) là một **tam giác**.\n• Hình biểu diễn của hình vuông, hình chữ nhật, hình thoi, hình bình hành là một **hình bình hành**.\n• Hình biểu diễn của hình thang $ABCD \\ (AB \\parallel CD)$ là một **hình thang** $A\'B\'C\'D\' \\ (A\'B\' \\parallel C\'D\')$ thoả mãn $\\frac{A\'B\'}{C\'D\'} = \\frac{AB}{CD}$.\n• Hình biểu diễn của hình tròn là một **hình elip** (hoặc hình tròn).',
        ],
      },
    ],
    formulas: [
      {
        name: 'Bảo toàn tỉ số hai đoạn thẳng cùng phương qua phép chiếu song song',
        latex: 'AB \\parallel CD \\ (\\text{hoặc } A, B, C, D \\text{ thẳng hàng}) \\Longrightarrow \\frac{A\'B\'}{C\'D\'} = \\frac{AB}{CD}',
        description: 'Hệ quả: Trọng tâm $G$ của $\\triangle ABC$ có hình chiếu là trọng tâm $G\'$ của $\\triangle A\'B\'C\'$',
      },
    ],
    tikzCode: `\\begin{tikzpicture}[scale=1, line join=round, line cap=round]
\\coordinate (P1) at (0,0);
\\coordinate (P2) at (4.4,0);
\\coordinate (P3) at (5.4,1.5);
\\coordinate (P4) at (1.0,1.5);
\\coordinate (A) at (1.2,2.7);
\\coordinate (B) at (3.2,3.1);
\\coordinate (M) at (2.2,2.9);
\\coordinate (A') at (1.8,0.6);
\\coordinate (B') at (3.8,1.0);
\\coordinate (M') at (2.8,0.8);
\\draw[thick] (P1)--(P2)--(P3)--(P4)--cycle;
\\draw[very thick, blue] (A)--(B);
\\draw[very thick, teal] (A')--(B');
\\draw[dashed, gray] (A)--(A') (M)--(M') (B)--(B');
\\draw[->, thick, red] (0.5,2.9) -- (0.95,1.35) node[left] {$\\Delta$};
\\node at (0.6,0.3) {$\\alpha$};
\\foreach \\p/\\pos in {A/above left, M/above, B/above right, A'/below left, M'/below, B'/below right}
  \\fill (\\p) circle (1.5pt) node[\\pos] {$\\p$};
\\end{tikzpicture}`,
    tikzCaption: 'Phép chiếu song song theo phương $\\Delta$ lên mặt phẳng $(\\alpha)$ biến trung điểm $M$ của $AB$ thành trung điểm $M\'$ của $A\'B\'$',
  },

  // ============================================================================
  // CHƯƠNG V. GIỚI HẠN. HÀM SỐ LIÊN TỤC
  // ============================================================================
  {
    lessonId: 'bai-15',
    chapterId: 'chuong-5',
    lessonNumber: 'Bài 15',
    lessonTitle: 'Giới hạn của dãy số',
    fullName: 'Bài 15. Giới hạn của dãy số',
    volume: 1,
    pageNumber: 104,
    keyTerms: [
      'Giới hạn hữu hạn của dãy số',
      'Các phép toán giới hạn',
      'Cấp số nhân lùi vô hạn',
      'Tổng của cấp số nhân lùi vô hạn',
      'Giới hạn vô cực của dãy số',
    ],
    objectives: [
      'Nhận biết khái niệm giới hạn của dãy số và giải thích một số giới hạn cơ bản.',
      'Vận dụng các phép toán giới hạn để tìm giới hạn của một số dãy số đơn giản.',
      'Tính tổng của một cấp số nhân lùi vô hạn và vận dụng vào bài toán thực tiễn.',
    ],
    theorySections: [
      {
        title: '1. Giới hạn hữu hạn của dãy số',
        points: [
          '**Dãy số có giới hạn là $0$:** Ta nói dãy số $(u_n)$ có giới hạn là $0$ khi $n$ dần tới dương vô cực, nếu $|u_n|$ có thể nhỏ hơn một số dương bé tuỳ ý, kể từ một số hạng nào đó trở đi, kí hiệu $\\lim_{n \\to +\\infty} u_n = 0$ hay $u_n \\to 0$ khi $n \\to +\\infty$.',
          '**Dãy số có giới hạn là số thực $a$:** Ta nói dãy số $(u_n)$ có giới hạn là số thực $a$ khi $n$ dần tới dương vô cực nếu $\\lim_{n \\to +\\infty} (u_n - a) = 0$, kí hiệu $\\lim_{n \\to +\\infty} u_n = a$ hay $u_n \\to a$ khi $n \\to +\\infty$.',
          '**Các giới hạn cơ bản:**\n• $\\lim_{n \\to +\\infty} \\frac{1}{n^k} = 0$ với $k$ là một số nguyên dương;\n• $\\lim_{n \\to +\\infty} q^n = 0$ nếu $|q| < 1$;\n• Nếu $u_n = c$ ($c$ là hằng số) thì $\\lim_{n \\to +\\infty} u_n = c$;\n• Nếu $|u_n| \\le v_n$ với mọi $n \\ge 1$ và $\\lim_{n \\to +\\infty} v_n = 0$ thì $\\lim_{n \\to +\\infty} u_n = 0$.',
        ],
      },
      {
        title: '2. Định lí về giới hạn hữu hạn của dãy số',
        points: [
          'Nếu $\\lim_{n \\to +\\infty} u_n = a$ và $\\lim_{n \\to +\\infty} v_n = b$ thì:\n• $\\lim_{n \\to +\\infty} (u_n + v_n) = a + b$;\n• $\\lim_{n \\to +\\infty} (u_n - v_n) = a - b$;\n• $\\lim_{n \\to +\\infty} (u_n \\cdot v_n) = a \\cdot b$;\n• $\\lim_{n \\to +\\infty} \\frac{u_n}{v_n} = \\frac{a}{b}$ (nếu $b \\neq 0$).',
          'Nếu $u_n \\ge 0$ với mọi $n$ và $\\lim_{n \\to +\\infty} u_n = a$ thì $a \\ge 0$ và $\\lim_{n \\to +\\infty} \\sqrt{u_n} = \\sqrt{a}$.',
        ],
      },
      {
        title: '3. Tổng của cấp số nhân lùi vô hạn',
        points: [
          'Cấp số nhân vô hạn $(u_n)$ có công bội $q$ với $|q| < 1$ được gọi là **cấp số nhân lùi vô hạn**.',
          'Tổng của cấp số nhân lùi vô hạn $(u_n)$ là:\n$S = u_1 + u_2 + \\dots + u_n + \\dots = \\lim_{n \\to +\\infty} S_n = \\frac{u_1}{1 - q} \\quad (|q| < 1)$.',
        ],
      },
      {
        title: '4. Giới hạn vô cực của dãy số',
        points: [
          'Dãy số $(u_n)$ có giới hạn $+\\infty$ khi $n \\to +\\infty$ nếu $u_n$ có thể lớn hơn một số dương bất kì, kể từ một số hạng nào đó trở đi, kí hiệu $\\lim_{n \\to +\\infty} u_n = +\\infty$. Và $\\lim_{n \\to +\\infty} u_n = -\\infty \\iff \\lim_{n \\to +\\infty} (-u_n) = +\\infty$.',
          '**Các giới hạn vô cực cơ bản:** $\\lim_{n \\to +\\infty} n^k = +\\infty$ ($k \\in \\mathbb{N}^*$); $\\lim_{n \\to +\\infty} q^n = +\\infty$ ($q > 1$).',
          '**Quy tắc liên hệ giữa giới hạn hữu hạn và vô cực:**\n• Nếu $\\lim_{n \\to +\\infty} u_n = a$ và $\\lim_{n \\to +\\infty} v_n = \\pm\\infty$ thì $\\lim_{n \\to +\\infty} \\frac{u_n}{v_n} = 0$.\n• Nếu $\\lim_{n \\to +\\infty} u_n = a > 0, \\ \\lim_{n \\to +\\infty} v_n = 0$ và $v_n > 0$ với mọi $n$ thì $\\lim_{n \\to +\\infty} \\frac{u_n}{v_n} = +\\infty$.\n• Nếu $\\lim_{n \\to +\\infty} u_n = +\\infty$ và $\\lim_{n \\to +\\infty} v_n = a > 0$ thì $\\lim_{n \\to +\\infty} (u_n v_n) = +\\infty$.',
        ],
      },
    ],
    formulas: [
      {
        name: 'Các giới hạn dãy số cơ bản',
        latex: '\\lim_{n \\to +\\infty} \\frac{1}{n^k} = 0 \\ (k \\in \\mathbb{N}^*); \\quad \\lim_{n \\to +\\infty} q^n = 0 \\ (|q| < 1); \\quad \\lim_{n \\to +\\infty} c = c',
      },
      {
        name: 'Tổng của cấp số nhân lùi vô hạn',
        latex: 'S = u_1 + u_2 + \\dots + u_n + \\dots = \\frac{u_1}{1 - q} \\quad (|q| < 1)',
      },
      {
        name: 'Các phép toán giới hạn hữu hạn của dãy số',
        latex: '\\lim(u_n \\pm v_n) = a \\pm b; \\quad \\lim(u_n v_n) = ab; \\quad \\lim\\frac{u_n}{v_n} = \\frac{a}{b} \\ (b \\neq 0); \\quad \\lim\\sqrt{u_n} = \\sqrt{a} \\ (u_n \\ge 0)',
      },
    ],
  },
  {
    lessonId: 'bai-16',
    chapterId: 'chuong-5',
    lessonNumber: 'Bài 16',
    lessonTitle: 'Giới hạn của hàm số',
    fullName: 'Bài 16. Giới hạn của hàm số',
    volume: 1,
    pageNumber: 111,
    keyTerms: ['Giới hạn của hàm số tại một điểm', 'Giới hạn một bên', 'Giới hạn tại vô cực', 'Giới hạn vô cực'],
    objectives: [
      'Nhận biết khái niệm giới hạn hữu hạn của hàm số tại một điểm và tại vô cực.',
      'Nhận biết khái niệm giới hạn một bên và giới hạn vô cực; tính một số dạng giới hạn của hàm số.',
    ],
    theorySections: [
      {
        title: '1. Giới hạn hữu hạn của hàm số tại một điểm & Giới hạn một bên',
        points: [
          '**Định nghĩa:** Giả sử $(a; b)$ là một khoảng chứa điểm $x_0$ và hàm số $y = f(x)$ xác định trên khoảng $(a; b)$, có thể trừ điểm $x_0$. Ta nói hàm số $f(x)$ có **giới hạn** là số $L$ khi $x$ dần tới $x_0$ nếu với dãy số $(x_n)$ bất kì, $x_n \\in (a; b) \\setminus \\{x_0\\}$ và $x_n \\to x_0$, ta có $f(x_n) \\to L$, kí hiệu $\\lim_{x \\to x_0} f(x) = L$.',
          '**Quy tắc tính giới hạn hữu hạn tại một điểm:** Nếu $\\lim_{x \\to x_0} f(x) = L$ và $\\lim_{x \\to x_0} g(x) = M$ thì:\n• $\\lim_{x \\to x_0} [f(x) \\pm g(x)] = L \\pm M$;\n• $\\lim_{x \\to x_0} [f(x) \\cdot g(x)] = L \\cdot M$;\n• $\\lim_{x \\to x_0} \\frac{f(x)}{g(x)} = \\frac{L}{M}$ (nếu $M \\neq 0$);\n• Nếu $f(x) \\ge 0$ trên $(a; b) \\setminus \\{x_0\\}$ thì $L \\ge 0$ và $\\lim_{x \\to x_0} \\sqrt{f(x)} = \\sqrt{L}$.',
          '**Giới hạn một bên:**\n• $\\lim_{x \\to x_0^+} f(x) = L$ (giới hạn bên phải) nếu với mọi dãy $(x_n)$ thoả mãn $x_0 < x_n < b$ và $x_n \\to x_0$, ta có $f(x_n) \\to L$.\n• $\\lim_{x \\to x_0^-} f(x) = L$ (giới hạn bên trái) nếu với mọi dãy $(x_n)$ thoả mãn $a < x_n < x_0$ và $x_n \\to x_0$, ta có $f(x_n) \\to L$.\n• **Định lí:** $\\lim_{x \\to x_0} f(x) = L \\iff \\lim_{x \\to x_0^-} f(x) = \\lim_{x \\to x_0^+} f(x) = L$.',
        ],
      },
      {
        title: '2. Giới hạn hữu hạn của hàm số tại vô cực',
        points: [
          'Cho hàm số $y = f(x)$ xác định trên khoảng $(a; +\\infty)$. Ta nói $\\lim_{x \\to +\\infty} f(x) = L$ nếu với mọi dãy số $(x_n)$ mà $x_n > a$ và $x_n \\to +\\infty$, ta có $f(x_n) \\to L$. Tương tự đối với $\\lim_{x \\to -\\infty} f(x) = L$ trên $(-\\infty; b)$.',
          '**Các giới hạn cơ bản tại vô cực:** Với $c$ là hằng số và $k \\in \\mathbb{N}^*$: $\\lim_{x \\to \\pm\\infty} c = c$; $\\lim_{x \\to \\pm\\infty} \\frac{1}{x^k} = 0$.',
        ],
        note: 'Khi đưa $x$ ra ngoài căn bậc hai ở giới hạn tại $-\\infty$, lưu ý: $\\sqrt{x^2} = |x| = -x$ khi $x < 0$.',
      },
      {
        title: '3. Giới hạn vô cực của hàm số và các quy tắc tính',
        points: [
          '**Các giới hạn vô cực đặc biệt:**\n• $\\lim_{x \\to +\\infty} x^k = +\\infty$ với $k$ nguyên dương;\n• $\\lim_{x \\to -\\infty} x^k = +\\infty$ với $k$ là số nguyên dương **chẵn**;\n• $\\lim_{x \\to -\\infty} x^k = -\\infty$ với $k$ là số nguyên dương **lẻ**.',
          '**Quy tắc tìm giới hạn của tích $f(x)g(x)$** khi $\\lim f(x) = L \\neq 0$ và $\\lim g(x) = \\pm\\infty$: Kết quả là $+\\infty$ nếu $L$ và $\\lim g(x)$ cùng dấu, là $-\\infty$ nếu trái dấu.',
          '**Quy tắc tìm giới hạn của thương $\\frac{f(x)}{g(x)}$:**\n• Nếu $\\lim f(x) = L$ và $\\lim g(x) = \\pm\\infty$ thì $\\lim \\frac{f(x)}{g(x)} = 0$.\n• Nếu $\\lim f(x) = L \\neq 0, \\ \\lim g(x) = 0$ và $g(x)$ giữ một dấu cố định ($+$ hoặc $-$) thì $\\lim \\frac{f(x)}{g(x)} = +\\infty$ (nếu $L$ và $g(x)$ cùng dấu) hoặc $-\\infty$ (nếu $L$ và $g(x)$ trái dấu).',
        ],
      },
    ],
    formulas: [
      {
        name: 'Điều kiện tồn tại giới hạn tại một điểm qua giới hạn một bên',
        latex: '\\lim_{x \\to x_0} f(x) = L \\iff \\lim_{x \\to x_0^-} f(x) = \\lim_{x \\to x_0^+} f(x) = L',
      },
      {
        name: 'Giới hạn cơ bản tại điểm và tại vô cực ($k \\in \\mathbb{N}^*$)',
        latex: '\\lim_{x \\to x_0} c = c; \\quad \\lim_{x \\to x_0} x^n = x_0^n; \\quad \\lim_{x \\to \\pm\\infty} \\frac{c}{x^k} = 0',
      },
      {
        name: 'Giới hạn của lũy thừa $x^k$ tại vô cực ($k \\in \\mathbb{N}^*$)',
        latex: '\\lim_{x \\to +\\infty} x^k = +\\infty; \\quad \\lim_{x \\to -\\infty} x^{2m} = +\\infty; \\quad \\lim_{x \\to -\\infty} x^{2m+1} = -\\infty',
      },
    ],
  },
  {
    lessonId: 'bai-17',
    chapterId: 'chuong-5',
    lessonNumber: 'Bài 17',
    lessonTitle: 'Hàm số liên tục',
    fullName: 'Bài 17. Hàm số liên tục',
    volume: 1,
    pageNumber: 119,
    keyTerms: [
      'Hàm số liên tục tại một điểm',
      'Hàm số gián đoạn',
      'Hàm số liên tục trên một khoảng',
      'Hàm số liên tục trên một đoạn',
    ],
    objectives: [
      'Nhận dạng hàm số liên tục tại một điểm, hoặc trên một khoảng, trên một đoạn.',
      'Nhận dạng tính liên tục của tổng, hiệu, tích, thương của hai hàm số liên tục và tính liên tục của các hàm sơ cấp cơ bản.',
      'Vận dụng tính chất hàm số liên tục trên một đoạn để chứng minh phương trình có nghiệm.',
    ],
    theorySections: [
      {
        title: '1. Hàm số liên tục tại một điểm',
        points: [
          'Cho hàm số $y = f(x)$ xác định trên khoảng $(a; b)$ chứa điểm $x_0$. Hàm số $f(x)$ được gọi là **liên tục tại điểm $x_0$** nếu $\\lim_{x \\to x_0} f(x) = f(x_0)$.',
          'Hàm số $f(x)$ không liên tục tại $x_0$ được gọi là **gián đoạn** tại điểm đó.',
          '**Điều kiện tương đương:** Hàm số $f(x)$ liên tục tại $x_0$ khi và chỉ khi $\\lim_{x \\to x_0^-} f(x) = \\lim_{x \\to x_0^+} f(x) = f(x_0)$.',
        ],
      },
      {
        title: '2. Hàm số liên tục trên một khoảng, trên một đoạn',
        points: [
          'Hàm số $y = f(x)$ được gọi là **liên tục trên khoảng $(a; b)$** nếu nó liên tục tại mọi điểm thuộc khoảng này.',
          'Hàm số $y = f(x)$ được gọi là **liên tục trên đoạn $[a; b]$** nếu nó liên tục trên khoảng $(a; b)$ và $\\lim_{x \\to a^+} f(x) = f(a), \\ \\lim_{x \\to b^-} f(x) = f(b)$.',
          '**Tính liên tục của các hàm số sơ cấp cơ bản:**\n• Hàm số đa thức và các hàm số $y = \\sin x, \\ y = \\cos x$ liên tục trên $\\mathbb{R}$.\n• Các hàm số $y = \\tan x, \\ y = \\cot x, \\ y = \\sqrt{x}$ và hàm phân thức hữu tỉ (thương của hai đa thức) liên tục trên từng khoảng xác định của chúng.',
        ],
      },
      {
        title: '3. Một số tính chất cơ bản',
        points: [
          'Giả sử hai hàm số $y = f(x)$ và $y = g(x)$ liên tục tại điểm $x_0$. Khi đó:\n• Các hàm số $y = f(x) + g(x), \\ y = f(x) - g(x)$ và $y = f(x)g(x)$ liên tục tại $x_0$;\n• Hàm số $y = \\frac{f(x)}{g(x)}$ liên tục tại $x_0$ nếu $g(x_0) \\neq 0$.',
          '**Nhận xét (Ứng dụng chứng minh phương trình có nghiệm):** Nếu hàm số $y = f(x)$ liên tục trên đoạn $[a; b]$ và $f(a)f(b) < 0$ thì tồn tại ít nhất một điểm $c \\in (a; b)$ sao cho $f(c) = 0$ (nói cách khác, phương trình $f(x) = 0$ có ít nhất một nghiệm trong khoảng $(a; b)$).',
        ],
      },
    ],
    formulas: [
      {
        name: 'Điều kiện hàm số liên tục tại điểm $x = x_0$',
        latex: '\\lim_{x \\to x_0} f(x) = f(x_0) \\iff \\lim_{x \\to x_0^-} f(x) = \\lim_{x \\to x_0^+} f(x) = f(x_0)',
      },
      {
        name: 'Điều kiện hàm số liên tục trên đoạn $[a; b]$',
        latex: 'f(x) \\text{ liên tục trên } (a; b), \\quad \\lim_{x \\to a^+} f(x) = f(a) \\text{ và } \\lim_{x \\to b^-} f(x) = f(b)',
      },
      {
        name: 'Định lí chứng minh phương trình $f(x) = 0$ có nghiệm trong $(a; b)$',
        latex: '\\left.\\begin{array}{l} f(x) \\text{ liên tục trên } [a; b] \\\\ f(a) \\cdot f(b) < 0 \\end{array}\\right\\} \\Longrightarrow \\exists c \\in (a; b): f(c) = 0',
      },
    ],
  },
];
