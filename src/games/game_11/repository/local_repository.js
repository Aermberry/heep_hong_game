export default class LocalRepository {

    constructor() {
    }
    /* * 
       加载本地数据
       load game data from json file
     */
    loadData() {
        return require('../assets/json/QuestionData.json')
    }
}