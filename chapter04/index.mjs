import {readFile} from 'fs/promises'

const data = await readFile(new URL(import.meta.url),
{encoding:'utf-8'})

console.log(data)