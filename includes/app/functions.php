<?php 

	$breads = array("Wit brood", "Bruin brood", "Volkoren brood");
	$toppings = array("Jonge kaas", "Oude kaas", "Ham", "Kipfilet", "Tomaat", "Ui", "Ananas");
	$sauces = array("Mosterdmayonaise", "Ketchup", "Mayonaise");

	$breadCurrent = isset($_SESSION['breadCurrent']) ? $_SESSION['breadCurrent'] : '';
	$toppingsCurrent = isset($_SESSION['toppingsCurrent']) ? $_SESSION['toppingsCurrent'] : array();
	$saucesCurrent = isset($_SESSION['saucesCurrent']) ? $_SESSION['saucesCurrent'] : array();

	// Give access to global scope. 
	// $GLOBALS['test']

?>