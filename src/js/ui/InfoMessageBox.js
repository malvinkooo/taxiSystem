class InfoMessageBox {
    constructor(options) {
        if (options) {
            this._onHidden = options.onHidden;
            this._messageText = options.messageText;
        }
        $($("#infoMessageBox").html()).appendTo("body");
        this._infoMessageBoxElement = $(".infoMessageBox");
        this._infoMessageBoxElement.modal({
            onHidden: () => {
                if(this._onHidden) {
                    this._onHidden();
                }
                $(".infoMessageBox").remove();
            }
        });
        this._infoMessageBoxElement.find(".text").html(this._messageText);
    }

    hide() {
        this._infoMessageBoxElement.modal("hide");
    }

    show() {
        this._infoMessageBoxElement.modal("show");
    }
}