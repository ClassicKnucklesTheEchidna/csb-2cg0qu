/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Background extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("background", "./Background/costumes/background.svg", {
        x: 193.77679443359375,
        y: 136.3977508544922
      })
    ];

    this.sounds = [new Sound("pop", "./Background/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.BROADCAST, { name: "Intro" }, this.whenIReceiveIntro)
    ];
  }

  *whenGreenFlagClicked() {
    this.visible = false;
  }

  *whenIReceiveIntro() {
    this.visible = true;
    this.size = 135;
    this.moveBehind();
    this.goto(0, 0);
  }
}
