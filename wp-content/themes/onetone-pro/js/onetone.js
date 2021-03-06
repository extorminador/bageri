  ///// contact form

  function IsEmail(email) {
        var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if(!regex.test(email)) {
           return false;
        }else{
           return true;
        }
      }


	jQuery("form.contact-form #submit").click(function(){


	var obj = jQuery(this).parents(".contact-form");
	obj.find(".noticefailed").text("");
	var sendto  = obj.find("input#sendto").val();
	var ver     = obj.find(".contact-form-ver").val();
	//////
	if( typeof ver !== 'undefined' && ver == '2'){
	var values = new Array();
	var error  = 0;
	obj.find("fieldset").find('input, select, textarea').each(
    function(index){
		values[index] = new Array();
        var field = jQuery(this);
		values[index]['name'] = field.data('name');
		values[index]['value'] = field.val();
        if(typeof field.data('required') !=='undefined' && field.data('required') =='1' ){
			if( values[index]['value'] == '' ){

				obj.find(".noticefailed").text( values[index]['name'] + " is required.");
	            error = 1;

				 return false;
				}
           }

			if( field.attr('type') == 'email' ){
				if( !IsEmail( values[index]['value'] ) ) {
	               obj.find(".noticefailed").text("Please enter valid email.");
				   error = 1;
	               return false;
	                 }
				}
    });
	if( error == 1) return false;
	obj.find(".noticefailed").html("");
	obj.find(".noticefailed").append("<img alt='loading' class='loading' src='"+onetone_params.themeurl+"/images/loading.gif' />");
	 jQuery.ajax({
				 type:"POST",
				 dataType:"json",
				 url:onetone_params.ajaxurl,
				 data: {
                'values': jQuery.param(values),
				'action':'onetone_contact_advanced',
				'sendto':sendto
            },
				 success:function(data){
					 if(data.error==0){

						 obj.find(".noticefailed").addClass("noticesuccess").removeClass("noticefailed");
					     obj.find(".noticesuccess").html(data.msg);
						 }else{
							 obj.find(".noticefailed").html(data.msg);
							 }
		           jQuery('.loading').remove();
				   obj[0].reset();
		           return false;
				   },error:function(){
					   obj.find(".noticefailed").html("Error.");
					   obj.find('.loading').remove();
					   return false;
					   }
					   });
	 return false;
	}
	/////

	var Name    = obj.find("input#name").val();
	var Email   = obj.find("input#email").val();
	var Message = obj.find("textarea#message").val();



   if( !IsEmail( Email ) ) {
	obj.find(".noticefailed").text("Please enter valid email.");
	return false;
	}
	if(Name ===""){
	obj.find(".noticefailed").text("Please enter your name.");
	return false;
	}
	if(Message === ""){
	obj.find(".noticefailed").text("Message is required.");
	return false;
	}
	obj.find(".noticefailed").html("");
	obj.find(".noticefailed").append("<img alt='loading' class='loading' src='"+onetone_params.themeurl+"/images/loading.gif' />");

	 jQuery.ajax({
				 type:"POST",
				 dataType:"json",
				 url:onetone_params.ajaxurl,
				 data:"Name="+Name+"&Email="+Email+"&Message="+Message+"&sendto="+sendto+"&action=onetone_contact",
				 success:function(data){
					 if(data.error==0){
						 obj.find(".noticefailed").addClass("noticesuccess").removeClass("noticefailed");
					     obj.find(".noticesuccess").html(data.msg);
						 }else{
							 obj.find(".noticefailed").html(data.msg);
							 }
		           jQuery('.loading').remove();obj[0].reset();
		           return false;
				   },error:function(){
					   obj.find(".noticefailed").html("Error.");
					   obj.find('.loading').remove();
					   return false;
					   }
					   });
	 });


  //top menu

jQuery(".site-navbar,.home-navbar").click(function(){
				jQuery(".top-nav").toggle();
			});

  jQuery('.top-nav ul li').hover(function(){
	jQuery(this).find('ul:first').slideDown(100);
	jQuery(this).addClass("hover");
	},function(){
	jQuery(this).find('ul').css('display','none');
	jQuery(this).removeClass("hover");
	});
  jQuery('.top-nav li ul li:has(ul)').find("a:first").append(" <span class='menu_more'>»</span> ");

    jQuery(".top-nav > ul > li,.main-nav > li").click(function(){
	jQuery(".top-nav > ul > li,.main-nav > li").removeClass("active");
	jQuery(this).addClass("active");
    });

   //
     ////
  var windowWidth = jQuery(window).width();
  if( windowWidth > 939 ){
	  if(jQuery(".site-main .sidebar").height() > jQuery(".site-main .main-content").height()){
		  jQuery(".site-main .main-content").css("height",(jQuery(".site-main .sidebar").height()+140)+"px");
		  }
	}else{
		  jQuery(".site-main .main-content").css("height","auto");
		}
	jQuery(window).resize(function() {
	var windowWidth = jQuery(window).width();

	 if( windowWidth > 919 ){
		 jQuery(".top-nav").show();
	 }
	 else{
		jQuery(".top-nav").hide();
		 }
	 if( windowWidth > 939 ){
	  if(jQuery(".site-main .sidebar").height() > jQuery(".site-main .main-content").height()){
		  jQuery(".site-main .main-content").css("height",(jQuery(".site-main .sidebar").height()+140)+"px");
		  }
	  } else{
		jQuery(".site-main .main-content").css("height","auto");
		}
  });


