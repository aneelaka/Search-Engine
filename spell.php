<?php

ini_set("memory_limit",-1);
set_time_limit(0);
include 'SpellCorrector.php';
ini_set("memory_limit",-1);
set_time_limit(0);
echo SpellCorrector::correct('javascipt');
//it will output *october*
?>
