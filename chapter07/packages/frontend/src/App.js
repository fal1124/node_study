import Users from './Users'
import {BrowserRouter as Router, Routes, Route,Link} from 'react-router-dom'

function Top(){
  return <div>Top</div>
}

function App() {
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
  );
}

export default App;
