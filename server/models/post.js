const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        required: true,
    }
}, {timestamps: true});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;