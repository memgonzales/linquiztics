var mongoose = require('mongoose');

var CommentreportSchema = new mongoose.Schema({
    index: {
        type: Number,
        required: true
    },

    commentNum: {
        type: Number,
        required: true
    },

    quizNum: {
        type: Number,
        required: true
    },

    comment: {
        type: String,
        required: true
    },

    author: {
        type: String,
        required: true
    },
	
    quiz: {
        type: String,
        required: true
    },

	reportDate: {
		type: Date,
		required: true
	},

    report: {
        type: String,
        required: true
    }
});

/*
    exports a mongoose.model object based on `UserReportSchema` (defined above)
    when another script exports from this file
    This model executes CRUD operations
    to collection `userreports` -> plural of the argument `UserReport`
*/
module.exports = mongoose.model('Commentreport', CommentreportSchema);
