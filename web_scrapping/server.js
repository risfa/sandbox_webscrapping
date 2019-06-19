var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
var iconv = require('iconv-lite');
const https = require('https');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";





var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "dapps",
  password: "l1m4d1g1t",
  database : 'dapps_XENIEL_sandbox_debi'
  // charset : 'utf8mb4'

});


app.get('/instagram2', function(req, res){
      // var title, release, rating;
      var data_array = [];
      var data_array2 = [];
      var data_array3 = [];
      var options = '';



      function InsertDatabase(username,instagram_id){


                    options = {
                        url: 'https://www.instagram.com/'+username+'/?__a=1',
                        // url: 'https://www.instagram.com/pevpearce/?__a=1',
                        headers: {
                          'cookie': 'mcd=3; mid=XBIhGQAEAAHcnCbPArtkoSTeuLHz; shbid=6323; shbts=1548133910.5068145;fbm_124024574287414=base_domain=.instagram.com;rur=ATN;fbsr_124024574287414=UD3U91kzsWEGrbK9AcbaAwmV85c0eMsIAJtRfWEruo4.eyJhbGdvcml0aG0iOiJITUFDLVNIQTI1NiIsImNvZGUiOiJBUUExSTV3YkU0QTl1d1hRVWw0NUZsYTR3aENqZjE0UEZ0STNxUFdFdlJVZWhZbzBVMzVUVFZFUFQwczdaQ3J6Z2lnOWZpNzBqVlRGZTFVOEdJWDgyYXdnRzVXUGZXazB5dTNhdUYxT0FtN2p0ZnpYczR0Wk50OFlHTUxZRlFwb2xvYnZBRHk0cWNpd1NocVZFMF9MM1lnSDhoemdXeFpRSXhnckNvbDlxN05nVTFpVENxcXdpYmpDb0F4UUtCT0dkUWY2R3lueDdtcTJKMG9IYVROMjlMclJaWVJfMDhQTDBsVDQwSTZ0Z3F5cWFuXzJWVmdBTmtYOXdIdkhfd1lqZmtRVjZJNUtOZXJURFZGVHAxbmVsYWFPLUdCaW9icXJ1Rzd6SUw2bEZuQi1XdVdXczVhWmVySUpKUm9IRVlUQ1pLNHFwT1d4YXNFSVA2bVc4ZV92MGs3OCIsImlzc3VlZF9hdCI6MTU0ODI5NTA0NiwidXNlcl9pZCI6IjEwMDAwMDgyNTI5MTc5OSJ9; csrftoken=PmOadYmRV4sLc2TaxDajTht7nJfMeOqS; ds_user_id=2118484329; sessionid=2118484329%3A7qWc9utxdishs2%3A7;urlgen="{\"182.253.178.103\": 17451\054 \"182.253.177.62\": 17451}:1gmUHr:b4FiMwAdbPcOvggvrxzdKxztTWM',
                          'referer': 'https://www.instagram.com/'+username+'/',
                          // 'referer': 'https://www.instagram.com/pevpearce/',
                          'x-ig-app-id': '936619743392459',
                          'x-instagram-gis': 'bf23ef082274cc8ae4565268a58dd644',
                          'x-requested-with': 'XMLHttpRequest',
                        }
                      };


                    request(options, function(error, response, html){
                      var html = JSON.parse(html)


                          // insert mongodb

                          MongoClient.connect(url, function(err, db) {
                            if (err) throw err;
                            var dbo = db.db("debi");

                            dbo.collection("instagram").insert(html, function(err, res) {
                              if (err) throw err;
                              console.log("Number of documents inserted: " + res.insertedCount);
                              db.close();
                            });
                          });

                          // con.connect(function(err) {
                          //   if (err) throw res.send(err);

                            html.graphql.user.edge_owner_to_timeline_media.edges.forEach(function(x,y){
                              // var output = iconv.decode(html.graphql.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_caption.edges[0].node.text, "ISO-8859-1");
                              // var output = iconv.decode(html.graphql.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_caption.edges[0].node.text, "utf8");
                              // var output = html.graphql.user.edge_owner_to_timeline_media.edges[0].node.edge_media_to_caption.edges[0].node.text

                              // let sql = "INSERT INTO `tb_instagram` (`instagram_id`,`instagram_user_id`, `post_id`, `post_text`, `post_comment`, `post_like`) VALUES (NULL,"+row.instagram_id+", "+html.graphql.user.edge_owner_to_timeline_media.edges[y].node.id+" , '"+html.graphql.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_caption.edges[0].node.text+"', "+html.graphql.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.count+", "+html.graphql.user.edge_owner_to_timeline_media.edges[y].node.edge_liked_by.count+")";

                              if(html.graphql.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_caption.edges.length >= 1){


                                let sql = "INSERT INTO `tb_instagram` (`instagram_id`,`instagram_user_id`, `post_id`, `post_text`, `post_comment`, `post_like` , `biography` , `country_block`, `is_business_account` , `business_category_name`, `business_email` , `business_phone_number`, `is_verified` , `profile_pic_url_hd`, `connected_fb_page` , `post_shortcode`,`display_url`) VALUES (NULL,"+instagram_id+", "+html.graphql.user.edge_owner_to_timeline_media.edges[y].node.id+" , '"+html.graphql.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_caption.edges[0].node.text+"',"+html.graphql.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.count+","+html.graphql.user.edge_owner_to_timeline_media.edges[y].node.edge_liked_by.count+",'"+html.graphql.user.biography+"','"+html.graphql.user.country_block+"','"+html.graphql.user.is_business_account+"','"+html.graphql.user.business_category_name+"','"+html.graphql.user.business_email+"','"+html.graphql.user.business_phone_number+"','"+html.graphql.user.is_verified+"','"+html.graphql.user.profile_pic_url_hd+"','"+html.graphql.user.connected_fb_page+"','"+html.graphql.user.edge_owner_to_timeline_media.edges[y].node.shortcode+"','"+html.graphql.user.edge_owner_to_timeline_media.edges[y].node.display_url+"')";
                                con.query(sql, function (err, result) {
                                  if (err){
                                          let sql_update = "UPDATE `tb_instagram` SET `display_url` = '"+html.graphql.user.edge_owner_to_timeline_media.edges[y].node.display_url+"',post_shortcode = '"+html.graphql.user.edge_owner_to_timeline_media.edges[y].node.shortcode+"' WHERE `tb_instagram`.`post_id` = "+html.graphql.user.edge_owner_to_timeline_media.edges[y].node.id+" "
                                          con.query(sql_update, function (err, result) {
                                          });

                                  }

                                });

                              }




                            })

                            // con.query("UPDATE `instagram_users` SET `is_run` = 1 WHERE `instagram_users`.`instagram_id` = "+instagram_id+"", function (err, result) {
                            //   // if (err) throw res.send(err);
                            //   res.send(instagram_id);
                            //   // console.log('succes')
                            //
                            //
                            // });



                          // });
                          res.send(html)





                    });

      }

      // first

      con.query("SELECT username,instagram_id FROM instagram_users where is_run != 1 LIMIT 1", function(err, rows, fields) {
        rows.forEach(function(row) {

          // username = row.username

          InsertDatabase(row.username,row.instagram_id)


          con.query("UPDATE `instagram_users` SET `is_run` = 1 WHERE `instagram_users`.`instagram_id` = "+row.instagram_id+"", function (err, result) {
            // if (err) throw res.send(err);
            // console.log('succes')


          });

        });
      });
      // con.end()



})




app.get('/instagram3', function(req, res){
      // var title, release, rating;
      var data_array = [];
      var data_array2 = [];
      var data_array3 = [];

      con.query("SELECT username,instagram_id FROM instagram_users where is_run != 1 LIMIT 1", function(err, rows, fields) {
        rows.forEach(function(row) {
          // username = row.username



              const options = {
                url: 'https://www.instagram.com/'+row.username+'/?__a=1',
                headers: {
                  'cookie': 'mcd=3; mid=XBIhGQAEAAHcnCbPArtkoSTeuLHz; shbid=6323; shbts=1548133910.5068145;fbm_124024574287414=base_domain=.instagram.com;rur=ATN;fbsr_124024574287414=UD3U91kzsWEGrbK9AcbaAwmV85c0eMsIAJtRfWEruo4.eyJhbGdvcml0aG0iOiJITUFDLVNIQTI1NiIsImNvZGUiOiJBUUExSTV3YkU0QTl1d1hRVWw0NUZsYTR3aENqZjE0UEZ0STNxUFdFdlJVZWhZbzBVMzVUVFZFUFQwczdaQ3J6Z2lnOWZpNzBqVlRGZTFVOEdJWDgyYXdnRzVXUGZXazB5dTNhdUYxT0FtN2p0ZnpYczR0Wk50OFlHTUxZRlFwb2xvYnZBRHk0cWNpd1NocVZFMF9MM1lnSDhoemdXeFpRSXhnckNvbDlxN05nVTFpVENxcXdpYmpDb0F4UUtCT0dkUWY2R3lueDdtcTJKMG9IYVROMjlMclJaWVJfMDhQTDBsVDQwSTZ0Z3F5cWFuXzJWVmdBTmtYOXdIdkhfd1lqZmtRVjZJNUtOZXJURFZGVHAxbmVsYWFPLUdCaW9icXJ1Rzd6SUw2bEZuQi1XdVdXczVhWmVySUpKUm9IRVlUQ1pLNHFwT1d4YXNFSVA2bVc4ZV92MGs3OCIsImlzc3VlZF9hdCI6MTU0ODI5NTA0NiwidXNlcl9pZCI6IjEwMDAwMDgyNTI5MTc5OSJ9; csrftoken=PmOadYmRV4sLc2TaxDajTht7nJfMeOqS; ds_user_id=2118484329; sessionid=2118484329%3A7qWc9utxdishs2%3A7;urlgen="{\"182.253.178.103\": 17451\054 \"182.253.177.62\": 17451}:1gmUHr:b4FiMwAdbPcOvggvrxzdKxztTWM',
                  'referer': 'https://www.instagram.com/'+row.username+'/',
                  'x-ig-app-id': '936619743392459',
                  'x-instagram-gis': 'bf23ef082274cc8ae4565268a58dd644',
                  'x-requested-with': 'XMLHttpRequest',
                }
              };


            request(options, function(error, response, html){
              var html = JSON.parse(html)
                  // console.log(html.graphql.user.edge_owner_to_timeline_media.edges[0].node)


                  // con.connect(function(err) {
                  //   if (err) throw res.send(err);





                    html.graphql.user.edge_felix_video_timeline.edges.forEach(function(x,y){
                      // var output = iconv.decode(html.graphql.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_caption.edges[0].node.text, "ISO-8859-1");
                      // var output = iconv.decode(html.graphql.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_caption.edges[0].node.text, "utf8");
                      // var output = html.graphql.user.edge_owner_to_timeline_media.edges[0].node.edge_media_to_caption.edges[0].node.text

                      let sql = "INSERT INTO `tb_instagram` (`instagram_id`,`instagram_user_id`, `post_id`, `post_text`, `post_comment`, `post_like`) VALUES (NULL,"+row.instagram_id+", "+html.graphql.user.edge_felix_video_timeline.edges[y].node.id+" , '"+html.graphql.user.edge_felix_video_timeline.edges[y].node.edge_media_to_caption.edges[0].node.text+"', "+html.graphql.user.edge_felix_video_timeline.edges[y].node.edge_media_to_comment.count+", "+html.graphql.user.edge_felix_video_timeline.edges[y].node.edge_liked_by.count+")";
                      // let sql = "INSERT INTO `tb_instagram` (`instagram_id`, `post_id`, `post_text`, `post_comment`, `post_like`) VALUES (NULL, 'a' , '"+html.graphql.user.edge_owner_to_timeline_media.edges[0].node.edge_media_to_caption.edges[0].node.text+"', 'a', 'a')";
                      con.query(sql, function (err, result) {
                        // if (err) throw res.send(err);

                      });
                    })


                    // con.end()
                    // var output = iconv.decode(html.graphql.user.edge_owner_to_timeline_media.edges[0].node.edge_media_to_caption.edges[0].node.text, "utf8");


                    // res.send(html.graphql.user.edge_owner_to_timeline_media.edges[0].node.edge_media_to_caption.edges[0].node.text);


                  // });

                  res.send(html);
            });


        });
      });

})





