class Camera {
  context: CanvasRenderingContext2D;
  imageSrc: any;
  image: any;

  constructor(ctx: CanvasRenderingContext2D, imageSrc: any) {
    this.context = ctx;
    this.imageSrc = imageSrc;
  };

  updateCamera(position: number) {
    this.image = new Image();
    this.image.src = this.imageSrc;
    this.context.drawImage(this.image, -position, 0, 3376, 480);
  }
}

export default Camera;