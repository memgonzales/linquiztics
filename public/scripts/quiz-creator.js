$(document).ready(function() {
	var highestIndex;
	var imageURL;
	var audioURL;
	
	function htmlDecode(input){
		var e = document.createElement('textarea');
		e.innerHTML = input;

		return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
	}
		
	var explanations = document.getElementsByClassName("explanation");
	for (var i = 0; i < explanations.length; i++) {
		var explanation = explanations[i];
		explanation.innerHTML = htmlDecode(explanation.innerHTML);
	}
	
	$('#edit-basic-details-form').on('submit', function(e) {
		e.preventDefault();
		
		$.ajax({
			url: '/editBasicDetails',
			method: 'POST',
			data: $('#edit-basic-details-form').serialize(),
			success: function() {
				editBasicDetails();
			}
		});
	});

	$('#edit-description-form').on('submit', function(e) {
		e.preventDefault();
		
		$.ajax({
			url: '/editDescription',
			method: 'POST',
			data: $('#edit-description-form').serialize(),
			success: function() {
				editDescription();
			}
		});
	});

	$('#publish-quiz-form').on('submit', function(e) {
		e.preventDefault();
		
		$.ajax({
			url: '/publishQuiz',
			method: 'POST',
			data: $('#publish-quiz-form').serialize(),
			success: function() {
				idNum = $('#idNum').val();
				publishQuiz(idNum);
			}
		});
	});

	$('#unpublish-quiz-form').on('submit', function(e) {
		e.preventDefault();
		
		$.ajax({
			url: '/unpublishQuiz',
			method: 'POST',
			data: $('#unpublish-quiz-form').serialize(),
			success: function() {
				unpublishQuiz();
			}
		});
	});

	$('#delete-quiz-form').on('submit', function(e) {
		e.preventDefault();
		
		$.ajax({
			url: '/deleteQuiz',
			method: 'POST',
			data: $('#delete-quiz-form').serialize(),
			success: function() {
				deleteQuiz();
			}
		});
	});

	$('#edit-question-form').on('submit', function(e) {
		e.preventDefault();

		$.ajax({
			url: '/editQuestion',
			method: 'POST',
			data: $('#edit-question-form').serialize(),
			success: function() {
				editQuestion();
			}
		});
	});
	
	$('#image-file-upload').on('change', function(e) {
		imageURL = URL.createObjectURL(e.target.files[0]);
	});
	
	$('#edit-image-form').on('submit', function(e) {
		e.preventDefault();
		
		var fd = new FormData($("#edit-image-form").get(0));  
		
		var image = $('#p-' + $('#imageIndex').val());
		var imgURL = imageURL;
		
		$.ajax({
			url: '/editImage',
			method: 'POST',
			data: fd,
			processData: false,
			contentType: false,
			success: function() {
				image.attr('src', imgURL);
				editImage();
				imageURL = null;
			}
		});
	});
	
	$('#audio-file-upload').on('change', function(e) {
		audioURL = URL.createObjectURL(e.target.files[0]);
	});
	
	$('#edit-audio-form').on('submit', function(e) {
		e.preventDefault();
		
		var fd = new FormData($("#edit-audio-form").get(0));  
		
		var aud = $('#aud-' + $('#audioIndex').val());
		
		var audURL = audioURL;
				
		var sourceAud = $('#aud-src-' + $('#audioIndex').val());
		
		$.ajax({
			url: '/editAudio',
			method: 'POST',
			data: fd,
			processData: false,
			contentType: false,
			success: function() {
				aud.prop("controls", true); 
				sourceAud.attr('src', audURL);
				aud[0].load();
				
				editAudio();
				audioURL = null;
			}
		});
	});

	$('#edit-answer-form').on('submit', function(e) {
		e.preventDefault();

		$.ajax({
			url: '/editAnswer',
			method: 'POST',
			data: $('#edit-answer-form').serialize(),
			success: function() {
				editAnswer();
			}
		});
	});

	$('#delete-quiz-item-form').on('submit', function(e) {
		e.preventDefault();

		$.ajax({
			url: '/deleteQuizItem',
			method: 'POST',
			data: $('#delete-quiz-item-form').serialize(),
			success: function() {
				deleteQuizItem();
			}
		});
	});

	$('#add-question-form').on('submit', function(e) {
		e.preventDefault();

		$.ajax({
			url: '/addQuestion',
			method: 'POST',
			data: $('#add-question-form').serialize(),
			success: function() {
				addQuestion();
			}
		});
	});

	$('#report-comment-form').on('submit', function(e) {
		e.preventDefault();

		$.ajax({
			url: '/reportComment',
			method: 'POST',
			data: $('#report-comment-form').serialize(),
			success: function() {
				var idNum = $('commentNum').val();
				alert(idNum);
				reportComment(idNum);
			}
		});
	});
});

