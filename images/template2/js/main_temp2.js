
$(window).ready(function(e) {
	
});


$(window).load(function(e) {
	tans_topmenu();
    $(".main_visual .t_pos").fadeIn();
});


$(window).resize(function(){
  var windowWidth = $( window ).width();
   if(windowWidth > 1024) {
    $(".black").fadeOut();
	$(".m_menu_sub").hide();
    }
});

$(window).scroll(function() {
    if ($(this).scrollTop() > 500) {
        $('.move_top_btn').fadeIn();
    } else {
        $('.move_top_btn').fadeOut();
    }
});

// 비주얼 효과
$.fn.visual_effect = function(){
	var obj = this;
	var img = obj.find(".imgs li");
	var other = obj.find(".other p");
	var page = obj.find(".paging li");
	var total = img.length;
	var old = 0;
	var cur = 1;
	var delay = 5000;

	var tid;
	function startFade(){
		if(old){
			img.eq(old-1).stop().fadeOut(2000);
			img.eq(old-1).find("p").not(".logo").stop().animate({"opacity":0}, {"duration":1000});
		}
		img.eq(cur-1).stop().fadeIn(2000);
		page.removeClass("on").eq(cur-1).addClass("on");
	}
	function autoFade(){
		old = cur;
		if(cur == total) cur = 1;
		else cur++;
		startFade();
	}
	function startTimer(){
		tid = setInterval(autoFade, delay);
	}
	function stopTimer(){
		clearInterval(tid);
	}
	function init(){
		other.on("mouseover", stopTimer).on("mouseout", startTimer).on("click", function(){
			var idx = $(this).index();
			if(idx) autoFade();
			else{
				old = cur;
				if(cur == 1) cur = total;
				else cur--;
				startFade();
			}
		});
		page.on("mouseover", stopTimer).on("mouseout", startTimer).on("click", function(){
			var idx = $(this).index() + 1;
			if(cur != idx){
				old = cur;
				cur = idx;
				startFade();
			}
		});
		startFade();
		startTimer();
	}
	init();
}

$(function(){
	$("#visual").visual_effect();
});

$(function(){
	$(".s_btn1").click(function() {
	  var wrappos = $(".main_s1").offset().top -123; 
	  $('body,html').stop().animate({scrollTop: wrappos }, 500);
	});

	$(".s_btn2").click(function() {
	  var wrappos = $(".main_s2").offset().top -123; 
	  $('body,html').stop().animate({scrollTop: wrappos }, 500);
	});

	$(".s_btn3").click(function() {
	  var wrappos = $(".main_s3").offset().top -123; 
	  $('body,html').stop().animate({scrollTop: wrappos }, 500);
	});

	$(".s_btn4").click(function() {
	  var wrappos = $(".main_s4").offset().top -123; 
	  $('body,html').stop().animate({scrollTop: wrappos }, 500);
	});

	$(".s_btn5").click(function() {
	  var wrappos = $(".main_s5").offset().top -123; 
	  $('body,html').stop().animate({scrollTop: wrappos }, 500);
	});

	$(".main_con2 .menu span").click(function() {
		$(".main_con2 .menu span").removeClass("on");
		$(this).addClass("on");
		$(this).parent().parent().find(".bbs_con .bbs_con1").hide();
		$(this).parent().parent().find(".bbs_con .bbs_con1").eq($(this).index()).show();
	});

	$(".board_pop1").click(function() {
		$(".board_popup").fadeIn();
		$("body").css({"overflow-y" : "hidden"});
	});

	$(".pop_close_btn").click(function() {
		$(".board_popup").fadeOut();
		$("body").css({"overflow-y" : "visible"});
	});

    $(".bnt_pop_view").click(function(e){
		$(".black").fadeIn();
		$(".pop_view").fadeIn();
		$(".pop_view").css({"top" : e.pageY});
	});

	$(".pop_view .con .tit img").click(function(e){
		$(".black").fadeOut();
		$(".pop_view").fadeOut();
	});
    
    $(".btn_menu_view").click(function(e){
		$(".black").fadeIn();
		$(".menu_detail").fadeIn();
		$(".menu_detail").css({"top" : e.pageY});
	});

	$(".menu_detail .con .tit img").click(function(e){
		$(".black").fadeOut();
		$(".menu_detail").fadeOut();
	});

	$(".main_con_3 .menu span").click(function() {
		$(".main_con_3 .menu span").removeClass("on");
		$(this).addClass("on");
	});
	
    $(".m_menu").click(function(e){
		$(".black").fadeIn();
		$(".m_menu_sub").show();
	});

	$(".m_menu_sub").click(function(e){
		$(".black").fadeOut();
		$(".m_menu_sub").hide();
	});
	
	$(".move_top_btn").click(function() {
        $('html, body').animate({
            scrollTop : 0
        }, 400);
        return false;
    });
	
});

function sticky_relocate() {
    var window_top = $(window).scrollTop();

	var main_con_top1 = $(".main_s1").offset().top - 308;
	var main_con_top2 = $(".main_s2").offset().top - 308;
	var main_con_top3 = $(".main_s3").offset().top - 308;
	var main_con_top4 = $(".main_s4").offset().top - 308;
    var main_con_top5 = $(".main_s5").offset().top - 308;
 
    if (window_top == 0) {
       $(".s_btn1").removeClass("on");
    }
	if (window_top > main_con_top1) {
		$(".top_menu a").removeClass("on");
		$(".s_btn1").addClass("on");
	}

	if (window_top > main_con_top2) {
		$(".top_menu a").removeClass("on");
		$(".s_btn2").addClass("on");
	}

	if (window_top > main_con_top3) {
		$(".top_menu a").removeClass("on");
		$(".s_btn3").addClass("on");
	}

	if (window_top > main_con_top4) {
		$(".top_menu a").removeClass("on");
		$(".s_btn4").addClass("on");
	}

	if (window_top > main_con_top5) {
		$(".top_menu a").removeClass("on");
		$(".s_btn5").addClass("on");
	}
}

$(function () {
    $(window).scroll(sticky_relocate);
    sticky_relocate();
});

function tans_topmenu() {

    var $window = $(window);
	var $header = $('.top_area');

    
    if ($window.scrollTop() > $header.height()) {
        $header.addClass('transOn');
    } else {
        $header.removeClass('transOn');
    }

    $(window).on('scroll', function() {

        if( $('body').hasClass('open_menu') ) { return; }

        if ($window.scrollTop() > $header.height()) {
            $header.addClass('transOn');
        } else {
            $header.removeClass('transOn');
        }

	});

}