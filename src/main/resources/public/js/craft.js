jQuery(document).ready(function() {

	$.ajaxSetup({
		beforeSend: function (request) {
			var token = $('meta[name="token"]').attr("content");
			request.setRequestHeader("Authorization", "JWT " + token);
		}
	});

	ijf.main.init(0);
});