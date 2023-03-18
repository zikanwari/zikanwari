function syncdata() {
    const username = localStorage.getItem('user');
    const password = localStorage.getItem('pass');

    fetch(`https://api.launchpencil.f5.si/zikanwari/?user=` + username + `&pass=` + password)
    .then(response => response.text())
    .then(data => {
            a = data.split(',');
            if (a[0] == "エラー") {
                if (a[1].startsWith("Access denied for user")) {
                    document.getElementById('timetable').innerText = 
                        '認証に失敗しました。ユーザー名またはパスワードが間違っているか設定されていません。';
                        return;
                }
                document.getElementById('timetable').innerText = '時間割のデータ取得に失敗しました。\n エラーメッセージ：' + a[1];
                return;
            }
            a.pop();
            for (let index = 0; index < a.length; index++) {
                document.getElementById(index).innerText = a[index];
            }
    })
    .catch(error => {
        document.getElementById('timetable').innerText = '時間割のデータ取得に失敗しました。';
    });
}