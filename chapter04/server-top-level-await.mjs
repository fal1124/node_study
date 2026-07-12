import {createServer} from 'http'
import {on} from 'events'
import {setTimeout} from 'timers/promises'

const req = on(createServer().listen(8000),'request')

for await(const[,res] of req){
    await setTimeout(100)
    res.end('hello')
}