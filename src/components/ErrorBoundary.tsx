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

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#040817] text-white flex items-center justify-center p-5">
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
            <button
              type="button"
              onClick={this.handleReload}
              className="w-full min-h-[44px] py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-400 to-teal-300 text-[#040817] font-black text-sm flex items-center justify-center gap-2 shadow-lg"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Tải lại ứng dụng ngay</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
