import Camera from "./Camera";
import Player from "./Player";

class Controls {
  player: Player;
  camera: Camera;

  constructor(player: Player, camera: Camera) {
    this.player = player;
    this.camera = camera;
    window.addEventListener("keydown", (event) => this.handleInput(event));
  }

  handleInput(event: KeyboardEvent) {
    switch (event.key) {
      case "ArrowUp":
        break;

      case "ArrowDown":
        break;

      case "ArrowLeft":
        break;

      case "ArrowRight":
        this.player.moveRight();
        this.camera.updateCamera(this.player.position);
        break;

    }
  }
}

export default Controls;