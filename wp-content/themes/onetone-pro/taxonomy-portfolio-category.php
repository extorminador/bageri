<?php
/**
* The sigle template file.
*
*/
   get_header("site"); 

?>
<div id="portfolio-category">
<div class="site-main">
  <div class="main-content">
    <div class="content-area">
      <div class="site-content" role="main">
        <header class="archive-header">
          <h1 class="archive-title"><?php onetone_get_breadcrumb();?></h1>
        </header>
		  <section class="portfolio-list-main" role="main">
					<?php if (have_posts()) : ?>
                     <?php
							$items  = "" ;
							$i      = 1 ;
							$result = "" ;
							while ( have_posts() ) : the_post(); 
							$portfolio_image = "";
							if (has_post_thumbnail( get_the_ID()) ): 
							$thumb = get_the_post_thumbnail( get_the_ID() , "portfolio-grid-thumb" ); 
							//$image = wp_get_attachment_image_src( get_post_thumbnail_id( get_the_ID() ), 'large' );
							//$portfolio_image = $image[0];
							endif;
							
							$tags = get_the_tags(get_the_ID());
	   $tags_list = '<ul>';
	   if(is_array($tags)){
	   foreach ( $tags as $tag ) {
		  $tag_link   = get_tag_link( $tag->term_id );
		  $tags_list .= "<li><a href='{$tag_link}' title='{$tag->name}' class='{$tag->slug}'>";
		  $tags_list .= "{$tag->name}</a></li>";
	   }
	   }
	  $tags_list .= '</ul>';
	  
	  
	     $items  .=  '<div class="portfolio-col col-sm-4"><div class="portfolio-box text-center">';
	   
  
	   $items  .=  '<a href="'.get_permalink().'">';
	   $items  .= $thumb;
	   $items  .=  '</a>'; 
					
	  $items  .=  '<div class="portfolio-box-title"><a href="'.get_permalink().'"><h3>'.get_the_title().'</h3></a>
	  									'.$tags_list.'
									</div>
								</div>
							</div>';
							

						if($i%3 == 0){
							$result .=  '<div class="row">'.$items."</div>";
							$items   = "";
							}
						$i++;
					  endwhile;
					  if($items != "")
					  $result = $result.'<div class="row">'.$items."</div>";
					  
					  echo  $result;
					  ?>

					<div class="list-pagition text-center">
						<?php onetone_native_pagenavi("echo",$wp_query);?>	
					</div>
                    <?php else:?>
                    <div style="width:100%; text-align:center; margin-bottom:30px;">
                    <?php _e("Nothing found.","onetone");?>
                    </div>
                    <?php endif; ?>
				</section>
        
      <div class="clear"></div>
      </div>
    </div>
  </div>
  <!--main-->
  <div class="sidebar">
    <div class="widget-area">
   <?php get_sidebar("portfolio-category") ;?>
    </div>
  </div>
  <!--sidebar-->
</div>
</div>
<?php get_footer("site"); ?>