app.get('/instagram_page1', function(req, res){
      // var title, release, rating;
      var data_array = [];
      var data_array2 = [];
      var data_array3 = [];



      con.query("SELECT username,instagram_id FROM instagram_users where is_run != 1 LIMIT 1", function(err, rows, fields) {
        rows.forEach(function(row) {
          // username = row.username




              const options = {
                url: 'https://www.instagram.com/graphql/query/?query_hash=f2405b236d85e8296cf30347c9f08c2a'+
                '&variables={"id":"'+row.instagram_id+'","first":12,'+
                '"after":"QVFCa3BxLXY4Wm1XaVZoRUk4OVhwSFczQjZWcktWLW81SWpKT1VqUElNdDg4c0lpYXNWYkVwcWVCZ2R0YmhVV1hBOVVxSW9nc0lOTzdzZVdlSVNIRFh4UA=="}',
                headers: {
                  'cookie': 'mcd=3; mid=XBIhGQAEAAHcnCbPArtkoSTeuLHz; shbid=6323; shbts=1548133910.5068145;fbm_124024574287414=base_domain=.instagram.com;rur=ATN;fbsr_124024574287414=UD3U91kzsWEGrbK9AcbaAwmV85c0eMsIAJtRfWEruo4.eyJhbGdvcml0aG0iOiJITUFDLVNIQTI1NiIsImNvZGUiOiJBUUExSTV3YkU0QTl1d1hRVWw0NUZsYTR3aENqZjE0UEZ0STNxUFdFdlJVZWhZbzBVMzVUVFZFUFQwczdaQ3J6Z2lnOWZpNzBqVlRGZTFVOEdJWDgyYXdnRzVXUGZXazB5dTNhdUYxT0FtN2p0ZnpYczR0Wk50OFlHTUxZRlFwb2xvYnZBRHk0cWNpd1NocVZFMF9MM1lnSDhoemdXeFpRSXhnckNvbDlxN05nVTFpVENxcXdpYmpDb0F4UUtCT0dkUWY2R3lueDdtcTJKMG9IYVROMjlMclJaWVJfMDhQTDBsVDQwSTZ0Z3F5cWFuXzJWVmdBTmtYOXdIdkhfd1lqZmtRVjZJNUtOZXJURFZGVHAxbmVsYWFPLUdCaW9icXJ1Rzd6SUw2bEZuQi1XdVdXczVhWmVySUpKUm9IRVlUQ1pLNHFwT1d4YXNFSVA2bVc4ZV92MGs3OCIsImlzc3VlZF9hdCI6MTU0ODI5NTA0NiwidXNlcl9pZCI6IjEwMDAwMDgyNTI5MTc5OSJ9; csrftoken=PmOadYmRV4sLc2TaxDajTht7nJfMeOqS; ds_user_id=2118484329; sessionid=2118484329%3A7qWc9utxdishs2%3A7;urlgen="{\"182.253.178.103\": 17451\054 \"182.253.177.62\": 17451}:1gmUHr:b4FiMwAdbPcOvggvrxzdKxztTWM',
                  'referer': 'https://www.instagram.com/'+row.username+'/',
                  'x-ig-app-id': '936619743392459',
                  'x-instagram-gis': 'bf23ef082274cc8ae4565268a58dd644',
                  'x-requested-with': 'XMLHttpRequest',
                }
              };


            request(options, function(error, response, html){
              var html = JSON.parse(html)

              // mongodb

              MongoClient.connect(url, function(err, db) {
                if (err) throw err;
                var dbo = db.db("debi");

                dbo.collection("instagram_comment").insert(html, function(err, res) {
                  if (err) throw err;
                  // console.log("Number of documents inserted: " + res.insertedCount);
                  db.close();
                });
              });

              // end

                    html.data.user.edge_owner_to_timeline_media.edges.forEach(function(x,y){

                      let instagram_post_id = html.data.user.edge_owner_to_timeline_media.edges[y].node.id;


                      let sql = "INSERT INTO `tb_instagram` (`instagram_id`,`instagram_user_id`, `post_id`, `post_text`, `post_comment`, `post_like`) VALUES (NULL,"+row.instagram_id+", "+html.data.user.edge_owner_to_timeline_media.edges[y].node.id+" , '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_caption.edges[0].node.text+"', "+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.count+", "+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_preview_like.count+")";


                      con.query(sql, function (err, result) {

                        if (err){
                                let sql_update = "UPDATE `tb_instagram` SET `display_url` = '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.display_url+"' ,post_shortcode = '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.shortcode+"' WHERE `tb_instagram`.`post_id` = "+html.data.user.edge_owner_to_timeline_media.edges[y].node.id+" "
                                con.query(sql_update, function (err, result) {
                                });

                        }

                        let sql_update = "UPDATE `tb_instagram` SET `display_url` = '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.display_url+"' ,post_shortcode = '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.shortcode+"' WHERE `tb_instagram`.`post_id` = "+html.data.user.edge_owner_to_timeline_media.edges[y].node.id+" "
                        con.query(sql_update, function (err, result) {
                        });

                      });

                      html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges.forEach(function(x1,y1){

                        let sql_insert_comment = "INSERT INTO `tb_instagram_comment` (`tb_instagram_comment_id`, `instagram_post_id`, `comment_id`, `comment_text`, `comment_ created_at`, `did_report_as_spam`, `username_comment`, `username_ profile_pic_url`,`username_comment_verified`,`created_at`) VALUES (NULL, '"+instagram_post_id+"', '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges[y1].node.id+"', '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges[y1].node.text+"', '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges[y1].node.created_at+"', '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges[y1].node.did_report_as_spam+"', '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges[y1].node.owner.username+"', '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges[y1].node.owner.profile_pic_url+"','"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges[y1].node.owner.is_verified+"',NULL)"

                        con.query(sql_insert_comment)

                      });



                    })

                    res.send(row.instagram_id)

            });


        });
      });



})





app.get('/instagram_page2', function(req, res){
      // var title, release, rating;
      var data_array = [];
      var data_array2 = [];
      var data_array3 = [];



      con.query("SELECT username,instagram_id FROM instagram_users where is_run != 1 LIMIT 1", function(err, rows, fields) {
        rows.forEach(function(row) {
          // username = row.username




              const options = {
                url: 'https://www.instagram.com/graphql/query/?query_hash=f2405b236d85e8296cf30347c9f08c2a'+
                '&variables={"id":"'+row.instagram_id+'","first":12,'+
                '"after":"QVFETjc5OTh5VGVVUlV2Q0hnR3J6czhkZ09mYjMzdFNUU05UejJiU0FvRWw3SkZZd1BXMWFFNDY1eG5DSkJWQXRXYTJmeWdSZThtaHVlQnhEdTI0RFNqZg=="}',
                headers: {
                  'cookie': 'mcd=3; mid=XBIhGQAEAAHcnCbPArtkoSTeuLHz; shbid=6323; shbts=1548133910.5068145;fbm_124024574287414=base_domain=.instagram.com;rur=ATN;fbsr_124024574287414=UD3U91kzsWEGrbK9AcbaAwmV85c0eMsIAJtRfWEruo4.eyJhbGdvcml0aG0iOiJITUFDLVNIQTI1NiIsImNvZGUiOiJBUUExSTV3YkU0QTl1d1hRVWw0NUZsYTR3aENqZjE0UEZ0STNxUFdFdlJVZWhZbzBVMzVUVFZFUFQwczdaQ3J6Z2lnOWZpNzBqVlRGZTFVOEdJWDgyYXdnRzVXUGZXazB5dTNhdUYxT0FtN2p0ZnpYczR0Wk50OFlHTUxZRlFwb2xvYnZBRHk0cWNpd1NocVZFMF9MM1lnSDhoemdXeFpRSXhnckNvbDlxN05nVTFpVENxcXdpYmpDb0F4UUtCT0dkUWY2R3lueDdtcTJKMG9IYVROMjlMclJaWVJfMDhQTDBsVDQwSTZ0Z3F5cWFuXzJWVmdBTmtYOXdIdkhfd1lqZmtRVjZJNUtOZXJURFZGVHAxbmVsYWFPLUdCaW9icXJ1Rzd6SUw2bEZuQi1XdVdXczVhWmVySUpKUm9IRVlUQ1pLNHFwT1d4YXNFSVA2bVc4ZV92MGs3OCIsImlzc3VlZF9hdCI6MTU0ODI5NTA0NiwidXNlcl9pZCI6IjEwMDAwMDgyNTI5MTc5OSJ9; csrftoken=PmOadYmRV4sLc2TaxDajTht7nJfMeOqS; ds_user_id=2118484329; sessionid=2118484329%3A7qWc9utxdishs2%3A7;urlgen="{\"182.253.178.103\": 17451\054 \"182.253.177.62\": 17451}:1gmUHr:b4FiMwAdbPcOvggvrxzdKxztTWM',
                  'referer': 'https://www.instagram.com/'+row.username+'/',
                  'x-ig-app-id': '936619743392459',
                  'x-instagram-gis': 'bf23ef082274cc8ae4565268a58dd644',
                  'x-requested-with': 'XMLHttpRequest',
                }
              };


            request(options, function(error, response, html){
              var html = JSON.parse(html)

                    html.data.user.edge_owner_to_timeline_media.edges.forEach(function(x,y){

                      let instagram_post_id = html.data.user.edge_owner_to_timeline_media.edges[y].node.id;


                      // let sql = "INSERT INTO `tb_instagram` (`instagram_id`,`instagram_user_id`, `post_id`, `post_text`, `post_comment`, `post_like`) VALUES (NULL,"+row.instagram_id+", "+html.data.user.edge_owner_to_timeline_media.edges[y].node.id+" , '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_caption.edges[0].node.text+"', "+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.count+", "+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_liked_by.count+")";


                      let sql = "INSERT INTO `tb_instagram` (`instagram_id`,`instagram_user_id`, `post_id`, `post_text`, `post_comment`, `post_like`) VALUES (NULL,"+row.instagram_id+", "+html.data.user.edge_owner_to_timeline_media.edges[y].node.id+" , '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_caption.edges[0].node.text+"', "+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.count+", "+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_preview_like.count+")";


                      con.query(sql, function (err, result) {
                        if (err){
                                let sql_update = "UPDATE `tb_instagram` SET `display_url` = '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.display_url+"' ,post_shortcode = '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.shortcode+"' WHERE `tb_instagram`.`post_id` = "+html.data.user.edge_owner_to_timeline_media.edges[y].node.id+" "
                                con.query(sql_update, function (err, result) {
                                });

                        }
                        let sql_update = "UPDATE `tb_instagram` SET `display_url` = '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.display_url+"' ,post_shortcode = '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.shortcode+"' WHERE `tb_instagram`.`post_id` = "+html.data.user.edge_owner_to_timeline_media.edges[y].node.id+" "
                        con.query(sql_update, function (err, result) {
                        });

                      });


                      html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges.forEach(function(x1,y1){

                        let sql_insert_comment = "INSERT INTO `tb_instagram_comment` (`tb_instagram_comment_id`, `instagram_post_id`, `comment_id`, `comment_text`, `comment_ created_at`, `did_report_as_spam`, `username_comment`, `username_ profile_pic_url`,`username_comment_verified`,`created_at`) VALUES (NULL, '"+instagram_post_id+"', '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges[y1].node.id+"', '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges[y1].node.text+"', '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges[y1].node.created_at+"', '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges[y1].node.did_report_as_spam+"', '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges[y1].node.owner.username+"', '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges[y1].node.owner.profile_pic_url+"','"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges[y1].node.owner.is_verified+"',NULL)"

                        con.query(sql_insert_comment)

                      });


                    })

                    res.send(row.instagram_id)

                  // res.send(html.data.user.edge_owner_to_timeline_media.edges[0].node.edge_media_to_caption.edges[0].node.text);
            });


        });
      });



})



