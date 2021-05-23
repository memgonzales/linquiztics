const mongoose = require('mongoose');
const db = require('../models/db.js');
const Quiz = require('../models/QuizSchema.js');

db.connect();

var quiz1 = {
	idNum: 1,
	status: "Published",
	title: "Basic Animals",
	author: "japashiba",
	numItems: 7,
	dateCreated: new Date('2021-03-22'),
	dateUpdated: new Date('2021-03-31'),
	tags: ["animals", "basic", "German", "introductory", "vocabulary"],
	displayLanguage: "English",
	subjectLanguages: ["German"],
	description: "This is a quiz about animal names in German intended for beginners. Hope you enjoy!",
	ratings: [5, 5, 5, 5, 4, 5, 5, 3, 1, 5],
	accuracies: [100, 100, 86, 86, 71, 71, 57, 57, 43, 29],
	timesTaken: 10,
	comments: [
		{
			commentId: 11001,
			author: "mayaputingpupper",
			datePosted: new Date('2021-03-31'),
			body: "Some of the items were not for beginners."
		}
	],
	questions: [
		{
			index: 1,
			body: "What is \"cat\" in German?",
			choiceA: "Katze",
			choiceB: "Hund",
			choiceC: "Cattie",
			choiceD: "Vogel",
			correctAnswer: "choice-a",
			explanation: "",
			image: "",
			audio: "",
			comments: [
				{
					itemCommentId: 12001001,
					author: "mayaputingpupper",
					datePosted: new Date('2021-03-31'),
					body: "isn't the correct answer katzen?"
				},
				
				{
					itemCommentId: 12001002,
					author: "ksaotome",
					datePosted: new Date('2021-03-31'),
					body: "isn't the correct answer kitto?"
				}
			],
			accuracy: 80
		},
		{
			index: 2,
			body: "What is \"dog\" in German?",
			choiceA: "Doggo",
			choiceB: "Hund",
			choiceC: "Hähnchen",
			choiceD: "Vogel",
			correctAnswer: "choice-b",
			explanation: "",
			image: "",
			audio: "",
			comments: [

			],
			accuracy: 70
		},
		{
			index: 3,
			body: "What is \"bird\" in German?",
			choiceA: "Wurm",
			choiceB: "Bär",
			choiceC: "Fraulein",
			choiceD: "Vogel",
			correctAnswer: "choice-d",
			explanation: "",
			image: "",
			audio: "",
			comments: [

			],
			accuracy: 60
		},
		{ 
			index: 4,
			body: "What is \"Pferd\" in English?",
			choiceA: "puppy",
			choiceB: "donkey",
			choiceC: "horse",
			choiceD: "hen",
			correctAnswer: "choice-c",
			explanation: "",
			image: "",
			audio: "",
			comments: [

			],
			accuracy: 25
		},
		{
			index: 5,
			body: "What is \"Drachen\" in English?",
			choiceA: "zebra",
			choiceB: "dragon",
			choiceC: "rhinoceros",
			choiceD: "drake",
			correctAnswer: "choice-b",
			explanation: "",
			image: "",
			audio: "",
			comments: [

			],
			accuracy: 50
		},
		{
			index: 6,
			body: "Give the German name for this animal:",
			choiceA: "Einkaufswagen",
			choiceB: "Schmetterling",
			choiceC: "Käfer",
			choiceD: "Falke",
			correctAnswer: "choice-b",
			explanation: "Butterfly in German is Schmetterling.",
			image: "../assets/quiz-assets/butterfly.jpg",
			audio: "",
			comments: [

			],
			accuracy: 10
		},
		{
			index: 7,
			body: "Give the German name for this animal:",
			choiceA: "Katzenbär",
			choiceB: "Fuchs",
			choiceC: "Affe",
			choiceD: "Eichhörnchen",
			correctAnswer: "choice-d",
			explanation: "Squirrel in German is Eichhörnchen.",
			image: "../assets/quiz-assets/squirrel.jpg",
			audio: "",
			comments: [

			],
			accuracy: 5
		}
	]
};


