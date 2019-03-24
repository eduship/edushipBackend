<?php
require_once("inc/data.php");
if(isset($_GET["email"]) && $_GET["email"] != "") {
    $statement = $pdo->prepare("INSERT INTO eduship_email (email) VALUES (?)");
    $statement->execute(array(str_replace("(at)", "@", $_GET["email"])));


    $empfaenger = str_replace("(at)", "@", $_GET["email"]);
    $betreff = "Herzlich Willkommen!";
    $nachricht = '
        <html>
            <head>
                <title>
                 Herzlich Willkommen!
                </title>
            </head>
            <body>
                <p style="font-size: 0.9em">E-Mail-Newsletter <a href="http://eduship.kaiseritea.de/deabomail.php?email='.str_replace( "@", "(at)", $row["email"]).'">hier</a> deabonieren.</p>
                <h1>Herzlich Willkommen!</h1>
                <h4>Du bist jetzt im Newsletter zu <a href="https://eduship.de">eduship.de</a> angemeldet. </h4>
                <p>Du erhälst ab sofort die neusten und wichtigsten Updates rund um das eduship-Projekt. <br />
                    Selbstverständlich kannst du dich jederzeit einfach wieder abmelden, klicke dazu einfach auf den Link!
                    <br /><br />
                    Liebe Grüße,<br/><br/>
                    Dein <b>eduship-Team.</b>
                </p>
            </body>
        </html>
        ';
    $header[] = 'MIME-Version: 1.0';
    $header[] = 'Content-type: text/html; charset=utf8';

    $header[] = 'To: ' . $empfaenger;
    $header[] = 'From: team@eduship.de';
    $header[] = 'Reply-To: eduship1@gmail.com';

    mail($empfaenger, $betreff, $nachricht, implode("\r\n", $header));

    print 1;
} else print 0;
?>