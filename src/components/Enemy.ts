class Enemy {
  x: number;
  y: number;
  speedX: number;
  speedY: number;
  spawned: boolean;
  dead: boolean;
  type: "goomba" | "1up";

  constructor(x: number, y: number, type: "goomba" | "1up") {
    this.x = x * 16;
    this.y = y * 16;
    this.type = type;
    this.speedX = ((this.type == "goomba") ? -0x00130 : 0x00200) / 0x100;
    this.speedY = -0x00400 / 0x100;
    this.spawned = false;
    this.dead = false;
  }
}

export default Enemy;