export function makeMenu(p) {
  return {
    startScreen: null,
    startTextImg: null,
    easing: 0.5,
    alpha: 255,
    blinkBack: false,
    load() {
      this.startScreen = p.loadImage("./assets/title.png");
      this.startTextImg = p.loadImage("./assets/start.png");
    },
    update() {
      if (this.alpha <= 0) this.blinkBack = true;
      if (this.alpha >= 255) this.blinkBack = false;

      if (this.blinkBack) {
        this.alpha += 0.7 * this.easing * p.deltaTime;
      } else {
        this.alpha -= 0.7 * this.easing * p.deltaTime;
      }
    },
    draw() {
      p.clear();
      p.noSmooth();
      p.image(this.startScreen, 0, 0);
      p.tint(255, this.alpha);
      p.image(this.startTextImg, 0, 320);
      p.noTint();
    },
  };
}
