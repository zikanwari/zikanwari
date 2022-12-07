const alt = new Audio('../mp3/alt.mp3');
const sop = new Audio('../mp3/sop.mp3');
const ten = new Audio('../mp3/ten.mp3');

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

function change(part) {
    switch (part) {
        case 'alt':
            if (alt.muted === false) {
                document.getElementById(part).style.backgroundColor = '#b2b2b2';
                alt.muted = true;
            } else {
                document.getElementById(part).style.backgroundColor = '#faffb7';
                alt.muted = false;
            }
            break;
        case 'sop':
            if (sop.muted === false) {
                document.getElementById(part).style.backgroundColor = '#b2b2b2';
                sop.muted = true;
            } else {
                document.getElementById(part).style.backgroundColor = '#faffb7';
                sop.muted = false;
            }
            break;
        case 'ten':
            if (ten.muted === false) {
                document.getElementById(part).style.backgroundColor = '#b2b2b2';
                ten.muted = true;
            } else {
                document.getElementById(part).style.backgroundColor = '#faffb7';
                ten.muted = false;
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
        document.getElementById("bar").value = Math.floor((alt.currentTime / alt.duration) * alt.duration);
      }, 500);
}
document.getElementById("bar").addEventListener("input", e => {
    clearInterval(playtimer);
    alt.currentTime = document.getElementById("bar").value;
    sop.currentTime = document.getElementById("bar").value;
    ten.currentTime = document.getElementById("bar").value;
    document.getElementById("ctime").textContent = convertTime(alt.currentTime);
  });
  document.getElementById("bar").addEventListener("change", e => {
    play();
  });
function pause() {
    alt.pause();
    sop.pause();
    ten.pause();
    
    /*a1.currentTime = 0;
    a2.currentTime = 0;*/
}