class QuestionMessageBox {
    constructor(options) {
        if (options) {
            this._onAccept = options.onAccept || null;
            this._onReject = options.onReject || null;
            this._messageText = options.messageText;
        }
        $($("#questionMessageBox").html()).appendTo("body");
        this._questionMessageBoxElement = $(".questionMessageBox");
        this._questionMessageBoxElement.find(".text").html(this._messageText);
    }

    hide() {
        this._questionMessageBoxElement.modal("hide");
    }

    show() {
        this._questionMessageBoxElement.modal({
             onApprove: () => {
                if(this._onAccept) {
                    this._onAccept();
                }
            },
            onDeny: () => {
                if(this._onReject) {
                    this._onReject();
                }
            },
            onHidden: function() {
                $(".questionMessageBox").remove();
            }
        }).modal("show");
    }
}