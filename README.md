# Desafio Técnico - API de Tarefas

Este projeto é uma API Rest de gerenciamento de tarefas desenvolvida com Node.js, Express e MySQL. A API permite realizar operações CRUD (Criar, Ler, Atualizar e Deletar) em tarefas armazenadas em um banco de dados MySQL.

## Pré-requisitos

Antes de começar, certifique-se de ter os seguintes softwares instalados em sua máquina:

- Node.js (versão 12 ou superior)
- MySQL

## Configuração do Banco de Dados

Para criar o banco de dados localmente, basta utilizar o script SQL fornecido na pasta `script_db`. Siga os passos abaixo:

1. Abra o MySQL Workbench ou qualquer outro cliente MySQL.
2. Conecte-se ao seu servidor MySQL.
3. Execute o script SQL localizado na pasta `script_db` para criar o banco de dados e as tabelas necessárias.

## Configuração do Projeto

1. Clone este repositório:

   ```bash
   git clone https://github.com/GiovanneBohms/APITarefas.git

2. Instale as dependências do projeto: 
```npm install ```

3. Configure a conexão com o banco de dados no arquivo app.js:

```
const connection = mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'DesafioTecnico'
});
```

Certifique-se de substituir as credenciais de conexão (host, port, user, password, database) de acordo com sua configuração local.

4. Inicie o servidor Express:
```
node index.js
```

O servidor estará disponível na porta 3000.

## Endpoints da API

Abaixo estão os endpoints disponíveis na API:

### Buscar Tarefas por Status
- Endpoint: GET /api/tarefas?q=status
- Descrição: Retorna todas as tarefas com o status especificado.
- Parâmetros de Consulta: status (ativo, pendente, concluído)
- Exemplo de Uso: ```
http://localhost:3000/api/tarefas?q=ativo```
### Buscar Tarefa por ID
- Endpoint: GET /api/tarefas/:id
- Descrição: Retorna uma tarefa específica com base no ID fornecido.
- Parâmetros de Rota: id (inteiro)
- Exemplo de Uso: ```
http://localhost:3000/api/tarefas/1```

### Criar Nova Tarefa
- Endpoint: POST /api/tarefas
- Descrição: Cria uma nova tarefa.
- Corpo da Requisição:
```
{"texto": "nova tarefa aqui"}
```

Exemplo de Uso:``` http://localhost:3000/api/tarefas ```

### Atualizar Tarefa por ID
- Endpoint: PATCH /api/tarefas/:id
- Descrição: Atualiza o texto de uma tarefa específica com base no ID fornecido.
- Parâmetros de Rota: id (inteiro)
- Corpo da Requisição:

``` 
{"texto": "atualizar tarefa aqui"}
```

Exemplo de Uso: ```http://localhost:3000/api/tarefas/1```


### Deletar Tarefa por ID
- Endpoint: DELETE /api/tarefas/:id
- Descrição: Deleta uma tarefa específica com base no ID fornecido.
- Parâmetros de Rota: id (inteiro)
- Exemplo de Uso: ```http://localhost:3000/api/tarefas/1```

## Rotas da API

| Endpoint                                    | Tipo     | Descrição                                       |
|---------------------------------------------|----------|-------------------------------------------------|
| http://localhost:3000/api/tarefas?q=status  | GET      | Buscar tarefas por status (ativo, pendente, concluido) |
| http://localhost:3000/api/tarefas/:id       | GET      | Buscar tarefa por ID                            |
| http://localhost:3000/api/tarefas           | POST     | Criar nova tarefa                               |
| http://localhost:3000/api/tarefas/:id                            | PATCH    | Atualizar tarefa por ID                         |
| http://localhost:3000/api/tarefas/:id                            | DELETE   | Deletar tarefa por ID                           |