function setVariables(highestIndexDB) {
	highestIndex = highestIndexDB;
}

function countStars(rating) {
	rating = Math.round(rating);
	
	switch(rating) {
		case 5:
			document.getElementById("star-5").classList.add("checked");
		case 4:
			document.getElementById("star-4").classList.add("checked");
		case 3:
			document.getElementById("star-3").classList.add("checked");
		case 2:
			document.getElementById("star-2").classList.add("checked");
		case 1:
			document.getElementById("star-1").classList.add("checked");
	}
}

function reportComment(id_num) {
	var templateOne = "report-status-" + id_num;
	var templateTwo = "report-icon-" + id_num;
	document.getElementById(templateOne).innerHTML = "Report sent to admin";
	document.getElementById(templateOne).style.pointerEvents = "none";
	document.getElementById(templateTwo).style.display = "none";
	
	$('#report-comment').modal('toggle');
}

function fetchDetails() {
	document.getElementById("newTitle").value = document.getElementById("quiz-title").innerHTML.trim();
	document.getElementById("newTags").value = document.getElementById("quiz-tags").innerHTML.trim();
	
	$('#displayLangSelection > [value = ' + $('#display-language').text().trim() + ']').prop('selected', true);
	
	var subjectLanguagesStr = document.getElementById("subject-languages").innerHTML;
	var subjectLanguages = subjectLanguagesStr.split(', ');
		
	for (var i = 0; i < subjectLanguages.length; i++) {
		$('#langSelection > [value = ' + subjectLanguages[i] + ']').prop('selected', true);
	}
}

function fetchDescription() {
	document.getElementById("newDesc").defaultValue = document.getElementById("quiz-desc").innerHTML.trim();
}

function fetchQuestion(caller) {
	var id = caller.id;
	id_num = id.substr(id.length - 2);

	if (id_num.substr(0, 1) == "q")
		id_num = id_num.substr(1);

	var id_question = "question-" + id_num;
	var id_a = "choiceA-" + id_num;
	var id_b = "choiceB-" + id_num;
	var id_c = "choiceC-" + id_num;
	var id_d = "choiceD-" + id_num;
				
	document.getElementById("newQuestion").value = document.getElementById(id_question).innerHTML.trim();
	document.getElementById("questionIndex").value = id_num;
	document.getElementById("choiceA").value = document.getElementById(id_a).innerHTML.trim();
	document.getElementById("choiceB").value = document.getElementById(id_b).innerHTML.trim();
	document.getElementById("choiceC").value = document.getElementById(id_c).innerHTML.trim();
	document.getElementById("choiceD").value = document.getElementById(id_d).innerHTML.trim();
}

function fetchCommentData(caller) {
	var id = caller.id;
	var id_num = id.substr(14);
	
	var id_author = "comment-author-" + id_num; 
	var id_body = "comment-body-" + id_num;
	
	document.getElementById("reportCommentnum").value = id_num;
	document.getElementById("reportAuthor").value = document.getElementById(id_author).innerHTML.trim();
	document.getElementById("reportCommentbody").value = document.getElementById(id_body).innerHTML.trim();
}

function fetchImage(caller) {
	var id = caller.id;
	id_num = id.substr(id.length - 2);

	if (id_num.substr(0, 1) == "x")
		id_num = id_num.substr(1);

	document.getElementById("imageIndex").value = id_num;
}

function fetchAudio(caller) {
	var id = caller.id;
	id_num = id.substr(id.length - 2);

	if (id_num.substr(0, 1) == "y")
		id_num = id_num.substr(1);

	document.getElementById("audioIndex").value = id_num;
}

function fetchAnswer(caller) {
	var id = caller.id;
	id_num = id.substr(id.length - 2);

	if (id_num.substr(0, 1) == "a")
		id_num = id_num.substr(1);
					
	var id_answer = "answer-" + id_num;
	var id_explain = "explanation-" + id_num;

	var letter_answer = document.getElementById(id_answer).innerHTML.trim();
	document.getElementById("answerIndex").value = id_num;
	document.getElementById("correctAnswer").selectedIndex = letter_answer.charCodeAt(0) - 'A'.charCodeAt(0);
	document.getElementById("newExplanation").defaultValue = document.getElementById(id_explain).innerHTML.trim();
}

