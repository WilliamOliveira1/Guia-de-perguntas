// Importar o sequelize
const Sequelize = require('sequelize');
// Realizar conexão com o banco de dados
const connection  = require('./database');

// Model para resposta
// Criar table para banco de dados
const Resposta = connection.define('respostas', { // Pergunta nome da table
    corpo: { // primeiro elemento da table
        type: Sequelize.STRING, // Dessa forma para textos curtos
        allowNull: false // Define que o valor não seja nulo
    },
    perguntaId: {
        type: Sequelize.INTEGER, // Para textos longos
        allowNull: false // Define que o valor não seja nulo
    }
});
// Sincronizar com o banco de dados
Resposta.sync({force: false}).then(() => { // o false é caso a table exista para não forçar a criação
    console.log("Tabela resposta criada.")
}) 

module.exports = Resposta;