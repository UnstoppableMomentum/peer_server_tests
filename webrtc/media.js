let localVideo = null;
let remoteVideo = null;
let localStream = null;

async function initMedia() {
    localVideo = document.getElementById('localVideo');
    remoteVideo = document.getElementById('remoteVideo');
    
    localStream = await navigator.mediaDevices.getUserMedia({audio: true, video: true});
    localVideo.srcObject = localStream;
}