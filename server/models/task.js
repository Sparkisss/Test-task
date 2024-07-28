const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    id: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        required: true,
    }
});

const Task = mongoose.model('Post', taskSchema);

module.exports = Task;