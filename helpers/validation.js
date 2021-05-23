const { check } = require('express-validator');

const db = require('../models/db.js');
const Profile = require('../models/ProfileSchema.js');

const validation = {

    createAccountValidation: function () {

        var validation = [
			check('username', 'Should not be empty').trim().notEmpty(),
			check('name', 'Should not be empty').trim().notEmpty(),
			check('email', 'Should not be empty').trim().notEmpty(),
			check('newPassword', 'Should not be empty').trim().notEmpty(),
			check('repeatPassword', 'Should not be empty').trim().notEmpty(),
			
			/* Check password */
			check('newPassword', 'Should contain 8 to 128 characters').isLength({min: 8, max: 128}),
			check('newPassword').custom(function(value) {
				if (value.match(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^()|{}\[\]:;\"<>'`#,./~\\+=-])[A-Za-z\d@$!%*?&^()|{}\[\]:;\"<>'`#,./~\\+=-]{8,128}$/)) {
					return true;
					
				} else {
					throw new Error('Should contain number, uppercase, special character');
				}
			}),
			
			/* Check username (must be unique) */
			check('username').custom(function(value) {	
				console.log(value);
			
				return new Promise(function(resolve, reject) {
					db.findOne(Profile, {username: value}, 'username', function(error, result) {
						if (error || result) {
							reject(new Error('Username is already registered'));
						}
						
						resolve(true);
					});	
				});
			})
        ];
		
        return validation;
    }
}

module.exports = validation;
