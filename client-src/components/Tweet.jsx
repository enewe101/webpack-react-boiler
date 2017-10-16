import React from 'react';
import ReactDOM from 'react-dom';
import { Form, SchemaForm } from './Form'
import fetchit from '../services/fetchit'

const labelClasses = {
  'Atheism': 'Atheism',
  'Climate Change is a Real Concern': 'Concern for climate',
  'Feminist Movement': 'Feminism',
  'Hillary Clinton': 'Hillary Clinton', 
  'Legalization of Abortion': "Women's right to choose",
  'Donald Trump': 'Donald Trump'
}

class Tweet extends React.Component {

  constructor(props) {
    super(props);
  }
  
  render() {
    var stance_style = {
      color: (() => {
        switch (this.props.stance) {
          case "-1" : return "red";
          case "1" : return "green";
          case "0" : return "#797D7F";
        }
      })()
    };

    var prediction_style = {
      background: (() => {
        switch (this.props.stance) {
          case "-1": return "#ffd1d1";
          case "1": return "#d6fcd4";
          case "0": return "#e5e5e5";
        }
      })()
    };
    return (
      <div className="Tweet">
        <div className="avatar"></div>
        <div className="text">
          {this.props.text}
        </div>
        <div className="prediction" style={prediction_style}>
          <div className="stance" style={stance_style} >
          {(() => {
                    switch (this.props.stance) {
                      case "-1": return "Against ";
                      case "1" : return "For ";
                      case "0": return "No opinion for ";
                    }
                  })()}
          </div>
          {this.props.target}
        </div>
        <div className="clear"></div>
      </div>
    )
  }
}

export default Tweet;


