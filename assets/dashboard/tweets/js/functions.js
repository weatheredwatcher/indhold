//this is a function file for tweets
//



console.log('tweets function library loaded');
$(function(){
console.log('DOM LOADED');
  $('.allowed a').click(function(e)
  {
    e.preventDefault();
    console.log('clicked');
  });
});

  function blockTweet(tweetID){
     console.log($(this).text())
     console.log(tweetID);

$.ajax({
  type : 'POST', // define the type of HTTP verb we want to use (POSTST for our form)

  url : 'blacklist', // the url where we want to POST
  data : { 'tweet_id': tweetID}, // our           data object
  dataType : 'json', // what type of data do we expect basedck from the server
  encode : true
}).done(function(data) {

});
$(this).text('unblock');

}

  function unBlockTweet(tweetID){
  
    $.ajax({
      type: 'POST',
      url: 'whitelist',
      data: { 'tweet_id': tweetID},
      dataType: 'json',
      encode: true
    }).done(function(data) {done});

  }
