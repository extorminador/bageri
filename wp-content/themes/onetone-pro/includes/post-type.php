<?php
 	/*	
	*	Portfolio
	*	---------------------------------------------------------------------
	* 	@author		onetone
	* 	@link		http://www.onetonewp.com
	* 	@copyright	Copyright (c) onetonewp.com
	*	---------------------------------------------------------------------
	*/
		
 add_action('init', 'onetone_portfolio_register');
 function onetone_portfolio_register() {

 $portfolio_slug = onetone_options_array('portfolio_slug');
 $portfolio_slug = $portfolio_slug ? $portfolio_slug:"portfolio";
	$labels = array(
		'name' => __('Portfolios', 'onetone'),
		'singular_name' => __('Portfolio', 'onetone'),
		'add_new_item' =>  __('Add New Portfolio', 'onetone'),
		'edit_item' => __('Edit Portfolio', 'onetone'),
		'new_item' => __('New Portfolio', 'onetone'),
		'view_item' => __('View Portfolio','onetone'),
		'all_items' => __('All Portfolios','onetone'),
		'search_items' => __('Search Portfolio', 'onetone'),
		'not_found' =>  __('Nothing found', 'onetone'),
		'not_found_in_trash' => __('Nothing found in Trash', 'onetone'),
	);
 
	$args = array(
		'labels' => $labels,
		'public' => true,
		'show_ui' => true,
		'publicly_queryable' => true,
		'query_var' => true,
		'rewrite' => true,
		'menu_icon' => ONETONE_THEME_BASE_URL.'/images/admin-portfolio-icon.png',
		'can_export' => true,
		'exclude_from_search' => false,
		'capability_type' => 'post',
		'hierarchical' => false,
		'menu_position' => 7,
		'rewrite' => array('slug' =>$portfolio_slug, 'with_front' => false),
		'supports' => array('title','editor','thumbnail','excerpt','page-attributes')
	  ); 
 	   
	register_post_type( 'portfolio' , $args );
   }
		register_taxonomy(
			"portfolio-category", array("portfolio"), array(
				"hierarchical" => true,
				"label" => __("Portfolio Categories",'onetone'), 
				"singular_label" => __("Portfolio Categories",'onetone'), 
				"rewrite" => true)
			);
		register_taxonomy_for_object_type('portfolio-category', 'portfolio');
		register_taxonomy(
			"portfolio-tag", array("portfolio"), array(
				"hierarchical" => false, 
				"label" => __("Portfolio Tags","onetone"), 
				"singular_label" => __("Portfolio Tags","onetone"), 
				"rewrite" => true)
			);
				
    register_taxonomy_for_object_type('portfolio-tag', 'portfolio');
		
	
	add_filter("manage_edit-portfolio_columns", "show_portfolio_column");	
	function show_portfolio_column($columns){
		$columns = array(
			"cb" => "<input type=\"checkbox\" />",
			"title" => __("Title",'onetone'),
			"portfolio-tags" => __("Portfolio Tags","onetone"),
			"portfolio-category" => __("Portfolio Categories",'onetone'),
			"date" => __("Date",'onetone')
			);
		return $columns;
	}
	add_action("manage_posts_custom_column","portfolio_custom_columns");
	function portfolio_custom_columns($column){
		global $post;

		switch ($column) {
			case "portfolio-tags":
			echo get_the_term_list($post->ID, 'portfolio-tag', '', ', ','');
			break;
			case "portfolio-category":
			echo get_the_term_list($post->ID, 'portfolio-category', '', ', ','');
			break;
		}
	}	
	
				