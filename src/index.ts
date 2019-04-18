import { Visualizer } from "./visualizer";
import { Settings } from "./settings";
import { generateJSON } from "./util";
import { clearTimeout } from "timers";
//@ts-ignore
const canvas: HTMLCanvasElement = document.getElementById("canvas");
if(!canvas)throw "Something went really wrong here";
const settings = new Settings({});
const Simulation = new Visualizer(settings, canvas);


console.log(generateJSON(settings));

//@ts-ignore
window.reload = function(){
  if(window["timout"]){
    window.clearTimeout(window["timout"]);
  }
  window["timout"] = window.setTimeout(() => {
    //location.href = location.href;
  }, 1000);
}