$(document).ready(function() {
    $('.box_skitter_large li:nth-child(3n) img').addClass('cubeRandom');
    $('.box_skitter_large li:nth-child(3n+1) img').addClass('block');
    $('.box_skitter_large li:nth-child(3n+2) img').addClass('cubeStop');

    var _wd = $(window).width(),
        _hg = 450;

    $(".box_banner").css({
        width: _wd,
        height: _hg
    });


    $('.box_skitter_large').css({
        width: 1920,
        height: _hg
    }).skitter({
        theme: 'clean',
        numbers_align: 'center',
        progressbar: false,
        dots: true,
        preview: false
    });

    var left_value = -(1920 - $(window).width()) / 2;
    var left_value2 = $(window).width() / 2;
    $('.box_skitter_large .container_skitter').css('left', left_value);
    $('.box_skitter_large .info_slide_dots').css('left', left_value2);

    $(window).resize(function() {
        var left_value = -(1920 - $(window).width()) / 2;
        var left_value2 = $(window).width() / 2;
        $('.box_skitter_fullpage .container_skitter').css('left', left_value);
        $('.box_skitter_fullpage .info_slide_dots').css('left', left_value2);

    });
});