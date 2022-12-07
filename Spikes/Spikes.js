/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Spikes extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("level 1 1", "./Spikes/costumes/level 1 1.svg", {
        x: 240,
        y: 180
      }),
      new Costume("level 1 2", "./Spikes/costumes/level 1 2.svg", {
        x: 240,
        y: 180
      }),
      new Costume("level 1 3", "./Spikes/costumes/level 1 3.svg", {
        x: 240,
        y: 180
      }),
      new Costume("level 1 4", "./Spikes/costumes/level 1 4.svg", {
        x: 240,
        y: 180
      }),
      new Costume("level 1 5", "./Spikes/costumes/level 1 5.svg", {
        x: 240,
        y: 180
      }),
      new Costume("level 1 6", "./Spikes/costumes/level 1 6.svg", {
        x: 240,
        y: 180
      }),
      new Costume("level 1 7", "./Spikes/costumes/level 1 7.svg", {
        x: 240,
        y: 180
      }),
      new Costume("level 1 8", "./Spikes/costumes/level 1 8.svg", {
        x: 240,
        y: 180
      }),
      new Costume("level 1 9", "./Spikes/costumes/level 1 9.svg", {
        x: 240,
        y: 180
      }),
      new Costume("level 1 10", "./Spikes/costumes/level 1 10.svg", {
        x: 240,
        y: 180
      }),
      new Costume("level 1 11", "./Spikes/costumes/level 1 11.svg", {
        x: 240,
        y: 180
      }),
      new Costume("level 1 12", "./Spikes/costumes/level 1 12.svg", {
        x: 245.5000700552,
        y: 125.962809896
      }),
      new Costume("level 1 13", "./Spikes/costumes/level 1 13.svg", {
        x: 240,
        y: 180
      }),
      new Costume("level 1 14", "./Spikes/costumes/level 1 14.svg", {
        x: 240,
        y: 180
      }),
      new Costume("level 1 15", "./Spikes/costumes/level 1 15.svg", {
        x: 240,
        y: 180
      }),
      new Costume("level 1 16", "./Spikes/costumes/level 1 16.svg", {
        x: 240,
        y: 180
      }),
      new Costume("level 1 17", "./Spikes/costumes/level 1 17.svg", {
        x: 240,
        y: 180
      }),
      new Costume("level 1 18", "./Spikes/costumes/level 1 18.svg", {
        x: 240,
        y: 180
      }),
      new Costume("level 1 19", "./Spikes/costumes/level 1 19.svg", {
        x: 240,
        y: 180
      }),
      new Costume("level 1 20", "./Spikes/costumes/level 1 20.svg", {
        x: 240,
        y: 180
      }),
      new Costume("level 1 21", "./Spikes/costumes/level 1 21.svg", {
        x: 297.50007,
        y: 113.96280500000002
      }),
      new Costume("level 1 22", "./Spikes/costumes/level 1 22.svg", {
        x: 240,
        y: 180
      }),
      new Costume("level 1 23", "./Spikes/costumes/level 1 23.svg", {
        x: 240,
        y: 180
      }),
      new Costume("level 1 24", "./Spikes/costumes/level 1 24.svg", {
        x: 240,
        y: 180
      })
    ];

    this.sounds = [new Sound("pop", "./Spikes/sounds/pop.wav")];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "Green Flag" },
        this.whenIReceiveGreenFlag
      ),
      new Trigger(Trigger.BROADCAST, { name: "Tick" }, this.whenIReceiveTick),
      new Trigger(Trigger.BROADCAST, { name: "Setup" }, this.whenIReceiveSetup),
      new Trigger(Trigger.BROADCAST, { name: "Reset" }, this.whenIReceiveReset)
    ];

    this.vars.x11 = 8153;
    this.vars.y11 = 71;
  }

  *whenIReceiveGreenFlag() {
    this.visible = false;
  }

  *whenIReceiveTick() {
    yield* this.position(
      this.vars.x11 - this.stage.vars.scrollX,
      this.vars.y11 - this.stage.vars.scrollY
    );
  }

  *whenIReceiveSetup() {
    this.visible = false;
    this.vars.x11 = 0;
    this.vars.y11 = 0;
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

  *position(x12, y12) {
    this.goto(x12, y12);
    if (x12 == this.x && y12 == this.y) {
      this.visible = true;
    } else {
      this.visible = false;
    }
  }

  *whenIReceiveReset() {
    this.deleteThisClone();
  }

  *cloneAtXY(x13, y13) {
    this.createClone();
    this.vars.x11 += x13;
    this.vars.y11 += y13;
    this.costumeNumber += 1;
  }
}
