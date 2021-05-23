$(document).ready(function () {
	$('#history-quizzes').DataTable( {
		"lengthMenu": [5, 10, 15, 20]
	} );
	
	$('#delete-all-quizzes-form').on('submit', function(e) {
		e.preventDefault();
		
		$.ajax({
			url: '/deleteAllQuizzes',
			method: 'POST',
			data: $('#delete-all-quizzes-form').serialize(),
			statusCode: {
				200: function(data) {
					$('#incorrect-password-delete-all').css("display", "none");
					
					// Remove tbody
					$('#history-quizzes-body').remove();
					newTBody = document.createElement("tbody");
					document.getElementById("history-quizzes").append(newTBody);
					
					$('#password-for-delete').val("");
					$('#delete-all-quizzes').modal('toggle');
				},
				
				403: function() {
					$('#incorrect-password-delete-all').css("display", "inline");
					$('#password-for-delete').val("");
				}
			}
		});
	});
	
	$('#unpublish-all-quizzes-form').on('submit', function(e) {
		e.preventDefault();
		
		$.ajax({
			url: '/unpublishAllQuizzes',
			method: 'POST',
			data: $('#unpublish-all-quizzes-form').serialize(),
			statusCode: {
				200: function(data) {
					$('#incorrect-password-unpublish-all').css("display", "none");
					
					var statuses = document.getElementsByClassName("status-pub");
					
					for (var i = 0; i < statuses.length; i++) {
						if (statuses[i].innerHTML.trim() == "Published") {
							statuses[i].innerHTML = "Unpublished";
						}
					}
					
					$('#password-for-unpublish').val("");
					$('#unpublish-all-quizzes').modal('toggle');
				},
				
				403: function() {
					$('#incorrect-password-unpublish-all').css("display", "inline");
					$('#password-for-unpublish').val("");
				}
			}
		});
	});
});

function deleteAllQuizzes() {
	var password = document.getElementById("password-for-delete");
	
	if (password.checkValidity()) {
		$('#history-quizzes-body').empty();
		
		password.value = "";
		$('#delete-all-quizzes').modal('toggle');
	}
}

function unpublishAllQuizzes() {			
	var statuses = document.getElementsByClassName("status-pub");
	var password = document.getElementById("password-for-unpublish");
	
	if (password.checkValidity()) {
		var i;
		for (i = 0; i < statuses.length; i++) {
			statuses[i].innerHTML = "Unpublished";
		}
		
		password.value = "";
		$('#unpublish-all-quizzes').modal('toggle');
	}
}