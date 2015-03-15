var link=new Array();
var link2=new Array();
var k,j,i,userInput, cleanSent, search, doc, docHeight, list, para, paraH,calIndex,h,sValue,startNum,randNum,constantV,calNum;
var filterWords = ["all", "another", "any", "anybody", "anyone", "anything", "botheach", "each", "other", "either", "everybody", "everyone", "everything", "few", "he", "her", "hers", "herself", "him", "himself", "his", "it", "its", "itself", "many", "me", "mine", "more", "most", "much", "myself", "neither", "no", "one", "nobody", "none", "nothing", "another", "other", "others", "ours", "ourselves", "several", "she", "some", "somebody", "someone", "something", "their", "theirs", "them", "themselves", "these", "they", "this", "those", "us", "we", "what", "whatever", "which", "whichever", "who", "whoever", "whom", "whomever", "whose", "you", "your", "yours", "yourself", "yourselves", "that", "it's", "time", "person", "year", "way", "day", "thing", "man", "world", "life", "hand", "part", "child", "eye", "woman", "place", "work", "week", "case", "point", "government", "company", "number", "group", "problem", "fact", "be", "have", "do", "say", "get", "make", "go", "know", "take", "see", "come", "think", "look", "want", "give", "use", "find", "tell", "ask", "work", "seem", "feel", "try", "leave", "call", "good", "new", "first", "last", "long", "great", "little", "own", "other", "old", "right", "big", "high", "different", "small", "large", "next", "early", "young", "important", "few", "public", "bad", "same", "able", "to", "of", "in", "for", "on", "with", "at", "by", "from", "up", "about", "into", "over", "after", "beneath", "under", "above", "the", "and", "a", "that", "", "it", "not", "he", "as", "you", "this", "but", "his", "they", "her", "she", "or", "an", "will", "my", "one", "all", "would", "there", "their", "aboard", "about", "above", "across", "after", "against", "along", "amid", "among", "around", "as", "at", "before", "behind", "below", "beneath", "beside", "besides", "between", "beyond", "but", "by", "concerning", "considering", "despite", "down", "during", "except", "excepting", "excluding", "following", "for", "from", "in", "inside", "into", "like", "minus", "near", "of", "off", "on", "onto", "opposite", "outside", "over", "past", "per", "plus", "regarding", "round", "save", "since", "than", "through", "to", "toward", "towards", "under", "underneath", "unlike", "until", "up", "upon", "versus", "via", "with", "within", "without"];
var count=0;
doc = $(window);
docHeight = doc.height();


$(document).ready(function () {

    list = $('li');
    $('#lwh').text(list.width());
    $('#fake').css({
        "padding-bottom": 'list.height()',
            "padding-right": 'list.width()'
    });
    $('textarea').keyup(function () {
        if ($(this).val()) {
            $('#convert').removeAttr('disabled');
        } else {
            $('#convert').attr('disabled', 'disabled');
        }
    });

    $('#convert').click(function () {
        $('#convert').attr('disabled', 'disabled');
        //link.length = 0;
        count=0;
        h = 0;
        j = 0;
        // default number of search images to be loaded at first
        startNum=10; 
        //constantV is added to calNum(to load given number consistant images after each scroll)
        calNum=startNum;
        link.length=0;
        link2.length=0;
        $('#what').empty();
        $('li').remove();
        $('.onlyText').remove();
        $('#loading').text('Please wait loading');
        userInput = $('textarea[name=texthere]').val();
        cleanSent = userInput.replace(/\s+/g, ' ');
        search = cleanSent.split(" ");
        //test purpose
        calIndex=10;
        callAjax(search[j]);
       // preTest();
    });
   
    $("#loadme").click(function(){
         if(j < search.length){
             h=0;
            //  $('#what').append(link.length + '<br>');
             // $('#what').append(link2.length + '<br>');
            //  $("#btest").text(j);
             //To reuse same Array link2 
             link2.length=0;
             //load number of images after each scroll
             constantV=5;
            //reintalize the calNum to display given constant number of images accross the screen
             calNum +=constantV;
             callAjax(search[j]);
         }
    }); 
    
   $("#debug").click(function(){
              $('#sDebug').append('<br>' +"Linklength1 : " + link.length + '<br>');
              $('#sDebug').append("Linklength2 : " + link2.length + '<br>');
              $("#sDebug").append("dubug j value :" + j + '<br>');
              $('#sDebug').append("dubug i value:" + i + '<br>');
              $('#sDebug').append("dubug count value:" + count + '<br>');
              $('#sDebug').append("dubug k value:" + k + '<br>');
    }); 
    
});

/*
function preTest() {
    //append first list so that variable para can grab the list id
    $('#display ul').append('<li id="fakeList">' + '<figure>' + '<div id="fakeBox">' + '</div>' + '<figcaption>' + '<p class=withPic>' + search[j] + '</p>' + '</figcaption>' + '</figure>' + '</li>');
    para = $('li:last').attr('id', "fakeList");
    //get the top height position of last list element
    paraH = para.offset().top;
    //remove the first list to avoid duplication 
    $('li:first').remove();
    for (var i = 0; i < search.length; i++) {
        if (paraH < docHeight) {
            $('#display ul').append('<li id="fakeList">' + '<figure>' + '<div id="fakeBox">' + '</div>' + '<figcaption>' + '<p class=withPic>' + search[j] + '</p>' + '</figcaption>' + '</figure>' + '</li>');
            //update the para value with latest last list element and it's top position
            para = $('li:last').attr('id', "fakeList");
            paraH = para.offset().top;
            j++;
        }else{
            para.remove();
            calIndex = j - 1;
            break;
        }
    }
    // callAjax(search[j]);
}
*/

