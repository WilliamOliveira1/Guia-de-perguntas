// importando o express
const express = require('express');
const app = express();

// importando a connection do banco de dados
const connection = require("./database/database");
//Importar model perguntas
const Pergunta = require('./database/perguntas');
//Importar model respostas
const Resposta = require("./database/resposta");

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
  Pergunta.findAll({raw: true, order: [
    ['id', 'DESC'] // ASC = ordem crescente | DESC = ordem decrescente
  ]}) // {raw: true} mostra apenas os dados que importam da table
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
  let titulo = req.body.titulo;
  let descricao = req.body.descricao;
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

app.get("/pergunta/:id", (req, res) => {
  let id = req.params.id;

  Pergunta.findOne({ //Buscar um item na tabela de dados
    where: {id: id}
  })
  .then(pergunta => {
    if(pergunta != undefined) { // Pergunta encontrada
      Resposta.findAll({
        where: {perguntaId: pergunta.id},
        order: [
          ['id', 'ASC'] // ASC = ordem crescente | DESC = ordem decrescente        
        ]
      })
      .then(respostas => {
        res.render("pergunta", {
          pergunta : pergunta,
          respostas: respostas
        });
      });      
    }else {
      res.redirect("/");
    }
  });  
});

app.post("/responder", (req, res) => {
  let corpo = req.body.corpo;
  let perguntaId = req.body.pergunta;

  Resposta.create({
    corpo: corpo,
    perguntaId: perguntaId
  })
  .then(() => {
    res.redirect("/pergunta/"+ perguntaId);
  });
})

app.listen(8080, (error) => {
  if(error) {
    console.error("The server caught an error: " + error);
  }else {
    console.log("The server is running");
  }
});