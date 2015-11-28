var request = require('request');
 
// Get a WOEID (Where On Earth ID)
// for your location from here:
// http://woeid.rosselliot.co.nz/
var woeId = 44418;
 
// Temperature format:
// 'c' for Celcius
// 'f' for Fahrenheit
var format = 'c';

// API query url
var url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22london%2C%20uk%22)%20and%20u%20%3D%20'c'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";

function getWeather() {
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var info = JSON.parse(body).query.results,
          weatherData = info.channel.item.condition,
          weatherLocation = info.channel.location,
          temp = weatherData.temp + "&deg;" + format.toUpperCase(),
          condition = weatherData.text,
          title = weatherLocation.city + " Weather",
          climacon = climaconClass(weatherData.code);

      send_event('weather', {temp: temp, condition: condition, title: title, climacon: climacon });
    }
  })
}

getWeather();
setInterval(getWeather, 30*1000);

function climaconClass(weatherCode) {
  switch(parseInt(weatherCode, 10)) {
    case 0:
      return 'tornado';
    case 1:
      return 'tornado';
    case 2:
      return 'tornado';
    case 3:
      return 'lightning';
    case 4:
      return 'lightning';
    case 5:
      return 'snow';
    case 6:
      return 'sleet';
    case 7:
      return 'snow';
    case 8:
      return 'drizzle';
    case 9:
      return 'drizzle';
    case 10:
      return 'sleet';
    case 11:
      return 'rain';
    case 12:
      return 'rain';
    case 13:
      return 'snow';
    case 14:
      return 'snow';
    case 15:
      return 'snow';
    case 16:
      return 'snow';
    case 17:
      return 'hail';
    case 18:
      return 'sleet';
    case 19:
      return 'haze';
    case 20:
      return 'fog';
    case 21:
      return 'haze';
    case 22:
      return 'haze';
    case 23:
      return 'wind';
    case 24:
      return 'wind';
    case 25:
      return 'thermometer low';
    case 26:
      return 'cloud';
    case 27:
      return 'cloud moon';
    case 28:
      return 'cloud sun';
    case 29:
      return 'cloud moon';
    case 30:
      return 'cloud sun';
    case 31:
      return 'moon';
    case 32:
      return 'sun';
    case 33:
      return 'moon';
    case 34:
      return 'sun';
    case 35:
      return 'hail';
    case 36:
      return 'thermometer full';
    case 37:
      return 'lightning';
    case 38:
      return 'lightning';
    case 39:
      return 'lightning';
    case 40:
      return 'rain';
    case 41:
      return 'snow';
    case 42:
      return 'snow';
    case 43:
      return 'snow';
    case 44:
      return 'cloud';
    case 45:
      return 'lightning';
    case 46:
      return 'snow';
    case 47:
      return 'lightning';
  }
}
