import { Scene } from 'phaser'
import config from '../config/Config';
import Button from '../objects/Button';

export default class EndScene extends Scene {
  constructor () {
    super('End');
  }

  init() {
    this.model = this.sys.game.globals.model;

    this.sys.game.globals.gtag.event(('game_1_end', { 'event_category': 'Game End'}))
  }

  preload () {
    let self = this

    self.background = self.add.image(config.width/2, config.height/2, 'endBg').setOrigin(.5, .5)
    self.background.setDisplaySize(config.width, config.height)

    self.anims.create({
      key: 'bg_space',
      frames: self.anims.generateFrameNames('bg_space', { prefix: 'bg_space', start: 0, end: 20, zeroPad: 4 }),
      repeat: -1
    });

    self.anims.create({
      key: 'bg_space_rocket',
      frames: self.anims.generateFrameNames('bg_space_rocket', { prefix: 'bg_space_rocket', start: 0, end: 20, zeroPad: 4 }),
      repeat: -1,
      duration: 2000
    });

    self.anims.create({
      key: 'bg_space_ufo',
      frames: self.anims.generateFrameNames('bg_space_ufo', { prefix: 'bg_space_ufo', start: 0, end: 20, zeroPad: 4 }),
      repeat: -1,
      duration: 2000
    });

    self.anims.create({
      key: 'char_create',
      frames: self.anims.generateFrameNames('char_end', { 
        prefix: self.model.character.end_key, 
        start: self.model.character.action.end[0], 
        end: self.model.character.action.end[1],
        zeroPad: 4
      }),
    });

    self.anims.create({
      key: 'char_repeat',
      frames: self.anims.generateFrameNames('char_end', { 
        prefix: self.model.character.end_key, 
        start: self.model.character.action.end2[0], 
        end: self.model.character.action.end2[1],
        zeroPad: 4
      }),
      repeat: -1
    });
  }

  create () {
    let self = this

    let bg_space = self.add.sprite(config.width/2 + 10, config.height/2 - 150, 'bg_space')
    bg_space.play('bg_space')

    let bg_rocket = self.add.sprite(config.width* 0.2, config.height * 0.4, 'bg_space_rocket')
    bg_rocket.play('bg_space_rocket')
    
    let bg_ufo = self.add.sprite(config.width* 0.7, config.height * 0.8, 'bg_space_ufo')
    bg_ufo.play('bg_space_ufo')

    self.add.image(config.width/2, config.height/2, 'endBoxBg')

    let char = self.add.sprite(config.width/2, config.height/2 - 30, 'Char')
    char.play('char_create')
    char.on('animationcomplete', function (sprite)
    {
      if (sprite.key === 'char_create')
      {
        char.play('char_repeat');
      }
    }, this);

    self.replayButton = new Button(self, config.width/2 - 220, config.height/2 + 310, 'rplBtn', 'Game', 'self')
    self.exitButton = new Button(self, config.width/2 + 220, config.height/2 + 310, 'extBtn')
  }
}