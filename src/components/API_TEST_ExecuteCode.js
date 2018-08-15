import React, { Component } from 'react';
import axios from 'axios';

class ExecuteCode extends Component {
  constructor() {
    super();
    this.state = {
      results: ``
    };
  }

  updateCode = async () => {
    const apiKey = `guest`
        , language = `javascript`
        , baseUrl = `http://api.paiza.io:80/runners`;

    const code = encodeURIComponent(this.props.code);
    const id = await axios.post(`${baseUrl}/create?source_code=${code}&language=${language}&api_key=${apiKey}`)
                          .then(res => res.data.id)
                          .catch(err => console.error(err));
    axios.get(`${baseUrl}/get_details?id=${id}&api_key=${apiKey}`)
        .then(res => {
          this.setState({ results: res.data.stdout }) 
          })
        .catch(err => console.error(err));      
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