import Car from "./Car";
import SelectCar from "./SelectCar";
import DropZone from "./DropZone";
import SubjectItem from "./SubjectItem";
export default class Question {
    constructor(scene) {

        let data = scene.dataModal.filter((item) =>
            !scene.pastProblems.includes(item))

        let random = Math.floor(Math.random() * data.length)
        let question = data[random];
        scene.pastProblems.push(question);
        this.index = scene.dataModal.indexOf(question);

        let regex = /\((.+?)\)/g;
        let answer = question.split(regex); // 完整的答案
        let items = question.match(regex) // 上方的选择项
        for (var i = 0; i < answer.length; i++) {
            if (answer[i] == '' || answer[i] == null || typeof (answer[i]) == undefined) {
                answer.splice(i, 1);
                i = i - 1;
            }
        }
        this.scene = scene;
        this.errorNum = 0;
        this.answer = answer;
        items.forEach((v, i) => {
            items[i] = v.split(regex)[1];
        });
        let subject = Object.assign([], answer); //生成的题目
        items.forEach((item) => {
            subject.forEach((v, i) => {
                if (v == item) {
                    subject.splice(i, 1);
                    return;
                }
            });
        });
        // let dropZone = 
        new DropZone(scene, 400, 40);
        scene.subjectItem = new SubjectItem(scene, 300, 450, [])
        // 渲染题目
        subject.forEach((v, i) => {
            scene.subjectItem.add(new Car(scene, scene.subjectItem.length < 1 ? 0 : scene.subjectItem.list[i - 1].x + scene.subjectItem.list[i - 1].width + 20, 450, v));
        });
        this.selectItem = [];
        //渲染选择项
        items.forEach((v, i) => {
            this.selectItem.push(new SelectCar(scene, this.selectItem.length < 1 ? 700 : this.selectItem[i - 1].x + this.selectItem[i - 1].width + 20, 220, v, this));
        });
    }

    openDrop() {
        this.selectItem.forEach(o => {
            this.scene.input.setDraggable(o, true);
        })
    }

    closeDrop() {
        this.selectItem.forEach(o => {
            this.scene.input.setDraggable(o, false);
        })
    }

    onChange() {
        if (this.answer.length != this.scene.subjectItem.list.length) {
            this.scene.goBtn.setStatus(false);
        } else {
            this.scene.goBtn.setStatus(true);
            // 完成填空，可以点击出发
        }
    }

    onGoButtonClcik() {
        let answer = [];
        this.closeDrop();
        this.scene.subjectItem.list.forEach((item) => {
            answer.push(item.last.text);
        })
        if (JSON.stringify(this.answer).toString() == JSON.stringify(answer).toString()) {
            this.gameWinner();
        } else {
            this.gameFailed();
        }
    }

    gameWinner() {
        //獲取當前句子音頻索引
        let correctAudio = this.scene.sound.add(this.index);
        correctAudio.play();
        correctAudio.on('complete', () => {
            this.scene.subjectItem.x = 0;
            this.scene.ltBtn.destroy();
            this.scene.rtBtn.destroy();
            let self = this;
            let audio = this.scene.sound.add('winnerSound');
            audio.play();
            this.move(this.scene.subjectItem, 2000).then(() => {
                let wow_car = this.scene.add.sprite(1100, 600, 'wow_car')
                wow_car.play('wow_car')
                let audio = this.scene.sound.add('winnerSound2');
                audio.play();
                wow_car.on('animationcomplete', () => {
                    if (self.scene.currentLevel == 5) {
                        self.scene.scene.start('End')
                    } else {
                        self.scene.scene.start('Game', {
                            level: self.scene.currentLevel + 1,
                            pastProblems: self.scene.pastProblems
                        })
                    }
                });
            })
        })
    }

    gameFailed() {
        this.errorNum++
        let self = this;
        self.scene.goBtn.setStatus(false);
        this.scene.subjectItem.x = 0;
        if (this.errorNum > 1) {
            this.showRightAnswer();
            return;
        }
        let audio = this.scene.sound.add('errorSound');
        audio.play();
        self.move(self.scene.subjectItem, self.scene.subjectItem.x + 100, 200).then(() => {
            self.move(self.scene.subjectItem, self.scene.subjectItem.x + -100, 200).then(() => {
                self.move(self.scene.subjectItem, self.scene.subjectItem.x + 100, 200).then(() => {
                    self.move(self.scene.subjectItem, self.scene.subjectItem.x + 0, 200).then(() => {
                        setTimeout(() => {
                            self.scene.subjectItem.reset();
                            this.openDrop();
                        }, 500)
                    })
                })
            })
        })
    }

    showRightAnswer() {
        let self = this;
        self.list = self.scene.subjectItem.list;
        this.scene.ltBtn.destroy();
        this.scene.rtBtn.destroy();
        self.answer.forEach((item, i) => {
            self.list.some((v) => {
                if (v.last.text == item) {
                    if (!v.seed) {
                        v.seed = i;
                        return true;
                    }
                }
            });
        })
        self.scene.subjectItem.sortBySeed();
        let animation = self.scene.add.sprite(960, 840, 'answer');
        animation.play('answer');
        animation.on('animationcomplete', () => {
            setTimeout(() => {
                animation.destroy();
                self.gameWinner();
            }, 3000);
        })
    }


    move(o, x, d = 1000) {
        return new Promise((resolve) => {
            this.scene.tweens.add({
                targets: o,
                x: x,
                duration: d,
                ease: 'Power2'
            }).on('complete', () => {
                resolve();
            });
        })
    }


}