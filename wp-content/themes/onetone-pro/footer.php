 <?php
		$enable_footer_widget_area = onetone_options_array('enable_footer_widget_area');
		if( $enable_footer_widget_area == 1){
		?>
        <section class="home-widget-area">
  <div class="home-container container">
    <div class="row">
						<div class="col-md-4">
							<?php
							if(is_active_sidebar("footer_widget_1")){
	                           dynamic_sidebar("footer_widget_1");
                                  	}
							?>
						</div>
						<div class="col-md-4">
				        <?php
							if(is_active_sidebar("footer_widget_2")){
	                           dynamic_sidebar("footer_widget_2");
                                  	}
							?>
						</div>
						<div class="col-md-4">
							<?php
							if(is_active_sidebar("footer_widget_3")){
	                           dynamic_sidebar("footer_widget_3");
                                  	}
							?>
						</div>
					</div>  
  </div>
</section>
<?php }?>
<footer class="home-footer footer">
    	<div class="home-site-info footer-copyright">
        	<?php 
			$copyright = onetone_options_array( 'copyright' );
			echo $copyright;
			?>
		</div>
    </footer>

</div>
<?php
	wp_footer();
?>
</body>
</html>