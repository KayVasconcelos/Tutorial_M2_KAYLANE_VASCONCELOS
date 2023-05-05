const express = require('express'); 
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })

const sqlite3 = require('sqlite3').verbose();
const DBPATH = '../data/projeto.sql';

const hostname = '127.0.0.1';
const port = 3000;
const app = express();

/* Colocar toda a parte estática no frontend */
app.use(express.static("../frontend/"));

/* Definição dos endpoints */
/******** CRUD ************/
app.use(express.json());

// Retorna todos registros (é o R do CRUD - Read)
app.get('/pessoa', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var db = new sqlite3.Database(DBPATH);
    var sql = 'SELECT * FROM pessoa ORDER BY idpessoa COLLATE NOCASE';
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
        db.close();
    });
});

// Insere um registro (é o C do CRUD - Create)
app.post('/inserePessoa', urlencodedParser, (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    var db = new sqlite3.Database(DBPATH); // Abre o banco
    sql = "INSERT INTO pessoa (idpessoa, descricao, cargo, endereco, telefone, email, habilidade, personalidade) VALUES ('2', 'Thiago', 'estudante', 'algum lugar', '21911112222', 'thiago@gmail.com', 'empatia', 'calmo')";
    console.log(sql);
    db.run(sql, [],  err => {
        if (err) {
            throw err;
        }	
    });
    res.write('<p>USUARIO INSERIDO COM SUCESSO!</p><a href="/">VOLTAR</a>');
    db.close(); // Fecha o banco
    res.end();
});

// Monta o formulário para o update (é o U do CRUD - Update)
app.get('/atualizaPessoa', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const sql = "SELECT * FROM pessoa WHERE idpessoa=" + req.query.idpessoa;
    console.log(sql);
    const db = new sqlite3.Database(DBPATH); // Abre o banco
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
        db.close(); // Fecha o banco
    });
});

// Atualiza um registro (é o U do CRUD - Update)
app.post('/atualizaPessoa', urlencodedParser, (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const sql = "UPDATE pessoa SET cargo='" + 'desenvolvedora' + "' WHERE idpessoa=" + 1;
    console.log(sql);
    const db = new sqlite3.Database(DBPATH); // Abre o banco
    db.run(sql, [], err => {
        if (err) {
            throw err;
        }
        res.write('<p>USUARIO ATUALIZADO COM SUCESSO!</p><a href="/">VOLTAR</a>');
        res.end();
        db.close(); // Fecha o banco
    });
});


// Remove um registro (é o D do CRUD - Delete)
app.delete('/pessoa/:idpessoa', (req, res) => {
    const idpessoa = req.params.idpessoa;
    const sql = "DELETE FROM pessoa WHERE idpessoa = ?";
    console.log(sql);
  
    const db = new sqlite3.Database(DBPATH);
    db.run(sql, [idpessoa], err => {
      if (err) {
        throw err;
      }
      res.status(200).send('USUARIO REMOVIDO COM SUCESSO!');
    });
  });  

app.listen(port, hostname, () => {
console.log(`Servidor rodando em http://${hostname}:${port}/`);
});