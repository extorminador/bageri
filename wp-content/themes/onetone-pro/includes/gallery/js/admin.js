jQuery(document).ready(function($){

	// Uploading files

	if (jQuery('#onetone_removeall').hasClass('premp6')) {var button = '<button class="media-modal-icon"></button>';}

	else {var button = '<button></button>';}
	
	jQuery('#onetone_select').on('click', function(event){
	
		event.preventDefault();
		alert("t");
		
		// If the media frame already exists, reopen it.
		if ( file_frame ) {
			file_frame.open();
			fixBackButton();
			return;
		}
		
		// Create the media frame.
		var file_frame = wp.media.frame = wp.media({
			frame: "post",
			state: "featured-gallery",
			library : { type : 'image'},
			button: {text: "Edit Image Order"},
			multiple: true
		});

		// Create Featured Gallery state. This is essentially the Gallery state, but selection behavior is altered.
		file_frame.states.add([
			new wp.media.controller.Library({
				id:         'featured-gallery',
				title:      'Select Images for Gallery',
				priority:   20,
				toolbar:    'main-gallery',
				filterable: 'uploaded',
				library:    wp.media.query( file_frame.options.library ),
				multiple:   file_frame.options.multiple ? 'reset' : false,
				editable:   true,
				allowLocalEdits: true,
				displaySettings: true,
				displayUserSettings: true
			}),
		]);
		
		file_frame.on('open', function() {
			var selection = file_frame.state().get('selection');
			var library = file_frame.state('gallery-edit').get('library');
			var ids = jQuery('#onetone_perm_metadata').val();
			if (ids) {
				idsArray = ids.split(',');
				idsArray.forEach(function(id) {
					attachment = wp.media.attachment(id);
					attachment.fetch();
					selection.add( attachment ? [ attachment ] : [] );
				});
				file_frame.setState('gallery-edit');
				idsArray.forEach(function(id) {
					attachment = wp.media.attachment(id);
					attachment.fetch();
					library.add( attachment ? [ attachment ] : [] );
				});
			}
		});

		file_frame.on('ready', function() {
			jQuery( '.media-modal' ).addClass( 'no-sidebar' );
		});

		file_frame.on('change', function() {
			fixBackButton();
		});
		 
		// When an image is selected, run a callback.
		file_frame.on('update', function() {
			var imageIDArray = [];
			var imageHTML = '';
			var metadataString = '';
			images = file_frame.state().get('library');
			images.each(function(attachment) {
				imageIDArray.push(attachment.attributes.id);
				imageHTML += '<li>'+button+'<img id="'+attachment.attributes.id+'" src="'+attachment.attributes.url+'"></li>';
			});
			metadataString = imageIDArray.join(",");
			if (metadataString) {
				jQuery("#onetone_perm_metadata").val(metadataString);
				jQuery("#featuredgallerydiv ul").html(imageHTML);
				jQuery('#onetone_select').text('Edit Selection');
				jQuery('#onetone_removeall').addClass('visible');
				setTimeout(function(){
					ajaxUpdateTempMetaData();
				},0);
			}
		});
		 
		// Finally, open the modal
		file_frame.open();

	});

	jQuery('#featuredgallerydiv ul').on('click', 'button', function(event){

		event.preventDefault();

		if (confirm('Are you sure you want to remove this image?')) {

			var removedImage = jQuery(this).parent().children('img').attr('id');

			var oldGallery = jQuery("#onetone_perm_metadata").val();

			var newGallery = oldGallery.replace(','+removedImage,'').replace(removedImage+',','').replace(removedImage,'');

			jQuery(this).parent('li').remove();

			jQuery("#onetone_perm_metadata").val(newGallery);

			if (newGallery == "") {

				jQuery('#onetone_select').text('Select Images');

				jQuery('#onetone_removeall').removeClass('visible');

			}

			ajaxUpdateTempMetaData();

		}

	});

	jQuery('#onetone_removeall').on('click', function(event){

		event.preventDefault();

		if (confirm('Are you sure you want to remove all images?')) {

			jQuery("#featuredgallerydiv ul").html("");

			jQuery("#onetone_perm_metadata").val("");

			jQuery('#onetone_removeall').removeClass('visible');

			jQuery('#onetone_select').text('Select Images');

			ajaxUpdateTempMetaData();

		}

	});

});

function fixBackButton() {

	setTimeout(function(){

		jQuery('.media-menu a:first-child').text('← Edit Selection').addClass('button').addClass('button-large').addClass('button-primary');

	},0);

}

function ajaxUpdateTempMetaData() {

	jQuery.ajax({
		type : "post",
		dataType : "json",
		url : myAjax.ajaxurl,
		data : {
			action: "onetone_update_temp", 
			onetone_post_id: jQuery("#onetone_perm_metadata").data("post_id"), 
			onetone_temp_noncedata: jQuery("#onetone_temp_noncedata").val(), 
			onetone_temp_metadata: jQuery("#onetone_perm_metadata").val()
		},
		success: function(response) {
			if (response == "error") {
				alert("There was an issue with updating the live preview. Make sure that you click Save to ensure your changes aren't lost.");
			}
		}
	});

}