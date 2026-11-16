import {
  ExamSet,
  MultipleChoiceQuestion,
  TrueFalseQuestion,
  ShortAnswerQuestion,
  StepOrderingQuestion,
} from '../../types/exam';
import { buildLessonExamSet } from './chapter1';

// ============================================================================
// BÀI 8. MẪU SỐ LIỆU GHÉP NHÓM (2 Đề ôn riêng biệt)
// ============================================================================
const bai8De1P1: Omit<MultipleChoiceQuestion, 'id' | 'part' | 'number' | 'points'>[] = [
  {
    topic: 'Bài 8. Mẫu số liệu ghép nhóm',
    prompt: 'Trong một mẫu số liệu ghép nhóm, độ dài của nhóm $[15; 25)$ bằng:',
    options: [
      { key: 'A', content: '$10$' },
      { key: 'B', content: '$20$' },
      { key: 'C', content: '$15$' },
      { key: 'D', content: '$40$' },
    ],
    correctAnswer: 'A',
    explanation: 'Độ dài của nhóm $[a; b)$ bằng $b - a = 25 - 15 = 10$.',
    pedagogicalTip: 'Độ dài nhóm bằng hiệu giữa đầu mút phải và đầu mút trái.',
  },
  {
    topic: 'Bài 8. Mẫu số liệu ghép nhóm',
    prompt: 'Trong nhóm số liệu $[30; 45)$, đầu mút trái và đầu mút phải của nhóm lần lượt là:',
    options: [
      { key: 'A', content: '$30$ và $45$' },
      { key: 'B', content: '$45$ và $30$' },
      { key: 'C', content: '$30$ và $44$' },
      { key: 'D', content: '$31$ và $45$' },
    ],
    correctAnswer: 'A',
    explanation: 'Nhóm $[a; b)$ có đầu mút trái là $a = 30$ và đầu mút phải là $b = 45$.',
    pedagogicalTip: 'Kí hiệu $[a; b)$ gồm các giá trị $x$ thỏa mãn $a \\le x < b$.',
  },
  {
    topic: 'Bài 8. Mẫu số liệu ghép nhóm',
    prompt: 'Khi ghép nhóm mẫu số liệu, giá trị $x = 20$ sẽ được xếp vào nhóm nào trong các nhóm liên tiếp dưới đây?',
    options: [
      { key: 'A', content: '$[20; 30)$' },
      { key: 'B', content: '$[10; 20)$' },
      { key: 'C', content: '$[0; 10)$' },
      { key: 'D', content: '$[30; 40)$' },
    ],
    correctAnswer: 'A',
    explanation: 'Nhóm $[10; 20)$ chỉ gồm các giá trị $10 \\le x < 20$, còn giá trị $x = 20$ thuộc nhóm $[20; 30)$.',
    pedagogicalTip: 'Đầu mút phải không thuộc nhóm hiện tại mà thuộc đầu mút trái của nhóm kế tiếp.',
  },
  {
    topic: 'Bài 8. Mẫu số liệu ghép nhóm',
    prompt: 'Khảo sát quãng đường (km) đi bộ mỗi tuần của một nhóm người cao tuổi thu được bảng tần số ghép nhóm: $[5; 10)$: $6$ người; $[10; 15)$: $11$ người; $[15; 20)$: $15$ người; $[20; 25)$: $8$ người. Cỡ mẫu $n$ của cuộc khảo sát này bằng:',
    options: [
      { key: 'A', content: '$n = 40$' },
      { key: 'B', content: '$n = 35$' },
      { key: 'C', content: '$n = 42$' },
      { key: 'D', content: '$n = 32$' },
    ],
    correctAnswer: 'A',
    explanation: 'Cỡ mẫu bằng tổng các tần số: $n = 6 + 11 + 15 + 8 = 40$.',
    pedagogicalTip: 'Cộng tất cả các tần số của các nhóm để tìm cỡ mẫu $n$.',
  },
  {
    topic: 'Bài 8. Mẫu số liệu ghép nhóm',
    prompt: 'Từ bảng khảo sát quãng đường đi bộ ($[5; 10)$: $6$; $[10; 15)$: $11$; $[15; 20)$: $15$; $[20; 25)$: $8$), số người đi bộ dưới $15\\text{ km}$ mỗi tuần là:',
    options: [
      { key: 'A', content: '$17$ người' },
      { key: 'B', content: '$11$ người' },
      { key: 'C', content: '$26$ người' },
      { key: 'D', content: '$6$ người' },
    ],
    correctAnswer: 'A',
    explanation: 'Những người đi bộ dưới $15\\text{ km}$ thuộc hai nhóm $[5; 10)$ và $[10; 15)$, có tổng số là $6 + 11 = 17$ người.',
    pedagogicalTip: 'Gộp tần số của tất cả các nhóm có giá trị nhỏ hơn $15$.',
  },
  {
    topic: 'Bài 8. Mẫu số liệu ghép nhóm',
    prompt: 'Một mẫu số liệu không ghép nhóm có giá trị nhỏ nhất là $12$ và giá trị lớn nhất là $58$. Khoảng biến thiên $R$ của mẫu số liệu gốc này bằng:',
    options: [
      { key: 'A', content: '$46$' },
      { key: 'B', content: '$70$' },
      { key: 'C', content: '$35$' },
      { key: 'D', content: '$48$' },
    ],
    correctAnswer: 'A',
    explanation: 'Khoảng biến thiên của mẫu số liệu gốc là $R = x_{\\max} - x_{\\min} = 58 - 12 = 46$.',
    pedagogicalTip: 'Khi chia thành $k$ nhóm có độ dài $L$, tổng độ dài $k \\cdot L$ phải lớn hơn khoảng biến thiên $R$.',
  },
  {
    topic: 'Bài 8. Mẫu số liệu ghép nhóm',
    prompt: 'Để chia một mẫu số liệu có giá trị nhỏ nhất là $21$ và giá trị lớn nhất là $59$ thành $4$ nhóm có độ dài bằng nhau, độ dài mỗi nhóm $L$ có thể chọn là:',
    options: [
      { key: 'A', content: '$L = 10$' },
      { key: 'B', content: '$L = 8$' },
      { key: 'C', content: '$L = 9$' },
      { key: 'D', content: '$L = 5$' },
    ],
    correctAnswer: 'A',
    explanation: 'Khoảng biến thiên là $59 - 21 = 38$. Cần $4L > 38 \\Leftrightarrow L > 9,5$. Vậy chọn $L = 10$ với các nhóm từ $[20; 30)$ đến $[50; 60)$.',
    pedagogicalTip: 'Tổng độ dài các nhóm $k \\cdot L$ phải lớn hơn hiệu $x_{\\max} - x_{\\min}$.',
  },
  {
    topic: 'Bài 8. Mẫu số liệu ghép nhóm',
    prompt: 'Cho mẫu số liệu gồm $10$ số liệu rời rạc: $12; 15; 18; 19; 21; 23; 24; 27; 29; 31$. Khi ghép vào nhóm $[20; 30)$, tần số của nhóm này bằng:',
    options: [
      { key: 'A', content: '$5$' },
      { key: 'B', content: '$4$' },
      { key: 'C', content: '$6$' },
      { key: 'D', content: '$3$' },
    ],
    correctAnswer: 'A',
    explanation: 'Các giá trị thuộc nửa khoảng $[20; 30)$ là $21; 23; 24; 27; 29$ (gồm $5$ giá trị).',
    pedagogicalTip: 'Đếm các số $x$ thỏa mãn $20 \\le x < 30$.',
  },
  {
    topic: 'Bài 8. Mẫu số liệu ghép nhóm',
    prompt: 'Thống kê thời gian chờ xe buýt (phút) của $50$ hành khách thu được bảng: $[0; 5)$: $12$; $[5; 10)$: $18$; $[10; 15)$: $13$; $[15; 20)$: $7$. Tỉ lệ phần trăm hành khách chờ xe buýt từ $10$ phút trở lên là:',
    options: [
      { key: 'A', content: '$40\\%$' },
      { key: 'B', content: '$26\\%$' },
      { key: 'C', content: '$14\\%$' },
      { key: 'D', content: '$60\\%$' },
    ],
    correctAnswer: 'A',
    explanation: 'Số hành khách chờ từ $10$ phút trở lên là $13 + 7 = 20$ người. Tỉ lệ phần trăm là $\\frac{20}{50} \\cdot 100\\% = 40\\%$.',
    pedagogicalTip: 'Tỉ lệ phần trăm bằng $\\frac{\\text{tần số}}{\\text{cỡ mẫu } n} \\cdot 100\\%$.',
  },
  {
    topic: 'Bài 8. Mẫu số liệu ghép nhóm',
    prompt: 'Cho bảng tần số ghép nhóm về cân nặng (g) của một số quả cam: $[150; 180)$: $8$; $[180; 210)$: $19$; $[210; 240)$: $x$; $[240; 270)$: $9$. Biết tổng số quả cam được khảo sát là $50$ quả. Giá trị của $x$ bằng:',
    options: [
      { key: 'A', content: '$14$' },
      { key: 'B', content: '$16$' },
      { key: 'C', content: '$12$' },
      { key: 'D', content: '$15$' },
    ],
    correctAnswer: 'A',
    explanation: 'Ta có $8 + 19 + x + 9 = 50 \\Leftrightarrow 36 + x = 50 \\Leftrightarrow x = 14$.',
    pedagogicalTip: 'Tổng tất cả các tần số luôn bằng cỡ mẫu $n = 50$.',
  },
  {
    topic: 'Bài 8. Mẫu số liệu ghép nhóm',
    prompt: 'Khi biểu diễn dữ liệu rời rạc (ví dụ số câu trả lời đúng của học sinh là số nguyên) theo các nhóm $1 - 5$, $6 - 10$, $11 - 15$, để chuyển sang các nhóm nửa khoảng nối tiếp nhau $[a_i; a_{i+1})$, nhóm $6 - 10$ được hiệu chỉnh thành:',
    options: [
      { key: 'A', content: '$[5,5; 10,5)$' },
      { key: 'B', content: '$[6; 10)$' },
      { key: 'C', content: '$[6,5; 10,5)$' },
      { key: 'D', content: '$[5,5; 9,5)$' },
    ],
    correctAnswer: 'A',
    explanation: 'Theo quy tắc hiệu chỉnh dữ liệu rời rạc: nhóm $k_1 - k_2$ được chuyển thành $[k_1 - 0,5; k_2 + 0,5) = [5,5; 10,5)$.',
    pedagogicalTip: 'Lùi đầu mút trái $0,5$ và tiến đầu mút phải $0,5$.',
  },
  {
    topic: 'Bài 8. Mẫu số liệu ghép nhóm',
    prompt: 'Ưu điểm nổi bật của việc chuyển mẫu số liệu lớn sang mẫu số liệu ghép nhóm là:',
    options: [
      { key: 'A', content: 'Giúp tóm tắt gọn gàng và nhận biết nhanh xu thế phân bố của dữ liệu' },
      { key: 'B', content: 'Giữ lại chính xác từng giá trị riêng lẻ của mọi phần tử trong mẫu' },
      { key: 'C', content: 'Làm tăng kích thước cỡ mẫu lên gấp đôi' },
      { key: 'D', content: 'Chỉ áp dụng được cho mẫu số liệu có dưới $5$ số liệu' },
    ],
    correctAnswer: 'A',
    explanation: 'Mẫu số liệu ghép nhóm giúp thu gọn lượng dữ liệu lớn và làm nổi bật bức tranh tổng thể về phân bố tần số.',
    pedagogicalTip: 'Ghép nhóm giúp tổng hợp dữ liệu lớn thành bảng gọn gàng, trực quan.',
  },
];

