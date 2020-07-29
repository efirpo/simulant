import * as grid from './Grid';

export default function Food() {
  this.scale = Math.ceil((Math.random() * 10) + 7);
  this.coords = [Math.ceil((Math.random() * grid.gridSize) - 5), Math.ceil((Math.random() * grid.gridSize) - 5)]
  this.Shape = {}
}
