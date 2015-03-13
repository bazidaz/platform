//var link=new Array();
var j, userInput, cleanSent, search, t0, t1, doc, docHeight, list, para, paraH,calIndex,h;
var filterWords = ["all", "another", "any", "anybody", "anyone", "anything", "botheach", "each", "other", "either", "everybody", "everyone", "everything", "few", "he", "her", "hers", "herself", "him", "himself", "his", "it", "its", "itself", "many", "me", "mine", "more", "most", "much", "myself", "neither", "no", "one", "nobody", "none", "nothing", "another", "other", "others", "ours", "ourselves", "several", "she", "some", "somebody", "someone", "something", "their", "theirs", "them", "themselves", "these", "they", "this", "those", "us", "we", "what", "whatever", "which", "whichever", "who", "whoever", "whom", "whomever", "whose", "you", "your", "yours", "yourself", "yourselves", "that", "it's", "time", "person", "year", "way", "day", "thing", "man", "world", "life", "hand", "part", "child", "eye", "woman", "place", "work", "week", "case", "point", "government", "company", "number", "group", "problem", "fact", "be", "have", "do", "say", "get", "make", "go", "know", "take", "see", "come", "think", "look", "want", "give", "use", "find", "tell", "ask", "work", "seem", "feel", "try", "leave", "call", "good", "new", "first", "last", "long", "great", "little", "own", "other", "old", "right", "big", "high", "different", "small", "large", "next", "early", "young", "important", "few", "public", "bad", "same", "able", "to", "of", "in", "for", "on", "with", "at", "by", "from", "up", "about", "into", "over", "after", "beneath", "under", "above", "the", "and", "a", "that", "", "it", "not", "he", "as", "you", "this", "but", "his", "they", "her", "she", "or", "an", "will", "my", "one", "all", "would", "there", "their", "aboard", "about", "above", "across", "after", "against", "along", "amid", "among", "around", "as", "at", "before", "behind", "below", "beneath", "beside", "besides", "between", "beyond", "but", "by", "concerning", "considering", "despite", "down", "during", "except", "excepting", "excluding", "following", "for", "from", "in", "inside", "into", "like", "minus", "near", "of", "off", "on", "onto", "opposite", "outside", "over", "past", "per", "plus", "regarding", "round", "save", "since", "than", "through", "to", "toward", "towards", "under", "underneath", "unlike", "until", "up", "upon", "versus", "via", "with", "within", "without"];


$(document).ready(function () {
    list = $('li');
    $('#lwh').text(list.width())
    $('#fake').css({
        "padding-bottom": 'list.height()',
            "padding-right": 'list.width()'
    })
    $('textarea').keyup(function () {
        if ($(this).val()) {
            $('#convert').removeAttr('disabled');
        } else {
            $('#convert').attr('disabled', 'disabled');
        }

    });

    $('#convert').click(function () {
        t0 = performance.now();
        $('#convert').attr('disabled', 'disabled');
        //link.length = 0;
        doc = $(document);
        docHeight = doc.height();
        j = 0;
        h=0;
        $('li').remove();
        $('.onlyText').remove();
        $('#loading').text('Please wait loading');
        userInput = $('textarea[name=texthere]').val();
        cleanSent = userInput.replace(/\s+/g, ' ');
        search = cleanSent.split(" ");
        //callAjax(search[j]);
        preTest();
    });
});



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
            //pass the last value of j
            calIndex = j;
            break;
        }
    }
}


function callAjax(index) {
    var look = new URL('https://ajax.googleapis.com/ajax/services/search/images?v=1.0&q=' + index + '&callback=?');
    $.ajax({
        url: look,
        dataType: 'json',
        success: function (data) {
            //check if the search word returns empty object
            if(data.responseData.results.length===0){
                           $('#display ul').append('<li>'+'<figure>' + '<img class="lazy" src="' + "http://upload.wikimedia.org/wikipedia/commons/9/98/MA_Route_blank.svg" + '" height=150 width=120>' + '<figcaption>'  + '<p class=withPic>' + search[h] + '</p>' + '</figcaption>' + '</figure>'+'</li>');  
            h++;
            }
             //filterWords.indexOf(search[j]) returns -1 if can't find the index value of array search[j] inside filterWords;
            //check if search[j] is not the first html list element 
            else if(filterWords.indexOf(search[h])!== -1 && $('li').length > 0){
            $('.withPic').last().append( '<p class=onlyText>' + search[h] + '</p>' ); 
            j++;
            }else{
            $('#display ul').append('<li>'+'<figure>' + '<img class="lazy" src="' + data.responseData.results[0].url + '" height=150 width=120>' + '<figcaption>'  + '<p class=withPic>' + search[h] + '</p>' + '</figcaption>' + '</figure>'+'</li>');
            h++;
            }
            if(h < callIndex) {
             // to get the value of list
             //list=$('li');
             //$('#lwh').text(list.width() +' '+list.height());
                callAjax(search[h]);
            } else {
                t1=performance.now();
            }
           
        }
    });
}


/*
function image(){
    for(var i=0; i < link.length; i++){
    $('#display ul').append('<li>'+'<figure>' + '<img src="' + link[i] + '" height=150 width=120>' + '<figcaption>' + search[i] + '</figcaption>' + '</figure>'+'</li>');
    }
}
*/