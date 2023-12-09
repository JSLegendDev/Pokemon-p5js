export class TiledMap {
  constructor(p, tiledMapUrl, tilesetUrl, posX, posY) {
    this.p = p;
    this.tiledMapUrl = tiledMapUrl;
    this.tilesetUrl = tilesetUrl;
    this.posX = posX;
    this.posY = posY;
  }

  loadTiledMap() {
    fetch(this.tiledMapUrl).then((response) => {
      this.mapData = response.json();
      this.nbCols = this.mapData.width;
      this.nbRows = this.mapData.height;

      this.framesPos = getFramesPos(
        this.nbCols,
        this.nbRows,
        this.mapData.tilewidth,
        this.mapData.tilewidth
      );
    });
  }

  loadImgSrc() {
    this.tileset = this.p.loadImage(this.tilesetUrl);
  }

  drawMap() {
    for (const layer of mapData.layers) {
      if (layer.type === "tilelayer") {
        drawTileLayer(layer);
      }
    }
  }

  drawTileLayer(layer) {
    let currentTilePos = {
      x,
      y,
    };

    let tileNumberIndex = 0;

    for (let i = 0; i < this.nbRows; i++) {
      for (let j = 0; j < this.nbCols; j++) {
        const tileNumber = layer.data[tileNumberIndex];

        if (tileNumber !== 0) {
          const framePos = this.framesPos[tileNumber - 1];
          drawTile(
            p,
            this.tileset,
            currentTilePos.x,
            currentTilePos.y,
            framePos.x,
            framePos.y,
            this.mapData.tilewidth,
            this.mapData.tilewidth
          );
        }

        tileNumberIndex += 1;
        currentTilePos.x += this.mapData.tilewidth;
      }
      currentTilePos.x = 0;
      currentTilePos.y += this.mapData.tilewidth;
    }
  }
}
