const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Post = require('./models/post');

const app = express();
const PORT = 5000;
const db = 'mongodb+srv://sparkisisss:f7901992f@cluster0.4wiqcei.mongodb.net/Tasks-list?retryWrites=true&w=majority&appName=Cluster0';

mongoose
    .connect(db)
    .then((res) => console.log('Connected to DB'))
    .catch((error) => console.log(error));

// Middleware для обработки JSON
app.use(cors());
app.use(express.json());

// Эндпоинт для получения задач
app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Post.find(); // Получаем все задачи из коллекции
        res.json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

// Эндпоинт для добавления новой задачи
app.post('/tasks', (req, res) => {
    const { id, title, completed } = req.body;
    const post = new Post({ id, title, completed });
    post
        .save()
        .then((result) => res.send(result))
        .catch((error) => {
            console.log(error);
            res.status(500).send('Error saving task');
        });
});

// Эндпоинт для удаления задачи
app.delete('/tasks/:id', async (req, res) => {
    const { id } = req.params; // Получаем ID из параметров запроса

    try {
        // Удаляем задачу по полю id
        const deletedTask = await Post.findOneAndDelete({ id: parseInt(id) }); // Преобразуем id в число

        if (!deletedTask) {
            return res.status(404).send('Task not found'); // Если задача не найдена
        }

        res.send('Task deleted successfully'); // Успешное удаление
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error'); // Обработка ошибок сервера
    }
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
