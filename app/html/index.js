var el = document.createElement("script");
el.src = "time/index.js";
document.body.appendChild(el);

fetch(`time/index.html`)
.then(response => response.text())
.then(data => {
    document.getElementById('timetable').innerHTML = data;
});
synctime();