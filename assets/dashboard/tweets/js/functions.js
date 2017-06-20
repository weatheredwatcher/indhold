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
    
     console.log(tweetID);

    $.ajax(
      url: 'dashobard/blacklist',
      data: tweetID,
    ).done(function(){ console.log('done') });
  }
