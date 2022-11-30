const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque');
const sectionReiniciar = document.getElementById('reiniciar');
const botonMascotaJugador = document.getElementById('boton-mascota');
const botonReiniciar = document.getElementById('boton-reiniciar');
const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota');
const spanMascotaJugador = document.getElementById('mascota-jugador');
const spanMascotaEnemigo = document.getElementById('mascota-enemigo');
const sectionMensajes = document.getElementById('div-resultado');
const sectionAtaquesJugador = document.getElementById('ataques-jugador');
const sectionAtaquesEnemigo = document.getElementById('ataques-enemigo');
const spanVidasJugador = document.getElementById('vidas-jugador');
const spanVidasEnemigo = document.getElementById('vidas-enemigo');
const contenedorTarjetas = document.getElementById('contenedor-tarjetas');
const contenedorAtaques = document.getElementById('contenedor-de-ataques');
const sectionVerMapa = document.getElementById('ver-mapa');
const mapa = document.getElementById('mapa');

let jugadorId = null;
let enemigoId = null;
let mokepones = [];
let mokeponesEnemigo = [];
let ataqueJugador = [];
let ataqueEnemigo = [];
let opcionDeMokepones;
let inputHipodoge; 
let inputCapipepo; 
let inputRatigueya;
let mascotaJugador;
let mascotaJugadorObjeto = obtenerObjetoMascota();
let ataquesMokepon;
let ataquesMokeponEnemigo;
let botonFuego;
let botonAgua;
let botonTierra;
let botones = [];
let indexAtaqueJugador;
let indexAtaqueEnemigo;
let victoriasJugador = 0;
let victoriasEnemigo = 0;
let vidasEnemigo = 3;
let vidasJugador = 3;
let lienzo = mapa.getContext('2d');
let intervalo;
let mapaBackground = new Image();
mapaBackground.src = './assets/mokemap.png';
let anchoDeMapa = window.innerWidth - 20;
const anchoMaximoDeMapa = 350;

if (anchoDeMapa > anchoMaximoDeMapa) {
    anchoDeMapa = anchoMaximoDeMapa - 20;
}

let alturaQueBuscamos = anchoDeMapa * 600 / 800;
mapa.width = anchoDeMapa;
mapa.height = alturaQueBuscamos;

// let mokeponJugador;
// let ataquesJugador = [];
// let resultado;

// Aquí declaramos la clase Mokepon, con sus atributos y métodos
class Mokepon {
    constructor(nombre, imagen, vida, fotoMapa, id = null) {
        this.id = id;
        this.nombre = nombre;
        this.imagen = imagen;
        this.vida = vida;
        this.ataques = [];
        this.ancho = 40;
        this.alto = 40;
        this.x = aleatorio(0, mapa.width - this.ancho);
        this.y = aleatorio(0, mapa.height - this.alto);
        this.mapaFoto = new Image();
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0;
        this.velocidadY = 0;
    }
    // Lo siguiente son los métodos de la clase
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

const HIPODOGE_ATAQUES = [    
    { nombre: '💧', id: 'boton-agua'},
    { nombre: '💧', id: 'boton-agua'},
    { nombre: '💧', id: 'boton-agua'},
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '🌱', id: 'boton-tierra'}
];

hipodoge.ataques.push(...HIPODOGE_ATAQUES);
// hipodogeEnemigo.ataques.push(...HIPODOGE_ATAQUES);

const CAPIPEPO_ATAQUES = [
    { nombre: '💧', id: 'boton-agua'},
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '🌱', id: 'boton-tierra'},
    { nombre: '🌱', id: 'boton-tierra'},
    { nombre: '🌱', id: 'boton-tierra'},
];

capipepo.ataques.push(...CAPIPEPO_ATAQUES);
// capipepoEnemigo.ataques.push(...CAPIPEPO_ATAQUES);

const RATIGUEYA_ATAQUES = [
    { nombre: '💧', id: 'boton-agua'},
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '🌱', id: 'boton-tierra'}
];

ratigueya.ataques.push(RATIGUEYA_ATAQUES);
// ratigueyaEnemigo.ataques.push(RATIGUEYA_ATAQUES);

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

    // Aquí nos unimos al juego (BACKEND)
    unirseAlJuego();
}

