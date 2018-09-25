
const {ipcRenderer} = require('electron');

ipcRenderer.on('endSpam', (event) => {
    setStatus("Start")
})

ipcRenderer.on('remaining', (event, remainingQuestions) => {
    setStatus("Cancel: "+ remainingQuestions + " to go")
})

const waitTime = 32000
function calcEstimation(repetitions) {
    var valor = Math.round(waitTime * repetitions / 1000 / 60)
    document.getElementById("Estimation").innerText = valor
}

function performStatusButtonAction() {
    var statusButtonValue = document.getElementById("statusButton").innerText
    if (statusButtonValue == "Start") {
        startSpamming()
    } else {
        stopSpamming()
    }
}

function startSpamming(){
    var message = getMessage()
    var nickName = getUserNickname()
    var numberOfRepetitions = getNumberOfRepetitions()
    ipcRenderer.send('startSpamming', nickName, message, numberOfRepetitions)
    setStatus("Cancel: "+ numberOfRepetitions + " to go")
}

function stopSpamming(){
    ipcRenderer.send('stopSpamming')
    setStatus("Start")

}

function setStatus(newStatus){
    document.getElementById("statusButton").innerText = newStatus
}

function getMessage(){
    return document.getElementById("message").value
}

function getNumberOfRepetitions(){
    return document.getElementById("mins").value
}

function getUserNickname(){
    return document.getElementById("username").value
}
