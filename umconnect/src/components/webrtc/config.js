const config = {
  URL_SERVER_HTTPS : "https://127.0.0.1:8080",
  URL_SERVER_WSS : "wss://127.0.0.1:8080"

};

var pcConfig = {
  "iceServers": [
      {
          url: "stun:127.0.0.1:3478"
      }
  ]
};

var sdpConstraints = {
  optional: [{
      DtlsSrtpKeyAgreement: true
  }, {
      RtpDataChannels: true
  }]
};

export const mediaConstraints = {
  audio: true,
  video: {
      height: {
          ideal: 480,
          max: 480,
          min: 480
      },
      width: {
          ideal: 640,
          max: 640,
          min: 640
      }
  }
};