import Car from "./Car";

export default class Question {
    constructor(scene) {
        let question = scene.dataModal[Math.floor(Math.random() * scene.dataModal.length)];
        let regex = /\((.+?)\)/g;
        let answer = question.split(regex); // 完整的答案
        let items = question.match(regex) // 上方的选择项
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
        let subjectItem = [];
        // 渲染
        subject.forEach((v, i) => subjectItem.push(new Car(scene, 200 + 300 * i, 700, v, subjectItem[i - 1])))

    }
}