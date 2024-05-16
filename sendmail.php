<?php
	use PHPMailer\PHPMailer\PHPMailer;
	use PHPMailer\PHPMailer\Exception;

	require 'phpmailer/src/Exception.php';
	require 'phpmailer/src/PHPMailer.php';

	$mail = new PHPMailer(true);
	$mail->CharSet = 'UTF-8';
	$mail->setLanguage('ru', 'phpmailer/language/');
	$mail->IsHTML(true);

	//От кого письмо
	$mail->setFrom('pythonnikita@gmail.com', "Деев Никита");
	//кому отправить
	$mail->addAddress('pythonnikita@gmail.com');
	//Тема письма
	$mail->Subject = 'Данные: ' .$_POST['contact'];
	//Тело письма
	$body = '<h1>Моё письмо</h1>';

	if (trim(!empty($_POST['contact']))){
		$body.='<p><strong>Имя:</strong> '.$_POST['contact'].'</p>';
	}
	if (trim(!empty($_POST['input-company-name']))){
		$body.='<p><strong>Название компании:</strong> '.$_POST['input-company-name'].'</p>';
	}
	if (trim(!empty($_POST['inn']))){
		$body.='<p><strong>ИНН компании:</strong> '.$_POST['inn'].'</p>';
	}

	if (trim(!empty($_POST['sity']))){
		$body.='<p><strong>Город поставки:</strong> '.$_POST['sity'].'</p>';
	}

	if (trim(!empty($_POST['date']))){
		$body.='<p><strong>Дата поставки:</strong> '.$_POST['date'].'</p>';
	}
	if (trim(!empty($_POST['textarea']))){
		$body.='<p><strong>Комментарий отправителя:</strong> '.$_POST['textarea'].'</p>';
	}

	$mail->Body = $body;

	//Отправляем
	if (!$mail->send()) {
		$message = 'Ошибка';
	} else {
		$message = 'Данные отправлены';
	}

	$response = ['message' => $message];

	header('Content-type: application/json');
	echo json_encode($response);
?>