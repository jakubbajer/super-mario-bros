// min walk velocity - 00130
// walking acceleration - 00098
// running acceleration - 000E4
// release deceleration - 000D0
// skidding deceleration - 0001A
import world1_1 from "../../assets/sprites/world1-1-bg.png";
import Camera from "./Camera";

class Player {
  positionX: number;
  velocity: number;
  camera: Camera;
  context: CanvasRenderingContext2D;

  constructor(ctx: CanvasRenderingContext2D) {
    this.positionX = 0x0;
    this.velocity = 0x190 / 0x100;
    this.context = ctx;
    this.camera = new Camera(this.context, world1_1);
  }

  update() {
    this.positionX += this.velocity;

    this.camera.updateCamera(this.positionX);
    window.requestAnimationFrame(this.update.bind(this));
  }
}

export default Player;