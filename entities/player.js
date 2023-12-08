import { getFramesPos } from "../utils/spritesheetUtils.js";

export function makePlayer(p, x, y) {
  const data = {
    playerSprite: null,
    frames: [],
    anims: {},
    currentAnim: null,
    currentFrame: 0,
    animationTimer: 0,
    tileWidth: 32,
    tileHeight: 48,
    direction: "down",
    speed: 200,
    x,
    y,
  };

  const methods = {
    loadAssets() {
      data.playerSprite = p.loadImage("assets/boy_run.png");
    },
    prepareAnims() {
      data.frames = getFramesPos(4, 4, data.tileWidth, data.tileHeight);

      data.anims = {
        "idle-down": 0,
        "idle-side": 6,
        "idle-up": 12,
        "run-down": { from: 0, to: 3, loop: true, speed: 8 },
        "run-side": { from: 4, to: 7, loop: true, speed: 8 },
        "run-up": { from: 12, to: 15, loop: true, speed: 8 },
      };
    },
    setAnim(name) {
      data.currentAnim = name;
      data.currentFrame = 0;
      data.animationTimer = 0;
      data.previousTime = 0;
    },
    getDirection() {
      return data.direction;
    },
    setDirection(direction) {
      data.direction = direction;
    },
    setPos(x, y) {
      data.x = x;
      data.y = y;
    },
    getPos() {
      return { x: data.x, y: data.y };
    },
    movePlayer(moveBy) {
      let isOnlyOneKeyDown = false;
      for (const key of [
        p.RIGHT_ARROW,
        p.LEFT_ARROW,
        p.UP_ARROW,
        p.DOWN_ARROW,
      ]) {
        if (isOnlyOneKeyDown && p.keyIsDown(key)) {
          return;
        }

        if (!isOnlyOneKeyDown && p.keyIsDown(key)) {
          isOnlyOneKeyDown = true;
        }
      }

      if (p.keyIsDown(p.RIGHT_ARROW)) {
        if (data.direction !== "right") methods.setDirection("right");
        if (data.currentAnim !== "run-side") methods.setAnim("run-side");
        data.x += moveBy;
      }

      if (p.keyIsDown(p.LEFT_ARROW)) {
        if (data.direction !== "left") methods.setDirection("left");
        if (data.currentAnim !== "run-side") methods.setAnim("run-side");
        data.x -= moveBy;
      }

      if (p.keyIsDown(p.UP_ARROW)) {
        if (data.direction !== "up") methods.setDirection("up");
        if (data.currentAnim !== "run-up") methods.setAnim("run-up");
        data.y -= moveBy;
      }

      if (p.keyIsDown(p.DOWN_ARROW)) {
        if (data.direction !== "down") methods.setDirection("down");
        if (data.currentAnim !== "run-down") methods.setAnim("run-down");
        data.y += moveBy;
      }
    },
    update() {
      data.previousTime = data.animationTimer;
      data.animationTimer += p.deltaTime;

      const moveBy = (data.speed / 1000) * p.deltaTime;
      methods.movePlayer(moveBy);
    },
    draw() {
      const animData = data.anims[data.currentAnim];
      let frameData;
      if (typeof animData === "number") {
        data.currentFrame = animData;
        frameData = data.frames[data.currentFrame];
      } else {
        if (data.currentFrame === 0) {
          data.currentFrame = animData.from;
        }

        if (data.currentFrame > animData.to && animData.loop) {
          data.currentFrame = animData.from;
        }

        frameData = data.frames[data.currentFrame];

        if (data.animationTimer >= 1000 / animData.speed) {
          data.currentFrame++;
          data.animationTimer -= 1000 / animData.speed;
        }
      }

      p.push();
      if (data.direction === "right") {
        p.scale(-1, 1);
        p.translate(-2 * data.x - data.tileWidth, 0);
      }
      p.noSmooth();
      p.image(
        data.playerSprite,
        data.x,
        data.y,
        data.tileWidth,
        data.tileHeight,
        frameData.x,
        frameData.y,
        // need to offset this by one because
        // the first pixel is accounted for by the origin
        data.tileWidth - 1,
        data.tileHeight - 1
      );
      p.pop();
    },
  };

  return { ...methods };
}
