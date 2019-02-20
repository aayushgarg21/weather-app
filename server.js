var express = require("express");
var app = express();
var request = require("request");
const apiKey = "c719469e5b1853923cc663cdb75bfe8b";
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.post('/', function (req, res) {
    let city = req.body.city;
     console.log(city);
     let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
     request(url, function (err, response, body) {
         if(err){
           res.render('index', {weather: null, error: 'Error, please try again'});
         } else {
           let weather = JSON.parse(body)
           if(weather.main == undefined){
             res.render('index', {weather: null, error: 'Error, please try again'});
           } else {
             let temperature = (weather.main.temp - 32) * 5/9;
             let weatherText = `It's ${temperature} degrees in ${weather.name}!`;

            console.log(weatherText);
            res.render('index', {weather: weatherText, error: null});
           }
         }
       });
  })
app.listen(3000,()=>
{
    console.log("Serer started running ");
});