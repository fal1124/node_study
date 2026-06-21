function add(a,b){
    return a + b
}

const value = add(1,2)
console.log(value)


function setName(obj){
    obj.name = 'Bob'
}

const person = {name:'Alice'}
console.log(person.name)

setName(person)
console.log(person.name)

const add2 = function(a,b){
    return a + b
}
setTimeout(function(){
    console.log('1s')
},1000);

(function(){
    console.log('executed')
})()

function add3 (a,b = 2){
    return a + b
}

const total = add3(1)
console.log(total)

const total2 = add3(1,3)
console.log(total2)