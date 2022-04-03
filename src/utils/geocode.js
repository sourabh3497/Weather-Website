const request = require('postman-request');

const geocode = (address, callback) => {
    const apikey = '';
    const limit = 2;
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${apikey}&limit=${limit}`;

    request({url, json: true}, (error, response, body) => {
        let err = null, data = null;

        if (error) {
            err = 'Unable to access the service';
        } else if (body.message || (body.features && body.features.length === 0)) {
            err = 'Unable to find the location. Try another search!';
        } else {
            const place = body.features[0];
            const location = place.place_name;
            const [longitude, latitude] = place.center;
            data = {
                latitude,
                longitude,
                location
            };
        }

        callback(err, data);
    })
};

module.exports = {geocode};
