const request = require('request')

const forecast = (longitude, latitude, callback) => {
    const url = 'https://api.darksky.net/forecast/e74a579a78497721ffd75c953a11b11a/' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude)

    request({ url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service', undefined)
        } else if (body.error ) {
            callback('Unable to find location', undefined)
        } else {
            const curTemp = body.currently.temperature
            const precProb = body.currently.precipProbability
            const summary = body.daily.data[0].summary
            const tempLow = body.daily.data[0].temperatureLow
            const tempHigh = body.daily.data[0].temperatureHigh
            callback(undefined, summary + '  It is currently ' + curTemp + ' degrees out with a low of ' + tempLow + ' and a high of ' + tempHigh + '.  There is a ' + precProb + '% chance of rain.')
        }
    })
}

module.exports = forecast
