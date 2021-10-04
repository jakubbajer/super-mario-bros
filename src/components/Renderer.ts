class Renderer {
  canvas: HTMLCanvasElement;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
  }

  render = () => {
    // console.log("rendering");

    window.requestAnimationFrame(this.render);
  };
}

export default Renderer;