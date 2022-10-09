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

    seleccionaMascotaEnemigo();
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function seleccionaMascotaEnemigo() {
    let ataqueAleatorio = aleatorio(1,3);
    const mascotaEnemigo = document.getElementById('mascotaEnemigo');

    if (ataqueAleatorio == 1) { 
        mascotaEnemigo.innerHTML = "Hipodoge";
    } else if (ataqueAleatorio == 2) {
        mascotaEnemigo.innerHTML = "Capipego";
    } else {
        mascotaEnemigo.innerHTML = "Ratigueya";
    }
}

window.addEventListener('load',  iniciarJuego)