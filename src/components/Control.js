import * as createjs from 'createjs-easeljs';
import React from 'react';
import ReactDOM from 'react-dom';
import Ant from './Ant';
import Cell from './Cell';


class Control extends React.Component {
  constructor(props) {
    super(props);
    this.coordArr = [];
    this.tempCoords = [];
    this.gridSize = 200;
    this.maxAnts = 50;
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
    return Math.floor(Math.random() * 200);
  }
  createRandomCoords = (x, y) => {
    let a = this.createRandomNum(x + 1, x + 100);
    let b = this.createRandomNum(y + 1, y + 100);
    let z = this.createBound(a);
    let q = this.createBound(b);
    return [z, q]
  }
  createBound = (i) => {
    let bound = i;
    if (i < 0) {
      bound = 0
    }
    if (i >= this.gridSize) {
      bound = this.gridSize
    }
    return bound

  }
  componentWillMount() {
    this.createGrid()
    for (let i = 0; i <= this.maxAnts; i++) {
      this.spawnAnt()
    }
    // console.log(this.coordArr)
  }
  spawnAnt = () => {
    let x = 0;
    let y = 0;
    let newCoords = this.createRandomCoords(x, y);
    var a = newCoords[0];
    var b = newCoords[1];
    if (!this.coordArr[a][b].hasAnt() && this.antsOut < this.maxAnts) {
      this.coordArr[a][b].ant = new Ant();
      this.tempCoords[a][b].ant = this.coordArr[a][b].ant
      this.antsOut += 1;
      console.log(this.coordArr[a][b].ant)
    }
    return [a, b]
  }

  componentDidMount() {


    let canvas = ReactDOM.findDOMNode(this.refs.canvas);
    this.stage = new createjs.Stage(canvas);
    let ticks;
    const handleTick = (event) => {
      const makeAnt = (x, y) => {
        let antDot = new createjs.Shape()
        antDot.graphics.beginFill("Black").drawCircle(0, 0, 2)
        antDot.x = x
        antDot.y = y
        this.stage.addChild(antDot)
        this.stage.update()
        console.log("MAKE ANT")
      }
      ticks = createjs.Ticker.getTicks()
      for (let x = 0; x <= this.gridSize; x++) {
        for (let y = 0; y <= this.gridSize; y++) {
          return console.log(this.coordArr[x][y].hasAnt())
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
      <canvas ref="canvas" width="400" height="400"></canvas>
    )
  }
}

export default Control