<?php

define( "WOO_IMAGES", get_template_directory_uri() . "/woocommerce/images" );


remove_action( 'woocommerce_before_main_content','woocommerce_breadcrumb', 20, 0);
add_action( 'onetone_before_content_wrap','woocommerce_breadcrumb');

//remove_action( 'woocommerce_sidebar', 'woocommerce_get_sidebar', 10);

remove_action( 'woocommerce_after_main_content', 'woocommerce_output_content_wrapper_end', 10);
remove_action( 'woocommerce_before_main_content', 'woocommerce_output_content_wrapper', 10);
add_action( 'woocommerce_before_main_content', 'onetone_woocommerce_output_content_wrapper', 10);
add_action( 'woocommerce_after_main_content', 'onetone_woocommerce_output_content_wrapper_end', 10);

add_action( 'woocommerce_before_shop_loop', 'onetone_woocommerce_before_shop_loop', 0,0);
add_action( 'woocommerce_before_shop_loop', 'onetone_woocommerce_after_shop_loop', 40);

remove_action( 'woocommerce_before_single_product_summary', 'woocommerce_show_product_sale_flash', 10);
add_action( 'woocommerce_product_thumbnails', 'woocommerce_show_product_sale_flash', 10);

//add_action( 'onetone_woocommerce_after_catalog_ordering', 'onetone_after_catalog_ordering', 40);

//remove_action( 'woocommerce_before_shop_loop_item_title', 'woocommerce_template_loop_product_thumbnail', 10);
//remove_action( 'woocommerce_after_shop_loop_item_title', 'woocommerce_template_loop_price', 10);
//remove_action( 'woocommerce_after_shop_loop_item_title', 'woocommerce_template_loop_rating' ,5);

add_action('woocommerce_sidebar','onetone_woocommerce_sidebar');

add_action( 'woocommerce_after_product_loop','onetone_get_portfolio_share_icons');
add_action('woocommerce_share','onetone_single_product_sharing');

add_action('onetone_header_shopping_cart','onetone_header_shopping_cart');

add_action('woocommerce_before_shop_loop_item_title','onetone_before_shop_loop_item_title');
add_action('woocommerce_after_shop_loop_item','onetone_after_shop_loop_item');



function onetone_woocommerce_sidebar(){
	
	}
function onetone_before_shop_loop_item_title(){
	
	echo '<div class="content-wrapper">';
	}
function onetone_after_shop_loop_item(){
	
	echo '</div>';
	}

function onetone_after_catalog_ordering(){
	
	}
function onetone_woocommerce_before_shop_loop(){
echo "<div class='product-page-title-container'>";
}
function onetone_woocommerce_after_shop_loop(){
echo "</div>";
}


function onetone_single_product_sharing(){
	
	}


function onetone_woocommerce_output_content_wrapper() {
    global $woocommerce;

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
echo '<div class="col-md-12">';
do_action("onetone_before_content_wrap");
echo '</div>';
echo '<div class="'.$column_class_content.'"><div class="woo-list">';

}
function onetone_woocommerce_output_content_wrapper_end() {
echo '</div></div>';

}


function onetone_woocommerce_styles(){
	if(is_admin() || 'wp-login.php' == basename($_SERVER['PHP_SELF'])){
		return;
	}
	//wp_enqueue_style('onetone-woocommerce', get_template_directory_uri().'/style/woocommerce.css', false, false, 'all');
	
}
add_action('wp_print_styles', 'onetone_woocommerce_styles',12);





add_filter('add_to_cart_fragments', 'woocommerce_header_add_to_cart_fragment');
 
function woocommerce_header_add_to_cart_fragment( $fragments ) {
	global $woocommerce;
	
	ob_start();
	
	?>
	<a class="cart-contents" href="<?php echo $woocommerce->cart->get_cart_url(); ?>" title="<?php _e('View your shopping cart', 'woothemes'); ?>"><?php echo sprintf(_n('%d item', '%d items', $woocommerce->cart->cart_contents_count, 'woothemes'), $woocommerce->cart->cart_contents_count);?> - <?php echo $woocommerce->cart->get_cart_total(); ?></a>
	<?php
	
	$fragments['a.cart-contents'] = ob_get_clean();
	
	return $fragments;
	
}

/*--------------------------------------------------------------------------------------------------
	PRODUCTS PAGE - FILTER IMAGE
--------------------------------------------------------------------------------------------------*/
 
 
if ( ! function_exists( 'woocommerce_template_loop_product_thumbnail' ) ) {

	function woocommerce_template_loop_product_thumbnail() {
		echo woocommerce_get_product_thumbnail();
	} 
}
 

