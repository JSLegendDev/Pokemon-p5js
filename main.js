import { makeMenu } from "./scenes/menu.js";
import { debugMode } from "./utils/debugMode.js";
import { makeWorld } from "./scenes/world.js";
import { makeBattle } from "./scenes/battle.js";

new p5((p) => {
  let font;
  const scenes = ["menu", "world", "battle"];
  let currentScene = "battle";
  function setScene(name) {
    if (scenes.includes(name)) {
      currentScene = name;
    }
  }

  const menu = makeMenu(p);
  const world = makeWorld(p, setScene);
  const battle = makeBattle(p);

  p.preload = () => {
    font = p.loadFont("./power-clear.ttf");
    world.load();
    menu.load();
    battle.load();
  };

  p.setup = () => {
    const canvasEl = p.createCanvas(512, 384);
    canvasEl.canvas.style = "";

    p.textFont(font);

    world.setup();
    battle.setup();
  };

  p.draw = () => {
    switch (currentScene) {
      case "menu":
        menu.draw();
        break;
      case "world":
        world.draw();
        break;
      case "battle":
        battle.draw();
        break;
      default:
    }

    debugMode.drawFpsCounter(p);
  };

  p.keyPressed = () => {
    if (p.keyCode === 112) {
      debugMode.toggle();
    }

    if (p.keyCode === p.ENTER) {
      switch (currentScene) {
        case "menu":
          currentScene = scenes[1];
          break;
        case "world":
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
      world.keyReleased();
    }
  };
});
