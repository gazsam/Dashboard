var Twitter = require('twitter');
 
function getTweets() {
  var client = new Twitter({
    consumer_key: 'X1ypELoQMuGJXqtJdfGITLxSZ',
    consumer_secret: 'I7QkQxBybVPc3c4HEJTRFGqvqwoxTuBHd0Zo7eHDrxPuwaGHkN',
    access_token_key: '43408534-pVzQTDsa6bEVRblaWvvlMGYanqllovEiTq63quacK',
    access_token_secret: 'CwtO0sCuoawESwHM4Iis4MrsLJZygmQsEphwp7h792gId'
  });

  var searchTerm = encodeURIComponent('#HPEDiscover')
  var tweets = [];

  client.get('search/tweets', {q: searchTerm}, function(error, results, response){
    if (typeof results !== 'undefined') {
      results.statuses.forEach(function(tweet, i) {
        var name = tweet.user.name,
            body = tweet.text,
            avatar = tweet.user.profile_image_url_https; 
        tweets.push({name: name, body: body, avatar: avatar});
      });
    }
  });
  send_event('twitter_mentions', { comments: tweets });
}

getTweets();
setInterval(getTweets, 600*1000);
