import Player from "./Player";

class Controls {
  player: Player;
  flags: any;
  counter: number;

  constructor(player: Player) {
    this.player = player;
    this.counter = 0;
    this.flags = {
      arrowRight: false,
      arrowLeft: false,
      arrowUp: false,
      arrowDown: false,
      shift: false
    };
    window.addEventListener("keydown", e => this.handleDown(e));
    window.addEventListener("keyup", e => this.handleUp(e));
  }

  handleDown(event: KeyboardEvent) {
    switch (event.key) {
      case "Shift":
        this.flags.shift = true;
        break;

      case "ArrowUp":
        this.flags.arrowUp = true;
        break;

      case "ArrowDown":
        this.flags.arrowDown = true;
        break;

      case "ArrowLeft":
        this.flags.arrowLeft = true;
        break;

      case "ArrowRight":
        this.flags.arrowRight = true;
        break;
    }
  }

  handleUp(event: KeyboardEvent) {
    switch (event.key) {
      case "Shift":
        this.flags.shift = false;
        break;

      case "ArrowUp":
        this.flags.arrowUp = false;
        break;

      case "ArrowDown":
        this.flags.arrowDown = false;
        break;

      case "ArrowLeft":
        this.flags.arrowLeft = false;
        break;

      case "ArrowRight":
        this.flags.arrowRight = false;
        break;
    }
  }

  // handles the input every third frame, roughly at 20Hz,
  // which is about the speed NES handles input
  executeFlags() {
    if (this.counter == 3) {
      if (this.flags.arrowUp) {
        // this.player.accelerateUp()
      }
      if (this.flags.arrowDown) {
        //
      }
      if (this.flags.arrowLeft)
        this.player.accelerate(false, this.flags.shift);
      if (this.flags.arrowRight)
        this.player.accelerate(true, this.flags.shift);
      if (!(this.flags.arrowLeft || this.flags.arrowRight))
        this.player.decelerate();
    }
    this.counter = (this.counter + 1) % 4;
  }
}

export default Controls;