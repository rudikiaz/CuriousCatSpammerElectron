const unirest = require("unirest");

var keepSpamming = true
const timeBeetweenQuestions = 32000

const snooze = ms => new Promise(resolve => setTimeout(resolve, ms));

function stopSpamming(){
    keepSpamming = false
}

async function startSpamming(userId, message, numberOfRepetitions, callbackMaker) {
    keepSpamming = true
    var index = 0
    while(hasToKeepSpamming(index++, numberOfRepetitions)){
        sendQuestion(userId, message)
        callbackMaker.webContents.send('remaining', (numberOfRepetitions-index))
        await snooze(timeBeetweenQuestions);
    }
    sendQuestion(userId, message)
    callbackMaker.webContents.send('endSpam')
}

function hasToKeepSpamming(index, numberOfRepetitions){
    return keepSpamming && index < numberOfRepetitions - 1
}

function sendQuestion(userId, message){
    var req = unirest("POST", "https://curiouscat.me/api/v2/post/create");
    req.headers({
      "X-Requested-With": "XMLHttpRequest",
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; rv:11.0) like Gecko",
      "Host": "curiouscat.me",
      "Content-Type": "multipart/form-data; boundary=---------------------------7e21ef2f50b30",
      "Cache-Control": "no-cache",
      "Accept-Language": "es_ES",
      "Accept-Encoding": "gzip, deflate",
      "accept": "application/json, text/plain, */"
    });
    
      req.send("-----------------------------7e21ef2f50b30\r\nContent-Disposition: form-data; name=\"addressees\"\r\n\r\n"+userId+"\r\n-----------------------------7e21ef2f50b30\r\nContent-Disposition: form-data; name=\"anon\"\r\n\r\ntrue\r\n-----------------------------7e21ef2f50b30\r\nContent-Disposition: form-data; name=\"question\"\r\n\r\n"+message+"\r\n-----------------------------7e21ef2f50b30--\r\n");
    
    req.end(function (res) {
      if (res.error) throw new Error(res.error);
    });
    
}
  
module.exports = {startSpamming, stopSpamming};