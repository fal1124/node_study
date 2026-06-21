function returnArray(){
    return [1,2,3]
}

const [one,,three] = returnArray()
console.log(one)
console.log(three)

const obj = {
    a:10,
    b:20,
    c:30
}

const {a:foo,c:bar} = obj
console.log(foo)
console.log(bar)