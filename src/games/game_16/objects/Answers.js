import Road from "./Road"

export default class Answers {

    constructor(scene, x, y, winnerHandler) {
        //创建一个答案区域 一个答案244*99大小

        this.selectItems = [];
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

    sortX(a, b) {
        return a.x - b.x
    }


    onDoneBtnClicked() {
        let array = this.selectItems;
        if (array.length == this.answers.length) {
            let answers = [];
            array.forEach((item) => {
                answers.push(item.last.text);
            })
            if (answers.join('|') == this.item.join('|')) {
                this.winnerHandler();
            }
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