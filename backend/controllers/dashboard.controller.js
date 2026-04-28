const Lead = require("../models/lead.model");

exports.getDashboard = async (req, res) => {
    try {
        const totalLeads = await Lead.countDocuments();

        const leadsBySource = await Lead.aggregate([
            { $group: { _id: "$source", count: { $sum: 1 } } }
        ]);

        const statusDistribution = await Lead.aggregate([
            { $group: { _id: "$status", count: { $sum: 1 } } }
        ]);

        const closedLeads = await Lead.countDocuments({ status: "Closed" });

        const conversionRate = totalLeads
            ? ((closedLeads / totalLeads) * 100).toFixed(2)
            : 0;

        res.json({
            totalLeads,
            leadsBySource,
            statusDistribution,
            conversionRate
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};