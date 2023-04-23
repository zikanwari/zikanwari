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

function changeother() {
    document.getElementById("time").classList.remove("select");
    document.getElementById("todo").classList.remove("select");
    document.getElementById("other").classList.add("select");
    fetch(`other/index.html`)
    .then(response => response.text())
    .then(data => {
        document.getElementById('timetable').innerHTML = data;
        startmoni();
    });
}

function changetodo() {
    document.getElementById("time").classList.remove("select");
    document.getElementById("other").classList.remove("select");
    document.getElementById("todo").classList.add("select");
    fetch(`todo/index.html`)
    .then(response => response.text())
    .then(data => {
        document.getElementById('timetable').innerHTML = data;
        startmoni_todo();
    });
}

document.getElementById("other").onclick = function() {
    changeother();
}

document.getElementById("todo").onclick = function() {
    changetodo();
}

document.getElementById("time").onclick = function() {
    document.getElementById("other").classList.remove("select");
    document.getElementById("todo").classList.remove("select");
    changetime();
}