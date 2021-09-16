import DraggableContainer from './DraggableContainer'

export default class QuestionBox extends DraggableContainer  {
    constructor(scene,x,y,handType,dragHandler) {
        super(scene,x,y);

        const ImgsType = {
            'green': 'home_g',
            'yellow': 'home_y'
        }
        this.inPosition = {
            x,
            y
        }

        this.handKey = typeof ImgsType[handType] == 'undefined' ? ImgsType['green'] : ImgsType[handType];

        let handImg = scene.add.sprite(0, 0,this.handKey);
        this.create({draggableHeight: handImg.height , draggableWidth: handImg.width})
        let children = [handImg];
        let answerText = scene.add.text(
            handImg.width * 0 , handImg.height * 0.05, '今天是什么日子啊，可以去玩吗，\n \n 我想直达你你是电话费地方',
            {
                fontSize: '22px',
                color: '#000000',
                fontFamily: "Custom-Han-Serif"
            }
        )
        answerText.setOrigin(0.5)
        children.push(answerText)
        this.add(children)
        this.startDraggable();

        this.setDraggableHandler((pointer)=> {
            if(typeof dragHandler == 'function') dragHandler(this, pointer);
        })
        
    }

    //不在答案框内恢复原来位置；
    toOriginPosTween(time) {
        
        return this.scene.tweens.add({
            targets: this,
            x: this.inPosition.x,
            y: this.inPosition.y,
            alpha: 1,
            duration: time,
            ease: 'Power2'
        })
    }

    //放进答案框内；
    completeDragTween(x,y) {
        // this.stopDraggable();
        return this.scene.tweens.add({
            targets: this,
            x: x,
            y: y + 100,
            alpha: 1,
            duration: 500,
            ease: 'Power2'
        })
    }

    getIfTween() {
        return this.handKey;
    }
}