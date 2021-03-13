const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const hashSalt = 10;

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
});


UserSchema.pre('save', function(next) {
    this.password = bcrypt.hashSync(this.password, hashSalt);
    next();
})

const User = mongoose.model('User', UserSchema);
module.exports = { User };