import React from 'react';
import ReactDOM from 'react-dom';
import clone from '../lib/clone';


export class Form extends React.Component {

  constructor(props) {
    super(props);
    this.getValue = this.getValue.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  unpackPath(path, key, val) {
    path = path.split('.').filter(x => x!=='');
    let state = {}
    let pointer = state;
    for(let i=0; i<path.length; i++) {
      pointer[path[i]] = {};
      pointer = pointer[path[i]];
    }
    if(key) {
      pointer[key] = val
    }
    return state;
  }

  setValueAtPath(obj, path, key, val) {
    path = path.split('.');
    let pointer = obj;
    for(let i=0; i<path.length; i++) {
      pointer = pointer[path[i]];
    }
    pointer[key] = val
  }

  getValueAtPath(obj, path) {
    path = path.split('.');
    let pointer = obj;
    for(let i=0; i<path.length; i++) {
      pointer = pointer[path[i]];
    }
    return pointer;
  }

  getValue(name) {
    return this.getValueAtPath(
     this.props.scope.state, this.props.path + '.' + name
    );
  }

  handleInputChange = (e) => {
    // Propogate the changed value in a form input to the parent's state
    // Since the values that are bound to this form could be deep within the
    // state object, a shallow merge won't work. We need to go in and set each 
    // value based on its path, using `setValueAtPath`.
    var fieldName = e.target.name;
    var fieldValue = e.target.value;
    this.props.scope.setState(prevState => {
      let newState = clone(prevState);
      this.setValueAtPath(
        newState, this.props.path, fieldName, fieldValue);
      return newState
    });

    // The parent can still provide an onChange callback on the whole form, so
    // let's call that, and provide the input's change event. 
    if(this.props.onChange) {
      this.props.onChange(e)
    }
  }

  render() {

    // We're going to go through the children in the form, and for each child
    // that has a "name" prop, we'll create a data binding:
    //  - make it's value equal to the the part of the caller's state that
    //    matches `path[name]`, where path is the prop on the form, and name is 
    //    the prop on the element.
    //  - set a callback that will update the caller's state (again, based on 
    //    the path and name props).
    //
    //  If the element doesn't have a "name" prop, then we'll assume it
    //  shouldn't get any binding to the callers state.
    let children = React.Children.map(this.props.children,
      child  => {
        if(child.props.name) {
          // Bind the value and a callback to update the value on change.
          return React.cloneElement(child, {
            value: this.getValue(child.props.name),
            onChange: this.handleInputChange
          });
        }
        // Don't bind anything, cause the input had "name"
        return child;
      }
    );

    return (
      <form>
        {React.Children.map(
            this.props.children, child => 
            React.cloneElement(child, {
              value: this.getValue(child.props.name),
              onChange: this.handleInputChange
            })
        )}
      </form>
    );
  }
}

export class SchemaForm extends Form {

  render() {
    let children = Object.keys(this.props.schema).map((field, i) => {
      return (
      <div key={field + '-' + i}>
        <label htmlFor={field + '-' + i}>{field}
          <input 
            id={field + '-' + i}
            type="text" 
            name={field} value={this.getValue(field)} 
            onChange={this.handleInputChange}
          />
        </label>
      </div>
      );
    });

    return (
      <form>
        {children}
        {this.props.children}
      </form>
    );
  }

}


