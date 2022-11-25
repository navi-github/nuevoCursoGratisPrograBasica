const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque');
const botonMascotaJugador = document.getElementById('boton-mascota');
const botonReiniciar = document.getElementById('boton-reiniciar');
const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota');
const mascotaJugador = document.getElementById('mascotaJugador');
const sectionMensajes = document.getElementById('div-resultado');
const sectionAtaquesJugador = document.getElementById('ataques-jugador');
const sectionAtaquesEnemigo = document.getElementById('ataques-enemigo');
const mascotaEnemigo = document.getElementById('mascotaEnemigo');
const spanVidasJugador = document.getElementById('vidas-jugador');
const spanVidasEnemigo = document.getElementById('vidas-enemigo');
const contenedorTarjetas = document.getElementById('contenedor-tarjetas');
const contenedorAtaques = document.getElementById('contenedor-de-ataques');
const sectionVerMapa = document.getElementById('ver-mapa');
const mapa = document.getElementById('mapa')

let mokepones = []
let ataqueJugador;
let opcionDeMokepones;
let inputHipodoge; 
let inputCapipepo; 
let inputRatigueya;
let mokeponJugador;
let ataquesMokepon;
let botones = [];
let ataquesJugador = [];
let ataquesMokeponEnemigo;
let botonFuego;
let botonAgua;
let botonTierra;  
let ataqueEnemigo = [];
let resultado;
let vidasEnemigo = 3;
let vidasJugador = 3;
let victoriasJugador = 0;
let victoriasEnemigo = 0;
let indexAtaqueJugador;
let indexAtaqueEnemigo;
let lienzo = mapa.getContext('2d');

class Mokepon {
    constructor(nombre, imagen, vida) {
        this.nombre = nombre;
        this.imagen = imagen;
        this.vida = vida;
        this.ataques = [];
    }
}

let hipodoge = new Mokepon('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.webp', 5);
let capipepo = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.webp', 5);
let ratigueya = new Mokepon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.webp', 5);

hipodoge.ataques.push(
    { nombre: '💧', id: 'boton-agua'},
    { nombre: '💧', id: 'boton-agua'},
    { nombre: '💧', id: 'boton-agua'},
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '🌱', id: 'boton-tierra'}
    );

capipepo.ataques.push(
    { nombre: '💧', id: 'boton-agua'},
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '🌱', id: 'boton-tierra'},
    { nombre: '🌱', id: 'boton-tierra'},
    { nombre: '🌱', id: 'boton-tierra'},
    );

ratigueya.ataques.push(
    { nombre: '💧', id: 'boton-agua'},
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '🌱', id: 'boton-tierra'}
    );

mokepones.push(hipodoge, capipepo, ratigueya);

function iniciarJuego() { 
    sectionSeleccionarAtaque.style.display = 'none';
    sectionVerMapa.style.display = 'none';

    mokepones.forEach((mokepon) => {
        opcionDeMokepones = `
            <input type="radio" name="mascota" id=${mokepon.nombre} />
            <label class="tarjeta-mokepon" for=${mokepon.nombre}><p>${mokepon.nombre}</p>
                <img src="${mokepon.imagen}" alt=${mokepon.nombre}>
            </label>
        `;
        contenedorTarjetas.innerHTML += opcionDeMokepones;

        inputHipodoge = document.getElementById('Hipodoge');
        inputCapipepo = document.getElementById('Capipepo');
        inputRatigueya = document.getElementById('Ratigueya');
    })

    botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador);

    botonReiniciar.addEventListener('click', reiniciarJuego);
}

function seleccionarMascotaJugador() {
    sectionSeleccionarMascota.style.display = 'none';
    // sectionSeleccionarAtaque.style.display = 'flex';
    sectionVerMapa.style.display = 'flex';
    let imagenDeCapipepo = new Image();
    imagenDeCapipepo.src = capipepo.imagen;
    lienzo.drawImage(
        imagenDeCapipepo,
        20,
        40,
        100,
        100
    )

    if(inputHipodoge.checked) {
        mascotaJugador.innerHTML = inputHipodoge.id;
        mokeponJugador = inputHipodoge.id;
    } 
    else if(inputCapipepo.checked) {
        mascotaJugador.innerHTML = inputCapipepo.id;
        mokeponJugador = inputCapipepo.id;
    }
    else if(inputRatigueya.checked) {
        mascotaJugador.innerHTML = inputRatigueya.id;
        mokeponJugador = inputRatigueya.id;
    } else {
        alert("Por favor selecciona tu mascota");
    }

    extraerAtaques(mokeponJugador);
    seleccionaMascotaEnemigo();
}

function extraerAtaques(mokeponJugador) {
    let ataques;
    for (let i = 0; i < mokepones.length; i++) {
        if (mokeponJugador === mokepones[i].nombre) {
            ataques = mokepones[i].ataques;
        }
    }
    mostrarAtaques(ataques);
}

function mostrarAtaques(ataques) {
    ataques.forEach((ataque) => {
        ataquesMokepon = `
        <button id=${ataque.id} class="boton-de-ataque boton-de-ataque-js"> ${ataque.nombre} </button>`
        contenedorAtaques.innerHTML += ataquesMokepon;
    });

    botonFuego = document.getElementById('boton-fuego');
    botonAgua = document.getElementById('boton-agua');
    botonTierra = document.getElementById('boton-tierra');  

    botones = document.querySelectorAll('.boton-de-ataque-js');
    
}

