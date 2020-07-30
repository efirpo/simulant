import * as grid from './Grid';

export default function Food() {
  this.scale = Math.ceil((Math.random() * 10) + 13);
  this.coords = [Math.ceil((Math.random() * (grid.gridSize / 5)) + (grid.gridSize / 4)), Math.ceil((Math.random() * (grid.gridSize / 5)) + (grid.gridSize / 4))]
  this.Shape = {}
}
