import * as createjs from 'createjs-easeljs';

export default function Food() {
  this.scale = Math.ceil((Math.random() * 10) + 7);
  this.coords = [Math.ceil((Math.random() * 390) + 5), Math.ceil((Math.random() * 390) + 5)]
  this.Shape = {}
}
