const express = require('express');
const cors = require('cors')

const app = express();

// Utilizamos el framework cors
app.use(cors());
// Habilitamos la capacidad de recibir peticiones tipo POST
app.use(express.json());

const jugadores = [];

class Jugador {
    constructor(id) {
        this.id = id
    }
    asignarMokepon(mokepon) {
        this.mokepon = mokepon
    }
}

class Mokepon {
    constructor(nombre) {
        this.nombre = nombre
    }
}

// Indicamos get para decirle al programa que nuestro cliente está 'solicitando algo'
app.get('/unirse', (req, res) => {
    const id = `${Math.random()}`

    const jugador = new Jugador(id);

    jugadores.push(jugador);

    // Agregamos cabecera (metadatos) para indicar que nuestro sitio es seguro
    res.setHeader('Access-Control-Allow-Origin', '*')

    res.send(id)
})

app.post("/mokepon/:jugadorId", (req, res) => {
    const jugadorId = req.params.jugadorId || ""
    const nombre = req.body.mokepon || ""
    console.log(nombre)
    const mokepon = new Mokepon(nombre)
    console.log(mokepon)
    
    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)
  
    if (jugadorIndex >= 0) {
      jugadores[jugadorIndex].asignarMokepon(mokepon)
    }
    
    console.log(jugadores)
    console.log(jugadorId)
    res.end()
  })
  

// Aquí iniciamos la app para 'escuchar' mediante el puerto 8080
app.listen(8080, () => {
    console.log('Servidor funcionando');
})