
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $wikiHeaderElem = $('#wikipedia-header');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    //Clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    //Load streetview

    var street = $('#street').val();
    var city = $('#city').val();
    var address = street + ', ' + city;

    $body.append('<img class="bgimg" src="https://maps.googleapis.com/maps/api/streetview?size=600x400&location='+ address +'" >');

    //Load  NY Times Articles 
    var nytUrl = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + address + 
        '&sort=newest&api-key=fbcb6500f640448f96c33be7f1cee50e';
    
    $.getJSON(nytUrl, function(data) { 
        $nytHeaderElem.text('New York Times Articles About ' + address);

        var articles = data.response.docs;
        for (var i = 0; i < articles.length; i++) {
            var article = articles[i];
            $nytElem.append('<li class="article">' + '<a href="' + article.web_url + '">' + article.headline.main + '</a>' + 
                '<p>' + article.snippet + '</p>' + '</li>');
        }
    });

    //Wikipedia AJAX Request
    var wikiUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + address + '&format=json&callback=wikiCallback';
    
    $.ajax({
        url: wikiUrl,
        dataType: "jsonp",
        success: function(response) {
    
            var articleList = response[1];
            for (var i = 0; i < articleList.length; i++) {
                
                articleStr = articleList[i];
                var url = 'https://en.wikipedia.org/wiki/' + articleStr;

                $wikiElem.append('<li><a href="' + url + '">' + articleStr + '</a></li>');
            };
        }

    });
    return false;

};

$('#form-container').submit(loadData);
