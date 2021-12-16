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

import AudioPlayer from "./AudioPlayer";
import Controls from "./Controls";
import Enemy from "./Enemy";
import die from "/assets/sounds/Die.wav";
import bump from "/assets/sounds/Bump.wav";
import squish from "/assets/sounds/Squish.wav";
import theme from "/assets/sounds/theme.mp3";
import jump from "/assets/sounds/Jump.wav";
import oneUp from "/assets/sounds/1up.wav";

class Player {
  audioPlayer: AudioPlayer;
  positionX: number;
  speedX: number;
  positionY: number;
  speedY: number;
  lastSpeedY: number;
  jumpStartSpeedX?: number;
  size: number;
  invincible: boolean;
  grounded: boolean;
  animationCounter: number;
  facing: "left" | "right";
  controls: Controls;
  dead: boolean;

  constructor() {
    this.audioPlayer = new AudioPlayer(theme);
    this.dead = false;
    this.invincible = false;
    this.positionX = 0x03000 / 0x100;
    this.speedX = 0x0;
    this.positionY = 0x02000 / 0x100;
    this.speedY = 0x0;
    this.lastSpeedY = 0x0;
    this.grounded = true;
    this.size = 1;
    this.animationCounter = 1;
    this.facing = "right";
    this.controls = new Controls(this);
    // this.controls.clear();
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
    AudioPlayer.playAudio(jump);
    this.jumpStartSpeedX = Math.abs(this.speedX);
    this.grounded = false;

    if (this.jumpStartSpeedX <= 0x0025E / 0x100)
      this.speedY = 0x00400 / 0x100;
    else
      this.speedY = 0x00500 / 0x100;

    this.lastSpeedY = this.speedY;
  }

  gravity(jumpHeld: boolean) {
    if (jumpHeld && this.speedY >= 0) {
      if (this.jumpStartSpeedX! < 0x00100 / 0x100)
        this.speedY -= 0x0020 / 0x100;
      else if (this.jumpStartSpeedX! >= 0x00100 / 0x100 && this.jumpStartSpeedX! <= 0x024FF / 0x100)
        this.speedY -= 0x0001E / 0x100;
      else if (this.jumpStartSpeedX! > 0x0025E)
        this.speedY -= 0x00028 / 0x100;
    } else {
      if (this.jumpStartSpeedX! < 0x00100 / 0x100)
        this.speedY -= 0x00070 / 0x100;
      else if (this.jumpStartSpeedX! >= 0x00100 / 0x100 && this.jumpStartSpeedX! <= 0x024FF / 0x100)
        this.speedY -= 0x00060 / 0x100;
      else if (this.jumpStartSpeedX! > 0x0025E)
        this.speedY -= 0x00090 / 0x100;
    }
    if (this.speedY < -0x00480 / 0x100)
      this.speedY = -0x00400 / 0x100;

    // console.log("y speed: ", this.speedY.toString(16));
  }

