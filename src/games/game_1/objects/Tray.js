import Phaser from 'phaser';
import _ from 'lodash';

export default class Tray extends Phaser.GameObjects.Container {

  constructor(scene, x, y) {
    super(scene,x,y);
    this.scene = scene;

  }

  init(items,correct){
    let self = this;
    self.items = items;
    self.correct = correct
    self.trayItems = [];
    self.create();
  }

  create(){
    let self = this
    self.tray = self.scene.add.image(0, 0, 'tray').setDepth(1);

    _.forEach(self.items, function(item,index){
      let space = index < 3 ? 110 : 85
      self.trayItems.push(self.scene.add.image(-120 + (index * space), -80, item).setDepth(2).setScale(0.75))
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
      targets: _.take(self.trayItems,3),
      y: 265,
      ease: 'Power0',
      duration: 500
    })

    if(self.trayItems.length > 3){
      self.scene.tweens.add({
        targets: _.takeRight(self.trayItems,1),
        y: 280,
        ease: 'Power0',
        duration: 500
      })
    }

    if(!self.correct){
      self.scene.tweens.add({
        targets: _.take(self.trayItems,1),
        angle: -30,
        delay: 700,
        duration: 300
      })

      self.scene.tweens.add({
        targets: _.tail(self.trayItems),
        angle: 30,
        delay: 700,
        duration: 300
      })

    }


  }

}