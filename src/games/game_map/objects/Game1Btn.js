import BasicBtn from './BasicBtn'

export default class Game1Btn extends BasicBtn {
    constructor(scene,x,y,children){
        super(scene, x, y,children);

        let sprite =  scene.add.sprite(0, 0, 'game1Btn')
        this.create(sprite,this.onClick.bind(this))

      }

      onClick(){
          this.scene.scene.start('Section_1')
        // window.history.back();
      }
}