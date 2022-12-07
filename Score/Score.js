/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Score extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("score", "./Score/costumes/score.png", { x: 44, y: -23 })
    ];

    this.sounds = [];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Play Game" },
        this.whenIReceivePlayGame
      ),
      new Trigger(Trigger.BROADCAST, { name: "+100" }, this.whenIReceive100),
      new Trigger(Trigger.BROADCAST, { name: "Reset" }, this.whenIReceiveReset)
    ];
  }

  *whenGreenFlagClicked() {
    this.goto(-208, 182);
    this.stage.vars.score = 0;
    this.stage.watchers.score.visible = false;
    this.visible = false;
  }

  *whenIReceivePlayGame() {
    this.visible = true;
    this.stage.watchers.score.visible = true;
  }

  *whenIReceive100() {
    this.stage.vars.score += 100;
  }

  *whenIReceiveReset() {
    this.stage.vars.score = 0;
  }
}
