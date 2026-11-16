import React from 'react';
import {
  RotateCcw,
  Sparkles,
  FileText,
  Trophy,
  BookOpen,
  WifiOff,
  Smartphone,
} from 'lucide-react';
import { ExamSet } from '../types/exam';

interface HeaderProps {
  currentExam: ExamSet;
  allExams: ExamSet[];
  onSelectExam: (examId: string) => void;
  onDeleteExam?: (examId: string) => void;
  examMode: 'exam' | 'practice';
  onToggleExamMode: () => void;
  isStarted: boolean;
  onStartExam: () => void;
  isSubmitted: boolean;
  onSubmitExam: () => void;
  onResetExam: () => void;
  onOpenImportWord: () => void;
  onOpenLeaderboard: () => void;
  leaderboardCount: number;
  onOpenLessons?: () => void;
  fontSize?: 'normal' | 'large' | 'xlarge';
  onChangeFontSize?: (size: 'normal' | 'large' | 'xlarge') => void;
  isOnline?: boolean;
  onOpenPWAInfo?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentExam,
  allExams,
  onSelectExam,
  examMode,
  onToggleExamMode,
  isSubmitted,
  onResetExam,
  onOpenImportWord,
  onOpenLeaderboard,
  leaderboardCount,
  onOpenLessons,
  isOnline = true,
  onOpenPWAInfo,
}) => {
  const generalExams = allExams.filter(
    (ex) => /^de-0\d+$/.test(ex.id) || ex.id.startsWith('de-custom-')
  );
  const isCurrentLessonExam = !generalExams.some((ex) => ex.id === currentExam.id);

  return (
    <header className="sticky top-0 z-40 bg-[#070f24]/95 backdrop-blur-md border-b border-sky-950 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 py-2 sm:py-3 flex items-center justify-between gap-1.5 md:gap-4">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-cyan-600 to-indigo-600 flex items-center justify-center font-bold text-white shadow-md shadow-indigo-950/60 border border-cyan-400/30">
            <span className="font-mono text-xs sm:text-base font-black">∑11</span>
          </div>
          <div className="hidden min-[380px]:flex items-center gap-2">
            <span className="text-sm sm:text-lg font-bold tracking-tight text-white whitespace-nowrap">
              Toán 11
            </span>
          </div>
        </div>

        {/* Zone 2: Navigation & Quick Tools (Desktop) */}
        <nav className="hidden lg:flex items-center gap-2 text-xs font-medium text-slate-300 flex-wrap justify-center">
          {/* Mục Bài Học (Bên trong mỗi bài có Lý thuyết & 2 Đề Ôn 22 câu) */}
          {onOpenLessons && (
            <button
              onClick={onOpenLessons}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-500/20 text-teal-200 border border-teal-400/60 hover:bg-teal-500/30 hover:text-white transition-all whitespace-nowrap font-bold shadow-xs cursor-pointer"
              title="Mở danh mục Bài Học SGK Toán 11 (gồm Lý thuyết & 2 Đề ôn cho mỗi bài)"
            >
              <BookOpen className="w-3.5 h-3.5 text-teal-300" />
              <span>Bài Học</span>
            </button>
          )}

          {/* Chọn Đề Ôn Tổng Hợp */}
          <div className="flex items-center gap-1.5 bg-[#0b1739] px-3 py-1.5 rounded-xl border border-sky-800/60 shadow-xs">
            <span className="text-sky-300 font-medium">Đề:</span>
            {allExams.length > 0 ? (
              <select
                value={currentExam.id}
                onChange={(e) => onSelectExam(e.target.value)}
                className="bg-transparent text-white font-bold focus:outline-none cursor-pointer pr-1 max-w-[210px] truncate"
              >
                {isCurrentLessonExam && (
                  <option value={currentExam.id} className="bg-[#071126] text-teal-300">
                    {currentExam.title}
                  </option>
                )}
                {generalExams.map((ex) => (
                  <option key={ex.id} value={ex.id} className="bg-[#071126] text-white">
                    {ex.title}
                  </option>
                ))}
              </select>
            ) : (
              <span className="text-slate-400 italic">Trống</span>
            )}
          </div>

          {/* Tạo Đề Từ File Word / PDF */}
          <button
            onClick={onOpenImportWord}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/10 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/20 hover:text-white transition-all whitespace-nowrap font-bold cursor-pointer"
            title="Tạo đề bằng file Word (.docx) hoặc PDF (.pdf)"
          >
            <FileText className="w-3.5 h-3.5 text-cyan-400" />
            <span>Tạo Đề Word / PDF</span>
          </button>

          {/* Bảng Xếp Hạng */}
          <button
            onClick={onOpenLeaderboard}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/15 text-amber-300 border border-amber-400/50 hover:bg-amber-500/25 hover:text-white transition-all whitespace-nowrap font-bold shadow-xs cursor-pointer"
            title="Xem Bảng Xếp Hạng Thành Tích Học Sinh"
          >
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>Bảng Xếp Hạng</span>
            <span className="px-1.5 py-0.2 rounded-full bg-amber-400/25 text-amber-200 text-[10px] font-mono">
              {leaderboardCount}
            </span>
          </button>

          {/* Chế độ thi / Luyện tập */}
          <button
            onClick={onToggleExamMode}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all whitespace-nowrap font-bold cursor-pointer ${
              examMode === 'exam'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30'
                : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
            }`}
            title="Nhấp để đổi giữa chế độ thi tính giờ hoặc ôn tập có giải thích tức thì"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{examMode === 'exam' ? 'Chế độ Thi Tính Giờ' : 'Chế độ Luyện Tập'}</span>
          </button>

          {/* Cài App Điện Thoại & Chế Độ Offline Không Cần Wi-Fi */}
          {onOpenPWAInfo && (
            <button
              onClick={onOpenPWAInfo}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all whitespace-nowrap font-bold border cursor-pointer ${
                isOnline
                  ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/25'
                  : 'bg-amber-500/20 text-amber-200 border-amber-400/60 hover:bg-amber-500/30'
              }`}
              title="Cài đặt ứng dụng về điện thoại và kiểm tra chế độ làm bài không cần Wi-Fi"
            >
              {isOnline ? (
                <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <WifiOff className="w-3.5 h-3.5 text-amber-300" />
              )}
              <span>{isOnline ? 'Cài App / Offline' : 'Đang Offline'}</span>
            </button>
          )}
        </nav>

        {/* Zone 3: Primary Action & Mobile Controls */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {/* Quick tools on small screens */}
          <div className="flex lg:hidden items-center gap-1">
            {onOpenLessons && (
              <button
                onClick={onOpenLessons}
                className="min-h-[36px] px-2.5 py-1.5 flex items-center gap-1 rounded-xl bg-teal-500/20 border border-teal-400/60 text-teal-200 hover:bg-teal-500/30 text-xs font-bold"
                title="Mục Bài Học (Lý thuyết & 2 Đề Ôn)"
              >
                <BookOpen className="w-3.5 h-3.5 text-teal-300 shrink-0" />
                <span>Bài Học</span>
              </button>
            )}

            {allExams.length > 0 && (
              <div className="flex items-center gap-0.5 bg-[#0b1739] px-2 py-1.5 rounded-xl border border-sky-800/60 text-xs">
                <select
                  value={currentExam.id}
                  onChange={(e) => onSelectExam(e.target.value)}
                  className="bg-transparent text-white font-bold focus:outline-none cursor-pointer max-w-[125px] sm:max-w-[170px] truncate"
                  aria-label="Chọn đề ôn tập"
                >
                  {isCurrentLessonExam && (
                    <option value={currentExam.id} className="bg-[#071126] text-teal-300">
                      {currentExam.title}
                    </option>
                  )}
                  {generalExams.map((ex) => (
                    <option key={ex.id} value={ex.id} className="bg-[#071126] text-white">
                      {ex.title}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <button
              onClick={onOpenLeaderboard}
              className="min-w-[36px] min-h-[36px] flex items-center justify-center rounded-xl bg-amber-500/15 border border-amber-400/50 text-amber-300 hover:bg-amber-500/25"
              title="Bảng Xếp Hạng"
            >
              <Trophy className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenImportWord}
              className="min-w-[36px] min-h-[36px] flex items-center justify-center rounded-xl bg-[#0b1739] border border-sky-800/60 text-cyan-300 hover:bg-sky-900/60"
              title="Tạo đề từ Word / PDF"
            >
              <FileText className="w-4 h-4" />
            </button>

            {onOpenPWAInfo && (
              <button
                onClick={onOpenPWAInfo}
                className={`min-w-[36px] min-h-[36px] flex items-center justify-center rounded-xl border ${
                  isOnline
                    ? 'bg-emerald-950/70 border-emerald-700/60 text-emerald-300'
                    : 'bg-amber-950/80 border-amber-600/70 text-amber-300'
                }`}
                title={isOnline ? 'Cài App / Chế độ Offline không cần Wi-Fi' : 'Đang làm bài Offline không cần Wi-Fi'}
              >
                {isOnline ? <Smartphone className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
              </button>
            )}
          </div>

          {isSubmitted && (
            <button
              onClick={onResetExam}
              className="hidden lg:flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-white bg-[#0b1739] hover:bg-sky-900 border border-sky-800/80 rounded-xl transition-all whitespace-nowrap shadow-sm cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Làm Lại Đề</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
