class QuestionMessageBox {
    constructor(messageText) {
        this._questionMessageBoxElement = $(".questionMessageBox");
        this._questionMessageBoxElement.find(".text").html(messageText);
    }

    hide() {
        this._questionMessageBoxElement.modal("hide");
    }

    show(acceptCallback, rejectCallback) {
        this._questionMessageBoxElement.find(".submit").click(acceptCallback);
        this._questionMessageBoxElement.find(".cancel").click(rejectCallback);
        this._questionMessageBoxElement.modal("show");
    }
}