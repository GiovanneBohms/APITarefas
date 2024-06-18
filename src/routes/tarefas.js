// routes/tarefas.js
const express = require('express');
const router = express.Router();
const db = require('../db/bancoDeDados.js');

// Rota para obter todas as tarefas
router.get('/', async (req, res) => {
    try {
        const tarefas = await db.consultaTodasTarefas();
        res.status(200).json(tarefas);
    } catch (err) {
        console.error('Erro ao obter tarefas:', err);
        res.status(500).send('Erro ao obter tarefas');
    }
});

// Rota para obter uma tarefa por ID
router.get('/:id', async (req, res) => {
    const tarefaId = parseInt(req.params.id);
    try {
        const tarefa = await db.consultaTarefaPorId(tarefaId);
        res.status(200).json(tarefa);
    } catch (err) {
        console.error(`Erro ao obter tarefa com ID ${tarefaId}:`, err);
        res.status(500).send(`Erro ao obter tarefa com ID ${tarefaId}`);
    }
});

// Rota para obter tarefas por status
router.get('/status', async (req, res) => {
    const status = req.query.q;
    try {
        const statusFiltrados = await db.consultaTarefaPorStatus(status);
        res.status(200).json(statusFiltrados);
    } catch (err) {
        console.error(`Erro ao obter tarefas com status ${status}:`, err);
        res.status(500).send(`Erro ao obter tarefas com status ${status}`);
    }
});

// Rota para obter tarefas de um usuário por ID
router.get('/usuario/:id', async (req, res) => {
    const userId = parseInt(req.params.id);
    try {
        const tarefas = await db.consultaTarefasDeUsuario(userId);
        const usuario = await db.consultaUsuarioPorId(userId);
        res.status(200).json({ usuario, tarefas });
    } catch (err) {
        console.error(`Erro ao obter tarefas do usuário com ID ${userId}:`, err);
        res.status(500).send(`Erro ao obter tarefas do usuário com ID ${userId}`);
    }
});

module.exports = router;
