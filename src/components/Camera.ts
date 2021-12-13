import mario from "../../assets/sprites/mario.png";

class Camera {
  context: CanvasRenderingContext2D;
  imageSrc: string;
  background: HTMLImageElement;
  mario: HTMLImageElement;
  position: number;

  constructor(ctx: CanvasRenderingContext2D, imageSrc: string) {
    this.position = 0;
    this.context = ctx;
    this.imageSrc = imageSrc;
    this.background = new Image();
    this.background.src = this.imageSrc;
    this.background.onload = () => this.context.drawImage(this.background, 0, 0, 3376, 480);
    this.mario = new Image();
    this.mario.src = mario;
  };

  updateCamera(velocity: number) {
    this.context.clearRect(0, 0, 3376, 480);
    if (velocity > 0)
      this.position += velocity;
    this.context.globalAlpha = 0.5;
    this.context.drawImage(this.background, -this.position, 0, 3376, 480);
    this.context.globalAlpha = 1;
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
}

export default Camera;