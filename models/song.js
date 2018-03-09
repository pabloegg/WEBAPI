var mongoose = require('mongoose');

var SongSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    seconds: String,

    releaseDate: String,
    _album: { type: mongoose.Schema.Types.ObjectId, ref: 'Album'}

}, {
    timestamps: true
});

module.exports = mongoose.model('Song', SongSchema);
