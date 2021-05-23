const db = require('../models/db.js');
const Profile = require('../models/ProfileSchema.js');

const leaderboardController = {
	getLeaderboard: function(req, res) {

		var projection = 'picture name username position exp league';

		db.findMany(Profile, {}, projection, function(result) {
			if (result != null) {

				var i;
				var allUsers = [];
				var topUsers = [];
				var diamondUsers = [];
				var platinumUsers = [];
				var goldUsers = [];
				var silverUsers = [];
				var bronzeUsers = [];

				allUsers = result;

				for (i = 0; i < allUsers.length; i++) {
					if (allUsers[i].league == 'Diamond') 
						diamondUsers.push(allUsers[i]);
					else if (allUsers[i].league == 'Platinum') 
						platinumUsers.push(allUsers[i]);
					if (allUsers[i].league == 'Gold') 
						goldUsers.push(allUsers[i]);
					if (allUsers[i].league == 'Silver') 
						silverUsers.push(allUsers[i]);
					if (allUsers[i].league == 'Bronze') 
						bronzeUsers.push(allUsers[i]);
				}

				diamondUsers.sort(function(a, b) {
					var keyA = a.exp;
					var keyB = b.exp;

					if (keyA < keyB)
						return 1;
					if (keyA > keyB)
						return -1;
					return 0;
				});

				platinumUsers.sort(function(a, b) {
					var keyA = a.exp;
					var keyB = b.exp;

					if (keyA < keyB)
						return 1;
					if (keyA > keyB)
						return -1;
					return 0;
				});

				goldUsers.sort(function(a, b) {
					var keyA = a.exp;
					var keyB = b.exp;

					if (keyA < keyB)
						return 1;
					if (keyA > keyB)
						return -1;
					return 0;
				});

				silverUsers.sort(function(a, b) {
					var keyA = a.exp;
					var keyB = b.exp;

					if (keyA < keyB)
						return 1;
					if (keyA > keyB)
						return -1;
					return 0;
				});

				bronzeUsers.sort(function(a, b) {
					var keyA = a.exp;
					var keyB = b.exp;

					if (keyA < keyB)
						return 1;
					if (keyA > keyB)
						return -1;
					return 0;
				});

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