export function drawFpsCounter(p, font) {
  p.textFont(font);
  p.textSize(24);
  p.text(Math.trunc(p.frameRate()), 10, 17);
}
