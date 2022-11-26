const alt = new Audio('../mp3/alt.mp3');
const sop = new Audio('../mp3/sop.mp3');
const ten = new Audio('../mp3/ten.mp3');


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
}
function pause() {
    alt.pause();
    sop.pause();
    ten.pause();
    
    /*a1.currentTime = 0;
    a2.currentTime = 0;*/
}