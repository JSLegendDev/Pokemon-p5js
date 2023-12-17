import { makePlayer } from "./entities/player.js";
import { makeMenu } from "./scenes/menu.js";
import { makeTiledMap } from "./maps/map.js";
import { debugMode } from "./utils/debugMode.js";
import { makeCamera } from "./utils/camera.js";

new p5((p) => {
  let font;
  const scenes = ["menu", "world", "battle"];
  let currentScene = "menu";

  const camera = makeCamera(p, 100, 0);

  const menu = makeMenu(p);
  const player = makePlayer(p, 150, 200);
  const map = makeTiledMap(p, 100, -150);

  p.preload = () => {
    font = p.loadFont("./power-clear.ttf");
    map.load("./assets/Trainer Tower interior.png", "./maps/world.json");
    menu.loadAssets();
    player.loadAssets();
  };

  p.setup = () => {
    const canvasEl = p.createCanvas(512, 384);
    canvasEl.canvas.style = "";
    map.prepareTiles();
    const spawnPoints = map.getSpawnPoints();
    for (const spawnPoint of spawnPoints) {
      if (spawnPoint.name === "player") {
        player.x = spawnPoint.x;
        player.y = map.y + spawnPoint.y + 32;
      }
    }
    player.prepareAnims();
    player.setAnim("idle-down");
    camera.attachTo(player);
  };

  p.draw = () => {
    switch (currentScene) {
      case "menu":
        menu.draw();
        break;
      case "world":
        camera.update();
        p.clear();
        p.background(0);
        player.update(); // this being before the map draw call is important
        map.draw(camera, player);
        player.draw(camera);
        break;
      default:
    }

    debugMode.drawFpsCounter(p, font);
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
