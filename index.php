<?php 
	session_start();
	require("includes/app/functions.php");
	include("includes/_base/head.php");
?>

<?php include("includes/_base/header.php"); ?>

	<nav>
		<a href="#ingredients" data-class="ingredients" class="previous is-active">Ingrediënten</a>
		<a href="#shopping-list" data-class="shopping-list" class="next">Boodschappenlijst</a>
	</nav>

	<main>
		
		<?php include("includes/modules/ingredients.php"); ?>
		<?php include("includes/modules/shopping-list.php"); ?>

	</main> <!-- end main -->

<?php include("includes/_base/footer.php"); ?>