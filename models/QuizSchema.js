var mongoose = require('mongoose');

var QuizSchema = new mongoose.Schema({
    idNum: {
    	type: Number,
    	required: false
    },

    status: {
    	type: String,
    	required: false
    },
    
    title: {
        type: String,
        required: false
    },
	
	author: {
        type: String,
        required: false
    },
	
	numItems: {
        type: Number,
        required: false
    },
	
	dateCreated: {
		type: Date,
		default: Date.now
	},

	dateUpdated: {
		type: Date,
		default: Date.now
	},
	
	tags: {
		type: [String],
		required: false
	},
	
	displayLanguage: {
		type: String,
		required: false
	},
	
	subjectLanguages: {
		type: [String],
		required: false
	},
	
	description: {
		type: String,
		required: false
	},
	
	ratings: {
		type: [Number],
		required: false
	},
	
	accuracies: {
		type: [Number],
		required: false
	},

	timesTaken: {
		type: Number,
		required: false
	},
	
	comments: [
		{
			commentId: {
				type: Number,
				required: false
			},

			author: {
				type: String,
				required: false
			},
			
			datePosted: {
				type: Date,
				default: Date.now
			},
			
			body: {
				type: String,
				required: false
			}
		}
	],
	
	questions: [
		{
			index: {
				type: Number,
				required: false
			},
			
			body: {
				type: String,
				required: false
			},
			
			choiceA: {
				type: String,
				required: false
			},
			
			choiceB: {
				type: String,
				required: false
			},
			
			choiceC: {
				type: String,
				required: false
			},
			
			choiceD: {
				type: String,
				required: false
			},
			
			correctAnswer: {
				type: String,
				required: false
			},
			
			explanation: {
				type: String,
				required: false
			},
			
			image: {
				type: String,
				required: false
			},
			
			audio: {
				type: String,
				required: false
			},
			
			comments: [
				{
					itemCommentId: {
						type: Number,
						required: false
					},

					author: {
						type: String,
						required: false
					},
					
					datePosted: {
						type: Date,
						default: Date.now
					},
					
					body: {
						type: String,
						required: false
					}
				}
			],

			accuracy: {
				type: Number,
				required: false
			}
		}
	]
});

/*
    exports a mongoose.model object based on `UserSchema` (defined above)
    when another script exports from this file
    This model executes CRUD operations
    to collection `users` -> plural of the argument `User`
*/
module.exports = mongoose.model('Quiz', QuizSchema);
