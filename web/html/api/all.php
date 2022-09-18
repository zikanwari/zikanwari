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
    $sql = "SELECT * FROM zikan.`2-5`";
    $stmh = $pdo->prepare($sql);
    $stmh->execute();
}catch(PDOException $Exception){
    die('エラー,エラー,エラー,エラー,エラー,' .$Exception->getMessage());
}

$week = [
    '月',
    '火',
    '水',
    '木',
    '金',
  ];

  $x = 0;
  for ($i=0; $i < 5; $i++) { 
    while($row = $stmh->fetch(PDO::FETCH_ASSOC)){
        echo ( htmlspecialchars($row[ $week[$x] . '曜日' ]) . ',' );
    }
    $x++;
  }