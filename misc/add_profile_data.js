const mongoose = require('mongoose');
const db = require('../models/db.js');
const Profile = require('../models/ProfileSchema.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;

db.connect();

bcrypt.hash('ASDFGHJKL123;', saltRounds, function (err, hash) {
	var person1 = {
		name: 'Jace Gianina Yuchengco',
		picture: '../assets/doggo.jpg',
		username: 'jacegyuchengco',
		email: 'jacegyuchengco@gmail.com',
		password: hash,
		displayLanguages: ['English', 'Filipino'],
		streak: 12,
		exp: 120,
		league: 'Diamond',
		position: 1,
		quizzesCreated: [2, 6],
		quizzesTaken: [
			{
				quizId: 1,
				quizDate: new Date('2021-03-31'),
				accuracy: 100
			},
			{
				quizId: 3,
				quizDate: new Date('2021-03-31'),
				accuracy: 100
			},
			{
				quizId: 4,
				quizDate: new Date('2021-03-30'),
				accuracy: 100
			},
			{
				quizId: 1,
				quizDate: new Date('2021-03-28'),
				accuracy: 86
			},
			{
				quizId: 5,
				quizDate: new Date('2021-03-27'),
				accuracy: 100
			}, 
			{
				quizId: 2,
				quizDate: new Date('2021-03-26'),
				accuracy: 100
			},
			{
				quizId: 8,
				quizDate: new Date('2021-03-25'),
				accuracy: 20
			}, 
			{
				quizId: 2,
				quizDate: new Date('2021-03-24'),
				accuracy: 80
			},
			{
				quizId: 5,
				quizDate: new Date('2021-03-23'),
				accuracy: 50
			}, 
			{
				quizId: 1,
				quizDate: new Date('2021-03-22'),
				accuracy: 43
			},
			{
				quizId: 4,
				quizDate: new Date('2021-03-21'),
				accuracy: 40
			}, 
			{
				quizId: 3,
				quizDate: new Date('2021-03-20'),
				accuracy: 60
			}
		],
		lastActive: new Date('2021-03-31')
	};
	
	var person2 = {
		name: 'Maya Pangilinan',
		picture: '../assets/doggo2.jpg',
		username: 'mayaputingpupper',
		email: 'mayaputingpupper@gmail.com',
		password: hash,
		displayLanguages: ['English', 'Filipino'],
		streak: 2,
		exp: 100,
		league: 'Diamond',
		position: 2,
		quizzesCreated: [5],
		quizzesTaken: [
			{
				quizId: 1,
				quizDate: new Date('2021-03-31'),
				accuracy: 100
			},
			{
				quizId: 7,
				quizDate: new Date('2021-03-30'),
				accuracy: 100
			},
			{
				quizId: 1,
				quizDate: new Date('2021-03-28'),
				accuracy: 80
			},
			{
				quizId: 2,
				quizDate: new Date('2021-03-24'),
				accuracy: 20
			},
			{ 
				quizId: 5,
				quizDate: new Date('2021-03-23'),
				accuracy: 50
			},
			{
				quizId: 1,
				quizDate: new Date('2021-03-22'),
				accuracy: 86
			},
			{
				quizId: 4,
				quizDate: new Date('2021-03-21'),
				accuracy: 40
			} 
		],
		lastActive: new Date('2021-03-31')
	};
	
	var person3 = {
		name: 'Gabe Fukushima',
		picture: '../assets/doggo3.jpg',
		username: 'danccgabe',
		email: 'gfuku@gmail.com',
		password: hash,
		displayLanguages: ['English', 'Filipino'],
		streak: 3,
		exp: 87,
		league: 'Diamond',
		position: 5,
		quizzesCreated: [3],
		quizzesTaken: [
			{
				quizId: 1,
				quizDate: new Date('2021-03-31'),
				accuracy: 100
			}, 
			{
				quizId: 3,
				quizDate: new Date('2021-03-30'),
				accuracy: 100
			}, 
			{
				quizId: 4,
				quizDate: new Date('2021-03-29'),
				accuracy: 100
			}, 
			{
				quizId: 5,
				quizDate: new Date('2021-03-27'),
				accuracy: 100
			},
			{
				quizId: 2,
				quizDate: new Date('2021-03-26'),
				accuracy: 80
			}
		],
		lastActive: new Date('2021-03-31')
	};
	
	var person4 = {
		name: 'Kenji Saotome',
		picture: '../assets/doggo4.jpg',
		username: 'ksaotome',
		email: 'bokuwanihonjin@gmail.com',
		password: hash,
		displayLanguages: ['English', 'Filipino'],
		streak: 1,
		exp: 90,
		league: 'Diamond',
		position: 4,
		quizzesCreated: [4, 7],
		quizzesTaken: [
			{
				quizId: 1,
				quizDate: new Date('2021-03-31'),
				accuracy: 100
			}, 
			{
				quizId: 4,
				quizDate: new Date('2021-03-29'),
				accuracy: 100
			}, 
			{
				quizId: 5,
				quizDate: new Date('2021-03-27'),
				accuracy: 100
			}, 
			{
				quizId: 2,
				quizDate: new Date('2021-03-26'),
				accuracy: 100
			}, 
			{
				quizId: 3,
				quizDate: new Date('2021-03-20'),
				accuracy: 100
			}
		],
		lastActive: new Date('2021-03-31')
	};
	
	var person5 = {
		name: 'Max Chiba',
		picture: '../assets/doggo5.jpg',
		username: 'japashiba',
		email: 'shibainu@gmail.com',
		password: hash,
		displayLanguages: ['English', 'Filipino'],
		streak: 6,
		exp: 95,
		league: 'Diamond',
		position: 3,
		quizzesCreated: [1],
		quizzesTaken: [
			{
				quizId: 1,
				quizDate: new Date('2021-03-31'),
				accuracy: 100
			}, 
			{
				quizId: 3,
				quizDate: new Date('2021-03-30'),
				accuracy: 100
			}, 
			{
				quizId: 4,
				quizDate: new Date('2021-03-29'),
				accuracy: 50
			}, 
			{
				quizId: 1,
				quizDate: new Date('2021-03-28'),
				accuracy: 73
			}, 
			{
				quizId: 5,
				quizDate: new Date('2021-03-27'),
				accuracy: 50
			},
			{
				quizId: 2,
				quizDate: new Date('2021-03-26'),
				accuracy: 40
			}
		],
		lastActive: new Date('2021-03-31')
	};
	
	var person6 = {
		name: 'Brian Collie',
		picture: '../assets/doggo6.jpg',
		username: 'borderc',
		email: 'sheepsnatcher@gmail.com',
		password: hash,
		displayLanguages: ['English'],
		streak: 3,
		exp: 85,
		league: 'Platinum',
		position: 1,
		quizzesCreated: [],
		quizzesTaken: [
			{
				quizId: 1,
				quizDate: new Date('2021-03-31'),
				accuracy: 100
			}, 
			{
				quizId: 3,
				quizDate: new Date('2021-03-30'),
				accuracy: 100
			}, 
			{
				quizId: 4,
				quizDate: new Date('2021-03-29'),
				accuracy: 100
			}, 
			{
				quizId: 8,
				quizDate: new Date('2021-03-25'),
				accuracy: 40
			}, 
			{
				quizId: 3,
				quizDate: new Date('2021-03-20'),
				accuracy: 65
			}
		],
		lastActive: new Date('2021-03-31')
	};

	var person7 = {
		name: 'William Percival Corgi',
		picture: '../assets/doggo7.jpg',
		username: 'weepeecee',
		email: 'stubbybutlovely@gmail.com',
		password: hash,
		displayLanguages: ['English'],
		streak: 4,
		exp: 82,
		league: 'Platinum',
		position: 2,
		quizzesCreated: [],
		quizzesTaken: [
			{
				quizId: 1,
				quizDate: new Date('2021-03-31'),
				accuracy: 100
			}, 
			{
				quizId: 3,
				quizDate: new Date('2021-03-30'),
				accuracy: 50
			}, 
			{
				quizId: 4,
				quizDate: new Date('2021-03-29'),
				accuracy: 0
			}, 
			{
				quizId: 5,
				quizDate: new Date('2021-03-28'),
				accuracy: 25
			}
		],
		lastActive: new Date('2021-03-31')
	};
	
	var person8 = {
		name: 'Inigo Akita',
		picture: '../assets/doggo8.jpg',
		username: 'wonderpup',
		email: 'koregarequiemda@gmail.com',
		password: hash,
		displayLanguages: ['English', 'Filipino'],
		streak: 6,
		exp: 80,
		league: 'Platinum',
		position: 3,
		quizzesCreated: [],
		quizzesTaken: [
			{
				quizId: 4,
				quizDate: new Date('2021-03-31'),
				accuracy: 100
			}, 
			{
				quizId: 5,
				quizDate: new Date('2021-03-30'),
				accuracy: 100
			}, 
			{
				quizId: 2,
				quizDate: new Date('2021-03-29'),
				accuracy: 80
			}, 
			{
				quizId: 8,
				quizDate: new Date('2021-03-28'),
				accuracy: 0
			}, 
			{
				quizId: 5,
				quizDate: new Date('2021-03-27'),
				accuracy: 50
			}, 
			{
				quizId: 1,
				quizDate: new Date('2021-03-26'),
				accuracy: 100
			}
		],
		lastActive: new Date('2021-03-31')
	};



	var person9 = {
		name: 'Annie Malamute',
		picture: '../assets/doggo9.jpg',
		username: 'extrafloofy',
		email: 'alaskan@gmail.com',
		password: hash,
		displayLanguages: ['English'],
		streak: 8,
		exp: 79,
		league: 'Platinum',
		position: 4,
		quizzesCreated: [],
		quizzesTaken: [
			{
				quizId: 1,
				quizDate: new Date('2021-03-31'),
				accuracy: 100
			}, 
			{
				quizId: 3,
				quizDate: new Date('2021-03-30'),
				accuracy: 40
			}, 
			{
				quizId: 4,
				quizDate: new Date('2021-03-29'),
				accuracy: 50
			}, 
			{
				quizId: 1,
				quizDate: new Date('2021-03-28'),
				accuracy: 86
			}, 
			{
				quizId: 2,
				quizDate: new Date('2021-03-27'),
				accuracy: 0
			}, 
			{
				quizId: 1,
				quizDate: new Date('2021-03-26'),
				accuracy: 16
			}, 
			{
				quizId: 4,
				quizDate: new Date('2021-03-25'),
				accuracy: 75
			}, 
			{
				quizId: 3,
				quizDate: new Date('2021-03-24'),
				accuracy: 50
			}
		],
		lastActive: new Date('2021-03-31')
	};



	var person10 = {
		name: 'Alan Shepherd',
		picture: '../assets/doggo10.jpg',
		username: 'aherdingfellow',
		email: 'grindallday@gmail.com',
		password: hash,
		displayLanguages: ['English'],
		streak: 5,
		exp: 77,
		league: 'Platinum',
		position: 5,
		quizzesCreated: [],
		quizzesTaken: [
			{
				quizId: 4,
				quizDate: new Date('2021-03-31'),
				accuracy: 100
			}, 
			{
				quizId: 1,
				quizDate: new Date('2021-03-30'),
				accuracy: 100
			}, 
			{
				quizId: 2,
				quizDate: new Date('2021-03-29'),
				accuracy: 100
			}, 
			{
				quizId: 4,
				quizDate: new Date('2021-03-28'),
				accuracy: 50
			}, 
			{
				quizId: 3,
				quizDate: new Date('2021-03-27'),
				accuracy: 70
			}
		],
		lastActive: new Date('2021-03-31')
	};



	var person11 = {
		name: 'Haley Basset',
		picture: '../assets/doggo11.jpg',
		username: 'frenchdoggo',
		email: 'borkjour@gmail.com',
		password: hash,
		displayLanguages: ['English'],
		streak: 4,
		exp: 76,
		league: 'Gold',
		position: 1,
		quizzesCreated: [],
		quizzesTaken: [
			{
				quizId: 1,
				quizDates: new Date('2021-03-31'),
				accuracy: 100
			}, 
			{
				quizId: 3,
				quizDates: new Date('2021-03-30'),
				accuracy: 100
			}, 
			{
				quizId: 4,
				quizDates: new Date('2021-03-29'),
				accuracy: 100
			}, 
			{
				quizId: 1,
				quizDates: new Date('2021-03-28'),
				accuracy: 20
			}
		],
		lastActive: new Date('2021-03-31')
	};



	var person12 = {
		name: 'Sara Beagle',
		picture: '../assets/doggo12.jpg',
		username: 'notsnoopy',
		email: 'mynameisbillie@gmail.com',
		password: hash,
		displayLanguages: ['English'],
		streak: 8,
		exp: 75,
		league: 'Gold',
		position: 2,
		quizzesCreated: [],
		quizzesTaken: [
			{
				quizId: 1,
				quizDate: new Date('2021-03-31'),
				accuracy: 100
			}, 
			{
				quizId: 3,
				quizDate: new Date('2021-03-30'),
				accuracy: 100
			}, 
			{
				quizId: 4,
				quizDate: new Date('2021-03-29'),
				accuracy: 100
			}, 
			{
				quizId: 1,
				quizDate: new Date('2021-03-28'),
				accuracy: 50
			}, 
			{
				quizId: 2,
				quizDate: new Date('2021-03-27'),
				accuracy: 100
			}, 
			{
				quizId: 1,
				quizDate: new Date('2021-03-26'),
				accuracy: 86
			},
			{
				quizId: 4,
				quizDate: new Date('2021-03-25'),
				accuracy: 50
			}, 
			{
				quizId: 3,
				quizDate: new Date('2021-03-24'),
				accuracy: 43
			}
		],
		lastActive: new Date('2021-03-31')
	};



	var person13 = {
		name: 'Britney Bernese',
		picture: '../assets/doggo13.jpg',
		username: 'mountainfolk',
		email: 'demonslayer@gmail.com',
		password: hash,
		displayLanguages: ['English'],
		streak: 2,
		exp: 72,
		league: 'Gold',
		position: 3,
		quizzesCreated: [],
		quizzesTaken: [
			{
				quizId: 1,
				quizDate: new Date('2021-03-31'),
				accuracy: 50
			}, 
			{
				quizId: 3,
				quizDate: new Date('2021-03-30'),
				accuracy: 50
			}
		],
		lastActive: new Date('2021-03-31')
	};



	var person14 = {
		name: 'Iggy Terrier',
		picture: '../assets/doggo14.jpg',
		username: 'thesixthcrusader',
		email: 'madeinbrooklyn@gmail.com',
		password: hash,
		displayLanguages: ['English'],
		streak: 3,
		exp: 71,
		league: 'Gold',
		position: 4,
		quizzesCreated: [],
		quizzesTaken: [
			{
				quizId: 1,
				quizDate: new Date('2021-03-31'),
				accuracy: 100
			}, 
			{
				quizId: 4,
				quizDate: new Date('2021-03-30'),
				accuracy: 100
			}, 
			{
				quizId: 3,
				quizDate: new Date('2021-03-29'),
				accuracy: 100
			}
		],
		lastActive: new Date('2021-03-31')
	};



	var person15 = {
		name: 'Buddy Boxer',
		picture: '../assets/doggo15.jpg',
		username: 'willfightforu',
		email: 'jailedforangery@gmail.com',
		password: hash,
		displayLanguages: ['English'],
		streak: 6,
		exp: 70,
		league: 'Gold',
		position: 5,
		quizzesCreated: [],
		quizzesTaken: [
			{
				quizId: 1,
				quizDate: new Date('2021-03-31'),
				accuracy: 100
			},
			{
				quizId: 1,
				quizDate: new Date('2021-03-30'),
				accuracy: 86
			}, 
			{
				quizId: 2,
				quizDate: new Date('2021-03-29'),
				accuracy: 100
			}, 
			{
				quizId: 1,
				quizDate: new Date('2021-03-28'),
				accuracy: 73
			}, 
			{
				quizId: 4,
				quizDate: new Date('2021-03-27'),
				accuracy: 100
			}, 
			{
				quizId: 3,
				quizDate: new Date('2021-03-26'),
				accuracy: 100
			}
		],
		lastActive: new Date('2021-03-31')
	};



	var person16 = {
		name: 'Benny Terrier',
		picture: '../assets/doggo16.jpg',
		username: 'bulljanai',
		email: 'orewainuda@gmail.com',
		password: hash,
		displayLanguages: ['English', 'Filipino', 'Japanese'],
		streak: 6,
		exp: 69,
		league: 'Silver',
		position: 1,
		quizzesCreated: [],
		quizzesTaken: [
			{
				quizId: 4,
				quizDate: new Date('2021-03-31'),
				accuracy: 100
			}, 
			{
				quizId: 1,
				quizDate: new Date('2021-03-30'),
				accuracy: 100
			},
			{
				quizId: 5,
				quizDate: new Date('2021-03-29'),
				accuracy: 100
			}, 
			{
				quizId: 5,
				quizDate: new Date('2021-03-28'),
				accuracy: 80
			}, 
			{
				quizId: 1,
				quizDate: new Date('2021-03-27'),
				accuracy: 86
			}, 
			{
				quizId: 4,
				quizDate: new Date('2021-03-26'),
				accuracy: 40
			}
		],
		lastActive: new Date('2021-03-31')
	};



	var person17 = {
		name: 'Clyde Corso',
		picture: '../assets/doggo17.jpg',
		username: 'exoxotic',
		email: 'arrivederci@gmail.com',
		password: hash,
		displayLanguages: ['English', 'Filipino', 'Chinese'],
		streak: 11,
		exp: 67,
		league: 'Silver',
		position: 2,
		quizzesCreated: [],
		quizzesTaken: [
			{
				quizId: 1,
				quizDate: new Date('2021-03-31'),
				accuracy: 100
			},
			{
				quizId: 3,
				quizDate: new Date('2021-03-30'),
				accuracy: 100
			}, 
			{
				quizId: 4,
				quizDate: new Date('2021-03-29'),
				accuracy: 100
			}, 
			{
				quizId: 1,
				quizDate: new Date('2021-03-28'),
				accuracy: 86
			},
			{
				quizId: 5,
				quizDate: new Date('2021-03-27'),
				accuracy: 50
			}, 
			{
				quizId: 2,
				quizDate: new Date('2021-03-26'),
				accuracy: 100
			}, 
			{
				quizId: 8,
				quizDate: new Date('2021-03-25'),
				accuracy: 0
			}, 
			{
				quizId: 2,
				quizDate: new Date('2021-03-24'),
				accuracy: 50
			}, 
			{
				quizId: 5,
				quizDate: new Date('2021-03-23'),
				accuracy: 50
			}, 
			{
				quizId: 1,
				quizDate: new Date('2021-03-22'),
				accuracy: 43
			}, 
			{
				quizId: 4,
				quizDate: new Date('2021-03-21'),
				accuracy: 70
			}
		],
		lastActive: new Date('2021-03-31')
	};



	var person18 = {
		name: 'Charles Spaniel',
		picture: '../assets/doggo18.jpg',
		username: 'afancyboi',
		email: 'letthemeatcake@gmail.com',
		password: hash,
		displayLanguages: ['English', 'Filipino', 'German'],
		streak: 7,
		exp: 65,
		league: 'Silver',
		position: 3,
		quizzesCreated: [],
		quizzesTaken: [
			{
				quizId: 1,
				quizDate: new Date('2021-03-31'),
				accuracy: 100
			}, 
			{
				quizId: 8,
				quizDate: new Date('2021-03-30'),
				accuracy: 80
			}, 
			{
				quizId: 2,
				quizDate: new Date('2021-03-29'),
				accuracy: 100
			}, 
			{
				quizId: 5,
				quizDate: new Date('2021-03-28'),
				accuracy: 100
			}, 
			{
				quizId: 1,
				quizDate: new Date('2021-03-27'),
				accuracy: 73
			}, 
			{
				quizId: 4,
				quizDate: new Date('2021-03-26'),
				accuracy: 100
			}, 
			{
				quizId: 3,
				quizDate: new Date('2021-03-25'),
				accuracy: 100
			}
		],
		lastActive: new Date('2021-03-31')
	};



	var person19 = {
		name: 'George Dane',
		picture: '../assets/doggo19.jpg',
		username: 'muchrefined',
		email: 'londonbruv@gmail.com',
		password: hash,
		displayLanguages: ['English', 'Filipino', 'Japanese'],
		streak: 12,
		exp: 64,
		league: 'Silver',
		position: 4,
		quizzesCreated: [],
		quizzesTaken: [
			{
				quizId: 4,
				quizDate: new Date('2021-03-31'),
				accuracy: 100
			}, 
			{
				quizId: 1,
				quizDate: new Date('2021-03-30'),
				accuracy: 100
			}, 
			{
				quizId: 5,
				quizDate: new Date('2021-03-29'),
				accuracy: 100
			}
		],
		lastActive: new Date('2021-03-31')
	};



	var person20 = {
		name: 'Carl Chihuahua',
		picture: '../assets/doggo20.jpg',
		username: 'veryangery',
		email: 'smolbutteribol@gmail.com',
		password: hash,
		displayLanguages: ['English', 'Filipino', 'German'],
		streak: 4,
		exp: 60,
		league: 'Silver',
		position: 5,
		quizzesCreated: [],
		quizzesTaken: [
			{
				quizId: 1,
				quizDate: new Date('2021-03-31'),
				accuracy: 100
			}, 
			{
				quizId: 3,
				quizDate: new Date('2021-03-30'),
				accuracy: 100
			}, 
			{
				quizId: 4,
				quizDate: new Date('2021-03-29'),
				accuracy: 100
			}, 
			{
				quizId: 1,
				quizDate: new Date('2021-03-28'),
				accuracy: 86
			}
		],
		lastActive: new Date('2021-03-31')
	};



	var person21 = {
		name: 'Karla Chow',
		picture: '../assets/doggo21.jpg',
		username: 'squoshbutwuv',
		email: 'imindanger@gmail.com',
		password: hash,
		displayLanguages: ['English', 'Filipino'],
		streak: 3,
		exp: 50,
		league: 'Bronze',
		position: 1,
		quizzesCreated: [],
		quizzesTaken: [
			{
				quizId: 1,
				quizDate: new Date('2021-03-31'),
				accuracy: 100
			}, 
			{
				quizId: 3,
				quizDate: new Date('2021-03-30'),
				accuracy: 100
			}, 
			{
				quizId: 4,
				quizDate: new Date('2021-03-29'),
				accuracy: 100
			}
		],
		lastActive: new Date('2021-03-31')
	};



	var person22 = {
		name: 'Nymeria Direwolf',
		picture: '../assets/doggo22.jpg',
		username: 'agotreference',
		email: 'aryasakalam@gmail.com',
		password: hash,
		displayLanguages: ['English', 'Filipino', 'German'],
		streak: 2,
		exp: 40,
		league: 'Bronze',
		position: 2,
		quizzesCreated: [],
		quizzesTaken: [
			{
				quizId: 2,
				quizDate: new Date('2021-03-31'),
				accuracy: 100
			}, 
			{
				quizId: 5,
				quizDate: new Date('2021-03-30'),
				accuracy: 100
			}
		],
		lastActive: new Date('2021-03-31')
	};
	
	

	var person23 = {
		name: 'Jolene Cujo',
		picture: '../assets/doggo23.jpg',
		username: 'aifairouz',
		email: 'allhailaraki@gmail.com',
		password: hash,
		displayLanguages: ['English', 'Filipino', 'Japanese'],
		streak: 1,
		exp: 35,
		league: 'Bronze',
		position: 3,
		quizzesCreated: [],
		quizzesTaken: [
			{
				quizId: 2,
				quizDate: new Date('2021-03-26'),
				accuracy: 50
			}
		],
		lastActive: new Date('2021-03-26')
	};

	var admin = {
		name: 'Linquiztics Administrator',
		picture: '../assets/doggo-admin.jpg',
		username: 'linquizticsadmin',
		email: 'linquiztics.webmaster@gmail.com',
		password: hash,
		displayLanguages: ['English', 'Filipino', 'Japanese', 'German', 'Chinese'],
		streak: 0,
		exp: 0,
		league: 'Bronze',
		position: 4,
		quizzesCreated: [],
		quizzesTaken: [

		],
		lastActive: new Date('2021-05-22')
	};

	db.insertMany(Profile, [person1, person2, person3, person4, person5, person6, person7, person8, person9, person10, person11, person12, person13, person14, person15, person16, person17, person18, person19, person20, person21, person22, person23, admin], function(flag) {	
		if (flag) {
			console.log("\nDatabase population complete! Press Ctrl + C to continue.");
		}
	});
});