import React, { useState } from 'react';
import { StepOrderingQuestion, SolutionStep } from '../types/exam';
import { MathRenderer } from './MathRenderer';
import { TikzFigure } from './TikzFigure';
import {
  ArrowUp,
  ArrowDown,
  Shuffle,
  CheckCircle2,
  Sparkles,
  Layers,
  Bookmark,
} from 'lucide-react';
import {
  playAnswerFeedbackSound,
  playBookmarkSound,
  playClickSound,
} from '../utils/audio';

interface Part4StepOrderingProps {
  questions: StepOrderingQuestion[];
  answers: Record<string, string[]>;
  onOrderChange: (questionId: string, newOrderedStepIds: string[]) => void;
  isSubmitted: boolean;
  examMode: 'exam' | 'practice';
  bookmarkedQuestions: Set<string>;
  onToggleBookmark: (qId: string) => void;
  fontSize: 'normal' | 'large' | 'xlarge';
  totalQuestions?: number;
}

// Helper làm sạch tiêu đề bước: xoá tiền tố 'Bước 1, 2, 3...:' hoặc 'BƯỚC 1, 2...:'
const cleanRoleDescription = (desc?: string) => {
  if (!desc) return '';
  return desc.replace(/^(?:Bước|BƯỚC|Dòng|Ý)\s*\d+[\:\.]?\s*/i, '').trim();
};

