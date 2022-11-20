const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque');
const botonMascotaJugador = document.getElementById('boton-mascota');
const botonFuego = document.getElementById('boton-fuego');
const botonAgua = document.getElementById('boton-agua');
const botonTierra = document.getElementById('boton-tierra');
const botonReiniciar = document.getElementById('boton-reiniciar');
const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota');
const inputHipodoge = document.getElementById('Hipodoge');
const inputCapipego = document.getElementById('Capipego');
const inputRatigueya = document.getElementById('Ratigueya');
const mascotaJugador = document.getElementById('mascotaJugador');
const sectionMensajes = document.getElementById('div-resultado');
const sectionAtaquesJugador = document.getElementById('ataques-jugador');
const sectionAtaquesEnemigo = document.getElementById('ataques-enemigo');
const mascotaEnemigo = document.getElementById('mascotaEnemigo');
const spanVidasJugador = document.getElementById('vidas-jugador');
const spanVidasEnemigo = document.getElementById('vidas-enemigo');

let ataqueJugador;
let ataqueEnemigo;
let resultado;
let vidasEnemigo = 3;
let vidasJugador = 3;

function iniciarJuego() { 
    sectionSeleccionarAtaque.style.display = 'none';
    botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador);
    botonFuego.addEventListener('click', ataqueFuego);
    botonAgua.addEventListener('click', ataqueAgua);
    botonTierra.addEventListener('click', ataqueTierra);
    botonReiniciar.addEventListener('click', reiniciarJuego);
}

function seleccionarMascotaJugador() {
    sectionSeleccionarMascota.style.display = 'none';
    sectionSeleccionarAtaque.style.display = 'flex';
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
    let notificacion = document.createElement('p');
    let nuevoAtaqueDelJugador = document.createElement('p');
    let nuevoAtaqueDelEnemigo = document.createElement('p');

    sectionMensajes.innerHTML = resultado;
    nuevoAtaqueDelJugador.innerHTML = 'Tu mascota atactó con ' + ataqueJugador;
    nuevoAtaqueDelEnemigo.innerHTML = 'La mascota del enemigo atacó con ' + ataqueEnemigo;

    // let parrafo = document.createElement('p')
    // parrafo.innerHTML = 'Tu mascota atacó con ' + ataqueJugador + ' , la mascota del enemigo atacó con ' + ataqueEnemigo + ' - ' + resultado

    sectionMensajes.appendChild(notificacion)
    sectionAtaquesJugador.appendChild(nuevoAtaqueDelJugador)
    sectionAtaquesEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}

function crearMensajeFinal(resultadoFinal) {
    // let parrafo = document.createElement('p')
    sectionMensajes.innerHTML = resultadoFinal

    // sectionMensajes.appendChild(parrafo)
    botonFuego.disabled = true;
    botonAgua.disabled = true;
    botonTierra.disabled = true;
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function seleccionaMascotaEnemigo() {
    let mascotaAleatoriaEnemigo = aleatorio(1,3);

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

function reiniciarJuego() {
    location.reload()
}

window.addEventListener('load',  iniciarJuego)