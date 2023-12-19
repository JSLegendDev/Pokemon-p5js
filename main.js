import { makeMenu } from "./scenes/menu.js";
import { debugMode } from "./utils/debugMode.js";
import { makeWorld } from "./scenes/world.js";

new p5((p) => {
  let font;
  const scenes = ["menu", "world", "battle"];
  let currentScene = "menu";
  function setScene(name) {
    if (scenes.includes(name)) {
      currentScene = name;
    }
  }

  const menu = makeMenu(p);
  const world = makeWorld(p, setScene);

  p.preload = () => {
    font = p.loadFont("./power-clear.ttf");
    world.load();
    menu.load();
  };

  p.setup = () => {
    const canvasEl = p.createCanvas(512, 384);
    canvasEl.canvas.style = "";

    p.textFont(font);

    world.setup();
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
        p.clear();
        p.background(0);
        p.color("yellow");
        p.text("BATTLE SCENE PLACEHOLDER", 200, 200);
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
