import { SceneBase } from "./SceneBase";

import playerPng from '../assets/ttgh-spritesheet.png';
import tilesheetPng from '../assets/tileset.png';
import spaceBgPng from '../assets/space-bg.png';
import bigStarsBgPng from '../assets/big-stars-bg.png';
import smallStarsBgPng from '../assets/small-stars-bg.png';
import mountainsBgPng from '../assets/mountains-bg.png';
import cratersFgPng from '../assets/craters-fg.png';
import cratersSmallFgPng from '../assets/craters-small-fg.png';
import homePng from '../assets/home.png';

import fontFnt from '../assets/font.fnt';
import fontPng from '../assets/font.png';

import mapJson from '../assets/map.json';
import playerJson from '../assets/ttgh-spritesheet.xml';

export class LoadScene extends SceneBase {
  private loader:any;

  constructor () {
    super({
      key: 'LoadScene'
    });
  }

  preload () {
    // Asset atlas.
    this.load.atlasXML('player', playerPng, playerJson);

    // Images.
    this.load.image('space-bg', spaceBgPng);
    this.load.image('big-stars-bg', bigStarsBgPng);
    this.load.image('small-stars-bg', smallStarsBgPng);
    this.load.image('mountains-bg', mountainsBgPng);
    this.load.image('craters-fg', cratersFgPng);
    this.load.image('craters-small-fg', cratersSmallFgPng);
    this.load.image('home', homePng);

    // for (let i = 0; i < 1000; i++) {
    //   this.load.image('craters-fg' + i, cratersFgPng);
    // }

    // Fonts.
    this.load.bitmapFont('font', fontPng, fontFnt);

    // Level map.
    this.load.tilemapTiledJSON('map', mapJson);
    this.load.spritesheet('tilesheet', tilesheetPng, {frameWidth: 16, frameHeight: 16});

    // Basic graphics and loading bar.
    let graphics = this.add.graphics();
    graphics.fillStyle(0x000000, 1);
    graphics.fillRect(0, 0, this.gameWidth, this.gameHeight);
    graphics.fillStyle(0xffffff, 1);

    this.loader = this.add.image(this.gameWidth / 2, this.gameHeight / 1.25, 'loader');
    this.loader.setScrollFactor(0);
    this.loader.setScale(4);
    this.loader.alpha = 1;

    let logo = this.add.image(this.gameWidth / 2, this.gameHeight / 3, 'logo');
    logo.setScrollFactor(0);
    logo.setScale(8);

    // Progress bar.
    this.load.on('progress', (percent:number) => {
      graphics.fillRect(this.loader.x - (this.loader.displayWidth / 2) + 22, this.loader.y - (this.loader.displayHeight / 2), (this.loader.displayWidth - 44) * percent, this.loader.displayHeight);
    })

    // Go to next scene when loading is done.
    this.load.on('complete', () => {
      this.cameras.main.fadeOut(600, 0, 0, 0, (camera:any, progress:number) => {
        if (progress === 1) {
          this.scene.start('MenuScene', {});
        }
      });
    })
  }
}