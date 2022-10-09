function iniciarJuego() { 
    let botonMascotaJugador = document.getElementById("boton-mascota");
    botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador);
}

function seleccionarMascotaJugador() {
    const inputHipodoge = document.getElementById('Hipodoge');
    const inputCapipego = document.getElementById('Capipego');
    const inputRatigueya = document.getElementById('Ratigueya');

    const mascotaJugador = document.getElementById('mascotaJugador')

    if(inputHipodoge.checked) {
        // alert("Seleccionaste a Hipodoge");
        mascotaJugador.innerHTML = "Hipodoge";
    } 
    else if(inputCapipego.checked) {
        // alert("Seleccionaste a Capipego");
        mascotaJugador.innerHTML = "Capipego";
    }
    else if(inputRatigueya.checked) {
        // alert("Seleccionaste a Ratigueya");
        mascotaJugador.innerHTML = "Ratigueya";
    } else {
        alert("Por favor selecciona tu mascota");
    }
}

window.addEventListener('load',  iniciarJuego)