const request = require('request');

var URL = 'https://zikanwari.f5.si/api/tomorrow.php';

request.get({
    uri: URL,
    headers: {'Content-type': 'application/json'},
}, function(err, req, data){
    a = data.split(',');
    console.log(a)
    for(x in a){
        console.log(a[x])
    } 
});