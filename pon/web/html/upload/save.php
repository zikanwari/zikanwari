<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="utf-8">
    <title>変換処理表示</title>
</head>
<body>

<?php

if( !empty($_FILES['temp']['tmp_name']) ) {
    if (is_uploaded_file($_FILES['temp']['tmp_name'])) {
        $filename = $_FILES['temp']['name'];
        if( move_uploaded_file( $_FILES['temp']['tmp_name'], '/var/www/html/upload/temp/' . $filename ) ) {
            echo 'サーバーへの保存が完了しました。変換処理を開始します。';
            /*exec('rm -f /var/www/html/upload/mp4/' . pathinfo($filename, PATHINFO_FILENAME) . '.mp4');
            exec('ffmpeg -y -i "/var/www/html/upload/temp/' . $filename . '" -c:a copy -vn /var/www/html/upload/mp4/' . pathinfo($filename, PATHINFO_FILENAME) . '.mp4');
            exec('mv /var/www/html/upload/temp/' . $filename . ' /var/www/html/upload/mov/');
            echo '変換が完了しました。適用されない場合は再読み込みを行ってください。';*/
        } else {
            echo '保存に失敗しました。再度お試しください。';
        }
    }
}

?>

<ul>
    <li><a href="../">トップへ</a></li>
    <li><a href="./">アップロードを続ける</a></li>
</ul>
</body>
</html>