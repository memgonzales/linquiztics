var mongoose = require('mongoose');

var UserreportSchema = new mongoose.Schema({
    index: {
        type: Number,
        required: true
    },

    name: {
        type: String,
        required: true
    },

    username: {
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
module.exports = mongoose.model('Userreport', UserreportSchema);
