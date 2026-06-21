const a = [
    {foo:'foo1'},
    'foo2',
    {foo:'foo3'}
]

const b  = [
    {foo:'foo4'},
    'foo5',
    {foo:'foo6'}
]

const c = [...a,...b]
console.log(c[0].foo)

a[0].foo = 'bar1'
console.log(c[0].foo)

a[1] = 'bar2'

console.log(c[1])