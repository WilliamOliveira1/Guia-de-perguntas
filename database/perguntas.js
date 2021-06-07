// Importar o sequelize
const Sequelize = require('sequelize');
// Realizar conexão com o banco de dados
const connection  = require('./database');

// Model para perguntas
// Criar table para banco de dados
const Pergunta = connection.define('pergunta', { // Pergunta nome da table
    título: { // primeiro elemento da table
        type: Sequelize.STRING, // Dessa forma para textos curtos
        allowNull: false // Define que o valor não seja nulo
    },
    descrição: {
        type: Sequelize.TEXT, // Para textos longos
        allowNull: false // Define que o valor não seja nulo
    }
});
// Sincronizar com o banco de dados
Pergunta.sync({force: false}).then(() => { // o false é caso a table exista para não forçar a criação
    console.log("Tabela criada.")
}) 