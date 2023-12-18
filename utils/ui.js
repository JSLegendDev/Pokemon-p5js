import { characterInterface } from "../entities/character.js";

export function makeDialogBox(p, x, y) {
  return {
    p,
    x,
    y,
    spriteRef: null,
    load() {
      this.spriteRef = characterInterface.loadAssets(
        this.p,
        "assets/overlay_message.png"
      );
    },

    setVisibility(isVisible) {
      this.isVisible = isVisible;
    },

    update() {},
    draw() {
      if (!this.isVisible) return;
      this.p.noSmooth();
      this.p.image(this.spriteRef, this.x, this.y);
    },
  };
}
