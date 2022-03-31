const path = require ('path')
const express = require ('express')
const hbs = require('hbs')
const forecast = require('./util/forecast')

const app = express()

const publicPathDirectory = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')
app.set('views',viewsPath)
app.use(express.static(publicPathDirectory))
hbs.registerPartials(partialsPath)

app.get('',(req,res)=>{
    res.render('index', {
        title: 'Weather',
        name: 'Frank'
    })
})

app.get('/help',(req,res)=>{
    res.render('help', {
        title: 'Help',
        message: 'What I can I help you with today?',
        name: 'Frank'
    })
})

app.get('/about',(req,res)=>{
    res.render('about', {
        title: 'About Me',
        name: 'Frank'
    })
})

app.get('/weather', (req,res) => {
    if (req.query.latitude && req.query.longitude) {
        forecast(req.query.latitude,req.query.longitude,(error,data) => {
            if (!error) {
                res.send({
                    forecast: data,
                    latitude: req.query.latitude,
                    longitude: req.query.longitude
                })
            } else {
                res.send ({
                    error
                })
            }
        })
    } else {
        res.send({
            error: 'Missing latitude and longitude values'
        })
    }
})

app.get('/help/*',(req,res)=>{
    res.render('error',{
        message:'Help article not found!',
        title: 'Error',
        name: 'Frank'
    })
})

app.get('*',(req,res)=>{
    res.render('error',{
        message:'Page not found!',
        title: 'Error',
        name: 'Frank'
    })
})

app.listen(3000, () => {
    console.log ('Express has started listneding on port 3000')
})