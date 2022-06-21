import { Component } from 'react';

import { DEFAULT_URL_PEER_SERVER } from '../../config/constants'

type Props = {
    server: String
};
  
export class Connectivity extends Component{
  
    constructor(props: Props) {
      super(props);
    }
    
    server() {
      return this.props.server;
    }
}

export function saveConnectivity(connectivity: Connectivity) {
  try {
    const s = JSON.stringify(connectivity.props);
    localStorage.setItem('connectivity', s);
  } catch (e) {
    console.error("Putting %o in localStorage: %o", 'connectivity settings', e);
  }
}

export function loadConnectivity() {
    let v = null;
    try {
        const s = localStorage.getItem('connectivity');
        if (s && s !== 'undefined') {
            v = new Connectivity(JSON.parse(s));
        }
    } catch (e) {
        console.warning("Getting %o from localStorage: %o", 'connectivity', e);
    }

    if (v === null) {
        console.log("%o is not restored", 'server');
        v = new Connectivity({
          server: DEFAULT_URL_PEER_SERVER
        });
    }
    return v;
  }
  
  export function getUrlPeerServer() {
    return loadConnectivity().server();
}