// sticky menu

(function($){
	$.fn.onetoneSticky = function( options ) {
		// adding a class to users div
		$(this).addClass('sticky-header');

		var settings = $.extend({
            'scrollSpeed '  : 500
            }, options);

		return $('.sticky-header .home-navigation ul li.onetone-menuitem a, .sticky-header .home-navigation ul.onepage-nav li.menu-item-type-custom a').each( function() {

			if ( settings.scrollSpeed ) {

				var scrollSpeed = settings.scrollSpeed

			}


	if(jQuery("body.admin-bar").length){
		if(jQuery(window).width() < 765) {
				stickyTop = 46;

			} else {
				stickyTop = 32;
			}
	  }
	  else{
		        stickyTop = 0;
		  }
		  $(this).css({'top':stickyTop});


		var stickyMenu = function(){
				var scrollTop = $(window).scrollTop();
				if (scrollTop > stickyTop) {

					  $('.sticky-header').css({ 'position': 'fixed' }).addClass('fxd');
					} else {
						if( typeof onetone_params.header_cover_video_background !== 'undefined' && onetone_params.header_cover_video_background == '0'){
							    $('.sticky-header').css({ 'position': 'absolute'}).removeClass('fxd');
							}else{
								$('.sticky-header').css({ 'position': 'absolute'}).removeClass('fxd');
								}

					}
					//

			};
			stickyMenu();
			$(window).scroll(function() {
				 stickyMenu();
			});
			/*	  $(this).on('click', function(e){
				var selectorHeight = $('.sticky-header').height();
				e.preventDefault();
		 		var id = $(this).attr('id');
				if(typeof $('section.'+ id).offset() !== 'undefined'){
				var goTo =  $('section.'+ id).offset().top -selectorHeight;
				$("html, body").animate({ scrollTop: goTo }, scrollSpeed);
				}

			});	*/

		});

	}

})(jQuery);

