/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Rings2 extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("rings", "./Rings2/costumes/rings.png", { x: 49, y: 16 })
    ];

    this.sounds = [];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Play Game" },
        this.whenIReceivePlayGame
      )
    ];
  }

  *whenGreenFlagClicked() {
    this.stage.watchers.collected.visible = false;
    this.visible = false;
  }

  *whenIReceivePlayGame() {
    this.visible = true;
    this.stage.watchers.collected.visible = true;
  }
}
