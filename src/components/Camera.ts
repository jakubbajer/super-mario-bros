class Camera {
  context: CanvasRenderingContext2D;
  imageSrc: any;
  image: any;

  constructor(ctx: CanvasRenderingContext2D, imageSrc: any) {
    this.context = ctx;
    this.imageSrc = imageSrc;
    this.image = new Image();
    this.image.src = this.imageSrc;
    this.image.onload = () => this.context.drawImage(this.image, 0, 0, 3376, 480);
  };

  // TODO: rework the positioning and camera positioning system
  updateCamera(position: number) {
    this.context.drawImage(this.image, -position, 0, 3376, 480);
  }
}

export default Camera;