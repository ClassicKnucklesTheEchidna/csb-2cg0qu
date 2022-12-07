/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class BottomSensor extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume(
        "sencor_bottom",
        "./BottomSensor/costumes/sencor_bottom.png",
        { x: 21.5, y: 6 }
      )
    ];

    this.sounds = [new Sound("pop", "./BottomSensor/sounds/pop.wav")];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "Play Game" },
        this.whenIReceivePlayGame
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Play Game" },
        this.whenIReceivePlayGame2
      ),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked)
    ];
  }

  *whenIReceivePlayGame() {
    while (true) {
      yield* this.goToXY(this.sprites["Boom"].x, this.sprites["Boom"].y - 27);
      yield;
    }
  }

  *goToXY(x30, y30) {
    this.goto(x30, y30);
  }

  *whenIReceivePlayGame2() {
    this.visible = true;
    while (true) {
      this.effects.ghost = 100;
      yield;
    }
  }

  *whenGreenFlagClicked() {
    this.visible = false;
    this.effects.ghost = 100;
  }
}
