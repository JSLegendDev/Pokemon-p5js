import { makeMenu } from "./scenes/menu.js";
import { debugMode } from "./entities/debugMode.js";
import { makeWorld } from "./scenes/world.js";
import { makeBattle } from "./scenes/battle.js";

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
  const battle = makeBattle(p);

  p.preload = () => {
    font = p.loadFont("./assets/power-clear.ttf");
    world.load();
    menu.load();
    battle.load();
  };

  p.setup = () => {
    const canvasEl = p.createCanvas(512, 384, document.getElementById("game"));
    // make canvas sharper temporarly
    p.pixelDensity(3);
    canvasEl.canvas.style = "";

    p.textFont(font);
    p.noSmooth(); // for pixels to not become blurry

    world.setup();
    battle.setup();
  };

  p.draw = () => {
    switch (currentScene) {
      case "menu":
        menu.update();
        menu.draw();
        break;
      case "world":
        world.update();
        world.draw();
        break;
      case "battle":
        battle.update();
        battle.draw();
        break;
      default:
    }

    debugMode.drawFpsCounter(p);
  };

  p.keyPressed = (keyEvent) => {
    if (keyEvent.key === "Shift") {
      debugMode.toggle();
    }

    if (keyEvent.keyCode === p.ENTER && currentScene === "menu")
      setScene("world");

    if (currentScene === "battle") battle.onKeyPressed(keyEvent);
  };

  p.keyReleased = () => {
    if (currentScene === "world") {
      world.keyReleased();
    }
  };
});
