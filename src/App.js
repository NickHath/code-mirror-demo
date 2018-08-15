// libraries
import React, { Component } from 'react';
import ExecuteCode from './components/ExecuteCode';
import CodeMirror from 'react-codemirror';
import './App.css';

/////////////////
/* CODE MIRROR */
// codemirror 3rd party styling
import 'codemirror/lib/codemirror.css';
// codemirror theme styling
require('codemirror/theme/material.css');
// language options
require('codemirror/mode/javascript/javascript');
// custom styling for codemirror
require('./codemirror_styles.css');



class App extends Component {
  constructor() {
    super();
    this.state = {
      // value here is default text in editor
      code: `//Hey there!`,
      currentlySelected: ``,
      currToken: ``,
      // options for the editor's mode and style
      options: {
        mode: 'javascript',
        theme: 'material',
        tabSize: 2,
        lineNumbers: true
      }
    };
  }

  // keeps track of code on state
  updateCode = newCode => {
    this.setState({ code: newCode });
  }

  // runs every time cursor interacts with the editor
  onCursorMove = cm => {
    const cursorPosition = cm.doc.getCursor();
    const { line, ch } = cursorPosition;

    // token at current cursor location
    // how to modify for selections?
    const currToken = cm.getTokenAt({ line, ch: ch + 1 });
    const currentlySelected = cm.doc.getSelection();
    this.setState({ currentlySelected, currToken });
  }

  render() {
    const { code, currentlySelected, currToken, options } = this.state;

    // render all the token props and values
    const tokenDetails = [];
    for (let key in currToken) {
      // dont display the state info
      if (key !== 'state') {
        tokenDetails.push(<p>{ key }:  <span>{ JSON.stringify(currToken[key]) }</span></p>)
      }
    }

    return (
      <div className='app'>
        <CodeMirror 
          value={ code }
          onChange={ this.updateCode }
          onCursorActivity={ this.onCursorMove }
          options={ options }
        />
        <ExecuteCode code={ code } />
        <p>Editing mode: <span>{ options.mode }</span></p>
        <p>Full input: <span>{ code }</span></p>
        <br />
        <p>Currently Selected:<br/> <span>{ currentlySelected }</span></p>
        { tokenDetails }
      </div>
    );
  }
}

export default App;
