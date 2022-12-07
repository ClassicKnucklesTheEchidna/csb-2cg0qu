/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Time extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("time", "./Time/costumes/time.png", { x: 44, y: 51 })
    ];

    this.sounds = [];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Play Game" },
        this.whenIReceivePlayGame
      ),
      new Trigger(Trigger.BROADCAST, { name: "Reset" }, this.whenIReceiveReset),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Game Over" },
        this.whenIReceiveGameOver
      )
    ];
  }

  *whenGreenFlagClicked() {
    this.goto(-208, 114);
    this.stage.watchers.time.visible = false;
    this.visible = false;
  }

  *whenIReceivePlayGame() {
    this.visible = true;
    this.stage.watchers.time.visible = true;
    while (true) {
      while (!(this.stage.vars.gameWin == 1)) {
        this.stage.vars.time = this.timer;
        yield;
      }
      yield;
    }
  }

  *whenIReceiveReset() {
    this.restartTimer();
  }

  *whenIReceiveGameOver() {
    /* TODO: Implement stop other scripts in sprite */ null;
  }
}
