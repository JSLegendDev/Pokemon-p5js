export function getFramesPos(nbColumns, nbRows, tileWidth, tileHeight) {
  const framesPos = [];
  let currentTileX = 0;
  let currentTileY = 0;
  for (let i = 0; i < nbRows; i++) {
    for (let j = 0; j < nbColumns; j++) {
      framesPos.push({ x: currentTileX, y: currentTileY });
      currentTileX += tileWidth;
    }
    currentTileX = 0;
    currentTileY += tileHeight;
  }

  return framesPos;
}
