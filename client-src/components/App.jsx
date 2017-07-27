import _ from 'underscore';
import path from 'path';
import React from 'react';
import ReactDOM from 'react-dom';

// Import sub-components
class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      todos: [['thing one', true], ['thing two', false]],
      getResponse: '',
      postResponse: '',
      newTodoText: ''
    }
    this.get = this.get.bind(this);
    this.addItem = this.addItem.bind(this);
    this.jsonPost = this.jsonPost.bind(this);
    this.handleNewTodoTextChange = this.handleNewTodoTextChange.bind(this);
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

  fbLogin() {
		FB.login();
  }

  render() {

      const listItems = this.state.todos.map(item => {
        <li><input type="checkbox" checked="true" />{item[0]}</li>
      });

      return (
        <div>
          <div>yo what</div>
          <div>{listItems}</div>

          <input type="text" value={this.state.newTodoText}
            onChange={this.handleNewTodoTextChange} />
          <button onClick={this.addItem}>Add</button>

          <a href="/auth/twitter-request">
            <img src="/static/sign-in-with-twitter-gray.png" />
          </a>

					<button onClick={this.fbLogin}>login fb</button>
        </div>
      )
  }
}

export default App;
