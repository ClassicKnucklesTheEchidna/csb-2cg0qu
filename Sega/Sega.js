/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Sega extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Segalogowhite", "./Sega/costumes/Segalogowhite.png", {
        x: 320,
        y: 117
      })
    ];

    this.sounds = [
      new Sound("pop", "./Sega/sounds/pop.wav"),
      new Sound("sega", "./Sega/sounds/sega.wav")
    ];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked)
    ];
  }

  *whenGreenFlagClicked() {
    this.visible = true;
    this.goto(0, 0);
    this.effects.ghost = 100;
    yield* this.wait(1);
    yield* this.startSound("sega");
    for (let i = 0; i < 10; i++) {
      this.effects.ghost += -10;
      yield;
    }
    yield* this.wait(3);
    this.broadcast("Intro");
    this.visible = false;
  }
}
