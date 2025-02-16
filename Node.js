const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();

// Connessione al database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dipartimento_giustizia'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connesso al database');
});

app.use(bodyParser.json());

// Ottieni tutte le taglie
app.get('/api/taglie', (req, res) => {
    const sql = 'SELECT * FROM ricercati';
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

// Aggiungi una nuova taglia
app.post('/api/taglie', (req, res) => {
    const { nome, foto, descrizione, taglia } = req.body;
    const sql = 'INSERT INTO ricercati (nome, foto, descrizione, taglia) VALUES (?, ?, ?, ?)';
    db.query(sql, [nome, foto, descrizione, taglia], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Taglia aggiunta con successo!' });
    });
});

// Modifica una taglia esistente
app.put('/api/taglie/:id', (req, res) => {
    const { nome, foto, descrizione, taglia } = req.body;
    const sql = 'UPDATE ricercati SET nome = ?, foto = ?, descrizione = ?, taglia = ? WHERE id = ?';
    db.query(sql, [nome, foto, descrizione, taglia, req.params.id], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Taglia aggiornata con successo!' });
    });
});

// Elimina una taglia
app.delete('/api/taglie/:id', (req, res) => {
    const sql = 'DELETE FROM ricercati WHERE id = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Taglia eliminata con successo!' });
    });
});

app.listen(5000, () => {
    console.log('Server in esecuzione sulla porta 5000');
});
