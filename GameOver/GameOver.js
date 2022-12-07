/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class GameOver extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Game Over", "./GameOver/costumes/Game Over.svg", {
        x: 86,
        y: 10
      })
    ];

    this.sounds = [new Sound("Game Over", "./GameOver/sounds/Game Over.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Game Over" },
        this.whenIReceiveGameOver
      )
    ];
  }

  *whenGreenFlagClicked() {
    this.goto(0, 0);
    this.effects.ghost = 100;
    this.size = 100;
  }

  *whenIReceiveGameOver() {
    this.stopAllSounds();
    for (let i = 0; i < 20; i++) {
      this.effects.ghost += -5;
      yield;
    }
    yield* this.startSound("Game Over");
  }
}
