export default function Cell(x, y) {
  this.x = x;
  this.y = y;
  this.ant = null;
  this.food = 0;
  this.signal = 0;
  this.hasAnt = function () {
    return this.ant ? true : false;
  };
}