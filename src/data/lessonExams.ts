import { ExamSet } from '../types/exam';
import { examSets } from './examSets';
import { chapter1LessonExams } from './lessons/chapter1';
import { chapter2LessonExams } from './lessons/chapter2';
import { chapter3LessonExams } from './lessons/chapter3';
import { chapter4LessonExams } from './lessons/chapter4';
import { chapter5LessonExams } from './lessons/chapter5';
import { chapter6LessonExams } from './lessons/chapter6';
import { chapter7LessonExams } from './lessons/chapter7';
import { chapter8LessonExams } from './lessons/chapter8';
import { chapter9LessonExams } from './lessons/chapter9';

export interface TextbookLesson {
  id: string;
  chapterId: string;
  lessonNumber: string;
  lessonCode: string;
  lessonTitle: string;
  fullName: string;
  isChapterReview: boolean;
  pageNumber: number;
  summary: string;
  keyTopics: string[];
  practiceExams: ExamSet[];
}

export interface TextbookChapter {
  id: string;
  code: string;
  title: string;
  chapterNumber: string;
  chapterTitle: string;
  lessons: TextbookLesson[];
}

const allLessonExamsByLessonId: Record<string, ExamSet[]> = {
  ...chapter1LessonExams,
  ...chapter2LessonExams,
  ...chapter3LessonExams,
  ...chapter4LessonExams,
  ...chapter5LessonExams,
  ...chapter6LessonExams,
  ...chapter7LessonExams,
  ...chapter8LessonExams,
  ...chapter9LessonExams,
};

