const db = require('../models/db.js');
const Profile = require('../models/ProfileSchema.js');
const Quiz = require('../models/QuizSchema.js');
const Quizreport = require('../models/QuizreportSchema.js');
const Commentreport = require('../models/CommentreportSchema.js');
const bcrypt = require('bcrypt');

const quizController = {
	getQuizTeaser: function(req, res) {
		var query = {idNum: req.params.idNum};
		var projection = 'tags subjectLanguages ratings accuracies idNum status title author numItems dateCreated displayLanguage description comments';

		db.findOne (Quiz, query, projection, function (result) {			
			if (result != null && result.author) {				
			
				var tags = result.tags;
				var subjectLanguages = result.subjectLanguages;
				var ratings = result.ratings;
				var accuracies = result.accuracies;
				var idNum = result.idNum;
				var status = result.status;
				var title = result.title;
				var author = result.author;
				var numItems = result.numItems;
				var dateCreated = result.dateCreated.getMonth() + 1 + "-" + result.dateCreated.getDate() + "-" + 
								  result.dateCreated.getFullYear();
				var displayLanguage = result.displayLanguage;
				var description = result.description;
				
				var commentIndices = [];
				var commentIds = [];
				var commentAuthors = [];
				var commentAuthorNames = [];
				var commentAuthorPictures = [];
				var datesPosted = [];
				var bodies = [];

				commentIndices = result.comments;
				for (var i = 0; i < commentIndices.length; i++) {
					commentIds.push(commentIndices[i].commentId);
					commentAuthors.push(commentIndices[i].author);
					datesPosted.push(commentIndices[i].datePosted.getMonth() + 1 + "-" + commentIndices[i].datePosted.getDate() + "-" + 
								     commentIndices[i].datePosted.getFullYear());
					bodies.push(commentIndices[i].body);
				}

				var cleanTags = "";
				for (var i = 0; i < tags.length; i++) {
					cleanTags += tags[i];
					
					if (tags.length != 1) {
						if (i != tags.length - 1) {
							cleanTags += ", ";
						}
					}
				}
								
				var cleanSubjectLanguages = "";
				if (subjectLanguages) {
					for (var i = 0; i < subjectLanguages.length; i++) {
						cleanSubjectLanguages += subjectLanguages[i];
						
						if (subjectLanguages.length != 1) {
							if (i != subjectLanguages.length - 1) {
								cleanSubjectLanguages += ", ";
							}
						}
					}
				}		

				var averageRating = 0;
				for (var i = 0; i < ratings.length; i++) {
					averageRating += ratings[i];
				}
				
				averageRating = averageRating / ratings.length;

				if (ratings.length == 0)
					averageRating = 0;
				
				var averageAccuracies = 0;
				for (var i = 0; i < accuracies.length; i++) {
					averageAccuracies += accuracies[i];
				}
				
				averageAccuracies = averageAccuracies / accuracies.length;
				averageAccuracies = averageAccuracies.toFixed(2);

				if (accuracies.length == 0)
					averageAccuracies = 0;

				var query = {username: commentAuthors};
				var projection = 'username name picture';
								
				db.findMany(Profile, query, projection, function (qresult) {					
					if (qresult != null) {	
					
						for (var i = 0; i < commentAuthors.length; i++) {
							for (var j = 0; j < qresult.length; j++) {
                                if (qresult[j].username == commentAuthors[i]) {
                                    commentAuthorNames.push(qresult[j].name);
                                    commentAuthorPictures.push(qresult[j].picture);
                                }
                            }
						}
						
						var query = {username: author};
						var projection = 'username name';
						
						db.findOne (Profile, query, projection, function (result) {
							
							if (result != null) {
								var authorName = result.name;

								if (req.session.username != undefined) {
									if (req.session.username != "linquizticsadmin") {
										var firstname = req.session.name.split(" ", 1);

										var quiz = {
											tags: cleanTags,
											subjectLanguages: cleanSubjectLanguages,
											ratings: averageRating,
											accuracies: averageAccuracies,
											idNum: idNum,
											status: status,
											title: title,
											author: author,
											authorName: authorName,
											numItems: numItems,
											dateCreated: dateCreated,
											displayLanguage: displayLanguage,
											description: description,
											commentIds: commentIds,
											commentAuthors: commentAuthors,
											commentAuthorNames: commentAuthorNames,
											commentAuthorPictures: commentAuthorPictures,
											datesPosted: datesPosted,
											bodies: bodies,
											
											sessionflag: true,
											sessionadminflag: false,
											sessionusername: req.session.username,
											sessionpicture: req.session.picture,
											sessionname: req.session.name,
											sessionfirstname: firstname,
											sessionstreak: req.session.streak,
											sessionexp: req.session.exp,
											sessionleague: req.session.league,
											sessionposition: req.session.position
										}
									}

									else {
										var firstname = req.session.name.split(" ", 1);

										var quiz = {
											tags: cleanTags,
											subjectLanguages: cleanSubjectLanguages,
											ratings: averageRating,
											accuracies: averageAccuracies,
											idNum: idNum,
											status: status,
											title: title,
											author: author,
											authorName: authorName,
											numItems: numItems,
											dateCreated: dateCreated,
											displayLanguage: displayLanguage,
											description: description,
											commentIds: commentIds,
											commentAuthors: commentAuthors,
											commentAuthorNames: commentAuthorNames,
											commentAuthorPictures: commentAuthorPictures,
											datesPosted: datesPosted,
											bodies: bodies,
											
											sessionflag: true,
											sessionadminflag: true,
											sessionusername: req.session.username,
											sessionpicture: req.session.picture,
											sessionname: req.session.name,
											sessionfirstname: firstname,
											sessionstreak: req.session.streak,
											sessionexp: req.session.exp,
											sessionleague: req.session.league,
											sessionposition: req.session.position
										}
									}
									
								}
								
								else {
									var quiz = {
										tags: cleanTags,
										subjectLanguages: cleanSubjectLanguages,
										ratings: averageRating,
										accuracies: averageAccuracies,
										idNum: idNum,
										status: status,
										title: title,
										author: author,
										authorName: authorName,
										numItems: numItems,
										dateCreated: dateCreated,
										displayLanguage: displayLanguage,
										description: description,
										commentIds: commentIds,
										commentAuthors: commentAuthors,
										commentAuthorNames: commentAuthorNames,
										commentAuthorPictures: commentAuthorPictures,
										datesPosted: datesPosted,
										bodies: bodies
									}
								}

								res.render('quizTeaser', quiz);
							}
						});
						
						
					}
				});
				
				
			}
			
			else {
				if(req.session.username == undefined) {
                    var details = {
                    	flag: false,
                    	adminflag: false
                    };

                    res.render('error', details);
                }

                else {
                    if (req.session.username != "linquizticsadmin") {
                    	var firstname = req.session.name.split(" ", 1);

	                    var details = {
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

	                    var details = {
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

                    res.render('error', details);
                }
			}
		});	
	},
	
	getQuiz: function(req, res) {
		var query = {idNum: req.params.idNum};
		var projection = 'tags subjectLanguages ratings accuracies idNum status title author numItems dateCreated displayLanguage description questions';
		
		db.findOne (Quiz, query, projection, function (result) {
			if (result != null) {
				var tags = result.tags;
				var subjectLanguages = result.subjectLanguages;
				var ratings = result.ratings;
				var accuracies = result.accuracies;
				var idNum = result.idNum;
				var status = result.status;
				var title = result.title;
				var author = result.author;
				var numItems = result.numItems;
				var dateCreated = result.dateCreated.getMonth() + 1 + "-" + result.dateCreated.getDate() + "-" + 
								  result.dateCreated.getFullYear();
				var displayLanguage = result.displayLanguage;
				var description = result.description;
				
				var questionIndices = [];
				var questionBodies = [];
				var choicesA = [];
				var choicesB = [];
				var choicesC = [];
				var choicesD = [];
				var correctAnswers = [];
				var explanations = [];
				var images = [];
				var audios = [];
				
				var commentIndices = [];
				var commentIds = [];
				var commentAuthors = [];
				var commentAuthorNames = [];
				var commentAuthorPictures = [];
				var datesPosted = [];
				var bodies = [];
				
				questionIndices = result.questions;
				
				for (var i = 0; i < questionIndices.length; i++) {
					questionBodies.push(questionIndices[i].body);
					choicesA.push(questionIndices[i].choiceA);
					choicesB.push(questionIndices[i].choiceB);
					choicesC.push(questionIndices[i].choiceC);
					choicesD.push(questionIndices[i].choiceD);
					correctAnswers.push(questionIndices[i].correctAnswer);
					explanations.push(questionIndices[i].explanation);
					images.push(questionIndices[i].image);
					audios.push(questionIndices[i].audio);
					
					// comments
					commentIndices.push(questionIndices[i].comments);					
					
					for (var j = 0; j < commentIndices[i].length; j++) {					
						commentIds.push(commentIndices[i][j].itemCommentId);						
						commentAuthors.push(commentIndices[i][j].author);
						datesPosted.push(commentIndices[i][j].datePosted.getMonth() + 1 + "-" + 
									     commentIndices[i][j].datePosted.getDate() + "-" + 
								         commentIndices[i][j].datePosted.getFullYear());
						bodies.push(commentIndices[i][j].body);
					}
					
				}
				
				var cleanTags = "";
				for (var i = 0; i < tags.length; i++) {
					cleanTags += tags[i];
					
					if (tags.length != 1) {
						if (i != tags.length - 1) {
							cleanTags += ", ";
						}
					}
				}

				var cleanSubjectLanguages = "";
				for (var i = 0; i < subjectLanguages.length; i++) {
					cleanSubjectLanguages += subjectLanguages[i];
					
					if (subjectLanguages.length != 1) {
						if (i != subjectLanguages.length - 1) {
							cleanSubjectLanguages += ", ";
						}
					}
				}
				
				var averageRating = 0;
				for (var i = 0; i < ratings.length; i++) {
					averageRating += ratings[i];
				}
				
				averageRating = averageRating / ratings.length;
				
				var averageAccuracies = 0;
				for (var i = 0; i < accuracies.length; i++) {
					averageAccuracies += accuracies[i];
				}
				
				averageAccuracies = averageAccuracies / accuracies.length;
				averageAccuracies = averageAccuracies.toFixed(2);
				
				var query = {username: commentAuthors};
				var projection = 'username name picture';
				
				db.findMany(Profile, query, projection, function (qresult) {			
					var query = {username: author};
					var projection = 'username name';
					
					if (qresult != null) {	
						console.log("Found commenters!");
					
						for (var i = 0; i < commentAuthors.length; i++) {
							for (var j = 0; j < qresult.length; j++) {
                                if (qresult[j].username == commentAuthors[i]) {
                                    commentAuthorNames.push(qresult[j].name);
                                    commentAuthorPictures.push(qresult[j].picture);
                                }
                            }
						}
					
						db.findOne (Profile, query, projection, function (result) {
							if (result != null) {
								var authorName = result.name;
							
								if (req.session.username != undefined) {
									if (req.session.username != "linquizticsadmin") {
										var firstname = req.session.name.split(" ", 1);

										var quiz = {
											tags: cleanTags,
											subjectLanguages: cleanSubjectLanguages,
											ratings: averageRating,
											accuracies: averageAccuracies,
											idNum: idNum,
											status: status,
											title: title,
											author: author,
											authorName: authorName,
											numItems: numItems,
											dateCreated: dateCreated,
											displayLanguage: displayLanguage,
											description: description,
											questionIndices: questionIndices,
											questionBodies: questionBodies,
											choicesA: choicesA,
											choicesB: choicesB,
											choicesC: choicesC,
											choicesD: choicesD,
											correctAnswers: correctAnswers,
											explanations: explanations,
											images: images,
											audios: audios,
											
											commentIds: commentIds,
											commentAuthors: commentAuthors,
											commentAuthorNames: commentAuthorNames,
											commentAuthorPictures: commentAuthorPictures,
											datesPosted: datesPosted,
											bodies: bodies,

											sessionflag: true,
											sessionadminflag: false,
											sessionusername: req.session.username,
											sessionpicture: req.session.picture,
											sessionname: req.session.name,
											sessionfirstname: firstname,
											sessionstreak: req.session.streak,
											sessionexp: req.session.exp,
											sessionleague: req.session.league,
											sessionposition: req.session.position
										}
									}

									else {
										var firstname = req.session.name.split(" ", 1);

										var quiz = {
											tags: cleanTags,
											subjectLanguages: cleanSubjectLanguages,
											ratings: averageRating,
											accuracies: averageAccuracies,
											idNum: idNum,
											status: status,
											title: title,
											author: author,
											authorName: authorName,
											numItems: numItems,
											dateCreated: dateCreated,
											displayLanguage: displayLanguage,
											description: description,
											questionIndices: questionIndices,
											questionBodies: questionBodies,
											choicesA: choicesA,
											choicesB: choicesB,
											choicesC: choicesC,
											choicesD: choicesD,
											correctAnswers: correctAnswers,
											explanations: explanations,
											images: images,
											audios: audios,
											
											commentIds: commentIds,
											commentAuthors: commentAuthors,
											commentAuthorNames: commentAuthorNames,
											commentAuthorPictures: commentAuthorPictures,
											datesPosted: datesPosted,
											bodies: bodies,

											sessionflag: true,
											sessionadminflag: true,
											sessionusername: req.session.username,
											sessionpicture: req.session.picture,
											sessionname: req.session.name,
											sessionfirstname: firstname,
											sessionstreak: req.session.streak,
											sessionexp: req.session.exp,
											sessionleague: req.session.league,
											sessionposition: req.session.position
										}
									}		
								}
								
								else {
									var quiz = {
										tags: cleanTags,
										subjectLanguages: cleanSubjectLanguages,
										ratings: averageRating,
										accuracies: averageAccuracies,
										idNum: idNum,
										status: status,
										title: title,
										author: author,
										authorName: authorName,
										numItems: numItems,
										dateCreated: dateCreated,
										displayLanguage: displayLanguage,
										description: description,
										questionIndices: questionIndices,
										questionBodies: questionBodies,
										choicesA: choicesA,
										choicesB: choicesB,
										choicesC: choicesC,
										choicesD: choicesD,
										correctAnswers: correctAnswers,
										explanations: explanations,
										images: images,
										audios: audios,
										
										commentIds: commentIds,
										commentAuthors: commentAuthors,
										commentAuthorNames: commentAuthorNames,
										commentAuthorPictures: commentAuthorPictures,
										datesPosted: datesPosted,
										bodies: bodies
									}
								}
								
								res.render('quiz', quiz);
							}
						});
					}
				});
			}
			
			else {
				if(req.session.username == undefined) {
                    var details = {
                    	flag: false,
                    	adminflag: false
                    };

                    res.render('error', details);
                }

                else {
                    if (req.session.username != "linquizticsadmin") {
                    	var firstname = req.session.name.split(" ", 1);

	                    var details = {
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

	                    var details = {
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
                    

                    res.render('error', details);
                }
			}
		});
	},

	postAddComment: function(req, res) {
		var idNum = req.body.idNum;
		var addedComment = req.body.addedComment;
		var dateEdited = new Date();

		var query = {idNum: idNum};
		var projection = 'comments';

		db.findOne(Quiz, query, projection, function(result) {
			var len = result.comments.length - 1;
			var newCommentNum;

			// first comment
			if (len == -1) {
				newCommentNum = idNum + '1' + '0' + '0' + '1';
			}

			// not first comment
			else
				newCommentNum = result.comments[len].commentId + 1;

			var newComment = {
				commentId: newCommentNum,
				author: req.session.username,
				datePosted: dateEdited,
				body: addedComment
			}

			result.comments.push(newComment);

			var filter = {idNum: idNum};
			var update = {comments: result.comments};

			db.updateOne(Quiz, filter, update, function(err, result) {
				res.status(200).send();
			});
		});
	},

	postEditComment: function(req, res) {
		var idNum = req.body.idNum;
		var commentNum = req.body.commentNum;
		var editedComment = req.body.editedComment;
		var dateEdited = new Date();

		var filter = {'comments.commentId': commentNum};
        var update = {
        	'comments.$.datePosted': dateEdited,
        	'comments.$.body': editedComment
        };

        db.updateOne(Quiz, filter, update, function (err, result) {
            res.status(200).send();
        });  
	},

	postDeleteComment: function(req, res) {
		var idNum = req.body.idNum;
		var commentNum = req.body.commentNum;

		var filter = {idNum: idNum};
        var update = {$pull: {'comments': {'commentId': commentNum}}};

        db.updateOne(Quiz, filter, update, function (err, result) {
            res.status(200).send();
        });  
	},
	
	getQuizSummary: function(req, res) {
		var query = {idNum: req.params.idNum};
		var projection = 'tags subjectLanguages ratings accuracies idNum status title author numItems dateCreated displayLanguage description comments questions';
		
		db.findOne (Quiz, query, projection, function (result) {			
			if (result != null) {				
			
				var tags = result.tags;
				var subjectLanguages = result.subjectLanguages;
				var ratings = result.ratings;
				var accuracies = result.accuracies;
				var idNum = result.idNum;
				var status = result.status;
				var title = result.title;
				var author = result.author;
				var numItems = result.numItems;
				var dateCreated = result.dateCreated.getMonth() + 1 + "-" + result.dateCreated.getDate() + "-" + 
								  result.dateCreated.getFullYear();
				var displayLanguage = result.displayLanguage;
				var description = result.description;
				
				var commentIndices = [];
				var commentIds = [];
				var commentAuthors = [];
				var commentAuthorNames = [];
				var commentAuthorPictures = [];
				var datesPosted = [];
				var bodies = [];

				commentIndices = result.comments;
				for (var i = 0; i < commentIndices.length; i++) {
					commentIds.push(commentIndices[i].commentId);
					commentAuthors.push(commentIndices[i].author);
					datesPosted.push(commentIndices[i].datePosted.getMonth() + 1 + "-" + commentIndices[i].datePosted.getDate() + "-" + 
								     commentIndices[i].datePosted.getFullYear());
					bodies.push(commentIndices[i].body);
				}
				
				var questionIndices = [];
				var questionBodies = [];
				var choicesA = [];
				var choicesB = [];
				var choicesC = [];
				var choicesD = [];
				var correctAnswers = [];
				var explanations = [];
				var images = [];
				var audios = [];
				
				questionIndices = result.questions;
				
				for (var i = 0; i < questionIndices.length; i++) {
					questionBodies.push(questionIndices[i].body);
					choicesA.push(questionIndices[i].choiceA);
					choicesB.push(questionIndices[i].choiceB);
					choicesC.push(questionIndices[i].choiceC);
					choicesD.push(questionIndices[i].choiceD);
					correctAnswers.push(questionIndices[i].correctAnswer);
					explanations.push(questionIndices[i].explanation);
					images.push(questionIndices[i].image);
					audios.push(questionIndices[i].audio);
				}
				
				
				var cleanTags = "";
				for (var i = 0; i < tags.length; i++) {
					cleanTags += tags[i];
					
					if (tags.length != 1) {
						if (i != tags.length - 1) {
							cleanTags += ", ";
						}
					}
				}
								
				var cleanSubjectLanguages = "";
				for (var i = 0; i < subjectLanguages.length; i++) {
					cleanSubjectLanguages += subjectLanguages[i];
					
					if (subjectLanguages.length != 1) {
						if (i != subjectLanguages.length - 1) {
							cleanSubjectLanguages += ", ";
						}
					}
				}
				

				
				var averageRating = 0;
				for (var i = 0; i < ratings.length; i++) {
					averageRating += ratings[i];
				}
				
				averageRating = averageRating / ratings.length;
				
				var averageAccuracies = 0;
				for (var i = 0; i < accuracies.length; i++) {
					averageAccuracies += accuracies[i];
				}
				
				averageAccuracies = averageAccuracies / accuracies.length;
				averageAccuracies = averageAccuracies.toFixed(2);
				
				var highAccuracy = 0;
				for (var i = 0; i < accuracies.length; i++) {
					highAccuracy = Math.max(highAccuracy, accuracies[i]);
				}
				
				var highScore = Math.min(Math.ceil(highAccuracy / 100 * numItems), numItems);
				
				var query = {username: commentAuthors};
				var projection = 'username name picture';
								
				db.findMany(Profile, query, projection, function (qresult) {					
					if (qresult != null) {	
					
						for (var i = 0; i < commentAuthors.length; i++) {
							for (var j = 0; j < qresult.length; j++) {
                                if (qresult[j].username == commentAuthors[i]) {
                                    commentAuthorNames.push(qresult[j].name);
                                    commentAuthorPictures.push(qresult[j].picture);
                                }
                            }
						}
						
						var query = {username: author};
						var projection = 'username name';
						
						db.findOne (Profile, query, projection, function (result) {
							
							if (result != null) {
								var authorName = result.name;
								
								if (req.session.username != undefined) {
									if (req.session.username != "linquizticsadmin") {
										var firstname = req.session.name.split(" ", 1);

										var quiz = {
											tags: cleanTags,
											subjectLanguages: cleanSubjectLanguages,
											ratings: averageRating,
											accuracies: averageAccuracies,
											idNum: idNum,
											status: status,
											title: title,
											author: author,
											authorName: authorName,
											numItems: numItems,
											dateCreated: dateCreated,
											displayLanguage: displayLanguage,
											description: description,
											highScore: highScore,
											commentIds: commentIds,
											commentAuthors: commentAuthors,
											commentAuthorNames: commentAuthorNames,
											commentAuthorPictures: commentAuthorPictures,
											datesPosted: datesPosted,
											bodies: bodies,
											questionIndices: questionIndices,
											questionBodies: questionBodies,
											choicesA: choicesA,
											choicesB: choicesB,
											choicesC: choicesC,
											choicesD: choicesD,
											correctAnswers: correctAnswers,
											explanations: explanations,
											images: images,
											audios: audios,
											
											sessionflag: true,
											sessionadminflag: false,
											sessionusername: req.session.username,
											sessionpicture: req.session.picture,
											sessionname: req.session.name,
											sessionfirstname: firstname,
											sessionstreak: req.session.streak,
											sessionexp: req.session.exp,
											sessionleague: req.session.league,
											sessionposition: req.session.position
										}
									}

									else {
										var firstname = req.session.name.split(" ", 1);

										var quiz = {
											tags: cleanTags,
											subjectLanguages: cleanSubjectLanguages,
											ratings: averageRating,
											accuracies: averageAccuracies,
											idNum: idNum,
											status: status,
											title: title,
											author: author,
											authorName: authorName,
											numItems: numItems,
											dateCreated: dateCreated,
											displayLanguage: displayLanguage,
											description: description,
											highScore: highScore,
											commentIds: commentIds,
											commentAuthors: commentAuthors,
											commentAuthorNames: commentAuthorNames,
											commentAuthorPictures: commentAuthorPictures,
											datesPosted: datesPosted,
											bodies: bodies,
											questionIndices: questionIndices,
											questionBodies: questionBodies,
											choicesA: choicesA,
											choicesB: choicesB,
											choicesC: choicesC,
											choicesD: choicesD,
											correctAnswers: correctAnswers,
											explanations: explanations,
											images: images,
											audios: audios,
											
											sessionflag: true,
											sessionadminflag: true,
											sessionusername: req.session.username,
											sessionpicture: req.session.picture,
											sessionname: req.session.name,
											sessionfirstname: firstname,
											sessionstreak: req.session.streak,
											sessionexp: req.session.exp,
											sessionleague: req.session.league,
											sessionposition: req.session.position
										}
									}
									
								}
								
								else {
									var quiz = {
										tags: cleanTags,
										subjectLanguages: cleanSubjectLanguages,
										ratings: averageRating,
										accuracies: averageAccuracies,
										idNum: idNum,
										status: status,
										title: title,
										author: author,
										authorName: authorName,
										numItems: numItems,
										dateCreated: dateCreated,
										displayLanguage: displayLanguage,
										description: description,
										highScore: highScore,
										commentIds: commentIds,
										commentAuthors: commentAuthors,
										commentAuthorNames: commentAuthorNames,
										commentAuthorPictures: commentAuthorPictures,
										datesPosted: datesPosted,
										bodies: bodies,
										questionIndices: questionIndices,
										questionBodies: questionBodies,
										choicesA: choicesA,
										choicesB: choicesB,
										choicesC: choicesC,
										choicesD: choicesD,
										correctAnswers: correctAnswers,
										explanations: explanations,
										images: images,
										audios: audios
									}
								}
								
								res.render('quizSummary', quiz);
							}
						});
						
						
					}
				});
				
				
			}
			
			else {
				if(req.session.username == undefined) {
                    var details = {
                    	flag: false,
                    	adminflag: false
                    };

                    res.render('error', details);
                }

                else {
                	if (req.session.username != "linquizticsadmin") {
                		var firstname = req.session.name.split(" ", 1);

	                    var details = {
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

	                    var details = {
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

                    res.render('error', details);
                }
			}
		});	
	},

	getMyQuizzes: function(req, res) {
		var query = {username: req.session.username};
		var projection = 'quizzesCreated';

		db.findOne(Profile, query, projection, function (result) {
			if (result != null) {
				var quizQuery = {idNum: result.quizzesCreated};
				var quizProjection = 'idNum title status ratings dateCreated';

				db.findMany(Quiz, quizQuery, quizProjection, function (qresult) {
					if (qresult != null) {
						var i;
						var j;
						var private = 0;
						var published = 0;
						var ave = 0;
						var num = 0;
						var quizDates = [];
						var quizData = [];

						for (i = 0; i < qresult.length; i++) {
							if (qresult[i].status == "Published")
								published++;
							else if (qresult[i].status == "Unpublished")
								private++;

							for (j = 0; j < qresult[i].ratings.length; j++) {
								ave += qresult[i].ratings[j];
								num++;
							}
						}

						ave = ave / num;

						for (i = 0; i < qresult.length; i++) {
							if (qresult[i].status != "Deleted") {
								quizDates.push(qresult[i].dateCreated.getMonth() + 1 + "-" + qresult[i].dateCreated.getDate() + "-" + 
	                              		   	   qresult[i].dateCreated.getFullYear());
								quizData.push(qresult[i]);
							}
						}

						if (req.session.username != "linquizticsadmin") {
							var firstname = req.session.name.split(" ", 1);

							var data = {
								private: private,
								published: published,
								ave: ave.toFixed(2),
								quizDates: quizDates,
								quizData: quizData,

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
								private: private,
								published: published,
								ave: ave.toFixed(2),
								quizDates: quizDates,
								quizData: quizData,

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

						res.render('myQuizzes', data);
					}
				});
			}
		});
	},

	postDeleteAllQuizzes: function (req, res) {
		var password = req.body.password;
		var query = {username: req.session.username};
		var projection = 'quizzesCreated';

		db.findOne(Profile, query, projection, function (result) {
			if (result != null) {
				bcrypt.compare(password, req.session.password, function (err, equal) {
		            if (equal) {
		                var filter = {idNum: result.quizzesCreated};
						var update = {
							status: "Deleted",
							author: "",
							numItems: 0,
							displayLanguage: "",
							subjectLanguages: [],
							description: "",
							timesTaken: 0,
							tags: [],
							ratings: [],
							accuracies: [],
							comments: [],
							questions: []
						};

						var indices = result.quizzesCreated;
						var username = req.session.username;

		                db.updateMany(Quiz, filter, update, function(err, result) {
		                    var pfilter = {username: username};
		                    var pupdate = {$pull: {'quizzesCreated': {$in: indices}}};

		                    db.updateOne(Profile, pfilter, pupdate, function(err, result) {
		                    	res.status(200).send();
		                    });
		                }); 
		            } else {
						res.status(403).send();
					}
		        });
			}
		});
	},

	postUnpublishAllQuizzes: function (req, res) {
		var password = req.body.password;
		var query = {username: req.session.username};
		var projection = 'quizzesCreated';

		db.findOne(Profile, query, projection, function (result) {
			if (result != null) {
				bcrypt.compare(password, req.session.password, function (err, equal) {
		            if (equal) {
		                var filter = {idNum: result.quizzesCreated};
		                console.log(filter);
						var update = {status: "Unpublished"};

		                db.updateMany(Quiz, filter, update, function(err, result) {
							res.status(200).send();
		                }); 
		            } else {
						res.status(403).send();
					}
		        });
			}
		});
	},

	getQuizCreator: function (req, res) {
		var idNum = req.params.idNum;
		var query = {idNum: idNum};
		var projection = 'index tags subjectLanguages ratings accuracies idNum status title author numItems dateCreated displayLanguage description comments questions';

		db.findOne(Quiz, query, projection, function (result) {
			if (result != null) {
				
				var i;
				var j;
				var dateCreated;
				var cleanTags;
				var cleanSubjectLanguages;
				var comments;
				var commentDates = [];
				var commentAuthors = [];
				var aveRating = 0;
				var numOne = 0;
				var numTwo = 0;
				var numThree = 0;
				var numFour = 0;
				var numFive = 0;
				var aveAccuracy = 0;
				var maxAccuracy = 0;

				dateCreated = result.dateCreated.getMonth() + 1 + "-" + result.dateCreated.getDate() + "-" + 
					          result.dateCreated.getFullYear();

				cleanTags = result.tags[0];
				for (i = 1; i < result.tags.length; i++)
					cleanTags += ", " + result.tags[i];

				cleanSubjectLanguages = "";
				if (result.subjectLanguages) {
					cleanSubjectLanguages = result.subjectLanguages[0];
					for (i = 1; i < result.subjectLanguages.length; i++)
						cleanSubjectLanguages += ", " + result.subjectLanguages[i];
				}
				
				comments = result.comments;

				for (i = 0; i < result.comments.length; i++) {
					commentDates.push(result.comments[i].datePosted.getMonth() + 1 + "-" + result.comments[i].datePosted.getDate() + "-" + 
									  result.comments[i].datePosted.getFullYear());
					commentAuthors.push(result.comments[i].author);
				}

				var quizCommentNums = [];
				var quizCommentAuthors = [];
				var quizCommentDatesPosted = [];
				var quizCommentBodies = [];
				
				var highestIndex = result.questions[result.questions.length - 1].index;

				for (i = 0; i < result.questions.length; i++) {
					var tempNums = [];
					var tempAuthors = [];
					var tempDates = [];
					var tempBodies = [];

					for (j = 0; j < result.questions[i].comments.length; j++) {
						tempNums.push(result.questions[i].comments[j].itemCommentId);
						tempAuthors.push(result.questions[i].comments[j].author);
						tempDates.push(result.questions[i].comments[j].datePosted.getMonth() + 1 + "-" + 
									   result.questions[i].comments[j].datePosted.getDate() + "-" + 
									   result.questions[i].comments[j].datePosted.getFullYear());
						tempBodies.push(result.questions[i].comments[j].body);
					}

					quizCommentNums.push(tempNums);
					quizCommentAuthors.push(tempAuthors);
					quizCommentDatesPosted.push(tempDates);
					quizCommentBodies.push(tempBodies);
				}

				for (i = 0; i < result.ratings.length; i++) {
					aveRating += result.ratings[i];

					if (result.ratings[i] == 1)
						numOne++;
					else if (result.ratings[i] == 2)
						numTwo++;
					else if (result.ratings[i] == 3)
						numThree++;
					else if (result.ratings[i] == 4)
						numFour++;
					else
						numFive++;
				}

				if (result.ratings.length == 0)
					aveRating = 0;

				else
					aveRating = aveRating / result.ratings.length;

				for (i = 0; i < result.accuracies.length; i++) {
					aveAccuracy += result.accuracies[i];

					if (result.accuracies[i] > maxAccuracy)
						maxAccuracy = result.accuracies[i];
				}

				if (result.accuracies.length == 0)
					aveAccuracy = 0;

				else 
					aveAccuracy = aveAccuracy / result.accuracies.length;

				var query = {username: commentAuthors};
				var projection = 'username name picture';
				var commentPics = [];
				var commentNames = [];

				db.findMany(Profile, {}, projection, function(presult) {
					
					if (presult != null) {

						for (i = 0; i < commentAuthors.length; i++)
							for (j = 0; j < presult.length; j++)
								if (presult[j].username == commentAuthors[i]) {
									commentPics.push(presult[j].picture);
									commentNames.push(presult[j].name);
								}

						var quizCommentPics = [];
						var quizCommentNames = [];

						for (i = 0; i < result.questions.length; i++) {
							var tempPics = [];
							var tempNames = [];
							var tempAuthors = quizCommentAuthors[i];

							for (j = 0; j < tempAuthors.length; j++) {
								for (var k = 0; k < presult.length; k++) {
									if (presult[k].username == tempAuthors[j]) {
										tempPics.push(presult[k].picture);
										tempNames.push(presult[k].name);
									}
								}
							}

							quizCommentPics.push(tempPics);
							quizCommentNames.push(tempNames);
						}

						var questiondata = [];

						for (i = 0; i < result.questions.length; i++) {
							var commentdata = [];

							for (j = 0; j < quizCommentAuthors[i].length; j++) {
								var singular = {
									quizCommentNum: quizCommentNums[i][j],
									quizCommentAuthor: quizCommentAuthors[i][j],
									quizCommentName: quizCommentNames[i][j],
									quizCommentPic: quizCommentPics[i][j],
									quizCommentDatePosted: quizCommentDatesPosted[i][j],
									quizCommentBody: quizCommentBodies[i][j]
								}

								commentdata.push(singular);
							}

							var sing = {
								index: result.questions[i].index,
								body: result.questions[i].body,
								choiceA: result.questions[i].choiceA,
								choiceB: result.questions[i].choiceB,
								choiceC: result.questions[i].choiceC,
								choiceD: result.questions[i].choiceD,
								correctAnswer: result.questions[i].correctAnswer,
								explanation: result.questions[i].explanation,
								image: result.questions[i].image,
								audio: result.questions[i].audio,
								accuracy: result.questions[i].accuracy,
								commentdata: commentdata
							}

							questiondata.push(sing);
						}


						if (req.session.username != undefined) {
							if (req.session.username != "linquizticsadmin") {
								var firstname = req.session.name.split(" ", 1);

								var data = {
									flag: true,
									adminflag: false,
									username: req.session.username,
				                    picture: req.session.picture,
				                    name: req.session.name,
				                    firstname: firstname,
				                    streak: req.session.streak,
				                    exp: req.session.exp,
				                    league: req.session.league,
				                    position: req.session.position,

				                    title: result.title,
				                    idNum: result.idNum,
				                    numItems: result.numItems,
				                    dateCreated: dateCreated,
				                    displayLanguage: result.displayLanguage,
				                    cleanTags: cleanTags,
				                    cleanSubjectLanguages: cleanSubjectLanguages,
				                    description: result.description,
				                    comments: comments,
				                    commentDates: commentDates,
				                    commentPics: commentPics,
				                    commentNames: commentNames,
				                    aveRating: aveRating.toFixed(2),
				                    numOne: numOne,
				                    numTwo: numTwo,
				                    numThree: numThree,
				                    numFour: numFour,
				                    numFive: numFive,
				                    aveAccuracy: aveAccuracy.toFixed(2),
				                    maxAccuracy: maxAccuracy.toFixed(2),
				                    questions: questiondata,
				                    highestIndex: highestIndex
								}

								res.render('quizCreator', data);
							}

							else {
								var firstname = req.session.name.split(" ", 1);

								var data = {
									flag: true,
									adminflag: true,
									username: req.session.username,
				                    picture: req.session.picture,
				                    name: req.session.name,
				                    firstname: firstname,
				                    streak: req.session.streak,
				                    exp: req.session.exp,
				                    league: req.session.league,
				                    position: req.session.position,

				                    title: result.title,
				                    idNum: result.idNum,
				                    numItems: result.numItems,
				                    dateCreated: dateCreated,
				                    displayLanguage: result.displayLanguage,
				                    cleanTags: cleanTags,
				                    cleanSubjectLanguages: cleanSubjectLanguages,
				                    description: result.description,
				                    comments: comments,
				                    commentDates: commentDates,
				                    commentPics: commentPics,
				                    commentNames: commentNames,
				                    aveRating: aveRating.toFixed(2),
				                    numOne: numOne,
				                    numTwo: numTwo,
				                    numThree: numThree,
				                    numFour: numFour,
				                    numFive: numFive,
				                    aveAccuracy: aveAccuracy.toFixed(2),
				                    maxAccuracy: maxAccuracy.toFixed(2),
				                    questions: questiondata,
				                    highestIndex: highestIndex
								}

								res.render('quizCreator', data);
							}
						}
					}
				});
			}
		});
	},

	postEditBasicDetails: function(req, res) {
		var idNum = req.body.idNum;
		var title = req.body.newTitle;
		var tags = req.body.newTags;
		var displayLanguage = req.body.displayLangSelection;
		var subjectLanguages = req.body.langSelection;
		var dateUpdated = new Date();

		tagsArray = tags.split(",");

		for (var i = 0; i < tagsArray.length; i++) {
		    tagsArray[i] = tagsArray[i].trim();
		}

		var filter = {idNum: idNum};
		var update = {
			title: title,
			tags: tagsArray,
			displayLanguage: displayLanguage,
			subjectLanguages: subjectLanguages,
			dateUpdated: dateUpdated
		};

		db.updateOne(Quiz, filter, update, function(err, result) {
			res.status(200).send();
		});
	},

	postEditDescription: function(req, res) {
		var idNum = req.body.idNum;
		var desc = req.body.newDesc;
		var dateUpdated = new Date();

		var filter = {idNum: idNum};
		var update = {
			description: desc,
			dateUpdated: dateUpdated
		};

		db.updateOne(Quiz, filter, update, function(err, result) {
			res.status(200).send();
		});
	},

	postPublishQuiz: function(req, res) {
		var idNum = req.body.idNum;
		var dateUpdated = new Date();

		var filter = {idNum: idNum};
		var update = {
			status: "Published",
			dateUpdated: dateUpdated
		};

		db.updateOne(Quiz, filter, update, function(err, result) {
			res.status(200).send();
		});
	},

	postUnpublishQuiz: function(req, res) {
		var idNum = req.body.idNum;
		var dateUpdated = new Date();

		var filter = {idNum: idNum};
		var update = {
			status: "Unpublished",
			dateUpdated: dateUpdated
		};

		db.updateOne(Quiz, filter, update, function(err, result) {
			res.status(200).send();
		});
	},

	postDeleteQuiz: function(req, res) {
		var idNum = req.body.idNum;
		var username = req.body.username;

		var filter = {idNum: idNum};
		var update = {
			status: "Deleted",
			tags: [],
			subjectLanguages: [],
			ratings: [],
			accuracies: [],
			comments: [],
			questions: [],
			displayLanguage: "",
			description: "",
			timesTaken: 0,
			numItems: 0,
			author: ""
		};

		db.updateOne(Quiz, filter, update, function(err, result) {
			var pfilter = {username: username};
			var pupdate = {$pull: {'quizzesCreated': idNum}};

			db.updateOne(Profile, pfilter, pupdate, function(err, result) {
				res.status(200).send();
			});
		});
	},

	postEditQuestion: function(req, res) {
		var idNum = req.body.idNum;
		var index = req.body.questionIndex;
		var question = req.body.newQuestion;
		var choiceA = req.body.choiceA;
		var choiceB = req.body.choiceB;
		var choiceC = req.body.choiceC;
		var choiceD = req.body.choiceD;
		var dateUpdated = new Date();

		var filter = {
			idNum: idNum,
			'questions.index': index
		};

		var update = {
			dateUpdated: dateUpdated,
			'questions.$.body': question,
			'questions.$.choiceA': choiceA,
			'questions.$.choiceB': choiceB,
			'questions.$.choiceC': choiceC,
			'questions.$.choiceD': choiceD
		}

		db.updateOne(Quiz, filter, update, function(err, result) {
			res.status(200).send();
		});
	},
	
	postEditImage: function(req, res) {
		var idNum = req.body.idNum;
		var index = req.body.imageIndex;
		var filename = "/files/" + req.file.filename;
		
		var dateUpdated = new Date();
		
		var filter = {
			idNum: idNum,
			'questions.index': index
		};
		
		var update = {
			dateUpdated: dateUpdated,
			'questions.$.image': filename
		}
		
		db.updateOne(Quiz, filter, update, function(err, result) {
			res.status(200).send();
		});
	},
	
	postEditAudio: function(req, res) {
		var idNum = req.body.idNum;
		var index = req.body.audioIndex;
		var filename = "/files/" + req.file.filename;
		
		var dateUpdated = new Date();
		
		var filter = {
			idNum: idNum,
			'questions.index': index
		};
		
		var update = {
			dateUpdated: dateUpdated,
			'questions.$.audio': filename
		}
		
		db.updateOne(Quiz, filter, update, function(err, result) {
			res.status(200).send();
		});
	},

	postEditAnswer: function(req, res) {
		var idNum = req.body.idNum;
		var index = req.body.answerIndex;
		var answer = req.body.correctAnswer;
		var explanation = req.body.newExplanation;
		var dateUpdated = new Date();

		var filter = {
			idNum: idNum,
			'questions.index': index
		};

		var update = {
			dateUpdated: dateUpdated,
			'questions.$.correctAnswer': answer,
			'questions.$.explanation': explanation,
		}

		db.updateOne(Quiz, filter, update, function(err, result) {
			res.status(200).send();
		});
	},

	postDeleteQuizItem: function(req, res) {
		var idNum = req.body.idNum;
		var index = req.body.deleteIndex;
		var dateUpdated = new Date();

		var filter = {idNum: idNum};
		var update = {
			$inc: {numItems: -1},
			$pull: {'questions': {'index': index}},
			dateUpdated: dateUpdated
		};

		db.updateOne(Quiz, filter, update, function(err, result) {
			res.status(200).send();
		});
	},

	postAddQuestion: function(req, res) {
		var idNum = req.body.idNum;
		var query = {idNum: idNum};
		var projection = 'idNum questions';
		var dateUpdated = new Date();

		db.findOne(Quiz, query, projection, function(result) {
			var itemNum = result.questions[result.questions.length - 1].index;
			itemNum = parseInt(itemNum) + 1;

			var filter = {idNum: idNum};
			var newQuestion = {
				index: itemNum,
				body: "Give a description of the task.",
				choiceA: "Supply one of the choices.",
				choiceB: "Supply one of the choices.",
				choiceC: "Supply one of the choices.",
				choiceD: "Supply one of the choices.",
				correctAnswer: "choice-a",
				explanation: "Give a short explanation of the answer here (optional).",
				image: "",
				audio: "",
				comments: [

				],
				accuracy: 0
			};

			var update = {
				$push: {questions: newQuestion},
				$inc: {numItems: 1},
				dateUpdated: dateUpdated
			};

			db.updateOne(Quiz, filter, update, function(err, result) {
				res.status(200).send();
			});
		});
	},

	postCreateQuiz: function(req, res) {
		var username = req.body.author;
		var dateCreated = new Date();
		var query = {};
		var projection = 'idNum';

		db.findMany(Quiz, query, projection, function(result) {
			var newIdNum = result[result.length - 1].idNum;
			newIdNum = newIdNum + 1;

			var newQuiz = {
				tags: ["tag1", "tag2", "tag3", "tag4", "tag5"],
				subjectLanguages: ["English"],
				ratings: [],
				accuracies: [],
				idNum: newIdNum,
				status: "Unpublished",
				title: "New Quiz",
				author: username,
				numItems: 1,
				dateCreated: dateCreated,
				dateUpdated: dateCreated,
				displayLanguage: "Chinese",
				description: 'Place your description here. <p>You can use HTML markup tags, such as &#60;br&#62;, &#60;pre&#62;, &#60;b&#62;, and &#60;i&#62;, to enrich the formatting of your description.</p> <p>In most browsers, diacritics (such as the tilde in ñ and the cedilla in ç) can be typed directly inside the text box.</p> <p>If you encounter problems related to rendering, consider using <a class = "website" target = "_blank" href = "https://www.w3schools.com/charsets/ref_utf_diacritical.asp">HTML UTF-8 diacritical marks</a> <a class = "edit pointable" target = "_blank" href = "https://www.w3schools.com/charsets/ref_utf_diacritical.asp"><span class = "glyphicon glyphicon-new-window smaller-icon"></span></a></p>',
				timesTaken: 0,
				comments: [

				],
				questions: [
					{
						index: 1,
						body: "Give a description of the task.",
						choiceA: "Supply one of the choices.",
						choiceB: "Supply one of the choices.",
						choiceC: "Supply one of the choices.",
						choiceD: "Supply one of the choices.",
						correctAnswer: "choice-a",
						explanation: "Give a short explanation of the answer here (optional).",
						image: "",
						audio: "",
						comments: [

						],
						accuracy: 0
					}
				]
			}

			db.insertOne(Quiz, newQuiz, function(flag) {
				var pfilter = {username: username};
				var pupdate = {$push: {quizzesCreated: newIdNum}};

				db.updateOne(Profile, pfilter, pupdate, function(err, result) {
					res.redirect('/quizCreator/' + newIdNum);
				});
			});
		});
	},

	postAddQuizItemComment: function(req, res) {
		var idNum = req.body.idNum;
		var currentItem = req.body.currentItem;
		var commentBody = req.body.addedComment;
		var dateEdited = new Date();

		var query = {idNum: idNum};
		var projection = 'questions';

		db.findOne(Quiz, query, projection, function(result) {
			var index = currentItem - 1;

			var len = result.questions[index].comments.length - 1;
			var newCommentNum;

			// first comment
			if (len == -1) {
				var formattedIndex;

				if (currentItem < 10)
					formattedIndex = '0' + '0' + currentItem;
				else if (currentItem >= 10 && currentItem < 100)
					formattedIndex = '0' + currentItem;
				else
					formattedIndex = currentItem;

				newCommentNum = idNum + '2' + formattedIndex + '0' + '0' + '1';
			}

			// not first comment
			else
				newCommentNum = result.questions[index].comments[len].itemCommentId + 1;

			var newComment = {
				itemCommentId: newCommentNum,
				author: req.session.username,
				datePosted: dateEdited,
				body: commentBody
			}

			result.questions[index].comments.push(newComment);

			var filter = {idNum: idNum};
			var update = {questions: result.questions};

			db.updateOne(Quiz, filter, update, function(err, result) {
				res.status(200).send();
			});
		})
	},

	postEditQuizItemComment: function(req, res) {
		var idNum = req.body.idNum;
		var commentNum = req.body.commentNum;
		var editedComment = req.body.editedComment;
		var dateEdited = new Date();

		var query = {idNum: idNum};
		var projection = 'questions';

        db.findOne(Quiz, query, projection, function(result) {
        	var flag = 0; 
        	var i;
        	var j;

        	for (i = 0; i < result.questions.length && flag == 0; i++) {
        		for (j = 0; j < result.questions[i].comments.length && flag == 0; j++) {
        			if (result.questions[i].comments[j].itemCommentId == commentNum) {
        				flag = 1;
        				
        				result.questions[i].comments[j].datePosted = dateEdited;
			        	result.questions[i].comments[j].body = editedComment;

			        	var filter = {idNum: idNum};
			        	var update = {questions: result.questions};

			        	db.updateOne(Quiz, filter, update, function(err, result) {
			        		res.status(200).send();
			        	});
        			}
        		}
        	}
        });
	},

	postDeleteQuizItemComment: function(req, res) {
		var idNum = req.body.idNum;
		var commentNum = req.body.commentNum;

		var query = {idNum: idNum};
        var projection = 'questions';

        db.findOne(Quiz, query, projection, function(result) {
        	var flag = 0; 
        	var i;
        	var j;

        	for (i = 0; i < result.questions.length && flag == 0; i++) {
        		for (j = 0; j < result.questions[i].comments.length && flag == 0; j++) {
        			if (result.questions[i].comments[j].itemCommentId == commentNum) {
        				flag = 1;
        				
        				var newComments = result.questions[i].comments;
        				newComments.splice(j, 1);

        				result.questions[i].comments = newComments;

			        	var filter = {idNum: idNum};
			        	var update = {questions: result.questions};

			        	db.updateOne(Quiz, filter, update, function(err, result) {
			        		res.status(200).send();
			        	});
        			}
        		}
        	}
        });
	},

	postShowSummary: function(req, res) {
		if (req.session.username == undefined) {
			res.status(200).send();
		}

		else {
			var idNum = req.body.idNumHidden;
			var score = req.body.totalScoreHidden;
			var accuracy = req.body.accuracyHidden;
			var currDate = new Date();

			var filter = {idNum: idNum};
			var update = {
				$push: {accuracies: accuracy},
				$inc: {timesTaken: 1}
			};

			db.updateOne(Quiz, filter, update, function(err, result) {
				var query = {username: req.session.username};
				var projection = 'streak exp quizzesTaken lastActive';

				db.findOne(Profile, query, projection, function(result) {
					var addedExp = score * 50;
					result.exp = result.exp + addedExp;

					var newQuiz = {
						quizId: idNum,
						quizDate: currDate,
						accuracy: accuracy
					};

					result.quizzesTaken.unshift(newQuiz);

					var lastDate = result.lastActive;
					var diffTime = Math.abs(currDate - lastDate);
					var diffDays = diffTime / (1000 * 60 * 60 * 24);

					if (diffDays > 2)
						result.streak = 1;
					else if (diffDays > 1 && diffDays <= 2) {
						result.streak = result.streak + 1;
						result.lastActive = currDate;
					}

					var filterSingle = {username: req.session.username};
					var updateSingle = {
						exp: result.exp,
						quizzesTaken: result.quizzesTaken,
						lastActive: result.lastActive,
						streak: result.streak
					}

					db.updateOne(Profile, filterSingle, updateSingle, function(err, result) {
						var queryAll = {};
						var projectionAll = 'displayLanguages quizzesCreated name picture username email password streak exp league position quizzesTaken lastActive';

						db.findMany(Profile, queryAll, projectionAll, function(result) {
							var newDocuments = result;
							newDocuments.sort(function (a, b) {
								var keyA = new Date(a.exp);
								var keyB = new Date(b.exp);

								if (keyA < keyB)
									return 1;
								if (keyA > keyB)
									return -1;
								return 0;
							});

							var i;

							for (i = 0; i < 5 || i < newDocuments.length; i++) {
								newDocuments[i].league = "Diamond";
								newDocuments[i].position = i + 1;
							}

							for (i = 5; i < 10 || i < newDocuments.length; i++) {
								newDocuments[i].league = "Platinum";
								newDocuments[i].position = i - 4;
							}

							for (i = 10; i < 15 || i < newDocuments.length; i++) {
								newDocuments[i].league = "Gold";
								newDocuments[i].position = i - 9;
							}

							for (i = 15; i < 20 || i < newDocuments.length; i++) {
								newDocuments[i].league = "Silver";
								newDocuments[i].position = i - 14;
							}

							for (i = 20; i < newDocuments.length; i++) {
								newDocuments[i].league = "Bronze";
								newDocuments[i].position = i - 19;
							}

							var condition = {exp: {$gte: 0}};

							db.deleteMany(Profile, condition, function(callback) {
								db.insertMany(Profile, newDocuments, function(callback) {
									var finalquery = {username: req.session.username};
									var finalprojection = 'username streak exp league position';
									
									db.findOne(Profile, finalquery, finalprojection, function(result) {
										req.session.streak = result.streak;
										req.session.exp = result.exp;
										req.session.league = result.league;
										req.session.position = result.position;

										res.status(200).send();
									});
								});
							});
						});
					});
				});
			});
		}
	},

	postAddRating: function(req, res) {
		var idNum = req.body.idNum;
		var rating = req.body.rating;

		var filter = {idNum: idNum};
		var update = {$push: {ratings: rating}};

		db.updateOne(Quiz, filter, update, function(err, result) {
			res.status(200).send();
		});
	},

	postDeleteRating: function(req, res) {
		var idNum = req.body.idNum;
		var rating = req.body.rating;

		var filter = {idNum: idNum};
		var update = {$pop: {ratings: 1}};

		db.updateOne(Quiz, filter, update, function(err, result) {
			res.status(200).send();
		});
	},

	postReportQuiz: function(req, res) {
		var reason = req.body.reportReason;
		var idNum = req.body.reportQuiznum;
		var title = req.body.reportTitle;
		var author = req.body.reportAuthor;
		var date = new Date();

		var query = {};
		var projection = 'index';

		db.findMany(Quizreport, query, projection, function(result) {
			var newIndex = result[result.length - 1].index + 1;
			
			var pquery = {name: author};
			var pprojection = 'username';

			db.findOne(Profile, pquery, pprojection, function(result) {
				var username = result.username;
				var newReport = {
					index: newIndex,
					quizNum: idNum,
					title: title,
					author: username,
					reportDate: date,
					report: reason
				};

				db.insertOne(Quizreport, newReport, function(err, result) {
					res.status(200).send();
				});
			});
		});
	},

	postReportComment: function(req, res) {
		var reason = req.body.commentReport;
		var idNum = req.body.reportIdnum;
		var title = req.body.reportQuizname;
		var commentNum = req.body.reportCommentnum;
		var author = req.body.reportAuthor;
		var body = req.body.reportCommentbody;
		var date = new Date();

		var query = {};
		var projection = 'index';

		db.findMany(Commentreport, query, projection, function(result) {
			var newIndex = result[result.length - 1].index + 1;

			var pquery = {name: author};
			var pprojection = 'username';

			db.findOne(Profile, pquery, pprojection, function(result) {
				var username = result.username;

				var newReport = {
					index: newIndex,
					commentNum: commentNum,
					quizNum: idNum,
					comment: body,
					author: username,
					quiz: title,
					reportDate: date,
					report: reason
				};

				db.insertOne(Commentreport, newReport, function(err, result) {
					res.status(200).send();
				});
			});
		});
	}
}

module.exports = quizController;