function callAjax(index) {
    var look = new URL('https://ajax.googleapis.com/ajax/services/search/images?v=1.0&q=' + index + '&callback=?');
    $.ajax({
        url: look,
        dataType: 'json',
           success: function (data) {  
            if(data.responseData.results.length===0){
                if(j < startNum){
                    link[j]="http://upload.wikimedia.org/wikipedia/commons/9/98/MA_Route_blank.svg";
                    j++;
                }else{
                    link2[h]="http://upload.wikimedia.org/wikipedia/commons/9/98/MA_Route_blank.svg";
                    j++;
                    h++;
                }
            }else{
                if(j < startNum){
                    link[j]=data.responseData.results[0].url;
                    j++;
                }else{
                    link2[h]=data.responseData.results[0].url;      
                    j++;
                    h++;
                }
            }
            //checked against the calNum to make sure it doesn't load images more then startNum(default number of images to be load at first) 
            if(j < search.length && j < calNum) {
                callAjax(search[j]);
            }else{
                show();
              // $('#what').append(link.length + '<br>');
             // $('#what').append(link2.length + '<br>');
                  //$.each(link,function(key,value){
                 // $('#what').append(key + ':' + ' ' + value + '</br>');
              // });
                }
            /*   
            //check if the search word returns empty object
            if(data.responseData.results.length===0){
            link[j]="http://upload.wikimedia.org/wikipedia/commons/9/98/MA_Route_blank.svg";
            $('#display ul').append('<li>'+'<figure>' + '<img src="' + "http://upload.wikimedia.org/wikipedia/commons/9/98/MA_Route_blank.svg" + '" height=150 width=120>' + '<figcaption>'  + '<p class=withPic>' + search[j] + '</p>' + '</figcaption>' + '</figure>'+'</li>');  
            j++;
            }
             //indexOf(search[j]) returns -1 if the value is not present inside array search[j];
            //check if search[j] is not the first html list element 
            else if(filterWords.indexOf(search[j])!== -1 && $('li').length > 0){
            $('.withPic').last().append( '<p class=onlyText>' + search[j] + '</p>' ); 
            j++;
            }else{
            $('#display ul').append('<li>'+'<figure>' + '<img src="' + data.responseData.results[0].url + '" height=150 width=120>' + '<figcaption>'  + '<p class=withPic>' + search[j] + '</p>' + '</figcaption>' + '</figure>'+'</li>');
            j++;
            }
            if(j < search.length) {
                callAjax(search[j]);
            } else {
                t1=performance.now();
               } 
            */
        }
    });    
}
//function do display first 30 words
function show() {
        i=0;
        if(count ===0){
            for(i; i < j; i++){
                    $('#what').append( 'firstIvalue: ' + i);
             //indexOf(search[j]) returns -1 if the value is not present inside array search[j];
            //check if search[j] is not the first html list element 
                    if(filterWords.indexOf(search[i])!== -1 && $('li').length > 0){
                         $('.withPic').last().append( '<p class=onlyText>' + search[i] + '</p>' ); 
                    }else{
                        $('#display ul').append('<li>'+'<figure>' + '<img src="' + link[i] + '" height=180 width=180>' + 
                        '<figcaption>'  + '<p class=withPic>' + search[i] + '</p>' + '</figcaption>' + '</figure>'+'</li>');
                        }
                    }
                       count=1;
                    
         }else{
            k=0;
            //Once value of j arrives here it'll be orginal value + constantV because callAjax function have already run twice
            i=j-constantV;
            for(i; i < j; i++){
                 //indexOf(search[j]) returns -1 if the value is not present inside array search[j];
                //check if search[j] is not the first html list element 
                if(filterWords.indexOf(search[i])!== -1 && $('li').length > 0){
                     $('.withPic').last().append( '<p class=onlyText>' + search[i] + '</p>' ); 
                }else{
                    $('#display ul').append('<li>'+'<figure>' + '<img src="' + link2[k] + '" height=180 width=180>' + 
                    '<figcaption>'  + '<p class=withPic>' + search[i] + '</p>' + '</figcaption>' + '</figure>'+'</li>');
                }
                k++;
                $('#what').append('<br>' + 'insideIvalue: ' + i);
                $('#what').append('<br>' + 'insideKvalue: ' + k);
                
            }
            // $.each(search,function(key,value) { 
                    //$('#what').append("[Index :" + key + ','+ ' '+'value :'+ value +']');
               // });
        }

    }
        
        /*
        $(window).scroll(function() {   
             if(($(window).scrollTop() + $(window).height() === $(document).height()) && j < search.length) {
              // reset the link2 to reuse it again.
                link2.length=0;
                // set variable h to 0 to support link2[h]
                h=0;
                constantV=5;
                //reintalize the startNum to display contact number of images accross the screen
                calNum +=constantV;
                callAjax(search[j]);
           }
        });
    */
