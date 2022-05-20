import { 
    bitrateConstraints,
    sdpConstraints,
    pcConfig
} from './config';

import { 
    sendMessage,
    sendMessageICE
} from '../peer-server'

import { 
    callConnected
} from '../call/actions'


import { addVideoBandwidth } from './utils' 

import { mediaConstraints } from './config'

let pc = null;
let idRemote = null;

let videoLocal = null;
//let remoteVideo = null;
let localStream = null;

export async function initMedia() {
    videoLocal = document.getElementById('videoLocal');
  //  remoteVideo = document.getElementById('videoRemote');
    
    document.getElementById('videoLocal').addEventListener('resize', (e) => {
    //  document.querySelector('[data-content="localResolution"]').textContent = [e.target.videoWidth, e.target.videoHeight].join('x');
    });

    // document.getElementById('videoRemote').addEventListener('resize', (e) => {
    // //   document.querySelector('[data-content="remoteResolution"]').textContent = [e.target.videoWidth, e.target.videoHeight].join('x');
    // });
    localStream = await navigator.mediaDevices.getUserMedia(mediaConstraints);

    videoLocal.srcObject = localStream;
}

export async function callStart(dispatch, idRemote) {

    await createPeerConnection(dispatch, idRemote);

    let offer = await pc.createOffer();
    offer.sdp = addVideoBandwidth(offer.sdp, bitrateConstraints.minBitrate, bitrateConstraints.maxBitrate);

    sendMessage(idRemote, JSON.stringify(offer));
    await pc.setLocalDescription(offer);
}

function createPeerConnection(dispatch) {
    const remoteVideo = document.getElementById('videoRemote');

    pc = new RTCPeerConnection(pcConfig, sdpConstraints);

    pc.onicecandidate = onIceCandidate;
    pc.ontrack = e => {
        console.log('Remote :%o', remoteVideo);
        callConnected(dispatch);
        remoteVideo.srcObject = e.streams[0];
    }

    localStream.getTracks().forEach(track => pc.addTrack(track, localStream));
}

export async function handleOffer(dispatch, from, offer) {
    if (pc) {
        console.error('existing peerconnection');
        return;
    }

    await createPeerConnection(dispatch);
    await pc.setRemoteDescription(offer);

    idRemote = from;
    let answer = await pc.createAnswer();
    answer.sdp = addVideoBandwidth(answer.sdp, bitrateConstraints.minBitrate, bitrateConstraints.maxBitrate);

    sendMessage(idRemote, JSON.stringify(answer));
    await pc.setLocalDescription(answer);
}

export async function handleAnswer(dispatch, answer) {
    if (!pc) {
        console.error('no peerconnection');
        return;
    }
    await pc.setRemoteDescription(answer);
    callConnected(dispatch);
}

export async function handleCandidate(dispatch, message) {
    if (!pc) {
        console.error('no peerconnection');
        return;
    }

    const candidate = new RTCIceCandidate({
        sdpMLineIndex: message.sdpMLineIndex,
        candidate: message.candidate
    });

    if (!candidate.candidate) {
        await pc.addIceCandidate(null);
    } else {
        await pc.addIceCandidate(candidate);
    }
}

function onIceCandidate(event) {
    if (event.candidate) {
        sendMessageICE(idRemote, event);
    } else {
        console.debug("End of candidates.");
    }
}

export function destroylPeerConnection() {
    if (pc) {
        pc.close();
        pc = null;
    }
}

