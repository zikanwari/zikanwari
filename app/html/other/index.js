function startmoni() {
  document.getElementById('setdata').addEventListener('click',() => {
    console.log('Hello!');

    localStorage.setItem('user', document.getElementById("username").value);
    localStorage.setItem('pass', document.getElementById("password").value);
  });
}