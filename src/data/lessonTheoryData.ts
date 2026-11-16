import {
  FormulaCard,
  LessonTheoryContent,
  TheorySubsection,
  tap1LessonTheory,
} from './theory/tap1Theory';
import { tap2LessonTheory } from './theory/tap2Theory';

export type { FormulaCard, LessonTheoryContent, TheorySubsection };

export interface TheoryChapterGroup {
  id: string;
  chapterCode: string;
  title: string;
  volume: 1 | 2;
  lessons: LessonTheoryContent[];
}

export const allLessonTheory: LessonTheoryContent[] = [
  ...tap1LessonTheory,
  ...tap2LessonTheory,
];

const CHAPTER_METADATA: Array<{
  id: string;
  chapterCode: string;
  title: string;
  volume: 1 | 2;
}> = [
  {
    id: 'chuong-1',
    chapterCode: 'CHƯƠNG I',
    title: 'HÀM SỐ LƯỢNG GIÁC VÀ PHƯƠNG TRÌNH LƯỢNG GIÁC',
    volume: 1,
  },
  {
    id: 'chuong-2',
    chapterCode: 'CHƯƠNG II',
    title: 'DÃY SỐ. CẤP SỐ CỘNG VÀ CẤP SỐ NHÂN',
    volume: 1,
  },
  {
    id: 'chuong-3',
    chapterCode: 'CHƯƠNG III',
    title: 'CÁC SỐ ĐẶC TRƯNG ĐO XU THẾ TRUNG TÂM CỦA MẪU SỐ LIỆU GHÉP NHÓM',
    volume: 1,
  },
  {
    id: 'chuong-4',
    chapterCode: 'CHƯƠNG IV',
    title: 'QUAN HỆ SONG SONG TRONG KHÔNG GIAN',
    volume: 1,
  },
  {
    id: 'chuong-5',
    chapterCode: 'CHƯƠNG V',
    title: 'GIỚI HẠN. HÀM SỐ LIÊN TỤC',
    volume: 1,
  },
  {
    id: 'chuong-6',
    chapterCode: 'CHƯƠNG VI',
    title: 'HÀM SỐ MŨ VÀ HÀM SỐ LÔGARIT',
    volume: 2,
  },
  {
    id: 'chuong-7',
    chapterCode: 'CHƯƠNG VII',
    title: 'QUAN HỆ VUÔNG GÓC TRONG KHÔNG GIAN',
    volume: 2,
  },
  {
    id: 'chuong-8',
    chapterCode: 'CHƯƠNG VIII',
    title: 'CÁC QUY TẮC TÍNH XÁC SUẤT',
    volume: 2,
  },
  {
    id: 'chuong-9',
    chapterCode: 'CHƯƠNG IX',
    title: 'ĐẠO HÀM',
    volume: 2,
  },
];

export const theoryChapters: TheoryChapterGroup[] = CHAPTER_METADATA.map((meta) => ({
  ...meta,
  lessons: allLessonTheory.filter((lesson) => lesson.chapterId === meta.id),
}));
