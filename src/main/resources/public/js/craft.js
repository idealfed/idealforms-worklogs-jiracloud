jQuery(document).ready(function() {

	$.ajaxSetup({
		beforeSend: function (request) {
			request.setRequestHeader("Authorization", "JWT " + getJwtToken());
		}
	});

	Ext.Ajax.setDefaultHeaders({"Authorization":"JWT " + getJwtToken()});

	ijf.main.init(0);
});