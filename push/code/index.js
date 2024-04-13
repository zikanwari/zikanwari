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


webpush.setVapidDetails(
    'mailto:launchpencil@gmail.com',
    process.env.publickey,
    process.env.privatekey
);

const connection = mysql.createPool({
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
        
        connection.query("SELECT ?? FROM ??", [week[day], classlist[i]], (err, results, fields) => {
            if (err) {
                console.error('error querying: ' + err.stack);
                return;
            }

            var subjectstr = ''

            results.forEach((element, index) => {
                subjectstr += index+1 + element[week[day]] + ' '
            });

            console.log(classlist[i] + subjectstr)
    
            var payload = JSON.stringify({
                title: '日課表のお知らせ',
                body : '明日の日課表は\n' + subjectstr + 'です',
                icon: "https://app.zikanwari.f5.si/favicon.png"
            });

            sendNotification(classlist[i], payload)
        });
    }
});

function sendNotification(classid, payload) {

        connection.query("SELECT * FROM `user` WHERE user = ?", [classid], (err, results, fields) => {
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
            });
    
            if (classid == '7328') {
                console.log('all class done!');
                connection.end();
            }
            
        });
}