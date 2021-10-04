class Camera {
  context: CanvasRenderingContext2D;
  image: any;

  constructor(ctx: CanvasRenderingContext2D, image: any) {
    this.context = ctx;
    this.image = image;
  };

  updateCamera(position: number) {
    let image = new Image();
    image.src = this.image;
    image.onload = () => {
      this.context.drawImage(image, -position, 0, 3376, 480);
    };
  }
}

export default Camera;