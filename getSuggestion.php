<?php
if($_GET['type']=="suggest"){
$text=$_GET['query'];
$url='http://localhost:8983/solr/auto_suggestion/suggest?indent=on&q='.$text.'&wt=json';
$response=file_get_Contents($url);
echo $response;
}
else if($_GET['type']=="spellcheck")
{
$response=$_GET['query'];
ini_set("memory_limit",-1);
set_time_limit(0);
include 'SpellCorrector.php';
ini_set("memory_limit",-1);
set_time_limit(0);
$correct_words = array();
$words = explode(" ", $response);
foreach ($words as $x){
    $w=SpellCorrector::correct($x);
    array_push($correct_words, $w );
}
//it will output *october*
echo json_encode($correct_words);
}
else
{
$inp=$_GET['query'];

//$q=str_replace(" ","%20",$inp);
$api_url='http://localhost:8983/solr/auto_suggestion/select?indent=on&q='.urlencode($inp).'&wt=json';
//echo($api_url);
$results_json=file_get_Contents($api_url);
echo $results_json;
}
/*$desc=file_get_Contents("/home/anitha/shared/NYTimesData/NYTimesData/NYTimesDownloadData/NYTimesDownloadData/a0393c59-dc60-429c-b5df-18ea8d54d7c6.html");
$data = $desc->find('body', 0)->innertext;
  var_dump($data);*/
?>
