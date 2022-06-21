import React, { Component } from 'react';


type Props = {
    name: String
};
  
export class User extends Component{
  
    constructor(props: Props) {
      super(props);
    }
    
    name() {
      return this.props.name;
    }
}

export function saveUser(user: User) {
  try {
    const s = JSON.stringify(user.props);
    localStorage.setItem('user', s);
  } catch (e) {
    console.error("Putting %o in localStorage: %o", 'name', e);
  }
}

export function loadUser() {
    let v = null;
    try {
        const s = localStorage.getItem('user');
        if (s && s !== 'undefined') {
            v = new User(JSON.parse(s));
        }
    } catch (e) {
        console.warning("Getting %o from localStorage: %o", 'user', e);
    }

    if (v === null) {
        console.log("%o is not restored", 'name');
        v = new User({
          name: ''
        });
    }
    return v;
  }
  