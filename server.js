const {MongoClient} = require('mongodb')
const express = require('express')
const app = express()
const fileUpload = require('express-fileupload')
app.use(fileUpload())
require('dotenv').config()
const mv = require('mv')
app.use(express.static('public'))

const { config } = require('dotenv')
const { resolveInclude } = require('ejs')
const PORT = 8000


let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'MERN'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`connectado a el ${dbName} base de datos`)
        db = client.db(dbName)
    })
app.post('/api/multi-file', (req, res) => {
    res.set('Content-Type', 'text/html')
    for(const f of req.files.myfile){
        db.collection('test').insertOne(f)
        .then(result =>{
            console.log('image added')
           
        })
        .catch(error => console.error(error))
    }
    res.redirect('/')
    // f.mv('./uploads/' + f.name)
})
app.get('/',(request, response)=>{
    db.collection('rappers').find().toArray()
    .then(data => {
        response.render('index.ejs', { info: data })
    })
    .catch(error => console.error(error))
})
app.get('/download', (req, res) => {
    res.download('./uploads/A0ACD75D-264F-44CA-9EC5-4836E47E771A.jpeg')
})
// app.post('/api/addRapper', (request, response) => {
//     db.collection('test').insertOne(request.body)
//     .then(result => {
//         console.log('Rapper Added')
//         response.redirect('/')
//     })
//     .catch(error => console.error(error))
// })

app.get('/',(request, response)=>{
    db.collection('rappers').find().toArray()
    .then(data => {
        response.render('index.ejs', { info: data })
    })
    .catch(error => console.error(error))
})

app.listen(PORT, () => {
console.log(`severidor corrido en ${PORT} ve a agarlo`)
})