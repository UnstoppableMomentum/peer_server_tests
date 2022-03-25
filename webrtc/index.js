
async function onLoad() {
    initUi();
    await initMedia();
    startUpdateStat();
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

function getDecodedFrames(videoElement) {
    if (videoElement &&
        typeof videoElement.webkitDecodedFrameCount !== undefined) {
            return videoElement.webkitDecodedFrameCount;
        }
    return 0;
}

