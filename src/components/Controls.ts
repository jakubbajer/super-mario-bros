import Player from "./Player";

class Controls {
  player: Player;

  constructor(player: Player) {
    this.player = player;
    window.addEventListener("keydown", (event) => this.handleInput(event));
  }

  handleInput(event: KeyboardEvent) {
    switch (event.key) {
      case "ArrowUp":
        break;

      case "ArrowDown":
        break;

      case "ArrowLeft":
        this.player.walkAccelerate(false);
        break;

      case "ArrowRight":
        this.player.walkAccelerate(true);
        break;
    }
  }
}

export default Controls;