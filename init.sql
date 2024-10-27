
USE zikan;

CREATE TABLE `7418` (
  `time` int(1) NOT NULL,
  `月曜日` char(5) DEFAULT NULL,
  `火曜日` char(5) DEFAULT NULL,
  `水曜日` char(5) DEFAULT NULL,
  `木曜日` char(5) DEFAULT NULL,
  `金曜日` char(5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `7418` (`time`, `月曜日`, `火曜日`, `水曜日`, `木曜日`, `金曜日`) VALUES
(1, '論表', '言文', '論表', '保健', '物理'),
(2, '体育', '英語C', '言文', '言文', '現代文'),
(3, '数学Ⅰ・Ⅱ', '生物', '物理', 'DS', '英語C'),
(4, '数学A', 'その他', '体育', '生物', '数学Ⅰ・Ⅱ'),
(5, '家庭', '芸術', '数学A', '英語C', '体育'),
(6, '家庭', '芸術', '現代文', '数学Ⅰ・Ⅱ', '歴史'),
(7, 'なし', 'SSH', 'なし', '歴史', 'HRA');

ALTER TABLE `7418`
  ADD UNIQUE KEY `time` (`time`,`月曜日`,`火曜日`,`水曜日`,`木曜日`,`金曜日`);


USE todo;

CREATE TABLE `7418` (
 `name` varchar(15) NOT NULL,
 `date` date NOT NULL,
 UNIQUE KEY `name` (`name`,`date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4


---分けて実行
CREATE USER '7418'@'%' IDENTIFIED VIA mysql_native_password USING '***';
GRANT ALL PRIVILEGES ON `zikan`.* TO `7418`@`%` WITH GRANT OPTION;
GRANT SELECT, INSERT, UPDATE, DELETE ON `todo`.* TO `7418`@`%`;