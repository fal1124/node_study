const [first,second,...foo] = [10,20,30,40,50]
console.log(first)
console.log(second)
console.log(foo) 

const {a,b,...bar} = {
    a:10,
    b:20,
    c:30,
    d:40
}

console.log(a)
console.log(b)
console.log(bar)