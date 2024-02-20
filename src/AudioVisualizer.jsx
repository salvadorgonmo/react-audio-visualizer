import React, { Component } from 'react';

class AudioVisualiser extends Component {
  constructor(props) {
    super(props);
    this.canvas = React.createRef();
  }

  componentDidUpdate() {
    if (this.props.strokeStyle === 'osc') {
      this.draw();
      return;
    }


  }

  draw() {
    const { audioData } = this.props;
    const canvas = this.canvas.current;
    const height = canvas.height;
    const width = canvas.width;
    const context = canvas.getContext('2d');
    let x = 0;
    const sliceWidth = (width * 1.0) / audioData.length;

    context.lineWidth = 5;
// Create linear gradient
const gradient = context.createLinearGradient(0, 0, width, 0);
gradient.addColorStop(0, '#0E54CF');
gradient.addColorStop(1, '#3EC1A5');

// Apply gradient as stroke style
context.strokeStyle = gradient;
    context.clearRect(0, 0, width, height);

    context.beginPath();
    context.moveTo(0, height / 2);
    for (const item of audioData) {
      const y = (item / 255.0) * height;
      context.lineTo(x, y);
      x += sliceWidth;
    }
    context.lineTo(x, height / 2);
    context.stroke();
    
  }

  drawBar = () => {
    const { audioData, analyser } = this.props;
    const bufferLength = analyser.frequencyBinCount;
    const canvas = this.canvas.current;
    const height = canvas.height;
    const width = canvas.width;
    const context = canvas.getContext('2d');
    let x = 0;
    const sliceWidth = (width * 1.0) / audioData.length;
    canvas.clearRect(0, 0, width, height);
    canvas.fillStyle = "rgb(0 0 0)";
    canvas.fillRect(0, 0, width, height);
    const barWidth = (width / bufferLength) * 2.5;
let barHeight;
for (let i = 0; i < bufferLength; i++) {
  barHeight = audioData[i] / 2;

  canvas.fillStyle = `rgb(${barHeight + 100} 50 50)`;
  canvas.fillRect(x, height - barHeight / 2, barWidth, barHeight);

  x += barWidth + 1;
}
  }

  render() {
    return <canvas width="300" height="300" ref={this.canvas} />;
  }
}

export default AudioVisualiser;