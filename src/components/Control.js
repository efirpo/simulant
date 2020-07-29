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
      antDot.x = grid.population[i].coords[0]
      antDot.y = grid.population[i].coords[1]
      grid.population[i].Shape = antDot
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

      ticks = createjs.Ticker.getTicks()
      if (ticks === 30) {
        console.table(this.stage.children[50])
        console.table(this.stage.children[51])
      }
      for (let i = 0; i < grid.population.length; i++) {
        let currentCoords = [grid.population[i].Shape.x, grid.population[i].Shape.y]
        if (grid.calcDistance(currentCoords, grid.nestCoords) < 10) {
          grid.population[i].carryingFood = false
          this.stage.removeChildAt(i)
          grid.population[i].Shape.graphics.clear().beginFill("Black").drawCircle(0, 0, 2)
          this.stage.addChildAt(grid.population[i].Shape, i)

        }
        if (!grid.population[i].carryingFood) {
          let newCoords = grid.moveAnt(i)
          grid.population[i].Shape.x = newCoords[0]
          grid.population[i].Shape.y = newCoords[1]
          for (let j = 0; j < grid.foodCoords.length; j++) {
            // console.table(grid.foodCoords[j])
            if (grid.calcDistance(newCoords, grid.foodCoords[j].coords) < (grid.foodCoords[j].scale + 4)) {
              grid.population[i].carryingFood = true
              this.stage.removeChildAt(i)
              grid.population[i].Shape.graphics.clear().beginFill("Green").drawCircle(0, 0, 2)
              this.stage.addChildAt(grid.population[i].Shape, i)
              if (grid.foodCoords[j].scale <= 5) {
                this.stage.removeChildAt(j + (grid.maxAnts - 1))
                grid.foodCoords[j].Shape.x = Math.ceil(Math.random() * (grid.gridSize - 5))
                grid.foodCoords[j].Shape.y = Math.ceil(Math.random() * (grid.gridSize - 5))
                grid.foodCoords[j].scale += Math.ceil((Math.random() * 10) + 7)
                grid.foodCoords[j].coords = [grid.foodCoords[j].Shape.x, grid.foodCoords[j].Shape.y]
                grid.foodCoords[j].Shape.graphics.clear().beginFill("Red").drawCircle(0, 0, grid.foodCoords[j].scale)
                this.stage.addChildAt(grid.foodCoords[j].Shape, j + (grid.maxAnts - 1))
              } else {
                grid.foodCoords[j].scale -= 1
              }
              grid.foodCoords[j].Shape.graphics.clear().beginFill("Red").drawCircle(0, 0, grid.foodCoords[j].scale)
            }
          }

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