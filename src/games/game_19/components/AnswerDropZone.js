import Phaser from 'phaser'

export default class AnswerDropZone extends Phaser.GameObjects.Container {

    constructor(scene, x, y, question) {

        super(scene, x, y);
        this.scene = scene;
        scene.add.existing(this);

        this.stageSlaverSprite = undefined;
        this.offset = 0;

        this.init(scene, question);
    }

    init(scene, question) {

        this.stageSlaverSprite = scene.add.image(0, 0, 'stageSalver');

        let dropZone = scene.add.zone(0, 0, this.stageSlaverSprite.displayWidth + 100, this.stageSlaverSprite.displayHeight + 100)
            .setRectangleDropZone(this.stageSlaverSprite.displayWidth, this.stageSlaverSprite.displayHeight);

        this.add([this.stageSlaverSprite, dropZone]);

        this.setSize(dropZone.displayWidth, dropZone.displayHeight);

        // this.scene.physics.add.existing(this);

        this.addDropEventListener(scene, this.checkAnswer, question, this);

        this.addSuccessEventListener(scene);
        this.addFailedEventListener(scene);

    }

    /*
     *
        set drop event listener
      */
    addDropEventListener(scene, callback, question, self) {
        scene.input.on('drop', (pointer, gameObject, dropZone) => callback(pointer, gameObject, dropZone, question, self, scene));
    }

    /*
     * 
        set success event listener
     */
    addSuccessEventListener(scene) {
        this.on('gameSuccess', () => {
            scene.paintGameSuccess();
        })
    }

    /*
     * 
       set failed event listener
     */
    addFailedEventListener(scene) {
        this.on('gameFailed', (gameObject) => {

            scene.paintGameFailed(gameObject);
            
            
        })
    }

    /** 
     * check answer
     * 检测drop的内容 
     */
    checkAnswer(pointer, gameObject, dropZone, question, self, scene) {

        scene.sound.play('dropEffectSound');

        if (question.modifier.indexOf(gameObject.labelText.text) > -1) {
            self.add([gameObject]);
            self.setToothPosition(gameObject, dropZone);

            if (self.count('visible', true) - 2 == question.modifier.length) {
                self.emit('gameSuccess');
            }
        } else {

            gameObject.x = gameObject.originPoint.originPointX
            gameObject.y = gameObject.originPoint.originPointY

            /* 顯示打錯的頁面 */
            self.emit('gameFailed', gameObject);
        }
    }


    setToothPosition(tooth, dropZone) {
        tooth.changeStyle(0.3, '35px');

        let toothList = this.list.filter(item => item.name == 'tooth');

        for (let index = 0; index < toothList.length; index++) {

            if (index == 0) {
                switch (tooth.type) {
                    case 'bigTooth':
                        tooth.x = -dropZone.width / 2 + 220;
                        break;
                    case 'smallTooth':
                        tooth.x = -dropZone.width / 2 + 180;
                        break;
                }
            } else {
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

        tooth.y = 0;


        tooth.input.enabled = false;

    }



}