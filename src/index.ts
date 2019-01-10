import { Visualizer } from "./visualizer";
import { Settings } from "./settings";
//@ts-ignore
const canvas: HTMLCanvasElement = document.getElementById("canvas");
if(!canvas)throw "Something went really wrong here";
const settings = new Settings({});
const Simulation = new Visualizer(settings, canvas);
console.log(window);
//@ts-ignore
window.reload = function(){
  location.href = location.href;
}