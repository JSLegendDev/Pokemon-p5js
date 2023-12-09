export function getFramesPos(nbCols, nbRows, tileWidth, tileHeight) {
  const framesPos = [];
  let currentTileX = 0;
  let currentTileY = 0;
  for (let i = 0; i < nbRows; i++) {
    for (let j = 0; j < nbCols; j++) {
      framesPos.push({ x: currentTileX, y: currentTileY });
      currentTileX += tileWidth;
    }
    currentTileX = 0;
    currentTileY += tileHeight;
  }

  return framesPos;
}

export function drawTile(
  p,
  src,
  destinationX,
  destinationY,
  srcX,
  srcY,
  tileWidth,
  tileHeight
) {
  p.image(
    src,
    destinationX,
    destinationY,
    tileWidth,
    tileHeight,
    srcX,
    srcY,
    // need to offset this by one because
    // the first pixel is accounted for by the origin
    tileWidth - 1,
    tileHeight - 1
  );
}