app.get('/instagram_page3', function(req, res){
      // var title, release, rating;
      var data_array = [];
      var data_array2 = [];
      var data_array3 = [];



      con.query("SELECT username,instagram_id FROM instagram_users where is_run != 1 LIMIT 1", function(err, rows, fields) {
        rows.forEach(function(row) {
          // username = row.username




              const options = {
                url: 'https://www.instagram.com/graphql/query/?query_hash=f2405b236d85e8296cf30347c9f08c2a'+
                '&variables={"id":"'+row.instagram_id+'","first":12,'+
                '"after":"QVFCUTJqWDB6Y2JVbm9NOFBiREdTc2Y3UVNneFVGellhcVk0RXdTY0FaTDc4c3FxQzlzcmlEcmI1bmhrb1ZZLThROHkybnlFb0diS2dKcUN2MVdwNi0zQw=="}',
                headers: {
                  'cookie': 'mcd=3; mid=XBIhGQAEAAHcnCbPArtkoSTeuLHz; shbid=6323; shbts=1548133910.5068145;fbm_124024574287414=base_domain=.instagram.com;rur=ATN;fbsr_124024574287414=UD3U91kzsWEGrbK9AcbaAwmV85c0eMsIAJtRfWEruo4.eyJhbGdvcml0aG0iOiJITUFDLVNIQTI1NiIsImNvZGUiOiJBUUExSTV3YkU0QTl1d1hRVWw0NUZsYTR3aENqZjE0UEZ0STNxUFdFdlJVZWhZbzBVMzVUVFZFUFQwczdaQ3J6Z2lnOWZpNzBqVlRGZTFVOEdJWDgyYXdnRzVXUGZXazB5dTNhdUYxT0FtN2p0ZnpYczR0Wk50OFlHTUxZRlFwb2xvYnZBRHk0cWNpd1NocVZFMF9MM1lnSDhoemdXeFpRSXhnckNvbDlxN05nVTFpVENxcXdpYmpDb0F4UUtCT0dkUWY2R3lueDdtcTJKMG9IYVROMjlMclJaWVJfMDhQTDBsVDQwSTZ0Z3F5cWFuXzJWVmdBTmtYOXdIdkhfd1lqZmtRVjZJNUtOZXJURFZGVHAxbmVsYWFPLUdCaW9icXJ1Rzd6SUw2bEZuQi1XdVdXczVhWmVySUpKUm9IRVlUQ1pLNHFwT1d4YXNFSVA2bVc4ZV92MGs3OCIsImlzc3VlZF9hdCI6MTU0ODI5NTA0NiwidXNlcl9pZCI6IjEwMDAwMDgyNTI5MTc5OSJ9; csrftoken=PmOadYmRV4sLc2TaxDajTht7nJfMeOqS; ds_user_id=2118484329; sessionid=2118484329%3A7qWc9utxdishs2%3A7;urlgen="{\"182.253.178.103\": 17451\054 \"182.253.177.62\": 17451}:1gmUHr:b4FiMwAdbPcOvggvrxzdKxztTWM',
                  'referer': 'https://www.instagram.com/'+row.username+'/',
                  'x-ig-app-id': '936619743392459',
                  'x-instagram-gis': 'bf23ef082274cc8ae4565268a58dd644',
                  'x-requested-with': 'XMLHttpRequest',
                }
              };


            request(options, function(error, response, html){
              var html = JSON.parse(html)

                    html.data.user.edge_owner_to_timeline_media.edges.forEach(function(x,y){

                      let instagram_post_id = html.data.user.edge_owner_to_timeline_media.edges[y].node.id;


                      // let sql = "INSERT INTO `tb_instagram` (`instagram_id`,`instagram_user_id`, `post_id`, `post_text`, `post_comment`, `post_like`) VALUES (NULL,"+row.instagram_id+", "+html.data.user.edge_owner_to_timeline_media.edges[y].node.id+" , '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_caption.edges[0].node.text+"', "+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.count+", "+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_liked_by.count+")";


                      let sql = "INSERT INTO `tb_instagram` (`instagram_id`,`instagram_user_id`, `post_id`, `post_text`, `post_comment`, `post_like`) VALUES (NULL,"+row.instagram_id+", "+html.data.user.edge_owner_to_timeline_media.edges[y].node.id+" , '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_caption.edges[0].node.text+"', "+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.count+", "+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_preview_like.count+")";


                      con.query(sql, function (err, result) {
                        if (err){
                                let sql_update = "UPDATE `tb_instagram` SET `display_url` = '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.display_url+"' ,post_shortcode = '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.shortcode+"' WHERE `tb_instagram`.`post_id` = "+html.data.user.edge_owner_to_timeline_media.edges[y].node.id+" "
                                con.query(sql_update, function (err, result) {
                                });

                        }

                        let sql_update = "UPDATE `tb_instagram` SET `display_url` = '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.display_url+"' ,post_shortcode = '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.shortcode+"' WHERE `tb_instagram`.`post_id` = "+html.data.user.edge_owner_to_timeline_media.edges[y].node.id+" "
                        con.query(sql_update, function (err, result) {
                        });

                      });


                      html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges.forEach(function(x1,y1){

                        let sql_insert_comment = "INSERT INTO `tb_instagram_comment` (`tb_instagram_comment_id`, `instagram_post_id`, `comment_id`, `comment_text`, `comment_ created_at`, `did_report_as_spam`, `username_comment`, `username_ profile_pic_url`,`username_comment_verified`,`created_at`) VALUES (NULL, '"+instagram_post_id+"', '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges[y1].node.id+"', '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges[y1].node.text+"', '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges[y1].node.created_at+"', '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges[y1].node.did_report_as_spam+"', '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges[y1].node.owner.username+"', '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges[y1].node.owner.profile_pic_url+"','"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges[y1].node.owner.is_verified+"',NULL)"

                        con.query(sql_insert_comment)

                      });


                    })

                    res.send(row.instagram_id)

                  // res.send(html.data.user.edge_owner_to_timeline_media.edges[0].node.edge_media_to_caption.edges[0].node.text);
            });


        });
      });



})


app.get('/instagram_page4', function(req, res){
      // var title, release, rating;
      var data_array = [];
      var data_array2 = [];
      var data_array3 = [];



      con.query("SELECT username,instagram_id FROM instagram_users where is_run != 1 LIMIT 1", function(err, rows, fields) {
        rows.forEach(function(row) {
          // username = row.username




              const options = {
                url: 'https://www.instagram.com/graphql/query/?query_hash=f2405b236d85e8296cf30347c9f08c2a'+
                '&variables={"id":"'+row.instagram_id+'","first":12,'+
                '"after":"QVFBcklZVEplTnlIRFAzTld5RHAwQW82VnJDQ2tTcWJFWVlVa1N3eDM5VzRPRXdfZWFLT0RsU3B6cU1IdmdOQXZvM3pKT3c4SUtFZjhmUThIS3FzZ0hqaw=="}',
                headers: {
                  'cookie': 'mcd=3; mid=XBIhGQAEAAHcnCbPArtkoSTeuLHz; shbid=6323; shbts=1548133910.5068145;fbm_124024574287414=base_domain=.instagram.com;rur=ATN;fbsr_124024574287414=UD3U91kzsWEGrbK9AcbaAwmV85c0eMsIAJtRfWEruo4.eyJhbGdvcml0aG0iOiJITUFDLVNIQTI1NiIsImNvZGUiOiJBUUExSTV3YkU0QTl1d1hRVWw0NUZsYTR3aENqZjE0UEZ0STNxUFdFdlJVZWhZbzBVMzVUVFZFUFQwczdaQ3J6Z2lnOWZpNzBqVlRGZTFVOEdJWDgyYXdnRzVXUGZXazB5dTNhdUYxT0FtN2p0ZnpYczR0Wk50OFlHTUxZRlFwb2xvYnZBRHk0cWNpd1NocVZFMF9MM1lnSDhoemdXeFpRSXhnckNvbDlxN05nVTFpVENxcXdpYmpDb0F4UUtCT0dkUWY2R3lueDdtcTJKMG9IYVROMjlMclJaWVJfMDhQTDBsVDQwSTZ0Z3F5cWFuXzJWVmdBTmtYOXdIdkhfd1lqZmtRVjZJNUtOZXJURFZGVHAxbmVsYWFPLUdCaW9icXJ1Rzd6SUw2bEZuQi1XdVdXczVhWmVySUpKUm9IRVlUQ1pLNHFwT1d4YXNFSVA2bVc4ZV92MGs3OCIsImlzc3VlZF9hdCI6MTU0ODI5NTA0NiwidXNlcl9pZCI6IjEwMDAwMDgyNTI5MTc5OSJ9; csrftoken=PmOadYmRV4sLc2TaxDajTht7nJfMeOqS; ds_user_id=2118484329; sessionid=2118484329%3A7qWc9utxdishs2%3A7;urlgen="{\"182.253.178.103\": 17451\054 \"182.253.177.62\": 17451}:1gmUHr:b4FiMwAdbPcOvggvrxzdKxztTWM',
                  'referer': 'https://www.instagram.com/'+row.username+'/',
                  'x-ig-app-id': '936619743392459',
                  'x-instagram-gis': 'bf23ef082274cc8ae4565268a58dd644',
                  'x-requested-with': 'XMLHttpRequest',
                }
              };


            request(options, function(error, response, html){
              var html = JSON.parse(html)

                    html.data.user.edge_owner_to_timeline_media.edges.forEach(function(x,y){

                      let instagram_post_id = html.data.user.edge_owner_to_timeline_media.edges[y].node.id;


                      // let sql = "INSERT INTO `tb_instagram` (`instagram_id`,`instagram_user_id`, `post_id`, `post_text`, `post_comment`, `post_like`) VALUES (NULL,"+row.instagram_id+", "+html.data.user.edge_owner_to_timeline_media.edges[y].node.id+" , '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_caption.edges[0].node.text+"', "+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.count+", "+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_liked_by.count+")";


                      let sql = "INSERT INTO `tb_instagram` (`instagram_id`,`instagram_user_id`, `post_id`, `post_text`, `post_comment`, `post_like`) VALUES (NULL,"+row.instagram_id+", "+html.data.user.edge_owner_to_timeline_media.edges[y].node.id+" , '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_caption.edges[0].node.text+"', "+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.count+", "+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_preview_like.count+")";


                      con.query(sql, function (err, result) {

                        if (err){
                                let sql_update = "UPDATE `tb_instagram` SET `display_url` = '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.display_url+"' ,post_shortcode = '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.shortcode+"' WHERE `tb_instagram`.`post_id` = "+html.data.user.edge_owner_to_timeline_media.edges[y].node.id+" "
                                con.query(sql_update, function (err, result) {
                                });

                        }
                        let sql_update = "UPDATE `tb_instagram` SET `display_url` = '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.display_url+"' ,post_shortcode = '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.shortcode+"' WHERE `tb_instagram`.`post_id` = "+html.data.user.edge_owner_to_timeline_media.edges[y].node.id+" "
                        con.query(sql_update, function (err, result) {
                        });

                      });

                      html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges.forEach(function(x1,y1){

                        let sql_insert_comment = "INSERT INTO `tb_instagram_comment` (`tb_instagram_comment_id`, `instagram_post_id`, `comment_id`, `comment_text`, `comment_ created_at`, `did_report_as_spam`, `username_comment`, `username_ profile_pic_url`,`username_comment_verified`,`created_at`) VALUES (NULL, '"+instagram_post_id+"', '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges[y1].node.id+"', '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges[y1].node.text+"', '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges[y1].node.created_at+"', '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges[y1].node.did_report_as_spam+"', '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges[y1].node.owner.username+"', '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges[y1].node.owner.profile_pic_url+"','"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges[y1].node.owner.is_verified+"',NULL)"

                        con.query(sql_insert_comment)

                      });



                    })

                    res.send(row.instagram_id)

                  // res.send(html.data.user.edge_owner_to_timeline_media.edges[0].node.edge_media_to_caption.edges[0].node.text);
            });


        });
      });



})





app.get('/instagram_page5', function(req, res){
      // var title, release, rating;
      var data_array = [];
      var data_array2 = [];
      var data_array3 = [];



      con.query("SELECT username,instagram_id FROM instagram_users where is_run != 1 LIMIT 1", function(err, rows, fields) {
        rows.forEach(function(row) {
          // username = row.username




              const options = {
                url: 'https://www.instagram.com/graphql/query/?query_hash=f2405b236d85e8296cf30347c9f08c2a'+
                '&variables={"id":"'+row.instagram_id+'","first":12,'+
                '"after":"QVFBRldsdU5PTDMtWWUtM2NmX0ZRNGZZeDM3SEUwNmZpbnF6VUhMUmR3dGNrX2lpM0ZVbFQxcFI5UEFIenNwOGlMU0lpd05GWWJ6TjVULTNhVUdiZU9XUQ=="}',
                headers: {
                  'cookie': 'mcd=3; mid=XBIhGQAEAAHcnCbPArtkoSTeuLHz; shbid=6323; shbts=1548133910.5068145;fbm_124024574287414=base_domain=.instagram.com;rur=ATN;fbsr_124024574287414=UD3U91kzsWEGrbK9AcbaAwmV85c0eMsIAJtRfWEruo4.eyJhbGdvcml0aG0iOiJITUFDLVNIQTI1NiIsImNvZGUiOiJBUUExSTV3YkU0QTl1d1hRVWw0NUZsYTR3aENqZjE0UEZ0STNxUFdFdlJVZWhZbzBVMzVUVFZFUFQwczdaQ3J6Z2lnOWZpNzBqVlRGZTFVOEdJWDgyYXdnRzVXUGZXazB5dTNhdUYxT0FtN2p0ZnpYczR0Wk50OFlHTUxZRlFwb2xvYnZBRHk0cWNpd1NocVZFMF9MM1lnSDhoemdXeFpRSXhnckNvbDlxN05nVTFpVENxcXdpYmpDb0F4UUtCT0dkUWY2R3lueDdtcTJKMG9IYVROMjlMclJaWVJfMDhQTDBsVDQwSTZ0Z3F5cWFuXzJWVmdBTmtYOXdIdkhfd1lqZmtRVjZJNUtOZXJURFZGVHAxbmVsYWFPLUdCaW9icXJ1Rzd6SUw2bEZuQi1XdVdXczVhWmVySUpKUm9IRVlUQ1pLNHFwT1d4YXNFSVA2bVc4ZV92MGs3OCIsImlzc3VlZF9hdCI6MTU0ODI5NTA0NiwidXNlcl9pZCI6IjEwMDAwMDgyNTI5MTc5OSJ9; csrftoken=PmOadYmRV4sLc2TaxDajTht7nJfMeOqS; ds_user_id=2118484329; sessionid=2118484329%3A7qWc9utxdishs2%3A7;urlgen="{\"182.253.178.103\": 17451\054 \"182.253.177.62\": 17451}:1gmUHr:b4FiMwAdbPcOvggvrxzdKxztTWM',
                  'referer': 'https://www.instagram.com/'+row.username+'/',
                  'x-ig-app-id': '936619743392459',
                  'x-instagram-gis': 'bf23ef082274cc8ae4565268a58dd644',
                  'x-requested-with': 'XMLHttpRequest',
                }
              };


            request(options, function(error, response, html){
              var html = JSON.parse(html)

                    html.data.user.edge_owner_to_timeline_media.edges.forEach(function(x,y){

                      let instagram_post_id = html.data.user.edge_owner_to_timeline_media.edges[y].node.id;


                      // let sql = "INSERT INTO `tb_instagram` (`instagram_id`,`instagram_user_id`, `post_id`, `post_text`, `post_comment`, `post_like`) VALUES (NULL,"+row.instagram_id+", "+html.data.user.edge_owner_to_timeline_media.edges[y].node.id+" , '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_caption.edges[0].node.text+"', "+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.count+", "+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_liked_by.count+")";


                      let sql = "INSERT INTO `tb_instagram` (`instagram_id`,`instagram_user_id`, `post_id`, `post_text`, `post_comment`, `post_like`) VALUES (NULL,"+row.instagram_id+", "+html.data.user.edge_owner_to_timeline_media.edges[y].node.id+" , '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_caption.edges[0].node.text+"', "+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.count+", "+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_preview_like.count+")";


                      con.query(sql, function (err, result) {

                        if (err){
                                let sql_update = "UPDATE `tb_instagram` SET `display_url` = '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.display_url+"' ,post_shortcode = '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.shortcode+"' WHERE `tb_instagram`.`post_id` = "+html.data.user.edge_owner_to_timeline_media.edges[y].node.id+" "
                                con.query(sql_update, function (err, result) {
                                });

                        }

                        let sql_update = "UPDATE `tb_instagram` SET `display_url` = '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.display_url+"' ,post_shortcode = '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.shortcode+"' WHERE `tb_instagram`.`post_id` = "+html.data.user.edge_owner_to_timeline_media.edges[y].node.id+" "
                        con.query(sql_update, function (err, result) {
                        });

                      });

                      html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges.forEach(function(x1,y1){

                        let sql_insert_comment = "INSERT INTO `tb_instagram_comment` (`tb_instagram_comment_id`, `instagram_post_id`, `comment_id`, `comment_text`, `comment_ created_at`, `did_report_as_spam`, `username_comment`, `username_ profile_pic_url`,`username_comment_verified`,`created_at`) VALUES (NULL, '"+instagram_post_id+"', '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges[y1].node.id+"', '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges[y1].node.text+"', '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges[y1].node.created_at+"', '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges[y1].node.did_report_as_spam+"', '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges[y1].node.owner.username+"', '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges[y1].node.owner.profile_pic_url+"','"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges[y1].node.owner.is_verified+"',NULL)"

                        con.query(sql_insert_comment)

                      });


                    })

                    res.send(row.instagram_id)

                  // res.send(html.data.user.edge_owner_to_timeline_media.edges[0].node.edge_media_to_caption.edges[0].node.text);
            });


        });
      });



})



