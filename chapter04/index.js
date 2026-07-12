const {readFile,writeFile,chmod} = require('fs')
const fs = require('fs')

const backupFile = `${__filename}-${Date.now()}`

readFile(__filename,(err,data)=>{
    if(err){
        return console.error(err)
    }

    writeFile(backupFile,data,(err)=>{
        if(err){
            return console.error(err)
        }
        chmod(backupFile,0o400,(err)=>{
            if(err){
                return console.error(err)
            }
            console.log('done')
        })
    })
})

for(let i = 0; i < 100; i++){
    const text = `write:${i}`

    fs.writeFile('./data.txt',text,(err)=>{
        if(err){
            console.error(err)
            return;
        }
        console.log(text)
    })
}

const writeFileNumber = (i) =>{
    if(i >= 100){
        return
    }

    const text = `write:${i}`
    fs.writeFile('./data,txt',text,(err)=>{
        if(err){
            console.error(err)
            return
        }
        console.log(text)
        writeFileNumber(i + 1)
    })
}

writeFileNumber(0)

readFile(__filename,(err,data)=>{
    if(err){
        console.error(err)
        return
    }
    console.log(data)
})