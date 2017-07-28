import _ from 'underscore';
import path from 'path';
import React from 'react';
import ReactDOM from 'react-dom';
import facebookUserStatusService from '../services/facebookUserStatusService';

// Import sub-components
class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      todos: [['thing one', true], ['thing two', false]],
      getResponse: '',
      postResponse: '',
      newTodoText: '',
      fbUser: {'authenticated':false}
    }
    this.get = this.get.bind(this);
    this.addItem = this.addItem.bind(this);
    this.jsonPost = this.jsonPost.bind(this);
    this.handleNewTodoTextChange = this.handleNewTodoTextChange.bind(this);
    this.handleUserStatusChange = this.handleUserStatusChange.bind(this);
    this.fbLogin = this.fbLogin.bind(this);
    this.fbLogout = this.fbLogout.bind(this);
    this.fbRevoke = this.fbRevoke.bind(this);
    this.fbCheckStatus = this.fbCheckStatus.bind(this);
    facebookUserStatusService.getUserStatus(this.handleUserStatusChange);
  }

  handleUserStatusChange(response) {
    console.log('receiving user status change:');
    console.log(response);
    this.setState({fbUser:response});
  }

  get() {
    fetch('/data')
      .then(response => response.text())
      .then((body) => this.setState({getResponse:body}));
  }

  jsonPost() {
    const body = JSON.stringify({
      name: 'Hubot',
      login: 'hubot',
    });
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
    console.log(body);
    fetch('/data', {
      method: 'post',
      headers: headers,
      body: '{"yo":"guy"}'
    }).then(function(response) {
      return response.text()
    }).then(function(body) {
      document.body.innerHTML = body;
    })
  }

  addItem() {
    const form = new FormData()
    const body = JSON.stringify({name: this.state.newTodoText})
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
    fetch('/data', {
      method: 'post',
      headers: headers,
      body: body
    })
    .then((response) => response.text())
    .then((responseText) => {
      this.setState({postResponse:responseText})
    })
  }

  handleNewTodoTextChange(e) {
    this.setState({newTodoText:e.target.value});
  }

  fbLogout() {
    facebookUserStatusService.logout(this.handleUserStatusChange);
  }


  fbLogin() {
    facebookUserStatusService.login(this.handleUserStatusChange);
  }

  fbCheckStatus() {
    facebookUserStatusService._refreshUserStatus();
    facebookUserStatusService.getUserStatus(
        this.handleUserStatusChange, true, false);
  }

  fbRevoke() {
    facebookUserStatusService.revoke(this.handleUserStatusChange);
  }

  twitterReauth() {
    window.location.href = "/auth/twitter-reauth";
  }

  render() {


    let fbLoginStatus;
    if(this.state.fbUser.authenticated) {
      fbLoginStatus = 'Logged in: ' + this.state.fbUser.userId;
    } else {
      fbLoginStatus = 'Not logged in';
    }

    return (
      <div>

        <h1>Twitter Auth</h1>
        <ul>
          <li>
            <a href="/auth/twitter-auth">
              <img src="/static/sign-in-with-twitter-gray.png" />
            </a>
          </li>
          <li>
            <button onClick={this.twitterReauth}>
              associate another twitter account
            </button>
          </li>
        </ul>

        <h1>Facebook Auth</h1>
        <ul>
          <li>
            {fbLoginStatus}
          </li>
          <li>
            <button onClick={this.fbLogin}>login fb</button>
          </li>
          <li>
            <button onClick={this.fbLogout}>logout fb</button>
          </li>
          <li>
            <button onClick={this.fbRevoke}>revoke fb</button>
          </li>
          <li>
            <button onClick={this.fbCheckStatus}>check status</button>
          </li>
        </ul>

      </div>
    )
  }
}

export default App;
