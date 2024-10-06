function startmoni() {

  if (localStorage.getItem('nikka') == "true") {
    document.getElementById("nikkanotice").checked = true;
  } else {
    document.getElementById("nikkanotice").checked = false;
  }

  if (localStorage.getItem('kadai') == "true") {
    document.getElementById("kadainotice").checked = true;
  } else {
    document.getElementById("kadainotice").checked = false;
  }

  document.getElementById('setdata').addEventListener('click',() => {

    localStorage.setItem('user', document.getElementById("username").value);
    localStorage.setItem('pass', document.getElementById("password").value);
    
    checkuser(function () {
      alert("保存しました。「時間割」から確認できます。")
    })
  });

  document.querySelectorAll('#togle, #setdata').forEach(function(element) {
    element.addEventListener('click', function() {
        document.getElementById('form').classList.toggle("show");
    });
  });
  document.querySelectorAll('#togle2, #setheme').forEach(function(element) {
    element.addEventListener('click', function() {
        document.getElementById('form2').classList.toggle("show");
    });
  });
  document.querySelectorAll('#togle3, #setheme').forEach(function(element) {
    element.addEventListener('click', function() {
        document.getElementById('form3').classList.toggle("show");
    });
  });
  document.querySelectorAll('#togle4').forEach(function(element) {
    element.addEventListener('click', function() {
        document.getElementById('form4').classList.toggle("show");
    });
  });

  document.querySelectorAll(".table > div > div").forEach(customSelect => {
      customSelect.style.backgroundColor = listcolor;
      customSelect.style.borderColor = listline;
  })

  document.querySelectorAll(".table > div > div > div > div").forEach(customSelect => {
    customSelect.style.backgroundColor = noselect;
    customSelect.style.borderColor = listline;
})
  
  document.querySelector("#setdata, #settask").style.backgroundColor = buttoncolor;

  document.querySelectorAll("#settheme > div > div > div").forEach(customSelect => {
      customSelect.style.backgroundColor = noselect;
      customSelect.style.borderColor = listline;
      theme = localStorage.getItem("theme")

      customSelect.addEventListener('click', function(){
        if(this.id !== theme) {
          theme = this.id;
          localStorage.setItem('theme', theme);
          updatetheme(theme);
          alert("テーマを「" + this.innerText + "」に変更しました。")
        }
      })
  })

  document.querySelector("#" + theme).style.backgroundColor = select;
}

function kadaicheck() {
  console.log(document.getElementById("kadainotice").checked)
  
  checkuser(function () {

    if (!("Notification" in window)) {
      alert("登録に失敗しました。通知に対応していない可能性があります。");

    } else if (Notification.permission === "granted") {

      testNotification("設定が更新されました");

      serverRegister()

    } else if (Notification.permission !== "denied") {
      
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          testNotification("通知が有効化されました");

          serverRegister()
          
        } else {
          alert("通知が許可されませんでした。設定から手動で有効化してください。")
        }
      });
    }
  })
}
function nikkacheck() {
  console.log(document.getElementById("nikkanotice").checked)
  
  checkuser(function () {

    if (!("Notification" in window)) {
      alert("登録に失敗しました。通知に対応していない可能性があります。");

    } else if (Notification.permission === "granted") {

      testNotification("設定が更新されました");

      serverRegister()

    } else if (Notification.permission !== "denied") {
      
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          testNotification("通知が有効化されました");

          serverRegister()
          
        } else {
          alert("通知が許可されませんでした。設定から手動で有効化してください。")
        }
      });
    }
  })
}


function checkuser(successcode) {
  var username = localStorage.getItem('user');
  var password = localStorage.getItem('pass');

  fetch(`https://api.launchpencil.f5.si/zikanwari/?user=` + username + `&pass=` + password, {
    mode: 'cors'
  })
  .then(response => response.text())
  .then(data => {
          a = data.split(',');
          if (a[0] == "エラー") {
              if (a[1].startsWith("Access denied for user") || a[1].endsWith("doesn't exist")) {
                alert('認証に失敗しました。ユーザー名またはパスワードが間違っているか設定されていません。')
              } else {
                alert('認証に失敗しました。\n エラーメッセージ：' + a[1]);
              }
          } else {
            successcode();
          }
  })
  .catch(error => {
      alert('認証に失敗しました。時間をおいてもう一度試してください。');
      console.log(error);
  });
}



function serverRegister() {
  navigator.serviceWorker.ready.then((serviceWorkerRegistration) => {
    const options = {
      userVisibleOnly: true,
      applicationServerKey: "BKJOWNxZQsHhVRfxIpZn1Xe__yGmBg7iMGEqARKhapJaOhZIpA7Mu-vQUMmePzrfRrawxMoXrcJwpuxhc_j2_PQ",
    };
    serviceWorkerRegistration.pushManager.subscribe(options).then(
      (pushSubscription) => {
        
        let subscriptiondata = pushSubscription.toJSON()

        console.log(subscriptiondata.endpoint);
        console.log(subscriptiondata.keys.p256dh);
        console.log(subscriptiondata.keys.auth);

        localStorage.setItem('nikka', document.getElementById("nikkanotice").checked);
        localStorage.setItem('kadai', document.getElementById("kadainotice").checked);

        fetch(`https://api.launchpencil.f5.si/zikanwari/notification`, {
          method: "POST",
          mode: 'cors',
          body: JSON.stringify({
                "user": localStorage.getItem('user'),
                "pass": localStorage.getItem('pass'),
                "endpoint": subscriptiondata.endpoint,
                "p256dh": subscriptiondata.keys.p256dh,
                "auth": subscriptiondata.keys.auth,
                "nikka": document.getElementById("nikkanotice").checked,
                "kadai": document.getElementById("kadainotice").checked
              })
        })

        .then(response => response.text())
        .catch(error => {
            alert('登録に失敗しました。時間をおいてもう一度試してください。');
            return false;
        });
      },
      (error) => {
        alert('登録に失敗しました。\nエラーメッセージ： ' + error);
      },
    );
  });
}

function testNotification(text) {
  navigator.serviceWorker.ready.then((registration) => {
    registration.showNotification(text, {
      icon: "favicon.png",
      body: "通知はこのように表示されます"
    });
  });
}