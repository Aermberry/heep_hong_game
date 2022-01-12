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

class ExistBtn extends Phaser.GameObjects.Container {

    constructor(scene, x, y, children) {
        super(scene, x, y, children)
        this.origSprite = null

    }

    create(sprite) {
        this.origSprite = sprite;
        this.add(this.origSprite)
        this.origSprite.setInteractive({
            useHandCursor: true
        })
            .on('pointerout', this.out.bind(this))
            .on('pointerdown', this.down.bind(this));
    }

    out() {
        this.origSprite.setFrame(0)
    }

    down() {
        this.origSprite.setFrame(1)
        window.location.href = window.location.origin
    }

}

class RestBox extends Phaser.GameObjects.Container {

    constructor(scene, x, y, children) {
        super(scene, x, y, children)
        
        // this.resumeBtn = new ResumeBtn(this.scene, 0, 0)

        this.existBtn = null;
        this.box = this.scene.add.image(0, 0, 'pause_box');
        this.restCat = this.scene.add.image(0, this.box.height * -0.15, 'pause_cat');

        // this.resumeBtn.create(resumetBtnSprite, ()=> {
        //     clearInterval(this.resumeCounter)
        //     this.scene.stop()
        //     gamePauseService.resumePausedScene();
        //     // lastScene.scene.start()
        // })
        // this.resumeBtn.setPosition(this.box.width * 0.1, this.box.height * 0.8)
        this.restCat.setOrigin(0.5)
        this.box.setOrigin(0.5)

        this.add([this.box, this.restCat]);

    }

} 

class PauseScene extends Phaser.Scene {

    constructor() {
        super('Pause');
    }

    init() {
        this.resumeTime = null
    }

    preload() {

        this.load.image('pause_box', require('../assets/images/pause_block/pause_box.png'))
        this.load.image('pause_cat', require('../assets/images/pause_block/pause_cat.png'))
        this.load.spritesheet('btn_con', require('../assets/images/pause_block/btn_con.png'), {frameWidth: 410, frameHeight: 163.5})
        this.load.spritesheet('btn_ext', require('../assets/images/pause_block/btn_ext.png'), {frameWidth: 410, frameHeight: 163.5})
        this.load.spritesheet('rplBtn', require('../games/game_5/assets/btn_rpl.png'),{ frameWidth: 410, frameHeight: 163.5 });

    }

    create({gamePauseService}) {

        
        this.backDrop = this.add.renderTexture(0, 0, this.sys.game.canvas.width, this.sys.game.canvas.height)
        this.backDrop.fill('0x000000', 0.4)
        
        this.bgBox = new RestBox(this, this.sys.game.canvas.width/2, this.sys.game.canvas.height/2)
        this.add.existing(this.bgBox)

        const resumetBtnSprite = this.add.image(0, 0, 'btn_con')
        this.resumeBtn = new ResumeBtn(this, this.sys.game.canvas.width * 0.38, this.sys.game.canvas.height * 0.75)
        this.resumeBtn.create(resumetBtnSprite, ()=> {
            clearInterval(this.resumeCounter)
            this.scene.stop()
            gamePauseService.resumePausedScene();
            // lastScene.scene.start()
        })

        this.countDownText = this.add.text(this.sys.game.canvas.width * 0.38, this.sys.game.canvas.height * 0.85, 'Text', {
            color: '#FFFFFF',
            stroke: "#000000",
            strokeThickness: 3,
            font: 'bold 30px monospace'
        },)
        this.countDownText.setOrigin(0.5)
        this.countDownText.setPadding(10, 10)
        this.startResumeCount(gamePauseService.getRestTime()* 60 * 1000, gamePauseService)
        
        this.add.existing(this.resumeBtn)

        const existSprite = this.add.image(0, 0, 'btn_ext')
        this.existBtn = new ExistBtn(this, this.sys.game.canvas.width * 0.62, this.sys.game.canvas.height * 0.75)
        this.existBtn.create(existSprite)
        this.add.existing(this.existBtn)


    }

    resumeGameCallback() {
        const currentPausedScene = this.gamePauseService.getCurrentPausedScene()
        this.scene.scene.resume(currentPausedScene)
    }

    startResumeCount(pauseSec, gamePauseService) {

        this.resumeTime = pauseSec

        this.countDownText.setText(this.resumeTimeFormat(this.resumeTime))

        this.resumeCounter = setInterval(()=> {
            if(this.resumeTime === 0) {
                clearInterval(this.resumeCounter)
                this.scene.stop()
                gamePauseService.resumePausedScene();
                
            }
            this.resumeTime -= 1000
            const curTime = this.resumeTimeFormat(this.resumeTime)

            this.countDownText.setText(curTime)
        }, 1000)

    }

    resumeTimeFormat(microseconds) {
        let minText = Math.floor(microseconds/1000/60)
        let secText = microseconds/1000 % 60

        minText = ('' + minText).length > 1 ? minText : '0' + minText
        secText = ('' + secText).length > 1 ? secText : '0' + secText

        return `${minText}:${secText}`;

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
        this.getRestTime = Vue.prototype.$gamePause.getRestTime

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

    Vue.prototype.$gamePause.getRestTime = ()=> {
        return this.restTime;
    }

}

export default { install }