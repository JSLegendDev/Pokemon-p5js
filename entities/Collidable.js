import { debugMode } from "../utils/DebugMode.js";

export class Collidable {
  constructor(p, x, y, width, height) {
    this.p = p;
    this.tag = "box";
    this.x = x;
    this.y = y;
    this.screenX = this.x;
    this.screenY = this.y;
    this.width = width;
    this.height = height;
  }

  preventPassthroughFrom(entity) {
    const collision = !(
      this.x + this.width < entity.x ||
      this.x > entity.x + entity.width ||
      this.y + this.height < entity.y ||
      this.y > entity.y + entity.height
    );

    if (collision) {
      const overlapX =
        Math.min(this.x + this.width, entity.x + entity.width) -
        Math.max(this.x, entity.x);
      const overlapY =
        Math.min(this.y + this.height, entity.y + entity.height) -
        Math.max(this.y, entity.y);

      if (overlapX < overlapY) {
        if (this.x < entity.x) {
          // right
          entity.x = this.x + this.width;
        } else {
          // left
          entity.x = this.x - this.width;
        }
      } else {
        if (this.y < entity.y) {
          // bottom
          entity.y = this.y + this.height;
        } else {
          // top
          entity.y = this.y - entity.height;
        }
      }
    }
  }

  update(camera) {
    this.screenX = this.x + camera.getPosX();
    this.screenY = this.y + camera.getPosY();
  }

  draw() {
    debugMode.drawHitbox(this.p, this);
  }
}
