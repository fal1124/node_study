const EventEmitter = require('events')

class MyEmmitter extends EventEmitter{}

const myEmmitter = new MyEmmitter()

myEmmitter.on('myevent',(data)=>{
    console.log('on myevent:',data)
})

myEmmitter.emit('myevent','one')

setTimeout(()=>{
    myEmmitter.emit('myevent','two')
},1000)