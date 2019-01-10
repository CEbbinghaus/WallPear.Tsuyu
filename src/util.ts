declare function setInterval(handlers: (...args: any) => void, timeout: number): number;
export function NoiseGenerator(method: Function) :void{
    let i = 0;
    const generator = (): Array<Number> => {
        let result = Array.from(new Array(64)).map(() => {
            i += 0.1;
            return Math.sin(i) + 1;
        })
        return result.concat(Array.from(result).reverse());
    };
    window.setInterval(() => {method(generator())}, 200);
    return;
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
        return result;
    }
}