const mysql = require('mysql2');

// Configuração da conexão com o banco de dados
const connection = mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'DesafioTecnico'
});

// Funções de consulta ao banco de dados
async function consultaTodasTarefas() {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM tarefa`;
        connection.query(sql, (err, results) => {
            if (err) {
                console.error('Erro ao executar consulta de todas as tarefas:', err);
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}

async function consultaTarefaPorId(id) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM tarefa WHERE id_tarefa = '${id}'`;
        connection.query(sql, (err, results) => {
            if (err) {
                console.error(`Erro ao executar consulta da tarefa com ID ${id}:`, err);
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}

async function consultaTarefaPorStatus(status) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM tarefa WHERE status = '${status}'`;
        connection.query(sql, (err, results) => {
            if (err) {
                console.error(`Erro ao executar consulta de tarefas com status ${status}:`, err);
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}

async function consultaTarefasDeUsuario(idUsuario) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM tarefa WHERE usuario_id_usuario = ${idUsuario}`;
        connection.query(sql, (err, results) => {
            if (err) {
                console.error(`Erro ao executar consulta de tarefas do usuário com ID ${idUsuario}:`, err);
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}

async function consultaUsuarioPorId(idUsuario) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT nome FROM usuario WHERE id_usuario = ${idUsuario}`;
        connection.query(sql, (err, results) => {
            if (err) {
                console.error(`Erro ao executar consulta de usuário com ID ${idUsuario}:`, err);
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}

module.exports = {
    consultaTodasTarefas,
    consultaTarefaPorId,
    consultaTarefaPorStatus,
    consultaTarefasDeUsuario,
    consultaUsuarioPorId
};
