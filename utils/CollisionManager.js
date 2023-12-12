export class CollisionManager {
  constructor() {
    this.collidables = [];
  }

  addCollidable(object) {
    this.collidables.push(object);
  }

  checkCollision(A, B) {
    if (
      A.worldX + A.width >= B.x &&
      A.worldX <= B.x + B.width &&
      A.worldY + A.height >= B.y &&
      A.worldY <= B.y + B.height
    ) {
      return true;
    }
  }

  checkCollisionsFor(object) {
    for (const collidable of this.collidables) {
      if (collidable.tag === object.tag) continue;

      if (this.checkCollision(collidable, object)) {
        return true;
      }
    }

    return false;
  }
}
