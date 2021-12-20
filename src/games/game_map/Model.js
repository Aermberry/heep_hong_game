export default class Model {
    
    constructor(uriParams, vueRouter) {
        this._vueRouter = vueRouter;
        this._uriParams = uriParams
        
    }

    get vueRouter() {
        return this._vueRouter
    }

}