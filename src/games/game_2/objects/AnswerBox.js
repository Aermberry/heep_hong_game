import Phaser from 'phaser'

export default class AnswerBox extends Phaser.GameObjects.Container {
    constructor(scene, x, y) {
        super(scene, x, y)
        this.inPosition = {
            x,
            y
        }
        this.bamImg = scene.add.rectangle(0,0, 385, 400,0xffffff);
        this.children = [this.bamImg];
        this.add(this.children);
        this.setPosition(x,y)

        this.ifTween = false;
    }

    //
    selectAnswer() {
        this.errorWrongTween()
    }

    //错误动画
    errorWrongTween() {
        let wrong = this.scene.add.sprite(0,-100, 'wrong');
        this.children.push(wrong);
        this.add(this.children);
        this.setPosition(this.inPosition.x,this.inPosition.y)
        wrong.play('wrong').on('animationcomplete', () => {
            
        });
      
    }

    //正确动画
    yesTween() {
        let yes = this.scene.add.sprite(0,-100,'yes');
        this.children.push(yes);
        this.add(this.children);
        this.setPosition(this.inPosition.x,this.inPosition.y)
        yes.play('yes').on('animationcomplete',() => {
            console.log('播放完成');
           
        });
    }
 

    isInside({x, y}) {

        let topLeft = this.bamImg.getTopLeft()

        let bottomRight = this.bamImg.getBottomRight()

        let worldBody = {
            "topLeft": {
                x: this.inPosition.x + topLeft.x,
                y: this.inPosition.y + topLeft.y
            },
            "bottomRight": {
                x: this.inPosition.x + bottomRight.x,
                y: this.inPosition.y + bottomRight.y
            }
                        
        }

        return x >= worldBody.topLeft.x && x <= worldBody.bottomRight.x && y >= worldBody.topLeft.y && y <= worldBody.bottomRight.y;


    }
    
}