<?php 
use phpMailer\PHPMailer\PHPMailer;

$div = "<script> let tt = document.querySelector('div').textContent</script>";
print $div;

$name = $_POST['up'];

require_once('phpmailer/PHPMailer.php');
require_once('phpmailer/SMTP.php');
require_once('phpmailer/Exception.php');
$mail = new PHPMailer();


print_r($_POST);

$mail->isSMTP();
$mail->Host = "smtp.mail.ru";
$mail->SMTPAuth = true;
$mail->Username = "mikhail.teslya22@mail.ru";
$mail->Password = "123890tesL";
$mail->Port = 465;
$mail-> SMTPSecure = "ssl";

$mail->isHTML(true);
$mail->setFrom("mikhail.teslya22@mail.ru", "Mikhail");
$mail->addAddress("televonvea@gmail.com");

    foreach ( $_POST as $key => $value ) {
        if ($key != 'up' && $value != '' ) {
            $trm = trim($value);
            $trim = htmlspecialchars($trm);
            if (!empty($trim) ) {
                $message .= "
                " . ( ($c = !$c) ? '<tr>':'<tr style="background-color: #f8f8f8;">' ) . "
                    <td style='padding: 10px; border: #e9e9e9 1px solid;'><b>$key</b></td>
                    <td style='padding: 10px; border: #e9e9e9 1px solid;'>$trim</td>
                </tr>
                ";
            } 
        }
    }
    function adopt($text) {
        return '=?UTF-8?B?'.Base64_encode($text).'?=';
    }
    $mail->Subject = adopt($name);
    $mail->Body = "<table style='width: 100%;'>$message</table>" ;
    
    if ($mail->send()) {
        print'hello';
    } else {
        print "Нет";
    }
// foreach ( $_POST as $key => $value ) {
//     $trim = trim($value);
//     if ($key != 'up' && $value != '' ) {
//         $message .= "
//         " . ( ($c = !$c) ? '<tr>':'<tr style="background-color: #f8f8f8;">' ) . "
//             <td style='padding: 10px; border: #e9e9e9 1px solid;'><b>$key</b></td>
//             <td style='padding: 10px; border: #e9e9e9 1px solid;'>$trim</td>
//         </tr>
//         ";
//     }
// }



// function adopt($text) {
// 	return '=?UTF-8?B?'.Base64_encode($text).'?=';
// }
// $mail->Subject = adopt($name);
// $mail->Body = "<table style='width: 100%;'>$message</table>" ;

// if ($mail->send()) {
//     print'hello';
// } else {
//     print "Нет";
// }
