import BasicBtn from './BasicBtn';

export default class SpeakerBtn extends BasicBtn {
  constructor(scene,x,y, musicPause){
    super(scene, x, y);

    this.scene = scene;
    this.musicPause = musicPause;

    this.sprite =  this.scene.add.sprite(0, 0, this.scene.dataModel.bgMusicPlaying ? 'speakerBtn' : 'offSpeakerBtn')
    this.create(this.sprite,this.onClick.bind(this))


  }

  onClick(){
    this.sprite.setTexture(this.scene.dataModel.bgMusicPlaying ? 'offSpeakerBtn' : 'speakerBtn');
    this.musicPause()
  }
}