app.get('/instagram_page6', function(req, res){
      // var title, release, rating;
      var data_array = [];
      var data_array2 = [];
      var data_array3 = [];



      con.query("SELECT username,instagram_id FROM instagram_users where is_run != 1 LIMIT 1", function(err, rows, fields) {
        rows.forEach(function(row) {
          // username = row.username




              const options = {
                url: 'https://www.instagram.com/graphql/query/?query_hash=f2405b236d85e8296cf30347c9f08c2a'+
                '&variables={"id":"'+row.instagram_id+'","first":12,'+
                '"after":"QVFCdncyU3dRTHVBNUNSYkl2SHp1UzZZNDIya3Jsd0VFSDRidG1PQzV4VUhhVzZzSGtKM1NXMERyZ2RFUXh0cDNnbHZ5QmtIT19aalE0cXdyYzRUdDlFeg=="}',
                headers: {
                  'cookie': 'mcd=3; mid=XBIhGQAEAAHcnCbPArtkoSTeuLHz; shbid=6323; shbts=1548133910.5068145;fbm_124024574287414=base_domain=.instagram.com;rur=ATN;fbsr_124024574287414=UD3U91kzsWEGrbK9AcbaAwmV85c0eMsIAJtRfWEruo4.eyJhbGdvcml0aG0iOiJITUFDLVNIQTI1NiIsImNvZGUiOiJBUUExSTV3YkU0QTl1d1hRVWw0NUZsYTR3aENqZjE0UEZ0STNxUFdFdlJVZWhZbzBVMzVUVFZFUFQwczdaQ3J6Z2lnOWZpNzBqVlRGZTFVOEdJWDgyYXdnRzVXUGZXazB5dTNhdUYxT0FtN2p0ZnpYczR0Wk50OFlHTUxZRlFwb2xvYnZBRHk0cWNpd1NocVZFMF9MM1lnSDhoemdXeFpRSXhnckNvbDlxN05nVTFpVENxcXdpYmpDb0F4UUtCT0dkUWY2R3lueDdtcTJKMG9IYVROMjlMclJaWVJfMDhQTDBsVDQwSTZ0Z3F5cWFuXzJWVmdBTmtYOXdIdkhfd1lqZmtRVjZJNUtOZXJURFZGVHAxbmVsYWFPLUdCaW9icXJ1Rzd6SUw2bEZuQi1XdVdXczVhWmVySUpKUm9IRVlUQ1pLNHFwT1d4YXNFSVA2bVc4ZV92MGs3OCIsImlzc3VlZF9hdCI6MTU0ODI5NTA0NiwidXNlcl9pZCI6IjEwMDAwMDgyNTI5MTc5OSJ9; csrftoken=PmOadYmRV4sLc2TaxDajTht7nJfMeOqS; ds_user_id=2118484329; sessionid=2118484329%3A7qWc9utxdishs2%3A7;urlgen="{\"182.253.178.103\": 17451\054 \"182.253.177.62\": 17451}:1gmUHr:b4FiMwAdbPcOvggvrxzdKxztTWM',
                  'referer': 'https://www.instagram.com/'+row.username+'/',
                  'x-ig-app-id': '936619743392459',
                  'x-instagram-gis': 'bf23ef082274cc8ae4565268a58dd644',
                  'x-requested-with': 'XMLHttpRequest',
                }
              };


            request(options, function(error, response, html){
              var html = JSON.parse(html)

                    html.data.user.edge_owner_to_timeline_media.edges.forEach(function(x,y){

                      let instagram_post_id = html.data.user.edge_owner_to_timeline_media.edges[y].node.id;

                      // let sql = "INSERT INTO `tb_instagram` (`instagram_id`,`instagram_user_id`, `post_id`, `post_text`, `post_comment`, `post_like`) VALUES (NULL,"+row.instagram_id+", "+html.data.user.edge_owner_to_timeline_media.edges[y].node.id+" , '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_caption.edges[0].node.text+"', "+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.count+", "+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_liked_by.count+")";


                      let sql = "INSERT INTO `tb_instagram` (`instagram_id`,`instagram_user_id`, `post_id`, `post_text`, `post_comment`, `post_like`) VALUES (NULL,"+row.instagram_id+", "+html.data.user.edge_owner_to_timeline_media.edges[y].node.id+" , '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_caption.edges[0].node.text+"', "+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.count+", "+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_preview_like.count+")";


                      con.query(sql, function (err, result) {
                        if (err){
                                let sql_update = "UPDATE `tb_instagram` SET `display_url` = '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.display_url+"' ,post_shortcode = '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.shortcode+"' WHERE `tb_instagram`.`post_id` = "+html.data.user.edge_owner_to_timeline_media.edges[y].node.id+" "
                                con.query(sql_update, function (err, result) {
                                });

                        }

                        let sql_update = "UPDATE `tb_instagram` SET `display_url` = '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.display_url+"' ,post_shortcode = '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.shortcode+"' WHERE `tb_instagram`.`post_id` = "+html.data.user.edge_owner_to_timeline_media.edges[y].node.id+" "
                        con.query(sql_update, function (err, result) {
                        });

                      });


                      html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges.forEach(function(x1,y1){

                        let sql_insert_comment = "INSERT INTO `tb_instagram_comment` (`tb_instagram_comment_id`, `instagram_post_id`, `comment_id`, `comment_text`, `comment_ created_at`, `did_report_as_spam`, `username_comment`, `username_ profile_pic_url`,`username_comment_verified`,`created_at`) VALUES (NULL, '"+instagram_post_id+"', '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges[y1].node.id+"', '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges[y1].node.text+"', '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges[y1].node.created_at+"', '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges[y1].node.did_report_as_spam+"', '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges[y1].node.owner.username+"', '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges[y1].node.owner.profile_pic_url+"','"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges[y1].node.owner.is_verified+"',NULL)"

                        con.query(sql_insert_comment)

                      });


                    })

                    res.send(row.instagram_id)

                  // res.send(html.data.user.edge_owner_to_timeline_media.edges[0].node.edge_media_to_caption.edges[0].node.text);
            });


        });
      });



})



app.get('/instagram_page7', function(req, res){
      // var title, release, rating;
      var data_array = [];
      var data_array2 = [];
      var data_array3 = [];



      con.query("SELECT username,instagram_id FROM instagram_users where is_run != 1 LIMIT 1", function(err, rows, fields) {
        rows.forEach(function(row) {
          // username = row.username




              const options = {
                url: 'https://www.instagram.com/graphql/query/?query_hash=f2405b236d85e8296cf30347c9f08c2a'+
                '&variables={"id":"'+row.instagram_id+'","first":12,'+
                '"after":"QVFCUVlwUHRPMElPT3lNMW84THp0Mzl2V1Z2MjI0YmRhQlRZSkRIRDRyUXR1SUVXQ0luX3lsd01UVWJ2ZTU3VXNBQ2VSd3NWWV9ETDhyRzNOc1JMLVo3Qg=="}',
                headers: {
                  'cookie': 'mcd=3; mid=XBIhGQAEAAHcnCbPArtkoSTeuLHz; shbid=6323; shbts=1548133910.5068145;fbm_124024574287414=base_domain=.instagram.com;rur=ATN;fbsr_124024574287414=UD3U91kzsWEGrbK9AcbaAwmV85c0eMsIAJtRfWEruo4.eyJhbGdvcml0aG0iOiJITUFDLVNIQTI1NiIsImNvZGUiOiJBUUExSTV3YkU0QTl1d1hRVWw0NUZsYTR3aENqZjE0UEZ0STNxUFdFdlJVZWhZbzBVMzVUVFZFUFQwczdaQ3J6Z2lnOWZpNzBqVlRGZTFVOEdJWDgyYXdnRzVXUGZXazB5dTNhdUYxT0FtN2p0ZnpYczR0Wk50OFlHTUxZRlFwb2xvYnZBRHk0cWNpd1NocVZFMF9MM1lnSDhoemdXeFpRSXhnckNvbDlxN05nVTFpVENxcXdpYmpDb0F4UUtCT0dkUWY2R3lueDdtcTJKMG9IYVROMjlMclJaWVJfMDhQTDBsVDQwSTZ0Z3F5cWFuXzJWVmdBTmtYOXdIdkhfd1lqZmtRVjZJNUtOZXJURFZGVHAxbmVsYWFPLUdCaW9icXJ1Rzd6SUw2bEZuQi1XdVdXczVhWmVySUpKUm9IRVlUQ1pLNHFwT1d4YXNFSVA2bVc4ZV92MGs3OCIsImlzc3VlZF9hdCI6MTU0ODI5NTA0NiwidXNlcl9pZCI6IjEwMDAwMDgyNTI5MTc5OSJ9; csrftoken=PmOadYmRV4sLc2TaxDajTht7nJfMeOqS; ds_user_id=2118484329; sessionid=2118484329%3A7qWc9utxdishs2%3A7;urlgen="{\"182.253.178.103\": 17451\054 \"182.253.177.62\": 17451}:1gmUHr:b4FiMwAdbPcOvggvrxzdKxztTWM',
                  'referer': 'https://www.instagram.com/'+row.username+'/',
                  'x-ig-app-id': '936619743392459',
                  'x-instagram-gis': 'bf23ef082274cc8ae4565268a58dd644',
                  'x-requested-with': 'XMLHttpRequest',
                }
              };


            request(options, function(error, response, html){
              var html = JSON.parse(html)

                    html.data.user.edge_owner_to_timeline_media.edges.forEach(function(x,y){

                      let instagram_post_id = html.data.user.edge_owner_to_timeline_media.edges[y].node.id;


                      // let sql = "INSERT INTO `tb_instagram` (`instagram_id`,`instagram_user_id`, `post_id`, `post_text`, `post_comment`, `post_like`) VALUES (NULL,"+row.instagram_id+", "+html.data.user.edge_owner_to_timeline_media.edges[y].node.id+" , '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_caption.edges[0].node.text+"', "+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.count+", "+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_liked_by.count+")";


                      let sql = "INSERT INTO `tb_instagram` (`instagram_id`,`instagram_user_id`, `post_id`, `post_text`, `post_comment`, `post_like`) VALUES (NULL,"+row.instagram_id+", "+html.data.user.edge_owner_to_timeline_media.edges[y].node.id+" , '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_caption.edges[0].node.text+"', "+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.count+", "+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_preview_like.count+")";


                      con.query(sql, function (err, result) {
                        if (err){
                                let sql_update = "UPDATE `tb_instagram` SET `display_url` = '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.display_url+"' ,post_shortcode = '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.shortcode+"' WHERE `tb_instagram`.`post_id` = "+html.data.user.edge_owner_to_timeline_media.edges[y].node.id+" "
                                con.query(sql_update, function (err, result) {
                                });

                        }
                        let sql_update = "UPDATE `tb_instagram` SET `display_url` = '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.display_url+"' ,post_shortcode = '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.shortcode+"' WHERE `tb_instagram`.`post_id` = "+html.data.user.edge_owner_to_timeline_media.edges[y].node.id+" "
                        con.query(sql_update, function (err, result) {
                        });

                      });

                      html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges.forEach(function(x1,y1){

                        let sql_insert_comment = "INSERT INTO `tb_instagram_comment` (`tb_instagram_comment_id`, `instagram_post_id`, `comment_id`, `comment_text`, `comment_ created_at`, `did_report_as_spam`, `username_comment`, `username_ profile_pic_url`,`username_comment_verified`,`created_at`) VALUES (NULL, '"+instagram_post_id+"', '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges[y1].node.id+"', '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges[y1].node.text+"', '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges[y1].node.created_at+"', '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges[y1].node.did_report_as_spam+"', '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges[y1].node.owner.username+"', '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges[y1].node.owner.profile_pic_url+"','"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges[y1].node.owner.is_verified+"',NULL)"

                        con.query(sql_insert_comment)

                      });


                    })

                    res.send(row.instagram_id)

                  // res.send(html.data.user.edge_owner_to_timeline_media.edges[0].node.edge_media_to_caption.edges[0].node.text);
            });


        });
      });



})



