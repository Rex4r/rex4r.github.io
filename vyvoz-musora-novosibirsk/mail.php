<?php
$name = $_POST['name'];
$phone = $_POST['phone'];
$name = htmlspecialchars($name);
$phone = htmlspecialchars($phone);
$name = urldecode($name);
$phone = urldecode($phone);
$name = trim($name);
$phone = trim($phone);

if (strlen($name) > 0 and strlen($phone) > 0) {
	$isSuccess = mail("чистыйгород@yandex.ru", "Заявка с сайта", "ФИО: " . $name . "\n\rТелефон: " . $phone, "From: мусорнаш@yandex.ru \r\n");
	echo $isSuccess;
} else {
	echo 0;
}