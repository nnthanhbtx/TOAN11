import './polyfills';
import { createRoot } from 'react-dom/client';
import { registerSW } from 'virtual:pwa-register';
import App from './App.tsx';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';
import './index.css';

// Đăng ký Service Worker an toàn cho mọi iPhone (kể cả Safari chế độ riêng tư hoặc iOS cũ)
try {
  if ('serviceWorker' in navigator) {
    let isRefreshing = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (isRefreshing) return;
      try {
        if (sessionStorage.getItem('math11_sw_reloaded_v1')) return;
        sessionStorage.setItem('math11_sw_reloaded_v1', '1');
      } catch {
        // ignore
      }
      isRefreshing = true;
      window.location.reload();
    });

    const updateSW = registerSW({
      immediate: true,
      onNeedRefresh() {
        updateSW(true);
      },
      onRegisteredSW(_swUrl, registration) {
        if (registration && typeof registration.update === 'function') {
          registration.update().catch(() => {});
        }
      },
    });
  }
} catch {
  // Ignore SW registration errors on restricted WebKit contexts
}

createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