jQuery(document).ready(function($){


 //jQuery(".section-banner").css({"min-height":jQuery(window).height()});



 jQuery('header .home-navigation ul').onePageNav({filter: '.onetone-menu-link,.menu-item-type-custom a[href^="#"]',scrollThreshold:0.2});
 //jQuery('header .home-navigation ul.onepage-nav').onePageNav({filter: '.menu-item-type-custom a[href^="#"]',scrollThreshold:0.2});

/* ------------------------------------------------------------------------ */
/*  sticky header             	  								  	    */
/* ------------------------------------------------------------------------ */

 jQuery('.home-header').onetoneSticky({'scrollSpeed' : 500 });


 /* ------------------------------------------------------------------------ */
/*  smooth scrolling  btn       	  								  	    */
/* ------------------------------------------------------------------------ */

  jQuery("div.page a[href^='#'],div.post a[href^='#'],div.home-wrapper a[href^='#']").on('click', function(e){
				var selectorHeight = jQuery('header').height();
				var scrollTop = jQuery(window).scrollTop();
				e.preventDefault();
		 		var id = jQuery(this).attr('href');
				if(typeof jQuery(id).offset() !== 'undefined'){
				var goTo = jQuery(id).offset().top - selectorHeight;
				jQuery("html, body").animate({ scrollTop: goTo }, 1000);
				}

			});



 //slider
 if(jQuery("section.homepage-slider").length){
 jQuery("#onetone-slider").owlCarousel({
	navigation : false, // Show next and prev buttons
	slideSpeed : 300,
	paginationSpeed : 400,
	singleItem:true,
	autoPlay:parseInt(onetone_params.slideSpeed)

});}

 //portfolio carousel
  if(jQuery("#portfolio-carousel").length){
 jQuery("#portfolio-carousel").owlCarousel({
	navigation : false, // Show next and prev buttons
	slideSpeed : 300,
	paginationSpeed : 400,
	singleItem:true,
	autoPlay:parseInt(onetone_params.slideSpeed)

});}

  //shop carousel

    if(jQuery(".woocommerce.single-product .thumbnails").length){
 jQuery(".woocommerce.single-product .thumbnails").owlCarousel({
	navigation : true, // Show next and prev buttons
	pagination: false,
	items:4,
	navigationText : ['<i class="fa fa-angle-double-left"></i>', '<i class="fa fa-angle-double-right"></i>'],
	slideSpeed : 300,
	paginationSpeed : 400,
	singleItem:false


});}

 //prettyPhoto

 jQuery("a[rel^='portfolio-image']").prettyPhoto();

//video background

  if(typeof onetone_bigvideo !== 'undefined' && onetone_bigvideo!=null){
	for(var i=0;i<onetone_bigvideo.length;i++){
		jQuery(onetone_bigvideo[i].video_section_item).tubular(onetone_bigvideo[i].options);
	   }
   }
  var sectionIndex = 1;
  jQuery(".home-wrapper .section").each(function(){
	if(jQuery(this).find("#tubular-container").length > 0){
		if( sectionIndex>1 ){
		jQuery(this).find("#tubular-container").css({'position':'static'});
		}
		if( onetone_bigvideo[0].options['video_full_screen'] !== "1" ){
		jQuery(this).css({"height":(jQuery(window).height()-jQuery("header").height())+"px"});
		jQuery(this).find("#tubular-container,#tubular-player").css({"height":(jQuery(window).height()-jQuery("header").height())+"px"});
		 }
		}
		sectionIndex++;
 });

  // gallery lightbox
  jQuery(".gallery .gallery-item a").prettyPhoto({animation_speed:'fast',slideshow:10000, hideflash: true});

/* ------------------------------------------------------------------------ */
/*  animation												        	    */
/* ------------------------------------------------------------------------ */

    jQuery('.animated').each(function(){
			 if(jQuery(this).data('imageanimation')==="yes"){
		         jQuery(this).find("img,i.fa").css("visibility","hidden");
		 }
		 else{
	           jQuery(this).css("visibility","hidden");
		 }
	 });

	if(jQuery().waypoint) {
		jQuery('.animated').waypoint(function() {
			jQuery(this).css('visibility', 'visible');
			jQuery(this).find("img,i.fa").css("visibility","visible");

			// this code is executed for each appeared element
			var animation_type       = jQuery(this).data('animationtype');
			var animation_duration   = jQuery(this).data('animationduration');
	        var image_animation      = jQuery(this).data('imageanimation');
			 if(image_animation === "yes"){

			jQuery(this).find("img,i.fa").addClass("animated "+animation_type);

			if(animation_duration) {
				jQuery(this).find("img,i.fa").css('-moz-animation-duration', animation_duration+'s');
				jQuery(this).find("img,i.fa").css('-webkit-animation-duration', animation_duration+'s');
				jQuery(this).find("img,i.fa").css('-ms-animation-duration', animation_duration+'s');
				jQuery(this).find("img,i.fa").css('-o-animation-duration', animation_duration+'s');
				jQuery(this).find("img,i.fa").css('animation-duration', animation_duration+'s');
			}


			 }else{
            jQuery(this).addClass(animation_type);
			if(animation_duration) {
				jQuery(this).css('-moz-animation-duration', animation_duration+'s');
				jQuery(this).css('-webkit-animation-duration', animation_duration+'s');
				jQuery(this).css('-ms-animation-duration', animation_duration+'s');
				jQuery(this).css('-o-animation-duration', animation_duration+'s');
				jQuery(this).css('animation-duration', animation_duration+'s');
			}
			 }
		},{ triggerOnce: true, offset: 'bottom-in-view' });
	}
/* ------------------------------------------------------------------------ */
/* parallax background image 										  	    */
/* ------------------------------------------------------------------------ */
	 jQuery('.onetone-parallax').parallax("50%", 0.1);

/* ------------------------------------------------------------------------ */
/*  Section Heading Color													*/
/* ------------------------------------------------------------------------ */

 jQuery('section').each(function(){
					var headingcolor = jQuery(this).data("headingcolor");
					if(headingcolor != ""){
						jQuery(this).find("h1,h2,h3,h4,h5,h6").css("color",headingcolor);
						}
				});

 jQuery(".section-banner").each(function(){
  var videoHeight =jQuery(window).height();
  if( typeof onetone_params.header_cover_video_background !== 'undefined' && onetone_params.header_cover_video_background == '0'){
  var videoHeight = videoHeight-jQuery('.sticky-header').height();
  }
  if( typeof onetone_video !== 'undefined' && typeof onetone_video.header_cover_video_background_html5 !== 'undefined' && onetone_video.header_cover_video_background_html5 == '0'){

  var videoHeight = videoHeight-jQuery('.sticky-header').height();
  jQuery(this).find("#big-video-wrap").css({"position":"absolute"});

  }
  jQuery(this).css({"min-height":videoHeight});
  jQuery(this).find("#tubular-container,#big-video-vid").css({"height":videoHeight});

  });

 // BACK TO TOP
 jQuery(window).scroll(function(){
		if(jQuery(window).scrollTop() > 200){
			jQuery("#back-to-top").fadeIn(200);
		} else{
			jQuery("#back-to-top").fadeOut(200);
		}
	});

  	jQuery('#back-to-top, .back-to-top').click(function() {
		  jQuery('html, body').animate({ scrollTop:0 }, '800');
		  return false;
	});

 });

