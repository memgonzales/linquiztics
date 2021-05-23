const db = require('../models/db.js');
const Profile = require('../models/ProfileSchema.js');

const controller = {

    getIndex: function (req, res) {
        if (req.session.username == undefined) {
            var details = {
                flag: false,
                adminflag: false
            }
			
			res.render('index', details);
        }

        else {
            db.findOne(Profile, {username: req.session.username}, '', function (result) {
                if (result) {
                    
                    if (result.username != "linquizticsadmin") {
                        var firstname = result.name.split(" ", 1);

                        var details = {
                            flag: true,
                            adminflag: false,
                            username: result.username,
                            password: result.password,
                            picture: result.picture,
                            name: result.name,
                            firstname: firstname,
                            streak: result.streak,
                            exp: result.exp,
                            league: result.league,
                            position: result.position
                        }

                        req.session.username = details.username;
                        req.session.picture = details.picture;
                        req.session.name = details.name;
                        req.session.password = details.password;
                        req.session.streak = details.streak;
                        req.session.exp = details.exp;
                        req.session.league = details.league;
                        req.session.position = details.position;

                        res.render('index', details);
                    } 

                    else {
                        var firstname = result.name.split(" ", 1);

                        var details = {
                            flag: true,
                            adminflag: true,
                            username: result.username,
                            password: result.password,
                            picture: result.picture,
                            name: result.name,
                            firstname: firstname,
                            streak: result.streak,
                            exp: result.exp,
                            league: result.league,
                            position: result.position
                        }

                        req.session.username = details.username;
                        req.session.picture = details.picture;
                        req.session.name = details.name;
                        req.session.password = details.password;
                        req.session.streak = details.streak;
                        req.session.exp = details.exp;
                        req.session.league = details.league;
                        req.session.position = details.position;

                        res.render('index', details);
                    }       
                }	
            });
        }
    },

    getCredits: function(req, res) {
        res.render('credits');
    }
   
}

module.exports = controller;