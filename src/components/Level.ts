type marioTexture = "running" | "standing" | "dying" | "jumping";

import Controls from "./Controls";
import Player from "./Player";
import Textures from "./Textures";
import Camera from "./Camera";
import level1Data from "../worlds/world1-1.json";
import Enemy from "./Enemy";
import flagpole from "/assets/sounds/Flagpole.wav";
import AudioPlayer from "./AudioPlayer";

class Level {
  finished: boolean;
  levelId: number;
  context: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  player: Player;
  camera: Camera;
  enemies: Enemy[];
  levelData: any;
  pole: any;
  castle: any;

  constructor(levelId: number, canvas: HTMLCanvasElement) {
    this.finished = false;
    this.levelData = level1Data;
    this.enemies = this.levelData.enemies.map((enemyData: any) => {
      return new Enemy(enemyData.x, enemyData.y, enemyData.type);
    });

    this.pole = { type: "Pole", x: 198, y: 12 };
    this.castle = { type: "Castle", x: 202, y: 6 };
    this.levelId = levelId;
    this.canvas = canvas;
    this.context = canvas.getContext("2d")!;
    this.player = new Player();
    this.camera = new Camera(this.context);
  }

  updateCamera() {
    // update player and Camera
    if (this.camera.position + 0x03000 / 0x100 > this.player.positionX)
      this.camera.updateCamera(0);
    else if (this.camera.position + 0x07000 / 0x100 > this.player.positionX)
      this.camera.updateCamera(this.player.speedX / 2);
    else
      this.camera.updateCamera(this.player.speedX);
  }

  renderBlocks() {
    this.levelData.blocks.forEach((block: any) => {
      if (block.type === "Pipe")
        this.camera.drawBlock(...Textures.getBlocks(block.type, block.top, block.left), block.x * 16 - Math.round(this.camera.position), 0x0E000 / 0x100 - block.y * 16);
      else
        this.camera.drawBlock(...Textures.getBlocks(block.type), block.x * 16 - Math.round(this.camera.position), 0x0E000 / 0x100 - block.y * 16);
    });
    this.camera.drawPole(this.pole.x * 16 - Math.round(this.camera.position), 0x0E000 / 0x100 - this.pole.y * 16);
    this.camera.drawCastle(this.castle.x * 16 - Math.round(this.camera.position), 0x0E000 / 0x100 - this.castle.y * 16);
  }

  renderPlayer() {
    let x = this.player.positionX - this.camera.position;
    let y = 0x0E000 / 0x100 - this.player.positionY;
    let texture: marioTexture;
    if (this.player.dead)
      texture = "dying";
    else if (!this.player.grounded)
      texture = "jumping";
    else
      texture = (this.player.speedX != 0) ? "running" : "standing";
    this.camera.drawSprite(...Textures.getMario(texture, this.player.size, Math.floor(this.player.animationCounter / 6) + 1), x, y - (this.player.size - 1) * 16, 16, 16 * this.player.size, this.player.facing === "left");
    this.player.animationCounter = (this.player.animationCounter + 1) % 18 + 1;
  }

  updatePlayer() {
    if (this.player.positionY < 0)
      this.player.die();

    // detect collision
    if (!this.player.controls.disabled) {
      this.player.handleCollision(this.levelData.blocks);
      this.player.handleEnemyCollision(this.enemies);
    }

    // update player position
    if (!this.finished) {
      this.player.positionX += this.player.speedX;
      this.player.positionY += this.player.speedY;
    }

    this.player.gravity(this.player.controls.flags.space);

    if (this.player.positionX < this.camera.position)
      this.player.positionX = this.camera.position;

    // console.log(this.player.positionX, this.player.positionY);

    this.checkForFinish();

    this.renderPlayer();
  }

  checkForFinish() {
    // console.log(this.player.positionX / 16);
    if (this.player.positionX / 16 >= 197.5) {
      if (!this.finished)
        AudioPlayer.playAudio(flagpole);

      this.finished = true;
      this.player.controls.disabled = true;
      this.player.speedX = 0x000000000000001;

      if (this.player.positionX / 16 <= 204) {
        this.player.positionX += 0x00130 / 0x100;
        this.player.positionY = 0x02000 / 0x100;
        if (this.player.positionY < 0x02000 / 0x100) {
          this.player.speedY = 0;
          this.player.grounded = true;
        }
      } else {
        this.player.speedX = 0;
        this.player.positionY = 0x02000 / 0x100;
        this.player.grounded = true;
        setTimeout(() => document.getElementById("won")!.style.display = "flex", 500);
      };
    }
  }

  updateEnemies() {
    this.enemies.forEach((enemy: Enemy) => {
      if (!enemy.spawned)
        enemy.spawned = Math.abs((this.player.positionX - enemy.x) / 16) <= 16;
      else if (!enemy.dead) {
        let targetX = enemy.x + enemy.speedX;
        if (enemy.speedX < 0) {
          if (!this.levelData.blocks.some((block: any) => block.x == Math.floor(targetX / 16) && block.y == Math.floor(enemy.y / 16)))
            enemy.x = targetX;
          else {
            enemy.x -= enemy.speedX;
            enemy.speedX *= -1;
          }
        } else if (!this.levelData.blocks.some((block: any) => block.x - 1 == Math.floor(targetX / 16) && block.y == Math.floor(enemy.y / 16)))
          enemy.x = targetX;
        else {
          enemy.x -= enemy.speedX;
          enemy.speedX *= -1;
        }
        this.renderEnemy(enemy);
      }
    });
  }

  renderEnemy(enemy: Enemy) {
    this.camera.drawEnemy(enemy.x - Math.round(this.camera.position), 0x0E000 / 0x100 - enemy.y, Math.floor(this.player.animationCounter / 9) + 1);
  }
}

export default Level;