// Generated by CoffeeScript 1.6.2
/*!
 Waypoints - v2.0.5
Copyright (c) 2011-2014 Caleb Troughton
Licensed under the MIT license.
https://github.com/imakewebthings/jquery-waypoints/blob/master/licenses.txt
*/


(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    __slice = [].slice;

  (function(root, factory) {
    if (typeof define === 'function' && define.amd) {
      return define('waypoints', ['jquery'], function($) {
        return factory($, root);
      });
    } else {
      return factory(root.jQuery, root);
    }
  })(window, function($, window) {
    var $w, Context, Waypoint, allWaypoints, contextCounter, contextKey, contexts, isTouch, jQMethods, methods, resizeEvent, scrollEvent, waypointCounter, waypointKey, wp, wps;

    $w = $(window);
    isTouch = __indexOf.call(window, 'ontouchstart') >= 0;
    allWaypoints = {
      horizontal: {},
      vertical: {}
    };
    contextCounter = 1;
    contexts = {};
    contextKey = 'waypoints-context-id';
    resizeEvent = 'resize.waypoints';
    scrollEvent = 'scroll.waypoints';
    waypointCounter = 1;
    waypointKey = 'waypoints-waypoint-ids';
    wp = 'waypoint';
    wps = 'waypoints';
    Context = (function() {
      function Context($element) {
        var _this = this;

        this.$element = $element;
        this.element = $element[0];
        this.didResize = false;
        this.didScroll = false;
        this.id = 'context' + contextCounter++;
        this.oldScroll = {
          x: $element.scrollLeft(),
          y: $element.scrollTop()
        };
        this.waypoints = {
          horizontal: {},
          vertical: {}
        };
        this.element[contextKey] = this.id;
        contexts[this.id] = this;
        $element.bind(scrollEvent, function() {
          var scrollHandler;

          if (!(_this.didScroll || isTouch)) {
            _this.didScroll = true;
            scrollHandler = function() {
              _this.doScroll();
              return _this.didScroll = false;
            };
            return window.setTimeout(scrollHandler, $[wps].settings.scrollThrottle);
          }
        });
        $element.bind(resizeEvent, function() {
          var resizeHandler;

          if (!_this.didResize) {
            _this.didResize = true;
            resizeHandler = function() {
              $[wps]('refresh');
              return _this.didResize = false;
            };
            return window.setTimeout(resizeHandler, $[wps].settings.resizeThrottle);
          }
        });
      }

      Context.prototype.doScroll = function() {
        var axes,
          _this = this;

        axes = {
          horizontal: {
            newScroll: this.$element.scrollLeft(),
            oldScroll: this.oldScroll.x,
            forward: 'right',
            backward: 'left'
          },
          vertical: {
            newScroll: this.$element.scrollTop(),
            oldScroll: this.oldScroll.y,
            forward: 'down',
            backward: 'up'
          }
        };
        if (isTouch && (!axes.vertical.oldScroll || !axes.vertical.newScroll)) {
          $[wps]('refresh');
        }
        $.each(axes, function(aKey, axis) {
          var direction, isForward, triggered;

          triggered = [];
          isForward = axis.newScroll > axis.oldScroll;
          direction = isForward ? axis.forward : axis.backward;
          $.each(_this.waypoints[aKey], function(wKey, waypoint) {
            var _ref, _ref1;

            if ((axis.oldScroll < (_ref = waypoint.offset) && _ref <= axis.newScroll)) {
              return triggered.push(waypoint);
            } else if ((axis.newScroll < (_ref1 = waypoint.offset) && _ref1 <= axis.oldScroll)) {
              return triggered.push(waypoint);
            }
          });
          triggered.sort(function(a, b) {
            return a.offset - b.offset;
          });
          if (!isForward) {
            triggered.reverse();
          }
          return $.each(triggered, function(i, waypoint) {
            if (waypoint.options.continuous || i === triggered.length - 1) {
              return waypoint.trigger([direction]);
            }
          });
        });
        return this.oldScroll = {
          x: axes.horizontal.newScroll,
          y: axes.vertical.newScroll
        };
      };

      Context.prototype.refresh = function() {
        var axes, cOffset, isWin,
          _this = this;

        isWin = $.isWindow(this.element);
        cOffset = this.$element.offset();
        this.doScroll();
        axes = {
          horizontal: {
            contextOffset: isWin ? 0 : cOffset.left,
            contextScroll: isWin ? 0 : this.oldScroll.x,
            contextDimension: this.$element.width(),
            oldScroll: this.oldScroll.x,
            forward: 'right',
            backward: 'left',
            offsetProp: 'left'
          },
          vertical: {
            contextOffset: isWin ? 0 : cOffset.top,
            contextScroll: isWin ? 0 : this.oldScroll.y,
            contextDimension: isWin ? $[wps]('viewportHeight') : this.$element.height(),
            oldScroll: this.oldScroll.y,
            forward: 'down',
            backward: 'up',
            offsetProp: 'top'
          }
        };
        return $.each(axes, function(aKey, axis) {
          return $.each(_this.waypoints[aKey], function(i, waypoint) {
            var adjustment, elementOffset, oldOffset, _ref, _ref1;

            adjustment = waypoint.options.offset;
            oldOffset = waypoint.offset;
            elementOffset = $.isWindow(waypoint.element) ? 0 : waypoint.$element.offset()[axis.offsetProp];
            if ($.isFunction(adjustment)) {
              adjustment = adjustment.apply(waypoint.element);
            } else if (typeof adjustment === 'string') {
              adjustment = parseFloat(adjustment);
              if (waypoint.options.offset.indexOf('%') > -1) {
                adjustment = Math.ceil(axis.contextDimension * adjustment / 100);
              }
            }
            waypoint.offset = elementOffset - axis.contextOffset + axis.contextScroll - adjustment;
            if ((waypoint.options.onlyOnScroll && (oldOffset != null)) || !waypoint.enabled) {
              return;
            }
            if (oldOffset !== null && (oldOffset < (_ref = axis.oldScroll) && _ref <= waypoint.offset)) {
              return waypoint.trigger([axis.backward]);
            } else if (oldOffset !== null && (oldOffset > (_ref1 = axis.oldScroll) && _ref1 >= waypoint.offset)) {
              return waypoint.trigger([axis.forward]);
            } else if (oldOffset === null && axis.oldScroll >= waypoint.offset) {
              return waypoint.trigger([axis.forward]);
            }
          });
        });
      };

      Context.prototype.checkEmpty = function() {
        if ($.isEmptyObject(this.waypoints.horizontal) && $.isEmptyObject(this.waypoints.vertical)) {
          this.$element.unbind([resizeEvent, scrollEvent].join(' '));
          return delete contexts[this.id];
        }
      };

      return Context;

    })();
    Waypoint = (function() {
      function Waypoint($element, context, options) {
        var idList, _ref;

        if (options.offset === 'bottom-in-view') {
          options.offset = function() {
            var contextHeight;

            contextHeight = $[wps]('viewportHeight');
            if (!$.isWindow(context.element)) {
              contextHeight = context.$element.height();
            }
            return contextHeight - $(this).outerHeight();
          };
        }
        this.$element = $element;
        this.element = $element[0];
        this.axis = options.horizontal ? 'horizontal' : 'vertical';
        this.callback = options.handler;
        this.context = context;
        this.enabled = options.enabled;
        this.id = 'waypoints' + waypointCounter++;
        this.offset = null;
        this.options = options;
        context.waypoints[this.axis][this.id] = this;
        allWaypoints[this.axis][this.id] = this;
        idList = (_ref = this.element[waypointKey]) != null ? _ref : [];
        idList.push(this.id);
        this.element[waypointKey] = idList;
      }

      Waypoint.prototype.trigger = function(args) {
        if (!this.enabled) {
          return;
        }
        if (this.callback != null) {
          this.callback.apply(this.element, args);
        }
        if (this.options.triggerOnce) {
          return this.destroy();
        }
      };

      Waypoint.prototype.disable = function() {
        return this.enabled = false;
      };

      Waypoint.prototype.enable = function() {
        this.context.refresh();
        return this.enabled = true;
      };

      Waypoint.prototype.destroy = function() {
        delete allWaypoints[this.axis][this.id];
        delete this.context.waypoints[this.axis][this.id];
        return this.context.checkEmpty();
      };

      Waypoint.getWaypointsByElement = function(element) {
        var all, ids;

        ids = element[waypointKey];
        if (!ids) {
          return [];
        }
        all = $.extend({}, allWaypoints.horizontal, allWaypoints.vertical);
        return $.map(ids, function(id) {
          return all[id];
        });
      };

      return Waypoint;

    })();
    methods = {
      init: function(f, options) {
        var _ref;

        options = $.extend({}, $.fn[wp].defaults, options);
        if ((_ref = options.handler) == null) {
          options.handler = f;
        }
        this.each(function() {
          var $this, context, contextElement, _ref1;

          $this = $(this);
          contextElement = (_ref1 = options.context) != null ? _ref1 : $.fn[wp].defaults.context;
          if (!$.isWindow(contextElement)) {
            contextElement = $this.closest(contextElement);
          }
          contextElement = $(contextElement);
          context = contexts[contextElement[0][contextKey]];
          if (!context) {
            context = new Context(contextElement);
          }
          return new Waypoint($this, context, options);
        });
        $[wps]('refresh');
        return this;
      },
      disable: function() {
        return methods._invoke.call(this, 'disable');
      },
      enable: function() {
        return methods._invoke.call(this, 'enable');
      },
      destroy: function() {
        return methods._invoke.call(this, 'destroy');
      },
      prev: function(axis, selector) {
        return methods._traverse.call(this, axis, selector, function(stack, index, waypoints) {
          if (index > 0) {
            return stack.push(waypoints[index - 1]);
          }
        });
      },
      next: function(axis, selector) {
        return methods._traverse.call(this, axis, selector, function(stack, index, waypoints) {
          if (index < waypoints.length - 1) {
            return stack.push(waypoints[index + 1]);
          }
        });
      },
      _traverse: function(axis, selector, push) {
        var stack, waypoints;

        if (axis == null) {
          axis = 'vertical';
        }
        if (selector == null) {
          selector = window;
        }
        waypoints = jQMethods.aggregate(selector);
        stack = [];
        this.each(function() {
          var index;

          index = $.inArray(this, waypoints[axis]);
          return push(stack, index, waypoints[axis]);
        });
        return this.pushStack(stack);
      },
      _invoke: function(method) {
        this.each(function() {
          var waypoints;

          waypoints = Waypoint.getWaypointsByElement(this);
          return $.each(waypoints, function(i, waypoint) {
            waypoint[method]();
            return true;
          });
        });
        return this;
      }
    };
    $.fn[wp] = function() {
      var args, method;

      method = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      if (methods[method]) {
        return methods[method].apply(this, args);
      } else if ($.isFunction(method)) {
        return methods.init.apply(this, arguments);
      } else if ($.isPlainObject(method)) {
        return methods.init.apply(this, [null, method]);
      } else if (!method) {
        return $.error("jQuery Waypoints needs a callback function or handler option.");
      } else {
        return $.error("The " + method + " method does not exist in jQuery Waypoints.");
      }
    };
    $.fn[wp].defaults = {
      context: window,
      continuous: true,
      enabled: true,
      horizontal: false,
      offset: 0,
      triggerOnce: false
    };
    jQMethods = {
      refresh: function() {
        return $.each(contexts, function(i, context) {
          return context.refresh();
        });
      },
      viewportHeight: function() {
        var _ref;

        return (_ref = window.innerHeight) != null ? _ref : $w.height();
      },
      aggregate: function(contextSelector) {
        var collection, waypoints, _ref;

        collection = allWaypoints;
        if (contextSelector) {
          collection = (_ref = contexts[$(contextSelector)[0][contextKey]]) != null ? _ref.waypoints : void 0;
        }
        if (!collection) {
          return [];
        }
        waypoints = {
          horizontal: [],
          vertical: []
        };
        $.each(waypoints, function(axis, arr) {
          $.each(collection[axis], function(key, waypoint) {
            return arr.push(waypoint);
          });
          arr.sort(function(a, b) {
            return a.offset - b.offset;
          });
          waypoints[axis] = $.map(arr, function(waypoint) {
            return waypoint.element;
          });
          return waypoints[axis] = $.unique(waypoints[axis]);
        });
        return waypoints;
      },
      above: function(contextSelector) {
        if (contextSelector == null) {
          contextSelector = window;
        }
        return jQMethods._filter(contextSelector, 'vertical', function(context, waypoint) {
          return waypoint.offset <= context.oldScroll.y;
        });
      },
      below: function(contextSelector) {
        if (contextSelector == null) {
          contextSelector = window;
        }
        return jQMethods._filter(contextSelector, 'vertical', function(context, waypoint) {
          return waypoint.offset > context.oldScroll.y;
        });
      },
      left: function(contextSelector) {
        if (contextSelector == null) {
          contextSelector = window;
        }
        return jQMethods._filter(contextSelector, 'horizontal', function(context, waypoint) {
          return waypoint.offset <= context.oldScroll.x;
        });
      },
      right: function(contextSelector) {
        if (contextSelector == null) {
          contextSelector = window;
        }
        return jQMethods._filter(contextSelector, 'horizontal', function(context, waypoint) {
          return waypoint.offset > context.oldScroll.x;
        });
      },
      enable: function() {
        return jQMethods._invoke('enable');
      },
      disable: function() {
        return jQMethods._invoke('disable');
      },
      destroy: function() {
        return jQMethods._invoke('destroy');
      },
      extendFn: function(methodName, f) {
        return methods[methodName] = f;
      },
      _invoke: function(method) {
        var waypoints;

        waypoints = $.extend({}, allWaypoints.vertical, allWaypoints.horizontal);
        return $.each(waypoints, function(key, waypoint) {
          waypoint[method]();
          return true;
        });
      },
      _filter: function(selector, axis, test) {
        var context, waypoints;

        context = contexts[$(selector)[0][contextKey]];
        if (!context) {
          return [];
        }
        waypoints = [];
        $.each(context.waypoints[axis], function(i, waypoint) {
          if (test(context, waypoint)) {
            return waypoints.push(waypoint);
          }
        });
        waypoints.sort(function(a, b) {
          return a.offset - b.offset;
        });
        return $.map(waypoints, function(waypoint) {
          return waypoint.element;
        });
      }
    };
    $[wps] = function() {
      var args, method;

      method = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      if (jQMethods[method]) {
        return jQMethods[method].apply(null, args);
      } else {
        return jQMethods.aggregate.call(null, method);
      }
    };
    $[wps].settings = {
      resizeThrottle: 100,
      scrollThrottle: 30
    };
    return $w.on('load.waypoints', function() {
      return $[wps]('refresh');
    });
  });

}).call(this);


