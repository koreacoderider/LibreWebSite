var isMobile = {
	Android: function() {
		return navigator.userAgent.match(/Android/i);
	},
	BlackBerry: function() {
		return navigator.userAgent.match(/BlackBerry/i);
	},
	iOS: function() {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	},
	Opera: function() {
		return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows: function() {
		return navigator.userAgent.match(/IEMobile/i);
	},
	any: function() {
		return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
	},
	noios: function() {
		return (isMobile.Android() || isMobile.BlackBerry() || isMobile.Opera() || isMobile.Windows());
	}
};
if (isMobile.iOS()) {
	var h = $(window).innerHeight();
	$('.hero_banner').css('height', h + 'px');
}
var $window = jQuery(window);
jQuery(document).ready(function($) {
	var scroll = $('.info_content').offset().top;
	// $(".prime_head").lettering();
	$('.hero_banner .ct').click(function(event) {
		TweenMax.to($window, 1.5, {
			ease: Expo.easeInOut,
			scrollTo:{
				y: scroll,
				autoKill: true
			}
		});
	});
	jQuery("#reload").click(function() {
		jQuery("img#img").remove();
		var id = Math.random();
		jQuery('<img id="img" src="./captcha.php?id='+id+'"/>').prependTo("#imgdiv");
		id ='';
	});
	jQuery("#contact_form").validate({
		ignore:'',
		rules: {
			name: {
				required: true
			},
			email: {
				required: true,
				email: true
			},
			captcha: {
				required: true
			}
		},
		messages: {
			email: {
				required: "Email can’t be blank or must be in the format of name@domain.com",
			},
			name: {
				required: "First name can’t be blank."
			},
			captcha: {
				required: "Please enter captcha"
			},
		},
		submitHandler: function(form) {
			var captcha = jQuery("#captcha").val();
			if(captcha == ''){
				alert('please enter captcha');
				return false;
			}
			var dataString = 'captcha=' + captcha;
			jQuery.ajax({
				type: "POST",
				url: "./verify.php",
				data: dataString,
				success: function(html) {
					if(html == "success"){
					var name = jQuery("#name").val();
					var email = jQuery("#email").val();
					jQuery('.error_msg').text("Please Wait...");
						//Email send
						jQuery.ajax({
								type: "POST",
								url: "./sendmail.php",
								data: {Name:name, Email:email},
								success: function(data) {
									if(data == "emailSend"){
										jQuery('.error_msg').text("Thank You!");
										 jQuery('#contact_form')[0].reset();
									}else{
										jQuery('.error_msg').text("Oops! Something went wrong and we couldn't send your message.");
										return false;
									}
								}
							});
					}else{
						jQuery('.error_msg').text('Please enter correct captcha!')
						return false;
					}
				}
			});
			return false;
		},
		onkeyup: false
	});
});
$('body').imagesLoaded( {
	background: true
},function(){})
.done( function( instance ) {
	$('.hero_banner').addClass('active');
	setTimeout(function(){
		$('.hero_banner .ct').addClass('active');
	},2000);
	// $('#hero_video')[0].play();
	var video = document.querySelector('video');
	enableInlineVideo(video);
	var a = 0;
	setInterval(function() {
		a -= 1,
		$(".submit_btn:hover").css("background-position", -a + "px bottom")
	}, 40)
	$('.prime_head').each(function(index, el) {
		var self = $(this);
		var letters = self.find('span')
		var duration = self.attr("data-duration");
		var tl = new TimelineMax({ paused: true, reversed: true });
		tl.staggerFrom(self, duration, {
			opacity: 0,
			y: 40,
			ease: Expo.easeOut
		}, 0.05);
		self.waypoint(function (direction) {
			if(direction == 'down') {
				tl.timeScale(1);
				tl.play();
			}
		}, {
			offset:'95%'
		});
		self.waypoint(function (direction) {
			if(direction == 'up') {
				tl.timeScale(10);
				tl.reverse();
			}
		}, {
			offset:'100%'
		});
	});
	var mvc = {
		views : {}
	};
	mvc.views.appear = new (function () {
		this.init = function(){
			jQuery('.appear').each(function () {
				var $appear = jQuery(this);
				$appear.wrap("<div class='appearContainer'></div>");
				var $appearContainer = $appear.parent();
				var $detect = $appearContainer;
				var offset = '95%';
				var delay = 0;
				var duration = 2;
				if($appear.data('appear-stagger') != undefined) {
					var $appearStagger = jQuery($appear.data('appear-stagger'));
					$appearStagger.wrap("<div class='appearContainer'></div>");
					$appear = $appear.add($appearStagger);
					$appearContainer = $appearContainer.add($appearStagger.parent());
				}
				if($appear.data('appear-detect') != undefined) {
					$detect = jQuery($appear.data('appear-detect'));
				}
				if($appear.data('appear-offset') != undefined) {
					offset = $appear.data('appear-offset');
				}
				if($appear.data('appear-delay') != undefined) {
					delay = $appear.data('appear-delay');
				}
				if($appear.data('appear-duration') != undefined) {
					duration = $appear.data('appear-duration');
				}
				var attr = {
					ease:Expo.easeOut,
					autoRound:false
				};
				if($appear.hasClass('mask')) {
					$appearContainer.css({
						overflow:'hidden'
					});
					attr.opacity = 0;
				} else {
					attr.opacity = 0;
				}

				// CLS
				if($appear.hasClass('fromBottom')) {
					attr.y = 20;
				} else if($appear.hasClass('fromTop')) {
					attr.y = '-104%';
				} else if($appear.hasClass('fromLeft')) {
					attr.x = '-104%';
				} else if($appear.hasClass('fromRight')) {
					attr.x = '104%';
				}

				if($appear.hasClass('scale')) {
					attr.scale = 1.15;
				}
				if($appear.data('appear-scale') != undefined) {
					attr.scale = $appear.data('appear-scale');
				}
				if($appear.data('appear-x') != undefined) {
					attr.x = $appear.data('appear-x');
				}
				if($appear.data('appear-y') != undefined) {
					attr.y = $appear.data('appear-y');
				}

				var tl = new TimelineMax();
				tl.staggerFrom($appear, duration, attr,.5);
				tl.stop();

				// detect
				if($appear.data('appear-detect') != undefined) {
					$detect = jQuery($appear.data('appear-detect'));
				}

				// init waypoint
				$detect.waypoint(function (direction) {
					if(direction == 'down') {
						tl.timeScale(1);
						tl.play();
					}
				}, {
					offset:offset
				});
				// init waypoint
				$detect.waypoint(function (direction) {
					if(direction == 'up') {
						tl.timeScale(10);
						tl.reverse();
					}
				}, {
					offset:'100%'
				});
			});
		};
	});
	mvc.views.appear.init();
});
jQuery(window).scroll(function(event) {
	var st = $(window).scrollTop();
	var a = $('.hero_banner')
	TweenLite.set(a, {
		y: st/3
	});
});
console.log("%cCoded with love by @vishal9369", "border-radius:4px;color:#fff;line-height:40px;padding:10px 32px;background:#1a1a1a;");