const config = {
  // URL_SERVER_HTTPS : "https://127.0.0.1:8080",
  // URL_SERVER_WSS : "wss://127.0.0.1:8080"
  URL_SERVER_HTTPS : "https://192.168.0.106:8080",
  URL_SERVER_WSS : "wss://192.168.0.106:8080"
};

const ICE_SERVERS = [
  {
    urls: [
      "stun:127.0.0.1:3478",
      "stun:stun.l.google.com:19302",
      "stun:stun1.l.google.com:19302",
      "stun:stun2.l.google.com:19302",
      "stun:stun3.l.google.com:19302",
    ]
  },
  // TURN: https://tools.ietf.org/html/rfc7065
  // {
  //   urls: [
  //     "turn:myturn:3478?transport=udp",
  //     "turn:myturn:3478?transport=tcp",
  //   ],
  //   credential: "webrtc",
  //   username: "webrtc",
  // },
  // {
  //   urls: [
  //     "turn:myturn2:3478?transport=udp",
  //     "turn:myturn2:3478?transport=tcp",
  //   ],
  //   credential: "webrtc",
  //   username: "webrtc",
  // },
];


export const pcConfig = {
  "iceServers": ICE_SERVERS,
};

export var sdpConstraints = {
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

export const bitrateConstraints = {
  minBitrate: 800,
  maxBitrate: 30000,
}
