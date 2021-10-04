class Renderer {
  canvas: HTMLCanvasElement;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
  }

  render = () => {
    window.requestAnimationFrame(this.render);
  };
}

export default Renderer;