class MapPopup {
    constructor(mapPopupElement) {
        this._mapPopupelement = mapPopupElement;
        this._map = L.map('map').setView([46.4880795, 30.7410718], 18);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(this._map);
        this._mapPopupelement.modal({
            onVisible: (function(){
                this._map.invalidateSize();
            }).bind(this)
        });
        this._map.on("click", this._onMapClick.bind(this));
        this._currentMarker;
    }

    show(acceptCallback, rejectCallback) {
        this._mapPopupelement.modal('attach events', ".positive.button", acceptCallback);
        this._mapPopupelement.modal('attach events', ".deny.button", rejectCallback);
        this._mapPopupelement.modal("show");
    }

    _onMapClick(e) {
        if(!this._currentMarker) {
            this._currentMarker = L.marker(e.latlng).addTo(this._map);
        } else {
            this._currentMarker.setLatLng(e.latlng);
        }
        GeoService.getAddress(e.latlng, (function(address){
            this._mapPopupelement.find(".address").html(address);
        }).bind(this));
    }
}