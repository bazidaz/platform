/*
$(window).resize(function() {
$('#container').css("height", window.innerHeight+"px");
$('#container').css("width",window.innerWidth+"px");
});
*/

$(document).ready(function() { 
    $('#get').click(function() {
        $('p').empty();
        var win=$(window);
        var winWidth = win.width();
        var winHeight= win.height();
        $('p').append(winWidth + '<br>');
        $('p').append(winHeight + '<br>');
        
        var doc=$(document);
        var docWidth=doc.width();
        var docHeight=doc.height();
        $('p').append("docWidth:" +docWidth + '<br>');
        $('p').append("docHeight:" + docHeight + '<br>');
        
        var box=$('#box');
        var boxTop=box.offset().top;
        var boxLeft=box.offset().left;
        $('#boxText').text(boxTop + ' ' + boxLeft);
             // if(boxTop >= height){
          //  $('#box').css("top",200)
      //  }else{
        //    $('p').append("No");
       // }
        
    });
});
//this model will do the work hopefully

