import Controls from "./Controls";
import Player from "./Player";
import Renderer from "./Renderer";

class Level {
  levelId: number;
  context: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  player: Player;
  controls: Controls;
  renderer: Renderer;

  constructor(levelId: number, canvas: HTMLCanvasElement, renderer: Renderer) {
    this.renderer = renderer;
    this.levelId = levelId;
    this.canvas = canvas;
    this.context = canvas.getContext("2d")!;
    this.player = new Player(this.context);
    this.controls = new Controls(this.player);
    this.player.update();
  }
}

export default Level;