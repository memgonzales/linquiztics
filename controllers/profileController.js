const db = require('../models/db.js');
const Profile = require('../models/ProfileSchema.js');
const Quiz = require('../models/QuizSchema.js');
const Userreport = require('../models/UserreportSchema.js');
const Quizreport = require('../models/QuizreportSchema.js');
const Commentreport = require('../models/CommentreportSchema.js');
const bcrypt = require('bcrypt');
const bcrypt2 = require('bcrypt');

const nodemailer = require('nodemailer');

const saltRounds = 10;

const profileController = {
	 getPublicProfile: function(req, res) {
        var query = {username: req.params.username};
        var projection = 'name picture username email displayLanguages streak exp league position quizzesTaken';

        db.findOne (Profile, query, projection, function (result) {
            if (result != null) {
                var i;
                var j;
                var quizIndices = [];
                var quizIds = [];
                var quizDates = [];
                var quizTitles = [];
                var quizStatuses = [];

                quizIndices = result.quizzesTaken;
            
                for (i = 0; i < quizIndices.length; i++) {
                    quizIds.push(quizIndices[i].quizId);
                    quizDates.push(quizIndices[i].quizDate.getMonth() + 1 + "-" + quizIndices[i].quizDate.getDate() + "-" + 
                                   quizIndices[i].quizDate.getFullYear());
                }
                
                var query = {idNum: quizIds};
                var projection = 'idNum title status';
				
				var lang = result.displayLanguages;
				var cleanLang = "";
				for (var i = 0; i < lang.length; i++) {
					cleanLang += lang[i];
					
					if (lang.length != 1) {
						if (i != lang.length - 1) {
							cleanLang += ", ";
						}
					}
				}
				
                db.findMany(Quiz, query, projection, function (qresult) {
                    if (qresult != null) {
                        for (i = 0; i < quizIds.length; i++) {
                            for (j = 0; j < qresult.length; j++) {
                                if (qresult[j].idNum == quizIds[i]) {
                                    quizTitles.push(qresult[j].title);
                                    quizStatuses.push(qresult[j].status);
                                }
                            }
                        }

                        if (req.session.username != undefined) {
                            if (req.session.username != "linquizticsadmin") {
                                var firstname = req.session.name.split(" ", 1);

                                var user = {
                                    name: result.name,
                                    picture: result.picture,
                                    username: result.username,
                                    email: result.email,
                                    displayLanguages: cleanLang,
                                    streak: result.streak,
                                    exp: result.exp,
                                    league: result.league,
                                    position: result.position,
                                    ids: quizIds,
                                    dates: quizDates,
                                    titles: quizTitles,
                                    statuses: quizStatuses,

                                    sessionflag: true,
                                    sessionadminflag: false,
                                    sessionusername: req.session.username,
                                    sessionfirstname: firstname,
                                    sessionpicture: req.session.picture,
                                    sessionname: req.session.name,
                                    sessionstreak: req.session.streak,
                                    sessionexp: req.session.exp,
                                    sessionleague: req.session.league,
                                    sessionposition: req.session.position
                                };
                            }

                            else {
                                var firstname = req.session.name.split(" ", 1);

                                var user = {
                                    name: result.name,
                                    picture: result.picture,
                                    username: result.username,
                                    email: result.email,
                                    displayLanguages: cleanLang,
                                    streak: result.streak,
                                    exp: result.exp,
                                    league: result.league,
                                    position: result.position,
                                    ids: quizIds,
                                    dates: quizDates,
                                    titles: quizTitles,
                                    statuses: quizStatuses,

                                    sessionflag: true,
                                    sessionadminflag: true,
                                    sessionusername: req.session.username,
                                    sessionfirstname: firstname,
                                    sessionpicture: req.session.picture,
                                    sessionname: req.session.name,
                                    sessionstreak: req.session.streak,
                                    sessionexp: req.session.exp,
                                    sessionleague: req.session.league,
                                    sessionposition: req.session.position
                                };
                            }
                        }

                        else {
                            var user = {
                                name: result.name,
                                picture: result.picture,
                                username: result.username,
                                email: result.email,
                                displayLanguages: cleanLang,
                                streak: result.streak,
                                exp: result.exp,
                                league: result.league,
                                position: result.position,
                                ids: quizIds,
                                dates: quizDates,
                                titles: quizTitles,
                                statuses: quizStatuses,

                                sessionflag: false,
                                sessionadminflag: false
                            };
                        }

                        res.render('publicProfile', user);

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
                                firstname: firstname,
                                picture: req.session.picture,
                                name: req.session.name,
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
                                firstname: firstname,
                                picture: req.session.picture,
                                name: req.session.name,
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
	
    getMyProfile: function(req, res) {
        var query = {username: req.params.username};
        var projection = 'name picture username password email displayLanguages streak exp league position quizzesTaken';

        db.findOne (Profile, query, projection, function (result) {
            if (result != null) {

                var i;
                var j;
                var quizIndices = [];
                var quizIds = [];
                var quizDates = [];
                var quizAccuracies = [];
                var quizTitles = [];
                var quizStatuses = [];

                quizIndices = result.quizzesTaken;
            
                for (i = 0; i < quizIndices.length; i++) {
                    quizIds.push(quizIndices[i].quizId);
                    quizDates.push(quizIndices[i].quizDate.getMonth() + 1 + "-" + quizIndices[i].quizDate.getDate() + "-" + 
                                   quizIndices[i].quizDate.getFullYear());
                    quizAccuracies.push(quizIndices[i].accuracy.toFixed(2));
                }

                var query = {idNum: quizIds};
                var projection = 'idNum title status';
				
				var lang = result.displayLanguages;
				var cleanLang = "";
				for (var i = 0; i < lang.length; i++) {
					cleanLang += lang[i];
					
					if (lang.length != 1) {
						if (i != lang.length - 1) {
							cleanLang += ", ";
						}
					}
				}

                db.findMany(Quiz, query, projection, function (qresult) {
                    if (qresult != null) {
                        for (i = 0; i < quizIds.length; i++) {
                            for (j = 0; j < qresult.length; j++) {
                                if (qresult[j].idNum == quizIds[i]) {
                                    quizTitles.push(qresult[j].title);
                                    quizStatuses.push(qresult[j].status);
                                }
                            }
                        }

                        if (req.session.username != undefined) {
                            if (req.session.username != "linquizticsadmin") {
                                var firstname = result.name.split(" ", 1);

                                var user = {
                                    name: result.name,
                                    firstname: firstname,
                                    picture: result.picture,
                                    username: result.username,
                                    password: result.password,
                                    email: result.email,
                                    displayLanguages: cleanLang,
                                    streak: result.streak,
                                    exp: result.exp,
                                    league: result.league,
                                    position: result.position,
                                    ids: quizIds,
                                    dates: quizDates,
                                    accuracies: quizAccuracies,
                                    titles: quizTitles,
                                    statuses: quizStatuses,

                                    flag: true,
                                    adminflag: false
                                };
                            }

                            else {
                                var firstname = result.name.split(" ", 1);

                                var user = {
                                    name: result.name,
                                    firstname: firstname,
                                    picture: result.picture,
                                    username: result.username,
                                    password: result.password,
                                    email: result.email,
                                    displayLanguages: cleanLang,
                                    streak: result.streak,
                                    exp: result.exp,
                                    league: result.league,
                                    position: result.position,
                                    ids: quizIds,
                                    dates: quizDates,
                                    accuracies: quizAccuracies,
                                    titles: quizTitles,
                                    statuses: quizStatuses,

                                    flag: true,
                                    adminflag: true
                                };
                            }
                        }

                        else {
                            var firstname = result.name.split(" ", 1);

                            var user = {
                                name: result.name,
                                firstname: firstname,
                                picture: result.picture,
                                username: result.username,
                                email: result.email,
                                displayLanguages: cleanLang,
                                streak: result.streak,
                                exp: result.exp,
                                league: result.league,
                                position: result.position,
                                ids: quizIds,
                                dates: quizDates,
                                accuracies: quizAccuracies,
                                titles: quizTitles,
                                statuses: quizStatuses,

                                flag: false,
                                adminflag: false
                            };
                        }

                        res.render('myProfile', user);

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
                                position: req.session.position,
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
                                position: req.session.position,
                        }
                    }
                    
                    res.render('error', details);
                }
            }        
        });
    },

    postCheckName: function(req, res) {
        var name = req.body.newName;
        var password = req.body.password;

        bcrypt.compare(password, req.session.password, function (err, equal) {
            if (equal) {
                req.session.name = name; 
                var filter = {username: req.session.username};
                var update = {name: req.session.name};

                db.updateOne(Profile, filter, update, function(err, result) {
					res.status(200).send();
                }); 				
            } else {	
				res.status(403).send();
			}
        });
    },

    postCheckEmail: function(req, res) {
        var email = req.body.newEmail;
        var password = req.body.password;

        bcrypt.compare(password, req.session.password, function (err, equal) {
            if (equal) {
                req.session.email = email; 
                var filter = {username: req.session.username};
                var update = {email: req.session.email};

                db.updateOne(Profile, filter, update, function(err, result) {
                    res.status(200).send();
                }); 
            } else {	
				res.status(403).send();
			}
        });
    },

    postCheckPassword: function(req, res) {
        var oldPassword = req.body.oldPassword;
        var newPassword = req.body.newPassword;
        var repPassword = req.body.repeatPassword;

        if (newPassword.localeCompare(repPassword) == 0) {
            bcrypt.compare(oldPassword, req.session.password, function (err, equal) {
                if (equal) {
                    bcrypt2.hash(newPassword, saltRounds, function (err, hash) {
                        req.session.password = hash;

                        var filter = {username: req.session.username};
                        var update = {password: req.session.password};

                        db.updateOne(Profile, filter, update, function(err, result) {
							var transporter = nodemailer.createTransport({
								service: 'gmail',
								secure: false,
								port: 25,
								auth: {
									user: 'linquiztics.webmaster@gmail.com',
									pass: 'Arigatougozaimasu123'
								},
								tls: {
									rejectUnauthorized: false
								}
							});
							
							var dateChanged = new Date();
							
							var mailOptions = {
								from: 'linquiztics.webmaster@gmail.com',
								to: req.session.email,
								subject: '[Linquiztics] Password Change',
								html: '<p>The password to your Linquiztics account has been changed on ' + dateChanged + '.</p> <p>If you did not request this change, please contact the site administrators through the following email address: linquiztics.webmaster@gmail.com. <p>Thank you.</p>'
							};
							
							transporter.sendMail(mailOptions, function(error, info) {
								if (error) {
									console.log(error);
								} else {
									console.log("Email sent: " + info.response);
								}
							});
							
                            res.status(200).send();
                        });  
                    });
                } else {	
					res.status(403).send();
				}
            });
        } else {
			res.status(403).send();
		}
    },

    postCheckDisplayLanguages: function(req, res) {
        var displayLanguages = req.body.displayLangs;
        req.session.displayLanguages = displayLanguages;
        
        var filter = {username: req.session.username};
        var update = {displayLanguages: displayLanguages};

        db.updateOne(Profile, filter, update, function(err, result) {
            res.status(200).send();
        });  
    },

    postCheckProfilePicture: function(req, res) {
		var filename = "/files/" + req.file.filename;
		
        var filter = {username: req.session.username};
        var update = {picture: filename};
		
        db.updateOne(Profile, filter, update, function(err, result) {
            res.status(200).send();
        });  
    },

    postDeleteAccount: function(req, res) {
        var password = req.body.password;

        bcrypt.compare(password, req.session.password, function (err, equal) {
            if (equal) {

                var query = {username: req.session.username};
                var projection = 'quizzesCreated';

                db.findOne(Profile, query, projection, function(result) {
                    var ids = result.quizzesCreated;

                    var filter = {idNum: ids};
                    var update = {
                        status: "Deleted",
                        author: "",
                        numItems: 0,
                        displayLanguage: "",
                        description: "",
                        timesTaken: 0,
                        tags: [],
                        subjectLanguages: [],
                        ratings: [],
                        accuracies: [],
                        comments: [],
                        questions: []
                    }

                    db.updateMany(Quiz, filter, update, function(error, result) {
                        var pcondition = {username: req.session.username};
						
                        db.deleteOne(Profile, pcondition, function(error, result) {
                            req.session.destroy(function(err) {								
                                if (err) throw err;
                                res.status(200).send();
                            });
                        });
                    });
                });
                
            } else {	
				res.status(403).send();
			}
        });
    },

    getAdmin: function(req, res) {
        if (req.session.username == "linquizticsadmin") {
            var query = {username: req.session.username};
            var projection = 'username name email picture streak exp league position';

            db.findOne(Profile, query, projection, function(result) {
                var firstname = result.name.split(" ", 1);
                var username = result.username;
                var name = result.name;
                var email = result.email;
                var picture = result.picture;
                var streak = result.streak;
                var exp = result.exp;
                var league = result.league;
                var position = result.position;

                var userquery = {};
                var userprojection = 'index name username reportDate report';

                db.findMany(Userreport, userquery, userprojection, function(uresult) {
                    var userIndices = [];
                    var userNames = [];
                    var userUsernames = [];
                    var userReportDates = [];
                    var userReports = [];

                    for (var i = 0; i < uresult.length; i++) {
                        userIndices.push(uresult[i].index);
                        userNames.push(uresult[i].name);
                        userUsernames.push(uresult[i].username);
                        userReportDates.push(uresult[i].reportDate.getMonth() + 1 + "-" + 
                                             uresult[i].reportDate.getDate() + "-" + 
                                             uresult[i].reportDate.getFullYear());
                        userReports.push(uresult[i].report);
                    }

                    var quizquery = {};
                    var quizprojection = 'index quizNum title author reportDate report';

                    db.findMany(Quizreport, quizquery, quizprojection, function(qresult) {
                        var quizIndices = [];
                        var quizQuizNums = [];
                        var quizTitles = [];
                        var quizAuthors = [];
                        var quizReportDates = [];
                        var quizReports = [];

                        for (var i = 0; i < qresult.length; i++) {
                            quizIndices.push(qresult[i].index);
                            quizQuizNums.push(qresult[i].quizNum);
                            quizTitles.push(qresult[i].title);
                            quizAuthors.push(qresult[i].author);
                            quizReportDates.push(qresult[i].reportDate.getMonth() + 1 + "-" + 
                                                 qresult[i].reportDate.getDate() + "-" + 
                                                 qresult[i].reportDate.getFullYear());
                            quizReports.push(qresult[i].report);
                        }

                        var commentquery = {};
                        var commentprojection = 'index commentNum quizNum comment author quiz reportDate report';

                        db.findMany(Commentreport, commentquery, commentprojection, function(cresult) {
                            var commentIndices = [];
                            var commentCommentNums = [];
                            var commentQuizNums = [];
                            var commentComments = [];
                            var commentAuthors = [];
                            var commentQuizzes = [];
                            var commentReportDates = [];
                            var commentReports = [];

                            for (var i = 0; i < cresult.length; i++) {
                                commentIndices.push(cresult[i].index);
                                commentCommentNums.push(cresult[i].commentNum);
                                commentQuizNums.push(cresult[i].quizNum);
                                commentComments.push(cresult[i].comment);
                                commentAuthors.push(cresult[i].author);
                                commentQuizzes.push(cresult[i].quiz);
                                commentReportDates.push(cresult[i].reportDate.getMonth() + 1 + "-" + 
                                                        cresult[i].reportDate.getDate() + "-" + 
                                                        cresult[i].reportDate.getFullYear());
                                commentReports.push(cresult[i].report);
                            }

                            var details = {
                                flag: true,
                                adminflag: true,
                                username: username,
                                name: name,
                                firstname: firstname,
                                email: email,
                                picture: picture,
                                streak: streak,
                                exp: exp,
                                league: league,
                                position: position,

                                userIndices: userIndices,
                                userNames: userNames,
                                userUsernames: userUsernames,
                                userReportDates: userReportDates,
                                userReports: userReports,

                                quizIndices: quizIndices,
                                quizQuizNums: quizQuizNums,
                                quizTitles: quizTitles,
                                quizAuthors: quizAuthors,
                                quizReportDates: quizReportDates,
                                quizReports: quizReports,

                                commentIndices: commentIndices,
                                commentCommentNums: commentCommentNums,
                                commentQuizNums: commentQuizNums,
                                commentComments: commentComments,
                                commentAuthors: commentAuthors,
                                commentQuizzes: commentQuizzes,
                                commentReportDates: commentReportDates,
                                commentReports: commentReports
                            }

                            res.render('admin', details);
                        });
                    });   
                });          
            });
        }

        else if (req.session.username == undefined) {
            var details = {
                flag: false,
                adminflag: false
            };
            
            res.render('error', details);
        }

        else {
            var firstname = req.session.name.split(" ", 1);

            var details = {
                flag: true,
                adminflag: false,
                username: req.session.username,
                firstname: firstname,
                picture: req.session.picture,
                name: req.session.name,
                streak: req.session.streak,
                exp: req.session.exp,
                league: req.session.league,
                position: req.session.position
            };

            res.render('error', details);
        }
    },

    postDeleteUserAdmin: function(req, res) {
        var username = req.body.deleteUsername.trim();
        var index = req.body.deleteUserindex;

        var query = {username: username};
        var projection = 'quizzesCreated';

        db.findOne(Profile, query, projection, function(result) {
            var ids = result.quizzesCreated;

            var filter = {idNum: ids};
            var update = {
                status: "Deleted",
                author: "",
                numItems: 0,
                displayLanguage: "",
                description: "",
                timesTaken: 0,
                tags: [],
                subjectLanguages: [],
                ratings: [],
                accuracies: [],
                comments: [],
                questions: []
            }
            
            db.updateMany(Quiz, filter, update, function(error, result) {
                var pcondition = {username: username};

                db.deleteOne(Profile, condition, function(error, result) {
                    var userconditions = {index: index};

                    db.deleteOne(Userreport, userconditions, function(error, result) {
                        res.status(200).send();
                    });
                });
            });      
        });   
    },

    postUnpublishQuizAdmin: function(req, res) {
        var quizNum = req.body.deleteQuiznum;
        var index = req.body.deleteQuizindex;

        var filter = {idNum: quizNum};
        var update = {status: "Unpublished"}

        db.updateOne(Quiz, filter, update, function(error, result) {
            var quizconditions = {index: index};

            db.deleteOne(Quizreport, quizconditions, function(error, result) {
                res.status(200).send();
            });
        });
    },

    postDeleteCommentAdmin: function(req, res) {
        var commentNum = req.body.deleteCommentnum;
        var quizNum = req.body.deleteCommentquiznum;
        var index = req.body.deleteCommentindex;

        var condition = {index: index};

        db.deleteOne(Commentreport, condition, function(error, result) {
            if (commentNum / 100000 >= 1) {
                var query = {idNum: quizNum};
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

                                var filter = {idNum: quizNum};
                                var update = {questions: result.questions};

                                db.updateOne(Quiz, filter, update, function(err, result) {
                                    res.status(200).send();
                                });
                            }
                        }
                    }
                });
            }

            else {
                var filter = {idNum: quizNum};
                var update = {$pull: {'comments': {'commentId': commentNum}}};

                db.updateOne(Quiz, filter, update, function(error, result) {
                    res.status(200).send();
                }); 
            }
        });
    },

    postReportUser: function(req, res) {
        var reason = req.body.reportReason;
        var username = req.body.reportUsername;
        var name = req.body.reportName;
        var date = new Date();

        var query = {};
        var projection = 'index';

        db.findMany(Userreport, query, projection, function(result) {
            var newIndex = result[result.length - 1].index + 1;

            var newReport = {
                index: newIndex,
                name: name,
                username: username,
                reportDate: date,
                report: reason
            };

            db.insertOne(Userreport, newReport, function(error, result) {
                res.status(200).send();
            });
        });
    }
}

module.exports = profileController;