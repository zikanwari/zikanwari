fetch(`time/index.html`)
.then(response => response.text())
.then(data => {
    document.getElementById('timetable').innerHTML = data;
    syncdata();
});
function syncdata() {
    fetch(`https://api.launchpencil.f5.si/zikanwari/?user=2-5&pass=tokoroten`)
    .then(response => response.text())
    .then(data => {
            a = data.split(',');
            a.pop();
            for (let index = 0; index < a.length; index++) {
                document.getElementById(index).innerText = a[index];
            }
    })
    .catch(error => {
        document.getElementById('timetable').innerText = '時間割のデータ取得に失敗しました。';
    });
}