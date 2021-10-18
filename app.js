const express = require("express");
const app =express();
const port = 3000;
const bodyParser=require("body-parser");
const https = require("https");


app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
app.get("/",function(req,res){
res.sendFile(__dirname+"/index.html");

})
app.post("/",function(req,res){
  let query =req.body.cityName;
  const apiKey ="340077cfc97617e705e03d7ffb4edef8";
  let units="imperial"
  let url ="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+units;
  https.get(url,function(response){
    console.log(response.statusCode);
    response.on("data",function(data){
      const weatherData =JSON.parse(data);
      const temp =weatherData.main.temp;
      const weatherDescription=weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const iconURL="http://openweathermap.org/img/wn/"+icon+"@2x.png";
      res.write("<p>The Weather is currently "+weatherDescription+ ".</p>");
      res.write("<h1>The temperature in "+query+" is "+ temp +" degrees Farenheit.</h1>");
      res.write("<img src="+iconURL+">");

      res.send();
    })
  })
})


app.listen(port,function(){
  console.log("Server has started");
});
