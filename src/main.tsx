import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './pages/App.tsx';
import './index.css';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enLocale from './locales/locale_en.json';
import viLocale from './locales/locale_vi.json';
import { appConfig } from './appConfig.ts';
import { Provider } from 'react-redux';
import store from './redux/store.ts';
import { ConfigProvider } from 'antd';
// import { ToastContainer } from 'react-toastify';
// import ToastNotification from './components/toast-notify/index.tsx';

import GlobalToastContainer from './components/global-toast/index.tsx';
import { ToastProvider } from './context/ToastProvider';
import CountdownModal from './components/notify-new-request/index.tsx';

if (!localStorage.getItem('appConfig')) {
  localStorage.setItem('appConfig', JSON.stringify(appConfig));
}

const lang = JSON.parse(localStorage.getItem('appConfig') ?? '{}').defaultLanguage ?? 'vi';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enLocale,
      },
      vi: {
        translation: viLocale,
      },
    },
    lng: lang,
    fallbackLng: 'vi',
    interpolation: {
      escapeValue: false,
    },
  })
  .then();


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider >
      <Provider store={store}>
        <ToastProvider>
          <App />
          <CountdownModal />
          <GlobalToastContainer />
        </ToastProvider>
      </Provider>
    </ConfigProvider>
  </StrictMode>
);
