/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Level extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("level 1 1", "./Level/costumes/level 1 1.svg", {
        x: 236,
        y: -118
      }),
      new Costume("level 1 2", "./Level/costumes/level 1 2.svg", {
        x: 241,
        y: -22.5
      }),
      new Costume("level 1 3", "./Level/costumes/level 1 3.svg", {
        x: 242,
        y: -53
      }),
      new Costume("level 1 4", "./Level/costumes/level 1 4.svg", {
        x: 243,
        y: -47
      }),
      new Costume("level 1 5", "./Level/costumes/level 1 5.svg", {
        x: 244,
        y: 60
      }),
      new Costume("level 1 6", "./Level/costumes/level 1 6.svg", {
        x: 245,
        y: 59
      }),
      new Costume("level 1 7", "./Level/costumes/level 1 7.svg", {
        x: 246.00000000000003,
        y: 138
      }),
      new Costume("level 1 8", "./Level/costumes/level 1 8.svg", {
        x: 246,
        y: 181
      }),
      new Costume("level 1 9", "./Level/costumes/level 1 9.svg", {
        x: 171,
        y: -44
      }),
      new Costume("level 1 10", "./Level/costumes/level 1 10.svg", {
        x: 242.00000000000003,
        y: 180
      }),
      new Costume("level 1 11", "./Level/costumes/level 1 11.svg", {
        x: 242.00000000000003,
        y: 68
      }),
      new Costume("level 1 12", "./Level/costumes/level 1 12.svg", {
        x: 241.00000000000006,
        y: 96
      }),
      new Costume("level 1 13", "./Level/costumes/level 1 13.png", {
        x: 480,
        y: 247
      }),
      new Costume("level 1 14", "./Level/costumes/level 1 14.png", {
        x: 480,
        y: 280
      }),
      new Costume("level 1 15", "./Level/costumes/level 1 15.png", {
        x: 480,
        y: 360
      }),
      new Costume("level 1 16", "./Level/costumes/level 1 16.png", {
        x: 480,
        y: 32
      }),
      new Costume("level 1 17", "./Level/costumes/level 1 17.svg", {
        x: 241,
        y: 32.5
      }),
      new Costume("level 1 18", "./Level/costumes/level 1 18.svg", {
        x: 240,
        y: 180
      }),
      new Costume("level 1 19", "./Level/costumes/level 1 19.png", {
        x: 480,
        y: 128
      }),
      new Costume("level 1 20", "./Level/costumes/level 1 20.png", {
        x: 480,
        y: 64
      }),
      new Costume("level 1 21", "./Level/costumes/level 1 21.svg", {
        x: 241,
        y: 48.5
      }),
      new Costume("level 1 22", "./Level/costumes/level 1 22.svg", {
        x: 242,
        y: 1
      }),
      new Costume("level 1 23", "./Level/costumes/level 1 23.svg", {
        x: 243,
        y: 46.5
      }),
      new Costume("level 1 24", "./Level/costumes/level 1 24.svg", {
        x: 244,
        y: 31
      })
    ];

    this.sounds = [new Sound("pop", "./Level/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.BROADCAST, { name: "Tick" }, this.whenIReceiveTick),
      new Trigger(Trigger.BROADCAST, { name: "Setup" }, this.whenIReceiveSetup),
      new Trigger(Trigger.BROADCAST, { name: "Reset" }, this.whenIReceiveReset),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked)
    ];

    this.vars.x2 = 8153;
    this.vars.y2 = 71;
  }

  *whenIReceiveTick() {
    yield* this.position(
      this.vars.x2 - this.stage.vars.scrollX,
      this.vars.y2 - this.stage.vars.scrollY
    );
  }

  *whenIReceiveSetup() {
    this.visible = false;
    this.vars.x2 = 0;
    this.vars.y2 = 0;
    if (this.stage.vars.level == 1) {
      this.costume = "level 1 1";
      yield* this.cloneAtXY(480, 0);
      yield* this.cloneAtXY(480, 0);
      yield* this.cloneAtXY(480, 0);
      yield* this.cloneAtXY(480, 0);
      yield* this.cloneAtXY(480, 0);
      yield* this.cloneAtXY(480, 0);
      yield* this.cloneAtXY(480, 0);
      yield* this.cloneAtXY(63, 360);
      yield* this.cloneAtXY(412, -359);
      yield* this.cloneAtXY(0, 247);
      yield* this.cloneAtXY(480, -329);
      yield* this.cloneAtXY(0, 384);
      yield* this.cloneAtXY(480, 16);
      yield* this.cloneAtXY(0, -316);
      yield* this.cloneAtXY(480, 0);
      yield* this.cloneAtXY(0, 107);
      yield* this.cloneAtXY(0, 228);
      yield* this.cloneAtXY(478, -200);
      yield* this.cloneAtXY(480, -32);
      yield* this.cloneAtXY(480, 15);
      yield* this.cloneAtXY(480, 47);
      yield* this.cloneAtXY(480, -83);
      yield* this.cloneAtXY(480, -14);
    } else {
      null;
    }
  }

  *position(x3, y3) {
    this.goto(x3, y3);
    if (x3 == this.x && y3 == this.y) {
      this.visible = true;
    } else {
      this.visible = false;
    }
  }

  *whenIReceiveReset() {
    this.deleteThisClone();
  }

  *cloneAtXY(x4, y4) {
    this.createClone();
    this.vars.x2 += x4;
    this.vars.y2 += y4;
    this.costumeNumber += 1;
  }

  *whenGreenFlagClicked() {
    this.visible = false;
  }
}
