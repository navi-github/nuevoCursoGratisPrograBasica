function iniciarJuego() { 
    let botonMascotaJugador = document.getElementById("boton-mascota");
    botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador);
}

function seleccionarMascotaJugador() {
    const inputHipodoge = document.getElementById('Hipodoge');
    const inputCapipego = document.getElementById('Capipego');
    const inputRatigueya = document.getElementById('Ratigueya');

    if(inputHipodoge.checked) {
        alert("Seleccionaste a Hipodoge");
    } 
    else if(inputCapipego.checked) {
        alert("Seleccionaste a Capipego");
    }
    else if(inputRatigueya.checked) {
        alert("Seleccionaste a Ratigueya");
    } else {
        alert("Por favor selecciona tu mascota");
    }
}

window.addEventListener('load',  iniciarJuego)