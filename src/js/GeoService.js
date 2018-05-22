class GeoService {

    getDistance(startPosition, endPosition) {
        return '0';
    }

    static getAddressHint(query, callback) {
        $.ajax({
            url: "https://nominatim.openstreetmap.org/search",
            data: {
                addressdetails: 1,
                format: "json",
                q: "одесса " + query
            },
            success: function(openstreetmapResponse){
                var response = {
                    results: []
                };
                $.each(openstreetmapResponse, function(index, item){
                    if(item.address.road && item.address.house_number){
                        response.results.push({
                            title: item.address.road + ", " + item.address.house_number,
                            description: item.display_name
                        });
                    }
                });
                callback(response);
            }
        });
    }

    static getAddress(latlng, callback) {
        $.ajax({
            url: "https://api.openrouteservice.org/geocode/reverse",
            data: {
                'api_key': "58d904a497c67e00015b45fc4c4016bdef0646d88f5c9612c3ac2bff",
                'point.lat': latlng.lat,
                'point.lon': latlng.lng,
                'layers': "address",
                'size': 1
            },
            success: function(data) {
                var address;
                if(data.features[0].properties.street) {
                    address = data.features[0].properties.street + ", " + data.features[0].properties.housenumber;
                } else {
                    address = data.features[0].properties.name;
                }
                callback(address);
            }
        });
    }

    static getDistance(carFeedPointLatlng, destinationtLatlng, callback) {
        $.ajax({
            url: "https://api.openrouteservice.org/directions",
            data: {
                'api_key': "58d904a497c67e00015b45fc4c4016bdef0646d88f5c9612c3ac2bff",
                'coordinates': carFeedPointLatlng+'|'+destinationtLatlng,
                'profile': 'driving-car',
                'units': 'm'
            },
            success: function(data) {
                callback(data.routes[0].summary.distance);
            }
        });
    }
}