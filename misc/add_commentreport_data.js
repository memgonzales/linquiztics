const mongoose = require('mongoose');
const db = require('../models/db.js');
const Quizreport = require('../models/CommentreportSchema.js');

db.connect();

var rep1 = {
	index: 1,
	commentNum: 21001,
	quizNum: 2,
	comment: "Not beginner-friendly, but very cool :)",
	author: "ksaotome",
	quiz: "Anime Quotes",
	reportDate: new Date('2021-03-29'),
	report: "Harassment"
};

var rep2 = {
	index: 2,
	commentNum: 12001001,
	quizNum: 1,
	comment: "isn't the correct answer katzen?",
	author: "mayaputingpupper",
	quiz: "Basic Animals",
	reportDate: new Date('2021-03-30'),
	report: "Trolling"
};

var rep3 = {
	index: 3,
	commentNum: 51001,
	quizNum: 5,
	comment: "This was lit! Waiting for a part 2!",
	author: "danccgabe",
	quiz: "Filipino to English Translation",
	reportDate: new Date('2021-03-31'),
	report: "Trolling"
};


db.insertMany(Quizreport, [rep1, rep2, rep3], function(flag) {
	if (flag) {
		console.log("\nDatabase population complete! Press Ctrl + C to continue.");
	}
});
