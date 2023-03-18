script.onload = function () {
  const setdata = document.getElementById('setdata');
  if (setdata) {
    setdata.addEventListener('click',() => {
      console.log('Hello!');
    });
  }
};