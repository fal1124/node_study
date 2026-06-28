import defaultCalc, {num,add,sub} from './calc/calc.mjs'

console.log(num)

let res = add(1,3)
console.log(res)

res = sub(1,3)
console.log(res)

defaultCalc()

import('./calc/calc.mjs')
.then((module)=>{
    console.log(module.add(1,2))
})