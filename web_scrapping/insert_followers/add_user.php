<?php 


function httpGet($url)
{
    $ch = curl_init();  
 
    curl_setopt($ch,CURLOPT_URL,$url);
    curl_setopt($ch,CURLOPT_RETURNTRANSFER,true);
//  curl_setopt($ch,CURLOPT_HEADER, false); 
 
    $output=curl_exec($ch);
 
    curl_close($ch);
    return $output;
}


 

$servername = "localhost";
$username = "root";
$password = "l1m4d1g1t";
$dbname = "dapps_XENIEL_sandbox_debi";

// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);
// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$sql = "SELECT * FROM tb_insert_following LiMIT 3000";
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {

    while($row = mysqli_fetch_assoc($result)) {
		httpGet("http://debi.5dapps.com/script/report/".$row['username']."");
		$delete = mysqli_query($conn,"DELETE FROM tb_insert_following where id_user = '".$row['id_user']."'");
		if ($delete) {
			echo 'berhasil delete';
		}else{
			echo "gagal delete";
		}

    }
} else {
    echo "0 results";
}

mysqli_close($conn);
?>

