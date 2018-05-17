class MapPopup {
    constructor(mapPopupElement) {
        this._mapPopupelement = mapPopupElement;
        this._map = L.map('map');
        this._map.setView([46.4880795, 30.7410718], 18);
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(this._map);
    }

    show() {
        this._mapPopupelement.modal("show");
    }
}