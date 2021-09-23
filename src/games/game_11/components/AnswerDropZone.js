import Phaser from 'phaser'

export default class AnswerDropZone extends Phaser.GameObjects.Container {

    constructor(scene, x, y, question) {

        super(scene, x, y);
        scene.add.existing(this);

        this.dropZone = undefined;
        this.stageSlaverSprite = undefined;
        this.offset = 0

        this.init(this, scene, question);
    }

    init(self, scene, question) {

        self.stageSlaverSprite = scene.add.image(0, 0, 'stageSalver').setScale(0.6)

        self.dropZone = scene.add.zone(100, 100, this.stageSlaverSprite.displayWidth, this.stageSlaverSprite.displayHeight).setRectangleDropZone(this.stageSlaverSprite.displayWidth, this.stageSlaverSprite.displayHeight);

        self.add([this.stageSlaverSprite, this.dropZone]);

        this.addDropEventListener(scene, this.checkAnswer, question, self);

        this.addSuccessEventListener(scene);
        this.addFailedEventListener(scene);

    }

    /*
     *
        set drop event listener
      */
    addDropEventListener(scene, callback, question, self) {
        scene.input.on('drop', (pointer, gameObject, dropZone) => callback(pointer, gameObject, dropZone, scene, question, self))
    }

    /*
     * 
        set success event listener
     */
    addSuccessEventListener(scene) {
        this.on('gameSuccess', () => {
            scene.paintGameSuccess()
            // scene.time.addEvent({
            //     delay: 500,
            //     callback: () => scene.scene.start('End')
            // })
        })
    }

    /*
     * 
       set failed event listener
     */
    addFailedEventListener(scene) {
        this.on('gameFailed', () => {
            console.log('failed')
            scene.paintGameFailed()
        })
    }

    /** 
     * check answer
     * 检测drop的内容 
     */
    checkAnswer(pointer, gameObject, dropZone, scene, question, self) {
        console.log(scene.question.modifier)
        console.log(gameObject.labelText.text)
        console.log(self.count('visible', true))
        if (question.modifier.indexOf(gameObject.labelText.text) > -1) {

            gameObject.changeStyle(0.3, '35px')
            // let dropPoint = { x: gameObject.x, y: gameObject.y }
            // gameObject.x = dropPoint.x
            // gameObject.y = dropPoint.y
            // console.log(gameObject)     
            // console.log(self.stageSlaverSprite.displayWidth)
            // gameObject.x=-self.stageSlaverSprite.displayWidth/2+(self.x-dropPoint.x)
            // gameObject.x=dropZone.x-self.stageSlaverSprite.displayWidth/2+30 ///小的
            console.log("第一次" + self.offset)
            gameObject.x = dropZone.x - self.stageSlaverSprite.displayWidth / 2 + 60 + self.offset ///大的
            console.log("第二次" + self.offset)
            self.offset += gameObject.displayWidth / 2
            console.log("第三次" + self.offset)
            gameObject.y = 0
            self.add([gameObject])
            gameObject.input.enabled = false;

            if (self.count('visible', true) - 2 == question.modifier.length) {
                self.emit('gameSuccess')
            }
        } else {
            gameObject.x = gameObject.originPoint.originPointX
            gameObject.y = gameObject.originPoint.originPointY

            /* 顯示打錯的頁面 */
            self.emit('gameFailed')
        }
    }



}