/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { examSets } from './data/examSets';
import {
  textbookChapters,
  allLessonPracticeExams,
  getAllAvailableExamsWithLessons,
} from './data/lessonExams';
import {
  ExamSet,
  StudentAnswers,
  ExamPart,
  PartScoreDetail,
  LeaderboardEntry,
  ExamViolation,
} from './types/exam';
import { calculateScore } from './utils/scoring';
import { Header } from './components/Header';
import { Timer } from './components/Timer';
import { QuestionNav } from './components/QuestionNav';
import { Part1MultipleChoice } from './components/Part1MultipleChoice';
import { Part2TrueFalse } from './components/Part2TrueFalse';
import { Part3ShortAnswer } from './components/Part3ShortAnswer';
import { Part4StepOrdering } from './components/Part4StepOrdering';
import { ResultReport } from './components/ResultReport';
import { ImportWordModal } from './components/ImportWordModal';
import { LessonCatalogModal } from './components/LessonCatalogModal';
import {
  LeaderboardModal,
  INITIAL_LEADERBOARD_ENTRIES,
  sortLeaderboardEntries,
  formatDuration,
} from './components/LeaderboardModal';
import { PWAInstallModal } from './components/PWAInstallModal';
import { usePWAInstall } from './hooks/usePWAInstall';
import {
  playSubmitFanfare,
  playCorrectSound,
  playWrongSound,
  playViolationAlarmSound,
  setAudioEnabled,
  stopSpeech,
} from './utils/audio';
import {
  Send,
  AlertTriangle,
  Play,
  RotateCcw,
  Trash2,
  Trophy,
  ChevronRight,
  User,
  UserCheck,
  BookOpen,
  PenTool,
  CheckCircle2,
  Sparkles,
  X,
  LayoutGrid,
  WifiOff,
  Smartphone,
  Clock,
  ShieldAlert,
  ShieldCheck,
} from 'lucide-react';

const LEADERBOARD_STORAGE_KEY = 'math11_leaderboard_v5_cleared';
const STUDENT_INFO_STORAGE_KEY = 'math11_student_info_v1';
const CUSTOM_EXAMS_STORAGE_KEY = 'math11_custom_exams_v2';
const ACTIVE_PROGRESS_STORAGE_KEY = 'math11_active_progress_v2';
const QUICK_CLASSES = ['11A1', '11A2', '11A3', '11A4', '11A5'];

const EMPTY_EXAM: ExamSet = {
  id: 'empty-exam',
  title: 'Chưa có đề thi',
  subtitle: '',
  grade: 11,
  durationMinutes: 90,
  totalPoints: 10,
  description:
    'Hiện chưa có đề thi nào được chọn. Hãy nhấn "Tạo Đề Word / PDF" hoặc "Khôi phục đề mặc định" để bắt đầu.',
  part1: [],
  part2: [],
  part3: [],
  part4: [],
};

