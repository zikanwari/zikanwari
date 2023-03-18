script.onload = function () {
  const setdata = document.getElementById('setdata');
  if (setdata) {
    setdata.addEventListener('click',() => {
      alert('Hello!');
    });
  }
};