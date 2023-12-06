import { makeMenu } from "./scenes/menu.js";
import { drawFpsCounter } from "./utils/debug.js";

new p5((p) => {
  let font;
  const scenes = ["menu", "world", "battle"];
  let currentScene = "menu";
  const menu = makeMenu(p);

  p.preload = () => {
    font = p.loadFont("./power-clear.ttf");
    menu.loadAssets();
  };

  p.setup = () => {
    const canvasEl = p.createCanvas(512, 384);
    canvasEl.canvas.style = "";
  };

  p.draw = () => {
    switch (currentScene) {
      case "menu":
        menu.drawMenu();
        break;
      case "world":
        p.clear();
        p.fill("yellow");
        p.textSize(32);
        p.text("Placeholder", 200, 200);
        break;
      default:
    }

    drawFpsCounter(p, font);
  };

  p.keyPressed = () => {
    if (p.keyCode === p.ENTER) {
      switch (currentScene) {
        case "menu":
          currentScene = scenes[1];
          break;
        case "world":
          currentScene = scenes[0];
          break;
        case "battle":
          // TODO
          break;
        default:
      }
    }
  };
});
