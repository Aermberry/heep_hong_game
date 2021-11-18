import Road from "./Road"

export default class Answers {

    constructor(scene, x, y, winnerHandler, item) {
        //创建一个答案区域 一个答案244*99大小

        this.selectItems = [];
        this.selectItems2 = [];
        this.item = item;

        let afterItem = this.shuffleArray(this.item);
        this.answersStartPoint = [];
        this.errorFrequency = 0;
        this.doneBtnFlag = true;


        this.answersArea = scene.add.zone(x, y, 260 *
            8, 110 * 3);
        this.answersArea.setRectangleDropZone(260 * 8, 110 * 3);



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

        if (afterItem.length < 8) {
            this.answers.push(new Road(scene, x + (275 * (7 - 4)), y + 110, null,
                this.onDragHandler.bind(this),
                this.onEndDragHandler.bind(this)
            ));
            this.answersStartPoint.push({
                x: x + (275 * (7 - 4)),
                y: y + 110
            })
        }

        this.scene = scene;
        this.winnerHandler = winnerHandler;
        let that = this;
        scene.input.on('drop', function (pointer, gameObject, dropZone) {
            if (dropZone.y !== 882.0000000000001) {
                let arr = that.selectItems.concat(that.selectItems2)
                if (!arr.includes(gameObject)) {
                    arr.push(gameObject);
                }

                arr.sort(that.sortY);


                that.selectItems = arr.slice(0, 4)
                that.selectItems2 = arr.slice(4)
                if (that.selectItems2.length >= 2) {
                    if (that.selectItems2[1].y - that.selectItems2[0].y >= 675 - 432) {
                        that.selectItems2[0].x = that.selectItems2[1].x - 1;
                    }
                }

                that.selectItems.sort(that.sortX);
                that.selectItems2.sort(that.sortX);
                let x = 330;
                let x2 = 770;
                let y = 432;
                let y2 = 675;
                that.selectItems.forEach((item, index) => {
                    item.x = x + (243 * index)
                    item.y = y
                })
                that.selectItems2.forEach((item, index) => {
                    item.x = x2 + (243 * index)
                    item.y = y2
                })

            } else {
                if (that.selectItems.includes(gameObject)) {
                    that.selectItems.splice(that.selectItems.indexOf(gameObject), 1);
                } else if (that.selectItems2.includes(gameObject)) {
                    that.selectItems2.splice(that.selectItems2.indexOf(gameObject), 1);
                }
                that.answers.forEach((item, index) => {
                    if (!that.selectItems.includes(item.container) && !that.selectItems2.includes(item.container)) {
                        item.container.x = that.answersStartPoint[index].x
                        item.container.y = that.answersStartPoint[index].y
                    }
                })
            }

        });
    }

    onDragHandler(x, y) {
        if (x >= this.scene.hoverArea[0].x - 300 && x <= this.scene.hoverArea[0].width + 400 + this.scene.hoverArea[0].x && y >= this.scene.hoverArea[0].y - 300 && y <= this.scene.hoverArea[0].height + 400 + this.scene.hoverArea[0].y
            || x >= this.scene.hoverArea[1].x - 300 && x <= this.scene.hoverArea[1].width + 400 + this.scene.hoverArea[1].x && y >= this.scene.hoverArea[1].y - 300 && y <= this.scene.hoverArea[1].height + 400 + this.scene.hoverArea[1].y
        ) {
            this.scene.hoverArea.forEach((item) => {
                item.setAlpha(0.5);
            })
        }
        else {
            this.scene.hoverArea.forEach((item) => {
                item.setAlpha(0.0);
            })
        }
    }

    onEndDragHandler() {
        this.scene.hoverArea.forEach((item) => {
            item.setAlpha(0.0);
        })
    }


    sortX(a, b) {
        return a.x - b.x
    }


    sortY(a, b) {
        return a.y - b.y
    }

    onDoneBtnClicked() {
        let array = this.selectItems.concat(this.selectItems2);

        if (array.length == this.answers.length && this.doneBtnFlag) {
            this.doneBtnFlag = false;
            let answers = [];
            array.forEach((item) => {
                answers.push(item.last.text);
            })
            if (answers.filter((e) => e).join('|') == this.item.join('|')) {
                this.scene.doneBtn.destroy();
                this.answers.forEach((item) => {
                    this.scene.input.setDraggable(item.container, false)
                })
                this.answers.forEach((item) => {
                    this.scene.input.setDraggable(item.container, false)
                })
                this.goodEnd();
            } else {
                this.answers.forEach((item) => {
                    this.scene.input.setDraggable(item.container, false)
                })
                this.errorFrequency++;
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
                        start: 0.1,
                        duration: 0.5,
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
                    }, 4000);
                    this.answers.forEach((item, index) => {
                        if (this.selectItems.includes(item.container) || this.selectItems2.includes(item.container)) {
                            this.roadReset(item, index)
                        }
                    })
                    setTimeout(() => {
                        if (this.errorFrequency > 1) {
                            this.scene.doneBtn.destroy();
                            this.answers.forEach((item) => {
                                this.scene.input.setDraggable(item.container, false)
                            })
                            this.badEnd();
                        }
                        this.selectItems = [];
                        this.selectItems2 = [];
                        this.doneBtnFlag = true;
                    }, 3000)

                });
            }
        }
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
                            })
                        }).on('complete', () => {
                            this.answers.forEach((item) => {
                                this.scene.input.setDraggable(item.container, true)
                            })
                        })
                    })
                })
            })
        })
    }

    goodEnd() {
        let x2 = 770;
        let y2 = 675;
        if (this.selectItems2.length < 4) {
            let differNum = 4 - this.selectItems2.length;
            for (let i = 0; i < differNum; i++) {
                new Road(this.scene, x2 + (243 * (this.selectItems2.length + i)), y2, '')
            }
        }
        this.winnerHandler();
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

        this.selectItems = rightAnswers.map((item) => item.container).slice(0, 4)
        this.selectItems2 = rightAnswers.map((item) => item.container).slice(4)
        let x = 330;
        let x2 = 770;
        let y = 432;
        let y2 = 675;
        this.selectItems.forEach((item, index) => {
            item.x = x + (243 * index)
            item.y = y
        })
        this.selectItems2.forEach((item, index) => {
            item.x = x2 + (243 * index)
            item.y = y2
        })

        if (this.selectItems2.length < 4) {
            this.answers[7].container.x = x2 + (243 * 3)
            this.answers[7].container.y = y2
        }
        setTimeout(this.winnerHandler, 5000);


    }


    shuffleArray(beforeArray) {
        let array = beforeArray.concat();
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

}