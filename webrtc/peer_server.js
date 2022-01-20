var MSG_OFFER = "offer";
var MSG_ANSWER = "answer";
var MSG_CANDIDATE = "candidate";
var MSG_BYE = "bye";
var MSG_BUSY = "busy";
var MSG_REGECT = "reject";

let webSocket = null;

function connectAndSignIn(localName) {
  try {

    webSocket = new WebSocket(config.URL_SERVER_WSS);

    webSocket.onopen = (event => {
      webSocket.send(
        JSON.stringify({
          cmd: 1,
          data: {
            id: localName
          }
        })
      );
    });

    webSocket.onmessage = (event => {
      onWebSocketMessage(event.data);
    });

    webSocket.onclose = (event => {
      console.log("onclose %o", event);
    });
  } catch (e) {
    console.error("error: %o", e);
  }
}

function sendMessage(to, msg) {
  webSocket.send(
    JSON.stringify({
      cmd: 3,
      data: { to, msg }
    })
  );
}

function sendMessageICE(peer_id, event) {
  sendMessage(peer_id, JSON.stringify({
    type: MSG_CANDIDATE,
    sdpMLineIndex: event.candidate.sdpMLineIndex,
    sdpMid: event.candidate.sdpMid,
    candidate: event.candidate.candidate
  }));
}

function sendMessageBye(peer_id) {
  sendMessage(peer_id, JSON.stringify({ type: MSG_BYE }));
}

function sendMessageBusy(peer_id) {
  sendMessage(peer_id, JSON.stringify({ type: MSG_BUSY }));
}

function sendMessageReject(peer_id) {
  sendMessage(peer_id, JSON.stringify({ type: MSG_REGECT }));
}

function onWebSocketMessage(message) {
  try {
    const objMessage = JSON.parse(message);
    const { from, msg, res, data } = objMessage;
    if (res) {
      if (parseInt(res) === 0) {
        if (data) {
          const { cmd } = data;
          if (cmd) {
            const intCmd = parseInt(cmd);
            switch (intCmd) {
              case 1:
                signInCallback(data);
                break;
              default:
                break;
            }
          }
        }
      } else {
        console.error("The server responded with error %o %o:", res, data ? data : '');
      }
    } else if (msg) {
      processSignalingMessage(from, msg);
    } else {
      console.error("Invalid peer server response %o :", data);
    }
  } catch (e) {
    console.error("error: %o", e);
  }
}

function processSignalingMessage(from, message) {
  if (message.length <= 0) {
    return;
  }
  var msg = JSON.parse(message);
  if (msg.type === MSG_OFFER) {
    handleOffer(from, msg);
  } else if (msg.type === MSG_ANSWER) {
    handleAnswer(msg);
  } else if (msg.type === MSG_CANDIDATE) {
    handleCandidate(msg);
  } else if (msg.type === MSG_BYE) {
    onRemoteHangup();
  } else if (msg.type === MSG_BUSY) {
    //TODO
  } else if (msg.type === MSG_REGECT) {
    //TODO
  }
}