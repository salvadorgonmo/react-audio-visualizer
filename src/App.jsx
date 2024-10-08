
import './App.css'
import React, { Component } from 'react';
import AudioAnalyser from './AudioAnalyzer';
import AudioVisualiser from './AudioVisualizer';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      audio: null,
      strokeStyle: 'osc'
    };
    this.toggleMicrophone = this.toggleMicrophone.bind(this);
  }

  async getMicrophone() {
    const audio = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false
    });
    this.setState({ audio });
  }

  stopMicrophone() {
    this.state.audio.getTracks().forEach(track => track.stop());
    this.setState({ audio: null });
  }

  toggleMicrophone() {
    if (this.state.audio) {
      this.stopMicrophone();
    } else {
      this.getMicrophone();
    }
  }

  toggleVisualizer = () => {
    if (this.state.strokeStyle === 'osc') this.setState({ strokeStyle: 'bar'})
    if (this.state.strokeStyle === 'bar') this.setState({ strokeStyle: 'osc'})
  }

  render() {
    return (
      <div className="App">
        <div className="controls">
          <h1>{this.state.strokeStyle === 'osc' ? 'Waveform/Oscilloscope Demo' : 'Bar Graph Demo'}</h1>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
          {/* <button onClick={this.toggleVisualizer} style={{ width: 'fit-content', backgroundColor: 'blue', marginBottom: '30px'}} disabled={this.state.audio}>{this.state.strokeStyle === 'osc' ? 'Use Bar Graph' : 'Use Waveform/Oscilloscope Graph'}</button>
          <button style={{ width: 'fit-content'}}  onClick={this.toggleMicrophone}>
            {this.state.audio ? 'Stop microphone' : 'Get microphone input'}
          </button> */}
          </div>
          {/* Remove this when we are ready to use it with mic*/}
          <AudioVisualiser />

        </div>
        {this.state.audio ? <AudioAnalyser audio={this.state.audio} strokeStyle={this.state.strokeStyle} /> : ''}
      </div>
    );
  }
}

export default App;
