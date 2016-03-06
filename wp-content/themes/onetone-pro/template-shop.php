<?php
/**
* Template Name: Shop Page
*
*/
   get_header("shop"); 

?>
<div id="post-<?php the_ID(); ?>" <?php post_class("clear"); ?>>
 <div class="shop-page woocommerce">
  <div class="container">
    <div class="content-area">
 
        <header class="archive-header col-md-12">
          <h1 class="archive-title"><?php onetone_get_breadcrumb();?></h1>
        </header>
        
        <article class="">
          <div class="entry-main">
		  <?php if (have_posts()) :?>
          <?php	
		  while ( have_posts() ) : the_post();
		  ?>
            <div class="entry-header">
              <h1 class="entry-title"><?php the_title();?></h1>
              
            </div>
            <div class="entry-content">
              <!--post content-->
             <?php the_content();?>
              <!--post econtent end-->
              <div class="clear"></div>
            </div>
			<?php endwhile;?>
            <?php endif;?>
          </div>
          
        </article>
        <nav class="post-navigation"> </nav>
        <div class="comments-area">
         <?php
      wp_link_pages( array( 'before' => '<div class="page-links"><span class="page-links-title">' . __( 'Pages:', 'onetone' ) . '</span>', 'after' => '</div>', 'link_before' => '<span>', 'link_after' => '</span>' ) );

	comments_template(); 

?>
          <!--comment-respond end-->
        </div>
        <!--comments-area end-->
      </div>
    </div>
  </div>
  </div>

<?php get_footer("shop"); ?>