const bai8De1P2: Omit<TrueFalseQuestion, 'id' | 'part' | 'number'>[] = [
  {
    topic: 'Bài 8. Mẫu số liệu ghép nhóm',
    prompt: 'Khảo sát thời gian tự học mỗi tối (đơn vị: phút) của các học sinh lớp 11B thu được bảng tần số ghép nhóm: $[30; 45)$: $5$ HS; $[45; 60)$: $11$ HS; $[60; 75)$: $14$ HS; $[75; 90)$: $8$ HS; $[90; 105)$: $2$ HS. Xét tính đúng sai của các mệnh đề sau:',
    statements: [
      {
        id: 'a',
        label: 'a',
        statement: 'Mẫu số liệu được chia thành $5$ nhóm và mỗi nhóm đều có độ dài bằng $15$ phút.',
        isCorrect: true,
        explanation: 'Có $5$ nhóm liên tiếp và độ dài mỗi nhóm là $45 - 30 = 15$ phút.',
      },
      {
        id: 'b',
        label: 'b',
        statement: 'Tổng số học sinh của lớp 11B tham gia khảo sát là $n = 40$ học sinh.',
        isCorrect: true,
        explanation: 'Ta có $n = 5 + 11 + 14 + 8 + 2 = 40$.',
      },
      {
        id: 'c',
        label: 'c',
        statement: 'Một học sinh tự học đúng $60$ phút mỗi tối sẽ được xếp vào nhóm $[45; 60)$.',
        isCorrect: false,
        explanation: 'Giá trị $60$ thuộc nhóm $[60; 75)$ chứ không thuộc nhóm $[45; 60)$.',
      },
      {
        id: 'd',
        label: 'd',
        statement: 'Số học sinh tự học từ $60$ phút đến dưới $90$ phút chiếm $55\\%$ tổng số học sinh của lớp.',
        isCorrect: true,
        explanation: 'Hai nhóm $[60; 75)$ và $[75; 90)$ có $14 + 8 = 22$ học sinh, chiếm $\\frac{22}{40} \\cdot 100\\% = 55\\%$.',
      },
    ],
    pedagogicalTip: 'Chú ý quy ước nửa khoảng $[a; b)$ bao gồm $a$ nhưng không bao gồm $b$.',
  },
  {
    topic: 'Bài 8. Mẫu số liệu ghép nhóm',
    prompt: 'Ghi lại tốc độ (km/h) của $20$ ô tô đi qua một trạm đo tốc độ thu được dãy số liệu: $42; 45; 47; 48; 50; 51; 53; 54; 55; 56; 57; 58; 59; 60; 61; 63; 64; 66; 68; 69$. Người ta ghép dãy số liệu này thành $3$ nhóm: $[40; 50), [50; 60), [60; 70)$. Xét tính đúng sai của các mệnh đề sau:',
    statements: [
      {
        id: 'a',
        label: 'a',
        statement: 'Khoảng biến thiên của mẫu số liệu không ghép nhóm ban đầu là $69 - 42 = 27\\text{ (km/h)}$.',
        isCorrect: true,
        explanation: 'Giá trị lớn nhất là $69$, nhỏ nhất là $42$, hiệu số bằng $27$.',
      },
      {
        id: 'b',
        label: 'b',
        statement: 'Tần số của nhóm thứ nhất $[40; 50)$ bằng $4$.',
        isCorrect: true,
        explanation: 'Có $4$ giá trị thuộc $[40; 50)$ là $42; 45; 47; 48$.',
      },
      {
        id: 'c',
        label: 'c',
        statement: 'Tần số của nhóm thứ hai $[50; 60)$ bằng $10$.',
        isCorrect: false,
        explanation: 'Các giá trị thuộc $[50; 60)$ là $50; 51; 53; 54; 55; 56; 57; 58; 59$ (gồm $9$ giá trị, còn $60$ thuộc nhóm thứ ba).',
      },
      {
        id: 'd',
        label: 'd',
        statement: 'Tần số của nhóm thứ ba $[60; 70)$ bằng $7$.',
        isCorrect: true,
        explanation: 'Các giá trị thuộc $[60; 70)$ là $60; 61; 63; 64; 66; 68; 69$ (gồm $7$ giá trị). Kiểm tra tổng: $4 + 9 + 7 = 20$.',
      },
    ],
    pedagogicalTip: 'Sau khi đếm tần số các nhóm, luôn cộng lại để kiểm tra tổng tần số có đúng bằng cỡ mẫu $n = 20$ không.',
  },
];

const bai8De1P3: Omit<ShortAnswerQuestion, 'id' | 'part' | 'number' | 'points'>[] = [
  {
    topic: 'Bài 8. Mẫu số liệu ghép nhóm',
    prompt: 'Cho bảng tần số ghép nhóm về điểm kiểm tra: $[4; 5,5)$: $4$ HS; $[5,5; 7)$: $12$ HS; $[7; 8,5)$: $18$ HS; $[8,5; 10)$: $11$ HS. Tính cỡ mẫu $n$ của mẫu số liệu.',
    acceptableAnswers: ['45', '45.0'],
    explanation: 'Cỡ mẫu $n = 4 + 12 + 18 + 11 = 45$ học sinh.',
    pedagogicalTip: 'Cộng tất cả các tần số trong bảng.',
  },
  {
    topic: 'Bài 8. Mẫu số liệu ghép nhóm',
    prompt: 'Từ bảng tần số ở câu trên ($[4; 5,5)$: $4$; $[5,5; 7)$: $12$; $[7; 8,5)$: $18$; $[8,5; 10)$: $11$), có bao nhiêu học sinh đạt điểm từ $7,0$ trở lên?',
    acceptableAnswers: ['29', '29.0'],
    explanation: 'Số học sinh đạt từ $7,0$ trở lên thuộc hai nhóm $[7; 8,5)$ và $[8,5; 10)$ là $18 + 11 = 29$ học sinh.',
    pedagogicalTip: 'Cộng tần số của hai nhóm cuối.',
  },
  {
    topic: 'Bài 8. Mẫu số liệu ghép nhóm',
    prompt: 'Một mẫu số liệu được ghép thành $6$ nhóm nối tiếp nhau có độ dài bằng nhau. Biết đầu mút trái của nhóm đầu tiên là $10$ và đầu mút phải của nhóm cuối cùng là $58$. Tính độ dài của mỗi nhóm.',
    acceptableAnswers: ['8', '8.0'],
    explanation: 'Tổng độ dài của $6$ nhóm là $58 - 10 = 48$. Độ dài của mỗi nhóm là $48 : 6 = 8$.',
    pedagogicalTip: 'Độ dài mỗi nhóm $L = \\frac{a_{k+1} - a_1}{k}$.',
  },
  {
    topic: 'Bài 8. Mẫu số liệu ghép nhóm',
    prompt: 'Cho dãy số liệu: $11; 13; 14; 15; 16; 18; 19; 20; 22; 25$. Khi ghép dãy số liệu này vào nhóm $[15; 20)$, tần số của nhóm $[15; 20)$ bằng bao nhiêu?',
    acceptableAnswers: ['4', '4.0'],
    explanation: 'Các số liệu thuộc $[15; 20)$ (tức $15 \\le x < 20$) là $15; 16; 18; 19$, có $4$ giá trị.',
    pedagogicalTip: 'Lưu ý số $20$ không thuộc nửa khoảng $[15; 20)$.',
  },
];

