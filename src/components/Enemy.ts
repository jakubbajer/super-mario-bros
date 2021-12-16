class Enemy {
  x: number;
  y: number;
  speedX: number;
  spawned: boolean;
  dead: boolean;
  type: "goomba";

  constructor(x: number, y: number, type: "goomba") {
    this.x = x * 16;
    this.speedX = -0x00130 / 0x100;
    this.y = y * 16;
    this.type = type;
    this.spawned = false;
    this.dead = false;
  }
}

export default Enemy;