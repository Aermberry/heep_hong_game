import Phaser from 'phaser'

class ResumeBtn extends Phaser.GameObjects.Container {

    constructor(scene, x, y, children) {
        super(scene, x, y, children)
        this.origSprite = null
    }

    create(sprite, clickEvent) {
        this.origSprite = sprite;
        this.add(this.origSprite)
        this.origSprite.setInteractive({
            useHandCursor: true
        })
            .on('pointerout', this.out.bind(this))
            .on('pointerdown', this.down.bind(this, clickEvent));
    }

    out() {
        this.origSprite.setFrame(0)
    }

    down(clickEvent) {
        this.origSprite.setFrame(1)
        if (typeof clickEvent == 'function') {
            setTimeout(() => {
                clickEvent()
            }, 500)
        }
    }

}

class PauseScene extends Phaser.Scene {

    constructor() {
        super('Pause');
    }

    preload() {

        //Bg and btn image need to replace with a universalize image
        this.load.image('pause_bg', require('../games/game_5/assets/Title.png'))
        // this.load.spritesheet('cfmBtn', require('../games/game_5/assets/btn_cfm.png'), { frameWidth: 917, frameHeight: 233 });
        this.load.spritesheet('rplBtn', require('../games/game_5/assets/btn_rpl.png'),{ frameWidth: 410, frameHeight: 163.5 });

    }

    create({gamePauseService}) {

        const resumetBtnSprite = this.add.image(0, 0, 'rplBtn')
        this.resumeBtn = new ResumeBtn(this, this.sys.game.canvas.width/2, this.sys.game.canvas.height/2)
        this.resumeBtn.create(resumetBtnSprite, ()=> {
            this.scene.stop()
            gamePauseService.resumePausedScene();
            // lastScene.scene.start()
        })

        this.add.existing(this.resumeBtn)
//this.scene.add('myScene', ()=> {}, false, data)
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

    addLastScene() {

    }

    resumeGameCallback() {
        const currentPausedScene = this.gamePauseService.getCurrentPausedScene()
        this.scene.scene.resume(currentPausedScene)
    }
}

const install = function (Vue) {

    this.setCookieTimer = null
    this.lastPauseScene = ''
    this.phaserInstance = null
    this.isPaused = false

    this.testScope = '12345'

    Vue.prototype.$gamePause = () => {

    }

    Vue.prototype.$gamePause.initService = (gameInstance, timeLimit = 15, restTime = 5, onGamePauseCallback) => {

        this.gameInstance = gameInstance
        this.timeLimit = timeLimit
        this.restTime = restTime
        this.onGamePauseCallback = onGamePauseCallback
        this.resumePausedScene = Vue.prototype.$gamePause.resumePausedScene

        this.gameInstance.scene.add('Pause', PauseScene, false, this)

    }

    Vue.prototype.$gamePause.initGameTrackTimer = () => {

        if (this.setCookieTimer != null) clearInterval(this.setCookieTimer)

        let now = new Date()

        let existingStartTimestamp = window.localStorage.getItem('game_last_active_timestamp')
        let existingLastUpdateTimestamp = window.localStorage.getItem('game_last_update_timestamp')

        if (!existingStartTimestamp ||
            (existingLastUpdateTimestamp && existingLastUpdateTimestamp > (existingStartTimestamp + this.timeLimit * 60 * 1000))) {
            window.localStorage.setItem('game_last_active_timestamp', now.getTime())
            window.localStorage.setItem('game_last_update_timestamp', now.getTime())
        }

        this.setCookieTimer = setInterval(() => {

            const curStartTime = window.localStorage.getItem('game_last_active_timestamp')
            let date = new Date()
            const nowTimestamp = date.getTime()

            localStorage.setItem('game_last_update_timestamp', nowTimestamp)

            if (nowTimestamp > (parseInt(curStartTime) + (this.timeLimit * 60 * 1000)) && !this.isPause) {

                //Need to pause game
                Vue.prototype.$gamePause.pauseScene()

            }

        }, 1000)
    }


    Vue.prototype.$gamePause.clearTimer = () => clearInterval(this.setCookieTimer);


    Vue.prototype.$gamePause.pauseScene = () => {

        if (this.isPause) return;

        if (!this.gameInstance.scene.getScene('Pause')) return this.isPause = true;

        //Get all active scene and pause
        let currentScenes = this.gameInstance.scene.getScenes(true)

        //Try to find pause scene, and start that scene
        if (currentScenes && typeof currentScenes.length != 'undefined' && currentScenes.length > 0) {
            currentScenes.some((scene) => {
                scene.scene.pause()
                scene.scene.launch('Pause', {gamePauseService: this, lastScene: scene})

                
                return true;
            })
            if (typeof this.onGamePauseCallback === 'function') this.onGamePauseCallback()
            this.isPause = true
        }

        const now = new Date()
        //game paused, update last active time
        window.localStorage.setItem('game_last_active_timestamp', now.getTime())

    }

    Vue.prototype.$gamePause.resumePausedScene = () => {
        if (!this.isPause) return

        //Get all scene 
        let currentScenes = this.gameInstance.scene.getScenes(false)
        //check if the scene is paused, resume all paused scene
        if (currentScenes && typeof currentScenes.length != 'undefined' && currentScenes.length > 0) {
            currentScenes.forEach((scene) => {
                if (scene.scene.isPaused()) scene.scene.resume()
            })
        }

        const now = new Date()
        //game resumed, game_last_active_timestamp need to update
        window.localStorage.setItem('game_last_active_timestamp', now.getTime())
        this.isPause = false

    }

}

export default { install }