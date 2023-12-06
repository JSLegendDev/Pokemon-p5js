export function makePlayer(p) {
  const data = {
    playerSprite: null,
    frames: [],
    anims: {},
    currentAnim: null,
    currentFrame: 0,
    animationTimer: 0,
  };

  const methods = {
    loadAssets() {
      data.playerSprite = p.loadImage("assets/boy_run.png");
    },
    prepareAnims() {
      const nbColumns = 4;
      const nbRows = 4;
      const tileWidth = 32;
      const tileHeight = 48;

      let currentTileX = 0;
      let currentTileY = 0;
      for (let i = 0; i < nbRows; i++) {
        for (let j = 0; j < nbColumns; j++) {
          data.frames.push({ x: currentTileX, y: currentTileY });
          currentTileX += tileWidth;
        }
        currentTileX = 0;
        currentTileY += tileHeight;
      }

      data.anims = {
        "idle-down": 0,
        "idle-side": 4,
        "idle-up": 12,
        "run-down": { from: 0, to: 3, loop: true, speed: 8 },
        "run-side": { from: 4, to: 7, loop: true, speed: 8 },
        "run-up": { from: 12, to: 15 },
      };
    },
    setAnim(name) {
      data.currentAnim = name;
      data.currentFrame = 0;
      data.animationTimer = 0;
      data.previousTime = 0;
    },
    update() {},
    draw() {
      data.previousTime = data.animationTimer;
      data.animationTimer += p.deltaTime;
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

      p.noSmooth();
      p.image(
        data.playerSprite,
        200,
        200,
        32,
        48,
        frameData.x,
        frameData.y,
        32,
        48
      );
    },
  };

  return { ...data, ...methods };
}