const bai8De1P4: Omit<StepOrderingQuestion, 'id' | 'part' | 'number' | 'points'>[] = [
  {
    topic: 'Bài 8. Mẫu số liệu ghép nhóm',
    problemStatement: 'Một mẫu số liệu về tuổi thọ của $40$ bóng đèn (đơn vị: trăm giờ) có giá trị nhỏ nhất là $11,2$ và giá trị lớn nhất là $22,6$. Hãy sắp xếp các bước lập bảng tần số ghép nhóm gồm $5$ nhóm có độ dài bằng $2,5$ theo đúng thứ tự logic.',
    conclusionTarget: 'Lập được bảng tần số ghép nhóm gồm $5$ nhóm từ $[10,5; 13,0)$ đến $[20,5; 23,0)$.',
    steps: [
      {
        id: 's1',
        originalIndex: 1,
        roleDescription: 'Tính khoảng biến thiên của mẫu số liệu gốc',
        content: 'Xác định giá trị nhỏ nhất $x_{\\min} = 11,2$ và giá trị lớn nhất $x_{\\max} = 22,6$, suy ra khoảng biến thiên $R = 22,6 - 11,2 = 11,4$.',
      },
      {
        id: 's2',
        originalIndex: 2,
        roleDescription: 'Kiểm tra tổng độ dài 5 nhóm và chọn hai đầu mút ngoài cùng',
        content: 'Với $5$ nhóm có độ dài $L = 2,5$, tổng độ dài là $5 \\cdot 2,5 = 12,5 > 11,4$. Ta chọn đầu mút trái nhóm đầu là $10,5 < 11,2$ và đầu mút phải nhóm cuối là $23,0 > 22,6$.',
      },
      {
        id: 's3',
        originalIndex: 3,
        roleDescription: 'Xác định 5 nhóm nửa khoảng liên tiếp nhau',
        content: 'Chia khoảng $[10,5; 23,0)$ thành $5$ nhóm: $[10,5; 13,0), [13,0; 15,5), [15,5; 18,0), [18,0; 20,5), [20,5; 23,0)$.',
      },
      {
        id: 's4',
        originalIndex: 4,
        roleDescription: 'Đếm tần số mỗi nhóm và kiểm tra tổng bằng 40',
        content: 'Đếm số bóng đèn có tuổi thọ thuộc từng nhóm, ghi tần số tương ứng vào bảng và kiểm tra tổng các tần số đúng bằng $n = 40$.',
      },
    ],
    pedagogicalTip: 'Đầu mút trái nhóm 1 phải nhỏ hơn $x_{\\min}$ và đầu mút phải nhóm cuối phải lớn hơn $x_{\\max}$.',
    teacherAnalysis: 'Quy trình 4 bước chuẩn để ghép nhóm một mẫu số liệu thực tế.',
  },
  {
    topic: 'Bài 8. Mẫu số liệu ghép nhóm',
    problemStatement: 'Cho bảng thống kê số cuốn sách đọc trong năm của $35$ học sinh theo các nhóm nguyên rời rạc: $1 - 3$: $6$ HS; $4 - 6$: $14$ HS; $7 - 9$: $10$ HS; $10 - 12$: $5$ HS. Hãy sắp xếp các bước hiệu chỉnh bảng số liệu sang dạng nửa khoảng liên tiếp và tính tần số tích lũy theo đúng thứ tự logic.',
    conclusionTarget: 'Lập được các nhóm hiệu chỉnh từ $[0,5; 3,5)$ đến $[9,5; 12,5)$ và dãy tần số tích lũy $6; 20; 30; 35$.',
    steps: [
      {
        id: 's1',
        originalIndex: 1,
        roleDescription: 'Nêu quy tắc hiệu chỉnh nhóm số nguyên rời rạc',
        content: 'Do số cuốn sách là số nguyên rời rạc, mỗi nhóm $k_1 - k_2$ được hiệu chỉnh thành nửa khoảng $[k_1 - 0,5; k_2 + 0,5)$.',
      },
      {
        id: 's2',
        originalIndex: 2,
        roleDescription: 'Viết cụ thể 4 nhóm sau khi hiệu chỉnh',
        content: 'Bốn nhóm nối tiếp nhau sau khi hiệu chỉnh là: $[0,5; 3,5), [3,5; 6,5), [6,5; 9,5)$ và $[9,5; 12,5)$ với độ dài mỗi nhóm bằng $3$.',
      },
      {
        id: 's3',
        originalIndex: 3,
        roleDescription: 'Tính tần số tích lũy của hai nhóm đầu',
        content: 'Tần số tích lũy của nhóm 1 là $C_1 = 6$; của nhóm 2 là $C_2 = 6 + 14 = 20$.',
      },
      {
        id: 's4',
        originalIndex: 4,
        roleDescription: 'Tính tần số tích lũy của hai nhóm cuối và kết luận',
        content: 'Tần số tích lũy của nhóm 3 là $C_3 = 20 + 10 = 30$; của nhóm 4 là $C_4 = 30 + 5 = 35 = n$.',
      },
    ],
    pedagogicalTip: 'Tần số tích lũy của nhóm cuối cùng luôn bằng đúng cỡ mẫu $n$.',
    teacherAnalysis: 'Rèn kỹ năng hiệu chỉnh dữ liệu rời rạc và lập cột tần số tích lũy.',
  },
  {
    topic: 'Bài 8. Mẫu số liệu ghép nhóm',
    problemStatement: 'Khảo sát doanh thu mỗi ngày (triệu đồng) của một cửa hàng trong $30$ ngày của tháng 4 thu được các nhóm: $[10; 15)$: $4$ ngày; $[15; 20)$: $x$ ngày; $[20; 25)$: $11$ ngày; $[25; 30)$: $y$ ngày. Biết số ngày có doanh thu dưới $20$ triệu đồng là $13$ ngày. Hãy sắp xếp các bước tìm $x, y$ và tỉ lệ phần trăm số ngày có doanh thu từ $20$ triệu trở lên.',
    conclusionTarget: 'Tìm được $x = 9, y = 6$ và tỉ lệ ngày có doanh thu từ $20$ triệu trở lên là $56,67\\%$.',
    steps: [
      {
        id: 's1',
        originalIndex: 1,
        roleDescription: 'Tìm x dựa vào số ngày có doanh thu dưới 20 triệu đồng',
        content: 'Những ngày có doanh thu dưới $20$ triệu đồng thuộc hai nhóm $[10; 15)$ và $[15; 20)$, nên $4 + x = 13 \\Leftrightarrow x = 9$ (ngày).',
      },
      {
        id: 's2',
        originalIndex: 2,
        roleDescription: 'Tìm y dựa vào tổng số ngày trong tháng 4 là n = 30',
        content: 'Vì tổng số ngày khảo sát là $n = 30$, ta có $13 + 11 + y = 30 \\Leftrightarrow y = 6$ (ngày).',
      },
      {
        id: 's3',
        originalIndex: 3,
        roleDescription: 'Tính số ngày có doanh thu từ 20 triệu đồng trở lên',
        content: 'Số ngày có doanh thu từ $20$ triệu đồng trở lên thuộc hai nhóm cuối là $11 + 6 = 17$ (ngày).',
      },
      {
        id: 's4',
        originalIndex: 4,
        roleDescription: 'Tính tỉ lệ phần trăm và kết luận',
        content: 'Tỉ lệ phần trăm cần tìm là $\\frac{17}{30} \\cdot 100\\% \\approx 56,67\\%$.',
      },
    ],
    pedagogicalTip: 'Khai thác tần số tích lũy tại mốc $20$ triệu đồng để tìm $x$ trước.',
    teacherAnalysis: 'Bài toán đọc hiểu và khôi phục tần số còn khuyết trong bảng ghép nhóm.',
  },
  {
    topic: 'Bài 8. Mẫu số liệu ghép nhóm',
    problemStatement: 'Cho dãy số liệu chiều cao (cm) của $12$ cây giống: $21; 23; 24; 25; 26; 28; 29; 30; 31; 33; 34; 36$. Hãy sắp xếp các bước ghép dãy số liệu này thành $3$ nhóm $[20; 26), [26; 32), [32; 38)$ theo đúng thứ tự logic.',
    conclusionTarget: 'Tìm được tần số của $3$ nhóm lần lượt là $4; 5; 3$.',
    steps: [
      {
        id: 's1',
        originalIndex: 1,
        roleDescription: 'Xác định các phần tử thuộc nhóm thứ nhất [20; 26)',
        content: 'Các giá trị thỏa mãn $20 \\le x < 26$ là $21; 23; 24; 25$, nên nhóm $[20; 26)$ có tần số $m_1 = 4$.',
      },
      {
        id: 's2',
        originalIndex: 2,
        roleDescription: 'Xác định các phần tử thuộc nhóm thứ hai [26; 32)',
        content: 'Các giá trị thỏa mãn $26 \\le x < 32$ là $26; 28; 29; 30; 31$, nên nhóm $[26; 32)$ có tần số $m_2 = 5$.',
      },
      {
        id: 's3',
        originalIndex: 3,
        roleDescription: 'Xác định các phần tử thuộc nhóm thứ ba [32; 38)',
        content: 'Các giá trị thỏa mãn $32 \\le x < 38$ là $33; 34; 36$, nên nhóm $[32; 38)$ có tần số $m_3 = 3$.',
      },
      {
        id: 's4',
        originalIndex: 4,
        roleDescription: 'Kiểm tra tổng tần số và hoàn thiện bảng',
        content: 'Kiểm tra tổng tần số $m_1 + m_2 + m_3 = 4 + 5 + 3 = 12 = n$, hoàn thành bảng tần số ghép nhóm.',
      },
    ],
    pedagogicalTip: 'Chú ý giá trị biên $26$ thuộc nhóm thứ hai $[26; 32)$ chứ không thuộc $[20; 26)$.',
    teacherAnalysis: 'Luyện tập trực tiếp thao tác phân loại số liệu vào các nửa khoảng.',
  },
];

const bai8De2P1: Omit<MultipleChoiceQuestion, 'id' | 'part' | 'number' | 'points'>[] = [
  {
    topic: 'Bài 8. Mẫu số liệu ghép nhóm',
    prompt: 'Độ dài của nhóm $[12,5; 17,5)$ trong mẫu số liệu ghép nhóm bằng:',
    options: [
      { key: 'A', content: '$5$' },
      { key: 'B', content: '$15$' },
      { key: 'C', content: '$4,5$' },
      { key: 'D', content: '$5,5$' },
    ],
    correctAnswer: 'A',
    explanation: 'Độ dài nhóm là $17,5 - 12,5 = 5$.',
    pedagogicalTip: 'Lấy đầu mút phải trừ đầu mút trái.',
  },
  {
    topic: 'Bài 8. Mẫu số liệu ghép nhóm',
    prompt: 'Giá trị nào sau đây **thuộc** nhóm $[40; 50)$?',
    options: [
      { key: 'A', content: '$40$' },
      { key: 'B', content: '$50$' },
      { key: 'C', content: '$39,9$' },
      { key: 'D', content: '$50,1$' },
    ],
    correctAnswer: 'A',
    explanation: 'Nửa khoảng $[40; 50)$ chứa đầu mút trái $40$ nhưng không chứa đầu mút phải $50$.',
    pedagogicalTip: '$x \\in [40; 50) \\Leftrightarrow 40 \\le x < 50$.',
  },
  {
    topic: 'Bài 8. Mẫu số liệu ghép nhóm',
    prompt: 'Cho bảng tần số ghép nhóm về tuổi của các hội viên một câu lạc bộ cờ tướng: $[20; 30)$: $5$; $[30; 40)$: $12$; $[40; 50)$: $18$; $[50; 60)$: $10$; $[60; 70)$: $5$. Tổng số hội viên của câu lạc bộ là:',
    options: [
      { key: 'A', content: '$50$' },
      { key: 'B', content: '$45$' },
      { key: 'C', content: '$55$' },
      { key: 'D', content: '$48$' },
    ],
    correctAnswer: 'A',
    explanation: 'Cỡ mẫu $n = 5 + 12 + 18 + 10 + 5 = 50$ hội viên.',
    pedagogicalTip: 'Cộng tất cả các tần số.',
  },
  {
    topic: 'Bài 8. Mẫu số liệu ghép nhóm',
    prompt: 'Từ bảng tuổi hội viên CLB cờ tướng ($[20; 30)$: $5$; $[30; 40)$: $12$; $[40; 50)$: $18$; $[50; 60)$: $10$; $[60; 70)$: $5$), nhóm có tần số lớn nhất là:',
    options: [
      { key: 'A', content: '$[40; 50)$' },
      { key: 'B', content: '$[30; 40)$' },
      { key: 'C', content: '$[50; 60)$' },
      { key: 'D', content: '$[60; 70)$' },
    ],
    correctAnswer: 'A',
    explanation: 'Nhóm $[40; 50)$ có tần số lớn nhất bằng $18$.',
    pedagogicalTip: 'Quan sát dòng tần số để tìm giá trị lớn nhất.',
  },
  {
    topic: 'Bài 8. Mẫu số liệu ghép nhóm',
    prompt: 'Từ bảng tuổi hội viên CLB cờ tướng ở trên, số hội viên có độ tuổi từ $30$ đến dưới $50$ tuổi là:',
    options: [
      { key: 'A', content: '$30$' },
      { key: 'B', content: '$18$' },
      { key: 'C', content: '$12$' },
      { key: 'D', content: '$28$' },
    ],
    correctAnswer: 'A',
    explanation: 'Hội viên từ $30$ đến dưới $50$ tuổi thuộc hai nhóm $[30; 40)$ và $[40; 50)$, gồm $12 + 18 = 30$ người.',
    pedagogicalTip: 'Cộng tần số của hai nhóm $[30; 40)$ và $[40; 50)$.',
  },
  {
    topic: 'Bài 8. Mẫu số liệu ghép nhóm',
    prompt: 'Khi hiệu chỉnh nhóm dữ liệu nguyên rời rạc $15 - 19$, ta thu được nửa khoảng nào sau đây?',
    options: [
      { key: 'A', content: '$[14,5; 19,5)$' },
      { key: 'B', content: '$[15; 19)$' },
      { key: 'C', content: '$[15,5; 19,5)$' },
      { key: 'D', content: '$[14,5; 18,5)$' },
    ],
    correctAnswer: 'A',
    explanation: 'Nhóm rời rạc $15 - 19$ được hiệu chỉnh thành $[15 - 0,5; 19 + 0,5) = [14,5; 19,5)$.',
    pedagogicalTip: 'Quy tắc hiệu chỉnh: $[k_1 - 0,5; k_2 + 0,5)$.',
  },
  {
    topic: 'Bài 8. Mẫu số liệu ghép nhóm',
    prompt: 'Sau khi hiệu chỉnh nhóm rời rạc $15 - 19$ thành $[14,5; 19,5)$, độ dài của nhóm này bằng:',
    options: [
      { key: 'A', content: '$5$' },
      { key: 'B', content: '$4$' },
      { key: 'C', content: '$4,5$' },
      { key: 'D', content: '$5,5$' },
    ],
    correctAnswer: 'A',
    explanation: 'Độ dài nhóm sau khi hiệu chỉnh là $19,5 - 14,5 = 5$ (ứng với $5$ giá trị nguyên $15, 16, 17, 18, 19$).',
    pedagogicalTip: 'Độ dài nhóm rời rạc sau hiệu chỉnh bằng $k_2 - k_1 + 1$.',
  },
  {
    topic: 'Bài 8. Mẫu số liệu ghép nhóm',
    prompt: 'Cho bảng tần số ghép nhóm: $[10; 20)$: $7$; $[20; 30)$: $13$; $[30; 40)$: $15$; $[40; 50)$: $5$. Tần số tích lũy của nhóm thứ ba $[30; 40)$ bằng:',
    options: [
      { key: 'A', content: '$35$' },
      { key: 'B', content: '$15$' },
      { key: 'C', content: '$20$' },
      { key: 'D', content: '$40$' },
    ],
    correctAnswer: 'A',
    explanation: 'Tần số tích lũy của nhóm 3 là $C_3 = m_1 + m_2 + m_3 = 7 + 13 + 15 = 35$.',
    pedagogicalTip: 'Tần số tích lũy của nhóm $k$ bằng tổng tần số từ nhóm $1$ đến nhóm $k$.',
  },
  {
    topic: 'Bài 8. Mẫu số liệu ghép nhóm',
    prompt: 'Một mẫu số liệu được chia thành $5$ nhóm có độ dài bằng nhau và bằng $6$. Nếu đầu mút trái của nhóm thứ nhất là $10$ thì đầu mút phải của nhóm thứ năm là:',
    options: [
      { key: 'A', content: '$40$' },
      { key: 'B', content: '$34$' },
      { key: 'C', content: '$46$' },
      { key: 'D', content: '$36$' },
    ],
    correctAnswer: 'A',
    explanation: 'Đầu mút phải của nhóm thứ $5$ là $10 + 5 \\cdot 6 = 40$.',
    pedagogicalTip: 'Công thức $a_{k+1} = a_1 + k \\cdot L$.',
  },
  {
    topic: 'Bài 8. Mẫu số liệu ghép nhóm',
    prompt: 'Từ mẫu số liệu ghép nhóm, ta **không thể** xác định chính xác tuyệt đối đại lượng nào dưới đây của mẫu số liệu gốc?',
    options: [
      { key: 'A', content: 'Giá trị lớn nhất và giá trị nhỏ nhất chính xác của mẫu gốc' },
      { key: 'B', content: 'Cỡ mẫu $n$ của mẫu số liệu' },
      { key: 'C', content: 'Số phần tử thuộc mỗi nhóm $[a_i; a_{i+1})$' },
      { key: 'D', content: 'Độ dài của mỗi nhóm số liệu' },
    ],
    correctAnswer: 'A',
    explanation: 'Khi đã ghép nhóm mà không có dữ liệu gốc, ta chỉ biết tần số mỗi nhóm chứ không biết giá trị cụ thể từng phần tử nên không biết chính xác $x_{\\min}, x_{\\max}$.',
    pedagogicalTip: 'Bảng ghép nhóm cho biết hoàn toàn cỡ mẫu $n$ và tần số từng nhóm.',
  },
  {
    topic: 'Bài 8. Mẫu số liệu ghép nhóm',
    prompt: 'Cho bảng tần số ghép nhóm: $[0; 10)$: $4$; $[10; 20)$: $8$; $[20; 30)$: $12$; $[30; 40)$: $6$. Tần số tương đối (tỉ lệ phần trăm) của nhóm $[20; 30)$ bằng:',
    options: [
      { key: 'A', content: '$40\\%$' },
      { key: 'B', content: '$30\\%$' },
      { key: 'C', content: '$12\\%$' },
      { key: 'D', content: '$25\\%$' },
    ],
    correctAnswer: 'A',
    explanation: 'Cỡ mẫu $n = 4 + 8 + 12 + 6 = 30$. Tỉ lệ của nhóm $[20; 30)$ là $\\frac{12}{30} \\cdot 100\\% = 40\\%$.',
    pedagogicalTip: 'Lấy tần số nhóm chia cho cỡ mẫu $30$.',
  },
  {
    topic: 'Bài 8. Mẫu số liệu ghép nhóm',
    prompt: 'Trong bảng tần số ghép nhóm liên tiếp $[a_1; a_2), [a_2; a_3), [a_3; a_4)$, khẳng định nào sau đây đúng?',
    options: [
      { key: 'A', content: 'Hai nhóm bất kì không có phần tử chung nào' },
      { key: 'B', content: 'Điểm $a_2$ vừa thuộc nhóm 1 vừa thuộc nhóm 2' },
      { key: 'C', content: 'Điểm $a_2$ không thuộc nhóm nào cả' },
      { key: 'D', content: 'Tổng các đầu mút luôn bằng cỡ mẫu' },
    ],
    correctAnswer: 'A',
    explanation: 'Các nửa khoảng $[a_1; a_2)$ và $[a_2; a_3)$ đôi một rời nhau nên mỗi giá trị số liệu chỉ thuộc duy nhất một nhóm.',
    pedagogicalTip: 'Các nhóm ghép nhóm phải đôi một không giao nhau.',
  },
];

