<?php
// global $wp_registered_sidebars;
#########################################
function onetone_widgets_init() {
		register_sidebar(array(
			'name' => 'Default Sidebar',
			'id'=>'default_sidebar',
			'before_widget' => '<div id="%1$s" class="widget %2$s">', 
			'after_widget' => '<span class="seperator extralight-border"></span></div>', 
			'before_title' => '<h3 class="widgettitle">', 
			'after_title' => '</h3>', 
			));
			register_sidebar(array(
			'name' => 'Displayed Everywhere',
			'id'=>'displayed_everywhere',
			'before_widget' => '<div id="%1$s" class="widget %2$s">', 
			'after_widget' => '<span class="seperator extralight-border"></span></div>', 
			'before_title' => '<h3 class="widgettitle">', 
			'after_title' => '</h3>', 
			));
			
		      register_sidebar(array(
			'name' => 'Page Sidebar',
			'id'=>'page',
			'before_widget' => '<div id="%1$s" class="widget %2$s">', 
			'after_widget' => '<span class="seperator extralight-border"></span></div>', 
			'before_title' => '<h3 class="widgettitle">', 
			'after_title' => '</h3>', 
			));
			  
		    register_sidebar(array(
			'name' => 'Post Sidebar',
			'id'=>'post',
			'before_widget' => '<div id="%1$s" class="widget %2$s">', 
			'after_widget' => '<span class="seperator extralight-border"></span></div>', 
			'before_title' => '<h3 class="widgettitle">', 
			'after_title' => '</h3>', 
			));
			register_sidebar(array(
			'name' => 'Post Category Sidebar',
			'id'=>'post_category',
			'before_widget' => '<div id="%1$s" class="widget %2$s">', 
			'after_widget' => '<span class="seperator extralight-border"></span></div>', 
			'before_title' => '<h3 class="widgettitle">', 
			'after_title' => '</h3>', 
			));
			
			register_sidebar(array(
			'name' => 'Portfolio Sidebar',
			'id'=>'portfolio',
			'before_widget' => '<div id="%1$s" class="widget %2$s">', 
			'after_widget' => '<span class="seperator extralight-border"></span></div>', 
			'before_title' => '<h3 class="widgettitle">', 
			'after_title' => '</h3>', 
			));
			
			register_sidebar(array(
			'name' => 'Portfolio Category Sidebar',
			'id'=>'portfolio_category',
			'before_widget' => '<div id="%1$s" class="widget %2$s">', 
			'after_widget' => '<span class="seperator extralight-border"></span></div>', 
			'before_title' => '<h3 class="widgettitle">', 
			'after_title' => '</h3>', 
			));
			
			
		    register_sidebar(array(
			'name' => 'Shop Sidebar',
			'id'=>'shop',
			'before_widget' => '<div id="%1$s" class="widget %2$s">', 
			'after_widget' => '<span class="seperator extralight-border"></span></div>', 
			'before_title' => '<h3 class="widgettitle">', 
			'after_title' => '</h3>', 
			));
			
			register_sidebar(array(
			'name' => __('Footer Area One', 'onetone'),
			'id'   => 'footer_widget_1',
			'before_widget' => '<div id="%1$s" class="widget widget-box %2$s">', 
			'after_widget' => '<span class="seperator extralight-border"></span></div>', 
			'before_title' => '<h3 class="widget-title">', 
			'after_title' => '</h3>' 
			));
	register_sidebar(array(
			'name' => __('Footer Area Two', 'onetone'),
			'id'   => 'footer_widget_2',
			'before_widget' => '<div id="%1$s" class="widget widget-box %2$s">', 
			'after_widget' => '<span class="seperator extralight-border"></span></div>', 
			'before_title' => '<h3 class="widget-title">', 
			'after_title' => '</h3>' 
			));
	register_sidebar(array(
			'name' => __('Footer Area Three', 'onetone'),
			'id'   => 'footer_widget_3',
			'before_widget' => '<div id="%1$s" class="widget widget-box %2$s">', 
			'after_widget' => '<span class="seperator extralight-border"></span></div>', 
			'before_title' => '<h3 class="widget-title">', 
			'after_title' => '</h3>' 
			));
		
			
}
add_action( 'widgets_init', 'onetone_widgets_init' );