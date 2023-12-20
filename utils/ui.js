import { characterInterface } from "../entities/character.js";

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
        "assets/overlay_message.png"
      );
    },

    setVisibility(isVisible) {
      this.isVisible = isVisible;
    },

    setText(content) {
      this.lineChars = content.split("");
      this.isComplete = false;
    },

    clearText() {
      this.line = "";
      this.lineChars = [];
    },

    onComplete(callback) {
      this.onCompleteCallback = callback;
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
          this.onCompleteCallback();
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
