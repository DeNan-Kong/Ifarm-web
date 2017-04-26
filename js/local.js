$(document).ready(function() {
	$("li").hover(function() {
		$(this).addClass("ons")
	}, function() {
		$(this).removeClass("ons")
	}), jQuery(".slideTxtBox").slide({
		trigger: "click",
		effect: "fold",
		easing: "swing",
		delayTime: 700
	}), $(".slideTxtBox .hd ul li").each(function() {
		$(this).on("click", function() {
			$(this).hide().siblings().show()
		})
	}), jQuery(".game163").slide({
		mainCell: ".bigImg",
		effect: "fold",
		autoPlay: !0,
		delayTime: 200
	}), jQuery(".focusBox1,.focusBox3,.focusBox5").slide({
		autoPage: !0,
		titCell: ".hd",
		mainCell: ".pic",
		effect: "left",
		autoPlay: !0,
		delayTime: 400
	}), jQuery(".focusBox2,.focusBox4,.focusBox6").slide({
		autoPage: !0,
		titCell: ".hd",
		mainCell: ".pic",
		effect: "left",
		autoPlay: !0,
		delayTime: 450,
		interTime: 3e3
	}), $(window).scroll(function() {
		var a = $(window).scrollTop();
		a > 1400 ? $(".gotop").show() : $(".gotop").hide()
	}), $(".gotop").on("click", function() {
		$("html,body").animate({
			scrollTop: 0
		}, 550)
	})
});