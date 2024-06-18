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

async function consultaTarefaPorStatus(status){

    return new Promise ((resolve, reject)=>{
        const sql=`SELECT * FROM tarefa WHERE status ='${status}'`
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

async function consultaTarefaPorId(id){

    return new Promise ((resolve, reject)=>{
        const sql=`SELECT * FROM tarefa WHERE id_tarefa = '${id}'`
        connection.query(sql, (err,results)=>{
            if(err){
                console.error('erro ao executar consulta de status', err)
                reject(err)
            }else{
                console.log(`Consulta de Status:${id}  realizada com sucesso`);
                console.log(results);
                resolve(results);
            }
        })
    })
}


app.get('/api/tarefas/:id', async (req, res) => {
    const tarefaId = parseInt(req.params.id);
    try {
        const tarefa = await consultaTarefaPorId(tarefaId);
        res.status(200).json(tarefa);
    } catch (err) {
        console.error('Erro ao obter tarefas do usuário:', err);
        res.status(500).send('Erro ao obter tarefas do usuário');
    }
});


app.get('/api/tarefas', async (req, res) => {
    try {
        const termoDeBusca = req.query.q;
        const tarefaPorStatus = await consultaTarefaPorStatus(termoDeBusca);
        res.status(200).json(tarefaPorStatus);
    } catch (err) {
        console.error('Erro ao buscar tarefas por status:', err);
        res.status(500).send('Erro ao buscar tarefas por status');
    }
});


// Inicia o servidor Express
app.listen(port, () => {
    console.log(`Servidor online na porta ${port}`);
});

const urlRotas = ['http://localhost:3000/api/tarefas?q=pendente','http://localhost:3000/api/tarefas/2']
console.table(urlRotas)