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
