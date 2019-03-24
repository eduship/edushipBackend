<?php
header('Access-Control-Allow-Origin: https://eduship.de');
header('Access-Control-Allow-Origin: http://localhost:8080'); // For testing
$pdo = new PDO('mysql:host=rdbms.strato.de; dbname=DB3721210', 'U3721210', 'edushipundso9102');
?>