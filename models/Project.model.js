const mongoose = require("mongoose");

const projectSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
    },
    location: {
        type: String,
        required: [true, "Location is required"],
    },
    description : {
        type: String,
        required: [true, "Position is required"],
    },
    tech_stack: {
        type: [String],
        required: [true, "Tech stack is required"],
    },
    image: {
        type: String,
        required: [false, "Description is required"],
    },
    file: {
        type: String,
        required: false,
    },
    link: {
        type: String,
        required: false,
    }
});

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;