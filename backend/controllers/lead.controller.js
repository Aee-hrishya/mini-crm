const Lead = require("../models/lead.model");

// Create Lead
exports.createLead = async (req, res) => {
    try {
        const lead = await Lead.create(req.body);
        res.status(201).json(lead);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get Leads (search + filter + sort)
exports.getLeads = async (req, res) => {
    try {
        const { search, status, source, sortBy = "createdAt", order = "desc" } = req.query;

        let query = {};

        // 🔍 Search
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: "i" } },
                { phone: { $regex: search, $options: "i" } }
            ];
        }

        // 🎯 Filter
        if (status) query.status = status;
        if (source) query.source = source;

        // 🔄 Sort
        const sortOption = `${order === "desc" ? "-" : ""}${sortBy}`;

        const leads = await Lead.find(query).sort(sortOption);

        res.json(leads);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Single Lead
exports.getLeadById = async (req, res) => {
    try {
        const lead = await Lead.findById(req.params.id);
        if (!lead) return res.status(404).json({ message: "Lead not found" });
        res.json(lead);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Lead
exports.updateLead = async (req, res) => {
    try {
        const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.json(lead);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update Status
exports.updateStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const lead = await Lead.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        res.json(lead);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};