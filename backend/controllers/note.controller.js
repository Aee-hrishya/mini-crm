const Note = require("../models/note.model");

// Add note to lead
exports.addNote = async (req, res) => {
    try {
        const { content } = req.body;

        const note = await Note.create({
            leadId: req.params.id,
            content
        });

        res.status(201).json(note);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get notes for a lead
exports.getNotes = async (req, res) => {
    try {
        const notes = await Note.find({ leadId: req.params.id }).sort("-createdAt");
        res.json(notes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};