/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class LeftSensor extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("sensor_left", "./LeftSensor/costumes/sensor_left.svg", {
        x: 3.5,
        y: 18.5
      })
    ];

    this.sounds = [new Sound("pop", "./LeftSensor/sounds/pop.wav")];

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
      new Trigger(
        Trigger.BROADCAST,
        { name: "Play Game" },
        this.whenIReceivePlayGame3
      ),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked)
    ];
  }

  *whenIReceivePlayGame() {
    while (true) {
      yield* this.goToXY(this.sprites["Boom"].x - 17, this.sprites["Boom"].y);
      yield;
    }
  }

  *goToXY(x31, y31) {
    this.goto(x31, y31);
  }

  *whenIReceivePlayGame2() {
    this.visible = true;
    while (true) {
      this.effects.ghost = 100;
      yield;
    }
  }

  *whenIReceivePlayGame3() {
    while (true) {
      if (
        this.touching(this.sprites["Rollerbug"].andClones()) ||
        this.touching(this.sprites["BuzzBomber"].andClones()) ||
          this.touching(this.sprites["Crabmeat"].andClones())
      ) {
        this.broadcast("Die");
      }
      yield;
    }
  }

  *whenGreenFlagClicked() {
    this.visible = false;
    this.effects.ghost = 100;
  }
}
