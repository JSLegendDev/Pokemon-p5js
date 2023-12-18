import { characterProps, characterInterface } from "./character.js";
import { debugMode } from "../utils/debugMode.js";
import { drawTile, getFramesPos } from "../utils/spritesheetUtils.js";
import { checkCollision, preventOverlap } from "../utils/collisionLogic.js";

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
        this.p,
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
      this.animationTimer += this.p.deltaTime;
      const animData = this.anims[this.currentAnim];
      this.currentFrameData = characterInterface.setAnimFrame(this, animData);
    },

    draw(camera) {
      this.screenX = this.x + camera.x;
      this.screenY = this.y + camera.y;

      this.p.noSmooth();
      debugMode.drawHitbox(this.p, this);
      drawTile(
        this.p,
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
      const collision = checkCollision(this, entity);

      if (collision) {
        preventOverlap(this, entity);
        entity.freeze = true;
        collisionEvent();
      }
    },
  };
}
