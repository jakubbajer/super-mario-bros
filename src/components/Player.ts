// Game physics info
// min walk velocity - 0x00130
// max walk velocity - 0x01900
// walking acceleration - 0x00098
// running acceleration - 0x000E4
// max running speed - 0x02900
// release deceleration - 0x000D0
// skidding deceleration - 0x0001A
// max walk velocity (underewater) - 0x01100
// max walk velocity (level entry) - 0x00D00
// skid turnaround speed - 0x00900

import world1_1 from "../../assets/sprites/world1-1-bg.png";
import Camera from "./Camera";
import Controls from "./Controls";
import Textures from "./Textures";

class Player {
  positionX: number;
  velocityX: number;
  positionY: number;
  velocityY: number;
  camera: Camera;
  context: CanvasRenderingContext2D;
  controls: Controls;
  animationCounter: number;

  constructor(context: CanvasRenderingContext2D) {
    this.positionX = 0x03000 / 0x100;
    this.velocityX = 0x0;
    this.positionY = 0x0;
    this.velocityY = 0x0;
    this.context = context;
    this.camera = new Camera(this.context, world1_1);
    this.controls = new Controls(this);
    this.animationCounter = 1;
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

    this.renderMario(this.positionX - this.camera.position, this.positionY);
  }

  renderMario(x: number, y: number) {
    let texture: "running" | "standing" | "dying" | "jumping" = (this.velocityX != 0) ? "running" : "standing";
    this.camera.drawSprite(...Textures.getMario(texture, Math.floor(this.animationCounter / 6) + 1), x, y + 0x0C000 / 0x100, 16, 16, this.velocityX < 0);
    this.animationCounter = (this.animationCounter + 1) % 18 + 1;
  }

  accelerate(right: boolean, run: boolean) {
    if (run) {
      if (right) {
        // running right
        if (this.velocityX < 0x00130 / 0x100)
          this.velocityX = 0x00130 / 0x100;
        else
          this.velocityX += 0x000E4 / 0x100;
        if (this.velocityX >= 0x00290 / 0x100)
          this.velocityX = 0x00290 / 0x100;
      } else {
        // running left
        if (this.velocityX > -0x00130 / 0x100)
          this.velocityX = -0x00130 / 0x100;
        else
          this.velocityX -= 0x000E4 / 0x100;
        if (this.velocityX <= -0x00290 / 0x100)
          this.velocityX = -0x00290 / 0x100;
      }
    }
    else {
      if (right) {
        // walking right
        if (this.velocityX < 0x00130 / 0x100)
          this.velocityX = 0x00130 / 0x100;
        else
          this.velocityX += 0x00098 / 0x100;
        if (this.velocityX >= 0x00190 / 0x100)
          this.velocityX = 0x00190 / 0x100;
      } else {
        // walking left
        if (this.velocityX > -0x00130 / 0x100)
          this.velocityX = -0x00130 / 0x100;
        else
          this.velocityX -= 0x00098 / 0x100;
        if (this.velocityX <= -0x00190 / 0x100)
          this.velocityX = -0x00190 / 0x100;
      }
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