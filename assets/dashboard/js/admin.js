//this is a function file for tweets
//



$(function(){
    console.log('DOM LOADED');
    $('.allowed a').click(function(e)
    {
        e.preventDefault();
        console.log('clicked');
    });
});

function reload(){

    $.ajax({ url : '/api/reload' })
        .done(function(msg) {

            $('#flash').html(msg[0].message);
            console.log(msg);

        });

}

function refresh(){

    $.ajax({ url : '/api/refresh' })
        .done(function(msg) {
            $('#flash').html(msg[0].message);
            console.log(msg);
        });

}


setInterval(function() {
    $('#flash').html("");
}, 60 * 1000);
