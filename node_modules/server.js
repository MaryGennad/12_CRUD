const express = require('express')
const mongoose = require('mongoose');
const API_KEY = 'a2906b093bfe0cb70f7c5e3e7b3baeb7'
const fetch = require('node-fetch')

mongoose.connect('mongodb://127.0.0.1:27017/meteo');
const Weather = mongoose.model('Weather', {
    temperature: String,
    city: String,
    date: String,
});

const app = express()
const port = 3000

app.use('/', express.static('public'));

app.get('/api/weather', async (req, res) => {

    let data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${req.query.currCity}&appid=${API_KEY}&units=${req.query.units}`)
    let dataJson = await data.json()
    
    let temperature = dataJson.main.temp
    const newWeather = new Weather()
    newWeather.temperature = temperature,
    newWeather.city = dataJson.name
    await newWeather.save()
    
    res.send(dataJson)
 })


app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})