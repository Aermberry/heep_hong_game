import BasicBtn  from './BasicBtn';

export default class StartBtn extends BasicBtn {
  constructor(scene,x,y,children){
    super(scene, x, y,children)

    let sprite =  scene.add.sprite(0, 0, 'strBtn')
    this.create(sprite,this.onClick.bind(this))

  }

  onClick(){

    this.scene.scene.start('Game')

  }
}