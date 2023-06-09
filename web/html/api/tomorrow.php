<?php
try{
    $pdo = new PDO(
        'mysql:host=' . getenv('DB') . ';dbname=zikan;charset=utf8',
        getenv('USER'),
        getenv('PASSWORD')
    );
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
}catch(PDOException $Exception){
    die('エラー,エラー,エラー,エラー,エラー,' .$Exception->getMessage());
}
try{
    $sql = "SELECT * FROM zikan.`" . getenv('USER') . "`";
    $stmh = $pdo->prepare($sql);
    $stmh->execute();
}catch(PDOException $Exception){
    die('エラー,エラー,エラー,エラー,エラー,' .$Exception->getMessage());
}

$week = [
    '月', //日
    '火', //月
    '水', //火
    '木', //水
    '金', //木
    '月', //金
    '月', //土
  ];
   
  $date = date('w');

if(isset($_GET['w'])) {
    $date = $_GET['w'];
}

while($row = $stmh->fetch(PDO::FETCH_ASSOC)){
    echo ( htmlspecialchars($row[ $week[$date] . '曜日' ]) . ',' );
}
echo ( $week[$date] . ',' );