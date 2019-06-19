<?php

function decrypt ($encrypt){


// $plaintext = 'My secret message 1234';
// $password = '3sc3RLrpd17';
$password = date('Y-m-d');
$method = 'aes-256-cbc';

$encrypted = $encrypt;



// Must be exact 32 chars (256 bit)
$password = substr(hash('sha256', $password, true), 0, 32);
// echo "Password:" . $password . "\n";

$iv = chr(0x0) . chr(0x0) . chr(0x0) . chr(0x0) . chr(0x0) . chr(0x0) . chr(0x0) . chr(0x0) . chr(0x0) . chr(0x0) . chr(0x0) . chr(0x0) . chr(0x0) . chr(0x0) . chr(0x0) . chr(0x0);


$decrypted = openssl_decrypt(base64_decode($encrypted), $method, $password, OPENSSL_RAW_DATA, $iv);

// echo 'decrypted to: ' . $decrypted . "\n\n";

return $decrypted;


}


echo decrypt('3OVF80vs2Ls0glEt5f7lWYPzCBOIyL5X8K5efUoXoU4=');

?>
