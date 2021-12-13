import mario from "/assets/images/mario.png";
import tiles from "/assets/images/tiles.png";
import background from "/assets/images/world1-1-bg.png";

class Camera {
  context: CanvasRenderingContext2D;
  mario: HTMLImageElement;
  tiles: HTMLImageElement;
  background: HTMLImageElement;
  position: number;

  constructor(ctx: CanvasRenderingContext2D) {
    this.position = 0;
    this.context = ctx;
    this.mario = new Image();
    this.mario.src = mario;
    this.tiles = new Image();
    this.tiles.src = tiles;
    this.background = new Image();
    this.background.src = background;
  };

  updateCamera(velocity: number) {
    this.context.clearRect(0, 0, 3376, 480);
    if (velocity > 0)
      this.position += velocity;
    this.context.drawImage(this.background, Math.round(-this.position), 0);
  }

  drawSprite(sx: number, sy: number, sWidth: number, sHeight: number, dx: number, dy: number, dWidth: number, dHeight: number, mirrored: boolean) {
    if (mirrored) {
      this.context.save();
      this.context.scale(-1, 1);
      this.context.drawImage(this.mario, sx, sy, sWidth, sHeight, -dx - 16, dy, dWidth, dHeight);
      this.context.restore();
    } else
      this.context.drawImage(this.mario, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
  }

  drawBlock(sx: number, sy: number, dx: number, dy: number) {
    this.context.drawImage(this.tiles, sx, sy, 16, 16, dx, dy, 16, 16);
  }

  drawPole(dx: number, dy: number) {
    this.context.drawImage(this.tiles, 0, 588, 15, 160, dx, dy, 16, 160);
  }

  drawCastle(dx: number, dy: number) {
    this.context.drawImage(this.tiles, 24, 684, 80, 80, dx, dy, 80, 80);
  }
}

export default Camera;