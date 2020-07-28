import * as createjs from 'createjs-easeljs';
import React from 'react';
import ReactDOM from 'react-dom';
import * as grid from './Grid';

class Control extends React.Component {
  constructor(props) {
    super(props);
  }


  componentWillMount() {
    grid.createPopulation()
    grid.createFood()
  }

  componentDidMount() {

    let canvas = ReactDOM.findDOMNode(this.refs.canvas);
    this.stage = new createjs.Stage(canvas);
    let ticks;
    for (let i = 0; i < grid.population.length; i++) {
      let antDot = new createjs.Shape()
      antDot.graphics.beginFill("Black").drawCircle(0, 0, 2)
      // console.log(grid.population[i].coords)
      antDot.x = grid.population[i].coords[0]
      antDot.y = grid.population[i].coords[1]
      grid.population[i].Shape = antDot
      console.table(antDot)
      this.stage.addChild(grid.population[i].Shape)
    }
    for (let i = 0; i < grid.foodCoords.length; i++) {
      let foodDot = new createjs.Shape()
      foodDot.graphics.beginFill("Red").drawCircle(0, 0, grid.foodCoords[i].scale)
      foodDot.x = grid.foodCoords[i].coords[0]
      foodDot.y = grid.foodCoords[i].coords[1]
      grid.foodCoords[i].Shape = foodDot

      this.stage.addChild(grid.foodCoords[i].Shape)
    }




    const handleTick = () => {
      // this.stage.removeAllChildren()
      ticks = createjs.Ticker.getTicks()
      // console.table(grid.population[0])
      for (let i = 0; i < grid.population.length; i++) {
        if (!grid.population[i].carryingFood) {
          // console.log(grid.population[i].carryingFood)
          let newCoords = grid.moveAnt(i)
          grid.population[i].Shape.x = newCoords[0]
          grid.population[i].Shape.y = newCoords[1]
          this.stage.update();
        }
        else if (grid.population[i].carryingFood) {
          let newCoords = grid.moveHome(i)
          grid.population[i].Shape.x = newCoords[0]
          grid.population[i].Shape.y = newCoords[1]
          this.stage.update();
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

    createjs.Ticker.setFPS(20)
    createjs.Ticker.addEventListener("tick", handleTick)


  }

  render() {

    return (
      <canvas ref="canvas" width="400" height="400"></canvas>
    )
  }
}

export default Control