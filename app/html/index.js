fetch(`time/index.html`)
.then(response => response.text())
.then(data => {
    document.getElementById('timetable').innerHTML = data;
});
function syncdata() {
    fetch(`https://zikanwari.f5.si/api/all.php`)
    .then(data => {
        a = data.split(',');
        a.pop();
        for (let index = 0; index < a.length; index++) {
            document.getElementById(index).innerText = a[index];
        }
        });
    .then(response => {
        if( !response.ok ) {
            document.getElementById('timetable').innerText = 'エラーが発生しました。エラーコード：' + response.status;
            console.log('エラーが発生しました。エラーコード：' + response.status);
            exit;
        }
    })
}