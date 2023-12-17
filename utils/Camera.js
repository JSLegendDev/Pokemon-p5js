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