const bai8De2P2: Omit<TrueFalseQuestion, 'id' | 'part' | 'number'>[] = [
  ...bai8De1P2,
];

const bai8De2P3: Omit<ShortAnswerQuestion, 'id' | 'part' | 'number' | 'points'>[] = [
  {
    topic: 'Bài 8. Mẫu số liệu ghép nhóm',
    prompt: 'Cho bảng tần số ghép nhóm: $[10; 15)$: $6$; $[15; 20)$: $14$; $[20; 25)$: $19$; $[25; 30)$: $11$. Tính tần số tích lũy của nhóm thứ ba $[20; 25)$.',
    acceptableAnswers: ['39', '39.0'],
    explanation: 'Tần số tích lũy của nhóm $[20; 25)$ là $6 + 14 + 19 = 39$.',
    pedagogicalTip: 'Cộng tần số của $3$ nhóm đầu tiên.',
  },
  {
    topic: 'Bài 8. Mẫu số liệu ghép nhóm',
    prompt: 'Khi hiệu chỉnh nhóm số nguyên rời rạc $8 - 14$ thành nửa khoảng $[a; b)$, hiệu $b - a$ bằng bao nhiêu?',
    acceptableAnswers: ['7', '7.0'],
    explanation: 'Nhóm $8 - 14$ hiệu chỉnh thành $[7,5; 14,5)$, có độ dài $b - a = 14,5 - 7,5 = 7$.',
    pedagogicalTip: 'Độ dài nhóm sau hiệu chỉnh bằng $14 - 8 + 1 = 7$.',
  },
  {
    topic: 'Bài 8. Mẫu số liệu ghép nhóm',
    prompt: 'Một cửa hàng thống kê số khách hàng mua sắm trong $25$ ngày: $[20; 40)$: $3$ ngày; $[40; 60)$: $7$ ngày; $[60; 80)$: $x$ ngày; $[80; 100)$: $6$ ngày. Tìm giá trị của $x$.',
    acceptableAnswers: ['9', '9.0'],
    explanation: 'Ta có $3 + 7 + x + 6 = 25 \\Leftrightarrow 16 + x = 25 \\Leftrightarrow x = 9$.',
    pedagogicalTip: 'Lấy tổng $25$ trừ đi tổng tần số các nhóm đã biết.',
  },
  {
    topic: 'Bài 8. Mẫu số liệu ghép nhóm',
    prompt: 'Từ bảng thống kê $25$ ngày ở câu trên ($[20; 40)$: $3$; $[40; 60)$: $7$; $[60; 80)$: $9$; $[80; 100)$: $6$), tỉ lệ phần trăm số ngày có từ $60$ khách trở lên là bao nhiêu phần trăm?',
    acceptableAnswers: ['60', '60.0'],
    explanation: 'Số ngày có từ $60$ khách trở lên là $9 + 6 = 15$ ngày. Tỉ lệ phần trăm là $\\frac{15}{25} \\cdot 100\\% = 60\\%$.',
    pedagogicalTip: 'Tính $\\frac{9 + 6}{25} \\cdot 100\\% = 60\\%$.',
  },
];

const bai8De2P4: Omit<StepOrderingQuestion, 'id' | 'part' | 'number' | 'points'>[] = [
  ...bai8De1P4,
];

