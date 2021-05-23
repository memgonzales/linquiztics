const db = require('../models/db.js');
const Profile = require('../models/ProfileSchema.js');
const bcrypt = require('bcrypt');

const loginController = {

	displayLogin: function(req, res) {
		res.render('login');
	},

    postLogin: function(req, res) {
        var username = req.body.username;
        var password = req.body.password;

        db.findOne(Profile, {username: username}, '', function (result) {
            if (result) {
                var firstname = result.name.split(" ", 1);

                var person = {
                    name: result.name,
                    firstname: firstname,
                    username: result.username,
					picture: result.picture,
                    email: result.email,
                    displayLanguages: result.displayLanguages,
                    streak: result.streak,
                    exp: result.exp,
                    league: result.league,
                    position: result.position
                }

                bcrypt.compare(password, result.password, function (err, equal) {
                    if (equal) {
                        req.session.username = person.username;
                        req.session.name = person.name; 
                        req.session.displayLanguages = person.displayLanguages;

                        var details = {
                            flag: true,
                            username: req.session.username,
                            name: req.session.name
                        }

                        res.status(200).send();
                    }

                    else {
                        var details = {
                            flag: false,
                            error: 'Incorrect username and/or password'
                        };

                        res.status(403).send();
                    }
                });
            }

            else {
                res.status(403).send();
            }
        });
    }
}

module.exports = loginController;