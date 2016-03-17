var _button = document.querySelector('.button');

_button.addEventListener('click', function(e){

	showGeo();

});

function showGeo() {

	if ('geolocation' in navigator) {
	  
	  /* geolocation is available */
	  navigator.geolocation.getCurrentPosition(function(position) {
	    
	    alert(position.coords.latitude, position.coords.longitude);

	  });

	} else {
	  
	  /* geolocation IS NOT available */
	  prompt('Please enter your current position');

	}

}


