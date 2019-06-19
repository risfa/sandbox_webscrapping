var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
var iconv = require('iconv-lite');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";






                    options = {
                        url: 'https://www.instagram.com/prabowo/?__a=1',
                        // url: 'https://www.instagram.com/pevpearce/?__a=1',
                        headers: {
                          'cookie': 'mcd=3; mid=XBIhGQAEAAHcnCbPArtkoSTeuLHz; shbid=6323; shbts=1548133910.5068145;fbm_124024574287414=base_domain=.instagram.com;rur=ATN;fbsr_124024574287414=UD3U91kzsWEGrbK9AcbaAwmV85c0eMsIAJtRfWEruo4.eyJhbGdvcml0aG0iOiJITUFDLVNIQTI1NiIsImNvZGUiOiJBUUExSTV3YkU0QTl1d1hRVWw0NUZsYTR3aENqZjE0UEZ0STNxUFdFdlJVZWhZbzBVMzVUVFZFUFQwczdaQ3J6Z2lnOWZpNzBqVlRGZTFVOEdJWDgyYXdnRzVXUGZXazB5dTNhdUYxT0FtN2p0ZnpYczR0Wk50OFlHTUxZRlFwb2xvYnZBRHk0cWNpd1NocVZFMF9MM1lnSDhoemdXeFpRSXhnckNvbDlxN05nVTFpVENxcXdpYmpDb0F4UUtCT0dkUWY2R3lueDdtcTJKMG9IYVROMjlMclJaWVJfMDhQTDBsVDQwSTZ0Z3F5cWFuXzJWVmdBTmtYOXdIdkhfd1lqZmtRVjZJNUtOZXJURFZGVHAxbmVsYWFPLUdCaW9icXJ1Rzd6SUw2bEZuQi1XdVdXczVhWmVySUpKUm9IRVlUQ1pLNHFwT1d4YXNFSVA2bVc4ZV92MGs3OCIsImlzc3VlZF9hdCI6MTU0ODI5NTA0NiwidXNlcl9pZCI6IjEwMDAwMDgyNTI5MTc5OSJ9; csrftoken=PmOadYmRV4sLc2TaxDajTht7nJfMeOqS; ds_user_id=2118484329; sessionid=2118484329%3A7qWc9utxdishs2%3A7;urlgen="{\"182.253.178.103\": 17451\054 \"182.253.177.62\": 17451}:1gmUHr:b4FiMwAdbPcOvggvrxzdKxztTWM',
                          'referer': 'https://www.instagram.com/prabowo/',
                          // 'referer': 'https://www.instagram.com/pevpearce/',
                          'x-ig-app-id': '936619743392459',
                          'x-instagram-gis': 'bf23ef082274cc8ae4565268a58dd644',
                          'x-requested-with': 'XMLHttpRequest',
                        }
                      };


                    request(options, function(error, response, html){
                      var html = JSON.parse(html)

                      // console.log(html)


                      MongoClient.connect(url, function(err, db) {
                        if (err) throw err;
                        var dbo = db.db("debi");

                        dbo.collection("debiCollection").insert(html, function(err, res) {
                          if (err) throw err;
                          console.log("Number of documents inserted: " + res.insertedCount);
                          db.close();
                        });
                      });









                    });
