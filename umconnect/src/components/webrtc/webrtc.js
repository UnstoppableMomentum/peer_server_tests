import {
    connectionStateChange,
    iceConnectionStateChange,
    iceGatheringStateChange,
    signalingStateChange
} from './actions'

import { 
    bitrateConstraints,
    mediaConstraints,
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

let pc = null;
let videoLocal = null;
let remoteVideo = null;
let localStream = null;
let glIdRemote = null;

export async function initMedia() {
    videoLocal = document.getElementById('videoLocal');
    remoteVideo = document.getElementById('videoRemote');
    
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

export function callStop() {
    destroylPeerConnection();
}

function createPeerConnection(dispatch, idRemote) {
    pc = new RTCPeerConnection(pcConfig, sdpConstraints);
    glIdRemote = idRemote;
    console.log('glIdRemote: %o', glIdRemote);
    pc.onicecandidate = onIceCandidate;
    pc.oniceconnectionstatechange = () => {
        iceConnectionStateChange(dispatch, pc.iceConnectionState)
    }
    pc.onicegatheringstatechange = () => {
        iceGatheringStateChange(dispatch, pc.iceGatheringState)
    }
    pc.onsignalingstatechange= () => {
        signalingStateChange(dispatch, pc.signalingState)
    }
    pc.onconnectionstatechange = () => {
        connectionStateChange(dispatch, pc.connectionState)
    }
    pc.ontrack = e => {
        console.log('Remote :%o', remoteVideo);
        callConnected(dispatch);
        remoteVideo.srcObject = e.streams[0];
    }

    localStream.getTracks().forEach(track => pc.addTrack(track, localStream));
}

export async function handleOffer(dispatch, idRemote, offer) {
    if (pc) {
        console.error('existing peerconnection');
        return;
    }

    await createPeerConnection(dispatch, idRemote);
    await pc.setRemoteDescription(offer);

    glIdRemote = idRemote;
    console.log('handleOffer glIdRemote: %o', glIdRemote);
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
        console.log('onIceCandidate glIdRemote: %o', glIdRemote);
        sendMessageICE(glIdRemote, event);
    } else {
        console.debug("End of candidates.");
    }
}

function destroylPeerConnection() {
    if (pc) {
        pc.close();
        pc = null;
    }
}
