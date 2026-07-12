const {readFile,writeFile,chmod} = require('fs')
const {promisify} = require('util')
const promiseA = new Promise((resolve,reject)=>{
    resolve('return data')
});

promiseA.then((data) => console.log(data))

const promiseB = new Promise((resolve,reject)=>{
    reject(new Error('return error'))
})

promiseB.catch((err)=>console.log(err))

console.log('done')

const promiseX = (x)=>{
    return new Promise((resolve,reject)=>{
        if(typeof x === 'number'){
            resolve(x)
        }else{
            reject(new Error('reutrn error'))
        }
    })
}

const logAndDouble = (num)=>{
    console.log(num)
    return num * 2
}
promiseX(1)
 .then((data)=>logAndDouble(data))
 .then((data)=>logAndDouble(data))
 .catch(console.log('data'))

 const readFileAsync = (data) =>{
    return new Promise((resolve,reject)=>{
        readFile(Path,(err,data)=>{
            if(err){
                reject(err)
                return
            }
            resolve(data)
        })
    })
 }

 const writeFileAsync = (path,data)=>{
    return new Promise((resolve,reject)=>{
        writeFile(path,data,(err)=>{
            if(err){
                reject(err)
                return
            }
            resolve()
        })
    })
  }
 const chmodAsync = (path,mode)=>{
    return new Promise((resolove,reject)=>{
        chmod(backupFile,mode,(err)=>{
            if(err){
                reject(err)
                return
            }
            resolve()
        })
    })
 }

 const backupFile = `${__filename}-${Date.now()}`

 readFileAsync(__filename)
  .then((data)=>{
    return writeFileAsync(backupFile,data)
  })
   .then(()=>{
     return chmodAsync(backupFile,0o400)
   })
   .catch((err)=>{
     console.error(err)
   })

 const readFileAsync2 = promisify(readFile)
 const writeFileAsync2 = promisify(writeFile)
 const chmodAsync2 = promisify(chmod)



 