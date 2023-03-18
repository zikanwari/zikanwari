var script = document.createElement('script');
script.src = 'other/index.js';
changetime();

function changetime() {
    document.getElementById("time").classList.add("select");
    fetch(`time/index.html`)
    .then(response => response.text())
    .then(data => {
        document.getElementById('timetable').innerHTML = data;
        syncdata();
    });
}

document.getElementById("other").onclick = function() {
    document.getElementById("time").classList.remove("select");
    document.getElementById("other").classList.add("select");
    fetch(`other/index.html`)
    .then(response => response.text())
    .then(data => {
        document.getElementById('timetable').innerHTML = data;
    });    

    document.body.appendChild(script);
}

document.getElementById("time").onclick = function() {
    document.getElementById("other").classList.remove("select");
    document.body.removeChild(script);
    changetime();
}