// importando o express
const express = require('express');
const app = express();

// importando a connection do banco de dados
const connection = require("./database/database");
const Pergunta = require('./database/perguntas');

//Importar model perguntas
const pergunta = require("./database/perguntas");

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
  Pergunta.findAll({raw: true}) // {raw: true} mostra apenas os dados que importam da table
  .then(perguntas => {
    console.log(perguntas);
    res.render("index", {
      perguntas: perguntas // enviar os dados da table para a view
    });
  }); // Equivalente à "SELECT * FROM perguntas"
});

app.get("/perguntar", (req, res) => {
  res.render("perguntar");
});

app.post("/salvarpergunta", (req, res) => {
  var titulo = req.body.titulo;
  var descricao = req.body.descricao;
  Pergunta.create({ // Equivalente ao "INSERT INTO PERGUNTAS" do mysql
    titulo: titulo,
    descricao: descricao
  })
  .then(() => {
    console.log('Pergunta salva no banco de dados.');
    res.redirect('/');
  })
  .catch((msgErroPerguntas) => {
    console.log("Ocorreu um erro ao salvar dados no banco: " + msgErroPerguntas);
  }); 
});

app.listen(8080, (error) => {
  if(error) {
    console.error("The server caught an error: " + error);
  }else {
    console.log("The server is running");
  }
});