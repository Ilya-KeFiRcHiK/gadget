<?php
require_once('link.php');

session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    if (isset($_POST['heading'], $_POST['email'], $_POST['message'],$_POST['name'])) {

        $heading = $_POST['heading'];
        $email = $_POST['email'];
        $message = $_POST['message'];
        $name = $_POST['name'];
        
        $sql = ("INSERT INTO feedback (heading, email, message, name) VALUES ('$heading', '$email', '$message', '$name')");
        $conn->query($sql);
        echo "Спасибо за обращение!";
        $conn->close();
    } else {
        echo "Пожалуйста, заполните все поля формы.";
    }
}
header('Location: index.php');
?>