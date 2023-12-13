export class TestBox {
  constructor(p, x, y, width, height) {
    this.p = p;
    this.tag = "box";
    this.x = x;
    this.y = y;
    this.screenX = this.x;
    this.screenY = this.y;
    this.width = width;
    this.height = height;
    this.isColliding = false;
  }

  draw(camera) {
    this.screenX = this.x + camera.getPosX();
    this.screenY = this.y + camera.getPosY();

    this.p.rect(this.screenX, this.screenY, this.width, this.height);
  }
}
