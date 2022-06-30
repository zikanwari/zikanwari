<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="utf-8">
    <title>じっかんわり～</title>
</head>
<body>
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
    die('接続エラー：' .$Exception->getMessage());
}
try{
    $sql = "SELECT * FROM zikan.`2-5`";
    $stmh = $pdo->prepare($sql);
    $stmh->execute();
}catch(PDOException $Exception){
    die('接続エラー：' .$Exception->getMessage());
}
?>
<h1>じっかんわり</h1>

<?php
$result_rows = $pdo->query("SELECT UPDATE_TIME FROM information_schema.tables WHERE table_schema = 'zikan'");

foreach ( $result_rows as $row ) {
    echo "<p>最終更新日時:{$row['UPDATE_TIME']}</p>";
}
?>

<table cellpadding="5" border="1"><tbody>
    <tr>
        <th></th>
        <th>月曜日</th>
        <th>火曜日</th>
        <th>水曜日</th>
        <th>木曜日</th>
        <th>金曜日</th>
    </tr>
<?php
    while($row = $stmh->fetch(PDO::FETCH_ASSOC)){
?>
    <tr>
        <th><?=htmlspecialchars($row['time'])?></th>
        <th><?=htmlspecialchars($row['月曜日'])?></th>
        <th><?=htmlspecialchars($row['火曜日'])?></th>
        <th><?=htmlspecialchars($row['水曜日'])?></th>
        <th><?=htmlspecialchars($row['木曜日'])?></th>
        <th><?=htmlspecialchars($row['金曜日'])?></th>
    </tr>
<?php
    }
?>
</tbody></table>

<h2>教科の変更</h2>
<span>意図的に別の教科は書かないようにしましょう。記録に残ります。</span>
<form action="change.php" method="post">
    <p>
        <select name="day">
            <option>月</option>
            <option>火</option>
            <option>水</option>
            <option>木</option>
            <option>金</option>
        </select>
        <span>曜日の</span>
        <select name="time">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
        </select>
        <span>時間目を</span>
        <select name="subject">
            <option>国語</option>
            <option>社会</option>
            <option>数学</option>
            <option>理科</option>
            <option>英語</option>
            <option>体育</option>
            <option>技術</option>
            <option>家庭科</option>
            <option>音楽</option>
            <option>美術</option>
            <option>道徳</option>
            <option>総合</option>
            <option>学活</option>
            <option>なし</option>
            <option>その他</option>
        </select>
        <span>にする</span>
    </p>
    <input type="submit" value="適用">
</form>

<?php
    $pdo = null;
?>
</body>
</html>
