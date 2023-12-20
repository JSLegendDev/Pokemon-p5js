import { makeDialogBox } from "../utils/ui.js";

export function makeBattle(p) {
  return {
    p,
    dialogBox: makeDialogBox(p, 0, 288),
    load() {
      this.battleBackgroundImage = this.p.loadImage(
        "assets/battle-background.png"
      );
      this.dialogBox.load();
    },
    setup() {
      this.dialogBox.setText("Mark the gentleman wants to battle!");
      this.dialogBox.setVisibility(true);
      this.dialogBox.onComplete(() => {
        setTimeout(() => {
          this.dialogBox.clearText();
          this.dialogBox.setText("He sends out a Venusaur!");
          this.dialogBox.onComplete(() => {
            setTimeout(() => {
              this.dialogBox.clearText();
              this.dialogBox.setText("Go! BLASTOISE!");
              this.dialogBox.onComplete(() => {
                setTimeout(() => this.dialogBox.clearText(), 1000);
              });
            }, 1000);
          });
        }, 2000);
      });
    },
    draw() {
      this.p.clear();
      this.p.background(0);
      this.p.image(this.battleBackgroundImage, 0, 0);
      this.dialogBox.update();
      this.dialogBox.draw();
    },
  };
}
