// app.js
const express = require('express');
const app = express();
const port = 3000;

// Middleware para processar o corpo das requisições
app.use(express.json());

// Roteamento para as tarefas
const tarefasRouter = require('./routes/tarefas');
app.use('/api/tarefas', tarefasRouter);

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor online na porta ${port}`);
});
