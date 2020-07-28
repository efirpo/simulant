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
    grid.createPopulation()

  }

  componentDidMount() {

    let canvas = ReactDOM.findDOMNode(this.refs.canvas);
    this.stage = new createjs.Stage(canvas);
    let ticks;





    const handleTick = () => {
      this.stage.removeAllChildren()
      ticks = createjs.Ticker.getTicks()
      console.table(grid.population[0])
      for (let i = 0; i < grid.population.length; i++) {
        grid.population[i].coords = grid.moveAnt(i)
      }
      for (let i = 0; i < grid.population.length; i++) {
        let antDot = new createjs.Shape()
        antDot.graphics.beginFill("Black").drawCircle(0, 0, 2)
        // console.log(grid.population[i].coords)
        antDot.x = grid.population[i].coords[0]
        antDot.y = grid.population[i].coords[1]
        grid.population[i].Shape = antDot
        console.table(antDot)
        this.stage.addChild(antDot)

      }

      this.stage.update();




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