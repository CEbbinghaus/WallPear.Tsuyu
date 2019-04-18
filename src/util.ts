import { Settings } from "./settings";
import { hsl } from "./color";

declare function setInterval(handlers: (...args: any) => void, timeout: number): number;
export function NoiseGenerator(method: Function) :void{
    let i = 0;
    const generator = (): Array<Number> => {
        let result = Array.from(new Array(64)).map(() => {
            i += 0.1;
            return Math.sin(i) + (Math.random() / 10) + 1;
        })
        return result.concat(Array.from(result).reverse());
    };
    window.setInterval(() => {method(generator())}, 42);
    return;
}

export function rgb(settings: Settings): string{
    //@ts-ignore
    if(window.curentColor == undefined || isNaN(window.curentColor))window.curentColor= 0;
    //@ts-ignore
    return hsl(window.curentColor += settings.rgbSpeed / 100);
}

export interface slice {
    x: number;
    y: number;
    index: number;
    deltax: number;
    deltay: number;
    whole: circle;
}

export class circle{
    x: number;
    y: number;
    radius: number;
    private slices: Array<slice>;
    private sliceCount: number;
    constructor(x: number = 0, y: number = 0, radius: number = 5){
        this.x = x;
        this.y = y;
        this.radius = radius;
        console.log(this.getDegreeData(20));
    }
    fill(ctx: CanvasRenderingContext2D){
        // console.log("Drawing Circle");
        ctx.clearRect(0, 0, 1e5,1e5);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }
    getDegreeData(sliceCount: number): Array<slice>{
        if(sliceCount == this.sliceCount && this.slices.length)return this.slices;
        let sliceDegree = Math.PI * 2 / sliceCount;
        const result = Array.from(new Array(sliceCount)).map((_, i) => {
            let sin = Math.sin(sliceDegree * i);
            let cos = Math.cos(sliceDegree * i);
            let s : slice = {
                deltax: sin,
                deltay: cos,
                index: i,
                x: this.x + this.radius * sin,
                y: this.y + this.radius * cos,
                whole: this
            }
            return s;
        })
        this.sliceCount = sliceCount;
        this.slices = result;
        return result;
    }
}

export function generateJSON(settings: Settings){
    let res = {};
    for(let a in settings){
        //@ts-ignore
        res[a] = generateObject(a, settings[a]);
    }
    for(let a in res){
        //@ts-ignore
        if(!res[a])delete res[a];
    }
    return JSON.stringify(res);
}

function generateObject(name: string, value: any){
    let res: any = {};
    //@ts-ignore
    res["order"] = (window.oi == undefined || isNaN(window.oi)) ? window.oi = 0 : window.oi;
    res["type"] = typify(value);
    res["text"] = name;
    res["value"] = value;
    switch(res.type){
        case "":
            return null;
        case "slider":
            res["min"] = 0;
            res["max"] = 100;
    }
    window["oi"]++;
    return res;
}

function typify(value: any){
    switch(typeof value){
        case "boolean":
            return "bool";
        case "number":
            return "slider";
        case "string":
            return "color";
    }
    return "";
}