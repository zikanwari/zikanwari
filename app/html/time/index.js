var username = localStorage.getItem('user');
var password = localStorage.getItem('pass');

const subjects = {
  '国語': 0,
  '社会': 1,
  '数学': 2,
  '理科': 3,
  '英語': 4,
  '体育': 5,
  '技術': 6,
  '家庭科': 7,
  '音楽': 8,
  '美術': 9,
  '道徳': 10,
  '総合': 11,
  '学活': 12,
  'なし': 13,
  'その他': 14,
};

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
                      return;
              }
              document.getElementById('timetable').innerText = '時間割のデータ取得に失敗しました。\n エラーメッセージ：' + a[1];
              return;
          }
          a.pop();
          for (let index = 0; index < a.length; index++) {
              document.getElementById(index).innerText = a[index];
              let s_index =' s_' + index;
              s_index.value = a[index];
          }
  })
  .catch(error => {
      document.getElementById('timetable').innerText = '時間割のデータ取得に失敗しました。';
  });
}