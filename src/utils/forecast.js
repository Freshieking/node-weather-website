const request = require('postman-request');
const forecast =  (long, lat, callback) =>{
  //call back is (error, fdata)
   
    url =`http://api.weatherstack.com/current?access_key=5108bc0e44461a08a93e32a8718c77b0&query=${lat},${long}`
    request({ url, json:true},(error, {body})=>{
    if (error) {
         callback('cant connect'), undefined;
         // error found so fdata from callback is left as undefined
      }else if (body.error){
             callback('Invalid location', undefined);
             //// error found so fdata from callback is left as undefined
      }
      else{callback(undefined, `It is currently ${body.current.temperature} degrees out feeling like a ${body.current.feelslike} degrees, issa ${body.current.weather_descriptions[0]} day. The time at observation was ${body.current.observation_time}`);
        // no error so error is "undefined" and "fdata" is called back 
  
      }
  })
  }











module.exports = forecast
