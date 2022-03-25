let localVideo = null;
let remoteVideo = null;
let localStream = null;

async function initMedia() {
    localVideo = document.getElementById('localVideo');
    remoteVideo = document.getElementById('remoteVideo');
    
    document.getElementById('localVideo').addEventListener('resize', (e) => {
      document.querySelector('[data-content="localResolution"]').textContent = [e.target.videoWidth, e.target.videoHeight].join('x');
    });

    document.getElementById('remoteVideo').addEventListener('resize', (e) => {
      document.querySelector('[data-content="remoteResolution"]').textContent = [e.target.videoWidth, e.target.videoHeight].join('x');
    });
    localStream = await navigator.mediaDevices.getUserMedia(mediaConstraints);

    localVideo.srcObject = localStream;
}
