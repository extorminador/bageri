<?php

function onetone_register_metabox() {

	$post_types	= apply_filters( 'onetone_post_types', array( 'portfolio' ) );
	$context	= apply_filters( 'onetone_context', 'side' );
	$priority	= apply_filters( 'onetone_priority', 'default' );

	foreach ( $post_types as $post_type ) {

		add_meta_box( 'featuredgallerydiv', __( 'Portfolio Gallery', 'featured-gallery' ), 'onetone_display_metabox', $post_type, $context, $priority );

	}

}

function onetone_display_metabox() {

	global $post;

	// Get the Information data if its already been entered
	$galleryHTML = '';
	if ( get_bloginfo( 'version' ) >= 3.8 ) {
		$button = '<button></button>';
	} else {
		$button = '<button class="media-modal-icon"></button>';
		$oldfix = ' premp6';
	}
	$selectText    = __( 'Select Images', 'featured-gallery' );
	$visible       = ''; //SHOULD WE SHOW THE REMOVE ALL BUTTON? THIS WILL BE APPLIED AS A CLASS, AND IS BLANK BY DEFAULT.
	$galleryArray  = get_post_gallery_ids( $post->ID );
	$galleryString = get_post_gallery_ids( $post->ID, 'string' );
	if ( ! empty( $galleryString ) ) {
		foreach ( $galleryArray as &$id ) {
			$galleryHTML .= '<li>'.$button.'<img id="'.$id.'" src="'.wp_get_attachment_url( $id ).'"></li> ';
		}
		$selectText = __( 'Edit Selection', 'featured-gallery' );
		$visible    = " visible";
	} 
	update_post_meta( $post->ID, 'onetone_temp_metadata', $galleryString ); // Overwrite the temporary featured gallery data with the permanent data. This is a precaution in case someone clicks Preview Changes, then exits withing saving. ?>

	<input type="hidden" name="onetone_temp_noncedata" id="onetone_temp_noncedata" value="<?php echo wp_create_nonce( 'onetone_temp_noncevalue' ); ?>" />

	<input type="hidden" name="onetone_perm_noncedata" id="onetone_perm_noncedata" value="<?php echo wp_create_nonce( plugin_basename( __FILE__ ) ); ?>" />

	<input type="hidden" name="onetone_perm_metadata" id="onetone_perm_metadata" value="<?php echo $galleryString; ?>" data-post_id="<?php echo $post->ID; ?>" />

	<button class="button" id="onetone_select"><?php echo $selectText; ?></button>

	<button class="button<?php echo $visible.$oldfix; ?>" id="onetone_removeall"><?php _e( 'Remove All', 'featured-gallery' ); ?></button>

	<ul><?php echo $galleryHTML; ?></ul>

	<div style="clear:both;"></div><?php

}

function onetone_save_perm_metadata( $post_id, $post ) {

	//Only run the call when updating a Featured Gallery.
	if ( empty( $_POST['onetone_perm_noncedata'] ) ) {
		return;
	}
	// Noncename
	if ( ! wp_verify_nonce( $_POST['onetone_perm_noncedata'], plugin_basename( __FILE__ ) ) ) {
		return;
	}
	// Verification of User
	if ( ! current_user_can( 'edit_post', $post->ID ) ) {
		return;
	}
	// OK, we're authenticated: we need to find and save the data
	$events_meta['onetone_perm_metadata'] = $_POST['onetone_perm_metadata'];
	// Add values of $events_meta as custom fields
	foreach ( $events_meta as $key => $value ) {
		if ( $post->post_type == 'revision' ) {
			return;
		}
		$value = implode( ',', (array)$value );
		if ( get_post_meta( $post->ID, $key, FALSE ) ) {
			update_post_meta( $post->ID, $key, $value );
		} else {
			add_post_meta( $post->ID, $key, $value );
		}
		if ( ! $value ) {
			delete_post_meta( $post->ID, $key );
		}
	}

}