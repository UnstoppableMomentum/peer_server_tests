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

