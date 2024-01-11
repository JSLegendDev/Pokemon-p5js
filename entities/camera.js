export function makeCamera(p, x, y) {
  return {
    x,
    y,
    attachTo(entity) {
      this.entity = entity;
    },

    update() {
      this.x = -this.entity.x + p.width / 2;
      this.y = -this.entity.y + p.height / 2;
    },
  };
}
