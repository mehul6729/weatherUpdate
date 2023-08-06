
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended : true}));



app.get("/", function(req, res){
  res.sendfile(__dirname + "/index.html");
})

app.post("/",function(req,res){

  const qyery = req.body.cityName;
  const apiKey ="7a96c9d80b3d6aed75bb31597ec6c92e";
  const units = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?units=metric&appid=7a96c9d80b3d6aed75bb31597ec6c92e&q=" + qyery
  https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
      const weatherData = JSON.parse(data)
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<p>the weather is curently " + weatherDescription + "</p>");
      res.write("<h1>the temperature in mumbai is " + temp.toString() + "degrees celcius.</h1>");
      res.write("<img scr=" + imageURL +">");
      res.send()
    })
  })

})





app.listen(4000, function(){
  console.log("server is running on  port 4000.");
})
