import Road from "./Road"

export default class Answers {

    constructor(scene, x, y, winnerHandler, item) {
        //创建一个答案区域 一个答案244*99大小
        this.selectItems = [];
        this.item = item;
        let afterItem = this.shuffleArray(this.item);
        this.answersStartPoint = [];
        this.errorFrequency = 0;
        this.doneBtnFlag = true;
        this.scene = scene;
        this.answersArea = scene.add.zone(x, y, 260 *
            8, 110 * 3);
        this.answersArea.setRectangleDropZone(260 * 8, 110 * 3);

        // this.hoverArea = scene.add.rectangle(670, y + 50, 1200, this.answersArea.height - 50, 0xffffff, 1);
        // this.hoverArea.setAlpha(0)



        this.answers = []
        for (let i = 0; i < afterItem.length; i++) {
            if (i <= 3) {
                this.answers.push(new Road(scene, x + (275 * i), y, afterItem[i],
                    this.onDragHandler.bind(this),
                    this.onEndDragHandler.bind(this)
                ))
                this.answersStartPoint.push({
                    x: x + (275 * i),
                    y: y
                })
            } else {
                this.answers.push(new Road(scene, x + (275 * (i - 4)), y + 110, afterItem[i],
                    this.onDragHandler.bind(this),
                    this.onEndDragHandler.bind(this)
                ));
                this.answersStartPoint.push({
                    x: x + (275 * (i - 4)),
                    y: y + 110
                })
            }
        }
        this.scene = scene;
        this.winnerHandler = winnerHandler;
        let that = this;
        scene.input.on('drop', function (pointer, gameObject, dropZone) {
            if (dropZone.y !== 882.0000000000001) {
                //直接把gameobject当前位置加入到数组中，再进行排序
                if (!that.selectItems.includes(gameObject)) {
                    that.selectItems.push(gameObject)
                }
                that.selectItems.sort(that.sortX);
                let x = 480; //起始位置
                that.selectItems.forEach((item, index) => {
                    item.x = x + (243 * index)
                    item.y = dropZone.y
                })
            } else {
                if (that.selectItems.includes(gameObject)) {
                    that.selectItems.splice(that.selectItems.indexOf(gameObject), 1);
                }
                that.answers.forEach((item, index) => {
                    if (!that.selectItems.includes(item.container)) {
                        item.container.x = that.answersStartPoint[index].x
                        item.container.y = that.answersStartPoint[index].y
                    }
                })
            }
        });
    }

    onDragHandler(x, y) {
        x, y
        // if (x >= this.answersArea.x && x <= this.answersArea.width + x && y >= this.answersArea.y && x <= this.answersArea.height + x) {
        //     this.hoverArea.setAlpha(0.7);
        // } else {
        //     this.hoverArea.setAlpha(0.0);
        // }

    }

    onEndDragHandler() {
        if( this.selectItems.length == this.answers.length) {
            this.remind = this.scene.add.sprite(this.scene.getColWidth(11),this.scene.getRowHeight(8),'remind');
            this.remind.play('remind');
        } else {
            if(this.remind) {
                this.remind.destroy();
            }
        }
        // this.hoverArea.setAlpha(0.0);
    }

    sortX(a, b) {
        return a.x - b.x
    }


