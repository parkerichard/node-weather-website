const path = require ('path')
const express = require ('express')
const hbs = require('hbs')
const forecast = require('./util/forecast')

const app = express()
const port = process.env.PORT || 3000
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
    if (req.query) {
        forecast(req.query,(error,data) => {
            if (!error) {
                res.send({
                    forecast: data,
                    location: req.query,
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

app.listen(port, () => {
    console.log ('Express has started listneding on port',port)
})