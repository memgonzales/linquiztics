const mongoose = require('mongoose');
const db = require('../models/db.js');
const Quizreport = require('../models/QuizreportSchema.js');

db.connect();

var rep1 = {
	index: 1,
	quizNum: 3,
	title: "Conyo 101",
	author: "danccgabe",
	reportDate: new Date('2021-03-31'),
	report: "Hate speech"
};

var rep2 = {
	index: 2,
	quizNum: 4,
	title: "Terms for Family Members",
	author: "ksaotome",
	reportDate: new Date('2021-03-31'),
	report: "Harassment"
};


db.insertMany(Quizreport, [rep1, rep2], function(flag) {
	if (flag) {
		console.log("\nDatabase population complete! Press Ctrl + C to continue.");
	}
});
