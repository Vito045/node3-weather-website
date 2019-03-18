const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/6c93799f8e694b731ab0490b3d1e1987/${latitude},${longitude}`;

    request({url, json:true}, (error, { body } = {}) => {
        if(error) {
            console.log('Unable to connect to weather service!');
        }else if(body.error) {
            console.log('Unable to find location. Try another search.');
        }else if(!body) {
            console.log('df')
        }else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. This height today is ' + body.daily.data[0].temperatureHeight + ' with a low of ' + body.daily.data[0].temperatureLow + '.');
        }
    });
}

module.exports = forecast;