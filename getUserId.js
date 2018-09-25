

function getUserIdByNickname(nickname){
    return new Promise(function(resolve, reject) {
    var unirest = require("unirest");

    var req = unirest("GET", "https://curiouscat.me/api/v2/profile");
    
    req.query({
      "username": ""+nickname,
      "count": "30",
      "min_timestamp": "0"
    });
    
    req.headers({
      "Cache-Control": "no-cache",
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; rv:11.0) like Gecko",
      "Host": "curiouscat.me",
      "Accept-Language": "es_ES",
      "Accept-Encoding": "gzip, deflate",
      "Referer": "https://curiouscat.me/"+nickname,
      "X-Requested-With": "XMLHttpRequest",
      "Accept": "application/json, text/plain, */*"
    });
    req.end(function (res) {
      if (res.error) {
        reject(res.error)
      } else {
        resolve(res.body["id"])
      }
    
    });
  })

}

module.exports = {getUserIdByNickname}