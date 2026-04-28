const express = require('express');

const router = express.Router();

const {
    createLead,
    getLeads,
    getLeadById,
    updateLead,
    updateStatus
} = require('../controllers/lead.controller');
const {
    addNote,
    getNotes
} = require("../controllers/note.controller");

//leads
router.post("/", createLead);
router.get("/", getLeads);
router.post("/:id", updateLead);
router.get("/:id", getLeadById);
router.put("/:id/status", updateStatus);

//notes
router.post("/:id/notes", addNote);
router.get("/:id/notes", getNotes);

module.exports = router;