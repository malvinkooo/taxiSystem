class GeoService {

    static getAddressHint(query, callback) {
        return Promise.resolve($.ajax({
            url: "https://nominatim.openstreetmap.org/search",
            data: {
                addressdetails: 1,
                format: "json",
                q: "одесса " + query
        }})).then((openstreetmapResponse) => {
            var response = {
                results: []
            };
            $.each(openstreetmapResponse, function(index, item){
                if(item.address.road && item.address.house_number){
                    response.results.push({
                        title: item.address.road + ", " + item.address.house_number,
                        description: item.display_name,
                        lng: item.lon,
                        lat: item.lat
                    });
                }
            });
            return response;
        });
    }

    static getAddress(latlng, callback) {
        return Promise.resolve($.ajax({
            url: "https://api.openrouteservice.org/geocode/reverse",
            data: {
                'api_key': "58d904a497c67e00015b45fc4c4016bdef0646d88f5c9612c3ac2bff",
                'point.lat': latlng.lat,
                'point.lon': latlng.lng,
                'layers': "address",
                'size': 1
        }})).then((data) => {
            var addressText = null;
            if(data && data.features && data.features.length > 0) {
                if(data.features[0].properties.street) {
                    addressText = data.features[0].properties.street + ", " + data.features[0].properties.housenumber;
                } else {
                       addressText = data.features[0].properties.name;
                }
                return new Address(addressText, latlng.lat, latlng.lng);
            } else {
                throw new Error('Не удалось получить адрес по указанными коориднатам');
            }
        });
    }

    static getDistance(addressA, addressB) {
        return Promise.resolve($.ajax({
            url: "https://api.openrouteservice.org/directions",
            data: {
                'api_key': "58d904a497c67e00015b45fc4c4016bdef0646d88f5c9612c3ac2bff",
                'coordinates': addressA.getLatLng()+'|'+addressB.getLatLng(),
                'profile': 'driving-car',
                'units': 'm'
            }
        })).then((data) => {
            if(data && data.routes && data.routes.length > 0) {
                return data.routes[0].summary.distance;
            } else {
                throw new Error("Не удалось рассчитать расстояние мужду '" + addressA + "' и '" + addressB + "'");
            }
        });
    }
}