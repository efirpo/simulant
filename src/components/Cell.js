export class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.ant = null;
    this.food = 0;
    this.signal = 0;
    this.hasAnt = function () {
      if (this.ant) {
        return true
      } else { return false }
    };
  }
}
export default Cell