const express = require('express')
const app = express()

// app.get('/',(req,res,next)=>{
//     console.log(req.method,req.url)
//     next()
//     res.status(200).send('hello world')
// })

const logMiddleware = (req,res,next)=>{
    console.log(req.method,req.url)
    next()
}

app.get('/',logMiddleware,(req,res)=>{
    res.status(200).send('hello world')
})

app.get('user/:id',logMiddleware,(req,res)=>{
    res.status(200).send(req.params.id)
})