function secuenciaAtaque () {
    botones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            console.log(e)
            if(e.target.textContent === ' 🔥 ') {
                ataquesJugador.push('FUEGO');
                console.log(ataquesJugador);
                boton.style.background = '#112f58';
                boton.disabled = true;
            }
            else if (e.target.textContent === ' 💧 ') {
                ataquesJugador.push('AGUA');
                console.log(ataquesJugador);
                boton.style.background = '#112f58'
                boton.disabled = true;
            } else {
                ataquesJugador.push('TIERRA');
                console.log(ataquesJugador);
                boton.style.background = '#112f58'
                boton.disabled = true;
            }
            ataqueAleatorioEnemigo()
        }) 
    })
}

function crearMensaje() {
    let notificacion = document.createElement('p');
    let nuevoAtaqueDelJugador = document.createElement('p');
    let nuevoAtaqueDelEnemigo = document.createElement('p');

    sectionMensajes.innerHTML = resultado;
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador;
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo;

    sectionMensajes.appendChild(notificacion)
    sectionAtaquesJugador.appendChild(nuevoAtaqueDelJugador)
    sectionAtaquesEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}

function crearMensajeFinal(resultadoFinal) {
    sectionMensajes.innerHTML = resultadoFinal
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function seleccionaMascotaEnemigo() {
    let mascotaAleatoriaEnemigo = aleatorio(0, mokepones.length - 1);

     mascotaEnemigo.innerHTML = mokepones[mascotaAleatoriaEnemigo].nombre;
     ataquesMokeponEnemigo = mokepones[mascotaAleatoriaEnemigo].ataques;
     secuenciaAtaque();
}

function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(0, ataquesMokeponEnemigo.length - 1);

    if(ataqueAleatorio == 0 || ataqueAleatorio == 1) {
        ataqueEnemigo.push('FUEGO')
    } else if (ataqueAleatorio == 2 || ataqueAleatorio == 4){
        ataqueEnemigo.push('AGUA')
    } else {
        ataqueEnemigo.push('TIERRA')
    }
    console.log(ataqueEnemigo)
    iniciarPelea();
}

function iniciarPelea() {
    if (ataquesJugador.length === 5) { 
        combate();
    }
};

function indexAmbosOponentes(jugador, enemigo) {
    indexAtaqueJugador = ataquesJugador[jugador];
    indexAtaqueEnemigo = ataqueEnemigo[enemigo];
}

function combate() {
    for (let index = 0; index < ataquesJugador.length; index++) {
        if (ataquesJugador[index] === ataqueEnemigo[index]) {
            indexAmbosOponentes(index, index);
            resultado = 'EMPATE';
        }
        else if (ataquesJugador[index] === 'FUEGO' && ataqueEnemigo[index] === 'AGUA') {
            indexAmbosOponentes(index, index);
            resultado = 'PERDISTE';
            victoriasEnemigo++;
            spanVidasEnemigo.innerHTML = victoriasEnemigo;
        } 
        else if (ataquesJugador[index] === 'AGUA' && ataqueEnemigo[index] === 'TIERRA') {
            indexAmbosOponentes(index, index);
            resultado = 'PERDISTE';
            victoriasEnemigo++;
            spanVidasEnemigo.innerHTML = victoriasEnemigo;
        } 
        else if (ataquesJugador[index] === 'TIERRA' && ataqueEnemigo[index] === 'FUEGO') {
            indexAmbosOponentes(index, index);
            resultado = 'PERDISTE';
            victoriasEnemigo++;
            spanVidasEnemigo.innerHTML = victoriasEnemigo;
        } 
        else if (ataquesJugador[index] === 'TIERRA' && ataqueEnemigo[index] === 'AGUA') {
            indexAmbosOponentes(index, index);
            resultado = 'GANASTE';
            victoriasJugador++;
            spanVidasJugador.innerHTML = victoriasJugador;
        } 
        else if (ataquesJugador[index] === 'AGUA' && ataqueEnemigo[index] === 'FUEGO') {
            indexAmbosOponentes(index, index);
            resultado = 'GANASTE';
            victoriasJugador++;
            spanVidasJugador.innerHTML = victoriasJugador;
        } 
        else if (ataquesJugador[index] === 'FUEGO' && ataqueEnemigo[index] === 'TIERRA') {
            indexAmbosOponentes(index, index);
            resultado = 'GANASTE';
            victoriasJugador++;
            spanVidasJugador.innerHTML = victoriasJugador;
        } 
    }

    crearMensaje()

    revisarVidas()
}

function revisarVidas() {
    if (victoriasJugador === victoriasEnemigo) {
        crearMensajeFinal("EMPATASTE")
    } else if (victoriasJugador > victoriasEnemigo) {
        crearMensajeFinal("FELICIDADES, GANASTE")
    } else {
        crearMensajeFinal("LO SIENTO, PERDISTE")
    }
}

function reiniciarJuego() {
    location.reload()
}

window.addEventListener('load',  iniciarJuego)