var quiz2 = {
	idNum: 2,
	status: "Published",
	title: "Anime Quotes",
	author: "jacegyuchengco",
	numItems: 5,
	dateCreated: new Date('2021-03-20'),
	dateUpdated: new Date('2021-03-20'),
	tags: ["anime", "Japanese", "multimedia", "quotes", "intermediate"],
	displayLanguage: "English",
	subjectLanguages: ["Japanese"],
	description: "Learn Japanese using your favorite anime quotes! <br><br> NOTE: You must know how to read basic hiragana, katakana, and kanji to take this quiz.",
	ratings: [5, 5, 5, 5, 5],
	accuracies: [100, 80, 0, 80, 40],
	timesTaken: 5,
	comments: [
		{
			commentId: 21001,
			author: "japashiba",
			datePosted: new Date('2021-03-31'),
			body: "Not beginner-friendly, but very cool :)"
		},
		
		{
			commentId: 21002,
			author: "mayaputingpupper",
			datePosted: new Date('2021-03-31'),
			body: "Best quiz ever :)"
		}
	],
	questions: [
		{
			index: 1,
			body: "Fill in the blank: このジョルノジョバァナには___がある.",
			choiceA: "夢",
			choiceB: "眠る",
			choiceC: "問題",
			choiceD: "お茶",
			correctAnswer: "choice-a",
			explanation: "Translation: \"I, Giorno Giovanna, have a dream.\"<br><br>Giorno Giovanna, JoJo's Bizarre Adventure Golden Wind",
			image: "",
			audio: "",
			comments: [
				
			],
			accuracy: 5
		},
		{
			index: 2,
			body: "Fill in the blank: O pitiful shadow drowning in darkness... ___?",
			choiceA: "いっぺん生きてみる",
			choiceB: "いっぺん食べみる",
			choiceC: "いっぺん死んでみる",
			choiceD: "いっぺん歌うみる",
			correctAnswer: "choice-c",
			explanation: "Translation: \"... Want to try dying once?\"<br><br>Enma Ai, Hell Girl",
			image: "",
			audio: "",
			comments: [

			],
			accuracy: 10
		},
		{
			index: 3,
			body: "Fill in the blank: ___だぜ.",
			choiceA: "アラアラ",
			choiceB: "やれやれ",
			choiceC: "誰誰",
			choiceD: "雨雨",
			correctAnswer: "choice-b",
			explanation: "Translation: \"Good grief.\"<br><br>Jotaro Kujo, JoJo's Bizarre Adventure Stardust Crusaders",
			image: "",
			audio: "",
			comments: [
				{
					itemCommentId: 22003001,
					author: "japashiba",
					datePosted: new Date('2021-03-31'),
					body: "I think this has no direct English translation."
				}
			],
			accuracy: 90
		},
		{
			index: 4,
			body: "Fill in the blank: 俺は___だ!",
			choiceA: "無限",
			choiceB: "紅蓮",
			choiceC: "ガンマン",
			choiceD: "ガンダム",
			correctAnswer: "choice-d",
			explanation: "Translation: \"I am Gundam!\"<br><br>Setsuna F. Seiei, Gundam 00",
			image: "",
			audio: "",
			comments: [

			],
			accuracy: 10
		},
		{
			index: 5,
			body: "Transcribe the audio:",
			choiceA: "お前はもう死んでいる",
			choiceB: "お前はもうビジンでいる",
			choiceC: "お前はもう悲しいでいる",
			choiceD: "お前はもう寿司でいる",
			correctAnswer: "choice-a",
			explanation: "Translation: \"You are already dead.\"<br><br>Kenshiro, Fist of the North Star",
			image: "",
			audio: "../assets/quiz-assets/kenshiro.mp3",
			comments: [

			],
			accuracy: 100
		}
	]
};


