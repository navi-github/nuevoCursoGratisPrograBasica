let ataqueJugador;
let ataqueEnemigo;
let resultado;
let vidasEnemigo = 3;
let vidasJugador = 3;

function iniciarJuego() { 
    let botonMascotaJugador = document.getElementById("boton-mascota");
    botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador);

    let botonFuego = document.getElementById('boton-fuego');
    botonFuego.addEventListener('click', ataqueFuego);
    let botonAgua = document.getElementById('boton-agua');
    botonAgua.addEventListener('click', ataqueAgua);
    let botonTierra = document.getElementById('boton-tierra');
    botonTierra.addEventListener('click', ataqueTierra);
}

function seleccionarMascotaJugador() {
    const inputHipodoge = document.getElementById('Hipodoge');
    const inputCapipego = document.getElementById('Capipego');
    const inputRatigueya = document.getElementById('Ratigueya');

    const mascotaJugador = document.getElementById('mascotaJugador')

    if(inputHipodoge.checked) {
        mascotaJugador.innerHTML = "Hipodoge";
    } 
    else if(inputCapipego.checked) {
        mascotaJugador.innerHTML = "Capipego";
    }
    else if(inputRatigueya.checked) {
        mascotaJugador.innerHTML = "Ratigueya";
    } else {
        alert("Por favor selecciona tu mascota");
    }

    seleccionaMascotaEnemigo();
}

function crearMensaje() {
    let sectionMensajes = document.getElementById('mensajes')

    let parrafo = document.createElement('p')
    parrafo.innerHTML = 'Tu mascota atacó con ' + ataqueJugador + ' , la mascota del enemigo atacó con ' + ataqueEnemigo + ' - ' + resultado

    sectionMensajes.appendChild(parrafo)
}

function crearMensajeFinal(resultadoFinal) {
    let sectionMensajes = document.getElementById('mensajes')

    let parrafo = document.createElement('p')
    parrafo.innerHTML = resultadoFinal

    sectionMensajes.appendChild(parrafo)
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function seleccionaMascotaEnemigo() {
    let mascotaAleatoriaEnemigo = aleatorio(1,3);
    const mascotaEnemigo = document.getElementById('mascotaEnemigo');

    if (mascotaAleatoriaEnemigo == 1) { 
        mascotaEnemigo.innerHTML = "Hipodoge";
    } else if (mascotaAleatoriaEnemigo == 2) {
        mascotaEnemigo.innerHTML = "Capipego";
    } else {
        mascotaEnemigo.innerHTML = "Ratigueya";
    }
}

function ataqueFuego() {
    ataqueJugador = 'FUEGO';
    ataqueAleatorioEnemigo();
}

function ataqueAgua() {
    ataqueJugador = 'AGUA';
    ataqueAleatorioEnemigo();
}

function ataqueTierra() {
    ataqueJugador = 'TIERRA';
    ataqueAleatorioEnemigo();
}

function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(1,3);

    if(ataqueAleatorio == 1) {
        ataqueEnemigo = 'FUEGO'
    } else if (ataqueAleatorio == 2){
        ataqueEnemigo = 'AGUA'
    } else {
        ataqueEnemigo = 'TIERRA'
    }

    combate()
}

function combate() {
    let spanVidasJugador = document.getElementById('vidas-jugador');
    let spanVidasEnemigo = document.getElementById('vidas-enemigo');

    if(ataqueEnemigo == ataqueJugador) {
        resultado = 'EMPATE'
    } else if (ataqueEnemigo == 'FUEGO' && ataqueJugador == 'AGUA') {
        resultado = 'GANASTE'
        vidasEnemigo--;
        spanVidasEnemigo.innerHTML = vidasEnemigo;
    } else if (ataqueEnemigo == 'FUEGO' && ataqueJugador == 'TIERRA') {
        resultado = 'PERDISTE'
        vidasJugador--;
        spanVidasJugador.innerHTML = vidasJugador;
    } else if (ataqueEnemigo == 'AGUA' && ataqueJugador == 'TIERRA') {
        resultado = 'GANASTE'
        vidasEnemigo--;
        spanVidasEnemigo.innerHTML = vidasEnemigo;
    } else if (ataqueEnemigo == 'AGUA' && ataqueJugador == 'FUEGO') {
        resultado = 'PERDISTE'
        vidasJugador--;
        spanVidasJugador.innerHTML = vidasJugador;
    } else if (ataqueEnemigo == 'TIERRA' && ataqueJugador == 'FUEGO') {
        resultado = 'GANASTE'
        vidasEnemigo--;
        spanVidasEnemigo.innerHTML = vidasEnemigo;
    } else {
        resultado = 'PERDISTE'
        vidasJugador--;
        spanVidasJugador.innerHTML = vidasJugador;
    }

    crearMensaje()

    revisarVidas()
}

function revisarVidas() {
    if (vidasEnemigo == 0) {
        crearMensajeFinal("FELICITACIONES, GANASTE")
    } else if (vidasJugador == 0) {
        crearMensajeFinal("LO SIENTO, PERDISTE")
    } 
}

window.addEventListener('load',  iniciarJuego)