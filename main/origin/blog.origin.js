/**
 * blog script
 */
$('#verifyCode').on('click', function (){
    $.ajax({
        url: '/captcha?refresh=1',
        dataType: 'json',
        cache: false,
        success: function(data) {
            $('#verifyCode').attr('src', data['url']);
            $('body').data('captcha.hash', [data['hash1'], data['hash2']]);
        }
    });
    return false;
});
$('#commentList').on('click', '.approved', function(){
    $.post($(this).attr('href'),function(response){
        alert(response.info);
    })
    return false;
});
$('#commentList').on('click', '.commentReply', function(){
    var data = $(this).attr('href').split('#');
    var input = $('#commentReply').find('input');
    for(var i = 0; i < input.length; i++){
        $(input[i]).val(data[i]);
    }
    $('body').animate({scrollTop:$('#commentBox').offset().top},500,function(){
        $('#commentReply').slideDown();
    });
    return false;
});
$('#commentBox').on('click', '.cancel', function(){
    $('#commentReply').slideUp(function(){
        $(this).find('input').each(function(){
            $(this).val(0);
        });
    });
    return false;
});

/* blog-container-sidebar */
$('#sidebar').on('click','.sidebar-toggle',function(){
    var target = $(this).attr('for');
    if($(this).hasClass('glyphicon-chevron-down')){
        $(this).removeClass('glyphicon-chevron-down');
        $(this).addClass('glyphicon-chevron-up');
        $(target).slideDown();
    }else{
        $(this).removeClass('glyphicon-chevron-up');
        $(this).addClass('glyphicon-chevron-down');
        $(target).slideUp();
    }
});
var docHeight = $(document).height();
$(document).scroll(function(){
    var height = docHeight - $('#sidebar').height();
    var top = $(document).scrollTop() - offset;
    if(height >= top){
        $('#sidebar').css('margin-top', top > 0 ? top : 0);
    }else{
        $('#sidebar').css('margin-top', height);
    }
});