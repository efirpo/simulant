export default function Ant() {
  this.carryingFood = false;
  this.lastPheremone = 0;
  this.orientation = Math.ceil(Math.random() * 8);
  this.coords = []
  this.target = null
  this.Shape = {}
}