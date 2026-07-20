const assert = require('assert');
const { test } = require('node:test');

assert.strictEqual(1+2,3,'1「1+2=3」である')

// assert.strictEqual(1+1,3,'1「1+2=3」である')

const obj1 = {
    a:{
      b:1  
    }
}

const obj2 = {
    a:{
        c:1
    }
}

// assert.deepStrictEqual(obj1,obj2,'オブジェクトが等しい')
// assert.equal(1,'1','数値と文字列の比較')
// assert.strictEqual(1,'1','数値と文字列の比較(strict)')

test('sample test',()=>{
    // expect(1+2).toStrictEqual(3)
    expect(1 + 2).toStrictEqual(3)
})