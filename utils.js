import { characterInterface } from "../entities/character.js";

export function makeCamera(p, x, y) {
  return {
    p,
    x,
    y,
    prevX: x,
    prevY: y,
    attachTo(entity) {
      this.entity = entity;
    },

    update() {
      this.x = -this.entity.x + this.p.width / 2;
      this.y = -this.entity.y + this.p.height / 2;
    },
  };
}

export function checkCollision(objA, objB) {
  return !(
    objA.x + objA.width < objB.x ||
    objA.x > objB.x + objB.width ||
    objA.y + objA.height < objB.y ||
    objA.y > objB.y + objB.height
  );
}

export function preventOverlap(objA, objB) {
  const overlapX =
    Math.min(objA.x + objA.width, objB.x + objB.width) -
    Math.max(objA.x, objB.x);
  const overlapY =
    Math.min(objA.y + objA.height, objB.y + objB.height) -
    Math.max(objA.y, objB.y);

  if (overlapX < overlapY) {
    if (objA.x < objB.x) {
      // right
      objB.x = objA.x + objA.width;
    } else {
      // left
      objB.x = objA.x - objA.width;
    }
  } else {
    if (objA.y < objB.y) {
      // bottom
      objB.y = objA.y + objA.height;
    } else {
      // top
      objB.y = objA.y - objB.height;
    }
  }
}

function makeDebugMode() {
  return {
    enabled: false,
    drawFpsCounter(p) {
      if (!this.enabled) return;
      p.push();
      p.fill("yellow");
      p.textSize(24);
      p.text(Math.trunc(p.frameRate()), 10, 20);
      p.pop();
    },

    toggle() {
      this.enabled = !this.enabled;
    },

    drawHitbox(p, hitbox) {
      if (!this.enabled) return;
      p.fill(255, 0, 0, 63);
      p.rect(hitbox.screenX, hitbox.screenY, hitbox.width, hitbox.height);
    },
  };
}

export const debugMode = makeDebugMode();

export function isMaxOneKeyDown(p) {
  let isOnlyOneKeyDown = false;
  for (const key of [p.RIGHT_ARROW, p.LEFT_ARROW, p.UP_ARROW, p.DOWN_ARROW]) {
    if (!isOnlyOneKeyDown && p.keyIsDown(key)) {
      isOnlyOneKeyDown = true;
      continue;
    }

    if (isOnlyOneKeyDown && p.keyIsDown(key)) {
      return false;
    }
  }

  return true;
}

export function getFramesPos(nbCols, nbRows, tileWidth, tileHeight) {
  const framesPos = [];
  let currentTileX = 0;
  let currentTileY = 0;
  for (let i = 0; i < nbRows; i++) {
    for (let j = 0; j < nbCols; j++) {
      framesPos.push({ x: currentTileX, y: currentTileY });
      currentTileX += tileWidth;
    }
    currentTileX = 0;
    currentTileY += tileHeight;
  }

  return framesPos;
}

export function drawTile(
  p,
  src,
  destinationX,
  destinationY,
  srcX,
  srcY,
  tileWidth,
  tileHeight
) {
  p.image(
    src,
    destinationX,
    destinationY,
    tileWidth,
    tileHeight,
    srcX,
    srcY,
    // need to offset this by one because
    // the first pixel is accounted for by the origin
    tileWidth - 1,
    tileHeight - 1
  );
}

export function makeDialogBox(p, x, y) {
  return {
    p,
    x,
    y,
    spriteRef: null,
    currentTime: 0,
    previousTime: 0,
    lineChars: null,
    line: "",
    isVisible: false,
    onCompleteCallback: null,
    isComplete: false,
    load() {
      this.spriteRef = characterInterface.loadAssets(
        this.p,
        "./assets/overlay_message.png"
      );
    },

    setVisibility(isVisible) {
      this.isVisible = isVisible;
    },

    displayTextImmediately(content) {
      this.line = content;
      this.isComplete = true;
    },

    displayText(content, onComplete) {
      this.lineChars = content.split("");
      this.isComplete = false;
      if (onComplete) {
        this.onCompleteCallback = onComplete;
        return;
      }

      this.onCompleteCallback = null;
    },

    clearText() {
      this.line = "";
      this.lineChars = [];
    },

    update() {
      if (!this.isVisible) return;
      this.currentTime += this.p.deltaTime;
      const durationPerFrame = 1000 / 60;
      if (this.currentTime >= durationPerFrame) {
        this.currentTime -= durationPerFrame;

        const nextChar = this.lineChars.shift();

        if (this.isComplete) return;

        if (!nextChar && !this.isComplete) {
          this.isComplete = true;
          if (this.onCompleteCallback) this.onCompleteCallback();
          return;
        }

        this.line += nextChar;
      }
    },
    draw() {
      if (!this.isVisible) return;
      this.p.noSmooth();
      this.p.image(this.spriteRef, this.x, this.y);
      this.p.fill("black");
      this.p.textSize(24);
      this.p.text(this.line, this.x + 30, this.y + 42);
    },
  };
}
