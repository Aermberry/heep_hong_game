import BasicBtn  from './BasicBtn';

export default class TipsBtn extends BasicBtn {
  constructor(scene,x,y,children){
    super(scene, x, y,children);
    let sprite =  scene.add.sprite(0, 0, 'tipsBtn')
    this.create(sprite,this.onClick.bind(this))

  }

  onClick() {
    this.scene.showHighlightStroke();
  }

}