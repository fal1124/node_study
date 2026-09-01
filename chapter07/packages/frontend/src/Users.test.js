import {fireEvent, render,screen} from '@testing-library/react'
import Users from './Users'
import {useUsers} from './Users.hooks'
import renderer from 'react-test-renderer'


jest.mock('./Users.hooks',()=>{
    return{
        useUsers:jest.fn()
    };
})

const component = renderer.create(<Users/>)
const tree = component.toJSON()

expect(tree).toMatchSnapshot()

test('renders Users',()=>{
    useUsers.mockImplementation(()=>{
        return{
            users:['aplha','bravo'],
        }
})

test('追加ボタンのsubmitでsubmitが呼び出される',()=>{
    useUsers.mockImplementation(()=>{
        return{
            users:['aplha','bravo'],
            submit:submitMock
        }
    })
})

render(<Users/>)
fireEvent.submit(screen.getByText('追加'))
expect(submitMock).toHaveBeenCalledTimes(1)
expect(screen.getByText('aplha')).toBeInTheDocument()
expect(screen.getByText('bravo')).toBeInTheDocument()
})