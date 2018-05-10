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
}