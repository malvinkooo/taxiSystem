class MainMenu {
    constructor(menuElement) {
        this._menuElement = menuElement;
        this._menuElement.find('.item').tab();        
    }
}