// ============================================================================
// BÀI 9. CÁC SỐ ĐẶC TRƯNG ĐO XU THẾ TRUNG TÂM (2 Đề ôn riêng biệt)
// ============================================================================
const bai9De1P1: Omit<MultipleChoiceQuestion, 'id' | 'part' | 'number' | 'points'>[] = [
  {
    topic: 'Bài 9. Các số đặc trưng đo xu thế trung tâm',
    prompt: 'Giá trị đại diện $x_i$ của nhóm $[12; 20)$ trong mẫu số liệu ghép nhóm là:',
    options: [
      { key: 'A', content: '$16$' },
      { key: 'B', content: '$8$' },
      { key: 'C', content: '$15$' },
      { key: 'D', content: '$32$' },
    ],
    correctAnswer: 'A',
    explanation: 'Giá trị đại diện là trung bình cộng hai đầu mút: $x_i = \\frac{12 + 20}{2} = 16$.',
    pedagogicalTip: 'Công thức giá trị đại diện: $x_i = \\frac{a_i + a_{i+1}}{2}$.',
  },
  {
    topic: 'Bài 9. Các số đặc trưng đo xu thế trung tâm',
    prompt: 'Cho mẫu số liệu ghép nhóm có $3$ nhóm: $[0; 10)$: $4$; $[10; 20)$: $10$; $[20; 30)$: $6$. Số trung bình cộng $\\bar{x}$ của mẫu số liệu này bằng:',
    options: [
      { key: 'A', content: '$16$' },
      { key: 'B', content: '$15$' },
      { key: 'C', content: '$14$' },
      { key: 'D', content: '$17$' },
    ],
    correctAnswer: 'A',
    explanation: 'Các giá trị đại diện là $5; 15; 25$, cỡ mẫu $n = 20$. Khi đó $\\bar{x} = \\frac{4 \\cdot 5 + 10 \\cdot 15 + 6 \\cdot 25}{20} = \\frac{20 + 150 + 150}{20} = \\frac{320}{20} = 16$.',
    pedagogicalTip: 'Áp dụng công thức $\\bar{x} = \\frac{m_1 x_1 + m_2 x_2 + \\dots + m_k x_k}{n}$.',
  },
  {
    topic: 'Bài 9. Các số đặc trưng đo xu thế trung tâm',
    prompt: 'Cho bảng tần số ghép nhóm: $[10; 20)$: $6$; $[20; 30)$: $18$; $[30; 40)$: $11$; $[40; 50)$: $5$. Nhóm chứa mốt của mẫu số liệu này là:',
    options: [
      { key: 'A', content: '$[20; 30)$' },
      { key: 'B', content: '$[30; 40)$' },
      { key: 'C', content: '$[10; 20)$' },
      { key: 'D', content: '$[40; 50)$' },
    ],
    correctAnswer: 'A',
    explanation: 'Nhóm $[20; 30)$ có tần số lớn nhất ($m_2 = 18$) nên là nhóm chứa mốt.',
    pedagogicalTip: 'Nhóm chứa mốt là nhóm có tần số lớn nhất.',
  },
  {
    topic: 'Bài 9. Các số đặc trưng đo xu thế trung tâm',
    prompt: 'Từ bảng tần số ($[10; 20)$: $6$; $[20; 30)$: $18$; $[30; 40)$: $11$; $[40; 50)$: $5$), với cỡ mẫu $n = 40$, nhóm chứa trung vị $M_e$ là:',
    options: [
      { key: 'A', content: '$[20; 30)$' },
      { key: 'B', content: '$[30; 40)$' },
      { key: 'C', content: '$[10; 20)$' },
      { key: 'D', content: '$[40; 50)$' },
    ],
    correctAnswer: 'A',
    explanation: 'Ta có $\\frac{n}{2} = 20$. Tần số tích lũy nhóm 1 là $6 < 20$, nhóm 2 là $6 + 18 = 24 \\ge 20$. Vậy nhóm $[20; 30)$ chứa trung vị.',
    pedagogicalTip: 'Tìm nhóm đầu tiên có tần số tích lũy lớn hơn hoặc bằng $\\frac{n}{2}$.',
  },
  {
    topic: 'Bài 9. Các số đặc trưng đo xu thế trung tâm',
    prompt: 'Từ bảng tần số ($[10; 20)$: $6$; $[20; 30)$: $18$; $[30; 40)$: $11$; $[40; 50)$: $5$, cỡ mẫu $n = 40$), nhóm chứa tứ phân vị thứ ba $Q_3$ là:',
    options: [
      { key: 'A', content: '$[30; 40)$' },
      { key: 'B', content: '$[20; 30)$' },
      { key: 'C', content: '$[40; 50)$' },
      { key: 'D', content: '$[10; 20)$' },
    ],
    correctAnswer: 'A',
    explanation: 'Ta có $\\frac{3n}{4} = 30$. Tần số tích lũy đến hết nhóm 2 là $24 < 30$, đến hết nhóm 3 là $24 + 11 = 35 \\ge 30$. Vậy nhóm $[30; 40)$ chứa $Q_3$.',
    pedagogicalTip: 'So sánh $\\frac{3n}{4}$ với tần số tích lũy để xác định nhóm chứa $Q_3$.',
  },
  {
    topic: 'Bài 9. Các số đặc trưng đo xu thế trung tâm',
    prompt: 'Trong công thức tính trung vị $M_e = u_p + \\frac{\\frac{n}{2} - C}{n_p} \\cdot (u_{p+1} - u_p)$ của mẫu số liệu ghép nhóm, đại lượng $C$ là:',
    options: [
      { key: 'A', content: 'Tần số tích lũy của nhóm đứng ngay trước nhóm chứa trung vị' },
      { key: 'B', content: 'Tần số của nhóm chứa trung vị' },
      { key: 'C', content: 'Tần số tích lũy của nhóm chứa trung vị' },
      { key: 'D', content: 'Độ dài của nhóm chứa trung vị' },
    ],
    correctAnswer: 'A',
    explanation: 'Đại lượng $C = m_1 + m_2 + \\dots + m_{p-1}$ là tổng tần số của các nhóm đứng trước nhóm $p$ chứa trung vị (quy ước $C = 0$ nếu $p = 1$).',
    pedagogicalTip: 'Phân biệt kỹ $n_p$ (tần số của nhóm $p$) và $C$ (tần số tích lũy trước nhóm $p$).',
  },
  {
    topic: 'Bài 9. Các số đặc trưng đo xu thế trung tâm',
    prompt: 'Khi mẫu số liệu có các giá trị ngoại lệ (rất lớn hoặc rất nhỏ so với đa số các giá trị khác), ta nên dùng số đặc trưng nào để đại diện cho xu thế trung tâm?',
    options: [
      { key: 'A', content: 'Trung vị $M_e$' },
      { key: 'B', content: 'Số trung bình cộng $\\bar{x}$' },
      { key: 'C', content: 'Khoảng biến thiên $R$' },
      { key: 'D', content: 'Cỡ mẫu $n$' },
    ],
    correctAnswer: 'A',
    explanation: 'Trung vị $M_e$ không bị ảnh hưởng bởi các giá trị quá lớn hoặc quá nhỏ (giá trị bất thường), trong khi số trung bình $\\bar{x}$ rất nhạy cảm với chúng.',
    pedagogicalTip: 'Trung vị ổn định trước các giá trị đột biến ở hai đầu mẫu số liệu.',
  },
  {
    topic: 'Bài 9. Các số đặc trưng đo xu thế trung tâm',
    prompt: 'Bộ ba tứ phân vị $Q_1, Q_2, Q_3$ chia mẫu số liệu đã sắp xếp theo thứ tự không giảm thành bao nhiêu phần có số lượng phần tử bằng nhau?',
    options: [
      { key: 'A', content: '$4$ phần (mỗi phần $25\\%$ số liệu)' },
      { key: 'B', content: '$3$ phần' },
      { key: 'C', content: '$2$ phần' },
      { key: 'D', content: '$5$ phần' },
    ],
    correctAnswer: 'A',
    explanation: 'Ba điểm tứ phân vị $Q_1, Q_2, Q_3$ chia mẫu số liệu thành $4$ phần bằng nhau, mỗi phần chứa $25\\%$ dữ liệu.',
    pedagogicalTip: 'Ba điểm chia một đoạn thẳng thành $4$ phần.',
  },
  {
    topic: 'Bài 9. Các số đặc trưng đo xu thế trung tâm',
    prompt: 'Cho mẫu số liệu ghép nhóm: $[0; 10)$: $5$; $[10; 20)$: $15$; $[20; 30)$: $10$; $[30; 40)$: $10$. Trung vị $M_e$ của mẫu số liệu này bằng:',
    options: [
      { key: 'A', content: '$20$' },
      { key: 'B', content: '$15$' },
      { key: 'C', content: '$25$' },
      { key: 'D', content: '$18$' },
    ],
    correctAnswer: 'A',
    explanation: 'Cỡ mẫu $n = 40 \\Rightarrow \\frac{n}{2} = 20$. Tần số tích lũy hết nhóm 2 vừa đúng bằng $5 + 15 = 20$, nên $M_e = 10 + \\frac{20 - 5}{15} \\cdot 10 = 20$.',
    pedagogicalTip: 'Khi tần số tích lũy hết nhóm $p$ bằng đúng $\\frac{n}{2}$ thì trung vị bằng đầu mút phải của nhóm $p$.',
  },
  {
    topic: 'Bài 9. Các số đặc trưng đo xu thế trung tâm',
    prompt: 'Cho mẫu số liệu ghép nhóm: $[0; 10)$: $4$; $[10; 20)$: $14$; $[20; 30)$: $9$; $[30; 40)$: $3$. Mốt $M_o$ của mẫu số liệu này bằng:',
    options: [
      { key: 'A', content: '$\\frac{40}{3} \\approx 13,33$' },
      { key: 'B', content: '$15$' },
      { key: 'C', content: '$\\frac{50}{3} \\approx 16,67$' },
      { key: 'D', content: '$14$' },
    ],
    correctAnswer: 'C',
    explanation: 'Nhóm chứa mốt là $[10; 20)$ có $a_2 = 10, m_2 = 14, m_1 = 4, m_3 = 9, h = 10$. Khi đó $M_o = 10 + \\frac{14 - 4}{(14 - 4) + (14 - 9)} \\cdot 10 = 10 + \\frac{10}{15} \\cdot 10 = 10 + \\frac{20}{3} = \\frac{50}{3} \\approx 16,67$.',
    pedagogicalTip: 'Công thức mốt: $M_o = a_j + \\frac{m_j - m_{j-1}}{(m_j - m_{j-1}) + (m_j - m_{j+1})} \\cdot h$.',
  },
  {
    topic: 'Bài 9. Các số đặc trưng đo xu thế trung tâm',
    prompt: 'Nếu cộng thêm cùng một số $c = 5$ vào mọi giá trị trong mẫu số liệu thì số trung bình cộng mới sẽ thay đổi như thế nào so với số trung bình cộng ban đầu $\\bar{x}$?',
    options: [
      { key: 'A', content: 'Tăng thêm $5$ đơn vị ($\\bar{x}_{\\text{mới}} = \\bar{x} + 5$)' },
      { key: 'B', content: 'Gấp $5$ lần ($5\\bar{x}$)' },
      { key: 'C', content: 'Không thay đổi' },
      { key: 'D', content: 'Giảm đi $5$ đơn vị' },
    ],
    correctAnswer: 'A',
    explanation: 'Khi tịnh tiến mọi giá trị thêm $5$ đơn vị thì giá trị đại diện mỗi nhóm tăng thêm $5$, nên số trung bình cộng tăng thêm $5$.',
    pedagogicalTip: 'Tính chất tuyến tính của số trung bình: $\\overline{x + c} = \\bar{x} + c$.',
  },
  {
    topic: 'Bài 9. Các số đặc trưng đo xu thế trung tâm',
    prompt: 'Một cửa hàng giày thể thao thống kê cỡ giày bán chạy nhất trong tháng để nhập thêm hàng cho tháng tới. Cửa hàng nên quan tâm nhất đến số đặc trưng nào?',
    options: [
      { key: 'A', content: 'Mốt $M_o$' },
      { key: 'B', content: 'Số trung bình $\\bar{x}$' },
      { key: 'C', content: 'Tứ phân vị thứ nhất $Q_1$' },
      { key: 'D', content: 'Tứ phân vị thứ ba $Q_3$' },
    ],
    correctAnswer: 'A',
    explanation: 'Mốt $M_o$ cho biết giá trị (hoặc khoảng giá trị) xuất hiện với tần số lớn nhất, rất hữu ích để biết cỡ giày phổ biến nhất.',
    pedagogicalTip: 'Bài toán tìm cỡ quần áo, cỡ giày phổ biến nhất luôn sử dụng Mốt $M_o$.',
  },
];

const bai9De1P2: Omit<TrueFalseQuestion, 'id' | 'part' | 'number'>[] = [
  {
    topic: 'Bài 9. Các số đặc trưng đo xu thế trung tâm',
    prompt: 'Khảo sát thời gian hoàn thành một bài chạy cự ly trung bình (đơn vị: phút) của $40$ vận động viên phong trào thu được bảng: $[8; 10)$: $4$ người; $[10; 12)$: $12$ người; $[12; 14)$: $16$ người; $[14; 16)$: $8$ người. Xét tính đúng sai của các mệnh đề sau:',
    statements: [
      {
        id: 'a',
        label: 'a',
        statement: 'Các giá trị đại diện của $4$ nhóm lần lượt là $9; 11; 13; 15$.',
        isCorrect: true,
        explanation: 'Trung bình cộng hai đầu mút của từng nhóm lần lượt là $9; 11; 13; 15$.',
      },
      {
        id: 'b',
        label: 'b',
        statement: 'Thời gian chạy trung bình của $40$ vận động viên là $\\bar{x} = 12,4$ phút.',
        isCorrect: true,
        explanation: 'Ta có $\\bar{x} = \\frac{4 \\cdot 9 + 12 \\cdot 11 + 16 \\cdot 13 + 8 \\cdot 15}{40} = \\frac{36 + 132 + 208 + 120}{40} = \\frac{496}{40} = 12,4$ phút.',
      },
      {
        id: 'c',
        label: 'c',
        statement: 'Trung vị của mẫu số liệu ghép nhóm này là $M_e = 13$ phút.',
        isCorrect: false,
        explanation: 'Nhóm chứa $M_e$ là $[12; 14)$ có $a_3 = 12, m_3 = 16, C_2 = 4 + 12 = 16, h = 2$. Khi đó $M_e = 12 + \\frac{20 - 16}{16} \\cdot 2 = 12,5 \\neq 13$.',
      },
      {
        id: 'd',
        label: 'd',
        statement: 'Mốt của mẫu số liệu ghép nhóm này là $M_o = 12,67$ phút (làm tròn đến hai chữ số thập phân).',
        isCorrect: true,
        explanation: 'Nhóm chứa mốt là $[12; 14)$: $M_o = 12 + \\frac{16 - 12}{(16 - 12) + (16 - 8)} \\cdot 2 = 12 + \\frac{4}{12} \\cdot 2 \\approx 12,67$ phút.',
      },
    ],
    pedagogicalTip: 'Thực hành tính trọn bộ $\\bar{x}, M_e, M_o$ trên cùng một bảng tần số ghép nhóm.',
  },
  {
    topic: 'Bài 9. Các số đặc trưng đo xu thế trung tâm',
    prompt: 'Thống kê năng suất lúa (tạ/ha) của $60$ thửa ruộng thí nghiệm được cho bởi bảng: $[50; 55)$: $6$; $[55; 60)$: $15$; $[60; 65)$: $24$; $[65; 70)$: $10$; $[70; 75)$: $5$. Xét tính đúng sai của các mệnh đề sau:',
    statements: [
      {
        id: 'a',
        label: 'a',
        statement: 'Tứ phân vị thứ nhất $Q_1$ thuộc nhóm $[55; 60)$.',
        isCorrect: true,
        explanation: 'Ta có $\\frac{n}{4} = 15$. Tần số tích lũy nhóm 1 là $6 < 15$, nhóm 2 là $6 + 15 = 21 \\ge 15$ nên $Q_1 \\in [55; 60)$.',
      },
      {
        id: 'b',
        label: 'b',
        statement: 'Giá trị của tứ phân vị thứ nhất là $Q_1 = 58$ (tạ/ha).',
        isCorrect: true,
        explanation: 'Ta có $Q_1 = 55 + \\frac{15 - 6}{15} \\cdot 5 = 55 + 3 = 58$.',
      },
      {
        id: 'c',
        label: 'c',
        statement: 'Tứ phân vị thứ ba $Q_3$ thuộc nhóm $[65; 70)$.',
        isCorrect: false,
        explanation: 'Ta có $\\frac{3n}{4} = 45$. Tần số tích lũy đến hết nhóm 3 ($[60; 65)$) là $6 + 15 + 24 = 45$, nên $Q_3$ thuộc nhóm $[60; 65)$ và bằng đúng $65$.',
      },
      {
        id: 'd',
        label: 'd',
        statement: 'Giá trị của tứ phân vị thứ ba là $Q_3 = 65$ (tạ/ha).',
        isCorrect: true,
        explanation: 'Tại nhóm $[60; 65)$: $Q_3 = 60 + \\frac{45 - 21}{24} \\cdot 5 = 60 + 5 = 65$.',
      },
    ],
    pedagogicalTip: 'Lập dãy tần số tích lũy $6; 21; 45; 55; 60$ trước khi tìm $Q_1, Q_2, Q_3$.',
  },
];

