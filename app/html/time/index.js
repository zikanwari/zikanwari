console.log("hello");
fetch(`http://10.1.100.224/api/all.php`)
.then(response => {
    if (!response.ok) {
        console.error('エラーが発生しました。');
    }
    response.text()
})
.then(data => {
    a = data.split(',');
    a.pop();
    for (let index = 0; index < a.length; index++) {
        document.getElementById(index).innerText = a[index];
    }
})
.catch(error => {
    document.getElementById('timetable').innerText= 'エラーが発生しました。エラーメッセージ：' + error;
});