export class TestBox {
  constructor(p, x, y, width, height) {
    this.p = p;
    this.tag = "box";
    this.x = x;
    this.y = y;
    this.worldX = this.x;
    this.worldY = this.y;
    this.width = width;
    this.height = height;
  }

  draw(camera) {
    this.worldX = this.x + camera.getPosX();
    this.worldY = this.y + camera.getPosY();

    this.p.rect(this.worldX, this.worldY, this.width, this.height);
  }
}
