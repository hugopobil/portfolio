const mongoose = require("mongoose");

const educationSchema = mongoose.Schema({
    institution: {
        type: String,
        required: [true, "Title is required"],
    },
    course : {
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
        required: [true, "Image is required"],
    },
});

const Education = mongoose.model("Education", educationSchema);
module.exports = Education;