    onDoneBtnClicked() {
        if(this.remind) {
            this.remind.destroy();
        }
        let array = this.selectItems;
        if (array.length == this.answers.length && this.doneBtnFlag) {
            this.doneBtnFlag = false;
            let answers = [];
            array.forEach((item) => {
                answers.push(item.last.text);
            })
            if (answers.join('|') == this.item.join('|')) {
                this.answers.forEach((item) => {
                    this.scene.input.setDraggable(item.container, false)
                })
                this.scene.doneBtn.destroy();
                this.winnerHandler(true);
            } else {
                this.errorFrequency++;
                this.answers.forEach((item) => {
                    this.scene.input.setDraggable(item.container, false)
                })
                this.scene.car.play(`car_${this.scene.currentCar}_run`);
                this.scene.tweens.add({
                    targets: this.scene.car,
                    x: this.scene.car.x + 100,
                    duration: 500,
                    ease: 'Power2'
                }).on('complete', () => {
                    let stop = this.scene.sound.add('stop');
                    stop.addMarker({
                        name: 'stop',
                    });
                    stop.play('stop');
                    this.scene.car.play(`car_${this.scene.currentCar}_stop`);
                    setTimeout(() => {
                        this.scene.tweens.add({
                            targets: this.scene.car,
                            x: this.scene.car.x - 100,
                            duration: 100,
                            ease: 'Power2'
                        }).on('complete', () => {
                            this.scene.car.play(`car_${this.scene.currentCar}_idle`)
                        })
                    }, 2000);

                    this.answers.forEach((item, index) => {
                        if (this.selectItems.includes(item.container)) {
                            this.roadReset(item, index)
                        }
                    })

                    setTimeout(() => {
                    if(this.errorFrequency == 1 ) {    
                        let sprite =  this.scene.add.sprite(this.scene.getColWidth(11),this.scene.getRowHeight(7),'addoil');
                        sprite.play('addoil');
                        sprite.on('animationcomplete', () => {
                            sprite.destroy();
                        });
                    } else if (this.errorFrequency > 1) {
                            this.scene.doneBtn.destroy();
                            this.answers.forEach((item) => {
                                this.scene.input.setDraggable(item.container, false)
                            })
                            this.badEnd();
                        }
                        this.selectItems = [];
                        this.doneBtnFlag = true;
                    }, 3000)
                })
            }
        }

    }

    badEnd() {
        //正确答案 item
        let rightAnswers = [];
        for (let i = 0; i < this.item.length; i++) {
            rightAnswers = rightAnswers.concat(this.answers.filter((item) => {
                if (item.container.last.text === this.item[i]) {
                    return item
                }
            }))
        }

        this.selectItems = rightAnswers.map((item) => item.container).slice(0)
        let x = 475;
        let y = 540;
        this.selectItems.forEach((item, index) => {
            item.x = x + (243 * index)
            item.y = y
        })

        let failed2 = this.scene.add.sprite(this.scene.getColWidth(6),this.scene.getRowHeight(6),'L2_answer_failed2')
        failed2.play('L2_answer_failed2')

        setTimeout(this.winnerHandler(false), 3000);


    }


    shuffleArray(beforeArray) {
        let array = beforeArray.concat();
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }


    roadReset(item, index) {
        this.scene.tweens.add({
            targets: item.container,
            x: item.container.x - 20,
            duration: 200,
            ease: 'Power2'
        }).on('complete', () => {
            this.scene.tweens.add({
                targets: item.container,
                x: item.container.x + 40,
                duration: 200,
                ease: 'Power2'
            }).on('complete', () => {
                this.scene.tweens.add({
                    targets: item.container,
                    x: item.container.x - 60,
                    duration: 200,
                    ease: 'Power2'
                }).on('complete', () => {
                    this.scene.tweens.add({
                        targets: item.container,
                        x: item.container.x + 80,
                        duration: 200,
                        ease: 'Power2'
                    }).on('complete', () => {
                        this.scene.tweens.add({
                            targets: item.container,
                            x: item.container.x - 20,
                            duration: 200,
                            ease: 'Power2'
                        }).on('complete', () => {
                            this.scene.tweens.add({
                                targets: item.container,
                                x: this.answersStartPoint[index].x,
                                y: this.answersStartPoint[index].y,
                                duration: 1000,
                                ease: 'Power2'
                            }).on('complete', () => {
                                this.answers.forEach((item) => {
                                    this.scene.input.setDraggable(item.container, true)
                                })
                            })
                        })
                    })
                })
            })
        })
    }

}