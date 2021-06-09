const db = require('../models/db.js');
const Quiz = require('../models/QuizSchema.js');

const quizzesController = {
	getQuizzes: function(req, res) {


		var query = {status: "Published"};
		var projection = 'idNum title displayLanguage tags dateCreated author ratings subjectLanguages';

		db.findMany(Quiz, query, projection, function(result) {
			if (result != null) {
				var i;
				var j;
				var allQuizzes = [];
				var allDates = [];
				var allRates = [];
				var allTags = [];
				var topDate = [];
				var topDatePics = [];
				var topDateTags = [];
				var topRating = [];
				var topRatingPics = [];
				var topRatingTags = [];

				allQuizzes = result;

				for (i = 0; i < allQuizzes.length; i++) {
					var ave = 0;
					for (j = 0; j < allQuizzes[i].ratings.length; j++) 
						ave += allQuizzes[i].ratings[j];
					
					ave = ave / allQuizzes[i].ratings.length;
					if (allQuizzes[i].ratings.length == 0)
						ave = 0;

					allQuizzes[i].ratings = ave;
				}

				allQuizzes.sort(function (a, b) {
					var keyA = new Date(a.dateCreated);
					var keyB = new Date(b.dateCreated);

					if (keyA < keyB)
						return 1;
					if (keyA > keyB)
						return -1;
					return 0;
				});


				if (req.session.username && req.session.displayLanguages) {
					allQuizzes.sort(function (a, b) {
						var keyA = a.displayLanguage;
						var keyB = b.displayLanguage;

						if (req.session.displayLanguages.includes(keyA) && !req.session.displayLanguages.includes(keyB))
							return -1;
						if (!req.session.displayLanguages.includes(keyA) && req.session.displayLanguages.includes(keyB))
							return 1;
						return 0;
					})
				}

				for (i = 0; i < 3; i++)
					topDate.push(allQuizzes[i]);

				for (i = 0; i < topDate.length; i++) {
					if (topDate[i].subjectLanguages[0] == "German")
						topDatePics.push("../assets/german.png");
					else if (topDate[i].subjectLanguages[0] == "Filipino")
						topDatePics.push("../assets/filipino.png");
					else if (topDate[i].subjectLanguages[0] == "Chinese")
						topDatePics.push("../assets/chinese.png");
					else if (topDate[i].subjectLanguages[0] == "Japanese")
						topDatePics.push("../assets/japanese.png");
					else
						topDatePics.push("../assets/british.png");
				}
				
				/* Handle less than 3 tags */
				for (i = 0; i < 3; i++) {
					if (topDate[i].tags[2]) {
						topDateTags.push(topDate[i].tags[0] + ", " + topDate[i].tags[1] + ", " + topDate[i].tags[2]);
						
					} else {
						if (topDate[i].tags[1]) {
							topDateTags.push(topDate[i].tags[0] + ", " + topDate[i].tags[1]);
							
						} else {
							if (topDate[i].tags[0]) {
								topDateTags.push(topDate[i].tags[0]);
								
							} else {
								topDateTags.push("No tags provided");
							}
						}
					}
				}

				allQuizzes.sort(function (a, b) {
					var keyA = a.ratings;
					var keyB = b.ratings;

					if (keyA < keyB)
						return 1;
					if (keyA > keyB)
						return -1;
					return 0;
				});

				if (req.session.username && req.session.displayLanguages) {
					allQuizzes.sort(function (a, b) {
						var keyA = a.displayLanguage;
						var keyB = b.displayLanguage;

						if (req.session.displayLanguages.includes(keyA) && !req.session.displayLanguages.includes(keyB))
							return -1;
						if (!req.session.displayLanguages.includes(keyA) && req.session.displayLanguages.includes(keyB))
							return 1;
						return 0;
					})
				}

				for (i = 0; i < 3; i++)
					topRating.push(allQuizzes[i]);

				for (i = 0; i < topRating.length; i++) {
					if (topRating[i].subjectLanguages[0] == "German")
						topRatingPics.push("../assets/german.png");
					else if (topRating[i].subjectLanguages[0] == "Filipino")
						topRatingPics.push("../assets/filipino.png");
					else if (topRating[i].subjectLanguages[0] == "Chinese")
						topRatingPics.push("../assets/chinese.png");
					else if (topRating[i].subjectLanguages[0] == "Japanese")
						topRatingPics.push("../assets/japanese.png");
					else
						topRatingPics.push("../assets/british.png");
				}

				for (i = 0; i < 3; i++)
					topRatingTags.push(topRating[i].tags[0] + ", " + topRating[i].tags[1] + ", " + topRating[i].tags[2]);

				for (i = 0; i < allQuizzes.length; i++) {
					allDates.push(allQuizzes[i].dateCreated.getMonth() + 1 + "-" + allQuizzes[i].dateCreated.getDate() + "-" + 
	                              allQuizzes[i].dateCreated.getFullYear());
					allRates.push(allQuizzes[i].ratings[0].toFixed(2));

					var cleanTags = allQuizzes[i].tags[0];

					for (j = 1; j < allQuizzes[i].tags.length; j++) {
						cleanTags += ", " + allQuizzes[i].tags[j];
					}

					allTags.push(cleanTags);	
				}

				if (req.session.username != undefined) {
					if (req.session.username != "linquizticsadmin") {
						var firstname = req.session.name.split(" ", 1);

						var data = {
							allQuizzes: allQuizzes,
							allDates: allDates,
							allRates: allRates, 
							allTags: allTags,
							topDate: topDate,
							topDatePics: topDatePics,
							topDateTags: topDateTags,
							topRating: topRating,
							topRatingPics: topRatingPics,
							topRatingTags: topRatingTags,

							flag: true,
							adminflag: false,
							username: req.session.username,
	                        picture: req.session.picture,
	                        name: req.session.name,
	                        firstname: firstname,
	                        streak: req.session.streak,
	                        exp: req.session.exp,
	                        league: req.session.league,
	                        position: req.session.position
						}
					}

					else {
						var firstname = req.session.name.split(" ", 1);

						var data = {
							allQuizzes: allQuizzes,
							allDates: allDates,
							allRates: allRates, 
							allTags: allTags,
							topDate: topDate,
							topDatePics: topDatePics,
							topDateTags: topDateTags,
							topRating: topRating,
							topRatingPics: topRatingPics,
							topRatingTags: topRatingTags,

							flag: true,
							adminflag: true,
							username: req.session.username,
	                        picture: req.session.picture,
	                        name: req.session.name,
	                        firstname: firstname,
	                        streak: req.session.streak,
	                        exp: req.session.exp,
	                        league: req.session.league,
	                        position: req.session.position
						}
					}
					
				}

				else {
					var data = {
						allQuizzes: allQuizzes,
						allDates: allDates,
						allRates: allRates, 
						allTags: allTags,
						topDate: topDate,
						topDatePics: topDatePics,
						topDateTags: topDateTags,
						topRating: topRating,
						topRatingPics: topRatingPics,
						topRatingTags: topRatingTags,

						flag: false,
						adminflag: false
					}
				}

				res.render('quizzes', data);	
			}
			
		});	
	}
}

module.exports = quizzesController;