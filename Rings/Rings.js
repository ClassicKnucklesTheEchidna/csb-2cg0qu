/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Rings extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("r1", "./Rings/costumes/r1.png", { x: 11, y: 15 }),
      new Costume("r2", "./Rings/costumes/r2.png", { x: 15, y: 15 }),
      new Costume("r3", "./Rings/costumes/r3.png", { x: 11, y: 15 }),
      new Costume("r4", "./Rings/costumes/r4.png", { x: 4, y: 15 })
    ];

    this.sounds = [new Sound("ring", "./Rings/sounds/ring.mp3")];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "Green Flag" },
        this.whenIReceiveGreenFlag
      ),
      new Trigger(Trigger.BROADCAST, { name: "Tick" }, this.whenIReceiveTick),
      new Trigger(Trigger.BROADCAST, { name: "Setup" }, this.whenIReceiveSetup),
      new Trigger(Trigger.BROADCAST, { name: "Reset" }, this.whenIReceiveReset),
      new Trigger(Trigger.CLONE_START, this.startAsClone)
    ];

    this.vars.x8 = -99999;
    this.vars.y8 = 120;
  }

  *whenIReceiveGreenFlag() {
    this.visible = false;
  }

  *whenIReceiveTick() {
    yield* this.position(
      this.vars.x8 - this.stage.vars.scrollX,
      this.vars.y8 - this.stage.vars.scrollY
    );
    if (this.touching(this.sprites["Boom"].andClones())) {
      yield* this.startSound("ring");
      this.stage.vars.collected += 1;
      this.deleteThisClone();
    }
  }

  *whenIReceiveSetup() {
    this.visible = false;
    this.stage.vars.collected = 0;
    this.vars.x8 = 0;
    this.vars.y8 = 0;
    if (this.stage.vars.level == 1) {
      this.size = 125;
      yield* this.cloneAtXY(40, 0);
      yield* this.cloneAtXY(80, 0);
      yield* this.cloneAtXY(120, 0);
      yield* this.cloneAtXY(860, 50);
      yield* this.cloneAtXY(900, 50);
      yield* this.cloneAtXY(940, 50);
      yield* this.cloneAtXY(980, 50);
      yield* this.cloneAtXY(1020, 50);
      yield* this.cloneAtXY(1460, -80);
      yield* this.cloneAtXY(1520, -100);
      yield* this.cloneAtXY(1575, -105);
      yield* this.cloneAtXY(1625, -80);
      yield* this.cloneAtXY(2220, 110);
      yield* this.cloneAtXY(2260, 110);
      yield* this.cloneAtXY(2680, 100);
      yield* this.cloneAtXY(2720, 100);
      yield* this.cloneAtXY(3139, 166);
      yield* this.cloneAtXY(3186, 184);
      yield* this.cloneAtXY(3229, 205);
      yield* this.cloneAtXY(3272, 225);
      yield* this.cloneAtXY(3529, 334);
      yield* this.cloneAtXY(3578, 338);
      yield* this.cloneAtXY(3643, 334);
      yield* this.cloneAtXY(3694, 337);
      yield* this.cloneAtXY(4150, 38);
      yield* this.cloneAtXY(4190, 38);
      yield* this.cloneAtXY(4230, 38);
      yield* this.cloneAtXY(4350, 38);
      yield* this.cloneAtXY(4390, 38);
      yield* this.cloneAtXY(4430, 38);
      yield* this.cloneAtXY(4443, 290);
      yield* this.cloneAtXY(4483, 270);
      yield* this.cloneAtXY(4526, 247);
      yield* this.cloneAtXY(4560, 234);
      yield* this.cloneAtXY(5740, 286);
      yield* this.cloneAtXY(5780, 286);
      yield* this.cloneAtXY(5820, 286);
      yield* this.cloneAtXY(6590, 228);
      yield* this.cloneAtXY(6630, 228);
      yield* this.cloneAtXY(6670, 228);
      yield* this.cloneAtXY(7388, 185);
      yield* this.cloneAtXY(7423, 162);
      yield* this.cloneAtXY(7454, 141);
      yield* this.cloneAtXY(7489, 126);
      yield* this.cloneAtXY(7530, 120);
      yield* this.cloneAtXY(7570, 120);
      yield* this.cloneAtXY(7610, 120);
    } else {
      null;
    }
    this.vars.x8 = -99999;
  }

  *position(x9, y9) {
    this.goto(x9, y9);
    if (x9 == this.x && y9 == this.y) {
      this.visible = true;
    } else {
      this.visible = false;
    }
  }

  *whenIReceiveReset() {
    this.deleteThisClone();
  }

  *cloneAtXY(x10, y10) {
    this.vars.x8 = x10;
    this.vars.y8 = y10;
    this.createClone();
  }

  *startAsClone() {
    while (true) {
      this.costumeNumber += 1;
      yield* this.wait(0.1);
      yield;
    }
  }
}
