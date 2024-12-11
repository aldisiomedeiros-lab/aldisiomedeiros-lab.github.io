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

document.addEventListener("DOMContentLoaded", () => {
    // Inicializa o mapa
    const map = L.map('map').setView([0, 0], 2); // Centro inicial genérico (0,0)

    // Adiciona um tile layer (mapa base) do OpenStreetMap
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Elemento para exibir mensagens
    const info = document.getElementById("info");

    // Verifica se a API de Geolocalização está disponível
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                // Atualiza o mapa para a localização do usuário
                map.setView([latitude, longitude], 13);

                // Adiciona um marcador no mapa
                const marker = L.marker([latitude, longitude]).addTo(map);
                marker.bindPopup("<b>Você está aqui!</b>").openPopup();

                // Exibe a latitude e longitude
                info.textContent = `Latitude: ${latitude.toFixed(6)}, Longitude: ${longitude.toFixed(6)}`;
            },
            (error) => {
                info.textContent = "Não foi possível acessar sua localização.";
                console.error("Geolocation error:", error);
            }
        );
    } else {
        info.textContent = "Geolocalização não suportada no navegador.";
    }
});

