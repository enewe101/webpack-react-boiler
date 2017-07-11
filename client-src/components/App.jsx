import _ from 'underscore';
import path from 'path';
import React from 'react';
import ReactDOM from 'react-dom';

// Import sub-components
class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      getResponse: '',
      postResponse: '',
      postText: ''
    }
    this.get = this.get.bind(this);
    this.formPost = this.formPost.bind(this);
    this.jsonPost = this.jsonPost.bind(this);
    this.handlePostTextChange = this.handlePostTextChange.bind(this);
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

  formPost() {
    const form = new FormData()
    const body = JSON.stringify({name: this.state.postText})
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

  handlePostTextChange(e) {
    this.setState({postText:e.target.value});
  }

  render() {
      return (
        <div>
          <button onClick={this.get}>Get</button>
          <div>{this.state.getResponse}</div>
          <button onClick={this.formPost}>Post?</button>
          <input type="text" value={this.state.postText}
            onChange={this.handlePostTextChange} />
          <div>{this.state.postResponse} </div>
        </div>
      )
  }
}

export default App;
