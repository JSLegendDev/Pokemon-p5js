import { makeDialogBox } from "../utils/ui.js";

export function makeBattle(p) {
  return {
    p,
    dialogBox: makeDialogBox(p, 0, 288),
    states: {
      default: "default",
      introNpc: "intro-npc",
      introNpcPokemon: "intro-npc-pokemon",
      introPlayerPokemon: "intro-player-pokemon",
      playerTurn: "player-turn",
      npcTurn: "npc-turn",
      battleEnd: "battle-end",
    },
    currentState: "default",
    npc: {
      x: 350,
      y: 20,
      spriteRef: null,
    },
    npcPokemon: {
      name: "VENUSAUR",
      finalX: 310,
      x: 600,
      y: 20,
      spriteRef: null,
      hp: 100,
    },
    playerPokemon: {
      name: "BLASTOISE",
      finalX: 20,
      x: -170,
      y: 128,
      spriteRef: null,
      hp: 100,
    },
    dataBox: {
      x: 510,
      y: 220,
      spriteRef: null,
    },
    dataBoxFoe: {
      x: -300,
      y: 40,
      spriteRef: null,
    },
    load() {
      this.battleBackgroundImage = this.p.loadImage(
        "assets/battle-background.png"
      );
      this.npc.spriteRef = this.p.loadImage("assets/GENTLEMAN.png");
      this.npcPokemon.spriteRef = this.p.loadImage("assets/VENUSAUR.png");
      this.playerPokemon.spriteRef = this.p.loadImage("assets/BLASTOISE.png");
      this.dataBox.spriteRef = this.p.loadImage("assets/databox_thin.png");
      this.dataBoxFoe.spriteRef = this.p.loadImage(
        "assets/databox_thin_foe.png"
      );
      this.dialogBox.load();
    },
    setup() {
      this.dialogBox.displayText("Mark the gentleman wants to battle !", () => {
        setTimeout(() => {
          this.currentState = this.states.introNpc;
          this.dialogBox.clearText();
          this.dialogBox.displayText(
            `He sends out a ${this.npcPokemon.name} !`,
            () => {
              this.currentState = this.states.introNpcPokemon;
              setTimeout(() => {
                this.dialogBox.clearText();
                this.dialogBox.displayText(
                  `Go! ${this.playerPokemon.name} !`,
                  () => {
                    this.currentState = this.states.introPlayerPokemon;
                    setTimeout(() => {
                      this.dialogBox.clearText();
                      this.dialogBox.displayText(
                        `What will ${this.playerPokemon.name} do ?`,
                        () => {}
                      );
                    }, 1000);
                  }
                );
              }, 1000);
            }
          );
        }, 2000);
      });
      this.dialogBox.setVisibility(true);
    },
    draw() {
      this.p.clear();
      this.p.background(0);
      this.p.image(this.battleBackgroundImage, 0, 0);
      if (this.currentState === this.states.introNpc) {
        this.npc.x += 0.5 * this.p.deltaTime;
      }

      if (
        this.currentState === this.states.introNpcPokemon &&
        this.npcPokemon.x >= this.npcPokemon.finalX
      ) {
        this.npcPokemon.x -= 0.5 * this.p.deltaTime;
        if (this.dataBoxFoe.x <= 0) this.dataBoxFoe.x += 0.5 * this.p.deltaTime;
      }

      this.p.image(
        this.npcPokemon.spriteRef,
        this.npcPokemon.x,
        this.npcPokemon.y
      );

      this.p.image(
        this.dataBoxFoe.spriteRef,
        this.dataBoxFoe.x,
        this.dataBoxFoe.y
      );
      this.p.text(
        this.npcPokemon.name,
        this.dataBoxFoe.x + 15,
        this.dataBoxFoe.y + 30
      );

      this.p.push();
      this.p.angleMode(this.p.DEGREES);
      this.p.rotate(360);
      this.p.noStroke();
      this.p.fill(0, 200, 0);
      this.p.rect(this.dataBoxFoe.x + 118, this.dataBoxFoe.y + 40, 96, 6);
      this.p.pop();

      if (
        this.currentState === this.states.introPlayerPokemon &&
        this.playerPokemon.x <= this.playerPokemon.finalX
      ) {
        this.playerPokemon.x += 0.5 * this.p.deltaTime;
        this.dataBox.x -= 0.65 * this.p.deltaTime;
      }

      this.p.image(
        this.playerPokemon.spriteRef,
        this.playerPokemon.x,
        this.playerPokemon.y
      );

      this.p.image(this.dataBox.spriteRef, this.dataBox.x, this.dataBox.y);

      this.p.text(
        this.playerPokemon.name,
        this.dataBox.x + 38,
        this.dataBox.y + 30
      );

      this.p.push();
      this.p.angleMode(this.p.DEGREES);
      this.p.rotate(360);
      this.p.noStroke();
      this.p.fill(0, 200, 0);
      this.p.rect(this.dataBox.x + 136, this.dataBox.y + 40, 96, 6);
      this.p.pop();

      if (
        this.currentState === this.states.default ||
        this.currentState === this.states.introNpc
      )
        this.p.image(this.npc.spriteRef, this.npc.x, this.npc.y);
      this.dialogBox.update();
      this.dialogBox.draw();
    },
  };
}
