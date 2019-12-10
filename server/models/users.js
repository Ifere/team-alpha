const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { Schema } = mongoose;
const userSchema = new Schema({

    date_created: {
        type: Date,
        default: new Date(),
    },
    user_id: {
        type: mongoose.Types.ObjectId,
    },
    team_id: {
        type: mongoose.Types.ObjectId,
    }, 
    first_name: {
        type: String,
    },
    last_name: {
        type: String,
    },
    email: {
        type: String,
        index: true,
        unique: true,
        sparse: true,
    }, 
    phone: {
        type: String,
    },
    password: {
        type: String,
    },
    dob: {
        type: Date,
    },
    role: {
        type: String,
    },
    user_type: {
        type: String,
        enum: ['member', 'lead'],
        default: 'member',
        required: true,
    },
    address: {
        type: String,
    },
    avatar: {
        type: String,
    },
    has_team: {
        type: Boolean,
    },
    projects: {
        type: Array,
    }
});

userSchema.pre('save', async function (next) {
    // Hash the password before saving the user model
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});


module.exports = mongoose.model('User', userSchema);