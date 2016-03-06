<?php
/**
* The page template file.
*
*/
   get_header("site"); 

?>
<div id="post-<?php the_ID(); ?>" <?php post_class("clear"); ?>>
<div class="site-main">
  <div class="main-content">
    <div class="content-area">
      <div class="site-content" role="main">
        <header class="archive-header">
          <h1 class="archive-title"><?php onetone_get_breadcrumb();?></h1>
        </header>
        <article class="post-entry">
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
  <!--main-->
  <div class="sidebar">
    <div class="widget-area">
   <?php get_sidebar('page');	  ?>
    </div>
  </div>
  <!--sidebar-->
</div>
</div>
<?php get_footer("site"); ?>