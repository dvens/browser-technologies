<section class="ingredients">

	<form class="ingredients__form" action="includes/app/addItem.php" method="POST">
	
		<h2>Kies je ingrediënten</h2>

		<h3>Soort brood:</h3>

		<ul class="ingredients__items">
			
			<?php forEach($breads as $bread) { ?>
				
				<li data-id="<?php echo $bread ?>">
					<label>
						<?php echo $bread ?>

						<?php if( $bread === $breadCurrent ){ ?>
							
							<input name="bread" value="<?php echo $bread ?>" checked type="radio">

						<?php } else { ?>
							
							<input name="bread" value="<?php echo $bread ?>" type="radio">
			
						<?php } ?>
						
					</label>
				</li>
			
			<?php } ?>

		</ul>

		<h3>Soort beleg:</h3>

		<ul class="ingredients__items">
			
			<?php forEach($toppings as $topping) { ?>
				
				<li data-id="<?php echo $topping ?>">
					<label>
						<?php echo $topping ?>

						<?php if(in_array($topping, $toppingsCurrent ) ) { ?>
							
							<input name="topping[]" value="<?php echo $topping ?>" checked type="checkbox">

						<?php } else { ?>
							
							<input name="topping[]" value="<?php echo $topping ?>" type="checkbox">
			
						<?php } ?>

					</label>
				</li>
			
			<?php } ?>

		</ul>	

		<h3>Soort saus:</h3>

		<ul class="ingredients__items">
			
			<?php forEach($sauces as $sauce) { ?>
				
				<li data-id="<?php echo $sauce ?>">
					<label>
						<?php echo $sauce ?>

						<?php if(in_array($sauce, $saucesCurrent )) { ?>
							
							<input name="sauce[]" value="<?php echo $sauce ?>" checked type="checkbox">

						<?php } else { ?>
							
							<input name="sauce[]" value="<?php echo $sauce ?>" type="checkbox">
			
						<?php } ?>
						
					</label>
				</li>
			
			<?php } ?>

		</ul>

		<button type="submit">Toevoegen</button>

	</form>
	
</section>