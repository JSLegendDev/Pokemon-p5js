export class DebugMode {
  constructor() {
    this.enabled = false;
  }

  drawFpsCounter(p, font) {
    if (!this.enabled) return;
    p.fill("yellow");
    p.textFont(font);
    p.textSize(24);
    p.text(Math.trunc(p.frameRate()), 10, 20);
  }

  toggle() {
    this.enabled = !this.enabled;
  }

  drawHitbox(p, hitbox) {
    if (!this.enabled) return;
    p.fill(255, 0, 0, 63);
    p.rect(hitbox.screenX, hitbox.screenY, hitbox.width, hitbox.height);
  }
}

export const debugMode = new DebugMode();
