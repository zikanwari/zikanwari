const mysql = require('mysql2');
const webpush = require('web-push');

classlist = [
    `7321`,
    `7322`,
    `7323`,
    `7324`,
    `7325`,
    `7326`,
    `7327`,
    `7328`,
    `7329`
]

let classcount = 0


webpush.setVapidDetails(
    'mailto:launchpencil@gmail.com',
    process.env.publickey,
    process.env.privatekey
);

const connection = mysql.createPool({
    host: '192.168.0.3',
    user: process.env.user,
    password: process.env.pass,
    database: 'todo',
    connectionLimit: 10
});
const connection2 = mysql.createPool({
    host: '192.168.0.3',
    user: process.env.user,
    password: process.env.pass,
    database: 'zikan',
    connectionLimit: 10
});

let day = new Date().getDay()
let week = [
    '月曜日', //日
    '火曜日', //月
    '水曜日', //火
    '木曜日', //水
    '金曜日', //木
    '月曜日', //金
    '月曜日', //土
];

connection.getConnection((err) => {
    if (err) {
        console.error('error connecting: ' + err.message);
        return;
    }

    for (let i = 0; i < classlist.length; i++) {
        
        connection.query("SELECT * FROM ?? WHERE date = CURDATE();", [classlist[i]], (err, results, fields) => {
            if (err) {
                console.error('error querying: ' + err.stack);
                return;
            }

            console.log(classlist[i])
            if (results.length == 0) {

                let kadaistr = ''

                results.forEach((element, index) => {
                    kadaistr += index+1 + element[week[day]] + '、'
                });
        
                var payload = JSON.stringify({
                    title: '明日が期限の提出物があります',
                    body : '明日までの提出物は\n' + kadaistr + 'です',
                    icon: "https://app.zikanwari.f5.si/favicon.png"
                });
                if (kadaistr != '') {
                    sendNotification(classlist[i], payload)
                    console.log(payload.body)
                } else {
                    classcount++
                    
                    if (classcount == classlist.length) {
                        console.log('all class done!');
                        connection.end();
                        connection2.end();
                    }
                }
            } else {
                classcount++

                if (classcount == classlist.length) {
                    console.log('all class done!');
                    connection.end();
                    connection2.end();
                }
            }
        });
    }
});

function sendNotification(classid, payload) {

    connection2.getConnection((err) => {
        if (err) {
            console.error('error connecting: ' + err.message);
            return;
        }

        connection2.query("SELECT * FROM `user` WHERE user = ? AND kadai = 1", [classid], (err, results, fields) => {
            if (err) {
                console.error('error querying: ' + err.stack);
                return;
            }
    
            results.forEach((row) => {
                var pushSubscription = {
                    endpoint: row.endpoint,
                    keys: {
                        p256dh: row.p256dh,
                        auth: row.auth
                    }
                };

                webpush.sendNotification(
                    pushSubscription,
                    payload
                ).catch(error => {
                    console.error(error.stack);
                });

                console.log(classid + row.endpoint)
            });
            classcount++

            if (classcount == classlist.length) {
                console.log('all class done!');
                connection.end();
                connection2.end();
            }
        });
    });
}