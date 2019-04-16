const express = require('express')
const fs = require('fs')
const app = express.Router()

app.get('/', (req, res) => {
    fs.readFile('../testData.json', (er, data)=>{
        if(er){
            throw er
        }
        res.json(data)
    });

})

app.post('/', (req, res) => {
    const data = req.body
    if(data && data.rasa_nlu_data){
        fs.writeFile('../testData.json', JSON.stringify(data), 'utf8')
        res.json({success:'success'})
    }
    res.json({error:'error'})
})


module.exports = app;
