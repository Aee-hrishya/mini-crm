const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true
        },
        phone: {
            type: String,
            required: [true, "Phone number is required"]
        },
        email: {
            type: String,
            match: [/^\S+@\S+\.\S+$/, "Please use a valid email"]
        },
        budget: {
            type: Number,
            min: [0, "Budget cannot be negative"]
        },
        location: {
            type: String
        },
        propertyType: {
            type: String,
            enum: ["1BHK", "2BHK", "3BHK", "Plot"]
        },
        source: {
            type: String,
            enum: ["Facebook", "Google", "Referral"]
        },
        status: {
            type: String,
            enum: ["New", "Contacted", "Site Visit", "Closed"],
            default: "New"
        }
    },
    {
        timestamps: true
    }
);

//index
leadSchema.index({ name: "text", phone: "text" });

module.exports = mongoose.model("Lead", leadSchema);