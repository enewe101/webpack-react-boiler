import React from 'react';
import ReactDOM from 'react-dom';
import { Form, SchemaForm } from './Form'
import fetchit from '../services/fetchit'

class Tweet extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Tweet">
        I am a tweet <br/>
        text: {this.props.text} <br/>
        target: {this.props.target} <br/>
        stance: {this.props.stance}
      </div>
    )
  }
}

export default Tweet;


