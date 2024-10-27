var username = localStorage.getItem('user');
var password = localStorage.getItem('pass');

function startmoni_todo() {
  var username = localStorage.getItem('user');
  var password = localStorage.getItem('pass');
  taskupdate();

  document.getElementById('settask').addEventListener('click',() => {

    let taskname = document.getElementById("name").value
    let datedata = document.getElementById("date").value

    if (taskname.includes(',')) {
      alert('カンマ(,)を含むことはできません。\n 代わりに読点(、)を使ってください。')
    } else if (taskname.length <= 1) {
      alert('名前が短すぎます。(最低2文字以上)')
    } else if(document.getElementById("date").value == null){
      alert('期限を指定してください。')
    } else {

      fetch('https://api.launchpencil.f5.si/todo/add/?user=' + username + '&pass=' + password + '&name=' + taskname + '&date=' + datedata, {
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
      }
  });

  document.getElementById('modtask').addEventListener('click',() => {

    let oldtask = taskrestore(document.getElementById("tasks").value)

    let taskname = document.getElementById("modname").value
    let datedata = document.getElementById("moddate").value

    if (taskname.includes(',')) {
      alert('カンマ(,)を含むことはできません。\n 代わりに読点(、)を使ってください。')
    } else if (taskname.length <= 1) {
      alert('名前が短すぎます。(最低2文字以上)')
    } else if(document.getElementById("moddate").value == null){
      alert('期限を指定してください。')
    } else {

      fetch('https://api.launchpencil.f5.si/todo/update/?user=' + username + '&pass=' + password +
        '&name=' + oldtask[0] + '&date=' + oldtask[1] +
        '&newname=' + taskname + '&newdate=' + datedata,
        {
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
      }
  });

  document.getElementById('deltask').addEventListener('click',() => {

    let oldtask = taskrestore(document.getElementById("tasks").value)

    if (confirm("課題：") + oldtask + "を削除しますか？") {

      fetch('https://api.launchpencil.f5.si/todo/del/?user=' + username + '&pass=' + password +'&name=' + oldtask[0] + '&date=' + oldtask[1], {
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
    }
  });

  document.querySelectorAll('#togle, #settask').forEach(function(element) {
    element.addEventListener('click', function() {
      document.getElementById('form').classList.toggle("show");
    });
  });

  document.querySelectorAll('#togle2, #modtask, #deltask').forEach(function(element) {
    element.addEventListener('click', function() {
      console.log('clicked')
      document.getElementById('form5').classList.toggle("show");
    });
  });

  document.getElementById("tasks").addEventListener('change', function(event) {
    console.log(event.target.value)
    restored = taskrestore(event.target.value);
    console.log(restored)
    
    document.getElementById("modname").value = restored[0];
    document.getElementById("moddate").value = restored[1];
  })
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

            var newoption = document.createElement("option");
            newoption.text = a[index]
            document.getElementById("tasks").appendChild(newoption)
          }
  })
  .catch(error => {
      document.getElementById('timetable').innerText = 'タスクのデータ取得に失敗しました。';
  });
}

function taskrestore(input) {
  var match = input.match(/(\d+)月(\d+)\(.\)/);
  
  var month = parseInt(match[1], 10);
  var day = parseInt(match[2], 10);
  
  const now = new Date();
  var year = now.getFullYear();
  var currentMonth = now.getMonth() + 1;
  var currentDay = now.getDate();
  
  if (month < currentMonth || (month === currentMonth && day < currentDay)) {
    year++;
  }
  
  var month = month.toString().padStart(2, '0');
  var day = day.toString().padStart(2, '0');

  return [
    input.replace(/\((\d+)月(\d+)\(.\)\)/, '').trim(),
    `${year}-${month}-${day}`
  ];
}