var quiz3 = {
	idNum: 3,
	status: "Published",
	title: "Conyo 101",
	author: "danccgabe",
	numItems: 5,
	dateCreated: new Date('2021-03-20'),
	dateUpdated: new Date('2021-03-20'),
	tags: ["conyo", "Filipino", "lozol", "slang", "modern"],
	displayLanguage: "English",
	subjectLanguages: ["English", "Filipino"],
	description: "Learn a variety of conyo terms and phrases through this short quiz.",
	ratings: [5, 4, 5],
	accuracies: [100, 40, 100],
	timesTaken: 3,
	comments: [
		{
			commentId: 31001,
			author: "ksaotome",
			datePosted: new Date('2021-03-31'),
			body: "Nice!"
		}
	],
	questions: [
		{
			index: 1,
			body: "What does the word \"lods\" mean?",
			choiceA: "Someone you admire",
			choiceB: "The capacity of a battery",
			choiceC: "Currency for calling and texting",
			choiceD: "Nickname of people named Melody",
			correctAnswer: "choice-a",
			explanation: "Lods is short for \"lodi\", derived from \"idol\".",
			image: "",
			audio: "",
			comments: [

			],
			accuracy: 90
		},
		{
			index: 2,
			body: "Fill in the blank:<br><br>I dropped that class ___.",
			choiceA: "already",
			choiceB: "mou",
			choiceC: "na",
			choiceD: "hitherto",
			correctAnswer: "choice-c",
			explanation: "Always use \"na\" for past tense.",
			image: "",
			audio: "",
			comments: [

			],
			accuracy: 100
		},
		{
			index: 3,
			body: "What do you call fish balls in conyo?",
			choiceA: "piscine spheres",
			choiceB: "tusok-tusok",
			choiceC: "neon balls",
			choiceD: "peasant food",
			correctAnswer: "choice-b",
			explanation: "Note: Neon balls refer to kwek-kwek!",
			image: "",
			audio: "",
			comments: [

			],
			accuracy: 70
		},
		{
			index: 4,
			body: "What is the appropriate response to \"Bro, let's cut na?\"",
			choiceA: "I think not, good sir",
			choiceB: "Tally ho, chap",
			choiceC: "I'm g, bro",
			choiceD: "Daga kotowaru",
			correctAnswer: "choice-c",
			explanation: "\"G\" originated from the word \"game\", I think.",
			image: "",
			audio: "",
			comments: [

			],
			accuracy: 50
		},
		{
			index: 5,
			body: "How do you say that you're in a hot place?",
			choiceA: "Air-con, please",
			choiceB: "Decidedly not chilly, innit?",
			choiceC: "Ang inet",
			choiceD: "It's so init here",
			correctAnswer: "choice-d",
			explanation: "",
			image: "",
			audio: "",
			comments: [

			],
			accuracy: 45
		}
	]
};


var quiz4 = {
	idNum: 4,
	status: "Published",
	title: "Terms for Family Members",
	author: "ksaotome",
	numItems: 10,
	dateCreated: new Date('2021-03-22'),
	dateUpdated: new Date('2021-03-23'),
	tags: ["Mandarin", "family", "terms", "beginner", "basic"],
	displayLanguage: "English",
	subjectLanguages: ["Chinese"],
	description: "Chinese (Mandarin) terms for immediate family members",
	ratings: [4, 3, 4],
	accuracies: [90, 100, 100],
	timesTaken: 3,
	comments: [

	],
	questions: [
		{
			index: 1,
			body: "What does 媽媽 mean?",
			choiceA: "father",
			choiceB: "mother",
			choiceC: "aunt",
			choiceD: "uncle",
			correctAnswer: "choice-b",
			explanation: "",
			image: "",
			audio: "",
			comments: [

			],
			accuracy: 100
		},
		{
			index: 2,
			body: "What does 爸爸 mean?",
			choiceA: "father",
			choiceB: "mother",
			choiceC: "aunt",
			choiceD: "uncle",
			correctAnswer: "choice-a",
			explanation: "",
			image: "",
			audio: "",
			comments: [

			],
			accuracy: 100
		},
		{
			index: 3,
			body: "What does 哥哥 mean?",
			choiceA: "older brother",
			choiceB: "younger brother",
			choiceC: "older sister",
			choiceD: "younger sister",
			correctAnswer: "choice-a",
			explanation: "",
			image: "",
			audio: "",
			comments: [

			],
			accuracy: 100
		},
		{
			index: 4,
			body: "What does 弟弟 mean?",
			choiceA: "older brother",
			choiceB: "younger brother",
			choiceC: "older sister",
			choiceD: "younger sister",
			correctAnswer: "choice-b",
			explanation: "",
			image: "",
			audio: "",
			comments: [

			],
			accuracy: 100
		},
		{
			index: 5,
			body: "What does 姐姐 mean?",
			choiceA: "older brother",
			choiceB: "younger brother",
			choiceC: "older sister",
			choiceD: "younger sister",
			correctAnswer: "choice-c",
			explanation: "",
			image: "",
			audio: "",
			comments: [

			],
			accuracy: 67
		},
		{
			index: 6,
			body: "What does 妹妹 mean?",
			choiceA: "older brother",
			choiceB: "younger brother",
			choiceC: "older sister",
			choiceD: "younger sister",
			correctAnswer: "choice-d",
			explanation: "",
			image: "",
			audio: "",
			comments: [

			],
			accuracy: 67
		},
		{
			index: 7,
			body: "What does 奶奶 mean?",
			choiceA: "aunt",
			choiceB: "uncle",
			choiceC: "grandmother",
			choiceD: "grandfather",
			correctAnswer: "choice-c",
			explanation: "",
			image: "",
			audio: "",
			comments: [

			],
			accuracy: 33
		},
		{
			index: 8,
			body: "What does 爺爺 mean?",
			choiceA: "aunt",
			choiceB: "uncle",
			choiceC: "grandmother",
			choiceD: "grandfather",
			correctAnswer: "choice-d",
			explanation: "",
			image: "",
			audio: "",
			comments: [

			],
			accuracy: 33
		},
		{
			index: 9,
			body: "What does 父母 mean?",
			choiceA: "relatives",
			choiceB: "parents",
			choiceC: "grandparents",
			choiceD: "brothers and sisters",
			correctAnswer: "choice-b",
			explanation: "",
			image: "",
			audio: "",
			comments: [

			],
			accuracy: 33,
		},
		{
			index: 10,
			body: "What does 兄弟姐妹 mean?",
			choiceA: "relatives",
			choiceB: "parents",
			choiceC: "grandparents",
			choiceD: "brothers and sisters",
			correctAnswer: "choice-d",
			explanation: "",
			image: "",
			audio: "",
			comments: [
						{
							commentId: 42010001,
							author: "japashiba",
							datePosted: new Date('2021-03-31'),
							body: "I think you can also use \"siblings\"."
						}
			],
			accuracy: 0
		}
	]
};


