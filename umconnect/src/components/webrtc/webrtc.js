let pc = null;
let idRemote = null;

async function makeCall() {

    idRemote = document.getElementById("idRemote").value;

    await createPeerConnection(idRemote);
  
    let offer = await pc.createOffer();
    offer.sdp = addVideoBandwidth(offer.sdp, bitrateConstraints.minBitrate, bitrateConstraints.maxBitrate);

    sendMessage(idRemote, JSON.stringify(offer));
    await pc.setLocalDescription(offer);
}

function createPeerConnection() {
    pc = new RTCPeerConnection(pcConfig, sdpConstraints);

    pc.onicecandidate = onIceCandidate;
    pc.ontrack = e => remoteVideo.srcObject = e.streams[0];

    localStream.getTracks().forEach(track => pc.addTrack(track, localStream));
}

async function handleOffer(from, offer) {
    if (pc) {
        console.error('existing peerconnection');
        return;
    }

    await createPeerConnection();
    await pc.setRemoteDescription(offer);

    idRemote = from;
    let answer = await pc.createAnswer();
    answer.sdp = addVideoBandwidth(answer.sdp, bitrateConstraints.minBitrate, bitrateConstraints.maxBitrate);

    sendMessage(idRemote, JSON.stringify(answer));
    await pc.setLocalDescription(answer);
}

async function handleAnswer(answer) {
    if (!pc) {
        console.error('no peerconnection');
        return;
    }
    await pc.setRemoteDescription(answer);
}

async function handleCandidate(message) {
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

function destroylPeerConnection() {
    if (pc) {
        pc.close();
        pc = null;
    }
}

