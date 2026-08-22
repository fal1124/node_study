const iterableObj = {}

iterableObj[Symbol.iterator] = function* (){
    yield 1;
    yield 2;
    yield 3;
}

for(const elem of iterableObj){
    console.log(elem)
}