<?php 
	session_start();
	
	$_SESSION['breadCurrent'] = isset($_POST['bread']) ? $_POST['bread'] : '';	
	$_SESSION['toppingsCurrent'] = isset($_POST['topping']) ? $_POST['topping'] : array();
	$_SESSION['saucesCurrent'] = isset($_POST['sauce']) ? $_POST['sauce'] : array();

	header('location: /boodschappenlijst/');

?>