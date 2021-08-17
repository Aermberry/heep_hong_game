import BasicScene from "./BasicScene";

export default class TutorSecene extends BasicScene {

    constructor() {
        super({
            key: "Tutor"
        })
    }

    preload() {

        this.bg = this.add.image(0, 0, 'bg_tutor');
        this.bg.setDisplaySize(this.game.scale.width, this.game.scale.height);
        this.bg.setOrigin(0, 0);

        this.anims.create({
            key: 'tut1',
            delay: 200,
            frames: this.anims.generateFrameNames('tut1', { prefix: 'tut1', start: 0, end: 33, zeroPad: 4 }),
        });
        this.anims.create({
            key: 'tut2',
            delay: 200,
            frames: this.anims.generateFrameNames('tut2', { prefix: 'tut2', start: 0, end: 34, zeroPad: 4 }),
        });
        this.anims.create({
            key: 'tut3',
            delay: 200,
            frames: this.anims.generateFrameNames('tut3', { prefix: 'tut3', start: 0, end: 50, zeroPad: 4 }),
        });

    }

    create() {
        super.create();


        let tut1 = this.add.sprite(this.getColWidth(2), this.getRowHeight(8), 'tut1')
        let tut2 = this.add.sprite(this.getColWidth(5.8), this.getRowHeight(4), 'tut2')
        let tut3 = this.add.sprite(this.getColWidth(9.5), this.getRowHeight(7), 'tut3')

        this._repeatAnimate({tut1, tut2, tut3})

    }

    /**
     * @returns Promise
     */
    _repeatAnimate({tut1, tut2, tut3}) {

        tut1.play('tut1').once("animationcomplete", () => {
            tut2.play('tut2').once("animationcomplete", () => {
                tut3.play('tut3').once("animationcomplete", () => {
                    this._repeatAnimate({tut1, tut2, tut3});
                })
            })
        })

    }

}