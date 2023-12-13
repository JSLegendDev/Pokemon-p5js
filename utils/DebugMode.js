export class DebugMode {
  constructor(p, font) {
    this.p = p;
    this.font = font;
    this.enabled = false;
  }

  drawFpsCounter(font) {
    if (!this.enabled) return;
    this.p.textFont(font);
    this.p.textSize(24);
    this.p.text(Math.trunc(this.p.frameRate()), 10, 20);
  }

  toggle() {
    this.enabled = !this.enabled;
  }

  drawHitbox(hitbox) {
    if (!this.enabled) return;
    this.p.rect(hitbox.screenX, hitbox.screenY, hitbox.width, hitbox.height);
  }

  drawTestCollider(camera) {
    if (!this.enabled) return;
    this.p.rect(100 + camera.getPosX(), 100 + camera.getPosY(), 30, 30);
  }
}
