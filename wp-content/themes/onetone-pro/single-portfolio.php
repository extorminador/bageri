<?php
/**
* The sigle template file.
*
*/
   get_header("site"); 

?>
<div id="portfolio-<?php the_ID(); ?>" <?php post_class("clear"); ?>>
<div class="site-main">
  <div class="main-content">
    <div class="content-area">
      <div class="site-content" role="main">
        <header class="archive-header">
          <h1 class="archive-title"><?php onetone_get_breadcrumb();?></h1>
        </header>
        <article class="portfolio-entry">
        <div class="entry-main">
		  <?php if (have_posts()) :?>
          <?php	
		  while ( have_posts() ) : the_post();
		  ?>
            <div class="portfolio-detail-content">
 
        <?php    
            $galleryArray = get_post_gallery_ids( get_the_ID() ); 
			
            if( count( $galleryArray ) >0 && $galleryArray[0] != "" ){
	  ?>
       <div class="portfolio-gallery">
      <div id="portfolio-carousel" class="owl-carousel owl-theme">
      <?php
 foreach ($galleryArray as $id) { 
 ?>
    <div class="item"><img src="<?php echo wp_get_attachment_url( $id ); ?>" alt="" /></div>

<?php }?>
</div> </div>
<?php }else{
	
	if ( has_post_thumbnail() ) {
		?>
         <div class="portfolio-featured-image">
        <?php
	the_post_thumbnail();
	
	?>
    </div>
    <?php
        } 
		}
?>
 <h1 class="entry-title"><?php the_title();?></h1>
  <div class="portfolio-content"><?php the_content();?></div>
   </div>
			<?php endwhile;?>
            <?php endif;?>
        </div>
        </article>
          
      <div class="clear"></div>
      </div>
    </div>
  </div>
  <!--main-->
  <div class="sidebar">
    <div class="widget-area">
   <?php get_sidebar("portfolio") ;?>
    </div>
  </div>
  <!--sidebar-->
</div>
</div>
<?php get_footer("site"); ?>