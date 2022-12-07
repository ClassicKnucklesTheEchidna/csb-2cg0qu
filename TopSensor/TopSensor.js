/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class TopSensor extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("sensor_up", "./TopSensor/costumes/sensor_up.png", {
        x: 21.5,
        y: 6
      })
    ];

    this.sounds = [new Sound("pop", "./TopSensor/sounds/pop.wav")];

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
      yield* this.goToXY(this.sprites["Boom"].x, this.sprites["Boom"].y + 27);
      yield;
    }
  }

  *goToXY(x29, y29) {
    this.goto(x29, y29);
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
        return;
      }
      yield;
    }
  }

  *whenGreenFlagClicked() {
    this.visible = false;
    this.effects.ghost = 100;
  }
}
