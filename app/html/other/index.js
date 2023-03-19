function startmoni() {
  document.getElementById('setdata').addEventListener('click',() => {

    localStorage.setItem('user', document.getElementById("username").value);
    localStorage.setItem('pass', document.getElementById("password").value);
    alert("保存しました。「時間割」から確認できます。")
  });

  const setauth = document.querySelector('#setauth');
  const setdata = document.querySelector('#form');

  setauth.addEventListener('click', () => {
    setdata.style.display = 'block';
  });

}
