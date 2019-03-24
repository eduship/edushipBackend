<?php
require_once("inc/data.php");
if(isset($_GET["nachricht"]) && $_GET["nachricht"] != "") {

    $sql = "SELECT email, id FROM eduship_email";
    foreach ($pdo->query($sql) as $row) {
        $empfaenger = $row["email"];
        $betreff = $_GET["subject"];
        $nachricht = '
        <html>
            <head>
                <title>
                 '.$_GET["subject"].'
                </title>
            </head>
            <body>
            <p style="font-size: 0.9em">E-Mail-Newsletter <a href="http://eduship.kaiseritea.de/deabomail.php?emailid='.$row["id"].'">hier</a> deabonieren.</p>
            '.$_GET["nachricht"].'
            </body>
        </html>
        ';
        $header[] = 'MIME-Version: 1.0';
        $header[] = 'Content-type: text/html; charset=utf8';

        $header[] = 'To: ' . $empfaenger;
        $header[] = 'From: ' . $_GET["from"];
        $header[] = 'Reply-To: eduship1@gmail.com';

        mail($empfaenger, $betreff, $nachricht, implode("\r\n", $header));
    }
} else print 0;
?>