import Phaser from 'phaser'

export default class Game6Btn extends Phaser.GameObjects.Container {

  constructor(scene, x, y, imageName) {
    super(scene, x, y, [])
    this.origSprite = scene.add.sprite(0, 0, imageName)
    this.create(this.origSprite, this.scene.scene.start.bind(this.scene.scene, 'Section_6'))
  }

  create(sprite, clickEvent){
    this.origSprite = sprite
    this.add(this.origSprite)

    const zone = new Phaser.GameObjects.Ellipse (this.scene, 0, 50, this.origSprite.width - 50, this.origSprite.height/2, '#FFF', 0)
    this.add(zone)
    
    zone.setInteractive({
        useHandCursor: true
    })
    .on('pointerout', this.out.bind(this))
    .on('pointerover', this.over.bind(this))
    .on('pointerdown', this.down.bind(this, clickEvent));
  }

  out(){
    this.origSprite.setFrame(0)
  }

  over() {
    this.origSprite.setFrame(1)
  }

  down(clickEvent){
    this.origSprite.setFrame(1)
    if(typeof clickEvent == 'function') {
      setTimeout(() => {
        clickEvent()
      }, 500)
    }
  }

}