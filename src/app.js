const express = require('express')
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode')
const forecast = require("./utils/forecast")




// Prints path to dir eg C:\Users\Dylan\Documents\Dylans work\Mosh\web-server\src
// console.log(__dirname);

// Prints path to file eg C:\Users\Dylan\Documents\Dylans work\Mosh\web-server\src\app.js
// console.log(__filename);


// does dirname but goes back one and then into public C:\Users\Dylan\Documents\Dylans work\Mosh\web-server\public
const publicDirectoryPath = path.join(__dirname, '../public')

//sets template path to views path as template isn't the defailt name
const viewsPath = path.join(__dirname, '../Templates/views')

const partialsPath = path.join(__dirname, '../Templates/partials')

//generating express application
const app = express()

//the port that heroku will run on
const port = process.env.PORT || 3000
// by doing || its a logical "or" operator so it will set port as the process value OR as 3000 this is needed as heroku sets its own port
// and we need a static port for local use


//allows you to set a value ("view engine") and then the module. it must be 1:1 with express
app.set('view engine', 'hbs')

app.set('views', viewsPath)
hbs.registerPartials(partialsPath)



//static means webpage does not change ever
//This makes express use the public folder to store html webpages
//This also replaces the .get below due to express finding this first as "index" is a special name for the default page
app.use(express.static(publicDirectoryPath))
// //below states what to do when someone "gets" the path in between the "". in this case its empty therefore there is no path
// // and its just the domain.
// //Function gets called with 2 arguments normally called req and res

// app.get('', (req, res) =>{
//     //res.send is what the user is "sent" on browser when the connect to server
//     //h1 makes the test a heading, therefore weather will look like a heading
//     res.send('<h1>Weather</h1>')
// })


// //if got is sent to /help path, it will show "help page"
// app.get('/help', (req, res) =>{
//     res.send([{
//         ay:'shutup'
//     },
//     {
//         stink:'ape'
//     }])
// })


// //if got is sent to /about path, it will show "about page"
// app.get('/about', (req, res) =>{
//     res.send('<h1>About page</h1>')
// })

//if got is sent to /weather path, it will show "weather page"

app.get('', (req, res) => {
        //render is different to send as its not sending a static thing

    res.render('index',{
        //injecting these into the template index
        title: 'Weather App',
        name:'Dave'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Dave'
    })
})



app.get('/weather', (req, res) =>{
    if (!req.query.address){

        //must do return as you can only send one request
         return res.send({
            error: 'You must provide an address'
        })
    }else
    place = req.query.address
    console.log(req.query);
    geocode(place, (error,{latitude, longitude, location} = {} ) =>{
        if (error){
            // you must do {} around errror or error wont work
          return res.send({error});
        }
      // using lat and long gained from geocode file / function in the forecast function so its 1 big function linked together
        forecast(latitude,longitude, (error, fdata) => {
          //lat and long called back from geocode js is used as an input in forecast.js function
          //sending the (error,fdata) as the "callback" to forecast.js so that 
          //app.js can deal with it and log appropriate response and deal with errors
          if (error) {
            return res.send(error);
          }// if an error is called back from forecast.js it will be logged here but if there is fdata sent back no error will be logged as no error as calledback
          console.log(location);
          console.log(`Data: ${fdata}`)

          return res.send({
            Location: location,
            Forecast: fdata,
            address:req.query.address

        })



        })
      })


    

    
    
    

})

app.get('/products', (req, res)=>{
    //req.query will tell us what options are being sent by the user alongside the request to the webpage, such as if they are adding this ?search=lol&rating=3.5 
    //we will get those in the form of a json
    if (!req.query.search){
        //must do return as you can only send one request
         return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query);
    res.send({
        //sending back json
        products:[req.query]
    })

})


app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Section',
        Text:'help',
        name: 'Dave'
    })
})

app.get('/help/*', (req,res) => {
    res.render('404',{
        title: 'Help Article Not found ',
        name:'Dave',
        error: 'Page Not Found'
    })
})

// wild card = * 
app.get('/*', (req,res) => {
    res.render('404',{
        title: '404 Page not found ',
        error: 'Page Not Found',
        name:'Dave'
    })
})


//booting up server on port 3000
app.listen(3000,() => {
    console.log(`server up bozo ${port}`);
})