const bai9De1P3: Omit<ShortAnswerQuestion, 'id' | 'part' | 'number' | 'points'>[] = [
  {
    topic: 'Bài 9. Các số đặc trưng đo xu thế trung tâm',
    prompt: 'Cho mẫu số liệu ghép nhóm: $[10; 20)$: $5$; $[20; 30)$: $12$; $[30; 40)$: $8$. Tính số trung bình cộng $\\bar{x}$ của mẫu số liệu.',
    acceptableAnswers: ['26.2', '26,2'],
    explanation: 'Cỡ mẫu $n = 25$, giá trị đại diện là $15; 25; 35$. Ta có $\\bar{x} = \\frac{5 \\cdot 15 + 12 \\cdot 25 + 8 \\cdot 35}{25} = \\frac{75 + 300 + 280}{25} = \\frac{655}{25} = 26,2$.',
    pedagogicalTip: 'Nhân từng tần số với giá trị đại diện rồi chia cho $n = 25$.',
  },
  {
    topic: 'Bài 9. Các số đặc trưng đo xu thế trung tâm',
    prompt: 'Cho bảng tần số ghép nhóm: $[20; 30)$: $8$; $[30; 40)$: $16$; $[40; 50)$: $12$; $[50; 60)$: $4$. Tính trung vị $M_e$ của mẫu số liệu.',
    acceptableAnswers: ['37.5', '37,5'],
    explanation: 'Cỡ mẫu $n = 40 \\Rightarrow \\frac{n}{2} = 20$. Nhóm chứa $M_e$ là $[30; 40)$ có $a_2 = 30, m_2 = 16, C_1 = 8, h = 10$. Suy ra $M_e = 30 + \\frac{20 - 8}{16} \\cdot 10 = 30 + 7,5 = 37,5$.',
    pedagogicalTip: 'Áp dụng công thức $M_e = 30 + \\frac{20 - 8}{16} \\cdot 10 = 37,5$.',
  },
  {
    topic: 'Bài 9. Các số đặc trưng đo xu thế trung tâm',
    prompt: 'Từ bảng tần số ở câu trên ($[20; 30)$: $8$; $[30; 40)$: $16$; $[40; 50)$: $12$; $[50; 60)$: $4$), tính mốt $M_o$ của mẫu số liệu.',
    acceptableAnswers: ['36.67', '36,67', '36.7', '36,7'],
    explanation: 'Nhóm chứa mốt là $[30; 40)$ với $m_2 = 16, m_1 = 8, m_3 = 12, h = 10$. Ta có $M_o = 30 + \\frac{16 - 8}{(16 - 8) + (16 - 12)} \\cdot 10 = 30 + \\frac{8}{12} \\cdot 10 \\approx 36,67$.',
    pedagogicalTip: 'Thay $m_2 - m_1 = 8$ và $m_2 - m_3 = 4$ vào công thức mốt.',
  },
  {
    topic: 'Bài 9. Các số đặc trưng đo xu thế trung tâm',
    prompt: 'Cho bảng tần số ghép nhóm có cỡ mẫu $n = 48$: $[0; 10)$: $6$; $[10; 20)$: $12$; $[20; 30)$: $18$; $[30; 40)$: $12$. Tính tứ phân vị thứ nhất $Q_1$.',
    acceptableAnswers: ['15', '15.0'],
    explanation: 'Ta có $\\frac{n}{4} = 12$. Nhóm chứa $Q_1$ là $[10; 20)$ có $a_2 = 10, m_2 = 12, C_1 = 6, h = 10$. Suy ra $Q_1 = 10 + \\frac{12 - 6}{12} \\cdot 10 = 15$.',
    pedagogicalTip: 'Áp dụng công thức $Q_1 = a_p + \\frac{\\frac{n}{4} - C_{p-1}}{m_p} \\cdot h$.',
  },
];

const bai9De1P4: Omit<StepOrderingQuestion, 'id' | 'part' | 'number' | 'points'>[] = [
  {
    topic: 'Bài 9. Các số đặc trưng đo xu thế trung tâm',
    problemStatement: 'Khảo sát cân nặng (kg) của $50$ bao gạo xuất khẩu thu được bảng: $[48; 49)$: $5$ bao; $[49; 50)$: $15$ bao; $[50; 51)$: $20$ bao; $[51; 52)$: $10$ bao. Hãy sắp xếp các bước tính cân nặng trung bình $\\bar{x}$ của các bao gạo theo đúng thứ tự logic.',
    conclusionTarget: 'Tính được cân nặng trung bình $\\bar{x} = 50,2$ (kg).',
    steps: [
      {
        id: 's1',
        originalIndex: 1,
        roleDescription: 'Xác định giá trị đại diện của từng nhóm cân nặng',
        content: 'Lấy trung bình cộng hai đầu mút, ta được các giá trị đại diện lần lượt là $48,5; 49,5; 50,5; 51,5$ (kg).',
      },
      {
        id: 's2',
        originalIndex: 2,
        roleDescription: 'Kiểm tra cỡ mẫu n của mẫu số liệu',
        content: 'Cỡ mẫu là tổng số bao gạo: $n = 5 + 15 + 20 + 10 = 50$.',
      },
      {
        id: 's3',
        originalIndex: 3,
        roleDescription: 'Thiết lập biểu thức số trung bình cộng',
        content: 'Áp dụng công thức: $\\bar{x} = \\frac{5 \\cdot 48,5 + 15 \\cdot 49,5 + 20 \\cdot 50,5 + 10 \\cdot 51,5}{50}$.',
      },
      {
        id: 's4',
        originalIndex: 4,
        roleDescription: 'Tính kết quả và kết luận',
        content: 'Thu gọn tử số bằng $2\\,510$, suy ra $\\bar{x} = \\frac{2510}{50} = 50,2$ (kg).',
      },
    ],
    pedagogicalTip: 'Bước đầu tiên khi tính số trung bình của mẫu ghép nhóm luôn là tìm các giá trị đại diện $x_i$.',
    teacherAnalysis: 'Quy trình 4 bước chuẩn tính số trung bình cộng $\\bar{x}$.',
  },
  {
    topic: 'Bài 9. Các số đặc trưng đo xu thế trung tâm',
    problemStatement: 'Cho mẫu số liệu ghép nhóm về chiều cao (cm) của $40$ cây thông non: $[20; 30)$: $6$ cây; $[30; 40)$: $10$ cây; $[40; 50)$: $16$ cây; $[50; 60)$: $8$ cây. Hãy sắp xếp các bước tính trung vị $M_e$ của mẫu số liệu theo đúng thứ tự logic.',
    conclusionTarget: 'Tính được trung vị $M_e = 42,5$ (cm).',
    steps: [
      {
        id: 's1',
        originalIndex: 1,
        roleDescription: 'Tìm vị trí trung vị n/2 và lập tần số tích lũy',
        content: 'Cỡ mẫu $n = 40 \\Rightarrow \\frac{n}{2} = 20$. Tần số tích lũy của các nhóm lần lượt là $6; 16; 32; 40$.',
      },
      {
        id: 's2',
        originalIndex: 2,
        roleDescription: 'Xác định nhóm chứa trung vị và các đại lượng trong công thức',
        content: 'Vì $16 < 20 \\le 32$ nên nhóm thứ ba $[40; 50)$ chứa trung vị với $a_3 = 40, m_3 = 16, C_2 = 16$ và độ dài nhóm $h = 10$.',
      },
      {
        id: 's3',
        originalIndex: 3,
        roleDescription: 'Thay số vào công thức tính trung vị M_e',
        content: 'Thay vào công thức: $M_e = 40 + \\frac{20 - 16}{16} \\cdot 10$.',
      },
      {
        id: 's4',
        originalIndex: 4,
        roleDescription: 'Tính kết quả và kết luận',
        content: 'Thu gọn ta được $M_e = 40 + \\frac{40}{16} = 40 + 2,5 = 42,5$ (cm).',
      },
    ],
    pedagogicalTip: 'Kiểm tra kết quả $M_e = 42,5$ phải nằm bên trong nhóm chứa trung vị $[40; 50)$.',
    teacherAnalysis: 'Rèn kỹ năng xác định nhóm chứa trung vị và áp dụng công thức nội suy.',
  },
  {
    topic: 'Bài 9. Các số đặc trưng đo xu thế trung tâm',
    problemStatement: 'Từ bảng số liệu chiều cao $40$ cây thông non ($[20; 30)$: $6$; $[30; 40)$: $10$; $[40; 50)$: $16$; $[50; 60)$: $8$), hãy sắp xếp các bước tính mốt $M_o$ của mẫu số liệu theo đúng thứ tự logic.',
    conclusionTarget: 'Tính được mốt $M_o = 44,29$ (cm).',
    steps: [
      {
        id: 's1',
        originalIndex: 1,
        roleDescription: 'Xác định nhóm chứa mốt dựa vào tần số lớn nhất',
        content: 'Tần số lớn nhất trong bảng là $16$, nên nhóm chứa mốt là nhóm thứ ba $[40; 50)$.',
      },
      {
        id: 's2',
        originalIndex: 2,
        roleDescription: 'Xác định các tham số a_3, m_3, m_2, m_4 và h',
        content: 'Ta có đầu mút trái $a_3 = 40$, tần số nhóm chứa mốt $m_3 = 16$, tần số nhóm liền trước $m_2 = 10$, nhóm liền sau $m_4 = 8$, độ dài nhóm $h = 10$.',
      },
      {
        id: 's3',
        originalIndex: 3,
        roleDescription: 'Thay các tham số vào công thức tính mốt',
        content: 'Áp dụng công thức: $M_o = 40 + \\frac{16 - 10}{(16 - 10) + (16 - 8)} \\cdot 10$.',
      },
      {
        id: 's4',
        originalIndex: 4,
        roleDescription: 'Rút gọn và kết luận giá trị của mốt',
        content: 'Tính toán ta được $M_o = 40 + \\frac{6}{6 + 8} \\cdot 10 = 40 + \\frac{30}{7} \\approx 44,29$ (cm).',
      },
    ],
    pedagogicalTip: 'Chú ý mẫu số trong công thức mốt là tổng hai hiệu $(m_j - m_{j-1}) + (m_j - m_{j+1})$.',
    teacherAnalysis: 'Quy trình chuẩn tìm mốt của mẫu số liệu ghép nhóm.',
  },
  {
    topic: 'Bài 9. Các số đặc trưng đo xu thế trung tâm',
    problemStatement: 'Cho mẫu số liệu ghép nhóm về điểm thi thử ($n = 60$ học sinh): $[4; 5)$: $6$; $[5; 6)$: $9$; $[6; 7)$: $18$; $[7; 8)$: $15$; $[8; 9)$: $12$. Hãy sắp xếp các bước tính tứ phân vị thứ nhất $Q_1$ và tứ phân vị thứ ba $Q_3$ theo đúng thứ tự logic.',
    conclusionTarget: 'Tìm được $Q_1 = 6$ và $Q_3 = 7,8$.',
    steps: [
      {
        id: 's1',
        originalIndex: 1,
        roleDescription: 'Lập dãy tần số tích lũy của 5 nhóm',
        content: 'Cỡ mẫu $n = 60$, tần số tích lũy của $5$ nhóm lần lượt là $6; 15; 33; 48; 60$.',
      },
      {
        id: 's2',
        originalIndex: 2,
        roleDescription: 'Xác định nhóm chứa Q_1 và tính Q_1',
        content: 'Ta có $\\frac{n}{4} = 15$, thuộc nhóm $[5; 6)$ với $a_2 = 5, m_2 = 9, C_1 = 6, h = 1 \\Rightarrow Q_1 = 5 + \\frac{15 - 6}{9} \\cdot 1 = 6$.',
      },
      {
        id: 's3',
        originalIndex: 3,
        roleDescription: 'Xác định nhóm chứa Q_3',
        content: 'Ta có $\\frac{3n}{4} = 45$. Vì $33 < 45 \\le 48$ nên nhóm thứ tư $[7; 8)$ chứa $Q_3$ với $a_4 = 7, m_4 = 15, C_3 = 33, h = 1$.',
      },
      {
        id: 's4',
        originalIndex: 4,
        roleDescription: 'Tính Q_3 và kết luận',
        content: 'Thay số ta được $Q_3 = 7 + \\frac{45 - 33}{15} \\cdot 1 = 7 + 0,8 = 7,8$. Vậy $Q_1 = 6$ và $Q_3 = 7,8$.',
      },
    ],
    pedagogicalTip: 'Tứ phân vị $Q_1$ ứng với mốc $\\frac{n}{4}$ và $Q_3$ ứng với mốc $\\frac{3n}{4}$.',
    teacherAnalysis: 'Bài toán tổng hợp tính hai tứ phân vị $Q_1, Q_3$.',
  },
];

