<?php 
	
	session_start();

	print_r($_POST['id']);

	if( isset($_POST['deleteBread']) ) {

		$_SESSION['breadCurrent'] = '';
		header('location: /boodschappenlijst/');

	}

	if( isset($_POST['deleteTopping']) ) {

		$array = $_SESSION['toppingsCurrent'];
		$diff = array_diff($array, array($_POST['id']));
		$_SESSION['toppingsCurrent'] = $diff;

		header('location: /boodschappenlijst/');

	}

	if( isset($_POST['deleteSauce']) ) {

		$array = $_SESSION['saucesCurrent'];
		$diff = array_diff($array, array($_POST['id']));
		$_SESSION['saucesCurrent'] = $diff;

		header('location: /boodschappenlijst/');

	}

?>