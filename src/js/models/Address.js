class Address {

    constructor(text, lat, lng) {
        this._text = text;
        this._lat = Number.parseFloat(lat);
        this._lng = Number.parseFloat(lng);
    }

    getText() {
        return this._text;
    }

    getLat() {
        return this._lat;
    }

    getLng() {
        return this._lng;
    }

    getLngLat() {
        return [this._lng, this._lat];
    }

    getLatLng() {
        return [this._lat, this._lng];
    }

    toString() {
        return this._text;
    }
}

(function(global) {
    global.Address = Address;
})(this);