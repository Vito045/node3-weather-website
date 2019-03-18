const path = require('path');
const express =  require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

console.log(path.join(__dirname, '../public'));

const app = express();
const port = process.env.PORT || 3000;

//  Define paths for express config
const publicDirectorePath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//  Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

//  Setup sattic directory to serve
app.use(express.static(publicDirectorePath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Andrew Mead'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'NOT Andrew'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Title',
        message: 'I don\'t wont to help you!',
        name: 'NOT Andrew'
    })
});

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide address'
        });
    }

    const address = req.query.address;

    geocode(address, (error, { latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({error});
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({error});
            }
            
            res.send({
                location,
                forecast: forecastData,
                address
            })
        });
    });
});

app.get('/products', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide asearch term'
        })
    }

    res.send({
        products: []
    })
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: 'Help article not found',
        name: 'Andrew',
        title: '404'

    })
});

app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: 'Paage not found',
        name: 'Andrrew',
        title: '404'
    })
});

app.listen(port, () => {
    console.log('Server is up on port', port);
});