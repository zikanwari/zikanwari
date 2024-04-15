var username = localStorage.getItem('user');
var password = localStorage.getItem('pass');

function syncdata() {
  update();

    document.querySelectorAll(".custom-select").forEach((customSelect, index) => {
      const select = customSelect.querySelector("select");

      select.addEventListener("change", function() {
        var username = localStorage.getItem('user');
        var password = localStorage.getItem('pass');
        customSelect.classList.add("selected");
        
        fetch('https://api.launchpencil.f5.si/zikanwari/change/?user=' + username + '&pass=' + password + '&id=' + index + '&subject=' + this.value, {
          mode: 'cors'
        })
        .then(response => response.text())
        .then(data => {
                alert(data);
                update();
        })
        .catch(error => {
            alert('時間割のデータ更新に失敗しました。');
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

  subjects = [
    "英語C",
    "英語E",
    "数学Ⅱ",
    "数学B",
    "論国",
    "古典",
    "文国",
    "体育",
    "物生",
    '化学',
    "歴史",
    "地理",
    "公共",
    "国情",
    "保健",
    "HRA",
    "SSH",
    "芸術",
    "その他",
    "なし"
  ]

  for (let cellid = 0; cellid < 34; cellid++) {

    subjects.forEach(subject => {

      let optionElement = document.createElement("option");
      optionElement.value = subject
      optionElement.text = subject

      document.getElementById('s_' + cellid).appendChild(optionElement)
    });
  }

  fetch(`https://api.launchpencil.f5.si/zikanwari/?user=` + username + `&pass=` + password, {
    mode: 'cors'
  })
  .then(response => response.text())
  .then(data => {
          a = data.split(',');
          if (a[0] == "エラー") {
              if (a[1].startsWith("Access denied for user") || a[1].endsWith("doesn't exist")) {
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
              case '言語文化':
                  document.getElementById(index).innerText = '言語\n文化'
                  break;
              default:
                document.getElementById(index).innerText = a[index];
                break;
            }
            document.getElementById('s_' + index).value = a[index];
          }

          document.querySelectorAll(".table>div>div:nth-child(odd)").forEach(customSelect => {
              customSelect.style.backgroundColor = oddcolor;
          })

          document.querySelectorAll(".table>div>div:nth-child(even)").forEach(customSelect => {
              customSelect.style.backgroundColor = evencolor;
          })

  })
  .catch(error => {
      document.getElementById('timetable').innerText = '時間割のデータ取得に失敗しました。';
  });
}