if ( ! function_exists( 'woocommerce_get_product_thumbnail' ) ) {

	function woocommerce_get_product_thumbnail( $size = 'shop_catalog', $placeholder_width = 500, $placeholder_height = 500  ) {
		global $post, $woocommerce;
			
			$output = '<div class="onetone-product-image image-wrapper">';
			
			if ( has_post_thumbnail() ) {
				$thumb = get_the_post_thumbnail( get_the_ID() , "shop_catalog" ); 
	
				$output .= $thumb;
				
			} else {
			
				$output .= '<img src="'. woocommerce_placeholder_img_src() .'" alt="Placeholder" width="'.$placeholder_width.'" height="'.$placeholder_height.'" />';
			
			}
			
			$output .= '</div>';
			
			return $output;
	}
}

 
function onetone_short_desc_filter($content){   


    $content = str_replace ('<p>','<p class="desc">',$content);
    return $content;
}

add_filter('woocommerce_short_description', 'onetone_short_desc_filter');

function onetone_url_set_value($url,$key,$value)
{
	$a=explode('?',$url);
	$url_f=$a[0];
	$query=isset($a[1])?$a[1]:"";
	parse_str($query,$arr);
	$arr[$key]=$value;
	return $url_f.'?'.http_build_query($arr);
} 

function onetone_get_self_url(){    
    if (isset($_SERVER['REQUEST_URI']))  
    {  
        $serverrequri = $_SERVER['REQUEST_URI'];   
    }  
    else  
    {  
        if (isset($_SERVER['argv']))  
        {  
            $serverrequri = $_SERVER['PHP_SELF'] .'?'. $_SERVER['argv'][0];  
        }  
        else if(isset($_SERVER['QUERY_STRING']))  
        {  
            $serverrequri = $_SERVER['PHP_SELF'] .'?'. $_SERVER['QUERY_STRING'];  
        }  
    }  
    $s = empty($_SERVER["HTTPS"]) ? '' : ($_SERVER["HTTPS"] == "on") ? "s" : "";  
    $protocol = strstr(strtolower($_SERVER["SERVER_PROTOCOL"]), "/",true).$s;  
    $port = ($_SERVER["SERVER_PORT"] == "80") ? "" : (":".$_SERVER["SERVER_PORT"]);  
    return $protocol."://".$_SERVER['SERVER_NAME'].$port.$serverrequri;     
} 


function onetone_header_shopping_cart(){
global $woocommerce;


			}
			

	/**
	 * Register the [woocommerce_recently_viewed_products per_page="5"] shortcode
	 *
	 * This shortcode displays recently viewed products using WooCommerce default cookie
	 * It only has one parameter "per_page" to choose number of items to show
	 *
	 * @access      public
	 * @since       1.0
	 * @return      $content
	*/
	function onetone_woocommerce_recently_viewed_products(  ) {
	 
	  
	
	 
	    // Get WooCommerce Global
	    global $woocommerce;
	 
	    // Get recently viewed product cookies data
	    $viewed_products = ! empty( $_COOKIE['woocommerce_recently_viewed'] ) ? (array) explode( '|', $_COOKIE['woocommerce_recently_viewed'] ) : array();
	    $viewed_products = array_filter( array_map( 'absint', $viewed_products ) );
	 
	    // If no data, quit
	    if ( empty( $viewed_products ) )
	        return __( 'You have not viewed any product yet!', 'onetone' );
	 
	    // Create the object
	
	 
	    // Get products per page
	    if( !isset( $per_page ) ? $number = 4 : $number = $per_page )
	 
	    // Create query arguments array
	    $query_args = array(
	                    'posts_per_page' => $number,
	                    'no_found_rows'  => 1,
	                    'post_status'    => 'publish',
	                    'post_type'      => 'product',
	                    'post__in'       => $viewed_products,
	                    'orderby'        => 'rand'
	                    );
	 
	    // Add meta_query to query args
	    $query_args['meta_query'] = array();
	 
	    // Check products stock status
	    $query_args['meta_query'][] = $woocommerce->query->stock_status_meta_query();
	 
	    // Create a new query
	    $r = new WP_Query($query_args);
	 
	    // If query return results
	    if ( $r->have_posts() ) {
	 
	       woocommerce_product_loop_start();
	 
	        // Start the loop
	        while ( $r->have_posts()) {
	            $r->the_post();
	            wc_get_template_part( 'content', 'product' );
	 
	    }
		woocommerce_product_loop_end();
		}
		wp_reset_query();
	
	}

	add_action("woocommerce_cart_is_empty", "onetone_woocommerce_recently_viewed_products");
	
	function onetone_before_cart(){}
	add_action("woocommerce_before_cart", "onetone_before_cart",0);
	
	function onetone_before_checkout_form(){}
	add_action("woocommerce_before_checkout_form", "onetone_before_checkout_form",20);
	
	function onetone_before_thankyou(){}
	add_action("woocommerce_before_thankyou", "onetone_before_thankyou");
	
	function onetone_after_nav_menu(){}
		
	add_action("onetone_before_nav_menu", "onetone_after_nav_menu");