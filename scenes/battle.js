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
      playerAttack: "player-attack",
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
      isAttacking: false,
      attacks: [
        { name: "TACKLE", power: 10, type: "normal" },
        { name: "HYDRO PUMP", power: 110, type: "water" },
        { name: "HYDRO CANNON", power: 90, type: "water" },
        { name: "WATER GUN", power: 50, type: "water" },
      ],
      selectedAttack: null,
    },
    dataBox: {
      x: 510,
      y: 220,
      spriteRef: null,
      healthBarLength: 96,
    },
    dataBoxFoe: {
      x: -300,
      y: 40,
      spriteRef: null,
      healthBarLength: 96,
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
                        () => {
                          setTimeout(() => {
                            this.currentState = this.states.playerTurn;
                          }, 1000);
                        }
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
      if (this.dataBoxFoe.healthBarLength > 50) {
        this.p.fill(0, 200, 0);
      }
      if (this.dataBoxFoe.healthBarLength < 50) {
        this.p.fill(255, 165, 0);
      }
      if (this.dataBoxFoe.healthBarLength < 20) {
        this.p.fill(200, 0, 0);
      }
      this.p.rect(
        this.dataBoxFoe.x + 118,
        this.dataBoxFoe.y + 40,
        this.dataBoxFoe.healthBarLength,
        6
      );
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
      this.p.rect(
        this.dataBox.x + 136,
        this.dataBox.y + 40,
        this.dataBox.healthBarLength,
        6
      );
      this.p.pop();

      if (
        this.currentState === this.states.default ||
        this.currentState === this.states.introNpc
      )
        this.p.image(this.npc.spriteRef, this.npc.x, this.npc.y);

      if (
        this.currentState === this.states.playerTurn &&
        !this.playerPokemon.selectedAttack
      ) {
        console.log(this.playerPokemon.selectedAttack);
        this.dialogBox.displayTextImmediately(
          `1) ${this.playerPokemon.attacks[0].name}    3) ${this.playerPokemon.attacks[2].name}\n2) ${this.playerPokemon.attacks[1].name}   4) ${this.playerPokemon.attacks[3].name}`
        );
      }

      if (
        this.currentState === this.states.playerTurn &&
        this.playerPokemon.selectedAttack &&
        !this.playerPokemon.isAttacking
      ) {
        console.log(this.currentState);
        this.dialogBox.clearText();
        this.dialogBox.displayText(
          `${this.playerPokemon.name} used ${this.playerPokemon.selectedAttack.name} !`,
          () => {
            this.dataBoxFoe.healthBarLength -=
              this.playerPokemon.selectedAttack.power;
            setTimeout(() => {
              this.dialogBox.clearText();
              this.currentState = this.states.npcTurn;
            }, 1000);
          }
        );
        this.playerPokemon.isAttacking = true;
      }

      if (this.currentState === this.states.npcTurn) {
        console.log("it's npc's turn");
        this.dialogBox.clearText();
        this.dialogBox.displayText(
          `The foe's ${this.npcPokemon.name} used TACKLE !`,
          () => {
            this.dataBox.healthBarLength -= 10;
            setTimeout(() => {
              this.playerPokemon.selectedAttack = null;
              this.playerPokemon.isAttacking = false;
            }, 1000);
          }
        );
        this.currentState = this.states.playerTurn;
      }

      this.dialogBox.update();
      this.dialogBox.draw();
    },
    onKeyPressed(keyEvent) {
      if (this.currentState === this.states.playerTurn) {
        switch (keyEvent.key) {
          case "1":
            this.playerPokemon.selectedAttack = this.playerPokemon.attacks[0];
            break;
          case "2":
            this.playerPokemon.selectedAttack = this.playerPokemon.attacks[1];
            break;
          case "3":
            this.playerPokemon.selectedAttack = this.playerPokemon.attacks[2];
            break;
          case "4":
            this.playerPokemon.selectedAttack = this.playerPokemon.attacks[3];
            break;
          default:
        }
      }
    },
  };
}
