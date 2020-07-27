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
    const makeAnt = (x, y) => {
      let antDot = new createjs.Shape()
      antDot.graphics.beginFill("Black").drawCircle(0, 0, 2)
      antDot.x = x
      antDot.y = y
      this.stage.addChild(antDot)
      this.stage.update()
      console.log("MAKE ANT: " + x + "," + y)
    }
    const handleTick = (event) => {

      ticks = createjs.Ticker.getTicks()
      for (let x = 0; x <= grid.gridSize; x++) {
        for (let y = 0; y <= grid.gridSize; y++) {
          console.log(grid.coordArr[x][y])
        }
      }

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