function fetchDelete(caller) {
	var id = caller.id;
	id_num = id.substr(id.length - 2);

	if (id_num.substr(0, 1) == "q")
		id_num = id_num.substr(1);

	document.getElementById("deleteIndex").value = id_num;
}

function editBasicDetails() {
	$('#quiz-title').text($('#newTitle').val());
	$('#quiz-tags').text($('#newTags').val());
	$('#display-language').text($('#displayLangSelection').val());
	
	var subjectLanguages = $('#langSelection').val();
	
	var cleanSubjectLanguages = "";
	for (var i = 0; i < subjectLanguages.length; i++) {
		cleanSubjectLanguages += subjectLanguages[i];
		
		if (subjectLanguages.length != 1) {
			if (i != subjectLanguages.length - 1) {
				cleanSubjectLanguages += ", ";
			}
		}
	}
	
	$('#subject-languages').text(cleanSubjectLanguages);
	
	$('#edit-basic-details').modal('toggle');
}
	
function editDescription() {
	$('#quiz-desc').text($('#newDesc').val());
	
	$('#edit-description').modal('toggle');
}

function editQuestion() {
	var id_question = "question-" + id_num;
	var id_a = "choiceA-" + id_num;
	var id_b = "choiceB-" + id_num;
	var id_c = "choiceC-" + id_num;
	var id_d = "choiceD-" + id_num;
	
	var question = document.getElementById("newQuestion");
	var choice_a = document.getElementById("choiceA");
	var choice_b = document.getElementById("choiceB");
	var choice_c = document.getElementById("choiceC");
	var choice_d = document.getElementById("choiceD");

	if (question.value && choice_a.checkValidity() && choice_b.checkValidity() && choice_c.checkValidity() && choice_d.checkValidity()) {
		document.getElementById(id_question).innerHTML = question.value;
		document.getElementById(id_a).innerHTML = choice_a.value;
		document.getElementById(id_b).innerHTML = choice_b.value;
		document.getElementById(id_c).innerHTML = choice_c.value;
		document.getElementById(id_d).innerHTML = choice_d.value;
		
		$('#edit-question').modal('toggle');
	}
}

function editImage() {
	$('#edit-image').modal('toggle');
}

function editAudio() {
	$('#edit-audio').modal('toggle');
}

function editAnswer() {				
	var id_answer = "answer-" + id_num;
	var id_explain = "explanation-" + id_num;

	var answer = document.getElementById("correctAnswer");
	var explain = document.getElementById("newExplanation");

	if (answer.checkValidity()) {
		var sanitized_answer = answer.value.substr(answer.value.length - 1).toUpperCase();
		
		document.getElementById(id_answer).innerHTML = sanitized_answer;
		document.getElementById(id_explain).innerHTML = explain.value;
		
		$('#edit-answer').modal('toggle');
	}
}

function deleteQuizItem() {
	var id_div = "container-question-" + id_num;
	document.getElementById(id_div).style.display = "none";

	$('#delete-quiz-item').modal('toggle');
}

function publishQuiz(idNum) {
	location.href = "/quizTeaser/" + idNum;
}

function unpublishQuiz() {
	document.getElementById("unpublished-status").innerHTML = "Quiz has been unpublished";
	
	$('#unpublish-quiz').modal('toggle');
}

function deleteQuiz() {
	location.href = "/myQuizzes";
}

