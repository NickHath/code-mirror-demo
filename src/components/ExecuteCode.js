import React, { Component } from 'react';
import axios from 'axios';

class ExecuteCode extends Component {
  constructor() {
    super();
    this.state = {
      results: ``
    };
  }

  render() {
    return (
      <div className='execute-code'>
        <button onClick={ this.updateCode }>Run!</button>
        <p>Results: <span>{ this.state.results }</span></p>
      </div>
    );
  }
}

export default ExecuteCode;