export const Part4StepOrdering: React.FC<Part4StepOrderingProps> = React.memo(({
  questions,
  answers,
  onOrderChange,
  isSubmitted,
  examMode,
  bookmarkedQuestions,
  onToggleBookmark,
  fontSize,
  totalQuestions = 22,
}) => {
  const [activePreviewQ, setActivePreviewQ] = useState<string | null>(null);
  const [checkedStatus, setCheckedStatus] = useState<Record<string, boolean>>({});
  // Hỗ trợ chạm 2 bước bất kỳ để đổi chỗ tức thì trên điện thoại (1-tap swap)
  const [selectedSwapStep, setSelectedSwapStep] = useState<Record<string, number | null>>({});

  // Cỡ chữ lớn hơn, rõ nét trên mọi điện thoại
  const promptTextSizeClass =
    fontSize === 'xlarge'
      ? 'text-[22px] sm:text-3xl md:text-3xl'
      : fontSize === 'large'
      ? 'text-[20px] sm:text-2xl md:text-2xl'
      : 'text-[18px] sm:text-xl md:text-xl';

  const stepTextSizeClass =
    fontSize === 'xlarge'
      ? 'text-[19px] sm:text-xl'
      : fontSize === 'large'
      ? 'text-[18px] sm:text-lg'
      : 'text-[16px] sm:text-base';

  // Move step up or down
  const moveStep = (qId: string, index: number, direction: 'up' | 'down') => {
    if (isSubmitted) return;
    playClickSound();
    const currentOrder = answers[qId] || [];
    if (currentOrder.length === 0) return;

    const newOrder = [...currentOrder];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;

    if (targetIndex < 0 || targetIndex >= newOrder.length) return;

    // Swap
    const temp = newOrder[index];
    newOrder[index] = newOrder[targetIndex];
    newOrder[targetIndex] = temp;

    onOrderChange(qId, newOrder);
    setSelectedSwapStep((prev) => ({ ...prev, [qId]: null }));
  };

  // Chạm trực tiếp vào 2 bước để hoán đổi vị trí cực nhanh trên điện thoại
  const handleTapStepSwap = (qId: string, tappedIndex: number) => {
    if (isSubmitted) return;
    playClickSound();
    const currentOrder = answers[qId] || [];
    if (currentOrder.length === 0) return;

    const firstIdx = selectedSwapStep[qId];
    if (firstIdx === undefined || firstIdx === null) {
      setSelectedSwapStep((prev) => ({ ...prev, [qId]: tappedIndex }));
      return;
    }

    if (firstIdx === tappedIndex) {
      setSelectedSwapStep((prev) => ({ ...prev, [qId]: null }));
      return;
    }

    const newOrder = [...currentOrder];
    const temp = newOrder[firstIdx];
    newOrder[firstIdx] = newOrder[tappedIndex];
    newOrder[tappedIndex] = temp;
    onOrderChange(qId, newOrder);
    setSelectedSwapStep((prev) => ({ ...prev, [qId]: null }));
  };

  // Shuffle steps for a question
  const handleShuffle = (q: StepOrderingQuestion) => {
    if (isSubmitted) return;
    playClickSound();
    const shuffled = [...q.steps.map((s) => s.id)].sort(() => Math.random() - 0.5);
    onOrderChange(q.id, shuffled);
    setSelectedSwapStep((prev) => ({ ...prev, [q.id]: null }));
  };

  // Kiểm tra thứ tự các bước và phát âm thanh Đúng/Sai
  const handleCheckOrder = (q: StepOrderingQuestion) => {
    const orderedIds = answers[q.id] || q.steps.map((s) => s.id);
    const stepMap = new Map<string, SolutionStep>();
    q.steps.forEach((s) => stepMap.set(s.id, s));

    let correctPositions = 0;
    orderedIds.forEach((id, currentIdx) => {
      const stepObj = stepMap.get(id);
      if (stepObj && stepObj.originalIndex === currentIdx + 1) {
        correctPositions++;
      }
    });

    const isFullyCorrect = correctPositions === q.steps.length;
    setCheckedStatus((prev) => ({ ...prev, [q.id]: isFullyCorrect }));
    playAnswerFeedbackSound(isFullyCorrect);
  };

  return (
    <div className="space-y-5 sm:space-y-6">
      {questions.map((q, idx) => {
        const orderedIds = answers[q.id] || q.steps.map((s) => s.id);
        const hasChecked = checkedStatus[q.id] !== undefined;
        const showSolution = isSubmitted || examMode === 'practice' || hasChecked;

        // Map steps
        const stepMap = new Map<string, SolutionStep>();
        q.steps.forEach((s) => stepMap.set(s.id, s));

        // Count correct positions
        let correctPositions = 0;
        orderedIds.forEach((id, currentIdx) => {
          const stepObj = stepMap.get(id);
          if (stepObj && stepObj.originalIndex === currentIdx + 1) {
            correctPositions++;
          }
        });
        const isFullyCorrect = correctPositions === q.steps.length;

        return (
          <div key={q.id} id={`q-part4-${idx}`} className="space-y-3 transition-all scroll-mt-20">
            {/* Top Question Card (Màu xanh đậm, chữ trắng to nổi bật) */}
            <div className="rounded-2xl border border-sky-900/60 bg-[#071126] p-3.5 sm:p-6 md:p-7 shadow-2xl">
              {/* Header with Pills */}
              <div className="flex items-center justify-between gap-2 pb-2.5 sm:pb-3 border-b border-sky-950/80 flex-wrap">
                <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                  <div className="flex items-center gap-1.5 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full border-2 border-amber-400 bg-amber-500/15 text-amber-300 font-extrabold text-xs sm:text-base tracking-tight shadow-md">
                    <span>
                      Câu {q.number} / {totalQuestions}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-full border-2 border-cyan-400 bg-cyan-500/15 text-cyan-300 font-extrabold text-[11px] sm:text-sm uppercase tracking-wide shadow-md">
                    <span>PHẦN IV: Tự luận sắp xếp bước</span>
                  </div>

                  {showSolution && (
                    <span
                      className={`text-xs font-bold px-2.5 py-1 rounded-full border ${
                        isFullyCorrect
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400'
                          : 'bg-amber-500/20 text-amber-300 border-amber-400'
                      }`}
                    >
                      Đúng {correctPositions}/{q.steps.length} vị trí
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => {
                    playBookmarkSound();
                    onToggleBookmark(q.id);
                  }}
                  className={`min-w-[36px] min-h-[36px] px-2.5 py-1 rounded-xl border text-xs font-bold flex items-center gap-1 transition-colors duration-100 shrink-0 active:scale-95 ${
                    bookmarkedQuestions.has(q.id)
                      ? 'bg-amber-400/20 border-amber-400 text-amber-300'
                      : 'bg-[#0b1739] border-sky-800/70 text-sky-300 hover:text-white'
                  }`}
                  title="Đánh dấu xem lại câu này"
                >
                  <Bookmark
                    className={`w-3.5 h-3.5 ${
                      bookmarkedQuestions.has(q.id) ? 'fill-amber-300 text-amber-300' : ''
                    }`}
                  />
                  <span className="hidden sm:inline">
                    {bookmarkedQuestions.has(q.id) ? 'Đã đánh dấu' : 'Đánh dấu'}
                  </span>
                </button>
              </div>

              {/* Problem Statement (Chữ trắng to rõ nổi bật, font Times New Roman) */}
              <div
                className={`py-3.5 sm:py-5 text-white font-bold font-times leading-relaxed tracking-wide ${promptTextSizeClass} [&_.katex]:text-white [&_.katex]:font-semibold [&_.katex]:text-[1.1em]`}
              >
                <div className="text-sky-300/90 text-sm font-semibold mb-1">
                  Bài toán:
                </div>
                <MathRenderer content={q.problemStatement} />
              </div>

              {/* Hình vẽ chuẩn TikZ nếu có */}
              {(q.tikzType || q.tikzCode) && (
                <TikzFigure
                  type={q.tikzType as any}
                  tikzCode={q.tikzCode}
                  caption={`Hình vẽ minh hoạ Câu ${q.number}`}
                />
              )}

              {/* Conclusion Target (Mục tiêu kết luận) */}
              <div className="mt-3.5 p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-800/50 flex items-start gap-2.5 text-cyan-200">
                <Sparkles className="w-4 h-4 text-cyan-300 shrink-0 mt-0.5" />
                <div className="text-sm sm:text-base font-medium font-times">
                  <span className="font-bold text-cyan-300">Mục tiêu kết luận: </span>
                  <MathRenderer content={q.conclusionTarget} />
                </div>
              </div>
            </div>

            {/* Steps Container (Khung chứa các bước ghép) */}
            <div className="rounded-2xl border border-sky-900/60 bg-[#071026] p-3 sm:p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between gap-2.5 flex-wrap pb-2 border-b border-sky-950/80">
                <div className="text-xs sm:text-sm font-bold text-sky-300 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>
                    Chạm 2 bước để đổi chỗ nhanh hoặc bấm nút ↑ / ↓:
                  </span>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  {!isSubmitted && (
                    <button
                      type="button"
                      onClick={() => handleShuffle(q)}
                      className="min-h-[38px] px-3 py-1.5 rounded-xl border border-sky-800/80 bg-sky-950/80 hover:bg-sky-900/80 text-sky-300 hover:text-white text-xs font-bold flex items-center gap-1 transition-all"
                      title="Xáo trộn lại các vị trí"
                    >
                      <Shuffle className="w-3.5 h-3.5" />
                      <span>Xáo trộn</span>
                    </button>
                  )}

                  {!isSubmitted && (
                    <button
                      type="button"
                      onClick={() => handleCheckOrder(q)}
                      className="min-h-[38px] flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-extrabold text-xs sm:text-sm transition-all shadow-md active:scale-95"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Kiểm tra thứ tự</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() =>
                      setActivePreviewQ(activePreviewQ === q.id ? null : q.id)
                    }
                    className="min-h-[38px] text-xs font-bold px-3 py-1.5 rounded-xl bg-sky-950 hover:bg-sky-900 text-cyan-300 border border-sky-800/80 transition-all"
                  >
                    {activePreviewQ === q.id ? 'Ẩn bản xem' : 'Xem chuỗi bài giải'}
                  </button>
                </div>
              </div>

              {/* Step Items List */}
              <div className="space-y-3">
                {orderedIds.map((stepId, index) => {
                  const step = stepMap.get(stepId);
                  if (!step) return null;

                  const isAtCorrectPosition = step.originalIndex === index + 1;
                  const isSelectedForSwap = selectedSwapStep[q.id] === index;

                  return (
                    <div
                      key={step.id}
                      onClick={() => handleTapStepSwap(q.id, index)}
                      className={`flex items-start gap-2.5 sm:gap-4 p-3 sm:p-4 rounded-2xl border transition-colors duration-100 select-none ${
                        !isSubmitted ? 'cursor-pointer' : ''
                      } ${
                        showSolution
                          ? isAtCorrectPosition
                            ? 'bg-emerald-950/40 border-2 border-emerald-400 ring-1 ring-emerald-500/30'
                            : 'bg-amber-950/40 border-2 border-amber-400 ring-1 ring-amber-500/30'
                          : isSelectedForSwap
                          ? 'bg-[#122b66] border-2 border-amber-400 ring-2 ring-amber-400/50 shadow-lg'
                          : 'bg-[#0b1739] border-sky-800/60 hover:border-sky-400 shadow-md'
                      }`}
                    >
                      {/* Step Number Badge */}
                      <div className="flex flex-col items-center gap-1 shrink-0 pt-0.5">
                        <span
                          className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full font-black font-times text-sm sm:text-base flex items-center justify-center shadow-md ${
                            isSelectedForSwap
                              ? 'bg-cyan-400 text-[#040817] ring-2 ring-white'
                              : 'bg-[#f59e0b] text-[#0f172a]'
                          }`}
                        >
                          {index + 1}
                        </span>
                      </div>

                      {/* Step Content */}
                      <div className="flex-1 min-w-0 break-words py-0.5 space-y-1">
                        {isSelectedForSwap && !isSubmitted && (
                          <div className="inline-block px-2 py-0.5 rounded bg-amber-400/20 border border-amber-400/50 text-[11px] font-bold text-amber-300">
                            Đang chọn bước {index + 1} — Chạm vào bước khác để đổi vị trí
                          </div>
                        )}
                        {cleanRoleDescription(step.roleDescription) && (
                          <div className="text-xs font-bold text-cyan-300 uppercase tracking-wider">
                            {cleanRoleDescription(step.roleDescription)}
                          </div>
                        )}
                        <div
                          className={`text-white font-bold font-times leading-relaxed [&_.katex]:text-white [&_.katex]:text-[1.08em] ${stepTextSizeClass}`}
                        >
                          <MathRenderer content={step.content} />
                        </div>
                        {showSolution && !isAtCorrectPosition && (
                          <div className="text-xs font-bold text-amber-300 mt-1">
                            (Vị trí đúng: {step.originalIndex})
                          </div>
                        )}
                      </div>

                      {/* Reordering Buttons: >= 44x44px hitbox for mobile thumbs */}
                      {!isSubmitted && (
                        <div
                          className="flex flex-col gap-1.5 shrink-0"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            type="button"
                            onClick={() => moveStep(q.id, index, 'up')}
                            disabled={index === 0}
                            className={`w-11 h-11 flex items-center justify-center rounded-xl border transition-colors duration-100 ${
                              index === 0
                                ? 'text-sky-900 border-sky-950 bg-sky-950/40 cursor-not-allowed opacity-30'
                                : 'text-sky-200 border-sky-700 bg-sky-950 hover:bg-cyan-500/20 hover:text-cyan-200 hover:border-cyan-400 active:scale-95'
                            }`}
                            title="Di chuyển bước này lên"
                          >
                            <ArrowUp className="w-5 h-5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => moveStep(q.id, index, 'down')}
                            disabled={index === orderedIds.length - 1}
                            className={`w-11 h-11 flex items-center justify-center rounded-xl border transition-colors duration-100 ${
                              index === orderedIds.length - 1
                                ? 'text-sky-900 border-sky-950 bg-sky-950/40 cursor-not-allowed opacity-30'
                                : 'text-sky-200 border-sky-700 bg-sky-950 hover:bg-cyan-500/20 hover:text-cyan-200 hover:border-cyan-400 active:scale-95'
                            }`}
                            title="Di chuyển bước này xuống"
                          >
                            <ArrowDown className="w-5 h-5" />
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Preview */}
              {activePreviewQ === q.id && (
                <div className="mt-4 p-4 rounded-xl bg-[#050c1c] border border-sky-800 text-white space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-cyan-300">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      Chuỗi bài giải liên tục:
                    </span>
                    <button
                      type="button"
                      onClick={() => setActivePreviewQ(null)}
                      className="text-xs text-sky-400 hover:text-white"
                    >
                      Đóng
                    </button>
                  </div>
                  <div className="space-y-2 text-sm leading-relaxed font-times text-slate-100">
                    {orderedIds.map((stepId, idx2) => {
                      const step = stepMap.get(stepId);
                      if (!step) return null;
                      return (
                        <div key={step.id} className="flex items-start gap-2">
                          <span className="font-bold text-amber-300 shrink-0">
                            {idx2 + 1}.
                          </span>
                          <div className="flex-1 [&_.katex]:text-white">
                            <MathRenderer content={step.content} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Explanation on solution */}
              {showSolution && (
                <div className="mt-4 pt-4 border-t border-sky-900/60 space-y-2">
                  <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-200 text-sm space-y-2">
                    <div className="font-bold text-emerald-300 flex items-center gap-2 text-base">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      <span>Thứ tự các bước chuẩn xác:</span>
                    </div>
                    <div className="space-y-2 pt-1 font-times text-slate-200">
                      {q.steps
                        .slice()
                        .sort((a, b) => a.originalIndex - b.originalIndex)
                        .map((step) => (
                          <div key={step.id} className="flex items-start gap-2.5">
                            <span className="w-6 h-6 rounded-full bg-emerald-500 text-white font-mono text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
                              {step.originalIndex}
                            </span>
                            <div className="flex-1 [&_.katex]:text-emerald-200">
                              {cleanRoleDescription(step.roleDescription) && (
                                <span className="font-semibold text-emerald-300">
                                  [{cleanRoleDescription(step.roleDescription)}]:{' '}
                                </span>
                              )}
                              <MathRenderer content={step.content} />
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
});