app.get('/instagram_page8', function(req, res){
      // var title, release, rating;
      var data_array = [];
      var data_array2 = [];
      var data_array3 = [];



      con.query("SELECT username,instagram_id FROM instagram_users where is_run != 1 LIMIT 1", function(err, rows, fields) {
        rows.forEach(function(row) {
          // username = row.username




              const options = {
                url: 'https://www.instagram.com/graphql/query/?query_hash=f2405b236d85e8296cf30347c9f08c2a'+
                '&variables={"id":"'+row.instagram_id+'","first":12,'+
                '"after":"QVFCSDJuLUZCZ1ZhSk9lMU92VVhxZW1vRGtEazRneTU5M0QzT3liVGYySlZCQWJQVmRGNU9DS3o4UnFCbDVFc1pRUW9PVFRoM0wyMm1UUWNLLW5VVjFUQg=="}',
                headers: {
                  'cookie': 'mcd=3; mid=XBIhGQAEAAHcnCbPArtkoSTeuLHz; shbid=6323; shbts=1548133910.5068145;fbm_124024574287414=base_domain=.instagram.com;rur=ATN;fbsr_124024574287414=UD3U91kzsWEGrbK9AcbaAwmV85c0eMsIAJtRfWEruo4.eyJhbGdvcml0aG0iOiJITUFDLVNIQTI1NiIsImNvZGUiOiJBUUExSTV3YkU0QTl1d1hRVWw0NUZsYTR3aENqZjE0UEZ0STNxUFdFdlJVZWhZbzBVMzVUVFZFUFQwczdaQ3J6Z2lnOWZpNzBqVlRGZTFVOEdJWDgyYXdnRzVXUGZXazB5dTNhdUYxT0FtN2p0ZnpYczR0Wk50OFlHTUxZRlFwb2xvYnZBRHk0cWNpd1NocVZFMF9MM1lnSDhoemdXeFpRSXhnckNvbDlxN05nVTFpVENxcXdpYmpDb0F4UUtCT0dkUWY2R3lueDdtcTJKMG9IYVROMjlMclJaWVJfMDhQTDBsVDQwSTZ0Z3F5cWFuXzJWVmdBTmtYOXdIdkhfd1lqZmtRVjZJNUtOZXJURFZGVHAxbmVsYWFPLUdCaW9icXJ1Rzd6SUw2bEZuQi1XdVdXczVhWmVySUpKUm9IRVlUQ1pLNHFwT1d4YXNFSVA2bVc4ZV92MGs3OCIsImlzc3VlZF9hdCI6MTU0ODI5NTA0NiwidXNlcl9pZCI6IjEwMDAwMDgyNTI5MTc5OSJ9; csrftoken=PmOadYmRV4sLc2TaxDajTht7nJfMeOqS; ds_user_id=2118484329; sessionid=2118484329%3A7qWc9utxdishs2%3A7;urlgen="{\"182.253.178.103\": 17451\054 \"182.253.177.62\": 17451}:1gmUHr:b4FiMwAdbPcOvggvrxzdKxztTWM',
                  'referer': 'https://www.instagram.com/'+row.username+'/',
                  'x-ig-app-id': '936619743392459',
                  'x-instagram-gis': 'bf23ef082274cc8ae4565268a58dd644',
                  'x-requested-with': 'XMLHttpRequest',
                }
              };


            request(options, function(error, response, html){
              var html = JSON.parse(html)

                    html.data.user.edge_owner_to_timeline_media.edges.forEach(function(x,y){

                      let instagram_post_id = html.data.user.edge_owner_to_timeline_media.edges[y].node.id;


                      // let sql = "INSERT INTO `tb_instagram` (`instagram_id`,`instagram_user_id`, `post_id`, `post_text`, `post_comment`, `post_like`) VALUES (NULL,"+row.instagram_id+", "+html.data.user.edge_owner_to_timeline_media.edges[y].node.id+" , '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_caption.edges[0].node.text+"', "+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.count+", "+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_liked_by.count+")";


                      let sql = "INSERT INTO `tb_instagram` (`instagram_id`,`instagram_user_id`, `post_id`, `post_text`, `post_comment`, `post_like`) VALUES (NULL,"+row.instagram_id+", "+html.data.user.edge_owner_to_timeline_media.edges[y].node.id+" , '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_caption.edges[0].node.text+"', "+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.count+", "+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_preview_like.count+")";


                      con.query(sql, function (err, result) {
                        if (err){
                                let sql_update = "UPDATE `tb_instagram` SET `display_url` = '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.display_url+"' ,post_shortcode = '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.shortcode+"' WHERE `tb_instagram`.`post_id` = "+html.data.user.edge_owner_to_timeline_media.edges[y].node.id+" "
                                con.query(sql_update, function (err, result) {
                                });

                        }
                        let sql_update = "UPDATE `tb_instagram` SET `display_url` = '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.display_url+"' ,post_shortcode = '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.shortcode+"' WHERE `tb_instagram`.`post_id` = "+html.data.user.edge_owner_to_timeline_media.edges[y].node.id+" "
                        con.query(sql_update, function (err, result) {
                        });

                      });

                      html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges.forEach(function(x1,y1){

                        let sql_insert_comment = "INSERT INTO `tb_instagram_comment` (`tb_instagram_comment_id`, `instagram_post_id`, `comment_id`, `comment_text`, `comment_ created_at`, `did_report_as_spam`, `username_comment`, `username_ profile_pic_url`,`username_comment_verified`,`created_at`) VALUES (NULL, '"+instagram_post_id+"', '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges[y1].node.id+"', '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges[y1].node.text+"', '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges[y1].node.created_at+"', '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges[y1].node.did_report_as_spam+"', '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges[y1].node.owner.username+"', '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges[y1].node.owner.profile_pic_url+"','"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges[y1].node.owner.is_verified+"',NULL)"

                        con.query(sql_insert_comment)

                      });


                    })

                    res.send(row.instagram_id)

                  // res.send(html.data.user.edge_owner_to_timeline_media.edges[0].node.edge_media_to_caption.edges[0].node.text);
            });


        });
      });



})



app.get('/instagram_page9', function(req, res){
      // var title, release, rating;
      var data_array = [];
      var data_array2 = [];
      var data_array3 = [];



      con.query("SELECT username,instagram_id FROM instagram_users where is_run != 1 LIMIT 1", function(err, rows, fields) {
        rows.forEach(function(row) {
          // username = row.username




              const options = {
                url: 'https://www.instagram.com/graphql/query/?query_hash=f2405b236d85e8296cf30347c9f08c2a'+
                '&variables={"id":"'+row.instagram_id+'","first":12,'+
                '"after":"QVFCSDJuLUZCZ1ZhSk9lMU92VVhxZW1vRGtEazRneTU5M0QzT3liVGYySlZCQWJQVmRGNU9DS3o4UnFCbDVFc1pRUW9PVFRoM0wyMm1UUWNLLW5VVjFUQg=="}',
                headers: {
                  'cookie': 'mcd=3; mid=XBIhGQAEAAHcnCbPArtkoSTeuLHz; shbid=6323; shbts=1548133910.5068145;fbm_124024574287414=base_domain=.instagram.com;rur=ATN;fbsr_124024574287414=UD3U91kzsWEGrbK9AcbaAwmV85c0eMsIAJtRfWEruo4.eyJhbGdvcml0aG0iOiJITUFDLVNIQTI1NiIsImNvZGUiOiJBUUExSTV3YkU0QTl1d1hRVWw0NUZsYTR3aENqZjE0UEZ0STNxUFdFdlJVZWhZbzBVMzVUVFZFUFQwczdaQ3J6Z2lnOWZpNzBqVlRGZTFVOEdJWDgyYXdnRzVXUGZXazB5dTNhdUYxT0FtN2p0ZnpYczR0Wk50OFlHTUxZRlFwb2xvYnZBRHk0cWNpd1NocVZFMF9MM1lnSDhoemdXeFpRSXhnckNvbDlxN05nVTFpVENxcXdpYmpDb0F4UUtCT0dkUWY2R3lueDdtcTJKMG9IYVROMjlMclJaWVJfMDhQTDBsVDQwSTZ0Z3F5cWFuXzJWVmdBTmtYOXdIdkhfd1lqZmtRVjZJNUtOZXJURFZGVHAxbmVsYWFPLUdCaW9icXJ1Rzd6SUw2bEZuQi1XdVdXczVhWmVySUpKUm9IRVlUQ1pLNHFwT1d4YXNFSVA2bVc4ZV92MGs3OCIsImlzc3VlZF9hdCI6MTU0ODI5NTA0NiwidXNlcl9pZCI6IjEwMDAwMDgyNTI5MTc5OSJ9; csrftoken=PmOadYmRV4sLc2TaxDajTht7nJfMeOqS; ds_user_id=2118484329; sessionid=2118484329%3A7qWc9utxdishs2%3A7;urlgen="{\"182.253.178.103\": 17451\054 \"182.253.177.62\": 17451}:1gmUHr:b4FiMwAdbPcOvggvrxzdKxztTWM',
                  'referer': 'https://www.instagram.com/'+row.username+'/',
                  'x-ig-app-id': '936619743392459',
                  'x-instagram-gis': 'bf23ef082274cc8ae4565268a58dd644',
                  'x-requested-with': 'XMLHttpRequest',
                }
              };


            request(options, function(error, response, html){
              var html = JSON.parse(html)

                    html.data.user.edge_owner_to_timeline_media.edges.forEach(function(x,y){

                      let instagram_post_id = html.data.user.edge_owner_to_timeline_media.edges[y].node.id;


                      // let sql = "INSERT INTO `tb_instagram` (`instagram_id`,`instagram_user_id`, `post_id`, `post_text`, `post_comment`, `post_like`) VALUES (NULL,"+row.instagram_id+", "+html.data.user.edge_owner_to_timeline_media.edges[y].node.id+" , '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_caption.edges[0].node.text+"', "+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.count+", "+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_liked_by.count+")";


                      let sql = "INSERT INTO `tb_instagram` (`instagram_id`,`instagram_user_id`, `post_id`, `post_text`, `post_comment`, `post_like`) VALUES (NULL,"+row.instagram_id+", "+html.data.user.edge_owner_to_timeline_media.edges[y].node.id+" , '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_caption.edges[0].node.text+"', "+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.count+", "+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_preview_like.count+")";


                      con.query(sql, function (err, result) {
                        if (err){
                                let sql_update = "UPDATE `tb_instagram` SET `display_url` = '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.display_url+"' ,post_shortcode = '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.shortcode+"' WHERE `tb_instagram`.`post_id` = "+html.data.user.edge_owner_to_timeline_media.edges[y].node.id+" "
                                con.query(sql_update, function (err, result) {
                                });

                        }
                        let sql_update = "UPDATE `tb_instagram` SET `display_url` = '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.display_url+"' ,post_shortcode = '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.shortcode+"' WHERE `tb_instagram`.`post_id` = "+html.data.user.edge_owner_to_timeline_media.edges[y].node.id+" "
                        con.query(sql_update, function (err, result) {
                        });


                      });

                      html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges.forEach(function(x1,y1){

                        let sql_insert_comment = "INSERT INTO `tb_instagram_comment` (`tb_instagram_comment_id`, `instagram_post_id`, `comment_id`, `comment_text`, `comment_ created_at`, `did_report_as_spam`, `username_comment`, `username_ profile_pic_url`,`username_comment_verified`,`created_at`) VALUES (NULL, '"+instagram_post_id+"', '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges[y1].node.id+"', '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges[y1].node.text+"', '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges[y1].node.created_at+"', '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges[y1].node.did_report_as_spam+"', '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges[y1].node.owner.username+"', '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges[y1].node.owner.profile_pic_url+"','"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges[y1].node.owner.is_verified+"',NULL)"

                        con.query(sql_insert_comment)

                      });


                    })

                    res.send(row.instagram_id)

                  // res.send(html.data.user.edge_owner_to_timeline_media.edges[0].node.edge_media_to_caption.edges[0].node.text);
            });


        });
      });



})


