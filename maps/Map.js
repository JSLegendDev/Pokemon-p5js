import { Collidable } from "../entities/Collidable.js";
import { drawTile, getFramesPos } from "../utils/spritesheetUtils.js";

export class TiledMap {
  constructor(p, x, y) {
    this.p = p;
    this.tileWidth = 32;
    this.tileHeight = 32;
    this.x = x;
    this.y = y;
  }

  async load(tilesetURL, tiledMapURL) {
    this.mapImage = this.p.loadImage(tilesetURL);
    const response = await fetch(tiledMapURL);
    this.tiledData = await response.json();
  }

  prepareTiles() {
    this.tilesPos = getFramesPos(8, 55, this.tileWidth, this.tileHeight);
  }

  getSpawnPoints() {
    for (const layer of this.tiledData.layers) {
      if (layer.name === "SpawnPoints") {
        return layer.objects;
      }
    }
  }

  draw(camera, player) {
    for (const layer of this.tiledData.layers) {
      if (layer.type === "tilelayer") {
        const currentTilePos = {
          x: this.x,
          y: this.y,
        };
        let nbOfTilesDrawn = 0;
        for (const tileNumber of layer.data) {
          if (nbOfTilesDrawn % layer.width === 0) {
            currentTilePos.x = 0;
            currentTilePos.y += this.tileHeight;
          } else {
            currentTilePos.x += this.tileWidth;
          }
          nbOfTilesDrawn++;

          if (tileNumber === 0) continue;

          drawTile(
            this.p,
            this.mapImage,
            currentTilePos.x + camera.getPosX(),
            currentTilePos.y + camera.getPosY(),
            this.tilesPos[tileNumber - 1].x,
            this.tilesPos[tileNumber - 1].y,
            this.tileWidth,
            this.tileHeight
          );
        }
      }

      if (layer.type === "objectgroup" && layer.name === "Boundaries") {
        for (const boundary of layer.objects) {
          const collidable = new Collidable(
            this.p,
            boundary.x,
            this.y + boundary.y + 32,
            boundary.width,
            boundary.height
          );
          collidable.preventPassthroughFrom(player);
          collidable.update(camera);
          collidable.draw();
        }
      }
    }
  }
}
