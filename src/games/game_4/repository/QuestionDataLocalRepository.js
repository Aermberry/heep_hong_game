export default class QuestionDataLocalRepository {

    constructor() {
    }
    /* * 
       加载本地数据
       load game data from json file
     */
    async loadData() {
        return require('../assets/json/QuestionData.json')
    }
}