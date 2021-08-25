import DraggableContainer from './DraggableContainer'

export default class CatHand extends DraggableContainer {

    constructor(scene, x, y, handType, dragHandler, answer) {
        super(scene, x + scene.getColWidth(1.5), y);

        const catHandImgs = {
            'white': 'an1',
            'black': 'an2'
        }

        const handKey = typeof catHandImgs[handType] == 'undefined' ? catHandImgs['white'] : catHandImgs[handType];

        this.answer = answer

        console.log(this.answer)

        this.inPosition = {
            x,
            y
        }

        this.setAlpha(0);

        let handImg =  scene.add.sprite(0, 0, handKey);
        let answerPic = scene.add.sprite(handImg.width * 0.135, 0, answer.image)
        this.create({draggableHeight: handImg.height , draggableWidth: handImg.width})

        this.add([handImg, answerPic])

        this.setDraggableHandler((pointer, gameObject)=> {

            console.log(pointer, gameObject)

            this.toOriginPosTween(500)
            if(typeof dragHandler == 'function') dragHandler(this, pointer);

        })


    }

    getAnswer() {
        return this.answer.index;
    }

    moveIn() {
        
        return new Promise((resolve)=> {
            
            this.toOriginPosTween(2000).on('complete', ()=> {

                this.startDraggable();

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