export default function Ant() {
  this.carryingFood = false;
  this.followingTrail = false;
  this.orientation = Math.ceil(Math.random() * 8);
  this.coords = []
  this.target = null
  this.trail = []
  this.Shape = {}
}