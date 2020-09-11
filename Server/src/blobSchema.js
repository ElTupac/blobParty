const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const blobSchema = new Schema({
    name: String,
    xPos: Number,
    yPos: Number,
    time: Number
});

module.exports = mongoose.model('blob', blobSchema);