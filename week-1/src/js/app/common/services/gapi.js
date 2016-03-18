app.service('gApi', ['api', function(

	api,
	$config,
	$tools

){

	var gApi = {};
	var _gEndPoint = '&location_type=ROOFTOP&result_type=street_address&key=';

	gApi.getLongLang = function(callback, fallback) {

		if(navigator.geolocation) {
			
			var _location = navigator.geolocation.getCurrentPosition(callback, fallback);

		} else {

			fallback();
			console.log('Geolocation is not supported in this browser');

		}

	}

	gApi.getLocation = function(query) {

		var _url = query + _gEndPoint;
		return api.getGoogleApi(_url);

	}

	return gApi;

}]);