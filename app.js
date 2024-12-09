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

// geolocation
if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            alert("Latitude:" +  String(position.coords.latitude) + ", Longitude: "+ String(position.coords.longitude));
            
            console.log("Latitude:", position.coords.latitude);
            console.log("Longitude:", position.coords.longitude);
        },
        (error) => alert("Error getting location:", error)
    );
} else {
    alert("Geolocation is not supported by this browser.");
}
