import Phaser from 'phaser'
export default class QuestionItem extends Phaser.GameObjects.Container {
    constructor(scene, x, y, item, index, selectAnswerRecord) {
        super(scene, x, y);
        scene.add.existing(this);
        this.roadText = null // 题目text;
        this.btnQuery = null; //答案问号;
        this.btnAnd = null; //答案顿号；
        this.btnExclamationMark = null //答案叹号；
        this.btnComms = null //答案逗号；
        this.answer = item[index];
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
        if (this.answer.type == null) {
            this.add(
                [this.roadText]
            )
        } else {
            if (item.length == 4) {
                this.btnQuery = scene.add.sprite(this.roadText.width + 50, -55, 'btn_que');
                this.btnAnd = scene.add.sprite(this.roadText.width + 50, 0, 'btn_and');
                this.btnExclamationMark = scene.add.sprite(this.roadText.width + 50, 55, 'btn_ex');
                this.btnComms = scene.add.sprite(this.roadText.width + 50, 110, 'btn_com');
                this.add(
                    [this.roadText, this.btnQuery, this.btnAnd, this.btnExclamationMark, this.btnComms]
                )
                this.btnComms.setDisplaySize(50, 50);
                this.btnComms.setInteractive({
                    useHandCursor: true
                })
                    .on('pointerdown', () => {
                        this.btnQuery.setFrame(0);
                        this.btnAnd.setFrame(0);
                        this.btnExclamationMark.setFrame(0)
                        this.btnComms.setFrame(1);
                        if (this.answer.type == "comms") {
                            this.answer.result = true;
                        } else {
                            this.answer.result = false;
                        }
                        this.selectAnswer = "comms";
                        selectAnswerRecord(this.answer, index);
                    });
            } else {
                this.btnQuery = scene.add.sprite(this.roadText.width + 50, -30, 'btn_que');
                this.btnAnd = scene.add.sprite(this.roadText.width + 50, 35, 'btn_and');
                this.btnExclamationMark = scene.add.sprite(this.roadText.width + 50, 90, 'btn_ex');
                // this.btnComms = scene.add.sprite(this.roadText.width + 50, 110, 'btn_com');
                this.add(
                    [this.roadText, this.btnQuery, this.btnAnd, this.btnExclamationMark]
                )
            }
            this.btnQuery.setDisplaySize(50, 50);
            this.btnQuery.setInteractive({
                useHandCursor: true
            })
                .on('pointerdown', () => {
                    this.btnQuery.setFrame(1);
                    this.btnAnd.setFrame(0);
                    this.btnExclamationMark.setFrame(0)
                    if (this.btnComms != null) { this.btnComms.setFrame(0); }

                    if (this.answer.type == "query") {
                        this.answer.result = true;
                    } else {
                        this.answer.result = false;
                    }
                    this.selectAnswer = "query";
                    selectAnswerRecord(this.answer, index);
                });
            this.btnAnd.setDisplaySize(50, 50);
            this.btnAnd.setInteractive({
                useHandCursor: true
            })
                .on('pointerdown', () => {
                    this.btnQuery.setFrame(0);
                    this.btnAnd.setFrame(1);
                    this.btnExclamationMark.setFrame(0)
                    if (this.btnComms != null) {
                        this.btnComms.setFrame(0);
                    }
                    if (this.answer.type == "and") {
                        this.answer.result = true;
                    } else {
                        this.answer.result = false;
                    }
                    this.selectAnswer = "and";
                    selectAnswerRecord(this.answer, index);
                });
            this.btnExclamationMark.setDisplaySize(50, 50);
            this.btnExclamationMark.setInteractive({
                useHandCursor: true
            })
                .on('pointerdown', () => {
                    this.btnQuery.setFrame(0);
                    this.btnAnd.setFrame(0);
                    this.btnExclamationMark.setFrame(1)
                    if (this.btnComms != null) { this.btnComms.setFrame(0); }
                    if (this.answer.type == "exclamationMark") {
                        this.answer.result = true;
                    } else {
                        this.answer.result = false;
                    }
                    this.selectAnswer = "exclamationMark";
                    selectAnswerRecord(this.answer, index);
                });
        }

        this.setSize(this.roadText.width, this.roadText.height);

    }

    setFramebtn(state) {
        console.log(this.selectAnswer)
        if (this.selectAnswer == "query") {
            this.btnQuery.setFrame(state);
            this.btnQuery.y = 35;
            this.btnAnd.visible = false;
            this.btnExclamationMark.visible = false;
            if (this.btnComms != null) { this.btnComms.visible = false; }
        } else if (this.selectAnswer == 'and') {
            this.btnAnd.setFrame(state);
            this.btnAnd.y = 35;
            this.btnQuery.visible = false;
            this.btnExclamationMark.visible = false;
            if (this.btnComms != null) { this.btnComms.visible = false; }
        } else if (this.selectAnswer == 'exclamationMark') {
            this.btnExclamationMark.setFrame(state);
            this.btnExclamationMark.y = 35;
            this.btnQuery.visible = false;
            this.btnAnd.visible = false;
            if (this.btnComms != null) { this.btnComms.visible = false; }
        } else if (this.selectAnswer == 'comms') {
            this.btnComms.setFrame(state);
            this.btnComms.y = 35;
            this.btnQuery.visible = false;
            this.btnAnd.visible = false;
            this.btnExclamationMark.visible = false;
        }
    }

    resetting(state) {
        if (this.answer.type == "query") {
            this.btnQuery.setFrame(state);
            this.btnQuery.y = 35;
            this.btnQuery.visible = true;
            this.btnAnd.visible = false;
            this.btnExclamationMark.visible = false;
            if (this.btnComms != null) { this.btnComms.visible = false; }
        } else if (this.answer.type == 'and') {
            this.btnAnd.setFrame(state);
            this.btnAnd.y = 35;
            this.btnAnd.visible = true;
            this.btnQuery.visible = false;
            this.btnExclamationMark.visible = false;
            if (this.btnComms != null) { this.btnComms.visible = false; }
        } else if (this.answer.type == 'exclamationMark') {
            this.btnExclamationMark.setFrame(state);
            this.btnExclamationMark.y = 35;
            this.btnExclamationMark.visible = true;
            this.btnQuery.visible = false;
            this.btnAnd.visible = false;
            if (this.btnComms != null) { this.btnComms.visible = false; }
        } else if (this.answer.type == 'comms') {
            this.btnComms.setFrame(state);
            this.btnComms.y = 35;
            this.btnComms.visible = true;
            this.btnQuery.visible = false;
            this.btnAnd.visible = false;
            this.btnExclamationMark.visible = false;
        }
    }
}