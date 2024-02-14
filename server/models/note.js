const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now
    }
})

const Note = new mongoose.model("Note", noteSchema);
module.exports = Note;