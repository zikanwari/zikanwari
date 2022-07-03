const request = require('request');

var URL = 'https://zikanwari.f5.si/api/tomorrow.php';

request.get({
    uri: URL,
    headers: {'Content-type': 'application/json'},
}, function(err, req, data){
    var a = data;
    for(x in a){
        console.log(a[x])
    }
});