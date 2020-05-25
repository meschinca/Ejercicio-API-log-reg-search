const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");

const app = express();

app.use(bodyParser.json());

// Creo la lista de usuarios (hardcodeada)
let userList = [];



// GET de página inicial
app.get("/", (req, res) => {
  // Retorna página inicial
  res.sendFile(path.join(__dirname, "../client/index.html"));
});

// GET de página de registro
app.get("/register-page", (req, res) => {
  // Retorna página de registro
  res.sendFile(path.join(__dirname, "../client/register.html"));
});

// GET de página home
app.get("/home", (req, res) => {
  // Retorna página de registro
  res.sendFile(path.join(__dirname, "../client/home.html"));
});

// POST /register - Registrar usuarix
app.post("/register", (req, res) => {
  // Verificar si recibí los datos y validarlos
  if (!req.body.username || !req.body.password) {
    res.status(400).send();
    return;
  }
  
  // Tengo los dos datos, los valido
  
  // Valido si la contraseña fue confirmada
  if (req.body.password != req.body.valPassword) {
    res.status(409).send();
    return;
  }
  
  // Valido si existe el nombre de usuarix
  if (userList.filter(user => user.username === req.body.username).length > 0) {
    res.status(409).send();
    return;
  }
  
  // Si todo está en orden añado las nuevas credenciales a la lista de usuarios y devuelvo el feedback "OK"
  userList.push({
    username: req.body.username,
    password: req.body.password
  });
  
  res.status(200).send();
  
});

// POST /login - login de usuarix
app.post("/login", (req, res) => {
  
  console.log(req.body);
  
  // Verificar si recibí los datos y validarlos
  if (!req.body.username || !req.body.password) {
    res.status(400).send("No se recibieron los datos correctos.");
    return;
  }
  
  if (userList.filter(user => user.username === req.body.username && user.password === req.body.password).length > 0) {
    res.status(200).send();
  } else {
    res.status(403).send();
  }
  
});

// Defino la función para cargar la lista de frases famosas del cine

/**
 * Función que consulta la lista de frases
 * 
 * @param {function} cb Callback para recibir resultados como parámetro
 */
function getPhrases(cb) {

fs.readFile(path.join(__dirname, "phrases.json"), "utf-8", (err, data) => {
  if (err) {
    console.log("No se pudo leer el archivo.");
    cb([]);
  } else {
    cb(JSON.parse(data));
  }
})
}

// GET /phrases - búsqueda de frases
app.get("/phrases", (req, res) => {
  
  getPhrases(phraseList => {
    if (req.query.phrases) {
      const results = phraseList.filter(item => item.toUpperCase().includes(req.query.phrases.toUpperCase()));
      return res.json(results.slice(0, 5));
    }
  })
})


app.listen(4000, () => {
  console.log("Server iniciado en puerto 4000...")
});