var quiz5 = {
	idNum: 5,
	status: "Published",
	title: "Filipino to English Translation",
	author: "mayaputingpupper",
	numItems: 6,
	dateCreated: new Date('2021-03-20'),
	dateUpdated: new Date('2021-03-20'),
	tags: ["translation", "food", "fruits", "vegetables", "Filipino"],
	displayLanguage: "Filipino",
	subjectLanguages: "English",
	description: "Alamin ang salin ng iba't ibang pagkain.",
	ratings: [4, 4, 5, 3],
	accuracies: [50, 50, 67, 100],
	timesTaken: 4,
	comments: [
		{
			commentId: 51001,
			author: "danccgabe",
			datePosted: new Date('2021-03-31'),
			body: "This was lit! Waiting for a part 2!"
		}
	],
	questions: [
		{
			index: 1,
			body: "Ano ito sa Ingles?",
			choiceA: "fire spinach",
			choiceB: "water spinach",
			choiceC: "earth spinach",
			choiceD: "air spinach",
			correctAnswer: "choice-b",
			explanation: "",
			image: "../assets/quiz-assets/kangkong.jpg",
			audio: "",
			comments: [

			],
			accuracy: 50
		},
		{
			index: 2,
			body: "Ano ito sa Ingles?",
			choiceA: "bitter gourd",
			choiceB: "cucumber",
			choiceC: "sour gourd",
			choiceD: "water gourd",
			correctAnswer: "choice-a",
			explanation: "",
			image: "../assets/quiz-assets/ampalaya.jpg",
			audio: "",
			comments: [

			],
			accuracy: 25
		},
		{
			index: 3,
			body: "Ano ang atis sa Ingles?",
			choiceA: "cream apple",
			choiceB: "sopsweet",
			choiceC: "sugar apple",
			choiceD: "aggregate apple",
			correctAnswer: "choice-c",
			explanation: "",
			image: "",
			audio: "",
			comments: [

			],
			accuracy: 50
		},
		{
			index: 4,
			body: "Ano ang ube sa Ingles?",
			choiceA: "potato",
			choiceB: "taro",
			choiceC: "sweet potato",
			choiceD: "yam",
			correctAnswer: "choice-d",
			explanation: "",
			image: "",
			audio: "",
			comments: [

			],
			accuracy: 100
		},
		{
			index: 5,
			body: "Ano ang labanos sa Ingles?",
			choiceA: "beet",
			choiceB: "turnip",
			choiceC: "radish",
			choiceD: "chestnut",
			correctAnswer: "choice-c",
			explanation: "",
			image: "",
			audio: "",
			comments: [

			],
			accuracy: 75
		},
		{
			index: 6,
			body: "Ano ang malunggay sa Ingles?",
			choiceA: "moringa",
			choiceB: "matsumura",
			choiceC: "murata",
			choiceD: "miracle fruit",
			correctAnswer: "choice-a",
			explanation: "",
			image: "",
			audio: "",
			comments: [

			],
			accuracy: 50
		}
	]
};


