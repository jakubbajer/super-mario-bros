import Controls from "./Controls";
import Player from "./Player";
import level1Data from "../worlds/world1-1.json";
import Camera from "./Camera";
import world1_1 from "../../assets/sprites/world1-1.png";
import Textures from "./Textures";


class Level {
  levelId: number;
  context: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  player: Player;
  controls: Controls;
  camera: Camera;

  constructor(levelId: number, canvas: HTMLCanvasElement) {
    this.levelId = levelId;
    this.canvas = canvas;
    this.context = canvas.getContext("2d")!;
    this.player = new Player(this.context, level1Data);
    this.camera = new Camera(this.context, world1_1);
    this.controls = new Controls(this.player);
  }

  updatePlayer() {
    if (this.camera.position + 0x03000 / 0x100 > this.player.positionX)
      this.camera.updateCamera(0);
    else if (this.camera.position + 0x07000 / 0x100 > this.player.positionX)
      this.camera.updateCamera(this.player.velocityX / 2);
    else
      this.camera.updateCamera(this.player.velocityX);
    this.player.positionX += this.player.velocityX;
    if (this.player.positionX < this.camera.position)
      this.player.positionX = this.camera.position;

    this.renderMario(this.player.positionX - this.camera.position, this.player.positionY);
  }

  renderMario(x: number, y: number) {
    let texture: "running" | "standing" | "dying" | "jumping" = (this.player.velocityX != 0) ? "running" : "standing";
    this.camera.drawSprite(...Textures.getMario(texture, Math.floor(this.player.animationCounter / 6) + 1), x, y + 0x0C000 / 0x100, 16, 16, this.player.velocityX < 0);
    this.player.animationCounter = (this.player.animationCounter + 1) % 18 + 1;
  }
}

export default Level;