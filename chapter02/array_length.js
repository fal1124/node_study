const a = [1,2,3]
console.log(a)

Array.prototype.showLength = function(){
    console.log(this.length)
}

a.showLength()