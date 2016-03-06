<?php

function onetone_enqueue_stuff() {

	wp_enqueue_media();

	wp_enqueue_script( 'fg-admin-script',  get_template_directory_uri().'/includes/gallery/js/admin.js' );

	wp_localize_script( 'fg-admin-script', 'myAjax', array( 'ajaxurl' => admin_url( 'admin-ajax.php' )));

	wp_enqueue_style( 'fg-admin-style', get_template_directory_uri().'/includes/gallery/css/admin.css' );

}