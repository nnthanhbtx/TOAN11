import { ExamSet } from '../../types/exam';
import {
  CompactMC,
  CompactTF,
  CompactSA,
  CompactSO,
  buildCompactLessonExamSet
} from './chapter4';
import {
  TIKZ_CUBE_ABCD,
  TIKZ_PYR_SABC_SA_PERP,
  TIKZ_PYR_SABC_SA_PERP_AH,
  TIKZ_PYR_SABCD_SA_PERP,
  TIKZ_PYR_REGULAR_SABCD,
  TIKZ_RIGHT_PRISM_ABCA1B1C1,
  TIKZ_TETRA_OABC_ORTHO,
  b22P1A, b22P2A, b22P3A, b22P4A,
  b22P1B, b22P2B, b22P3B, b22P4B,
  b23P1A, b23P2A, b23P3A, b23P4A,
  b23P1B, b23P2B, b23P3B, b23P4B,
  b24P1A, b24P2A, b24P3A, b24P4A,
  b24P1B, b24P2B, b24P3B, b24P4B
} from './chapter7a';

// ============================================================================
// BÀI 25. HAI MẶT PHẲNG VUÔNG GÓC
// Trọng tâm: Góc giữa hai mặt phẳng, điều kiện và tính chất hai mặt phẳng vuông
// góc, góc nhị diện và góc phẳng nhị diện, hình lăng trụ đứng, lăng trụ đều,
// hình hộp đứng, hình hộp chữ nhật, hình lập phương, hình chóp đều, chóp cụt đều.
// ============================================================================

const b25P1A: CompactMC[] = [
  {
    prompt: 'Trong không gian, góc $\\varphi$ giữa hai mặt phẳng $(P)$ và $(Q)$ luôn thoả mãn điều kiện nào sau đây?',
    options: [
      { id: 'A', text: '$0^\\circ \\le \\varphi \\le 180^\\circ$' },
      { id: 'B', text: '$0^\\circ \\le \\varphi \\le 90^\\circ$' },
      { id: 'C', text: '$0^\\circ < \\varphi < 90^\\circ$' },
      { id: 'D', text: '$0^\\circ \\le \\varphi < 180^\\circ$' }
    ],
    correctOptionId: 'B',
    explanation: 'Góc giữa hai mặt phẳng là góc giữa hai đường thẳng lần lượt vuông góc với hai mặt phẳng đó, nên luôn thoả mãn $0^\\circ \\le \\varphi \\le 90^\\circ$.'
  },
  {
    prompt: 'Điều kiện cần và đủ để hai mặt phẳng $(P)$ và $(Q)$ vuông góc với nhau là:',
    options: [
      { id: 'A', text: 'Mặt phẳng $(P)$ chứa một đường thẳng song song với $(Q)$' },
      { id: 'B', text: 'Mặt phẳng $(P)$ chứa một đường thẳng vuông góc với mặt phẳng $(Q)$' },
      { id: 'C', text: 'Mọi đường thẳng nằm trong $(P)$ đều vuông góc với $(Q)$' },
      { id: 'D', text: 'Hai mặt phẳng $(P)$ và $(Q)$ có một điểm chung' }
    ],
    correctOptionId: 'B',
    explanation: 'Theo định lí điều kiện: Hai mặt phẳng vuông góc với nhau khi và chỉ khi mặt phẳng này chứa một đường thẳng vuông góc với mặt phẳng kia.'
  },
  {
    prompt: 'Nếu hai mặt phẳng cắt nhau $(P)$ và $(Q)$ cùng vuông góc với mặt phẳng $(R)$ thì giao tuyến $d = (P) \\cap (Q)$ của chúng có tính chất gì?',
    options: [
      { id: 'A', text: '$d \\parallel (R)$' },
      { id: 'B', text: '$d \\perp (R)$' },
      { id: 'C', text: '$d \\subset (R)$' },
      { id: 'D', text: '$d$ tạo với $(R)$ một góc $45^\\circ$' }
    ],
    correctOptionId: 'B',
    explanation: 'Theo tính chất hai mặt phẳng vuông góc: Nếu hai mặt phẳng cắt nhau và cùng vuông góc với mặt phẳng thứ ba thì giao tuyến của chúng vuông góc với mặt phẳng thứ ba đó.'
  },
  {
    prompt: 'Số đo của một góc nhị diện $[P, a, Q]$ có thể nhận giá trị trong đoạn nào sau đây?',
    options: [
      { id: 'A', text: '$[0^\\circ; 90^\\circ]$' },
      { id: 'B', text: '$[0^\\circ; 180^\\circ]$' },
      { id: 'C', text: '$(0^\\circ; 90^\\circ)$' },
      { id: 'D', text: '$[90^\\circ; 180^\\circ]$' }
    ],
    correctOptionId: 'B',
    explanation: 'Số đo của một góc nhị diện bằng số đo góc phẳng nhị diện tương ứng (là góc giữa hai tia), nên có thể nhận giá trị từ $0^\\circ$ đến $180^\\circ$.'
  },
  {
    prompt: 'Cho hình chóp $S.ABCD$ có đáy $ABCD$ là hình vuông và $SA \\perp (ABCD)$. Mặt phẳng $(SAC)$ vuông góc với mặt phẳng nào sau đây?',
    options: [
      { id: 'A', text: '$(SBD)$' },
      { id: 'B', text: '$(SAB)$' },
      { id: 'C', text: '$(SBC)$' },
      { id: 'D', text: '$(SCD)$' }
    ],
    correctOptionId: 'A',
    explanation: 'Vì $BD \\perp AC$ và $BD \\perp SA$ nên $BD \\perp (SAC)$. Mặt phẳng $(SBD)$ chứa đường thẳng $BD$ nên $(SBD) \\perp (SAC)$.',
    tikzType: 'custom',
    tikzCode: TIKZ_PYR_SABCD_SA_PERP
  },
  {
    prompt: 'Cho hình chóp $S.ABC$ có $SA \\perp (ABC)$ và tam giác $ABC$ vuông tại $B$. Mặt phẳng $(SBC)$ vuông góc với mặt phẳng nào sau đây?',
    options: [
      { id: 'A', text: '$(SAB)$' },
      { id: 'B', text: '$(SAC)$' },
      { id: 'C', text: '$(ABC)$' },
      { id: 'D', text: 'Không vuông góc với mặt phẳng nào' }
    ],
    correctOptionId: 'A',
    explanation: 'Vì $BC \\perp AB$ và $BC \\perp SA$ nên $BC \\perp (SAB)$. Mặt phẳng $(SBC)$ chứa $BC$ nên $(SBC) \\perp (SAB)$.',
    tikzType: 'custom',
    tikzCode: TIKZ_PYR_SABC_SA_PERP
  },
  {
    prompt: 'Cho hình chóp $S.ABCD$ có đáy $ABCD$ là hình chữ nhật với $AB = a, AD = a\\sqrt{3}$, cạnh bên $SA \\perp (ABCD)$ và $SA = a\\sqrt{3}$. Số đo góc phẳng nhị diện $[S, CD, A]$ bằng:',
    options: [
      { id: 'A', text: '$30^\\circ$' },
      { id: 'B', text: '$45^\\circ$' },
      { id: 'C', text: '$60^\\circ$' },
      { id: 'D', text: '$90^\\circ$' }
    ],
    correctOptionId: 'B',
    explanation: 'Ta có $AD \\perp CD$ và $SD \\perp CD$ (theo định lí ba đường vuông góc), nên góc phẳng nhị diện $[S, CD, A]$ là $\\widehat{SDA}$. Trong $\\triangle SAD$ vuông tại $A$ có $SA = AD = a\\sqrt{3}$ nên $\\widehat{SDA} = 45^\\circ$.',
    tikzType: 'custom',
    tikzCode: TIKZ_PYR_SABCD_SA_PERP
  },
  {
    prompt: 'Cho hình chóp tứ giác đều $S.ABCD$ có cạnh đáy bằng $2a$ và chiều cao $SO = a\\sqrt{3}$. Góc giữa mặt bên $(SCD)$ và mặt đáy $(ABCD)$ bằng:',
    options: [
      { id: 'A', text: '$30^\\circ$' },
      { id: 'B', text: '$45^\\circ$' },
      { id: 'C', text: '$60^\\circ$' },
      { id: 'D', text: '$75^\\circ$' }
    ],
    correctOptionId: 'C',
    explanation: 'Gọi $M$ là trung điểm của $CD$. Ta có $OM \\perp CD, SM \\perp CD$ và $OM = \\frac{2a}{2} = a$. Trong $\\triangle SOM$ vuông tại $O$: $\\tan\\widehat{SMO} = \\frac{SO}{OM} = \\frac{a\\sqrt{3}}{a} = \\sqrt{3} \\Rightarrow \\widehat{SMO} = 60^\\circ$.',
    tikzType: 'custom',
    tikzCode: TIKZ_PYR_REGULAR_SABCD
  },
  {
    prompt: 'Khẳng định nào sau đây là **đúng** về **hình lăng trụ đều**?',
    options: [
      { id: 'A', text: 'Là hình lăng trụ có đáy là đa giác đều và cạnh bên xiên' },
      { id: 'B', text: 'Là hình lăng trụ đứng có đáy là đa giác đều' },
      { id: 'C', text: 'Là hình lăng trụ có tất cả các cạnh bên và cạnh đáy bắt buộc bằng nhau' },
      { id: 'D', text: 'Là hình lăng trụ có các mặt bên là các hình thoi' }
    ],
    correctOptionId: 'B',
    explanation: 'Theo định nghĩa: Hình lăng trụ đứng có đáy là đa giác đều được gọi là hình lăng trụ đều (các mặt bên là các hình chữ nhật bằng nhau).'
  },
  {
    prompt: 'Trong một **hình hộp chữ nhật** có ba kích thước đôi một khác nhau $a, b, c$ ($a, b, c > 0$), độ dài đường chéo $d$ của hình hộp chữ nhật bằng:',
    options: [
      { id: 'A', text: '$d = a + b + c$' },
      { id: 'B', text: '$d = \\sqrt{a^2 + b^2 + c^2}$' },
      { id: 'C', text: '$d = \\sqrt{ab + bc + ca}$' },
      { id: 'D', text: '$d = a^2 + b^2 + c^2$' }
    ],
    correctOptionId: 'B',
    explanation: 'Độ dài đường chéo của hình hộp chữ nhật có ba kích thước $a, b, c$ là $d = \\sqrt{a^2 + b^2 + c^2}$.'
  },
  {
    prompt: 'Cho hình lập phương $ABCD.A\'B\'C\'D\'$. Số đo của góc nhị diện $[A, BB\', C]$ bằng:',
    options: [
      { id: 'A', text: '$45^\\circ$' },
      { id: 'B', text: '$60^\\circ$' },
      { id: 'C', text: '$90^\\circ$' },
      { id: 'D', text: '$120^\\circ$' }
    ],
    correctOptionId: 'C',
    explanation: 'Ta có $AB \\perp BB\'$ và $CB \\perp BB\'$, nên góc phẳng nhị diện $[A, BB\', C]$ là $\\widehat{ABC} = 90^\\circ$.',
    tikzType: 'custom',
    tikzCode: TIKZ_CUBE_ABCD
  },
  {
    prompt: 'Các mặt bên của một **hình chóp cụt đều** là các hình gì?',
    options: [
      { id: 'A', text: 'Các hình chữ nhật bằng nhau' },
      { id: 'B', text: 'Các hình thang cân bằng nhau' },
      { id: 'C', text: 'Các hình bình hành bằng nhau' },
      { id: 'D', text: 'Các hình thang vuông bằng nhau' }
    ],
    correctOptionId: 'B',
    explanation: 'Theo tính chất của hình chóp cụt đều: Các mặt bên của hình chóp cụt đều là những hình thang cân bằng nhau.'
  }
];

const b25P2A: CompactTF[] = [
  {
    stem: 'Cho hình chóp $S.ABC$ có hai mặt bên $(SAB)$ và $(SAC)$ cùng vuông góc với mặt phẳng đáy $(ABC)$, đáy $ABC$ là tam giác đều cạnh $2a$ và $SA = 3a$. Gọi $M$ là trung điểm của cạnh $BC$. Xét tính đúng sai của các mệnh đề sau:',
    tikzType: 'custom',
    tikzCode: TIKZ_PYR_SABC_SA_PERP,
    statements: [
      {
        id: 'a',
        text: 'Cạnh bên $SA$ vuông góc với mặt phẳng đáy $(ABC)$.',
        isTrue: true,
        explanation: 'Đúng vì $(SAB) \\cap (SAC) = SA$ và cả hai mặt phẳng cùng vuông góc với $(ABC)$ nên $SA \\perp (ABC)$.'
      },
      {
        id: 'b',
        text: 'Góc phẳng nhị diện $[S, BC, A]$ là góc $\\widehat{SMA}$.',
        isTrue: true,
        explanation: 'Đúng vì trong $\\triangle ABC$ đều có $AM \\perp BC$, kết hợp $SA \\perp BC \\Rightarrow SM \\perp BC$, nên $[S, BC, A] = \\widehat{SMA}$.'
      },
      {
        id: 'c',
        text: 'Mặt phẳng $(SAM)$ vuông góc với mặt phẳng $(SBC)$.',
        isTrue: true,
        explanation: 'Đúng vì $BC \\perp AM$ và $BC \\perp SA \\Rightarrow BC \\perp (SAM)$, mà $BC \\subset (SBC)$ nên $(SBC) \\perp (SAM)$.'
      },
      {
        id: 'd',
        text: 'Số đo góc giữa hai mặt phẳng $(SBC)$ và $(ABC)$ bằng $45^\\circ$.',
        isTrue: false,
        explanation: 'Sai vì $AM = \\frac{2a\\sqrt{3}}{2} = a\\sqrt{3}$, nên $\\tan\\widehat{SMA} = \\frac{SA}{AM} = \\frac{3a}{a\\sqrt{3}} = \\sqrt{3} \\Rightarrow \\widehat{SMA} = 60^\\circ$.'
      }
    ]
  },
  {
    stem: 'Cho hình hộp chữ nhật $ABCD.A\'B\'C\'D\'$ có $AB = 3, AD = 4, AA\' = 12$. Xét tính đúng sai của các mệnh đề sau:',
    tikzType: 'custom',
    tikzCode: TIKZ_CUBE_ABCD,
    statements: [
      {
        id: 'a',
        text: 'Tất cả $6$ mặt của hình hộp chữ nhật đều là hình chữ nhật.',
        isTrue: true,
        explanation: 'Đúng theo định nghĩa và tính chất của hình hộp chữ nhật.'
      },
      {
        id: 'b',
        text: 'Mặt phẳng bên $(ABB\'A\')$ vuông góc với mặt phẳng đáy $(ABCD)$.',
        isTrue: true,
        explanation: 'Đúng vì $AA\' \\perp (ABCD)$ và $AA\' \\subset (ABB\'A\')$.'
      },
      {
        id: 'c',
        text: 'Độ dài đường chéo $AC\'$ của hình hộp chữ nhật bằng $13$.',
        isTrue: true,
        explanation: 'Đúng vì $AC\' = \\sqrt{AB^2 + AD^2 + AA\'^2} = \\sqrt{3^2 + 4^2 + 12^2} = \\sqrt{169} = 13$.'
      },
      {
        id: 'd',
        text: 'Hai mặt phẳng chéo $(ACC\'A\')$ và $(BDD\'B\')$ vuông góc với nhau.',
        isTrue: false,
        explanation: 'Sai vì đáy $ABCD$ là hình chữ nhật có $AB = 3 \\ne AD = 4$ nên hai đường chéo $AC$ và $BD$ không vuông góc, do đó $(ACC\'A\')$ và $(BDD\'B\')$ không vuông góc.'
      }
    ]
  }
];

const b25P3A: CompactSA[] = [
  {
    prompt: 'Cho hình chóp $S.ABCD$ có đáy $ABCD$ là hình vuông cạnh $a$, $SA \\perp (ABCD)$ và $SA = a$. Số đo góc (đơn vị: độ) giữa mặt phẳng $(SBC)$ và mặt phẳng $(ABCD)$ bằng bao nhiêu?',
    correctAnswer: '45',
    acceptedAnswers: ['45'],
    explanation: 'Ta có $AB \\perp BC$ và $SB \\perp BC$ nên góc giữa $(SBC)$ và $(ABCD)$ là $\\widehat{SBA}$. Vì $SA = AB = a$ nên $\\triangle SAB$ vuông cân tại $A \\Rightarrow \\widehat{SBA} = 45^\\circ$.',
    tikzType: 'custom',
    tikzCode: TIKZ_PYR_SABCD_SA_PERP
  },
  {
    prompt: 'Cho hình chóp tứ giác đều $S.ABCD$ có cạnh đáy bằng $6$ và trung đoạn (đường cao của mặt bên kẻ từ đỉnh $S$) bằng $6$. Số đo góc (đơn vị: độ) giữa mặt bên $(SBC)$ và mặt đáy $(ABCD)$ bằng bao nhiêu?',
    correctAnswer: '60',
    acceptedAnswers: ['60'],
    explanation: 'Gọi $M$ là trung điểm $BC$. Khi đó $OM = \\frac{6}{2} = 3$ và $SM = 6$. Góc giữa $(SBC)$ và $(ABCD)$ là $\\widehat{SMO}$ với $\\cos\\widehat{SMO} = \\frac{OM}{SM} = \\frac{3}{6} = \\frac{1}{2} \\Rightarrow \\widehat{SMO} = 60^\\circ$.',
    tikzType: 'custom',
    tikzCode: TIKZ_PYR_REGULAR_SABCD
  },
  {
    prompt: 'Tính độ dài đường chéo của một hình hộp chữ nhật có ba kích thước là $2, 3$ và $6$.',
    correctAnswer: '7',
    acceptedAnswers: ['7'],
    explanation: 'Độ dài đường chéo của hình hộp chữ nhật là $d = \\sqrt{2^2 + 3^2 + 6^2} = \\sqrt{4 + 9 + 36} = \\sqrt{49} = 7$.'
  },
  {
    prompt: 'Cho hình lăng trụ đứng $ABC.A\'B\'C\'$ có đáy $ABC$ là tam giác đều cạnh $2\\sqrt{3}$ và cạnh bên $AA\' = 3$. Gọi $M$ là trung điểm của $BC$. Số đo góc (đơn vị: độ) giữa mặt phẳng $(A\'BC)$ và mặt phẳng $(ABC)$ bằng bao nhiêu?',
    correctAnswer: '45',
    acceptedAnswers: ['45'],
    explanation: 'Trong $\\triangle ABC$ đều cạnh $2\\sqrt{3}$, đường cao $AM = \\frac{2\\sqrt{3} \\cdot \\sqrt{3}}{2} = 3$. Vì $AA\' \\perp (ABC)$ nên $A\'M \\perp BC$, suy ra góc giữa $(A\'BC)$ và $(ABC)$ là $\\widehat{A\'MA}$. Do $AA\' = AM = 3$ nên $\\widehat{A\'MA} = 45^\\circ$.',
    tikzType: 'custom',
    tikzCode: TIKZ_RIGHT_PRISM_ABCA1B1C1
  }
];

