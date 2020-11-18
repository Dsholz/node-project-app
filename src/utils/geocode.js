const request = require("request");

const ACCESS_KEY2 =
  "pk.eyJ1IjoiZGFuaWVsc29sYWRveWUiLCJhIjoiY2toZXdubHF3MGFlbTJ0cGxsbjR4NGM0ZCJ9.yGXxBkbSRCp2_ZxGseOuqw";

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=${ACCESS_KEY2}&limit=1`;

  request.get({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to conect to location services", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find location, Try another Search", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
