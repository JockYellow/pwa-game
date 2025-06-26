if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js')
        .then(() => console.log('✅ Service Worker 已註冊'))
        .catch(err => console.error('❌ SW 註冊失敗', err));
    });
  }
  