const mongoose = require("mongoose");

const referencesSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Title is required"],
    },
    position : {
        type: String,
        required: [true, "Position is required"],
    },
    organisation: {
        type: Array,
        required: [true, "Tech stack is required"],
    },
    reference: {
        type: String,
        required: [true, "Description is required"],
    },
    image: {
        type: String,
        required: false,
    },
});

const Reference = mongoose.model("Reference", referencesSchema);
module.exports = Reference;