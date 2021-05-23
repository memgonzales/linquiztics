const mongoose = require('mongoose');
const db = require('../models/db.js');
const Userreport = require('../models/UserreportSchema.js');

db.connect();

var rep1 = {
	index: 1,
	name: "Benny Terrier",
	username: "bulljanai",
	reportDate: new Date('2021-03-28'),
	report: "Hate speech"
};

var rep2 = {
	index: 2,
	name: "Buddy Boxer",
	username: "willfightforu",
	reportDate: new Date('2021-03-28'),
	report: "Harassment"
};

var rep3 = {
	index: 3,
	name: "Sara Beagle",
	username: "notsnoopy",
	reportDate: new Date('2021-03-29'),
	report: "Harassment"
};

var rep4 = {
	index: 4,
	name: "Brian Collie",
	username: "borderc",
	reportDate: new Date('2021-03-30'),
	report: "Hate speech"
};

var rep5 = {
	index: 5,
	name: "Jolene Cujo",
	username: "aifairouz",
	reportDate: new Date('2021-03-31'),
	report: "Inappropriate content"
};


db.insertMany(Userreport, [rep1, rep2, rep3, rep4, rep5], function(flag) {
	if (flag) {
		console.log("\nDatabase population complete! Press Ctrl + C to continue.");
	}
});
