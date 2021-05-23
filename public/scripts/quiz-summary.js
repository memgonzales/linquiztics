var correct = JSON.parse(window.sessionStorage.getItem("correctly_answered"));
var incorrect = JSON.parse(window.sessionStorage.getItem("incorrectly_answered"));

var numItems = correct.length + incorrect.length;
var totalScore = correct.length;
var accuracy = correct.length / numItems * 100;

var quizId;
var newCommentId;

$(document).ready(function() {
	$('#add-comment-form').on('submit', function(e) {				
		e.preventDefault();
				
		$.ajax({
			url: '/addComment',
			method: 'POST',
			data: $('#add-comment-form').serialize(),
			success: function(data) {
				var dateAdded = new Date();
				addComment(dateAdded);
			}
		});
	});
	
	$('.edit-form').on('submit', function(e) {
		var idNumForm = $(this).attr('id');
		idNumForm = idNumForm.replace("edit-form-", "");
		
		var commentNum = $('#commentNumEdit-' + idNumForm).val();
		var editedComment = $('#edited-comment-' + idNumForm).val().trim();
		
		e.preventDefault();
		
		if (editedComment != "") {
			$.ajax({
				url: '/editComment',
				method: 'POST',
				data: $('#edit-form-' + idNumForm).serialize(),
				success: function(data) {
					var dateUpdated = new Date();
					editComment(commentNum, dateUpdated);
				}
			});
			
		} else {
			$('#edit-comment-' + idNumForm).modal('toggle');
		}
	});
	
	$('.delete-form').on('submit', function(e) {
		var idNumForm = $(this).attr('id');
		idNumForm = idNumForm.replace("delete-form-", "");
		
		var idNum = $('#idNumDelete-' + idNumForm).val();
		var commentNum = $('#commentNumDelete-' + idNumForm).val();
				
		e.preventDefault();
				
		$.ajax({
			url: '/deleteComment',
			method: 'POST',
			data: $('#delete-form-' + idNumForm).serialize(),
			success: function(data) {
				deleteComment(commentNum);
			}
		});
	});

	$('#show-summary-form').on('submit', function(e) {				
		e.preventDefault();
				
		$.ajax({
			url: '/showSummary',
			method: 'POST',
			data: $('#show-summary-form').serialize(),
			success: function(data) {
			//	addComment();
			}
		});
	});

	$('#rating-form').on('submit', function(e) {
		e.preventDefault();  

		$.ajax({
			url: '/addRating',
			method: 'POST',
			data: $('#rating-form').serialize(),
			success: function(data) {
			
			}
		});
	});

	$('#remove-rating-form').on('submit', function(e) {
		e.preventDefault();  

		$.ajax({
			url: '/deleteRating',
			method: 'POST',
			data: $('#remove-rating-form').serialize(),
			success: function(data) {
			
			}
		});
	});

	$('#report-quiz-form').on('submit', function(e) {
		e.preventDefault();  

		$.ajax({
			url: '/reportQuiz',
			method: 'POST',
			data: $('#report-quiz-form').serialize(),
			success: function(data) {
				reportQuiz();
			}
		});
	});

	$('.report-comment-form').on('submit', function(e) {
		var idNumForm = $(this).attr('id');
		idNumForm = idNumForm.replace("report-comment-form-", "");
						
		e.preventDefault();
				
		$.ajax({
			url: '/reportComment',
			method: 'POST',
			data: $('#report-comment-form-' + idNumForm).serialize(),
			success: function(data) {				
				reportComment(idNumForm);
			}
		});
	});
});

function changeLinkToView() {
	links = document.getElementsByClassName("answer-media");
	
	for (var i = 0; i < links.length; i++) {
		if (links[i].innerHTML) {
			links[i].innerHTML = 'View media'
			links[i].innerHTML += '<span class = "glyphicon glyphicon-new-window smallest-icon" style = "display: inline-block; padding-left: 5px;"></span>';
		}
	}
}

function generateReport(idNum, choicesAFin, choicesBFin, choicesCFin, choicesDFin) {
	quizId = idNum;
	
	document.getElementById("total-score").innerHTML = totalScore + "/" + numItems;
	document.getElementById("accuracy").innerHTML = accuracy.toFixed(2) + "%";
	
	var correctAnswers = document.querySelectorAll(".right-correct");
	for (var i = 0; i < correctAnswers.length; i++) {
		var choice = correctAnswers[i].innerHTML.trim();
				
		switch(choice) {
			case "choice-a":
				correctAnswers[i].innerHTML = choicesAFin[i];
				break;
			case "choice-b":
				correctAnswers[i].innerHTML = choicesBFin[i];
				break;
			case "choice-c":
				correctAnswers[i].innerHTML = choicesCFin[i];
				break;
			case "choice-d":
				correctAnswers[i].innerHTML = choicesDFin[i];
				break;
		}
	}
	
	var incorrectAnswers = document.querySelectorAll(".wrong-correct");
	for (var i = 0; i < incorrectAnswers.length; i++) {
		var choice = incorrectAnswers[i].innerHTML.trim();
				
		switch(choice) {
			case "choice-a":
				incorrectAnswers[i].innerHTML = choicesAFin[i];
				break;
			case "choice-b":
				incorrectAnswers[i].innerHTML = choicesBFin[i];
				break;
			case "choice-c":
				incorrectAnswers[i].innerHTML = choicesCFin[i];
				break;
			case "choice-d":
				incorrectAnswers[i].innerHTML = choicesDFin[i];
				break;
		}
	}
	
	// Hide pertinent questions
	for (var i = 0; i < incorrect.length; i++) {
		document.getElementById("right-row-" + incorrect[i]).style.display = "none";
	}
	
	for (var i = 0; i < correct.length; i++) {
		document.getElementById("wrong-row-" + correct[i]).style.display = "none";
	}
}

