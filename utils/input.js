export function isMaxOneKeyDown(p) {
  let isOnlyOneKeyDown = false;
  for (const key of [p.RIGHT_ARROW, p.LEFT_ARROW, p.UP_ARROW, p.DOWN_ARROW]) {
    if (!isOnlyOneKeyDown && p.keyIsDown(key)) {
      isOnlyOneKeyDown = true;
      continue;
    }

    if (isOnlyOneKeyDown && p.keyIsDown(key)) {
      return false;
    }
  }

  return true;
}
