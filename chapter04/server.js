const http = require('http')

http
.createServer((req,res)=>{
    res.write('hello world\n')
    res.end()
})
.listen(3000)