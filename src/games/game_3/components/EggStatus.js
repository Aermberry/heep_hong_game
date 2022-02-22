class EggStatus {

    constructor(status) {
        this.status = status;
    }

    getStatus() {
        return this.status;
    }
}


EggStatus.Normal = new EggStatus("Normal");
EggStatus.Success = new EggStatus("Success");
EggStatus.Failed = new EggStatus("Failed");

Object.freeze(EggStatus);

export { EggStatus };