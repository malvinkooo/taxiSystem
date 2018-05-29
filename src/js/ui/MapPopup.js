class MapPopup {
    constructor() {
        this._currentMarker = null;
        this._currentAddress = {};
    }

    _initPopup() {
        $(".mapContainer").remove();
        $($("#mapPopup").html()).appendTo('body');
        var tmp = $("#mapPopup").html();
        this._mapPopupelement = $(".mapContainer");
        this._mapPopupelement.modal({
            onVisible: (function(){
                this._map.invalidateSize();
            }).bind(this),
            onHidden: (function(){
                if(this._currentMarker) {
                    this._currentAddress = {};
                    this._currentMarker.remove();
                    this._currentMarker = null;
                    this._mapPopupelement.find(".address").html("Пожалуйста, выберите адрес.");
                }
            }).bind(this)
        });
        this._mapPopupelement.modal("show");
    }

    _initMap() {
        this._map = L.map('map').setView([46.4880795, 30.7410718], 18);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(this._map);
        this._map.on("click", this._onMapClick.bind(this));
    }

    show(acceptCallback) {
        this._initPopup();
        this._initMap();
        this._mapPopupelement
            .modal("setting", "onApprove", acceptCallback.bind(this, this._currentAddress))
            .modal("show");
    }

    _onMapClick(e) {
        if(!this._currentMarker) {
            this._currentMarker = L.marker(e.latlng).addTo(this._map);
        } else {
            this._currentMarker.setLatLng(e.latlng);
        }
        this._currentAddress.lat = e.latlng.lat;
        this._currentAddress.lng = e.latlng.lng;
        GeoService.getAddress(e.latlng, (function(address){
            this._currentAddress.address = address;
            this._mapPopupelement.find(".address").html(address);
        }).bind(this));
    }
}