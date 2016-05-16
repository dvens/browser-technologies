(function(){

	'use strict';

	if('classList' in document.documentElement) {	
		var body = document.querySelector('body');
		var main = document.querySelector('main');
		var currentPage = document.querySelector('nav .is-active');
		var dropper = document.querySelector('.shopping-list__drop');
		var dropTarget = document.querySelector('.shopping-list__drop-holder');
		var ingredients = document.querySelectorAll('.ingredients__items li');
		var form = document.querySelector('.ingredients__form');
	}

	var app = {}
	var browser = {};

	// Private function
	function prevent(e) {
  		
  		if (e.preventDefault) {
    	
    		e.preventDefault();

  		}
  		
  		return false;
	}

	app.init = function() {

		if('classList' in document.documentElement) {	

			this.initEvents();

			if('draggable' in document.createElement('span')) {
			 	
				this.setDraggable();
				this.setDropper();

			}

		}

	}

	app.initEvents = function() {

		var _this = this;
		var navButtons = document.querySelectorAll('nav a');

		for(var i = 0; i < navButtons.length; i++) {

			navButtons[i].addEventListener('click', function(e){

				var section = document.querySelector('.' + this.getAttribute('data-class')).offsetTop - 75;
				
				currentPage.classList.remove('is-active');
				e.target.classList.add('is-active');
				currentPage = e.target;
                
                if(window.requestAnimationFrame) {
                	app.scrollTo(document.body , section, 500);
                	app.scrollTo(document.documentElement , section, 500);  
                	e.preventDefault();
                }
				
			});

		}

	}

	app.scrollTo = function(element, to, duration) {
        
		// http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
        var requestAnimFrame = (function(){
            return  window.requestAnimationFrame       ||
                    window.webkitRequestAnimationFrame ||
                    window.mozRequestAnimationFrame    ||
                    function( callback ){
                        window.setTimeout(callback, 1000 / 60);
                    };
        })();

        var start = element.scrollTop,
            change = to - start,
            currentTime = 0,
            increment = 20;

        var animateScroll = function(){        
           	
           	currentTime += increment;
            
            var val = change * currentTime/duration + start;
            
            element.scrollTop = val; 
            
            if(currentTime < duration) {
                
                requestAnimFrame(animateScroll);

            }

        };
        
        requestAnimFrame(animateScroll);
    }

	app.setDraggable = function() {

		body.classList.add('draggable');

		for(var i = 0; i < ingredients.length; i++) {

			ingredients[i].setAttribute('draggable', 'true');
			
			ingredients[i].addEventListener('dragstart', function(e) {

				e.dataTransfer.setData('text', e.target.attributes['data-id'].value);

				dropper.classList.add('is-active');
				
			});

			ingredients[i].addEventListener('dragend', function(e) {

				dropper.classList.remove('is-active');

			});

		}

	}

	app.setPostData = function(inputName) {

		var breadList = document.querySelector('input[name=bread]:checked');
		var toppingsList = document.querySelectorAll('input[name="topping[]"]:checked');
		var sauceList = document.querySelectorAll('input[name="sauce[]"]:checked');;
		var _url;

		if(inputName === 'bread') {

			_url = 'bread=' + breadList.value; 

			if(toppingsList.length > 0) {

				for(var i = 0; i < toppingsList.length; i++) {

					_url += '&topping[]=' + toppingsList[i].value;

				}

			}

			if(sauceList.length > 0) {

				for(var i = 0; i < sauceList.length; i++) {

					_url += '&sauce[]=' + sauceList[i].value;

				}

			}

			return _url;

		}

		if(inputName === 'topping[]') {

			_url = 'topping[]=' + toppingsList[0].value; 

			if(toppingsList.length > 1) {

				for(var i = 1; i < toppingsList.length; i++) {

					_url += '&topping[]=' + toppingsList[i].value;

				}

			}

			if(sauceList.length > 0) {

				for(var i = 0; i < sauceList.length; i++) {

					_url += '&sauce[]=' + sauceList[i].value;

				}

			}

			if(breadList) {
				_url += '&bread=' + breadList.value; 
			}

			return _url;

		}

		if(inputName === 'sauce[]') {

			_url = 'sauce[]=' + sauceList[0].value; 

			if(sauceList.length > 1) {

				for(var i = 1; i < sauceList.length; i++) {

					_url += '&sauce[]=' + sauceList[i].value;

				}

			}

			if(toppingsList.length > 0) {

				for(var i = 0; i < toppingsList.length; i++) {

					_url += '&topping[]=' + toppingsList[i].value;

				}

			}

			if(breadList) {
				_url += '&bread=' + breadList.value; 
			}

			return _url;

		}

	}

	app.setDropper = function() {

		dropper.addEventListener('dragenter', prevent);
		dropper.addEventListener('dragover', prevent);

		dropper.addEventListener('drop', function (event) {

			var _id = event.dataTransfer.getData('text');
			var _element = document.querySelector('[data-id="' + _id +'"]');
			var _url = form.getAttribute('action');
			var _input = _element.querySelector('input');
			var _inputName = _input.getAttribute('name');
			var _inputValue = _input.getAttribute('value');
			var _xhr = new XMLHttpRequest();

			_input.checked = true;

			if('onload' in _xhr) {

				_xhr.open('POST', _url, true);

				_xhr.onload = function() {

					if (this.status >= 200 && this.status < 300) {
				    	
				    	var div = document.createElement('div');

				    	div.innerHTML = _xhr.response;
				    	
				    	dropTarget.innerHTML = div.querySelector('.shopping-list__drop-holder').innerHTML;
				    
				    } else {
					    
					    var error = {
					    	status: this.status,
					    	message: _xhr.statusText
					    };

					    console.log(error);
					}

				}	

				_xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
				_xhr.send(app.setPostData(_inputName));

			} else {

				form.submit();

			}

			event.target.classList.remove('is-active');
			_element.setAttribute('draggable', 'false');
		  	event.preventDefault();

		});

	}

	if(document.querySelector && document.addEventListener) {
		
		app.init();

	}

}());