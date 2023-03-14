fetch(`time/index.html`)
.then(response => response.text())
.then(data => {
    document.getElementById('timetable').innerHTML = data;
    syncdata();
});
function syncdata() {
    fetch(`https://zikanwari.f5.si/api/all.php`)
    .then(data => {
        if (isNaN(data)) {
            document.getElementById('timetable').innerText = 'エラーが発生しました。エラーコード：' + data.status;
            console.log('エラーが発生しました。エラーコード：' + data.status);
        } else {
            a = data.split(',');
            a.pop();
            for (let index = 0; index < a.length; index++) {
                document.getElementById(index).innerText = a[index];
            }
        }
    })
    .catch(error => {
        document.getElementById('timetable').innerText = 'エラーが発生しました。エラーコード：' + error;
        console.log('エラーが発生しました。エラーコード：' + error);
    });
}