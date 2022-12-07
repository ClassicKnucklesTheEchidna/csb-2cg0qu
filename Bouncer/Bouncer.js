/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Bouncer extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("1", "./Bouncer/costumes/1.svg", {
        x: 28.900000000000006,
        y: 9.400000000000006
      }),
      new Costume("2", "./Bouncer/costumes/2.svg", {
        x: 28.399999999999977,
        y: 23.90000000000029
      }),
      new Costume("3", "./Bouncer/costumes/3.svg", {
        x: 28.099999999999994,
        y: 38.599999999999994
      }),
      new Costume("4", "./Bouncer/costumes/4.svg", {
        x: 27.99999999999997,
        y: 53.099999999999994
      })
    ];

    this.sounds = [new Sound("pop", "./Bouncer/sounds/pop.wav")];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "Green Flag" },
        this.whenIReceiveGreenFlag
      ),
      new Trigger(Trigger.BROADCAST, { name: "Tick" }, this.whenIReceiveTick),
      new Trigger(Trigger.BROADCAST, { name: "Setup" }, this.whenIReceiveSetup),
      new Trigger(Trigger.BROADCAST, { name: "Reset" }, this.whenIReceiveReset),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Bounce" },
        this.whenIReceiveBounce
      )
    ];

    this.vars.x14 = -99999;
    this.vars.y14 = -112;
  }

  *whenIReceiveGreenFlag() {
    this.visible = false;
  }

  *whenIReceiveTick() {
    yield* this.position(
      this.vars.x14 - this.stage.vars.scrollX,
      this.vars.y14 - this.stage.vars.scrollY
    );
    if (
      this.touching(this.sprites["Boom"].andClones()) &&
      this.costumeNumber == 1
    ) {
      this.broadcast("Bounce");
    }
  }

  *whenIReceiveSetup() {
    this.visible = false;
    this.vars.x14 = 0;
    this.vars.y14 = 0;
    if (this.stage.vars.level == 1) {
      this.size = 75;
      this.costume = 1;
      yield* this.cloneAtXY(3610, -112);
    } else {
      null;
    }
    this.vars.x14 = -99999;
  }

  *position(x15, y15) {
    this.goto(x15, y15);
    if (x15 == this.x && y15 == this.y) {
      this.visible = true;
    } else {
      this.visible = false;
    }
  }

  *whenIReceiveReset() {
    this.deleteThisClone();
  }

  *cloneAtXY(x16, y16) {
    this.vars.x14 = x16;
    this.vars.y14 = y16;
    this.createClone();
  }

  *startAsClone() {
    this.visible = true;
  }

  *whenIReceiveBounce() {
    while (!(this.costumeNumber == 4)) {
      this.costumeNumber += 1;
      yield* this.wait(0.05);
      yield;
    }
    yield* this.wait(1);
    this.costume = 1;
  }
}
