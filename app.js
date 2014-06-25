var app = require('express.io')(),
    twitter = require('twitter'),
    sleep = require('sleep');

app.http().io();
app.listen(7777);

var twit = new twitter({
    consumer_key: '',
    consumer_secret: '',
    access_token_key: '',
    access_token_secret: ''
});

app.io.route('live', {
    start: function (req) {
        if ('undefined' === typeof twit.currentStream) {
            var filterData = {
                track: 'WorldCup'
            }
            twit.stream('statuses/filter', filterData, function(stream) {
                stream.on('data', function(tweet) {
                    req.io.broadcast('tweet', {
                        data: tweet
                    });
                });

                twit.currentStream = stream;
            });
        }
    }
});

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/views/index.html');
});
