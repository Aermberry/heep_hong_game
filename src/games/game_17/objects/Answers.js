import Road from "./Road"

export default class Answers {

    constructor(scene, x, y, winnerHandler) {
        //创建一个答案区域 一个答案244*99大小

        this.selectItems = [];
        this.selectItems2 = [];
        let data = scene.dataModal.gameItems;
        this.item = data[Math.floor(Math.random() * data.length)];
        let afterItem = this.shuffleArray(this.item);
        this.answersStartPoint = [];

        this.answersArea = scene.add.zone(x, y, 260 *
            6, 110 * 3);
        this.answersArea.setRectangleDropZone(260 * 6, 110 * 2);

        this.answers = []
        for (let i = 0; i < afterItem.length; i++) {
            if (i <= 3) {
                this.answers.push(new Road(scene, x + (260 * i), y, afterItem[i],
                ))
                this.answersStartPoint.push({
                    x: x + (260 * i),
                    y: y
                })
            } else {
                this.answers.push(new Road(scene, x + (260 * (i - 4)), y + 110, afterItem[i],
                ));
                this.answersStartPoint.push({
                    x: x + (260 * (i - 4)),
                    y: y + 110
                })
            }
        }
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
                    if (that.selectItems2[0].y < that.selectItems2[1].y) {
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

    sortX(a, b) {
        return a.x - b.x
    }


    sortY(a, b) {
        return a.y - b.y
    }

    onDoneBtnClicked() {
        let array = this.selectItems.concat(this.selectItems2);
        if (array.length == this.answers.length) {
            let answers = [];
            array.forEach((item) => {
                answers.push(item.last.text);
            })
            if (answers.join('|') == this.item.join('|')) {
                this.winnerHandler();
            } else {
                this.selectItems = [];
                this.selectItems2 = [];
                this.answers.forEach((item, index) => {
                    if (!this.selectItems.includes(item.container) && !this.selectItems2.includes(item.container)) {
                        item.container.x = this.answersStartPoint[index].x
                        item.container.y = this.answersStartPoint[index].y
                    }
                })
            }
        } else {
            this.selectItems = [];
            this.selectItems2 = [];
            this.answers.forEach((item, index) => {
                if (!this.selectItems.includes(item.container) && !this.selectItems2.includes(item.container)) {
                    item.container.x = this.answersStartPoint[index].x
                    item.container.y = this.answersStartPoint[index].y
                }
            })
        }
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