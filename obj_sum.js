const obj1 = {
    a: 'aaa',
    b: 'bbb'
}

const obj2 = {
    c:'ccc'
}

const obj3 = {
    ...obj1,
    ...obj2
}

console.log(obj3)