app.get('/instagram_page10', function(req, res){
      // var title, release, rating;
      var data_array = [];
      var data_array2 = [];
      var data_array3 = [];



      con.query("SELECT username,instagram_id FROM instagram_users where is_run != 1 LIMIT 1", function(err, rows, fields) {
        rows.forEach(function(row) {
          // username = row.username




              const options = {
                url: 'https://www.instagram.com/graphql/query/?query_hash=f2405b236d85e8296cf30347c9f08c2a'+
                '&variables={"id":"'+row.instagram_id+'","first":12,'+
                '"after":"QVFCSDJuLUZCZ1ZhSk9lMU92VVhxZW1vRGtEazRneTU5M0QzT3liVGYySlZCQWJQVmRGNU9DS3o4UnFCbDVFc1pRUW9PVFRoM0wyMm1UUWNLLW5VVjFUQg=="}',
                headers: {
                  'cookie': 'mcd=3; mid=XBIhGQAEAAHcnCbPArtkoSTeuLHz; shbid=6323; shbts=1548133910.5068145;fbm_124024574287414=base_domain=.instagram.com;rur=ATN;fbsr_124024574287414=UD3U91kzsWEGrbK9AcbaAwmV85c0eMsIAJtRfWEruo4.eyJhbGdvcml0aG0iOiJITUFDLVNIQTI1NiIsImNvZGUiOiJBUUExSTV3YkU0QTl1d1hRVWw0NUZsYTR3aENqZjE0UEZ0STNxUFdFdlJVZWhZbzBVMzVUVFZFUFQwczdaQ3J6Z2lnOWZpNzBqVlRGZTFVOEdJWDgyYXdnRzVXUGZXazB5dTNhdUYxT0FtN2p0ZnpYczR0Wk50OFlHTUxZRlFwb2xvYnZBRHk0cWNpd1NocVZFMF9MM1lnSDhoemdXeFpRSXhnckNvbDlxN05nVTFpVENxcXdpYmpDb0F4UUtCT0dkUWY2R3lueDdtcTJKMG9IYVROMjlMclJaWVJfMDhQTDBsVDQwSTZ0Z3F5cWFuXzJWVmdBTmtYOXdIdkhfd1lqZmtRVjZJNUtOZXJURFZGVHAxbmVsYWFPLUdCaW9icXJ1Rzd6SUw2bEZuQi1XdVdXczVhWmVySUpKUm9IRVlUQ1pLNHFwT1d4YXNFSVA2bVc4ZV92MGs3OCIsImlzc3VlZF9hdCI6MTU0ODI5NTA0NiwidXNlcl9pZCI6IjEwMDAwMDgyNTI5MTc5OSJ9; csrftoken=PmOadYmRV4sLc2TaxDajTht7nJfMeOqS; ds_user_id=2118484329; sessionid=2118484329%3A7qWc9utxdishs2%3A7;urlgen="{\"182.253.178.103\": 17451\054 \"182.253.177.62\": 17451}:1gmUHr:b4FiMwAdbPcOvggvrxzdKxztTWM',
                  'referer': 'https://www.instagram.com/'+row.username+'/',
                  'x-ig-app-id': '936619743392459',
                  'x-instagram-gis': 'bf23ef082274cc8ae4565268a58dd644',
                  'x-requested-with': 'XMLHttpRequest',
                }
              };


            request(options, function(error, response, html){
              var html = JSON.parse(html)

                    html.data.user.edge_owner_to_timeline_media.edges.forEach(function(x,y){


                      let instagram_post_id = html.data.user.edge_owner_to_timeline_media.edges[y].node.id;


                      // let sql = "INSERT INTO `tb_instagram` (`instagram_id`,`instagram_user_id`, `post_id`, `post_text`, `post_comment`, `post_like`) VALUES (NULL,"+row.instagram_id+", "+html.data.user.edge_owner_to_timeline_media.edges[y].node.id+" , '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_caption.edges[0].node.text+"', "+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.count+", "+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_liked_by.count+")";


                      let sql = "INSERT INTO `tb_instagram` (`instagram_id`,`instagram_user_id`, `post_id`, `post_text`, `post_comment`, `post_like`) VALUES (NULL,"+row.instagram_id+", "+html.data.user.edge_owner_to_timeline_media.edges[y].node.id+" , '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_caption.edges[0].node.text+"', "+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.count+", "+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_preview_like.count+")";


                      con.query(sql, function (err, result) {

                        if (err){
                                let sql_update = "UPDATE `tb_instagram` SET `display_url` = '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.display_url+"' ,post_shortcode = '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.shortcode+"' WHERE `tb_instagram`.`post_id` = "+html.data.user.edge_owner_to_timeline_media.edges[y].node.id+" "
                                con.query(sql_update, function (err, result) {
                                });

                        }
                        let sql_update = "UPDATE `tb_instagram` SET `display_url` = '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.display_url+"' ,post_shortcode = '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.shortcode+"' WHERE `tb_instagram`.`post_id` = "+html.data.user.edge_owner_to_timeline_media.edges[y].node.id+" "
                        con.query(sql_update, function (err, result) {
                        });

                      });

                      html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges.forEach(function(x1,y1){

                        let sql_insert_comment = "INSERT INTO `tb_instagram_comment` (`tb_instagram_comment_id`, `instagram_post_id`, `comment_id`, `comment_text`, `comment_ created_at`, `did_report_as_spam`, `username_comment`, `username_ profile_pic_url`,`username_comment_verified`,`created_at`) VALUES (NULL, '"+instagram_post_id+"', '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges[y1].node.id+"', '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges[y1].node.text+"', '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges[y1].node.created_at+"', '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges[y1].node.did_report_as_spam+"', '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges[y1].node.owner.username+"', '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges[y1].node.owner.profile_pic_url+"','"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges[y1].node.owner.is_verified+"',NULL)"

                        con.query(sql_insert_comment)

                      });


                    })

                    res.send(row.instagram_id)

                  // res.send(html.data.user.edge_owner_to_timeline_media.edges[0].node.edge_media_to_caption.edges[0].node.text);
            });


        });
      });



})





app.get('/instagram_page11', function(req, res){
      // var title, release, rating;
      var data_array = [];
      var data_array2 = [];
      var data_array3 = [];



      con.query("SELECT username,instagram_id FROM instagram_users where is_run != 1 LIMIT 1", function(err, rows, fields) {
        rows.forEach(function(row) {
          // username = row.username




              const options = {
                url: 'https://www.instagram.com/graphql/query/?query_hash=f2405b236d85e8296cf30347c9f08c2a'+
                '&variables={"id":"'+row.instagram_id+'","first":12,'+
                '"after":"QVFCVS1ldVVCRVlFMllPRHViR1Jxb2YzYXdGbkZqZFFnYWZNa0xwaTViOFhHcGdUWnd6TmJsMmt0VE5MVzhOUDgwbU1NS2thWUxNbWRETnVMWTZISVBjZw=="}',
                headers: {
                  'cookie': 'mcd=3; mid=XBIhGQAEAAHcnCbPArtkoSTeuLHz; shbid=6323; shbts=1548133910.5068145;fbm_124024574287414=base_domain=.instagram.com;rur=ATN;fbsr_124024574287414=UD3U91kzsWEGrbK9AcbaAwmV85c0eMsIAJtRfWEruo4.eyJhbGdvcml0aG0iOiJITUFDLVNIQTI1NiIsImNvZGUiOiJBUUExSTV3YkU0QTl1d1hRVWw0NUZsYTR3aENqZjE0UEZ0STNxUFdFdlJVZWhZbzBVMzVUVFZFUFQwczdaQ3J6Z2lnOWZpNzBqVlRGZTFVOEdJWDgyYXdnRzVXUGZXazB5dTNhdUYxT0FtN2p0ZnpYczR0Wk50OFlHTUxZRlFwb2xvYnZBRHk0cWNpd1NocVZFMF9MM1lnSDhoemdXeFpRSXhnckNvbDlxN05nVTFpVENxcXdpYmpDb0F4UUtCT0dkUWY2R3lueDdtcTJKMG9IYVROMjlMclJaWVJfMDhQTDBsVDQwSTZ0Z3F5cWFuXzJWVmdBTmtYOXdIdkhfd1lqZmtRVjZJNUtOZXJURFZGVHAxbmVsYWFPLUdCaW9icXJ1Rzd6SUw2bEZuQi1XdVdXczVhWmVySUpKUm9IRVlUQ1pLNHFwT1d4YXNFSVA2bVc4ZV92MGs3OCIsImlzc3VlZF9hdCI6MTU0ODI5NTA0NiwidXNlcl9pZCI6IjEwMDAwMDgyNTI5MTc5OSJ9; csrftoken=PmOadYmRV4sLc2TaxDajTht7nJfMeOqS; ds_user_id=2118484329; sessionid=2118484329%3A7qWc9utxdishs2%3A7;urlgen="{\"182.253.178.103\": 17451\054 \"182.253.177.62\": 17451}:1gmUHr:b4FiMwAdbPcOvggvrxzdKxztTWM',
                  'referer': 'https://www.instagram.com/'+row.username+'/',
                  'x-ig-app-id': '936619743392459',
                  'x-instagram-gis': 'bf23ef082274cc8ae4565268a58dd644',
                  'x-requested-with': 'XMLHttpRequest',
                }
              };


            request(options, function(error, response, html){
              var html = JSON.parse(html)

                    html.data.user.edge_owner_to_timeline_media.edges.forEach(function(x,y){

                      let instagram_post_id = html.data.user.edge_owner_to_timeline_media.edges[y].node.id;


                      // let sql = "INSERT INTO `tb_instagram` (`instagram_id`,`instagram_user_id`, `post_id`, `post_text`, `post_comment`, `post_like`) VALUES (NULL,"+row.instagram_id+", "+html.data.user.edge_owner_to_timeline_media.edges[y].node.id+" , '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_caption.edges[0].node.text+"', "+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.count+", "+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_liked_by.count+")";


                      let sql = "INSERT INTO `tb_instagram` (`instagram_id`,`instagram_user_id`, `post_id`, `post_text`, `post_comment`, `post_like`) VALUES (NULL,"+row.instagram_id+", "+html.data.user.edge_owner_to_timeline_media.edges[y].node.id+" , '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_caption.edges[0].node.text+"', "+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.count+", "+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_preview_like.count+")";


                      con.query(sql, function (err, result) {
                        if (err){
                                let sql_update = "UPDATE `tb_instagram` SET `display_url` = '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.display_url+"' ,post_shortcode = '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.shortcode+"' WHERE `tb_instagram`.`post_id` = "+html.data.user.edge_owner_to_timeline_media.edges[y].node.id+" "
                                con.query(sql_update, function (err, result) {
                                });

                        }
                        let sql_update = "UPDATE `tb_instagram` SET `display_url` = '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.display_url+"' ,post_shortcode = '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.shortcode+"' WHERE `tb_instagram`.`post_id` = "+html.data.user.edge_owner_to_timeline_media.edges[y].node.id+" "
                        con.query(sql_update, function (err, result) {
                        });

                      });

                      html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges.forEach(function(x1,y1){

                        let sql_insert_comment = "INSERT INTO `tb_instagram_comment` (`tb_instagram_comment_id`, `instagram_post_id`, `comment_id`, `comment_text`, `comment_ created_at`, `did_report_as_spam`, `username_comment`, `username_ profile_pic_url`,`username_comment_verified`,`created_at`) VALUES (NULL, '"+instagram_post_id+"', '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges[y1].node.id+"', '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges[y1].node.text+"', '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges[y1].node.created_at+"', '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges[y1].node.did_report_as_spam+"', '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges[y1].node.owner.username+"', '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges[y1].node.owner.profile_pic_url+"','"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges[y1].node.owner.is_verified+"',NULL)"

                        con.query(sql_insert_comment)

                      });


                    })

                    res.send(row.instagram_id)

                  // res.send(html.data.user.edge_owner_to_timeline_media.edges[0].node.edge_media_to_caption.edges[0].node.text);
            });


        });
      });



})





