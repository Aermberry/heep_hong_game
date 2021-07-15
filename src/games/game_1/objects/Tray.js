import Phaser from 'phaser';
import _ from 'lodash';

export default class Tray extends Phaser.GameObjects.Container {

  constructor(scene, x, y) {
    super(scene,x,y);
    this.scene = scene;

  }

  init(items){
    let self = this
    self.items = items
    self.trayItems = [];
    self.create()
  }

  create(){
    let self = this
    self.tray = self.scene.add.image(0, 0, 'tray').setDepth(1);


    _.forEach(self.items, function(item,index){
      let space = index < 3 ? 120 : 10
      self.trayItems.push(self.scene.add.image(-120 + (index * space), -55, item).setDepth(2).setScale(0.8))
    })

    self.add(self.tray);
    self.add(self.trayItems);

    self.scene.tweens.add({
      targets: [self.tray],
      y: 320,
      ease: 'Power0',
      duration: 500
    })

    self.scene.tweens.add({
      targets: self.trayItems,
      y: 270,
      ease: 'Power0',
      duration: 500
    })
  }

}