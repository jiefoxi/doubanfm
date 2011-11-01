(function (window, document, undefined) {
    var isPlay = false;
    var port = chrome.extension.connect({name: 'fm'});
    var play = document.querySelector('#play');
    var title = document.querySelector('h1');
    var artist = document.querySelector('p');
    var progress = document.querySelector('#progress div div');
    var current = document.querySelector('time');
    var total = document.querySelector('time:nth-child(3)');

    port.postMessage({cmd: 'getCurrentSongInfo'});

    port.onMessage.addListener(function (msg) {
        switch (msg.cmd) {
        case 'setCurrentSongInfo':
            title.innerHTML = msg.song.title;
            artist.innerHTML = msg.song.artist + ' | ' + msg.song.albumtitle;
            total.innerHTML = strftime(msg.song.length);
            progress.style.width = msg.song.progress;
            current.innerHTML = msg.song.progress;
            document.body.style.backgroundImage = 'url('+ msg.song.picture +')';
            break;
        default:
            document.body.style.backgroundImage = 'none';
        }
    });

    play.addEventListener('click', function (e) {
        if (isPlay) {
            this.style.backgroundImage = 'url(../assets/play.png)';
        }
        else {
            this.style.backgroundImage = 'url(../assets/pause.png)';
        }
        isPlay = !isPlay;
        port.postMessage({cmd: 'switch', isPlay: isPlay});
        e.preventDefault();
    }, false);

    function strftime(seconds) {
        var minutes = Math.floor(seconds / 60), seconds = seconds % 60, str;
        str = (minutes > 9 ? minutes : '0' + minutes) + ' : ' + (seconds > 9 ? seconds : '0' + seconds);
        return str;
    };
})(this, this.document);