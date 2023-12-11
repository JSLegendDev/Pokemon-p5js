export class Camera {
  constructor(p, x, y) {
    this.p = p;
    this.x = x;
    this.y = y;
    this.prevX = this.x;
    this.prevY = this.y;
  }

  attachTo(entity) {
    this.entity = entity;
  }

  update() {
    this.x = -this.entity.x + this.p.width / 2;
    this.y = -this.entity.y + this.p.height / 2;
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
