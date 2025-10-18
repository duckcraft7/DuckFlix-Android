document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    document.addEventListener("backbutton", handleBackButton, false);
}

function handleBackButton(event) {
    const currentPage = window.location.pathname.split("/").pop();

    if (currentPage === 'player.html') {
        event.preventDefault();
        window.location.replace('home.html'); // Volta para home
    } else if (currentPage === 'home.html') {
        event.preventDefault();
        navigator.app.exitApp(); // Fecha o app
    } else if (currentPage === 'index.html') {
         event.preventDefault();
         navigator.app.exitApp(); // Fecha o app
    }
}
