import { drawTile, getFramesPos } from "../utils/spritesheetUtils.js";

export class Player {
  constructor(p, x, y) {
    this.p = p;
    this.playerSprite = null;
    this.frames = [];
    this.anims = {};
    this.currentAnim = null;
    this.currentFrame = 0;
    this.animationTimer = 0;
    this.tileWidth = 32;
    this.tileHeight = 48;
    this.direction = "down";
    this.speed = 200;
    this.x = x;
    this.y = y;
    this.hitbox = {
      tag: "player",
      x: this.x,
      y: this.y,
      width: 32,
      height: 32,
      offsetX: 0,
      offsetY: 10,
    };
  }
  loadAssets() {
    this.playerSprite = this.p.loadImage("assets/boy_run.png");
  }
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
  }
  setAnim(name) {
    this.currentAnim = name;
    this.currentFrame = 0;
    this.animationTimer = 0;
    this.previousTime = 0;
  }
  movePlayer(moveBy) {
    let isOnlyOneKeyDown = false;
    for (const key of [
      this.p.RIGHT_ARROW,
      this.p.LEFT_ARROW,
      this.p.UP_ARROW,
      this.p.DOWN_ARROW,
    ]) {
      if (isOnlyOneKeyDown && this.p.keyIsDown(key)) {
        return;
      }

      if (!isOnlyOneKeyDown && this.p.keyIsDown(key)) {
        isOnlyOneKeyDown = true;
      }
    }

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
  }
  update() {
    this.previousTime = this.animationTimer;
    this.animationTimer += this.p.deltaTime;

    const moveBy = (this.speed / 1000) * this.p.deltaTime;
    this.movePlayer(moveBy);
  }
  draw(camera) {
    const animData = this.anims[this.currentAnim];
    let frameData;
    if (typeof animData === "number") {
      this.currentFrame = animData;
      frameData = this.frames[this.currentFrame];
    } else {
      if (this.currentFrame === 0) {
        this.currentFrame = animData.from;
      }

      if (this.currentFrame > animData.to && animData.loop) {
        this.currentFrame = animData.from;
      }

      frameData = this.frames[this.currentFrame];

      if (this.animationTimer >= 1000 / animData.speed) {
        this.currentFrame++;
        this.animationTimer -= 1000 / animData.speed;
      }
    }

    this.hitbox.x = this.x + this.hitbox.offsetX + camera.getPosX();
    this.hitbox.y = this.y + this.hitbox.offsetY + camera.getPosY();

    this.p.push();
    if (this.direction === "right") {
      this.p.scale(-1, 1);
      this.p.translate(-2 * (this.x + camera.getPosX()) - this.tileWidth, 0);
    }
    this.p.noSmooth();
    drawTile(
      this.p,
      this.playerSprite,
      this.x + camera.getPosX(),
      this.y + camera.getPosY(),
      frameData.x,
      frameData.y,
      this.tileWidth,
      this.tileHeight
    );
    this.p.pop();
  }
  getHitbox() {
    return this.hitbox;
  }
}
