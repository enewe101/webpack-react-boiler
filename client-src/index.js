require('es6-promise').polyfill();
import ReactDOM from 'react-dom';
import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import App from './components/App.jsx';


import _ from 'underscore';
import path from 'path';

// Import sub-components
class TestComponent extends React.Component {
  render() {
      return <div>yo</div>;
  }
}

export default App;


const renderApp = () => {
  ReactDOM.render(
	<BrowserRouter>
	  <div>
	    <Route exact path='/app/logged-in' component={App} />
	    <Route exact path='/app/login' component={TestComponent} />
      </div>
    </BrowserRouter>,
	document.getElementById('root'));
};

renderApp();

if (module.hot) {
  module.hot.accept();
}
