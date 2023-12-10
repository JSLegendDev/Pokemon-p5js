export class Camera {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  setPos(x, y) {
    this.x = x;
    this.y = y;
  }

  getPos() {
    return { x: this.x, y: this.y };
  }
}
