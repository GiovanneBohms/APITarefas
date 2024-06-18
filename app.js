const mysql = require('mysql2');
const express = require('express');
const app = express();
const port = 3000;

// Configuração da conexão com o banco de dados
const connection = mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'DesafioTecnico'
});

// Função para consultar todas as tarefas no banco de dados
async function consultaTodasTarefas() {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM tarefa`;
        connection.query(sql, (err, results) => {
            if (err) {
                console.error('Erro ao executar consulta:', err);
                reject(err);
            } else {
                console.log('Todas as tarefas:');
                console.log(results);
                resolve(results);
            }
        });
    });
}


async function consultaTarefaPorStatus(status){

    return new Promise ((resolve, reject)=>{
        const sql=`SELECT * FROM tarefa WHERE status = '${status}'`
        connection.query(sql, (err,results)=>{
            if(err){
                console.error('erro ao executar consulta de status', err)
                reject(err)
            }else{
                console.log(`Consulta de Status:${status}  realizada com sucesso`);
                console.log(results);
                resolve(results);
            }
        })
    })
}

consultaTarefaPorStatus('ativo')

async function consultaTarefasDeUsuario(idUsuario) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM tarefa WHERE usuario_id_usuario = ${idUsuario};`;
        connection.query(sql, (err, results) => {
            if (err) {
                console.error('Erro ao executar consulta:', err);
                reject(err);
            } else {
                console.log('Todas as tarefas de usuário');
                console.log(results)
                resolve(results);
            }
        });
    });
}

async function consultaUsuarioPorId(idUsuario){
    return new Promise((resolve, reject)=>{
        const sql = `SELECT nome FROM usuario WHERE id_usuario = ${idUsuario};`
        connection.query(sql, (err, results)=>{
            if(err){
                console.error('erro ao executar consulta de Nome de Usuário')
            }else{
                console.log('Nome de usuário');
                console.log(results)
                resolve(results);
            }
        })
    })
}

async function inserirNovoUsuario (nome,senha){
    if ((nome||senha) === undefined){
        console.log('insira nome e senha corretamente')
        return  
    }
    return new Promise ((resolve, reject)=>{
        const sql=`INSERT INTO usuario (nome, senha) values ('${nome}', '${senha}');`
        connection.query(sql, (err, results)=>{
            if(err){
                console.error('erro ao inserir novo usuário');
            }else{
                console.log('Novo usuário inserido com sucesso');
                console.log(results);
                resolve(results)
            }
        })
    })
}
// inserirNovoUsuario('Francisco Mathes','DeusSempre')

app.get('/tarefas', async (req, res) => {
    try {
        const tarefas = await consultaTodasTarefas();
        res.json(tarefas); // Retorna as tarefas como JSON
        res.status(200).send("sucesso ao obter todas as tarefas")
    } catch (err) {
        console.error('Erro ao obter tarefas:', err);
        res.status(500).send('Erro ao obter tarefas');
    }
});

app.get('/tarefas/usuario/:id', async (req, res) => {
    const userId = parseInt(req.params.id);
    try {
        const tarefas = await consultaTarefasDeUsuario(userId);
        const usuario = await consultaUsuarioPorId(userId)
        res.status(200).json([usuario,tarefas]);
    } catch (err) {
        console.error('Erro ao obter tarefas do usuário:', err);
        res.status(500).send('Erro ao obter tarefas do usuário');
    }
});


// Inicia o servidor Express
app.listen(port, () => {
    console.log(`Servidor online na porta ${port}`);
});
