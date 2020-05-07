<?php
error_reporting(E_ALL);
ini_set('display_errors', 'On');

require_once('yamlReader.php');

function printer($file) {
    $yaml = get_yaml();
    $log_file = $yaml['logging']['log_path'] . $file;
    $open_log = fopen($log_file, "r") or die("Unable to open file!");
    echo fread($open_log,filesize($log_file));
    fclose($open_log);
}

// get playout log
if(!empty($_GET['log_from'])) {
    $log_from = $_GET['log_from'];

    if ($log_from === "playing") {
         printer("/ffplayout.log");
    }

    if ($log_from === "decoder") {
        printer("/decoder.log");
    }

    if ($log_from === "encoder") {
        printer("/encoder.log");
    }

    if ($log_from === "system") {
        echo shell_exec("sudo /bin/journalctl -u ffplayout.service -n 1000");
    }
}

?>
