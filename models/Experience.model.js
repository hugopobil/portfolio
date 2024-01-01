const mongoose = require("mongoose");

const experienceSchema = mongoose.Schema({
    firm: {
        type: String,
        required: [true, "Title is required"],
    },
    position : {
        type: String,
        required: [true, "Position is required"],
    },
    tech_stack: {
        type: Array,
        required: [true, "Tech stack is required"],
    },
    description: {
        type: String,
        required: [true, "Description is required"],
    },
    responsibilities: {
        type: Array,
        required: [true, "Reponsabilities is required"],
    },
    startDate: {
        type: String,
        required: [true, "Start date is required"],
    },
    endDate: {
        type: String,
        required: [true, "End date is required"],
    },
    location: {
        type: String,
        required: [true, "Location is required"],
    },
    image: {
        type: String,
        required: false,
    },
    firm_link: {
        type: String,
        required: [true, "Firm link is required"],
    },
    firm_description: {
        type: String,
        required: [true, "Firm description is required"],
    },
});

const Experience = mongoose.model("Experience", experienceSchema);
module.exports = Experience;