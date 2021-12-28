import BasicScene from './BasicScene'
import BasicBtn from '../objects/BasicBtn';

export default class PauseScene extends BasicScene {
  
  constructor () {
    super('Pause');
  }

  init() {
    this.gamePauseService = typeof this.sys.game.globals.gamePauseService === 'object' ? this.sys.game.globals.gamePauseService : null ;
  }

  preload () {

    //Bg and btn image need to replace with a universalize image
    this.load.image('pause_bg', require('../assets/Title.png'))
    this.load.spritesheet('cfmBtn', require('../assets/btn_cfm.png'),{ frameWidth: 917, frameHeight: 233 });

  }

  create () {

    this.buildBg('pause_bg')


    if(this.gamePuaseService) {
        this.resumeBtn = new BasicBtn(this, this.getColWidth(6), this.getRowHeight(6));
        //Button image may also need to provide a universalize image
        this.resumeBtn.create('cfmBtn', typeof this.gamePuaseService.resumeLastScene === 'function' ? this.gamePauseService.resumeLastScene: ()=> { this.scene.scene.start('Preloader') })
        this.add.existing(this.resumeBtn)
    }

    //已經連續遊玩超過15分鐘了
    //Begin time
    //update on landing gaming page, 
    //if last update is not exist or last update is 15 minute before current time, 
    //on press resume
    //update implement in vue
    


    //Last update time
    //Update on every 30 seconds, update implement in vue
    


    //if last update time is 15 minutes larger than begin time, scene.pause
    //Popup ask user to rest for 5minutes, or press resume to continue play



  }

  resumeGameCallback() {
    const currentPausedScene = this.gamePauseService.getCurrentPausedScene()
    this.scene.scene.resume(currentPausedScene)
  }
}
