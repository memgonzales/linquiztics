const db = require('../models/db.js');
const Profile = require('../models/ProfileSchema.js');

const leaderboardController = {
	getLeaderboard: function(req, res) {

		var projection = 'picture name username position exp league';

		db.findMany(Profile, {}, projection, function(result) {
			if (result != null) {
				var diamondUsers = [];
				var platinumUsers = [];
				var goldUsers = [];
				var silverUsers = [];
				var bronzeUsers = [];
				var topUsers = [];

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

				for (i = 0; i < 5 && i < newDocuments.length; i++) {
					newDocuments[i].league = "Diamond";
					newDocuments[i].position = i + 1;
					diamondUsers.push(newDocuments[i]);
				}

				for (i = 5; i < 10 && i < newDocuments.length; i++) {
					newDocuments[i].league = "Platinum";
					newDocuments[i].position = i - 4;
					platinumUsers.push(newDocuments[i]);
				}

				for (i = 10; i < 15 && i < newDocuments.length; i++) {
					newDocuments[i].league = "Gold";
					newDocuments[i].position = i - 9;
					goldUsers.push(newDocuments[i]);
				}

				for (i = 15; i < 20 && i < newDocuments.length; i++) {
					newDocuments[i].league = "Silver";
					newDocuments[i].position = i - 14;
					silverUsers.push(newDocuments[i]);
				}

				for (i = 20; i < newDocuments.length; i++) {
					newDocuments[i].league = "Bronze";
					newDocuments[i].position = i - 19;
					bronzeUsers.push(newDocuments[i]);
				}


				for (i = 0; i < 3; i++) {
					topUsers.push(diamondUsers[i]);
				}

				if (req.session.username != undefined) {
					if (req.session.username != "linquizticsadmin") {
						var firstname = req.session.name.split(" ", 1);

						var data = {
							top: topUsers,
							diamond: diamondUsers,
							platinum: platinumUsers,
							gold: goldUsers,
							silver: silverUsers,
							bronze: bronzeUsers,

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
							top: topUsers,
							diamond: diamondUsers,
							platinum: platinumUsers,
							gold: goldUsers,
							silver: silverUsers,
							bronze: bronzeUsers,

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
						top: topUsers,
						diamond: diamondUsers,
						platinum: platinumUsers,
						gold: goldUsers,
						silver: silverUsers,
						bronze: bronzeUsers,

						flag: false,
						adminflag: false 
					}
				}

				res.render('leaderboard', data);	
			}
			
		});	
	}
}

module.exports = leaderboardController;