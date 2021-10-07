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
  maxPositionX: number;
  minPositionX: number;
  velocityX: number;
  positionY: number;
  velocityY: number;
  camera: Camera;
  context: CanvasRenderingContext2D;
  controls: Controls;

  constructor(context: CanvasRenderingContext2D) {
    this.positionX = 0x0;
    this.maxPositionX = 0x0;
    this.minPositionX = 0x0;
    this.velocityX = 0x0;
    this.positionY = 0x0;
    this.velocityY = 0x0;
    this.context = context;
    this.camera = new Camera(this.context, world1_1);
    this.controls = new Controls(this);
  }

  update() {
    if (this.camera.position + 0x03000 / 0x100 > this.positionX)
      this.camera.updateCamera(0);
    else if (this.camera.position + 0x07000 / 0x100 > this.positionX)
      this.camera.updateCamera(this.velocityX / 2);
    else
      this.camera.updateCamera(this.velocityX);
    this.positionX += this.velocityX;
    if (this.positionX < this.camera.position)
      this.positionX = this.camera.position;

    console.log();

    this.draw(this.positionX - this.camera.position, this.positionY);
  }

  draw(x: number, y: number) {
    this.context.beginPath();
    this.context.fillStyle = "#ff0000";
    this.context.fillRect(x, y + 0xB000 / 0x100, 16, 32);
    this.context.stroke();
  }

  walkAccelerate(right: boolean) {
    if (right) {
      if (this.velocityX < 0x00130 / 0x100)
        this.velocityX = 0x00130 / 0x100;
      else
        this.velocityX += 0x00098 / 0x100;
      if (this.velocityX >= 0x00290 / 0x100)
        this.velocityX = 0x00290 / 0x100;
    } else {
      if (this.velocityX > -0x00130 / 0x100)
        this.velocityX = -0x00130 / 0x100;
      else
        this.velocityX -= 0x00098 / 0x100;
      if (this.velocityX <= -0x00290 / 0x100)
        this.velocityX = -0x00290 / 0x100;
    }
  }

  decelerate() {
    if (this.velocityX > 0)
      if (this.velocityX <= 0x000D0 / 0x100)
        this.velocityX = 0;
      else
        this.velocityX -= 0x000D0 / 0x100;
    if (this.velocityX < 0)
      if (this.velocityX >= -0x000D0 / 0x100)
        this.velocityX = 0;
      else
        this.velocityX += 0x000D0 / 0x100;
  }
}

export default Player;