function startmoni() {
  document.getElementById('setdata').addEventListener('click',() => {

    localStorage.setItem('user', document.getElementById("username").value);
    localStorage.setItem('pass', document.getElementById("password").value);
    alert("保存しました。「時間割」から確認できます。")
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

  document.querySelectorAll(".table > div > div").forEach(customSelect => {
      customSelect.style.backgroundColor = listcolor;
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