/* eslint-disable require-yield, eqeqeq */

import {
  Stage as StageBase,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Stage extends StageBase {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("backdrop1", "./Stage/costumes/backdrop1.svg", {
        x: 240,
        y: 180
      })
    ];

    this.sounds = [new Sound("pop", "./Stage/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.KEY_PRESSED, { key: "m" }, this.whenKeyMPressed)
    ];

    this.vars.level = 1;
    this.vars.scrollX = 1040;
    this.vars.scrollY = 10;
    this.vars.exit = 0;
    this.vars.mouse = "3610, -90";
    this.vars.collected = 0;
    this.vars.jump = 1;
    this.vars.run = 1;
    this.vars.bounce = 0;
    this.vars.time = 8.419;
    this.vars.score = 0;
    this.vars.lives = 5;
    this.vars.gameWin = 0;

    this.watchers.collected = new Watcher({
      label: "COLLECTED",
      style: "large",
      visible: true,
      value: () => this.vars.collected,
      x: 304,
      y: 110
    });
    this.watchers.time = new Watcher({
      label: "TIME",
      style: "large",
      visible: true,
      value: () => this.vars.time,
      x: 303,
      y: 144
    });
    this.watchers.score = new Watcher({
      label: "SCORE",
      style: "large",
      visible: true,
      value: () => this.vars.score,
      x: 303,
      y: 175
    });
    this.watchers.lives = new Watcher({
      label: "LIVES",
      style: "large",
      visible: true,
      value: () => this.vars.lives,
      x: 299,
      y: -151
    });
  }

  *whenKeyMPressed() {
    this.vars.mouse =
      "" +
      (this.mouse.x + this.vars.scrollX) +
      ("" + ", " + (this.mouse.y + this.vars.scrollY));
  }
}
