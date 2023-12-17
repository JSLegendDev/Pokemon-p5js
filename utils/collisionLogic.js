export function checkCollision(objA, objB) {
  return !(
    objA.x + objA.width < objB.x ||
    objA.x > objB.x + objB.width ||
    objA.y + objA.height < objB.y ||
    objA.y > objB.y + objB.height
  );
}

export function preventOverlap(objA, objB) {
  const overlapX =
    Math.min(objA.x + objA.width, objB.x + objB.width) -
    Math.max(objA.x, objB.x);
  const overlapY =
    Math.min(objA.y + objA.height, objB.y + objB.height) -
    Math.max(objA.y, objB.y);

  if (overlapX < overlapY) {
    if (objA.x < objB.x) {
      // right
      objB.x = objA.x + objA.width;
    } else {
      // left
      objB.x = objA.x - objA.width;
    }
  } else {
    if (objA.y < objB.y) {
      // bottom
      objB.y = objA.y + objA.height;
    } else {
      // top
      objB.y = objA.y - objB.height;
    }
  }
}
