import Phaser from 'phaser';
import _ from 'lodash';
import ChoiceBtn from './ChoiceBtn';
import OrderBtn from './OrderBtn';

export default class QuestionBase extends Phaser.GameObjects.Container {

  constructor(scene, x, y, callback) {
    super(scene,x,y);
    this.scene = scene;
    this.callback = callback;
  }


  init(choice, level, limit){
    let self = this;
    self.level = level;
    self.choice = choice;
    self.items = [];
    self.selectItems = [];
    self.selectItemsLimit = limit;
    self.create();
  }

  create() {
    let self = this;

    self.background = self.scene.add.image(0, 0, 'pnlBg');
    if(self.level < 2){
      self.levelBg = self.scene.add.image(100, -145, 'ph1Bg');
    }else{
      self.levelBg = self.scene.add.image(100, -145, 'ph2Bg');
    }
    self.orderBtn = new OrderBtn(self.scene, 135, 355,self.handleOrderClick.bind(this));
    self.orderBtn.init();

    self.itemRow = 0;
    self.itemRowTemp = 0;
    self.itemColumn = 0;

    _.forEach(self.choice, function(item) {

      if(self.level == 1){
        self.itemRow = item.type-1
        if(self.itemRowTemp != self.itemRow){
          self.itemRowTemp = self.itemRow;
          self.itemColumn = 0;
        }
      }

      if(self.level > 1){
        if(self.itemColumn % 4 == 0){
          if(self.itemColumn > 3){
            self.itemRow++;
          }
          self.itemColumn = 0;
        }
      }

      let choiceBtn = new ChoiceBtn(self.scene, -195 + (self.itemColumn * 200), -370 + (self.itemRow * 230), item.name, self.handleChoiceClick.bind(this), self.handleChoiceEnable.bind(this));
      self.items.push(choiceBtn);

      self.itemColumn++;

    }.bind(this));

    self.add(self.background);
    self.add(self.levelBg);
    self.add(self.orderBtn);
    self.add(self.items);
  }


  handleChoiceClick(choice){
    let self = this;

    if(choice.selected){
      if(self.handleChoiceEnable()){
        self.selectItems.push(choice.name);
      }
    }else{
      _.pull(self.selectItems, choice.name);
    }

    if(self.handleChoiceEnable()){
      self.orderBtn.setDisable();
    }else{
      self.orderBtn.setEnable();
    }

  }

  handleChoiceEnable(){
    let self = this;
    return self.selectItems.length < self.selectItemsLimit;
  }

  handleOrderClick(){
    let self = this;
    self.callback(self.selectItems);
  }

}