function addQuestion() {

	highestIndex++;

	var newQuestion = "";
	var comments = "";

	comments = '<a class = "edit pointable"><span id = "view-icon-c' + highestIndex + '" class = "glyphicon glyphicon-comment" data-toggle = "modal" data-target = "#view-comments"> </span></a> &nbsp;'
				+ '<a id = "view-c' + highestIndex + '" class = "edit pointable" data-toggle = "modal" data-target = "#view-comments">View Comments </a>';
	
	newQuestion += '<div id = "container-question-' + highestIndex + '" class = "row">'
					+ '<div class = "col-sm-5 block-text">'
					+ '<h2>Question</h2>'
					+ '<p id = "question-' + highestIndex + '"> Give a description of the task. </p>'
					+ '<p id = "photo-' + highestIndex + '">'
					+ '<img id = "p-' + highestIndex + '" class = "quiz-create-img">'
					+ '</p>'
					+ '<p id = "audio-' + highestIndex + '">'
					+ '<audio id = "aud-' + highestIndex + '"><source id = "aud-src-' + highestIndex + '"></audio>'
					+ '</p>'
					
					+ '<ol type = "A">'
					+ '<li id = "choiceA-' + highestIndex + '"> Supply one of the choices. </li>'
					+ '<li id = "choiceB-' + highestIndex + '"> Supply one of the choices. </li>'
					+ '<li id = "choiceC-' + highestIndex + '"> Supply one of the choices. </li>'
					+ '<li id = "choiceD-' + highestIndex + '"> Supply one of the choices. </li>'
					+ '</ol>'
					+ '<p>'
					+ '<span id = "correct-answer-container"> Correct Answer:</span> <span id = "answer-' + highestIndex + '"> A/B/C/D </span> <br/>'
					+ '<span id = "explanation-container"> Explanation:</span> <span id = "explanation-' + highestIndex + '"> Give a short explanation of the answer here (optional). </span>'
					+ '</p>'
					+ '</div>'
					
					
					+ '<div class = "col-sm-2 text-left">'
					+ '<h2> </h2> <br/>'
					+ '<h4>'
					+ '<a class = "edit pointable"><span id = "edit-icon-q"' + highestIndex + '" class = "glyphicon glyphicon-pencil" data-toggle = "modal" data-target = "#edit-question" onclick = "fetchQuestion(this)"> </span></a> &nbsp;'
					+ '<a id = "edit-q' + highestIndex + '" class = "edit pointable" data-toggle = "modal" data-target = "#edit-question" onclick = "fetchQuestion(this)">Edit Item</a>'
					+ '</h4>'
					+ '<h4>'
					+ '<a class = "edit pointable"><span id = "edit-icon-a"' + highestIndex + '" class = "glyphicon glyphicon-edit" data-toggle = "modal" data-target = "#edit-answer" onclick = "fetchAnswer(this)"> </span></a> &nbsp;'
					+ '<a id = "edit-a' + highestIndex + '" class = "edit pointable" data-toggle = "modal" data-target = "#edit-answer" onclick = "fetchAnswer(this)">Edit Answer</a>'
					+ '</h4>'
					+ '<h4>'
					+ '<a class = "edit pointable"><span id = "delete-icon-q' + highestIndex + '" class = "glyphicon glyphicon-trash" data-toggle = "modal" data-target = "#delete-quiz-item" onclick = "fetchDelete(this)"> </span></a> &nbsp;'
					+ '<a id = "delete-q' + highestIndex + '" class = "edit pointable" data-toggle = "modal" data-target = "#delete-quiz-item" onclick = "fetchDelete(this)">Delete Item</a>'
					+ '</h4> <br/>'

					+ '<h4>'
					+ '<a class = "edit pointable"><span id = "edit-icon-x' + highestIndex + '" class = "glyphicon glyphicon-picture" data-toggle = "modal" data-target = "#edit-image" onclick = "fetchImage(this)"> </span></a> &nbsp;'
					+ '<a id = "edit-x' + highestIndex + '" class = "edit pointable" data-toggle = "modal" data-target = "#edit-image" onclick = "fetchImage(this)">Edit Image File</a>'
					+ '</h4>'
					
					+ '<h4>'
					+ '<a class = "edit pointable"><span id = "edit-icon-y' + highestIndex + '" class = "glyphicon glyphicon-headphones" data-toggle = "modal" data-target = "#edit-audio" onclick = "fetchAudio(this)"> </span></a> &nbsp;'
					+ '<a id = "edit-y' + highestIndex + '" class = "edit pointable" data-toggle = "modal" data-target = "#edit-audio" onclick = "fetchAudio(this)">Edit Audio File</a>'
					+ '</h4>'

					+ '</div> <br/>'
					+ '</div>'
					+ '</div> <br/>';
	
	document.getElementById("standin-question").innerHTML += '<div id = "loading-logo" class = "center-div"> <img class = "loading" src = "../assets/languages.png"> </div>';
	
	setTimeout(function() {
		document.getElementById("loading-logo").remove();
		document.getElementById("standin-question").innerHTML += newQuestion;
	}, 250);	
}