// Game physics info
// min walk velocity - 00130
// max walk velocity - 01900
// walking acceleration - 00098
// running acceleration - 000E4
// max running speed - 02900
// release deceleration - 000D0
// skidding deceleration - 0001A

import world1_1 from "../../assets/sprites/world1-1-bg.png";
import Camera from "./Camera";
import Controls from "./Controls";

class Player {
  positionX: number;
  velocity: number;
  camera: Camera;
  context: CanvasRenderingContext2D;
  controls: Controls;

  constructor(context: CanvasRenderingContext2D) {
    this.positionX = 0x0;
    this.velocity = 0x0;
    this.context = context;
    this.camera = new Camera(this.context, world1_1);
    this.controls = new Controls(this);
  }

  update() {
    this.positionX += this.velocity;
    console.log(this.velocity);

  }

  walkAccelerate(right: boolean) {
    if (right) {
      if (this.velocity < 0x00130 / 0x100)
        this.velocity = 0x00130 / 0x100;
      else
        this.velocity += 0x00098 / 0x100;
      if (this.velocity >= 0x00290 / 0x100)
        this.velocity = 0x00290 / 0x100;
    } else {
      if (this.velocity > -0x00130 / 0x100)
        this.velocity = -0x00130 / 0x100;
      else
        this.velocity -= 0x00098 / 0x100;
      if (this.velocity <= -0x00290 / 0x100)
        this.velocity = -0x00290 / 0x100;
    }
  }
}

export default Player;