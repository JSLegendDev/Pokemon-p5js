export class Menu {
  constructor(p) {
    this.p = p;
    this.startScreen = null;
    this.startTextImg = null;
    this.easing = 0.5;
    this.alpha = 255;
    this.blinkBack = false;
  }

  loadAssets() {
    this.startScreen = this.p.loadImage("assets/title.png");
    this.startTextImg = this.p.loadImage("assets/start.png");
  }

  draw() {
    this.p.clear();
    this.p.noSmooth();
    this.p.image(this.startScreen, 0, 0);
    if (this.alpha <= 0) this.blinkBack = true;
    if (this.alpha >= 255) this.blinkBack = false;

    if (this.blinkBack) {
      this.alpha += 0.7 * this.easing * this.p.deltaTime;
    } else {
      this.alpha -= 0.7 * this.easing * this.p.deltaTime;
    }
    this.p.tint(255, this.alpha);
    this.p.image(this.startTextImg, 0, 320);
    this.p.noTint();
  }
}
