'use strict';

app.controller('home', ['pageLoader', 'overview-service', 'gApi', 'filters' , function(

	pageLoader,
	overviewService,
	gapi,
	filters,
	$tools

) {

	var overview = {};
	var $rootscope = this;

	var _geoForm = Ld('.geolocation');
	var _geoSubmit = Ld('.geolocation__submit-btn');
	var _geoInput = document.querySelector('.geolocation__search');

	overview.init = function() {

		pageLoader.toggleLoader('show');
		this.getLongLang();

	}

	overview.getLongLang = function() {

		var _this = this;

		gapi.getLongLang(function(position){

			// Callback
			var _position = {
				lat: position.coords.latitude,
				lng: position.coords.longitude
			};

			_this.getLocation(_position);

		}, function(){
			
			// Fallback
			_this.showForm();

		});

	}

	overview.showForm = function() {

		var _this = this;

		_geoForm.addClass('is-active');

		_geoSubmit.addListener('click', function(e){

			_this.loadData(_geoInput.value, 'no-geo');
			_geoForm.removeClass('is-active');

			e.preventDefault();
		});

	}

	overview.getLocation = function(pos) {

		var _this = this;
		var _query = pos.lat + ',' + pos.lng;
		
		gapi.getLocation(_query).then(function(response) {

			var _response = JSON.parse(response);
			
			_this.loadData(_response.results[0]);	

		});

	}

	overview.loadData = function(res, option) {

		var _this = this;
		var _postal;

		if(option === 'no-geo') {
			
			_postal = res;


		} else {

			_postal = filters.getDutchPostal(res.formatted_address);

		}
	
		overviewService.getHouses('/' + _postal + '/+2km').then(function(response){

			var _data = JSON.parse(response);
			_this.loadPage(_data)

		});

	}

	overview.loadPage = function(data) {

		var _ids = data.Objects.map(function(obj) {

			return obj.Id;

		});

		var i = parseInt(Math.random()*(_ids.length-1));

		$rootscope.data = _ids;
		
		window.location = '#/house/' + _ids[i];
		
	}

	overview.init();

}]);