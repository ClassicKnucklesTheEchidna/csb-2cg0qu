/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Rollerbug extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("rollerbug1", "./Rollerbug/costumes/rollerbug1.png", {
        x: 39,
        y: 29
      }),
      new Costume("rollerbug2", "./Rollerbug/costumes/rollerbug2.png", {
        x: 39,
        y: 28
      }),
      new Costume("rollerbug3", "./Rollerbug/costumes/rollerbug3.png", {
        x: 40,
        y: 28
      }),
      new Costume("rollerbug4", "./Rollerbug/costumes/rollerbug4.png", {
        x: 40,
        y: 29
      })
    ];

    this.sounds = [new Sound("pop", "./Rollerbug/sounds/pop.wav")];

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
      new Trigger(Trigger.CLONE_START, this.startAsClone3),
      new Trigger(Trigger.BROADCAST, { name: "Die" }, this.whenIReceiveDie)
    ];

    this.vars.x20 = -99999;
    this.vars.y20 = 75;
    this.vars.rollerbug = 2;
    this.vars.alive2 = 0;
  }

  *whenIReceiveGreenFlag() {
    this.visible = false;
  }

  *whenIReceiveTick() {
    yield* this.position(
      this.vars.x20 - this.stage.vars.scrollX,
      this.vars.y20 - this.stage.vars.scrollY
    );
  }

  *whenIReceiveSetup() {
    this.visible = false;
    this.vars.x20 = 0;
    this.vars.y20 = 0;
    if (this.stage.vars.level == 1) {
      yield* this.cloneAtXYDirectionEnemy(540, -105, -90, 1);
      yield* this.cloneAtXYDirectionEnemy(4940, 75, -90, 2);
    } else {
      null;
    }
    this.vars.x20 = -99999;
  }

  *position(x21, y21) {
    this.goto(x21, y21);
    if (x21 == this.x && y21 == this.y) {
      this.visible = true;
    } else {
      this.visible = false;
    }
  }

  *whenIReceiveReset() {
    this.deleteThisClone();
  }

  *startAsClone() {
    this.vars.alive2 = 1;
    this.visible = true;
    if (this.vars.alive2 == 1) {
      this.costume = "rollerbug1";
      while (true) {
        this.costumeNumber += 1;
        yield* this.wait(0.1);
        yield;
      }
    }
  }

  *cloneAtXYDirectionEnemy(x22, y22, direct, _) {
    this.direction = direct;
    this.vars.x20 = x22;
    this.vars.y20 = y22;
    this.vars.rollerbug = _;
    this.createClone();
  }

  *startAsClone2() {
    while (true) {
      if (this.vars.rollerbug == 1) {
        if (this.vars.alive2 == 1) {
          while (!(this.vars.x20 == 250)) {
            this.direction = -90;
            this.vars.x20 += -5;
            yield* this.wait(0.1);
            yield;
          }
          if (this.vars.x20 == 250) {
            this.direction = 90;
            while (!(this.vars.x20 == 540)) {
              this.vars.x20 += 5;
              yield* this.wait(0.1);
              yield;
            }
          }
        }
      } else {
        if (this.vars.rollerbug == 2) {
          if (this.vars.alive2 == 1) {
            while (!(this.vars.x20 == 4700)) {
              this.direction = -90;
              this.vars.x20 += -5;
              yield* this.wait(0.1);
              yield;
            }
            if (this.vars.x20 == 4700) {
              this.direction = 90;
              while (!(this.vars.x20 == 4940)) {
                this.vars.x20 += 5;
                yield* this.wait(0.1);
                yield;
              }
            }
          }
        } else {
          null;
        }
      }
      yield;
    }
  }

  *startAsClone3() {
    while (true) {
      if (this.vars.alive2 == 1) {
        if (this.touching(this.sprites["BottomSensor"].andClones())) {
          this.vars.alive2 = 0;
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