/*
Plugin: jQuery Parallax
Version 1.1.3
Author: Ian Lunn
Twitter: @IanLunn
Author URL: http://www.ianlunn.co.uk/
Plugin URL: http://www.ianlunn.co.uk/plugins/jquery-parallax/

Dual licensed under the MIT and GPL licenses:
http://www.opensource.org/licenses/mit-license.php
http://www.gnu.org/licenses/gpl.html
*/

(function( $ ){
	var $window = $(window);
	var windowHeight = $window.height();

	$window.resize(function () {
		windowHeight = $window.height();
	});

	$.fn.parallax = function(xpos, speedFactor, outerHeight) {
		var $this = $(this);
		var getHeight;
		var firstTop;
		var paddingTop = 0;

		//get the starting position of each element to have parallax applied to it
		$this.each(function(){
		    firstTop = $this.offset().top;
		});

		if (outerHeight) {
			getHeight = function(jqo) {
				return jqo.outerHeight(true);
			};
		} else {
			getHeight = function(jqo) {
				return jqo.height();
			};
		}

		// setup defaults if arguments aren't specified
		if (arguments.length < 1 || xpos === null) xpos = "50%";
		if (arguments.length < 2 || speedFactor === null) speedFactor = 0.1;
		if (arguments.length < 3 || outerHeight === null) outerHeight = true;

		// function to be called whenever the window is scrolled or resized
		function update(){
			var pos = $window.scrollTop();

			$this.each(function(){
				var $element = $(this);
				var top = $element.offset().top;
				var height = getHeight($element);

				// Check if totally above or totally below viewport
				if (top + height < pos || top > pos + windowHeight) {
					return;
				}

				$this.css('backgroundPosition', xpos + " " + Math.round((firstTop - pos) * speedFactor) + "px");
			});
		}

		$window.bind('scroll', update).resize(update);
		update();
	};
})(jQuery);

