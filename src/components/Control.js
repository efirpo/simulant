import * as createjs from 'createjs-easeljs';
import React from 'react';
import ReactDOM from 'react-dom';
import Ant from './Ant';
import Cell from './Cell';


class Control extends React.Component {
  constructor() {
    super();
    this.coordArr = [];
    this.tempCoords = [];
    this.gridSize = 200;
    this.population = [];
    this.maxAnts = 100;
    this.antsOut = 0;
  }

  createGrid = () => {
    for (let x = 0; x < this.gridSize; x++) {
      this.coordArr[x] = [];
      this.tempCoords[x] = [];
      for (let y = 0; y < this.gridSize; y++) {
        this.coordArr[x][y] = new Cell(x, y);
        this.tempCoords[x][y] = new Cell(x, y)
      }
    }
  }
  createRandomNum = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  createRandomCoords = (x, y) => {
    let a = this.createRandomNum(x - 1, x + 1);
    let b = this.createRandomNum(y - 1, y + 1);
    return [a, b]
  }
  componentWillMount() {
    this.createGrid()
    console.log(this.coordArr)
  }


  componentDidMount() {

    const spawnAnt = () => {
      let x = 0;
      let y = 0;
      let newCoords = this.createRandomCoords(x, y);
      var a = newCoords[0];
      var b = newCoords[1];
      if (!this.coordArr[a][b].hasAnt() && this.antsOut < this.maxAnts) {
        this.coordArr[a][b].ant = new Ant();
        this.tempCoords[a][b].ant = this.coordArr[a][b].ant
        this.antsOut += 1;

      }
    }


    var canvas = ReactDOM.findDOMNode(this.refs.canvas);
    this.stage = new createjs.Stage(canvas);
    for (let i = 0; i <= this.gridSize; i++) {
      for (let j = 0; j <= this.gridSize; j++) {
        if (this.coordArr[i][j].hasAnt()) {
          let antDot = new createjs.Shape();
          antDot.graphics.beginFill("Black").drawCircle(0, 0, 1)
          this.stage.addChild(antDot)
        }
      }
    }
    // var circle = new createjs.Shape();
    // circle.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 10);
    // circle.x = 100;
    // circle.y = 100;
    // this.stage.addChild(circle);
    // var square = new createjs.Shape();
    // square.graphics.beginFill("red").drawRect(5, 5, 5, 5)
    // square.x = 50;
    // square.y = 20;
    // this.stage.addChild(square);
    let ticks;
    const handleTick = (event) => {
      ticks = createjs.Ticker.getTicks()
      if (ticks % 5 == 0) {
        spawnAnt()
      }
      this.stage.update();
    }
    // const handleCircleClick = () => {

    // }
    // circle.on("click", handleCircleClick)

    createjs.Ticker.setFPS(30)
    createjs.Ticker.addEventListener("tick", handleTick)


  }

  render() {

    return (
      <canvas ref="canvas" width="200" height="200"></canvas>
    )
  }
}

export default Control