import React, { useState, useRef } from 'react';
import {
  parseWordExamContent,
  normalizeWordHtmlToText,
  serializeExamSetToWordText,
  SAMPLE_WORD_CONTENT,
} from '../utils/wordExamParser';
import {
  extractWordDocxWithMath,
  normalizeMathExpressionsToLatex,
} from '../utils/docxMathExtractor';
import {
  extractMathExamFromPdf,
  verifyAndEnhanceExamWithAI,
} from '../utils/pdfExamExtractor';
import { ExamSet } from '../types/exam';
import { MathRenderer } from './MathRenderer';
import { TikzFigure } from './TikzFigure';
import {
  FileText,
  Upload,
  Download,
  Copy,
  Check,
  AlertCircle,
  Sparkles,
  X,
  FileCheck,
  Loader2,
  Eye,
  Code2,
  Wand2,
  CheckCircle2,
} from 'lucide-react';

interface ImportWordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyExam: (exam: ExamSet) => void;
  defaultTitle?: string;
}

export const ImportWordModal: React.FC<ImportWordModalProps> = ({
  isOpen,
  onClose,
  onApplyExam,
  defaultTitle = 'Đề tự luyện',
}) => {
  const [content, setContent] = useState<string>('');
  const [examTitle, setExamTitle] = useState<string>(defaultTitle);
  const [isProcessingFile, setIsProcessingFile] = useState(false);
  const [isVerifyingAI, setIsVerifyingAI] = useState(false);
  const [processingStatus, setProcessingStatus] = useState<string>('');
  const [pdfMode, setPdfMode] = useState<'smart' | 'fast'>('smart');
  const [activeTab, setActiveTab] = useState<'preview' | 'editor'>('preview');
  const [copiedSample, setCopiedSample] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successBanner, setSuccessBanner] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  React.useEffect(() => {
    if (isOpen) {
      setExamTitle(defaultTitle);
      setErrorMsg(null);
      setSuccessBanner(null);
    }
  }, [isOpen, defaultTitle]);

  if (!isOpen) return null;

  // Xử lý đọc file .docx, .pdf hoặc .txt
  const handleFileUpload = async (file: File) => {
    if (!file) return;

    setIsProcessingFile(true);
    setErrorMsg(null);
    setSuccessBanner(null);
    try {
      const lowerName = file.name.toLowerCase();
      const nameWithoutExt = file.name.replace(/\.[^/.]+$/, '');

      if (lowerName.endsWith('.docx')) {
        setProcessingStatus(
          'Đang giải mã file Word (.docx): trích xuất công thức OMML sang LaTeX $...$, hình vẽ và đáp án...'
        );
        const arrayBuffer = await file.arrayBuffer();
        const extractedText = await extractWordDocxWithMath(arrayBuffer);

        setContent(extractedText);
        if (nameWithoutExt) setExamTitle(nameWithoutExt);
        setActiveTab('preview');
        setSuccessBanner(
          'Đã nhận diện tức thì nội dung, công thức Toán LaTeX, hình vẽ và đáp án từ file Word (.docx).'
        );
      } else if (lowerName.endsWith('.pdf')) {
        setProcessingStatus(
          pdfMode === 'smart'
            ? 'Đang trích xuất nhanh và chuẩn hóa công thức Toán, hình vẽ & đáp án từ file PDF...'
            : 'Đang trích xuất siêu tốc văn bản & công thức từ file PDF...'
        );
        const { text, usedSmartMode } = await extractMathExamFromPdf(
          file,
          pdfMode,
          (quickText) => {
            if (quickText && quickText.trim()) {
              setContent(quickText);
              setActiveTab('preview');
            }
          }
        );
        if (!text || !text.trim()) {
          setErrorMsg(
            'Không trích xuất được nội dung văn bản từ file PDF này. Vui lòng thử chế độ "Nhận diện PDF thông minh" hoặc kiểm tra lại file.'
          );
        } else {
          setContent(text);
          if (nameWithoutExt) setExamTitle(nameWithoutExt);
          setActiveTab('preview');
          setSuccessBanner(
            usedSmartMode
              ? 'Đã nhận diện chuẩn công thức LaTeX, hình vẽ TikZ và kiểm tra logic đáp án từ file PDF.'
              : 'Đã trích xuất nhanh nội dung và tái tạo công thức từ file PDF.'
          );
        }
      } else if (lowerName.endsWith('.doc')) {
        setErrorMsg(
          'Định dạng .doc cũ (Word 97-2003) không hỗ trợ đọc trực tiếp. Vui lòng lưu thành .docx, xuất sang .pdf hoặc Copy (Ctrl+C) rồi Dán (Ctrl+V) vào ô văn bản bên dưới.'
        );
      } else {
        setProcessingStatus('Đang đọc file văn bản...');
        const text = await file.text();
        setContent(normalizeMathExpressionsToLatex(text));
        if (nameWithoutExt) setExamTitle(nameWithoutExt);
        setActiveTab('preview');
      }
    } catch {
      setErrorMsg(
        'Không thể đọc file. Vui lòng chọn file định dạng .docx hoặc .pdf hợp lệ, hoặc sao chép nội dung dán vào ô văn bản bên dưới.'
      );
    } finally {
      setIsProcessingFile(false);
      setProcessingStatus('');
    }
  };

  // Chuẩn hóa công thức LaTeX, đáp án đúng & dựng hình vẽ TikZ bằng AI
  const handleVerifyWithAI = async () => {
    if (!content.trim() || isVerifyingAI || isProcessingFile) return;
    setIsVerifyingAI(true);
    setErrorMsg(null);
    setSuccessBanner(null);
    try {
      const enhancedText = await verifyAndEnhanceExamWithAI(content);
      setContent(enhancedText);
      setActiveTab('preview');
      setSuccessBanner(
        'Đã chuẩn hóa 100% công thức LaTeX, kiểm tra logic toán học của đáp án và tự động bổ sung hình vẽ TikZ.'
      );
    } catch (err: any) {
      setErrorMsg(
        err?.message ||
          'Không thể chuẩn hóa bằng AI lúc này. Bạn vẫn có thể chỉnh sửa trực tiếp đáp án trên khung Xem trước.'
      );
    } finally {
      setIsVerifyingAI(false);
    }
  };

  // Hỗ trợ dán trực tiếp (Ctrl+V) từ Microsoft Word mà vẫn giữ nguyên gạch chân, tô đỏ, highlight, số mũ & hình ảnh
  const handlePasteFromWord = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const htmlData = e.clipboardData?.getData('text/html');
    if (
      htmlData &&
      (/<u\b/i.test(htmlData) ||
        /text-decoration\s*:\s*underline/i.test(htmlData) ||
        /mso-highlight|background|color\s*:\s*(?:red|#ff0000|#c00000)/i.test(htmlData) ||
        /<sup\b|<sub\b|<img\b/i.test(htmlData))
    ) {
      e.preventDefault();
      const converted = normalizeMathExpressionsToLatex(
        normalizeWordHtmlToText(htmlData)
          .replace(/\[U\]/g, '<u>')
          .replace(/\[\/U\]/g, '</u>')
          .replace(/\n{3,}/g, '\n\n')
          .trim()
      );

      const target = e.currentTarget;
      const start = target.selectionStart ?? content.length;
      const end = target.selectionEnd ?? content.length;
      const nextValue = content.slice(0, start) + converted + content.slice(end);
      setContent(nextValue);
      setErrorMsg(null);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleDownloadSample = () => {
    const blob = new Blob([SAMPLE_WORD_CONTENT], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'de_mau_toan_11_chuan_word.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopySample = () => {
    try {
      if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
        navigator.clipboard.writeText(SAMPLE_WORD_CONTENT).catch(() => {});
      } else {
        const ta = document.createElement('textarea');
        ta.value = SAMPLE_WORD_CONTENT;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
    } catch {
      // ignore clipboard errors on restricted iOS contexts
    }
    setCopiedSample(true);
    setTimeout(() => setCopiedSample(false), 2000);
  };

  const handleLoadSample = () => {
    setContent(SAMPLE_WORD_CONTENT);
    setExamTitle(defaultTitle || 'Đề tự luyện');
    setErrorMsg(null);
    setActiveTab('preview');
    setSuccessBanner(
      'Đã nạp đề mẫu chuẩn cấu trúc 4 phần (kèm công thức LaTeX và hình vẽ không gian 3D tự động).'
    );
  };

  // Thống kê kết quả nhận diện thời gian thực
  const parseResult = content ? parseWordExamContent(content, examTitle) : null;

  // Cho phép giáo viên/học sinh bấm đổi nhanh đáp án đúng ngay trên giao diện Xem trước
  const handleChangePart1Answer = (qIndex: number, newAns: 'A' | 'B' | 'C' | 'D') => {
    if (!parseResult) return;
    const updatedExam: ExamSet = {
      ...parseResult.exam,
      part1: parseResult.exam.part1.map((q, idx) =>
        idx === qIndex ? { ...q, correctAnswer: newAns } : q
      ),
    };
    setContent(serializeExamSetToWordText(updatedExam));
  };

  const handleTogglePart2Statement = (qIndex: number, stLabel: 'a' | 'b' | 'c' | 'd') => {
    if (!parseResult) return;
    const updatedExam: ExamSet = {
      ...parseResult.exam,
      part2: parseResult.exam.part2.map((q, idx) =>
        idx === qIndex
          ? {
              ...q,
              statements: q.statements.map((st) =>
                st.label === stLabel ? { ...st, isCorrect: !st.isCorrect } : st
              ),
            }
          : q
      ),
    };
    setContent(serializeExamSetToWordText(updatedExam));
  };

  const handleChangePart3Answer = (qIndex: number, newAnsRaw: string) => {
    if (!parseResult) return;
    const updatedExam: ExamSet = {
      ...parseResult.exam,
      part3: parseResult.exam.part3.map((q, idx) =>
        idx === qIndex ? { ...q, acceptableAnswers: [newAnsRaw] } : q
      ),
    };
    setContent(serializeExamSetToWordText(updatedExam));
  };

  const handleApply = () => {
    if (!parseResult || parseResult.counts.total === 0) {
      setErrorMsg(
        'Chưa nhận diện được câu hỏi nào. Vui lòng kiểm tra lại định dạng câu hỏi (bắt đầu bằng "Câu 1.", "Câu 2.",...) hoặc bấm "Nạp đề mẫu" để xem chuẩn.'
      );
      return;
    }
    onApplyExam(parseResult.exam);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/65 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[94vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header Modal */}
        <div className="p-3.5 sm:p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                Tạo Đề Thi Chuyên Nghiệp Từ File Word (.docx) & PDF (.pdf)
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-500">
                Nhận diện siêu tốc công thức Toán (OMML / LaTeX), hình vẽ không gian 3D / đồ thị và kiểm tra logic đáp án
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1">
          {/* Thanh công cụ mẫu & hướng dẫn nhanh */}
          <div className="p-3.5 rounded-xl bg-amber-50/90 border border-amber-200/90 space-y-2 text-xs text-amber-950">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="font-bold text-amber-900 flex items-center gap-1.5 text-xs sm:text-sm">
                <span>💡 Hỗ trợ nhận diện tự động: Gạch chân, Tô màu đỏ, Highlight vàng, Bảng đáp án cuối đề & Hình vẽ Toán 11</span>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleDownloadSample}
                  className="px-2.5 py-1 rounded-lg bg-amber-200/70 hover:bg-amber-200 text-amber-900 font-semibold flex items-center gap-1 transition-colors"
                  title="Tải file văn bản mẫu về máy"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Tải mẫu</span>
                </button>
                <button
                  type="button"
                  onClick={handleCopySample}
                  className="px-2.5 py-1 rounded-lg bg-amber-200/70 hover:bg-amber-200 text-amber-900 font-semibold flex items-center gap-1 transition-colors"
                  title="Sao chép nội dung văn bản mẫu"
                >
                  {copiedSample ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  <span>{copiedSample ? 'Đã sao chép' : 'Chép mẫu'}</span>
                </button>
                <button
                  type="button"
                  onClick={handleLoadSample}
                  className="px-2.5 py-1 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                  title="Tải văn bản mẫu vào khung nhập"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Nạp đề mẫu (Có hình 3D)</span>
                </button>
              </div>
            </div>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successBanner && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>{successBanner}</span>
            </div>
          )}

          {/* Tên đề thi & Chế độ đọc PDF */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Tên Đề Thi:</label>
              <input
                type="text"
                value={examTitle}
                onChange={(e) => setExamTitle(e.target.value)}
                placeholder="Nhập tên đề thi (ví dụ: Đề kiểm tra Chương 4)..."
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm font-semibold text-slate-900 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Chế Độ Xử Lý Khi Tải File PDF (.pdf):</label>
              <select
                value={pdfMode}
                onChange={(e) => setPdfMode(e.target.value as 'smart' | 'fast')}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-800 bg-white focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-500"
              >
                <option value="smart">
                  Nhận diện PDF thông minh (Hiển thị tức thì + Chuẩn hóa công thức, hình vẽ TikZ & đáp án)
                </option>
                <option value="fast">
                  Trích xuất PDF siêu tốc (&lt; 0.3 giây - Tái tạo số mũ, chỉ số dưới & LaTeX cục bộ)
                </option>
              </select>
            </div>
          </div>

          {/* Drag & Drop File Upload Area */}
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-2xl p-4 sm:p-5 text-center transition-all cursor-pointer ${
              dragActive
                ? 'border-indigo-600 bg-indigo-50/70'
                : 'border-slate-300 bg-slate-50/50 hover:bg-slate-50 hover:border-indigo-400'
            }`}
            onClick={() => !isProcessingFile && fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".docx,.pdf,.txt"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleFileUpload(e.target.files[0]);
                  e.target.value = '';
                }
              }}
            />
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <div className="w-11 h-11 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                {isProcessingFile ? (
                  <Loader2 className="w-5 h-5 animate-spin text-indigo-600" />
                ) : (
                  <Upload className="w-5 h-5" />
                )}
              </div>
              <div className="text-left">
                <div className="text-sm font-bold text-slate-800">
                  {isProcessingFile
                    ? processingStatus || 'Đang đọc và phân tích file...'
                    : 'Kéo thả file Word (.docx) hoặc PDF (.pdf) vào đây hoặc bấm để chọn file'}
                </div>
                <p className="text-xs text-slate-500">
                  Hỗ trợ công thức Microsoft Equation (OMML), MathType, hình ảnh trong Word và hình học không gian TikZ
                </p>
              </div>
            </div>
          </div>

          {/* Thanh chuyển đổi chế độ Xem trước Trực quan / Soạn thảo Mã nguồn + Nút Chuẩn hóa AI */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-b border-slate-200 pb-2.5">
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                type="button"
                onClick={() => setActiveTab('preview')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeTab === 'preview'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Xem Trước Đề Chuẩn ({parseResult?.counts.total || 0} câu)</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('editor')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeTab === 'editor'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>Soạn Thảo Văn Bản / LaTeX</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              {content.trim().length > 0 && (
                <button
                  type="button"
                  onClick={handleVerifyWithAI}
                  disabled={isVerifyingAI || isProcessingFile}
                  className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all cursor-pointer disabled:opacity-60"
                  title="Tự động kiểm tra logic toán học, giải & gạch chân đáp án đúng, chuẩn hóa công thức LaTeX và dựng hình vẽ TikZ"
                >
                  {isVerifyingAI ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Wand2 className="w-3.5 h-3.5" />
                  )}
                  <span>
                    {isVerifyingAI
                      ? 'Đang chuẩn hóa công thức, đáp án & hình vẽ...'
                      : 'Chuẩn Hóa Công Thức, Đáp Án & Hình Vẽ (AI)'}
                  </span>
                </button>
              )}

              {content.trim().length > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    setContent('');
                    setErrorMsg(null);
                    setSuccessBanner(null);
                  }}
                  className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                >
                  Xóa trắng
                </button>
              )}
            </div>
          </div>

          {/* Nội dung Tab: Soạn thảo hoặc Xem trước */}
          {activeTab === 'editor' || !parseResult || parseResult.counts.total === 0 ? (
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">
                Nội Dung Đề Thi (Có thể chỉnh sửa trực tiếp hoặc nhấn Ctrl+V dán từ Word):
              </label>
              <textarea
                rows={10}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                onPaste={handlePasteFromWord}
                placeholder="Tải file .docx / .pdf ở trên, bấm 'Nạp đề mẫu (Có hình 3D)' hoặc dán (Ctrl+V) nội dung từ Word vào đây..."
                className="w-full p-3.5 rounded-xl border border-slate-300 text-xs font-mono text-slate-800 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          ) : (
            <div className="space-y-4 max-h-[420px] overflow-y-auto pr-1">
              {/* PHẦN I PREVIEW */}
              {parseResult.exam.part1.length > 0 && (
                <div className="space-y-2.5">
                  <div className="px-3 py-1.5 rounded-lg bg-indigo-50 border border-indigo-200 text-xs font-bold text-indigo-900 flex items-center justify-between">
                    <span>PHẦN I. TRẮC NGHIỆM 4 PHƯƠNG ÁN ({parseResult.exam.part1.length} câu)</span>
                    <span className="text-[11px] font-normal text-indigo-700">
                      * Bấm vào phương án A, B, C, D bất kỳ để đổi nhanh đáp án đúng
                    </span>
                  </div>
                  {parseResult.exam.part1.map((q, qIdx) => (
                    <div
                      key={q.id}
                      className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2.5"
                    >
                      <div className="text-sm text-slate-900 font-medium leading-relaxed">
                        <span className="font-bold text-indigo-700 mr-1.5">Câu {q.number}.</span>
                        <MathRenderer content={q.prompt} />
                      </div>

                      {(q.tikzType || q.tikzCode) && (
                        <div className="my-2">
                          <TikzFigure type={q.tikzType} tikzCode={q.tikzCode} />
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {q.options.map((opt) => {
                          const isCorrect = q.correctAnswer === opt.key;
                          return (
                            <button
                              key={opt.key}
                              type="button"
                              onClick={() => handleChangePart1Answer(qIdx, opt.key)}
                              className={`p-2.5 rounded-lg border text-left text-xs flex items-center gap-2 transition-all cursor-pointer ${
                                isCorrect
                                  ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-semibold ring-1 ring-emerald-400'
                                  : 'bg-slate-50/70 border-slate-200 text-slate-800 hover:border-indigo-300'
                              }`}
                              title="Bấm để đặt phương án này làm đáp án đúng"
                            >
                              <span
                                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                                  isCorrect
                                    ? 'bg-emerald-600 text-white'
                                    : 'bg-white border border-slate-300 text-slate-700'
                                }`}
                              >
                                {opt.key}
                              </span>
                              <div className="flex-1 min-w-0">
                                <MathRenderer content={opt.content} />
                              </div>
                              {isCorrect && (
                                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                                  ĐÚNG
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* PHẦN II PREVIEW */}
              {parseResult.exam.part2.length > 0 && (
                <div className="space-y-2.5">
                  <div className="px-3 py-1.5 rounded-lg bg-sky-50 border border-sky-200 text-xs font-bold text-sky-900 flex items-center justify-between">
                    <span>PHẦN II. TRẮC NGHIỆM ĐÚNG / SAI ({parseResult.exam.part2.length} câu)</span>
                    <span className="text-[11px] font-normal text-sky-700">
                      * Bấm vào nhãn ĐÚNG / SAI ở mỗi ý a), b), c), d) để chuyển đổi nhanh
                    </span>
                  </div>
                  {parseResult.exam.part2.map((q, qIdx) => (
                    <div
                      key={q.id}
                      className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2.5"
                    >
                      <div className="text-sm text-slate-900 font-medium leading-relaxed">
                        <span className="font-bold text-sky-700 mr-1.5">Câu {q.number}.</span>
                        <MathRenderer content={q.prompt} />
                      </div>

                      {(q.tikzType || q.tikzCode) && (
                        <div className="my-2">
                          <TikzFigure type={q.tikzType} tikzCode={q.tikzCode} />
                        </div>
                      )}

                      <div className="space-y-1.5">
                        {q.statements.map((st) => (
                          <div
                            key={st.id}
                            onClick={() => handleTogglePart2Statement(qIdx, st.label)}
                            className={`p-2 rounded-lg border text-xs flex items-center justify-between gap-2 cursor-pointer transition-all ${
                              st.isCorrect
                                ? 'bg-emerald-50/70 border-emerald-300 text-slate-900'
                                : 'bg-slate-50 border-slate-200 text-slate-700'
                            }`}
                          >
                            <div className="flex items-start gap-1.5">
                              <span className="font-bold text-slate-900">{st.label})</span>
                              <MathRenderer content={st.statement} />
                            </div>
                            <span
                              className={`px-2 py-0.5 rounded font-bold text-[10px] shrink-0 ${
                                st.isCorrect
                                  ? 'bg-emerald-600 text-white'
                                  : 'bg-rose-100 text-rose-700 border border-rose-200'
                              }`}
                            >
                              {st.isCorrect ? 'ĐÚNG' : 'SAI'}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* PHẦN III PREVIEW */}
              {parseResult.exam.part3.length > 0 && (
                <div className="space-y-2.5">
                  <div className="px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-900">
                    PHẦN III. TRẢ LỜI NGẮN ({parseResult.exam.part3.length} câu)
                  </div>
                  {parseResult.exam.part3.map((q, qIdx) => (
                    <div
                      key={q.id}
                      className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2.5"
                    >
                      <div className="text-sm text-slate-900 font-medium leading-relaxed">
                        <span className="font-bold text-emerald-700 mr-1.5">Câu {q.number}.</span>
                        <MathRenderer content={q.prompt} />
                      </div>

                      {(q.tikzType || q.tikzCode) && (
                        <div className="my-2">
                          <TikzFigure type={q.tikzType} tikzCode={q.tikzCode} />
                        </div>
                      )}

                      <div className="flex items-center gap-2 text-xs">
                        <span className="font-bold text-slate-700">Đáp số chuẩn:</span>
                        <input
                          type="text"
                          value={q.acceptableAnswers[0] || ''}
                          onChange={(e) => handleChangePart3Answer(qIdx, e.target.value)}
                          className="px-2.5 py-1 rounded-lg border border-emerald-400 bg-emerald-50/50 font-mono font-bold text-emerald-900 w-36 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* PHẦN IV PREVIEW */}
              {parseResult.exam.part4.length > 0 && (
                <div className="space-y-2.5">
                  <div className="px-3 py-1.5 rounded-lg bg-purple-50 border border-purple-200 text-xs font-bold text-purple-900">
                    PHẦN IV. TỰ LUẬN GHÉP BƯỚC LOGIC ({parseResult.exam.part4.length} câu)
                  </div>
                  {parseResult.exam.part4.map((q) => (
                    <div
                      key={q.id}
                      className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2.5"
                    >
                      <div className="text-sm text-slate-900 font-medium leading-relaxed">
                        <span className="font-bold text-purple-700 mr-1.5">Câu {q.number}.</span>
                        <MathRenderer content={q.problemStatement} />
                      </div>

                      {(q.tikzType || q.tikzCode) && (
                        <div className="my-2">
                          <TikzFigure type={q.tikzType} tikzCode={q.tikzCode} />
                        </div>
                      )}

                      <div className="space-y-1 pl-2 border-l-2 border-purple-300">
                        {q.steps.map((st, idx) => (
                          <div key={st.id} className="text-xs text-slate-800 py-0.5">
                            <span className="font-bold text-purple-700 mr-1.5">Bước {idx + 1}:</span>
                            <MathRenderer content={st.content} />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Real-time Recognition Counter Badge Strip */}
          {parseResult && (
            <div className="p-3.5 rounded-xl bg-slate-100 border border-slate-200 space-y-2.5">
              <div className="text-xs font-bold text-slate-800 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <FileCheck className="w-4 h-4 text-emerald-600" />
                  <span>Thống Kê Nhận Diện Cấu Trúc Đề:</span>
                </span>
                <span className="text-indigo-700 font-mono font-bold">
                  Tổng {parseResult.counts.total} câu hỏi
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <div className="p-2 rounded-lg bg-white border border-slate-200">
                  <span className="text-slate-500 block text-[11px]">Phần I (Trắc nghiệm):</span>
                  <span className="font-bold text-indigo-700 font-mono text-sm">
                    {parseResult.counts.part1} câu
                  </span>
                </div>
                <div className="p-2 rounded-lg bg-white border border-slate-200">
                  <span className="text-slate-500 block text-[11px]">Phần II (Đúng / Sai):</span>
                  <span className="font-bold text-sky-700 font-mono text-sm">
                    {parseResult.counts.part2} câu
                  </span>
                </div>
                <div className="p-2 rounded-lg bg-white border border-slate-200">
                  <span className="text-slate-500 block text-[11px]">Phần III (Trả lời ngắn):</span>
                  <span className="font-bold text-emerald-700 font-mono text-sm">
                    {parseResult.counts.part3} câu
                  </span>
                </div>
                <div className="p-2 rounded-lg bg-white border border-slate-200">
                  <span className="text-slate-500 block text-[11px]">Phần IV (Tự luận ghép):</span>
                  <span className="font-bold text-purple-700 font-mono text-sm">
                    {parseResult.counts.part4} câu
                  </span>
                </div>
              </div>

              {parseResult.unrecognizedQuestions.length > 0 && (
                <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-[11px] text-amber-900 flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <strong>Lưu ý ({parseResult.unrecognizedQuestions.length} câu cần kiểm tra đáp án):</strong>{' '}
                    {parseResult.unrecognizedQuestions
                      .map((u) => `${u.partLabel} ${u.questionLabel}`)
                      .join(', ')}
                  </div>
                  <button
                    type="button"
                    onClick={handleVerifyWithAI}
                    disabled={isVerifyingAI}
                    className="px-2.5 py-1 rounded-md bg-amber-600 hover:bg-amber-700 text-white font-bold cursor-pointer shrink-0"
                  >
                    Tự động giải & điền đáp án bằng AI
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-3.5 sm:p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            Đóng
          </button>

          <button
            type="button"
            onClick={handleApply}
            disabled={isProcessingFile || !content || !parseResult || parseResult.counts.total === 0}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold text-white shadow-sm transition-all flex items-center gap-2 ${
              !isProcessingFile && content && parseResult && parseResult.counts.total > 0
                ? 'bg-indigo-600 hover:bg-indigo-700 cursor-pointer active:scale-95'
                : 'bg-slate-400 cursor-not-allowed opacity-60'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Áp Dụng & Bắt Đầu Làm Đề ({parseResult?.counts.total || 0} câu)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
