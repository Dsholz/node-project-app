const request = require("request");

const ACCESS_KEY = "cd31a356ed0ffb5e6c4a6b92676317b4";

const forecast = (long, lat, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=${ACCESS_KEY}&query=${lat},${long}`;

  request.get({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to access forecast services", undefined);
    } else if (body.error) {
      callback("Unable to find location entered", undefined);
    } else {
      const weatherForecast = `It is currently ${
        body.current.temperature
      } degrees out. There is a ${body.current.precip * 100} % chance of rain.`;
      callback(undefined, weatherForecast);
    }
  });
};

module.exports = forecast;
