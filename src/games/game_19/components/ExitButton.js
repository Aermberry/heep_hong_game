import BasicButton  from './BasicButton';

export default class ExitButton extends BasicButton {
  constructor(scene,x,y,children){

    super(scene, x, y,children);

    let sprite =  scene.add.sprite(0, 0, 'gameProgressExitBtn')
    this.create(sprite,this.onClick.bind(this))

  }

  onClick(){
    window.history.back();
  }

  down(clickEvent) {
    this.origSprite.setFrame(1)
    super.down(clickEvent)
  }
}