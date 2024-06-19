const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('DesafioTecnico.db');

function inserirUsuario(nome, senha) {
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO usuario (nome, senha) VALUES (?, ?)`;

    db.run(sql, [nome, senha], function (err) {
      if (err) {
        reject(err);
      } else {
        console.log(`Usuário inserido com sucesso com ID ${this.lastID}`);
        resolve();
      }
    });
  });
}

function insereNovaTarefa(texto) {
  return new Promise((resolve, reject) => {
    const sqlInsert = 'INSERT INTO tarefa (text, status, usuario_id_usuario) VALUES (?, "ativo", 2)';

    db.run(sqlInsert, [texto], function (err) {
      if (err) {
        console.error('Erro ao executar consulta de inserção', err);
        reject(err);
      } else {
        const lastID = this.lastID; // Obtém o ID da tarefa recém-inserida
        console.log(`Tarefa inserida com sucesso com ID ${lastID}`);
        resolve(lastID);
      }
    });
  });
}
async function insereListaDeUsuarios() {
  const Pessoas = [
    ["Jonas", "1254"],
    ["Emanuel", "77777"],
    ["Isaias", "3333354"],
    ["Irena", "Elaine1235"],
    ["Giovanne", "Satoshin7896"],
    ["Davi", "gata123gata"],
    ["Johan", "jojopontocom"],
    ["Francisco", "9874ghh154"],
    ["Rayane", "874518g"],
    ["Felippe", "4787gffg"],
    ["Ricardo", "844hjgjgnj"]
  ];

  for (const pessoa of Pessoas) {
    const nome = pessoa[0];
    const senha = pessoa[1];
    try {
      await inserirUsuario(nome, senha);
    } catch (err) {
      console.error(err.message);
    }
  }

  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Banco de dados fechado.');
  });
}

insereNovaTarefa("olaaaaaaaaaa mundaummmm")
