const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
    const apikey = '3e9711904298b70f8f0c18e35e9e125c';
    const url = `http://api.weatherstack.com/current?access_key=${apikey}&query=${latitude},${longitude}&units=f`;

    request({ url, json: true}, (error, response, body) => {
        let err = null, data = null;
        
        if (error) {
            err = 'Unable to access the service!';
        } else if (body.error) {
            err = 'Unable to find the location. Try a different search';
        } else {
            const currentWeatherData = body.current;
            const {weather_descriptions: weatherDescriptions, temperature, feelslike} = currentWeatherData;

            data = {forecast: `${weatherDescriptions[0]}. Current temperature is ${temperature} degrees and it feels like ${feelslike} degrees.`};
        }
        callback(error, data);
    })
};

module.exports = {forecast};