const b25P4A: CompactSO[] = [
  {
    prompt: 'Sắp xếp các bước chứng minh $(SBC) \\perp (SAB)$ trong hình chóp $S.ABCD$ có đáy $ABCD$ là hình chữ nhật và $SA \\perp (ABCD)$:',
    tikzType: 'custom',
    tikzCode: TIKZ_PYR_SABCD_SA_PERP,
    steps: [
      { id: '1', text: 'Vì $ABCD$ là hình chữ nhật nên $BC \\perp AB$; vì $SA \\perp (ABCD)$ nên $BC \\perp SA$.' },
      { id: '2', text: 'Do $SA$ và $AB$ cắt nhau tại $A$ trong mặt phẳng $(SAB)$ nên $BC \\perp (SAB)$.' },
      { id: '3', text: 'Mặt phẳng $(SBC)$ chứa đường thẳng $BC$.' },
      { id: '4', text: 'Theo điều kiện hai mặt phẳng vuông góc, kết luận $(SBC) \\perp (SAB)$.' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Chứng minh $BC \\perp (SAB)$ rồi suy ra mặt phẳng $(SBC)$ chứa $BC$ phải vuông góc với $(SAB)$.'
  },
  {
    prompt: 'Sắp xếp các bước xác định và tính góc giữa mặt phẳng $(SBC)$ và $(ABC)$ trong hình chóp $S.ABC$ có $SA \\perp (ABC), \\triangle ABC$ đều cạnh $2a$ và $SA = a$:',
    tikzType: 'custom',
    tikzCode: TIKZ_PYR_SABC_SA_PERP,
    steps: [
      { id: '1', text: 'Gọi $M$ là trung điểm của cạnh $BC$, trong $\\triangle ABC$ đều cạnh $2a$ ta có $AM \\perp BC$ và $AM = a\\sqrt{3}$.' },
      { id: '2', text: 'Theo Định lí ba đường vuông góc, vì $SA \\perp (ABC)$ và $AM \\perp BC$ nên $SM \\perp BC$.' },
      { id: '3', text: 'Suy ra góc giữa hai mặt phẳng $(SBC)$ và $(ABC)$ là góc $\\widehat{SMA}$.' },
      { id: '4', text: 'Trong $\\triangle SAM$ vuông tại $A$: $\\tan\\widehat{SMA} = \\frac{SA}{AM} = \\frac{a}{a\\sqrt{3}} = \\frac{\\sqrt{3}}{3} \\Rightarrow \\widehat{SMA} = 30^\\circ$.' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Gọi $M$ là trung điểm $BC$, chứng minh $AM \\perp BC$ và $SM \\perp BC$, tính $\\tan\\widehat{SMA} = \\frac{1}{\\sqrt{3}} \\Rightarrow 30^\\circ$.'
  },
  {
    prompt: 'Sắp xếp các bước chứng minh $SH \\perp (ABC)$ trong hình chóp $S.ABC$ có $(SAB) \\perp (ABC)$ và $\\triangle SAB$ cân tại $S$ với $H$ là trung điểm $AB$:',
    steps: [
      { id: '1', text: 'Hai mặt phẳng $(SAB)$ và $(ABC)$ vuông góc với nhau theo giao tuyến là đường thẳng $AB$.' },
      { id: '2', text: 'Trong tam giác cân $SAB$ tại $S$, đường trung tuyến $SH$ đồng thời là đường cao nên $SH \\perp AB$.' },
      { id: '3', text: 'Đường thẳng $SH$ nằm trong mặt phẳng $(SAB)$ và vuông góc với giao tuyến $AB$.' },
      { id: '4', text: 'Theo tính chất hai mặt phẳng vuông góc, kết luận $SH \\perp (ABC)$.' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Áp dụng tính chất: Nếu hai mặt phẳng vuông góc với nhau thì bất kì đường thẳng nào nằm trong mặt này và vuông góc với giao tuyến cũng vuông góc với mặt kia.'
  },
  {
    prompt: 'Sắp xếp các bước tính góc nhị diện $[B, SA, C]$ trong hình chóp $S.ABC$ có $SA \\perp (ABC)$ và $\\triangle ABC$ đều cạnh $a$:',
    tikzType: 'custom',
    tikzCode: TIKZ_PYR_SABC_SA_PERP,
    steps: [
      { id: '1', text: 'Vì $SA \\perp (ABC)$ nên $SA \\perp AB$ và $SA \\perp AC$.' },
      { id: '2', text: 'Hai tia $AB \\subset (SAB)$ và $AC \\subset (SAC)$ cùng vuông góc với cạnh nhị diện $SA$ tại điểm $A$.' },
      { id: '3', text: 'Do đó góc phẳng nhị diện của góc nhị diện $[B, SA, C]$ chính là góc $\\widehat{BAC}$.' },
      { id: '4', text: 'Vì $\\triangle ABC$ là tam giác đều nên $\\widehat{BAC} = 60^\\circ$, suy ra số đo góc nhị diện $[B, SA, C]$ bằng $60^\\circ$.' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Vì $AB \\perp SA$ và $AC \\perp SA$ nên góc phẳng nhị diện $[B, SA, C]$ là $\\widehat{BAC} = 60^\\circ$.'
  }
];

const b25P1B: CompactMC[] = [
  {
    prompt: 'Cho hai mặt phẳng $(P)$ và $(Q)$ vuông góc với nhau theo giao tuyến $\\Delta$. Nếu đường thẳng $d$ nằm trong $(P)$ và $d \\perp \\Delta$ thì:',
    options: [
      { id: 'A', text: '$d \\parallel (Q)$' },
      { id: 'B', text: '$d \\perp (Q)$' },
      { id: 'C', text: '$d \\subset (Q)$' },
      { id: 'D', text: '$d$ tạo với $(Q)$ góc $60^\\circ$' }
    ],
    correctOptionId: 'B',
    explanation: 'Theo tính chất hai mặt phẳng vuông góc: Nếu $(P) \\perp (Q)$ theo giao tuyến $\\Delta$, đường thẳng $d \\subset (P)$ và $d \\perp \\Delta$ thì $d \\perp (Q)$.'
  },
  {
    prompt: 'Cho hình chóp $S.ABC$ có $(SAB) \\perp (ABC)$ và $(SAC) \\perp (ABC)$. Đường thẳng nào sau đây vuông góc với mặt phẳng $(ABC)$?',
    options: [
      { id: 'A', text: '$SB$' },
      { id: 'B', text: '$SC$' },
      { id: 'C', text: '$SA$' },
      { id: 'D', text: '$BC$' }
    ],
    correctOptionId: 'C',
    explanation: 'Hai mặt phẳng cắt nhau $(SAB)$ và $(SAC)$ cùng vuông góc với $(ABC)$ nên giao tuyến $SA$ của chúng vuông góc với $(ABC)$.',
    tikzType: 'custom',
    tikzCode: TIKZ_PYR_SABC_SA_PERP
  },
  {
    prompt: 'Cho hình chóp $S.ABCD$ có đáy $ABCD$ là hình vuông cạnh $a$, $SA \\perp (ABCD)$. Số đo của góc nhị diện $[B, SA, D]$ bằng:',
    options: [
      { id: 'A', text: '$45^\\circ$' },
      { id: 'B', text: '$60^\\circ$' },
      { id: 'C', text: '$90^\\circ$' },
      { id: 'D', text: '$120^\\circ$' }
    ],
    correctOptionId: 'C',
    explanation: 'Vì $SA \\perp AB$ và $SA \\perp AD$ nên góc phẳng nhị diện $[B, SA, D]$ là $\\widehat{BAD} = 90^\\circ$ (do $ABCD$ là hình vuông).',
    tikzType: 'custom',
    tikzCode: TIKZ_PYR_SABCD_SA_PERP
  },
  {
    prompt: 'Cho hình lập phương $ABCD.A\'B\'C\'D\'$. Số đo của góc nhị diện $[A\', BD, A]$ có giá trị $\\tan$ bằng:',
    options: [
      { id: 'A', text: '$\\sqrt{2}$' },
      { id: 'B', text: '$\\frac{\\sqrt{2}}{2}$' },
      { id: 'C', text: '$1$' },
      { id: 'D', text: '$\\sqrt{3}$' }
    ],
    correctOptionId: 'A',
    explanation: 'Gọi $O = AC \\cap BD$. Ta có $AO \\perp BD$ và $A\'O \\perp BD$, nên góc phẳng nhị diện $[A\', BD, A]$ là $\\widehat{A\'OA}$. Trong $\\triangle A\'AO$ vuông tại $A$: $\\tan\\widehat{A\'OA} = \\frac{AA\'}{AO} = \\frac{a}{a\\sqrt{2}/2} = \\sqrt{2}$.',
    tikzType: 'custom',
    tikzCode: TIKZ_CUBE_ABCD
  },
  {
    prompt: 'Hình hộp đứng có đáy là hình thoi được gọi là hình gì?',
    options: [
      { id: 'A', text: 'Hình lập phương' },
      { id: 'B', text: 'Hình hộp chữ nhật' },
      { id: 'C', text: 'Hình lăng trụ đứng tứ giác có bốn mặt bên là các hình chữ nhật bằng nhau' },
      { id: 'D', text: 'Hình chóp tứ giác đều' }
    ],
    correctOptionId: 'C',
    explanation: 'Hình hộp đứng có đáy là hình thoi thì các cạnh bên vuông góc với đáy và bốn cạnh đáy bằng nhau, nên bốn mặt bên là bốn hình chữ nhật bằng nhau (chỉ là hình hộp chữ nhật khi hình thoi có góc vuông).'
  },
  {
    prompt: 'Cho hình chóp tứ giác đều $S.ABCD$ có tất cả các cạnh đều bằng $a$. Giá trị côsin của góc giữa mặt bên $(SBC)$ và mặt đáy $(ABCD)$ bằng:',
    options: [
      { id: 'A', text: '$\\frac{\\sqrt{3}}{3}$' },
      { id: 'B', text: '$\\frac{\\sqrt{3}}{2}$' },
      { id: 'C', text: '$\\frac{1}{2}$' },
      { id: 'D', text: '$\\frac{\\sqrt{2}}{2}$' }
    ],
    correctOptionId: 'A',
    explanation: 'Gọi $M$ là trung điểm $BC$, tâm đáy là $O$. Ta có $OM = \\frac{a}{2}$ và trung đoạn $SM = \\frac{a\\sqrt{3}}{2}$. Khi đó $\\cos\\widehat{SMO} = \\frac{OM}{SM} = \\frac{a/2}{a\\sqrt{3}/2} = \\frac{1}{\\sqrt{3}} = \\frac{\\sqrt{3}}{3}$.',
    tikzType: 'custom',
    tikzCode: TIKZ_PYR_REGULAR_SABCD
  },
  {
    prompt: 'Cho tứ diện $OABC$ có $OA, OB, OC$ đôi một vuông góc và $OA = OB = OC = a$. Giá trị $\\tan$ của góc giữa hai mặt phẳng $(ABC)$ và $(OBC)$ bằng:',
    options: [
      { id: 'A', text: '$\\sqrt{2}$' },
      { id: 'B', text: '$\\frac{\\sqrt{2}}{2}$' },
      { id: 'C', text: '$\\sqrt{3}$' },
      { id: 'D', text: '$1$' }
    ],
    correctOptionId: 'A',
    explanation: 'Gọi $M$ là trung điểm $BC$. Ta có $OM \\perp BC, AM \\perp BC$ nên góc giữa $(ABC)$ và $(OBC)$ là $\\widehat{AMO}$. Vì $OM = \\frac{BC}{2} = \\frac{a\\sqrt{2}}{2}$ nên $\\tan\\widehat{AMO} = \\frac{OA}{OM} = \\frac{a}{a\\sqrt{2}/2} = \\sqrt{2}$.',
    tikzType: 'custom',
    tikzCode: TIKZ_TETRA_OABC_ORTHO
  },
  {
    prompt: 'Trong một hình chóp tứ giác đều $S.ABCD$, mặt phẳng $(SAC)$ vuông góc với mặt phẳng nào dưới đây?',
    options: [
      { id: 'A', text: '$(SAB)$' },
      { id: 'B', text: '$(SBC)$' },
      { id: 'C', text: '$(SBD)$' },
      { id: 'D', text: '$(SCD)$' }
    ],
    correctOptionId: 'C',
    explanation: 'Gọi $O = AC \\cap BD$. Vì $SO \\perp (ABCD)$ nên $(SAC) \\perp (ABCD)$ và $BD \\perp AC, BD \\perp SO \\Rightarrow BD \\perp (SAC) \\Rightarrow (SBD) \\perp (SAC)$.',
    tikzType: 'custom',
    tikzCode: TIKZ_PYR_REGULAR_SABCD
  },
  {
    prompt: 'Một hình lập phương có độ dài đường chéo bằng $3\\sqrt{3}$. Độ dài cạnh của hình lập phương đó bằng:',
    options: [
      { id: 'A', text: '$3$' },
      { id: 'B', text: '$3\\sqrt{2}$' },
      { id: 'C', text: '$9$' },
      { id: 'D', text: '$\\sqrt{3}$' }
    ],
    correctOptionId: 'A',
    explanation: 'Đường chéo hình lập phương cạnh $a$ là $d = a\\sqrt{3} = 3\\sqrt{3} \\Rightarrow a = 3$.'
  },
  {
    prompt: 'Cho hình lăng trụ đứng $ABC.A\'B\'C\'$ có đáy $ABC$ là tam giác vuông cân tại $A$ với $AB = AC = a$ và $AA\' = \\frac{a\\sqrt{6}}{2}$. Góc giữa mặt phẳng $(A\'BC)$ và mặt đáy $(ABC)$ bằng:',
    options: [
      { id: 'A', text: '$30^\\circ$' },
      { id: 'B', text: '$45^\\circ$' },
      { id: 'C', text: '$60^\\circ$' },
      { id: 'D', text: '$75^\\circ$' }
    ],
    correctOptionId: 'C',
    explanation: 'Gọi $M$ là trung điểm $BC$. Trong $\\triangle ABC$ vuông cân tại $A$, ta có $AM = \\frac{BC}{2} = \\frac{a\\sqrt{2}}{2}$. Khi đó $\\tan\\widehat{A\'MA} = \\frac{AA\'}{AM} = \\frac{a\\sqrt{6}/2}{a\\sqrt{2}/2} = \\sqrt{3} \\Rightarrow \\widehat{A\'MA} = 60^\\circ$.',
    tikzType: 'custom',
    tikzCode: TIKZ_RIGHT_PRISM_ABCA1B1C1
  },
  {
    prompt: 'Cho hình chóp cụt tứ giác đều $ABCD.A\'B\'C\'D\'$ có cạnh đáy lớn $AB = 6$, cạnh đáy nhỏ $A\'B\' = 2$ và chiều cao $OO\' = 2\\sqrt{3}$. Góc giữa mặt bên và mặt đáy lớn bằng:',
    options: [
      { id: 'A', text: '$30^\\circ$' },
      { id: 'B', text: '$45^\\circ$' },
      { id: 'C', text: '$60^\\circ$' },
      { id: 'D', text: '$75^\\circ$' }
    ],
    correctOptionId: 'C',
    explanation: 'Gọi $M, M\'$ là trung điểm $BC, B\'C\'$. Ta có $OM = 3, O\'M\' = 1$. Kẻ $M\'H \\perp OM$ tại $H$ thì $M\'H = OO\' = 2\\sqrt{3}$ và $HM = OM - O\'M\' = 2$. Do đó $\\tan\\widehat{M\'MH} = \\frac{M\'H}{HM} = \\frac{2\\sqrt{3}}{2} = \\sqrt{3} \\Rightarrow 60^\\circ$.'
  },
  {
    prompt: 'Cho hình chóp $S.ABC$ có đáy $ABC$ là tam giác vuông tại $B$, cạnh bên $SA \\perp (ABC)$. Số đo góc nhị diện $[A, BC, S]$ bằng:',
    options: [
      { id: 'A', text: '$\\widehat{SBA}$' },
      { id: 'B', text: '$\\widehat{SCA}$' },
      { id: 'C', text: '$\\widehat{SAB}$' },
      { id: 'D', text: '$90^\\circ$' }
    ],
    correctOptionId: 'A',
    explanation: 'Vì $AB \\perp BC$ và $SB \\perp BC$ nên góc phẳng nhị diện $[A, BC, S]$ chính là góc $\\widehat{SBA}$.',
    tikzType: 'custom',
    tikzCode: TIKZ_PYR_SABC_SA_PERP
  }
];

const b25P2B: CompactTF[] = [
  {
    stem: 'Cho hình chóp tứ giác đều $S.ABCD$ có cạnh đáy bằng $2a$, tâm đáy là $O$ và chiều cao $SO = a$. Gọi $M$ là trung điểm của cạnh $BC$. Xét tính đúng sai của các mệnh đề sau:',
    tikzType: 'custom',
    tikzCode: TIKZ_PYR_REGULAR_SABCD,
    statements: [
      {
        id: 'a',
        text: 'Đường thẳng $SO$ vuông góc với mặt phẳng đáy $(ABCD)$.',
        isTrue: true,
        explanation: 'Đúng theo tính chất của hình chóp đều.'
      },
      {
        id: 'b',
        text: 'Mặt phẳng $(SAC)$ và mặt phẳng $(SBD)$ vuông góc với nhau.',
        isTrue: true,
        explanation: 'Đúng vì $BD \\perp AC$ và $BD \\perp SO \\Rightarrow BD \\perp (SAC) \\Rightarrow (SBD) \\perp (SAC)$.'
      },
      {
        id: 'c',
        text: 'Góc phẳng nhị diện $[S, BC, O]$ là góc $\\widehat{SMO}$ và có số đo bằng $45^\\circ$.',
        isTrue: true,
        explanation: 'Đúng vì $OM \\perp BC, SM \\perp BC$ và $OM = \\frac{2a}{2} = a = SO$ nên $\\triangle SOM$ vuông cân tại $O \\Rightarrow \\widehat{SMO} = 45^\\circ$.'
      },
      {
        id: 'd',
        text: 'Hai mặt bên đối diện $(SAD)$ và $(SBC)$ vuông góc với nhau.',
        isTrue: true,
        explanation: 'Đúng vì gọi $N$ là trung điểm $AD$, trong $\\triangle SMN$ cân tại $S$ có $\\widehat{SMN} = \\widehat{SNM} = 45^\\circ \\Rightarrow \\widehat{MSN} = 90^\\circ$, nên $(SAD) \\perp (SBC)$.'
      }
    ]
  },
  {
    stem: 'Cho hình chóp $S.ABCD$ có đáy $ABCD$ là hình vuông cạnh $a$, mặt bên $SAB$ là tam giác đều và nằm trong mặt phẳng vuông góc với đáy $(ABCD)$. Gọi $H$ là trung điểm của cạnh $AB$. Xét tính đúng sai của các mệnh đề sau:',
    statements: [
      {
        id: 'a',
        text: 'Đường thẳng $SH$ vuông góc với mặt phẳng đáy $(ABCD)$.',
        isTrue: true,
        explanation: 'Đúng vì $(SAB) \\perp (ABCD)$ theo giao tuyến $AB$ và $SH \\perp AB$ trong $\\triangle SAB$ đều.'
      },
      {
        id: 'b',
        text: 'Độ dài đường cao $SH$ của hình chóp bằng $\\frac{a\\sqrt{3}}{2}$.',
        isTrue: true,
        explanation: 'Đúng theo công thức đường cao tam giác đều cạnh $a$.'
      },
      {
        id: 'c',
        text: 'Mặt phẳng $(SAD)$ vuông góc với mặt phẳng $(SAB)$.',
        isTrue: true,
        explanation: 'Đúng vì $AD \\perp AB$ và $AD \\perp SH \\Rightarrow AD \\perp (SAB) \\Rightarrow (SAD) \\perp (SAB)$.'
      },
      {
        id: 'd',
        text: 'Góc giữa mặt phẳng $(SCD)$ và mặt phẳng $(ABCD)$ bằng $45^\\circ$.',
        isTrue: false,
        explanation: 'Sai vì gọi $K$ là trung điểm $CD$, ta có $HK = a$ và $\\tan\\widehat{SKH} = \\frac{SH}{HK} = \\frac{\\sqrt{3}}{2} \\ne 1$.'
      }
    ]
  }
];

const b25P3B: CompactSA[] = [
  {
    prompt: 'Cho hình chóp $S.ABC$ có $SA \\perp (ABC)$, tam giác $ABC$ vuông tại $B$ với $AB = 5$ và $SA = 5\\sqrt{3}$. Số đo góc (đơn vị: độ) giữa hai mặt phẳng $(SBC)$ và $(ABC)$ bằng bao nhiêu?',
    correctAnswer: '60',
    acceptedAnswers: ['60'],
    explanation: 'Vì $BC \\perp AB$ và $BC \\perp SB$ nên góc giữa $(SBC)$ và $(ABC)$ là $\\widehat{SBA}$. Ta có $\\tan\\widehat{SBA} = \\frac{SA}{AB} = \\sqrt{3} \\Rightarrow \\widehat{SBA} = 60^\\circ$.',
    tikzType: 'custom',
    tikzCode: TIKZ_PYR_SABC_SA_PERP
  },
  {
    prompt: 'Một hình hộp chữ nhật có đáy là hình vuông cạnh $6$ và chiều cao bằng $7$. Tính độ dài đường chéo của hình hộp chữ nhật đó.',
    correctAnswer: '11',
    acceptedAnswers: ['11'],
    explanation: 'Độ dài đường chéo của hình hộp chữ nhật là $d = \\sqrt{6^2 + 6^2 + 7^2} = \\sqrt{36 + 36 + 49} = \\sqrt{121} = 11$.'
  },
  {
    prompt: 'Cho hình chóp tứ giác đều $S.ABCD$ có cạnh đáy bằng $8$ và chiều cao $SO = 4$. Số đo góc (đơn vị: độ) giữa mặt bên $(SCD)$ và mặt đáy $(ABCD)$ bằng bao nhiêu?',
    correctAnswer: '45',
    acceptedAnswers: ['45'],
    explanation: 'Gọi $M$ là trung điểm $CD$, ta có $OM = \\frac{8}{2} = 4 = SO$. Suy ra $\\triangle SOM$ vuông cân tại $O \\Rightarrow \\widehat{SMO} = 45^\\circ$.',
    tikzType: 'custom',
    tikzCode: TIKZ_PYR_REGULAR_SABCD
  },
  {
    prompt: 'Cho hình chóp cụt tứ giác đều có cạnh đáy lớn bằng $10$, cạnh đáy nhỏ bằng $4$ và chiều cao bằng $4$. Tính độ dài đường cao (trung đoạn) của mỗi mặt bên hình thang cân.',
    correctAnswer: '5',
    acceptedAnswers: ['5'],
    explanation: 'Hiệu hai bán kính nội tiếp hai đáy là $OM - O\'M\' = \\frac{10 - 4}{2} = 3$. Trung đoạn mặt bên là $h_b = \\sqrt{h^2 + (OM - O\'M\')^2} = \\sqrt{4^2 + 3^2} = 5$.'
  }
];

const b25P4B: CompactSO[] = [
  {
    prompt: 'Sắp xếp các bước chứng minh $(SAC) \\perp (SBD)$ trong hình chóp tứ giác đều $S.ABCD$ tâm $O$:',
    tikzType: 'custom',
    tikzCode: TIKZ_PYR_REGULAR_SABCD,
    steps: [
      { id: '1', text: 'Vì $S.ABCD$ là hình chóp tứ giác đều nên đường cao $SO \\perp (ABCD)$, suy ra $SO \\perp BD$.' },
      { id: '2', text: 'Vì đáy $ABCD$ là hình vuông nên hai đường chéo vuông góc: $AC \\perp BD$.' },
      { id: '3', text: 'Trong mặt phẳng $(SAC)$, hai đường thẳng $SO$ và $AC$ cắt nhau tại $O$, nên $BD \\perp (SAC)$.' },
      { id: '4', text: 'Vì mặt phẳng $(SBD)$ chứa đường thẳng $BD$ nên $(SBD) \\perp (SAC)$.' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Chứng minh $BD \\perp SO$ và $BD \\perp AC \\Rightarrow BD \\perp (SAC) \\Rightarrow (SBD) \\perp (SAC)$.'
  },
  {
    prompt: 'Sắp xếp các bước tính góc giữa mặt bên $(SBC)$ và mặt đáy $(ABCD)$ trong hình chóp tứ giác đều $S.ABCD$ có cạnh đáy $2a$, cạnh bên $a\\sqrt{5}$:',
    tikzType: 'custom',
    tikzCode: TIKZ_PYR_REGULAR_SABCD,
    steps: [
      { id: '1', text: 'Gọi $M$ là trung điểm $BC$, ta có $OM \\perp BC, SM \\perp BC$ nên góc cần tìm là $\\widehat{SMO}$ với $OM = a$.' },
      { id: '2', text: 'Trong $\\triangle SBC$ cân tại $S$, tính trung đoạn $SM = \\sqrt{SB^2 - BM^2} = \\sqrt{5a^2 - a^2} = 2a$.' },
      { id: '3', text: 'Trong $\\triangle SOM$ vuông tại $O$, tính $\\cos\\widehat{SMO} = \\frac{OM}{SM} = \\frac{a}{2a} = \\frac{1}{2}$.' },
      { id: '4', text: 'Kết luận góc giữa $(SBC)$ và $(ABCD)$ bằng $60^\\circ$.' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Xác định góc $\\widehat{SMO}$, tính $SM = 2a$ và $\\cos\\widehat{SMO} = \\frac{1}{2} \\Rightarrow 60^\\circ$.'
  },
  {
    prompt: 'Sắp xếp các bước chứng minh $(SAD) \\perp (SBC)$ trong hình chóp $S.ABCD$ có đáy là hình chữ nhật, $(SAB) \\perp (ABCD)$ và $\\triangle SAB$ vuông tại $S$:',
    steps: [
      { id: '1', text: 'Gọi $H$ là hình chiếu vuông góc của $S$ trên $AB$; vì $(SAB) \\perp (ABCD)$ nên $SH \\perp (ABCD)$.' },
      { id: '2', text: 'Vì $AD \\perp AB$ và $AD \\perp SH$ nên $AD \\perp (SAB)$, suy ra $AD \\perp SB$.' },
      { id: '3', text: 'Kết hợp giả thiết $\\triangle SAB$ vuông tại $S$ ($SA \\perp SB$), ta có $SB \\perp (SAD)$.' },
      { id: '4', text: 'Vì mặt phẳng $(SBC)$ chứa đường thẳng $SB$ nên $(SBC) \\perp (SAD)$.' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Chứng minh $AD \\perp (SAB) \\Rightarrow AD \\perp SB$; kết hợp $SA \\perp SB \\Rightarrow SB \\perp (SAD) \\Rightarrow (SBC) \\perp (SAD)$.'
  },
  {
    prompt: 'Sắp xếp các bước tính diện tích xung quanh của hình chóp tứ giác đều $S.ABCD$ có cạnh đáy bằng $6$ và góc giữa mặt bên với mặt đáy bằng $60^\\circ$:',
    tikzType: 'custom',
    tikzCode: TIKZ_PYR_REGULAR_SABCD,
    steps: [
      { id: '1', text: 'Gọi $M$ là trung điểm $BC$, khi đó $OM = 3$ và góc giữa mặt bên với đáy là $\\widehat{SMO} = 60^\\circ$.' },
      { id: '2', text: 'Trong $\\triangle SOM$ vuông tại $O$, tính trung đoạn $SM = \\frac{OM}{\\cos 60^\\circ} = \\frac{3}{1/2} = 6$.' },
      { id: '3', text: 'Tính diện tích một mặt bên: $S_{\\triangle SBC} = \\frac{1}{2} BC \\cdot SM = \\frac{1}{2} \\cdot 6 \\cdot 6 = 18$.' },
      { id: '4', text: 'Nhân với $4$ mặt bên bằng nhau, kết luận $S_{xq} = 4 \\cdot 18 = 72$.' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Tính trung đoạn $SM = 6$, diện tích một mặt bên bằng $18$, suy ra $S_{xq} = 72$.'
  }
];

// ============================================================================
// BÀI 26. KHOẢNG CÁCH
// Trọng tâm: Khoảng cách từ một điểm đến một đường thẳng, đến một mặt phẳng;
// khoảng cách giữa đường thẳng và mặt phẳng song song, giữa hai mặt phẳng song
// song; đường vuông góc chung và khoảng cách giữa hai đường thẳng chéo nhau.
// ============================================================================

const b26P1A: CompactMC[] = [
  {
    prompt: 'Cho điểm $M$ và mặt phẳng $(P)$. Gọi $H$ là hình chiếu vuông góc của $M$ trên mặt phẳng $(P)$. Khoảng cách $d(M, (P))$ từ điểm $M$ đến mặt phẳng $(P)$ bằng:',
    options: [
      { id: 'A', text: 'Độ dài đoạn thẳng $MA$ với $A$ là điểm bất kì thuộc $(P)$' },
      { id: 'B', text: 'Độ dài đoạn thẳng $MH$' },
      { id: 'C', text: 'Hai lần độ dài đoạn thẳng $MH$' },
      { id: 'D', text: 'Một nửa độ dài đoạn thẳng $MH$' }
    ],
    correctOptionId: 'B',
    explanation: 'Theo định nghĩa: Khoảng cách từ điểm $M$ đến mặt phẳng $(P)$ là độ dài đoạn thẳng $MH$, trong đó $H$ là hình chiếu vuông góc của $M$ trên $(P)$.'
  },
  {
    prompt: 'Cho hình chóp $S.ABCD$ có đáy $ABCD$ là hình vuông cạnh $a$ và $SA \\perp (ABCD), SA = 2a$. Khoảng cách từ đỉnh $S$ đến mặt phẳng $(ABCD)$ bằng:',
    options: [
      { id: 'A', text: '$a$' },
      { id: 'B', text: '$2a$' },
      { id: 'C', text: '$a\\sqrt{2}$' },
      { id: 'D', text: '$a\\sqrt{5}$' }
    ],
    correctOptionId: 'B',
    explanation: 'Vì $SA \\perp (ABCD)$ tại $A$ nên $d(S, (ABCD)) = SA = 2a$.',
    tikzType: 'custom',
    tikzCode: TIKZ_PYR_SABCD_SA_PERP
  },
  {
    prompt: 'Cho hình chóp $S.ABCD$ có đáy $ABCD$ là hình chữ nhật với $AB = 3a, AD = 4a$ và $SA \\perp (ABCD)$. Khoảng cách từ điểm $D$ đến mặt phẳng $(SAB)$ bằng:',
    options: [
      { id: 'A', text: '$3a$' },
      { id: 'B', text: '$4a$' },
      { id: 'C', text: '$5a$' },
      { id: 'D', text: '$\\frac{12a}{5}$' }
    ],
    correctOptionId: 'B',
    explanation: 'Vì $DA \\perp AB$ và $DA \\perp SA$ nên $DA \\perp (SAB)$ tại $A$. Do đó $d(D, (SAB)) = DA = 4a$.',
    tikzType: 'custom',
    tikzCode: TIKZ_PYR_SABCD_SA_PERP
  },
  {
    prompt: 'Cho hình chóp $S.ABC$ có $SA \\perp (ABC)$, tam giác $ABC$ vuông tại $B$, biết $SA = 3a$ và $AB = 4a$. Khoảng cách từ điểm $A$ đến mặt phẳng $(SBC)$ bằng:',
    options: [
      { id: 'A', text: '$\\frac{12a}{5}$' },
      { id: 'B', text: '$5a$' },
      { id: 'C', text: '$\\frac{5a}{12}$' },
      { id: 'D', text: '$\\frac{7a}{5}$' }
    ],
    correctOptionId: 'A',
    explanation: 'Kẻ $AH \\perp SB$ tại $H$. Vì $BC \\perp (SAB)$ nên $BC \\perp AH$, suy ra $AH \\perp (SBC)$ tại $H$. Vậy $d(A, (SBC)) = AH = \\frac{SA \\cdot AB}{\\sqrt{SA^2 + AB^2}} = \\frac{12a}{5}$.',
    tikzType: 'custom',
    tikzCode: TIKZ_PYR_SABC_SA_PERP_AH
  },
  {
    prompt: 'Cho hình lập phương $ABCD.A\'B\'C\'D\'$ cạnh $a$. Khoảng cách giữa đường thẳng $A\'B\'$ và mặt phẳng $(ABCD)$ bằng:',
    options: [
      { id: 'A', text: '$a$' },
      { id: 'B', text: '$a\\sqrt{2}$' },
      { id: 'C', text: '$\\frac{a\\sqrt{2}}{2}$' },
      { id: 'D', text: '$a\\sqrt{3}$' }
    ],
    correctOptionId: 'A',
    explanation: 'Vì $A\'B\' \\parallel (ABCD)$ nên $d(A\'B\', (ABCD)) = d(A\', (ABCD)) = AA\' = a$.',
    tikzType: 'custom',
    tikzCode: TIKZ_CUBE_ABCD
  },
  {
    prompt: 'Cho hình lập phương $ABCD.A\'B\'C\'D\'$ cạnh $a$. Khoảng cách giữa hai mặt phẳng song song $(ABB\'A\')$ và $(CDD\'C\')$ bằng:',
    options: [
      { id: 'A', text: '$a$' },
      { id: 'B', text: '$a\\sqrt{2}$' },
      { id: 'C', text: '$2a$' },
      { id: 'D', text: '$\\frac{a}{2}$' }
    ],
    correctOptionId: 'A',
    explanation: 'Vì $AD \\perp (ABB\'A\')$ và $AD \\perp (CDD\'C\')$ nên khoảng cách giữa hai mặt phẳng đó bằng $AD = a$.',
    tikzType: 'custom',
    tikzCode: TIKZ_CUBE_ABCD
  },
  {
    prompt: 'Cho hình lập phương $ABCD.A\'B\'C\'D\'$ cạnh $a$. Đường vuông góc chung của hai đường thẳng chéo nhau $AB$ và $CC\'$ là:',
    options: [
      { id: 'A', text: 'Đường thẳng $AC$' },
      { id: 'B', text: 'Đường thẳng $BC$' },
      { id: 'C', text: 'Đường thẳng $BB\'$' },
      { id: 'D', text: 'Đường thẳng $B\'C\'$' }
    ],
    correctOptionId: 'B',
    explanation: 'Đoạn thẳng $BC$ cắt $AB$ tại $B$, cắt $CC\'$ tại $C$, đồng thời $BC \\perp AB$ và $BC \\perp CC\'$, nên $BC$ là đoạn vuông góc chung của $AB$ và $CC\'$ (khoảng cách bằng $a$).',
    tikzType: 'custom',
    tikzCode: TIKZ_CUBE_ABCD
  },
  {
    prompt: 'Cho hình chóp $S.ABCD$ có đáy $ABCD$ là hình vuông cạnh $a$ và $SA \\perp (ABCD), SA = a$. Khoảng cách giữa hai đường thẳng chéo nhau $SA$ và $BC$ bằng:',
    options: [
      { id: 'A', text: '$a$' },
      { id: 'B', text: '$a\\sqrt{2}$' },
      { id: 'C', text: '$\\frac{a\\sqrt{2}}{2}$' },
      { id: 'D', text: '$\\frac{a}{2}$' }
    ],
    correctOptionId: 'A',
    explanation: 'Ta có $AB \\perp SA$ (do $SA \\perp (ABCD)$) và $AB \\perp BC$ (do $ABCD$ là hình vuông). Vậy $AB$ là đoạn vuông góc chung của $SA$ và $BC$, suy ra $d(SA, BC) = AB = a$.',
    tikzType: 'custom',
    tikzCode: TIKZ_PYR_SABCD_SA_PERP
  },
  {
    prompt: 'Cho hình chóp $S.ABCD$ có đáy $ABCD$ là hình vuông cạnh $a$, tâm $O$ và $SA \\perp (ABCD)$. Khoảng cách từ điểm $A$ đến mặt phẳng $(SBD)$ bằng độ dài đoạn thẳng nào khi kẻ $AH \\perp SO$ tại $H$?',
    options: [
      { id: 'A', text: '$AO$' },
      { id: 'B', text: '$AH$' },
      { id: 'C', text: '$SO$' },
      { id: 'D', text: '$SA$' }
    ],
    correctOptionId: 'B',
    explanation: 'Vì $BD \\perp AC$ và $BD \\perp SA$ nên $BD \\perp (SAC) \\Rightarrow (SBD) \\perp (SAC)$ theo giao tuyến $SO$. Trong $(SAC)$ kẻ $AH \\perp SO$ tại $H$ thì $AH \\perp (SBD)$, nên $d(A, (SBD)) = AH$.',
    tikzType: 'custom',
    tikzCode: TIKZ_PYR_SABCD_SA_PERP
  },
  {
    prompt: 'Cho tứ diện $OABC$ có $OA, OB, OC$ đôi một vuông góc và $OA = 2a, OB = 3a, OC = 6a$. Khoảng cách từ điểm $O$ đến mặt phẳng $(ABC)$ bằng:',
    options: [
      { id: 'A', text: '$a$' },
      { id: 'B', text: '$\\frac{3a}{2}$' },
      { id: 'C', text: '$\\frac{6a}{\\sqrt{14}}$' },
      { id: 'D', text: '$2a$' }
    ],
    correctOptionId: 'C',
    explanation: 'Gọi $h = d(O, (ABC))$. Ta có $\\frac{1}{h^2} = \\frac{1}{OA^2} + \\frac{1}{OB^2} + \\frac{1}{OC^2} = \\frac{1}{4a^2} + \\frac{1}{9a^2} + \\frac{1}{36a^2} = \\frac{14}{36a^2} \\Rightarrow h = \\frac{6a}{\\sqrt{14}}$.',
    tikzType: 'custom',
    tikzCode: TIKZ_TETRA_OABC_ORTHO
  },
  {
    prompt: 'Cho hình lăng trụ đứng $ABC.A\'B\'C\'$ có đáy $ABC$ là tam giác đều cạnh $a$ và cạnh bên $AA\' = 2a$. Khoảng cách từ điểm $A$ đến mặt phẳng $(BCC\'B\')$ bằng:',
    options: [
      { id: 'A', text: '$\\frac{a\\sqrt{3}}{2}$' },
      { id: 'B', text: '$a$' },
      { id: 'C', text: '$2a$' },
      { id: 'D', text: '$\\frac{a}{2}$' }
    ],
    correctOptionId: 'A',
    explanation: 'Gọi $M$ là trung điểm $BC$. Ta có $AM \\perp BC$ và $AM \\perp BB\' \\Rightarrow AM \\perp (BCC\'B\')$ tại $M$. Do đó $d(A, (BCC\'B\')) = AM = \\frac{a\\sqrt{3}}{2}$.',
    tikzType: 'custom',
    tikzCode: TIKZ_RIGHT_PRISM_ABCA1B1C1
  },
  {
    prompt: 'Cho hình chóp $S.ABCD$ có đáy $ABCD$ là hình chữ nhật. Biết khoảng cách từ điểm $A$ đến mặt phẳng $(SCD)$ bằng $6$. Khoảng cách từ đường thẳng $AB$ đến mặt phẳng $(SCD)$ bằng:',
    options: [
      { id: 'A', text: '$3$' },
      { id: 'B', text: '$6$' },
      { id: 'C', text: '$12$' },
      { id: 'D', text: '$6\\sqrt{2}$' }
    ],
    correctOptionId: 'B',
    explanation: 'Vì $AB \\parallel CD$ nên $AB \\parallel (SCD)$. Do đó $d(AB, (SCD)) = d(A, (SCD)) = 6$.',
    tikzType: 'custom',
    tikzCode: TIKZ_PYR_SABCD_SA_PERP
  }
];

const b26P2A: CompactTF[] = [
  {
    stem: 'Cho hình chóp $S.ABCD$ có đáy $ABCD$ là hình vuông cạnh $a$, cạnh bên $SA \\perp (ABCD)$ và $SA = a\\sqrt{3}$. Xét tính đúng sai của các mệnh đề sau:',
    tikzType: 'custom',
    tikzCode: TIKZ_PYR_SABCD_SA_PERP,
    statements: [
      {
        id: 'a',
        text: 'Khoảng cách từ điểm $B$ đến mặt phẳng $(SAC)$ bằng $\\frac{a\\sqrt{2}}{2}$.',
        isTrue: true,
        explanation: 'Đúng vì gọi $O = AC \\cap BD$, ta có $BO \\perp AC$ và $BO \\perp SA \\Rightarrow BO \\perp (SAC)$ tại $O$, nên $d(B, (SAC)) = BO = \\frac{a\\sqrt{2}}{2}$.'
      },
      {
        id: 'b',
        text: 'Khoảng cách từ điểm $A$ đến mặt phẳng $(SBC)$ bằng $\\frac{a\\sqrt{3}}{2}$.',
        isTrue: true,
        explanation: 'Đúng vì kẻ $AH \\perp SB$ tại $H$ thì $AH \\perp (SBC)$, và $AH = \\frac{SA \\cdot AB}{\\sqrt{SA^2 + AB^2}} = \\frac{a\\sqrt{3} \\cdot a}{2a} = \\frac{a\\sqrt{3}}{2}$.'
      },
      {
        id: 'c',
        text: 'Khoảng cách giữa đường thẳng $CD$ và mặt phẳng $(SAB)$ bằng $a\\sqrt{3}$.',
        isTrue: false,
        explanation: 'Sai vì $CD \\parallel (SAB)$ và $AD \\perp (SAB)$ nên $d(CD, (SAB)) = d(D, (SAB)) = AD = a$.'
      },
      {
        id: 'd',
        text: 'Khoảng cách giữa hai đường thẳng chéo nhau $SA$ và $CD$ bằng $a$.',
        isTrue: true,
        explanation: 'Đúng vì $AD \\perp SA$ và $AD \\perp CD$ nên $AD$ là đoạn vuông góc chung của $SA$ và $CD$, suy ra $d(SA, CD) = AD = a$.'
      }
    ]
  },
  {
    stem: 'Cho hình lập phương $ABCD.A\'B\'C\'D\'$ có cạnh bằng $a$. Gọi $O, O\'$ lần lượt là tâm của hai đáy $ABCD$ và $A\'B\'C\'D\'$. Xét tính đúng sai của các mệnh đề sau:',
    tikzType: 'custom',
    tikzCode: TIKZ_CUBE_ABCD,
    statements: [
      {
        id: 'a',
        text: 'Khoảng cách từ điểm $A$ đến đường thẳng $BC$ bằng $a$.',
        isTrue: true,
        explanation: 'Đúng vì $AB \\perp BC$ tại $B$ nên $d(A, BC) = AB = a$.'
      },
      {
        id: 'b',
        text: 'Khoảng cách giữa hai đường thẳng chéo nhau $AA\'$ và $BD$ bằng $\\frac{a\\sqrt{2}}{2}$.',
        isTrue: true,
        explanation: 'Đúng vì $AO \\perp AA\'$ và $AO \\perp BD$ nên $AO$ là đoạn vuông góc chung của $AA\'$ và $BD$, suy ra $d(AA\', BD) = AO = \\frac{a\\sqrt{2}}{2}$.'
      },
      {
        id: 'c',
        text: 'Khoảng cách giữa hai đường thẳng chéo nhau $AC$ và $B\'D\'$ bằng $a\\sqrt{2}$.',
        isTrue: false,
        explanation: 'Sai vì $OO\'$ vuông góc với cả $AC$ và $B\'D\'$ nên $d(AC, B\'D\') = OO\' = a$.'
      },
      {
        id: 'd',
        text: 'Khoảng cách từ điểm $A$ đến mặt phẳng $(BDD\'B\')$ bằng $\\frac{a\\sqrt{2}}{2}$.',
        isTrue: true,
        explanation: 'Đúng vì $AO \\perp BD$ và $AO \\perp BB\' \\Rightarrow AO \\perp (BDD\'B\')$ tại $O$, nên $d(A, (BDD\'B\')) = AO = \\frac{a\\sqrt{2}}{2}$.'
      }
    ]
  }
];

const b26P3A: CompactSA[] = [
  {
    prompt: 'Cho hình chóp $S.ABCD$ có đáy $ABCD$ là hình chữ nhật với $AB = 9, AD = 12$, cạnh bên $SA \\perp (ABCD)$ và $SA = 20$. Tính khoảng cách từ điểm $A$ đến đường thẳng $SC$.',
    correctAnswer: '12',
    acceptedAnswers: ['12'],
    explanation: 'Trong hình chữ nhật $ABCD$, đường chéo $AC = \\sqrt{9^2 + 12^2} = 15$. Trong $\\triangle SAC$ vuông tại $A$, ta có $SC = \\sqrt{SA^2 + AC^2} = \\sqrt{20^2 + 15^2} = 25$. Khoảng cách từ $A$ đến $SC$ là đường cao $AK = \\frac{SA \\cdot AC}{SC} = \\frac{20 \\cdot 15}{25} = 12$.',
    tikzType: 'custom',
    tikzCode: TIKZ_PYR_SABCD_SA_PERP
  },
  {
    prompt: 'Cho hình hộp chữ nhật $ABCD.A\'B\'C\'D\'$ có $AB = 5, AD = 8, AA\' = 6$. Tính khoảng cách giữa hai đường thẳng chéo nhau $AA\'$ và $BC$.',
    correctAnswer: '5',
    acceptedAnswers: ['5'],
    explanation: 'Ta có $AB \\perp AA\'$ và $AB \\perp BC$ nên $AB$ là đoạn vuông góc chung của $AA\'$ và $BC$. Vậy $d(AA\', BC) = AB = 5$.',
    tikzType: 'custom',
    tikzCode: TIKZ_CUBE_ABCD
  },
  {
    prompt: 'Cho hình chóp $S.ABCD$ có đáy $ABCD$ là hình vuông cạnh $6\\sqrt{2}$ tâm $O$, cạnh bên $SA \\perp (ABCD)$ và $SA = 8$. Tính khoảng cách từ điểm $A$ đến mặt phẳng $(SBD)$.',
    correctAnswer: '4,8',
    acceptedAnswers: ['4,8', '4.8', '24/5'],
    explanation: 'Hình vuông cạnh $6\\sqrt{2}$ có $AC = 12 \\Rightarrow AO = 6$. Kẻ $AH \\perp SO$ tại $H$ thì $AH \\perp (SBD)$, nên $d(A, (SBD)) = AH = \\frac{SA \\cdot AO}{\\sqrt{SA^2 + AO^2}} = \\frac{8 \\cdot 6}{\\sqrt{8^2 + 6^2}} = \\frac{48}{10} = 4,8$.',
    tikzType: 'custom',
    tikzCode: TIKZ_PYR_SABCD_SA_PERP
  },
  {
    prompt: 'Cho hình chóp $S.ABC$ có $SA \\perp (ABC)$ và $d(A, (SBC)) = 10$. Gọi $M$ là trung điểm của cạnh $AC$. Tính khoảng cách từ điểm $M$ đến mặt phẳng $(SBC)$.',
    correctAnswer: '5',
    acceptedAnswers: ['5'],
    explanation: 'Vì đường thẳng $AC$ cắt mặt phẳng $(SBC)$ tại $C$ và $M$ là trung điểm của $AC$ nên $\\frac{d(M, (SBC))}{d(A, (SBC))} = \\frac{MC}{AC} = \\frac{1}{2} \\Rightarrow d(M, (SBC)) = 5$.',
    tikzType: 'custom',
    tikzCode: TIKZ_PYR_SABC_SA_PERP
  }
];

const b26P4A: CompactSO[] = [
  {
    prompt: 'Sắp xếp các bước tính khoảng cách từ điểm $A$ đến mặt phẳng $(SBC)$ trong hình chóp $S.ABC$ có $SA \\perp (ABC), \\triangle ABC$ vuông tại $B$ với $SA = 3a, AB = 4a$:',
    tikzType: 'custom',
    tikzCode: TIKZ_PYR_SABC_SA_PERP_AH,
    steps: [
      { id: '1', text: 'Trong mặt phẳng $(SAB)$, kẻ $AH \\perp SB$ tại $H$.' },
      { id: '2', text: 'Chứng minh $BC \\perp (SAB)$ (do $BC \\perp AB$ và $BC \\perp SA$), suy ra $BC \\perp AH$.' },
      { id: '3', text: 'Từ $AH \\perp SB$ và $AH \\perp BC$, suy ra $AH \\perp (SBC)$ tại $H$, nên $d(A, (SBC)) = AH$.' },
      { id: '4', text: 'Trong $\\triangle SAB$ vuông tại $A$: $AH = \\frac{SA \\cdot AB}{\\sqrt{SA^2 + AB^2}} = \\frac{3a \\cdot 4a}{5a} = \\frac{12a}{5}$.' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Kẻ $AH \\perp SB$, chứng minh $AH \\perp (SBC)$ và dùng hệ thức lượng trong $\\triangle SAB$ vuông tại $A$.'
  },
  {
    prompt: 'Sắp xếp các bước tính khoảng cách từ điểm $A$ đến mặt phẳng $(SBD)$ trong hình chóp $S.ABCD$ có đáy là hình vuông cạnh $a$ tâm $O$ và $SA \\perp (ABCD), SA = a$:',
    tikzType: 'custom',
    tikzCode: TIKZ_PYR_SABCD_SA_PERP,
    steps: [
      { id: '1', text: 'Gọi $O = AC \\cap BD$, ta có $BD \\perp AC$ và $BD \\perp SA$ nên $BD \\perp (SAC)$.' },
      { id: '2', text: 'Trong mặt phẳng $(SAC)$, kẻ $AH \\perp SO$ tại $H$; vì $BD \\perp (SAC)$ nên $BD \\perp AH$, suy ra $AH \\perp (SBD)$.' },
      { id: '3', text: 'Do đó $d(A, (SBD)) = AH$, với $AO = \\frac{a\\sqrt{2}}{2}$ và $SA = a$.' },
      { id: '4', text: 'Trong $\\triangle SAO$ vuông tại $A$: $\\frac{1}{AH^2} = \\frac{1}{SA^2} + \\frac{1}{AO^2} = \\frac{1}{a^2} + \\frac{2}{a^2} = \\frac{3}{a^2} \\Rightarrow AH = \\frac{a\\sqrt{3}}{3}$.' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Chứng minh $BD \\perp (SAC)$, kẻ $AH \\perp SO \\Rightarrow AH \\perp (SBD)$ và tính $AH = \\frac{a\\sqrt{3}}{3}$.'
  },
  {
    prompt: 'Sắp xếp các bước tính khoảng cách giữa hai đường thẳng chéo nhau $SC$ và $AB$ trong hình chóp $S.ABCD$ có đáy là hình vuông cạnh $a$ và $SA \\perp (ABCD), SA = a\\sqrt{3}$:',
    tikzType: 'custom',
    tikzCode: TIKZ_PYR_SABCD_SA_PERP,
    steps: [
      { id: '1', text: 'Vì $AB \\parallel CD$ nên đường thẳng $AB$ song song với mặt phẳng $(SCD)$ chứa $SC$.' },
      { id: '2', text: 'Do đó $d(AB, SC) = d(AB, (SCD)) = d(A, (SCD))$.' },
      { id: '3', text: 'Trong mặt phẳng $(SAD)$, kẻ $AK \\perp SD$ tại $K$; vì $CD \\perp (SAD)$ nên $AK \\perp (SCD)$, suy ra $d(A, (SCD)) = AK$.' },
      { id: '4', text: 'Trong $\\triangle SAD$ vuông tại $A$: $AK = \\frac{SA \\cdot AD}{\\sqrt{SA^2 + AD^2}} = \\frac{a\\sqrt{3} \\cdot a}{2a} = \\frac{a\\sqrt{3}}{2}$.' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Quy khoảng cách giữa hai đường thẳng chéo nhau $AB$ và $SC$ về $d(AB, (SCD)) = d(A, (SCD)) = AK$.'
  },
  {
    prompt: 'Sắp xếp các bước xác định đoạn vuông góc chung của hai đường thẳng chéo nhau $AB$ và $CD$ trong tứ diện đều $ABCD$ cạnh $a$:',
    steps: [
      { id: '1', text: 'Gọi $M, N$ lần lượt là trung điểm của các cạnh $AB$ và $CD$.' },
      { id: '2', text: 'Vì $\\triangle ACD$ và $\\triangle BCD$ đều cạnh $a$ nên $AN = BN = \\frac{a\\sqrt{3}}{2}$, suy ra $\\triangle NAB$ cân tại $N \\Rightarrow MN \\perp AB$.' },
      { id: '3', text: 'Chứng minh tương tự $\\triangle MCD$ cân tại $M$ nên $MN \\perp CD$, vậy $MN$ là đoạn vuông góc chung của $AB$ và $CD$.' },
      { id: '4', text: 'Trong $\\triangle ANM$ vuông tại $M$: $d(AB, CD) = MN = \\sqrt{AN^2 - AM^2} = \\sqrt{\\frac{3a^2}{4} - \\frac{a^2}{4}} = \\frac{a\\sqrt{2}}{2}$.' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Chứng minh đoạn nối hai trung điểm $M, N$ của $AB, CD$ vuông góc với cả hai cạnh và bằng $\\frac{a\\sqrt{2}}{2}$.'
  }
];

const b26P1B: CompactMC[] = [
  {
    prompt: 'Khoảng cách giữa hai đường thẳng chéo nhau $a$ và $b$ bằng:',
    options: [
      { id: 'A', text: 'Độ dài đoạn thẳng nối hai điểm bất kì trên $a$ và $b$' },
      { id: 'B', text: 'Độ dài đoạn vuông góc chung của hai đường thẳng $a$ và $b$' },
      { id: 'C', text: 'Khoảng cách từ một điểm bất kì trên $a$ đến một điểm cố định trên $b$' },
      { id: 'D', text: 'Tổng khoảng cách từ hai đầu mút đến mặt phẳng đáy' }
    ],
    correctOptionId: 'B',
    explanation: 'Khoảng cách giữa hai đường thẳng chéo nhau bằng độ dài đoạn vuông góc chung của hai đường thẳng đó (và là độ dài ngắn nhất trong các đoạn nối một điểm trên $a$ với một điểm trên $b$).'
  },
  {
    prompt: 'Cho đường thẳng $a$ song song với mặt phẳng $(P)$. Lấy hai điểm phân biệt $M, N$ trên đường thẳng $a$. Khẳng định nào sau đây là **đúng**?',
    options: [
      { id: 'A', text: '$d(M, (P)) > d(N, (P))$' },
      { id: 'B', text: '$d(M, (P)) = d(N, (P)) = d(a, (P))$' },
      { id: 'C', text: '$d(a, (P)) = d(M, (P)) + d(N, (P))$' },
      { id: 'D', text: '$d(a, (P)) = 0$' }
    ],
    correctOptionId: 'B',
    explanation: 'Khi $a \\parallel (P)$, mọi điểm thuộc $a$ đều có cùng khoảng cách đến $(P)$ và bằng $d(a, (P))$.'
  },
  {
    prompt: 'Cho hình chóp $S.ABC$ có $SA \\perp (ABC)$, đáy $ABC$ là tam giác đều cạnh $2a$. Khoảng cách từ điểm $S$ đến đường thẳng $BC$ bằng độ dài đoạn thẳng nào khi gọi $M$ là trung điểm $BC$?',
    options: [
      { id: 'A', text: '$SA$' },
      { id: 'B', text: '$SM$' },
      { id: 'C', text: '$AM$' },
      { id: 'D', text: '$SB$' }
    ],
    correctOptionId: 'B',
    explanation: 'Vì $AM \\perp BC$ và $SA \\perp (ABC)$ nên theo Định lí ba đường vuông góc ta có $SM \\perp BC$ tại $M$. Vậy $d(S, BC) = SM$.',
    tikzType: 'custom',
    tikzCode: TIKZ_PYR_SABC_SA_PERP
  },
  {
    prompt: 'Cho hình lập phương $ABCD.A\'B\'C\'D\'$ cạnh $a$. Khoảng cách từ điểm $A$ đến đường thẳng $C\'D\'$ bằng:',
    options: [
      { id: 'A', text: '$a$' },
      { id: 'B', text: '$a\\sqrt{2}$' },
      { id: 'C', text: '$a\\sqrt{3}$' },
      { id: 'D', text: '$\\frac{a\\sqrt{2}}{2}$' }
    ],
    correctOptionId: 'B',
    explanation: 'Vì $C\'D\' \\perp (ADD\'A\')$ tại $D\'$ nên $C\'D\' \\perp AD\'$. Vậy hình chiếu vuông góc của $A$ trên $C\'D\'$ là $D\'$, suy ra $d(A, C\'D\') = AD\' = a\\sqrt{2}$.',
    tikzType: 'custom',
    tikzCode: TIKZ_CUBE_ABCD
  },
  {
    prompt: 'Cho hình chóp tứ giác đều $S.ABCD$ có cạnh đáy bằng $a$, chiều cao $SO = a$. Khoảng cách từ tâm $O$ của đáy đến mặt bên $(SBC)$ bằng:',
    options: [
      { id: 'A', text: '$\\frac{a\\sqrt{5}}{5}$' },
      { id: 'B', text: '$\\frac{a\\sqrt{2}}{2}$' },
      { id: 'C', text: '$\\frac{a\\sqrt{3}}{3}$' },
      { id: 'D', text: '$\\frac{a}{2}$' }
    ],
    correctOptionId: 'A',
    explanation: 'Gọi $M$ là trung điểm $BC$, kẻ $OH \\perp SM$ tại $H$ thì $OH \\perp (SBC)$. Ta có $OM = \\frac{a}{2}, SO = a \\Rightarrow OH = \\frac{SO \\cdot OM}{\\sqrt{SO^2 + OM^2}} = \\frac{a \\cdot (a/2)}{a\\sqrt{5}/2} = \\frac{a\\sqrt{5}}{5}$.',
    tikzType: 'custom',
    tikzCode: TIKZ_PYR_REGULAR_SABCD
  },
  {
    prompt: 'Cho hình chóp tứ giác đều $S.ABCD$ có khoảng cách từ tâm $O$ của đáy đến mặt bên $(SBC)$ bằng $d$. Khi đó khoảng cách từ đỉnh $A$ đến mặt bên $(SBC)$ bằng:',
    options: [
      { id: 'A', text: '$d$' },
      { id: 'B', text: '$2d$' },
      { id: 'C', text: '$\\frac{d}{2}$' },
      { id: 'D', text: '$3d$' }
    ],
    correctOptionId: 'B',
    explanation: 'Đường thẳng $AC$ cắt $(SBC)$ tại $C$, mà $O$ là trung điểm của $AC$ nên $\\frac{d(A, (SBC))}{d(O, (SBC))} = \\frac{AC}{OC} = 2 \\Rightarrow d(A, (SBC)) = 2d$.',
    tikzType: 'custom',
    tikzCode: TIKZ_PYR_REGULAR_SABCD
  },
  {
    prompt: 'Cho hình lăng trụ đứng $ABC.A\'B\'C\'$ có đáy $ABC$ là tam giác vuông tại $A$ với $AB = 3a, AC = 4a$. Khoảng cách từ đường thẳng $AA\'$ đến mặt phẳng $(BCC\'B\')$ bằng:',
    options: [
      { id: 'A', text: '$\\frac{12a}{5}$' },
      { id: 'B', text: '$5a$' },
      { id: 'C', text: '$3a$' },
      { id: 'D', text: '$4a$' }
    ],
    correctOptionId: 'A',
    explanation: 'Vì $AA\' \\parallel (BCC\'B\')$ nên $d(AA\', (BCC\'B\')) = d(A, (BCC\'B\'))$. Kẻ $AH \\perp BC$ tại $H$ thì $AH \\perp (BCC\'B\')$, suy ra khoảng cách bằng $AH = \\frac{3a \\cdot 4a}{5a} = \\frac{12a}{5}$.',
    tikzType: 'custom',
    tikzCode: TIKZ_RIGHT_PRISM_ABCA1B1C1
  },
  {
    prompt: 'Cho hình chóp $S.ABC$ có $SA \\perp (ABC)$, tam giác $ABC$ đều cạnh $a$. Khoảng cách giữa hai đường thẳng chéo nhau $SA$ và $BC$ bằng:',
    options: [
      { id: 'A', text: '$a$' },
      { id: 'B', text: '$\\frac{a\\sqrt{3}}{2}$' },
      { id: 'C', text: '$\\frac{a}{2}$' },
      { id: 'D', text: '$\\frac{a\\sqrt{2}}{2}$' }
    ],
    correctOptionId: 'B',
    explanation: 'Gọi $M$ là trung điểm $BC$. Trong $\\triangle ABC$ đều, $AM \\perp BC$; mặt khác $SA \\perp (ABC) \\Rightarrow SA \\perp AM$. Vậy $AM$ là đoạn vuông góc chung của $SA$ và $BC$, nên $d(SA, BC) = AM = \\frac{a\\sqrt{3}}{2}$.',
    tikzType: 'custom',
    tikzCode: TIKZ_PYR_SABC_SA_PERP
  },
  {
    prompt: 'Cho hình hộp chữ nhật $ABCD.A\'B\'C\'D\'$ có $AB = 3a, AD = 4a, AA\' = 5a$. Khoảng cách giữa hai đường thẳng chéo nhau $CC\'$ và $BD$ bằng:',
    options: [
      { id: 'A', text: '$\\frac{12a}{5}$' },
      { id: 'B', text: '$\\frac{5a}{2}$' },
      { id: 'C', text: '$3a$' },
      { id: 'D', text: '$4a$' }
    ],
    correctOptionId: 'A',
    explanation: 'Trong mặt phẳng đáy $(ABCD)$, kẻ $CH \\perp BD$ tại $H$. Vì $CC\' \\perp (ABCD)$ nên $CC\' \\perp CH$. Vậy $CH$ là đoạn vuông góc chung của $CC\'$ và $BD$, suy ra $d(CC\', BD) = CH = \\frac{CB \\cdot CD}{BD} = \\frac{3a \\cdot 4a}{5a} = \\frac{12a}{5}$.',
    tikzType: 'custom',
    tikzCode: TIKZ_CUBE_ABCD
  },
  {
    prompt: 'Cho tứ diện đều $ABCD$ có cạnh bằng $a$. Khoảng cách từ đỉnh $A$ đến mặt phẳng $(BCD)$ (chiều cao của tứ diện đều) bằng:',
    options: [
      { id: 'A', text: '$\\frac{a\\sqrt{6}}{3}$' },
      { id: 'B', text: '$\\frac{a\\sqrt{3}}{3}$' },
      { id: 'C', text: '$\\frac{a\\sqrt{2}}{2}$' },
      { id: 'D', text: '$\\frac{a\\sqrt{6}}{2}$' }
    ],
    correctOptionId: 'A',
    explanation: 'Gọi $G$ là trọng tâm $\\triangle BCD$ đều cạnh $a$, ta có $BG = \\frac{a\\sqrt{3}}{3}$. Khi đó $d(A, (BCD)) = AG = \\sqrt{AB^2 - BG^2} = \\sqrt{a^2 - \\frac{a^2}{3}} = \\frac{a\\sqrt{6}}{3}$.'
  },
  {
    prompt: 'Cho hình chóp $S.ABCD$ có đáy $ABCD$ là hình vuông cạnh $a$ và $SA \\perp (ABCD), SA = a$. Khoảng cách giữa hai đường thẳng chéo nhau $BD$ và $SC$ bằng:',
    options: [
      { id: 'A', text: '$\\frac{a\\sqrt{6}}{6}$' },
      { id: 'B', text: '$\\frac{a\\sqrt{2}}{2}$' },
      { id: 'C', text: '$\\frac{a\\sqrt{3}}{3}$' },
      { id: 'D', text: '$\\frac{a}{2}$' }
    ],
    correctOptionId: 'A',
    explanation: 'Gọi $O = AC \\cap BD$. Ta có $BD \\perp (SAC)$ tại $O$. Trong $(SAC)$, kẻ $OK \\perp SC$ tại $K$ thì $OK$ là đoạn vuông góc chung của $BD$ và $SC$. Vì $\\triangle CKO \\sim \\triangle CAS$ nên $OK = OC \\cdot \\frac{SA}{SC} = \\frac{a\\sqrt{2}}{2} \\cdot \\frac{a}{a\\sqrt{3}} = \\frac{a\\sqrt{6}}{6}$.',
    tikzType: 'custom',
    tikzCode: TIKZ_PYR_SABCD_SA_PERP
  },
  {
    prompt: 'Hai trần nhà tầng $1$ và tầng $2$ của một tòa nhà là hai mặt phẳng song song. Biết một bóng đèn treo cách trần tầng $2$ một đoạn $0,4\\text{ m}$ và cách sàn tầng $2$ (trần tầng $1$) một đoạn $3,2\\text{ m}$. Khoảng cách giữa hai mặt phẳng trần đó bằng:',
    options: [
      { id: 'A', text: '$2,8\\text{ m}$' },
      { id: 'B', text: '$3,6\\text{ m}$' },
      { id: 'C', text: '$3,2\\text{ m}$' },
      { id: 'D', text: '$3,0\\text{ m}$' }
    ],
    correctOptionId: 'B',
    explanation: 'Khoảng cách giữa hai mặt phẳng song song là $0,4 + 3,2 = 3,6\\text{ (m)}$.'
  }
];

const b26P2B: CompactTF[] = [
  {
    stem: 'Cho hình chóp tứ giác đều $S.ABCD$ có cạnh đáy bằng $2a$, tâm đáy là $O$ và chiều cao $SO = a\\sqrt{3}$. Gọi $M$ là trung điểm của cạnh $CD$. Xét tính đúng sai của các mệnh đề sau:',
    tikzType: 'custom',
    tikzCode: TIKZ_PYR_REGULAR_SABCD,
    statements: [
      {
        id: 'a',
        text: 'Khoảng cách từ đỉnh $S$ đến mặt phẳng $(ABCD)$ bằng $a\\sqrt{3}$.',
        isTrue: true,
        explanation: 'Đúng vì $SO \\perp (ABCD)$ tại $O$ nên $d(S, (ABCD)) = SO = a\\sqrt{3}$.'
      },
      {
        id: 'b',
        text: 'Khoảng cách từ điểm $S$ đến đường thẳng $CD$ bằng $2a$.',
        isTrue: true,
        explanation: 'Đúng vì $SM \\perp CD$ tại $M$, với $OM = a$ nên $SM = \\sqrt{SO^2 + OM^2} = \\sqrt{3a^2 + a^2} = 2a$.'
      },
      {
        id: 'c',
        text: 'Khoảng cách từ tâm $O$ đến mặt phẳng $(SCD)$ bằng $\\frac{a\\sqrt{3}}{2}$.',
        isTrue: true,
        explanation: 'Đúng vì kẻ $OH \\perp SM$ tại $H$ thì $OH \\perp (SCD)$ và $OH = \\frac{SO \\cdot OM}{SM} = \\frac{a\\sqrt{3} \\cdot a}{2a} = \\frac{a\\sqrt{3}}{2}$.'
      },
      {
        id: 'd',
        text: 'Khoảng cách giữa đường thẳng $AB$ và mặt phẳng $(SCD)$ bằng $\\frac{a\\sqrt{3}}{2}$.',
        isTrue: false,
        explanation: 'Sai vì $AB \\parallel (SCD)$ nên $d(AB, (SCD)) = d(A, (SCD)) = 2 d(O, (SCD)) = a\\sqrt{3}$.'
      }
    ]
  },
  {
    stem: 'Cho hình lăng trụ đứng $ABC.A\'B\'C\'$ có đáy $ABC$ là tam giác vuông tại $B$ với $AB = 3, BC = 4$ và cạnh bên $AA\' = 6$. Xét tính đúng sai của các mệnh đề sau:',
    tikzType: 'custom',
    tikzCode: TIKZ_RIGHT_PRISM_ABCA1B1C1,
    statements: [
      {
        id: 'a',
        text: 'Khoảng cách giữa hai mặt phẳng đáy $(ABC)$ và $(A\'B\'C\')$ bằng $6$.',
        isTrue: true,
        explanation: 'Đúng vì $AA\' \\perp (ABC)$ nên $d((ABC), (A\'B\'C\')) = AA\' = 6$.'
      },
      {
        id: 'b',
        text: 'Khoảng cách từ điểm $C$ đến mặt phẳng $(ABB\'A\')$ bằng $4$.',
        isTrue: true,
        explanation: 'Đúng vì $CB \\perp AB$ và $CB \\perp BB\' \\Rightarrow CB \\perp (ABB\'A\')$ tại $B$, nên $d(C, (ABB\'A\')) = CB = 4$.'
      },
      {
        id: 'c',
        text: 'Khoảng cách từ điểm $B$ đến mặt phẳng $(ACC\'A\')$ bằng $2,4$.',
        isTrue: true,
        explanation: 'Đúng vì kẻ $BH \\perp AC$ tại $H$ thì $BH \\perp (ACC\'A\')$, với $AC = 5 \\Rightarrow BH = \\frac{3 \\cdot 4}{5} = 2,4$.'
      },
      {
        id: 'd',
        text: 'Khoảng cách giữa hai đường thẳng chéo nhau $AA\'$ và $BC$ bằng $5$.',
        isTrue: false,
        explanation: 'Sai vì $AB \\perp AA\'$ và $AB \\perp BC$ nên $AB$ là đoạn vuông góc chung của $AA\'$ và $BC$, suy ra $d(AA\', BC) = AB = 3$.'
      }
    ]
  }
];

const b26P3B: CompactSA[] = [
  {
    prompt: 'Cho hình chóp $S.ABC$ có $SA \\perp (ABC)$, tam giác $ABC$ vuông tại $B$ với $AB = 6, BC = 8$ và $SA = 8$. Tính khoảng cách từ điểm $A$ đến mặt phẳng $(SBC)$.',
    correctAnswer: '4,8',
    acceptedAnswers: ['4,8', '4.8', '24/5'],
    explanation: 'Kẻ $AH \\perp SB$ tại $H$ thì $AH \\perp (SBC)$, nên $d(A, (SBC)) = AH = \\frac{SA \\cdot AB}{\\sqrt{SA^2 + AB^2}} = \\frac{8 \\cdot 6}{10} = 4,8$.',
    tikzType: 'custom',
    tikzCode: TIKZ_PYR_SABC_SA_PERP_AH
  },
  {
    prompt: 'Cho hình chóp tứ giác đều $S.ABCD$ có cạnh đáy bằng $12$ và chiều cao $SO = 8$. Tính khoảng cách từ tâm $O$ của đáy đến mặt phẳng $(SBC)$.',
    correctAnswer: '4,8',
    acceptedAnswers: ['4,8', '4.8', '24/5'],
    explanation: 'Gọi $M$ là trung điểm $BC$, ta có $OM = 6$ và $SM = \\sqrt{SO^2 + OM^2} = \\sqrt{8^2 + 6^2} = 10$. Khoảng cách từ $O$ đến $(SBC)$ là $OH = \\frac{SO \\cdot OM}{SM} = \\frac{8 \\cdot 6}{10} = 4,8$.',
    tikzType: 'custom',
    tikzCode: TIKZ_PYR_REGULAR_SABCD
  },
  {
    prompt: 'Cho hình chóp tứ giác đều $S.ABCD$ ở câu trên (cạnh đáy bằng $12$, chiều cao $SO = 8$). Tính khoảng cách giữa đường thẳng $AD$ và mặt phẳng $(SBC)$ (làm tròn đến chữ số thập phân thứ nhất).',
    correctAnswer: '9,6',
    acceptedAnswers: ['9,6', '9.6', '48/5'],
    explanation: 'Vì $AD \\parallel BC$ nên $AD \\parallel (SBC)$. Do đó $d(AD, (SBC)) = d(A, (SBC)) = 2 d(O, (SBC)) = 2 \\cdot 4,8 = 9,6$.',
    tikzType: 'custom',
    tikzCode: TIKZ_PYR_REGULAR_SABCD
  },
  {
    prompt: 'Cho tứ diện đều $ABCD$ có cạnh bằng $6\\sqrt{2}$. Tính khoảng cách giữa hai đường thẳng đối diện $AB$ và $CD$.',
    correctAnswer: '6',
    acceptedAnswers: ['6'],
    explanation: 'Trong tứ diện đều cạnh $a = 6\\sqrt{2}$, khoảng cách giữa hai cạnh đối $AB$ và $CD$ là $d = \\frac{a\\sqrt{2}}{2} = \\frac{6\\sqrt{2} \\cdot \\sqrt{2}}{2} = 6$.'
  }
];

const b26P4B: CompactSO[] = [
  {
    prompt: 'Sắp xếp các bước tính khoảng cách từ tâm $O$ đến mặt phẳng $(SCD)$ trong hình chóp tứ giác đều $S.ABCD$ có cạnh đáy $2a$ và chiều cao $SO = a\\sqrt{3}$:',
    tikzType: 'custom',
    tikzCode: TIKZ_PYR_REGULAR_SABCD,
    steps: [
      { id: '1', text: 'Gọi $M$ là trung điểm của cạnh $CD$, ta có $OM \\perp CD$ và $OM = a$.' },
      { id: '2', text: 'Vì $CD \\perp OM$ và $CD \\perp SO$ nên $CD \\perp (SOM)$. Trong $(SOM)$, kẻ $OH \\perp SM$ tại $H$.' },
      { id: '3', text: 'Từ $OH \\perp SM$ và $OH \\perp CD$, suy ra $OH \\perp (SCD)$ tại $H$, nên $d(O, (SCD)) = OH$.' },
      { id: '4', text: 'Trong $\\triangle SOM$ vuông tại $O$: $OH = \\frac{SO \\cdot OM}{\\sqrt{SO^2 + OM^2}} = \\frac{a\\sqrt{3} \\cdot a}{2a} = \\frac{a\\sqrt{3}}{2}$.' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Gọi $M$ là trung điểm $CD$, kẻ $OH \\perp SM \\Rightarrow OH \\perp (SCD)$ và tính $OH = \\frac{a\\sqrt{3}}{2}$.'
  },
  {
    prompt: 'Sắp xếp các bước tính khoảng cách từ điểm $B$ đến mặt phẳng $(SCD)$ biết $d(A, (SCD)) = h$ trong hình chóp $S.ABCD$ có đáy là hình thang vuông tại $A, D$ với $AB = 2a, CD = a$:',
    steps: [
      { id: '1', text: 'Nhận xét trong đáy hình thang $ABCD$, cạnh $AB$ song song với cạnh $CD$.' },
      { id: '2', text: 'Vì $CD \\subset (SCD)$ và $AB \\not\\subset (SCD)$ nên đường thẳng $AB$ song song với mặt phẳng $(SCD)$.' },
      { id: '3', text: 'Theo tính chất khoảng cách giữa đường thẳng và mặt phẳng song song, mọi điểm trên $AB$ có cùng khoảng cách đến $(SCD)$.' },
      { id: '4', text: 'Kết luận $d(B, (SCD)) = d(A, (SCD)) = h$.' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Vì $AB \\parallel CD \\subset (SCD)$ nên $AB \\parallel (SCD) \\Rightarrow d(B, (SCD)) = d(A, (SCD)) = h$.'
  },
  {
    prompt: 'Sắp xếp các bước tính khoảng cách từ trọng tâm $G$ của $\\triangle ABC$ đến mặt phẳng $(SBC)$ biết $d(A, (SBC)) = 3h$:',
    steps: [
      { id: '1', text: 'Gọi $M$ là trung điểm của cạnh $BC$; đường trung tuyến $AM$ cắt mặt phẳng $(SBC)$ tại điểm $M$.' },
      { id: '2', text: 'Vì hai điểm $A$ và $G$ cùng thuộc đường thẳng $AM$ cắt $(SBC)$ tại $M$ nên $\\frac{d(G, (SBC))}{d(A, (SBC))} = \\frac{GM}{AM}$.' },
      { id: '3', text: 'Theo tính chất trọng tâm của tam giác $ABC$, ta có tỉ số $\\frac{GM}{AM} = \\frac{1}{3}$.' },
      { id: '4', text: 'Suy ra $d(G, (SBC)) = \\frac{1}{3} d(A, (SBC)) = \\frac{1}{3} \\cdot 3h = h$.' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Dùng tỉ số khoảng cách trên cát tuyến $AM$ cắt $(SBC)$ tại $M$: $\\frac{d(G, (SBC))}{d(A, (SBC))} = \\frac{GM}{AM} = \\frac{1}{3}$.'
  },
  {
    prompt: 'Sắp xếp các bước tính khoảng cách từ gốc $O$ đến mặt phẳng $(ABC)$ trong tứ diện vuông $OABC$ có $OA = a, OB = 2a, OC = 2a$:',
    tikzType: 'custom',
    tikzCode: TIKZ_TETRA_OABC_ORTHO,
    steps: [
      { id: '1', text: 'Gọi $H$ là hình chiếu vuông góc của $O$ trên mặt phẳng $(ABC)$, khi đó $d(O, (ABC)) = OH$.' },
      { id: '2', text: 'Áp dụng hệ thức lượng trong tứ diện vuông $OABC$: $\\frac{1}{OH^2} = \\frac{1}{OA^2} + \\frac{1}{OB^2} + \\frac{1}{OC^2}$.' },
      { id: '3', text: 'Thay số vào công thức: $\\frac{1}{OH^2} = \\frac{1}{a^2} + \\frac{1}{4a^2} + \\frac{1}{4a^2} = \\frac{6}{4a^2} = \\frac{3}{2a^2}$.' },
      { id: '4', text: 'Lấy căn bậc hai dương, kết luận $OH = \\frac{a\\sqrt{6}}{3}$.' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Áp dụng công thức $\\frac{1}{OH^2} = \\frac{1}{OA^2} + \\frac{1}{OB^2} + \\frac{1}{OC^2} = \\frac{3}{2a^2} \\Rightarrow OH = \\frac{a\\sqrt{6}}{3}$.'
  }
];

// ============================================================================
// BÀI 27. THỂ TÍCH
// Trọng tâm: Công thức thể tích khối chóp V = (1/3)Sh, khối chóp cụt đều
// V = (1/3)h(S + S' + sqrt(SS')), khối lăng trụ V = Sh, khối hộp chữ nhật
// V = abc, khối lập phương V = a^3.
// ============================================================================

const b27P1A: CompactMC[] = [
  {
    prompt: 'Thể tích $V$ của một khối chóp có diện tích đáy $S$ và chiều cao $h$ được tính theo công thức nào sau đây?',
    options: [
      { id: 'A', text: '$V = S \\cdot h$' },
      { id: 'B', text: '$V = \\frac{1}{3} S \\cdot h$' },
      { id: 'C', text: '$V = \\frac{1}{2} S \\cdot h$' },
      { id: 'D', text: '$V = \\frac{1}{6} S \\cdot h$' }
    ],
    correctOptionId: 'B',
    explanation: 'Thể tích của khối chóp có diện tích đáy $S$ và chiều cao $h$ là $V = \\frac{1}{3} S \\cdot h$.'
  },
  {
    prompt: 'Thể tích $V$ của một khối lăng trụ có diện tích đáy $S$ và chiều cao $h$ được tính theo công thức nào sau đây?',
    options: [
      { id: 'A', text: '$V = S \\cdot h$' },
      { id: 'B', text: '$V = \\frac{1}{3} S \\cdot h$' },
      { id: 'C', text: '$V = 3 S \\cdot h$' },
      { id: 'D', text: '$V = \\frac{1}{2} S \\cdot h$' }
    ],
    correctOptionId: 'A',
    explanation: 'Thể tích của khối lăng trụ có diện tích đáy $S$ và chiều cao $h$ là $V = S \\cdot h$.'
  },
  {
    prompt: 'Thể tích của một khối hộp chữ nhật có ba kích thước $a = 3, b = 4, c = 5$ bằng:',
    options: [
      { id: 'A', text: '$20$' },
      { id: 'B', text: '$60$' },
      { id: 'C', text: '$12$' },
      { id: 'D', text: '$30$' }
    ],
    correctOptionId: 'B',
    explanation: 'Thể tích khối hộp chữ nhật là $V = a \\cdot b \\cdot c = 3 \\cdot 4 \\cdot 5 = 60$.',
    tikzType: 'custom',
    tikzCode: TIKZ_CUBE_ABCD
  },
  {
    prompt: 'Một khối lập phương có thể tích bằng $125\\text{ cm}^3$. Độ dài cạnh của khối lập phương đó bằng:',
    options: [
      { id: 'A', text: '$5\\text{ cm}$' },
      { id: 'B', text: '$25\\text{ cm}$' },
      { id: 'C', text: '$5\\sqrt{5}\\text{ cm}$' },
      { id: 'D', text: '$15\\text{ cm}$' }
    ],
    correctOptionId: 'A',
    explanation: 'Gọi $a$ là cạnh khối lập phương, ta có $V = a^3 = 125 \\Rightarrow a = 5\\text{ (cm)}$.'
  },
  {
    prompt: 'Cho khối chóp $S.ABCD$ có đáy $ABCD$ là hình vuông cạnh $a$, cạnh bên $SA \\perp (ABCD)$ và $SA = 3a$. Thể tích của khối chóp $S.ABCD$ bằng:',
    options: [
      { id: 'A', text: '$3a^3$' },
      { id: 'B', text: '$a^3$' },
      { id: 'C', text: '$\\frac{a^3}{3}$' },
      { id: 'D', text: '$\\frac{3a^3}{2}$' }
    ],
    correctOptionId: 'B',
    explanation: 'Ta có $S_{ABCD} = a^2$ và $h = SA = 3a$. Vậy $V = \\frac{1}{3} S_{ABCD} \\cdot SA = \\frac{1}{3} a^2 \\cdot 3a = a^3$.',
    tikzType: 'custom',
    tikzCode: TIKZ_PYR_SABCD_SA_PERP
  },
  {
    prompt: 'Cho khối chóp $S.ABC$ có $SA \\perp (ABC)$, đáy $ABC$ là tam giác đều cạnh $2a$ và $SA = a\\sqrt{3}$. Thể tích của khối chóp $S.ABC$ bằng:',
    options: [
      { id: 'A', text: '$a^3$' },
      { id: 'B', text: '$3a^3$' },
      { id: 'C', text: '$\\frac{a^3\\sqrt{3}}{3}$' },
      { id: 'D', text: '$\\frac{a^3}{3}$' }
    ],
    correctOptionId: 'A',
    explanation: 'Diện tích tam giác đều $ABC$ cạnh $2a$ là $S_{ABC} = \\frac{(2a)^2 \\sqrt{3}}{4} = a^2\\sqrt{3}$. Khi đó $V = \\frac{1}{3} S_{ABC} \\cdot SA = \\frac{1}{3} \\cdot a^2\\sqrt{3} \\cdot a\\sqrt{3} = a^3$.',
    tikzType: 'custom',
    tikzCode: TIKZ_PYR_SABC_SA_PERP
  },
  {
    prompt: 'Cho khối lăng trụ đứng $ABC.A\'B\'C\'$ có đáy $ABC$ là tam giác vuông tại $B$ với $AB = 3a, BC = 4a$ và cạnh bên $AA\' = 5a$. Thể tích của khối lăng trụ đó bằng:',
    options: [
      { id: 'A', text: '$10a^3$' },
      { id: 'B', text: '$30a^3$' },
      { id: 'C', text: '$60a^3$' },
      { id: 'D', text: '$20a^3$' }
    ],
    correctOptionId: 'B',
    explanation: 'Ta có $S_{ABC} = \\frac{1}{2} AB \\cdot BC = 6a^2$ và chiều cao $h = AA\' = 5a$. Vậy $V = S_{ABC} \\cdot AA\' = 6a^2 \\cdot 5a = 30a^3$.',
    tikzType: 'custom',
    tikzCode: TIKZ_RIGHT_PRISM_ABCA1B1C1
  },
  {
    prompt: 'Cho khối chóp tứ giác đều $S.ABCD$ có cạnh đáy bằng $2a$ và cạnh bên bằng $a\\sqrt{6}$. Thể tích của khối chóp $S.ABCD$ bằng:',
    options: [
      { id: 'A', text: '$\\frac{8a^3}{3}$' },
      { id: 'B', text: '$\\frac{4a^3}{3}$' },
      { id: 'C', text: '$8a^3$' },
      { id: 'D', text: '$\\frac{4a^3\\sqrt{2}}{3}$' }
    ],
    correctOptionId: 'A',
    explanation: 'Tâm đáy là $O$, ta có $OA = \\frac{2a\\sqrt{2}}{2} = a\\sqrt{2}$. Chiều cao $SO = \\sqrt{SA^2 - OA^2} = \\sqrt{6a^2 - 2a^2} = 2a$. Vậy $V = \\frac{1}{3} (2a)^2 \\cdot 2a = \\frac{8a^3}{3}$.',
    tikzType: 'custom',
    tikzCode: TIKZ_PYR_REGULAR_SABCD
  },
  {
    prompt: 'Cho tứ diện $OABC$ có ba cạnh $OA, OB, OC$ đôi một vuông góc với nhau và $OA = a, OB = 2a, OC = 3a$. Thể tích của khối tứ diện $OABC$ bằng:',
    options: [
      { id: 'A', text: '$6a^3$' },
      { id: 'B', text: '$2a^3$' },
      { id: 'C', text: '$a^3$' },
      { id: 'D', text: '$3a^3$' }
    ],
    correctOptionId: 'C',
    explanation: 'Thể tích tứ diện vuông $OABC$ là $V = \\frac{1}{6} OA \\cdot OB \\cdot OC = \\frac{1}{6} \\cdot a \\cdot 2a \\cdot 3a = a^3$.',
    tikzType: 'custom',
    tikzCode: TIKZ_TETRA_OABC_ORTHO
  },
  {
    prompt: 'Thể tích $V$ của khối chóp cụt đều có diện tích hai đáy là $S, S\'$ và chiều cao $h$ được tính bởi công thức:',
    options: [
      { id: 'A', text: '$V = \\frac{1}{2} h (S + S\')$' },
      { id: 'B', text: '$V = \\frac{1}{3} h \\left(S + S\' + \\sqrt{S \\cdot S\'}\\right)$' },
      { id: 'C', text: '$V = \\frac{1}{3} h (S + S\')$' },
      { id: 'D', text: '$V = h \\left(S + S\' + \\sqrt{S \\cdot S\'}\\right)$' }
    ],
    correctOptionId: 'B',
    explanation: 'Công thức thể tích khối chóp cụt đều có diện tích hai đáy $S, S\'$ và chiều cao $h$ là $V = \\frac{1}{3} h \\left(S + S\' + \\sqrt{S \\cdot S\'}\\right)$.'
  },
  {
    prompt: 'Một khối chóp cụt tứ giác đều có diện tích hai đáy lần lượt là $S = 16\\text{ cm}^2, S\' = 4\\text{ cm}^2$ và chiều cao $h = 6\\text{ cm}$. Thể tích của khối chóp cụt đều đó bằng:',
    options: [
      { id: 'A', text: '$40\\text{ cm}^3$' },
      { id: 'B', text: '$56\\text{ cm}^3$' },
      { id: 'C', text: '$84\\text{ cm}^3$' },
      { id: 'D', text: '$60\\text{ cm}^3$' }
    ],
    correctOptionId: 'B',
    explanation: 'Ta có $V = \\frac{1}{3} \\cdot 6 \\cdot \\left(16 + 4 + \\sqrt{16 \\cdot 4}\\right) = 2 \\cdot (20 + 8) = 56\\text{ (cm}^3)$. '
  },
  {
    prompt: 'Kim tự tháp Kê-ốp ở Ai Cập có dạng một khối chóp tứ giác đều với cạnh đáy dài $230\\text{ m}$ và chiều cao khoảng $147\\text{ m}$. Thể tích của kim tự tháp Kê-ốp bằng:',
    options: [
      { id: 'A', text: '$2\\,592\\,100\\text{ m}^3$' },
      { id: 'B', text: '$7\\,776\\,300\\text{ m}^3$' },
      { id: 'C', text: '$1\\,296\\,050\\text{ m}^3$' },
      { id: 'D', text: '$3\\,888\\,150\\text{ m}^3$' }
    ],
    correctOptionId: 'A',
    explanation: 'Thể tích kim tự tháp là $V = \\frac{1}{3} \\cdot 230^2 \\cdot 147 = 52\\,900 \\cdot 49 = 2\\,592\\,100\\text{ (m}^3)$.'
  }
];

const b27P2A: CompactTF[] = [
  {
    stem: 'Cho khối chóp $S.ABCD$ có đáy $ABCD$ là hình chữ nhật với $AB = a, AD = a\\sqrt{3}$, cạnh bên $SA \\perp (ABCD)$ và góc giữa đường thẳng $SC$ với mặt phẳng $(ABCD)$ bằng $60^\\circ$. Xét tính đúng sai của các mệnh đề sau:',
    tikzType: 'custom',
    tikzCode: TIKZ_PYR_SABCD_SA_PERP,
    statements: [
      {
        id: 'a',
        text: 'Diện tích mặt đáy $ABCD$ bằng $a^2\\sqrt{3}$ và đường chéo $AC = 2a$.',
        isTrue: true,
        explanation: 'Đúng vì $S_{ABCD} = AB \\cdot AD = a^2\\sqrt{3}$ và $AC = \\sqrt{a^2 + 3a^2} = 2a$.'
      },
      {
        id: 'b',
        text: 'Chiều cao $SA$ của khối chóp bằng $2a\\sqrt{3}$.',
        isTrue: true,
        explanation: 'Đúng vì $(SC, (ABCD)) = \\widehat{SCA} = 60^\\circ \\Rightarrow SA = AC \\cdot \\tan 60^\\circ = 2a\\sqrt{3}$.'
      },
      {
        id: 'c',
        text: 'Thể tích của khối chóp $S.ABCD$ bằng $6a^3$.',
        isTrue: false,
        explanation: 'Sai vì $V_{S.ABCD} = \\frac{1}{3} S_{ABCD} \\cdot SA = \\frac{1}{3} \\cdot a^2\\sqrt{3} \\cdot 2a\\sqrt{3} = 2a^3$.'
      },
      {
        id: 'd',
        text: 'Thể tích của khối tứ diện $S.ABC$ bằng $a^3$.',
        isTrue: true,
        explanation: 'Đúng vì $S_{\\triangle ABC} = \\frac{1}{2} S_{ABCD}$, nên $V_{S.ABC} = \\frac{1}{2} V_{S.ABCD} = a^3$.'
      }
    ]
  },
  {
    stem: 'Cho khối lăng trụ tam giác đều $ABC.A\'B\'C\'$ có cạnh đáy bằng $2a$ và góc giữa đường thẳng $A\'B$ với mặt đáy $(ABC)$ bằng $60^\\circ$. Xét tính đúng sai của các mệnh đề sau:',
    tikzType: 'custom',
    tikzCode: TIKZ_RIGHT_PRISM_ABCA1B1C1,
    statements: [
      {
        id: 'a',
        text: 'Diện tích đáy $ABC$ bằng $a^2\\sqrt{3}$.',
        isTrue: true,
        explanation: 'Đúng vì $S_{ABC} = \\frac{(2a)^2\\sqrt{3}}{4} = a^2\\sqrt{3}$.'
      },
      {
        id: 'b',
        text: 'Chiều cao $AA\'$ của khối lăng trụ bằng $2a\\sqrt{3}$.',
        isTrue: true,
        explanation: 'Đúng vì $(A\'B, (ABC)) = \\widehat{A\'BA} = 60^\\circ \\Rightarrow AA\' = AB \\cdot \\tan 60^\\circ = 2a\\sqrt{3}$.'
      },
      {
        id: 'c',
        text: 'Thể tích của khối lăng trụ $ABC.A\'B\'C\'$ bằng $6a^3$.',
        isTrue: true,
        explanation: 'Đúng vì $V = S_{ABC} \\cdot AA\' = a^2\\sqrt{3} \\cdot 2a\\sqrt{3} = 6a^3$.'
      },
      {
        id: 'd',
        text: 'Thể tích của khối chóp $A\'.ABC$ bằng $3a^3$.',
        isTrue: false,
        explanation: 'Sai vì $V_{A\'.ABC} = \\frac{1}{3} S_{ABC} \\cdot AA\' = \\frac{1}{3} V_{ABC.A\'B\'C\'} = 2a^3$.'
      }
    ]
  }
];

const b27P3A: CompactSA[] = [
  {
    prompt: 'Cho khối chóp $S.ABCD$ có đáy $ABCD$ là hình vuông cạnh $5$ và $SA \\perp (ABCD), SA = 9$. Tính thể tích của khối chóp $S.ABCD$.',
    correctAnswer: '75',
    acceptedAnswers: ['75'],
    explanation: 'Thể tích khối chóp là $V = \\frac{1}{3} S_{ABCD} \\cdot SA = \\frac{1}{3} \\cdot 5^2 \\cdot 9 = 75$.',
    tikzType: 'custom',
    tikzCode: TIKZ_PYR_SABCD_SA_PERP
  },
  {
    prompt: 'Cho khối chóp tứ giác đều $S.ABCD$ có cạnh đáy bằng $6$ và cạnh bên bằng $3\\sqrt{6}$. Tính thể tích của khối chóp $S.ABCD$.',
    correctAnswer: '72',
    acceptedAnswers: ['72'],
    explanation: 'Tâm đáy là $O$, ta có $OA = \\frac{6\\sqrt{2}}{2} = 3\\sqrt{2}$. Chiều cao $SO = \\sqrt{SA^2 - OA^2} = \\sqrt{54 - 18} = 6$. Vậy $V = \\frac{1}{3} \\cdot 6^2 \\cdot 6 = 72$.',
    tikzType: 'custom',
    tikzCode: TIKZ_PYR_REGULAR_SABCD
  },
  {
    prompt: 'Cho khối lăng trụ đứng $ABC.A\'B\'C\'$ có đáy $ABC$ là tam giác vuông tại $A$ với $AB = 6, AC = 8$ và cạnh bên $AA\' = 5$. Tính thể tích của khối lăng trụ đó.',
    correctAnswer: '120',
    acceptedAnswers: ['120'],
    explanation: 'Diện tích đáy là $S_{ABC} = \\frac{1}{2} \\cdot 6 \\cdot 8 = 24$. Thể tích khối lăng trụ là $V = S_{ABC} \\cdot AA\' = 24 \\cdot 5 = 120$.',
    tikzType: 'custom',
    tikzCode: TIKZ_RIGHT_PRISM_ABCA1B1C1
  },
  {
    prompt: 'Một cái phễu đựng cát có phần khoang chứa dạng hình chóp cụt tứ giác đều với cạnh đáy lớn bằng $9\\text{ dm}$, cạnh đáy nhỏ bằng $3\\text{ dm}$ và chiều cao bằng $4\\text{ dm}$. Tính thể tích của khoang chứa đó (đơn vị: $\\text{dm}^3$).',
    correctAnswer: '156',
    acceptedAnswers: ['156'],
    explanation: 'Diện tích hai đáy là $S = 9^2 = 81\\text{ dm}^2$ và $S\' = 3^2 = 9\\text{ dm}^2$. Thể tích khối chóp cụt đều là $V = \\frac{1}{3} \\cdot 4 \\cdot (81 + 9 + \\sqrt{81 \\cdot 9}) = \\frac{4}{3} \\cdot 117 = 156\\text{ (dm}^3)$.'
  }
];

const b27P4A: CompactSO[] = [
  {
    prompt: 'Sắp xếp các bước tính thể tích khối chóp $S.ABC$ có $SA \\perp (ABC)$, đáy $ABC$ vuông tại $B$ ($AB = 3a, BC = 4a$) và $(SC, (ABC)) = 45^\\circ$:',
    tikzType: 'custom',
    tikzCode: TIKZ_PYR_SABC_SA_PERP,
    steps: [
      { id: '1', text: 'Tính diện tích đáy $S_{\\triangle ABC} = \\frac{1}{2} AB \\cdot BC = 6a^2$ và cạnh huyền $AC = \\sqrt{AB^2 + BC^2} = 5a$.' },
      { id: '2', text: 'Vì $SA \\perp (ABC)$ tại $A$ nên góc giữa $SC$ và $(ABC)$ là $\\widehat{SCA} = 45^\\circ$.' },
      { id: '3', text: 'Trong $\\triangle SAC$ vuông cân tại $A$, suy ra chiều cao $SA = AC = 5a$.' },
      { id: '4', text: 'Áp dụng công thức thể tích khối chóp: $V = \\frac{1}{3} S_{\\triangle ABC} \\cdot SA = \\frac{1}{3} \\cdot 6a^2 \\cdot 5a = 10a^3$.' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Tính $S_{ABC} = 6a^2, AC = 5a$, từ $\\widehat{SCA} = 45^\\circ \\Rightarrow SA = 5a$, suy ra $V = 10a^3$.'
  },
  {
    prompt: 'Sắp xếp các bước tính thể tích của khối tứ diện đều $ABCD$ cạnh $a$:',
    steps: [
      { id: '1', text: 'Tính diện tích mặt đáy đều $BCD$: $S_{\\triangle BCD} = \\frac{a^2\\sqrt{3}}{4}$.' },
      { id: '2', text: 'Gọi $G$ là trọng tâm $\\triangle BCD$, khi đó $AG \\perp (BCD)$ và bán kính ngoại tiếp đáy là $BG = \\frac{a\\sqrt{3}}{3}$.' },
      { id: '3', text: 'Trong $\\triangle ABG$ vuông tại $G$, tính chiều cao $AG = \\sqrt{AB^2 - BG^2} = \\sqrt{a^2 - \\frac{a^2}{3}} = \\frac{a\\sqrt{6}}{3}$.' },
      { id: '4', text: 'Tính thể tích: $V = \\frac{1}{3} S_{\\triangle BCD} \\cdot AG = \\frac{1}{3} \\cdot \\frac{a^2\\sqrt{3}}{4} \\cdot \\frac{a\\sqrt{6}}{3} = \\frac{a^3\\sqrt{2}}{12}$.' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Tính $S_{\\triangle BCD} = \\frac{a^2\\sqrt{3}}{4}$ và chiều cao $AG = \\frac{a\\sqrt{6}}{3}$, suy ra $V = \\frac{a^3\\sqrt{2}}{12}$.'
  },
  {
    prompt: 'Sắp xếp các bước tính thể tích khối chóp $S.ABCD$ có đáy là hình vuông cạnh $a$, mặt bên $SAB$ là tam giác đều và $(SAB) \\perp (ABCD)$:',
    steps: [
      { id: '1', text: 'Tính diện tích hình vuông đáy: $S_{ABCD} = a^2$.' },
      { id: '2', text: 'Gọi $H$ là trung điểm của cạnh $AB$; vì $\\triangle SAB$ đều cạnh $a$ nên $SH \\perp AB$ và $SH = \\frac{a\\sqrt{3}}{2}$.' },
      { id: '3', text: 'Vì $(SAB) \\perp (ABCD)$ theo giao tuyến $AB$ và $SH \\perp AB$ nên $SH \\perp (ABCD)$ là đường cao của khối chóp.' },
      { id: '4', text: 'Áp dụng công thức thể tích: $V = \\frac{1}{3} S_{ABCD} \\cdot SH = \\frac{1}{3} a^2 \\cdot \\frac{a\\sqrt{3}}{2} = \\frac{a^3\\sqrt{3}}{6}$.' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Xác định đường cao $SH = \\frac{a\\sqrt{3}}{2} \\perp (ABCD)$ và tính $V = \\frac{1}{3} a^2 \\cdot \\frac{a\\sqrt{3}}{2} = \\frac{a^3\\sqrt{3}}{6}$.'
  },
  {
    prompt: 'Sắp xếp các bước tính thể tích khối lăng trụ xiên $ABC.A\'B\'C\'$ có đáy $ABC$ đều cạnh $a$, hình chiếu vuông góc của $A\'$ trên $(ABC)$ là tâm $G$ của $\\triangle ABC$ và $AA\' = a$:',
    steps: [
      { id: '1', text: 'Tính diện tích đáy tam giác đều $ABC$: $S_{ABC} = \\frac{a^2\\sqrt{3}}{4}$.' },
      { id: '2', text: 'Vì $G$ là trọng tâm $\\triangle ABC$ đều cạnh $a$ nên $AG = \\frac{a\\sqrt{3}}{3}$.' },
      { id: '3', text: 'Trong $\\triangle A\'GA$ vuông tại $G$, tính chiều cao khối lăng trụ: $h = A\'G = \\sqrt{AA\'^2 - AG^2} = \\sqrt{a^2 - \\frac{a^2}{3}} = \\frac{a\\sqrt{6}}{3}$.' },
      { id: '4', text: 'Tính thể tích khối lăng trụ: $V = S_{ABC} \\cdot A\'G = \\frac{a^2\\sqrt{3}}{4} \\cdot \\frac{a\\sqrt{6}}{3} = \\frac{a^3\\sqrt{2}}{4}$.' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Tính $S_{ABC} = \\frac{a^2\\sqrt{3}}{4}$ và chiều cao $A\'G = \\frac{a\\sqrt{6}}{3}$, suy ra $V = \\frac{a^3\\sqrt{2}}{4}$.'
  }
];

const b27P1B: CompactMC[] = [
  {
    prompt: 'Nếu giữ nguyên diện tích đáy của một khối chóp và tăng chiều cao của khối chóp đó lên gấp $3$ lần thì thể tích của khối chóp sẽ:',
    options: [
      { id: 'A', text: 'Giữ nguyên không đổi' },
      { id: 'B', text: 'Tăng lên gấp $3$ lần' },
      { id: 'C', text: 'Tăng lên gấp $9$ lần' },
      { id: 'D', text: 'Tăng lên gấp $27$ lần' }
    ],
    correctOptionId: 'B',
    explanation: 'Vì $V = \\frac{1}{3}Sh$ tỉ lệ thuận với chiều cao $h$ khi giữ nguyên diện tích đáy $S$, nên khi $h$ tăng gấp $3$ lần thì $V$ tăng gấp $3$ lần.'
  },
  {
    prompt: 'Một khối lập phương có đường chéo bằng $2\\sqrt{3}a$. Thể tích của khối lập phương đó bằng:',
    options: [
      { id: 'A', text: '$8a^3$' },
      { id: 'B', text: '$4a^3$' },
      { id: 'C', text: '$24\\sqrt{3}a^3$' },
      { id: 'D', text: '$6a^3$' }
    ],
    correctOptionId: 'A',
    explanation: 'Gọi $x$ là cạnh của khối lập phương. Đường chéo của khối lập phương là $x\\sqrt{3} = 2\\sqrt{3}a \\Rightarrow x = 2a$. Vậy thể tích $V = x^3 = 8a^3$.',
    tikzType: 'custom',
    tikzCode: TIKZ_CUBE_ABCD
  },
  {
    prompt: 'Cho khối chóp $S.ABC$ có $SA \\perp (ABC)$, tam giác $ABC$ vuông cân tại $B$ với $AB = BC = 2a$ và $SA = 3a$. Thể tích của khối chóp $S.ABC$ bằng:',
    options: [
      { id: 'A', text: '$2a^3$' },
      { id: 'B', text: '$6a^3$' },
      { id: 'C', text: '$4a^3$' },
      { id: 'D', text: '$3a^3$' }
    ],
    correctOptionId: 'A',
    explanation: 'Ta có $S_{ABC} = \\frac{1}{2} \\cdot 2a \\cdot 2a = 2a^2$ và $h = SA = 3a$. Vậy $V = \\frac{1}{3} \\cdot 2a^2 \\cdot 3a = 2a^3$.',
    tikzType: 'custom',
    tikzCode: TIKZ_PYR_SABC_SA_PERP
  },
  {
    prompt: 'Cho khối chóp tam giác đều $S.ABC$ có tất cả các cạnh đều bằng $a$. Thể tích của khối chóp $S.ABC$ bằng:',
    options: [
      { id: 'A', text: '$\\frac{a^3\\sqrt{2}}{12}$' },
      { id: 'B', text: '$\\frac{a^3\\sqrt{3}}{12}$' },
      { id: 'C', text: '$\\frac{a^3\\sqrt{2}}{4}$' },
      { id: 'D', text: '$\\frac{a^3\\sqrt{6}}{12}$' }
    ],
    correctOptionId: 'A',
    explanation: 'Khối chóp tam giác đều có tất cả các cạnh bằng $a$ là tứ diện đều cạnh $a$, có $S_{ABC} = \\frac{a^2\\sqrt{3}}{4}, h = \\frac{a\\sqrt{6}}{3}$, nên $V = \\frac{a^3\\sqrt{2}}{12}$.'
  },
  {
    prompt: 'Cho khối chóp tứ giác đều $S.ABCD$ có tất cả các cạnh đều bằng $a$. Thể tích của khối chóp $S.ABCD$ bằng:',
    options: [
      { id: 'A', text: '$\\frac{a^3\\sqrt{2}}{6}$' },
      { id: 'B', text: '$\\frac{a^3\\sqrt{2}}{3}$' },
      { id: 'C', text: '$\\frac{a^3\\sqrt{3}}{6}$' },
      { id: 'D', text: '$\\frac{a^3}{3}$' }
    ],
    correctOptionId: 'A',
    explanation: 'Đáy là hình vuông cạnh $a$ nên $S_{ABCD} = a^2$ và $OA = \\frac{a\\sqrt{2}}{2}$. Chiều cao $SO = \\sqrt{a^2 - \\frac{a^2}{2}} = \\frac{a\\sqrt{2}}{2}$. Vậy $V = \\frac{1}{3} a^2 \\cdot \\frac{a\\sqrt{2}}{2} = \\frac{a^3\\sqrt{2}}{6}$.',
    tikzType: 'custom',
    tikzCode: TIKZ_PYR_REGULAR_SABCD
  },
  {
    prompt: 'Cho khối lăng trụ đứng $ABCD.A\'B\'C\'D\'$ có đáy $ABCD$ là hình thoi cạnh $a$, góc $\\widehat{BAD} = 60^\\circ$ và cạnh bên $AA\' = 2a$. Thể tích của khối lăng trụ đó bằng:',
    options: [
      { id: 'A', text: '$a^3\\sqrt{3}$' },
      { id: 'B', text: '$\\frac{a^3\\sqrt{3}}{2}$' },
      { id: 'C', text: '$2a^3\\sqrt{3}$' },
      { id: 'D', text: '$\\frac{a^3\\sqrt{3}}{3}$' }
    ],
    correctOptionId: 'A',
    explanation: 'Diện tích hình thoi $ABCD$ là $S_{ABCD} = 2 S_{\\triangle ABD} = 2 \\cdot \\frac{a^2\\sqrt{3}}{4} = \\frac{a^2\\sqrt{3}}{2}$. Vậy $V = S_{ABCD} \\cdot AA\' = \\frac{a^2\\sqrt{3}}{2} \\cdot 2a = a^3\\sqrt{3}$.',
    tikzType: 'custom',
    tikzCode: TIKZ_CUBE_ABCD
  },
  {
    prompt: 'Cho khối hộp chữ nhật $ABCD.A\'B\'C\'D\'$ có thể tích bằng $V$. Thể tích của khối tứ diện $A\'.ABC$ bằng:',
    options: [
      { id: 'A', text: '$\\frac{V}{3}$' },
      { id: 'B', text: '$\\frac{V}{6}$' },
      { id: 'C', text: '$\\frac{V}{4}$' },
      { id: 'D', text: '$\\frac{V}{2}$' }
    ],
    correctOptionId: 'B',
    explanation: 'Ta có $S_{\\triangle ABC} = \\frac{1}{2} S_{ABCD}$ và chiều cao từ $A\'$ xuống $(ABC)$ bằng chiều cao khối hộp, nên $V_{A\'.ABC} = \\frac{1}{3} S_{\\triangle ABC} \\cdot AA\' = \\frac{1}{6} S_{ABCD} \\cdot AA\' = \\frac{V}{6}$.',
    tikzType: 'custom',
    tikzCode: TIKZ_CUBE_ABCD
  },
  {
    prompt: 'Cho khối chóp $S.ABCD$ có đáy $ABCD$ là hình thang vuông tại $A$ và $B$ với $AB = BC = a, AD = 2a$, cạnh bên $SA \\perp (ABCD)$ và $SA = 2a$. Thể tích của khối chóp $S.ABCD$ bằng:',
    options: [
      { id: 'A', text: '$a^3$' },
      { id: 'B', text: '$3a^3$' },
      { id: 'C', text: '$\\frac{3a^3}{2}$' },
      { id: 'D', text: '$2a^3$' }
    ],
    correctOptionId: 'A',
    explanation: 'Diện tích hình thang vuông $ABCD$ là $S_{ABCD} = \\frac{(AD + BC) \\cdot AB}{2} = \\frac{3a^2}{2}$. Khi đó $V = \\frac{1}{3} S_{ABCD} \\cdot SA = \\frac{1}{3} \\cdot \\frac{3a^2}{2} \\cdot 2a = a^3$.'
  },
  {
    prompt: 'Cho khối lăng trụ đứng $ABC.A\'B\'C\'$ có đáy $ABC$ là tam giác đều cạnh $a$ và diện tích mặt bên $ABB\'A\'$ bằng $2a^2$. Thể tích của khối lăng trụ đó bằng:',
    options: [
      { id: 'A', text: '$\\frac{a^3\\sqrt{3}}{2}$' },
      { id: 'B', text: '$\\frac{a^3\\sqrt{3}}{6}$' },
      { id: 'C', text: '$a^3\\sqrt{3}$' },
      { id: 'D', text: '$\\frac{a^3\\sqrt{3}}{4}$' }
    ],
    correctOptionId: 'A',
    explanation: 'Mặt bên $ABB\'A\'$ là hình chữ nhật có $AB = a$ và $S_{ABB\'A\'} = AB \\cdot AA\' = 2a^2 \\Rightarrow AA\' = 2a$. Vậy $V = S_{ABC} \\cdot AA\' = \\frac{a^2\\sqrt{3}}{4} \\cdot 2a = \\frac{a^3\\sqrt{3}}{2}$.',
    tikzType: 'custom',
    tikzCode: TIKZ_RIGHT_PRISM_ABCA1B1C1
  },
  {
    prompt: 'Cho khối chóp $S.ABC$ có thể tích bằng $36$. Gọi $M$ là trung điểm của cạnh $SA$. Thể tích của khối chóp $M.ABC$ bằng:',
    options: [
      { id: 'A', text: '$18$' },
      { id: 'B', text: '$12$' },
      { id: 'C', text: '$9$' },
      { id: 'D', text: '$24$' }
    ],
    correctOptionId: 'A',
    explanation: 'Vì $M$ là trung điểm $SA$ nên $d(M, (ABC)) = \\frac{1}{2} d(S, (ABC))$. Do hai khối chóp $M.ABC$ và $S.ABC$ có chung đáy $ABC$ nên $V_{M.ABC} = \\frac{1}{2} V_{S.ABC} = 18$.'
  },
  {
    prompt: 'Một khối chóp cụt tam giác đều có diện tích đáy lớn bằng $9\\sqrt{3}$, diện tích đáy nhỏ bằng $\\sqrt{3}$ và chiều cao bằng $3\\sqrt{3}$. Thể tích của khối chóp cụt đều đó bằng:',
    options: [
      { id: 'A', text: '$39$' },
      { id: 'B', text: '$27$' },
      { id: 'C', text: '$13\\sqrt{3}$' },
      { id: 'D', text: '$30$' }
    ],
    correctOptionId: 'A',
    explanation: 'Ta có $V = \\frac{1}{3} \\cdot 3\\sqrt{3} \\cdot \\left(9\\sqrt{3} + \\sqrt{3} + \\sqrt{9\\sqrt{3} \\cdot \\sqrt{3}}\\right) = \\sqrt{3} \\cdot 13\\sqrt{3} = 39$.'
  },
  {
    prompt: 'Một bể cá cảnh có dạng hình hộp chữ nhật với chiều dài $80\\text{ cm}$, chiều rộng $40\\text{ cm}$ và mực nước trong bể cao $50\\text{ cm}$. Thể tích nước trong bể (tính theo đơn vị lít, biết $1\\text{ lít} = 1000\\text{ cm}^3$) là:',
    options: [
      { id: 'A', text: '$160\\text{ lít}$' },
      { id: 'B', text: '$16\\text{ lít}$' },
      { id: 'C', text: '$80\\text{ lít}$' },
      { id: 'D', text: '$320\\text{ lít}$' }
    ],
    correctOptionId: 'A',
    explanation: 'Thể tích nước là $V = 80 \\cdot 40 \\cdot 50 = 160\\,000\\text{ cm}^3 = 160\\text{ (lít)}$.'
  }
];

const b27P2B: CompactTF[] = [
  {
    stem: 'Cho khối chóp tứ giác đều $S.ABCD$ có cạnh đáy bằng $2a$, tâm đáy là $O$ và góc giữa mặt bên $(SBC)$ với mặt đáy $(ABCD)$ bằng $60^\\circ$. Xét tính đúng sai của các mệnh đề sau:',
    tikzType: 'custom',
    tikzCode: TIKZ_PYR_REGULAR_SABCD,
    statements: [
      {
        id: 'a',
        text: 'Diện tích đáy $ABCD$ bằng $4a^2$.',
        isTrue: true,
        explanation: 'Đúng vì đáy là hình vuông cạnh $2a$ nên $S_{ABCD} = (2a)^2 = 4a^2$.'
      },
      {
        id: 'b',
        text: 'Chiều cao $SO$ của khối chóp bằng $a\\sqrt{3}$.',
        isTrue: true,
        explanation: 'Đúng vì gọi $M$ là trung điểm $BC$, ta có $OM = a$ và $\\widehat{SMO} = 60^\\circ \\Rightarrow SO = OM \\cdot \\tan 60^\\circ = a\\sqrt{3}$.'
      },
      {
        id: 'c',
        text: 'Thể tích của khối chóp $S.ABCD$ bằng $\\frac{4a^3\\sqrt{3}}{3}$.',
        isTrue: true,
        explanation: 'Đúng vì $V = \\frac{1}{3} S_{ABCD} \\cdot SO = \\frac{1}{3} \\cdot 4a^2 \\cdot a\\sqrt{3} = \\frac{4a^3\\sqrt{3}}{3}$.'
      },
      {
        id: 'd',
        text: 'Khoảng cách từ điểm $A$ đến mặt phẳng $(SBC)$ bằng $\\frac{a\\sqrt{3}}{2}$.',
        isTrue: false,
        explanation: 'Sai vì $d(O, (SBC)) = OM \\sin 60^\\circ = \\frac{a\\sqrt{3}}{2}$, nên $d(A, (SBC)) = 2 d(O, (SBC)) = a\\sqrt{3}$.'
      }
    ]
  },
  {
    stem: 'Cho hình lập phương $ABCD.A\'B\'C\'D\'$ có cạnh bằng $3$. Xét tính đúng sai của các mệnh đề sau:',
    tikzType: 'custom',
    tikzCode: TIKZ_CUBE_ABCD,
    statements: [
      {
        id: 'a',
        text: 'Thể tích của khối lập phương $ABCD.A\'B\'C\'D\'$ bằng $27$.',
        isTrue: true,
        explanation: 'Đúng vì $V = 3^3 = 27$.'
      },
      {
        id: 'b',
        text: 'Thể tích của khối lăng trụ tam giác $ABC.A\'B\'C\'$ bằng $13,5$.',
        isTrue: true,
        explanation: 'Đúng vì $S_{\\triangle ABC} = \\frac{1}{2} S_{ABCD}$ nên $V_{ABC.A\'B\'C\'} = \\frac{27}{2} = 13,5$.'
      },
      {
        id: 'c',
        text: 'Thể tích của khối chóp tứ giác $A\'.ABCD$ bằng $9$.',
        isTrue: true,
        explanation: 'Đúng vì $V_{A\'.ABCD} = \\frac{1}{3} S_{ABCD} \\cdot AA\' = \\frac{27}{3} = 9$.'
      },
      {
        id: 'd',
        text: 'Thể tích của khối tứ diện $A\'.ABD$ bằng $9$.',
        isTrue: false,
        explanation: 'Sai vì $V_{A\'.ABD} = \\frac{1}{3} S_{\\triangle ABD} \\cdot AA\' = \\frac{1}{6} V_{ABCD.A\'B\'C\'D\'} = 4,5$.'
      }
    ]
  }
];

const b27P3B: CompactSA[] = [
  {
    prompt: 'Cho tứ diện $OABC$ có ba cạnh $OA, OB, OC$ đôi một vuông góc với nhau và $OA = 4, OB = 5, OC = 6$. Tính thể tích của khối tứ diện $OABC$.',
    correctAnswer: '20',
    acceptedAnswers: ['20'],
    explanation: 'Thể tích tứ diện vuông $OABC$ là $V = \\frac{1}{6} OA \\cdot OB \\cdot OC = \\frac{1}{6} \\cdot 4 \\cdot 5 \\cdot 6 = 20$.',
    tikzType: 'custom',
    tikzCode: TIKZ_TETRA_OABC_ORTHO
  },
  {
    prompt: 'Cho khối chóp $S.ABC$ có $SA \\perp (ABC)$, đáy $ABC$ là tam giác vuông tại $B$ với $AB = 5, AC = 13$ và $SA = 6$. Tính thể tích của khối chóp $S.ABC$.',
    correctAnswer: '60',
    acceptedAnswers: ['60'],
    explanation: 'Trong $\\triangle ABC$ vuông tại $B$, ta có $BC = \\sqrt{13^2 - 5^2} = 12 \\Rightarrow S_{\\triangle ABC} = \\frac{1}{2} \\cdot 5 \\cdot 12 = 30$. Khi đó $V = \\frac{1}{3} \\cdot 30 \\cdot 6 = 60$.',
    tikzType: 'custom',
    tikzCode: TIKZ_PYR_SABC_SA_PERP
  },
  {
    prompt: 'Cho khối hộp chữ nhật $ABCD.A\'B\'C\'D\'$ có $AB = 3, AD = 4$ và đường chéo $AC\' = 13$. Tính thể tích của khối hộp chữ nhật đó.',
    correctAnswer: '144',
    acceptedAnswers: ['144'],
    explanation: 'Chiều cao của khối hộp chữ nhật là $AA\' = \\sqrt{AC\'^2 - AB^2 - AD^2} = \\sqrt{169 - 9 - 16} = 12$. Vậy thể tích $V = 3 \\cdot 4 \\cdot 12 = 144$.',
    tikzType: 'custom',
    tikzCode: TIKZ_CUBE_ABCD
  },
  {
    prompt: 'Một khối lăng trụ đứng có đáy là hình thoi với hai đường chéo dài $6\\text{ cm}$ và $8\\text{ cm}$, biết cạnh bên của lăng trụ bằng $10\\text{ cm}$. Tính thể tích của khối lăng trụ đó (đơn vị: $\\text{cm}^3$).',
    correctAnswer: '240',
    acceptedAnswers: ['240'],
    explanation: 'Diện tích đáy hình thoi là $S = \\frac{1}{2} d_1 d_2 = \\frac{1}{2} \\cdot 6 \\cdot 8 = 24\\text{ cm}^2$. Thể tích khối lăng trụ là $V = S \\cdot h = 24 \\cdot 10 = 240\\text{ (cm}^3)$.'
  }
];

const b27P4B: CompactSO[] = [
  {
    prompt: 'Sắp xếp các bước tính thể tích khối chóp cụt tứ giác đều có cạnh đáy lớn bằng $6a$, cạnh đáy nhỏ bằng $2a$ và cạnh bên bằng $4a$:',
    steps: [
      { id: '1', text: 'Tính diện tích hai đáy hình vuông: $S = (6a)^2 = 36a^2$ và $S\' = (2a)^2 = 4a^2$.' },
      { id: '2', text: 'Tính nửa đường chéo hai đáy: $OA = 3a\\sqrt{2}$ và $O\'A\' = a\\sqrt{2}$, suy ra hiệu $OA - O\'A\' = 2a\\sqrt{2}$.' },
      { id: '3', text: 'Tính đường cao của khối chóp cụt: $h = \\sqrt{AA\'^2 - (OA - O\'A\')^2} = \\sqrt{16a^2 - 8a^2} = 2a\\sqrt{2}$.' },
      { id: '4', text: 'Thay vào công thức thể tích: $V = \\frac{1}{3} h (S + S\' + \\sqrt{SS\'}) = \\frac{1}{3} \\cdot 2a\\sqrt{2} \\cdot (36a^2 + 4a^2 + 12a^2) = \\frac{104a^3\\sqrt{2}}{3}$.' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Tính $S = 36a^2, S\' = 4a^2$, tìm chiều cao $h = 2a\\sqrt{2}$ từ hình thang cân $ACC\'A\'$ rồi áp dụng công thức thể tích chóp cụt.'
  },
  {
    prompt: 'Sắp xếp các bước tính khoảng cách từ $B$ đến mặt phẳng $(SAC)$ thông qua phương pháp thể tích trong hình chóp $S.ABC$ có $SA \\perp (ABC), \\triangle ABC$ vuông tại $B$ ($AB = 3, BC = 4$) và $SA = 5$:',
    tikzType: 'custom',
    tikzCode: TIKZ_PYR_SABC_SA_PERP,
    steps: [
      { id: '1', text: 'Tính diện tích $\\triangle ABC$ là $S_{ABC} = \\frac{1}{2} \\cdot 3 \\cdot 4 = 6$ và thể tích $V_{S.ABC} = \\frac{1}{3} S_{ABC} \\cdot SA = 10$.' },
      { id: '2', text: 'Tính độ dài cạnh huyền $AC = \\sqrt{3^2 + 4^2} = 5$.' },
      { id: '3', text: 'Tính diện tích mặt bên $\\triangle SAC$ vuông tại $A$: $S_{SAC} = \\frac{1}{2} SA \\cdot AC = \\frac{25}{2}$.' },
      { id: '4', text: 'Từ công thức $V_{B.SAC} = \\frac{1}{3} S_{SAC} \\cdot d(B, (SAC)) = V_{S.ABC}$, suy ra $d(B, (SAC)) = \\frac{3V}{S_{SAC}} = \\frac{30}{25/2} = 2,4$.' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Sử dụng công thức $d(B, (SAC)) = \\frac{3V_{S.ABC}}{S_{\\triangle SAC}} = \\frac{30}{12,5} = 2,4$.'
  },
  {
    prompt: 'Sắp xếp các bước tính thể tích khối lăng trụ đứng $ABC.A\'B\'C\'$ có đáy $ABC$ là tam giác đều cạnh $2a$ và mặt phẳng $(A\'BC)$ tạo với đáy một góc $60^\\circ$:',
    tikzType: 'custom',
    tikzCode: TIKZ_RIGHT_PRISM_ABCA1B1C1,
    steps: [
      { id: '1', text: 'Tính diện tích đáy đều $ABC$ cạnh $2a$: $S_{ABC} = \\frac{(2a)^2\\sqrt{3}}{4} = a^2\\sqrt{3}$ và đường cao đáy $AM = a\\sqrt{3}$.' },
      { id: '2', text: 'Góc giữa $(A\'BC)$ và $(ABC)$ là $\\widehat{A\'MA} = 60^\\circ$ (với $M$ là trung điểm $BC$).' },
      { id: '3', text: 'Trong $\\triangle A\'AM$ vuông tại $A$, tính chiều cao lăng trụ: $AA\' = AM \\cdot \\tan 60^\\circ = a\\sqrt{3} \\cdot \\sqrt{3} = 3a$.' },
      { id: '4', text: 'Tính thể tích khối lăng trụ: $V = S_{ABC} \\cdot AA\' = a^2\\sqrt{3} \\cdot 3a = 3a^3\\sqrt{3}$.' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Tính $S_{ABC} = a^2\\sqrt{3}, AM = a\\sqrt{3}$, từ $\\widehat{A\'MA} = 60^\\circ \\Rightarrow AA\' = 3a$, suy ra $V = 3a^3\\sqrt{3}$.'
  },
  {
    prompt: 'Sắp xếp các bước tính thể tích khối chóp tứ giác đều $S.ABCD$ có cạnh đáy bằng $a$ và góc giữa cạnh bên với mặt đáy bằng $45^\\circ$:',
    tikzType: 'custom',
    tikzCode: TIKZ_PYR_REGULAR_SABCD,
    steps: [
      { id: '1', text: 'Tính diện tích đáy hình vuông $S_{ABCD} = a^2$ và bán kính ngoại tiếp đáy $OA = \\frac{a\\sqrt{2}}{2}$.' },
      { id: '2', text: 'Xác định góc giữa cạnh bên $SA$ và mặt đáy $(ABCD)$ là $\\widehat{SAO} = 45^\\circ$.' },
      { id: '3', text: 'Trong $\\triangle SOA$ vuông cân tại $O$, suy ra chiều cao $SO = OA = \\frac{a\\sqrt{2}}{2}$.' },
      { id: '4', text: 'Tính thể tích khối chóp: $V = \\frac{1}{3} S_{ABCD} \\cdot SO = \\frac{a^3\\sqrt{2}}{6}$.' }
    ],
    correctOrder: ['1', '2', '3', '4'],
    explanation: 'Từ $\\widehat{SAO} = 45^\\circ \\Rightarrow SO = OA = \\frac{a\\sqrt{2}}{2}$, suy ra $V = \\frac{a^3\\sqrt{2}}{6}$.'
  }
];

// ============================================================================
// ÔN TẬP CHƯƠNG VII. QUAN HỆ VUÔNG GÓC TRONG KHÔNG GIAN
// Tổng hợp toàn chương VII (Bài 22 -> Bài 27)
// ============================================================================

const ch7RevP1A: CompactMC[] = [
  b22P1A[4], b22P1A[9],
  b23P1A[2], b23P1A[4],
  b24P1A[4], b24P1A[8],
  b25P1A[4], b25P1A[7],
  b26P1A[3], b26P1A[7],
  b27P1A[4], b27P1A[7]
];

const ch7RevP1B: CompactMC[] = [
  b22P1B[3], b22P1B[10],
  b23P1B[4], b23P1B[5],
  b24P1B[4], b24P1B[6],
  b25P1B[3], b25P1B[5],
  b26P1B[4], b26P1B[7],
  b27P1B[4], b27P1B[5]
];

const ch7RevP2A: CompactTF[] = [b23P2A[0], b26P2A[0]];
const ch7RevP2B: CompactTF[] = [b25P2B[0], b27P2A[0]];
const ch7RevP3A: CompactSA[] = [b22P3A[0], b24P3A[0], b26P3A[2], b27P3A[1]];
const ch7RevP3B: CompactSA[] = [b23P3B[0], b25P3A[2], b26P3B[1], b27P3B[0]];
const ch7RevP4A: CompactSO[] = [b23P4A[1], b24P4A[0], b26P4A[0], b27P4A[0]];
const ch7RevP4B: CompactSO[] = [b22P4B[0], b25P4B[0], b26P4B[0], b27P4B[2]];

export const chapter7LessonExams: Record<string, ExamSet[]> = {
  'bai-22': [
    buildCompactLessonExamSet(
      'bai-22-de-1',
      'Đề ôn Bài 22 – Đề số 01',
      'Bài 22. Hai đường thẳng vuông góc',
      1,
      b22P1A, b22P2A, b22P3A, b22P4A
    ),
    buildCompactLessonExamSet(
      'bai-22-de-2',
      'Đề ôn Bài 22 – Đề số 02',
      'Bài 22. Hai đường thẳng vuông góc',
      2,
      b22P1B, b22P2B, b22P3B, b22P4B
    )
  ],
  'bai-23': [
    buildCompactLessonExamSet(
      'bai-23-de-1',
      'Đề ôn Bài 23 – Đề số 01',
      'Bài 23. Đường thẳng vuông góc với mặt phẳng',
      1,
      b23P1A, b23P2A, b23P3A, b23P4A
    ),
    buildCompactLessonExamSet(
      'bai-23-de-2',
      'Đề ôn Bài 23 – Đề số 02',
      'Bài 23. Đường thẳng vuông góc với mặt phẳng',
      2,
      b23P1B, b23P2B, b23P3B, b23P4B
    )
  ],
  'bai-24': [
    buildCompactLessonExamSet(
      'bai-24-de-1',
      'Đề ôn Bài 24 – Đề số 01',
      'Bài 24. Phép chiếu vuông góc. Góc giữa đường thẳng và mặt phẳng',
      1,
      b24P1A, b24P2A, b24P3A, b24P4A
    ),
    buildCompactLessonExamSet(
      'bai-24-de-2',
      'Đề ôn Bài 24 – Đề số 02',
      'Bài 24. Phép chiếu vuông góc. Góc giữa đường thẳng và mặt phẳng',
      2,
      b24P1B, b24P2B, b24P3B, b24P4B
    )
  ],
  'bai-25': [
    buildCompactLessonExamSet(
      'bai-25-de-1',
      'Đề ôn Bài 25 – Đề số 01',
      'Bài 25. Hai mặt phẳng vuông góc',
      1,
      b25P1A, b25P2A, b25P3A, b25P4A
    ),
    buildCompactLessonExamSet(
      'bai-25-de-2',
      'Đề ôn Bài 25 – Đề số 02',
      'Bài 25. Hai mặt phẳng vuông góc',
      2,
      b25P1B, b25P2B, b25P3B, b25P4B
    )
  ],
  'bai-26': [
    buildCompactLessonExamSet(
      'bai-26-de-1',
      'Đề ôn Bài 26 – Đề số 01',
      'Bài 26. Khoảng cách',
      1,
      b26P1A, b26P2A, b26P3A, b26P4A
    ),
    buildCompactLessonExamSet(
      'bai-26-de-2',
      'Đề ôn Bài 26 – Đề số 02',
      'Bài 26. Khoảng cách',
      2,
      b26P1B, b26P2B, b26P3B, b26P4B
    )
  ],
  'bai-27': [
    buildCompactLessonExamSet(
      'bai-27-de-1',
      'Đề ôn Bài 27 – Đề số 01',
      'Bài 27. Thể tích',
      1,
      b27P1A, b27P2A, b27P3A, b27P4A
    ),
    buildCompactLessonExamSet(
      'bai-27-de-2',
      'Đề ôn Bài 27 – Đề số 02',
      'Bài 27. Thể tích',
      2,
      b27P1B, b27P2B, b27P3B, b27P4B
    )
  ],
  'on-tap-chuong-7': [
    buildCompactLessonExamSet(
      'on-tap-chuong-7-de-1',
      'Đề ôn Chương VII – Đề số 01',
      'Ôn tập chương VII. Quan hệ vuông góc trong không gian',
      1,
      ch7RevP1A, ch7RevP2A, ch7RevP3A, ch7RevP4A
    ),
    buildCompactLessonExamSet(
      'on-tap-chuong-7-de-2',
      'Đề ôn Chương VII – Đề số 02',
      'Ôn tập chương VII. Quan hệ vuông góc trong không gian',
      2,
      ch7RevP1B, ch7RevP2B, ch7RevP3B, ch7RevP4B
    )
  ]
};
