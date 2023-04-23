function startmoni_todo() {
  document.getElementById('settask').addEventListener('click',() => {

    localStorage.setItem('user', document.getElementById("username").value);
    localStorage.setItem('pass', document.getElementById("password").value);
    alert("保存しました。")
  });

  document.querySelectorAll('#togle, #settask').forEach(function(element) {
    element.addEventListener('click', function() {
      document.getElementById('form').classList.toggle("show");
    });
  });
}