/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Decoration extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("level 1 1", "./Decoration/costumes/level 1 1.svg", {
        x: 240,
        y: 74
      }),
      new Costume("level 1 2", "./Decoration/costumes/level 1 2.svg", {
        x: 240.5,
        y: 73.5
      }),
      new Costume("level 1 3", "./Decoration/costumes/level 1 3.svg", {
        x: 242,
        y: 73.5
      }),
      new Costume("level 1 4", "./Decoration/costumes/level 1 4.svg", {
        x: 241,
        y: 73.5
      }),
      new Costume("level 1 5", "./Decoration/costumes/level 1 5.svg", {
        x: 242,
        y: 74
      }),
      new Costume("level 1 6", "./Decoration/costumes/level 1 6.svg", {
        x: 245,
        y: 93.5
      }),
      new Costume("level 1 7", "./Decoration/costumes/level 1 7.svg", {
        x: 246,
        y: 178
      }),
      new Costume("level 1 8", "./Decoration/costumes/level 1 8.svg", {
        x: 246,
        y: 183.00000000000003
      }),
      new Costume("level 1 9", "./Decoration/costumes/level 1 9.svg", {
        x: 239,
        y: 77.5
      }),
      new Costume("level 1 10", "./Decoration/costumes/level 1 10.png", {
        x: 479,
        y: 151
      }),
      new Costume("level 1 11", "./Decoration/costumes/level 1 11.svg", {
        x: 242,
        y: 153.5
      }),
      new Costume("level 1 12", "./Decoration/costumes/level 1 12.svg", {
        x: 241.5,
        y: 84.5
      }),
      new Costume("level 1 13", "./Decoration/costumes/level 1 13.svg", {
        x: 241.99999999999997,
        y: 117.5
      }),
      new Costume("level 1 14", "./Decoration/costumes/level 1 14.svg", {
        x: 236.5,
        y: 113
      }),
      new Costume("level 1 15", "./Decoration/costumes/level 1 15.svg", {
        x: 234,
        y: 68.00000000000001
      }),
      new Costume("level 1 16", "./Decoration/costumes/level 1 16.svg", {
        x: 235,
        y: 171
      }),
      new Costume("level 1 17", "./Decoration/costumes/level 1 17.svg", {
        x: 35.5,
        y: 17.5
      }),
      new Costume("level 1 18", "./Decoration/costumes/level 1 18.svg", {
        x: 242,
        y: 124
      }),
      new Costume("level 1 19", "./Decoration/costumes/level 1 19.png", {
        x: 474,
        y: 192
      }),
      new Costume("level 1 20", "./Decoration/costumes/level 1 20.svg", {
        x: 216,
        y: 64.5
      }),
      new Costume("level 1 21", "./Decoration/costumes/level 1 21.svg", {
        x: 237,
        y: 114
      }),
      new Costume("level 1 22", "./Decoration/costumes/level 1 22.png", {
        x: 474,
        y: 228
      }),
      new Costume("level 1 23", "./Decoration/costumes/level 1 23.svg", {
        x: 238,
        y: 92
      }),
      new Costume("level 1 24", "./Decoration/costumes/level 1 24.svg", {
        x: 237,
        y: 114
      }),
      new Costume("level 1 25", "./Decoration/costumes/level 1 25.svg", {
        x: 237,
        y: 114
      })
    ];

    this.sounds = [new Sound("pop", "./Decoration/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.BROADCAST, { name: "Tick" }, this.whenIReceiveTick),
      new Trigger(Trigger.BROADCAST, { name: "Setup" }, this.whenIReceiveSetup),
      new Trigger(Trigger.BROADCAST, { name: "Reset" }, this.whenIReceiveReset),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked)
    ];

    this.vars.x5 = 8191;
    this.vars.y5 = 163;
  }

  *whenIReceiveTick() {
    yield* this.position(
      this.vars.x5 - this.stage.vars.scrollX,
      this.vars.y5 - this.stage.vars.scrollY
    );
  }

  *whenIReceiveSetup() {
    this.visible = false;
    this.vars.x5 = 0;
    this.vars.y5 = 0;
    if (this.stage.vars.level == 1) {
      this.costume = "level 1 1";
      yield* this.cloneAtXY(480, 0);
      yield* this.cloneAtXY(480, 0);
      yield* this.cloneAtXY(480, 0);
      yield* this.cloneAtXY(480, 0);
      yield* this.cloneAtXY(480, 0);
      yield* this.cloneAtXY(480, 0);
      yield* this.cloneAtXY(480, 0);
      yield* this.cloneAtXY(-295, 245);
      yield* this.cloneAtXY(290, 10);
      yield* this.cloneAtXY(480, -227);
      yield* this.cloneAtXY(0, 235);
      yield* this.cloneAtXY(480, -200);
      yield* this.cloneAtXY(-5, 255);
      yield* this.cloneAtXY(480, -200);
      yield* this.cloneAtXY(0, 250);
      yield* this.cloneAtXY(-134, 200);
      yield* this.cloneAtXY(620, -565);
      yield* this.cloneAtXY(0, 230);
      yield* this.cloneAtXY(500, 30);
      yield* this.cloneAtXY(480, -50);
      yield* this.cloneAtXY(480, 0);
      yield* this.cloneAtXY(400, 50);
      yield* this.cloneAtXY(575, -100);
      yield* this.cloneAtXY(480, 0);
    } else {
      null;
    }
  }

  *position(x6, y6) {
    this.goto(x6, y6);
    if (x6 == this.x && y6 == this.y) {
      this.visible = true;
    } else {
      this.visible = false;
    }
  }

  *whenIReceiveReset() {
    this.deleteThisClone();
  }

  *cloneAtXY(x7, y7) {
    this.createClone();
    this.vars.x5 += x7;
    this.vars.y5 += y7;
    this.costumeNumber += 1;
  }

  *whenGreenFlagClicked() {
    this.visible = false;
  }
}
