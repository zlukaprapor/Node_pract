const express = require('express');
const { Pool } = require('pg');
const path = require('path');

const app = express();
app.use(express.json()); // для парсингу JSON

// Налаштування підключення до бази даних PostgreSQL
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '026323',
    port: 5432, // або інший порт, який використовує ваш PostgreSQL
});

pool.connect((err) => {
    if (err) throw err;
    console.log('Connected to PostgreSQL');
});

// Отримання списку книг
app.get('/books', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM books');
        res.json(result.rows);
    } catch (error) {
        console.error('Error executing query', error);
        res.status(500).send('Internal Server Error');
    }
});

// Додавання нової книги
app.post('/books', async (req, res) => {
    const newBook = req.body;

    try {
        const result = await pool.query('INSERT INTO books(title, author, year, price) VALUES($1, $2, $3, $4) RETURNING *', [newBook.title, newBook.author, newBook.year, newBook.price]);
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error executing query', error);
        res.status(500).send('Internal Server Error');
    }
});

// Оновлення інформації про книгу
app.put('/books/:id', async (req, res) => {
    const bookId = req.params.id;
    const updatedBook = req.body;

    try {
        const result = await pool.query('UPDATE books SET title=$1, author=$2, year=$3, price=$4 WHERE id=$5 RETURNING *', [updatedBook.title, updatedBook.author, updatedBook.year, updatedBook.price, bookId]);
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error executing query', error);
        res.status(500).send('Internal Server Error');
    }
});

// Видалення книги
app.delete('/books/:id', async (req, res) => {
    const bookId = req.params.id;

    try {
        // Перевірте, чи книга існує перед видаленням
        const checkBookQuery = 'SELECT * FROM books WHERE id = $1';
        const checkBookResult = await pool.query(checkBookQuery, [bookId]);

        if (checkBookResult.rows.length === 0) {
            // Книга не знайдена, відправте 404
            res.status(404).send('Book not found');
            return;
        }

        // Видаліть книгу
        const result = await pool.query('DELETE FROM books WHERE id=$1 RETURNING *', [bookId]);
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error executing query', error);
        res.status(500).send('Internal Server Error');
    }
});


// Дозволяє Express обробляти статичні файли (наприклад, HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

const port = 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
