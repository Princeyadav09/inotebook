import './App.css';
import{
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './Context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  return (
    <>
    <NoteState>
      <Router>
        <Navbar/>
        <Alert message="This is an amazing react course"></Alert>
        <div className="container">

        <Routes>
          <Route exact path="/" element={<Home></Home>}>
          </Route>
          <Route exact path="/about" element={<About></About>}>
          </Route>
          <Route exact path="/login" element={<Login></Login>}>
          </Route>
          <Route exact path="/signup" element={<Signup></Signup>}>
          </Route>
        </Routes>
        </div>
      </Router>
      </NoteState>
    </>
  );
}

export default App;
