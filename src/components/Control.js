import * as createjs from 'createjs-easeljs';
import React from 'react';
import ReactDOM from 'react-dom';
import Ant from './Ant';
import Cell from './Cell';
import * as grid from './Grid';

class Control extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    grid.createGrid()
    for (let i = 0; i <= grid.maxAnts; i++) {
      grid.spawnAnt()
    }

    // console.log(this.coordArr)
  }

  componentDidMount() {


    let canvas = ReactDOM.findDOMNode(this.refs.canvas);
    this.stage = new createjs.Stage(canvas);
    let ticks;

    colorForCell = (cell) => {
      if (cell.ant) {
        return () => {
          let antDot = new createjs.Shape()
          antDot.graphics.beginFill("Black").drawCircle(0, 0, 2)
          antDot.x = cell.x * 2
          antDot.y = cell.y * 2
          this.stage.addChild(antDot)
          this.stage.update()
        }
      } else if (cell.food > 0) {
        return () => {
          let foodDot = new createjs.Shape()
          foodDot.graphics.beginFill("Red").drawCircle(0, 0, 5)
          foodDot.x = cell.x * 2
          foodDot.y = cell.x * 2
          this.stage.addChild(foodDot)
          this.stage.update()
        }
      }
      else {
        if (cell.signal > 0) {
          return () => {
            let signalDot = new createjs.Shape()
            signalDot.graphics.beginFill("Blue").drawCircle(0, 0, 2)
            signalDot.x = cell.x * 2
            signalDot.y = cell.y * 2
            signalDot.alpha = cell.signal > 1 ? 1 : cell.signal
            this.stage.update()
          }
        }
      }
    }



    const handleTick = (event) => {

      ticks = createjs.Ticker.getTicks()



      // if (ticks % 5 == 0) {
      //   if (this.antsOut < this.maxAnts) {
      //     let newAnt = this.spawnAnt()
      //     let antDot = new createjs.Shape();
      //     antDot.graphics.beginFill("Black").drawCircle(0, 0, 2)
      //     antDot.x = newAnt[0]
      //     antDot.y = newAnt[1]
      //     this.stage.addChild(antDot)
      //   } else if (ticks == 5000) {
      //     console.table(this.coordArr)
      //   }
      // }

    }
    // const handleCircleClick = () => {

    // }
    // circle.on("click", handleCircleClick)

    createjs.Ticker.setFPS(30)
    createjs.Ticker.addEventListener("tick", handleTick)


  }

  render() {

    return (
      <canvas ref="canvas" width="400" height="400"></canvas>
    )
  }
}

export default Control