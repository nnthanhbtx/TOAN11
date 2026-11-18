import React, { useEffect } from 'react';
import { PartScoreDetail, ExamViolation } from '../types/exam';
import confetti from 'canvas-confetti';
import {
  Award,
  Printer,
  RotateCcw,
  ArrowDownCircle,
  Star,
  Trophy,
  User,
  Clock,
  ShieldAlert,
  ShieldCheck,
} from 'lucide-react';
import { formatDuration } from './LeaderboardModal';

interface ResultReportProps {
  scoreDetail: PartScoreDetail;
  examTitle: string;
  part1Total?: number;
  part3Total?: number;
  part4Total?: number;
  studentName?: string;
  studentClass?: string;
  durationSeconds?: number;
  rankPosition?: number;
  totalRanked?: number;
  violations?: ExamViolation[];
  onOpenViolationLog?: () => void;
  onResetExam: () => void;
  onScrollToQuestions: () => void;
  onOpenLeaderboard?: () => void;
}

export const ResultReport: React.FC<ResultReportProps> = ({
  scoreDetail,
  examTitle,
  part1Total = 12,
  part3Total = 4,
  part4Total = 4,
  studentName,
  studentClass,
  durationSeconds,
  rankPosition,
  totalRanked,
  violations = [],
  onOpenViolationLog,
  onResetExam,
  onScrollToQuestions,
  onOpenLeaderboard,
}) => {
  useEffect(() => {
    if (scoreDetail.totalScore >= 7.0) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (e) {
        // Safe fallback
      }
    }
  }, [scoreDetail.totalScore]);

  // Sinh lời nhận xét chuẩn mực sư phạm sau khi học sinh hoàn thành bài thi
  const getTeacherFeedback = (score: number) => {
    if (score >= 9.0) {
      return {
        badge: 'Xuất sắc',
        title: 'Năng lực tư duy toán học xuất sắc, lập luận chặt chẽ và chính xác!',
        content:
          'Em nắm rất vững kiến thức trọng tâm của chương trình Toán 11 (GDPT 2018). Kỹ năng giải quyết vấn đề ở các câu hỏi trắc nghiệm khách quan và khả năng suy luận logic trong phần sắp xếp các bước giải tự luận đều đạt mức độ hoàn thiện cao. Thầy/Cô biểu dương tinh thần học tập nghiêm túc và sự cẩn trọng của em.',
        recommendation:
          'Định hướng bồi dưỡng: Tiếp tục rèn luyện các bài toán vận dụng cao về mô hình hóa thực tiễn (lãi kép, tối ưu hóa bằng đạo hàm) và các bài toán tính góc, khoảng cách trong hình học không gian để chuẩn bị tốt nhất cho các kỳ thi học sinh giỏi và kỳ thi đánh giá năng lực.',
      };
    } else if (score >= 8.0) {
      return {
        badge: 'Giỏi',
        title: 'Nền tảng kiến thức vững vàng, kỹ năng vận dụng và suy luận tốt!',
        content:
          'Em đã làm chủ được các mạch kiến thức cơ bản và vận dụng của chương trình Toán 11. Tuy nhiên, để đạt điểm tuyệt đối, em cần chú ý rà soát kỹ các điều kiện xác định của bài toán (chẳng hạn như điều kiện có nghĩa của biểu thức lượng giác, điều kiện cơ số và biểu thức dưới dấu lôgarit, hoặc điều kiện nghiệm nguyên dương của chỉ số dãy số).',
        recommendation:
          'Định hướng học tập: Rèn luyện thói quen kiểm tra điều kiện xác định và đối chiếu nghiệm trên miền cho trước trước khi đưa ra kết luận cuối cùng.',
      };
    } else if (score >= 6.5) {
      return {
        badge: 'Khá',
        title: 'Nắm được kiến thức cơ bản nhưng cần tăng cường tính chính xác ở các bước suy luận!',
        content:
          'Kết quả bài làm cho thấy em đã hiểu được các định nghĩa, công thức lượng giác, cấp số cộng, cấp số nhân và quy tắc tính đạo hàm. Tuy vậy, ở các câu hỏi Đúng/Sai và phần Tự luận sắp xếp bước giải, em còn đôi chỗ suy luận chưa thật chặt chẽ hoặc nhầm lẫn dấu trong quá trình biến đổi đại số.',
        recommendation:
          'Định hướng học tập: Ôn tập kỹ các công thức biến đổi lượng giác, phương pháp khử dạng vô định của giới hạn hàm số và các định lý về quan hệ song song, vuông góc trong không gian.',
      };
    } else if (score >= 5.0) {
      return {
        badge: 'Trung bình',
        title: 'Đạt yêu cầu cơ bản nhưng cần củng cố thêm kỹ năng thông hiểu và vận dụng!',
        content:
          'Em đã trả lời đúng các câu hỏi ở mức độ nhận biết công thức, nhưng vẫn còn lúng túng khi giải quyết các bài toán đòi hỏi biến đổi qua nhiều bước như giải phương trình lượng giác, mũ - lôgarit, viết phương trình tiếp tuyến và chứng minh hình học không gian.',
        recommendation:
          'Định hướng học tập: Em hãy xem lại chi tiết lời giải của từng câu chưa làm đúng trong bài thi này, ghi chép lại các công thức cốt lõi và luyện tập lại từng chuyên đề.',
      };
    } else {
      return {
        badge: 'Cần cố gắng',
        title: 'Cần hệ thống hóa lại kiến thức nền tảng chương trình Toán 11!',
        content:
          'Kết quả hiện tại cho thấy em chưa nắm vững một số kiến thức cơ bản của chương trình Toán 11. Em đừng nản lòng! Hãy bắt đầu ôn tập lại từ các định nghĩa, tính chất và công thức sách giáo khoa theo từng chủ đề nhỏ, kết hợp tự làm lại các ví dụ mẫu để xây dựng lại nền tảng vững chắc.',
        recommendation:
          'Định hướng học tập: Em nên chuyển sang "Chế độ Luyện Tập" để vừa làm bài vừa đối chiếu ngay với hướng dẫn giải chi tiết của giáo viên sau từng câu hỏi.',
      };
    }
  };

  const feedback = getTeacherFeedback(scoreDetail.totalScore);

  return (
    <div className="bg-[#071126] rounded-2xl border border-sky-900/60 shadow-2xl p-6 sm:p-8 space-y-8 animate-fadeIn text-white">
      {/* Banner Điểm Số */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-sky-950/80">
        <div className="space-y-3 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-400/40 text-cyan-300 text-xs font-bold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" />
            <span>Kết Quả Đánh Giá Năng Lực Toàn Diện</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            {examTitle.toLowerCase().startsWith('đề') ? examTitle : `Đề ${examTitle}`}
          </h2>

          {/* Thông tin Học sinh & Thứ hạng BXH */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 pt-0.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0b1739] border border-sky-800/80 text-xs">
              <User className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-sky-300">Họ và tên:</span>
              <span className="font-bold text-white">
                {studentName && studentName.trim() ? studentName.trim() : 'Học sinh Lớp 11'}
              </span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0b1739] border border-sky-800/80 text-xs">
              <span className="text-sky-300">Lớp:</span>
              <span className="font-bold text-amber-300">
                {studentClass && studentClass.trim() ? studentClass.trim() : '11A1'}
              </span>
            </div>

            {typeof durationSeconds === 'number' && durationSeconds > 0 && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0b1739] border border-sky-800/80 text-xs">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                <span className="text-sky-300">Thời gian làm:</span>
                <span className="font-mono font-bold text-white">
                  {formatDuration(durationSeconds)}
                </span>
              </div>
            )}

            {/* Trạng thái giám sát vi phạm quy chế thi */}
            <button
              type="button"
              onClick={onOpenViolationLog}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-colors ${
                violations.length > 0
                  ? 'bg-rose-500/20 hover:bg-rose-500/30 border-rose-400/60 text-rose-300'
                  : 'bg-emerald-500/15 hover:bg-emerald-500/25 border-emerald-400/50 text-emerald-300'
              }`}
            >
              {violations.length > 0 ? (
                <>
                  <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                  <span>Báo vi phạm: {violations.length} lần (Xem chi tiết)</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Giám sát quy chế: 0 vi phạm (Nghiêm túc)</span>
                </>
              )}
            </button>

            {rankPosition && (
              <button
                type="button"
                onClick={onOpenLeaderboard}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/50 text-xs text-amber-300 font-bold transition-colors"
              >
                <Trophy className="w-3.5 h-3.5 text-amber-400" />
                <span>
                  Hạng #{rankPosition}
                  {totalRanked ? ` / ${totalRanked}` : ''} trên Bảng Xếp Hạng
                </span>
              </button>
            )}
          </div>
        </div>

        {/* Điểm tổng Score Badge */}
        <div className="flex flex-col items-center justify-center p-5 rounded-2xl bg-gradient-to-br from-[#0c1a40] to-[#060e24] text-white min-w-[190px] border border-cyan-500/40 shadow-xl text-center">
          <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider">
            Tổng Điểm Bài Thi
          </span>
          <div className="text-4xl sm:text-5xl font-black font-mono tracking-tight my-1 text-white tabular-nums">
            {scoreDetail.totalScore}
            <span className="text-xl text-cyan-300 font-sans font-medium">/10</span>
          </div>
          <div className="inline-flex items-center gap-1 text-xs font-bold px-3 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span>Xếp loại: {scoreDetail.rank}</span>
          </div>
        </div>
      </div>

      {/* 4 Phần Chi Tiết Điểm Số */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Phần I */}
        <div className="p-4 rounded-2xl bg-[#0b1739] border border-sky-800/60 space-y-1.5 shadow-md">
          <div className="text-xs font-bold text-cyan-300">Phần I: Trắc nghiệm 4 lựa chọn</div>
          <div className="text-2xl font-black font-mono text-white tabular-nums">
            {scoreDetail.part1Score}
            <span className="text-sm text-sky-400 font-normal"> / {scoreDetail.part1Max}đ</span>
          </div>
          <div className="text-xs text-sky-300">
            Đúng {scoreDetail.part1CorrectCount}/{part1Total} câu (0.25đ/câu)
          </div>
        </div>

        {/* Phần II */}
        <div className="p-4 rounded-2xl bg-[#0b1739] border border-sky-800/60 space-y-1.5 shadow-md">
          <div className="text-xs font-bold text-cyan-300">Phần II: Đúng / Sai ({scoreDetail.part2Details.length} câu)</div>
          <div className="text-2xl font-black font-mono text-white tabular-nums">
            {scoreDetail.part2Score}
            <span className="text-sm text-sky-400 font-normal"> / {scoreDetail.part2Max}đ</span>
          </div>
          <div className="text-xs text-sky-300">
            Quy chế chấm thi THPT 2025
          </div>
        </div>

        {/* Phần III */}
        <div className="p-4 rounded-2xl bg-[#0b1739] border border-sky-800/60 space-y-1.5 shadow-md">
          <div className="text-xs font-bold text-cyan-300">Phần III: Trả lời ngắn ({part3Total} câu)</div>
          <div className="text-2xl font-black font-mono text-white tabular-nums">
            {scoreDetail.part3Score}
            <span className="text-sm text-sky-400 font-normal"> / {scoreDetail.part3Max}đ</span>
          </div>
          <div className="text-xs text-sky-300">
            Đúng {scoreDetail.part3CorrectCount}/{part3Total} câu (0.5đ/câu)
          </div>
        </div>

        {/* Phần IV */}
        <div className="p-4 rounded-2xl bg-[#0b1739] border border-sky-800/60 space-y-1.5 shadow-md">
          <div className="text-xs font-bold text-cyan-300">Phần IV: Tự luận ghép bước</div>
          <div className="text-2xl font-black font-mono text-white tabular-nums">
            {scoreDetail.part4Score}
            <span className="text-sm text-sky-400 font-normal"> / {scoreDetail.part4Max}đ</span>
          </div>
          <div className="text-xs text-sky-300">
            Sắp xếp logic {part4Total} bài tự luận
          </div>
        </div>
      </div>

      {/* Đánh Giá Năng Lực Toán Học */}
      <div className="p-5 rounded-2xl bg-[#09132c] border border-sky-900 space-y-4">
        <h3 className="text-sm font-bold text-cyan-300">
          Chỉ Số Đánh Giá Năng Lực Toán Học:
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-slate-300">Tái hiện & Nhận biết kiến thức</span>
              <span className="font-mono text-cyan-300">{scoreDetail.competencyAnalysis.knowledgeRecall}%</span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-sky-950 overflow-hidden border border-sky-900">
              <div
                className="h-full bg-cyan-500 rounded-full transition-all duration-500"
                style={{ width: `${scoreDetail.competencyAnalysis.knowledgeRecall}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-slate-300">Thông hiểu & Phân tích đúng/sai</span>
              <span className="font-mono text-sky-300">{scoreDetail.competencyAnalysis.understanding}%</span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-sky-950 overflow-hidden border border-sky-900">
              <div
                className="h-full bg-sky-500 rounded-full transition-all duration-500"
                style={{ width: `${scoreDetail.competencyAnalysis.understanding}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-slate-300">Vận dụng giải toán & Tính toán ngắn</span>
              <span className="font-mono text-emerald-300">{scoreDetail.competencyAnalysis.application}%</span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-sky-950 overflow-hidden border border-sky-900">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                style={{ width: `${scoreDetail.competencyAnalysis.application}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-slate-300">Suy luận logic & Trình bày tự luận</span>
              <span className="font-mono text-purple-300">{scoreDetail.competencyAnalysis.logicalReasoning}%</span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-sky-950 overflow-hidden border border-sky-900">
              <div
                className="h-full bg-purple-500 rounded-full transition-all duration-500"
                style={{ width: `${scoreDetail.competencyAnalysis.logicalReasoning}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Lời Nhận Xét Của Chuyên Gia */}
      <div className="p-5 sm:p-6 rounded-2xl bg-[#0b1739] border border-amber-500/30 space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-amber-500 text-[#071126] font-black text-xs flex items-center justify-center">
            ★
          </div>
          <div>
            <h3 className="text-sm font-bold text-amber-300">
              Nhận Xét Chuyên Môn Sư Phạm
            </h3>
            <span className="text-xs text-amber-200/80 font-medium">{feedback.title}</span>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed pt-1">
          {feedback.content}
        </p>
        <div className="p-3.5 rounded-xl bg-[#071126] border border-amber-500/20 text-xs text-amber-200 font-medium">
          <span className="font-bold text-amber-300">Khuyến nghị sư phạm: </span>
          {feedback.recommendation}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={onScrollToQuestions}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-[#071126] font-bold text-xs transition-colors shadow-md"
          >
            <ArrowDownCircle className="w-4 h-4" />
            <span>Xem Lại Chi Tiết Từng Câu Hỏi & Lời Giải</span>
          </button>
          {onOpenLeaderboard && (
            <button
              onClick={onOpenLeaderboard}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-bold text-xs border border-amber-400/50 transition-colors shadow-sm"
            >
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>Xem Bảng Xếp Hạng</span>
            </button>
          )}
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-[#0b1739] hover:bg-sky-900 text-sky-200 font-semibold text-xs border border-sky-800 transition-colors"
          >
            <Printer className="w-4 h-4 text-sky-400" />
            <span>In Phiếu Kết Quả</span>
          </button>
        </div>

        <button
          onClick={onResetExam}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-sky-900 hover:bg-sky-800 text-white font-bold text-xs transition-colors shadow-sm ml-auto border border-sky-700"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Làm Lại Bài Thi Này</span>
        </button>
      </div>
    </div>
  );
};
