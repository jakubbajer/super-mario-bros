import Level from "./Level";
import Renderer from "./Renderer";

class Game {
  container: HTMLCanvasElement;
  renderer: Renderer;
  level: Level | undefined;

  constructor(container: HTMLCanvasElement) {
    this.container = container;
    this.renderer = new Renderer(container);
    this.renderer.render();
    this.init();
  }

  init() {
    this.level = new Level(1);
    this.level.start(this.container);
  }
}

export default Game;