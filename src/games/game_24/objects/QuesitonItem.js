import Phaser from 'phaser'
export default class QuestionItem extends Phaser.GameObjects.Container {
    constructor(scene, x, y, item,index,selectAnswerRecord) {
        super(scene, x, y);
        scene.add.existing(this);
        this.roadText = null // 题目text;
        this.btnFull = null; //答案句号;
        this.btnCom = null; //答案逗号；
        this.answer  = item[index];
        this.selectAnswer;
        // let that = this;
        this.roadText = scene.add.text(
            0, 0, this.answer.value,
            {
                fontSize: '60px',
                color: '#FFFFFF',
                fontFamily: "STKaitiTC-Black"
            }
        )
        this.btnCom = scene.add.sprite(this.roadText.width + 50, 0, 'btn_com');
        this.btnFull = scene.add.sprite(this.roadText.width + 50, 70, 'btn_full');
        this.add(
            [this.roadText, this.btnFull, this.btnCom]
        )
        this.setSize(this.roadText.width, this.roadText.height);
        this.btnCom.setDisplaySize(50, 50);
        this.btnCom.setInteractive({
            useHandCursor: true
        })
            .on('pointerdown', () => {
                this.btnCom.setFrame(1);
                this.btnFull.setFrame(0);
                if(this.answer.type == "comm"){
                    this.answer.result = true;
                }else {
                    this.answer.result = false;
                }
                this.selectAnswer = "comm";
                selectAnswerRecord(this.answer,index);
            });
        this.btnFull.setDisplaySize(50, 50);
        this.btnFull.setInteractive({
            useHandCursor: true
        })
            .on('pointerdown', () => {
                this.btnFull.setFrame(1);
                this.btnCom.setFrame(0);
                if(this.answer.type == "full"){
                    this.answer.result = true;
                }else {
                    this.answer.result = false;
                }
                this.selectAnswer = "full";
                selectAnswerRecord(this.answer,index);
            });
    }

    setFramebtn(state) {
        if(this.selectAnswer == "full") {
            this.btnFull.setFrame(state);
            this.btnFull.y = 35;
            this.btnCom.visible = false;
        } else {
            this.btnCom.setFrame(state);
            this.btnCom.y = 35;
            this.btnFull.visible = false;
        }
    }

    resetting(state) {
        if(this.answer.type == "full") {
            this.btnFull.setFrame(state);
            this.btnFull.y = 35;
            this.btnCom.visible = false;
            this.btnFull.visible = true;
        } else {
            this.btnCom.setFrame(state);
            this.btnCom.y = 35;
            this.btnFull.visible = false;
            this.btnCom.visible = true;
        }
    }
        // this.btnCom.setFrame(state);
        // this.btnCom.y = 0;
        // this.btnCom.visible = true;
        // this.btnFull.setFrame(state);
        // this.btnFull.y = 70
        // this.btnFull.visible = true;
    // }

}