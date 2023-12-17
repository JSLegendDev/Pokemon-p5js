import { getFramesPos } from "../utils/spritesheetUtils";
import { characterProps, characterInterface } from "./Character";

export function makeNPC(p, x, y) {
  return {
    p,
    x,
    y,
    ...characterProps,
    loadAssets() {
      this.spriteRef = characterInterface.loadAssets(
        this.p,
        "assets/trainer_GENTLEMAN.png"
      );
    },

    prepareAnims() {
      this.frames = getFramesPos(4, 4, this.tileWidth, this.tileHeight);

      this.anims = {
        "idle-down": 0,
      };
    },

    setAnim(name) {
      characterInterface.setAnim(this, name);
    },
  };
}
