import { debugMode } from "../utils/debugMode.js";
import { drawTile, getFramesPos } from "../utils/spritesheetUtils.js";

export function makePlayer(p, x, y) {
  return {
    p,
    playerSprite: null,
    anims: {},
    currentAnim: null,
    currentFrame: 0,
    currentFrameData: null,
    animationTimer: 0,
    tileWidth: 32,
    tileHeight: 48,
    direction: "down",
    speed: 200,
    x,
    y,
    screenX: x,
    screenY: y,
    width: 32,
    height: 32,
    spriteX: 0,
    spriteY: -15,
    loadAssets() {
      this.playerSprite = this.p.loadImage("assets/boy_run.png");
    },

    prepareAnims() {
      this.frames = getFramesPos(4, 4, this.tileWidth, this.tileHeight);

      this.anims = {
        "idle-down": 0,
        "idle-side": 6,
        "idle-up": 12,
        "run-down": { from: 0, to: 3, loop: true, speed: 8 },
        "run-side": { from: 4, to: 7, loop: true, speed: 8 },
        "run-up": { from: 12, to: 15, loop: true, speed: 8 },
      };
    },

    setAnim(name) {
      this.currentAnim = name;
      this.currentFrame = 0;
      this.animationTimer = 0;
      this.previousTime = 0;
    },

    isMaxOneKeyDown() {
      let isOnlyOneKeyDown = false;
      for (const key of [
        this.p.RIGHT_ARROW,
        this.p.LEFT_ARROW,
        this.p.UP_ARROW,
        this.p.DOWN_ARROW,
      ]) {
        if (!isOnlyOneKeyDown && this.p.keyIsDown(key)) {
          isOnlyOneKeyDown = true;
          continue;
        }

        if (isOnlyOneKeyDown && this.p.keyIsDown(key)) {
          return false;
        }
      }

      return true;
    },

    movePlayer(moveBy) {
      if (!this.isMaxOneKeyDown()) return;

      if (this.p.keyIsDown(this.p.RIGHT_ARROW)) {
        if (this.direction !== "right") this.direction = "right";
        if (this.currentAnim !== "run-side") this.setAnim("run-side");
        this.x += moveBy;
      }

      if (this.p.keyIsDown(this.p.LEFT_ARROW)) {
        if (this.direction !== "left") this.direction = "left";
        if (this.currentAnim !== "run-side") this.setAnim("run-side");
        this.x -= moveBy;
      }

      if (this.p.keyIsDown(this.p.UP_ARROW)) {
        if (this.direction !== "up") this.direction = "up";
        if (this.currentAnim !== "run-up") this.setAnim("run-up");
        this.y -= moveBy;
      }

      if (this.p.keyIsDown(this.p.DOWN_ARROW)) {
        if (this.direction !== "down") this.direction = "down";
        if (this.currentAnim !== "run-down") this.setAnim("run-down");
        this.y += moveBy;
      }
    },

    setAnimFrame(animData) {
      if (typeof animData === "number") {
        this.currentFrame = animData;
        return this.frames[this.currentFrame];
      }

      if (this.currentFrame === 0) {
        this.currentFrame = animData.from;
      }

      if (this.currentFrame > animData.to && animData.loop) {
        this.currentFrame = animData.from;
      }

      const currentFrame = this.frames[this.currentFrame];

      if (this.animationTimer >= 1000 / animData.speed) {
        this.currentFrame++;
        this.animationTimer -= 1000 / animData.speed;
      }

      return currentFrame;
    },

    update() {
      this.previousTime = this.animationTimer;
      this.animationTimer += this.p.deltaTime;

      const moveBy = (this.speed / 1000) * this.p.deltaTime;
      this.movePlayer(moveBy);

      const animData = this.anims[this.currentAnim];
      this.currentFrameData = this.setAnimFrame(animData);
    },

    draw(camera) {
      this.screenX = this.x + camera.x;
      this.screenY = this.y + camera.y;

      this.p.push();
      if (this.direction === "right") {
        this.p.scale(-1, 1);
        this.p.translate(-2 * this.screenX - this.tileWidth, 0);
      }
      this.p.noSmooth();
      debugMode.drawHitbox(this.p, this);
      drawTile(
        this.p,
        this.playerSprite,
        this.screenX + this.spriteX,
        this.screenY + this.spriteY,
        this.currentFrameData.x,
        this.currentFrameData.y,
        this.tileWidth,
        this.tileHeight
      );
      this.p.pop();
    },
  };
}
