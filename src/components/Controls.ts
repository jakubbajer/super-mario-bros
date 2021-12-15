import Player from "./Player";

class Controls {
  player: Player;
  flags: Flags;
  counter: number;

  constructor(player: Player) {
    this.player = player;
    this.counter = 0;
    this.flags = {
      arrowRight: false,
      arrowLeft: false,
      shift: false,
      space: false
    };
    window.addEventListener("keydown", e => this.handleDown(e));
    window.addEventListener("keyup", e => this.handleUp(e));
  }

  handleDown(event: KeyboardEvent) {
    switch (event.key) {
      case "ArrowUp":
      case " ":
      case "Spacebar":
        this.flags.space = true;
        break;

      case "Shift":
        this.flags.shift = true;
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
      case "ArrowUp":
      case " ":
      case "Spacebar":
        this.flags.space = false;
        break;

      case "Shift":
        this.flags.shift = false;
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
      if (this.flags.arrowRight && !(this.flags.arrowRight && this.flags.arrowLeft)) {
        this.player.facing = "right";
        this.player.accelerate(true, this.flags.shift);
      }
      else if (this.flags.arrowLeft && !(this.flags.arrowRight && this.flags.arrowLeft)) {
        this.player.facing = "left";
        this.player.accelerate(false, this.flags.shift);
      }
      if (!(this.flags.arrowLeft || this.flags.arrowRight))
        this.player.decelerate();
      if (this.flags.space && this.player.grounded) {
        this.player.jump();
      }
    }

    this.counter = (this.counter + 1) % 3 + 1;
  }
}

interface Flags {
  arrowRight: boolean;
  arrowLeft: boolean;
  shift: boolean;
  space: boolean;
}

export default Controls;