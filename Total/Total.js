/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Total extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Total", "./Total/costumes/Total.png", { x: 275, y: 82 })
    ];

    this.sounds = [new Sound("pop", "./Total/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "End Game" },
        this.whenIReceiveEndGame
      )
    ];

    this.vars.timeBonus = 9000;
    this.vars.ringBonus = 5000;
    this.vars.total = 21000;

    this.watchers.timeBonus = new Watcher({
      label: "Total: time bonus",
      style: "large",
      visible: false,
      value: () => this.vars.timeBonus,
      x: 504,
      y: 42
    });
    this.watchers.ringBonus = new Watcher({
      label: "Total: ring bonus",
      style: "large",
      visible: false,
      value: () => this.vars.ringBonus,
      x: 504,
      y: 10
    });
    this.watchers.total = new Watcher({
      label: "Total: total",
      style: "large",
      visible: false,
      value: () => this.vars.total,
      x: 505,
      y: -21
    });
  }

  *whenGreenFlagClicked() {
    this.watchers.timeBonus.visible = false;
    this.watchers.ringBonus.visible = false;
    this.watchers.total.visible = false;
    this.goto(0, 0);
    this.visible = false;
  }

  *whenIReceiveEndGame() {
    this.visible = true;
    this.effects.ghost = 100;
    for (let i = 0; i < 20; i++) {
      this.effects.ghost += -5;
      yield;
    }
    this.vars.total =
      this.stage.vars.score * 10 + (this.vars.timeBonus + this.vars.ringBonus);
    this.watchers.total.visible = true;
    this.watchers.timeBonus.visible = true;
    this.watchers.ringBonus.visible = true;
    while (true) {
      if (this.stage.vars.time > 0 && this.stage.vars.time < 59) {
        this.vars.timeBonus = 10000;
      } else {
        if (this.stage.vars.time > 59 && this.stage.vars.time < 119) {
          this.vars.timeBonus = 9000;
        } else {
          if (this.stage.vars.time > 119 && this.stage.vars.time < 178) {
            this.vars.timeBonus = 8000;
          } else {
            if (this.stage.vars.time > 178 && this.stage.vars.time < 237) {
              this.vars.timeBonus = 7000;
            } else {
              if (this.stage.vars.time > 237 && this.stage.vars.time < 296) {
                this.vars.timeBonus = 6000;
              } else {
                this.vars.timeBonus = 5000;
              }
            }
          }
        }
      }
      if (this.stage.vars.collected == 47) {
        this.vars.ringBonus = 5000;
      } else {
        this.vars.ringBonus = 0;
      }
      yield;
    }
  }
}
