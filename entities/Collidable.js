import { checkCollision, preventOverlap } from "../utils.js";
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
      const collision = checkCollision(this, entity);

      if (collision) preventOverlap(this, entity);
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
