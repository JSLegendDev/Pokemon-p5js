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
      const nbColumns = 4;
      const nbRows = 4;

      let currentTileX = 0;
      let currentTileY = 0;
      for (let i = 0; i < nbRows; i++) {
        for (let j = 0; j < nbColumns; j++) {
          data.frames.push({ x: currentTileX, y: currentTileY });
          currentTileX += data.tileWidth;
        }
        currentTileX = 0;
        currentTileY += data.tileHeight;
      }

      data.anims = {
        "idle-down": 0,
        "idle-side": 4,
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
    update() {
      data.previousTime = data.animationTimer;
      data.animationTimer += p.deltaTime;

      const finalSpeed = (data.speed / 1000) * p.deltaTime;
      if (p.keyIsDown(p.RIGHT_ARROW)) {
        data.x += finalSpeed;
      }

      if (p.keyIsDown(p.LEFT_ARROW)) {
        data.x -= finalSpeed;
      }

      if (p.keyIsDown(p.UP_ARROW)) {
        data.y -= finalSpeed;
      }

      if (p.keyIsDown(p.DOWN_ARROW)) {
        data.y += finalSpeed;
      }
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
      console.log(data.direction);
      if (data.direction === "right") {
        p.scale(-1, 1);
        p.translate(-2 * data.x - data.tileWidth, 0);
      }
      p.noSmooth();
      p.image(
        data.playerSprite,
        data.x,
        data.y,
        32,
        48,
        frameData.x,
        frameData.y,
        32,
        48
      );
      p.pop();
    },
  };

  return { ...data, ...methods };
}
