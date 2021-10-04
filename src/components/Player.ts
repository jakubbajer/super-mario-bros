class Player {
  position: number;

  constructor() {
    this.position = 0;
  }

  moveRight() {
    this.position += 4;
    console.log(this.position);
  }
}

export default Player;