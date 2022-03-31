const request = require('request')

const forecast = (lat,lng,callback) => {

    const location = lat + ',' + lng
    const url='http://api.weatherstack.com/current?access_key=e3acd25e80ef107167b06e9429f16750&query=' + location + '&units=f'

    request ({url, json:true}, (error, { body })=>{
        if (error) {
            callback('Unable to connect to weather service',undefined)
        } else if (body.error) {
            callback('Unable to find location',undefined)
        } else {
            callback(undefined,body.current.weather_descriptions + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' outside.')
        }
    })
}

module.exports = forecast