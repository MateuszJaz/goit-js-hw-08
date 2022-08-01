import Player from '@vimeo/player';
const throttle = require('lodash.throttle');

const LOCALSTORAGE_KEY = 'videoplayer-current-time';
const iframe = document.querySelector('#vimeo-player');
const iframePlayer = new Player(iframe);

iframePlayer.on(
  'timeupdate',
  throttle(function () {
    iframePlayer
      .getCurrentTime()
      .then(function (seconds) {
        localStorage.setItem(LOCALSTORAGE_KEY, seconds);
        console.log('Current time:', seconds);
      })
      .catch(function (error) {
        alert('Error:', error);
      });
  }, 1000)
);

iframePlayer
  .setCurrentTime(localStorage.getItem(LOCALSTORAGE_KEY))
  .then(function (seconds) {
    // seconds = the actual time that the player seeked to
  })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        // the time was less than 0 or greater than the video’s duration
        break;

      default:
        // some other error occurred
        break;
    }
  });

iframePlayer.on('pause', function () {
  console.log('Video paused!');
});
