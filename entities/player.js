import {
  drawTile,
  getFramesPos,
  isMaxOneKeyDown,
  debugMode,
} from "../utils.js";
import { characterProps, characterInterface } from "./character.js";

export function makePlayer(p, x, y) {
  return {
    p,
    ...characterProps,
    direction: "down",
    speed: 200,
    x,
    y,
    screenX: x,
    screenY: y,
    spriteX: 0,
    spriteY: -15,
    freeze: false,
    load() {
      this.spriteRef = characterInterface.loadAssets(
        this.p,
        "assets/boy_run.png"
      );
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
      characterInterface.setAnim(this, name);
    },

    movePlayer(moveBy) {
      if (!isMaxOneKeyDown(this.p) || this.freeze) return;

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

    update() {
      this.previousTime = this.animationTimer;
      this.animationTimer += this.p.deltaTime;

      const moveBy = (this.speed / 1000) * this.p.deltaTime;
      this.movePlayer(moveBy);

      const animData = this.anims[this.currentAnim];
      this.currentFrameData = characterInterface.setAnimFrame(this, animData);
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
        this.spriteRef,
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
