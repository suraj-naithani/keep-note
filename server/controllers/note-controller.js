const Note = require('../models/note');

const noteForm = async (req, res) => {
    try {
        const response = req.body;
        await Note.create(response);
        console.log(response);
        return res.status(200).json({ msg: "Note added successfully" })
    } catch (error) {
        // console.error(error);
        return res.status(200).json({ msg: "Note added failed" })
    }
}

const getAllUserNotes = async (req, res) => {
    try {
        const userId = req.userId._id;
        const userNotes = await Note.find({ user: userId });
        // console.log(userNotes);
        return res.status(200).json({ userNotes });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, msg: 'Internal Server Error' });
    }
}

const getUserNotesById = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Note.findOne({ _id: id }, { password: 0 });

        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

const updateByUserId = async (req, res) => {
    try {
        const id = req.params.id;
        const updateUserNode = req.body;
        const updateNote = await Note.updateOne({ _id: id }, {
            $set: updateUserNode,
        })
        return res.status(200).json(updateNote);
    } catch (error) {
        console.log(error);
        next(error);
    }
}
const deleteByUserId = async (req, res) => {
    try {
        const id = req.params.id;
        await Note.deleteOne({ _id: id });
        return res.status(200).json({ msg: "Note deleted successfully" });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports = { noteForm, getAllUserNotes, updateByUserId, deleteByUserId, getUserNotesById };