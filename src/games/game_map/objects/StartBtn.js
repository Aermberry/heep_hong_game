import BasicBtn  from './BasicBtn';

export default class StartBtn extends BasicBtn {
  constructor(scene,x,y,children){
    super(scene, x, y,children)

    let sprite =  scene.add.sprite(0, 0, 'strBtn')
    this.create(sprite,this.onClick.bind(this))
    sprite.on('pointerup', this.onPointerUp.bind(this))    

  }

  onClick(){

    this.scene.scene.start('Map')

  }

  onPointerUp() {

    const fullscreenConfig = { navigationUI: 'hide' }

    const elem = document.querySelector('#game-container canvas');
    if (elem.requestFullscreen) {
        elem.requestFullscreen(fullscreenConfig);
    } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen(fullscreenConfig);
    } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen(fullscreenConfig);
    } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen(fullscreenConfig);
    }

  }


}