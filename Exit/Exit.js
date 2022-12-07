/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Exit extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("e1", "./Exit/costumes/e1.png", { x: 48, y: 48 }),
      new Costume("e2", "./Exit/costumes/e2.png", { x: 32, y: 48 }),
      new Costume("e3", "./Exit/costumes/e3.png", { x: 8, y: 48 }),
      new Costume("e4", "./Exit/costumes/e4.png", { x: 32, y: 48 }),
      new Costume("e5", "./Exit/costumes/e5.png", { x: 48, y: 48 })
    ];

    this.sounds = [
      new Sound("goal", "./Exit/sounds/goal.wav"),
      new Sound("Act Clear", "./Exit/sounds/Act Clear.wav")
    ];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "Green Flag" },
        this.whenIReceiveGreenFlag
      ),
      new Trigger(Trigger.BROADCAST, { name: "Tick" }, this.whenIReceiveTick),
      new Trigger(Trigger.BROADCAST, { name: "Setup" }, this.whenIReceiveSetup),
      new Trigger(Trigger.BROADCAST, { name: "Reset" }, this.whenIReceiveReset),
      new Trigger(
        Trigger.BROADCAST,
        { name: "End Game" },
        this.whenIReceiveEndGame
      ),
      new Trigger(Trigger.CLONE_START, this.startAsClone)
    ];

    this.vars.x17 = -99999;
    this.vars.y17 = 120;
  }

  *whenIReceiveGreenFlag() {
    this.visible = false;
  }

  *whenIReceiveTick() {
    yield* this.position(
      this.vars.x17 - this.stage.vars.scrollX,
      this.vars.y17 - this.stage.vars.scrollY
    );
    if (this.touching(this.sprites["Boom"].andClones())) {
      this.stage.vars.gameWin = 1;
      this.broadcast("End Game");
      this.stopAllSounds();
      yield* this.startSound("goal");
      yield* this.startSound("Act Clear");
    }
  }

  *whenIReceiveSetup() {
    this.visible = false;
    this.stage.vars.gameWin = 0;
    this.vars.x17 = 0;
    this.vars.y17 = 0;
    if (this.stage.vars.level == 1) {
      this.size = 75;
      this.costume = "e1";
      yield* this.cloneAtXY(8023, 120);
    } else {
      null;
    }
    this.vars.x17 = -99999;
  }

  *position(x18, y18) {
    this.goto(x18, y18);
    if (x18 == this.x && y18 == this.y) {
      this.visible = true;
    } else {
      this.visible = false;
    }
  }

  *whenIReceiveReset() {
    this.deleteThisClone();
  }

  *cloneAtXY(x19, y19) {
    this.vars.x17 = x19;
    this.vars.y17 = y19;
    this.createClone();
  }

  *whenIReceiveEndGame() {
    for (let i = 0; i < 24; i++) {
      this.costumeNumber += 1;
      yield;
    }
  }

  *startAsClone() {
    this.visible = true;
  }
}
