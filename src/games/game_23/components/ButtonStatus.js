class ButtonStatus {

    constructor(status) {
        this.status = status;
    }

    getStatus() {
        return this.status;
    }
}

ButtonStatus.up = new ButtonStatus("up");
ButtonStatus.down = new ButtonStatus("down");

Object.freeze(ButtonStatus);

export {
    ButtonStatus
};