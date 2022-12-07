import { Project } from "https://unpkg.com/leopard@^1/dist/index.esm.js";

import Stage from "./Stage/Stage.js";
import Boom from "./Boom/Boom.js";
import Level from "./Level/Level.js";
import Decoration from "./Decoration/Decoration.js";
import Rings from "./Rings/Rings.js";
import Spikes from "./Spikes/Spikes.js";
import Bouncer from "./Bouncer/Bouncer.js";
import Exit from "./Exit/Exit.js";
import Background from "./Background/Background.js";
import Rollerbug from "./Rollerbug/Rollerbug.js";
import BuzzBomber from "./BuzzBomber/BuzzBomber.js";
import Crabmeat from "./Crabmeat/Crabmeat.js";
import TopSensor from "./TopSensor/TopSensor.js";
import BottomSensor from "./BottomSensor/BottomSensor.js";
import LeftSensor from "./LeftSensor/LeftSensor.js";
import RightSensor from "./RightSensor/RightSensor.js";
import Score from "./Score/Score.js";
import Time from "./Time/Time.js";
import Rings2 from "./Rings2/Rings2.js";
import Lives from "./Lives/Lives.js";
import GameOver from "./GameOver/GameOver.js";
import Total from "./Total/Total.js";
import Sega from "./Sega/Sega.js";
import IntroLogo from "./IntroLogo/IntroLogo.js";
import IntroSonic from "./IntroSonic/IntroSonic.js";
import Transition from "./Transition/Transition.js";

const stage = new Stage({ costumeNumber: 1 });

const sprites = {
  Boom: new Boom({
    x: 0,
    y: -45,
    direction: 90,
    costumeNumber: 16,
    size: 100,
    visible: true,
    layerOrder: 22
  }),
  Level: new Level({
    x: 469,
    y: 61,
    direction: 90,
    costumeNumber: 24,
    size: 100,
    visible: false,
    layerOrder: 9
  }),
  Decoration: new Decoration({
    x: 462,
    y: 153,
    direction: 90,
    costumeNumber: 25,
    size: 100,
    visible: false,
    layerOrder: 2
  }),
  Rings: new Rings({
    x: -240,
    y: 110,
    direction: 90,
    costumeNumber: 3,
    size: 125,
    visible: false,
    layerOrder: 7
  }),
  Spikes: new Spikes({
    x: 240,
    y: 61,
    direction: 90,
    costumeNumber: 24,
    size: 100,
    visible: false,
    layerOrder: 8
  }),
  Bouncer: new Bouncer({
    x: -257,
    y: -122,
    direction: 90,
    costumeNumber: 1,
    size: 75,
    visible: false,
    layerOrder: 5
  }),
  Exit: new Exit({
    x: -243,
    y: 110,
    direction: 90,
    costumeNumber: 1,
    size: 75,
    visible: false,
    layerOrder: 6
  }),
  Background: new Background({
    x: 0,
    y: 0,
    direction: 90,
    costumeNumber: 1,
    size: 135,
    visible: true,
    layerOrder: 1
  }),
  Rollerbug: new Rollerbug({
    x: -245,
    y: 65,
    direction: -90,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 13
  }),
  BuzzBomber: new BuzzBomber({
    x: -253,
    y: 180,
    direction: 90,
    costumeNumber: 2,
    size: 100,
    visible: false,
    layerOrder: 3
  }),
  Crabmeat: new Crabmeat({
    x: -247,
    y: 175,
    direction: -90,
    costumeNumber: 4,
    size: 100,
    visible: false,
    layerOrder: 4
  }),
  TopSensor: new TopSensor({
    x: 0,
    y: 27,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: true,
    layerOrder: 12
  }),
  BottomSensor: new BottomSensor({
    x: 0,
    y: -27,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: true,
    layerOrder: 14
  }),
  LeftSensor: new LeftSensor({
    x: -17,
    y: 0,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: true,
    layerOrder: 11
  }),
  RightSensor: new RightSensor({
    x: 17,
    y: 0,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: true,
    layerOrder: 10
  }),
  Score: new Score({
    x: -208,
    y: 182,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: true,
    layerOrder: 17
  }),
  Time: new Time({
    x: -208,
    y: 114,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: true,
    layerOrder: 15
  }),
  Rings2: new Rings2({
    x: -205,
    y: 97,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: true,
    layerOrder: 16
  }),
  Lives: new Lives({
    x: -211,
    y: -164,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: true,
    layerOrder: 20
  }),
  GameOver: new GameOver({
    x: 0,
    y: 0,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: true,
    layerOrder: 18
  }),
  Total: new Total({
    x: 0,
    y: 0,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 23
  }),
  Sega: new Sega({
    x: 0,
    y: 0,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 21
  }),
  IntroLogo: new IntroLogo({
    x: 0,
    y: 0,
    direction: 90,
    costumeNumber: 1,
    size: 150,
    visible: false,
    layerOrder: 19
  }),
  IntroSonic: new IntroSonic({
    x: 0,
    y: -31,
    direction: 90,
    costumeNumber: 1,
    size: 150,
    visible: false,
    layerOrder: 24
  }),
  Transition: new Transition({
    x: 0,
    y: 0,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 25
  })
};

const project = new Project(stage, sprites, {
  frameRate: 30 // Set to 60 to make your project run faster
});
export default project;
