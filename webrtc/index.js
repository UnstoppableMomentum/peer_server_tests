
function onLoad() {
    initUi();
    initMedia();
}

function onAddSslException() {
    location.href = document.getElementById("server").value.toLowerCase();
}

function onConnectAndSignIn(localName) {
    connectAndSignIn(document.getElementById("idLocal").value);
}

function signInCallback(data) {
    showCmdResult(JSON.stringify(data));
}

