$(document).ready(function() {
	$('#login-form').on('submit', function(e) {
		e.preventDefault();
		
		$.ajax({
			url: '/checkLogin',
			method: 'POST',
			data: $('#login-form').serialize(),
			statusCode: {
				200: function() {
					window.location.replace("/");
				},
				
				403: function() {
					$('#error-1').text("Incorrect username and/or password");
					$('#pwd').val("");
				}
			}
		});
	});
});
