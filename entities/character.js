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

  setAnim(character, name) {
    character.currentAnim = name;
    character.currentFrame = 0;
    character.animationTimer = 0;
    character.previousTime = 0;
  },

  setAnimFrame(character, animData) {
    if (typeof animData === "number") {
      character.currentFrame = animData;
      return character.frames[character.currentFrame];
    }

    if (character.currentFrame === 0) {
      character.currentFrame = animData.from;
    }

    if (character.currentFrame > animData.to && animData.loop) {
      character.currentFrame = animData.from;
    }

    const currentFrame = character.frames[character.currentFrame];

    const durationPerFrame = 1000 / animData.speed;
    if (character.animationTimer >= durationPerFrame) {
      character.currentFrame++;
      character.animationTimer -= durationPerFrame;
    }

    return currentFrame;
  },
};
