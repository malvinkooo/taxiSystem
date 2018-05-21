class MapPopup {
    constructor(mapPopupElement) {
        this._mapPopupelement = mapPopupElement;
        this._mapPopupelement.find(".header").click((function(){
            console.log(this._currentAddress);
        }).bind(this));
        this._currentMarker = null;
        this._currentAddress = null;
        this._map = L.map('map').setView([46.4880795, 30.7410718], 18);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(this._map);
        this._mapPopupelement.modal({
            onVisible: (function(){
                this._map.invalidateSize();
            }).bind(this),
            onHidden: (function(){
                if(this._currentMarker) {
                    this._currentAddress = null;
                    this._currentMarker.remove();
                    this._currentMarker = null;
                    this._mapPopupelement.find(".address").html("Пожалуйста, выберите адрес.");
                }
            }).bind(this)
        });
        this._map.on("click", this._onMapClick.bind(this));
    }

    show(acceptCallback) {
        this._mapPopupelement
            .modal("setting", "onApprove", (function(){
                acceptCallback(this._currentAddress);
            }).bind(this))
            .modal("show");
    }

    _onMapClick(e) {
        if(!this._currentMarker) {
            this._currentMarker = L.marker(e.latlng).addTo(this._map);
        } else {
            this._currentMarker.setLatLng(e.latlng);
        }
        GeoService.getAddress(e.latlng, (function(address){
            this._currentAddress = address;
            this._mapPopupelement.find(".address").html(address);
        }).bind(this));
    }
}