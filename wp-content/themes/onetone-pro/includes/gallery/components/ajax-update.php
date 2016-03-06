<?php

function onetone_update_temp() {

	if ( ! wp_verify_nonce( $_REQUEST['onetone_temp_noncedata'], "onetone_temp_noncevalue" ) ) {
		exit( "You shouldn't have gotten here, something is going wrong." );
	}
	if ( ! current_user_can( 'edit_post', $_REQUEST['onetone_post_id'] ) ) {
		exit( "You don't appear to be logged in, something is going wrong here." );
	}

	$newValue = $_REQUEST['onetone_temp_metadata'];
	$oldValue = get_post_meta( $_REQUEST['onetone_post_id'], 'onetone_temp_metadata', 1 );
	$response = "success";

	if ( $newValue != $oldValue ) {

		$success = update_post_meta( $_REQUEST['onetone_post_id'], 'onetone_temp_metadata', $newValue );

		if ( $success == false ) {
			$response = "error";
		}

	}

	echo json_encode( $response );

	die();

}