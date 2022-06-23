const { Schema, model, Types: { ObjectId } } = require('mongoose');

// TODO add validation

// const URL_PATTERN = /^https?:\/\/(.+)/;
// const NAME_PATTERN = /^[a-zA-Z]+$/;
// const EMAIL_PATTERN = /^([a-zA-Z]+)@([a-zA-Z]+)\.([a-zA-Z]+)$/;

const userSchema = new Schema({
    username: { type: String, minlength: [3, 'Username should be at least 4 characters long!'] },
    hashedPassword: { type: String, required: true },
    address: { type: String, maxlength: [20, 'Address should be a maximum of 20 characters long!'] },
    publications: { type: [ObjectId], ref: 'Publication', default: [] }
});

userSchema.index({ username: 1 }, {
    unique: true,
    collation: {
        locale: 'en',
        strength: 2
    }
});

const User = model('User', userSchema);

module.exports = User;