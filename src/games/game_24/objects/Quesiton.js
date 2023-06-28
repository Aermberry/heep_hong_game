
export default class Question {
    constructor(scene, x, y, item,selectAnswerRecord) {
        this.roadText = null // 题目text;
        this.btnFull = null; //答案句号;
        this.btnCom = null; //答案逗号；
        this.answer  = item;
        this.selectAnswer;
        // let that = this;
        this.roadText = scene.add.text(
            0, 0, item.value,
            {
                fontSize: '60px',
                color: '#FFFFFF',
                fontFamily: "STKaitiTC-Black"
            }
        )
        this.btnCom = scene.add.sprite(this.roadText.width + 50, 0, 'btn_com');
        this.btnFull = scene.add.sprite(this.roadText.width + 50, 70, 'btn_full');
        this.container = scene.add.container(x, y, [this.roadText, this.btnFull, this.btnCom]);
        this.container.setSize(this.roadText.width, this.roadText.height);
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
                selectAnswerRecord(this.answer);
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
                selectAnswerRecord(this.answer);
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
        this.btnCom.setFrame(state);
        this.btnCom.y = 0;
        this.btnCom.visible = true;
        this.btnFull.setFrame(state);
        this.btnFull.y = 70
        this.btnFull.visible = true;
    }

}