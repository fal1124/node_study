import {renderHook,waitFor} from '@testing-library/react'
import {rest} from 'msw'
import {setUpServer} from 'msw/server'
import {useUsers} from './Users.hooks'

const server = setUpServer()

beforeAll(()=> server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

server.use(
    rest.get('api/users',(req,res,ctx)=>{
        return res(ctx.json({users:[{name:'alhpa'},{name:'bravo'}]}))
    })
)

const {result} = renderHook(()=> useUsers())

await waitFor(() =>{
    return expect(result.current.users).toStrictEqual(['alhpa','bravo'])
})