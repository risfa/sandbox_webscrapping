<?php 

  function fetchData($url){
  $ch = curl_init();
  curl_setopt($ch, CURLOPT_URL, $url);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
  curl_setopt($ch, CURLOPT_TIMEOUT, 20);
  $result = curl_exec($ch);
  curl_close($ch); 
  return $result;
  }

  
  $result = fetchData("https://api.instagram.com/v1/users/15399742/media/recent/?access_token=ACCESS_TOKENf&count=6");

  print_r($result); 
  
 ?>