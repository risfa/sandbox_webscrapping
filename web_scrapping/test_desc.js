var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
var iconv = require('iconv-lite');
const https = require('https');

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "dapps",
  password: "l1m4d1g1t",
  database : 'dapps_XENIEL_sandbox_debi'
  // charset : 'utf8mb4'

});





con.query("SELECT username,instagram_id FROM instagram_users where insta_story != 1 ORDER by id DESC LIMIT 1", function(err, rows, fields) {
        rows.forEach(function(row) {


          // username = row.username




              const options = {
                url: 'https://www.instagram.com/graphql/query/?query_hash=a22a50ce4582220909e302d6eb84d259&variables={"reel_ids":["'+row.instagram_id+'"],"tag_names":[],"location_ids":[],"highlight_reel_ids":[],"precomposed_overlay":false,"show_story_viewer_list":true,"story_viewer_fetch_count":50,"story_viewer_cursor":""}',
                headers: {
                  'cookie': 'mcd=3; mid=XBIhGQAEAAHcnCbPArtkoSTeuLHz; shbid=6323; shbts=1548133910.5068145;fbm_124024574287414=base_domain=.instagram.com;rur=ATN;fbsr_124024574287414=UD3U91kzsWEGrbK9AcbaAwmV85c0eMsIAJtRfWEruo4.eyJhbGdvcml0aG0iOiJITUFDLVNIQTI1NiIsImNvZGUiOiJBUUExSTV3YkU0QTl1d1hRVWw0NUZsYTR3aENqZjE0UEZ0STNxUFdFdlJVZWhZbzBVMzVUVFZFUFQwczdaQ3J6Z2lnOWZpNzBqVlRGZTFVOEdJWDgyYXdnRzVXUGZXazB5dTNhdUYxT0FtN2p0ZnpYczR0Wk50OFlHTUxZRlFwb2xvYnZBRHk0cWNpd1NocVZFMF9MM1lnSDhoemdXeFpRSXhnckNvbDlxN05nVTFpVENxcXdpYmpDb0F4UUtCT0dkUWY2R3lueDdtcTJKMG9IYVROMjlMclJaWVJfMDhQTDBsVDQwSTZ0Z3F5cWFuXzJWVmdBTmtYOXdIdkhfd1lqZmtRVjZJNUtOZXJURFZGVHAxbmVsYWFPLUdCaW9icXJ1Rzd6SUw2bEZuQi1XdVdXczVhWmVySUpKUm9IRVlUQ1pLNHFwT1d4YXNFSVA2bVc4ZV92MGs3OCIsImlzc3VlZF9hdCI6MTU0ODI5NTA0NiwidXNlcl9pZCI6IjEwMDAwMDgyNTI5MTc5OSJ9; csrftoken=PmOadYmRV4sLc2TaxDajTht7nJfMeOqS; ds_user_id=2118484329; sessionid=2118484329%3A7qWc9utxdishs2%3A7;urlgen="{\"182.253.178.103\": 17451\054 \"182.253.177.62\": 17451}:1gmUHr:b4FiMwAdbPcOvggvrxzdKxztTWM',
                  'x-ig-app-id': '936619743392459',
                  'x-instagram-gis': 'bf23ef082274cc8ae4565268a58dd644',
                  'x-requested-with': 'XMLHttpRequest',
                }
              };



            request(options, function(error, response, html){
              var html = JSON.parse(html)


                if (html.data.reels_media.length > 0) {

                 html.data.reels_media[0].items.forEach(function(x1,y1){
                        
                  var display_resources = '';
                  var type = ''
                  var tappable_objects = '';
                  var instagram_story_id = html.data.reels_media[0].items[y1].id;
                  var name = html.data.reels_media[0].owner.username;

                  // cek video atau image
                  if (html.data.reels_media[0].items[y1].__typename == 'GraphStoryVideo') {
                        display_resources = html.data.reels_media[0].items[y1].video_resources[0].src;
                        type = 'mp4';
                    
                  }else if(html.data.reels_media[0].items[y1].__typename == 'GraphStoryImage'){
                        display_resources = html.data.reels_media[0].items[y1].display_resources[0].src;
                        type = '3gp';

                    
                  }

                  // cek mentions

                  // print +=  'ini adalah length : '+ html.data.reels_media[0].items[y1].tappable_objects.length + '</br>' 
                  if (html.data.reels_media[0].items[y1].tappable_objects.length >= 1) {
                    if (html.data.reels_media[0].items[y1].tappable_objects[0].__typename == 'GraphTappableMention') {
                      tappable_objects = html.data.reels_media[0].items[y1].tappable_objects[0].username;
                      
                    }else if(html.data.reels_media[0].items[y1].tappable_objects[0].__typename == 'GraphTappableLocation'){
                      tappable_objects = 'https://www.instagram.com/explore/locations/'+html.data.reels_media[0].items[y1].tappable_objects[0].id+'/';

                    }
                    
                  }

                  let sql_insert_instastory = "INSERT INTO `tb_instagram_story` (`instagram_story`, `instagram_id`, `instagram_story_id`, `tappable_objects`, `waktu`) VALUES (NULL, '"+row.instagram_id+"', '"+instagram_story_id+"', '"+tappable_objects+"', '"+html.data.reels_media[0].items[y1].taken_at_timestamp+"')";
                  con.query(sql_insert_instastory)

                 downloadFile(display_resources,type,name,instagram_story_id)


                });

                 // upload_firebase(display_resources); 

                 console.log('berhasil');
              }else{
                 console.log('gagal');

                
              }
                 let sql_update = "UPDATE `instagram_users` SET `insta_story` = 1 WHERE `instagram_users`.`instagram_id` = "+row.instagram_id+"";
                 con.query(sql_update, function (err, result) {});


                  // res.send(html.data.user.edge_owner_to_timeline_media.edges[0].node.edge_media_to_caption.edges[0].node.text);
            });

    });
  });




