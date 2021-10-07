class Camera {
  context: CanvasRenderingContext2D;
  imageSrc: string;
  image: HTMLImageElement;
  position: number;

  constructor(ctx: CanvasRenderingContext2D, imageSrc: string) {
    this.position = 0;
    this.context = ctx;
    this.imageSrc = imageSrc;
    this.image = new Image();
    this.image.src = this.imageSrc;
    this.image.onload = () => this.context.drawImage(this.image, 0, 0, 3376, 480);
  };

  updateCamera(velocity: number) {
    if (velocity > 0)
      this.position += velocity;
    this.context.drawImage(this.image, -this.position, 0, 3376, 480);
  }
}

export default Camera;