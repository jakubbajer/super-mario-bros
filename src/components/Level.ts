type marioTexture = "running" | "standing" | "dying" | "jumping";

import Controls from "./Controls";
import Player from "./Player";
import Textures from "./Textures";
import Camera from "./Camera";
import level1Data from "../worlds/world1-1.json";

class Level {
  levelId: number;
  context: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  player: Player;
  camera: Camera;
  levelData: any;
  pole: any;
  castle: any;

  constructor(levelId: number, canvas: HTMLCanvasElement) {
    this.levelData = level1Data;
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
    if (!this.player.grounded)
      texture = "jumping";
    else
      texture = (this.player.speedX != 0) ? "running" : "standing";
    this.camera.drawSprite(...Textures.getMario(texture, Math.floor(this.player.animationCounter / 6) + 1), x, y, 16, 16, this.player.facing === "left");
    this.player.animationCounter = (this.player.animationCounter + 1) % 18 + 1;
  }

  updatePlayer() {
    // detect collision
    this.player.handleCollision(this.levelData.blocks);

    // update player position
    this.player.positionX += this.player.speedX;
    this.player.positionY += this.player.speedY;

    this.player.gravity(this.player.controls.flags.space);

    if (this.player.positionX < this.camera.position)
      this.player.positionX = this.camera.position;

    // this.updateCamera();

    // console.log(this.player.positionX / 16, this.player.speedX, this.player.positionY / 16, this.player.speedY, this.player.grounded);

    this.checkForFinish();

    this.renderPlayer();
  }

  checkForFinish() {
    // console.log(this.player.positionX / 16);
    if (this.player.positionX / 16 >= 197.5) {
      this.player.controls.disabled = true;
      this.player.speedX = 0x000000000000000001;

      if (this.player.positionX / 16 <= 204 && this.player.grounded) {
        this.player.positionX += 0x00130 / 0x100;
      } else this.player.speedX = 0;
    }
  }
}

export default Level;