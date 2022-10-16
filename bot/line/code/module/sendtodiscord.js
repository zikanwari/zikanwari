"use strict";
exports.__esModule = true;
exports.senddiscord = exports.setup = void 0;
var request = require("request");
var TOKEN = process.env.LINE_ACCESS_TOKEN;
var sendurl;
function setup(url) {
    sendurl = url;
}
exports.setup = setup;
function senddiscord(content) {
    var options = {
        uri: "https://api.line.me/v2/bot/profile/" + content.source.userId,
        method: 'GET',
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + TOKEN
        },
        json: true
    };
    request(options, function (error, response, body) {
        console.log(body);
        var sendmsg = {
            uri: sendurl,
            headers: {
                "Content-type": "application/json"
            },
            json: {
                "username": body.displayName,
                "avatar_url": body.pictureUrl,
                "content": content.message.text
            }
        };
        request.post(sendmsg);
    });
}
exports.senddiscord = senddiscord;
