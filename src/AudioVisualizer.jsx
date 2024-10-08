import React, { Component } from 'react';
import * as dat from 'dat.gui'

class AudioVisualiser extends Component {
  constructor(props) {
    super(props);
    this.canvas = React.createRef();
    this.gui = new dat.GUI();
    this.increment = 0.01
    this._isMounted = false
  }

  componentDidMount = () => {
    if (this._isMounted) return;
    this.tempDraw()
    this._isMounted = true
  }

  componentDidUpdate() {
    // if (this.props.strokeStyle === 'osc') {
    //   this.draw();
    //   return;
    // }

    if (this.props.strokeStyle === 'bar') {
      this.drawBar()
    }

  }

  drawv0 = () => {
    const canvas = this.canvas.current;
    const { audioData } = this.props;
    const height = canvas.height;
    const width = canvas.width;
    const context = canvas.getContext('2d');
    // context.fillStyle = "rgb(0, 0, 0)"
    context.fillRect(0, 0, canvas.width, canvas.height)
    context.lineWidth = 2
    const gradient = context.createLinearGradient(0, 0, width, 0);

    // final colors:
    // gradient.addColorStop(0, '#0E3040');
    // gradient.addColorStop(1, '#111D30');
    
        gradient.addColorStop(0, '#0E54CF');
        gradient.addColorStop(1, '#3EC1A5');
    
        // Apply gradient as stroke style
        context.strokeStyle = gradient;
    // context.strokeStyle = "rgb(0, 255, 0)"
    context.beginPath()
    const sliceWidth = (canvas.width * 1.0) / audioData
    let x = 0
    for (let i = 0; i < audioData; i++) {
      const v = audioData[i] / 128.0
      const y = (v * canvas.height) / 2
      if (i === 0) {
        context.moveTo(x, y)
      } else {
        context.lineTo(x, y)
      }
      x += sliceWidth
    }
    context.lineTo(canvas.width, canvas.height / 2)
    context.stroke()
  }
  

  draw = () => {
    const { audioData } = this.props;
    const canvas = this.canvas.current;
    const height = canvas.height;
    const width = canvas.width;
    const context = canvas.getContext('2d');
    let x = 0;
    const sliceWidth = (width * 1.0) / audioData.length;

    console.log(audioData)

    const wave = {
      y: height / 2,
      length: 0.01,
      amplitude: 300,
      frequency: 0.01
    }

    context.lineWidth = 2;
    // Create linear gradient
    const gradient = context.createLinearGradient(0, 0, width, 0);

// final colors:
// gradient.addColorStop(0, '#0E3040');
// gradient.addColorStop(1, '#111D30');

    gradient.addColorStop(0, '#0E54CF');
    gradient.addColorStop(1, '#3EC1A5');

    // Apply gradient as stroke style
    context.strokeStyle = gradient;
    context.clearRect(0, 0, width, height);


    context.beginPath();
    context.moveTo(0, height / 2);
    let i = 0;
    let increment = this.increment
    for (const item of audioData) {
      i++;
      const y = (item / 255.0) * height;
      // context.lineTo(i, y + Math.sin(i * wave.length + increment) * sliceWidth);
      context.lineTo(i, y + Math.sin(i * wave.length + increment) * wave.amplitude * 1.0 / audioData.length);
    }

    context.stroke();
    increment += wave.frequency;

    // this.animate({
    //   context,
    //   width,
    //   height,
    //   audioData,
    //   wave
    // })


    // for (const item of audioData) {
    //   const y = (item / 255.0) * height;
    //   context.lineTo(x, y);
    //   x += sliceWidth;
    // }
    // context.lineTo(x, height / 2);
    // context.stroke();
    
  }
  
  // animate = ({
  //   context,
  //   width,
  //   audioData,
  //   height,
  //   wave
  // }) => {
  //   // requestAnimationFrame(this.animate)

