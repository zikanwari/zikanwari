const a1 = new Audio('../upload/mp4/audio1.mp4');
const a2 = new Audio('../upload/mp4/audio2.mp4');

function s1() {
    a1.volume = 0.5
    a1.play();
}
function s2() {
    a2.volume = 0.5
    a2.play();
}
function s3() {
    a2.volume += 0.5
}
function s3_big() {
    a2.volume -= 0.5
}
function pause() {
    a1.pause();
    a2.pause();
    
    a1.currentTime = 0;
    a2.currentTime = 0;
}