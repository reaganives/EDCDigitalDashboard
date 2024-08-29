const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    spotifyAccessToken: String,
    spotifyRefreshToken: String,
    spotifyTokenExpiration: Date,
});

const User = mongoose.model('User', userSchema);
module.exports = User;
