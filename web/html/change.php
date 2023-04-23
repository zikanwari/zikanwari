<?php
    try{
        $pdo = new PDO(
            'mysql:host=' . getenv('DB') . ';dbname=zikan;charset=utf8',
            getenv('USER'),
            getenv('PASSWORD')
        );
    }catch(PDOException $Exception){
        die('接続エラー：' .$Exception->getMessage());
    };
    $day = ($_POST['day']);
    $time = ($_POST['time']);
    $subject = ($_POST['subject']);
    $coma = 'UPDATE `' . getenv('USER') . '` SET `' . $day . '曜日` = \'' . $subject . '\' WHERE `' . getenv('USER') . '`.`time` = ' . $time;
    echo 'コマンド：' . $coma . 'を実行しています…';
    $pdo->query($coma);
    echo '成功しました。\n';

    $alert_message = $day . '曜日の' . $time . '時間目の教科を' . $subject . 'に変更しました。';
    $alert = "<script type='text/javascript'>alert('".$alert_message."');</script>";

    echo $alert;
    echo "<script type='text/javascript'>location.href = 'https://zikanwari.f5.si';</script>"
?>
