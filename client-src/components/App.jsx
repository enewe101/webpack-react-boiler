import React from 'react';
import ReactDOM from 'react-dom';
import facebookUserStatusService from '../services/facebookUserStatusService';
import documentService from '../services/api'
import { Form, SchemaForm } from './Form'
import documentSchema from '../../server/models/Document_'
import fetchit from '../services/fetchit'
class App extends React.Component {

  constructor(props) {
    super(props);

    let blankDocument = {};
    let schemaKeys = Object.keys(documentSchema);
    for(let i=0; i<schemaKeys.length; i++){
      blankDocument[schemaKeys[i]] = '';
    }

    this.state = {
      todos: [['thing one', true], ['thing two', false]],
      getResponse: '',
      postResponse: '',
      newTodoText: '',
      fbUser: {'authenticated':false},
      'deeper':{'document':blankDocument, 'test':'yo'},
      'documents': []
    }
    facebookUserStatusService.getUserStatus(this.handleUserStatusChange);
  }

  handleUserStatusChange = response => {
    console.log('receiving user status change:');
    console.log(response);
    this.setState({fbUser:response});
  }

  fbLogout = () => {
    facebookUserStatusService.logout(this.handleUserStatusChange);
  }


  fbLogin = () => {
    facebookUserStatusService.login(this.handleUserStatusChange);
  }

  fbCheckStatus = () => {
    facebookUserStatusService._refreshUserStatus();
    facebookUserStatusService.getUserStatus(
        this.handleUserStatusChange, true, false);
  }

  fbRevoke = () => {
    facebookUserStatusService.revoke(this.handleUserStatusChange);
  }

  instagramAuth = () => {
    window.location.href = "/auth/instagram/auth";
  }

  twitterReauth = () => {
    window.location.href = "/auth/twitter-reauth";
  }

  twitterVerifyCredentials = () => {
    fetchit('/auth/twitter/verify')
      .then(response => response.json())
      .then(json => console.log(json));
  }

  instagramLogout = () => {
		var img = document.createElement("img");
		img.src = "https://instagram.com/accounts/logout";
		img.style.visibility = 'hidden';
    document.body.appendChild(img);
	}

  getDocuments = () => {
    documentService.find({}).then(json => {
      console.log(json);
    });
  }

  postDoc = (e) => {
    e.preventDefault();
    console.log('sendingn document');
    console.log(this.state.document);
    documentService.create(this.state.document);
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
            <a href="/auth/twitter/auth">
              <img src="/static/sign-in-with-twitter-gray.png" />
            </a>
          </li>
          <li>
            <button onClick={this.twitterReauth}>
              associate another twitter account
            </button>
          </li>
          <li>
            <button onClick={this.twitterVerifyCredentials}>
              verify credentials
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

        <h1>Instagram Auth</h1>
        <ul>
          <li>
            <button onClick={this.instagramAuth}>
              login
            </button>
          </li>
          <li>
            <button onClick={this.instagramLogout}>
              logout
            </button>
          </li>
        </ul>

        <h1>Documents</h1>
        <ul>
          <li>
            <button onClick={this.getDocuments}>
              get documents
            </button>
            {this.state.documents}
          </li>
        </ul>
        <div>test: {this.state.deeper.test}</div>
        <div>{this.state.deeper.document.text}</div>

        <Form path="deeper.document" scope={this}>
          <input name="text" type="text" />
        </Form>

        <SchemaForm key="" path="deeper.document" scope={this} 
          schema={documentSchema}>
          <input type="submit" onClick={this.postDoc} />
        </SchemaForm>

      </div>
    )
  }
}

export default App;
