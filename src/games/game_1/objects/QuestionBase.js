import Phaser from 'phaser';
import _ from 'lodash';
import ChoiceBtn from './ChoiceBtn';
import OrderBtn from './OrderBtn';

export default class QuestionBase extends Phaser.GameObjects.Container {

  constructor(scene, x, y, level, choice, answer) {
    super(scene,x,y);
    this.scene = scene;
    this.level = level;
    this.choice = choice;
    this.answer = answer;
    this.items = [];

    let self = this;


    self.background = scene.add.image(0, 0, 'pnlBg');
    if(self.level < 2){
      self.levelBg = scene.add.image(100, -145, 'ph1Bg');
    }else{
      self.levelBg = scene.add.image(100, -145, 'ph2Bg');
    }
    self.orderBtn = new OrderBtn(self.scene, 135, 355);

    self.add(self.background);
    self.add(self.levelBg);
    self.add(self.orderBtn);


    self.itemRow = 0;
    self.itemRowTemp = 0;
    self.itemColumn = 0;


    _.forEach(self.choice, function(item,key) {

      if(self.level == 1){
        self.itemRow = item.type-1
        if(self.itemRowTemp != self.itemRow){
          self.itemRowTemp = self.itemRow;
          self.itemColumn = 0;
        }
      }

      self.items[key] = new ChoiceBtn(self.scene, -200 + (self.itemColumn * 200), -370 + (self.itemRow * 230), item.name);
      self.add(self.items[key]);

      if(self.level > 1){
        if(self.itemColumn % 4 == 0){
          self.itemColumn = 0;
          self.itemRow++;
        }
      }

      self.itemColumn++;

    });









    self.scene.add.existing(self);
  }

  destroy(){
    console.log('destroy');
  }

}