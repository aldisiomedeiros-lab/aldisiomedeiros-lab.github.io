// app.js

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
        .then((registration) => {
            console.log('Service Worker registrado no domínio:', registration.scope);
        })
        .catch((error) => {
            console.error('O registro do Service Worker falhou:', error);
        });
}
