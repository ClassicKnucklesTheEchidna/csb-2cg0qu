/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class BuzzBomber extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("buzz bomber 1", "./BuzzBomber/costumes/buzz bomber 1.png", {
        x: 45,
        y: 24
      }),
      new Costume("buzz bomber 2", "./BuzzBomber/costumes/buzz bomber 2.png", {
        x: 45,
        y: 19
      })
    ];

    this.sounds = [new Sound("pop", "./BuzzBomber/sounds/pop.wav")];

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
      new Trigger(Trigger.CLONE_START, this.startAsClone2),
      new Trigger(Trigger.BROADCAST, { name: "Die" }, this.whenIReceiveDie)
    ];

    this.vars.x23 = -99999;
    this.vars.y23 = 580;
    this.vars.alive3 = 1;
  }

  *whenIReceiveGreenFlag() {
    this.visible = false;
  }

  *whenIReceiveTick() {
    yield* this.position(
      this.vars.x23 - this.stage.vars.scrollX,
      this.vars.y23 - this.stage.vars.scrollY
    );
  }

  *whenIReceiveSetup() {
    this.visible = false;
    this.vars.x23 = 0;
    this.vars.y23 = 0;
    if (this.stage.vars.level == 1) {
      yield* this.cloneAtXYDirection(575, 50, 90);
      yield* this.cloneAtXYDirection(2900, 240, 90);
      yield* this.cloneAtXYDirection(3100, 240, 90);
      yield* this.cloneAtXYDirection(4615, 580, 90);
    } else {
      null;
    }
    this.vars.x23 = -99999;
  }

  *position(x24, y24) {
    this.goto(x24, y24);
    if (x24 == this.x && y24 == this.y) {
      this.visible = true;
    } else {
      this.visible = false;
    }
  }

  *whenIReceiveReset() {
    this.deleteThisClone();
  }

  *startAsClone() {
    this.vars.alive3 = 1;
    this.visible = true;
    if (this.vars.alive3 == 1) {
      this.costume = "rollerbug0";
      while (true) {
        this.costumeNumber += 1;
        yield* this.wait(0.1);
        yield;
      }
    }
  }

  *cloneAtXYDirection(x25, y25, _2) {
    this.direction = _2;
    this.vars.x23 = x25;
    this.vars.y23 = y25;
    this.createClone();
  }

  *startAsClone2() {
    while (true) {
      if (this.vars.alive3 == 1) {
        if (this.touching(this.sprites["BottomSensor"].andClones())) {
          this.vars.alive3 = 0;
          this.broadcast("Enemy dead");
          this.broadcast(100);
          this.deleteThisClone();
        }
      }
      yield;
    }
  }

  *whenIReceiveDie() {
    this.deleteThisClone();
  }
}
