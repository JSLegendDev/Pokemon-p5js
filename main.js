import { makePlayer } from "./entities/player.js";
import { makeMenu } from "./scenes/menu.js";
import { drawFpsCounter } from "./utils/debug.js";

new p5((p) => {
  let font;
  const scenes = ["menu", "world", "battle"];
  let currentScene = "world";
  const menu = makeMenu(p);
  const player = makePlayer(p);

  p.preload = () => {
    font = p.loadFont("./power-clear.ttf");
    menu.loadAssets();
    player.loadAssets();
  };

  p.setup = () => {
    const canvasEl = p.createCanvas(512, 384);
    canvasEl.canvas.style = "";
    player.prepareAnims();
    player.setAnim("run-side");
  };

  p.draw = () => {
    switch (currentScene) {
      case "menu":
        menu.draw();
        break;
      case "world":
        p.clear();
        p.background(51);
        p.fill("yellow");
        p.textSize(32);
        player.draw();
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