function unix_timestamp(unix_timestamp){
  var current_datetime = new Date(unix_timestamp*1000);
// Hours part from the timestamp

  return current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate() + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds()
}


function upload_firebase(file_path){
    bucket.upload(file_path, {
        // destination: 'subfolder/package.json',
        public: true,
        metadata: {
                   contentType: fileMime,
                    cacheControl: "public, max-age=300"
                }
    }, function (err, file) {
        if (err) {
            console.log(err);
            return;
        }
        console.log(createPublicFileURL(uploadTo));
    });
  
}






function createPublicFileURL(storageName) {
    return `http://storage.googleapis.com/${bucketName}/${encodeURIComponent(storageName)}`;

}

function downloadFile(url,type,name,instagram_story_id){
  var file = '';

  // get date 
  var d = new Date();
  var year_now = d.getFullYear();
  var month_now = d.getMonth()+1;
  var date_now = d.getDate();


  // end

  // creat new folder by user id
   if (!fs.existsSync('/home/dapps/public_html/BATMAN/sandbox/web_scrapping/data/'+name)) {
      fs.mkdirSync('/home/dapps/public_html/BATMAN/sandbox/web_scrapping/data/'+name, 0777);
  }

  // end
  // creat new folder by year
   if (!fs.existsSync('/home/dapps/public_html/BATMAN/sandbox/web_scrapping/data/'+name+'/'+year_now)) {
      fs.mkdirSync('/home/dapps/public_html/BATMAN/sandbox/web_scrapping/data/'+name+'/'+year_now, 0777);
  }
  // end

  // creat new folder by date
   if (!fs.existsSync('/home/dapps/public_html/BATMAN/sandbox/web_scrapping/data/'+name+'/'+year_now+'/'+month_now)) {
      fs.mkdirSync('/home/dapps/public_html/BATMAN/sandbox/web_scrapping/data/'+name+'/'+year_now+'/'+month_now, 0777);
  }
  // end


  // creat new folder by date
   if (!fs.existsSync('/home/dapps/public_html/BATMAN/sandbox/web_scrapping/data/'+name+'/'+year_now+'/'+month_now+'/'+date_now)) {
      fs.mkdirSync('/home/dapps/public_html/BATMAN/sandbox/web_scrapping/data/'+name+'/'+year_now+'/'+month_now+'/'+date_now, 0777);
  }
  // end


  if (type == 'mp4') {
    file = fs.createWriteStream('/home/dapps/public_html/BATMAN/sandbox/web_scrapping/data/'+name+'/'+year_now+'/'+month_now+'/'+date_now+'/'+instagram_story_id+'.mp4');

  }else{
    file = fs.createWriteStream('/home/dapps/public_html/BATMAN/sandbox/web_scrapping/data/'+name+'/'+year_now+'/'+month_now+'/'+date_now+'/'+instagram_story_id+'.jpg');

  }
  const request = https.get(url, function(response) {

    // response.pipe(file);

     response.on('data', function (chunk) {
        file.write(chunk);
    });
    response.on('end',function(chunk){
        file.end();
    });


  });

}


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


setInterval((function() {  
  return process.exit(22);
}), 1000);