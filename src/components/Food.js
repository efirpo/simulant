import * as createjs from 'createjs-easeljs';

export default function Food() {
  this.scale = Math.ceil((Math.random() * 5) + 5);
  this.coords = [Math.ceil((Math.random() * 190) + 5), Math.ceil((Math.random() * 190) + 5)]
  this.Shape = {}
}
