const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

//Define Paths for Express configuration
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicPath));

app.get('', (req, res) => {
    const data = {
        title: 'Weather forecast',
        name: 'Sourabh Sanjay Patil'
    };
    res.render('index', data);
});

app.get('/about', (req, res) => {
    const data = {
        title: 'About',
        name: 'Sourabh Sanjay Patil'
    };
    res.render('about', data);
});

app.get('/help', (req, res) => {
    const data = {
        title : 'This is an help page',
        name: 'Sourabh Sanjay Patil'
    };
    res.render('help', data);
});

app.get('/weather', (req, res) => {
    const query = req.query;
    
    if (!query.address) {
        return res.send({
            error: 'Please provide address'
        });
    }

    const {address} = query;
    geocode.geocode(address, (error, geoData) => {
        if (error) {
            return res.send({
                error}
            );
        }
        
        const {latitude, longitude, location} = geoData;
        forecast.forecast(latitude, longitude, (error, weatherData) => {
            if (error) {
                return res.send({
                    error}
                );
            }
            
            const {forecast} = weatherData;

            const weather = {
                forecast,
                location,
                address
            };
            res.send(weather);
        });
    });
    
});

app.get('/help/*', (req, res) => {
    const data = {
        title: 'Something went wrong',
        errorMessage: 'Help article not found',
        name: 'Sourabh Sanjay Patil'
    };
    res.render('404', data);
});

app.get('*', (req, res) => {
    const data = {
        title: 'Something went wrong',
        errorMessage: 'Page not found',
        name: 'Sourabh Sanjay Patil'
    };
    res.render('404', data);
});

app.listen(port, () => {
    console.log('Server is running ...');
});