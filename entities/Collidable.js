import { debugMode } from "./debugMode.js";

export function makeCollidable(p, x, y, width, height) {
  return {
    x,
    y,
    screenX: x,
    screenY: y,
    width,
    height,
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
    },

    update(camera) {
      this.screenX = this.x + camera.x;
      this.screenY = this.y + camera.y;
    },

    draw() {
      debugMode.drawHitbox(p, this);
    },
  };
}
