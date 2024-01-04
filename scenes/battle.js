import { makeDialogBox } from "../entities/dialogBox.js";

const states = {
  default: "default",
  introNpc: "intro-npc",
  introNpcPokemon: "intro-npc-pokemon",
  introPlayerPokemon: "intro-player-pokemon",
  playerTurn: "player-turn",
  playerAttack: "player-attack",
  npcTurn: "npc-turn",
  battleEnd: "battle-end",
  winnerDeclared: "winner-declared",
};

function makePokemon(name, x, finalX, y, maxHp, attacks, dataBox) {
  return {
    name,
    finalX,
    x,
    y,
    spriteRef: null,
    maxHp,
    hp: maxHp,
    attacks,
    selectedAttack: null,
    isFainted: false,
    dataBox,
  };
}

function makeDataBox(x, y, nameX, nameY, healthBarX, healthBarY) {
  return {
    x,
    y,
    nameOffset: {
      x: nameX,
      y: nameY,
    },
    healthBarOffset: {
      x: healthBarX,
      y: healthBarY,
    },
    spriteRef: null,
    maxHealthBarLength: 96,
    healthBarLength: 96,
  };
}

export function makeBattle(p) {
  return {
    dialogBox: makeDialogBox(p, 0, 288),
    currentState: "default",
    npc: {
      x: 350,
      y: 20,
      spriteRef: null,
    },
    npcPokemon: makePokemon(
      "VENUSAUR",
      600,
      310,
      20,
      100,
      [
        { name: "TACKLE", power: 10 },
        { name: "RAZOR LEAF", power: 55 },
        { name: "TAKE DOWN", power: 45 },
        { name: "POWER WHIP", power: 50 },
      ],
      makeDataBox(-300, 40, 15, 30, 118, 40)
    ),
    playerPokemon: makePokemon(
      "BLASTOISE",
      -170,
      20,
      128,
      100,
      [
        { name: "TACKLE", power: 10 },
        { name: "HYDRO PUMP", power: 50 },
        { name: "HYDRO CANNON", power: 45 },
        { name: "WATER GUN", power: 50 },
      ],
      makeDataBox(510, 220, 38, 30, 136, 40)
    ),
    drawDataBox(pokemon) {
      p.image(pokemon.dataBox.spriteRef, pokemon.dataBox.x, pokemon.dataBox.y);
      p.text(
        pokemon.name,
        pokemon.dataBox.x + pokemon.dataBox.nameOffset.x,
        pokemon.dataBox.y + pokemon.dataBox.nameOffset.y
      );

      p.push();
      p.angleMode(p.DEGREES);
      p.rotate(360);
      p.noStroke();
      if (pokemon.dataBox.healthBarLength > 50) {
        p.fill(0, 200, 0);
      }
      if (pokemon.dataBox.healthBarLength < 50) {
        p.fill(255, 165, 0);
      }
      if (pokemon.dataBox.healthBarLength < 20) {
        p.fill(200, 0, 0);
      }
      p.rect(
        pokemon.dataBox.x + pokemon.dataBox.healthBarOffset.x,
        pokemon.dataBox.y + pokemon.dataBox.healthBarOffset.y,
        pokemon.dataBox.healthBarLength,
        6
      );
      p.pop();
    },
    async dealDamage(targetPokemon, attackingPokemon) {
      targetPokemon.hp -= attackingPokemon.selectedAttack.power;
      if (targetPokemon.hp > 0) {
        targetPokemon.dataBox.healthBarLength =
          (targetPokemon.hp * targetPokemon.dataBox.maxHealthBarLength) /
          targetPokemon.maxHp;
        return;
      }
      targetPokemon.dataBox.healthBarLength = 0;
      targetPokemon.isFainted = true;
      await new Promise((resolve) => setTimeout(resolve, 1000));
      this.currentState = states.battleEnd;
    },
    load() {
      this.battleBackgroundImage = p.loadImage("assets/battle-background.png");
      this.npc.spriteRef = p.loadImage("assets/GENTLEMAN.png");
      this.npcPokemon.spriteRef = p.loadImage("assets/VENUSAUR.png");
      this.playerPokemon.spriteRef = p.loadImage("assets/BLASTOISE.png");
      this.playerPokemon.dataBox.spriteRef = p.loadImage(
        "assets/databox_thin.png"
      );
      this.npcPokemon.dataBox.spriteRef = p.loadImage(
        "assets/databox_thin_foe.png"
      );
      this.dialogBox.load();
    },
    setup() {
      this.dialogBox.displayText(
        "Mark the gentleman wants to battle !",
        async () => {
          await new Promise((resolve) => setTimeout(resolve, 2000));
          this.currentState = states.introNpc;
          this.dialogBox.clearText();
          this.dialogBox.displayText(
            `He sends out a ${this.npcPokemon.name} !`,
            async () => {
              this.currentState = states.introNpcPokemon;
              await new Promise((resolve) => setTimeout(resolve, 1000));
              this.dialogBox.clearText();
              this.dialogBox.displayText(
                `Go! ${this.playerPokemon.name} !`,
                async () => {
                  this.currentState = states.introPlayerPokemon;
                  await new Promise((resolve) => setTimeout(resolve, 1000));
                  this.dialogBox.clearText();
                  this.dialogBox.displayText(
                    `What will ${this.playerPokemon.name} do ?`,
                    async () => {
                      await new Promise((resolve) => setTimeout(resolve, 1000));
                      this.currentState = states.playerTurn;
                    }
                  );
                }
              );
            }
          );
        }
      );
      this.dialogBox.setVisibility(true);
    },
    update() {
      if (this.currentState === states.introNpc) {
        this.npc.x += 0.5 * p.deltaTime;
      }

      if (
        this.currentState === states.introNpcPokemon &&
        this.npcPokemon.x >= this.npcPokemon.finalX
      ) {
        this.npcPokemon.x -= 0.5 * p.deltaTime;
        if (this.npcPokemon.dataBox.x <= 0)
          this.npcPokemon.dataBox.x += 0.5 * p.deltaTime;
      }

      if (
        this.currentState === states.introPlayerPokemon &&
        this.playerPokemon.x <= this.playerPokemon.finalX
      ) {
        this.playerPokemon.x += 0.5 * p.deltaTime;
        this.playerPokemon.dataBox.x -= 0.65 * p.deltaTime;
      }

      if (this.playerPokemon.isFainted) {
        this.playerPokemon.y += 0.8 * p.deltaTime;
      }

      if (this.npcPokemon.isFainted) {
        this.npcPokemon.y += 0.8 * p.deltaTime;
      }

      this.dialogBox.update();
    },
    draw() {
      p.clear();
      p.background(0);
      p.image(this.battleBackgroundImage, 0, 0);

      p.image(this.npcPokemon.spriteRef, this.npcPokemon.x, this.npcPokemon.y);

      this.drawDataBox(this.npcPokemon);

      p.image(
        this.playerPokemon.spriteRef,
        this.playerPokemon.x,
        this.playerPokemon.y
      );

      this.drawDataBox(this.playerPokemon);

      if (
        this.currentState === states.default ||
        this.currentState === states.introNpc
      )
        p.image(this.npc.spriteRef, this.npc.x, this.npc.y);

      if (
        this.currentState === states.playerTurn &&
        !this.playerPokemon.selectedAttack
      ) {
        this.dialogBox.displayTextImmediately(
          `1) ${this.playerPokemon.attacks[0].name}    3) ${this.playerPokemon.attacks[2].name}\n2) ${this.playerPokemon.attacks[1].name}   4) ${this.playerPokemon.attacks[3].name}`
        );
      }

      if (
        this.currentState === states.playerTurn &&
        this.playerPokemon.selectedAttack &&
        !this.playerPokemon.isAttacking &&
        !this.playerPokemon.isFainted
      ) {
        this.dialogBox.clearText();
        this.dialogBox.displayText(
          `${this.playerPokemon.name} used ${this.playerPokemon.selectedAttack.name} !`,
          async () => {
            await this.dealDamage(this.npcPokemon, this.playerPokemon);
            if (this.currentState !== states.battleEnd) {
              await new Promise((resolve) => setTimeout(resolve, 1000));
              this.dialogBox.clearText();
              this.currentState = states.npcTurn;
            }
          }
        );
        this.playerPokemon.isAttacking = true;
      }

      if (this.currentState === states.npcTurn && !this.npcPokemon.isFainted) {
        this.npcPokemon.selectedAttack =
          this.npcPokemon.attacks[
            Math.floor(Math.random() * this.npcPokemon.attacks.length)
          ];
        this.dialogBox.clearText();
        this.dialogBox.displayText(
          `The foe's ${this.npcPokemon.name} used ${this.npcPokemon.selectedAttack.name} !`,
          async () => {
            await this.dealDamage(this.playerPokemon, this.npcPokemon);
            if (this.currentState !== states.battleEnd) {
              await new Promise((resolve) => setTimeout(resolve, 1000));
              this.playerPokemon.selectedAttack = null;
              this.playerPokemon.isAttacking = false;
            }
          }
        );
        this.currentState = states.playerTurn;
      }

      if (this.currentState === states.battleEnd) {
        if (this.npcPokemon.isFainted) {
          this.dialogBox.clearText();
          this.dialogBox.displayText(
            `${this.npcPokemon.name} fainted ! You won !`
          );
          this.currentState = states.winnerDeclared;
          return;
        }

        if (this.playerPokemon.isFainted) {
          this.dialogBox.clearText();
          this.dialogBox.displayText(
            `${this.playerPokemon.name} fainted ! You lost !`
          );
          this.currentState = states.winnerDeclared;
        }
      }

      p.rect(0, 288, 512, 200);
      this.dialogBox.draw();
    },
    onKeyPressed(keyEvent) {
      if (this.currentState === states.playerTurn) {
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
