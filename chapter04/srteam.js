const fs = require('fs')

const readStream = fs.createReadStream(__filename,{encoding:'utf8',highWaterMark:64})

let counter = 0

readStream.on('data',(chunk)=>{
    console.log(counter,chunk)
    counter++
})

readStream.on('close',()=>{
    console.log('close stream')
})

readStream.on('error',(e)=>{
    console.log('error',e)
})