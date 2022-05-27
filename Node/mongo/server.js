const express = require('express');
const bodyParser = require('body-parser')
const axios = require('axios');
const path = require('path');
const MongoClient = require('mongodb').MongoClient;

// Configure dotenv package
require("dotenv").config();

const app = express();
const port = process.env.PORT || 8080;
const apiKeyOpenWeather = `${process.env.API_KEY_OPENWEATHER}`;
const DBUrl = process.env.DB_CONNECTION;
const DBName = process.env.DB_NAME;
const mongoClient = new MongoClient(DBUrl);

//For post value
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//Express static file module
app.use(express.static(__dirname + '/assets'));
// view engine (necessary only for openweather, webworker not)
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));

// Setup your default display on launch
app.get("/", function (req, res) {
    // It will not fetch and display any data in the index page
    res.render("weatherAPI", { weather: null, error: null });
});

app.get("/index", function (req, res) {
    // It will not fetch and display any data in the index page
    res.render("weatherAPI", { weather: null, error: null });
});

// post latitude & longitude user -> getData from openWeatherAPI
app.post('/weatherAPI', async function (req, res) {

    // lat & long passed by user

    const latitude = parseFloat(req.body.latitude);
    const longitude = parseFloat(req.body.longitude);

    // json output

    let jsonOutput = {
        "weather": null,
        "place": null,
        "coordinates": null,
        "weatherDays": [],
        "error": null
    };

    // data from api
    // all data returned
    const [placeInfo, forecastInfo] = await Promise
        .all(
            [
                getPlaceInfo(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKeyOpenWeather}`),
                getForecastCity(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly&appid=${apiKeyOpenWeather}`, latitude, longitude)
            ])
        .catch((error) => {
            console.log(error);
            res.render('weatherAPI', { weather: null, error: "Error" });
            res.end();
        });

    jsonOutput.weather = placeInfo;
    jsonOutput.place = `${placeInfo.name}, ${placeInfo.sys.country}`;
    jsonOutput.coordinates = `${placeInfo.coord.lat} lat, ${placeInfo.coord.lon} lon`;
    jsonOutput.weatherDays = forecastInfo;

    //insert in db

    forecastInfo.forEach(element => {
        element.place = `${placeInfo.name}`;
        insertDB("cities_weather", element).catch(() => { console.error("Error on insert") });
    });

    // render output view
    res.render('weatherAPI', jsonOutput);
    res.end();

});

// get data from db
app.post('/showDataDB', async function (req, res) {

    // lat & long passed by user

    const latitude = parseFloat(req.body.latitude);
    const longitude = parseFloat(req.body.longitude);

    // json output

    let jsonOutput = {
        "weather": null,
        "place": null,
        "coordinates": null,
        "weatherDays": [],
        "error": null
    };

    // data from api/db after getting name of user place

    await getPlaceInfo(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKeyOpenWeather}`)
        .then(async (placeInfo) => {

            const forecastInfo = await getData("cities_weather", placeInfo.name);

            jsonOutput.weather = placeInfo;
            jsonOutput.place = `${placeInfo.name}, ${placeInfo.sys.country}`;
            jsonOutput.coordinates = `${placeInfo.coord.lat} lat, ${placeInfo.coord.lon} lon`;
            jsonOutput.weatherDays = forecastInfo;

            // render output
            res.render('weatherAPI', jsonOutput);
            res.end();
        })
        .catch((error) => {
            console.log(error);
            res.render('weatherAPI', { weather: null, error: "Error" });
            res.end();
        });
}
);

app.listen(port);
console.log('Server started at http://localhost:' + port);


// ** UTILITIES **

// ---- API OPENWEATHER ------

getPlaceInfo = async (cityUrl) => {

    try {
        const response = await axios.get(cityUrl)
        const result = response.data;
        if (result.main == undefined) {
            return Promise.reject();
        }

        return Promise.resolve(result);
    } catch (error) {
        return Promise.reject(error);
    }

}

getForecastCity = async (forecastUrl, latitude, longitude) => {

    try {
        let output = [];
        const response = await axios.get(forecastUrl)
        const result = response.data;
        if (result.daily == undefined) {
            return Promise.reject(error);
        }

        result.daily.forEach(element => {

            let outputObject = {
                temp: Math.round(`${element.temp.day}` - 273.15),
                description: element.weather[0].description,
                time: `${new Date(
                    element.dt * 1000
                ).toLocaleString('it-IT')}`,
                icon: `http://openweathermap.org/img/wn/${element.weather[0].icon}@2x.png`,
                humidity: element.humidity,
                clouds: element.clouds,
                visibility: element.visibility,
                pressure: element.pressure,
                longitude: longitude,
                latitude: latitude,
                _id: element.dt,
            };

            // push to output 
            output.push(outputObject);
        });

        return Promise.resolve(output);
    } catch (error) {
        return Promise.reject(error);
    }
}

// ---- INSERTING IN DB ------

insertDB = async (collectionName, elementToInsert) => {

    try {
        await mongoClient.connect();
        const database = mongoClient.db(DBName);
        const cities = database.collection(collectionName);
        let result = await cities.updateMany(
            { _id: elementToInsert._id },
            { $set: elementToInsert },
            { upsert: true });
        return Promise.resolve(result);
    } catch (error) {
        return Promise.reject();
    }
}


getData = async (collectionName, place) => {
    try {
        await mongoClient.connect();
        const database = mongoClient.db(DBName);
        const cities = database.collection(collectionName);
        let result = await cities.find(
            { place: place}
        ).toArray();
        return Promise.resolve(result);
    } catch (error) {
        return Promise.resolve([]);
    }
}