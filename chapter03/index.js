const calc = require('./calc/calc')
const a = require('./a')
const b = require('./b')
const fs = require('fs')
const {request} = require('undici')

// console.log(calc.num)

// let res = calc.add(3,1)
// console.log(res)

// res = calc.sub(3,1)
// console.log(res)

console.log(calc.num)

setTimeout(()=>{
    console.log(calc.num)
},1500)

fs.readFile(__filename,(err,data)=>{
    console.log(data)
})

request('https://www.yahoo.co.jp')
  .then((res)=>{
    return res.body.text()
  })
   .then((body)=>{
    console.log(body)
   })