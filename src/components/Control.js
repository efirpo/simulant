import * as createjs from 'createjs-easeljs';
import React from 'react';
import ReactDOM from 'react-dom';


class Control extends React.Component {
  constructor() {
    super();
  }


  componentDidMount() {

    var canvas = ReactDOM.findDOMNode(this.refs.canvas);
    this.stage = new createjs.Stage(canvas);
    var circle = new createjs.Shape();
    circle.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 10);
    circle.x = 100;
    circle.y = 100;
    this.stage.addChild(circle);
    const handleTick = (event) => {
      circle.x += 3
      if (circle.x > this.stage.canvas.width) {
        circle.x = 0
      }
      this.stage.update();
    }
    createjs.Ticker.setFPS(30)
    createjs.Ticker.addEventListener("tick", handleTick)

    this.stage.update()
  }

  render() {

    return (
      <canvas ref="canvas" width="500" height="600"></canvas>
    )
  }
}

export default Control