import Road from "./Road"

export default class Answers {

    constructor(scene, x, y, onSelecting, selected) {
        //创建一个答案区域 一个答案244*99大小


        let data = scene.dataModal.gameItems;
        let item = data[Math.floor(Math.random() * data.length)];
        let answers = []

        for (let i = 0; i < item.length; i++) {
            if (i <= 3) {
                answers.push(new Road(scene, x + (260 * i), y, item[i],
                    onSelecting, selected))
            } else {
                answers.push(new Road(scene, x + (260 * (i - 4)), y + 110, item[i],
                    onSelecting, selected));
            }
        }

    }




}