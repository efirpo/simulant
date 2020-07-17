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
    var square = new createjs.Shape();
    square.graphics.beginFill("red").drawRect(5, 5, 5, 5)
    square.x = 50;
    square.y = 20;
    this.stage.addChild(square);
    let ticks;
    const handleTick = (event) => {
      circle.x += 3
      square.x += 2
      ticks = createjs.Ticker.getTicks()
      if (circle.x > this.stage.canvas.width) {
        circle.x = 0

      }


      if (ticks % 5 == 0) {
        var dot = new createjs.Shape();
        dot.graphics.beginFill("green").drawCircle(0, 0, 4)
        dot.x = circle.x
        dot.y = circle.y
        this.stage.addChild(dot)
      }
      this.stage.update();
    }
    const handleCircleClick = () => {

    }
    circle.on("click", handleCircleClick)

    createjs.Ticker.setFPS(30)
    createjs.Ticker.addEventListener("tick", handleTick)


  }

  render() {

    return (
      <canvas ref="canvas" width="500" height="600"></canvas>
    )
  }
}

export default Control