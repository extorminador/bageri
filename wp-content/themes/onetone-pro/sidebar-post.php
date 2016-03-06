<?php
 if( is_active_sidebar( 'displayed_everywhere' ) ) {
	 dynamic_sidebar('displayed_everywhere');
	 }
	 if ( is_active_sidebar( 'post' ) ){
	 dynamic_sidebar( 'post' );
	 }
	 elseif( is_active_sidebar( 'default_sidebar' ) ) {
	 dynamic_sidebar('default_sidebar');
	 }