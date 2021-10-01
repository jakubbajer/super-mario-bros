import world1_1 from "../../assets/sprites/world1-1.png";

class Level {
  levelId: number;

  constructor(levelId: number) {
    this.levelId = levelId;
  }

  async getLevelBackground(ctx: CanvasRenderingContext2D) {
    let image = new Image();

    image.src = world1_1;

    image.onload = () => {
      Promise
        .all([createImageBitmap(image)])
        .then((sprites) => {
          ctx.drawImage(sprites[0], 0, 0, 3376, 480);
        });
    };
  }

  start(canvas: HTMLCanvasElement) {
    const ctx: CanvasRenderingContext2D = canvas.getContext("2d")!;
    this.getLevelBackground(ctx);
  }
}

export default Level;