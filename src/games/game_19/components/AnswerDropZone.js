import Phaser from 'phaser'

export default class AnswerDropZone extends Phaser.GameObjects.Container {

    constructor(scene, x, y, question) {

        super(scene, x, y);
        this.scene = scene;
        scene.add.existing(this);

        this.stageSlaverSprite = undefined;
        this.offset = 0;

        this.init(this, scene, question);
    }

    init(self, scene, question) {

        this.stageSlaverSprite = scene.add.image(0, 0, 'stageSalver').setScale(0.6);

        let dropZone = scene.add.zone(0, 0, this.stageSlaverSprite.displayWidth + 60, this.stageSlaverSprite.displayHeight + 60)
            .setRectangleDropZone(this.stageSlaverSprite.displayWidth, this.stageSlaverSprite.displayHeight);

        self.add([this.stageSlaverSprite, dropZone]);

        this.addDropEventListener(scene, this.checkAnswer, question, self);

        this.addSuccessEventListener(scene);
        this.addFailedEventListener(scene);

    }

    /*
     *
        set drop event listener
      */
    addDropEventListener(scene, callback, question, self) {
        scene.input.on('drop', (pointer, gameObject, dropZone) => callback(pointer, gameObject, dropZone, question, self,scene));
    }

    /*
     * 
        set success event listener
     */
    addSuccessEventListener(scene) {
        this.on('gameSuccess', () => {
            console.log('gameSuccess')
            scene.paintGameSuccess();
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
    checkAnswer(pointer, gameObject, dropZone, question, self,scene) {

        scene.sound.play('dropEffectSound')

        if (question.modifier.indexOf(gameObject.labelText.text) > -1) {

            gameObject.changeStyle(0.3, '35px');

            self.add([gameObject]);

            let toothList = self.list.filter(item => item.name == 'tooth');
            console.log({ toothList });

            for (let index = 0; index < toothList.length; index++) {

                if (index == 0) {
                    switch (gameObject.type) {
                        case 'bigTooth':
                            gameObject.x = -dropZone.width / 2 + 210;
                            break;
                        case 'smallTooth':
                            gameObject.x = -dropZone.width / 2 + 170;
                            break;
                    }
                }
                else {
                    let currentTooth = toothList[index];
                    let previousTooth = toothList[index - 1];

                    if (currentTooth.displayWidth != previousTooth.displayWidth) {

                        let currentToothWidth = currentTooth.getByName('toothTexture').displayWidth / 2;
                        let previousToothWidth = previousTooth.getByName('toothTexture').displayWidth / 2;

                        let distance = currentToothWidth + previousToothWidth + 10;

                        currentTooth.x = previousTooth.x + distance;

                    } else {

                        let distance = previousTooth.getByName('toothTexture').displayWidth + 10;

                        currentTooth.x = previousTooth.x + distance;
                    }


                }


            }

            gameObject.y = 0;


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