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

  function turnOff(ID){
     console.log($(this).text())
     console.log(ID);

$.ajax({
  type : 'POST', // define the type of HTTP verb we want to use (POSTST for our form)

  url : 'turn-off', // the url where we want to POST
  data : { 'id': ID}, // our           data object
  dataType : 'json', // what type of data do we expect basedck from the server
  encode : true
}).done(function(data) {
location.reload();
});

}

  function turnOn(ID){
  
    $.ajax({
      type: 'POST',
      url: 'turn-on',
      data: { 'id': ID},
      dataType: 'json',
      encode: true
    }).done(function(data) {  location.reload();});

  }
