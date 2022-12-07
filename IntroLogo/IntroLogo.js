/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class IntroLogo extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("logo", "./IntroLogo/costumes/logo.png", { x: 256, y: 150 }),
      new Costume("logo1", "./IntroLogo/costumes/logo1.png", { x: 0, y: 0 })
    ];

    this.sounds = [];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(Trigger.BROADCAST, { name: "stop" }, this.whenIReceiveStop),
      new Trigger(Trigger.BROADCAST, { name: "Intro" }, this.whenIReceiveIntro)
    ];
  }

  *whenGreenFlagClicked() {
    this.visible = false;
  }

  *startAsClone() {
    this.visible = true;
    this.costume = "logo1";
    this.goto(0, 0);
    this.size = 150;
    this.moveAhead();
  }

  *whenIReceiveStop() {
    this.visible = false;
    this.deleteThisClone();
  }

  *whenIReceiveIntro() {
    this.visible = true;
    this.goto(0, 0);
    this.size = 150;
    this.costume = "logo";
    this.createClone();
  }
}
