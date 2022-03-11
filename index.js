//Instanciando express y modulo fs
const express = require("express")
const app = express()
const fs = require("fs")

//disponibilizando la ruta de Assets
app.use(express.static(__dirname + "/assets"))

//disponibilizando ruta raíz
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

// disponibilizando ruta usuarios y que imprima un arreglo de usuarios
app.get("/abracadabra/usuarios" ,(req, res) => {
    res.sendFile(__dirname + "/assets/usuarios.json")
})

//validando la existencia de los usuarios al ingresar a ruta a través de un middleware
app.use("/abracadabra/juego/:usuario", (req, res, next) => {
    const usuario = req.params.usuario
    const arregloUser = JSON.parse(fs.readFileSync(__dirname + "/assets/usuarios.json", "utf-8")).usuarios
    const encontrarU = arregloUser.find(e => e == usuario)
    encontrarU == usuario
        ? next()
        : res.sendFile(__dirname + "/assets/who.jpeg")
})

//disponibilizando ruta del usuario y generando una redirección al juego en 2 segundos
app.get("/abracadabra/juego/:usuario", (req, res) => {
    const usuario = req.params.usuario
    res.send("<center> <h1> Bienvenido " + usuario +  " tu ingreso ha sido correcto, en breve serás dirigido al juego</h1><center><script>setTimeout(function(){window.location.href = 'http://localhost:3000/'}, 2000);</script>")

})

//Validar el parametro de cada sombrero, con un número al azar del 1 al 4
app.get("/abracadabra/conejo/:n", (req, res) => {
    const numero = req.params.n
    const azar = Math.floor(Math.random() * (5 - 1)) + 1
    numero == azar
        ? res.send("<center><img src='/conejito.jpg' alt='Conejo' /></center>")
        : res.send("<center><img src='/voldemort.jpg' alt='Voldemort' /></center>")
})

//Escuchando servidor en puerto 3000
app.listen(3000, () => console.log("Servidor levantado en puerto 3000"))
