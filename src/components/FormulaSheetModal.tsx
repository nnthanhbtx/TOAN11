import React, { useMemo, useState } from 'react';
import {
  X,
  BookOpen,
  Sparkles,
  CheckCircle2,
  Bookmark,
  ChevronRight,
  ChevronLeft,
  AlertCircle,
  FileText,
  Calculator,
} from 'lucide-react';
import {
  allLessonTheory,
  theoryChapters,
  LessonTheoryContent,
} from '../data/lessonTheoryData';
import { MathRenderer } from './MathRenderer';
import { TikzFigure } from './TikzFigure';

interface FormulaSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLessonExam?: (examId: string) => void;
}

export const FormulaSheetModal: React.FC<FormulaSheetModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedLessonId, setSelectedLessonId] = useState<string>('bai-1');
  const [viewMode, setViewMode] = useState<'all' | 'theory' | 'formulas'>('all');

  const currentLesson: LessonTheoryContent = useMemo(() => {
    return (
      allLessonTheory.find((l) => l.lessonId === selectedLessonId) ||
      allLessonTheory[0]
    );
  }, [selectedLessonId]);

  const currentChapter = useMemo(() => {
    return (
      theoryChapters.find((c) => c.id === currentLesson.chapterId) ||
      theoryChapters[0]
    );
  }, [currentLesson]);

  const currentIndex = useMemo(() => {
    return allLessonTheory.findIndex((l) => l.lessonId === currentLesson.lessonId);
  }, [currentLesson]);

  const prevLesson = currentIndex > 0 ? allLessonTheory[currentIndex - 1] : null;
  const nextLesson =
    currentIndex >= 0 && currentIndex < allLessonTheory.length - 1
      ? allLessonTheory[currentIndex + 1]
      : null;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-teal-500/30 rounded-2xl w-full max-w-6xl h-[94vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Top Header */}
        <div className="px-4 sm:px-6 py-3.5 border-b border-teal-500/20 flex flex-wrap items-center justify-between gap-3 bg-gradient-to-r from-teal-950/80 via-slate-900 to-amber-950/30 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/40 flex items-center justify-center text-amber-300 shadow-inner shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-base sm:text-xl font-bold text-white tracking-tight truncate">
                  Lý Thuyết &amp; Công Thức Toán 11
                </h2>
                <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                  <Sparkles className="w-3 h-3" />
                  Chuẩn 100% SGK Kết Nối Tri Thức
                </span>
              </div>
              <p className="text-xs text-slate-400 truncate">
                9 Chương • 33 Bài học chính khoá (Bài 1 – Bài 33) • Đầy đủ định nghĩa, định lí, tính chất &amp; công thức cần nhớ
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            {/* Content Section Filter */}
            <div className="flex items-center gap-1 bg-slate-950/80 p-1 rounded-xl border border-slate-800">
              <button
                type="button"
                onClick={() => setViewMode('all')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  viewMode === 'all'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Đầy đủ
              </button>
              <button
                type="button"
                onClick={() => setViewMode('theory')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  viewMode === 'theory'
                    ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Lý thuyết
              </button>
              <button
                type="button"
                onClick={() => setViewMode('formulas')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  viewMode === 'formulas'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Công thức
              </button>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800/80 rounded-xl transition-colors cursor-pointer shrink-0"
              aria-label="Đóng"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Single Minimal Navigation Bar: Chapters I - IX & Lessons of Active Chapter */}
        <div className="px-4 sm:px-6 py-2.5 bg-slate-950/75 border-b border-slate-800/80 space-y-2 shrink-0">
          {/* Chapter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
            {theoryChapters.map((ch) => {
              const isSelectedChapter = ch.id === currentChapter?.id;
              return (
                <button
                  key={ch.id}
                  type="button"
                  onClick={() => {
                    if (ch.lessons.length > 0) {
                      setSelectedLessonId(ch.lessons[0].lessonId);
                    }
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    isSelectedChapter
                      ? 'bg-teal-500 text-slate-950 shadow-xs'
                      : 'bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  {ch.chapterCode} (Tập {ch.volume})
                </button>
              );
            })}
          </div>

          {/* Lessons in Selected Chapter */}
          {currentChapter && (
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-0.5">
              {currentChapter.lessons.map((lesson) => {
                const isSelected = lesson.lessonId === currentLesson.lessonId;
                return (
                  <button
                    key={lesson.lessonId}
                    type="button"
                    onClick={() => setSelectedLessonId(lesson.lessonId)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-amber-400 text-slate-950 shadow-xs'
                        : 'bg-slate-900/70 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800/80'
                    }`}
                  >
                    {lesson.fullName}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Main Content Panel (Full Width) */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6 bg-slate-900/40">
          {/* Lesson Header Banner */}
          <div className="rounded-2xl border border-teal-500/30 bg-gradient-to-br from-slate-900 via-teal-950/30 to-slate-900 p-4 sm:p-6 shadow-lg">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-2.5 py-1 rounded-lg text-xs font-extrabold uppercase bg-teal-500/20 text-teal-300 border border-teal-500/30">
                {currentChapter?.chapterCode} • SGK Toán 11 Tập {currentLesson.volume}
              </span>
              <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-800 text-slate-300 border border-slate-700">
                Trang {currentLesson.pageNumber} SGK
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              {currentLesson.fullName}
            </h3>
            {currentChapter && (
              <p className="text-xs sm:text-sm text-teal-300/90 font-medium mt-1">
                {currentChapter.chapterCode}: {currentChapter.title}
              </p>
            )}

            {/* Key Terms */}
            <div className="mt-4 pt-3.5 border-t border-slate-800/80">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300 mb-2">
                <Bookmark className="w-3.5 h-3.5" />
                <span>KHÁI NIỆM &amp; THUẬT NGỮ KIẾN THỨC TRỌNG TÂM:</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {currentLesson.keyTerms.map((term, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-950/80 text-slate-200 border border-slate-700/80"
                  >
                    <MathRenderer content={term} />
                  </span>
                ))}
              </div>
            </div>

            {/* Objectives */}
            <div className="mt-3.5 pt-3 border-t border-slate-800/60">
              <div className="flex items-center gap-1.5 text-xs font-bold text-teal-300 mb-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>YÊU CẦU CẦN ĐẠT TRONG BÀI HỌC:</span>
              </div>
              <ul className="space-y-1 text-xs sm:text-sm text-slate-300">
                {currentLesson.objectives.map((obj, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-teal-400 font-bold mt-0.5">•</span>
                    <MathRenderer content={obj} className="text-slate-300" />
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Optional TikZ Visual Illustration for the Lesson */}
          {currentLesson.tikzCode && (
            <div className="rounded-2xl border border-teal-500/25 bg-slate-950/70 p-4 sm:p-5">
              <div className="text-xs font-bold uppercase tracking-wider text-teal-300 mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Hình Vẽ Trực Quan Minh Hoạ Kiến Thức Bài Học (Chuẩn TikZ)</span>
              </div>
              <div className="max-w-xl mx-auto">
                <TikzFigure type="custom" tikzCode={currentLesson.tikzCode} />
              </div>
              {currentLesson.tikzCaption && (
                <p className="text-center text-xs sm:text-sm text-slate-300 mt-2.5 italic">
                  <MathRenderer content={currentLesson.tikzCaption} />
                </p>
              )}
            </div>
          )}

          {/* PART I: LÝ THUYẾT TRỌNG TÂM TRONG BÀI HỌC */}
          {(viewMode === 'all' || viewMode === 'theory') && (
            <section className="space-y-4">
              <div className="flex items-center gap-2.5 pb-2 border-b border-teal-500/30">
                <div className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-300">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-extrabold text-white uppercase tracking-wide">
                    I. Lý Thuyết Trọng Tâm Cần Nhớ ({currentLesson.lessonNumber})
                  </h4>
                  <p className="text-xs text-slate-400">
                    Định nghĩa, định lí, tính chất và nhận xét chính xác 100% từ SGK Toán 11 – Kết nối tri thức
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {currentLesson.theorySections.map((section, secIdx) => (
                  <div
                    key={secIdx}
                    className="rounded-2xl border border-slate-800 bg-slate-950/65 p-4 sm:p-5 shadow-md space-y-3"
                  >
                    <h5 className="text-sm sm:text-base font-bold text-teal-300 flex items-center gap-2 border-b border-slate-800/80 pb-2">
                      <MathRenderer content={section.title} />
                    </h5>

                    <ul className="space-y-2.5 text-sm sm:text-base text-slate-100">
                      {section.points.map((point, ptIdx) => (
                        <li key={ptIdx} className="flex items-start gap-2.5 leading-relaxed">
                          <span className="w-5 h-5 rounded-md bg-teal-500/15 border border-teal-500/30 text-teal-300 text-xs font-bold flex items-center justify-center shrink-0 mt-1">
                            {ptIdx + 1}
                          </span>
                          <div className="flex-1 min-w-0">
                            <MathRenderer content={point} className="text-slate-100" />
                          </div>
                        </li>
                      ))}
                    </ul>

                    {section.note && (
                      <div className="mt-3 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-2.5">
                        <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <div className="text-xs sm:text-sm text-amber-100/95 leading-relaxed">
                          <span className="font-bold text-amber-300 mr-1">Chú ý / Nhận xét SGK:</span>
                          <MathRenderer content={section.note} />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* PART II: BẢNG CÔNG THỨC CẦN NHỚ */}
          {(viewMode === 'all' || viewMode === 'formulas') && (
            <section className="space-y-4">
              <div className="flex items-center gap-2.5 pb-2 border-b border-amber-500/30">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300">
                  <Calculator className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-extrabold text-white uppercase tracking-wide">
                    II. Công Thức &amp; Định Lí Đóng Khung Cần Nhớ ({currentLesson.lessonNumber})
                  </h4>
                  <p className="text-xs text-slate-400">
                    Toàn bộ công thức toán học chuẩn LaTeX có trong {currentLesson.fullName}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {currentLesson.formulas.map((formula, fIdx) => {
                  const cleanLatex = formula.latex.trim().replace(/^\$+/, '').replace(/\$+$/, '');
                  return (
                    <div
                      key={fIdx}
                      className="rounded-2xl border border-amber-500/30 bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950/15 p-4 sm:p-5 shadow-md"
                    >
                      <div className="flex items-center gap-2 mb-2.5">
                        <span className="px-2 py-0.5 rounded-md bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-extrabold">
                          Công thức {fIdx + 1}
                        </span>
                        <h5 className="text-sm sm:text-base font-bold text-amber-200">
                          <MathRenderer content={formula.name} />
                        </h5>
                      </div>

                      <div className="my-2 px-4 py-3 rounded-xl bg-slate-950/90 border border-slate-800 text-white overflow-x-auto">
                        <MathRenderer content={`$$${cleanLatex}$$`} />
                      </div>

                      {formula.description && (
                        <p className="text-xs sm:text-sm text-slate-300 mt-2 flex items-start gap-1.5">
                          <span className="text-teal-400 font-bold">•</span>
                          <MathRenderer content={formula.description} />
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Bottom Prev / Next Lesson Navigation */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
            {prevLesson ? (
              <button
                type="button"
                onClick={() => setSelectedLessonId(prevLesson.lessonId)}
                className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs sm:text-sm font-bold transition-all cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4 text-teal-400" />
                <span className="truncate max-w-[200px] sm:max-w-xs">
                  {prevLesson.fullName}
                </span>
              </button>
            ) : (
              <div />
            )}

            {nextLesson ? (
              <button
                type="button"
                onClick={() => setSelectedLessonId(nextLesson.lessonId)}
                className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-teal-500/20 hover:bg-teal-500/30 text-teal-200 border border-teal-500/40 text-xs sm:text-sm font-bold transition-all cursor-pointer ml-auto"
              >
                <span className="truncate max-w-[200px] sm:max-w-xs">
                  {nextLesson.fullName}
                </span>
                <ChevronRight className="w-4 h-4 text-teal-300" />
              </button>
            ) : (
              <div />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};
