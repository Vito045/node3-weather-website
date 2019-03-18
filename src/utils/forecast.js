const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/6c93799f8e694b731ab0490b3d1e1987/${latitude},${longitude}`;

    request({url, json:true}, (error, { body }) => {
        if(error) {
            console.log('Unable to connect to weather service!');
        }else if(body.error) {
            console.log('Unable to find location. Try another search.');
        }else {
            callback(undefined, {
                apparentTemperature: body.currently.apparentTemperature,
                precipProbability: body.currently.precipProbability
            });
        }
    });
}

module.exports = forecast;