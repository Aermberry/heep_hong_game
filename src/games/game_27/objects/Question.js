import Car from "./Car";
import SelectCar from "./SelectCar";
import DropZone from "./DropZone";
export default class Question{
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
        let subjectItem = [];
        // 渲染题目
        subject.forEach((v, i) => {
            console.log(subjectItem.length < 1 ? '200' : subjectItem[i-1].x)
            subjectItem.push(new Car(scene, subjectItem.length < 1 ? 0 : subjectItem[i-1].x + subjectItem[i-1].width - 20 , 450, v));
        });

        let selectItem = [];
        //渲染选择项
        items.forEach((v, i) => {
            selectItem.push(new SelectCar(scene, selectItem.length < 1 ? 440 : selectItem[i-1].x + selectItem[i-1].width,0, v, this));
            scene.physics.add.collider(selectItem[i],selectItem[0],this.onColliderHander)
        });
    }

    onColliderHander(a,b) {
        console.log(a,b)
    }

}