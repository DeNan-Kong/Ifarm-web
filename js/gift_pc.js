function qih() {
	$(".giftclick").hasClass("on") ? $(".gift_goods").show() : $(".gift_goods").hide()
}

function qislide() {
	$(".giftclick").hasClass("on") ? $(".gift_goods").stop(!1, !0).slideDown() : $(".gift_goods").stop(!1, !0).slideUp()
}
$(document).ready(function() {
	qih(), $(".giftclick").click(function() {
		$(".giftclick").hasClass("on") ? $(this).removeClass("on") : $(this).addClass("on"), qislide()
	})
});