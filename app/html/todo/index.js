var username = localStorage.getItem('user');
var password = localStorage.getItem('pass');

function startmoni_todo() {
  var username = localStorage.getItem('user');
  var password = localStorage.getItem('pass');
  taskupdate();

  document.getElementById('settask').addEventListener('click',() => {

    fetch('https://api.launchpencil.f5.si/todo/add/?user=' + username + '&pass=' + password + '&name=' + document.getElementById("name").value + '&date=' + document.getElementById("date").value, {
      mode: 'cors'
    })
        .then(response => response.text())
        .then(data => {
                alert(data);
                changetodo();
        })
        .catch(error => {
            alert('タスクのデータ更新に失敗しました。');
            taskupdate();
        });
  });

  document.querySelectorAll('#togle, #settask').forEach(function(element) {
    element.addEventListener('click', function() {
      document.getElementById('form').classList.toggle("show");
    });
  });
}


function taskupdate() {
  var username = localStorage.getItem('user');
  var password = localStorage.getItem('pass');
  
  document.querySelector(".table > div > div").style.backgroundColor = listcolor;
  document.querySelector(".table > div > div").style.borderColor = listline;
  document.querySelector("#setdata, #settask").style.backgroundColor = buttoncolor;

  fetch(`https://api.launchpencil.f5.si/todo/?user=` + username + '&pass=' + password, {
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
              document.getElementById('timetable').innerText = 'タスクのデータ取得に失敗しました。\n エラーメッセージ：' + a[1];
              return;
          }
          a.pop();
          for (let index = 0; index < a.length; index++) {
            var newElement = document.createElement("div");
            newElement.innerHTML = '<div>' + a[index] + '</div>';

            document.getElementsByClassName("table")[0].appendChild(newElement);

            document.querySelectorAll(".table > div > div").forEach(customSelect => {
                customSelect.style.backgroundColor = listcolor;
                customSelect.style.borderColor = listline;
            })
          }
  })
  .catch(error => {
      document.getElementById('timetable').innerText = 'タスクのデータ取得に失敗しました。';
  });
}