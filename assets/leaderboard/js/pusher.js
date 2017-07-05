// Enable pusher logging - don't include this in production
Pusher.logToConsole = true;

var pusher = new Pusher('dac400fc0f200416ae79', {
    encrypted: true
});

var channel = pusher.subscribe('otew-channel');
channel.bind('ot-refresh', function(data) {
    console.log('Opening can of Coke......');
    console.log('Ah!............refreshing');
    location.reload();
});
