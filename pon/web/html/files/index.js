const a1 = new Audio('../upload/mp4/audio1.mp4');
const a2 = new Audio('../upload/mp4/audio2.mp4');
const a3 = new Audio('../upload/mp4/audio3.mp4');
const a4 = new Audio('../upload/mp4/audio4.mp4');
const a5 = new Audio('../upload/mp4/audio5.mp4');

function s1() {
    a1.volume = 0.5
    a1.play();
}
function s2() {
    a2.volume = 0.5
    a2.play();
}
function s3() {
    a3.volume = 0.5
    a3.play();
}
function s3_big() {
    a3.volume = 1.0
    a3.play();
}
function s4() {
    a4.volume = 0.5
    a4.play();
}
function s5() {
    a5.volume = 0.5
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