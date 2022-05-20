// import { mediaConstraints } from './config'


// let videoLocal = null;
// //let remoteVideo = null;
// let localStream = null;

// export async function initMedia() {
//     videoLocal = document.getElementById('videoLocal');
//   //  remoteVideo = document.getElementById('videoRemote');
    
//     document.getElementById('videoLocal').addEventListener('resize', (e) => {
//     //  document.querySelector('[data-content="localResolution"]').textContent = [e.target.videoWidth, e.target.videoHeight].join('x');
//     });

//     // document.getElementById('videoRemote').addEventListener('resize', (e) => {
//     // //   document.querySelector('[data-content="remoteResolution"]').textContent = [e.target.videoWidth, e.target.videoHeight].join('x');
//     // });
//     localStream = await navigator.mediaDevices.getUserMedia(mediaConstraints);

//     videoLocal.srcObject = localStream;
// }
