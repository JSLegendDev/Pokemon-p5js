export class CollisionManager {
  constructor() {
    this.collidables = [];
  }

  addCollidable(object) {
    this.collidables.push(object);
  }

  checkCollision(A, B) {
    if (
      A.screenX + A.width >= B.screenX &&
      A.screenX <= B.screenX + B.width &&
      A.screenY + A.height >= B.screenY &&
      A.screenY <= B.screenY + B.height
    ) {
      return true;
    }
  }

  checkCollisionsFor(object) {
    for (const collidable of this.collidables) {
      if (collidable.tag === object.hitbox.tag) continue;

      if (this.checkCollision(collidable, object.hitbox)) {
        if (!object.isColliding) {
          object.isColliding = true;
          object.directionOnCollision = object.direction;
        }
        return;
      }
    }

    object.isColliding = false;
  }
}
