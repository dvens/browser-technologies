<section class="shopping-list">
	
	<h2>Boodschappenlijst</h2>

	<div class="shopping-list__drop">
		Drag & Drop je ingredienten hier
	</div>
	
	<ul>
		
		<?php if($breadCurrent !== '') { ?>
		<li>
			<form action="includes/app/removeItem.php" method="POST">
				<span><?php echo $breadCurrent; ?></span>
				<input type="hidden" name="id" value="<?php echo $breadCurrent; ?>">
				<button type="submit" name="deleteBread">x</button>
			</form>
		</li>
		<?php } ?>
		
		<?php foreach ($toppingsCurrent as $value) { ?>
		
			<li>
				<form action="includes/app/removeItem.php" method="POST">
					<span><?php echo $value; ?></span>
					<input type="hidden" name="id" value="<?php echo $value; ?>">
					<button type="submit" name="deleteTopping">x</button>
				</form>
			</li>
		
		<?php } ?>

		<?php foreach ($saucesCurrent as $value) { ?>
		
			<li>
				<form action="includes/app/removeItem.php" method="POST">
					<span><?php echo $value; ?></span>
					<input type="hidden" name="id" value="<?php echo $value; ?>">
					<button type="submit" name="deleteSauce">x</button>
				</form>
			</li>
		
		<?php } ?>

	</ul>

	<ul class="shopping-list__drop-holder"></ul>

</section>