<?php
/**
* The sigle template file.
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
          <h1 class="archive-title"><p class="breadcrumb"><a href="<?php echo esc_url(home_url('/')); ?>"><?php _e("Home",'onetone');?></a><span class="arrow"> &raquo; </span><span class="current_crumb">404 </span></p></h1>
        </header>
        <article class="post-entry">
          <div class="entry-main">
            <div class="entry-content">
              <!--post content-->
             <?php echo do_shortcode(onetone_options_array('content_404'));?>
              <!--post econtent end-->
            </div>
          </div>
          
        </article>
      </div>
    </div>
  </div>
  <!--main-->
  <div class="sidebar">
    <div class="widget-area">
   <?php get_sidebar("post") ;?>
    </div>
  </div>
  <!--sidebar-->
</div>
</div>
<?php get_footer("site"); ?>