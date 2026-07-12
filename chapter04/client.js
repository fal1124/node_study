const http = require('http')

const req = http.request('http://localhost:3000',(res)=>{
    res.setEncoding('utf8')
    res.on('data',(chunk)=>{
        console.log(`body:${chunk}`)
    })

    res.on('end',()=>{
        console.log('end')
    })
})

req.end()