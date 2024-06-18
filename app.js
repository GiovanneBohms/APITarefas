const mysql = require('mysql2');
const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());

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

async function atualizaTarefaPorID(text, id){

    return new Promise ((resolve, reject)=>{
        const sql=`UPDATE tarefa SET text = '${text}' WHERE id_tarefa =${id};`
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

async function insereNovaTarefa(texto){

    return new Promise ((resolve, reject)=>{
        const sql=`INSERT INTO tarefa (text, status, usuario_id_usuario) VALUES ('${texto}', 'ativo', 2);`
        connection.query(sql, (err,results)=>{
            if(err){
                console.error('erro ao executar consulta de status', err)
                reject(err)
            }else{
                console.log(results);
                resolve(results);
            }
        })
    })
}

async function deletaTarefaPorID(id){

    return new Promise ((resolve, reject)=>{
        const sql=`DELETE FROM tarefa WHERE id_tarefa = '${id}'`;
        connection.query(sql, (err,results)=>{
            if(err){
                console.error('erro ao executar consulta de status', err)
                reject(err)
            }else{
                
                console.log(results);
                resolve(results);
            }
        })
    })
}

// deletaTarefaPorID(18)

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



app.post('/api/tarefas',async (req, res) => {
    const {texto }= req.body
    console.log('Recebido:', req.body)
    try{
        await insereNovaTarefa(texto);
        res.status(200).json({mensage:"nova tarefa inserida com sucesso"});
    }catch(erro){
       console.error('erro ao inserir nova tabela', erro);
    }
});

app.patch('/api/tarefas/:id', async (req,res)=>{
    try{
        const idTarefa = req.params.id;
        const {texto} = req.body;
        console.log(idTarefa,texto)
        await atualizaTarefaPorID(texto, idTarefa)
        res.status(200).json({mensage:"atualização recebida com sucesso"})
    }catch(err){
        console.error(err)
        res.status(500)
    }
})

app.delete('/api/tarefas/:id', async (req, res)=>{
    const idTarefa = req.params.id
    try{
            await deletaTarefaPorID(idTarefa)
            res.sendStatus(200)
    }catch(err){
        console.error(err);
        res.sendStatus(500)
    }
    
})



// Inicia o servidor Express
app.listen(port, () => {
    console.log(`Servidor online na porta ${port}`);
});

const urlRotas = [
    {endpoints:'http://localhost:3000/api/tarefas?q=status',tipo: 'get possibilidades de status: Ativo, Pendente, Conluído'},
    {endpoints:'http://localhost:3000/api/tarefas/:id',tipo:'get id: valor inteiro' },
    {endpoints:'http://localhost:3000/api/tarefas',tipo:'post: {"texto": "inserir nova tarefa aqui"}'},
    {endpoints:'/api/tarefas/:id',tipo:'patch: {"texto": "atualizar tarefa aqui"}'},
    {endpoints:'/api/tarefas/:id',tipo:'delete'}
]
console.table(urlRotas)