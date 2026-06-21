const obj1 = {
    a:'aaa',
    b:{
        foo:'bbb'
    }
}

const obj2 = {
    c:{
        foo:'ccc'
    }
}

const obj3 = {
    ...obj1,
    ...obj2
}

obj1.b.foo = 'bbb-update'
console.log(obj3.b.foo)

obj1.a = 'aaa-update'
console.log(obj3.a)