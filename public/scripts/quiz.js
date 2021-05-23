$(document).ready(function() {
	$('.edit-form').on('submit', function(e) {
		var idNumForm = $(this).attr('id');
		idNumForm = idNumForm.replace("edit-form-", "");

		var commentNum = $('#commentNumEdit-' + idNumForm).val();
		var editedComment = $('#edited-comment-' + idNumForm).val().trim();
		
		e.preventDefault();
		
		if (editedComment != "") {
			$.ajax({
				url: '/editQuizItemComment',
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
			url: '/deleteQuizItemComment',
			method: 'POST',
			data: $('#delete-form-' + idNumForm).serialize(),
			success: function(data) {
				deleteComment(commentNum);
			}
		});
	});

	$('#add-comment-form').on('submit', function(e) {
		e.preventDefault();
				
		$.ajax({
			url: '/addQuizItemComment',
			method: 'POST',
			data: $('#add-comment-form').serialize(),
			success: function(data) {
				var dateAdded = new Date();
				addComment(dateAdded);
			}
		});
	});
	
	$('#formStatsHidden').on('submit', function(e) {
		e.preventDefault();
		
		$.ajax({
			url: '/showSummary',
			method: 'POST',
			data: $('#formStatsHidden').serialize(),
			success: function(data) {
				quizNum = $('#idNumHidden').val();
				window.location.href = '/quizSummary/' + quizNum;
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

window.onbeforeunload = function() {
	if (document.getElementById("next-frame").innerHTML != "View Score"){
		return true;
	}
};	

var totalItems;

var quizId;
var currentNum = 1;
var currentFrame = 1;

var currentAns = "";

var button_labels = ["Final Answer", "Next Question"];
var choices = ["choice-a", "choice-b", "choice-c", "choice-d", "choice-c"];
var choices_arr = [];

var questions = [];
var choices_a = [];
var choices_b = [];
var choices_c = [];
var choices_d = [];

var answers = [];
var explanations = [];

var correctly_answered = [];
var incorrectly_answered = [];

var newCommentId;

function resetSessionStorage() {
	window.sessionStorage.clear();	
	
	window.sessionStorage.setItem("correctly_answered", "[]");
	window.sessionStorage.setItem("incorrectly_answered", "[]");
}

function htmlDecode(input){
	var e = document.createElement('textarea');
	e.innerHTML = input;

	return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
}

function getNextFrame(published) {
	currentFrame++;

	if (document.getElementById("next-frame").innerHTML == "View Score") {
		var correct = JSON.parse(window.sessionStorage.getItem("correctly_answered"));
		var incorrect = JSON.parse(window.sessionStorage.getItem("incorrectly_answered"));

		var totalScore = correct.length;
		var accuracy = correct.length / totalItems * 100;
		
		$('#idNumHidden').val(quizId);
		$('#totalScoreHidden').val(totalScore);
		$('#accuracyHidden').val(accuracy);
		
		$('#formStatsHidden').submit();
		
		// location.href = "/quizSummary" + "/" + quizId;
		
	} else {		
		if (currentFrame % 2 == 0) {
			
			if (currentFrame == totalItems * 2) {
				document.getElementById("next-frame").innerHTML = "View Score";
				
				if (newCommentId) {
					document.getElementById("comments-section").innerHTML = '<div class = "col-sm-12 text-left"><h3 id = "comments-section"> <a class = "edit pointable" data-toggle = "modal" data-target = "#add-comment" onclick = "fetchCurrQuestion()"><span class = "glyphicon glyphicon-plus"> </span></a> &nbsp; <a class = "edit pointable" data-toggle = "modal" data-target = "#add-comment" onclick = "fetchCurrQuestion()">Add a comment</a> </h3></div>';
					
					document.getElementById("add-comment-space-" + newCommentId).style.display = "none";
					
					document.getElementById("add-comment-space-" + newCommentId).id = "add-comment-space";
					document.getElementById("add-comment-date-" + newCommentId).id = "add-comment-date";
					
					// REALLY DIFFERENT
					document.getElementById("comment-" + newCommentId).id = "add-comment-body";
					
					
					document.getElementById("edit-comment-" + newCommentId).id = "edit-comment";
					document.getElementById("edited-comment-" + newCommentId).id = "edited-comment";
					document.getElementById("edit-form-" + newCommentId).id = "edit-form";
					document.getElementById("commentNumEdit-" + newCommentId).id = "commentNumEdit";
					
					document.getElementById("delete-comment-" + newCommentId).id = "delete-comment";
					document.getElementById("delete-form-" + newCommentId).id = "delete-form";
					document.getElementById("idNumDelete-" + newCommentId).id = "idNumDelete";
					document.getElementById("commentNumDelete-" + newCommentId).id = "commentNumDelete";
					document.getElementById("confirm-delete-comment-" + newCommentId).id = "confirm-delete-comment";
					
					// Reset to nothing
					newCommentId = null;
				}
				
			} else {
				document.getElementById("next-frame").innerHTML = "Next Question";
				
				// Reset the add comment section
				if (newCommentId) {
					document.getElementById("comments-section").innerHTML = '<div class = "col-sm-12 text-left"><h3 id = "comments-section"> <a class = "edit pointable" data-toggle = "modal" data-target = "#add-comment" onclick = "fetchCurrQuestion()"><span class = "glyphicon glyphicon-plus"> </span></a> &nbsp; <a class = "edit pointable" data-toggle = "modal" data-target = "#add-comment" onclick = "fetchCurrQuestion()">Add a comment</a> </h3></div>';
					
					document.getElementById("add-comment-space-" + newCommentId).style.display = "none";
					
					document.getElementById("add-comment-space-" + newCommentId).id = "add-comment-space";
					document.getElementById("add-comment-date-" + newCommentId).id = "add-comment-date";
					
					// REALLY DIFFERENT
					document.getElementById("comment-" + newCommentId).id = "add-comment-body";
					
					
					document.getElementById("edit-comment-" + newCommentId).id = "edit-comment";
					document.getElementById("edited-comment-" + newCommentId).id = "edited-comment";
					document.getElementById("edit-form-" + newCommentId).id = "edit-form";
					document.getElementById("commentNumEdit-" + newCommentId).id = "commentNumEdit";
					
					document.getElementById("delete-comment-" + newCommentId).id = "delete-comment";
					document.getElementById("delete-form-" + newCommentId).id = "delete-form";
					document.getElementById("idNumDelete-" + newCommentId).id = "idNumDelete";
					document.getElementById("commentNumDelete-" + newCommentId).id = "commentNumDelete";
					document.getElementById("confirm-delete-comment-" + newCommentId).id = "confirm-delete-comment";
					
					// Reset to nothing
					newCommentId = null;
				}
			}
			
			disableChoices(true);
			checkAnswers();
		
			document.getElementById("explanation").style.display = "block";
			document.getElementById("explanation").style.paddingTop = "30px";
						
			if (published) {
				document.getElementById("comments").style.display = "block";
				
				// Get number of characters in quiz number
				strQuizId = String(quizId);
				var numCharacters = strQuizId.length;
				
				// Ignore the type of comment
				
				// Next three characters correspond to the comment
				
				// Iterate through all comment-space
				var comments = document.querySelectorAll(".comment-space");
								
				for (var i = 0; i < comments.length; i++) {
					var id = comments[i].id;
					id = id.replace("new-comment-space-", "");
					
					questionNumComment = id.substring(numCharacters + 1, numCharacters + 4);
					
					if (parseInt(questionNumComment) != currentNum) {
						comments[i].style.display = "none";
					} else {
						comments[i].style.display = "block";
					}
				}	
			}
			
			currentNum++;

			
		} else {
			document.getElementById("next-frame").innerHTML = "Final Answer";
			supplyContents(currentFrame % 2, quizId, totalItems, questions, choices_a, choices_b, choices_c, choices_d, answers, explanations, images, audios);
		
			document.getElementById("explanation").style.display = "none";
			document.getElementById("comments").style.display = "none";
		}
	}
}

function supplyContents(currentFrame, idNum, numItems, questionBodiesFin, choicesAFin, choicesBFin, choicesCFin, choicesDFin, correctAnswersFin, explanationsFin, imagesFin, audiosFin) {
	quizId = idNum;
	totalItems = numItems,
	
	questions = questionBodiesFin;
	choices_a = choicesAFin;
	choices_b = choicesBFin;
	choices_c = choicesCFin;
	choices_d = choicesDFin;
	
	choices_arr = [choices_a, choices_b, choices_c, choices_d];

	answers = correctAnswersFin;
	explanations = explanationsFin;
	
	images = imagesFin;
	audios = audiosFin;
		
	document.getElementById("question-num").innerHTML = currentNum;
	document.getElementById("question-body").innerHTML = htmlDecode(questions[currentNum - 1]);
	
	if (images[currentNum - 1] != "") {
		document.getElementById("image-body").innerHTML = "<br><img src = \"" + images[currentNum - 1] + "\" width = 200 class = \"quiz-img\">";
	} else {
		document.getElementById("image-body").innerHTML = "";
	}
	
	if (audios[currentNum - 1] != "") {
		document.getElementById("audio-body").innerHTML = "<br><audio controls><source src = \"" + audios[currentNum - 1] + "\" type = \"audio/mpeg\" class = \"quiz-img\"></audio>";
	} else {
		document.getElementById("audio-body").innerHTML = "";
	}
	
	document.getElementById("choice-a").innerHTML = choices_a[currentNum - 1];
	document.getElementById("choice-b").innerHTML = choices_b[currentNum - 1];
	document.getElementById("choice-c").innerHTML = choices_c[currentNum - 1];
	document.getElementById("choice-d").innerHTML = choices_d[currentNum - 1];
	
	document.getElementById("explanation").innerHTML = htmlDecode(explanations[currentNum - 1]);
	document.getElementById("next-frame").innerHTML = button_labels[currentFrame - 1];
	
	document.getElementById("next-frame").disabled = true;
	
	disableChoices(false);
	
	for (i = 0; i < choices.length; i++) {
		document.getElementById(choices[i]).style.backgroundColor = "var(--impt-btn-color)";
		document.getElementById(choices[i]).style.fontWeight = "normal";
		document.getElementById(choices[i]).style.color = "initial";
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

function fetchCurrQuestion() {
	document.getElementById("idNum").value = quizId;
	document.getElementById("currentItem").value = currentNum - 1;
}

function editComment(idNum, dateUpdated) {
	if (document.getElementById("edited-comment-"  + idNum).value) {
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

function chooseBtn(caller) {
	var id = caller.id;
	var glyph = document.createElement("span");
	
	var choices_arr_index = getChoicesArrIndex(id);
	
	currentAns = id;
	
	document.getElementById("next-frame").disabled = false;
	document.getElementById(id).style.backgroundColor = "var(--hover-impt-btn-color)";
	document.getElementById(id).style.fontWeight = "bold";
	document.getElementById(id).innerHTML = "<span class = 'glyphicon glyphicon-hand-right'></span>&nbsp;&nbsp;"
											+ choices_arr[choices_arr_index][currentNum - 1];
	
	var i;
	for (i = 0; i < choices.length; i++) {
		if (choices[i] != id) {
			
			if (choices_arr[i]) {
				document.getElementById(choices[i]).innerHTML = choices_arr[i][currentNum - 1];
			}
			
			document.getElementById(choices[i]).style.fontWeight = "normal";
			document.getElementById(choices[i]).style.backgroundColor = "var(--impt-btn-color)";
		}
	}
}

function getChoicesArrIndex(id) {
	var choices_arr_index;

	if (id == "choice-a") {
		choices_arr_index = 0;
	} else if (id == "choice-b") {
		choices_arr_index = 1;
	} else if (id == "choice-c") {
		choices_arr_index = 2;
	} else if (id == "choice-d") {
		choices_arr_index = 3;
	} 
	
	return choices_arr_index;
}

function addComment(dateAdded) {	
	if (document.getElementById("addedComment").value != "") {
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
			
			questionNumComment = id.substring(numCharacters + 1, numCharacters + 4);
			commentNumber = id.substring(numCharacters + 4);
						
			if (parseInt(questionNumComment) == currentNum - 1) {
				maxId = Math.max(maxId, parseInt(commentNumber));
			} 
		}

		maxId++;
		
		strQuizItem = "";
		if (currentNum - 1 < 100) {
			strQuizItem = "0" + String(currentNum - 1);
			
			if (currentNum - 1 < 10) {
				strQuizItem = "0" + strQuizItem;
			}
		}
		
		strCommentNumber = "";
		if (maxId < 100)  {
			strCommentNumber = "0" + String(maxId);
			
			if (maxId < 10) {
				strCommentNumber = "0" + strCommentNumber;
			}
		}
		
		newCommentId = strQuizId + "2" + strQuizItem + strCommentNumber;
				
		document.getElementById("add-comment-body").innerHTML = document.getElementById("addedComment").value;
		document.getElementById("addedComment").value = "";
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

function deleteComment(idNum) {
	
	if (document.getElementById("new-comment-space-" + idNum)) {
		document.getElementById("new-comment-space-" + idNum).style.display = "none";
	} else {
		document.getElementById("add-comment-space-" + idNum).style.display = "none";
	}
	
	document.getElementById("comments-section").innerHTML = '<div class = "col-sm-12 text-left"><h3 id = "comments-section"> <a class = "edit pointable" data-toggle = "modal" data-target = "#add-comment" onclick = "fetchCurrQuestion()"><span class = "glyphicon glyphicon-plus"> </span></a> &nbsp; <a class = "edit pointable" data-toggle = "modal" data-target = "#add-comment" onclick = "fetchCurrQuestion()">Add a comment</a> </h3></div>';
	
	$('#delete-comment-' + idNum).modal('toggle');
}

function disableChoices(status) {
	var i;
	for (i = 0; i < choices.length; i++) {
		document.getElementById(choices[i]).disabled = status;
	}
}

function checkAnswers() {	
	var choices_arr_index = getChoicesArrIndex(currentAns);			

	if (currentAns == answers[currentNum - 1]) {
		document.getElementById(currentAns).style.backgroundColor = "var(--header-color)";
		document.getElementById(currentAns).style.borderColor = "var(--header-color)";
		document.getElementById(currentAns).style.color = "white";
		document.getElementById(currentAns).innerHTML = "<span class = 'glyphicon glyphicon-ok'></span>&nbsp;&nbsp;"
														+ choices_arr[choices_arr_index][currentNum - 1];
														
		correctly_answered.push(currentNum - 1);
		window.sessionStorage.setItem("correctly_answered", JSON.stringify(correctly_answered));
		
	} else {
		document.getElementById(answers[currentNum - 1]).style.backgroundColor = "var(--header-color)";
		document.getElementById(answers[currentNum - 1]).style.borderColor = "var(--header-color)";
		document.getElementById(answers[currentNum - 1]).style.color = "white";
		document.getElementById(currentAns).innerHTML = "<span class = 'glyphicon glyphicon-remove'></span>&nbsp;&nbsp;"
														+ choices_arr[choices_arr_index][currentNum - 1];
														
		incorrectly_answered.push(currentNum - 1);
		window.sessionStorage.setItem("incorrectly_answered", JSON.stringify(incorrectly_answered));
	}
}

