import '../css/style.css';

declare global {
    interface Window {
        onYouTubeIframeAPIReady: () => void;
    }
}

// 2. This code loads the IFrame Player API code asynchronously.
const tag = document.createElement('script');

tag.src = 'https://www.youtube.com/iframe_api';
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
let player: YT.Player;
window.onYouTubeIframeAPIReady = () =>
{
    player = new YT.Player('player', {
        height: 390,
        width: 640,
        videoId: 'M7lc1UVf-VE',
        playerVars: {
            playsinline: 1
        },
        events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange,
        }
    });
};

// 4. The API will call this function when the video player is ready.
function onPlayerReady (event: YT.PlayerEvent)
{
    event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
let done = false;
function onPlayerStateChange (event: YT.OnStateChangeEvent)
{
    if (event.data == YT.PlayerState.PLAYING && !done)
    {
        setTimeout(stopVideo, 6000);
        done = true;
    }
}
function stopVideo ()
{
    player.stopVideo();
}
