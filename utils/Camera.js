export class Camera {
  constructor(p, x, y) {
    this.p = p;
    this.x = x;
    this.y = y;
    this.prevX = this.x;
    this.prevY = this.y;
  }

  update() {
    if (this.p.keyIsDown(this.p.RIGHT_ARROW))
      this.x += (200 / 1000) * this.p.deltaTime;

    if (this.p.keyIsDown(this.p.LEFT_ARROW))
      this.x -= (200 / 1000) * this.p.deltaTime;
  }

  setPosX(x) {
    this.prevX = this.x;
    this.x = x;
  }

  setPosY(y) {
    this.prevY = this.y;
    this.y = y;
  }

  getPosX() {
    return this.x;
  }

  getPosY() {
    return this.y;
  }
}