app.get('/instagram_page12', function(req, res){
      // var title, release, rating;
      var data_array = [];
      var data_array2 = [];
      var data_array3 = [];



      con.query("SELECT username,instagram_id FROM instagram_users where is_run != 1 LIMIT 1", function(err, rows, fields) {
        rows.forEach(function(row) {
          // username = row.username




              const options = {
                url: 'https://www.instagram.com/graphql/query/?query_hash=f2405b236d85e8296cf30347c9f08c2a'+
                '&variables={"id":"'+row.instagram_id+'","first":12,'+
                '"after":"QVFBNVBKbTE1akdTNGtzWDc1ZHNaSkxBSmNmNU5nSDY1ZlI5VmxQdUdLaFJ5WmJsUXFXMzR3T2drWHdEdm9DTDdrdHg1cmZ2RWJseTVQZURvMjBhbGZRVQ=="}',
                headers: {
                  'cookie': 'mcd=3; mid=XBIhGQAEAAHcnCbPArtkoSTeuLHz; shbid=6323; shbts=1548133910.5068145;fbm_124024574287414=base_domain=.instagram.com;rur=ATN;fbsr_124024574287414=UD3U91kzsWEGrbK9AcbaAwmV85c0eMsIAJtRfWEruo4.eyJhbGdvcml0aG0iOiJITUFDLVNIQTI1NiIsImNvZGUiOiJBUUExSTV3YkU0QTl1d1hRVWw0NUZsYTR3aENqZjE0UEZ0STNxUFdFdlJVZWhZbzBVMzVUVFZFUFQwczdaQ3J6Z2lnOWZpNzBqVlRGZTFVOEdJWDgyYXdnRzVXUGZXazB5dTNhdUYxT0FtN2p0ZnpYczR0Wk50OFlHTUxZRlFwb2xvYnZBRHk0cWNpd1NocVZFMF9MM1lnSDhoemdXeFpRSXhnckNvbDlxN05nVTFpVENxcXdpYmpDb0F4UUtCT0dkUWY2R3lueDdtcTJKMG9IYVROMjlMclJaWVJfMDhQTDBsVDQwSTZ0Z3F5cWFuXzJWVmdBTmtYOXdIdkhfd1lqZmtRVjZJNUtOZXJURFZGVHAxbmVsYWFPLUdCaW9icXJ1Rzd6SUw2bEZuQi1XdVdXczVhWmVySUpKUm9IRVlUQ1pLNHFwT1d4YXNFSVA2bVc4ZV92MGs3OCIsImlzc3VlZF9hdCI6MTU0ODI5NTA0NiwidXNlcl9pZCI6IjEwMDAwMDgyNTI5MTc5OSJ9; csrftoken=PmOadYmRV4sLc2TaxDajTht7nJfMeOqS; ds_user_id=2118484329; sessionid=2118484329%3A7qWc9utxdishs2%3A7;urlgen="{\"182.253.178.103\": 17451\054 \"182.253.177.62\": 17451}:1gmUHr:b4FiMwAdbPcOvggvrxzdKxztTWM',
                  'referer': 'https://www.instagram.com/'+row.username+'/',
                  'x-ig-app-id': '936619743392459',
                  'x-instagram-gis': 'bf23ef082274cc8ae4565268a58dd644',
                  'x-requested-with': 'XMLHttpRequest',
                }
              };


            request(options, function(error, response, html){
              var html = JSON.parse(html)

                    html.data.user.edge_owner_to_timeline_media.edges.forEach(function(x,y){

                      let instagram_post_id = html.data.user.edge_owner_to_timeline_media.edges[y].node.id;


                      // let sql = "INSERT INTO `tb_instagram` (`instagram_id`,`instagram_user_id`, `post_id`, `post_text`, `post_comment`, `post_like`) VALUES (NULL,"+row.instagram_id+", "+html.data.user.edge_owner_to_timeline_media.edges[y].node.id+" , '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_caption.edges[0].node.text+"', "+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.count+", "+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_liked_by.count+")";


                      let sql = "INSERT INTO `tb_instagram` (`instagram_id`,`instagram_user_id`, `post_id`, `post_text`, `post_comment`, `post_like`) VALUES (NULL,"+row.instagram_id+", "+html.data.user.edge_owner_to_timeline_media.edges[y].node.id+" , '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_caption.edges[0].node.text+"', "+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.count+", "+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_preview_like.count+")";


                      con.query(sql, function (err, result) {
                        if (err){
                                let sql_update = "UPDATE `tb_instagram` SET `display_url` = '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.display_url+"' ,post_shortcode = '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.shortcode+"' WHERE `tb_instagram`.`post_id` = "+html.data.user.edge_owner_to_timeline_media.edges[y].node.id+" "
                                con.query(sql_update, function (err, result) {
                                });

                        }
                        let sql_update = "UPDATE `tb_instagram` SET `display_url` = '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.display_url+"' ,post_shortcode = '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.shortcode+"' WHERE `tb_instagram`.`post_id` = "+html.data.user.edge_owner_to_timeline_media.edges[y].node.id+" "
                        con.query(sql_update, function (err, result) {
                        });

                      });

                      html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges.forEach(function(x1,y1){

                        let sql_insert_comment = "INSERT INTO `tb_instagram_comment` (`tb_instagram_comment_id`, `instagram_post_id`, `comment_id`, `comment_text`, `comment_ created_at`, `did_report_as_spam`, `username_comment`, `username_ profile_pic_url`,`username_comment_verified`,`created_at`) VALUES (NULL, '"+instagram_post_id+"', '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges[y1].node.id+"', '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges[y1].node.text+"', '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges[y1].node.created_at+"', '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges[y1].node.did_report_as_spam+"', '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges[y1].node.owner.username+"', '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges[y1].node.owner.profile_pic_url+"','"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges[y1].node.owner.is_verified+"',NULL)"

                        con.query(sql_insert_comment)

                      });


                    })

                    res.send(row.instagram_id)

                  // res.send(html.data.user.edge_owner_to_timeline_media.edges[0].node.edge_media_to_caption.edges[0].node.text);
            });


        });
      });



})



app.get('/instagram_page13', function(req, res){
      // var title, release, rating;
      var data_array = [];
      var data_array2 = [];
      var data_array3 = [];



      con.query("SELECT username,instagram_id FROM instagram_users where is_run != 1 LIMIT 1", function(err, rows, fields) {
        rows.forEach(function(row) {
          // username = row.username




              const options = {
                url: 'https://www.instagram.com/graphql/query/?query_hash=f2405b236d85e8296cf30347c9f08c2a'+
                '&variables={"id":"'+row.instagram_id+'","first":12,'+
                '"after":"QVFCTGQ2SHFhTUM2NmktTkVnazlVa3FIS1BRM1BlQUpSdUlXME5uM3R0WUNCbVV1SWFvWDJPY0dCYkI4V1pCLVJOalVCazZHVUxBTnU2Yk52dWd0RXhlNA=="}',
                headers: {
                  'cookie': 'mcd=3; mid=XBIhGQAEAAHcnCbPArtkoSTeuLHz; shbid=6323; shbts=1548133910.5068145;fbm_124024574287414=base_domain=.instagram.com;rur=ATN;fbsr_124024574287414=UD3U91kzsWEGrbK9AcbaAwmV85c0eMsIAJtRfWEruo4.eyJhbGdvcml0aG0iOiJITUFDLVNIQTI1NiIsImNvZGUiOiJBUUExSTV3YkU0QTl1d1hRVWw0NUZsYTR3aENqZjE0UEZ0STNxUFdFdlJVZWhZbzBVMzVUVFZFUFQwczdaQ3J6Z2lnOWZpNzBqVlRGZTFVOEdJWDgyYXdnRzVXUGZXazB5dTNhdUYxT0FtN2p0ZnpYczR0Wk50OFlHTUxZRlFwb2xvYnZBRHk0cWNpd1NocVZFMF9MM1lnSDhoemdXeFpRSXhnckNvbDlxN05nVTFpVENxcXdpYmpDb0F4UUtCT0dkUWY2R3lueDdtcTJKMG9IYVROMjlMclJaWVJfMDhQTDBsVDQwSTZ0Z3F5cWFuXzJWVmdBTmtYOXdIdkhfd1lqZmtRVjZJNUtOZXJURFZGVHAxbmVsYWFPLUdCaW9icXJ1Rzd6SUw2bEZuQi1XdVdXczVhWmVySUpKUm9IRVlUQ1pLNHFwT1d4YXNFSVA2bVc4ZV92MGs3OCIsImlzc3VlZF9hdCI6MTU0ODI5NTA0NiwidXNlcl9pZCI6IjEwMDAwMDgyNTI5MTc5OSJ9; csrftoken=PmOadYmRV4sLc2TaxDajTht7nJfMeOqS; ds_user_id=2118484329; sessionid=2118484329%3A7qWc9utxdishs2%3A7;urlgen="{\"182.253.178.103\": 17451\054 \"182.253.177.62\": 17451}:1gmUHr:b4FiMwAdbPcOvggvrxzdKxztTWM',
                  'referer': 'https://www.instagram.com/'+row.username+'/',
                  'x-ig-app-id': '936619743392459',
                  'x-instagram-gis': 'bf23ef082274cc8ae4565268a58dd644',
                  'x-requested-with': 'XMLHttpRequest',
                }
              };


            request(options, function(error, response, html){
              var html = JSON.parse(html)

                    html.data.user.edge_owner_to_timeline_media.edges.forEach(function(x,y){

                      let instagram_post_id = html.data.user.edge_owner_to_timeline_media.edges[y].node.id;


                      // let sql = "INSERT INTO `tb_instagram` (`instagram_id`,`instagram_user_id`, `post_id`, `post_text`, `post_comment`, `post_like`) VALUES (NULL,"+row.instagram_id+", "+html.data.user.edge_owner_to_timeline_media.edges[y].node.id+" , '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_caption.edges[0].node.text+"', "+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.count+", "+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_liked_by.count+")";


                      let sql = "INSERT INTO `tb_instagram` (`instagram_id`,`instagram_user_id`, `post_id`, `post_text`, `post_comment`, `post_like`) VALUES (NULL,"+row.instagram_id+", "+html.data.user.edge_owner_to_timeline_media.edges[y].node.id+" , '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_caption.edges[0].node.text+"', "+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.count+", "+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_preview_like.count+")";


                      con.query(sql, function (err, result) {
                        if (err){
                                let sql_update = "UPDATE `tb_instagram` SET `display_url` = '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.display_url+"' ,post_shortcode = '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.shortcode+"' WHERE `tb_instagram`.`post_id` = "+html.data.user.edge_owner_to_timeline_media.edges[y].node.id+" "
                                con.query(sql_update, function (err, result) {
                                });

                        }
                        let sql_update = "UPDATE `tb_instagram` SET `display_url` = '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.display_url+"' ,post_shortcode = '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.shortcode+"' WHERE `tb_instagram`.`post_id` = "+html.data.user.edge_owner_to_timeline_media.edges[y].node.id+" "
                        con.query(sql_update, function (err, result) {
                        });

                      });

                      html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges.forEach(function(x1,y1){

                        let sql_insert_comment = "INSERT INTO `tb_instagram_comment` (`tb_instagram_comment_id`, `instagram_post_id`, `comment_id`, `comment_text`, `comment_ created_at`, `did_report_as_spam`, `username_comment`, `username_ profile_pic_url`,`username_comment_verified`,`created_at`) VALUES (NULL, '"+instagram_post_id+"', '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges[y1].node.id+"', '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges[y1].node.text+"', '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges[y1].node.created_at+"', '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges[y1].node.did_report_as_spam+"', '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges[y1].node.owner.username+"', '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges[y1].node.owner.profile_pic_url+"','"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges[y1].node.owner.is_verified+"',NULL)"

                        con.query(sql_insert_comment)

                      });


                    })

                    res.send(row.instagram_id)

                  // res.send(html.data.user.edge_owner_to_timeline_media.edges[0].node.edge_media_to_caption.edges[0].node.text);
            });


        });
      });



})


app.get('/instagram_page14', function(req, res){
      // var title, release, rating;
      var data_array = [];
      var data_array2 = [];
      var data_array3 = [];



      con.query("SELECT username,instagram_id FROM instagram_users where is_run != 1 LIMIT 1", function(err, rows, fields) {
        rows.forEach(function(row) {
          // username = row.username




              const options = {
                url: 'https://www.instagram.com/graphql/query/?query_hash=f2405b236d85e8296cf30347c9f08c2a'+
                '&variables={"id":"'+row.instagram_id+'","first":12,'+
                '"after":"QVFBeVBnUEh6Y08yX21FS0MyLWEzT3liUHI1SWRETUtaWnc3eXVUOV9OVDJiWjVRWGxiYi1zdGk1YmJyTFBURzNIRUNIbGphWWttUFpSQUVWbkdYMzE1Wg=="}',
                headers: {
                  'cookie': 'mcd=3; mid=XBIhGQAEAAHcnCbPArtkoSTeuLHz; shbid=6323; shbts=1548133910.5068145;fbm_124024574287414=base_domain=.instagram.com;rur=ATN;fbsr_124024574287414=UD3U91kzsWEGrbK9AcbaAwmV85c0eMsIAJtRfWEruo4.eyJhbGdvcml0aG0iOiJITUFDLVNIQTI1NiIsImNvZGUiOiJBUUExSTV3YkU0QTl1d1hRVWw0NUZsYTR3aENqZjE0UEZ0STNxUFdFdlJVZWhZbzBVMzVUVFZFUFQwczdaQ3J6Z2lnOWZpNzBqVlRGZTFVOEdJWDgyYXdnRzVXUGZXazB5dTNhdUYxT0FtN2p0ZnpYczR0Wk50OFlHTUxZRlFwb2xvYnZBRHk0cWNpd1NocVZFMF9MM1lnSDhoemdXeFpRSXhnckNvbDlxN05nVTFpVENxcXdpYmpDb0F4UUtCT0dkUWY2R3lueDdtcTJKMG9IYVROMjlMclJaWVJfMDhQTDBsVDQwSTZ0Z3F5cWFuXzJWVmdBTmtYOXdIdkhfd1lqZmtRVjZJNUtOZXJURFZGVHAxbmVsYWFPLUdCaW9icXJ1Rzd6SUw2bEZuQi1XdVdXczVhWmVySUpKUm9IRVlUQ1pLNHFwT1d4YXNFSVA2bVc4ZV92MGs3OCIsImlzc3VlZF9hdCI6MTU0ODI5NTA0NiwidXNlcl9pZCI6IjEwMDAwMDgyNTI5MTc5OSJ9; csrftoken=PmOadYmRV4sLc2TaxDajTht7nJfMeOqS; ds_user_id=2118484329; sessionid=2118484329%3A7qWc9utxdishs2%3A7;urlgen="{\"182.253.178.103\": 17451\054 \"182.253.177.62\": 17451}:1gmUHr:b4FiMwAdbPcOvggvrxzdKxztTWM',
                  'referer': 'https://www.instagram.com/'+row.username+'/',
                  'x-ig-app-id': '936619743392459',
                  'x-instagram-gis': 'bf23ef082274cc8ae4565268a58dd644',
                  'x-requested-with': 'XMLHttpRequest',
                }
              };


            request(options, function(error, response, html){
              var html = JSON.parse(html)

                    html.data.user.edge_owner_to_timeline_media.edges.forEach(function(x,y){

                      let instagram_post_id = html.data.user.edge_owner_to_timeline_media.edges[y].node.id;


                      // let sql = "INSERT INTO `tb_instagram` (`instagram_id`,`instagram_user_id`, `post_id`, `post_text`, `post_comment`, `post_like`) VALUES (NULL,"+row.instagram_id+", "+html.data.user.edge_owner_to_timeline_media.edges[y].node.id+" , '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_caption.edges[0].node.text+"', "+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.count+", "+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_liked_by.count+")";


                      let sql = "INSERT INTO `tb_instagram` (`instagram_id`,`instagram_user_id`, `post_id`, `post_text`, `post_comment`, `post_like`) VALUES (NULL,"+row.instagram_id+", "+html.data.user.edge_owner_to_timeline_media.edges[y].node.id+" , '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_caption.edges[0].node.text+"', "+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.count+", "+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_preview_like.count+")";


                      con.query(sql, function (err, result) {
                        if (err){
                                let sql_update = "UPDATE `tb_instagram` SET `display_url` = '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.display_url+"' ,post_shortcode = '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.shortcode+"' WHERE `tb_instagram`.`post_id` = "+html.data.user.edge_owner_to_timeline_media.edges[y].node.id+" "
                                con.query(sql_update, function (err, result) {
                                });

                        }
                        let sql_update = "UPDATE `tb_instagram` SET `display_url` = '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.display_url+"' ,post_shortcode = '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.shortcode+"' WHERE `tb_instagram`.`post_id` = "+html.data.user.edge_owner_to_timeline_media.edges[y].node.id+" "
                        con.query(sql_update, function (err, result) {
                        });

                      });

                      html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges.forEach(function(x1,y1){

                        let sql_insert_comment = "INSERT INTO `tb_instagram_comment` (`tb_instagram_comment_id`, `instagram_post_id`, `comment_id`, `comment_text`, `comment_ created_at`, `did_report_as_spam`, `username_comment`, `username_ profile_pic_url`,`username_comment_verified`,`created_at`) VALUES (NULL, '"+instagram_post_id+"', '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges[y1].node.id+"', '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges[y1].node.text+"', '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges[y1].node.created_at+"', '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges[y1].node.did_report_as_spam+"', '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges[y1].node.owner.username+"', '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges[y1].node.owner.profile_pic_url+"','"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges[y1].node.owner.is_verified+"',NULL)"

                        con.query(sql_insert_comment)

                      });


                    })

                    res.send(row.instagram_id)

                  // res.send(html.data.user.edge_owner_to_timeline_media.edges[0].node.edge_media_to_caption.edges[0].node.text);
            });


        });
      });



})





