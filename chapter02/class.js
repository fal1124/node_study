class People{
    constructor(name){
        this.name = name
    }
    printName(){
        console.log(this.name)
    }
}

const foo = new People('foo-name')
foo.printName()