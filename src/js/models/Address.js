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

    toJSON() {
        return {
            text: this._text,
            lng: this._lng,
            lat: this._lat
        };
    }

    isValid() {
        return Boolean(this._text && (typeof this._lat == "number" && !isNaN(this._lat)) && (typeof this._lng == "number" && !isNaN(this._lng)));
    }
}

(function(global) {
    global.Address = Address;
})(this);