function unirseAlJuego() {
    // fetch nos permite realizar llamadas hacia otros servicios por medio de HTTP
    fetch('http://localhost:8080/unirse')
        // Utilizamos .then ya que la respuesta es asíncrona
        .then(function (res) {
            // Validamos si nuestra respueta del servidor es correcta
            if(res.ok) {
                // Traemos datos de vuelta
                res.text()
                    .then(function (respuesta) {
                        console.log(respuesta);
                        jugadorId = respuesta;
                    })
            }
        })
}

function seleccionarMascotaJugador() {
    sectionSeleccionarMascota.style.display = 'none';

    if(inputHipodoge.checked) {
        spanMascotaJugador.innerHTML = inputHipodoge.id;
        mascotaJugador = inputHipodoge.id;
    } 
    else if(inputCapipepo.checked) {
        spanMascotaJugador.innerHTML = inputCapipepo.id;
        mascotaJugador = inputCapipepo.id;
    }
    else if(inputRatigueya.checked) {
        spanMascotaJugador.innerHTML = inputRatigueya.id;
        mascotaJugador = inputRatigueya.id;
    } else {
        alert("Por favor selecciona tu mascota");
    }

    // Ejecutar función para enviar el mokepon (dato) hacia el BACKEND
    seleccionarMokepon(mascotaJugador);

    extraerAtaques(mascotaJugador);
    // Con la siguiente línea de código mostramos el mapa
    sectionVerMapa.style.display = 'flex';
    iniciarMapa();
}

// Función para enviar el mokepon (dato) hacia el BACKEND
function seleccionarMokepon(mascotaJugador) {
    fetch(`http://localhost:8080/mokepon/${jugadorId}`, {
        // Aquí indicamos que es una petición tipo POST
        method: 'post',
        // Enviamos el tipo de dato utilizando la cabecera
        headers: {
            "Content-Type": "application/json"
        }, 
        // Con Stringify cambiamos el archivo JSON a cadena de texto
        body: JSON.stringify({
            mokepon: mascotaJugador
        })
    })
}

function extraerAtaques(mascotaJugador) {
    let ataques;
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
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
                ataqueJugador.push('FUEGO');
                console.log(ataqueJugador);
                boton.style.background = '#112f58';
                boton.disabled = true;
            }
            else if (e.target.textContent === ' 💧 ') {
                ataqueJugador.push('AGUA');
                console.log(ataqueJugador);
                boton.style.background = '#112f58'
                boton.disabled = true;
            } else {
                ataqueJugador.push('TIERRA');
                console.log(ataqueJugador);
                boton.style.background = '#112f58'
                boton.disabled = true;
            }
            if (ataqueJugador.length === 5) {
                enviarAtaques();
            }
        }) 
    })
}

function enviarAtaques() {
        fetch(`http://localhost:8080/mokepon/${jugadorId}/ataques`, {
        method: 'post',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            ataques: ataqueJugador
        })
    })
}

function seleccionaMascotaEnemigo(enemigo) {
    spanMascotaEnemigo.innerHTML = enemigo.nombre;
    ataquesMokeponEnemigo = enemigo.ataques;
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
    if (ataqueJugador.length === 5) { 
        combate();
    }
};

function indexAmbosOponentes(jugador, enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador];
    indexAtaqueEnemigo = ataqueEnemigo[enemigo];
}

