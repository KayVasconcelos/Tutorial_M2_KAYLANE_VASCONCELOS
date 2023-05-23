const express = require('express'); 
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })

const sqlite3 = require('sqlite3').verbose();
const DBPATH = '../data/projeto.db';

const hostname = '127.0.0.1';
const port = 3000;
const app = express();

app.use(express.json());

/* Definição dos endpoints */
/******** CRUD ************/
app.use(express.json());

// Retorna todos registros (é o R do CRUD - Read)
app.get('/pessoa', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    let db = new sqlite3.Database(DBPATH);
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
    const db = new sqlite3.Database(DBPATH);
    const sql = "INSERT INTO pessoa (descricao, cargo, endereco, telefone, email, habilidade, personalidade) VALUES (?, ?, ?, ?, ?, ?, ?)";
    db.run(sql, Object.values(pessoa), function(err) {
        if (err) {
            console.error(err);
            res.status(500).send('Erro ao inserir pessoa');
            return;
        }
        const idpessoa = this.lastID;
        res.status(201).send(`<p>Usuário inserido com sucesso! ID: ${idpessoa}</p><a href="/">Voltar</a>`);
    });
    db.close();
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
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    var db = new sqlite3.Database(DBPATH); // Abre o banco
    var sql = 'SELECT idpessoa, descricao, cargo, endereco, telefone, email, habilidade,personalidade FROM pessoa ORDER BY idpessoa ASC';
    db.all(sql, [],  (err, rows ) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close(); // Fecha o banco
}); 

app.get('/mostraPessoa', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    var db = new sqlite3.Database(DBPATH); // Abre o banco
    var sql = 'SELECT idpessoa, descricao, cargo, endereco, telefone, email, habilidade,personalidade FROM pessoa ORDER BY idpessoa ASC';
    db.all(sql, [],  (err, rows ) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close(); // Fecha o banco
});

app.get('/mostraExperiencia', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    var db = new sqlite3.Database(DBPATH); // Abre o banco
    var sql = 'SELECT idexperiencia, empresa, anoinicio, anofim, cargo, descricao, idpessoa FROM experiencia ORDER BY idexperiencia ASC';
    db.all(sql, [],  (err, rows ) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close(); // Fecha o banco
});

app.get('/mostraRealizacoes', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    var db = new sqlite3.Database(DBPATH); // Abre o banco
    var sql = 'SELECT idrealizacao, nome, ano, descricao, idpessoa FROM realizacoes ORDER BY idrealizacoes ASC';
    db.all(sql, [],  (err, rows ) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close(); // Fecha o banco
});

app.get('/mostraFormacao', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    var db = new sqlite3.Database(DBPATH); // Abre o banco
    var sql = 'SELECT idformacao, curso, anoinicio, anofim, descricao, idpessoa FROM formacao ORDER BY idformacao ASC';
    db.all("sql", [],  (err, rows ) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close(); // Fecha o banco
});

app.listen(port, hostname, () => {
    console.log(`Servidor rodando em http://${hostname}:${port}/`);
});
