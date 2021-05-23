const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const nodemailer = require('nodemailer');

const db = require('../models/db.js');
const Profile = require('../models/ProfileSchema.js');

const createAccountController = {

    getCreateAccount: function(req, res) {
        res.render('createAccount');
    },

    postCreateAccount: function(req, res) {
		if (req.file) {
			var filename = "/files/" + req.file.filename;
		} else {
			var filename = "../assets/doggo-default.jpg";
		}
		
        var errors = validationResult(req);

        if (!errors.isEmpty()) {
            errors = errors.errors;

            var details = {};

			for(i = 0; i < errors.length; i++) {
				var errorField = errors[i].param;
				
				if (errors[i].param == "newPassword") {
					errorField = "password";
				} else if (errors[i].param == "email") {
					errorField = "emailAddress";
				}
				
				details[errorField + 'Error'] = errors[i].msg;
			}
				
			console.log(details);

			res.render('createAccount', details);
        }

        else {
            var username = req.body.username;
            var name = req.body.name;
            var email = req.body.email;
            var password = req.body.newPassword;
            var display = req.body.langSelection;
			
            bcrypt.hash(password, saltRounds, function (err, hash) {
                var person = {
                    name: name,
                    username: username,
					picture: filename,
                    email: email,
                    password: hash,
                    displayLanguages: display,
                    streak: 1,
                    exp: 0,
                    league: 'Bronze',
                    position: 0,
                    quizzesTaken: [],
                    quizzesCreated: []
                }

                db.insertOne(Profile, person, function(flag) {					
                    if (flag) {						
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
							to: person.email,
							subject: '[Linquiztics] Welcome, Linquizt!',
							html: '<p>Hello, ' + person.name + '! Thank you for creating a Linquiztics account.</p> <p><b>Linquiztics</b> — a play on <i>linguistics</i> and <i>quiz</i> — is a language learning web application that allows users to create their own quizzes and to answer those made by the community of users. It also features incentivization dynamics designed to gamify learning through customized quiz suggestions, experience points, streaks, leagues, and a global leaderboard.</p><p>Hope you\'re rarin\' to learn!</p>'
						};
						
						transporter.sendMail(mailOptions, function(error, info) {
							if (error) {
								console.log(error);
							} else {
								console.log("Email sent: " + info.response);
								req.session.username = person.username;
								req.session.name = person.name;
								req.session.picture = person.picture;
                    			req.session.password = person.password;
                    			req.session.dislayLanguages = person.displayLanguages;
                    			req.session.streak = person.streak;
                    			req.session.exp = person.exp;
                    			req.session.league = person.league;
                    			req.session.position = person.position;

								res.redirect('/');
							}
						});
                    }
                });
            });
        }     
    },

    getCheckUsername: function (req, res) {
        var username = req.query.username;

        db.findOne(Profile, {username: username}, 'username', function (result) {
            res.send(result);
        });
    }
}

module.exports = createAccountController;