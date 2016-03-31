(function(){

	'use strict';

	var userAgent = navigator.userAgent || navigator.vendor || window.opera;
	var body = document.querySelector('body');
	var main = document.querySelector('main');
	var currentPage = document.querySelector('nav .is-active');
	var dropper = document.querySelector('.shopping-list__drop');
	var dropTarget = document.querySelector('.shopping-list__drop-holder');

	var app = {}
	var browser = {};

	// Private function
	function prevent(e) {
  		
  		if (e.preventDefault) {
    	
    		e.preventDefault();

  		}
  		
  		return false;
	}

	browser.isMobile = function() {

		// Includes tablets.
		return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(userAgent.substr(0, 4));

	}

	app.init = function() {

		if(browser.isMobile()) {
			
			this.setPage();
				
		}

		if('classList' in document.documentElement) {	

			this.initEvents();

			if('draggable' in document.createElement('span') && !browser.isMobile()) {
			 	
				this.setDraggable();
				this.setDropper();

			}

		}

	}

	app.setPage = function() {

		body.classList.add('is-mobile');

	}

	app.initEvents = function() {

		var _this = this;
		var navButtons = [].slice.call(document.querySelectorAll('nav a'));
		var ingredients = [].slice.call(document.querySelectorAll('.ingredients__items li'));

		navButtons.forEach(function(button) {

			button.addEventListener('click', function(e){

				_this.transitionPage(e.target.className);
				currentPage.classList.remove('is-active');
				e.target.classList.add('is-active');
				currentPage = e.target;
				e.preventDefault();

			});

		});

	}

	app.transitionPage = function(direction) {

		if(direction === 'next') {

			main.classList.add('slide-left');

		} else {

			main.classList.remove('slide-left');

		}

	}

	app.setDraggable = function() {

		body.classList.add('draggable');

		ingredients.forEach(function(ingredient) {

			ingredient.setAttribute('draggable', 'true');
			
			ingredient.addEventListener('dragstart', function(e) {

				e.dataTransfer.setData('text', e.target.attributes['data-id'].value);

				dropper.classList.add('is-active');
				
			});

			ingredient.addEventListener('dragend', function(e) {

				dropper.classList.remove('is-active');

			});

		});

	}

	app.setDropper = function() {

		dropper.addEventListener('dragenter', prevent);
		dropper.addEventListener('dragover', prevent);

		dropper.addEventListener('drop', function (event) {

			var _id = event.dataTransfer.getData('text');
			var _element = document.querySelector('[data-id="' + _id +'"]');

			event.preventDefault();

			event.target.classList.remove('is-active');
			_element.setAttribute('draggable', 'false');

		  	dropTarget.innerHTML += '<li>' + event.dataTransfer.getData('text') + '</li>';

		});
	}

	if(document.querySelector && document.addEventListener) {
		
		app.init();

	}

}());