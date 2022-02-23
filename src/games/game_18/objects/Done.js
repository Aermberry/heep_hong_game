import BasicBtn  from './BasicBtn';

export default class Done extends BasicBtn {
  constructor(scene,x,y,musicPause){
    super(scene, x, y)
    this.scene = scene;
    this.musicPause = musicPause;
    let sprite =  scene.add.sprite(0, 0, 'Done')
    this.create(sprite,this.onClick.bind(this))
  }

  onClick(){
    this.scene.music = this.scene.sound.add('effect_select_teeth');
    this.scene.music.setLoop(false);
    this.scene.music.play();
    this.musicPause()
  }
}