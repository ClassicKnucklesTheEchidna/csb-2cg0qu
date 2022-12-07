/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Transition extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Transition/costumes/costume1.png", {
        x: 480,
        y: 360
      })
    ];

    this.sounds = [
      new Sound("sonic intro", "./Transition/sounds/sonic intro.wav")
    ];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.BROADCAST, { name: "stop" }, this.whenIReceiveStop),
      new Trigger(Trigger.BROADCAST, { name: "Intro" }, this.whenIReceiveIntro)
    ];
  }

  *whenGreenFlagClicked() {
    this.visible = false;
  }

  *whenIReceiveStop() {
    this.moveAhead();
    this.effects.ghost = 100;
    this.visible = true;
    for (let i = 0; i < 5; i++) {
      yield* this.wait(0.05);
      this.effects.ghost += -20;
      yield;
    }
    for (let i = 0; i < 5; i++) {
      yield* this.wait(0.05);
      this.effects.ghost += 20;
      yield;
    }
    this.broadcast("Play Game");
    this.visible = false;
  }

  *whenIReceiveIntro() {
    this.goto(0, 0);
    yield* this.playSoundUntilDone("sonic intro");
    this.broadcast("stop");
  }
}
