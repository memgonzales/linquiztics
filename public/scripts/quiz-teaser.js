$(document).ready(function() {
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

function fetchComment(idNum) {
	document.getElementById("edited-comment-" + idNum).value = document.getElementById("comment-" + idNum).innerHTML.trim();
}

function fetchCommentData(idNum) {
	document.getElementById("reportCommentnum-" + idNum).value = idNum;
	document.getElementById("reportAuthor-" + idNum).value = document.getElementById("report-author-" + idNum).innerHTML.trim();
	document.getElementById("reportCommentbody-" + idNum).value = document.getElementById("report-body-" + idNum).innerHTML.trim();
}

function editComment(idNum, dateUpdated) {
	if (document.getElementById("edited-comment-" + idNum).value) {
		document.getElementById("comment-" + idNum).innerHTML = document.getElementById("edited-comment-" + idNum).value;
		
		var formattedDate = dateUpdated.getMonth() + 1 + "-" + dateUpdated.getDate() + "-" + dateUpdated.getFullYear();
		document.getElementById("comment-date-" + idNum).innerHTML = formattedDate;
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
	document.getElementById("comment-container-" + idNum).style.display = "none";
	
	$('#delete-comment-' + idNum).modal('toggle');
}