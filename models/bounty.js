const mongoose = require('mongoose');
const Schema = mongoose.Schema

const bountySchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    reward: {
        type: Number,
        required: true
    },
    faction: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Bounty", bountySchema)