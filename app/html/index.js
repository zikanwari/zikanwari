var page = "time";
var theme = localStorage.getItem('theme');

var noselect = "#ddeeff"
var select = "#4ab6ff"

var listcolor = "#8ed6ff"
var listline = "#007eff"

var buttoncolor = "#005fbd"

var oddcolor = "93b7ff"
var evencolor = "8ed6ff"

var theme = localStorage.getItem('theme');
updatetheme(theme);
changetime();

function changetime() {
    page = "time";

    document.getElementById("time").style.backgroundColor = select;
    fetch(`time/index.html`)
    .then(response => response.text())
    .then(data => {
        document.getElementById('timetable').innerHTML = data;
        syncdata();
    });
}

function changeother() {
    page = "other";

    document.getElementById("time").style.backgroundColor = noselect;
    document.getElementById("todo").style.backgroundColor = noselect;
    document.getElementById("other").style.backgroundColor = select;
    fetch(`other/index.html`)
    .then(response => response.text())
    .then(data => {
        document.getElementById('timetable').innerHTML = data;
        startmoni();
    });
}

function changetodo() {
    page = "todo";

    document.getElementById("time").style.backgroundColor = noselect;
    document.getElementById("other").style.backgroundColor = noselect;
    document.getElementById("todo").style.backgroundColor = select;
    fetch(`todo/index.html`)
    .then(response => response.text())
    .then(data => {
        document.getElementById('timetable').innerHTML = data;
        startmoni_todo();
    });
}

function updatetheme(themename) {
    if (theme == null) {
        localStorage.setItem('theme', "default");
        theme = "default;"
        updatetheme(theme);
    }
    fetch("theme/" + themename + ".json")
    .then(response => response.json())
    .then(data => {
        console.log(data);

        document.body.style.background = "linear-gradient(" + data.background.start + "," + data.background.end + ")";
        document.body.style.color = data.text.color;

        document.querySelector("main").style.backgroundColor = data.main.background;
        document.querySelector("main").style.borderColor = data.accent.line;

        noselect = data.footer.default;
        select = data.footer.select;
        document.querySelector("svg").style.fill = data.footer.icon;

        listcolor = data.other.background;
        listline = data.accent.line;

        buttoncolor = data.accent.button;

        oddcolor = data.time.odd;
        evencolor = data.time.even;

        switch (page) {
            case "time":
                document.getElementById("other").style.backgroundColor = noselect;
                document.getElementById("todo").style.backgroundColor = noselect;
                changetime();
                break;
            case "todo":
                changetodo();
                break;
            case "other":
                changeother();
                break;
        }
    })
}

document.getElementById("other").onclick = function() {
    changeother();
}

document.getElementById("todo").onclick = function() {
    changetodo();
}

document.getElementById("time").onclick = function() {
    document.getElementById("other").style.backgroundColor = noselect;
    document.getElementById("todo").style.backgroundColor = noselect;
    changetime();
}