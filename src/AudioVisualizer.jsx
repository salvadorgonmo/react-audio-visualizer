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

    if (this.props.strokeStyle === 'bar') {
      this.drawBar()
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

    context.lineWidth = 10;
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
    const { audioData } = this.props;
    const canvas = this.canvas.current;
    const height = canvas.height;
    const width = canvas.width;
    const context = canvas.getContext('2d');
    const numBars = audioData.length;
    const barWidth = width / numBars;
    
    // Create linear gradient
    const gradient = context.createLinearGradient(0, height, 0, 0);
    gradient.addColorStop(0, '#0E54CF');
    gradient.addColorStop(1, '#3EC1A5');
    
    // Clear canvas
    context.clearRect(0, 0, width, height);
    
    // Draw bars
    for (let i = 0; i < numBars; i++) {
      const barHeight = (audioData[i] / 255.0) * height;
      const x = i * barWidth;
      const y = height - barHeight; // Start from the bottom
      context.fillStyle = gradient;
      context.fillRect(x, y, barWidth, barHeight);
    }

  }

  render() {
    return <canvas style={{ filter: 'blur(5px)'}} width="300" height="300" ref={this.canvas} />;
  }
}

export default AudioVisualiser;