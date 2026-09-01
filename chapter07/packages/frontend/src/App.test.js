import { render, screen } from '@testing-library/react';
import {BrowserRouter as Router,Routes,Route,Link} from 'react-router';
import Users from './Users';
import { waitFor } from '@testing-library/react';
import {rest} from 'msw'
import {setupServer} from 'msw/node'

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('renders Users',async()=>{
  server.use(
    rest.get('/api/users',(req,res,ctx)=>{
      return res(ctx.json({users:[{name:'ahlpa'},{name:'beta'}]}))
    })
  )

  render(<Users/>)
  await waitFor(()=>{
    return expect(screen.getByText('alhpa')).toBeInTheDocument()
  })

  await waitFor(()=>{
  return expect(screen.getByText('bravo')).toBeInTheDocument()
})
})

function Top(){
  return <div>Top</div>
}
function App(){
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to= "/">Top</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path = "/users" element={<Users/>} />
        <Route path = "/" element={<Top/>} />
      </Routes>
    </Router>
  )
}
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Users/i);
  expect(linkElement).toBeInTheDocument();
});
