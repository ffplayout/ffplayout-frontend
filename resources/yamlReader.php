<?php
// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);

/* -----------------------------------------------------------------------------
read values from ffplayout config file
------------------------------------------------------------------------------*/
// get config file
function get_yaml() {
    return yaml_parse_file("/etc/ffplayout/ffplayout.yml", 0);
}
?>
