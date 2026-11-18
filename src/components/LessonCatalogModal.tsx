import React, { useState, useMemo, useEffect } from 'react';
import {
  BookOpen,
  ChevronRight,
  FileText,
  CheckCircle2,
  Play,
  Sparkles,
  X,
  Layers,
  GraduationCap,
  Bookmark,
  AlertCircle,
  Calculator,
} from 'lucide-react';
import { TextbookChapter, TextbookLesson } from '../data/lessonExams';
import { allLessonTheory, LessonTheoryContent } from '../data/lessonTheoryData';
import { MathRenderer } from './MathRenderer';
import { TikzFigure } from './TikzFigure';

interface LessonCatalogModalProps {
  isOpen: boolean;
  onClose: () => void;
  chapters: TextbookChapter[];
  currentExamId: string;
  onSelectPracticeExam: (examId: string) => void;
  examScoresByExamId?: Record<string, number>;
}

export const LessonCatalogModal: React.FC<LessonCatalogModalProps> = React.memo(({
  isOpen,
  onClose,
  chapters,
  currentExamId,
  onSelectPracticeExam,
  examScoresByExamId = {},
}) => {
  // Chỉ lấy 33 bài học chính khoá theo SGK (không lấy bài ôn tập cuối chương)
  const cleanChapters = useMemo(
    () =>
      chapters.map((ch) => ({
        ...ch,
        lessons: ch.lessons.filter((l) => !l.isChapterReview),
      })),
    [chapters]
  );

  const [selectedChapterId, setSelectedChapterId] = useState<string>(
    cleanChapters[0]?.id || 'chuong-1'
  );
  const [selectedLessonId, setSelectedLessonId] = useState<string>(
    cleanChapters[0]?.lessons[0]?.id || 'bai-1'
  );
  const [activeTab, setActiveTab] = useState<'theory' | 'exams'>('theory');

  // Tự động đồng bộ tới Chương & Bài Học đang làm khi mở mục Bài Học
  useEffect(() => {
    if (!isOpen) return;
    for (const ch of cleanChapters) {
      for (const lesson of ch.lessons) {
        if (lesson.practiceExams.some((ex) => ex.id === currentExamId)) {
          setSelectedChapterId(ch.id);
          setSelectedLessonId(lesson.id);
          return;
        }
      }
    }
  }, [isOpen, currentExamId, cleanChapters]);

  if (!isOpen) return null;

  const activeChapter =
    cleanChapters.find((c) => c.id === selectedChapterId) || cleanChapters[0];
  const activeLesson: TextbookLesson | undefined =
    activeChapter?.lessons.find((l) => l.id === selectedLessonId) ||
    activeChapter?.lessons[0];

  const activeLessonTheory: LessonTheoryContent | undefined = allLessonTheory.find(
    (t) => t.lessonId === activeLesson?.id
  );

  const handleChapterChange = (chapter: TextbookChapter) => {
    setSelectedChapterId(chapter.id);
    if (chapter.lessons.length > 0) {
      setSelectedLessonId(chapter.lessons[0].id);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-1.5 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-150 pt-safe pb-safe">
      <div className="relative w-full max-w-6xl h-[94vh] h-[94dvh] flex flex-col rounded-2xl border border-teal-500/30 bg-[#0d1f38] text-slate-100 shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-3.5 sm:px-6 py-2.5 sm:py-3.5 border-b border-slate-800/80 bg-[#0a1628] shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-teal-400 to-emerald-600 flex items-center justify-center text-slate-950 shadow-md shrink-0">
              <BookOpen className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-sm sm:text-lg font-bold text-white tracking-tight truncate">
                  Bài Học SGK Toán 11 (Lý Thuyết &amp; 2 Đề Ôn)
                </h2>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider rounded-md bg-teal-500/15 text-teal-300 border border-teal-500/30">
                  Kết Nối Tri Thức Với Cuộc Sống
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-400 truncate mt-0.5">
                Mỗi bài học gồm Mục Lý thuyết &amp; Công thức chuẩn SGK và 2 Đề ôn tập (22 câu/đề)
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="min-w-[40px] min-h-[40px] p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors duration-100 shrink-0 cursor-pointer flex items-center justify-center active:scale-95"
            title="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chapter Horizontal Tabs */}
        <div className="px-2.5 sm:px-6 py-2 bg-[#091526] border-b border-slate-800/80 overflow-x-auto no-scrollbar shrink-0">
          <div className="flex items-center gap-1.5 min-w-max">
            {cleanChapters.map((chapter) => {
              const isSelected = chapter.id === activeChapter?.id;
              return (
                <button
                  key={chapter.id}
                  type="button"
                  onClick={() => handleChapterChange(chapter)}
                  className={`min-h-[38px] flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors duration-100 cursor-pointer active:scale-95 ${
                    isSelected
                      ? 'bg-teal-500 text-slate-950 shadow-sm shadow-teal-500/20'
                      : 'bg-slate-900/90 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5 shrink-0" />
                  <span>{chapter.code}</span>
                  <span
                    className={`px-1.5 py-0.2 rounded text-[10px] ${
                      isSelected
                        ? 'bg-slate-950/20 text-slate-950'
                        : 'bg-slate-800 text-teal-400'
                    }`}
                  >
                    {chapter.lessons.length} bài
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Mobile Quick Lesson Horizontal Selector (chỉ hiện trên điện thoại để tiết kiệm tối đa diện tích đọc Lý thuyết) */}
        <div className="md:hidden px-2.5 py-2 bg-[#0b192e] border-b border-slate-800/80 overflow-x-auto no-scrollbar shrink-0">
          <div className="flex items-center gap-1.5 min-w-max">
            {activeChapter?.lessons.map((lesson) => {
              const isSelected = lesson.id === activeLesson?.id;
              return (
                <button
                  key={lesson.id}
                  type="button"
                  onClick={() => setSelectedLessonId(lesson.id)}
                  className={`min-h-[38px] px-3 py-1.5 rounded-xl text-xs font-bold transition-colors duration-100 flex items-center gap-1.5 active:scale-95 ${
                    isSelected
                      ? 'bg-amber-400 text-slate-950 shadow-sm font-black'
                      : 'bg-slate-900 text-slate-200 border border-slate-800'
                  }`}
                >
                  <span>{lesson.lessonNumber}</span>
                  <span className="max-w-[140px] truncate font-medium opacity-90">
                    {lesson.fullName.replace(/^Bài \d+\.\s*/, '')}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Chapter Banner (Desktop) */}
        {activeChapter && (
          <div className="hidden sm:flex px-4 sm:px-6 py-2 bg-gradient-to-r from-teal-950/50 via-slate-900/60 to-slate-900/60 border-b border-slate-800/60 items-center justify-between gap-2 shrink-0">
            <div className="flex items-center gap-2 min-w-0">
              <GraduationCap className="w-4 h-4 text-teal-400 shrink-0" />
              <span className="text-xs sm:text-sm font-bold text-teal-300 truncate">
                {activeChapter.code}: {activeChapter.title}
              </span>
            </div>
            <span className="text-[11px] text-slate-400 shrink-0">
              Chọn bài học để xem Lý thuyết hoặc làm 2 Đề ôn
            </span>
          </div>
        )}

        {/* Main Content Grid: Left = Lesson List on Desktop (md:col-span-4), Right = Inside Selected Lesson (Mục Lý thuyết & 2 Đề ôn) */}
        <div className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-12 md:divide-x divide-slate-800/80 overflow-hidden">
          {/* Left Column: Danh mục Bài học trong Chương (Desktop/Tablet) */}
          <div className="hidden md:block md:col-span-4 p-3 sm:p-4 bg-[#0b192e]/60 overflow-y-auto space-y-2">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-2 pb-1 flex items-center justify-between">
              <span>Danh sách bài học ({activeChapter?.lessons.length || 0} bài)</span>
              <span>Trang SGK</span>
            </div>

            {activeChapter?.lessons.map((lesson) => {
              const isSelected = lesson.id === activeLesson?.id;
              const isCurrentExam = lesson.practiceExams.some(
                (ex) => ex.id === currentExamId
              );

              return (
                <button
                  key={lesson.id}
                  type="button"
                  onClick={() => setSelectedLessonId(lesson.id)}
                  className={`w-full text-left p-3 rounded-xl border transition-colors duration-100 flex items-start justify-between gap-2 cursor-pointer ${
                    isSelected
                      ? 'bg-teal-500/15 border-teal-400/60 text-white shadow-sm'
                      : 'bg-slate-900/60 border-slate-800/80 text-slate-300 hover:bg-slate-800/60 hover:border-slate-700'
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 flex-wrap mb-1">
                      <span
                        className={`px-2 py-0.5 text-[11px] font-bold rounded-md ${
                          isSelected
                            ? 'bg-teal-500 text-slate-950'
                            : 'bg-slate-800 text-teal-400'
                        }`}
                      >
                        {lesson.lessonNumber}
                      </span>
                      <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-slate-800/90 text-amber-300 border border-amber-500/20">
                        Lý thuyết • 2 Đề ôn
                      </span>
                      {isCurrentExam && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/30">
                          <CheckCircle2 className="w-3 h-3" /> Đang mở
                        </span>
                      )}
                    </div>
                    <p
                      className={`text-xs sm:text-sm font-semibold leading-snug ${
                        isSelected ? 'text-white' : 'text-slate-200'
                      }`}
                    >
                      {lesson.fullName}
                    </p>
                  </div>

                  <div className="flex flex-col items-end shrink-0 gap-1.5">
                    <span className="text-[11px] text-slate-400 font-mono">
                      tr.{lesson.pageNumber}
                    </span>
                    <ChevronRight
                      className={`w-4 h-4 transition-transform ${
                        isSelected ? 'text-teal-400 translate-x-0.5' : 'text-slate-600'
                      }`}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Bên trong mỗi bài học -> 2 mục: [1. Lý thuyết] và [2. 2 Đề ôn] */}
          <div className="md:col-span-8 bg-[#0d1f38] flex flex-col min-h-0 overflow-hidden">
            {activeLesson ? (
              <>
                {/* Sticky Lesson Header + 2 Sub-tabs (Mục Lý thuyết | 2 Đề ôn) + 1-Tap Quick Exam Launch */}
                <div className="px-3.5 sm:px-6 py-2.5 sm:py-3.5 bg-[#0a182d] border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 shrink-0">
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap mb-0.5">
                      <span className="px-2 py-0.5 rounded-md text-[10px] sm:text-[11px] font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30">
                        {activeChapter?.code}
                      </span>
                      <span className="px-2 py-0.5 rounded-md text-[10px] sm:text-[11px] font-bold bg-slate-800 text-slate-300">
                        SGK Trang {activeLesson.pageNumber}
                      </span>
                    </div>
                    <h3 className="text-sm sm:text-lg font-extrabold text-white leading-snug truncate">
                      {activeLesson.fullName}
                    </h3>
                  </div>

                  {/* 2 Mục bên trong mỗi bài học: Mục Lý thuyết & 2 Đề ôn + Nút mở nhanh Đề 1, Đề 2 bằng 1 chạm */}
                  <div className="flex items-center gap-1.5 flex-wrap shrink-0">
                    <div className="flex items-center gap-1 bg-slate-950/90 p-1 rounded-xl border border-slate-800">
                      <button
                        type="button"
                        onClick={() => setActiveTab('theory')}
                        className={`min-h-[36px] flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-extrabold transition-colors duration-100 cursor-pointer active:scale-95 ${
                          activeTab === 'theory'
                            ? 'bg-amber-400 text-slate-950 shadow-sm'
                            : 'text-slate-300 hover:text-white hover:bg-slate-900'
                        }`}
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Lý Thuyết</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveTab('exams')}
                        className={`min-h-[36px] flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-extrabold transition-colors duration-100 cursor-pointer active:scale-95 ${
                          activeTab === 'exams'
                            ? 'bg-teal-400 text-slate-950 shadow-sm'
                            : 'text-slate-300 hover:text-white hover:bg-slate-900'
                        }`}
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>2 Đề Ôn</span>
                      </button>
                    </div>

                    {/* 1-tap quick launch Đề 01 / Đề 02 */}
                    {activeLesson.practiceExams.map((ex, idx) => {
                      const isThisActive = ex.id === currentExamId;
                      const bestScore = examScoresByExamId[ex.id];
                      return (
                        <button
                          key={ex.id}
                          type="button"
                          onClick={() => onSelectPracticeExam(ex.id)}
                          className={`min-h-[36px] px-2.5 py-1.5 rounded-xl border text-xs font-extrabold flex items-center gap-1 transition-colors duration-100 cursor-pointer active:scale-95 ${
                            isThisActive
                              ? 'bg-emerald-500 text-slate-950 border-emerald-300 shadow-sm'
                              : 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border-emerald-500/40'
                          }`}
                          title={`Làm ngay ${ex.title}`}
                        >
                          <Play className="w-3 h-3 fill-current" />
                          <span>
                            Đề 0{idx + 1}
                            {typeof bestScore === 'number' ? ` (${bestScore}đ)` : ''}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Scrollable Body of the Selected Lesson */}
                <div className="flex-1 overflow-y-auto p-3.5 sm:p-6 space-y-5">
                  {activeTab === 'theory' && activeLessonTheory ? (
                    <div className="space-y-5">
                      {/* Khái niệm & Yêu cầu cần đạt */}
                      <div className="rounded-2xl border border-teal-500/30 bg-gradient-to-br from-slate-900 via-teal-950/25 to-slate-900 p-4 sm:p-5 space-y-3.5">
                        <div>
                          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300 mb-2">
                            <Bookmark className="w-3.5 h-3.5" />
                            <span>KHÁI NIỆM &amp; THUẬT NGỮ TRỌNG TÂM:</span>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {activeLessonTheory.keyTerms.map((term, idx) => (
                              <span
                                key={idx}
                                className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-950/80 text-slate-200 border border-slate-700/80"
                              >
                                <MathRenderer content={term} />
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="pt-3 border-t border-slate-800/70">
                          <div className="flex items-center gap-1.5 text-xs font-bold text-teal-300 mb-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>YÊU CẦU CẦN ĐẠT TRONG BÀI HỌC:</span>
                          </div>
                          <ul className="space-y-1 text-xs sm:text-sm text-slate-300">
                            {activeLessonTheory.objectives.map((obj, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="text-teal-400 font-bold mt-0.5">•</span>
                                <MathRenderer content={obj} className="text-slate-300" />
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Hình vẽ minh hoạ chuẩn TikZ (nếu có) */}
                      {activeLessonTheory.tikzCode && (
                        <div className="rounded-2xl border border-teal-500/25 bg-slate-950/70 p-4 sm:p-5">
                          <div className="text-xs font-bold uppercase tracking-wider text-teal-300 mb-3 flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-amber-400" />
                            <span>Hình Vẽ Minh Hoạ Kiến Thức Bài Học (Chuẩn TikZ)</span>
                          </div>
                          <div className="max-w-lg mx-auto">
                            <TikzFigure
                              type="custom"
                              tikzCode={activeLessonTheory.tikzCode}
                            />
                          </div>
                          {activeLessonTheory.tikzCaption && (
                            <p className="text-center text-xs sm:text-sm text-slate-300 mt-2.5 italic">
                              <MathRenderer content={activeLessonTheory.tikzCaption} />
                            </p>
                          )}
                        </div>
                      )}

                      {/* Phần I: Lý thuyết trọng tâm */}
                      <section className="space-y-3.5">
                        <div className="flex items-center gap-2 pb-1.5 border-b border-teal-500/30">
                          <FileText className="w-4 h-4 text-teal-300" />
                          <h4 className="text-sm sm:text-base font-extrabold text-white uppercase tracking-wide">
                            I. Lý Thuyết Trọng Tâm ({activeLessonTheory.lessonNumber})
                          </h4>
                        </div>

                        {activeLessonTheory.theorySections.map((section, secIdx) => (
                          <div
                            key={secIdx}
                            className="rounded-2xl border border-slate-800 bg-slate-950/65 p-4 sm:p-5 space-y-3"
                          >
                            <h5 className="text-sm sm:text-base font-bold text-teal-300 border-b border-slate-800/80 pb-2">
                              <MathRenderer content={section.title} />
                            </h5>

                            <ul className="space-y-2 text-xs sm:text-sm text-slate-100">
                              {section.points.map((point, ptIdx) => (
                                <li
                                  key={ptIdx}
                                  className="flex items-start gap-2.5 leading-relaxed"
                                >
                                  <span className="w-5 h-5 rounded-md bg-teal-500/15 border border-teal-500/30 text-teal-300 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                                    {ptIdx + 1}
                                  </span>
                                  <div className="flex-1 min-w-0">
                                    <MathRenderer
                                      content={point}
                                      className="text-slate-100"
                                    />
                                  </div>
                                </li>
                              ))}
                            </ul>

                            {section.note && (
                              <div className="mt-2.5 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-2">
                                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                                <div className="text-xs sm:text-sm text-amber-100/95 leading-relaxed">
                                  <span className="font-bold text-amber-300 mr-1">
                                    Chú ý / Nhận xét SGK:
                                  </span>
                                  <MathRenderer content={section.note} />
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </section>

                      {/* Phần II: Công thức cần nhớ */}
                      <section className="space-y-3.5">
                        <div className="flex items-center gap-2 pb-1.5 border-b border-amber-500/30">
                          <Calculator className="w-4 h-4 text-amber-300" />
                          <h4 className="text-sm sm:text-base font-extrabold text-white uppercase tracking-wide">
                            II. Công Thức &amp; Định Lí Cần Nhớ ({activeLessonTheory.lessonNumber})
                          </h4>
                        </div>

                        <div className="grid grid-cols-1 gap-3.5">
                          {activeLessonTheory.formulas.map((formula, fIdx) => {
                            const cleanLatex = formula.latex
                              .trim()
                              .replace(/^\$+/, '')
                              .replace(/\$+$/, '');
                            return (
                              <div
                                key={fIdx}
                                className="rounded-2xl border border-amber-500/30 bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950/15 p-4 shadow-md"
                              >
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="px-2 py-0.5 rounded-md bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[11px] font-extrabold">
                                    Công thức {fIdx + 1}
                                  </span>
                                  <h5 className="text-xs sm:text-sm font-bold text-amber-200">
                                    <MathRenderer content={formula.name} />
                                  </h5>
                                </div>

                                <div className="my-2 px-3.5 py-2.5 rounded-xl bg-slate-950/90 border border-slate-800 text-white overflow-x-auto">
                                  <MathRenderer content={`$$${cleanLatex}$$`} />
                                </div>

                                {formula.description && (
                                  <p className="text-xs text-slate-300 mt-2 flex items-start gap-1.5">
                                    <span className="text-teal-400 font-bold">•</span>
                                    <MathRenderer content={formula.description} />
                                  </p>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </section>

                      {/* Nút chuyển nhanh sang 2 Đề ôn của bài học */}
                      <div className="p-4 rounded-2xl bg-teal-950/40 border border-teal-500/40 flex flex-col sm:flex-row items-center justify-between gap-3">
                        <div className="text-xs sm:text-sm text-teal-200 font-semibold">
                          Đã nắm vững lý thuyết {activeLesson.lessonNumber}? Luyện tập ngay với 2 đề ôn chuẩn cấu trúc:
                        </div>
                        <div className="flex items-center gap-2 w-full sm:w-auto">
                          {activeLesson.practiceExams.map((ex, idx) => (
                            <button
                              key={ex.id}
                              type="button"
                              onClick={() => onSelectPracticeExam(ex.id)}
                              className="flex-1 sm:flex-initial min-h-[42px] px-4 py-2 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-1.5 shrink-0 cursor-pointer transition-colors duration-100 active:scale-95"
                            >
                              <Play className="w-3.5 h-3.5 fill-current" />
                              <span>Làm Đề 0{idx + 1}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Tab 2: 2 Đề Ôn (22 câu / đề) */
                    <div className="space-y-4">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-amber-400" />
                          <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-300">
                            Danh mục 2 Đề Ôn Tập • {activeLesson.fullName}
                          </h4>
                        </div>
                      </div>

                      {activeLesson.practiceExams.map((practiceExam, examIdx) => {
                        const isThisExamActive = practiceExam.id === currentExamId;
                        return (
                          <div
                            key={practiceExam.id}
                            className={`rounded-2xl border p-4 sm:p-5 shadow-lg transition-colors ${
                              isThisExamActive
                                ? 'border-emerald-400/70 bg-gradient-to-br from-emerald-950/50 via-slate-900/90 to-slate-900'
                                : 'border-teal-500/40 bg-gradient-to-br from-teal-950/40 via-slate-900/90 to-slate-900'
                            }`}
                          >
                            <div className="flex items-start justify-between gap-3 mb-3">
                              <div className="flex items-center gap-3">
                                <div className="w-11 h-11 rounded-xl bg-teal-500/20 border border-teal-400/40 flex items-center justify-center text-teal-300 font-bold text-sm shrink-0">
                                  0{examIdx + 1}
                                </div>
                                <div>
                                  <div className="flex items-center gap-2 flex-wrap mb-0.5">
                                    <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-teal-400">
                                      Đề Ôn Số 0{examIdx + 1} • Chuẩn Cấu Trúc (22 Câu)
                                    </span>
                                    {isThisExamActive && (
                                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded-md border border-emerald-500/40">
                                        <CheckCircle2 className="w-3 h-3" /> Đang chọn
                                      </span>
                                    )}
                                  </div>
                                  <h5 className="text-sm sm:text-base font-bold text-white">
                                    {practiceExam.title}
                                  </h5>
                                </div>
                              </div>
                            </div>

                            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                              {practiceExam.description}
                            </p>

                            {/* 4-part Breakdown badges */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                              <div className="p-2 rounded-xl bg-slate-950/70 border border-slate-800/80 text-center">
                                <div className="text-[11px] text-slate-400">Phần I</div>
                                <div className="text-xs sm:text-sm font-bold text-teal-300 mt-0.5">
                                  {practiceExam.part1.length} câu TN
                                </div>
                              </div>
                              <div className="p-2 rounded-xl bg-slate-950/70 border border-slate-800/80 text-center">
                                <div className="text-[11px] text-slate-400">Phần II</div>
                                <div className="text-xs sm:text-sm font-bold text-teal-300 mt-0.5">
                                  {practiceExam.part2.length} câu Đúng/Sai
                                </div>
                              </div>
                              <div className="p-2 rounded-xl bg-slate-950/70 border border-slate-800/80 text-center">
                                <div className="text-[11px] text-slate-400">Phần III</div>
                                <div className="text-xs sm:text-sm font-bold text-teal-300 mt-0.5">
                                  {practiceExam.part3.length} câu TL ngắn
                                </div>
                              </div>
                              <div className="p-2 rounded-xl bg-slate-950/70 border border-slate-800/80 text-center">
                                <div className="text-[11px] text-slate-400">Phần IV</div>
                                <div className="text-xs sm:text-sm font-bold text-teal-300 mt-0.5">
                                  {practiceExam.part4?.length || 4} câu Tự luận
                                </div>
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={() => onSelectPracticeExam(practiceExam.id)}
                              className="w-full min-h-[46px] py-2.5 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 shadow-md shadow-teal-950/50 flex items-center justify-center gap-2 transition-colors duration-100 cursor-pointer active:scale-[0.99]"
                            >
                              <Play className="w-4 h-4 fill-current" />
                              <span>Làm {practiceExam.title} (22 Câu Hỏi)</span>
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
});
