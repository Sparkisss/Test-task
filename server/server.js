const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Post = require('./models/post');

const app = express();
const PORT = 5000;
const db = 'mongodb+srv://sparkisisss:f7901992f@cluster0.4wiqcei.mongodb.net/Tasks-list?retryWrites=true&w=majority&appName=Cluster0'

mongoose
    .connect(db)
    .then((res) => console.log('Connected to DB'))
    .catch((error) => console.log(error));

// Middleware для обработки JSON
app.use(cors());
app.use(express.json());

// Массив для хранения задач
let tasks = [];

// Эндпоинт для получения задач
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// Эндпоинт для добавления новой задачи
app.post('/tasks', (req, res) => {
    const { title, completed } = req.body;
    const post = new Post({ title, completed });
    post
        .save()
        .then((result) => res.send(result))
        .catch((error) => {
            console.log(error);
        })
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
