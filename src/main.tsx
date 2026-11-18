import './polyfills';
import { createRoot } from 'react-dom/client';
import { registerSW } from 'virtual:pwa-register';
import App from './App.tsx';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';
import './index.css';

// Đăng ký Service Worker an toàn cho mọi iPhone (kể cả Safari chế độ riêng tư hoặc iOS cũ)
try {
  if ('serviceWorker' in navigator) {
    registerSW({
      immediate: true,
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
