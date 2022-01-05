import Car from "./Car";
import SelectCar from "./SelectCar";
import DropZone from "./DropZone";
import SubjectItem from "./SubjectItem";
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

        // let dropZone = 
        new DropZone(scene, 400, 40);
        scene.subjectItem = new SubjectItem(scene, 0, 450, [])
        // 渲染题目
        subject.forEach((v, i) => {
            scene.subjectItem.add(new Car(scene, scene.subjectItem.length < 1 ? 0 : scene.subjectItem.list[i - 1].x + scene.subjectItem.list[i - 1].width - 20, 450, v));
        });
        let selectItem = [];
        //渲染选择项
        items.forEach((v, i) => {
            selectItem.push(new SelectCar(scene, selectItem.length < 1 ? 700 : selectItem[i - 1].x + selectItem[i - 1].width + 20, 220, v, this));
        });
    }


}