const a1 = new Audio('../sounds/audio1.mp4');
const a2 = new Audio('../sounds/audio2.mp4');
const a3 = new Audio('../sounds/audio3.mp4');
const a4 = new Audio('../sounds/audio4.mp4');
const a5 = new Audio('../sounds/audio5.mp4');

function s1() {
    a1.play();
}
function s2() {
    a2.play();
}
function s3() {
    a3.play();
}
function s4() {
    a4.play();
}
function s5() {
    a5.play();
}
function pause() {
    a1.pause();
    a2.pause();
    a3.pause();
    a4.pause();
    a5.pause();
    
    a1.currentTime = 0;
    a2.currentTime = 0;
    a3.currentTime = 0;
    a4.currentTime = 0;
    a5.currentTime = 0;
}