/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Lives extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Lives", "./Lives/costumes/Lives.png", { x: 42, y: 23 })
    ];

    this.sounds = [new Sound("pop", "./Lives/sounds/pop.wav")];

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
    this.goto(-211, -164);
    this.stage.watchers.lives.visible = false;
    this.visible = false;
  }

  *whenIReceivePlayGame() {
    this.visible = true;
    this.stage.watchers.lives.visible = true;
  }
}