  handleCollision(obstacles: Array<any>, enemies: Array<any>) {
    if (this.speedX >= 0) {
      let rightSide = this.positionX + this.speedX + 16;
      let y = this.positionY;
      let topY = this.positionY + 16;

      let toRight = obstacles.filter((block: any) => {
        return block.x == Math.floor(rightSide / 16) && (block.y == Math.floor(y / 16) || block.y == Math.floor(topY / 16));
      });

      if (toRight.length > 0) {
        this.speedX = 0;
      }
    } else {
      let leftSide = this.positionX + this.speedX;
      let y = this.positionY;
      let topY = this.positionY + 16;

      let toLeft = obstacles.filter((block: any) => {
        return block.x == Math.floor(leftSide / 16) && (block.y == Math.floor(y / 16) || block.y == Math.floor(topY / 16));
      });

      if (toLeft.length > 0) {
        this.speedX = 0;
      }
    }

    if (this.speedY <= 0) {
      let blc = { x: this.positionX + this.speedX, y: this.positionY + this.speedY };
      let brc = { x: this.positionX + this.speedX + 16, y: this.positionY + this.speedY };

      let below = obstacles.filter((block: any) => {
        let x = block.x;
        let x1 = block.x + 17 / 16;

        return ((blc.x / 16 > x && blc.x / 16 < x1) || (brc.x / 16 > x && brc.x / 16 < x1)) && (Math.floor(blc.y / 16) == block.y);
      });

      // console.log(below);

      if (below.length > 0) {
        this.speedY = 0;
        this.grounded = true;
        // this.jumpStartSpeedX = undefined;
      } // else this.grounded = false;
    } else {
      let tlc = { x: this.positionX + this.speedX, y: this.positionY + this.speedY + 16 * this.size };
      let trc = { x: this.positionX + this.speedX + 16, y: this.positionY + this.speedY + 16 * this.size };

      let abowe = obstacles.filter((block: any) => {
        let x = block.x;
        let x1 = block.x + 1;

        return ((tlc.x / 16 > x && tlc.x / 16 < x1) || (trc.x / 16 > x && trc.x / 16 < x1)) && Math.ceil(tlc.y / 16) - 1 == block.y;
      });

      if (abowe.length > 0) {
        AudioPlayer.playAudio(bump);
        let index;
        abowe.forEach((block: any) => {
          index = obstacles.findIndex((obstacle: any) => obstacle == block && block.type == "Block");
        });

        if (index != undefined && index != -1) {
          if (obstacles[index].contents) {
            let object = obstacles[index].contents.shift();

            enemies.push(new Enemy(obstacles[index].x, obstacles[index].y + 1, object));
          }
          obstacles[index].type = "Empty";
        }
        this.speedY = 0;
      }
    }
  }

  handleEnemyCollision(enemies: Array<Enemy>) {
    enemies.filter(enemy => !enemy.dead).forEach((enemy) => {
      let x = enemy.x;
      let x1 = x + 16;

      // console.log(enemy.y / 16, (this.positionY + this.speedY) / 16);

      let intersecting = ((this.positionX + this.speedX >= x && this.positionX + this.speedX <= x1) ||
        (this.positionX + this.speedX + 16 >= x && this.positionX + this.speedX + 16 <= x1))
        && Math.floor(enemy.y / 16) == Math.floor((this.positionY + this.speedY) / 16);

      if (intersecting && !this.invincible) {
        if (this.speedY > -1) {
          if (enemy.type == "1up")
            enemy.dead = true;
          this.hit(enemy.type);
        } else {
          this.jump();
          enemy.dead = true;
        }
      }
    });
  }

  hit(type: "goomba" | "1up") {
    if (type == "goomba") {
      AudioPlayer.playAudio(squish);
      this.invincible = true;
      setTimeout(() => { this.invincible = false; }, 1000);
      if (this.size == 2) {
        this.size = 1;
      } else if (this.size == 1) {
        this.die();
      }
    } else {
      AudioPlayer.playAudio(oneUp);
      this.size = 2;
    }
  }

  die() {
    if (!this.dead) {
      this.audioPlayer.theme.pause();
      AudioPlayer.playAudio(die);
      this.dead = true;
      this.controls.disabled = true;
      this.speedX = 0;
      this.speedY = 0x00500 / 0x100;

      setTimeout(() => {
        this.speedY = - 0x00500 / 0x100;
        setTimeout(() => {
          document.getElementById("lost")!.style.display = "flex";
        }, 700);
      }, 200);
    }
  }

  isInBlockHorizontal(obstacles: Array<any>): { isIn: boolean, x?: number; } {
    // exact side (depending on his direction) of mario in blocks
    const exactX = ((this.speedX >= 0) ? this.positionX + 0x01000 / 0x100 : this.positionX) / 16;
    const wholeX = Math.floor(exactX);
    const remainder: number = exactX % 1;

    // exact mario's y coordinate in blocks
    const y = (this.positionY) / 16;

    const [block] = obstacles = obstacles.filter((block: any) => block.x == wholeX && block.y == Math.floor(y));
    // console.log("whole x:", wholeX, "y:", y, "block:", block);

    if (block) return { isIn: true, x: ((this.speedX >= 0) ? -remainder : 1 - remainder) * 16 };
    else return { isIn: false };
  }
}

export default Player;