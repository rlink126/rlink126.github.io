//------------------
// Declare Variables
//------------------
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullscreenButton = player.querySelector('.fullscreen');
let isFullscreen = false;
let mousedown = false;

//------------------
// Declare Functions
//------------------
function togglePlay()
{
    const method = video.paused ? 'play' : 'pause';
    video[method]();
}

function fullscreen()
{
    isFullscreen = !isFullscreen;
    
    if(isFullscreen)
    {
        if(player.webkitRequestFullscreen) player.webkitRequestFullscreen();
    }
    else
    {
        if(document.webkitExitFullscreen) document.webkitExitFullscreen();
    }
}

function updateButton()
{
    const icon = this.paused ? '▶' : '❚ ❚';
    toggle.textContent = icon;
}

function skip()
{
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate()
{
    video[this.name] = this.value;
}

function handleProgress()
{
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e)
{
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

//--------------------------
// Establish Event Listeners
//--------------------------
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
toggle.addEventListener('click', togglePlay);
fullscreenButton.addEventListener('click', fullscreen);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));