function fetchComment(idNum) {
	document.getElementById("edited-comment-" + idNum).value = document.getElementById("comment-" + idNum).innerHTML.trim();
}

function fetchCommentData(idNum) {
	document.getElementById("reportCommentnum-" + idNum).value = idNum;
	document.getElementById("reportAuthor-" + idNum).value = document.getElementById("report-author-" + idNum).innerHTML.trim();
	document.getElementById("reportCommentbody-" + idNum).value = document.getElementById("report-body-" + idNum).innerHTML.trim();
}

function addComment(dateAdded) {
	if (document.getElementById("added-comment").value != "") {
		document.getElementById("add-comment-space").style.display = "block";
				
		// Get the next number after highest ID
		strQuizId = String(quizId);
		var numCharacters = strQuizId.length;
		var maxId = 0;
		
		
		// Ignore the type of comment
		
		// Next three characters correspond to the quiz item
		
		// Iterate through all comment-space
		var comments = document.querySelectorAll(".comment-space");
		
		for (var i = 0; i < comments.length; i++) {
			var id = comments[i].id;
			id = id.replace("new-comment-space-", "");
			
			commentNumber = id.substring(numCharacters + 1);
			maxId = Math.max(maxId, parseInt(commentNumber));
		}

		maxId++;
				
		strCommentNumber = "";
		if (maxId < 100)  {
			strCommentNumber = "0" + String(maxId);
			
			if (maxId < 10) {
				strCommentNumber = "0" + strCommentNumber;
			}
		}
		
		newCommentId = strQuizId + "1" + strCommentNumber;
						
		document.getElementById("add-comment-body").innerHTML = document.getElementById("added-comment").value;
		document.getElementById("added-comment").value = "";
		document.getElementById("comments-section").innerHTML = "Comment added";
		
		
		// Replace the ID numbers to incorporate id from database
		document.getElementById("add-comment-space").id = "add-comment-space-" + newCommentId;
		document.getElementById("add-comment-date").id = "add-comment-date-" + newCommentId;		
		
		// REALLY DIFFERENT
		document.getElementById("add-comment-body").id = "comment-" + newCommentId;	
		
		
		// Tweak the modals
		document.getElementById("edit-comment").id = "edit-comment-" + newCommentId;
		document.getElementById("edited-comment").id = "edited-comment-" + newCommentId;
		document.getElementById("edit-form").id = "edit-form-" + newCommentId;
		document.getElementById("commentNumEdit").id = "commentNumEdit-" + newCommentId;
		document.getElementById("commentNumEdit-" + newCommentId).value = newCommentId;
		document.getElementById("idNumEdit").value = quizId;
		
		
		document.getElementById("delete-comment").id = "delete-comment-" + newCommentId;
		document.getElementById("delete-form").id = "delete-form-" + newCommentId;
		document.getElementById("idNumDelete").id = "idNumDelete-" + newCommentId;
		document.getElementById("idNumDelete-" + newCommentId).value = quizId;
		document.getElementById("commentNumDelete").id = "commentNumDelete-" + newCommentId;
		document.getElementById("commentNumDelete-" + newCommentId).value = newCommentId;
		document.getElementById("confirm-delete-comment").id = "confirm-delete-comment-" + newCommentId;
		
		
		// Enable modals
		document.getElementById("add-comment-edit-text").dataset.target = "#edit-comment-" + newCommentId;
		document.getElementById("add-comment-edit-text").onclick = function() {
			fetchComment(newCommentId);
		};
		
		document.getElementById("add-comment-edit-icon").dataset.target = "#edit-comment-" + newCommentId;
		document.getElementById("add-comment-edit-icon").onclick = function() {
			fetchComment(newCommentId);
		};

		document.getElementById("add-comment-delete-text").dataset.target = "#delete-comment-" + newCommentId;
		
		document.getElementById("add-comment-delete-icon").dataset.target = "#delete-comment-" + newCommentId;
		
		// Add date
		var formattedDate = dateAdded.getMonth() + 1 + "-" + dateAdded.getDate() + "-" + dateAdded.getFullYear();
		document.getElementById("add-comment-date-" + newCommentId).innerHTML = formattedDate;
	}
	
	$('#add-comment').modal('toggle');
}

