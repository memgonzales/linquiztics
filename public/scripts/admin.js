$(document).ready(function() {
    $('#all-user-accounts').DataTable( {
        "order": [[0, "desc"]],
		"lengthMenu": [5, 10, 15, 20]
    } );
	
	$('#all-user-quizzes').DataTable( {
        "order": [[0, "desc"]],
		"lengthMenu": [5, 10, 15, 20]
    } );
	
	$('#all-user-comments').DataTable( {
        "order": [[0, "desc"]],
		"lengthMenu": [5, 10, 15, 20]
    } );

    $('#delete-user-form').on('submit', function(e) {
		e.preventDefault();
		
		$.ajax({
			url: '/deleteUserAdmin',
			method: 'POST',
			data: $('#delete-user-form').serialize(),
			success: function() {
				deleteUserAccount();
			}
		});
	});

	$('#unpublish-quiz-form').on('submit', function(e) {
		e.preventDefault();
		
		$.ajax({
			url: '/unpublishQuizAdmin',
			method: 'POST',
			data: $('#unpublish-quiz-form').serialize(),
			success: function() {
				unpublishUserQuiz();
			}
		});
	});

	$('#delete-comment-form').on('submit', function(e) {
		e.preventDefault();
		
		$.ajax({
			url: '/deleteCommentAdmin',
			method: 'POST',
			data: $('#delete-comment-form').serialize(),
			success: function() {
				deleteUserComment();
			}
		});
	});
});

function fetchUserReport(index) {
	var username = document.getElementById("userUsername-" + index).innerHTML;

	document.getElementById("deleteUsername").value = username;
	document.getElementById("deleteUserindex").value = index;
}

function fetchQuizReport(index) {
	var quizNum = document.getElementById("quizQuizNum-" + index).value;

	document.getElementById("deleteQuiznum").value = quizNum;
	document.getElementById("deleteQuizindex").value = index;
}

function fetchCommentReport(index) {
	var commentNum = document.getElementById("commentCommentNum-" + index).value;
	var quizNum = document.getElementById("commentQuizNum-" + index).value;

	document.getElementById("deleteCommentnum").value = commentNum;
	document.getElementById("deleteCommentquiznum").value = quizNum;
	document.getElementById("deleteCommentindex").value = index;
}

function deleteUserAccount() {
	var id = document.getElementById("deleteUserindex");
	var idTbl = "user-" + id.value;
	
	document.getElementById(idTbl).style.display = "none";
	id.value = "";
	
	$('#delete-user-account').modal('toggle');
}

function unpublishUserQuiz() {
	var id = document.getElementById("deleteQuizindex");
	var idTbl = "quiz-" + id.value;
		
	document.getElementById(idTbl).style.display = "none";
	id.value = "";
	
	$('#unpublish-user-quiz').modal('toggle');
}

function deleteUserComment() {
	var id = document.getElementById("deleteCommentindex");
	var idTbl = "comment-" + id.value;
	
	document.getElementById(idTbl).style.display = "none";
	id.value = "";
	
	$('#delete-user-comment').modal('toggle');
}