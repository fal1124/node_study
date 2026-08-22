const path = require('path')
const {connect,init} = require('./lib/redis')
const usersHandler = require('./handlers/users')
const express = require('express')
const app = express()

class BadRequest extends Error{
    constructor(message,req){
        super('Bad Request')
        this.status = 400
        this.req = req
        this.message = message
    }
}

class NotFoundHTML extends Error{
    constructor(message){
        super('NotFound')
        this.status = 404
    }
}

const validation = (req)=>{
    if(!req.params.id){
        throw new BadRequest('idがありません',req)
    }
}


const wrapAPI = (fn) =>{
    return (req,res,next) =>{
        try{
            fn(req)
            .then((data)=>res.status(200).json(data))
            .catch((e)=>next(e))
        }catch(e){
            next(e)
        }
    }
}

const handler = async(req)=>{
    // const error = new Error('なにかエラー')
    // error.status = 400

    validation(req)

    // throw error
}

// const redis = new Redis({
//     port:6379,
//     host:'localhost',
//     password:process.env.REDIS_PASSWORD,
//     enableOfflineQueue:false
// })

app.set('view engine','ejs')
app.use('/static',express.static(path.join(__dirname,'public')))

// const init = async()=>{
//     await Promise.all([
//         redis.set('users:1',JSON.stringify({id:1,name:'alpha'})),
//         redis.set('users:2',JSON.stringify({id:2,name:'bravo'})),
//         redis.set('users:3',JSON.stringify({id:3,name:'charlie'})),
//         redis.set('users:4',JSON.stringify({id:4,name:'delta'}))
//     ])
// }

app.get('/',(req,res)=>{
    res.render(path.join(__dirname,'views','index.ejs'))
    // res.status(200).send('hello world')
})

app.get('/user/:id',wrapAPI(handler))

app.use((err,req,res,next)=>{
    if(err.status){
        return res.status(err.status).send(err.message)
    }else if(err instanceof NotFoundHTML){
        console.log('[NotFoundHTML]',req)
        res.status(err.status).send('<html><body>Not Found!</body></html>')
    }
    res.status(500).send('Inernal Server Error')
    console.error('[Internal Server Error]',err)
})

app.get('/user/:id',async(req,res)=>{
    const valid = validation(req)
    if(!valid.flag){
        res.sttaus(400).send(valid.data)
    }
    try{
        const user = await usersHandler.getUSer(req)
        res.status(200).json(user)
    }catch(err){
        console.error(err)
        res.status(500).send('internal error')
    }

})

app.use((err,req,res,next)=>{
    if(err instanceof BadRequest){
        console.log('[BadRequest]',req)
        res.status(err.status).send(err.message)
        return
    }
    console.error('[Internal Server Error]',req)
    res.status(500).send('Interal Server Error')
})

// app.get('user/:id',async(req,res)=>{
//     try{
//         const key = `users:${req.params.id}`
//         const val = await redis.get(key)
//         const user = JSON.parse(val)
//         res.status(200).json(user)
//     }catch(err){
//         res.status(500).send('internal error')
//     }
// })

app.get('/users',async(req,res)=>{
    try{
        const locals = await usersHandler.getUsers(req)
        res.render(path.join(__dirname,'views','users.ejs'),locals)
    } catch(err){
        console.error(err)
    }
    // const offset = req.query.offset ? Number(req.query.offset) : 0;
    // const userList = await redis.lrange('users:list',offset,offset + 1)

    // const users = userList.map((user)=>{
    //     return JSON.parse(user)
    // })

    // return {users:users}
    // try{
    //     const stream = redis.scanStream({
    //         match:'users:*',
    //         count:2
    //     })
    //     const users = []
    //     for await (const resultKeys of stream){
    //       for(const key of resultKeys){
    //         const value = await redis.get(key)
    //         const user = JSON.parse(value)
    //         users.push(user)
    //       }
    //     }
    //     res.render(path.join(__dirname,'views','user.ejs'),{users:users})
    //     // res.status(200).json(users)
    // }catch(err){
    //     console.log(err)
    //     res.status(500).send('internal error')
    // }
    
})

const redis  = connect()
redis.on('ready',async()=>{
    try{
        await init()
        app.listen(3000,()=>{
            console.log('start listening')
        })
    } catch(err){
        console.error(err)
        process.exit(1)
    }
})
redis_connect.on('error',(err)=>{
    console.error(err)
    process.exit(1)
})

// app.listen(3000,()=>{
//     console.log('start listening ')
// })