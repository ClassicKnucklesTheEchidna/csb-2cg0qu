/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Crabmeat extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("crabmeat 1", "./Crabmeat/costumes/crabmeat 1.png", {
        x: 42,
        y: 31
      }),
      new Costume("crabmeat 2", "./Crabmeat/costumes/crabmeat 2.png", {
        x: 44,
        y: 31
      }),
      new Costume("crabmeat 3", "./Crabmeat/costumes/crabmeat 3.png", {
        x: 42,
        y: 31
      }),
      new Costume("crabmeat 4", "./Crabmeat/costumes/crabmeat 4.png", {
        x: 44,
        y: 31
      })
    ];

    this.sounds = [new Sound("pop", "./Crabmeat/sounds/pop.wav")];

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

    this.vars.x26 = -99999;
    this.vars.y26 = 185;
    this.vars.alive4 = 0;
  }

  *whenIReceiveGreenFlag() {
    this.visible = false;
  }

  *whenIReceiveTick() {
    yield* this.position(
      this.vars.x26 - this.stage.vars.scrollX,
      this.vars.y26 - this.stage.vars.scrollY
    );
  }

  *whenIReceiveSetup() {
    this.visible = false;
    this.vars.x26 = 0;
    this.vars.y26 = 0;
    if (this.stage.vars.level == 1) {
      yield* this.cloneAtXYDirection(1960, -5, -90);
      yield* this.cloneAtXYDirection(2143, 75, -90);
      yield* this.cloneAtXYDirection(6880, 185, -90);
    } else {
      null;
    }
    this.vars.x26 = -99999;
  }

  *position(x27, y27) {
    this.goto(x27, y27);
    if (x27 == this.x && y27 == this.y) {
      this.visible = true;
    } else {
      this.visible = false;
    }
  }

  *whenIReceiveReset() {
    this.deleteThisClone();
  }

  *startAsClone() {
    this.vars.alive4 = 1;
    this.visible = true;
    if (this.vars.alive4 == 1) {
      this.costume = "rollerbug0";
      while (true) {
        this.costumeNumber += 1;
        yield* this.wait(0.2);
        yield;
      }
    }
  }

  *cloneAtXYDirection(x28, y28, _3) {
    this.direction = _3;
    this.vars.x26 = x28;
    this.vars.y26 = y28;
    this.createClone();
  }

  *startAsClone2() {
    while (true) {
      if (this.vars.alive4 == 1) {
        if (this.touching(this.sprites["BottomSensor"].andClones())) {
          this.vars.alive4 = 0;
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
