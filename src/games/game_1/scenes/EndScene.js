import { Scene } from 'phaser'
import config from '../config/Config';
import Button from '../objects/Button';

export default class EndScene extends Scene {
  constructor () {
    super('End');
  }

  preload () {
    let self = this

    self.background = self.add.image(config.width/2, config.height/2, 'endBg').setOrigin(.5, .5)
    self.background.setDisplaySize(config.width, config.height)

    self.anims.create({
      key: 'bg_space',
      frames: self.anims.generateFrameNames('bg_space', { prefix: 'frame', start: 0, end: 49 }),
      repeat: -1
    });

    self.anims.create({
      key: 'char_create',
      frames: self.anims.generateFrameNames('char_end', { prefix: 'frame', start: 0, end: 47 }),
    });

    self.anims.create({
      key: 'char_repeat',
      frames: self.anims.generateFrameNames('char_end', { prefix: 'frame', start: 47, end: 100 }),
      repeat: -1
    });
  }

  create () {
    let self = this

    let bg_space = self.add.sprite(config.width/2 + 10, config.height/2 - 150, 'bg_space')
    bg_space.play('bg_space')

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