const mockRedisGet = jest.fn()
const mockRedisScaanStream = jest.fn()

jest.mock('../lib/redis',()=>{
    return{
        getClient:jest.fn().mockImplementation(()=>{
            return{
                get:mockRedisGet,
                scanStream:mockRedisScaanStream
            }
        })
    }
})

const { errorMonitor } = require('events');
const {getUser,getUsers} = require('./users')

beforeEach(()=>{
    mockRedisGet.mockClear()
    mockRedisScaanStream.mockClear()
})

test('getUser',async()=>{
    mockRedisGet.mockResolvedValue(JSON.stringify({id:1,name:'alpha'}))

    const reqMock = {params:{id:1}}
    const resMock = {
        status:jest.fn().mockReturnThis(),
        json:jest.fn().mockReturnThis()
    }

    await getUser(reqMock,resMock)

    expect(resMock.status).toHaveBeenCalledTimes(1)
    expect(resMock.status).toHaveBeenCalledWith(200)

    expect(resMock.json).toHaveBeenCalledTimes(1)
    expect(resMock.json).toHaveBeenCalledWith(expect.objectContaining({id:1,name:'alpha'}))

    expect(mockRedisGet).toHaveBeenCalledTimes(1)
    expect(mockRedisGet.mock.calls.length).toStrictEqual(1)

    const [arg1] = mockRedisGet.mock.calls[0]
    expect(arg1).toStrictEqual('users:1')

    // expect(res.id).toStrictEqual(1)
    // expect(res.name).toStrictEqual('alpha')

    // expect(mockRedisGet).toHaveBeenCalledTimes(1)
    // const [arg1] = mockRedisGet.mock.calls[0]
    // expect(arg1).toStrictEqual('users:1')
})

test('getUsers',async()=>{
    const streamMock = {
        async* [Symbol.asyncIterator](){
            yield['users:1','users:2'];
            yield['users:3','users:4']
        }
    }
    mockRedisScaanStream.mockReturnValueOnce(streamMock)
    mockRedisGet.mockImplementation((key)=>{
        switch(key){
            case 'users:1':
                return Promise.resolve(JSON.stringify({id:1,name:'alpha'}))
            case 'users:2':
                return Promise.resolve(JSON.stringify({id:2,name:'bravo'}))
            case 'users:3':
                return Promise.resolve(JSON.stringify({id:3,name:'charlie'}))
            case 'users:4':
                return Promise.resolve(JSON.stringify({id:4,name:'delta'}))        
        }
        return Promise.resolve(null)
    })

    const reqMock = {}

    const res = await getUsers(reqMock)

    expect(mockRedisGet).toHaveBeenCalledTimes(4)
    expect(res.users.length).toStrictEqual(4)
    expect(res.users).toStrictEqual([
        {id:1,name:'alpha'},
        {id:2,name:'bravo'},
        {id:3,name:'charlie'},
        {id:4,name:'delta'},
    ])
})

test('getUser 失敗',async()=>{
    // expect.assertions(2)

    mockRedisGet.mockRejectedValue(new Error('something error'))

    const reqMock = {params:{id:1}}
    const resMock = {
        status:jest.fn().mockReturnThis(),
        send:jest.fn().mockReturnThis()
    }

    try{
        await getUser(reqMock,resMock)

        expect(resMock.status).toHaveBeenCalledTimes(1)
        expect(resMock.status).toHaveBeenCalledWith(500)
        expect(resMock.send).toHaveBeenCalledTimes(1)
        expect(resMock.send).toHaveBeenCalledWith('interbal error')
    }catch(err){
        expect(err.message).toStrictEqual('something error')
        expect(err instanceof Error).toStrictEqual(true)
    }
})