  // }

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
      const barHeight = (audioData[i] / 255.0) * height
      const x = i * barWidth;
      const y = barHeight // Start from the bottom
      context.fillStyle = gradient;
      context.fillRect(x, y, barWidth, barHeight);
    }

  }

  tempDraw = () => {
    // const { audioData } = this.props;
    const canvas = this.canvas.current;
    const height = canvas.height;
    const width = canvas.width;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, width, height);
    let x = 0;
    // const sliceWidth = (width * 1.0) / audioData.length;

    // console.log(audioData)

    context.clearRect(0, 0, width, height);

    const wave = {
      y: 405,
      length: 0.01,
      amplitude: 300,
      frequency: 0.01
    }

    const strokeColor = {
      h: 220,
      s: 47,
      l: 13
    }

    const backgroundColor = {
      r: 0,
      g: 0,
      b: 0,
      a: 0.01
    }


    const waveFolder = this.gui.addFolder('wave')
    waveFolder.add(wave, 'y', 0, height)
    waveFolder.add(wave, 'length', -0.01, 1)
    waveFolder.add(wave, 'amplitude', -300, 300)
    waveFolder.add(wave, 'frequency', -0.01, 1)
    waveFolder.open()

    const strokeFolder = this.gui.addFolder('stroke')
    strokeFolder.add(strokeColor, 'h', 0, 255)
    strokeFolder.add(strokeColor, 's', 0, 100)
    strokeFolder.add(strokeColor, 'l', 0, 100)
    strokeFolder.open()

    const backgroundFolder = this.gui.addFolder('background')
    backgroundFolder.add(backgroundColor, 'r', 0, 255)
    backgroundFolder.add(backgroundColor, 'g', 0, 255)
    backgroundFolder.add(backgroundColor, 'b', 0, 255)
    backgroundFolder.add(backgroundColor, 'a', 0, 1)
    backgroundFolder.open()
  
    let increment = this.increment

    function animate() {
      requestAnimationFrame(animate)
      context.fillStyle = `rgba(${backgroundColor.r}, ${backgroundColor.g}, ${backgroundColor.b}, ${backgroundColor.a})`
      context.fillRect(0, 0, width, height);
      context.lineWidth = 3;
      // Create linear gradient
      const gradient = context.createLinearGradient(0, 0, width, 0);
  
  // final colors:
  gradient.addColorStop(0, '#0E3040');
  gradient.addColorStop(1, '#111D30');


  
      gradient.addColorStop(0, '#0E54CF');
      gradient.addColorStop(1, '#3EC1A5');
  
  // Apply gradient as stroke style
  const hueMidpoint = 210;
  const hueAmplitude = 10;
  const hueValue = hueMidpoint + hueAmplitude * Math.sin(increment);

  const saturationMidpoint = 50;
  const saturationAmplitude = 5;
  const saturationValue = saturationMidpoint + saturationAmplitude * Math.sin(increment);

  const lightnessMidpoint = 16;
  const lightnessAmplitude = 1;
  const lightnessValue = lightnessMidpoint + lightnessAmplitude * Math.sin(increment);
  const alphaValue = 0.1; // Adjust this value to control transparency

  console.log(`H: ${hueValue}, S: ${saturationValue}, L: ${lightnessValue}`);

  context.strokeStyle = `hsl(${hueValue}, ${saturationValue}%, ${lightnessValue}%, ${alphaValue})`;

  let highestPoint = height / 2;
let highestPointX = 0;
      context.beginPath();
      context.moveTo(0, height / 2);

      console.log({ width })

      for (let i = 0; i < width; i++) {

        // context.lineTo(i, y + Math.sin(i * wave.length + increment) * sliceWidth);
        context.lineTo(i, wave.y + Math.sin(i * wave.length + increment) * wave.amplitude * Math.sin(increment));
      }
  
      context.stroke();

      // Clear the area around the highest point
// const clearWidth = 10; // Width of the area to clear
// const clearHeight = 10; // Height of the area to clear
// context.clearRect(highestPointX - clearWidth / 2, highestPoint - clearHeight / 2, clearWidth, clearHeight);

      increment += wave.frequency;
    }

    animate()
 
  }

  render() {
    return <canvas style={{ border: '1px solid black' }} width="500" height="500" ref={this.canvas} />;
  }
}

export default AudioVisualiser;