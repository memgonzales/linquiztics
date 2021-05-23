var mongoose = require('mongoose');

var ProfileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    picture: {
        type: String,
    },

    username: {
        type: String,
        required: true
    },
	
	password : {
		type: String,
		required: true
	},

    email: {
        type: String,
        required: true
    },

    displayLanguages: {
        type: [String],
        required: true
    },

    streak: {
        type: Number,
        required: true
    },

    exp: {
        type: Number,
        required: true
    },

    league: {
        type: String,
        required: true
    },

    position: {
        type: Number,
        required: true
    },

    quizzesCreated: {
        type: [Number],
        required: true
    },

    quizzesTaken: [
        {
            quizId: {
                type: Number,
                required: true
            },
            quizDate: {
                type: Date,
                default: Date.now
            },
            accuracy: {
                type: Number,
                required: true
            }
        }
    ],

    lastActive: {
        type: Date,
        default: Date.now
    }
});

/*
    exports a mongoose.model object based on `UserSchema` (defined above)
    when another script exports from this file
    This model executes CRUD operations
    to collection `users` -> plural of the argument `User`
*/
module.exports = mongoose.model('Profile', ProfileSchema);
