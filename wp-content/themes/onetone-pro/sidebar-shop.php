<?php
 if(is_single())
 $sidebar =	onetone_options_array('single_product_sidebar');
 else 
 $sidebar =	onetone_options_array('product_archive_sidebar');
switch($sidebar){
			case "left":
			$column_class_content   = "col-md-9 col-md-push-3 right"; 
			$column_class_sidebar   = "col-md-3 col-md-pull-9 left"; 
			break;
			case "right":
			$column_class_content   = "col-md-9 left";  
			$column_class_sidebar = "col-md-3 right";
			break;
			case "none":
			default:
			$column_class_content   = "col-md-12"; 
			$column_class_sidebar   = ""; 
			break;
			
			}
			if( $sidebar!= '' && $sidebar !='none' ){
			?>
 <div class="<?php echo $column_class_sidebar;?>">
<div class="onetone-shop-sidebar">
<?php
 if( is_active_sidebar( 'displayed_everywhere' ) ) {
	 dynamic_sidebar('displayed_everywhere');
	 }
	 if ( is_active_sidebar( 'shop' ) ){
	 dynamic_sidebar( 'shop' );
	 }
	 elseif( is_active_sidebar( 'default_sidebar' ) ) {
	 dynamic_sidebar('default_sidebar');
	 }
	 ?>
</div>
</div>
<?php
			}