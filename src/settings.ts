import { getEnabledCategories } from "trace_events";

export enum sampleSize {
  full,
  half
}
export enum PropertyType{
  boolean = "bool",
  color = "color",
  radio = "multi",
  number = "slider",
  file = "file",
  text = "text"
}

interface setting{
  key: string;
  text: string;
  type: PropertyType;
  order: number;
  value: any;
}
class WallpaperSettings{
  moveCircle: boolean = false;
  roundLines: boolean = true;
  size: sampleSize = sampleSize.half;
  height: number = 200;
  lineWidth: number = 20;
  color: string = "#cfef94"
  rgb: boolean = false;
  rgbSpeed: number = 30;
  glow: boolean = true;
  glowSize: number = 10;
  [index: string]: any;
}
export class Settings extends WallpaperSettings{
  constructor(Object: any){
    super();
    this.initialize();
  }
  private initialize(){
    //@ts-ignore
      window.wallpaperPropertyListener = {
        applyUserProperties: (properties: object) => {
          if(properties["toggle"]){
            document.getElementById("img").style.display = properties["toggle"].value ? "block" : "none";
          }
          for(let key in properties){
            //@ts-ignore
            this.assignProperty(key, properties[key])
          }
          //@ts-ignore
          window.reload();
        }
      }
  }
  private assignProperty(name: string, value: setting){
    if (Object.keys(this).indexOf(name) != -1) {
      this[name] = HandleProperties(value);
    }
  }
}
export function HandleProperties(property: setting){
  switch(property.type){
    case PropertyType.boolean:
      return property.value;
    case PropertyType.radio:
      return property.value;
    case PropertyType.number:
      return property.value;
    case PropertyType.text:
      return;
    case PropertyType.file:
      return decodeURIComponent(property.value);
    case PropertyType.color:
      let c = property.value;
      //@ts-ignore
      return "#" + c.split(" ").map(v => { let c = (parseFloat(v) * 255 | 0).toString(16); return c.length < 2 ? "0" + c : c }).join("");
  }
  return property.value;
}