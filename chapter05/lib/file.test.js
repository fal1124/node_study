const path = require('node:path');
const {readMarkdownFileSync} = require('./file')

test('readMarkdownFileSync',()=>{
    const markdown = readMarkdownFileSync(path.resolve(__dirname,'../test.md'))
    expect(markdown).toStrictEqual('**bold**')
})