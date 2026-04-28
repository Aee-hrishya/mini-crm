const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
    {
        leadId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Lead",
            required: true
        },
        content: {
            type: String,
            required: [true, "Note content is required"]
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Note", noteSchema);