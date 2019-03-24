<?php
require_once("inc/data.php");
if(isset($_GET["emailid"]) && $_GET["emailid"] != "") {
    $statement = $pdo->prepare("DELETE FROM eduship_email WHERE id=?");
    $statement->execute(array($_GET["emailid"]));
    print "E-Mail-Adresse wurde erfolgreich entfernt.";
} else print "Es gab leider einen Fehler.";
?>