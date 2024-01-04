import { characterProps, characterInterface } from "./character.js";
import {
  drawTile,
  getFramesPos,
  debugMode,
  checkCollision,
  preventOverlap,
} from "../utils.js";

export function makeNPC(p, x, y) {
  return {
    p,
    x,
    y,
    screenX: x,
    screenY: y,
    spriteX: 0,
    spriteY: -15,
    ...characterProps,
    load() {
      this.spriteRef = characterInterface.loadAssets(
        p,
        "assets/trainer_GENTLEMAN.png"
      );
    },

    prepareAnims() {
      this.frames = getFramesPos(4, 4, this.tileWidth, this.tileHeight);

      this.anims = {
        "idle-down": 0,
      };
    },

    setAnim(name) {
      characterInterface.setAnim(this, name);
    },

    update() {
      this.previousTime = this.animationTimer;
      this.animationTimer += p.deltaTime;
      const animData = this.anims[this.currentAnim];
      this.currentFrameData = characterInterface.setAnimFrame(this, animData);
    },

    draw(camera) {
      this.screenX = this.x + camera.x;
      this.screenY = this.y + camera.y;

      p.noSmooth();
      debugMode.drawHitbox(p, this);
      drawTile(
        p,
        this.spriteRef,
        this.screenX + this.spriteX,
        this.screenY + this.spriteY,
        this.currentFrameData.x,
        this.currentFrameData.y,
        this.tileWidth,
        this.tileHeight
      );
    },

    handleCollisionsWith(entity, collisionEvent) {
      // If the player has already collided and is frozen due to dialog
      // no need to recompute collision
      if (entity.freeze) return;

      const collision = checkCollision(this, entity);

      if (collision) {
        preventOverlap(this, entity);
        entity.freeze = true;
        collisionEvent();
      }
    },
  };
}
