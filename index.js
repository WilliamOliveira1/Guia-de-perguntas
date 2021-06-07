// importando o express
const express = require('express');
const app = express();

// importando a connection do banco de dados
const connection = require("./database/database");

// Conectar com o banco de dados
connection
  .authenticate()
  .then(() => {
    console.log("Conexão com o banco de dados feita.");
  })
  .catch((msgErro) => {
    console.log(msgErro);
  });

//Setar o EJS para renderizar o HTML
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Configurar o body-parser
app.use(express.urlencoded({extended: false}));
app.use(express.json())


//Rotas
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/perguntar", (req, res) => {
  res.render("perguntar");
});

app.post("/salvarpergunta", (req, res) => {
  var titulo = req.body.titulo;
  var descricao = req.body.descricao;
  res.send("titulo da pergunta= " + titulo + "  | descrição da pergunta= " + descricao);
});

app.listen(8080, (error) => {
  if(error) {
    console.error("The server caught an error: " + error);
  }else {
    console.log("The server is running");
  }
});