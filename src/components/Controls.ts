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
        break;

      case "ArrowRight":

        break;

    }
  }
}

export default Controls;