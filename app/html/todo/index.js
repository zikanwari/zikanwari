var username = localStorage.getItem('user');
var password = localStorage.getItem('pass');

function syncdata() {
  update();

    const customSelects = document.querySelectorAll(".custom-select");

    customSelects.forEach((customSelect, index) => {
      const select = customSelect.querySelector("select");

      select.addEventListener("change", function() {
        var username = localStorage.getItem('user');
        var password = localStorage.getItem('pass');
        customSelect.classList.add("selected");
        
        fetch('https://api.launchpencil.f5.si/zikanwari/change/?user=' + username + '&pass=' + password + '&id=' + index + '&subject=' + this.value)
        .then(response => response.text())
        .then(data => {
                alert(data);
                update();
        })
        .catch(error => {
            alert('時間割のデータ取得に失敗しました。');
            update();
        });

      });

      customSelect.addEventListener("click", function() {
        this.classList.toggle("open");
      });
    });
}

function update() {
  var username = localStorage.getItem('user');
  var password = localStorage.getItem('pass');

  fetch(`https://api.launchpencil.f5.si/zikanwari/?user=` + username + `&pass=` + password)
  .then(response => response.text())
  .then(data => {
          a = data.split(',');
          if (a[0] == "エラー") {
              if (a[1].startsWith("Access denied for user")) {
                  document.getElementById('timetable').innerText = 
                      '認証に失敗しました。ユーザー名またはパスワードが間違っているか設定されていません。';
                      setTimeout(function() {
                        if (confirm('ユーザー名またはパスワードが間違っているか設定されていません。\nOKを押すと設定画面へ移動します。')) {
                          changeother();
                        }
                      }, 100);
                      return;
              }
              document.getElementById('timetable').innerText = '時間割のデータ取得に失敗しました。\n エラーメッセージ：' + a[1];
              return;
          }
          a.pop();
          for (let index = 0; index < a.length; index++) {
            switch (a[index]) {
              case '数学Ⅰ・Ⅱ':
                document.getElementById(index).innerText = '数学\nⅠ・Ⅱ'
                break;
            
              default:
                document.getElementById(index).innerText = a[index];
                break;
            }
            document.getElementById('s_' + index).value = a[index];
          }
  })
  .catch(error => {
      document.getElementById('timetable').innerText = '時間割のデータ取得に失敗しました。';
  });
}