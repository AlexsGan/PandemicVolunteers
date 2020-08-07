'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const ProfileSchema = require('./profile').ProfileSchema;

// Validation functions
const validateUsername = function(value) {
    if (value.match(/^\w+$/)) {
        return true;
    }
    throw new Error('Username cannot contain spaces or non-alphanumerics.')
}

const validatePassword = function(value) {
    if (value.match(/^\S+$/)) {
        return true;
    }
    throw new Error('Password cannot contain spaces.')
}

const validateBirthday = function(value) {
    // Ensure age is 18 or older
    const today = new Date();
    const adjustedBirthday = new Date(value.getFullYear() + 18, value.getMonth() - 1, value.getDate());
    if (adjustedBirthday <= today) {
        return true;
    }
    throw new Error('Age must be at least 18 years old.')
}

// Schema definition
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 20,
        trim: true,
        unique: true,
        validate: validateUsername
    },
    password: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 20,
        validate: validatePassword
    },
    birthday: {
        type: Date,
        required: true,
        min: '1900-01-01',
        validate: validateBirthday
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    profile: ProfileSchema
});

UserSchema.pre('save', function(next) {
   const User = this;
   if (User.isModified('password')) {
       bcrypt.genSalt(10, (err, salt) => {
           bcrypt.hash(user.password, salt, (err, hash) => {
               User.password = hash;
               next();
           });
       });
   } else {
       next();
   }
});

UserSchema.statics.getUser = function(username, password) {
    const User = this;
    // Find by username
    return User.findOne({ username: username }).then((user) => {
        if (!user) {
            return Promise.reject();
        }
        // Verify password
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, result) => {
                if (result) {
                    resolve(user);
                } else {
                    reject();
                }
            });
        });
    })
}

const User = mongoose.model('User', UserSchema);
module.exports = { User }

