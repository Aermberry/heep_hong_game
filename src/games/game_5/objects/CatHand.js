import DraggableContainer from './DraggableContainer'

export default class CatHand extends DraggableContainer {

    constructor(scene, x, y, handType, dragHandler, onDragHandler,answer) {
        super(scene, x + scene.getColWidth(1.5), y);

        const catHandImgs = {
            'white': 'an1',
            'black': 'an2'
        }

        const handKey = typeof catHandImgs[handType] == 'undefined' ? catHandImgs['white'] : catHandImgs[handType];

        this.answer = answer

        this.inPosition = {
            x,
            y
        }

        this.setAlpha(0);
        // this.setScale(0.9);

        let handImg =  scene.add.sprite(0, 0, handKey);
        let answerPic = scene.add.sprite(handImg.width * 0.135, 0, answer.image)
        this.create({draggableHeight: handImg.height , draggableWidth: handImg.width})

        let children = [handImg, answerPic];

        if(typeof answer.text == 'string') {
            let answerText = scene.add.text(
                handImg.width * 0.135 , handImg.height * -0.05, answer.text,
                {
                    fontSize: (answerPic.width * .9) + 'px',
                    color: '#000000',
                    fontFamily: "Custom-STKaitiTC"
                }
            )
            answerText.setOrigin(0.5)
            // answerText.setOrigin(0.2, 0.45)
            children.push(answerText)
        }

        this.add(children)

        if(typeof dragHandler == 'function') {
            this.setDragEndHandler((pointer)=> { 
                // this.toOriginPosTween(500)
                dragHandler(this, pointer)
            });
        }

        if(typeof onDragHandler == 'function') {
            this.setOnDragHandler((pointer, gameObject)=> {
                
                onDragHandler(this, pointer, gameObject)
            });    
        }


    }

    getAnswer() {
        return this.answer.index;
    }

    moveIn() {
        
        return new Promise((resolve)=> {
            
            this.toOriginPosTween(750).on('complete', ()=> {

                this.startDraggable();

                this.scene.tweens.add({
                    targets: this,
                    // scale: 1,
                    angle: 10,
                    // repeat: 1,
                    yoyo: 1,
                    ease: 'Bounce.easeInOut',
                    duration: 250
                })

                resolve(this);

            })

        });

    }

    moveOut() {

        return new Promise((resolve)=> {
            
            this.moveTo(this.scene.getColWidth(-4), this.inPosition.y, 600).on('complete', ()=> {

                this.destroy();

                resolve();

            })

        });

    }

    disappear() {

        return new Promise((resolve)=> {

            this.scene.tweens.add({
                targets: this,
                scale: .05,
                duration: 200,
                ease: 'Power2'
            }).on('complete', ()=> {

                this.destroy();

                resolve();

            });
        });

    }

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

    moveTo(x, y, time) {

        return this.scene.tweens.add({
            targets: this,
            x: x,
            y: y,
            duration: time,
            ease: 'Power2'
        })

    }

}