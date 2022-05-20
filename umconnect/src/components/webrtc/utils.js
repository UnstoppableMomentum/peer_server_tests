export function addAudioBandwidth(sdp, minBitrate, maxBitrate) {
  var sdpLines = sdp.split('\r\n');

  var isacIndex = findLine(sdpLines, 'a=rtpmap', 'ISAC/16000');
  if (isacIndex !== null) {
    var isacPayload = getCodecPayloadType(sdpLines[isacIndex]);
    var appendrtxNext = '\r\na=fmtp:' + isacPayload
      + ' x-google-min-bitrate=' + minBitrate + ';'
      + ' x-google-max-bitrate=' + maxBitrate;
    sdpLines[isacIndex] = sdpLines[isacIndex].concat(appendrtxNext);
    sdp = sdpLines.join('\r\n');
  }

  return sdp;
}

export function addVideoBandwidth(sdp, minBitrate, maxBitrate) {
  var sdpLines = sdp.split('\r\n');

  var vp8Index = findLine(sdpLines, 'a=rtpmap', 'VP8/90000');
  if (vp8Index !== null) {
    var vp8Payload = getCodecPayloadType(sdpLines[vp8Index]);
    var appendrtxNext = '\r\na=fmtp:' + vp8Payload
      + ' x-google-min-bitrate=' + minBitrate + ';'
      + ' x-google-max-bitrate=' + maxBitrate;
    sdpLines[vp8Index] = sdpLines[vp8Index].concat(appendrtxNext);
    sdp = sdpLines.join('\r\n');
  }

  return sdp;
}

function findLineInRange(sdpLines, startLine, endLine, prefix, substr) {
  var realEndLine = endLine !== -1 ? endLine : sdpLines.length;
  for (var i = startLine; i < realEndLine; ++i) {
    if (sdpLines[i].indexOf(prefix) === 0) {
      if (!substr ||
        sdpLines[i].toLowerCase().indexOf(substr.toLowerCase()) !== -1) {
        return i;
      }
    }
  }
  return null;
}

function findLine(sdpLines, prefix, substr) {
  return findLineInRange(sdpLines, 0, -1, prefix, substr);
}

function getCodecPayloadType(sdpLine) {
  var pattern = new RegExp('a=rtpmap:(\\d+) \\w+\\/\\d+');
  var result = sdpLine.match(pattern);
  return (result && result.length === 2) ? result[1] : null;
}