import Road from "./Road"

export default class Answers {

    constructor(scene, x, y, winnerHandler) {
        //创建一个答案区域 一个答案244*99大小

        let selectItems = [];
        let data = scene.dataModal.gameItems;
        this.item = data[Math.floor(Math.random() * data.length)];
        let afterItem = this.shuffleArray(this.item);

        this.answers = []
        for (let i = 0; i < afterItem.length; i++) {
            if (i <= 3) {
                this.answers.push(new Road(scene, x + (260 * i), y, afterItem[i],
                ))
            } else {
                this.answers.push(new Road(scene, x + (260 * (i - 4)), y + 110, afterItem[i],
                ));
            }
        }
        let that = this;
        scene.input.on('drop', function (pointer, gameObject, dropZone) {
            if (!selectItems.includes(gameObject)) {
                let x = 480;
                let temp = 480;
                if (selectItems.length != 0) {
                    let flag = false;
                    selectItems.forEach((item, index) => {
                        if (!flag) {
                            if (index == 0 && item.x != temp) {
                                selectItems.splice(0, 0, gameObject);
                                gameObject.x = x;
                                gameObject.y = dropZone.y;
                                flag = true;
                                return;
                            } else if (item.x - temp > 243) {
                                flag = true;
                                selectItems.splice(index, 0, gameObject);
                                gameObject.x = x + (243 * index);
                                gameObject.y = dropZone.y;
                                return;
                            } else {
                                temp = item.x;
                            }
                        }
                    })
                    if (!flag) {
                        gameObject.x = x + (243 * selectItems.length);
                        gameObject.y = dropZone.y;
                        selectItems.push(gameObject)
                    }
                } else {
                    selectItems.push(gameObject)
                    gameObject.x = x;
                    gameObject.y = dropZone.y;
                }

                if (selectItems.length == that.answers.length) {
                    let answers = [];
                    selectItems.forEach((item) => {
                        answers.push(item.last.text);
                    })
                    if (answers.join('|') == that.item.join('|')) {
                        winnerHandler();
                    }

                }
            } else {
                selectItems.splice(selectItems.indexOf(gameObject), 1);
                let i = 0;
                that.answers.forEach((item) => {
                    if (!selectItems.includes(item.container)) {
                        if (i <= 3) {
                            item.container.x = x + (260 * i);
                            item.container.y = y;
                        } else {
                            item.container.x = x + (260 * (i - 4));
                            item.container.y = y + 110;
                        }
                        i++;
                    }
                })

            }
        });
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