export const textbookChapters: TextbookChapter[] = [
  {
    id: 'chuong-1',
    code: 'CHƯƠNG I',
    title: 'HÀM SỐ LƯỢNG GIÁC VÀ PHƯƠNG TRÌNH LƯỢNG GIÁC',
    chapterNumber: 'CHƯƠNG I',
    chapterTitle: 'HÀM SỐ LƯỢNG GIÁC VÀ PHƯƠNG TRÌNH LƯỢNG GIÁC',
    lessons: [
      {
        id: 'bai-1',
        chapterId: 'chuong-1',
        lessonNumber: 'Bài 1',
        lessonCode: 'Bài 1',
        lessonTitle: 'Giá trị lượng giác của góc lượng giác',
        fullName: 'Bài 1. Giá trị lượng giác của góc lượng giác',
        isChapterReview: false,
        pageNumber: 5,
        summary:
          'Góc lượng giác, đơn vị độ và radian, đường tròn lượng giác, các giá trị lượng giác sin, cos, tan, cot và các hệ thức lượng giác cơ bản.',
        keyTopics: [
          'Góc lượng giác & hệ thức Chasles',
          'Đổi đơn vị độ và radian',
          'Đường tròn lượng giác & dấu các giá trị lượng giác',
          'Hệ thức lượng giác cơ bản & góc liên quan đặc biệt',
        ],
        practiceExams: allLessonExamsByLessonId['bai-1'],
      },
      {
        id: 'bai-2',
        chapterId: 'chuong-1',
        lessonNumber: 'Bài 2',
        lessonCode: 'Bài 2',
        lessonTitle: 'Công thức lượng giác',
        fullName: 'Bài 2. Công thức lượng giác',
        isChapterReview: false,
        pageNumber: 17,
        summary:
          'Công thức cộng, công thức nhân đôi, công thức biến đổi tích thành tổng và công thức biến đổi tổng thành tích.',
        keyTopics: [
          'Công thức cộng',
          'Công thức nhân đôi & hạ bậc',
          'Công thức biến đổi tích thành tổng',
          'Công thức biến đổi tổng thành tích',
        ],
        practiceExams: allLessonExamsByLessonId['bai-2'],
      },
      {
        id: 'bai-3',
        chapterId: 'chuong-1',
        lessonNumber: 'Bài 3',
        lessonCode: 'Bài 3',
        lessonTitle: 'Hàm số lượng giác',
        fullName: 'Bài 3. Hàm số lượng giác',
        isChapterReview: false,
        pageNumber: 22,
        summary:
          'Tập xác định, tập giá trị, tính chẵn lẻ, tính tuần hoàn, sự biến thiên và đồ thị của các hàm số y = sin x, y = cos x, y = tan x, y = cot x.',
        keyTopics: [
          'Tập xác định & tập giá trị (GTLN, GTNN)',
          'Tính chẵn, lẻ của hàm số lượng giác',
          'Hàm số tuần hoàn & chu kì cơ sở',
          'Sự biến thiên & đồ thị sin, cos, tan, cot',
        ],
        practiceExams: allLessonExamsByLessonId['bai-3'],
      },
      {
        id: 'bai-4',
        chapterId: 'chuong-1',
        lessonNumber: 'Bài 4',
        lessonCode: 'Bài 4',
        lessonTitle: 'Phương trình lượng giác cơ bản',
        fullName: 'Bài 4. Phương trình lượng giác cơ bản',
        isChapterReview: false,
        pageNumber: 32,
        summary:
          'Phương trình tương đương và công thức nghiệm của các phương trình lượng giác cơ bản sin x = m, cos x = m, tan x = m, cot x = m.',
        keyTopics: [
          'Phương trình sin x = m',
          'Phương trình cos x = m',
          'Phương trình tan x = m và cot x = m',
          'Đếm nghiệm phương trình lượng giác trên khoảng/đoạn',
        ],
        practiceExams: allLessonExamsByLessonId['bai-4'],
      },
      {
        id: 'on-tap-chuong-1',
        chapterId: 'chuong-1',
        lessonNumber: 'Ôn tập chương I',
        lessonCode: 'Ôn tập chương I',
        lessonTitle: 'Bài tập cuối chương I',
        fullName: 'Ôn tập chương I. Hàm số lượng giác và phương trình lượng giác',
        isChapterReview: true,
        pageNumber: 40,
        summary:
          'Hệ thống hóa toàn bộ kiến thức và bài tập tổng hợp Chương I: góc lượng giác, công thức biến đổi, hàm số và phương trình lượng giác.',
        keyTopics: [
          'Tổng hợp giá trị lượng giác & công thức biến đổi',
          'Khảo sát hàm số lượng giác & tìm GTLN - GTNN',
          'Giải phương trình lượng giác cơ bản & thực tiễn',
        ],
        practiceExams: allLessonExamsByLessonId['on-tap-chuong-1'],
      },
    ],
  },
  {
    id: 'chuong-2',
    code: 'CHƯƠNG II',
    title: 'DÃY SỐ. CẤP SỐ CỘNG VÀ CẤP SỐ NHÂN',
    chapterNumber: 'CHƯƠNG II',
    chapterTitle: 'DÃY SỐ. CẤP SỐ CỘNG VÀ CẤP SỐ NHÂN',
    lessons: [
      {
        id: 'bai-5',
        chapterId: 'chuong-2',
        lessonNumber: 'Bài 5',
        lessonCode: 'Bài 5',
        lessonTitle: 'Dãy số',
        fullName: 'Bài 5. Dãy số',
        isChapterReview: false,
        pageNumber: 42,
        summary:
          'Định nghĩa dãy số hữu hạn và vô hạn, các cách cho một dãy số, dãy số tăng, dãy số giảm và dãy số bị chặn.',
        keyTopics: [
          'Số hạng tổng quát & hệ thức truy hồi',
          'Xét tính tăng, giảm của dãy số',
          'Dãy số bị chặn trên, bị chặn dưới, bị chặn',
        ],
        practiceExams: allLessonExamsByLessonId['bai-5'],
      },
      {
        id: 'bai-6',
        chapterId: 'chuong-2',
        lessonNumber: 'Bài 6',
        lessonCode: 'Bài 6',
        lessonTitle: 'Cấp số cộng',
        fullName: 'Bài 6. Cấp số cộng',
        isChapterReview: false,
        pageNumber: 48,
        summary:
          'Định nghĩa cấp số cộng, công sai d, số hạng tổng quát u_n và công thức tính tổng n số hạng đầu S_n của cấp số cộng.',
        keyTopics: [
          'Định nghĩa cấp số cộng & công sai d',
          'Số hạng tổng quát u_n = u_1 + (n-1)d',
          'Tính chất trung bình cộng & tổng n số hạng đầu S_n',
        ],
        practiceExams: allLessonExamsByLessonId['bai-6'],
      },
      {
        id: 'bai-7',
        chapterId: 'chuong-2',
        lessonNumber: 'Bài 7',
        lessonCode: 'Bài 7',
        lessonTitle: 'Cấp số nhân',
        fullName: 'Bài 7. Cấp số nhân',
        isChapterReview: false,
        pageNumber: 52,
        summary:
          'Định nghĩa cấp số nhân, công bội q, số hạng tổng quát u_n và công thức tính tổng n số hạng đầu S_n của cấp số nhân.',
        keyTopics: [
          'Định nghĩa cấp số nhân & công bội q',
          'Số hạng tổng quát u_n = u_1 * q^(n-1)',
          'Tính chất trung bình nhân & tổng n số hạng đầu S_n',
        ],
        practiceExams: allLessonExamsByLessonId['bai-7'],
      },
      {
        id: 'on-tap-chuong-2',
        chapterId: 'chuong-2',
        lessonNumber: 'Ôn tập chương II',
        lessonCode: 'Ôn tập chương II',
        lessonTitle: 'Bài tập cuối chương II',
        fullName: 'Ôn tập chương II. Dãy số. Cấp số cộng và cấp số nhân',
        isChapterReview: true,
        pageNumber: 57,
        summary:
          'Tổng hợp kiến thức và các bài toán thực tiễn về dãy số, cấp số cộng và cấp số nhân.',
        keyTopics: [
          'Tổng hợp dãy số tăng/giảm & bị chặn',
          'Bài toán kết hợp cấp số cộng & cấp số nhân',
          'Ứng dụng thực tế lãi kép, dân số & xếp hàng',
        ],
        practiceExams: allLessonExamsByLessonId['on-tap-chuong-2'],
      },
    ],
  },
  {
    id: 'chuong-3',
    code: 'CHƯƠNG III',
    title: 'CÁC SỐ ĐẶC TRƯNG ĐO XU THẾ TRUNG TÂM CỦA MẪU SỐ LIỆU GHÉP NHÓM',
    chapterNumber: 'CHƯƠNG III',
    chapterTitle: 'CÁC SỐ ĐẶC TRƯNG ĐO XU THẾ TRUNG TÂM CỦA MẪU SỐ LIỆU GHÉP NHÓM',
    lessons: [
      {
        id: 'bai-8',
        chapterId: 'chuong-3',
        lessonNumber: 'Bài 8',
        lessonCode: 'Bài 8',
        lessonTitle: 'Mẫu số liệu ghép nhóm',
        fullName: 'Bài 8. Mẫu số liệu ghép nhóm',
        isChapterReview: false,
        pageNumber: 59,
        summary:
          'Cách đọc, giải thích bảng tần số ghép nhóm và chuyển mẫu số liệu không ghép nhóm sang mẫu số liệu ghép nhóm.',
        keyTopics: [
          'Nhóm số liệu [a; b), đầu mút & độ dài nhóm',
          'Giá trị đại diện c_i = (a_i + b_i)/2',
          'Lập bảng tần số ghép nhóm & tính cỡ mẫu n',
        ],
        practiceExams: allLessonExamsByLessonId['bai-8'],
      },
      {
        id: 'bai-9',
        chapterId: 'chuong-3',
        lessonNumber: 'Bài 9',
        lessonCode: 'Bài 9',
        lessonTitle: 'Các số đặc trưng đo xu thế trung tâm',
        fullName: 'Bài 9. Các số đặc trưng đo xu thế trung tâm',
        isChapterReview: false,
        pageNumber: 63,
        summary:
          'Số trung bình cộng, trung vị (M_e), tứ phân vị (Q_1, Q_2, Q_3) và mốt (M_o) của mẫu số liệu ghép nhóm.',
        keyTopics: [
          'Số trung bình cộng của mẫu số liệu ghép nhóm',
          'Trung vị M_e & công thức nội suy',
          'Tứ phân vị Q_1, Q_2, Q_3 & Mốt M_o',
        ],
        practiceExams: allLessonExamsByLessonId['bai-9'],
      },
      {
        id: 'on-tap-chuong-3',
        chapterId: 'chuong-3',
        lessonNumber: 'Ôn tập chương III',
        lessonCode: 'Ôn tập chương III',
        lessonTitle: 'Bài tập cuối chương III',
        fullName:
          'Ôn tập chương III. Các số đặc trưng đo xu thế trung tâm của mẫu số liệu ghép nhóm',
        isChapterReview: true,
        pageNumber: 70,
        summary:
          'Tổng hợp các bài toán thống kê thực tiễn về bảng tần số ghép nhóm, số trung bình, trung vị, tứ phân vị và mốt.',
        keyTopics: [
          'Phân tích bảng tần số ghép nhóm thực tế',
          'Tính và giải thích ý nghĩa trung bình, trung vị, tứ phân vị, mốt',
        ],
        practiceExams: allLessonExamsByLessonId['on-tap-chuong-3'],
      },
    ],
  },
  {
    id: 'chuong-4',
    code: 'CHƯƠNG IV',
    title: 'QUAN HỆ SONG SONG TRONG KHÔNG GIAN',
    chapterNumber: 'CHƯƠNG IV',
    chapterTitle: 'QUAN HỆ SONG SONG TRONG KHÔNG GIAN',
    lessons: [
      {
        id: 'bai-10',
        chapterId: 'chuong-4',
        lessonNumber: 'Bài 10',
        lessonCode: 'Bài 10',
        lessonTitle: 'Đường thẳng và mặt phẳng trong không gian',
        fullName: 'Bài 10. Đường thẳng và mặt phẳng trong không gian',
        isChapterReview: false,
        pageNumber: 71,
        summary:
          'Các tính chất thừa nhận của hình học không gian, các cách xác định mặt phẳng, giao tuyến hai mặt phẳng, hình chóp và hình tứ diện.',
        keyTopics: [
          'Các tính chất thừa nhận & 3 cách xác định mặt phẳng',
          'Tìm giao tuyến của hai mặt phẳng',
          'Tìm giao điểm của đường thẳng và mặt phẳng',
          'Hình chóp và hình tứ diện',
        ],
        practiceExams: allLessonExamsByLessonId['bai-10'],
      },
      {
        id: 'bai-11',
        chapterId: 'chuong-4',
        lessonNumber: 'Bài 11',
        lessonCode: 'Bài 11',
        lessonTitle: 'Hai đường thẳng song song',
        fullName: 'Bài 11. Hai đường thẳng song song',
        isChapterReview: false,
        pageNumber: 80,
        summary:
          'Vị trí tương đối của hai đường thẳng trong không gian (song song, cắt nhau, chéo nhau, trùng nhau) và định lí ba đường giao tuyến.',
        keyTopics: [
          'Hai đường thẳng song song & hai đường thẳng chéo nhau',
          'Tính chất cơ bản về hai đường thẳng song song',
          'Định lí về ba đường giao tuyến',
        ],
        practiceExams: allLessonExamsByLessonId['bai-11'],
      },
      {
        id: 'bai-12',
        chapterId: 'chuong-4',
        lessonNumber: 'Bài 12',
        lessonCode: 'Bài 12',
        lessonTitle: 'Đường thẳng và mặt phẳng song song',
        fullName: 'Bài 12. Đường thẳng và mặt phẳng song song',
        isChapterReview: false,
        pageNumber: 85,
        summary:
          'Vị trí tương đối của đường thẳng và mặt phẳng; dấu hiệu nhận biết và tính chất của đường thẳng song song với mặt phẳng.',
        keyTopics: [
          '3 vị trí tương đối của đường thẳng và mặt phẳng',
          'Dấu hiệu nhận biết đường thẳng song song mặt phẳng',
          'Tính chất đường thẳng song song mặt phẳng & dựng thiết diện',
        ],
        practiceExams: allLessonExamsByLessonId['bai-12'],
      },
      {
        id: 'bai-13',
        chapterId: 'chuong-4',
        lessonNumber: 'Bài 13',
        lessonCode: 'Bài 13',
        lessonTitle: 'Hai mặt phẳng song song',
        fullName: 'Bài 13. Hai mặt phẳng song song',
        isChapterReview: false,
        pageNumber: 90,
        summary:
          'Điều kiện và tính chất của hai mặt phẳng song song, định lí Thalès trong không gian, hình lăng trụ và hình hộp.',
        keyTopics: [
          'Điều kiện & tính chất hai mặt phẳng song song',
          'Định lí Thalès trong không gian',
          'Hình lăng trụ và hình hộp',
        ],
        practiceExams: allLessonExamsByLessonId['bai-13'],
      },
      {
        id: 'bai-14',
        chapterId: 'chuong-4',
        lessonNumber: 'Bài 14',
        lessonCode: 'Bài 14',
        lessonTitle: 'Phép chiếu song song',
        fullName: 'Bài 14. Phép chiếu song song',
        isChapterReview: false,
        pageNumber: 99,
        summary:
          'Định nghĩa phép chiếu song song, các tính chất bảo toàn của phép chiếu song song và hình biểu diễn của một hình không gian trên mặt phẳng.',
        keyTopics: [
          'Khái niệm phép chiếu song song',
          'Các tính chất bảo toàn tỉ số đoạn thẳng song song',
          'Hình biểu diễn của một hình không gian trên mặt phẳng',
        ],
        practiceExams: allLessonExamsByLessonId['bai-14'],
      },
      {
        id: 'on-tap-chuong-4',
        chapterId: 'chuong-4',
        lessonNumber: 'Ôn tập chương IV',
        lessonCode: 'Ôn tập chương IV',
        lessonTitle: 'Bài tập cuối chương IV',
        fullName: 'Ôn tập chương IV. Quan hệ song song trong không gian',
        isChapterReview: true,
        pageNumber: 104,
        summary:
          'Tổng hợp toàn bộ kiến thức hình học không gian Chương IV: tìm giao tuyến, giao điểm, thiết diện và chứng minh quan hệ song song.',
        keyTopics: [
          'Giao tuyến, giao điểm & thiết diện song song',
          'Chứng minh đường thẳng song song mặt phẳng & hai mặt phẳng song song',
          'Hình chóp, tứ diện, hình lăng trụ & hình hộp',
        ],
        practiceExams: allLessonExamsByLessonId['on-tap-chuong-4'],
      },
    ],
  },
  {
    id: 'chuong-5',
    code: 'CHƯƠNG V',
    title: 'GIỚI HẠN. HÀM SỐ LIÊN TỤC',
    chapterNumber: 'CHƯƠNG V',
    chapterTitle: 'GIỚI HẠN. HÀM SỐ LIÊN TỤC',
    lessons: [
      {
        id: 'bai-15',
        chapterId: 'chuong-5',
        lessonNumber: 'Bài 15',
        lessonCode: 'Bài 15',
        lessonTitle: 'Giới hạn của dãy số',
        fullName: 'Bài 15. Giới hạn của dãy số',
        isChapterReview: false,
        pageNumber: 105,
        summary:
          'Giới hạn hữu hạn của dãy số, định lí về giới hạn hữu hạn, tổng của cấp số nhân lùi vô hạn và giới hạn vô cực của dãy số.',
        keyTopics: [
          'Giới hạn hữu hạn & định lí giới hạn của dãy số',
          'Tổng của cấp số nhân lùi vô hạn S = u_1 / (1 - q)',
          'Giới hạn vô cực của dãy số',
        ],
        practiceExams: allLessonExamsByLessonId['bai-15'],
      },
      {
        id: 'bai-16',
        chapterId: 'chuong-5',
        lessonNumber: 'Bài 16',
        lessonCode: 'Bài 16',
        lessonTitle: 'Giới hạn của hàm số',
        fullName: 'Bài 16. Giới hạn của hàm số',
        isChapterReview: false,
        pageNumber: 112,
        summary:
          'Giới hạn hữu hạn của hàm số tại một điểm, giới hạn một bên, giới hạn của hàm số tại vô cực và giới hạn vô cực của hàm số.',
        keyTopics: [
          'Giới hạn hữu hạn tại một điểm & khử dạng 0/0',
          'Giới hạn một bên (trái, phải)',
          'Giới hạn tại vô cực & giới hạn vô cực của hàm số',
        ],
        practiceExams: allLessonExamsByLessonId['bai-16'],
      },
      {
        id: 'bai-17',
        chapterId: 'chuong-5',
        lessonNumber: 'Bài 17',
        lessonCode: 'Bài 17',
        lessonTitle: 'Hàm số liên tục',
        fullName: 'Bài 17. Hàm số liên tục',
        isChapterReview: false,
        pageNumber: 119,
        summary:
          'Hàm số liên tục tại một điểm, hàm số liên tục trên một khoảng hoặc một đoạn và ứng dụng chứng minh phương trình có nghiệm.',
        keyTopics: [
          'Hàm số liên tục tại một điểm x_0',
          'Hàm số liên tục trên khoảng, đoạn & các hàm sơ cấp',
          'Định lí giá trị trung gian chứng minh phương trình có nghiệm',
        ],
        practiceExams: allLessonExamsByLessonId['bai-17'],
      },
      {
        id: 'on-tap-chuong-5',
        chapterId: 'chuong-5',
        lessonNumber: 'Ôn tập chương V',
        lessonCode: 'Ôn tập chương V',
        lessonTitle: 'Bài tập cuối chương V',
        fullName: 'Ôn tập chương V. Giới hạn. Hàm số liên tục',
        isChapterReview: true,
        pageNumber: 124,
        summary:
          'Hệ thống hóa kiến thức và bài tập tổng hợp Chương V: giới hạn dãy số, cấp số nhân lùi vô hạn, giới hạn hàm số và hàm số liên tục.',
        keyTopics: [
          'Tổng hợp giới hạn dãy số & cấp số nhân lùi vô hạn',
          'Tổng hợp giới hạn hàm số tại một điểm và tại vô cực',
          'Xét tính liên tục và chứng minh phương trình có nghiệm',
        ],
        practiceExams: allLessonExamsByLessonId['on-tap-chuong-5'],
      },
    ],
  },
  {
    id: 'chuong-6',
    code: 'CHƯƠNG VI',
    title: 'HÀM SỐ MŨ VÀ HÀM SỐ LÔGARIT',
    chapterNumber: 'CHƯƠNG VI',
    chapterTitle: 'HÀM SỐ MŨ VÀ HÀM SỐ LÔGARIT',
    lessons: [
      {
        id: 'bai-18',
        chapterId: 'chuong-6',
        lessonNumber: 'Bài 18',
        lessonCode: 'Bài 18',
        lessonTitle: 'Luỹ thừa với số mũ thực',
        fullName: 'Bài 18. Luỹ thừa với số mũ thực',
        isChapterReview: false,
        pageNumber: 5,
        summary:
          'Khái niệm luỹ thừa với số mũ nguyên, căn bậc n, luỹ thừa với số mũ hữu tỉ, luỹ thừa với số mũ thực và các tính chất biến đổi luỹ thừa.',
        keyTopics: [
          'Luỹ thừa với số mũ nguyên & căn bậc n',
          'Luỹ thừa với số mũ hữu tỉ và số mũ thực',
          'Các tính chất của phép tính luỹ thừa',
          'Bài toán thực tiễn lãi kép & tăng trưởng theo hàm mũ',
        ],
        practiceExams: allLessonExamsByLessonId['bai-18'],
      },
      {
        id: 'bai-19',
        chapterId: 'chuong-6',
        lessonNumber: 'Bài 19',
        lessonCode: 'Bài 19',
        lessonTitle: 'Lôgarit',
        fullName: 'Bài 19. Lôgarit',
        isChapterReview: false,
        pageNumber: 11,
        summary:
          'Khái niệm lôgarit, các quy tắc tính lôgarit (tích, thương, luỹ thừa), công thức đổi cơ số, lôgarit thập phân và lôgarit tự nhiên.',
        keyTopics: [
          'Định nghĩa lôgarit & tính chất cơ bản',
          'Lôgarit của một tích, một thương, một luỹ thừa',
          'Công thức đổi cơ số của lôgarit',
          'Lôgarit thập phân (log) & lôgarit tự nhiên (ln)',
        ],
        practiceExams: allLessonExamsByLessonId['bai-19'],
      },
      {
        id: 'bai-20',
        chapterId: 'chuong-6',
        lessonNumber: 'Bài 20',
        lessonCode: 'Bài 20',
        lessonTitle: 'Hàm số mũ và hàm số lôgarit',
        fullName: 'Bài 20. Hàm số mũ và hàm số lôgarit',
        isChapterReview: false,
        pageNumber: 16,
        summary:
          'Tập xác định, tập giá trị, tính đồng biến, nghịch biến, bảng biến thiên và đồ thị của hàm số mũ y = a^x và hàm số lôgarit y = log_a x.',
        keyTopics: [
          'Tập xác định & tập giá trị của hàm số mũ, hàm số lôgarit',
          'Sự biến thiên theo cơ số a > 1 và 0 < a < 1',
          'Nhận dạng đồ thị hàm số mũ & hàm số lôgarit',
        ],
        practiceExams: allLessonExamsByLessonId['bai-20'],
      },
      {
        id: 'bai-21',
        chapterId: 'chuong-6',
        lessonNumber: 'Bài 21',
        lessonCode: 'Bài 21',
        lessonTitle: 'Phương trình, bất phương trình mũ và lôgarit',
        fullName: 'Bài 21. Phương trình, bất phương trình mũ và lôgarit',
        isChapterReview: false,
        pageNumber: 21,
        summary:
          'Phương trình mũ và phương trình lôgarit cơ bản; bất phương trình mũ và bất phương trình lôgarit cơ bản kèm điều kiện xác định.',
        keyTopics: [
          'Phương trình mũ a^x = b và phương pháp đưa về cùng cơ số',
          'Phương trình lôgarit log_a x = b và điều kiện xác định',
          'Bất phương trình mũ & bất phương trình lôgarit (xét cơ số a > 1 và 0 < a < 1)',
        ],
        practiceExams: allLessonExamsByLessonId['bai-21'],
      },
      {
        id: 'on-tap-chuong-6',
        chapterId: 'chuong-6',
        lessonNumber: 'Ôn tập chương VI',
        lessonCode: 'Ôn tập chương VI',
        lessonTitle: 'Bài tập cuối chương VI',
        fullName: 'Ôn tập chương VI. Hàm số mũ và hàm số lôgarit',
        isChapterReview: true,
        pageNumber: 26,
        summary:
          'Tổng hợp toàn bộ kiến thức Chương VI: rút gọn biểu thức luỹ thừa và lôgarit, khảo sát hàm số mũ - lôgarit, giải phương trình, bất phương trình và bài toán thực tiễn.',
        keyTopics: [
          'Biến đổi luỹ thừa, căn thức & lôgarit',
          'Đồ thị và tính đơn điệu của hàm số mũ & lôgarit',
          'Phương trình, bất phương trình mũ - lôgarit & ứng dụng thực tế',
        ],
        practiceExams: allLessonExamsByLessonId['on-tap-chuong-6'],
      },
    ],
  },
  {
    id: 'chuong-7',
    code: 'CHƯƠNG VII',
    title: 'QUAN HỆ VUÔNG GÓC TRONG KHÔNG GIAN',
    chapterNumber: 'CHƯƠNG VII',
    chapterTitle: 'QUAN HỆ VUÔNG GÓC TRONG KHÔNG GIAN',
    lessons: [
      {
        id: 'bai-22',
        chapterId: 'chuong-7',
        lessonNumber: 'Bài 22',
        lessonCode: 'Bài 22',
        lessonTitle: 'Hai đường thẳng vuông góc',
        fullName: 'Bài 22. Hai đường thẳng vuông góc',
        isChapterReview: false,
        pageNumber: 28,
        summary:
          'Góc giữa hai đường thẳng trong không gian (từ 0° đến 90°) và định nghĩa, tính chất của hai đường thẳng vuông góc trong không gian.',
        keyTopics: [
          'Góc giữa hai đường thẳng trong không gian',
          'Hai đường thẳng vuông góc (cắt nhau hoặc chéo nhau)',
          'Chứng minh hai đường thẳng vuông góc trong hình chóp, hình lập phương',
        ],
        practiceExams: allLessonExamsByLessonId['bai-22'],
      },
      {
        id: 'bai-23',
        chapterId: 'chuong-7',
        lessonNumber: 'Bài 23',
        lessonCode: 'Bài 23',
        lessonTitle: 'Đường thẳng vuông góc với mặt phẳng',
        fullName: 'Bài 23. Đường thẳng vuông góc với mặt phẳng',
        isChapterReview: false,
        pageNumber: 32,
        summary:
          'Định nghĩa, điều kiện để đường thẳng vuông góc với mặt phẳng, tính chất và liên hệ giữa quan hệ song song với quan hệ vuông góc.',
        keyTopics: [
          'Định nghĩa & định lí đường thẳng vuông góc mặt phẳng',
          'Chứng minh đường thẳng vuông góc với mặt phẳng và suy ra hai đường thẳng vuông góc',
          'Liên hệ giữa quan hệ song song và quan hệ vuông góc của đường thẳng và mặt phẳng',
        ],
        practiceExams: allLessonExamsByLessonId['bai-23'],
      },
      {
        id: 'bai-24',
        chapterId: 'chuong-7',
        lessonNumber: 'Bài 24',
        lessonCode: 'Bài 24',
        lessonTitle: 'Phép chiếu vuông góc. Góc giữa đường thẳng và mặt phẳng',
        fullName: 'Bài 24. Phép chiếu vuông góc. Góc giữa đường thẳng và mặt phẳng',
        isChapterReview: false,
        pageNumber: 38,
        summary:
          'Phép chiếu vuông góc, định lí ba đường vuông góc và cách xác định, tính góc giữa đường thẳng và mặt phẳng.',
        keyTopics: [
          'Phép chiếu vuông góc & hình chiếu của một hình trên mặt phẳng',
          'Định lí ba đường vuông góc',
          'Xác định và tính góc giữa đường thẳng và mặt phẳng (0° <= phi <= 90°)',
        ],
        practiceExams: allLessonExamsByLessonId['bai-24'],
      },
      {
        id: 'bai-25',
        chapterId: 'chuong-7',
        lessonNumber: 'Bài 25',
        lessonCode: 'Bài 25',
        lessonTitle: 'Hai mặt phẳng vuông góc',
        fullName: 'Bài 25. Hai mặt phẳng vuông góc',
        isChapterReview: false,
        pageNumber: 42,
        summary:
          'Góc giữa hai mặt phẳng, góc nhị diện, điều kiện và tính chất của hai mặt phẳng vuông góc; hình lăng trụ đứng, lăng trụ đều, hình hộp đứng, hình hộp chữ nhật, hình lập phương và hình chóp đều, hình chóp cụt đều.',
        keyTopics: [
          'Góc giữa hai mặt phẳng & góc phẳng nhị diện [P, d, Q]',
          'Điều kiện & các định lí tính chất của hai mặt phẳng vuông góc',
          'Hình lăng trụ đứng, hình hộp chữ nhật, hình lập phương, hình chóp đều & chóp cụt đều',
        ],
        practiceExams: allLessonExamsByLessonId['bai-25'],
      },
      {
        id: 'bai-26',
        chapterId: 'chuong-7',
        lessonNumber: 'Bài 26',
        lessonCode: 'Bài 26',
        lessonTitle: 'Khoảng cách',
        fullName: 'Bài 26. Khoảng cách',
        isChapterReview: false,
        pageNumber: 50,
        summary:
          'Khoảng cách từ một điểm đến một đường thẳng, đến một mặt phẳng; khoảng cách giữa đường thẳng và mặt phẳng song song, giữa hai mặt phẳng song song; đường vuông góc chung và khoảng cách giữa hai đường thẳng chéo nhau.',
        keyTopics: [
          'Khoảng cách từ một điểm đến một mặt phẳng (dựng đoạn vuông góc & đổi đỉnh)',
          'Khoảng cách giữa đường thẳng và mặt phẳng song song, hai mặt phẳng song song',
          'Đường vuông góc chung & khoảng cách giữa hai đường thẳng chéo nhau',
        ],
        practiceExams: allLessonExamsByLessonId['bai-26'],
      },
      {
        id: 'bai-27',
        chapterId: 'chuong-7',
        lessonNumber: 'Bài 27',
        lessonCode: 'Bài 27',
        lessonTitle: 'Thể tích',
        fullName: 'Bài 27. Thể tích',
        isChapterReview: false,
        pageNumber: 56,
        summary:
          'Công thức tính thể tích khối chóp, khối chóp cụt đều, khối lăng trụ, khối hộp chữ nhật và khối lập phương.',
        keyTopics: [
          'Thể tích khối chóp V = (1/3)S.h',
          'Thể tích khối lăng trụ V = S.h, khối hộp chữ nhật & khối lập phương',
          'Thể tích khối chóp cụt đều & tỉ số thể tích',
        ],
        practiceExams: allLessonExamsByLessonId['bai-27'],
      },
      {
        id: 'on-tap-chuong-7',
        chapterId: 'chuong-7',
        lessonNumber: 'Ôn tập chương VII',
        lessonCode: 'Ôn tập chương VII',
        lessonTitle: 'Bài tập cuối chương VII',
        fullName: 'Ôn tập chương VII. Quan hệ vuông góc trong không gian',
        isChapterReview: true,
        pageNumber: 61,
        summary:
          'Hệ thống hóa toàn bộ kiến thức hình học không gian Chương VII: chứng minh vuông góc, xác định góc, tính khoảng cách và thể tích khối đa diện.',
        keyTopics: [
          'Chứng minh đường thẳng vuông góc mặt phẳng & hai mặt phẳng vuông góc',
          'Tính góc giữa đường thẳng và mặt phẳng, góc nhị diện',
          'Tính khoảng cách và thể tích khối chóp, khối lăng trụ, chóp cụt đều',
        ],
        practiceExams: allLessonExamsByLessonId['on-tap-chuong-7'],
      },
    ],
  },
  {
    id: 'chuong-8',
    code: 'CHƯƠNG VIII',
    title: 'CÁC QUY TẮC TÍNH XÁC SUẤT',
    chapterNumber: 'CHƯƠNG VIII',
    chapterTitle: 'CÁC QUY TẮC TÍNH XÁC SUẤT',
    lessons: [
      {
        id: 'bai-28',
        chapterId: 'chuong-8',
        lessonNumber: 'Bài 28',
        lessonCode: 'Bài 28',
        lessonTitle: 'Biến cố hợp, biến cố giao, biến cố độc lập',
        fullName: 'Bài 28. Biến cố hợp, biến cố giao, biến cố độc lập',
        isChapterReview: false,
        pageNumber: 66,
        summary:
          'Khái niệm và cách biểu diễn biến cố hợp A U B, biến cố giao AB, hai biến cố xung khắc và hai biến cố độc lập.',
        keyTopics: [
          'Biến cố hợp A U B và biến cố giao AB',
          'Hai biến cố xung khắc & phân biệt với biến cố đối',
          'Khái niệm và nhận biết hai biến cố độc lập',
        ],
        practiceExams: allLessonExamsByLessonId['bai-28'],
      },
      {
        id: 'bai-29',
        chapterId: 'chuong-8',
        lessonNumber: 'Bài 29',
        lessonCode: 'Bài 29',
        lessonTitle: 'Công thức cộng xác suất',
        fullName: 'Bài 29. Công thức cộng xác suất',
        isChapterReview: false,
        pageNumber: 71,
        summary:
          'Công thức cộng xác suất cho hai biến cố xung khắc P(A U B) = P(A) + P(B) và công thức cộng xác suất tổng quát P(A U B) = P(A) + P(B) - P(AB).',
        keyTopics: [
          'Công thức cộng xác suất cho hai biến cố xung khắc',
          'Công thức cộng xác suất cho hai biến cố bất kì P(A U B) = P(A) + P(B) - P(AB)',
          'Ứng dụng sơ đồ Venn giải bài toán thống kê & xác suất thực tế',
        ],
        practiceExams: allLessonExamsByLessonId['bai-29'],
      },
      {
        id: 'bai-30',
        chapterId: 'chuong-8',
        lessonNumber: 'Bài 30',
        lessonCode: 'Bài 30',
        lessonTitle: 'Công thức nhân xác suất cho hai biến cố độc lập',
        fullName: 'Bài 30. Công thức nhân xác suất cho hai biến cố độc lập',
        isChapterReview: false,
        pageNumber: 75,
        summary:
          'Công thức nhân xác suất P(AB) = P(A).P(B) cho hai biến cố độc lập, kiểm tra tính độc lập của hai biến cố và kết hợp biến cố đối.',
        keyTopics: [
          'Công thức nhân xác suất cho hai biến cố độc lập P(AB) = P(A)P(B)',
          'Kiểm tra tính độc lập của hai biến cố bằng đẳng thức xác suất',
          'Kết hợp biến cố đối P(A U B) = 1 - P(A_ngang).P(B_ngang)',
        ],
        practiceExams: allLessonExamsByLessonId['bai-30'],
      },
      {
        id: 'on-tap-chuong-8',
        chapterId: 'chuong-8',
        lessonNumber: 'Ôn tập chương VIII',
        lessonCode: 'Ôn tập chương VIII',
        lessonTitle: 'Bài tập cuối chương VIII',
        fullName: 'Ôn tập chương VIII. Các quy tắc tính xác suất',
        isChapterReview: true,
        pageNumber: 78,
        summary:
          'Tổng hợp các bài toán xác suất vận dụng phối hợp biến cố hợp, biến cố giao, biến cố đối, công thức cộng xác suất và công thức nhân xác suất cho các biến cố độc lập.',
        keyTopics: [
          'Phối hợp công thức cộng và công thức nhân xác suất',
          'Bài toán hệ thống hoạt động độc lập (nối tiếp, song song), bắn bia, y học & thực tiễn',
        ],
        practiceExams: allLessonExamsByLessonId['on-tap-chuong-8'],
      },
    ],
  },
  {
    id: 'chuong-9',
    code: 'CHƯƠNG IX',
    title: 'ĐẠO HÀM',
    chapterNumber: 'CHƯƠNG IX',
    chapterTitle: 'ĐẠO HÀM',
    lessons: [
      {
        id: 'bai-31',
        chapterId: 'chuong-9',
        lessonNumber: 'Bài 31',
        lessonCode: 'Bài 31',
        lessonTitle: 'Định nghĩa và ý nghĩa của đạo hàm',
        fullName: 'Bài 31. Định nghĩa và ý nghĩa của đạo hàm',
        isChapterReview: false,
        pageNumber: 81,
        summary:
          'Định nghĩa đạo hàm tại một điểm bằng giới hạn, ý nghĩa hình học (hệ số góc và phương trình tiếp tuyến của đồ thị hàm số) và ý nghĩa vật lí (vận tốc tức thời, cường độ dòng điện tức thời).',
        keyTopics: [
          'Định nghĩa đạo hàm tại một điểm bằng giới hạn tỉ số số gia',
          'Ý nghĩa hình học: Hệ số góc k = f\'(x_0) & phương trình tiếp tuyến',
          'Ý nghĩa vật lí: Vận tốc tức thời v(t) = s\'(t) & cường độ dòng điện i(t) = q\'(t)',
        ],
        practiceExams: allLessonExamsByLessonId['bai-31'],
      },
      {
        id: 'bai-32',
        chapterId: 'chuong-9',
        lessonNumber: 'Bài 32',
        lessonCode: 'Bài 32',
        lessonTitle: 'Các quy tắc tính đạo hàm',
        fullName: 'Bài 32. Các quy tắc tính đạo hàm',
        isChapterReview: false,
        pageNumber: 87,
        summary:
          'Bảng đạo hàm của các hàm số sơ cấp cơ bản (luỹ thừa, căn bậc hai, lượng giác, mũ, lôgarit), đạo hàm của tổng, hiệu, tích, thương và quy tắc tính đạo hàm của hàm số hợp.',
        keyTopics: [
          'Đạo hàm của hàm luỹ thừa, căn thức, lượng giác, mũ và lôgarit',
          'Quy tắc tính đạo hàm của tổng, hiệu, tích, thương',
          'Đạo hàm của hàm số hợp y\'_x = y\'_u . u\'_x',
        ],
        practiceExams: allLessonExamsByLessonId['bai-32'],
      },
      {
        id: 'bai-33',
        chapterId: 'chuong-9',
        lessonNumber: 'Bài 33',
        lessonCode: 'Bài 33',
        lessonTitle: 'Đạo hàm cấp hai',
        fullName: 'Bài 33. Đạo hàm cấp hai',
        isChapterReview: false,
        pageNumber: 95,
        summary:
          'Khái niệm và cách tính đạo hàm cấp hai f\'\'(x) của hàm số; ý nghĩa cơ học của đạo hàm cấp hai là gia tốc tức thời a(t) = s\'\'(t) của chuyển động.',
        keyTopics: [
          'Định nghĩa và quy tắc tính đạo hàm cấp hai y\'\' = (y\')\'',
          'Hệ thức vi phân cấp hai của hàm lượng giác, hàm mũ',
          'Ý nghĩa cơ học: Gia tốc tức thời a(t) = v\'(t) = s\'\'(t)',
        ],
        practiceExams: allLessonExamsByLessonId['bai-33'],
      },
      {
        id: 'on-tap-chuong-9',
        chapterId: 'chuong-9',
        lessonNumber: 'Ôn tập chương IX',
        lessonCode: 'Ôn tập chương IX',
        lessonTitle: 'Bài tập cuối chương IX',
        fullName: 'Ôn tập chương IX. Đạo hàm',
        isChapterReview: true,
        pageNumber: 97,
        summary:
          'Tổng hợp toàn bộ kiến thức Chương IX: quy tắc tính đạo hàm cấp một và cấp hai, viết phương trình tiếp tuyến của đồ thị hàm số và giải quyết các bài toán vận tốc, gia tốc thực tế.',
        keyTopics: [
          'Tổng hợp đạo hàm hàm sơ cấp và hàm hợp',
          'Phương trình tiếp tuyến tại một điểm, biết hệ số góc, song song hoặc vuông góc đường thẳng',
          'Bài toán chuyển động (quãng đường, vận tốc, gia tốc) & ứng dụng thực tiễn',
        ],
        practiceExams: allLessonExamsByLessonId['on-tap-chuong-9'],
      },
    ],
  },
];

export const allLessonPracticeExams: ExamSet[] = textbookChapters.flatMap((ch) =>
  ch.lessons.flatMap((l) => l.practiceExams)
);

export function getAllAvailableExamsWithLessons(baseExams: ExamSet[] = examSets): ExamSet[] {
  return [...baseExams, ...allLessonPracticeExams];
}
