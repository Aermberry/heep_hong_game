export default class QuestionDataLocalRepository {

    constructor() {}
    /* * 
       加载本地数据
       load game data from json file
     */
    async loadData() {
        try {
            return require('../assets/json/QuestionData.json')
        } catch (error) {
            console.log('error');
        }

    }
}