app.get('/instagram_page15', function(req, res){
      // var title, release, rating;
      var data_array = [];
      var data_array2 = [];
      var data_array3 = [];



      con.query("SELECT username,instagram_id FROM instagram_users where is_run != 1 LIMIT 1", function(err, rows, fields) {
        rows.forEach(function(row) {
          // username = row.username




              const options = {
                url: 'https://www.instagram.com/graphql/query/?query_hash=f2405b236d85e8296cf30347c9f08c2a'+
                '&variables={"id":"'+row.instagram_id+'","first":12,'+
                '"after":"QVFCVWxnME5HZTNfMDFzcEJVT2syMG9hNTYwVklUVjBxS1ExeVZ6bGtnTVNGR3NaTXdzbWJBalQ4NW80Nll5MXVKZnpmSU8yZlB6QzljbERJS0tzbkJrNg=="}',
                headers: {
                  'cookie': 'mcd=3; mid=XBIhGQAEAAHcnCbPArtkoSTeuLHz; shbid=6323; shbts=1548133910.5068145;fbm_124024574287414=base_domain=.instagram.com;rur=ATN;fbsr_124024574287414=UD3U91kzsWEGrbK9AcbaAwmV85c0eMsIAJtRfWEruo4.eyJhbGdvcml0aG0iOiJITUFDLVNIQTI1NiIsImNvZGUiOiJBUUExSTV3YkU0QTl1d1hRVWw0NUZsYTR3aENqZjE0UEZ0STNxUFdFdlJVZWhZbzBVMzVUVFZFUFQwczdaQ3J6Z2lnOWZpNzBqVlRGZTFVOEdJWDgyYXdnRzVXUGZXazB5dTNhdUYxT0FtN2p0ZnpYczR0Wk50OFlHTUxZRlFwb2xvYnZBRHk0cWNpd1NocVZFMF9MM1lnSDhoemdXeFpRSXhnckNvbDlxN05nVTFpVENxcXdpYmpDb0F4UUtCT0dkUWY2R3lueDdtcTJKMG9IYVROMjlMclJaWVJfMDhQTDBsVDQwSTZ0Z3F5cWFuXzJWVmdBTmtYOXdIdkhfd1lqZmtRVjZJNUtOZXJURFZGVHAxbmVsYWFPLUdCaW9icXJ1Rzd6SUw2bEZuQi1XdVdXczVhWmVySUpKUm9IRVlUQ1pLNHFwT1d4YXNFSVA2bVc4ZV92MGs3OCIsImlzc3VlZF9hdCI6MTU0ODI5NTA0NiwidXNlcl9pZCI6IjEwMDAwMDgyNTI5MTc5OSJ9; csrftoken=PmOadYmRV4sLc2TaxDajTht7nJfMeOqS; ds_user_id=2118484329; sessionid=2118484329%3A7qWc9utxdishs2%3A7;urlgen="{\"182.253.178.103\": 17451\054 \"182.253.177.62\": 17451}:1gmUHr:b4FiMwAdbPcOvggvrxzdKxztTWM',
                  'referer': 'https://www.instagram.com/'+row.username+'/',
                  'x-ig-app-id': '936619743392459',
                  'x-instagram-gis': 'bf23ef082274cc8ae4565268a58dd644',
                  'x-requested-with': 'XMLHttpRequest',
                }
              };


            request(options, function(error, response, html){
              var html = JSON.parse(html)

                    html.data.user.edge_owner_to_timeline_media.edges.forEach(function(x,y){


                      let instagram_post_id = html.data.user.edge_owner_to_timeline_media.edges[y].node.id;

                      // let sql = "INSERT INTO `tb_instagram` (`instagram_id`,`instagram_user_id`, `post_id`, `post_text`, `post_comment`, `post_like`) VALUES (NULL,"+row.instagram_id+", "+html.data.user.edge_owner_to_timeline_media.edges[y].node.id+" , '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_caption.edges[0].node.text+"', "+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.count+", "+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_liked_by.count+")";


                      let sql = "INSERT INTO `tb_instagram` (`instagram_id`,`instagram_user_id`, `post_id`, `post_text`, `post_comment`, `post_like`) VALUES (NULL,"+row.instagram_id+", "+html.data.user.edge_owner_to_timeline_media.edges[y].node.id+" , '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_caption.edges[0].node.text+"', "+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.count+", "+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_preview_like.count+")";


                      con.query(sql, function (err, result) {
                        if (err){
                                let sql_update = "UPDATE `tb_instagram` SET `display_url` = '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.display_url+"' ,post_shortcode = '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.shortcode+"' WHERE `tb_instagram`.`post_id` = "+html.data.user.edge_owner_to_timeline_media.edges[y].node.id+" "
                                con.query(sql_update, function (err, result) {
                                });

                        }
                        let sql_update = "UPDATE `tb_instagram` SET `display_url` = '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.display_url+"' ,post_shortcode = '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.shortcode+"' WHERE `tb_instagram`.`post_id` = "+html.data.user.edge_owner_to_timeline_media.edges[y].node.id+" "
                        con.query(sql_update, function (err, result) {
                        });

                      });

                      html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges.forEach(function(x1,y1){

                        let sql_insert_comment = "INSERT INTO `tb_instagram_comment` (`tb_instagram_comment_id`, `instagram_post_id`, `comment_id`, `comment_text`, `comment_ created_at`, `did_report_as_spam`, `username_comment`, `username_ profile_pic_url`,`username_comment_verified`,`created_at`) VALUES (NULL, '"+instagram_post_id+"', '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges[y1].node.id+"', '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges[y1].node.text+"', '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges[y1].node.created_at+"', '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges[y1].node.did_report_as_spam+"', '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges[y1].node.owner.username+"', '"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges[y1].node.owner.profile_pic_url+"','"+html.data.user.edge_owner_to_timeline_media.edges[y].node.edge_media_to_comment.edges[y1].node.owner.is_verified+"',NULL)"

                        con.query(sql_insert_comment)

                      });


                    })

                    res.send(row.instagram_id)

                  // res.send(html.data.user.edge_owner_to_timeline_media.edges[0].node.edge_media_to_caption.edges[0].node.text);
            });


        });
      });



})

app.get('/get_following', function(req, res){

  con.query("SELECT username,instagram_id FROM instagram_users where is_run != 1 LIMIT 1", function(err, rows, fields) {
        rows.forEach(function(row) {


          const options = {
                      url: 'https://www.instagram.com/graphql/query/?query_hash=c56ee0ae1f89cdbd1c89e2bc6b8f3d18&variables={"id":"'+row.instagram_id+'","include_reel":true,"fetch_mutual":false,"first":24}',
                      headers: {
                        'cookie': 'mcd=3; mid=XBIhGQAEAAHcnCbPArtkoSTeuLHz; shbid=6323; shbts=1548133910.5068145;fbm_124024574287414=base_domain=.instagram.com;rur=ATN;fbsr_124024574287414=UD3U91kzsWEGrbK9AcbaAwmV85c0eMsIAJtRfWEruo4.eyJhbGdvcml0aG0iOiJITUFDLVNIQTI1NiIsImNvZGUiOiJBUUExSTV3YkU0QTl1d1hRVWw0NUZsYTR3aENqZjE0UEZ0STNxUFdFdlJVZWhZbzBVMzVUVFZFUFQwczdaQ3J6Z2lnOWZpNzBqVlRGZTFVOEdJWDgyYXdnRzVXUGZXazB5dTNhdUYxT0FtN2p0ZnpYczR0Wk50OFlHTUxZRlFwb2xvYnZBRHk0cWNpd1NocVZFMF9MM1lnSDhoemdXeFpRSXhnckNvbDlxN05nVTFpVENxcXdpYmpDb0F4UUtCT0dkUWY2R3lueDdtcTJKMG9IYVROMjlMclJaWVJfMDhQTDBsVDQwSTZ0Z3F5cWFuXzJWVmdBTmtYOXdIdkhfd1lqZmtRVjZJNUtOZXJURFZGVHAxbmVsYWFPLUdCaW9icXJ1Rzd6SUw2bEZuQi1XdVdXczVhWmVySUpKUm9IRVlUQ1pLNHFwT1d4YXNFSVA2bVc4ZV92MGs3OCIsImlzc3VlZF9hdCI6MTU0ODI5NTA0NiwidXNlcl9pZCI6IjEwMDAwMDgyNTI5MTc5OSJ9; csrftoken=PmOadYmRV4sLc2TaxDajTht7nJfMeOqS; ds_user_id=2118484329; sessionid=2118484329%3A7qWc9utxdishs2%3A7;urlgen="{\"182.253.178.103\": 17451\054 \"182.253.177.62\": 17451}:1gmUHr:b4FiMwAdbPcOvggvrxzdKxztTWM',
                        'x-ig-app-id': '936619743392459',
                        'x-instagram-gis': 'bf23ef082274cc8ae4565268a58dd644',
                        'x-requested-with': 'XMLHttpRequest',
                      }
           };

           
                      var html2 = '';
                      var html1 = '';

                  request(options, function(error, response, html){

                      html = JSON.parse(html);

                      if (html.data.user != null) {

                        html.data.user.edge_follow.edges.forEach(function(x1,y1){


                          let insert_following = "INSERT INTO `tb_insert_following` (`id_insert_following`, `id_user`, `username`) VALUES (NULL, '"+html.data.user.edge_follow.edges[y1].node.id+"', '"+html.data.user.edge_follow.edges[y1].node.username+"')";

                          con.query(insert_following)

                        });


                        res.send(html);

                      }else{
                        res.send('kosong');


                      }






                  });

        });
  });
            
            
})




app.get('/instagram_story', function(req, res){

      con.query("SELECT username,instagram_id FROM instagram_users where is_run != 1 LIMIT 1", function(err, rows, fields) {
        rows.forEach(function(row) {

          // username = row.username
          console.log(row.username);




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
                  // let sql_insert_instastory = "INSERT INTO `tb_instagram_story` (`instagram_story`, `instagram_id`, `instagram_story_id`, `tappable_objects`, `waktu`) VALUES (NULL, '"+row.instagram_id+"', 'aaa', '"+tappable_objects+"', 'asdsa')";

                  con.query(sql_insert_instastory)

                 downloadFile(display_resources,type,name,instagram_story_id)


                });

                 // upload_firebase(display_resources); 


                    res.send(html)
              }else{
                    res.send(row.username)

                
              }


                  // res.send(html.data.user.edge_owner_to_timeline_media.edges[0].node.edge_media_to_caption.edges[0].node.text);
            });


        });
    });
  


})

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
  // console.log(year_now);


  // end

  // creat new folder by user id
   if (!fs.existsSync('data/'+name)) {
      fs.mkdirSync('data/'+name, 777);
  }

  // end
  // creat new folder by year
   if (!fs.existsSync('data/'+name+'/'+year_now)) {
      fs.mkdirSync('data/'+name+'/'+year_now, 777);
  }
  // end

  // creat new folder by date
   if (!fs.existsSync('data/'+name+'/'+year_now+'/'+month_now)) {
      fs.mkdirSync('data/'+name+'/'+year_now+'/'+month_now, 777);
  }
  // end


  // creat new folder by date
   if (!fs.existsSync('data/'+name+'/'+year_now+'/'+month_now+'/'+date_now)) {
      fs.mkdirSync('data/'+name+'/'+year_now+'/'+month_now+'/'+date_now, 777);
  }
  // end


  if (type == 'mp4') {
    file = fs.createWriteStream('data/'+name+'/'+year_now+'/'+month_now+'/'+date_now+'/'+instagram_story_id+'.mp4');

  }else{
    file = fs.createWriteStream('data/'+name+'/'+year_now+'/'+month_now+'/'+date_now+'/'+instagram_story_id+'.jpg');

  }
  const request = https.get(url, function(response) {
  // console.log(response);
  response.pipe(file);
    // upload_firebase('./0.933835427043127.mp4')

});
}










app.listen('7071')
console.log('Magic happens on port 8081');
exports = module.exports = app;
