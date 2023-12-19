export const characterProps = {
  spriteRef: null,
  anims: {},
  currentAnim: null,
  currentFrame: 0,
  currentFrameData: null,
  animationTimer: 0,
  previousTime: 0,
  tileWidth: 32,
  tileHeight: 48,
  width: 32,
  height: 32,
};

export const characterInterface = {
  loadAssets(p, assetPath) {
    return p.loadImage(assetPath);
  },

  setAnim(context, name) {
    context.currentAnim = name;
    context.currentFrame = 0;
    context.animationTimer = 0;
    context.previousTime = 0;
  },

  setAnimFrame(context, animData) {
    if (typeof animData === "number") {
      context.currentFrame = animData;
      return context.frames[context.currentFrame];
    }

    if (context.currentFrame === 0) {
      context.currentFrame = animData.from;
    }

    if (context.currentFrame > animData.to && animData.loop) {
      context.currentFrame = animData.from;
    }

    const currentFrame = context.frames[context.currentFrame];

    const durationPerFrame = 1000 / animData.speed;
    if (context.animationTimer >= durationPerFrame) {
      context.currentFrame++;
      context.animationTimer -= durationPerFrame;
    }

    return currentFrame;
  },
};
