const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    description: {
        type: String,
        required: true
    },
    files: {
        type: [String],
        required: false
    },
    completed: {
        type: Boolean,
        default: false
    },
    notes: {
        type: String,
    },
    priority: {
        type: String,
        enum: ["low", "medium", "high"],
        default: "low"
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
})

module.exports = mongoose.model("task", TaskSchema);