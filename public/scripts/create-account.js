$(document).ready(function () {
	var validUsernameTrack = false;
	var changeUsernameTrack = true;
	
    function isFilled() {
		
		var username = validator.trim($('#username').val());
		var name = validator.trim($('#name').val());
		var emailAddress = validator.trim($('#email-address').val());
		var password = validator.trim($('#new-password').val());
		var repeatPassword = validator.trim($('#repeat-password').val());
       
        var usernameEmpty = validator.isEmpty(username);
		var nameEmpty = validator.isEmpty(name);
		var emailAddressEmpty = validator.isEmpty(emailAddress);
		var passwordEmpty = validator.isEmpty(password);
		var repeatPasswordEmpty = validator.isEmpty(repeatPassword);

        return !usernameEmpty && !nameEmpty && !emailAddressEmpty && !passwordEmpty && !repeatPasswordEmpty;
    }


    function isValidUsername(field, callback) {

        var username = validator.trim($('#username').val());

		$.get('/getCheckUsername', {username: username}, function (result) {
			if(result.username != username) {
				if(field.is($('#username')))
					$('#usernameError').text('');
					
				validUsernameTrack = true;
					
				return callback(true);
			}

			else {
				if(field.is($('#username')))
					$('#usernameError').text('Username is already registered');
					
				validUsernameTrack = false;

				return callback(false);
			}
		});
    }


    function isValidPassword(field) {

        var validPassword = false;

        var password = validator.trim($('#new-password').val());
        var isValidLength = validator.isLength(password, {min: 8, max: 128});
		
		var isValidCompose = validator.matches(password, /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^()|{}\[\]:;\"<>'`#,./~\\+=-])[A-Za-z\d@$!%*?&^()|{}\[\]:;\"<>'`#,./~\\+=-]{8,128}$/);

        if(isValidLength) {
          
			if (isValidCompose) {
				
				if (field.is($('#new-password')))
					$('#passwordError').text('');
				
				validPassword = true;
				
			} else {
				
				if (field.is($('#new-password')))
					$('#passwordError').text('Should contain number, uppercase, special character');
			}
			
        }

        else {
            if(field.is($('#new-password')))
                // display appropriate error message in `pwError`
                $('#passwordError').text(`Should contain 8 to 128 characters`);
        }

        return validPassword;
    }
	
	function isValidRepeatPassword(field) {
		var validRepeatPassword = false;

        var password = validator.trim($('#new-password').val());
        var repeatPassword = validator.trim($('#repeat-password').val());
		
        if(password == repeatPassword) {
            
			$('#repeatPasswordError').text('');
			validRepeatPassword = true;
			
			
        } else {
			if(field.is($('#repeat-password'))) {
				$('#repeatPasswordError').text(`Passwords do not match`);
			}
		}

        return validRepeatPassword;
    }


    function validateField(field, fieldName, error) {

        var value = validator.trim(field.val());
        var empty = validator.isEmpty(value);

        if (empty) {

            field.prop('value', '');
            error.text(fieldName + 'Should not be empty');
        }

        else
            error.text('');
			
		var filled = isFilled();
						
		var validPassword = isValidPassword(field);
		var validRepeatPassword = isValidRepeatPassword(field);
	
		
		if (changeUsernameTrack) {
			changeUsernameTrack = false;
			
			/* Since it is not yet a valid username, checking is still needed */
			if (!validUsernameTrack) {
				isValidUsername(field, function (validUsername) {
					if(filled && validPassword && validRepeatPassword && validUsername) {
						// alert("A" + filled + validPassword + validRepeatPassword + validUsername);
						
						$('#create-account').prop('disabled', false);
					}

					else {
						// alert("B" + filled + validPassword + validRepeatPassword + validUsername);
						
						$('#create-account').prop('disabled', true);
					}
				});
			}
			
			/* Since it is a valid username, checking is not needed */
			else {
				if(filled && validPassword && validRepeatPassword) {
					// alert("C" + filled + validPassword + validRepeatPassword);
					
					$('#create-account').prop('disabled', false);
				}

				else {
					// alert("D" + filled + validPassword + validRepeatPassword);
					
					$('#create-account').prop('disabled', true);
				}
			}
		}
		
		/* No change in username */
		else {
			/* Use validUsernameTrack to determine validity of username */
			if(filled && validPassword && validRepeatPassword && validUsernameTrack) {
					// alert("E" + filled + validPassword + validRepeatPassword);
					
					$('#create-account').prop('disabled', false);
				}

			else {
				// alert("F" + filled + validPassword + validRepeatPassword);
				
				$('#create-account').prop('disabled', true);
			}
		}
    }

    $('#username').keyup(function () {
		validUsernameTrack = false;
		changeUsernameTrack = true;
		
        validateField($('#username'), '', $('#usernameError'));
    });
	
	$('#name').change(function () {
        validateField($('#name'), '', $('#nameError'));
    });
	
	$('#email-address').change(function () {
        validateField($('#email-address'), '', $('#emailAddressError'));
    });

	$('#new-password').keyup(function () {
        validateField($('#new-password'), '', $('#passwordError'));
    });
	
	$('#repeat-password').keyup(function () {
        validateField($('#repeat-password'), '', $('#repeatPasswordError'));
    });

});
