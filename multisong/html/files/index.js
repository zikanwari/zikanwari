const alt = new Audio('../mp3/alt.mp3');
const sop = new Audio('../mp3/sop.mp3');
const ten = new Audio('../mp3/ten.mp3');

alt.addEventListener('loadeddata', (e)=> {
    document.getElementById("ctime").textContent = convertTime(alt.currentTime);
    document.getElementById("ctime").max = alt.duration;
});

function change(part) {
    switch (part) {
        case 'alt':
            if (alt.volume == 1) {
                document.getElementById(part).style.backgroundColor = '#b2b2b2';
                alt.volume = 0;
            } else {
                document.getElementById(part).style.backgroundColor = '#faffb7';
                alt.volume = 1;
            }
            break;
        case 'sop':
            if (sop.volume == 1) {
                document.getElementById(part).style.backgroundColor = '#b2b2b2';
                sop.volume = 0;
            } else {
                document.getElementById(part).style.backgroundColor = '#faffb7';
                sop.volume = 1;
            }
            break;
        case 'ten':
            if (ten.volume == 1) {
                document.getElementById(part).style.backgroundColor = '#b2b2b2';
                ten.volume = 0;
            } else {
                document.getElementById(part).style.backgroundColor = '#faffb7';
                ten.volume = 1;
            }
            break;
        default:
            break;
    }
}

function play() {
    alt.play();
    sop.play();
    ten.play();

    playtimer = setInterval(function(){
        document.getElementById("ctime").textContent = convertTime(alt.currentTime);
        document.getElementById("bar").value = Math.floor( (alt.currentTime / alt.duration) * alt.duration);
      }, 500);
}
function pause() {
    alt.pause();
    sop.pause();
    ten.pause();
    
    /*a1.currentTime = 0;
    a2.currentTime = 0;*/
}

const convertTime = function(time_position) {

    time_position = Math.floor(time_position);
    var res = '';

    if( 60 <= time_position ) {
      res = Math.floor(time_position / 60);
      res += ":" + Math.floor(time_position % 60).toString().padStart( 2, '0');
    } else {
      res = "0:" + Math.floor(time_position % 60).toString().padStart( 2, '0');
    }
    return res;
  };