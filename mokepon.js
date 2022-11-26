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
const mapa = document.getElementById('mapa');

let mokepones = [];
let mascotaJugadorObjeto = obtenerObjetoMascota();
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
let intervalo;
let mapaBackground = new Image();
mapaBackground.src = './assets/mokemap.png';

class Mokepon {
    constructor(nombre, imagen, vida, fotoMapa, x = 10, y = 10) {
        this.nombre = nombre;
        this.imagen = imagen;
        this.vida = vida;
        this.ataques = [];
        this.x = x;
        this.y = y;
        this.ancho = 40;
        this.alto = 40;
        this.mapaFoto = new Image();
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0;
        this.velocidadY = 0;
    }

    pintarMokepon() {
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    }
}

let hipodoge = new Mokepon('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.webp', 5, './assets/hipodoge.png');
let capipepo = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.webp', 5, './assets/capipepo.png');
let ratigueya = new Mokepon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.webp', 5, './assets/ratigueya.png');

let hipodogeEnemigo = new Mokepon('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.webp', 5, './assets/hipodoge.png', 80, 120);
let capipepoEnemigo = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.webp', 5, './assets/capipepo.png', 150, 95);
let ratigueyaEnemigo = new Mokepon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.webp', 5, './assets/ratigueya.png', 200, 190);

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
    //Con la siguiente línea de código mostramos el mapa
    sectionVerMapa.style.display = 'flex';
    iniciarMapa();
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

function pintarCanvas() {
    // Establecemos la velocidad en X y Y una vez presionadas las teclas
    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX;
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY;

    // Con clearRect limpiamos el mapa antes de pintar nuevamente a Capipepo
    lienzo.clearRect(0,0, mapa.width, mapa.height);

    // Aquí pintamos la imagen de fondo
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    // Aquí pintamos nuestro mokepon
    mascotaJugadorObjeto.pintarMokepon();
    hipodogeEnemigo.pintarMokepon();
    capipepoEnemigo.pintarMokepon();
    ratigueyaEnemigo.pintarMokepon();
}

function moverDerecha() {
    mascotaJugadorObjeto.velocidadX = 5;
}

function moverIzquierda() {
    mascotaJugadorObjeto.velocidadX = -5;
}

function moverArriba() {
    mascotaJugadorObjeto.velocidadY = -5;
}

function moverAbajo() {
    mascotaJugadorObjeto.velocidadY = 5;
}

function detenerMovimiento() {
    
    mascotaJugadorObjeto.velocidadX = 0;
    mascotaJugadorObjeto.velocidadY = 0;
}

function sePresionoUnaTecla(event) {
    switch (event.key) {
        case 'ArrowUp':
            moverArriba();
            break;
        case 'ArrowDown':
            moverAbajo();
            break;
        case 'ArrowLeft':
            moverIzquierda();
            break;
        case 'ArrowRight':
            moverDerecha();
            break;
        default:
            break;
    }
}

function iniciarMapa() {
        // Establecemos el ancho y alto del mapa en pixeles
        mapa.width = 800;
        mapa.height = 600;
        mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador);

        //Con setInterval indicamos que es una función recurrente a ejecutar, con un tiempo de intervalo entre cada ejecución
        intervalo = setInterval(pintarCanvas, 50)

        //Agregamos un escuchador de eventos para las teclas
        window.addEventListener('keydown', sePresionoUnaTecla)
        window.addEventListener('keyup', detenerMovimiento)
}

function obtenerObjetoMascota() {
    for (let i = 0; i < mokepones.length; i++) {
        if (mokeponJugador === mokepones[i].nombre) {
            return mokepones[i];
        }
    }
}

window.addEventListener('load',  iniciarJuego)