const mongoose = require("mongoose")


const { Schema } = mongoose;
const teamSchema = new Schema({

    team_id: {
        type: mongoose.Types.ObjectId,
    },
    team_name: {
        type: String,
    },
    team_logo: {
        type: String,
    },
    team_lead_id: {
        type: mongoose.Types.ObjectId,
        ref: "user",
    },
    team_members: {
        type: Array,
    },
    projects: {
        type: Array,
    },
    rating: {
        type: Number,
    },
})
module.exports = mongoose.model("Team", teamSchema)