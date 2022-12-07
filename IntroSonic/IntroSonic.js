/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class IntroSonic extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume(
        "pxArt-removebg-preview",
        "./IntroSonic/costumes/pxArt-removebg-preview.png",
        { x: 153, y: 260 }
      )
    ];

    this.sounds = [];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.BROADCAST, { name: "stop" }, this.whenIReceiveStop),
      new Trigger(Trigger.BROADCAST, { name: "Intro" }, this.whenIReceiveIntro)
    ];
  }

  *whenGreenFlagClicked() {
    this.goto(19, -31);
    this.visible = false;
  }

  *whenIReceiveStop() {
    this.visible = false;
  }

  *whenIReceiveIntro() {
    this.visible = true;
    this.goto(0, -31);
    this.size = 150;
    this.visible = false;
    this.costume = "sonic1";
    yield* this.wait(1);
    this.visible = true;
    for (let i = 0; i < 6; i++) {
      this.costumeNumber += 1;
      yield* this.wait(0.05);
      yield;
    }
    while (true) {
      this.costume = "sonic7";
      yield* this.wait(0.2);
      this.costume = "sonic8";
      yield* this.wait(0.2);
      yield;
    }
  }
}
