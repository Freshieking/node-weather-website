const request = require('postman-request');


const geocode = (address, callback) =>{
//"address" is "place" from app.js and callback is  (error,{latitude, longitude, location}
    url =`https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiZnJlc2hpZWtpbmciLCJhIjoiY2tveTQwemUxMDZ2NjJ2bng4ZTZwaGJpayJ9.xUayHJWUqyeB4WMxKAr_pQ&limit=1`
    request({ url:url, json:true},(error, {body})=>{
    if (error) {
         callback('cant connect'), undefined;
         // sending back cant connect as the "error" and "latitude, longitude, location" as undefined
      }else if (body.features.length === 0){
             callback('Invalid location', undefined);

 // sending back cant connect as the "error" and "latitude, longitude, location" as undefined

      }
      else{callback(undefined,{
         // no error to send back so error is undefined and latitude, longitude, location have been given the appropriate data to callback in app.js
         latitude : body.features[0].center[0],
         longitude :body.features[0].center[1] ,
         location: body.features[0].place_name
      })
  
      }
  })
  }

  

  module.exports = geocode

  


