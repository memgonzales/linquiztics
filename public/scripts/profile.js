$(document).ready(function() {
	$('#edit-username-form').on('submit', function(e) {
		e.preventDefault();
		
		$.ajax({
			url: '/checkName',
			method: 'POST',
			data: $('#edit-username-form').serialize(),
			statusCode: {
				200: function(data) {
					$('#incorrect-password-edit-username').css("display", "none");
					newName = $('#new-name').val();
					editUsername(newName);
					
					$('#new-name').val("");
					$('#password-for-username').val("");
				},
				
				403: function() {
					$('#incorrect-password-edit-username').css("display", "inline");
					$('#password-for-username').val("");
				}
			}
		});
	});
	
	$('#edit-email-form').on('submit', function(e) {
		e.preventDefault();
		
		$.ajax({
			url: '/checkEmail',
			method: 'POST',
			data: $('#edit-email-form').serialize(),
			statusCode: {
				200: function(data) {
					$('#incorrect-password-edit-email').css("display", "none");
					newEmail = $('#new-email').val();
					editEmail(newEmail);
					
					$('#new-email').val("");
					$('#password-for-email').val("");
				},
				
				403: function() {
					$('#incorrect-password-edit-email').css("display", "inline");					
					$('#password-for-email').val("");
				}
			}
		});
	});
	
	$('#edit-password-form').on('submit', function(e) {
		e.preventDefault();
		
		var newPassword = $('#new-password').val();
		var repPassword = $('#repeat-password').val();
		
		$('#incorrect-password-edit-password').css("display", "none");	
		$('#no-match-password').css("display", "none");	
		$('#invalid-password-format').css("display", "none");
		
		if (newPassword == repPassword) {
			// Check if new password conforms to format
			if (checkPassword(newPassword)) {
				
				$.ajax({
					url: '/checkPassword',
					method: 'POST',
					data: $('#edit-password-form').serialize(),
					statusCode: {
						200: function(data) {
							editPassword();
							
							$('#new-password').val("");
							$('#repeat-password').val("");
							$('#old-password').val("");
							
							alert("Password change succeeded! Please log in again to continue.");
							window.location.replace("/logout");
						},
						
						403: function() {
							$('#incorrect-password-edit-password').css("display", "inline");
							
							$('#old-password').val("");
						}
					}
				});
				
			} else {
				$('#new-password').val("");
				$('#repeat-password').val("");
				$('#invalid-password-format').css("display", "inline");
			}
			
		} else {
			$('#new-password').val("");
			$('#repeat-password').val("");
			$('#no-match-password').css("display", "inline");		
		}
	});
	
	$("#profile-picture-upload").change(function(event) {
		loadFile(event);
		$("#edit-profile-picture-form").submit();
	});
	
	$('#edit-profile-picture-form').on('submit', function(e) {
		e.preventDefault();
		
		var fd = new FormData($("#edit-profile-picture-form").get(0));  
				
		$.ajax({
			url: '/checkProfilePicture',
			method: 'POST',
			data: fd,
			processData: false,
			contentType: false
		});
	});
	
	$('#edit-lang-form').on('submit', function(e) {
		e.preventDefault();
						
		$.ajax({
			url: '/checkDisplayLanguages',
			method: 'POST',
			data: $('#edit-lang-form').serialize(),
			success: function() {
				editDisplayLanguages();
			}
		});
	});
	
	$('#delete-account-form').on('submit', function(e) {
		e.preventDefault();
		
		$.ajax({
			url: '/deleteAccount',
			method: 'POST',
			data: $('#delete-account-form').serialize(),
			statusCode: {
				200: function(data) {
					window.location.href = "/";
				},
				
				403: function() {
					$('#incorrect-password-delete-account').css("display", "inline");
					$('#password-for-del').val("");
				}
			}
		});
	});

	$('#report-user-form').on('submit', function(e) {
		e.preventDefault();
		
		$.ajax({
			url: '/reportUser',
			method: 'POST',
			data: $('#report-user-form').serialize(),
			success: function(data) {
				reportUser();
			}
		});
	});
});

function checkPassword(password) {
	if (password.length < 8  || password.length > 128) {
		return false;
	}
	
	if (password.match(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^()|{}\[\]:;\"<>'`#,./~\\+=-])[A-Za-z\d@$!%*?&^()|{}\[\]:;\"<>'`#,./~\\+=-]{8,128}$/) == null) {
		return false;
	}
	
	return true;
}

function fetchDisplayLanguages() {	
	var displayLanguagesStr = document.getElementById("display-languages").innerHTML;
	var displayLanguages = displayLanguagesStr.split(', ');
		
	for (var i = 0; i < displayLanguages.length; i++) {
		$('#lang-selection > [value = ' + displayLanguages[i] + ']').prop('selected', true);
	}
}


function editUsername(newName) {
	$('#hello').text("Hello, " + newName.split(' ')[0] + "!");
	$('#side-bar-name').text(newName);
	$('#username').text(newName);
	$('#edit-username').modal('toggle');
}

function editEmail(newEmail) {
	$('#email').text(newEmail);
	$('#edit-email').modal('toggle');
}

function editPassword() {
	$('#edit-password').modal('toggle');
}

function editDisplayLanguages() {
	var lang = Array.from(document.getElementById("lang-selection").options).filter(option => option.selected).map(option => option.value);
	
	var cleanLang = "";
	for (var i = 0; i < lang.length; i++) {
		cleanLang += lang[i];
		
		if (lang.length != 1) {
			if (i != lang.length - 1) {
				cleanLang += ", ";
			}
		}
	}
				
	document.getElementById("display-languages").innerHTML = cleanLang;
	lang.value = "";
	$('#edit-lang').modal('toggle');
}


function deleteAccount() {
	var password = document.getElementById("password-for-del");
	
	if (password.checkValidity()) {
		location.href = "/";
	}
}

function reportUser() {
	document.getElementById("report-status").innerHTML = "Report sent to admin";
	document.getElementById("report-status").style.pointerEvents = "none";
	document.getElementById("report-icon").style.display = "none";
	
	$('#report-user').modal('toggle');
}

$(document).ready(function() {
    $('#history-quizzes').DataTable( {
        "order": [[0, "desc"]],
		"lengthMenu": [5, 10, 15, 20]
    } );
});

var loadFile = function(event) {
	var image = document.getElementById('profile-picture');
	image.src = URL.createObjectURL(event.target.files[0]);
	
	var image2 = document.getElementById('side-bar-avatar');
	image2.src = URL.createObjectURL(event.target.files[0]);
};