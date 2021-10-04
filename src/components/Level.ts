import world1_1 from "../../assets/sprites/world1-1.png";
import Camera from "./Camera";
import Controls from "./Controls";
import Player from "./Player";

class Level {
  levelId: number;
  camera: Camera;
  context: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  player: Player;
  controls: Controls;

  constructor(levelId: number, canvas: HTMLCanvasElement) {
    this.levelId = levelId;
    this.canvas = canvas;
    this.context = canvas.getContext("2d")!;
    this.camera = new Camera(this.context, world1_1);
    this.camera.updateCamera(0);
    this.player = new Player();
    this.controls = new Controls(this.player, this.camera);
  }
}

export default Level;