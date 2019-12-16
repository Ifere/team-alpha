const mongoose = require("mongoose")

const { Schema } = mongoose;
const projectSchema = new Schema({
    project_id: {
        type: mongoose.Types.ObjectId,
    },
    project_name: {
        type: String,
    },
    project_description: {
        type: String
    },
    project_avatar: {
        type: String,
    },
    project_url: {
        type: String,
    },
    project_stack: {
        type: Array,
    },

})

module.exports = mongoose.model(Project, projectSchema)