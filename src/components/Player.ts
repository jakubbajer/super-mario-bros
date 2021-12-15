// Game physics info
// min walk speed - 0x00130
// max walk speed - 0x01900
// walking acceleration - 0x00098
// running acceleration - 0x000E4
// max running speed - 0x02900
// release deceleration - 0x000D0
// skidding deceleration - 0x0001A
// max walk speed (underewater) - 0x01100
// max walk speed (level entry) - 0x00D00
// skid turnaround speed - 0x00900

import Controls from "./Controls";

class Player {
  positionX: number;
  speedX: number;
  positionY: number;
  speedY: number;
  lastSpeedY: number;
  jumpStartSpeedX?: number;
  grounded: boolean;
  animationCounter: number;
  facing: "left" | "right";
  controls: Controls;

  constructor() {
    this.positionX = 0x03000 / 0x100;
    this.speedX = 0x0;
    this.positionY = 0x02000 / 0x100;
    this.speedY = 0x0;
    this.lastSpeedY = 0x0;
    this.grounded = true;
    this.animationCounter = 1;
    this.facing = "right";
    this.controls = new Controls(this);
  }

  accelerate(right: boolean, run: boolean) {
    if (run) {
      if (right) {
        // running right
        if (this.speedX < 0x00130 / 0x100)
          this.speedX = 0x00130 / 0x100;
        else
          this.speedX += 0x000E4 / 0x100;
        if (this.speedX >= 0x00290 / 0x100)
          this.speedX = 0x00290 / 0x100;
      } else {
        // running left
        if (this.speedX > -0x00130 / 0x100)
          this.speedX = -0x00130 / 0x100;
        else
          this.speedX -= 0x000E4 / 0x100;
        if (this.speedX <= -0x00290 / 0x100)
          this.speedX = -0x00290 / 0x100;
      }
    }
    else {
      if (right) {
        // walking right
        if (this.speedX < 0x00130 / 0x100)
          this.speedX = 0x00130 / 0x100;
        else
          this.speedX += 0x00098 / 0x100;
        if (this.speedX >= 0x00190 / 0x100)
          this.speedX = 0x00190 / 0x100;
      } else {
        // walking left
        if (this.speedX > -0x00130 / 0x100)
          this.speedX = -0x00130 / 0x100;
        else
          this.speedX -= 0x00098 / 0x100;
        if (this.speedX <= -0x00190 / 0x100)
          this.speedX = -0x00190 / 0x100;
      }
    }
  }

  decelerate() {
    if (this.speedX > 0)
      if (this.speedX <= 0x000D0 / 0x100)
        this.speedX = 0;
      else
        this.speedX -= 0x000D0 / 0x100;
    if (this.speedX < 0)
      if (this.speedX >= -0x000D0 / 0x100)
        this.speedX = 0;
      else
        this.speedX += 0x000D0 / 0x100;
  }

  jump() {
    this.jumpStartSpeedX = Math.abs(this.speedX);
    this.grounded = false;

    if (this.jumpStartSpeedX <= 0x024FF / 0x100)
      this.speedY = 0x00400 / 0x100;
    else
      this.speedY = 0x00500 / 0x100;

    this.lastSpeedY = this.speedY;
  }

  gravity(jumpHeld: boolean) {
    if (jumpHeld && this.speedY >= 0) {
      if (this.jumpStartSpeedX! < 0x01000 / 0x100)
        this.speedY -= 0x0020 / 0x100;
      else if (this.jumpStartSpeedX! >= 0x01000 / 0x100 && this.jumpStartSpeedX! <= 0x024FF / 0x100)
        this.speedY -= 0x0001E / 0x100;
      else if (this.jumpStartSpeedX! > 0x024FF)
        this.speedY -= 0x00028 / 0x100;
    } else {
      if (this.jumpStartSpeedX! < 0x01000 / 0x100)
        this.speedY -= 0x00070 / 0x100;
      else if (this.jumpStartSpeedX! >= 0x01000 / 0x100 && this.jumpStartSpeedX! <= 0x024FF / 0x100)
        this.speedY -= 0x00060 / 0x100;
      else if (this.jumpStartSpeedX! > 0x024FF)
        this.speedY -= 0x00090 / 0x100;
    }
    if (this.speedY < -0x04800 / 0x100)
      this.speedY = 0x04000 / 0x100;

    console.log("y speed: ", this.speedY.toString(16));
  }

  isGrounded(obstacles: Array<any>): boolean {
    // left side of mario
    const x1 = Math.floor(this.positionX / 16);
    // right side of mario
    const x2 = Math.floor(this.positionX / 16) + 1;

    // mario's y coordinate in blocks - 1 pixel (1/16 of a block)
    const y = (this.positionY - (0x00100 / 0x100)) / 16;

    obstacles = obstacles.filter((block: any) => (block.x == x1 || block.x == x2) && block.y == Math.floor(y));
    let grounded = (obstacles.length > 0) ? true : false;
    // console.log(grounded);
    // console.info("x1:", x1, "x2", x2, "exact y:", y, "y of block to check:", Math.floor(y), "grounded:", grounded);

    return grounded;
  }

  isInBlock(obstacles: Array<any>): { isIn: boolean, correction?: { x: number, y: number; }; } {
    // exact side (depending on his direction) of mario in blocks
    const exactX = ((this.speedX >= 0) ? this.positionX + 0x01000 / 0x100 : this.positionX) / 16;
    const wholeX = Math.floor(exactX);
    const remainder: number = exactX % 1;

    // exact mario's y coordinate in blocks
    const y = (this.positionY) / 16;


    const [block] = obstacles = obstacles.filter((block: any) => block.x == wholeX && block.y == Math.floor(y));
    // console.log("whole x:", wholeX, "y:", y, "block:", block);

    if (block) return { isIn: true, correction: { x: ((this.speedX >= 0) ? -remainder : 1 - remainder) * 16, y: 0 } };
    else return { isIn: false };
  }
}

export default Player;