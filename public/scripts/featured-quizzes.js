$(document).ready(function () {
	$('#complete-quiz-list').DataTable( {
		"order": [[3, "desc"], [0, "desc"]],
		"lengthMenu": [5, 10, 15, 20]
	} );
});
