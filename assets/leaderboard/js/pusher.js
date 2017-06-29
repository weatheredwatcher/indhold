// Enable pusher logging - don't include this in production
Pusher.logToConsole = true;

var pusher = new Pusher('dac400fc0f200416ae79', {
    encrypted: true
});

var channel = pusher.subscribe('my-channel');
channel.bind('my-event', function(data) {
    console.log('refreshing......')
    location.reload();
});