function editComment(idNum, dateUpdated) {
	if (document.getElementById("edited-comment-" + idNum).value) {
		document.getElementById("comment-" + idNum).innerHTML = document.getElementById("edited-comment-" + idNum).value;
		
		var formattedDate = dateUpdated.getMonth() + 1 + "-" + dateUpdated.getDate() + "-" + dateUpdated.getFullYear();
		
		if (document.getElementById("comment-date-" + idNum)) {
			document.getElementById("comment-date-" + idNum).innerHTML = formattedDate;
		} else {
			document.getElementById("add-comment-date-" + idNum).innerHTML = formattedDate;
		}
	}
	
	$('#edit-comment-' + idNum).modal('toggle');
}


function reportComment(idNum) {
	document.getElementById("report-status-" + idNum).innerHTML = "Report sent to admin";
	document.getElementById("report-status-" + idNum).style.pointerEvents = "none";
	document.getElementById("report-icon-" + idNum).style.display = "none";
	
	$('#report-comment-' + idNum).modal('toggle');
}

function deleteComment(idNum) {
	
	if (document.getElementById("new-comment-space-" + idNum)) {
		document.getElementById("new-comment-space-" + idNum).style.display = "none";
	} else {
		document.getElementById("add-comment-space-" + idNum).style.display = "none";
	}
	
	document.getElementById("comments-section").innerHTML = '<div class = "col-sm-12 text-left"><h3 id = "comments-section"> <a class = "edit pointable" data-toggle = "modal" data-target = "#add-comment"><span class = "glyphicon glyphicon-plus"> </span></a> &nbsp; <a class = "edit pointable" data-toggle = "modal" data-target = "#add-comment">Add a comment</a> </h3></div>';
	
	$('#delete-comment-' + idNum).modal('toggle');
}

function showIncorrect() {
	if (clickCtr1 % 2 == 0) {
		document.getElementById("incorrect-answers").style.display = "block";
	} else {
		document.getElementById("incorrect-answers").style.display = "none";
	}
	
	clickCtr1++;
}

function showCorrect() {
	if (clickCtr2 % 2 == 0) {
		document.getElementById("correct-answers").style.display = "block";
	} else {
		document.getElementById("correct-answers").style.display = "none";
	}
	
	clickCtr2++;
}

function rate(caller) {
	var id = caller.id;
	var num = id.substr(id.length - 1);
	
	var i;
	
	if (allowed) {
		for (i = num; i >= 1; i--) {
			document.getElementById("star" + i).style.color = "orange";
		}
		
		for (i = parseInt(num) + 1; i <= 5; i++) {
			document.getElementById("star" + i).style.color = "black";
		}		
	}				
}

function removeRate() {
	var i;
	
	if (allowed) {
		for (i = 1; i <= 5; i++) {
			document.getElementById("star" + i).style.color = "black";
		}	
	}
}

function lockRate(caller) {
	var id = caller.id;
	var num = id.substr(id.length - 1);
	
	allowed = false;
	
	var i;
	for (i = num; i >= 1; i--) {
		document.getElementById("star" + i).style.color = "orange";
		document.getElementById("star" + i).style.pointerEvents = "none";
	}
	
	for (i = parseInt(num) + 1; i <= 5; i++) {
		document.getElementById("star" + i).style.color = "black";
		document.getElementById("star" + i).style.pointerEvents = "none";
	}		
	
	document.getElementById("title-rating").innerHTML = '<span class = "glyphicon glyphicon-pencil pointable" onclick = "unlock()"> </span>&nbsp; <a class = "edit pointable" onclick = "unlock()">Edit Rating</a>';

	if (parseInt(num) == 1)
		document.getElementById("desc-rating").innerHTML = num + " star! &nbsp; &nbsp; &nbsp; &nbsp;" 
														+ '<a class = "edit pointable" onclick = "deleteRating()">Delete Rating</a> &nbsp; <span class = "glyphicon glyphicon-trash pointable" onclick = "deleteRating()"> </span>';
	else													
		document.getElementById("desc-rating").innerHTML = num + " stars! &nbsp; &nbsp; &nbsp; &nbsp;" 
														+ '<a class = "edit pointable" onclick = "deleteRating()">Delete Rating</a> &nbsp; <span class = "glyphicon glyphicon-trash pointable" onclick = "deleteRating()"> </span>';

	document.getElementById("rating").value = num;
	$('#rating-form').submit();													
}

function unlock() {
	allowed = true;
	
	document.getElementById("title-rating").innerHTML = "Choose new rating";
	document.getElementById("desc-rating").innerHTML = "";
	
	var i;
	for (i = 1; i <= 5; i++) {
		document.getElementById("star" + i).style.pointerEvents = "initial";
	}

	$('#remove-rating-form').submit();
}

function deleteRating() {
	unlock();
	
	document.getElementById("title-rating").innerHTML = "Rate the quiz";
	document.getElementById("desc-rating").innerHTML = "";
}

function reportQuiz() {
	document.getElementById("report-quiz-status").innerHTML = "Report sent to admin";
	document.getElementById("report-quiz-status").style.pointerEvents = "none";
	
	$('#report-quiz').modal('toggle');
}
			