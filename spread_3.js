const args = [1,2,3]

function add(x,y,z){
    return x + y + z
}

const total = add(...args)
console.log(total)