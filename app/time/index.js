console.log("hello");
fetch(`http://10.1.100.224/api/all.php`)
.then(response => response.text())
.then(data => {
    a = data.split(',');
    a.pop();
    for (let index = 0; index < a.length; index++) {
        document.getElementById(index).innerText = a[index];
    }
})