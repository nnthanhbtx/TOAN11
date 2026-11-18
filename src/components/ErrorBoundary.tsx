import React from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

interface ErrorBoundaryState {
  hasError: boolean;
  message: string;
}

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, message: '' };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      message: error?.message || 'Đã xảy ra sự cố hiển thị.',
    };
  }

  componentDidCatch(error: Error) {
    console.error('App ErrorBoundary caught:', error);
  }

  handleReload = () => {
    this.setState({ hasError: false, message: '' });
    window.location.reload();
  };

  handleClearAndRecover = async () => {
    try {
      localStorage.removeItem('math11_active_progress_v2');
      localStorage.removeItem('math11_custom_exams_v2');
      sessionStorage.clear();
    } catch {
      // ignore
    }
    try {
      if ('serviceWorker' in navigator && navigator.serviceWorker.getRegistrations) {
        const regs = await navigator.serviceWorker.getRegistrations();
        await Promise.all(regs.map((r) => r.unregister()));
      }
      if ('caches' in window && caches.keys) {
        const keys = await caches.keys();
        await Promise.all(keys.map((k) => caches.delete(k)));
      }
    } catch {
      // ignore
    }
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen min-h-[100dvh] bg-[#040817] text-white flex items-center justify-center p-5">
          <div className="max-w-md w-full rounded-2xl bg-[#071126] border border-cyan-500/40 p-6 text-center space-y-4 shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/50 flex items-center justify-center mx-auto text-amber-300">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-extrabold text-white">
              Khôi phục phiên làm việc Toán 11
            </h2>
            <p className="text-xs sm:text-sm text-sky-200 leading-relaxed">
              Trình duyệt trên thiết bị vừa làm mới bộ nhớ hiển thị. Tiến độ làm bài của bạn đã được lưu tự động.
            </p>
            <div className="space-y-2.5">
              <button
                type="button"
                onClick={this.handleReload}
                className="w-full min-h-[44px] py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-400 to-teal-300 text-[#040817] font-black text-sm flex items-center justify-center gap-2 shadow-lg"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Tải lại ứng dụng ngay</span>
              </button>
              <button
                type="button"
                onClick={this.handleClearAndRecover}
                className="w-full min-h-[40px] py-2 px-4 rounded-xl bg-[#0b1739] border border-sky-800 text-sky-300 hover:text-white font-bold text-xs transition-colors"
              >
                Làm mới bộ nhớ đệm Safari & Khôi phục
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
