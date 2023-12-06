export function makeMenu(p) {
  const data = {
    startScreen: null,
    startTextImg: null,
    easing: 0.5,
    alpha: 255,
    blinkBack: false,
  };

  const methods = {
    loadAssets() {
      data.startScreen = p.loadImage("./title.png");
      data.startTextImg = p.loadImage("./start.png");
    },

    drawMenu() {
      p.clear();
      p.noSmooth();
      p.noTint();
      p.image(data.startScreen, 0, 0);
      if (data.alpha <= 0) data.blinkBack = true;
      if (data.alpha >= 255) data.blinkBack = false;

      if (data.blinkBack) {
        data.alpha += 0.7 * data.easing * p.deltaTime;
      } else {
        data.alpha -= 0.7 * data.easing * p.deltaTime;
      }
      p.tint(255, data.alpha);
      p.image(data.startTextImg, 0, 320);
    },
  };

  return {
    ...data,
    ...methods,
  };
}
