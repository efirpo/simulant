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
      foodDot.graphics.beginFill("Brown").drawCircle(0, 0, grid.foodCoords[i].scale)
      foodDot.x = grid.foodCoords[i].coords[0]
      foodDot.y = grid.foodCoords[i].coords[1]
      grid.foodCoords[i].Shape = foodDot
      this.stage.addChild(grid.foodCoords[i].Shape)
    }

    // updates the children in the stage every frame
    const handleTick = () => {

      ticks = createjs.Ticker.getTicks()
      if (ticks === 100) {
        console.log("100 ticks:")
        console.table(grid.trails)

      }
      // loop through and update Ants
      for (let i = 0; i < grid.population.length; i++) {
        let currentCoords = [grid.population[i].Shape.x, grid.population[i].Shape.y]
        // loop through food array
        for (let j = 0; j < grid.foodCoords.length; j++) {
          // if not carrying food but close to food, pick up food, change food size
          if (!grid.population[i].carryingFood && grid.calcDistance(currentCoords, grid.foodCoords[j].coords) < (grid.foodCoords[j].scale + 2)) {
            grid.population[i].carryingFood = true
            this.stage.removeChildAt(i)
            grid.population[i].Shape.graphics.clear().beginFill("red").drawCircle(0, 0, 2)
            this.stage.addChildAt(grid.population[i].Shape, i)
            grid.foodCoords[j].Shape.alpha -= (1 / grid.foodCoords[j].scale)
            // if food is too light, remove food dot and replace at random spot 
            if (grid.foodCoords[j].Shape.alpha <= (1 / grid.foodCoords[j].scale)) {
              this.stage.removeChildAt(j + (grid.maxAnts))
              grid.foodCoords[j].Shape.x = Math.ceil(Math.random() * (grid.gridSize - 5))
              grid.foodCoords[j].Shape.y = Math.ceil(Math.random() * (grid.gridSize - 5))
              grid.foodCoords[j].scale = Math.ceil((Math.random() * 10) + 7)
              grid.foodCoords[j].coords = [grid.foodCoords[j].Shape.x, grid.foodCoords[j].Shape.y]
              grid.foodCoords[j].Shape.graphics.clear().beginFill("brown").drawCircle(0, 0, grid.foodCoords[j].scale)
              grid.foodCoords[j].Shape.alpha = 1
              this.stage.addChildAt(grid.foodCoords[j].Shape, j + (grid.maxAnts))
            }
          }
          // this.stage.update();
        }
        // if carrying food and close to home, drop food, check if following a trail already.
        if (grid.population[i].carryingFood && grid.calcDistance(currentCoords, grid.nestCoords) < 4) {
          grid.population[i].carryingFood = false
          this.stage.removeChildAt(i)
          grid.population[i].Shape.graphics.clear().beginFill("Black").drawCircle(0, 0, 2)
          this.stage.addChildAt(grid.population[i].Shape, i)
          if (!grid.population[i].followingTrail) {
            grid.population[i].followingTrail = true
          }
          if (grid.trails.length < 9) {
            grid.trails.push(grid.population[i].trail)
          }
          // this.stage.update();
        }
        // if following a trail, check if carryingFood and move appropriately
        if (grid.population[i].followingTrail) {
          if (!grid.population[i].carryingFood) {
            // let newCoords = 
            grid.moveToFood(i)
            // grid.population[i].Shape.x = newCoords[0]
            // grid.population[i].Shape.y = newCoords[1]
          } else {
            // let newCoords = 
            grid.moveToHome(i)
            // grid.population[i].Shape.x = newCoords[0]
            // grid.population[i].Shape.y = newCoords[1]
          }

        }
        // if not following a trail but carrying food, wander home
        else if (!grid.population[i].followingTrail && grid.population[i].carryingFood) {
          let newCoords = grid.wanderHome(i)
          grid.population[i].Shape.x = newCoords[0]
          grid.population[i].Shape.y = newCoords[1]
          grid.makeTrail(i)

        }
        // if not following a trail, and not carrying food, wander
        else if (!grid.population[i].followingTrail && !grid.population[i].carryingFood) {
          let newCoords = grid.wanderAnt(i)
          grid.population[i].Shape.x = newCoords[0]
          grid.population[i].Shape.y = newCoords[1]
          grid.checkForTrail(i)
        }
        this.stage.update();
      }
    }

    //   // if not carrying food, and not following trail, move randomly
    //   if (!grid.population[i].carryingFood) {
    //     let newCoords = grid.moveAnt(i)
    //     grid.population[i].Shape.x = newCoords[0]
    //     grid.population[i].Shape.y = newCoords[1]
    //     for (let j = 0; j < grid.foodCoords.length; j++) {

    //       // if close to food, gather food, replace stage child with new color graphic
    //       if (grid.calcDistance(newCoords, grid.foodCoords[j].coords) < (grid.foodCoords[j].scale + 4)) {
    //         grid.population[i].carryingFood = true
    //         this.stage.removeChildAt(i)
    //         grid.population[i].Shape.graphics.clear().beginFill("red").drawCircle(0, 0, 2)
    //         this.stage.addChildAt(grid.population[i].Shape, i)
    //         grid.foodCoords[j].scale -= 1
    //         grid.population[i].followingTrail = false;


    //         // if food becomes very small, remove food and replace it's index in the stage with a new food dot.
    //         if (grid.foodCoords[j].scale <= 4) {
    //           this.stage.removeChildAt(j + (grid.maxAnts))
    //           grid.foodCoords[j].Shape.x = Math.ceil(Math.random() * (grid.gridSize - 5))
    //           grid.foodCoords[j].Shape.y = Math.ceil(Math.random() * (grid.gridSize - 5))
    //           grid.foodCoords[j].scale += Math.ceil((Math.random() * 10) + 7)
    //           grid.foodCoords[j].coords = [grid.foodCoords[j].Shape.x, grid.foodCoords[j].Shape.y]
    //           grid.foodCoords[j].Shape.graphics.clear().beginFill("brown").drawCircle(0, 0, grid.foodCoords[j].scale)
    //           this.stage.addChildAt(grid.foodCoords[j].Shape, j + (grid.maxAnts))
    //         } // otherwise change scale of foodDot in reaction to nom-nom.

    //         grid.foodCoords[j].Shape.graphics.clear().beginFill("brown").drawCircle(0, 0, grid.foodCoords[j].scale)
    //       }
    //     }

    //     this.stage.update();
    //   }
    //   // if carrying food, wander home, leave a trail
    //   else if (grid.population[i].carryingFood) {

    //     let newCoords = grid.moveHome(i)
    //     grid.population[i].Shape.x = newCoords[0]
    //     grid.population[i].Shape.y = newCoords[1]
    //     grid.population[i].trail.push(newCoords)
    //     this.stage.update();
    //     // if close to nest, drop off food
    //     if (grid.calcDistance(currentCoords, grid.nestCoords) < 4) {
    //       grid.population[i].carryingFood = false
    //       this.stage.removeChildAt(i)
    //       grid.population[i].Shape.graphics.clear().beginFill("Black").drawCircle(0, 0, 2)
    //       this.stage.addChildAt(grid.population[i].Shape, i)
    //       //if first time home thus not yet following the trail, follow the trail
    //       if (!grid.population[i].followingTrail) {
    //         grid.population[i].followingTrail = true
    //       }
    //     }
    //   }
    // }







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


    // const handleCircleClick = () => {

    // }
    // circle.on("click", handleCircleClick)

    createjs.Ticker.setFPS(15)
    createjs.Ticker.addEventListener("tick", handleTick)
  }

  render() {

    return (
      <canvas ref="canvas" width={grid.gridSize} height={grid.gridSize} />
    )
  }
}

export default Control