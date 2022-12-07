/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Boom extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("sstand", "./Boom/costumes/sstand.png", { x: 35, y: 50 }),
      new Costume("s1", "./Boom/costumes/s1.png", { x: 99, y: 67 }),
      new Costume("s2", "./Boom/costumes/s2.png", { x: 27, y: 43 }),
      new Costume("s3", "./Boom/costumes/s3.png", { x: 35, y: 50 }),
      new Costume("s4", "./Boom/costumes/s4.png", { x: 25, y: 40 }),
      new Costume("s5", "./Boom/costumes/s5.png", { x: 35, y: 50 }),
      new Costume("s6", "./Boom/costumes/s6.png", { x: 35, y: 50 }),
      new Costume("s7", "./Boom/costumes/s7.png", { x: 35, y: 50 }),
      new Costume("s8", "./Boom/costumes/s8.png", { x: 35, y: 50 }),
      new Costume("s9", "./Boom/costumes/s9.png", { x: 35, y: 50 }),
      new Costume("s10", "./Boom/costumes/s10.png", { x: 35, y: 50 }),
      new Costume("sjump1", "./Boom/costumes/sjump1.png", { x: 32, y: 46 }),
      new Costume("sjump2", "./Boom/costumes/sjump2.png", { x: 34, y: 38 }),
      new Costume("sjump3", "./Boom/costumes/sjump3.png", { x: 34, y: 38 }),
      new Costume("sjump4", "./Boom/costumes/sjump4.png", { x: 34, y: 38 }),
      new Costume("sjump5", "./Boom/costumes/sjump5.png", { x: 34, y: 38 }),
      new Costume("sjump6", "./Boom/costumes/sjump6.png", { x: 34, y: 43 }),
      new Costume("sjump7", "./Boom/costumes/sjump7.png", { x: 34, y: 38 }),
      new Costume("sjump8", "./Boom/costumes/sjump8.png", { x: 34, y: 38 }),
      new Costume("shurt", "./Boom/costumes/shurt.png", { x: 35, y: 50 }),
      new Costume(
        "pxArt-removebg-preview",
        "./Boom/costumes/pxArt-removebg-preview.png",
        { x: 195, y: -198 }
      )
    ];

    this.sounds = [
      new Sound("jump", "./Boom/sounds/jump.wav"),
      new Sound("death", "./Boom/sounds/death.wav"),
      new Sound("enemy dead", "./Boom/sounds/enemy dead.wav"),
      new Sound("Green Hill", "./Boom/sounds/Green Hill.wav")
    ];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Green Flag" },
        this.whenIReceiveGreenFlag
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Play Game" },
        this.whenIReceivePlayGame
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Play Game" },
        this.whenIReceivePlayGame2
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "End Game" },
        this.whenIReceiveEndGame
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Bounce" },
        this.whenIReceiveBounce
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Enemy dead" },
        this.whenIReceiveEnemyDead
      ),
      new Trigger(Trigger.BROADCAST, { name: "Die" }, this.whenIReceiveDie),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Play Game" },
        this.whenIReceivePlayGame3
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Game Over" },
        this.whenIReceiveGameOver
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Play Game" },
        this.whenIReceivePlayGame4
      )
    ];

    this.vars.x = 1040;
    this.vars.y = -35;
    this.vars.sy = 0;
    this.vars.inAir = 0;
    this.vars.alive = 1;
  }

  *whenGreenFlagClicked() {
    this.visible = false;
  }

  *whenIReceiveGreenFlag() {
    this.visible = false;
    this.moveAhead();
  }

  *whenIReceivePlayGame() {
    this.size = 100;
    this.direction = 90;
    this.stage.vars.lives = 5;
    while (true) {
      yield* this.broadcastAndWait("Reset");
      yield* this.broadcastAndWait("Setup");
      yield* this.gameOn();
      while (!(this.vars.alive == 0)) {
        yield* this.tick();
        this.broadcast("Tick");
        yield;
      }
      yield* this.gameDie();
      yield;
    }
  }

  *gameOn() {
    this.vars.x = 0;
    this.vars.y = 0;
    this.vars.sy = 0;
    this.vars.inAir = 0;
    this.stage.vars.exit = "";
    this.stage.vars.jump = 0;
    this.stage.vars.run = 0;
    this.vars.alive = 1;
    this.visible = true;
  }

  *tick() {
    if (this.keyPressed("left arrow")) {
      this.direction = -90;
      this.warp(this.changePlayerXBy)(-10);
    }
    if (this.keyPressed("right arrow")) {
      this.direction = 90;
      this.warp(this.changePlayerXBy)(10);
    }
    if (this.keyPressed("up arrow")) {
      if (this.vars.inAir == 0) {
        yield* this.startSound("jump");
      }
      if (this.vars.inAir < 4) {
        this.vars.sy = 19;
      }
    }
    this.vars.sy += -2;
    this.warp(this.changePlayerYBy)(this.vars.sy);
    this.warp(this.testDie)();
    this.stage.vars.scrollX = this.vars.x;
    if (this.stage.vars.scrollX < 0) {
      this.stage.vars.scrollX = 0;
    }
    if (this.stage.vars.scrollX > 8150) {
      this.stage.vars.scrollX = 8150;
    }
    this.stage.vars.scrollY += Math.round(
      (this.vars.y - this.stage.vars.scrollY) / 10
    );
    if (this.stage.vars.scrollY < 0) {
      this.stage.vars.scrollY = 0;
    }
    this.warp(this.position)();
    if (this.vars.y < -180) {
      this.vars.alive = 0;
    }
  }

  *changePlayerYBy(sy2) {
    this.vars.y += sy2;
    this.vars.inAir += 1;
    yield* this.position();
    while (!!this.touching(this.sprites["Level"].andClones())) {
      if (sy2 > 0) {
        this.vars.y += -1;
      } else {
        this.vars.y += 1;
        this.vars.inAir = 0;
      }
      yield* this.position();
      this.vars.sy = 0;
      yield;
    }
  }

  *position() {
    this.goto(
      this.vars.x - this.stage.vars.scrollX,
      this.vars.y - this.stage.vars.scrollY
    );
  }

  *changePlayerXBy(sx) {
    this.vars.x += sx;
    yield* this.position();
    if (this.touching(this.sprites["Level"].andClones())) {
      for (let i = 0; i < 20; i++) {
        this.vars.y += 1;
        yield* this.position();
        if (!this.touching(this.sprites["Level"].andClones())) {
          return;
        }
        yield;
      }
      this.vars.y += -20;
      while (!!this.touching(this.sprites["Level"].andClones())) {
        if (sx > 0) {
          this.vars.x += -1;
        } else {
          this.vars.x += 1;
        }
        yield* this.position();
        yield;
      }
    }
  }

  *gameDie() {
    yield* this.startSound("death");
    this.vars.alive = 0;
    this.costume = "shurt";
    for (let i = 0; i < 7; i++) {
      this.y += 5;
      yield;
    }
    yield* this.wait(0.3);
    while (!(-180 > this.y)) {
      this.y += -7;
      yield;
    }
    this.costume = "sstand";
    this.direction = 90;
  }

  *whenIReceivePlayGame2() {
    this.costume = "sstand";
    while (true) {
      if (this.vars.alive == 1) {
        if (this.stage.vars.jump == 0 && this.keyPressed("up arrow")) {
          this.costume = "sjump1";
          this.stage.vars.jump = 1;
        } else {
          if (this.stage.vars.jump == 1 && this.vars.inAir > 0) {
            this.costumeNumber += 1;
            if (this.costumeNumber == 19) {
              this.costume = "sjump1";
            }
          } else {
            if (
              this.stage.vars.run == 0 &&
              (this.keyPressed("left arrow") || this.keyPressed("right arrow"))
            ) {
              this.costume = "s1";
              this.stage.vars.run = 1;
            } else {
              if (
                this.stage.vars.run == 1 &&
                (this.keyPressed("left arrow") ||
                  this.keyPressed("right arrow"))
              ) {
                this.costumeNumber += 1;
                if (this.costumeNumber == 11) {
                  this.costume = "s1";
                }
              } else {
                if (this.stage.vars.jump == 1 && this.vars.inAir < 2) {
                  this.costume = "sstand";
                  this.stage.vars.jump = 0;
                } else {
                  if (
                    this.stage.vars.run == 1 &&
                    this.vars.inAir < 2 &&
                    !(
                      this.keyPressed("left arrow") ||
                      this.keyPressed("right arrow")
                    )
                  ) {
                    this.costume = "sstand";
                    this.stage.vars.run = 0;
                    this.stage.vars.jump = 0;
                  }
                }
              }
            }
          }
        }
      }
      yield;
    }
  }

  *testDie() {
    if (this.touching(this.sprites["Spikes"].andClones())) {
      this.vars.alive = 0;
      this.stage.vars.lives += -1;
    }
  }

  *whenIReceiveEndGame() {
    /* TODO: Implement stop other scripts in sprite */ null;
    this.effects.clear();
    this.direction = 90;
    this.costume = "s1";
    this.visible = true;
    while (!(this.x > 240)) {
      this.costumeNumber += 1;
      this.x += 10;
      if (this.costumeNumber == 12) {
        this.costume = "s1";
      }
      yield;
    }
    this.visible = false;
  }

  *whenIReceiveBounce() {
    for (let i = 0; i < 8; i++) {
      this.vars.sy += 5;
      yield;
    }
  }

  *whenIReceiveEnemyDead() {
    yield* this.startSound("enemy dead");
    for (let i = 0; i < 4; i++) {
      this.vars.sy += 5;
      yield;
    }
  }

  *whenIReceiveDie() {
    this.stage.vars.lives += -1;
    yield* this.gameDie();
  }

  *whenIReceivePlayGame3() {
    while (true) {
      if (this.stage.vars.lives == 0) {
        this.broadcast("Game Over");
      }
      yield;
    }
  }

  *whenIReceiveGameOver() {
    /* TODO: Implement stop other scripts in sprite */ null;
  }

  *whenIReceivePlayGame4() {
    while (true) {
      yield* this.playSoundUntilDone("Green Hill");
      yield;
    }
  }
}