/*========================================================================================
 * SmoothScroll v0.9.9
 * Licensed under the terms of the MIT license.
 * People involved
 * - Balazs Galambosi: maintainer (CHANGELOG.txt)
 * - Patrick Brunner (patrickb1991@gmail.com)
 * - Michael Herf: ssc_pulse Algorithm
 *========================================================================================*/
;(function($){

    // Scroll Variables (tweakable)
    var ssc_framerate = 150; // [Hz]
    var ssc_animtime  = 500; // [px]
    var ssc_stepsize  = 150; // [px]

    // ssc_pulse (less tweakable)
    // ratio of "tail" to "acceleration"
    var ssc_pulseAlgorithm = true;
    var ssc_pulseScale     = 6;
    var ssc_pulseNormalize = 1;

    // Keyboard Settings
    var ssc_keyboardsupport = true;
    var ssc_arrowscroll     = 50; // [px]

    // Other Variables
    var ssc_frame = false;
    var ssc_direction = { x: 0, y: 0 };
    var ssc_initdone  = false;
    var ssc_fixedback = true;
    var ssc_root = document.documentElement;
    var ssc_activeElement;

    var ssc_key = { left: 37, up: 38, right: 39, down: 40, spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36 };

    function ssc_init(){if(!document.body)return;var a=document.body;var b=document.documentElement;var c=window.innerHeight;var d=a.scrollHeight;ssc_root=(document.compatMode.indexOf('CSS')>=0)?b:a;ssc_activeElement=a;ssc_initdone=true;if(top!=self){ssc_frame=true}else if(d>c&&(a.offsetHeight<=c||b.offsetHeight<=c)){ssc_root.style.height="auto";if(ssc_root.offsetHeight<=c){var e=document.createElement("div");e.style.clear="both";a.appendChild(e)}}if(!ssc_fixedback){a.style.backgroundAttachment="scroll";b.style.backgroundAttachment="scroll"}if(ssc_keyboardsupport){ssc_addEvent("keydown",ssc_keydown)}}var ssc_que=[];var ssc_pending=false;function ssc_scrollArray(k,l,m,n){n||(n=1000);ssc_directionCheck(l,m);ssc_que.push({x:l,y:m,lastX:(l<0)?0.99:-0.99,lastY:(m<0)?0.99:-0.99,start:+new Date});if(ssc_pending){return};var o=function(){var a=+new Date;var b=0;var c=0;for(var i=0;i<ssc_que.length;i++){var d=ssc_que[i];var e=a-d.start;var f=(e>=ssc_animtime);var g=(f)?1:e/ssc_animtime;if(ssc_pulseAlgorithm){g=ssc_pulse(g)}var x=(d.x*g-d.lastX)>>0;var y=(d.y*g-d.lastY)>>0;b+=x;c+=y;d.lastX+=x;d.lastY+=y;if(f){ssc_que.splice(i,1);i--}}if(l){var h=k.scrollLeft;k.scrollLeft+=b;if(b&&k.scrollLeft===h){l=0}}if(m){var j=k.scrollTop;k.scrollTop+=c;if(c&&k.scrollTop===j){m=0}}if(!l&&!m){ssc_que=[]}if(ssc_que.length){setTimeout(o,n/ssc_framerate+1)}else{ssc_pending=false}};setTimeout(o,0);ssc_pending=true}function ssc_wheel(a){if(!ssc_initdone){init()}var b=a.target;var c=ssc_overflowingAncestor(b);if(!c||a.defaultPrevented||ssc_isNodeName(ssc_activeElement,"embed")||(ssc_isNodeName(b,"embed")&&/\.pdf/i.test(b.src))){return true}var d=a.wheelDeltaX||0;var e=a.wheelDeltaY||0;if(!d&&!e){e=a.wheelDelta||0}if(Math.abs(d)>1.2){d*=ssc_stepsize/120}if(Math.abs(e)>1.2){e*=ssc_stepsize/120}ssc_scrollArray(c,-d,-e);a.preventDefault()}function ssc_keydown(a){var b=a.target;var c=a.ctrlKey||a.altKey||a.metaKey;if(/input|textarea|embed/i.test(b.nodeName)||b.isContentEditable||a.defaultPrevented||c){return true}if(ssc_isNodeName(b,"button")&&a.keyCode===ssc_key.spacebar){return true}var d,x=0,y=0;var e=ssc_overflowingAncestor(ssc_activeElement);var f=e.clientHeight;if(e==document.body){f=window.innerHeight}switch(a.keyCode){case ssc_key.up:y=-ssc_arrowscroll;break;case ssc_key.down:y=ssc_arrowscroll;break;case ssc_key.spacebar:d=a.shiftKey?1:-1;y=-d*f*0.9;break;case ssc_key.pageup:y=-f*0.9;break;case ssc_key.pagedown:y=f*0.9;break;case ssc_key.home:y=-e.scrollTop;break;case ssc_key.end:var g=e.scrollHeight-e.scrollTop-f;y=(g>0)?g+10:0;break;case ssc_key.left:x=-ssc_arrowscroll;break;case ssc_key.right:x=ssc_arrowscroll;break;default:return true}ssc_scrollArray(e,x,y);a.preventDefault()}function ssc_mousedown(a){ssc_activeElement=a.target}var ssc_cache={};setInterval(function(){ssc_cache={}},10*1000);var ssc_uniqueID=(function(){var i=0;return function(a){return a.ssc_uniqueID||(a.ssc_uniqueID=i++)}})();function ssc_setCache(a,b){for(var i=a.length;i--;)ssc_cache[ssc_uniqueID(a[i])]=b;return b}function ssc_overflowingAncestor(a){var b=[];var c=ssc_root.scrollHeight;do{var d=ssc_cache[ssc_uniqueID(a)];if(d){return ssc_setCache(b,d)}b.push(a);if(c===a.scrollHeight){if(!ssc_frame||ssc_root.clientHeight+10<c){return ssc_setCache(b,document.body)}}else if(a.clientHeight+10<a.scrollHeight){overflow=getComputedStyle(a,"").getPropertyValue("overflow");if(overflow==="scroll"||overflow==="auto"){return ssc_setCache(b,a)}}}while(a=a.parentNode)}function ssc_addEvent(a,b,c){window.addEventListener(a,b,(c||false))}function ssc_removeEvent(a,b,c){window.removeEventListener(a,b,(c||false))}function ssc_isNodeName(a,b){return a.nodeName.toLowerCase()===b.toLowerCase()}function ssc_directionCheck(x,y){x=(x>0)?1:-1;y=(y>0)?1:-1;if(ssc_direction.x!==x||ssc_direction.y!==y){ssc_direction.x=x;ssc_direction.y=y;ssc_que=[]}}function ssc_pulse_(x){var a,start,expx;x=x*ssc_pulseScale;if(x<1){a=x-(1-Math.exp(-x))}else{start=Math.exp(-1);x-=1;expx=1-Math.exp(-x);a=start+(expx*(1-start))}return a*ssc_pulseNormalize}function ssc_pulse(x){if(x>=1)return 1;if(x<=0)return 0;if(ssc_pulseNormalize==1){ssc_pulseNormalize/=ssc_pulse_(1)}return ssc_pulse_(x)}$.browser.chrome=/chrome/.test(navigator.userAgent.toLowerCase());if($.browser.chrome){ssc_addEvent("mousedown",ssc_mousedown);ssc_addEvent("mousewheel",ssc_wheel);ssc_addEvent("load",ssc_init)}

})(jQuery);
