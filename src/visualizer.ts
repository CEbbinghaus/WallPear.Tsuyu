import {Settings, sampleSize} from "./settings";
import { NoiseGenerator, circle, slice} from "./util";
export class Visualizer {
  private rawData: Array<number>;
  context: CanvasRenderingContext2D;
  bubble: circle;
  settings: Settings;
  canvas: HTMLCanvasElement;
  parsedData: Array<number>;
  constructor(settings: Settings, canvas: HTMLCanvasElement){
    this.canvas = canvas;
    this.settings = settings;
    this.context = this.canvas.getContext("2d");
    this.rawData = [];
    this.bubble = new circle(innerWidth * 0.5643240023823705, innerHeight * 0.4886898065426951, (innerHeight + innerWidth) / 2 * 0.305365296803653);
    this.initialize();
  }
  private initialize(){
    //@ts-ignore
    if(window.wallpaperRegisterAudioListener){
      //@ts-ignore
      window.wallpaperRegisterAudioListener(this.recieveData.bind(this));
    }
    else{
      NoiseGenerator(this.recieveData.bind(this));
    }
    onresize = this.resize.bind(this);
    this.resize();
    this.update();
  }
  private resize(){
    this.canvas.width = innerWidth;
    this.canvas.height = innerHeight;
  }
  private update(){
    if(!this.rawData.length)return this.draw([]);
    if(this.rawData.length % 2 !== 0)this.rawData.pop();
    let data: Array<number> = this.rawData;
    if(this.settings.size == sampleSize.half){
      let L = this.rawData.slice(0, this.rawData.length / 2);
      let R = this.rawData.slice(this.rawData.length / 2, this.rawData.length);
      R.reverse();
      data = Array.from(new Array(this.rawData.length / 2)).map((_, i) => {
        return (L[i] + R[i]) / 2;
      })
    }
    this.rawData.map(v => {
      return v < 0 ? 0 : v > 1 ? 1 : v;
    })
    this.context.lineWidth = 20;
    this.draw(data);
  }
  private draw(soundData: Array<number>){
    let ctx = this.context;
    ctx.clearRect(0, 0, 1e5, 1e5);
    if(!soundData.length)return setTimeout(this.update.bind(this), 200);
    let rotationData: Array<slice> = this.bubble.getDegreeData(soundData.length);
    // console.log(rotationData);
    rotationData.map((v, i) => {
      ctx.moveTo(v.x, v.y);
      ctx.lineTo(v.x + v.deltax * soundData[i] * this.settings.height, v.y + v.deltay * soundData[i] * this.settings.height);
      ctx.stroke();
    })
    // this.bubble.fill(this.context);
    // setTimeout(this.update.bind(this), 10000);
    requestAnimationFrame(this.update.bind(this));
  }
  private recieveData(data: Array<number>){
    this.rawData = data;
    // console.log("Recieved Data")
    // console.log(data);
  }
}