import { Player } from "./entities/Player.js";
import { Menu } from "./scenes/Menu.js";
import { drawFpsCounter } from "./utils/debugUtils.js";

new p5((p) => {
  let font;
  const scenes = ["menu", "world", "battle"];
  let currentScene = "menu";
  const menu = new Menu(p);
  const player = new Player(p, 200, 100);

  p.preload = () => {
    font = p.loadFont("./power-clear.ttf");
    menu.loadAssets();
    player.loadAssets();
  };

  p.setup = () => {
    const canvasEl = p.createCanvas(512, 384);
    canvasEl.canvas.style = "";
    player.prepareAnims();
    player.setAnim("idle-down");
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
        p.textSize(18);
        p.text("Hello World!", 100, 200);
        player.update();
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

  p.keyReleased = () => {
    if (currentScene === "world") {
      for (const key of [
        p.RIGHT_ARROW,
        p.LEFT_ARROW,
        p.UP_ARROW,
        p.DOWN_ARROW,
      ]) {
        if (p.keyIsDown(key)) {
          return;
        }
      }

      switch (player.direction) {
        case "up":
          player.setAnim("idle-up");
          break;
        case "down":
          player.setAnim("idle-down");
          break;
        case "left":
          player.setAnim("idle-side");
          break;
        case "right":
          player.setAnim("idle-side");
          break;
        default:
      }
    }
  };
});
