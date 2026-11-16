import {createRoot} from 'react-dom/client';
import {registerSW} from 'virtual:pwa-register';
import App from './App.tsx';
import './index.css';

// Đăng ký Service Worker tự động lưu bộ nhớ đệm (Offline-First cho mọi điện thoại khi không có Wi-Fi)
registerSW({
  immediate: true,
});

createRoot(document.getElementById('root')!).render(<App />);

