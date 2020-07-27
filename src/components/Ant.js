export default function Ant() {
  this.carryingFood = false;
  this.lastPheremone = 0;
  this.orientation = Math.random() * 90;
  this.coords = []
}