const bai9De2P1: Omit<MultipleChoiceQuestion, 'id' | 'part' | 'number' | 'points'>[] = [
  {
    topic: 'Bài 9. Các số đặc trưng đo xu thế trung tâm',
    prompt: 'Giá trị đại diện của nhóm $[15,5; 20,5)$ là:',
    options: [
      { key: 'A', content: '$18$' },
      { key: 'B', content: '$17,5$' },
      { key: 'C', content: '$18,5$' },
      { key: 'D', content: '$5$' },
    ],
    correctAnswer: 'A',
    explanation: 'Giá trị đại diện là $\\frac{15,5 + 20,5}{2} = 18$.',
    pedagogicalTip: 'Lấy trung bình cộng hai đầu mút.',
  },
  {
    topic: 'Bài 9. Các số đặc trưng đo xu thế trung tâm',
    prompt: 'Cho bảng tần số ghép nhóm: $[0; 4)$: $5$; $[4; 8)$: $10$; $[8; 12)$: $5$. Số trung bình cộng $\\bar{x}$ của mẫu số liệu này bằng:',
    options: [
      { key: 'A', content: '$6$' },
      { key: 'B', content: '$5$' },
      { key: 'C', content: '$7$' },
      { key: 'D', content: '$8$' },
    ],
    correctAnswer: 'A',
    explanation: 'Các giá trị đại diện là $2; 6; 10$, cỡ mẫu $n = 20$. Do phân bố đối xứng nên $\\bar{x} = \\frac{5 \\cdot 2 + 10 \\cdot 6 + 5 \\cdot 10}{20} = 6$.',
    pedagogicalTip: 'Khi bảng tần số đối xứng thì $\\bar{x}$ bằng đúng giá trị đại diện của nhóm chính giữa.',
  },
  {
    topic: 'Bài 9. Các số đặc trưng đo xu thế trung tâm',
    prompt: 'Cho mẫu số liệu ghép nhóm có cỡ mẫu $n = 80$. Khi tìm nhóm chứa tứ phân vị thứ nhất $Q_1$, ta so sánh tần số tích lũy của các nhóm với giá trị nào?',
    options: [
      { key: 'A', content: '$\\frac{n}{4} = 20$' },
      { key: 'B', content: '$\\frac{n}{2} = 40$' },
      { key: 'C', content: '$\\frac{3n}{4} = 60$' },
      { key: 'D', content: '$n = 80$' },
    ],
    correctAnswer: 'A',
    explanation: 'Tứ phân vị thứ nhất $Q_1$ ứng với mốc $25\\%$ cỡ mẫu, tức là $\\frac{n}{4} = \\frac{80}{4} = 20$.',
    pedagogicalTip: '$Q_1$ ứng với $\\frac{n}{4}$, $Q_2$ ứng với $\\frac{n}{2}$, $Q_3$ ứng với $\\frac{3n}{4}$.',
  },
  {
    topic: 'Bài 9. Các số đặc trưng đo xu thế trung tâm',
    prompt: 'Cho bảng tần số ghép nhóm: $[10; 15)$: $7$; $[15; 20)$: $12$; $[20; 25)$: $19$; $[25; 30)$: $19$; $[30; 35)$: $3$. Mẫu số liệu này có bao nhiêu nhóm chứa mốt?',
    options: [
      { key: 'A', content: '$2$ nhóm' },
      { key: 'B', content: '$1$ nhóm' },
      { key: 'C', content: 'Không có nhóm nào' },
      { key: 'D', content: '$3$ nhóm' },
    ],
    correctAnswer: 'A',
    explanation: 'Có hai nhóm $[20; 25)$ và $[25; 30)$ cùng đạt tần số lớn nhất bằng $19$, nên mẫu có $2$ nhóm chứa mốt.',
    pedagogicalTip: 'Một mẫu số liệu ghép nhóm có thể có nhiều hơn $1$ mốt.',
  },
  {
    topic: 'Bài 9. Các số đặc trưng đo xu thế trung tâm',
    prompt: 'Cho bảng tần số ghép nhóm: $[0; 20)$: $10$; $[20; 40)$: $20$; $[40; 60)$: $15$; $[60; 80)$: $5$. Tứ phân vị thứ nhất $Q_1$ của mẫu số liệu này bằng:',
    options: [
      { key: 'A', content: '$22,5$' },
      { key: 'B', content: '$25$' },
      { key: 'C', content: '$20$' },
      { key: 'D', content: '$27,5$' },
    ],
    correctAnswer: 'A',
    explanation: 'Cỡ mẫu $n = 50 \\Rightarrow \\frac{n}{4} = 12,5$. Nhóm chứa $Q_1$ là $[20; 40)$ có $a_2 = 20, m_2 = 20, C_1 = 10, h = 20$. Suy ra $Q_1 = 20 + \\frac{12,5 - 10}{20} \\cdot 20 = 22,5$.',
    pedagogicalTip: 'Do $m_2 = 20$ và $h = 20$ nên $\\frac{h}{m_2} = 1$, tính rất nhanh $Q_1 = 20 + 2,5 = 22,5$.',
  },
  {
    topic: 'Bài 9. Các số đặc trưng đo xu thế trung tâm',
    prompt: 'Từ bảng tần số ở câu trên ($[0; 20)$: $10$; $[20; 40)$: $20$; $[40; 60)$: $15$; $[60; 80)$: $5$, $n = 50$), trung vị $M_e$ của mẫu số liệu bằng:',
    options: [
      { key: 'A', content: '$35$' },
      { key: 'B', content: '$30$' },
      { key: 'C', content: '$32,5$' },
      { key: 'D', content: '$37,5$' },
    ],
    correctAnswer: 'A',
    explanation: 'Ta có $\\frac{n}{2} = 25$. Nhóm chứa $M_e$ là $[20; 40)$: $M_e = 20 + \\frac{25 - 10}{20} \\cdot 20 = 20 + 15 = 35$.',
    pedagogicalTip: 'Áp dụng công thức $M_e = 20 + \\frac{25 - 10}{20} \\cdot 20 = 35$.',
  },
  {
    topic: 'Bài 9. Các số đặc trưng đo xu thế trung tâm',
    prompt: 'Từ bảng tần số ở câu trên ($[0; 20)$: $10$; $[20; 40)$: $20$; $[40; 60)$: $15$; $[60; 80)$: $5$), mốt $M_o$ của mẫu số liệu bằng:',
    options: [
      { key: 'A', content: '$\\frac{100}{3} \\approx 33,33$' },
      { key: 'B', content: '$30$' },
      { key: 'C', content: '$35$' },
      { key: 'D', content: '$\\frac{80}{3} \\approx 26,67$' },
    ],
    correctAnswer: 'A',
    explanation: 'Nhóm chứa mốt là $[20; 40)$: $M_o = 20 + \\frac{20 - 10}{(20 - 10) + (20 - 15)} \\cdot 20 = 20 + \\frac{10}{15} \\cdot 20 = \\frac{100}{3} \\approx 33,33$.',
    pedagogicalTip: 'Áp dụng công thức mốt với $m_2 - m_1 = 10$ và $m_2 - m_3 = 5$.',
  },
  {
    topic: 'Bài 9. Các số đặc trưng đo xu thế trung tâm',
    prompt: 'Ý nghĩa của tứ phân vị thứ ba $Q_3$ trong thống kê điểm thi là:',
    options: [
      { key: 'A', content: 'Khoảng $75\\%$ số học sinh có điểm thi nhỏ hơn hoặc bằng $Q_3$' },
      { key: 'B', content: 'Khoảng $25\\%$ số học sinh có điểm thi nhỏ hơn hoặc bằng $Q_3$' },
      { key: 'C', content: 'Khoảng $50\\%$ số học sinh có điểm thi nhỏ hơn hoặc bằng $Q_3$' },
      { key: 'D', content: '$Q_3$ là điểm thi có nhiều học sinh đạt được nhất' },
    ],
    correctAnswer: 'A',
    explanation: 'Tứ phân vị thứ ba $Q_3$ ngăn cách $75\\%$ số liệu bên trái (nhỏ hơn hoặc bằng $Q_3$) và $25\\%$ số liệu bên phải.',
    pedagogicalTip: '$Q_1 \\leftrightarrow 25\\%$, $Q_2 \\leftrightarrow 50\\%$, $Q_3 \\leftrightarrow 75\\%$.',
  },
  {
    topic: 'Bài 9. Các số đặc trưng đo xu thế trung tâm',
    prompt: 'Cho bảng tần số ghép nhóm: $[10; 20)$: $4$; $[20; 30)$: $8$; $[30; 40)$: $8$. Nếu nhân đôi tần số của tất cả các nhóm lên thành $8; 16; 16$ thì số trung bình $\\bar{x}$ và trung vị $M_e$ thay đổi như thế nào?',
    options: [
      { key: 'A', content: 'Cả $\\bar{x}$ và $M_e$ đều không thay đổi' },
      { key: 'B', content: 'Cả $\\bar{x}$ và $M_e$ đều tăng gấp đôi' },
      { key: 'C', content: '$\\bar{x}$ không đổi nhưng $M_e$ tăng gấp đôi' },
      { key: 'D', content: '$\\bar{x}$ tăng gấp đôi nhưng $M_e$ không đổi' },
    ],
    correctAnswer: 'A',
    explanation: 'Khi nhân tất cả các tần số với cùng một hằng số $k > 0$, tỉ lệ tần số từng nhóm không đổi nên $\\bar{x}, M_e, Q_1, Q_3, M_o$ đều giữ nguyên.',
    pedagogicalTip: 'Các số đặc trưng đo xu thế trung tâm chỉ phụ thuộc vào tỉ lệ phân bố tần số.',
  },
  {
    topic: 'Bài 9. Các số đặc trưng đo xu thế trung tâm',
    prompt: 'Khi nhóm đầu tiên $[a_1; a_2)$ là nhóm chứa mốt thì trong công thức tính mốt $M_o$, tần số của nhóm liền trước $m_0$ được quy ước bằng:',
    options: [
      { key: 'A', content: '$m_0 = 0$' },
      { key: 'B', content: '$m_0 = 1$' },
      { key: 'C', content: '$m_0 = m_1$' },
      { key: 'D', content: '$m_0 = m_2$' },
    ],
    correctAnswer: 'A',
    explanation: 'Theo quy ước SGK: nếu nhóm chứa mốt là nhóm đầu tiên thì $m_0 = 0$; nếu là nhóm cuối cùng thì $m_{k+1} = 0$.',
    pedagogicalTip: 'Tần số ngoài biên bảng số liệu luôn quy ước bằng $0$.',
  },
  {
    topic: 'Bài 9. Các số đặc trưng đo xu thế trung tâm',
    prompt: 'Cho mẫu số liệu ghép nhóm: $[2; 6)$: $5$; $[6; 10)$: $10$; $[10; 14)$: $15$; $[14; 18)$: $10$. Nhóm chứa trung vị $M_e$ là:',
    options: [
      { key: 'A', content: '$[10; 14)$' },
      { key: 'B', content: '$[6; 10)$' },
      { key: 'C', content: '$[14; 18)$' },
      { key: 'D', content: '$[2; 6)$' },
    ],
    correctAnswer: 'A',
    explanation: 'Cỡ mẫu $n = 40 \\Rightarrow \\frac{n}{2} = 20$. Tần số tích lũy 2 nhóm đầu là $15 < 20$, đến nhóm 3 là $30 \\ge 20$ nên nhóm $[10; 14)$ chứa trung vị.',
    pedagogicalTip: 'Tính tần số tích lũy $5; 15; 30; 40$.',
  },
  {
    topic: 'Bài 9. Các số đặc trưng đo xu thế trung tâm',
    prompt: 'Từ bảng tần số ở câu trên ($[2; 6)$: $5$; $[6; 10)$: $10$; $[10; 14)$: $15$; $[14; 18)$: $10$), giá trị của mốt $M_o$ bằng:',
    options: [
      { key: 'A', content: '$12$' },
      { key: 'B', content: '$11$' },
      { key: 'C', content: '$12,5$' },
      { key: 'D', content: '$11,5$' },
    ],
    correctAnswer: 'A',
    explanation: 'Nhóm chứa mốt là $[10; 14)$ có $m_3 = 15$ và hai nhóm kề bên có tần số bằng nhau $m_2 = m_4 = 10$, nên mốt nằm chính giữa nhóm: $M_o = 10 + \\frac{5}{5 + 5} \\cdot 4 = 12$.',
    pedagogicalTip: 'Khi hai nhóm kề bên nhóm chứa mốt có tần số bằng nhau, $M_o$ bằng đúng giá trị đại diện của nhóm chứa mốt.',
  },
];

