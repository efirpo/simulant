import * as createjs from 'createjs-easeljs';
import React from 'react';
import ReactDOM from 'react-dom';


class Control extends React.Component {
  constructor() {
    super();
  }
  handleTick(event) {
    this.stage.circle.x += 3
    if (this.stage.circle.x > this.stage.canvas.width) {
      this.stage.circle.x = 0
    }
  }

  componentDidMount() {

    var canvas = ReactDOM.findDOMNode(this.refs.canvas);
    this.stage = new createjs.Stage(canvas);
    var circle = new createjs.Shape();
    circle.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 10);
    circle.x = 100;
    circle.y = 100;
    this.stage.addChild(circle);
    createjs.Ticker.setFPS(30)
    createjs.Ticker.addEventListener("tick", this.handleTick)

    this.stage.update()
  }

  render() {

    return (
      <canvas ref="canvas" width="500" height="600"></canvas>
    )
  }
}

export default Control