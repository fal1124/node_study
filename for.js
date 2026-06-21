const arr = ['foo','bar','baz']

for(let i = 0; i<arr.length; i++){
    console.log(arr[i])
}

arr.forEach((element)=>{
    console.log(element)
})

for(const element of arr){
    console.log(element)
}