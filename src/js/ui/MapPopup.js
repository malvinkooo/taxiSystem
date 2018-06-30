class MapPopup {
    constructor(options) {
        this._currentMarker = null;
        this._currentAddress = null;
        if (options) {            
            this._onAccept = options.onAccept || null;
            this._onReject = options.onReject || null;
            this._onClosed = options.onClosed || null;
        }
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
                    this._currentAddress = null;
                    this._currentMarker.remove();
                    this._currentMarker = null;
                    this._mapPopupelement.find(".address").html("Пожалуйста, выберите адрес.");
                }
                if (this._onClosed) {
                    this._onClosed();
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

    show(address) {
        this._initPopup();
        this._initMap();
        if(address && address.isValid()) {
            this._currentAddress = address;
            this._currentMarker = L.marker(address.getLatLng()).addTo(this._map);
            this._map.setView(address.getLatLng(), 18);
            this._mapPopupelement.find(".address").html(address.getText());
        }
        this._mapPopupelement
            .modal("setting", "onApprove", () => {
                if(this._currentAddress) {
                    if (this._onAccept) {
                        this._onAccept(this._currentAddress);
                    }                    
                }
            })
            .modal("setting", "onReject", () => {
                if (this._onReject) {
                    this._onReject();
                }
            })
            .modal("show");
    }

    _onMapClick(e) {
        if(!this._currentMarker) {
            this._currentMarker = L.marker(e.latlng).addTo(this._map);
        } else {
            this._currentMarker.setLatLng(e.latlng);
        }
        GeoService.getAddress(e.latlng).then((address) => {
            this._currentAddress = address;
            this._mapPopupelement.find(".address").html(address.getText());
        }).catch((err) => {
            this._mapPopupelement.find(".address").html(err.message);
        });
    }
}