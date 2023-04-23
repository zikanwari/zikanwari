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
    $sql = "SELECT * FROM zikan.`". getenv('USER') . "`";
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
            <option>7</option>
        </select>
        <span>時間目を</span>
        <select name="subject">
            <option value="英語E">英語E</option>
            <option value="体育">体育</option>
            <option value="数学Ⅰ・Ⅱ">数学Ⅰ・Ⅱ</option>
            <option value="数学A">数学A</option>
            <option value="家庭">家庭</option>
            <option value="言文">言文</option>
            <option value="英語C">英語C</option>
            <option value="生物">生物</option>
            <option value="芸術">芸術</option>
            <option value="物理">物理</option>
            <option value="現代文">現代文</option>
            <option value="保健">保健</option>
            <option value="DS">DS</option>
            <option value="生物">生物</option>
            <option value="歴史">歴史</option>
            <option value="HRA">HRA</option>
            <option value="SSH">SSH</option>
            <option value="その他">その他</option>
            <option value="なし">なし</option>
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
