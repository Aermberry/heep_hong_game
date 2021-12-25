export default class Road {

    constructor(scene, x, y ) { 
      let questions =  scene.dataModal.gameData(scene.currentLevel)
    // let questions =  scene.dataModal.gameData(3)

      scene.question = questions[ Math.floor(Math.random()* questions.length)];
      let text = [];
      scene.question.forEach((item, index) => {
        text[index] = scene.add.text(-140 , -330 + (index * 85), item, {
            color: '#000000',
            fontSize: '60px',
            fontFamily: "STKaitiTC-Black",
          }).setAngle(2);

      });
      let listView = [scene.add.sprite(0, 0, 'list')];
      return  scene.add.container(x,y, listView.concat(text))
    }

}