const bai9De2P2: Omit<TrueFalseQuestion, 'id' | 'part' | 'number'>[] = [
  ...bai9De1P2,
];

const bai9De2P3: Omit<ShortAnswerQuestion, 'id' | 'part' | 'number' | 'points'>[] = [
  {
    topic: 'Bài 9. Các số đặc trưng đo xu thế trung tâm',
    prompt: 'Cho mẫu số liệu ghép nhóm: $[0; 6)$: $4$; $[6; 12)$: $10$; $[12; 18)$: $6$. Tính số trung bình cộng $\\bar{x}$ của mẫu số liệu.',
    acceptableAnswers: ['9.6', '9,6'],
    explanation: 'Giá trị đại diện là $3; 9; 15$, cỡ mẫu $n = 20$. Ta có $\\bar{x} = \\frac{4 \\cdot 3 + 10 \\cdot 9 + 6 \\cdot 15}{20} = \\frac{12 + 90 + 90}{20} = \\frac{192}{20} = 9,6$.',
    pedagogicalTip: 'Tính $\\frac{192}{20} = 9,6$.',
  },
  {
    topic: 'Bài 9. Các số đặc trưng đo xu thế trung tâm',
    prompt: 'Cho mẫu số liệu ghép nhóm: $[10; 20)$: $5$; $[20; 30)$: $15$; $[30; 40)$: $20$; $[40; 50)$: $10$. Tính trung vị $M_e$ của mẫu số liệu.',
    acceptableAnswers: ['32.5', '32,5'],
    explanation: 'Cỡ mẫu $n = 50 \\Rightarrow \\frac{n}{2} = 25$. Nhóm chứa $M_e$ là $[30; 40)$ có $C_2 = 20, m_3 = 20, h = 10$. Suy ra $M_e = 30 + \\frac{25 - 20}{20} \\cdot 10 = 32,5$.',
    pedagogicalTip: 'Áp dụng công thức $M_e = 30 + \\frac{5}{20} \\cdot 10 = 32,5$.',
  },
  {
    topic: 'Bài 9. Các số đặc trưng đo xu thế trung tâm',
    prompt: 'Từ bảng tần số ở câu trên ($[10; 20)$: $5$; $[20; 30)$: $15$; $[30; 40)$: $20$; $[40; 50)$: $10$, $n = 50$), tính tứ phân vị thứ ba $Q_3$.',
    acceptableAnswers: ['38.75', '38,75', '38.8', '38,8'],
    explanation: 'Ta có $\\frac{3n}{4} = 37,5$. Nhóm chứa $Q_3$ là $[30; 40)$ có $C_2 = 20, m_3 = 20, h = 10$. Suy ra $Q_3 = 30 + \\frac{37,5 - 20}{20} \\cdot 10 = 30 + 8,75 = 38,75$.',
    pedagogicalTip: 'Tính $30 + \\frac{17,5}{2} = 38,75$.',
  },
  {
    topic: 'Bài 9. Các số đặc trưng đo xu thế trung tâm',
    prompt: 'Từ bảng tần số ở câu trên ($[10; 20)$: $5$; $[20; 30)$: $15$; $[30; 40)$: $20$; $[40; 50)$: $10$), tính mốt $M_o$ của mẫu số liệu (làm tròn đến hai chữ số thập phân).',
    acceptableAnswers: ['33.33', '33,33'],
    explanation: 'Nhóm chứa mốt là $[30; 40)$: $M_o = 30 + \\frac{20 - 15}{(20 - 15) + (20 - 10)} \\cdot 10 = 30 + \\frac{5}{15} \\cdot 10 \\approx 33,33$.',
    pedagogicalTip: 'Áp dụng công thức mốt với $m_3 = 20, m_2 = 15, m_4 = 10$.',
  },
];

const bai9De2P4: Omit<StepOrderingQuestion, 'id' | 'part' | 'number' | 'points'>[] = [
  ...bai9De1P4,
];

// ============================================================================
// ÔN TẬP CHƯƠNG III. BÀI TẬP CUỐI CHƯƠNG III (2 Đề ôn tổng hợp Chương III)
// ============================================================================
const onTapC3De1P1 = [
  bai8De1P1[0],
  bai8De1P1[2],
  bai8De1P1[3],
  bai8De1P1[8],
  bai8De1P1[10],
  bai9De1P1[0],
  bai9De1P1[1],
  bai9De1P1[2],
  bai9De1P1[3],
  bai9De1P1[4],
  bai9De1P1[6],
  bai9De1P1[9],
];
const onTapC3De1P2 = [bai8De1P2[0], bai9De1P2[0]];
const onTapC3De1P3 = [bai8De1P3[0], bai8De1P3[2], bai9De1P3[0], bai9De1P3[1]];
const onTapC3De1P4 = [bai8De1P4[0], bai9De1P4[0], bai9De1P4[1], bai9De1P4[2]];

const onTapC3De2P1 = [
  bai8De2P1[0],
  bai8De2P1[2],
  bai8De2P1[5],
  bai8De2P1[7],
  bai8De2P1[10],
  bai9De2P1[1],
  bai9De2P1[3],
  bai9De2P1[4],
  bai9De2P1[5],
  bai9De2P1[6],
  bai9De2P1[7],
  bai9De2P1[11],
];
const onTapC3De2P2 = [bai8De1P2[1], bai9De1P2[1]];
const onTapC3De2P3 = [bai8De2P3[2], bai8De2P3[3], bai9De2P3[1], bai9De2P3[2]];
const onTapC3De2P4 = [bai8De1P4[1], bai8De1P4[2], bai9De1P4[2], bai9De1P4[3]];

export const chapter3LessonExams: Record<string, ExamSet[]> = {
  'bai-8': [
    buildLessonExamSet(
      'de-on-bai-8-so-1',
      'Đề ôn số 01 - Bài 8. Mẫu số liệu ghép nhóm',
      'Bài 8. Mẫu số liệu ghép nhóm',
      1,
      bai8De1P1,
      bai8De1P2,
      bai8De1P3,
      bai8De1P4
    ),
    buildLessonExamSet(
      'de-on-bai-8-so-2',
      'Đề ôn số 02 - Bài 8. Mẫu số liệu ghép nhóm',
      'Bài 8. Mẫu số liệu ghép nhóm',
      2,
      bai8De2P1,
      bai8De2P2,
      bai8De2P3,
      bai8De2P4
    ),
  ],
  'bai-9': [
    buildLessonExamSet(
      'de-on-bai-9-so-1',
      'Đề ôn số 01 - Bài 9. Các số đặc trưng đo xu thế trung tâm',
      'Bài 9. Các số đặc trưng đo xu thế trung tâm',
      1,
      bai9De1P1,
      bai9De1P2,
      bai9De1P3,
      bai9De1P4
    ),
    buildLessonExamSet(
      'de-on-bai-9-so-2',
      'Đề ôn số 02 - Bài 9. Các số đặc trưng đo xu thế trung tâm',
      'Bài 9. Các số đặc trưng đo xu thế trung tâm',
      2,
      bai9De2P1,
      bai9De2P2,
      bai9De2P3,
      bai9De2P4
    ),
  ],
  'on-tap-chuong-3': [
    buildLessonExamSet(
      'de-on-on-tap-chuong-3-so-1',
      'Đề ôn số 01 - Ôn tập chương III. Bài tập cuối chương III',
      'Ôn tập chương III. Bài tập cuối chương III',
      1,
      onTapC3De1P1,
      onTapC3De1P2,
      onTapC3De1P3,
      onTapC3De1P4
    ),
    buildLessonExamSet(
      'de-on-on-tap-chuong-3-so-2',
      'Đề ôn số 02 - Ôn tập chương III. Bài tập cuối chương III',
      'Ôn tập chương III. Bài tập cuối chương III',
      2,
      onTapC3De2P1,
      onTapC3De2P2,
      onTapC3De2P3,
      onTapC3De2P4
    ),
  ],
};