export default function App() {
  const {
    isOnline,
    swReady,
    isInstalled,
    isIOS,
    hasNativePrompt,
    promptInstall,
  } = usePWAInstall();

  const [allExams, setAllExams] = useState<ExamSet[]>(() => {
    const baseWithLessons = getAllAvailableExamsWithLessons(examSets);
    try {
      const savedCustom = localStorage.getItem(CUSTOM_EXAMS_STORAGE_KEY);
      if (savedCustom) {
        const parsed = JSON.parse(savedCustom);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const defaultIds = new Set(baseWithLessons.map((e) => e.id));
          const customOnly = parsed.filter((e: ExamSet) => e && e.id && !defaultIds.has(e.id));
          return [...customOnly, ...baseWithLessons];
        }
      }
    } catch {
      // ignore
    }
    return baseWithLessons;
  });

  const [selectedExamId, setSelectedExamId] = useState<string>(() => {
    try {
      const savedProgress = localStorage.getItem(ACTIVE_PROGRESS_STORAGE_KEY);
      if (savedProgress) {
        const parsed = JSON.parse(savedProgress);
        if (parsed && parsed.selectedExamId) {
          return parsed.selectedExamId;
        }
      }
    } catch {
      // ignore
    }
    return 'de-01';
  });

  const currentExam = useMemo(
    () => allExams.find((ex) => ex.id === selectedExamId) || allExams[0] || EMPTY_EXAM,
    [allExams, selectedExamId]
  );

  const [examMode, setExamMode] = useState<'exam' | 'practice'>('exam');
  const [isExamStarted, setIsExamStarted] = useState<boolean>(() => {
    try {
      const savedProgress = localStorage.getItem(ACTIVE_PROGRESS_STORAGE_KEY);
      if (savedProgress) {
        const parsed = JSON.parse(savedProgress);
        if (parsed && parsed.selectedExamId === currentExam.id) {
          return !!parsed.isExamStarted;
        }
      }
    } catch {
      // ignore
    }
    return false;
  });
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [examSessionKey, setExamSessionKey] = useState<number>(1);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [activeFilterPart, setActiveFilterPart] = useState<'all' | ExamPart>('all');
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState<Set<string>>(() => {
    try {
      const savedProgress = localStorage.getItem(ACTIVE_PROGRESS_STORAGE_KEY);
      if (savedProgress) {
        const parsed = JSON.parse(savedProgress);
        if (parsed && parsed.selectedExamId === currentExam.id && Array.isArray(parsed.bookmarked)) {
          return new Set(parsed.bookmarked);
        }
      }
    } catch {
      // ignore
    }
    return new Set();
  });
  const [interactedPart4, setInteractedPart4] = useState<Set<string>>(() => {
    try {
      const savedProgress = localStorage.getItem(ACTIVE_PROGRESS_STORAGE_KEY);
      if (savedProgress) {
        const parsed = JSON.parse(savedProgress);
        if (
          parsed &&
          parsed.selectedExamId === currentExam.id &&
          Array.isArray(parsed.interactedPart4)
        ) {
          return new Set(parsed.interactedPart4);
        }
      }
    } catch {
      // ignore
    }
    return new Set();
  });

  const [isImportWordOpen, setIsImportWordOpen] = useState(false);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);
  const [isLessonModalOpen, setIsLessonModalOpen] = useState(false);
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [isPWAInfoOpen, setIsPWAInfoOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [studentInfoError, setStudentInfoError] = useState<string>('');

  // Hệ thống giám sát báo vi phạm quy chế thi (chống mở tab khác / khoá màn hình / che góc màn hình dùng AI)
  const [violations, setViolations] = useState<ExamViolation[]>(() => {
    try {
      const savedProgress = localStorage.getItem(ACTIVE_PROGRESS_STORAGE_KEY);
      if (savedProgress) {
        const parsed = JSON.parse(savedProgress);
        if (
          parsed &&
          parsed.selectedExamId === currentExam.id &&
          Array.isArray(parsed.violations)
        ) {
          return parsed.violations;
        }
      }
    } catch {
      // ignore
    }
    return [];
  });
  const [isViolationModalOpen, setIsViolationModalOpen] = useState<boolean>(false);
  const [latestViolation, setLatestViolation] = useState<ExamViolation | null>(null);
  const lastViolationTimestampRef = useRef<number>(0);
  const baselineViewportRef = useRef<{ width: number; height: number } | null>(null);

  // Student info & Leaderboard state
  const [studentName, setStudentName] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(STUDENT_INFO_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.studentName || '';
      }
    } catch {
      // ignore
    }
    return '';
  });

  const [studentClass, setStudentClass] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(STUDENT_INFO_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.studentClass || '11A1';
      }
    } catch {
      // ignore
    }
    return '11A1';
  });

  const [leaderboardEntries, setLeaderboardEntries] = useState<LeaderboardEntry[]>(() => {
    try {
      const saved = localStorage.getItem(LEADERBOARD_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch {
      // ignore
    }
    return INITIAL_LEADERBOARD_ENTRIES;
  });

  useEffect(() => {
    try {
      localStorage.setItem(LEADERBOARD_STORAGE_KEY, JSON.stringify(leaderboardEntries));
    } catch {
      // ignore
    }
  }, [leaderboardEntries]);

  useEffect(() => {
    try {
      localStorage.setItem(
        STUDENT_INFO_STORAGE_KEY,
        JSON.stringify({ studentName, studentClass })
      );
    } catch {
      // ignore
    }
  }, [studentName, studentClass]);

  const examStartTimeRef = useRef<number | null>(null);
  const [timerElapsedSeconds, setTimerElapsedSeconds] = useState<number>(0);
  const [submittedDurationSeconds, setSubmittedDurationSeconds] = useState<number>(0);
  const studentNameInputRef = useRef<HTMLInputElement | null>(null);

  // Initialize student answers
  const initializeAnswers = (exam: ExamSet): StudentAnswers => {
    const p4Answers: Record<string, string[]> = {};
    if (exam.part4) {
      exam.part4.forEach((q) => {
        const ids = q.steps.map((s) => s.id);
        const shuffled = [...ids].sort(() => Math.random() - 0.5);
        p4Answers[q.id] = shuffled;
      });
    }

    const p2Answers: Record<string, Record<'a' | 'b' | 'c' | 'd', boolean | null>> = {};
    exam.part2.forEach((q) => {
      p2Answers[q.id] = { a: null, b: null, c: null, d: null };
    });

    return {
      part1: {},
      part2: p2Answers,
      part3: {},
      part4: p4Answers,
    };
  };

  const [answers, setAnswers] = useState<StudentAnswers>(() => {
    try {
      const savedProgress = localStorage.getItem(ACTIVE_PROGRESS_STORAGE_KEY);
      if (savedProgress) {
        const parsed = JSON.parse(savedProgress);
        if (parsed && parsed.selectedExamId === currentExam.id && parsed.answers) {
          return parsed.answers;
        }
      }
    } catch {
      // ignore
    }
    return initializeAnswers(currentExam);
  });
  const [scoreDetail, setScoreDetail] = useState<PartScoreDetail | null>(null);

  // Save custom exams to localStorage for full offline persistence
  useEffect(() => {
    try {
      const defaultIds = new Set([
        ...examSets.map((e) => e.id),
        ...allLessonPracticeExams.map((e) => e.id),
      ]);
      const customOnly = allExams.filter((e) => !defaultIds.has(e.id) && e.id !== 'empty-exam');
      localStorage.setItem(CUSTOM_EXAMS_STORAGE_KEY, JSON.stringify(customOnly));
    } catch {
      // ignore
    }
  }, [allExams]);

  // Auto-save active exam progress to localStorage so offline refresh never loses answers
  useEffect(() => {
    try {
      if (!isSubmitted) {
        localStorage.setItem(
          ACTIVE_PROGRESS_STORAGE_KEY,
          JSON.stringify({
            selectedExamId: currentExam.id,
            isExamStarted,
            answers,
            interactedPart4: Array.from(interactedPart4),
            bookmarked: Array.from(bookmarkedQuestions),
            violations,
          })
        );
      }
    } catch {
      // ignore
    }
  }, [
    currentExam.id,
    isExamStarted,
    isSubmitted,
    answers,
    interactedPart4,
    bookmarkedQuestions,
    violations,
  ]);

  // Chức năng âm thanh chỉ hoạt động khi học sinh bắt đầu làm bài được tính giờ
  useEffect(() => {
    setAudioEnabled(isExamStarted && !isSubmitted && examMode === 'exam');
  }, [isExamStarted, isSubmitted, examMode]);

  // Giám sát thời gian thực: Phát hiện mở tab khác, màn hình bị khoá hoặc bị che 1 góc nhỏ để sử dụng AI giải bài
  useEffect(() => {
    if (!isExamStarted || isSubmitted) {
      baselineViewportRef.current = null;
      return;
    }

    // Lưu kích thước khung hình chuẩn ngay khi bắt đầu làm bài
    baselineViewportRef.current = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    const recordViolation = (
      type: ExamViolation['type'],
      reason: string
    ) => {
      const now = Date.now();
      // Chống ghi trùng lặp khi 2 sự kiện blur và visibilitychange nổ cùng lúc (cooldown 1.8 giây)
      if (now - lastViolationTimestampRef.current < 1800) {
        return;
      }
      lastViolationTimestampRef.current = now;

      const timeStr = new Date().toLocaleTimeString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });

      const elapsed = examStartTimeRef.current
        ? Math.max(1, Math.round((now - examStartTimeRef.current) / 1000))
        : timerElapsedSeconds;

      const newViolation: ExamViolation = {
        id: `vio-${now}`,
        type,
        reason,
        timestamp: timeStr,
        elapsedSeconds: elapsed,
      };

      setViolations((prev) => [newViolation, ...prev]);
      setLatestViolation(newViolation);
      setIsViolationModalOpen(true);
      playViolationAlarmSound();
    };

    // 1. Phát hiện chuyển sang Tab khác, ẩn trình duyệt hoặc màn hình bị khoá
    const handleVisibilityChange = () => {
      if (document.hidden || document.visibilityState === 'hidden') {
        recordViolation(
          'tab_switch',
          'Mở tab khác, thoát ứng dụng hoặc màn hình bị khoá trong lúc đang làm bài thi'
        );
      }
    };

    // 2. Phát hiện mở cửa sổ nổi (Pop-up AI / ChatGPT / Gemini), chia đôi màn hình hoặc che một góc màn hình làm mất tiêu điểm
    const handleWindowBlur = () => {
      // Nếu trang vẫn hiển thị nhưng mất focus -> học sinh vừa chạm vào cửa sổ nổi / công cụ AI che góc màn hình
      setTimeout(() => {
        if (document.hidden || document.visibilityState === 'hidden') {
          return; // Đã được xử lý bởi visibilitychange
        }
        if (!document.hasFocus()) {
          recordViolation(
            'screen_lock_or_blur',
            'Màn hình bị che một góc hoặc mở cửa sổ phụ / công cụ AI đè lên giao diện làm bài'
          );
        }
      }, 120);
    };

    // 3. Phát hiện thu nhỏ khung trình duyệt, chia đôi màn hình (Split-Screen) hoặc cửa sổ nổi che góc màn hình
    const handleViewportResize = () => {
      const activeTag = document.activeElement?.tagName;
      // Bỏ qua khi học sinh đang nhấn vào ô nhập số (bàn phím ảo điện thoại bật lên)
      if (activeTag === 'INPUT' || activeTag === 'TEXTAREA' || activeTag === 'SELECT') {
        return;
      }

      const base = baselineViewportRef.current;
      if (!base) return;

      const currentW = window.innerWidth;
      const currentH = window.innerHeight;

      // Nếu chiều rộng hoặc chiều cao bị thu hẹp bất thường (> 14%) do chia đôi màn hình hoặc kéo khung AI che góc
      if (currentW < base.width * 0.86 || currentH < base.height * 0.82) {
        recordViolation(
          'split_or_overlay_ai',
          'Chia đôi màn hình hoặc thu hẹp góc màn hình để sử dụng công cụ AI giải bài'
        );
      }
    };

    // 4. Phát hiện hành vi cố tình Copy đề bài để dán sang công cụ AI
    const handleCopyAttempt = (e: ClipboardEvent) => {
      const activeTag = document.activeElement?.tagName;
      if (activeTag === 'INPUT' || activeTag === 'TEXTAREA') return;
      e.preventDefault();
      recordViolation(
        'copy_attempt',
        'Cố tình sao chép (Copy) nội dung câu hỏi để tra cứu bằng AI'
      );
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleWindowBlur);
    window.addEventListener('resize', handleViewportResize);
    document.addEventListener('copy', handleCopyAttempt);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleWindowBlur);
      window.removeEventListener('resize', handleViewportResize);
      document.removeEventListener('copy', handleCopyAttempt);
    };
  }, [isExamStarted, isSubmitted, timerElapsedSeconds]);

  const resultReportRef = useRef<HTMLDivElement | null>(null);
  const questionsContainerRef = useRef<HTMLDivElement | null>(null);
  const studentRegistrationRef = useRef<HTMLDivElement | null>(null);

  const totalExamQuestions = useMemo(() => {
    return (
      currentExam.part1.length +
      currentExam.part2.length +
      currentExam.part3.length +
      (currentExam.part4?.length || 0)
    );
  }, [currentExam]);

  const resetSessionState = (targetExam: ExamSet) => {
    setAudioEnabled(false);
    const freshAnswers = initializeAnswers(targetExam);
    setAnswers(freshAnswers);
    setIsExamStarted(false);
    setIsSubmitted(false);
    setScoreDetail(null);
    setBookmarkedQuestions(new Set());
    setInteractedPart4(new Set());
    setActiveFilterPart('all');
    examStartTimeRef.current = null;
    setTimerElapsedSeconds(0);
    setSubmittedDurationSeconds(0);
    setViolations([]);
    setLatestViolation(null);
    setIsViolationModalOpen(false);
    setExamSessionKey((prev) => prev + 1);
    try {
      localStorage.removeItem(ACTIVE_PROGRESS_STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  // Khi học sinh chọn Bắt Đầu Làm Bài thì hiện bảng 2 dòng điền Họ tên và Lớp
  const handleStartExam = () => {
    setStudentInfoError('');
    setIsStudentModalOpen(true);
    setTimeout(() => {
      studentNameInputRef.current?.focus();
    }, 60);
  };

  // Helper when student interacts with a question directly before starting
  const ensureExamStarted = (): boolean => {
    if (isExamStarted) return true;
    setStudentInfoError('Vui lòng điền Họ và tên và Lớp để bắt đầu làm bài!');
    setIsStudentModalOpen(true);
    setTimeout(() => {
      studentNameInputRef.current?.focus();
    }, 60);
    return false;
  };

  // Reset answers when changing exam
  const handleSelectExam = (examId: string) => {
    stopSpeech();
    setSelectedExamId(examId);
    const newExam = allExams.find((e) => e.id === examId) || allExams[0] || EMPTY_EXAM;
    resetSessionState(newExam);
  };

  // Xoá đề thi khỏi danh sách
  const handleDeleteExam = (examId: string) => {
    stopSpeech();
    const remaining = allExams.filter((e) => e.id !== examId);
    setAllExams(remaining);
    const nextExam = remaining[0] || EMPTY_EXAM;
    setSelectedExamId(nextExam.id);
    resetSessionState(nextExam);
  };

  // Khôi phục Đề mặc định
  const handleRestoreDefaultExam = () => {
    stopSpeech();
    const restored = getAllAvailableExamsWithLessons(examSets);
    setAllExams(restored);
    setSelectedExamId(restored[0].id);
    resetSessionState(restored[0]);
  };

  // Áp dụng đề thi mới tạo từ file Word / PDF
  const handleApplyWordExam = (newExam: ExamSet) => {
    stopSpeech();
    setAllExams((prev) => [newExam, ...prev]);
    setSelectedExamId(newExam.id);
    resetSessionState(newExam);
  };

  // Toggle bookmark
  const toggleBookmark = (qId: string) => {
    setBookmarkedQuestions((prev) => {
      const next = new Set(prev);
      if (next.has(qId)) next.delete(qId);
      else next.add(qId);
      return next;
    });
  };

  // Submit test
  const handleFinalSubmit = () => {
    stopSpeech();
    setShowSubmitConfirm(false);
    const result = calculateScore(currentExam, answers);
    setScoreDetail(result);
    setIsSubmitted(true);

    // Compute elapsed seconds accurately from Timer or wall clock
    const wallElapsed = examStartTimeRef.current
      ? Math.max(5, Math.round((Date.now() - examStartTimeRef.current) / 1000))
      : 0;
    const elapsedSeconds =
      timerElapsedSeconds > 0 ? timerElapsedSeconds : wallElapsed > 0 ? wallElapsed : 1200;

    setSubmittedDurationSeconds(elapsedSeconds);

    const finalName = studentName.trim() || 'Học sinh Lớp 11';
    const finalClass = studentClass.trim() || '11A1';

    const newEntry: LeaderboardEntry = {
      id: `entry-${Date.now()}`,
      studentName: finalName,
      className: finalClass,
      examId: currentExam.id,
      examTitle: currentExam.title,
      totalScore: result.totalScore,
      part1Score: result.part1Score,
      part2Score: result.part2Score,
      part3Score: result.part3Score,
      part4Score: result.part4Score,
      durationSeconds: elapsedSeconds,
      rank: result.rank,
      submittedAt: new Date().toISOString(),
      isCurrentUser: true,
      violationCount: violations.length,
      violationDetails: violations.map((v) => `[${v.timestamp}] ${v.reason}`),
    };

    setLeaderboardEntries((prev) => [
      newEntry,
      ...prev.map((item) => ({ ...item, isCurrentUser: false })),
    ]);

    if (isExamStarted && examMode === 'exam') {
      if (result.totalScore >= 5.0) {
        playCorrectSound();
      } else {
        playWrongSound();
      }
      playSubmitFanfare();
    }
    setAudioEnabled(false);

    // Scroll to results
    setTimeout(() => {
      resultReportRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Reset exam
  const handleResetExam = () => {
    stopSpeech();
    resetSessionState(currentExam);
  };

  // Leaderboard helpers
  const handleAddManualLeaderboardEntry = (
    entry: Omit<LeaderboardEntry, 'id' | 'submittedAt'>
  ) => {
    const created: LeaderboardEntry = {
      ...entry,
      id: `manual-${Date.now()}`,
      submittedAt: new Date().toISOString(),
    };
    setLeaderboardEntries((prev) => [
      created,
      ...prev.map((item) => ({ ...item, isCurrentUser: false })),
    ]);
  };

  const handleDeleteLeaderboardEntry = (id: string) => {
    setLeaderboardEntries((prev) => prev.filter((item) => item.id !== id));
  };

  const handleResetLeaderboardDefault = () => {
    setLeaderboardEntries(INITIAL_LEADERBOARD_ENTRIES);
  };

  const sortedAllEntries = useMemo(() => {
    return sortLeaderboardEntries(leaderboardEntries);
  }, [leaderboardEntries]);

  const currentUserRankPosition = useMemo(() => {
    const idx = sortedAllEntries.findIndex((e) => e.isCurrentUser);
    return idx >= 0 ? idx + 1 : undefined;
  }, [sortedAllEntries]);

  // Navigation scroll helper
  const handleNavigateQuestion = (part: ExamPart, index: number) => {
    setActiveFilterPart('all');
    setTimeout(() => {
      const el = document.getElementById(`q-${part}-${index}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 50);
  };

  // Count answered questions accurately
  const totalAnswered = useMemo(() => {
    const p1Count = Object.keys(answers.part1).length;
    let p2Count = 0;
    currentExam.part2.forEach((q) => {
      const a = answers.part2[q.id];
      if (a && a.a !== null && a.b !== null && a.c !== null && a.d !== null) {
        p2Count++;
      }
    });
    const p3Count = Object.values(answers.part3).filter((v) => v.trim().length > 0).length;
    const p4Count = (currentExam.part4 || []).filter(
      (q) => interactedPart4.has(q.id) || isSubmitted
    ).length;
    return p1Count + p2Count + p3Count + p4Count;
  }, [answers, currentExam, interactedPart4, isSubmitted]);

  return (
    <div className="min-h-screen bg-[#040817] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Header */}
      <Header
        currentExam={currentExam}
        allExams={allExams}
        onSelectExam={handleSelectExam}
        onDeleteExam={handleDeleteExam}
        examMode={examMode}
        onToggleExamMode={() => setExamMode((m) => (m === 'exam' ? 'practice' : 'exam'))}
        isStarted={isExamStarted}
        onStartExam={handleStartExam}
        isSubmitted={isSubmitted}
        onSubmitExam={() => setShowSubmitConfirm(true)}
        onResetExam={handleResetExam}
        onOpenLessons={() => setIsLessonModalOpen(true)}
        onOpenImportWord={() => setIsImportWordOpen(true)}
        onOpenLeaderboard={() => setIsLeaderboardOpen(true)}
        leaderboardCount={leaderboardEntries.length}
        fontSize={fontSize}
        onChangeFontSize={setFontSize}
        isOnline={isOnline}
        onOpenPWAInfo={() => setIsPWAInfoOpen(true)}
      />

      {/* Offline Banner Notification (hiển thị gọn gàng khi thiết bị tắt Wi-Fi / 4G) */}
      {!isOnline && (
        <div className="bg-amber-500/20 border-b border-amber-400/40 px-3 py-1.5 text-center text-xs text-amber-200 flex items-center justify-center gap-2 no-print">
          <WifiOff className="w-3.5 h-3.5 text-amber-300 shrink-0" />
          <span>
            <strong>Chế độ Không Wi-Fi (Offline):</strong> Toàn bộ câu hỏi, công thức Toán và đáp án
            đang được lưu an toàn trực tiếp trên điện thoại.
          </span>
        </div>
      )}

      {/* Thanh trạng thái làm bài, đồng hồ 90:00 và nút Bắt đầu / Nộp bài */}
      <div className="bg-[#071126] border-b border-sky-950 shadow-md">
        <div className="max-w-7xl mx-auto px-2.5 sm:px-6 py-2.5 sm:py-3 flex flex-wrap items-center justify-between gap-2.5 sm:gap-4">
          <div className="flex items-center gap-2 flex-wrap">
            {/* Chỉ hiển thị thông tin học sinh sau khi đã bắt đầu làm bài */}
            {isExamStarted && (
              <button
                type="button"
                onClick={() => setIsStudentModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#0b1739] hover:bg-sky-900/80 text-sky-200 border border-sky-700/70 transition-colors"
                title="Nhấn để cập nhật Họ và tên / Lớp"
              >
                <UserCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>
                  {studentName.trim()
                    ? `${studentName.trim()} (${studentClass.trim() || '11A1'})`
                    : 'Học sinh Lớp 11'}
                </span>
              </button>
            )}

            {isSubmitted ? (
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40">
                Đã nộp bài
              </span>
            ) : isExamStarted ? (
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1.5 animate-pulse">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                Đang làm bài
              </span>
            ) : null}

            {/* Mục Báo Vi Phạm (hiển thị khi học sinh đang làm bài hoặc đã nộp bài) */}
            {(isExamStarted || isSubmitted) && (
              <button
                type="button"
                onClick={() => setIsViolationModalOpen(true)}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border transition-all ${
                  violations.length > 0
                    ? 'bg-rose-500/25 hover:bg-rose-500/35 text-rose-200 border-rose-400/80 shadow-md shadow-rose-950/60 animate-pulse'
                    : 'bg-sky-950/80 hover:bg-sky-900/80 text-cyan-300 border-cyan-500/40'
                }`}
                title="Nhấn để xem nhật ký giám sát chống mở tab khác / dùng AI giải bài"
              >
                {violations.length > 0 ? (
                  <>
                    <ShieldAlert className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                    <span>Báo vi phạm: {violations.length} lần</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Báo vi phạm: 0</span>
                  </>
                )}
              </button>
            )}

            {allExams.length === 0 && (
              <button
                type="button"
                onClick={handleRestoreDefaultExam}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-bold transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Khôi phục đề mặc định</span>
              </button>
            )}
          </div>

          {/* Exam Timer & Start / Submit Button (Desktop; trên điện thoại đã có thanh cố định phía dưới) */}
          <div className="hidden lg:flex items-center gap-2.5 sm:gap-3 w-full sm:w-auto justify-end ml-auto shrink-0">
            {examMode === 'exam' && isExamStarted && !isSubmitted && (
              <Timer
                initialMinutes={currentExam.durationMinutes}
                isRunning={isExamStarted && !isSubmitted}
                onTimeUp={handleFinalSubmit}
                resetKey={`${currentExam.id}-${examSessionKey}`}
                onElapsedChange={setTimerElapsedSeconds}
              />
            )}

            {!isSubmitted &&
              (!isExamStarted ? (
                <button
                  onClick={handleStartExam}
                  className="flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs font-bold text-[#071126] bg-gradient-to-r from-emerald-400 to-teal-300 hover:from-emerald-300 hover:to-teal-200 shadow-md shadow-emerald-950/60 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Bắt Đầu Làm Bài</span>
                </button>
              ) : (
                <button
                  onClick={() => setShowSubmitConfirm(true)}
                  className="flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-950/60 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>
                    Nộp Bài ({totalAnswered}/{totalExamQuestions} câu)
                  </span>
                </button>
              ))}
          </div>
        </div>
      </div>

      {/* Main Content Layout: tối ưu khoảng cách lề trên điện thoại (px-2.5) để khung câu hỏi to rõ vừa màn hình */}
      <main className="max-w-7xl mx-auto px-2.5 sm:px-6 py-4 sm:py-6 pb-24 lg:pb-10 flex-1 w-full">

        {/* Results Report on Top if Submitted */}
        {isSubmitted && scoreDetail && (
          <div ref={resultReportRef} className="mb-8">
            <ResultReport
              scoreDetail={scoreDetail}
              examTitle={currentExam.title}
              studentName={studentName}
              studentClass={studentClass}
              durationSeconds={submittedDurationSeconds}
              rankPosition={currentUserRankPosition}
              totalRanked={leaderboardEntries.length}
              violations={violations}
              onOpenViolationLog={() => setIsViolationModalOpen(true)}
              onResetExam={handleResetExam}
              onScrollToQuestions={() => {
                questionsContainerRef.current?.scrollIntoView({ behavior: 'smooth' });
              }}
              onOpenLeaderboard={() => setIsLeaderboardOpen(true)}
            />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Questions Container (8-9 Cols) */}
          <div ref={questionsContainerRef} className="lg:col-span-8 xl:col-span-9 space-y-6">
            {/* Part Filter Tabs & Support Tools Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3 no-print">
              <div className="flex items-center gap-1.5 sm:gap-2 p-1.5 bg-[#071126] border border-sky-900/60 rounded-2xl overflow-x-auto no-scrollbar text-xs font-bold shadow-lg">
                <button
                  onClick={() => setActiveFilterPart('all')}
                  className={`min-h-[38px] px-3 sm:px-3.5 py-2 rounded-xl transition-all whitespace-nowrap ${
                    activeFilterPart === 'all'
                      ? 'bg-cyan-500 text-[#071126] font-black shadow-md'
                      : 'text-sky-300 hover:text-white hover:bg-sky-950/60'
                  }`}
                >
                  Tất cả ({totalExamQuestions})
                </button>
                <button
                  onClick={() => setActiveFilterPart('part1')}
                  className={`min-h-[38px] px-3 py-2 rounded-xl transition-all whitespace-nowrap ${
                    activeFilterPart === 'part1'
                      ? 'bg-cyan-500 text-[#071126] font-black shadow-md'
                      : 'text-sky-300 hover:text-white hover:bg-sky-950/60'
                  }`}
                >
                  Phần I ({currentExam.part1.length})
                </button>
                <button
                  onClick={() => setActiveFilterPart('part2')}
                  className={`min-h-[38px] px-3 py-2 rounded-xl transition-all whitespace-nowrap ${
                    activeFilterPart === 'part2'
                      ? 'bg-cyan-500 text-[#071126] font-black shadow-md'
                      : 'text-sky-300 hover:text-white hover:bg-sky-950/60'
                  }`}
                >
                  Phần II ({currentExam.part2.length})
                </button>
                <button
                  onClick={() => setActiveFilterPart('part3')}
                  className={`min-h-[38px] px-3 py-2 rounded-xl transition-all whitespace-nowrap ${
                    activeFilterPart === 'part3'
                      ? 'bg-cyan-500 text-[#071126] font-black shadow-md'
                      : 'text-sky-300 hover:text-white hover:bg-sky-950/60'
                  }`}
                >
                  Phần III ({currentExam.part3.length})
                </button>
                {currentExam.part4 && currentExam.part4.length > 0 && (
                  <button
                    onClick={() => setActiveFilterPart('part4')}
                    className={`min-h-[38px] px-3 py-2 rounded-xl transition-all whitespace-nowrap ${
                      activeFilterPart === 'part4'
                        ? 'bg-cyan-500 text-[#071126] font-black shadow-md'
                        : 'text-sky-300 hover:text-white hover:bg-sky-950/60'
                    }`}
                  >
                    Phần IV ({currentExam.part4.length})
                  </button>
                )}
              </div>

              {/* Điều chỉnh cỡ chữ đề thi */}
              <div className="flex items-center justify-end gap-2">
                <div className="flex items-center bg-[#071126] border border-sky-900/70 rounded-xl p-1 text-xs">
                  {(
                    [
                      { id: 'normal', label: 'A' },
                      { id: 'large', label: 'A+' },
                      { id: 'xlarge', label: 'A++' },
                    ] as const
                  ).map((sz) => (
                    <button
                      key={sz.id}
                      type="button"
                      onClick={() => setFontSize(sz.id)}
                      className={`min-w-[32px] min-h-[30px] px-2 py-1 rounded-lg font-bold transition-colors ${
                        fontSize === sz.id
                          ? 'bg-cyan-500 text-[#040817]'
                          : 'text-sky-300 hover:text-white'
                      }`}
                      title="Thay đổi cỡ chữ đề thi"
                    >
                      {sz.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Phần I: Trắc nghiệm */}
            {(activeFilterPart === 'all' || activeFilterPart === 'part1') && (
              <section id="section-part1">
                <Part1MultipleChoice
                  questions={currentExam.part1}
                  selectedAnswers={answers.part1}
                  onSelectAnswer={(qId, optKey) => {
                    if (!ensureExamStarted()) return;
                    setAnswers((prev) => ({
                      ...prev,
                      part1: { ...prev.part1, [qId]: optKey },
                    }));
                  }}
                  isSubmitted={isSubmitted}
                  examMode={examMode}
                  bookmarkedQuestions={bookmarkedQuestions}
                  onToggleBookmark={toggleBookmark}
                  fontSize={fontSize}
                  totalQuestions={totalExamQuestions}
                />
              </section>
            )}

            {/* Phần II: Đúng / Sai */}
            {(activeFilterPart === 'all' || activeFilterPart === 'part2') && (
              <section id="section-part2">
                <Part2TrueFalse
                  questions={currentExam.part2}
                  answers={answers.part2}
                  onSelectStatement={(qId, label, val) => {
                    if (!ensureExamStarted()) return;
                    setAnswers((prev) => ({
                      ...prev,
                      part2: {
                        ...prev.part2,
                        [qId]: {
                          ...prev.part2[qId],
                          [label]: val,
                        },
                      },
                    }));
                  }}
                  isSubmitted={isSubmitted}
                  examMode={examMode}
                  bookmarkedQuestions={bookmarkedQuestions}
                  onToggleBookmark={toggleBookmark}
                  fontSize={fontSize}
                  totalQuestions={totalExamQuestions}
                />
              </section>
            )}

            {/* Phần III: Trả lời ngắn */}
            {(activeFilterPart === 'all' || activeFilterPart === 'part3') && (
              <section id="section-part3">
                <Part3ShortAnswer
                  questions={currentExam.part3}
                  answers={answers.part3}
                  onAnswerChange={(qId, val) => {
                    if (!ensureExamStarted()) return;
                    setAnswers((prev) => ({
                      ...prev,
                      part3: { ...prev.part3, [qId]: val },
                    }));
                  }}
                  isSubmitted={isSubmitted}
                  examMode={examMode}
                  bookmarkedQuestions={bookmarkedQuestions}
                  onToggleBookmark={toggleBookmark}
                  fontSize={fontSize}
                  totalQuestions={totalExamQuestions}
                />
              </section>
            )}

            {/* Phần IV: Tự luận ghép bước */}
            {currentExam.part4 &&
              currentExam.part4.length > 0 &&
              (activeFilterPart === 'all' || activeFilterPart === 'part4') && (
                <section id="section-part4">
                  <Part4StepOrdering
                    questions={currentExam.part4}
                    answers={answers.part4}
                    onOrderChange={(qId, orderedIds) => {
                      if (!ensureExamStarted()) return;
                      setInteractedPart4((prev) => {
                        const next = new Set(prev);
                        next.add(qId);
                        return next;
                      });
                      setAnswers((prev) => ({
                        ...prev,
                        part4: { ...prev.part4, [qId]: orderedIds },
                      }));
                    }}
                    isSubmitted={isSubmitted}
                    examMode={examMode}
                    bookmarkedQuestions={bookmarkedQuestions}
                    onToggleBookmark={toggleBookmark}
                    fontSize={fontSize}
                    totalQuestions={totalExamQuestions}
                  />
                </section>
              )}
          </div>

          {/* Right Column: Sticky Question Bubble Navigator + Leaderboard Widget (3-4 Cols) */}
          <div className="lg:col-span-4 xl:col-span-3 sticky top-20 space-y-4 no-print">
            <QuestionNav
              exam={currentExam}
              answers={answers}
              currentSection={activeFilterPart === 'all' ? 'part1' : activeFilterPart}
              onNavigate={handleNavigateQuestion}
              bookmarkedQuestions={bookmarkedQuestions}
              onToggleBookmark={toggleBookmark}
              isSubmitted={isSubmitted}
              isStarted={isExamStarted}
              interactedPart4={interactedPart4}
              studentName={studentName}
              studentClass={studentClass}
              onEditStudentInfo={() => setIsStudentModalOpen(true)}
            />
          </div>
        </div>
      </main>

      {/* Bảng 2 dòng điền Họ tên và Lớp khi học sinh nhấn Bắt Đầu Làm Bài */}
      {isStudentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#071126] rounded-2xl max-w-md w-full p-5 sm:p-6 shadow-2xl border border-cyan-500/40 space-y-4 text-white">
            <div className="flex items-center justify-between gap-3 border-b border-sky-900/80 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-[#040817] shadow-md">
                  <UserCheck className="w-5 h-5 stroke-[2.2]" />
                </div>
                <h3 className="text-base font-extrabold text-white">
                  Thông Tin Thí Sinh
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsStudentModalOpen(false)}
                className="p-1.5 rounded-xl bg-[#0b1739] text-sky-300 hover:text-white border border-sky-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {studentInfoError && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-950/80 border border-rose-500/50 text-rose-200 text-xs font-semibold">
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{studentInfoError}</span>
              </div>
            )}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!studentName.trim() || !studentClass.trim()) {
                  setStudentInfoError('Vui lòng nhập đầy đủ Họ và tên học sinh và Lớp.');
                  return;
                }
                setStudentInfoError('');
                setIsStudentModalOpen(false);
                if (!isExamStarted && !isSubmitted) {
                  examStartTimeRef.current = Date.now();
                  setIsExamStarted(true);
                  setAudioEnabled(examMode === 'exam');
                }
              }}
              className="space-y-4"
            >
              {/* Bảng 2 dòng điền Họ và tên & Lớp */}
              <div className="overflow-hidden rounded-xl border border-sky-800/90 bg-[#0b1739]/80 divide-y divide-sky-800/90">
                {/* Dòng 1: Họ và tên */}
                <div className="grid grid-cols-12 items-center">
                  <label
                    htmlFor="student-name-input"
                    className="col-span-4 px-3.5 py-3 text-xs sm:text-sm font-bold text-sky-200 bg-[#08132f] border-r border-sky-800/90"
                  >
                    Họ và tên <span className="text-rose-400">*</span>
                  </label>
                  <div className="col-span-8 px-3 py-2">
                    <input
                      id="student-name-input"
                      ref={studentNameInputRef}
                      type="text"
                      autoFocus
                      value={studentName}
                      onChange={(e) => {
                        setStudentName(e.target.value);
                        if (studentInfoError) setStudentInfoError('');
                      }}
                      placeholder="Nhập họ và tên học sinh..."
                      className="w-full px-2.5 py-1.5 rounded-lg bg-[#071126] border border-sky-700/80 text-sm font-semibold text-white placeholder-sky-400/50 focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                {/* Dòng 2: Lớp */}
                <div className="grid grid-cols-12 items-center">
                  <label
                    htmlFor="student-class-input"
                    className="col-span-4 px-3.5 py-3 text-xs sm:text-sm font-bold text-sky-200 bg-[#08132f] border-r border-sky-800/90"
                  >
                    Lớp <span className="text-rose-400">*</span>
                  </label>
                  <div className="col-span-8 px-3 py-2">
                    <input
                      id="student-class-input"
                      type="text"
                      value={studentClass}
                      onChange={(e) => {
                        setStudentClass(e.target.value);
                        if (studentInfoError) setStudentInfoError('');
                      }}
                      placeholder="Ví dụ: 11A1"
                      className="w-full px-2.5 py-1.5 rounded-lg bg-[#071126] border border-sky-700/80 text-sm font-semibold text-amber-300 placeholder-sky-400/50 focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={() => setIsStudentModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-sky-300 hover:bg-sky-950 transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-black text-[#040817] bg-gradient-to-r from-emerald-400 to-teal-300 hover:from-emerald-300 hover:to-teal-200 shadow-lg transition-all"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>
                    {!isExamStarted && !isSubmitted
                      ? 'Vào Làm Bài'
                      : 'Lưu Thông Tin'}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirmation Modal Before Submit */}
      {showSubmitConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#071126] rounded-2xl max-w-md w-full p-6 shadow-2xl border border-sky-800 space-y-4 text-white">
            <div className="flex items-center gap-3 text-amber-400">
              <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Xác Nhận Nộp Bài Thi?</h3>
                <p className="text-xs text-sky-300">
                  Kiểm tra tiến độ làm bài & thông tin ghi danh Bảng Xếp Hạng
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#0b1739] border border-sky-900 text-xs space-y-2 text-slate-200">
              <div className="flex justify-between">
                <span>Số câu đã hoàn thành:</span>
                <span className="font-bold font-mono text-cyan-300">
                  {totalAnswered}/{totalExamQuestions} câu
                </span>
              </div>
              <div className="flex justify-between">
                <span>Số câu còn bỏ trống:</span>
                <span className="font-bold font-mono text-rose-400">
                  {totalExamQuestions - totalAnswered} câu
                </span>
              </div>
              <div className="flex justify-between">
                <span>Câu đánh dấu xem lại:</span>
                <span className="font-bold font-mono text-amber-300">
                  {bookmarkedQuestions.size} câu
                </span>
              </div>
              <div className="flex justify-between pt-1 border-t border-sky-900/80">
                <span>Vi phạm quy chế (mở tab / dùng AI):</span>
                <span
                  className={`font-bold font-mono ${
                    violations.length > 0 ? 'text-rose-400' : 'text-emerald-400'
                  }`}
                >
                  {violations.length} lần
                </span>
              </div>
            </div>

            {/* Thông tin học sinh ghi danh Bảng xếp hạng */}
            <div className="p-4 rounded-xl bg-[#0b1739] border border-amber-500/30 space-y-3">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
                <User className="w-3.5 h-3.5" />
                <span>Thông tin thí sinh ghi danh Bảng Xếp Hạng:</span>
              </div>
              <div className="grid grid-cols-3 gap-2.5">
                <div className="col-span-2">
                  <label className="block text-[11px] text-sky-300 mb-1">Họ và tên học sinh</label>
                  <input
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="Nhập họ và tên..."
                    className="w-full px-3 py-1.5 rounded-lg bg-[#071126] border border-sky-800 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-sky-300 mb-1">Lớp</label>
                  <input
                    type="text"
                    value={studentClass}
                    onChange={(e) => setStudentClass(e.target.value)}
                    placeholder="11A1"
                    className="w-full px-3 py-1.5 rounded-lg bg-[#071126] border border-sky-800 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Sau khi nộp bài, hệ thống sẽ tự động chấm điểm, lưu kết quả vào Bảng xếp hạng và hiển thị toàn bộ lời giải chi tiết.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowSubmitConfirm(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:bg-sky-950 transition-colors"
              >
                Tiếp tục làm bài
              </button>
              <button
                onClick={handleFinalSubmit}
                className="px-4 py-2 rounded-xl text-xs font-bold text-[#071126] bg-cyan-400 hover:bg-cyan-300 shadow-md transition-colors"
              >
                Đồng ý nộp bài
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Cảnh Báo & Nhật Ký Báo Vi Phạm Quy Chế Thi (Mở tab khác / Khoá màn hình / Che góc màn hình dùng AI) */}
      {isViolationModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#071126] rounded-2xl max-w-lg w-full p-5 sm:p-6 shadow-2xl border-2 border-rose-500/80 space-y-4 text-white">
            <div className="flex items-start justify-between gap-3 border-b border-rose-900/60 pb-3.5">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-rose-500/20 border border-rose-400/60 flex items-center justify-center text-rose-400 shrink-0 animate-pulse">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-extrabold text-rose-300 uppercase tracking-wide">
                    Báo Cáo Giám Sát Vi Phạm Quy Chế
                  </h3>
                  <p className="text-xs text-sky-300 mt-0.5">
                    Hệ thống chống mở tab khác, khoá màn hình hoặc che góc màn hình dùng AI
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsViolationModalOpen(false)}
                className="p-1.5 rounded-xl bg-[#0b1739] text-sky-300 hover:text-white border border-sky-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {latestViolation && violations.length > 0 && (
              <div className="p-3.5 rounded-xl bg-rose-950/80 border border-rose-500/70 space-y-1.5">
                <div className="flex items-center justify-between text-xs font-extrabold text-rose-300">
                  <span>⚠️ CẢNH BÁO VI PHẠM LẦN THỨ {violations.length}</span>
                  <span className="font-mono">{latestViolation.timestamp}</span>
                </div>
                <p className="text-xs sm:text-sm font-bold text-white leading-relaxed">
                  {latestViolation.reason}
                </p>
                <p className="text-[11px] text-rose-200/90">
                  Mọi hành vi chuyển tab, khoá màn hình, chia đôi màn hình hoặc mở cửa sổ nổi AI che góc màn hình đều được ghi nhận tự động vào kết quả bài thi.
                </p>
              </div>
            )}

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-sky-300">
                <span>
                  Thí sinh: <strong className="text-white">{studentName.trim() || 'Học sinh'}</strong> ({studentClass.trim() || '11A1'})
                </span>
                <span
                  className={`px-2.5 py-0.5 rounded-full font-mono ${
                    violations.length > 0
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                      : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  }`}
                >
                  Tổng: {violations.length} lần vi phạm
                </span>
              </div>

              <div className="max-h-56 overflow-y-auto rounded-xl border border-sky-900 bg-[#0b1739]/80 divide-y divide-sky-900/70">
                {violations.length === 0 ? (
                  <div className="p-6 text-center space-y-1.5">
                    <ShieldCheck className="w-8 h-8 text-emerald-400 mx-auto" />
                    <div className="text-xs sm:text-sm font-bold text-emerald-300">
                      Chưa phát hiện hành vi vi phạm quy chế nào!
                    </div>
                    <p className="text-xs text-sky-300">
                      Hệ thống đang giám sát liên tục. Vui lòng giữ nguyên màn hình làm bài, không chuyển tab hoặc mở ứng dụng AI đè lên góc màn hình.
                    </p>
                  </div>
                ) : (
                  violations.map((v, idx) => (
                    <div key={v.id} className="p-3 text-xs space-y-1">
                      <div className="flex items-center justify-between font-bold">
                        <span className="text-rose-300">
                          Lần #{violations.length - idx}
                        </span>
                        <span className="font-mono text-sky-300">
                          Lúc {v.timestamp} (Phút thứ {Math.floor(v.elapsedSeconds / 60) + 1})
                        </span>
                      </div>
                      <div className="text-slate-100 font-medium">{v.reason}</div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-1">
              <button
                type="button"
                onClick={() => setIsViolationModalOpen(false)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-400 hover:to-amber-400 text-[#040817] font-black text-xs sm:text-sm shadow-lg transition-all"
              >
                Tôi đã hiểu & Quay lại làm bài nghiêm túc
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Import Word Modal */}
      <ImportWordModal
        isOpen={isImportWordOpen}
        onClose={() => setIsImportWordOpen(false)}
        onApplyExam={handleApplyWordExam}
        defaultTitle="Đề tự luyện"
      />

      {/* Leaderboard Modal */}
      <LeaderboardModal
        isOpen={isLeaderboardOpen}
        onClose={() => setIsLeaderboardOpen(false)}
        entries={leaderboardEntries}
        allExams={allExams}
        selectedExamId={selectedExamId}
        defaultStudentName={studentName}
        defaultStudentClass={studentClass}
        onAddManualEntry={handleAddManualLeaderboardEntry}
        onDeleteEntry={handleDeleteLeaderboardEntry}
        onResetDefault={handleResetLeaderboardDefault}
      />

      {/* Danh Mục Bài Học & Đề Ôn (22 câu) theo SGK Toán 11 */}
      <LessonCatalogModal
        isOpen={isLessonModalOpen}
        onClose={() => setIsLessonModalOpen(false)}
        chapters={textbookChapters}
        currentExamId={currentExam.id}
        onSelectPracticeExam={(examId) => {
          handleSelectExam(examId);
          setIsLessonModalOpen(false);
        }}
      />

      {/* PWA & Offline Info Modal */}
      <PWAInstallModal
        isOpen={isPWAInfoOpen}
        onClose={() => setIsPWAInfoOpen(false)}
        isOnline={isOnline}
        swReady={swReady}
        isInstalled={isInstalled}
        isIOS={isIOS}
        hasNativePrompt={hasNativePrompt}
        onPromptInstall={promptInstall}
      />

      {/* Mobile Question Navigator Bottom Sheet (chỉ hiện khi bấm nút Phiếu Trả Lời trên điện thoại) */}
      {isMobileNavOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex flex-col justify-end bg-black/75 backdrop-blur-sm animate-fadeIn no-print">
          <div
            className="flex-1"
            onClick={() => setIsMobileNavOpen(false)}
          />
          <div className="bg-[#071126] border-t border-cyan-500/40 rounded-t-3xl p-4 pb-safe max-h-[82vh] overflow-y-auto space-y-3 shadow-2xl">
            <div className="w-10 h-1.5 bg-sky-800 rounded-full mx-auto mb-1" />
            <div className="flex items-center justify-between pb-2 border-b border-sky-900/80">
              <div className="flex items-center gap-2">
                <LayoutGrid className="w-4 h-4 text-cyan-400" />
                <span className="text-sm font-extrabold text-white">
                  Chuyển Nhanh Câu Hỏi & Tiện Ích
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsMobileNavOpen(false)}
                className="min-w-[40px] min-h-[40px] rounded-xl bg-[#0b1739] text-sky-300 hover:text-white border border-sky-800 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick mode switch on mobile */}
            <div>
              <button
                type="button"
                onClick={() => setExamMode((m) => (m === 'exam' ? 'practice' : 'exam'))}
                className={`w-full min-h-[42px] px-3 py-2 rounded-xl text-xs font-bold border flex items-center justify-center gap-1.5 ${
                  examMode === 'exam'
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{examMode === 'exam' ? 'Chế độ: Thi Tính Giờ' : 'Chế độ: Luyện Tập'}</span>
              </button>
            </div>

            <QuestionNav
              exam={currentExam}
              answers={answers}
              currentSection={activeFilterPart === 'all' ? 'part1' : activeFilterPart}
              onNavigate={(part, index) => {
                setIsMobileNavOpen(false);
                handleNavigateQuestion(part, index);
              }}
              bookmarkedQuestions={bookmarkedQuestions}
              onToggleBookmark={toggleBookmark}
              isSubmitted={isSubmitted}
              isStarted={isExamStarted}
              interactedPart4={interactedPart4}
              studentName={studentName}
              studentClass={studentClass}
              onEditStudentInfo={() => {
                setIsMobileNavOpen(false);
                setIsStudentModalOpen(true);
              }}
            />
          </div>
        </div>
      )}

      {/* Thanh Điều Hướng Nhanh Cố Định Đáy Màn Hình Điện Thoại (lg:hidden) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-[#070f24]/95 backdrop-blur-md border-t border-sky-900/80 px-3 py-2 pb-safe shadow-2xl no-print">
        <div className="max-w-lg mx-auto flex items-center justify-between gap-2">
          {/* Nút Mở Phiếu Trả Lời Nhanh */}
          <button
            type="button"
            onClick={() => setIsMobileNavOpen(true)}
            className="min-h-[44px] px-3.5 py-2 rounded-xl bg-[#0b1739] hover:bg-sky-900 border border-sky-700/80 text-white flex items-center gap-2 text-xs font-bold active:scale-95 transition-transform"
          >
            <LayoutGrid className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>
              Phiếu TL:{' '}
              <strong className="text-amber-300 font-mono">
                {totalAnswered}/{totalExamQuestions}
              </strong>
            </span>
          </button>

          {/* Hiển thị thời gian đã làm / trạng thái ở giữa trên ĐT */}
          {isExamStarted && !isSubmitted && (
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-sky-950/80 border border-sky-800/70 text-cyan-300 font-mono text-xs font-bold">
              <Clock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>
                {Math.floor(
                  Math.max(0, currentExam.durationMinutes * 60 - timerElapsedSeconds) / 60
                )
                  .toString()
                  .padStart(2, '0')}
                :
                {(Math.max(0, currentExam.durationMinutes * 60 - timerElapsedSeconds) % 60)
                  .toString()
                  .padStart(2, '0')}
              </span>
            </div>
          )}

          {/* Nút Hành Động Chính (Bắt Đầu / Nộp Bài / Làm Lại) */}
          {isSubmitted ? (
            <button
              type="button"
              onClick={handleResetExam}
              className="min-h-[44px] px-4 py-2 rounded-xl bg-cyan-500 text-[#040817] font-black text-xs flex items-center gap-1.5 shadow-md active:scale-95"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Làm Lại</span>
            </button>
          ) : !isExamStarted ? (
            <button
              type="button"
              onClick={handleStartExam}
              className="flex-1 min-h-[44px] px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-300 text-[#040817] font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-md active:scale-95"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Bắt Đầu Làm Bài</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setShowSubmitConfirm(true)}
              className="min-h-[44px] px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs sm:text-sm flex items-center gap-1.5 shadow-md active:scale-95"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Nộp Bài</span>
            </button>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-8 bg-[#030612] border-t border-sky-950 text-slate-400 py-6 pb-24 lg:pb-6 text-xs no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white">GV Thanhbtx-mn</span>
          </div>
          <div className="text-sky-300/80 text-center sm:text-right">
            Hệ thống luyện thi & Đánh giá năng lực Toán học trực tuyến (Hỗ trợ Offline Mọi Điện Thoại)
          </div>
        </div>
      </footer>
    </div>
  );
}
