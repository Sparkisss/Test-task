const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
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

const Post = mongoose.model('Post', postSchema);

module.exports = Post;