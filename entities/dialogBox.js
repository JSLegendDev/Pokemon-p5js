export function makeDialogBox(p, x, y) {
  return {
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
      this.spriteRef = p.loadImage("assets/overlay_message.png");
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
      this.currentTime += p.deltaTime;
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
      p.image(this.spriteRef, this.x, this.y);
      p.fill("black");
      p.textSize(24);
      p.text(this.line, this.x + 30, this.y + 42);
    },
  };
}