function combate() {
    for (let index = 0; index < ataqueJugador.length; index++) {
        if (ataqueJugador[index] === ataqueEnemigo[index]) {
            indexAmbosOponentes(index, index);
            resultado = 'EMPATE';
        }
        else if (ataqueJugador[index] === 'FUEGO' && ataqueEnemigo[index] === 'AGUA') {
            indexAmbosOponentes(index, index);
            resultado = 'PERDISTE';
            victoriasEnemigo++;
            spanVidasEnemigo.innerHTML = victoriasEnemigo;
        } 
        else if (ataqueJugador[index] === 'AGUA' && ataqueEnemigo[index] === 'TIERRA') {
            indexAmbosOponentes(index, index);
            resultado = 'PERDISTE';
            victoriasEnemigo++;
            spanVidasEnemigo.innerHTML = victoriasEnemigo;
        } 
        else if (ataqueJugador[index] === 'TIERRA' && ataqueEnemigo[index] === 'FUEGO') {
            indexAmbosOponentes(index, index);
            resultado = 'PERDISTE';
            victoriasEnemigo++;
            spanVidasEnemigo.innerHTML = victoriasEnemigo;
        } 
        else if (ataqueJugador[index] === 'TIERRA' && ataqueEnemigo[index] === 'AGUA') {
            indexAmbosOponentes(index, index);
            resultado = 'GANASTE';
            victoriasJugador++;
            spanVidasJugador.innerHTML = victoriasJugador;
        } 
        else if (ataqueJugador[index] === 'AGUA' && ataqueEnemigo[index] === 'FUEGO') {
            indexAmbosOponentes(index, index);
            resultado = 'GANASTE';
            victoriasJugador++;
            spanVidasJugador.innerHTML = victoriasJugador;
        } 
        else if (ataqueJugador[index] === 'FUEGO' && ataqueEnemigo[index] === 'TIERRA') {
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

function crearMensaje(resultado) {
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

    //Función para enviar coordenadas al backend
    enviarPosicion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y)

    mokeponesEnemigo.forEach(function (mokepon) {
        mokepon.pintarMokepon();
        revisarColision(mokepon);
    })
}

function enviarPosicion(x, y) {
    fetch(`http://localhost:8080/mokepon/${jugadorId}/posicion`, {
        method: 'post',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x: x,
            y: y
        })
    })
    .then(function (res) {
        if (res.ok) {
            res.json()
            .then(function ({ enemigos }) {
                console.log(enemigos)
                mokeponesEnemigo = enemigos.map(function (enemigo) {
                    let mokeponEnemigo = null;
                    const mokeponNombre = enemigo.mokepon.nombre || '';
                    if (mokeponNombre == 'Hipodoge' ) {
                        mokeponEnemigo = new Mokepon('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.webp', 5, './assets/hipodoge.png', enemigo.id);
                    } else if (mokeponNombre == 'Capipepo') {
                        mokeponEnemigo = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.webp', 5, './assets/capipepo.png', enemigo.id);
                    } else if (mokeponNombre == 'Ratigueya') {
                        mokeponEnemigo = new Mokepon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.webp', 5, './assets/ratigueya.png', enemigo.id);
                    }
                    mokeponEnemigo.x = enemigo.x;
                    mokeponEnemigo.y = enemigo.y;

                    return mokeponEnemigo;
                })
            })
        }
    })
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
        mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador);

        //Con setInterval indicamos que es una función recurrente a ejecutar, con un tiempo de intervalo entre cada ejecución
        intervalo = setInterval(pintarCanvas, 50)

        //Agregamos un escuchador de eventos para las teclas
        window.addEventListener('keydown', sePresionoUnaTecla)
        window.addEventListener('keyup', detenerMovimiento)
}

function obtenerObjetoMascota() {
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            return mokepones[i];
        }
    }
}

function revisarColision(enemigo) {
    // Tomamos las coordenadas del enemigo y las declaramos como una variable
    let arribaEnemigo = enemigo.y;
    let abajoEnemigo = enemigo.y + enemigo.alto;
    let derechaEnemigo = enemigo.x + enemigo.ancho;
    let izquierdaEnemigo = enemigo.x;

    // Tomamos las coordenadas de nuestra mascota y las declaramos como una variable
    let arribaMascota = mascotaJugadorObjeto.y;
    let abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto;
    let derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho;
    let izquierdaMascota = mascotaJugadorObjeto.x;

    // Condicional para revisar que no existen colisiones
    if (
        abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo
        ) {
            return;
    }
    detenerMovimiento();
    // Aquí detenemos la ejecución del intervalo
    clearInterval(intervalo);
    enemigoId = enemigo.Id;
    sectionVerMapa.style.display = 'none';
    sectionSeleccionarAtaque.style.display = 'flex';
    seleccionaMascotaEnemigo(enemigo);
}

window.addEventListener('load',  iniciarJuego)