var quiz6 = {
	idNum: 6,
	status: "Unpublished",
	title: "Hiragana and Katakana",
	author: "jacegyuchengco",
	numItems: 3,
	dateCreated: new Date('2021-03-25'),
	dateUpdated: new Date('2021-03-28'),
	tags: ["Japanese", "alphabet", "beginner", "hiragana", "katakana"],
	displayLanguage: "English",
	subjectLanguages: ["Japanese"],
	description: "Learn how to read and write hiragana and katakana characters through this quiz!",
	ratings: [],
	accuracies: [],
	timesTaken: 0,
	comments: [

	],
	questions: [
		{
			index: 1,
			body: "How is this pronounced? か",
			choiceA: "ga",
			choiceB: "ka",
			choiceC: "ba",
			choiceD: "sha",
			correctAnswer: "choice-b",
			explanation: "",
			image: "",
			audio: "",
			comments: [

			],
			accuracy: 0
		},
		{
			index: 2,
			body: "How is this pronounced? の",
			choiceA: "na",
			choiceB: "ni",
			choiceC: "nu",
			choiceD: "no",
			correctAnswer: "choice-d",
			explanation: "",
			image: "",
			audio: "",
			comments: [

			],
			accuracy: 0
		},
		{
			index: 3,
			body: "How is this pronounced? あ",
			choiceA: "u",
			choiceB: "e",
			choiceC: "a",
			choiceD: "i",
			correctAnswer: "choice-c",
			explanation: "",
			image: "",
			audio: "",
			comments: [

			],
			accuracy: 0
		}
	]
};


var quiz7 = {
	idNum: 7,
	status: "Published",
	title: "Basic Pronouns",
	author: "ksaotome",
	numItems: 5,
	dateCreated: new Date('2021-03-20'),
	dateUpdated: new Date('2021-03-20'),
	tags: ["pronouns", "Chinese", "basic", "genders", "conversational"],
	displayLanguage: "English",
	subjectLanguages: ["Chinese"],
	description: "Quiz on the basic pronouns used in conversational Chinese",
	ratings: [5, 4],
	accuracies: [100, 100],
	timesTaken: 2,
	comments: [
		{
			commentId: 71001,
			author: "japashiba",
			datePosted: new Date('2021-03-31'),
			body: "I learned a lot with this :)"
		}
	],
	questions: [
		{
			index: 1,
			body: "How do you say \"me\" in Chinese?",
			choiceA: "我",
			choiceB: "你",
			choiceC: "他",
			choiceD: "她",
			correctAnswer: "choice-a",
			explanation: "",
			image: "",
			audio: "",
			comments: [
			
			],
			accuracy: 100
		},
		{
			index: 2,
			body: "How do you say \"you\" in Chinese?",
			choiceA: "我",
			choiceB: "你",
			choiceC: "他",
			choiceD: "她",
			correctAnswer: "choice-b",
			explanation: "",
			image: "",
			audio: "",
			comments: [

			],
			accuracy: 100
		},
		{
			index: 3,
			body: "How do you say \"he\" in Chinese?",
			choiceA: "我",
			choiceB: "你",
			choiceC: "他",
			choiceD: "她",
			correctAnswer: "choice-c",
			explanation: "",
			image: "",
			audio: "",
			comments: [

			],
			accuracy: 100
		},
		{
			index: 4,
			body: "How do you say \"she\" in Chinese?",
			choiceA: "我",
			choiceB: "你",
			choiceC: "他",
			choiceD: "她",
			correctAnswer: "choice-d",
			explanation: "",
			image: "",
			audio: "",
			comments: [

			],
			accuracy: 100
		},
		{
			index: 5,
			body: "How do you say \"it\" in Chinese?",
			choiceA: "您",
			choiceB: "它",
			choiceC: "爾",
			choiceD: "誰",
			correctAnswer: "choice-b",
			explanation: "",
			image: "",
			audio: "",
			comments: [

			],
			accuracy: 50
		}
	]
};

var quiz8 = {
	idNum: 8,
	title: "Karuta Phrases",
	status: "Deleted"
};


db.insertMany(Quiz, [quiz1, quiz2, quiz3, quiz4, quiz5, quiz6, quiz7, quiz8], function(flag) {
	if (flag) {
		console.log("\nDatabase population complete! Press Ctrl + C to continue.");
	}
});
