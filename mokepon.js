function iniciarJuego() { 
    let botonMascotaJugador = document.getElementById("boton-mascota");
    botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador);
}

function seleccionarMascotaJugador() {
    alert("Seleccionaste tu mascota")
}

window.addEventListener('load',  iniciarJuego)