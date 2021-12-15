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

import Controls from "./Controls";

class Player {
  positionX: number;
  velocityX: number;
  positionY: number;
  velocityY: number;
  grounded: boolean;
  facing: "left" | "right";
  controls: Controls;
  animationCounter: number;

  constructor() {
    this.positionX = 0x03000 / 0x100;
    this.velocityX = 0x0;
    this.positionY = 0x02000 / 0x100;
    this.velocityY = 0x0;
    this.grounded = true;
    this.controls = new Controls(this);
    this.animationCounter = 1;
    this.facing = "right";
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
    const exactX = ((this.velocityX >= 0) ? this.positionX + 0x01000 / 0x100 : this.positionX) / 16;
    const wholeX = Math.floor(exactX);
    const remainder: number = exactX % 1;

    // exact mario's y coordinate in blocks
    const y = (this.positionY) / 16;


    const [block] = obstacles = obstacles.filter((block: any) => block.x == wholeX && block.y == Math.floor(y));
    // console.log("whole x:", wholeX, "y:", y, "block:", block);

    if (block) return { isIn: true, correction: { x: ((this.velocityX >= 0) ? -remainder : remainder) * 16, y: 0 } };
    else return { isIn: false };
  }
}

export default Player;