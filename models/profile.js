'use strict';

const mongoose = require('mongoose')

// Validation functions
const validateName = function(value) {
    return value.trim().length > 0;
}

const ProfileSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        validate: validateName
    },
    lastName: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        validate: validateName
    },
    isVisible: {
        type: Boolean,
        required: true,
        default: true
    },
    // TODO: Add new location tracking
    city: {
        type: String,
        minlength: 1
    },
    province: {
        type: String,
        minlength: 1
    },
    isEmployed: {
        type: Boolean,
        default: false
    },
    isWorkingRemotely: {
        type: Boolean,
        default: false
    },
    isDriver: {
        type: Boolean,
        default: false
    },
    isLifter: {
        type: Boolean,
        default: false
    },
    isShopper: {
        type: Boolean,
        default: false
    },
    isVulnerable: {
        type: Boolean,
        default: false
    },
    hasBiography: {
        type: Boolean,
        default: false
    },
    employment: {
        type: String,
        trim: true,
        minlength: 1,
        maxlength: 40
    },
    liftingAbility: {
        type: Number,
        min: 1,
        max: 999
    },
    biography: {
        type: String,
        trim: true,
        minlength: 1,
        maxlength: 160
    },
    customQualifications: {
        type: [{
            type: String,
            trim: true
        }]
    }
});

const Profile = mongoose.model('Profile', ProfileSchema);
module.exports = { Profile, ProfileSchema }

