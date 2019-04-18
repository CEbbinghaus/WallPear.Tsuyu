import {Settings, sampleSize} from "./settings";
import { NoiseGenerator, circle, slice, rgb} from "./util";
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
    // window.addEventListener("keydown", (e) => {
    //   let evt = e || event;
    //   if(this.settings.moveCircle){
    //     switch(e.key){
    //       case "ArrowUp":
    //       return this.bubble.y--;
    //       case "ArrowDown":
    //       return this.bubble.y++;
    //       case "ArrowLeft":
    //       return this.bubble.x--;
    //       case "ArrowRight":
    //       return this.bubble.x++;
    //       case "+":
    //       return this.bubble.radius++;
    //       case "-":
    //       return this.bubble.radius--;
    //     }
    //   }
    // })
    window.addEventListener("mousemove", (e) => {
      let evt = e || event;
      if(!e.button)return;
      if(this.settings.moveCircle){
        this.bubble.x = e.clientX;
        this.bubble.y = e.clientY;
      }
    })
  }
  private initialize(){
    //@ts-ignore
    if(window.wallpaperRegisterAudioListener){

      //@ts-ignore
      window.wallpaperRegisterAudioListener(this.recieveData.bind(this));

      for(var key in window){
        if(key.search('on') === 0) {
          window.addEventListener(key.slice(2), e => {try{e.preventDefault();}catch{}});
        }
      }

    }else{
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
    let half: boolean = this.settings.size == sampleSize.half;
    let data: Array<number> = this.rawData;
    this.context.lineWidth = this.settings.lineWidth * (half ? 2 : 1);
    let L = this.rawData.slice(0, this.rawData.length / 2 | 0);
    let R = this.rawData.slice(this.rawData.length / 2 | 0, this.rawData.length);
    R.reverse();
    data = Array.from(new Array(this.rawData.length / 2)).map((_, i) => {
      return (L[i] + R[i]) / 2;
    })
    if(!half){
      data = data.concat(Array.from(data).reverse());
    }
    this.rawData.map(v => {
      return v < 0 ? 0 : v > 1 ? 1 : v;
    })

    if(this.settings.rgb){
      this.settings.color = rgb(this.settings);
    }

    this.draw(data);
  }
  private draw(soundData: Array<number>){
    let ctx = this.context;
    ctx.globalCompositeOperation = "source-over";
    if(!soundData.length)return setTimeout(this.update.bind(this), 200);

    ctx.shadowBlur = this.settings.glow ? this.settings.glowSize : 0;

    ctx.shadowColor = ctx.strokeStyle = ctx.fillStyle = this.settings.color;

    let rotationData: Array<slice> = this.bubble.getDegreeData(soundData.length);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    ctx.beginPath();
    //@ts-ignore
    ctx.lineCap = this.settings.roundLines ?  "round" : "square";
    rotationData.map((v, i) => {
      ctx.moveTo(v.x, v.y);
      ctx.lineTo(v.x + v.deltax * soundData[i] * this.settings.height, v.y + v.deltay * soundData[i] * this.settings.height);
    })
    ctx.stroke();
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(this.bubble.x, this.bubble.y, this.bubble.radius, 0, Math.PI * 2);
    ctx.fillStyle = "fff";
    ctx.fill();
    requestAnimationFrame(this.update.bind(this));
  }
  private recieveData(data: Array<number>){
    this.rawData = data;
    //TODO: Complex Math to Smooth Data
  }
}